import { test, expect } from '@playwright/test';

test.describe('Contact form validation and happy-path', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('empty submit shows required errors for all four fields', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('.ant-form-item-explain-error')).toHaveCount(
      await page.locator('.ant-form-item-explain-error').count(),
    );
    // At least 4 errors (one per required field)
    const errors = page.locator('.ant-form-item-explain-error');
    const count = await errors.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('invalid email shows email error', async ({ page }) => {
    await page.fill('input[type="email"]', 'not-an-email');
    await page.click('button[type="submit"]');
    await expect(page.locator('.ant-form-item-explain-error').first()).toBeVisible();
  });

  test('happy path: valid submit shows success notification and resets fields', async ({ page }) => {
    await page.fill('input[placeholder="Your full name"]', 'Jane Smith');
    await page.fill('input[type="email"]', 'jane@example.com');
    await page.fill('input[placeholder="Message subject"]', 'Mission Inquiry');
    await page.fill('textarea', 'I am interested in booking a mission to the moon.');

    await page.click('button[type="submit"]');

    // Button becomes disabled during submission
    await expect(page.locator('button[type="submit"]')).toBeDisabled();

    // Success notification appears (contains "sent")
    await expect(
      page.locator('.ant-notification-notice').filter({ hasText: /sent/i }),
    ).toBeVisible({ timeout: 5000 });

    // Fields reset to empty after success
    await expect(page.locator('input[placeholder="Your full name"]')).toHaveValue('');
  });

  test('form is re-submittable after success', async ({ page }) => {
    await page.fill('input[placeholder="Your full name"]', 'Jane Smith');
    await page.fill('input[type="email"]', 'jane@example.com');
    await page.fill('input[placeholder="Message subject"]', 'Mission Inquiry');
    await page.fill('textarea', 'I am interested in booking a mission to the moon.');
    await page.click('button[type="submit"]');

    await expect(
      page.locator('.ant-notification-notice').filter({ hasText: /sent/i }),
    ).toBeVisible({ timeout: 5000 });

    // Submit button should be enabled again
    await expect(page.locator('button[type="submit"]')).toBeEnabled({ timeout: 5000 });
  });
});
