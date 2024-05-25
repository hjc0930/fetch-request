import { defineConfig } from "vitest/config";

export default defineConfig((configEnv) =>
  defineConfig({
    test: {
      exclude: ["test/*"],
    },
  })
);
