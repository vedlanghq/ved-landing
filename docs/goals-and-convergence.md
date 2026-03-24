---
title: "Goals and Convergence"
category: "2. Core Concepts"
order: 202
---

# Goals and Convergence

In traditional imperative languages, developers write continuous `while` loops, setup polling triggers, and write branching `if/else` logic to manage the real-world state of an external system.

Ved replaces this entirely with a first-class language feature: **Goals**.

## What is a Goal?

In Ved, a Goal represents a desired, stable condition of a Domain's state over logical time. It is not a one-time assertion, a blocking wait, or a synchronous promise. It is an active, continuously evaluated construct.

The fundamental shift is:
> **You do not tell the system *how* to stabilize. You declare *what* stable means, and you define deterministic transitions that trend toward it.**

## Goal Predicates

The core of a goal is its **Predicate**. This is a purely deterministic validation rule that runs against local state.

```ved
target internal_state.active_connections <= 500
```

Predicates are restricted safely by the compiler:

1. They must be pure.
2. They cannot invoke external network calls (no side effects).
3. They cannot use randomness or wall-clock time.

Because they are mathematically pure, the Ved runtime can efficiently evaluate the satisfaction of all goals after *every single state mutation* without performance degradation.

## Priorities and Scheduling

In a complex orchestration system, multiple goals must balance constantly. Ved solves this with a strict priority model.

When goals fall out of alignment (such as a database crashing and losing connection state), the runtime automatically schedules a **reconciliation transition** based on Goal Priority:

1. `Critical`
2. `High`
3. `Normal`
4. `Low`
5. `Background`

Higher priority goals receive aggressive scheduler preference for remediation. If two goals at the exact same priority conflict, Ved uses a strict deterministic tie-breaking algorithm (based on lexical ID) so that in every cluster globally, the exact same conflict resolves the exact same way.

## Shared Responsibility Model

Ved provides deterministic execution ordering and guaranteed eventual opportunities for reconciliation. However, Ved is not a magical AI.

We utilize a **Shared Responsibility Model**:

* **Ved Guarantees:** That if state drifts from a Goal, the correct reconciliation logic will be deterministically executed, retried upon failure, and safely persisted.
* **Developer Guarantees:** The developer still has to write the specific logical `transition` that performs the actual business rules (e.g., calling the AWS API to provision a new server).

If the logic the developer wrote fails continuously due to external outages, the Ved runtime will detect "Goal Oscillation", emit telemetry, and defensively reduce scheduling aggressiveness to prevent DDOSing external API endpoints.

## Stable State

A Domain achieves **Stable State** when:

* All non-background goals are satisfied.
* No pending reconciliation transitions are queued.
* No unprocessed external Effect responses are waiting.

Once stable, the domain goes efficiently to sleep until a new event wakes it up, saving compute cycles organically.
