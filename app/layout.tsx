import type { Metadata } from "next";
import { Archivo, Archivo_Black, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";

const archivo = Archivo({
  variable: "--font-jakarta",
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
  title: "Chaiya Katkwao / Creative Producer",
  description:
    "Bangkok-based Creative Producer. Art direction, multi-camera production, and live content systems.",
  openGraph: {
    title: "Chaiya Katkwao / Creative Producer",
    description:
      "Bangkok-based Creative Producer. Art direction, multi-camera production, and live content systems.",
    siteName: "Chaiya Katkwao",
    type: "website",
    locale: "en_US",
    images: [{ url: "/images/woven-memories/01.jpg", width: 1200, height: 630, alt: "Chaiya Katkwao" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaiya Katkwao / Creative Producer",
    description: "Bangkok-based Creative Producer. Art direction, multi-camera production, and live content systems.",
    images: ["/images/woven-memories/01.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${archivoBlack.variable} ${jetbrainsMono.variable}`}>
      <body>
        <Navigation />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
