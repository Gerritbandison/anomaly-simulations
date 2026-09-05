import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const css=readFileSync(resolve(root,'design/observatory.css'),'utf8');
const art=readFileSync(resolve(root,'design/scene-renderer.js'),'utf8');
const shell=readFileSync(resolve(root,'design/observatory.js'),'utf8');
const pages=['exotic_propulsion_simulation.html','exotic_propulsion_simulations.html','nuclear_test_simulations.html','underground_nuclear_test.html','uap_classified_tech_simulations.html','ufo-research.html','index.html'];
let stale=false;
for(const name of pages){
  const file=resolve(root,name),current=readFileSync(file,'utf8');
  let next=current.replace(/\n?<!-- OBSERVATORY DESIGN START -->[\s\S]*?<!-- OBSERVATORY DESIGN END -->\n?/g,'\n');
  next=next.replace(/<style>[\s\S]*?<\/style>/g,'<style>\n'+css+'\n</style>');
  const injection='<!-- OBSERVATORY DESIGN START -->\n<script>\n'+art+'\n</script>\n<script>\n'+shell+'\n</script>\n<!-- OBSERVATORY DESIGN END -->';
  next=next.replace(/\s*<\/body>/,'\n'+injection+'\n</body>');
  if(next!==current){stale=true;if(!process.argv.includes('--check'))writeFileSync(file,next);}
}
if(process.argv.includes('--check')&&stale){console.error('Embedded design is stale. Run npm run build:design.');process.exit(1);}
console.log(process.argv.includes('--check')?'Embedded design matches canonical sources.':'Built seven standalone observatory pages.');
