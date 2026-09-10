"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { NAV_ITEMS } from "../constants/navigation.constants";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="grid grid-cols-3 mx-auto items-center rounded-full border border-border bg-surface/80 p-1.5 backdrop-blur-md">
      {/* Auth */}
      <div className="flex items-center justify-start gap-1">
        <Link
          href="/register"
          className="rounded-full bg-accent px-4 py-2 text-sm text-background transition-all duration-300 hover:bg-accent-light"
        >
          Login/Register
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="flex items-center justify-center gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${isActive ? "bg-accent/20 text-accent-light" : "text-muted hover:bg-accent/20 hover:text-accent-light"}`}
            >
              {" "}
              {item.label}{" "}
            </Link>
          );
        })}
      </div>

      {/* Logo */}
      <Link
        href="/"
        aria-label="Floaty Home"
        className="flex size-10 items-center justify-center justify-self-end rounded-full text-accent-light transition-all duration-300 hover:bg-accent/10"
      >
        {/* Logo icon */}
        logo
      </Link>
    </nav>
  );
}
