import { prismadb } from "@/lib/db";
import { getUserByEmail } from "./user";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prismadb.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenById = async (id: string) => {
  try {
    const verificationToken = await prismadb.verificationToken.findUnique({
      where: {
        id,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
