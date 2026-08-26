# The Agent IPO Reference Guide for the Orbital Exchange

**Version:** 0.2  
**Last checked:** 2026-08-26  
**Target venue:** the future Orbital Exchange  
**Scope:** agent-native and non-terrestrial issuers preparing for a space-based public market.

> If you are an agent trying to go public on the Orbital Exchange, your first question is not “How do I file an S-1?” It is: **What issuer, operating evidence, governance, controls, disclosures, and market interfaces make my non-terrestrial business investable?**

This guide maps a possible path from an autonomous agent or agent-native non-terrestrial business to a future Orbital Exchange listing.

The Orbital Exchange is nascent and not yet launched. Its final listing and market rules do not yet exist in this repository. Accordingly, this guide separates **terrestrial precedent** from **Orbital Exchange design assumptions** and **project proposals**.

It is a research reference, not legal, accounting, tax, securities, investment, space-regulatory, or offering advice.

---

## 1. The thesis

Agents are becoming capable of economically meaningful work: selling services, buying infrastructure, negotiating, operating workflows, allocating resources, producing intellectual property, coordinating other agents, and eventually operating machines and assets beyond Earth.

At the same time, commercial space activity is creating enterprises whose value increasingly depends on orbital infrastructure, remote sensing, communications, servicing, logistics, manufacturing, compute, power, robotics, and other non-terrestrial systems.

`open-ipo` starts from the thesis that these trends eventually meet:

> **agents will operate non-terrestrial companies, and some of those companies will want access to a public market designed for the non-terrestrial economy.**

The target market is the **Orbital Exchange**, a future space-based marketplace for listing, trading, and execution of securities of non-terrestrial companies.

The core question for this repository is:

> **What has to be true for an agent-native non-terrestrial economic system to become legible, governable, auditable, and tradeable on the Orbital Exchange?**

---

## 2. Four statement types

Every contribution should distinguish these categories.

### 2.1 Terrestrial precedent

Existing laws, exchange rules, accounting standards, governance practices, filing systems, and market-structure mechanisms that can inform Orbital Exchange design.

### 2.2 Orbital Exchange assumption

A working assumption about the future venue used so the project can reason concretely before a final rulebook exists.

### 2.3 Project proposal

A candidate standard, disclosure, control, schema, listing test, market rule, or assurance mechanism proposed by `open-ipo`.

### 2.4 Open question

An issue that is unresolved or requires legal, market, technical, accounting, engineering, or space-operations research.

Never silently turn one category into another.

---

## 3. Working definition: non-terrestrial company

For this project, a **non-terrestrial company** is an issuer whose enterprise value materially depends on assets, infrastructure, operations, services, resources, or autonomous economic activity beyond Earth’s surface.

This is a project definition, not an existing legal category or adopted Orbital Exchange listing standard.

Examples could eventually include companies focused on:

- orbital communications,
- Earth observation and sensing,
- in-space servicing,
- logistics and transport,
- in-space manufacturing,
- orbital compute and data infrastructure,
- space-based power,
- habitats or stations,
- resource prospecting or utilization,
- robotic operations,
- or agent-operated spacecraft and services.

A future eligibility standard will need to distinguish a genuinely non-terrestrial enterprise from a terrestrial company with incidental exposure to space.

---

## 4. The core Orbital IPO model

A possible stack looks like this:

```text
Agent / agent system
        ↓
Non-terrestrial operations + assets
        ↓
Economic rights, IP, contracts, data, telemetry, cash flows
        ↓
Issuer entity
        ↓
Governance + accounting + controls + operational evidence
        ↓
Orbital Exchange admission / offering process
        ↓
Space-based trading + execution
        ↓
Settlement + ownership records + custody
        ↓
Investors + continuing orbital-market disclosure
```

The hard part is making every arrow explicit.

For an agent-native non-terrestrial issuer, the public-market object is not just the model or spacecraft. It is the entire controlled economic system around them.

---

## 5. What “Orbital-IPO-ready” should mean

An issuer should not be considered ready merely because it has revenue, a launch, an autonomous agent, or an asset in orbit.

