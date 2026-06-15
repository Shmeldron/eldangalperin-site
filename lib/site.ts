/**
 * Single source of truth for personal/brand details.
 * Anything marked `TODO:` should be confirmed by Eldan before launch.
 */

export const site = {
  name: "Eldan Galperin",
  // Used for absolute URLs (OpenGraph, sitemap, canonical). Override with
  // NEXT_PUBLIC_SITE_URL on Vercel once the domain is live.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://eldangalperin.com",
  role: "Full-stack product engineer",
  tagline: "I design, build, and ship AI-powered products end to end.",
  // One-liner used for <meta description> and social cards.
  description:
    "Eldan Galperin — full-stack product engineer who ships AI-powered products end to end. Next.js, TypeScript, and applied LLMs, from first commit to production.",
  locationLine: "Israel · working worldwide · remote-first",
  // Split for the email obfuscation reveal (never rendered as one string).
  email: { user: "eldangalperin", domain: "gmail.com" },
  socials: {
    github: "https://github.com/Shmeldron",
    // TODO(eldan): confirm your public LinkedIn URL.
    linkedin: "https://www.linkedin.com/in/eldangalperin",
  },
} as const;

export const emailAddress = `${site.email.user}@${site.email.domain}`;
