"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundShapes from "@/components/BackgroundShapes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AccordionItem } from "@/components/AccordionItem";

const ERROR_CATEGORIES = [
  { title: "Authority Violations", desc: "Attempts to mutate state across domain boundaries." },
  { title: "Determinism Violations", desc: "Non-deterministic calls inside strict execution slices." },
  { title: "Goal Convergence Failures", desc: "Target semantics cannot be reached within bounds." },
  { title: "Scheduler Safety Failures", desc: "Infinite loops or queue starvation detected." },
  { title: "Persistent State Integrity", desc: "Schema mismatches on snapshot restoration." },
  { title: "External Effect Violations", desc: "Unauthorized side effects outside effect types." },
  { title: "Static Type Errors", desc: "Structural invalidity at compile time." }
];

function ErrorCategoryAccordions() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  return (
    <>
      {ERROR_CATEGORIES.map((item) => (
        <AccordionItem
          key={item.title}
          title={item.title}
          solution={item.desc}
          labelB="Details:"
          isOpen={openKey === item.title}
          onToggle={() => setOpenKey(openKey === item.title ? null : item.title)}
        />
      ))}
    </>
  );
}

export default function ErrorTaxonomy() {
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
              <motion.div className="label" variants={itemFade} style={{ color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2rem", fontWeight: 600 }}><br></br>Ved Diagnostics</motion.div>
              <motion.h1 variants={itemFade} style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: '100%', padding: '0 1rem', wordBreak: 'normal', overflowWrap: 'normal', hyphens: 'none' }}>
                Structured failure semantics.
              </motion.h1>

              <motion.p className="sub-text" variants={itemFade} style={{ margin: '2.5rem auto 0', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', maxWidth: '800px', color: 'var(--text-muted)', lineHeight: 1.6, padding: '0 1rem' }}>
                Ved defines a formal error taxonomy grounded in deterministic execution, authority boundaries, and convergence guarantees.
              </motion.p>
              
              <motion.p className="tagline" variants={itemFade} style={{ marginTop: '1.5rem', fontSize: '1rem', opacity: 0.8, maxWidth: '800px', padding: '0 1rem' }}>
                Errors are not incidental messages. They are manifestations of violated system invariants.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="content-section">
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Design Philosophy</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "1rem" }}>Why Ved Needs a Formal Error Model</p>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="brutalist-list check">
                <li>Distributed orchestration failures are often architectural.</li>
                <li>Deterministic systems require invariant enforcement.</li>
                <li>Clear failure classification enables reproducible debugging.</li>
              </ul>
              <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--text-main)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
                Invariant-centric diagnostics • Compile-time safety • Runtime contract enforcement
              </p>
            </motion.div>
          </div>
        </section>

        <section className="content-section" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Diagnostic Code System</h2>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{ marginBottom: "1.5rem" }}>
                Canonical Error Identifiers
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '0.75rem 1rem', borderRadius: '6px', minWidth: '100px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Namespace</span>
                  <code style={{ fontSize: '1.1rem', color: 'var(--accent)' }}>VED</code>
                </div>
                <div style={{ color: 'var(--border)' }}>—</div>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '0.75rem 1rem', borderRadius: '6px', minWidth: '120px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Domain Area</span>
                  <code style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>&lt;CATEGORY&gt;</code>
                </div>
                <div style={{ color: 'var(--border)' }}>—</div>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '0.75rem 1rem', borderRadius: '6px', minWidth: '100px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Identifier</span>
                  <code style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>&lt;NUMBER&gt;</code>
                </div>
              </div>
              <p>By enforcing a strict taxonomy, Ved ensures category stability, machine-readable semantics, and seamless tooling integration.</p>
            </motion.div>
          </div>
        </section>

        <section className="content-section">
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Error Categories</h2>
            </motion.div>
            
            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="accordion-group" style={{ margin: "1rem 0" }}>
                <ErrorCategoryAccordions />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="content-section" style={{ textAlign: "center" }}>
          <motion.div {...fadeUp} style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2>Design Feedback</h2>
            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", margin: "1.5rem 0" }}>
              Errors are treated as structural design feedback, not just execution blockers.
            </p>
            <Link href="/warnings" className="btn btn-primary">
              Explore Warning System
            </Link>
          </motion.div>
        </section>

      </main>

      <Footer />
    </>
  );
}
