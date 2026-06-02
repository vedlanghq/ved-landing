import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compiler Warnings",
  description:
    "Lexum warnings aren't suggestions; they are architectural constraints. Enforce deterministic safety long before a single line of code executes.",
  openGraph: {
    title: "Compiler Warnings | Lexum",
    description:
      "Lexum warnings aren't suggestions; they are architectural constraints. Enforce deterministic safety long before a single line of code executes.",
    url: "https://lexumhq.netlify.app/warnings",
  },
};

export default function WarningsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
