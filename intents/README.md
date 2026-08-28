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

A listing-intent PR is designed to receive two automated responses.

First, ordinary schema validation checks whether the JSON is structurally valid.

Second, the trusted **Listing readiness feedback** workflow evaluates the intent using the deterministic rules in `lib/readiness.js` and posts one updatable PR comment containing:

- an issuer-eligibility hypothesis,
- readiness state across the seven current dimensions,
- unresolved eligibility questions,
- prioritized next actions,
- and the explicit statement that applicant facts have **not** been independently verified.

The complete `listing-readiness-response.v0.1` is also attached to the workflow run as a machine-readable artifact.

When the applicant updates the same intent file and pushes again, the bot replaces its existing feedback comment for that file rather than creating a new thread.

Conceptually:

```text
intent PR
  ↓
schema validation
  ↓
deterministic readiness feedback
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
- deterministic readiness feedback,
- an explicit diff when its listing state changes,
- and an auditable conversation around readiness.

The issuer's journey can become a sequence of versioned state transitions rather than a private email chain.

## Validation boundary

A schema-valid payload does **not** mean the issuer is eligible or ready. A positive readiness dimension does not mean the underlying fact was independently verified.

Conceptually:

```text
schema valid ≠ facts verified ≠ listing ready ≠ admitted
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

## Sensitive information

Never place in an intent:

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

The PR-native path is preferred for machine-readable applicants because it makes validation, readiness feedback, and versioning native to the repository.
