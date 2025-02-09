"use client";

import Image from "next/image";
import { ProductProp } from "@/lib/type";
import { formatPrice, formatGoogleImageUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { memo, useCallback, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DEFAULT_IMAGE = "/icon2.png";
const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

const ProductItem = memo(({ product, priority = false }: ProductItemProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { name, stock, price, marketPrice, imageUrls, urlTitle } = product;

  const handleRedirect = useCallback(() => {
    router.push(`/product/${encodeURIComponent(urlTitle)}`);
  }, [router, urlTitle]);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    setIsError(false);
  }, []);

  const handleImageError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const target = e.target as HTMLImageElement;
      target.src = DEFAULT_IMAGE;
      target.alt = "Default product image";
      setIsError(true);
      setIsLoading(false);
    },
    []
  );

  const productMainImage =
    formatGoogleImageUrl(imageUrls[0]?.url) || DEFAULT_IMAGE;
  const isOutOfStock = stock === 0;

  return (
    <div
      role="button"
      tabIndex={0}
      className="p-2 py-8 md:p-6 flex flex-col items-center gap-3 shadow-lg md:shadow-md 
      rounded-2xl cursor-pointer bg-white group focus:ring-2 focus:ring-green-500"
      onClick={handleRedirect}
      onKeyDown={(e) => e.key === "Enter" && handleRedirect()}
    >
      <div className="relative h-[200px] w-[200px] flex items-center justify-center overflow-hidden">
        {isLoading && !isError && (
          <Skeleton className="absolute inset-0 rounded-xl bg-gray-100 animate-pulse" />
        )}

        <Image
          src={productMainImage}
          alt={name || "Product image"}
          width={200}
          height={200}
          quality={80}
          priority={priority}
          sizes="(max-width: 640px) 50vw, 200px"
          className={cn(
            "object-contain max-h-full max-w-full rounded-xl transition-opacity duration-300",
            isOutOfStock && "opacity-50 blur-sm",
            isLoading && "opacity-0"
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
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
    </div>
  );
});

interface ProductItemProps {
  product: ProductProp;
  priority?: boolean;
}

ProductItem.displayName = "ProductItem";
export default ProductItem;
