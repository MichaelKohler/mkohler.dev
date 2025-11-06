const { test, expect } = require('@playwright/test');

test.describe('Visual Regression Tests', () => {
  test('homepage screenshot - desktop', async ({ page }) => {
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('homepage screenshot - mobile', async ({ page }) => {
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});
