import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "Photographs and prints by Chaiya Katkwao — Woven Memories (2025) and selected work from Bangkok and Northern Thailand.",
  path: "/gallery",
});

export default function Page() {
  return <GalleryClient />;
}
