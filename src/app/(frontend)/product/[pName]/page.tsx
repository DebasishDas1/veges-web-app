import { getProductDetailsByName } from "@/api/get-product";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductPageItemDetails from "@/components/ProductPageItemDetails";
import { constructMetadata } from "@/lib/utils";
import BenefitFromVeges from "@/components/BenefitFromVeges";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pName: string }>;
}) {
  const product = await getProductDetailsByName({
    urlTitle: (await params).pName,
  });

  return constructMetadata({
    title: product.name,
    description: product.description,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ pName: string }>;
}) {
  const product = await getProductDetailsByName({
    urlTitle: (await params).pName,
  });

  return (
    <MaxWidthWrapper className="pb-12 pt-4">
      <ProductPageItemDetails {...product} />
      <BenefitFromVeges stock={product.stock} />
    </MaxWidthWrapper>
  );
}
