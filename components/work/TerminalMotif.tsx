"use client";

import { motion, useReducedMotion } from "motion/react";

/** A synthetic terminal motif for "service" projects (bots, agents, backends)
 *  that have no UI to screenshot. It's a designed illustration — not a real
 *  session capture — so it shows the shape of the system without any real data.
 *  Lines fade in top-to-bottom on mount; motion is disabled under
 *  reduced-motion, where every line simply renders. */
// Colours are fixed for the dark terminal ground (not the site's light-theme
// tokens, which would be near-invisible here).
function lineColor(line: string): string {
  const c = line.trimStart()[0];
  if (c === "$") return "text-zinc-100";        // command
  if (c === "✓") return "text-emerald-400";     // success
  if (c === "→") return "text-sky-300";         // event
  if (c === "#") return "text-zinc-500";        // comment
  return "text-zinc-300";
}

export function TerminalMotif({ lines, label }: { lines: string[]; label: string }) {
  const shouldReduce = useReducedMotion();

  return (
    <div
      dir="ltr"
      role="img"
      aria-label={label}
      className="overflow-hidden rounded-xl border border-card-border bg-[#0b0b0d] shadow-sm"
    >
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="px-4 py-4 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={shouldReduce ? false : { opacity: 0, y: 4 }}
            whileInView={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: shouldReduce ? 0 : 0.12 + i * 0.14, ease: "easeOut" }}
            className={`whitespace-pre-wrap break-words ${lineColor(line)}`}
          >
            {line}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
