import { Check, Circle } from "lucide-react";
import { PASSWORD_REQUIREMENTS } from "../constants/register.constants";

type PasswordRequirementsProps = {
  password: string;
};

export default function PasswordRequirements({
  password,
}: PasswordRequirementsProps) {
  return (
    <div
      className="rounded-xl border border-border bg-surface/60 px-4 py-3"
      aria-live="polite"
    >
      <p className="mb-2 text-sm font-medium text-foreground">Password must:</p>
      <ul className="space-y-1.5">
        {PASSWORD_REQUIREMENTS.map((requirement) => {
          const met = requirement.test(password);

          return (
            <li
              key={requirement.id}
              className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                met ? "text-accent-light" : "text-muted"
              }`}
            >
              {met ? (
                <Check
                  className="size-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
              ) : (
                <Circle
                  className="size-4 shrink-0 text-muted/70"
                  aria-hidden="true"
                />
              )}
              <span>
                <span className="sr-only">
                  {met ? "Completed: " : "Incomplete: "}
                </span>
                {requirement.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
