import { test, expect } from '@playwright/test';

test.describe('Landing page render and no-overflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hero h1 is visible', async ({ page }) => {
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('at least 3 feature cards render', async ({ page }) => {
    const cards = page.locator('[data-testid="feature-card"]');
    await expect(cards).toHaveCount(await cards.count());
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('mission strip h2 is visible', async ({ page }) => {
    await expect(page.locator('[data-testid="mission-strip"] h2')).toBeVisible();
  });

  test('CTA banner button is visible', async ({ page }) => {
    await expect(page.locator('[data-testid="cta-banner"] button')).toBeVisible();
  });

  test('clicking CTA navigates to /contact', async ({ page }) => {
    await page.locator('[data-testid="cta-banner"] button').click();
    await expect(page).toHaveURL('/contact');
  });

  test('no horizontal overflow at 375px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasOverflow).toBe(false);
  });
});
