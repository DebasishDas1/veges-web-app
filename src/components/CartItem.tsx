import { formatGoogleImageUrl } from "@/lib/utils";
import { ItemsProps, useCartStore } from "@/store";
import { useMemo } from "react";
import { Trash } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";

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
    <div className="p-4 bg-white rounded-md shadow-md mb-3">
      <div className="flex gap-4 group">
        {/* Image Section */}
        <div className="w-24 h-24 mx-auto md:mx-0 relative flex-shrink-0">
          <Image
            src={productMainImage}
            alt={name}
            fill
            className="object-contain rounded-lg border"
            sizes="(max-width: 640px) 96px, 96px"
            loading="lazy"
            quality={75}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-2 text-center md:text-left">
          {/* Title & Remove Button */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col items-start">
              <h3 className="text-2xl font-black">{name}</h3>
              <Badge variant="outline">{category}</Badge>
            </div>
            <button
              onClick={() => removeItem(id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <Trash size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Price & Quantity Controls */}
      <div className="flex items-center justify-between gap-2 pt-2">
        <div className="flex items-center gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-1.5">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity === 1}
              className="text-gray-600 hover:text-gray-900 disabled:text-gray-300 text-lg"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-6 text-center font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="text-gray-600 hover:text-gray-900 text-lg"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Unit Price */}
          {/* <span className="text-sm text-gray-600">
              {formatPrice(price)} each
            </span> */}
        </div>

        {/* Total Price & Savings */}
        <div className="text-right">
          <p className="text-base font-semibold text-gray-900">
            {formatPrice(totalPrice)}
          </p>
          {showSavings && (
            <div className="text-xs text-green-600">
              Save {formatPrice(totalMarketPrice - totalPrice)}
              <span className="ml-2 text-gray-400 line-through">
                {formatPrice(totalMarketPrice)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
