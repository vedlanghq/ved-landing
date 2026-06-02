import { unified } from "unified";
import remarkParse from "remark-parse";
import { toString } from "mdast-util-to-string";

export interface Heading {
  id: string;
  level: number;
  title: string;
}

// Generate URL-friendly slug from text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replaceAll(/[^\w\s-]/g, "")
    .replaceAll(/\s+/g, "-")
    .replaceAll(/-+/g, "-");
}

export function extractHeadings(markdown: string): Heading[] {
  const processor = unified().use(remarkParse);
  const ast = processor.parse(markdown);

  const headings: Heading[] = [];
  const usedIds = new Set<string>();

  function traverse(node: any) {
    if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) {
      const title = toString(node);
      const level = node.depth;

      // Skip headings that match pattern like "1. Introduction", "2. Something", etc.
      if (/^\d+\.\s+/.test(title)) {
        return;
      }

      // Generate a URL-friendly ID from the title
      let id = slugify(title);

      // Ensure unique IDs
      if (usedIds.has(id)) {
        let counter = 1;
        while (usedIds.has(`${id}-${counter}`)) {
          counter++;
        }
        id = `${id}-${counter}`;
      }

      usedIds.add(id);

      headings.push({
        id,
        level,
        title,
      });
    }

    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(traverse);
    }
  }

  traverse(ast);
  return headings;
}
