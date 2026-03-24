---
title: "When to Use Ved"
category: "1. Introduction"
order: 104
---

# When to Use Ved

Ved is a specialized general-purpose language. While you *could* write anything in it, its architectural constraints are heavily optimized for specific domains where reliability, convergence, and auditability are non-negotiable.

## Ideal Use Cases

If your application matches these characteristics, Ved is the perfect tool for the job:

### 1. Cloud-Native Control Planes

Building backend controllers that constantly watch infrastructure, detect drift, and schedule remediation steps. Ved’s native goal semantics entirely eliminate the boilerplate of writing custom reconciliation loops.

### 2. Complex CI/CD and Rollout Orchestration

Deployment pipelines involving multiple stages, canary analysis, database schema migrations, and automated fallbacks. Ved’s deterministic nature ensures that CI simulation behaves exactly like physical production deployment.

### 3. Highly Regulated Infrastructure

Systems for finance, healthcare, or government where extreme audibility is required. Because Ved isolates authorities computationally and persists perfectly replayable state snapshots, compliance and forensic auditing become a strictly mathematical guarantee.

### 4. Distributed State Management

Systems that need to manage long-lived state across unreliable networks, such as managing the lifecycle of billions of IoT devices, connected vehicles, or distributed gaming server fleets.

## When NOT to Use Ved

Ved imposes deliberate constraints (such as restricted wall-clock time, strict state persistence, and mandatory isolation) to achieve determinism. These constraints make it a poor fit for certain problems:

### 1. High-Frequency / Low-Latency Systems

Do not use Ved for High-Frequency Trading (HFT) engines, real-time multimedia rendering, or physics simulations. Ved runtime commits incur persistence and logging overhead to guarantee correctness.

### 2. Ephemeral Scripts

If you just need to parse a CSV file, ping a server rapidly, or pipe shell commands together temporarily, Ved is severe overkill. Use Python, Bash, or Go instead.

### 3. Pure Algorithmic Computation

If your task is purely mathematical (e.g., training a neural network, calculating a fractal, sorting an in-memory gigabyte array), the orchestration features, state persistence, and deterministic constraints of Ved will simply slow you down. Rust or C++ are the correct tools for those environments.

---

**Summary:** Reach for Ved when your primary enemy is state corruption and non-deterministic operational failure — not when your primary enemy is raw CPU cycles.
