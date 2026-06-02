import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Lexum HQ. Read the rules and guidelines for using the Lexum website and tools.",
  openGraph: {
    title: "Terms of Service | Lexum",
    description:
      "Terms of Service for Lexum HQ. Read the rules and guidelines for using the Lexum website and tools.",
    url: "https://lexumhq.netlify.app/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
