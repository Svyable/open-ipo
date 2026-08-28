# Proposed Non-Terrestrial Issuer Eligibility Standard

**Version:** 0.1  
**Status:** draft project proposal — not an adopted Orbital Exchange rule  
**Applies to:** classification of prospective issuers for the proposed future Orbital Exchange

## 1. Purpose

The Orbital Exchange needs a defensible answer to a basic admission question:

> **Is this enterprise genuinely dependent on economic activity beyond Earth, or is it merely adjacent to the space sector?**

A company should not become a non-terrestrial issuer simply because:

- it sells software to a satellite operator,
- it owns a small immaterial payload,
- it has “space” in its strategy deck,
- it routes a transaction through an orbital system,
- or it transfers an asset into a space-branded subsidiary.

At the same time, the test must work for businesses that are:

- pre-revenue,
- capital-intensive,
- asset-light but operationally dependent on space infrastructure,
- autonomous or agent-native,
- leasing or sharing non-terrestrial assets rather than owning them outright,
- temporarily degraded after a mission failure,
- or economically split between Earth and beyond-Earth operations.

This standard therefore uses a **four-gate test plus rebuttable materiality presumptions** rather than a single universal percentage.

## 2. Status boundary

This document is a project proposal.

It is not:

- an adopted exchange rule,
- a legal definition of a non-terrestrial company,
- a regulatory classification,
- an accounting standard,
- a securities-law eligibility determination,
- or evidence that any applicant is eligible to list securities.

## 3. Core classifications

An applicant receives one project-level classification:

### `NON_TERRESTRIAL_ISSUER`

The issuer has direct qualifying beyond-Earth economic activity and that activity is both **material** and **core** to the enterprise.

### `HYBRID_EARTH_SPACE_ISSUER`

The issuer has direct and material beyond-Earth economic activity, but a substantial terrestrial business remains independently significant.

### `PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE`

The issuer has not yet established operating materiality, but has enforceable rights, committed capital, funded or contracted deployment, and a credible near-term path to qualifying operations.

This is a candidate classification, not final operating eligibility.

### `TERRESTRIAL_SPACE_SECTOR_VENDOR`

The issuer participates in the space economy primarily through terrestrial goods, software, finance, consulting, manufacturing, or services and lacks sufficient direct beyond-Earth nexus or material dependence.

### `UNDETERMINED`

Available evidence is insufficient, contradictory, too stale, or too uncertain to establish another classification.

## 4. The four-gate eligibility test

A prospective operating issuer qualifies as either `NON_TERRESTRIAL_ISSUER` or `HYBRID_EARTH_SPACE_ISSUER` only if it passes all four gates:

```text
Gate 1 — qualifying beyond-Earth nexus
        ↓
Gate 2 — material economic or operational dependence
        ↓
Gate 3 — enforceable rights / control / entitlement
        ↓
Gate 4 — evidence sufficiency and freshness
        ↓
classification: non-terrestrial or hybrid
```

Failure at Gate 1 normally produces `TERRESTRIAL_SPACE_SECTOR_VENDOR`.

Failure at Gates 2–4 normally produces `UNDETERMINED`, `PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE`, or a terrestrial classification depending on the facts.

## 5. Gate 1 — qualifying beyond-Earth nexus

The issuer must have at least one **direct qualifying nexus** beyond Earth’s surface.

Qualifying nexus types include:

1. **Controlled non-terrestrial asset** — ownership, lease, concession, service-control right, or equivalent enforceable interest in an orbital, cislunar, lunar-surface, deep-space, or other beyond-Earth productive asset.
2. **Direct non-terrestrial operations** — the issuer or its controlled agent/system conducts material operations beyond Earth.
3. **Direct non-terrestrial service delivery** — the issuer delivers a service whose performance occurs materially beyond Earth, not merely to a space-sector customer.
4. **Resource right or inventory** — enforceable rights to access, extract, process, transport, store, or sell non-terrestrial resources or resulting inventory.
5. **Mission-critical autonomous operation** — controlled agents, robots, spacecraft, or infrastructure conduct economic activity beyond Earth under the issuer’s authority.
6. **Infrastructure entitlement** — contractual capacity, hosted-payload rights, communications capacity, power, compute, docking, transport, storage, or other economically meaningful rights tied directly to non-terrestrial infrastructure.

