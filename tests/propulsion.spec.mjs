import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const url = name => pathToFileURL(resolve(name)).href;
async function clock(page) {
  await page.addInitScript(() => {
    const queue = new Map(); let id = 0;
    window.requestAnimationFrame = callback => { queue.set(++id, callback); return id; };
    window.cancelAnimationFrame = id => queue.delete(id);
    window.frameCount = () => queue.size;
    window.advanceFrame = timestamp => { const callbacks = [...queue.values()]; queue.clear(); callbacks.forEach(callback => callback(timestamp)); };
    window.setHidden = hidden => { Object.defineProperty(document, 'hidden', { configurable: true, value: hidden }); document.dispatchEvent(new Event('visibilitychange')); };
  });
}
test('physics lab tabs change meaningful experiments and preserve keyboard access',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await clock(page);await page.goto(url('exotic_propulsion_simulation.html'));
 await expect(page.getByRole('tab')).toHaveCount(10);expect(await page.evaluate(()=>frameCount())).toBe(0);
 await page.getByRole('tab').first().focus();await page.keyboard.press('End');
 await expect(page.getByRole('tab').last()).toHaveAttribute('aria-selected','true');
 await expect(page.locator('.sim-panel.active .museum-experiment')).toHaveAttribute('data-experiment','oscillator');
 await expect(page.locator('.sim-panel.active .obs-lab-layout')).toBeHidden();expect(errors).toEqual([]);
});
test('library playback cancels callbacks, replays, seeks and uses timestamp speed', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await clock(page); await page.goto(url('exotic_propulsion_simulations.html'));
  await page.evaluate(() => { tog(); tog(); tog(); });
  expect(await page.evaluate(() => frameCount())).toBe(1);
  await page.evaluate(() => { advanceFrame(0); advanceFrame(100); });
  const normal = await page.evaluate(() => t);
  await page.evaluate(() => rst());
  await page.locator('#speed').selectOption('2');
  await page.evaluate(() => { tog(); advanceFrame(0); advanceFrame(100); });
  expect(await page.evaluate(() => t)).toBeCloseTo(normal * 2);
  await page.locator('#seek').fill('1000');
  await expect(page.locator('#pB')).toHaveText('↺ Replay');
  expect(await page.evaluate(() => frameCount())).toBe(0);
  await page.locator('#pB').click();
  expect(await page.evaluate(() => t)).toBe(0);
  await page.evaluate(() => { advanceFrame(1000); advanceFrame(1100); setHidden(true); });
  expect(await page.evaluate(() => frameCount())).toBe(0);
  const paused = await page.evaluate(() => t);
  await page.evaluate(() => { setHidden(false); advanceFrame(100000); });
  expect(await page.evaluate(() => t)).toBe(paused);
  await page.locator('.sb[data-id="hall"]').click();
  expect(await page.evaluate(() => frameCount())).toBe(0);
  expect(errors).toEqual([]);
});
test('library search, all scene boundaries, repeatable seeking and mobile fit', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto(url('exotic_propulsion_simulations.html'));
  await page.locator('#search').fill('warp');
  await expect(page.locator('.sb:visible')).toHaveCount(1);
  await page.locator('.sb:visible').click();
  await expect(page.locator('#evidence')).toContainText('speculative');
  await page.locator('#search').fill('not-a-concept');
  await expect(page.locator('#searchStatus')).toContainText('No exhibits match');
  await page.locator('#search').fill('');
  const failures = await page.evaluate(() => {
    const failures=[];
    for(const scene of S) for(const progress of [0,0.1,0.12,0.15,0.3,0.5,0.75,0.999,1]) {
      try { ld(scene.id); t=progress; dr(); } catch(error) { failures.push(scene.id+': '+error.message); }
    }
    ld('nerva');t=0.5;dr();const first=C.toDataURL();dr();if(C.toDataURL()!==first)failures.push('same time draws differently');
    return failures;
  });
  expect(failures).toEqual([]);
  await page.setViewportSize({width:375,height:812});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.locator('#C').evaluate(canvas => canvas.getBoundingClientRect().width)).toBeGreaterThan(300);
  expect(errors).toEqual([]);
});
test('physics lab remains static and usable in reduced motion at narrow widths',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await clock(page);await page.setViewportSize({width:375,height:812});await page.goto(url('exotic_propulsion_simulation.html'));
 expect(await page.evaluate(()=>frameCount())).toBe(0);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await expect(page.locator('.sim-panel.active .museum-experiment')).toBeVisible();
});
