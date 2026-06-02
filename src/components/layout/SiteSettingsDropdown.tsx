"use client";

import React, { useState, useRef, useEffect } from "react";
import { Settings, X } from "lucide-react";
import { useSettings } from "@/providers/SettingsProvider";
import { motion } from "framer-motion";

export function SiteSettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { isMotionEnabled, toggleMotion, theme, toggleTheme } = useSettings();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-10 h-10 text-lexum-muted hover:text-lexum-text transition-colors rounded-full focus:outline-none focus:ring-1 focus:ring-lexum-border group"
        aria-label="Site Settings"
      >
        <Settings className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:rotate-45" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-lexum-panel border border-lexum-border rounded-2xl shadow-2xl p-5 z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lexum-text tracking-tight text-[15px]">Site Settings</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-lexum-muted hover:text-lexum-text transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="h-px bg-lexum-border w-full mb-5"></div>

          <div className="flex flex-col gap-5">
            {/* Motion Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-lexum-muted">
                Motion: <span className="text-lexum-text">{isMotionEnabled ? "On" : "Off"}</span>
              </span>
              <button
                onClick={toggleMotion}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none border-2 border-transparent ${
                  isMotionEnabled ? "bg-lexum-text" : "bg-lexum-bg border border-lexum-border"
                }`}
                aria-label="Toggle Motion"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-lexum-bg transition-transform shadow-sm ${
                    isMotionEnabled ? "translate-x-5" : "translate-x-1 bg-lexum-muted"
                  }`}
                />
              </button>
            </div>

            {/* Theme Toggle (Only visible if Motion is OFF) */}
            {!isMotionEnabled && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-lexum-muted">
                  Theme: <span className="text-lexum-text capitalize">{theme}</span>
                </span>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none border-2 border-transparent ${
                    theme === "dark" ? "bg-lexum-text" : "bg-lexum-bg border border-lexum-border"
                  }`}
                  aria-label="Toggle Theme"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-lexum-bg transition-transform shadow-sm ${
                      theme === "dark" ? "translate-x-5" : "translate-x-1 bg-lexum-muted"
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
