const progress=document.getElementById('progress');
function onScroll(){
  const h=document.documentElement;
  const sc=(h.scrollTop)/(h.scrollHeight-h.clientHeight);
  progress.style.width=(sc*100)+'%';
}
document.addEventListener('scroll',onScroll,{passive:true});

const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); } });
},{threshold:.12});
document.querySelectorAll('.reveal,.versus,.simp,.tl-item').forEach(el=>io.observe(el));

const ioSec=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in-view'); });
},{threshold:.15});
document.querySelectorAll('section,.timeline,.net-wrap').forEach(el=>ioSec.observe(el));

const dotLinks=[...document.querySelectorAll('.dots a')];
const ioDot=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const id=e.target.id;
      dotLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));
    }
  });
},{threshold:.5});
[...document.querySelectorAll('main section, header')].forEach(el=>ioDot.observe(el));

(function(){
  const path=document.getElementById('heroCurve');
  const pt=document.getElementById('heroPt');
  if(!path||!pt||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const len=path.getTotalLength();
  let t=0;
  function step(){
    t=(t+0.0016)%1;
    const p=path.getPointAtLength(t*len);
    pt.setAttribute('cx',p.x);pt.setAttribute('cy',p.y);
    pt.setAttribute('opacity','0.85');
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();

(function(){
  const bF=document.getElementById('btnFig'),bE=document.getElementById('btnEq');
  const fig=document.getElementById('figLayer'),eq=document.getElementById('eqLayer');
  const note=document.getElementById('feNote');
  function show(which){
    const f=which==='fig';
    bF.classList.toggle('on',f);bE.classList.toggle('on',!f);
    fig.style.opacity=f?'1':'0';eq.style.opacity=f?'0':'1';
    note.innerHTML=f?'Cada punto P de la curva queda descrito por dos segmentos, <span class="eq">x</span> e <span class="eq">y</span>.'
                    :'La misma curva, ahora dicha como una relación entre <span class="eq">x</span> e <span class="eq">y</span>.';
  }
  bF.addEventListener('click',()=>show('fig'));
  bE.addEventListener('click',()=>show('eq'));
})();

function cameo(opts){
  const {profile,id}=opts;
  let hatch='';
  for(let x=30;x<230;x+=8){hatch+='<line x1="'+x+'" y1="10" x2="'+(x-55)+'" y2="230"/>';}
  return '<svg viewBox="0 0 240 236" role="img" aria-label="Retrato estilizado de perfil">'
    +'<defs><radialGradient id="g_'+id+'" cx="0.42" cy="0.38" r="0.85"><stop offset="0" stop-color="#F1E8D6"/><stop offset="1" stop-color="#E2D6BF"/></radialGradient>'
    +'<clipPath id="c_'+id+'"><ellipse cx="120" cy="116" rx="94" ry="106"/></clipPath></defs>'
    +'<ellipse cx="120" cy="116" rx="94" ry="106" fill="url(#g_'+id+')" stroke="#22384A" stroke-width="2"/>'
    +'<ellipse cx="120" cy="116" rx="85" ry="97" fill="none" stroke="#9A7B4F" stroke-width="1.1" opacity=".8"/>'
    +'<ellipse cx="120" cy="116" rx="82" ry="94" fill="none" stroke="#9A7B4F" stroke-width="0.5" opacity=".45"/>'
    +'<g clip-path="url(#c_'+id+')"><g stroke="#22384A" stroke-width="0.5" opacity="0.07">'+hatch+'</g>'+profile+'</g></svg>';
}
const descartesProfile=
  '<path d="M174 222 C176 188 178 150 178 120 C178 86 174 58 152 44 C136 34 116 36 102 50 '
  +'C92 60 88 74 87 86 C86 92 88 95 85 99 C80 103 71 110 68 116 C66 119 70 121 76 122 '
  +'C82 123 84 124 83 128 C82 131 79 132 79 135 C79 138 82 139 82 142 C82 147 78 150 82 156 '
  +'C85 160 92 163 99 166 C104 168 106 172 106 180 C106 196 102 210 96 222 Z" fill="#22384A"/>';
const fermatProfile=
  '<path d="M176 222 C178 190 180 152 179 122 C179 88 175 60 153 46 C137 35 116 37 103 51 '
  +'C93 61 89 76 88 88 C87 93 89 96 86 100 C81 104 72 111 69 117 C67 120 71 122 77 123 '
  +'C83 124 86 125 85 129 C84 132 81 133 81 136 C81 139 84 140 84 143 C84 148 80 151 84 157 '
  +'C87 161 94 164 101 167 C106 169 108 173 108 181 C108 198 104 211 98 222 Z" fill="#22384A"/>';
document.getElementById('cameoD').innerHTML=cameo({id:'d',profile:descartesProfile});
document.getElementById('cameoF').innerHTML=cameo({id:'f',profile:fermatProfile});

/* ---------- enhanced correspondence network ---------- */
(function(){
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nodes=[
    {id:'mer',x:230,y:178,r:34,label:'Mersenne',hub:true,role:'El centro de la red',info:'Su celda en París era una oficina de correos del conocimiento: recibía, copiaba y reenviaba ideas entre matemáticos que no se conocían en persona.'},
    {id:'des',x:96,y:74,r:26,label:'Descartes',role:'Países Bajos',info:'Enviaba y defendía su método desde los Países Bajos, casi siempre a través de Mersenne.'},
    {id:'fer',x:364,y:74,r:26,label:'Fermat',role:'Toulouse',info:'Difundía sus resultados casi solo por carta, desde Toulouse, sin apenas publicar.'},
    {id:'rob',x:66,y:286,r:19,label:'Roberval',role:'París',info:'Corresponsal activo en problemas de tangentes y cuadraturas.'},
    {id:'dsg',x:230,y:332,r:19,label:'Desargues',role:'Lyon · París',info:'Geómetra cuyo trabajo proyectivo también circulaba por la red.'},
    {id:'pas',x:392,y:286,r:19,label:'Pascal',role:'Clermont · París',info:'Más joven, entró a la conversación a través del mismo círculo epistolar.'}
  ];
  const edges=[['mer','des'],['mer','fer'],['mer','rob'],['mer','dsg'],['mer','pas'],['des','rob'],['fer','pas']];
  const NS='http://www.w3.org/2000/svg';
  const gE=document.getElementById('edges'),gN=document.getElementById('nodes'),info=document.getElementById('netInfo');
  const byId=Object.fromEntries(nodes.map(n=>[n.id,n]));
  const neigh=Object.fromEntries(nodes.map(n=>[n.id,new Set()]));
  const edgeEls=[];

  edges.forEach(([a,b])=>{
    const A=byId[a],B=byId[b];
    neigh[a].add(b);neigh[b].add(a);
    const mx=(A.x+B.x)/2, my=(A.y+B.y)/2;
    // bow the curve gently away from the hub centre for an organic look
    const dx=mx-230, dy=my-178, d=Math.hypot(dx,dy)||1;
    const bow=18, cx=mx+(dx/d)*bow, cy=my+(dy/d)*bow;
    const p=document.createElementNS(NS,'path');
    const dStr='M'+A.x+' '+A.y+' Q '+cx.toFixed(1)+' '+cy.toFixed(1)+' '+B.x+' '+B.y;
    p.setAttribute('d',dStr);p.setAttribute('class','net-edge');
    p.dataset.a=a;p.dataset.b=b;
    gE.appendChild(p);
    const len=p.getTotalLength();
    p.style.transition='stroke-dashoffset 1.5s ease, opacity .3s, stroke-width .3s, stroke .3s';
    p.style.strokeDasharray=len;p.style.strokeDashoffset=reduce?0:len;
    edgeEls.push({el:p,a,b,len});
  });

  // travelling "letters" along the hub edges
  const letters=[];
  if(!reduce){
    edgeEls.forEach((e,i)=>{
      const dot=document.createElementNS(NS,'circle');
      dot.setAttribute('r','2.6');dot.setAttribute('class','net-letter');dot.style.opacity='0';
      gE.appendChild(dot);
      letters.push({dot,e,phase:Math.random(),speed:0.0009+Math.random()*0.0006});
    });
  }

  nodes.forEach((n,i)=>{
    const g=document.createElementNS(NS,'g');g.setAttribute('class','net-node');g.setAttribute('tabindex','0');
    g.setAttribute('role','button');g.setAttribute('aria-label',n.label);
    g.dataset.id=n.id;
    g.style.opacity='0';g.style.transition='opacity .5s ease';g.style.transitionDelay=(i*0.1)+'s';
    const halo=document.createElementNS(NS,'circle');
    halo.setAttribute('cx',n.x);halo.setAttribute('cy',n.y);halo.setAttribute('r',n.r+9);halo.setAttribute('class','halo');
    const c=document.createElementNS(NS,'circle');
    c.setAttribute('cx',n.x);c.setAttribute('cy',n.y);c.setAttribute('r',n.r);c.setAttribute('class','disc');
    c.setAttribute('fill',n.hub?'#9A7B4F':'#EFE7D8');
    c.setAttribute('stroke',n.hub?'#22384A':'#9A7B4F');c.setAttribute('stroke-width',n.hub?2.4:1.5);
    g.appendChild(halo);g.appendChild(c);
    if(n.hub){
      const ring=document.createElementNS(NS,'circle');
      ring.setAttribute('cx',n.x);ring.setAttribute('cy',n.y);ring.setAttribute('r',n.r-5);
      ring.setAttribute('fill','none');ring.setAttribute('stroke','#F4EEE3');ring.setAttribute('stroke-width','1');ring.setAttribute('opacity','.6');
      g.appendChild(ring);
    }
    const t=document.createElementNS(NS,'text');
    t.setAttribute('x',n.x);t.setAttribute('text-anchor','middle');t.setAttribute('class','lbl');
    t.textContent=n.label;
    if(n.hub){t.setAttribute('y',n.y+4);t.setAttribute('fill','#fff');t.setAttribute('font-size','13');t.style.fill='#fff';}
    else{t.setAttribute('y',n.y+n.r+15);}
    g.appendChild(t);
    gN.appendChild(g);

    function highlight(){
      info.innerHTML='<span class="role">'+n.role+'</span><b>'+n.label+'</b> — '+n.info;
      document.querySelectorAll('.net-node').forEach(x=>{
        const xid=x.dataset.id;
        x.classList.toggle('act',xid===n.id);
        x.classList.toggle('dim', xid!==n.id && !neigh[n.id].has(xid));
      });
      edgeEls.forEach(({el,a,b})=>{
        const on=(a===n.id||b===n.id);
        el.classList.toggle('hot',on);el.classList.toggle('dim',!on);
      });
    }
    function clear(){
      if(pinned){byId._render(pinned);return;}
      document.querySelectorAll('.net-node').forEach(x=>x.classList.remove('act','dim'));
      edgeEls.forEach(({el})=>el.classList.remove('hot','dim'));
      info.innerHTML='<span class="role">La red epistolar</span><b>Mersenne</b> al centro — pasa el cursor o toca cada figura.';
    }
    g._highlight=highlight;g._clear=clear;
    g.addEventListener('mouseenter',highlight);
    g.addEventListener('mouseleave',clear);
    g.addEventListener('focus',highlight);
    g.addEventListener('blur',clear);
    g.addEventListener('click',()=>{pinned=(pinned===n.id?null:n.id);pinned?highlight():clear();});
  });

  let pinned=null;
  byId._render=function(id){const g=[...gN.children].find(x=>x.dataset.id===id);if(g)g._highlight();};

  // reveal: draw edges + pop nodes + start letters when scrolled into view
  const wrap=document.querySelector('.net-wrap');
  const obs=new IntersectionObserver((es)=>es.forEach(e=>{
    if(e.isIntersecting){
      gN.querySelectorAll('.net-node').forEach(g=>g.style.opacity='1');
      if(!reduce){
        edgeEls.forEach((e2,i)=>setTimeout(()=>{e2.el.style.strokeDashoffset=0;},120+i*90));
        setTimeout(()=>letters.forEach(l=>l.dot.style.opacity='0.9'),1400);
        running=true;requestAnimationFrame(tick);
      }
      obs.disconnect();
    }
  }),{threshold:.3});
  obs.observe(document.getElementById('netSvg'));

  let running=false;
  function tick(){
    if(!running)return;
    letters.forEach(l=>{
      l.phase=(l.phase+l.speed)%1;
      const pt=l.e.el.getPointAtLength(l.phase*l.e.len);
      l.dot.setAttribute('cx',pt.x);l.dot.setAttribute('cy',pt.y);
    });
    requestAnimationFrame(tick);
  }
})();
