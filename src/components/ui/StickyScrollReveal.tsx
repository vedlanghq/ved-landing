"use client";

import React, { useRef, useState } from "react";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "framer-motion";

export const StickyScrollReveal = ({
  content,
  contentClassName,
}: {
  content: {
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Determine the closest card based on scroll progress
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div className="relative w-full">
      {/* Mobile view (Stacked) */}
      <div className="md:hidden flex flex-col gap-16 py-12">
        {content.map((item, index) => (
          <div key={index} className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-lexum-text mb-4 border-b border-lexum-border pb-2">
                {item.title}
              </h2>
              <div className="text-lexum-muted leading-relaxed">
                {item.description}
              </div>
            </div>
            {item.content && <div className="flex">{item.content}</div>}
          </div>
        ))}
      </div>

      {/* Desktop view (Sticky Scroll) */}
      <div
        ref={ref}
        className="hidden md:flex justify-between relative space-x-12 w-full pt-12 pb-0"
      >
        <div className="relative flex items-start w-[45%] lg:w-[40%]">
          <div className="w-full pb-12">
            {content.map((item, index) => (
              <div
                key={index}
                className="min-h-[80vh] flex flex-col justify-center transition-opacity duration-500"
              >
                <motion.h2
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-3xl font-bold tracking-tight text-lexum-text mb-6 border-b border-lexum-border pb-2"
                >
                  {item.title}
                </motion.h2>
                <motion.div
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-lg leading-relaxed text-lexum-muted"
                >
                  {item.description}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Pinned Right Column */}
        <div
          className={`sticky top-0 h-screen w-[50%] lg:w-[55%] flex flex-col items-center justify-center ${contentClassName || ""}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center justify-center"
            >
              {content[activeCard].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
