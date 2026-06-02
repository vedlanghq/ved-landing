import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unified Workflow & CLI",
  description:
    "A single binary toolchain for Lexum. Compile, simulate, verify, and test your deterministic system without messy plugins or external dependencies.",
  openGraph: {
    title: "Unified Workflow & CLI | Lexum",
    description:
      "A single binary toolchain for Lexum. Compile, simulate, verify, and test your deterministic system without messy plugins or external dependencies.",
    url: "https://lexumhq.netlify.app/cli",
  },
};

export default function CliLayout({ children }: { children: React.ReactNode }) {
  return children;
}
