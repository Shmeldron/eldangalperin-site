"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Renders the global English chrome (header, footer, overlays) around page
 * content — EXCEPT on the `/he` Hebrew preview, which is fully self-contained
 * (its own RTL header/footer). This keeps the live English site behaviourally
 * identical while letting the Hebrew preview stand on its own.
 *
 * Server components (e.g. <Footer />) are passed in as props, which is allowed
 * for client components in the App Router.
 */
export function Chrome({
  header,
  footer,
  overlays,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  overlays: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const bare = pathname?.startsWith("/he");

  if (bare) return <>{children}</>;

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
      {overlays}
    </>
  );
}
