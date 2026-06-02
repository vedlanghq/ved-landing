"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CodeBlock } from "@/components/ui/CodeBlock";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function JournalingPage() {
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

      <main className="flex-1 bg-lexum-bg overflow-hidden">
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
                The Snapshot Engine
              </motion.div>
              <motion.h1
                variants={itemFade}
                className="col-span-12 md:col-span-8 text-display-1 text-lexum-text mb-6"
              >
                Built for <span className="text-lexum-accent">Catastrophe.</span>
              </motion.h1>

              <motion.p
                className="sub-text col-span-12 md:col-span-8 text-lexum-muted text-lg leading-relaxed mb-6 wrap-break-word w-full"
                variants={itemFade}
              >
                Crash resilience is not an external feature; it is
                mathematically native to the bytecode. Memory is an illusion.
                The Journal is absolute truth.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* SPLIT SECTION: THE VULNERABILITY (VOLATILE MEMORY) */}
        <section className="split-section bg-(--section-2)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid-layout">
            <div className="split-content">
              <motion.div {...fadeUp}>
                <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6">
                  The Volatility Hazard
                </h2>
                <p className="text-lexum-muted leading-relaxed mb-6">
                  In standard orchestration, state lives in RAM. When the
                  process crashes, the state is vaporized. When the system
                  reboots, it blindly queries external APIs, attempting to
                  &quot;reconcile&quot; what happened while it was dead. This
                  creates massive API rate-limit spikes and frequent out-of-sync
                  split-brains.
                </p>
                <ul className="brutalist-list">
                  <li className="text-lexum-muted leading-relaxed mb-2">
                    <strong>Reboot Storms</strong> Servers slamming databases
                    with queries just to reconstruct their in-memory models.
                  </li>
                  <li className="text-lexum-muted leading-relaxed mb-2">
                    <strong>Data Desync</strong> If a crash occurs precisely
                    between an API response and a DB commit, the state is
                    permanently corrupted.
                  </li>
                </ul>
              </motion.div>
            </div>
            <div className="code-panel bg-transparent! border-0! p-0">
              <CodeBlock
                rawCode={`// Standard State Management (Fragile)\n\nasync function executeTransition() {\n  // System executes an external request\n  const data = await fetchExternalAPI();\n\n  // 💥 KERNEL PANIC OR OOM KILL HAPPENS HERE 💥\n  // The API call succeeded, but the local system\n  // never saved the response.\n\n  // On reboot, the system is totally unaware\n  // that the external infrastructure changed.\n  db.save(data);\n}`}
                language="typescript"
              >
                <motion.pre
                  {...fadeUp}
                  className="whitespace-pre! overflow-x-auto block m-0 p-0 bg-transparent border-0"
                >
                  <span className="token-comment">
                    # Standard State Management (Fragile)
                  </span>
                  {"\n\n"}
                  <span className="token-keyword">async function</span>{" "}
                  <span className="token-entity">executeTransition</span>(){" "}
                  {"{"}
                  {"\n"}
                  {"  "}
                  <span className="token-comment">
                    {/* System executes an external request */}
                  </span>
                  {"\n"}
                  {"  "}
                  <span className="token-keyword">const</span> data ={" "}
                  <span className="token-keyword">await</span>{" "}
                  fetchExternalAPI();
                  {"\n\n"}
                  {"  "}
                  <span className="token-comment">
                    {/* KERNEL PANIC OR OOM KILL HAPPENS HERE */}
                  </span>
                  {"\n"}
                  {"  "}
                  <span className="token-comment">
                    {/* The API call succeeded, but the local system */}
                  </span>
                  {"\n"}
                  {"  "}
                  <span className="token-comment">
                    {/* never saved the response. */}
                  </span>
                  {"\n\n"}
                  {"  "}
                  <span className="token-comment">
                    {/* On reboot, the system is totally unaware */}
                  </span>
                  {"\n"}
                  {"  "}
                  <span className="token-comment">
                    {/* that the external infrastructure changed. */}
                  </span>
                  {"\n"}
                  {"  "}db.save(data);{"\n"}
                  {"}"}
                </motion.pre>
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* SPLIT SECTION: LEXUM WRITE-AHEAD LOG */}
        <section className="split-section reverse bg-(--section-1)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid-layout">
            <div className="split-content">
              <motion.div {...fadeUp}>
                <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6">
                  The Replicated Ledger
                </h2>
                <p className="text-lexum-muted leading-relaxed mb-6">
                  Lexum bypasses memory volatility entirely. Every incoming
                  message is strictly serialized into a Write-Ahead Log (WAL)
                  before the Virtual Machine is even allowed to execute the
                  bytecode. Periodically, the deterministic state is dumped into
                  an immutable{" "}
                  <code className="font-mono text-sm bg-lexum-panel text-lexum-text border border-lexum-border px-1 rounded">
                    .snapshot.json
                  </code>
                  .
                </p>
                <div className="mt-8">
                  <p className="text-lexum-muted leading-relaxed mb-6">
                    Persistence Mechanics
                  </p>
                  <div className="brutalist-list">
                    <div className="mb-4">
                      <span className="font-bold text-lexum-text">
                        Append-Only Log:
                      </span>{" "}
                      Messages exist mathematically before they are evaluated.
                    </div>
                    <div>
                      <span className="font-bold text-lexum-text">
                        Cycle Hash Verification:
                      </span>{" "}
                      Snapshots are cryptographically hashed to guarantee
                      playback fidelity.
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="code-panel bg-transparent! border-0! p-0">
              <CodeBlock
                rawCode={`{\n  "domain": "MetricsAggregator",\n  "cycle": 4092,\n  "run_hash": "0x9f8b4a2e...",\n  "state": {\n    "status": "Active",\n    "nodes": 12\n  },\n  "mailbox_offset": 142\n}`}
                language="json"
              >
                <motion.pre
                  {...fadeUp}
                  className="whitespace-pre! overflow-x-auto block m-0 p-0 bg-transparent border-0"
                >
                  <span className="token-comment">
                    {/* The Lexum Snapshot JSON (Verifiable) */}
                  </span>
                  {"\n\n"}
                  {"{"}
                  {"\n"}
                  {"  "}
                  <span className="token-property">
                    &quot;domain&quot;
                  </span>:{" "}
                  <span className="token-property">
                    &quot;MetricsAggregator&quot;
                  </span>
                  ,{"\n"}
                  {"  "}
                  <span className="token-property">
                    &quot;cycle&quot;
                  </span>: <span className="token-operator">4092</span>,{"\n"}
                  {"  "}
                  <span className="token-property">
                    &quot;run_hash&quot;
                  </span>:{" "}
                  <span className="token-property">
                    &quot;0x9f8b4a2e...&quot;
                  </span>
                  ,{"\n"}
                  {"  "}
                  <span className="token-property">
                    &quot;state&quot;
                  </span>: {"{"}
                  {"\n"}
                  {"    "}
                  <span className="token-property">
                    &quot;status&quot;
                  </span>:{" "}
                  <span className="token-property">&quot;Active&quot;</span>,
                  {"\n"}
                  {"    "}
                  <span className="token-property">
                    &quot;nodes&quot;
                  </span>: <span className="token-operator">12</span>
                  {"\n"}
                  {"  "}
                  {"}"},{"\n"}
                  {"  "}
                  <span className="token-property">
                    &quot;mailbox_offset&quot;
                  </span>
                  : <span className="token-operator">142</span>
                  {"\n"}
                  {"}"}
                  {"\n\n"}
                  <span className="token-comment">
                    {/* When combined with the Write-Ahead Log (events 143+), */}
                  </span>
                  {"\n"}
                  <span className="token-comment">
                    {/* the runtime can perfectly reconstruct any future state. */}
                  </span>
                </motion.pre>
              </CodeBlock>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION: SNAPSHOT VS EVENT SOURCING */}
        <section className="content-section bg-(--section-3)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="two-col-grid align-top">
              <motion.div
                className="col-span-12 md:col-span-4 lg:col-span-5"
                {...fadeUp}
              >
                <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6">
                  Memory Architecture
                </h2>
                <p className="text-lexum-muted leading-relaxed mb-6">
                  Snapshot-First vs Event Sourcing
                </p>
              </motion.div>

              <motion.div
                className="col-span-12 md:col-span-8 lg:col-span-7"
                {...fadeUp}
                transition={{
                  delay: 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="text-lexum-muted leading-relaxed mb-6">
                  Many high-reliability systems use Event Sourcing (recording
                  every single action in an infinite log) to achieve safety.
                  However, replaying massive 5-year-old event logs to achieve
                  current state is incredibly slow and expensive. Lexum uses a{" "}
                  <strong>Snapshot-First Architecture</strong>.
                </p>

                <div className="mt-6 flex flex-col gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-lexum-text mb-2">
                      Bounded Causal Journals
                    </h3>
                    <p className="text-lexum-muted leading-relaxed mb-6">
                      The snapshot is the canonical truth. Crash recovery is
                      near-instantaneous because the runtime loads the latest
                      image into memory, bypassing the need to replay thousands
                      of historical events. The log is bounded strictly to
                      events occurring <em>after</em> the latest snapshot hash.
                    </p>
                  </div>

                  <div>
                    <h3>Structural Consistency (COW)</h3>
                    <p className="text-lexum-muted leading-relaxed mb-6">
                      The Lexum persistent state model is built using advanced
                      Copy-on-Write (COW) memory structures. When a transition
                      occurs, it creates a new delta state. The runtime
                      asynchronously flushes the previous valid state to disk
                      without blocking the main execution thread.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION: THE CRASH SEQUENCE */}
        <section className="content-section bg-(--section-2)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="two-col-grid align-top">
              <motion.div
                className="col-span-12 md:col-span-4 lg:col-span-5"
                {...fadeUp}
              >
                <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6">
                  Flawless Resumption
                </h2>
                <p className="text-lexum-muted leading-relaxed mb-6">
                  Seamless Disaster Recovery
                </p>
              </motion.div>

              <motion.div
                className="col-span-12 md:col-span-8 lg:col-span-7"
                {...fadeUp}
                transition={{
                  delay: 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="text-lexum-muted leading-relaxed mb-6">
                  Because the Execution DAG is entirely deterministic, a server
                  crash is treated as a minor disruption rather than a critical
                  failure. The system simply wakes up, loads the memory block,
                  and proceeds forward in time.
                </p>

                <div className="command-breakdown">
                  <div>
                    <div>
                      <code className="font-mono text-sm bg-lexum-panel text-lexum-text border border-lexum-border px-1 rounded">
                        CRASH
                      </code>
                    </div>
                    <div>
                      Data center loses power. Process is killed
                      instantaneously.
                    </div>
                  </div>
                  <div>
                    <div>
                      <code className="font-mono text-sm bg-lexum-panel text-lexum-text border border-lexum-border px-1 rounded">
                        BOOT
                      </code>
                    </div>
                    <div>
                      Lexum runtime spins up. Identifies missing in-memory
                      state.
                    </div>
                  </div>
                  <div>
                    <div>
                      <code className="font-mono text-sm bg-lexum-panel text-lexum-text border border-lexum-border px-1 rounded">
                        RESTORE
                      </code>
                    </div>
                    <div>
                      Loads{" "}
                      <code className="font-mono text-sm bg-lexum-panel text-lexum-text border border-lexum-border px-1 rounded">
                        .snapshot.json
                      </code>{" "}
                      at Cycle 4092. Replays WAL messages 143 to 147. Exact
                      state is reached in microseconds.
                    </div>
                  </div>
                </div>

                <p className="text-lexum-muted leading-relaxed mb-6">
                  No reconciliation storms. No dropped webhooks. The system
                  operates as if the crash never occurred.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 border-b border-lexum-border bg-(--section-1)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              {...fadeUp}
              className="text-center flex flex-col items-center"
            >
              <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6 inline-block">
                The Road to v1.0
              </h2>
              <p className="text-lexum-muted leading-relaxed mb-6 max-w-2xl mx-auto">
                Lexum is advancing toward a fully distributed consensus-driven
                journal architecture.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/whitepaper"
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
