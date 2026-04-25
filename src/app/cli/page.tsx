"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundShapes from "@/components/BackgroundShapes";
import { motion } from "framer-motion";
import { AccordionItem } from "@/components/AccordionItem";

const DESIGN_PRECEPTS = [
  { title: "Zero chrome", desc: "No extraneous banners or ASCII art. Data over styling." },
  { title: "Sub-second responses", desc: "Parsing, linting, and compiling must feel instantaneous." },
  { title: "Structural output", desc: "Everything emits structured diagnostics if needed (`--json`)." },
  { title: "Actionability", desc: "Never report an error without a path to resolution." }
];

function PreceptsAccordions() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  return (
    <>
      {DESIGN_PRECEPTS.map((item) => (
        <AccordionItem
          key={item.title}
          title={item.title}
          solution={item.desc}
          labelB="Principle:"
          isOpen={openKey === item.title}
          onToggle={() => setOpenKey(openKey === item.title ? null : item.title)}
        />
      ))}
    </>
  );
}

function CommandAccordionItem({
  command,
  title,
  desc,
  isOpen,
  onToggle,
  isAccent = false
}: Readonly<{
  command: string;
  title: string;
  desc: string;
  isOpen: boolean;
  onToggle: () => void;
  isAccent?: boolean;
}>) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
      <button 
        onClick={onToggle}
        style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', width: '100%', padding: 0, cursor: 'pointer', textAlign: 'left', borderBottom: isOpen ? '1px solid var(--border)' : 'none' }}
      >
        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRight: '1px solid var(--border)', minWidth: '140px', textAlign: 'center' }}>
          <code style={{ color: isAccent ? 'var(--accent)' : 'var(--text-main)', fontWeight: 600, fontSize: '1.1rem' }}>{command}</code>
        </div>
        <div style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 500, flex: 1 }}>
          {title}
        </div>
        <div style={{ padding: '1rem', color: 'var(--text-muted)' }}>
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
        </div>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        style={{ overflow: "hidden" }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ padding: '1.25rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>
          {desc}
        </div>
      </motion.div>
    </div>
  );
}

const COMMAND_DATA = [
  { command: "ved build", title: "Compilation & Authorization", desc: "Compiles Ved source files into deterministic bytecode. Before emitting the binary, it rigorously validates authority bounds across all transitions to ensure no state mutations occur outside of their permitted domains." },
  { command: "ved run", title: "Local Orchestration Simulator", desc: "Executes the compiled bytecode locally in an isolated sandbox. It simulates distributed orchestration overhead, injects dynamic gas metering, and guarantees exactly the same execution path as production." },
  { command: "ved check", title: "Static Idiom Analysis", desc: "Triggers the deterministic static analysis engine. Instead of just checking types, it catches systemic antipatterns like unbounded retry loops, transient state mishandling, and non-idempotent payloads.", isAccent: true },
  { command: "ved test", title: "Formal Convergence Testing", desc: "Runs bounded convergence simulations. It validates state graph assertions under simulated network partitions, ensuring that your logic correctly handles dropped packets and starvation scenarios before deployment." }
];

function WorkflowAccordions() {
  const [openKey, setOpenKey] = useState<string | null>("ved build");
  return (
    <div className="command-breakdown" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {COMMAND_DATA.map((item) => (
        <CommandAccordionItem
          key={item.command}
          command={item.command}
          title={item.title}
          desc={item.desc}
          isAccent={item.isAccent}
          isOpen={openKey === item.command}
          onToggle={() => setOpenKey(openKey === item.command ? null : item.command)}
        />
      ))}
    </div>
  );
}

export default function CliUXPhilosophy() {
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
              style={{ textAlign: 'center', margin: '0 auto', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <motion.div className="label" variants={itemFade} style={{ color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.5rem", fontWeight: 600 }}>Ved Tooling</motion.div>
              <motion.h1 variants={itemFade} style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
                The terminal is
                <br />
                the platform.
              </motion.h1>

              <motion.p className="sub-text" variants={itemFade} style={{ margin: '2rem auto 0', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', maxWidth: '600px', color: 'var(--text-muted)' }}>
                A philosophical alignment of speed, clarity, and structural honesty.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="content-section">
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Design Precepts</h2>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                We believe the CLI is the highest-leverage developer interface. It must respect time, attention, and cognitive capacity.
              </p>
              <div className="accordion-group" style={{ margin: "1.5rem 0" }}>
                <PreceptsAccordions />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="content-section" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Diagnostic Formatting</h2>
            </motion.div>
            
            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                Every failure must clearly separate: Context, Evidence, Consequence, and Remedy.
              </p>
              <div style={{ background: "#111", color: "#f4f4f5", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--border)", fontFamily: "var(--font-mono)", fontSize: "0.9rem", marginTop: "1.5rem", overflowX: "auto" }}>
                <span style={{ color: "#ef4444", fontWeight: "bold" }}>ERROR[E0042]</span> <span style={{ opacity: 0.7 }}>Type mismatch in state transition</span>
                <br/><br/>
                <span style={{ opacity: 0.5 }}>12 |</span> transition.apply(State::Pending, State::Active)<br/>
                <span style={{ opacity: 0.5 }}>   |</span> <span style={{ color: "#ef4444", fontWeight: "bold" }}>^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</span><br/>
                <span style={{ opacity: 0.5 }}>   |</span> <span style={{ color: "#ef4444", fontWeight: "bold" }}>Expected TerminalState, found TransientState</span><br/>
                <br/>
                <span style={{ opacity: 0.5 }}>=</span> <strong>Help:</strong> ensure `State::Active` implements `TerminalTransition`
              </div>
            </motion.div>
          </div>
        </section>

        <section className="content-section">
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Unified Workflow</h2>
            </motion.div>
            
            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{ fontWeight: 500, fontSize: "1.1rem" }}>
                One binary. No plugins to configure. No disjointed toolchain environments.
              </p>
              <WorkflowAccordions />
            </motion.div>
          </div>
        </section>

        <section className="content-section" style={{ textAlign: "center" }}>
          <motion.div {...fadeUp} style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2>Get Started</h2>
            <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", margin: "1.5rem 0" }}>
              Start building reliable distributed systems today.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/docs" className="btn btn-primary">
                Explore Docs
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </>
  );
}
