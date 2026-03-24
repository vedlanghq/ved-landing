# Ved Docs Information Architecture (v0.1)

Design goal:

> A reader should move from philosophy → execution → engineering → tooling → contribution.

This creates intellectual progression.

---

# 🧭 Top-Level Sidebar Structure

Recommended ordering:

```text
Introduction
Philosophy
Core Concepts
Execution Model
Runtime Architecture
Language Design
Diagnostics
Tooling & CLI
Examples
Advanced Topics
Project & Contribution
```

This is deliberate.

Now let’s expand.

---

# 1. Introduction

Purpose: orientation.

Pages:

* What is Ved
* Why Deterministic Orchestration
* Problem Space
* When to Use Ved

---

# 2. Philosophy

Purpose: conceptual foundation.

Pages:

* Determinism as Design Principle
* Convergence vs Imperative Control
* Authority & Isolation Thinking
* Long-Lived System Programming

---

# 3. Core Concepts

Purpose: vocabulary formation.

Pages:

* Domains
* Persistent State
* Transitions
* Goals
* Effects
* Message Passing
* Scheduling Slices

This is crucial section.

---

# 4. Execution Model

Purpose: behavioural clarity.

Pages:

* Control Loop Lifecycle
* Deterministic Scheduling
* Priority Semantics
* Quiescence Detection
* Convergence Guarantees

This is where engineers decide:

> “This is serious.”

---

# 5. Runtime Architecture

Purpose: implementation transparency.

Pages:

* Runtime Components Overview
* Mailbox Model
* Scheduler Design
* State Persistence Strategy
* Effect Execution Boundary
* Crash Recovery Model

This builds trust.

---

# 6. Language Design

Purpose: programming surface.

Pages:

* Syntax Modes (script/system/orchestration)
* Type System Overview
* Authority Scope Hierarchy
* Goal Specification Semantics
* State Schema Evolution

---

# 7. Diagnostics

Purpose: safety system.

Pages:

* Error Taxonomy
* Warning System
* Linting Philosophy
* Diagnostic Codes & Aliases

This is where your earlier pages go.

---

# 8. Tooling & CLI

Purpose: operational usability.

Pages:

* CLI UX Philosophy
* Command Reference
* Lint & Verify Usage
* Simulation Workflows
* Observability Commands

---

# 9. Examples

Purpose: mental simulation.

Pages:

* Hello Stability
* Worker Pool Scaling
* Retry Reconciliation
* Multi-Domain Coordination
* Priority Scheduling Example

---

# 10. Advanced Topics

Purpose: future depth.

Pages:

* Distributed Runtime Vision
* Deterministic Replay Debugging
* Scheduler Policy Extensions
* Convergence Performance Thinking
* Runtime Hot Upgrades

---

# 11. Project & Contribution

Purpose: ecosystem building.

Pages:

* Roadmap
* Architecture Decisions
* Contributing Guide
* Governance Model
* Design Discussions

---

# 🧠 Ordering Psychology

This structure moves user through:

1. Why
2. What
3. How it behaves
4. How it is built
5. How to use
6. How to improve

This is optimal for systems languages.

---

# ⚠️ Important Anti-Pattern to Avoid

Do NOT start docs with:

* CLI reference
* installation guide
* syntax grammar

This makes Ved look like:

> just another tool.

Ved must first feel like:

> new systems paradigm.
