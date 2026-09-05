(() => {
  'use strict';
  const art=window.ObservatoryArt;
  if(matchMedia('(max-width: 760px)').matches)art.setAnnotations(false);
  const page=location.pathname.split('/').pop()||'index.html';
  const pages={
    'uap_classified_tech_simulations.html':{group:'uap',title:'Encounters & advanced technology',short:'Encounters',intro:'Reported encounters, aircraft silhouettes and emerging technologies.',first:'nimitz'},
    'exotic_propulsion_simulations.html':{group:'propulsion',title:'The propulsion collection',short:'Propulsion',intro:'From electric engines to speculative journeys between stars.',first:'nerva'},
    'nuclear_test_simulations.html':{group:'nuclear',title:'Nuclear history & phenomena',short:'Nuclear history',intro:'Historical events and physical phenomena, illustrated with context.',first:'trinity'},
    'exotic_propulsion_simulation.html':{group:'lab',title:'The concept laboratory',short:'Concept laboratory',intro:'Change a parameter. Explore the illustration. Question the assumptions.',first:'pais-ief'},
    'underground_nuclear_test.html':{group:'earth',title:'Below the surface',short:'Earth section',intro:'An illustrated journey through six subsurface phases.',first:'sequence'},
    'ufo-research.html':{group:'archive',title:'The research archive',short:'Research archive',intro:'Documents, testimony and competing interpretations.'}
  };
  const el=(tag,cls,text)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;};
  const button=(text,fn,cls)=>{const b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;};
  const get=id=>document.getElementById(id);
  const mark=`<svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><ellipse cx="20" cy="20" rx="18" ry="8" transform="rotate(-35 20 20)" stroke="currentColor"/><circle cx="20" cy="20" r="11" stroke="currentColor"/><circle cx="20" cy="20" r="3" fill="currentColor"/><circle cx="33" cy="10" r="2" fill="currentColor"/></svg>`;
  function topbar(){
    const header=el('div','obs-topbar'),brand=el('a','obs-brand');brand.href='index.html';brand.innerHTML=mark;brand.append(document.createTextNode('Anomaly Observatory'));
    const nav=el('div','obs-toplinks');for(const [name,href] of [['Collections','index.html#collections'],['Archive','ufo-research.html']]){const link=el('a','',name);link.href=href;nav.append(link);}
    nav.append(el('span','obs-topnote','An illustrated collection'));header.append(brand,nav);return header;
  }
  function thumbnail(key,progress=.55,width=210){const canvas=document.createElement('canvas');canvas.width=width;canvas.height=Math.round(width*.6);art.render(canvas,key,progress,{thumbnail:true});const img=document.createElement('img');img.src=canvas.toDataURL('image/png');img.alt='';img.width=width;img.height=canvas.height;img.loading='lazy';return img;}
  function footer(){const f=el('footer','obs-footer');f.append(el('span','','Illustrations, not validated physical models.'));const link=el('a','','Explore the collections ↗');link.href='index.html';f.append(link);return f;}
  function shell(sidebar=null){
    const skip=el('a','obs-skip','Skip to demonstration');skip.href='#obs-main';
    const main=el('main','obs-main');main.id='obs-main';main.tabIndex=-1;
    const outer=el('div','obs-shell');if(sidebar)outer.append(sidebar);outer.append(main);
    const header=topbar();document.body.replaceChildren(skip,header,outer);return {main,outer,header};
  }
  function heading(config,title,subtitle){const h=el('div','obs-heading'),left=el('div');left.append(el('span','obs-kicker',config.title));left.append(title||el('h1','',config.short));if(subtitle)left.append(subtitle);h.append(left);return h;}
  function stage(canvas,redraw){
    const container=el('div','obs-stage'),head=el('div','obs-stage-top'),badge=el('span','obs-scene-badge','Illustrated observation'),actions=el('div','obs-stage-actions');
    const annotate=button('Annotations',()=>{art.setAnnotations(!art.annotations);document.querySelectorAll('.obs-annotate').forEach(b=>b.setAttribute('aria-pressed',String(art.annotations)));redraw()},'obs-annotate');annotate.setAttribute('aria-pressed',String(art.annotations));
    const expand=button('Expand',()=>{const expanded=document.body.classList.toggle('obs-immersive');expand.textContent=expanded?'Exit expanded':'Expand';expand.setAttribute('aria-pressed',String(expanded))},'obs-expand');expand.setAttribute('aria-pressed','false');
    actions.append(annotate,expand);head.append(badge,actions);container.append(head,canvas);canvas.width=1000;canvas.height=600;
    return container;
  }
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.body.classList.contains('obs-immersive')){document.body.classList.remove('obs-immersive');document.querySelectorAll('.obs-expand').forEach(b=>{b.textContent='Expand';b.setAttribute('aria-pressed','false')});}});
  function setHash(id){try{history.replaceState(null,'','#'+encodeURIComponent(id))}catch{/* Local browser history may disallow replacement. */}}
  function getHash(){try{return decodeURIComponent(location.hash.slice(1))}catch{return ''}}
  function searchClear(input){
    if(!input||input.closest('.obs-search'))return;
    const wrap=el('div','obs-search');input.before(wrap);wrap.append(input);
    const clear=button('×',()=>{input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));input.focus()},'obs-clear');clear.setAttribute('aria-label','Clear search');wrap.append(clear);
    const update=()=>clear.hidden=!input.value;input.addEventListener('input',update);update();
  }
  function sidebarSetup(sidebar,config,items){
    sidebar.classList.add('obs-sidebar');sidebar.querySelector(':scope > h2')?.remove();
    const head=el('div','obs-sidebar-head');head.append(el('span','','Browse demonstrations'),el('strong','',String(items.length).padStart(2,'0')));sidebar.prepend(head);
    const input=sidebar.querySelector('input[type=search]');searchClear(input);
    items.forEach(item=>{const b=sidebar.querySelector(`[data-id="${item.id}"]`)||get('tab-'+item.id);if(!b)return;const text=el('span','obs-nav-title');while(b.firstChild)text.append(b.firstChild);const img=thumbnail(config.group+'/'+item.id,.55,120);img.className='obs-thumb';b.append(img,text);});
    const mobile=button('Browse '+config.short.toLowerCase()+'  +',()=>{const open=sidebar.classList.toggle('obs-browse-open');mobile.setAttribute('aria-expanded',String(open));mobile.textContent=(open?'Close':'Browse')+' '+config.short.toLowerCase()+(open?'  −':'  +')},'obs-mobile-browse');mobile.setAttribute('aria-expanded','false');if(!sidebar.id)sidebar.id='obs-catalog';mobile.setAttribute('aria-controls',sidebar.id);
    return mobile;
  }
  function sequence(config,seek,redraw){
    const box=el('section','obs-sequence'),head=el('div','obs-sequence-header');head.append(el('h2','','Inspect the sequence'),el('span','','Choose a frame to explore'));const frames=el('div','obs-frames');head.id='obs-sequence-title';frames.setAttribute('aria-labelledby',head.id);box.append(head,frames);
    return {box,update(id){frames.replaceChildren();[0,.25,.5,.75,1].forEach((p,index)=>{const b=button('',()=>{seek(p);frames.querySelectorAll('button').forEach(btn=>btn.setAttribute('aria-pressed',String(btn===b)));redraw()},'obs-frame');b.setAttribute('aria-label',`Inspect ${Math.round(p*100)} percent`);b.setAttribute('aria-pressed','false');b.append(thumbnail(config.group+'/'+id,p,230),el('span','',`${String(index+1).padStart(2,'0')} / ${Math.round(p*100)}%`));frames.append(b);});}};
  }
  function mountLibrary(config){
    const nuclear=config.group==='nuclear',uap=config.group==='uap',list=nuclear?sims:S;
    const sidebar=get(nuclear?'sidebar':'sb'),canvas=get('C'),title=get(nuclear?'simTitle':'sT'),sub=get(nuclear?'simSub':'sS');
    const canvasDescription=get('canvasDesc');
    const transportSource=(get(nuclear?'playBtn':'pB')).parentElement;
    const progress=get('seek').parentElement,info=get(nuclear?'infoPanel':'iP'),desc=get(nuclear?'descBox':'dB');
    const evidence=uap?get('evidenceLabel').parentElement:get('evidence'),legacy=get('legacy'),status=get(uap?'playState':'playbackStatus'),help=document.querySelector('.help');
    const redraw=()=>nuclear?drawFrame():dr();
    list.forEach(scene=>{const render=value=>art.render(canvas,config.group+'/'+scene.id,value);if(uap)scene.d=render;else scene.draw=render;});
    const mobile=sidebarSetup(sidebar,config,list),ui=shell(sidebar);ui.header.after(mobile);
    const h=heading(config,title,sub),nav=el('div','obs-adjacent');
    let selected=config.first;
    const load=id=>nuclear?loadSim(id):ld(id);
    nav.append(button('←',()=>load(list[(list.findIndex(s=>s.id===selected)+list.length-1)%list.length].id)),button('→',()=>load(list[(list.findIndex(s=>s.id===selected)+1)%list.length].id)));
    nav.children[0].setAttribute('aria-label','Previous demo');nav.children[1].setAttribute('aria-label','Next demo');h.append(nav);
    const visual=stage(canvas,redraw),transport=el('div','obs-transport');transport.append(transportSource);if(!transportSource.contains(progress))transport.append(progress);if(status&&!transport.contains(status))transport.append(status);visual.append(transport);if(canvasDescription){canvasDescription.classList.add('sr-only');visual.append(canvasDescription);}
    const seq=sequence(config,p=>{if(nuclear)seekSim(p*100);else {const input=get('seek');input.value=p*1000;input.dispatchEvent(new Event('input',{bubbles:true}));}},redraw);
    const context=el('section','obs-context'),left=el('div'),right=el('div');
    left.append(el('h2','','About this illustration'));
    if(evidence)left.append(evidence);
    if(uap){right.append(legacy);if(help)left.append(help);}else{left.append(desc);right.append(el('h2','','Reference notes'),el('p','help','Original figures and narrative. These are not calculated by the artwork.'),info);}
    context.append(left,right);ui.main.append(h,visual,seq.box,context,footer());
    const oldLoad=nuclear?loadSim:ld;
    const wrapped=id=>{if(!list.some(s=>s.id===id))return;oldLoad(id);selected=id;sub.textContent=art.manifest[config.group+'/'+id].caption;if(canvasDescription)canvasDescription.textContent=art.manifest[config.group+'/'+id].caption+'. Original reports and figures require independent verification; this is artistic illustration.';seq.update(id);setHash(id);document.title=(list.find(s=>s.id===id).name||list.find(s=>s.id===id).nm)+' · Anomaly Observatory';};
    if(nuclear)loadSim=wrapped;else ld=wrapped;
    if(nuclear){
      const searchBox=el('div','obs-new-search'),label=el('label','','Find a historical illustration'),input=el('input');input.type='search';input.id='search';input.placeholder='Search the collection';label.htmlFor='search';searchBox.append(label,input);const count=el('p','obs-search-count');count.id='searchStatus';count.setAttribute('role','status');sidebar.querySelector('.obs-sidebar-head').after(searchBox,count);searchClear(input);
      input.addEventListener('input',()=>{const q=input.value.trim().toLowerCase();let visible=0;list.forEach(s=>{const b=sidebar.querySelector(`[data-id="${s.id}"]`);b.hidden=![s.name,s.cat].join(' ').toLowerCase().includes(q);if(!b.hidden)visible++;});count.textContent=visible?`${visible} illustrations`:'No matches. Clear search to see all illustrations.';});
    }
    const initial=getHash();load(list.some(s=>s.id===initial)?initial:config.first);
    window.addEventListener('hashchange',()=>{const id=getHash();if(id!==selected&&list.some(s=>s.id===id))load(id);});
  }
  function mountLab(config){
    document.body.classList.add('obs-lab');
    const sidebar=get('navBar');
    METHODS.forEach(method=>{const old=method.simulate;method.simulate=(params,canvas)=>{const result=old(params,canvas);let time=0;result.draw=(frameScale=0)=>{time+=frameScale/60;art.render(canvas,'lab/'+method.id,(time/12)%1,{params});};return result;};});
    const panelNodes=panels.map(p=>p.panel),mobile=sidebarSetup(sidebar,config,METHODS),ui=shell(sidebar);ui.header.after(mobile);
    const h=heading(config,el('h1','','Explore the improbable.'),el('p','obs-subtitle',config.intro));ui.main.append(h);
    const redraw=()=>{if(currentResult)currentResult.draw(0)};
    panelNodes.forEach((panel,index)=>{
      const reset=panel.querySelector('.reset-btn');
      const banner=panel.querySelector('.info-banner'),equations=panel.querySelector(':scope > details'),parameters=panel.querySelector('.controls'),playback=panel.querySelector('.playback'),canvas=panel.querySelector('canvas'),grid=panel.querySelector('.sim-grid'),output=grid.lastElementChild;
      const layout=el('div','obs-lab-layout'),visual=stage(canvas,redraw),transport=el('div','obs-transport');transport.append(playback);visual.append(transport);
      const controls=el('aside','obs-lab-controls');controls.append(el('h3','','Adjust the concept'),parameters,reset);
      layout.append(visual,controls);output.className='obs-output';
      panel.replaceChildren(layout,output,banner,equations);ui.main.append(panel);
    });
    ui.main.append(footer());
    const original=selectMethod;selectMethod=index=>{if(index<0||index>=METHODS.length)return;original(index);h.querySelector('h1').textContent=METHODS[index].short;setHash(METHODS[index].id);document.title=METHODS[index].short+' · Concept laboratory';};
    const id=getHash(),index=METHODS.findIndex(m=>m.id===id);selectMethod(index>=0?index:0);
    window.addEventListener('hashchange',()=>{const i=METHODS.findIndex(m=>m.id===getHash());if(i>=0&&i!==activeIndex)selectMethod(i);});
  }
  function mountEarth(config){
    document.body.classList.add('obs-earth');
    const canvas=get('canvas'),timeline=get('timeline'),phase=document.querySelector('.phase-indicator'),controls=document.querySelector('.controls'),seekControls=document.querySelector('.seek-controls'),status=get('playbackStatus'),legend=document.querySelector('.legend');
    const ui=shell(),h=heading(config,el('h1','','A world beneath the surface.'),el('p','obs-subtitle',config.intro));
    drawFrame=function(){art.render(canvas,'earth/sequence',(currentPhase+animProgress)/6);updatePlaybackUI();};
    const visual=stage(canvas,drawFrame),transport=el('div','obs-transport');transport.append(controls,seekControls,status);visual.append(transport);
    const note=el('p','obs-subtitle','Schematic geology and an illustrative sequence. No dimensions, timings or outcomes are predicted by this artwork.');
    ui.main.append(h,visual,timeline,phase,note,legend,footer());document.title='Below the surface · Anomaly Observatory';drawFrame();
  }
  function mountArchive(){
    document.body.classList.add('obs-archive');
    const header=document.querySelector('header'),heading=header.querySelector('h1'),intro=header.querySelector('.subtitle'),stats=header.querySelector('.stat-bar'),left=el('div');
    left.append(el('span','obs-kicker','Field notes / documents / ideas'),heading,intro,stats);heading.textContent='A record of the unexplained.';
    const visual=el('div','obs-archive-art');const image=thumbnail('uap/rendlesham',.5,1000);image.alt='Illustrated lights above a forest, an artistic interpretation';visual.append(image);header.replaceChildren(left,visual);document.body.prepend(topbar());
    document.title='Research archive · Anomaly Observatory';
  }
  function home(){
    document.body.classList.add('obs-home');const hero=el('section','obs-hero'),left=el('div'),right=el('div','obs-hero-image');left.append(el('span','obs-kicker','An illustrated observatory'),el('h1','','Stay curious. Look closer.'),el('p','','Explore extraordinary reports, ambitious machines and the ideas that stretch our understanding. A collection of interactive illustrations, built for the curious.'));
    const link=el('a','obs-cta','Explore the collections  ↗');link.href='#collections';left.append(link);right.append(thumbnail('uap/nimitz',.62,1200));hero.append(left,right);
    const section=el('section','obs-collections');section.id='collections';const head=el('div','obs-collection-heading');head.append(el('h2','','Choose a field of inquiry'),el('span','','Six collections · one observatory'));section.append(head);const grid=el('div','obs-collection-grid');
    const coverKeys={uap:'uap/sr71',propulsion:'propulsion/hall',nuclear:'nuclear/ivymike',lab:'lab/alcubierre',earth:'earth/sequence',archive:'uap/rendlesham'};
    const counts={uap:'55 illustrations',propulsion:'24 illustrations',nuclear:'22 illustrations',lab:'10 interactive concepts',earth:'6 phases',archive:'11 research sections'};
    Object.entries(pages).forEach(([file,cfg])=>{const card=el('a','obs-collection-card');card.href=file;const image=thumbnail(coverKeys[cfg.group],.55,560);const copy=el('div','obs-collection-copy');copy.append(el('span','obs-kicker',counts[cfg.group]),el('h3','',cfg.short+' ↗'),el('p','',cfg.intro));card.append(image,copy);grid.append(card)});
    section.append(grid);const f=el('footer','','Anomaly Observatory / Artistic illustrations and archived research. Speculative concepts are not demonstrated technologies.');document.body.replaceChildren(topbar(),hero,section,f);document.title='Anomaly Observatory · Look closer';
  }
  const config=pages[page];if(!config){home();return;}document.body.dataset.collection=config.group;
  if(config.group==='archive')mountArchive();else if(config.group==='lab')mountLab(config);else if(config.group==='earth')mountEarth(config);else mountLibrary(config);
})();
