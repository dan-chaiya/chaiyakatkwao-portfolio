import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery — Chaiya Katkwao",
  description:
    "Photographs and prints by Chaiya Katkwao — Woven Memories (2025) and selected work from Bangkok and Northern Thailand.",
};

export default function Page() {
  return <GalleryClient />;
}
