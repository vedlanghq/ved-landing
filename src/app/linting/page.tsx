"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundShapes from "@/components/BackgroundShapes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AccordionItem } from "@/components/AccordionItem";

const LINT_CATEGORIES = [
  { title: "Unbounded Retry Loops", desc: "Lexum flags retries on best-effort networks without strict upper limits or backoff guarantees." },
  { title: "State Domain Mishandling", desc: "Catches confusion between transient cache states and fatal persistent storage bounds." },
  { title: "Non-idempotent Cross-Boundary Payloads", desc: "Warns when emitting network IO that isn't guaranteed to be idempotent across failure boundaries." },
  { title: "Implicit Authority Downgrades", desc: "Flags when high-authority domains pass unsanitized references down to lower scopes." }
];

function LintCategoryAccordions() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  return (
    <>
      {LINT_CATEGORIES.map((item) => (
        <AccordionItem
          key={item.title}
          title={item.title}
          solution={item.desc}
          labelB="Lint target:"
          isOpen={openKey === item.title}
          onToggle={() => setOpenKey(openKey === item.title ? null : item.title)}
        />
      ))}
    </>
  );
}

export default function LintingSystem() {
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
        <section className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '100px' }}>
          <div style={{ width: '100%' }}>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="hero-text"
              style={{ textAlign: 'center', margin: '0 auto', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <motion.div className="label" variants={itemFade} style={{ color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2rem", fontWeight: 600 }}>Lexum Diagnostics</motion.div>
              <motion.h1 variants={itemFade} style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '100%', padding: '0 1rem', wordBreak: 'normal', overflowWrap: 'normal', hyphens: 'none' }}>
                Lints for control plane idioms.
              </motion.h1>

              <motion.p className="sub-text" variants={itemFade} style={{ margin: '2.5rem auto 0', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', maxWidth: '800px', color: 'var(--text-muted)', lineHeight: 1.6, padding: '0 1rem' }}>
                Not just formatting. Static analysis tailored for distributed execution and robustness.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="content-section" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Idiomatic Robustness</h2>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                Linting isn&apos;t a stylistic suggestion in Lexum. It&apos;s a proactive defense against emergent chaos. Lints catch antipatterns that cause systemic failures rather than local crashes.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="content-section">
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Actionable Lints</h2>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="accordion-group" style={{ margin: "1rem 0" }}>
                <LintCategoryAccordions />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="content-section" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Auto-Remediation</h2>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                Where possible, `Lexum fmt` and `Lexum fix` apply standardized, community-proven transformations to code. The objective is frictionless compliance with distributed system best practices.
              </p>
              <div className="command-breakdown" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRight: '1px solid var(--border)', minWidth: '120px', textAlign: 'center' }}>
                    <code style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '1.1rem' }}>Lexum fix</code>
                  </div>
                  <div style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                    Executes the deterministic static analysis engine.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRight: '1px solid var(--border)', minWidth: '120px', textAlign: 'center' }}>
                    <code style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>--apply</code>
                  </div>
                  <div style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                    Automatically resolves safe structural violations.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRight: '1px solid var(--border)', minWidth: '120px', textAlign: 'center' }}>
                    <code style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>--all</code>
                  </div>
                  <div style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                    Traverses all domain boundaries and goal configurations.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="content-section" style={{ textAlign: "center" }}>
          <motion.div {...fadeUp} style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2>The Developer Experience</h2>
            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", margin: "1.5rem 0" }}>
              Read about how the CLI unifies all diagnostic tools into a single, cohesive interface.
            </p>
            <Link href="/cli" className="btn btn-primary">
              CLI UX Philosophy
            </Link>
          </motion.div>
        </section>

      </main>

      <Footer />
    </>
  );
}
