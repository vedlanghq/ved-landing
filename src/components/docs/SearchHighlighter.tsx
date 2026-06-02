"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function SearchHighlighterInner() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("highlight");

  useEffect(() => {
    if (!query) return;

    const container = document.querySelector(".prose-lexum");
    if (!container) return;

    const walk = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
    let node;
    const nodesToReplace = [];
    
    // Safe regex for the query
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");

    while ((node = walk.nextNode())) {
      const parentTag = node.parentElement?.tagName;
      if (parentTag === 'MARK' || parentTag === 'CODE' || parentTag === 'SCRIPT' || parentTag === 'STYLE') continue;
      
      if (node.nodeValue && regex.test(node.nodeValue)) {
        nodesToReplace.push(node);
      }
    }

    nodesToReplace.forEach(node => {
      const fragment = document.createDocumentFragment();
      // We must use string.match() or careful splitting to preserve case correctly while replacing
      const parts = node.nodeValue!.split(regex);
      
      parts.forEach(part => {
        if (regex.test(part)) {
          const mark = document.createElement("mark");
          mark.className = "bg-lexum-accent/50 text-lexum-text font-bold rounded px-0.5 transition-colors duration-1000 search-highlight-mark";
          mark.textContent = part;
          fragment.appendChild(mark);
        } else if (part) {
          fragment.appendChild(document.createTextNode(part));
        }
      });
      node.parentNode?.replaceChild(fragment, node);
    });

    // Scroll to the first match
    const firstMark = document.querySelector(".search-highlight-mark");
    if (firstMark) {
      firstMark.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Fade out highlights after 5 seconds
    const timer = setTimeout(() => {
      document.querySelectorAll(".search-highlight-mark").forEach(mark => {
        mark.classList.remove("bg-lexum-accent/50");
        mark.classList.add("bg-transparent");
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [query]);

  return null;
}

export function SearchHighlighter() {
  return (
    <Suspense fallback={null}>
      <SearchHighlighterInner />
    </Suspense>
  );
}
