"use client";

import React, { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface CodeTab {
  id: string;
  title: string;
  language: string;
  code: string;
}

interface TabbedCodeBlockProps {
  tabs: CodeTab[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export function TabbedCodeBlock({
  tabs,
  activeTabId,
  onTabChange,
  className = "",
}: Readonly<TabbedCodeBlockProps>) {
  const [copied, setCopied] = useState(false);
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleCopy = async () => {
    if (activeTab?.code) {
      await navigator.clipboard.writeText(activeTab.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`border border-lexum-border bg-lexum-bg rounded-lg overflow-hidden flex flex-col w-full my-6 ${className}`}
    >
      {/* Tab Header */}
      <div className="bg-lexum-panel border-b border-lexum-border flex items-center justify-between overflow-x-auto">
        <div className="flex items-center">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setCopied(false);
                  onTabChange(tab.id);
                }}
                className={`relative px-4 py-3 text-sm font-mono tracking-wide transition-colors ${
                  isActive
                    ? "text-lexum-accent bg-lexum-bg/50"
                    : "text-lexum-muted hover:text-lexum-text"
                }`}
              >
                {tab.title}
                {isActive && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-lexum-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleCopy}
          className="group flex items-center gap-1.5 px-4 text-xs font-mono text-lexum-muted hover:text-lexum-text transition-colors focus:outline-none shrink-0"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-500" />
              <span className="text-green-500">[COPIED]</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span>[COPY]</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="relative font-mono text-sm text-lexum-text">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="p-4 overflow-x-auto whitespace-pre w-full"
          >
            {activeTab?.code}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
