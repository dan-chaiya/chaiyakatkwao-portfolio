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
  youtubeIds?: string[];
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
    cover: "/images/knack-factory/01.jpg",
    images: [
      "/images/knack-factory/07.jpg",
      "/images/knack-factory/03.jpg",
      "/images/knack-factory/04.jpg",
      "/images/knack-factory/05.jpg",
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
    tags: ["Fashion Photography", "Art Direction"],
    cover: "/images/bakao/01.jpg",
    images: [
      "/images/bakao/02.jpg",
      "/images/bakao/03.jpg",
      "/images/bakao/04.jpg",
      "/images/bakao/05.jpg",
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
    tags: ["Studio Production", "Live Systems", "Podcast"],
    cover: "/images/podcast/01.jpg",
    images: ["/images/podcast/02.jpg", "/images/podcast/03.jpg"],
    youtubeIds: [
      "XbYJ8nF8X8M",
      "jv4YtosznsQ",
      "eL6XtPuvpJs",
      "Nv1eOGsYhGk",
      "swJAnw13zR4",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
