import {test,expect} from '@playwright/test';
import {resolve} from 'node:path';import {pathToFileURL} from 'node:url';
const url=name=>pathToFileURL(resolve(name)).href;

test('collection entrance opens all six redesigned destinations offline',async({page,context})=>{
 await context.setOffline(true);await page.goto(url('index.html'));
 await expect(page.locator('.obs-collection-card')).toHaveCount(6);
 const links=await page.locator('.obs-collection-card').evaluateAll(links=>links.map(a=>a.href));
 for(const link of links){await page.goto(link);await expect(page.locator('.obs-brand')).toBeVisible();await expect(page.locator('h1')).toBeVisible();}
});
test('every original demo maps to an explicit new scene and renders without errors',async({page})=>{
 await page.goto(url('index.html'));
 const result=await page.evaluate(()=>{
  const c=document.createElement('canvas');c.width=320;c.height=192;const failures=[],unchanged=[];
  for(const [key,config]of Object.entries(ObservatoryArt.manifest)){
    try{ObservatoryArt.render(c,key,.1);const first=c.toDataURL();for(const t of [0,.05,.25,.5,.75,.95,1])ObservatoryArt.render(c,key,t);ObservatoryArt.render(c,key,.7);if(first===c.toDataURL())unchanged.push(key);if(!config.caption||!config.variant)failures.push(key+' missing direction');}
    catch(e){failures.push(key+': '+e.message)}
  }
  return {count:Object.keys(ObservatoryArt.manifest).length,failures,unchanged};
 });
 expect(result.count).toBe(112);expect(result.failures).toEqual([]);expect(result.unchanged).toEqual([]);
});
test('visual sequence, annotations, expanded mode, and next demo work together',async({page})=>{
 await page.goto(url('uap_classified_tech_simulations.html'));
 await page.getByRole('button',{name:'Inspect 50 percent',exact:true}).click();
 await expect(page.locator('#progress')).toHaveText('50%');
 const before=await page.locator('#C').evaluate(c=>c.toDataURL());
 await page.getByRole('button',{name:'Annotations',exact:true}).click();
 expect(await page.locator('#C').evaluate(c=>c.toDataURL())).not.toBe(before);
 await page.getByRole('button',{name:'Expand',exact:true}).click();await expect(page.locator('body')).toHaveClass(/obs-immersive/);
 await page.keyboard.press('Escape');await expect(page.locator('body')).not.toHaveClass(/obs-immersive/);
 await page.getByRole('button',{name:'Next demo'}).click();await expect(page.locator('#C')).toHaveAttribute('data-scene-key','uap/gimbal');
 await expect(page).toHaveURL(/#gimbal$/);await page.reload();await expect(page.locator('#C')).toHaveAttribute('data-scene-key','uap/gimbal');
});
test('new scene controls and mobile catalogs fit every page at 320px',async({page})=>{
 await page.setViewportSize({width:320,height:760});
 for(const file of ['index.html','uap_classified_tech_simulations.html','exotic_propulsion_simulations.html','nuclear_test_simulations.html','exotic_propulsion_simulation.html','underground_nuclear_test.html','ufo-research.html']){
  const errors=[];const onerror=e=>errors.push(e.message);page.on('pageerror',onerror);await page.goto(url(file));
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),file).toBe(true);
  if(await page.locator('.obs-mobile-browse').count()){
   await page.locator('.obs-mobile-browse').click();await expect(page.locator('.obs-sidebar')).toBeVisible();
   const search=page.locator('.obs-sidebar input[type=search]');
   if(await search.count()){await search.fill('impossible-no-match');await page.locator('.obs-clear').click();await expect(search).toHaveValue('');}
  }
  expect(errors,file).toEqual([]);page.off('pageerror',onerror);
 }
});
test('parameter laboratory has real reset controls and no orphaned text',async({page})=>{
 await page.goto(url('exotic_propulsion_simulation.html'));await page.locator('.sim-panel.active .play-btn').click();
 await expect(page.locator('.sim-panel.active .obs-lab-controls .reset-btn')).toBeVisible();
 expect(await page.locator('.sim-panel.active .obs-lab-controls').innerText()).not.toContain('null');
 await page.locator('.sim-panel.active .reset-btn').click();await expect(page.locator('.sim-panel.active .play-btn')).toHaveAttribute('aria-pressed','false');
});
