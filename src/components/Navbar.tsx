"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import MobileNav from "./MobileNav";
import Image from "next/image";
import NavItem from "./NavItem";
import Cart from "./Cart";
import { useRef, useState, useCallback, RefObject, useEffect } from "react";
import { product_categories } from "@/lib/bin/product_categories";
import { useOnClickOutside } from "@/hook/use-on-click-outside";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const navRef = useRef<HTMLDivElement>(null) as RefObject<HTMLElement>;

  const isAnyOpen = activeIndex !== null;

  // Close dropdowns when clicking outside
  useOnClickOutside(navRef, () => {
    if (isAnyOpen) {
      setActiveIndex(null);
    }
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  const handleOpen = useCallback((index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const closeAll = useCallback(() => {
    setActiveIndex(null);
  }, []);

  return (
    <div className="backdrop-blur-3xl bg-white/30 sticky z-50 top-0 inset-x-0 h-14">
      <header className="relative" ref={navRef}>
        <MaxWidthWrapper>
          <div className="flex h-14 items-center">
            {/* Logo */}
            <div className="flex">
              <Link href="/" className="flex-shrink-0 mx-6">
                <div className="h-7 w-20 relative overflow-hidden">
                  <Image
                    src="/icon2.png"
                    alt="Logo"
                    fill
                    priority
                    className="object-cover object-center"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="z-50 lg:ml-8 lg:block lg:self-stretch">
              <nav className="hidden md:flex h-full gap-2">
                {product_categories.map((category, i) => {
                  const isOpen = i === activeIndex;

                  return (
                    <NavItem
                      key={category.value}
                      category={category}
                      isOpen={isOpen}
                      isAnyOpen={isAnyOpen}
                      handleOpen={() => handleOpen(i)}
                      close={closeAll}
                    />
                  );
                })}
              </nav>
            </div>

            {/* Cart and Mobile Navigation */}
            <div className="ml-auto flex items-center">
              {/* Cart */}
              <div className="hidden md:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <div className="ml-4 flow-root lg:ml-6">
                  <Cart />
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex md:hidden items-end ml-auto mr-3">
                <MobileNav />
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
