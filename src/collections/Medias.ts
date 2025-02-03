import { CollectionConfig } from "payload";

export const Medias: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === "admin",
    update: ({ req: { user } }) => user?.role === "admin",
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  upload: {
    staticDir: "uploads", // Local storage fallback (optional)
    mimeTypes: ["image/*"], // Restrict to images only
  },
  fields: [],
};
