import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { IBM_Plex_Sans_Hebrew } from "next/font/google";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";
import { publishedProjects } from "@/lib/projects";
import { Reveal } from "@/components/motion/Reveal";
import { GithubIcon, LinkedinIcon } from "@/components/icons/Brand";
import { HeHero } from "@/components/he/HeHero";
import { HeProjectCard, type HeCopy } from "@/components/he/HeProjectCard";
import { HeContact } from "@/components/he/HeContact";

/**
 * Hebrew (RTL) homepage — a standalone PREVIEW living next to the English site.
 * Matches the English site's techy aesthetic (terminal motifs, device frames,
 * cursor glow, typed status line, magnetic buttons, 3D card tilt) with Hebrew
 * copy. The global English chrome is suppressed on /he by <Chrome>.
 *
 * Typography: IBM Plex Sans Hebrew (pairs with JetBrains Mono) for Hebrew text;
 * the existing `font-mono` (JetBrains Mono, loaded on <html>) carries every
 * English/code/number accent. `dir`/`lang`/font are set on the wrapper here —
 * a real launch would move them to the document root.
 */

const plex = IBM_Plex_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const heTitle = "אלדן גלפרין — בונה מוצרים דיגיטליים מקצה לקצה";
const heDescription =
  "מהנדס מוצר פולסטאק שמתכנן, בונה ומשגר אפליקציות ווב, מוצרי AI ואוטומציות — מהקומיט הראשון ועד הפרודקשן.";

