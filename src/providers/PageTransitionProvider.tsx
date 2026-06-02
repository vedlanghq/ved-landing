"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSettings } from "@/providers/SettingsProvider";

export function PageTransitionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const { isMotionEnabled } = useSettings();

  // If the user has disabled motion, bypass the transition wrapper entirely
  // to ensure native, rigid routing.
  if (!isMotionEnabled) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex-1 flex flex-col w-full"
    >
      {children}
    </motion.div>
  );
}
