---
title: "Governance Model"
category: "11. Project & Contribution"
order: 1104
---

# Governance Model

Ved is governed by the **Ved Core Philosophy Team**.

Because Ved is trying to solve a mathematically strict, highly opinionated architectural problem (Deterministic Execution and Authority Boundaries), the project does not accept feature requests simply because "other languages do it."

## Core Invariants (Non-Negotiable)

When evaluating proposals, the Governance layer will instantly reject any pull request that violates the three Core Invariants:

1. **No Shared Mutable Memory:** We will never add Thread Mutexes.
2. **The Pure Effect Boundary:** We will never allow a direct `fs.open()` command inside a raw Domain execution slice.
3. **No Unstructured State Execution:** We will never abandon the foundational Snapshot-and-Replay runtime contract.

## RFC Process

To propose a change to the type system, the linting mathematical model, or the Effect Adapter standard library, you must submit a formal RFC.

1. **Drafting:** Write a detailed pseudo-code mock-up demonstrating how the feature behaves under a simulated Crash/Reboot.
2. **Simulation Proof:** Explain mathematically why the new feature does not introduce nondeterministic oscillation.
3. **Review:** the Core Team evaluates the proposal purely on how well it reinforces long-lived infrastructure stability.

Our goal is not to be the most popular scripting language; our goal is to be the bedrock upon which the world's most resilient cloud environments are defined.
