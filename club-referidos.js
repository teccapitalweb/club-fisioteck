/* Club FisioTeck — Invitar amigos (referidos) y premio por invitar (como Zoorigen).
   Solo invitan los miembros con membresía vigente. Un invitado cuenta cuando confirma su correo; con 4 invitados válidos
   el miembro gana UN curso abierto antes de su fecha. El servidor (/api/referidos/*, /api/premios/usar) valida todo.
   Los referidos NO son créditos ni XP de retos: el XP de hitos de invitados se suma aparte al total de Logros.
   Depende de index.html: auth, certFetch, CERT_API, memberIsPaid, siteData, escCert, showToast, showPage, showPaywallOverlay, getTotalXP. */
(function () {
  'use strict';
  const S = { cargado: false, datos: null, xp: 0 };
  window.ftReferidos = S;
  const $ = id => document.getElementById(id);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* sin almacenamiento */ } }
  };

  // ---------- Dispositivo (para el control anti-fraude del servidor) ----------
  function idDispositivo() {
    let id = store.get('ft_dev');
    if (!id || !/^[A-Za-z0-9_-]{8,64}$/.test(id)) {
      const a = new Uint8Array(12); (window.crypto || { getRandomValues: x => x.fill(Math.floor(Math.random() * 255)) }).getRandomValues(a);
      id = 'd' + Array.from(a, b => b.toString(16).padStart(2, '0')).join('');
      store.set('ft_dev', id);
    }
    return id;
  }
  function huella() {
    const t = [navigator.language, Intl.DateTimeFormat().resolvedOptions().timeZone, screen.width + 'x' + screen.height, navigator.platform, navigator.hardwareConcurrency || ''].join('|');
    try { return btoa(unescape(encodeURIComponent(t))).replace(/=+$/, '').slice(0, 60); } catch (e) { return 'sin-huella'; }
  }
  async function pedir(ruta, cuerpo) {
    const user = auth.currentUser;
    if (!user) throw new Error('Inicia sesión para continuar.');
    const token = await user.getIdToken();
    const r = await fetch(CERT_API + ruta, {
      method: cuerpo ? 'POST' : 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token, 'x-device-id': idDispositivo(), 'x-huella': huella() },
      body: cuerpo ? JSON.stringify(cuerpo) : undefined
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(d.error || 'No se pudo completar la acción.'); e.status = r.status; throw e; }
    return d;
  }

  // ---------- Quien llega con un enlace de invitación ----------
  (function guardarCodigo() {
    try {
      const ref = new URLSearchParams(location.search).get('ref');
      if (ref && /^FT-[A-Za-z0-9_-]{6}$/.test(ref.trim())) store.set('ft_ref', ref.trim().toUpperCase());
    } catch (e) { /* sin parámetros */ }
    // Insignias de comunidad: Embajador (1 invitado válido) y La manada crece (4). Las desbloquea el servidor; aquí solo se dibujan.
  const statsOriginal = window.getPlayerStats;
  if (typeof statsOriginal === 'function') window.getPlayerStats = function () { const s = statsOriginal.apply(this, arguments); s.invitadosValidos = (S.datos && S.datos.validos) || 0; return s; };
  const icAmigos = '<svg class="ic" style="width:22px;height:22px;"><use href="#f-users"/></svg>';
  [
    { id: 'embajador', name: 'Embajador', desc: 'Invita a 1 persona que confirme su cuenta', xp: 60, check: s => s.invitadosValidos >= 1 },
    { id: 'manada_crece', name: 'La manada crece', desc: 'Invita a 4 personas que confirmen su cuenta', xp: 150, check: s => s.invitadosValidos >= 4 }
  ].forEach(b => { if (typeof BADGES !== 'undefined' && !BADGES.some(x => x.id === b.id)) BADGES.push(Object.assign({ icon: icAmigos, cat: 'especial' }, b)); });
})();
  async function registrarInvitacion() {
    const codigo = store.get('ft_ref');
    if (!codigo || !auth.currentUser) return;
    try {
      const r = await pedir('/api/referidos/registrar', { codigo, deviceId: idDispositivo(), huella: huella() });
      store.del('ft_ref');
      if (r.estado === 'pendiente-correo') showToast('Confirma tu correo (te lo enviamos) para que tu invitación cuente.');
    } catch (e) { if (e.status && e.status < 500) store.del('ft_ref'); /* si es error del servidor, se reintenta la próxima vez */ }
  }

  // ---------- XP de hitos de invitados (se suma al total de Logros) ----------
  const xpOriginal = window.getTotalXP;
  window.getTotalXP = function () { return xpOriginal.apply(this, arguments) + (S.xp || 0); };

  S.cargar = async function (silencioso) {
    try {
      const d = await pedir('/api/referidos/estado');
      S.datos = d; S.xp = d.puntosTotales || 0; S.cargado = true;
      try { updateXpWidget(); } catch (e) { /* widget aún no listo */ }
    } catch (e) { S.datos = null; S.error = e; if (!silencioso) throw e; }
    return S.datos;
  };

  // ---------- Página y menú ----------
  function montar() {
    if ($('page-referidos')) return;
    const logros = $('page-achievements'), nav = document.querySelector('.nav-item[data-page="forum"]') || document.querySelector('.nav-item[data-page="directorio"]');
    if (!logros || !nav) return;
    logros.insertAdjacentHTML('beforebegin',
      '<section class="section" id="page-referidos"><div class="page-header"><h1 class="page-title">Invitar amigos</h1>' +
      '<p class="page-subtitle">Invita a colegas al Club y gana un curso abierto antes de su fecha</p></div><div id="referidosContenido"></div></section>');
    nav.insertAdjacentHTML('afterend',
      '<div class="nav-item" data-page="referidos" onclick="showPage(\'referidos\')">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg> Invitar amigos</div>');
  }
  const showPageOriginal = window.showPage;
  window.showPage = function (page) {
    const r = showPageOriginal.apply(this, arguments);
    if (page === 'referidos') pintar();
    return r;
  };

  // Pantalla "Invitar amigos" con la estructura de Zoorigen: hero con contadores, enlace con botones de compartir, avance hacia el premio,
  // cifras, quién aceptó tu invitación y cómo cuenta un invitado.
  const ESTADO = { 'valido': ['Confirmado', 'ok'], 'pendiente-correo': ['Falta confirmar su correo', 'pend'], 'rechazado': ['No válido', 'no'] };
  const ICO = {
    copiar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg>',
    regalo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>',
    gente: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
    escudo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    candado: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'
  };
  const fechaCorta = iso => iso ? new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  function enlacesCompartir(url) {
    const t = 'Te invito al Club FisioTeck: cursos de fisioterapia y rehabilitación con certificado. ';
    return { wa: 'https://wa.me/?text=' + encodeURIComponent(t + url), fb: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),
      x: 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(t) + '&url=' + encodeURIComponent(url), mail: 'mailto:?subject=' + encodeURIComponent('Te invito al Club FisioTeck') + '&body=' + encodeURIComponent(t + url) };
  }
  const hero = (v, p, x) => window.ftdHero('Invitar amigos', 'Invita a tus amigos, <em>gana cursos antes.</em>', 'Comparte tu enlace. Cuando tus amigos se unan y confirmen su correo, tú ganas cursos antes de tiempo y puntos para tu nivel.', 'referidos',
    '<div class="rf2-cifras-hero"><div><b>' + v + '</b><span>invitados válidos</span></div><div><b>' + p + '</b><span>por confirmar</span></div><div><b>' + x + '</b><span>puntos ganados</span></div></div>');

  async function pintar() {
    const caja = $('referidosContenido');
    if (!caja) return;
    if (!memberIsPaid) {
      caja.innerHTML = hero(0, 0, 0) + '<section class="rf2-card"><h3>' + ICO.regalo + ' Invitar amigos es para miembros</h3><p>Activa tu membresía y obtén tu enlace personal. Así funciona:</p>' +
        '<ol class="rf2-pasos"><li>Compartes tu enlace con colegas.</li><li>Tu amigo crea su cuenta y confirma su correo.</li><li>Cada invitado válido suma puntos para tu nivel.</li><li>Con 4 invitados válidos abres un curso antes de su fecha.</li></ol>' +
        '<button type="button" class="ftd-btn" onclick="showPaywallOverlay()">Ver membresía</button></section>';
      return;
    }
    caja.innerHTML = hero(0, 0, 0) + '<div class="rf-vacio">Cargando…</div>';
    let d;
    try { d = await S.cargar(); } catch (e) { caja.innerHTML = hero(0, 0, 0) + '<section class="rf2-card"><p>' + escCert(e.message) + '</p><button type="button" class="ftd-btn" onclick="showPage(\'referidos\')">Reintentar</button></section>'; return; }
    if (!d) { caja.innerHTML = hero(0, 0, 0) + '<section class="rf2-card"><p>No pudimos cargar tus invitados. Intenta de nuevo en un momento.</p><button type="button" class="ftd-btn" onclick="showPage(\'referidos\')">Reintentar</button></section>'; return; }
    const p = d.premio, v = Math.min(d.validos, 4), pct = Math.round(v / 4 * 100), c = enlacesCompartir(d.enlace);
    const premio = p.usado ? '<div class="rf2-premio usado">' + ICO.regalo + '<div><strong>Premio por invitar a 4 amigos</strong><span>Ya lo usaste el ' + escCert(fechaCorta(p.usado.fecha)) + ': <b>' + escCert(nombreCurso(p.usado.cursoId)) + '</b>. Cada premio se usa una sola vez.</span></div></div>'
      : p.ganado ? '<div class="rf2-premio listo">' + ICO.regalo + '<div><strong>Tienes un premio listo</strong><span>Elige un curso y ábrelo antes de su fecha. Se usa una sola vez y no se puede cambiar el curso.</span></div><button type="button" class="ftd-btn" onclick="ftReferidos.elegirCurso(\'referidos-1\')">Elegir mi curso</button></div>'
      : '<div class="rf2-premio">' + ICO.candado + '<div><strong>Premio por invitar a 4 amigos</strong><span>Elige un curso y ábrelo antes de su fecha.</span></div><b class="falta">Te faltan ' + p.faltan + ' amigo' + (p.faltan === 1 ? '' : 's') + ' válido' + (p.faltan === 1 ? '' : 's') + '</b></div>';
    caja.innerHTML = hero(d.validos, d.pendientes, d.puntosTotales) +
      '<section class="rf2-card"><h3>Tu enlace de invitación</h3><p>Es único y es tuyo. Envíalo por el medio que prefieras.</p>' +
      '<div class="rf2-enlace"><code id="rfEnlace">' + escCert(d.enlace) + '</code><button type="button" class="ftd-btn" id="rfCopiar" onclick="ftReferidos.copiar()">Copiar enlace</button></div>' +
      '<div class="rf2-redes"><a class="wa" href="' + c.wa + '" target="_blank" rel="noopener noreferrer">WhatsApp</a><a class="fb" href="' + c.fb + '" target="_blank" rel="noopener noreferrer">Facebook</a><a class="xx" href="' + c.x + '" target="_blank" rel="noopener noreferrer">X</a><a class="ml" href="' + c.mail + '">Correo</a></div></section>' +
      '<section class="rf2-card"><h3>Tu avance hacia el premio</h3><p>Con 4 amigos válidos ganas tu premio: un curso abierto antes de su fecha, el que tú elijas.</p>' +
      '<div class="rf-barra rf2-barra"><div style="width:' + pct + '%"></div></div><div class="rf2-barra-pie"><span>' + v + ' de 4 invitados válidos</span><span>Premio al llegar a 4 amigos</span></div>' + premio +
      '<div class="rf2-cifras"><div><b>' + d.validos + '</b><span>Confirmados</span></div><div><b>' + d.pendientes + '</b><span>Por confirmar</span></div><div><b>' + d.rechazados + '</b><span>No válidos</span></div><div><b>' + d.puntosTotales + '</b><span>Puntos ganados</span></div></div></section>' +
      '<section class="rf2-card"><h3>' + ICO.gente + ' Quién aceptó tu invitación</h3><p>Solo ves el nombre y la inicial de tus invitados, nunca su correo ni su teléfono.</p>' +
      (d.invitados.length ? d.invitados.map(i => {
        const e = ESTADO[i.estado] || ['—', 'no'];
        return '<div class="rf2-inv"><div class="rf-av">' + escCert((i.alias || '?')[0]) + '</div><div class="rf2-inv-dat"><strong>' + escCert(i.alias) + '</strong><span>Aceptó tu invitación el ' + escCert(fechaCorta(i.fecha)) + '</span>' +
          (i.estado === 'valido' ? '<ul>' + i.hitos.map(h => '<li class="' + (h.logrado ? 'on' : '') + '">' + escCert(h.texto) + ': +' + h.puntos + ' puntos' + (h.logrado ? '' : ' <em>(pendiente)</em>') + '</li>').join('') + '</ul><small>Puntos de este invitado: <b>' + (i.sinPuntos ? 0 : i.puntos) + '</b>' + (i.sinPuntos ? ' (solo los primeros 6 invitados suman puntos)' : '') + '</small>'
            : i.estado === 'pendiente-correo' ? '<small>Empezará a contar en cuanto confirme su correo.</small>' : '<small>' + escCert(i.motivo || 'No cumplió las reglas de invitación.') + '</small>') +
          '</div><span class="rf2-est is-' + e[1] + '">' + e[0] + '</span></div>';
      }).join('') : '<div class="rf-vacio">Todavía nadie ha usado tu enlace. ¡Compártelo!</div>') + '</section>' +
      '<section class="rf2-card"><h3>' + ICO.escudo + ' Cómo cuenta un invitado</h3><ol class="rf2-pasos"><li>Tu amigo se registra con tu enlace.</li><li>Confirma su correo. Con Google ya queda confirmado; si usa correo y contraseña, debe abrir el mensaje de confirmación que le llega.</li><li>Se registra desde un dispositivo distinto al tuyo y al de tus otros invitados.</li></ol>' +
      '<p class="rf2-nota">El control de dispositivos ayuda a evitar cuentas repetidas, pero no es infalible: algunos casos los revisamos a mano. Invita a personas reales y no cuentas con cuentas duplicadas.</p>' +
      '<p class="rf2-nota">Además, cada invitado válido te da puntos para tu nivel: +120 si paga una suscripción, +40 si supera 5 retos y +80 si supera 15 retos (una sola vez cada uno). Solo los primeros 6 invitados suman puntos.</p></section>';
  }
  function nombreCurso(id) { const c = (siteData.courses || []).find(x => String(x.id) === String(id)); return c ? c.title : 'Curso'; }

  S.copiar = async function () {
    const t = S.datos && S.datos.enlace; if (!t) return;
    try { await navigator.clipboard.writeText(t); showToast('Enlace copiado'); }
    catch (e) { const el = $('rfEnlace'); if (el) { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); } showToast('Selecciona y copia el enlace'); }
  };

  // ---------- Usar el premio: elegir un curso cerrado ----------
  S.elegirCurso = function (clave) {
    S.claveElegida = typeof clave === 'string' ? clave : '';
    const A = window.ftAcceso || {};
    const cerrados = (siteData.courses || []).filter(c => A.escalonado && A.cursos && A.cursos[String(c.id)] && !A.cursos[String(c.id)].abierto);
    if (!cerrados.length) { showToast('Por ahora todos tus cursos están abiertos.'); return; }
    let o = $('rfModal');
    if (!o) { o = document.createElement('div'); o.id = 'rfModal'; o.className = 'rf-overlay'; o.addEventListener('mousedown', e => { if (e.target === o) o.classList.remove('is-abierto'); }); document.body.appendChild(o); }
    o.innerHTML = '<div class="rf-caja"><h3>Elige el curso que quieres abrir</h3><p>Es un solo premio y la elección no se puede cambiar.</p><div class="rf-cursos">' +
      cerrados.map(c => '<button type="button" onclick="ftReferidos.usar(\'' + escCert(c.id) + '\')"><strong>' + escCert(c.title) + '</strong><span>Se abre en ' + A.cursos[String(c.id)].dias + ' día(s)</span></button>').join('') +
      '</div><button type="button" class="rf-btn is-ghost" onclick="document.getElementById(\'rfModal\').classList.remove(\'is-abierto\')">Cancelar</button></div>';
    o.classList.add('is-abierto');
  };
  S.usar = async function (cursoId) {
    try {
      await pedir('/api/premios/usar', S.claveElegida ? { cursoId, clave: S.claveElegida } : { cursoId });
      $('rfModal').classList.remove('is-abierto');
      showToast('¡Curso abierto con tu premio!');
      if (window.ftAcceso) await ftAcceso.cargar();
      await S.cargar(true);
      if (document.getElementById('page-referidos').classList.contains('active')) pintar();
      if (window.ftPaginas) ftPaginas.logros();
    } catch (e) { showToast(e.message); }
  };

  montar();
  auth.onAuthStateChanged(u => {
    if (!u) { S.datos = null; S.xp = 0; S.cargado = false; return; }
    setTimeout(async () => { await registrarInvitacion(); if (memberIsPaid) S.cargar(true); }, 2500);
  });
})();
