# Orbital Exchange Market Structure

**Version:** 0.1  
**Status:** Project proposal — not an adopted market rule

The Orbital Exchange should not assume that every participant, matching engine, data source, and issuer is continuously connected to the same low-latency terrestrial network.

The design problem is therefore not simply "make trading work in space." It is:

> How can a market preserve fairness, deterministic state, price integrity, and recoverability when parts of the system can be physically separated, intermittently connected, or operating with materially different communication delays?

## 1. Core principles

1. **One authoritative market state.** Every executable event must eventually resolve to a canonical sequence.
2. **Explicit time semantics.** The system must distinguish event time, receipt time, sequencing time, and settlement time.
3. **No hidden latency classes.** Participants should know which execution domain they are interacting with and the communication assumptions that apply.
4. **Deterministic degradation.** Network loss must move the market into a defined state, not an improvised one.
5. **Replayability.** A complete signed event log should reconstruct the market after interruption.
6. **Observable fairness.** The venue should publish enough sequencing evidence to test whether similarly situated orders were handled consistently.
7. **Separate trading from settlement finality.** A trade can be execution-final before assets/cash are settlement-final.
8. **Safe failure over ambiguous execution.** When the system cannot prove canonical ordering, it should stop creating new ambiguity.

## 2. Execution domains

The venue may eventually operate multiple execution domains, for example:

- terrestrial gateway,
- low-Earth-orbit matching domain,
- cislunar matching domain,
- or another physically separated venue segment.

An instrument should have exactly one **primary authoritative execution domain** at a given instant unless a future protocol proves safe multi-writer execution.

This avoids a foundational split-brain problem: two disconnected engines should not independently create equally authoritative trades in the same instrument.

## 3. Market time model

A single timestamp is insufficient.

Every market event should carry at least:

```text
event_time        time asserted by event origin
receive_time      time first received by exchange gateway/domain
sequence_time     time assigned canonical sequence
publish_time      time released to market data
settlement_time   time settlement reaches defined finality state
```

The exchange should also record:

- clock source,
- clock quality/uncertainty,
- execution domain,
- sequence number,
- parent or prior-event hash,
- and signature/attestation metadata.

No participant-provided timestamp should determine execution priority by itself.

## 4. Canonical sequencing

Within an execution domain, executable messages should receive a monotonic sequence number.

Conceptually:

```text
accepted message
      ↓
policy + syntax validation
      ↓
canonical sequencer
      ↓
matching engine
      ↓
trade / cancel / reject event
      ↓
signed append-only event log
      ↓
market data publication
```

Price-time priority, pro-rata allocation, auctions, or other matching logic can sit on top of this sequencing layer. The sequencing model should remain explicit regardless of the matching algorithm.

## 5. Order state machine

A proposed order lifecycle:

```text
CREATED
  ↓
IN_TRANSIT
  ↓
RECEIVED
  ↓
VALIDATED ─────────────→ REJECTED
  ↓
SEQUENCED
  ↓
RESTING ↔ PARTIALLY_FILLED
  ↓              ↓
CANCELED       FILLED

Any state may enter EXPIRED where order terms permit.
```

A cancel request is itself a sequenced event. An order can execute before its later-arriving cancel is sequenced.

The exchange should never imply that "cancel sent" means "order canceled."

## 6. Connectivity states

Each execution domain should expose a machine-readable connectivity state such as:

- `NORMAL`
- `DEGRADED_LATENCY`
- `PARTITION_RISK`
- `PARTITIONED_READ_ONLY`
- `SAFE_MODE`
- `RECOVERY`

Definitions should be operational, measurable, and published.

### NORMAL

All required authoritative services are available within expected operating bounds.

### DEGRADED_LATENCY

Execution remains authoritative, but one or more communication paths exceed published latency/error thresholds.

### PARTITION_RISK

The venue detects conditions that could lead to inconsistent reachability or stale market state. New order acceptance may be restricted by instrument or gateway.

### PARTITIONED_READ_ONLY

The domain may publish last known market state but cannot create new executions.

### SAFE_MODE

Trading is halted for the affected scope. Only tightly defined administrative/recovery operations are accepted.

### RECOVERY

The venue is reconciling logs, sequence continuity, settlement obligations, and participant state before returning to normal operation.

## 7. Why disconnected matching is dangerous

Suppose Earth and an orbital node both continue matching the same security during a communication partition.

Earth may execute:

```text
buy 100 @ 20.00
```

while orbit independently executes:

```text
sell 100 @ 19.50
```

Each side can locally believe it owns the same available inventory or collateral. Reconnecting later does not solve the economic contradiction; the system has created incompatible obligations.

Therefore v0.1 assumes **single-writer authority per instrument** during partitions.

Alternative architectures — preallocated inventory, bounded state channels, frequent batch auctions, or cryptographically constrained multi-domain execution — should be explored separately and must define exactly how double execution is prevented.

## 8. Proposed trading modes

Different communications environments may justify different trading modes.

### Continuous limit order book

Appropriate where connectivity and authoritative sequencing are sufficiently stable.

### Frequent batch auction

Orders received during a defined interval clear together at a deterministic price. This may reduce the advantage of sub-second terrestrial proximity when physical propagation delays become more heterogeneous.

### Scheduled orbital auction

A venue may conduct auctions at known windows tied to reliable communications intervals, mission cycles, or settlement availability.

