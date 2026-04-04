import { test, expect } from './fixtures';

/**
 * TC-012 / TC-013 / TC-014 / TC-015 / TC-017
 * Mobile navbar hamburger, drawer open/close, and no-overflow.
 */
test.describe('Mobile navbar drawer', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Ensure navbar is rendered before interactions
    await expect(page.locator('[data-testid="navbar"]')).toBeVisible({ timeout: 10_000 });
  });

  // TC-012 — Hamburger visible on mobile
  test('TC-012: hamburger button is visible on mobile', async ({ page }) => {
    await expect(
      page.locator('button[aria-label="Open navigation"]'),
    ).toBeVisible({ timeout: 10_000 });
  });

  // TC-012 — Desktop nav links hidden on mobile
  test('TC-012: desktop nav links are not visible on mobile', async ({ page }) => {
    const desktopLinks = page.locator('header nav ul').first();
    await expect(desktopLinks).toBeHidden();
  });

  // TC-013 — Drawer opens with nav links
  test('TC-013: clicking hamburger opens drawer with nav links', async ({ page }) => {
    await page.click('button[aria-label="Open navigation"]');
    await expect(page.locator('.ant-drawer-open')).toBeVisible({ timeout: 5_000 });
    await expect(page.locator('.ant-drawer-open a[href="/"]')).toBeVisible();
    await expect(page.locator('.ant-drawer-open a[href="/contact"]')).toBeVisible();
  });

  // TC-014 — Drawer link navigates and closes drawer
  test('TC-014: clicking drawer link closes drawer and navigates', async ({ page }) => {
    await page.click('button[aria-label="Open navigation"]');
    await expect(page.locator('.ant-drawer-open')).toBeVisible({ timeout: 5_000 });
    await page.locator('.ant-drawer-open a[href="/contact"]').click();
    await expect(page.locator('.ant-drawer-open')).not.toBeVisible({ timeout: 5_000 });
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('[data-testid="contact-heading"]')).toBeVisible({ timeout: 10_000 });
  });

  // TC-015 — Escape key closes drawer
  test('TC-015: pressing Escape closes the drawer', async ({ page }) => {
    await page.click('button[aria-label="Open navigation"]');
    await expect(page.locator('.ant-drawer-open')).toBeVisible({ timeout: 5_000 });
    await page.keyboard.press('Escape');
    await expect(page.locator('.ant-drawer-open')).not.toBeVisible({ timeout: 5_000 });
    await expect(page).toHaveURL('/');
  });

  // TC-017 — No horizontal overflow at 375px on contact page
  test('TC-017: no horizontal overflow at 375px on contact page', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasOverflow).toBe(false);
  });

  test('no horizontal overflow at 375px on landing page', async ({ page }) => {
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasOverflow).toBe(false);
  });
});
