(() => {
  'use strict';
  const exhibits={...window.MuseumUapExhibits,...window.MuseumScienceExhibits};
  const experiments=window.MuseumExperiments;
  const labels={demonstrated:'Demonstrated technology / principle',historical:'Documented history / program',theoretical:'Theoretical proposal',reported:'Reported encounter',unverified:'Unverified claim'};
  const pages={uap:'uap_classified_tech_simulations.html',propulsion:'exotic_propulsion_simulations.html',nuclear:'nuclear_test_simulations.html',lab:'exotic_propulsion_simulation.html',earth:'underground_nuclear_test.html'};
  const E=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const B=(text,fn,cls='')=>{const n=E('button',cls,text);n.type='button';n.addEventListener('click',fn);return n;};
  const format=(v,precision=3)=>Math.abs(v)>=1e6||(v!==0&&Math.abs(v)<.001)?v.toExponential(precision):Number(v.toFixed(precision)).toLocaleString('en-US');
  const badge=entry=>{const n=E('span','museum-badge',labels[entry.status]);n.dataset.status=entry.status;return n;};
  function sourceList(sources){const list=E('ul','museum-sources');sources.forEach(source=>{const li=E('li'),a=E('a','',source.title);a.href=source.url;a.target='_blank';a.rel='noopener noreferrer';li.append(a,E('p','',source.supports));list.append(li);});return list;}
  function evidenceSelector(label,id){const wrap=E('div','museum-filter'),l=E('label','',label),select=E('select');select.id=id;l.htmlFor=id;select.append(new Option('All evidence types','all'));Object.entries(labels).forEach(([key,name])=>select.append(new Option(name,key)));wrap.append(l,select);return {wrap,select};}
  function compareEvidence(entry,key){
    const details=E('details','museum-evidence-compare');details.append(E('summary','','Compare this exhibit with another'));
    const select=E('select'),label=E('label','','Compare evidence and assumptions');select.id='museum-compare-'+key.replace(/[^a-z0-9-]/gi,'-');label.htmlFor=select.id;
    Object.entries(exhibits).filter(([k])=>k!==key&&k.split('/')[0]===key.split('/')[0]).forEach(([k,e])=>select.append(new Option(e.title,k)));
    if(!select.options.length)return document.createDocumentFragment();
    const grid=E('div','museum-evidence-grid');
    function card(e){const node=E('article');node.append(badge(e),E('h3','',e.title),E('p','',e.statusReason),E('strong','','Learning question'),E('p','',e.question),E('strong','','Limit to remember'),E('p','',e.assumptions[0]));return node;}
    function update(){grid.replaceChildren(card(entry),card(exhibits[select.value]));}
    select.addEventListener('change',update);details.append(label,select,grid);update();return details;
  }
  function experimentPanel(id,key){
    const model=experiments.models[id];if(!model)throw new Error('Unknown exhibit experiment '+id+' for '+key);
    const root=E('section','museum-experiment');root.dataset.experiment=id;
    const heading=E('div','museum-experiment-heading');heading.append(E('span','obs-kicker','Test a physical principle'),E('h3','',model.title),E('p','',model.question));
    const warning=E('p','museum-scope',key.startsWith('lab/')?'This idealized experiment predicts only the quantities listed below, within its stated assumptions.':'This is a separate idealized experiment. It does not reproduce the event or establish that the named technology works.');
    const toolbar=E('div','museum-experiment-toolbar');
    const grid=E('div','museum-experiment-grid');
    const cases=[];
    function createCase(letter){
      const section=E('article','museum-case');section.dataset.case=letter;const title=E('h4','',`Scenario ${letter}`),canvas=E('canvas');canvas.width=720;canvas.height=420;canvas.setAttribute('role','img');canvas.setAttribute('aria-label',`${model.title}, scenario ${letter}`);
      const resultStatus=E('p','museum-model-status');resultStatus.setAttribute('role','status');
      const controls=E('div','museum-inputs'),outputs=E('dl','museum-outputs'),error=E('p','museum-input-error');error.setAttribute('role','alert');
      const values=Object.fromEntries(model.parameters.map(p=>[p.key,p.value]));const inputs=new Map(),readouts=new Map();
      model.parameters.forEach(parameter=>{
        const group=E('div','museum-input'),label=E('label','',parameter.label+(parameter.unit?' ('+parameter.unit+')':'')),input=E('input'),value=E('output');
        input.type='range';input.min=parameter.min;input.max=parameter.max;input.step=parameter.step;input.value=parameter.value;input.id=`museum-${key.replace(/[^a-z0-9-]/gi,'-')}-${letter.toLowerCase()}-${parameter.key}`;input.dataset.parameter=parameter.key;label.htmlFor=input.id;value.htmlFor=input.id;
        input.addEventListener('input',()=>{values[parameter.key]=Number(input.value);update();});inputs.set(parameter.key,input);readouts.set(parameter.key,value);group.append(label,input,value);controls.append(group);
      });
      function update(){
        try{
          const result=experiments.calculate(id,values);error.textContent='';resultStatus.textContent=result.status||(result.atOrAboveNyquist?'Signal is at or above the Nyquist frequency; the samples do not uniquely determine the source frequency.':'');
          model.parameters.forEach(p=>{readouts.get(p.key).textContent=format(values[p.key],4)+(p.unit?' '+p.unit:'');inputs.get(p.key).setAttribute('aria-valuetext',readouts.get(p.key).textContent);});
          outputs.replaceChildren();result.outputs.forEach(o=>{const pair=E('div');pair.append(E('dt','',o.label),E('dd','',format(o.value,o.precision??3)+(o.unit?' '+o.unit:'')));outputs.append(pair);});
          experiments.render(canvas,id,values,{label:`Scenario ${letter}`,color:letter==='A'?'#8ed9d0':'#f1b88c'});
          canvas.setAttribute('aria-label',`${model.title}, scenario ${letter}. ${result.outputs.map(o=>o.label+': '+format(o.value,o.precision??3)+' '+o.unit).join('. ')}`);
          section.dataset.result=JSON.stringify(result.outputs);
        }catch(e){error.textContent=e.message;}
      }
      function setValues(next){model.parameters.forEach(p=>{values[p.key]=next[p.key];inputs.get(p.key).value=next[p.key];});update();}
      section.append(title,canvas,controls,outputs,resultStatus,error);update();return {section,values,setValues};
    }
    cases.push(createCase('A'),createCase('B'));cases[1].section.hidden=true;grid.append(...cases.map(c=>c.section));
    const compare=B('Compare A / B',()=>{cases[1].section.hidden=!cases[1].section.hidden;root.classList.toggle('museum-comparing',!cases[1].section.hidden);compare.setAttribute('aria-expanded',String(!cases[1].section.hidden));compare.textContent=cases[1].section.hidden?'Compare A / B':'Show scenario A';copy.hidden=cases[1].section.hidden;});compare.setAttribute('aria-expanded','false');
    const copy=B('Copy A to B',()=>cases[1].setValues({...cases[0].values}));copy.hidden=true;
    const reset=B('Reset experiment',()=>{const defaults=Object.fromEntries(model.parameters.map(p=>[p.key,p.value]));cases.forEach(c=>c.setValues(defaults));});
    toolbar.append(compare,copy,reset);
    const equations=E('details','museum-model-notes');equations.open=true;equations.append(E('summary','','Model, assumptions and sources'),E('code','museum-equation',model.equation));
    const assumptions=E('ul');model.assumptions.forEach(a=>assumptions.append(E('li','',a)));equations.append(assumptions,sourceList(model.sources));
    root.append(heading,warning,toolbar,grid,equations);return root;
  }
  function lesson(key,seek){
    const entry=exhibits[key];if(!entry)throw new Error('Missing museum exhibit '+key);
    const root=E('section','museum-lesson');root.dataset.exhibit=key;root.setAttribute('aria-label','Exhibit guide');
    const head=E('div','museum-lesson-head');head.append(badge(entry),E('p','museum-evidence-reason',entry.statusReason),E('h2','',entry.question),E('p','museum-takeaway',entry.takeaway));
    const steps=E('div','museum-steps');steps.setAttribute('role','group');steps.setAttribute('aria-label','Learning steps');
    const explanation=E('article','museum-step-explanation'),stepTitle=E('h3'),stepBody=E('p');explanation.append(stepTitle,stepBody);let active=0;
    function selectStep(index,inspect=true){active=index;const step=entry.steps[index];stepTitle.textContent=step.title;stepBody.textContent=step.body;steps.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));if(inspect&&seek)seek(step.progress);}
    entry.steps.forEach((step,i)=>{const b=B('',()=>selectStep(i));b.append(E('span','museum-step-number',String(i+1).padStart(2,'0')),E('span','',step.title));b.setAttribute('aria-pressed',String(i===0));steps.append(b);});
    const limits=E('div','museum-limits');limits.append(E('h3','','What this does not establish'));const list=E('ul');entry.assumptions.forEach(a=>list.append(E('li','',a)));limits.append(list);
    const citations=E('details','museum-citations');citations.append(E('summary','',`Sources and what they support (${entry.sources.length})`),sourceList(entry.sources));
    root.append(head,steps,explanation);selectStep(0,false);
    if(entry.experiment)root.append(experimentPanel(entry.experiment,key));
    root.append(limits,citations,compareEvidence(entry,key));return root;
  }
  function mountLibrary(group){
    const list=group==='nuclear'?sims:S,main=document.querySelector('.obs-main');let panel;
    const seek=p=>{if(group==='nuclear')seekSim(p*100);else{const range=document.getElementById('seek');range.value=p*1000;range.dispatchEvent(new Event('input',{bubbles:true}));}};
    const old=group==='nuclear'?loadSim:ld;
    function update(id){
      const key=group+'/'+id;if(!exhibits[key])return;
      const next=lesson(key,seek);if(panel)panel.replaceWith(next);else document.querySelector('.obs-sequence').after(next);panel=next;
      const stage=document.querySelector('.obs-scene-badge');stage.textContent=labels[exhibits[key].status];
      const sub=document.getElementById(group==='nuclear'?'simSub':'sS');sub.textContent=exhibits[key].question;sub.classList.add('museum-leading-question');
      main.querySelector('.obs-context').classList.add('museum-legacy-context');
    }
    const wrapped=id=>{old(id);update(id);};if(group==='nuclear')loadSim=wrapped;else ld=wrapped;
    const current=group==='nuclear'?curSim:cur;update(current.id);
    const sidebar=document.querySelector('.obs-sidebar'),filter=evidenceSelector('Evidence type','museum-evidence-filter');sidebar.querySelector('.obs-sidebar-head').after(filter.wrap);
    const search=sidebar.querySelector('input[type=search]');
    function filterCatalog(){
      const term=(search?.value||'').trim().toLowerCase();let count=0;
      list.forEach(s=>{const data=exhibits[group+'/'+s.id],b=sidebar.querySelector(`button[data-id="${s.id}"]`);const matches=[s.name||s.nm,s.cat,s.sub,data.question,data.takeaway].join(' ').toLowerCase().includes(term);b.hidden=!matches||(filter.select.value!=='all'&&data.status!==filter.select.value);if(!b.hidden)count++;});
      const status=sidebar.querySelector('#results,#searchStatus');if(status)status.textContent=count?`${count} exhibits shown`:'No exhibits match. Clear search or choose all evidence types.';
      sidebar.querySelectorAll('#catalog>section,.sim-category').forEach(section=>section.hidden=![...section.querySelectorAll('button[data-id]')].some(b=>!b.hidden));
    }
    filter.select.addEventListener('change',filterCatalog);search?.addEventListener('input',filterCatalog);
    list.forEach(s=>{const b=sidebar.querySelector(`button[data-id="${s.id}"]`),data=exhibits[group+'/'+s.id];b.dataset.evidence=data.status;const marker=E('span','museum-nav-status',labels[data.status]);b.querySelector('.obs-nav-title').append(marker);});
    filterCatalog();
  }
  function mountLab(){
    const group='lab';const old=selectMethod;
    function show(index){
      playing=false;cancelFrame();updatePlayback();
      const panel=panels[index].panel,key=group+'/'+METHODS[index].id;
      if(!panel.querySelector('.museum-lesson'))panel.prepend(lesson(key,null));
      panel.querySelectorAll('.obs-lab-layout,.obs-output,.info-banner,:scope>details').forEach(node=>node.hidden=true);
    }
    selectMethod=index=>{old(index);show(index);};show(activeIndex);
    document.querySelector('.obs-subtitle').textContent='Test established physical principles. Examine what speculative drive claims still need to demonstrate.';
    const notice=E('p','museum-retired-note','Choose a physical principle, change one variable, and compare scenarios. Each model predicts only its stated relationships, within its stated assumptions.');document.querySelector('.obs-heading').after(notice);
  }
  function mountEarth(){const key='earth/sequence';document.querySelector('.phase-indicator').after(lesson(key,p=>seekAnimation(p*100)));}
  function homeDirectory(){
    const section=E('section','museum-directory');section.id='exhibits';const heading=E('div','museum-directory-heading');heading.append(E('span','obs-kicker','A museum of questions'),E('h2','','Explore by evidence, not spectacle.'),E('p','','Choose an exhibit to inspect its reasoning, assumptions and sources. Quantitative experiments teach stated principles; they do not certify extraordinary claims.'));
    const tools=E('div','museum-directory-tools'),searchWrap=E('div'),label=E('label','','Find a learning question'),search=E('input');search.type='search';search.id='museum-directory-search';search.placeholder='Try orbit, aircraft, evidence or a name';label.htmlFor=search.id;
    const clear=B('Clear search',()=>{search.value='';render(true);search.focus()});searchWrap.append(label,search,clear);const filter=evidenceSelector('Evidence type','museum-directory-evidence');tools.append(searchWrap,filter.wrap);
    const status=E('p','museum-directory-status');status.setAttribute('role','status');const grid=E('div','museum-directory-grid');let limit=12;
    const more=B('Show more exhibits',()=>{limit+=12;render(false)},'museum-load-more');
    const preferred=['uap/gofast','propulsion/ion','lab/snell','uap/gps3','lab/oscillator','nuclear/trinity','lab/sampling','propulsion/alcubierre'];
    const entries=Object.entries(exhibits).sort(([a],[b])=>{const ai=preferred.indexOf(a),bi=preferred.indexOf(b);return (ai<0?100:ai)-(bi<0?100:bi)});
    function render(reset){
      if(reset)limit=12;const term=search.value.trim().toLowerCase();const matches=entries.filter(([key,entry])=>[entry.title,entry.question,key,entry.statusReason].join(' ').toLowerCase().includes(term)&&(filter.select.value==='all'||entry.status===filter.select.value));
      grid.replaceChildren();matches.slice(0,limit).forEach(([key,entry])=>{const [group,id]=key.split('/'),card=E('a','museum-directory-card');card.href=pages[group]+'#'+id;card.append(badge(entry),E('h3','',entry.question),E('p','',entry.title),E('span','museum-card-action',entry.experiment?'Explore & experiment ↗':'Examine the evidence ↗'));grid.append(card);});
      status.textContent=matches.length?`Showing ${Math.min(limit,matches.length)} of ${matches.length} exhibits`:'No matching exhibits. Clear the search or choose all evidence types.';more.hidden=matches.length<=limit;clear.hidden=!search.value;
    }
    search.addEventListener('input',()=>render(true));filter.select.addEventListener('change',()=>render(true));
    section.append(heading,tools,status,grid,more);document.querySelector('.obs-collections').before(section);render(true);
    const cta=document.querySelector('.obs-cta');cta.href='#exhibits';cta.textContent='Choose a question ↗';
    document.querySelector('.obs-hero p').textContent='Explore what is known, what is proposed, and what remains unverified. Follow an explanation, change a meaningful variable, and compare the result with its assumptions.';
  }
  function mountArchive(){
    const panel=E('section','museum-archive-guide');panel.append(E('h2','','Read a claim in three passes'));
    [['Identify the record','Separate the existence of a document or testimony from the truth of what it alleges.'],['Check the measurement','Look for original observations, calibration, methods, uncertainty and independent replication.'],['Compare explanations','Ask what each explanation predicts, what could falsify it, and what the available evidence cannot distinguish.']].forEach(([title,body])=>{const card=E('article');card.append(E('h3','',title),E('p','',body));panel.append(card);});
    const link=E('a','','Explore the exhibit evidence catalog ↗');link.href='index.html#exhibits';panel.append(link);document.querySelector('.research-tools').after(panel);
  }
  window.Museum={exhibits,labels};
  const group=document.body.dataset.collection;
  if(window.MuseumCuration.retiredRequested){const note=E('p','museum-curation-note','This older exhibit has been retired from the curated collection. Choose a retained topic from the catalog; physics lessons teach principles rather than validate retired claims.');note.setAttribute('role','status');document.querySelector('.obs-heading')?.after(note);}
  if(['uap','propulsion','nuclear'].includes(group))mountLibrary(group);else if(group==='lab')mountLab();else if(group==='earth')mountEarth();else if(group==='archive')mountArchive();else homeDirectory();
})();
