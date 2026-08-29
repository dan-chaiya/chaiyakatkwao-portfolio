import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["ai", "@ai-sdk/anthropic"],
  // Parent folder also has a package-lock.json; pin tracing to this app root.
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      { source: "/work", destination: "/commercial", permanent: true },
    ];
  },
  async rewrites() {
    return [
      // The management portfolio ("The Day Shift") is a static site that lives
      // in its own repo at ~/Projects/management-portfolio and is copied into
      // public/systems/ by that repo's ./sync-to-parent.sh. It is plain HTML,
      // not a Next route, so it is served rather than rendered.
      //
      // Only /systems is mapped. A request for /systems/ is redirected to
      // /systems first by Next's default trailingSlash: false, and lands here.
      // The page's asset paths are absolute (/systems/styles.css, not
      // styles.css) precisely so both URL forms resolve identically.
      { source: "/systems", destination: "/systems/index.html" },
    ];
  },
};

export default nextConfig;
