import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "product",
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === "admin",
    update: ({ req: { user } }) => user?.role === "admin",
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    // {
    //   name: "image",
    //   type: "upload",
    //   relationTo: "media",
    // },
    {
      name: "imageUrls",
      type: "array",
      label: "Image URLs",
      required: true,
      fields: [
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "stock",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "marketPrice",
      type: "number",
      min: 0,
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Spices Whole", value: "spices-whole" },
        { label: "Spices Powder", value: "spices-powder" },
        { label: "Rice", value: "rice" },
        { label: "Oil", value: "oil" },
      ],
      required: true,
    },
    {
      name: "unit",
      type: "text",
      required: true,
    },
    {
      name: "urlTitle",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
  ],
};
