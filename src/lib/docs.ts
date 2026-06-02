import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const DOCS_DIR = path.join(process.cwd(), "docs");

export interface DocMeta {
  title: string;
  category: string;
  order: number;
  slug: string;
  date?: string;
}

export interface DocSearchData extends DocMeta {
  content: string;
}

export function getDocSlugs() {
  if (!fs.existsSync(DOCS_DIR)) return [];
  const files = fs.readdirSync(DOCS_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getDocBySlug(slug: string) {
  const fullPath = path.join(DOCS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    meta: {
      ...data,
      slug,
    } as DocMeta,
    content,
  };
}

export function getAllDocsMeta(): DocMeta[] {
  const slugs = getDocSlugs();
  return slugs
    .map((slug) => {
      const doc = getDocBySlug(slug);
      return doc ? doc.meta : null;
    })
    .filter(Boolean) as DocMeta[];
}

export function getAllDocsForSearch(): DocSearchData[] {
  const slugs = getDocSlugs();
  return slugs
    .map((slug) => {
      const doc = getDocBySlug(slug);
      if (!doc) return null;

      // Strip markdown syntax for clean search context
      const plainText = doc.content
        .replace(/```[\s\S]*?```/g, "")
        .replace(/#+\s+/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`]/g, "")
        .replaceAll("\n", " ")
        .replace(/\s+/g, " ")
        .trim();

      return {
        ...doc.meta,
        content: plainText,
      };
    })
    .filter(Boolean) as DocSearchData[];
}

export function getCategorizedDocs() {
  const allDocs = getAllDocsMeta();
  const categories: Record<string, DocMeta[]> = {};

  allDocs.forEach((doc) => {
    if (doc.category === "Legal") return; // Filter out legal docs from sidebar navigation

    if (!categories[doc.category]) {
      categories[doc.category] = [];
    }
    categories[doc.category].push(doc);
  });

  // Sort categories by their prefix number (if any) or alphabetically
  const sortedCategories = Object.keys(categories).sort((a, b) => {
    const numA = Number.parseInt(a) || 999;
    const numB = Number.parseInt(b) || 999;
    if (numA !== numB) return numA - numB;
    return a.localeCompare(b);
  });

  // Sort docs within categories by order
  sortedCategories.forEach((c) => {
    categories[c].sort((a, b) => a.order - b.order);
  });

  return { categories, sortedCategories };
}

export function calculateReadTime(content: string): number {
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readTimeMinutes);
}

export function getPreviousAndNextDocs(slug: string) {
  const { categories, sortedCategories } = getCategorizedDocs();

  // Flatten everything into a single sorted array
  const sortedDocs: DocMeta[] = [];
  sortedCategories.forEach((c) => {
    sortedDocs.push(...categories[c]);
  });

  const currentIndex = sortedDocs.findIndex((doc) => doc.slug === slug);

  const previousDoc = currentIndex > 0 ? sortedDocs[currentIndex - 1] : null;
  const nextDoc =
    currentIndex < sortedDocs.length - 1 ? sortedDocs[currentIndex + 1] : null;

  return { previousDoc, nextDoc };
}
