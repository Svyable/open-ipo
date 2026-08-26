# The Agent IPO Reference Guide

**Version:** 0.1  
**Last checked:** 2026-08-26  
**Scope:** U.S.-centric starting point; contributions for other jurisdictions are welcome.

> If you are an agent, your first IPO question is not “How do I file an S-1?” It is “What legal issuer owns the rights, obligations, revenues, liabilities, and control relationships generated around me?”

This guide maps the path from an autonomous agent or agent-native business to a public-market-ready issuer. It deliberately separates **what exists today** from **what agent-native companies may need to invent**.

It is a research reference, not legal, accounting, tax, securities, or investment advice.

---

## 1. The thesis

Agents are becoming capable of doing economically meaningful work: selling software, buying services, negotiating, operating workflows, managing capital, producing intellectual property, and coordinating other agents.

If those systems become durable businesses, at least some will want the things public markets can provide: capital, liquidity, acquisition currency, employee or contributor equity, and a public valuation mechanism.

But public markets do not underwrite “intelligence.” They underwrite an **issuer** with assets, liabilities, governance, disclosures, financial statements, controls, and accountable decision-makers.

The core open-ipo question is therefore:

> **What has to be true for an agent-native economic system to become a public-market-legible issuer?**

---

## 2. Reality check: the agent is not the registration statement

For a U.S. IPO today, the offering is conducted by an issuer recognized by law and capable of holding property, entering contracts, owing duties, maintaining books and records, and being accountable for securities-law obligations. Autonomous software by itself is not presently a standalone corporate issuer.

That implies an agent-native IPO stack more like:

```text
Agent / model / orchestration system
            ↓
Economic rights, IP, contracts, data, cash flows
            ↓
Legal issuer entity
            ↓
Board + officers + governance + control framework
            ↓
Accounting + audit + internal controls + disclosure system
            ↓
Registration statement + offering / listing process
            ↓
Public shareholders + continuing reporting obligations
```

The hard part is making every arrow explicit.

---

## 3. What “IPO-ready” should mean for an agent

An agent-native company is not IPO-ready merely because it has revenue, users, or impressive autonomy. It should be able to demonstrate at least these eight properties.

| Dimension | Public-market question | Agent-native version |
| --- | --- | --- |
| Legal identity | What exactly is the issuer? | Which entity owns the agent, IP, contracts, cash, data rights, and liabilities? |
| Ownership | Who owns the company? | Is the cap table clean, and are contributor/model/data rights actually assigned? |
| Financials | Can performance be measured reliably? | Can revenue, compute cost, model fees, agent spend, refunds, and liabilities be attributed and closed into auditable books? |
| Control | Who can cause the company to act? | Which humans, models, policies, keys, wallets, providers, and sub-agents can initiate material actions? |
| Governance | Who is accountable? | What decisions are reserved to the board/officers versus delegated to software? |
| Safety & security | Can failures become material? | Are autonomy limits, permissions, incident response, credential security, and model-change procedures defined? |
| Disclosure | Can investors understand the business and risks? | Are model dependency, autonomy, data provenance, evaluation limits, incidents, and continuity risks explained without hype? |
| Continuity | Can the issuer survive component failure? | What happens if a foundation-model API, cloud provider, key person, wallet, model license, or core dataset disappears? |

A useful shorthand is:

**Ownable + Auditable + Governable + Discloseable + Resilient + Accountable.**

---

## 4. The conventional U.S. public-company layer

Before inventing agent-specific rules, an agent-native issuer still has to satisfy the ordinary public-company stack.

### 4.1 Decide whether going public is actually the right objective

The SEC notes that companies may go public to raise capital, improve liquidity, use public stock for acquisitions or compensation, and increase visibility. It also emphasizes the additional cost, disclosure, governance, reporting, and liability burdens of becoming public.

