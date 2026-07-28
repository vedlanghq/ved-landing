import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { ChaosVsLaw } from "@/components/system/ChaosVsLaw";
import { ArchitectureGrid } from "@/components/layout/ArchitectureGrid";
import { InteractiveTraceViewer } from "@/components/system/InteractiveTraceViewer";
import { FAQ } from "@/components/layout/FAQ";
import { CTA } from "@/components/layout/CTA";
import { Footer } from "@/components/layout/Footer";
import { ScrollUnmaskText } from "@/components/ui/ScrollUnmaskText";

import Script from "next/script";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://lexumhq.netlify.app/#website",
        "url": "https://lexumhq.netlify.app/",
        "name": "Lexum",
        "description": "A radically deterministic, statically typed programming language built for zero-trust control-plane operations.",
        "publisher": {
          "@type": "Organization",
          "name": "Lexumhq",
          "logo": {
            "@type": "ImageObject",
            "url": "https://lexumhq.netlify.app/og-image.png"
          }
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://lexumhq.netlify.app/#software",
        "name": "Lexum Programming Language",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "url": "https://lexumhq.netlify.app/",
        "description": "Deterministic control-plane language."
      }
    ]
  };

  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 bg-lexum-bg overflow-hidden">
        <Hero />
        <ChaosVsLaw />
        <ArchitectureGrid />
        <InteractiveTraceViewer />
        <ScrollUnmaskText text="Math, not magic. Build systems that converge predictably without the chaos of imperative scripting." />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
