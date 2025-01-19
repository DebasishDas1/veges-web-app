import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true, // Allow everyone to read the products
    create: ({ req: { user } }) => user?.role === "admin", // Only admin users can create products
    update: ({ req: { user } }) => user?.role === "admin", // Only admin users can update products
    delete: ({ req: { user } }) => user?.role === "admin", // Only admin users can delete products
  },
  upload: {
    staticDir: "uploads", // Directory to store uploaded files
    mimeTypes: ["image/*"], // Restrict uploads to image files
  },
  fields: [
    {
      name: "altText",
      type: "text",
      required: true,
    },
  ],
};
