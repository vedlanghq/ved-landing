"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackgroundShapes from "../components/BackgroundShapes";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <BackgroundShapes />
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Deterministic<br />
              Control Plane<br />
              Programming<br /> Language
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Ved is a deterministic declarative systems programming language.
              Stop writing ephemeral scripts. Start defining persistent convergence.
            </motion.p>

            <motion.div
              className="cta-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href="/docs" className="btn btn-primary">
                Read the Architecture
              </Link>
              <a href="https://github.com/vedlanghq" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                View GitHub
              </a>
            </motion.div>
          </div>
        </section>

        {/* SPLIT SECTION (Support / Proof) */}
        <section className="split-section">
          <div className="split-content">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2>Declarative Desired Goals</h2>
              <p>
                Define what the system should become, not just what it should do next. 
                The runtime plans and executes deterministic steps toward convergence.
              </p>
            </motion.div>
          </div>

          <div className="code-panel">
            <motion.pre
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <code>
<span className="token-comment">// Domain-Oriented State Isolation</span>
{"\n"}
<span className="token-keyword">domain</span> <span className="token-entity">AutoScaler</span> {"{"}
{"\n"}
{"    "}<span className="token-keyword">state</span> {"{"}
{"\n"}
{"        "}<span className="token-property">replicas</span>: int
{"\n"}
{"    "}{"}"}
{"\n\n"}
{"    "}<span className="token-comment">// Declarative Convergence Target</span>
{"\n"}
{"    "}<span className="token-keyword">goal</span> <span className="token-entity">MaintainCapacity</span> {"{"}
{"\n"}
{"        "}<span className="token-keyword">target</span> replicas <span className="token-operator">==</span> <span className="token-property">5</span>
{"\n"}
{"        "}<span className="token-keyword">priority</span> high
{"\n"}
{"    "}{"}"}
{"\n\n"}
{"    "}<span className="token-comment">// Deterministic Transition Slice</span>
{"\n"}
{"    "}<span className="token-keyword">transition</span> <span className="token-entity">ScaleUp</span> {"{"}
{"\n"}
{"        "}<span className="token-keyword">slice</span> step {"{"}
{"\n"}
{"            "}replicas <span className="token-operator">=</span> replicas <span className="token-operator">+</span> <span className="token-property">1</span>
{"\n"}
{"        "}{"}"}
{"\n"}
{"    "}{"}"}
{"\n"}
{"}"}
              </code>
            </motion.pre>
          </div>
        </section>

        {/* DETAILS SECTION (No cards, pure architecture) */}
        <section className="feature-list">
          <div className="feature-item">
            <div className="feature-num">01</div>
            <h3>Deterministic Execution</h3>
            <p>
              Given the same program, state, and inputs, Ved guarantees identical system evolution. 
              Transitions execute in deterministic slices, enabling reproducible incident debugging.
            </p>
          </div>

          <div className="feature-item">
            <div className="feature-num">02</div>
            <h3>Persistent Runtime</h3>
            <p>
              Ved treats programs as long-lived evolving systems. State is strongly typed, versioned, 
              and snapshotted automatically. Execution resumes seamlessly after failure.
            </p>
          </div>

          <div className="feature-item">
            <div className="feature-num">03</div>
            <h3>Authority-Safe</h3>
            <p>
              Built-in spatial authority lattice. The compiler enforces transition invocation legality 
              and guarantees no illegal escalation across domains.
            </p>
          </div>
        </section>
        
        {/* FINAL CTA */}
        <section className="hero" style={{ minHeight: '60svh', borderBottom: 'none' }}>
          <div className="hero-content" style={{ textAlign: 'center' }}>
            <h2>Compile the Future.</h2>
            <br />
            <div className="cta-group" style={{ justifyContent: 'center' }}>
              <Link href="/docs" className="btn btn-primary">
                Read Documentation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
