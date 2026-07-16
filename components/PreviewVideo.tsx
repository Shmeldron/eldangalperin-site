"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import type { Project } from "@/lib/projects";

/** Muted, looping preview clip. No `autoPlay` attribute so SSR and first client
 *  render match (paused on the poster); we start playback on mount only when
 *  motion is allowed, so reduced-motion users stay on the still. */
export function PreviewVideo({
  preview,
  className,
}: {
  preview: NonNullable<Project["preview"]>;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    if (shouldReduce) v.pause();
    else v.play().catch(() => {});
  }, [shouldReduce]);

  return (
    <video
      ref={ref}
      poster={preview.poster}
      aria-label={preview.alt}
      loop
      muted
      playsInline
      preload="metadata"
      className={className}
    >
      {preview.webm && <source src={preview.webm} type="video/webm" />}
      <source src={preview.mp4} type="video/mp4" />
    </video>
  );
}
