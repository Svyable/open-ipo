# Orbital Evidence Threat Model

**Version:** 0.1  
**Status:** project security proposal  
**Companion standard:** `EVIDENCE_STANDARD.md`

## 1. Purpose

Machine-readable evidence can make issuer claims more reviewable, but it also creates new ways to manufacture confidence.

This threat model asks:

> How could an issuer, compromised system, malicious third party, or well-intentioned but incorrect process create an evidence record that looks stronger than the underlying reality?

The model is defensive. It does not specify how to compromise spacecraft, telemetry systems, credentials, or market infrastructure.

## 2. Security boundary

An Orbital Evidence Envelope can improve:

- attribution,
- provenance visibility,
- temporal reconstruction,
- consistency checking,
- evidence linking,
- disclosure of uncertainty and limitations.

It cannot by itself prove:

- physical truth,
- legal enforceability,
- signer honesty,
- source-device integrity,
- completeness of disclosure,
- or independence of an attestor.

The project should treat every evidence path as potentially fallible.

## 3. Protected properties

The evidence system seeks to preserve:

### Subject integrity

Evidence is bound to the correct issuer, asset, agent, service event, incident, contract/right, or measurement target.

### Claim integrity

A reviewer can tell what exact proposition the evidence is intended to support.

### Provenance integrity

A reviewer can reconstruct where the evidence came from and what transformations were applied.

### Temporal integrity

Observation, source-record, receipt, publication, attestation, and supersession times are not silently conflated.

### Attribution integrity

Issuer assertions and third-party attestations identify their actors/credentials/relationships.

### Content integrity

Where evidence bytes are referenced, digests bind the envelope to a specific representation.

### Freshness integrity

Old evidence cannot be presented as current merely by republishing it.

### Completeness transparency

Known selection, missing data, contradictory observations, and material exclusions are not hidden by the envelope format.

### Historical integrity

Corrections and revocations do not erase the prior public record.

## 4. Threat actors and failure sources

Threats may arise from:

- issuer personnel,
- autonomous issuer agents,
- compromised issuer software,
- compromised spacecraft or sensors,
- ground/relay providers,
- customers/counterparties,
- external attackers,
- compromised signing credentials,
- dishonest or conflicted attestors,
- erroneous transformations/calibration,
- accidental misconfiguration,
- stale caches or delayed communications,
- incomplete data-retention systems.

The project should not assume malicious intent is required for misleading evidence.

## 5. Threat taxonomy

### T1 — Fabricated source evidence

A source produces data describing a state/event that did not occur.

Examples at a high level:

- false operational-state telemetry,
- invented customer/service records,
- fabricated mission logs,
- synthetic measurement records presented as observations.

Mitigations:

- source attribution,
- independent observation where appropriate,
- cross-system reconciliation,
- content digests,
- audit/log retention,
- explicit assertion vs attestation roles.

Residual risk:

Multiple colluding or commonly compromised sources can still agree on a false claim.

### T2 — Replay of valid old evidence

Previously valid evidence is republished to imply current state.

Example:

A prior healthy-state telemetry summary is reused after an asset has degraded.

Mitigations:

- stable envelope/claim IDs,
- observation time separate from publication time,
- derived freshness,
- claim revisions,
- supersession links,
- source sequence/event identifiers where available.

### T3 — Publication-time laundering

An old observation is given a new publication timestamp and appears fresh because consumers use the wrong time field.

Mitigations:

- freshness derived from `observed_at`, not `issued_at`,
- explicit received/publication-delay metadata,
- CI/policy checks on timestamp relationships.

### T4 — Compromised signing credential

An attacker or unauthorized actor can produce technically valid signatures using a compromised credential.

Mitigations:

- credential/key identifiers,
- authority mapping,
- credential-status/revocation references,
- rapid public supersession/revocation envelopes,
- independent evidence where material.

Residual risk:

Cryptographic validity does not prove authorization at event time unless credential status/history is reconstructable.

### T5 — Unauthorized but validly authenticated actor

A credential belongs to a real actor but the actor exceeds delegated authority.

Mitigations:

- link agent/action evidence to policy version and authority record,
- identify accountable principal,
- preserve command/control map,
- distinguish action production from authorized execution.

### T6 — Subject substitution

Evidence about one asset/service/agent is applied to another.

