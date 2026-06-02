import Link from "next/link";
import type { Metadata } from "next";
import { AnimatedTabs, Tab } from "@/components/ui/AnimatedTabs";
import { AlertCircle, Map, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Explore the Lexum documentation. Learn how to write deterministic control-plane logic, manage state, and build self-healing distributed systems.",
  openGraph: {
    title: "Documentation | Lexum",
    description:
      "Explore the Lexum documentation. Learn how to write deterministic control-plane logic, manage state, and build self-healing distributed systems.",
    url: "https://lexumhq.netlify.app/docs",
  },
};

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const GET_STARTED_TAB = (
  <div className="w-full relative rounded-md border border-lexum-border bg-lexum-panel/80 backdrop-blur-md shadow-sm flex flex-col md:flex-row min-h-full">
    {/* Left Column */}
    <div className="md:w-[45%] p-8 lg:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-lexum-border">
      <div className="text-blue-500 font-mono text-xs tracking-widest mb-4 uppercase">
        01 / Get Started
      </div>
      <h2 className="text-2xl lg:text-3xl font-bold text-lexum-text mb-4 tracking-tight leading-tight">
        Install & run your first Lexum program.
      </h2>
      <p className="text-lexum-muted leading-relaxed text-base">
        Set up the toolchain, compile a domain definition, and watch the runtime
        stabilise your first self-healing worker pool — in under five minutes.
      </p>
    </div>

    {/* Right Column */}
    <div className="md:w-[55%] grid grid-cols-1 md:grid-cols-2">
      <Link
        href="/docs/what-is-lexum"
        className="group p-6 lg:p-8 md:border-b md:border-r border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">01</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">
          What is Lexum?
        </h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          A brief introduction to the control plane language.
        </p>
      </Link>
      <Link
        href="/docs/hello-stability"
        className="group p-6 lg:p-8 md:border-b border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">02</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">
          Quick Start
        </h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          Write and run your first domain in 60 seconds.
        </p>
      </Link>
      <Link
        href="/docs/problem-space"
        className="group p-6 lg:p-8 md:border-r border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">03</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">
          The Problem Space
        </h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          Why deterministic orchestration is necessary.
        </p>
      </Link>
      <Link
        href="/docs/worker-pool-scaling"
        className="group p-6 lg:p-8 border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">04</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">Examples</h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          Real-world worker-pool scaling demo.
        </p>
      </Link>
    </div>
  </div>
);

const LANGUAGE_GUIDE_TAB = (
  <div className="w-full relative rounded-md border border-lexum-border bg-lexum-panel/80 backdrop-blur-md shadow-sm flex flex-col md:flex-row min-h-full">
    <div className="md:w-[45%] p-8 lg:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-lexum-border">
      <div className="text-blue-500 font-mono text-xs tracking-widest mb-4 uppercase">
        02 / Language Guide
      </div>
      <h2 className="text-2xl lg:text-3xl font-bold text-lexum-text mb-4 tracking-tight leading-tight">
        Explore the Language Guide.
      </h2>
      <p className="text-lexum-muted leading-relaxed text-base">
        Learn the ins and outs of Lexum's domain definition syntax, types, and
        stability patterns.
      </p>
    </div>
    <div className="md:w-[55%] grid grid-cols-1 md:grid-cols-2">
      <Link
        href="/docs/syntax-modes"
        className="group p-6 lg:p-8 md:border-b md:border-r border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">01</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">
          Syntax Modes
        </h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          Discover Lexum's strict syntax and declarations.
        </p>
      </Link>
      <Link
        href="/docs/type-system-overview"
        className="group p-6 lg:p-8 md:border-b border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">02</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">
          Type System
        </h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          Understand the core types and structures.
        </p>
      </Link>
      <Link
        href="/docs/domains"
        className="group p-6 lg:p-8 md:border-r border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">03</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">Domains</h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          Isolate logic safely across robust domains.
        </p>
      </Link>
      <Link
        href="/docs/effects"
        className="group p-6 lg:p-8 border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">04</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">Effects</h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          Manage side-effects and boundaries.
        </p>
      </Link>
    </div>
  </div>
);

const RUNTIME_TAB = (
  <div className="w-full relative rounded-md border border-lexum-border bg-lexum-panel/80 backdrop-blur-md shadow-sm flex flex-col md:flex-row min-h-full">
    <div className="md:w-[45%] p-8 lg:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-lexum-border">
      <div className="text-blue-500 font-mono text-xs tracking-widest mb-4 uppercase">
        03 / Runtime
      </div>
      <h2 className="text-2xl lg:text-3xl font-bold text-lexum-text mb-4 tracking-tight leading-tight">
        Explore the Runtime.
      </h2>
      <p className="text-lexum-muted leading-relaxed text-base">
        Dive deep into the self-healing orchestration engine, mailboxes, and
        failure recovery loops.
      </p>
    </div>
    <div className="md:w-[55%] grid grid-cols-1 md:grid-cols-2">
      <Link
        href="/docs/runtime-architecture"
        className="group p-6 lg:p-8 md:border-b md:border-r border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">01</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">
          Architecture
        </h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          High-level components and runtime engine.
        </p>
      </Link>
      <Link
        href="/docs/concurrency-model"
        className="group p-6 lg:p-8 md:border-b border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">02</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">
          Concurrency
        </h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          Understand how Lexum handles parallel processing.
        </p>
      </Link>
      <Link
        href="/docs/mailbox-model"
        className="group p-6 lg:p-8 md:border-r border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">03</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">
          Mailbox Model
        </h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          Asynchronous messaging and queueing.
        </p>
      </Link>
      <Link
        href="/docs/failure-recovery-loop"
        className="group p-6 lg:p-8 border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">04</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">Recovery</h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          Learn how the failure recovery loop works.
        </p>
      </Link>
    </div>
  </div>
);

