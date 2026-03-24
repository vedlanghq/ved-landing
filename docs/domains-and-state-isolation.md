---
title: "Domains and State Isolation"
category: "2. Core Concepts"
order: 201
---

# Domains and State Isolation

Shared mutable state is the root cause of almost all complex race conditions, deadlocks, and unpredictable failures in distributed systems. Ved approaches state management by completely rejecting the concept of a single global mutable memory space.

Instead, the execution environment in Ved is built around **Domains**.

## What is a Domain?

A Domain is an independent, isolated capsule of state and execution.

Think of a Domain as a micro-service or an actor, but elevated to a native language construct. Each domain:

1. Exclusively owns its internal data structures (state).
2. Evolves that state only through deterministic `transitions`.
3. Communicates with other domains strictly via asynchronous message passing.
4. Possesses its own persistent runtime snapshot.

## The Architecture: Static Types, Dynamic Instances

Ved balances the need for rigorous compile-time safety and real-world horizontal scalability.

You cannot arbitrarily generate untyped domains at runtime. Instead, Ved forces you to define **Domain Types** statically at compile time, which can then be instantiated dynamically.

### What is enforced at compile time?

When you write a Domain Type, the compiler permanently locks in:

* The data structures stored inside (Schema).
* The specific external network/database bindings it is allowed to touch (Authority).
* The specific type of messages it can receive.

### What happens at runtime?

At runtime, you can spawn thousands of instances of that Domain Type (e.g., spawn a new `PaymentWorker` domain for every incoming request). Because the compiler has already validated the *Type*, it knows every dynamic *instance* will strictly obey the safety and governance contract defined in the source code.

## Why Isolated Domains?

This architecture provides immense advantages for building highly resilient systems:

### 1. Failure Containment

If one domain hits an unhandled error, deadlocks, or corrupts its memory, the failure is mechanically trapped within that domain. The rest of the system continues uninterrupted.

### 2. Deep Deterministic Reasoning

Because domains cannot secretly mutate each other's state behind the scenes, the compiler can mathematically reason about causality. It knows exactly which messages trigger which transitions.

### 3. Natural Scalability

Domains communicate via messages. To the Ved code, it does not matter if Domain A and Domain B are sitting in the same CPU thread or if they are separated across distinct hardware nodes in different geographical regions. The code runs identically, giving Ved a natural path to transparent distributed clustering.

### 4. Independent Recoverability

Because each domain is isolated, it is saved via the runtime's snapshot semantics individually. If `OrderDomain[145]` crashes, the system doesn't need to roll back the entire cluster—it just reloads the snapshot for `OrderDomain[145]` exactly where it halted.