Mitigations:

- canonical subject identifiers,
- related-subject references,
- cross-contract subject binding,
- reject ambiguous identifiers where material.

### T7 — Equivocation

Different audiences receive conflicting evidence envelopes for the same claim/revision/time window.

Mitigations:

- stable claim IDs + revisions,
- public GitHub/versioned publication where appropriate,
- content digests,
- append-only supersession,
- conflict disclosure.

Future work may define stronger transparency-log mechanisms.

### T8 — Selective disclosure / cherry-picking

A truthful evidence item is selected from a larger population that would change the conclusion.

Examples:

- publishing one successful service event while omitting repeated failures,
- selecting the healthiest telemetry interval,
- showing only favorable measurement samples.

Mitigations:

- coverage period,
- expected/observed counts,
- selection method,
- known exclusions,
- missing-data disclosure,
- contradictory-evidence disclosure,
- independent review.

### T9 — Shared-source false independence

Two “independent” observations ultimately depend on the same source data, operator, sensor, model, or communications path.

Mitigations:

- source-class disclosure,
- operator/relationship disclosure,
- provenance chains,
- attestor relationship fields,
- no automatic independence score.

### T10 — Conflicted attestor

An attestor is economically or operationally dependent on the issuer but is described as independent without context.

Mitigations:

- disclose relationship category,
- disclose compensation/material conflicts where appropriate,
- scope the attestation narrowly,
- treat independence as reviewable metadata rather than boolean proof.

### T11 — Transformation error

Correct source data becomes incorrect through filtering, aggregation, unit conversion, model inference, calibration, or redaction.

Mitigations:

- transformation-chain metadata,
- method/version identification,
- digest source and transformed representations separately,
- uncertainty/limitations,
- reproducible calculations where practical.

### T12 — Calibration/model drift

A sensor/model was previously valid but later becomes biased or inaccurate.

Mitigations:

- calibration references,
- model/software version,
- uncertainty,
- periodic revalidation,
- supersede affected evidence when material errors are discovered.

### T13 — Time-source ambiguity

Clock drift, local-only time, or uncertain synchronization causes incorrect ordering or freshness conclusions.

Mitigations:

- time-source identity,
- clock-quality state,
- uncertainty bounds,
- avoid false timestamp precision,
- `UNKNOWN` freshness when ordering cannot be defended.

### T14 — Partition/delay ambiguity

Communications delay makes old evidence arrive late, or current state is unknown during a partition.

Mitigations:

- observation/receipt/publication times,
- connectivity context,
- derived freshness,
- explicit `UNKNOWN`/`DEGRADED` states rather than pretending continuity.

### T15 — Evidence URI mutation

External content at a URI changes after publication.

Mitigations:

- content digest,
- immutable/content-addressed references when available,
- retention/retrieval policy.

### T16 — Digest scope confusion

A digest binds to a redacted/summary artifact but consumers assume it binds raw source evidence.

Mitigations:

- explicit digest scope,
- separate evidence item records per representation,
- transformation links.

### T17 — Redaction laundering

Material contradictory or limiting information is withheld under a vague “confidential” label.

Mitigations:

- disclosure-state reason,
- limitation impact,
- digest retained where possible,
- independent review of withheld evidence where appropriate,
- no automatic acceptance of redaction as immaterial.

### T18 — Evidence flooding

A large volume of low-value evidence obscures the few items that determine the claim.

Mitigations:

- explicit claim-to-evidence links,
- evidence roles/scopes,
- concise evidence manifest,
- do not use quantity of evidence as quality score.

### T19 — Duplicate-evidence inflation

The same underlying observation is represented multiple ways and treated as independent corroboration.

Mitigations:

- source/provenance identifiers,
- digest comparison,
- parent/source references,
- independence metadata.

### T20 — Contradictory evidence suppression

Known evidence contradicting the issuer's preferred claim is omitted.

Mitigations:

- completeness/known-contradictions fields,
- attestor scope/limitations,
- later conflict envelopes,
- continuing-disclosure duties in proposed listing standard.

### T21 — Stale rights evidence

A contract, license, title, or control right was valid when evidenced but has since changed/terminated.

Mitigations:

- claim-specific freshness policy,
- validity windows,
- supersession/revocation,
- continuing rights/control disclosure.

