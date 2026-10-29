import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Inter, Noto_Sans_Thai } from "next/font/google";
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

// The faces load under *-latin names; app/(v2)/v2.css builds its three stacks from them
// (--ui, --display, --mono) with Noto Sans Thai behind the Latin ones. Archivo with the
// width axis sets the condensed name and case titles, Inter everything read, IBM Plex
// Mono the numbers (v2, 2026-10-29, font set A). Archivo Black left with the last v1 page.
const archivo = Archivo({
  variable: "--font-archivo-latin",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-latin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono-latin",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Thai companion to the Latin faces, not another voice. preload: false because the site
// is mostly English: the Thai file downloads only when a Thai character renders (the
// exhibition กิ่ง ก้าน ใบ, for one).
const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai"],
  display: "swap",
  preload: false,
});

// Site-wide defaults. Each page sets its own title, description, canonical and
// share card through pageMetadata() in lib/seo.ts; the template below turns a
// page title like "About" into "About · Chaiya Katkwao".
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
        jobTitle: "Live Production Lead",
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

  // One theme since v2 (paper and ink), so no theme script: a Dark saved by a v1 visit
  // in localStorage no longer reaches the page.
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${plexMono.variable} ${notoSansThai.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
