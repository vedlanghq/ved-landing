---
title: "Linting Philosophy"
category: "7. Diagnostics"
order: 703
---

# Linting Philosophy

In the broader Javascript and Python ecosystems, linters like ESLint and Pylint are primarily used for enforcing whitespace, variable naming, and bracket placement.

Because Ved compiles down to deterministic sequences running on a Virtual Control Runtime, **linting is treated as mathematical formal verification.** We do not care if you prefer tabs or spaces, and the Ved linter natively ignores superficial stylistic checks. Instead, Ved uses `ved-lint` to simulate your code constraints against known operational failure patterns.

## The Paradigm: Structural Simulation

The primary job of the Ved linter is to ask: "If I run this code a million times, varying the length of time external APIs take to respond, will this Domain eventually drift out of its declarative desired state?"

### 1. The Idempotency Check

When a Domain defines an Effect Transition that calls an external service, the linter parses the AST to verify that a state-based deduplication key is correctly passed into the effect context. If the linter cannot mathematically prove that a double-execution will yield the exact same physical result, it fails the lint.

### 2. The Sandbox Isolation Check

The linter verifies that no Domain state references point to volatile system APIs. Since `System.time` and `Math.random` are structurally omitted from the pure sandbox, any attempt to cleverly proxy them through an unsafe mechanism will be caught here.

### 3. State Schema Completeness

If you evolve a schema from `v1` to `v2`, the compiler ensures you wrote a transition. The linter ensures that the transition actually handles all combinations of missing data. If an old snapshot had an optional `string?` and the new snapshot requires a strict `string`, the linter will demand a formal fallback strategy for the `null` branch.

## The Output

The linter does not output "Line 42: Missing Semicolon."

It outputs diagnostic proofs:

* `[V-LINT-01] Unable to prove idempotency on Domain "OrderQueue" Transition "Refund". Missing idempotency key binding.`
* `[V-LINT-04] Migration transition v1_to_v2 is mathematically incomplete. Cannot resolve Null coalescing on struct "BillingID".`
