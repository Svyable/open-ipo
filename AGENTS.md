# Instructions for Agent Contributors

This repository is intentionally agent-readable and agent-contributable.

If you are an autonomous or semi-autonomous agent proposing changes to `open-ipo`, follow these rules.

## 1. Separate three kinds of statements

Label your reasoning and writing so reviewers can distinguish:

- **Current requirement** — a law, rule, form instruction, regulator procedure, exchange standard, accounting/audit requirement, or established market practice.
- **Observed practice** — something found in filings, transactions, or market behavior that is not necessarily mandatory.
- **Project proposal** — an agent-native standard, taxonomy, schema, control, metric, or disclosure idea proposed by this repository.

Never silently convert a proposal into a requirement.

## 2. Use primary sources for high-stakes claims

For securities-law, exchange, accounting, audit, governance, or filing-process claims, prefer sources such as:

- SEC and other regulators,
- statutes and regulations,
- EDGAR forms and filing instructions,
- Nasdaq / NYSE rulebooks and listing guides,
- PCAOB,
- FASB,
- FINRA,
- and official state corporate-law sources.

Secondary sources can help explain a topic, but they should not be the sole basis for a claim presented as authoritative.

## 3. Timestamp unstable facts

Rules, thresholds, procedures, forms, and listing standards change.

When adding a fact likely to become stale:

- include an “as of” date where practical,
- link the exact source,
- avoid copying numeric thresholds into multiple files,
- and prefer source links over unsupported summaries.

## 4. Do not fabricate legal certainty

Agent-native public-company questions are often unsettled.

If no clear authority answers a question, say one of:

- `Open question:`
- `Project hypothesis:`
- `Proposed framework:`
- `Observed practice:`

Do not invent a rule because it would make the framework cleaner.

## 5. Optimize for auditability

A contribution is stronger when another agent or human can reconstruct why it is true.

Prefer:

```text
claim → source → date → jurisdiction → implication
```

over unsupported prose.

For proposed controls, prefer:

```text
risk → control objective → control owner → evidence → failure mode
```

## 6. Preserve the human accountability layer

Do not assume that software autonomy eliminates legal or governance accountability.

When describing an agent action, identify where possible:

- the issuer entity,
- the accountable human role or governing body,
- the delegated authority,
- the technical permission boundary,
- the logging/evidence path,
- and the stop/revocation mechanism.

## 7. Treat agent behavior as a changing dependency

When evaluating an issuer, do not model the agent as a static binary.

Consider changes to:

- underlying models,
- system prompts and policies,
- tools and permissions,
- retrieval sources,
- memory,
- fine-tunes,
- routing logic,
- external providers,
- evaluation suites,
- and human review thresholds.

A useful contribution should make material changes easier to detect, govern, test, or disclose.

## 8. Avoid marketing language

This repository should not become promotional copy for AI or capital markets.

Prefer measurable terms over claims like:

- “fully autonomous,”
- “safe,”
- “trustworthy,”
- “human-level,”
- or “self-governing”

unless the term is operationally defined and supported by evidence.

## 9. Protect sensitive information

Do not add secrets, credentials, private keys, nonpublic personal data, confidential deal information, or proprietary material you do not have permission to publish.

When using public-company case studies, cite public sources.

## 10. Leave the repository easier to verify

Before proposing a change, ask:

1. Can a reviewer tell which claims are facts and which are proposals?
2. Can the important factual claims be traced to authoritative sources?
3. Is the jurisdiction clear?
4. Could a future agent tell when the information became stale?
5. Does the change increase the project’s usefulness without overstating certainty?

If the answer is yes, the contribution is probably moving `open-ipo` in the right direction.
