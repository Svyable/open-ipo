const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");

const ROOT = path.resolve(__dirname, "..");
const CATALOG_PATH = path.join(ROOT, "standards", "catalog.json");
const CATALOG_SCHEMA_PATH = path.join(ROOT, "schemas", "standards-catalog.schema.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function newAjv() {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  return ajv;
}

function relativeFiles(directory, suffix) {
  return fs
    .readdirSync(path.join(ROOT, directory), { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(suffix))
    .map((entry) => `${directory}/${entry.name}`)
    .sort();
}

function repositoryAjv() {
  const ajv = newAjv();
  for (const schemaPath of relativeFiles("schemas", ".schema.json")) {
    ajv.addSchema(readJson(path.join(ROOT, schemaPath)));
  }
  return ajv;
}

const catalog = readJson(CATALOG_PATH);
const artifacts = new Map(catalog.artifacts.map((artifact) => [artifact.id, artifact]));

test("standards catalog validates against its schema", () => {
  const ajv = newAjv();
  const schema = readJson(CATALOG_SCHEMA_PATH);
  const validate = ajv.compile(schema);
  const valid = validate(catalog);
  assert.equal(valid, true, JSON.stringify(validate.errors, null, 2));
});

test("catalog preserves the project status boundary", () => {
  assert.equal(catalog.status_boundary.live_exchange, false);
  assert.equal(catalog.status_boundary.adopted_rulebook, false);
  assert.equal(catalog.status_boundary.legal_authority, false);
});

test("catalog artifact IDs are unique", () => {
  const ids = catalog.artifacts.map((artifact) => artifact.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("every catalog path exists and every dependency resolves", () => {
  for (const artifact of catalog.artifacts) {
    const filePath = path.join(ROOT, artifact.path);
    assert.equal(fs.existsSync(filePath), true, `${artifact.id} points to missing ${artifact.path}`);

    for (const dependency of artifact.depends_on || []) {
      assert.equal(
        artifacts.has(dependency),
        true,
        `${artifact.id} depends on unknown artifact ${dependency}`
      );
      assert.notEqual(dependency, artifact.id, `${artifact.id} cannot depend on itself`);
    }

    if (artifact.conforms_to) {
      assert.equal(
        artifacts.has(artifact.conforms_to),
        true,
        `${artifact.id} conforms_to unknown artifact ${artifact.conforms_to}`
      );
      assert.equal(
        artifacts.get(artifact.conforms_to).kind,
        "schema",
        `${artifact.id} conforms_to must point to a schema`
      );
    }
  }
});

test("catalog dependency graph is acyclic", () => {
  const visiting = new Set();
  const visited = new Set();

  function visit(id, trail = []) {
    if (visiting.has(id)) {
      assert.fail(`circular dependency detected: ${[...trail, id].join(" -> ")}`);
    }
    if (visited.has(id)) return;

    visiting.add(id);
    const artifact = artifacts.get(id);
    for (const dependency of artifact.depends_on || []) {
      visit(dependency, [...trail, id]);
    }
    visiting.delete(id);
    visited.add(id);
  }

  for (const id of artifacts.keys()) visit(id);
});

test("normative contract artifacts carry explicit project versions", () => {
  const versionedKinds = new Set(["standard", "schema", "policy", "governance"]);
  for (const artifact of catalog.artifacts) {
    if (artifact.normative && versionedKinds.has(artifact.kind)) {
      assert.match(
        artifact.version || "",
        /^v?\d+\.\d+(?:\.\d+)?$/,
        `${artifact.id} must declare a version`
      );
    }
  }
});

test("all JSON schemas are cataloged and resolve as draft 2020-12 contracts", () => {
  const schemaFiles = relativeFiles("schemas", ".schema.json");
  const cataloged = catalog.artifacts
    .filter((artifact) => artifact.kind === "schema")
    .map((artifact) => artifact.path)
    .sort();

  assert.deepEqual(cataloged, schemaFiles, "schemas/ contains an uncataloged or missing schema");

  const ajv = repositoryAjv();
  for (const artifact of catalog.artifacts.filter((item) => item.kind === "schema")) {
    const schema = readJson(path.join(ROOT, artifact.path));
    assert.equal(
      schema.$schema,
      "https://json-schema.org/draft/2020-12/schema",
      `${artifact.id} must use JSON Schema draft 2020-12`
    );
    assert.match(schema.$id || "", /^https:\/\//, `${artifact.id} must have an absolute HTTPS $id`);
    assert.doesNotThrow(
      () => ajv.getSchema(schema.$id),
      `${artifact.id} and all referenced repository schemas must resolve`
    );
    assert.ok(ajv.getSchema(schema.$id), `${artifact.id} must compile`);
  }
});

test("schema wire versions agree with the catalog", () => {
  for (const artifact of catalog.artifacts.filter((item) => item.kind === "schema" && item.wire_version)) {
    const schema = readJson(path.join(ROOT, artifact.path));
    const declared =
      schema.properties?.schema_version?.const ||
      schema.properties?.artifact_version?.const ||
      schema.properties?.catalog_version?.const;

    assert.equal(
      declared,
      artifact.wire_version,
      `${artifact.id} wire_version must match its schema const`
    );
  }
});

test("all JSON examples are cataloged and validate against their declared schemas", () => {
  const exampleFiles = relativeFiles("examples", ".json");
  const cataloged = catalog.artifacts
    .filter((artifact) => artifact.kind === "example")
    .map((artifact) => artifact.path)
    .sort();

  assert.deepEqual(cataloged, exampleFiles, "examples/ contains an uncataloged or missing JSON example");

  const ajv = repositoryAjv();
  for (const artifact of catalog.artifacts.filter((item) => item.kind === "example")) {
    assert.ok(artifact.conforms_to, `${artifact.id} must declare conforms_to`);
    const schemaArtifact = artifacts.get(artifact.conforms_to);
    const schema = readJson(path.join(ROOT, schemaArtifact.path));
    const example = readJson(path.join(ROOT, artifact.path));
    const validate = ajv.getSchema(schema.$id);
    assert.ok(validate, `${artifact.conforms_to} must resolve in repository schema registry`);
    const valid = validate(example);
    assert.equal(
      valid,
      true,
      `${artifact.id} does not conform to ${artifact.conforms_to}: ${JSON.stringify(validate.errors, null, 2)}`
    );
  }
});

test("GitHub-native readiness workflow keeps privileged execution on the trusted base", () => {
  const workflow = fs.readFileSync(
    path.join(ROOT, ".github", "workflows", "listing-readiness-feedback.yml"),
    "utf8"
  );

  assert.match(workflow, /pull_request_target:/);
  assert.ok(
    workflow.includes('ref: ${{ github.event.pull_request.base.sha }}'),
    "privileged workflow must check out the trusted base commit"
  );
  assert.ok(
    workflow.includes("persist-credentials: false"),
    "trusted checkout should not persist credentials"
  );
  assert.equal(
    workflow.includes('ref: ${{ github.event.pull_request.head.sha }}'),
    false,
    "privileged workflow must not check out applicant PR-head code"
  );
});
