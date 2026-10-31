/* Club FisioTeck — Inicio (misma estructura que el panel de Alintec Food, con la paleta de FisioTeck):
   bienvenida con fecha y mascota, "Continúa tu curso" con foto, "Tu siguiente meta", cuatro contadores, noticias estilo periódico y una columna
   derecha con clases en vivo, comunidad y —solo para miembros— descuento, actividad y presencia en el directorio.
   Se dibuja encima de la página de inicio de index.html (la oculta con CSS) y se actualiza cuando cambian los datos.
   Depende de index.html: siteData, getCourseProgress, memberIsPaid, achievementData, BADGES, showPage, openCourseDetail, certFetch,
   ftPrueba, FT_RETOS, ftNoticias, ftMascota y de club-diseno.css. */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = id => document.getElementById(id);
  const ic = (id, tam) => '<svg class="ic" style="width:' + (tam || 16) + 'px;height:' + (tam || 16) + 'px" aria-hidden="true"><use href="#' + id + '"/></svg>';
  const SOL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const LUNA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  const extra = { t: 0, certificados: null };
  async function cargarExtra() {
    if (Date.now() - extra.t < 60000 || typeof auth === 'undefined' || !auth.currentUser) return;
    extra.t = Date.now();
    try { extra.certificados = ((await certFetch('/api/certificados/mios')).certificados || []).length; } catch (_) { /* sin servidor */ }
    if (extra.certificados !== null) pintar(true);
  }
  const imagen = c => { const u = (c && c.thumbnail) || ''; if (!u) return ''; return /^(https?:|assets\/|data\/)/.test(u) && !/drive\.google\.com/.test(u) ? u : (typeof driveImageUrl === 'function' ? driveImageUrl(u) : u); };

  function datos() {
    const cursos = (typeof siteData !== 'undefined' && siteData.courses) || [];
    let clases = 0, totalClases = 0, completos = 0, actual = null, primero = null;
    cursos.forEach(c => {
      const total = (c.lessons || []).length, comp = (getCourseProgress(c.id).completed) || [], hechas = comp.length, cerrado = window.ftCursoCerrado && ftCursoCerrado(c.id);
      const sigIdx = Math.max(0, (c.lessons || []).findIndex((l, i) => !(comp.includes(i) || (l && l.id !== undefined && comp.includes(l.id)))));
      clases += hechas; totalClases += total;
      if (total > 0 && hechas >= total) completos++;
      else if (!cerrado && total > 0) {
        if (!primero) primero = { c, hechas, total, sigIdx };
        if (hechas > 0 && (!actual || hechas / total > actual.hechas / actual.total)) actual = { c, hechas, total, sigIdx };
      }
    });
    // Sin membresía: el curso actual es SIEMPRE el que eligió como prueba (con sus clases gratis: todas menos la última); si aún no elige, no se le sugiere ninguno
    let pruebaPend = false;
    if (typeof memberIsPaid !== 'undefined' && !memberIsPaid && window.ftPrueba) {
      if (ftPrueba.estado === 'pendiente') { pruebaPend = true; primero = null; actual = null; }
      else if (ftPrueba.estado === 'elegida') {
        const t = cursos.find(c => String(c.id) === String(ftPrueba.cursoId));
        if (t) {
          const lecc = t.lessons || [], gratis = Math.max(0, lecc.length - 1), comp = (getCourseProgress(t.id).completed) || [];
          const hechas = Math.min(comp.length, gratis);
          const sigIdx = Math.min(Math.max(0, gratis - 1), Math.max(0, lecc.findIndex((l, i) => !(comp.includes(i) || (l && l.id !== undefined && comp.includes(l.id))))));
          primero = { c: t, hechas, total: gratis, sigIdx, prueba: true };
          actual = hechas > 0 && hechas < gratis ? primero : null;
        }
      }
    }
    const R = (typeof achievementData !== 'undefined' && achievementData.retos) || {};
    const D = window.FT_RETOS;
    return { cursos, clases, totalClases, completos, pruebaPend, curso: actual || primero, enProgreso: !!actual, todoCompleto: cursos.length > 0 && completos === cursos.length,
      proximo: window.ftAcceso && ftAcceso.proximo ? ftAcceso.proximo() : null,
      retosHechos: Object.keys(R.hechos || {}).length, retosTotal: D ? (D.quiz.length + D.orden.length) : 0,
      ins: ((typeof achievementData !== 'undefined' && achievementData.unlocked) || []).length, totalIns: (typeof BADGES !== 'undefined' ? BADGES.length : 0),
      racha: (typeof achievementData !== 'undefined' && achievementData.streak) || 0 };
  }

  function meta(d) {
    const sin = !memberIsPaid && !(window.ftPrueba && ftPrueba.estado === 'elegida');
    const c = d.curso;
    if (sin && window.ftPrueba && ftPrueba.estado === 'pendiente') return { titulo: 'Elige tu curso de prueba', pasos: [['Ahora', 'Escoge el curso con el que quieres empezar'], ['Después', 'Mira todas sus clases menos la última'], ['Al completar', 'Activa tu membresía y abre todo el catálogo']], accion: () => showPage('library') };
    if (sin) return { titulo: 'Activa tu membresía', pasos: [['Ahora', 'Explora los cursos y elige tu prueba gratuita'], ['Después', 'Activa tu membresía para abrir todas las clases'], ['Al completar', 'Obtén tu certificado con folio verificable']], accion: () => showPaywallOverlay() };
    if (!c) return { titulo: 'Tu siguiente paso', pasos: [['Ahora', 'Explora la biblioteca de cursos'], ['Después', 'Supera tu primer reto'], ['Al completar', 'Obtén tu primer certificado']], accion: () => showPage('library') };
    const sig = c.hechas + 1;
    const abrirClase = () => { showPage('library'); setTimeout(() => { openCourseDetail(c.c.id); setTimeout(() => { try { playLesson(c.sigIdx); } catch (_) { /* queda en el detalle del curso */ } }, 150); }, 60); };
    return {
      titulo: d.enProgreso ? 'Continúa «' + c.c.title + '»' : 'Comienza «' + c.c.title + '»',
      pasos: [['Ahora', d.enProgreso ? 'Sigue con la clase ' + sig + ' de ' + c.total : 'Comienza «' + c.c.title + '»'],
        ['Después', sig < c.total ? 'Avanza a la clase ' + (sig + 1) + ' de ' + c.total : (c.prueba ? 'Activa tu membresía para abrir la última clase' : 'Termina el curso y pide tu certificado')],
        ['Al completar', c.prueba ? 'Activa tu membresía para terminar el curso y obtener tu certificado' : 'Obtén tu certificado y desbloquea el siguiente curso']],
      accion: abrirClase
    };
  }

  function barra(t, v, max) { const p = max > 0 ? Math.min(100, Math.round(v / max * 100)) : 0; return '<div class="ftd-barra"><span>' + esc(t) + '</span><div class="pista" role="progressbar" aria-label="' + esc(t) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + p + '"><i style="width:' + p + '%"></i></div><b>' + esc(v) + '</b></div>'; }
  const cuenta = (p, c, v, t, s) => '<button type="button" class="ftd-card ftd-cuenta" style="--c:' + c + '" data-p="' + p + '"><small>' + esc(t) + '</small><b>' + esc(v) + '</b><span>' + esc(s) + '</span></button>';

  // Invita amigos: miembros ven su avance (4 huellas) y el botón para copiar el enlace; el resto ve que es para miembros
  function invita() {
    if (!memberIsPaid) return '<section class="ftd-card ftd-invita"><div><div class="ftd-eyebrow">' + ic('f-users', 13) + ' Invita amigos</div><h3>Invitar amigos es para miembros</h3><p>Con tu membresía obtienes un enlace personal. Con 4 invitados válidos abres un curso antes de su fecha.</p></div><button type="button" class="ftd-btn" id="ftdMembresia">Suscribirme</button></section>';
    const R = window.ftReferidos && ftReferidos.datos, v = R ? Math.min(R.validos, 4) : 0;
    return '<section class="ftd-card ftd-invita"><div><div class="ftd-eyebrow">' + ic('f-users', 13) + ' Invita amigos</div><h3>Invita a 4 colegas y abre un curso antes</h3><p>' + (R ? 'Llevas <b>' + R.validos + '</b> de 4 invitados válidos.' : 'Comparte tu enlace y gana cursos antes de tiempo.') + '</p>' +
      '<div class="ftd-huellas" aria-label="' + v + ' de 4 invitados válidos">' + [0, 1, 2, 3].map(i => '<i class="' + (i < v ? 'on' : '') + '" style="--i:' + i + '"></i>').join('') + '</div></div>' +
      '<div class="ftd-invita-acc"><button type="button" class="ftd-btn" id="ftdCopiarEnlace">Copiar mi enlace</button><button type="button" class="ftd-btn suave" data-p="referidos">Ver mis invitados</button></div></section>';
  }
  function lateral(d) {
    const live = ((typeof siteData !== 'undefined' && siteData.live) || []).map(w => ({ w, t: new Date(w.date + 'T' + (w.time || '20:00') + ':00').getTime() })).filter(x => x.t > Date.now()).sort((a, b) => a.t - b.t)[0];
    let h = '<section class="ftd-card ftd-lat" style="--c:var(--ftd-teal)"><div class="ftd-eyebrow">Clases en vivo</div>' + (live
      ? '<h3>' + esc(live.w.title) + '</h3><p>' + esc(new Date(live.t).toLocaleString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit' })) + '</p><button type="button" class="ftd-btn suave" data-p="courses-live">Ver detalles</button>'
      : '<div style="text-align:center"><span class="ftd-prox">PRÓXIMAMENTE</span><p>Estamos preparando las transmisiones en vivo con especialistas.</p></div>') + '</section>';
    h += '<section class="ftd-card ftd-lat" style="--c:#2F8B63"><div class="ftd-eyebrow">' + ic('f-chat', 13) + ' Comunidad FisioTeck</div><h3>Comunidad</h3><p>Conecta con colegas y comparte casos clínicos con profesionales de la fisioterapia.</p><button type="button" class="ftd-btn" style="background:#2F8B63" data-p="forum">Abrir foro</button></section>';
    if (!memberIsPaid) {
      return h + '<section class="ftd-card ftd-lat" style="--c:var(--accent)"><div class="ftd-eyebrow">Membresía</div><h3>Abre todo el Club</h3><p>Cursos completos con certificado, material, retos, comunidad y más.</p><button type="button" class="ftd-btn" id="ftdMembresia">Ver membresía</button></section>';
    }
    h += '<section class="ftd-card ftd-lat" style="--c:var(--accent)"><div class="ftd-eyebrow">Tu actividad</div>' +
      barra('Cursos', d.completos + '/' + d.cursos.length, d.cursos.length ? d.completos / d.cursos.length * d.cursos.length : 0).replace(/aria-valuenow="\d+"/, 'aria-valuenow="' + (d.cursos.length ? Math.round(d.completos / d.cursos.length * 100) : 0) + '"') +
      barra('Clases', d.clases, d.totalClases) + barra('Retos', d.retosHechos + '/' + d.retosTotal, d.retosTotal ? d.retosHechos / d.retosTotal * d.retosTotal : 0).replace(/aria-valuenow="\d+"/, 'aria-valuenow="' + (d.retosTotal ? Math.round(d.retosHechos / d.retosTotal * 100) : 0) + '"') +
      barra('Logros', d.ins + '/' + d.totalIns, d.totalIns ? d.ins / d.totalIns * d.totalIns : 0).replace(/aria-valuenow="\d+"/, 'aria-valuenow="' + (d.totalIns ? Math.round(d.ins / d.totalIns * 100) : 0) + '"') + '</section>';
    h += '<section class="ftd-card ftd-lat" style="--c:var(--ftd-violeta)"><div class="ftd-eyebrow">' + ic('f-users', 13) + ' Tu presencia en la comunidad</div><h3 style="font-size:1.05rem">Directorio de miembros</h3><p>Muestra tu tarjeta profesional a otros miembros del Club.</p><button type="button" class="ftd-btn suave" data-p="directorio">Ver mi tarjeta</button></section>';
    return h;
  }

  const reducir = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ultimaAnimacion = 0;
  function animar(raiz) {
    const repinte = Date.now() - ultimaAnimacion < 2500; ultimaAnimacion = Date.now();
    if (repinte) return; // repintada de la misma visita: sin animación de entrada ni contadores (evita el parpadeo)
    [...raiz.querySelectorAll('.ftd-hero, .ftd-fila > *, .ftd-invita, .ftd-der > *')].forEach((e, i) => { e.style.setProperty('--i', i); e.classList.add('ftd-entra'); });
    if (reducir()) return;
    raiz.querySelectorAll('.ftd-cuenta b').forEach(b => {
      const n = parseInt(b.textContent, 10); if (!(n > 0) || String(n) !== b.textContent.trim()) return;
      const t0 = performance.now(); (function paso(t) { const p = Math.min(1, (t - t0) / 700); b.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(paso); })(t0);
    });
  }
  function pintar(solo) {
    const home = $('page-home'); if (!home) return;
    home.classList.add('ftd');
    let cont = $('ftHome');
    if (!cont) { cont = document.createElement('div'); cont.id = 'ftHome'; home.appendChild(cont); }
    const d = datos(), m = meta(d), c = d.curso, h = new Date().getHours();
    const saludo = h < 12 ? 'Buen día' : h < 19 ? 'Buenas tardes' : 'Buenas noches';
    const nombre = (((auth.currentUser && auth.currentUser.displayName) || '').trim().split(/\s+/)[0]) || 'colega';
    const hoy = new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const sig = !c && d.proximo ? (d.cursos.find(x => String(x.id) === String(d.proximo.id)) || null) : null; // el curso que sigue (cerrado): su portada va de fondo
    const portada = (d.cursos.find(x => imagen(x)) || null);
    const img = c ? imagen(c.c) : (sig ? imagen(sig) : (d.pruebaPend && portada ? imagen(portada) : ''));
    const clase = c ? ((c.c.lessons || [])[c.sigIdx] || {}) : {};
    const pct = c && c.total ? Math.round(c.hechas / c.total * 100) : 0;
    const noticias = ((typeof siteData !== 'undefined' && siteData.news) || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 7);

    cont.innerHTML =
      '<div class="ftd-izq">' +
      '<section class="ftd-hero"><div class="ftd-icono">' + (h >= 7 && h < 19 ? SOL : LUNA) + '</div><div><div class="ftd-eyebrow"><i></i> Tu espacio de aprendizaje</div><h1>' + esc(saludo) + ', <em>' + esc(nombre) + '</em></h1>' +
      '<p>' + (memberIsPaid ? 'Tu acceso a cursos con certificado, herramientas clínicas y una comunidad de profesionales de la fisioterapia.' : 'Estás explorando el Club FisioTeck. Activa tu membresía para abrir todos los cursos, el material y los retos.') + '</p></div>' +
      '<div style="display:grid;gap:10px;justify-items:end"><div class="ftd-hoy"><small>HOY</small><b>' + esc(hoy) + '</b></div><div class="ftd-mascota">' + (window.ftMascota ? ftMascota.html('home', { ancho: 92, burbuja: false, pose: !memberIsPaid ? 'saluda' : d.enProgreso ? 'animo' : 'saluda' }) : '') + '</div></div></section>' +
      '<div class="ftd-fila"><section class="ftd-continua"><div class="fondo"' + (img ? ' style="background-image:url(\'' + esc(img) + '\')"' : '') + '></div><h2>' + (d.pruebaPend ? 'Elige tu curso de prueba.' : 'Continúa tu curso.') + '</h2>' +
      (d.pruebaPend ? '<div class="ftd-vidrio"><div class="ftd-eyebrow">Prueba gratuita</div><h3>Aún no eliges tu curso</h3><div class="ftd-clase"><small>SIGUIENTE PASO</small><b>Elige el curso de tu preferencia</b></div><p class="ftd-sub">Verás todas sus clases menos la última. Solo puedes elegir uno.</p><button type="button" class="ftd-btn claro" data-p="library">' + ic('f-play', 14) + ' Elegir mi curso</button></div>'
      : c ? '<div class="ftd-vidrio"><div class="ftd-eyebrow">' + (c.prueba ? 'Tu prueba gratuita · ' + c.total + ' clase' + (c.total === 1 ? '' : 's') + ' gratis' : 'Curso actual') + '</div><h3>' + esc(c.c.title) + '</h3><div class="ftd-clase"><small>' + (d.enProgreso ? 'SIGUIENTE CLASE' : 'PRIMERA CLASE') + '</small><b>' + esc(clase.title || 'Clase ' + (c.hechas + 1)) + '</b></div><div class="ftd-prog" role="progressbar" aria-label="Avance del curso" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><i style="width:' + pct + '%"></i></div><div class="ftd-pie"><span>' + c.hechas + ' de ' + c.total + ' clases vistas</span><span>' + pct + '%</span></div><button type="button" class="ftd-btn claro" id="ftdSeguir">' + ic('f-play', 14) + ' ' + (d.enProgreso ? 'Continuar' : 'Comenzar') + '</button></div>'
        : d.todoCompleto ? '<div class="ftd-vidrio"><div class="ftd-eyebrow">¡Al día!</div><h3>Completaste tus cursos.</h3><p class="ftd-sub">Descarga tus certificados y sigue practicando con los retos.</p><button type="button" class="ftd-btn claro" data-p="certificates">Ver mis certificados</button></div>'
        : d.proximo ? '<div class="ftd-vidrio"><div class="ftd-eyebrow">Próximo desbloqueo</div><h3>' + (sig ? esc(sig.title) : 'Espera tu próximo curso.') + '</h3><div class="ftd-clase"><small>RESTAN</small><b>' + d.proximo.dias + ' día' + (d.proximo.dias === 1 ? '' : 's') + (d.proximo.abreEn ? ' · ' + esc(new Date(d.proximo.abreEn).toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })) : '') + '</b></div>' + (ftAcceso.adelanto && ftAcceso.adelanto.estado === 'disponible' ? '<p class="ftd-sub">Llevas ' + ftAcceso.adelanto.total + ' de ' + ftAcceso.adelanto.necesarios + ' retos para abrirlo antes (solo aplica una vez).</p><button type="button" class="ftd-btn claro" data-p="retos">Abrir antes con retos</button>' : '<button type="button" class="ftd-btn claro" data-p="library">Ver mis cursos</button>') + '</div>'
        : '<div class="ftd-vidrio"><div class="ftd-eyebrow">Biblioteca</div><h3>Aún no hay un curso en marcha</h3><button type="button" class="ftd-btn claro" data-p="library">Ver los cursos</button></div>') +
      '<button type="button" class="ftd-ver-todos" data-p="library">Ver todos los cursos &rarr;</button></section>' +
      '<div class="ftd-pila"><section class="ftd-card ftd-meta"><div class="ftd-eyebrow">' + ic('f-target', 13) + ' Tu siguiente meta</div><h3>' + esc(m.titulo) + '</h3>' +
      m.pasos.map((p, i) => '<div class="ftd-paso"><i>' + ic(i === 0 ? 'f-play' : i === 1 ? 'f-bolt' : 'f-medal', 15) + '</i><div><small>' + esc(p[0].toUpperCase()) + '</small><b>' + esc(p[1]) + '</b></div></div>').join('') + '</section>' +
      '<div class="ftd-cuatro">' + cuenta('library', '#0D5FA0', d.cursos.length, 'CURSOS', 'ABRIR →') + cuenta('courses-live', 'var(--ftd-teal)', ((typeof siteData !== 'undefined' && siteData.live) || []).length || 'Pronto', 'CLASES EN VIVO', 'ABRIR →') + cuenta('pdfs', 'var(--ftd-ambar)', ((typeof siteData !== 'undefined' && siteData.pdfs) || []).length, 'PDFS', 'ABRIR →') + cuenta('rehab-calc', 'var(--ftd-violeta)', 6, 'HERRAMIENTAS', 'ABRIR →') + '</div></div></div>' +
      invita() +
      '<section><div class="ftd-seccion-cab"><h2>Noticias del sector</h2><span class="hoy">Hoy</span></div>' +
      (noticias.length ? '<div class="hojas" id="ftdNoticias">' + noticias.map((n, i) => ftNoticias.hoja(n, ((siteData.news || []).indexOf(n)), false)).join('') + '</div>' : '<div class="ftd-card" style="padding:30px;text-align:center;color:var(--text-muted)">Próximamente noticias y artículos.</div>') + '</section></div>' +
      '<aside class="ftd-der" aria-label="Información para ti">' + lateral(d) + '</aside>';

    const b = $('ftdSeguir'); if (b) b.onclick = m.accion;
    const mem = $('ftdMembresia'); if (mem) mem.onclick = () => showPaywallOverlay();
    const cp = $('ftdCopiarEnlace'); if (cp) cp.onclick = async () => { try { const R = window.ftReferidos && (ftReferidos.datos || await ftReferidos.cargar(true)); if (R && R.enlace) { await navigator.clipboard.writeText(R.enlace); showToast('Enlace copiado'); } else showPage('referidos'); } catch (_) { showPage('referidos'); } };
    if (memberIsPaid && window.ftReferidos && !ftReferidos.datos && !ftReferidos.intento) { ftReferidos.intento = true; ftReferidos.cargar(true).then(() => { try { pintar(true); } catch (_) { /* sin datos */ } }); }
    animar(cont);
    cont.querySelectorAll('[data-p]').forEach(x => x.onclick = () => showPage(x.dataset.p));
    if (!solo) cargarExtra();
  }

  // Al volver al Inicio varios módulos piden repintarlo casi a la vez (accesos, logros, referidos…): antes se veía como 3 parpadeos seguidos.
  // Ahora todos esos pedidos en una ráfaga se juntan en UNA sola pintada, y las repintadas dentro de la misma visita no repiten la animación de entrada.
  const original = window.renderHome;
  let pintando = null, ultimaPintada = 0;
  function pintarUnaVez() {
    pintando = null; ultimaPintada = Date.now();
    try { if (original) original.call(window); pintar(); } catch (e) { console.warn('Inicio:', e && e.message); }
  }
  window.renderHome = function () {
    if (pintando) return;
    const espera = Math.max(0, 450 - (Date.now() - ultimaPintada));
    pintando = setTimeout(pintarUnaVez, espera);
  };
  window.ftInicio = { pintar };
  const pg = window.showPage;
  window.showPage = function (page) {
    const r = pg.apply(this, arguments);
    if (page === 'home') { if (pintando) { clearTimeout(pintando); pintando = null; } pintarUnaVez(); }
    return r;
  };
})();
