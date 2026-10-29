// scripts/check-cv-print.mjs — does the CV still print on one A4 sheet, and how full is it?
//
//   npm run build && npm start   (in another shell), then:
//   node scripts/check-cv-print.mjs [http://localhost:3000]
//
// Prints the PDF page count and the space left under the content, in mm. One page
// with 0–25 mm to spare is right; more than that means the type could be larger.
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const PRINTABLE_W_MM = 210 - 2 * 13; // @page margins in app/(v2)/cv/page.tsx
const PRINTABLE_H_MM = 297 - 2 * 10;
const PX_PER_MM = 96 / 25.4;

// CHROMIUM_PATH: a browser of your own, when the installed Playwright has none downloaded.
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: Math.round(PRINTABLE_W_MM * PX_PER_MM), height: 1200 } });
await page.goto(`${base}/cv`, { waitUntil: "networkidle" });
await page.emulateMedia({ media: "print" });
const usedMm = (await page.evaluate(() => document.querySelector(".v2-cv").getBoundingClientRect().height)) / PX_PER_MM;
const pdf = await page.pdf({ format: "A4", preferCSSPageSize: true, printBackground: true });
const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
await browser.close();

console.log(`${pages} page(s); content ${usedMm.toFixed(0)} mm of ${PRINTABLE_H_MM} mm, ${(PRINTABLE_H_MM - usedMm).toFixed(0)} mm to spare`);
if (pages !== 1) process.exitCode = 1;
