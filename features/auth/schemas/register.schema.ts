import { z } from "zod";

const emailCheck = z.email();

function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!/^[\d\s+\-()]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function isValidUsername(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  return emailCheck.safeParse(trimmed).success || isValidPhone(trimmed);
}

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .refine(isValidUsername, {
      message: "Enter a valid email address or phone number",
    }),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
