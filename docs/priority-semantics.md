---
title: "Priority Semantics"
category: "4. Execution Model"
order: 402
---

# Priority Semantics

When building self-stabilizing control systems, not all outages are created equal. A background log-rotation task failing is less relevant than the primary database proxy going offline.

Because Ved uses a **Deterministic Scheduler**, it needs mathematical rules to decide what action to compute first when an environment experiences catastrophic drift (such as a region-wide networking failure).

## The Priority Levels

Ved provides 5 native priority levels that can be attached to any Goal or Transition:

1. **`critical`**: Immediate preemption. Drops whatever the runtime is currently doing and schedules this logic over all other slices. Reserved for failovers, emergency state locks, and severe system health violations.
2. **`high`**: High aggression scheduling. Scheduled immediately after any currently executing `critical` slices.
3. **`normal`**: The default level. Standard system evolution and operations.
4. **`low`**: Batch jobs, secondary reconciliation loops, cache warming.
5. **`background`**: Execution only happens if the runtime's CPU is completely idle and no other goals are pending.

## Preemption & Interruption

Because Ved breaks Transitions into discrete Execution Slices, it implements **Yield-on-Slice Preemption**.

If Domain `DataCleaner` is currently executing a `low` priority task, it is not brutally interrupted mid-computation. Instead, the runtime waits for the current 5-millisecond Slice to finish. At the boundary—before the next slice begins—the Ved scheduler identifies a new `critical` event, snapshots `DataCleaner`'s state safely, and hands the CPU over to the critical Domain.

## Handling Priority Conflicts

If two Goals at the exact same priority level trigger simultaneously, Ved cannot pick one "at random", as this breaches core reproducibility guarantees.

Instead, the Scheduler uses a mathematical **Deterministic Arbitration Tie-Breaker**:

1. First, it looks at the **Authority Scope** (e.g., Environment operations take precedence over Workspace operations).
2. If scopes match, it falls back to the **Lexical Identifier** of the Goal (alphabetical hash sorting of the Goal's internal ID).

This ensures that even in the chaotic situation of a multi-system failure, the recovery path the runtime chooses will be identical whether it runs in production AWS or simulated locally on your laptop.
