import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["ai", "@ai-sdk/anthropic"],
  // Parent folder also has a package-lock.json; pin tracing to this app root.
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    // v2 (2026-10-29): the old pages fold into Index (/works — Next serves /index as the home page), project pages and Information.
    // Case-study slugs carried over unchanged, so /commercial/:slug maps one to one.
    return [
      { source: "/work", destination: "/works", permanent: true },
      { source: "/commercial", destination: "/works", permanent: true },
      { source: "/commercial/:slug", destination: "/work/:slug", permanent: true },
      { source: "/gallery", destination: "/works", permanent: true },
      { source: "/about", destination: "/information", permanent: true },
    ];
  },
  // v2 (2026-10-29): /systems is a Next page again (app/(v2)/systems), written from
  // the redacted draft. The old static copy synced from ~/Projects/management-portfolio
  // by its ./sync-to-parent.sh now sits in legacy/public/systems, unserved: it names the
  // company, so don't run that sync into public/ again.
};

export default nextConfig;
