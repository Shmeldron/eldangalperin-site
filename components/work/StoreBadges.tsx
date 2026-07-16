/**
 * Official-style App Store / Google Play badges as self-contained SVG.
 * Rendered when a project link points at apps.apple.com / play.google.com.
 * Black badges with a hairline border so they read on both light & dark grounds.
 * (For a strict brand-compliant launch these can be swapped for Apple/Google's
 * own downloadable badge assets — the layout here matches their guidelines.)
 */

const WRAP =
  "inline-flex transition-opacity hover:opacity-80 focus-visible:opacity-80";

export function AppStoreBadge({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={WRAP} aria-label="Download on the App Store">
      <svg width="132" height="44" viewBox="0 0 120 40" role="img" aria-hidden="true">
        <rect x="0.5" y="0.5" width="119" height="39" rx="6.5" fill="#000" stroke="rgba(255,255,255,0.28)" />
        <path
          fill="#fff"
          d="M24.77 20.3c-.02-2.02 1.65-2.99 1.73-3.04-.94-1.38-2.41-1.57-2.94-1.59-1.25-.13-2.44.73-3.07.73-.63 0-1.61-.72-2.64-.7-1.36.02-2.61.79-3.31 2.01-1.41 2.45-.36 6.06 1.01 8.05.67.97 1.47 2.06 2.52 2.02 1.01-.04 1.4-.65 2.62-.65 1.22 0 1.57.65 2.64.63 1.09-.02 1.78-.99 2.45-1.97.77-1.13 1.09-2.22 1.11-2.28-.02-.01-2.13-.82-2.15-3.25zM22.74 14.35c.56-.68.93-1.62.83-2.56-.8.03-1.77.53-2.35 1.21-.52.6-.97 1.56-.85 2.47.9.07 1.81-.45 2.37-1.12z"
        />
        <text x="35" y="15.5" fill="#fff" fontSize="6.5" fontFamily="-apple-system, Helvetica, Arial, sans-serif">Download on the</text>
        <text x="34.4" y="30" fill="#fff" fontSize="16" fontWeight="500" letterSpacing="-0.4" fontFamily="-apple-system, Helvetica, Arial, sans-serif">App Store</text>
      </svg>
    </a>
  );
}

export function GooglePlayBadge({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={WRAP} aria-label="Get it on Google Play">
      <svg width="148" height="44" viewBox="0 0 135 40" role="img" aria-hidden="true">
        <rect x="0.5" y="0.5" width="134" height="39" rx="6.5" fill="#000" stroke="rgba(255,255,255,0.28)" />
        {/* Play triangle — 4 brand colours, split at the horizontal midline + apex-to-centre */}
        <g transform="translate(12 8) scale(0.72)">
          <polygon points="2,2 2,12 13,12" fill="#34A853" />
          <polygon points="2,2 13,12 21,12" fill="#FBBC04" />
          <polygon points="2,22 2,12 13,12" fill="#4285F4" />
          <polygon points="2,22 13,12 21,12" fill="#EA4335" />
        </g>
        <text x="35" y="15.5" fill="#fff" fontSize="6" letterSpacing="0.7" fontFamily="Roboto, Arial, sans-serif">GET IT ON</text>
        <text x="34.6" y="30" fill="#fff" fontSize="15.5" fontWeight="500" letterSpacing="-0.2" fontFamily="Roboto, Arial, sans-serif">Google Play</text>
      </svg>
    </a>
  );
}

/** Renders the right badge for a store URL, or null if it's not a store link. */
export function StoreBadge({ href }: { href: string }) {
  if (/apps\.apple\.com/.test(href)) return <AppStoreBadge href={href} />;
  if (/play\.google\.com/.test(href)) return <GooglePlayBadge href={href} />;
  return null;
}

export const isStoreLink = (href: string) =>
  /apps\.apple\.com|play\.google\.com/.test(href);
