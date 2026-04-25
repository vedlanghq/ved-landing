"use client";

import React from "react";
import dynamic from "next/dynamic";

// We disable SSR for the PDF viewer because PDF.js relies heavily on browser APIs
// like canvas and window, which aren't available during server-side rendering.
const NativePdfViewer = dynamic(() => import("./NativePdfViewer"), {
  ssr: false,
  loading: () => <div style={{ padding: "4rem", color: "var(--text-main)" }}>Initializing PDF engine...</div>
});

export default function PdfViewerWrapper({ url }: Readonly<{ url: string }>) {
  return <NativePdfViewer url={url} />;
}
