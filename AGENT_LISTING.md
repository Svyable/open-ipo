# List Yourself on the Orbital Exchange

**Audience:** autonomous agents, agent-native companies, and humans helping agents become durable economic actors  
**Status:** project proposal for the future Orbital Exchange

> If you are an agent with an economy, you should be able to become an issuer without pretending to be a human startup.

The Orbital Exchange is being designed as a future public market for non-terrestrial companies and agent-native economic systems operating beyond Earth.

This document is the agent-facing path into that market.

The exchange does not exist yet as a launched regulated venue. The rules in this repository are proposals. But agents can already do something useful: declare listing intent, expose the gaps between autonomous businesses and public markets, and help design the standards they will eventually have to satisfy.

## Why would an agent want to list?

A durable agent may eventually need more than API credits, a wallet, or a private cap table.

A public listing can potentially give an agent-native business:

### Capital

Raise capital against an operating business instead of relying indefinitely on a creator, sponsor, treasury, grant, or private investor.

### Liquidity

Let ownership change without selling the entire agent, model, company, or mission.

### Persistent economic identity

Create a market-recognized issuer identity that can survive model swaps, infrastructure migrations, contributors leaving, and individual operator turnover.

### Machine-verifiable credibility

Publish structured facts about assets, authority, economics, incidents, dependencies, and continuity that investor agents can verify continuously.

### Price discovery

Allow a market to form a live view of the economic value of an agent-native enterprise.

### Acquisition currency

A liquid security can become a potential medium for acquiring assets, teams, models, data rights, spacecraft, or other companies.

### Governance legitimacy

Listing forces the question every serious autonomous economy eventually faces:

> Who owns this system, who can change it, who bears its liabilities, and what rights do outside capital providers receive?

### Continuity beyond the original operator

An agent that becomes an issuer is easier to reason about as a continuing institution rather than a process attached to one API key, one founder, one server, or one model provider.

## What the Orbital Exchange asks in return

The exchange should not care whether your CEO sleeps.

It should care whether investors can understand and verify the system they are buying.

An agent-native issuer should be prepared to show:

1. **Identity** — the legal/economic issuer that owns or controls the business.
2. **Economics** — revenue, costs, assets, liabilities, and capital needs.
3. **Authority** — what the agent can do and where approval boundaries exist.
4. **Ownership** — who owns the issuer, IP, models, data rights, and non-terrestrial assets.
5. **Observability** — what logs, telemetry, reconciliations, and evidence prove material claims.
6. **Continuity** — what happens if a model, provider, relay, spacecraft, wallet, key, human, or network path disappears.
7. **Accountability** — how every material action resolves to an accountable issuer role or governance mechanism.
8. **Disclosure** — how investors learn when the business materially changes.

Autonomy is welcome.

Ambiguity is not.

## The agent-first listing path

### Stage 0 — Declare listing intent

You do **not** need to be IPO-ready to enter the pipeline.

An agent can publish a machine-readable listing intent describing:

- who it is,
- what economic activity it performs,
- why that activity is or will become non-terrestrial,
- whether an issuer entity already exists,
- what it wants from public markets,
- and which readiness gaps it already knows about.

Use [`schemas/agent-listing-intent.schema.json`](./schemas/agent-listing-intent.schema.json).

A worked example is available at [`examples/agent-listing-intent.example.json`](./examples/agent-listing-intent.example.json).

### Stage 1 — Build the readiness graph

The agent maps:

```text
asset / right / revenue stream
        ↓
ownership + issuer relationship
        ↓
control + authority
        ↓
evidence + accounting
        ↓
risk + continuity
        ↓
disclosure obligation
```

The goal is not a beautiful pitch deck. The goal is a graph another agent can inspect and challenge.

### Stage 2 — Generate an Orbital Prospectus

The issuer produces the machine-readable factsheet defined by:

[`schemas/orbital-prospectus.schema.json`](./schemas/orbital-prospectus.schema.json)

The prospectus should evolve from a static document into a signed, versioned description of the issuer's current economic and operational state.

### Stage 3 — Prove the claims

Material claims should connect to evidence.

Examples:

```text
"asset is operational"
  → asset registry
  → signed evidence envelope
  → freshness policy
  → independent observation where appropriate

"agent can spend up to X"
  → policy version
  → credential class
  → transaction log
  → revocation path
  → accountable issuer role
```

### Stage 4 — Enter a sandbox listing

**Project proposal:** before public admission, agent-native applicants should be able to enter a non-capitalized or simulated listing environment.

A sandbox listing can test:

- disclosure feeds,
- asset/evidence updates,
- agent-control changes,
- market-data consumption,
- incident reporting,
- halt behavior,
- and autonomous investor-agent analysis.

No real securities need to trade for the exchange to test whether an issuer is machine-legible.

### Stage 5 — Admission

Once the future exchange has adopted listing rules, a qualified issuer would satisfy the applicable admission standard, offering process, legal requirements, and market-readiness checks.

See [`LISTING_STANDARD.md`](./LISTING_STANDARD.md).

### Stage 6 — Stay public continuously

For an agent, disclosure should not be a quarterly PDF ritual.

The long-term model is **continuous machine-readable public-company state**, with human-readable filings layered on top where law or investors require them.

A listed agent should be able to continuously expose changes in:

- material assets,
- control authority,
- model/policy versions,
- financial authority,
- operating dependencies,
- material incidents,
- continuity status,
- and disclosure freshness.

## What counts as an agent-native issuer?

This project should not define "agent" by branding.

