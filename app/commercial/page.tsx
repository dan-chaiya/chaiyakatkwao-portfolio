import type { Metadata } from "next";
import CommercialClient from "./CommercialClient";

export const metadata: Metadata = {
  title: "Commercial — Chaiya Katkwao",
  description:
    "Selected commissions: fashion, live commerce, and multi-camera podcast production for brands across Thailand.",
};

export default function Page() {
  return <CommercialClient />;
}
