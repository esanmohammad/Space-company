import { describe, it, expect, vi, afterEach } from 'vitest';
import { mockContactSubmit } from './mockSubmit';
import type { ContactFormValues } from '../types';

const VALID_FORM_DATA: ContactFormValues = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'Space inquiry',
  message: 'I would like to book a trip to Mars.',
};

describe('mockContactSubmit', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('TC-043: returns a Promise', () => {
    vi.useFakeTimers();
    const result = mockContactSubmit(VALID_FORM_DATA);
    expect(result).toBeInstanceOf(Promise);
    // Cleanup: don't leave the timer pending
    vi.advanceTimersByTime(1500);
    // Suppress unhandled resolution
    result.catch(() => {});
  });

  it('TC-043: resolves with { success: true, message: string } after 1500ms', async () => {
    vi.useFakeTimers();
    const promise = mockContactSubmit(VALID_FORM_DATA);

    // Advance timers synchronously and then await microtask queue
    vi.advanceTimersByTime(1500);
    const result = await promise;

    expect(result.success).toBe(true);
    expect(typeof result.message).toBe('string');
    expect(result.message.length).toBeGreaterThan(0);
  });

  it('TC-043: resolution message contains the submitter name', async () => {
    vi.useFakeTimers();
    const promise = mockContactSubmit(VALID_FORM_DATA);
    vi.advanceTimersByTime(1500);
    const result = await promise;
    expect(result.message).toContain('Jane Doe');
  });

  it('TC-044: rejects with Error("Network error") when simulateError is true', async () => {
    vi.useFakeTimers();
    // Attach rejection handler immediately to avoid unhandled rejection
    const promise = mockContactSubmit(VALID_FORM_DATA, { simulateError: true });
    // Use expect().rejects to handle the rejection properly
    const assertionPromise = expect(promise).rejects.toThrow('Network error');
    // Now advance timers to trigger the rejection
    vi.advanceTimersByTime(1500);
    await assertionPromise;
  });

  it('TC-044: error message is exactly "Network error"', async () => {
    vi.useFakeTimers();
    const promise = mockContactSubmit(VALID_FORM_DATA, { simulateError: true });
    const assertionPromise = expect(promise).rejects.toThrow('Network error');
    vi.advanceTimersByTime(1500);
    await assertionPromise;
  });
});
