# Eldan Galperin — Personal Website (eldangalperin.com)

**Date:** 2026-06-15
**Status:** Design approved (pending spec review)
**Owner:** Eldan Galperin

## 1. Goal & audience

A personal marketing site / portfolio that reads as a senior full-stack product engineer who ships AI-powered products end to end.

- **Primary:** win select freelance / consulting work (clear but soft "let's work together" CTA).
- **Secondary:** general personal brand + a project-forward portfolio (תיק עבודות).
- **Audience:** Israeli + international tech buyers; comfortable in English.

A site with no conversion goal converts no one — so the brand site carries explicit hire-me intent, laid out portfolio-first because the work is the strongest proof.

## 2. Language & direction

- **English only, LTR** for v1.
- Structured so Hebrew/i18n can be added later, but **not** built now (YAGNI — bilingual doubles the build).

## 3. Visual direction

Refined version of "Option 2 — Modern Dark / Techy":

- Near-black background (`#0a0b0f`), card `#111320`, hairline borders `#1e2130`.
- Accent emerald `#34d399`, secondary cyan `#22d3ee`.
- Type: **Space Grotesk** (display/body) + **JetBrains Mono** (accents, labels, terminal).
- Subtle radial glow, mono "status line" motifs, generous whitespace.
- **Rich but tasteful** motion. Everything honors `prefers-reduced-motion`. Mobile-first; must stay fast (target Lighthouse perf ≥ 90 on mobile). No skill-% bars, no custom-cursor gimmicks.

## 4. Tech stack

- **Next.js (App Router) + TypeScript + Tailwind CSS**, deployed on **Vercel**.
- **Framer Motion** for scroll-reveal, view transitions, magnetic buttons.
- `next/image` for optimized work screenshots.
- Fonts via `next/font` (self-hosted, no FOUT).
- During build: pull current Framer Motion / Next.js docs via context7; verify visually via Playwright MCP screenshot loop.

## 5. Site structure

- **Home `/`** (single scroll): hero → selected work grid → about → contact. Plus a global ⌘K command palette + the AI assistant launcher.
- **Case study `/work/[slug]`**: per-project page — problem, what I built, stack, impact, multiple screenshots in browser/device frames.

## 6. Content model

- Typed `projects.ts` data file; images in `/public/work/<slug>/`. Adding a project = add an entry + drop images. No CMS (YAGNI; upgrade to MDX later if long-form is ever wanted).

## 7. Projects at launch (3–4 strong > many thin)

| Slug | Title | Visibility | Notes |
|---|---|---|---|
| `stayyoung` | StayYoung — AI wellness platform | **Named + linked** | Gated behind Aviv's written OK. Until confirmed, the named variant is built but not published. App + Tovi AI bot + marketing site + finance tooling; owned end-to-end. |
| `organic-content-saas` | Organic Content SaaS | Named (own venture) | Multi-tenant content→social pipeline. Describe *Eldan's* contribution without exposing Aviv's IP. |
| `whatsapp-assistant` | WhatsApp Personal Assistant | Named (personal) | Node + whatsapp-web.js + LLM. |

- **Prospects (Cubes, elo-nit, Space Terminal) are excluded** — pre-engagement; presenting them as delivered work is misleading and risks the deals.
- Real screenshots supplied by Eldan; tasteful placeholders until then.

## 8. Signature features (show, don't tell)

- **Animated hero** — text-scramble/decrypt headline + cursor-tracking glow.
- **Scroll-reveal** case studies w/ subtle parallax; screenshots in device frames with 3D tilt-on-hover.
- **⌘K command palette** for navigation.
- **View transitions** home ↔ case study.
- **Magnetic CTA buttons**, animated mono status line.

## 9. Live AI assistant (the wow feature)

A small on-site assistant visitors can chat with ("ask about Eldan's work").

- **Frontend:** floating launcher → chat panel (matches dark theme), streaming responses.
- **Backend:** Next.js Route Handler `/api/chat`. Default model **Anthropic Claude Haiku** (cheap/fast); provider key in env (`ANTHROPIC_API_KEY`). Swappable to OpenAI.
- **System prompt:** scoped strictly to Eldan's bio, skills, and the project case studies (fed as context). Politely refuses off-topic / abusive input.
- **Guardrails (required):** per-IP rate limit, max input length, max output tokens, a hard monthly request/budget cap with graceful "demo limit reached" fallback. No secrets in client; key server-side only.
- **Dependency:** Eldan provides + funds the API key (added as a Vercel env var). Feature degrades gracefully if key absent.

## 10. Contact

- **eldangalperin@gmail.com**, shown via copy-to-clipboard reveal (obfuscated to reduce scraping). LinkedIn + GitHub links. No contact form in v1 (easy add later via Resend).

## 11. Out of scope (v1)

Blog, Hebrew/i18n, contact form, light/dark toggle, third-party analytics. All clean future adds.

## 12. Repo & deployment

- Local: `~/Projects/eldangalperin-site`.
- GitHub: new **public** repo under personal `Shmeldron` account.
- Vercel: Eldan's **personal** account (not StayYoung's `tech@` workspace) — ownership + clean separation.
- Flow: scaffold → build → push → deploy to `*.vercel.app`; point `eldangalperin.com` once purchased.

## 13. Open items (Eldan's side)

1. **Buy `eldangalperin.com`** (Cloudflare Registrar ≈ $10/yr recommended; then add to Vercel).
2. **Aviv's written OK** to name + link StayYoung (else it ships anonymized).
3. **Real screenshots** for each project.
4. **LLM API key** for the AI assistant (added in Vercel env).
5. Personal **Vercel account** + **LinkedIn/GitHub URLs**.

## 14. Risks / skeptical notes

- Biggest risk to "looks senior" is *assets + permissions*, not CSS — placeholders/anonymized flagship read as a template. Push on real screenshots + StayYoung naming.
- Over-animation hurts mobile/perf and reads gimmicky — keep motion tasteful + reduced-motion-aware.
- AI demo cost can run away — hard caps are non-negotiable.
- Plain-text email gets scraped — obfuscate.
