"use client";

import { useState } from "react";
import { emailAddress } from "@/lib/site";
import { DICT } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/** Anti-scrape email: renders the reveal label until clicked, then a mailto. */
export function EmailReveal() {
  const { locale } = useLocale();
  const [revealed, setRevealed] = useState(false);
  const linkClassName =
    "text-text-mid underline decoration-dotted decoration-faint underline-offset-[3px] hover:text-accent hover:decoration-accent";

  if (revealed) {
    return (
      <a dir="ltr" href={`mailto:${emailAddress}`} className={linkClassName}>
        {emailAddress}
      </a>
    );
  }
  return (
    <button type="button" onClick={() => setRevealed(true)} className={linkClassName}>
      {DICT[locale].home.emailLabel}
    </button>
  );
}
