---
title: "Warning System"
category: "7. Diagnostics"
order: 702
---

# Warning System

Because Ved is designed for long-lived infrastructure operations, compiler warnings are not treated as stylistic complaints (e.g., "you forgot to use camelCase here").

In Ved, warnings represent **statistical threats to future determinism and operational safety**.

## The Warning Philosophy

If a Ved compilation yields a Warning, the code *will* execute, but the compiler possesses mathematical evidence that the state machine could enter an unresolvable degradation loop.

A developer can bypass these warnings using the native Bypass Flags (e.g., `Bypass A — Diagnostic Relaxation`), but doing so permanently embeds the warning trace into the executable's telemetry output. When the domain runs in a production environment, the Ops team can see exactly what warnings the original author explicitly chose to ignore.

## Core Warning Categories

### W1: Idempotency Risk

Triggered when an Effect intent implies mutation but lacks a clear external deduplication target.

* *Example:* Generating a random UUID inside an Effect without scoping it to a known entity ID. If the process crashes and restarts, it might spawn duplicates.

### W2: Oscillation Threat

Triggered when the compiler detects that two Goals are competing to satisfy mutually exclusive predicates.

* *Example:* Goal A wants `NodeCount >= 10`. Goal B wants `NodeCount <= 5`. The compiler flags that the Control Loop will infinitely expand and shrink the cluster.

### W3: Scope Exhaustion

Triggered when a transition attempts to iterate over an unbounded array of inputs without yielding to the scheduler.

* *Example:* Reconciling every log record inside a single purely synchronous transition. The compiler warns that the Deterministic Slice will likely exceed its time boundary, leading to forced preemption by the Scheduler.

### W4: Authority Overstep Suspicion

Triggered when a block of code possesses `Environment` level authority, but the code only ever touches `Local` scope elements.

* *Example:* The compiler politely suggests downgrading the script's privilege level to enforce the principle of least privilege, reducing the blast radius of any future bugs.
