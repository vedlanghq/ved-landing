---
title: "Type System Overview"
category: "6. Language Design"
order: 602
---

# Type System Overview

Most modern languages have type systems designed solely to describe **shape** (e.g., this is a string, this is a struct with three fields, this is an array of integers). Memory-safe languages like Rust introduce types that describe **ownership** and **lifetime**.

Ved introduces a third dimension: types that describe **authority**.

## The Dual-Axis Type System

Every major construct in Ved (Variables, Domains, Transitions, and Effects) requires two type validations to pass successfully through the compiler:

1. **Value Type**: Describes the shape of the data.
2. **Authority Scope**: Describes *where* in the enterprise the data is allowed to act.

```ved
// A transition has a value type (String) and an authority scope (Workspace)
@scope Workspace("analytics")
transition NormalizeData(input: String) {
    // ...
}
```

## First-Class Authority Tracking

If Ved's central thesis is that "long-lived infrastructure orchestration should be as safe as pure functional computation," then the compiler must statically verify the blast radius of every action.

Authority typing allows the compiler to statically verify:

* **Mutation reach:** Can this function edit that domain?
* **Effect emission legality:** Is this code allowed to spin up an AWS instance in root production?
* **Cross-domain constraints:** Are these two sibling actors allowed to send each other messages directly, or do they require parental routing?

Authority is not an optional string attached via commentary. It is an intrinsic part of the IR metadata and the Runtime Scheduling Policy.

## The Subtyping Lattice

Authority scopes act mathematically in a **partially ordered set**. By default, Ved assumes an enterprise-level topology like `Tenant > Environment > Workspace > Target`.

Because authority is handled by the type checker:

1. **Downward Covariance is Allowed**: A `Transition<Environment>` may mutate a `Domain<Workspace>`. The compiler implicitly casts the lower-level environment to satisfy the requirement.
2. **Upward Escalation is Forbidden**: A `Transition<Workspace>` attempting to execute a `Transition<Environment>` function is flagged as a Type Error during compilation. It is impossible to push the code into production.

## Why Built-In?

By embedding Authority directly into the compiler's type inference engine, Ved eliminates entire categories of runtime RBAC (Role-Based Access Control) errors. When an engineer writes an infrastructure-mutating playbook, their IDE will turn red if they attempt to orchestrate a database outside of their declared functional jurisdiction, long before a DevOps pipeline is invoked.
