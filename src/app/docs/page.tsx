import { getAllDocs } from "@/lib/docs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DocsIndex() {
  const docs = getAllDocs();

  if (docs.length > 0) {
    // Optionally redirect to the first doc
    const firstDoc = docs.find((d) => d.slug === "introduction") || docs[0];
    redirect(`/docs/${firstDoc.slug}`);
  }

  return (
    <div className="markdown-body">
      <h1>Documentation</h1>
      <p>
        Welcome to the Ved Documentation. Please select a topic from the
        sidebar.
      </p>
    </div>
  );
}