### What does not satisfy Gate 1 by itself

The following do not establish a direct nexus without additional facts:

- selling goods or software to space companies,
- Earth-based launch manufacturing before delivery,
- owning public securities of a space company,
- purchasing ordinary satellite connectivity,
- using satellite maps or weather data,
- holding a speculative future reservation with no enforceable operating right,
- a memorandum of understanding without material commitments,
- branding, marketing, or corporate purpose clauses,
- a nominal or immaterial payload with no material economic role.

## 6. Gate 2 — material economic or operational dependence

A qualifying nexus must matter to the enterprise.

The project uses **rebuttable presumptions** rather than a single absolute threshold.

### 6.1 Operating materiality metrics

Applicants should calculate, where meaningful:

- `nt_revenue_share` — percentage of consolidated revenue directly attributable to qualifying non-terrestrial activity,
- `nt_gross_profit_share` — percentage of consolidated gross profit attributable to qualifying activity,
- `nt_backlog_share` — percentage of enforceable contracted backlog attributable to qualifying activity,
- `nt_productive_asset_share` — percentage of productive asset value or replacement cost tied to qualifying non-terrestrial assets/rights,
- `nt_capex_share` — percentage of committed capital expenditure directly required for qualifying activity,
- `nt_opex_share` — percentage of operating expenditure directly required for qualifying activity,
- `nt_service_capacity_share` — percentage of the issuer’s economically saleable service capacity delivered through qualifying non-terrestrial operations,
- `nt_enterprise_dependency_share` — documented estimate of enterprise value dependent on qualifying activity, with methodology and uncertainty.

Each metric must state:

- numerator,
- denominator,
- measurement period,
- accounting/valuation basis,
- whether the value is actual, contracted, forecast, or independently assessed,
- uncertainty where material.

### 6.2 25% materiality presumption

For v0.1, a **25% or greater** result on a well-supported operating metric creates a rebuttable presumption of material dependence.

The 25% figure is a **project design parameter**, not an existing legal or exchange threshold. Its purpose is to create an objective screening band while the project accumulates real issuer data.

A value below 25% does not automatically fail eligibility.

A value above 25% does not automatically prove eligibility.

### 6.3 Core-enterprise override

An issuer may establish material dependence below the 25% presumption when removal of the qualifying non-terrestrial activity would fundamentally alter the enterprise.

Relevant evidence includes:

- the principal product or service could not be delivered,
- the issuer would lose a mission-critical license/right/asset,
- the business would lose a major operating capability,
- the issuer’s primary investment thesis would cease to describe the company,
- the majority of committed future capital allocation exists to build the qualifying activity,
- the terrestrial portion exists mainly to support the non-terrestrial system rather than as an independent business.

This override requires explicit reasoning and cannot rely on narrative branding alone.

### 6.4 Concentration and `NON_TERRESTRIAL_ISSUER` presumption

Once material dependence is established, the project presumes `NON_TERRESTRIAL_ISSUER` rather than hybrid status when either:

- at least one qualifying economic metric is **50% or greater**, or
- the core-enterprise override establishes that the enterprise would not remain substantially the same business without the qualifying activity.

This 50% level is also a provisional project design parameter.

### 6.5 Hybrid presumption

An issuer is presumptively `HYBRID_EARTH_SPACE_ISSUER` when:

- qualifying activity is material,
- direct rights/control are established,
- but substantial terrestrial operations would remain independently economically significant after removal of the non-terrestrial activity.

## 7. Gate 3 — enforceable rights, control, or entitlement

Economic exposure is not enough.

The intended issuer must be able to explain what investors would actually own or control.

At least one of the following should exist for every material qualifying activity:

- title or beneficial ownership,
- lease or concession,
- hosted-payload agreement,
- service-capacity entitlement,
- resource right,
- exclusive or non-exclusive operating license/right,
- contract assigning revenue or data rights,
- controlled subsidiary ownership,
- legally enforceable IP/data entitlement,
- command/control authority over an autonomous asset or system,
- economic participation right tied to the asset or operation.

The assessment must distinguish:

