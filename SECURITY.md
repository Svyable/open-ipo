# Security Policy and Threat Model

**Status:** project security policy  
**Scope:** `open-ipo` repository, GitHub-native intake, schemas, workflows, and public evidence references

`open-ipo` accepts machine-generated and human-generated public input about autonomous systems, non-terrestrial operations, financial authority, and future listing readiness.

That makes the repository a security boundary even before any exchange exists.

## 1. Security goals

The project should preserve:

1. **Repository integrity** — untrusted contributions must not execute with privileged repository authority.
2. **Semantic integrity** — applicant claims must not be upgraded into verified facts by formatting, automation, or repetition.
3. **Evidence integrity** — provenance, freshness, uncertainty, and attestation state must remain visible.
4. **Credential safety** — no workflow should request, store, or expose operational secrets unnecessarily.
5. **Historical integrity** — public records should remain attributable and reconstructable.
6. **Failure visibility** — invalid, stale, compromised, or ambiguous state should fail explicitly rather than look healthy.

## 2. GitHub-native trust model

The repository treats these sources differently.

### Trusted repository code

Code already merged into the trusted base branch may define:

- schemas,
- validators,
- deterministic readiness rules,
- workflow behavior,
- comment rendering.

Trusted does not mean bug-free. It means eligible to execute under repository-controlled CI permissions.

### Untrusted pull-request content

Everything supplied by an external PR is untrusted, including:

- JSON listing intents,
- Markdown,
- filenames,
- branch names,
- generated text,
- links,
- code changes.

Applicant content should be processed as **data**, not executed.

### External evidence

Telemetry references, URLs, attestations, logs, public filings, and other evidence are untrusted until their provenance and integrity are evaluated.

A link existing does not establish that its contents are authentic, current, complete, or relevant.

## 3. `pull_request_target` invariant

The listing-readiness feedback workflow uses `pull_request_target` so it can comment on external PRs.

That creates a powerful security boundary.

The workflow **MUST NOT**:

- check out the PR head and execute it,
- run applicant-provided scripts,
- load applicant-modified dependencies,
- source shell code from applicant content,
- treat applicant paths as trusted filesystem paths,
- expose repository secrets to applicant-controlled execution.

The safe model is:

```text
trusted workflow + trusted evaluator from base
                ↓
GitHub API fetches applicant JSON
                ↓
size/type/schema checks
                ↓
JSON parsed strictly as data
                ↓
deterministic evaluation
                ↓
sanitzed public comment + artifact
```

Any future change that checks out or executes PR-head code in this privileged workflow is a security-sensitive breaking change.

## 4. Least privilege

GitHub Actions permissions should be explicit and minimal.

Read-only validation workflows should normally use:

```yaml
permissions:
  contents: read
```

A workflow that posts PR feedback may need narrow write access to pull requests/issues, but should not receive unrelated write capabilities.

Repository secrets should not be introduced unless required by a clearly defined feature.

## 5. Applicant-input abuse controls

Public machine intake can be abused for denial of service, notification spam, parser edge cases, or oversized artifacts.

Controls should include:

- file-size limits,
- count limits per PR,
- strict JSON parsing,
- closed schemas where appropriate (`additionalProperties: false`),
- bounded rendered output,
- sanitized GitHub mentions and HTML-sensitive characters,
- deterministic error handling,
- timeouts on CI jobs.

Limits are security controls, not claims about issuer economics.

## 6. No secrets in listing intents

Do not submit:

- private keys,
- seed phrases,
- wallet credentials,
- spacecraft command credentials,
- signing secrets,
- API tokens,
- cloud secrets,
- nonpublic authentication material,
- export-controlled technical data,
- confidential financing material,
- private personal data,
- operational details that create unreasonable physical/cyber risk.

Use high-level control descriptions and public evidence references instead.

If a proposed standard appears to require secret disclosure to prove readiness, redesign the evidence model.

## 7. Evidence is not truth by default

Threats include:

