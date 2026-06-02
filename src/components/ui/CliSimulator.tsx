"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const COMMAND = "lxm build --check";

const LOGS = [
  { id: 1, type: "info", text: "Parsing causality constraints..." },
  { id: 2, type: "info", text: "Mapping domain assertions..." },
  { id: 3, type: "warn", text: "Unbounded retry loop detected in auth.lx" },
  { id: 4, type: "info", text: "Re-routing state boundaries..." },
  { id: 5, type: "success", text: "Determinism invariant checks passed." },
  { id: 6, type: "emit", text: "Bytecode generated in 14ms." },
];

export function CliSimulator() {
  const [hasStarted, setHasStarted] = useState(false);
  const [typedCommand, setTypedCommand] = useState("");
  const [visibleLogs, setVisibleLogs] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasStarted) return;

    let timeoutIds: NodeJS.Timeout[] = [];

    // 1. Type out the command
    let currentCommand = "";
    const typingDuration = 50; // ms per char

    for (let i = 0; i < COMMAND.length; i++) {
      const id = setTimeout(() => {
        currentCommand += COMMAND[i];
        setTypedCommand(currentCommand);
      }, i * typingDuration);
      timeoutIds.push(id);
    }

    // 2. Pause then stream logs
    const totalTypingTime = COMMAND.length * typingDuration;
    const processingPause = 400; // ms to pause before logs

    let cumulativeDelay = totalTypingTime + processingPause;

    LOGS.forEach((log) => {
      // Add slight randomness to log streaming time for realism
      const randomDelay = Math.random() * 150 + 50;
      cumulativeDelay += randomDelay;

      const id = setTimeout(() => {
        setVisibleLogs((prev) => [...prev, log.id]);

        // Auto-scroll to bottom
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, cumulativeDelay);
      timeoutIds.push(id);
    });

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [hasStarted]);

  const resetSimulation = () => {
    setHasStarted(false);
    setTypedCommand("");
    setVisibleLogs([]);
  };

  return (
    <div className="w-full" style={{ perspective: "1000px" }}>
      <motion.div
        initial={{ rotateX: -90, opacity: 0 }}
        whileInView={{ rotateX: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 20,
          mass: 1.2,
          delay: 0.1,
        }}
        style={{ transformOrigin: "bottom center" }}
        className="w-full max-w-2xl mx-auto rounded-lg border border-lexum-border bg-lexum-panel shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-lexum-border bg-lexum-bg/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-lexum-border/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-lexum-border/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-lexum-border/50"></span>
          </div>
          <div className="font-mono text-[10px] text-lexum-muted uppercase tracking-widest">
            lexum-orchestrator
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Terminal Body */}
        <div
          ref={containerRef}
          className="relative p-6 font-mono text-sm leading-relaxed min-h-70 max-h-70 overflow-y-auto"
        >
          {/* Default State / Run Button */}
          {!hasStarted && (
            <div className="absolute inset-0 flex items-center justify-center bg-lexum-panel/50 backdrop-blur-[2px] z-10">
              <button
                onClick={() => setHasStarted(true)}
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-lexum-text text-lexum-bg font-mono font-bold text-sm uppercase tracking-wider hover:bg-lexum-accent transition-colors"
              >
                <Play className="w-4 h-4 fill-current" />
                Run Simulation
              </button>
            </div>
          )}

          {/* Prompt */}
          <div className="flex gap-3 text-lexum-text mb-4">
            <span className="text-lexum-accent shrink-0">➜</span>
            <span className="text-lexum-muted shrink-0">~/project</span>
            <div className="flex-1">
              {typedCommand}
              {hasStarted && typedCommand !== COMMAND && (
                <span className="inline-block w-2 h-4 bg-lexum-text ml-1 animate-pulse"></span>
              )}
            </div>
          </div>

          {/* Logs */}
          <div className="flex flex-col gap-2">
            {LOGS.map((log) => {
              if (!visibleLogs.includes(log.id)) return null;

              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-3"
                >
                  {log.type === "info" && (
                    <span className="text-blue-400 shrink-0">[INFO]</span>
                  )}
                  {log.type === "warn" && (
                    <span className="text-yellow-400 shrink-0">[WARN]</span>
                  )}
                  {log.type === "success" && (
                    <span className="text-green-400 shrink-0">[SUCCESS]</span>
                  )}
                  {log.type === "emit" && (
                    <span className="text-purple-400 shrink-0">[EMIT]</span>
                  )}
                  <span className="text-lexum-muted">{log.text}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Final Cursor */}
          {visibleLogs.length === LOGS.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3 text-lexum-text mt-4"
            >
              <span className="text-lexum-accent shrink-0">➜</span>
              <span className="text-lexum-muted shrink-0">~/project</span>
              <span className="inline-block w-2 h-4 bg-lexum-text animate-pulse"></span>
            </motion.div>
          )}

          {/* Replay Button */}
          {visibleLogs.length === LOGS.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 flex justify-end"
            >
              <button
                onClick={resetSimulation}
                className="text-xs font-mono text-lexum-muted hover:text-lexum-text transition-colors border border-lexum-border px-3 py-1 rounded"
              >
                [Rerun]
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
