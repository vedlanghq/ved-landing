"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useSettings } from "@/providers/SettingsProvider";

export function SmoothScrollProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isMotionEnabled } = useSettings();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // If motion is disabled via Site Settings, we kill Lenis entirely
    // and rely on native rigid browser scrolling.
    if (!isMotionEnabled) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isMotionEnabled]);

  return <>{children}</>;
}
