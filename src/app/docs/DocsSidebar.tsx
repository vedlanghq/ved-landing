"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DocsSidebar({ docs }: { docs: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button 
        className="docs-mobile-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close Menu" : "Documentation Menu"}
        <svg 
          style={{ width: "1rem", height: "1rem", transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <aside className={`docs-sidebar ${isOpen ? "open" : ""}`}>
        <h3>Documentation</h3>
        <nav className="docs-nav">
          {docs.map((doc) => {
            const isActive = pathname === `/docs/${doc.slug}` || (pathname === '/docs' && doc.meta?.order === 1); // fallback active logic
            const formattedTitle = doc.meta?.title || doc.slug.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            return (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className={`docs-nav-link ${isActive ? "active" : ""}`}
              >
                {formattedTitle}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
