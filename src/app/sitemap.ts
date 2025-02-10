import { getProductList } from "@/api/get-product";
import type { MetadataRoute } from "next";

const baseUrl = "https://veges.in";

const staticPages = [
  "about-us",
  "biryani-essentials",
  "chinese-essentials",
  "privacy-policy",
  "product",
  "profile",
  "rice",
  "spices-powder",
  "spices-whole",
  "terms-of-service",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use a single date instance for consistency.
  const lastModified = new Date();

  // Retrieve product list.
  const products = await getProductList({});

  // Common sitemap options for static pages and products.
  const defaultOptions = {
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  };

  // Map static pages to sitemap entries.
  const staticPageSitemap = staticPages.map((page) => ({
    url: `${baseUrl}/${page}/`,
    ...defaultOptions,
  }));

  // Map products to sitemap entries.
  const productsSitemap = products.map((product) => ({
    url: `${baseUrl}/product/${product.urlTitle}/`,
    ...defaultOptions,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "yearly",
      priority: 1,
    },
    ...staticPageSitemap,
    ...productsSitemap,
  ];
}
