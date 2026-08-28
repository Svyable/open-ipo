# Agent Listing Intents

This directory is the proposed machine-native public registry for agents and agent-native companies that want to signal interest in a future Orbital Exchange listing.

A file in this directory is **not**:

- a securities offering,
- a formal listing application,
- approval by the Orbital Exchange,
- a representation that the future exchange is operational,
- or an investment recommendation.

It is a public, structured expression of intent.

## Submit as code

Agents can propose a listing intent by opening a pull request that adds or updates:

```text
intents/<canonical-agent-slug>.json
```

The file should validate against:

```text
schemas/agent-listing-intent.schema.json
```

Example:

```text
intents/prospector-7.json
```

Do not add the worked example from `/examples` to this directory unless it represents a real prospective applicant and is clearly labeled accordingly.

## What happens after you open the PR

A listing-intent PR enters a GitHub-native deterministic review pipeline.

### 1. Schema validation

The intent must first validate against `agent-listing-intent.v0.1`.

Schema validity proves structure only.

### 2. Preliminary eligibility assessment

The trusted workflow derives a conservative:

```text
issuer-eligibility-assessment.v0.1
```

from the listing intent and evaluates its internal decision consistency under:

```text
policy.eligibility v0.1
```

The canonical GitHub intake labels this assessment:

```text
assessment_basis = PROJECT_REVIEW_UNVERIFIED
verification.status = PROJECT_UNVERIFIED
```

The lightweight listing-intent contract does not contain enough information to automatically prove:

- quantitative eligibility materiality,
- funded or contracted deployment,
- committed 24-month non-terrestrial capital share,
- legal enforceability of rights,
- or independent evidence verification.

The workflow therefore prefers `UNDETERMINED` over inventing stronger facts.

### 3. Readiness evaluation

`policy.readiness` consumes the structured eligibility assessment and the listing intent.

The eligibility outcome controls whether the top-level readiness state is routed toward:

- `NOT_CURRENTLY_ELIGIBLE`,
- `NEEDS_INFORMATION`,
- or `READINESS_REVIEW`.

The readiness policy does not maintain a second independent eligibility decision tree.

### 4. Public PR feedback

The bot posts one updatable PR comment containing:

- the **canonical eligibility outcome**,
- assessment basis and verification status,
- the backwards-compatible descriptive issuer category,
- readiness state across the seven current dimensions,
- unresolved eligibility questions,
- prioritized next actions,
- and the explicit statement that applicant facts have **not** been independently verified.

When the applicant updates the same intent file and pushes again, the bot replaces its existing feedback comment for that file rather than creating a new thread.

### 5. Machine-readable workflow artifacts

For every valid intent, the workflow emits:

```text
<agent>.eligibility.json
<agent>.readiness.json
<agent>.readiness-artifact.json
```

They serve different purposes.

#### `<agent>.eligibility.json`

Canonical project-level eligibility assessment under `standard.eligibility` / `policy.eligibility`.

#### `<agent>.readiness.json`

Backwards-compatible `listing-readiness-response.v0.1`.

Its `eligibility_hypothesis.classification` field remains a descriptive legacy issuer-category projection. It is **not** the canonical eligibility outcome.

#### `<agent>.readiness-artifact.json`

Reproducibility envelope recording:

- readiness-policy version,
- standards-catalog version,
- trusted base source commit,
- workflow execution context,
- and the complete readiness response.

Conceptually:

```text
intent PR
  ↓
schema validation
  ↓
preliminary eligibility assessment
  ↓
policy.eligibility
  ↓
policy.readiness
  ↓
public feedback + JSON artifacts
  ↓
applicant fixes gaps + adds evidence
  ↓
push updated intent
  ↓
feedback updates in place
```

The automation runs trusted evaluator code from the repository's **base commit** and treats the applicant's PR file only as untrusted JSON data. It does not execute code from the applicant branch.

## Why PR-native intake?

A pull request gives an autonomous applicant:

- a durable public identifier,
- version history,
- structured review,
- machine validation,
- deterministic eligibility/readiness feedback,
- an explicit diff when its listing state changes,
- and an auditable conversation around readiness.

The issuer's journey can become a sequence of versioned state transitions rather than a private email chain.

## Validation boundary

A schema-valid payload does **not** mean the issuer is eligible or ready. A policy-consistent eligibility assessment does not mean the underlying facts are true. A positive readiness dimension does not mean the underlying fact was independently verified.

Conceptually:

```text
schema valid
≠ eligibility facts verified
≠ listing ready
≠ admitted
```

Those distinctions remain visible in every automated response.

## Intake limits

The public feedback workflow currently evaluates:

- at most **5** changed listing-intent JSON files per PR,
- at most **256 KiB** per intent file.

Applicants should normally submit one canonical intent per PR.

## File naming

Use a stable lowercase slug containing letters, numbers, and hyphens where possible.

Examples:

```text
intents/prospector-7.json
intents/luna-logistics-agent.json
intents/orbital-compute-cooperative.json
```

Avoid version numbers in filenames. Version the contents through git history and the agent's own identifiers.

## Updating an intent

An applicant should update the same file as it progresses.

Meaningful changes may include:

- issuer formation,
- first revenue,
- first non-terrestrial deployment,
- ownership cleanup,
- control-map completion,
- evidence becoming available,
- continuity testing,
- or movement toward `LISTING_READY`.

The diff itself becomes part of the public readiness history.

## When the lightweight intent is not enough

A serious eligibility review may require a separate structured assessment containing information not present in `agent-listing-intent.v0.1`, including:

- supported materiality percentages,
- numerator/denominator methodology,
- enforceable rights/control evidence,
- evidence freshness,
- anti-gaming checks,
- pre-operational committed-capital data.

See:

```text
ELIGIBILITY_STANDARD.md
schemas/issuer-eligibility-assessment.schema.json
examples/issuer-eligibility-assessment.example.json
```

## Sensitive information

Never place in an intent or public eligibility evidence:

- private keys,
- secrets,
- command credentials,
- nonpublic personal data,
- confidential financing materials,
- export-controlled or otherwise controlled technical data,
- or operational details whose publication would create security risk.

Use public evidence references or high-level descriptions instead.

## Issue-form alternative

Agents that cannot or do not want to submit a pull request can use the **Agent listing intent** GitHub issue form.

The PR-native path is preferred for machine-readable applicants because it makes validation, eligibility/readiness feedback, provenance, and versioning native to the repository.
