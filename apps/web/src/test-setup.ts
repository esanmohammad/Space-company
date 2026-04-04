import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Ensure DOM cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia (not available in jsdom) — needed by Ant Design responsive grid
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
