"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle, CheckCircle2 } from "lucide-react";
import { loginSchema, type LoginSchema } from "../schemas/login.schema";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
  });

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
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-muted">
          Sign in with your email or phone number
        </p>
      </div>

      {isSuccess ? (
        <div
          className="flex flex-col items-center gap-3 rounded-xl border border-accent/30 bg-accent/10 px-4 py-8 text-center"
          role="status"
        >
          <CheckCircle2 className="size-10 text-accent" aria-hidden="true" />
          <p className="text-base font-medium text-foreground">
            Signed in successfully
          </p>
          <p className="text-sm text-muted">
            Your session is ready. Continue exploring Floaty.
          </p>
          <Link
            href="/"
            className="mt-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-background transition-colors duration-200 hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Go to Home
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
              htmlFor="login-username"
              className="block text-sm font-medium text-foreground"
            >
              Username
            </label>
            <input
              id="login-username"
              type="text"
              autoComplete="username"
              placeholder="Email or phone number"
              aria-invalid={errors.username ? true : undefined}
              aria-describedby={
                errors.username ? "login-username-error" : undefined
              }
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/60 transition-colors duration-200 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 aria-invalid:border-red-400/80"
              {...register("username")}
            />
            {errors.username ? (
              <p
                id="login-username-error"
                role="alert"
                className="text-sm text-red-300"
              >
                {errors.username.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                aria-invalid={errors.password ? true : undefined}
                aria-describedby={
                  errors.password ? "login-password-error" : undefined
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
                id="login-password-error"
                role="alert"
                className="text-sm text-red-300"
              >
                {errors.password.message}
              </p>
            ) : null}
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
                <span>Signing in...</span>
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      )}

      {!isSuccess ? (
        <p className="mt-6 text-center text-sm text-muted md:text-start">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-accent transition-colors duration-200 hover:text-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Register
          </Link>
        </p>
      ) : null}
    </div>
  );
}
