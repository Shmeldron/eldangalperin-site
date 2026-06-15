# eldangalperin.com

Personal site / portfolio for Eldan Galperin — full-stack product engineer.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + Motion**, deployed on **Vercel**.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Copy `.env.example` → `.env.local` and fill in what you need (all optional for local dev).

```bash
pnpm build        # production build
pnpm lint
```

## Adding a project

1. Add an entry to [`lib/projects.ts`](lib/projects.ts).
2. Drop screenshots into `public/work/<slug>/` and set `ready: true` on each shot.

Until real screenshots exist, a branded placeholder renders in each frame.

## AI assistant

A scoped chat assistant (`/api/chat`) answers questions about Eldan's work.

- Set `ANTHROPIC_API_KEY` to enable it; without it, the widget shows an offline state.
- Guardrails: per-IP rate limit, input/output caps, and a hard **monthly request cap**.
- For a durable monthly cap across serverless instances, add Upstash Redis env vars
  (see `.env.example`). Otherwise limits are best-effort in-memory.

## Structure

```
app/            routes (home, /work/[slug], /api/chat, sitemap, robots)
components/      UI (hero, work grid, command palette, chat widget, …)
lib/            site config, typed projects, assistant prompt, limits
public/work/    per-project screenshots
```
