"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Theme = "dark" | "light";

interface SettingsContextType {
  theme: Theme;
  toggleTheme: () => void;
  isMotionEnabled: boolean;
  toggleMotion: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [isMotionEnabled, setIsMotionEnabled] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    // Check local storage on mount
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }

    const storedMotion = localStorage.getItem("motion");
    if (storedMotion !== null) {
      setIsMotionEnabled(storedMotion === "true");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    // Enforce dark mode on index page regardless of user preference ONLY IF motion is enabled
    if (pathname === "/" && isMotionEnabled) {
      root.dataset.theme = "dark";
    } else {
      root.dataset.theme = theme;
    }
  }, [theme, pathname, isMotionEnabled]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleMotion = () => {
    const newMotionState = !isMotionEnabled;
    setIsMotionEnabled(newMotionState);
    localStorage.setItem("motion", String(newMotionState));
  };

  return (
    <SettingsContext.Provider value={{ theme, toggleTheme, isMotionEnabled, toggleMotion }}>
      {children}
    </SettingsContext.Provider>
  );
}

// Ensure backward compatibility with existing code using useTheme
export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

// Alias useTheme to useSettings for easier refactoring if needed
export function useTheme() {
  return useSettings();
}
