"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowUpRight,
  Copy,
  Check,
  MoreHorizontal,
  MoreVertical,
  ChevronDown,
} from "lucide-react";

export default function DocActionsDropdown({
  slug,
  rawContent,
}: Readonly<{ slug: string; rawContent: string }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
    setIsOpen(false);
  };

  const handleOpenMarkdown = () => {
    window.open(
      `https://raw.githubusercontent.com/lexumhq/lexum-landing/main/docs/${slug}.mdx`,
      "_blank",
    );
    setIsOpen(false);
  };

  return (
    <div
      className="relative flex items-center rounded border border-lexum-border bg-lexum-panel"
      ref={dropdownRef}
    >
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-lexum-muted hover:text-lexum-text hover:bg-lexum-border transition-colors rounded-l"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
        <span>{copied ? "Copied!" : "Copy Page"}</span>
      </button>
      <div className="w-px h-4 bg-lexum-border"></div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-2 py-1.5 text-lexum-muted hover:text-lexum-text hover:bg-lexum-border transition-colors rounded-r"
        aria-label="More actions"
      >
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-lexum-panel border border-lexum-border rounded shadow-xl z-50 overflow-hidden">
          <div className="py-1">
            <button
              onClick={handleOpenMarkdown}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-mono text-lexum-muted hover:text-lexum-text hover:bg-lexum-border transition-colors"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Open Markdown</span>
            </button>
            <button
              onClick={handleCopy}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-mono text-lexum-muted hover:text-lexum-text hover:bg-lexum-border transition-colors"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? "Copied!" : "Copy page as Markdown"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
