---
title: "State Schema Evolution"
category: "6. Language Design"
order: 605
---

# State Schema Evolution

Ved is designed for **long-lived evolving systems**. In Ved, program execution is intertwined with its Durable Snapshots. Because a Ved Domain can effectively run for months or years via mathematical pauses and resumptions, the schema of its underlying state will eventually need to change.

If you add a new field to a Domain's state block, how does the runtime load the old, pre-migration Snapshot into the new un-started program version when the deployment rolls out?

## The Problem With Unmanaged Evolution

In traditional systems, schema evolution involves manual database migration scripts (`ALTER TABLE`), maintenance windows, and brittle conversion tools. If this complexity is pushed to the developer in an ad-hoc manner, they will inevitably write non-deterministic data patch tools, violating Ved's guarantee of structural production correctness.

If old Snapshots become unreadable to the new Domain structure:

* Deployments fail unpredictably.
* Recovery logic becomes fragile.
* Rollbacks become dangerous.

## Ved's Built-In Versioning Model

Ved treats **Schema Evolution as a first-class language capability**.

Instead of over-automating migrations with "black box" magic, Ved implements a pragmatic architecture:
> **Built-in versioned state schemas + developer-defined migration logic.**

### 1. Schema Version Tagging

Every `domain` block's state is strictly versioned by the compiler.

```ved
domain PaymentGateway {
    @version 2 // Incrementing marks an evolution edge
    state {
        status: String
        retryCount: Int // newly added field in v2
    }
}
```

### 2. Deterministic Migration Transitions

If the compiler sees a state block incremented to version 2, but the previous snapshot on disk is version 1, it requires the developer to define an explicit, pure, deterministic transition function detailing how to migrate the old schema into the new shape.

```ved
migration v1_to_v2 {
    from: PaymentGateway.State@1
    to: PaymentGateway.State@2

    // Deterministically build the new shape
    return PaymentGateway.State@2(
        status = from.status,
        retryCount = 0 // initialise the new field safely
    )
}
```

### 3. Safe Snapshot Upgrade Path

During a runtime upgrade, the Virtual Control Runtime intercepts the old v1 Snapshot before slicing into the new software logic. It pushes the v1 Snapshot through the `v1_to_v2` migration transition.

Because this transition is absolutely pure and deterministic, the resulting v2 state is perfectly predictable. The runtime immediately snapshots the newly minted v2 state and resumes the control loop gracefully.

### Zero-Downtime Structural System Evolution

By embedding these mechanisms into the type-checking and deployment phases, the compiler can analyze migration risks, detect incompatible structural changes, and enforce forward/backward compatibility before a single line of code hits production.
