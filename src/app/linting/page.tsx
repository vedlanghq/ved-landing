"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AccordionItem } from "@/components/AccordionItem";

const LINT_CATEGORIES = [
  {
    title: "Unbounded Retry Loops",
    desc: "Lexum flags retries on best-effort networks without strict upper limits or backoff guarantees.",
  },
  {
    title: "State Domain Mishandling",
    desc: "Catches confusion between transient cache states and fatal persistent storage bounds.",
  },
  {
    title: "Non-idempotent Cross-Boundary Payloads",
    desc: "Warns when emitting network IO that isn't guaranteed to be idempotent across failure boundaries.",
  },
  {
    title: "Implicit Authority Downgrades",
    desc: "Flags when high-authority domains pass unsanitized references down to lower scopes.",
  },
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
          onToggle={() =>
            setOpenKey(openKey === item.title ? null : item.title)
          }
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
                  Lexum Diagnostics
                </motion.div>
                <motion.h1
                  variants={itemFade}
                  className="col-span-12 md:col-span-8 text-display-1 text-lexum-text mb-6"
                >
                  Lints for <span className="text-lexum-accent">Control Plane idioms.</span>
                </motion.h1>

                <motion.p
                  variants={itemFade}
                  className="col-span-12 md:col-span-6 text-mono-body text-lexum-text mb-10"
                >
                  Not just formatting. Static analysis tailored for distributed
                  execution and robustness.
                </motion.p>
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
                  Idiomatic Robustness
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
                  Linting isn&apos;t a stylistic suggestion in Lexum. It&apos;s
                  a proactive defense against emergent chaos. Lints catch
                  antipatterns that cause systemic failures rather than local
                  crashes.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="content-section bg-(--section-3)">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="two-col-grid align-top">
              <motion.div
                className="col-span-12 md:col-span-4 lg:col-span-5"
                {...fadeUp}
              >
                <h2 className="text-2xl text-lexum-text font-semibold tracking-tight border-b border-lexum-border pb-2 mb-6">
                  Actionable Lints
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
                <div className="accordion-group">
                  <LintCategoryAccordions />
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
                  Auto-Remediation
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
                  Where possible, `Lexum fmt` and `Lexum fix` apply
                  standardized, community-proven transformations to code. The
                  objective is frictionless compliance with distributed system
                  best practices.
                </p>
                <div className="command-breakdown">
                  <div>
                    <div>
                      <code>Lexum fix</code>
                    </div>
                    <div>
                      Executes the deterministic static analysis engine.
                    </div>
                  </div>
                  <div>
                    <div>
                      <code>--apply</code>
                    </div>
                    <div>
                      Automatically resolves safe structural violations.
                    </div>
                  </div>
                  <div>
                    <div>
                      <code>--all</code>
                    </div>
                    <div>
                      Traverses all domain boundaries and goal configurations.
                    </div>
                  </div>
                </div>
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
                The Developer Experience
              </h2>
              <p className="text-lexum-muted leading-relaxed mb-6 max-w-2xl mx-auto">
                Read about how the CLI unifies all diagnostic tools into a
                single, cohesive interface.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/cli"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-sm font-medium transition-all duration-300 bg-lexum-accent text-lexum-text hover:bg-lexum-text hover:text-lexum-bg rounded hover:scale-105 hover:shadow-[0_0_30px_rgba(255,69,0,0.6)] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    CLI UX Philosophy
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
