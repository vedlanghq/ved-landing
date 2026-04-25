"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/app/ThemeToggle";
import { FaBars } from "react-icons/fa";
import { Home } from "lucide-react";
import VedLogo from "./VedLogo";

export default function Header({ searchSlot }: Readonly<{ searchSlot?: React.ReactNode }>) {
  const pathname = usePathname();
  const isDocsPage = pathname?.startsWith("/docs");

  return (
    <header className="main-header">
      <nav className="main-nav">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {isDocsPage && (
            <button
              className="docs-mobile-header-btn"
              onClick={() => globalThis.dispatchEvent(new CustomEvent("toggleDocsSidebar"))}
              aria-label="Toggle Docs Sidebar"
            >
              <FaBars size={20} />
            </button>
          )}
          <div style={{ width: "20px", minWidth: "20px", height: "40px", overflow: "visible", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}>
              <VedLogo className="logo" fontSize={10} />
            </div>
          </div>
        </div>

        <div className="nav-links">
          {isDocsPage ? (
            <Link
              href="/docs"
              title="Docs Home"
              style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                color: "var(--text-muted)",
                transition: "color 0.2s ease"
              }}
              onMouseOver={e => e.currentTarget.style.color = "var(--accent)"}
              onMouseOut={e => e.currentTarget.style.color = "var(--text-muted)"}
            >
              <Home size={20} />
            </Link>
          ) : (
            <Link
              href="/docs"
              style={{ fontWeight: 600, color: "var(--accent)", textTransform: "uppercase" }}
            >
              Docs
            </Link>
          )}
          {searchSlot && (
            <div className="header-search-slot">
              {searchSlot}
            </div>
          )}
          <div className="theme-toggle-wrapper">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
