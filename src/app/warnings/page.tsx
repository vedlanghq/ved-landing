"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundShapes from "@/components/BackgroundShapes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AccordionItem } from "@/components/AccordionItem";

const WARNING_CATEGORIES = [
  { title: "Starvation Probability", desc: "A queue configuration that might silently drop throughput over time." },
  { title: "Oscillatory Transitions", desc: "A state graph that circles indefinitely without halting or violating hard loops." },
  { title: "Excessive Snapshotting", desc: "Performance regression risks via structural constraints rather than raw execution speed." }
];

function WarningCategoryAccordions() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  return (
    <>
      {WARNING_CATEGORIES.map((item) => (
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

export default function WarningSystem() {
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
              <motion.h1 variants={itemFade} style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: '100%', padding: '0 1rem', wordBreak: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                Proactive system risk signalling.
              </motion.h1>

              <motion.p className="sub-text" variants={itemFade} style={{ margin: '2.5rem auto 0', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', maxWidth: '800px', color: 'var(--text-muted)', lineHeight: 1.6, padding: '0 1rem' }}>
                Lexum surfaces architectural risks before they become failures.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="content-section">
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Why Warnings Matter</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "1rem" }}>In Control-Plane Programming</p>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="brutalist-list check">
                <li>Delayed failure characteristics.</li>
                <li>Probabilistic instability.</li>
                <li>Convergence inefficiency.</li>
              </ul>
            </motion.div>
          </div>
        </section>

        <section className="content-section" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Warning Taxonomy</h2>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{ marginBottom: "1.5rem" }}>
                Structured Advisory System
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '0.75rem 1rem', borderRadius: '6px', minWidth: '100px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Namespace</span>
                  <code style={{ fontSize: '1.1rem', color: 'var(--accent)' }}>Lexum</code>
                </div>
                <div style={{ color: 'var(--border)' }}>-</div>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '0.75rem 1rem', borderRadius: '6px', minWidth: '100px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Severity</span>
                  <code style={{ fontSize: '1.1rem', color: '#eab308' }}>WARN</code>
                </div>
                <div style={{ color: 'var(--border)' }}>-</div>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '0.75rem 1rem', borderRadius: '6px', minWidth: '120px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Domain Area</span>
                  <code style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>&lt;CATEGORY&gt;</code>
                </div>
                <div style={{ color: 'var(--border)' }}>-</div>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '0.75rem 1rem', borderRadius: '6px', minWidth: '100px' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Identifier</span>
                  <code style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>&lt;NUMBER&gt;</code>
                </div>
              </div>
              <p>Examples: Scheduler behaviour, Convergence quality, Determinism sensitivity, Authority placement.</p>
            </motion.div>
          </div>
        </section>

        <section className="content-section">
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Warning Semantics</h2>
            </motion.div>
            
            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="accordion-group" style={{ margin: "1rem 0" }}>
                <WarningCategoryAccordions />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="content-section" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Suppression & Policy</h2>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                Explicit acknowledgement via local suppression guarantees warnings don&apos;t get lost in noise, while policy enforcement lets teams raise warnings to errors.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="content-section" style={{ textAlign: "center" }}>
          <motion.div {...fadeUp} style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2>Operational Wisdom</h2>
            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", margin: "1.5rem 0" }}>
              Warnings help encode operational wisdom into the language toolchain.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/linting" className="btn btn-primary">
                Explore Linting Rules
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </>
  );
}
