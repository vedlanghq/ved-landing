import React from "react";
import { getCategorizedDocs } from "@/lib/docs";
import { DocsSidebarClient } from "./DocsSidebarClient";

export function DocsSidebar() {
  const { categories, sortedCategories } = getCategorizedDocs();

  return (
    <DocsSidebarClient
      categories={categories}
      sortedCategories={sortedCategories}
    />
  );
}
