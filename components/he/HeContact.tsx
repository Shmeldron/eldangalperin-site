"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/Brand";
import { site } from "@/lib/site";

/**
 * Hebrew (RTL) contact block: email reveal-and-copy + social links.
 * Mirrors the English <Contact> obfuscation (address assembled at runtime).
 */
export function HeContact() {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const address = `${site.email.user}@${site.email.domain}`;

  async function handleClick() {
    setRevealed(true);
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — address still revealed for manual copy */
    }
  }

  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={handleClick}
        className="group inline-flex items-center gap-3 rounded-full border border-border-strong bg-card px-5 py-3 text-sm transition-colors hover:border-accent/60"
        aria-label="חשיפה והעתקה של כתובת האימייל"
      >
        <Mail className="h-4 w-4 text-accent" />
        <span
          dir="ltr"
          className={revealed ? "text-foreground" : "text-muted"}
          style={{ unicodeBidi: "isolate" }}
        >
          {revealed ? address : "לחצו לחשיפת האימייל"}
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
    </div>
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
