"use server";
import { getUserByEmail } from "@/data/user";
import { prismadb } from "@/lib/db";

export const verifyingTokenAndUser = async (token: string) => {
  const result = await prismadb.verificationToken.findUnique({
    where: {
      token,
    },
  });
  if (!result) return null;
  const expires = new Date(result.expires) < new Date();
  if (expires) return null;
  const user = await getUserByEmail(result?.email);
  if (!user) return null;
  const updatedUser = await prismadb.user.update({
    where: {
      id: user.id,
    },
    data: {
      email: user.email,
      emailVerified: new Date(),
    },
  });
  await prismadb.verificationToken.delete({
    where: {
      id: result.id,
    },
  });
  return updatedUser;
};
