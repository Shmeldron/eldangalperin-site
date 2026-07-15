# Quiet Portfolio — Redesign Design Spec

**Date:** 2026-07-15
**Status:** Approved (design), pre-implementation
**Branch:** `redesign/quiet-portfolio`
**Author:** Eldan Galperin (with Claude)

---

## 1. Context & goal

The current site (`eldangalperin.com`) is a dark, heavily-animated product-y portfolio (shatter headline, gradients, magnetic buttons, 3D-tilt cards, floating AI chat, ⌘K command palette). The goal is to move it to the design language of **prasanjitdey.com** — a radically calm, typographic, near-static personal site.

The guiding principle, in the owner's words: **"I don't want to be a clown trying too hard — just simply show who I am and what I can do."**

This is a **reskin + prune, not a rewrite.** The stack, i18n architecture, project data model, and API routes are retained. We are changing the visual language and removing decoration, not rebuilding the app.

**Reference design** was reverse-engineered on 2026-07-15; the full capture (colors, type scale, spacing, component behavior, screenshots) lives in the conversation and informs the numbers below. Key reference screenshots saved under `.playwright-mcp/` (gitignored, not committed).

---

## 2. Locked decisions

| Decision | Choice | Rationale |
|---|---|---|
| **Fidelity** | Faithful-clone restraint, kept **bilingual** | The reference's honesty, plus Hebrew/RTL — which is identity, not decoration. |
| **Default theme** | **Light-first**, dark via toggle | Matches the reference's "page of prose" feel; best fits "show who I am." |
| **Accent color** | **Emerald**, single & scarce (`#059669` light / `#34d399` dark) | Continuity with the owner's existing color, minus the gradient. Used on inline links only. |
| **AI chat widget** | **Cut from the page** (backend retained) | An AI bubble is on every 2026 portfolio; absence reads as confident. The work already proves the skill. Reversible at near-zero cost. |
| **Command palette (⌘K)** | **Cut** | Clever-for-its-own-sake on a 4-page site. |
| **UI sound effects** | **Skip** | Charming but exactly the "trying too hard" to avoid. |
| **Heavy motion** | **Cut** (shatter, magnetic, 3D tilt) | Keep only calm micro-interactions. |
| **Bilingual EN/HE + RTL** | **Keep** the existing cookie-driven system | Core to the owner's positioning (Hebrew-speaking referral clients). |

---

## 3. Design system

### 3.1 Color tokens

Defined as CSS custom properties in `app/globals.css`. Light-first; dark via the existing theme mechanism (adapt current dark-first tokens to a light-first default + `.dark`/`[data-theme]` override).

**Light (default)**
```
--background:   #ffffff
--foreground:   #171717   /* primary text */
--text-mid:     #52525b   /* secondary text; dotted contact links at rest */
--muted:        #71717a   /* section labels, footer (the "quiet" hierarchy) */
--faint:        #a1a1aa   /* icons, inactive chrome */
--dim:          #d4d4d8   /* dimmed list rows on spotlight-hover */
--border:       #e4e4e7   /* hairlines */
--card:         #ffffff   /* media frame bg */
--card-border:  #e5e5e5
--accent:       #059669   /* emerald-600 — legible on white; links only */
```

**Dark (`.dark` / `[data-theme="dark"]`)**
```
--background:   #101010
--foreground:   #e4e4e7
--text-mid:     #d6d6d6
--muted:        #8b8b93
--faint:        #6f6f78
--dim:          #52525b
--border:       #323232
--card:         #1a1a1a
--card-border:  #2a2a2a
--accent:       #34d399   /* emerald-400 — legible on near-black */
```

Rules: **borders, not shadows. No gradients anywhere.** The accent appears only on inline links (sweep underline) and the hovered project-card title. Hierarchy is carried by **gray value**, not size or weight.

### 3.2 Typography

- **English:** Geist Sans (display + body), loaded via `next/font`.
- **Hebrew:** IBM Plex Sans Hebrew (body + headings — drop the current Rubik display split to stay minimal and consistent).
- **Mono:** minimal use only (e.g. small meta labels); Geist Mono or keep JetBrains Mono.
- **Weights:** 400 and 500 only.
- **Scale (16px root):**
  - body / bio: 16px / 1.5
  - name (h1): 18px / 400
  - section labels ("Projects", "More", "Elsewhere"): 16px / 400 in `--muted` — headings are the *quiet* things (inverted convention)
  - card title: 16px / 500
  - card description, list meta: 14px in `--text-mid` / `--muted`
  - footer: 14px in `--muted`
