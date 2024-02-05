"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { compare } from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return {
      error: "Enter fields correctly!",
    };
  }
  try {
    const { email, password } = validateFields.data;
    const user = await getUserByEmail(email);
    if (!user || !user.password) {
      return {
        error: "Email doesn't exists!",
      };
    }
    const hashedPassword = await compare(password, user.password);
    if (!hashedPassword) {
      return {
        error: "Password didn't match!",
      };
    }
    if (!user.emailVerified) {
      const verificationToken = await generateVerificationToken(email);
      return {
        token: verificationToken.token,
      };
    }
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const oAuth = async (type: "github" | "discord" | "google") => {
  await signIn(type, {
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });
};
