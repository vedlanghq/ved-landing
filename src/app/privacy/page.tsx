import React from "react";
import { getDocBySlug, getAllDocsForSearch } from "@/lib/docs";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const mdxComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold mt-12 mb-6 text-lexum-text tracking-tight" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-10 mb-4 text-lexum-text tracking-tight" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-8 mb-4 text-lexum-text tracking-tight" {...props} />,
  p: (props: any) => <p className="text-base text-lexum-muted leading-relaxed mb-6" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside text-lexum-muted mb-6 space-y-2 ml-4" {...props} />,
  li: (props: any) => <li className="text-lexum-muted" {...props} />,
  a: (props: any) => <a className="text-lexum-accent hover:underline" {...props} />,
  strong: (props: any) => <strong className="font-semibold text-lexum-text" {...props} />,
};

export const metadata = {
  title: "Privacy Policy",
  description: "Lexum Privacy Policy",
};

export default function PrivacyPage() {
  const doc = getDocBySlug("privacy");
  const allDocs = getAllDocsForSearch();

  if (!doc) {
    notFound();
  }

  return (
    <>
      <Header allDocs={allDocs} />
      <div className="min-h-screen bg-lexum-bg pt-12 pb-24 border-b border-lexum-border">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 border-b border-lexum-border pb-8">
              <h1 className="text-display-2 text-lexum-text font-bold mb-4 tracking-tight">
                {doc.meta.title}
              </h1>
              <p className="text-lexum-muted font-mono text-sm tracking-widest uppercase">
                Last Updated: {doc.meta.date || "2026-05-31"}
              </p>
            </div>
            
            <article className="max-w-none">
              <MDXRemote source={doc.content} components={mdxComponents} />
            </article>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
