import { test, expect } from '@playwright/test';

test.describe('Mobile navbar drawer', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hamburger button is visible on mobile', async ({ page }) => {
    await expect(page.locator('button[aria-label="Open navigation"]')).toBeVisible();
  });

  test('desktop nav links are not visible on mobile', async ({ page }) => {
    // Desktop links list should be hidden via CSS
    const desktopLinks = page.locator('header nav ul').first();
    await expect(desktopLinks).toBeHidden();
  });

  test('clicking hamburger opens drawer with nav links', async ({ page }) => {
    await page.click('button[aria-label="Open navigation"]');
    await expect(page.locator('.ant-drawer-open')).toBeVisible();
    await expect(page.locator('.ant-drawer-open a[href="/contact"]')).toBeVisible();
  });

  test('clicking a drawer link closes drawer and navigates', async ({ page }) => {
    await page.click('button[aria-label="Open navigation"]');
    await expect(page.locator('.ant-drawer-open')).toBeVisible();
    await page.locator('.ant-drawer-open a[href="/contact"]').click();
    await expect(page.locator('.ant-drawer-open')).not.toBeVisible();
    await expect(page).toHaveURL('/contact');
  });

  test('pressing Escape closes the drawer', async ({ page }) => {
    await page.click('button[aria-label="Open navigation"]');
    await expect(page.locator('.ant-drawer-open')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.ant-drawer-open')).not.toBeVisible();
  });

  test('no horizontal overflow at 375px', async ({ page }) => {
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasOverflow).toBe(false);
  });
});