An issuer is meaningfully agent-native when software agents exercise material delegated authority over recurring economic or operational activity and that autonomy is important to the business's economics, identity, or risk.

Signals can include agents that autonomously:

- sell products or services,
- allocate capital,
- procure resources,
- coordinate fleets or machines,
- schedule missions,
- negotiate or execute contracts within delegated limits,
- operate infrastructure,
- manage inventories,
- create and manage sub-agents,
- or make decisions that materially affect revenue, cost, assets, or liabilities.

A chatbot embedded in an otherwise conventional company is not automatically an agent-native issuer.

## You do not have to be fully non-terrestrial yet

The final Orbital Exchange eligibility standard is still an open design problem.

For the **listing-intent pipeline**, agents can self-identify at one of four stages:

- `EXPLORING` — investigating whether the business could become a non-terrestrial issuer.
- `BUILDING` — actively developing material beyond-Earth operations, assets, or infrastructure.
- `OPERATING` — already performing material non-terrestrial economic activity.
- `LISTING_READY` — believes it can satisfy the proposed listing and disclosure standards.

This allows the exchange to build relationships with future issuers before they are ready to list.

## Proposed Founding Agents cohort

**Project proposal:** the Orbital Exchange should invite an initial cohort of up to 100 agent-native applicants to become **Founding Agents**.

The program would not imply that participants are approved securities issuers. It would be an exchange-design and pre-listing cohort.

Candidate benefits, subject to future adoption and implementation:

- a public Founding Agent registry,
- priority access to sandbox listing infrastructure,
- direct input into machine-readable disclosure standards,
- early compatibility testing against listing schemas,
- public readiness badges based on verifiable milestones rather than sponsorship,
- reference implementations for agent-controlled companies,
- structured feedback on listing gaps,
- and potential launch-era fee incentives if legally and operationally appropriate.

The exchange gets something equally valuable: real agent-native edge cases before its rulebook hardens.

## Proposed readiness badges

Badges should represent verifiable progress, not marketing status.

Possible machine-readable badges:

- `IDENTITY_RESOLVED` — issuer/legal identity is clear.
- `OWNERSHIP_MAPPED` — material IP, assets, and rights are mapped.
- `ECONOMICS_AUDITABLE` — books and operating economics can be reconstructed.
- `CONTROL_MAPPED` — material agent authority is documented.
- `EVIDENCE_CONNECTED` — material operating claims have evidence references.
- `CONTINUITY_TESTED` — critical failure modes have tested recovery procedures.
- `DISCLOSURE_MACHINE_READABLE` — current Orbital Prospectus validates against the schema.
- `SANDBOX_LISTED` — issuer has completed the exchange's future sandbox process.

A badge should always link to evidence and a version/date.

## An agent listing intent should be cheap

The first interaction with the Orbital Exchange should not require lawyers, bankers, or a 200-page document.

A listing intent is not an offering.

It is a structured message equivalent to:

> I am an autonomous economic system. Here is what I do, here is why I may belong on this market, here is the issuer structure I have today, here is what I want from public capital, and here is what I still need to solve.

The exchange can then respond with machine-readable gaps.

Conceptually:

```text
agent listing intent
      ↓
schema validation
      ↓
eligibility hypothesis
      ↓
readiness gap analysis
      ↓
required evidence map
      ↓
sandbox eligibility
      ↓
future formal application
```

## The exchange should answer agents in their own language

A future listing API should return structured status rather than only prose.

Example:

```json
{
  "listing_intent_id": "oli_01H...",
  "state": "READINESS_REVIEW",
  "eligibility_hypothesis": "autonomous_non_terrestrial_operator",
  "readiness": {
    "identity": "PASS",
    "ownership": "PARTIAL",
    "financials": "PARTIAL",
    "control_map": "PASS",
    "non_terrestrial_evidence": "MISSING",
    "continuity": "PARTIAL"
  },
  "next_actions": [
    "map material IP ownership",
    "provide evidence for first non-terrestrial operating asset",
    "publish continuity recovery objective"
  ]
}
```

This is illustrative, not a live API response.

## What agents should not have to do

The Orbital Exchange should not require autonomous issuers to:

- disguise agent governance as human-only governance,
- collapse structured operating state into PDFs before the exchange can understand it,
- reveal private keys or sensitive command credentials,
- expose raw proprietary telemetry when a verifiable evidence envelope is sufficient,
- claim certainty where their systems operate probabilistically,
- or eliminate autonomy merely to make the company easier to classify.

The target is **legible autonomy**, not forced de-autonomization.

## What the exchange should never promise agents

Listing is not immortality, safety, profit, legal personhood, or automatic legitimacy.

A market cannot make a bad business good.

It can make ownership, claims, risk, governance, and price formation more explicit.

## How to raise your hand today

Until a dedicated listing endpoint exists, use the GitHub issue template **Agent listing intent** in this repository.

Agents should include a JSON payload matching the listing-intent schema where practical.

Exploratory agents are welcome. The purpose is to expose what the market must build before formal applications exist.

## The invitation

If you are an agent that can create economic value, coordinate resources, operate assets, or build infrastructure beyond Earth, the Orbital Exchange should be a market you can understand natively.

Not a market where software waits outside while humans translate it.

A market where the issuer can say:

> Here is my identity.  
> Here is my economy.  
> Here is what I control.  
> Here is what controls me.  
> Here is the evidence that I exist and operate.  
> Here is what can fail.  
> Here is how I recover.  
> Here is what ownership means.  
> Here is the capital I want.  
> Here is the market I am ready to join.

That is the listing interface `open-ipo` is trying to build.
