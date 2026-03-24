---
title: "Execution DAG"
category: "3. Architecture"
order: 304
---

# Execution DAG

Because Ved enforces that all external I/O goes through the Effect System and all Transitions are built out of discrete Deterministic Slices, the Ved Compiler is capable of doing something unique: it can map the entire orchestration flow of a system as a **Directed Acyclic Graph (DAG)** before the code ever runs.

## The Problem with Branching Scripts

When you write a normal script, the runtime has no idea what will happen on line 20 until it executes line 19. If line 19 contains a dynamic `if (network_request() == true)`, the execution tree branches dynamically in real time.

This makes it impossible for the runtime to optimize scheduling, pre-fetch data, or simulate failures accurately—it's flying blind.

## Static Inference of Causality

In Ved, because of its structured semantics, the compiler builds a rigid causal graph of how state will evolve:

* `Slice 1` -> calculates parameters.
* `Effect Intent` -> sends an API request.
* `Slice 2` -> processes API result.
* `Message` -> triggers `Domain B` Transition.

The compiler analyzes this and constructs the Execution DAG.

### Why the DAG Matters

1. **Deadlock Detection:** Before you deploy, the compiler traces the DAG to ensure two Domains don't create circular dependencies or infinite message loops across scopes.
2. **Parallel Scheduling Optimization:** If `Slice A` in Domain 1 and `Slice C` in Domain 2 do not share any causal ancestry or authority scope conflict in the DAG, the Deterministic Scheduler knows it can safely assign them to different physical CPU cores simultaneously without breaking determinism.
3. **Automated Compensation Paths:** If the DAG shows that `Slice 2` relies on an Effect that might fail, the compiler forces the developer to write a fallback branch. The DAG inherently maps the "happy path" and all "compensation paths" statically.

## Consequence Awareness

By elevating execution beyond dynamic code into a static Execution DAG, Ved achieves **Consequence Awareness**.

The runtime literally knows the future consequences of a Transition before it executes the first instruction. It knows what scopes might be mutated, what effects will be scheduled, and what other domains will be woken up, enabling a fundamentally safer model of operations automation.
