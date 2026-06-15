"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowDown } from "lucide-react";
import { site } from "@/lib/site";
import { StatusLine } from "./StatusLine";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./motion/Reveal";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_{}#%&";

/** Decrypt/scramble a string into place over a short window. */
function useScramble(target: string, enabled: boolean) {
  // When disabled (reduced motion), the target is shown immediately.
  const [output, setOutput] = useState(() => (enabled ? "" : target));

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const total = target.length;
    let raf: number;
    const step = () => {
      const revealed = Math.floor(frame / 2);
      let out = "";
      for (let i = 0; i < total; i++) {
        if (target[i] === " ") out += " ";
        else if (i < revealed) out += target[i];
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOutput(out);
      frame++;
      if (revealed <= total) raf = requestAnimationFrame(step);
      else setOutput(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, enabled]);

  return output;
}

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Cursor-tracking glow (values are 0–100, rendered as %).
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

  const headline = useScramble("I build products", !reduce);

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-6 pt-28 pb-16 sm:px-10"
    >
      {/* grid + radial glow backdrop */}
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

      <div className="relative mx-auto w-full max-w-5xl">
        <Reveal>
          <StatusLine />
        </Reveal>

        <h1 className="mt-6 font-sans text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          <span className="block">
            <span className="accent-gradient glow-text font-mono">{headline}</span>
          </span>
          <span className="mt-2 block text-foreground">end to end.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-balance text-lg text-muted sm:text-xl">
          {site.name} — a {site.role.toLowerCase()} who designs, builds, and ships
          web apps, AI products, and automations. From the first commit to
          production.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <MagneticButton href="#work">View selected work</MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Let&apos;s work together
          </MagneticButton>
        </div>

        <div className="mt-16 flex items-center gap-2 font-mono text-xs text-faint">
          <ArrowDown className="h-3.5 w-3.5 animate-bounce motion-reduce:animate-none" />
          scroll
        </div>
      </div>
    </section>
  );
}
