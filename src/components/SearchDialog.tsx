"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronRight, FileText } from "lucide-react";

export default function SearchDialog({ docs = [] }: Readonly<{ docs: any[] }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, []);

  const stripMarkdown = (text: string) => {
    if (!text) return "";
    return text
      .replaceAll(/^(-\s*?|\*\s*?|_\s*?){3,}\s*$/gm, "") // rules
      .replaceAll(/[<>]/g, "") // html-significant chars
      .replaceAll(/^[=-]{2,}\s*$/gm, "") // setext
      .replaceAll(/^#+\s+/gm, "") // atx headers
      .replaceAll(/(\*\*|__)(.*?)\1/g, "$2") // bold
      .replaceAll(/(\*|)(.*?)\1/g, "$2") // italic
      .replaceAll(/~~(.*?)~~/g, "$1") // strikethrough
      .replaceAll(/`([^`]+)`/g, "$1") // inline code
      .replaceAll(/```[\s\S]*?```/g, "") // code blocks
      .replaceAll(/^\s*>+\s+/gm, "") // blockquotes
      .replaceAll(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
      .replaceAll(/!\[([^\]]*)\]\([^)]+\)/g, "$1") // images
      .replaceAll(/\n+/g, " ") // newlines
      .replaceAll(/\s+/g, " ") // spaces
      .trim();
  };

  const searchResults = docs
    .map((doc) => {
      if (!searchQuery.trim()) return { doc, snippet: null, matches: true };
      try {
        const escapedQuery = searchQuery.trim().replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
        const regex = new RegExp(`(${escapedQuery})`, "gi");

        const titleMatch = regex.test(doc.meta?.title || "");
        const slugMatch = regex.test(doc.slug || "");
        const catMatch = regex.test(doc.meta?.category || "");

        // Execute on clean content to get pristine snippet
        const content = stripMarkdown(doc.content || "");
        regex.lastIndex = 0; // reset
        const match = regex.exec(content);

        // If matched by metadata but not content, fallback
        if (titleMatch || slugMatch || catMatch || match) {
          let snippet = doc.meta?.description ? stripMarkdown(doc.meta.description) : null;
          if (match) {
            const index = match.index;
            const start = Math.max(0, index - 40);
            const end = Math.min(content.length, index + match[0].length + 40);
            snippet = content.slice(start, end);
            if (start > 0) snippet = "..." + snippet;
            if (end < content.length) snippet = snippet + "...";
          }
          return { doc, snippet, matches: true };
        }
        return { doc, snippet: null, matches: false };
      } catch (e) {
        const normalizedQuery = searchQuery.toLowerCase();
        const title = doc.meta?.title?.toLowerCase() || "";
        const fallbackMatch = title.includes(normalizedQuery) || (doc.slug || "").toLowerCase().includes(normalizedQuery);
        return { doc, snippet: null, matches: fallbackMatch };
      }
    })
    .filter((res) => res.matches);

  const highlightSnippet = (text: string) => {
    if (!searchQuery.trim()) return text;
    try {
      const escapedQuery = searchQuery.trim().replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
      const regex = new RegExp(`(${escapedQuery})`, "gi");
      const parts = text.split(regex);
      return parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="search-highlight">
            {part}
          </mark>
        ) : (
          part
        )
      );
    } catch {
      return text;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="search-button"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "var(--shape-1)",
          border: "1px solid var(--border)",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          color: "var(--text-muted)",
          cursor: "pointer",
          fontSize: "0.9rem",
          transition: "all 0.2s ease"
        }}
        onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent)"}
        onFocus={e => e.currentTarget.style.borderColor = "var(--accent)"}
        onMouseOut={e => e.currentTarget.style.borderColor = "var(--border)"}
        onBlur={e => e.currentTarget.style.borderColor = "var(--border)"}
      >
        <Search size={16} />
        <span className="mobile-hide">Search Documentation</span>
        <kbd
          className="mobile-hide"
          style={{
            background: "var(--bg-base)",
            padding: "0.1rem 0.4rem",
            borderRadius: "4px",
            fontSize: "0.8rem",
            marginLeft: "1rem",
            border: "1px solid var(--border)"
          }}
        >
          ⌘K
        </kbd>
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: "12vh",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            border: "none",
            background: "none",
            padding: "0",
            cursor: "default"
          }}
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          aria-label="Close search dialog"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "650px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "1.25rem",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                background: "var(--bg-base)"
              }}
            >
              <Search size={22} color="var(--accent)" />
              <input
                autoFocus
                type="text"
                placeholder="Search commands, syntax, and concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--text-main)",
                  fontSize: "1.1rem",
                  fontFamily: "inherit"
                }}
              />
              <kbd
                className="mobile-hide"
                style={{
                  background: "var(--bg-surface)",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                  fontFamily: "'JetBrains Mono', monospace"
                }}
              >
                ESC
              </kbd>
            </div>

            <div
              style={{ maxHeight: "50vh", overflowY: "auto", padding: "1rem" }}
            >
              {searchResults.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginBottom: "0.75rem",
                      letterSpacing: "0.1em",
                      fontWeight: 600,
                      paddingLeft: "0.5rem"
                    }}
                  >
                    Documentation
                  </div>
                  {searchResults.map(({ doc, snippet }) => (
                    <button
                      key={doc.slug}
                      onClick={() => {
                        const q = searchQuery.trim() ? `?query=${encodeURIComponent(searchQuery.trim())}` : "";
                        router.push(`/docs/${doc.slug}${q}`);
                        setIsOpen(false);
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        padding: "1rem",
                        background: "transparent",
                        border: "1px solid transparent",
                        borderRadius: "6px",
                        cursor: "pointer",
                        textAlign: "left",
                        color: "var(--text-main)",
                        transition: "all 0.15s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent)";
                        e.currentTarget.style.background = "var(--shape-1)";
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent)";
                        e.currentTarget.style.background = "var(--shape-1)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.background = "transparent";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <FileText size={16} color="var(--text-muted)" />
                          <span style={{ fontWeight: 600, fontSize: "1rem", color: "var(--accent)" }}>
                            {highlightSnippet(doc.meta?.title || doc.slug)}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                          <span style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>{doc.meta?.category || "Index"}</span>
                          <ChevronRight size={14} />
                        </div>
                      </div>

                      {snippet && (
                        <div 
                           style={{ 
                             fontSize: "0.85rem", 
                             color: "var(--text-muted)", 
                             lineHeight: 1.5,
                             fontFamily: "'JetBrains Mono', monospace",
                             opacity: 0.9,
                             paddingLeft: "1.5rem"
                           }}
                        >
                          {highlightSnippet(snippet)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    padding: "3rem",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem"
                  }}
                >
                  <Search size={32} color="var(--border)" />
                  <div style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                    No results found for <span style={{ color: "var(--text-main)", fontWeight: 600 }}>&quot;{searchQuery}&quot;</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
