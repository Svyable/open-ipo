# open-ipo Versioning and Compatibility

**Status:** project governance proposal  
**Applies to:** standards, schemas, deterministic policies, examples, and GitHub Releases

The repository needs a compatibility model before real prospective issuers or downstream tools depend on it.

This document defines that model.

## 1. Version the contract, not every edit

Git already versions every commit.

Artifact versions exist for a different reason: to communicate compatibility and semantic meaning to machines and external implementers.

A typo fix does not require a new schema version. A changed required field usually does.

## 2. Version form

Machine-readable contracts use:

```text
<artifact-name>.v<major>.<minor>
```

Examples:

```text
agent-listing-intent.v0.1
issuer-eligibility-assessment.v0.1
listing-readiness-response.v0.1
listing-readiness-artifact.v0.1
orbital-prospectus.v0.1
```

During major version `0`, the project is explicitly experimental. Minor releases may contain breaking changes when unavoidable, but every breaking change must be identified and accompanied by migration notes.

Once an artifact reaches `v1.0`, the project commits to stronger semantic versioning:

- major — breaking contract or meaning change,
- minor — backwards-compatible extension,
- patch — clarification/correction that does not change valid payload semantics.

JSON `schema_version` values should continue to use major/minor unless a patch-level wire distinction is genuinely necessary.

## 3. Document versions

Normative Markdown standards should carry a visible project version near the top of the file.

For pre-1.0 work:

```text
Version: 0.1
Status: draft
```

A document version changes when normative meaning changes, not merely when prose is edited.

Informative guides may use a document revision/version but do not create compatibility promises unless the catalog says otherwise.

## 4. Schema compatibility

### Compatible additions

Usually compatible:

- new optional properties,
- new optional objects whose absence preserves prior meaning,
- broader non-normative descriptions,
- additional examples,
- new enum values only when consumers are explicitly required to tolerate unknown values.

Because many JSON consumers treat enums as closed sets, **adding an enum value is not automatically compatible** in this project.

The PR must state the expected reader behavior.

### Breaking changes

Usually breaking:

- adding a required property,
- removing or renaming a property,
- narrowing a type or allowed range,
- removing an enum/state,
- changing the meaning of an existing enum/state,
- changing identity or ordering semantics,
- changing units without a new field/version,
- changing whether a field is authoritative versus advisory,
- changing verification semantics.

### Ambiguous changes

Changes to descriptions, defaults, formats, or nullable behavior can be breaking depending on consumers.

Treat ambiguity as a compatibility risk and document the decision.

## 5. Semantic compatibility matters more than parser compatibility

Two payloads can both validate against JSON Schema while having incompatible meanings.

Examples:

- redefining `READY` to mean independently verified,
- redefining an operating region,
- changing whether a timestamp establishes priority,
- changing whether degraded disclosure implies a halt.

Such changes are breaking even if the JSON shape is unchanged.

## 6. Deterministic-policy versioning

Policies such as `lib/eligibility.js` and `lib/readiness.js` are executable normative behavior.

Changes that can alter a valid applicant's:

- eligibility classification,
- readiness state,
- blocking questions,
- priority of required actions,
- verification semantics,
- state-transition routing,

must be treated as normative behavior changes even when the JSON wire schema does not change.

The standards catalog declares a version for each normative deterministic policy.

### Eligibility policy

`policy.eligibility` owns the canonical project-level eligibility decision semantics.

Readiness implementations should consume a policy-valid eligibility assessment rather than duplicate the eligibility decision tree.

### Readiness policy

`policy.readiness` may project eligibility into a backwards-compatible readiness field, but a projection must not silently become a second canonical eligibility definition.

A change such as `policy.readiness 0.1 → 0.2` may therefore be semantically material while keeping `listing-readiness-response.v0.1` parser-compatible.

Such a change requires:

- a policy-version bump,
- a migration note,
- updated examples,
- tests covering changed routing semantics.

### Provenance

`listing-readiness-artifact.v0.1` records:

- readiness-policy version,
- standards-catalog version,
- trusted source commit,
- execution context.

The response wire format does not need to duplicate those fields merely to make GitHub-native outputs reproducible.

## 7. Status lifecycle

Artifact statuses are:

```text
draft → candidate → stable → deprecated → retired
```

Transitions mean:

### `draft`

- active design,
- breaking changes expected,
- useful for experimentation,
- not a compatibility commitment.

### `candidate`

- intended for serious external testing,
- core semantics should be coherent,
- breaking changes require explicit migration notes,
- unresolved questions may remain.

### `stable`

- stable within the `open-ipo` project,
- compatibility policy applies,
- changes should normally be additive within the major version.

This does not mean legally adopted or exchange-approved.

### `deprecated`

- valid for existing users where stated,
- no longer recommended for new implementations,
- replacement must be identified.

### `retired`

- historical reference only,
- no active compatibility commitment.

## 8. Dependency-aware changes

A contract change must consider its dependents.

Examples:

```text
agent-listing-intent schema
        ↓
preliminary eligibility mapper
        ↓
eligibility assessment
        ↓
policy.eligibility
        ↓
policy.readiness
        ↓
listing-readiness response
        ↓
readiness provenance artifact
        ↓
GitHub Actions feedback
```

and:

```text
Orbital Prospectus schema
        ↓
worked issuer example
        ↓
disclosure guidance
```

`standards/catalog.json` records key dependencies and CI checks that declared paths remain valid.

## 9. Migration notes

A breaking or materially semantic policy change must explain:

1. old behavior,
2. new behavior,
3. why the change is necessary,
4. how to detect old/new outputs,
5. how to transform or regenerate data where appropriate,
6. whether both versions remain supported,
7. what happens to historical listing intents, eligibility assessments, and readiness artifacts.

Historical public records should not be rewritten merely to make them look current.

Migration notes belong in `migrations/` when they affect downstream interpretation or implementation behavior.

## 10. Historical reproducibility

The repository should preserve enough information to answer:

> What rules did this applicant encounter at that point in time?

For GitHub-native workflows, the primary reconstruction inputs are:

- submitted listing-intent payload,
- eligibility-assessment payload,
- readiness-response payload,
- readiness provenance artifact,
- policy versions,
- catalog version,
- trusted source commit,
- workflow run and attempt.

The canonical readiness workflow emits sibling eligibility, readiness, and provenance JSON artifacts so a later reader can distinguish input-derived assessment state from the readiness decision built on top of it.

## 11. GitHub Releases

A release is a coherent project snapshot, not a declaration that the future Orbital Exchange adopted the contents.

Recommended tag format:

```text
open-ipo-v0.1.0
```

Release notes should include:

- catalog version,
- normative standards and statuses,
- schema versions,
- deterministic policy versions,
- breaking changes,
- migration notes,
- security-relevant changes,
- open design questions,
- status disclaimer.

## 12. Release candidates

Before a first stable project release, pre-release tags may be used:

```text
open-ipo-v0.1.0-rc.1
```

A release candidate should freeze the intended contract long enough for external agents/contributors to test it.

## 13. No silent reinterpretation

The most important compatibility rule is:

> **Never change the meaning of a published state or field without making the semantic change visible.**

If a prior record says `READY`, future readers should be able to reconstruct what `READY` meant under that version.

If a backwards-compatible field remains in a wire schema after a stronger canonical contract is introduced, documentation must state which contract is authoritative.

That rule matters more than keeping a version number aesthetically small.
