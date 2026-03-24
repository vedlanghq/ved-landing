---
title: "Scheduler Policies"
category: "10. Advanced Topics"
order: 1003
---

# Scheduler Policy Extensions

In v0.1, the Ved runtime ships with a default `Deterministic Arbitrator` scheduler policy. It prioritizes executing Domains strictly by their declared integer `priority` and uses a predictable Round-Robin algorithm to resolve identical priority ties in the active queue.

However, as projects mature into global architectures, operators will need to alter how the runtime allocates physical CPU time to domains.

## The Extensibility Contract

Ved schedulers are designed as swappable, formal plugins. You can compile the runtime with a custom Scheduler Policy written in Rust that implements the `ved_scheduler_interface`.

Because Domains communicate via asynchronous mailboxes and mutations happen in perfectly isolated slices, you can safely swap the entire algorithm that decides *which* slice runs next, without risking memory corruption or state races.

## Theoretical Policy Models

### 1. The Fair-Share Debt Policy

If a `TenantDomain` generates 100,000 asynchronous messages and floods the queue, a strict Priority scheduler would starve out the other tenants in the system during the reconciliation storm. A Custom Fair-Share policy tracks the historical slice-time debt of every Domain and artificially deprioritizes domains that are monopolizing the Mailbox Router, ensuring multi-tenant latency stability.

### 2. The Authority-Weighted Policy

To enforce deep enterprise security architectures, an Operator might write a policy that inherently gives `Tenant` and `Environment` scope Domains 2x the CPU slice budgets of `Workspace` scope domains, artificially ensuring that Top-Level governance transitions converge faster than leaf-node workers.

### 3. The Energy Aware Policy

For heavily distributed environments, an Operator might write an Energy Aware Policy. The scheduler connects to external server metrics, polling the battery-draw or instance cost. When the node gets expensive or resource-constrained, the Scheduler dynamically halts the processing of all `BatchProcess` goals and explicitly reallocates all slice execution time purely to `Maintenance` or `P1` operational states.
