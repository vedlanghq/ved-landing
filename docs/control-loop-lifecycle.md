---
title: "Control Loop Lifecycle"
category: "4. Execution Model"
order: 401
---

# Control Loop Lifecycle

In imperative languages, execution begins at `main()` and proceeds downward until the program exits. In Ved, there is no top-to-bottom procedural execution.

Instead, Ved programs execute as **Continuous Control Loops**, designed to observe state, evaluate goals, and execute transitions indefinitely.

## The 4-Phase Lifecycle

The Ved runtime manages every Domain through a rigid, infinitely repeating 4-phase execution loop.

### 1. Observation (Mailbox Ingestion)

The Domain wakes up and processes any asynchronous events or messages sitting in its mailbox.

* Did an external `Effect` complete (e.g., an AWS API successfully returned)?
* Did a parent Domain send a mutation command?
* Did an internal timer logically expire?

The Domain ingests these messages and deterministically updates its internal state.

### 2. Goal Evaluation

Once state is mutated, the runtime automatically evaluates all mathematical `target` Predicates defined in the Domain's Goals.

* Are we currently satisfying `target replicas >= 3`?
* Is `target database_connection == healthy`?

If all goals evaluate to `true`, the Domain is deemed stable and yields its CPU cycle. If any goals evaluate to `false`, the Domain enters the Planning phase.

### 3. Transition Scheduling

For every unsatisfied Goal, the Ved scheduler identifies the mapped `Transition` (reconciliation logic). The scheduler looks at the Goal's declared **Priority Level** (e.g., Critical vs Background) and places the Transition into the CPU's execution queue.

### 4. Deterministic Execution

The scheduler executes the Transition within strict **Execution Slices**. When a Slice completes successfully, the runtime persists the Domain's state to disk, emits any external `Effect Intents`, and the loop begins again at Step 1.

## Why a Control Loop?

Traditional CI/CD pipelines or deployment scripts are "fire-and-forget." If the script successfully finishes, it terminates. But if the server falls over 10 minutes later, the script cannot help you.

Ved models software as **Closed-Loop Control Systems** (like an airplane autopilot or a thermostat). The code is never truly "finished" executing; it is merely constantly ensuring that the physical reality of the system matches the declarative goals you programmed.
