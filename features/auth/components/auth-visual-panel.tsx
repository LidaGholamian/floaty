import type { AuthMode } from "../types/login.types";

type AuthVisualPanelProps = {
  mode: AuthMode;
};

export default function AuthVisualPanel({ mode }: AuthVisualPanelProps) {
  const isLogin = mode === "login";

  return (
    <div className="auth-visual-panel relative flex h-full min-h-45 w-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:min-h-55 sm:p-8 md:min-h-full md:rounded-none md:border-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_42%),radial-gradient(circle_at_80%_70%,color-mix(in_oklab,var(--accent-light)_18%,transparent),transparent_46%)]"
      />

      <span
        aria-hidden="true"
        className="auth-orb auth-orb-a absolute -left-8 top-10 size-36 rounded-full bg-accent/30 blur-2xl"
      />
      <span
        aria-hidden="true"
        className="auth-orb auth-orb-b absolute right-4 top-24 size-28 rounded-full bg-accent-light/25 blur-xl"
      />
      <span
        aria-hidden="true"
        className="auth-orb auth-orb-c absolute bottom-10 left-1/3 size-44 rounded-full bg-accent/20 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="auth-orb auth-orb-d absolute -right-6 bottom-16 size-24 rounded-full border border-accent/40 bg-accent/10"
      />
      <span
        aria-hidden="true"
        className="auth-orb auth-orb-e absolute left-10 top-1/2 size-16 rounded-full border border-accent-light/30 bg-surface-elevated/40"
      />

      <div className="relative z-10">
        <p className="text-sm font-medium tracking-wide text-accent-light">
          Floaty
        </p>
        <h2 className="mt-3 max-w-[14ch] text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
          {isLogin ? "Float through your workspace" : "Start floating with us"}
        </h2>
        <p className="mt-3 max-w-xs text-sm text-muted">
          {isLogin
            ? "Pick up where you left off with a calm, focused flow."
            : "Create an account and explore responsive motion-driven UI."}
        </p>
      </div>

      <div className="relative z-10 mt-8 hidden items-center gap-2 text-xs text-muted md:flex">
        <span className="inline-flex size-2 rounded-full bg-accent" />
        Soft motion · Dark surfaces · Purple accents
      </div>
    </div>
  );
}
