import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import { compare } from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);
        if (!validateFields.success) return null;
        const { email, password } = validateFields.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;
        const confirmPassword = await compare(password, user.password);
        if (!confirmPassword) return null;
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
