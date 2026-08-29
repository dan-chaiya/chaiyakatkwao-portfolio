#!/usr/bin/env bash
# Regenerates the blurred-fill sources behind the home hero.
#
# HeroStage paints each slide's backdrop with a CSS background-image. CSS
# backgrounds bypass next/image, so whatever they point at is fetched at full
# size — pointed at the originals, the six slides pulled ~21 MB on first paint.
# The frame is blurred 30px and scaled 1.15 before it is ever seen, so a 96px
# source is indistinguishable from the original. Total output: ~36 KB.
#
# Run from the repo root after changing SLIDES in components/HeroStage.tsx.

set -euo pipefail
cd "$(dirname "$0")/.."

OUT="public/images/hero-backdrops"
mkdir -p "$OUT"

# source path -> output filename (must match BACKDROP() calls in HeroStage.tsx)
gen() {
  if [ ! -f "$1" ]; then
    echo "  MISSING SOURCE: $1" >&2
    return 1
  fi
  sips -Z 96 "$1" --out "$OUT/$2" -s format jpeg -s formatOptions 60 >/dev/null
  printf '  %6sB  %s\n' "$(stat -f%z "$OUT/$2")" "$2"
}

gen "public/work-assets/Woven memories, 2025/0.jpg"                                  woven-0.jpg
gen "public/videos/motion/live-fitflop-may.poster.jpg"                               live-fitflop-may.jpg
gen "public/work-assets/Knack Factory Fashion show, 2024/Knack-75.jpg"               knack-75.jpg
gen "public/videos/motion/live-rojukiss-may.poster.jpg"                              live-rojukiss-may.jpg
gen "public/work-assets/Pocast Producer at Modal Creative Studio, 2025-2026/_MG_8860.JPG" podcast-8860.jpg
gen "public/videos/motion/live-nestle.poster.jpg"                                    live-nestle.jpg

echo "hero backdrops: $(du -sh "$OUT" | cut -f1) total"
