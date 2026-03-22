"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackgroundShapes from "../components/BackgroundShapes";
import { motion } from "framer-motion";
import { useState } from "react";

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
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  };

  const itemFade = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
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
                Deterministic orchestration<br />for distributed software.
              </motion.h1>
              
              <motion.p className="sub-text" variants={itemFade}>
                Ved is a declarative systems programming language for building reliable control planes that continuously stabilize complex software environments.
              </motion.p>
              
              <motion.p className="tagline" variants={itemFade}>
                Describe how systems should behave. Let the runtime make them stable.
              </motion.p>
              
              <motion.div className="cta-group" variants={itemFade}>
                <Link href="/docs" className="btn btn-primary">
                  Explore Architecture
                </Link>
                <a href="https://github.com/vedlanghq" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  View on GitHub
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="content-section">
            <div className="two-col-grid">
                <motion.div className="col-text" {...fadeUp}>
                    <h2>Operating distributed systems is still fragile.</h2>
                </motion.div>

                <motion.div className="col-text" {...fadeUp} transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}>
                    <p>Modern software platforms are composed of many interacting services, queues, agents, and infrastructure layers. The logic that governs deployment, scaling, recovery, and coordination is often implemented using:</p>
                    <ul className="brutalist-list">
                        <li>Imperative scripts</li>
                        <li>Controller boilerplate</li>
                        <li>Configuration drift</li>
                        <li>Non-reproducible execution timing</li>
                    </ul>
                    <p>As systems grow, operational behaviour becomes harder to reason about and failures become harder to reproduce.</p>
                </motion.div>
            </div>
        </section>

        {/* VED IDEA SECTION */}
        <section className="content-section">
            <div className="two-col-grid">
                <motion.div className="col-text" {...fadeUp}>
                    <h2>Ved treats system behaviour as a program.</h2>
                </motion.div>
                
                <motion.div className="col-text" {...fadeUp} transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}>
                    <p>Ved programs define:</p>
                    <ul className="brutalist-list">
                        <li>Persistent system state</li>
                        <li>Stable operating goals</li>
                        <li>Deterministic transition logic</li>
                        <li>Structured authority boundaries</li>
                    </ul>
                    <p>The runtime continuously evaluates current conditions and drives the system toward declared equilibrium states. This shifts orchestration from reactive scripting to analyzable system evolution.</p>
                </motion.div>
            </div>
        </section>

        {/* EXECUTION LOOP */}
        <section className="execution-loop-section">
            <motion.div className="loop-container" {...fadeUp}>
                <h2>Deterministic execution loop</h2>
                <div className="loop-track">
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
                  Ved executes orchestration logic in discrete deterministic slices. External side-effects are recorded and replayable, enabling reproducible debugging and crash-safe recovery.
                </p>
            </motion.div>
        </section>

        {/* CODE BLOCK & RUNTIME SIMULATION */}
        <section className="code-split-section">
            <div className="two-col-grid align-top">
                <motion.div className="code-block-wrapper" {...fadeUp}>
                    <h3>Example: self-stabilizing worker pool</h3>
                    <div className="code-panel primary-code" style={{ position: "relative" }}>
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
                            transition: "all 0.2s ease"
                          }}
                        >
                          {copied ? "Copied" : "Copy"}
                        </button>
                        <pre>
<code><span className="token-keyword">domain</span> <span className="token-entity">WorkerPool</span> {"{\n"}
{"  "}<span className="token-keyword">state</span> {"{\n"}
{"    "}<span className="token-property">desired</span>: int{"\n"}
{"    "}<span className="token-property">actual</span>: int{"\n"}
{"  }\n\n"}
{"  "}<span className="token-keyword">goal</span> <span className="token-entity">Stable</span> {"{\n"}
{"    "}<span className="token-keyword">predicate</span> actual <span className="token-operator">==</span> desired{"\n"}
{"  }\n\n"}
{"  "}<span className="token-keyword">transition</span> <span className="token-entity">ScaleUp</span> {"{\n"}
{"    "}<span className="token-keyword">step</span> {"{\n"}
{"      "}<span className="token-keyword">emit</span> <span className="token-entity">ProvisionWorker</span>(){"\n"}
{"    }\n"}
{"  }\n"}
{"}"}</code>
                        </pre>
                    </div>
                    <p className="caption">The runtime continuously reconciles actual system state with declared goals.</p>
                </motion.div>

                <motion.div className="code-block-wrapper" {...fadeUp} transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}>
                    <h3>Runtime behaviour</h3>
                    <div className="code-panel runtime-output">
                        <pre>
<code><span className="token-dim">tick=1</span> desired=3 actual=0 <span className="token-dim">→</span> <span className="hl-accent">scheduling ScaleUp</span>{"\n"}
<span className="token-dim">tick=2</span> actual=1{"\n"}
<span className="token-dim">tick=3</span> actual=2{"\n"}
<span className="token-dim">tick=4</span> actual=3 <span className="token-dim">→</span> <span className="hl-success">goal Stable satisfied</span></code>
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
                        <li><strong>ved-runtime</strong> <span style={{ color: "var(--text-muted)", fontWeight: 400, marginLeft: "1ch" }}>— deterministic execution engine</span></li>
                        <li><strong>ved-compiler</strong> <span style={{ color: "var(--text-muted)", fontWeight: 400, marginLeft: "1ch" }}>— language frontend and semantic validation</span></li>
                        <li><strong>ved-cli</strong> <span style={{ color: "var(--text-muted)", fontWeight: 400, marginLeft: "1ch" }}>— operational tooling</span></li>
                    </ul>
                    <p>Ved is being developed in public with a focus on validating deterministic orchestration semantics before distributed runtime expansion.</p>
                </motion.div>

                <motion.div className="col-text" {...fadeUp} transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}>
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

        {/* GET INVOLVED */}
        <section className="footer-cta-section">
            <motion.div style={{ maxWidth: "1000px", margin: "0 auto" }} {...fadeUp}>
                <h2 style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.04em", textTransform: "uppercase", marginBottom: "2rem" }}>
                  Participate in early design
                </h2>
                <p style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", color: "var(--text-muted)", marginBottom: "4rem", lineHeight: 1.5 }}>
                  Ved is an experimental systems programming project focused on reliability engineering for distributed software.
                </p>
                <div className="large-ctas">
                  <a href="https://github.com/orgs/vedlanghq/discussions" target="_blank" rel="noopener noreferrer" className="large-link">Join discussions</a>
                  <Link href="/docs" className="large-link">Explore architecture</Link>
                  <a href="https://github.com/vedlanghq" target="_blank" rel="noopener noreferrer" className="large-link">Contribute ideas</a>
                </div>
            </motion.div>
        </section>

        {/* FINAL TAGLINE */}
        <section style={{ padding: "4rem 2rem 8rem", display: "flex", justifyContent: "center" }}>
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
                     delayChildren: 0.4
                   }
                 }
               }}
            >
                <p className="final-tagline" style={{ display: "inline-block", margin: 0 }}>
                  {"Orchestrate complex software with certainty.".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { display: "none" },
                        visible: { display: "inline" }
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.4 }}
                    style={{ 
                        marginLeft: "0.1em", 
                        display: "inline-block",
                        width: "0.5ch",
                        height: "0.8em",
                        backgroundColor: "currentColor",
                        verticalAlign: "baseline"
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
