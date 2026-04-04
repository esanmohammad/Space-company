import { test, expect } from '@playwright/test';

test.describe('Navbar routing and footer', () => {
  test('clicking Contact nav link navigates to /contact', async ({ page }) => {
    await page.goto('/');
    await page.click('nav a[href="/contact"]');
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('[data-testid="contact-heading"]')).toBeVisible();
  });

  test('clicking Home nav link navigates to /', async ({ page }) => {
    await page.goto('/contact');
    await page.click('nav a[href="/"]');
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('active nav link has aria-current="page" on landing page', async ({ page }) => {
    await page.goto('/');
    const homeLink = page.locator('nav a[href="/"]').first();
    await expect(homeLink).toHaveAttribute('aria-current', 'page');
  });

  test('active nav link has aria-current="page" on contact page', async ({ page }) => {
    await page.goto('/contact');
    const contactLink = page.locator('nav a[href="/contact"]').first();
    await expect(contactLink).toHaveAttribute('aria-current', 'page');
  });

  test('footer is visible on landing page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
  });

  test('footer is visible on contact page', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('footer')).toBeVisible();
  });
});
