import type { CollectionConfig } from "payload";

export const Product: CollectionConfig = {
  slug: "product",
  fields: [
    {
      name: "title",
      type: "text",
    },
  ],
};
