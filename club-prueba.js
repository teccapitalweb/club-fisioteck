/* Club FisioTeck — prueba gratuita (misma lógica y diseño que Alintec Food y Zoorigen).
   Cada cuenta nueva elige UN curso, una sola vez. Mientras no lo elige, "Mis cursos" muestra solo los títulos con el botón
   "Elegir como prueba gratuita" y cualquier curso que toque abre un aviso, nunca el contenido. Flujo: tarjeta "Tu prueba gratuita"
   (después de la bienvenida y el recorrido) → Mis cursos con la tarjeta de selección → confirmación "¿Seguro que deseas este curso?"
   → el curso elegido se abre (todas sus clases menos la última). El servidor (club-fisioteck-webhooks: /api/prueba-gratuita) guarda
   la elección y autoriza el video; aquí solo se muestra y se pide.
   Depende de index.html: auth, siteData, memberIsPaid, WEBHOOK_URL, showToast, showPage, openCourseDetail;
   de club-cursos.js (ftCursos, ftImagenCurso) y club-recorrido.js (ftCola, ftRecorrido). */
(function () {
  'use strict';

  const estado = { cargado: false, estado: null, cursoId: null };
  window.ftPrueba = estado;
  window.ftEsPrueba = function (cursoId) {
    return estado.estado === 'elegida' && String(estado.cursoId) === String(cursoId);
  };

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const PLAY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
  const CERRAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  // ---------- Servidor ----------
  async function llamar(metodo, cuerpo) {
    const user = auth.currentUser;
    if (!user) throw new Error('Inicia sesión para continuar.');
    const token = await user.getIdToken();
    const resp = await fetch(((location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://localhost:3000' : WEBHOOK_URL) + '/api/prueba-gratuita', {
      method: metodo,
      headers: Object.assign({ Authorization: 'Bearer ' + token }, cuerpo ? { 'Content-Type': 'application/json' } : {}),
      body: cuerpo ? JSON.stringify(cuerpo) : undefined
    });
    const datos = await resp.json().catch(() => ({}));
    if (!resp.ok) { const e = new Error(datos.error || 'No se pudo completar la acción.'); e.datos = datos; throw e; }
    return datos;
  }

  const curso = id => (siteData.courses || []).find(c => String(c.id) === String(id));
  const imagen = c => (window.ftImagenCurso ? ftImagenCurso(c) : '');
  const pendiente = () => !memberIsPaid && estado.estado === 'pendiente';
  const elegible = c => !!c && (c.lessons || []).length >= 2 && !c.comingSoon;

  // ---------- Ventanas (cabecera con icono, título, subtítulo y X; cuerpo; pie) ----------
  function cerrar(id) {
    const o = document.getElementById(id);
    if (!o) return;
    const al = o._alCerrar; o.remove();
    if (!document.querySelector('.ftp-overlay.is-open')) document.body.classList.remove('modal-open');
    if (al) al();
  }
  window.ftPruebaCerrar = cerrar;
  function modal(o) {
    cerrar(o.id);
    const ov = document.createElement('div');
    ov.id = o.id; ov.className = 'ftp-overlay is-open'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', o.titulo);
    ov.innerHTML = '<div class="ftm-card"><header class="ftm-cab"><span class="ftm-ic">' + PLAY + '</span><div class="ftm-tit"><h2>' + esc(o.titulo) + '</h2>' + (o.sub ? '<small>' + esc(o.sub) + '</small>' : '') + '</div>' +
      '<button type="button" class="ftm-x" aria-label="Cerrar">' + CERRAR + '</button></header><div class="ftm-cuerpo">' + o.cuerpo + '</div><footer class="ftm-pie"></footer></div>';
    const pie = ov.querySelector('.ftm-pie');
    o.pie.forEach(b => {
      const bt = document.createElement('button'); bt.type = 'button'; bt.className = 'ftm-btn' + (b.suave ? ' suave' : '') + (b.brillo ? ' brillo' : ''); bt.textContent = b.texto; bt.onclick = () => b.clic(bt, ov); pie.appendChild(bt);
    });
    ov._alCerrar = o.alCerrar;
    ov.querySelector('.ftm-x').onclick = () => cerrar(o.id);
    if (o.fondo !== false) ov.addEventListener('mousedown', e => { if (e.target === ov) cerrar(o.id); });
    document.body.appendChild(ov); document.body.classList.add('modal-open');
    const ultimo = pie.lastElementChild; if (ultimo) ultimo.focus({ preventScroll: true });
    return ov;
  }
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const o = [...document.querySelectorAll('.ftp-overlay.is-open')].pop();
    if (o) cerrar(o.id);
  });

  // Abanico con las portadas de los primeros cursos y la etiqueta GRATIS
  function arte(clase) {
    const u = ((siteData && siteData.courses) || []).map(imagen).filter(Boolean).slice(0, 3);
    const limpiar = x => String(x).replace(/['"()\\\s]/g, ch => '%' + ch.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'));
    while (u.length < 3) u.push('');
    return '<div class="pg-art' + (clase ? ' ' + clase : '') + '" aria-hidden="true">' +
      u.map((x, i) => '<i class="pg-cover pg-cover--' + i + '"' + (x ? ' style="background-image:url(\'' + esc(limpiar(x)) + '\')"' : '') + '></i>').join('') + '<span class="pg-badge">Gratis</span></div>';
  }

  // ---------- Tarjeta dentro de Mis cursos (debajo del título) ----------
  window.ftPruebaTarjeta = function () {
    if (!pendiente()) return '';
    return '<div class="prueba-card" id="prueba-card">' + arte('prueba-card__art') +
      '<div><span class="prueba-card__kick">Tu prueba gratuita</span><h3>Selecciona el curso de tu preferencia para obtener tu prueba gratuita</h3>' +
      '<p>Solo puedes elegir <strong>un</strong> curso y después no se puede cambiar.</p></div></div>';
  };
  function irACursos() {
    try { showPage('library'); } catch (_) { /* sin panel */ }
    setTimeout(() => { const t = document.getElementById('prueba-card'); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 600);
  }
  window.ftPruebaElegir = irACursos;

  // ---------- Presentación "Tu prueba gratuita" (una vez por visita de cada cuenta) ----------
  function intro() {
    let llevado = false;
    const ir = () => { if (llevado) return; llevado = true; irACursos(); };
    modal({
      id: 'ftpIntro', titulo: 'Tu prueba gratuita', sub: 'Una función para usuarios nuevos', fondo: false, alCerrar: ir,
      cuerpo: arte() + '<p class="prueba-aviso">Al ser un usuario nuevo, <strong>te damos a elegir un curso de tu interés como prueba gratuita</strong>.</p><p class="prueba-aviso">Lo eliges en <strong>Mis cursos</strong>.</p>',
      pie: [{ texto: 'Elegir mi curso', brillo: true, clic: () => cerrar('ftpIntro') }]
    });
  }

  // ---------- Aviso: tocó un curso sin haber elegido su prueba ----------
  window.ftPruebaAviso = function (id) {
    const c = curso(id), pie = [{ texto: 'Cerrar', suave: true, clic: () => cerrar('ftpAviso') }];
    if (elegible(c)) pie.push({ texto: 'Elegir este curso', clic: () => { cerrar('ftpAviso'); setTimeout(() => ftPruebaConfirmar(c.id), 200); } });
    modal({ id: 'ftpAviso', titulo: 'Selecciona tu prueba gratuita', cuerpo: arte() + '<p class="prueba-aviso">Elige el curso de tu preferencia para poder ver el contenido de los cursos.</p>', pie });
  };

  // ---------- Confirmación ----------
  window.ftPruebaConfirmar = function (id) {
    const c = curso(id);
    if (!c || !pendiente()) return;
    const img = imagen(c);
    modal({
      id: 'ftpConfirmar', titulo: '¿Seguro que deseas este curso?', sub: 'Tu prueba gratuita', fondo: false,
      cuerpo: '<div class="prueba-portada-wrap"><div class="prueba-portada"' + (img ? ' style="background-image:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.35)),url(\'' + esc(img) + '\')"' : '') + '></div><span class="pg-badge pg-badge--esquina">Gratis</span></div>' +
        '<div class="prueba-curso">' + esc(c.title) + '</div><p class="prueba-aviso">Será tu <strong>prueba gratuita</strong>.</p>' +
        '<p class="prueba-aviso"><strong>Solo puedes elegir uno y después no se puede cambiar.</strong></p><p class="ftp-error" id="ftpError" role="alert"></p>',
      pie: [
        { texto: 'No, ver otros cursos', suave: true, clic: () => cerrar('ftpConfirmar') },
        { texto: 'Sí, es mi prueba gratuita', clic: (bt, ov) => guardar(c, bt, ov) }
      ]
    });
  };

  async function guardar(c, si, ov) {
    const botones = ov.querySelectorAll('.ftm-btn'), err = document.getElementById('ftpError');
    botones.forEach(b => { b.disabled = true; }); si.textContent = 'Guardando…';
    try {
      const r = await llamar('POST', { courseId: c.id });
      estado.estado = 'elegida'; estado.cursoId = r.cursoId;
      avisarOtrasPestanas();
      document.querySelectorAll('.ftp-overlay').forEach(o => o._alCerrar = null);
      cerrar('ftpConfirmar');
      actualizarInterfaz();
      showToast('¡Listo! Tu prueba gratuita está activa. Ya puedes ver las clases de «' + c.title + '».');
      showPage('library');
      setTimeout(() => openCourseDetail(Number(r.cursoId)), 420);
    } catch (e) {
      if (e.datos && e.datos.cursoId !== undefined) { // ya había elegido (otra pestaña)
        estado.estado = 'elegida'; estado.cursoId = e.datos.cursoId;
        cerrar('ftpConfirmar'); actualizarInterfaz();
        showToast('Ya elegiste tu prueba gratuita; quedó guardada.');
        return;
      }
      if (err) err.textContent = e.message;
      botones.forEach(b => { b.disabled = false; }); si.textContent = 'Sí, es mi prueba gratuita';
    }
  }

  // Si la prueba se elige en otra pestaña, esta se actualiza sola
  const canal = (() => { try { return new BroadcastChannel('ft_prueba'); } catch (_) { return null; } })();
  function avisarOtrasPestanas() { try { if (canal) canal.postMessage('elegida'); } catch (_) { /* sin canal */ } }
  if (canal) canal.onmessage = () => { cargando = false; estado.cargado = false; if (!memberIsPaid) iniciar(); };

  // ---------- Banner dorado y Mis cursos ----------
  function actualizarInterfaz() {
    const plan = document.querySelector('.sidebar-user-plan');
    if (plan && !memberIsPaid) plan.textContent = estado.estado === 'pendiente' ? 'Prueba gratuita' : 'Cuenta gratuita';
    const banner = document.getElementById('explorationBanner');
    if (banner && !memberIsPaid) {
      const titulo = banner.querySelector('div[style*="font-weight:600"]');
      const sub = banner.querySelector('div[style*="rgba(255,255,255,.6)"]');
      let extra = banner.querySelector('.ftp-banner-btn');
      if (estado.estado === 'pendiente' && titulo && sub) {
        titulo.textContent = 'Tienes un curso de prueba esperándote';
        sub.textContent = 'Elige un curso y míralo gratis: todas sus clases y materiales, menos el último. El resto de los cursos se abre con la membresía.';
        if (!extra) {
          const suscribir = banner.querySelector('button');
          if (suscribir) suscribir.insertAdjacentHTML('beforebegin', '<button type="button" class="ftp-banner-btn" onclick="ftPruebaElegir()">Elegir mi curso</button>');
        }
      } else if (estado.estado === 'elegida' && titulo && sub) {
        const c = curso(estado.cursoId);
        titulo.textContent = 'Prueba gratuita activa' + (c ? ' · ' + c.title : '');
        sub.textContent = 'Tu curso está abierto, menos su última clase y su último material. Suscríbete para abrirlo todo, además del resto de cursos y herramientas.';
        if (extra) extra.remove();
      } else if (extra) {
        extra.remove();
      }
    }
    if (window.ftCursos) ftCursos.pintar();
  }

  // Sin haber elegido la prueba, ningún curso muestra su contenido (ni desde Inicio, el buscador o un enlace)
  function guardarDetalle() {
    const original = window.openCourseDetail;
    if (typeof original !== 'function') return;
    window.openCourseDetail = function (id) {
      if (pendiente()) { ftPruebaAviso(id); return; }
      return original.apply(this, arguments);
    };
  }
  window.addEventListener('load', guardarDetalle);

  // ---------- Arranque ----------
  let cargando = false;
  const claveVisita = () => { const u = auth.currentUser; return u ? 'ft_prueba_intro_' + u.uid : null; };
  function recorridoListo() {
    const u = auth.currentUser;
    try { if (localStorage.getItem('ft_tour_' + u.uid) === '1') return true; } catch (_) { /* sin almacenamiento */ }
    if (typeof achievementData !== 'undefined' && achievementData.bienvenida) return true;
    const creada = u.metadata && u.metadata.creationTime ? new Date(u.metadata.creationTime).getTime() : 0;
    return !creada || Date.now() - creada > 3 * 864e5;
  }
  function programarIntro() {
    const k = claveVisita(); let visto = false;
    try { visto = sessionStorage.getItem(k) === '1'; } catch (_) { /* sin almacenamiento */ }
    if (visto || !k) return;
    let intentos = 0;
    const t = setInterval(() => {
      if (!pendiente() || ++intentos > 400) { clearInterval(t); return; }
      if (window.ftBienvenida && !ftBienvenida.vista()) return; // primero la bienvenida con confeti
      if (!recorridoListo()) return; // después el recorrido guiado
      clearInterval(t);
      try { sessionStorage.setItem(k, '1'); } catch (_) { /* sin almacenamiento */ }
      const mostrar = () => { if (pendiente() && !document.getElementById('ftpIntro')) intro(); };
      if (window.ftCola) ftCola.cuandoLibre(mostrar, 'prueba'); else mostrar();
    }, 1500);
  }
  async function iniciar() {
    if (memberIsPaid || cargando || !auth.currentUser) return;
    cargando = true;
    try {
      const r = await llamar('GET');
      estado.cargado = true; estado.estado = r.estado; estado.cursoId = r.cursoId;
    } catch (e) {
      console.warn('[prueba] no se pudo consultar:', e.message);
      cargando = false; return; // sin servidor: el Club sigue como antes
    }
    cargando = false;
    actualizarInterfaz();
    if (estado.estado === 'pendiente') programarIntro();
  }
  window.ftPruebaIntro = intro;

  // El Club llama a showExplorationBanner siempre que la cuenta no tiene membresía vigente.
  const bannerOriginal = window.showExplorationBanner;
  if (typeof bannerOriginal === 'function') {
    window.showExplorationBanner = function () {
      const r = bannerOriginal.apply(this, arguments);
      setTimeout(() => { estado.cargado ? actualizarInterfaz() : iniciar(); }, 0);
      return r;
    };
  }
})();
