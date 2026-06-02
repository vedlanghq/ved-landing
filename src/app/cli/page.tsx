"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AccordionItem } from "@/components/AccordionItem";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { TabbedCodeBlock } from "@/components/ui/TabbedCodeBlock";
import { CliSimulator } from "@/components/ui/CliSimulator";

const DESIGN_PRECEPTS = [
  {
    title: "Zero chrome",
    desc: "No extraneous banners or ASCII art. Data over styling.",
  },
  {
    title: "Sub-second responses",
    desc: "Parsing, linting, and compiling must feel instantaneous.",
  },
  {
    title: "Structural output",
    desc: "Everything emits structured diagnostics if needed (`--json`).",
  },
  {
    title: "Actionability",
    desc: "Never report an error without a path to resolution.",
  },
];

function InstallInteractiveSection({ fadeUp }: Readonly<{ fadeUp: any }>) {
  const [activeTab, setActiveTab] = useState("macos");

  const tabs = [
    {
      id: "macos",
      title: "macOS",
      language: "bash",
      code: `$ brew tap lexum/lexum\n$ brew install lexum`,
    },
    {
      id: "linux",
      title: "Linux",
      language: "bash",
      code: `$ curl -sSL https://lexum.dev/install.sh | bash\n$ sudo apt install lexum-cli`,
    },
    {
      id: "windows",
      title: "Windows",
      language: "powershell",
      code: `> winget install lexum.cli`,
    },
  ];

  return (
    <section className="content-section bg-(--section-1)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="two-col-grid align-top">
          <motion.div
            className="col-span-12 md:col-span-4 lg:col-span-5"
            {...fadeUp}
          >
            <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6">
              Installation
            </h2>
            <p className="text-lexum-muted leading-relaxed mb-6">
              A single standalone binary with zero dependencies. No virtual
              environments required.
            </p>
          </motion.div>
          <motion.div
            className="col-span-12 md:col-span-8 lg:col-span-7"
            {...fadeUp}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <TabbedCodeBlock
              tabs={tabs}
              activeTabId={activeTab}
              onTabChange={setActiveTab}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

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
          onToggle={() =>
            setOpenKey(openKey === item.title ? null : item.title)
          }
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
  isAccent = false,
}: Readonly<{
  command: string;
  title: string;
  desc: string;
  isOpen: boolean;
  onToggle: () => void;
  isAccent?: boolean;
}>) {
  return (
    <div className="border-b border-lexum-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group hover:opacity-80 transition-opacity py-4 gap-4"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="text-lexum-text font-medium text-sm truncate">
            {title}
          </div>
          <code
            className={`font-mono text-xs px-2 py-0.5 rounded border shrink-0 ${isAccent ? "bg-lexum-accent/10 border-lexum-accent text-lexum-accent" : "bg-lexum-panel border-lexum-border text-lexum-text"}`}
          >
            {command}
          </code>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 flex items-center text-lexum-muted group-hover:text-lexum-text transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm text-lexum-muted leading-relaxed">
              {desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const COMMAND_DATA = [
  {
    command: "Lexum build",
    title: "Compilation & Authorization",
    desc: "Compiles Lexum source files into deterministic bytecode. Before emitting the binary, it rigorously validates authority bounds across all transitions to ensure no state mutations occur outside of their permitted domains.",
  },
  {
    command: "Lexum run",
    title: "Local Orchestration Simulator",
    desc: "Executes the compiled bytecode locally in an isolated sandbox. It simulates distributed orchestration overhead, injects dynamic gas metering, and guarantees exactly the same execution path as production.",
  },
  {
    command: "Lexum check",
    title: "Static Idiom Analysis",
    desc: "Triggers the deterministic static analysis engine. Instead of just checking types, it catches systemic antipatterns like unbounded retry loops, transient state mishandling, and non-idempotent payloads.",
    isAccent: true,
  },
  {
    command: "Lexum test",
    title: "Formal Convergence Testing",
    desc: "Runs bounded convergence simulations. It validates state graph assertions under simulated network partitions, ensuring that your logic correctly handles dropped packets and starvation scenarios before deployment.",
  },
];

function WorkflowAccordions() {
  const [openKey, setOpenKey] = useState<string | null>("Lexum build");
  return (
    <div className="flex flex-col w-full">
      {COMMAND_DATA.map((item) => (
        <CommandAccordionItem
          key={item.command}
          command={item.command}
          title={item.title}
          desc={item.desc}
          isAccent={item.isAccent}
          isOpen={openKey === item.command}
          onToggle={() =>
            setOpenKey(openKey === item.command ? null : item.command)
          }
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
      <Header />

      <main className="flex-1 bg-lexum-bg overflow-hidden">
        <section className="hero-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid-layout"
              >
                <motion.div
                  className="col-span-12 text-tag text-lexum-accent tracking-widest mb-4 uppercase"
                  variants={itemFade}
                >
                  Lexum Tooling
                </motion.div>
                <motion.h1
                  variants={itemFade}
                  className="col-span-12 md:col-span-8 text-display-1 text-lexum-text mb-6"
                >
                  The terminal is
                  <br />
                  <span className="text-lexum-accent">the platform.</span>
                </motion.h1>

                <motion.p
                  variants={itemFade}
                  className="col-span-12 md:col-span-6 text-mono-body text-lexum-text mb-10"
                >
                  A philosophical alignment of speed, clarity, and structural
                  honesty.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CLI SIMULATOR SECTION */}
        <section className="py-12 bg-(--section-1)">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
            <CliSimulator />
          </div>
        </section>

        <section className="content-section bg-(--section-2)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="two-col-grid align-top">
              <motion.div
                className="col-span-12 md:col-span-4 lg:col-span-5"
                {...fadeUp}
              >
                <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6">
                  Design Precepts
                </h2>
              </motion.div>

              <motion.div
                className="col-span-12 md:col-span-8 lg:col-span-7"
                {...fadeUp}
                transition={{
                  delay: 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="text-lexum-muted leading-relaxed mb-6">
                  We believe the CLI is the highest-leverage developer
                  interface. It must respect time, attention, and cognitive
                  capacity.
                </p>
                <div className="accordion-group">
                  <PreceptsAccordions />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <InstallInteractiveSection fadeUp={fadeUp} />

        <section className="content-section bg-(--section-3)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="two-col-grid align-top">
              <motion.div
                className="col-span-12 md:col-span-4 lg:col-span-5"
                {...fadeUp}
              >
                <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6">
                  Diagnostic Formatting
                </h2>
              </motion.div>

              <motion.div
                className="col-span-12 md:col-span-8 lg:col-span-7"
                {...fadeUp}
                transition={{
                  delay: 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="text-lexum-muted leading-relaxed mb-6">
                  Every failure must clearly separate: Context, Evidence,
                  Consequence, and Remedy.
                </p>
                <div className="bg-transparent! border-0! p-0">
                  <CodeBlock
                    rawCode={`ERROR[E0042] Type mismatch in state transition\n\n12 | transition.apply(State::Pending, State::Active)\n   | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n   | Expected TerminalState, found TransientState\n\n= Help: ensure \`State::Active\` implements \`TerminalTransition\``}
                    language="bash"
                  >
                    {`ERROR[E0042] Type mismatch in state transition

12 | transition.apply(State::Pending, State::Active)
   | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   | Expected TerminalState, found TransientState

= Help: ensure \`State::Active\` implements \`TerminalTransition\``}
                  </CodeBlock>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="content-section bg-(--section-2)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="two-col-grid align-top">
              <motion.div
                className="col-span-12 md:col-span-4 lg:col-span-5"
                {...fadeUp}
              >
                <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6">
                  Unified Workflow
                </h2>
              </motion.div>

              <motion.div
                className="col-span-12 md:col-span-8 lg:col-span-7"
                {...fadeUp}
                transition={{
                  delay: 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="text-lexum-muted leading-relaxed mb-6">
                  One binary. No plugins to configure. No disjointed toolchain
                  environments.
                </p>
                <WorkflowAccordions />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 border-b border-lexum-border bg-(--section-1)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              {...fadeUp}
              className="text-center flex flex-col items-center"
            >
              <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6 inline-block">
                Get Started
              </h2>
              <p className="text-lexum-muted leading-relaxed mb-6 max-w-2xl mx-auto">
                Start building reliable distributed systems today.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/docs"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-sm font-medium transition-all duration-300 bg-lexum-accent text-lexum-text hover:bg-lexum-text hover:text-lexum-bg rounded hover:scale-105 hover:shadow-[0_0_30px_rgba(255,69,0,0.6)] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Docs
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
