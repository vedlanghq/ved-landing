"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/app/ThemeToggle";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="main-header">
      <nav className="main-nav">
        <Link href="/" className="logo">
          <span className="logo-dot"></span> Ved
        </Link>
        
        {/* Mobile Hamburger Icon */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link href="/#vision" onClick={() => setIsMenuOpen(false)}>Vision</Link>
          <Link href="/#features" onClick={() => setIsMenuOpen(false)}>Features</Link>
          <Link href="/docs" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: 600, color: 'var(--accent)' }}>Docs</Link>
          <div className="theme-toggle-wrapper">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}