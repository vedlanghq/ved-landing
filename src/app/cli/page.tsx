"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundShapes from "@/components/BackgroundShapes";

export default function CliUXPhilosophy() {
  return (
    <main className="page-container">
      <BackgroundShapes />
      
      <section className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hero-content"
        >
          <div className="label">Ved Tooling</div>
          <h1 className="hero-title">The Terminal <br/>is the Platform</h1>
          <p className="hero-subtitle">
            A philosophical alignment of speed, clarity, and structural honesty.
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
            <h2>Design Precepts</h2>
            <p>We believe the CLI is the highest-leverage developer interface. It must respect time, attention, and cognitive capacity.</p>
            <ul className="elegant-list">
              <li><strong>Zero chrome:</strong> No extraneous banners or ASCII art. Data over styling.</li>
              <li><strong>Sub-second responses:</strong> Parsing, linting, and compiling must feel instantaneous.</li>
              <li><strong>Structural output:</strong> Everything emits structured diagnostics if needed (`--json`).</li>
              <li><strong>Actionability:</strong> Never report an error without a path to resolution.</li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            className="grid-column"
          >
            <h2>Diagnostic Formatting</h2>
            <p>Every failure must clearly separate: Context (where), Evidence (what happened), Consequence (what broke), and Remedy (how to fix).</p>
            <div className="code-block terminal-mockup">
              <span className="error-tag">Error[E0042]</span> <span className="dim">Type mismatch in state transition</span>
              <br/><br/>
              <span className="dim">12 |</span> transition.apply(State::Pending, State::Active)<br/>
              <span className="dim">   |</span> <span className="highlight-red">^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</span><br/>
              <span className="dim">   |</span> <span className="highlight-red">Expected TerminalState, found TransientState</span><br/>
              <br/>
              <span className="dim">=</span> <strong>Help:</strong> ensure `State::Active` implements `TerminalTransition`
            </div>
          </motion.div>
        </div>
      </section>

      <section className="content-section alternate-bg">
        <div className="layout-single" style={{ textAlign: "center" }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2>Unified Workflow</h2>
            <p style={{ maxWidth: 600, margin: "0 auto 3rem auto" }}>
              One binary. No plugins to configure. No disjointed toolchain environments.
            </p>
            <div className="unified-commands">
              <div className="cmd"><code>ved build</code><p>Compile to bytecode</p></div>
              <div className="cmd"><code>ved run</code><p>Execute locally</p></div>
              <div className="cmd"><code>ved check</code><p>Static analysis & lints</p></div>
              <div className="cmd"><code>ved test</code><p>Run formal simulations</p></div>
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
          <h2>Shape the Toolchain</h2>
          <p>Ved is actively in development. If you share our philosophy on diagnostics and developer experience, we&apos;d love your help building the core runtime and CLI.</p>
          <div className="cta-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/" className="button secondary">&larr; Return to Home</Link>
            {/* <a href="https://github.com/vedlanghq" target="_blank" rel="noopener noreferrer" className="button primary">Contribute on GitHub <span>&rarr;</span></a> */}
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
          padding: 2rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
          margin: 2rem 0;
          font-size: 0.95rem;
          line-height: 1.6;
          overflow-x: auto;
        }
        .dim { color: #666; }
        .error-tag { color: #e06c75; font-weight: 600; }
        .highlight-red { color: #e06c75; }
        
        .unified-commands {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          text-align: left;
        }
        .cmd {
          padding: 2rem;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: #111;
        }
        .cmd code {
          display: block;
          font-size: 1.2rem;
          color: #f8f8f2;
          margin-bottom: 0.5rem;
        }
        .cmd p {
          margin: 0;
          font-size: 0.95rem !important;
          color: #a0a0a0;
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
        .cta-actions {
          margin-top: 3rem;
        }
        .button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2.5rem;
          border-radius: 999px;
          font-weight: 500;
          text-decoration: none;
          transition: transform 0.2s ease;
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
        .button:hover { transform: translateY(-2px); }
        
        @media (max-width: 768px) {
          .layout-grid { grid-template-columns: 1fr; gap: 4rem; }
        }
      `}</style>
    </main>
  );
}
