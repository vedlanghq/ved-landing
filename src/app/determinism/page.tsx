"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundShapes from "@/components/BackgroundShapes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
                Lexum Core Paradigm
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
                Math, not magic.
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
                If the inputs are the same, the execution path is identical.
                Period. No race conditions, no untracked state, no spontaneous
                failures.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* SPLIT SECTION: THE PROBLEM VS LEXUM */}
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
                The Chaos of Imperative Scripting
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                  marginBottom: "2rem",
                }}
              >
                Traditional languages interleave logic, I/O, and state mutation.
                The runtime flies blind, completely unaware of what side-effect
                might explode on the next line. You cannot reliably simulate,
                test, or resume execution after a crash.
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
                    Unpredictable Branches
                  </strong>{" "}
                  Live network responses alter the AST trajectory in real-time.
                </li>
                <li
                  style={{
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <strong style={{ color: "var(--accent)" }}>
                    Phantom State
                  </strong>{" "}
                  Memory is mutated silently without a journal.
                </li>
                <li>
                  <strong style={{ color: "var(--accent)" }}>
                    Catastrophic Failure
                  </strong>{" "}
                  A crash midway means starting over or running a brittle
                  cleanup script.
                </li>
              </ul>
            </motion.div>
          </div>
          <div className="code-panel">
            <motion.pre {...fadeUp} style={{ margin: 0 }}>
              <span className="token-comment">
                # The traditional paradigm (Fragile)
              </span>
              {"\n\n"}
              <span className="token-keyword">def</span>{" "}
              <span className="token-entity">provision_cluster</span>():{"\n"}
              {"  "}state = <span className="token-operator">{}</span>
              {"\n"}
              {"  "}
              <span className="token-comment"># 💥 I/O mixed with logic</span>
              {"\n"}
              {"  "}res = fetch(
              <span className="token-property">
                "https://api.cloud/v1/nodes"
              </span>
              ){"\n"}
              {"  "}
              <span className="token-keyword">if</span> res.status =={" "}
              <span className="token-operator">500</span>:{"\n"}
              {"    "}
              <span className="token-comment">
                # 💥 The runtime had no idea this was coming
              </span>
              {"\n"}
              {"    "}
              <span className="token-keyword">return</span>{" "}
              <span className="token-entity">FatalError</span>
              {"\n\n"}
              {"  "}state.nodes = res.data{"\n"}
              {"  "}
              <span className="token-comment">
                # 💥 If we crash here, the nodes exist but the state is gone
              </span>
              {"\n"}
              {"  "}db.save(state){"\n"}
            </motion.pre>
          </div>
        </section>

        {/* SPLIT SECTION: LEXUM SOLUTION */}
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
                The Causal Graph
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                  marginBottom: "2rem",
                }}
              >
                Lexum enforces a strict boundary between{" "}
                <strong>computation</strong> and <strong>effects</strong>. The
                compiler maps out a static Execution DAG (Directed Acyclic
                Graph) before a single instruction runs. The runtime knows
                exactly what authority will be utilized and what state will be
                accessed.
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
                  Determinism Invariants
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
                      01.
                    </span>{" "}
                    No I/O inside transition slices.
                  </div>
                  <div>
                    <span
                      style={{
                        color: "var(--text-main)",
                        marginRight: "0.5rem",
                      }}
                    >
                      02.
                    </span>{" "}
                    External responses are delivered via mailboxes.
                  </div>
                  <div>
                    <span
                      style={{
                        color: "var(--text-main)",
                        marginRight: "0.5rem",
                      }}
                    >
                      03.
                    </span>{" "}
                    State is advanced via atomic yields.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="code-panel">
            <motion.pre {...fadeUp} style={{ margin: 0 }}>
              <span className="token-comment">
                {/* Lexum Control-Plane Paradigm (Deterministic) */}
              </span>
              {"\n\n"}
              <span className="token-keyword">transition</span>{" "}
              <span className="token-entity">HandleProvision</span>(msg:
              NodeResponse) {"{"}
              {"\n"}
              {"  "}
              <span className="token-comment">
                {/* Pure computation only. No network I/O permitted. */}
              </span>
              {"\n"}
              {"  "}
              <span className="token-keyword">match</span> msg.status {"{"}
              {"\n"}
              {"    "}
              <span className="token-property">Failed</span> {"=>"} {"{"}
              {"\n"}
              {"      "}
              <span className="token-comment">
                {/* Deterministic state yield */}
              </span>
              {"\n"}
              {"      "}
              <span className="token-keyword">yield</span> state {"{"} status:{" "}
              <span className="token-property">Error</span> {"}"};{"\n"}
              {"    "}
              {"}"}
              {"\n"}
              {"    "}
              <span className="token-property">Success</span> {"=>"} {"{"}
              {"\n"}
              {"      "}
              <span className="token-keyword">yield</span> state {"{"} nodes:
              msg.data {"}"};{"\n"}
              {"    "}
              {"}"}
              {"\n"}
              {"  "}
              {"}"}
              {"\n"}
              {"}"}
            </motion.pre>
          </div>
        </section>

        {/* CONTENT SECTION: THE ELIMINATION OF NONDETERMINISM */}
        <section
          className="content-section"
          style={{ background: "var(--bg-base)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="two-col-grid align-top">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Eradicating Chaos</h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                }}
              >
                Zero Implicit Dependencies
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
                To achieve true execution fidelity, Lexum ruthlessly eliminates the four horsemen of nondeterminism from the Virtual Machine entirely:
              </p>

              <div style={{ display: "grid", gap: "2rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>1. Unordered Execution</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Message selection is never left to the host OS thread scheduler. It follows a strict globally deterministic tuple: <code>(priority, logical_time, domain_id, sequence_id)</code>.</p>
                </div>
                
                <div>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>2. Implicit Time</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Lexum VMs cannot read the wall-clock time natively during a slice. Time is advanced via explicit external logical clock ticks injected via the mailbox queue.</p>
                </div>

                <div>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>3. Shared Mutable State</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Global memory does not exist. All state is strictly domain-scoped, isolated, and explicitly mutated via yielding new state hashes.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTENT SECTION: TIME TRAVEL DEBUGGING */}
        <section
          className="content-section"
          style={{ background: "var(--bg-surface)" }}
        >
          <div className="two-col-grid align-top">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Time-Travel Debugging</h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                }}
              >
                Bytecode Replayability
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
                Because Lexum tracks all external interactions in a strictly
                ordered Write-Ahead Log, any failure in production can be
                downloaded as a <code>.snapshot.json</code> and replayed
                locally.
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
                    }}
                  >
                    <code
                      style={{
                        color: "var(--accent)",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                      }}
                    >
                      Tick 0
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
                    Load initial cluster constraints.
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
                      style={{ color: "var(--text-main)", fontSize: "1.1rem" }}
                    >
                      Tick 1
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
                    Process incoming `NodeResponse`. State hash: `0x8f2a`
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
                      background: "rgba(239, 68, 68, 0.1)",
                    }}
                  >
                    <code
                      style={{
                        color: "#ef4444",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                      }}
                    >
                      Tick 2
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
                    Invariant violation detected. Execution aborted.
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
                By feeding the exact same message queue into the exact same
                domain snapshot, the runtime reproduces the exact crash cycle.
                No guesswork. No "heisenbugs".
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
              Explore the Architecture
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                color: "var(--text-muted)",
                margin: "1.5rem 0 2.5rem",
              }}
            >
              Dive deeper into the components that enable zero-trust,
              deterministic execution.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/docs/deterministic-scheduler"
                className="btn btn-primary"
              >
                The Scheduler
              </Link>
              <Link
                href="/docs/execution-dag"
                className="btn btn-secondary"
                style={{
                  background: "transparent",
                  color: "var(--text-main)",
                  border: "1px solid var(--border)",
                }}
              >
                Execution DAG
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
