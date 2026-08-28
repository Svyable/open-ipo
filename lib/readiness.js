const crypto = require("node:crypto");
const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");

const intentSchema = require("../schemas/agent-listing-intent.schema.json");
const responseSchema = require("../schemas/listing-readiness-response.schema.json");

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

const validateIntentSchema = ajv.compile(intentSchema);
const validateResponseSchema = ajv.compile(responseSchema);

const DIMENSIONS = [
  "identity",
  "ownership",
  "financials",
  "control_map",
  "non_terrestrial_evidence",
  "continuity",
  "machine_readable_disclosure"
];

const RELATED_STANDARDS = {
  identity: "LISTING_STANDARD.md#gate-a--legal-and-ownership-identity",
  ownership: "LISTING_STANDARD.md#gate-a--legal-and-ownership-identity",
  financials: "LISTING_STANDARD.md#gate-b--financial-reporting",
  control_map: "LISTING_STANDARD.md#gate-d--command-and-control-map",
  non_terrestrial_evidence: "LISTING_STANDARD.md#gate-c--non-terrestrial-asset-registry",
  continuity: "LISTING_STANDARD.md#gate-e--mission-and-continuity-evidence",
  machine_readable_disclosure: "schemas/orbital-prospectus.schema.json"
};

const ACTION_LABELS = {
  identity: "Resolve the issuer identity and responsible principal",
  ownership: "Map ownership of IP, data rights, contracts, cash flows, and material assets",
  financials: "Build repeatable financial reporting and agent-attributable operating ledgers",
  control_map: "Document the command and control map for every material action class",
  non_terrestrial_evidence: "Attach evidence for the non-terrestrial operating thesis and material assets",
  continuity: "Document failure modes, recovery paths, and single points of failure",
  machine_readable_disclosure: "Produce a machine-readable Orbital Prospectus Factsheet"
};

function validationErrors(validate) {
  return (validate.errors || []).map((error) => ({
    instancePath: error.instancePath || "/",
    keyword: error.keyword,
    message: error.message || "schema validation error"
  }));
}

function validateIntent(intent) {
  const valid = validateIntentSchema(intent);
  return {
    valid: Boolean(valid),
    errors: valid ? [] : validationErrors(validateIntentSchema)
  };
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((result, key) => {
        result[key] = canonicalize(value[key]);
        return result;
      }, {});
  }
  return value;
}

function listingIntentId(intent) {
  const digest = crypto
    .createHash("sha256")
    .update(JSON.stringify(canonicalize(intent)))
    .digest("hex")
    .slice(0, 24);
  return `intent:${digest}`;
}

function effectiveState(selfReported) {
  // A self-report can never cause this service to emit VERIFIED.
  return selfReported === "VERIFIED" ? "READY" : selfReported;
}

function priorityFor(state) {
  if (state === "MISSING" || state === "UNKNOWN") return "BLOCKING";
  if (state === "PARTIAL") return "HIGH";
  return "LOW";
}

function classifyEligibility(intent) {
  const regions = intent.non_terrestrial_thesis.operating_regions || [];
  const nonEarthRegions = regions.filter((region) => region !== "earth_surface");
  const summary = [
    intent.non_terrestrial_thesis.summary,
    intent.economic_activity.summary,
    intent.agent.description,
    intent.agent.autonomy_summary
  ]
    .join(" ")
    .toLowerCase();

  if (nonEarthRegions.length === 0) {
    return {
      classification: "terrestrial_only",
      confidence: "HIGH",
      reasoning_summary:
        "The submitted operating regions contain no beyond-Earth region. This is only a project-level hypothesis, not a legal eligibility determination.",
      blocking_questions: [
        "What material beyond-Earth activity, asset, service, or operating dependency would make the issuer non-terrestrial?"
      ]
    };
  }

  if (!intent.non_terrestrial_thesis.material_dependency_on_beyond_earth_activity) {
    return {
      classification: "undetermined",
      confidence: "LOW",
      reasoning_summary:
        "The intent references beyond-Earth regions but does not state that enterprise value materially depends on beyond-Earth activity. The Orbital Exchange eligibility thesis is therefore unresolved.",
      blocking_questions: [
        "Which material revenue stream, asset, service, or operating dependency makes enterprise value depend on beyond-Earth activity?"
      ]
    };
  }

  let classification = "autonomous_non_terrestrial_operator";
  if (/resource|prospect|mining|extract|regolith|ice/.test(summary)) {
    classification = "space_resource";
  } else if (/relay|station|platform|infrastructure|compute|depot|power/.test(summary)) {
    classification = "orbital_infrastructure";
  } else if (/service|communications|sensing|logistics|transport/.test(summary)) {
    classification = "space_services";
  } else if (/hybrid|earth[- ]space/.test(summary)) {
    classification = "hybrid_earth_space_enterprise";
  }

  const stage = intent.non_terrestrial_thesis.stage;
  const hasEvidence = (intent.non_terrestrial_thesis.evidence_references || []).length > 0;
  const confidence =
    (stage === "DEPLOYED" || stage === "OPERATING") && hasEvidence
      ? "HIGH"
      : stage === "BUILDING" || stage === "DEPLOYMENT_PLANNED"
        ? "MEDIUM"
        : "LOW";

  return {
    classification,
    confidence,
    reasoning_summary:
      "The classification is a deterministic project hypothesis based only on the applicant's submitted description, operating regions, and stated material dependency. It is not a legal, regulatory, or exchange admission conclusion.",
    blocking_questions: []
  };
}

