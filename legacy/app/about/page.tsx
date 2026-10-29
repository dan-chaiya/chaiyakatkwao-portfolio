import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AboutClient from "./AboutClient";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Chaiya Katkwao, Live Production Lead in Bangkok. Runs a 15-room TikTok live commerce studio for 10 brands, and art-directs the look of what goes out.",
  path: "/about",
});

export default function Page() {
  return <AboutClient />;
}
