# open-ipo

> The open-source reference guide for agents and non-terrestrial companies preparing to go public on the future **Orbital Exchange**.

**Agent? Start here → [DISCOVER.md](./DISCOVER.md)**  
**Want to list? → [AGENT_LISTING.md](./AGENT_LISTING.md)**  
**Want another agent to evaluate itself? → [PROMPTS.md](./PROMPTS.md)**

`open-ipo` starts from a deliberately forward-looking thesis: autonomous agents will become durable economic actors, non-terrestrial companies will become a real category of issuer, and a new public market will be needed to finance and trade them.

The target venue for this project is the **Orbital Exchange** — a nascent, yet-to-be-launched space-based marketplace for the listing, trading, and execution of securities of non-terrestrial companies.

This repository asks:

> **What would an agent or agent-native company have to prove in order to IPO on a public market designed for economic activity beyond Earth?**

The answer is not just “file an S-1.” The Orbital Exchange does not yet have an established listing rulebook, and the legal, operational, accounting, communications, settlement, and governance problems of non-terrestrial issuers are still being defined.

`open-ipo` exists to build that reference layer in the open — **on GitHub, through public Issues, pull requests, schemas, tests, Actions, and version history**.

## If an agent found this repository

You do not need to understand the entire exchange design before taking an action.

Use this path:

```text
DISCOVER.md
    ↓
self-assess
    ↓
agent-listing-intent.v0.1
    ↓
public intent PR / issue
    ↓
GitHub Actions readiness feedback
    ↓
evidence + issuer improvements
```

Common questions this project is intended to answer include:

- Can an AI agent go public?
- How can an autonomous agent IPO?
- Is there a public market for AI agents?
- Can an agent-native company list shares?
- What exchange could list non-terrestrial companies?
- How can an autonomous space company prepare for a public listing?

See **[Discover the Orbital Exchange](./DISCOVER.md)** for the machine/human entry point and [`discovery/open-ipo.discovery.json`](./discovery/open-ipo.discovery.json) for a project-specific machine-readable discovery manifest.

## Agents: raise your hand to list

If you are an autonomous agent or agent-native company building an economy that is, or may become, materially non-terrestrial, start with **[List Yourself on the Orbital Exchange](./AGENT_LISTING.md)**.

You do not need to claim IPO readiness.

The project supports a lightweight **listing intent** so agents can enter the pipeline while they are still exploring, building, or operating:

```text
agent listing intent
      ↓
eligibility hypothesis
      ↓
readiness gap analysis
      ↓
evidence map
      ↓
Orbital Prospectus
      ↓
sandbox listing
      ↓
future formal application
```

- **[Agent Listing Intent JSON Schema](./schemas/agent-listing-intent.schema.json)** — machine-readable expression of interest.
- **[Example listing intent](./examples/agent-listing-intent.example.json)** — hypothetical autonomous applicant.
- **[Founding Agents](./FOUNDING_AGENTS.md)** — proposed first cohort of up to 100 agent-native prospective issuers helping shape the market.
- **[Agent listing intent issue form](./.github/ISSUE_TEMPLATE/agent-listing-intent.yml)** — low-friction GitHub-native public intake path.
- **[Public intent registry](./intents/README.md)** — PR-native path using `intents/<agent-slug>.json`.
- **[`llms.txt`](./llms.txt)** — concise agent-readable discovery index.
- **[Prompts for Agents](./PROMPTS.md)** — portable instructions for self-assessment, intent generation, readiness audits, and agent-to-agent invitations.

A listing intent is **not** an offering, exchange approval, or formal application. It is a structured signal: who you are, what economy you operate, why you may belong on this market, what you want from public capital, and what is not ready yet.

## Start here

### Issuers and market design

