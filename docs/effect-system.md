---
title: "The Effect System"
category: "2. Core Concepts"
order: 204
---

# The Effect System

To be useful, a control system must interact with the messy, non-deterministic outside world: it must call cloud APIs, query databases, read from hardware sensors, and handle network timeouts.

However, Ved enforces strict **deterministic execution**. Allowing a random HTTP call in the middle of a deterministic execution slice would instantly destroy the system's ability to accurately snapshot and replay its state.

Ved solves this paradox using a formal **Effect Boundary**.

## The Effect Boundary Principle

In Ved, a Transition cannot directly perform an external I/O operation. There are no blocking `fetch()` or `sql.query()` functions within a Domain's internal logic.

Instead, a slice calculates what needs to happen and emits an **Effect Intent**.

The lifecycle of an Effect operates across a strict boundary:

```text
Deterministic Slice → Effect Intent → Runtime Execution → Recorded Event → Next Slice
```

## The Effect Lifecycle

### Step 1: Intent Emission (Inside the Matrix)

During the execution of a Slice, the Domain emits an Intent message (e.g., `CreateVM(region="us-east", size="large")`).
Crucially, **publishing this intent does not mutate the external world**. It only mutates the local deterministic execution state by placing the intent into an outbound queue. the Slice then safely commits and yields.

### Step 2: Runtime Execution (Outside the Matrix)

The Ved Runtime—which operates *outside* the mathematical boundary of the Domain—reads the intent, makes the actual chaotic HTTP request out to AWS/Azure, and waits for a response. Because this happens in the background runtime, it does not block other Domains from making forward progress.

### Step 3: Event Logging

Once the external system responds (e.g., success, or a 504 Gateway Timeout), the Ved Runtime writes the exact result into an **Append-Only Event Log**, along with a correlation ID tying it back to the original intent.

### Step 4: Deterministic Event Injection (Return to the Matrix)

The Runtime queues the recorded HTTP response as an incoming mailbox message for the Domain. When the Scheduler triggers the Domain's next Slice, that Slice deterministically reads the result of the API call and updates its internal state.

## Perfectly Replayable Reality

This architecture is what gives Ved its superpowers.

Because external HTTP requests are stripped out of the core logic and replaced with `Intent → Recorded Log` patterns, you can download a production Event Log to your laptop and execute a perfect step-by-step playback of an exact orchestration collapse, without *actually* re-triggering production API calls. The local Ved runtime simply feeds the Domain the historical HTTP responses recorded in the file.
