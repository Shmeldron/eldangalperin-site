"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const LINES = [
  "available for select freelance & consulting work",
  "shipping AI products with next.js + claude",
  "from first commit to production",
];

/**
 * Mono "status line" that types through a rotating set of messages.
 * Reduced-motion users see the first line, statically.
 */
export function StatusLine() {
  const reduce = useReducedMotion();
  const [text, setText] = useState(reduce ? LINES[0] : "");

  useEffect(() => {
    if (reduce) return;
    let line = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = LINES[line];
      if (!deleting) {
        char++;
        setText(full.slice(0, char));
        if (char === full.length) {
          deleting = true;
          timer = setTimeout(tick, 2200);
          return;
        }
      } else {
        char--;
        setText(full.slice(0, char));
        if (char === 0) {
          deleting = false;
          line = (line + 1) % LINES.length;
        }
      }
      timer = setTimeout(tick, deleting ? 28 : 55);
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [reduce]);

  return (
    <div className="flex items-center gap-2 font-mono text-xs text-muted">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="caret text-foreground/80">{text}</span>
    </div>
  );
}
