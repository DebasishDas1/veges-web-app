import { getProductDetailsByName } from "@/api/get-product";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductPageItemDetails from "@/components/ProductPageItemDetails";

interface PageProps {
  params: Promise<{ productName: string }>;
}

const page = async ({ params }: PageProps) => {
  const { productName } = await params;
  const product = await getProductDetailsByName({ urlTitle: productName });

  return (
    <MaxWidthWrapper className="pb-12 pt-4">
      <ProductPageItemDetails {...product} />
    </MaxWidthWrapper>
  );
};

export default page;
