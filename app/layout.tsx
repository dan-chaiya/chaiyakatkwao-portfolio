import type { Metadata } from "next";
import { Archivo, Archivo_Black, IBM_Plex_Mono, Inter, JetBrains_Mono, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import {
  absoluteUrl,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  INSTAGRAM_URL,
  jsonLd,
  PORTRAIT_PATH,
  SHARE_CARD,
  SITE_NAME,
  SITE_URL,
  TITLE_TEMPLATE,
} from "@/lib/seo";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

// The three Latin faces load under *-latin names. globals.css rebuilds --font-archivo,
// --font-archivo-black and --font-jetbrains-mono from them with Noto Sans Thai behind
// each, so every existing var(--font-*) reference sets Thai without knowing about it.
// Variable with the width axis: legacy pages use it at normal width, v2 sets the
// name at wdth 62 (condensed).
const archivo = Archivo({
  variable: "--font-archivo-latin",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// v2 UI and metadata faces (font set A, chosen 2026-10-29).
const inter = Inter({
  variable: "--font-inter-latin",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono-latin",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Archivo Black and JetBrains Mono serve only the legacy /cv and /chat pages since v2,
// so they don't preload: on v2 pages they'd compete with the fonts the page uses.
const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black-latin",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono-latin",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

// Thai companion to Archivo, not a third voice (DESIGN.md §3). Variable, so a Thai
// headline gets a real 800 beside the synthesized Archivo Black. preload: false because
// the site is English today: the Thai file downloads only when a Thai character renders.
const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai"],
  display: "swap",
  preload: false,
});

// Site-wide defaults. Each page sets its own title, description, canonical and
// share card through pageMetadata() in lib/seo.ts; the template below turns a
// page title like "About" into "About — Chaiya Katkwao".
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: TITLE_TEMPLATE },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [SHARE_CARD],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SHARE_CARD.url],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Structured data for search engines: who runs the site and what the site is.
  // Case studies point back at these two ids from their own CreativeWork.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Chaiya Katkwao",
        jobTitle: "Creative Producer",
        url: SITE_URL,
        image: absoluteUrl(PORTRAIT_PATH),
        sameAs: [INSTAGRAM_URL],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bangkok",
          addressCountry: "TH",
        },
        knowsAbout: [
          "Art Direction",
          "Creative Production",
          "AV Engineering",
          "Live Commerce",
          "Multi-camera Production",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  // suppressHydrationWarning: the theme script below writes data-theme onto <html>
  // before React hydrates, so the server's <html> and the browser's differ by exactly
  // that attribute. It covers <html>'s own attributes only, not the tree inside.
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} ${inter.variable} ${plexMono.variable} ${notoSansThai.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* A plain inline script, not next/script: beforeInteractive would queue it
            behind Next's runtime, after the first paint, and a saved Dark would
            flash Light on every load. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
