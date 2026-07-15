"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { publishedProjects } from "@/lib/projects";
import { DICT, HE_PROJECT } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { site } from "@/lib/site";
import { ProjectCard } from "@/components/home/ProjectCard";
import { EmailReveal } from "@/components/home/EmailReveal";

export function HomeContent() {
  const { locale } = useLocale();
  const t = DICT[locale].home;
  const featured = publishedProjects.filter((p) => p.featured);
  const services = publishedProjects.filter((p) => p.kind === "service");
  const shouldReduce = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-[600px] px-4 pb-24">
      {/* Intro — the "who I am + what I can do", in plain prose. */}
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduce ? 0 : 0.5, ease: "easeOut" }}
        className="mt-8 flex flex-col gap-2 text-[15px] leading-relaxed text-foreground"
      >
        <h1 className="font-normal">{t.greeting}</h1>
        <p>
          {t.intro2pre}
          <Link href="/work/stayyoung" dir="ltr" className="link-sweep">{t.intro2sy}</Link>
          {t.intro2mid}
          <Link href="/work/stayyoung-platform" className="link-sweep">{t.intro2platform}</Link>
          {t.intro2post}
        </p>
        <p>
          {t.ctaLead}
          <a href="#contact" className="link-sweep">{t.ctaBook}</a>
          {t.ctaMid}
          <a dir="ltr" href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="link-sweep">{t.ctaLinkedin}</a>
          {t.ctaPost}
        </p>
      </motion.section>

      {/* Projects — featured, as cards. */}
      <section id="work" className="mt-10 scroll-mt-20">
        <h2 className="text-[15px] font-normal text-muted">{t.projectsLabel}</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>

      {/* More — service projects, as a spotlight-hover list. */}
      {services.length > 0 && (
        <section id="more" className="mt-10 scroll-mt-20">
          <h2 className="text-[15px] font-normal text-muted">{t.moreLabel}</h2>
          <div className="spotlight mt-4">
            {services.map((p) => {
              const he = HE_PROJECT[p.slug];
              const desc = locale === "he" && he ? he.kicker : p.kicker;
              return (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="spot-row flex items-baseline justify-between gap-4 rounded border-b border-border px-2 py-3 last:border-b-0 -mx-2"
                >
                  <span className="text-sm">{p.title}</span>
                  <span className="max-w-[52%] text-end text-[13px] text-muted text-balance">{desc}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Elsewhere — contact + links. */}
      <section id="contact" className="mt-16 scroll-mt-20">
        <h2 className="text-[15px] font-normal text-muted">{t.elsewhereLabel}</h2>
        <p className="mt-1 text-[15px] text-foreground">{t.elsewhereSub}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <EmailReveal />
          <span className="text-dim">·</span>
          <a dir="ltr" href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-mid underline decoration-dotted decoration-faint underline-offset-[3px] hover:text-accent hover:decoration-accent">LinkedIn</a>
        </div>
      </section>
    </div>
  );
}
