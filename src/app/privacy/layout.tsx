import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Lexum HQ. Learn how we handle cookies, tracking, and your data.",
  openGraph: {
    title: "Privacy Policy | Lexum",
    description:
      "Privacy Policy for Lexum HQ. Learn how we handle cookies, tracking, and your data.",
    url: "https://lexumhq.netlify.app/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
