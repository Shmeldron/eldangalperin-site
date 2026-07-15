"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";
import { HE_PROJECT } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/** Minimal project card: a bordered media frame + a title that tints to the
 *  accent on hover, and a one-line description. No lift, no shadow. */
export function ProjectCard({ project }: { project: Project }) {
  const { locale } = useLocale();
  const he = HE_PROJECT[project.slug];
  const kicker = locale === "he" && he ? he.kicker : project.kicker;
  const shot = project.screenshots.find((s) => s.ready);

  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="flex h-40 items-end justify-center overflow-hidden rounded-xl border border-card-border bg-card">
        {shot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            className="h-[92%] w-[92%] self-end rounded-t-md object-cover object-top"
          />
        ) : (
          <span className="pb-6 font-mono text-xs text-faint">{project.title}</span>
        )}
      </div>
      <p className="mt-2 px-0.5 text-[15px] font-medium text-foreground transition-colors group-hover:text-accent">
        {project.title}
      </p>
      <p className="mt-0.5 px-0.5 text-sm text-text-mid text-balance">{kicker}</p>
    </Link>
  );
}
