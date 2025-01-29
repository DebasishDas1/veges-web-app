"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import MobileNav from "./MobileNav";
import Image from "next/image";
import Cart from "./Cart";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getUserData } from "@/api/user-auth";
import { product_categories } from "@/lib/bin/product_categories";
import React from "react";
import { cn } from "@/lib/utils";
import MobileSearch from "./MobileSearch";
import ProfileAvatar from "./ProfileAvatar";
import { GetUserDataProp } from "@/lib/type";

const Navbar = () => {
  const [userData, setUserData] = useState<GetUserDataProp>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData({
          success: false,
          user: null,
          error: "Failed to fetch user data",
        });
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="backdrop-blur-3xl bg-white/30 sticky z-50 top-0 inset-x-0 h-14">
      <header className="relative">
        <MaxWidthWrapper className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center justify-between ">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" aria-label="Home">
              <div className="h-7 w-20 relative overflow-hidden md:mx-auto">
                <Image
                  src="/icon2.png"
                  alt="Logo"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
            </Link>

            {/* Desktop option Navigation */}
            <div className="hidden md:flex lg:ml-8 lg:block lg:self-stretch">
              <nav
                className="hidden md:flex h-full gap-2"
                aria-label="Main Navigation"
              >
                <NavigationMenu>
                  <NavigationMenuList>
                    {product_categories.map((categories, i) => (
                      <NavigationMenuItem key={i}>
                        <NavigationMenuTrigger className="font-bold text-lg bg-transparent">
                          {categories.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[800px] gap-3 p-4 grid-cols-2">
                            {categories.featured.map((item) => (
                              <ListItem
                                key={item.name}
                                title={item.name}
                                href={item.href}
                              >
                                {item.name}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </nav>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <Cart />
            <ProfileAvatar
              loggedIn={userData?.success}
              avatarName={userData?.user?.email}
            />
            <MobileSearch />
            <MobileNav />
          </div>

          {/* Cart and Desktop Navigation */}
          <div className="hidden md:flex">
            <ProfileAvatar
              loggedIn={userData?.success}
              avatarName={userData?.user?.email}
            />
            <Cart />
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-3xl font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
