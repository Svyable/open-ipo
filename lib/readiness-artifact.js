const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");

const catalog = require("../standards/catalog.json");
const responseSchema = require("../schemas/listing-readiness-response.schema.json");
const artifactSchema = require("../schemas/listing-readiness-artifact.schema.json");

const REPOSITORY = "Svyable/open-ipo";
const ARTIFACT_VERSION = "listing-readiness-artifact.v0.1";
const IMPLEMENTATION_ID = "open-ipo-readiness-artifact";
const WORKFLOW_PATH = ".github/workflows/listing-readiness-feedback.yml";

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
ajv.addSchema(responseSchema);
const validateArtifactSchema = ajv.compile(artifactSchema);

function validationErrors(validate) {
  return (validate.errors || []).map((error) => ({
    instancePath: error.instancePath || "/",
    keyword: error.keyword,
    message: error.message || "schema validation error"
  }));
}

function policyEntry() {
  const policy = catalog.artifacts.find((artifact) => artifact.id === "policy.readiness");
  if (!policy || !policy.version) {
    throw new Error("standards catalog is missing versioned policy.readiness");
  }
  return policy;
}

function trustedPolicyProvenance() {
  const policy = policyEntry();
  return {
    policy: {
      id: policy.id,
      version: policy.version
    },
    catalog: {
      version: catalog.catalog_version
    }
  };
}

function normalizeTrustedContext(context = {}) {
  const environment = context.environment || "compatible-implementation";
  const sourceCommit = String(context.source_commit || "").toLowerCase();

  const normalized = {
    source: {
      repository: REPOSITORY,
      commit: sourceCommit
    },
    execution: {
      environment,
      implementation: IMPLEMENTATION_ID
    }
  };

  if (context.source_ref) {
    normalized.source.ref = String(context.source_ref);
  }

  if (environment === "github-actions") {
    normalized.execution.workflow = WORKFLOW_PATH;
    normalized.execution.run_id = String(context.run_id || "");
    normalized.execution.run_attempt = Number(context.run_attempt || 0);
  } else if (context.implementation_version) {
    normalized.execution.implementation_version = String(context.implementation_version);
  }

  return normalized;
}

function createReadinessArtifact(readinessResponse, trustedContext) {
  const provenance = trustedPolicyProvenance();
  const context = normalizeTrustedContext(trustedContext);

  const artifact = {
    artifact_version: ARTIFACT_VERSION,
    evaluation: {
      ...provenance,
      ...context
    },
    readiness_response: readinessResponse
  };

  const valid = validateArtifactSchema(artifact);
  if (!valid) {
    const error = new Error("Generated readiness artifact failed schema validation");
    error.code = "INVALID_READINESS_ARTIFACT";
    error.validationErrors = validationErrors(validateArtifactSchema);
    throw error;
  }

  return artifact;
}

function validateReadinessArtifact(artifact) {
  const valid = validateArtifactSchema(artifact);
  return {
    valid: Boolean(valid),
    errors: valid ? [] : validationErrors(validateArtifactSchema)
  };
}

module.exports = {
  ARTIFACT_VERSION,
  IMPLEMENTATION_ID,
  REPOSITORY,
  WORKFLOW_PATH,
  createReadinessArtifact,
  trustedPolicyProvenance,
  validateReadinessArtifact
};
