import React from "react";

export function Card({
  children,
  className = "",
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div
      className={`border border-lexum-border bg-lexum-panel p-6 rounded-xs transition-colors duration-200 hover:border-lexum-muted ${className}`}
    >
      {children}
    </div>
  );
}
