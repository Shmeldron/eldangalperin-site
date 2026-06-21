"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DIR, OTHER, LOCALE_COOKIE, type Locale } from "@/lib/i18n/content";

type Ctx = { locale: Locale; toggle: () => void; setLocale: (l: Locale) => void };

const LocaleContext = createContext<Ctx | null>(null);

/**
 * Holds the active locale, persists it to a cookie (so the server renders the
 * right `<html dir/lang>` on the next request — no flash), and keeps the live
 * document direction/language in sync on the client.
 */
export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const el = document.documentElement;
    el.lang = locale;
    el.dir = DIR[locale];
    const secure = location.protocol === "https:" ? "; secure" : "";
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax${secure}`;
  }, [locale]);

  const toggle = useCallback(() => setLocale((l) => OTHER[l]), []);

  // Memoised so consumers (Header, Footer, …) don't re-render on every render.
  const value = useMemo(() => ({ locale, toggle, setLocale }), [locale, toggle]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within <LocaleProvider>");
  return ctx;
}
