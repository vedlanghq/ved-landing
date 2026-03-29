---
title: "Lint & Verify Usage"
category: "8. Tooling & CLI"
order: 803
---

# Lint & Verify Usage

In Ved, `ved lint` and `ved verify` are not tools that complain about line lengths or variable names. They are powerful mathematical verification engines designed to mathematically guarantee that your control loops are safe, deterministic, and idempotent before they are deployed.

## `ved lint`

The linter acts as your first line of defense against structural divergence. It focuses on the internal consistency and safety of individual Domains and Transitions.

When you run `ved lint`, the CLI performs three distinct checks:

1. **Idempotency Verification:** Every Effect Intent is examined. Using control flow analysis, the linter tries to trace a unique, state-derived idempotency key passed into the `emit` keyword. If it cannot prove idempotency, it outputs `V-LNT-001`.
2. **Sandbox Adherence:** Ensures that your code has not attempted to use unsupported proxy modules (like external C bindings) to read the filesystem or check the clock directly inside a pure slice.
3. **Cyclomatic Slicing Threats:** Detects `while` loops or large array comprehensions that don't invoke the `yield` keyword. It statically estimates if the operation will blow past the Deterministic Scheduler's cycle boundaries.

You can configure the strictness of the linter in your `ved.toml` file or bypass specific lines using inline Pragmas. However, a bypassed lint rule is permanently attached to the compiled artifact's telemetry profile.

## `ved verify`

While `lint` checks the structural purity of the code execution, `ved verify` acts on the **orchestration topology**. It requires your entire multi-domain project workspace.

When you run `ved verify`, it ensures:

1. **Authority Satisfaction:** If `Domain A` attempts to send a command message to `Domain B`, `verify` mathematically evaluates their Authority type structures. If `A` is inside a Workspace scope and `B` is inside a Root scope, the compilation halts.
2. **Effect Contract Matching:** It checks that all emitted `Effect Intents` inside your pure transitions are properly mapped to functioning, registered `Effect Adapters` in your deployment manifest.
3. **Schema Migration Adjacency:** If you change a Domain's `state` block, `verify` examines the previous git tags or snapshot schemas. It ensures that there is a complete, un-skipped migration path from the oldest supported state format directly to the newly compiled format.

In a CI/CD pipeline, `ved check` is used for fast parsing, but `ved verify` is the definitive gating function before allowing a deployment release.