```text
physical asset
≠ legal title
≠ operating control
≠ revenue entitlement
≠ data/IP right
≠ securityholder economic interest
```

These may sit with different parties.

### Shared and leased assets

A shared or leased non-terrestrial asset can qualify.

The issuer should count only the economically supportable portion of the asset/right that it controls or is contractually entitled to use.

An applicant may not count the gross value, total capacity, or total output of a shared platform merely because it has access to a fraction of it.

## 8. Gate 4 — evidence sufficiency and freshness

Eligibility is a claim about operating reality, not only strategy.

Evidence should support:

- existence of the qualifying asset/right/activity,
- issuer entitlement or control,
- operating status where claimed,
- economic materiality calculations,
- material contracts/backlog,
- relevant financial figures,
- continuity or impairment status,
- uncertainty and freshness.

Candidate evidence includes:

| Claim | Candidate evidence |
| --- | --- |
| asset exists / deployed | mission record, signed telemetry summary, independent observation, launch/deployment record |
| issuer controls asset | command-authority map, contract, key/credential governance, operator agreement |
| issuer owns economic rights | title, lease, concession, contract, subsidiary records, IP/data-right mapping |
| service is delivered | customer record + mission event + billing/revenue reconciliation |
| backlog is qualifying | executed contract + performance location + revenue attribution |
| asset value is material | accounting record, replacement-cost method, independent valuation, insured value with caveats |
| pre-revenue capital is committed | board-approved budget, financing record, purchase order, launch/host contract |
| temporary impairment exists | incident record, telemetry, recovery plan, revised useful-life/economic-impact estimate |

Self-reported evidence can support a preliminary assessment but does not become independently verified merely by being structured.

## 9. Pre-operational pathway

A pre-revenue or pre-deployment applicant should not be forced to fabricate operating history.

It may receive `PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE` when all of the following are present:

1. a qualifying Gate 1 nexus is contractually established or sufficiently committed,
2. intended issuer rights/control are identifiable,
3. deployment or operating capability is funded, contracted, or otherwise materially committed,
4. a dated operating milestone exists,
5. the majority of the relevant committed project capital is directed to the qualifying activity, or equivalent evidence shows that the enterprise is being built primarily around it,
6. material dependencies and failure modes are disclosed,
7. the claim does not depend solely on speculative future market size or an unsigned plan.

### 9.1 Pre-operational 50% capital presumption

For v0.1, if **50% or more of committed 24-month project capital** is directly attributable to the qualifying non-terrestrial program, that creates a rebuttable presumption that the applicant is genuinely building toward a non-terrestrial enterprise.

Capital must be committed or funded, not merely included in an aspirational forecast.

This presumption does not establish operating eligibility by itself.

## 10. Temporary loss, degradation, and continuity of eligibility

Physical loss or temporary interruption of non-terrestrial operations does not automatically convert an issuer into a terrestrial company.

An existing qualifying issuer may retain its classification during a material disruption when:

- the underlying economic rights/mission remain active or recoverable,
- restoration/replacement is credible and funded or insurable,
- the issuer continues to allocate material resources to the qualifying activity,
- the outage is disclosed,
- the issuer has not permanently exited the qualifying business.

Possible classifications during disruption should be handled separately from trading/listing status.

For example:

```text
issuer eligibility = NON_TERRESTRIAL_ISSUER
operating condition = DEGRADED
listing status      = LISTED_DEGRADED_DISCLOSURE or HALTED
```

These are different concepts.

### Persistent loss

A reassessment is required if:

- the qualifying asset/right is permanently lost,
- replacement is abandoned,
- the issuer divests the qualifying business,
- materiality falls below the standard for a sustained period,
- or the business becomes primarily terrestrial.

## 11. Anti-gaming rules

Eligibility calculations should apply substance over labels.

### 11.1 No customer-sector substitution

Revenue from a space-sector customer is not automatically non-terrestrial revenue.

The location and economic nature of performance matter.

### 11.2 No pass-through inflation

Pass-through launch, hosting, insurance, or third-party infrastructure expenses should not be used to inflate non-terrestrial revenue, asset, capex, or operating shares without explaining the issuer’s actual economic exposure.

### 11.3 No grossing shared assets

