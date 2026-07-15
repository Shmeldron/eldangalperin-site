"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Light/dark toggle. Reads the attribute set by the no-flash script in layout
 *  via a lazy state initializer — by the time this Client Component hydrates,
 *  that inline script has already run, so reading `data-theme` here matches
 *  the DOM and avoids both a hydration mismatch and a set-state-in-effect
 *  render cascade (see Next.js docs: preventing-flash-before-hydration).
 *  Flips the attribute on click and persists to localStorage. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light";
  });

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch {}
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex size-7 items-center justify-center rounded-md text-faint transition-colors hover:text-muted active:scale-95"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
