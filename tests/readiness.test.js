const test = require("node:test");
const assert = require("node:assert/strict");

const exampleIntent = require("../examples/agent-listing-intent.example.json");
const exampleEligibility = require("../examples/issuer-eligibility-assessment.example.json");
const {
  evaluateListingIntent,
  evaluateListingIntentBundle,
  validateIntent
} = require("../lib/readiness");

function allReadinessReady(intent) {
  for (const key of Object.keys(intent.readiness)) intent.readiness[key] = "READY";
  intent.known_gaps = [];
  return intent;
}

function assessmentForIntent(intent) {
  const assessment = structuredClone(exampleEligibility);
  assessment.issuer.name = intent.issuer_state.legal_name || intent.agent.name;
  assessment.issuer.canonical_identifier = intent.agent.canonical_identifier;
  assessment.issuer.jurisdiction = intent.issuer_state.jurisdiction || null;
  assessment.issuer.entity_type = intent.issuer_state.entity_type || null;
  return assessment;
}

test("example listing intent validates", () => {
  const result = validateIntent(exampleIntent);
  assert.equal(result.valid, true, JSON.stringify(result.errors));
});

test("canonical GitHub intake derives a conservative unverified eligibility assessment", () => {
  const bundle = evaluateListingIntentBundle(
    exampleIntent,
    new Date("2032-01-01T00:00:00Z")
  );

  assert.equal(
    bundle.eligibility_assessment.assessment_basis,
    "PROJECT_REVIEW_UNVERIFIED"
  );
  assert.equal(
    bundle.eligibility_assessment.assessed_classification,
    "UNDETERMINED"
  );
  assert.equal(bundle.eligibility_assessment.verification.status, "PROJECT_UNVERIFIED");
  assert.ok(bundle.eligibility_assessment.blocking_questions.length > 0);
  assert.equal(bundle.readiness_response.state, "NEEDS_INFORMATION");
  assert.equal(bundle.readiness_response.eligibility_hypothesis.classification, "undetermined");
  assert.equal(bundle.readiness_response.eligibility_hypothesis.confidence, "LOW");
  assert.equal(bundle.readiness_response.verification.facts_verified, false);
});

test("readiness response never treats applicant self-report as factual verification", () => {
  const intent = structuredClone(exampleIntent);
  intent.readiness.identity = "VERIFIED";

  const response = evaluateListingIntent(intent, new Date("2032-01-01T00:00:00Z"));

  assert.equal(response.readiness.identity.state, "READY");
  assert.equal(response.verification.facts_verified, false);
  assert.equal(response.generated_at, "2032-01-01T00:00:00.000Z");
  assert.notEqual(response.state, "SANDBOX_CANDIDATE");
});

test("invalid listing intent fails closed", () => {
  const intent = structuredClone(exampleIntent);
  delete intent.agent.name;

  const validation = validateIntent(intent);
  assert.equal(validation.valid, false);
  assert.throws(() => evaluateListingIntent(intent), /schema validation/i);
});

test("Earth-only intent routes through policy.eligibility to not currently eligible", () => {
  const intent = structuredClone(exampleIntent);
  intent.non_terrestrial_thesis.operating_regions = ["earth_surface"];
  intent.non_terrestrial_thesis.stage = "OPERATING";
  intent.non_terrestrial_thesis.material_dependency_on_beyond_earth_activity = false;

  const bundle = evaluateListingIntentBundle(intent);

  assert.equal(
    bundle.eligibility_assessment.assessed_classification,
    "TERRESTRIAL_SPACE_SECTOR_VENDOR"
  );
  assert.equal(bundle.readiness_response.state, "NOT_CURRENTLY_ELIGIBLE");
  assert.equal(
    bundle.readiness_response.eligibility_hypothesis.classification,
    "terrestrial_only"
  );
});

test("operating intent can reach readiness review only after canonical eligibility gates pass", () => {
  const intent = allReadinessReady(structuredClone(exampleIntent));
  intent.non_terrestrial_thesis.stage = "OPERATING";
  intent.non_terrestrial_thesis.material_dependency_on_beyond_earth_activity = true;
  intent.non_terrestrial_thesis.evidence_references = [
    "evidence://prospector/operations/current"
  ];

  const bundle = evaluateListingIntentBundle(intent);

  assert.equal(
    bundle.eligibility_assessment.assessed_classification,
    "NON_TERRESTRIAL_ISSUER"
  );
  assert.equal(bundle.readiness_response.state, "READINESS_REVIEW");
  assert.equal(
    bundle.readiness_response.eligibility_hypothesis.classification,
    "space_resource"
  );
  assert.equal(bundle.readiness_response.eligibility_hypothesis.confidence, "LOW");
});