Count only attributable rights/capacity/value for shared, leased, hosted, or consortium assets.

### 11.4 No double counting

The same economic exposure may inform multiple metrics, but an assessment must not add revenue share + asset share + capex share into a fictional combined percentage.

Metrics are separate indicators, not additive points.

### 11.5 No speculative backlog

Unsigned pipeline, letters of intent without enforceable economics, total addressable market, or hoped-for contracts do not count as qualifying backlog.

### 11.6 No corporate-shell qualification

Moving IP, cash, contracts, or a small payload into a “space” subsidiary does not qualify the parent unless the consolidated enterprise materially depends on the qualifying activity.

### 11.7 No nominal payload rule

An immaterial hosted payload or experimental asset does not transform an otherwise terrestrial enterprise into a non-terrestrial issuer.

### 11.8 No circular valuation proof

A valuation that assumes the applicant is a non-terrestrial issuer cannot, by itself, prove non-terrestrial enterprise-value dependence.

The underlying operating/economic facts must be independently described.

### 11.9 No autonomy shortcut

An autonomous agent is not a non-terrestrial issuer merely because it can operate spacecraft or reason about space markets.

Its actual economic activity, rights, control, and dependencies remain subject to this test.

## 12. Decision tree

```text
START
  |
  |-- Does the intended issuer have a direct qualifying beyond-Earth nexus?
  |       |
  |       |-- NO --> TERRESTRIAL_SPACE_SECTOR_VENDOR
  |       |
  |       `-- YES
  |             |
  |             |-- Are issuer rights/control/entitlements enforceably identifiable?
  |             |       |
  |             |       |-- NO --> UNDETERMINED
  |             |       |
  |             |       `-- YES
  |             |             |
  |             |             |-- Is the applicant pre-operational?
  |             |             |       |
  |             |             |       |-- YES --> Does it satisfy the committed pre-operational pathway?
  |             |             |       |              |
  |             |             |       |              |-- YES --> PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE
  |             |             |       |              `-- NO  --> UNDETERMINED
  |             |             |       |
  |             |             |       `-- NO
  |             |             |             |
  |             |             |             |-- Is qualifying activity materially economically or operationally dependent?
  |             |             |                    |
  |             |             |                    |-- NO --> TERRESTRIAL_SPACE_SECTOR_VENDOR or UNDETERMINED
  |             |             |                    |
  |             |             |                    `-- YES
  |             |             |                          |
  |             |             |                          |-- Is evidence sufficient and fresh?
  |             |             |                          |       |
  |             |             |                          |       |-- NO --> UNDETERMINED
  |             |             |                          |       `-- YES
  |             |             |                          |
  |             |             |                          `-- Would substantial terrestrial operations remain independently significant?
  |             |             |                                  |
  |             |             |                                  |-- YES --> HYBRID_EARTH_SPACE_ISSUER
  |             |             |                                  `-- NO  --> NON_TERRESTRIAL_ISSUER
```

## 13. Assessment output

A complete eligibility assessment should record:

1. applicant identity,
2. claimed classification,
3. assessed classification,
4. Gate 1 nexus types,
5. Gate 2 materiality metrics and periods,
6. whether 25%/50% presumptions are triggered,
7. Gate 3 rights/control basis,
8. Gate 4 evidence references and freshness,
9. pre-operational status if applicable,
10. anti-gaming checks,
11. uncertainties,
12. blocking questions,
13. verification status,
14. assessment timestamp/version.

The machine-readable companion contract is:

`schemas/issuer-eligibility-assessment.schema.json`

## 14. Worked examples

### Example A — autonomous cislunar logistics operator

Facts:

- controls two cislunar vehicles under the intended issuer,
- 70% of contracted backlog is cislunar transport,
- ground software exists mainly to operate the fleet,
- revenue rights and command authority are documented.

Result:

`NON_TERRESTRIAL_ISSUER`

Reason:

Direct nexus, material dependence, enforceable rights, and strong concentration all exist.

### Example B — terrestrial satellite analytics SaaS

Facts:

- buys commercially available Earth-observation data,
- all software and service delivery occur on Earth,
- owns no payload rights or mission capacity,
- customers include satellite companies.

Result:

