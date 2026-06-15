import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/icons/Brand";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center sm:px-10">
        <div className="font-mono text-xs text-faint">
          <p className="text-muted">
            <span className="text-accent">$</span> built by {site.name.toLowerCase()}
          </p>
          <p className="mt-1">
            Next.js · TypeScript · Tailwind · deployed on Vercel
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/#work" className="text-xs text-muted hover:text-foreground">
            Work
          </Link>
          <Link href="/#contact" className="text-xs text-muted hover:text-foreground">
            Contact
          </Link>
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-accent"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-accent"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
