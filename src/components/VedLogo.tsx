"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ORIGINAL_TEXT = String.raw`
__     _______ ____  
\ \   / / ____|  _ \ 
 \ \ / /|  _| | | | |
  \ V / | |___| |_| |
   \_/  |_____|____/ `;

const GLITCH_CHARS = String.raw`01!<>-_\\/[]{}—=+*^?#`;

function buildGlitchedText(currentText: string, iteration: number) {
  let result = "";

  for (let index = 0; index < currentText.length; index++) {
    const char = currentText[index];

    // Keep newlines and spaces intact to preserve ASCII shape
    if (char === "\n" || char === " ") {
      result += char;
      continue;
    }

    if (index < iteration) {
      result += ORIGINAL_TEXT[index];
      continue;
    }

    result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  }

  return result;
}

export default function VedLogo({ fontSize = 10, className = "" }: Readonly<{ fontSize?: number | string, className?: string }>) {
  const [text, setText] = useState(ORIGINAL_TEXT);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const startGlitch = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setText((prev) => buildGlitchedText(prev, iteration));

      iteration += 3;
      if (iteration >= ORIGINAL_TEXT.length) {
        clearInterval(intervalRef.current!);
        setText(ORIGINAL_TEXT);
      }
    }, 20); // FAST Matrix scramble
  };

  // Run glitch only once on mount, and whenever the path changes
  useEffect(() => {
    startGlitch();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pathname]);

  return (
    <Link 
      href="/" 
      className={className} 
      style={{ textDecoration: "none", display: "inline-block" }}
      aria-label="Ved - Deterministic Control-Plane Programming Language"
      title="Ved Homepage"
    >
      {/* 1. SEO & SCREEN READER TEXT */}
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: "0",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: "0",
        }}
      >
        Ved - Deterministic Control-Plane Programming Language
      </span>

      {/* 2. VISUAL ASCII LOGO */}
      <pre
        aria-hidden="true"
        onMouseEnter={startGlitch}
        style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
          lineHeight: 1.05,
          fontWeight: 800,
          margin: 0,
          padding: "0 0 0.15em 0", // Prevents the bottom underscore/slash descenders from clipping
          display: "block",
          background: "linear-gradient(90deg, var(--text-main) 0%, var(--accent) 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
          cursor: "pointer",
        }}
      >
        {text}
      </pre>
    </Link>
  );
}
