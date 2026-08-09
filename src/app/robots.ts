import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/login", "/register"],
    },
    sitemap: "https://nur-learn.example.com/sitemap.xml", // placeholder, update on deploy
  };
}
