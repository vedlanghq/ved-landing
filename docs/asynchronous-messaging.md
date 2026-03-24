---
title: "Asynchronous Messaging"
category: "2. Core Concepts"
order: 205
---

# Asynchronous Messaging

In Ved, there is no shared mutable state. Domains cannot reach into the memory of other Domains and change their data, nor can they invoke synchronous, blocking functions on one another.

Instead, all inter-domain communication and system evolution happens through **Explicit Asynchronous Message Passing**.

## The Mailbox Model

Every Domain instance operates conceptually like an Actor with a dedicated **Mailbox**.
If `BillingDomain` needs `InventoryDomain` to release stock, it cannot call `inventory.release()`. Instead, it sends an asynchronous, strongly-typed message:

```text
send InventoryDomain[88] ReleaseStock(item_id: "A12", qty: 1)
```

The `BillingDomain` emits the message and continues its execution slice without blocking. The Ved Runtime routes the message and places it into the `InventoryDomain`'s mailbox, where it will be processed deterministically in a future execution slice.

## Why Asynchronous Messaging?

This design choice, inspired heavily by Erlang/OTP, forces engineers to build distributed systems that are fundamentally decoupled.

### 1. Eliminating Race Conditions

Because Domains process one message at a time sequentially from their mailbox, there are no thread-level race conditions. Two concurrent network requests attempting to update the same state are automatically serialized into orderly mailbox execution.

### 2. Causal Traceability

Because communication happens via explicit messages containing correlation IDs, the Ved runtime can build a perfect causal graph of system execution. If an infrastructure node cascades into failure, you can trace the exact chain of messages that led to the event.

### 3. Native Delivery Guarantees

Because Ved is a *persistent* runtime, messages are not stored in volatile RAM.
When a message is sent, it is durably committed to the state snapshot. If a hardware node loses power while a message is in transit, the message is not lost. When the runtime recovers, the message is seamlessly delivered to its target. Ved guarantees **replayable at-least-once delivery**.

### 4. Transparent Network Boundaries

Because `Domain A` does not know whether `Domain B` is running on the same CPU core or in a datacenter across the globe, Ved code is naturally network-transparent. The asynchronous message semantic is identical in both scenarios, making horizontal clustering an operational detail rather than an application-layer rewrite.

## Protecting Against Message Storms

A common failure mode in message-driven orchestration is "message storms"—where an infinite loop of retries floods the mailboxes of downstream systems. Ved mitigates this via its runtime scheduler, which implements native backpressure, throttling, and oscillation detection to prevent runaway message generation.
