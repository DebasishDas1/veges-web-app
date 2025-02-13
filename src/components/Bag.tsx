"use client";

import { ShoppingBag, PiggyBank } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "./ui/sheet";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store";

const Bag = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { items } = useCartStore();

  const itemCount = items.length;
  const cartTotal = items.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const savingsTotal = items.reduce(
    (total, product) =>
      total + ((product.marketPrice ?? 0) - product.price) * product.quantity,
    0
  );
  const fee = 1;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Sheet>
      <SheetTrigger
        className="group -m-2 flex items-center p-2"
        aria-label="Open Shopping Bag"
      >
        <ShoppingBag
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0"
          aria-label={"Shopping Bag"}
        />
        <span className="ml-2 text-sm font-medium hidden md:flex">
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-l">
        <SheetHeader className="space-y-2.5 pr-6 text-border">
          <SheetTitle>Bag ({itemCount})</SheetTitle>
          <SheetDescription>Pick up where you left off</SheetDescription>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="bg-green-200 font-bold p-2 w-[95%] rounded-xl text-xl flex gap-3 items-center justify-center">
              <PiggyBank size={30} />
              Savings: {formatPrice(savingsTotal)}
            </div>
            <div className="flex w-full flex-col pr-5 max-h-[65%]">
              <ScrollArea className="whitespace-nowrap rounded-md p-2 bg-gray-100">
                {items.map((product) => (
                  <CartItem product={product} key={product.id} />
                ))}
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(cartTotal + fee)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/bag"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <Image
                src="/veges_empty_cart.png"
                fill
                alt="empty shopping Bag"
              />
            </div>
            <div className="text-xl font-semibold">Your Bag is empty</div>
            <SheetTrigger asChild>
              <Link
                href="/bag"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your Bag to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Bag;
