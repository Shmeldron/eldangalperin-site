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
      "Owned the full stack end to end: the member app, the AI coach, and the subscription, billing, and funnel platform that runs the business side.",
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
      { src: "/work/stayyoung/chat.png", alt: "Tovi — the in-app AI wellness coach", frame: "phone", ready: true },
      { src: "/work/stayyoung/cover.png", alt: "StayYoung member app — recipe & content library", frame: "phone", ready: true },
      { src: "/work/stayyoung/journal.png", alt: "StayYoung app — live sessions & journal", frame: "phone", ready: true },
    ],
  },
  {
    slug: "organic-content-saas",
    title: "Organic Content SaaS",
    kicker: "AI reels generator",
    tagline:
      "A SaaS that turns raw footage into ready-to-publish short-form video — transcribed, subtitled, and composited by an AI pipeline.",
    year: "2025",
    role: "Founder & engineer",
    stack: [
      "Next.js",
      "TypeScript",
      "Anthropic Claude",
      "Vercel AI SDK",
      "Drizzle ORM",
      "Neon Postgres",
      "Python · ffmpeg · Whisper",
      "Vercel Blob",
    ],
    featured: true,
    published: true,
    problem:
      "Creators need a constant stream of short-form video, but editing — trimming, captioning, compositing — is the slow, repetitive part. The goal: a self-serve SaaS that turns raw clips into publishable reels with minimal hands-on work.",
    build: [
      "Built the reels generator: a Python pipeline that trims silence, transcribes with Whisper, burns subtitles, removes backgrounds, and composites the final video.",
      "Wired Claude in through the Vercel AI SDK for AI-assisted content generation inside the workflow.",
      "Multi-user dashboard with auth, invite links, and shareable media/profile pages; Drizzle + Neon Postgres with Vercel Blob for media storage.",
    ],
    impact: [
      "Automates the slowest part of short-form — from raw clip to subtitled, composited reel.",
      "Multi-user from day one: auth, invites, and per-user media.",
    ],
    screenshots: [
      { src: "/work/organic-content-saas/cover.png", alt: "Organic Content SaaS dashboard", frame: "browser" },
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
    slug: "stayyoung-unsubscribe",
    title: "Email Unsubscribe Agent",
    kicker: "AI inbox automation",
    tagline:
      "A backend service that reads inbound email and uses an LLM to decide what to unsubscribe from — automatically.",
    year: "2024",
    role: "Solo build",
    kind: "service",
    terminal: [
      "$ node unsubscribe-worker",
      "✓ gmail api connected",
      "✓ rabbitmq queue online",
      "→ scanning inbox · classifying",
      "→ llm: unsubscribe candidate?",
      "✓ lists unsubscribed",
    ],
    stack: ["Node.js", "Express", "OpenAI", "Gmail API", "RabbitMQ", "MySQL"],
    published: true,
    problem:
      "Marketing inboxes drown in list noise. The goal: automatically detect unwanted subscriptions and act on them at scale, without a human triaging every message.",
    build: [
      "Gmail integration that scans inbound mail and routes unsubscribe candidates through a queue.",
      "An OpenAI-powered classifier that decides whether — and how — to unsubscribe.",
      "RabbitMQ for async job handling with MySQL persistence, built to run continuously.",
    ],
    impact: [
      "Turns a manual chore into an autonomous background worker.",
      "Queue-based design absorbs inbox volume without blocking.",
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
