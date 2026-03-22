import BackgroundShapes from "@/components/BackgroundShapes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getAllDocs } from "@/lib/docs";
import React from "react";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = await getAllDocs();

  return (
    <>
      <BackgroundShapes />
      <Header />
      <div className="docs-layout">
        <aside className="docs-sidebar">
          <h3>Documentation</h3>
          <nav className="docs-nav">
            {docs.map((doc) => {
              const formattedTitle = doc.meta.title || doc.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
              return (
                <Link 
                  key={doc.slug} 
                  href={`/docs/${doc.slug}`}
                  className="docs-nav-link"
                >
                  {formattedTitle}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="docs-content">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}