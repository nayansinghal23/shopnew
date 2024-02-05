import { prismadb } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const user = await prismadb.account.findFirst({
      where: {
        userId,
      },
    });
    return user;
  } catch {
    return null;
  }
};
