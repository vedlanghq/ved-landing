"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ORIGINAL_TEXT = String.raw` _     _______  ___    _ __  __ 
| |   |  ___\ \/ / |  | |  \/  |
| |   | |__  \  /| |  | | |\/| |
| |___|  __| /  \| |__| | |  | |
|_____|____|/_/\_\\____/|_|  |_|`;

const GLITCH_CHARS = String.raw`01!<>-_\\/[]{}=+*^?#`.split("");

// 🔹 Trace lines (identity layer)
const TRACE_LINES = [
  "> initializing runtime...",
  "> loading snapshot...",
  "> replaying state...",
  "> applying transitions...",
  "> goals satisfied",
];

const CONDENSED_TRACE_LINES = ["> load", "> sync"];

// -----------------------------
// Seeded RNG (deterministic)
// -----------------------------
function createSeededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

// -----------------------------
// Build deterministic frame
// -----------------------------
function buildFrame(iteration: number, seed: number, targetText: string) {
  const rand = createSeededRandom(seed + iteration);
  let result = "";

  for (let i = 0; i < targetText.length; i++) {
    const char = targetText[i];

    if (char === "\n" || char === " ") {
      result += char;
      continue;
    }

    if (i < iteration) {
      result += char;
    } else {
      const glitchIndex = Math.floor(rand() * GLITCH_CHARS.length);
      result += GLITCH_CHARS[glitchIndex];
    }
  }

  return result;
}

type Mode = "trace" | "logo";

export default function LexumLogo({
  fontSize = 10,
  className = "",
  condensed = false,
}: Readonly<{
  fontSize?: number | string;
  className?: string;
  condensed?: boolean;
}>) {
  const activeText = ORIGINAL_TEXT;
  const activeTraceLines = condensed ? CONDENSED_TRACE_LINES : TRACE_LINES;
  const linesCount = 5;
  const maxWidthCh = 32;
  const [mode, setMode] = useState<Mode>("logo");
  const [text, setText] = useState(activeText);
  const [traceIndex, setTraceIndex] = useState(0);
  const [typedLine, setTypedLine] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // deterministic seed per route
  const seed = pathname
    .split("")
    .reduce((acc: number, c: string) => acc + (c.codePointAt(0) || 0), 0);

  // -----------------------------
  // Cursor blink
  // -----------------------------
  useEffect(() => {
    const blink = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(blink);
  }, []);

  // -----------------------------
  // Logo convergence animation
  // -----------------------------
  const startLogoAnimation = () => {
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    setMode("logo");

    intervalRef.current = setInterval(() => {
      setText(buildFrame(iteration, seed, activeText));

      iteration += Math.ceil(iteration * 0.08 + 2);

      if (iteration >= activeText.length) {
        clearInterval(intervalRef.current!);
        setText(activeText);
      }
    }, 24);
  };

  // -----------------------------
  // Typewriter effect
  // -----------------------------
  const typeLine = (line: string, onComplete: () => void) => {
    let i = 0;
    setTypedLine("");

    const typer = setInterval(() => {
      setTypedLine(line.slice(0, i + 1));
      i++;

      if (i >= line.length) {
        clearInterval(typer);
        setTimeout(onComplete, 250);
      }
    }, 18);
  };

  // -----------------------------
  // Trace playback
  // -----------------------------
  const playTrace = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setMode("trace");
    setTraceIndex(0);

    const playNext = (index: number) => {
      if (index >= activeTraceLines.length) {
        // after trace â†’ show logo
        setTimeout(() => {
          startLogoAnimation();
        }, 300);
        return;
      }

      typeLine(activeTraceLines[index], () => {
        setTraceIndex(index + 1);
        playNext(index + 1);
      });
    };

    playNext(0);
  };

  // run on mount + route change
  useEffect(() => {
    startLogoAnimation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pathname, activeText]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/"
      className={className}
      style={{ textDecoration: "none", display: "inline-block" }}
      aria-label="Lexum - Deterministic Control-Plane Programming Language"
      title="Lexum Homepage"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Screen reader text */}
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
        }}
      >
        Lexum - Deterministic Control-Plane Programming Language
      </span>

      <div
        style={{
          width: `${maxWidthCh}ch`,
          height: `calc(${linesCount} * 1.05em)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
          fontFamily: "'Courier New', Courier, monospace",
        }}
      >
        <pre
          aria-hidden="true"
          onClick={(e) => {
            e.preventDefault();
            playTrace();
          }}
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
            lineHeight: 1.05,
            fontWeight: 800,
            margin: 0,
            padding: "0 0 0.15em 0",
            display: "block",
            background:
              mode === "trace"
                ? "none"
                : "linear-gradient(90deg, var(--text-main) 0%, var(--accent) 100%)",
            backgroundClip: mode === "trace" ? "border-box" : "text",
            WebkitBackgroundClip: mode === "trace" ? "border-box" : "text",
            color: mode === "trace" ? "var(--text-muted)" : "transparent",
            WebkitTextFillColor:
              mode === "trace" ? "var(--text-muted)" : "transparent",
            cursor: "pointer",
            userSelect: "none",
            transition: "color 0.2s ease",
          }}
        >
          {mode === "trace" ? (
            <>
              {activeTraceLines.slice(0, traceIndex).join("\n")}
              {traceIndex < activeTraceLines.length && (
                <>
                  {traceIndex > 0 && "\n"}
                  {typedLine}
                  {cursorVisible ? "_" : " "}
                </>
              )}
            </>
          ) : (
            <>
              {text}
              <span style={{ opacity: isHovered && cursorVisible ? 1 : 0 }}>
                _
              </span>
            </>
          )}
        </pre>
      </div>
    </Link>
  );
}
