import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "INR";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "INR", notation = "compact" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(numericPrice)) return "Invalid Price";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    minimumFractionDigits: 2, // Ensure consistent decimal places
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export function constructMetadata({
  title = "",
  description = "",
  keywords = "",
  noIndex = false,
  exact = false,
}: {
  title?: string;
  description?: string;
  noIndex?: boolean;
  exact?: boolean;
  keywords?: string | string[];
} = {}): Metadata {
  return {
    title: exact ? title : `${title} - Veges`,
    description,
    openGraph: { title, description },
    keywords: Array.isArray(keywords) ? keywords.join(", ") : keywords,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@debasish",
    },
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.veges.in/"
    ),
    ...(noIndex && {
      robots: { index: false, follow: false },
    }),
  };
}

export const subTitleCheck = ({
  pathnameList,
  text,
}: {
  pathnameList: string[];
  text: string;
}) => {
  const updatedPathList = pathnameList.map((pathname) =>
    pathname.replaceAll("-", " ").toLowerCase()
  );

  return updatedPathList.includes(text.toLowerCase());
};

export function formatGoogleImageUrl(url?: string) {
  if (!url) return null;

  const match = url.match(/(?:\/d\/|id=)([^\/?]+)/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : url;
}
