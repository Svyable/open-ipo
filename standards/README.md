# Standards Catalog

This directory contains the machine-readable index of the `open-ipo` project contract.

## Canonical file

[`catalog.json`](./catalog.json) declares:

- canonical artifact IDs,
- artifact kinds,
- project lifecycle statuses,
- versions and wire versions,
- normative versus informative status,
- dependency relationships,
- example-to-schema conformance relationships.

The catalog validates against:

[`../schemas/standards-catalog.schema.json`](../schemas/standards-catalog.schema.json)

and is enforced by `tests/foundation.test.js`.

## Readiness reproducibility

The current deterministic listing-readiness policy is cataloged as:

```text
policy.readiness
```

The wire response remains:

```text
listing-readiness-response.v0.1
```

For historical reproducibility, GitHub-native evaluations also produce:

```text
listing-readiness-artifact.v0.1
```

That envelope binds the unchanged readiness response to:

- the cataloged readiness-policy version,
- the standards catalog version,
- the trusted evaluator source commit,
- the canonical repository identity,
- and the workflow/execution context that generated the result.

The canonical schema is:

[`../schemas/listing-readiness-artifact.schema.json`](../schemas/listing-readiness-artifact.schema.json)

and the worked example is:

[`../examples/listing-readiness-artifact.example.json`](../examples/listing-readiness-artifact.example.json).

This separation is intentional: adding provenance should not silently reinterpret or mutate the existing readiness-response contract.

## What catalog membership means

Catalog membership means an artifact is part of the declared `open-ipo` standards contract or its directly supporting governance/implementation surface.

It does **not** mean:

- the Orbital Exchange has adopted the artifact,
- the artifact is legally sufficient,
- a regulator has approved it,
- an issuer conforming to it is eligible to offer/list securities.

## Update rule

When a material artifact is added, renamed, versioned, deprecated, or retired, update `catalog.json` in the same pull request.

When a schema changes, also check:

- its `wire_version`,
- dependent examples,
- dependent policies/workflows,
- compatibility under `VERSIONING.md`.

When deterministic readiness semantics change, also check:

- `policy.readiness` version,
- `listing-readiness-response` compatibility,
- `listing-readiness-artifact` provenance behavior,
- whether historical results remain reconstructable.

When normative meaning changes, also follow the change process in `GOVERNANCE.md`.
