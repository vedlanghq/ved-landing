import { MetadataRoute } from "next";
import { getAllDocsMeta } from "@/lib/docs";

export const dynamic = "force-static";

const BASE_URL = "https://lexumhq.netlify.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = getAllDocsMeta();

  // Map dynamic docs routes
  const docsSitemap: MetadataRoute.Sitemap = docs.map((doc) => ({
    url: `${BASE_URL}/docs/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Define static routes
  const staticRoutes = [
    "/",
    "/docs",
    "/cli",
    "/convergence",
    "/determinism",
    "/effects",
    "/errors",
    "/journaling",
    "/linting",
    "/warnings",
    "/privacy",
    "/terms",
  ];

  const staticSitemap: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "daily" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  return [...staticSitemap, ...docsSitemap];
}
