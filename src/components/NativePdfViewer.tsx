"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function NativePdfViewer({ url }: Readonly<{ url: string }>) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    // Initial sizing based on device
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize(); // Init on mount
    window.addEventListener("resize", handleResize);

    // If strictly on mobile, adjust default scale so it doesn't vastly overflow
    if (window.innerWidth < 640) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScale(0.6);
    } else if (window.innerWidth < 1024) {
      setScale(0.9);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset: number) => {
    setPageNumber((prev) => Math.min(Math.max(1, prev + offset), numPages || 1));
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.4));

  // Determine a dynamic max width for the page based on window size
  const pageRenderWidth = windowWidth > 0 ? Math.min(windowWidth - 32, 900) : undefined;

  return (
    <div className="pdf-viewer-container" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "0 clamp(1rem, 5vw, 2rem) 4rem clamp(1rem, 5vw, 2rem)" }}>
      {/* Terminal-like brutalist toolbar */}
      <div style={{ 
        marginBottom: "2rem", 
        display: "flex", 
        flexWrap: "wrap",
        gap: "1rem", // Added gap to breathe on mobile wrap
        justifyContent: "space-between",
        width: "100%",
        padding: "1rem", 
        border: "1px solid var(--border)", 
        borderBottom: "4px solid var(--border)",
        background: "transparent",
        backdropFilter: "blur(8px)"
      }}>
        {/* Controls block (prev/next/zoom) */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", width: "100%", maxWidth: "max-content", justifyContent: "center" }}>
          
          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={() => changePage(-1)} disabled={pageNumber <= 1} className="btn btn-secondary" style={{ padding: "0.5rem 1rem", minWidth: "4rem", opacity: pageNumber <= 1 ? 0.5 : 1 }}>
              PREV
            </button>
            <span style={{ color: "var(--text-main)", fontWeight: 600, fontFamily: "monospace", fontSize: "clamp(0.85rem, 3vw, 1rem)", minWidth: "10ch", textAlign: "center" }}>
              [{pageNumber}/{numPages || "?"}]
            </span>
            <button onClick={() => changePage(1)} disabled={pageNumber >= (numPages || 1)} className="btn btn-secondary" style={{ padding: "0.5rem 1rem", minWidth: "4rem", opacity: pageNumber >= (numPages || 1) ? 0.5 : 1 }}>
              NEXT
            </button>
          </div>
          
          {/* Vertical divider -- hidden on very small screens where it stacks */}
          {windowWidth > 580 && (
            <div style={{ width: "1px", height: "24px", background: "var(--border)" }} />
          )}

          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={zoomOut} className="btn btn-secondary" style={{ padding: "0.5rem 1rem" }}>-</button>
            <span style={{ minWidth: "5ch", textAlign: "center", color: "var(--text-main)", fontFamily: "monospace", fontSize: "clamp(0.85rem, 3vw, 1rem)", fontWeight: 600 }}>{Math.round(scale * 100)}%</span>
            <button onClick={zoomIn} className="btn btn-secondary" style={{ padding: "0.5rem 1rem" }}>+</button>
          </div>

        </div>

        <a 
          href={url} 
          download
          className="btn btn-primary"
          style={{ padding: "0.5rem 1.5rem", flexGrow: windowWidth < 680 ? 1 : 0, textAlign: "center", justifyContent: "center" }}
        >
          DOWNLOAD PDF
        </a>
      </div>

      <div style={{ 
        width: "100%",
        display: "flex",
        justifyContent: windowWidth < 640 ? "flex-start" : "center",
        border: "1px solid var(--border)",
        background: "rgba(0,0,0,0.02)",
        overflowX: "auto", // Allow horizontal scrolling when zoomed
        overflowY: "hidden", // Disable unnecessary Y scrolling wrapper
        paddingBottom: "1rem" // Keep shadow from clipping
      }}>
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div style={{ padding: "4rem", color: "var(--text-main)", fontFamily: "monospace", fontSize: "1.2rem" }}>[LOADING WHITEPAPER...]</div>}
          error={<div style={{ padding: "4rem", color: "var(--token-property)", fontFamily: "monospace" }}>[ERROR: FAILED TO LOAD DOCUMENT]</div>}
        >
          <div style={{ display: "flex", justifyContent: "center", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", minWidth: "max-content", margin: windowWidth < 640 ? "0 1rem" : "0" }}>
            <Page 
              pageNumber={pageNumber} 
              scale={scale} 
              width={pageRenderWidth}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="brutalist-pdf-page"
            />
          </div>
        </Document>
      </div>
    </div>
  );
}
