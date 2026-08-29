import type { Metadata } from "next";
import { Archivo, Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chaiyakatkwao.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Chaiya Katkwao | Creative Producer - Bangkok",
  description:
    "Chaiya Katkwao (CK) Creative Producer ในกรุงเทพฯ ที่เชี่ยวชาญด้าน Art Direction, AV Engineering, Live Commerce และ Production",
  openGraph: {
    title: "Chaiya Katkwao | Creative Producer - Bangkok",
    description:
      "Chaiya Katkwao (CK) Creative Producer ในกรุงเทพฯ ที่เชี่ยวชาญด้าน Art Direction, AV Engineering, Live Commerce และ Production",
    url: SITE_URL,
    siteName: "Chaiya Katkwao",
    type: "website",
    locale: "en_US",
    images: [
      {
        // Purpose-built 1200x630 card. The previous value pointed at a 2400x1600
        // photograph while declaring 1200x630, so every platform cropped it
        // somewhere different. Regenerate from scripts/share-card.html.
        url: "/images/share-card.jpg",
        width: 1200,
        height: 630,
        alt: "Chaiya Katkwao — Creative Producer, Bangkok",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaiya Katkwao | Creative Producer - Bangkok",
    description: "Chaiya Katkwao (CK) Creative Producer ในกรุงเทพฯ ที่เชี่ยวชาญด้าน Art Direction, AV Engineering, Live Commerce และ Production",
    images: ["/images/share-card.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Chaiya Katkwao",
    "jobTitle": "Creative Producer",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangkok",
      "addressCountry": "TH"
    },
    "url": SITE_URL,
    "knowsAbout": [
      "Art Direction",
      "Creative Production",
      "AV Engineering",
      "Live Commerce",
      "Multi-camera Production"
    ]
  };

  return (
    <html lang="en" className={`${archivo.variable} ${archivoBlack.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
