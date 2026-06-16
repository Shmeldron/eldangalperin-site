"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { site } from "@/lib/site";

// Only count traffic on the real production host. Preview deploys
// (*.vercel.app) and localhost are dropped so they don't burn the
// monthly event quota. Derived from NEXT_PUBLIC_SITE_URL at build time.
const PROD_HOST = (() => {
  try {
    return new URL(site.url).host;
  } catch {
    return "eldangalperin.com";
  }
})();

export function VercelAnalytics() {
  return (
    <Analytics
      beforeSend={(event: BeforeSendEvent) => {
        try {
          const host = new URL(event.url).host;
          if (host !== PROD_HOST && host !== `www.${PROD_HOST}`) {
            return null;
          }
        } catch {
          // Unparseable URL — let the event through rather than lose data.
        }
        return event;
      }}
    />
  );
}
