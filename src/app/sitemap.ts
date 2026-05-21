import { MetadataRoute } from "next";
import { getDocSlugs } from "../lib/docs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://lexumhq.netlify.app";

  const staticRoutes = [
    "",
    "/docs",
    "/cli",
    "/convergence",
    "/determinism",
    "/effects",
    "/errors",
    "/journaling",
    "/linting",
    "/warnings",
    "/whitepaper",
  ].map((route) => {
    let priority = 0.8;
    if (route === "") priority = 1;
    else if (route === "/docs") priority = 0.9;

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: (route === "" || route === "/docs" ? "weekly" : "monthly") as any,
      priority,
    };
  });

  const docSlugs = getDocSlugs();
  const docRoutes = docSlugs.map((slug) => ({
    url: `${baseUrl}/docs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as any,
    priority: 0.7,
  }));

  return [...staticRoutes, ...docRoutes];
}
