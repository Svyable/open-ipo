const test = require("node:test");
const assert = require("node:assert/strict");

const example = require("../examples/issuer-eligibility-assessment.example.json");
const {
  deriveEligibilityClassification,
  derivePresumptions,
  validateEligibilityAssessment
} = require("../lib/eligibility");

test("worked eligibility assessment is schema-valid and semantically consistent", () => {
  const result = validateEligibilityAssessment(example);
  assert.equal(result.valid, true, JSON.stringify(result.errors, null, 2));
  assert.equal(result.derived.assessed_classification, "NON_TERRESTRIAL_ISSUER");
  assert.equal(result.derived.materiality_presumption_25_triggered, true);
  assert.equal(result.derived.concentration_presumption_50_triggered, true);
});

test("materiality presumptions are derived from separate metrics rather than summed", () => {
  const assessment = structuredClone(example);
  assessment.gates.material_dependence.metrics = [
    {
      ...assessment.gates.material_dependence.metrics[0],
      percentage: 24
    },
    {
      ...assessment.gates.material_dependence.metrics[1],
      percentage: 24
    }
  ];

  const derived = derivePresumptions(assessment);
  assert.equal(derived.materiality_presumption_25_triggered, false);
  assert.equal(derived.concentration_presumption_50_triggered, false);
});

test("submitted presumption flags cannot disagree with submitted metrics", () => {
  const assessment = structuredClone(example);
  assessment.gates.material_dependence.materiality_presumption_25_triggered = false;
  assessment.gates.material_dependence.concentration_presumption_50_triggered = false;

  const result = validateEligibilityAssessment(assessment);
  assert.equal(result.valid, false);
  assert.ok(
    result.errors.some((error) =>
      error.instancePath.includes("materiality_presumption_25_triggered")
    )
  );
  assert.ok(
    result.errors.some((error) =>
      error.instancePath.includes("concentration_presumption_50_triggered")
    )
  );
});

test("no direct nexus routes to terrestrial space-sector vendor", () => {
  const assessment = structuredClone(example);
  assessment.gates.qualifying_nexus.passed = false;
  assert.equal(
    deriveEligibilityClassification(assessment),
    "TERRESTRIAL_SPACE_SECTOR_VENDOR"
  );
});

test("missing rights or stale-insufficient evidence routes to undetermined", () => {
  const noRights = structuredClone(example);
  noRights.gates.rights_control.passed = false;
  assert.equal(deriveEligibilityClassification(noRights), "UNDETERMINED");

  const noEvidence = structuredClone(example);
  noEvidence.gates.evidence_sufficiency.passed = false;
  assert.equal(deriveEligibilityClassification(noEvidence), "UNDETERMINED");
});

test("material but non-concentrated operating issuer routes to hybrid", () => {
  const assessment = structuredClone(example);
  assessment.gates.material_dependence.metrics = [
    {
      ...assessment.gates.material_dependence.metrics[0],
      percentage: 32
    }
  ];
  assessment.gates.material_dependence.materiality_presumption_25_triggered = true;
  assessment.gates.material_dependence.concentration_presumption_50_triggered = false;
  assessment.gates.material_dependence.core_enterprise_override = false;

  assert.equal(
    deriveEligibilityClassification(assessment),
    "HYBRID_EARTH_SPACE_ISSUER"
  );
});

test("core-enterprise override can route a material issuer to non-terrestrial below 50%", () => {
  const assessment = structuredClone(example);
  assessment.gates.material_dependence.metrics = [
    {
      ...assessment.gates.material_dependence.metrics[0],
      percentage: 30
    }
  ];
  assessment.gates.material_dependence.materiality_presumption_25_triggered = true;
  assessment.gates.material_dependence.concentration_presumption_50_triggered = false;
  assessment.gates.material_dependence.core_enterprise_override = true;

  assert.equal(
    deriveEligibilityClassification(assessment),
    "NON_TERRESTRIAL_ISSUER"
  );
});

test("pre-operational pathway is distinct from operating eligibility", () => {
  const assessment = structuredClone(example);
  assessment.gates.pre_operational_pathway = {
    applicable: true,
    qualifies: true,
    funded_or_contracted: true,
    committed_24_month_nt_capital_share: 75,
    capital_presumption_50_triggered: true,
    next_operating_milestone: "2033-01-15T00:00:00Z",
    summary: "Funded lunar deployment remains pre-operational.",
    evidence_references: ["evidence://example/preop"]
  };

  assert.equal(
    deriveEligibilityClassification(assessment),
    "PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE"
  );
  assert.equal(derivePresumptions(assessment).capital_presumption_50_triggered, true);
});

test("claimed classification does not control assessed classification", () => {
  const assessment = structuredClone(example);
  assessment.claimed_classification = "TERRESTRIAL_SPACE_SECTOR_VENDOR";
  assert.equal(
    deriveEligibilityClassification(assessment),
    "NON_TERRESTRIAL_ISSUER"
  );
});
