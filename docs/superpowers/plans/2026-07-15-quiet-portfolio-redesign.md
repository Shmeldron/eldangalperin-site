# Quiet Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move `eldangalperin.com` from a dark, heavily-animated portfolio to the calm, typographic, light-first single-column aesthetic of prasanjitdey.com — while keeping the Hebrew/RTL bilingual system, case studies, and content.

**Architecture:** A reskin + prune, not a rewrite. We rework the design tokens (light-first, single scarce emerald accent), swap fonts (Geist + IBM Plex Sans Hebrew), rebuild the presentational components (Header, Home, ProjectCard, Footer, CaseStudy) as minimal versions, remove decoration (chat widget, ⌘K palette, heavy motion, device/terminal frames), and add a light/dark theme toggle. The i18n architecture, `Project` data model, and API routes are untouched.

**Tech Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · `motion/react` (retained, used sparingly) · `next/font/google`.

**Design spec (source of truth):** `docs/superpowers/specs/2026-07-15-quiet-portfolio-redesign-design.md`. Read it before starting.

## Global Constraints

- **Framework APIs may differ from training data.** Per `AGENTS.md`, before using any `next/*` API (`next/font/google`, `next/link`, `next/image`, metadata), read the relevant guide under `node_modules/next/dist/docs/`. Do not assume signatures.
- **Light-first.** Default theme is light (`--background: #ffffff`); dark is opt-in via a toggle that stamps `data-theme="dark"` on `<html>`, plus `@media (prefers-color-scheme: dark)` as the no-JS default.
- **One accent, scarce.** Emerald only — `#059669` (light) / `#34d399` (dark). Appears only on inline links and the hovered project-card title. No gradients. No box-shadows. Borders only (1px).
- **Type:** Geist Sans (EN) + IBM Plex Sans Hebrew (HE) via `next/font`. Weights **400 and 500 only**. Hierarchy by gray value, not size. Body 16px.
- **RTL:** All layout uses logical properties (`ms-/me-/ps-/pe-`, `inset-inline-*`, `text-align: start/end`). Apply the `hebrew-rtl-best-practices` skill when editing any component that renders Hebrew. Latin tokens (StayYoung, GitHub, ⌘) stay LTR-embedded via `dir="ltr"` spans.
- **Motion:** Keep only link sweep-underline, list spotlight-dim + 2px nudge, card-title tint, one soft intro fade, CSS smooth-scroll. All gated behind `prefers-reduced-motion: reduce`. No shatter / magnetic / 3D-tilt.
- **Retained backends (do NOT delete):** `app/api/chat/route.ts`, `app/api/lead/route.ts`, `lib/assistant.ts`, `lib/leads.ts`, `lib/limits.ts`, Vercel Analytics, SEO routes.
- **Verification model:** No unit-test harness exists and none is added (YAGNI; spec non-goal: don't touch build setup). Each task's gate is: `npx tsc --noEmit` clean + `npm run build` succeeds + lint clean + a stated visual check. The final task adds a driven visual review across EN/HE × light/dark.
- **Commit after every task.** Branch: `redesign/quiet-portfolio` (already created).

---

## File map

| File | Action | Responsibility |
|---|---|---|
| `app/globals.css` | Rewrite | Light-first + dark tokens, minimal helpers (link sweep, spotlight list, dashed frame), focus ring. |
| `app/layout.tsx` | Modify | Swap fonts → Geist/Geist Mono/Plex He; no-flash theme script; drop CommandPalette/ChatWidget/LangSwitch from tree. |
| `lib/i18n/content.ts` | Modify | Add `home` block (intro fragments + section labels) to `Dict` (EN + HE). |
| `components/ThemeToggle.tsx` | Create | Client light/dark toggle button (sets `data-theme`, persists to localStorage). |
| `components/LangToggle.tsx` | Create | Client EN/עב toggle button (uses `useLocale()`), replaces `LangSwitch`. |
| `components/Header.tsx` | Rewrite | Minimal header: name + role + ThemeToggle + LangToggle. No nav, no ⌘K. |
| `components/Footer.tsx` | Rewrite | Minimal footer: last-updated + © name. |
| `components/home/ProjectCard.tsx` | Create | Minimal bordered-media card for a featured `Project`. |
| `components/home/EmailReveal.tsx` | Create | Click-to-reveal obfuscated email (bilingual label). |
| `components/home/HomeContent.tsx` | Rewrite | Calm single column: intro · Projects grid · More list · Elsewhere. |
| `components/work/CaseStudyContent.tsx` | Rewrite | Calm article layout; bordered media; prev/next pager. |
| `components/CommandPalette.tsx`, `components/chat/ChatWidget.tsx`, `components/MagneticButton.tsx`, `components/DeviceFrame.tsx`, `components/TerminalMotif.tsx`, `components/he/HeProjectCard.tsx`, `components/i18n/LangSwitch.tsx` | Delete | Removed decoration/dead components (backends stay). |

---

## Task 1: Design tokens, theme mechanism & fonts

**Files:**
- Modify: `app/globals.css` (full rewrite)
- Modify: `app/layout.tsx` (fonts + no-flash script; keep chrome for now)

**Interfaces:**
- Produces (CSS custom properties, consumed by all later tasks via Tailwind token classes): `--background --foreground --text-mid --muted --faint --dim --border --card --card-border --accent`. Mapped to Tailwind colors via `@theme inline` as `--color-*` so `text-foreground`, `bg-background`, `text-muted`, `border-border`, `bg-card`, `text-accent` etc. work.
- Produces (font CSS vars): `--font-sans` (Geist), `--font-mono` (Geist Mono); `[lang="he"]` → `--font-plex-he`.
- Produces (helper classes): `.link-sweep`, `.spotlight` (+ `.spot-row`), `.frame` (dashed media frame).

- [ ] **Step 1: Read the Next font docs**

Run: `ls node_modules/next/dist/docs/` then read the `next/font` guide it points to.
Confirm the `Geist` / `Geist_Mono` exports exist in `next/font/google` for this version. If not, fall back to the `geist` package (`geist/font/sans`, `geist/font/mono`) and adjust imports accordingly in Step 3.

- [ ] **Step 2: Rewrite `app/globals.css`**

```css
@import "tailwindcss";

/* Tailwind v4: drive dark mode from the data-theme attribute, not the media
   query, so the JS toggle wins. Media query still sets the no-JS default. */
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

/* ---------------------------------------------------------------------------
   Eldan Galperin — Quiet Portfolio design system (light-first).
   Hierarchy is carried by gray value, not size. One scarce emerald accent.
   Borders, never shadows. No gradients.
   ------------------------------------------------------------------------- */

:root {
  --background: #ffffff;
  --foreground: #171717; /* primary text */
  --text-mid:   #52525b; /* secondary text; dotted contact links at rest */
  --muted:      #71717a; /* section labels, footer — the "quiet" hierarchy */
  --faint:      #a1a1aa; /* icons, inactive chrome */
  --dim:        #d4d4d8; /* dimmed list rows during spotlight-hover */
  --border:     #e4e4e7;
  --card:       #ffffff; /* media frame bg */
  --card-border:#e5e5e5;
  --accent:     #059669; /* emerald-600 — legible on white; links only */
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #101010;
    --foreground: #e4e4e7;
    --text-mid:   #d6d6d6;
    --muted:      #8b8b93;
    --faint:      #6f6f78;
    --dim:        #52525b;
    --border:     #323232;
    --card:       #1a1a1a;
    --card-border:#2a2a2a;
    --accent:     #34d399; /* emerald-400 — legible on near-black */
    color-scheme: dark;
  }
}

/* Explicit toggle overrides the media query in BOTH directions.
   :root[data-theme=…] (0,2,0) outranks the plain :root rules above (0,1,0). */
:root[data-theme="light"] {
  --background: #ffffff; --foreground: #171717; --text-mid: #52525b;
  --muted: #71717a; --faint: #a1a1aa; --dim: #d4d4d8; --border: #e4e4e7;
  --card: #ffffff; --card-border: #e5e5e5; --accent: #059669;
  color-scheme: light;
}
:root[data-theme="dark"] {
  --background: #101010; --foreground: #e4e4e7; --text-mid: #d6d6d6;
  --muted: #8b8b93; --faint: #6f6f78; --dim: #52525b; --border: #323232;
  --card: #1a1a1a; --card-border: #2a2a2a; --accent: #34d399;
  color-scheme: dark;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-text-mid: var(--text-mid);
  --color-muted: var(--muted);
  --color-faint: var(--faint);
  --color-dim: var(--dim);
  --color-border: var(--border);
  --color-card: var(--card);
  --color-card-border: var(--card-border);
  --color-accent: var(--accent);

  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}

* { border-color: var(--border); }

html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* Per-language fonts: English = Geist, Hebrew = IBM Plex Sans Hebrew. */
[lang="en"] { font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif; }
[lang="he"] { font-family: var(--font-plex-he), "Assistant", system-ui, sans-serif; }

::selection { background: color-mix(in srgb, var(--accent) 22%, transparent); }

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Inline accent link: 1px underline sweeps in on hover. RTL-correct via
   inset-inline-start. */
.link-sweep {
  color: var(--accent);
  text-decoration: none;
  position: relative;
}
.link-sweep::after {
  content: "";
  position: absolute;
  inset-inline-start: 0;
  bottom: -1px;
  height: 1px;
  width: 0;
  background: var(--accent);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.link-sweep:hover::after { width: 100%; }
@media (prefers-reduced-motion: reduce) { .link-sweep::after { transition: none; } }

/* Spotlight list: hovering the list dims every row; the hovered row returns to
   full color and nudges 2px along the inline axis. */
.spotlight:hover .spot-row { color: var(--dim); }
.spotlight:hover .spot-row:hover { color: var(--foreground); translate: -2px 0; }
[dir="rtl"] .spotlight:hover .spot-row:hover { translate: 2px 0; }
.spot-row { transition: color 0.25s, translate 0.3s ease-out; }
@media (prefers-reduced-motion: reduce) { .spot-row { transition: none; } }

/* Dashed media frame (case-study hero + spec cards). */
.frame {
  border: 1px dashed var(--card-border);
  border-radius: 10px;
  background: var(--card);
}
```

- [ ] **Step 3: Swap fonts + add no-flash theme script in `app/layout.tsx`**

Replace the font imports/instances. Remove `Space_Grotesk`, `JetBrains_Mono`, `Rubik`. Add Geist + Geist Mono; keep `IBM_Plex_Sans_Hebrew` (drop its Rubik companion). Change the font vars to `--font-geist-sans` / `--font-geist-mono` / `--font-plex-he`.

```tsx
import { Geist, Geist_Mono, IBM_Plex_Sans_Hebrew } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const plexHe = IBM_Plex_Sans_Hebrew({
  variable: "--font-plex-he",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
```

Update the `<html className=...>` to `` `${geistSans.variable} ${geistMono.variable} ${plexHe.variable} h-full antialiased` `` and drop the removed vars.

Add this constant above the component and render the script as the **first child of `<body>`** so the theme is set before paint (no flash):

```tsx
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;
```

```tsx
<body className="min-h-full">
  <script dangerouslySetInnerHTML={{ __html: themeScript }} />
  <LocaleProvider initialLocale={locale}>
    {/* Header/Footer/etc unchanged in THIS task */}
```

Leave `<Header/>`, `<Footer/>`, `<LangSwitch/>`, `<CommandPalette/>`, `<ChatWidget/>` in place for now (Task 8 removes the last three) so the app keeps building.

- [ ] **Step 4: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: both succeed. If `Geist` isn't exported by `next/font/google`, switch to the `geist` package per Step 1 and re-run.

- [ ] **Step 5: Visual check**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: page renders **light** by default; toggling OS dark mode (or running the toggle snippet in devtools: `document.documentElement.setAttribute('data-theme','dark')`) flips to the dark palette. Fonts are Geist (EN). Existing components still render (they'll be restyled next); some old helpers (`.bg-grid`, gradients) are gone so the hero may look plain — expected.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat(design): light-first tokens, theme toggle mechanism, Geist fonts"
```

---

## Task 2: i18n content for the minimal home

**Files:**
- Modify: `lib/i18n/content.ts` (add `home` to `Dict` type + EN/HE values)

**Interfaces:**
- Produces: `DICT[locale].home` with keys — `greeting, intro2pre, intro2sy, intro2mid, intro2platform, intro2post, ctaLead, ctaBook, ctaMid, ctaLinkedin, ctaPost, projectsLabel, moreLabel, elsewhereLabel, elsewhereSub, emailLabel`. Consumed by `HomeContent` (Task 6).

- [ ] **Step 1: Add the `home` field to the `Dict` type**

In the `export type Dict = { … }` object, add:

```ts
  home: {
    greeting: string;
    intro2pre: string; intro2sy: string; intro2mid: string;
    intro2platform: string; intro2post: string;
    ctaLead: string; ctaBook: string; ctaMid: string;
    ctaLinkedin: string; ctaPost: string;
    projectsLabel: string; moreLabel: string;
    elsewhereLabel: string; elsewhereSub: string; emailLabel: string;
  };
```

- [ ] **Step 2: Add the English values**

Inside `DICT.en`, add:

```ts
    home: {
      greeting: "Hi, I'm Eldan — a full-stack product engineer based in Israel.",
      intro2pre: "I design, build, and ship products end to end. Recently: ",
      intro2sy: "StayYoung",
      intro2mid: ", an AI wellness app, and its ",
      intro2platform: "growth platform",
      intro2post: ".",
      ctaLead: "Want to work together? ",
      ctaBook: "Book a call",
      ctaMid: " or reach out on ",
      ctaLinkedin: "LinkedIn",
      ctaPost: ".",
      projectsLabel: "Projects",
      moreLabel: "More",
      elsewhereLabel: "Elsewhere",
      elsewhereSub: "Where to find me online",
      emailLabel: "Email",
    },
```

- [ ] **Step 3: Add the Hebrew values**

Inside `DICT.he`, add:

```ts
    home: {
      greeting: "היי, אני אלדן — מהנדס מוצר Full-Stack מישראל.",
      intro2pre: "אני מעצב, בונה ומשיק מוצרים מקצה לקצה. לאחרונה: ",
      intro2sy: "StayYoung",
      intro2mid: ", אפליקציית בריאות מבוססת AI, ו",
      intro2platform: "פלטפורמת הצמיחה",
      intro2post: " שלה.",
      ctaLead: "רוצים לעבוד יחד? ",
      ctaBook: "קבעו שיחה",
      ctaMid: " או פנו אליי ב",
      ctaLinkedin: "LinkedIn",
      ctaPost: ".",
      projectsLabel: "פרויקטים",
      moreLabel: "עוד",
      elsewhereLabel: "איפה למצוא אותי",
      elsewhereSub: "קישורים ורשתות",
      emailLabel: "אימייל",
    },
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: passes (both locales satisfy the extended `Dict`).

- [ ] **Step 5: Commit**

```bash
git add lib/i18n/content.ts
git commit -m "feat(i18n): add minimal-home copy (EN/HE)"
```

---

## Task 3: Theme + language toggles, minimal Header

**Files:**
- Create: `components/ThemeToggle.tsx`
- Create: `components/LangToggle.tsx`
- Rewrite: `components/Header.tsx`

**Interfaces:**
- Consumes: `useLocale()` → `{ locale, toggle }` from `@/lib/i18n/LocaleProvider`; `DICT` from `@/lib/i18n/content`; `site` from `@/lib/site`.
- Produces: `<ThemeToggle/>`, `<LangToggle/>`, `<Header/>` (all default-free named exports).

- [ ] **Step 1: Create `components/ThemeToggle.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Light/dark toggle. Reads the attribute set by the no-flash script in layout,
 *  flips it, and persists to localStorage. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light";
    setTheme(current);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch {}
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex size-7 items-center justify-center rounded-md text-faint transition-colors hover:text-muted active:scale-95"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
```

- [ ] **Step 2: Create `components/LangToggle.tsx`**

```tsx
"use client";

import { DICT } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/** EN ⇄ עברית toggle. Label shows the OTHER language (from DICT.toggleLabel). */
export function LangToggle() {
  const { locale, toggle } = useLocale();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch language to ${DICT[locale].toggleLabel}`}
      className="inline-flex h-7 items-center rounded-md px-2 font-mono text-xs text-faint transition-colors hover:text-muted active:scale-95"
    >
      {DICT[locale].toggleLabel}
    </button>
  );
}
```

- [ ] **Step 3: Rewrite `components/Header.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LangToggle } from "@/components/LangToggle";

