import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Absolute Determinism",
  alternates: {
    canonical: "https://lexumhq.netlify.app/determinism",
  },
  description:
    "Eliminate race conditions and unpredictable state mutations. Lexum provides absolute determinism by treating execution as a mathematical proof.",
  openGraph: {
    title: "Absolute Determinism | Lexum",
    description:
      "Eliminate race conditions and unpredictable state mutations. Lexum provides absolute determinism by treating execution as a mathematical proof.",
    url: "https://lexumhq.netlify.app/determinism",
  },
};

export default function DeterminismLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
