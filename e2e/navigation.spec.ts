import { test, expect } from './fixtures';

/**
 * TC-004 / TC-005 / TC-006 — Navbar routing and footer visibility.
 */
test.describe('Navbar routing and footer', () => {
  // TC-004 — Contact nav link
  test('TC-004: clicking Contact nav link navigates to /contact', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Wait for navbar to be rendered (it's outside Suspense, renders immediately)
    await expect(page.locator('[data-testid="navbar"]')).toBeVisible({ timeout: 10_000 });
    await page.click('nav a[href="/contact"]');
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('[data-testid="contact-heading"]')).toBeVisible({ timeout: 10_000 });
  });

  // TC-005 — Home nav link
  test('TC-005: clicking Home nav link navigates to /', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-testid="navbar"]')).toBeVisible({ timeout: 10_000 });
    await page.click('nav a[href="/"]');
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 10_000 });
  });

  // TC-004 — aria-current on landing page
  test('TC-004: active nav link has aria-current="page" on landing page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-testid="navbar"]')).toBeVisible({ timeout: 10_000 });
    const homeLink = page.locator('nav a[href="/"]').first();
    await expect(homeLink).toHaveAttribute('aria-current', 'page');
  });

  // TC-005 — aria-current on contact page
  test('TC-005: active nav link has aria-current="page" on contact page', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-testid="navbar"]')).toBeVisible({ timeout: 10_000 });
    const contactLink = page.locator('nav a[href="/contact"]').first();
    await expect(contactLink).toHaveAttribute('aria-current', 'page');
  });

  // TC-006 — Footer present on both pages
  test('TC-006: footer is visible on landing page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('footer')).toBeVisible({ timeout: 10_000 });
  });

  test('TC-006: footer is visible on contact page', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('footer')).toBeVisible({ timeout: 10_000 });
  });
});

/**
 * Brand name verification — navbar and footer display "Stark Space".
 */
test.describe('Brand name verification in navigation', () => {
  test('navbar brand text is "Stark Space" on landing page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-testid="navbar"]')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('[data-testid="navbar"]')).toContainText('Stark Space');
  });

  test('navbar brand text is "Stark Space" on contact page', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('[data-testid="navbar"]')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('[data-testid="navbar"]')).toContainText('Stark Space');
  });

  test('footer contains "Stark Space" text', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('footer')).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('footer')).toContainText('Stark Space');
  });
});
