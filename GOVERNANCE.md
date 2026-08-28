# open-ipo Governance

**Status:** project governance proposal  
**Applies to:** changes to the public `open-ipo` repository

`open-ipo` is building standards in public. Governance therefore needs to optimize for three things at once:

1. useful experimentation,
2. auditable decision-making,
3. resistance to accidental or adversarial semantic drift.

This file governs the repository. It does not create legal authority for the Orbital Exchange or any securities market.

## 1. Default mode: propose in public

Material changes should happen through GitHub Issues and Pull Requests.

The preferred path is:

```text
problem / hard case
        ↓
Issue with evidence + failure mode
        ↓
proposal / schema / test change
        ↓
Pull Request
        ↓
CI + public review
        ↓
merge into main
        ↓
project contract changes
```

Private decision-making should be minimized for standards questions.

## 2. Change classes

Every material PR should be understood as one of these classes.

### Class A — editorial

Examples:

- spelling and clarity fixes,
- link repair,
- non-semantic examples,
- formatting.

Requirements:

- must not alter normative meaning,
- must not change a schema contract or evaluator result.

### Class B — compatible extension

Examples:

- optional schema fields,
- additional examples,
- new non-breaking readiness explanation,
- new informative guidance that does not change canonical requirements.

Requirements:

- identify compatibility impact,
- update catalog dependencies if needed,
- add tests for machine-readable additions.

### Class C — normative behavior change

Examples:

- changing a readiness rule,
- changing an admission gate,
- changing listing-state semantics,
- changing market-state or sequencing invariants,
- changing evidence requirements.

Requirements:

- linked design Issue,
- explicit motivation and failure mode,
- affected invariants listed,
- compatibility analysis,
- tests or worked examples,
- migration note if downstream artifacts can change meaning.

### Class D — breaking contract change

Examples:

- removing/renaming required schema fields,
- changing the meaning of an existing enum/state,
- allowing a result previously forbidden by a project invariant,
- changing canonical identity semantics,
- making previously valid messages invalid without a version boundary.

Requirements:

- everything in Class C,
- version change under `VERSIONING.md`,
- migration strategy,
- catalog update,
- release note requirement,
- explicit consideration of whether a parallel old version must remain supported.

## 3. High-risk semantic areas

Changes in these areas should receive heightened scrutiny:

- what qualifies as a non-terrestrial issuer,
- what counts as verified evidence,
- whether an applicant can be described as ready/eligible/listed/admitted,
- autonomous authority and accountable principals,
- financial authority and asset ownership,
- market ordering and authoritative execution state,
- halt/recovery rules,
- settlement finality,
- credential/key compromise,
- disclosure freshness,
- legal/regulatory claims.

A PR touching one of these should describe both the intended behavior and at least one adversarial or failure case.

## 4. Decision record

For material changes, the PR itself is the primary decision record.

A strong PR body answers:

- **Problem:** what is missing or wrong?
- **Statement type:** terrestrial precedent, Orbital assumption, proposed standard, or open question?
- **Change class:** A/B/C/D.
- **Canonical artifacts affected:** which files own the concept?
- **Invariants affected:** which cross-cutting rules change, if any?
- **Compatibility:** what existing payloads/readers/agents are affected?
- **Evidence:** what source, example, incident, or hard case motivates this?
- **Failure mode:** how could the proposal fail or be abused?
- **Migration:** what must downstream users change?
- **Open questions:** what remains unresolved?

## 5. Merge means project acceptance, not external adoption

A merged change means:

> the change is accepted into the current `open-ipo` project contract on `main`.

It does not mean:

- the Orbital Exchange has formally adopted it,
- a regulator has accepted it,
- it is legally sufficient,
- any issuer is approved,
- any security may be offered or listed.

Every release and machine-readable artifact should preserve this boundary.

## 6. Evidence hierarchy for standards work

When a proposal relies on current external facts, prefer:

1. statutes, regulators, official exchange rules, accounting/audit standards, protocol specifications, or other primary sources;
2. authoritative technical documentation;
3. peer-reviewed or directly attributable technical/operational evidence;
4. high-quality secondary analysis;
5. community discussion as qualitative input, clearly labeled.

Future venue design may intentionally depart from terrestrial precedent, but the departure should be explicit.

## 7. No hidden consensus requirement

This project should not pretend that all questions require unanimity.

When contributors disagree:

- identify the disputed invariant or objective,
- document competing designs,
- compare failure modes,
- prefer reversible experiments when possible,
- keep unresolved questions explicit.

A minority design can remain in an Issue, fork, or alternative proposal without being erased from history.

## 8. Experimental extensions

Experimental concepts should not silently enter the normative contract.

Use one or more of:

- an Issue,
- a draft document labeled experimental,
- an example under `examples/`,
- a branch/fork,
- a catalog entry with `draft` status and `normative: false`.

Promotion to normative status should be a visible change.

## 9. Machine-generated contributions

Agent-authored contributions are welcome.

They are held to the same standards as human-authored changes.

An agent contribution should make it possible to determine:

- what changed,
- why,
- which source material or repository state it relied on,
- what tests were performed,
- what uncertainty remains.

Autonomous generation is not a substitute for traceability.

## 10. Security-sensitive changes

Changes to Actions, untrusted PR processing, credential handling, evidence verification, or security boundaries should follow `SECURITY.md`.

In particular:

- `pull_request_target` workflows must never execute untrusted PR code,
- applicant content must be treated as data,
- permissions should be least-privilege,
- outputs derived from applicant text should be escaped/sanitized where needed.

## 11. Release governance

A versioned GitHub Release should only be cut when:

- catalog validation passes,
- normative artifacts have declared versions/statuses,
- schema/example conformance passes,
- breaking changes are documented,
- known unresolved issues are listed.

A release may still contain `draft` or `candidate` artifacts; the release notes must make their status visible.

## 12. Foundation rule

The project should prefer **explicit contracts over implicit convention**.

If a rule matters to compatibility, accountability, security, or interpretation, encode it in one or more of:

- a canonical document,
- a schema,
- the standards catalog,
- executable tests,
- a public decision record.
