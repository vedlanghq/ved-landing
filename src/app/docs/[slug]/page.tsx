import { getDocBySlug, getDocSlugs, getAllDocs } from "@/lib/docs";
import { compileMDX, MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { notFound } from "next/navigation";
import TOC from "./TOC";
import Link from "next/link";
import { Clock, Edit } from "lucide-react";
import SearchHighlighter from "../SearchHighlighter";
import { Suspense } from "react";
import fs from "node:fs";
import path from "node:path";

export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), "docs");
  const files = fs.readdirSync(docsDir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(".mdx", ""),
    }));
}

const getComponents = (doc: any) => ({
  h1: ({ children, ...props }: any) => {
    return (
      <div
        className="docs-header-wrapper"
        style={{ width: "100%", marginBottom: "4rem" }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .docs-header-wrapper h1 {
             border-bottom: none !important;
             margin-bottom: 1rem !important;
             padding-bottom: 0 !important;
          }
          .docs-meta-bar {
             display: flex;
             justify-content: space-between;
             align-items: center;
             flex-wrap: wrap;
             gap: 1rem;
             width: 100%;
             color: var(--text-muted);
             font-size: 0.95rem;
          }
          .docs-meta-item {
             display: flex;
             align-items: center;
             gap: 8px;
             opacity: 0.75;
             transition: all 0.2s ease;
             text-decoration: none;
             color: inherit;
             font-weight: 500;
          }
          a.docs-meta-item:hover {
             opacity: 1;
             color: var(--text-main);
          }
          .docs-meta-item.hover-underline:hover span {
             text-decoration: underline;
             text-underline-offset: 4px;
          }
        `,
          }}
        />
        <h1 {...props}>{children}</h1>

        <div className="docs-meta-bar">
          <div className="docs-meta-item">
            <Clock size={16} strokeWidth={1.5} />
            <span>{doc?.meta?.readingTime || 1} min read</span>
          </div>

          <a
            href={`https://github.com/lexumhq/lexum-landing/edit/main/docs/${doc?.slug || "execution-DAG"}.mdx`}
            target="_blank"
            rel="noopener noreferrer"
            className="docs-meta-item hover-underline"
          >
            <Edit size={16} strokeWidth={1.5} />
            <span>Suggest an edit</span>
          </a>
        </div>
      </div>
    );
  },
});

export default async function DocPage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const resolvedParams = await params;
  const docsDir = path.join(process.cwd(), "docs");
  const filePath = path.join(docsDir, `${resolvedParams.slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return (
      <main className="docs-content">
        <div className="docs-content-inner">
          <article className="markdown-body">
            <h1>404 - Document Not Found</h1>
          </article>
        </div>
      </main>
    );
  }

  const doc = getDocBySlug(resolvedParams.slug);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: fileContent,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
    },
    components: getComponents(doc),
  });

  // Get next and previous docs
  const allDocs = getAllDocs();
  const currentIndex = allDocs.findIndex((d) => d.slug === resolvedParams.slug);
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc =
    currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  return (
    <>
      <main className="docs-content">
        <div className="docs-content-inner">
          <Suspense fallback={null}>
            <SearchHighlighter />
          </Suspense>
          <article className="markdown-body">
            {content}
          </article>

          <div className="docs-pagination">
            {prevDoc ? (
              <Link
                href={`/docs/${prevDoc.slug}`}
                className="docs-pagination-link prev"
              >
                <span className="docs-pagination-label">Previous</span>
                <span className="docs-pagination-title">
                  {(prevDoc.meta?.title as string) || prevDoc.slug}
                </span>
              </Link>
            ) : (
              <div className="docs-pagination-empty"></div>
            )}

            {nextDoc ? (
              <Link
                href={`/docs/${nextDoc.slug}`}
                className="docs-pagination-link next"
              >
                <span className="docs-pagination-label">Next</span>
                <span className="docs-pagination-title">
                  {(nextDoc.meta?.title as string) || nextDoc.slug}
                </span>
              </Link>
            ) : (
              <div className="docs-pagination-empty"></div>
            )}
          </div>
        </div>
      </main>
      <aside className="docs-toc">
        <TOC content={fileContent} />
      </aside>
    </>
  );
}
