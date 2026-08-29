import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored agent/skill tooling. Not application code — it accounted for 107
    // of 117 lint findings and buried the three that were real.
    ".agents/**",
    ".claude/**",
    ".cursor/**",
    ".superpowers/**",
    "scripts/**",
  ]),
]);

export default eslintConfig;
