import { publishedProjects } from "@/lib/projects";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "./ProjectCard";
import { SectionLabel } from "@/components/SectionLabel";

export function WorkGrid() {
  return (
    <section id="work" className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:px-10">
      <Reveal>
        <SectionLabel index="01" title="Selected work" />
        <p className="mt-4 max-w-xl text-balance text-muted">
          A few products I&apos;ve taken from idea to production. Fewer, deeper case
          studies — the work is the proof.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {publishedProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <ProjectCard project={project} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
