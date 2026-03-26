import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "docs");

function sanitizeSlug(input: string): string {
  // Remove markdown extension if present
  const withoutExtension = input.replace(/\.md$/i, "");
  // Lowercase and replace any sequence of non-alphanumeric/hyphen characters with a single hyphen
  const normalized = withoutExtension
    .toLowerCase()
    .replace(/[^a-z0-9\-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized;
}

export function getDocSlugs() {
  return fs
    .readdirSync(docsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => sanitizeSlug(file))
    .filter((slug) => slug.length > 0);
}

export function getDocBySlug(slug: string) {
  const realSlug = sanitizeSlug(slug);
  if (!realSlug) {
    return null;
  }
  const fullPath = path.join(docsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data,
    content,
  };
}

export function getAllDocs() {
  const slugs = getDocSlugs();
  const docs = slugs
    .map((slug) => getDocBySlug(slug))
    .filter((doc): doc is NonNullable<typeof doc> => doc !== null);

  // Sort docs by order if present in frontmatter
  return docs.sort((a, b) => {
    const orderA = a?.meta.order || 999;
    const orderB = b?.meta.order || 999;
    return orderA - orderB;
  });
}
