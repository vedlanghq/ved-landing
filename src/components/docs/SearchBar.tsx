"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { DocSearchData } from "@/lib/docs";
import { useRouter } from "next/navigation";

// Define search result type
interface SearchResult {
  item: DocSearchData;
  matches: {
    key: "title" | "category" | "content";
    indices: [number, number][]; // [start, length]
    value: string;
  }[];
  score: number;
}

export function SearchBar({ allDocs }: Readonly<{ allDocs: DocSearchData[] }>) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
  }, [isOpen]);

  // Regex Search Logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      // Create a case-insensitive regex for the query.
      // Escape special characters to prevent regex errors.
      const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
      const regex = new RegExp(safeQuery, "gi");

      const newResults: SearchResult[] = [];

      allDocs.forEach((doc) => {
        let score = 0;
        const matches: SearchResult["matches"] = [];

        const addMatches = (
          text: string,
          key: "title" | "category" | "content",
          weight: number,
        ) => {
          regex.lastIndex = 0; // Reset regex
          const localMatches = [];
          let match;
          while ((match = regex.exec(text)) !== null) {
            localMatches.push([match.index, match[0].length] as [
              number,
              number,
            ]);
            score += weight;
            // Limit content matches to prevent huge payloads
            if (localMatches.length > 3) break;
          }
          if (localMatches.length > 0) {
            matches.push({ key, indices: localMatches, value: text });
          }
        };

        addMatches(doc.title, "title", 10);
        addMatches(doc.category, "category", 5);
        addMatches(doc.content, "content", 1);

        if (score > 0) {
          newResults.push({ item: doc, matches, score });
        }
      });

      // Sort by score descending
      newResults.sort((a, b) => b.score - a.score);
      setResults(newResults.slice(0, 8)); // Top 8 results
    } catch (e) {
      // Fallback if regex fails
      setResults([]);
    }
  }, [query, allDocs]);

  // Highlight helper
  const HighlightText = ({
    text,
    indices,
    isContent = false,
  }: {
    text: string;
    indices: [number, number][];
    isContent?: boolean;
  }) => {
    if (indices.length === 0) return <>{text}</>;

    // For content, extract a snippet around the first match
    let displayText = text;
    let offset = 0;

    if (isContent) {
      const firstMatch = indices[0];
      const start = Math.max(0, firstMatch[0] - 40);
      const end = Math.min(text.length, firstMatch[0] + firstMatch[1] + 40);
      displayText =
        (start > 0 ? "..." : "") +
        text.substring(start, end) +
        (end < text.length ? "..." : "");

      // Adjust indices relative to the snippet
      offset = start;
    }

    const fragments = [];
    let lastIndex = 0;

    indices.forEach(([idx, length], i) => {
      // Adjust idx for content snippet
      const adjustedIdx = isContent ? idx - offset + (offset > 0 ? 3 : 0) : idx;

      if (adjustedIdx >= lastIndex && adjustedIdx < displayText.length) {
        fragments.push(
          displayText.substring(lastIndex, adjustedIdx),
          <span
            key={i}
            className="text-lexum-accent bg-lexum-accent/10 font-bold px-0.5 rounded-sm"
          >
            {displayText.substring(adjustedIdx, adjustedIdx + length)}
          </span>,
        );
        lastIndex = adjustedIdx + length;
      }
    });
    fragments.push(displayText.substring(lastIndex));

    return <>{fragments}</>;
  };

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between w-full px-3 py-1.5 rounded-md border border-lexum-border bg-lexum-bg/80 hover:bg-lexum-panel transition-colors text-xs text-lexum-muted group"
        aria-label="Search documentation"
      >
        <Search className="w-4 h-4 group-hover:text-lexum-text transition-colors" />
        <span className="hidden sm:inline-block">Search documentation...</span>
        <span className="hidden sm:inline-block ml-4 text-xs font-mono bg-lexum-panel border border-lexum-border px-1.5 py-0.5 rounded">
          ⌘K
        </span>
      </button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-100 flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-lexum-bg/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-lexum-bg border border-lexum-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              {/* Search Input Area */}
              <div className="flex items-center px-4 border-b border-lexum-border/50">
                <Search className="w-5 h-5 text-lexum-muted shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search docs, features, setup..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none text-lexum-text px-4 py-5 outline-none font-sans text-base sm:text-lg placeholder:text-lexum-muted/50"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-lexum-muted hover:text-lexum-text rounded-md hover:bg-lexum-panel transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results Area */}
              <div className="flex-1 overflow-y-auto overscroll-contain pb-4">
                {query.trim() && results.length === 0 && (
                  <div className="py-14 text-center text-lexum-muted">
                    No results found for &quot;{query}&quot;
                  </div>
                )}

                {results.length > 0 && (
                  <div className="pt-2 px-2 flex flex-col gap-1">
                    <div className="px-3 py-2 text-xs font-mono text-lexum-muted uppercase tracking-widest">
                      Documentation
                    </div>
                    {results.map(({ item, matches }, idx) => {
                      const titleMatch = matches.find((m) => m.key === "title");
                      const categoryMatch = matches.find(
                        (m) => m.key === "category",
                      );
                      const contentMatch = matches.find(
                        (m) => m.key === "content",
                      );

                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            router.push(`/docs/${item.slug}`);
                            setIsOpen(false);
                          }}
                          className="group flex flex-col text-left px-4 py-3 rounded-lg hover:bg-lexum-panel border border-transparent hover:border-lexum-border/50 transition-all"
                        >
                          <div className="flex items-center justify-between w-full mb-1">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-lexum-muted group-hover:text-lexum-accent transition-colors" />
                              <span className="text-lexum-text font-medium text-[15px]">
                                {titleMatch ? (
                                  <HighlightText
                                    text={item.title}
                                    indices={titleMatch.indices}
                                  />
                                ) : (
                                  item.title
                                )}
                              </span>
                            </div>
                            <span className="text-xs font-mono bg-lexum-panel group-hover:bg-lexum-bg px-2 py-0.5 rounded text-lexum-muted transition-colors">
                              {categoryMatch ? (
                                <HighlightText
                                  text={item.category}
                                  indices={categoryMatch.indices}
                                />
                              ) : (
                                item.category
                              )}
                            </span>
                          </div>

                          {/* Snippet */}
                          {contentMatch && (
                            <div className="text-sm text-lexum-muted line-clamp-1 pl-6">
                              <HighlightText
                                text={contentMatch.value}
                                indices={contentMatch.indices}
                                isContent={true}
                              />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {!query.trim() && (
                  <div className="py-12 flex flex-col items-center justify-center text-lexum-muted/70 gap-3">
                    <Search className="w-8 h-8 opacity-20" />
                    <p className="text-sm font-mono tracking-wider">
                      Start typing to search...
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-lexum-border/50 bg-lexum-panel/30 flex items-center justify-between text-xs text-lexum-muted sm:flex">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <kbd className="bg-lexum-panel border border-lexum-border px-1.5 py-0.5 rounded">
                      ↑
                    </kbd>{" "}
                    <kbd className="bg-lexum-panel border border-lexum-border px-1.5 py-0.5 rounded">
                      ↓
                    </kbd>{" "}
                    to navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="bg-lexum-panel border border-lexum-border px-1.5 py-0.5 rounded">
                      ↵
                    </kbd>{" "}
                    to select
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="bg-lexum-panel border border-lexum-border px-1.5 py-0.5 rounded">
                    esc
                  </kbd>{" "}
                  to close
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
