"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { DICT } from "@/lib/i18n/content";

export default function NotFound() {
  const { locale } = useLocale();
  const t = DICT[locale].notFound;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[600px] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm text-muted">{t.code}</p>
      <h1 className="mt-3 text-lg text-foreground">{t.title}</h1>
      <p className="mt-3 text-[15px] text-text-mid">{t.body}</p>
      <Link href="/" className="link-sweep mt-8 text-[15px]">
        {t.back}
      </Link>
    </div>
  );
}