export const metadata: Metadata = {
  title: { absolute: heTitle },
  description: heDescription,
  openGraph: { title: heTitle, description: heDescription, locale: "he_IL" },
  twitter: { title: heTitle, description: heDescription },
  // Preview only — keep it out of search until we commit to a Hebrew launch.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#0a0b0f" };

/** Isolate inline English/numbers inside RTL text (names, stack, years). */
function Ltr({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" className={className} style={{ unicodeBidi: "isolate" }}>
      {children}
    </span>
  );
}

/** Hebrew copy keyed by the real project slug (keeps terminal/screenshots/stack). */
const HE_COPY: Record<string, HeCopy> = {
  stayyoung: {
    kicker: "אפליקציית רווחה מבוססת AI",
    role: "מהנדס פולסטאק מייסד ומוביל",
    tagline:
      "אפליקציית רווחה חיה מבוססת AI — בנייה מקצה לקצה: מחוויית המשתמש, דרך טובי (מאמן ה‑AI שבתוך האפליקציה), ועד הפלטפורמה שמאחורי הקלעים.",
  },
  "stayyoung-platform": {
    kicker: "מרכז עסקי וצמיחה",
    role: "בנייה עצמאית",
    tagline:
      "הפלטפורמה הפנימית שמריצה את העסק — משפכי מכירה, מנויים וחיובים, סוכני AI, פיננסים והזמנות, באפליקציית Next.js אחת.",
  },
  "whatsapp-assistant": {
    kicker: "סוכן LLM על וואטסאפ",
    role: "בנייה עצמאית",
    tagline: "עוזר אישי שחי בתוך וואטסאפ — הודעה קולית נכנסת, פעולה אמיתית יוצאת.",
  },
  "spaceship-simulator-jarvis": {
    kicker: "סימולציה מרובת‑סוכנים",
    role: "בנייה עצמאית",
    tagline:
      "סימולטור תפעול חללית מרובה‑סוכנים: אורקסטרטור וסוכני ship‑AI שמתאמים ביניהם דרך פרוטוקול אדפטרים נקי.",
  },
};

const STACK: { group: string; items: string[] }[] = [
  { group: "פרונטאנד", items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { group: "בקאנד", items: ["Node.js", "PostgreSQL", "Supabase", "Edge Functions", "REST"] },
  { group: "AI / LLM", items: ["Anthropic Claude", "OpenAI", "Function calling", "RAG", "Prompt design"] },
  { group: "שילוח לפרודקשן", items: ["Vercel", "CI/CD", "ביצועים", "אנליטיקס", "אבטחה / RLS"] },
];

export default function HeHome() {
  return (
    <div
      dir="rtl"
      lang="he"
      className={`${plex.className} min-h-screen bg-background text-foreground`}
    >
      <HeHeader />
      <main>
        <HeHero />
        <HeWork />
        <HeAbout />
        <section
          id="contact"
          className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:px-10"
        >
          <Reveal>
            <SectionLabel index="03" title="בוא נעבוד יחד" />
            <p className="mt-4 max-w-xl text-balance text-lg leading-relaxed text-muted">
              יש לכם מוצר לבנות או יכולת AI לשגר? אני פנוי למספר מצומצם של פרויקטים
              בעבודה עצמאית וייעוץ.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <HeContact />
          </Reveal>
        </section>
      </main>
      <HeFooter />
    </div>
  );
}

function HeHeader() {
  const nav = [
    { href: "#work", label: "עבודות" },
    { href: "#about", label: "אודות" },
    { href: "#contact", label: "יצירת קשר" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-transparent">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link href="/he" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          <Ltr className="font-mono text-accent">~/</Ltr>
          <span className="text-foreground">אלדן גלפרין</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-card hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Flip back to the English site (preview affordance). */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-card px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-foreground"
        >
          <Ltr>EN</Ltr>
        </Link>
      </div>
    </header>
  );
}

function HeWork() {
  return (
    <section
      id="work"
      className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:px-10"
    >
      <Reveal>
        <SectionLabel index="01" title="עבודות נבחרות" />
        <p className="mt-4 max-w-xl text-balance text-muted">
          כמה מוצרים שליוויתי מרעיון ועד פרודקשן. פחות פרויקטים, יותר עומק —
          העבודה היא ההוכחה.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {publishedProjects.map((project, i) => {
          const he = HE_COPY[project.slug];
          if (!he) return null;
          return (
            <Reveal key={project.slug} delay={i * 0.08}>
              <HeProjectCard project={project} he={he} index={i} />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function HeAbout() {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:px-10"
    >
      <Reveal>
        <SectionLabel index="02" title="אודות" />
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            אני אלדן גלפרין, מהנדס מוצר פולסטאק. אני אוהב לקחת מוצר מהרעיון הראשון
            והמבולגן ועד משהו שאנשים אמיתיים משתמשים בו — מודל הנתונים, ה‑<Ltr>API</Ltr>,
            הממשק, ויותר ויותר גם ה‑<Ltr>AI</Ltr> שיושב בתוכו.
          </p>
          <p>
            בזמן האחרון זה אומר בניית מוצרים מבוססי <Ltr>AI</Ltr>: עוזר בתוך
            האפליקציה על <Ltr>Claude</Ltr>, צינורות תוכן מרובי‑דיירים, וסוכנים
            שמבצעים פעולות אמיתיות. אכפת לי גם מהחלקים הפחות זוהרים — הרשאות,
            ביצועים, אבטחה, ולגרום לדברים לרוץ מהר גם על טלפון בינוני.
          </p>
          <p className="text-foreground">
            אני לוקח מספר מצומצם של פרויקטים בעבודה עצמאית וייעוץ, שם אני יכול
            לעשות את העבודה הכי טובה שלי.{" "}
            <a href="#contact" className="text-accent underline-offset-4 hover:underline">
              ←&nbsp;בוא נדבר
            </a>
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2"
        >
          {STACK.map((col) => (
            <div key={col.group} className="bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                {col.group}
              </p>
              <ul className="mt-3 space-y-1.5">
                {col.items.map((it) => (
                  <li key={it} className="text-sm text-muted">
                    {/^[֐-׿]/.test(it) ? it : <Ltr className="font-mono text-[13px]">{it}</Ltr>}
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

function HeFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center sm:px-10">
        <div className="text-xs text-faint">
          <p className="text-muted">
            <Ltr className="font-mono text-accent">$</Ltr> נבנה על ידי אלדן גלפרין
          </p>
          <p className="mt-1">
            <Ltr className="font-mono">Next.js · TypeScript · Tailwind · Vercel</Ltr>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a href="#work" className="text-xs text-muted hover:text-foreground">
            עבודות
          </a>
          <a href="#contact" className="text-xs text-muted hover:text-foreground">
            יצירת קשר
          </a>
          <Link href="/" className="inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />
            <Ltr>EN</Ltr>
          </Link>
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-accent"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-accent"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <Ltr className="font-mono text-xs text-accent">{index}</Ltr>
      <span className="h-px w-8 bg-border-strong" />
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    </div>
  );
}
