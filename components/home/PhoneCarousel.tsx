"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type Shot = { src: string; alt: string };

/** A floating phone that slides through a few app screens — the mobile-app
 *  answer to the wide card (a single phone would crop; this fits the phone whole
 *  and shows several screens, mirroring the platform card's dashboard slide).
 *  Auto-advances; under reduced-motion it holds the first screen and never
 *  cycles. `dir="ltr"` pins the slide maths regardless of page direction. */
export function PhoneCarousel({ shots, className }: { shots: Shot[]; className?: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const n = shots.length;

  useEffect(() => {
    if (reduce || n < 2) return;
    const id = setInterval(() => setI((p) => (p + 1) % n), 2600);
    return () => clearInterval(id);
  }, [reduce, n]);

  return (
    <div dir="ltr" className={className}>
      {/* phone frame: hairline dark bezel so the light app screens read as a device on the card */}
      <div className="mx-auto h-full aspect-[1170/1992] rounded-[16px] bg-neutral-900 p-[4px] shadow-sm ring-1 ring-black/5">
        <div className="relative h-full w-full overflow-hidden rounded-[12px] bg-white">
          <div
            className="flex h-full motion-safe:transition-transform motion-safe:duration-[650ms] motion-safe:ease-out"
            style={{ width: `${n * 100}%`, transform: `translateX(-${(100 / n) * i}%)` }}
          >
            {shots.map((s, idx) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={s.src}
                src={s.src}
                alt={idx === 0 ? s.alt : ""}
                aria-hidden={idx !== 0}
                className="h-full shrink-0 object-cover object-top"
                style={{ width: `${100 / n}%` }}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
