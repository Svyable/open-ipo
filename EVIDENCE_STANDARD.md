# Proposed Orbital Evidence Envelope Standard

**Version:** 0.1  
**Status:** draft project proposal — not an adopted Orbital Exchange rule  
**Applies to:** material operating, control, rights, service-delivery, resource, continuity, and incident claims used by the `open-ipo` project

## 1. Purpose

A non-terrestrial issuer can make economically material claims that a terrestrial investor may not be able to observe directly:

- a spacecraft or payload is operational,
- a service was delivered beyond Earth,
- a resource measurement was obtained,
- an autonomous agent executed an action within delegated authority,
- a material asset was impaired,
- an operating right exists,
- a continuity test succeeded,
- or a mission event changed the issuer's economics.

The project needs a common way to make those claims **reviewable without pretending that structured data is automatically true**.

The core design is:

```text
claim
  ↓
subject + time + method
  ↓
evidence items + provenance
  ↓
issuer assertion
  ↓
optional independent attestations
  ↓
freshness + uncertainty + disclosure limits
  ↓
supersession / revocation history
```

The standard intentionally separates:

```text
claim
≠ evidence observation
≠ issuer assertion
≠ independent attestation
≠ factual verification
```

A cryptographically signed false statement is still false.

A schema-valid envelope is still only a structured envelope.

## 2. Status boundary

This document is a project proposal.

It is not:

- an adopted Orbital Exchange evidence rule,
- a legal evidentiary standard,
- an audit or assurance standard,
- a regulatory filing requirement,
- a cryptographic security certification,
- or proof that any issuer claim is true.

Conformance means only that evidence is represented according to this project's declared structure and consistency rules.

## 3. Design objectives

An Orbital Evidence Envelope should make it possible to answer:

1. **What exactly is being claimed?**
2. **Which issuer/asset/action/event does the claim concern?**
3. **When did the underlying observation or event occur?**
4. **When was the evidence published?**
5. **Which system or actor produced the underlying evidence?**
6. **What transformations occurred between source data and the published evidence item?**
7. **What uncertainty, error bounds, or confidence limits apply?**
8. **Who is asserting the claim?**
9. **Who, if anyone, independently attested to it?**
10. **How fresh is the evidence at the time a consumer evaluates it?**
11. **What was redacted or withheld?**
12. **What later envelope superseded, corrected, or revoked it?**
13. **Can a reviewer reconstruct enough of the chain to challenge the claim?**

The envelope should make ambiguity visible rather than hide it behind a generic `verified=true` field.

## 4. Core invariants

### Invariant 1 — claims have stable identity

Every material claim has a stable `claim_id`.

Corrections should normally create a new envelope revision or a superseding envelope rather than silently rewriting historical evidence.

### Invariant 2 — subject identity is explicit

Evidence must identify the subject it concerns.

Examples:

```text
issuer:selene
asset:SEL-LUNA-PROSPECT-03
agent:prospector-7
service-delivery:contract-448/event-19
incident:relay-loss-2032-04-18
```

A valid envelope for one subject must not be reused as evidence for another subject merely because the claim type is similar.

### Invariant 3 — observation time and publication time are different fields

The project must not collapse:

```text
when reality was observed
≠ when a source system recorded it
≠ when the issuer received it
≠ when the evidence envelope was published
```

These times can diverge materially under delayed or partitioned communications.

### Invariant 4 — evidence provenance is attributable

Every evidence item identifies:

- source class,
- source/operator identity where available,
- source time where available,
- acquisition method,
- content reference or digest,
- transformation chain where applicable.

### Invariant 5 — evidence content is content-addressable where practical

When evidence bytes are retained or externally addressable, the envelope should bind to them with a digest.

A URI alone is not enough because remote content can change.

### Invariant 6 — uncertainty is represented, not narrated away

Measurements should expose applicable uncertainty, confidence interval, error bound, method limitation, or an explicit statement that uncertainty is unknown/not quantified.

### Invariant 7 — assertion and attestation are distinct

An issuer can assert a claim.

A third party can attest to evidence or to the claim.

The envelope must disclose which is which.

### Invariant 8 — independence is a disclosed relationship, not a label

An `independent` attestor should disclose enough relationship context to evaluate independence.

Examples of potentially relevant relationships:

- customer,
- supplier,
- insurer,
- auditor,
- affiliate,
- operator,
- lender,
- shareholder,
- paid technical assessor.