### T22 — Chain-of-custody break

A resource sample, output artifact, or data product cannot be reliably linked from source to reported result.

Mitigations:

- chain-of-custody evidence items,
- transfer timestamps/identities,
- digests,
- uncertainty/known gaps.

### T23 — Agent identity/version substitution

An action is attributed to an agent name while a materially different policy/model/version actually executed it.

Mitigations:

- agent instance/version,
- policy/version,
- credential/account binding,
- authority evidence,
- signed event/log references where available.

### T24 — Simulation/live-data confusion

Simulation, test, or synthetic data is represented as live operational evidence.

Mitigations:

- evidence source/environment classification,
- method disclosure,
- explicit simulation/test markers,
- separate live vs modeled claims.

### T25 — Financial/operational mismatch

Operational evidence exists but is incorrectly connected to reported revenue, inventory, impairment, or cost.

Mitigations:

- reconciliation evidence,
- contract/performance-obligation link,
- accounting record link,
- avoid assuming telemetry directly equals GAAP/other accounting recognition.

## 6. Trust levels are multidimensional

The project should not compress the following into one score:

- cryptographic attribution,
- source independence,
- evidence freshness,
- completeness,
- measurement uncertainty,
- chain of custody,
- attestation scope,
- rights/legal review,
- financial reconciliation.

An envelope may be strong on one dimension and weak on another.

## 7. Verification semantics

Recommended terminology:

### `STRUCTURALLY_VALID`

Envelope matches schema.

### `INTERNALLY_CONSISTENT`

Deterministic project policy finds no modeled contradiction.

### `SIGNATURE_CHECKED`

A compatible cryptographic verifier checked a declared signature.

This does not imply source truth.

### `ATTESTED`

One or more attestors issued scoped conclusions.

This does not imply independence or full-claim assurance unless separately supported.

### `FACTUALLY_VERIFIED`

The project should avoid using this label automatically.

A future assurance framework would need to define who can make such a conclusion, its scope, evidence, jurisdiction, and liability.

## 8. Security-sensitive data handling

Evidence review should not create a public repository of operational secrets.

Do not require public disclosure of:

- private/signing keys,
- command credentials,
- spacecraft command sequences that increase operational risk,
- exploitable infrastructure detail,
- controlled technical data,
- confidential personal information,
- nonpublic transaction information.

Use:

- high-level summaries,
- digests,
- redaction metadata,
- scoped third-party attestations,
- public evidence references,
- security-reviewed disclosure processes.

## 9. GitHub-native threat considerations

When evidence envelopes are proposed through GitHub:

- PR content is untrusted input,
- JSON may contain huge strings/URIs unless bounded by schema/workflow limits,
- applicant-controlled text must not create mentions/HTML injection in bot comments,
- Git history proves repository history, not underlying physical truth,
- a contributor account compromise can create misleading commits/PRs,
- Actions must not execute applicant code under privileged tokens.

The existing `SECURITY.md` workflow invariants remain applicable.

## 10. Failure response

When evidence integrity becomes materially uncertain, a project/venue should be able to distinguish:

```text
one evidence item disputed
→ claim under review

material claim stale/contradicted
→ disclosure degraded

issuer signing authority compromised
→ affected evidence trust degraded / re-attestation required

material operating reality cannot be established
→ potential listing-status or trading response under future rules
```

The evidence standard itself should not hard-code trading halts.

## 11. Security test vectors

The project should maintain benign test fixtures for:

- stale/replayed envelope,
- future-dated observation,
- duplicate evidence IDs,
- conflicting attestation references,
- self-supersession,
- mismatched subject ID,
- invalid freshness bands,
- missing digest scope,
- redaction mismatch,
- unknown clock quality,
- applicant claim that self-attestation is independent.

These are format/consistency tests, not offensive exploitation recipes.

## 12. Residual risk

Even a well-designed evidence framework cannot eliminate:

- coordinated fraud,
- unknown sensor compromise,
- sophisticated source collusion,
- undisclosed conflicting evidence,
- legal disputes over rights,
- scientific/model uncertainty,
- communication partitions,
- future cryptographic weaknesses.

The goal is not perfect truth.

The goal is to make **how we know what we think we know** explicit enough to audit, challenge, update, and reconstruct.
