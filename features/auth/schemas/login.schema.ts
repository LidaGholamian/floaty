import { z } from "zod";
import { isValidUsername } from "./register.schema";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .refine(isValidUsername, {
      message: "Enter a valid email address or phone number",
    }),
  password: z.string().min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
