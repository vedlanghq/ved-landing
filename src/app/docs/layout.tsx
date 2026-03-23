import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundShapes from "@/components/BackgroundShapes";
import { getAllDocs } from "@/lib/docs";
import React from "react";
import DocsSidebar from "./DocsSidebar";
import "./docs.css";

export default async function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const docs = getAllDocs();

  return (
    <>
      <BackgroundShapes />
      <Header />
      <div className="docs-layout">
        <DocsSidebar docs={docs} />
        <main className="docs-content">
          <div className="docs-content-inner">{children}</div>
        </main>
        <aside className="docs-toc">
          <h4>On this page</h4>
          <ul>
            {/* TOC will be dynamically populated later via a unified MDX pipeline or remark-toc. Quick placeholder below to match layout. */}
            <li>
              <a href="#">Introduction</a>
            </li>
            <li>
              <a href="#">Concepts</a>
            </li>
            <li>
              <a href="#">Architecture</a>
            </li>
          </ul>
        </aside>
      </div>
      <Footer />
    </>
  );
}
