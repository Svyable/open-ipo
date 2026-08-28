const catalog = require("../standards/catalog.json");
const {
  deriveEligibilityClassification,
  validateEligibilityAssessment
} = require("./eligibility");

const PRE_OPERATIONAL_STAGES = new Set([
  "CONCEPT",
  "BUILDING",
  "DEPLOYMENT_PLANNED"
]);

const OPERATING_STAGES = new Set(["DEPLOYED", "OPERATING"]);
const READY_STATES = new Set(["READY", "VERIFIED"]);

function standardVersion() {
  const entry = catalog.artifacts.find((artifact) => artifact.id === "standard.eligibility");
  if (!entry?.version) throw new Error("standards catalog is missing standard.eligibility version");
  return entry.version;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function intentEvidenceReferences(intent) {
  return unique([
    ...(intent.non_terrestrial_thesis?.evidence_references || []),
    ...(intent.evidence_links || []).map((item) => item.reference)
  ]);
}

function preliminaryBlockingQuestions(intent, gates) {
  const questions = [];

  if (!gates.qualifying_nexus.passed) {
    questions.push(
      "What direct, economically meaningful beyond-Earth asset, operation, service, resource right, or infrastructure entitlement does the intended issuer control or have an enforceable right to use?"
    );
  }

  if (!gates.rights_control.passed) {
    questions.push(
      "What enforceable rights, control authority, revenue entitlement, data/IP rights, or other economic interests will the intended issuer hold in the qualifying non-terrestrial activity?"
    );
  }

  if (gates.pre_operational_pathway?.applicable && !gates.pre_operational_pathway.qualifies) {
    questions.push(
      "For the pre-operational pathway, what deployment is funded or contracted, what share of committed 24-month project capital is attributable to the non-terrestrial program, and what dated operating milestone is contractually or operationally supported?"
    );
  } else {
    if (!gates.material_dependence.passed) {
      questions.push(
        "Which supported materiality metric or core-enterprise dependency demonstrates that removal of the qualifying beyond-Earth activity would materially change the enterprise?"
      );
    }
    if (!gates.evidence_sufficiency.passed) {
      questions.push(
        "What current evidence supports existence, operating status, issuer entitlement/control, and economic materiality of the claimed beyond-Earth activity?"
      );
    }
  }

  return unique(questions);
}

function deriveNexus(intent) {
  const thesis = intent.non_terrestrial_thesis;
  const nonEarthRegions = (thesis.operating_regions || []).filter(
    (region) => region !== "earth_surface"
  );
  const stage = thesis.stage;
  const hasClaimedNexus = nonEarthRegions.length > 0 && stage !== "CONCEPT";
  const nexusTypes = [];

  if (hasClaimedNexus && OPERATING_STAGES.has(stage)) {
    nexusTypes.push("DIRECT_NON_TERRESTRIAL_OPERATIONS");
  } else if (hasClaimedNexus && PRE_OPERATIONAL_STAGES.has(stage)) {
    nexusTypes.push("INFRASTRUCTURE_ENTITLEMENT");
  }

  return {
    passed: hasClaimedNexus,
    nexus_types: nexusTypes,
    summary: hasClaimedNexus
      ? `The listing intent claims a direct beyond-Earth nexus in ${nonEarthRegions.join(", ")} at stage ${stage}. This is a preliminary unverified interpretation of applicant-supplied fields, not evidence that the nexus legally or operationally exists.`
      : "The listing intent does not establish a direct qualifying beyond-Earth nexus under the preliminary GitHub intake mapping.",
    evidence_references: thesis.evidence_references || []
  };
}

function deriveRights(intent, evidenceReferences) {
  const entityExists = new Set([
    "ENTITY_EXISTS",
    "ISSUER_STRUCTURE_IN_PROGRESS",
    "ISSUER_READY"
  ]).has(intent.issuer_state.status);
  const ownershipMapped = READY_STATES.has(intent.readiness.ownership);
  const controlMapped = READY_STATES.has(intent.readiness.control_map);
  const passed = entityExists && ownershipMapped && controlMapped;
  const rightTypes = [];

  if (ownershipMapped) rightTypes.push("ECONOMIC_PARTICIPATION_RIGHT");
  if (controlMapped) rightTypes.push("COMMAND_CONTROL_AUTHORITY");

  return {
    passed,
    right_types: rightTypes,
    summary: passed
      ? "The applicant self-reports an existing/intended issuer structure with ownership and control mapping at READY or applicant-claimed VERIFIED status. This is sufficient only for a preliminary unverified rights gate and is not an enforceability determination."
      : "The listing intent does not yet self-report enough issuer ownership and control readiness to establish the rights/control gate even on a preliminary unverified basis.",
    evidence_references: evidenceReferences
  };
}

function deriveMateriality(intent) {
  const claimedDependency =
    intent.non_terrestrial_thesis.material_dependency_on_beyond_earth_activity === true;

  return {
    passed: claimedDependency,
    measurement_period: null,
    metrics: [],
    materiality_presumption_25_triggered: false,
    concentration_presumption_50_triggered: false,
    core_enterprise_override: claimedDependency,
    summary: claimedDependency
      ? "The applicant explicitly self-reports material dependence on beyond-Earth activity. Because agent-listing-intent.v0.1 carries no quantitative eligibility metrics, the preliminary mapper records this only as an unverified core-enterprise claim; the 25% and 50% quantitative presumptions are not triggered."
      : "The applicant does not currently claim material dependence on beyond-Earth activity, and agent-listing-intent.v0.1 supplies no quantitative eligibility metrics that could establish materiality."
  };
}

function deriveEvidence(intent, evidenceReferences) {
  const stage = intent.non_terrestrial_thesis.stage;
  const readiness = intent.readiness.non_terrestrial_evidence;
  const passed =
    OPERATING_STAGES.has(stage) &&
    READY_STATES.has(readiness) &&
    evidenceReferences.length > 0;

  return {
    passed,
    freshness: passed ? "CURRENT" : evidenceReferences.length > 0 ? "UNKNOWN" : "UNKNOWN",
    summary: passed
      ? "The applicant self-reports deployed/operating status, READY or applicant-claimed VERIFIED non-terrestrial evidence, and at least one evidence reference. The preliminary mapper treats this as structurally sufficient but not independently verified."
      : "The listing intent does not provide the combination of operating-stage status, self-reported evidence readiness, and evidence references required for the preliminary evidence gate.",
    evidence_references: evidenceReferences
  };
}

function derivePreOperational(intent, evidenceReferences) {
  const stage = intent.non_terrestrial_thesis.stage;
  const applicable = PRE_OPERATIONAL_STAGES.has(stage);

  return {
    applicable,
    qualifies: false,
    funded_or_contracted: false,
    committed_24_month_nt_capital_share: null,
    capital_presumption_50_triggered: false,
    next_operating_milestone: null,
    summary: applicable
      ? "The applicant is pre-operational, but agent-listing-intent.v0.1 does not contain the committed-capital percentage, funded/contracted deployment evidence, and dated operating milestone needed to award PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE automatically. A separate eligibility assessment is required."
      : "The pre-operational pathway is not applicable to the submitted operating stage.",
    evidence_references: evidenceReferences
  };
}

function buildPreliminaryEligibilityAssessment(intent) {
  const evidenceReferences = intentEvidenceReferences(intent);
  const gates = {
    qualifying_nexus: deriveNexus(intent),
    material_dependence: deriveMateriality(intent),
    rights_control: deriveRights(intent, evidenceReferences),
    evidence_sufficiency: deriveEvidence(intent, evidenceReferences),
    pre_operational_pathway: derivePreOperational(intent, evidenceReferences)
  };

  const assessment = {
    schema_version: "issuer-eligibility-assessment.v0.1",
    as_of: intent.submitted_at,
    standard: {
      id: "standard.eligibility",
      version: standardVersion()
    },
    issuer: {
      name: intent.issuer_state.legal_name || intent.agent.name,
      canonical_identifier: intent.agent.canonical_identifier,
      jurisdiction: intent.issuer_state.jurisdiction || null,
      entity_type: intent.issuer_state.entity_type || null
    },
    assessment_basis: "PROJECT_REVIEW_UNVERIFIED",
    claimed_classification: "UNDETERMINED",
    assessed_classification: "UNDETERMINED",
    decision_reasoning:
      "Preliminary GitHub-native assessment derived only from agent-listing-intent.v0.1 fields. It is intentionally conservative because the listing-intent contract does not carry full materiality, enforceable-rights, or verification evidence required by standard.eligibility v0.1.",
    gates,
    anti_gaming_checks: [
      {
        check: "CUSTOMER_SECTOR_SUBSTITUTION",
        status: "UNKNOWN",
        summary:
          "The lightweight listing intent does not contain enough revenue-performance-location detail to determine whether space-sector customer revenue is qualifying non-terrestrial revenue."
      },
      {
        check: "NOMINAL_PAYLOAD",
        status: "UNKNOWN",
        summary:
          "The lightweight listing intent does not contain sufficient quantitative asset/economic data to rule out nominal-payload qualification."
      },
      {
        check: "AUTONOMY_SHORTCUT",
        status: "PASS",
        summary:
          "The preliminary mapper never treats autonomy by itself as evidence of non-terrestrial eligibility."
      }
    ],
    uncertainties: [
      "agent-listing-intent.v0.1 does not carry eligibility-standard quantitative materiality metrics",
      "rights/control readiness is self-reported and does not establish legal enforceability",
      "evidence references are not independently verified by the GitHub intake workflow"
    ],
    blocking_questions: [],
    verification: {
      status: "PROJECT_UNVERIFIED",
      summary:
        "Generated from applicant-supplied listing-intent fields by deterministic project rules. No factual, legal, financial, operational, or regulatory verification has been performed.",
      verified_evidence_references: []
    },
    disclaimer:
      "Preliminary project-level eligibility assessment only. It is not exchange admission, legal eligibility, regulatory approval, securities offering approval, investment advice, or factual verification."
  };

  assessment.assessed_classification = deriveEligibilityClassification(assessment);
  assessment.blocking_questions = preliminaryBlockingQuestions(intent, gates);

  const validation = validateEligibilityAssessment(assessment);
  if (!validation.valid) {
    const error = new Error("Generated preliminary eligibility assessment failed validation");
    error.code = "INVALID_PRELIMINARY_ELIGIBILITY_ASSESSMENT";
    error.validationErrors = validation.errors;
    throw error;
  }

  return assessment;
}

module.exports = {
  buildPreliminaryEligibilityAssessment,
  intentEvidenceReferences
};
