import { getPayload } from "payload";
import configPromise from "@payload-config";

export const userSignup = async ({
  email,
  password,
}: {
  email?: string;
  password?: string;
}) => {
  const payload = await getPayload({ config: configPromise });
  if (email) {
    const { docs: users } = await payload.find({
      collection: "users",
      pagination: false,
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (users.length !== 0 && email !== "") {
      return { success: false, sentToEmail: email };
    }

    await payload.create({
      collection: "users",
      data: {
        email,
        password,
        role: "user",
      },
    });
  }

  return { success: true, sentToEmail: email };
};
