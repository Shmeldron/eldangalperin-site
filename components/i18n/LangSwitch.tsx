"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/**
 * Fixed top-center language switch. Direction-neutral: it never moves while the
 * homepage content swipes. The whole pill is one button — a click anywhere
 * toggles EN ⇄ עב.
 */
export function LangSwitch() {
  const { locale, toggle } = useLocale();
  const reduce = useReducedMotion();
  return (
    <div className="fixed left-1/2 top-4 z-[60] -translate-x-1/2 sm:top-5">
      <button
        type="button"
        dir="ltr"
        onClick={toggle}
        role="switch"
        aria-checked={locale === "he"}
        aria-label="Toggle language · החלפת שפה"
        className="relative grid grid-cols-2 overflow-hidden rounded-full border border-border-strong bg-card/90 p-1 font-mono text-xs shadow-xl shadow-black/40 backdrop-blur transition-colors hover:border-accent/60"
      >
        <motion.span
          aria-hidden
          className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-accent"
          animate={{ x: locale === "en" ? "0%" : "100%" }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
        />
        <span className={`relative z-10 px-4 py-1.5 ${locale === "en" ? "text-on-accent" : "text-muted"}`}>
          EN
        </span>
        <span className={`relative z-10 px-4 py-1.5 ${locale === "he" ? "text-on-accent" : "text-muted"}`}>
          עב
        </span>
      </button>
    </div>
  );
}
