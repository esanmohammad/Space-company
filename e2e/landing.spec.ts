import { test, expect } from './fixtures';

/**
 * TC-001 / TC-002 / TC-003 / TC-016 / TC-018
 * Landing page hero, CTA navigation, feature grid, and no-overflow tests.
 */
test.describe('Landing page render and no-overflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for React lazy-loaded LandingPage to finish rendering
    await page.waitForLoadState('networkidle');
  });

  // TC-001 — Hero section visible
  test('hero h1 is visible', async ({ page }) => {
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 10_000 });
  });

  test('hero sub-headline is visible', async ({ page }) => {
    await expect(page.locator('[data-testid="hero"] p').first()).toBeVisible({ timeout: 10_000 });
  });

  test('hero CTA button is visible', async ({ page }) => {
    await expect(page.locator('[data-testid="hero"] button').first()).toBeVisible({ timeout: 10_000 });
  });

  test('footer is visible after scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('footer')).toBeVisible({ timeout: 10_000 });
  });

  // TC-001 — Feature cards
  test('at least 3 feature cards render', async ({ page }) => {
    const cards = page.locator('[data-testid="feature-card"]');
    await expect(cards.first()).toBeVisible({ timeout: 10_000 });
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  // TC-002 — Hero CTA navigates to /contact
  test('TC-002: clicking hero CTA navigates to /contact', async ({ page }) => {
    const heroBtn = page.locator('[data-testid="hero"] button').first();
    await expect(heroBtn).toBeVisible({ timeout: 10_000 });
    await heroBtn.click();
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('[data-testid="contact-heading"]')).toBeVisible({ timeout: 10_000 });
  });

  test('mission strip h2 is visible', async ({ page }) => {
    await expect(page.locator('[data-testid="mission-strip"] h2')).toBeVisible({ timeout: 10_000 });
  });

  test('CTA banner button is visible', async ({ page }) => {
    await expect(page.locator('[data-testid="cta-banner"] button')).toBeVisible({ timeout: 10_000 });
  });

  // TC-003 — CTA banner navigates to /contact
  test('TC-003: clicking CTA banner button navigates to /contact', async ({ page }) => {
    const ctaBtn = page.locator('[data-testid="cta-banner"] button');
    await expect(ctaBtn).toBeVisible({ timeout: 10_000 });
    await ctaBtn.click();
    await expect(page).toHaveURL('/contact');
  });

  // TC-016 — No horizontal overflow on mobile
  test('TC-016: no horizontal overflow at 375px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasOverflow).toBe(false);
    // Scroll to bottom and check again
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const hasOverflowAfterScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasOverflowAfterScroll).toBe(false);
  });

  // TC-018 — Feature cards multi-column at desktop
  test('TC-018: feature cards render in multiple columns at 1280px', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const cards = page.locator('[data-testid="feature-card"]');
    await expect(cards.first()).toBeVisible({ timeout: 10_000 });
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(3);
    // Check that at least 2 cards share the same top position (same row)
    const boxes = await Promise.all(
      Array.from({ length: Math.min(count, 3) }, (_, i) => cards.nth(i).boundingBox()),
    );
    const tops = boxes.filter(Boolean).map((b) => Math.round(b!.y));
    const uniqueTops = new Set(tops);
    // In a multi-column grid, at least 2 of 3 cards share the same row
    expect(uniqueTops.size).toBeLessThan(tops.length);
  });
});
