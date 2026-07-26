#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

echo "== Portfolio UI QA =="
echo

echo "[1/5] Lint snapshot (project-wide)"
if npm run lint; then
  echo "Lint finished without blocking errors."
else
  echo "Lint reported issues. Review output above."
fi
echo

echo "[2/5] Production build"
npm run build
echo

echo "[3/5] Section anchor integrity"
for section in hero about projects services testimonials contact; do
  if node -e "const fs=require('fs');const s=fs.readFileSync('components/portfolio/PortfolioHome.tsx','utf8');process.exit(s.includes('id=\"${section}\"')?0:1)"; then
    echo "OK: #$section present"
  else
    echo "MISSING: #$section"
    exit 1
  fi
done
echo

echo "[4/5] Accessibility guardrails in global CSS"
node -e "const fs=require('fs');const s=fs.readFileSync('app/globals.css','utf8');process.exit(s.includes(':focus-visible')?0:1)" && echo "OK: focus-visible style found"
node -e "const fs=require('fs');const s=fs.readFileSync('app/globals.css','utf8');process.exit(s.includes('prefers-reduced-motion: reduce')?0:1)" && echo "OK: reduced-motion rule found"
echo

echo "[5/5] Manual responsive and visual parity checks"
cat <<'EOF'
- Viewports: 390px, 768px, 1024px, 1440px
- Keyboard test: Tab through navbar, chips, project links, form controls, footer links
- Contrast check:
  - Body text vs background >= 4.5:1
  - CTA text vs accent >= 4.5:1
- Motion check:
  - Scroll reveals stay subtle (opacity + slight translate only)
  - With reduced motion enabled, animations are minimized and non-essential motion is removed
- Form UX:
  - Labels visible and associated
  - Required fields enforce native validation
EOF

echo
echo "QA script completed."
