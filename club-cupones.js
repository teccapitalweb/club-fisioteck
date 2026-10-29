/* Club FisioTeck — cupones de créditos (misma tarjeta que Zoorigen y Alintec Food).
   La administración crea una clave y la comparte por el canal de WhatsApp. Aquí, del lado de la persona:
   1) «Hay un cupón para ti»: avisa que HAY un cupón e invita a unirse al canal. NUNCA muestra la clave.
      Botones: Ahora no · Ya tengo la clave · Unirme al canal. Una sola tarjeta por visita, a lo más una vez al día y 3 veces por cupón,
      y solo cuando ya no hay otra ventana encima (bienvenida, recorrido, prueba gratuita…).
   2) «Lo sentimos»: cuando la clave era de un cupón que ya llegó a su límite de personas o que ya venció (ftCupones.sentimos).
   Lo decide el servidor (GET /api/creditos/cupon-disponible, POST /api/creditos/cupon); aquí solo se dibuja.
   Depende de index.html: auth, certFetch, showPage; de club-recorrido.js (ftCola) y club-creditos.js (ftCreditos). */
(function () {
  'use strict';
  const CANAL = 'https://whatsapp.com/channel/0029VbCICRYDp2Q2iNyLe92e';
  const MAX_AVISOS = 3, CADA_MS = 24 * 3600 * 1000;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = n => String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const RAYO = '<svg viewBox="0 0 24 24" fill="#FFF6DD" stroke="#5B3A00" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>';
  const CERRAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  const CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg>';
  const uid = () => (auth.currentUser || {}).uid || '';
  const almacen = { get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (_) { /* sin almacenamiento */ } } };

  // ---------- Decisión ----------
  const claveAviso = id => 'ft_cupon_aviso_' + uid() + '_' + id;
  function leerAviso(id) { try { const v = JSON.parse(almacen.get(claveAviso(id)) || 'null'); return v && typeof v === 'object' ? { n: Number(v.n) || 0, t: Number(v.t) || 0 } : { n: 0, t: 0 }; } catch (_) { return { n: 0, t: 0 }; } }
  function anotar(ids) { ids.forEach(id => { const a = leerAviso(id); almacen.set(claveAviso(id), JSON.stringify({ n: a.n + 1, t: Date.now() })); }); }
  function debeAvisar(d) {
    if (!d || d.hay !== true || !Array.isArray(d.ids) || !d.ids.length) return false;
    return d.ids.some(id => { const a = leerAviso(id); return a.n < MAX_AVISOS && Date.now() - a.t >= CADA_MS; });
  }

  // ---------- Tarjetas ----------
  function textoCupon(d) {
    const n = Number(d.cantidad) || 1;
    return n === 1 ? 'Hay un <strong>cupón de ' + fmt(d.creditos) + ' créditos</strong> disponible. Con él puedes canjear un material de PDF y material sin costo.'
      : 'Hay <strong>' + fmt(n) + ' cupones</strong> disponibles, de hasta ' + fmt(d.creditos) + ' créditos. Con ellos puedes canjear materiales de PDF y material sin costo.';
  }
  function htmlCupon(d) {
    return '<button type="button" class="fcu-x" data-fcu="ahora" aria-label="Ahora no">' + CERRAR + '</button><div class="fcu-ic">' + RAYO + '</div>' +
      '<p class="fcu-kick">Créditos gratis</p><h2 class="fcu-t" id="fcuT">Hay un cupón para ti</h2><p class="fcu-p">' + textoCupon(d) + '</p>' +
      '<ol class="fcu-pasos"><li>Únete a nuestro canal de WhatsApp: ahí compartimos la clave y otras ofertas.</li><li>Escribe la clave en Material PDF → «¿Tienes un código?». Si ya la tienes, toca «Ya tengo la clave» y te llevamos directo al campo.</li></ol>' +
      (d.limitado ? '<p class="fcu-lim">Disponible por tiempo limitado.</p>' : '') +
      '<div class="fcu-bot"><button type="button" class="fcu-btn suave" data-fcu="ahora">Ahora no</button><button type="button" class="fcu-btn suave" data-fcu="clave">Ya tengo la clave</button><button type="button" class="fcu-btn oro" data-fcu="canal">' + CHAT + '<span>Unirme al canal</span></button></div>';
  }
  function htmlSentimos(info) {
    const razon = info && info.razon === 'vencido' ? 'Este cupón ya venció y tú llegaste después de que terminó.'
      : info && info.limite ? 'Este cupón ya alcanzó su límite de ' + fmt(info.limite) + (info.limite === 1 ? ' persona' : ' personas') + ' y tú llegaste después de que se acabaron.' : 'Este cupón ya alcanzó su límite de personas y tú llegaste después de que se acabaron.';
    return '<button type="button" class="fcu-x" data-fcu="entendido" aria-label="Entendido">' + CERRAR + '</button><div class="fcu-ic">' + RAYO + '</div>' +
      '<p class="fcu-kick">Llegaste un poquito tarde</p><h2 class="fcu-t" id="fcuT">Lo sentimos</h2><p class="fcu-p">' + esc(razon) + '</p>' +
      '<p class="fcu-p"><strong>No te desanimes.</strong> Estate atento a nuestro canal de WhatsApp: ahí compartimos más cupones y ofertas para que no te pierdas el próximo.</p>' +
      '<div class="fcu-bot"><button type="button" class="fcu-btn suave" data-fcu="entendido">Entendido</button><button type="button" class="fcu-btn oro" data-fcu="canal">' + CHAT + '<span>Ir al canal</span></button></div>';
  }

  function tarjeta(html) {
    return new Promise(resolver => {
      document.querySelectorAll('.fcu-ov').forEach(o => o.remove()); // una sola tarjeta a la vez
      const previo = document.activeElement;
      const ov = document.createElement('div'); ov.className = 'fcu-ov'; ov.setAttribute('data-ft-cupon', '1');
      ov.innerHTML = '<div class="fcu-card" role="dialog" aria-modal="true" aria-labelledby="fcuT" tabindex="-1">' + html + '</div>';
      document.body.appendChild(ov); document.body.classList.add('modal-open');
      let hecho = false;
      const cerrar = como => {
        if (hecho) return; hecho = true;
        document.removeEventListener('keydown', tecla, true);
        ov.remove(); if (!document.querySelector('.fcu-ov, .ftp-overlay')) document.body.classList.remove('modal-open');
        if (previo && previo.isConnected && previo.focus) { try { previo.focus({ preventScroll: true }); } catch (_) { /* sin foco */ } }
        resolver(como);
      };
      const tecla = e => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); cerrar(ov.querySelector('[data-fcu="entendido"]') ? 'entendido' : 'ahora'); } };
      document.addEventListener('keydown', tecla, true);
      ov.addEventListener('click', e => { const b = e.target.closest('[data-fcu]'); if (b) cerrar(b.dataset.fcu); });
      setTimeout(() => { if (!hecho) ov.firstChild.focus({ preventScroll: true }); }, 60);
    });
  }
  const abrirCanal = () => { try { const w = window.open(CANAL, '_blank', 'noopener'); if (w) w.opener = null; else location.href = CANAL; } catch (_) { location.href = CANAL; } };

  // «Lo sentimos» (la usa el canje cuando el servidor dice cupon-agotado o cupon-vencido)
  async function sentimos(info) { const r = await tarjeta(htmlSentimos(info)); if (r === 'canal') abrirCanal(); return r; }
  // Interpreta el error de un canje; devuelve true si ya mostró la tarjeta «Lo sentimos»
  function interpretar(err) {
    const d = (err && err.data) || {};
    if (d.codigo === 'cupon-agotado') { sentimos({ razon: 'agotado', limite: Number(d.limite) || 0 }); return true; }
    if (d.codigo === 'cupon-vencido') { sentimos({ razon: 'vencido' }); return true; }
    return false;
  }

  // ---------- Arranque en el Inicio ----------
  let corriendo = false;
  async function aviso() {
    if (corriendo || !auth.currentUser) return;
    corriendo = true;
    try {
      const d = await certFetch('/api/creditos/cupon-disponible');
      if (!debeAvisar(d)) return;
      // Después de la bienvenida, el recorrido y la presentación de la prueba gratuita
      for (let i = 0; i < 200; i++) {
        const u = auth.currentUser, nueva = u && u.metadata && u.metadata.creationTime && Date.now() - new Date(u.metadata.creationTime).getTime() < 3 * 864e5;
        const tourPend = !!(window.ftBienvenida && ftBienvenida.secuenciaPendiente && ftBienvenida.secuenciaPendiente());
        const ocupado = (window.ftBienvenida && !ftBienvenida.vista()) || tourPend || document.visibilityState === 'hidden' || document.getElementById('ftpIntro');
        const pruebaPend = window.ftPrueba && ftPrueba.estado === 'pendiente' && !memberIsPaid && (() => { try { return sessionStorage.getItem('ft_prueba_intro_' + uid()) !== '1'; } catch (_) { return false; } })();
        if (!ocupado && !pruebaPend && !(window.ftCola && ftCola.hayVentana())) break;
        await new Promise(r => setTimeout(r, 1500));
        if (i === 199) return;
      }
      const f = await certFetch('/api/creditos/cupon-disponible'); // justo antes se vuelve a preguntar: si ya se agotó o lo canjeó, no sale
      if (!f || f.hay !== true) return;
      anotar(f.ids);
      const r = await tarjeta(htmlCupon(f));
      if (r === 'canal') abrirCanal();
      else if (r === 'clave') { showPage('pdfs'); setTimeout(() => { const i = document.getElementById('crClave'); if (i) { i.scrollIntoView({ block: 'center', behavior: 'smooth' }); i.focus({ preventScroll: true }); } }, 700); }
    } catch (_) { /* sin servidor: no hay aviso */ } finally { corriendo = false; }
  }
  let visita = false;
  auth.onAuthStateChanged(u => { visita = false; if (u) setTimeout(() => { if (!visita) { visita = true; aviso(); } }, 6000); });
  window.ftCupones = { aviso, sentimos, interpretar, tarjeta, htmlCupon };

  const estilo = document.createElement('style');
  estilo.textContent = `
  .fcu-ov { position:fixed; inset:0; z-index:10070; display:flex; align-items:center; justify-content:center; padding:18px; background:rgba(8,14,24,.55); backdrop-filter:blur(8px); overflow-y:auto; animation:fcuF .25s ease; }
  @keyframes fcuF { from { opacity:0; } } @keyframes fcuU { from { opacity:0; transform:translateY(16px) scale(.98); } }
  .fcu-card { position:relative; width:min(440px,100%); margin:auto; padding:36px 30px 28px; border-radius:28px; text-align:center; background:var(--surface); color:var(--text); border:1px solid var(--border-2); box-shadow:0 0 0 2px #fff, 0 0 0 3px rgba(0,0,0,.65), var(--shadow-lg); animation:fcuU .3s ease; outline:none; }
  .fcu-x { position:absolute; top:16px; right:16px; width:36px; height:36px; border-radius:50%; border:0; background:var(--surface-3); color:var(--text-light); display:grid; place-items:center; cursor:pointer; } .fcu-x svg { width:16px; height:16px; } .fcu-x:hover { color:var(--text); }
  .fcu-ic { width:88px; height:88px; margin:0 auto 12px; border-radius:50%; display:grid; place-items:center; background:radial-gradient(circle at 35% 30%,#F5B83D,#E5A117); box-shadow:0 12px 30px rgba(229,161,23,.4); } .fcu-ic svg { width:40px; height:40px; }
  .fcu-kick { margin:0 0 6px; font-family:'JetBrains Mono',monospace; font-size:.68rem; letter-spacing:.2em; text-transform:uppercase; font-weight:700; color:var(--text-muted); }
  .fcu-t { margin:0 0 10px; font-size:1.45rem; font-weight:800; letter-spacing:-.02em; }
  .fcu-p { margin:0 0 12px; font-size:.95rem; line-height:1.6; color:var(--text-light); } .fcu-p strong { color:var(--text); }
  .fcu-pasos { margin:14px 0 8px; padding-left:22px; text-align:left; font-size:.92rem; line-height:1.55; color:var(--text-light); } .fcu-pasos li { margin-bottom:8px; } .fcu-pasos li::marker { font-weight:800; color:var(--text); }
  .fcu-lim { margin:6px 0 16px; font-size:.82rem; color:var(--text-muted); }
  .fcu-bot { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:18px; } .fcu-bot:has(.fcu-btn:nth-child(2):last-child) { grid-template-columns:1fr 1fr; }
  .fcu-btn { padding:14px 12px; border-radius:14px; border:2px solid var(--border-2); background:var(--surface); color:var(--text); font:inherit; font-size:.92rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:transform .15s, filter .15s; } .fcu-btn:hover { transform:translateY(-1px); }
  .fcu-btn svg { width:18px; height:18px; flex:none; }
  .fcu-btn.oro { border-color:#E5A117; background:#E5A117; color:#1d1300; } .fcu-btn.oro:hover { filter:brightness(1.06); }
  .fcu-bot .fcu-btn.oro:nth-child(3) { grid-column:1 / -1; }
  @media (max-width:520px) { .fcu-card { padding:32px 20px 22px; border-radius:24px; } }
  @media (prefers-reduced-motion:reduce) { .fcu-ov, .fcu-card { animation:none; } }`;
  document.head.appendChild(estilo);
})();
