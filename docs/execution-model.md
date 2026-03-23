---
title: "Execution Model"
order: 4
---

# Execution Model

Ved programs describe domains with persistent state and transitions that
modify that state.

Execution proceeds in discrete deterministic slices.

A typical runtime cycle:

1. Observe current state and pending events
2. Evaluate goal predicates
3. Select a transition slice
4. Execute deterministic instructions
5. Persist state mutations
6. Emit effect intents for external interaction

External side-effects are isolated from core execution and their results are
recorded to ensure replayable behaviour.

This model enables:

- reproducible debugging
- crash-safe orchestration
- analyzable convergence patterns
