import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];

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

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Enter correct email-id",
  }),
  newPassword: z.string().min(6, {
    message: "Password must be at least 6 digit",
  }),
});

export const UpdateUsernameSchema = z.object({
  username: z.string(),
});

export const UpdateProfilePhotoSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max image size is 5MB!`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    }),
});
