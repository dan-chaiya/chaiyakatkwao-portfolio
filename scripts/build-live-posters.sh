#!/bin/bash
# scripts/build-live-posters.sh — one poster per live-commerce recording.
#
# The videos on /commercial show a poster until someone presses Play, so the
# page never fetches a recording just to draw a first frame. Posters are the frame
# at one second, 720 px wide, JPEG quality 4. Re-run after adding a recording.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/images/live-posters
for f in public/videos/live-commerce/*.mp4; do
  n="$(basename "${f%.mp4}")"
  ffmpeg -y -loglevel error -ss 1 -i "$f" -frames:v 1 -vf "scale=720:-2" -q:v 4 "public/images/live-posters/$n.jpg"
  echo "$n"
done
