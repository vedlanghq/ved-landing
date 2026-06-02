"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { getCategorizedDocs } from "@/lib/docs";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [docCategories, setDocCategories] = useState<{
    categories: Record<string, any[]>;
    sortedCategories: string[];
  } | null>(null);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // If we are in the docs, fetch the categories for the mobile sidebar
  useEffect(() => {
    if (pathname?.startsWith("/docs")) {
      // In a real server component this would be passed down, but since MobileNav is client-only and docs might be static,
      // we can fetch it via an API or just pass it in. Since getCategorizedDocs might not be available in client components
      // if it relies on fs (which it does), we need to fetch it via an API, OR pass the categories from a server component.
    }
  }, [pathname]);

  return (
    <div className="md:hidden flex items-center mr-4">
      <button
        onClick={() => setIsOpen(true)}
        className="text-lexum-text hover:text-lexum-accent transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-lexum-bg/80 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[80vw] max-w-sm bg-lexum-panel border-r border-lexum-border z-50 flex flex-col overflow-y-auto shadow-2xl"
            >
              <div className="p-4 flex items-center justify-between border-b border-lexum-border/50">
                <Link
                  href="/"
                  className="font-mono text-xl font-bold tracking-tighter text-lexum-text"
                  onClick={() => setIsOpen(false)}
                >
                  LEXUM
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-lexum-muted hover:text-lexum-text transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col p-4 gap-6">
                <div className="flex flex-col gap-4">
                  <h4 className="font-mono text-xs tracking-widest text-lexum-muted uppercase">
                    Navigation
                  </h4>
                  <Link
                    href="/docs"
                    className="text-lexum-text hover:text-lexum-accent font-medium"
                  >
                    Documentation
                  </Link>
                  <a
                    href="https://github.com/lexumhq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lexum-text hover:text-lexum-accent font-medium"
                  >
                    GitHub
                  </a>
                </div>

                <div className="flex flex-col gap-4">
                  <h4 className="font-mono text-xs tracking-widest text-lexum-muted uppercase">
                    Core
                  </h4>
                  <Link
                    href="/determinism"
                    className="text-lexum-text hover:text-lexum-accent font-medium"
                  >
                    Determinism
                  </Link>
                  <Link
                    href="/effects"
                    className="text-lexum-text hover:text-lexum-accent font-medium"
                  >
                    Effects
                  </Link>
                  <Link
                    href="/convergence"
                    className="text-lexum-text hover:text-lexum-accent font-medium"
                  >
                    Convergence
                  </Link>
                  <Link
                    href="/journaling"
                    className="text-lexum-text hover:text-lexum-accent font-medium"
                  >
                    Journal
                  </Link>
                </div>

                <div className="flex flex-col gap-4">
                  <h4 className="font-mono text-xs tracking-widest text-lexum-muted uppercase">
                    Tooling
                  </h4>
                  <Link
                    href="/cli"
                    className="text-lexum-text hover:text-lexum-accent font-medium"
                  >
                    CLI & UX
                  </Link>
                  <Link
                    href="/errors"
                    className="text-lexum-text hover:text-lexum-accent font-medium"
                  >
                    Error Taxonomy
                  </Link>
                  <Link
                    href="/warnings"
                    className="text-lexum-text hover:text-lexum-accent font-medium"
                  >
                    Warning System
                  </Link>
                  <Link
                    href="/linting"
                    className="text-lexum-text hover:text-lexum-accent font-medium"
                  >
                    Linting Rules
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
