"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DocsSidebarClient({
  categories,
  sortedCategories,
}: Readonly<{
  categories: Record<string, { title: string; slug: string }[]>;
  sortedCategories: string[];
}>) {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();
  const isFirstMount = useRef(true);

  // Preserve scroll state natively without remounting!
  // This layout wrapper stays mounted, so we just let the browser handle scroll organically.
  // We only want to ensure the active link is visible IF it's deeply hidden when first loaded.
  useEffect(() => {
    if (isFirstMount.current) {
      const active = document.getElementById("active-sidebar-link");
      const sidebar = document.getElementById("docs-sidebar");
      if (active && sidebar) {
        const sidebarRect = sidebar.getBoundingClientRect();
        const activeRect = active.getBoundingClientRect();

        if (
          activeRect.top < sidebarRect.top ||
          activeRect.bottom > sidebarRect.bottom
        ) {
          active.scrollIntoView({ block: "nearest" });
        }
      }
      isFirstMount.current = false;
    }
  }, []);

  return (
    <aside
      id="docs-sidebar"
      data-lenis-prevent="true"
      className="hidden lg:block w-64 shrink-0 border-r border-lexum-border pr-6 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto"
    >
      <div className="flex flex-col gap-8 pb-12">
        {sortedCategories.map((cat) => (
          <div key={cat}>
            <h4 className="text-tag text-lexum-muted tracking-widest mb-3 uppercase">
              {cat}
            </h4>
            <ul className="flex flex-col gap-2">
              {categories[cat].map((doc) => {
                const isActive = doc.slug === currentSlug;
                return (
                  <li
                    key={doc.slug}
                    id={isActive ? "active-sidebar-link" : undefined}
                  >
                    <Link
                      href={`/docs/${doc.slug}`}
                      className={`text-sm block transition-colors ${isActive ? "text-lexum-accent font-medium border-l-2 border-lexum-accent pl-3 -ml-3.5" : "text-lexum-muted hover:text-lexum-text border-l-2 border-transparent pl-3 -ml-3.5"}`}
                    >
                      {doc.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
