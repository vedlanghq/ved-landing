---
title: "Architecture"
category: "Core Concepts"
order: 3
---

# Architecture Overview

Ved consists of several major components.

## Compiler

Transforms Ved source programs into executable bundles.

Responsibilities include:

- parsing and semantic validation
- authority and scope checking
- convergence graph construction
- lowering into deterministic bytecode

## Runtime

Executes Ved bundles as long-running orchestration systems.

Core responsibilities:

- deterministic scheduling of transition slices
- persistent state journaling and snapshotting
- goal evaluation and reconciliation
- effect intent isolation and replay
- crash recovery

## CLI

Provides developer tooling for compiling, running, and inspecting Ved
systems.

## Execution Model

Ved runtime operates as a control-loop engine rather than a request-response
application server.
