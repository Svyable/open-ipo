const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");

const evidenceSchema = require("../schemas/orbital-evidence-envelope.schema.json");

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validateSchema = ajv.compile(evidenceSchema);

function schemaErrors() {
  return (validateSchema.errors || []).map((error) => ({
    code: "SCHEMA_VALIDATION",
    path: error.instancePath || "/",
    message: error.message || "schema validation error"
  }));
}

function validateEvidenceEnvelope(envelope) {
  const valid = validateSchema(envelope);
  return {
    valid: Boolean(valid),
    errors: valid ? [] : schemaErrors()
  };
}

function dateMs(value) {
  return value ? Date.parse(value) : null;
}

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

function deriveFreshness(envelope, asOf = new Date()) {
  const asOfMs = asOf instanceof Date ? asOf.getTime() : Date.parse(asOf);
  if (!Number.isFinite(asOfMs)) throw new Error("Invalid freshness as_of time");

  const claimValidUntil = dateMs(envelope.claim.valid_until);
  const policyExpiresAt = dateMs(envelope.freshness_policy.expires_at);
  const hardExpiryCandidates = [claimValidUntil, policyExpiresAt].filter(Number.isFinite);
  if (hardExpiryCandidates.length > 0 && asOfMs > Math.min(...hardExpiryCandidates)) {
    return {
      status: "EXPIRED",
      as_of: new Date(asOfMs).toISOString(),
      age_seconds: null,
      basis_time: null
    };
  }

  const timeQuality = envelope.observation.time_basis.quality;
  if (timeQuality === "UNKNOWN" || timeQuality === "LOCAL_ONLY") {
    return {
      status: "UNKNOWN",
      as_of: new Date(asOfMs).toISOString(),
      age_seconds: null,
      basis_time: null
    };
  }

  let basisTime;
  switch (envelope.freshness_policy.basis) {
    case "CLAIM_OBSERVATION_TIME":
      basisTime = envelope.observation.observed_at;
      break;
    case "CLAIM_VALID_FROM":
      basisTime = envelope.claim.valid_from;
      break;
    case "OTHER":
    default:
      return {
        status: "UNKNOWN",
        as_of: new Date(asOfMs).toISOString(),
        age_seconds: null,
        basis_time: null
      };
  }

  const basisMs = dateMs(basisTime);
  if (!Number.isFinite(basisMs)) {
    return {
      status: "UNKNOWN",
      as_of: new Date(asOfMs).toISOString(),
      age_seconds: null,
      basis_time: basisTime || null
    };
  }

  const uncertaintyMs =
    Number(envelope.observation.time_basis.uncertainty_seconds || 0) * 1000;
  if (basisMs > asOfMs + uncertaintyMs) {
    return {
      status: "FUTURE_DATED",
      as_of: new Date(asOfMs).toISOString(),
      age_seconds: (asOfMs - basisMs) / 1000,
      basis_time: basisTime
    };
  }

  const ageSeconds = Math.max(0, (asOfMs - basisMs) / 1000);
  const currentFor = envelope.freshness_policy.current_for_seconds;
  const staleAfter = envelope.freshness_policy.stale_after_seconds;

  let status;
  if (ageSeconds <= currentFor) status = "CURRENT";
  else if (ageSeconds <= staleAfter) status = "DEGRADED";
  else status = "STALE";

  return {
    status,
    as_of: new Date(asOfMs).toISOString(),
    age_seconds: ageSeconds,
    basis_time: basisTime
  };
}

