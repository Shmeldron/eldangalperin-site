import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { getProject, projects, publishedProjects } from "@/lib/projects";
import { site } from "@/lib/site";
import { DeviceFrame } from "@/components/DeviceFrame";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/MagneticButton";

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
    <article className="mx-auto w-full max-w-4xl px-6 pb-24 pt-28 sm:px-10">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        back to work
      </Link>

      {/* header */}
      <header className="mt-8">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">
          {project.kicker} · {project.year}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-balance text-lg text-muted">
          {project.tagline}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs text-faint">
          <span>
            <span className="text-muted">role</span> · {project.role}
          </span>
          {project.links?.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-accent hover:underline"
            >
              {l.label}
              <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
      </header>

      {/* hero shot */}
      <Reveal className="mt-12">
        <DeviceFrame shot={project.screenshots[0]} priority />
      </Reveal>

      {/* body */}
      <div className="mt-16 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-10">
          <Section title="The problem">
            <p className="leading-relaxed text-muted">{project.problem}</p>
          </Section>

          <Section title="What I built">
            <ul className="space-y-3">
              {project.build.map((b, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Impact">
            <ul className="space-y-3">
              {project.impact.map((b, i) => (
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
              Stack
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-card-2 px-2.5 py-1 font-mono text-[11px] text-muted"
                >
                  {t}
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
        {next && (
          <Link href={`/work/${next.slug}`} className="group">
            <span className="font-mono text-xs text-faint">next project</span>
            <span className="mt-1 flex items-center gap-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
              {next.title}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        )}
        <MagneticButton href="/#contact">Start a project</MagneticButton>
      </div>
    </article>
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
