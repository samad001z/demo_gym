import type { MetadataRoute } from "next";
import { branches, trainingPages } from "@/lib/content";
import { canonical } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: canonical("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: canonical("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: canonical("/gyms"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: canonical("/training"), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    ...trainingPages.map((t) => ({
      url: canonical(`/training/${t.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...branches.map((b) => ({
      url: canonical(`/gyms/${b.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      // Location pages carry the local intent, so they outrank the about page.
      priority: 0.9,
    })),
  ];
}
