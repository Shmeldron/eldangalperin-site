"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { MagneticButton } from "@/components/MagneticButton";
import { TerminalMotif } from "@/components/TerminalMotif";
import { HeStatusLine } from "./HeStatusLine";
import { Reveal } from "@/components/motion/Reveal";

/** Hebrew (RTL) hero with cursor-tracking glow + a terminal build-log motif. */
const BUILD_LOG = [
  "$ git commit -m \"ship it\"",
  "✓ build passed · 0 errors · 0 warnings",
  "→ deploying to production…",
  "✓ live · idea → production, end to end",
];

export function HeHero() {
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
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-6 pt-28 pb-16 sm:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" aria-hidden />
      {reduce ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px circle at 50% 30%, rgba(52,211,153,0.10), transparent 70%)",
          }}
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
          <Reveal>
            <HeStatusLine />
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl">
              <span className="block">אני בונה מוצרים דיגיטליים</span>
              <span className="accent-gradient glow-text mt-2 block">מקצה לקצה.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted sm:text-xl">
              מהנדס מוצר פולסטאק שמתכנן, בונה ומשגר אפליקציות ווב, מוצרי{" "}
              <span dir="ltr" style={{ unicodeBidi: "isolate" }}>AI</span> ואוטומציות —
              מהקומיט הראשון ועד הפרודקשן.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton href="#work">לעבודות נבחרות</MagneticButton>
              <MagneticButton href="#contact" variant="ghost">
                בוא נעבוד יחד
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="hidden lg:block">
          <div dir="ltr">
            <TerminalMotif lines={BUILD_LOG} title="~/eldan — build" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
