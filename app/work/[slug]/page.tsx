import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { getProject, projects, publishedProjects } from "@/lib/projects";
import { site } from "@/lib/site";
import { HE_PROJECT, LOCALE_COOKIE, type Locale } from "@/lib/i18n/content";
import { CaseStudyContent } from "@/components/work/CaseStudyContent";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get(LOCALE_COOKIE)?.value === "he" ? "he" : "en";
  const he = locale === "he" ? HE_PROJECT[project.slug] : undefined;
  const kicker = he?.kicker ?? project.kicker;
  const tagline = he?.tagline ?? project.tagline;

  return {
    title: `${project.title} — ${kicker}`,
    description: tagline,
    alternates: { canonical: `${site.url}/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${kicker}`,
      description: tagline,
      url: `${site.url}/work/${project.slug}`,
      locale: locale === "he" ? "he_IL" : "en_US",
      alternateLocale: locale === "he" ? "en_US" : "he_IL",
    },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = publishedProjects.findIndex((p) => p.slug === project.slug);
  const next =
    idx >= 0 ? publishedProjects[(idx + 1) % publishedProjects.length] : undefined;

  return (
    <CaseStudyContent
      project={project}
      nextProject={next ? { slug: next.slug, title: next.title } : undefined}
    />
  );
}
