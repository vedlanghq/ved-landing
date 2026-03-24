"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function DocsSidebar({
  docs,
}: Readonly<{ docs: { slug: string; meta?: any }[] }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const pathname = usePathname();

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Group by category
  const groupedDocs: Record<string, typeof docs> = {};
  let activeCategory = "";

  docs.forEach((doc) => {
    const rawCategory = doc.meta?.category || "Overview";
    // Remove leading numbers, e.g. "1. Introduction" -> "Introduction"
    const category = rawCategory.replace(/^\d+\.\s*/, "");
    
    if (!groupedDocs[category]) groupedDocs[category] = [];
    groupedDocs[category].push(doc);

    if (pathname === `/docs/${doc.slug}`) {
      activeCategory = category;
    }
  });

  // Auto-expand active category on initial load or path change
  useEffect(() => {
    if (activeCategory) {
      setExpandedCategories((prev) => ({
        ...prev,
        [activeCategory]: true,
      }));
    }
  }, [activeCategory]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <>
      <button className="docs-mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
        Menu
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M4 12h16M4 6h16M4 18h16" />
          )}
        </svg>
      </button>

      <aside className={`docs-sidebar ${isOpen ? "open" : ""}`}>
        <div
          className="docs-sidebar-inner"
          style={{
            position: "sticky",
            top: "73px",
            height: "calc(100vh - 73px)",
            overflowY: "auto",
            padding: "2rem 2rem",
          }}
        >
          <nav className="docs-nav">
            {Object.entries(groupedDocs).map(([category, categoryDocs]) => {
              const isExpanded = expandedCategories[category];

              return (
                <div
                  key={category}
                  style={{
                    borderBottom: "1px solid var(--border)",
                    padding: "1rem 0",
                  }}
                >
                  <button
                    onClick={() => toggleCategory(category)}
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
                  >
                    <span>{category}</span>
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </motion.svg>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.2rem",
                            marginLeft: "0.5rem", // Slightly inset tree
                            marginTop: "0.5rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {categoryDocs.map((doc, index) => {
                            const isActive = pathname === `/docs/${doc.slug}`;
                            const formattedTitle =
                              doc.meta?.title ||
                              doc.slug
                                .split("-")
                                .map(
                                  (word: string) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1),
                                )
                                .join(" ");
                            const isLast = index === categoryDocs.length - 1;

                            return (
                              <div
                                key={doc.slug}
                                style={{ position: "relative" }}
                              >
                                {/* Curved Branch (Top half trunk + right turn) */}
                                <div
                                  style={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    height: "50%",
                                    width: "1rem",
                                    borderLeft: "2px solid var(--border)",
                                    borderBottom: "2px solid var(--border)",
                                    borderBottomLeftRadius: "8px",
                                    zIndex: 1,
                                  }}
                                />

                                {/* Lower half of the trunk (continues to next item if not last) */}
                                {!isLast && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      left: 0,
                                      top: "50%",
                                      bottom: 0, // extends to the bottom of this item's relative container
                                      borderLeft: "2px solid var(--border)",
                                      zIndex: 1,
                                    }}
                                  />
                                )}

                                <Link
                                  href={`/docs/${doc.slug}`}
                                  style={{
                                    display: "block",
                                    position: "relative",
                                    zIndex: 2,
                                    width: "calc(100% - 1.5rem)",
                                    marginLeft: "1.5rem", // Space for the curved line
                                    padding: "0.5rem 0.75rem", // Enlargened tree structure
                                    fontSize: "0.95rem", // Enlargened font size
                                    borderRadius: "8px",
                                    color: isActive
                                      ? "var(--accent)"
                                      : "var(--text-muted)",
                                    background: isActive
                                      ? "var(--accent-alpha, rgba(var(--accent-rgb), 0.1))"
                                      : "transparent",
                                    fontWeight: isActive ? 600 : 500,
                                    fontFamily:
                                      "var(--font-sans, system-ui, sans-serif)",
                                    transition: "all 0.2s",
                                  }}
                                  onMouseOver={(e) => {
                                    if (!isActive) {
                                      e.currentTarget.style.color =
                                        "var(--text-main)";
                                      e.currentTarget.style.background =
                                        "var(--bg-surface-hover)";
                                    }
                                  }}
                                  onMouseOut={(e) => {
                                    if (!isActive) {
                                      e.currentTarget.style.color =
                                        "var(--text-muted)";
                                      e.currentTarget.style.background =
                                        "transparent";
                                    }
                                  }}
                                >
                                  {/* Active Dot Marker */}
                                  {isActive && (
                                    <div
                                      style={{
                                        position: "absolute",
                                        left: "-0.5rem", // Position closer to the end of the branch
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "50%",
                                        background: "var(--accent)",
                                        boxShadow: "0 0 0 3px var(--bg-surface)",
                                      }}
                                    />
                                  )}
                                  {formattedTitle}
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
