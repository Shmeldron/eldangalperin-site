import type { MetadataRoute } from "next";
import { publishedProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
  ];
  for (const p of publishedProjects) {
    routes.push({
      url: `${site.url}/work/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }
  return routes;
}
