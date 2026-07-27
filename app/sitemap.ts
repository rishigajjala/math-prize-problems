import type { MetadataRoute } from "next";
import { problems } from "./data/problems";
import { SITE_URL, problemPath } from "./lib/problem-format";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-07-27"),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...problems.map((problem) => ({
      url: `${SITE_URL}${problemPath(problem)}`,
      lastModified: new Date(problem.lastVerified),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
