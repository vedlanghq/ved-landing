"use client";

import { useEffect, useState } from "react";
import GithubSlugger from "github-slugger";

export function TOC({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    // Process markdown string into headings
    const regex = /^(#{2,3})\s+(.+)$/gm;
    const items = [];
    let match;
    const slugger = new GithubSlugger();

    while ((match = regex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = slugger.slug(text);
      items.push({ id, text, level });
    }
    setHeadings(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting entries
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // You could be more sophisticated (e.g. taking the top-most visible), 
          // but for basic usage grabbing the first is fine.
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0 }
    );

    const elements = document.querySelectorAll("h2, h3");
    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div style={{ position: "relative" }}>
      <h4>On this page</h4>
      <ul style={{ padding: 0, margin: "1rem 0 0 0", listStyle: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={isActive ? "active" : ""}
                style={{
                  display: "block",
                  padding: "0.4rem 0.5rem 0.4rem 1rem",
                  marginLeft: heading.level === 3 ? "1rem" : "0",
                  color: isActive ? "var(--accent)" : "var(--text-muted)",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "0.76rem",
                  textDecoration: "none",
                  borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                  background: isActive ? "var(--bg-surface-hover)" : "transparent",
                  borderRadius: "0 4px 4px 0",
                  transition: "all 0.2s ease-in-out"
                }}
                onMouseOver={(e) => {
                  if (!isActive) e.currentTarget.style.color = "var(--text-main)";
                }}
                onMouseOut={(e) => {
                  if (!isActive) e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
