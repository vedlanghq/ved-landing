---
title: "Error Taxonomy"
category: "7. Diagnostics"
order: 701
---

# Error Taxonomy

Most languages treat errors as an "unexpected crash of execution flow" that requires a stack trace and a hard halt.

In Ved, failure must not destroy determinism. A failure is simply **state evidence influencing convergence**. The system must continue to evolve predictably, even under partial faults. To achieve this, the Ved Runtime and Compiler classify errors into four rigorous categories.

## 1. Transition Faults (Internal Math Failures)

Occurs entirely within the Pure Zone during a Deterministic Slice.

* **Causes:** Division by zero, invalid list index, schema violation, or unhandled null checks.
* **Runtime Behavior:** The deterministic slice is safely aborted. The runtime discards the corrupted scratchpad. The Domain enters a `FAULTED` state. The Scheduler simply skips this domain in future loops, but **other domains continue executing perfectly.**

## 2. Effect Faults (External I/O Failures)

Occurs in the Impure Zone outside the runtime's control.

* **Causes:** Network timeouts, HTTP 500s, DNS resolution failures, partial JSON responses.
* **Runtime Behavior:** Because effects are decoupled from transitions, this fault never crashes the Domain. The Effect Adapter captures the error and returns a formal `Effect_Failed_Event` to the Domain's mailbox.
* **Handling:** The Domain wakes up, reads the failure, and updates its state (e.g., evaluating retry limits or triggering a designated compensation strategy).

## 3. Convergence Faults (Algorithmic Failures)

Occurs when the Control Loop detects that a Goal is behaving pathologically.

* **Causes:** Oscillation (state A flips to state B, which flips back to state A endlessly), unreachable predicates, or conflicting Authority Scopes attempting to manage the same resource.
* **Runtime Behavior:** The Ved Runtime watches for excessive reconciliation cycles and state pattern repetition. If a Goal is thrashing, the runtime algorithmically applies backpressure, eventually marking the Goal as violently unconvergent and halting its execution to prevent cloud billing destruction.

## 4. Persistence Faults (Infrastructure Failures)

Occurs when the underlying Ved node itself fails structurally.

* **Causes:** Durable snapshot commit fails, hard drive is completely full, or journal write corruption is detected.
* **Runtime Behavior:** This is a fatal node error. The Ved node will gracefully degrade, halting affected domains, raising a massive infrastructure alert, and expecting an Operator to intervene or a Secondary Node to take over via leader election.
