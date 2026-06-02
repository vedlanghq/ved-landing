/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import {
  getDocBySlug,
  getCategorizedDocs,
  getDocSlugs,
  calculateReadTime,
  getPreviousAndNextDocs,
} from "@/lib/docs";
import { extractHeadings } from "@/lib/markdown-utils";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Script from "next/script";
import DocActionsDropdown from "./DocActionsDropdown";
import DocBreadcrumb from "./DocBreadcrumb";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { SearchHighlighter } from "@/components/docs/SearchHighlighter";

// Ensure static generation for all docs
export async function generateStaticParams() {
  const slugs = getDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Helper to slugify text for IDs
function slugify(text: string): string {
  if (typeof text !== "string") {
    return "";
  }
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Helper to extract text from children
function extractText(children: unknown): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) {
    return children.map(extractText).join("");
  }
  if (typeof children === "object" && children !== null) {
    if (
      "props" in children &&
      typeof (children as any).props === "object" &&
      (children as any).props !== null &&
      "children" in (children as any).props
    ) {
      return extractText((children as any).props.children);
    }
    if ("children" in children) {
      return extractText((children as any).children);
    }
  }
  return "";
}

// Custom MDX component map for proper styling
const createComponents = () => ({
  h1: () => null, // Hidden since we render the title manually at the top of the page
  h2: ({ children }: any) => {
    const text = extractText(children);

    // Hide headings that match pattern like "1. Introduction", "2. Something", etc.
    if (/^\d+\.\s+/.test(text)) {
      return null;
    }

    const id = slugify(text);
    return (
      <h2
        id={id}
        className="text-2xl font-semibold text-lexum-text mb-6 mt-12 border-b border-lexum-border pb-3 scroll-mt-32"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }: any) => {
    const text = extractText(children);
    const id = slugify(text);
    return (
      <h3
        id={id}
        className="text-xl font-semibold text-lexum-text mb-4 mt-8 scroll-mt-32"
      >
        {children}
      </h3>
    );
  },
  p: ({ children }: any) => (
    <p className="text-lexum-text mb-4 leading-relaxed">{children}</p>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside mb-4 text-lexum-text space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside mb-4 text-lexum-text space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }: any) => <li className="ml-2">{children}</li>,
  a: ({ href, children }: any) => (
    <a href={href} className="text-lexum-accent hover:underline">
      {children}
    </a>
  ),
  code: ({ children }: any) => (
    <code className="bg-lexum-panel text-lexum-accent px-2 py-1 rounded font-mono text-sm">
      {children}
    </code>
  ),
  pre: ({ children }: any) => {
    const rawCode = extractText(children);
    let language = "lexum";
    if (children?.props?.className?.startsWith("language-")) {
      language = children.props.className.replace("language-", "");
    }
    return (
      <CodeBlock rawCode={rawCode} language={language} className="mb-4">
        {children}
      </CodeBlock>
    );
  },
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-lexum-accent pl-4 py-2 mb-4 italic text-lexum-muted">
      {children}
    </blockquote>
  ),
  strong: ({ children }: any) => (
    <strong className="font-bold text-lexum-text">{children}</strong>
  ),
  em: ({ children }: any) => <em className="italic">{children}</em>,
  hr: () => <hr className="border-lexum-border my-8" />,
  table: ({ children }: any) => (
    <table className="w-full border-collapse mb-4 text-lexum-text">
      {children}
    </table>
  ),
  thead: ({ children }: any) => (
    <thead className="border-b-2 border-lexum-border">{children}</thead>
  ),
  tbody: ({ children }: any) => <tbody>{children}</tbody>,
  tr: ({ children }: any) => (
    <tr className="border-b border-lexum-border">{children}</tr>
  ),
  th: ({ children }: any) => (
    <th className="text-left px-4 py-2 font-semibold text-lexum-text bg-lexum-panel">
      {children}
    </th>
  ),
  td: ({ children }: any) => <td className="px-4 py-2">{children}</td>,
});

