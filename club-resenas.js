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
  // Vista del certificado: la MISMA composición del PDF (services/certificado-pdf.js) dibujada en un lienzo de 1040 x 735 que se escala al ancho de la tarjeta
  function vistaCertificado(cert, curso, fecha) {
    const A = '#0A3E68', B = '#0D5FA0', T = '#159E92', G = '#5B7186', L = '#C9D8E6';
    const nombre = String(cert.nombre || 'ALUMNO').toUpperCase();
    let tn = 44; while (tn > 22 && nombre.length * (0.74 * tn + 2) > 700) tn--;
    const titulo = String(cert.curso || curso || 'Programa académico');
    let tc = 28; const lineas = s => Math.max(1, Math.ceil(titulo.length * 0.47 * s / 800)); while (tc > 16 && lineas(tc) * tc * 1.15 > 66) tc--;
    const altoC = lineas(tc) * tc * 1.15, sesiones = Number(cert.clases) || 0;
    const txt = (top, css, s) => '<div class="fc-t" style="top:' + top + 'px;' + css + '">' + s + '</div>';
    const hueco = (848 - (150 + 256 + 256 + 100)) / 3, xQr = 96, xF1 = xQr + 150 + hueco, xF2 = xF1 + 256 + hueco, xSello = xF2 + 256 + hueco;
    const firma = (x, img, nom, rol, inst) => '<img class="fc-i" src="assets/cert/' + img + '" alt="" style="left:' + (x + (256 - 194.56) / 2) + 'px;top:520px;width:194.56px;height:60px;object-fit:contain;object-position:center bottom">' +
      '<div class="fc-l" style="left:' + x + 'px;top:590px;width:256px;border-top:1px solid #9AA9B8"></div>' +
      '<div class="fc-t" style="left:' + x + 'px;width:256px;top:600px;font:700 15px Times,\'Times New Roman\',serif;color:' + A + '">' + nom + '</div>' +
      '<div class="fc-t" style="left:' + x + 'px;width:256px;top:622px;font:700 8.5px Helvetica,Arial,sans-serif;letter-spacing:1.2px;color:' + G + '">' + rol + '</div>' +
      (inst ? '<div class="fc-t" style="left:' + x + 'px;width:256px;top:636px;font:8.5px Helvetica,Arial,sans-serif;color:' + G + '">' + inst + '</div>' : '');
    return '<div class="fc-marco" id="ftrCertMarco"><div class="fc-lienzo" id="ftrCertLienzo">' +
      '<div class="fc-l" style="left:26px;top:26px;width:988px;height:683px;border:2.5px solid ' + A + ';box-sizing:border-box"></div>' +
      '<div class="fc-l" style="left:33px;top:33px;width:974px;height:669px;border:1px solid ' + T + ';box-sizing:border-box"></div>' +
      '<div class="fc-l" style="left:26px;top:26px;width:988px;height:8px;background:' + A + '"></div><div class="fc-l" style="left:26px;top:701px;width:988px;height:8px;background:' + T + '"></div>' +
      '<img class="fc-i" src="assets/cert/logo.png" alt="" style="left:402px;top:54px;height:48px">' +
      txt(110, 'font:10.5px Helvetica,Arial,sans-serif;letter-spacing:2.2px;color:' + G, 'FORMACIÓN CONSTANTE, RESULTADOS EXCELENTES') +
      '<div class="fc-l" style="left:393px;top:154px;width:90px;border-top:1px solid ' + L + '"></div><div class="fc-l" style="left:557px;top:154px;width:90px;border-top:1px solid ' + L + '"></div>' +
      '<svg class="fc-i" style="left:507px;top:141px;width:26px;height:30px" viewBox="0 0 26 30" fill="none" stroke-linejoin="round"><circle cx="13" cy="10" r="7" stroke="' + A + '" stroke-width="1.3"/><circle cx="13" cy="10" r="4" stroke="' + T + '" stroke-width=".8"/><path d="M9 16L7 25L13 21L19 25L17 16" stroke="' + A + '" stroke-width="1.3"/></svg>' +
      txt(176, 'font:700 34px Times,\'Times New Roman\',serif;letter-spacing:4px;color:' + A, 'CERTIFICADO DE ACREDITACIÓN') +
      '<div class="fc-l" style="left:475px;top:226px;width:90px;height:2px;background:' + T + '"></div>' +
      txt(252, 'font:14px Helvetica,Arial,sans-serif;color:' + G, 'Se otorga la presente constancia a') +
      txt(282 + (44 - tn) / 2, 'font:700 ' + tn + 'px Times,\'Times New Roman\',serif;letter-spacing:2px;color:' + A, esc(nombre)) +
      '<div class="fc-l" style="left:290px;top:344px;width:460px;height:1px;background:' + B + ';opacity:.55"></div>' +
      txt(368, 'font:13px Helvetica,Arial,sans-serif;color:' + G, 'Por haber acreditado satisfactoriamente el programa académico denominado:') +
      '<div class="fc-t" style="left:120px;width:800px;top:396px;white-space:normal;line-height:1.15;font:italic 700 ' + tc + 'px/1.15 Times,\'Times New Roman\',serif;color:' + B + '">' + esc(titulo) + '</div>' +
      txt(396 + altoC + 18, 'font:700 10.5px Helvetica,Arial,sans-serif;letter-spacing:1.4px;color:' + G, 'CARGA ACADÉMICA: ' + sesiones + (sesiones === 1 ? ' SESIÓN' : ' SESIONES') + '   |   MODALIDAD: EN LÍNEA') +
      txt(396 + altoC + 38, 'font:italic 11px Helvetica,Arial,sans-serif;color:' + G, 'Emitido el ' + esc(fecha)) +
      '<img class="fc-i" src="' + CERT_API + '/api/certificados/' + encodeURIComponent(cert.folio) + '/qr.png" alt="" style="left:' + (xQr + 27) + 'px;top:512px;width:96px;height:96px">' +
      '<div class="fc-t" style="left:' + xQr + 'px;width:150px;top:616px;font:700 8px/1.6 Helvetica,Arial,sans-serif;letter-spacing:1.6px;color:' + G + '">ESCANEA<br>PARA VALIDAR</div>' +
      firma(xF1, 'firma-directora.png', 'Lic. Paulina Torres Montalvo', 'DIRECTORA ACADÉMICA', 'Club FisioTeck') +
      firma(xF2, 'firma-coordinacion.png', 'Coordinación de Certificación', 'IPCIL LATINOAMERICANO', '') +
      '<svg class="fc-i" style="left:' + (xSello + 7) + 'px;top:528px;width:86px;height:101px" viewBox="0 0 90 106" fill="none"><circle cx="45" cy="40" r="34" stroke="' + A + '" stroke-width="1.4"/><circle cx="45" cy="40" r="27" stroke="' + T + '" stroke-width=".8"/><text x="45" y="49" text-anchor="middle" font-family="Times,\'Times New Roman\',serif" font-weight="700" font-size="24" fill="' + A + '">FT</text><path d="M30 66L24 104L45 90L66 104L60 66Z" fill="' + A + '"/><path d="M33 68L29 96L45 85L61 96L57 68Z" fill="' + B + '"/><circle cx="45" cy="40" r="34" stroke="' + T + '" stroke-width=".5" stroke-dasharray=".5 3"/></svg>' +
      '<div class="fc-l" style="left:48px;top:668px;width:944px;border-top:1px solid ' + L + '"></div>' +
      txt(678, 'font:9px Helvetica,Arial,sans-serif;color:' + G, 'Folio: <b>' + esc(cert.folio) + '</b>  ·  club.fisioteck.com  ·  Certificado emitido digitalmente por Club FisioTeck / IPCIL Latinoamericano') +
      '</div></div>';
  }
  function ajustarVistaCertificado(cuerpo) {
    const marco = cuerpo.querySelector('#ftrCertMarco'), lienzo = cuerpo.querySelector('#ftrCertLienzo'); if (!marco || !lienzo) return;
    const ajustar = () => { if (!marco.isConnected) { window.removeEventListener('resize', ajustar); return; } lienzo.style.transform = 'scale(' + (marco.clientWidth / 1040) + ')'; };
    ajustar(); window.addEventListener('resize', ajustar);
  }
  // Paso 3: tarjeta del certificado (como Alintec): vista del certificado y, abajo, Cerrar · Verificar · Compartir · Descargar PDF
  async function felicitar(cert, curso) {
    const fecha = new Date(cert.emitidoEn || Date.now()).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Mexico_City' });
    const html = '<div class="ftr-certc"><small>Curso terminado</small><h3>Tu certificado está listo</h3>' + vistaCertificado(cert, curso, fecha) +
      '<div class="ftr-compartir" id="ftrCompartir" hidden><button type="button" data-d="linkedin">LinkedIn</button><button type="button" data-d="whatsapp">WhatsApp</button><button type="button" data-d="facebook">Facebook</button><button type="button" data-d="copiar">Copiar enlace</button></div>' +
      '<div class="ftr-acciones ftr-acciones--cert"><button type="button" class="ftr-sec" data-fin="cerrar">Cerrar</button><button type="button" class="ftr-sec" id="ftrVerificar">Verificar</button><button type="button" class="ftr-sec" id="ftrCompartirBtn">Compartir</button><button type="button" class="ftr-cta" id="ftrPdf">Descargar PDF</button></div>' +
      '<p class="ftr-pie">También te lo enviamos por correo y lo encuentras siempre en Certificados.</p></div>';
    await tarjeta(html, (cuerpo) => {
      cuerpo.parentNode.classList.add('ftr-caja--cert');
      ajustarVistaCertificado(cuerpo);
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
