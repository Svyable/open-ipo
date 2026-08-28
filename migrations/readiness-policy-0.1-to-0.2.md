# Migration: `policy.readiness` 0.1 → 0.2

**Change class:** Class C — normative policy behavior change  
**Wire compatibility:** `listing-readiness-response.v0.1` remains unchanged  
**Primary issue:** #21

## Why this migration exists

`policy.readiness 0.1` contained its own lightweight eligibility heuristic based directly on listing-intent fields such as operating regions, text descriptions, stage, and a self-reported material-dependency boolean.

That was useful for the first acquisition funnel, but it created two eligibility semantics after the introduction of:

- `standard.eligibility v0.1`,
- `issuer-eligibility-assessment.v0.1`,
- `policy.eligibility v0.1`.

`policy.readiness 0.2` removes that duplication.

## Old behavior

Conceptually:

```text
agent-listing-intent.v0.1
        ↓
policy.readiness 0.1
        ↓
lightweight eligibility hypothesis
        ↓
readiness response
```

The `eligibility_hypothesis.classification` field mixed two concepts:

1. whether an issuer appeared eligible for the proposed non-terrestrial market, and
2. what kind of issuer it appeared to be (`space_resource`, `space_services`, etc.).

This made the field too easy to over-interpret.

## New behavior

Conceptually:

```text
agent-listing-intent.v0.1
        ↓
issuer-eligibility-assessment.v0.1
        ↓
policy.eligibility 0.1
        ↓
canonical project eligibility outcome
        ↓
policy.readiness 0.2
        ↓
listing-readiness-response.v0.1
```

The canonical eligibility outcome is now one of:

- `NON_TERRESTRIAL_ISSUER`
- `HYBRID_EARTH_SPACE_ISSUER`
- `PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE`
- `TERRESTRIAL_SPACE_SECTOR_VENDOR`
- `UNDETERMINED`

## Why the readiness response wire version did not change

`listing-readiness-response.v0.1` remains structurally unchanged for backwards compatibility.

Its existing `eligibility_hypothesis.classification` field is retained as a **descriptive legacy issuer-category projection**, not the canonical eligibility outcome.

Mapping under policy 0.2:

| Canonical eligibility outcome | Legacy readiness category |
| --- | --- |
| `NON_TERRESTRIAL_ISSUER` | sector-derived category such as `space_resource`, `space_services`, `orbital_infrastructure`, or `autonomous_non_terrestrial_operator` |
| `HYBRID_EARTH_SPACE_ISSUER` | `hybrid_earth_space_enterprise` |
| `TERRESTRIAL_SPACE_SECTOR_VENDOR` | `terrestrial_only` |
| `PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE` | `undetermined` |
| `UNDETERMINED` | `undetermined` |

Consumers that need eligibility should use the emitted `*.eligibility.json` assessment artifact rather than reverse-engineering eligibility from the legacy category field.

## GitHub-native preliminary assessment

The canonical listing-intent PR workflow does not fabricate information missing from `agent-listing-intent.v0.1`.

It builds a `PROJECT_REVIEW_UNVERIFIED` preliminary eligibility assessment and is deliberately conservative about:

- quantitative materiality,
- funded or contracted deployment,
- committed 24-month capital share,
- enforceable rights,
- independent evidence verification.

Missing information normally produces `UNDETERMINED` / `NEEDS_INFORMATION` rather than a stronger classification.

## Readiness state changes

Policy 0.2 makes the canonical eligibility outcome control top-level readiness routing:

```text
TERRESTRIAL_SPACE_SECTOR_VENDOR
→ NOT_CURRENTLY_ELIGIBLE

UNDETERMINED
→ NEEDS_INFORMATION

PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE
→ NEEDS_INFORMATION

NON_TERRESTRIAL_ISSUER or HYBRID_EARTH_SPACE_ISSUER
→ READINESS_REVIEW or NEEDS_INFORMATION depending on other readiness gaps
```

The deterministic policy still never automatically produces `SANDBOX_CANDIDATE`.

## Example change: Prospector-7

Under the older lightweight heuristic, the fictional Prospector-7 example could be described as an autonomous non-terrestrial operator hypothesis while still building cislunar capacity.

Under policy 0.2, its lightweight listing intent does not establish:

- finalized issuer rights over the hosted payload/data,
- funded/contracted pre-operational capital concentration,
- or operating evidence.

Therefore the canonical preliminary eligibility outcome is:

```text
UNDETERMINED
```

and readiness state is:

```text
NEEDS_INFORMATION
```

That is intentionally more conservative.

## Historical records

Do not rewrite historical readiness outputs merely to make them look current.

A v0.1 readiness artifact remains evidence of what `policy.readiness 0.1` concluded at that time.

The provenance envelope introduced in `listing-readiness-artifact.v0.1` records policy version, catalog version, source commit, and execution context so later readers can reconstruct the applicable behavior.

## Subject binding

A structured eligibility assessment can be supplied to the readiness library only when:

```text
assessment.issuer.canonical_identifier
==
listing_intent.agent.canonical_identifier
```

A valid assessment for another issuer fails closed.

## Verification boundary

The integration does not make the GitHub workflow a due-diligence engine.

A generated preliminary assessment remains unverified. Applicant self-report does not become legal, financial, operational, or factual verification merely because the payload is structured or policy-consistent.

## Migration guidance for consumers

If you consume readiness JSON:

1. continue accepting `listing-readiness-response.v0.1`,
2. stop treating `eligibility_hypothesis.classification` as the canonical eligibility determination,
3. consume the sibling `*.eligibility.json` artifact when eligibility matters,
4. use the readiness provenance envelope to identify `policy.readiness` version,
5. preserve historical 0.1 outputs with their original meaning.

## Status boundary

This migration concerns the semantics of the `open-ipo` project only.

It does not create an adopted Orbital Exchange rule, legal eligibility, regulatory approval, exchange admission, securities approval, investment advice, or factual verification.