- letter-spacing: normal everywhere. `antialiased`. `text-wrap: balance` on card/list descriptions and headings.

### 3.3 Spacing, sizing, radius

- Reading column **max-width ≈ 600px**, centered; page padding 16px on mobile.
- Vertical rhythm: **80px** page-top, **40px** between sections, **16px** heading→content, **12px** list-row padding, 8px bio paragraph gap.
- Radius: 8px (buttons/frames), 12px (project cards), 999px (any pill).
- Borders 1px throughout. No box-shadows.
- Breakpoint that matters: **640px** (1→2 card columns; list rows stack→row; footer stack→row).

---

## 4. Home layout (top → bottom)

Single centered column, no nav bar.

1. **Header** — `justify-between` row. Left: "Eldan Galperin" (18px) + "Full-stack product engineer" (`--muted`) beneath. Right: theme toggle + **EN/עב** language toggle (icon buttons, `--faint` → hover `--muted`). That is the entire site chrome.
2. **Intro** — 3–4 short prose sentences (the core "who I am + what I can do"). Inline accent links: StayYoung, Book a call, LinkedIn. One plain underline on a key phrase (e.g. "full-stack product engineer").
3. **Selected work** — section label "Projects" (muted) + optional list/grid view toggle. `grid-cols-1 sm:grid-cols-2`, 16px gap. Featured projects (StayYoung, StayYoung Platform) as cards: bordered white media frame (screenshot, or short muted looping `<video>` if an asset exists), title 16px/500 (hover → accent), one-line description. **No lift/scale/shadow on hover — only the title tints.**
4. **More** — section label + spotlight-hover list of the service projects (WhatsApp Assistant, Jarvis), room to grow. Each row links to its case study.
5. **Elsewhere** — label + "Where to find me online" + dotted-underline links: Email · GitHub · LinkedIn · X, separated by `·`.
6. **Footer** — `border-t`, 14px `--muted`, `justify-between`: "Last updated · <month year>" / "© <year> Eldan Galperin".

RTL: in Hebrew the whole column mirrors (header icons move to the inline-start, text aligns to the inline-end origin) via logical properties; Latin tokens (StayYoung, ⌘, GitHub) remain LTR-embedded.

---

## 5. Case-study pages (`/work/[slug]`)

Kept, restyled to the reference's calm article layout:

- Container: article column ≈ 600px; optional "On this page" TOC (`hidden lg:block`) on wide screens with per-heading progress ticks.
- Top: "← Back" text/pill button + theme/lang toggles.
- Meta line ("Product · 2026" style) in `--muted`, h1 18px/400, one-line summary.
- Hero media inside a **1px dashed** neutral frame, rounded, on card bg.
- Body sections (Overview / Problem / What I Built / Impact …): 18px/400 headings, `--muted` body, dashed-border spec cards where useful, tech pills (`rounded-full`, 12px, muted).
- Bottom **prev/next** pager.
- **Remove** the terminal-motif and device-frame components → clean bordered media everywhere.

---

## 6. Components inventory (behavior)

- **Icon buttons** (theme, language): ~28px, transparent, 16px stroke icons, `--faint` → hover `--muted`, `active:scale-95`, 300ms.
- **Inline accent link**: `--accent`, no static underline; animated `::after` 1px underline sweeps `width 0→100%` on hover, 300ms `cubic-bezier(.4,0,.2,1)`. Uses `inset-inline-start` for RTL correctness.
- **Dotted contact link**: `--text-mid`, `underline dotted`, offset 3px; hover → accent.
- **Secondary button** (only kind, e.g. "See more", "Back"): `px-3 py-1`, 14px, `rounded-lg`, subtle surface bg, 1px border, `transition-colors`.
- **Project card**: whole card is a link; bordered media frame; title tints on hover; description `line-clamp-2`, `text-balance`.
- **List rows** (More / list-view): spotlight-hover — hovering the list dims all rows to `--dim`; the hovered row returns to full `--foreground` (spotlight) and nudges 2px along the inline axis (direction-aware); 250–300ms.
- **View toggle** (list/grid): two small SVGs, active `--foreground`, inactive `--faint`.

---

## 7. Motion

