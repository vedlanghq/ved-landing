import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PdfViewerWrapper from "@/components/PdfViewerWrapper";
import BackgroundShapes from "@/components/BackgroundShapes";

export const metadata: Metadata = {
  title: "Ved | Technical Whitepaper",
  description: "Deterministic Control-Plane Programming for Reproducible Distributed Systems",
};

export default function WhitepaperPage() {
  return (
    <>
      <BackgroundShapes />
      <Header />
      <main style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "transparent",
        paddingTop: "120px" // Fix header overlap
      }}>
        
        {/* Title Bar Section */}
        <div style={{
          width: "100%",
          maxWidth: "1200px",
          padding: "clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 2rem) 2rem clamp(1rem, 5vw, 2rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left"
        }}>
          <h1 style={{ 
            margin: "0 0 1rem 0", 
            fontSize: "clamp(2.5rem, 8vw, 3.5rem)", 
            fontWeight: 800, 
            color: "var(--text-main)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1
          }}>
            Technical Whitepaper
          </h1>
          <p style={{ 
            margin: 0, 
            color: "var(--text-muted)", 
            fontSize: "clamp(1rem, 4vw, 1.25rem)",
            maxWidth: "600px",
            lineHeight: 1.5
          }}>
            Deterministic Control-Plane Programming for Reproducible Distributed Systems
          </p>
        </div>

        {/* PDF Viewer Section */}
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <PdfViewerWrapper url="/whitepaper_signed.pdf" />
        </div>

      </main>
      <Footer />
    </>
  );
}
