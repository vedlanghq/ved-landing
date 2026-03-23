"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchDialog({ docs = [] }: { docs: any[] }) {
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
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredDocs = docs.filter((doc) => {
    if (!searchQuery.trim()) return true;
    try {
      // Setup placeholders for future toggle features
      const isMatchCase = false;
      const isWholeWord = false;

      // Escape special characters in query to prevent regex errors
      const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regexPattern = isWholeWord ? `\\b${escapedQuery}\\b` : escapedQuery;
      const regexFlags = isMatchCase ? "" : "i";

      const searchRegex = new RegExp(regexPattern, regexFlags);

      const title = doc.meta?.title || "";
      const slug = doc.slug || "";
      const category = doc.meta?.category || "";
      const description = doc.meta?.description || "";

      return (
        searchRegex.test(title) ||
        searchRegex.test(slug) ||
        searchRegex.test(category) ||
        searchRegex.test(description)
      );
    } catch (e) {
      // Fallback
      const normalizedQuery = searchQuery.toLowerCase();
      return (
        (doc.meta?.title || "").toLowerCase().includes(normalizedQuery) ||
        (doc.slug || "").toLowerCase().includes(normalizedQuery)
      );
    }
  });

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
        }}
      >
        <Search size={16} />
        <span>Search Documentation</span>
        <kbd
          style={{
            background: "var(--bg-base)",
            padding: "0.1rem 0.4rem",
            borderRadius: "4px",
            fontSize: "0.8rem",
            marginLeft: "1rem",
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
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: "10vh",
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg-base)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "600px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "1rem",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Search size={20} color="var(--text-muted)" />
              <input
                autoFocus
                type="text"
                placeholder="Find something..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--text-main)",
                  fontSize: "1.1rem",
                }}
              />
              <kbd
                style={{
                  background: "var(--shape-1)",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                ESC
              </kbd>
            </div>

            <div
              style={{ maxHeight: "400px", overflowY: "auto", padding: "1rem" }}
            >
              {filteredDocs.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Results
                  </div>
                  {filteredDocs.map((doc) => (
                    <button
                      key={doc.slug}
                      onClick={() => {
                        router.push(`/docs/${doc.slug}`);
                        setIsOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1rem",
                        background: "var(--shape-1)",
                        border: "1px solid transparent",
                        borderRadius: "6px",
                        cursor: "pointer",
                        textAlign: "left",
                        color: "var(--text-main)",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) => (
                        (e.currentTarget.style.borderColor = "var(--accent)"),
                        (e.currentTarget.style.background =
                          "var(--bg-surface-hover)")
                      )}
                      onMouseOut={(e) => (
                        (e.currentTarget.style.borderColor = "transparent"),
                        (e.currentTarget.style.background = "var(--shape-1)")
                      )}
                    >
                      <span style={{ fontWeight: 500 }}>
                        {doc.meta?.title || doc.slug}
                      </span>
                      <span
                        style={{
                          color: "var(--text-muted)",
                          fontSize: "0.8rem",
                        }}
                      >
                        Documentation
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    padding: "2rem",
                    textAlign: "center",
                    color: "var(--text-muted)",
                  }}
                >
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
