"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundShapes from "@/components/BackgroundShapes";

export default function LintingSystem() {
  return (
    <main className="page-container">
      <BackgroundShapes />
      
      <section className="hero-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-content"
        >
          <div className="label">Ved Diagnostics</div>
          <h1 className="hero-title">Lints for Control <br/>Plane Idioms</h1>
          <p className="hero-subtitle">
            Not just formatting. Static analysis tailored for distributed execution and robustness.
          </p>
        </motion.div>
      </section>

      <section className="content-section alternate-bg">
        <div className="layout-single">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="grid-column"
          >
            <h2>Idiomatic Robustness</h2>
            <p>Linting isn't a stylistic suggestion in Ved. It's a proactive defense against emergent chaos. Lints catch antipatterns that cause systemic failures rather than local crashes.</p>
          </motion.div>
        </div>
      </section>

      <section className="content-section">
        <div className="layout-grid">
          <motion.div className="grid-column">
             <h2>Actionable Lints</h2>
             <ul className="elegant-list">
               <li>Unbounded retry loops on best-effort networks.</li>
               <li>Mishandling transient vs. fatal state domains.</li>
               <li>Submitting non-idempotent payloads across failure boundaries.</li>
               <li>Implicit authority downgrades.</li>
             </ul>
          </motion.div>

          <motion.div className="grid-column">
             <h2>Auto-Remediation</h2>
             <p>Where possible, `ved fmt` and `ved fix` apply standardized, community-proven transformations to code. The objective is frictionless compliance with distributed system best practices.</p>
             <div className="code-block" style={{ marginTop: '2rem' }}>
               <code>ved fix --apply --all</code>
             </div>
          </motion.div>
        </div>
      </section>
      
      <section className="cta-section">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>The Developer Experience</h2>
          <p>Read about how the CLI unifies all diagnostic tools into a single, cohesive interface.</p>
          <Link href="/cli" className="button primary">CLI UX Philosophy</Link>
        </motion.div>
      </section>
      
      <style jsx>{`
        /* Reused simple layout classes inline to respect scope */
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
        .hero-content { max-width: 800px; z-index: 10; }
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
        .content-section {
          padding: 8rem 2rem;
          border-top: 1px solid var(--border);
        }
        .alternate-bg { background: rgba(255, 255, 255, 0.02); }
        .layout-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
        }
        .layout-single { max-width: 1200px; margin: 0 auto; }
        .grid-column h2, .layout-single h2 {
          font-size: 2.5rem;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
        }
        .grid-column p, .layout-single p {
          color: var(--fg-muted);
          line-height: 1.7;
          margin-bottom: 1.5rem;
          font-size: 1.15rem;
        }
        .elegant-list {
          list-style: none;
          padding: 0;
          margin: 2rem 0;
        }
        .elegant-list li {
          padding-left: 1.5rem;
          position: relative;
          margin-bottom: 1.5rem;
          color: var(--fg-muted);
          font-size: 1.1rem;
        }
        .elegant-list li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: var(--accent);
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
        .button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2.5rem;
          margin-top: 2rem;
          border-radius: 999px;
          font-weight: 500;
          text-decoration: none;
          background: var(--fg);
          color: var(--bg);
          transition: transform 0.2s ease;
        }
        .button:hover { transform: translateY(-2px); }
        @media (max-width: 768px) {
          .layout-grid { grid-template-columns: 1fr; gap: 4rem; }
        }
      `}</style>
    </main>
  );
}
