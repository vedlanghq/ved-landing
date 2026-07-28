import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strict Linting",
  alternates: {
    canonical: "https://lexumhq.netlify.app/linting",
  },
  description:
    "Lexum provides severe, unyielding static analysis. Code that compiles is mathematically verified to execute safely without side-effect leaks.",
  openGraph: {
    title: "Strict Linting | Lexum",
    description:
      "Lexum provides severe, unyielding static analysis. Code that compiles is mathematically verified to execute safely without side-effect leaks.",
    url: "https://lexumhq.netlify.app/linting",
  },
};

export default function LintingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
