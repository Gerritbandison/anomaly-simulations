import { test, expect } from '@playwright/test';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const url = pathToFileURL(resolve('uap_classified_tech_simulations.html')).href;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test('every illustration renders immediately and across its full timeline', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const result = await page.evaluate(() => {
    const failures = [];
    const starts = [];
    for (const scene of S) {
      ld(scene.id);
      starts.push(C.getContext('2d').getImageData(0, 0, 1, 1).data[3]);
      for (let step = 0; step <= 1000; step++) {
        try { t = step / 1000; dr(); }
        catch (error) { failures.push(`${scene.id} at ${t}: ${error.message}`); break; }
      }
    }
    return { count: S.length, starts, failures };
  });
  expect(result.count).toBeGreaterThan(30);
  expect(result.failures).toEqual([]);
  expect(result.starts.every(alpha => alpha > 0)).toBe(true);
  expect(errors).toEqual([]);
});

test('initial scene is painted, accessible, and has bounded evidence claims', async ({ page }) => {
  expect(await page.evaluate(() => c.getImageData(0, 0, 1, 1).data[3])).toBe(255);
  await expect(page.locator('#C')).toHaveAccessibleName('USS Nimitz Tic Tac');
  await expect(page.locator('#evidenceLabel')).toContainText('Reported');
  await expect(page.locator('#evidenceSource a')).toHaveAttribute('href', /defense.gov/);
  await expect(page.locator('#legacy')).not.toHaveAttribute('open', '');
  await page.getByRole('button', { name: 'Scramjet Engine', exact: true }).click();
  await expect(page.locator('#evidenceLabel')).toContainText('Documented technology');
  await expect(page.locator('#evidenceSource a')).toHaveAttribute('href', 'https://www.nasa.gov/reference/x-43a/');
  await page.getByRole('button', { name: 'TR-3B (Alleged)', exact: true }).click();
  await expect(page.locator('#evidenceLabel')).toContainText('Speculative');
  await expect(page.locator('#evidenceSource')).toBeEmpty();
});

test('single animation owner, elapsed-time playback, replay, reset, seek and hidden-tab pause', async ({ page }) => {
  const result = await page.evaluate(() => {
    const queue = new Map(); let next = 0;
    window.requestAnimationFrame = callback => { queue.set(++next, callback); return next; };
    window.cancelAnimationFrame = id => queue.delete(id);
    const tick = timestamp => { const pending = [...queue.values()]; queue.clear(); pending.forEach(callback => callback(timestamp)); };
    tog(); tog(); tog();
    const owners = queue.size;
    tick(0); tick(1000);
    const firstSecond = t;
    stopPlayback(); const paused = t; tick(5000);
    const afterPause = t;
    tog(); tick(6000); tick(7000);
    const resumed = t;
    ld('gimbal'); const selected = { t, on, pending: queue.size };
    rate = 2; tog(); tick(10000); tick(11000);
    const doubleSpeed = t;
    tick(14000); const complete = { t, on, pending: queue.size };
    tog(); const replay = { t, on, pending: queue.size };
    tick(15000); tick(16000);
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
    const hidden = { t, on, pending: queue.size };
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    document.dispatchEvent(new Event('visibilitychange'));
    const stillPaused = !on;
    seek(.6); const seeked = { t, on, pending: queue.size };
    rst(); const reset = { t, on, pending: queue.size };
    return { owners, firstSecond, paused, afterPause, resumed, selected, doubleSpeed, complete, replay, hidden, stillPaused, seeked, reset };
  });
  expect(result.owners).toBe(1);
  expect(result.firstSecond).toBeCloseTo(.125);
  expect(result.afterPause).toBe(result.paused);
  expect(result.resumed).toBeCloseTo(.25);
  expect(result.selected).toEqual({ t: 0, on: false, pending: 0 });
  expect(result.doubleSpeed).toBeCloseTo(.25);
  expect(result.complete).toEqual({ t: 1, on: false, pending: 0 });
  expect(result.replay).toEqual({ t: 0, on: true, pending: 1 });
  expect(result.hidden.on).toBe(false);
  expect(result.hidden.pending).toBe(0);
  expect(result.stillPaused).toBe(true);
  expect(result.seeked).toEqual({ t: .6, on: false, pending: 0 });
  expect(result.reset).toEqual({ t: 0, on: false, pending: 0 });
});

test('search, controls and keyboard interactions work without changing selection accidentally', async ({ page }) => {
  const search = page.getByRole('searchbox', { name: 'Find an illustration' });
  await search.fill('no-such-illustration');
  await expect(page.locator('#results')).toContainText('No matches');
  await expect(page.locator('#sT')).toHaveText('USS Nimitz Tic Tac');
  await search.fill('stealth');
  expect(await page.locator('#catalog button:visible').count()).toBeGreaterThan(1);
  await search.fill('gimbal');
  await page.getByRole('button', { name: 'Gimbal UAP', exact: true }).click();
  await expect(page.locator('[data-id="gimbal"]')).toHaveAttribute('aria-current', 'true');
  await page.locator('#C').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#progress')).toHaveText('5%');
  await page.keyboard.press('End');
  await expect(page.locator('#pB')).toContainText('Replay');
  await page.keyboard.press('Home');
  await page.keyboard.press('Space');
  await expect(page.locator('#pB')).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Space');
  await expect(page.locator('#pB')).toHaveAttribute('aria-pressed', 'false');
  await page.selectOption('#speed', '2');
  expect(await page.evaluate(() => rate)).toBe(2);
  await page.locator('#seek').fill('600');
  await expect(page.locator('#progress')).toHaveText('60%');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.locator('#progress')).toHaveText('0%');
});

test('mobile layout remains navigable with readable controls and no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.locator('#pB')).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: /Browse encounters/ }).click();
  const result = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > window.innerWidth,
    buttonHeight: document.getElementById('pB').getBoundingClientRect().height,
    searchHeight: document.getElementById('search').getBoundingClientRect().height,
    navHeight: document.getElementById('sb').getBoundingClientRect().height,
    height: innerHeight,
  }));
  expect(result.overflow).toBe(false);
  expect(result.buttonHeight).toBeGreaterThanOrEqual(44);
  expect(result.searchHeight).toBeGreaterThanOrEqual(44);
  expect(result.navHeight).toBeLessThan(result.height * .4);
  await page.getByRole('searchbox').fill('looking glass');
  await page.getByRole('button', { name: 'Project Looking Glass (Alleged)', exact: true }).click();
  await expect(page.locator('#sT')).toContainText('Looking Glass');
});
