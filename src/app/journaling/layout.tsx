import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cryptographic Journaling",
  description:
    "Every state transition in Lexum is hashed and appended to a cryptographic journal, ensuring 100% auditability and deterministic replayability.",
  openGraph: {
    title: "Cryptographic Journaling | Lexum",
    description:
      "Every state transition in Lexum is hashed and appended to a cryptographic journal, ensuring 100% auditability and deterministic replayability.",
    url: "https://lexumhq.netlify.app/journaling",
  },
};

export default function JournalingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
