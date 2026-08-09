import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nur-learn.example.com"; // update for real deploy
  const now = new Date().toISOString();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/learn`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/courses/tcm-diagnostics`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/course-builder`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    // knowledge points would be dynamic in real; static for pilot
  ];
}
