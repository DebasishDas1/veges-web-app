import type { CollectionConfig } from "payload";

export const Product: CollectionConfig = {
  slug: "product",
  access: {
    read: () => true, // Allow everyone to read the products
    create: ({ req: { user } }) => user?.role === "admin", // Only admin users can create products
    update: ({ req: { user } }) => user?.role === "admin", // Only admin users can update products
    delete: ({ req: { user } }) => user?.role === "admin", // Only admin users can delete products
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "marketPrice",
      type: "number",
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
      name: "available",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "urlTitle",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
  ],
};
