"use server";
import { prismadb } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { hash } from "bcryptjs";
import { getUserByEmail } from "@/data/user";

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validateInput = RegisterSchema.safeParse(values);
  if (!validateInput.success) {
    return {
      error: "Enter fields correctly!",
    };
  }
  const { username, email, password } = validateInput.data;
  const user = await getUserByEmail(email);
  if (user) {
    return {
      error: "User found with this email!",
    };
  }
  const hashedPassword = await hash(password, 10);
  await prismadb.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
    },
  });
  return {
    success: "Registered Sucessfully!",
  };
};
