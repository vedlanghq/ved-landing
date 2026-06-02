import React from "react";
import { DocsSidebar } from "@/components/docs/DocsSidebar";

export default function WithSidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full flex gap-8 pb-16 pt-8 px-4 sm:px-6 lg:px-8">
        <DocsSidebar />
        {children}
      </div>
    </>
  );
}
