---
title: "Diagnostic Codes"
category: "7. Diagnostics"
order: 704
---

# Diagnostic Codes & Aliases

The Ved Compiler and Linter emit structured diagnostic codes rather than generic text dumps. Every fault, warning, and linting failure maps to a strict internal taxonomy. This allows pipeline tools (like CI/CD environments) to mathematically filter or bypass specific failure classes based on organizational policy.

## Code Structure

Diagnostic codes map strictly to this syntax:
`V-[CATEGORY]-[ID]`

## V-ERR (Transition & Semantic Errors)

Fatal compiler or runtime errors.

* **`V-ERR-001` (Authority Mis-Match):** Code attempts to mutate a Domain belonging to an Authority Scope higher than itself without an active bypass flag.
* **`V-ERR-002` (Impure Function Call):** The compiler detected a nondeterministic function invocation (e.g., calling `Math.random`) inside a pure Transition slice block.
* **`V-ERR-003` (Unversioned Schema Edge):** A domain state explicitly increased its structure but did not provide a corresponding mathematical transition function to bridge from the previous version.
* **`V-ERR-004` (Unresolved Effect Proxy):** An Orchestration manifest failed to bind an expected Effect to a registered, capable Adapter plugin.

## V-WRN (Warnings & Statistical Threats)

Code compiles successfully, but the telemetry is marked with flagged concerns.

* **`V-WRN-010` (Oscillation Potential):** The declarative predicate block in a Goal structurally flips an attribute that another competing Goal actively modifies, indicating potential algorithm thrashing.
* **`V-WRN-018` (Scope Drift):** A Goal attempts to reach an active status but lacks an explicit termination/fallback policy.
* **`V-WRN-020` (Resource Saturation):** Array mapping inside a deterministic slice is bounded by a dynamically pulled integer instead of a statically limited array slice.

## V-LNT (Structural Linting Failures)

Code fails formal verification.

* **`V-LNT-001` (Missing Idempotency Bind):** No trace of a unique contextual deduping key passed into a mutable Effect intent payload.
* **`V-LNT-004` (Null Branch Fallback):** Missing `?null` exhaustive check in a state transition migration.
