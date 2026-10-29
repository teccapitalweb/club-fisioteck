/* Club FisioTeck — calendario de cursos y contador de la regla de los N días (8 por defecto).
   Para miembros con el escalonado activo: "Día N de tu membresía", cuánto falta para el siguiente curso, y el historial de cada curso
   (completado, en progreso, abierto sin empezar o esperando su desbloqueo con su fecha). Los datos salen del servidor (GET /api/acceso, vía ftAcceso)
   y del avance de clases (getCourseProgress); aquí solo se muestra. Se dibuja en Mis cursos (ftCalendario.html) y como tarjeta en Inicio (ftCalendario.mini).
   Depende de index.html: siteData, memberIsPaid, getCourseProgress, openCourseDetail; de club-acceso.js (ftAcceso). */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const LLAVE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
  const OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';

  const activo = () => typeof memberIsPaid !== 'undefined' && memberIsPaid && window.ftAcceso && ftAcceso.escalonado === true && (ftAcceso.orden || []).length > 0;
  const curso = id => ((typeof siteData !== 'undefined' && siteData.courses) || []).find(c => String(c.id) === String(id));
  const fecha = iso => { const d = new Date(iso); return isNaN(d) ? '' : d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long' }); };
  const enDias = n => n <= 1 ? 'mañana' : 'en ' + n + ' días';

  // Estado de cada curso, en el orden del calendario
  function filas() {
    const A = ftAcceso;
    return (A.orden || []).map((id, k) => {
      const c = curso(id), a = A.cursos[String(id)] || { abierto: true };
      if (!c) return null;
      const total = (c.lessons || []).length, hechas = Math.min(total, (((typeof getCourseProgress === 'function' && getCourseProgress(c.id)) || {}).completed || []).length);
      const completo = total > 0 && hechas >= total;
      const estado = completo ? 'completo' : hechas > 0 ? 'progreso' : a.abierto ? 'abierto' : 'espera';
      return { id: c.id, k, titulo: c.title, total, hechas, estado, a };
    }).filter(Boolean);
  }
  const ETQ = { completo: 'Completado', progreso: 'En progreso', abierto: 'Abierto', espera: 'En espera' };

  function resumen(f) {
    const n = e => f.filter(x => x.estado === e).length;
    return [['completo', 'Completados'], ['progreso', 'En progreso'], ['abierto', 'Abiertos sin empezar'], ['espera', 'En espera']].map(p => '<div class="fcal-n fcal-' + p[0] + '"><b>' + n(p[0]) + '</b><span>' + p[1] + '</span></div>').join('');
  }

  function fila(x) {
    const a = x.a;
    let der = '';
    if (x.estado === 'espera') der = '<span class="fcal-fecha">' + LLAVE + '<b>' + esc(fecha(a.abreEn)) + '</b><small>' + enDias(a.dias || 1) + '</small></span>';
    else if (x.estado === 'completo') der = '<span class="fcal-fecha ok">' + OK + '<b>Listo</b></span>';
    else der = '<span class="fcal-fecha ok"><b>' + (a.porRetos ? 'Abierto con retos' : a.porPremio ? 'Abierto por invitar' : a.iniciado && !(x.hechas > 0) ? 'Abierto' : 'Abierto') + '</b></span>';
    const pct = x.total ? Math.round(x.hechas / x.total * 100) : 0;
    return '<li class="fcal-fila fcal-' + x.estado + '"><button type="button" data-curso="' + esc(x.id) + '"><span class="fcal-num">' + (x.k + 1) + '</span><span class="fcal-tit"><b>' + esc(x.titulo) + '</b><small><i class="fcal-chip">' + ETQ[x.estado] + '</i> ' +
      (x.estado === 'espera' ? 'Aún no abre' : x.hechas + ' de ' + x.total + ' clases vistas') + '</small>' + (x.estado === 'progreso' || x.estado === 'completo' ? '<span class="fcal-barra"><i style="width:' + pct + '%"></i></span>' : '') + '</span>' + der + '</button></li>';
  }

  function html() {
    if (!activo()) return '';
    const A = ftAcceso, f = filas(), prox = A.proximo && A.proximo(), pc = prox ? curso(prox.id) : null;
    const dias = A.diasEntreCursos || 8;
    return '<section class="fcal" id="ftCalendario"><div class="fcal-cab"><div class="fcal-txt"><span class="fcal-kick">Tu calendario de cursos</span><h3>' + (A.diaMembresia ? 'Día ' + A.diaMembresia + ' de tu membresía' : 'Tu calendario de cursos') + '</h3>' +
      '<p>Cada ' + dias + ' días se abre un curso nuevo. También puedes abrir el siguiente antes superando retos.</p></div>' +
      '<div class="fcal-prox">' + (prox ? '<small>Siguiente curso</small><b>' + enDias(prox.dias || 1) + '</b><span>' + esc(fecha(prox.abreEn)) + (pc ? ' · ' + esc(pc.title) : '') + '</span>' : '<small>Todo al día</small><b>Cursos abiertos</b><span>Ya tienes todos tus cursos disponibles.</span>') + '</div></div>' +
      '<div class="fcal-res">' + resumen(f) + '</div><ol class="fcal-lista">' + f.map(fila).join('') + '</ol></section>';
  }

  // Tarjeta pequeña para Inicio
  function mini() {
    if (!activo()) return '';
    const A = ftAcceso, prox = A.proximo && A.proximo(), pc = prox ? curso(prox.id) : null;
    return '<section class="ftd-card ftd-lat" style="--c:var(--ftd-ambar)"><div class="ftd-eyebrow">Calendario de cursos</div><h3>' + (prox ? 'Siguiente curso ' + enDias(prox.dias || 1) : 'Cursos al día') + '</h3><p>' +
      (prox ? esc((pc ? pc.title + ' · ' : '') + fecha(prox.abreEn)) : 'Ya tienes todos tus cursos abiertos.') + '</p><button type="button" class="ftd-btn suave" data-p="library">Ver mi calendario</button></section>';
  }

  // Un toque en un curso lo abre
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('#ftCalendario [data-curso]');
    if (!b || typeof openCourseDetail !== 'function') return;
    const id = b.dataset.curso; openCourseDetail(isNaN(Number(id)) ? id : Number(id));
  });

  window.ftCalendario = { html, mini };
})();
