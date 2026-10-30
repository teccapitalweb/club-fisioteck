/* Club FisioTeck — reseñas de cursos y logros por certificados (como Alintec y Zoorigen).
   Solo califica quien terminó el curso (el servidor lo comprueba con el certificado: POST /api/resenas).
   Las reseñas no se publican en el Club; las ve el administrador en su panel.
   Depende de index.html: auth, certFetch, escCert, showToast, BADGES, getPlayerStats, checkAchievements. */
(function () {
  'use strict';
  const S = { cargado: false, mias: {}, terminados: [] };
  window.ftResenas = S;

  const estrellas = n => '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);

  S.cargar = async function () {
    try {
      const d = await certFetch('/api/resenas/mias');
      S.mias = {}; (d.resenas || []).forEach(r => { S.mias[String(r.cursoId)] = r; });
      S.terminados = d.terminados || [];
      S.cargado = true;
      try { checkAchievements(); } catch (e) { /* logros aún no listos */ }
    } catch (e) { /* sin servidor: las reseñas simplemente no se muestran */ }
    return S;
  };

  // ---------- Tarjetas en "Mis certificados" ----------
  S.pintar = async function () {
    const huecos = document.querySelectorAll('.ft-resena');
    if (!huecos.length) return;
    await S.cargar();
    huecos.forEach(el => {
      const id = el.dataset.curso, r = S.mias[id];
      el.innerHTML = r
        ? '<div class="ftr-fila"><span class="ftr-estrellas" aria-label="' + r.estrellas + ' de 5">' + estrellas(r.estrellas) + '</span><span>Tu calificación</span><button type="button" onclick="ftResenas.abrir(\'' + id + '\')">Editar</button></div>'
        : '<div class="ftr-fila"><span>¿Qué te pareció este curso?</span><button type="button" class="ftr-cta" onclick="ftResenas.abrir(\'' + id + '\')">Calificar</button></div>';
    });
  };

  // ---------- Ventana para calificar ----------
  let cursoAbierto = null, valor = 0;
  function ventana() {
    let o = document.getElementById('ftrModal');
    if (o) return o;
    o = document.createElement('div');
    o.id = 'ftrModal'; o.className = 'ftr-overlay';
    o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true');
    o.innerHTML = '<div class="ftr-caja"><h3 id="ftrTitulo">Califica el curso</h3><p id="ftrCurso"></p>' +
      '<div class="ftr-estrellas-grandes" id="ftrEstrellas" role="radiogroup" aria-label="Estrellas"></div>' +
      '<textarea id="ftrComentario" maxlength="500" rows="4" placeholder="Cuéntanos qué te pareció (opcional)"></textarea>' +
      '<div class="ftr-error" id="ftrError" hidden></div>' +
      '<div class="ftr-acciones"><button type="button" class="ftr-sec" onclick="ftResenas.cerrar()">Cancelar</button>' +
      '<button type="button" class="ftr-cta" id="ftrEnviar" onclick="ftResenas.enviar()">Enviar</button></div></div>';
    o.addEventListener('mousedown', e => { if (e.target === o) S.cerrar(); });
    document.body.appendChild(o);
    return o;
  }
  function pintarEstrellas() {
    document.getElementById('ftrEstrellas').innerHTML = [1, 2, 3, 4, 5].map(n =>
      '<button type="button" role="radio" aria-checked="' + (n === valor) + '" class="' + (n <= valor ? 'on' : '') + '" onclick="ftResenas.elegir(' + n + ')" aria-label="' + n + (n === 1 ? ' estrella' : ' estrellas') + '">★</button>').join('');
  }
  S.elegir = function (n) { valor = n; pintarEstrellas(); };
  S.abrir = function (cursoId) {
    const o = ventana(), previa = S.mias[String(cursoId)], t = S.terminados.find(x => String(x.cursoId) === String(cursoId));
    cursoAbierto = String(cursoId); valor = previa ? previa.estrellas : 0;
    document.getElementById('ftrCurso').textContent = t ? t.curso : '';
    document.getElementById('ftrComentario').value = previa ? previa.comentario || '' : '';
    document.getElementById('ftrError').hidden = true;
    pintarEstrellas();
    o.classList.add('is-abierto');
  };
  S.cerrar = function () {
    const o = document.getElementById('ftrModal'); if (!o) return;
    if (o.classList.contains('is-abierto') && cursoAbierto && !S.mias[cursoAbierto]) omitir(cursoAbierto); // "Ahora no": se vuelve a preguntar hasta 3 veces
    o.classList.remove('is-abierto');
  };
  S.enviar = async function () {
    const err = document.getElementById('ftrError'), btn = document.getElementById('ftrEnviar');
    if (!valor) { err.textContent = 'Elige de 1 a 5 estrellas.'; err.hidden = false; return; }
    btn.disabled = true; btn.textContent = 'Enviando…'; err.hidden = true;
    try {
      const r = await certFetch('/api/resenas', { method: 'POST', body: JSON.stringify({ cursoId: cursoAbierto, estrellas: valor, comentario: document.getElementById('ftrComentario').value }) });
      S.mias[cursoAbierto] = { cursoId: cursoAbierto, estrellas: r.estrellas, comentario: r.comentario };
      S.cerrar(); showToast(r.actualizada ? 'Calificación actualizada. ¡Gracias!' : '¡Gracias por tu calificación!');
      S.pintar(); try { checkAchievements(); } catch (e) { /* logros aún no listos */ }
    } catch (e) { err.textContent = e.message; err.hidden = false; }
    btn.disabled = false; btn.textContent = 'Enviar';
  };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') S.cerrar(); });

  // ---------- Logros por certificados y reseñas ----------
  const statsOriginal = window.getPlayerStats;
  window.getPlayerStats = function () {
    const s = statsOriginal.apply(this, arguments);
    s.certificados = S.terminados.length;
    s.resenasHechas = Object.keys(S.mias).length;
    return s;
  };
  const ic = '<svg class="ic" style="width:22px;height:22px;"><use href="#f-medal"/></svg>';
  [
    { id: 'cert_1', name: 'Primer Certificado', desc: 'Obtén tu primer certificado', xp: 150, check: s => s.certificados >= 1 },
    { id: 'cert_3', name: 'Coleccionista de Certificados', desc: 'Obtén 3 certificados', xp: 400, check: s => s.certificados >= 3 },
    { id: 'curso_5', name: 'Cinco Cursos', desc: 'Termina 5 cursos', xp: 250, check: s => s.completedCourses >= 5 },
    { id: 'premio_curso', name: 'Cazador de Premios', desc: 'Gana 100 XP en premios por terminar cursos', xp: 150, check: s => (s.xpCursos || 0) >= 100 },
    { id: 'resena_1', name: 'Voz del Club', desc: 'Califica un curso que terminaste', xp: 50, check: s => s.resenasHechas >= 1 }
  ].forEach(b => { if (!BADGES.some(x => x.id === b.id)) BADGES.push(Object.assign({ icon: ic, cat: 'cursos' }, b)); });

  // ---------- Al terminar un curso (mismo orden que Alintec Food) ----------
  // 1) el servidor emite el certificado solo, con el nombre del perfil  2) si es el PRIMER certificado de la cuenta se pregunta
  // "¿tu certificado debe llevar este nombre?" (Sí / No, corregir) ANTES de enseñarlo; lo corregido también pasa al perfil
  // 3) felicitación con el certificado  4) cuando ya no hay otra ventana, la tarjeta para calificar el curso (hasta 3 veces si dice "Ahora no").
  const uid = () => (auth.currentUser || {}).uid || 'x';
  const claveOmitida = id => 'ft_resena_omitida_' + uid() + '_' + id;
  const omisiones = id => { try { return Number(localStorage.getItem(claveOmitida(id))) || 0; } catch (_) { return 0; } };
  const omitir = id => { try { localStorage.setItem(claveOmitida(id), String(omisiones(id) + 1)); } catch (_) { /* modo privado */ } };
  const MAX_OMISIONES = 3;
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  S.pendiente = null;

  // Espera a que no haya otra ventana encima (bienvenida, recorrido, cupones, etc.)
  function esperarLibre(cb, estableMs) {
    const t0 = Date.now(); let libreDesde = 0;
    const iv = setInterval(() => {
      const ocupado = document.visibilityState === 'hidden' || (window.ftCola && ftCola.hayVentana()) || document.querySelector('.ftr-overlay.is-abierto, .ftp-overlay, .fcu-ov') || (document.getElementById('certModal') || { style: {} }).style.display === 'flex';
      if (ocupado) libreDesde = 0; else if (!libreDesde) libreDesde = Date.now();
      if (libreDesde && Date.now() - libreDesde > (estableMs || 1800)) { clearInterval(iv); cb(); }
      else if (Date.now() - t0 > 600000) clearInterval(iv);
    }, 600);
  }
  const promesaLibre = ms => new Promise(r => esperarLibre(r, ms));

  function ventanaFin() {
    let o = document.getElementById('ftrFin');
    if (o) return o;
    o = document.createElement('div');
    o.id = 'ftrFin'; o.className = 'ftr-overlay'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true');
    o.innerHTML = '<div class="ftr-caja ftr-fin"><div class="ftr-trofeo" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg></div><div id="ftrFinCuerpo"></div></div>';
    document.body.appendChild(o);
    return o;
  }
  // Muestra una tarjeta y devuelve una promesa con el botón elegido
  function tarjeta(html, alMontar) {
    return new Promise(resolve => {
      const o = ventanaFin(), cuerpo = document.getElementById('ftrFinCuerpo');
      cuerpo.innerHTML = html; o.classList.add('is-abierto');
      const cerrar = v => { o.classList.remove('is-abierto'); resolve(v); };
      cuerpo.querySelectorAll('[data-fin]').forEach(b => { b.onclick = () => { if (b.dataset.fin === 'form') return; cerrar(b.dataset.fin); }; });
      if (alMontar) alMontar(cuerpo, cerrar);
    });
  }
  async function enviarNombre(ruta, cuerpo) { return certFetch(ruta, { method: 'POST', body: JSON.stringify(cuerpo) }); }
  async function refrescarPerfil() { try { await auth.currentUser.reload(); if (typeof loadUserProfile === 'function') loadUserProfile(); } catch (_) { /* se verá al recargar */ } }

  // Paso 2: nombre del primer certificado. Devuelve el certificado (con el nombre ya confirmado).
  async function confirmarNombre(cert, curso) {
    const nombre = cert.nombre;
    const pie = '<p class="ftr-pie">Una vez confirmado, el nombre de tu certificado ya no se puede cambiar. También será el nombre de tu perfil.</p>';
    const r = await tarjeta('<small>Tu certificado</small><h3>¿Tu certificado debe llevar este nombre?</h3><p class="ftr-nombre">' + esc(nombre) + '</p><p>Se usa en el certificado de «' + esc(curso) + '» y en tu perfil.</p>' +
      '<div class="ftr-acciones"><button type="button" class="ftr-sec" data-fin="corregir">No, corregir</button><button type="button" class="ftr-cta" data-fin="si">Sí, es correcto</button></div>' + pie);
    let final = nombre;
    if (r === 'corregir') {
      final = await tarjeta('<small>Tu certificado</small><h3>Escribe tu nombre completo</h3><p>Nombre y apellidos, como quieres verlos en tu certificado.</p><input class="ftr-input" id="ftrNombre" maxlength="80" value="' + esc(nombre) + '" autocomplete="name"><p class="ftr-error" id="ftrNombreError" hidden></p>' +
        '<div class="ftr-acciones"><button type="button" class="ftr-cta" data-fin="form" id="ftrNombreOk">Guardar nombre</button></div>' + pie, (cuerpo, cerrar) => {
        const inp = cuerpo.querySelector('#ftrNombre'), err = cuerpo.querySelector('#ftrNombreError'), ok = cuerpo.querySelector('#ftrNombreOk');
        setTimeout(() => { inp.focus(); inp.select(); }, 80);
        const guardar = async () => {
          ok.disabled = true; ok.textContent = 'Guardando…'; err.hidden = true;
          try { const x = await enviarNombre('/api/certificados/' + encodeURIComponent(cert.folio) + '/nombre', { nombre: inp.value }); cerrar(x.nombre); }
          catch (e) { err.textContent = e.message; err.hidden = false; ok.disabled = false; ok.textContent = 'Guardar nombre'; }
        };
        ok.onclick = guardar; inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') guardar(); });
      });
    } else {
      try { await enviarNombre('/api/certificados/' + encodeURIComponent(cert.folio) + '/nombre', { nombre }); } catch (_) { /* ya estaba confirmado */ }
    }
    if (final !== nombre) { showToast('Nombre confirmado: ' + final); await refrescarPerfil(); }
    return Object.assign({}, cert, { nombre: final });
  }
  // Cuando el nombre del perfil no sirve como nombre completo, se pide antes de emitir
  async function pedirNombreYEmitir(cursoId, curso) {
    const pie = '<p class="ftr-pie">Una vez emitido, el nombre de tu certificado ya no se puede cambiar. También será el nombre de tu perfil.</p>';
    return tarjeta('<small>Tu certificado</small><h3>Escribe tu nombre completo</h3><p>Para emitir tu certificado de «' + esc(curso) + '» necesitamos tu nombre y apellidos.</p><input class="ftr-input" id="ftrNombre" maxlength="80" value="' + esc((auth.currentUser || {}).displayName || '') + '" autocomplete="name"><p class="ftr-error" id="ftrNombreError" hidden></p>' +
      '<div class="ftr-acciones"><button type="button" class="ftr-sec" data-fin="nada">Más tarde</button><button type="button" class="ftr-cta" data-fin="form" id="ftrNombreOk">Emitir mi certificado</button></div>' + pie, (cuerpo, cerrar) => {
      const inp = cuerpo.querySelector('#ftrNombre'), err = cuerpo.querySelector('#ftrNombreError'), ok = cuerpo.querySelector('#ftrNombreOk');
      setTimeout(() => inp.focus(), 80);
      const emitir = async () => {
        ok.disabled = true; ok.textContent = 'Emitiendo…'; err.hidden = true;
        try { const x = await enviarNombre('/api/certificados/emitir', { courseId: cursoId, nombre: inp.value }); await refrescarPerfil(); cerrar(x.certificado); }
        catch (e) { err.textContent = e.message; err.hidden = false; ok.disabled = false; ok.textContent = 'Emitir mi certificado'; }
      };
      ok.onclick = emitir; inp.addEventListener('keydown', ev => { if (ev.key === 'Enter') emitir(); });
    });
  }
  // Paso 3: tarjeta del certificado (como Alintec): vista del certificado y, abajo, Cerrar · Verificar · Compartir · Descargar PDF
  async function felicitar(cert, curso) {
    const fecha = new Date(cert.emitidoEn || Date.now()).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
    const html = '<div class="ftr-certc"><small>Curso terminado</small><h3>Tu certificado está listo</h3>' +
      '<div class="ftr-papel"><div class="ftr-papel-marca">FisioTeck · IPCIL Latinoamericano</div><div class="ftr-papel-eyebrow">Certificado de aprovechamiento</div>' +
      '<div class="ftr-papel-otorga">Se otorga el presente certificado a</div><div class="ftr-papel-nombre">' + esc(cert.nombre) + '</div>' +
      '<div class="ftr-papel-por">por haber completado satisfactoriamente el curso</div><div class="ftr-papel-curso">' + esc(curso) + '</div>' +
      '<div class="ftr-papel-pie"><span><b>Emitido</b>' + esc(fecha) + '</span><span><b>Folio</b>' + esc(cert.folio) + '</span></div></div>' +
      '<div class="ftr-compartir" id="ftrCompartir" hidden><button type="button" data-d="linkedin">LinkedIn</button><button type="button" data-d="whatsapp">WhatsApp</button><button type="button" data-d="facebook">Facebook</button><button type="button" data-d="copiar">Copiar enlace</button></div>' +
      '<div class="ftr-acciones ftr-acciones--cert"><button type="button" class="ftr-sec" data-fin="cerrar">Cerrar</button><button type="button" class="ftr-sec" id="ftrVerificar">Verificar</button><button type="button" class="ftr-sec" id="ftrCompartirBtn">Compartir</button><button type="button" class="ftr-cta" id="ftrPdf">Descargar PDF</button></div>' +
      '<p class="ftr-pie">También te lo enviamos por correo y lo encuentras siempre en Certificados.</p></div>';
    await tarjeta(html, (cuerpo) => {
      cuerpo.parentNode.classList.add('ftr-caja--cert');
      cuerpo.querySelector('#ftrVerificar').onclick = () => window.open('verificar/?folio=' + encodeURIComponent(cert.folio), '_blank', 'noopener');
      cuerpo.querySelector('#ftrPdf').onclick = () => window.open(CERT_API + '/api/certificados/' + encodeURIComponent(cert.folio) + '/pdf', '_blank', 'noopener');
      const menu = cuerpo.querySelector('#ftrCompartir');
      cuerpo.querySelector('#ftrCompartirBtn').onclick = () => { menu.hidden = !menu.hidden; };
      menu.querySelectorAll('button').forEach(b => { b.onclick = () => { if (window.ftCompartirCert) ftCompartirCert(cert.folio, curso, cert.emitidoEn, b.dataset.d); }; });
    });
    const caja = document.querySelector('#ftrFin .ftr-caja'); if (caja) caja.classList.remove('ftr-caja--cert');
  }
  // Premio por terminar el curso (XP), la primera tarjeta de la secuencia
  async function mostrarPremio(bono, curso) {
    if (!bono || !bono.xp) return;
    if (window.ftCursoPremio) await ftCursoPremio.mostrar(bono, curso);
    else showToast('+' + bono.xp + ' XP por tu curso número ' + bono.ordinal);
  }
  // Insignias ganadas al terminar el curso: una tarjeta por insignia, antes de calificar
  async function mostrarInsignias() {
    const cola = window.ftInsigniasCola; if (!cola) return;
    try { if (window.ftLogros) await ftLogros.actualizar('/api/logros'); } catch (_) { /* se muestran las que ya se conocen */ }
    const ids = cola.ids.slice(); cola.ids = [];
    const lista = ids.map(id => (typeof BADGES !== 'undefined' ? BADGES : []).find(x => x.id === id)).filter(Boolean);
    for (let i = 0; i < lista.length; i++) {
      const b = lista[i];
      if (i >= 4) { showToast('¡Insignia desbloqueada! ' + b.name + ' (+' + b.xp + ' XP)'); continue; }
      await promesaLibre(600);
      await tarjeta('<small>Nueva insignia</small><div class="ftr-insignia" aria-hidden="true">' + (b.icon || '') + '</div><h3>' + esc(b.name) + '</h3><p>' + esc(b.desc) + '</p><p class="ftr-insignia-xp">+' + b.xp + ' XP</p>' +
        '<div class="ftr-acciones" style="justify-content:center"><button type="button" class="ftr-cta" data-fin="ok">Continuar</button></div>');
    }
  }
  // Paso 4: tarjeta para calificar
  S.alTerminar = async function (cursoId, datos) {
    const id = String(cursoId);
    try {
      const curso = (((typeof siteData !== 'undefined' && siteData.courses) || []).find(c => String(c.id) === id) || {}).title || 'tu curso';
      await promesaLibre(2200);
      // Orden: 1) premio de XP  2) confirmar el nombre (solo en el primer certificado)  3) certificado  4) insignias ganadas  5) calificar el curso
      const cursoObj = ((typeof siteData !== 'undefined' && siteData.courses) || []).find(c => String(c.id) === id);
      await mostrarPremio(datos && datos.bono, cursoObj);
      let cert = datos && datos.certificado;
      if (datos && datos.requiereNombre) cert = await pedirNombreYEmitir(cursoId, curso);
      else if (cert && datos.confirmarNombre) cert = await confirmarNombre(cert, curso);
      if (cert && typeof cert === 'object' && cert.nombre) await felicitar(cert, curso);
      await mostrarInsignias();
      if (!cert || typeof cert !== 'object' || !cert.nombre) return;
      await S.cargar();
      if (S.mias[id] || omisiones(id) >= MAX_OMISIONES) return;
      await promesaLibre(2500);
      S.abrir(id);
    } catch (e) { console.warn('[curso terminado]', e && e.message); }
    finally { const c = window.ftInsigniasCola; if (c) { c.retener = false; c.ids = []; } }
  };

  // En visitas posteriores: un curso con certificado, sin calificar y al que se le ha preguntado menos de 3 veces
  let pendientesRevisados = false;
  S.revisarPendientes = async function () {
    if (pendientesRevisados || !auth.currentUser) return;
    pendientesRevisados = true;
    try {
      await S.cargar();
      const t = S.terminados.find(x => !S.mias[String(x.cursoId)] && omisiones(String(x.cursoId)) < MAX_OMISIONES);
      if (!t) return;
      await promesaLibre(6000);
      if (!S.mias[String(t.cursoId)]) S.abrir(t.cursoId);
    } catch (_) { /* sin servidor */ }
  };

  // El servidor devuelve el certificado en la respuesta de /progreso al completar el curso: se guarda para el flujo de arriba
  let ultimoFin = null;
  const certFetchOriginal = window.certFetch;
  if (typeof certFetchOriginal === 'function') {
    window.certFetch = async function (ruta) {
      const r = await certFetchOriginal.apply(this, arguments);
      try { if (/^\/api\/cursos\/[^/]+\/progreso/.test(String(ruta)) && r && r.completo && (r.certificado || r.requiereNombre || r.bono)) ultimoFin = { cursoId: r.cursoId, datos: r }; } catch (_) { /* sin datos */ }
      return r;
    };
  }
  const marcarOriginal = window.markLessonComplete;
  if (typeof marcarOriginal === 'function') {
    window.markLessonComplete = async function (cursoId) {
      ultimoFin = null;
      // Las insignias nuevas se retienen para enseñarlas en su tarjeta si la clase cierra el curso; si no, se sueltan como avisos
      const cola = window.ftInsigniasCola; if (cola) { cola.retener = true; cola.ids = []; }
      window.ftFinCursoActivo = true;
      let r;
      try { r = await marcarOriginal.apply(this, arguments); } finally { window.ftFinCursoActivo = false; }
      if (ultimoFin && String(ultimoFin.cursoId) === String(cursoId)) { const f = ultimoFin; ultimoFin = null; setTimeout(() => S.alTerminar(cursoId, f.datos), 600); }
      else if (cola) setTimeout(() => {
        cola.retener = false;
        const ids = cola.ids.slice(); cola.ids = [];
        ids.forEach(id => { const b = (typeof BADGES !== 'undefined' ? BADGES : []).find(x => x.id === id); if (b) showToast('¡Insignia desbloqueada! ' + b.name + ' (+' + b.xp + ' XP)'); });
      }, 4000);
      return r;
    };
  }
  // Camino manual (cursos terminados antes de que existiera la emisión automática): al emitirse, se pide la calificación
  const emitirOriginal = window.emitirCertificado;
  if (typeof emitirOriginal === 'function') {
    window.emitirCertificado = async function () {
      const cursoId = (typeof certCursoActual !== 'undefined') ? String(certCursoActual) : null;
      const r = await emitirOriginal.apply(this, arguments);
      if (cursoId) { await S.cargar(); if (S.terminados.some(t => String(t.cursoId) === cursoId) && !S.mias[cursoId]) setTimeout(() => S.abrir(cursoId), 900); }
      return r;
    };
  }

  auth.onAuthStateChanged(u => { if (u) setTimeout(() => { S.cargar(); S.revisarPendientes(); }, 1500); else { S.mias = {}; S.terminados = []; S.cargado = false; } });
})();
