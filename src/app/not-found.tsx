import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Home, BookOpen, Terminal } from "lucide-react";
import { getAllDocsForSearch } from "@/lib/docs";

export const metadata = {
  title: "404 - Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  const allDocs = getAllDocsForSearch();

  return (
    <>
      <Header allDocs={allDocs} />
      <main className="min-h-screen bg-lexum-bg flex flex-col items-center justify-center relative overflow-hidden py-24">
        {/* Background Grid & Glow for Aesthetic */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-lexum-accent/10 blur-[120px] rounded-full pointer-events-none"></div>

        <Container className="relative z-10 w-full">
          <div className="max-w-2xl mx-auto text-center">
            {/* Error Code */}
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full border border-lexum-border bg-lexum-panel font-mono text-sm tracking-widest text-lexum-muted">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
              ERROR_STATE_UNRESOLVED
            </div>

            {/* Title */}
            <h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-lexum-text mb-4">
              404
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-lexum-text mb-6">
              Control Plane Lost
            </h2>

            {/* Description */}
            <p className="text-lg text-lexum-muted mb-12 max-w-lg mx-auto leading-relaxed">
              The deterministic route you requested could not be resolved. It
              may have been moved, deleted, or never existed in the current
              system state.
            </p>

            {/* Navigation Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Link
                href="/"
                className="group flex flex-col items-center justify-center p-6 rounded-lg border border-lexum-border bg-lexum-panel/50 hover:bg-lexum-panel hover:border-lexum-accent/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-lexum-border/50 flex items-center justify-center mb-4 group-hover:bg-lexum-accent/10 group-hover:text-lexum-accent transition-colors">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lexum-text mb-1">
                  Return Home
                </h3>
                <p className="text-xs text-lexum-muted text-center font-mono uppercase tracking-wider">
                  Initialize
                </p>
              </Link>

              <Link
                href="/docs"
                className="group flex flex-col items-center justify-center p-6 rounded-lg border border-lexum-border bg-lexum-panel/50 hover:bg-lexum-panel hover:border-lexum-accent/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-lexum-border/50 flex items-center justify-center mb-4 group-hover:bg-lexum-accent/10 group-hover:text-lexum-accent transition-colors">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lexum-text mb-1">
                  Documentation
                </h3>
                <p className="text-xs text-lexum-muted text-center font-mono uppercase tracking-wider">
                  Manuals
                </p>
              </Link>

              <Link
                href="/cli"
                className="group flex flex-col items-center justify-center p-6 rounded-lg border border-lexum-border bg-lexum-panel/50 hover:bg-lexum-panel hover:border-lexum-accent/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-lexum-border/50 flex items-center justify-center mb-4 group-hover:bg-lexum-accent/10 group-hover:text-lexum-accent transition-colors">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lexum-text mb-1">
                  CLI Tools
                </h3>
                <p className="text-xs text-lexum-muted text-center font-mono uppercase tracking-wider">
                  Execute
                </p>
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
