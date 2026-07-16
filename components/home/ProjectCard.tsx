"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";
import { HE_PROJECT } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { PreviewVideo } from "@/components/PreviewVideo";
import { PhoneCarousel } from "@/components/home/PhoneCarousel";

/** Minimal project card: a bordered media frame + a title that tints to the
 *  accent on hover. If the project has a `preview` clip it plays as a muted,
 *  looping video (reference-style "the product is alive"); otherwise the first
 *  ready screenshot shows. Motion is fully disabled under reduced-motion —
 *  the video renders paused on its poster and never autoplays. */
export function ProjectCard({ project }: { project: Project }) {
  const { locale } = useLocale();
  const he = HE_PROJECT[project.slug];
  const kicker = locale === "he" && he ? he.kicker : project.kicker;
  const shot = project.screenshots.find((s) => s.ready);
  const preview = project.preview;
  const cardShots = project.cardShots;

  const mediaClass =
    "h-[92%] w-[92%] origin-top self-end rounded-t-md object-cover object-top";

  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="flex h-48 items-end justify-center overflow-hidden rounded-xl border border-card-border bg-card transition-colors duration-300 group-hover:border-accent/50">
        {cardShots?.length ? (
          <PhoneCarousel shots={cardShots} className="h-[90%] self-center" />
        ) : preview ? (
          <PreviewVideo preview={preview} className={mediaClass} />
        ) : shot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            className={`${mediaClass} motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]`}
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
