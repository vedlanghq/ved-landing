"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSettings } from "@/providers/SettingsProvider";

export function MagneticButton({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { isMotionEnabled } = useSettings();

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMotionEnabled) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Move the button a fraction of the distance to the cursor (e.g. 20%)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={isMotionEnabled ? { x, y } : { x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
