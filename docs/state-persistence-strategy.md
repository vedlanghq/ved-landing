---
title: "State Persistence"
category: "5. Runtime Architecture"
order: 503
---

# State Persistence Strategy

If Ved's only promise was "determinism", an in-memory graph would be perfectly fine. But because Ved must orchestrate long-lived systems that inevitably survive machine failures, the state inside a Ved application must seamlessly persist to durable storage.

## The Flaw with Event Sourcing

Many distributed control implementations attempt persistence by writing an infinite log of all operations to disk (Event Sourcing). If the system crashes, it reads the log and replays history to rebuild current state.
While conceptually pure, Event Sourcing introduces major performance problems at system scale. If a system runs for 6 months processing millions of transitions, rebooting the runtime takes hours to replay the log.

## Copy-On-Write (COW) Snapshots

Ved uses a radically optimized **Snapshot-First Persistence Layer** backed by Copy-On-Write data structures.

When you declare variables inside a Domain's `state` block, they are not standard mutable heap pointers. They inherently belong to a persistent data structure tree managed by the Runtime.

At the end of an Execution Slice, the Runtime does not mutate the original state directly. It simply points the root node of the state tree to the new Delta (the data that changed during the Slice). Because the previous state remains intact, the Snapshot Engine can asynchronously stream the difference to disk as a highly compressed block without blocking the CPU from executing the next Slice.

## Why This Matters

This architecture fundamentally alters the speed of disaster recovery:

1. **Instant Cold Starts:** When a Ved Runtime node crashes and restarts, it does not replay history. It loads the exact binary representation of the most recent atomic snapshot from disk instantly.
2. **Infinite Durability:** You don't have to build complex external PostgreSQL databases to store the state of your infrastructure logic. The internal application variables are mathematically guaranteed to exist precisely exactly as they did right before the crash.
