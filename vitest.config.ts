import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/?(*.)+(spec|test).ts"],
    exclude: ["**/node_modules/**", "**/dist/**"],
    testTimeout: 20000,
  },
  esbuild: {
    target: "node18",
  },
  publicDir: false,
});
