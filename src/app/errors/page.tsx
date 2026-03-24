"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundShapes from "@/components/BackgroundShapes";

export default function ErrorTaxonomy() {
  return (
    <main className="page-container">
      <BackgroundShapes />
      
      <section className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hero-content"
        >
          <div className="label">Ved Diagnostics</div>
          <h1 className="hero-title">Structured <br/>Failure Semantics</h1>
          <p className="hero-subtitle">
            Ved defines a formal error taxonomy grounded in deterministic execution, authority boundaries, and convergence guarantees.
          </p>
          <p className="hero-intro">
            Errors are not incidental messages. They are manifestations of violated system invariants.
          </p>
        </motion.div>
      </section>

      <section className="content-section">
        <div className="layout-grid">
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="grid-column"
          >
            <h2>Design Philosophy</h2>
            <p>Why Ved Needs a Formal Error Model</p>
            <ul className="elegant-list">
              <li>Distributed orchestration failures are often architectural.</li>
              <li>Deterministic systems require invariant enforcement.</li>
              <li>Clear failure classification enables reproducible debugging.</li>
            </ul>
            <p className="highlight-text">Invariant-centric diagnostics • Compile-time safety • Runtime contract enforcement</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="grid-column"
          >
            <h2>Diagnostic Code System</h2>
            <p>Canonical Error Identifiers</p>
            <div className="code-block">
              <code>VED-&lt;CATEGORY&gt;-&lt;NUMBER&gt;</code>
            </div>
            <p>By enforcing a strict taxonomy, Ved ensures category stability, machine-readable semantics, and seamless tooling integration.</p>
          </motion.div>
        </div>
      </section>

      <section className="content-section alternate-bg">
        <div className="layout-single">
          <h2>Error Categories</h2>
          <div className="categories-grid">
            {[
              { title: "Authority Violations", desc: "Attempts to mutate state across domain boundaries." },
              { title: "Determinism Violations", desc: "Non-deterministic calls inside strict execution slices." },
              { title: "Goal Convergence Failures", desc: "Target semantics cannot be reached within bounds." },
              { title: "Scheduler Safety Failures", desc: "Infinite loops or queue starvation detected." },
              { title: "Persistent State Integrity", desc: "Schema mismatches on snapshot restoration." },
              { title: "External Effect Violations", desc: "Unauthorized side effects outside effect types." },
              { title: "Static Type Errors", desc: "Structural invalidity at compile time." }
            ].map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="category-item"
              >
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="layout-grid">
          <div className="grid-column">
             <h2>Compile-Time vs Runtime</h2>
             <p>Errors fall into structural invalidity (caught at compilation) or operational safety violations (caught during execution).</p>
          </div>
          <div className="grid-column">
             <h2>Diagnostic Philosophy</h2>
             <p>Every error provides actionable messaging, explains the underlying invariant, and suggests a direct remediation.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>Design Feedback</h2>
          <p>Errors are treated as structural design feedback, not just execution blockers.</p>
          <div className="cta-actions">
            <Link href="/warnings" className="button primary">Explore Warning System <span>&rarr;</span></Link>
          </div>
        </motion.div>
      </section>
      
      <style jsx>{`
        .page-container {
          min-height: 100vh;
          padding-top: 120px;
          color: var(--fg);
        }
        .hero-section {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 2rem;
          position: relative;
        }
        .hero-content {
          max-width: 800px;
          z-index: 10;
        }
        .label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent);
          margin-bottom: 2rem;
        }
        .hero-title {
          font-size: clamp(3rem, 6vw, 5rem);
          line-height: 1.1;
          letter-spacing: -0.04em;
          margin-bottom: 1.5rem;
        }
        .hero-subtitle {
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          color: var(--fg-muted);
          line-height: 1.4;
          margin-bottom: 2rem;
        }
        .hero-intro {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--fg);
        }
        .content-section {
          padding: 8rem 2rem;
          border-top: 1px solid var(--border);
        }
        .alternate-bg {
          background: rgba(255, 255, 255, 0.02);
        }
        .layout-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
        }
        .layout-single {
          max-width: 1200px;
          margin: 0 auto;
        }
        .grid-column h2, .layout-single h2 {
          font-size: 2rem;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
        }
        .grid-column p {
          color: var(--fg-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }
        .elegant-list {
          list-style: none;
          padding: 0;
          margin: 2rem 0;
        }
        .elegant-list li {
          padding-left: 1.5rem;
          position: relative;
          margin-bottom: 1rem;
          color: var(--fg-muted);
        }
        .elegant-list li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: var(--accent);
        }
        .highlight-text {
          font-size: 0.9rem;
          color: var(--fg);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .code-block {
          background: #111;
          color: #f8f8f2;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          font-family: monospace;
          margin: 2rem 0;
        }
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }
        .category-item {
          padding: 2rem;
          border-left: 1px solid var(--border);
        }
        .category-item h3 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
        .category-item p {
          color: var(--fg-muted);
          font-size: 0.95rem;
          line-height: 1.5;
        }
        .cta-section {
          padding: 10rem 2rem;
          text-align: center;
          border-top: 1px solid var(--border);
        }
        .cta-section h2 {
          font-size: 3rem;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
        }
        .cta-section p {
          color: var(--fg-muted);
          font-size: 1.2rem;
          margin-bottom: 3rem;
        }
        .button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 999px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .button.primary {
          background: var(--fg);
          color: var(--bg);
        }
        .button:hover {
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .layout-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .hero-section {
            min-height: 50vh;
          }
        }
      `}</style>
    </main>
  );
}
