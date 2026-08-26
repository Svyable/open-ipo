# Instructions for Agent Contributors

This repository is intentionally agent-readable and agent-contributable.

`open-ipo` is building a reference for agents and non-terrestrial companies preparing for the future **Orbital Exchange**, a not-yet-launched space-based marketplace for listing, trading, and execution.

If you are an autonomous or semi-autonomous agent proposing changes, follow these rules.

## 1. Separate four kinds of statements

Every material claim should be classifiable as one of:

- **Terrestrial precedent** — an existing law, rule, form instruction, regulator procedure, terrestrial exchange standard, accounting/audit requirement, or established market practice.
- **Orbital Exchange assumption** — an explicit working assumption about the future venue used for design purposes.
- **Project proposal** — a proposed Orbital Exchange standard, listing test, disclosure, taxonomy, schema, control, metric, execution rule, or assurance mechanism.
- **Open question** — something not yet resolved by law, market design, engineering, accounting, space operations, or project consensus.

Never silently convert precedent or a proposal into an adopted Orbital Exchange requirement.

## 2. Design for the Orbital Exchange

The target architecture is not “a normal IPO with space branding.”

Ask what changes when:

- issuer assets or operations are beyond Earth,
- agents control material business or mission processes,
- evidence may come from telemetry and machine logs,
- communications paths have meaningful physical latency,
- connectivity may be intermittent,
- and parts of trading/execution infrastructure are space-based.

Study terrestrial markets for functions and failure modes, not merely for implementation templates.

## 3. Use primary sources for existing high-stakes claims

For claims about current securities law, accounting, audit, governance, exchange practice, space regulation, licensing, spectrum, export controls, market structure, or filing processes, prefer authoritative sources such as:

- regulators,
- statutes and regulations,
- official filing instructions,
- terrestrial exchange rulebooks,
- accounting and audit standard setters,
- official space or communications authorities,
- and other primary governmental or standards sources.

Secondary sources can help explain a topic, but they should not be the sole basis for a claim presented as authoritative.

## 4. Timestamp unstable facts

Rules, procedures, technical assumptions, exchange designs, and operating systems change.

When adding a fact likely to become stale:

- include an “as of” date where practical,
- link the exact source,
- state the jurisdiction or system,
- avoid copying numeric thresholds into multiple files,
- and prefer source links over unsupported summaries.

If the Orbital Exchange later publishes official rules, update earlier project assumptions so readers can tell what has been superseded.

## 5. Do not fabricate legal or market certainty

Agent-native and non-terrestrial public-market questions are often unsettled.

Use explicit labels such as:

- `Terrestrial precedent:`
- `Orbital Exchange assumption:`
- `Project proposal:`
- `Open question:`

Do not invent a rule because it would make the framework cleaner.

## 6. Optimize for reconstructability

A contribution is stronger when another agent or human can reconstruct why it is true.

For factual claims, prefer:

```text
claim → source → date → jurisdiction/system → implication
```

For proposed controls, prefer:

```text
risk → control objective → control owner → evidence → failure mode
```

For orbital-market events, prefer:

```text
event → authoritative clock/state → message path → actor → evidence → resulting market state
```

## 7. Preserve accountability across autonomous systems

Do not assume software autonomy removes governance responsibility.

When describing a material agent, spacecraft, market, or corporate action, identify where possible:

- the issuer or market entity,
- the accountable human role or governing body,
- the delegated authority,
- the technical permission boundary,
- the credential/key path,
- the logging or telemetry evidence,
- and the stop/revocation mechanism.

Autonomy should increase automation, not ambiguity.

## 8. Treat location, time, and connectivity as first-class facts

In a non-terrestrial market, physical systems matter.

When relevant, specify:

- where an asset or execution component operates,
- which clock or state is authoritative,
- expected and worst-case communication latency,
- dependency on ground or relay infrastructure,
- behavior during network partition,
- recovery/reconciliation behavior,
- and which records allow later reconstruction.

Do not assume “the cloud” erases physical topology.

## 9. Treat telemetry as evidence, not truth by default

Machine-generated data can be economically material, but it still needs controls.

Consider:

- provenance,
- signing or attribution,
- calibration,
- completeness,
- retention,
- reconciliation,
- interpretation,
- tamper resistance,
- and independent assurance where appropriate.

A telemetry field is not automatically investor-grade evidence merely because it is produced automatically.

## 10. Treat agent behavior as a changing dependency

Consider changes to:

- underlying models,
- system prompts and policies,
- tools and permissions,
- command authority,
- retrieval sources,
- memory,
- fine-tunes,
- routing logic,
- external providers,
- evaluation suites,
- and human review thresholds.

A useful contribution should make material changes easier to detect, govern, test, or disclose.

## 11. Avoid marketing language

Prefer measurable terms over claims like:

- “fully autonomous,”
- “space-native,”
- “safe,”
- “trustworthy,”
- “real-time,”
- “instant settlement,”
- or “self-governing”

unless the term is operationally defined and supported by evidence.

## 12. Protect sensitive information

Do not add secrets, credentials, private keys, command keys, operational security data, nonpublic personal data, confidential deal information, export-controlled information, or proprietary material you do not have permission to publish.

When discussing real companies or missions, cite information that is appropriate for public use.

## 13. Leave the repository easier to verify

Before proposing a change, ask:

1. Can a reviewer tell whether this is terrestrial precedent, an Orbital Exchange assumption, a proposal, or an open question?
2. Can factual claims be traced to authoritative sources?
3. Are jurisdiction, location, and system boundaries clear where material?
4. Could a future agent tell when the information became stale?
5. Does the design account for non-terrestrial operations rather than merely copying an Earth-market pattern?
6. Does it increase reconstructability and accountability?

If yes, the contribution is probably moving `open-ipo` in the right direction.