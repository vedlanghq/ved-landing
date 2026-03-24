---
title: "The Mailbox Model"
category: "5. Runtime Architecture"
order: 502
---

# The Mailbox Model

Interacting directly with shared data across different execution boundaries leads to data races, corrupt memory, and hard-to-debug crashes. The Ved Runtime entirely sidesteps this via a strict **Mailbox Model** inspired heavily by the Erlang/OTP ecosystem.

## Message Passing Semantics

In Ved, a Domain functions as an isolated Actor. You cannot call `domain.updateData()`. Instead, a Domain receives asynchronous intents in the form of **Messages** placed into its Mailbox.

### 1. The Queue

Every instantiated Domain possesses a single, FIFO (First-In, First-Out) mailbox queue. As the wider ecosystem generates data (e.g., API responses, system warnings, user commands), the Mailbox Router safely deposits these messages at the end of the Domain's queue.

### 2. Sequential Processing

A Domain never processes two messages at the physical same time. The Ved Scheduler guarantees that a Domain will only process its mailbox sequentially, one message per Execution Slice. This entirely eliminates the need for Mutexes, Locks, and Semaphores within your application logic. The logic is intrinsically race-condition free.

### 3. Persistent Inboxes

Because messages might arrive right as a data center loses power, the Ved Mailbox Router integrates with the Snapshot Engine. When a message is successfully appended to a Domain's mailbox, it is written to durable storage as part of the overall state snapshot.
If the node crashes before the Domain can read the message, the runtime trivially recovers it on boot. Messages are never "lost in the ether."

## Backpressure and Flow Control

A common failure mode in distributed messaging is a "Message Storm," where a faulty component spams a downstream Domain with millions of requests per second, exhausting memory.

The Ved Runtime dynamically monitors the depth of every Mailbox. If a Mailbox begins filling faster than the Domain can process it, the Runtime implements **Algorithmic Backpressure**. It will intentionally throttle the execution priority of the sender, preventing the queue from exploding, ensuring the system degrades gracefully rather than collapsing entirely.
