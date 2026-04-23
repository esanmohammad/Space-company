import { describe, it, expect, vi, afterEach } from "vitest";
import { mockBookingSubmit } from "./mockBookingSubmit";
import type { BookingFormValues } from "../types";

const VALID_FORM_DATA: BookingFormValues = {
  destination: "Lunar Flyby",
  departureDate: "2026-07-15",
  seatTier: "economy",
  passengerCount: 2,
};

describe("mockBookingSubmit", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns a Promise", () => {
    vi.useFakeTimers();
    const result = mockBookingSubmit(VALID_FORM_DATA);
    expect(result).toBeInstanceOf(Promise);
    vi.advanceTimersByTime(1500);
    result.catch(() => {});
  });

  it("resolves with bookingId, destination, and departureDate after 1500ms", async () => {
    vi.useFakeTimers();
    const promise = mockBookingSubmit(VALID_FORM_DATA);
    vi.advanceTimersByTime(1500);
    const result = await promise;
    expect(typeof result.bookingId).toBe("string");
    expect(result.bookingId.length).toBeGreaterThan(0);
    expect(result.destination).toBe("Lunar Flyby");
    expect(result.departureDate).toBe("2026-07-15");
  });

  it("bookingId is a non-empty string", async () => {
    vi.useFakeTimers();
    const promise = mockBookingSubmit(VALID_FORM_DATA);
    vi.advanceTimersByTime(1500);
    const result = await promise;
    expect(result.bookingId).toBeTruthy();
  });

  it('rejects with Error("Network error") when simulateError is true', async () => {
    vi.useFakeTimers();
    const promise = mockBookingSubmit(VALID_FORM_DATA, { simulateError: true });
    const assertionPromise = expect(promise).rejects.toThrow("Network error");
    vi.advanceTimersByTime(1500);
    await assertionPromise;
  });

  it('error message is exactly "Network error"', async () => {
    vi.useFakeTimers();
    const promise = mockBookingSubmit(VALID_FORM_DATA, { simulateError: true });
    const assertionPromise = expect(promise).rejects.toThrow("Network error");
    vi.advanceTimersByTime(1500);
    await assertionPromise;
  });
});
