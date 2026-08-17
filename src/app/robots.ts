import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/account",
        "/wrong-questions",
        "/learn/course-builder",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
