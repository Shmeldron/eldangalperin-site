import { cn } from "@/lib/utils";

/**
 * A mono "terminal window" used as the visual for service/no-UI projects
 * (bots, backends, agents) that have no screenshot. Keeps the same footprint
 * as the browser DeviceFrame so cards line up.
 */
export function TerminalMotif({
  lines,
  title = "bash",
  className,
}: {
  lines: string[];
  title?: string;
  className?: string;
}) {
  return (
    // Self-isolating LTR: terminal lines ($, →, #) must never bidi-reorder when
    // rendered inside an RTL (Hebrew) page — so callers don't have to remember.
    <div
      dir="ltr"
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card-2 shadow-2xl shadow-black/40",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-card px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
        <span className="ms-3 font-mono text-[11px] text-muted">{title}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden p-4 font-mono text-[12px] leading-relaxed sm:p-5 sm:text-[13px]">
        {lines.map((line, i) => (
          <TerminalLine key={i} line={line} />
        ))}
        <span className="caret text-accent" />
      </div>
    </div>
  );
}

/** Lightly colorizes a line: `$`/`→` prompts, `✓` success, `#` comments. */
function TerminalLine({ line }: { line: string }) {
  let cls = "text-muted";
  if (line.startsWith("$")) cls = "text-foreground";
  else if (line.startsWith("✓")) cls = "text-accent";
  else if (line.startsWith("→")) cls = "text-accent-2";
  else if (line.startsWith("#")) cls = "text-faint";
  return <div className={cls}>{line}</div>;
}
