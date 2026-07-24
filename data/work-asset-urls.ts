/**
 * URLs for files under /public/work-assets → ../Assets (symlink).
 * Encodes each path segment for spaces, commas, and non-ASCII names.
 */
function workAssetUrl(...segments: string[]): string {
  return "/work-assets/" + segments.map((s) => encodeURIComponent(s)).join("/");
}

export const workAssets = {
  woven: (file: string) => workAssetUrl("Woven memories, 2025", file),
  knack: (file: string) => workAssetUrl("Knack Factory Fashion show, 2024", file),
  podcast: (file: string) => workAssetUrl("Pocast Producer at Modal Creative Studio, 2025-2026", file),
} as const;
