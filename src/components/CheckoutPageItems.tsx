"use client";

import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import { useMemo } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import CartItem from "./CartItem";
import { PiggyBank } from "lucide-react";

const CheckoutPageItems = () => {
  const { items } = useCartStore();

  const fee = 1;

  const cartTotal = useMemo(
    () =>
      items.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      ),
    [items]
  );

  const savingsTotal = items.reduce(
    (total, product) =>
      total + ((product.marketPrice ?? 0) - product.price) * product.quantity,
    0
  );

  return (
    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
      {/* Empty Bag */}
      {items.length === 0 && (
        <div className="lg:col-span-12 py-28 flex flex-col items-center justify-center">
          <Image
            src="/veges_empty_cart.png"
            width={160}
            height={160}
            loading="eager"
            alt="Empty shopping cart"
            className="mb-4"
          />
          <h3 className="text-2xl font-semibold">Your bag is empty</h3>
          <p className="text-center text-muted-foreground">
            Whoops! Nothing to show here yet.
          </p>
        </div>
      )}

      {/* Bag Content */}
      {items.length > 0 && (
        <div className="bg-green-200 font-bold p-4 w-full rounded-xl text-xl flex gap-3 items-center justify-center md:hidden my-3">
          <PiggyBank size={30} />
          Savings: {formatPrice(savingsTotal)}
        </div>
      )}

      {/* Bag Content */}
      {items.length > 0 && (
        <ul className="lg:col-span-7 py-4 text-start md:mx-10">
          {items.map((product) => (
            <CartItem product={product} key={product.id} />
          ))}
        </ul>
      )}

      {/* Summary */}
      {items.length > 0 && (
        <section className="mt-16 rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 className="text-lg font-medium">Order Summary</h2>
          <div className="bg-green-200 font-bold p-4 w-full rounded-xl text-xl md:flex gap-3 items-center justify-center mt-6 hidden">
            <PiggyBank size={30} />
            Savings: {formatPrice(savingsTotal)}
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-6">
              <p className="text-sm text-gray-600">Subtotal</p>
              <p className="text-sm font-medium text-gray-900">
                {formatPrice(cartTotal)}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 py-4">
            <span className="text-sm text-muted-foreground">
              Flat Transaction Fee
            </span>
            <p className="text-sm font-medium text-gray-900">
              {formatPrice(fee)}
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <span className="text-base font-medium text-gray-900">
              Order Total
            </span>
            <p className="text-base font-medium text-gray-900">
              {formatPrice(cartTotal + fee)}
            </p>
          </div>
          <div className="mt-6">
            <Button disabled={true} className="w-full" size="lg">
              Buy
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default CheckoutPageItems;
