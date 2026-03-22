import { getDocBySlug, getDocSlugs } from "@/lib/docs";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getDocSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const doc = getDocBySlug(resolvedParams.slug);

  if (!doc) {
    notFound();
  }

  return (
    <article className="markdown-body">
      <h1>{doc.meta.title}</h1>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{doc.content}</ReactMarkdown>
    </article>
  );
}