"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type Tab = {
  title: string;
  value: string;
  content?: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
};

export const AnimatedTabs = ({
  tabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: TabsProps) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hovering, setHovering] = useState(false);

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
  };

  const reorderedTabs = [
    tabs[activeIdx],
    ...tabs.filter((_, i) => i !== activeIdx),
  ];

  return (
    <div className="perspective-[1000px] relative flex flex-col w-full items-start justify-start">
      <div
        className={cn(
          "flex flex-row items-center justify-start relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName,
        )}
      >
        {tabs.map((tab, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={tab.value}
              onClick={() => handleSelect(idx)}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={cn("relative px-4 py-2 rounded-full", tabClassName)}
              style={{ transformStyle: "preserve-3d" }}
            >
              {isActive && (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className={cn(
                    "absolute inset-0 bg-lexum-text rounded-full",
                    activeTabClassName,
                  )}
                />
              )}
              <span
                className={cn(
                  "relative block text-xs tracking-widest font-bold uppercase transition-colors px-1",
                  isActive
                    ? "text-lexum-bg"
                    : "text-lexum-muted hover:text-lexum-text",
                )}
              >
                {tab.title}
              </span>
            </button>
          );
        })}
      </div>
      <FadeInStack
        tabs={reorderedTabs}
        hovering={hovering}
        className={cn("mt-10", contentClassName)}
      />
    </div>
  );
};

type FadeInStackProps = {
  className?: string;
  tabs: Tab[];
  hovering?: boolean;
};

const FadeInStack = ({ className, tabs, hovering }: FadeInStackProps) => {
  return (
    <div className="relative w-full h-200 sm:h-150 md:h-100 lg:h-105">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.05,
            top: hovering ? idx * -15 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: idx === 0 ? [0, 40, 0] : 0,
          }}
          className={cn(
            "w-full h-full overflow-y-auto absolute top-0 left-0",
            className,
          )}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
