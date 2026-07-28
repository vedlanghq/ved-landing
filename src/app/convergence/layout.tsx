import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formal Convergence",
  alternates: {
    canonical: "https://lexumhq.netlify.app/convergence",
  },
  description:
    "Lexum operates on Goal-Specification Semantics. Define the desired state, and the runtime mathematically guarantees convergence without side effects.",
  openGraph: {
    title: "Formal Convergence | Lexum",
    description:
      "Lexum operates on Goal-Specification Semantics. Define the desired state, and the runtime mathematically guarantees convergence without side effects.",
    url: "https://lexumhq.netlify.app/convergence",
  },
};

export default function ConvergenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
