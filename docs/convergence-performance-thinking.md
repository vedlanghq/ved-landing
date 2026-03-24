---
title: "Convergence Performance"
category: "10. Advanced Topics"
order: 1004
---

# Convergence Performance Thinking

If developers coming from Python or Go look at Ved, their first question is usually: *"Wait, why doesn't my Domain just call the API directly instead of generating an Intent, packaging it, passing it through a runtime boundary, saving to a journal, and then waiting for an event to come back? Isn't that slow?"*

The answer is yes. In terms of strict latency for a single operation, a deterministic effect loop is slower than a direct `curl` command.

But Ved is not designed to be a high-frequency trading platform handling microsecond network packets. It is designed to be a structurally indestructible control plane.

## The Performance Paradigm

In standard architectures, performance is measured by **Latency** (how fast did this HTTP request finish?).

In Ved, performance is measured by **Time To Quiescence** (how fast did the entire disturbed cluster reach algorithmic stability?).

### 1. Avoiding Lock Contention

Because Domains are perfectly isolated, they never share memory. Therefore, there are no Mutex locks. While a traditional multi-threaded infrastructure script spins, waiting for a Thread Lock to release so it can modify the "cluster_size" variable, 100,000 independent Ved Domains can evaluate their predicates into memory scratchpads completely in parallel.

### 2. Algorithmic Backpressure

If an external API (like AWS EC2 provisioning) starts throttling your requests, traditional scripts will just keep hitting the endpoint and failing. Ved's Mailbox Router inherently understands congestion. If the Effect Adapter detects HTTP 429s, it stops scheduling Goal retries for that scope. The runtime physically saves CPU cycles by putting the Domain to sleep until it is statistically profitable to wake it back up.

### 3. State Locality

Because Ved's state is persistent, a Ved program doesn't need to boot up and run a massive `SELECT * FROM databases` to figure out what it needs to reconcile. The last known valid snapshot is already sitting cleanly in the Domain's memory partition. It inherently caches the entire universe.

The trade-off of a few milliseconds of formal boundary serialization yields an architecture that cannot be deadlocked, cannot suffer race conditions, and inherently protects external targets from overwhelming request storms.
