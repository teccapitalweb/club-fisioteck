/* Club FisioTeck — Aviso para todo el Club y «Clases en vivo pronto» (los configura el administrador en Configuración; los entrega el servidor).
   GET /api/config-publica (sin sesión). El aviso sale como una franja arriba, se puede cerrar y vuelve a salir solo si el texto cambia.
   Depende de index.html: WEBHOOK_URL. */
(function () {
  'use strict';
  const API = () => (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://localhost:3000' : WEBHOOK_URL;
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const hash = t => { let h = 0; for (let i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) | 0; return String(h); };
  const claveCerrado = () => 'ft_aviso_club_cerrado';

  const st = document.createElement('style');
  st.textContent = `
  #ftAvisoClub { position:sticky; top:0; z-index:60; display:flex; align-items:center; gap:12px; padding:10px 16px; font-size:.86rem; line-height:1.4; font-weight:600; color:#fff; background:linear-gradient(90deg,#0D5FA0,#159E92); }
  #ftAvisoClub.aviso { background:linear-gradient(90deg,#B45309,#D97706); }
  #ftAvisoClub span { flex:1; min-width:0; }
  #ftAvisoClub button { flex:none; width:28px; height:28px; border-radius:8px; border:0; cursor:pointer; background:rgba(255,255,255,.18); color:#fff; font-size:16px; line-height:1; }
  .ft-vivo-pronto { margin:0 0 18px; padding:22px 24px; border-radius:20px; background:linear-gradient(135deg,var(--accent-ghost),var(--surface)),var(--surface); border:1px solid var(--border-2); }
  .ft-vivo-pronto small { display:block; margin-bottom:6px; font:700 .66rem 'JetBrains Mono',monospace; letter-spacing:.16em; text-transform:uppercase; color:var(--accent); }
  .ft-vivo-pronto h3 { margin:0 0 6px; font-size:1.15rem; font-weight:800; } .ft-vivo-pronto p { margin:0; font-size:.9rem; color:var(--text-light); line-height:1.5; }`;
  document.head.appendChild(st);

  function pintarAviso(a) {
    let barra = document.getElementById('ftAvisoClub');
    const texto = a && a.activo ? String(a.texto || '') : '';
    let cerrado = ''; try { cerrado = localStorage.getItem(claveCerrado()) || ''; } catch (_) { /* sin almacenamiento */ }
    if (!texto || cerrado === hash(texto) || !auth.currentUser) { if (barra) barra.remove(); return; }
    if (!barra) {
      barra = document.createElement('div'); barra.id = 'ftAvisoClub'; barra.setAttribute('role', 'status');
      const host = document.querySelector('.main-content') || document.querySelector('.app-wrapper') || document.body;
      host.insertBefore(barra, host.firstChild);
    }
    barra.className = a.tono === 'aviso' ? 'aviso' : '';
    barra.innerHTML = '<span>' + esc(texto) + '</span><button type="button" aria-label="Cerrar aviso">&times;</button>';
    barra.querySelector('button').onclick = () => { try { localStorage.setItem(claveCerrado(), hash(texto)); } catch (_) { /* sin almacenamiento */ } barra.remove(); };
  }
  function pintarVivo(valor) {
    const pag = document.getElementById('page-courses-live'); if (!pag) return;
    let caja = document.getElementById('ftVivoPronto');
    if (valor !== true) { if (caja) caja.remove(); return; }
    if (caja) return;
    caja = document.createElement('div'); caja.id = 'ftVivoPronto'; caja.className = 'ft-vivo-pronto';
    caja.innerHTML = '<small>Muy pronto</small><h3>Nuevas clases en vivo</h3><p>Estamos preparando las próximas clases con especialistas. Te avisaremos en la campana en cuanto haya fecha.</p>';
    const cab = pag.querySelector('.page-header'); if (cab && cab.nextSibling) cab.parentNode.insertBefore(caja, cab.nextSibling); else pag.insertBefore(caja, pag.firstChild);
  }
  async function cargar() {
    try {
      const r = await fetch(API() + '/api/config-publica'), d = await r.json();
      if (!r.ok) return;
      pintarAviso(d.avisoGlobal); pintarVivo(d.clasesEnVivoPronto);
      window.ftConfigPublica = d;
    } catch (_) { /* sin servidor: no hay aviso */ }
  }
  auth.onAuthStateChanged(u => { if (u) setTimeout(cargar, 2500); else pintarAviso(null); });
  setInterval(() => { if (auth.currentUser && !document.hidden) cargar(); }, 5 * 60 * 1000);
  const pg = window.showPage;
  window.showPage = function (page) { const r = pg.apply(this, arguments); if (page === 'courses-live') setTimeout(() => pintarVivo(window.ftConfigPublica ? window.ftConfigPublica.clasesEnVivoPronto : null), 200); return r; };
})();
