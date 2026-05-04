"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundShapes from "@/components/BackgroundShapes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <BackgroundShapes />
      <Header />

      <main>
        {/* HERO SECTION */}
        <section
          className="hero-section"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "100px",
          }}
        >
          <div style={{ width: "100%" }}>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="hero-text"
              style={{
                textAlign: "center",
                margin: "0 auto",
                maxWidth: "1200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <motion.div
                className="label"
                variants={itemFade}
                style={{
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "2rem",
                  fontWeight: 600,
                }}
              >
                The Snapshot Engine
              </motion.div>
              <motion.h1
                variants={itemFade}
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  maxWidth: "100%",
                  padding: "0 1rem",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  hyphens: "auto",
                }}
              >
                Built for catastrophe.
              </motion.h1>

              <motion.p
                className="sub-text"
                variants={itemFade}
                style={{
                  margin: "2.5rem auto 0",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                  maxWidth: "800px",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  padding: "0 1rem",
                }}
              >
                Crash resilience is not an external feature; it is
                mathematically native to the bytecode. Memory is an illusion.
                The Journal is absolute truth.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* SPLIT SECTION: THE VULNERABILITY (VOLATILE MEMORY) */}
        <section className="split-section">
          <div className="split-content">
            <motion.div {...fadeUp}>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                  lineHeight: 1.1,
                }}
              >
                The Volatility Hazard
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                  marginBottom: "2rem",
                }}
              >
                In standard orchestration, state lives in RAM. When the process
                crashes, the state is vaporized. When the system reboots, it
                blindly queries external APIs, attempting to "reconcile" what
                happened while it was dead. This creates massive API rate-limit
                spikes and frequent out-of-sync split-brains.
              </p>
              <ul className="brutalist-list" style={{ marginTop: "2rem" }}>
                <li
                  style={{
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <strong style={{ color: "var(--accent)" }}>
                    Reboot Storms
                  </strong>{" "}
                  Servers slamming databases with queries just to reconstruct
                  their in-memory models.
                </li>
                <li
                  style={{
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <strong style={{ color: "var(--accent)" }}>
                    Data Desync
                  </strong>{" "}
                  If a crash occurs precisely between an API response and a DB
                  commit, the state is permanently corrupted.
                </li>
              </ul>
            </motion.div>
          </div>
          <div className="code-panel">
            <motion.pre {...fadeUp} style={{ margin: 0 }}>
              <span className="token-comment">
                # Standard State Management (Fragile)
              </span>
              {"\n\n"}
              <span className="token-keyword">async function</span>{" "}
              <span className="token-entity">executeTransition</span>() {"{"}
              {"\n"}
              {"  "}
              <span className="token-comment">
                {/* System executes an external request */}
              </span>
              {"\n"}
              {"  "}
              <span className="token-keyword">const</span> data ={" "}
              <span className="token-keyword">await</span> fetchExternalAPI();
              {"\n\n"}
              {"  "}
              <span className="token-comment">
                {/* 💥 KERNEL PANIC OR OOM KILL HAPPENS HERE 💥 */}
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
          </div>
        </section>

        {/* SPLIT SECTION: LEXUM WRITE-AHEAD LOG */}
        <section className="split-section reverse">
          <div className="split-content">
            <motion.div {...fadeUp}>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                  lineHeight: 1.1,
                }}
              >
                The Replicated Ledger
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                  marginBottom: "2rem",
                }}
              >
                Lexum bypasses memory volatility entirely. Every incoming
                message is strictly serialized into a Write-Ahead Log (WAL)
                before the Virtual Machine is even allowed to execute the
                bytecode. Periodically, the deterministic state is dumped into
                an immutable <code>.snapshot.json</code>.
              </p>
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  padding: "1.5rem",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  marginTop: "2rem",
                }}
              >
                <p
                  style={{
                    color: "var(--text-main)",
                    fontWeight: 600,
                    margin: 0,
                    textTransform: "uppercase",
                    fontSize: "0.9rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  Persistence Mechanics
                </p>
                <div
                  style={{
                    marginTop: "1rem",
                    display: "grid",
                    gap: "1rem",
                    fontSize: "0.95rem",
                    color: "var(--text-muted)",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "var(--text-main)",
                        marginRight: "0.5rem",
                      }}
                    >
                      Append-Only Log:
                    </span>{" "}
                    Messages exist mathematically before they are evaluated.
                  </div>
                  <div>
                    <span
                      style={{
                        color: "var(--text-main)",
                        marginRight: "0.5rem",
                      }}
                    >
                      Cycle Hash Verification:
                    </span>{" "}
                    Snapshots are cryptographically hashed to guarantee playback
                    fidelity.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="code-panel">
            <motion.pre {...fadeUp} style={{ margin: 0 }}>
              <span className="token-comment">
                {/* The Lexum Snapshot JSON (Verifiable) */}
              </span>
              {"\n\n"}
              {"{"}
              {"\n"}
              {"  "}
              <span className="token-property">"domain"</span>:{" "}
              <span className="token-property">"MetricsAggregator"</span>,{"\n"}
              {"  "}
              <span className="token-property">"cycle"</span>:{" "}
              <span className="token-operator">4092</span>,{"\n"}
              {"  "}
              <span className="token-property">"run_hash"</span>:{" "}
              <span className="token-property">"0x9f8b4a2e..."</span>,{"\n"}
              {"  "}
              <span className="token-property">"state"</span>: {"{"}
              {"\n"}
              {"    "}
              <span className="token-property">"status"</span>:{" "}
              <span className="token-property">"Active"</span>,{"\n"}
              {"    "}
              <span className="token-property">"nodes"</span>:{" "}
              <span className="token-operator">12</span>
              {"\n"}
              {"  "}
              {"}"},{"\n"}
              {"  "}
              <span className="token-property">"mailbox_offset"</span>:{" "}
              <span className="token-operator">142</span>
              {"\n"}
              {"}"}
              {"\n\n"}
              <span className="token-comment">
                {/* When combined with the Write-Ahead Log (events 143+),*/}
              </span>
              {"\n"}
              <span className="token-comment">
                {/* the runtime can perfectly reconstruct any future state. */}
              </span>
            </motion.pre>
          </div>
        </section>

        {/* CONTENT SECTION: SNAPSHOT VS EVENT SOURCING */}
        <section
          className="content-section"
          style={{ background: "var(--bg-base)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="two-col-grid align-top">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Memory Architecture</h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                }}
              >
                Snapshot-First vs Event Sourcing
              </p>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{
                delay: 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p style={{ marginBottom: "2rem" }}>
                Many high-reliability systems use Event Sourcing (recording every single action in an infinite log) to achieve safety. However, replaying massive 5-year-old event logs to achieve current state is incredibly slow and expensive. Lexum uses a <strong>Snapshot-First Architecture</strong>.
              </p>

              <div style={{ display: "grid", gap: "2rem" }}>
                <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "1rem" }}>
                  <h3 style={{ fontSize: "1.1rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>Bounded Causal Journals</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>The snapshot is the canonical truth. Crash recovery is near-instantaneous because the runtime loads the latest image into memory, bypassing the need to replay thousands of historical events. The log is bounded strictly to events occurring <em>after</em> the latest snapshot hash.</p>
                </div>
                
                <div style={{ borderLeft: "2px solid var(--text-muted)", paddingLeft: "1rem" }}>
                  <h3 style={{ fontSize: "1.1rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>Structural Consistency (COW)</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>The Lexum persistent state model is built using advanced Copy-on-Write (COW) memory structures. When a transition occurs, it creates a new delta state. The runtime asynchronously flushes the previous valid state to disk without blocking the main execution thread.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTENT SECTION: THE CRASH SEQUENCE */}
        <section
          className="content-section"
          style={{ background: "var(--bg-surface)" }}
        >
          <div className="two-col-grid align-top">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Flawless Resumption</h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                }}
              >
                Seamless Disaster Recovery
              </p>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{
                delay: 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p style={{ marginBottom: "2rem" }}>
                Because the Execution DAG is entirely deterministic, a server
                crash is treated as a minor disruption rather than a critical
                failure. The system simply wakes up, loads the memory block, and
                proceeds forward in time.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    background: "var(--bg-base)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "1rem",
                      borderRight: "1px solid var(--border)",
                      minWidth: "120px",
                      flex: "1 1 auto",
                      textAlign: "center",
                      background: "rgba(239, 68, 68, 0.1)",
                    }}
                  >
                    <code
                      style={{
                        color: "#ef4444",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                      }}
                    >
                      CRASH
                    </code>
                  </div>
                  <div
                    style={{
                      padding: "1rem",
                      color: "var(--text-main)",
                      flex: "3 1 200px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Data center loses power. Process is killed instantaneously.
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    background: "var(--bg-base)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "1rem",
                      borderRight: "1px solid var(--border)",
                      minWidth: "120px",
                      flex: "1 1 auto",
                      textAlign: "center",
                    }}
                  >
                    <code
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                      }}
                    >
                      BOOT
                    </code>
                  </div>
                  <div
                    style={{
                      padding: "1rem",
                      color: "var(--text-muted)",
                      flex: "3 1 200px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Lexum runtime spins up. Identifies missing in-memory state.
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    background: "var(--bg-base)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "1rem",
                      borderRight: "1px solid var(--border)",
                      minWidth: "120px",
                      flex: "1 1 auto",
                      textAlign: "center",
                    }}
                  >
                    <code
                      style={{
                        color: "var(--accent)",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                      }}
                    >
                      RESTORE
                    </code>
                  </div>
                  <div
                    style={{
                      padding: "1rem",
                      color: "var(--text-main)",
                      flex: "3 1 200px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Loads <code>.snapshot.json</code> at Cycle 4092. Replays WAL
                    messages 143 to 147. Exact state is reached in microseconds.
                  </div>
                </div>
              </div>

              <p
                style={{
                  marginTop: "2rem",
                  fontSize: "0.95rem",
                  color: "var(--text-muted)",
                  borderLeft: "2px solid var(--border)",
                  paddingLeft: "1rem",
                }}
              >
                No reconciliation storms. No dropped webhooks. The system
                operates as if the crash never occurred.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="content-section" style={{ textAlign: "center" }}>
          <motion.div
            {...fadeUp}
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              The Road to v1.0
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                color: "var(--text-muted)",
                margin: "1.5rem 0 2.5rem",
              }}
            >
              Lexum is advancing toward a fully distributed consensus-driven
              journal architecture.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/whitepaper" className="btn btn-primary">
                Read the Whitepaper
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
