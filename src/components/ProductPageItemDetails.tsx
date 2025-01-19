"use client";

import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { formatPrice } from "@/lib/utils";
import { Check, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { ProductProp } from "@/lib/type";
import { toast } from "sonner";

const ProductPageItemDetails = ({
  image,
  name,
  price,
  category,
  description,
  marketPrice,
}: ProductProp) => {
  const imageUrl =
    typeof image === "string" ? image : image?.url || "/vegesLogo.png";

  const addToCart = () => {
    toast.success(`${name} is Added to cart`);
  };

  return (
    <div className="mx-auto max-w-2xl py-14 px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 bg-white rounded-3xl shadow-xl">
      {/* Product images */}
      <div className="aspect-auto rounded-lg">
        {/* <ImageSlider urls={validUrls} /> */}
        <Image
          src={imageUrl}
          alt={"name"}
          width={500}
          height={200}
          className={`object-contain max-h-full max-w-full rounded-xl transition-opacity duration-300 `}
        />
      </div>

      {/* Product Details */}
      <div className="lg:max-w-lg lg:self-start">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/product">Product</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {name}
          </h1>
        </div>

        <section className="mt-4">
          <div className="flex items-center">
            <p className="font-medium text-black">{formatPrice(price)}</p>
            <p className="font-medium border-l ml-4 pl-4 text-gray-500">
              {formatPrice(marketPrice ?? "")}
            </p>

            <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
              {category}
            </div>
          </div>

          <div className="mt-4 space-y-6">
            <p className="text-base text-muted-foreground">{description}</p>
          </div>

          <div className="mt-6 flex items-center">
            <Check
              aria-hidden="true"
              className="h-5 w-5 flex-shrink-0 text-green-500"
            />
            <p className="ml-2 text-sm text-muted-foreground">
              Eligible for delivery
            </p>
          </div>
        </section>

        {/* add to cart part */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <div>
            <div className="mt-10">
              <Button className="w-full" onClick={addToCart}>
                Add to cart
              </Button>
            </div>
            <div className="mt-6 text-center">
              <div className="group inline-flex text-sm text-medium">
                <Shield
                  aria-hidden="true"
                  className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                />
                <span className="text-muted-foreground hover:text-gray-700">
                  30 Day Return Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageItemDetails;
