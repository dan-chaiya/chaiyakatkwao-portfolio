import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import CommercialClient from "./CommercialClient";

export const metadata: Metadata = pageMetadata({
  title: "Commercial",
  description:
    "Selected commissions: fashion, live commerce, and multi-camera podcast production for brands across Thailand.",
  path: "/commercial",
});

export default function Page() {
  return <CommercialClient />;
}
