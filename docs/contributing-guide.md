---
title: "Contributing Guide"
category: "11. Project & Contribution"
order: 1103
---

# Contributing Guide

Ved is an open-source project designed to structurally alter how the world architects long-lived orchestration systems.

Given the highly conceptual nature of building a mathematical compiler interwoven with a deterministic scheduling runtime, contributing to Ved is heavily focused on rigorous upstream design discussions rather than fast pull requests.

## Contribution Pipeline

### 1. The Design Phase

Before writing code for the core compiler or the Virtual Control Runtime, contributors must submit an **RFC (Request For Comments)** modeled after our internal ADRs.
Because altering the pure execution boundary or the asynchronous mailbox logic can accidentally destroy the language's core determinism guarantee, the math must be solved on paper first.

### 2. The Verification Harness

All pull requests targeting the core engine must include updates to the Deterministic Replay test suite. If you are adding a feature to the Scheduler Policy, your PR must include a Time-Travel Simulation test that proves the new algorithm does not accidentally starve a `Tenant` scope domain under high mailbox pressure.

## Where We Need Help Now (v0.1)

We are actively looking for contributors in these spaces:

* **Effect Adapter Ecosystem:** Designing standard library FFI bridges for AWS, Kubernetes, Terraform, and PostgreSQL. These adapters run in the Impure Zone and are fantastic first contributions.
* **Linter Proofs:** Expanding the `ved-lint` structural simulation engine to catch more edge cases in Idempotency Keys and JSON Schema branches.
* **Editor Integration:** Building Language Server Protocol (LSP) integrations for VSCode and Neovim to provide real-time Authority Type visualization.

Please review [`Discussions`](https://github.com/orgs/vedlanghq/discussions) for our issue tracker and community meeting schedules.
