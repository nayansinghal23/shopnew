"use server";
import { getUserByEmail } from "@/data/user";
import { prismadb } from "@/lib/db";
import { ForgotPasswordSchema } from "@/schemas";
import { hash } from "bcryptjs";
import { z } from "zod";

export const forgotPassword = async (
  values: z.infer<typeof ForgotPasswordSchema>
) => {
  const validateFeilds = ForgotPasswordSchema.safeParse(values);
  if (!validateFeilds.success) {
    return {
      error: "Enter fields correctly!",
    };
  }
  const { email, newPassword } = validateFeilds.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.password) {
    return {
      error: "Invalid email-id!",
    };
  }
  const hashedNewPassword = await hash(newPassword, 10);
  await prismadb.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedNewPassword,
    },
  });
  return {
    success: "Password updated!",
  };
};
