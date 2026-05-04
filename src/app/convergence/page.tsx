"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundShapes from "@/components/BackgroundShapes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
                The Goal Engine
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
                Declare the bounds.
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
                Stop writing imperative while loops. Declare the target state
                predicates and let the runtime evaluate, resolve conflicts, and
                drive the system toward convergence.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* SPLIT SECTION: THE VULNERABILITY (IMPERATIVE DRIFT) */}
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
                The Imperative Drift
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                  marginBottom: "2rem",
                }}
              >
                Standard automation relies on manual reconciliation loops. When
                multiple scripts or controllers manage the same infrastructure,
                they often fight each other, creating infinite "livelocks" where
                the system thrashes without ever reaching stability.
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
                    Logic Collisions
                  </strong>{" "}
                  Controller A scales up, Controller B scales down. Neither
                  knows the other exists.
                </li>
                <li
                  style={{
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <strong style={{ color: "var(--accent)" }}>
                    Infinite Thrashing
                  </strong>{" "}
                  The system endlessly mutates state, burning CPU and API limits
                  without halting.
                </li>
              </ul>
            </motion.div>
          </div>
          <div className="code-panel">
            <motion.pre {...fadeUp} style={{ margin: 0 }}>
              <span className="token-comment">
                {/* Standard Automation (Unaware of collisions) */}
              </span>
              {"\n\n"}
              <span className="token-keyword">async function</span>{" "}
              <span className="token-entity">reconcileLoop</span>() {"{"}
              {"\n"}
              {"  "}
              <span className="token-keyword">while</span> {" ("}
              <span className="token-property">true</span> {" ) "}
              {"{"}
              {"\n"}
              {"    "}
              <span className="token-keyword">let</span> state ={" "}
              <span className="token-keyword">await</span> fetchState();{"\n\n"}
              {"    "}
              <span className="token-comment">
                {/* This blind imperative logic will */}
              </span>
              {"\n"}
              {"    "}
              <span className="token-comment">
                {/* fight forever against a second script */}
              </span>
              {"\n"}
              {"    "}
              <span className="token-comment">
                {/* that wants nodes {"<"} 5 */}
              </span>
              {"\n"}
              {"    "}
              <span className="token-keyword">if</span> (state.nodes {"<"}{" "}
              <span className="token-operator">5</span>) {"{"}
              {"\n"}
              {"      "}
              <span className="token-keyword">await</span> scaleUp();{"\n"}
              {"    "}
              {"}"}
              {"\n\n"}
              {"    "}
              <span className="token-keyword">await</span>
              {" sleep("}
              <span className="token-operator">1000</span>
              {");\n"}
              {"  "}
              {"}"}
              {"\n"}
              {"}"}
            </motion.pre>
          </div>
        </section>

        {/* SPLIT SECTION: LEXUM GOAL PREDICATES */}
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
                Predicate Declarations
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                  marginBottom: "2rem",
                }}
              >
                Lexum completely abandons the <code>while</code> loop. Instead,
                you declare a <code>goal</code>. The Lexum VM natively evaluates
                all active goals across all domains, calculating priority
                dominance to silence weaker, conflicting intents before a single
                transition is executed.
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
                  Convergence Mechanics
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
                      Priority Dominance:
                    </span>{" "}
                    A `goal` with priority 10 automatically suppresses a
                    conflicting `goal` with priority 5.
                  </div>
                  <div>
                    <span
                      style={{
                        color: "var(--text-main)",
                        marginRight: "0.5rem",
                      }}
                    >
                      Continuous Evaluation:
                    </span>{" "}
                    The engine only invokes transitions when the predicate
                    evaluates to `false`.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="code-panel">
            <motion.pre {...fadeUp} style={{ margin: 0 }}>
              <span className="token-comment">
                {/* Lexum Goal Paradigm (Declarative) */}
              </span>
              {"\n\n"}
              <span className="token-keyword">domain</span>{" "}
              <span className="token-entity">ScalingController</span> {"{"}
              {"\n"}
              {"  "}
              <span className="token-comment">
                {/* The engine constantly evaluates this predicate */}
              </span>
              {"\n"}
              {"  "}
              <span className="token-keyword">goal</span>{" "}
              <span className="token-entity">MaintainCapacity</span>(priority:{" "}
              <span className="token-operator">10</span>) {"{"}
              {"\n"}
              {"    "}state.nodes {">="}{" "}
              <span className="token-operator">5</span>
              {"\n"}
              {"  "}
              {"}"}
              {"\n\n"}
              {"  "}
              <span className="token-comment">
                {/* Transition only invoked if the goal fails */}
              </span>
              {"\n"}
              {"  "}
              <span className="token-keyword">transition</span>{" "}
              <span className="token-entity">ScaleUp</span>() {"{"}
              {"\n"}
              {"    "}
              <span className="token-keyword">yield</span> effect {"{"}
              {"\n"}
              {"      "}type:{" "}
              <span className="token-property">RequestNodes</span>,{"\n"}
              {"      "}count: <span className="token-operator">5</span> -
              state.nodes{"\n"}
              {"    "}
              {"}"};{"\n"}
              {"  "}
              {"}"}
              {"\n"}
              {"}"}
            </motion.pre>
          </div>
        </section>

        {/* CONTENT SECTION: THE SHARED RESPONSIBILITY MODEL */}
        <section
          className="content-section"
          style={{ background: "var(--bg-base)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="two-col-grid align-top">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Predicate Safety</h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                }}
              >
                The Shared Responsibility Model
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
                Because the Lexum runtime continuously evaluates goals after <em>every single state mutation</em>, Goal predicates are heavily restricted by the compiler:
              </p>

              <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                <div style={{ background: "rgba(255,255,255,0.05)", padding: "1rem", borderRadius: "6px", flex: 1, textAlign: "center" }}>
                  <code style={{ color: "var(--accent)" }}>Pure Logic</code>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>No memory mutation.</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", padding: "1rem", borderRadius: "6px", flex: 1, textAlign: "center" }}>
                  <code style={{ color: "var(--accent)" }}>No Effects</code>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Network I/O strictly forbidden.</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", padding: "1rem", borderRadius: "6px", flex: 1, textAlign: "center" }}>
                  <code style={{ color: "var(--accent)" }}>No Wall-Clock</code>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>Time must be logical.</div>
                </div>
              </div>

              <h3 style={{ fontSize: "1.3rem", color: "var(--text-main)", marginBottom: "1rem" }}>The Lexum Guarantee</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1rem", borderLeft: "2px solid var(--accent)", paddingLeft: "1rem" }}>
                Lexum is not a magical AI. You still have to write the <code>transition</code> logic that calls the AWS API. However, Lexum guarantees that if state drifts from a Goal, your reconciliation logic will be deterministically executed, strictly prioritized against 5 levels of systemic importance (<code>Critical</code> to <code>Background</code>), retried upon failure, and safely persisted.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CONTENT SECTION: OSCILLATION TRAPS */}
        <section
          className="content-section"
          style={{ background: "var(--bg-surface)" }}
        >
          <div className="two-col-grid align-top">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Oscillation Traps</h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                }}
              >
                Deterministic Livelock Halting
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
                What happens when a bug is introduced where a domain's
                transition fails to satisfy its own goal, or two equal-priority
                domains get locked into a tug-of-war? Lexum tracks execution
                histories mathematically to catch these failures.
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
                        color: "var(--text-muted)",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                      }}
                    >
                      Cycle N..9
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
                    Engine observes identical state transitions failing to
                    satisfy the goal predicate repeatedly.
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
                      Cycle 10
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
                    <strong style={{ color: "#ef4444" }}>
                      ERROR[E005] Oscillation Detected.
                    </strong>{" "}
                    Engine mathematically proves livelock and physically aborts
                    execution.
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
                By abandoning imperative loops, the Lexum runtime guarantees
                that software either successfully converges to the target state
                or explicitly aborts with a fully reproducible trace hash.
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
              Understand the Math
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                color: "var(--text-muted)",
                margin: "1.5rem 0 2.5rem",
              }}
            >
              Explore how Lexum resolves competing priorities across isolated
              domains.
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
