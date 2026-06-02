import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

const ARCHITECTURE_DATA = [
  {
    tag: "ARCH-01",
    title: "Deterministic Scheduler",
    description:
      "Evaluates dependency graphs strictly. No parallel branches execute without guaranteed eventual quiescence. Enforces order.",
    specs: [
      {
        label: "Deterministic Scheduler",
        href: "/docs/deterministic-scheduler",
      },
      { label: "Scheduler Design", href: "/docs/scheduler-design" },
    ],
  },
  {
    tag: "ARCH-02",
    title: "Goal-Specification Semantics",
    description:
      "Instead of writing step-by-step creation logic, state goals are defined. The semantic engine diffs reality against the target.",
    specs: [
      {
        label: "Goal Specification Semantics",
        href: "/docs/goal-specification-semantics",
      },
      { label: "Goals and Convergence", href: "/docs/goals-and-convergence" },
    ],
  },
  {
    tag: "ARCH-03",
    title: "Spatial Authority Model",
    description:
      "Variables lack global scope. Each resource is owned by an explicitly bounded domain, eliminating concurrent unmanaged mutations.",
    specs: [
      {
        label: "Spatial Authority Model",
        href: "/docs/spatial-authority-model",
      },
      {
        label: "Authority Scope Hierarchy",
        href: "/docs/authority-scope-hierarchy",
      },
    ],
  },
  {
    tag: "ARCH-04",
    title: "Persistent Snapshot Engine",
    description:
      "State is never assumed; it is captured, cryptographically hashed, and strictly stored to support exact point-in-time replay.",
    specs: [
      {
        label: "Persistent Snapshot Engine",
        href: "/docs/persistent-snapshot-engine",
      },
      {
        label: "State Persistence Strategy",
        href: "/docs/state-persistence-strategy",
      },
    ],
  },
  {
    tag: "ARCH-05",
    title: "Mailbox / Actor Coordination",
    description:
      "Distributed actions pass through strict queues. Multi-domain coordination resolves before execution progresses, never during.",
    specs: [
      { label: "Mailbox Model", href: "/docs/mailbox-model" },
      { label: "Asynchronous Messaging", href: "/docs/asynchronous-messaging" },
    ],
  },
  {
    tag: "ARCH-06",
    title: "Failure Recovery Loop",
    description:
      "When real-world assertions crash, the runtime halts, logs the DAG diff, and rolls back the logical plane to the last locked quiescence.",
    specs: [
      { label: "Failure Recovery Loop", href: "/docs/failure-recovery-loop" },
      { label: "Crash Recovery Model", href: "/docs/crash-recovery-model" },
    ],
  },
];

export function ArchitectureGrid() {
  return (
    <section className="py-24 border-b border-lexum-border bg-lexum-panel">
      <Container>
        <div className="mb-16">
          <div className="text-tag text-lexum-accent mb-4">
            [ RUNTIME SPECIFICATION ]
          </div>
          <h2 className="text-3xl md:text-4xl text-lexum-text font-bold tracking-tight max-w-xl">
            Governed distributed uncertainty. Replayable, safe, convergent.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARCHITECTURE_DATA.map((item) => (
            <Card key={item.tag} className="flex flex-col h-full bg-lexum-bg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-tag text-lexum-muted">{item.tag}</span>
              </div>
              <h3 className="font-sans font-semibold text-lg text-lexum-text tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-mono-body text-lexum-muted grow mb-6">
                {item.description}
              </p>
              <div className="pt-4 border-t border-lexum-border flex flex-col gap-2">
                {item.specs.map((spec) => (
                  <Link
                    key={spec.href}
                    href={spec.href}
                    className="font-mono text-xs text-lexum-text hover:text-lexum-accent transition-colors flex items-center group"
                  >
                    <span className="text-lexum-muted opacity-50 mr-2 group-hover:text-lexum-accent transition-colors">
                      ↳
                    </span>
                    {spec.label}
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
