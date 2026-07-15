"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LangToggle } from "@/components/LangToggle";

/** Minimal header: name + role on the start side, toggles on the end side.
 *  No nav bar, no command palette — the whole site chrome. */
export function Header() {
  const { locale } = useLocale();
  const name = locale === "he" ? "אלדן גלפרין" : site.name;
  const role = locale === "he" ? "מהנדס מוצר Full-Stack" : site.role;

  return (
    <header className="mx-auto w-full max-w-[600px] px-4 pt-16 sm:pt-20">
      <div className="flex items-start justify-between">
        <div>
          <Link href="/" className="text-lg text-foreground">{name}</Link>
          <p className="mt-0.5 text-[15px] text-muted">{role}</p>
        </div>
        <div className="flex items-center gap-1">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
