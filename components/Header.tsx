"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { openCommandPalette } from "@/components/CommandPalette";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link href="/" className="group flex items-center gap-2 font-mono text-sm">
          <span className="text-accent">~/</span>
          <span className="font-semibold tracking-tight text-foreground">
            {site.name.toLowerCase().replace(" ", "-")}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-card hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={openCommandPalette}
          className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-foreground"
          aria-label="Open command palette"
        >
          <Command className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">K</span>
        </button>
      </div>
    </header>
  );
}
