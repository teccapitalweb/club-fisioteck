/* Visor 3D local: carga diferida al entrar al Atlas; mantiene el acceso del Club. */
(function(){
  'use strict';
  const page=document.getElementById('page-atlas'),frame=document.getElementById('atlas3DFrame');
  if(!page||!frame)return;
  function allowed(){return (typeof memberIsPaid!=='undefined'&&memberIsPaid)||window.ftVistaAdmin===true;}
  function tema(){try{const t=document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';const d=frame.contentDocument;if(d&&d.documentElement)d.documentElement.setAttribute('data-theme',t);}catch(_){}}
  frame.addEventListener('load',tema);
  new MutationObserver(tema).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  function verFicha(zona){const det=document.getElementById('atlasStudy');if(!det||typeof window.showMuscle!=='function')return;window.showMuscle(zona);det.open=true;setTimeout(()=>{const d=document.getElementById('atlasInfo')||det;d.scrollIntoView({behavior:'smooth',block:'start'});},120);}
  // Al tocar una zona o un músculo en el visor, la ficha de abajo se actualiza sola (sin mover la pantalla)
  function actualizarFicha(d){
    if(typeof window.showMuscle!=='function'||!d||!d.zone)return;
    window.__atlasSinScroll=true;
    try{
      window.showMuscle(d.zone);
      if(d.muscle&&window.ftAtlas&&window.ftAtlas.porNombre){const m=window.ftAtlas.porNombre(d.structure);if(m&&document.getElementById('atFicha'))window.ftAtlas.ver(m.id,true);}
    }finally{window.__atlasSinScroll=false;}
    const t=document.getElementById('atlasFichaTit');if(t)t.textContent='Ficha muscular: '+(d.regionName||'');
  }
  function access(){if(frame.contentWindow)frame.contentWindow.postMessage({type:'ft:atlas:access',allowed:!!allowed()},location.origin);}
  function mount(){if(!page.classList.contains('active'))return;if(!frame.getAttribute('src'))frame.src=frame.dataset.src;else access();}
  window.addEventListener('message',event=>{
    if(event.origin!==location.origin||event.source!==frame.contentWindow)return;
    const data=event.data;
    if(data?.type==='ft:atlas:ready'){tema();access();}
    if(data?.type==='ft:atlas:ficha'&&allowed())verFicha(data.zone);
    if(data?.type==='ft:atlas:zone'&&allowed())actualizarFicha(data);
    if(data?.type==='ft:atlas:ficha'&&!allowed()&&typeof showPaywallOverlay==='function')showPaywallOverlay();
    if(data?.type==='ft:atlas:resize'&&Number.isFinite(data.height))frame.style.height=Math.max(400,Math.min(6000,data.height))+'px';
    if(data?.type==='ft:atlas:paywall'&&!allowed()&&typeof showPaywallOverlay==='function')showPaywallOverlay();
  });
  new MutationObserver(mount).observe(page,{attributes:true,attributeFilter:['class']});
  const show=window.showMuscle;
  if(typeof show==='function')window.showMuscle=function(){const r=show.apply(this,arguments);if(allowed()){const det=document.getElementById('atlasStudy');if(det){det.open=true;const sin=window.__atlasSinScroll;if(!sin)setTimeout(()=>{const d=document.getElementById('atlasInfo')||det;if(document.getElementById('page-atlas').classList.contains('active'))d.scrollIntoView({behavior:'smooth',block:'start'});},150);}}return r;};
  mount();
})();
