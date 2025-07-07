import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Configure your E2E tests here
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    viewportHeight: 1080,
    viewportWidth: 1920,
    scrollBehavior: "bottom",
  },
});