function consistencyErrors(envelope) {
  const errors = [];
  const warnings = [];

  const evidenceIds = envelope.evidence_items.map((item) => item.evidence_id);
  for (const duplicate of duplicateValues(evidenceIds)) {
    errors.push({
      code: "DUPLICATE_EVIDENCE_ID",
      path: "/evidence_items",
      message: `duplicate evidence_id: ${duplicate}`
    });
  }

  const attestationIds = envelope.attestations.map((item) => item.attestation_id);
  for (const duplicate of duplicateValues(attestationIds)) {
    errors.push({
      code: "DUPLICATE_ATTESTATION_ID",
      path: "/attestations",
      message: `duplicate attestation_id: ${duplicate}`
    });
  }

  if (
    envelope.freshness_policy.current_for_seconds >
    envelope.freshness_policy.stale_after_seconds
  ) {
    errors.push({
      code: "INVALID_FRESHNESS_BANDS",
      path: "/freshness_policy",
      message: "current_for_seconds must not exceed stale_after_seconds"
    });
  }

  const observedAt = dateMs(envelope.observation.observed_at);
  const issuedAt = dateMs(envelope.issued_at);
  const assertionAt = dateMs(envelope.assertion.issued_at);
  const sourceRecordedAt = dateMs(envelope.observation.source_recorded_at);
  const receivedAt = dateMs(envelope.observation.received_at);

  if (Number.isFinite(observedAt) && Number.isFinite(issuedAt) && issuedAt < observedAt) {
    errors.push({
      code: "ENVELOPE_BEFORE_OBSERVATION",
      path: "/issued_at",
      message: "issued_at cannot precede observed_at"
    });
  }

  if (Number.isFinite(observedAt) && Number.isFinite(assertionAt) && assertionAt < observedAt) {
    errors.push({
      code: "ASSERTION_BEFORE_OBSERVATION",
      path: "/assertion/issued_at",
      message: "assertion issued_at cannot precede the claim observation"
    });
  }

  if (
    Number.isFinite(sourceRecordedAt) &&
    Number.isFinite(observedAt) &&
    sourceRecordedAt < observedAt
  ) {
    warnings.push({
      code: "SOURCE_RECORDED_BEFORE_OBSERVATION",
      path: "/observation/source_recorded_at",
      message:
        "source_recorded_at precedes observed_at; this may be valid only if the time semantics are intentionally different"
    });
  }

  if (
    Number.isFinite(receivedAt) &&
    Number.isFinite(observedAt) &&
    receivedAt < observedAt
  ) {
    errors.push({
      code: "RECEIVED_BEFORE_OBSERVATION",
      path: "/observation/received_at",
      message: "received_at cannot precede observed_at"
    });
  }

  const validFrom = dateMs(envelope.claim.valid_from);
  const validUntil = dateMs(envelope.claim.valid_until);
  if (Number.isFinite(validFrom) && Number.isFinite(validUntil) && validUntil < validFrom) {
    errors.push({
      code: "INVALID_CLAIM_VALIDITY_WINDOW",
      path: "/claim",
      message: "valid_until cannot precede valid_from"
    });
  }

  const coverageStart = dateMs(envelope.completeness.coverage_start);
  const coverageEnd = dateMs(envelope.completeness.coverage_end);
  if (
    Number.isFinite(coverageStart) &&
    Number.isFinite(coverageEnd) &&
    coverageEnd < coverageStart
  ) {
    errors.push({
      code: "INVALID_COVERAGE_WINDOW",
      path: "/completeness",
      message: "coverage_end cannot precede coverage_start"
    });
  }

  if (envelope.completeness.selection_method === "COMPLETE_POPULATION") {
    const expected = envelope.completeness.expected_observation_count;
    const included = envelope.completeness.included_observation_count;
    const missing = envelope.completeness.missing_observation_count;
    if (
      Number.isInteger(expected) &&
      Number.isInteger(included) &&
      Number.isInteger(missing) &&
      included + missing !== expected
    ) {
      errors.push({
        code: "INCONSISTENT_COMPLETE_POPULATION_COUNTS",
        path: "/completeness",
        message:
          "for COMPLETE_POPULATION, included_observation_count + missing_observation_count must equal expected_observation_count"
      });
    }
  }

  const evidenceIdSet = new Set(evidenceIds);
  for (const [index, attestation] of envelope.attestations.entries()) {
    for (const evidenceId of attestation.scope.evidence_item_ids) {
      if (!evidenceIdSet.has(evidenceId)) {
        errors.push({
          code: "ATTESTATION_UNKNOWN_EVIDENCE_REFERENCE",
          path: `/attestations/${index}/scope/evidence_item_ids`,
          message: `attestation references unknown evidence item ${evidenceId}`
        });
      }
    }

    if (
      attestation.relationship.independence_claimed &&
      [
        "AFFILIATE",
        "SHAREHOLDER",
        "SUPPLIER",
        "CUSTOMER",
        "OPERATOR",
        "LENDER",
        "INSURER"
      ].includes(attestation.relationship.category)
    ) {
      warnings.push({
        code: "INDEPENDENCE_REQUIRES_REVIEW",
        path: `/attestations/${index}/relationship`,
        message:
          "attestation claims independence despite a relationship category that may create economic or operational dependence; independence must be reviewed, not inferred"
      });
    }
  }

  for (const [index, item] of envelope.evidence_items.entries()) {
    if (
      item.content.digest === null &&
      item.content.uri !== null &&
      item.disclosure_state === "PUBLIC"
    ) {
      warnings.push({
        code: "MUTABLE_URI_WITHOUT_DIGEST",
        path: `/evidence_items/${index}/content`,
        message:
          "public evidence has a URI but no digest; remote content could change without detection"
      });
    }

    if (
      item.disclosure_state === "PUBLIC_REDACTED" &&
      item.content.digest_scope === "ORIGINAL_SOURCE"
    ) {
      warnings.push({
        code: "REDACTED_ITEM_DIGEST_SCOPE_REVIEW",
        path: `/evidence_items/${index}/content/digest_scope`,
        message:
          "redacted evidence declares ORIGINAL_SOURCE digest scope; consumers should confirm the digest really binds the withheld original rather than only the public redaction"
      });
    }
  }

  if (envelope.disclosure.state === "PUBLIC" && envelope.disclosure.redactions.length > 0) {
    errors.push({
      code: "PUBLIC_DISCLOSURE_WITH_REDACTIONS",
      path: "/disclosure",
      message: "PUBLIC disclosure state cannot contain redactions"
    });
  }

  if (
    envelope.disclosure.state === "PUBLIC_REDACTED" &&
    envelope.disclosure.redactions.length === 0
  ) {
    errors.push({
      code: "REDACTED_DISCLOSURE_WITHOUT_REDACTION_RECORD",
      path: "/disclosure",
      message: "PUBLIC_REDACTED disclosure state requires at least one redaction record"
    });
  }

  if (
    ["WITHHELD_SECURITY_SENSITIVE", "WITHHELD_LEGAL_OR_CONTRACTUAL"].includes(
      envelope.disclosure.state
    ) &&
    envelope.disclosure.raw_source_public
  ) {
    errors.push({
      code: "WITHHELD_BUT_RAW_SOURCE_PUBLIC",
      path: "/disclosure",
      message: "withheld disclosure state is inconsistent with raw_source_public=true"
    });
  }

  for (const [index, relation] of envelope.supersession.entries()) {
    if (relation.prior_envelope_id === envelope.envelope_id) {
      errors.push({
        code: "SELF_SUPERSESSION",
        path: `/supersession/${index}/prior_envelope_id`,
        message: "an evidence envelope cannot supersede, correct, revoke, or restate itself"
      });
    }
  }

  for (const duplicate of duplicateValues(
    envelope.supersession.map((relation) => relation.prior_envelope_id)
  )) {
    warnings.push({
      code: "DUPLICATE_SUPERSESSION_REFERENCE",
      path: "/supersession",
      message: `multiple supersession records reference the same prior envelope ${duplicate}`
    });
  }

  const uncertainty = envelope.observation.uncertainty;
  if (uncertainty.status === "QUANTIFIED") {
    const quantified = [
      uncertainty.absolute_error,
      uncertainty.relative_error_percent,
      uncertainty.confidence_percent,
      uncertainty.lower_bound,
      uncertainty.upper_bound
    ].some((value) => typeof value === "number");
    if (!quantified) {
      errors.push({
        code: "QUANTIFIED_UNCERTAINTY_WITHOUT_NUMERIC_DETAIL",
        path: "/observation/uncertainty",
        message: "QUANTIFIED uncertainty requires at least one numeric uncertainty field"
      });
    }
  }

  if (
    typeof uncertainty.lower_bound === "number" &&
    typeof uncertainty.upper_bound === "number" &&
    uncertainty.lower_bound > uncertainty.upper_bound
  ) {
    errors.push({
      code: "INVALID_UNCERTAINTY_BOUNDS",
      path: "/observation/uncertainty",
      message: "lower_bound cannot exceed upper_bound"
    });
  }

  if (
    envelope.assertion.assertion_type === "CONTROLLED_AGENT_ASSERTION" &&
    envelope.assertion.accountable_principal === null
  ) {
    errors.push({
      code: "AGENT_ASSERTION_WITHOUT_ACCOUNTABLE_PRINCIPAL",
      path: "/assertion/accountable_principal",
      message: "CONTROLLED_AGENT_ASSERTION requires an accountable principal"
    });
  }

  if (
    ["ASSET_OPERATIONAL", "SERVICE_DELIVERED", "INCIDENT_OCCURRED"].includes(
      envelope.claim.claim_type
    ) &&
    envelope.observation.environment !== "LIVE_OPERATION"
  ) {
    warnings.push({
      code: "LIVE_CLAIM_NONLIVE_ENVIRONMENT",
      path: "/observation/environment",
      message:
        "claim normally describes live operating reality but the observation environment is not LIVE_OPERATION"
    });
  }

  if (envelope.completeness.known_contradictions.length > 0) {
    warnings.push({
      code: "KNOWN_CONTRADICTORY_EVIDENCE",
      path: "/completeness/known_contradictions",
      message:
        "the envelope discloses known contradictory evidence; consumers should not treat this envelope as unqualified support for the claim"
    });
  }

  return { errors, warnings };
}

