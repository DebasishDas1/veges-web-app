"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useState } from "react";
import { ProductProp } from "@/lib/type";
import { formatPrice, formatGoogleImageUrl, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const DEFAULT_IMAGE = "/veges_logo.png";
const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

interface ProductItemProps {
  product: ProductProp;
  priority?: boolean;
}

const ProductItem = memo(function ProductItem({
  product,
  priority = false,
}: ProductItemProps) {
  const { name, stock, price, marketPrice, imageUrls, urlTitle } = product;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const productMainImage =
    formatGoogleImageUrl(imageUrls[0]?.url) || DEFAULT_IMAGE;
  const isOutOfStock = stock === 0;

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    setIsError(false);
  }, []);

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.currentTarget;
      target.src = DEFAULT_IMAGE;
      target.alt = "Default product image";
      setIsError(true);
      setIsLoading(false);
    },
    []
  );

  return (
    <Link
      href={`/product/${encodeURIComponent(urlTitle)}`}
      className="p-2 py-8 md:p-6 flex flex-col items-center gap-3 shadow-lg md:shadow-md rounded-2xl cursor-pointer bg-white group focus:ring-2 focus:ring-green-500"
    >
      <div className="relative h-[200px] w-[200px] flex items-center justify-center overflow-hidden">
        {isLoading && !isError && (
          <Skeleton className="absolute inset-0 rounded-xl bg-gray-100 animate-pulse" />
        )}

        <Image
          src={productMainImage}
          alt={name || "Product image"}
          quality={80}
          priority={priority}
          sizes="(max-width: 640px) 50vw, 200px"
          className={cn(
            "object-contain rounded-xl transition-opacity duration-300",
            isOutOfStock && "opacity-50 blur-sm",
            isLoading && "opacity-0"
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          fill
        />

        {isOutOfStock && (
          <Badge className="absolute bottom-2 bg-red-50 text-red-500">
            Out of Stock
          </Badge>
        )}
      </div>

      <div className="w-full text-center space-y-2">
        <div
          aria-label={name || "Unknown Product"}
          className="font-black text-2xl truncate"
        >
          {name || "Unknown Product"}
        </div>
        <div className="flex gap-3 items-center justify-center font-bold">
          <h3 className="text-green-800 dark:text-green-400">
            {formatPrice(price)}
          </h3>
          {marketPrice && (
            <h3 className="line-through text-gray-600">
              {formatPrice(marketPrice)}
            </h3>
          )}
        </div>
      </div>
    </Link>
  );
});

ProductItem.displayName = "ProductItem";
export default ProductItem;
