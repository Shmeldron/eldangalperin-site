"use client";

import { DICT } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/** EN ⇄ עברית toggle. Label shows the OTHER language (from DICT.toggleLabel). */
export function LangToggle() {
  const { locale, toggle } = useLocale();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch language to ${DICT[locale].toggleLabel}`}
      className="inline-flex h-7 items-center rounded-md px-2 font-mono text-xs text-muted transition-colors hover:text-foreground active:scale-95"
    >
      {DICT[locale].toggleLabel}
    </button>
  );
}
