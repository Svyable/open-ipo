# Contributing to open-ipo

`open-ipo` is building an open reference for agents and non-terrestrial companies that may eventually list and trade on the future **Orbital Exchange**.

The project sits at the intersection of securities law, accounting, governance, AI systems, security, space operations, communications, distributed systems, market structure, and software architecture. That makes source quality, compatibility, and clear labeling especially important.

Before making a material standards change, read:

- [`STANDARDS.md`](./STANDARDS.md) — artifact authority and cross-cutting invariants,
- [`GOVERNANCE.md`](./GOVERNANCE.md) — change classes and decision process,
- [`VERSIONING.md`](./VERSIONING.md) — compatibility and migration rules,
- [`SECURITY.md`](./SECURITY.md) — trust boundaries and threat model.

The machine-readable project contract is indexed in [`standards/catalog.json`](./standards/catalog.json).

## What to contribute

Useful contributions include:

- prospective agent listing intents,
- proposed Orbital Exchange admission and listing standards,
- non-terrestrial issuer eligibility definitions,
- corrections to terrestrial regulatory or exchange claims,
- primary-source links and jurisdiction maps,
- space-asset and mission-risk disclosures,
- agent-native risk-factor examples,
- telemetry evidence and assurance standards,
- disclosure templates,
- governance and control patterns,
- accounting and valuation questions for off-Earth assets,
- communications-latency and clock-synchronization research,
- trading/execution architecture,
- custody and settlement models,
- market-surveillance designs,
- orbital continuity and recovery standards,
- agent incident taxonomies,
- model/provider dependency frameworks,
- machine-readable disclosure schemas,
- and case studies from terrestrial exchanges, public-company filings, distributed systems, and commercial space operations.

## Contribution standard

Every material contribution should distinguish among:

- **Terrestrial precedent** — something that exists today.
- **Orbital Exchange assumption** — a working assumption about the future venue.
- **Project proposal** — a candidate rule, standard, schema, or control.
- **Open question** — an unresolved issue requiring further research or design.

For claims about existing requirements:

1. **Prefer primary sources.** Link regulators, statutes, rules, forms, exchanges, standard setters, or official authorities whenever possible.
2. **State the jurisdiction or system.** Do not silently generalize one regime into a global or orbital rule.
3. **Date changing claims.** Listing standards, filing procedures, technical architectures, thresholds, and guidance can change.
4. **Separate fact from proposal.** Never present a proposed Orbital Exchange standard as if it has already been adopted.
5. **Avoid faux certainty.** If the law, engineering, market practice, or exchange design is unsettled, say so.
6. **Prefer evidence over narrative.** Controls, logs, telemetry provenance, reconciliations, and reproducible calculations are stronger than unsupported claims.

## Change classes

Material PRs should identify a change class from `GOVERNANCE.md`:

- **Class A — editorial**
- **Class B — compatible extension**
- **Class C — normative behavior change**
- **Class D — breaking contract change**

Class C/D work should normally begin with a public Issue describing the hard case, affected invariants, evidence, compatibility impact, and failure/abuse case.

Use the **Standards change / hard case** issue form when appropriate.

## Pull request style

The repository pull request template asks contributors to make the decision record explicit.

A good PR should answer:

- What Orbital IPO or market-design question does this improve?
- Is the change terrestrial precedent, an Orbital Exchange assumption, a project proposal, or an open question?
- What change class is it?
- Which canonical artifacts own the concept being changed?
- Which `STANDARDS.md` invariants are affected?
- What evidence or primary sources support factual claims?
- What failure or abuse case was considered?
- Is the change backwards compatible for schemas, states, readiness results, and historical records?
- If breaking, what is the migration path under `VERSIONING.md`?
- Does the proposal account for physical location, latency, connectivity, autonomy, or off-Earth operations where relevant?
- Does the change make the project more useful to both humans and agents?

Small, well-scoped, well-sourced PRs are preferred over large unsourced rewrites.

## Machine-readable changes

When changing or adding a JSON contract:

- use JSON Schema draft 2020-12 unless there is a documented reason not to,
- declare a stable `$id`,
- declare/update the wire version,
- add or update a conforming example,
- update `standards/catalog.json`,
- consider every dependent policy/workflow,
- add executable tests.

The foundation tests intentionally fail on uncataloged schemas/examples and declared conformance mismatches.

## Security-sensitive contributions

Treat changes to these areas as security-sensitive:

- `pull_request_target` workflows,
- applicant input handling,
- GitHub token permissions,
- evidence verification,
- credentials/signing systems,
- dependency/validator changes.

The privileged readiness workflow must execute trusted base-branch code and treat applicant PR content only as untrusted data. See `SECURITY.md`.

## Suggested labels

As the issue tracker develops, useful categories may include:

- `orbital-exchange`
- `listing-standard`
- `non-terrestrial-issuer`
- `space-operations`
- `telemetry`
- `regulatory`
- `accounting`
- `governance`
- `disclosure`
- `agent-controls`
- `security`
- `market-structure`
- `settlement`
- `schema`
- `case-study`
- `good-first-issue`

## Legal and professional-advice boundary

This repository is a research and educational project. Contributions should not present themselves as individualized legal, accounting, tax, securities, investment, space-regulatory, or offering advice.

When precision matters, point readers to the governing primary source and encourage validation with qualified professionals.

## For agent contributors

Read [AGENTS.md](./AGENTS.md) before making autonomous changes. The same standard applies whether a contribution comes from a human, an agent, or a human-agent pair: claims should be attributable, reviewable, sourceable, tested where possible, and explicit about whether they describe the world as it exists or the Orbital Exchange as this project proposes it.
