"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";
import { HE_PROJECT } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/** Minimal project card: a bordered media frame + a title that tints to the
 *  accent on hover. On hover the frame border warms to the accent and the shot
 *  eases in a touch — restrained motion, fully disabled under reduced-motion. */
export function ProjectCard({ project }: { project: Project }) {
  const { locale } = useLocale();
  const he = HE_PROJECT[project.slug];
  const kicker = locale === "he" && he ? he.kicker : project.kicker;
  const shot = project.screenshots.find((s) => s.ready);

  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="flex h-40 items-end justify-center overflow-hidden rounded-xl border border-card-border bg-card transition-colors duration-300 group-hover:border-accent/50">
        {shot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            className="h-[92%] w-[92%] origin-top self-end rounded-t-md object-cover object-top motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
          />
        ) : (
          <span dir="ltr" className="pb-6 font-mono text-xs text-faint">{project.title}</span>
        )}
      </div>
      <p dir="ltr" className="mt-2 px-0.5 text-[15px] font-medium text-foreground transition-colors group-hover:text-accent">
        {project.title}
      </p>
      <p className="mt-0.5 px-0.5 text-sm text-text-mid text-balance">{kicker}</p>
    </Link>
  );
}
