import { getProductDetailsByName } from "@/api/get-product";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductPageItemDetails from "@/components/ProductPageItemDetails";
import { constructMetadata } from "@/lib/utils";
import BenefitFromVeges from "@/components/BenefitFromVeges";

interface PageProps {
  params: Promise<{ productName: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { productName } = await params;
  const product = await getProductDetailsByName({
    urlTitle: productName,
  });

  return constructMetadata({
    title: `${product.name}`,
    description: product.description,
  });
}

const page = async ({ params }: PageProps) => {
  const { productName } = await params;
  const product = await getProductDetailsByName({ urlTitle: productName });

  return (
    <MaxWidthWrapper className="pb-12 pt-4">
      <ProductPageItemDetails {...product} />
      <BenefitFromVeges stock={product.stock} />
    </MaxWidthWrapper>
  );
};

export default page;
