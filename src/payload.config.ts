import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { Users } from "@/collections/Users";
import { Product } from "@/collections/Product";
import { Media } from "@/collections/Media";
import { Orders } from "@/collections/Orders";
import { Categories } from "@/collections/Categories";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Users, Product, Media, Orders, Categories],
  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  typescript: {
    outputFile: "./payload-types.ts",
  },
  sharp,
});