The project does not convert a relationship field into a legal independence conclusion.

### Invariant 9 — freshness is derived from time and policy

Freshness should be computed from observation/event time plus a declared freshness policy.

A stored label such as `CURRENT` can become wrong as time passes.

The canonical envelope therefore carries the policy inputs; a deterministic evaluator derives freshness at an `as_of` time.

### Invariant 10 — supersession is append-only

Corrections, replacements, and revocations should be new records that reference prior records.

Historical evidence should remain reconstructable.

### Invariant 11 — redaction is explicit

The project does not require publication of:

- raw command credentials,
- private keys,
- proprietary raw telemetry,
- controlled technical data,
- security-sensitive operational detail,
- confidential personal or transaction data.

If material evidence is withheld or transformed, the envelope should disclose the existence and reason for the limitation.

### Invariant 12 — telemetry is evidence, not truth

Telemetry may be:

- forged,
- replayed,
- delayed,
- corrupted,
- miscalibrated,
- incomplete,
- generated by a compromised device,
- transformed incorrectly,
- or selectively disclosed.

A signed telemetry summary can improve attribution without eliminating those risks.

### Invariant 13 — envelope validity is not factual verification

The following are intentionally distinct:

```text
schema valid
≠ internally consistent
≠ signature verified
≠ source trustworthy
≠ evidence complete
≠ claim true
≠ issuer disclosure sufficient
```

## 5. Claim model

### 5.1 Claim identity

A claim should include:

- `claim_id` — stable claim identity,
- `claim_type` — machine-readable claim family,
- `statement` — concise human-readable proposition,
- `claim_scope` — what the claim covers,
- optional structured `value` and `unit`,
- `materiality` — whether the issuer treats the claim as material, supporting, or contextual.

The same `claim_id` can have multiple revisions over time.

### 5.2 Initial claim types

Version 0.1 supports at least:

- `ASSET_OPERATIONAL`
- `ASSET_LOCATION_OR_STATE`
- `SERVICE_DELIVERED`
- `PAYLOAD_OUTPUT_PRODUCED`
- `RESOURCE_MEASUREMENT`
- `RESOURCE_INVENTORY`
- `AGENT_ACTION_EXECUTED`
- `AGENT_AUTHORITY_VALID`
- `RIGHT_OR_CONTROL_EXISTS`
- `INCIDENT_OCCURRED`
- `ASSET_IMPAIRED`
- `CONTINUITY_TEST_COMPLETED`
- `FINANCIAL_RECONCILIATION`
- `OTHER`

New claim types should be added carefully because closed-enum consumers may treat additions as compatibility changes.

## 6. Subject model

The envelope identifies one primary subject and may identify related subjects.

Primary subject types include:

- `ISSUER`
- `ASSET`
- `AGENT`
- `SERVICE_DELIVERY`
- `RESOURCE_BODY_OR_INVENTORY`
- `INCIDENT`
- `CONTRACT_OR_RIGHT`
- `CONTINUITY_TEST`
- `OTHER`

Each subject has a canonical identifier.

Where an asset claim also concerns an issuer and agent, those should be represented as related subjects rather than overloaded into one string.

## 7. Time model

### 7.1 Canonical times

The envelope distinguishes:

- `observed_at` — when the underlying state was observed,
- `source_recorded_at` — when a source system recorded the observation, if different,
- `received_at` — when the issuer/evidence processor received it, if relevant,
- `issued_at` — when the envelope was issued,
- `attested_at` — when an attestor issued an attestation,
- `valid_from` / `valid_until` — optional claim validity bounds,
- `superseded_at` — represented by a later superseding record rather than mutable state where possible.

### 7.2 Clock context

Material time claims should disclose a time basis:

- clock/source identifier,
- quality classification,
- known uncertainty or drift where material.

Suggested quality states:

- `SYNCHRONIZED`
- `BOUNDED_UNCERTAINTY`
- `LOCAL_ONLY`
- `UNKNOWN`

An observation from an uncertain clock may still be useful, but its timing should not be presented with false precision.

## 8. Evidence-item model

An envelope can contain one or more evidence items.

Each item should identify:

- `evidence_id`,
- evidence type,
- source class,
- source/operator identity,
- acquisition method,
- source/observation time where relevant,
- content URI/reference where publishable,
- digest algorithm + digest where bytes are retained/addressable,
- media type,
- optional size,
- transformation steps,
- redaction state,
- limitations.

### 8.1 Evidence types

Initial types include:

- `TELEMETRY_SUMMARY`
- `MISSION_LOG`
- `SIGNED_EVENT_LOG`
- `THIRD_PARTY_OBSERVATION`
- `CUSTOMER_RECORD`
- `BILLING_OR_ACCOUNTING_RECORD`
- `CONTRACT_OR_RIGHT_RECORD`
- `CHAIN_OF_CUSTODY_RECORD`
- `MEASUREMENT_REPORT`
- `INCIDENT_RECORD`
- `CONTROL_AUTHORITY_RECORD`
- `SOFTWARE_OR_POLICY_RECORD`
- `TEST_RESULT`
- `IMAGE_OR_SENSOR_PRODUCT`
- `OTHER`

### 8.2 Source classes

Suggested source classes:

- `ISSUER_SYSTEM`
- `ISSUER_AGENT`
- `ASSET_ONBOARD_SYSTEM`
- `GROUND_SYSTEM`
- `CUSTOMER_SYSTEM`
- `COUNTERPARTY_SYSTEM`
- `INDEPENDENT_SENSOR`
- `PUBLIC_AUTHORITY`
- `AUDITOR_OR_ASSURANCE_PROVIDER`
- `OTHER`

Source class does not imply trustworthiness.

### 8.3 Transformations

If raw data is transformed into a public summary, record material transformations such as:

```text
raw telemetry
→ filter invalid frames
→ aggregate 60-second window
→ convert units
→ calculate operational-state predicate
→ redact sensitive fields
→ publish signed summary
```

The project does not require every implementation detail, but a reviewer should be able to understand how the published evidence relates to the source.

## 9. Evidence digests and content references

### 9.1 URI plus digest

Where possible, use both:

```text
uri/reference
+ digest algorithm
+ digest value
```

The URI helps retrieval.

The digest binds the envelope to content.

### 9.2 Digest scope

The envelope should say what bytes were digested:

- original source bytes,
- transformed artifact,
- redacted public artifact,
- canonical structured record.

Do not present a digest of one representation as if it binds another representation.

### 9.3 Cryptographic neutrality

Version 0.1 does not mandate one signature system, identity system, blockchain, telemetry vendor, or digest algorithm.

A future security profile may define acceptable algorithms and key-management requirements.

## 10. Assertion model

Every envelope identifies the party asserting the claim.

The assertion should include:

- assertor identity,
- role/relationship to issuer,
- assertion type,
- issued time,
- optional signing credential reference,
- optional signature metadata,
- credential/status reference where revocation can be checked.

Assertion types include:

- `ISSUER_ASSERTION`
- `CONTROLLED_AGENT_ASSERTION`
- `COUNTERPARTY_ASSERTION`
- `OTHER`

A `CONTROLLED_AGENT_ASSERTION` must still map to an accountable issuer/governance principal.

## 11. Attestation model

An envelope may include zero or more attestations.

Each attestation should state:

- attestor identity,
- relationship to issuer/subject,
- independence claim,
- attestation scope,
- evidence items reviewed,
- claim conclusion,
- limitations,
- issued time,
- credential/signature references where used.

### 11.1 Attestation conclusions

Initial conclusions:

- `SUPPORTS`
- `CONTRADICTS`
- `INCONCLUSIVE`
- `NOT_REVIEWED`

The project deliberately avoids a universal `verified=true` field.

### 11.2 Attestation scopes

Examples:

- observation occurred,
- asset identity matched,
- measurement method reviewed,
- contractual right reviewed,
- source digest matched retained evidence,
- control authority reviewed,
- financial reconciliation reviewed,
- complete claim not attested.

A narrow attestation should not be interpreted as assurance over the whole envelope.

## 12. Measurement and uncertainty model

When a claim is quantitative, the envelope should disclose as applicable:

- value,
- unit,
- measurement method,
- uncertainty type,
- absolute or relative error bound,
- confidence level/interval,
- detection threshold,
- calibration reference,
- model dependence,
- known limitations.

Possible uncertainty states:

- `QUANTIFIED`
- `QUALITATIVE`
- `NOT_APPLICABLE`
- `UNKNOWN`

`UNKNOWN` is preferable to invented precision.

## 13. Freshness model

Freshness is claim-specific.

An asset-operational claim may need minutes of freshness while a title/right record may remain useful for months until changed.

### 13.1 Freshness policy

Each envelope declares:

