---
title: "Syntax Modes"
category: "6. Language Design"
order: 601
---

# Syntax Modes

Ved is designed to cleanly scale from a 20-line deployment script written by a DevOps engineer into a 2,000,000-line global control plane maintained by fifty teams.

To accomplish this without introducing breaking context-switches, the Ved Compiler implements dynamically detected **Syntax Modes**. These modes do not change the underlying semantics of the runtime—they merely adjust the syntactic boilerplate required to express the intent.

## The Three Layers of Ved

### 1. Script Mode (Implicit Execution)

Script Mode is fundamentally designed for writing fast, imperative-looking procedural code. It brings the lightweight ergonomics of Python or Bash, but retains the deterministic execution guarantees of Ved.

**Compiler Detection Rules:**
The compiler automatically assigns a file to Script Mode if:

1. It does not detect an explicitly declared `domain` block at the top level.
2. It encounters top-level variable assignments or function calls.

**What Actually Happens:**
Under the hood, Ved takes your top-level script, implicitly wraps it inside an anonymous `domain`, marks your global variables as isolated `state`, and treats your logical sequence as a singular Transition.

### 2. System Mode (Explicit Components)

As projects grow in complexity, implicit wrapping stops being helpful and starts hiding critical architectural boundaries. System Mode forces developers to explicitly define their State Domains, Mailboxes, and Transitions. This is the "default" state of a mature Ved codebase.

**Compiler Detection Rules:**
The compiler assigns System Mode if it detects explicit `domain` scoping at the root level of the file.

**What Actually Happens:**
You explicitly declare the schemas, define the transitions, and expose the specific query points. The codebase begins to resemble actor-model systems or Rust structs, maximizing strictness and compilation-time safety checks.

### 3. Orchestration Mode (Hierarchical Scope)

Orchestration Mode is reserved for defining exactly how different Systems interact with the outside world and one another. You use this mode to deploy systems, bind effect adapters (e.g., tying the system's emit calls to a real AWS plugin), and manage distributed topologies.

**What Actually Happens:**
This mode shifts syntax from "logic execution" into "declarative topology". It resembles Terraform or Kubernetes YAML, but remains native Ved code. It maps logical domains strictly to physical deployment topologies.

## A Continuous Gradient

Crucially, **these three modes all compile down to the exact same bytecode instructions.** A developer can start in Script Mode for a quick proof of concept, and seamlessly refactor it into System Mode without changing any of the underlying logic patterns.
