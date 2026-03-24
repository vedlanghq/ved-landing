---
title: "Runtime Hot Upgrades"
category: "10. Advanced Topics"
order: 1005
---

# Runtime Hot Upgrades

In most enterprise backend environments, deploying a new version of the codebase means a forced restart:

1. Spin up the new v2 instances in a load balancer.
2. Drain connections from the v1 instances.
3. Once empty, kill the v1 instances.

For web servers, this is fine because HTTP requests are short-lived. But in Ved, a single Domain might be actively orchestrating a 7-day database migration workflow. Draining that connection is impossible.

Instead, Ved is designed to support **Deterministic Hot Upgrades**.

## The Execution Pause

Because Ved executes in highly isolated Deterministic Slices, a Ved node never has "hanging threads" blocking the CPU indefinitely.

When a Hot Upgrade is invoked by an Operator:

1. The Scheduler stops pulling new events from the Mailbox Router.
2. It waits a fraction of a second for all currently active slices to yield back control naturally.
3. At this moment, the entire Virtual Control Runtime achieves a state of mathematically perfect quiescence. All states are fully serialized to durable snapshots.

## The Logic Swap

While the runtime is perfectly paused:

1. The old v1 compiled bytecode is unloaded from memory.
2. The new v2 compiled bytecode is loaded into the engine.

## Schema Translation & Resumption

Before unpausing, the Runtime matches the old dormant Snapshots against the new v2 Schema requirements.

* If a Domain state schema changed, the Runtime immediately executes the Developer's strict `v1_to_v2` pure transition function on the snapshot, generating a brand new v2 snapshot instantly.
* If a Goal Predicate changed, the new AST is simply bound for the next evaluation.

Finally, the Scheduler unpauses.

The Domain wakes up exactly where it was in its 7-day orchestration lifecycle. It reads its next message from the mailbox, evaluates its Goal using the new v2 Predicate logic, and seamlessly continues working. No TCP connections were artificially constrained, and no manual database patches were run.
