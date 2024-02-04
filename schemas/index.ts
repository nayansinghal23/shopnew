import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string(),
  email: z.string().email({
    message: "Enter correct email-id",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 digits",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Enter correct email-id",
  }),
  password: z.string().min(1, {
    message: "Password must be at least 1 digit",
  }),
});
