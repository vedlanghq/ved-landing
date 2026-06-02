"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion } from "framer-motion";

interface CodeBlockProps {
  children: React.ReactNode;
  rawCode?: string;
  language?: string;
  className?: string;
}

export function CodeBlock({
  children,
  rawCode,
  language = "lexum",
  className = "",
}: Readonly<CodeBlockProps>) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    let textToCopy = rawCode;

    // Fallback if rawCode wasn't explicitly provided but children is a string
    if (!textToCopy && typeof children === "string") {
      textToCopy = children;
    }

    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`border border-lexum-border bg-lexum-bg rounded-lg overflow-hidden flex flex-col w-full my-6 ${className}`}
    >
      <div className="bg-lexum-panel border-b border-lexum-border px-4 py-2 flex items-center justify-between">
        <span className="text-tag text-lexum-muted uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="group flex items-center gap-1.5 text-xs font-mono text-lexum-muted hover:text-lexum-text transition-colors focus:outline-none"
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
      <div className="p-4 font-mono text-sm text-lexum-text overflow-x-auto whitespace-pre">
        {children}
      </div>
    </div>
  );
}
