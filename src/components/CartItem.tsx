import { formatGoogleImageUrl } from "@/lib/utils";
import { ItemsProps, useCartStore } from "@/store";
import { useMemo } from "react";
import { Trash, MoveDown } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { Card } from "@/components/ui/card";

const CartItem = ({ product }: { product: ItemsProps }) => {
  const { removeItem, updateItemQuantity } = useCartStore();
  const { imageUrls, price, name, category, quantity, id, marketPrice } =
    product;

  const productMainImage = useMemo(
    () => formatGoogleImageUrl(imageUrls[0]?.url) || "/veges_logo.png",
    [imageUrls]
  );

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const totalPrice = price * quantity;
  const totalMarketPrice = (marketPrice || 0) * quantity;

  const showSavings = marketPrice && marketPrice > price;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateItemQuantity({ id, quantity: newQuantity });
    }
  };

  return (
    <Card className="p-3 mb-3 overflow-hidden text-wrap">
      <div className="flex items-start space-x-4">
        {/* Image Container */}
        <div className="relative w-28 h-28 flex-shrink-0">
          <Image
            src={productMainImage}
            alt={name}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 96px, 96px"
            loading="lazy"
            quality={75}
          />
        </div>

        {/* Text & Price Information */}
        <div className="flex-grow">
          <h3 className="text-2xl font-bold">{name}</h3>
          {category}

          {/* Total Price & Savings */}
          <div className="mt-2">
            <p className="text-base font-semibold text-gray-900">
              {formatPrice(totalPrice)}
            </p>
            {showSavings && (
              <div className="mt-1 flex items-center text-xs text-green-600">
                <MoveDown className="mx-1" size={10} />
                <span>{totalMarketPrice - totalPrice}%</span>
                <span className="ml-2 text-gray-400 line-through">
                  {formatPrice(totalMarketPrice)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-2" />

      <div className="flex justify-evenly">
        <div className="bg-gray-100 px-3 rounded-3xl">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(quantity - 1)}
            aria-label="Decrease quantity"
            disabled={quantity === 1}
          >
            -
          </Button>
          <span className="px-3 font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </Button>
        </div>
        <Button
          aria-label="Remove item"
          onClick={() => removeItem(id)}
          variant="outline"
        >
          <Trash size={18} /> Remove
        </Button>
      </div>
    </Card>
  );
};

export default CartItem;
