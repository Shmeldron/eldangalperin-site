import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects, publishedProjects } from "@/lib/projects";
import { site } from "@/lib/site";
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
  return {
    title: `${project.title} — ${project.kicker}`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — ${project.kicker}`,
      description: project.tagline,
      url: `${site.url}/work/${project.slug}`,
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
