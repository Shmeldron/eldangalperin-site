"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { Check, Copy, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { publishedProjects } from "@/lib/projects";
import { TerminalMotif } from "@/components/TerminalMotif";
import { MagneticButton } from "@/components/MagneticButton";
import { LinkedinIcon } from "@/components/icons/Brand";
import { HeProjectCard } from "@/components/he/HeProjectCard";
import { DICT, DIR, HE_PROJECT, isHebrew, type Locale } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/* ---- swipe config (locked: Wave + Warp + Slide, hero headline Shatter) ---- */

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const DIST = 16; // vw
const BLUR = 16; // px
const STAGGER = 0.07; // wave

// EN→HE flows left→right, HE→EN right→left: a HE unit lives on the left.
const startX = (l: Locale) => (l === "he" ? `-${DIST}vw` : `${DIST}vw`);

function unitVariants(locale: Locale): Variants {
  const off = { x: startX(locale), filter: `blur(${BLUR}px)`, opacity: 0 };
  return {
    initial: off,
    animate: { x: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: EASE } },
    exit: { ...off, transition: { duration: 0.4, ease: EASE } },
  };
}

const containerVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: STAGGER, delayChildren: 0.02 } },
  exit: { transition: { staggerChildren: STAGGER * 0.5, staggerDirection: -1 } },
};

const BUILD_LOG = [
  '$ git commit -m "ship it"',
  "✓ build passed · 0 errors · 0 warnings",
  "→ deploying to production…",
  "✓ live · idea → production, end to end",
];

/* ------------------------------------------------------------------ shell -- */

export function HomeContent() {
  const reduce = useReducedMotion();
  const { locale } = useLocale();
  const streak = useAnimationControls();
  const first = useRef(true);

  // Fire the warp light-streak whenever the language changes (not on first paint).
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduce) return;
    const toHe = locale === "he";
    streak.set({ x: toHe ? "-25vw" : "120vw", opacity: 0 });
    streak.start({
      x: toHe ? "120vw" : "-25vw",
      opacity: [0, 0.9, 0],
      transition: { duration: 0.55, ease: "easeInOut" },
    });
  }, [locale, reduce, streak]);

  const stage = <Stage locale={locale} />;

  return (
    <div className="relative overflow-x-hidden">
      {reduce ? (
        stage
      ) : (
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={locale}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {stage}
          </motion.div>
        </AnimatePresence>
      )}

      {!reduce && (
        <motion.div
          aria-hidden
          animate={streak}
          initial={{ opacity: 0 }}
          className="pointer-events-none fixed inset-y-[-20%] z-[52] w-[14vw] rotate-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(52,211,153,0.0), rgba(34,211,238,0.55), rgba(52,211,153,0.0), transparent)",
            filter: "blur(8px)",
          }}
        />
      )}
    </div>
  );
}

type T = (typeof DICT)[Locale];

// `locale` is passed (not read from context) so the EXITING old-locale stage
// keeps exiting toward its own side — context would return the new locale.
function Unit({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <motion.div variants={unitVariants(locale)}>{children}</motion.div>;
}

function Stage({ locale }: { locale: Locale }) {
  const t = DICT[locale];
  return (
    // Per-locale dir + lang so the cross-sliding old/new content each render
    // correctly (and lang drives the Hebrew font via globals.css).
    <div dir={DIR[locale]} lang={locale}>
      <Unit locale={locale}>
        <Hero t={t} locale={locale} />
      </Unit>
      <Unit locale={locale}>
        <Work locale={locale} t={t} />
      </Unit>
      <Unit locale={locale}>
        <About t={t} />
      </Unit>
      <Unit locale={locale}>
        <Contact t={t} />
      </Unit>
    </div>
  );
}

/* ------------------------------------------------------------------- hero -- */

function Hero({ t, locale }: { t: T; locale: Locale }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const gx = useMotionValue(50);
  const gy = useMotionValue(30);
  const left = useTransform(useSpring(gx, { stiffness: 120, damping: 25 }), (n) => `${n}%`);
  const top = useTransform(useSpring(gy, { stiffness: 120, damping: 25 }), (n) => `${n}%`);

  function onMove(e: React.MouseEvent) {
    if (reduce || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    gx.set(((e.clientX - r.left) / r.width) * 100);
    gy.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative flex min-h-[88vh] flex-col justify-center overflow-hidden px-6 pt-24 pb-16 sm:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" aria-hidden />
      {reduce ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(600px circle at 50% 30%, rgba(52,211,153,0.10), transparent 70%)" }}
        />
      ) : (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left,
            top,
            background:
              "radial-gradient(circle, rgba(52,211,153,0.14), rgba(34,211,238,0.06) 40%, transparent 70%)",
          }}
        />
      )}

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <StatusTyper key={locale} lines={t.status} />

          <h1 className="he-display mt-6 text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl">
            <Headline text={t.hero.line1} animate={!reduce} />
            <span className="accent-gradient glow-text mt-2 block">{t.hero.accent}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
            {t.hero.sub}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton href="#work">{t.hero.cta1}</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              {t.hero.cta2}
            </MagneticButton>
          </div>
        </div>

        <div className="hidden lg:block" dir="ltr">
          <TerminalMotif lines={BUILD_LOG} title="~/eldan — build" />
        </div>
      </div>
    </section>
  );
}

