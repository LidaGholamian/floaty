import type { LoginSchema } from "../schemas/login.schema";

export type LoginFormValues = LoginSchema;

export type AuthMode = "login" | "register";
