/**
 * Typed content model for portfolio work.
 * Add a project = add an entry here + drop images into /public/work/<slug>/.
 *
 * `published: false` keeps an entry out of public listings (used as a
 * permission/asset gate) while still letting you build & preview it.
 */

export type Screenshot = {
  src: string;
  alt: string;
  /** Visual frame to render the shot in. */
  frame?: "browser" | "phone" | "none";
  /**
   * Set to true once a real asset exists at `src`. Until then a branded
   * placeholder renders in its place (so there are no broken images).
   */
  ready?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  /** Short label shown on the card, e.g. "AI wellness platform". */
  kicker: string;
  tagline: string;
  year: string;
  role: string;
  /** Live/repo links shown on the case study. */
  links?: { label: string; href: string }[];
  stack: string[];
  /** Card + case-study hero accent. */
  featured?: boolean;
  published: boolean;
  problem: string;
  build: string[];
  impact: string[];
  screenshots: Screenshot[];
};

export const projects: Project[] = [
  {
    slug: "stayyoung",
    title: "StayYoung",
    kicker: "AI wellness platform",
    tagline:
      "An AI-driven wellness platform — owned end to end, from the product app to the on-site AI coach and the marketing site.",
    year: "2025–26",
    role: "Founding / lead full-stack engineer",
    links: [{ label: "Visit StayYoung", href: "https://stayyoung.live" }],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL / RLS",
      "Edge Functions",
      "Anthropic Claude",
      "Tailwind",
    ],
    featured: true,
    published: true,
    problem:
      "Wellness guidance is generic and hard to stick with. StayYoung set out to deliver a personalised, conversational experience that meets people in Hebrew, on mobile, and adapts to them over time — which meant building a real product, not a landing page.",
    build: [
      "Owned the full stack end to end: the member app, the marketing site, and the internal finance/ops tooling.",
      "Built Tovi, an in-app AI assistant on Claude — scoped system prompts, streaming responses, and guardrails for a safe, on-brand conversation.",
      "Designed a Hebrew-first, RTL-correct UI system on React + Tailwind + shadcn that stays fast on mobile.",
      "Modelled the data in PostgreSQL with row-level security and SECURITY DEFINER RPCs; auth, OTP, and notification flows wired through Supabase Edge Functions.",
    ],
    impact: [
      // TODO(eldan): replace with real, defensible metrics.
      "Shipped the platform from zero to production as the core engineer.",
      "AI assistant handles member questions with hard cost/rate guardrails in place.",
      "RTL-first design system keeps the mobile experience fast and consistent.",
    ],
    screenshots: [
      { src: "/work/stayyoung/cover.png", alt: "StayYoung app home screen", frame: "phone" },
      { src: "/work/stayyoung/chat.png", alt: "Tovi AI assistant conversation", frame: "phone" },
      { src: "/work/stayyoung/web.png", alt: "StayYoung marketing site", frame: "browser", ready: true },
    ],
  },
  {
    slug: "organic-content-saas",
    title: "Organic Content SaaS",
    kicker: "Multi-tenant content engine",
    tagline:
      "A multi-tenant pipeline that turns a brand's raw inputs into ready-to-publish social content.",
    year: "2025",
    role: "Founder & engineer",
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Multi-tenant auth",
      "LLM pipelines",
      "Queues / background jobs",
    ],
    featured: true,
    published: true,
    problem:
      "Small brands want a steady stream of on-brand social content but can't staff it. The goal: a self-serve SaaS that ingests a brand's voice and assets and produces a publishable content calendar with minimal human touch.",
    build: [
      "Designed the multi-tenant architecture — isolated workspaces, per-tenant data, and role-based access.",
      "Built the content→social pipeline: ingestion, LLM generation against per-brand voice context, and review/approval steps.",
      "Implemented background processing for long-running generation jobs with retries and status tracking.",
    ],
    impact: [
      "Took the product from concept to a working multi-tenant pipeline.",
      "Generation pipeline produces draft content runs end to end per tenant.",
    ],
    screenshots: [
      { src: "/work/organic-content-saas/cover.png", alt: "Content SaaS dashboard", frame: "browser" },
    ],
  },
  {
    slug: "whatsapp-assistant",
    title: "WhatsApp Personal Assistant",
    kicker: "LLM agent over WhatsApp",
    tagline:
      "A personal assistant that lives in WhatsApp — natural-language requests in, real actions out.",
    year: "2024",
    role: "Solo build",
    links: [{ label: "Source on GitHub", href: "https://github.com/Shmeldron" }],
    stack: ["Node.js", "whatsapp-web.js", "LLM / function calling", "TypeScript"],
    published: true,
    problem:
      "I wanted an assistant I'd actually use daily — no new app to open, just my existing chat. WhatsApp is where the messages already are.",
    build: [
      "Bridged WhatsApp to an LLM with whatsapp-web.js, handling session auth and message lifecycle.",
      "Added function-calling so the model can take structured actions, not just chat.",
      "Kept it resilient to reconnects and long-running sessions.",
    ],
    impact: [
      "A working daily-driver assistant accessible from any chat.",
      "Demonstrates LLM tool-use / agent plumbing on a real messaging channel.",
    ],
    screenshots: [
      { src: "/work/whatsapp-assistant/cover.png", alt: "WhatsApp assistant conversation", frame: "phone" },
    ],
  },
];

export const publishedProjects = projects.filter((p) => p.published);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