/** Deterministic 0..1 pseudo-random (no Math.random → no hydration mismatch). */
function rnd(i: number, s: number) {
  const x = Math.sin(i * 99.7 + s * 13.3) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Hero headline — Shatter: letters scatter and reassemble. Grouped into
 * non-breaking words so the line only wraps between words on a phone. Explicit
 * per-letter initial/animate so it doesn't inherit the swiping unit's variant.
 */
function Headline({ text, animate }: { text: string; animate: boolean }) {
  if (!animate) return <span className="block">{text}</span>;
  const words = text.split(" ");
  let gi = 0;
  return (
    <span className="block">
      {words.map((word, wi) => {
        const wordSpan = (
          <span key={`w${wi}`} className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch) => {
              const i = gi++;
              return (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{
                    opacity: 0,
                    x: (rnd(i, 1) - 0.5) * 130,
                    y: (rnd(i, 2) - 0.5) * 90,
                    rotate: (rnd(i, 3) - 0.5) * 70,
                    filter: "blur(8px)",
                  }}
                  animate={{ opacity: 1, x: 0, y: 0, rotate: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.45, delay: i * 0.012, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
        );
        return wi < words.length - 1 ? [wordSpan, <span key={`s${wi}`}> </span>] : wordSpan;
      })}
    </span>
  );
}

function StatusTyper({ lines }: { lines: string[] }) {
  const reduce = useReducedMotion();
  const [text, setText] = useState(reduce ? lines[0] : "");

  useEffect(() => {
    if (reduce) return;
    let line = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = lines[line];
      if (!deleting) {
        char++;
        setText(full.slice(0, char));
        if (char === full.length) {
          deleting = true;
          timer = setTimeout(tick, 2200);
          return;
        }
      } else {
        char--;
        setText(full.slice(0, char));
        if (char === 0) {
          deleting = false;
          line = (line + 1) % lines.length;
        }
      }
      timer = setTimeout(tick, deleting ? 28 : 55);
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [lines, reduce]);

  return (
    <div className="flex items-center gap-2 text-sm text-muted">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="caret text-foreground/80">{text}</span>
    </div>
  );
}

/* ------------------------------------------------------------------- work -- */

function Work({ locale, t }: { locale: Locale; t: T }) {
  return (
    <section id="work" className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:px-10">
      <SectionLabel index="01" title={t.work.label} />
      <p className="mt-4 max-w-xl text-balance text-muted">{t.work.intro}</p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {publishedProjects.map((project, i) => {
          const copy =
            locale === "he"
              ? HE_PROJECT[project.slug]
              : {
                  kicker: project.kicker,
                  tagline: project.tagline,
                  role: project.role,
                  highlights: project.highlights,
                };
          if (!copy) return null;
          return <HeProjectCard key={project.slug} project={project} he={copy} index={i} />;
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ about -- */

function About({ t }: { t: T }) {
  return (
    <section id="about" className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:px-10">
      <SectionLabel index="02" title={t.about.label} />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          {t.about.paras.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="text-foreground">
            {t.about.ctaLead}{" "}
            <a href="#contact" className="text-accent underline-offset-4 hover:underline">
              {t.about.ctaLink}
            </a>
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {t.about.stack.map((col) => (
            <div key={col.group} className="bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">{col.group}</p>
              <ul className="mt-3 space-y-1.5">
                {col.items.map((it) => (
                  <li key={it} className="text-sm text-muted">
                    {isHebrew(it) ? (
                      it
                    ) : (
                      <span dir="ltr" style={{ unicodeBidi: "isolate" }} className="font-mono text-[13px]">
                        {it}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- contact -- */

function Contact({ t }: { t: T }) {
  return (
    <section id="contact" className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:px-10">
      <SectionLabel index="03" title={t.contact.label} />
      <p className="mt-4 max-w-xl text-balance text-lg leading-relaxed text-muted">{t.contact.intro}</p>
      <EmailReveal reveal={t.contact.reveal} copyLabel={t.cmd.copyEmail} />
    </section>
  );
}

function EmailReveal({ reveal, copyLabel }: { reveal: string; copyLabel: string }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const address = `${site.email.user}@${site.email.domain}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  }

  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="group inline-flex items-center gap-3 rounded-full border border-border-strong bg-card px-5 py-3 text-sm transition-colors hover:border-accent/60"
        >
          <Mail className="h-4 w-4 text-accent" />
          <span className="text-muted transition-colors group-hover:text-foreground">{reveal}</span>
        </button>
      ) : (
        <div className="inline-flex items-center gap-3 rounded-full border border-border-strong bg-card px-5 py-3 text-sm">
          <Mail className="h-4 w-4 shrink-0 text-accent" />
          <a
            href={`mailto:${address}`}
            dir="ltr"
            style={{ unicodeBidi: "isolate" }}
            className="text-foreground underline-offset-4 hover:text-accent hover:underline"
          >
            {address}
          </a>
          <button
            type="button"
            onClick={copy}
            aria-label={copyLabel}
            className="group/copy inline-flex shrink-0"
          >
            {copied ? (
              <Check className="h-4 w-4 text-accent" />
            ) : (
              <Copy className="h-4 w-4 text-faint transition-colors group-hover/copy:text-foreground" />
            )}
          </button>
        </div>
      )}

      <a
        href={site.socials.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-card text-muted transition-colors hover:border-accent/60 hover:text-accent"
      >
        <LinkedinIcon className="h-5 w-5" />
      </a>
    </div>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span dir="ltr" className="font-mono text-xs text-accent">{index}</span>
      <span className="h-px w-8 bg-border-strong" />
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    </div>
  );
}