### Request-for-quote / negotiated block

Potentially useful for illiquid early-stage non-terrestrial issuers where continuous order books would display little meaningful depth.

The exchange should choose market structure based on fairness and liquidity properties, not terrestrial convention alone.

## 9. Latency fairness

Space makes a hidden assumption of terrestrial electronic markets impossible to ignore: physical location affects information arrival.

Potential fairness tools include:

- deterministic batch windows,
- published gateway classes,
- minimum resting times,
- randomized processing within tightly defined equivalence classes,
- speed bumps,
- call auctions,
- or instrument-specific execution domains.

The project should evaluate each against:

1. price discovery,
2. manipulability,
3. operational complexity,
4. measurable fairness,
5. and behavior under partition.

"Equal latency" is physically impossible across arbitrary distances. The design target should instead be **known, rule-governed latency asymmetry**.

## 10. Market data

Market data should distinguish:

- canonical executed state,
- indicative or delayed state,
- issuer operational telemetry,
- and venue health/connectivity state.

An orbital investor agent should be able to tell whether a quote is:

```text
canonical + live
canonical + delayed
indicative only
stale due to partition
halted
```

Staleness should be explicit metadata, not inferred from silence.

## 11. Market data event envelope

A conceptual event:

```json
{
  "schema": "orbital.market-event.v0.1",
  "instrument": "ORB:SELENE",
  "domain": "leo-primary-1",
  "sequence": 18499102,
  "event_type": "TRADE",
  "event_time": "2032-04-18T12:03:41.091Z",
  "receive_time": "2032-04-18T12:03:41.131Z",
  "sequence_time": "2032-04-18T12:03:41.133Z",
  "price": "27.40",
  "quantity": "1200",
  "connectivity_state": "NORMAL",
  "previous_event_hash": "...",
  "signature": "..."
}
```

This is illustrative, not a finalized protocol.

## 12. Order types for v0.1

A first implementation should prefer a small auditable set:

- limit,
- marketable limit,
- immediate-or-cancel,
- fill-or-kill,
- auction-only,
- cancel,
- cancel/replace.

Complex hidden, pegged, conditional, or discretionary order types should be added only after the venue can explain their behavior under latency degradation and partition.

## 13. Trading halts

A halt should include:

- scope,
- reason code,
- initiating authority,
- canonical effective sequence,
- last executable state,
- permitted actions during halt,
- reopening mechanism,
- and machine-readable status.

Possible reason classes:

- issuer material event,
- issuer disclosure integrity problem,
- venue state ambiguity,
- connectivity failure,
- settlement failure,
- security compromise,
- extreme price movement,
- or legal/regulatory instruction.

## 14. Reopening auctions

After a material interruption, reopening through an auction may be safer than instantly resuming continuous matching.

A reopening process can:

1. publish recovered canonical state,
2. accept/cancel orders for a defined window,
3. publish indicative imbalance,
4. establish a clearing price,
5. create a new canonical execution point,
6. then transition to continuous trading where appropriate.

## 15. Surveillance

Surveillance must work across participants, agents, gateways, and delayed communications.

The venue should retain enough event-level evidence to investigate:

- spoofing/layering,
- wash trading,
- manipulation across execution domains,
- misuse of stale orbital information,
- compromised autonomous trading agents,
- coordinated account behavior,
- and attempts to exploit venue connectivity-state transitions.

Autonomous participants should have stable accountable identities even if they dynamically create sub-agents.

## 16. Agent trading identity

An agent may be the software actor placing an order, but the venue should still be able to resolve:

```text
order
 → agent instance
 → policy/version
 → credential
 → account
 → beneficial owner / responsible legal principal
```

Machine autonomy should increase traceability, not erase it.

## 17. Settlement state model

Execution and settlement should be separate state machines.

A possible settlement lifecycle:

- `TRADE_CAPTURED`
- `OBLIGATION_LOCKED`
- `ASSET_RESERVED`
- `CASH_RESERVED`
- `READY_TO_SETTLE`
- `SETTLED`
- `SETTLEMENT_EXCEPTION`
- `REVERSED_BY_RULE`

The venue should publish exactly which state is legally/economically final under its future framework.

## 18. Recovery invariant

After any restart or partition, the venue should be able to prove:

```text
last accepted canonical sequence
+ complete signed event log since checkpoint
+ deterministic replay
= recovered authoritative market state
```

If that invariant cannot be established, the affected market should not resume normal execution.

## 19. Things v0.1 refuses to hand-wave

The project should not use vague phrases like "blockchain solves settlement" or "satellite connectivity enables 24/7 markets" without specifying:

- authoritative state,
- failure model,
- ordering,
- custody,
- finality,
- exception handling,
- recovery,
- legal responsibility,
- and what happens when communication stops.

## 20. Open research tracks

- single-writer vs bounded multi-domain execution,
- frequent batch auctions for interplanetary latency,
- orbital time synchronization and uncertainty,
- market data compression over constrained links,
- pre-positioned collateral/inventory,
- cryptographic event attestations,
- settlement during long partitions,
- autonomous market makers under stale information,
- fair access to orbital gateways,
- and lunar/Mars-scale latency where continuous shared order books may cease to make economic sense.

The correct architecture may differ by distance regime. The Orbital Exchange should be a framework for markets beyond Earth, not one topology forced onto every environment.