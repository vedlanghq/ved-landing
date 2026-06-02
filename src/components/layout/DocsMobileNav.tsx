"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface DocEntry {
  title: string;
  slug: string;
}

export function DocsMobileNav({
  categories,
  sortedCategories,
}: Readonly<{
  categories: Record<string, DocEntry[]>;
  sortedCategories: string[];
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const currentSlug = pathname?.split("/").pop();

  return (
    <div className="lg:hidden flex items-center mr-3">
      <button
        onClick={() => setIsOpen(true)}
        className="text-lexum-text hover:text-lexum-accent transition-colors p-1"
        aria-label="Open docs navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-lexum-bg/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              data-lenis-prevent="true"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[80vw] max-w-sm bg-lexum-panel border-r border-lexum-border z-50 flex flex-col overflow-y-auto shadow-2xl"
            >
              {/* Drawer header */}
              <div className="p-4 flex items-center justify-between border-b border-lexum-border/50 sticky top-0 bg-lexum-panel">
                <Link
                  href="/"
                  className="text-3xl font-bold tracking-tighter text-lexum-text hover:text-lexum-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                  style={{ fontFamily: "var(--font-lexum-logo)" }}
                >
                  Lexum
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-lexum-muted hover:text-lexum-text transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sidebar content */}
              <nav className="flex flex-col p-5 gap-8">
                {sortedCategories.map((cat) => (
                  <div key={cat}>
                    <h4 className="font-mono text-[10px] tracking-widest text-lexum-muted uppercase mb-3">
                      {cat}
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {categories[cat].map((doc) => {
                        const isActive = doc.slug === currentSlug;
                        return (
                          <li key={doc.slug}>
                            <Link
                              href={`/docs/${doc.slug}`}
                              onClick={() => setIsOpen(false)}
                              className={`text-sm block py-1 transition-colors border-l-2 pl-3 -ml-0.5 ${
                                isActive
                                  ? "text-lexum-accent font-medium border-lexum-accent"
                                  : "text-lexum-muted hover:text-lexum-text border-transparent"
                              }`}
                            >
                              {doc.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
