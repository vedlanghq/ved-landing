import { getDocBySlug, getDocSlugs, getAllDocs } from "@/lib/docs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { notFound } from "next/navigation";
import { TOC } from "./TOC";
import Link from "next/link";

export async function generateStaticParams() {
  const slugs = getDocSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function DocPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const resolvedParams = await params;
  const doc = getDocBySlug(resolvedParams.slug);

  if (!doc) {
    notFound();
  }

  const allDocs = getAllDocs();
  const currentIndex = allDocs.findIndex((d) => d.slug === resolvedParams.slug);
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex !== -1 && currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  return (
    <>
      <main className="docs-content">
        <div className="docs-content-inner">
          <article className="markdown-body">
            <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSlug]}>{doc.content}</ReactMarkdown>
          </article>
          
          <div className="docs-pagination">
            {prevDoc ? (
              <Link href={`/docs/${prevDoc.slug}`} className="docs-pagination-link prev">
                <span className="docs-pagination-label">Previous</span>
                <span className="docs-pagination-title">{prevDoc.meta?.title || prevDoc.slug}</span>
              </Link>
            ) : <div className="docs-pagination-empty"></div>}

            {nextDoc ? (
              <Link href={`/docs/${nextDoc.slug}`} className="docs-pagination-link next">
                <span className="docs-pagination-label">Next</span>
                <span className="docs-pagination-title">{nextDoc.meta?.title || nextDoc.slug}</span>
              </Link>
            ) : <div className="docs-pagination-empty"></div>}
          </div>
        </div>
      </main>
      <aside className="docs-toc">
        <TOC content={doc.content} />
      </aside>
    </>
  );
}
