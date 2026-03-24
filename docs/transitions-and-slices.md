---
title: "Transitions and Slices"
category: "2. Core Concepts"
order: 203
---

# Transitions and Slices

In Ved, you do not write long, monolithic scripts or functions that run indefinitely.

Instead, execution is broken down into small, highly structured units called **Transitions**, which are further divided into **Deterministic Execution Slices**.

## The Monolith Problem

In traditional orchestration (like a Python deployment script), an engineer might write a 500-line function that:

1. Provisions a network
2. Waits 2 minutes
3. Configures a database
4. Inserts data

If the script crashes on line 400, the operating system simply drops the execution context. When the engineer reruns the script, they must manually write "idempotency checks" (`if database_exists: skip`) for the first 399 lines, or risk corrupting the system.

## Ved Transitions

A Transition in Ved is a logical workflow designed to move a Domain from its current state closer to its Goal state. However, a Transition is not allowed to run as an unbounded, blocking function.

The Ved Compiler forces you to break Transitions into **Execution Slices**.

### What is a Slice?

A Slice is a bounded, short-lived sequence of deterministic computation.

```text
transition DeploySystem
    slice validateInputs
    slice provisionNetwork
    slice initializeDatabase
```

### The Slicing Guarantee

By enforcing this structure, the Ved runtime provides an incredibly powerful guarantee: **Crash-Resilient Forward Progress.**

The runtime works like this:

1. Ved executes `validateInputs`.
2. Upon successful completion, the runtime automatically checkpoints the exact state of the Domain to persistent storage.
3. Ved executes `provisionNetwork`.
4. Power is lost, and the hardware node crashes.

When the Ved runtime restarts, it looks at the persistent snapshot. It does **not** restart the transition from the beginning. It completely bypasses `validateInputs` and resumes execution smoothly exactly at `provisionNetwork`.

Unlike traditional thread interruption, Ved will **never preempt a Domain in the middle of a slice.** Preemption, state snapshotting, and rescheduling across a cluster only ever happen cleanly exactly on slice boundaries.

## Compiler Limits

To ensure that malicious or badly written code does not monopolize the deterministic scheduler, the Ved Compiler statically enforces rules on Slices at compile-time:

* **Instruction Budgets:** A slice cannot contain an infinite `while(true)` loop. The compiler enforces maximum computational limits per slice.
* **Non-Blocking:** A slice cannot sit idle waiting on an external HTTP response. Network logic must be broken into separate request/response slices via the Effect System.

This forces engineers to think in terms of **incremental state advancement** rather than massive, fragile, monolithic routines.
