const fs = require('fs');
const path = require('path');

const structure = {
  "1. Introduction": [
    { title: "What is Ved", slug: "what-is-ved" },
    { title: "Why Deterministic Orchestration", slug: "why-deterministic-orchestration" },
    { title: "Problem Space", slug: "problem-space" },
    { title: "When to Use Ved", slug: "when-to-use-ved" }
  ],
  "2. Philosophy": [
    { title: "Determinism as Design Principle", slug: "determinism-as-design-principle" },
    { title: "Convergence vs Imperative Control", slug: "convergence-vs-imperative-control" },
    { title: "Authority & Isolation Thinking", slug: "authority-and-isolation-thinking" },
    { title: "Long-Lived System Programming", slug: "long-lived-system-programming" }
  ],
  "3. Core Concepts": [
    { title: "Domains", slug: "domains" },
    { title: "Persistent State", slug: "persistent-state" },
    { title: "Transitions", slug: "transitions" },
    { title: "Goals", slug: "goals" },
    { title: "Effects", slug: "effects" },
    { title: "Message Passing", slug: "message-passing" },
    { title: "Scheduling Slices", slug: "scheduling-slices" }
  ],
  "4. Execution Model": [
    { title: "Control Loop Lifecycle", slug: "control-loop-lifecycle" },
    { title: "Deterministic Scheduling", slug: "deterministic-scheduling" },
    { title: "Priority Semantics", slug: "priority-semantics" },
    { title: "Quiescence Detection", slug: "quiescence-detection" },
    { title: "Convergence Guarantees", slug: "convergence-guarantees" }
  ],
  "5. Runtime Architecture": [
    { title: "Runtime Components Overview", slug: "runtime-components-overview" },
    { title: "Mailbox Model", slug: "mailbox-model" },
    { title: "Scheduler Design", slug: "scheduler-design" },
    { title: "State Persistence Strategy", slug: "state-persistence-strategy" },
    { title: "Effect Execution Boundary", slug: "effect-execution-boundary" },
    { title: "Crash Recovery Model", slug: "crash-recovery-model" }
  ],
  "6. Language Design": [
    { title: "Syntax Modes", slug: "syntax-modes" },
    { title: "Type System Overview", slug: "type-system-overview" },
    { title: "Authority Scope Hierarchy", slug: "authority-scope-hierarchy" },
    { title: "Goal Specification Semantics", slug: "goal-specification-semantics" },
    { title: "State Schema Evolution", slug: "state-schema-evolution" }
  ],
  "7. Diagnostics": [
    { title: "Error Taxonomy", slug: "error-taxonomy" },
    { title: "Warning System", slug: "warning-system" },
    { title: "Linting Philosophy", slug: "linting-philos" },
    { title: "Diagnostic Codes & Aliases", slug: "diagnostic-codes" }
  ],
  "8. Tooling & CLI": [
    { title: "CLI UX Philosophy", slug: "cli-ux-philosophy" },
    { title: "Command Reference", slug: "command-reference" },
    { title: "Lint & Verify Usage", slug: "lint-verify-usage" },
    { title: "Simulation Workflows", slug: "simulation-workflows" },
    { title: "Observability Commands", slug: "observability-commands" }
  ],
  "9. Examples": [
    { title: "Hello Stability", slug: "hello-stability" },
    { title: "Worker Pool Scaling", slug: "worker-pool-scaling" },
    { title: "Retry Reconciliation", slug: "retry-reconciliation" },
    { title: "Multi-Domain Coordination", slug: "multi-domain-coordination" },
    { title: "Priority Scheduling Example", slug: "priority-scheduling-example" }
  ],
  "10. Advanced Topics": [
    { title: "Distributed Runtime Vision", slug: "distributed-runtime-vision" },
    { title: "Deterministic Replay Debugging", slug: "deterministic-replay-debugging" },
    { title: "Scheduler Policy Extensions", slug: "scheduler-policy-extensions" },
    { title: "Convergence Performance Thinking", slug: "convergence-performance-thinking" },
    { title: "Runtime Hot Upgrades", slug: "runtime-hot-upgrades" }
  ],
  "11. Project & Contribution": [
    { title: "Roadmap", slug: "roadmap" },
    { title: "Architecture Decisions", slug: "architecture-decisions" },
    { title: "Contributing Guide", slug: "contributing-guide" },
    { title: "Governance Model", slug: "governance-model" },
    { title: "Design Discussions", slug: "design-discussions" }
  ]
};

const docsDir = path.join(__dirname, 'docs');
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir);

let orderMultiplier = 1;
for (const [category, pages] of Object.entries(structure)) {
  let pageIndex = 1;
  for (const page of pages) {
    const order = orderMultiplier * 100 + pageIndex;
    const content = `---
title: "${page.title}"
category: "${category}"
order: ${order}
---

# ${page.title}

*This section is currently being expanded. Check back soon for the full documentation.*
`;
    fs.writeFileSync(path.join(docsDir, `${page.slug}.md`), content);
    pageIndex++;
  }
  orderMultiplier++;
}
console.log('Docs scaffolded successfully.');
