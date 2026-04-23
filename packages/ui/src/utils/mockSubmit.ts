import type { ContactFormValues } from "../types";

export function mockContactSubmit(
  values: ContactFormValues,
  options?: { simulateError?: boolean },
): Promise<{ success: true; message: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (options?.simulateError) {
        reject(new Error("Network error"));
      } else {
        resolve({
          success: true,
          message: `Thank you, ${values.name}! We've received your message and will be in touch soon.`,
        });
      }
    }, 1500);
  });
}
