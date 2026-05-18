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
};

export default nextConfig;
