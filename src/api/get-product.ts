import { getPayload } from "payload";
import configPromise from "@payload-config";

interface getProductListProps {
  filter?: string;
}

export const getProductList = async ({ filter }: getProductListProps) => {
  const payload = await getPayload({ config: configPromise });

  const whereClause = filter
    ? {
        category: {
          equals: filter,
        },
      }
    : undefined;

  const { docs: products } = await payload.find({
    collection: "product",
    where: whereClause,
  });

  return products;
};

export const getProductDetailsByName = async ({
  urlTitle,
}: {
  urlTitle: string;
}) => {
  const payload = await getPayload({ config: configPromise });

  const { docs: products } = await payload.find({
    collection: "product",
    where: {
      urlTitle: {
        equals: urlTitle,
      },
    },
  });

  return products[0];
};
