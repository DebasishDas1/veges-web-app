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
    <div className="p-2 py-8 md:p-6 flex flex-col items-center gap-3 shadow-lg md:shadow-md rounded-2xl cursor-pointer bg-white group">
      <div className="relative h-[200px] w-[200px] flex items-center justify-center overflow-hidden">
        <Image
          src={productMainImage}
          alt={"Product image"}
          width={500}
          height={200}
          quality={80}
          priority={false}
          className={cn(
            "object-contain max-h-full max-w-full rounded-xl transition-opacity duration-300",
            stock === 0 ? "opacity-50 blur-sm" : "opacity-100"
          )}
          onClick={handleRedirect}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/icon2.png";
          }}
        />
        {stock === 0 && (
          <Badge className="absolute bottom-2 bg-red-50 text-red-500">
            Out of Stock
          </Badge>
        )}
      </div>
      <h2
        className="font-black text-2xl text-center truncate w-full"
        onClick={handleRedirect}
      >
        {name || "Unknown Product"}
      </h2>
      <div className="flex gap-3 items-center font-bold">
        {price && <h3 className="text-green-700">{formattedPrice}</h3>}
        {marketPrice && (
          <h3 className="line-through text-gray-400">{formattedMarketPrice}</h3>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
