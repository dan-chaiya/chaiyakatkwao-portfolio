// data/exhibitions.ts — the exhibition record, one list for Information and the CV.
// From _curation.md (brief, Information). Until 2026-10-29 the CV kept its own list
// ("Woven Memories, Red Dog Gallery" and "Fuiyoh, CMU Art Centre") and left out 2023.
// Woven Memories was shown at ID; its project page says so under Exhibited.

export type Exhibition = { year: string; title: string; place: string; lang?: "th" };

export const EXHIBITIONS: Exhibition[] = [
  { year: "2025", title: "ID", place: "Red Dog Gallery, Chiang Mai" },
  { year: "2023", title: "กิ่ง ก้าน ใบ", place: "Faculty of Fine Arts, CMU", lang: "th" },
  { year: "2021", title: "FUIYOH", place: "CMU Art Center, Chiang Mai" },
];
