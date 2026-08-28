const test = require("node:test");
const assert = require("node:assert/strict");

const exampleIntent = require("../examples/agent-listing-intent.example.json");
const {
  buildPreliminaryEligibilityAssessment
} = require("../lib/preliminary-eligibility");
const {
  validateEligibilityAssessment
} = require("../lib/eligibility");

test("preliminary assessment is policy-valid and explicitly unverified", () => {
  const assessment = buildPreliminaryEligibilityAssessment(exampleIntent);
  const validation = validateEligibilityAssessment(assessment);

  assert.equal(validation.valid, true, JSON.stringify(validation.errors, null, 2));
  assert.equal(assessment.assessment_basis, "PROJECT_REVIEW_UNVERIFIED");
  assert.equal(assessment.verification.status, "PROJECT_UNVERIFIED");
  assert.deepEqual(assessment.verification.verified_evidence_references, []);
});

test("listing intent cannot manufacture quantitative materiality metrics", () => {
  const intent = structuredClone(exampleIntent);
  intent.non_terrestrial_thesis.material_dependency_on_beyond_earth_activity = true;
  const assessment = buildPreliminaryEligibilityAssessment(intent);

  assert.deepEqual(assessment.gates.material_dependence.metrics, []);
  assert.equal(
    assessment.gates.material_dependence.materiality_presumption_25_triggered,
    false
  );
  assert.equal(
    assessment.gates.material_dependence.concentration_presumption_50_triggered,
    false
  );
  assert.equal(assessment.gates.material_dependence.core_enterprise_override, true);
  assert.match(
    assessment.gates.material_dependence.summary,
    /unverified core-enterprise claim/i
  );
});

test("pre-operational intent is never automatically awarded candidate status from lightweight fields", () => {
  const intent = structuredClone(exampleIntent);
  intent.non_terrestrial_thesis.stage = "DEPLOYMENT_PLANNED";
  intent.readiness.ownership = "READY";
  intent.readiness.control_map = "READY";

  const assessment = buildPreliminaryEligibilityAssessment(intent);

  assert.equal(assessment.gates.pre_operational_pathway.applicable, true);
  assert.equal(assessment.gates.pre_operational_pathway.qualifies, false);
  assert.equal(assessment.gates.pre_operational_pathway.funded_or_contracted, false);
  assert.equal(
    assessment.gates.pre_operational_pathway.committed_24_month_nt_capital_share,
    null
  );
  assert.equal(
    assessment.gates.pre_operational_pathway.capital_presumption_50_triggered,
    false
  );
  assert.notEqual(
    assessment.assessed_classification,
    "PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE"
  );
});

test("rights gate requires issuer structure plus both ownership and control readiness", () => {
  const intent = structuredClone(exampleIntent);
  intent.readiness.ownership = "READY";
  intent.readiness.control_map = "READY";

  const passed = buildPreliminaryEligibilityAssessment(intent);
  assert.equal(passed.gates.rights_control.passed, true);

  intent.readiness.ownership = "PARTIAL";
  const failed = buildPreliminaryEligibilityAssessment(intent);
  assert.equal(failed.gates.rights_control.passed, false);
});

test("operating evidence gate requires operating stage, readiness, and an evidence reference", () => {
  const intent = structuredClone(exampleIntent);
  intent.non_terrestrial_thesis.stage = "OPERATING";
  intent.readiness.non_terrestrial_evidence = "READY";
  intent.non_terrestrial_thesis.evidence_references = [
    "evidence://prospector/operations/current"
  ];

  const passed = buildPreliminaryEligibilityAssessment(intent);
  assert.equal(passed.gates.evidence_sufficiency.passed, true);

  intent.non_terrestrial_thesis.evidence_references = [];
  intent.evidence_links = [];
  const failed = buildPreliminaryEligibilityAssessment(intent);
  assert.equal(failed.gates.evidence_sufficiency.passed, false);
});

test("autonomy never counts as its own eligibility shortcut", () => {
  const intent = structuredClone(exampleIntent);
  intent.agent.autonomy_summary =
    "This agent is fully autonomous and claims that autonomy alone should establish non-terrestrial eligibility.";
  intent.non_terrestrial_thesis.operating_regions = ["earth_surface"];
  intent.non_terrestrial_thesis.stage = "OPERATING";

  const assessment = buildPreliminaryEligibilityAssessment(intent);
  const autonomyCheck = assessment.anti_gaming_checks.find(
    (check) => check.check === "AUTONOMY_SHORTCUT"
  );

  assert.equal(autonomyCheck.status, "PASS");
  assert.equal(
    assessment.assessed_classification,
    "TERRESTRIAL_SPACE_SECTOR_VENDOR"
  );
});
