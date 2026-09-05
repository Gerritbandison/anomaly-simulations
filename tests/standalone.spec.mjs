import { test, expect } from '@playwright/test';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const pages = [
  'exotic_propulsion_simulation.html',
  'exotic_propulsion_simulations.html',
  'nuclear_test_simulations.html',
  'underground_nuclear_test.html',
  'uap_classified_tech_simulations.html',
  'ufo-research.html',
];

for (const file of pages) {
  test(`${file}: opens offline with unique IDs and usable narrow layout`, async ({ page, context }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await context.setOffline(true);
    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto(pathToFileURL(resolve(file)).href);
    await expect(page.locator('h1')).toBeVisible();
    const result = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('[id]')].map(node => node.id);
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
      const brokenAnchors = [...document.querySelectorAll('a[href^="#"]')]
        .filter(link => link.hash && !document.getElementById(decodeURIComponent(link.hash.slice(1))))
        .map(link => link.hash);
      return { duplicates, brokenAnchors, overflow: document.documentElement.scrollWidth > innerWidth };
    });
    expect(result).toEqual({ duplicates: [], brokenAnchors: [], overflow: false });
    expect(errors).toEqual([]);
  });
}
