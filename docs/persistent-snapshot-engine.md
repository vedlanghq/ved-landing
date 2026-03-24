---
title: "Persistent Snapshot Engine"
category: "3. Architecture"
order: 302
---

# Persistent Snapshot Engine

One of the most complex tasks in building long-lived distributed systems is managing persistence. When an orchestration process crashes halfway through a deployment, how does it remember where it was?

Usually, developers are forced to manually orchestrate states into an external database (e.g., PostgreSQL or Redis) after every major step, ensuring they can reload context upon reboot.

Ved removes this burden entirely by pulling persistence down into the runtime itself via the **Persistent Snapshot Engine**.

## Automatic Durable State

In Ved, you do not write explicitly to a database to save your execution progress. You simply declare the state schema inside your Domain, and the runtime handles the rest.

At the exact moment a Deterministic Execution Slice successfully finishes computing, but before the next slice begins, the Ved runtime mechanically performs an atomic snapshot of that Domain's internal state.

If the underlying hardware loses power or a Kubernetes node fails, the Domain is immediately rescheduled onto a healthy node. That node reads the latest snapshot, loads the exact memory context, and resumes the exact next slice. *The Domain itself does not even know it died.*

## Snapshot vs Event Sourcing

Many high-reliability systems use Event Sourcing (recording every single action that ever occurred in an infinite log) to achieve safety. However, replaying massive 5-year-old event logs to achieve current state is incredibly slow and expensive.

Ved uses a **Snapshot-First Architecture**.

* **Primary Recovery:** The snapshot is the canonical truth. Crash recovery is near-instantaneous because the runtime just loads the latest image into memory, bypassing the need to replay thousands of historical events.
* **Bounded Causal Journals:** To preserve deep auditability and debugging capabilities without infinitely growing storage, Ved keeps a small, mathematically structured trail of recent `Effect Events` and `Intent Lineages`, discarding older events as state stabilizes.

## Structural Consistency

To achieve this rapidly, the Ved persistent state model is built using advanced Copy-on-Write (COW) memory structures. When a transition occurs, it does not destroy the old state in memory immediately. It creates a new delta state. This allows the runtime to flush the previous valid state to disk asynchronously, meaning snapshotting does not severely block the execution thread.

By eliminating external database connections for core control-loop state, Ved dramatically reduces latency and completely eliminates whole classes of network-retry bugs.
