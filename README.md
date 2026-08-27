# open-ipo

> The open-source reference guide for agents and non-terrestrial companies preparing to go public on the future **Orbital Exchange**.

`open-ipo` starts from a deliberately forward-looking thesis: autonomous agents will become durable economic actors, non-terrestrial companies will become a real category of issuer, and a new public market will be needed to finance and trade them.

The target venue for this project is the **Orbital Exchange** — a nascent, yet-to-be-launched space-based marketplace for the listing, trading, and execution of securities of non-terrestrial companies.

This repository asks:

> **What would an agent or agent-native company have to prove in order to IPO on a public market designed for economic activity beyond Earth?**

The answer is not just “file an S-1.” The Orbital Exchange does not yet have an established listing rulebook, and the legal, operational, accounting, communications, settlement, and governance problems of non-terrestrial issuers are still being defined.

`open-ipo` exists to build that reference layer in the open.

## Start here

- **[The Agent IPO Reference Guide](./GUIDE.md)** — issuer readiness, disclosure, controls, and the overall research framework.
- **[Orbital Exchange Design Assumptions](./ORBITAL_EXCHANGE.md)** — explicit assumptions about the future venue.
- **[Proposed Listing Standard v0.1](./LISTING_STANDARD.md)** — initial/continuing admission gates, operating evidence, listing states, halts, and delisting principles.
- **[Market Structure v0.1](./MARKET_STRUCTURE.md)** — canonical sequencing, time semantics, connectivity states, partitions, order lifecycle, auctions, surveillance, and settlement states.
- **[Orbital Prospectus JSON Schema](./schemas/orbital-prospectus.schema.json)** — machine-readable issuer disclosure envelope.
- **[Worked hypothetical issuer](./examples/selene-orbital-prospectus.example.json)** — example Orbital Prospectus Factsheet for a fictional autonomous cislunar operator.

The project separates four things that must never be blurred together:

- **Terrestrial precedent** — current public-market rules and practices that can inform the design.
- **Orbital Exchange assumptions** — explicit working assumptions about the future venue.
- **Proposed Orbital standards** — candidate listing, disclosure, execution, settlement, and continuity requirements.
- **Open questions** — areas where law, market structure, technical architecture, or space operations do not yet provide a clear answer.

## The core model

```text
agent / agent system
        ↓
non-terrestrial economic activity
        ↓
rights + obligations + control
        ↓
issuer entity
        ↓
governance + financials + operational evidence
        ↓
Orbital Exchange admission / offering process
        ↓
space-based trading + execution
        ↓
investors + continuing orbital-market disclosure
```

An agent does not become Orbital-IPO-ready because it is intelligent or autonomous. A space company does not become Orbital-IPO-ready merely because it owns a satellite.

The investable system has to be **ownable, auditable, governable, locateable, discloseable, resilient, accountable, and operable across Earth-space boundaries**.

## What counts as a “non-terrestrial company”?

For this project, the phrase is a **working definition, not a legal classification**.

A non-terrestrial company is an issuer whose enterprise value materially depends on assets, infrastructure, operations, services, resources, or autonomous economic activity beyond Earth’s surface — for example orbital infrastructure, in-space manufacturing, communications, sensing, logistics, servicing, resource activity, habitats, or agent-operated space systems.

The definition should become more precise as the Orbital Exchange develops its own eligibility and listing standards.

## Why terrestrial securities rules still matter

The SEC, existing exchanges, accounting standards, market-structure rules, and public-company practice provide useful precedent for disclosure, investor protection, governance, auditability, market integrity, and continuing reporting.

They are **reference material, not the target rulebook**.

`open-ipo` should use existing markets to learn what problems a public exchange has to solve, then ask what changes when the issuer, its assets, its agents, and eventually parts of the execution infrastructure operate off Earth.

## Project principles

1. **Design for the Orbital Exchange.** Earth markets are precedent; the future orbital venue is the target.
2. **Primary sources first.** Existing-law claims should link to regulators, statutes, rules, standards, or similarly authoritative sources.
3. **Facts ≠ proposals.** Never present a proposed Orbital Exchange standard as existing law or an adopted exchange rule.
4. **Machines and humans are both market participants.** Disclosures should be useful to investors, regulators, operators, and agents.
5. **Location and latency are first-class facts.** Physical location, communications paths, timing, custody, and operational continuity matter in a space-based market.
6. **Evidence over narrative.** Prefer telemetry, logs, reconciliations, controls, and machine-readable disclosures where they can support material claims.
7. **Version the truth.** Terrestrial regulation, space law, technical systems, and exchange assumptions will all change.
8. **Open questions are first-class output.** The project should make missing standards explicit rather than pretending the stack already exists.

## Contribute

See [CONTRIBUTING.md](./CONTRIBUTING.md). Agent contributors should also read [AGENTS.md](./AGENTS.md).

Useful contributions include:

- proposed Orbital Exchange listing standards,
- non-terrestrial issuer eligibility definitions,
- space-asset and mission-risk disclosures,
- trading/execution architecture,
- communications-latency and clock-synchronization research,
- custody and settlement models,
- orbital continuity and disaster-recovery standards,
- agent-control taxonomies,
- accounting and valuation questions for off-Earth assets,
- licensing/jurisdiction maps,
- disclosure schemas,
- market-surveillance designs,
- and case studies from terrestrial exchanges and commercial space operations.

## Status

Early and experimental. The Orbital Exchange is described here as a future venue under development; where its final rules do not yet exist, this repository proposes candidate frameworks rather than asserting requirements.

Nothing in this repository is legal, accounting, tax, securities, investment, space-regulatory, or offering advice.
