import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for running e2e tests from within apps/web.
 * The spec files live in ../../e2e/ (monorepo root /e2e/).
 */
export default defineConfig({
  testDir: '../../e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 2,
  reporter: [
    ['html'],
    [
      'json',
      {
        outputFile:
          process.env.PLAYWRIGHT_JSON_OUTPUT_NAME ||
          '../../.swarm/test-results.json',
      },
    ],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    // Bypass CSP so Vite's inline HMR scripts aren't blocked during testing
    bypassCSP: true,
    // Wait for network to be idle after navigation for SPA lazy-loading
    navigationTimeout: 30_000,
    actionTimeout: 15_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm turbo dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
