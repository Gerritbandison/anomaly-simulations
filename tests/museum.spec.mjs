import{test,expect}from'@playwright/test';
import{resolve}from'node:path';import{pathToFileURL}from'node:url';
const url=file=>pathToFileURL(resolve(file)).href;

test('all original exhibits have specific learning sequences, evidence boundaries and primary references',async({page})=>{
 await page.goto(url('index.html'));
 const report=await page.evaluate(()=>{
 const expected=Object.keys(ObservatoryArt.manifest),data=Museum.exhibits,errors=[];
 for(const key of expected){const e=data[key];if(!e){errors.push(key+' missing');continue;}
 if(!Museum.labels[e.status]||!e.statusReason||!e.question||!e.takeaway)errors.push(key+' missing explanation');
 if(e.steps.length!==3||e.steps.some(s=>!s.title||!s.body||s.progress<0||s.progress>1))errors.push(key+' invalid steps');
 if(e.assumptions.length<2||!e.sources.length||e.sources.some(s=>!/^https?:\/\//.test(s.url)||!s.supports||!s.title))errors.push(key+' missing scope/sources');
 if(e.experiment&&!MuseumExperiments.models[e.experiment])errors.push(key+' missing model');}
 return{count:expected.length,errors,extras:Object.keys(data).filter(k=>!expected.includes(k)),questions:new Set(Object.values(data).map(e=>e.question)).size};
 });
 expect(report.errors).toEqual([]);expect(report.extras).toEqual([]);expect(report.count).toBe(33);expect(report.questions).toBe(33);
});
test('home evidence filtering, search, clearing, load more and exhibit links',async({page})=>{
 await page.goto(url('index.html'));await expect(page.locator('.museum-directory-card')).toHaveCount(12);
 await page.getByRole('button',{name:'Show more exhibits'}).click();await expect(page.locator('.museum-directory-card')).toHaveCount(24);
 await page.locator('#museum-directory-evidence').selectOption('theoretical');
 const statuses=await page.locator('.museum-directory-card .museum-badge').evaluateAll(els=>els.map(e=>e.dataset.status));expect(statuses.length).toBeGreaterThan(0);expect(statuses.every(s=>s==='theoretical')).toBe(true);
 await page.locator('#museum-directory-search').fill('not-a-real-exhibit');await expect(page.locator('.museum-directory-status')).toContainText('No matching');
 await page.locator('.museum-directory-tools').getByRole('button',{name:'Clear search'}).click();await expect(page.locator('#museum-directory-search')).toHaveValue('');
 await page.locator('.museum-directory-card').first().click();await expect(page.locator('.museum-lesson')).toBeVisible();
});
test('learning steps seek illustration and catalog filters intersect with search',async({page})=>{
 await page.goto(url('uap_classified_tech_simulations.html'));
 await expect(page.locator('.museum-lesson')).toHaveAttribute('data-exhibit','uap/nimitz');
 await expect(page.locator('#results')).toContainText('9 exhibits shown');
 const body=await page.locator('.museum-step-explanation').innerText();await page.locator('.museum-steps button').nth(1).click();
 await expect(page.locator('#progress')).toHaveText('50%');expect(await page.locator('.museum-step-explanation').innerText()).not.toBe(body);
 await page.locator('#museum-evidence-filter').selectOption('demonstrated');
 const ids=await page.locator('.obs-sidebar button[data-id]:visible').evaluateAll(buttons=>buttons.map(b=>b.dataset.evidence));expect(ids.length).toBeGreaterThan(0);expect(ids.every(s=>s==='demonstrated')).toBe(true);
 await page.locator('#search').fill('gimbal');await expect(page.locator('.obs-sidebar button[data-id]:visible')).toHaveCount(0);
 await page.locator('#museum-evidence-filter').selectOption('all');await expect(page.locator('.obs-sidebar button[data-id]:visible')).toHaveCount(1);
});
test('lab replaces toy controls with real model, independent scenarios and copy/reset',async({page})=>{
 await page.goto(url('exotic_propulsion_simulation.html'));
 const panel=page.locator('.sim-panel.active');await expect(panel.locator('.obs-lab-layout')).toBeHidden();await expect(panel.locator('.museum-experiment')).toBeVisible();
 const a=panel.locator('.museum-case[data-case=A]'),b=panel.locator('.museum-case[data-case=B]');await expect(b).toBeHidden();
 await panel.getByRole('button',{name:'Compare A / B'}).click();await expect(b).toBeVisible();
 const original=await a.getAttribute('data-result'),input=b.locator('input').first();const min=await input.getAttribute('min'),max=await input.getAttribute('max'),value=await input.inputValue();await input.fill(value===max?min:max);
 expect(await a.getAttribute('data-result')).toBe(original);expect(await b.getAttribute('data-result')).not.toBe(original);
 await panel.getByRole('button',{name:'Copy A to B'}).click();expect(await b.getAttribute('data-result')).toBe(original);
 await panel.getByRole('button',{name:'Reset experiment'}).click();expect(await a.getAttribute('data-result')).toBe(original);
 await expect(panel.locator('.museum-equation')).not.toBeEmpty();
});
test('evidence comparison and offline narrow screens preserve all learning controls',async({page,context})=>{
 await context.setOffline(true);await page.setViewportSize({width:320,height:840});
 for(const file of ['index.html','uap_classified_tech_simulations.html','exotic_propulsion_simulations.html','exotic_propulsion_simulation.html','nuclear_test_simulations.html','underground_nuclear_test.html','ufo-research.html']){
 const errors=[];const handler=e=>errors.push(e.message);page.on('pageerror',handler);await page.goto(url(file));expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),file).toBe(true);expect(errors,file).toEqual([]);page.off('pageerror',handler);
 }
 await page.goto(url('uap_classified_tech_simulations.html'));await page.locator('.museum-evidence-compare summary').click();await expect(page.locator('.museum-evidence-grid article')).toHaveCount(2);
});

test('visiting every lab tab preserves unique IDs, correct labels and malformed-link recovery',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(url('exotic_propulsion_simulation.html')+'#%');
 for(let i=0;i<10;i++)await page.getByRole('tab').nth(i).click();
 const problems=await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(n=>n.id);return{duplicates:ids.filter((id,i)=>ids.indexOf(id)!==i),badLabels:[...document.querySelectorAll('.museum-lesson label')].filter(label=>!label.control||label.control.id!==label.htmlFor).length};});
 expect(problems).toEqual({duplicates:[],badLabels:0});expect(errors).toEqual([]);
});

test('retired exhibit links explain the curation and keep the replacement usable',async({page})=>{
 await page.goto(url('uap_classified_tech_simulations.html')+'#montauk');await expect(page.locator('.museum-curation-note')).toContainText('retired');await expect(page.locator('.museum-lesson')).toHaveAttribute('data-exhibit','uap/nimitz');
});
