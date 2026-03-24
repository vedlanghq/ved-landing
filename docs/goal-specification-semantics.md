---
title: "Goal Specification Semantics"
category: "6. Language Design"
order: 604
---

# Goal Specification Semantics

In most orchestration systems, you write imperatively: *"Do X, then do Y."*
In Ved, you declare a Goal: *"I want the system to reach state Z."*

If Ved gets goal semantics correctly, it becomes a true control-plane language where developers can reason mathematically about convergence, and runtime behavior becomes completely predictable.

## The Nature of a Goal

A Goal in Ved represents a **desired stable condition of domain state over logical time**.

A goal is **not**:

* A one-time software assertion.
* A blocking wait statement (`await`).
* A synchronous promise.

Instead, a goal is:

* Continuously evaluated by the Control Loop.
* Driven by convergence (it persistently works to correct drift).
* Highly aware of system persistence and crash recovery.

## The Goal Structure

To prevent ad-hoc reconciliation and orchestration oscillation, the Ved compiler requires goals to be formulated with rigorous structure. A complete Goal specification consists of five key components:

### 1. Predicate

The logical condition that must evaluate to `True` for the goal to be considered successfully met. This must be a strictly pure mathematical evaluation against a Snapshot State, containing no side effects.
*Example: `LoadBalancer.ActiveNodes == 5`*

### 2. Priority

The urgency of the goal relative to other active goals in the system, dictating how the Deterministic Scheduler allocates slicing time. If an infrastructure node fails, a high-priority goal to replace it will preempt lower-priority goals like cache-clearing.

### 3. Convergence Strategy

Defines *how* the Domain should attempt to reach the Predicate. Does it use an exponential backoff retry mechanism? Does it delegate intents to an external API? Does it degrade gracefully if upstream resources are exhausted?

### 4. Termination Policy

Specifies what happens if the goal fundamentally cannot be reached. Instead of leaving the system in a hanging loop forever, the termination policy dictates when to give up (e.g., after 50 retries or 4 hours elapsed) and explicitly defines the fallback or alerting behavior.

### 5. Authority Scope

Restricts the goal's operational reach. If a goal is attempting to restart a single pod within a workspace, its Authority Scope prevents it from accidentally tearing down the entire environment due to a logic bug.

## Syntax vs. Semantics

By forcing these five pillars into the language explicitly, developers cannot accidentally create infinite loops or unhandled hanging promises. If the predicate holds, the goal sleeps. If an external factor mutates the state, the control loop wakes the goal up, applying the strategy until convergence or termination is met.
