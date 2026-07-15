"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { site } from "@/lib/site";

export function Footer() {
  const { locale } = useLocale();
  const updated = locale === "he" ? "עודכן לאחרונה · יולי 2026" : "Last updated · July 2026";
  const name = locale === "he" ? "אלדן גלפרין" : site.name;

  return (
    <footer className="mx-auto w-full max-w-[600px] px-4 pb-16">
      <div className="flex flex-col gap-1 border-t border-border pt-4 text-[13px] text-muted sm:flex-row sm:justify-between">
        <span>{updated}</span>
        <span dir="ltr" className="sm:text-end">© 2026 {name}</span>
      </div>
    </footer>
  );
}
