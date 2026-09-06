import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
const source = () => readFileSync(resolve('design/experiments.js'), 'utf8');
function engine() { const sandbox = {window:{}}; vm.runInNewContext(source(), sandbox); return sandbox.window.MuseumExperiments; }
const value = (result, label) => result.outputs.find(output => output.label === label)?.value;

test('physical reference values use correct dimensions and units', () => {
  const {calculate} = engine();
  expect(value(calculate('momentum',{massFlow:2,exhaustVelocity:3000}), 'Thrust')).toBe(6000);
  expect(value(calculate('momentum',{massFlow:2,exhaustVelocity:3000}), 'Exhaust kinetic power')).toBe(9000000);
  expect(value(calculate('inverseSquare',{distance:10,referenceDistance:5}), 'Relative intensity')).toBe(.25);
  expect(value(calculate('parallax',{cameraSpeed:100,duration:1,range:100}), 'Angular shift')).toBeCloseTo(45,10);
  expect(value(calculate('diffraction',{wavelength:500,diameter:100}), 'Angular resolution')).toBeCloseTo(1.2582153181,8);
  expect(value(calculate('wave',{frequency:100}), 'Wavelength')).toBeCloseTo(2.99792458,10);
  expect(value(calculate('wave',{frequency:100}), 'Period')).toBeCloseTo(10,10);
  expect(value(calculate('doppler',{sourceFrequency:1000,sourceVelocity:0}), 'Observed frequency')).toBe(1000);
  expect(value(calculate('doppler',{sourceFrequency:1000,sourceVelocity:34.3}), 'Observed frequency')).toBeCloseTo(1111.1111111,6);
  expect(value(calculate('oscillator',{mass:1,stiffness:100,amplitude:.1}), 'Natural frequency')).toBeCloseTo(1.5915494309,9);
  const orbit = calculate('orbit',{altitude:400});
  expect(value(orbit,'Orbital period')).toBeCloseTo(92.4142523292,6);
  expect(value(orbit,'Orbital speed')).toBeCloseTo(7.6725985871,6);
});

test('Snell refraction, boundary and total internal reflection are distinct', () => {
  const {calculate} = engine();
  const normal=calculate('snell',{n1:1,n2:1.5,angle:30});
  expect(normal.totalInternalReflection).toBe(false);
  expect(normal.refractedAngle).toBeCloseTo(19.47122063,7);
  expect(calculate('snell',{n1:1.5,n2:1,angle:50}).refractedAngle).toBeNull();
  expect(calculate('snell',{n1:1.5,n2:1,angle:50}).totalInternalReflection).toBe(true);
  const critical = Math.asin(1/1.5)*180/Math.PI;
  const edge=calculate('snell',{n1:1.5,n2:1,angle:critical});
  expect(edge.totalInternalReflection).toBe(false); expect(edge.refractedAngle).toBeCloseTo(90,8);
  expect(calculate('snell',{n1:1.5,n2:1.5,angle:60}).refractedAngle).toBeCloseTo(60,10);
});

test('sampling folds into Nyquist interval and preserves all sample values', () => {
  const {calculate} = engine();
  for (const [signalFrequency,sampleRate,expected] of [[7,10,3],[13,10,3],[20,10,0],[5,10,5],[0,10,0],[30,7,2]]) {
    const result = calculate('sampling',{signalFrequency,sampleRate,phase:37});
    expect(value(result,'Apparent alias frequency')).toBeCloseTo(expected,10);
    for(const point of result.samples) expect(point.value).toBeCloseTo(Math.sin(2*Math.PI*result.signedAlias*point.time+37*Math.PI/180),9);
    expect(result.aliasFrequency).toBeLessThanOrEqual(sampleRate/2);
  }
});

