---
title: "Spatial Authority Model"
category: "3. Architecture"
order: 301
---

# Spatial Authority Model

Traditional programming languages assume that if a block of code has access to a network socket or a database driver, it is allowed to use it. Governance—deciding whether an engineer's script should *actually* be allowed to delete a production database—is typically shifted entirely onto external identity systems (like AWS IAM) and assumed at runtime.

Ved takes a radically different approach. It builds **Spatial Authority** directly into the language's Type System.

In Ved, Authority answers the question:
> *Where in the system universe is this code mathematically allowed to act?*

## The Authority Lattice

Every executing Domain and Transition in Ved is strictly bound to an Authority Scope. These scopes form a directional lattice (a hierarchical tree). A standard operational lattice might look like this:

1. `Tenant`
2. `Environment` (e.g., Prod, Staging)
3. `Workspace` (e.g., Payments, Inventory)
4. `Target` (e.g., AWS-East-1)
5. `Namespace` (e.g., Order-API)

**Authority in Ved is a Type.** Just as you cannot assign a String to an Integer, you cannot execute a `Namespace`-scoped transition against an `Environment`-scoped Domain.

## The Core Laws of Spatial Authority

To ensure safe system evolution across massive distributed clusters, the Ved Compiler enforces three ironclad spatial laws at compile-time:

### Rule 1: Downward Orchestration (Allowed)

Code operating at a higher authority scope may trigger transitions and modify goals in lower scopes.
*Example:* An `Environment`-level control Domain is perfectly allowed to send a scaling command to a `Workspace`-level API Domain.

### Rule 2: Upward Mutation (Forbidden)

Code operating at a lower scope cannot mutate the state or goals of a higher scope.
*Example:* A `Namespace`-level worker cannot change the global `Tenant` configuration. If it tries, the **Compiler will throw an error** before the code ever runs.

### Rule 3: Lateral Isolation (Forbidden)

Two domains operating at the exact same level, but in different lineages, cannot mutate each other directly.
*Example:* `Workspace(Payments)` cannot send a mutation intent to `Workspace(Inventory)`. Because they are laterally isolated, they must coordinate changes through their nearest common ancestor (e.g., an `Environment` level orchestrator).

## Compile-Time Governance

Because these rules are built directly into the language syntax and evaluated during the Compilation IR phase, Ved can provide static guarantees that a rogue script will not accidentally nuke an entire environment.

You no longer have to deploy a script and pray that IAM policies catch an error at runtime. The compiler verifies **Mutation Reach** and **Effect Emission Legality** deterministically before a single byte of code is executed.
