"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle, CheckCircle2 } from "lucide-react";
import {
  registerSchema,
  type RegisterSchema,
} from "../schemas/register.schema";
import PasswordRequirements from "./password-requirements";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const passwordValue = useWatch({ control, name: "password" }) ?? "";

  async function onSubmit() {
    setIsSuccess(false);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSuccess(true);
  }

  return (
    <div className="w-full">
      <div className="mb-8 text-center md:text-start">
        <p className="mb-2 text-sm font-medium tracking-wide text-accent">
          Floaty
        </p>
        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
          Create account
        </h1>
        <p className="mt-2 text-sm text-muted">
          Register with your email or phone number
        </p>
      </div>

      {isSuccess ? (
        <div
          className="flex flex-col items-center gap-3 rounded-xl border border-accent/30 bg-accent/10 px-4 py-8 text-center"
          role="status"
        >
          <CheckCircle2 className="size-10 text-accent" aria-hidden="true" />
          <p className="text-base font-medium text-foreground">
            Account created successfully
          </p>
          <p className="text-sm text-muted">
            You can now sign in with your credentials.
          </p>
          <Link
            href="/login"
            className="mt-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-background transition-colors duration-200 hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Go to Login
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-foreground"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="Email or phone number"
              aria-invalid={errors.username ? true : undefined}
              aria-describedby={
                errors.username ? "username-error" : undefined
              }
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/60 transition-colors duration-200 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 aria-invalid:border-red-400/80"
              {...register("username")}
            />
            {errors.username ? (
              <p
                id="username-error"
                role="alert"
                className="text-sm text-red-300"
              >
                {errors.username.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a password"
                aria-invalid={errors.password ? true : undefined}
                aria-describedby={
                  errors.password
                    ? "password-error password-requirements"
                    : "password-requirements"
                }
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 pe-12 text-sm text-foreground placeholder:text-muted/60 transition-colors duration-200 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 aria-invalid:border-red-400/80"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-e-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-accent/10 hover:text-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password ? (
              <p
                id="password-error"
                role="alert"
                className="text-sm text-red-300"
              >
                {errors.password.message}
              </p>
            ) : null}
            <div id="password-requirements">
              <PasswordRequirements password={passwordValue} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-background transition-all duration-200 hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
                <span>Creating account...</span>
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>
      )}

      {!isSuccess ? (
        <p className="mt-6 text-center text-sm text-muted md:text-start">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-accent transition-colors duration-200 hover:text-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Login
          </Link>
        </p>
      ) : null}
    </div>
  );
}
