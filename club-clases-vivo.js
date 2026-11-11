/* Club FisioTeck — Clases en vivo (como en ICADEM): recuadro de la próxima clase con cuenta regresiva en vivo y estado «En vivo ahora»,
   pestañas Próximas / Grabaciones / Mis inscritas, detalle de cada clase, inscripción (se guarda en el servidor), agregar al calendario y aviso de suscripción.
   Los datos vienen de siteData.live (content.json): title, desc, date (AAAA-MM-DD), time (HH:MM, hora de Ciudad de México), duration (minutos, 60 si falta),
   instructor, instructorRole, thumbnail, badge, tieneEnlace/link, tieneGrabacion/recordingUrl.
   El enlace de la sesión y la grabación los entrega el servidor solo con membresía (joinLive / verGrabacion, de index.html).
   Depende de index.html: siteData, memberIsPaid, certFetch, joinLive, verGrabacion, driveImageUrl, showPaywallOverlay, showToast, auth. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const conPlan = () => (typeof memberIsPaid !== 'undefined' && memberIsPaid) || window.ftVistaAdmin === true;
  const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  let tab = 'proximas', tabManual = false, inscritas = new Set(), cargadas = false, timer = 0, conGrabacion = new Set(), grabT = 0;

  // Hora de Ciudad de México (UTC-6 todo el año desde 2022)
  function inicioMs(w) { const t = Date.parse((w.date || '') + 'T' + (/^\d{1,2}:\d{2}$/.test(w.time || '') ? pad(w.time.split(':')[0]) + ':' + w.time.split(':')[1] : '12:00') + ':00-06:00'); return Number.isFinite(t) ? t : 0; }
  const duracion = w => Math.max(15, Math.min(480, Number(w.duration) || 60));
  const finMs = w => inicioMs(w) + duracion(w) * 60000;
  const enVivo = (w, ahora) => { const i = inicioMs(w); return !!i && i <= ahora && ahora < finMs(w); };
  const proxima = (w, ahora) => !!inicioMs(w) && ahora < finMs(w);
  const fechaLarga = w => new Date(inicioMs(w)).toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City', weekday: 'long', day: 'numeric', month: 'long' });
  const hora = w => (w.time || '--:--') + ' h (CDMX) · ' + duracion(w) + ' min';
  const lista = () => ((typeof siteData !== 'undefined' && siteData && siteData.live) || []).filter(w => w && w.title);

  // Clases de PRUEBA: solo las ve un administrador en «Ver como usuario» (el servidor las entrega únicamente a administradores; nunca están en content.json,
  // así que a los miembros no les llegan ni como clase ni como aviso).
  let pruebaT = 0;
  async function cargarPruebas() {
    if (window.ftVistaAdmin !== true || typeof certFetch !== 'function' || Date.now() - pruebaT < 4000) return;
    pruebaT = Date.now();
    try {
      const r = await certFetch('/api/admin/clases-prueba');
      if (typeof siteData === 'undefined' || !siteData) return;
      siteData.live = (siteData.live || []).filter(w => !w.prueba).concat(r.clases || []);
      pintar(); if (window.ftBarra) ftBarra.refrescar();
    } catch (_) { /* sin servidor o sin permiso: simplemente no hay pruebas */ }
  }

  // Qué clases ya tienen grabación (Drive o la automática de Zoom → Bunny): así las tarjetas se marcan solas, sin republicar el contenido
  async function cargarGrabaciones() {
    if (!conPlan() || typeof certFetch !== 'function' || typeof auth === 'undefined' || !auth.currentUser || Date.now() - grabT < 20000) return;
    grabT = Date.now();
    try { const r = await certFetch('/api/webinars/grabaciones'); conGrabacion = new Set((r.ids || []).map(String)); pintar(); } catch (_) { /* sin servidor: se usa lo que diga el contenido publicado */ }
  }
  const tieneGrabacion = w => !!(w.tieneGrabacion || (w.recordingUrl && String(w.recordingUrl).trim()) || conGrabacion.has(String(w.id)));

  // Reproduce la grabación: la automática llega como enlace firmado de Bunny (embed); la manual sigue el camino de siempre (Drive)
  async function reproducir(id) {
    if (!conPlan()) { aviso('Las grabaciones son para miembros. Elige tu plan para verlas.'); return; }
    const w = lista().find(x => String(x.id) === String(id)) || {};
    try {
      const r = await certFetch('/api/webinars/' + encodeURIComponent(String(id)) + '/enlace?tipo=grabacion');
      if (r.embed) {
        document.getElementById('videoTitle').textContent = w.title || 'Grabación';
        document.getElementById('videoContainer').innerHTML = '<iframe src="' + esc(r.url) + '" style="width:100%;height:100%;border:none;" allow="autoplay;encrypted-media;picture-in-picture;fullscreen" allowfullscreen></iframe>';
        document.getElementById('videoModal').classList.add('active'); document.body.classList.add('modal-open');
        if (typeof incrementarStatLogro === 'function') incrementarStatLogro('webinarsAttended', id);
      } else verGrabacion(String(id));
    } catch (e) {
      if (e.status === 402) aviso('Las grabaciones son para miembros.');
      else if (typeof showToast === 'function') showToast(e.status === 404 ? 'La grabación todavía no está lista. Puede tardar unos minutos después de la clase.' : e.message);
    }
  }

  async function cargarInscritas() {
    if (cargadas || !conPlan() || typeof auth === 'undefined' || !auth.currentUser) return;
    cargadas = true;
    try { const r = await certFetch('/api/webinars/registros'); inscritas = new Set((r.ids || []).map(String)); pintar(); }
    catch (_) { cargadas = false; }
  }
  if (typeof auth !== 'undefined') auth.onAuthStateChanged(() => { inscritas = new Set(); cargadas = false; conGrabacion = new Set(); grabT = 0; cargarInscritas(); cargarGrabaciones(); setTimeout(cargarPruebas, 3500); });

  function montar() {
    const sec = $('page-courses-live'); if (!sec) return null;
    let r = $('cvRaiz');
    if (!r) {
      r = document.createElement('div'); r.id = 'cvRaiz';
      const ref = $('upcomingWebinars'); ref.parentNode.insertBefore(r, ref);
      ref.style.display = 'none'; $('pastWebinars').style.display = 'none';
      const buscar = sec.querySelector('.search-bar'); if (buscar) buscar.style.display = 'none';
    }
    return r;
  }

  function pintar() {
    const raiz = montar(); if (!raiz) return;
    clearInterval(timer); timer = 0;
    const ahora = Date.now(), todas = lista();
    const prox = todas.filter(w => proxima(w, ahora)).sort((a, b) => inicioMs(a) - inicioMs(b));
    const graba = todas.filter(w => !proxima(w, ahora) && inicioMs(w)).sort((a, b) => inicioMs(b) - inicioMs(a));
    const mias = prox.filter(w => inscritas.has(String(w.id)));
    if (!todas.length) {
      raiz.innerHTML = '<div class="cv-vacio"><b>Aún no hay clases programadas</b><span>Estamos preparando las próximas transmisiones. Te avisaremos en cuanto haya nuevas clases en vivo.</span></div>';
      return;
    }
    // Sin clases próximas la página no queda vacía: se ve la última clase grabada y la lista de grabaciones (grabadas primero)
    const conGraba = graba.filter(tieneGrabacion), sinGraba = graba.filter(w => !tieneGrabacion(w));
    const grabaOrdenadas = conGraba.concat(sinGraba);
    const tabAct = tabManual ? tab : (prox.length ? 'proximas' : 'grabaciones');
    const items = tabAct === 'grabaciones' ? grabaOrdenadas : tabAct === 'inscritas' ? mias : prox;
    const aviso = !prox.length ? '<div class="cv-sinprox"><b>Ahora mismo no hay una clase en vivo programada.</b><span>' + (conGraba.length ? 'Mientras tanto, mira las clases que ya se grabaron.' : 'Te avisaremos en cuanto haya una nueva.') + '</span></div>' : '';
    raiz.innerHTML = aviso + (prox[0] ? hero(prox[0], ahora) : conGraba[0] ? heroGrabada(conGraba[0]) : '') +
      '<div class="cv-tabs" role="tablist">' +
      [['proximas', 'Próximas', prox.length], ['grabaciones', 'Grabaciones', graba.length], ['inscritas', 'Mis inscritas', mias.length]].map(t => '<button type="button" role="tab" class="cv-tab' + (tabAct === t[0] ? ' on' : '') + '" data-t="' + t[0] + '">' + t[1] + ' · ' + t[2] + '</button>').join('') + '</div>' +
      (items.length ? '<div class="cv-grid">' + items.map(w => tarjeta(w, ahora)).join('') + '</div>' : '<div class="cv-vacio"><b>Sin clases</b><span>' + (tabAct === 'inscritas' ? 'Inscríbete a una clase y aparecerá aquí.' : 'Cambia de pestaña para ver más sesiones.') + '</span></div>');
    raiz.querySelectorAll('.cv-tab').forEach(b => b.addEventListener('click', () => { tab = b.dataset.t; tabManual = true; pintar(); }));
    const hg = raiz.querySelector('.cv-hero.grab [data-a="ver"]'); if (hg) hg.addEventListener('click', () => reproducir(hg.dataset.id));
    raiz.querySelectorAll('.cv-card').forEach(c => { c.addEventListener('click', () => detalle(c.dataset.id)); c.addEventListener('keydown', e => { if (e.key === 'Enter') detalle(c.dataset.id); }); });
    const h = raiz.querySelector('.cv-hero:not(.grab)');
    if (h) {
      const w = prox[0], id = String(w.id);
      h.querySelector('[data-a="unir"]').addEventListener('click', () => unir(id));
      h.querySelector('[data-a="inscribir"]').addEventListener('click', () => inscribir(id));
      h.querySelector('[data-a="cal"]').addEventListener('click', () => calendario(w));
      cuenta(w);
    }
  }

  function portada(w) { const img = w.thumbnail && typeof driveImageUrl === 'function' ? driveImageUrl(w.thumbnail) : ''; return img ? '<img src="' + esc(img) + '" alt="" onerror="this.remove()">' : ''; }
  function heroGrabada(w) {
    const id = String(w.id), miembro = conPlan();
    return '<section class="cv-hero grab"><div class="cv-hero-info"><span class="cv-eyebrow">Última clase grabada' + (w.prueba ? ' · prueba' : '') + '</span><h2>' + esc(w.title) + '</h2>' +
      '<div class="cv-meta"><span>' + esc(fechaLarga(w)) + '</span><span>' + duracion(w) + ' min</span>' + (w.instructor ? '<span>' + esc(w.instructor) + '</span>' : '') + '</div>' +
      (w.desc ? '<p>' + esc(w.desc) + '</p>' : '') +
      '<div class="cv-acc"><button type="button" class="cv-btn pri" data-a="ver" data-id="' + esc(id) + '">' + (miembro ? 'Ver la grabación' : 'Ver la grabación · para miembros') + '</button></div>' +
      (miembro ? '' : '<p class="cv-nota-plan">Las clases en vivo y sus grabaciones son parte de la membresía.</p>') + '</div>' +
      '<div class="cv-hero-cover">' + portada(w) + '</div></section>';
  }

  function hero(w, ahora) {
    const vivo = enVivo(w, ahora), id = String(w.id), insc = inscritas.has(id);
    return '<section class="cv-hero"><div class="cv-hero-info"><span class="cv-eyebrow' + (vivo ? ' vivo' : '') + '">' + (vivo ? 'En vivo ahora' : 'Próxima clase') + (w.prueba ? ' · prueba' : '') + '</span>' +
      '<h2>' + esc(w.title) + '</h2><div class="cv-meta"><span>' + esc(fechaLarga(w)) + '</span><span>' + esc(hora(w)) + '</span>' + (w.instructor ? '<span>' + esc(w.instructor) + '</span>' : '') + '</div>' +
      (w.desc ? '<p>' + esc(w.desc) + '</p>' : '') +
      '<div class="cv-acc"><button type="button" class="cv-btn pri" data-a="unir">' + (vivo ? 'Entrar a la transmisión' : 'Unirme a la clase') + '</button>' +
      '<button type="button" class="cv-btn" data-a="inscribir">' + (insc ? 'Inscrita ✓ · Cancelar' : 'Inscribirme') + '</button>' +
      '<button type="button" class="cv-btn" data-a="cal">Agregar al calendario</button></div></div>' +
      (vivo ? '' : '<div class="cv-cd" aria-label="Cuenta regresiva"><div><b id="cvD">00</b><small>Días</small></div><div><b id="cvH">00</b><small>Hrs</small></div><div><b id="cvM">00</b><small>Min</small></div><div><b id="cvS">00</b><small>Seg</small></div></div>') + '</section>';
  }

  function cuenta(w) {
    const t = inicioMs(w);
    const tick = () => {
      const e = { d: $('cvD'), h: $('cvH'), m: $('cvM'), s: $('cvS') };
      if (!e.d) { clearInterval(timer); timer = 0; return; }
      const dif = t - Date.now();
      if (dif <= 0) { clearInterval(timer); timer = 0; pintar(); return; } // llegó la hora: pasa a «En vivo ahora»
      e.d.textContent = pad(Math.floor(dif / 864e5)); e.h.textContent = pad(Math.floor(dif % 864e5 / 36e5)); e.m.textContent = pad(Math.floor(dif % 36e5 / 6e4)); e.s.textContent = pad(Math.floor(dif % 6e4 / 1e3));
    };
    tick(); if (!timer) timer = setInterval(tick, 1000);
  }

  function tarjeta(w, ahora) {
    const prox = proxima(w, ahora), vivo = enVivo(w, ahora), id = String(w.id), d = new Date(inicioMs(w) - 6 * 36e5 + 0);
    const img = w.thumbnail && typeof driveImageUrl === 'function' ? driveImageUrl(w.thumbnail) : '';
    const dia = Number((w.date || '').slice(8, 10)) || d.getUTCDate(), mes = MESES[(Number((w.date || '').slice(5, 7)) || (d.getUTCMonth() + 1)) - 1];
    const graba = tieneGrabacion(w);
    const bloqueo = graba && !conPlan() ? '<span class="cv-tag plan">Miembros</span>' : '';
    const etiqueta = bloqueo + (w.prueba ? '<span class="cv-tag prueba">Prueba</span>' : '') + (prox ? (vivo ? '<span class="cv-tag vivo">En vivo</span>' : inscritas.has(id) ? '<span class="cv-tag ok">Inscrita</span>' : '<span class="cv-tag">Próxima</span>') : (graba ? '<span class="cv-tag ok">Grabación</span>' : '<span class="cv-tag">Finalizada</span>'));
    return '<article class="cv-card" tabindex="0" data-id="' + esc(id) + '"><div class="cv-cover">' + (img ? '<img src="' + esc(img) + '" alt="" loading="lazy" onerror="this.remove()">' : '') + '<div class="cv-fecha"><b>' + dia + '</b><small>' + mes + '</small></div></div>' +
      '<div class="cv-body">' + etiqueta + (w.badge && prox ? '<span class="cv-tag">' + esc(w.badge) + '</span>' : '') + '<h3>' + esc(w.title) + '</h3>' +
      '<div class="cv-meta">' + (w.instructor ? '<span>' + esc(w.instructor) + '</span>' : '') + '<span>' + duracion(w) + ' min</span>' + (w.time ? '<span>' + esc(w.time) + ' h</span>' : '') + '</div></div></article>';
  }

  function detalle(id) {
    const w = lista().find(x => String(x.id) === String(id)); if (!w) return;
    const ahora = Date.now(), prox = proxima(w, ahora), vivo = enVivo(w, ahora), insc = inscritas.has(String(w.id));
    const graba = tieneGrabacion(w);
    cerrar();
    const m = document.createElement('div'); m.className = 'cv-modal'; m.id = 'cvModal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true');
    m.innerHTML = '<div class="cv-modal-caja"><button type="button" class="cv-x" aria-label="Cerrar">&times;</button>' +
      '<span class="cv-eyebrow' + (vivo ? ' vivo' : '') + '">' + (prox ? (vivo ? 'En vivo ahora' : 'Clase en vivo') : 'Grabación') + '</span><h2>' + esc(w.title) + '</h2>' +
      '<div class="cv-meta"><span>' + esc(fechaLarga(w)) + '</span><span>' + esc(hora(w)) + '</span></div>' +
      (w.instructor ? '<p class="cv-inst"><b>' + esc(w.instructor) + '</b>' + (w.instructorRole ? ' · ' + esc(w.instructorRole) : '') + '</p>' : '') +
      (w.desc ? '<p>' + esc(w.desc) + '</p>' : '') +
      '<div class="cv-acc">' + (prox ? '<button type="button" class="cv-btn pri" data-a="unir">' + (vivo ? 'Entrar ahora' : 'Unirme a la clase') + '</button><button type="button" class="cv-btn" data-a="inscribir">' + (insc ? 'Inscrita ✓ · Cancelar' : 'Inscribirme') + '</button><button type="button" class="cv-btn" data-a="cal">Calendario</button>'
        : (graba ? '<button type="button" class="cv-btn pri" data-a="ver">Reproducir grabación</button>' : '<span class="cv-nota">La grabación estará disponible pronto.</span>')) + '</div></div>';
    document.body.appendChild(m);
    m.addEventListener('click', e => { if (e.target === m || e.target.closest('.cv-x')) cerrar(); });
    document.addEventListener('keydown', escCierra);
    m.querySelector('[data-a="unir"]')?.addEventListener('click', () => unir(String(w.id)));
    m.querySelector('[data-a="inscribir"]')?.addEventListener('click', async () => { await inscribir(String(w.id)); if ($('cvModal')) detalle(w.id); });
    m.querySelector('[data-a="cal"]')?.addEventListener('click', () => calendario(w));
    m.querySelector('[data-a="ver"]')?.addEventListener('click', () => { if (!conPlan()) { cerrar(); aviso('Las grabaciones son para miembros. Elige tu plan para verlas.'); return; } cerrar(); reproducir(String(w.id)); });
  }
  function escCierra(e) { if (e.key === 'Escape') cerrar(); }
  function cerrar() { const m = $('cvModal'); if (m) m.remove(); document.removeEventListener('keydown', escCierra); }

  function aviso(txt) { if (typeof showToast === 'function') showToast(txt); if (typeof showPaywallOverlay === 'function') showPaywallOverlay(); }
  function unir(id) { if (!conPlan()) { cerrar(); aviso('Unirte a las clases en vivo es para miembros. Elige tu plan.'); return; } cerrar(); joinLive(id); }
  async function inscribir(id) {
    if (!conPlan()) { cerrar(); aviso('Inscribirte a las clases en vivo es para miembros. Elige tu plan.'); return; }
    const quiere = !inscritas.has(id);
    try {
      await certFetch('/api/webinars/' + encodeURIComponent(id) + '/registro', { method: 'POST', body: JSON.stringify({ registrado: quiere }) });
      if (quiere) inscritas.add(id); else inscritas.delete(id);
      if (typeof showToast === 'function') showToast(quiere ? 'Te inscribiste. Te avisaremos en la campana cuando falte una hora.' : 'Cancelaste tu inscripción');
      pintar(); if (window.ftAvisos && ftAvisos.recargar) ftAvisos.recargar(); if (window.ftBarra) ftBarra.refrescar();
    } catch (e) { if (e.status === 402) aviso('Inscribirte es parte de la membresía.'); else if (typeof showToast === 'function') showToast(e.message); }
  }

  function calendario(w) {
    const ini = inicioMs(w), fin = ini + duracion(w) * 60000, f = t => new Date(t).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const limpio = s => String(s || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/[,;]/g, m => '\\' + m);
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Club FisioTeck//Clase en vivo//ES', 'BEGIN:VEVENT', 'UID:clase-' + w.id + '@clubfisioteck', 'DTSTAMP:' + f(Date.now()), 'DTSTART:' + f(ini), 'DTEND:' + f(fin), 'SUMMARY:' + limpio(w.title), 'DESCRIPTION:' + limpio((w.desc || '') + ' Entra desde el Club FisioTeck > Clases en vivo.'),
      'BEGIN:VALARM', 'TRIGGER:-PT1H', 'ACTION:DISPLAY', 'DESCRIPTION:Tu clase empieza en 1 hora', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = 'clase-en-vivo.ics'; document.body.appendChild(a); a.click(); a.remove();
  }

  const original = window.renderLive;
  window.renderLive = function () { try { pintar(); cargarInscritas(); cargarGrabaciones(); cargarPruebas(); } catch (e) { if (typeof original === 'function') return original.apply(this, arguments); } };
  const pgOriginal = window.showPage;
  window.showPage = function (page) { const r = pgOriginal.apply(this, arguments); if (page === 'courses-live') { pintar(); cargarInscritas(); cargarGrabaciones(); cargarPruebas(); } else { clearInterval(timer); timer = 0; } return r; };
  window.ftClasesVivo = { pintar, inicioMs, enVivo, proxima, inscritas: () => inscritas };
})();