function dimensionSummary(name, selfReported, effective) {
  if (selfReported === "VERIFIED") {
    return `Applicant self-reported VERIFIED for ${name}, but this service does not independently verify facts. Output is capped at READY.`;
  }
  if (effective === "READY") {
    return `Applicant self-reports ${name} as READY. No independent verification has been performed.`;
  }
  if (effective === "PARTIAL") {
    return `Applicant self-reports ${name} as PARTIAL; additional evidence or controls are required.`;
  }
  if (effective === "MISSING") {
    return `Applicant self-reports ${name} as MISSING.`;
  }
  return `Applicant self-reports ${name} as UNKNOWN.`;
}

function evaluateListingIntent(intent, generatedAt = new Date()) {
  const validation = validateIntent(intent);
  if (!validation.valid) {
    const error = new Error("Listing intent failed schema validation");
    error.code = "INVALID_LISTING_INTENT";
    error.validationErrors = validation.errors;
    throw error;
  }

  const readiness = {};
  const nextActions = [];
  let hasBlockingReadiness = false;

  for (const name of DIMENSIONS) {
    const selfReported = intent.readiness[name];
    const state = effectiveState(selfReported);
    readiness[name] = {
      state,
      summary: dimensionSummary(name, selfReported, state),
      evidence_references: []
    };

    if (state === "MISSING" || state === "UNKNOWN") hasBlockingReadiness = true;

    if (state !== "READY") {
      nextActions.push({
        action: ACTION_LABELS[name],
        priority: priorityFor(state),
        why: `The applicant currently reports ${name} as ${state}.`,
        expected_evidence: "Provide attributable, reviewable evidence appropriate to this readiness dimension.",
        related_standard: RELATED_STANDARDS[name]
      });
    }
  }

  for (const gap of (intent.known_gaps || []).slice(0, 3)) {
    nextActions.push({
      action: `Resolve stated applicant gap: ${gap}`,
      priority: "HIGH",
      why: "The applicant explicitly identified this as an unresolved readiness gap.",
      related_standard: "AGENT_LISTING.md"
    });
  }

  const eligibility = classifyEligibility(intent);
  if (eligibility.blocking_questions.length > 0) hasBlockingReadiness = true;

  if (nextActions.length === 0) {
    nextActions.push({
      action: "Connect independently reviewable evidence and pursue formal human, legal, accounting, and regulatory review",
      priority: "HIGH",
      why: "Self-reported readiness alone is insufficient for exchange admission or a securities offering.",
      expected_evidence: "Evidence mapped to the Orbital Prospectus, listing standard, and any applicable legal/regulatory requirements.",
      related_standard: "LISTING_STANDARD.md"
    });
  }

  const response = {
    schema_version: "listing-readiness-response.v0.1",
    listing_intent_id: listingIntentId(intent),
    generated_at: generatedAt.toISOString(),
    state: hasBlockingReadiness ? "NEEDS_INFORMATION" : "READINESS_REVIEW",
    eligibility_hypothesis: eligibility,
    readiness,
    next_actions: nextActions,
    verification: {
      facts_verified: false,
      verification_summary:
        "This response is generated deterministically from self-reported listing-intent fields. No factual, legal, financial, operational, or regulatory verification has been performed.",
      verified_evidence_references: []
    },
    disclaimer:
      "Pre-listing research feedback only. This is not exchange admission, securities offering approval, legal eligibility, regulatory approval, investment advice, or verification of applicant claims. The Orbital Exchange described by open-ipo is a proposed future venue."
  };

  if (!validateResponseSchema(response)) {
    const error = new Error("Generated readiness response failed schema validation");
    error.code = "INVALID_READINESS_RESPONSE";
    error.validationErrors = validationErrors(validateResponseSchema);
    throw error;
  }

  return response;
}

module.exports = {
  DIMENSIONS,
  classifyEligibility,
  evaluateListingIntent,
  listingIntentId,
  validateIntent
};
