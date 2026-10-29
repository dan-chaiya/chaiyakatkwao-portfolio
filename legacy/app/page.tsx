import type { Metadata } from "next";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, pageMetadata } from "@/lib/seo";
import PortfolioHome from "@/components/portfolio/PortfolioHome";

// The homepage keeps the site-wide title as-is (no " — Chaiya Katkwao" suffix)
// and declares its own canonical so the root URL is the one search engines keep.
export const metadata: Metadata = pageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return <PortfolioHome />;
}
