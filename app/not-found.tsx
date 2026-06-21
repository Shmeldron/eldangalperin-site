import Link from "next/link";
import { cookies } from "next/headers";
import { DICT, DIR, LOCALE_COOKIE, type Locale } from "@/lib/i18n/content";

export default async function NotFound() {
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get(LOCALE_COOKIE)?.value === "he" ? "he" : "en";
  const t = DICT[locale].notFound;

  return (
    <div
      dir={DIR[locale]}
      lang={locale}
      className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center"
    >
      <p className="font-mono text-sm text-accent">{t.code}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-3 max-w-sm text-muted">{t.body}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-on-accent"
      >
        {t.back}
      </Link>
    </div>
  );
}
