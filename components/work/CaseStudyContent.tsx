"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";
import { DICT, HE_CASE, HE_PROJECT } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function CaseStudyContent({
  project,
  nextProject,
}: {
  project: Project;
  nextProject?: { slug: string; title: string };
}) {
  const { locale } = useLocale();
  const t = DICT[locale].caseStudy;
  const isHe = locale === "he";
  const heProject = HE_PROJECT[project.slug];
  const heCase = HE_CASE[project.slug];

  const kicker = isHe && heProject ? heProject.kicker : project.kicker;
  const tagline = isHe && heProject ? heProject.tagline : project.tagline;
  const problem = isHe && heCase ? heCase.problem : project.problem;
  const build = isHe && heCase ? heCase.build : project.build;
  const impact = isHe && heCase ? heCase.impact : project.impact;
  const hero = project.screenshots.find((s) => s.ready);

  return (
    <article className="mx-auto w-full max-w-[600px] px-4 pb-24">
      <div className="flex items-center justify-between pt-8">
        <Link href="/#work" className="text-sm text-text-mid hover:text-accent">
          ← {t.back}
        </Link>
      </div>

      <p className="mt-8 text-sm text-muted">
        {kicker} · <span dir="ltr">{project.year}</span>
      </p>
      <h1 dir="ltr" className="mt-1 text-lg text-foreground">{project.title}</h1>
      <p className="mt-2 text-[15px] text-text-mid text-balance">{tagline}</p>

      {hero && (
        <div className="frame mt-6 overflow-hidden p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.src} alt={hero.alt} className="w-full rounded-md object-cover" loading="lazy" />
        </div>
      )}

      {project.links && project.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4" dir="ltr">
          {project.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-sweep text-sm">
              {l.label}
            </a>
          ))}
        </div>
      )}

      <Section title={t.problem}>
        <p className="text-[15px] leading-relaxed text-text-mid">{problem}</p>
      </Section>
      <Section title={t.built}>
        <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-mid">
          {build.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </Section>
      <Section title={t.impact}>
        <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-mid">
          {impact.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </Section>

      <Section title={t.stack}>
        <div className="flex flex-wrap gap-2" dir="ltr">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
              {s}
            </span>
          ))}
        </div>
      </Section>

      {nextProject && (
        <div className="mt-16 flex justify-end border-t border-border pt-4">
          <Link href={`/work/${nextProject.slug}`} className="group text-end">
            <span className="block text-xs text-muted">{t.nextProject}</span>
            <span className="text-[15px] text-foreground group-hover:text-accent">
              <span dir="ltr">{nextProject.title}</span> →
            </span>
          </Link>
        </div>
      )}
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg text-foreground">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
