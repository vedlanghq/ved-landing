"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DomainBlock } from "@/components/ui/DomainBlock";
import DeterministicSystemMesh from "@/components/system/DeterministicSystemMesh";
import { useSettings } from "@/providers/SettingsProvider";

// Hard-coded constraints: No spring physics physics.
// Easing relies on sharp mathematical cuts or completely linear shifts.
const mechanicalEase: [number, number, number, number] = [0, 0, 0.2, 1]; // highly sharp/abrupt ease Out

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ease: mechanicalEase, duration: 0.4 },
  },
};

export function Hero() {
  const { isMotionEnabled } = useSettings();

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden border-b border-lexum-border bg-lexum-bg">
      {/* Static 404-style Background (visible when motion is off) */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
          isMotionEnabled ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-lexum-accent/10 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      {/* Absolute positioning background element computing the Boot Sequence */}
      <DeterministicSystemMesh />

      <Container className="relative z-10 py-24 mt-16">
        <motion.div
          className="grid-layout"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className="col-span-12 md:col-span-8 lg:col-span-7">
            <motion.h1
              variants={itemVariants}
              className="text-display-1 text-lexum-text mb-6"
            >
              Your system behaves <br />
              <span className="text-lexum-muted">exactly as written.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-mono-body text-lexum-text mb-10 max-w-xl"
            >
              Deterministic control for distributed systems. Replace imperative
              orchestration chaos with infrastructure governed by executable
              law.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-16"
            >
              <Button variant="primary" href="/determinism">
                Explore Development Experience
              </Button>
              <Button
                variant="outline"
                href="https://github.com/lexumhq"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Github
              </Button>
            </motion.div>

            {/* <motion.div variants={itemVariants} className="max-w-md">
              <CliSnippet command="lxm init my-infrastructure   --strict" />
            </motion.div> */}
          </div>

          <motion.div
            variants={containerVariants}
            className="col-span-12 md:col-span-4 lg:col-span-4 lg:col-start-9 flex flex-col gap-6 mt-16 md:mt-0"
          >
            <motion.div variants={itemVariants} className="h-full">
              <DomainBlock
                domainId="SCHED-01"
                title="Deterministic Scheduler"
                status="converging"
              >
                Transitions are calculated fully before partial application. The
                runtime guarantees convergence prior to side-effect execution.
              </DomainBlock>
            </motion.div>
            <motion.div variants={itemVariants} className="h-full">
              <DomainBlock
                domainId="STATE-00"
                title="Snapshot Manager"
                status="quiescent"
              >
                Persistent DAG state verified. Awaiting upstream signals or
                mailbox deltas to resume execution loop.
              </DomainBlock>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
