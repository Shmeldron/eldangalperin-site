"use client";

import Link from "next/link";
import { LinkedinIcon } from "@/components/icons/Brand";
import { site } from "@/lib/site";
import { DICT } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function Footer() {
  const { locale } = useLocale();
  const t = DICT[locale];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center sm:px-10">
        <div className="text-xs text-faint">
          <p className="text-muted">
            <span dir="ltr" className="font-mono text-accent">$</span> {t.footer.builtBy}
          </p>
          <p className="mt-1">
            <span dir="ltr" className="font-mono">Next.js · TypeScript · Tailwind · deployed on Vercel</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/#work" className="text-xs text-muted hover:text-foreground">
            {t.nav.work}
          </Link>
          <Link href="/#contact" className="text-xs text-muted hover:text-foreground">
            {t.nav.contact}
          </Link>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-accent"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
