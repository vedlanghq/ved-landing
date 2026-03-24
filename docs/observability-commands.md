---
title: "Observability Commands"
category: "8. Tooling & CLI"
order: 805
---

# Observability Commands

Because Ved operates deeply within the paradigm of Control Loops and Domains rather than simple monolithic CPU-bound execution threads, standard UNIX observability commands (like `top` or `ps`) are not expressive enough.

The Ved CLI offers built-in operational probes designed specifically to peer inside the Virtual Control Runtime.

## Live Cluster Inspection

### `ved get domains [--status <status>]`

Returns an aggregate list of all registered state domains actively hosted on the local runtime.

* *Example Output:* Shows the logical ID, current active version, total accumulated mail queue depth, and internal lifecycle status (`ACTIVE`, `DEGRADED`, `FAULTED`).

### `ved get goals <domain_id>`

Displays the current resolution status of all goals running within a specific Domain.

* *Example Output:* Tracks the current Evaluation Predicate boolean, the measured Drift Time, and the priority ranking configured by the Deterministic Scheduler.

## Execution Analysis

### `ved trace effect <effect_id>`

Pulls the complete lifecycle history of a specific Effect execution. Because the Effect Adapter is split across the Execution Boundary, this command links the pure-slice `Intent Emission` with the external `Adapter Execution` and the final `Event Receipt`.

### `ved top`

An interactive terminal dashboard mirroring the philosophical interface of UNIX `top`, but tailored for the Ved Scheduler.
Provides real-time graphical representations of:

1. **Slice Budgets:** Which domain is consistently consuming its entire time slice before yielding.
2. **Mailbox Pressure:** Which domains are struggling to clear their incoming asynchronous message queues.
3. **Quiescence Status:** A holistic cluster view of what percentage of the physical infrastructure has successfully reached its declarative target states.

## Log Querying

Because of snapshot persistence and the immutable message journal, Ved logging is natively deterministic.

### `ved logs query "priority >= 50 && domain == 'PaymentGateway'"`

Instead of applying `grep` to unstructured application strings, operators can query the structured JSON events flowing through the Virtual Control Runtime, inspecting the actual state shapes as they evolved tick by tick.