- `current_for_seconds` — age through which evidence is considered current,
- `stale_after_seconds` — age after which it is considered stale,
- optional `expires_at` — hard validity limit,
- optional rationale.

Constraint:

```text
0 <= current_for_seconds <= stale_after_seconds
```

### 13.2 Derived freshness states

At evaluation time `as_of`:

- `CURRENT` — observation age ≤ `current_for_seconds`,
- `DEGRADED` — age is above current band but ≤ `stale_after_seconds`,
- `STALE` — age exceeds `stale_after_seconds`,
- `EXPIRED` — hard `expires_at` / `valid_until` has passed,
- `FUTURE_DATED` — observation time is materially after `as_of`,
- `UNKNOWN` — observation time or time quality is insufficient to compute a defensible status.

The derived status belongs to the evaluator output, not as an immutable truth inside the envelope.

### 13.3 Partitioned communications

Delayed communications do not justify rewriting observation time as publication time.

An envelope can disclose:

- connectivity state,
- received time,
- publication delay,
- expected/known delay context.

A market can then distinguish:

```text
old observation received late
≠ fresh observation published promptly
```

## 14. Completeness and selective-disclosure context

A single valid evidence item can still be misleading if selected from a larger contradictory set.

Where material, an envelope should disclose:

- coverage period,
- selection method,
- population/count summarized,
- known exclusions,
- failed/missing observations,
- known contradictory evidence,
- whether the evidence is a sample or complete set.

Example:

> “Operational-state summary covers 1,437 of 1,440 expected telemetry intervals; three intervals were unavailable due to a communications outage.”

That is more useful than publishing one successful frame and calling the asset operational.

## 15. Redaction and sensitivity

### 15.1 Disclosure states

Suggested states:

- `PUBLIC`
- `PUBLIC_REDACTED`
- `REFERENCE_ONLY`
- `WITHHELD_SECURITY_SENSITIVE`
- `WITHHELD_LEGAL_OR_CONTRACTUAL`

### 15.2 Redaction record

For redacted/withheld material, disclose where safe:

- what category was removed,
- why,
- whether a digest of the withheld source is retained,
- whether an independent party reviewed the withheld material,
- whether the omission limits the claim conclusion.

### 15.3 No secret-disclosure requirement

Conformance must never require publication of private keys, command credentials, exploit-relevant operational data, or controlled/confidential information.

Evidence quality should come from attributable summaries, digests, attestations, and reviewable methods—not forced disclosure of secrets.

## 16. Supersession, correction, and revocation

Evidence should be append-only in public history.

A later envelope may:

- `SUPERSEDE`
- `CORRECT`
- `REVOKE`
- `RESTATE`

an earlier envelope.

The new envelope should identify:

- prior envelope ID,
- relationship type,
- reason,
- effective time.

Examples:

- calibration error discovered,
- signing key compromised,
- asset state changed,
- earlier contract interpretation corrected,
- duplicated evidence removed,
- measurement recomputed.

A correction should not erase the fact that the earlier claim was published.

## 17. Credential and signer compromise

A valid signature only shows that a credential produced the signature according to a verification method.

It does not show that:

- the credential was uncompromised,
- the signer was authorized,
- the underlying evidence was accurate,
- the source device was trustworthy.

The envelope may include a credential-status/revocation reference.

If a signing key is later known to be compromised, affected envelopes should be reassessed and, where material, superseded/revoked by new public records.

## 18. Claim-family guidance

### 18.1 Asset operational

Minimum useful evidence normally includes:

- asset identity,
- observed time,
- operational-state definition,
- telemetry/log/observation evidence,
- source/method,
- freshness policy,
- known degradations,
- issuer assertion,
- optional independent observation.

“Responded once” should not automatically mean “operational.”

The operational predicate should be defined.

### 18.2 Service delivered

Useful evidence may combine:

```text
contract/performance obligation
+ mission/service event
+ customer acknowledgement or system record
+ billing/accounting reconciliation
```

A billing record alone does not prove physical performance.

### 18.3 Resource measurement

Useful evidence includes:

- location/sample identity,
- instrument/method,
- calibration basis,
- measured value + units,
- uncertainty,
- processing/transformation chain,
- chain of custody where applicable,
- independent review where material.

### 18.4 Agent action executed

Useful evidence includes:

```text
action event
+ agent identity/version
+ policy/version
+ delegated authority
+ credential/log path
+ outcome
+ revocation/emergency state
```

The evidence should distinguish “agent produced a plan” from “authorized action actually executed.”

