/* Panel FisioTeck — «Buzón privado»: chat privado con cada miembro (como ICADEM).
   Lista de conversaciones (Pendientes / Todas / Resueltas, buscador y no-leídos), hilo con burbujas,
   responder (el miembro recibe aviso en su campana), Marcar resuelto / Reabrir. Se refresca solo cada 20 s.
   Datos: GET /api/admin/soporte-chat · GET/POST /api/admin/soporte-chat/:uid[/mensajes|/estado].
   Depende de index.html: apiAdmin, toast, showSection. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const e = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const TEMA = { membresia: 'Membresía', cobros: 'Cobros', cuenta: 'Cuenta', cursos: 'Cursos', otro: 'Otro' };
  let previoSinLeer = null, D = { conversaciones: [] }, filtro = 'abierto', busca = '', elegida = null, reloj = null, pedido = 0, enviando = false, reintento = null;
  const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now() + '' + Math.random()).replace(/-/g, '').slice(0, 32);

  const st = document.createElement('style');
  st.textContent = `
  #sec-buzon .bz-cols { display:grid; grid-template-columns:330px 1fr; gap:14px; align-items:start; }
  @media (max-width:900px) { #sec-buzon .bz-cols { grid-template-columns:1fr; } }
  #sec-buzon .bz-lista { border:1px solid var(--border); border-radius:14px; background:var(--surface); overflow:hidden; }
  #sec-buzon .bz-tools { padding:12px; border-bottom:1px solid var(--border); display:flex; flex-direction:column; gap:9px; }
  #sec-buzon .bz-filtros { display:flex; gap:6px; } #sec-buzon .bz-filtros button { flex:1; padding:7px 4px; border:1px solid var(--border); border-radius:9px; background:var(--surface-2); font-size:.74rem; font-weight:700; cursor:pointer; color:var(--text-muted); }
  #sec-buzon .bz-filtros button.on { background:var(--blue); border-color:var(--blue); color:#fff; }
  #sec-buzon .bz-items { max-height:62vh; overflow-y:auto; }
  #sec-buzon .bz-item { display:flex; gap:10px; width:100%; text-align:left; padding:12px; border:0; border-bottom:1px solid var(--border); background:none; cursor:pointer; align-items:center; }
  #sec-buzon .bz-item.on { background:var(--surface-2); box-shadow:inset 3px 0 0 var(--blue); }
  #sec-buzon .bz-ava { flex:0 0 auto; width:38px; height:38px; border-radius:12px; background:var(--blue); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:.8rem; }
  #sec-buzon .bz-item b { display:block; font-size:.84rem; } #sec-buzon .bz-item small { color:var(--text-muted); font-size:.72rem; display:block; }
  #sec-buzon .bz-cuerpo { flex:1; min-width:0; } #sec-buzon .bz-cuerpo .fila1 { display:flex; justify-content:space-between; gap:8px; align-items:baseline; }
  #sec-buzon .bz-tags { display:flex; gap:5px; margin-top:4px; }
  #sec-buzon .bz-tag { font:700 .6rem 'JetBrains Mono',monospace; letter-spacing:.05em; padding:2px 8px; border-radius:100px; background:var(--surface-2); border:1px solid var(--border); color:var(--text-muted); }
  #sec-buzon .bz-tag.ab { color:#B45309; border-color:#B4530933; } #sec-buzon .bz-tag.re { color:#0F9D6C; border-color:#0F9D6C33; }
  #sec-buzon .bz-noleido { flex:0 0 auto; min-width:20px; height:20px; border-radius:10px; background:var(--danger); color:#fff; font-size:.68rem; font-weight:800; display:flex; align-items:center; justify-content:center; padding:0 5px; }
  #sec-buzon .bz-hilo { border:1px solid var(--border); border-radius:14px; background:var(--surface); display:flex; flex-direction:column; min-height:430px; max-height:72vh; }
  #sec-buzon .bz-cab { display:flex; align-items:center; gap:10px; padding:12px 14px; border-bottom:1px solid var(--border); flex-wrap:wrap; }
  #sec-buzon .bz-cab b { font-size:.9rem; } #sec-buzon .bz-cab a { font-size:.74rem; color:var(--blue); display:block; }
  #sec-buzon .bz-cab .der { margin-left:auto; display:flex; gap:8px; align-items:center; }
  #sec-buzon .bz-msgs { flex:1; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:9px; }
  #sec-buzon .bz-dia { align-self:center; font:700 .6rem 'JetBrains Mono',monospace; letter-spacing:.1em; color:var(--text-muted); background:var(--surface-2); border-radius:100px; padding:3px 11px; }
  #sec-buzon .bz-m { display:flex; } #sec-buzon .bz-m.admin { justify-content:flex-end; }
  #sec-buzon .bz-bur { max-width:78%; padding:9px 12px; border-radius:14px; background:var(--surface-2); border:1px solid var(--border); font-size:.84rem; line-height:1.5; white-space:pre-line; overflow-wrap:anywhere; }
  #sec-buzon .admin .bz-bur { background:linear-gradient(135deg,#0B2A4A,#0D5FA0); color:#fff; border:0; }
  #sec-buzon .bz-bur small { display:block; font:700 .6rem 'JetBrains Mono',monospace; margin-bottom:2px; opacity:.72; }
  #sec-buzon .bz-bur time { display:block; font-size:.62rem; opacity:.6; margin-top:3px; text-align:right; }
  #sec-buzon .bz-escribir { border-top:1px solid var(--border); padding:11px 13px; }
  #sec-buzon .bz-fila { display:flex; gap:8px; align-items:flex-end; }
  #sec-buzon .bz-fila textarea { flex:1; resize:none; min-height:42px; max-height:120px; padding:10px 12px; border:1px solid var(--border); border-radius:12px; background:var(--surface-2); color:var(--text); font:500 .84rem/1.45 inherit; font-family:inherit; outline:none; }
  #sec-buzon .bz-fila textarea:focus { border-color:var(--blue); }
  #sec-buzon .bz-pie { display:flex; justify-content:space-between; margin-top:5px; font-size:.68rem; color:var(--text-muted); }
  #sec-buzon .bz-envio { font-size:.72rem; margin-top:4px; color:var(--text-muted); } #sec-buzon .bz-envio.err { color:var(--danger); }
  #sec-buzon .bz-vacio { margin:auto; text-align:center; color:var(--text-muted); padding:36px 18px; max-width:360px; } #sec-buzon .bz-vacio b { display:block; color:var(--text); margin-bottom:4px; }`;
  document.head.appendChild(st);

  function montar() {
    if ($('sec-buzon')) return;
    const refNav = document.querySelector('.admin-nav-item[data-section="soporte"]'), refSec = $('sec-soporte');
    if (!refNav || !refSec) { setTimeout(montar, 800); return; }
    // El apartado viejo de reportes se queda como «Reportes»; el chat nuevo es el Buzón privado
    refNav.childNodes.forEach(n => { if (n.nodeType === 3 && n.textContent.trim() === 'Soporte') n.textContent = 'Reportes '; });
    const nav = document.createElement('div');
    nav.className = 'admin-nav-item'; nav.dataset.section = 'buzon'; nav.setAttribute('onclick', "showSection('buzon')");
    nav.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><path d="M4 12H3v6h4v-6H4z"/><path d="M20 12h1v6h-4v-6h3z"/></svg>Buzón privado <span id="bzBadge" style="background:var(--danger);color:#fff;font-size:.65rem;padding:2px 7px;border-radius:10px;margin-left:auto;display:none;">0</span>';
    refNav.insertAdjacentElement('beforebegin', nav);
    const s = document.createElement('section');
    s.className = 'admin-section'; s.id = 'sec-buzon';
    s.innerHTML = '<div class="admin-page-header"><div><div class="admin-page-title">Buzón privado</div><div class="admin-page-sub">Responde, acompaña y conserva cada seguimiento en un espacio seguro</div></div><button class="btn btn-o" onclick="bzCargar()">Actualizar</button></div>' +
      '<div class="bz-cols"><div class="bz-lista"><div class="bz-tools"><input class="form-input" type="search" id="bzBusca" placeholder="Buscar miembro, tema o mensaje" aria-label="Buscar conversaciones">' +
      '<div class="bz-filtros"><button class="on" data-bzf="abierto">Pendientes</button><button data-bzf="todas">Todas</button><button data-bzf="resuelto">Resueltas</button></div></div>' +
      '<div class="bz-items" id="bzItems"><div class="bz-vacio">Cargando conversaciones…</div></div></div>' +
      '<div class="bz-hilo" id="bzHilo"><div class="bz-vacio"><b>Tu espacio de atención privada</b>Selecciona una conversación para ver el historial y responder sin salir del panel.</div></div></div>';
    refSec.insertAdjacentElement('beforebegin', s);
    $('bzBusca').addEventListener('input', ev => { busca = (ev.target.value || '').toLowerCase(); lista(); });
    s.querySelectorAll('[data-bzf]').forEach(b => b.addEventListener('click', () => { filtro = b.dataset.bzf; s.querySelectorAll('[data-bzf]').forEach(x => x.classList.toggle('on', x === b)); lista(); }));
  }

  const fmt = ms => { if (!ms) return ''; const d = new Date(ms); return d.toDateString() === new Date().toDateString() ? new Intl.DateTimeFormat('es-MX', { hour: 'numeric', minute: '2-digit' }).format(d) : new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short' }).format(d); };
  const iniciales = (n, c) => { const p = String(n || c || '?').split(/[\s@.]+/).filter(Boolean); return ((p[0] || '?')[0] + (p[1] || '')).slice(0, 2).toUpperCase(); };

  function filtradas() {
    return (D.conversaciones || []).filter(x => (filtro === 'todas' || x.estado === filtro) && (!busca || [x.nombre, x.correo, x.ultimoMensaje, TEMA[x.tema]].join(' ').toLowerCase().includes(busca)));
  }
  function lista() {
    const caja = $('bzItems'); if (!caja) return;
    const l = filtradas();
    caja.innerHTML = l.length ? l.map(x =>
      '<button class="bz-item' + (elegida === x.uid ? ' on' : '') + '" data-bzuid="' + e(x.uid) + '"><span class="bz-ava">' + e(iniciales(x.nombre, x.correo)) + '</span>' +
      '<span class="bz-cuerpo"><span class="fila1"><b>' + e(x.nombre || 'Miembro') + '</b><small>' + e(fmt(x.actualizadoMs)) + '</small></span>' +
      '<small>' + (x.ultimoDe === 'miembro' ? 'Mensaje del miembro' : x.ultimoDe === 'admin' ? 'Respuesta de administración' : 'Sin mensajes') + '</small>' +
      '<span class="bz-tags"><span class="bz-tag">' + e(TEMA[x.tema] || 'Otro') + '</span><span class="bz-tag ' + (x.estado === 'resuelto' ? 're' : 'ab') + '">' + (x.estado === 'resuelto' ? 'Resuelto' : 'Abierto') + '</span></span></span>' +
      (x.sinLeerAdmin ? '<span class="bz-noleido">' + Math.min(99, x.sinLeerAdmin) + '</span>' : '') + '</button>').join('')
      : '<div class="bz-vacio"><b>' + (filtro === 'abierto' ? 'Bandeja al día' : 'Sin resultados') + '</b>' + (filtro === 'abierto' ? 'Los nuevos mensajes de los miembros aparecerán aquí.' : 'Prueba con otra búsqueda o cambia el filtro.') + '</div>';
    caja.querySelectorAll('[data-bzuid]').forEach(b => b.addEventListener('click', () => abrir(b.dataset.bzuid)));
  }

  window.bzCargar = async function (silencio) {
    try {
      D = await apiAdmin('/api/admin/soporte-chat');
      const b = $('bzBadge'); if (b) { b.textContent = D.sinLeer || 0; b.style.display = D.sinLeer ? '' : 'none'; }
      if (previoSinLeer !== null && (D.sinLeer || 0) > previoSinLeer) toast('Nuevo mensaje en el Buzón privado');
      previoSinLeer = D.sinLeer || 0;
      if ($('bzItems')) {
        lista();
        const dentro = $('sec-buzon') && $('sec-buzon').classList.contains('active');
        if (dentro && !elegida && (D.conversaciones || []).length) {
          const pref = D.conversaciones.find(x => x.sinLeerAdmin > 0) || D.conversaciones.find(x => x.estado === 'abierto') || D.conversaciones[0];
          if (pref) abrir(pref.uid);
        }
      }
    } catch (err) { if (!silencio && $('bzItems')) $('bzItems').innerHTML = '<div class="bz-vacio"><b>No se pudo cargar el buzón</b>' + e(err.message) + '</div>'; }
  };

  function htmlMsgs(l) {
    if (!l.length) return '<div class="bz-vacio"><b>Sin mensajes todavía</b>Los mensajes aparecerán en este espacio.</div>';
    let dia = '';
    return l.map(m => {
      const d = m.creadoMs ? new Date(m.creadoMs).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
      const sep = d && d !== dia ? '<div class="bz-dia">' + e(d) + '</div>' : ''; dia = d;
      const hora = m.creadoMs ? new Intl.DateTimeFormat('es-MX', { hour: 'numeric', minute: '2-digit' }).format(new Date(m.creadoMs)) : '';
      return sep + '<div class="bz-m ' + (m.de === 'admin' ? 'admin' : '') + '"><div class="bz-bur"><small>' + (m.de === 'admin' ? 'Administración FisioTeck' : 'Miembro') + '</small>' + e(m.texto) + '<time>' + e(hora) + '</time></div></div>';
    }).join('');
  }

  async function abrir(uid, silencio) {
    elegida = uid; const ticket = ++pedido; lista();
    const raiz = $('bzHilo'); if (!raiz) return;
    if (!silencio) raiz.innerHTML = '<div class="bz-vacio">Cargando conversación…</div>';
    try {
      const r = await apiAdmin('/api/admin/soporte-chat/' + encodeURIComponent(uid));
      if (elegida !== uid || ticket !== pedido || !raiz.isConnected) return;
      const c = r.conversacion, cerrada = c.estado === 'resuelto';
      raiz.innerHTML = '<div class="bz-cab"><span class="bz-ava">' + e(iniciales(c.nombre, c.correo)) + '</span><div><b>' + e(c.nombre || 'Miembro') + '</b><a href="mailto:' + encodeURIComponent(c.correo || '') + '">' + e(c.correo || c.uid) + '</a></div>' +
        '<div class="der"><span class="bz-tag ' + (cerrada ? 're' : 'ab') + '">' + e(TEMA[c.tema] || 'Otro') + ' · ' + (cerrada ? 'Resuelto' : 'Abierto') + '</span>' +
        '<button class="btn ' + (cerrada ? 'btn-o' : 'btn-p') + ' btn-sm" id="bzEstado" data-estado="' + (cerrada ? 'abierto' : 'resuelto') + '">' + (cerrada ? 'Reabrir' : 'Marcar resuelto') + '</button></div></div>' +
        '<div class="bz-msgs" id="bzMsgs">' + htmlMsgs(r.mensajes || []) + '</div>' +
        '<form class="bz-escribir" id="bzForm"><div class="bz-fila"><textarea id="bzTexto" maxlength="3000" rows="1" placeholder="Escribe tu respuesta…" aria-label="Respuesta al miembro" required></textarea><button class="btn btn-p" type="submit" id="bzEnviar" style="height:42px;">Responder</button></div>' +
        '<div class="bz-pie"><span>Solo este miembro y administración pueden ver la respuesta.</span><span id="bzCuenta">0 / 3000</span></div><div class="bz-envio" id="bzEnvio" role="status"></div></form>';
      const msgs = $('bzMsgs'); msgs.scrollTop = msgs.scrollHeight;
      const fila = D.conversaciones.find(x => x.uid === uid); if (fila) fila.sinLeerAdmin = 0; lista();
      const b = $('bzBadge'), pend = (D.conversaciones || []).reduce((n, x) => n + (x.sinLeerAdmin || 0), 0); if (b) { b.textContent = pend; b.style.display = pend ? '' : 'none'; }
      $('bzEstado').addEventListener('click', async ev => {
        const estado = ev.currentTarget.dataset.estado;
        try { await apiAdmin('/api/admin/soporte-chat/' + encodeURIComponent(uid) + '/estado', { method: 'POST', body: JSON.stringify({ estado }) }); toast(estado === 'resuelto' ? 'Conversación resuelta. El historial se conserva.' : 'Conversación reabierta.'); await bzCargar(true); await abrir(uid, true); }
        catch (err) { toast(err.message); }
      });
      const form = $('bzForm'), texto = $('bzTexto'), btn = $('bzEnviar'), envio = $('bzEnvio');
      const medir = () => { $('bzCuenta').textContent = texto.value.length + ' / 3000'; texto.style.height = 'auto'; texto.style.height = Math.min(texto.scrollHeight, 120) + 'px'; btn.disabled = enviando || !texto.value.trim(); };
      texto.addEventListener('input', () => { if (!enviando) { envio.textContent = ''; envio.className = 'bz-envio'; } medir(); });
      texto.addEventListener('keydown', ev => { if (ev.key === 'Enter' && !ev.shiftKey && !ev.isComposing) { ev.preventDefault(); if (!enviando) form.requestSubmit(); } });
      form.addEventListener('submit', async ev => {
        ev.preventDefault();
        const msj = texto.value.trim(); if (enviando || !msj) return;
        if (!reintento || reintento.msj !== msj || reintento.uid !== uid) reintento = { msj, uid, id: uuid() };
        enviando = true; envio.className = 'bz-envio'; envio.textContent = 'Enviando…'; medir();
        try {
          await apiAdmin('/api/admin/soporte-chat/' + encodeURIComponent(uid) + '/mensajes', { method: 'POST', body: JSON.stringify({ mensaje: msj, clientRequestId: reintento.id }) });
          reintento = null; if (texto.value.trim() === msj) texto.value = '';
          envio.textContent = 'Respuesta enviada. El miembro recibe un aviso en su campana.';
          await abrir(uid, true); await bzCargar(true);
        } catch (err) { envio.className = 'bz-envio err'; envio.textContent = 'No se pudo enviar. Se conservó tu texto; puedes reintentar sin duplicarlo.'; }
        finally { enviando = false; if ($('bzTexto')) { $('bzTexto').focus({ preventScroll: true }); } }
      });
      medir();
    } catch (err) { if (!silencio) toast('No se pudo abrir la conversación: ' + err.message); }
  }

  function latido() {
    bzCargar(true);
    const sec = $('sec-buzon');
    if (sec && sec.classList.contains('active') && elegida) abrir(elegida, true);
  }
  const showOriginal = window.showSection;
  window.showSection = function (sec) {
    showOriginal.apply(this, arguments);
    if (sec === 'buzon') { montar(); bzCargar(); clearInterval(reloj); reloj = setInterval(latido, 20000); }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
  // El globo rojo debe aparecer apenas el administrador entra al panel: se arranca cuando su sesión está lista
  function iniciar() { montar(); bzCargar(true); clearInterval(reloj); reloj = setInterval(latido, 20000); }
  window.bzIniciar = iniciar;
  if (window.firebase) { try { firebase.auth().onAuthStateChanged(u => { if (u) iniciar(); }); } catch (_) { /* sin firebase */ } }
  setTimeout(() => { montar(); if (window.firebase && firebase.auth().currentUser && !reloj) iniciar(); }, 4500);
})();
