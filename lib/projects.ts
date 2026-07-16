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
  /** Up to ~2 short proof points shown on the card — value + label. */
  highlights?: { value: string; label: string }[];
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
  /**
   * Optional looping video preview for the home card (reference-style "the
   * product is alive" animation). Rendered muted + looping; `poster` (a still)
   * shows before load and under reduced-motion. `webm` is an optional smaller
   * source tried before the `mp4` fallback.
   */
  preview?: { mp4: string; webm?: string; poster: string; alt: string };
  /**
   * Home-card screens for a mobile app: shown as a floating phone that slides
   * through them (a single phone would crop in the wide card). All entries must
   * share one aspect ratio. When set, the card uses this instead of `preview`;
   * `preview` still drives the larger case-study hero.
   */
  cardShots?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "stayyoung",
    title: "StayYoung",
    kicker: "AI wellness app",
    tagline:
      "A live, AI-driven wellness app — owned end to end, from the member experience to Tovi, the in-app AI coach, to the platform behind it.",
    year: "2025–26",
    role: "Founding / lead full-stack engineer",
    highlights: [
      { value: "iOS + Android", label: "live in production" },
      { value: "24/7", label: "in-app AI coach" },
    ],
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/stayyoung/id6759099350" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=stayyoung.app.lovable" },
    ],
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL / RLS",
      "MongoDB",
      "MySQL",
      "Edge Functions",
      "Node.js / Express",
      "OpenAI",
      "Tailwind",
    ],
    featured: true,
    published: true,
    problem:
      "Wellness guidance is generic and easy to drop. StayYoung set out to deliver a personalised, conversational experience that meets people in Hebrew, on mobile, and adapts over time — answering their questions in the moment, not after a search. That meant building a real product, not a landing page.",
    build: [
      "Owned the full stack end to end — the member app, Tovi the in-app AI coach, and the subscription, billing, and funnel platform that runs the business side.",
      "Built Tovi, the AI coach: scoped prompts, streaming Hebrew replies, per-member context persisted across MongoDB + MySQL, and guardrails that keep answers safe and on-brand.",
      "Designed a Hebrew-first, RTL-correct UI system on React + Tailwind + shadcn that stays fast on a mid-range phone.",
      "Modelled the data in PostgreSQL with row-level security and SECURITY DEFINER RPCs; auth, OTP, and notification flows run through Supabase Edge Functions.",
    ],
    impact: [
      // Metrics from live PostHog data (window opened 2026-06-11). Phrased conservatively
      // so they stay true as counts grow — revisit if you want sharper, dated figures.
      "Live on the App Store and Google Play, with real members using it daily in Hebrew.",
      "Tovi fields hundreds of member questions a week — 24/7, with hard cost and rate guardrails.",
      "An RTL-first design system keeps the mobile experience fast and consistent.",
    ],
    // Media re-captured 2026-07-15 at true 3x from the real app (localhost:8080,
    // owner's own account). journal.png/cover(recipes) retired. The card plays
    // the `preview` loop; these stills are the case-study gallery.
    // The hero loop is Tovi (the AI coach) answering a wellness question live —
    // the app's differentiator. The stills carry the rest of the breadth, so
    // the static Tovi shot is dropped (the video covers it).
    screenshots: [
      { src: "/work/stayyoung/home.png", alt: "StayYoung app — personalised home with challenge progress and daily tasks", frame: "phone", ready: true },
      { src: "/work/stayyoung/library.png", alt: "StayYoung app — the course & content library", frame: "phone", ready: true },
      { src: "/work/stayyoung/challenges.png", alt: "StayYoung app — time-boxed fitness challenges with day-by-day progress", frame: "phone", ready: true },
      { src: "/work/stayyoung/recipes.png", alt: "StayYoung app — the recipe library, filtered by diet, time, and course", frame: "phone", ready: true },
    ],
    // Filename is versioned (tovi-loop, not the reused app-loop) so browsers that
    // cached the earlier clip re-fetch it. Cropped to drop the generic app-header
    // bar, so the card leads with the "Tovi · AI · 24/7" coach header + answer.
    preview: {
      mp4: "/work/stayyoung/tovi-loop.mp4",
      webm: "/work/stayyoung/tovi-loop.webm",
      poster: "/work/stayyoung/tovi-loop-poster.png",
      alt: "Tovi, the in-app AI coach, thinking through and answering a wellness question in Hebrew",
    },
    // Home card = a floating phone sliding through several real screens (not just
    // Tovi), so it fits the wide card and mirrors the platform card's slide.
    cardShots: [
      { src: "/work/stayyoung/home.png", alt: "The StayYoung app — home, Tovi the AI coach, challenges, and recipes" },
      { src: "/work/stayyoung/tovi.png", alt: "Tovi, the in-app AI coach, answering in Hebrew" },
      { src: "/work/stayyoung/challenges.png", alt: "StayYoung challenges" },
      { src: "/work/stayyoung/recipes.png", alt: "StayYoung recipe library" },
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
    highlights: [
      { value: "5,000+", label: "customers" },
      { value: "11", label: "sales funnels" },
    ],
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
      "A multi-step funnel engine (optin → sales → upsell → downsell → thank-you) with a visual step builder and AI-assisted editing.",
      "Subscription billing on PayPlus with automated dunning, retries, and cron-driven reconciliation — plus a WooCommerce migration path.",
      "Per-agent AI assistants (own knowledge base, sandbox, analytics), a finance dashboard (cashflow, P&L, VAT, forecasts), embedded meeting booking, and Meta Ads integration.",
    ],
    impact: [
      "Powers a live subscription business — 5,000+ customers and subscriptions across 11 sales funnels.",
      "Keeps the money-critical path running unattended — recurring billing, dunning, retries, and reconciliation.",
      "Funnels, ads, finance, and bookings live in one place, built around how the business actually operates.",
    ],
    // Card + hero play a slide carousel through the real dashboards (AI agents →
    // funnels → automations) — a horizontal slide at a *fixed* zoom, which reads
    // as "flipping through the platform" (the earlier Ken-Burns *scaling* looked
    // like odd breathing). automations appears only in the moving loop, not as a
    // lingering still (its "0% success" columns read as broken). The stills below
    // are the two healthy dashboards, kept as readable detail.
    screenshots: [
      { src: "/work/stayyoung-platform/ai-agents.png", alt: "StayYoung platform — AI agents dashboard", frame: "browser", ready: true },
      { src: "/work/stayyoung-platform/funnel-builder.png", alt: "StayYoung platform — funnel builder (sales → upsell → thank-you)", frame: "browser", ready: true },
    ],
    preview: {
      mp4: "/work/stayyoung-platform/app-loop.mp4",
      webm: "/work/stayyoung-platform/app-loop.webm",
      poster: "/work/stayyoung-platform/app-loop-poster.png",
      alt: "The StayYoung platform — sliding through the AI agents, funnel builder, and automation dashboards",
    },
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
    highlights: [
      { value: "Voice → action", label: "WhatsApp-native" },
      { value: "MCP", label: "real tool-use" },
    ],
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
    highlights: [
      { value: "Multi-agent", label: "orchestrated" },
      { value: "TDD", label: "contract-tested" },
    ],
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
