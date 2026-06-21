import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Space_Grotesk, JetBrains_Mono, Rubik, IBM_Plex_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { VercelAnalytics } from "@/components/VercelAnalytics";
import { LangSwitch } from "@/components/i18n/LangSwitch";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { DIR, LOCALE_COOKIE, type Locale } from "@/lib/i18n/content";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// Hebrew faces: Rubik for display headings, IBM Plex Sans Hebrew for body.
// Applied by lang-scoped rules in globals.css (English keeps Space Grotesk).
const rubikHe = Rubik({
  variable: "--font-rubik-he",
  subsets: ["hebrew", "latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const plexHe = IBM_Plex_Sans_Hebrew({
  variable: "--font-plex-he",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Metadata is locale-aware: og:locale reflects the cookie that drives <html lang>,
// and the other language is advertised as an alternate so crawlers/social know the
// page is also available in Hebrew (served via the in-page toggle).
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get(LOCALE_COOKIE)?.value === "he" ? "he" : "en";
  const ogLocale = locale === "he" ? "he_IL" : "en_US";
  const ogAlternate = locale === "he" ? "en_US" : "he_IL";

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.role}`,
      template: `%s — ${site.name}`,
    },
    description: site.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    keywords: [
      "Eldan Galperin",
      "full-stack engineer",
      "AI engineer",
      "Next.js",
      "TypeScript",
      "LLM products",
      "freelance",
    ],
    alternates: { canonical: site.url },
    openGraph: {
      type: "website",
      url: site.url,
      title: `${site.name} — ${site.role}`,
      description: site.description,
      siteName: site.name,
      locale: ogLocale,
      alternateLocale: ogAlternate,
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${site.role}`,
      description: site.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Cookie drives the first-paint direction/language so returning Hebrew
  // visitors don't see an English flash.
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get(LOCALE_COOKIE)?.value === "he" ? "he" : "en";

  return (
    <html
      lang={locale}
      dir={DIR[locale]}
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${rubikHe.variable} ${plexHe.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <LocaleProvider initialLocale={locale}>
          <Header />
          <main>{children}</main>
          <Footer />
          <LangSwitch />
          <CommandPalette />
          <ChatWidget />
        </LocaleProvider>
        <VercelAnalytics />
      </body>
    </html>
  );
}
