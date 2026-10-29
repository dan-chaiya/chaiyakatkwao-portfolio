import type { Metadata } from "next";

// lib/seo.ts — one place for the site's search and share metadata.
// Every page builds its <head> through pageMetadata() so titles, canonical
// URLs and share cards stay consistent. app/layout.tsx holds the defaults and
// the title template; app/sitemap.ts and app/robots.ts read the same URL.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://chaiyakatkwao.com";
export const SITE_NAME = "Chaiya Katkwao";
export const DEFAULT_TITLE = "Chaiya Katkwao | Live Production Lead - Bangkok";
export const TITLE_TEMPLATE = "%s · Chaiya Katkwao";
export const DEFAULT_DESCRIPTION =
  "Live production lead in Bangkok. A 15-room TikTok live commerce studio, multi-camera podcasts, and photography.";

export const INSTAGRAM_URL = "https://www.instagram.com/chaiya.a";
export const PORTRAIT_PATH = "/images/portrait/dan.jpg";

export type ShareImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

// Purpose-built 1200x630 card, regenerated from scripts/share-card.html. A new design gets
// a new filename (-v2 since 2026-10-29): LINE and Facebook cache link images by URL.
export const SHARE_CARD: ShareImage = {
  url: "/images/share-card-v2.jpg",
  width: 1200,
  height: 630,
  alt: "Chaiya Katkwao: a mirrored self-portrait between red temple gates, over the name in condensed capitals",
};

type PageMetadataInput = {
  /** Page-only title; the layout template appends " · Chaiya Katkwao". */
  title: string;
  description: string;
  /** Route path, e.g. "/about". Becomes the canonical and share URL. */
  path: string;
  image?: ShareImage;
  /** Use the title as-is, without the template (homepage only). */
  absoluteTitle?: boolean;
  /** Keep the page out of search results (hidden projects). */
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image = SHARE_CARD,
  absoluteTitle = false,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const shareTitle = absoluteTitle ? title : TITLE_TEMPLATE.replace("%s", title);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image.url],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** Trim copy to search-snippet length at a word boundary. */
export function snippet(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (
    cut.slice(0, lastSpace > 0 ? lastSpace : max - 1).replace(/[,;:\s]+$/, "") +
    "…"
  );
}

/** Serialise structured data for a <script type="application/ld+json">. */
export function jsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
