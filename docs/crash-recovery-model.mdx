---
title: "Crash Recovery Model"
category: "5. Runtime Architecture"
order: 506
---

# Crash Recovery Model

In imperative systems, if a server crashes midway through a complex orchestration, you are typically left with an unknown state. The database might have committed a row, but the external API didn't fire, or vice versa. Recovery requires custom scripts, dead-letter queue manual inspections, and significant human intervention.

In the Ved Runtime, crash recovery is not a theoretical edge-case—it is a mathematical certainty derived directly from the Snapshot Architecture and the Effect Execution Boundary.

## The Snapshot Foundation

Because all mutations in a Domain occur inside highly isolated **Deterministic Slices**, a Domain is never allowed to be in an "invalid" state.

1. A mailbox message is given to a Domain.
2. The domain copies its current state into a scratchpad (Copy-on-Write).
3. The domain calculates the new target state.
4. The Virtual Control Runtime takes a durable filesystem snapshot of the new state **before** completing the slice.

### What happens if the power is pulled during step 3?

The snapshot is never written. When the server reboots, the runtime automatically loads the previous valid snapshot. The mailbox message that initiated the slice was never formally acknowledged, so the Mailbox Model simply replays the exact same message against the exact same snapshot. Because the slice is deterministic, the exact same result is recalculated, successfully snapshotting this time.

## Recovering Impure Effects

If your deterministic code calculates an intent to create an AWS S3 bucket, it emits an **Effect Intent**.

### What happens if the server crashes after the intent is emitted, but before the AWS API responds?

The runtime's Effect Adapter relies on external idempotency and polling.

1. When the system restarts, the pure Domain examines its snapshot.
2. The snapshot shows that the `CreateBucket` goal is in an `active_pending` state.
3. The Control Loop immediately notices the discrepancy between the desired goal and the current lack of a success event.
4. The Domain automatically re-evaluates the condition and re-emits the exact same Effect Intent.

If the AWS API successfully created the bucket during the blackout, the second identical API call will return a "Resource Already Exists" success (thanks to idempotency keys). The Effect Adapter will translate this to a `Bucket_Created_Event` and deliver it into the pure Domain, completing the delayed cycle seamlessly.

## Zero-Code Recovery

The end result of this architecture is **Zero-Code Recovery**.
You do not write `try/catch` blocks for server outages.
You do not write manual database rollback scripts.

If the physical server burns to the ground, you simply point a new Ved Runtime instance at the persisted durable filesystem (or distributed KV store). The runtime loads the snapshots, observes the pending domains, resumes the control loop, and mathematically continues executing exactly where it left off.
