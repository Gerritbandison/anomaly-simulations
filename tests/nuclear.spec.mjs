import { test, expect } from '@playwright/test';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

async function openSimulation(page, filename) {
  await page.addInitScript(() => {
    let next = 0;
    const callbacks = new Map();
    window.requestAnimationFrame = callback => { callbacks.set(++next, callback); return next; };
    window.cancelAnimationFrame = id => callbacks.delete(id);
    window.testFrames = {
      pending: () => callbacks.size,
      tick: timestamp => {
        const batch = [...callbacks.values()];
        callbacks.clear();
        for (const callback of batch) callback(timestamp);
      },
    };
  });
  await page.goto(pathToFileURL(resolve(filename)).href);
}

for (const filename of ['nuclear_test_simulations.html', 'underground_nuclear_test.html']) {
  const underground = filename.startsWith('underground');
  test(`${filename}: single frame loop, pause, replay, seek, hidden tab`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await openSimulation(page, filename);
    await page.evaluate(() => { togglePlay(); togglePlay(); togglePlay(); });
    expect(await page.evaluate(() => testFrames.pending())).toBe(1);
    await page.evaluate(() => { testFrames.tick(0); testFrames.tick(50); });
    await expect(page.locator('#playBtn')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('#seek').fill('100');
    expect(await page.evaluate(() => testFrames.pending())).toBe(0);
    await expect(page.locator('#playBtn')).toHaveText('↺ Replay');
    await page.locator('#playBtn').click();
    await expect(page.locator('#progressOutput')).toHaveText('0%');
    expect(await page.evaluate(() => testFrames.pending())).toBe(1);
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(await page.evaluate(() => testFrames.pending())).toBe(0);
    await expect(page.locator('#playBtn')).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('#playbackStatus')).toContainText('hidden');
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, value: false });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(await page.evaluate(() => testFrames.pending())).toBe(0);
    await page.locator('#playBtn').click();
    await page.evaluate(() => {
      testFrames.tick(0);
      for (let timestamp = 100; timestamp <= 30000; timestamp += 100) testFrames.tick(timestamp);
    });
    await expect(page.locator('#playBtn')).toHaveText('↺ Replay');
    await expect(page.locator('#progressOutput')).toHaveText('100%');
    expect(await page.evaluate(() => testFrames.pending())).toBe(0);
    expect(errors).toEqual([]);
  });

  test(`${filename}: elapsed-time speed is independent of refresh rate`, async ({ page }) => {
    await openSimulation(page, filename);
    const result = await page.evaluate(isUnderground => {
      const progress = () => isUnderground ? currentPhase + animProgress : t;
      const run = (frames, rate) => {
        if (isUnderground) resetAnimation(); else resetSim();
        setSpeed(rate);
        togglePlay();
        testFrames.tick(0);
        for (let i = 1; i <= frames; i++) testFrames.tick(i * 1000 / frames);
        const value = progress();
        togglePlay();
        return value;
      };
      return { low: run(30, 1), high: run(120, 1), fast: run(60, 2) };
    }, underground);
    expect(result.low).toBeCloseTo(result.high, 10);
    expect(result.fast).toBeCloseTo(result.low * 2, 10);
    expect(result.low).toBeCloseTo(underground ? 0.24 : 0.18, 10);
  });

  test(`${filename}: narrow viewport keeps controls and canvas inside page`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await openSimulation(page, filename);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const canvas = page.locator('canvas');
    await expect(canvas).toHaveAttribute('role', 'img');
    await expect(canvas).toHaveAttribute('aria-describedby', /.+/);
    const box = await canvas.boundingBox();
    expect(box.width).toBeGreaterThan(300);
    expect(box.x + box.width).toBeLessThanOrEqual(375);
    await page.locator('#seek').focus();
    await page.keyboard.press('ArrowRight');
    expect(Number(await page.locator('#seek').inputValue())).toBeGreaterThan(0);
  });
}

test('encyclopedia: every illustration renders at boundaries and switches without queued work', async ({ page }) => {
  await openSimulation(page, 'nuclear_test_simulations.html');
  const errors = await page.evaluate(() => {
    const failures = [];
    for (const simulation of sims) {
      loadSim(simulation.id);
      for (const position of [0, 0.08, 0.1, 0.15, 0.2, 0.3, 0.45, 0.5, 0.6, 0.7, 0.8, 1]) {
        try { seekSim(position * 100); } catch (error) { failures.push(`${simulation.id} at ${position}: ${error.message}`); }
      }
    }
    loadSim('trinity'); togglePlay(); loadSim('underwater');
    return failures;
  });
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => testFrames.pending())).toBe(0);
  await expect(page.locator('.sim-btn[aria-pressed="true"]')).toHaveCount(1);
});

test('underground: every phase renders and keyboard navigation selects a paused phase', async ({ page }) => {
  await openSimulation(page, 'underground_nuclear_test.html');
  const errors = await page.evaluate(() => {
    const failures = [];
    for (let phase = 0; phase < phases.length; phase++) {
      for (const position of [0, 0.25, 0.5, 0.75, 1]) {
        try { jumpToPhase(phase); animProgress = position; drawFrame(); } catch (error) { failures.push(`${phase} at ${position}: ${error.message}`); }
      }
    }
    resetAnimation(); togglePlay();
    return failures;
  });
  expect(errors).toEqual([]);
  await page.locator('#phase0').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#phase1')).toBeFocused();
  await expect(page.locator('#phase1')).toHaveAttribute('aria-current', 'step');
  await expect(page.locator('#phaseTitle')).toHaveText('Phase 2: Detonation');
  expect(await page.evaluate(() => testFrames.pending())).toBe(0);
  await page.keyboard.press('End');
  await expect(page.locator('#phase5')).toBeFocused();
  await page.keyboard.press('Home');
  await expect(page.locator('#phase0')).toBeFocused();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await expect(page.locator('#phase1')).toHaveAttribute('aria-current', 'step');
});
