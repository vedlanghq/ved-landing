"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FaGithub, FaXTwitter, FaDiscord } from "react-icons/fa6";

export function Footer() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    // Avoid hydration mismatch by only setting time on client
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toISOString().split("T")[1].split(".")[0] + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative w-full pb-16 pt-12 mt-12 overflow-hidden flex flex-col items-center">
      {/* Giant Background Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 text-[25vw] font-bold text-lexum-text/[0.02] leading-none select-none pointer-events-none whitespace-nowrap z-0 tracking-tighter"
        style={{ fontFamily: "var(--font-lexum-logo)" }}
      >
        Lexum
      </div>

      <Container className="relative z-10 w-full px-4 sm:px-6 max-w-none">
        {/* Floating Glassmorphic Oval */}
        <div className="mx-auto w-full max-w-7xl bg-lexum-panel/40 backdrop-blur-2xl border border-lexum-border/60 rounded-[3.5rem] p-12 md:p-20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-20">
            {/* Left Column: Brand & Status */}
            <div className="flex flex-col gap-12 max-w-md">
              <div>
                <Link
                  href="/"
                  className="inline-block text-5xl font-bold tracking-tighter text-lexum-text hover:text-lexum-accent transition-colors duration-200"
                  style={{ fontFamily: "var(--font-lexum-logo)" }}
                >
                  Lexum
                </Link>
                <p className="text-base text-lexum-muted mt-6 leading-relaxed">
                  Lexum is the first deterministic infrastructure language and
                  runtime. Zero drift. Infinite replayability. Absolute
                  convergence guarantee.
                </p>
              </div>

              {/* Dynamic System Status Widget */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-lexum-bg/40 border border-lexum-border px-5 py-4 rounded-3xl w-fit backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase font-mono text-lexum-muted tracking-widest leading-tight">
                      System Status
                    </span>
                    <span className="text-sm font-mono text-lexum-text font-bold uppercase tracking-wider">
                      Deterministic
                    </span>
                  </div>
                </div>

                {timeString && (
                  <>
                    <div className="hidden sm:block w-px h-10 bg-lexum-border/50"></div>
                    <div className="font-mono text-sm text-lexum-muted tracking-widest">
                      {timeString}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-12 lg:ml-auto w-full lg:w-auto">
              <div className="col-span-1">
                <h4 className="font-mono text-sm tracking-widest text-lexum-text mb-6 uppercase">
                  Architecture
                </h4>
                <ul className="flex flex-col gap-4 font-mono text-xs tracking-wider text-lexum-muted">
                  <li>
                    <Link
                      href="/determinism"
                      className="hover:text-lexum-accent transition-colors"
                    >
                      Determinism
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/effects"
                      className="hover:text-lexum-accent transition-colors"
                    >
                      Effects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/convergence"
                      className="hover:text-lexum-accent transition-colors"
                    >
                      Convergence
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/journaling"
                      className="hover:text-lexum-accent transition-colors"
                    >
                      Journal
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-1">
                <h4 className="font-mono text-sm tracking-widest text-lexum-text mb-6 uppercase">
                  Diagnostic
                </h4>
                <ul className="flex flex-col gap-4 font-mono text-xs tracking-wider text-lexum-muted">
                  <li>
                    <Link
                      href="/errors"
                      className="hover:text-lexum-accent transition-colors"
                    >
                      Error Taxonomy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/warnings"
                      className="hover:text-lexum-accent transition-colors"
                    >
                      Warning System
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/linting"
                      className="hover:text-lexum-accent transition-colors"
                    >
                      Linting Rules
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-1">
                <h4 className="font-mono text-sm tracking-widest text-lexum-text mb-6 uppercase">
                  Tooling
                </h4>
                <ul className="flex flex-col gap-4 font-mono text-xs tracking-wider text-lexum-muted">
                  <li>
                    <Link
                      href="/cli"
                      className="hover:text-lexum-accent transition-colors"
                    >
                      CLI & UX
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/docs/goal-specification-semantics"
                      className="hover:text-lexum-accent transition-colors"
                    >
                      Specifications
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-1">
                <h4 className="font-mono text-sm tracking-widest text-lexum-text mb-6 uppercase">
                  Resources
                </h4>
                <ul className="flex flex-col gap-4 font-mono text-xs tracking-wider text-lexum-muted">
                  <li>
                    <a
                      href="https://github.com/lexumhq"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-lexum-accent transition-colors"
                    >
                      Community
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/docs"
                      className="hover:text-lexum-accent transition-colors"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="hover:text-lexum-accent transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="hover:text-lexum-accent transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="pt-10 border-t border-lexum-border/50 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="font-mono text-xs tracking-widest uppercase text-lexum-muted text-center sm:text-left">
              © {new Date().getFullYear()} LEXUM FOUNDATION
            </div>

            <div className="flex items-center gap-5">
              <MagneticButton>
                <a
                  href="https://github.com/lexumhq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-lexum-bg/60 border border-lexum-border hover:border-lexum-accent hover:text-lexum-accent text-lexum-muted transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-lexum-bg/60 border border-lexum-border hover:border-lexum-accent hover:text-lexum-accent text-lexum-muted transition-colors"
                  aria-label="Twitter"
                >
                  <FaXTwitter className="w-5 h-5" />
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-lexum-bg/60 border border-lexum-border hover:border-lexum-accent hover:text-lexum-accent text-lexum-muted transition-colors"
                  aria-label="Discord"
                >
                  <FaDiscord className="w-5 h-5" />
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
