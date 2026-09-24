import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AboutClient from "./AboutClient";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Chaiya Katkwao, Creative Producer in Bangkok. Art direction on one side; lighting, cameras, sound and the studio's own software on the other.",
  path: "/about",
});

export default function Page() {
  return <AboutClient />;
}
