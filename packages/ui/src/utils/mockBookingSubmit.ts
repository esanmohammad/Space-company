import type { BookingFormValues } from "../types";

export function mockBookingSubmit(
  values: BookingFormValues,
  options?: { simulateError?: boolean },
): Promise<{ bookingId: string; destination: string; departureDate: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (options?.simulateError) {
        reject(new Error("Network error"));
      } else {
        resolve({
          bookingId: `BK-${Date.now()}`,
          destination: values.destination,
          departureDate: values.departureDate,
        });
      }
    }, 1500);
  });
}
