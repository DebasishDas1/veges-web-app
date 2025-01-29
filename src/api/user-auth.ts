"use server";

import { getPayload } from "payload";
import configPromise from "@payload-config";
import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { GetUserDataProp, UserAuthParams } from "@/lib/type";

const payload = await getPayload({ config: configPromise });

export const userSignUp = async ({ email, password }: UserAuthParams) => {
  if (!email || !password) {
    return {
      success: false,
      error: "Email and password are required",
    };
  }

  try {
    // Check if the user already exists
    const { docs: existingUsers } = await payload.find({
      collection: "users",
      pagination: false,
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (existingUsers.length > 0) {
      return {
        success: false,
        sentToEmail: email,
        error: "The email already exists",
      };
    }

    // Create a new user
    await payload.create({
      collection: "users",
      data: {
        email,
        password,
        role: "user", // Set default role
      },
    });

    return {
      success: true,
      sentToEmail: email,
    };
  } catch (error) {
    return {
      success: false,
      error: `${error} : Failed to create user. Please try again later.`,
    };
  }
};

export const userSignIn = async ({ email, password }: UserAuthParams) => {
  const cookieStore = await cookies();

  if (!email || !password) {
    return {
      success: false,
      error: "Email and password are required",
    };
  }

  try {
    // Use payload.login to authenticate the user
    const loginResponse = await payload.login({
      collection: "users",
      data: {
        email,
        password,
      },
    });

    // Serialize token into a secure cookie
    cookieStore.set({
      name: "veges_token",
      value: `${loginResponse.token}`,
      httpOnly: true,
      path: "/",
    });

    return {
      success: true,
      error: "",
    };
  } catch (error) {
    return {
      success: false,
      error: `${error} Failed to sign in. Please try again later.`,
    };
  }
};

export const userDataId = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("veges_token");
    if (token) {
      const user = decodeJwt(token.value);
      return user?.id as string;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async (): Promise<GetUserDataProp> => {
  const userId = await userDataId();

  if (!userId) {
    return {
      success: false,
      user: null,
      error: "User not found",
    };
  }

  try {
    // Fetch user details from the database
    const { docs: usersDetails } = await payload.find({
      collection: "users",
      pagination: false,
      where: {
        id: {
          equals: userId,
        },
      },
    });

    // Check if user details were found
    if (usersDetails.length > 0) {
      return {
        success: true,
        user: usersDetails[0],
      };
    } else {
      return {
        success: false,
        user: null,
        error: "User not found",
      };
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      success: false,
      user: null,
      error: "Failed to fetch user data",
    };
  }
};
