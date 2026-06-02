"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BOOT_LOGS = [
  "[SYSTEM] INITIALIZING DETERMINISTIC ENGINE...",
  "[DAG] Validating execution graph... OK",
  "[STATE] Checking persistent snapshot... FOUND",
  "[AUTHORITY] Resolving spatial authority model...",
  "[DOMAIN:AUTH-01] Quiescence detected.",
  "[DOMAIN:SCHED-01] Transitions verified.",
  "[NETWORK] Awaiting multi-domain coordination gaps...",
  "[RUNTIME] Goal-specification semantics active.",
  "[RECONCILIATION] Computing deterministic target state.",
  "[CONVERGENCE] OK. SYSTEM STABLE.",
];

export function BootSequence() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isStable, setIsStable] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLogs([]); // Reset state for HMR/Strict Mode
    let index = 0;
    const interval = setInterval(() => {
      if (index < BOOT_LOGS.length) {
        const currentLog = BOOT_LOGS[index];
        setLogs((prev) =>
          prev.includes(currentLog) ? prev : [...prev, currentLog],
        );
        index++;
      } else {
        setIsStable(true);
        clearInterval(interval);
      }
    }, 150); // fast computational logging

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 user-select-none mix-blend-screen text-lexum-muted">
      <div className="w-full h-full flex flex-col justify-end p-8 font-mono text-[0.65rem] leading-tight mask-image-b">
        {logs.map((log, i) =>
          log ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1, ease: "linear" }}
              className={log.includes("CONVERGENCE") ? "text-lexum-accent" : ""}
            >
              {log}
            </motion.div>
          ) : null,
        )}
        {isStable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="mt-2 text-lexum-accent"
          >
            _
          </motion.div>
        )}
      </div>
      {/* Visual grid structure overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </div>
  );
}
