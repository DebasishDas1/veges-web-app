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
import { formatGoogleImageUrl, formatPrice } from "@/lib/utils";
import {
  Check,
  Shield,
  Heart,
  Share2,
  Trophy,
  Leaf,
  ShoppingBag,
} from "lucide-react";
import { Button } from "./ui/button";
import { ProductProp } from "@/lib/type";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const ProductPageItemDetails = ({
  name,
  price,
  category,
  description,
  marketPrice,
  imageUrls,
  stock,
  unit,
}: ProductProp) => {
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = stock === 0;

  const handleAddToCart = () => {
    toast.success(`${name} ${quantity} (${unit}) added to cart`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.info("Product link copied to clipboard");
  };

  useEffect(() => {
    if (quantity === 1) {
      return;
    }

    toast.info(`${name} ${quantity} (${unit}) is added`);
  }, [quantity, name, unit]);

  const productMainImage =
    formatGoogleImageUrl(imageUrls[0]?.url) || "/icon2.png";

  const breadcrumbCategory = category?.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="mx-auto max-w-2xl py-14 px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 bg-white rounded-3xl shadow-lg">
      {/* Product images */}
      <div className="aspect-auto rounded-lg relative group py-6">
        <Image
          src={productMainImage}
          alt={name}
          width={600}
          height={400}
          className="object-contain w-full h-full rounded-xl"
          priority
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-product.jpg";
          }}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
            <span className="text-white text-2xl font-bold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="lg:max-w-lg lg:self-start">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/categories/${breadcrumbCategory}`}>
                {category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
          {name}
        </h1>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-baseline gap-4">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(price)}
            </span>
            {marketPrice && marketPrice > price && (
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(marketPrice)}
              </span>
            )}
          </div>
        </div>

        <div className="prose mb-8">
          <h3 className="text-lg font-semibold mb-2">Product Details</h3>
          <div className="space-y-2">
            {description.split("\n").map((line, index) => (
              <p key={index} className="text-muted-foreground">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Quality Badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-1.5 bg-green-100/80 px-3 py-1.5 rounded-full text-sm text-green-800 border border-green-200">
            <ShoppingBag className="w-4 h-4" />
            <span>Premium Sourcing</span>
          </div>
          <div className="flex items-center gap-1.5 bg-blue-100/80 px-3 py-1.5 rounded-full text-sm text-blue-800 border border-blue-200">
            <Trophy className="w-4 h-4" />
            <span>Best Flavors</span>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-100/80 px-3 py-1.5 rounded-full text-sm text-amber-800 border border-amber-200">
            <Leaf className="w-4 h-4" />
            <span>Wholesome Goodness</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={isOutOfStock}
                aria-label="Decrease quantity"
              >
                -
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10"
                onClick={() => setQuantity(quantity + 1)}
                disabled={isOutOfStock}
                aria-label="Increase quantity"
              >
                +
              </Button>
            </div>
            <Button
              className="flex-1 h-10"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleShare}
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4 mr-2" />
              Wishlist
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Check className="h-5 w-5 flex-shrink-0 text-green-500 mr-2" />
              {stock > 0 ? `Item in stock` : "Restocking soon"}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Shield className="h-5 w-5 flex-shrink-0 text-gray-400 mr-2" />
              30 Day Return Guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageItemDetails;