const CLI_TAB = (
  <div className="w-full relative rounded-md border border-lexum-border bg-lexum-panel/80 backdrop-blur-md shadow-sm flex flex-col md:flex-row min-h-full">
    <div className="md:w-[45%] p-8 lg:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-lexum-border">
      <div className="text-blue-500 font-mono text-xs tracking-widest mb-4 uppercase">
        04 / CLI
      </div>
      <h2 className="text-2xl lg:text-3xl font-bold text-lexum-text mb-4 tracking-tight leading-tight">
        Explore the CLI.
      </h2>
      <p className="text-lexum-muted leading-relaxed text-base">
        Command reference for compiling, diagnosing, and running your worker
        pools.
      </p>
    </div>
    <div className="md:w-[55%] grid grid-cols-1 md:grid-cols-2">
      <Link
        href="/docs/command-reference"
        className="group p-6 lg:p-8 md:border-b md:border-r border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">01</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">
          Command Reference
        </h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          Complete list of Lexum CLI commands.
        </p>
      </Link>
      <Link
        href="/docs/cli-ux-philosophy"
        className="group p-6 lg:p-8 md:border-b border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">02</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">
          UX Philosophy
        </h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          Our approach to developer tooling.
        </p>
      </Link>
      <Link
        href="/docs/observability-commands"
        className="group p-6 lg:p-8 md:border-r border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">03</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">
          Observability
        </h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          Commands to introspect running domains.
        </p>
      </Link>
      <Link
        href="/docs/lint-verify-usage"
        className="group p-6 lg:p-8 border-lexum-border hover:bg-lexum-text/5 transition-colors flex flex-col"
      >
        <div className="text-lexum-muted/60 font-mono text-xs mb-3">04</div>
        <h3 className="text-lexum-text font-semibold text-lg mb-2">Linting</h3>
        <p className="text-lexum-muted text-sm leading-relaxed flex-1">
          Usage of the verify and linting systems.
        </p>
      </Link>
    </div>
  </div>
);

const tabs: Tab[] = [
  {
    title: "Get Started",
    value: "get-started",
    content: GET_STARTED_TAB,
  },
  {
    title: "Language Guide",
    value: "language-guide",
    content: LANGUAGE_GUIDE_TAB,
  },
  {
    title: "Runtime",
    value: "runtime",
    content: RUNTIME_TAB,
  },
  {
    title: "CLI",
    value: "cli",
    content: CLI_TAB,
  },
];

export default function DocsIndex() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-64px)] flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        <header className="mb-12 border-b border-lexum-border pb-8">
          <p className="text-tag text-lexum-muted mb-3">Lexum Documentation</p>
          <h1 className="text-display-2 text-lexum-text mb-3">
            Deterministic orchestration. <br /> Deeply Documented.
          </h1>
          <p className="text-lexum-muted max-w-3xl leading-relaxed">
            Everything you need to understand, operate, and extend the Lexum
            runtime. From first principles to production.
          </p>
        </header>

        <div className="mb-16">
          <AnimatedTabs tabs={tabs} containerClassName="gap-2 mb-12" />
        </div>

        {/* Bottom Nav Links */}
        <div className="mt-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:border-t md:border-lexum-border pt-12 md:pt-16">
          <a
            href="https://github.com/lexumhq/lexum"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start gap-3 p-4 md:p-0 text-lexum-muted hover:text-lexum-text transition-colors group"
          >
            <GithubIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-sm tracking-widest uppercase">
              Github
            </span>
          </a>
          <a
            href="https://github.com/lexumhq/lexum/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start gap-3 p-4 md:p-0 text-lexum-muted hover:text-lexum-text transition-colors group md:border-l md:border-lexum-border md:pl-8"
          >
            <AlertCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-sm tracking-widest uppercase">
              Issues
            </span>
          </a>
          <a
            href="/docs/roadmap"
            className="flex items-center justify-center md:justify-start gap-3 p-4 md:p-0 text-lexum-muted hover:text-lexum-text transition-colors group md:border-l md:border-lexum-border md:pl-8"
          >
            <Map className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-sm tracking-widest uppercase">
              Roadmap
            </span>
          </a>
          <a
            href="/docs/contributing-guide"
            className="flex items-center justify-center md:justify-start gap-3 p-4 md:p-0 text-lexum-muted hover:text-lexum-text transition-colors group md:border-l md:border-lexum-border md:pl-8"
          >
            <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-sm tracking-widest uppercase">
              Contributing
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
