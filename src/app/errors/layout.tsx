import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Predictable Errors",
  alternates: {
    canonical: "https://lexumhq.netlify.app/errors",
  },
  description:
    "Lexum eliminates runtime surprises. Errors are caught at compile-time or handled through deterministic, algebraic failure states.",
  openGraph: {
    title: "Predictable Errors | Lexum",
    description:
      "Lexum eliminates runtime surprises. Errors are caught at compile-time or handled through deterministic, algebraic failure states.",
    url: "https://lexumhq.netlify.app/errors",
  },
};

export default function ErrorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
