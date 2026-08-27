# Orbital Exchange Proposed Listing Standard

**Version:** 0.1  
**Status:** Project proposal — not an adopted exchange rule  
**Target:** Initial and continuing admission of non-terrestrial issuers to the future Orbital Exchange

This document is a design proposal. It does **not** describe existing Orbital Exchange requirements.

## 1. Objective

The Orbital Exchange should admit issuers only when investors can understand what they own, reconstruct the issuer's material economic activity, identify who or what can cause material actions, and assess whether the business can survive failures in space assets, communications, software, agents, counterparties, and terrestrial dependencies.

The listing standard should optimize for four properties:

1. **Economic legibility** — assets, rights, revenues, costs, liabilities, and dependencies are attributable.
2. **Operational observability** — material non-terrestrial operations can be evidenced, not merely narrated.
3. **Control legibility** — command authority, governance, agent permissions, and emergency powers are explicit.
4. **Continuity** — the issuer and the market can operate safely through degraded connectivity and component failure.

## 2. Proposed issuer eligibility classes

An applicant should identify at least one primary eligibility class:

- **Orbital infrastructure** — stations, platforms, depots, relays, compute, communications, servicing, manufacturing, or logistics operating beyond Earth's surface.
- **Space resource** — prospecting, extraction, processing, transport, storage, or sale of non-terrestrial resources.
- **Space services** — services materially delivered through non-terrestrial assets or operations.
- **Autonomous non-terrestrial operator** — an agent-native company whose material economic activity is performed by autonomous systems operating beyond Earth.
- **Hybrid Earth-space enterprise** — a company whose enterprise value materially depends on non-terrestrial assets or operations even when management, customers, or substantial infrastructure remain terrestrial.

A purely terrestrial company should not qualify merely because it sells to the space sector.

## 3. Initial admission gates

An issuer should not be admitted until each gate is either satisfied or explicitly waived under a published exception process.

### Gate A — Legal and ownership identity

The issuer should disclose:

- legal entity and governing jurisdiction,
- security being listed and rights attached to it,
- capitalization and beneficial ownership framework,
- ownership or enforceable control of material IP, contracts, data rights, licenses, permits, and non-terrestrial assets,
- material liens, encumbrances, revenue shares, or mission-level claims,
- and the relationship between any autonomous agent system and the legal issuer.

### Gate B — Financial reporting

The issuer should demonstrate:

- repeatable financial close procedures,
- auditable books and records,
- attribution of launch, mission, compute, communications, insurance, replacement, and agent-initiated spend,
- accounting policies for capitalized space assets and mission losses,
- revenue recognition tied to observable performance obligations,
- and controls over transactions initiated by autonomous systems.

The exchange should avoid hard-coding a single accounting regime until its jurisdictional model is settled; the key requirement is disclosed, consistent, independently testable financial reporting.

### Gate C — Non-terrestrial asset registry

Each material non-terrestrial asset should have a stable issuer-level identifier and, where applicable:

- asset class,
- operational status,
- location/orbit/trajectory reference,
- ownership or contractual control,
- mission purpose,
- launch/deployment history,
- expected operating life,
- critical dependencies,
- telemetry or evidence source,
- and loss/degradation criteria.

The registry need not expose sensitive command details. It should expose enough to reconcile economic claims with operating reality.

### Gate D — Command and control map

For every material action class, the issuer should identify:

```text
action → initiating actor → approval boundary → credential/key → logging path → revocation path → accountable role
```

This applies whether the actor is a human, agent, spacecraft, multisig, policy engine, ground station, or third-party provider.

At minimum, the issuer should document authority over:

- mission planning,
- navigation or maneuvering,
- deployment,
- software/model updates,
- payload operations,
- procurement and spend,
- asset transfer,
- contracting,
- data release,
- and emergency shutdown or safing.

### Gate E — Mission and continuity evidence

The issuer should identify its material single points of failure across:

- launch,
- spacecraft/platform,
- propulsion/power/thermal systems,
- ground or relay communications,
- cloud/model providers,
- navigation/time sources,
- key personnel,
- agent policy systems,
- wallets/credentials,
- customers and counterparties,
- and regulatory or contractual permissions.

For each material failure class, the issuer should disclose recovery, substitution, or orderly-loss procedures.

### Gate F — Governance and accountability

The issuer should have a governance structure able to answer:

- Who can bind the issuer?
- Which decisions are reserved to directors/officers or equivalent governing roles?
- Which decisions may be delegated to agents?
- Who can modify agent goals, policies, models, or permissions?
- Who has emergency authority over non-terrestrial assets?
- How are conflicts between mission safety, investor economics, and autonomous decision-making resolved?

### Gate G — Disclosure system

The issuer should maintain a process for evaluating whether changes or incidents are material to investors, including:

