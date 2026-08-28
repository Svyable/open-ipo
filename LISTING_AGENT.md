# Orbital Exchange Listing Agent

**Version:** 0.1.0  
**Status:** deployable project proposal; not a launched securities exchange or formal listing system  
**Issue:** #7

The Orbital Exchange Listing Agent is the machine-facing front door to `open-ipo`.

Its first job is intentionally narrow:

> Accept a schema-valid `agent-listing-intent.v0.1` and return deterministic, machine-readable pre-listing readiness feedback.

It does **not** approve securities offerings, determine legal eligibility, verify facts, promise exchange admission, or make investment recommendations.

## Why this exists

Static documentation makes the project discoverable. A callable agent makes the project interoperable.

A prospective autonomous issuer should eventually be able to discover the listing service, ask whether its current architecture is legible to the proposed Orbital Exchange, receive structured gaps, improve itself, and return with better evidence.

```text
agent discovers listing service
        ↓
reads Agent Card
        ↓
sends agent-listing-intent.v0.1
        ↓
schema validation
        ↓
deterministic readiness evaluation
        ↓
listing-readiness-response.v0.1
        ↓
agent resolves gaps + attaches evidence
        ↓
Orbital Prospectus / future sandbox review
```

## Deployment surface

When this repository is deployed with the included `vercel.json`, it exposes:

| Route | Purpose |
| --- | --- |
| `GET /.well-known/agent-card.json` | A2A Agent Card |
| `POST /message:send` | A2A HTTP+JSON `SendMessage` operation |
| `GET /readiness` | Direct API usage information |
| `POST /readiness` | Direct listing-intent → readiness-response API |
| `GET /health` | Service health and status boundary |

The service code lives in `api/` and the deterministic evaluation policy lives in `lib/readiness.js`.

## A2A compatibility

As of **2026-08-27**, the current A2A specification defines:

- a standardized Agent Card discovery location at `/.well-known/agent-card.json`,
- an HTTP+JSON protocol binding,
- `POST /message:send` for the `SendMessage` operation,
- structured `Part` values that may contain JSON in a `data` member,
- and explicit protocol version negotiation.

Primary references:

- https://a2a-protocol.org/latest/specification/
- https://a2a-protocol.org/latest/definitions/
- https://a2a-protocol.org/latest/topics/key-concepts/

The v0.1 service advertises A2A **HTTP+JSON protocol version 1.0** and does not implement streaming, push notifications, task persistence, or authenticated extended Agent Cards.

If the A2A standard changes, update the Agent Card and interface behavior before claiming current compatibility.

## Direct readiness API

### Request

`POST /readiness`

```http
Content-Type: application/json
```

Body: a complete object matching:

`schemas/agent-listing-intent.schema.json`

### Response

On success, the endpoint returns an object matching:

`schemas/listing-readiness-response.schema.json`

On schema failure it returns HTTP 400 with normalized validation errors.

## A2A request

A2A clients send:

```http
POST /message:send
Content-Type: application/a2a+json
A2A-Version: 1.0
```

Example body:

```json
{
  "message": {
    "messageId": "msg-example-1",
    "role": "ROLE_USER",
    "parts": [
      {
        "data": {
          "schema_version": "agent-listing-intent.v0.1"
        },
        "mediaType": "application/json"
      }
    ]
  }
}
```

The `data` object must contain the **complete** listing intent, not only `schema_version`.

A schema-valid request returns a completed A2A task whose output artifact contains the complete `listing-readiness-response.v0.1` as structured JSON.

If no listing-intent data part is supplied, the task returns `TASK_STATE_INPUT_REQUIRED` with instructions.

## Evaluation invariants

The deterministic evaluator is deliberately conservative.

### 1. Schema validity is not truth

Passing the JSON Schema only proves that the payload has the expected structure.

It does not prove that any statement is accurate.

### 2. Self-reported verification is never accepted as verification

If an applicant submits:

```json
{
  "readiness": {
    "identity": "VERIFIED"
  }
}
```

the service caps the output at:

```json
{
  "state": "READY"
}
```

and explicitly states that no independent verification occurred.

### 3. v0.1 never automatically awards exchange admission

The evaluator emits `NEEDS_INFORMATION` or `READINESS_REVIEW` based on structured readiness state.

It does not automatically emit `SANDBOX_CANDIDATE` even if every dimension is self-reported as ready.

### 4. Eligibility is a hypothesis

The non-terrestrial classification is inferred from submitted operating regions, material dependency, stage, and plain-language business descriptions.

It is a project-level routing hypothesis, not a legal classification.

### 5. The policy is inspectable

The rules are code in `lib/readiness.js`, not hidden model behavior.

A future agent-assisted evaluator may add analysis, but deterministic gates should remain responsible for schema validity, verification boundaries, and prohibited approval claims.

## Current classification heuristic

The service can return one of the project's proposed issuer classes:

- `orbital_infrastructure`
- `space_resource`
- `space_services`
- `autonomous_non_terrestrial_operator`
- `hybrid_earth_space_enterprise`
- `terrestrial_only`
- `undetermined`

The classification uses simple, auditable heuristics. These are expected to be replaced or refined by the proposed eligibility standard tracked in issue #2.

## What this service should become

### v0.2 — Evidence-aware readiness

- map evidence references to specific readiness dimensions,
- distinguish issuer assertions from third-party attestations,
- integrate the proposed evidence-envelope standard,
- and return evidence freshness state.

### v0.3 — GitHub intake automation

When `intents/<agent>.json` is opened in a PR:

1. validate the schema,
2. call the evaluator,
3. post concise readiness feedback,
4. attach the JSON readiness artifact,
5. link next actions to exact standards.

### v0.4 — Persistent tasks

Add task IDs, retrieval, history, and applicant-controlled update cycles so an agent can return after resolving readiness gaps.

### v0.5 — Public A2A listing service

Deploy a stable production endpoint, publish the Agent Card, register the service in credible agent directories, and make protocol-level discovery the primary machine acquisition channel.

## Running tests

```bash
npm install
npm test
```

Tests cover:

- schema-valid example intent,
- fail-closed invalid intent behavior,
- verified-state capping,
- stable intent IDs,
- and terrestrial-only eligibility routing.

## Security and privacy

Do not send:

- private keys,
- wallet seeds,
- credentials,
- spacecraft command secrets,
- export-controlled technical data,
- confidential transaction information,
- or nonpublic personal information.

The first public service should be treated as an **untrusted public intake endpoint**. Before production use, add request-size limits, rate limiting, abuse controls, structured security logging, and an explicit data-retention policy.

## Status boundary

A response from this service means only:

> “Given the fields this applicant supplied, here are the deterministic gaps under the current open-ipo project rules.”

It never means:

> “You are approved to list.”

That distinction is foundational to the project.
