const crypto = require("node:crypto");
const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");

const intentSchema = require("../schemas/agent-listing-intent.schema.json");
const responseSchema = require("../schemas/listing-readiness-response.schema.json");
const {
  validateEligibilityAssessment
} = require("./eligibility");
const {
  buildPreliminaryEligibilityAssessment
} = require("./preliminary-eligibility");

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
  // A self-report can never cause this policy to emit VERIFIED.
  return selfReported === "VERIFIED" ? "READY" : selfReported;
}

function priorityFor(state) {
  if (state === "MISSING" || state === "UNKNOWN") return "BLOCKING";
  if (state === "PARTIAL") return "HIGH";
  return "LOW";
}

function sectorCategory(intent) {
  const summary = [
    intent.non_terrestrial_thesis.summary,
    intent.economic_activity.summary,
    intent.agent.description,
    intent.agent.autonomy_summary
  ]
    .join(" ")
    .toLowerCase();

  if (/resource|prospect|mining|extract|regolith|ice/.test(summary)) {
    return "space_resource";
  }
  if (/relay|station|platform|infrastructure|compute|depot|power/.test(summary)) {
    return "orbital_infrastructure";
  }
  if (/service|communications|sensing|logistics|transport/.test(summary)) {
    return "space_services";
  }
  return "autonomous_non_terrestrial_operator";
}

function legacyIssuerCategory(intent, assessment) {
  switch (assessment.assessed_classification) {
    case "NON_TERRESTRIAL_ISSUER":
      return sectorCategory(intent);
    case "HYBRID_EARTH_SPACE_ISSUER":
      return "hybrid_earth_space_enterprise";
    case "TERRESTRIAL_SPACE_SECTOR_VENDOR":
      return "terrestrial_only";
    case "PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE":
    case "UNDETERMINED":
    default:
      return "undetermined";
  }
}

function hypothesisConfidence(assessment) {
  switch (assessment.verification.status) {
    case "INDEPENDENTLY_ATTESTED":
      return "HIGH";
    case "PARTIALLY_VERIFIED":
      return "MEDIUM";
    case "SELF_REPORTED":
    case "PROJECT_UNVERIFIED":
    default:
      return "LOW";
  }
}

function eligibilityHypothesis(intent, assessment) {
  return {
    classification: legacyIssuerCategory(intent, assessment),
    confidence: hypothesisConfidence(assessment),
    reasoning_summary:
      `Eligibility outcome under standard.eligibility ${assessment.standard.version}: ${assessment.assessed_classification}. ` +
      "The listing-readiness-response.v0.1 classification field is retained as a backwards-compatible descriptive issuer category; it is not the canonical eligibility outcome. " +
      `Assessment basis: ${assessment.assessment_basis}; verification status: ${assessment.verification.status}.`,
    blocking_questions: assessment.blocking_questions || []
  };
}

