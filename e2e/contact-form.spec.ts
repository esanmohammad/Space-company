import { test, expect } from './fixtures';

/**
 * TC-007 / TC-008 / TC-009 / TC-010 / TC-011
 * Contact form validation, happy path, submission state, and company info.
 */
test.describe('Contact form validation and happy-path', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    // Ensure the form is rendered before interacting
    await expect(page.locator('[data-testid="contact-form"]')).toBeVisible({ timeout: 10_000 });
  });

  // TC-007 — Empty submit shows validation errors
  test('TC-007: empty submit shows required errors for all four fields', async ({ page }) => {
    await page.click('button[type="submit"]');
    // Wait for AntD validation errors to appear
    const errors = page.locator('.ant-form-item-explain-error');
    await expect(errors.first()).toBeVisible({ timeout: 5_000 });
    const count = await errors.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  // TC-008 — Invalid email shows email error
  test('TC-008: invalid email shows email error', async ({ page }) => {
    await page.fill('input[type="email"]', 'not-an-email');
    await page.click('button[type="submit"]');
    await expect(page.locator('.ant-form-item-explain-error').first()).toBeVisible({ timeout: 5_000 });
  });

  // TC-009 / TC-010 — Happy path with loading state
  test('TC-009: happy path — valid submit shows success notification and resets fields', async ({
    page,
  }) => {
    await page.fill('input[placeholder="Your full name"]', 'Jane Doe');
    await page.fill('input[type="email"]', 'jane@example.com');
    await page.fill('input[placeholder="Message subject"]', 'Space inquiry');
    await page.fill('textarea', 'I would like to book a trip to Mars and explore the cosmos.');

    await page.click('button[type="submit"]');

    // TC-010: Button becomes disabled during submission
    await expect(page.locator('button[type="submit"]')).toBeDisabled({ timeout: 2_000 });

    // TC-009: Success notification appears
    await expect(
      page.locator('.ant-notification-notice').filter({ hasText: /sent/i }),
    ).toBeVisible({ timeout: 8_000 });

    // TC-009: Fields reset to empty after success
    await expect(page.locator('input[placeholder="Your full name"]')).toHaveValue('', {
      timeout: 5_000,
    });
    await expect(page.locator('input[type="email"]')).toHaveValue('', { timeout: 5_000 });
  });

  test('TC-010: submit button is re-enabled after success', async ({ page }) => {
    await page.fill('input[placeholder="Your full name"]', 'Jane Doe');
    await page.fill('input[type="email"]', 'jane@example.com');
    await page.fill('input[placeholder="Message subject"]', 'Space inquiry');
    await page.fill('textarea', 'I would like to book a trip to Mars and explore the cosmos.');
    await page.click('button[type="submit"]');

    await expect(
      page.locator('.ant-notification-notice').filter({ hasText: /sent/i }),
    ).toBeVisible({ timeout: 8_000 });

    // Submit button should be enabled again
    await expect(page.locator('button[type="submit"]')).toBeEnabled({ timeout: 5_000 });
  });

  // TC-011 — Company info block
  test('TC-011: company info block shows address, email, and phone', async ({ page }) => {
    const companyInfo = page.locator('[data-testid="company-info-block"]');
    await expect(companyInfo).toBeVisible({ timeout: 10_000 });

    // Address element should be present
    await expect(page.locator('address')).toBeVisible();

    // Address should contain "1 Moonshot Drive"
    await expect(page.locator('address')).toContainText('1 Moonshot Drive');

    // mailto link should point to contact@moonshot.com
    const emailLink = page.locator('a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();
    expect(await emailLink.getAttribute('href')).toBe('mailto:contact@moonshot.com');
    await expect(emailLink).toContainText('contact@moonshot.com');

    // tel link
    const phoneLink = page.locator('a[href^="tel:"]');
    await expect(phoneLink).toBeVisible();
    expect(await phoneLink.getAttribute('href')).toMatch(/^tel:/);
  });
});
