---
title: "Roadmap"
category: "11. Project & Contribution"
order: 1101
---

# Roadmap (v0.1 to v1.0)

Ved is currently in the **Foundational Research and v0.1 Build Phase**. Our goal is not to ship a massive, bloated standard library, but to perfectly execute the core architectural invariants (Determinism, Authority Typing, and Asynchronous Mailboxing).

## Phase 1: The Single-Node Core (v0.1)

* **Compiler Inference Engine:** Basic parsing of Script and System modes, emitting strict DAGs, and validating the Effect Boundary.
* **Virtual Control Runtime:** A single-threaded deterministic scheduler, Mailbox router, and simple JSON-based snapshot persistence layer.
* **Effect Adapter Framework:** The standard FFI (Foreign Function Interface) for bridging the core to simple effects like `Network.HTTP` and `System.File`.
* **Testing Harness:** The initial local Time-Travel Simulation engine.

## Phase 2: Authority & Governance (v0.2)

* **The Authority Type Lattice:** Actually wiring the compiler to reject code based on Authority Scope annotations (`Environment` vs `Workspace`).
* **Schema Evolution:** Formalizing the `migration` transition block and ensuring the runtime can load old snapshots correctly.
* **Advanced Linter:** Implementing the algebraic checks for idempotency keys within effect intents.

## Phase 3: Distributed Maturation (v0.8)

* **The Replicated Journal:** Swapping the local JSON journal for a highly-available, Raft-driven event log.
* **Multi-Node Scheduling:** Allowing the runtime to safely shard Domain ownership across multiple physical nodes without losing replay guarantees.
* **Network Partitions:** Implementing strict degraded operations during split-brain scenarios.

## Phase 4: Production Ecosystem (v1.0)

* Stable Language Specification.
* Comprehensive standard library of Cloud Provider Effect Adapters (AWS, GCP, Kubernetes).
* Integrated IDE Extensions (Real-time authority and linting feedback).
