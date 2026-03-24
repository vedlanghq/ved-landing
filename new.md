# Page 1 — Error Taxonomy

---

## Hero

**Title**

Structured Failure Semantics

**Subtitle**

Ved defines a formal error taxonomy grounded in deterministic execution,
authority boundaries, and convergence guarantees.

**Intro Line**

Errors are not incidental messages.
They are manifestations of violated system invariants.

---

## Section — Design Philosophy

### Heading

Why Ved Needs a Formal Error Model

### Body

- Distributed orchestration failures are often architectural
- Deterministic systems require invariant enforcement
- Clear failure classification enables reproducible debugging

Bullet themes:

- invariant-centric diagnostics
- compile-time safety emphasis
- runtime contract enforcement

---

## Section — Diagnostic Code System

### Heading

Canonical Error Identifiers

Explain:

```
VED-<CATEGORY>-<NUMBER>
```

Provide:

- category stability guarantee
- machine-readable semantics
- tooling integration rationale

---

## Section — Error Categories

Subsections:

### Authority Violations

### Determinism Violations

### Goal Convergence Failures

### Scheduler Safety Failures

### Persistent State Integrity

### External Effect Violations

### Static Type Errors

Each subsection:

- invariant definition
- typical failure scenario
- diagnostic example

---

## Section — Compile-Time vs Runtime Errors

Explain:

- structural invalidity
- operational safety violation

Provide conceptual execution timeline.

---

## Section — Diagnostic Philosophy

Explain:

- actionable messaging
- invariant explanation
- suggested remediation

---

## Closing

Errors are treated as **design feedback**, not just execution blockers.

---

# Page 2 — Warning System

---

## Hero

Proactive System Risk Signalling

**Subtitle**

Ved surfaces architectural risks before they become failures.

---

## Section — Why Warnings Matter in Control-Plane Programming

Explain:

- delayed failure characteristics
- probabilistic instability
- convergence inefficiency

---

## Section — Warning Taxonomy

Explain:

```
VED-WARN-<CATEGORY>-<NUMBER>
```

Categories:

- Scheduler behaviour
- Convergence quality
- Determinism sensitivity
- Authority placement
- Persistent state evolution
- External effect strategy

---

## Section — Warning Semantics

Explain:

- valid program
- suboptimal behaviour

Include examples like:

- starvation probability
- oscillatory transitions
- excessive snapshot pressure

---

## Section — Suppression & Accountability

Explain:

- explicit acknowledgement
- local suppression
- policy enforcement

---

## Closing

Warnings help encode **operational wisdom** into the language toolchain.

---

# Page 3 — Linting System

---

## Hero

Architectural Guidance Through Static Analysis

**Subtitle**

Ved linting helps developers design stable orchestration systems.

---

## Section — Role of Lints

Explain distinction:

- error → invalid
- warning → risky
- lint → improvable

---

## Section — Lint Categories

Subsections:

- Convergence Design
- Scheduler Efficiency
- Determinism Discipline
- Authority Hygiene
- Persistent State Modelling
- External Interaction Patterns

---

## Section — Lint Execution Contexts

Explain:

- compile-time advisory
- simulation-time analysis
- CI integration

---

## Section — Configurable Policy

Explain:

- strict mode
- project-level rules
- diagnostic elevation

---

## Closing

Linting gradually builds **distributed systems intuition** into teams.

---

# Page 4 — CLI UX Philosophy

---

## Hero

Deterministic System Governance Interface

**Subtitle**

Ved CLI is designed as a control-plane command surface rather than a script launcher.

---

## Section — Design Principles

Subpoints:

- verb-first structure
- explicit lifecycle operations
- deterministic defaults
- structured output

---

## Section — Command Hierarchy

Show conceptual tree:

- compile
- run
- simulate
- lint
- verify
- inspect
- trace

Explain responsibility of each.

---

## Section — Diagnostics Ergonomics

Explain:

- dual identifier system
- short aliases
- category filters

Example:

```
ved lint --only sched
```

---

## Section — Observability & Governance

Explain future commands:

- status
- pause
- step
- resume

---

## Closing

CLI is treated as a **system reasoning instrument**, not just execution tooling.
