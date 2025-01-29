import type { MetadataRoute } from "next";

const baseUrl = "https://veges.in";

const staticUrl = [
  "about-us",
  "biryani-essentials",
  "chinese-essentials",
  "privacy-policy",
  "product",
  "profile",
  "rice",
  "spices-powder",
  "spices-whole",
  "tos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPageSitemap = staticUrl.map((page) => ({
    url: `${baseUrl}/${page}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...staticPageSitemap,
  ];
}
