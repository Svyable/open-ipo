const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");

const catalog = require("../standards/catalog.json");
const eligibilitySchema = require("../schemas/issuer-eligibility-assessment.schema.json");

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validateSchema = ajv.compile(eligibilitySchema);

const MATERIALITY_PRESUMPTION = 25;
const CONCENTRATION_PRESUMPTION = 50;
const PRE_OPERATIONAL_CAPITAL_PRESUMPTION = 50;

function validationErrors(validate) {
  return (validate.errors || []).map((error) => ({
    type: "SCHEMA",
    instancePath: error.instancePath || "/",
    keyword: error.keyword,
    message: error.message || "schema validation error"
  }));
}

function standardEntry() {
  const standard = catalog.artifacts.find((artifact) => artifact.id === "standard.eligibility");
  if (!standard || !standard.version) {
    throw new Error("standards catalog is missing versioned standard.eligibility");
  }
  return standard;
}

function derivePresumptions(assessment) {
  const metrics = assessment?.gates?.material_dependence?.metrics || [];
  const percentages = metrics
    .map((metric) => Number(metric.percentage))
    .filter((value) => Number.isFinite(value));

  const preOperational = assessment?.gates?.pre_operational_pathway;
  const committedCapital = Number(preOperational?.committed_24_month_nt_capital_share);

  return {
    materiality_presumption_25_triggered: percentages.some(
      (value) => value >= MATERIALITY_PRESUMPTION
    ),
    concentration_presumption_50_triggered: percentages.some(
      (value) => value >= CONCENTRATION_PRESUMPTION
    ),
    capital_presumption_50_triggered:
      preOperational?.applicable === true &&
      Number.isFinite(committedCapital) &&
      committedCapital >= PRE_OPERATIONAL_CAPITAL_PRESUMPTION
  };
}

function deriveEligibilityClassification(assessment) {
  const gates = assessment.gates;
  const nexus = gates.qualifying_nexus;
  const materiality = gates.material_dependence;
  const rights = gates.rights_control;
  const evidence = gates.evidence_sufficiency;
  const preOperational = gates.pre_operational_pathway;

  if (!nexus.passed) return "TERRESTRIAL_SPACE_SECTOR_VENDOR";
  if (!rights.passed) return "UNDETERMINED";

  if (preOperational?.applicable === true) {
    return preOperational.qualifies
      ? "PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE"
      : "UNDETERMINED";
  }

  if (!evidence.passed) return "UNDETERMINED";
  if (!materiality.passed) return "TERRESTRIAL_SPACE_SECTOR_VENDOR";

  if (
    materiality.concentration_presumption_50_triggered ||
    materiality.core_enterprise_override
  ) {
    return "NON_TERRESTRIAL_ISSUER";
  }

  return "HYBRID_EARTH_SPACE_ISSUER";
}

function validateEligibilityAssessment(assessment) {
  const schemaValid = validateSchema(assessment);
  if (!schemaValid) {
    return {
      valid: false,
      errors: validationErrors(validateSchema)
    };
  }

  const errors = [];
  const standard = standardEntry();
  const materiality = assessment.gates.material_dependence;
  const preOperational = assessment.gates.pre_operational_pathway;
  const derived = derivePresumptions(assessment);

  if (assessment.standard.version !== standard.version) {
    errors.push({
      type: "SEMANTIC",
      instancePath: "/standard/version",
      message: `assessment standard version ${assessment.standard.version} does not match catalog standard.eligibility version ${standard.version}`
    });
  }

  if (
    materiality.materiality_presumption_25_triggered !==
    derived.materiality_presumption_25_triggered
  ) {
    errors.push({
      type: "SEMANTIC",
      instancePath: "/gates/material_dependence/materiality_presumption_25_triggered",
      message: `25% materiality presumption must equal ${derived.materiality_presumption_25_triggered} for the submitted metrics`
    });
  }

  if (
    materiality.concentration_presumption_50_triggered !==
    derived.concentration_presumption_50_triggered
  ) {
    errors.push({
      type: "SEMANTIC",
      instancePath: "/gates/material_dependence/concentration_presumption_50_triggered",
      message: `50% concentration presumption must equal ${derived.concentration_presumption_50_triggered} for the submitted metrics`
    });
  }

  if (
    preOperational?.applicable === true &&
    preOperational.capital_presumption_50_triggered !==
      derived.capital_presumption_50_triggered
  ) {
    errors.push({
      type: "SEMANTIC",
      instancePath: "/gates/pre_operational_pathway/capital_presumption_50_triggered",
      message: `50% pre-operational capital presumption must equal ${derived.capital_presumption_50_triggered}`
    });
  }

  const expectedClassification = deriveEligibilityClassification(assessment);
  if (assessment.assessed_classification !== expectedClassification) {
    errors.push({
      type: "SEMANTIC",
      instancePath: "/assessed_classification",
      message: `classification must be ${expectedClassification} for the submitted gate states under policy.eligibility v0.1`
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    derived: {
      ...derived,
      assessed_classification: expectedClassification
    }
  };
}

module.exports = {
  CONCENTRATION_PRESUMPTION,
  MATERIALITY_PRESUMPTION,
  PRE_OPERATIONAL_CAPITAL_PRESUMPTION,
  deriveEligibilityClassification,
  derivePresumptions,
  validateEligibilityAssessment
};