function evaluateEvidenceEnvelope(envelope, asOf = new Date()) {
  const schemaValidation = validateEvidenceEnvelope(envelope);
  if (!schemaValidation.valid) {
    return {
      valid: false,
      structurally_valid: false,
      internally_consistent: false,
      errors: schemaValidation.errors,
      warnings: [],
      freshness: null,
      signature_status: "NOT_CHECKED",
      factual_verification: false
    };
  }

  const { errors, warnings } = consistencyErrors(envelope);
  const freshness = deriveFreshness(envelope, asOf);

  if (freshness.status === "FUTURE_DATED") {
    errors.push({
      code: "FUTURE_DATED_OBSERVATION",
      path: "/observation/observed_at",
      message: "observation time is materially after the evaluation as_of time"
    });
  }

  if (freshness.status === "STALE") {
    warnings.push({
      code: "STALE_EVIDENCE",
      path: "/freshness_policy",
      message: "evidence is stale under its declared freshness policy at the evaluation time"
    });
  }

  if (freshness.status === "EXPIRED") {
    warnings.push({
      code: "EXPIRED_EVIDENCE",
      path: "/freshness_policy",
      message: "evidence has passed a declared hard validity limit at the evaluation time"
    });
  }

  if (freshness.status === "UNKNOWN") {
    warnings.push({
      code: "UNKNOWN_FRESHNESS",
      path: "/observation/time_basis",
      message: "freshness cannot be defensibly derived from the declared time basis"
    });
  }

  return {
    valid: errors.length === 0,
    structurally_valid: true,
    internally_consistent: errors.length === 0,
    errors,
    warnings,
    freshness,
    signature_status: "NOT_CHECKED",
    attestation_count: envelope.attestations.length,
    factual_verification: false
  };
}

module.exports = {
  consistencyErrors,
  deriveFreshness,
  evaluateEvidenceEnvelope,
  validateEvidenceEnvelope
};
