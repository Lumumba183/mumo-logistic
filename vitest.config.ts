import { defineConfig } from "vitest/config";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const templateRoot = path.resolve(dirname(fileURLToPath(import.meta.url)));

export default defineConfig({
  root: templateRoot,
  resolve: {
    alias: {
      "@": path.resolve(templateRoot, "src"),
      "@contracts": path.resolve(templateRoot, "contracts"),
      "@assets": path.resolve(templateRoot, "attached_assets"),
    },
  },
  test: {
    environment: "node",
    include: ["api/**/*.test.ts", "api/**/*.spec.ts"],
  },
});
