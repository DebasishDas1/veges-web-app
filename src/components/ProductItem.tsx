"use client";

import Image from "next/image";
import { ProductProp } from "@/lib/type";
import { formatPrice, formatGoogleImageUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ProductItemProps {
  product: ProductProp;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const router = useRouter();
  const { name, stock, price, marketPrice, imageUrls, urlTitle } = product;

  const [formattedPrice, setFormattedPrice] = useState("");
  const [formattedMarketPrice, setFormattedMarketPrice] = useState("");

  useEffect(() => {
    setFormattedPrice(formatPrice(price));
    setFormattedMarketPrice(marketPrice ? formatPrice(marketPrice) : "");
  }, [price, marketPrice]);

  const productMainImage =
    formatGoogleImageUrl(imageUrls[0]?.url) || "/icon2.png";

  const handleRedirect = () => {
    router.push(`/product/${encodeURIComponent(urlTitle)}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="p-2 py-8 md:p-6 flex flex-col items-center gap-3 shadow-lg md:shadow-md 
      rounded-2xl cursor-pointer bg-white group focus:ring-2 focus:ring-green-500 shadow-green-200"
      onClick={handleRedirect}
      onKeyDown={(e) => e.key === "Enter" && handleRedirect()}
    >
      <div className="relative h-[200px] w-[200px] flex items-center justify-center overflow-hidden">
        <Image
          src={productMainImage}
          alt={name || "Product image"}
          width={500}
          height={200}
          quality={80}
          priority={false}
          className={cn(
            "object-contain max-h-full max-w-full rounded-xl transition-opacity duration-300",
            stock === 0 ? "opacity-50 blur-sm" : "opacity-100"
          )}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/icon2.png";
            target.alt = "Default product image";
          }}
        />
        {stock === 0 && (
          <Badge className="absolute bottom-2 bg-red-50 text-red-500">
            Out of Stock
          </Badge>
        )}
      </div>
      <button
        aria-label={name || "Unknown Product"}
        className="font-black text-2xl text-center truncate w-full focus:ring-2 focus:ring-white"
      >
        {name || "Unknown Product"}
      </button>
      <div className="flex gap-3 items-center font-bold">
        <h3 className="text-green-800 dark:text-green-400">{formattedPrice}</h3>
        {marketPrice && (
          <h3 className="line-through text-gray-600">{formattedMarketPrice}</h3>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
