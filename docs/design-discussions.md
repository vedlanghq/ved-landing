---
title: "Design Discussions"
category: "11. Project & Contribution"
order: 1105
---

# Design Discussions

The architectural path to Ved was not a straight line. Creating a language that strictly distances business logic from system effects while retaining high usability required heavy trade-offs.

## Why Not Just Use Rust + Actor Frameworks?

While you can build deterministic, highly isolated Actor models in Rust (or Erlang/Elixir), **the compiler does not enforce the control-plane invariants**.
If a junior engineer joining your Erlang team imports a standard HTTP client library, and calls it directly in the middle of a `gen_server` state transition, the language allows it. They have just quietly broken the time-travel replay guarantees.
Ved exists because we wanted those invariants baked directly into the compiler AST, rather than relying on code-review conventions.

## The Explicit Emits

Earlier versions of the Ved philosophy experimented with hiding the `Effect Boundary`. What if the developer just typed `API.call()`, and under the hood, the compiler sliced the function in half natively?

* **The Conclusion:** "Black box magic" breaks predictability. When evaluating orchestration, a developer needs to physically see the word `emit` to register visually that the deterministic slice is safely terminating and yielding back to the scheduler. Explicitness builds trust.

## Discarding Exceptions (`try/catch`)

As detailed in the Error Taxonomy pages, traditional imperative control flow relies on throwing unseen errors to upper function blocks.
Because Ved operates entirely on continuous convergence reconciliation, an unhandled network error is not an "Exception." It is simply data. Data that must be saved to the memory snapshot, allowing the Control Loop to mathematically degrade, retry, or escalate on the next tick.

Therefore, standard `try`/`catch` control flow was excised entirely from the language design.
