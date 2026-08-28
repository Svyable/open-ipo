const test = require("node:test");
const assert = require("node:assert/strict");

const intent = require("../examples/agent-listing-intent.example.json");
const { evaluateListingIntentBundle } = require("../lib/readiness");
const {
  readinessMarker,
  renderInvalidIntentComment,
  renderReadinessComment,
  safeText
} = require("../lib/readiness-comment");

test("readiness marker is stable and does not embed raw filename", () => {
  const filename = "intents/test-->@user.json";
  const first = readinessMarker(filename);
  const second = readinessMarker(filename);
  assert.equal(first, second);
  assert.ok(first.startsWith("<!-- orbital-readiness-bot:v0.1:"));
  assert.equal(first.includes("-->@user"), false);
});

test("safeText neutralizes mentions and HTML delimiters", () => {
  const output = safeText("@octocat <script>alert(1)</script>");
  assert.equal(output.includes("@octocat"), false);
  assert.equal(output.includes("<script>"), false);
  assert.ok(output.includes("&lt;script&gt;"));
});

test("readiness comment shows canonical eligibility and points to workflow artifacts", () => {
  const bundle = evaluateListingIntentBundle(
    intent,
    new Date("2032-01-01T00:00:00Z")
  );
  const comment = renderReadinessComment(
    "intents/prospector-7.json",
    intent,
    bundle.readiness_response,
    "https://github.com/Svyable/open-ipo/actions/runs/123",
    bundle.eligibility_assessment
  );

  assert.ok(comment.includes("Orbital Exchange pre-listing readiness"));
  assert.ok(comment.includes("Canonical eligibility outcome:"));
  assert.ok(comment.includes("UNDETERMINED"));
  assert.ok(comment.includes("PROJECT_REVIEW_UNVERIFIED"));
  assert.ok(comment.includes("Eligibility verification:"));
  assert.ok(comment.includes("PROJECT_UNVERIFIED"));
  assert.ok(comment.includes("Facts verified: **no**"));
  assert.ok(comment.includes("policy.eligibility"));
  assert.ok(comment.includes("actions/runs/123"));
  assert.equal(
    comment.includes(JSON.stringify(bundle.readiness_response, null, 2)),
    false
  );
  assert.ok(comment.length < 20000);
});

test("invalid intent comment keeps status boundary", () => {
  const comment = renderInvalidIntentComment(
    "intents/bad.json",
    "@bad-agent",
    [{ instancePath: "/agent/name", message: "must have required property" }]
  );

  assert.ok(comment.includes("not yet schema-valid"));
  assert.ok(comment.includes("will not verify facts or confer exchange admission"));
  assert.equal(comment.includes("@bad-agent"), false);
});
