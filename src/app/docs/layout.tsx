import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllDocsForSearch, getCategorizedDocs } from "@/lib/docs";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allDocs = getAllDocsForSearch();
  const { categories, sortedCategories } = getCategorizedDocs();

  return (
    <>
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        {/* Soft grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        {/* Subtle reading mode glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-lexum-accent/5 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      <Header
        allDocs={allDocs}
        categories={categories}
        sortedCategories={sortedCategories}
      />
      <main className="flex-1 flex flex-col w-full">
        <div className="flex-1 w-full mx-auto max-w-7xl">{children}</div>
      </main>
      <Footer />
    </>
  );
}
