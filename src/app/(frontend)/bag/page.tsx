import { constructMetadata } from "@/lib/utils";
import CheckoutPageItems from "@/components/CheckoutPageItems";

export const metadata = constructMetadata({
  title: "Bag",
  noIndex: true,
});

const page = () => {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-16 lg:max-w-7xl lg:px-32 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Bag
      </h1>
      <CheckoutPageItems />
    </div>
  );
};

export default page;
