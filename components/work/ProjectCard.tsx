"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { DeviceFrame } from "@/components/DeviceFrame";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
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
      className="group block"
      aria-label={`${project.title} — ${project.kicker}`}
    >
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
        className="card relative h-full overflow-hidden p-6 transition-colors duration-300 group-hover:border-accent/40 sm:p-7"
      >
        {/* hover glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="flex items-center justify-between font-mono text-xs text-faint">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.year}</span>
        </div>

        <div className="mt-4" style={{ transform: "translateZ(40px)" }}>
          <DeviceFrame shot={project.screenshots[0]} />
        </div>

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-accent">
              {project.kicker}
            </p>
          </div>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted">{project.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-card-2 px-2.5 py-1 font-mono text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.article>
    </Link>
  );
}
