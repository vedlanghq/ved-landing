"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchHighlighter() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query");

  useEffect(() => {
    if (!query) return;

    let fadeTimeout: NodeJS.Timeout;

    // A tiny delay ensures MDX content has fully mounted onto the DOM
    const highlightTimeout = setTimeout(() => {
      const container = document.querySelector(".markdown-body");
      if (!container) return;

      const escapedQuery = query.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
      const regex = new RegExp(`(${escapedQuery})`, "gi");

      const walk = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const parent = node.parentNode as HTMLElement;
            if (
              parent &&
              (parent.tagName === "MARK" ||
                parent.tagName === "SCRIPT" ||
                parent.tagName === "STYLE" ||
                parent.classList?.contains("search-highlight"))
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            return regex.test(node.nodeValue || "")
              ? NodeFilter.FILTER_ACCEPT
              : NodeFilter.FILTER_REJECT;
          },
        }
      );

      const nodesToReplace: { node: Node; text: string }[] = [];
      let currentNode;
      while ((currentNode = walk.nextNode())) {
        nodesToReplace.push({ node: currentNode, text: currentNode.nodeValue || "" });
      }

      let firstMatch: HTMLElement | null = null;

      nodesToReplace.forEach(({ node, text }) => {
        const span = document.createElement("span");
        span.innerHTML = text.replace(regex, `<mark class="search-highlight">$1</mark>`);

        if (!firstMatch) {
          const mark = span.querySelector("mark");
          if (mark) firstMatch = mark;
        }

        node.parentNode?.replaceChild(span, node);
      });

      if (firstMatch) {
        (firstMatch as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      
      // Auto-disappear highlight visually after 30 seconds
      fadeTimeout = setTimeout(() => {
        const marks = document.querySelectorAll(".search-highlight");
        marks.forEach(m => m.classList.add("fade-out"));
      }, 30000);
      
    }, 100);

    return () => {
      clearTimeout(highlightTimeout);
      clearTimeout(fadeTimeout);
    };
  }, [query]);

  return null;
}
