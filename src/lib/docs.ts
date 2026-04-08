import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const docsDirectory = path.join(process.cwd(), "docs");

function sanitizeSlug(input: string): string {
  // Remove markdown extension if present
  const withoutExtension = input.replace(/\.mdx?$/i, "");
  // Lowercase and replace any sequence of non-alphanumeric/hyphen characters with a single hyphen
  const normalized = withoutExtension
    .toLowerCase()
    .replaceAll(/[^a-z0-9\-]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
  return normalized;
}

export function getDocSlugs() {
  return fs
    .readdirSync(docsDirectory)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => sanitizeSlug(file))
    .filter((slug) => slug.length > 0);
}

export function getDocBySlug(slug: string) {
  const realSlug = sanitizeSlug(slug);
  if (!realSlug) {
    return null;
  }
  let fullPath = path.join(docsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(docsDirectory, `${realSlug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const readTime = readingTime(content);

  const meta = {
    ...data,
    readingTime: Math.ceil(readTime.minutes),
  } as Record<string, any>;

  return {
    slug: realSlug,
    meta,
    content,
  };
}

export function getAllDocs() {
  const slugs = getDocSlugs();
  const docs = slugs
    .map((slug) => getDocBySlug(slug))
    .filter((doc): doc is NonNullable<typeof doc> => doc !== null);

  // Sort docs by category first, then by order
  return docs.sort((a, b) => {
    const catA = a?.meta.category || "";
    const catB = b?.meta.category || "";

    if (catA !== catB) {
      return catA.localeCompare(catB, undefined, { numeric: true });
    }

    const orderA = a?.meta.order || 999;
    const orderB = b?.meta.order || 999;
    return orderA - orderB;
  });
}