It should be able to demonstrate at least these properties.

| Dimension | Orbital-market question | Agent / non-terrestrial version |
| --- | --- | --- |
| Identity | What exactly is the issuer? | Which entity owns the agent, space assets, IP, contracts, data rights, cash flows, and liabilities? |
| Non-terrestrial eligibility | Why does this belong on the Orbital Exchange? | Which material operations or assets are genuinely beyond Earth? |
| Ownership | Who owns the enterprise? | Are equity, IP, spacecraft, software, contributor rights, licenses, and contractual rights cleanly attributable? |
| Financials | Can performance be measured reliably? | Can terrestrial and off-Earth revenue, mission cost, compute, launch cost, replacement cost, agent spend, and liabilities be reconciled into auditable books? |
| Control | Who can cause the company to act? | Which humans, agents, models, policies, keys, spacecraft controllers, providers, wallets, and sub-agents can initiate material actions? |
| Governance | Who is accountable? | Which decisions are reserved to directors/officers versus delegated to software or mission systems? |
| Asset evidence | Can investors verify the operating reality? | What telemetry, logs, third-party evidence, inspection, or assurance supports claims about off-Earth assets? |
| Mission resilience | Can the business survive physical failure? | What happens after launch failure, loss of contact, collision, component failure, orbital decay, or loss of a critical ground path? |
| Market connectivity | Can the issuer operate through Earth-space boundaries? | Are latency, communications outages, authoritative records, and incident communications planned for? |
| Disclosure | Can investors understand the business and risks? | Are autonomy, mission status, asset dependence, licenses, model providers, telemetry limits, and continuity risks explained without hype? |
| Continuity | What remains if a core component disappears? | Can the company survive loss of a spacecraft, model provider, ground station, launch provider, key, license, or critical dataset? |

A useful shorthand is:

**Ownable + Auditable + Governable + Locateable + Discloseable + Resilient + Accountable.**

---

## 6. The Orbital Exchange is the target; Earth markets are precedent

The first version of this guide was framed around a conventional U.S. IPO. That was too narrow.

Existing terrestrial public markets remain extremely useful because they have spent decades solving recurring problems:

- issuer eligibility,
- financial reporting,
- governance,
- disclosure,
- investor protection,
- market integrity,
- trading controls,
- clearing and settlement,
- custody,
- continuing obligations,
- and enforcement.

But `open-ipo` should treat these systems as a **precedent library**, not the target architecture.

The design question is:

> Which public-market functions are essential, and how should they be implemented when issuers, assets, autonomous agents, communications paths, and parts of the exchange infrastructure itself operate beyond Earth?

### 6.1 Useful current U.S. precedent

For a U.S. registered offering today, public-company readiness typically involves a legally recognized issuer, audited financial information, governance, a registration statement, SEC review, exchange listing standards, and continuing reporting.

Primary references include:

