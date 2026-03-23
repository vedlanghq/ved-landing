import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundShapes from "@/components/BackgroundShapes";
import { getAllDocs } from "@/lib/docs";
import React from "react";
import DocsSidebar from "./DocsSidebar";
import DocsSearch from "@/components/DocsSearch";
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
      <Header searchSlot={<DocsSearch />} />
      <div className="docs-layout">
        <DocsSidebar docs={docs} />
        {children}
      </div>
      <Footer />
    </>
  );
}
