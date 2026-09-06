(() => {
  'use strict';
  const groups={uap:['nimitz','gimbal','gofast','sr71','f117','b2','rcs','argus','gps3'],propulsion:['nerva','ion','hall','vasimr','solar','alcubierre','kilopower','rtg'],nuclear:['trinity','castlebravo','underwater','nevada','fallout'],earth:['sequence']};
  const art=window.ObservatoryArt,models=window.MuseumExperiments.models;
  const oldKeys=Object.keys(art.manifest);let requested='';try{requested=decodeURIComponent(location.hash.slice(1))}catch{};let retiredRequested=false;
  const retained=new Set(Object.entries(groups).flatMap(([g,ids])=>ids.map(id=>g+'/'+id)));
  const labMap={};
  if(typeof METHODS!=='undefined')METHODS.forEach((method,index)=>{const id=Object.keys(models)[index];labMap[method.id]=id;method.id=id;method.name=models[id].title;method.short=models[id].title;method.simulate=()=>({metrics:[],draw(){}});const state=panels[index];state.tab.id='tab-'+id;state.tab.textContent=models[id].title;state.tab.setAttribute('aria-controls','panel-'+id);state.panel.id='panel-'+id;state.panel.setAttribute('aria-labelledby',state.tab.id);});
  Object.entries(models).forEach(([id,model])=>{
    art.manifest['lab/'+id]={group:'lab',type:'experiment',id,title:model.title,variant:id,setting:'classroom',caption:model.question};retained.add('lab/'+id);
    window.MuseumScienceExhibits['lab/'+id]={title:model.title,status:'demonstrated',statusReason:'An established physical principle explored through an idealized model, within the assumptions stated below.',question:model.question,takeaway:model.takeaway,steps:model.steps,assumptions:model.assumptions,sources:model.sources,experiment:id};
  });
  oldKeys.forEach(key=>{if(!retained.has(key))delete art.manifest[key];});
  const originalRender=art.render;
  art.render=(canvas,key,t,options={})=>{
    if(key.startsWith('lab/')&&models[key.slice(4)]){const result=window.MuseumExperiments.render(canvas,key.slice(4),{},options);canvas.dataset.sceneKey=key;canvas.dataset.sceneDesign='experiment';return result;}
    return originalRender(canvas,key,t,options);
  };
  const filename=location.pathname.split('/').pop();const group=filename==='nuclear_test_simulations.html'?'nuclear':filename==='uap_classified_tech_simulations.html'?'uap':filename==='exotic_propulsion_simulations.html'?'propulsion':null;
  if(group){retiredRequested=Boolean(requested&&!groups[group].includes(requested));const list=group==='nuclear'?sims:S;const ids=groups[group];list.splice(0,list.length,...list.filter(item=>ids.includes(item.id)));document.querySelectorAll('button[data-id]').forEach(b=>{if(!ids.includes(b.dataset.id))b.remove();});document.querySelectorAll('#catalog>section,.sim-category').forEach(section=>{if(!section.querySelector('button[data-id]'))section.remove();});}
  if(typeof METHODS!=='undefined'){let oldHash='';try{oldHash=decodeURIComponent(location.hash.slice(1))}catch{};if(labMap[oldHash]){retiredRequested=true;try{history.replaceState(null,'','#'+labMap[oldHash])}catch{}}}
  window.MuseumCuration={groups,retiredRequested,retained:[...retained],retiredCount:oldKeys.filter(key=>!retained.has(key)).length};
})();
