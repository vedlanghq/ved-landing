---
title: "Authority Scope Hierarchy"
category: "6. Language Design"
order: 603
---

# Authority Scope Hierarchy

To balance rigorous safety with necessary developer freedom, Ved organizes execution authority into two strict, orthogonal dimensions: **Privilege Level** and **Bypass Level**.

## Privilege Flags (Operational Reach)

These levels describe how much authority a specific code block, domain, or transition is allowed to exercise natively, bounded by the compiler.

### Level 0 — Pure

* **Allowed:** In-memory computation, algorithms, data transformation.
* **Characteristics:** No external side effects. Referentially transparent. 100% safe for deterministic caching and replay.

### Level 1 — Local

* **Allowed:** Deterministic file operations inside a temporary sandbox, local IPC, cache mutation.
* **Characteristics:** Operations that affect the immediate machine but do not mutate distributed state or affect external system correctness.

### Level 2 — Service

* **Allowed:** Network calls, database writes, message queues.
* **Characteristics:** Standard microservice boundary.

### Level 3 — Infrastructure

* **Allowed:** Cluster operations, cloud resource mutation, deployment orchestration.
* **Characteristics:** High-level topology management. Capable of bringing down a data center if misused.

### Level 4 — Root / Unsafe Authority

* **Allowed:** Bypassing environment binding, overriding scheduler safeguards, manual credential injection.
* **Characteristics:** Requires the highest level of audit and is heavily constrained by the bypass system.

## Bypass Flags (Safety Overrides)

In production environments, there are emergencies where strict compiler safety must temporarily give way to necessary operational patches. Instead of fighting the compiler, Ved formalizes the "escape hatch" via Bypass Levels.

* **Bypass A — Diagnostic Relaxation:** Ignores non-critical warnings and allows experimental constructs.
* **Bypass B — Effect Declaration Skip:** Informs the compiler to trust the developer's claims, while the runtime still strictly monitors the execution.
* **Bypass C — Authority Escalation:** Allows a lower-scope transition to mutate higher-scope states, requiring explicit justification metadata (e.g., an attached Jira ticket or incident ID).
* **Bypass D — Raw Execution:** Direct system calls. Runtime guardrails are reduced to minimal levels, triggering the strongest possible audit logging.

## Required Guardrails

Flags and bypasses are not mere switches; they are semantic operations that the Runtime natively respects.

When a developer uses a higher-level bypass to push a hotfix, the language syntax forces them to attach a `reason`. This reason is permanently embedded into the deterministic execution log. If a network outage forces a Kubernetes RBAC escalation bypass, the runtime allows it, warns the operator, and immediately records the causal chain into the immutable event store.

By integrating Privileges and Overrides directly into the type lattice, Ved transforms "emergency runbooks" into statically verifiable, fully audited language constructs.
