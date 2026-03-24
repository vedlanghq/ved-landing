"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackgroundShapes from "../components/BackgroundShapes";
import { motion } from "framer-motion";
import { useState } from "react";

function AccordionItem({
  title,
  limitation,
  solution,
  labelA = "The limit:",
  labelB = "The Ved approach:",
}: Readonly<{
  title: string;
  limitation?: string;
  solution: string;
  labelA?: string;
  labelB?: string;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid var(--border)", padding: "1rem 0" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          background: "none",
          border: "none",
          color: "var(--text-main)",
          fontSize: "1.25rem",
          fontWeight: 500,
          cursor: "pointer",
          padding: "0.5rem 0",
          fontFamily: "inherit",
          textAlign: "left",
        }}
      >
        <span>{title}</span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        style={{ overflow: "hidden" }}
        transition={{ duration: 0.3 }}
      >
        <div
          style={{
            paddingTop: "1rem",
            paddingBottom: "0.5rem",
            color: "var(--text-muted)",
            fontSize: "1.05rem",
            lineHeight: 1.6,
          }}
        >
          {limitation && (
            <p style={{ marginBottom: "0.75rem" }}>
              <strong style={{ color: "var(--text-main)", fontWeight: 600 }}>
                {labelA}
              </strong>{" "}
              {limitation}
            </p>
          )}
          <p>
            <strong style={{ color: "var(--text-main)", fontWeight: 600 }}>
              {labelB}
            </strong>{" "}
            {solution}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