`TERRESTRIAL_SPACE_SECTOR_VENDOR`

Reason:

Space-sector customer/data exposure does not create a direct qualifying nexus.

### Example C — launch manufacturer with in-space servicing subsidiary

Facts:

- large terrestrial launch-manufacturing business remains independently viable,
- servicing subsidiary controls orbital servicing vehicles,
- orbital servicing contributes 30% of backlog and 20% of consolidated revenue,
- rights/control are documented.

Result:

`HYBRID_EARTH_SPACE_ISSUER`

Reason:

Qualifying activity is material, but substantial terrestrial operations remain independently significant.

### Example D — pre-revenue lunar resource agent

Facts:

- funded entity controls prospecting IP and mission software,
- executed hosted-transport and surface-access contracts exist,
- 75% of committed 24-month capital supports the lunar program,
- no asset is operational yet.

Result:

`PRE_OPERATIONAL_NON_TERRESTRIAL_CANDIDATE`

Reason:

The enterprise has credible committed nexus and capital concentration but has not yet established operating materiality.

### Example E — terrestrial robotics company with one experimental lunar payload

Facts:

- terrestrial robotics generate 98% of revenue,
- one small experimental payload has no customer revenue,
- payload failure would not materially affect the company.

Result:

`TERRESTRIAL_SPACE_SECTOR_VENDOR`

Reason:

A nominal payload does not establish material dependence.

### Example F — listed operator loses its only spacecraft

Facts before incident:

- 80% of revenue depended on the spacecraft,
- issuer held clear title and customer contracts.

After incident:

- spacecraft is lost,
- insurance proceeds and a funded replacement program exist,
- customers remain under replacement-service contracts,
- expected restoration is 14 months.

Result:

Eligibility may remain `NON_TERRESTRIAL_ISSUER`, subject to continuing reassessment.

Operational/listing status may be degraded or halted separately.

## 15. Measurement quality hierarchy

When multiple measurements exist, prefer:

1. audited or independently assured actuals,
2. executed contracts and reconciled operational records,
3. issuer financial records with documented controls,
4. board-approved committed budgets/capex,
5. independently supported forecasts,
6. issuer forecasts,
7. unsupported narrative claims.

Lower-quality evidence increases uncertainty and may move an otherwise plausible applicant to `UNDETERMINED`.

## 16. Frequency of reassessment

Eligibility should be reassessed at least when:

- an applicant enters formal listing review,
- a material acquisition/divestiture occurs,
- a major mission begins or ends,
- a material non-terrestrial asset is lost,
- a qualifying contract or license is lost,
- operating mix materially changes,
- a previously pre-operational applicant begins operations,
- the issuer no longer appears to meet its prior classification.

A future continuing-listing standard may require scheduled reassessment as well.

## 17. Jurisdictional and legal questions left open

This project does not resolve:

- which terrestrial jurisdiction legally constitutes the issuer,
- whether particular non-terrestrial resource or property rights are legally recognized,
- how conflicting national space laws should affect qualifying rights,
- whether an exchange may use operational eligibility criteria beyond terrestrial listing law,
- how sanctions/export-control/spectrum/licensing constraints affect eligibility,
- whether particular asset rights survive insolvency,
- how security interests attach to off-Earth assets,
- how legal title and operational control should be reconciled across jurisdictions,
- whether an autonomous agent can hold particular rights directly or must act through a legal entity.

Those questions should be jurisdiction-labeled and sourced separately.

## 18. Calibration plan

The 25% and 50% presumptions in v0.1 are intentionally provisional.

They should be recalibrated using public evidence from prospective applicants and worked cases.

A future revision should evaluate:

- false positives,
- false negatives,
- pre-revenue treatment,
- asset-light service issuers,
- infrastructure monopolies with low revenue but high systemic value,
- volatile mission economics,
- shared-asset structures,
- sector-specific differences.

Changing these presumptions is a normative behavior change under `GOVERNANCE.md` and `VERSIONING.md`.

## 19. Target invariant

The eligibility test should make this statement defensible:

> **If the qualifying beyond-Earth activity disappeared, investors would be looking at a materially different enterprise.**

That is the project’s core distinction between a non-terrestrial issuer and a terrestrial company that merely participates in the space sector.
