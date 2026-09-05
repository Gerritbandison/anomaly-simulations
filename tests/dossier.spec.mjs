import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const url = pathToFileURL(resolve('ufo-research.html')).href;
test.beforeEach(async ({ page }) => {
  await page.route('https://**/*', route => route.abort());
  await page.goto(url);
});

test('analysis tabs work without a global event and accept keyboard navigation', async ({ page }) => {
  await page.evaluate(() => showTab('contradicts'));
  await expect(page.locator('#tab-contradicts')).toBeVisible();
  const tab = page.getByRole('tab', { name: 'Arguments against' });
  await expect(tab).toHaveAttribute('aria-selected', 'true');
  await tab.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Assessment' })).toBeFocused();
  await expect(page.locator('#tab-verdict')).toBeVisible();
});

test('search finds and reveals text in inactive tabs and collapsed documents', async ({ page }) => {
  await page.getByRole('searchbox', { name: 'Search this dossier' }).fill('Physical Crash Retrievals');
  await page.locator('#searchResults a').first().click();
  await expect(page.locator('#tab-contradicts')).toBeVisible();
  await expect(page.locator('#tab-contradicts h4').first()).toBeFocused();
  await page.getByRole('searchbox').fill('okra-colored pyramid');
  await page.locator('#searchResults a').first().click();
  await expect(page.locator('details[open]')).toContainText('okra-colored pyramid');
});

test('empty search results and literal input remain safe and clearable', async ({ page }) => {
  await page.getByRole('searchbox').fill('<img src=x onerror=alert(1)>');
  await expect(page.locator('#searchStatus')).toContainText('No sections');
  await expect(page.locator('#searchResults img')).toHaveCount(0);
  await page.getByRole('button', { name: 'Clear search' }).click();
  await expect(page.getByRole('searchbox')).toHaveValue('');
});

test('deep-linked tab, reduced motion, mobile width, and print restoration', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(url + '#tab-verdict');
  await expect(page.locator('#tab-verdict')).toBeVisible();
  await expect(page.locator('.star')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
  expect(await page.locator('details:not([open])').count()).toBe(0);
  await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
  expect(await page.locator('details[open]').count()).toBe(0);
});
