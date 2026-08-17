import type { MetadataRoute } from "next";
import { registeredCourses } from "@/content/courses";
import { SITE_URL } from "@/lib/site-config";

/** Course workspace pages that exist as App Router pages (not every registered course has one). */
const COURSE_WORKSPACE_SLUGS = new Set(["tcm-diagnostics"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/learn`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const courseEntries: MetadataRoute.Sitemap = [];

  for (const course of registeredCourses) {
    if (COURSE_WORKSPACE_SLUGS.has(course.slug)) {
      courseEntries.push({
        url: `${base}/courses/${course.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    for (const kp of course.knowledgePoints) {
      if (kp.lesson === null) continue;
      courseEntries.push({
        url: `${base}/courses/${course.slug}/knowledge-points/${kp.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.65,
      });
    }
  }

  return [...staticEntries, ...courseEntries];
}
