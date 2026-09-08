import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AboutClient from "./AboutClient";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Chaiya Katkwao is a Bangkok-based Creative Producer working at the intersection of art direction and technical execution.",
  path: "/about",
});

export default function Page() {
  return <AboutClient />;
}
