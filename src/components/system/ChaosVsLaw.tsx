"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

function ImperativeChaos() {
  return (
    <div className="relative h-64 w-full border border-lexum-border bg-lexum-panel rounded-xs overflow-hidden p-6 flex flex-col justify-end">
      <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-start justify-between gap-2">
        <span className="text-tag text-lexum-muted leading-tight">
          MODEL: IMPERATIVE / REACTIVE
        </span>
        <span className="text-tag text-red-500 leading-tight whitespace-nowrap">
          [DRIFT DETECTED]
        </span>
      </div>

      {/* Simulation of chaotic nodes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          className="w-full h-full opacity-30"
          viewBox="0 0 400 200"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 50 100 Q 150 20, 200 150 T 350 80"
            fill="transparent"
            stroke="#ff4500"
            strokeWidth="2"
            strokeDasharray="4 4"
            animate={{
              d: [
                "M 50 100 Q 150 20, 200 150 T 350 80",
                "M 50 100 Q 100 180, 250 50 T 350 120",
                "M 50 100 Q 150 20, 200 150 T 350 80",
              ],
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
          <motion.circle
            cx="150"
            cy="80"
            r="4"
            fill="#ff4500"
            animate={{ cy: [80, 120, 80], cx: [150, 170, 150] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <motion.circle
            cx="250"
            cy="120"
            r="4"
            fill="#ff4500"
            animate={{ cy: [120, 60, 120], cx: [250, 230, 250] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <p className="text-mono-body text-lexum-muted z-10 relative">
        State mutated out of band. Race conditions inevitable. Convergence acts
        as a coincidental side-effect of retry loops.
      </p>
    </div>
  );
}

function DeterministicLaw() {
  return (
    <div className="relative h-64 w-full border border-lexum-border bg-lexum-bg rounded-xs overflow-hidden p-6 flex flex-col justify-end">
      <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-start justify-between gap-2">
        <span className="text-tag text-lexum-accent leading-tight">
          MODEL: DETERMINISTIC / LAW
        </span>
        <span className="text-tag text-[#00ff00] leading-tight whitespace-nowrap">
          [CONVERGED]
        </span>
      </div>

      {/* Simulation of strict DAG/timeline */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          className="w-full h-full opacity-60"
          viewBox="0 0 400 200"
          preserveAspectRatio="none"
        >
          <path
            d="M 50 100 L 150 100 L 250 100 L 350 100"
            fill="transparent"
            stroke="#222222"
            strokeWidth="2"
          />

          <motion.path
            d="M 50 100 L 350 100"
            fill="transparent"
            stroke="var(--lexum-border)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 1.5, ease: "linear" }}
          />

          <circle
            cx="50"
            cy="100"
            r="4"
            fill="var(--lexum-bg)"
            stroke="var(--lexum-border)"
            strokeWidth="2"
          />
          <circle
            cx="150"
            cy="100"
            r="4"
            fill="var(--lexum-bg)"
            stroke="var(--lexum-border)"
            strokeWidth="2"
          />
          <circle
            cx="250"
            cy="100"
            r="4"
            fill="var(--lexum-bg)"
            stroke="var(--lexum-border)"
            strokeWidth="2"
          />
          <motion.circle
            cx="350"
            cy="100"
            r="6"
            fill="#00ff00"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 0.2 }}
          />
        </svg>
      </div>

      <p className="text-mono-body text-lexum-text z-10 relative">
        System advances through synchronized transitions. Configuration drift
        impossible. Convergence guaranteed by the runtime mathematically.
      </p>
    </div>
  );
}

export function ChaosVsLaw() {
  return (
    <section className="py-24 border-b border-lexum-border">
      <Container>
        <div className="mb-16">
          <h2 className="text-display-1 text-lexum-text text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Imperative orchestration <br /> fails dynamically.
          </h2>
          <p className="text-mono-body text-lexum-muted max-w-2xl">
            Modern infrastructure relies on YAML applied sequentially by
            imperative runners. When state drifts, they react chaotically. Lexum
            replaces reactions with computation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ImperativeChaos />
          <DeterministicLaw />
        </div>
      </Container>
    </section>
  );
}
