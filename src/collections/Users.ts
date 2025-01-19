import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  access: {
    read: () => true, // Allow everyone to read the products
    create: ({ req: { user } }) => user?.role === "admin", // Only admin users can create products
    update: ({ req: { user } }) => user?.role === "admin", // Only admin users can update products
    delete: ({ req: { user } }) => user?.role === "admin", // Only admin users can delete products
  },
  fields: [
    {
      name: "role",
      defaultValue: "user",
      required: true,
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
    {
      name: "email",
      required: true,
      type: "email",
    },
  ],
};