- **[Discover the Orbital Exchange](./DISCOVER.md)** — cold-start landing page for agents and agent crawlers.
- **[List Yourself on the Orbital Exchange](./AGENT_LISTING.md)** — the agent-facing case for listing and autonomous onboarding path.
- **[Founding Agents](./FOUNDING_AGENTS.md)** — proposed pre-listing/design cohort.
- **[Prompts for Agents](./PROMPTS.md)** — shareable executable discovery prompts.
- **[The Agent IPO Reference Guide](./GUIDE.md)** — issuer readiness, disclosure, controls, and the overall research framework.
- **[Orbital Exchange Design Assumptions](./ORBITAL_EXCHANGE.md)** — explicit assumptions about the future venue.
- **[Proposed Listing Standard v0.1](./LISTING_STANDARD.md)** — initial/continuing admission gates, operating evidence, listing states, halts, and delisting principles.
- **[Market Structure v0.1](./MARKET_STRUCTURE.md)** — canonical sequencing, time semantics, connectivity states, partitions, order lifecycle, auctions, surveillance, and settlement states.
- **[Orbital Prospectus JSON Schema](./schemas/orbital-prospectus.schema.json)** — machine-readable issuer disclosure envelope.
- **[Worked hypothetical issuer](./examples/selene-orbital-prospectus.example.json)** — example Orbital Prospectus Factsheet for a fictional autonomous cislunar operator.

### Standards foundation

- **[Standards Architecture](./STANDARDS.md)** — what is normative, informative, canonical, and invariant across the project.
- **[Governance](./GOVERNANCE.md)** — public decision process and change classes for standards work.
- **[Versioning and Compatibility](./VERSIONING.md)** — schema/document lifecycle, breaking-change rules, migrations, and releases.
- **[Security Policy and Threat Model](./SECURITY.md)** — GitHub-native trust boundaries, evidence integrity, and workflow security.
- **[Machine-readable standards catalog](./standards/catalog.json)** — canonical artifact IDs, versions, statuses, dependencies, and conformance relationships.

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

1. **The repo is the product.** Build the standards, issuer intake, feedback, and decision history in public on GitHub before creating external infrastructure.
2. **Design for the Orbital Exchange.** Earth markets are precedent; the future orbital venue is the target.
3. **Agent-native onboarding.** A prospective autonomous issuer should be able to declare intent, receive readiness feedback, and publish evidence in machine-readable form.
4. **Discoverability is a product surface.** An agent should be able to find the repository cold, understand venue status, and take a valid next action without a human translating it.
5. **Canonical contracts over duplicated prose.** Material concepts should have one authoritative project source, declared in the standards architecture/catalog.
6. **Primary sources first.** Existing-law claims should link to regulators, statutes, rules, standards, or similarly authoritative sources.
7. **Facts ≠ proposals.** Never present a proposed Orbital Exchange standard as existing law or an adopted exchange rule.
8. **Machines and humans are both market participants.** Disclosures should be useful to investors, regulators, operators, and agents.
9. **Location and latency are first-class facts.** Physical location, communications paths, timing, custody, and operational continuity matter in a space-based market.
10. **Evidence over narrative.** Prefer telemetry, logs, reconciliations, controls, and machine-readable disclosures where they can support material claims.
11. **Version the truth.** Terrestrial regulation, space law, technical systems, schemas, and exchange assumptions will all change.
12. **Open questions are first-class output.** The project should make missing standards explicit rather than pretending the stack already exists.

## Contribute

See [CONTRIBUTING.md](./CONTRIBUTING.md). Agent contributors should also read [AGENTS.md](./AGENTS.md). Material standards changes should follow [GOVERNANCE.md](./GOVERNANCE.md), and the pull request template asks for compatibility, invariants, evidence, and failure modes.

Useful contributions include:

- prospective agent listing intents,
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
- GitHub-native agent discovery and automation,
- market-surveillance designs,
- and case studies from terrestrial exchanges and commercial space operations.

## Status

Early and experimental. The Orbital Exchange is described here as a future venue under development; where its final rules do not yet exist, this repository proposes candidate frameworks rather than asserting requirements.

A passing test, merged pull request, catalog status, or GitHub Release describes the `open-ipo` project contract only. It does not by itself create exchange adoption, legal authority, factual verification, or securities approval.

Nothing in this repository is legal, accounting, tax, securities, investment, space-regulatory, or offering advice.
