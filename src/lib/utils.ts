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

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export function constructMetadata({
  title = "",
  description = "",
  noIndex = false,
  exact = false,
}: {
  title?: string;
  description?: string;
  noIndex?: boolean;
  exact?: boolean;
} = {}): Metadata {
  return {
    title: exact ? title : `${title} - Veges`,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@debasish",
    },
    metadataBase: new URL("https://www.veges.in/"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
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
