"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
// import { usePathname } from "next/navigation";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

type ProductListItem = {
  title: string;
  href: string;
  items: { name: string; href: string }[];
};

const MobileNav = () => {
  // const pathname = usePathname();
  // const pathnameList = useMemo(() => pathname.split("/"), [pathname]);

  // Flatten all productList arrays from the categories into one array and memoize it
  const allProductLists = useMemo<ProductListItem[]>(
    () => product_categories.flatMap((category) => category.productList),
    []
  );

  // State to track the selected product list
  const [selectedProductList, setSelectedProductList] =
    useState<ProductListItem | null>(null);

  return (
    <Sheet>
      <SheetTrigger asChild aria-label="Open navigation menu">
        <Menu aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="top" role="dialog" aria-modal="true">
        <SheetHeader>
          <SheetTitle className="hidden">Navigation</SheetTitle>
          <SheetDescription className="hidden">
            Browse through items.
          </SheetDescription>
        </SheetHeader>
        <div className="py-8 text-wrap">
          <AnimatePresence mode="wait">
            {selectedProductList ? (
              <motion.div
                key="product-list-items"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Header with Back Button and Selected Title */}
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => setSelectedProductList(null)}
                    className="mr-2 text-xl font-semibold"
                    aria-label="Go back"
                  >
                    &larr;
                  </button>
                  <h2 className="text-lg font-bold text-gray-500">
                    {selectedProductList.title}
                  </h2>
                </div>
                {/* List of Items for the Selected Product List */}
                <div className="pl-4 py-2">
                  {selectedProductList.items.map((item) => (
                    <SheetClose asChild key={item.href || item.name}>
                      <Link
                        href={item.href}
                        className={`block py-3 text-3xl font-bold cursor-pointe`}
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="product-list-titles"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* List of Product List Titles */}
                {allProductLists.map((productList) => (
                  <div key={productList.href || productList.title}>
                    <div
                      onClick={() => setSelectedProductList(productList)}
                      className="flex justify-between w-full py-3 text-3xl font-bold cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSelectedProductList(productList);
                        }
                      }}
                    >
                      {productList.title}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
