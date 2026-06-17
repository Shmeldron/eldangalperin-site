import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// `@/...` resolves to the project root, matching tsconfig paths.
export default defineConfig({
  test: { environment: "node" },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
});
