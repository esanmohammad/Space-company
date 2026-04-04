import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react',
  },
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./src/test-setup.ts'],
    deps: {
      // Force vitest to bundle @ant-design/icons so CJS interop works correctly
      inline: ['@ant-design/icons'],
    },
  },
});
