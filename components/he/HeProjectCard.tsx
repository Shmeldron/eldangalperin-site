"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { DeviceFrame } from "@/components/DeviceFrame";
import { TerminalMotif } from "@/components/TerminalMotif";
import { isHebrew } from "@/lib/i18n/content";

/** Hebrew copy overlaid on a real project (keeps its terminal/screenshots/stack). */
export type HeCopy = {
  kicker: string;
  tagline: string;
  role: string;
  highlights?: { value: string; label: string }[];
};

/**
 * Project card. Links to the case study; mirrors the English original — 3D tilt,
 * hover glow, terminal motif / device frame. English tokens (name, year, stack)
 * stay LTR + mono; the corner arrow mirrors in RTL.
 */
export function HeProjectCard({
  project,
  he,
  index,
}: {
  project: Project;
  he: HeCopy;
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sry = useSpring(ry, { stiffness: 150, damping: 15 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`${project.title} — ${he.kicker}`}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
        className="card relative h-full overflow-hidden p-6 transition-colors duration-300 group-hover:border-accent/40 sm:p-7"
      >
        {/* hover glow — pinned to the inline-end corner, mirrors in RTL */}
        <div className="pointer-events-none absolute -top-20 -end-20 h-48 w-48 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="flex items-center justify-between font-mono text-xs text-faint" dir="ltr">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.year}</span>
        </div>

        <div className="mt-4" style={{ transform: "translateZ(40px)" }}>
          <div dir="ltr">
            {project.kind === "service" ? (
              <TerminalMotif lines={project.terminal ?? []} title={project.slug} />
            ) : (
              <DeviceFrame shot={project.screenshots[0]} />
            )}
          </div>
        </div>

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight" dir="ltr">
              {project.title}
            </h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-accent">
              {he.kicker}
            </p>
          </div>
          {/* rtl:-scale-x-100 flips the arrow (and its hover nudge) for RTL */}
          <ArrowUpRight className="h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl:-scale-x-100" />
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted">{he.tagline}</p>

        {he.highlights && he.highlights.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 border-t border-border pt-4">
            {he.highlights.map((h) => (
              <div key={h.label}>
                <div className="text-base font-semibold leading-tight tracking-tight text-foreground">
                  {isHebrew(h.value) ? (
                    h.value
                  ) : (
                    <span dir="ltr" style={{ unicodeBidi: "isolate" }}>
                      {h.value}
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-[11px] text-faint">{h.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((t) => (
            <span
              key={t}
              dir="ltr"
              className="rounded-full border border-border bg-card-2 px-2.5 py-1 font-mono text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="mt-4 text-xs text-muted">{he.role}</p>
      </motion.article>
    </Link>
  );
}
