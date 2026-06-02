"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AccordionItem } from "@/components/AccordionItem";

const WARNING_CATEGORIES = [
  {
    title: "Starvation Probability",
    desc: "A queue configuration that might silently drop throughput over time.",
  },
  {
    title: "Oscillatory Transitions",
    desc: "A state graph that circles indefinitely without halting or violating hard loops.",
  },
  {
    title: "Excessive Snapshotting",
    desc: "Performance regression risks via structural constraints rather than raw execution speed.",
  },
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
          onToggle={() =>
            setOpenKey(openKey === item.title ? null : item.title)
          }
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
                  Proactive System <span className="text-lexum-accent">Risk Signalling.</span>
                </motion.h1>

                <motion.p
                  variants={itemFade}
                  className="col-span-12 md:col-span-6 text-mono-body text-lexum-text mb-10"
                >
                  Lexum surfaces architectural risks before they become
                  failures.
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
                  Why Warnings Matter
                </h2>
                <p className="text-lexum-muted leading-relaxed mb-6">
                  In Control-Plane Programming
                </p>
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
                <ul className="brutalist-list check">
                  <li>Delayed failure characteristics.</li>
                  <li>Probabilistic instability.</li>
                  <li>Convergence inefficiency.</li>
                </ul>
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
                  Warning Taxonomy
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
                  Structured Advisory System
                </p>
                <div className="flex flex-wrap items-center gap-4 bg-lexum-panel border border-lexum-border rounded-lg p-6 mb-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-lexum-muted uppercase tracking-widest">
                      Namespace
                    </span>
                    <code className="bg-lexum-bg px-3 py-1 rounded border border-lexum-border text-lexum-text font-semibold text-sm">
                      Lexum
                    </code>
                  </div>
                  <div className="text-lexum-muted mt-5">—</div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-lexum-muted uppercase tracking-widest">
                      Severity
                    </span>
                    <code className="bg-[#ffae00]/10 px-3 py-1 rounded border border-[#ffae00] text-[#ffae00] font-semibold text-sm">
                      WARN
                    </code>
                  </div>
                  <div className="text-lexum-muted mt-5">—</div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-lexum-muted uppercase tracking-widest">
                      Domain Area
                    </span>
                    <code className="bg-lexum-bg px-3 py-1 rounded border border-lexum-border text-lexum-text font-semibold text-sm">
                      &lt;CATEGORY&gt;
                    </code>
                  </div>
                  <div className="text-lexum-muted mt-5">—</div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-lexum-muted uppercase tracking-widest">
                      Identifier
                    </span>
                    <code className="bg-lexum-bg px-3 py-1 rounded border border-lexum-border text-lexum-text font-semibold text-sm">
                      &lt;NUMBER&gt;
                    </code>
                  </div>
                </div>
                <p className="text-lexum-muted leading-relaxed mb-6">
                  Examples: Scheduler behaviour, Convergence quality,
                  Determinism sensitivity, Authority placement.
                </p>
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
                  Warning Semantics
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
                  <WarningCategoryAccordions />
                </div>
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
                  Suppression & Policy
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
                  Explicit acknowledgement via local suppression guarantees
                  warnings don&apos;t get lost in noise, while policy
                  enforcement lets teams raise warnings to errors.
                </p>
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
                Operational Wisdom
              </h2>
              <p className="text-lexum-muted leading-relaxed mb-6 max-w-2xl mx-auto">
                Warnings help encode operational wisdom into the language
                toolchain.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Link
                  href="/linting"
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-sm font-medium transition-all duration-300 bg-lexum-accent text-lexum-text hover:bg-lexum-text hover:text-lexum-bg rounded hover:scale-105 hover:shadow-[0_0_30px_rgba(255,69,0,0.6)] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Linting Rules
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
