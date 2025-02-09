import { StaticImageData } from "next/image";
import { User } from "../../payload-types";
import { LucideIcon } from "lucide-react";
// import { execPath } from "process";

export interface NavItemProps {
  label: string;
  href: string;
}

export interface HeroSectionProp {
  imageSrc?: string | StaticImageData;
  imageAlt: string;
  title: string;
  subTitle?: string;
}

export interface ProductListProp {
  list: ProductProp[];
  title: string;
  emptyMessage?: string;
}

export interface googleImageProp {
  url: string;
  id: string;
}

export interface ProductProp {
  id: string;
  urlTitle: string;
  name: string;
  image?: (string | null) | Media;
  imageUrls: googleImageProp[];
  price: number;
  marketPrice?: number | null;
  category?: string | null;
  unit?: string;
  stock: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  alt?: string | null;
  caption?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    square?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    small?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    medium?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    large?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    xlarge?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    og?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}

export interface GetUserDataProp {
  success: boolean;
  user: User | null;
  error?: string;
}

export interface UserAuthParams {
  email: string;
  password: string;
}

export interface ProfileAvatarProps {
  loggedIn?: boolean;
  avatarImage?: string;
  avatarName?: string;
}

export interface AdvantageProp {
  name: string;
  description: string;
  Icon: LucideIcon;
}
