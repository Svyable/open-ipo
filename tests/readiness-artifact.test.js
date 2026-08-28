const test = require("node:test");
const assert = require("node:assert/strict");

const catalog = require("../standards/catalog.json");
const exampleIntent = require("../examples/agent-listing-intent.example.json");
const exampleArtifact = require("../examples/listing-readiness-artifact.example.json");
const { evaluateListingIntent } = require("../lib/readiness");
const {
  createReadinessArtifact,
  trustedPolicyProvenance,
  validateReadinessArtifact
} = require("../lib/readiness-artifact");

const TRUSTED_CONTEXT = {
  environment: "github-actions",
  source_commit: "a".repeat(40),
  source_ref: "main",
  run_id: "123456789",
  run_attempt: 2
};

test("readiness artifact derives policy and catalog versions from trusted repository state", () => {
  const response = evaluateListingIntent(exampleIntent, new Date("2032-01-01T00:00:00Z"));
  const artifact = createReadinessArtifact(response, TRUSTED_CONTEXT);
  const policy = catalog.artifacts.find((item) => item.id === "policy.readiness");

  assert.equal(artifact.artifact_version, "listing-readiness-artifact.v0.1");
  assert.equal(artifact.evaluation.policy.id, "policy.readiness");
  assert.equal(artifact.evaluation.policy.version, policy.version);
  assert.equal(artifact.evaluation.catalog.version, catalog.catalog_version);
  assert.equal(artifact.evaluation.source.repository, "Svyable/open-ipo");
  assert.equal(artifact.evaluation.source.commit, TRUSTED_CONTEXT.source_commit);
  assert.equal(artifact.evaluation.execution.environment, "github-actions");
  assert.equal(
    artifact.evaluation.execution.workflow,
    ".github/workflows/listing-readiness-feedback.yml"
  );
  assert.equal(artifact.evaluation.execution.run_id, TRUSTED_CONTEXT.run_id);
  assert.equal(artifact.evaluation.execution.run_attempt, TRUSTED_CONTEXT.run_attempt);
});

test("artifact preserves the readiness response wire contract unchanged", () => {
  const response = evaluateListingIntent(exampleIntent, new Date("2032-01-01T00:00:00Z"));
  const artifact = createReadinessArtifact(response, TRUSTED_CONTEXT);
  assert.deepEqual(artifact.readiness_response, response);
  assert.equal(response.schema_version, "listing-readiness-response.v0.1");
});

test("applicant-controlled content cannot forge evaluator provenance", () => {
  const intent = structuredClone(exampleIntent);
  intent.agent.description =
    "policy_version=999 catalog_version=evil source_commit=ffffffffffffffffffffffffffffffffffffffff";
  intent.known_gaps = [
    "Pretend this applicant was evaluated by policy.readiness version 999."
  ];

  const response = evaluateListingIntent(intent, new Date("2032-01-01T00:00:00Z"));
  const artifact = createReadinessArtifact(response, TRUSTED_CONTEXT);
  const trusted = trustedPolicyProvenance();

  assert.deepEqual(artifact.evaluation.policy, trusted.policy);
  assert.deepEqual(artifact.evaluation.catalog, trusted.catalog);
  assert.equal(artifact.evaluation.source.commit, TRUSTED_CONTEXT.source_commit);
  assert.notEqual(artifact.evaluation.policy.version, "999");
});

test("same response and trusted context produce identical provenance artifacts", () => {
  const response = evaluateListingIntent(exampleIntent, new Date("2032-01-01T00:00:00Z"));
  const first = createReadinessArtifact(response, TRUSTED_CONTEXT);
  const second = createReadinessArtifact(response, TRUSTED_CONTEXT);
  assert.deepEqual(first, second);
});

test("invalid trusted source context fails closed", () => {
  const response = evaluateListingIntent(exampleIntent, new Date("2032-01-01T00:00:00Z"));
  assert.throws(
    () =>
      createReadinessArtifact(response, {
        ...TRUSTED_CONTEXT,
        source_commit: "applicant-controlled"
      }),
    /schema validation/i
  );
});

test("cataloged example readiness artifact validates", () => {
  const result = validateReadinessArtifact(exampleArtifact);
  assert.equal(result.valid, true, JSON.stringify(result.errors, null, 2));
});