// Minimalistic markdown components mapping to Lexum design system
export default async function DocPage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const resolvedParams = await params;
  const doc = getDocBySlug(resolvedParams.slug);

  if (!doc) {
    notFound();
  }

  const headings = extractHeadings(doc.content);
  const components = createComponents();
  const readTime = calculateReadTime(doc.content);
  const { previousDoc, nextDoc } = getPreviousAndNextDocs(resolvedParams.slug);

  return (
    <>
      <Script
        id={`json-ld-article-${resolvedParams.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: doc.meta.title,
            description: doc.meta.title,
            author: {
              "@type": "Person",
              name: "Aniket Raj",
            },
          }),
        }}
      />
      <main className="flex-1 max-w-3xl min-w-0">
        <div className="flex items-center justify-between mb-2">
          <DocBreadcrumb title={doc.meta.title} />
          <DocActionsDropdown
            slug={resolvedParams.slug}
            rawContent={doc.content}
          />
        </div>
        <h1 className="text-display-2 text-lexum-text mb-6 mt-0 wrap-break-word">
          {doc.meta.title}
        </h1>

        {/* Meta Info: Read time and Suggest Edit */}
        <div className="flex w-full items-center justify-between mb-8 pb-6 border-b border-lexum-border">
          <div className="flex items-center gap-1.5 text-lexum-muted font-mono text-xs whitespace-nowrap">
            <svg
              width={14}
              height={14}
              className="shrink-0 relative -top-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="leading-none">{readTime} min read</span>
          </div>
          <a
            href={`https://github.com/lexumhq/lexum-landing/edit/main/docs/${resolvedParams.slug}.mdx`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-lexum-accent hover:text-lexum-text transition-colors font-mono text-xs whitespace-nowrap"
          >
            <svg
              width={14}
              height={14}
              className="shrink-0 relative -top-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span className="leading-none">Suggest an Edit</span>
          </a>
        </div>

        <SearchHighlighter />

        <article className="prose-lexum">
          <MDXRemote source={doc.content} components={components} />
        </article>

        {/* Previous/Next Navigation */}
        <div className="mt-16 pt-8 border-t border-lexum-border flex justify-between gap-8">
          {previousDoc ? (
            <Link
              href={`/docs/${previousDoc.slug}`}
              className="flex-1 p-4 border border-lexum-border rounded hover:bg-lexum-bg transition-colors group flex flex-col items-start"
            >
              <div className="text-xs text-lexum-muted mb-2 font-mono flex items-center gap-1.5 uppercase tracking-wider group-hover:text-lexum-text transition-colors">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Previous
              </div>
              <div className="text-sm text-lexum-text font-medium group-hover:text-lexum-accent transition-colors">
                {previousDoc.title}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextDoc ? (
            <Link
              href={`/docs/${nextDoc.slug}`}
              className="flex-1 p-4 border border-lexum-border rounded hover:bg-lexum-bg transition-colors group flex flex-col items-end text-right"
            >
              <div className="text-xs text-lexum-muted mb-2 font-mono flex items-center gap-1.5 uppercase tracking-wider group-hover:text-lexum-text transition-colors">
                Next
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="text-sm text-lexum-text font-medium group-hover:text-lexum-accent transition-colors">
                {nextDoc.title}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </main>

      {/* On This Page (right rail) */}
      <aside
        className="hidden xl:block w-48 max-w-48 shrink-0"
        style={{ width: "12rem" }}
      >
        <div className="sticky top-32">
          <h4 className="text-tag text-lexum-muted tracking-widest mb-6 uppercase">
            ON THIS PAGE
          </h4>
          {headings.length > 0 ? (
            <nav className="flex flex-col gap-4">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block transition-colors hover:text-lexum-accent wrap-break-word ${
                    heading.level === 2
                      ? "text-lexum-text font-medium text-xs leading-normal"
                      : "text-lexum-muted ml-3 text-xs leading-normal"
                  }`}
                >
                  {heading.title}
                </a>
              ))}
            </nav>
          ) : (
            <div className="font-mono text-xs text-lexum-muted leading-relaxed">
              <p>No headings in this document.</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
