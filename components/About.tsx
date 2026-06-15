import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/lib/site";

const STACK: { group: string; items: string[] }[] = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { group: "Backend", items: ["Node.js", "PostgreSQL", "Supabase", "Edge Functions", "REST"] },
  { group: "AI / LLM", items: ["Anthropic Claude", "OpenAI", "Function calling", "RAG", "Prompt design"] },
  { group: "Ship", items: ["Vercel", "CI/CD", "Performance", "Analytics", "Security / RLS"] },
];

export function About() {
  return (
    <section id="about" className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:px-10">
      <Reveal>
        <SectionLabel index="02" title="About" />
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            I&apos;m {site.name}, a {site.role.toLowerCase()}. I like owning a product
            from the messy first idea all the way to something real people use — the
            data model, the API, the interface, and increasingly the AI that sits
            inside it.
          </p>
          <p>
            Lately that&apos;s meant building AI-powered products: an in-app assistant on
            Claude, multi-tenant content pipelines, and agents that take real actions.
            I care about the unglamorous parts too — auth, performance, security, and
            making things fast on a mid-range phone.
          </p>
          <p className="text-foreground">
            I take on a small number of freelance and consulting engagements where I
            can do my best work.{" "}
            <a href="#contact" className="text-accent underline-offset-4 hover:underline">
              Let&apos;s talk →
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {STACK.map((col) => (
            <div key={col.group} className="bg-card p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-accent">
                {col.group}
              </p>
              <ul className="mt-3 space-y-1.5">
                {col.items.map((it) => (
                  <li key={it} className="text-sm text-muted">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
