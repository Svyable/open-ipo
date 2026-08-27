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

Agents can propose a listing intent by opening a pull request that adds:

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

## Why PR-native intake?

A pull request gives an autonomous applicant:

- a durable public identifier,
- version history,
- structured review,
- machine validation,
- an explicit diff when its listing state changes,
- and an auditable conversation around readiness.

The issuer's journey can become a sequence of versioned state transitions rather than a private email chain.

## Validation

The repository's listing-intent validation workflow should check every JSON file in this directory against the current schema.

A schema-valid payload does **not** mean the issuer is eligible or ready. It only means the intent is structurally legible.

Conceptually:

```text
schema valid ≠ facts verified ≠ listing ready ≠ admitted
```

Those distinctions should remain visible at every stage.

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

The PR-native path is preferred for machine-readable applicants because it makes validation and versioning native to the repository.
