---
title: "CLI UX Philosophy"
category: "8. Tooling & CLI"
order: 801
---

# CLI UX Philosophy

Because Ved bridges the gap between infrastructure orchestration and application logic, its Command Line Interface (`ved`) cannot behave solely like a standard language compiler (e.g., `rustc` or `gcc`), nor can it act like a pure deployment tool (e.g., `kubectl` or `terraform`).

The Ved CLI is built around **Three Operational Modes**:

## 1. The Developer Experience (DX)

When iterating locally, the CLI acts as an interactive build system. It provides blazing-fast type checking, syntax validation, and immediate feedback loops. Commands in this mode are designed for speed and human-readability. Errors are printed with rich structural context, showing exactly where a deterministic slice might fail.

## 2. The Verification Pipeline (CI/CD)

When running in a headless pipeline or build server, the CLI radically shifts its output format. The `ved-lint` and `ved verify` commands strip away color formatting and emit strict JSON or machine-readable NDJSON logs. In this mode, the CLI focuses entirely on formal mathematical proofs (Idempotency Checks, Sandbox Constraints, Schema Completions) rather than compilation speed.

## 3. The Operator Experience (Ops)

When interacting with a running Ved Cluster, the CLI acts as a diagnostic probe. Because the language heavily utilizes snapshots, replay logs, and mailboxes, the CLI is equipped to query live domains, extract offline snapshots, and visually render the state of a Control Loop.

## Strict Positional Determinism

In line with the language's core philosophies, the Ved CLI avoids heavily overloaded flags. Arguments and parameters are positional and highly structured.

* **Anti-Pattern:** `ved run --fast -x node -v`
* **Ved Pattern:** `ved run node --profile=fast --verbose`

There is no "magic" implicit configuration read from scattered environment variables. If a CLI command alters the compilation target, it requires an explicit flag.
