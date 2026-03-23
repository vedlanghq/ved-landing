import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "docs");

export function getDocSlugs() {
  return fs
    .readdirSync(docsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getDocBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
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
