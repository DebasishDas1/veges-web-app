import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { Users } from "@/collections/Users";
import { Products } from "@/collections/Products";
import { Medias } from "@/collections/Medias";
import { Orders } from "@/collections/Orders";
import { Categories } from "@/collections/Categories";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Users, Products, Medias, Orders, Categories],
  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  typescript: {
    outputFile: "./payload-types.ts",
  },
  sharp,
});
