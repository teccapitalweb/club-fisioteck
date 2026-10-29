/* Club FisioTeck — Detalle del curso como ventana (como Alintec Food): foto con etiquetas, título, instructor, horas y clases, botón para comenzar,
   aviso de desbloqueo (con el adelanto por retos si es el curso que sigue), "Clases del curso" con línea de tiempo y progreso, y "Material descargable".
   Reemplaza openCourseDetail() de index.html (la página de detalle ya no se usa). Las clases se reproducen con playLesson() y el avance, los candados
   por días, la prueba gratuita y los certificados siguen siendo los de siempre.
   Depende de index.html: siteData, getCourseProgress, memberIsPaid, playLesson, markLessonComplete, abrirCertModal, driveImageUrl, showPaywallOverlay, showPage,
   showToast, certFetch; de club-acceso.js (ftAcceso), club-prueba.js (ftEsPrueba), club-cursos.js (ftNombreArea), club-visor.js (ftVisor). */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = id => document.getElementById(id);
  const I = {
    libro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    candado: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    flecha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    usuario: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    reloj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    archivo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>'
  };
  let materiales = null;

  const imagen = c => { const u = (c && c.thumbnail) || ''; if (!u) return ''; return /^(https?:|assets\/|data\/)/.test(u) && !/drive\.google\.com/.test(u) ? u : (typeof driveImageUrl === 'function' ? driveImageUrl(u) : u); };
  const quitar = () => { const o = $('ftDetalle'); if (o) o.remove(); document.body.classList.remove('fd-abierto'); document.removeEventListener('keydown', teclaEsc, true); };
  function teclaEsc(e) { if (e.key === 'Escape' && !document.querySelector('.video-modal.active, #ftVisorOv')) { e.preventDefault(); cerrar(); } }
  function cerrar() { quitar(); try { currentCourseId = null; } catch (_) { /* variable del panel */ } materiales = null; }
  window.ftCerrarDetalle = cerrar;
  window.backToLibrary = cerrar;

  function estadoCurso(c) {
    const cerrado = window.ftCursoCerrado && ftCursoCerrado(c.id) && !(typeof ftEsPrueba === 'function' && ftEsPrueba(c.id));
    // Sin membresía no hay vista previa: solo el curso de la prueba gratuita, con todas sus clases menos la última
    const prueba = !memberIsPaid && typeof ftEsPrueba === 'function' && ftEsPrueba(c.id);
    return { cerrado, dias: cerrado ? ftCursoDias(c.id) : 0, acceso: memberIsPaid, prueba };
  }

  // Curso que se puede adelantar con retos: panel con barras por tipo (como Alintec). Devuelve '' si no aplica a este curso.
  function bloqueRetos(c, est) {
    const A = window.ftAcceso, ad = A && A.adelanto;
    if (!est.cerrado || !ad || ad.estado !== 'disponible' || String(ad.cursoId) !== String(c.id) || !A.panelRetos) return '';
    return '<div class="fd-adel">' + A.panelRetos({ boton: true, cabecera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg><span><b>Faltan ' + est.dias + ' día' + (est.dias === 1 ? '' : 's') + ' para su desbloqueo.</b> Puedes abrirlo antes resolviendo ' + ad.necesarios + ' retos.</span>' }) + '</div>';
  }

  function html(c, est) {
    const lecc = c.lessons || [], total = lecc.length, prog = getCourseProgress(c.id), hechas = new Set(prog.completed || []), nHechas = hechas.size, pct = total ? Math.round(nHechas / total * 100) : 0;
    const img = imagen(c), area = window.ftNombreArea ? ftNombreArea(c.category) : (c.category || 'General');
    let sig = lecc.findIndex((l, i) => !hechas.has(i)); if (sig < 0) sig = 0;
    const abre = i => !est.cerrado && (est.acceso || (est.prueba && i < total - 1));
    const pendiente = !memberIsPaid && window.ftPrueba && ftPrueba.estado === 'pendiente';
    let cta = '';
    if (!est.cerrado && total) {
      if (est.acceso) cta = '<button type="button" class="fd-cta" onclick="playLesson(' + sig + ')">' + (nHechas >= total ? 'Volver a ver' : nHechas ? 'Continuar el curso' : 'Comenzar el curso') + '<i>' + I.play + '</i></button>';
      else if (est.prueba) { const sp = Math.min(sig, Math.max(0, total - 2)); cta = '<button type="button" class="fd-cta" onclick="playLesson(' + sp + ')">' + (nHechas ? 'Continuar mi prueba' : 'Comenzar mi prueba gratuita') + '<i>' + I.play + '</i></button>'; }
      else if (pendiente) cta = '<button type="button" class="fd-cta" onclick="ftPruebaConfirmar(' + Number(c.id) + ')">Elegir como mi prueba gratuita<i>' + I.flecha + '</i></button>';
      else cta = '<button type="button" class="fd-cta" onclick="showPaywallOverlay()">Ver membresía<i>' + I.flecha + '</i></button>';
    }
    const panel = bloqueRetos(c, est);
    const aviso = panel ? panel : est.cerrado ? '<div class="fd-aviso">' + I.candado + '<span><b>Faltan ' + est.dias + ' día' + (est.dias === 1 ? '' : 's') + ' para su desbloqueo.</b> Mientras tanto puedes ver de qué trata y qué clases incluye.</span></div>' : '';
    const filas = lecc.map((l, i) => {
      const hecha = hechas.has(i), abierta = abre(i);
      const nodo = hecha ? '<span class="nodo ok">' + I.check + '</span>' : abierta ? '<span class="nodo">' + (i + 1) + '</span>' : '<span class="nodo bloq">' + I.candado + '</span>';
      const sub = est.cerrado ? 'Faltan ' + est.dias + ' día' + (est.dias === 1 ? '' : 's') + ' para su desbloqueo'
        : abierta ? (hecha ? 'Clase vista' : 'Toca para ver la clase') : est.prueba && i === total - 1 ? 'La última clase se abre con la membresía' : 'Activa tu membresía para ver esta clase';
      const clic = abierta ? 'playLesson(' + i + ')' : est.cerrado ? '' : 'showPaywallOverlay()';
      return '<li class="fd-clase' + (abierta ? '' : ' bloq') + '"' + (clic ? ' onclick="' + clic + '"' : '') + '>' + nodo + '<span class="mini"' + (img ? ' style="background-image:url(\'' + esc(img) + '\')"' : '') + '></span>' +
        '<span class="txt"><strong>' + esc(l.title || 'Clase ' + (i + 1)) + '</strong><small>' + esc(sub) + (l.duration ? ' · ' + esc(l.duration) : '') + '</small></span>' +
        (abierta && (est.acceso || est.prueba) && !hecha ? '<button type="button" class="fd-vista" onclick="event.stopPropagation();markLessonComplete(' + c.id + ',' + i + ')">Marcar como vista</button>' : '') + '<i class="ir">' + I.flecha + '</i></li>';
    }).join('');
    const terminado = total && nHechas >= total ? '<div class="fd-fin"><div><strong>¡Curso terminado!</strong><span>Ya puedes obtener tu certificado con folio verificable.</span></div><button type="button" class="fd-btn" onclick="abrirCertModal(' + c.id + ')">Obtener certificado</button></div>' : '';
    return '<header class="fd-top"><span class="ico">' + I.libro + '</span><b>Detalle del curso</b><button type="button" class="fd-x" aria-label="Cerrar" onclick="ftCerrarDetalle()">' + I.x + '</button></header>' +
      '<div class="fd-cuerpo"><section class="fd-hero"' + (img ? ' style="background-image:url(\'' + esc(img) + '\')"' : '') + '><div class="vel"></div><div class="in">' +
      '<div class="etq"><span>' + esc(area) + '</span><span>' + esc(c.nivel || 'Intermedio') + '</span></div><h2>' + esc(c.title) + '</h2>' +
      '<div class="meta"><span>' + I.usuario + ' ' + esc(c.instructor || 'Equipo FisioTeck') + '</span>' + (c.duration ? '<span>' + I.reloj + ' ' + esc(c.duration) + '</span>' : '') + '<span>' + I.libro + ' ' + total + ' clase' + (total === 1 ? '' : 's') + '</span></div>' +
      '<div class="pie"><div class="aut"><i>' + esc((c.instructor || 'Equipo FisioTeck').split(/\s+/).slice(-2).map(x => x[0]).join('').toUpperCase()) + '</i><div><b>' + esc(c.instructor || 'Equipo FisioTeck') + '</b><small>Curso especializado · FisioTeck</small></div></div>' + cta + '</div></div></section>' +
      (est.prueba ? '<div class="fd-aviso fd-prueba"><span><b>Tu prueba gratuita.</b> Puedes ver todas las clases y materiales de este curso, menos la última clase y el último material. Con la membresía se abre todo.</span></div>' : '') + (c.desc ? '<p class="fd-desc">' + esc(c.desc) + '</p>' : '') + aviso + terminado +
      (total ? '<section class="fd-clases"><div class="cab"><small>Clases del curso</small><span>' + nHechas + '/' + total + ' · ' + pct + '%</span></div><div class="fd-prog"><i style="width:' + pct + '%"></i></div><ol>' + filas + '</ol></section>' : '<p class="fd-desc">Próximamente se agregarán las clases.</p>') +
      '<section id="fdMateriales"></section></div>';
  }

  function pintarMateriales() {
    const cont = $('fdMateriales'); if (!cont || !materiales || !materiales.length) { if (cont) cont.innerHTML = ''; return; }
    const txt = { 'abierto': 'Toca para abrir', 'sin-acceso': 'Activa tu membresía para abrir', 'curso-cerrado': 'Se abre cuando se abra el curso' };
    cont.innerHTML = '<div class="fd-matcab"><small>Material descargable</small><span>' + materiales.length + ' archivo' + (materiales.length === 1 ? '' : 's') + '</span></div><div class="fd-mats">' + materiales.map((m, i) => {
      const ab = m.estado === 'abierto', ley = m.estado === 'bloqueado-clase' ? 'Se desbloquea al terminar la clase ' + m.desbloqueaEnClase : (txt[m.estado] || '');
      return '<button type="button" class="fd-mat' + (ab ? '' : ' bloq') + '" onclick="ftAbrirMaterial(' + JSON.stringify(window.currentCourseIdDetalle) + ',' + i + ')"><span class="ico">' + I.archivo + '</span><span class="txt"><strong>' + esc(m.titulo) + '</strong><small>' + esc(ley) + '</small></span><i>' + (ab ? I.flecha : I.candado) + '</i></button>';
    }).join('') + '</div>';
  }
  async function cargarMateriales(id) {
    if (typeof auth === 'undefined' || !auth.currentUser) return;
    try { const r = await certFetch('/api/cursos/' + encodeURIComponent(id) + '/materiales'); if (window.currentCourseIdDetalle === id) { materiales = r.materiales || []; window.ftMaterialesCurso = { cursoId: id, materiales }; pintarMateriales(); } }
    catch (_) { /* sin servidor no se muestra nada: nunca se cae al enlace público */ }
  }

  window.openCourseDetail = function (courseId) {
    const c = siteData.courses.find(x => x.id === courseId); if (!c) return;
    const hoy = new Date().toISOString().split('T')[0];
    if (c.availableDate && c.availableDate > hoy) { const d = Math.ceil((new Date(c.availableDate + 'T00:00:00') - new Date()) / 864e5); showToast('Este curso se abre en ' + d + ' día' + (d === 1 ? '' : 's')); return; }
    try { currentCourseId = courseId; } catch (_) { /* variable del panel */ }
    window.currentCourseIdDetalle = courseId; materiales = null;
    quitar();
    const o = document.createElement('div'); o.id = 'ftDetalle'; o.className = 'fd-ov'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true'); o.setAttribute('aria-label', 'Detalle del curso');
    o.innerHTML = html(c, estadoCurso(c));
    document.body.appendChild(o); document.body.classList.add('fd-abierto');
    document.addEventListener('keydown', teclaEsc, true);
    const cuerpo = o.querySelector('.fd-cuerpo'); if (cuerpo) cuerpo.scrollTop = 0;
    cargarMateriales(courseId);
  };
  function repintar() {
    const id = window.currentCourseIdDetalle, o = $('ftDetalle'); if (!id || !o) return;
    const c = siteData.courses.find(x => x.id === id); if (!c) return;
    const sc = o.querySelector('.fd-cuerpo') ? o.querySelector('.fd-cuerpo').scrollTop : 0;
    o.innerHTML = html(c, estadoCurso(c)); const cu = o.querySelector('.fd-cuerpo'); if (cu) cu.scrollTop = sc;
    pintarMateriales(); cargarMateriales(id);
  }
  window.addEventListener('ft:clase-completada', repintar);
  // El curso se refresca solo cuando cambian los accesos (retos superados, cuenta que pasa a miembro)
  const cargarOriginal = window.ftAcceso && ftAcceso.cargar;
  if (cargarOriginal) ftAcceso.cargar = async function () { const r = await cargarOriginal.apply(this, arguments); repintar(); return r; };
  // Sin membresía solo se reproduce el curso de la prueba y sin su última clase (el servidor también lo exige)
  function permitida(cursoId, i) {
    if (memberIsPaid) return true;
    const c = siteData.courses.find(x => x.id === cursoId);
    return !!(c && typeof ftEsPrueba === 'function' && ftEsPrueba(cursoId) && i < (c.lessons || []).length - 1);
  }
  const reproducir = window.playLesson;
  if (reproducir) window.playLesson = function (i) { let id = null; try { id = currentCourseId; } catch (_) { /* sin curso */ } if (!permitida(id, i)) { if (window.showPaywallOverlay) showPaywallOverlay(); return; } return reproducir.apply(this, arguments); };
  const marcar = window.markLessonComplete;
  if (marcar) window.markLessonComplete = function (cid, i) { if (!permitida(cid, i)) { if (window.showPaywallOverlay) showPaywallOverlay(); return; } return marcar.apply(this, arguments); };
  window.ftDetalle = { repintar, cerrar };
})();
