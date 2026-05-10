"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type DocsTab = {
  title: string;
  value: string;
  content: React.ReactNode;
};

const DOCS_TABS: DocsTab[] = [
  {
    title: "Get Started",
    value: "get-started",
    content: (
      <div className="dh-card">
        <div className="dh-card-header">
          <span className="dh-chip">01 / Get Started</span>
          <h2>Install &amp; run your first Lexum program.</h2>
          <p>
            Set up the toolchain, compile a domain definition, and watch the
            runtime stabilise your first self-healing worker pool — in under
            five minutes.
          </p>
        </div>
        <div className="dh-card-grid">
          <Link href="/docs/what-is-Lexum" className="dh-tile">
            <span className="dh-tile-num">01</span>
            <span className="dh-tile-title">Installation</span>
            <span className="dh-tile-desc">Build from source or grab a pre-built binary.</span>
          </Link>
          <Link href="/docs/hello-stability" className="dh-tile">
            <span className="dh-tile-num">02</span>
            <span className="dh-tile-title">Quick Start</span>
            <span className="dh-tile-desc">Write and run your first <code>domain</code> in 60 seconds.</span>
          </Link>
          <Link href="/docs/domains" className="dh-tile">
            <span className="dh-tile-num">03</span>
            <span className="dh-tile-title">Core Concepts</span>
            <span className="dh-tile-desc">Understand state, goals, transitions, and effects.</span>
          </Link>
          <Link href="/docs/priority-scheduling-example" className="dh-tile">
            <span className="dh-tile-num">04</span>
            <span className="dh-tile-title">Examples</span>
            <span className="dh-tile-desc">Real-world worker-pool, scheduler, and journal demos.</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    title: "Language Guide",
    value: "language-guide",
    content: (
      <div className="dh-card">
        <div className="dh-card-header">
          <span className="dh-chip">02 / Language Guide</span>
          <h2>The Lexum language reference.</h2>
          <p>
            Every keyword, type, and construct — explained with worked examples
            and the compiler error codes you will encounter along the way.
          </p>
        </div>
        <div className="dh-card-grid">
          <Link href="/docs/syntax-modes" className="dh-tile">
            <span className="dh-tile-num">01</span>
            <span className="dh-tile-title">Syntax</span>
            <span className="dh-tile-desc">File layout, keywords, and grammar fundamentals.</span>
          </Link>
          <Link href="/docs/goals-and-convergence" className="dh-tile">
            <span className="dh-tile-num">02</span>
            <span className="dh-tile-title">State &amp; Goals</span>
            <span className="dh-tile-desc">Declare persistent state and predicate-based goals.</span>
          </Link>
          <Link href="/docs/transitions-and-slices" className="dh-tile">
            <span className="dh-tile-num">03</span>
            <span className="dh-tile-title">Transitions</span>
            <span className="dh-tile-desc">Deterministic step functions and effect emission.</span>
          </Link>
          <Link href="/docs/type-system-overview" className="dh-tile">
            <span className="dh-tile-num">04</span>
            <span className="dh-tile-title">Type System</span>
            <span className="dh-tile-desc">Primitives, records, and authority-bounded access.</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    title: "Runtime",
    value: "runtime",
    content: (
      <div className="dh-card">
        <div className="dh-card-header">
          <span className="dh-chip">03 / Runtime</span>
          <h2>The deterministic execution engine.</h2>
          <p>
            Understand how the scheduler, interpreter, gas model, and snapshot
            journal work together to give you reproducible, crash-safe
            orchestration.
          </p>
        </div>
        <div className="dh-card-grid">
          <Link href="/docs/deterministic-scheduler" className="dh-tile">
            <span className="dh-tile-num">01</span>
            <span className="dh-tile-title">Scheduler</span>
            <span className="dh-tile-desc">Priority aging, starvation control, quiescence detection.</span>
          </Link>
          <Link href="/docs/execution-dag" className="dh-tile">
            <span className="dh-tile-num">02</span>
            <span className="dh-tile-title">Interpreter</span>
            <span className="dh-tile-desc">Gas-bounded slice execution and safe state yielding.</span>
          </Link>
          <Link href="/docs/persistent-snapshot-engine" className="dh-tile">
            <span className="dh-tile-num">03</span>
            <span className="dh-tile-title">State Journal</span>
            <span className="dh-tile-desc">Write-ahead log, snapshot / restore, and replay.</span>
          </Link>
          <Link href="/docs/quiescence-detection" className="dh-tile">
            <span className="dh-tile-num">04</span>
            <span className="dh-tile-title">Reconciliation</span>
            <span className="dh-tile-desc">AST-bound autonomous recovery strategies.</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    title: "CLI",
    value: "cli",
    content: (
      <div className="dh-card">
        <div className="dh-card-header">
          <span className="dh-chip">04 / CLI</span>
          <h2>Operate Lexum from the terminal.</h2>
          <p>
            Compile, run, inspect execution traces, and integrate the runtime
            into CI pipelines — everything exposed through a single binary.
          </p>
        </div>
        <div className="dh-card-grid">
          <Link href="/docs/command-reference" className="dh-tile">
            <span className="dh-tile-num">01</span>
            <span className="dh-tile-title">Lexum build</span>
            <span className="dh-tile-desc">Compile <code>.lxm</code> source to <code>.lxmc</code> bytecode.</span>
          </Link>
          <Link href="/docs/lint-verify-usage" className="dh-tile">
            <span className="dh-tile-num">02</span>
            <span className="dh-tile-title">Lexum run</span>
            <span className="dh-tile-desc">Execute a compiled artifact in the runtime sandbox.</span>
          </Link>
          <Link href="/docs/deterministic-replay-debugging" className="dh-tile">
            <span className="dh-tile-num">03</span>
            <span className="dh-tile-title">Lexum trace</span>
            <span className="dh-tile-desc">Inspect execution traces and determinism hashes.</span>
          </Link>
          <Link href="/docs/observability-commands" className="dh-tile">
            <span className="dh-tile-num">04</span>
            <span className="dh-tile-title">Lexum check</span>
            <span className="dh-tile-desc">Run the compiler in lint-only mode for CI gates.</span>
          </Link>
        </div>
      </div>
    ),
  },
];

function FadeInStack({
  tabs,
  hovering,
}: Readonly<{ tabs: DocsTab[]; hovering: boolean }>) {
  return (
    <div className="dh-stack-container">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.05,
            top: hovering ? idx * -20 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.18 : 0,
          }}
          animate={{ y: 0 }}
          transition={
            idx === 0
              ? { type: "spring", bounce: 0.3, duration: 0.65 }
              : { type: "spring", bounce: 0, duration: 0.4 }
          }
          className="dh-stack-frame"
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Tabs  — spring-pill bar + stacked content orchestrator
───────────────────────────────────────────────────────────── */

function DocsTabs({ tabs }: Readonly<{ tabs: DocsTab[] }>) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hovering, setHovering] = useState(false);

  const reordered: DocsTab[] = [
    tabs[activeIdx],
    ...tabs.filter((_, i) => i !== activeIdx),
  ];

  return (
    <div
      className="dh-tabs-root"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Spring-pill tab bar */}
      <div className="dh-tab-bar" role="tablist" aria-label="Documentation sections">
        {tabs.map((tab, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={isActive}
              aria-controls={`dh-panel-${tab.value}`}
              id={`dh-tab-${tab.value}`}
              onClick={() => setActiveIdx(idx)}
              className={`dh-tab-btn${isActive ? " dh-tab-btn--active" : ""}`}
            >
              {isActive && (
                <motion.span
                  layoutId="dh-active-pill"
                  className="dh-active-pill"
                  transition={{ type: "spring", bounce: 0.28, duration: 0.55 }}
                  aria-hidden="true"
                />
              )}
              <span className="dh-tab-label">{tab.title}</span>
            </button>
          );
        })}
      </div>

      {/* Stacked panels */}
      <FadeInStack tabs={reordered} hovering={hovering} />
    </div>
  );
}

export default function DocsHome() {
  return (
    <div className="docs-content dh-content-span">
      <div className="docs-content-inner dh-home">

        {/* Hero */}
        <section className="dh-hero">
          <p className="dh-eyebrow">Lexum Documentation</p>
          <h1 className="dh-hero-title">
            Deterministic orchestration.<br />
            deeply documented.
          </h1>
          <p className="dh-hero-sub">
            Everything you need to understand, operate, and extend the Lexum
            runtime. From first principles to production.
          </p>
        </section>

        {/* Animated Tab Explorer */}
        <section aria-label="Documentation explorer">
          <DocsTabs tabs={DOCS_TABS} />
        </section>

        {/* Quick-links strip */}
        <nav className="dh-strip" aria-label="Quick links">
          <a
            href="https://github.com/lexumhq"
            target="_blank"
            rel="noopener noreferrer"
            className="dh-strip-link"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://github.com/lexumhq/lexum/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="dh-strip-link"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Issues
          </a>
          <Link href="/docs/roadmap" className="dh-strip-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            Roadmap
          </Link>
          <Link href="/docs/contributing-guide" className="dh-strip-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Contributing
          </Link>
        </nav>

      </div>
    </div>
  );
}