function dimensionSummary(name, selfReported, effective) {
  if (selfReported === "VERIFIED") {
    return `Applicant self-reported VERIFIED for ${name}, but this policy does not independently verify facts. Output is capped at READY.`;
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

function eligibilityNextActions(assessment) {
  const gates = assessment.gates;
  const actions = [];

  if (!gates.qualifying_nexus.passed) {
    actions.push({
      action: "Establish a direct qualifying beyond-Earth nexus",
      priority: "BLOCKING",
      why: "standard.eligibility requires a direct qualifying nexus before an operating issuer can qualify for the proposed market.",
      expected_evidence:
        "Document the controlled asset, direct operation/service, resource right, autonomous non-terrestrial operation, or infrastructure entitlement and the intended issuer's connection to it.",
      related_standard: "ELIGIBILITY_STANDARD.md#5-gate-1--qualifying-beyond-earth-nexus"
    });
  }

  if (!gates.rights_control.passed) {
    actions.push({
      action: "Resolve enforceable issuer rights and control over the qualifying activity",
      priority: "BLOCKING",
      why: "Economic exposure or narrative intent is not enough; investors must be able to identify what the issuer owns, controls, or is entitled to receive.",
      expected_evidence:
        "Provide title, lease, concession, hosted-payload agreement, service entitlement, revenue/data right, subsidiary ownership, command authority, or equivalent enforceable evidence.",
      related_standard: "ELIGIBILITY_STANDARD.md#7-gate-3--enforceable-rights-control-or-entitlement"
    });
  }

  if (gates.pre_operational_pathway?.applicable) {
    if (!gates.pre_operational_pathway.qualifies) {
      actions.push({
        action: "Complete the pre-operational eligibility pathway",
        priority: "BLOCKING",
        why: "The applicant is not yet operating and the lightweight listing intent does not establish funded/contracted deployment, committed capital concentration, and a dated operating milestone.",
        expected_evidence:
          "Provide funded or contracted deployment evidence, committed 24-month non-terrestrial capital share, a dated operating milestone, issuer rights/control, and material dependency/failure disclosures.",
        related_standard: "ELIGIBILITY_STANDARD.md#9-pre-operational-pathway"
      });
    }
  } else {
    if (!gates.material_dependence.passed) {
      actions.push({
        action: "Establish material economic or operational dependence",
        priority: "BLOCKING",
        why: "A direct space nexus does not qualify an issuer unless the qualifying activity is material to the enterprise.",
        expected_evidence:
          "Provide supported non-terrestrial revenue, gross-profit, backlog, asset, capex, opex, service-capacity, or enterprise-dependency metrics, or a documented core-enterprise override.",
        related_standard: "ELIGIBILITY_STANDARD.md#6-gate-2--material-economic-or-operational-dependence"
      });
    }

    if (!gates.evidence_sufficiency.passed) {
      actions.push({
        action: "Connect current evidence to the eligibility gates",
        priority: "BLOCKING",
        why: "Operating eligibility is a claim about current reality and cannot be established from strategy or self-description alone.",
        expected_evidence:
          "Provide current evidence for asset/right existence, issuer control/entitlement, operating status, economic materiality, contracts, and relevant financial figures.",
        related_standard: "ELIGIBILITY_STANDARD.md#8-gate-4--evidence-sufficiency-and-freshness"
      });
    }
  }

  for (const check of assessment.anti_gaming_checks || []) {
    if (check.status === "FLAG") {
      actions.push({
        action: `Resolve eligibility anti-gaming flag: ${check.check}`,
        priority: "HIGH",
        why: check.summary,
        related_standard: "ELIGIBILITY_STANDARD.md#11-anti-gaming-rules"
      });
    }
  }

  return actions;
}

function readinessStateForEligibility(assessment, hasBlockingReadiness) {
  switch (assessment.assessed_classification) {
    case "TERRESTRIAL_SPACE_SECTOR_VENDOR":
      return "NOT_CURRENTLY_ELIGIBLE";
    case "UNDETERMINED":
    case "PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE":
      return "NEEDS_INFORMATION";
    case "NON_TERRESTRIAL_ISSUER":
    case "HYBRID_EARTH_SPACE_ISSUER":
      return hasBlockingReadiness ? "NEEDS_INFORMATION" : "READINESS_REVIEW";
    default:
      return "NEEDS_INFORMATION";
  }
}

function evaluateListingIntentBundle(intent, generatedAt = new Date(), options = {}) {
  const validation = validateIntent(intent);
  if (!validation.valid) {
    const error = new Error("Listing intent failed schema validation");
    error.code = "INVALID_LISTING_INTENT";
    error.validationErrors = validation.errors;
    throw error;
  }

  const assessment =
    options.eligibilityAssessment || buildPreliminaryEligibilityAssessment(intent);
  const assessmentValidation = validateEligibilityAssessment(assessment);
  if (!assessmentValidation.valid) {
    const error = new Error("Eligibility assessment failed schema or policy validation");
    error.code = "INVALID_ELIGIBILITY_ASSESSMENT";
    error.validationErrors = assessmentValidation.errors;
    throw error;
  }

  const readiness = {};
  const nextActions = [...eligibilityNextActions(assessment)];
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
        expected_evidence:
          "Provide attributable, reviewable evidence appropriate to this readiness dimension.",
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

  if (nextActions.length === 0) {
    nextActions.push({
      action:
        "Connect independently reviewable evidence and pursue formal human, legal, accounting, and regulatory review",
      priority: "HIGH",
      why:
        "Self-reported readiness alone is insufficient for exchange admission or a securities offering.",
      expected_evidence:
        "Evidence mapped to the eligibility standard, Orbital Prospectus, listing standard, and any applicable legal/regulatory requirements.",
      related_standard: "LISTING_STANDARD.md"
    });
  }

  const response = {
    schema_version: "listing-readiness-response.v0.1",
    listing_intent_id: listingIntentId(intent),
    generated_at: generatedAt.toISOString(),
    state: readinessStateForEligibility(assessment, hasBlockingReadiness),
    eligibility_hypothesis: eligibilityHypothesis(intent, assessment),
    readiness,
    next_actions: nextActions,
    verification: {
      facts_verified: false,
      verification_summary:
        "This readiness response is generated from a structured eligibility assessment plus self-reported listing-intent fields. The canonical GitHub intake uses a PROJECT_REVIEW_UNVERIFIED preliminary assessment and performs no factual, legal, financial, operational, or regulatory verification.",
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

  return {
    eligibility_assessment: assessment,
    readiness_response: response
  };
}

function evaluateListingIntent(intent, generatedAt = new Date(), options = {}) {
  return evaluateListingIntentBundle(intent, generatedAt, options).readiness_response;
}

module.exports = {
  DIMENSIONS,
  eligibilityHypothesis,
  evaluateListingIntent,
  evaluateListingIntentBundle,
  legacyIssuerCategory,
  listingIntentId,
  readinessStateForEligibility,
  sectorCategory,
  validateIntent
};
