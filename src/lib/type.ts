import { StaticImageData } from "next/image";

export interface NavItemProps {
  text: string;
  url: string;
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
  filter?: string;
}

export interface ProductProp {
  name: string;
  image: string;
  marketPrice?: number | null;
  price: string;
  description: string;
  unit?: string;
  available?: boolean;
  category?: string | null;
}
