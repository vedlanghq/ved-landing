"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SearchBar } from "@/components/docs/SearchBar";
import { SiteSettingsDropdown } from "@/components/layout/SiteSettingsDropdown";
import { DocsMobileNav } from "@/components/layout/DocsMobileNav";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import type { DocSearchData } from "@/lib/docs";

interface DocCategory {
  title: string;
  slug: string;
}

export function Header({
  allDocs,
  categories,
  sortedCategories,
}: {
  allDocs?: DocSearchData[];
  categories?: Record<string, DocCategory[]>;
  sortedCategories?: string[];
} = {}) {
  const isDocsContext = !!categories && !!sortedCategories;
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-lexum-border bg-lexum-bg bg-opacity-90 backdrop-blur-none transition-colors">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <div className="flex items-center">
            {isDocsContext && categories && sortedCategories && (
              <DocsMobileNav
                categories={categories}
                sortedCategories={sortedCategories}
              />
            )}
            <Link
              href="/"
              className="text-2xl font-bold tracking-tighter text-lexum-text hover:text-lexum-accent transition-colors duration-200 shrink-0"
              style={{ fontFamily: "var(--font-lexum-logo)" }}
            >
              Lexum
            </Link>
          </div>

          <div className="flex items-center gap-6 ml-auto">
            <nav className="flex gap-6 text-sm font-mono text-lexum-muted items-center">
              <Link
                href="/docs"
                className="hover:text-lexum-text transition-colors duration-200"
                aria-label="Docs"
              >
                {isLandingPage ? "Docs" : <Home className="w-4 h-4" />}
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <SiteSettingsDropdown />
              {allDocs && allDocs.length > 0 && (
                <div className="shrink-0 w-auto sm:w-64">
                  <SearchBar allDocs={allDocs} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
