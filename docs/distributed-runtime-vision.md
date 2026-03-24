---
title: "Distributed Runtime"
category: "10. Advanced Topics"
order: 1001
---

# Distributed Runtime Vision

While the v0.1 release of Ved implies a single-node Virtual Control Runtime, the language semantics (isolated domains, asynchronous mailboxes, copy-on-write snapshots, and deterministic execution) were custom-designed to support a globally distributed runtime.

If a language relies on shared memory mutexes, distributing it across a network becomes a nightmare of race conditions and distributed locks. Because Ved enforces strict Domain isolation, distributing Ved is mathematically elegant.

## The Target Topology

A future distributed Ved cluster consists of:

* Multiple physical runtime nodes.
* A shared logical execution timeline (driven by Raft-style consensus).
* Partitioned domain ownership.
* A replicated, append-only Effect Journal.

## Domain Placement & Ownership

To preserve determinism in a distributed environment, every active Domain instance requires a **single active execution owner**. Two nodes can never execute slices for the same Domain simultaneously.

If a Ved program scales to 1,000,000 isolated `Worker` domains, the global scheduler simply shards the domain IDs across the available runtime nodes. Because Domains only communicate via asynchronous mailboxes, Node A simply serializes its message into the distributed journal and Node B picks it up on the next tick.

## Authority-Aware Placement

Because Ved's type system natively understands *Authority Scopes* (e.g., Tenant > Environment > Workspace > Target), the distributed scheduler can enforce physical data locality based on logical authority.

* **Tenant-Level Domains:** (e.g., Global Billing) These require the highest consistency. The scheduler pins these domains to the primary consensus leader node.
* **Target-Level Domains:** (e.g., Individual Server Checks) These require high throughput but low global consistency. The scheduler distributes these freely across hundreds of edge nodes.

## Network Partitions (Split Brain)

When a network partition occurs, a distributed system must choose between Availability and Consistency (the CAP theorem).

Because Ved is designed for safe infrastructure orchestration, **Ved always chooses Consistency (Determinism) over Availability**.

If a cluster splits, the minority partition instantly loses the ability to append to the Effect Journal. Without the ability to write to the journal, the local schedulers strictly suspend execution. They enter a `degraded` mode, refusing to fire infrastructure-mutating Effects until they reconnect to the quorum, preventing "split-brain" orchestration thrashing.
