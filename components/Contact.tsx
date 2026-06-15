"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/Brand";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/lib/site";

export function Contact() {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Assembled at runtime so the plain address never sits in static HTML.
  const address = `${site.email.user}@${site.email.domain}`;

  async function handleClick() {
    setRevealed(true);
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — address is still revealed for manual copy */
    }
  }

  return (
    <section id="contact" className="relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 sm:px-10">
      <Reveal>
        <SectionLabel index="03" title="Let's work together" />
        <p className="mt-4 max-w-xl text-balance text-lg text-muted">
          Have a product to build or an AI feature to ship? I&apos;m open to a small
          number of freelance and consulting engagements.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleClick}
          className="group inline-flex items-center gap-3 rounded-full border border-border-strong bg-card px-5 py-3 font-mono text-sm transition-colors hover:border-accent/60"
          aria-label="Reveal and copy email address"
        >
          <Mail className="h-4 w-4 text-accent" />
          <span className={revealed ? "text-foreground" : "text-muted"}>
            {revealed ? address : "click to reveal email"}
          </span>
          {revealed &&
            (copied ? (
              <Check className="h-4 w-4 text-accent" />
            ) : (
              <Copy className="h-4 w-4 text-faint transition-colors group-hover:text-foreground" />
            ))}
        </button>

        <div className="flex items-center gap-2">
          <SocialLink href={site.socials.github} label="GitHub">
            <GithubIcon className="h-5 w-5" />
          </SocialLink>
          <SocialLink href={site.socials.linkedin} label="LinkedIn">
            <LinkedinIcon className="h-5 w-5" />
          </SocialLink>
        </div>
      </Reveal>
    </section>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-card text-muted transition-colors hover:border-accent/60 hover:text-accent"
    >
      {children}
    </a>
  );
}
