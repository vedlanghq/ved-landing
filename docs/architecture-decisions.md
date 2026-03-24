---
title: "Architecture Decisions"
category: "11. Project & Contribution"
order: 1102
---

# Architecture Decision Records (ADRs)

Ved's design is heavily documented through Architecture Decision Records. These are formal snapshots of the philosophical trade-offs made during the founding of the language.

## ADR-001: Separation of Compiler and Runtime

* **Context:** Most languages simply compile to machine code or target standard runtimes like the JVM or LLVM.
* **Decision:** Ved must ship with a proprietary *Virtual Control Runtime* that executes purely deterministic slices.
* **Reasoning:** Without a specialized runtime taking control of scheduling, mailboxes, and IO Effect Adapters, it is impossible for the compiler to guarantee system quiescence or crash-recovery continuity.

## ADR-002: Rejection of Shared Mutable State

* **Context:** Concurrency in modern systems is usually handled via Thread Mutexes or `async/await` memory sharing.
* **Decision:** Ved structurally forbids shared memory. All state is perfectly partitioned into Domains. Domains communicate exclusively through asynchronous mailboxes.
* **Reasoning:** Shared memory prevents reliable Snapshot Persistence. If you freeze a thread holding an open Mutex lock to disk and crash, the system deadlocks on reboot. Asynchronous message passing allows mathematically clean serialization.

## ADR-003: Authority embedded in the Type System

* **Context:** Security is usually handled via external IAM policies, API keys, or Kubernetes RBAC YAMLs late in the deployment process.
* **Decision:** Ved bakes Authority Scope into the formal Type System (`Domain<Workspace>` vs `Domain<Tenant>`).
* **Reasoning:** We want infrastructure automation that cannot physically be deployed if it violates governance topology. Putting it in the type engine makes security a compile-time mathematical guarantee instead of a runtime hope.

## ADR-004: Pure Local Effects vs Impure Network Effects

* **Context:** Developers need to generate string UUIDs or do simple in-memory computations without wrapping everything in a heavy Effect Intent boundary.
* **Decision:** Bounded local effects (like memory math and strictly sandboxed temp files) are permitted in pure slices. Anything requiring a network card, real clock time, or durable disk writes is pushed to the Impure Adapter Zone.
* **Reasoning:** Strict division provides the perfect balance of developer ergonomics (Script Mode) and structural safety.
