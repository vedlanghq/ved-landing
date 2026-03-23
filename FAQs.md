What is Ved?

Ved is a deterministic control-plane programming language designed to help engineers build reliable, long-running distributed systems.
It enables developers to describe desired system behaviour using structured state models, goals, and bounded execution logic.

---

What problem does Ved solve?

Modern distributed systems are difficult to operate because orchestration logic is often:

imperative

non-deterministic

difficult to reproduce

prone to configuration drift

Ved introduces a deterministic execution model that helps systems converge toward stable operating conditions.

---

How is Ved different from existing programming languages?

Ved focuses on orchestration behaviour rather than application logic.
It provides built-in concepts such as persistent system state, convergence goals, structured authority boundaries, and replayable execution, which are not primary concerns in most general-purpose languages.

---

Is Ved intended to replace languages like Rust, Go, or Python?

No.
Ved is intended to complement existing languages by governing system behaviour at the control-plane level.
Application services and data-plane logic can continue to be implemented using traditional languages.

---

What does deterministic execution mean in Ved?

Deterministic execution means that given the same initial state and external inputs, the runtime will evolve the system in the same way every time.
This enables reproducible debugging, predictable recovery, and improved operational reasoning.

---

What are goals in Ved?

Goals represent stable desired conditions for the system.
The runtime continuously evaluates current state and executes transitions that help the system move toward satisfying these goals.

---

Can Ved interact with real infrastructure or external systems?

Yes.
External interactions are modeled as explicit effects.
These effects are isolated, recorded, and replayable, allowing the runtime to maintain deterministic behaviour while operating in unpredictable environments.

---

Is Ved suitable for building general application software?

Ved is primarily designed for control-plane orchestration and long-lived system coordination.
It is not intended to replace traditional application frameworks.

---

Is Ved production ready?

Ved is currently in early design and prototyping stages.
The project focuses on validating deterministic runtime semantics and convergence models before expanding toward broader production use.

---

How can I get involved?

Engineers can explore the architecture, participate in discussions, review design documents, and contribute experiments related to runtime behaviour, compiler design, and system reliability research.
