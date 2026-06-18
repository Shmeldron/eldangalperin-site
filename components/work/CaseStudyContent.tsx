"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";
import { DeviceFrame } from "@/components/DeviceFrame";
import { TerminalMotif } from "@/components/TerminalMotif";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { DICT, DIR, HE_CASE, HE_PROJECT, isHebrew } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/** Isolates an English token inside RTL flow (or renders as-is when Hebrew). */
function Ltr({ children }: { children: string }) {
  return (
    <span dir="ltr" style={{ unicodeBidi: "isolate" }}>
      {children}
    </span>
  );
}

export function CaseStudyContent({
  project,
  nextProject,
}: {
  project: Project;
  nextProject?: { slug: string; title: string };
}) {
  const { locale } = useLocale();
  const reduce = useReducedMotion();
  const ui = DICT[locale].caseStudy;

  // Hebrew kicker/tagline/role (fall back to English project fields).
  const heProject = HE_PROJECT[project.slug];
  const heCase = HE_CASE[project.slug];
  const he = locale === "he";

  const kicker = he && heProject ? heProject.kicker : project.kicker;
  const tagline = he && heProject ? heProject.tagline : project.tagline;
  const role = he && heProject ? heProject.role : project.role;
  const problem = he && heCase ? heCase.problem : project.problem;
  const build = he && heCase ? heCase.build : project.build;
  const impact = he && heCase ? heCase.impact : project.impact;

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={locale}
        dir={DIR[locale]}
        lang={locale}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: reduce ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-4xl px-6 pb-24 pt-28 sm:px-10"
      >
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
          {ui.back}
        </Link>

        {/* header */}
        <header className="mt-8">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            {isHebrew(kicker) ? kicker : <Ltr>{kicker}</Ltr>} ·{" "}
            <Ltr>{project.year}</Ltr>
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            <Ltr>{project.title}</Ltr>
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-lg text-muted">
            {tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs text-faint">
            <span>
              <span className="text-muted">{ui.roleLabel}</span> ·{" "}
              {isHebrew(role) ? role : <Ltr>{role}</Ltr>}
            </span>
            {project.links?.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent hover:underline"
              >
                <Ltr>{l.label}</Ltr>
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </header>

        {/* hero shot */}
        <Reveal className="mt-12">
          {project.kind === "service" ? (
            <TerminalMotif lines={project.terminal ?? []} title={project.slug} />
          ) : (
            <DeviceFrame shot={project.screenshots[0]} priority />
          )}
        </Reveal>

        {/* body */}
        <div className="mt-16 grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            <Section title={ui.problem}>
              <p className="leading-relaxed text-muted">{problem}</p>
            </Section>

            <Section title={ui.built}>
              <ul className="space-y-3">
                {build.map((b, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title={ui.impact}>
              <ul className="space-y-3">
                {impact.map((b, i) => (
                  <li key={i} className="flex gap-3 leading-relaxed text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <aside className="md:sticky md:top-24 md:self-start">
            <div className="card p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-accent">
                {ui.stack}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-card-2 px-2.5 py-1 font-mono text-[11px] text-muted"
                  >
                    {isHebrew(t) ? t : <Ltr>{t}</Ltr>}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* additional shots */}
        {project.screenshots.length > 1 && (
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {project.screenshots.slice(1).map((shot, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <DeviceFrame shot={shot} />
              </Reveal>
            ))}
          </div>
        )}

        {/* footer nav */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-10 sm:flex-row sm:items-center">
          {nextProject && (
            <Link href={`/work/${nextProject.slug}`} className="group">
              <span className="font-mono text-xs text-faint">{ui.nextProject}</span>
              <span className="mt-1 flex items-center gap-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                <Ltr>{nextProject.title}</Ltr>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </span>
            </Link>
          )}
          <MagneticButton href="/#contact">{ui.startProject}</MagneticButton>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section">
      <h2 className="font-mono text-xs uppercase tracking-wider text-faint">{title}</h2>
      <div className="mt-3">{children}</div>
    </Reveal>
  );
}