function FAQItem({
  question,
  answer,
}: Readonly<{
  question: string;
  answer: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      style={{
        borderBottom: "1px solid var(--border)",
      }}
      initial={false}
      animate={{
        backgroundColor: isOpen ? "var(--bg-surface-hover)" : "transparent",
      }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          background: "none",
          border: "none",
          color: "var(--text-main)",
          fontSize: "1.25rem",
          fontWeight: 600,
          cursor: "pointer",
          padding: "1.5rem 1rem",
          fontFamily: "inherit",
          textAlign: "left",
        }}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: isOpen ? "var(--text-main)" : "var(--border)",
            color: isOpen ? "var(--bg-base)" : "var(--text-main)",
            flexShrink: 0,
            marginLeft: "1rem",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.div>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        style={{ overflow: "hidden", padding: "0 1rem" }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          style={{
            paddingBottom: "1.5rem",
            color: "var(--text-muted)",
            fontSize: "1.1rem",
            lineHeight: 1.6,
          }}
        >
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
}
export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const codeData = `domain WorkerPool {
  state {
    desired: int
    actual: int
  }

  goal Stable {
    predicate actual == desired
  }

  transition ScaleUp {
    step {
      emit ProvisionWorker()
    }
  }
}`;
    navigator.clipboard.writeText(codeData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Refined standard motion
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
        {/* HERO */}
        <section className="hero-section">
          <div className="hero-grid">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="hero-text"
            >
              <motion.h1 variants={itemFade}>
                Deterministic orchestration
                <br />
                for distributed software.
              </motion.h1>

              <motion.p className="sub-text" variants={itemFade}>
                Ved is a declarative systems programming language for building
                reliable control planes that continuously stabilize complex
                software environments.
              </motion.p>

              <motion.p className="tagline" variants={itemFade}>
                Describe how systems should behave. Let the runtime make them
                stable.
              </motion.p>

              <motion.div className="cta-group" variants={itemFade}>
                <Link href="/errors" className="btn btn-primary">
                  Explore Development Experience
                </Link>
                <a
                  href="https://github.com/vedlanghq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  View on GitHub
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section id="vision" className="content-section">
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Operating distributed systems is still fragile.</h2>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{
                delay: 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              <p>
                Modern software platforms are composed of many interacting
                services, queues, agents, and infrastructure layers. The logic
                that governs deployment, scaling, recovery, and coordination is
                often implemented using...
              </p>
              <div className="accordion-group" style={{ margin: "2rem 0" }}>
                <AccordionItem
                  title="Imperative scripts"
                  limitation="Sequential, step-by-step scripts fail unpredictably halfway through, leaving systems in unknown partial states that require manual intervention."
                  solution="Ved uses declarative goals. The runtime continuously calculates and executes the safest path to equilibrium regardless of the starting state."
                />
                <AccordionItem
                  title="Controller boilerplate"
                  limitation="Developers spend countless hours writing redundant loops, error handling, and retry logic just to watch for simple state changes."
                  solution="Ved's runtime intrinsically provides the observation and execution loop, letting you write only the exact domain logic and transition bounds."
                />
                <AccordionItem
                  title="Configuration drift"
                  limitation="Live systems drift from their declared configuration due to manual changes, edge cases, or silent failures, leading to unstable environments."
                  solution="Ved constantly cross-references live actual state with declared desired state, actively scheduling transitions to repair deviations automatically."
                />
                <AccordionItem
                  title="Non-reproducible execution timing"
                  limitation="Race conditions and asynchronous task scheduling cause intermittent, impossible-to-reproduce bugs in distributed networks."
                  solution="Ved processes orchestration logic in strictly sequential, deterministic slices, making every system transition 100% reproducible and testable."
                />
              </div>
              <p>
                As systems grow, operational behaviour becomes harder to reason
                about and failures become harder to reproduce.
              </p>
            </motion.div>
          </div>
        </section>

        {/* VED IDEA SECTION */}
        <section id="features" className="content-section">
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Ved treats system behaviour as a program.</h2>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{
                delay: 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              <p>Ved programs define:</p>
              <div className="accordion-group" style={{ margin: "2rem 0" }}>
                <AccordionItem
                  title="Persistent system state"
                  limitation="The canonical representation of the domain logic."
                  solution="State definitions explicitly encode exactly what properties of a system determine its behavior, automatically versioned and schema-managed."
                  labelA="Concept:"
                  labelB="Purpose:"
                />
                <AccordionItem
                  title="Stable operating goals"
                  limitation="Expressions describing what a valid state looks like."
                  solution="Instead of writing imperative checks, you declare specific invariant rules (predicates). If any rule fails, the system knows it is out of equilibrium."
                  labelA="Concept:"
                  labelB="Purpose:"
                />
                <AccordionItem
                  title="Deterministic transition logic"
                  limitation="Strictly pure functions that map from state to state."
                  solution="Transitions encode safe pathways between states. They are recorded and fully replayable without any network or disk IO side-effects mutating them under the hood."
                  labelA="Concept:"
                  labelB="Purpose:"
                />
                <AccordionItem
                  title="Structured authority boundaries"
                  limitation="Cryptographically enforced bounds on who can mutate state."
                  solution="Defines exact Role-Based limitations baked directly into the compiler, ensuring unauthorized transactions are dropped before they even reach the executor."
                  labelA="Concept:"
                  labelB="Purpose:"
                />
              </div>
              <p>
                The runtime continuously evaluates current conditions and drives
                the system toward declared equilibrium states. This shifts
                orchestration from reactive scripting to analyzable system
                evolution.
              </p>
            </motion.div>
          </div>
        </section>

        {/* EXECUTION LOOP */}
        <section className="execution-loop-section">
          <motion.div className="loop-container" {...fadeUp}>
            <h2>Deterministic execution loop</h2>
            <div className="loop-track" style={{ flexWrap: "nowrap", fontSize: "clamp(0.65rem, 1.2vw, 1rem)", padding: "1.5rem", gap: "0.5rem 0.75rem", overflowX: "auto", whiteSpace: "nowrap" }}>
              <span>observe state</span>
              <span className="arrow">→</span>
              <span>evaluate goals</span>
              <span className="arrow">→</span>
              <span>schedule transition</span>
              <span className="arrow">→</span>
              <span>persist mutation</span>
              <span className="arrow">→</span>
              <span>emit effects</span>
              <span className="arrow">→</span>
              <span>repeat</span>
            </div>
            <p>
              Ved executes orchestration logic in discrete deterministic slices.
              External side-effects are recorded and replayable, enabling
              reproducible debugging and crash-safe recovery.
            </p>
          </motion.div>
        </section>

        {/* CODE BLOCK & RUNTIME SIMULATION */}
        <section className="code-split-section">
          <div className="two-col-grid align-top">
            <motion.div className="code-block-wrapper" {...fadeUp}>
              <h3>Example: self-stabilizing worker pool</h3>
              <div
                className="code-panel primary-code"
                style={{ position: "relative" }}
              >
                <button
                  onClick={handleCopy}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: "transparent",
                    border: "1px solid var(--border)",
                    color: copied ? "var(--text)" : "var(--text-muted)",
                    padding: "0.25rem 0.75rem",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-mono)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {copied ? "Copied" : "Copy"}
                </button>
                <pre>
                  <code>
                    <span className="token-keyword">domain</span>{" "}
                    <span className="token-entity">WorkerPool</span> {"{\n"}
                    {"  "}
                    <span className="token-keyword">state</span> {"{\n"}
                    {"    "}
                    <span className="token-property">desired</span>: int{"\n"}
                    {"    "}
                    <span className="token-property">actual</span>: int{"\n"}
                    {"  }\n\n"}
                    {"  "}
                    <span className="token-keyword">goal</span>{" "}
                    <span className="token-entity">Stable</span> {"{\n"}
                    {"    "}
                    <span className="token-keyword">predicate</span> actual{" "}
                    <span className="token-operator">==</span> desired{"\n"}
                    {"  }\n\n"}
                    {"  "}
                    <span className="token-keyword">transition</span>{" "}
                    <span className="token-entity">ScaleUp</span> {"{\n"}
                    {"    "}
                    <span className="token-keyword">step</span> {"{\n"}
                    {"      "}
                    <span className="token-keyword">emit</span>{" "}
                    <span className="token-entity">ProvisionWorker</span>()
                    {"\n"}
                    {"    }\n"}
                    {"  }\n"}
                    {"}"}
                  </code>
                </pre>
              </div>
              <p className="caption">
                The runtime continuously reconciles actual system state with
                declared goals.
              </p>
            </motion.div>

            <motion.div
              className="code-block-wrapper"
              {...fadeUp}
              transition={{
                delay: 0.15,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              <h3>Runtime behaviour</h3>
              <div className="code-panel runtime-output">
                <pre>
                  <code>
                    <span className="token-dim">tick=1</span> desired=3 actual=0{" "}
                    <span className="token-dim">→</span>{" "}
                    <span className="hl-accent">scheduling ScaleUp</span>
                    {"\n"}
                    <span className="token-dim">tick=2</span> actual=1{"\n"}
                    <span className="token-dim">tick=3</span> actual=2{"\n"}
                    <span className="token-dim">tick=4</span> actual=3{" "}
                    <span className="token-dim">→</span>{" "}
                    <span className="hl-success">goal Stable satisfied</span>
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ARCHITECTURE & ROADMAP */}
        <section className="content-section">
          <div className="two-col-grid align-top">
            <motion.div className="col-text" {...fadeUp}>
              <h3>Project structure</h3>
              <ul className="brutalist-list" style={{ marginTop: "1rem" }}>
                <li>
                  <strong>ved-runtime</strong>{" "}
                  <span
                    style={{
                      color: "var(--text-muted)",
                      fontWeight: 400,
                      marginLeft: "1ch",
                    }}
                  >
                    — deterministic execution engine
                  </span>
                </li>
                <li>
                  <strong>ved-compiler</strong>{" "}
                  <span
                    style={{
                      color: "var(--text-muted)",
                      fontWeight: 400,
                      marginLeft: "1ch",
                    }}
                  >
                    — language frontend and semantic validation
                  </span>
                </li>
                <li>
                  <strong>ved-cli</strong>{" "}
                  <span
                    style={{
                      color: "var(--text-muted)",
                      fontWeight: 400,
                      marginLeft: "1ch",
                    }}
                  >
                    — operational tooling
                  </span>
                </li>
              </ul>
              <p>
                Ved is being developed in public with a focus on validating
                deterministic orchestration semantics before distributed runtime
                expansion.
              </p>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{
                delay: 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              <h3>Development roadmap</h3>
              <ul className="brutalist-list" style={{ marginTop: "1rem" }}>
                <li>Deterministic scheduler prototype</li>
                <li>Persistent state journal</li>
                <li>Replayable execution model</li>
                <li>Syntax and IR stabilization</li>
                <li>Convergence analysis tooling</li>
                <li>Distributed runtime research</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section
          className="content-section"
          style={{ background: "var(--bg-surface)" }}
        >
          <motion.div
            style={{ maxWidth: "1000px", margin: "0 auto" }}
            {...fadeUp}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                textTransform: "uppercase",
                marginBottom: "3rem",
                letterSpacing: "-0.03em",
              }}
            >
              Frequently Asked Questions
            </h2>
            <div style={{ borderTop: "1px solid var(--border)" }}>
              <FAQItem
                question="What is Ved?"
                answer={
                  <p>
                    Ved is a deterministic control-plane programming language
                    designed to help engineers build reliable, long-running
                    distributed systems. It enables developers to describe
                    desired system behaviour using structured state models,
                    goals, and bounded execution logic.
                  </p>
                }
              />
              <FAQItem
                question="What problem does Ved solve?"
                answer={
                  <>
                    <p>
                      Modern distributed systems are difficult to operate
                      because orchestration logic is often:
                    </p>
                    <ul
                      className="brutalist-list check"
                      style={{ marginTop: "1rem" }}
                    >
                      <li>imperative</li>
                      <li>non-deterministic</li>
                      <li>difficult to reproduce</li>
                      <li>prone to configuration drift</li>
                    </ul>
                    <p style={{ marginTop: "1rem" }}>
                      Ved introduces a deterministic execution model that helps
                      systems converge toward stable operating conditions.
                    </p>
                  </>
                }
              />
              <FAQItem
                question="How is Ved different from existing programming languages?"
                answer={
                  <p>
                    Ved focuses on orchestration behaviour rather than
                    application logic. It provides built-in concepts such as
                    persistent system state, convergence goals, structured
                    authority boundaries, and replayable execution, which are
                    not primary concerns in most general-purpose languages.
                  </p>
                }
              />
              <FAQItem
                question="Is Ved intended to replace languages like Rust, Go, or Python?"
                answer={
                  <p>
                    No. Ved is intended to complement existing languages by
                    governing system behaviour at the control-plane level.
                    Application services and data-plane logic can continue to be
                    implemented using traditional languages.
                  </p>
                }
              />
              <FAQItem
                question="What does deterministic execution mean in Ved?"
                answer={
                  <p>
                    Deterministic execution means that given the same initial
                    state and external inputs, the runtime will evolve the
                    system in the same way every time. This enables reproducible
                    debugging, predictable recovery, and improved operational
                    reasoning.
                  </p>
                }
              />
              <FAQItem
                question="What are goals in Ved?"
                answer={
                  <p>
                    Goals represent stable desired conditions for the system.
                    The runtime continuously evaluates current state and
                    executes transitions that help the system move toward
                    satisfying these goals.
                  </p>
                }
              />
              <FAQItem
                question="Can Ved interact with real infrastructure or external systems?"
                answer={
                  <p>
                    Yes. External interactions are modeled as explicit effects.
                    These effects are isolated, recorded, and replayable,
                    allowing the runtime to maintain deterministic behaviour
                    while operating in unpredictable environments.
                  </p>
                }
              />
              <FAQItem
                question="Is Ved suitable for building general application software?"
                answer={
                  <p>
                    Ved is primarily designed for control-plane orchestration
                    and long-lived system coordination. It is not intended to
                    replace traditional application frameworks.
                  </p>
                }
              />
              <FAQItem
                question="Is Ved production ready?"
                answer={
                  <p>
                    Ved is currently in early design and prototyping stages. The
                    project focuses on validating deterministic runtime
                    semantics and convergence models before expanding toward
                    broader production use.
                  </p>
                }
              />
            </div>
          </motion.div>
        </section>

        {/* GET INVOLVED */}
        <section className="footer-cta-section">
          <motion.div
            style={{ maxWidth: "1000px", margin: "0 auto" }}
            {...fadeUp}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}
            >
              Participate in early design
            </h2>
            <p
              style={{
                fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                color: "var(--text-muted)",
                marginBottom: "4rem",
                lineHeight: 1.5,
              }}
            >
              Ved is an experimental systems programming project focused on
              reliability engineering for distributed software.
            </p>
            <div className="large-ctas">
              <a
                href="https://github.com/orgs/vedlanghq/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="large-link"
              >
                Join discussions
              </a>
              <Link href="/errors" className="large-link">
                Explore developer experience
              </Link>
              <a
                href="https://github.com/vedlanghq"
                target="_blank"
                rel="noopener noreferrer"
                className="large-link"
              >
                Contribute ideas
              </a>
            </div>
          </motion.div>
        </section>

        {/* FINAL TAGLINE */}
        <section
          style={{
            padding: "4rem 2rem 8rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1] as const,
                  staggerChildren: 0.03,
                  delayChildren: 0.4,
                },
              },
            }}
          >
            <p
              className="final-tagline"
              style={{ display: "inline-block", margin: 0 }}
            >
              {"Orchestrate complex software with certainty."
                .split("")
                .map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { display: "none" },
                      visible: { display: "inline" },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.4,
                }}
                style={{
                  marginLeft: "0.1em",
                  display: "inline-block",
                  width: "0.5ch",
                  height: "0.8em",
                  backgroundColor: "currentColor",
                  verticalAlign: "baseline",
                }}
              />
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
