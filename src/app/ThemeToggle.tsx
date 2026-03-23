"use client";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("ved-theme");
    const systemPrefersDark = globalThis.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("ved-theme", newTheme);
  };

  if (!mounted) {
    return (
      <button className="theme-toggle" id="themeToggle" style={{ opacity: 0 }}>
        <span>
          <Sun size={14} />
        </span>
        <span>Light</span>
      </button>
    );
  }

  return (
    <button className="theme-toggle" id="themeToggle" onClick={toggleTheme}>
      <span
        id="themeIcon"
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
      </span>
      <span id="themeText">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
