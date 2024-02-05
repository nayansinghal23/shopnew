import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { prismadb } from "./lib/db";
import { getUserById } from "./data/user";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prismadb.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider !== "credentials") return true;
      if (!user.id) return false;
      const existingUser = await getUserById(user.id);
      if (!existingUser || !existingUser?.emailVerified) return false;
      return true;
    },
    async session({ token, session }: any) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      if (session.user && token.OAuth) {
        session.user.OAuth = token.OAuth;
      }
      return session;
    },
    async jwt({ token }: any) {
      if (!token.sub) return token;
      const user = await getUserById(token.sub);
      if (!user) return token;
      const existingAccount = await getAccountByUserId(user.id);
      token.id = user.id;
      token.OAuth = existingAccount === null ? "false" : "true";
      return token;
    },
  },
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  ...authConfig,
});
