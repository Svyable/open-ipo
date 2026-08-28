const test = require("node:test");
const assert = require("node:assert/strict");

const exampleIntent = require("../examples/agent-listing-intent.example.json");
const {
  classifyEligibility,
  evaluateListingIntent,
  validateIntent
} = require("../lib/readiness");

test("example listing intent validates", () => {
  const result = validateIntent(exampleIntent);
  assert.equal(result.valid, true, JSON.stringify(result.errors));
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

test("Earth-only intent is classified as terrestrial-only hypothesis", () => {
  const intent = structuredClone(exampleIntent);
  intent.non_terrestrial_thesis.operating_regions = ["earth_surface"];
  intent.non_terrestrial_thesis.material_dependency_on_beyond_earth_activity = false;

  const result = classifyEligibility(intent);
  assert.equal(result.classification, "terrestrial_only");
  assert.equal(result.confidence, "HIGH");
  assert.ok(result.blocking_questions.length > 0);
});

test("same intent produces stable listing intent id", () => {
  const first = evaluateListingIntent(exampleIntent, new Date("2032-01-01T00:00:00Z"));
  const second = evaluateListingIntent(exampleIntent, new Date("2032-01-02T00:00:00Z"));
  assert.equal(first.listing_intent_id, second.listing_intent_id);
});