### 18.5 Mission incident / impairment

Useful evidence includes:

- incident identity,
- event/observation time,
- affected assets/services,
- observed symptoms,
- authoritative sources,
- uncertainty,
- operational impact,
- economic/financial impact where known,
- recovery state,
- superseding updates.

The first incident envelope can be incomplete if urgency requires it, but incompleteness should be explicit and later revisions should preserve history.

## 19. Evidence manifests

A prospectus/admission packet can include an evidence manifest that maps material claims to envelope IDs.

Example:

```text
claim: asset SEL-LUNA-PROSPECT-03 is operational
→ evidence envelope: oe:selene:asset-operational:2032-04-18:1

claim: Q1 cislunar service backlog was delivered
→ envelopes: oe:selene:service:448:19, oe:selene:billing:448:q1

claim: fleet planner acted within delegated procurement authority
→ envelope: oe:selene:agent-action:procurement:99102
```

The manifest should not duplicate the evidence; it should bind disclosure claims to reviewable evidence records.

## 20. Relationship to eligibility

`standard.eligibility` asks whether qualifying beyond-Earth activity, rights/control, materiality, and evidence sufficiency exist.

This evidence standard defines a proposed common envelope for supporting those facts.

The eligibility policy should not automatically treat the existence of an envelope as proof that a gate is satisfied.

Instead, a reviewer can ask:

- Does the envelope concern the right subject?
- Is it fresh enough for the claim?
- Does the evidence actually support the gate?
- Is the issuer assertion distinguishable from independent attestation?
- Are material contradictions or exclusions disclosed?

## 21. Relationship to readiness and listing

Readiness dimensions and listing gates can reference evidence envelopes without embedding raw sensitive evidence.

The desired chain is:

```text
readiness / listing claim
       ↓
evidence envelope ID
       ↓
evidence items + provenance
       ↓
assertion / attestation
       ↓
freshness + uncertainty + disclosure limits
       ↓
review conclusion
```

This is stronger than attaching an opaque PDF or raw telemetry dump without a claim/provenance model.

## 22. Deterministic consistency policy

A project implementation may deterministically check properties such as:

- schema validity,
- unique evidence item IDs,
- subject identity presence,
- observation/publication time ordering,
- freshness-policy bounds,
- derived freshness at an `as_of` time,
- digest syntax where declared,
- attestation references resolve to evidence items,
- supersession does not self-reference,
- redaction state agrees with disclosure metadata,
- quantitative uncertainty fields are internally consistent.

It must not claim to determine:

- whether a signature is cryptographically valid unless an actual verifier is run,
- whether a signer is honest,
- whether telemetry is physically accurate,
- whether omitted evidence exists,
- whether a contract is legally enforceable,
- whether a claim is ultimately true.

## 23. No universal evidence score

Version 0.1 deliberately avoids a single evidence-quality score.

A number such as `87/100 verified` would collapse different concepts:

- source independence,
- freshness,
- completeness,
- cryptographic attribution,
- measurement uncertainty,
- claim relevance.

Those should remain inspectable dimensions.

## 24. Publication model on GitHub

For the GitHub-native `open-ipo` project, evidence examples and schemas live in the repository.

Real prospective issuers should normally reference public evidence from their listing intent / eligibility assessment rather than committing large raw telemetry datasets into the repository.

The repo can hold:

- envelope JSON,
- public summaries,
- digests,
- links to external public evidence,
- attestation metadata,
- redaction disclosures.

Git history provides version history but is not, by itself, proof that the underlying evidence was true when committed.

## 25. Open questions

- Which claim classes should require independent attestation before a future listing?
- Which signature/credential profiles should a future venue accept?
- Should some claim types require multiple independent observation classes?
- What default freshness bands should exist by asset/service type?
- How should deep-space light-time affect disclosure-freshness expectations?
- How should confidential evidence be reviewed without creating selective investor access?
- What cryptographic canonicalization profile should be adopted for signed structured envelopes?
- How should key compromise propagate across previously accepted evidence?
- When does conflicting evidence require disclosure degradation or a trading halt?
- How should evidence retention work across multi-decade assets and issuer reorganizations?

## 26. Target invariant

A strong evidence envelope should let a skeptical third party say:

> **I know exactly what is being claimed, what evidence supports it, who produced and asserted it, when it was observed, how uncertain and fresh it is, what was withheld, who independently reviewed it, and what later records changed the claim.**

That is the project target.
