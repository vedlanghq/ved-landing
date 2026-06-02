"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const CODE_LINES = [
  "domain Network {",
  "  goal: TCP_Port(80)",
  "}",
  "",
  "domain Application {",
  "  depends_on: Network",
  "  goal: ReplicaSet(3)",
  "}",
  "",
  "transition Resolve_Topology {",
  "  assert Network.quiescent",
  "  execute => apply Application.goal",
  "}",
];

const STEP_DATA = [
  { label: "INIT", activeLines: [] },
  { label: "EVAL NETWORK", activeLines: [0, 1, 2] },
  { label: "ASSERT QUIESCENCE", activeLines: [9, 10] },
  { label: "EVAL APP", activeLines: [4, 5, 6, 7] },
  { label: "CONVERGENCE", activeLines: [11, 12] },
];

export function InteractiveTraceViewer() {
  const [step, setStep] = useState(0);

  // Deriving visual node states from the current explicit mathematical step
  const networkState =
    step === 0 ? "inactive" : step === 1 ? "evaluating" : "quiescent";
  const appState =
    step < 3 ? "inactive" : step === 3 ? "evaluating" : "quiescent";

  const getBorderColor = (state: string) => {
    if (state === "inactive") return "#222222"; // lexum-border
    if (state === "evaluating") return "#ff4500"; // lexum-accent
    if (state === "quiescent") return "#00ff00"; // success
    return "#222222";
  };

  return (
    <section className="py-24 border-b border-lexum-border" id="trace-viewer">
      <Container>
        <div className="mb-16">
          <div className="text-tag text-lexum-accent mb-4">
            [ TRACE REPLAY ENGINE ]
          </div>
          <h2 className="text-3xl md:text-5xl text-lexum-text font-bold tracking-tight mb-4">
            Inspect the syntax. Replay the state.
          </h2>
          <p className="text-mono-body text-lexum-muted max-w-2xl">
            Because execution is deterministic, state can be stepped forward and
            backward mathematically. Slide the execution trace to verify the
            exact causal chain of the `.lxm` runtime.
          </p>
        </div>

        <div className="border border-lexum-border bg-lexum-panel rounded-xs overflow-hidden">
          {/* Header Controls */}
          <div className="flex justify-between items-center border-b border-lexum-border bg-lexum-bg p-4">
            <div className="text-tag text-lexum-text">EXECUTION_TRACE_V1.4</div>
            <div className="text-tag text-lexum-accent">
              STEP: {step}/4 [ {STEP_DATA[step].label} ]
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-lexum-border">
            {/* Code Panel */}
            <div className="p-6 bg-lexum-bg font-mono text-sm leading-relaxed overflow-x-auto">
              {CODE_LINES.map((line, idx) => {
                const isActive = STEP_DATA[step].activeLines.includes(idx);
                return (
                  <div
                    key={idx}
                    className={`transition-colors duration-150 ${isActive ? "text-lexum-text bg-lexum-border border-l-2 border-lexum-accent pl-2 -ml-2.5" : "text-lexum-muted border-l-2 border-transparent pl-2 -ml-2.5"}`}
                  >
                    <span className="opacity-30 w-6 inline-block select-none">
                      {idx + 1}
                    </span>
                    {line}
                  </div>
                );
              })}
            </div>

            {/* Visualizer Panel */}
            <div className="p-6 relative flex flex-col items-center justify-center min-h-75 overflow-hidden bg-lexum-panel">
              {/* Background Graph Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="var(--lexum-border)"
                    strokeWidth="0.5"
                  />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              <div className="flex flex-col gap-12 relative z-10 w-full max-w-sm">
                {/* Network Node */}
                <motion.div
                  className="border bg-lexum-bg p-4 flex flex-col"
                  animate={{ borderColor: getBorderColor(networkState) }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-tag mb-2 flex justify-between">
                    <span className="text-lexum-text">DOMAIN: Network</span>
                    <span style={{ color: getBorderColor(networkState) }}>
                      [{networkState.toUpperCase()}]
                    </span>
                  </div>
                  <div className="text-mono-body text-lexum-muted">
                    Goal: TCP_Port(80)
                  </div>
                </motion.div>

                {/* Connection Line */}
                <div className="absolute left-1/2 top-20 bottom-24 w-px bg-lexum-border -translate-x-1/2 -z-10">
                  <motion.div
                    className="w-full bg-lexum-accent origin-top"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: step >= 2 ? 1 : 0 }}
                    transition={{ duration: 0.2, ease: "linear" }}
                    style={{ height: "100%" }}
                  />
                </div>

                {/* App Node */}
                <motion.div
                  className="border bg-lexum-bg p-4 flex flex-col"
                  animate={{ borderColor: getBorderColor(appState) }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-tag mb-2 flex justify-between">
                    <span className="text-lexum-text">DOMAIN: Application</span>
                    <span style={{ color: getBorderColor(appState) }}>
                      [{appState.toUpperCase()}]
                    </span>
                  </div>
                  <div className="text-mono-body text-lexum-muted">
                    Goal: ReplicaSet(3)
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Scrubber Control */}
          <div className="border-t border-lexum-border bg-lexum-bg p-6 flex flex-col sm:flex-row gap-6 items-center">
            <div className="text-tag text-lexum-muted shrink-0 w-24">
              TIME_SCRUB
            </div>

            <input
              type="range"
              min="0"
              max="4"
              step="1"
              value={step}
              onChange={(e) => setStep(Number.parseInt(e.target.value))}
              className="w-full h-2 appearance-none bg-lexum-border outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-lexum-accent [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-lexum-accent [&::-webkit-slider-thumb]:rounded-none"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setStep(Math.max(0, step - 1))}
                className="w-10 h-10 border border-lexum-border hover:border-lexum-text text-lexum-text font-mono flex items-center justify-center transition-colors"
                disabled={step === 0}
              >
                {"<"}
              </button>
              <button
                onClick={() => setStep(Math.min(4, step + 1))}
                className="w-10 h-10 bg-lexum-accent hover:bg-[#ff6a2b] text-lexum-text font-mono flex items-center justify-center transition-colors"
                disabled={step === 4}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
