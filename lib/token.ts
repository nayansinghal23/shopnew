import { getVerificationTokenByEmail } from "@/data/token";
import { prismadb } from "@/lib/db";
import { v4 as uuiv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuiv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const exisitingToken = await getVerificationTokenByEmail(email);
  if (exisitingToken) {
    await prismadb.verificationToken.delete({
      where: {
        id: exisitingToken.id,
      },
    });
  }
  const verificationToken = await prismadb.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};
