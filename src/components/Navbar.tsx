"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import MobileNav from "./MobileNav";
import Image from "next/image";
import Bag from "./Bag";
import { getUserData } from "@/api/user-auth";
import { product_categories } from "@/lib/links";
import React from "react";
import MobileSearch from "./MobileSearch";
import ProfileAvatar from "./ProfileAvatar";
import { GetUserDataProp } from "@/lib/type";
import MegaMenu from "./MegaMenu";

const Navbar = () => {
  const [userData, setUserData] = useState<GetUserDataProp>();
  const [isMegaMenuHovered, setIsMegaMenuHovered] = useState(false);

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
    <div
      className={`${
        isMegaMenuHovered ? "bg-white" : "bg-white/30"
      } backdrop-blur-3xl sticky z-50 top-0 inset-x-0 h-14 transition-colors duration-300`}
    >
      <header className="relative">
        <MaxWidthWrapper className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center justify-between ">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" aria-label="Home">
              <div className="h-7 w-20 relative overflow-hidden md:mx-auto">
                <Image
                  src="/veges_logo.png"
                  alt="Logo"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="80px"
                />
              </div>
            </Link>

            {/* Desktop mega menu Navigation */}
            <div className="hidden md:flex gap-14 ml-14">
              {product_categories.map((item) => (
                <div
                  key={item.category}
                  className="group"
                  // Set the state on hover to update the Navbar background
                  onMouseEnter={() => setIsMegaMenuHovered(true)}
                  onMouseLeave={() => setIsMegaMenuHovered(false)}
                >
                  <div className="text-lg font-semibold border-b-[3px] border-transparent hover:border-black">
                    <Link href={item.href}>{item.category}</Link>
                    {item.productList && (
                      <MegaMenu
                        productList={item.productList}
                        description={item.description}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <Bag />
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
            <Bag />
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
