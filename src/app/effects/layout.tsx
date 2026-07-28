import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zero-Trust Effects",
  alternates: {
    canonical: "https://lexumhq.netlify.app/effects",
  },
  description:
    "I/O is an intent. Effects are never executed imperatively; they are declared, tracked, and dispatched exclusively under strict capabilities.",
  openGraph: {
    title: "Zero-Trust Effects | Lexum",
    description:
      "I/O is an intent. Effects are never executed imperatively; they are declared, tracked, and dispatched exclusively under strict capabilities.",
    url: "https://lexumhq.netlify.app/effects",
  },
};

export default function EffectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
