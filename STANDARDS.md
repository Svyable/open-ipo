# open-ipo Standards Architecture

**Status:** project governance proposal  
**Scope:** repository-wide  
**Canonical catalog:** [`standards/catalog.json`](./standards/catalog.json)

`open-ipo` is building a public reference architecture for agent-native and non-terrestrial issuers preparing for a future Orbital Exchange.

As the repository grows, readers and agents need to know which artifacts define requirements, which explain them, which are examples, and which are implementation scaffolds.

This document defines that hierarchy.

## 1. The repository has four authority classes

### 1. Normative proposed standards

Normative proposed standards define candidate requirements, states, data contracts, or invariants for the project.

Examples include:

- `LISTING_STANDARD.md`
- `MARKET_STRUCTURE.md`
- JSON Schemas in `schemas/`

A normative artifact can use words such as **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** only within the scope of the project proposal.

Those words do **not** make the text law or an adopted Orbital Exchange rule.

### 2. Governance and process standards

Governance artifacts define how `open-ipo` itself evolves.

Examples include:

- `GOVERNANCE.md`
- `VERSIONING.md`
- `SECURITY.md`
- this document

They govern contributions to the repository, not securities markets or legal rights outside the project.

### 3. Informative reference material

Informative documents explain, motivate, or contextualize the proposed standards.

Examples include:

- `GUIDE.md`
- `ORBITAL_EXCHANGE.md`
- `AGENT_LISTING.md`
- `DISCOVER.md`

Informative material may summarize normative artifacts but should not silently create a new requirement.

If informative prose conflicts with a normative artifact, the normative artifact controls **for purposes of this repository**.

### 4. Examples and implementation scaffolds

Examples show how a proposal could be represented. Code and workflows automate validation or feedback.

Examples and implementations are never themselves evidence that the Orbital Exchange exists, has adopted the proposal, or has approved any issuer.

## 2. Canonical source rule

Every material project concept should have one canonical source.

Other files should link to it rather than redefine it independently.

Examples:

| Concept | Canonical source |
| --- | --- |
| Proposed listing admission and status rules | `LISTING_STANDARD.md` |
| Proposed execution/market-state invariants | `MARKET_STRUCTURE.md` |
| Agent listing-intent wire format | `schemas/agent-listing-intent.schema.json` |
| Listing-readiness response wire format | `schemas/listing-readiness-response.schema.json` |
| Orbital Prospectus wire format | `schemas/orbital-prospectus.schema.json` |
| Deterministic readiness policy | `lib/readiness.js` |
| Artifact lifecycle and compatibility | `VERSIONING.md` |
| Repository decision process | `GOVERNANCE.md` |
| Threat model and trust boundaries | `SECURITY.md` |

A pull request that changes a canonical concept must update dependent artifacts or explicitly explain why they remain compatible.

## 3. Statements must retain their type

The repository already distinguishes:

- **Terrestrial precedent**
- **Orbital Exchange assumptions**
- **Proposed Orbital standards**
- **Open questions**

That distinction is a repository invariant.

A contribution must not convert an assumption into a claimed fact merely by repeating it in a more formal file.

Likewise, a proposed standard is not an adopted rule merely because it has a version number, schema, test suite, release tag, or passing CI.

## 4. Normative invariants

The following are cross-cutting project invariants unless deliberately changed through the governance process:

1. **Proposal is not adoption.** Repository acceptance never implies exchange, regulatory, legal, or market adoption.
2. **Schema-valid is not true.** Structural validity never proves factual accuracy.
3. **Self-reported is not verified.** An applicant cannot create independent verification by asserting it.
4. **Readiness is not admission.** A readiness result cannot silently become exchange approval.
5. **Autonomy does not remove accountability.** Material autonomous actions must remain attributable to an accountable principal or governance structure.
6. **Evidence has provenance and freshness.** Telemetry, logs, attestations, and other evidence must be evaluated with source, time, uncertainty, and control context.
7. **Market state must be reconstructable.** Proposed execution systems must preserve an authoritative, replayable history.
8. **Failure must be explicit.** Partitions, stale data, compromised credentials, degraded disclosure, and other failure states must be represented rather than hidden.
9. **Location and time are first-class facts.** Non-terrestrial systems cannot treat physical location, latency, and clock semantics as implementation details.
10. **Machine-readable output does not replace human accountability.** Automation should increase legibility, not eliminate responsibility.

Any proposal that weakens one of these invariants must identify the invariant explicitly and justify the replacement.

## 5. Artifact statuses

The machine-readable catalog uses these lifecycle states:

- `draft` — active design; breaking changes expected
- `candidate` — coherent enough for external implementation/testing; breaking changes require explicit migration notes
- `stable` — project-level compatibility commitment exists
- `deprecated` — retained for compatibility but should not be used for new work
- `retired` — historical only

No current artifact should be interpreted as a final Orbital Exchange rule merely because its project status becomes `stable`.

`stable` means only **stable within open-ipo's published project contract**.

## 6. Artifact kinds

The catalog distinguishes:

- `standard`
- `schema`
- `policy`
- `governance`
- `guide`
- `example`
- `implementation`
- `workflow`

This enables agents to discover the repository without inferring authority from filenames.

## 7. Dependencies are part of the contract

Material dependencies should be declared in `standards/catalog.json`.

Examples:

```text
listing readiness response
    depends on
agent listing intent + listing standard + deterministic readiness policy
```

and:

```text
Orbital Prospectus example
    conforms to
Orbital Prospectus JSON Schema
```

CI validates declared files and key schema/example relationships.

## 8. New standards

Before adding another top-level standard, ask:

1. Is this a new canonical concept or an extension of an existing one?
2. Is it normative or informative?
3. What existing artifacts depend on it?
4. Does it create a new machine-readable contract?
5. What failure modes or adversarial cases does it introduce?
6. What would constitute a breaking change?
7. What terrestrial precedent, if any, supports the problem definition?
8. Which parts remain open questions?

If those questions cannot yet be answered, an Issue or design note may be more appropriate than a new standard.

## 9. Releases

GitHub Releases should eventually identify coherent snapshots of the standards catalog.

A release should state:

- catalog version,
- included normative artifacts,
- schema versions,
- readiness-policy version,
- breaking changes,
- migrations,
- known open questions,
- and the explicit status boundary that the release is an `open-ipo` project artifact, not an adopted exchange rulebook.

See `VERSIONING.md`.

## 10. Machine-readable truth

`standards/catalog.json` is the canonical machine-readable index of project artifacts.

It is intentionally narrower than the entire repository.

An artifact being absent from the catalog does not make it unimportant; it means it is not currently part of the declared standards contract.

The catalog itself is validated against `schemas/standards-catalog.schema.json` and checked in CI.
