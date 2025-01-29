import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === "admin",
    update: ({ req: { user } }) => user?.role === "admin",
    delete: ({ req: { user } }) => user?.role === "admin",
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
