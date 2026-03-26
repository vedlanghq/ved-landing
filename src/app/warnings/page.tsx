"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundShapes from "@/components/BackgroundShapes";

export default function WarningSystem() {
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
          <h1 className="hero-title">Proactive System <br/>Risk Signalling</h1>
          <p className="hero-subtitle">
            Ved surfaces architectural risks before they become failures.
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
            <h2>Why Warnings Matter</h2>
            <p>In Control-Plane Programming</p>
            <ul className="elegant-list">
              <li>Delayed failure characteristics.</li>
              <li>Probabilistic instability.</li>
              <li>Convergence inefficiency.</li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="grid-column"
          >
            <h2>Warning Taxonomy</h2>
            <p>Structured Advisory System</p>
            <div className="code-block">
              <code>VED-WARN-&lt;CATEGORY&gt;-&lt;NUMBER&gt;</code>
            </div>
            <p>Examples: Scheduler behaviour, Convergence quality, Determinism sensitivity, Authority placement.</p>
          </motion.div>
        </div>
      </section>

      <section className="content-section alternate-bg">
        <div className="layout-single">
          <h2>Warning Semantics</h2>
          <div className="categories-grid">
            {[
              { title: "Starvation Probability", desc: "A queue configuration that might silently drop throughput over time." },
              { title: "Oscillatory Transitions", desc: "A state graph that circles indefinitely without halting or violating hard loops." },
              { title: "Excessive Snapshotting", desc: "Performance regression risks via structural constraints rather than raw execution speed." }
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
             <h2>Suppression & Policy</h2>
             <p>Explicit acknowledgement via local suppression guarantees warnings don&apos;t get lost in noise, while policy enforcement lets teams raise warnings to errors.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>Operational Wisdom</h2>
          <p>Warnings help encode operational wisdom into the language toolchain.</p>
          <div className="cta-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/errors" className="button secondary">&larr; Error Taxonomy</Link>
            <Link href="/linting" className="button primary">Explore Linting Rules <span>&rarr;</span></Link>
          </div>
        </motion.div>
      </section>
      
      <style jsx>{`
        /* Sharing same styles for consistency. In a real project they would be global utility classes. */
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
        .button.secondary {
          background: transparent;
          color: var(--fg);
          border: 1px solid var(--border);
        }
        .button:hover {
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .layout-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }
      `}</style>
    </main>
  );
}
