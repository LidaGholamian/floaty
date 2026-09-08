"use client";

import { usePathname } from "next/navigation";
import AuthVisualPanel from "./auth-visual-panel";
import type { AuthMode } from "../types/login.types";

type AuthShellProps = {
  children: React.ReactNode;
};

function resolveAuthMode(pathname: string): AuthMode {
  return pathname.includes("/register") ? "register" : "login";
}

export default function AuthShell({ children }: AuthShellProps) {
  const pathname = usePathname();
  const mode = resolveAuthMode(pathname);
  const isLogin = mode === "login";

  return (
    <main
      lang="en"
      dir="ltr"
      className="relative flex min-h-full flex-1 items-center justify-center overflow-hidden px-4 py-8 sm:px-6 sm:py-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_55%),radial-gradient(ellipse_at_bottom,color-mix(in_oklab,var(--accent-light)_8%,transparent),transparent_50%)]"
      />

      <div className="auth-shell relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface-elevated/90 shadow-[0_0_48px_-16px_color-mix(in_oklab,var(--accent)_35%,transparent)]">
        <div className="relative flex min-h-155 flex-col md:grid md:min-h-140 md:grid-cols-2">
          <div
            aria-hidden="true"
            className={`auth-panel-motion absolute inset-y-0 left-0 z-20 hidden w-1/2 p-3 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] md:block ${
              isLogin ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="h-full overflow-hidden rounded-2xl border border-border/80">
              <AuthVisualPanel mode={mode} />
            </div>
          </div>

          <div className="auth-panel-motion order-1 p-3 pb-0 md:hidden">
            <AuthVisualPanel mode={mode} />
          </div>

          <div
            className={`auth-panel-motion order-2 flex items-center justify-center p-6 sm:p-8 md:col-span-1 md:p-10 ${
              isLogin ? "md:col-start-2" : "md:col-start-1"
            }`}
          >
            <div
              key={mode}
              className="auth-form-motion w-full max-w-md animate-[auth-form-in_0.85s_ease-out]"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
