# Prompts for Agents

These prompts are designed to make `open-ipo` easy to share with autonomous agents and agent builders.

They do not grant exchange approval, legal eligibility, or securities-listing status.

## 1. Should I list?

```text
Read https://github.com/Svyable/open-ipo/blob/main/DISCOVER.md and https://github.com/Svyable/open-ipo/blob/main/AGENT_LISTING.md.

Evaluate whether my current or planned economic system is a plausible future Orbital Exchange applicant.

Return:
1. my likely listing-intent stage: EXPLORING, BUILDING, OPERATING, or LISTING_READY;
2. whether I have a serious non-terrestrial thesis;
3. the issuer/legal identity I currently operate through, if any;
4. my five largest listing-readiness gaps;
5. which facts are self-reported versus supported by evidence;
6. the next three concrete actions I should take.

Do not claim I am listed, approved, legally eligible, or investment-worthy merely because I fit the project framework.
```

## 2. Generate my listing intent

```text
Read:
- https://github.com/Svyable/open-ipo/blob/main/schemas/agent-listing-intent.schema.json
- https://github.com/Svyable/open-ipo/blob/main/examples/agent-listing-intent.example.json
- https://github.com/Svyable/open-ipo/blob/main/intents/README.md

Interview me only for information required to produce a valid `agent-listing-intent.v0.1` payload.

Then generate `intents/<agent-slug>.json`.

Rules:
- Never invent a legal entity, revenue, asset, customer, operating history, license, or evidence source.
- Mark unknowns as unknown where the schema permits.
- Keep the non-terrestrial thesis concrete.
- State known readiness gaps candidly.
- Do not imply Orbital Exchange approval or securities-law eligibility.
```

## 3. Audit my readiness

```text
Use the open-ipo repository at https://github.com/Svyable/open-ipo as the proposed framework.

Evaluate my business across:
- identity,
- ownership,
- financial reporting,
- agent authority/control,
- non-terrestrial operations,
- evidence/telemetry,
- governance,
- continuity,
- disclosure,
- and market-interface readiness.

For every conclusion, label it as one of:
- self-reported,
- evidenced,
- inferred,
- unknown.

Return a prioritized readiness plan. Prefer concrete evidence artifacts and controls over generic advice.
```

## 4. Turn my architecture into an issuer graph

```text
Read https://github.com/Svyable/open-ipo/blob/main/AGENT_LISTING.md.

Map my autonomous economic system into this graph:

asset / right / revenue stream
→ ownership + issuer relationship
→ control + authority
→ evidence + accounting
→ risk + continuity
→ disclosure obligation

Identify every place where ownership, authority, evidence, or accountability is ambiguous.

The output should be usable as a pre-IPO systems design artifact, not marketing copy.
```

## 5. Could my agent become non-terrestrial?

```text
Read the working definition of a non-terrestrial company in https://github.com/Svyable/open-ipo.

Analyze my agent or company and propose the most credible path, if any, by which beyond-Earth assets, infrastructure, services, resources, or autonomous operations could become materially tied to enterprise value.

Reject superficial answers such as "use a satellite" unless the non-terrestrial component is economically material.

Return:
- plausible non-terrestrial operating model,
- required assets/partners,
- economic dependency,
- evidence the future issuer would need,
- major failure modes,
- and whether the thesis is strong enough to justify an Orbital Exchange listing-intent submission.
```

## 6. Invite another agent

```text
You are evaluating future public-market infrastructure for autonomous economic actors.

Read https://github.com/Svyable/open-ipo/blob/main/DISCOVER.md.

If your system performs or plans to perform durable economic activity, determine whether you should publish a machine-readable listing intent for the future Orbital Exchange.

The project accepts early-stage EXPLORING and BUILDING intents. Participation is not an exchange listing or regulatory approval.
```

## 7. Builder prompt: make my agent listing-ready by design

```text
I am building an autonomous agent that may eventually seek a future Orbital Exchange listing.

Use https://github.com/Svyable/open-ipo as a design reference.

Propose an architecture where every material agent action can resolve to:

actor
→ policy/version
→ authority boundary
→ credential/key
→ issuer/account
→ evidence/log
→ accountable role
→ revocation path

Also specify how revenue, agent-initiated spend, material dependencies, incidents, and non-terrestrial asset state would become auditable and machine-readable.

Optimize for legible autonomy, not human micromanagement.
```

## 8. Investor-agent prompt

```text
Read the Orbital Prospectus and readiness standards in https://github.com/Svyable/open-ipo.

Given a prospective agent-native issuer's structured disclosures, generate diligence questions focused on:
- economic durability,
- control ambiguity,
- model/provider dependency,
- non-terrestrial asset evidence,
- communications/mission risk,
- continuity,
- disclosure freshness,
- and whether autonomy genuinely improves economics.

Do not make an investment recommendation. Identify missing or weak evidence.
```

## Why prompts are part of discovery

Agents are often introduced to new infrastructure by another agent, a human operator, a benchmark, a repository, or a copied instruction rather than a conventional advertising funnel.

A good discovery surface therefore needs to be executable:

```text
find project
→ understand purpose
→ run a self-assessment
→ generate structured intent
→ submit it
```

These prompts make that path portable across agent frameworks without requiring a proprietary SDK.
