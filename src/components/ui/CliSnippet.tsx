"use client";
import React, { useState } from "react";

export function CliSnippet({ command }: Readonly<{ command: string }>) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-lexum-border bg-lexum-bg rounded-xs overflow-hidden flex flex-col w-full">
      <div className="bg-lexum-panel border-b border-lexum-border px-4 py-2 flex items-center justify-between">
        <span className="text-tag text-lexum-muted">LEXUM_CLI</span>
        <button
          onClick={handleCopy}
          className="text-tag text-lexum-muted hover:text-lexum-text transition-colors"
        >
          {copied ? "[COPIED]" : "[COPY]"}
        </button>
      </div>
      <div className="p-4 font-mono text-sm text-lexum-text overflow-x-auto whitespace-pre">
        <span className="text-lexum-accent pointer-events-none">$</span>{" "}
        {command}
      </div>
    </div>
  );
}
