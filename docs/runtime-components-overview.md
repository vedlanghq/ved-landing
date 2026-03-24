---
title: "Runtime Components"
category: "5. Runtime Architecture"
order: 501
---

# Runtime Components Overview

Unlike standard compiled languages (like C or Go) that output a monolithic binary tied strictly to the underlying Operating System's abilities, Ved ships as an integrated **Virtual Control Runtime**.

The Ved Runtime acts as a deterministic mini-OS designed specifically for managing state evolution. It is mathematically segregated into distinct components mapping the "Pure" logic of your code from the "Impure" reality of the machine.

## The Component Architecture

1. **The Scheduler (The Brain)**
The orchestrator of all execution. It maintains a global queue of Domains, evaluates Priorities, and allocates CPU time via discrete Execution Slices. It alone decides who runs and when they are preempted.

2. **The Goal Evaluator (The Observer)**
A mathematically pure subsystem that runs immediately after a Domain mutates its state. It evaluates the boolean status of all spatial Targets/Goals and calculates if the system is in "Quiescence" or needs reconciliation.

3. **The Mailbox Router (The Network)**
The asynchronous messaging bus. It accepts Intent Emissions from Domains and guarantees exactly-once delivery routing to the target Domain's inbox, whether that Domain lives on the same CPU thread or across a physical datacenter boundary.

4. **The Snapshot Engine (The Disk)**
The memory persistence layer. When the Scheduler finishes executing a Slice, the Snapshot Engine takes the Copy-On-Write memory graph and durably serializes the current canonical state to disk.

5. **The Effect Adapter (The Hands)**
The *only* component in the Ved Architecture allowed to interact with the outside world. If your code needs to call the AWS API, the Effect Adapter performs the actual HTTPS request outside the deterministic boundary, formats the response, and places the result event back into the Mailbox Router as a historical fact.
