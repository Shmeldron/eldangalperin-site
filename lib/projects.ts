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
  /**
   * "ui" projects render screenshots in device frames; "service" projects
   * (bots, backends, agents — no UI) render a terminal motif instead.
   */
  kind?: "ui" | "service";
  /** Lines shown in the terminal motif for service projects. */
  terminal?: string[];
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
      "An AI-driven wellness platform — owned end to end, from the member app to the on-site AI coach to the subscription platform behind it.",
    year: "2025–26",
    role: "Founding / lead full-stack engineer",
    links: [{ label: "Visit StayYoung", href: "https://stayyoung.live" }],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL / RLS",
      "Edge Functions",
      "OpenAI",
      "Tailwind",
    ],
    featured: true,
    published: true,
    problem:
      "Wellness guidance is generic and hard to stick with. StayYoung set out to deliver a personalised, conversational experience that meets people in Hebrew, on mobile, and adapts to them over time — which meant building a real product, not a landing page.",
    build: [
      "Owned the full stack end to end: the member app, the AI coach, and the subscription, billing, and funnel platform that runs the business side.",
      "Built Tovi, the in-app AI coach — scoped prompts, streaming replies, and guardrails for safe, on-brand answers (its own case study).",
      "Designed a Hebrew-first, RTL-correct UI system on React + Tailwind + shadcn that stays fast on mobile.",
      "Modelled the data in PostgreSQL with row-level security and SECURITY DEFINER RPCs; auth, OTP, and notification flows wired through Supabase Edge Functions.",
    ],
    impact: [
      // TODO(eldan): replace with real, defensible metrics.
      "Shipped the platform from zero to production as the core engineer.",
      "An AI coach answers member questions 24/7, with hard cost/rate guardrails.",
      "RTL-first design system keeps the mobile experience fast and consistent.",
    ],
    screenshots: [
      { src: "/work/stayyoung/home.png", alt: "StayYoung member app — personalised home", frame: "phone", ready: true },
      { src: "/work/stayyoung/cover.png", alt: "StayYoung member app — recipe & content library", frame: "phone", ready: true },
      { src: "/work/stayyoung/journal.png", alt: "StayYoung app — live sessions & journal", frame: "phone", ready: true },
    ],
  },
  {
    slug: "tovi",
    title: "Tovi — AI Wellness Coach",
    kicker: "in-app AI assistant",
    tagline:
      "The conversational AI coach inside StayYoung — answering members' nutrition, fasting, and wellness questions in natural Hebrew, 24/7.",
    year: "2025–26",
    role: "Solo build",
    stack: ["Node.js", "Express", "OpenAI", "MongoDB", "MySQL", "Streaming", "Hebrew / RTL"],
    featured: true,
    published: true,
    problem:
      "Static content doesn't keep people on track — they have questions in the moment. Tovi is the always-available coach that answers in natural Hebrew, right inside the app, instead of sending members off to search.",
    build: [
      "Built the assistant backend on Express + OpenAI — scoped prompts, streaming replies, and guardrails so answers stay on-brand and safe.",
      "Persisted conversations and context (MongoDB + MySQL) so Tovi can personalise and follow the thread.",
      "Wired Tovi straight into the member app's chat UI — Hebrew-first, RTL-correct, and fast on mobile.",
    ],
    impact: [
      "An always-on AI coach handling member questions 24/7, inside the product.",
      "Production LLM plumbing end to end: prompts, streaming, persistence, and guardrails.",
    ],
    screenshots: [
      { src: "/work/stayyoung/chat.png", alt: "Tovi answering a member's question in Hebrew", frame: "phone", ready: true },
    ],
  },
  {
    slug: "stayyoung-platform",
    title: "StayYoung Platform",
    kicker: "business & growth hub",
    tagline:
      "The internal platform that runs the business — sales funnels, subscription billing, AI agents, finance, and bookings, in one Next.js app.",
    year: "2025–26",
    role: "Solo build",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Vercel Postgres",
      "NextAuth",
      "Vercel AI SDK",
      "PayPlus",
      "Meta Ads API",
    ],
    featured: true,
    published: true,
    problem:
      "Running a subscription business means juggling funnels, payments, dunning, ads, finance, and support — usually across a dozen disconnected SaaS tools. This platform pulls all of it into one place, custom-built for how the business actually operates.",
    build: [
      "A multi-step funnel engine (optin → sales → upsell → downsell → thank-you) with a visual, node-based builder and AI-assisted editing.",
      "Subscription billing on PayPlus with automated dunning, retries, and cron-driven reconciliation — plus a WooCommerce migration path.",
      "Per-agent AI assistants (own knowledge base, sandbox, analytics), a finance dashboard (cashflow, P&L, VAT, forecasts), embedded meeting booking, and Meta Ads integration.",
    ],
    impact: [
      "Replaces a stack of SaaS tools with one platform tailored to the business.",
      "Automates the money-critical parts — recurring billing, dunning, and reconciliation.",
    ],
    screenshots: [
      { src: "/work/stayyoung-platform/funnel-builder.png", alt: "StayYoung platform — visual funnel builder", frame: "browser" },
    ],
  },
  {
    slug: "whatsapp-assistant",
    title: "WhatsApp Personal Assistant",
    kicker: "LLM agent over WhatsApp",
    tagline:
      "A self-hosted assistant that lives in WhatsApp — voice notes in, real actions out.",
    year: "2025",
    role: "Solo build",
    kind: "service",
    terminal: [
      "$ node whatsapp-assistant",
      "✓ whatsapp session connected",
      "✓ mcp tools loaded · skills ready",
      "→ voice note → transcribed → answered",
      "→ cron: evening digest scheduled",
      "# reminders · google · clickup · memory",
    ],
    stack: ["Node.js", "whatsapp-web.js", "OpenAI", "MCP", "Google APIs", "node-cron", "embeddings"],
    published: true,
    problem:
      "I wanted an assistant I'd actually use daily — no new app to open, just the chat I'm already in. WhatsApp is where the messages already are.",
    build: [
      "Bridged WhatsApp to an LLM with whatsapp-web.js — voice-note transcription, spoken replies, and per-contact memory via embeddings.",
      "Added reminders, cron jobs, an evening digest, and a daily briefing, all delivered over WhatsApp.",
      "Integrated Google APIs and MCP tool servers so the assistant takes real actions, not just chats.",
    ],
    impact: [
      "A daily-driver assistant reachable from any chat — with voice and memory.",
      "Demonstrates LLM tool-use / MCP plumbing on a real messaging channel.",
    ],
    screenshots: [],
  },
  {
    slug: "spaceship-simulator-jarvis",
    title: "Spaceship Simulator — Jarvis",
    kicker: "Multi-agent simulation",
    tagline:
      "A multi-agent spaceship-operations simulator: an orchestrator and ship-AI agents coordinating through a clean adapter protocol.",
    year: "2026",
    role: "Solo build",
    kind: "service",
    terminal: [
      "$ uv run bot-bench",
      "✓ merlin orchestrator online",
      "✓ ship-ai agents ×2 spawned",
      "→ adapters: mock layer (contract-tested)",
      "→ agents negotiating ship ops…",
      "# fastapi operator dashboard @ :8000",
    ],
    stack: ["Python", "FastAPI", "Multi-agent", "TDD · contract tests", "uv"],
    published: true,
    problem:
      "How do multiple autonomous agents coordinate to run a complex system — without coupling them to real hardware? This simulator is the testbed.",
    build: [
      "Three long-running agent processes — a Merlin orchestrator plus two ship-AI agents — communicating through adapter protocols.",
      "A full mock-adapter layer with shared contract tests, so real adapters can swap in later without touching agent logic.",
      "A FastAPI operator dashboard and a bot-bench runner for exercising the whole system.",
    ],
    impact: [
      "A clean, test-first architecture for multi-agent coordination.",
      "Adapter + contract-test design keeps agents swappable and verifiable.",
    ],
    screenshots: [],
  },
];

export const publishedProjects = projects.filter((p) => p.published);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