Keep: link sweep-underline; list spotlight-dim + 2px nudge; card-title tint; a single soft fade-in of the intro on load (~600ms); CSS `scroll-behavior: smooth` + `scroll-mt` on anchors.

Cut: shatter headline, magnetic buttons, 3D tilt cards, blur/directional page transitions.

All motion gated behind `prefers-reduced-motion: reduce`. Motion is measured in 1–2px and ≤300ms — never layout-level.

---

## 8. Bilingual / RTL

- Retain the existing cookie-driven `locale=en|he` system, `LocaleProvider`, `lib/i18n/content.ts`, and server-set `<html lang dir>`.
- Move the language toggle into the header (next to theme toggle); remove the current fixed top-center pill.
- Author all new/edited components with **logical properties** (`ms-`/`me-`/`ps-`/`pe-`, `inset-inline-*`, `text-align: start/end`). Apply the `hebrew-rtl-best-practices` skill during implementation.
- Hebrew copy for the new minimal sections to be finalized during build (intro prose, section labels: פרויקטים / עוד / איפה למצוא אותי, footer).

---

## 9. Features: cut vs retained

- **Cut from the UI:** floating AI chat widget, ⌘K command palette, UI sound effects, all heavy-motion components, terminal/device motifs.
- **Retained in repo (unsurfaced, reversible):** `/api/chat` route + `lib/assistant.ts` (chat backend), `/api/lead` route (contact/lead capture — surfaced as a lightweight "book a call / email").
- **Kept:** Vercel Analytics, SEO/metadata (`opengraph-image`, `robots`, `sitemap`), View Transitions cross-fade (if it survives the motion prune cleanly; otherwise simplify).
- **Future option (not now):** a *live* chat demo embedded inside the WhatsApp Assistant case study, where it is contextual proof rather than site chrome.

---

## 10. Non-goals / not touching

- No change to Next 16 / React 19 / Tailwind v4 versions or build setup.
- No change to the typed `projects.ts` model or the set of published projects.
- No change to i18n architecture (only the toggle's placement and new copy).
- No backend/API logic changes (routes retained as-is).
- No unrelated refactors.

---

## 11. Component migration map

| Current | Action |
|---|---|
| `components/home/HomeContent.tsx` (Hero/Work/About/Contact) | Rebuild as the calm single-column layout (§4). Drop shatter/typer/magnetic. |
| `Header.tsx` | Simplify to name+role / toggles; remove nav+palette button. |
| `LangSwitch.tsx` / `components/i18n/LangSwitch.tsx` | Fold toggle into header; drop fixed pill. |
| `CommandPalette.tsx` | Remove from tree (keep file or delete — TBD in plan). |
| `ChatWidget.tsx` / `components/chat/ChatWidget.tsx` | Remove from tree; keep `/api/chat` + `assistant.ts`. |
| `MagneticButton.tsx` | Remove; replace usages with plain links/buttons. |
| `HeProjectCard.tsx` | Replace with minimal bordered-media project card. |
| `CaseStudyContent.tsx` | Restyle to calm article (§5). |
| `DeviceFrame.tsx` / `TerminalMotif.tsx` | Remove; use clean bordered media. |
| `motion/Reveal.tsx` | Keep (simple intersection fade) or fold into a single intro fade. |
| `app/globals.css` | Rework tokens to light-first + emerald single accent; drop gradient/grid/shatter helpers. |

---

## 12. Success criteria

- Home renders as one calm ≈600px column, light by default, dark via toggle, in both EN (LTR) and HE (RTL) with correct mirroring.
- Exactly one accent color, appearing only on inline links + hovered card titles.
- No gradients, no shadows; hierarchy legibly carried by gray value.
- The signature micro-interactions (link sweep, list spotlight-hover, title tint) work; no shatter/magnetic/tilt remain.
- Chat widget, ⌘K palette, and sounds are absent from the UI; their backends still build.
- `prefers-reduced-motion` disables all motion.
- Lighthouse/axe: no new a11y regressions; contrast AA on both themes.

---

## 13. Open items to resolve during planning

- Project **media assets**: do short looping videos exist, or use existing screenshots? (Affects card media.)
- Whether to **delete vs park** the removed components (`CommandPalette`, `ChatWidget`, motifs).
- Final **Hebrew copy** for the new minimal sections.
- Whether Geist is added via `next/font/google` or self-hosted.
