(() => {
  'use strict';
  const TAU=Math.PI*2, clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)), ease=v=>{v=clamp(v);return v*v*(3-2*v)}, mix=(a,b,v)=>a+(b-a)*v;
  const palettes={uap:['#111b36','#6f86bd','#bac8ff'],propulsion:['#0c2634','#31627a','#93e3d9'],nuclear:['#241e31','#7a5861','#ffd0a0'],lab:['#191a39','#545381','#c1b5ff'],earth:['#242335','#68565b','#f0bf95']};
  const manifest={};
  const add=(group,type,rows)=>rows.forEach(([id,title,variant,setting,caption])=>manifest[group+'/'+id]={group,type,id,title,variant,setting,caption});
  add('uap','encounter',[
    ['nimitz','USS Nimitz Tic Tac','capsule','ocean','A reported encounter above the Pacific'],['gimbal','Gimbal UAP','sensor','cloud','Infrared imagery, interpreted visually'],['gofast','Go Fast UAP','track','ocean','Motion in a changing frame of reference'],['phoenix','Phoenix Lights','formation','city','A formation of lights over the valley'],['transmedium','Transmedium UAP','submerge','ocean','A reported transition at the waterline'],['observables','The Five Observables','orbiting','cloud','Five reported characteristics, not measured here'],['rendlesham','Rendlesham Forest','triangle','forest','Light and shadow among the trees'],['tehran','Tehran UFO Incident','orb','city','A reported night-time aerial encounter'],['belgian','Belgian Wave','triangle','city','Three lights in a reported triangular pattern'],['jal1628','JAL Flight 1628','mothership','arctic','A reported encounter over Alaska'],['stephenville','Stephenville, Texas','formation','desert','A reported sequence of lights over Texas']
  ]);
  add('uap','aircraft',[
    ['sr71','SR-71 Blackbird','blackbird','cloud','Long fuselage · twin nacelles'],['f117','F-117 Nighthawk','faceted','night','Faceted airframe silhouette'],['b2','B-2 Spirit','wing','cloud','Continuous flying-wing profile'],['b21','B-21 Raider','wing2','night','A modern flying-wing silhouette'],['aurora','Aurora / SR-72','delta','cloud','An imagined airframe for a rumored concept'],['tr3b','TR-3B','triangle','night','An alleged concept, rendered as speculative art'],['x37b','X-37B Space Plane','shuttle','space','Winged orbital vehicle'],['scramjet','Scramjet Engine','dart','cloud','Conceptual high-speed airflow'],['hgv','Hypersonic Glide Vehicle','glider','space','An illustrative glide path'],['wingman','Loyal Wingman','twin','cloud','Coordinated aircraft silhouettes'],['u2','U-2 Dragon Lady','longwing','cloud','High-aspect-ratio reconnaissance aircraft'],['haveblue','Have Blue','faceted2','desert','Experimental faceted airframe'],['rq170','RQ-170 Sentinel','wing3','cloud','Tailless unmanned aircraft'],['darkstar','RQ-3 Darkstar','longwing2','cloud','A broad-wing reconnaissance concept'],['arrw','AGM-183A ARRW','dart2','cloud','An abstract flight illustration'],['avangard','Avangard','glider2','space','A conceptual atmospheric glide'],['growler','EA-18G Growler','fighter','cloud','Aircraft and radiated signal pattern']
  ]);
  add('uap','orbit',[
    ['rods','Rods from God','rods','space','A speculative orbital concept'],['asat','Anti-satellite systems','debris','space','Orbital objects and debris risk'],['gps3','GPS III','navigation','space','Satellite geometry and coverage'],['sbirs','SBIRS','infrared','space','Earth observation from orbit'],['emp','Electromagnetic pulse','pulse','space','An abstract expanding field']
  ]);
  add('uap','signals',[
    ['ads','Active Denial System','dish','desert','A non-operational field illustration'],['champ','CHAMP','microwave','city','A stylized electromagnetic field'],['swarm','Drone Swarm','swarm','night','A coordinated pattern of autonomous nodes'],['rcs','Radar cross section','reflection','night','Incident and scattered waves'],['metamat','Metamaterial Cloaking','cloak','night','A speculative wave-bending illustration'],['argus','ARGUS-IS','imaging','city','A mosaic of observation windows'],['echelon','ECHELON','network','night','A conceptual communications network'],['darparobot','DARPA Robotics','robot','night','Articulated motion and balance'],['quantum','Quantum sensing','quantum','night','Correlations represented as paired light'],['railgun','Electromagnetic Railgun','field','night','Abstract electromagnetic acceleration'],['havana','Havana Syndrome','uncertain','city','A reported condition with unresolved attribution'],['gravwave','Gravity manipulation','gravity','night','A speculative field concept'],['project1794','Project 1794','saucer','desert','An experimental circular aircraft concept'],['lookingglass','Project Looking Glass','portal','night','An unverified story, visualized as fiction'],['montauk','Montauk Project','portal2','night','An unverified story, visualized as fiction'],['mkultra','MKUltra','mind','night','A historical program, represented abstractly'],['stargate2','Project Star Gate','perception','night','A speculative perception illustration'],['stuxnet','Stuxnet','cascade','night','An abstract information-to-machine chain'],['vault7','Vault 7','devices','night','A conceptual map of device categories']
  ]);
  add('uap','naval',[
    ['laser','HELIOS','beam','ocean','A conceptual optical system at sea'],['ussford','USS Gerald R. Ford','carrier','ocean','Carrier silhouette and deck activity'],['zumwalt','USS Zumwalt','destroyer','ocean','Angular hull and superstructure']
  ]);
  add('propulsion','engine',[
    ['nerva','NERVA','thermal','space','A conceptual heated-propellant path'],['ntr','Nuclear thermal rocket','cutaway','space','A layered engine illustration'],['bimodal','Bimodal NTR','bimodal','space','Propulsion and electrical modes'],['gcr','Gas-core rocket','gas','space','A luminous core, shown schematically'],['nswr','Nuclear salt water rocket','flow','space','An unbuilt propulsion concept'],['ion','Ion thruster','ion','space','Charged particles and a narrow plume'],['vasimr','VASIMR','vasimr','space','A plasma column shaped by magnetic fields'],['mpd','Magnetoplasmadynamic thruster','mpd','space','A conceptual current and field interaction'],['hall','Hall-effect thruster','hall','space','An annular discharge and expanding plume'],['daedalus','Project Daedalus','staged','space','A proposed interstellar vehicle'],['icf','Inertial confinement drive','inertial','space','An abstract pulsed-fusion concept'],['mcf','Magnetic confinement drive','torus','space','A toroidal plasma illustration'],['pluto','Project Pluto','ramjet','cloud','An abstract historical propulsion study']
  ]);
  add('propulsion','sail',[
    ['orion','Project Orion','pusher','space','An abstract pulse-driven vehicle'],['medusa','Medusa Sail','canopy','space','A tethered sail concept'],['solar','Solar / Laser Sail','diamond','space','Light interacting with a thin sail'],['bussard','Bussard Ramjet','scoop','space','A proposed interstellar collection field'],['emfield','Electromagnetic catapult','rail','space','Sequential field regions, shown conceptually']
  ]);
  add('propulsion','warp',[['alcubierre','Alcubierre drive','bubble','space','A mathematical concept, not a working drive']]);
  add('propulsion','reactor',[
    ['kilopower','Kilopower / KRUSTY','radial','moon','Compact power-system silhouette'],['msr','Molten salt reactor','loop','night','A conceptual circulating-fluid path'],['rtg','Radioisotope generator','fins','space','Heat represented along a finned housing'],['pebblebed','Pebble bed reactor','pebbles','night','A bed of particles, illustrated abstractly'],['snap','SNAP-10A','satellite','space','A historical orbital power experiment']
  ]);
  add('nuclear','event',[
    ['trinity','Trinity','tower','desert','New Mexico · historical illustration'],['hiroshima','Hiroshima','city','city','Historical remembrance · August 1945'],['nagasaki','Nagasaki','valley','city','Historical remembrance · August 1945'],['ivymike','Ivy Mike','island','ocean','Pacific test history · illustrative sequence'],['castlebravo','Castle Bravo','lagoon','ocean','Bikini Atoll · historical illustration'],['tsarbomba','Tsar Bomba','arctic','arctic','Novaya Zemlya · historical illustration'],['atmospheric','Atmospheric test','airburst','desert','A schematic atmospheric sequence'],['underwater','Underwater test','column','ocean','A schematic water-column sequence'],['highalt','High-altitude test','aurora','space','A schematic upper-atmosphere sequence'],['fireball','Fireball formation','fireball','desert','Light and expansion, not a physical model'],['shockwave','Blast shockwave','rings','desert','A qualitative pressure-front illustration'],['fallout','Fallout pattern','drift','desert','A conceptual dispersal illustration']
  ]);
  add('nuclear','geography',[
    ['nevada','Nevada Test Site','craters','desert','An imagined aerial view of the desert site'],['bikini','Bikini Atoll','atoll','ocean','Lagoon, reef and island silhouettes'],['novaya','Novaya Zemlya','islands','arctic','Arctic terrain and ice']
  ]);
  add('nuclear','atomic',[
    ['guntype','Gun-type concept','fission','night','Abstract fission illustration; no construction detail'],['implosion','Implosion concept','concentric','night','An abstract historical concept'],['thermonuclear','Thermonuclear concept','paired','night','Abstract nuclear processes'],['neutron','Enhanced radiation concept','particles','night','An abstract radiation illustration'],['yieldcompare','Historical yield comparison','comparison','night','Qualitative visual comparison, not blast radii'],['emp','Electromagnetic pulse','pulse','night','A stylized expanding-field pattern']
  ]);
  add('nuclear','earth',[['underground','Underground test','section','desert','A schematic earth section, not to scale']]);
  add('earth','earth',[['sequence','Below the surface','section','desert','Six phases of an illustrative earth section']]);
  add('lab','laboratory',[
    ['pais-ief','Inertial mass reduction','cavity','night','Field illustration · unvalidated concept'],['pais-hfgw','Gravitational wave generator','waves','night','Wave illustration · unvalidated concept'],['pais-plasma','Plasma compression','plasma','night','Plasma illustration · unvalidated scaling'],['alcubierre','Warp geometry','warp','space','Spacetime illustration · unvalidated scaling'],['emqvt','Quantum vacuum thruster','vacuum','night','Cavity illustration · unvalidated concept'],['emdrive','MHD plasma drive','mhd','night','Field and flow illustration'],['woodward','Mach-effect thruster','stack','night','Oscillating stack · unvalidated thrust model'],['biefeld-brown','Electrogravitics','plates','night','Electric field illustration'],['podkletnov','Gravitational shielding','disc','night','Rotating-disc illustration · disputed concept'],['metamaterial','Metamaterial cloak','cloak','night','Wavefront illustration · not a demonstrated cloak']
  ]);
  let annotations=true;
  function seed(id){let n=0;for(const ch of id)n=(n*31+ch.charCodeAt(0))>>>0;return n;}
  function rnd(i,s=1){const v=Math.sin(i*127.1+s*311.7)*43758.5453;return v-Math.floor(v);}
  function rgba(hex,a){let h=hex.replace('#','');if(h.length===3)h=h.split('').map(ch=>ch+ch).join('');return `rgba(${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)},${clamp(a)})`;}
  function line(c,pts,color,width=1){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.strokeStyle=color;c.lineWidth=width;c.stroke();}
  function poly(c,pts,fill,stroke=null){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=1.4;c.stroke();}}
  function ellipse(c,x,y,rx,ry,fill,stroke=null,rot=0){c.beginPath();c.ellipse(x,y,Math.max(0,rx),Math.max(0,ry),rot,0,TAU);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=1.2;c.stroke()}}
  function rect(c,x,y,w,h,fill,r=0){c.fillStyle=fill;c.beginPath();c.roundRect(x,y,w,h,r);c.fill()}
  function grad(c,x,y,x2,y2,stops){const g=c.createLinearGradient(x,y,x2,y2);stops.forEach(([p,col])=>g.addColorStop(p,col));return g;}
  function glow(c,x,y,r,color,a=.3){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,rgba(color,a));g.addColorStop(.3,rgba(color,a*.4));g.addColorStop(1,rgba(color,0));ellipse(c,x,y,r,r,g);}
  function text(c,str,x,y,size=14,color='#acb7cb',align='left'){c.font=`${size}px system-ui,sans-serif`;c.textAlign=align;c.fillStyle=color;c.fillText(str,x,y)}
  function label(c,str,x,y,tx,ty,accent){if(!annotations)return;line(c,[[tx,ty],[x+(x<tx?20:-20),y-5],[x,y-5]],rgba(accent,.45));ellipse(c,tx,ty,2.5,2.5,accent);text(c,str,x,y-13,13,'#d6dfed',x<tx?'left':'right');}
  function sky(c,cfg,t){
    const p=palettes[cfg.group],s=seed(cfg.id),day=['ocean','cloud','desert','arctic','city','forest'].includes(cfg.setting);
    rect(c,0,0,1000,600,grad(c,0,0,0,600,[[0,p[0]],[.64,day?p[1]:p[0]],[1,'#121b2a']]));
    glow(c,730,160,350,p[2],.13);
    if(!day||cfg.type==='encounter')for(let i=0;i<95;i++){const x=rnd(i,s)*1000,y=rnd(i+95,s)*410;ellipse(c,x,y,rnd(i+44,s)*1.1+.3,.6,rgba('#eef2ff',.18+rnd(i+11,s)*.5));}
    if(day){
      for(let j=0;j<5;j++){const y=80+j*57+Math.sin(j+s)*20;for(let i=0;i<6;i++)ellipse(c,((i*211+j*53+t*10)%1300)-150,y+i%2*10,130,12+j*4,rgba('#d6dbee',.023));}
      ellipse(c,760,114,29,29,rgba(p[2],.24));glow(c,760,114,120,p[2],.12);
    }
    if(cfg.setting==='space'&&cfg.variant!=='aurora')planet(c,810,675,330,t,p[2]);
  }
  function planet(c,x,y,r,t,accent){
    c.save();ellipse(c,x,y,r+7,r+7,rgba(accent,.08));ellipse(c,x,y,r,r,grad(c,x-r,y-r,x+r,y+r,[[0,'#7790a8'],[.15,'#354d72'],[.5,'#142843'],[1,'#101929']]));
    c.beginPath();c.arc(x,y,r,0,TAU);c.clip();
    for(let i=0;i<8;i++){c.save();c.translate(x,y);c.rotate(-.25);ellipse(c,-r+i*99,-r*.5+Math.sin(i*7)*35,120,13,rgba('#d9e3e9',.12));c.restore();}
    c.restore();
  }
  function terrain(c,cfg,t){
    const s=seed(cfg.id),p=palettes[cfg.group],h=370;
    if(cfg.setting==='space'||cfg.setting==='night')return;
    if(cfg.setting==='ocean'){
      rect(c,0,h,1000,230,grad(c,0,h,0,600,[[0,'#607987'],[.08,'#263f57'],[1,'#0f273c']]));
      for(let j=0;j<20;j++){const y=h+j*j*.6;for(let i=0;i<10;i++){const xx=rnd(i+j*10,s)*1000;line(c,[[xx,y],[xx+15+j*5,y-1]],rgba('#b1d4dd',.06+j*.003));}}
      for(let j=0;j<8;j++)ellipse(c,760,h+8+j*10,25+j*7,1.5,rgba(p[2],.06));
    }else{
      for(let layer=0;layer<3;layer++){
        const pts=[[0,600],[0,h+layer*42]];
        for(let x=0;x<=1000;x+=20)pts.push([x,h+layer*42-Math.sin(x*.007+s+layer)*22-Math.sin(x*.016+layer*9)*12]);
        pts.push([1000,600]);poly(c,pts,['#485369','#343b51','#232e43'][layer]);
      }
      if(cfg.setting==='arctic')for(let i=0;i<14;i++)poly(c,[[i*90-50,440],[i*90+20,372-rnd(i,s)*30],[i*90+70,449]],i%2?'#8794aa':'#697b96');
      if(cfg.setting==='city')for(let i=0;i<60;i++){const x=i*18-20,y=424-rnd(i,s)*60;rect(c,x,y,12+rnd(i+4,s)*13,600-y,'#15263a');for(let k=0;k<6;k++)if(rnd(k+i*3,s)>.4)rect(c,x+3,y+8+k*10,2,3,rgba('#f1ce98',.42));}
      if(cfg.setting==='forest')for(let i=0;i<27;i++){const x=i*42-30,y=350+rnd(i,s)*120,sz=35+rnd(i+20,s)*50;rect(c,x,y,4,180,'#10242b');poly(c,[[x-sz*.4,y+80],[x,y-sz],[x+sz*.4,y+80]],i%2?'#152c35':'#203942');}
      if(cfg.setting==='desert')for(let i=0;i<26;i++){const x=rnd(i,s)*1000,y=465+rnd(i+50,s)*135;ellipse(c,x,y,20+rnd(i+20,s)*38,2,rgba('#9a8890',.11));}
    }
  }
  function craft(c,x,y,size,shape,accent,rotation=0){
    c.save();c.translate(x,y);c.rotate(rotation);glow(c,0,0,size*2.6,accent,.12);
    const metal=grad(c,0,-size,0,size,[[0,'#e1e6eb'],[.32,'#8e9fb9'],[.53,'#546681'],[1,'#202d45']]);
    if(shape==='capsule'||shape==='track'){rect(c,-size,-size*.3,size*2,size*.6,metal,size*.3);line(c,[[-size*.7,-size*.2],[size*.6,-size*.2]],'#e5eef5',1);}
    else if(shape==='triangle'||shape==='formation'){
      if(shape==='triangle')poly(c,[[0,-size*.6],[-size,size*.65],[size,size*.65]],metal,'#8f9fb9');
      [[0,-size*.55],[-size*.84,size*.52],[size*.84,size*.52]].forEach(([a,b])=>{glow(c,a,b,14,accent,.7);ellipse(c,a,b,2.8,2.8,'#fff3d3')});
    }else if(shape==='orb'||shape==='submerge'){glow(c,0,0,size*2,accent,.6);ellipse(c,0,0,size*.35,size*.35,metal);ellipse(c,-size*.07,-size*.07,size*.14,size*.14,'#f6fafc');}
    else {ellipse(c,0,0,size,size*.24,metal,'#b2c3d7');ellipse(c,0,-size*.12,size*.5,size*.24,metal);for(let i=0;i<7;i++)ellipse(c,-size*.75+i*size*.25,size*.08,1.8,1.8,accent);}
    c.restore();
  }
  function encounter(c,cfg,t,a){
    terrain(c,cfg,t);const s=seed(cfg.id),v=cfg.variant;
    let x=mix(340,660,ease(t)),y=220+Math.sin(t*5+s)*20,sz=v==='mothership'?105:45;
    if(v==='submerge')y=mix(225,427,ease(t));
    if(v==='sensor'||v==='track'){
      const cx=500,cy=275;glow(c,cx,cy,180,a,.08);
      c.setLineDash([3,9]);ellipse(c,cx,cy,130,130,null,rgba(a,.3));c.setLineDash([]);
      for(const [sx,sy] of [[-1,-1],[-1,1],[1,-1],[1,1]])line(c,[[cx+sx*45,cy+sy*27],[cx+sx*45,cy+sy*45],[cx+sx*27,cy+sy*45]],'#e3e6ee',2);
      craft(c,cx,cy,35,v==='sensor'?'saucer':'capsule',a,v==='sensor'?(t-.5)*.6:-.1);
      label(c,'Illustrated object',740,180,520,265,a);label(c,'Reference frame',210,400,390,310,a);
    }else{
      c.setLineDash([3,7]);line(c,Array.from({length:45},(_,i)=>[280+i*11,220+Math.sin(i/44*5+s)*20]),rgba(a,.25));c.setLineDash([]);
      craft(c,x,y,sz,v==='orbiting'?'capsule':v,a,Math.sin(t*4)*.06);
      if(v==='orbiting')for(let i=0;i<5;i++)ellipse(c,500+Math.cos(i/5*TAU+t*2)*185,245+Math.sin(i/5*TAU+t*2)*70,6,6,rgba(a,.7));
      if(cfg.id==='nimitz'){vessel(c,190,399,.65,'carrier',a);for(let i=0;i<4;i++)ellipse(c,590,432,40+i*12,5+i*2,null,rgba(a,.12));}
      if(v==='formation')for(let i=0;i<4;i++)craft(c,270+i*110,245+Math.abs(i-1.5)*18,12,'orb',a);
      label(c,cfg.setting==='ocean'?'Ocean surface':'Landscape reference',220,472,320,410,a);label(c,v==='triangle'?'Reported light pattern':'Artistic reconstruction',790,170,x+25,y,a);
    }
  }
  const aircraftShapes={
    blackbird:[[190,0],[45,-16],[8,-56],[-85,-65],[-40,-26],[-110,-18],[-140,-29],[-155,0],[-140,29],[-110,18],[-40,26],[-85,65],[8,56],[45,16]],
    faceted:[[145,0],[-50,-109],[-83,-48],[-118,-35],[-78,0],[-118,35],[-83,48],[-50,109]],
    wing:[[110,0],[-105,-180],[-85,-85],[-52,-65],[-83,-28],[-60,0],[-83,28],[-52,65],[-85,85],[-105,180]],
    longwing:[[145,0],[15,-13],[-15,-225],[-42,-230],[-23,-16],[-115,-9],[-135,-58],[-152,-55],[-131,0],[-152,55],[-135,58],[-115,9],[-23,16],[-42,230],[-15,225],[15,13]],
    delta:[[170,0],[-108,-100],[-83,-20],[-135,0],[-83,20],[-108,100]],
    shuttle:[[125,0],[65,-22],[-58,-86],[-99,-83],[-71,-20],[-115,-15],[-115,15],[-71,20],[-99,83],[-58,86],[65,22]],
    fighter:[[155,0],[45,-20],[-49,-116],[-76,-105],[-36,-24],[-96,-20],[-115,-60],[-141,-51],[-113,0],[-141,51],[-115,60],[-96,20],[-36,24],[-76,105],[-49,116],[45,20]],
    dart:[[178,0],[-92,-20],[-128,-49],[-143,-39],[-125,0],[-143,39],[-128,49],[-92,20]],
    glider:[[134,0],[-92,-76],[-66,0],[-92,76]]
  };
  function airframe(c,x,y,scale,variant,a,angle=-.15){
    let key=variant.replace(/[23]$/,'');if(key==='triangle')key='delta';if(key==='twin')key='fighter';
    let pts=aircraftShapes[key]||aircraftShapes.wing;
    if(variant.endsWith('2'))pts=pts.map(([x,y])=>[x*1.1,y*.8]);
    if(variant.endsWith('3'))pts=pts.map(([x,y])=>[x*.8,y*1.12]);
    c.save();c.translate(x,y);c.scale(scale,scale);c.rotate(angle);
    poly(c,pts.map(([xx,yy])=>[xx+10,yy+14]),rgba('#070e1e',.28));
    poly(c,pts,grad(c,-40,-160,50,140,[[0,'#a1b2c9'],[.35,'#5f738f'],[.5,'#344864'],[.8,'#1b2b47'],[1,'#5b6d88']]),'#98aec5');
    line(c,[[130,0],[-110,0]],rgba('#dde8f1',.42));line(c,[[10,-14],[-55,-60],[-76,-30]],rgba('#bcc7dc',.3));line(c,[[10,14],[-55,60],[-76,30]],rgba('#bcc7dc',.3));
    ellipse(c,55,0,24,7,'#121f37','#8fb9d6');ellipse(c,63,-1,13,3,rgba(a,.4));
    if(key==='blackbird'||key==='fighter')for(const y2 of [-34,34]){rect(c,-82,y2-8,65,16,'#263c57',5);glow(c,-95,y2,25,a,.3);}
    c.restore();
  }
  function aircraft(c,cfg,t,a){
    const v=cfg.variant,xx=500+Math.sin(t*3)*42,yy=265+Math.sin(t*4)*10;
    if(cfg.setting!=='space')for(let i=0;i<4;i++)line(c,[[-40,310+i*21],[370,295+i*12]],rgba('#ced7eb',.06),2);
    if(v==='twin'){airframe(c,360,320,.5,'fighter',a);airframe(c,660,190,.8,'delta',a);}
    else airframe(c,xx,yy,v.startsWith('longwing')?.87:1.12,v,a,-.16+Math.sin(t*2)*.02);
    if(cfg.id==='growler')for(let i=0;i<5;i++)ellipse(c,xx-70,yy,140+i*36,55+i*20,null,rgba(a,.08));
    label(c,cfg.caption,790,105,xx+70,yy-10,a);label(c,'Illustrative flight path',190,440,345,300,a);
    if(v.startsWith('dart')||v.startsWith('glider')){for(let i=0;i<8;i++){c.beginPath();c.moveTo(40,180+i*15);c.bezierCurveTo(240,160+i*15,550,190+i*13,930,240+i*18);c.strokeStyle=rgba(a,.12);c.lineWidth=1;c.stroke();}}
  }
  function vessel(c,x,y,scale,v,a){c.save();c.translate(x,y);c.scale(scale,scale);
    ellipse(c,0,21,186,18,rgba('#102436',.5));
    poly(c,[[-160,-5],[-125,22],[113,27],[166,-7]],'#26344c','#8294a9');
    poly(c,[[-160,-5],[-110,-34],[173,-25],[166,-7]],'#76899d','#a8bac9');
    if(v==='carrier'){line(c,[[-115,-16],[105,-20]],'#c4cfda',2);line(c,[[-90,-26],[132,-29]],'#c4cfda',1);rect(c,24,-62,38,31,'#455d77',2);rect(c,37,-77,8,18,'#8b9dae');for(let i=0;i<6;i++)poly(c,[[-70+i*26,-19],[-76+i*26,-27],[-69+i*26,-29],[-64+i*26,-23]],'#253b54');}
    else{poly(c,[[-50,-29],[-20,-88],[45,-83],[64,-28]],'#51677e','#8a9fb4');poly(c,[[-20,-88],[12,-104],[63,-98],[45,-83]],'#9aabbc');line(c,[[10,-99],[10,-128]],'#a8c0cf',2);}
    for(let i=0;i<10;i++)line(c,[[-170-i*5,22+i*5],[140+i*6,23+i*6]],rgba(a,.08));c.restore();}
  function naval(c,cfg,t,a){terrain(c,cfg,t);vessel(c,500+Math.sin(t*3)*20,360,1.45,cfg.variant,a);if(cfg.variant==='beam'){line(c,[[550,260],[790,130]],rgba(a,.5),2);glow(c,560,245,90,a,.12);}label(c,'Silhouette and system context',180,170,490,289,a);}
  function orbit(c,cfg,t,a){
    const phase=t*1.5,xx=460+Math.sin(phase)*150,yy=255-Math.cos(phase)*30;
    c.setLineDash([4,8]);ellipse(c,600,520,330,175,null,rgba(a,.3),-.3);c.setLineDash([]);
    if(cfg.variant==='pulse'){for(let i=0;i<6;i++)ellipse(c,670,394,60+i*35+t*55,22+i*12,null,rgba(a,.3-i*.04));glow(c,650,385,95,a,.5);}
    else{c.save();c.translate(xx,yy);c.rotate(-.18);poly(c,[[-35,-34],[25,-44],[50,-19],[46,42],[-18,52],[-35,26]],'#9b9ba8','#d6d8df');rect(c,-14,-24,54,55,'#ceb58a',4);for(let side of [-1,1]){rect(c,side===-1?-210:58,-29,150,60,'#1c4163',2);for(let j=0;j<7;j++)line(c,[[side===-1?-205+j*21:62+j*21,-27],[side===-1?-205+j*21:62+j*21,28]],'#527697');line(c,[[side===-1?-210:58,0],[side===-1?-60:208,0]],'#7290a5');}ellipse(c,14,-48,28,12,'#afbeca','#e1e7eb',-.4);line(c,[[10,-43],[17,-70]],'#cddde3',2);c.restore();}
    if(cfg.variant==='debris')for(let i=0;i<24;i++){const an=i*2.4+t*.2;rect(c,xx+Math.cos(an)*(130+i*3),yy+Math.sin(an)*(60+i),3,2,rgba(a,.5));}
    if(cfg.variant==='navigation'||cfg.variant==='infrared'){c.save();c.globalAlpha=.15;poly(c,[[xx,yy+45],[630,458],[903,515]],a);c.restore();}
    if(cfg.variant==='rods')for(let i=0;i<5;i++)line(c,[[xx-60+i*18,yy+60],[xx-64+i*18,yy+116]],'#d9d8db',4);
    label(c,'Orbital geometry · not to scale',175,160,xx-90,yy,a);
  }
  function engine(c,cfg,t,a){
    const v=cfg.variant,phase=.25+.75*ease(t),isRing=['hall','torus','inertial'].includes(v);
    glow(c,490,270,260,a,.12);
    c.save();c.translate(490,280);
    if(isRing){
      for(let j=4;j>=0;j--){ellipse(c,-j*8,0,100,130,grad(c,-100,-130,100,130,[[0,'#a6b5c2'],[.4,'#425872'],[1,'#182c44']]),'#778a9e');ellipse(c,-j*8,0,70,94,'#14283f',rgba(a,.4));}
      ellipse(c,8,0,52,75,rgba(a,.1),rgba(a,.7));for(let i=0;i<16;i++){const ang=i/16*TAU+t*2;ellipse(c,Math.cos(ang)*72,Math.sin(ang)*95,3,4,a);}
    }else{
      poly(c,[[-220,-60],[-75,-64],[-22,-36],[56,-36],[130,-96],[130,96],[56,36],[-22,36],[-75,64],[-220,60]],grad(c,0,-100,0,100,[[0,'#bdc9d4'],[.2,'#647991'],[.5,'#263e57'],[.82,'#647891'],[1,'#8a9bae']]),'#9daebe');
      poly(c,[[-211,-40],[-76,-43],[-16,-21],[67,-21],[119,-67],[119,67],[67,21],[-16,21],[-76,43],[-211,40]],'#102a3c',rgba(a,.5));
      for(let i=0;i<(v==='staged'?7:5);i++){const x=-180+i*43;ellipse(c,x,0,8,54,null,rgba(a,.5));}
      for(let i=0;i<32;i++){const x=-207+((i*31+t*180)%320),y=Math.sin(i*13+t*4)*22;ellipse(c,x,y,2,2,rgba(a,.55));}
      rect(c,-270,-27,50,54,'#5d6f83',5);line(c,[[-263,-32],[-263,-95],[-120,-95],[-120,-65]],'#7895aa',5);
      if(v==='gas'){glow(c,-120,0,67,'#f3b89d',.65);ellipse(c,-120,0,37,37,rgba('#f3b89d',.35));}
      if(v==='cutaway'){for(let k=0;k<9;k++)rect(c,-207+k*17,-34,9,68,rgba(a,.3),3);}
      if(v==='flow'){for(let k=0;k<5;k++){line(c,[[-286,-95+k*12],[-205,-95+k*12],[-187,-35]],rgba(a,.48),3);}}
      if(v==='ion'){for(let k=0;k<5;k++)line(c,[[25+k*9,-47],[25+k*9,47]],'#bfd9df',2);}
      if(v==='vasimr'){for(let k=0;k<3;k++){ellipse(c,-172+k*75,0,14,73,null,'#dbb7a3');ellipse(c,-172+k*75+5,0,14,73,null,rgba(a,.45));}}
      if(v==='mpd'){line(c,[[-190,-20],[37,-20]],'#d8c4b0',7);line(c,[[-190,20],[37,20]],'#d8c4b0',7);}
      if(v==='staged'){rect(c,-350,-47,87,94,'#648297',9);ellipse(c,-349,0,12,47,'#aec5cd');for(let k=0;k<3;k++)ellipse(c,-336+k*25,0,7,50,null,rgba(a,.5));}
      if(v==='bimodal')for(let j=0;j<4;j++)rect(c,-190+j*30,-120,24,30,'#516d86',3);
      if(v==='ramjet')poly(c,[[-300,-80],[80,-65],[150,0],[80,65],[-300,80],[-250,0]],rgba(a,.1),rgba(a,.35));
    }
    const start=isRing?45:120;
    for(let j=6;j>=0;j--){c.beginPath();c.moveTo(start,-(14+j*5));c.bezierCurveTo(180,(-40-j*9)*phase,280,-20-j*6,410*phase,Math.sin(t*8)*4);c.bezierCurveTo(280,20+j*6,180,(40+j*9)*phase,start,14+j*5);c.closePath();c.fillStyle=grad(c,start,0,430,0,[[0,rgba(a,.13)],[.3,rgba(a,.08)],[1,rgba(a,0)]]);c.fill();}
    for(let i=0;i<35;i++){const tt=(i/35+t*.8)%1;const px=start+tt*340*phase,py=Math.sin(i*12)*tt*65;line(c,[[px,py],[px+16,py]],rgba(a,(1-tt)*.6),1.2);}
    c.restore();
    label(c,isRing?'Annular field geometry':'Conceptual energy region',220,122,430,225,a);label(c,'Illustrative flow',816,420,690,300,a);
  }
  function sail(c,cfg,t,a){
    const v=cfg.variant;
    if(v==='rail'){for(let i=0;i<9;i++){const x=170+i*65,y=350-i*10;ellipse(c,x,y,22,69,null,rgba(a,.2+i*.05));line(c,[[x,y-69],[x+65,y-79]],'#7799ad',3);line(c,[[x,y+69],[x+65,y+59]],'#7799ad',3);}craft(c,230+ease(t)*440,342-ease(t)*68,22,'capsule',a);}
    else if(v==='pusher'){airframe(c,540,255,.6,'shuttle',a,Math.PI/2);ellipse(c,540,345,90,17,'#4b6580','#a8bed0');for(let i=0;i<4;i++)ellipse(c,540,390+i*18,70+i*20+t*32,8+i*4+t*6,null,rgba(a,.4-i*.08));}
    else if(v==='scoop'){
      for(let j=0;j<9;j++)ellipse(c,435+j*14,260,150-j*9,115-j*6,null,rgba(a,.12+j*.035),-.12);
      airframe(c,680,320,.48,'shuttle',a,.15);
      for(let i=0;i<26;i++){const f=(i/26+t*.45)%1,x=60+f*620,y=mix(90+rnd(i,12)*350,300,f);line(c,[[x,y],[x+14,y]],rgba(a,.2+f*.35));}
      label(c,'Conceptual collection field',180,130,405,245,a);
    }
    else{
      const x=520,y=245,w=200,h=v==='canopy'?100:150;
      const pts=[[x,y-h],[x+w,y],[x,y+h],[x-w,y]];
      if(v==='canopy'){
        c.beginPath();c.moveTo(x-w,y+50);c.bezierCurveTo(x-w,y-190,x+w,y-190,x+w,y+50);c.quadraticCurveTo(x,y-35,x-w,y+50);c.fillStyle=grad(c,x-w,y-100,x+w,y+70,[[0,'#c7c9c5'],[.5,'#9ab3b8'],[1,'#526c87']]);c.fill();
        for(let i=0;i<9;i++){const xx=x-w+i*50;c.beginPath();c.moveTo(xx,y+25);c.quadraticCurveTo(x+(xx-x)*.45,y-190,x,y-123);c.strokeStyle=rgba('#dce6e4',.35);c.stroke();}
      }else poly(c,pts,grad(c,x-w,y-h,x+w,y+h,[[0,'#c7c6bc'],[.3,'#7ca0ac'],[.5,'#d8d2bf'],[.72,'#6a879f'],[1,'#bcb6b1']]),'#d6dcd9');
      for(let i=1;i<12;i++){const k=i/12;line(c,[[x-w+w*k,y-h*k],[x+w-w*k,y+h*k]],rgba('#1f526c',.35));line(c,[[x+w-w*k,y-h*k],[x-w+w*k,y+h*k]],rgba('#e6efea',.25));}
      const cy=435;for(const [px,py] of pts)line(c,[[px,py],[x-110,cy]],rgba('#c9d6db',.5));craft(c,x-110,cy,18,'capsule',a);
      if(v==='scoop')for(let i=0;i<12;i++){c.beginPath();c.moveTo(20,i*38+20);c.quadraticCurveTo(260,220,520,245);c.strokeStyle=rgba(a,.18);c.stroke();}
      else for(let i=0;i<22;i++){let xx=(i*59+t*120)%1000;line(c,[[xx,80+i*15],[xx+20,85+i*15]],rgba(a,.12));}
    }
    label(c,cfg.caption,230,130,470,220,a);
  }
  function warp(c,cfg,t,a){
    for(let j=0;j<15;j++){
      c.beginPath();for(let x=40;x<=960;x+=10){const r=(x-500)/170,base=65+j*33,offset=(base-300)*.7*Math.exp(-r*r)*(.7+t*.3),y=base+offset;x===40?c.moveTo(x,y):c.lineTo(x,y);}c.strokeStyle=rgba(a,.14);c.lineWidth=1;c.stroke();
    }
    for(let j=0;j<8;j++){const rx=145+j*8,ry=95+j*5;ellipse(c,500,282,rx,ry,null,rgba(j%2?a:'#e2abdf',.28-j*.023),-.2);}
    glow(c,500,280,180,a,.12);craft(c,500,280,50,'saucer',a);for(let i=0;i<16;i++){const ang=i/16*TAU+t*3;ellipse(c,500+Math.cos(ang)*170,282+Math.sin(ang)*100,2,2,a);}
    label(c,'Illustrative field geometry',210,130,365,220,a);label(c,'Conceptual central region',818,440,560,300,a);
  }
  function reactor(c,cfg,t,a){
    if(cfg.variant==='satellite'){orbit(c,{...cfg,variant:'navigation'},t,a);return;}
    glow(c,500,270,230,a,.1);
    const isFin=cfg.variant==='fins',count=isFin?15:7;
    rect(c,425,155,150,270,grad(c,425,0,575,0,[[0,'#7a91a4'],[.28,'#b8c6cf'],[.5,'#4d6a82'],[1,'#243e59']]),20);
    ellipse(c,500,155,75,23,'#a8bbc8','#d9e2e8');ellipse(c,500,425,75,23,'#344e66','#738ba0');
    for(let i=0;i<count;i++){const y=174+i*(isFin?16:34);if(isFin)rect(c,398,y,204,8,'#58738a',3);else {ellipse(c,500,y,68,18,null,rgba(a,.35));for(let k=0;k<5;k++)ellipse(c,450+k*24,y,4,4,rgba(a,.55));}}
    if(cfg.variant==='radial')for(let i=0;i<8;i++){const x=320+i*48;line(c,[[500,180],[x,100],[x,380]],'#7fa0b2',5);}
    if(cfg.variant==='loop'){c.beginPath();c.roundRect(285,130,425,300,55);c.strokeStyle=rgba(a,.35);c.lineWidth=8;c.stroke();for(let i=0;i<12;i++){const an=i/12*TAU+t*2;ellipse(c,500+Math.cos(an)*200,280+Math.sin(an)*145,4,4,a);}}
    if(cfg.variant==='pebbles')for(let i=0;i<40;i++){const x=445+rnd(i,7)*110,y=175+rnd(i,8)*220;ellipse(c,x,y,7,7,grad(c,x-5,y-5,x+5,y+5,[[0,'#c8cbd3'],[1,'#5c708a']]),'#879eae');}
    for(let i=0;i<20;i++){const f=(i/20+t*.65)%1;ellipse(c,480+Math.sin(i*5)*15,190+f*214,2,2,rgba(a,Math.sin(f*Math.PI)*.8));}label(c,'Power-system illustration',180,160,430,230,a);label(c,'Thermal pathway · schematic',820,400,570,350,a);
  }
  function event(c,cfg,t,a){
    terrain(c,cfg,t);const v=cfg.variant,p=ease((t-.05)/.8),cx=cfg.id==='nagasaki'?550:480,base=cfg.setting==='ocean'?382:430;
    if(v==='aurora'){planet(c,510,700,410,t,a);for(let i=0;i<9;i++)ellipse(c,530,286,60+i*25+t*50,21+i*9,null,rgba(i%2?a:'#bba9f4',.24-i*.02));glow(c,530,270,190,a,.24);return;}
    if(v==='drift'){for(let i=0;i<110;i++){const tt=(i/110+t*.5)%1,x=170+tt*670,y=190+Math.sin(i*7)*45+tt*200;ellipse(c,x,y,3+rnd(i,3)*4,2,rgba(a,(1-tt)*.32));}label(c,'Conceptual dispersal, no forecast',700,135,560,250,a);return;}
    if(p<.15&&v==='tower'){line(c,[[cx-16,base],[cx,base-100],[cx+16,base]],'#7b8ca0',2);for(let i=0;i<7;i++)line(c,[[cx-13+i,base-i*13],[cx+13-i,base-i*13]],'#6f8195');}
    const height=(v==='fireball'?110:v==='column'?245:235)*p,width=(v==='fireball'?120:155)*p;
    if(p>0){
      glow(c,cx,base-height,200*p,a,.32);
      for(let i=0;i<4;i++)ellipse(c,cx,base+5,50+p*250+i*22,8+p*18+i*4,null,rgba(a,.13-i*.024));
      if(v==='rings'){for(let i=0;i<7;i++)ellipse(c,cx,base-15,20+(p+i/10)%1*380,10+(p+i/10)%1*140,null,rgba(a,.35-i*.03));glow(c,cx,base-25,80,a,.45);}
      else if(v==='fireball'){ellipse(c,cx,base-height,70+width,60+width,grad(c,cx,base-height-width,cx,base,[[0,'#f9e4c3'],[.35,'#eab287'],[1,'#856377']]));}
      else{
        poly(c,[[cx-28*p,base],[cx-35*p,base-height],[cx+36*p,base-height],[cx+32*p,base]],grad(c,cx-30,0,cx+30,0,[[0,'#536079'],[.5,'#b8a6a7'],[1,'#71667c']]));
        for(let i=0;i<18;i++){const ang=i/18*TAU,rr=width*(.5+rnd(i,seed(cfg.id))*.45),xx=cx+Math.cos(ang)*rr,yy=base-height+Math.sin(ang)*width*.35,r=(29+rnd(i,11)*27)*p;ellipse(c,xx,yy,r*1.3,r,grad(c,xx,yy-r,xx,yy+r,[[0,'#ecd1b7'],[.32,'#c4adb0'],[1,'#6e6b87']]));}
        for(let i=0;i<9;i++){const yy=base-i*height/10;ellipse(c,cx+Math.sin(i*8)*8,yy,(14+i*1.5)*p,18*p,rgba('#b4a7ad',.38));}
        if(v==='column'){for(let i=0;i<12;i++){const xx=cx+(i-5.5)*18*p;line(c,[[xx,base-30],[xx+(i-5.5)*5,base-height*.85+Math.abs(i-5.5)*10]],rgba('#cee2eb',.38),3);}}
      }
    }
    label(c,v==='column'?'Water-column illustration':'Schematic atmospheric sequence',200,150,cx-65,base-height,a);
  }
  function geography(c,cfg,t,a){
    const water=cfg.setting==='ocean'||cfg.variant==='islands';rect(c,0,0,1000,600,grad(c,0,0,1000,600,[[0,water?'#375975':'#514e63'],[1,water?'#122d48':'#222e44']]));
    if(cfg.variant==='islands'){for(let j=0;j<2;j++){const x=370+j*210,y=225+j*100;poly(c,[[x-150,y-75],[x-10,y-95],[x+125,y+12],[x+100,y+65],[x-20,y+45]],'#879faf','#c2d1d7');poly(c,[[x-130,y-72],[x-5,y-83],[x+110,y+8],[x+30,y+10]],'#c5d0d7');}for(let i=0;i<15;i++)ellipse(c,80+rnd(i,7)*850,70+rnd(i,9)*470,15,4,rgba('#d7e5ed',.15));}
    else if(water){for(let j=0;j<5;j++)ellipse(c,500,310,240+j*17,125+j*10,null,rgba('#8bc9c4',.1));ellipse(c,500,310,232,119,'#758d82');ellipse(c,500,310,205,100,'#4a9092');ellipse(c,500,310,180,84,'#316679');}
    else for(let i=0;i<28;i++){const x=60+rnd(i,seed(cfg.id))*870,y=90+rnd(i+30,seed(cfg.id))*430,r=16+rnd(i,6)*27;ellipse(c,x,y,r*1.3,r*.6,'#68707f','#96929a');ellipse(c,x,y+2,r,r*.44,'#343f55');}
    for(let j=0;j<9;j++){c.beginPath();for(let x=0;x<1000;x+=10){const y=40+j*70+Math.sin(x*.012+j)*17;x?c.lineTo(x,y):c.moveTo(x,y);}c.strokeStyle=rgba('#c1bec4',.08);c.stroke();}
    label(c,cfg.caption,240,100,480,240,a);ellipse(c,510,320,15+t*25,8+t*10,null,rgba(a,.5));
  }
  function atomic(c,cfg,t,a){
    const v=cfg.variant;
    if(v==='comparison'){[55,85,130,185].forEach((r,i)=>{const x=140+i*230;ellipse(c,x,350-r*.3,r*.53*(.25+.75*ease(t)),r*.53*(.25+.75*ease(t)),grad(c,x-r,220,x+r,400,[[0,'#ddc5b8'],[1,'#705c77']]),a);line(c,[[x-65,420],[x+65,420]],rgba(a,.3));text(c,['Smaller','Moderate','Larger','Largest'][i],x,452,14,'#d9d9e3','center')});text(c,'Qualitative scale · no calculated damage zones',500,150,18,a,'center');return;}
    const centers=v==='paired'?[[365,280],[650,280]]:[[500,280]];
    centers.forEach(([x,y],k)=>{
      glow(c,x,y,180,a,.12);
      for(let i=0;i<4;i++)ellipse(c,x,y,130,48,null,rgba(a,.25),i*.78+t*.12);
      for(let i=0;i<24;i++){const an=i*2.4,rr=Math.sqrt(i)*6;ellipse(c,x+Math.cos(an)*rr,y+Math.sin(an)*rr,10,10,grad(c,x-20,y-20,x+20,y+20,[[0,'#e9d7ce'],[1,i%2?'#ab8496':'#7792be']]),rgba('#fff',.15));}
      for(let i=0;i<10;i++){const an=i/10*TAU,rr=55+((t+i/10)%1)*150;ellipse(c,x+Math.cos(an)*rr,y+Math.sin(an)*rr*.6,3,3,a);}
    });
    if(v==='concentric'||v==='pulse')for(let i=0;i<5;i++)ellipse(c,500,280,80+i*35+t*22,80+i*35+t*22,null,rgba(a,.12));
    label(c,'Abstract process illustration',230,125,455,240,a);
  }
  function earth(c,cfg,t,a){
    const phase=clamp(t)*5.999,idx=Math.floor(phase),p=phase-idx;
    const left=170,right=795,top=175,bottom=490;
    poly(c,[[left,top],[right,top],[right+75,top-55],[left+75,top-55]],'#8d9e9a','#b5c3b9');
    poly(c,[[right,top],[right+75,top-55],[right+75,bottom-50],[right,bottom]],'#344453','#667582');
    for(let i=0;i<6;i++){const y=top+i*(bottom-top)/6;const colors=['#8c8581','#797581','#69677a','#555a70','#48536a','#3d4d63'];poly(c,[[left,y],[right,y],[right,y+54],[left,y+54]],colors[i]);for(let x=left;x<right;x+=16)line(c,[[x,y+Math.sin(x*.04+i)*2],[x+16,y+Math.sin((x+16)*.04+i)*2]],rgba('#ddd4cc',.12));}
    for(let i=0;i<100;i++){const x=left+rnd(i,14)*(right-left),y=top+rnd(i,19)*(bottom-top);line(c,[[x,y],[x+4+rnd(i,3)*6,y+2]],rgba('#d5cbc5',.14));}
    const cx=500,cy=411,r=idx===0?4:idx===1?mix(6,42,ease(p)):idx===2?mix(42,73,ease(p)):73;
    rect(c,cx-5,top,10,cy-top,'#2b394c');line(c,[[cx+5,top],[cx+5,cy]],rgba('#bac5ce',.5));
    if(idx>0){glow(c,cx,cy,r*1.5,a,idx<3?.42:.08);ellipse(c,cx,cy,r,r*.67,idx<3?grad(c,cx,cy-r,cx,cy+r,[[0,'#e2ab87'],[.55,'#8a5762'],[1,'#382b41']]):'#263247',rgba(a,.5));}
    if(idx>=3){const rise=idx===3?ease(p):1,yy=mix(cy-30,top+20,rise);poly(c,[[cx-40,cy],[cx-35,yy],[cx+40,yy],[cx+55,cy]],'#3b3c4e');for(let i=0;i<50;i++){const x=cx-35+rnd(i,7)*80,y=yy+rnd(i,4)*(cy-yy);poly(c,[[x,y],[x+8,y-4],[x+15,y+5],[x+4,y+10]],i%2?'#776c79':'#5a5b70');}}
    if(idx>=4){const rr=idx===4?ease(p):1;ellipse(c,cx,top-10,82*rr,22*rr,'#4e5f66','#8e9d96');ellipse(c,cx,top-8,65*rr,16*rr,'#394c58');}
    if(idx===0){poly(c,[[cx-22,top-20],[cx,top-105],[cx+22,top-20]],'#617887','#b8cbd3');for(let i=0;i<5;i++)line(c,[[cx-16+i*3,top-30-i*15],[cx+16-i*3,top-30-i*15]],'#c5d1d1');}
    label(c,'Desert surface',155,102,310,152,a);label(c,idx<3?'Subsurface region':'Rubble and cavity',928,390,570,410,a);label(c,'Layered geology',125,365,270,344,a);
    text(c,['Preparation','Initial change','Expansion','Collapse','Surface response','Final section'][idx],500,552,18,'#e1d5cd','center');
  }
  function signals(c,cfg,t,a){
    const v=cfg.variant,s=seed(cfg.id);glow(c,500,275,250,a,.12);
    if(['portal','portal2','gravity','cloak','perception','quantum'].includes(v)){
      for(let i=0;i<12;i++)ellipse(c,500,280,90+i*8,110+i*5,null,rgba(i%2?a:'#deaed0',.12+i*.015),Math.sin(t*2+i)*.18);
      if(v==='cloak')craft(c,500,280,50,'saucer',a);
      else if(v==='quantum'){for(let j=0;j<2;j++){glow(c,390+j*220,280,70,a,.3);ellipse(c,390+j*220,280,12,12,a);}}
      else for(let i=0;i<40;i++){const an=i/40*TAU+t*3,rr=100+rnd(i,s)*60;ellipse(c,500+Math.cos(an)*rr,280+Math.sin(an)*rr,2,2,a);}
      label(c,'Conceptual field · artistic geometry',170,125,430,210,a);
    }else if(v==='robot'){
      c.save();c.translate(500,220);rect(c,-31,-52,62,43,'#afbfcc',12);rect(c,-22,-40,44,15,'#1e3552',4);rect(c,-40,0,80,95,'#647f9a',12);
      for(let sign of [-1,1]){const bend=Math.sin(t*TAU+sign)*18;line(c,[[sign*40,20],[sign*78,72+bend],[sign*100,100]],'#a3b7ca',13);line(c,[[sign*23,90],[sign*42,152+bend],[sign*50,213]],'#8a9fb6',16);[ [sign*40,20],[sign*78,72+bend],[sign*23,90],[sign*42,152+bend] ].forEach(([x,y])=>ellipse(c,x,y,9,9,'#28415d',a));rect(c,sign*50-17,207,45,12,'#a5b7c7',4);}c.restore();ellipse(c,500,440,110,16,rgba(a,.1));
    }else if(v==='field'){
      for(const yy of [230,325]){poly(c,[[205,yy],[740,yy-45],[792,yy-23],[250,yy+24]],'#6c819c','#9caec0');}
      for(let i=0;i<11;i++){const x=260+i*40;ellipse(c,x,275-(x-260)*.08,12,70,null,rgba(a,.15));}
      const f=ease(t);rect(c,280+f*420,263-f*34,34,22,'#c6d7e0',3);label(c,'Abstract field sequence',170,125,415,270,a);
    }else if(v==='uncertain'){
      terrain(c,cfg,t);for(let i=0;i<5;i++)ellipse(c,500,260,65+i*18,65+i*18,null,rgba(a,.13),t*.2);text(c,'?',500,286,80,a,'center');glow(c,500,260,155,a,.1+.08*Math.sin(t*4));label(c,'Attribution unresolved',240,135,490,230,a);
    }else if(v==='imaging'){
      terrain(c,cfg,t);for(let row=0;row<3;row++)for(let col=0;col<5;col++){const xx=230+col*115,yy=145+row*100;rect(c,xx,yy,103,88,rgba('#253d60',.45),4);line(c,[[xx,yy],[xx+103,yy],[xx+103,yy+88],[xx,yy+88],[xx,yy]],rgba(a,.35));for(let k=0;k<6;k++)rect(c,xx+9+k*15,yy+15+rnd(k+col,8)*20,9,40,'#627995');}rect(c,230+Math.floor(t*4.999)*115,145,103,288,rgba(a,.08),4);label(c,'Conceptual observation mosaic',180,100,395,158,a);
    }else if(v==='dish'||v==='microwave'||v==='reflection'){
      poly(c,[[210,392],[275,225],[330,392]],'#5d748f','#97afc5');ellipse(c,280,220,72,32,'#a1b7c5','#d8e5e8',-.5);line(c,[[277,220],[316,160]],'#afc3d0',4);
      for(let i=0;i<8;i++){c.beginPath();c.ellipse(300,230,70+i*45+t*35,70+i*35+t*20,0,-.6,.6);c.strokeStyle=rgba(a,.35-i*.035);c.lineWidth=1.3;c.stroke();}
      if(v==='reflection')airframe(c,760,245,.48,'wing',a);else rect(c,730,215,65,115,'#425b76',10);
      label(c,'Schematic field representation',200,125,290,219,a);
    }else if(v==='saucer'){terrain(c,{...cfg,setting:'desert'},t);craft(c,500,275+Math.sin(t*8)*8,150,'saucer',a);label(c,'Experimental circular airframe',180,135,470,275,a);}
    else{
      const isCity=['imaging','devices','cascade'].includes(v),n=v==='swarm'?28:9;
      const points=Array.from({length:n},(_,i)=>{const an=i/n*TAU;return [500+Math.cos(an)*(n>10?130+rnd(i,s)*90:225),280+Math.sin(an)*(n>10?85+rnd(i+4,s)*80:145)];});
      for(let i=0;i<n;i++){const [x,y]=points[i],next=points[(i+3)%n];line(c,[[x,y],next],rgba(a,.12));line(c,[[x,y],[500,280]],rgba(a,.09));const k=(t+i/n)%1;ellipse(c,mix(x,next[0],k),mix(y,next[1],k),2.5,2.5,rgba(a,.6));
        if(isCity){rect(c,x-18,y-24,36,48,'#425d7c',5);rect(c,x-13,y-18,26,31,'#162d49',2);line(c,[[x-8,y+20],[x+8,y+20]],a,2);}else {ellipse(c,x,y,8,8,'#395570',a);ellipse(c,x,y,2.5,2.5,'#dce8f2');}}
      if(v==='mind'){for(let j=0;j<5;j++)ellipse(c,500+Math.sin(j*2)*20,270+j*8,65,43,null,rgba(a,.45),j*.4);}else {ellipse(c,500,280,48,48,'#1d3653',rgba(a,.6));ellipse(c,500,280,33,33,null,rgba(a,.3));}
      label(c,'Illustrative connections',160,105,points[2][0],points[2][1],a);
    }
  }
  function laboratory(c,cfg,t,a,params={}){
    const v=cfg.variant,values=Object.values(params).filter(Number.isFinite),factor=values.length?clamp(Math.log10(1+Math.abs(values[0]))/8,.1,1):.5;
    if(v==='warp'){warp(c,cfg,t,a);return;}
    if(v==='plasma'||v==='mhd'){engine(c,{...cfg,variant:v==='plasma'?'torus':'vasimr'},(.25+t*.7+factor*.1)%1,a);return;}
    if(v==='cloak'){for(let j=0;j<17;j++){c.beginPath();for(let x=70;x<950;x+=8){const yy=70+j*26+Math.sin((x-500)/115)*Math.exp(-(((x-500)/160)**2))*(j-8)*7; x===70?c.moveTo(x,yy):c.lineTo(x,yy);}c.strokeStyle=rgba(a,.2);c.stroke();}for(let i=0;i<20;i++){const x=70+((i/20+t*.3)%1)*870,y=150+(i%9)*28+Math.sin((x-500)/115)*Math.exp(-(((x-500)/160)**2))*((i%9)-4)*8;ellipse(c,x,y,2,2,a);}craft(c,500,280,70,'saucer',a);return;}
    glow(c,500,275,240,a,.12);
    if(v==='plates'){for(const x of [390,575])poly(c,[[x,170],[x+30,145],[x+30,360],[x,385]],'#9cb0c4','#d3dfea');for(let i=0;i<9;i++){const y=180+i*23;line(c,[[426,y],[570,y]],rgba(a,.25));ellipse(c,430+((t+i/9)%1)*135,y,3,3,a);}label(c,'Illustrative field lines',210,115,445,208,a);}
    else if(v==='stack'){
      for(let i=0;i<14;i++){const x=310+i*(24+Math.sin(t*TAU)*factor*2);rect(c,x,205,17,125,grad(c,x,205,x+17,330,[[0,'#c6cfdb'],[.5,'#677c9b'],[1,'#acb8c9']]),4);ellipse(c,x+8,205,9,4,'#e2e4ee');}label(c,'Oscillating stack · schematic',225,120,490,230,a);
    }else if(v==='disc'){
      for(let i=0;i<3;i++)ellipse(c,500,325-i*22,145,45,grad(c,370,250,620,365,[[0,'#c2d2db'],[.5,'#718da6'],[1,'#354c6c']]),'#adc3d7');
      for(let i=0;i<20;i++){const an=i/20*TAU+t*4;ellipse(c,500+Math.cos(an)*120,280+Math.sin(an)*36,3,2,a);}craft(c,500,175-factor*20,21,'capsule',a);
    }else if(v==='waves'){
      for(let k=0;k<2;k++){const x=365+k*265;ellipse(c,x,275,30,50,'#6a84a1','#b0c4d3');glow(c,x,275,60,a,.2);for(let i=0;i<7;i++){const r=35+((i/7+t*.35)%1)*180;ellipse(c,x,275,r,r*.7,null,rgba(a,(1-r/220)*.22));}}
    }else {
      for(let i=0;i<6;i++)ellipse(c,500,280,110+i*11,65+i*8,null,rgba(a,.17+i*.025),-.28+i*.06);
      if(v==='vacuum'){poly(c,[[385,215],[565,244],[565,318],[385,350]],grad(c,380,200,570,350,[[0,'#b5c7d5'],[.5,'#496882'],[1,'#8298b0']]),'#bdd0db');}
      else craft(c,500,280,78,'saucer',a);
      for(let i=0;i<45;i++){const an=i/45*TAU+t*4*(.5+factor),r=140+Math.sin(i*2+t*4)*18;ellipse(c,500+Math.cos(an)*r,280+Math.sin(an)*r*.6,1.5,1.5,a);}
    }
    label(c,'Concept visualization',810,430,580,315,a);
  }
  const renderers={encounter,aircraft,naval,orbit,signals,engine,sail,warp,reactor,event,geography,atomic,earth,laboratory};
  function render(canvas,key,t=0,options={}){
    const cfg=manifest[key];if(!cfg)throw new Error('Missing scene design: '+key);
    const c=canvas.getContext('2d');if(!c)return;
    c.save();c.setTransform(canvas.width/1000,0,0,canvas.height/600,0,0);c.globalAlpha=1;c.globalCompositeOperation='source-over';c.setLineDash([]);
    c.clearRect(0,0,1000,600);
    const previousAnnotations=annotations;if(options.thumbnail)annotations=false;
    const a=palettes[cfg.group][2];sky(c,cfg,t);
    c.save();
    if(cfg.group==='lab'&&options.params){const values=Object.values(options.params).filter(Number.isFinite);const scale=values.length?.92+values.reduce((sum,v)=>sum+Math.atan(Math.log10(1+Math.abs(v)))/Math.PI,0)/values.length*.22:1;c.translate(500,280);c.scale(scale,scale);c.translate(-500,-280);}
    renderers[cfg.type](c,cfg,clamp(t),a,options.params);c.restore();
    const g=c.createLinearGradient(0,480,0,600);g.addColorStop(0,'#10192900');g.addColorStop(1,'#0d1724cc');rect(c,0,480,1000,120,g);
    if(!options.thumbnail&&annotations){text(c,cfg.caption,30,574,13,'#bdc9d8');text(c,'ILLUSTRATION / NOT TO SCALE',970,574,10,'#a5b4c8','right');}
    annotations=previousAnnotations;c.restore();canvas.dataset.sceneKey=key;canvas.dataset.sceneDesign=cfg.type;
  }
  window.ObservatoryArt={manifest,render,setAnnotations(value){annotations=Boolean(value)},get annotations(){return annotations},palettes};
})();
