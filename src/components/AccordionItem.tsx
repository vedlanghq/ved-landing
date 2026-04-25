"use client";

import { motion } from "framer-motion";

export function AccordionItem({
  title,
  limitation,
  solution,
  labelA = "The limit:",
  labelB = "The Ved approach:",
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
