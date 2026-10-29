import { notFound } from "next/navigation";
import Viewer from "@/components/v2/Viewer";
import { coverOf, getWork, hasPage, works } from "@/data/works";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

// Text-only rows have no page; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return works.filter(hasPage).map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  const cover = coverOf(work);
  return pageMetadata({
    title: work.title,
    description: [work.discipline, work.year, work.credit].filter(Boolean).join(", "),
    path: `/work/${work.slug}`,
    image: cover && { url: absoluteUrl(`${cover.src}.webp`), width: cover.w, height: cover.h, alt: work.title },
  });
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work || !hasPage(work)) notFound();
  return <Viewer work={work} />;
}