/** Minimal header: name + role on the start side, toggles on the end side.
 *  No nav bar, no command palette — the whole site chrome. */
export function Header() {
  const { locale } = useLocale();
  const name = locale === "he" ? "אלדן גלפרין" : site.name;
  const role = locale === "he" ? "מהנדס מוצר Full-Stack" : site.role;

  return (
    <header className="mx-auto w-full max-w-[600px] px-4 pt-16 sm:pt-20">
      <div className="flex items-start justify-between">
        <div>
          <Link href="/" className="text-lg text-foreground">{name}</Link>
          <p className="mt-0.5 text-[15px] text-muted">{role}</p>
        </div>
        <div className="flex items-center gap-1">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: succeeds. (Header no longer imports `openCommandPalette`; that's fine — the palette is still mounted by layout until Task 8.)

- [ ] **Step 5: Visual check**

Run dev; confirm the header shows "Eldan Galperin" + role, with a language pill and a moon/sun button on the end side. Click the theme button → palette flips and persists across reload. Click the language pill → switches to Hebrew, header mirrors (name/role on the right, toggles on the left).

- [ ] **Step 6: Commit**

```bash
git add components/ThemeToggle.tsx components/LangToggle.tsx components/Header.tsx
git commit -m "feat(ui): minimal header with theme + language toggles"
```

---

## Task 4: Minimal ProjectCard

**Files:**
- Create: `components/home/ProjectCard.tsx`

**Interfaces:**
- Consumes: `Project`, `Screenshot` from `@/lib/projects`; `HE_PROJECT` from `@/lib/i18n/content`; `useLocale()`.
- Produces: `<ProjectCard project={p} />` — used by `HomeContent` (Task 6).

- [ ] **Step 1: Create `components/home/ProjectCard.tsx`**

```tsx
"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";
import { HE_PROJECT } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/** Minimal project card: a bordered media frame + a title that tints to the
 *  accent on hover, and a one-line description. No lift, no shadow. */
export function ProjectCard({ project }: { project: Project }) {
  const { locale } = useLocale();
  const he = HE_PROJECT[project.slug];
  const kicker = locale === "he" && he ? he.kicker : project.kicker;
  const shot = project.screenshots.find((s) => s.ready);

  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="flex h-40 items-end justify-center overflow-hidden rounded-xl border border-card-border bg-card">
        {shot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            className="h-[92%] w-[92%] self-end rounded-t-md object-cover object-top"
          />
        ) : (
          <span className="pb-6 font-mono text-xs text-faint">{project.title}</span>
        )}
      </div>
      <p className="mt-2 px-0.5 text-[15px] font-medium text-foreground transition-colors group-hover:text-accent">
        {project.title}
      </p>
      <p className="mt-0.5 px-0.5 text-sm text-text-mid text-balance">{kicker}</p>
    </Link>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: passes. (`ProjectCard` isn't rendered yet; verified visually in Task 6.)

- [ ] **Step 3: Commit**

```bash
git add components/home/ProjectCard.tsx
git commit -m "feat(ui): minimal bordered-media ProjectCard"
```

---

## Task 5: EmailReveal

**Files:**
- Create: `components/home/EmailReveal.tsx`

**Interfaces:**
- Consumes: `emailAddress` from `@/lib/site`; `DICT` + `useLocale()` for the reveal label.
- Produces: `<EmailReveal />` — a button that reveals a `mailto:` link on click. Used by `HomeContent` (Task 6).

- [ ] **Step 1: Create `components/home/EmailReveal.tsx`**

```tsx
"use client";

import { useState } from "react";
import { emailAddress } from "@/lib/site";
import { DICT } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";

/** Anti-scrape email: renders the reveal label until clicked, then a mailto. */
export function EmailReveal() {
  const { locale } = useLocale();
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return (
      <a dir="ltr" href={`mailto:${emailAddress}`} className="text-text-mid underline decoration-dotted decoration-faint underline-offset-[3px] hover:text-accent hover:decoration-accent">
        {emailAddress}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setRevealed(true)}
      className="text-text-mid underline decoration-dotted decoration-faint underline-offset-[3px] hover:text-accent hover:decoration-accent"
    >
      {DICT[locale].home.emailLabel}
    </button>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add components/home/EmailReveal.tsx
git commit -m "feat(ui): click-to-reveal email component"
```

---

## Task 6: Rebuild the home page

**Files:**
- Rewrite: `components/home/HomeContent.tsx`

**Interfaces:**
- Consumes: `publishedProjects`, `Project` from `@/lib/projects`; `DICT`, `HE_PROJECT` from `@/lib/i18n/content`; `useLocale()`; `site` + `emailAddress`; `ProjectCard`, `EmailReveal`.
- Produces: `<HomeContent/>` (default or named export — match how `app/page.tsx` imports it; check `app/page.tsx` first and keep the same export style).

- [ ] **Step 1: Confirm the import contract**

Run: read `app/page.tsx`.
Note whether it imports `HomeContent` as default or named, and preserve that export signature in Step 2.

- [ ] **Step 2: Rewrite `components/home/HomeContent.tsx`**

Featured projects → the 2-col grid; service projects (`kind === "service"`) → the spotlight "More" list. Intro is assembled from `DICT.home` fragments with inline `.link-sweep` links.

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { publishedProjects } from "@/lib/projects";
import { DICT, HE_PROJECT } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { site } from "@/lib/site";
import { ProjectCard } from "@/components/home/ProjectCard";
import { EmailReveal } from "@/components/home/EmailReveal";

export function HomeContent() {
  const { locale } = useLocale();
  const t = DICT[locale].home;
  const featured = publishedProjects.filter((p) => p.featured);
  const services = publishedProjects.filter((p) => p.kind === "service");

  return (
    <div className="mx-auto w-full max-w-[600px] px-4 pb-24">
      {/* Intro — the "who I am + what I can do", in plain prose. */}
      <motion.section
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-8 flex flex-col gap-2 text-[15px] leading-relaxed text-foreground"
      >
        <p>{t.greeting}</p>
        <p>
          {t.intro2pre}
          <Link href="/work/stayyoung" className="link-sweep">{t.intro2sy}</Link>
          {t.intro2mid}
          <Link href="/work/stayyoung-platform" className="link-sweep">{t.intro2platform}</Link>
          {t.intro2post}
        </p>
        <p>
          {t.ctaLead}
          <a href="#contact" className="link-sweep">{t.ctaBook}</a>
          {t.ctaMid}
          <a dir="ltr" href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="link-sweep">{t.ctaLinkedin}</a>
          {t.ctaPost}
        </p>
      </motion.section>

      {/* Projects — featured, as cards. */}
      <section id="work" className="mt-10 scroll-mt-20">
        <p className="text-[15px] text-muted">{t.projectsLabel}</p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>

      {/* More — service projects, as a spotlight-hover list. */}
      {services.length > 0 && (
        <section id="more" className="mt-10 scroll-mt-20">
          <p className="text-[15px] text-muted">{t.moreLabel}</p>
          <div className="spotlight mt-4">
            {services.map((p) => {
              const he = HE_PROJECT[p.slug];
              const desc = locale === "he" && he ? he.kicker : p.kicker;
              return (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="spot-row flex items-baseline justify-between gap-4 rounded border-b border-border px-2 py-3 last:border-b-0 -mx-2"
                >
                  <span className="text-sm">{p.title}</span>
                  <span className="max-w-[52%] text-end text-[13px] text-muted text-balance">{desc}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Elsewhere — contact + links. */}
      <section id="contact" className="mt-16 scroll-mt-20">
        <p className="text-[15px] text-muted">{t.elsewhereLabel}</p>
        <p className="mt-1 text-[15px] text-foreground">{t.elsewhereSub}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <EmailReveal />
          <span className="text-dim">·</span>
          <a dir="ltr" href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-mid underline decoration-dotted decoration-faint underline-offset-[3px] hover:text-accent hover:decoration-accent">LinkedIn</a>
        </div>
      </section>
    </div>
  );
}
```

If `app/page.tsx` used a default export, add `export default HomeContent;` at the end (or convert the declaration) to match.

- [ ] **Step 3: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: succeeds.

- [ ] **Step 4: Visual check (the big one)**

Run dev. Confirm on `/`:
- One calm ~600px column: intro prose → Projects (2 cards: StayYoung, Platform) → More (WhatsApp Assistant, Jarvis rows) → Elsewhere.
- Hovering an intro link sweeps a 1px underline in.
- Hovering the More list dims the other row and spotlights + nudges the hovered one.
- Hovering a project card tints only its title to emerald (no lift/shadow).
- Email reveals on click.
- Toggle to Hebrew: whole column mirrors, copy is Hebrew, StayYoung/LinkedIn stay LTR.
- Toggle dark: palette flips, accent still legible.

- [ ] **Step 5: Commit**

```bash
git add components/home/HomeContent.tsx app/page.tsx
git commit -m "feat(ui): rebuild home as calm single-column layout"
```

---

## Task 7: Minimal Footer

**Files:**
- Rewrite: `components/Footer.tsx`

**Interfaces:**
- Consumes: `site` from `@/lib/site`; `useLocale()`.
- Produces: `<Footer/>`.

- [ ] **Step 1: Rewrite `components/Footer.tsx`**

```tsx
"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import { site } from "@/lib/site";

export function Footer() {
  const { locale } = useLocale();
  const updated = locale === "he" ? "עודכן לאחרונה · יולי 2026" : "Last updated · July 2026";
  const name = locale === "he" ? "אלדן גלפרין" : site.name;

  return (
    <footer className="mx-auto w-full max-w-[600px] px-4 pb-16">
      <div className="flex flex-col gap-1 border-t border-border pt-4 text-[13px] text-muted sm:flex-row sm:justify-between">
        <span>{updated}</span>
        <span dir="ltr" className="sm:text-end">© 2026 {name}</span>
      </div>
    </footer>
  );
}
```

Note: keep the "Last updated" month current at launch; it's a static string by design (the reference does the same).

- [ ] **Step 2: Typecheck + build + visual**

Run: `npx tsc --noEmit && npm run build`; then dev-check the footer sits quietly under the column in both languages.

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat(ui): minimal footer"
```

---

## Task 8: Remove decoration from the tree + prune dead code

**Files:**
- Modify: `app/layout.tsx` (drop CommandPalette, ChatWidget, LangSwitch from imports + JSX)
- Delete: `components/CommandPalette.tsx`, `components/chat/ChatWidget.tsx`, `components/MagneticButton.tsx`, `components/DeviceFrame.tsx`, `components/TerminalMotif.tsx`, `components/he/HeProjectCard.tsx`, `components/i18n/LangSwitch.tsx`
- Modify: `app/globals.css` only if any now-unused helper remains (none expected after Task 1's rewrite)

**Interfaces:**
- Produces: a layout tree with only `Header` / `main` / `Footer` inside `LocaleProvider`, plus `VercelAnalytics`.

- [ ] **Step 1: Edit `app/layout.tsx`**

Remove these three imports and their JSX usages:
```tsx
import { CommandPalette } from "@/components/CommandPalette";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { LangSwitch } from "@/components/i18n/LangSwitch";
```
The body tree becomes:
```tsx
<LocaleProvider initialLocale={locale}>
  <Header />
  <main>{children}</main>
  <Footer />
</LocaleProvider>
<VercelAnalytics />
```
Do NOT touch the font imports, the theme script, `LocaleProvider`, or `VercelAnalytics`.

- [ ] **Step 2: Find every remaining importer of the to-be-deleted components**

Run: `grep -rn -E "CommandPalette|ChatWidget|MagneticButton|DeviceFrame|TerminalMotif|HeProjectCard|components/i18n/LangSwitch|openCommandPalette" app components lib`
Expected after Step 1: no references except the files themselves. If any other file imports them (e.g. `CaseStudyContent` still importing `DeviceFrame`/`TerminalMotif` — that's rewritten in Task 9; if Task 9 runs after this, temporarily leave those two files and delete them at the end of Task 9 instead). Resolve every hit before deleting.

- [ ] **Step 3: Delete the dead component files**

```bash
git rm components/CommandPalette.tsx components/chat/ChatWidget.tsx components/MagneticButton.tsx components/he/HeProjectCard.tsx components/i18n/LangSwitch.tsx
```
Hold `components/DeviceFrame.tsx` and `components/TerminalMotif.tsx` until Task 9 has rewritten `CaseStudyContent` (they're still referenced there). If Task 9 is already done, delete them here too.

Verify the chat/lead backends remain: `ls app/api/chat/route.ts app/api/lead/route.ts lib/assistant.ts` → all present.

- [ ] **Step 4: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: succeeds with no unresolved imports.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore(ui): remove chat widget, command palette, heavy-motion components (backends retained)"
```

---

## Task 9: Restyle case-study pages

**Files:**
- Rewrite: `components/work/CaseStudyContent.tsx`
- Delete (after this rewrite): `components/DeviceFrame.tsx`, `components/TerminalMotif.tsx`

**Interfaces:**
- Consumes: `getProject`, `publishedProjects`, `Project` from `@/lib/projects`; `DICT`, `HE_PROJECT`, `HE_CASE` from `@/lib/i18n/content`; `useLocale()`.
- Produces: `<CaseStudyContent slug={...} />` (or its current prop shape — check `app/work/[slug]/page.tsx` first and preserve it).

- [ ] **Step 1: Confirm the current prop contract**

Run: read `app/work/[slug]/page.tsx` and the top of the current `components/work/CaseStudyContent.tsx`.
Note the exact props (`slug`? full `project`?) and export style; preserve them.

- [ ] **Step 2: Rewrite `components/work/CaseStudyContent.tsx` as a calm article**

Structure: back link + toggles row → meta line (`kicker · year`) → h1 (18px/400) → tagline → hero media in a dashed `.frame` (first ready screenshot, else nothing) → links → Problem / What I built / Impact sections (18px/400 headings, muted body) → tech pills → prev/next pager. Bilingual copy: Hebrew from `HE_PROJECT` / `HE_CASE`, English from the `Project`. Keep `dir="ltr"` on stack tokens.

```tsx
"use client";

import Link from "next/link";
import { getProject, publishedProjects } from "@/lib/projects";
import { DICT, HE_PROJECT, HE_CASE } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function CaseStudyContent({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const project = getProject(slug);
  if (!project) return null;

  const t = DICT[locale].caseStudy;
  const he = HE_PROJECT[project.slug];
  const heCase = HE_CASE[project.slug];
  const isHe = locale === "he";

  const kicker = isHe && he ? he.kicker : project.kicker;
  const tagline = isHe && he ? he.tagline : project.tagline;
  const problem = isHe && heCase ? heCase.problem : project.problem;
  const build = isHe && heCase ? heCase.build : project.build;
  const impact = isHe && heCase ? heCase.impact : project.impact;
  const hero = project.screenshots.find((s) => s.ready);

  // prev/next within published projects
  const idx = publishedProjects.findIndex((p) => p.slug === project.slug);
  const next = publishedProjects[(idx + 1) % publishedProjects.length];

  return (
    <article className="mx-auto w-full max-w-[600px] px-4 pb-24">
      <div className="flex items-center justify-between pt-8">
        <Link href="/#work" className="text-sm text-text-mid hover:text-accent">← {t.back}</Link>
      </div>

      <p className="mt-8 text-sm text-muted">{kicker} · {project.year}</p>
      <h1 className="mt-1 text-lg text-foreground">{project.title}</h1>
      <p className="mt-2 text-[15px] text-text-mid text-balance">{tagline}</p>

      {hero && (
        <div className="frame mt-6 overflow-hidden p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.src} alt={hero.alt} className="w-full rounded-md object-cover" loading="lazy" />
        </div>
      )}

      {project.links && project.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4" dir="ltr">
          {project.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-sweep text-sm">{l.label}</a>
          ))}
        </div>
      )}

      <Section title={t.problem}><p className="text-[15px] leading-relaxed text-text-mid">{problem}</p></Section>
      <Section title={t.built}>
        <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-mid">
          {build.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </Section>
      <Section title={t.impact}>
        <ul className="flex flex-col gap-2 text-[15px] leading-relaxed text-text-mid">
          {impact.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </Section>

      <Section title={t.stack}>
        <div className="flex flex-wrap gap-2" dir="ltr">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-border px-3 py-1 text-xs text-muted">{s}</span>
          ))}
        </div>
      </Section>

      <div className="mt-16 flex justify-end border-t border-border pt-4">
        <Link href={`/work/${next.slug}`} className="group text-end">
          <span className="block text-xs text-muted">{t.nextProject}</span>
          <span className="text-[15px] text-foreground group-hover:text-accent">{next.title} →</span>
        </Link>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg text-foreground">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
```

If Step 1 showed the component takes the full `project` (not `slug`), adapt the signature: `export function CaseStudyContent({ project }: { project: Project })` and drop the `getProject` lookup.

- [ ] **Step 3: Delete the now-unused frame/motif components**

```bash
grep -rn -E "DeviceFrame|TerminalMotif" app components lib
```
Expected: no hits. Then:
```bash
git rm components/DeviceFrame.tsx components/TerminalMotif.tsx
```

- [ ] **Step 4: Typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: succeeds.

- [ ] **Step 5: Visual check**

Dev-check `/work/stayyoung` and `/work/whatsapp-assistant`:
- Calm article: back link, meta line, quiet 18px headings, muted body, dashed-framed hero (StayYoung has a screenshot; WhatsApp Assistant has none → no frame), tech pills, next-project pager.
- No terminal/device motifs anywhere.
- Toggle HE + dark: mirrors and reskins correctly.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(ui): calm case-study article layout; drop device/terminal motifs"
```

---

## Task 10: Final verification pass

**Files:** none (verification + targeted fixes only)

- [ ] **Step 1: Static gates**

Run: `npx tsc --noEmit && npm run build && npm run lint`
Expected: all clean. Fix anything that isn't.

- [ ] **Step 2: Grep for leftovers**

Run: `grep -rn -E "accent-gradient|bg-grid|caret|Space_Grotesk|Rubik|JetBrains|MagneticButton|CommandPalette|ChatWidget|he-display" app components lib`
Expected: no hits in `app/`, `components/`, or `lib/` (only allowed in `docs/`). Remove any stragglers.

- [ ] **Step 3: Driven visual review (dispatch a Playwright subagent — do NOT run Playwright inline)**

Start dev (`npm run dev`), then dispatch a browser subagent to screenshot the matrix and report issues. It must check `/` and `/work/stayyoung` at 1440px and 390px, in EN-light, EN-dark, HE-light, HE-dark (toggle via the header buttons; set locale by clicking the language pill, theme by the theme button). Ask it to verify:
- Single ~600px column, correct 80/40/16px rhythm.
- Exactly one accent color, only on links + hovered card titles; no gradients, no shadows.
- Hebrew mirrors correctly (toggles on inline-start, text on inline-end, Latin tokens LTR).
- Contrast AA in both themes (esp. `--muted` on `--background`, accent links on white).
- `prefers-reduced-motion` disables motion (it can emulate reduced-motion and confirm no transitions).
- No console errors; chat bubble / ⌘K are absent.

Fix any issues the subagent finds, then re-run the relevant check.

- [ ] **Step 4: Confirm backends still build & routes exist**

Run: `ls app/api/chat/route.ts app/api/lead/route.ts lib/assistant.ts && npm run build`
Expected: files present, build green.

- [ ] **Step 5: Final commit + branch summary**

```bash
git add -A
git commit -m "chore: final verification pass for quiet-portfolio redesign" --allow-empty
git log --oneline main..HEAD
```

---

## Self-review notes (author)

- **Spec coverage:** tokens/color §3.1 → T1; type/fonts §3.2 → T1/T3; layout §4 → T3/T6/T7; case study §5 → T9; components §6 → T3–T7,T9; motion §7 → T1 (CSS) + T6 (intro fade); RTL §8 → every component task + T10; features cut/retained §9 → T8 (+ backends asserted in T8/T10); migration map §11 → T3–T9; success criteria §12 → T10. All covered.
- **Ordering caveat encoded:** `DeviceFrame`/`TerminalMotif` are referenced by `CaseStudyContent` until Task 9, so Task 8 explicitly defers deleting those two to Task 9. If an executor runs Task 9 before Task 8, the grep gates still catch dangling refs.
- **Known real-world checks the executor must not skip:** verify `Geist` in `next/font/google` (T1S1); confirm `HomeContent` / `CaseStudyContent` export + prop style against their `page.tsx` before rewriting (T6S1, T9S1). These are the two places the plan's assumptions touch code it hasn't read in full.
- **Open items from the spec (§13):** project media = existing screenshots (used as-is via the `ready` flag); removed components are **deleted**, not parked (git history is the escape hatch); Hebrew copy authored in T2/inline; Geist via `next/font/google`.
