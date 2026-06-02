import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { ChaosVsLaw } from "@/components/system/ChaosVsLaw";
import { ArchitectureGrid } from "@/components/layout/ArchitectureGrid";
import { InteractiveTraceViewer } from "@/components/system/InteractiveTraceViewer";
import { FAQ } from "@/components/layout/FAQ";
import { CTA } from "@/components/layout/CTA";
import { Footer } from "@/components/layout/Footer";
import { ScrollUnmaskText } from "@/components/ui/ScrollUnmaskText";

export default function Home() {
  return (
    <>
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
