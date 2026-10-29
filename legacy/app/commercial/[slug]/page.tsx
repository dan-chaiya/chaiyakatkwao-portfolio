import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/commercial";
import { absoluteUrl, jsonLd, pageMetadata, snippet, SITE_URL } from "@/lib/seo";
import CaseStudyClient from "./CaseStudyClient";

// Server shell for a case study. It owns the search and share metadata and the
// CreativeWork structured data; CaseStudyClient owns the interactive page.
// Split on 2026-09-08: a "use client" page cannot export metadata, so until
// then every case study shared the homepage's title and share card.

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: project.title,
    description: snippet(project.description),
    path: `/commercial/${project.slug}`,
    // The cover photo. Portrait covers get centre-cropped by share previews;
    // a per-project 1200x630 card would fix that if it ever matters.
    image: { url: project.cover, alt: `${project.title} — ${project.subtitle}` },
    noIndex: project.hidden,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/commercial/${project.slug}`),
    image: absoluteUrl(project.cover),
    dateCreated: project.year.slice(0, 4),
    keywords: project.tags.join(", "),
    creator: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <CaseStudyClient project={project} />
    </>
  );
}
