"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

function Character({
  char,
  progress,
  range,
}: Readonly<{
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}>) {
  // We tighten the opacity range slightly so characters "snap" a bit faster into view
  const opacity = useTransform(progress, range, [0.15, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block transition-colors duration-300 ${char === " " ? "w-[0.25em]" : ""}`}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export function ScrollUnmaskText({ text }: Readonly<{ text: string }>) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Create a scroll observer that monitors this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start unmasking when the top hits the bottom 10% of the viewport
    // Finish when the center of the text hits the center of the screen
    offset: ["start 90%", "center center"],
  });

  // Calculate background glow intensity based on scroll progress
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.4]);
  // Calculate pill entrance
  const pillY = useTransform(scrollYProgress, [0, 0.5], [20, 0]);
  const pillOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const words = text.split(" ");
  let globalCharIndex = 0;

  // Pre-calculate total characters to determine scroll ranges
  const totalChars = words.reduce((acc, word) => acc + word.length + 1, 0);

  return (
    <section
      ref={containerRef}
      className="py-32 md:py-48 bg-lexum-bg relative z-10 overflow-hidden border-t border-lexum-border/30"
    >
      {/* Background Glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-lexum-accent/10 blur-[120px] rounded-full pointer-events-none"
      />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>

      <Container className="relative z-10">
        {/* Tagline Pill */}
        <div className="flex justify-center mb-12">
          <motion.div
            style={{ y: pillY, opacity: pillOpacity }}
            className="px-5 py-2 rounded-full border border-lexum-border bg-lexum-panel/50 backdrop-blur-md text-xs font-mono text-lexum-muted tracking-widest uppercase flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-lexum-accent animate-pulse"></span>
            The Lexum Thesis
          </motion.div>
        </div>

        {/* Text Block */}
        <div className="max-w-4xl mx-auto text-center flex flex-wrap justify-center font-bold tracking-tight text-3xl md:text-4xl lg:text-6xl leading-[1.2] text-lexum-text">
          {words.map((word, wordIndex) => {
            return (
              <span
                key={wordIndex}
                className="inline-flex mr-[0.25em] mb-[0.2em]"
              >
                {word.split("").map((char, charIndex) => {
                  const start = globalCharIndex / totalChars;
                  const end = start + 1 / totalChars;
                  globalCharIndex++;

                  return (
                    <Character
                      key={charIndex}
                      char={char}
                      progress={scrollYProgress}
                      range={[start, end]}
                    />
                  );
                })}
              </span>
            );
          })}
        </div>

        <motion.div
          style={{ opacity: pillOpacity }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/lexum-whitepaper.pdf"
            target="_blank"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-sm font-medium transition-all duration-300 bg-transparent border border-lexum-accent text-lexum-accent hover:bg-lexum-accent hover:text-lexum-text rounded hover:scale-105 hover:shadow-[0_0_30px_rgba(255,69,0,0.3)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Read the Whitepaper
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
