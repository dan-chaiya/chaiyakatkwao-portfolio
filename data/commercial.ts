import { workAssets } from "@/data/work-asset-urls";

export type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  description: string;
  brief?: string[];
  tags: string[];
  cover: string;
  images: string[];
  listingImages?: string[];
  youtubeIds?: string[];
  hidden?: boolean;
};

export const projects: Project[] = [
  {
    id: "01",
    slug: "knack-factory",
    title: "Knack Factory",
    subtitle: "Senior Fashion Thesis Showcase",
    year: "2024",
    role: "Photographer",
    description:
      "Documenting the senior thesis runway of Suan Sunandha Rajabhat University's graduating fashion class.",
    brief: [
      "Knack Factory #18 is the senior thesis showcase of Suan Sunandha Rajabhat University's graduating fashion class. The runway is reimagined as an assembly line — each designer's \"knack,\" their specialised skill and distinct identity, processed as a working part of a larger machine that refines raw ideas into wearable art.",
      "Industrial precision meets creative expression — a new generation of Thai fashion making its first public turn.",
    ],
    tags: ["Photography", "Fashion"],
    cover: workAssets.knack("Knack-75.jpg"),
    images: [
      workAssets.knack("Knack-14.jpg"),
      workAssets.knack("Knack-75.jpg"),
      workAssets.knack("Knack-79.jpg"),
      workAssets.knack("Knack-94.jpg"),
      workAssets.knack("Knack-120.jpg"),
      workAssets.knack("Knack-131.jpg"),
      workAssets.knack("Knack-143.jpg"),
    ],
    listingImages: [
      workAssets.knack("Knack-14.jpg"),
      workAssets.knack("Knack-79.jpg"),
      workAssets.knack("Knack-94.jpg"),
      workAssets.knack("Knack-120.jpg"),
      workAssets.knack("Knack-131.jpg"),
    ],
  },
  {
    id: "02",
    slug: "bakao",
    title: "BAKAO",
    subtitle: "Fashion Photography",
    year: "2024",
    role: "Photographer / Art Direction",
    description:
      "Fashion photography and art direction for an emerging Thai clothing label.",
    brief: [
      "BAKAO is an independent Bangkok-based clothing label built around clean silhouettes and natural fabrics. The brief was to shoot a lookbook that felt unhurried — clothes worn by real people in real light, without the urgency of trend-driven editorial.",
      "The approach was sparse: minimal location scouting, a tight colour palette pulled from the garments themselves, and long pauses between frames. The result is a set of images that sit closer to portraiture than fashion photography.",
    ],
    tags: ["Fashion Photography", "Art Direction"],
    cover: "/images/bakao/01.jpg",
    images: [
      "/images/bakao/02.jpg",
      "/images/bakao/03.jpg",
      "/images/bakao/04.jpg",
      "/images/bakao/05.jpg",
      "/images/bakao/06.jpg",
    ],
    listingImages: [
      "/images/bakao/02.jpg",
      "/images/bakao/04.jpg",
      "/images/bakao/05.jpg",
      "/images/bakao/06.jpg",
    ],
  },
  {
    id: "03",
    slug: "khun-chang-khian",
    title: "Khun Chang Khian",
    subtitle: "Documentary",
    year: "2024",
    role: "Documentary Photographer",
    description:
      "Portrait series documenting community and landscape across Northern Thailand.",
    brief: [
      "Khun Chang Khian is a village outside Chiang Mai where craft, community, and landscape are inseparable. The assignment began as a portrait series but expanded as the place itself became the subject — small fires burning at the edge of rice fields, hands at work, light that moves differently up north.",
      "The photographs resist compression into a single theme. They are about proximity and patience, and the particular quality of time that only exists when you stay somewhere long enough to stop being a visitor.",
    ],
    tags: ["Documentary", "Portrait"],
    cover: "/images/khun-chang-khian/01.jpg",
    images: [
      "/images/khun-chang-khian/02.jpg",
      "/images/khun-chang-khian/03.jpg",
      "/images/khun-chang-khian/04.jpg",
    ],
  },
  {
    id: "04",
    slug: "podcast-studio",
    title: "Podcast & Studio",
    subtitle: "Production",
    year: "2025–2026",
    role: "Creative Producer / AV Engineer",
    description:
      "Studio design and live production systems supporting an ongoing slate of podcasts and long-form interviews.",
    brief: [
      "The studio was designed to disappear. The goal was a production environment that could carry the technical weight of broadcast-quality recording while remaining warm enough for guests to forget they were being recorded at all. Acoustics, lighting, and furniture were treated as a single system.",
      "Across an ongoing slate of shows, the role spans pre-production to post — guest coordination, signal routing, multi-camera direction, and final delivery. The work is less about any single episode and more about building a machine that runs consistently, week after week.",
    ],
    tags: ["Studio Production", "Live Systems", "Podcast"],
    cover: "/images/podcast/02.jpg",
    images: [
      workAssets.podcast("_MG_8860.JPG"),
      "/images/podcast/03.jpg",
      "/images/podcast/screen-01.png",
      "/images/podcast/screen-02.png",
    ],
    listingImages: [
      workAssets.podcast("_MG_8860.JPG"),
      "/images/podcast/03.jpg",
      "/images/podcast/screen-01.png",
      "/images/podcast/screen-02.png",
    ],
    youtubeIds: [
      "XbYJ8nF8X8M",
      "jv4YtosznsQ",
      "eL6XtPuvpJs",
      "Nv1eOGsYhGk",
      "swJAnw13zR4",
    ],
  },
];

export const visibleProjects = projects.filter((p) => !p.hidden);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
