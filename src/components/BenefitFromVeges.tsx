import { Check, Shield, Truck, Lock, Leaf } from "lucide-react";
import { useMemo } from "react";

interface BenefitFromVegesProps {
  stock: number;
}

const BenefitFromVeges = ({ stock }: BenefitFromVegesProps) => {
  const stockMessage = useMemo(
    () => (stock > 0 ? "Item in stock" : "Restocking soon"),
    [stock]
  );

  const features = [
    { icon: Check, text: stockMessage, color: "text-green-500" },
    { icon: Shield, text: "30 Day Return Guarantee", color: "text-gray-500" },
    {
      icon: Truck,
      text: `Free Delivery`,
      color: "text-blue-500",
    },
    { icon: Lock, text: "Secure Payment Checkout", color: "text-purple-500" },
    { icon: Leaf, text: "Eco-Friendly Packaging", color: "text-amber-500" },
  ];

  return (
    <div className="mx-auto py-6 px-6 mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 bg-white rounded-3xl shadow-lg border border-gray-200">
      {features.map(({ icon: Icon, text, color }) => (
        <div
          key={text}
          className="flex items-center text-sm text-muted-foreground"
        >
          <Icon className={`h-5 w-5 flex-shrink-0 mr-2 ${color}`} />
          {text}
        </div>
      ))}
    </div>
  );
};

export default BenefitFromVeges;
