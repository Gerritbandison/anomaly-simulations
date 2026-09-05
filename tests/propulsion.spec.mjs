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
test('parameter lab keeps one animation, updates metrics and supports keyboard navigation', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await clock(page); await page.goto(url('exotic_propulsion_simulation.html'));
  await expect(page.getByRole('tab')).toHaveCount(10);
  expect(await page.evaluate(() => frameCount())).toBe(1);
  await page.locator('.sim-panel.active .replay-btn').click({clickCount: 3});
  expect(await page.evaluate(() => frameCount())).toBe(1);
  await page.locator('.sim-panel.active .play-btn').click();
  expect(await page.evaluate(() => frameCount())).toBe(0);
  await page.getByRole('tab', { name: 'HFGW Generator', exact: true }).click();
  const metrics = page.locator('.sim-panel.active .metric-row'); const before = await metrics.innerText();
  await page.locator('#pais-hfgw-freq').fill('100');
  expect(await metrics.innerText()).not.toBe(before);
  await expect(page.locator('.sim-panel.active .play-btn')).toHaveText('▶ Play');
  await page.getByRole('tab', { name: 'HFGW Generator', exact: true }).focus();
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: 'Metamaterial Drive', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('.sim-panel.active .metric-row')).toContainText('-1.0000');
  await page.locator('.sim-panel.active .replay-btn').click();
  await page.evaluate(() => { advanceFrame(0); advanceFrame(100); setHidden(true); });
  expect(await page.evaluate(() => frameCount())).toBe(0);
  await page.evaluate(() => setHidden(false));
  expect(await page.evaluate(() => frameCount())).toBe(1);
  await page.locator('.sim-panel.active .reset-btn').click();
  expect(await page.evaluate(() => frameCount())).toBe(0);
  expect(errors).toEqual([]);
});
test('all ten parameter renderers tolerate initial and boundary parameters', async ({ page }) => {
  await clock(page); await page.goto(url('exotic_propulsion_simulation.html'));
  const failures = await page.evaluate(() => {
    const failures = []; const canvas = document.createElement('canvas'); canvas.width=500; canvas.height=350;
    for (const method of METHODS) {
      const defaults = Object.fromEntries(method.params.map(p => [p.key, p.init]));
      const cases = [defaults, ...['min', 'max'].map(bound => Object.fromEntries(method.params.map(p => [p.key, p[bound]])))];
      for (const param of method.params) for (const bound of ['min','max']) cases.push({...defaults, [param.key]: param[bound]});
      for (const params of cases) try {
        const result = method.simulate(params, canvas);
        for (const scale of [0, 1, 6]) result.draw(scale);
        if (result.metrics.some(metric => /NaN|Infinity/.test(metric.value))) failures.push(method.id + ': nonfinite metric');
      } catch (error) { failures.push(method.id + ': ' + error.message); }
    }
    return failures;
  });
  expect(failures).toEqual([]);
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
  await expect(page.locator('#searchStatus')).toContainText('No matching');
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
  expect(await page.locator('canvas').evaluate(canvas => canvas.getBoundingClientRect().width)).toBeGreaterThan(300);
  expect(errors).toEqual([]);
});
test('parameter lab respects reduced motion, mobile width and real elapsed frame time', async ({ page }) => {
  await page.emulateMedia({reducedMotion:'reduce'}); await clock(page);
  await page.setViewportSize({width:375,height:812});
  await page.goto(url('exotic_propulsion_simulation.html'));
  expect(await page.evaluate(() => frameCount())).toBe(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('.sim-panel.active .play-btn').click();
  const times=await page.evaluate(() => {
    function run(hz){elapsed=0;lastTimestamp=null;for(let i=0;i<=hz;i++)advanceFrame(i*1000/hz);return elapsed;}
    return [run(60),run(144)];
  });
  expect(times[0]).toBeCloseTo(1); expect(times[1]).toBeCloseTo(1);
});
