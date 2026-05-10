"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackgroundShapes from "../components/BackgroundShapes";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function AccordionItem({
  title,
  limitation,
  solution,
  labelA = "The limit:",
  labelB = "The Lexum approach:",
  isOpen,
  onToggle,
}: Readonly<{
  title: string;
  limitation?: string;
  solution: string;
  labelA?: string;
  labelB?: string;
  isOpen: boolean;
  onToggle: () => void;
}>) {
  return (
    <div style={{ borderBottom: "1px solid var(--border)", padding: "1rem 0" }}>
      <button
        onClick={onToggle}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          background: "none",
          border: "none",
          color: "var(--text-main)",
          fontSize: "1.25rem",
          fontWeight: 500,
          cursor: "pointer",
          padding: "0.5rem 0",
          fontFamily: "inherit",
          textAlign: "left",
        }}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
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
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        style={{ overflow: "hidden" }}
        transition={{ duration: 0.3 }}
      >
        <div
          style={{
            paddingTop: "1rem",
            paddingBottom: "0.5rem",
            color: "var(--text-muted)",
            fontSize: "1.05rem",
            lineHeight: 1.6,
          }}
        >
          {limitation && (
            <p style={{ marginBottom: "0.75rem" }}>
              <strong style={{ color: "var(--text-main)", fontWeight: 600 }}>
                {labelA}
              </strong>{" "}
              {limitation}
            </p>
          )}
          <p>
            <strong style={{ color: "var(--text-main)", fontWeight: 600 }}>
              {labelB}
            </strong>{" "}
            {solution}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: Readonly<{
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}>) {
  return (
    <motion.div
      style={{ borderBottom: "1px solid var(--border)" }}
      initial={false}
      animate={{
        backgroundColor: isOpen ? "var(--bg-surface-hover)" : "transparent",
      }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          background: "none",
          border: "none",
          color: "var(--text-main)",
          fontSize: "1.25rem",
          fontWeight: 600,
          cursor: "pointer",
          padding: "1.5rem 1rem",
          fontFamily: "inherit",
          textAlign: "left",
        }}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: isOpen ? "var(--text-main)" : "var(--border)",
            color: isOpen ? "var(--bg-base)" : "var(--text-main)",
            flexShrink: 0,
            marginLeft: "1rem",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.div>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        style={{ overflow: "hidden", padding: "0 1rem" }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          style={{
            paddingBottom: "1.5rem",
            color: "var(--text-muted)",
            fontSize: "1.1rem",
            lineHeight: 1.6,
          }}
        >
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
}

function PipelineStep({
  num,
  label,
  desc,
}: Readonly<{ num: string; label: string; desc: string }>) {
  const [expanded, setExpanded] = useState(false);
  return (
    <button
      className={`pipeline-step${expanded ? " pipeline-step--expanded" : ""}`}
      onClick={() => setExpanded((v) => !v)}
      aria-expanded={expanded}
    >
      {/* Expand / collapse icon — top-right */}
      <motion.div
        className="pipeline-expand-icon"
        animate={{ rotate: expanded ? 45 : 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1v10M1 6h10"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      <span className="pipeline-num">{num}</span>
      <span className="pipeline-label">{label}</span>

      <motion.div
        className="pipeline-desc-wrap"
        initial={false}
        animate={{
          height: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0,
          marginTop: expanded ? "0.6rem" : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden" }}
      >
        <span className="pipeline-desc">{desc}</span>
      </motion.div>
    </button>
  );
}

/* ───── Code Terminal ─────────────────────────────────────── */
const CODE_LINES = [
  {
    num: 1,
    tokens: [
      { t: "keyword", v: "domain" },
      { t: "plain", v: " " },
      { t: "entity", v: "WorkerPool" },
      { t: "plain", v: " {" },
    ],
  },
  {
    num: 2,
    tokens: [
      { t: "plain", v: "  " },
      { t: "keyword", v: "state" },
      { t: "plain", v: " {" },
    ],
  },
  {
    num: 3,
    tokens: [
      { t: "plain", v: "    " },
      { t: "property", v: "desired" },
      { t: "plain", v: ": int" },
    ],
  },
  {
    num: 4,
    tokens: [
      { t: "plain", v: "    " },
      { t: "property", v: "actual" },
      { t: "plain", v: ": int" },
    ],
  },
  { num: 5, tokens: [{ t: "plain", v: "  }" }] },
  { num: 6, tokens: [] },
  {
    num: 7,
    tokens: [
      { t: "plain", v: "  " },
      { t: "keyword", v: "goal" },
      { t: "plain", v: " " },
      { t: "entity", v: "Stable" },
      { t: "plain", v: " {" },
    ],
  },
  {
    num: 8,
    tokens: [
      { t: "plain", v: "    " },
      { t: "keyword", v: "predicate" },
      { t: "plain", v: " actual " },
      { t: "operator", v: "==" },
      { t: "plain", v: " desired" },
    ],
  },
  { num: 9, tokens: [{ t: "plain", v: "  }" }] },
  { num: 10, tokens: [] },
  {
    num: 11,
    tokens: [
      { t: "plain", v: "  " },
      { t: "keyword", v: "transition" },
      { t: "plain", v: " " },
      { t: "entity", v: "ScaleUp" },
      { t: "plain", v: " {" },
    ],
  },
  {
    num: 12,
    tokens: [
      { t: "plain", v: "    " },
      { t: "keyword", v: "step" },
      { t: "plain", v: " {" },
    ],
  },
  {
    num: 13,
    tokens: [
      { t: "plain", v: "      " },
      { t: "keyword", v: "emit" },
      { t: "plain", v: " " },
      { t: "entity", v: "ProvisionWorker" },
      { t: "plain", v: "()" },
    ],
  },
  { num: 14, tokens: [{ t: "plain", v: "    }" }] },
  { num: 15, tokens: [{ t: "plain", v: "  }" }] },
  { num: 16, tokens: [{ t: "plain", v: "}" }] },
];

type TokenType = "keyword" | "entity" | "property" | "operator" | "plain";
const TOKEN_CLASS: Record<TokenType, string> = {
  keyword: "ct-keyword",
  entity: "ct-entity",
  property: "ct-property",
  operator: "ct-operator",
  plain: "",
};

function CodeTerminal({
  onCopy,
  copied,
}: Readonly<{ onCopy: () => void; copied: boolean }>) {
  return (
    <div className="term-shell">
      {/* Title bar */}
      <div className="term-titlebar">
        <span className="term-dot dot-red" />
        <span className="term-dot dot-yellow" />
        <span className="term-dot dot-green" />
        <span className="term-filename">worker_pool.lxm</span>
        <button
          className="term-copy-btn"
          onClick={onCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      {/* Code body */}
      <div className="term-body">
        <div className="term-gutter" aria-hidden="true">
          {CODE_LINES.map((l) => (
            <span key={l.num}>{l.num}</span>
          ))}
        </div>
        <pre className="term-code">
          <code>
            {CODE_LINES.map((line) => (
              <div key={line.num} className="term-line">
                {line.tokens.length === 0 ? (
                  <>&nbsp;</>
                ) : (
                  line.tokens.map((tk, i) =>
                    tk.t === "plain" ? (
                      <span key={`tk-${line.num}-${i}`}>{tk.v}</span>
                    ) : (
                      <span
                        key={`tk-${line.num}-${i}`}
                        className={TOKEN_CLASS[tk.t as TokenType]}
                      >
                        {tk.v}
                      </span>
                    ),
                  )
                )}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

/* ───── Runtime Terminal ──────────────────────────────────── */
const RUNTIME_LINES: {
  type: "dim" | "accent" | "success" | "plain";
  text: string;
}[][] = [
  [
    { type: "dim", text: "tick=1" },
    { type: "plain", text: "  desired=3  actual=0  " },
    { type: "dim", text: "→" },
    { type: "plain", text: "  " },
    { type: "accent", text: "scheduling ScaleUp" },
  ],
  [
    { type: "dim", text: "tick=2" },
    { type: "plain", text: "  actual=1" },
  ],
  [
    { type: "dim", text: "tick=3" },
    { type: "plain", text: "  actual=2" },
  ],
  [
    { type: "dim", text: "tick=4" },
    { type: "plain", text: "  actual=3  " },
    { type: "dim", text: "→" },
    { type: "plain", text: "  " },
    { type: "success", text: "goal Stable satisfied ✓" },
  ],
  [{ type: "plain", text: "" }], // blank spacer before repeat
];

const RUNTIME_CLASS: Record<string, string> = {
  dim: "rt-dim",
  accent: "rt-accent",
  success: "rt-success",
  plain: "",
};

function RuntimeTerminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [loopKey, setLoopKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visibleCount < RUNTIME_LINES.length) {
      timerRef.current = setTimeout(() => setVisibleCount((c) => c + 1), 520);
    } else {
      // After showing all lines, wait 1.4 s then restart
      timerRef.current = setTimeout(() => {
        setLoopKey((k) => k + 1);
        setVisibleCount(0);
      }, 1400);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visibleCount, loopKey]);

  return (
    <div className="term-shell runtime-shell">
      {/* Title bar */}
      <div className="term-titlebar">
        <span className="term-dot dot-red" />
        <span className="term-dot dot-yellow" />
        <span className="term-dot dot-green" />
        <span className="term-filename">runtime output</span>
        <span className="rt-live-badge">● live</span>
      </div>
      {/* Output body */}
      <div className="term-body rt-body">
        <pre className="term-code rt-code">
          <code key={loopKey}>
            <AnimatePresence initial={false}>
              {RUNTIME_LINES.slice(0, visibleCount).map((segments, li) => (
                <motion.div
                  key={`${loopKey}-${li}`}
                  className="term-line"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {segments.map((seg, si) =>
                    seg.type === "plain" ? (
                      <span key={`seg-${loopKey}-${li}-${si}`}>{seg.text}</span>
                    ) : (
                      <span
                        key={`seg-${loopKey}-${li}-${si}`}
                        className={RUNTIME_CLASS[seg.type]}
                      >
                        {seg.text}
                      </span>
                    ),
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {/* Blinking cursor on last visible line */}
            {visibleCount > 0 && visibleCount <= RUNTIME_LINES.length && (
              <span className="rt-cursor" aria-hidden="true">
                ▋
              </span>
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}

/* ───── Project Card ─────────────────────────────────────── */
type ProjStatus = "done" | "active" | "planned";

function ProjectCard(
  props: Readonly<{
    id: string;
    name: string;
    tag: string;
    desc: string;
    href: string;
    isOpen: boolean;
    onToggle: () => void;
  }>,
) {
  const { name, tag, desc, href, isOpen: open, onToggle } = props;
  return (
    <div className={`proj-card${open ? " proj-card--open" : ""}`}>
      <button
        className="proj-card-header"
        onClick={onToggle}
        aria-expanded={open}
      >
        <div className="proj-card-meta">
          <span className="proj-card-name">{name}</span>
          <span className="proj-card-tag">{tag}</span>
        </div>
        <motion.div
          className="proj-card-chevron"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </button>

      {/* Expandable body */}
      <motion.div
        className="proj-card-body"
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden" }}
      >
        <p className="proj-card-desc">{desc}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-card-link"
          tabIndex={open ? 0 : -1}
        >
          <span>View repository</span>
          {/* Arrow icon — rotates to ↗ on hover via CSS */}
          <svg
            className="proj-card-arrow"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </motion.div>
    </div>
  );
}

/* ───── Roadmap Row ───────────────────────────────────────── */
const RDMAP_WIDTH: Record<ProjStatus, string> = {
  done: "100%",
  active: "52%",
  planned: "0%",
};
const RDMAP_LABEL: Record<ProjStatus, string> = {
  done: "Done",
  active: "In progress",
  planned: "Planned",
};

function RoadmapRow(
  props: Readonly<{
    status: ProjStatus;
    label: string;
    note: string;
    index: number;
  }>,
) {
  const { status, label, note, index } = props;
  return (
    <motion.div
      className={`rdmap-row rdmap-row--${status}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
    >
      {/* Left meta */}
      <div className="rdmap-meta">
        <span className="rdmap-label">{label}</span>
        <span className="rdmap-note">{note}</span>
      </div>

      {/* Bar track */}
      <div className="rdmap-track">
        <motion.div
          className="rdmap-fill"
          initial={{ width: "0%" }}
          whileInView={{ width: RDMAP_WIDTH[status] }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.15 + index * 0.08,
          }}
        />
      </div>

      {/* Status badge */}
      <span className={`rdmap-badge rdmap-badge--${status}`}>
        {RDMAP_LABEL[status]}
      </span>
    </motion.div>
  );
}

/* ───── Accordion Group Wrappers ─────────────────────────── */

const PROBLEM_ITEMS = [
  {
    title: "Imperative scripts",
    limitation:
      "Sequential, step-by-step scripts fail unpredictably halfway through, leaving systems in unknown partial states that require manual intervention.",
    solution:
      "Lexum uses declarative goals. The runtime continuously calculates and executes the safest path to equilibrium regardless of the starting state.",
  },
  {
    title: "Controller boilerplate",
    limitation:
      "Developers spend countless hours writing redundant loops, error handling, and retry logic just to watch for simple state changes.",
    solution:
      "Lexum\u2019s runtime intrinsically provides the observation and execution loop, letting you write only the exact domain logic and transition bounds.",
  },
  {
    title: "Configuration drift",
    limitation:
      "Live systems drift from their declared configuration due to manual changes, edge cases, or silent failures, leading to unstable environments.",
    solution:
      "Lexum constantly cross-references live actual state with declared desired state, actively scheduling transitions to repair deviations automatically.",
  },
  {
    title: "Non-reproducible execution timing",
    limitation:
      "Race conditions and asynchronous task scheduling cause intermittent, impossible-to-reproduce bugs in distributed networks.",
    solution:
      "Lexum processes orchestration logic in strictly sequential, deterministic slices, making every system transition 100% reproducible and testable.",
  },
] as const;

function ProblemAccordions() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  return (
    <>
      {PROBLEM_ITEMS.map((item) => (
        <AccordionItem
          key={item.title}
          title={item.title}
          limitation={item.limitation}
          solution={item.solution}
          isOpen={openKey === item.title}
          onToggle={() =>
            setOpenKey(openKey === item.title ? null : item.title)
          }
        />
      ))}
    </>
  );
}

const FEATURES_ITEMS = [
  {
    title: "Persistent system state",
    limitation: "The canonical representation of the domain logic.",
    solution:
      "State definitions explicitly encode exactly what properties of a system determine its behavior, automatically versioned and schema-managed.",
    labelA: "Concept:",
    labelB: "Purpose:",
  },
  {
    title: "Stable operating goals",
    limitation: "Expressions describing what a valid state looks like.",
    solution:
      "Instead of writing imperative checks, you declare specific invariant rules (predicates). If any rule fails, the system knows it is out of equilibrium.",
    labelA: "Concept:",
    labelB: "Purpose:",
  },
  {
    title: "Deterministic transition logic",
    limitation: "Strictly pure functions that map from state to state.",
    solution:
      "Transitions encode safe pathways between states. They are recorded and fully replayable without any network or disk IO side-effects mutating them under the hood.",
    labelA: "Concept:",
    labelB: "Purpose:",
  },
  {
    title: "Structured authority boundaries",
    limitation: "Cryptographically enforced bounds on who can mutate state.",
    solution:
      "Defines exact Role-Based limitations baked directly into the compiler, ensuring unauthorized transactions are dropped before they even reach the executor.",
    labelA: "Concept:",
    labelB: "Purpose:",
  },
] as const;

function FeaturesAccordions() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  return (
    <>
      {FEATURES_ITEMS.map((item) => (
        <AccordionItem
          key={item.title}
          title={item.title}
          limitation={item.limitation}
          solution={item.solution}
          labelA={item.labelA}
          labelB={item.labelB}
          isOpen={openKey === item.title}
          onToggle={() =>
            setOpenKey(openKey === item.title ? null : item.title)
          }
        />
      ))}
    </>
  );
}

const PROJECT_PKGS = [
  {
    id: "runtime",
    name: "Lexum-runtime",
    tag: "Execution Engine",
    desc: "The deterministic scheduler, interpreter, domain registry, and persistence layer. Implements gas-bounded slice execution, autonomous goal reconciliation, and quiescence detection.",
    href: "https://github.com/lexumhq/lexum-runtime",
  },
  {
    id: "compiler",
    name: "Lexum-compiler",
    tag: "Language Frontend",
    desc: "Lexer, parser, AST construction, semantic validation, and bytecode emission. Produces portable `.lxmc` binary artefacts consumed directly by the runtime.",
    href: "https://github.com/lexumhq/lexum-compiler",
  },
  {
    id: "cli",
    name: "Lexum-cli",
    tag: "Operational Tooling",
    desc: "The developer-facing command-line interface. Compiles, runs, inspects traces, and drives the runtime from the terminal. The canonical integration point for CI pipelines.",
    href: "https://github.com/lexumhq/lexum-cli",
  },
] as const;

function ProjectCards() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="proj-cards">
      {PROJECT_PKGS.map((pkg) => (
        <ProjectCard
          key={pkg.id}
          id={pkg.id}
          name={pkg.name}
          tag={pkg.tag}
          desc={pkg.desc}
          href={pkg.href}
          isOpen={openId === pkg.id}
          onToggle={() => setOpenId(openId === pkg.id ? null : pkg.id)}
        />
      ))}
    </div>
  );
}

const FAQ_ITEMS: { question: string; answer: React.ReactNode }[] = [
  {
    question: "What is Lexum?",
    answer: (
      <p>
        Lexum is a deterministic control-plane programming language designed to
        help engineers build reliable, long-running distributed systems. It
        enables developers to describe desired system behaviour using structured
        state models, goals, and bounded execution logic.
      </p>
    ),
  },
  {
    question: "What problem does Lexum solve?",
    answer: (
      <>
        <p>
          Modern distributed systems are difficult to operate because
          orchestration logic is often:
        </p>
        <ul className="brutalist-list check" style={{ marginTop: "1rem" }}>
          <li>imperative</li>
          <li>non-deterministic</li>
          <li>difficult to reproduce</li>
          <li>prone to configuration drift</li>
        </ul>
        <p style={{ marginTop: "1rem" }}>
          Lexum introduces a deterministic execution model that helps systems
          converge toward stable operating conditions.
        </p>
      </>
    ),
  },
  {
    question: "How is Lexum different from existing programming languages?",
    answer: (
      <p>
        Lexum focuses on orchestration behaviour rather than application logic.
        It provides built-in concepts such as persistent system state,
        convergence goals, structured authority boundaries, and replayable
        execution, which are not primary concerns in most general-purpose
        languages.
      </p>
    ),
  },
  {
    question:
      "Is Lexum intended to replace languages like Rust, Go, or Python?",
    answer: (
      <p>
        No. Lexum is intended to complement existing languages by governing
        system behaviour at the control-plane level. Application services and
        data-plane logic can continue to be implemented using traditional
        languages.
      </p>
    ),
  },
  {
    question: "What does deterministic execution mean in Lexum?",
    answer: (
      <p>
        Deterministic execution means that given the same initial state and
        external inputs, the runtime will evolve the system in the same way
        every time. This enables reproducible debugging, predictable recovery,
        and improved operational reasoning.
      </p>
    ),
  },
  {
    question: "What are goals in Lexum?",
    answer: (
      <p>
        Goals represent stable desired conditions for the system. The runtime
        continuously evaluates current state and executes transitions that help
        the system move toward satisfying these goals.
      </p>
    ),
  },
  {
    question:
      "Can Lexum interact with real infrastructure or external systems?",
    answer: (
      <p>
        Yes. External interactions are modeled as explicit effects. These
        effects are isolated, recorded, and replayable, allowing the runtime to
        maintain deterministic behaviour while operating in unpredictable
        environments.
      </p>
    ),
  },
  {
    question: "Is Lexum suitable for building general application software?",
    answer: (
      <p>
        Lexum is primarily designed for control-plane orchestration and
        long-lived system coordination. It is not intended to replace
        traditional application frameworks.
      </p>
    ),
  },
  {
    question: "Is Lexum production ready?",
    answer: (
      <p>
        Lexum is currently in early design and prototyping stages. The project
        focuses on validating deterministic runtime semantics and convergence
        models before expanding toward broader production use.
      </p>
    ),
  },
];

function FAQGroup() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  return (
    <div style={{ borderTop: "1px solid var(--border)" }}>
      {FAQ_ITEMS.map((item) => (
        <FAQItem
          key={item.question}
          question={item.question}
          answer={item.answer}
          isOpen={openKey === item.question}
          onToggle={() =>
            setOpenKey(openKey === item.question ? null : item.question)
          }
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const codeData = `domain WorkerPool {
  state {
    desired: int
    actual: int
  }

  goal Stable {
    predicate actual == desired
  }

  transition ScaleUp {
    step {
      emit ProvisionWorker()
    }
  }
}`;
    navigator.clipboard.writeText(codeData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Refined standard motion
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
        {/* HERO */}
        <section className="hero-section">
          <div className="hero-grid">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="hero-text"
            >
              <motion.h1 variants={itemFade}>
                Deterministic orchestration
                <br />
                for distributed software.
              </motion.h1>

              <motion.p className="sub-text" variants={itemFade}>
                Lexum is a declarative systems programming language for building
                reliable control planes that continuously stabilize complex
                software environments.
              </motion.p>

              <motion.p className="tagline" variants={itemFade}>
                Describe how systems should behave. Let the runtime make them
                stable.
              </motion.p>

              <motion.div className="cta-group" variants={itemFade}>
                <Link href="/errors" className="btn btn-primary">
                  Explore Development Experience
                </Link>
                <a
                  href="https://github.com/lexumhq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  View on GitHub
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section id="vision" className="content-section">
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Operating distributed systems is still fragile.</h2>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{
                delay: 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              <p>
                Modern software platforms are composed of many interacting
                services, queues, agents, and infrastructure layers. The logic
                that governs deployment, scaling, recovery, and coordination is
                often implemented using...
              </p>
              <div className="accordion-group" style={{ margin: "2rem 0" }}>
                <ProblemAccordions />
              </div>
              <p>
                As systems grow, operational behaviour becomes harder to reason
                about and failures become harder to reproduce.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Lexum IDEA SECTION */}
        <section id="features" className="content-section">
          <div className="two-col-grid">
            <motion.div className="col-text" {...fadeUp}>
              <h2>Lexum treats system behaviour as a program.</h2>
            </motion.div>

            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{
                delay: 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              <p>Lexum programs define:</p>
              <div className="accordion-group" style={{ margin: "2rem 0" }}>
                <FeaturesAccordions />
              </div>
              <p>
                The runtime continuously evaluates current conditions and drives
                the system toward declared equilibrium states. This shifts
                orchestration from reactive scripting to analyzable system
                evolution.
              </p>
            </motion.div>
          </div>
        </section>

        {/* EXECUTION LOOP */}
        <section className="execution-loop-section">
          <motion.div className="loop-container" {...fadeUp}>
            <h2>Deterministic execution loop</h2>
            <div className="pipeline-track">
              {(
                [
                  {
                    num: "01",
                    label: "Observe State",
                    desc: "Snapshot current domain state",
                  },
                  {
                    num: "02",
                    label: "Evaluate Goals",
                    desc: "Check all predicate invariants",
                  },
                  {
                    num: "03",
                    label: "Schedule Transition",
                    desc: "Select the next safe state path",
                  },
                  {
                    num: "04",
                    label: "Persist Mutation",
                    desc: "Write-ahead log before execution",
                  },
                  {
                    num: "05",
                    label: "Emit Effects",
                    desc: "Dispatch recorded side-effects",
                  },
                  {
                    num: "06",
                    label: "Repeat",
                    desc: "Deterministic loop continues",
                  },
                ] as const
              ).flatMap((step, i, arr) => {
                const nodes = [
                  <PipelineStep
                    key={step.num}
                    num={step.num}
                    label={step.label}
                    desc={step.desc}
                  />,
                ];
                if (i < arr.length - 1) {
                  nodes.push(
                    <div
                      key={`c-${step.num}`}
                      className="pipeline-connector"
                      aria-hidden="true"
                    >
                      <div className="pipeline-connector-line" />
                      <svg
                        className="pipeline-connector-arrow"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6h8M6 2l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>,
                  );
                }
                return nodes;
              })}
            </div>
            <p>
              Lexum executes orchestration logic in discrete deterministic
              slices. External side-effects are recorded and replayable,
              enabling reproducible debugging and crash-safe recovery.
            </p>
          </motion.div>
        </section>

        {/* ── PROJECT STRUCTURE ─────────────────────────── */}
        <section className="content-section">
          <div className="two-col-grid align-top">
            {/* Left: static context */}
            <motion.div className="col-text" {...fadeUp}>
              <h3>Project structure</h3>
              <p style={{ marginBottom: "1.5rem" }}>
                Lexum is organized as a tightly-coupled workspace of three
                purpose-built crates. Each crate owns a distinct layer of the
                compilation and execution pipeline, with no cross-layer
                dependencies leaking upward.
              </p>
              <p>
                The project is developed in public with a focus on validating
                deterministic orchestration semantics before distributed runtime
                expansion.
              </p>
            </motion.div>

            {/* Right: expandable component cards */}
            <motion.div
              className="col-text"
              {...fadeUp}
              transition={{
                delay: 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
            >
              <ProjectCards />
            </motion.div>
          </div>
        </section>

        {/* ── DEVELOPMENT ROADMAP ───────────────────────── */}
        <section
          className="content-section"
          style={{ background: "var(--bg-surface)" }}
        >
          <motion.div
            {...fadeUp}
            style={{ maxWidth: "1600px", margin: "0 auto" }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>Development roadmap</h3>
            <p style={{ marginBottom: "3rem", fontSize: "1.1rem" }}>
              A milestone-based view of the project&apos;s engineering progress.
            </p>

            {/* Legend */}
            <div className="rdmap-legend">
              <span className="rdmap-legend-item">
                <span className="rdmap-dot rdmap-dot--done" />{" "}
                Completed
              </span>
              <span className="rdmap-legend-item">
                <span className="rdmap-dot rdmap-dot--active" />{" "}
                In progress
              </span>
              <span className="rdmap-legend-item">
                <span className="rdmap-dot rdmap-dot--planned" />{" "}
                Planned
              </span>
            </div>

            {/* Chart */}
            <div className="rdmap-chart">
              {(
                [
                  {
                    status: "done",
                    label: "Compiler & Semantic Validation",
                    note: "Syntax modeling, capability escalation trapping, AST boundary enforcement",
                  },
                  {
                    status: "done",
                    label: "Bytecode & Virtual Machine",
                    note: "Lexum-IR interpreter engine, binary packer, dynamic gas metering",
                  },
                  {
                    status: "done",
                    label: "Domain Engine & Recovery",
                    note: "Asynchronous routing, snapshot persistence, crash resilience",
                  },
                  {
                    status: "done",
                    label: "Goal Engine & Convergence",
                    note: "Predicate evaluation, priority dominance, oscillation traps",
                  },
                  {
                    status: "done",
                    label: "Scale Verification",
                    note: "Banking consistency, message storms, multi-domain determinism",
                  },
                  {
                    status: "active",
                    label: "Developer Experience (DX) & v0.1",
                    note: "Artifact polish, heartbeat metrics, production demos",
                  },
                  {
                    status: "planned",
                    label: "Distributed Runtime Expansion",
                    note: "Multi-node domain federation, consensus primitives",
                  },
                ] as const
              ).map((row, i) => (
                <RoadmapRow key={row.label} index={i} {...row} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section
          className="content-section"
          style={{ background: "var(--bg-surface)" }}
        >
          <motion.div
            style={{ maxWidth: "1000px", margin: "0 auto" }}
            {...fadeUp}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                textTransform: "uppercase",
                marginBottom: "3rem",
                letterSpacing: "-0.03em",
              }}
            >
              Frequently Asked Questions
            </h2>
            <FAQGroup />
          </motion.div>
        </section>

        {/* GET INVOLVED */}
        <section className="footer-cta-section">
          <motion.div
            style={{ maxWidth: "1000px", margin: "0 auto" }}
            {...fadeUp}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}
            >
              Participate in early design
            </h2>
            <p
              style={{
                fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                color: "var(--text-muted)",
                marginBottom: "4rem",
                lineHeight: 1.5,
              }}
            >
              Lexum is an experimental systems programming project focused on
              reliability engineering for distributed software.
            </p>
            <div className="large-ctas">
              <a
                href="https://github.com/orgs/lexumhq/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="large-link"
              >
                Join discussions
              </a>
              <Link href="/errors" className="large-link">
                Explore developer experience
              </Link>
              <a
                href="https://github.com/lexumhq"
                target="_blank"
                rel="noopener noreferrer"
                className="large-link"
              >
                Contribute ideas
              </a>
            </div>
          </motion.div>
        </section>

        {/* FINAL TAGLINE */}
        <section
          style={{
            padding: "4rem 2rem 8rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1] as const,
                  staggerChildren: 0.03,
                  delayChildren: 0.4,
                },
              },
            }}
          >
            <p
              className="final-tagline"
              style={{ display: "inline-block", margin: 0 }}
            >
              {"Orchestrate complex software with certainty."
                .split("")
                .map((char, index) => (
                  <motion.span
                    key={`tagline-${index}`}
                    variants={{
                      hidden: { display: "none" },
                      visible: { display: "inline" },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.4,
                }}
                style={{
                  marginLeft: "0.1em",
                  display: "inline-block",
                  width: "0.5ch",
                  height: "0.8em",
                  backgroundColor: "currentColor",
                  verticalAlign: "baseline",
                }}
              />
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
}
