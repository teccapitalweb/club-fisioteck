/* Club FisioTeck — Mis cursos (misma estructura que el panel de Alintec Food): cabecera "Tu camino" con mascota y pestañas
   (Todos · En progreso · Completados), buscador, chips por área y tarjetas con la foto del curso a todo el tamaño, etiquetas de área y nivel,
   instructor, horas, clases, aviso de desbloqueo y barra de avance. Reemplaza renderLibrary()/renderCourseGrid() de index.html; abrir un curso
   sigue usando openCourseDetail(), así que el escalonado, la prueba gratuita y los candados funcionan igual.
   Depende de index.html: siteData, getCourseProgress, openCourseDetail, driveImageUrl, memberIsPaid y de club-diseno*.css, club-mascota.js. */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = id => document.getElementById(id);
  const COLORES = ['#0D5FA0', '#159E92', '#C2760B', '#7C3AED', '#DC2D3F', '#0F9D58', '#0891B2', '#B45309'];
  const LUPA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>';
  const FLECHA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>';
  let tab = 'todos', area = 'todas', texto = '';

  // Cabecera común de las secciones (la usan también PDF y Retos)
  window.ftdHero = function (eyebrow, titulo, sub, seccion, extra) {
    return '<section class="ftd-sec-hero"><div><div class="ftd-eyebrow"><i></i> ' + esc(eyebrow) + '</div><h1>' + titulo + '</h1><p>' + esc(sub) + '</p>' + (extra || '') + '</div>' +
      (window.ftMascota ? ftMascota.html(seccion, { ancho: 104 }) : '') + '</section>';
  };
  const imagen = c => { const u = (c && c.thumbnail) || ''; if (!u) return ''; return /^(https?:|assets\/|data\/)/.test(u) && !/drive\.google\.com/.test(u) ? u : (typeof driveImageUrl === 'function' ? driveImageUrl(u) : u); };
  const AREAS = { rehabilitacion: 'Rehabilitación', anatomia: 'Anatomía', fisioterapia: 'Fisioterapia', especializacion: 'Especialización', ortopedia: 'Ortopedia', neurologia: 'Neurología', deportiva: 'Fisioterapia deportiva', geriatria: 'Geriatría', pediatria: 'Pediatría', respiratoria: 'Fisioterapia respiratoria', pulmonar: 'Fisioterapia pulmonar', dolor: 'Manejo del dolor', terapia: 'Terapia manual' };
  const nombreArea = k => AREAS[k] || String(k || 'General').replace(/-/g, ' ').replace(/^./, x => x.toUpperCase());
  window.ftNombreArea = nombreArea;
  window.ftImagenCurso = imagen;
  // Sin membresía y sin haber elegido el curso de prueba: solo se ven los títulos (como Alintec Food y Zoorigen)
  const soloTitulos = () => typeof memberIsPaid !== 'undefined' && !memberIsPaid && !!window.ftPrueba && ftPrueba.estado === 'pendiente';

  function estado(c) {
    const hoy = new Date().toISOString().split('T')[0], total = (c.lessons || []).length, hechas = ((getCourseProgress(c.id).completed) || []).length;
    let bloq = false, dias = 0, modo = 'catalogo';
    if (c.availableDate && c.availableDate > hoy) { bloq = true; dias = Math.ceil((new Date(c.availableDate + 'T00:00:00') - new Date()) / 86400000); modo = 'fecha'; }
    if (!bloq && window.ftCursoCerrado && ftCursoCerrado(c.id) && !(typeof ftEsPrueba === 'function' && ftEsPrueba(c.id))) { bloq = true; dias = ftCursoDias(c.id); modo = 'goteo'; }
    return { total, hechas, pct: total ? Math.round(hechas / total * 100) : 0, bloq, dias, modo, completo: total > 0 && hechas >= total };
  }

  function tarjetaPrueba(c) {
    const color = COLORES[Math.abs(String(c.category || c.title).split('').reduce((a, ch) => a + ch.charCodeAt(0), 0)) % COLORES.length], img = imagen(c);
    const ok = (c.lessons || []).length >= 2 && !c.comingSoon;
    return '<article class="ftd-curso prueba" role="button" tabindex="0" style="--vp-c:' + color + '" data-id="' + esc(c.id) + '" aria-label="' + esc(c.title) + '">' +
      '<div class="foto"' + (img ? ' style="background-image:url(\'' + esc(img) + '\')"' : ' style="background:linear-gradient(135deg,' + color + ',#0A3E68)"') + '></div>' +
      '<div class="pie"><h3>' + esc(c.title) + '</h3>' + (ok ? '<button type="button" class="ftd-elegir" data-elegir="' + esc(c.id) + '">Elegir como prueba gratuita</button>' : '<button type="button" class="ftd-elegir" disabled>No disponible como prueba</button>') + '</div></article>';
  }

  function tarjeta(c, idx) {
    if (soloTitulos()) return tarjetaPrueba(c);
    const e = estado(c), color = COLORES[Math.abs(String(c.category || c.title).split('').reduce((a, ch) => a + ch.charCodeAt(0), 0)) % COLORES.length];
    const img = imagen(c), clic = !e.bloq || e.modo === 'goteo';
    const esPrueba = !memberIsPaid && typeof ftEsPrueba === 'function' && ftEsPrueba(c.id), gratis = Math.max(0, e.total - 1);
    const badge = esPrueba ? '<div class="estado ok">Tu prueba gratuita · ' + gratis + ' clase' + (gratis === 1 ? '' : 's') + ' gratis</div>' : e.bloq ? '<div class="estado">Restan ' + e.dias + ' día' + (e.dias === 1 ? '' : 's') + ' para su desbloqueo</div>' : e.completo ? '<div class="estado ok">Completado</div>' : (c.badge ? '<div class="estado ok">' + esc(c.badge) + '</div>' : '');
    const A = window.ftAcceso, ad = A && A.adelanto, d = ad && ad.estado === 'disponible' && e.modo === 'goteo' && String(ad.cursoId) === String(c.id) && A.desglose ? A.desglose() : null;
    const adel = d ? '<div class="adel">' + (A.iconoRayo || '') + '<b>Ábrelo antes con ' + d.necesarios + ' retos</b><em>' + d.total + '/' + d.necesarios + '</em><i class="b"><i style="width:' + Math.round(d.total / d.necesarios * 100) + '%"></i></i></div>' : '';
    return '<button type="button" class="ftd-curso' + (e.bloq ? ' bloq' : '') + '" style="--vp-c:' + color + '" data-id="' + esc(c.id) + '" ' + (clic ? '' : 'aria-disabled="true"') + ' aria-label="' + esc(c.title) + (e.bloq ? ' (bloqueado)' : '') + '">' +
      '<div class="foto"' + (img ? ' style="background-image:url(\'' + esc(img) + '\')"' : ' style="background:linear-gradient(135deg,' + color + ',#0A3E68)"') + '></div>' +
      '<div class="etq"><span>' + esc(nombreArea(c.category)) + '</span><span>' + esc(c.nivel || 'Intermedio') + '</span></div><div class="flecha">' + FLECHA + '</div>' + badge +
      '<div class="pie"><h3>' + esc(c.title) + '</h3><div class="meta"><span>' + esc(c.instructor || 'Equipo FisioTeck') + '</span>' + (c.duration ? '<span>' + esc(c.duration) + '</span>' : '') + '<span>' + e.total + ' clase' + (e.total === 1 ? '' : 's') + '</span>' + ((c.materiales || []).length ? '<span>' + c.materiales.length + ' material' + (c.materiales.length === 1 ? '' : 'es') + '</span>' : '') + '</div>' + adel + '</div>' +
      (clic ? '<span class="ver">Ver curso</span>' : '') + (e.pct > 0 ? '<div class="pbar"><i style="width:' + e.pct + '%"></i></div>' : '') + '</button>';
  }

  function lista() {
    let cursos = ((typeof siteData !== 'undefined' && siteData.courses) || []).slice();
    const q = texto.toLowerCase();
    cursos = cursos.filter(c => (area === 'todas' || c.category === area) && (!q || (c.title + ' ' + (c.instructor || '') + ' ' + (c.desc || '')).toLowerCase().includes(q)));
    cursos = cursos.filter(c => { const e = estado(c); return tab === 'todos' || (tab === 'progreso' && e.hechas > 0 && !e.completo) || (tab === 'completados' && e.completo); });
    // Sin membresía, el curso que eligió como prueba gratuita va siempre primero
    const suyo = c => (!memberIsPaid && typeof ftEsPrueba === 'function' && ftEsPrueba(c.id)) ? 0 : 1;
    cursos.sort((a, b) => suyo(a) - suyo(b) || (() => { const x = estado(a), y = estado(b); return (x.bloq ? 1 : 0) - (y.bloq ? 1 : 0) || (x.dias || 0) - (y.dias || 0); })());
    return cursos;
  }

  function pintar() {
    const pg = $('page-library'); if (!pg) return;
    pg.classList.add('ftd');
    let cont = $('ftCursos'); if (!cont) { cont = document.createElement('div'); cont.id = 'ftCursos'; pg.appendChild(cont); }
    const todos = (typeof siteData !== 'undefined' && siteData.courses) || [];
    const areas = [...new Set(todos.map(c => c.category).filter(Boolean))];
    const cuentas = { todos: todos.length, progreso: todos.filter(c => { const e = estado(c); return e.hechas > 0 && !e.completo; }).length, completados: todos.filter(c => estado(c).completo).length };
    const l = lista();
    cont.innerHTML = window.ftdHero('Tu camino', 'Mis <em>cursos.</em>', 'Todos tus cursos grabados con certificado, en un solo lugar.', 'library',
      '<div class="ftd-tabs" role="tablist">' + [['todos', 'Todos'], ['progreso', 'En progreso'], ['completados', 'Completados']].map(t => '<button type="button" role="tab" aria-selected="' + (tab === t[0]) + '" class="' + (tab === t[0] ? 'on' : '') + '" data-tab="' + t[0] + '">' + t[1] + ' (' + cuentas[t[0]] + ')</button>').join('') + '</div>') +
      '<div class="ftd-barra-herr"><div class="ftd-busca" role="search">' + LUPA + '<input id="ftcBusca" type="search" placeholder="Buscar curso o instructor…" value="' + esc(texto) + '" aria-label="Buscar curso o instructor"></div>' +
      '<div class="ftd-chips" role="group" aria-label="Filtrar por área"><button type="button" class="' + (area === 'todas' ? 'on' : '') + '" data-area="todas">Todas</button>' + areas.map(a => '<button type="button" class="' + (area === a ? 'on' : '') + '" data-area="' + esc(a) + '">' + esc(nombreArea(a)) + '</button>').join('') + '</div></div>' +
      (soloTitulos() && window.ftPruebaTarjeta ? ftPruebaTarjeta() : '') + '<div class="ftd-cursos" aria-live="polite">' + (l.length ? l.map(tarjeta).join('') : '<div class="ftd-card" style="grid-column:1/-1;padding:40px;text-align:center;color:var(--text-muted)">No encontramos cursos con ese filtro.' + (tab !== 'todos' ? '<br><button type="button" class="ftd-btn suave" style="margin-top:14px" data-tab="todos">Ver todos los cursos</button>' : '') + '</div>') + '</div>';
    cont.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { tab = b.dataset.tab; pintar(); });
    cont.querySelectorAll('[data-area]').forEach(b => b.onclick = () => { area = b.dataset.area; pintar(); });
    const inp = $('ftcBusca'); inp.oninput = () => { texto = inp.value.trim(); const pos = inp.selectionStart; pintar(); const n = $('ftcBusca'); n.focus(); try { n.setSelectionRange(pos, pos); } catch (_) { /* sin cursor */ } };
    const idDe = b => isNaN(Number(b.dataset.id)) ? b.dataset.id : Number(b.dataset.id);
    cont.querySelectorAll('.ftd-curso.prueba').forEach(b => {
      const abrir = () => { if (window.ftPruebaAviso) ftPruebaAviso(idDe(b)); };
      b.onclick = abrir; b.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(); } };
      const el = b.querySelector('[data-elegir]'); if (el) el.onclick = e => { e.stopPropagation(); ftPruebaConfirmar(idDe(b)); };
    });
    cont.querySelectorAll('button.ftd-curso').forEach(b => b.onclick = () => { if (b.getAttribute('aria-disabled') === 'true') { if (window.showToast) showToast('Ese curso se abre pronto.'); return; } openCourseDetail(isNaN(Number(b.dataset.id)) ? b.dataset.id : Number(b.dataset.id)); });
  }

  const render = window.renderLibrary;
  window.renderLibrary = function () { try { if (render) render.apply(this, arguments); } catch (_) { /* original */ } pintar(); };
  window.renderCourseGrid = function () { pintar(); };
  window.filterCourses = function () { pintar(); };
  window.filterCategory = function () { pintar(); };
  const pg = window.showPage;
  window.showPage = function (page) { const r = pg.apply(this, arguments); if (page === 'library') pintar(); return r; };
  window.ftCursos = { pintar };
})();
