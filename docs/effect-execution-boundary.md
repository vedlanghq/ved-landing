---
title: "Effect Boundary"
category: "5. Runtime Architecture"
order: 504
---

# Effect Execution Boundary

The defining requirement of a deterministic language is that running the exact same code with the exact same starting state must always yield the exact same resulting state.

If a developer embeds an HTTP call inside a function (e.g., `requests.get("https://aws.amazon.com/...")`), determinism is instantly destroyed. AWS might be down, the internet might latency-spike, or the clock on the machine might be skewed.

Ved solves this paradox gracefully via the **Effect Execution Boundary**.

## The Hard Partition

The Ved Runtime is mathematically split into two zones:

### 1. The Pure Zone (Inside the Sandbox)

The code you write inside a `Domain` and its `Transitions` lives here.
It cannot read the system clock. It cannot generate random numbers. It cannot open a network socket. It cannot read a file. It is a sealed cryptographic math equation.

### 2. The Impure Zone (Outside the Sandbox)

The `Effect Adapter` module within the Ved Runtime lives here. It is fully aware of the messy real world. It has TCP sockets, file system access, and wall-clock time.

## Crossing the Boundary

When your code in the Pure Zone realizes it needs to call an external API, it creates an **Effect Intent**.

```ved
// 1. The code safely declares an intent
intent = CreateVirtualMachine(size: "large")

// 2. It emits the intent over the boundary, instead of executing it
emit intent
```

Once the `emit` keyword is executed:

1. The intent perfectly crosses the boundary out of the Pure Zone.
2. The Deterministic Slice ends safely.
3. The *Impure Zone* (The Effect Adapter) picks up the packet and actually initiates the TCP request to the AWS API.

## The Return Journey

While the AWS API computes for 3 minutes, the Pure Zone is not blocked—other Domains continue to execute freely.

When AWS finally returns an HTTP 200 Success:

1. The Effect Adapter in the Impure Zone catches the response payload.
2. It wraps it in an immutable Event object (`VM_Created_Success_Event`).
3. It durably logs the event to disk.
4. It throws the Event across the boundary back into the initial Domain's Mailbox.

The Domain wakes up, reads the Event predictably from its Mailbox, and mathematically updates its Pure State. The physical network call was successfully executed without ever poisoning the determinism of the language.
