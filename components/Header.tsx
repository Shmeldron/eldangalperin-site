"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Command, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { openCommandPalette } from "@/components/CommandPalette";
import { DICT } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/**
 * Bilingual top bar. Stable chrome (it doesn't swipe with the homepage content)
 * — it just follows the document direction and swaps nav copy. The language
 * switch lives separately (fixed, top-center) so it never moves.
 */
export function Header() {
  const { locale } = useLocale();
  const t = DICT[locale];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: "/#work", label: t.nav.work },
    { href: "/#about", label: t.nav.about },
    { href: "/#contact", label: t.nav.contact },
  ];
  const wordmark = locale === "he" ? "אלדן גלפרין" : "eldan-galperin";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className="group flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span dir="ltr" className="font-mono text-accent">~/</span>
          {/* hide the name only on very narrow screens so it can't meet the centered toggle */}
          <span className="text-foreground max-[359px]:hidden">{wordmark}</span>
        </Link>

        {/* nav + ⌘K grouped on the end side, leaving the center clear for the
            fixed language switch (no overlap in either direction). */}
        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-1 sm:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-card hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={openCommandPalette}
            className="ms-1 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border-strong bg-card px-3 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-foreground sm:h-auto sm:py-1.5"
            aria-label="Open command palette"
          >
            {/* Mobile reads a search glyph as "tap to search"; the ⌘ symbol is
                meaningless on a phone with no Command key. Desktop keeps ⌘K. */}
            <Search className="h-4 w-4 sm:hidden" />
            <Command className="hidden h-3.5 w-3.5 sm:inline" />
            <span className="hidden sm:inline">K</span>
          </button>
        </div>
      </div>
    </header>
  );
}
