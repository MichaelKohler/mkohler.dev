const { test, expect } = require('@playwright/test');

test.describe('Visual Regression Tests', () => {
  test('Homepage screenshot', async ({ page }) => {
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});
