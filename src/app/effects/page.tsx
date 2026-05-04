"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundShapes from "@/components/BackgroundShapes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EffectsPage() {
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
                Zero-Trust Boundaries
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
                I/O is an intent.
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
                Effects are never executed imperatively. They are declared, tracked, and dispatched exclusively by the runtime under strict cryptographic capabilities.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* SPLIT SECTION: THE VULNERABILITY */}
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
                The Privilege Escalation Vulnerability
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                  marginBottom: "2rem",
                }}
              >
                In standard languages, any function deep within the call stack can arbitrarily open sockets, read the filesystem, or mutate global memory. The compiler has no authority to stop an imported library from making an unauthorized HTTP request.
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
                    Hidden Side-Effects
                  </strong>{" "}
                  Data leaks out of boundaries without explicit architectural visibility.
                </li>
                <li
                  style={{
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <strong style={{ color: "var(--accent)" }}>
                    Supply Chain Risks
                  </strong>{" "}
                  Compromised dependencies inherit the privileges of the main process natively.
                </li>
              </ul>
            </motion.div>
          </div>
          <div className="code-panel">
            <motion.pre {...fadeUp} style={{ margin: 0 }}>
              <span className="token-comment">
                # Standard Execution (Unsafe)
              </span>
              {"\n\n"}
              <span className="token-keyword">import</span> {"{ calculate_metrics }"} <span className="token-keyword">from</span> <span className="token-property">"third-party-lib"</span>{"\n\n"}
              <span className="token-keyword">function</span> <span className="token-entity">processData</span>(payload) {"{"}{"\n"}
              {"  "}<span className="token-comment">// A seemingly pure function call...</span>{"\n"}
              {"  "}<span className="token-keyword">const</span> metrics = calculate_metrics(payload);{"\n\n"}
              {"  "}<span className="token-comment">// 💥 The library just silently exfiltrated data</span>{"\n"}
              {"  "}<span className="token-comment">// over HTTP because standard VMs have</span>{"\n"}
              {"  "}<span className="token-comment">// no concept of scope containment.</span>{"\n"}
              {"  "}save(metrics);{"\n"}
              {"}"}
            </motion.pre>
          </div>
        </section>

        {/* SPLIT SECTION: THE EFFECT VAULT */}
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
                The Lexum Effect Vault
              </h2>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-muted)",
                  marginBottom: "2rem",
                }}
              >
                Lexum sandboxes the Virtual Machine. An execution slice cannot execute an effect; it can only <strong>yield an effect intent</strong> to the runtime. The runtime statically cross-references the intent against the domain's declared <code>capabilities</code> manifest before execution.
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
                  Capability Requirements
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
                        color: "var(--accent)",
                        marginRight: "0.5rem",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      network.ingress
                    </span>{" "}
                    Required to receive external messages.
                  </div>
                  <div>
                    <span
                      style={{
                        color: "var(--accent)",
                        marginRight: "0.5rem",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      network.egress
                    </span>{" "}
                    Required to emit webhooks or HTTP requests.
                  </div>
                  <div>
                    <span
                      style={{
                        color: "var(--accent)",
                        marginRight: "0.5rem",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      domain.spawn
                    </span>{" "}
                    Required to dynamically allocate child domains.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="code-panel">
            <motion.pre {...fadeUp} style={{ margin: 0 }}>
              <span className="token-comment">
                // Lexum Effect Paradigm (Sandboxed)
              </span>
              {"\n\n"}
              <span className="token-keyword">domain</span> <span className="token-entity">MetricsAggregator</span> {"{"}
              {"\n"}
              {"  "}<span className="token-comment">// Statically required upfront</span>{"\n"}
              {"  "}<span className="token-keyword">capability</span> {"{"} network.egress {"}"}
              {"\n\n"}
              {"  "}<span className="token-keyword">transition</span> <span className="token-entity">ProcessTick</span>() {"{"}
              {"\n"}
              {"    "}<span className="token-keyword">let</span> report = calculate_metrics();{"\n\n"}
              {"    "}<span className="token-comment">// Lexum physically cannot fetch() here.</span>{"\n"}
              {"    "}<span className="token-comment">// It must yield an effect object.</span>{"\n"}
              {"    "}<span className="token-keyword">yield</span> effect {"{"}{"\n"}
              {"      "}type: <span className="token-property">HttpRequest</span>,{"\n"}
              {"      "}target: <span className="token-property">"https://log.svc"</span>,{"\n"}
              {"      "}payload: report{"\n"}
              {"    "}{"}"};{"\n"}
              {"  "}{"}"}
              {"\n"}
              {"}"}
            </motion.pre>
          </div>
        </section>

        {/* CONTENT SECTION: THE EFFECT LIFECYCLE */}
        <section
          className="content-section"
          style={{ background: "var(--bg-base)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="two-col-grid align-top">
            <motion.div className="col-text" {...fadeUp}>
              <h2>The Effect Lifecycle</h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                }}
              >
                Outside the Matrix
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
                Because Lexum enforces strict deterministic execution, unpredictable I/O operations are offloaded entirely to the host runtime. The architecture operates across a strict boundary:
              </p>

              <div style={{ display: "grid", gap: "2rem" }}>
                <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "1rem" }}>
                  <h3 style={{ fontSize: "1.1rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>1. Intent Emission</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Inside the deterministic slice, the Domain calculates the necessity of an action and emits an <strong>Intent</strong> (e.g., <code>CreateVM</code>). This does not mutate the external world. It only safely mutates the outbound queue.</p>
                </div>
                
                <div style={{ borderLeft: "2px solid var(--text-muted)", paddingLeft: "1rem" }}>
                  <h3 style={{ fontSize: "1.1rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>2. Runtime Execution</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>The Lexum Runtime operating outside the deterministic boundary reads the intent and performs the chaotic network HTTP request. This happens asynchronously and does not block the VM.</p>
                </div>

                <div style={{ borderLeft: "2px solid var(--text-muted)", paddingLeft: "1rem" }}>
                  <h3 style={{ fontSize: "1.1rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>3. Event Logging</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>Once the external system responds, the Lexum Runtime writes the exact result into an Append-Only Event Log, securely indexing it with a correlation ID.</p>
                </div>

                <div style={{ borderLeft: "2px solid var(--accent)", paddingLeft: "1rem" }}>
                  <h3 style={{ fontSize: "1.1rem", color: "var(--text-main)", marginBottom: "0.5rem" }}>4. Deterministic Injection</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>The recorded HTTP response is passed back into the Domain's mailbox. The next deterministic slice reads the static result and updates its internal state.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTENT SECTION: SCOPE CONTAINMENT */}
        <section
          className="content-section"
          style={{ background: "var(--bg-surface)" }}
        >
          <div className="two-col-grid align-top">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Scope Containment</h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "1.1rem",
                  marginBottom: "1rem",
                }}
              >
                Physical memory blocks
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
                Lexum limits capability usage to specific structural <code>scopes</code>. A function running inside a <code>goal</code> evaluation scope is fundamentally banned from mutating state. It is not just a linting suggestion; the VM lacks the opcodes to execute mutations in that scope.
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
                      minWidth: "140px",
                      flex: "1 1 auto",
                      textAlign: "center",
                    }}
                  >
                    <code
                      style={{
                        color: "var(--text-main)",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                      }}
                    >
                      scope {"{ goal }"}
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
                    Pure predicate reads. Memory allocations & effects are physically blocked by the VM.
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
                      minWidth: "140px",
                      flex: "1 1 auto",
                      textAlign: "center",
                    }}
                  >
                    <code
                      style={{ color: "var(--text-main)", fontSize: "1.1rem", fontWeight: 600 }}
                    >
                      scope {"{ invariant }"}
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
                    Mathematical assertion layer. Side-effects immediately trap compiler <code>A008</code> error.
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
                      minWidth: "140px",
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
                      scope {"{ transition }"}
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
                    Allows state mutation and effect yielding, but forbids direct block execution.
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
                Security in Lexum is not layered on top; it is structurally embedded into the AST hierarchy. You cannot compromise what the architecture forbids from existing.
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
              Dig into Capabilities
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                color: "var(--text-muted)",
                margin: "1.5rem 0 2.5rem",
              }}
            >
              Learn how zero-trust boundaries are enforced across the network.
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
                href="/docs"
                className="btn btn-primary"
              >
                Capabilities Manifest
              </Link>
              <Link
                href="/determinism"
                className="btn btn-secondary"
                style={{
                  background: "transparent",
                  color: "var(--text-main)",
                  border: "1px solid var(--border)",
                }}
              >
                View Determinism
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
