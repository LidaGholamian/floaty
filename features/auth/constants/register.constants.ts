import type { PasswordRequirement } from "../types/register.types";

export const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  {
    id: "length",
    label: "Be at least 8 characters",
    test: (password) => password.length >= 8,
  },
  {
    id: "letter",
    label: "Contain at least one letter",
    test: (password) => /[a-zA-Z]/.test(password),
  },
  {
    id: "number",
    label: "Contain at least one number",
    test: (password) => /[0-9]/.test(password),
  },
];
