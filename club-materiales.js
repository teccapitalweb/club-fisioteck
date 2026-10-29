/* Club FisioTeck — material descargable de cada curso (lo agrega el administrador en el editor del curso).
   Es independiente de la biblioteca "Material PDF": aquí los archivos acompañan al curso y se van desbloqueando conforme
   se terminan las clases. Los enlaces NO están en el sitio: el servidor (/api/cursos/:id/materiales) dice el estado de cada uno
   y entrega el enlace solo cuando corresponde. Depende de index.html: siteData, certFetch, escCert, showPaywallOverlay, showToast, drivePdfUrl. */
(function () {
  'use strict';
  const estados = {
    'abierto': 'Toca para abrir',
    'sin-acceso': 'Activa tu membresía para abrirlo',
    'curso-cerrado': 'Se abre cuando se abra el curso'
  };
  const leyenda = m => m.estado === 'bloqueado-clase' ? 'Se desbloquea al terminar la clase ' + m.desbloqueaEnClase : (estados[m.estado] || '');
  let actual = null;

  window.ftAbrirMaterial = async function (cursoId, i) {
    const m = actual && actual.cursoId === cursoId && actual.materiales[i];
    if (m && m.estado === 'sin-acceso') { showPaywallOverlay(); return; }
    if (m && m.estado !== 'abierto') { showToast(leyenda(m)); return; }
    try {
      const r = await certFetch('/api/cursos/' + encodeURIComponent(cursoId) + '/materiales/' + i + '/enlace', { method: 'POST', body: '{}' });
      window.open(typeof drivePdfUrl === 'function' ? drivePdfUrl(r.url) : r.url, '_blank', 'noopener');
    } catch (e) {
      if (e.status === 402) showPaywallOverlay(); else showToast(e.message);
    }
  };

  function pintar(cursoId, lista) {
    const cont = document.getElementById('courseDetailLessons');
    if (!cont) return;
    const previo = cont.querySelector('#courseMateriales');
    if (previo) previo.remove();
    if (!lista.length) return;
    const items = lista.map((m, i) => {
      const abierto = m.estado === 'abierto', cand = m.estado !== 'abierto';
      const marca = abierto ? 'Material' : cand ? 'Bloqueado' : '';
      return '<button type="button" onclick="ftAbrirMaterial(' + JSON.stringify(cursoId) + ',' + i + ')" style="display:flex;align-items:center;gap:12px;width:100%;text-align:left;padding:12px 14px;border-radius:var(--radius-sm);border:1px solid var(--border);background:var(--surface,var(--bg));color:var(--text);font:inherit;cursor:pointer;' + (abierto ? '' : 'opacity:.7;') + '">' +
        '<span style="flex-shrink:0;padding:4px 9px;border-radius:6px;background:' + (abierto ? 'var(--accent,#0D5FA0)' : '#6C8299') + ';color:#fff;font-size:.66rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;">' + marca + '</span>' +
        '<span style="flex:1;min-width:0;"><strong style="display:block;font-size:.9rem;">' + escCert(m.titulo) + '</strong><small style="color:var(--text-muted);">' + escCert(leyenda(m)) + '</small></span></button>';
    }).join('');
    cont.insertAdjacentHTML('beforeend', '<div id="courseMateriales" style="margin-top:26px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><h3 style="font-size:1.05rem;font-weight:600;">Material del curso</h3><span style="font-size:.78rem;color:var(--text-muted);">' + lista.length + ' archivo' + (lista.length === 1 ? '' : 's') + '</span></div><div style="display:flex;flex-direction:column;gap:8px;">' + items + '</div></div>');
  }

  async function cargar(cursoId) {
    if (typeof auth === 'undefined' || !auth.currentUser) return;
    try {
      const r = await certFetch('/api/cursos/' + encodeURIComponent(cursoId) + '/materiales');
      actual = { cursoId, materiales: r.materiales || [] };
      // solo si el usuario sigue viendo ese curso
      if (typeof currentCourseId !== 'undefined' && currentCourseId === cursoId) pintar(cursoId, actual.materiales);
    } catch (_) { /* sin servidor no se muestra nada: nunca se cae al enlace público */ }
  }

  const original = window.openCourseDetail;
  window.openCourseDetail = function (courseId) {
    const r = original.apply(this, arguments);
    // si el curso estaba cerrado, openCourseDetail sale antes y currentCourseId no cambia
    if (typeof currentCourseId !== 'undefined' && currentCourseId === courseId) cargar(courseId);
    return r;
  };
  // al terminar una clase se pueden abrir materiales nuevos: se vuelve a preguntar al servidor
  window.addEventListener('ft:clase-completada', () => { if (typeof currentCourseId !== 'undefined' && currentCourseId != null) cargar(currentCourseId); });
})();
