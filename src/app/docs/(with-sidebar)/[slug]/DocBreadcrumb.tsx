import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function DocBreadcrumb({ title }: Readonly<{ title: string }>) {
  return (
    <nav
      className="flex items-center text-xs font-mono text-lexum-muted"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2 w-full">
        <li>
          <Link
            href="/docs"
            className="hover:text-lexum-accent transition-colors flex items-center gap-1"
          >
            <Home className="w-3 h-3" />
            <span>Docs</span>
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="w-3 h-3 mx-1 shrink-0" />
            <span className="text-lexum-muted truncate" aria-current="page">
              {title}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
}
