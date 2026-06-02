"use client";

import React, { useRef } from "react";

export function MobileTOC({
  headings,
}: Readonly<{ headings: { id: string; title: string; level: number }[] }>) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  if (!headings || headings.length === 0) return null;

  return (
    <div className="block xl:hidden mb-8 sticky top-20 z-40">
      <details
        ref={detailsRef}
        className="bg-lexum-bg border border-lexum-border rounded shadow-lg group relative"
      >
        <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-lexum-text flex items-center justify-between list-none">
          <span>Jump to section</span>
          <svg
            className="w-4 h-4 text-lexum-muted transition-transform group-open:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </summary>
        <div className="absolute top-full left-0 right-0 mt-2 bg-lexum-bg border border-lexum-border rounded shadow-xl max-h-[60vh] overflow-y-auto">
          <nav className="flex flex-col p-2">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={() => {
                  if (detailsRef.current) detailsRef.current.open = false;
                }}
                className={`block px-4 py-2 transition-colors hover:bg-lexum-panel hover:text-lexum-accent text-sm wrap-break-words rounded ${
                  heading.level === 2
                    ? "text-lexum-text font-medium"
                    : "text-lexum-muted ml-4"
                }`}
              >
                {heading.title}
              </a>
            ))}
          </nav>
        </div>
      </details>
    </div>
  );
}
