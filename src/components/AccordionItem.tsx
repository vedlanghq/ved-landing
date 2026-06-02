"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function AccordionItem({
  title,
  solution,
  labelB,
  isOpen,
  onToggle,
}: any) {
  return (
    <div className="border-b border-lexum-border pt-4 pb-2">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left text-lexum-text hover:text-lexum-accent transition-colors pb-4"
      >
        <span className="font-mono text-sm tracking-wide truncate pr-4">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-lexum-muted" />
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
              {labelB && (
                <strong className="text-lexum-text font-mono mr-2">
                  {labelB}
                </strong>
              )}
              {solution}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
