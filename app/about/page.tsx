import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About — Chaiya Katkwao",
  description:
    "Chaiya Katkwao is a Bangkok-based Creative Producer working at the intersection of art direction and technical execution.",
};

export default function Page() {
  return <AboutClient />;
}
