"use server";
import { auth } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { prismadb } from "@/lib/db";
import { UpdateUsernameSchema } from "@/schemas";
import { z } from "zod";

export const updateUsername = async (
  data: z.infer<typeof UpdateUsernameSchema>
) => {
  const validateFields = UpdateUsernameSchema.safeParse(data);
  if (!validateFields.success) {
    return {
      error: "Invalid fields!",
    };
  }
  const { username } = validateFields.data;
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return {
      error: "User not logged in!",
    };
  }
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return {
      error: "User not logged in!",
    };
  }
  await prismadb.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      name: username,
    },
  });
  return {
    success: "Username updated!",
  };
};

export const updateProfilePhoto = async (data: string) => {
  if (!data) {
    return {
      error: "Something went wrong!",
    };
  }
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return {
      error: "User not loggedin!",
    };
  }
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return {
      error: "Email not found!",
    };
  }
  await prismadb.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      image: data,
    },
  });
  return {
    success: "Image Updated!",
  };
};
