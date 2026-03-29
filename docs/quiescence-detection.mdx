---
title: "Quiescence Detection"
category: "4. Execution Model"
order: 403
---

# Quiescence Detection

One of the great risks in declarative, goal-seeking orchestrators is runaway state oscillation. If Goal A wants "3 replicas" and Goal B wants "Max 2 replicas", an improperly designed runtime will rapidly spin in an infinite loop, constantly booting and destroying instances, causing a massive bill.

Ved solves this using a formally defined concept of **Quiescence (Stable State)** coupled with programmatic Oscillation Detection.

## What is Quiescence?

Quiescence is the technical term for "The Domain has reached its Goals and has nothing left to do."

A Domain enters Quiescence only when three rigid conditions are met simultaneously:

1. **All non-background Goals evaluate to `true`.** (The current state matches the desired mathematical predicates).
2. **There are no pending Transitions.** (No reconciliation logic is currently executing or paused).
3. **There are no pending Effects.** (The Domain is not waiting for an HTTP API callback from the external world).

Once Quiescence is achieved, the Ved Scheduler places the Domain into a deeply optimized "Sleep" mode. It consumes virtually zero CPU cycles until a new asynchronous message or external event arrives in its mailbox, breaking the quiescence.

## Oscillation Detection

If a Domain repeatedly transitions back and forth without achieving Quiescence rapidly, the Ved runtime detects it as **State Oscillation**.

Instead of executing the loop as fast as the CPU allows, the runtime protects external infrastructure by intervening:

1. **Aggressive Backoff:** The Scheduler intentionally degrades the scheduling priority of the offending Goals, forcing exponential delays between execution slices to stop external APIs from being overloaded (DDOS protection).
2. **Alert Event Emission:** The Domain automatically emits a runtime `Oscillation Warning` telemetry event so operators are alerted that the mathematical models or the external system are broken.

This guarantees that poorly written Ved programs fail safely and quietly, rather than burning planetary resources trying to achieve the mathematically impossible.