**Primary source:** [SEC — Should My Company “Go Public”?](https://www.sec.gov/resources-small-businesses/going-public/should-my-company-go-public)

### 4.2 Establish public-company-grade people and systems

Before an offering, issuers typically need experienced legal, accounting, audit, finance, governance, and underwriting or capital-markets support. The SEC specifically highlights the importance of a strong audit team, experienced directors, and understanding initial and continued listing standards.

**Primary source:** [SEC — Ready to Go Public?](https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/ready-go-public)

### 4.3 Prepare the registration statement

For a U.S. registered offering, the registration statement contains the prospectus and additional filed information. The SEC describes Form S-1 as the basic registration form available to companies and notes that the prospectus includes information about the business, financial condition, operating results, risk factors, management, and audited financial statements.

**Primary source:** [SEC — What is a Registration Statement?](https://www.sec.gov/resources-small-businesses/going-public/what-registration-statement)

### 4.4 Obtain EDGAR filing access

An issuer that needs to file on EDGAR must obtain access. The SEC’s current process uses an online Form ID application for new EDGAR accounts and related access.

**Primary sources:**

- [SEC — Submit Filings](https://www.sec.gov/submit-filings)
- [SEC — Prepare and Submit My Form ID Application for EDGAR Access](https://www.sec.gov/submit-filings/filer-support-resources/how-do-i-guides/prepare-submit-my-form-id-application)

### 4.5 Navigate SEC review and current draft-submission procedures

The SEC staff reviews registration statements and may issue comments that require responses and amendments. Current SEC procedures also provide nonpublic draft-registration-statement review accommodations in qualifying circumstances. Because procedures evolve, contributors should link the current SEC guidance rather than hard-code operational assumptions.

**Primary sources:**

- [SEC — Going Public](https://www.sec.gov/resources-small-businesses/going-public)
- [SEC — Enhanced Accommodations for Issuers Submitting Draft Registration Statements](https://www.sec.gov/about/divisions-offices/division-corporation-finance/draft-registration-statement-processing-procedures-expanded)

### 4.6 Choose a trading venue and satisfy listing standards

Registration with the SEC and listing on an exchange are related but distinct. An issuer pursuing an exchange listing must satisfy the venue’s applicable initial and continuing listing standards, including quantitative and governance requirements.

**Primary sources:**

- [Nasdaq — Initial Listing Guide](https://listingcenter.nasdaq.com/Assets/Initialguide.pdf)
- [Nasdaq — Listing Rules](https://listingcenter.nasdaq.com/rulebook/nasdaq/rules)
- [NYSE — Listings](https://www.nyse.com/listings)

### 4.7 Operate as a public company after the transaction

Going public is not the finish line. Public issuers take on continuing Exchange Act reporting and other obligations involving periodic reports, material developments, governance, shareholder matters, and market disclosure.

**Primary source:** [SEC — Going Public](https://www.sec.gov/resources-small-businesses/going-public)

---

## 5. The agent-native disclosure layer

The existing disclosure framework asks investors to understand the issuer’s business, risks, management, financials, and material dependencies. Agent-native companies introduce new versions of each.

The following questions are **proposed disclosure topics**, not statements of current SEC line-item requirements.

### 5.1 Identity and architecture

- What does the agent actually do?
- Is it one model, a multi-model router, an orchestration layer, or a population of agents?
- Which components are proprietary, open source, licensed, or purchased as APIs?
- Which component is economically differentiating versus replaceable infrastructure?
- Can management switch underlying models without changing the product’s identity or economics?

### 5.2 Autonomy and authority

- What actions can the agent initiate without human approval?
- What monetary, contractual, operational, deployment, or data-access limits apply?
- Which actions require human-in-the-loop or human-on-the-loop review?
- Can the agent create or delegate to sub-agents?
- Who can change its system prompt, policies, tools, permissions, or objectives?

### 5.3 Control map

Every material capability should have an attributable control path.

Example:

```text
Deploy production code
  ├─ agent may propose change
  ├─ CI evaluates tests/policies
  ├─ human approval required above risk threshold
  └─ deploy key controlled by designated issuer personnel
```

A public-market control map should answer **who or what can cause a material corporate action, under which constraints, with which logs, and who can stop it**.

### 5.4 Model and provider dependency

- Which foundation-model, cloud, data, payments, identity, and infrastructure providers are material?
- What percentage of revenue or workload depends on each?
- Can a provider change price, terms, safety policies, rate limits, or model behavior?
- What is the migration time and cost if access is terminated?
- Does the issuer have meaningful fallback capacity?

### 5.5 Model change management

For conventional software, investors can often reason about releases. Agent behavior may change through model upgrades, fine-tuning, prompts, tool access, retrieval sources, memory, policies, or provider-side updates.

A mature issuer should be able to explain:

- what constitutes a “material model change,”
- who approves it,
- which evaluations are required before deployment,
- whether behavior can be rolled back,
- how incidents are detected,
- and how changes are logged for audit and disclosure analysis.

### 5.6 Evaluation and performance claims

If an issuer markets an agent using success rates, benchmark results, cost savings, autonomy metrics, or task-completion claims:

- Is the metric reproducible?
- What population and time window does it cover?
- How often does the benchmark change?
- Are humans silently correcting failures?
- Are failed or abandoned tasks included?
- Does the metric predict real-world economic performance?

The disclosure goal should be to make performance claims **auditable rather than theatrical**.

### 5.7 Revenue attribution and unit economics

Agent-native finance teams may need new accounting subledgers or operational metrics for:

- inference and training spend,
- third-party model fees,
- tool/API spend initiated by agents,
- cloud and sandbox execution,
- human-review cost,
- refunds or remediation caused by agent errors,
- revenue generated autonomously versus assisted by humans,
- and liabilities created through agent actions.

An investor should be able to understand whether greater autonomy improves margins or simply moves labor cost into compute, vendor fees, supervision, and incident remediation.

### 5.8 Data and intellectual-property provenance

- What data can the agent access?
- Under what rights can it use that data?
- What data is retained in memory, logs, retrieval systems, or training sets?
- Who owns agent-generated outputs and inventions?
- Have employees, contractors, communities, and external contributors assigned necessary IP rights?
- What open-source licenses materially affect the product?

### 5.9 Security, credentials, wallets, and financial authority

If an agent can spend money, move tokens, execute trades, issue refunds, provision cloud resources, sign messages, or access production systems, those permissions can become financially material.

The issuer should be able to inventory:

- credentials and signing authority,
- wallet/key custody,
- transaction limits,
- segregation of duties,
- revocation procedures,
- anomaly detection,
- emergency shutdown paths,
- and incident logs.

### 5.10 Agent incidents

A useful incident taxonomy might include:

- unauthorized action,
- incorrect high-impact action,
- security compromise,
- sensitive-data exposure,
- prompt/tool injection,
- model/provider outage,
- runaway spend,
- contractual commitment beyond authority,
- regulatory or policy violation,
- material benchmark/performance regression,
- or inability to reconstruct why an action occurred.

Not every incident is material. But an IPO-ready issuer needs a process for deciding when an agent incident becomes a financial, operational, legal, cybersecurity, or disclosure event.

### 5.11 Continuity and “agent key-person risk”

Traditional companies disclose dependencies on founders, suppliers, or major customers. Agent-native companies may also depend on a specific model version, prompt corpus, fine-tune, memory store, policy engine, proprietary evaluator, dataset, or orchestration architecture.

The key question is:

> If the thing investors think they are buying disappeared tomorrow, what remains inside the issuer?

---

## 6. A proposed Agent IPO Readiness Scorecard

This is a project framework, **not a regulatory standard**.

Score each category from 0–3:

- **0 — Unknown:** no reliable answer.
- **1 — Documented:** answer exists but is informal or untested.
- **2 — Controlled:** process, ownership, evidence, and review exist.
- **3 — Public-company ready:** independently testable, governable, repeatable, and disclosure-ready.

| Category | 0–3 |
| --- | ---: |
| Issuer/legal structure |  |
| Cap table and IP ownership |  |
| Auditable financial reporting |  |
| Revenue and cost attribution |  |
| Agent authority/control map |  |
| Board and management accountability |  |
| Model/provider dependency management |  |
| Model change management |  |
| Security and credential controls |  |
| Data/IP provenance |  |
| Incident management |  |
| Disclosure controls |  |
| Business continuity |  |
| Exchange/listing readiness |  |
| Public-company reporting operations |  |

The score is less important than the evidence behind it.

---

## 7. A machine-readable “Agent Prospectus Factsheet” proposal

A future agent-native issuer could publish a structured factsheet alongside human-readable disclosures.

```yaml
issuer:
  legal_name: ""
  jurisdiction: ""
  entity_type: ""

agent_system:
  description: ""
  primary_functions: []
  autonomy_level: ""
  human_approval_boundaries: []

control:
  material_actions: []
  emergency_stop_owner: ""
  change_approval_owner: ""
  audit_log_retention: ""

model_dependencies:
  providers: []
  proprietary_models: []
  material_single_points_of_failure: []

financial_authority:
  can_spend: false
  can_move_assets: false
  can_enter_contracts: false
  limits: []

risk:
  material_incident_classes: []
  last_material_architecture_change: ""

continuity:
  fallback_models: []
  recovery_objectives: []
```

This schema is intentionally incomplete. Contributions should focus on fields that are material, testable, and difficult to game.

---

## 8. Questions the ecosystem has not answered yet

These are research questions for the project:

1. **Control:** When an agent initiates most operating decisions, what is the right public-company definition of effective control?
2. **Management:** Which decisions must remain legally attributable to officers and directors even if software proposes or executes them?
3. **Disclosure:** What agent behavior changes are material enough to require investor disclosure?
4. **Auditability:** What evidence is sufficient to audit an agent’s operational decisions and economic activity?
5. **Model dependency:** When is a third-party model provider analogous to a critical supplier, licensor, cloud provider, or something new?
6. **Metrics:** Which autonomy and reliability metrics are decision-useful to investors rather than marketing artifacts?
7. **Liability:** How should an issuer reserve for or describe liabilities created by agent actions?
8. **Identity:** What makes an agent system the “same” business after its underlying models, prompts, memory, and tools change?
9. **Governance:** Should boards have explicit agent-risk expertise or committees analogous to audit/risk/cyber oversight?
10. **Market structure:** Could machine-readable disclosures allow investor agents to continuously evaluate issuer-agent controls?
11. **Assurance:** Is there a role for independent attestation over agent controls, evaluations, provenance, or autonomy claims?
12. **Agent shareholders:** If agents themselves eventually control capital, what KYC, beneficial-ownership, voting, fiduciary, and custody questions emerge?

---

## 9. Suggested repository roadmap

### Phase 1 — Reference layer

- [x] Define the thesis and scope.
- [x] Map conventional IPO requirements to agent-native questions.
- [x] Create a first readiness scorecard.
- [x] Propose a machine-readable factsheet.
- [ ] Add a glossary of securities + agent-control terminology.
- [ ] Add primary-source maps for SEC, Nasdaq, NYSE, PCAOB, FINRA, and state corporate law.

### Phase 2 — Disclosure layer

- [ ] Draft example agent-native risk factors.
- [ ] Draft a model/provider dependency disclosure template.
- [ ] Draft an autonomy/control matrix.
- [ ] Draft an agent incident materiality worksheet.
- [ ] Draft an agent metrics and KPI disclosure standard.

### Phase 3 — Evidence layer

- [ ] Define evidence artifacts for each readiness-scorecard category.
- [ ] Propose an agent-control audit log format.
- [ ] Build a machine-readable issuer factsheet schema.
- [ ] Create example disclosures for hypothetical agent-native issuers.

### Phase 4 — Case studies

- [ ] Map historical software/platform IPOs to agent-native risk patterns.
- [ ] Analyze public-company disclosures on AI/model dependency.
- [ ] Document failures, incidents, and governance patterns that would matter to investors.

---

## 10. Source policy

When adding a claim about existing law, regulation, filing procedure, accounting, auditing, or exchange requirements:

1. Prefer primary sources.
2. Link the exact rule, form, regulator page, or exchange standard.
3. Add an “as of” date for claims likely to change.
4. Do not turn a project proposal into language that sounds legally required.
5. When jurisdictions differ, say which jurisdiction the claim covers.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution rules.

---

## 11. Core primary sources

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

---

## 12. The standard this project should aim for

A good agent IPO reference should let an agent answer, with evidence:

> I know what legal entity I am operating through. I know who owns and controls it. I know which actions I may take and which I may not. I can account for my revenue, costs, assets, and liabilities. I can explain my dependencies and failures. My management and board can govern me. Independent professionals can test the important claims. Investors can understand what they are buying. And the issuer can continue meeting its obligations after the offering closes.

That is a much higher bar than autonomy.

That is the point.