test("reviewed hybrid assessment controls eligibility while legacy field stays descriptive", () => {
  const intent = allReadinessReady(structuredClone(exampleIntent));
  const assessment = assessmentForIntent(intent);

  assessment.assessment_basis = "MIXED";
  assessment.verification.status = "PARTIALLY_VERIFIED";
  assessment.verification.summary = "Some evidence has been independently checked for this test fixture.";
  assessment.gates.material_dependence.metrics[0].percentage = 35;
  assessment.gates.material_dependence.metrics[1].percentage = 20;
  assessment.gates.material_dependence.metrics[2].percentage = 30;
  assessment.gates.material_dependence.materiality_presumption_25_triggered = true;
  assessment.gates.material_dependence.concentration_presumption_50_triggered = false;
  assessment.gates.material_dependence.core_enterprise_override = false;
  assessment.assessed_classification = "HYBRID_EARTH_SPACE_ISSUER";

  const response = evaluateListingIntent(
    intent,
    new Date("2032-01-01T00:00:00Z"),
    { eligibilityAssessment: assessment }
  );

  assert.equal(response.state, "READINESS_REVIEW");
  assert.equal(
    response.eligibility_hypothesis.classification,
    "hybrid_earth_space_enterprise"
  );
  assert.equal(response.eligibility_hypothesis.confidence, "MEDIUM");
  assert.match(response.eligibility_hypothesis.reasoning_summary, /HYBRID_EARTH_SPACE_ISSUER/);
});

test("pre-operational candidate remains needs-information rather than operating-ready", () => {
  const intent = allReadinessReady(structuredClone(exampleIntent));
  const assessment = assessmentForIntent(intent);

  assessment.assessment_basis = "MIXED";
  assessment.gates.pre_operational_pathway = {
    applicable: true,
    qualifies: true,
    funded_or_contracted: true,
    committed_24_month_nt_capital_share: 70,
    capital_presumption_50_triggered: true,
    next_operating_milestone: "2032-10-01T00:00:00Z",
    summary: "Funded deployment and committed capital support a pre-operational candidate classification.",
    evidence_references: ["evidence://prospector/deployment/commitment"]
  };
  assessment.assessed_classification = "PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE";

  const response = evaluateListingIntent(
    intent,
    new Date("2032-01-01T00:00:00Z"),
    { eligibilityAssessment: assessment }
  );

  assert.equal(response.state, "NEEDS_INFORMATION");
  assert.equal(response.eligibility_hypothesis.classification, "undetermined");
  assert.match(
    response.eligibility_hypothesis.reasoning_summary,
    /PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE/
  );
});

test("independently attested eligibility can raise hypothesis confidence without changing verification of readiness", () => {
  const intent = allReadinessReady(structuredClone(exampleIntent));
  const assessment = assessmentForIntent(intent);

  assessment.assessment_basis = "INDEPENDENT_ATTESTATION";
  assessment.verification.status = "INDEPENDENTLY_ATTESTED";
  assessment.verification.summary = "Independent attestation fixture for policy confidence mapping.";
  assessment.verification.verified_evidence_references = [
    "evidence://prospector/attestation/eligibility"
  ];

  const response = evaluateListingIntent(
    intent,
    new Date("2032-01-01T00:00:00Z"),
    { eligibilityAssessment: assessment }
  );

  assert.equal(response.eligibility_hypothesis.confidence, "HIGH");
  assert.equal(response.verification.facts_verified, false);
});

test("valid eligibility assessment for a different issuer is rejected", () => {
  const intent = structuredClone(exampleIntent);
  const foreignAssessment = structuredClone(exampleEligibility);

  assert.throws(
    () =>
      evaluateListingIntent(intent, new Date("2032-01-01T00:00:00Z"), {
        eligibilityAssessment: foreignAssessment
      }),
    /subject does not match/i
  );
});

test("same intent produces stable listing intent id across evaluator runs", () => {
  const first = evaluateListingIntent(exampleIntent, new Date("2032-01-01T00:00:00Z"));
  const second = evaluateListingIntent(exampleIntent, new Date("2032-01-02T00:00:00Z"));
  assert.equal(first.listing_intent_id, second.listing_intent_id);
});
