import Link from "next/link";
import { NAV_ITEMS } from "../constants/navigation.constants";

export default function Navigation() {
  return (
    <nav className="grid grid-cols-3 items-center rounded-full border border-border bg-surface/80 p-1.5 backdrop-blur-md">
      {/* Logo */}
      <Link
        href="/"
        aria-label="Floaty Home"
        className="flex size-10 items-center justify-center rounded-full text-accent-light transition-all duration-300 hover:bg-accent/10"
      >
        {/* Logo icon */}
        logo
      </Link>

      {/* Main Navigation */}
      <div className="flex items-center justify-center gap-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-4 py-2 text-sm text-muted transition-all duration-300 hover:bg-accent/20 hover:text-accent-light"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Auth */}
      <div className="flex items-center justify-end gap-1">
        <Link
          href="/login"
          className="rounded-full bg-accent px-4 py-2 text-sm text-background transition-all duration-300 hover:bg-accent-light"
        >
          ورود / ثبت‌نام
        </Link>
      </div>
    </nav>
  );
}
