import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Screenshot } from "@/lib/projects";

/**
 * Renders a screenshot inside a browser or phone chrome. Falls back to a
 * tasteful placeholder block when the image file isn't present yet.
 */
export function DeviceFrame({
  shot,
  priority,
  className,
}: {
  shot: Screenshot;
  priority?: boolean;
  className?: string;
}) {
  const frame = shot.frame ?? "browser";

  if (frame === "phone") {
    return (
      <div className={cn("relative mx-auto w-full max-w-[260px]", className)}>
        <div className="rounded-[2rem] border border-border-strong bg-card-2 p-2 shadow-2xl shadow-black/40">
          <div className="relative aspect-[9/19] overflow-hidden rounded-[1.5rem] bg-background">
            <span className="absolute start-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-border-strong" />
            <FrameImage shot={shot} priority={priority} sizes="260px" />
          </div>
        </div>
      </div>
    );
  }

  if (frame === "none") {
    return (
      <div className={cn("relative overflow-hidden rounded-xl border border-border bg-card-2", className)}>
        <div className="relative aspect-[16/10]">
          <FrameImage shot={shot} priority={priority} sizes="(max-width: 768px) 100vw, 800px" />
        </div>
      </div>
    );
  }

  // browser
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40", className)}>
      <div className="flex items-center gap-1.5 border-b border-border bg-card-2 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
        <span className="ms-3 hidden truncate rounded-md bg-background px-3 py-1 font-mono text-[11px] text-faint sm:block">
          {shot.alt}
        </span>
      </div>
      <div className="relative aspect-[16/10] bg-background">
        <FrameImage shot={shot} priority={priority} sizes="(max-width: 768px) 100vw, 800px" />
      </div>
    </div>
  );
}

function FrameImage({
  shot,
  priority,
  sizes,
}: {
  shot: Screenshot;
  priority?: boolean;
  sizes: string;
}) {
  if (!shot.ready) {
    return (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(52,211,153,0.10), transparent 55%), linear-gradient(135deg, #14182a 0%, #0e1019 60%)",
        }}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
          screenshot
        </span>
        <span className="px-6 font-mono text-[11px] text-muted/70">{shot.alt}</span>
      </div>
    );
  }
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
    />
  );
}
