"use client";

import { useEffect, useState } from "react";

export default function TOC({ content }: Readonly<{ content: string }>) {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);

  useEffect(() => {
    // Extract markdown headings (## and ###)
    const matches = content.match(/^#{2,3}\s+(.+)$/gm);
    if (!matches) return;

    const parsedHeadings = matches.map((match) => {
      const level = new RegExp(/^#+/).exec(match)?.[0].length || 2;
      const text = match.replace(/^#+\s+/, "");
      // Simple slugify matching github-slugger used by rehype-slug
      const id = text
        .toLowerCase()
        .replaceAll(/[^a-z0-9 -]/g, "")
        .replaceAll(/\s+/g, "-")
        .replaceAll(/-+/g, "-");

      return { id, text, level };
    });

    setHeadings(parsedHeadings);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <>
      <h4>On this page</h4>
      <ul>
        {headings.map((heading, index) => (
          <li
            key={`${heading.id}-${index}`}
            style={{ marginLeft: heading.level === 3 ? "1rem" : "0" }}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
