"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TabbedCodeBlock } from "@/components/ui/TabbedCodeBlock";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { useState } from "react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

function ConvergenceInteractiveSection({
  fadeUp,
}: Readonly<{ fadeUp: Record<string, any> }>) {
  const [activeTab, setActiveTab] = useState("imperative");

  const tabs = [
    {
      id: "imperative",
      title: "Imperative Drift",
      language: "typescript",
      code: `// Standard Automation (Unaware of collisions)\n\nasync function reconcileLoop() {\n  while (true) {\n    let state = await fetchState();\n\n    // This blind imperative logic will\n    // fight forever against a second script\n    // that wants nodes < 5\n    if (state.nodes < 5) {\n      await scaleUp();\n    }\n\n    await sleep(1000);\n  }\n}`,
    },
    {
      id: "lexum",
      title: "Predicate Declarations",
      language: "lexum",
      code: `// Lexum Goal Paradigm (Declarative)\n\ndomain ScalingController {\n  // The engine constantly evaluates this predicate\n  goal MaintainCapacity(priority: 10) {\n    state.nodes >= 5\n  }\n\n  // Transition only invoked if the goal fails\n  transition ScaleUp() {\n    yield effect {\n      type: RequestNodes,\n      count: 5 - state.nodes\n    };\n  }\n}`,
    },
  ];

  return (
    <section className="split-section bg-(--section-2) min-h-[70vh] flex items-center">
      <Container className="grid-layout items-center">
        <div className="split-content flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {activeTab === "imperative" ? (
              <motion.div
                key="imperative"
                initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6">
                  The Imperative Drift
                </h2>
                <p className="text-lexum-muted leading-relaxed mb-6">
                  Standard automation relies on manual reconciliation loops.
                  When multiple scripts or controllers manage the same
                  infrastructure, they often fight each other, creating infinite
                  &quot;livelocks&quot; where the system thrashes without ever
                  reaching stability.
                </p>
                <ul className="brutalist-list text-sm">
                  <li className="mb-2">
                    <strong className="text-lexum-text">
                      Logic Collisions
                    </strong>{" "}
                    Controller A scales up, Controller B scales down. Neither
                    knows the other exists.
                  </li>
                  <li className="mb-2">
                    <strong className="text-lexum-text">
                      Infinite Thrashing
                    </strong>{" "}
                    The system endlessly mutates state, burning CPU and API
                    limits without halting.
                  </li>
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="lexum"
                initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6">
                  Predicate Declarations
                </h2>
                <p className="text-lexum-muted leading-relaxed mb-6">
                  Lexum completely abandons the{" "}
                  <code className="font-mono text-sm bg-lexum-panel text-lexum-text border border-lexum-border px-1 rounded">
                    while
                  </code>{" "}
                  loop. Instead, you declare a{" "}
                  <code className="font-mono text-sm bg-lexum-panel text-lexum-text border border-lexum-border px-1 rounded">
                    goal
                  </code>
                  . The Lexum VM natively evaluates all active goals across all
                  domains, calculating priority dominance to silence weaker,
                  conflicting intents before a single transition is executed.
                </p>
                <div className="brutalist-list text-sm">
                  <div className="mb-2">
                    <span className="font-bold text-lexum-text">
                      Priority Dominance:
                    </span>{" "}
                    A `goal` with priority 10 automatically suppresses a
                    conflicting `goal` with priority 5.
                  </div>
                  <div>
                    <span className="font-bold text-lexum-text">
                      Continuous Evaluation:
                    </span>{" "}
                    The engine only invokes transitions when the predicate
                    evaluates to `false`.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="code-panel bg-transparent! border-0! p-0 flex flex-col justify-center">
          <motion.div {...fadeUp}>
            <TabbedCodeBlock
              tabs={tabs}
              activeTabId={activeTab}
              onTabChange={setActiveTab}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

const convergenceContent = [
  {
    title: "Predicate Safety",
    description: (
      <>
        <p className="mb-4">
          Because the Lexum runtime continuously evaluates goals after{" "}
          <em>every single state mutation</em>, Goal predicates are heavily
          restricted by the compiler.
        </p>
        <p className="mb-4">
          Lexum is not a magical AI. You still have to write the{" "}
          <code className="font-mono text-sm bg-lexum-panel text-lexum-text border border-lexum-border px-1 rounded">
            transition
          </code>{" "}
          logic that calls the AWS API. However, Lexum guarantees that if state
          drifts from a Goal, your reconciliation logic will be
          deterministically executed, strictly prioritized against 5 levels of
          systemic importance, retried upon failure, and safely persisted.
        </p>
      </>
    ),
    content: (
      <div className="w-full flex flex-col justify-center gap-6">
        <div className="bg-lexum-panel border border-lexum-border rounded-lg p-6 flex flex-col gap-2 transition-colors hover:border-lexum-accent">
          <code className="font-mono text-sm font-semibold text-lexum-text">
            Pure Logic
          </code>
          <div className="text-lexum-muted text-sm">No memory mutation.</div>
        </div>
        <div className="bg-lexum-panel border border-lexum-border rounded-lg p-6 flex flex-col gap-2 transition-colors hover:border-lexum-accent">
          <code className="font-mono text-sm font-semibold text-lexum-text">
            No Effects
          </code>
          <div className="text-lexum-muted text-sm">
            Network I/O strictly forbidden.
          </div>
        </div>
        <div className="bg-lexum-panel border border-lexum-border rounded-lg p-6 flex flex-col gap-2 transition-colors hover:border-lexum-accent">
          <code className="font-mono text-sm font-semibold text-lexum-text">
            No Wall-Clock
          </code>
          <div className="text-lexum-muted text-sm">Time must be logical.</div>
        </div>
      </div>
    ),
  },
  {
    title: "Oscillation Traps",
    description: (
      <>
        <p className="mb-4">
          What happens when a bug is introduced where a domain&apos;s transition
          fails to satisfy its own goal, or two equal-priority domains get
          locked into a tug-of-war? Lexum tracks execution histories
          mathematically to catch these failures.
        </p>
      </>
    ),
    content: (
      <div className="w-full flex flex-col justify-center gap-6">
        <div className="command-breakdown bg-lexum-bg/50 p-6 rounded-lg border border-lexum-border">
          <div className="mb-6">
            <div className="mb-2">
              <code className="font-mono text-sm bg-lexum-panel text-lexum-text border border-lexum-border px-1 rounded">
                Cycle N..9
              </code>
            </div>
            <div className="text-lexum-muted text-sm">
              Engine observes identical state transitions failing to satisfy the
              goal predicate repeatedly.
            </div>
          </div>
          <div className="mb-6">
            <div className="mb-2">
              <code className="font-mono text-sm bg-lexum-panel text-lexum-text border border-lexum-border px-1 rounded">
                Cycle 10
              </code>
            </div>
            <div className="text-lexum-muted text-sm">
              <strong className="text-lexum-text">
                ERROR[E005] Oscillation Detected.
              </strong>{" "}
              Engine mathematically proves livelock and physically aborts
              execution.
            </div>
          </div>
        </div>
        <div className="bg-lexum-bg/50 p-6 rounded-lg border border-lexum-border text-lexum-muted text-sm leading-relaxed">
          By abandoning imperative loops, the Lexum runtime guarantees that
          software either successfully converges to the target state or
          explicitly aborts with a fully reproducible trace hash.
        </div>
      </div>
    ),
  },
];

export default function ConvergencePage() {
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  };

  const itemFade = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <>
      <Header />

      <main className="flex-1 bg-lexum-bg">
        {/* HERO SECTION */}
        <section className="hero-section">
          <Container>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid-layout"
            >
              <motion.div
                className="col-span-12 text-tag text-lexum-accent tracking-widest mb-4 uppercase"
                variants={itemFade}
              >
                Livelock Mitigation
              </motion.div>
              <motion.h1
                variants={itemFade}
                className="col-span-12 md:col-span-8 text-display-1 text-lexum-text mb-6"
              >
                Absolute <span className="text-lexum-accent">Convergence.</span>
              </motion.h1>

              <motion.p
                className="sub-text col-span-12 md:col-span-8 text-lexum-muted text-lg leading-relaxed mb-6 wrap-break-word w-full"
                variants={itemFade}
              >
                In a system with hundreds of autonomous controllers, how do you
                prevent them from endlessly fighting each other? Lexum solves
                distributed livelock at the compiler level.
              </motion.p>
            </motion.div>
          </Container>
        </section>

        {/* INTERACTIVE TABBED SECTION */}
        <ConvergenceInteractiveSection fadeUp={fadeUp} />

        {/* STICKY SCROLL SECTION */}
        <section className="pt-24 pb-0 relative">
          <Container>
            <StickyScrollReveal content={convergenceContent} />
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 border-b border-lexum-border bg-(--section-1)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              {...fadeUp}
              className="text-center flex flex-col items-center"
            >
              <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6 inline-block">
                Understand the Math
              </h2>
              <p className="text-lexum-muted leading-relaxed mb-6 max-w-2xl mx-auto">
                Read the technical whitepaper on how the Lexum VM calculates
                priority dominance and oscillation vectors.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/lexum-whitepaper.pdf"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-sm font-medium transition-all duration-300 bg-lexum-accent text-lexum-text hover:bg-lexum-text hover:text-lexum-bg rounded hover:scale-105 hover:shadow-[0_0_30px_rgba(255,69,0,0.6)] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Read the Whitepaper
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