test('every model validates inputs, applies defaults and stays finite at domain edges', () => {
  const {models,calculate} = engine();
  expect(Object.keys(models).sort()).toEqual(['momentum','inverseSquare','parallax','diffraction','orbit','sampling','doppler','wave','snell','oscillator'].sort());
  expect(()=>calculate('missing',{})).toThrow(/Unknown experiment/);
  for(const [id,model] of Object.entries(models)) {
    expect(model.question.length).toBeGreaterThan(10); expect(model.assumptions.length).toBeGreaterThan(0);
    expect(model.steps.map(step=>step.progress)).toEqual([0,.5,1]);
    expect(model.steps.every(step=>step.title&&step.body)).toBe(true);
    expect(model.takeaway.length).toBeGreaterThan(20);
    for(const source of model.sources) {expect(source.url).toMatch(/^https:\/\//);expect(source.supports.length).toBeGreaterThan(10);}
    expect(calculate(id).outputs.length).toBeGreaterThan(0);
    expect(()=>calculate(id,{unexpected:1})).toThrow(/Unknown parameter/);
    const p=model.parameters[0];
    for(const invalid of [NaN,Infinity,-Infinity,null,'',false,'12']) expect(()=>calculate(id,{[p.key]:invalid})).toThrow(/finite number/);
    expect(()=>calculate(id,{[p.key]:p.min-1})).toThrow(/between/);
    expect(()=>model.calculate({[p.key]:Infinity})).toThrow(/finite number/);
    for(const boundary of ['min','max']) {
      const result = calculate(id,Object.fromEntries(model.parameters.map(p=>[p.key,p[boundary]])));
      expect(result.outputs.every(output=>typeof output.value==='number'&&Number.isFinite(output.value))).toBe(true);
    }
  }
});

test('models follow expected physical trends without fictitious propulsion effects', () => {
  const {calculate} = engine();
  expect(value(calculate('inverseSquare',{distance:20,referenceDistance:5}),'Relative intensity')).toBe(value(calculate('inverseSquare',{distance:10,referenceDistance:5}),'Relative intensity')/4);
  expect(value(calculate('diffraction',{diameter:200}),'Angular resolution')).toBe(value(calculate('diffraction',{diameter:100}),'Angular resolution')/2);
  expect(value(calculate('orbit',{altitude:2000}),'Orbital period')).toBeGreaterThan(value(calculate('orbit',{altitude:400}),'Orbital period'));
  expect(value(calculate('orbit',{altitude:2000}),'Orbital speed')).toBeLessThan(value(calculate('orbit',{altitude:400}),'Orbital speed'));
  expect(value(calculate('parallax',{range:2000}),'Angular shift')).toBeLessThan(value(calculate('parallax',{range:1000}),'Angular shift'));
  expect(value(calculate('oscillator',{mass:4}),'Natural frequency')).toBe(value(calculate('oscillator',{mass:1}),'Natural frequency')/2);
  expect(value(calculate('doppler',{sourceVelocity:-50}),'Observed frequency')).toBeLessThan(value(calculate('doppler',{sourceVelocity:0}),'Observed frequency'));
  expect(value(calculate('momentum',{massFlow:0}),'Thrust')).toBe(0);
});

test('all experiment diagrams draw, change with inputs, stay deterministic and restore canvas state', async ({page}) => {
  await page.setContent('<canvas width="800" height="420"></canvas>');
  await page.addScriptTag({content:source()});
  const result = await page.evaluate(() => {
    const canvas=document.querySelector('canvas'),ctx=canvas.getContext('2d');const issues=[];const checks=[];
    ctx.translate(7,9);ctx.globalAlpha=.7;
    for(const [id,model] of Object.entries(MuseumExperiments.models)) {
      try{
        const defaults=Object.fromEntries(model.parameters.map(p=>[p.key,p.value]));
        MuseumExperiments.render(canvas,id,defaults,{label:'A',color:'#7eddd3'});const first=canvas.toDataURL();
        MuseumExperiments.render(canvas,id,defaults,{label:'A',color:'#7eddd3'});checks.push(first===canvas.toDataURL());
        const extremes=Object.fromEntries(model.parameters.map(p=>[p.key,p.max]));
        MuseumExperiments.render(canvas,id,extremes);checks.push(first!==canvas.toDataURL());
        MuseumExperiments.render(canvas,id,Object.fromEntries(model.parameters.map(p=>[p.key,p.min])));
        if(ctx.getTransform().e!==7||ctx.getTransform().f!==9||ctx.globalAlpha!==.7)issues.push(id+' leaked context');
      }catch(error){issues.push(id+': '+error.message)}
    }
    MuseumExperiments.render(canvas,'snell',{n1:1.5,n2:1,angle:60});
    return {issues,checks};
  });
  expect(result.issues).toEqual([]);expect(result.checks.every(Boolean)).toBe(true);
});
