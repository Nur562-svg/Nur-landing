import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const now = new Date().toISOString();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/learn`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/courses/tcm-diagnostics`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/learn/course-builder`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
