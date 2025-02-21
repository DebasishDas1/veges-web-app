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
import { Heart, Share2, Trophy, Leaf, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { ProductProp } from "@/lib/type";
import { toast } from "sonner";
import { useState, useMemo, useCallback } from "react";
import { useCartStore } from "@/store";

const DEFAULT_IMAGE = "/veges_logo.png";
const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

const QUALITY_BADGES = [
  { icon: ShoppingBag, text: "Premium Sourcing", color: "green" },
  { icon: Trophy, text: "Best Flavors", color: "blue" },
  { icon: Leaf, text: "Wholesome Goodness", color: "yellow" },
];

const ProductPageItemDetails = (product: ProductProp) => {
  const {
    name,
    imageUrls,
    stock,
    category,
    unit,
    description,
    price,
    marketPrice,
  } = product;
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = stock === 0;
  const { addItem, updateItemQuantity } = useCartStore();

  const productMainImage = useMemo(
    () => formatGoogleImageUrl(imageUrls[0]?.url) || DEFAULT_IMAGE,
    [imageUrls]
  );

  const breadcrumbCategory = useMemo(
    () => category?.replace(/\s+/g, "-").toLowerCase(),
    [category]
  );

  const handleAddToCart = useCallback(() => {
    addItem(product, quantity);
    toast.success(`${name} ${quantity} (${unit}) added to cart`);
  }, [name, quantity, unit, addItem, product]);

  const handleShare = useCallback(() => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => toast.info("Product link copied to clipboard"))
      .catch(() => toast.error("Failed to copy link"));
  }, []);

  const handleQuantityChange = useCallback(
    (delta: number) => {
      setQuantity((prev) => {
        const newQuantity = Math.max(1, prev + delta);
        if (newQuantity !== prev) {
          toast.info(`${name} ${newQuantity} (${unit}) is added`);
        }
        updateItemQuantity({ id: product.id, quantity: newQuantity });
        return newQuantity;
      });
    },
    [name, unit, updateItemQuantity, product.id]
  );

  const descriptionLines = useMemo(
    () => description.split("\n"),
    [description]
  );

  return (
    <div className="mx-auto max-w-2xl py-14 px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 bg-white rounded-3xl shadow-lg">
      {/* Product Image Section */}
      <div className="aspect-auto rounded-lg relative group py-6">
        <Image
          src={productMainImage}
          alt={name}
          width={600}
          height={400}
          className="object-contain w-full h-full rounded-xl transition-opacity opacity-0 duration-500"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
            e.currentTarget.alt = "Fallback product image";
          }}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
            <span className="text-white text-2xl font-bold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Details Section */}
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

        {/* Pricing Section */}
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

        {/* Product Description */}
        <div className="prose mb-8">
          <h3 className="text-lg font-semibold mb-2">Product Details</h3>
          <div className="space-y-2">
            {descriptionLines.map((line, index) => (
              <p key={index} className="text-muted-foreground">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Quality Badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          {QUALITY_BADGES.map(({ icon: Icon, text, color }) => (
            <div
              key={text}
              className={`flex items-center gap-1.5 bg-${color}-100 px-3 py-1.5 rounded-full text-sm border-black border`}
            >
              <Icon className="w-4 h-4" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Interaction Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10"
                onClick={() => handleQuantityChange(-1)}
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
                onClick={() => handleQuantityChange(1)}
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
        </div>
      </div>
    </div>
  );
};

export default ProductPageItemDetails;
