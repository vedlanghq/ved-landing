---
title: "What is Ved"
category: "1. Introduction"
order: 101
---

# What is Ved

**Ved is a deterministic, declarative systems programming language designed for engineering reliable, long-lived distributed system evolutions.**

Traditional programming focuses on imperatively executing instructions—describing *how* a machine should transition from point A to point B. Ved challenges this paradigm. Instead of micromanaging the machine's state transitions, Ved focuses on **driving systems toward desired goals safely and reproducibly.**

It achieves this by elevating the concept of "Convergence" to a native runtime guarantee.

---

## The Vision: Programming as Controlled System Evolution

Modern software systems are no longer short-lived processes that run, compute, and terminate. They are persistent, continuously evolving control systems that must:

* Scale across dynamic environments
* Inevitably survive infrastructure and network failures
* Continuously converge toward operational goals
* Remain auditable and perfectly reproducible

Ved aims to provide a programming model where the developer's primary job is defining **what the system should become — not just what it should do next.**

The runtime takes on the responsibility of planning and executing deterministic steps toward convergence.

---

## Core Ideas at a Glance

### 1. Deterministic Execution

At its lowest layer, Ved provides ironclad execution determinism. Given the same program, state, and inputs, the Ved runtime guarantees identical system evolution across any environment. This solves the "works on my machine" problem permanently, enabling reproducible incident debugging and highly reliable CI/CD simulation validation.

### 2. Declarative Desired Goals

Instead of writing explicit looping constructs that babysit an external system, Ved programs define **goals with convergence strategies**.
If the goal is to *ensure service replicas reach a target count*, you declare exactly that. The Ved runtime continually plans the deterministic steps needed to reach that baseline and executes them safely.

### 3. Persistent Runtime Model

Ved treats programs as **long-lived evolving systems**.
The execution state is snapshotted continuously and automatically by the runtime. If the runtime node crashes or loses power, execution accurately resumes exactly where it left off upon recovery. Convergence continues without manual intervention or corrupt state artifacts.

### 4. Domain-Oriented State Isolation

In Ved, system state is deliberately partitioned into independent `domains`. Each domain owns its persistent state and processes asynchronous messages from the outside world. They evolve via completely deterministic `transition slices`. This prevents cross-contamination, enforces clear authority, and provides natural boundaries for failure containment.

---

## The Name

**Ved** (interestingly, the reverse of "Dev") reflects a fundamental shift in thinking.

From writing code that merely runs instructions and mutates memory **to defining systems that constantly observe, stabilize, and evolve.**