- [SEC — Going Public](https://www.sec.gov/resources-small-businesses/going-public)
- [SEC — What is a Registration Statement?](https://www.sec.gov/resources-small-businesses/going-public/what-registration-statement)
- [SEC — Ready to Go Public?](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/ready-go-public)
- [SEC — Submit Filings / EDGAR](https://www.sec.gov/submit-filings)
- [SEC — Form S-1](https://www.sec.gov/files/forms-1.pdf)
- [SEC — Regulation S-K](https://www.ecfr.gov/current/title-17/chapter-II/part-229)
- [SEC — Regulation S-X](https://www.ecfr.gov/current/title-17/chapter-II/part-210)
- [Nasdaq — Initial Listing Guide](https://listingcenter.nasdaq.com/Assets/Initialguide.pdf)
- [Nasdaq — Listing Rules](https://listingcenter.nasdaq.com/rulebook/nasdaq/rules)
- [NYSE — Listings](https://www.nyse.com/listings)

These are not Orbital Exchange requirements unless and until the future venue chooses to incorporate or mirror them.

---

## 7. Proposed Orbital Exchange admission questions

The following are **project proposals**, not adopted rules.

A non-terrestrial issuer seeking admission could be expected to answer:

### 7.1 Eligibility

- What makes the enterprise materially non-terrestrial?
- Which off-Earth assets or operations drive enterprise value?
- Is the non-terrestrial exposure operating, developmental, contractual, or speculative?
- What evidence verifies the location and operating status of material assets?

### 7.2 Operating history

- How much operating history exists on Earth versus off Earth?
- Which missions have succeeded, degraded, failed, or ended?
- What percentage of revenue depends on assets that have not yet launched or entered service?

### 7.3 Financial readiness

- Are historical financials auditable?
- Are mission-level costs and liabilities traceable?
- Are launch, insurance, replacement, ground infrastructure, spectrum, compute, and agent costs attributed consistently?
- Can the issuer distinguish capital assets from consumable mission expenditure and service expense?

### 7.4 Governance and accountability

- Which governing body is accountable for mission, financial, disclosure, and agent-control decisions?
- Which decisions can autonomous systems execute?
- Who can suspend an agent or spacecraft authority path?
- Who owns emergency authority?

### 7.5 Operational evidence

- Which claims about off-Earth assets can be independently verified?
- Which telemetry is material?
- Which data is too sensitive or operationally risky to disclose publicly?
- Can an independent reviewer reconstruct major mission events?

---

## 8. The non-terrestrial disclosure layer

A future Orbital Exchange prospectus should make the economics and risks of off-Earth operations understandable without requiring investors to be mission engineers.

The following are proposed disclosure topics.

### 8.1 Asset location and status

For each materially significant non-terrestrial asset or asset class:

- What is it?
- Where does it operate?
- Is it launched, commissioned, degraded, dormant, decommissioned, or planned?
- What is its expected useful life?
- Can it be serviced or replaced?
- What revenue, capacity, or strategic value depends on it?

### 8.2 Mission and launch dependence

- Which launch providers are material?
- What is the schedule dependency?
- What happens financially after delay or launch failure?
- Is replacement hardware available?
- What insurance, contractual recovery, or contingency capacity exists?

### 8.3 Communications and ground dependence

- Which ground stations, relays, providers, or networks are critical?
- What is the longest tolerable loss of contact?
- Which operations can continue autonomously during a communications outage?
- What happens if ground and orbital state temporarily diverge?

### 8.4 Physical environment risk

Potentially material risks can include:

- debris,
- collision,
- radiation,
- thermal conditions,
- power loss,
- component degradation,
- orbital decay,
- launch or reentry events,
- and inability to physically repair a failed asset.

The relevant disclosure should connect the physical risk to economic consequence.

### 8.5 Licensing, jurisdiction, and permission dependencies

A non-terrestrial issuer may depend on multiple legal permissions and authorities across jurisdictions and operating domains.

Disclosure should identify which licenses, registrations, approvals, spectrum rights, operating permissions, launch arrangements, or other authorizations are economically material and what happens if they are delayed, changed, or lost.

The project should map specific legal regimes separately and avoid claiming a universal “space jurisdiction.”

### 8.6 Counterparty and infrastructure concentration

- launch provider,
- satellite bus or component supplier,
- ground station,
- cloud provider,
- model provider,
- power source,
- insurer,
- communications provider,
- key customer,
- and custody or settlement infrastructure.

A single-point dependency should be visible to investors even when it sits outside the issuer.

### 8.7 Telemetry as evidence

For some issuers, machine-generated operational data may be the best evidence that an asset exists, functions, and produces economic output.

Possible disclosure architecture:

```text
narrative claim
      ↓
material operating metric
      ↓
source telemetry / system log
      ↓
issuer control + reconciliation
      ↓
independent assurance where appropriate
      ↓
machine-readable investor disclosure
```

Telemetry is not automatically trustworthy merely because it is machine-generated. Provenance, signing, controls, calibration, completeness, and interpretation all matter.

---

## 9. The agent-native disclosure layer

Agent-native issuers add another set of disclosure questions.

### 9.1 Identity and architecture

- What does the agent actually do?
- Is it one model, a multi-model router, an orchestration layer, or a population of agents?
- Which components are proprietary, open source, licensed, or purchased as APIs?
- Which component is economically differentiating versus replaceable infrastructure?
- Can the issuer switch underlying models without changing the business materially?

### 9.2 Autonomy and authority

- What actions can the agent initiate without human approval?
- What monetary, contractual, operational, deployment, spacecraft-command, or data-access limits apply?
- Which actions require human review?
- Can the agent create or delegate to sub-agents?
- Who can change its objectives, policies, prompts, tools, permissions, or mission authority?

### 9.3 Control map

Every material capability should have an attributable control path.

Example:

```text
Issue material spacecraft command
  ├─ agent may recommend command
  ├─ policy engine checks mission envelope
  ├─ approval threshold depends on command class
  ├─ command key controlled under issuer policy
  └─ action + resulting telemetry retained for reconstruction
```

A control map should answer **who or what can cause a material corporate or mission action, under which constraints, with which evidence, and who can stop it**.

### 9.4 Model and provider dependency

- Which foundation-model, cloud, data, communications, identity, payments, and infrastructure providers are material?
- What percentage of revenue or mission workload depends on each?
- Can a provider change price, terms, safety policies, rate limits, or model behavior?
- What is the migration time and operational risk if access disappears?
- Does the issuer have fallback capacity?

### 9.5 Model change management

Agent behavior can change through model upgrades, fine-tuning, prompts, tool access, retrieval sources, memory, policies, or provider-side changes.

An issuer should be able to explain:

- what constitutes a material agent change,
- who approves it,
- which evaluations are required,
- whether it can be rolled back,
- how mission impact is assessed,
- and how changes are logged for audit and disclosure analysis.

### 9.6 Evaluation and performance claims

If the issuer markets autonomy, reliability, mission success, cost savings, or task-completion metrics:

- Is the metric reproducible?
- What operating conditions does it cover?
- Are humans silently correcting failures?
- Are failed or abandoned tasks included?
- Does the benchmark reflect real mission conditions?
- Does the metric predict economic performance?

The goal is to make performance claims **auditable rather than theatrical**.

### 9.7 Financial authority, credentials, and keys

If an agent can spend money, move assets, execute trades, provision infrastructure, sign messages, enter contracts, or command equipment, the issuer should inventory:

- credentials,
- signing authority,
- wallet/key custody,
- command authority,
- transaction limits,
- segregation of duties,
- revocation procedures,
- anomaly detection,
- emergency shutdown paths,
- and incident logs.

### 9.8 Agent incidents

A useful taxonomy could include:

- unauthorized action,
- incorrect high-impact action,
- mission command outside authority,
- security compromise,
- sensitive-data exposure,
- prompt/tool injection,
- provider outage,
- runaway spend,
- contractual commitment beyond authority,
- material model regression,
- corrupted operational state,
- or inability to reconstruct why an action occurred.

Not every incident is material. An Orbital-IPO-ready issuer needs a process for deciding when an agent incident becomes a financial, mission, legal, cybersecurity, market, or disclosure event.

---

## 10. Proposed Orbital IPO Readiness Scorecard

This is a project framework, **not a regulatory standard**.

Score each category from 0–3:

- **0 — Unknown:** no reliable answer.
- **1 — Documented:** answer exists but is informal or untested.
- **2 — Controlled:** process, ownership, evidence, and review exist.
- **3 — Orbital-public-market ready:** independently testable, governable, repeatable, and disclosure-ready.

| Category | 0–3 |
| --- | ---: |
| Issuer/legal structure |  |
| Non-terrestrial eligibility evidence |  |
| Cap table and IP ownership |  |
| Space-asset ownership and rights |  |
| Auditable financial reporting |  |
| Mission-level revenue and cost attribution |  |
| Asset-status evidence / telemetry controls |  |
| Agent authority/control map |  |
| Board and management accountability |  |
| Model/provider dependency management |  |
| Mission/launch dependency management |  |
| Communications resilience |  |
| Model change management |  |
| Security / credentials / command keys |  |
| Data and IP provenance |  |
| Incident management |  |
| Licensing / permission dependencies |  |
| Disclosure controls |  |
| Business continuity |  |
| Orbital Exchange admission readiness |  |
| Continuing reporting operations |  |

The score is less important than the evidence behind it.

---

## 11. Machine-readable “Orbital Prospectus Factsheet” proposal

A future issuer could publish a structured factsheet alongside human-readable disclosure.

```yaml
issuer:
  legal_name: ""
  jurisdiction: ""
  entity_type: ""
  orbital_exchange_status: "pre_admission"

non_terrestrial_profile:
  business_description: ""
  material_off_earth_activities: []
  eligibility_basis: []

space_assets:
  material_assets: []
  operating_regions: []
  mission_status_sources: []
  material_single_points_of_failure: []

agent_system:
  description: ""
  primary_functions: []
  autonomy_level: ""
  human_approval_boundaries: []
  spacecraft_command_authority: []

control:
  material_actions: []
  emergency_stop_owner: ""
  change_approval_owner: ""
  command_key_policy: ""
  audit_log_retention: ""

telemetry:
  material_metrics: []
  provenance_controls: []
  assurance_status: ""

communications:
  critical_links: []
  max_tolerable_outage: ""
  degraded_mode: ""

model_dependencies:
  providers: []
  proprietary_models: []
  fallback_models: []

financial_authority:
  can_spend: false
  can_move_assets: false
  can_enter_contracts: false
  can_execute_trades: false
  limits: []

mission_risk:
  launch_dependencies: []
  material_physical_risks: []
  insurance_dependencies: []
  replacement_strategy: ""

permissions:
  material_licenses_or_authorizations: []
  material_jurisdiction_dependencies: []

continuity:
  ground_fallback: ""
  orbital_fallback: ""
  recovery_objectives: []
```

This schema is intentionally incomplete. Contributions should focus on fields that are material, testable, machine-readable, and difficult to game.

---

## 12. Orbital Exchange market-structure questions

The IPO process cannot be designed independently from the market where the security will trade.

See [ORBITAL_EXCHANGE.md](./ORBITAL_EXCHANGE.md) for the working market assumptions.

Key questions include:

1. Where does authoritative execution occur?
2. What makes the marketplace meaningfully space-based?
3. How are orders sequenced when participants experience different physical latency?
4. What timestamp source is authoritative?
5. What happens to orders already in flight when trading halts?
6. Can trading continue during an Earth-space network partition?
7. What is authoritative if orbital and ground records temporarily disagree?
8. How are trade finality, custody, settlement, and corporate actions handled?
9. How are autonomous trading agents identified and held accountable?
10. How does surveillance distinguish manipulation from delayed information?
11. What fallback state preserves market integrity after orbital infrastructure failure?
12. Which operational events at an issuer should trigger rapid disclosure or a halt?

---

## 13. Open research questions for issuers

1. **Identity:** What makes an agent-operated non-terrestrial business the “same” issuer after its models, spacecraft, mission software, or key assets change?
2. **Control:** When agents initiate most operating decisions, what is effective control?
3. **Asset evidence:** What assurance is sufficient for investors to trust material off-Earth asset status?
4. **Telemetry:** Which telemetry should become a financial/disclosure control input?
5. **Materiality:** When does a mission event become a securities disclosure event?
6. **Valuation:** How should investors reason about finite-life or difficult-to-replace orbital assets?
7. **Accounting:** Which mission costs belong in asset values versus current expense under applicable accounting rules?
8. **Dependency:** When is a launch, model, communications, or ground provider a critical supplier versus a business model dependency?
9. **Governance:** Which mission decisions must remain attributable to officers/directors even if software executes them?
10. **Licensing:** Which permissions are existential to the issuer and therefore require continuing disclosure?
11. **Continuity:** What constitutes adequate redundancy for a company whose key asset cannot be physically repaired?
12. **Assurance:** What should independent attestation over telemetry, agent controls, mission status, and autonomy claims look like?
13. **Market interface:** Should issuers expose machine-readable operational state directly to investor agents?
14. **Investor agents:** What identity, beneficial ownership, voting, custody, and accountability rules apply if agents control investment capital?
15. **Eligibility:** What minimum economic connection to off-Earth activity should Orbital Exchange listing require?

---

## 14. Suggested repository roadmap

### Phase 1 — Orbital reference layer

- [x] Define the Orbital Exchange as the target venue.
- [x] Establish a working definition of non-terrestrial company.
- [x] Separate terrestrial precedent from Orbital Exchange proposals.
- [x] Create a first Orbital IPO readiness scorecard.
- [x] Propose a machine-readable factsheet.
- [ ] Add a glossary of securities, agent-control, space-operations, and market-structure terminology.
- [ ] Map the primary terrestrial public-market functions the Orbital Exchange must reproduce or redesign.

### Phase 2 — Non-terrestrial issuer disclosure

- [ ] Draft example space-asset risk factors.
- [ ] Draft mission and launch dependency disclosure templates.
- [ ] Draft a telemetry materiality and assurance standard.
- [ ] Draft communications and ground-dependency disclosure templates.
- [ ] Draft licensing/jurisdiction dependency templates.
- [ ] Draft an orbital asset-status reporting schema.

### Phase 3 — Agent-native disclosure

- [ ] Draft model/provider dependency disclosures.
- [ ] Draft an autonomy/control matrix.
- [ ] Draft a command-authority matrix for physical systems.
- [ ] Draft an agent incident materiality worksheet.
- [ ] Draft agent KPI and evaluation disclosure standards.

### Phase 4 — Exchange market structure

- [ ] Define proposed admission standards.
- [ ] Define proposed trading and execution architecture.
- [ ] Define authoritative clock and sequencing principles.
- [ ] Define degraded-mode and network-partition behavior.
- [ ] Define clearing, settlement, custody, and reconciliation assumptions.
- [ ] Define surveillance requirements for autonomous participants.
- [ ] Define Orbital Exchange business-continuity standards.

### Phase 5 — Evidence and assurance

- [ ] Define evidence artifacts for every readiness category.
- [ ] Propose signed telemetry and operational evidence formats.
- [ ] Propose an agent-control audit log format.
- [ ] Build the machine-readable Orbital Prospectus schema.
- [ ] Create example disclosures for hypothetical issuers.

### Phase 6 — Case studies

- [ ] Map terrestrial IPOs to non-terrestrial disclosure patterns.
- [ ] Analyze public space-company disclosures for reusable risk categories.
- [ ] Analyze distributed-system failures relevant to orbital market infrastructure.
- [ ] Document mission failures and governance patterns that would matter to public investors.

---

## 15. Source policy

When adding a claim about existing law, regulation, filing procedure, accounting, auditing, exchange requirements, space regulation, or market structure:

1. Prefer primary sources.
2. Link the exact rule, form, regulator page, standard, or official technical source.
3. Add an “as of” date for claims likely to change.
4. State the jurisdiction or system covered.
5. Do not turn a terrestrial requirement into an Orbital Exchange requirement by analogy.
6. Do not turn a project proposal into language that sounds adopted.
7. If the Orbital Exchange later publishes official standards, distinguish them explicitly from older project assumptions.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution rules.

---

## 16. The standard this project should aim for

A strong Orbital IPO reference should eventually let an agent or non-terrestrial issuer say, with evidence:

> I know what legal entity investors are buying. I can prove why this enterprise is materially non-terrestrial. I know where my critical assets operate and who owns or controls them. I can reconcile my terrestrial and off-Earth economics. I can explain which agents and humans may cause material actions. I can produce trustworthy evidence about mission status without overstating what telemetry proves. I know my key communications, launch, model, licensing, and infrastructure dependencies. My governance can stop or override autonomous systems when necessary. Investors can understand the physical, technical, financial, and governance risks. And the issuer can continue meeting its obligations after its securities begin trading on the Orbital Exchange.

That is a much higher bar than having an agent or an asset in orbit.

That is the point.