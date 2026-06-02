"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TabbedCodeBlock } from "@/components/ui/TabbedCodeBlock";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { InteractiveDAG } from "@/components/system/InteractiveDAG";
import { useState } from "react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

function DeterminismInteractiveSection({
  fadeUp,
}: Readonly<{ fadeUp: Record<string, any> }>) {
  const [activeTab, setActiveTab] = useState("imperative");

  const tabs = [
    {
      id: "imperative",
      title: "Imperative Scripting",
      language: "python",
      code: `# The traditional paradigm (Fragile)\n\ndef provision_cluster():\n  state = {}\n  \n  # I/O mixed with logic\n  res = fetch("https://api.cloud/v1/nodes")\n  \n  if res.status == 500:\n    # The runtime had no idea this was coming\n    return FatalError\n\n  state.nodes = res.data\n  \n  # If we crash here, the nodes exist but the state is gone\n  db.save(state)`,
    },
    {
      id: "lexum",
      title: "Lexum (Deterministic)",
      language: "lexum",
      code: `transition HandleProvision(msg: NodeResponse) {\n  match msg.status {\n    Failed => {\n      yield state { status: Error };\n    }\n    Success => {\n      yield state { nodes: msg.data };\n    }\n  }\n}`,
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
                  The Chaos of Imperative Scripting
                </h2>
                <p className="text-lexum-muted leading-relaxed mb-6">
                  Traditional languages interleave logic, I/O, and state
                  mutation. The runtime flies blind, completely unaware of what
                  side-effect might explode on the next line. You cannot
                  reliably simulate, test, or resume execution after a crash.
                </p>
                <ul className="brutalist-list">
                  <li className="text-lexum-muted leading-relaxed mb-2">
                    <strong>Unpredictable Branches</strong> Live network
                    responses alter the AST trajectory in real-time.
                  </li>
                  <li className="text-lexum-muted leading-relaxed mb-2">
                    <strong>Phantom State</strong> Memory is mutated silently
                    without a journal.
                  </li>
                  <li className="text-lexum-muted leading-relaxed mb-2">
                    <strong>Catastrophic Failure</strong> A crash midway means
                    starting over or running a brittle cleanup script.
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
                className="flex flex-col h-full"
              >
                <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6">
                  The Causal Graph
                </h2>
                <p className="text-lexum-muted leading-relaxed mb-6">
                  Lexum enforces a strict boundary between computation and
                  effects. The compiler maps out a static Execution DAG before a
                  single instruction runs. Click a node below to simulate a
                  deterministic state transition.
                </p>
                <div className="flex-1 w-full mt-4 min-h-75">
                  <InteractiveDAG />
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

const determinismStickyContent = [
  {
    title: "Eradicating Chaos",
    description: (
      <>
        <p className="mb-4 font-bold text-lexum-text">
          Zero Implicit Dependencies
        </p>
        <p className="mb-4">
          To achieve true execution fidelity, Lexum ruthlessly eliminates the
          four horsemen of nondeterminism from the Virtual Machine entirely.
        </p>
      </>
    ),
    content: (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <motion.div
          whileHover={{ scale: 1.02, rotateY: 2, rotateX: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="col-span-1 md:col-span-2 bg-lexum-panel/40 backdrop-blur-md border border-lexum-border/50 rounded-xl p-6 shadow-xl overflow-hidden relative group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-lexum-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-lexum-accent/20 transition-colors"></div>
          <h3 className="text-xl font-semibold text-lexum-text mb-2 flex items-center gap-2">
            <span className="text-lexum-accent font-mono text-sm">01</span>{" "}
            Unordered Execution
          </h3>
          <p className="text-lexum-muted leading-relaxed text-sm relative z-10">
            Message selection is never left to the host OS thread scheduler. It
            follows a strict globally deterministic tuple:{" "}
            <code className="font-mono text-xs bg-lexum-bg/80 text-lexum-text border border-lexum-border px-1.5 py-0.5 rounded ml-1">
              (priority, logical_time, domain_id, sequence_id)
            </code>
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="col-span-1 bg-lexum-panel/40 backdrop-blur-md border border-lexum-border/50 rounded-xl p-6 shadow-xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-linear-to-br from-transparent to-lexum-border/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-lg font-semibold text-lexum-text mb-2 flex flex-col">
            <span className="text-lexum-accent font-mono text-xs mb-1">02</span>{" "}
            Implicit Time
          </h3>
          <p className="text-lexum-muted leading-relaxed text-sm">
            Lexum VMs cannot read the wall-clock time natively during a slice.
            Time is advanced via explicit external logical clock ticks injected
            via the mailbox queue.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, rotateY: -5, rotateX: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="col-span-1 bg-lexum-panel/40 backdrop-blur-md border border-lexum-border/50 rounded-xl p-6 shadow-xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-linear-to-bl from-transparent to-lexum-border/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-lg font-semibold text-lexum-text mb-2 flex flex-col">
            <span className="text-lexum-accent font-mono text-xs mb-1">03</span>{" "}
            Shared Mutable State
          </h3>
          <p className="text-lexum-muted leading-relaxed text-sm">
            Global memory does not exist. All state is strictly domain-scoped,
            isolated, and explicitly mutated via yielding new state hashes.
          </p>
        </motion.div>
      </div>
    ),
  },
  {
    title: "Time-Travel Debugging",
    description: (
      <>
        <p className="mb-4 font-bold text-lexum-text">Bytecode Replayability</p>
        <p className="mb-4">
          Because Lexum tracks all external interactions in a strictly ordered
          Write-Ahead Log, any failure in production can be downloaded as a{" "}
          <code className="font-mono text-sm bg-lexum-panel text-lexum-text border border-lexum-border px-1 rounded">
            .snapshot.json
          </code>{" "}
          and replayed locally.
        </p>
      </>
    ),
    content: (
      <div className="w-full flex flex-col justify-center p-6 gap-6">
        <div className="command-breakdown bg-lexum-bg/50 p-6 rounded-lg border border-lexum-border">
          <div className="mb-4">
            <div className="mb-2">
              <code className="font-mono text-sm bg-lexum-panel text-lexum-text border border-lexum-border px-1 rounded">
                Tick 0
              </code>
            </div>
            <div className="text-lexum-muted text-sm">
              Load initial cluster constraints.
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-2">
              <code className="font-mono text-sm bg-lexum-panel text-lexum-text border border-lexum-border px-1 rounded">
                Tick 1
              </code>
            </div>
            <div className="text-lexum-muted text-sm">
              Process incoming <code className="font-mono">NodeResponse</code>.
              State hash: `0x8f2a`
            </div>
          </div>
          <div className="mb-6">
            <div className="mb-2">
              <code className="font-mono text-sm bg-lexum-panel border px-1 rounded text-red-400 border-red-400/30">
                Tick 2
              </code>
            </div>
            <div className="text-lexum-muted text-sm">
              <strong className="text-lexum-text">
                Invariant violation detected.
              </strong>{" "}
              Execution aborted.
            </div>
          </div>
        </div>
        <div className="bg-lexum-bg/50 p-6 rounded-lg border border-lexum-border text-lexum-muted text-sm leading-relaxed">
          By feeding the exact same message queue into the exact same domain
          snapshot, the runtime reproduces the exact crash cycle. No guesswork.
          No &quot;heisenbugs&quot;.
        </div>
      </div>
    ),
  },
];

export default function DeterminismPage() {
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
                Lexum Core Paradigm
              </motion.div>
              <motion.h1
                variants={itemFade}
                className="col-span-12 md:col-span-8 text-display-1 text-lexum-text mb-6"
              >
                Math, <span className="text-lexum-accent">not magic.</span>
              </motion.h1>

              <motion.p
                className="sub-text col-span-12 md:col-span-8 text-lexum-muted text-lg leading-relaxed mb-6 wrap-break-word w-full"
                variants={itemFade}
              >
                If the inputs are the same, the execution path is identical.
                Period. No race conditions, no untracked state, no spontaneous
                failures.
              </motion.p>
            </motion.div>
          </Container>
        </section>

        {/* INTERACTIVE TABBED SECTION */}
        <DeterminismInteractiveSection fadeUp={fadeUp} />

        {/* STICKY SCROLL SECTION */}
        <section className="pt-24 pb-0 relative">
          <Container>
            <StickyScrollReveal content={determinismStickyContent} />
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 border-b border-lexum-border bg-(--section-1)">
          <Container>
            <motion.div
              {...fadeUp}
              className="text-center flex flex-col items-center"
            >
              <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6 inline-block">
                Explore the Architecture
              </h2>
              <p className="text-lexum-muted leading-relaxed mb-6 max-w-2xl mx-auto">
                Dive deeper into the components that enable zero-trust,
                deterministic execution.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/docs/deterministic-scheduler"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-sm font-medium transition-all duration-300 bg-lexum-accent text-lexum-text hover:bg-lexum-text hover:text-lexum-bg rounded hover:scale-105 hover:shadow-[0_0_30px_rgba(255,69,0,0.6)] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    The Scheduler
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
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