- forged telemetry,
- replayed telemetry,
- stale evidence presented as current,
- compromised signing keys,
- selective disclosure,
- equivocation between audiences,
- fabricated third-party attestations,
- time/source ambiguity,
- synthetic logs generated after the fact,
- compromised autonomous agents producing plausible but false claims.

Therefore evidence models should carry, where relevant:

```text
claim
→ source/provenance
→ observation time
→ publication time
→ signer/attester
→ integrity reference
→ uncertainty
→ freshness
→ supersession state
→ verification status
```

A future evidence standard should make these fields machine-readable.

## 8. Self-report boundary

The readiness system must preserve:

```text
self-reported VERIFIED ≠ independently VERIFIED
```

Current deterministic policy caps applicant self-report rather than granting independent verification.

A future independent verification state must require an explicit evidence and attestation path.

## 9. Agent-control threats

Agent-native issuers introduce security failures that can also become disclosure or governance failures.

Examples:

- model/policy compromise,
- prompt or tool injection,
- unauthorized policy updates,
- confused-deputy actions,
- excessive financial authority,
- compromised wallets/credentials,
- autonomous contract execution outside policy,
- non-deterministic behavior after model/provider changes,
- inability to revoke an agent quickly,
- disagreement between human governance and machine authority.

The repository should treat these as issuer-control questions, not merely software bugs.

## 10. Non-terrestrial operational threats

Relevant classes include:

- loss of communication,
- stale command state,
- navigation/time-source failure,
- asset loss/degradation,
- conjunction/collision events,
- ground-segment compromise,
- launch/provider dependency,
- prolonged partition,
- physical capture/tampering,
- insufficient safe-mode autonomy,
- inability to establish authoritative asset state.

A material incident may affect both operating evidence and market disclosure.

## 11. Market-structure threats

Proposed exchange infrastructure should be evaluated for:

- split brain/double execution,
- stale market data exploitation,
- order replay,
- sequence forgery,
- clock manipulation,
- compromised participant agents,
- spoofing/layering/wash behavior,
- connectivity-transition exploitation,
- halt bypass,
- settlement inconsistency,
- corrupted recovery checkpoints.

`MARKET_STRUCTURE.md` should remain the canonical source for proposed execution invariants.

## 12. Dependency and workflow supply chain

Repository dependencies and GitHub Actions are part of the supply chain.

Prefer:

- small dependency sets,
- widely used/maintained libraries where dependencies are necessary,
- explicit version ranges or lockfiles as the project matures,
- official GitHub Actions,
- minimal workflow permissions,
- no unnecessary install-time scripts for privileged workflows.

Changes to validation dependencies should be reviewed as security-relevant because a validator sits on the trust boundary.

## 13. Vulnerability reporting

For issues that are safe to disclose publicly, open a GitHub Issue with a minimal reproducible description.

Do **not** post live secrets, credentials, exploitable spacecraft/control details, or sensitive personal information in a public Issue.

If GitHub private vulnerability reporting is enabled for the repository, use that channel for vulnerabilities whose immediate public disclosure would create material risk.

If no private channel is available, disclose only enough publicly to identify that a security-sensitive maintainer response is needed; do not publish weaponizable secrets or operational credentials.

## 14. Security changes require tests

A fix to a trust boundary should include a regression test when practical.

Examples:

- untrusted mention neutralization,
- file-size limits,
- invalid-schema fail-closed behavior,
- self-reported verification capping,
- deterministic refusal to auto-admit an issuer.

The preferred pattern is:

```text
threat → invariant → test → implementation
```

## 15. No security theater

Cryptography, blockchains, signatures, attestations, zero-knowledge systems, trusted hardware, or consensus protocols may become useful.

They should not be added as labels in place of a threat model.

A security mechanism must answer:

- what threat it addresses,
- what it assumes,
- what keys/identities it trusts,
- what failure remains possible,
- how compromise is detected/recovered,
- who remains accountable.

## 16. Foundational boundary

Security work in this repository should make one principle harder to violate:

> **Autonomy can reduce human intervention, but it must not reduce attribution, recoverability, or accountability.**
