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

When normative meaning changes, also follow the change process in `GOVERNANCE.md`.
