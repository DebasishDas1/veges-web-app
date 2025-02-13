"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "./ui/sheet";
import { product_categories } from "@/lib/links";
import { Menu } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ProductCategory } from "@/lib/type";
import { subTitleCheck } from "@/lib/utils";

const MobileNav = () => {
  const pathnameList = usePathname().split("/");

  const renderNavItem = ({ productList }: ProductCategory): JSX.Element => {
    return (
      <>
        {productList.map((product) => (
          <SheetClose asChild key={product.href}>
            <Link
              href={product.href}
              className={`flex regular-16 py-3 text-2xl font-semibold outline-none ${
                subTitleCheck({ pathnameList, text: product.title })
                  ? "text-green-700"
                  : ""
              }`}
            >
              {product.title}
            </Link>
          </SheetClose>
        ))}
      </>
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild aria-label="Open navigation menu">
        <Menu aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        className="bg-white"
        side="top"
        role="dialog"
        aria-modal="true"
      >
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="flex pl-2 lg:ml-0">
              <span className="h-11 w-32 relative overflow-hidden">
                <Image
                  src="/veges_logo.png"
                  alt="logo"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 769px) 100vw, 1200px"
                />
              </span>
            </Link>
          </SheetTitle>
          <SheetDescription className="flex items-start pl-3 text-start">
            We understand your test.
          </SheetDescription>
        </SheetHeader>
        <div className="pl-3">
          {product_categories && (
            <div>
              {product_categories
                .filter((option) => option.category !== "Socials")
                .map((option, index) => (
                  <div key={option.category || index}>
                    {renderNavItem(option)}
                  </div>
                ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
