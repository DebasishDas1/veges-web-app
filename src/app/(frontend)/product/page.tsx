import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductList from "@/components/ProductList";
import { getProductList } from "@/api/get-product";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Fresh Produce",
  description: "One stop destination for all your Biryani requirements",
});

const page = async () => {
  const products = await getProductList({});
  return (
    <MaxWidthWrapper className="py-14">
      <ProductList list={products} title="Fresh Produce" />
    </MaxWidthWrapper>
  );
};

export default page;
