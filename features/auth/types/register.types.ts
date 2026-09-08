import type { RegisterSchema } from "../schemas/register.schema";

export type RegisterFormValues = RegisterSchema;

export type PasswordRequirementId = "length" | "letter" | "number";

export type PasswordRequirement = {
  id: PasswordRequirementId;
  label: string;
  test: (password: string) => boolean;
};
