"use client";

import React from "react";
import dynamic from "next/dynamic";

const NativePdfViewer = dynamic(() => import("@/components/NativePdfViewer"), {
  ssr: false,
  loading: () => <div style={{ padding: "4rem", color: "var(--text-main)" }}>Initializing PDF engine...</div>
});

export default function DynamicPdfViewer({ url }: Readonly<{ url: string }>) {
  return <NativePdfViewer url={url} />;
}