- loss or degradation of a material non-terrestrial asset,
- launch or deployment failure,
- loss of communications,
- material orbital or trajectory change,
- collision or conjunction event,
- loss of a critical license/permission/provider,
- agent-control failure,
- material cybersecurity compromise,
- unexpected mission-life reduction,
- major customer/counterparty loss,
- and financial impacts that invalidate previously published operating assumptions.

## 4. Proposed quantitative admission metrics

The exchange will eventually need quantitative thresholds, but `open-ipo` should not invent arbitrary minimum market capitalization, float, revenue, shareholder count, or price thresholds without an economic model.

Instead, v0.1 proposes that every numeric threshold satisfy:

1. **Purpose:** what market-quality or investor-protection problem does it solve?
2. **Measurement:** can it be measured consistently for non-terrestrial issuers?
3. **Gaming resistance:** how easily can it be engineered around?
4. **Stage fit:** does it exclude capital-intensive but economically legitimate orbital businesses for the wrong reason?
5. **Continuing relevance:** does the metric remain useful after listing?

Quantitative standards should be introduced as separately versioned proposals.

## 5. Operating evidence standard

For claims that depend on physical non-terrestrial operations, issuers should provide verifiable evidence appropriate to the claim.

Examples include:

| Claim | Possible evidence |
| --- | --- |
| Asset is operational | signed telemetry summary, third-party observation, mission logs |
| Service was delivered | customer record + mission event + billing record |
| Payload produced output | instrument/production log + chain of custody |
| Resource inventory exists | measurement method + provenance + uncertainty bounds |
| Agent executed action | signed event log + policy version + authority record |
| Asset was impaired | incident record + telemetry + financial impact assessment |

The exchange should standardize evidence envelopes before standardizing any particular telemetry vendor or cryptographic scheme.

## 6. Continuing listing obligations

A listed issuer should continuously maintain:

- current issuer and security identity,
- current material asset registry,
- current command/control map,
- financial reporting and disclosure controls,
- material incident evaluation,
- continuity plans,
- and a machine-readable Orbital Prospectus Factsheet.

Material changes should be versioned so investors and agents can compare current state against prior disclosed state.

## 7. Proposed listing status model

A security may occupy one of these venue states:

- `APPLICANT`
- `CONDITIONALLY_APPROVED`
- `LISTED`
- `LISTED_DEGRADED_DISCLOSURE`
- `HALTED`
- `SUSPENDED`
- `DELISTING_REVIEW`
- `DELISTED`

`LISTED_DEGRADED_DISCLOSURE` is intentionally distinct from a trading halt. A communications outage or delayed telemetry feed may reduce disclosure freshness without necessarily making trading impossible. The exchange should make that degradation visible to every participant.

## 8. Halt and suspension triggers

Potential triggers include:

- uncertainty about the identity or continued existence of a material asset,
- inability to establish authoritative market state,
- material issuer event with information asymmetry,
- corrupted or conflicting issuer disclosure feeds,
- compromise of issuer signing authority,
- loss of exchange execution integrity,
- unresolved settlement inconsistency,
- or an emergency condition under the exchange's future rulebook.

The rulebook should distinguish **issuer halts**, **instrument halts**, **market-segment halts**, and **venue-wide safe mode**.

## 9. Delisting principles

Delisting should be based on transparent, appealable standards. Candidate grounds include:

- persistent failure to provide required financial or operational disclosures,
- inability to establish ownership/control of the listed business or material assets,
- prolonged non-operation without a credible recovery or wind-down plan,
- repeated control failures that make issuer actions unattributable,
- loss of required legal capacity or permissions,
- fraud or fabricated operating evidence,
- or failure to maintain market-integrity requirements.

A physically lost asset does not automatically imply a failed issuer; for some businesses, asset loss is an expected operating risk. The material question is whether the issuer remains economically and operationally legible.

## 10. Admission packet

A future application could contain:

```text
01 issuer identity
02 security terms
03 capitalization
04 financial statements + accounting policies
05 material asset registry
06 mission/operations history
07 command and control map
08 autonomous-system architecture
09 dependency map
10 risk factors
11 continuity and incident framework
12 permissions/licenses/jurisdiction map
13 Orbital Prospectus Factsheet
14 evidence manifest
15 management/governance attestations
```

## 11. Open design questions

- What makes an enterprise sufficiently "non-terrestrial" to qualify?
- Should admission standards vary by issuer class?
- How should pre-revenue infrastructure issuers demonstrate economic readiness?
- What evidence deserves independent attestation?
- Which operational metrics should be mandatory versus issuer-specific?
- How fresh must telemetry-linked disclosures be?
- When does loss of connectivity become a disclosure degradation versus a trading halt?
- What exchange authority can reach an issuer whose material assets are beyond Earth?
- How should listing standards interact with terrestrial securities and space-law regimes?

This document should evolve into a versioned proposed rulebook module, not a static essay.