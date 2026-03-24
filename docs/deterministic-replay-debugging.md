---
title: "Deterministic Replay"
category: "10. Advanced Topics"
order: 1002
---

# Deterministic Replay Debugging

When a production system fails, developers usually rely on parsing millions of unstructured text logs ("grepping for errors") to reconstruct the timeline that led to the fault.

Because the Ved Runtime mandates that all mutations happen via perfectly pure mathematical Transitions and all physical side-effects are captured as formal Events in an immutable log, **Ved natively supports time-travel replay debugging.**

## The Replay Architecture

If an alarm fires at 3:00 AM indicating that a specific Tenant Domain entered a `FAULTED` state, an on-call engineer does not read the logs. Instead, they run an exact reproduction of the server on their local laptop.

1. They download the `Tenant Snapshot` from 2:00 AM (an hour before the fault).
2. They download the `Mailbox Journal`, which contains exactly the raw events targeting that Domain between 2:00 AM and 3:00 AM.
3. They spin up `ved runtime start --replay` locally.

The local Runtime mounts the 2:00 AM snapshot into memory. It then reads the very next event out of the Mailbox Journal, calculates the exact same pure Transition, and arrives at the 2:01 AM state.

Because there are no network dependencies, no system-level randomness, and no clock-drift, the Runtime mathematically reconstructs the 3:00 AM environment with 100% fidelity.

## The Debugging Experience

When the simulated local execution finally reaches the exact moment of failure at 3:00 AM, the local debugger hits an explicit breakpoint.

The developer can:

* Inspect the internal values of every single variable inside the `Domain`.
* Ask the Runtime to step backwards 5 minutes in execution time.
* Branch the snapshot locally and attempt to write a hotfix transition to see if it catches the math error.

This means you never write code trying to "guess" why the production system failed. You execute the actual failing mathematical proof locally on your machine.
