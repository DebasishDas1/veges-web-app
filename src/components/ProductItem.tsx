"use client";

import Image from "next/image";
import { ProductProp } from "@/lib/type";
import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const ProductItem = ({
  image,
  name,
  price,
  urlTitle,
  marketPrice = null,
  available = true,
}: ProductProp) => {
  const router = useRouter(); // Initialize the router

  const imageUrl =
    typeof image === "string" ? image : image?.url || "/vegesLogo.png";

  const handleRedirect = () => {
    router.push(`/product/${urlTitle}`);
  };

  return (
    <div
      className="p-2 py-6 md:p-6 flex flex-col items-center justify-center gap-3 shadow-md rounded-2xl hover:scale-105 hover:shadow-md transition-all ease-in-out cursor-pointer bg-white group"
      onClick={handleRedirect} // Add click handler for redirection
    >
      <div className="relative h-[200px] w-[200px] flex items-center justify-center overflow-hidden">
        <Image
          src={imageUrl} // Use the resolved image URL
          alt={name}
          width={500}
          height={200}
          className={`object-contain max-h-full max-w-full rounded-xl transition-opacity duration-300 ${
            available ? "opacity-100" : "opacity-50 blur-sm"
          }`}
        />
      </div>

      <h2 className="font-black text-xl text-center truncate w-full">
        {name || "Unknown Product"}
      </h2>

      <div className="flex gap-3 items-center">
        {price !== null && <h2 className="font-bold">{formatPrice(price)}</h2>}
        {marketPrice && (
          <h2 className="line-through text-gray-400">
            {formatPrice(marketPrice)}
          </h2>
        )}
        {!available && (
          <Badge className="bg-red-50 text-red-500">Out of Stock</Badge>
        )}
      </div>

      <Button
        variant="outline"
        className="group-hover:bg-primary group-hover:text-white"
      >
        {name || "Product"} Details
      </Button>
    </div>
  );
};

export default ProductItem;
