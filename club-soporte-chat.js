/* Club FisioTeck — «Soporte privado»: chat privado del miembro con administración (como ICADEM).
   Una sola conversación permanente por miembro: tema de la consulta, estado del caso, hilo con burbujas y
   separadores por día, envío a prueba de reintentos (no se duplica) y punto rojo cuando el equipo respondió.
   Servidor: GET /api/soporte-chat · POST /api/soporte-chat/tema · POST /api/soporte-chat/mensajes.
   Depende de index.html: auth, certFetch, showPage, showToast. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const TEMAS = [['membresia', 'Mi membresía'], ['cobros', 'Cobros y pagos'], ['cuenta', 'Acceso a mi cuenta'], ['cursos', 'Cursos y materiales'], ['otro', 'Otro tema']];
  const ICO = {
    audifonos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><path d="M4 12H3v6h4v-6H4z"/><path d="M20 12h1v6h-4v-6h3z"/></svg>',
    escudo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
    enviar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10 18-7-7 18-3-8-8-3z"/><path d="M11 13 21 3"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h18v13H9l-6 4V4z"/><path d="M7 9h10M7 12h6"/></svg>'
  };
  const ESTADO = { nueva: ['Sin consulta', 'var(--text-muted)'], abierto: ['En seguimiento', '#B45309'], resuelto: ['Resuelto', '#0F9D6C'] };

  const st = document.createElement('style');
  st.textContent = `
  #page-soporte .ftch-hero { display:flex; align-items:center; gap:16px; flex-wrap:wrap; padding:22px 24px; border-radius:18px; background:linear-gradient(130deg,#0B2A4A,#0D5FA0); color:#fff; margin-bottom:18px; }
  #page-soporte .ftch-hero i { display:flex; width:46px; height:46px; border-radius:14px; background:rgba(255,255,255,.14); align-items:center; justify-content:center; } #page-soporte .ftch-hero svg { width:24px; height:24px; }
  #page-soporte .ftch-hero .ey { font:700 .62rem 'JetBrains Mono',monospace; letter-spacing:.16em; color:#FFD98A; } #page-soporte .ftch-hero h1 { margin:2px 0 3px; font-size:1.45rem; } #page-soporte .ftch-hero p { margin:0; font-size:.84rem; opacity:.85; }
  #page-soporte .ftch-priv { margin-left:auto; display:flex; align-items:center; gap:7px; padding:8px 13px; border:1px solid rgba(255,255,255,.3); border-radius:100px; font-size:.74rem; } #page-soporte .ftch-priv svg { width:15px; height:15px; }
  #page-soporte .ftch-cols { display:grid; grid-template-columns:300px 1fr; gap:16px; align-items:start; }
  @media (max-width:860px) { #page-soporte .ftch-cols { grid-template-columns:1fr; } }
  #page-soporte .ftch-caso { border:1px solid var(--border); border-radius:16px; background:var(--surface); padding:16px; }
  #page-soporte .ftch-caso h3 { margin:0 0 10px; font-size:.95rem; }
  #page-soporte .ftch-temas { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px; }
  #page-soporte .ftch-tema { display:flex; align-items:center; gap:8px; padding:10px 11px; border:1.5px solid var(--border); border-radius:12px; cursor:pointer; font-size:.78rem; font-weight:600; background:var(--surface-2); transition:border-color .15s; }
  #page-soporte .ftch-tema input { accent-color:var(--accent); margin:0; }
  #page-soporte .ftch-tema.on { border-color:var(--accent); background:var(--accent-ghost); color:var(--accent); }
  #page-soporte .ftch-estado { display:flex; justify-content:space-between; align-items:center; gap:10px; padding:10px 12px; border-radius:12px; background:var(--surface-2); font-size:.78rem; color:var(--text-muted); margin-bottom:12px; }
  #page-soporte .ftch-estado b { font-size:.8rem; }
  #page-soporte .ftch-nota { display:flex; gap:9px; padding:9px 2px; font-size:.75rem; color:var(--text-muted); line-height:1.4; } #page-soporte .ftch-nota svg { width:16px; height:16px; flex:0 0 auto; color:var(--accent); margin-top:1px; }
  #page-soporte .ftch-nota b { display:block; color:var(--text); font-size:.77rem; }
  #page-soporte .ftch-hilo { border:1px solid var(--border); border-radius:16px; background:var(--surface); display:flex; flex-direction:column; min-height:430px; max-height:72vh; }
  #page-soporte .ftch-cab { display:flex; align-items:center; gap:11px; padding:13px 16px; border-bottom:1px solid var(--border); }
  #page-soporte .ftch-cab i { display:flex; width:38px; height:38px; border-radius:12px; background:var(--accent-ghost); color:var(--accent); align-items:center; justify-content:center; } #page-soporte .ftch-cab svg { width:20px; height:20px; }
  #page-soporte .ftch-cab b { display:block; font-size:.9rem; } #page-soporte .ftch-cab small { color:var(--text-muted); font-size:.73rem; }
  #page-soporte .ftch-cab .ftch-pill { margin-left:auto; font:700 .66rem 'JetBrains Mono',monospace; letter-spacing:.06em; padding:4px 11px; border-radius:100px; border:1px solid var(--border); color:var(--text-muted); }
  #page-soporte .ftch-msgs { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px; scroll-behavior:smooth; }
  #page-soporte .ftch-dia { align-self:center; font:700 .62rem 'JetBrains Mono',monospace; letter-spacing:.1em; text-transform:uppercase; color:var(--text-muted); background:var(--surface-2); border-radius:100px; padding:4px 12px; margin:4px 0; }
  #page-soporte .ftch-m { display:flex; } #page-soporte .ftch-m.mio { justify-content:flex-end; }
  #page-soporte .ftch-burbuja { max-width:78%; padding:10px 13px; border-radius:15px; background:var(--surface-2); border:1px solid var(--border); font-size:.86rem; line-height:1.5; white-space:pre-line; overflow-wrap:anywhere; }
  #page-soporte .mio .ftch-burbuja { background:linear-gradient(135deg,#0B2A4A,#0D5FA0); color:#fff; border:0; }
  #page-soporte .ftch-burbuja small { display:block; font:700 .62rem 'JetBrains Mono',monospace; letter-spacing:.08em; margin-bottom:3px; opacity:.75; }
  #page-soporte .ftch-burbuja time { display:block; font-size:.64rem; opacity:.6; margin-top:4px; text-align:right; }
  #page-soporte .ftch-nuevo { animation:ftchIn .25s ease; } @keyframes ftchIn { from { opacity:0; transform:translateY(7px); } }
  #page-soporte .ftch-bajar { position:sticky; bottom:6px; align-self:center; border:1px solid var(--border); background:var(--surface); color:var(--accent); border-radius:100px; padding:6px 14px; font-size:.74rem; font-weight:700; cursor:pointer; box-shadow:0 6px 16px rgba(13,42,74,.18); }
  #page-soporte .ftch-vacio { margin:auto; text-align:center; color:var(--text-muted); padding:30px 20px; max-width:340px; }
  #page-soporte .ftch-vacio i { display:inline-flex; width:52px; height:52px; border-radius:16px; background:var(--accent-ghost); color:var(--accent); align-items:center; justify-content:center; margin-bottom:10px; } #page-soporte .ftch-vacio svg { width:26px; height:26px; }
  #page-soporte .ftch-vacio b { display:block; color:var(--text); font-size:.95rem; margin-bottom:4px; }
  #page-soporte .ftch-escribir { border-top:1px solid var(--border); padding:12px 14px; background:var(--surface); border-radius:0 0 16px 16px; }
  #page-soporte .ftch-fila { display:flex; align-items:flex-end; gap:9px; }
  #page-soporte .ftch-fila textarea { flex:1; resize:none; min-height:44px; max-height:130px; padding:11px 13px; border:1px solid var(--border); border-radius:13px; background:var(--surface-2); color:var(--text); font:500 .85rem/1.45 inherit; font-family:inherit; outline:none; }
  #page-soporte .ftch-fila textarea:focus { border-color:var(--accent); }
  #page-soporte .ftch-fila button { flex:0 0 auto; width:44px; height:44px; border:0; border-radius:13px; background:linear-gradient(135deg,#0B2A4A,#0D5FA0); color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; }
  #page-soporte .ftch-fila button:disabled { opacity:.5; cursor:default; } #page-soporte .ftch-fila button svg { width:19px; height:19px; }
  #page-soporte .ftch-pie { display:flex; justify-content:space-between; gap:10px; margin-top:6px; font-size:.68rem; color:var(--text-muted); } #page-soporte .ftch-pie svg { width:12px; height:12px; vertical-align:-2px; margin-right:3px; }
  #page-soporte .ftch-envio { font-size:.72rem; margin-top:5px; color:var(--text-muted); } #page-soporte .ftch-envio.err { color:#C0392B; }
  .ftch-dot { width:8px; height:8px; border-radius:50%; background:#E24A4A; margin-left:auto; flex:0 0 auto; }`;
  document.head.appendChild(st);

  // ───── Página y entrada del menú ─────
  function montar() {
    if ($('page-soporte')) return;
    const refPage = $('page-settings'), refNav = document.querySelector('.nav-item[data-page="settings"]');
    if (!refPage || !refNav) return;
    refPage.insertAdjacentHTML('beforebegin', '<section class="section" id="page-soporte"><div id="ftchRaiz"></div></section>');
    refNav.insertAdjacentHTML('beforebegin', '<div class="nav-item" data-page="soporte" onclick="showPage(\'soporte\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>Soporte privado<span class="ftch-dot" id="ftchDot" hidden></span></div>');
  }

  // ───── Estado ─────
  let cargando = false, primeraVez = true, temaActual = 'membresia', guardandoTema = false, reintento = null, enviando = false, reloj = null;
  const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now() + '' + Math.random()).replace(/-/g, '').slice(0, 32);
  const api = (ruta, opts) => certFetch(ruta, opts);
  const enSoporte = () => { const s = $('page-soporte'); return !!(s && s.classList.contains('active')); };

  function fmtHora(ms) { return ms ? new Intl.DateTimeFormat('es-MX', { hour: 'numeric', minute: '2-digit' }).format(new Date(ms)) : ''; }
  function fmtDia(ms) {
    if (!ms) return '';
    const d = new Date(ms);
    return d.toDateString() === new Date().toDateString() ? 'Hoy' : new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
  }

  function htmlMensajes(lista) {
    if (!lista.length) return '<div class="ftch-vacio" data-k="vacio"><i>' + ICO.chat + '</i><b>¿En qué podemos ayudarte?</b>Elige el tema de tu consulta y escribe al equipo FisioTeck. Tu conversación se conservará aquí.</div>';
    let dia = '';
    return lista.map(m => {
      const d = m.creadoMs ? new Date(m.creadoMs).toDateString() : '';
      const sep = d && d !== dia ? '<div class="ftch-dia" data-k="dia-' + esc(d) + '"><span>' + esc(fmtDia(m.creadoMs)) + '</span></div>' : ''; dia = d;
      const mio = m.de === 'miembro';
      return sep + '<div class="ftch-m ' + (mio ? 'mio' : '') + '" data-k="m-' + esc(m.id) + '" data-msj><div class="ftch-burbuja"><small>' + (mio ? 'Tú' : 'Equipo FisioTeck') + '</small>' + esc(m.texto) + '<time>' + esc(fmtHora(m.creadoMs)) + '</time></div></div>';
    }).join('');
  }

  // Repintado sin parpadeo: conserva los nodos que no cambiaron y anima solo los mensajes nuevos
  function sincronizar(caja, html, forzar) {
    if (!caja || caja.innerHTML === html) return;
    const seguir = forzar || caja.scrollHeight - caja.scrollTop - caja.clientHeight < 90, top = caja.scrollTop;
    const plantilla = document.createElement('template'); plantilla.innerHTML = html;
    const viejos = new Map([...caja.children].map(n => [n.getAttribute('data-k'), n])), conservar = new Set();
    let hayNuevos = false;
    [...plantilla.content.children].forEach((nuevo, i) => {
      const k = nuevo.getAttribute('data-k'), previo = k && viejos.get(k);
      const nodo = previo && previo.outerHTML === nuevo.outerHTML ? previo : nuevo;
      if (!previo && nuevo.hasAttribute('data-msj')) { hayNuevos = true; if (!forzar) nodo.classList.add('ftch-nuevo'); }
      conservar.add(nodo);
      if (caja.children[i] !== nodo) caja.insertBefore(nodo, caja.children[i] || null);
    });
    [...caja.children].forEach(n => { if (!conservar.has(n) && !n.classList.contains('ftch-bajar')) n.remove(); });
    const btn = caja.querySelector('.ftch-bajar') || $('ftchBajar');
    if (seguir) caja.scrollTop = caja.scrollHeight; else caja.scrollTop = top;
    if (btn) btn.hidden = seguir || !hayNuevos ? (seguir ? true : btn.hidden) : false;
  }

  function pintarEstado(conv) {
    const e = !conv ? ESTADO.nueva : (ESTADO[conv.estado] || ESTADO.abierto);
    document.querySelectorAll('[data-ftch-estado]').forEach(n => { n.textContent = e[0]; n.style.color = e[1]; });
  }
  function pintarTema(t) {
    temaActual = t;
    document.querySelectorAll('.ftch-tema').forEach(l => { const r = l.querySelector('input'); r.checked = r.value === t; l.classList.toggle('on', r.checked); });
    const n = $('ftchTemaSel'); if (n) n.textContent = (TEMAS.find(x => x[0] === t) || TEMAS[4])[1];
  }

  async function cargar(silencio) {
    if (cargando || !$('ftchMsgs')) return; cargando = true;
    try {
      const r = await api('/api/soporte-chat');
      if (!$('ftchMsgs')) return;
      sincronizar($('ftchMsgs'), htmlMensajes(r.mensajes || []), primeraVez); primeraVez = false;
      pintarEstado(r.conversacion);
      if (r.conversacion && !guardandoTema) pintarTema(r.conversacion.tema);
      const dot = $('ftchDot'); if (dot) dot.hidden = true;
    } catch (e) {
      if (!silencio && primeraVez && $('ftchMsgs')) $('ftchMsgs').innerHTML = '<div class="ftch-vacio"><b>No pudimos abrir la conversación</b>Revisa tu conexión o vuelve a iniciar sesión. Tu historial se conserva.</div>';
    } finally { cargando = false; }
  }

  async function puntoRojo() {
    try {
      if (!auth.currentUser) return;
      const r = await api('/api/soporte-chat?vistazo=1');
      const dot = $('ftchDot'); if (dot) dot.hidden = !(r.conversacion && r.conversacion.sinLeerMiembro > 0);
    } catch (_) { /* sin conexión: sin punto */ }
  }

  function arrancarReloj() {
    clearInterval(reloj);
    reloj = setInterval(() => {
      if (document.visibilityState === 'hidden' || !auth.currentUser) return;
      if (enSoporte()) cargar(true); else puntoRojo();
    }, 20000);
  }

  function pintar() {
    const raiz = $('ftchRaiz'); if (!raiz) return;
    primeraVez = true;
    raiz.innerHTML =
      '<div class="ftch-hero"><i>' + ICO.audifonos + '</i><div><div class="ey">FISIOTECK · ATENCIÓN PERSONALIZADA</div><h1>Soporte privado</h1><p>Estamos aquí para ayudarte con tu membresía, cobros, acceso o cursos.</p></div><div class="ftch-priv">' + ICO.escudo + ' Solo tú y administración</div></div>' +
      '<div class="ftch-cols"><aside class="ftch-caso"><h3>¿Sobre qué necesitas ayuda?</h3><div class="ftch-temas" id="ftchTemas">' +
      TEMAS.map(t => '<label class="ftch-tema' + (t[0] === temaActual ? ' on' : '') + '"><input type="radio" name="ftchTema" value="' + t[0] + '"' + (t[0] === temaActual ? ' checked' : '') + '>' + t[1] + '</label>').join('') +
      '</div><div class="ftch-estado"><span>Tema seleccionado</span><b id="ftchTemaSel">Mi membresía</b></div><div class="ftch-estado"><span>Estado del caso</span><b data-ftch-estado>Cargando…</b></div>' +
      '<div class="ftch-nota">' + ICO.chat + '<div><b>Seguimiento en el mismo lugar</b>Tu historial se conserva para continuar donde lo dejaste.</div></div>' +
      '<div class="ftch-nota">' + ICO.escudo + '<div><b>Conversación privada</b>Solo tú y el equipo de administración pueden ver este espacio.</div></div></aside>' +
      '<section class="ftch-hilo"><div class="ftch-cab"><i>' + ICO.audifonos + '</i><div><b>Equipo FisioTeck</b><small>Administración de membresías</small></div><span class="ftch-pill" data-ftch-estado>Cargando…</span></div>' +
      '<div class="ftch-msgs" id="ftchMsgs" role="log" aria-live="polite" aria-label="Historial de la conversación"><div class="ftch-vacio"><i>' + ICO.chat + '</i>Cargando tu conversación…</div><button type="button" class="ftch-bajar" id="ftchBajar" hidden>Nuevos mensajes ↓</button></div>' +
      '<form class="ftch-escribir" id="ftchForm"><div class="ftch-fila"><textarea id="ftchTexto" maxlength="3000" rows="1" placeholder="Escribe tu mensaje…" aria-label="Mensaje para soporte" required></textarea><button type="submit" id="ftchEnviar" aria-label="Enviar mensaje">' + ICO.enviar + '</button></div>' +
      '<div class="ftch-pie"><span>' + ICO.escudo + 'No compartas contraseñas ni datos completos de tu tarjeta.</span><span id="ftchCuenta">0 / 3000</span></div><div class="ftch-envio" id="ftchEnvio" role="status" aria-live="polite"></div></form></section></div>';

    pintarTema(temaActual); pintarEstado(null);
    // Temas: se guardan solos en el servidor
    raiz.querySelectorAll('input[name="ftchTema"]').forEach(r => r.addEventListener('change', async () => {
      if (!r.checked || guardandoTema || r.value === temaActual) return;
      const anterior = temaActual; guardandoTema = true; pintarTema(r.value);
      try { const resp = await api('/api/soporte-chat/tema', { method: 'POST', body: JSON.stringify({ tema: r.value }) }); pintarTema(resp.tema); }
      catch (_) { pintarTema(anterior); showToast('No pudimos guardar el tema. Intenta de nuevo.'); }
      finally { guardandoTema = false; }
    }));

    const caja = $('ftchMsgs'), bajar = $('ftchBajar');
    bajar.addEventListener('click', () => { caja.scrollTop = caja.scrollHeight; bajar.hidden = true; });
    caja.addEventListener('scroll', () => { if (caja.scrollHeight - caja.scrollTop - caja.clientHeight < 90) bajar.hidden = true; }, { passive: true });

    // Cajón de escribir: Enter envía, el contador vive, reintentar no duplica
    const form = $('ftchForm'), texto = $('ftchTexto'), btn = $('ftchEnviar'), estado = $('ftchEnvio');
    const medir = () => { $('ftchCuenta').textContent = texto.value.length + ' / 3000'; texto.style.height = 'auto'; texto.style.height = Math.min(texto.scrollHeight, 130) + 'px'; btn.disabled = enviando || !texto.value.trim(); };
    texto.addEventListener('input', () => { if (!enviando) { estado.textContent = ''; estado.className = 'ftch-envio'; } medir(); });
    texto.addEventListener('keydown', ev => { if (ev.key === 'Enter' && !ev.shiftKey && !ev.isComposing) { ev.preventDefault(); if (!enviando) form.requestSubmit(); } });
    form.addEventListener('submit', async ev => {
      ev.preventDefault();
      const msj = texto.value.trim(); if (enviando || !msj) return;
      if (!reintento || reintento.msj !== msj) reintento = { msj, id: uuid() };
      enviando = true; estado.className = 'ftch-envio'; estado.textContent = 'Enviando…'; medir();
      try {
        await api('/api/soporte-chat/mensajes', { method: 'POST', body: JSON.stringify({ mensaje: msj, tema: temaActual, clientRequestId: reintento.id }) });
        reintento = null; if (texto.value.trim() === msj) texto.value = '';
        estado.textContent = 'Mensaje enviado.';
        await cargar(true);
      } catch (e) { estado.className = 'ftch-envio err'; estado.textContent = 'No pudimos enviar el mensaje. Se conservó tu texto; puedes reintentar sin duplicarlo.'; }
      finally { enviando = false; medir(); if (form.isConnected) texto.focus({ preventScroll: true }); }
    });
    medir();
    cargar(false); arrancarReloj();
  }

  const pg = window.showPage;
  window.showPage = function (page) {
    const r = pg.apply(this, arguments);
    if (page === 'soporte') { montar(); pintar(); }
    return r;
  };
  function listo() { montar(); if (auth.currentUser) { puntoRojo(); arrancarReloj(); } }
  auth.onAuthStateChanged(u => { if (u) listo(); else { clearInterval(reloj); const d = $('ftchDot'); if (d) d.hidden = true; } });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && auth.currentUser) { if (enSoporte()) cargar(true); else puntoRojo(); } });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
