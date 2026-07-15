"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Light/dark toggle. Starts at "light" to match the server render (theme is
 *  not known at SSR time — there is no theme cookie), then syncs to the real
 *  attribute set by the no-flash inline script after mount. Initializing from
 *  the live DOM during render instead would mismatch hydration for dark-mode
 *  visitors, since the inline script patches <html> data-theme but not this
 *  button's own markup. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light";
    // Syncing from the no-flash inline script's DOM attribute post-hydration is the
    // documented Next.js exception (preventing-flash-before-hydration); reading it during
    // render instead would cause a real server/client mismatch (Moon vs Sun).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current);
  }, []);

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
