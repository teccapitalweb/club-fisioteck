/* Panel · Cursos — diseño y funciones tomados de Alintec Food.
   Lista con KPIs, filtros, tarjetas/lista, interruptor activo y un editor con clases, preguntas y juegos dinámicos
   (sopa de letras, memorama, rompecabezas y ahorcado). Los datos siguen viviendo en content.json (flujo "Publicar cambios").
   Depende del panel: data, saveData, toast, esc, fbDb, renderDashboard, closeModal. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const ICON = {
    lupa: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    az: '<svg viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="14" y2="12"/><line x1="4" y1="18" x2="9" y2="18"/></svg>',
    reloj: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>',
    nuevo: '<svg viewBox="0 0 24 24"><path d="M12 2l2.4 6.9H22l-6 4.6 2.3 7L12 16l-6.3 4.5 2.3-7-6-4.6h7.6z"/></svg>',
    grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    lista: '<svg viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>',
    persona: '<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    editar: '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    borrar: '<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>'
  };
  const NOMBRES_AREA = { rehabilitacion: 'Rehabilitación', anatomia: 'Anatomía', fisioterapia: 'Fisioterapia', especializacion: 'Especialización', ortopedia: 'Ortopedia', neurologia: 'Neurología', deportiva: 'Deportiva' };
  const PALETA = ['#159E92', '#2563AB', '#B45309', '#7C3AED', '#DC2D3F', '#0F9D58', '#0891B2', '#C2410C'];
  const NIVELES = ['Básico', 'Intermedio', 'Avanzado'];
  const nombreArea = k => NOMBRES_AREA[k] || (k ? k.charAt(0).toUpperCase() + k.slice(1) : 'General');
  const colorArea = k => { let h = 0; String(k || '').split('').forEach(ch => { h = (h * 31 + ch.charCodeAt(0)) >>> 0; }); return PALETA[h % PALETA.length]; };

  const S = { q: '', orden: 'az', vista: 'grid', area: '', estado: '', cfg: null };
  window.cuEstado = S;

  // ---------- Utilidades ----------
  function minutos(txt) {
    const t = String(txt || '').toLowerCase();
    const h = /(\d+(?:[.,]\d+)?)\s*h/.exec(t), m = /(\d+)\s*min/.exec(t);
    if (!h && !m) { const n = parseFloat(t); return Number.isFinite(n) ? n : 0; }
    return (h ? parseFloat(h[1].replace(',', '.')) * 60 : 0) + (m ? parseInt(m[1], 10) : 0);
  }
  function minutosDeCurso(c) {
    const suma = (c.lessons || []).reduce((t, l) => t + minutos(l.duration), 0);
    return suma || minutos(c.duration);
  }
  function horasDeCurso(c) { const m = minutosDeCurso(c); return m ? Math.round(m / 6) / 10 : 0; }
  function textoDuracion(min) { if (!min) return ''; const h = Math.floor(min / 60), m = Math.round(min % 60); return (h ? h + ' h ' : '') + (m ? m + ' min' : '').trim(); }
  function imagen(u) {
    u = String(u || '').trim();
    if (!u) return '';
    const d = /\/d\/([A-Za-z0-9_-]+)/.exec(u) || /[?&]id=([A-Za-z0-9_-]+)/.exec(u);
    if (/drive\.google\.com/.test(u) && d) return 'https://drive.google.com/thumbnail?id=' + d[1] + '&sz=w800';
    return /^https?:/.test(u) ? u : '../' + u.replace(/^\/+/, '');
  }
  window.nombreAreaCurso = nombreArea; window.horasCursoNum = c => horasDeCurso(c);
  const activo = c => c.activo !== false;
  const nivelDe = c => c.nivel || 'Intermedio';
  const nClases = c => (c.lessons || []).length;

  // ---------- KPIs ----------
  function kpis() {
    const cs = data.courses, act = cs.filter(activo).length;
    const clases = cs.reduce((t, c) => t + nClases(c), 0);
    const horas = cs.reduce((t, c) => t + minutosDeCurso(c), 0) / 60;
    const k = (lbl, val, sub, c1, c2) => '<div class="cu-kpi" style="--c1:' + c1 + ';--c2:' + c2 + '"><div class="lbl">' + lbl + '</div><div class="val">' + val + '</div><div class="sub">' + sub + '</div></div>';
    $('cuKpis').innerHTML =
      k('Total catálogo', cs.length, 'Cursos grabados', '#2563AB', '#4CA6DE') +
      k('Activos', act, (cs.length - act) + ' inactivo' + (cs.length - act === 1 ? '' : 's'), '#0F9D58', '#34D399') +
      k('Total clases', clases, cs.length ? 'Promedio ' + (clases / cs.length).toFixed(1) + ' por curso' : '—', '#B45309', '#FBBF24') +
      k('Horas totales', Math.round(horas) + 'h', 'Contenido publicado', '#7C3AED', '#C4B5FD');
  }

  // ---------- Filtros ----------
  function pills() {
    const cuenta = {};
    data.courses.forEach(c => { cuenta[c.category || ''] = (cuenta[c.category || ''] || 0) + 1; });
    const claves = Object.keys(cuenta).sort((a, b) => nombreArea(a).localeCompare(nombreArea(b), 'es'));
    const p = (txt, n, on, fn) => '<button type="button" class="cu-pill' + (on ? ' on' : '') + '" onclick="' + fn + '">' + txt + ' <span class="n">' + n + '</span></button>';
    $('cuAreas').innerHTML = p('Todas las áreas', data.courses.length, !S.area, "cuFiltro('area','')") + claves.map(k => p(esc(nombreArea(k)), cuenta[k], S.area === k && k !== '', "cuFiltro('area','" + esc(k) + "')")).join('');
    const act = data.courses.filter(activo).length;
    $('cuEstados').innerHTML = p('Todos los estados', data.courses.length, !S.estado, "cuFiltro('estado','')") + p('Activos', act, S.estado === 'activo', "cuFiltro('estado','activo')") + p('Inactivos', data.courses.length - act, S.estado === 'inactivo', "cuFiltro('estado','inactivo')");
  }
  window.cuFiltro = (k, v) => { S[k] = v; renderLista(); pills(); };
  window.cuBuscar = v => { S.q = (v || '').toLowerCase(); renderLista(); };
  window.cuOrden = v => { S.orden = v; segmentos(); renderLista(); };
  window.cuVista = v => { S.vista = v; segmentos(); renderLista(); };
  function segmentos() {
    const b = (grp, v, txt, ic, on, fn) => '<button type="button" class="' + (on ? 'on' : '') + '" onclick="' + fn + "('" + v + "')\">" + ic + txt + '</button>';
    $('cuOrdenSeg').innerHTML = b('o', 'az', 'A-Z', ICON.az, S.orden === 'az', 'cuOrden') + b('o', 'horas', 'Horas', ICON.reloj, S.orden === 'horas', 'cuOrden') + b('o', 'recientes', 'Recientes', ICON.nuevo, S.orden === 'recientes', 'cuOrden');
    $('cuVistaSeg').innerHTML = b('v', 'grid', '', ICON.grid, S.vista === 'grid', 'cuVista') + b('v', 'lista', '', ICON.lista, S.vista === 'lista', 'cuVista');
  }

  // ---------- Ruta (orden de apertura) ----------
  function ruta(c) {
    const cfg = S.cfg || {};
    if (cfg.escalonadoActivo !== true) return '';
    const orden = data.courses.filter(activo);
    const n = orden.findIndex(x => x.id === c.id);
    if (n < 0) return '';
    return 'Ruta #' + (n + 1) + ' · Día ' + n * (cfg.escalonadoDias || 8);
  }

  // ---------- Tarjetas ----------
  function tarjeta(c) {
    const ac = colorArea(c.category), h = horasDeCurso(c), r = ruta(c);
    const portada = imagen(c.thumbnail);
    return '<article class="cu-card' + (activo(c) ? '' : ' off') + '" style="--ac:' + ac + '"><div class="cu-cover"' + (portada ? ' style="background-image:url(\'' + esc(portada) + '\')"' : '') + '>' +
      '<span class="cu-area">' + esc(nombreArea(c.category)) + '</span><button type="button" class="cu-switch' + (activo(c) ? ' on' : '') + '" aria-label="Activar o desactivar" onclick="cuAlternar(' + c.id + ')"></button>' +
      '<span class="cu-nivel">' + esc(nivelDe(c)) + '</span>' + (c.badge ? '<span class="cu-badge">' + esc(c.badge) + '</span>' : '') + '</div>' +
      '<div class="cu-body"><h4 class="cu-titulo">' + esc(c.title) + '</h4><div class="cu-inst">' + ICON.persona + esc(c.instructor || 'Equipo FisioTeck') + '</div>' +
      '<div class="cu-meta">' + (r ? '<span class="ruta">' + r + '</span>' : '') + '<span>' + nClases(c) + ' clases</span>' + (h ? '<span>' + h + ' h</span>' : '') + ((c.materiales || []).length ? '<span>' + c.materiales.length + ' mat.</span>' : '') + (c.availableDate ? '<span class="ext">Abre ' + esc(c.availableDate) + '</span>' : '') + '</div>' +
      '<div class="cu-pie"><span class="cu-estado"><i></i>' + (activo(c) ? 'Activo' : 'Inactivo') + '</span><div class="cu-acc"><button type="button" title="Editar" onclick="abrirEditorCurso(' + c.id + ')">' + ICON.editar + '</button><button type="button" class="del" title="Eliminar" onclick="cuBorrar(' + c.id + ')">' + ICON.borrar + '</button></div></div></div></article>';
  }
  function fila(c) {
    const ac = colorArea(c.category), h = horasDeCurso(c), r = ruta(c);
    return '<div class="cu-row' + (activo(c) ? '' : ' off') + '" style="--ac:' + ac + '"><div class="th"' + (imagen(c.thumbnail) ? ' style="background-image:url(\'' + esc(imagen(c.thumbnail)) + '\')"' : '') + '></div>' +
      '<div class="tx"><strong>' + esc(c.title) + '</strong><div class="chips"><span>' + esc(nombreArea(c.category)) + '</span><span>' + esc(nivelDe(c)) + '</span>' + (r ? '<span>' + r + '</span>' : '') + '<span>' + esc(c.instructor || 'Equipo FisioTeck') + '</span></div></div>' +
      '<div class="st"><span>' + nClases(c) + ' clases</span><span>' + (h ? h + ' h' : '—') + '</span>' + ((c.materiales || []).length ? '<span>' + c.materiales.length + ' mat.</span>' : '') + '</div>' +
      '<span class="cu-estado"><i></i>' + (activo(c) ? 'Activo' : 'Inactivo') + '</span><div class="switch-inline"><button type="button" class="cu-switch' + (activo(c) ? ' on' : '') + '" aria-label="Activar o desactivar" onclick="cuAlternar(' + c.id + ')"></button></div>' +
      '<div class="cu-acc"><button type="button" title="Editar" onclick="abrirEditorCurso(' + c.id + ')">' + ICON.editar + '</button><button type="button" class="del" title="Eliminar" onclick="cuBorrar(' + c.id + ')">' + ICON.borrar + '</button></div></div>';
  }
  function renderLista() {
    let l = data.courses.filter(c => (!S.area || c.category === S.area) && (!S.estado || (S.estado === 'activo') === activo(c)) &&
      (!S.q || (c.title + ' ' + (c.instructor || '') + ' ' + (c.desc || '')).toLowerCase().includes(S.q)));
    if (S.orden === 'az') l.sort((a, b) => a.title.localeCompare(b.title, 'es'));
    else if (S.orden === 'horas') l.sort((a, b) => minutosDeCurso(b) - minutosDeCurso(a));
    else l.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')) || b.id - a.id);
    $('cuContenedor').innerHTML = l.length
      ? '<div class="' + (S.vista === 'grid' ? 'cu-grid' : 'cu-list') + '">' + l.map(S.vista === 'grid' ? tarjeta : fila).join('') + '</div>'
      : '<div class="cu-vacio">' + (data.courses.length ? 'Ningún curso coincide con tu búsqueda.' : 'Aún no hay cursos. Crea el primero con “Nuevo curso”.') + '</div>';
  }
  window.renderCourses = function () { if (!$('cuKpis')) return; kpis(); pills(); segmentos(); renderLista(); };

  window.cuAlternar = id => {
    const c = data.courses.find(x => x.id === id); if (!c) return;
    c.activo = !activo(c); saveData(); renderCourses(); renderDashboard();
    toast(c.activo ? 'Curso activado' : 'Curso desactivado: ya no se ve en el Club');
  };
  window.cuBorrar = id => {
    const c = data.courses.find(x => x.id === id); if (!c) return;
    if (!confirm('¿Eliminar el curso "' + c.title + '"? Esta acción no se puede deshacer. Si solo quieres ocultarlo, desactívalo con el interruptor.')) return;
    data.courses = data.courses.filter(x => x.id !== id); saveData(); renderCourses(); renderDashboard(); toast('Curso eliminado');
  };

  // ---------- Contenido real del sitio ----------
  const esDemo = () => data.courses.length > 0 && data.courses.every(c => !(c.lessons || []).some(l => l.bunnyVideoId)) && data.courses[0].id === 1;
  window.cuCargarDelSitio = async function (forzar) {
    if (forzar && !confirm('Se reemplazarán los cambios que tengas sin publicar por el contenido actual del sitio. ¿Continuar?')) return;
    try {
      const r = await fetch('../data/content.json?v=' + Date.now(), { cache: 'no-store' });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const nuevo = await r.json();
      data = Object.assign({ news: [], members: [], live: [], pdfs: [] }, nuevo);
      saveData();
      renderCourses(); renderLive(); renderPdfs(); renderNewsList(); renderDashboard();
      if (forzar) toast('Contenido del sitio cargado');
    } catch (e) { if (forzar) toast('No se pudo cargar el contenido del sitio'); }
  };
  const initOriginal = window.initAdmin;
  window.initAdmin = function () {
    initOriginal();
    fbDb.collection('config').doc('club').get().then(s => { S.cfg = s.exists ? s.data() : {}; renderCourses(); }).catch(() => {});
    if (esDemo()) cuCargarDelSitio(false); // el panel arrancaba con cursos de ejemplo: carga los reales
  };
  const editarOriginal = window.editItem;
  window.editItem = function (tipo, id) { if (tipo === 'course') return abrirEditorCurso(id); return editarOriginal.apply(this, arguments); };
  const abrirOriginal = window.openModal;
  window.openModal = function (tipo, item) { if (tipo === 'course') return abrirEditorCurso(item ? item.id : null); return abrirOriginal.apply(this, arguments); };

  // ═══════════════ EDITOR ═══════════════
  let D = null, abiertos = {}; // borrador del curso y paneles abiertos por clase
  const clon = o => JSON.parse(JSON.stringify(o));
  const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const JUEGOS = { sopa_letras: 'Sopa de letras', memorama: 'Memorama', rompecabezas: 'Rompecabezas', ahorcado: 'Ahorcado' };

  function overlay() {
    let o = $('cueOverlay');
    if (!o) { o = document.createElement('div'); o.id = 'cueOverlay'; o.className = 'cue-overlay'; document.body.appendChild(o); }
    return o;
  }
  window.abrirEditorCurso = function (id) {
    const c = id ? data.courses.find(x => x.id === id) : null;
    D = c ? clon(c) : { id: Date.now(), title: '', desc: '', category: Object.keys(NOMBRES_AREA)[0], nivel: 'Intermedio', instructor: '', duration: '', thumbnail: '', badge: '', availableDate: '', temarioImg: '', activo: true, date: new Date().toISOString().split('T')[0], lessons: [], type: 'video' };
    D._nuevo = !c;
    D.materiales = [];
    D._matsEstado = c ? 'cargando' : 'listo'; // los enlaces de los materiales viven en el servidor, no en el sitio
    D._pregEstado = c ? 'cargando' : 'listo'; // las respuestas correctas del quiz también viven en el servidor
    D._juegoEstado = c ? 'cargando' : 'listo'; // los datos de los juegos de cada clase también viven en el servidor (solo se entregan a quien tiene acceso)
    D._teniaJuego = D.lessons.some(l => l && l.juego);
    if (c) { cargarMateriales(c.id); cargarRespuestas(c.id); cargarJuegos(c.id); }
    D.lessons.forEach(l => { l.videoRef = l.bunnyVideoId || l.videoUrl || ''; l.preguntas = l.preguntas || []; if (l.juego && l.juego.tipo && !l.juego.datos && PLANTILLAS[l.juego.tipo]) l.juego = { tipo: l.juego.tipo, datos: PLANTILLAS[l.juego.tipo]() }; });
    abiertos = {};
    pintarEditor();
    overlay().classList.add('on');
  };
  async function cargarMateriales(id) {
    const mio = D;
    try {
      const r = await apiAdmin('/api/admin/materiales-curso/' + encodeURIComponent(id));
      if (D !== mio) return;
      D.materiales = (r.materiales || []).map(m => ({ titulo: m.titulo, url: m.url, desbloqueaEnClase: m.desbloqueaEnClase || 0 }));
      D._matsEstado = 'listo';
    } catch (e) {
      if (D !== mio) return;
      D._matsEstado = 'error'; D._matsMsg = e.message;
    }
    if (D === mio && $('cueOverlay').classList.contains('on')) pintarEditor();
  }
  async function cargarRespuestas(id) {
    const mio = D;
    try {
      const r = await apiAdmin('/api/admin/preguntas-curso/' + encodeURIComponent(id));
      if (D !== mio) return;
      D.lessons.forEach((l, i) => ((r.clases || {})[i] || []).forEach((q, k) => { if (l.preguntas[k]) l.preguntas[k].correcta = q.correcta; }));
      D._pregEstado = 'listo';
    } catch (e) { if (D !== mio) return; D._pregEstado = 'error'; D._pregMsg = e.message; }
    if (D === mio && $('cueOverlay').classList.contains('on')) pintarEditor();
  }
  async function cargarJuegos(id) {
    const mio = D;
    try {
      const r = await apiAdmin('/api/admin/juegos-curso/' + encodeURIComponent(id));
      if (D !== mio) return;
      D.lessons.forEach((l, i) => { const j = (r.clases || {})[i]; if (j && j.tipo && PLANTILLAS[j.tipo]) l.juego = { tipo: j.tipo, datos: Object.assign(PLANTILLAS[j.tipo](), j.datos || {}) }; });
      D._juegoEstado = 'listo';
    } catch (e) { if (D !== mio) return; D._juegoEstado = 'error'; D._juegoMsg = e.message; }
    if (D === mio && $('cueOverlay').classList.contains('on')) pintarEditor();
  }
  function cerrarEditor() { overlay().classList.remove('on'); D = null; }
  window.cueCerrar = cerrarEditor;

  const val = v => esc(v == null ? '' : v);
  function areaSelect() {
    const claves = [...new Set(Object.keys(NOMBRES_AREA).concat(data.courses.map(c => c.category).filter(Boolean)))];
    return '<select class="form-select" onchange="cueSet(\'category\',this.value)">' + claves.map(k => '<option value="' + val(k) + '"' + (D.category === k ? ' selected' : '') + '>' + val(nombreArea(k)) + '</option>').join('') + '</select>';
  }
  function pintarEditor() {
    const o = overlay(), total = textoDuracion(D.lessons.reduce((t, l) => t + minutos(l.duration), 0));
    o.innerHTML = '<div class="cue-box"><div class="cue-head"><h3>' + (D._nuevo ? 'Nuevo curso' : 'Editar curso') + '</h3><button class="modal-close" type="button" onclick="cueCerrar()">×</button></div><div class="cue-body">' +
      '<div class="cue-grid">' +
      '<div class="form-group cue-full"><label class="form-label">Título del curso *</label><input class="form-input" maxlength="140" value="' + val(D.title) + '" oninput="cueSet(\'title\',this.value)"></div>' +
      '<div class="form-group cue-full"><label class="form-label">Descripción</label><textarea class="form-textarea" maxlength="600" oninput="cueSet(\'desc\',this.value)">' + val(D.desc) + '</textarea></div>' +
      '<div class="form-group"><label class="form-label">Área</label>' + areaSelect() + '</div>' +
      '<div class="form-group"><label class="form-label">Nivel</label><select class="form-select" onchange="cueSet(\'nivel\',this.value)">' + NIVELES.map(n => '<option' + (nivelDe(D) === n ? ' selected' : '') + '>' + n + '</option>').join('') + '</select></div>' +
      '<div class="form-group"><label class="form-label">Instructor</label><input class="form-input" value="' + val(D.instructor) + '" placeholder="Equipo FisioTeck" oninput="cueSet(\'instructor\',this.value)"></div>' +
      '<div class="form-group"><label class="form-label">Duración total</label><input class="form-input" value="' + val(D.duration) + '" placeholder="' + (total || 'Ej.: 4 h 30 min') + '" oninput="cueSet(\'duration\',this.value)"><p class="cue-nota">Si la dejas vacía se suma de las clases' + (total ? ' (' + total + ')' : '') + '.</p></div>' +
      '<div class="form-group cue-full"><label class="form-label">Portada (enlace de imagen o de Drive)</label><div class="cue-portada"><div class="vista" id="cuePortada" style="' + (imagen(D.thumbnail) ? 'background-image:url(\'' + val(imagen(D.thumbnail)) + '\')' : '') + '"></div><input class="form-input" value="' + val(D.thumbnail) + '" placeholder="https://… o assets/course-thumbnails/archivo.webp" oninput="cueSet(\'thumbnail\',this.value);cuePortadaVista()"></div></div>' +
      '<div class="form-group"><label class="form-label">Etiqueta (Nuevo, Popular, Certificado…)</label><input class="form-input" value="' + val(D.badge) + '" oninput="cueSet(\'badge\',this.value)"></div>' +
      '<div class="form-group"><label class="form-label">Fecha de apertura (opcional)</label><input class="form-input" type="date" value="' + val(D.availableDate) + '" onchange="cueSet(\'availableDate\',this.value)"></div>' +
      '<div class="form-group cue-full"><label class="form-label">Imagen del temario (opcional)</label><input class="form-input" value="' + val(D.temarioImg) + '" oninput="cueSet(\'temarioImg\',this.value)"></div>' +
      '<div class="form-group cue-full"><label class="cue-check"><input type="checkbox"' + (activo(D) ? ' checked' : '') + ' onchange="cueSet(\'activo\',this.checked)"> Curso activo (visible en el Club)</label></div>' +
      '</div>' +
      '<div class="cue-h"><h4>Clases (' + D.lessons.length + ')</h4><div style="display:flex;gap:8px;flex-wrap:wrap;"><button type="button" class="btn btn-o btn-sm" id="cueBunnyBtn" onclick="cueSincronizarBunny()" title="Busca en Bunny la colección con el mismo nombre y llena los videos">Sincronizar con Bunny</button><button type="button" class="btn btn-o btn-sm" onclick="cueAgregarClase()">+ Agregar clase</button></div></div>' +
      D.lessons.map(claseHTML).join('') +
      (D.lessons.length ? '' : '<div class="cu-vacio" style="margin:0">Aún no hay clases. Agrega la primera.</div>') +
      '<div class="cue-h"><h4>Materiales del curso (' + D.materiales.length + ')</h4>' + (D._matsEstado === 'listo' ? '<button type="button" class="btn btn-o btn-sm" onclick="cueAgregarMat()">+ Agregar material</button>' : '') + '</div>' +
      (D._matsEstado === 'cargando' ? '<p class="cue-nota" style="margin-top:0">Cargando los materiales guardados…</p>' : D._matsEstado === 'error' ? '<p class="cue-nota" style="margin-top:0;color:var(--danger)">No se pudieron cargar los materiales (' + val(D._matsMsg) + '). Para no perderlos, no se modificarán al guardar. Enciende el servidor y vuelve a abrir el curso.</p>' : D.materiales.map(materialHTML).join('') +
      (D.materiales.length ? '' : '<p class="cue-nota" style="margin-top:0">PDFs, hojas de cálculo, presentaciones o carpetas que acompañan al curso. Se desbloquean conforme el alumno termina las clases y solo los abre quien tiene membresía (o la prueba de ese curso). Sus enlaces se guardan en el servidor, no en el sitio.</p>')) +
      '<p class="cue-nota">Cada clase necesita el ID de video de Bunny o un enlace. Al terminar una clase el alumno responde sus preguntas (si hay) y juega su juego (si hay). La clase marcada como "gratis" es la vista previa para quien no tiene membresía.</p>' +
      '<div class="cue-error" id="cueError"></div></div>' +
      '<div class="cue-foot"><button type="button" class="btn btn-o" onclick="cueCerrar()">Cancelar</button><button type="button" class="btn btn-p" onclick="cueGuardar()">Guardar curso</button></div></div>';
  }
  window.cueSet = (k, v) => { D[k] = v; };
  window.cuePortadaVista = () => { const v = $('cuePortada'); if (v) v.style.backgroundImage = imagen(D.thumbnail) ? "url('" + imagen(D.thumbnail) + "')" : ''; };
  window.cueSetL = (i, k, v) => { D.lessons[i][k] = v; };

  function claseHTML(l, i) {
    const nq = l.preguntas.length, j = l.juego;
    const ab = abiertos[i];
    return '<div class="cue-clase"><div class="cue-clase-cab"><span class="cue-num">' + (i + 1) + '</span><input class="t" value="' + val(l.title) + '" placeholder="Título de la clase" oninput="cueSetL(' + i + ',\'title\',this.value)">' +
      '<button type="button" class="cue-mini" title="Subir" onclick="cueMover(' + i + ',-1)">▲</button><button type="button" class="cue-mini" title="Bajar" onclick="cueMover(' + i + ',1)">▼</button><button type="button" class="cue-mini del" title="Quitar" onclick="cueQuitarClase(' + i + ')">✕</button></div>' +
      '<div class="cue-clase-cuerpo"><div class="form-group"><label class="form-label">Video (ID de Bunny o enlace)</label><input class="form-input" value="' + val(l.videoRef) + '" oninput="cueSetL(' + i + ',\'videoRef\',this.value)"></div>' +
      '<div class="form-group"><label class="form-label">Duración</label><input class="form-input" value="' + val(l.duration) + '" placeholder="58 min" oninput="cueSetL(' + i + ',\'duration\',this.value)"></div>' +
      '<div class="form-group" style="grid-column:1/-1"><label class="form-label">Descripción (opcional)</label><input class="form-input" value="' + val(l.desc) + '" oninput="cueSetL(' + i + ',\'desc\',this.value)"><label class="cue-check"><input type="checkbox"' + (l.isPreview ? ' checked' : '') + ' onchange="cueSetL(' + i + ',\'isPreview\',this.checked)"> Clase gratis (vista previa para quien no tiene membresía)</label></div></div>' +
      '<div class="cue-extras"><button type="button" class="cue-tab' + (ab === 'q' ? ' on' : '') + '" onclick="cuePanel(' + i + ',\'q\')">Preguntas (' + nq + ')</button><button type="button" class="cue-tab' + (ab === 'j' ? ' on' : '') + '" onclick="cuePanel(' + i + ',\'j\')">' + (j ? 'Juego: ' + JUEGOS[j.tipo] : '+ Juego dinámico') + '</button></div>' +
      (ab === 'q' ? panelPreguntas(i) : ab === 'j' ? panelJuego(i) : '') + '</div>';
  }
  window.cuePanel = (i, p) => { abiertos[i] = abiertos[i] === p ? null : p; pintarEditor(); };
  window.cueAgregarClase = () => { D.lessons.push({ id: Date.now() + D.lessons.length, title: 'Sesión ' + String(D.lessons.length + 1).padStart(2, '0'), desc: '', duration: '', videoRef: '', isPreview: D.lessons.length === 0, preguntas: [], juego: null, videoProvider: 'bunny', sessionNumbers: [D.lessons.length + 1] }); pintarEditor(); };
  window.cueQuitarClase = i => { if (!confirm('¿Quitar la clase ' + (i + 1) + '?')) return; D.lessons.splice(i, 1); abiertos = {}; pintarEditor(); };
  window.cueMover = (i, d) => { const j = i + d; if (j < 0 || j >= D.lessons.length) return; [D.lessons[i], D.lessons[j]] = [D.lessons[j], D.lessons[i]]; abiertos = {}; pintarEditor(); };

  // ---- Materiales ----
  function materialHTML(m, i) {
    return '<div class="cue-clase"><div class="cue-clase-cab"><span class="cue-num" style="background:var(--info)">M' + (i + 1) + '</span><input class="t" value="' + val(m.titulo) + '" placeholder="Título del material" oninput="cueMatSet(' + i + ',\'titulo\',this.value)"><button type="button" class="cue-mini del" title="Quitar" onclick="cueQuitarMat(' + i + ')">✕</button></div>' +
      '<div style="padding:14px"><div class="form-group" style="margin-bottom:6px"><label class="form-label">Enlace (Google Drive, PDF, carpeta…)</label><input class="form-input" type="url" value="' + val(m.url) + '" placeholder="https://drive.google.com/…" oninput="cueMatSet(' + i + ',\'url\',this.value)"></div>' +
      '<div class="form-group" style="margin:0"><label class="form-label">Se desbloquea</label><select class="form-select" onchange="cueMatSet(' + i + ',\'desbloqueaEnClase\',Number(this.value))"><option value="0"' + (!m.desbloqueaEnClase ? ' selected' : '') + '>Desde el inicio del curso</option>' + D.lessons.map((l, k) => '<option value="' + (k + 1) + '"' + (m.desbloqueaEnClase === k + 1 ? ' selected' : '') + '>Al terminar la clase ' + (k + 1) + (l.title ? ' · ' + val(String(l.title).slice(0, 40)) : '') + '</option>').join('') + '</select></div></div></div>';
  }
  window.cueAgregarMat = () => { D.materiales.push({ titulo: '', url: '', desbloqueaEnClase: 0 }); pintarEditor(); };
  window.cueQuitarMat = i => { D.materiales.splice(i, 1); pintarEditor(); };
  window.cueMatSet = (i, k, v) => { D.materiales[i][k] = v; };

  // ---- Bunny ----
  const norm = t => String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  function parecido(a, b) {
    a = norm(a); b = norm(b);
    if (!a || !b) return 0;
    if (a === b) return 1;
    if (a.includes(b) || b.includes(a)) return 0.9;
    const pa = new Set(a.split(' ').filter(w => w.length > 2)), pb = new Set(b.split(' ').filter(w => w.length > 2));
    const inter = [...pa].filter(w => pb.has(w)).length, union = new Set([...pa, ...pb]).size;
    return union ? inter / union : 0;
  }
  window.cueSincronizarBunny = async function () {
    const btn = $('cueBunnyBtn'); if (btn) { btn.disabled = true; btn.textContent = 'Buscando…'; }
    try {
      const r = await apiAdmin('/api/admin/bunny-catalogo');
      let mejor = null, pts = 0;
      (r.catalogo || []).forEach(col => { const t = col.collectionId === D.bunnyCollectionId ? 1 : parecido(D.title, col.titulo); if (t > pts) { pts = t; mejor = col; } });
      if (!mejor || pts < 0.45) throw new Error('No encontré una colección de Bunny parecida a "' + (D.title || 'este curso') + '". Escribe el título del curso igual que en Bunny o pega los IDs a mano.');
      let creadas = 0;
      mejor.sesiones.forEach(se => {
        let l = D.lessons[se.numero - 1];
        if (!l) { l = { id: Date.now() + se.numero, title: '', desc: '', duration: '', isPreview: se.numero === 1, preguntas: [], juego: null, videoProvider: 'bunny', sessionNumbers: [se.numero], videoRef: '' }; D.lessons[se.numero - 1] = l; creadas++; }
        l.videoRef = se.videoId;
        if (!String(l.title || '').trim()) l.title = se.titulo || 'Sesión ' + String(se.numero).padStart(2, '0');
        if (!String(l.duration || '').trim() && se.duracion) l.duration = se.duracion;
      });
      D.lessons = D.lessons.filter(Boolean);
      D.bunnyCollectionId = mejor.collectionId;
      pintarEditor();
      toast('Bunny: ' + mejor.sesiones.length + ' video(s) de "' + mejor.titulo + '"' + (creadas ? ' · ' + creadas + ' clase(s) nueva(s)' : ''));
    } catch (e) { toast(e.message); if (btn) { btn.disabled = false; btn.textContent = 'Sincronizar con Bunny'; } }
  };

  // Registra el curso en el catálogo de video del servidor para que sus clases se puedan reproducir
  async function registrarEnServidor(item) {
    const clases = item.lessons.filter(l => l.bunnyVideoId);
    if (!clases.length) return;
    try {
      await apiAdmin('/api/admin/catalogo-curso', { method: 'POST', body: JSON.stringify({ courseId: item.id, title: item.title, collectionId: item.bunnyCollectionId || '', lessons: item.lessons.map(l => ({ lessonId: l.id, title: l.title, isPreview: l.isPreview === true, bunnyVideoId: l.bunnyVideoId || '' })) }) });
    } catch (e) { toast('Curso guardado, pero el servidor de video no lo registró: ' + e.message); }
  }

  // ---- Preguntas ----
  function panelPreguntas(i) {
    const l = D.lessons[i];
    return '<div class="cue-panel">' + l.preguntas.map((q, k) =>
      '<div class="cue-q"><div style="display:flex;gap:8px;margin-bottom:6px;"><select class="form-select" style="max-width:190px" onchange="cueQTipo(' + i + ',' + k + ',this.value)"><option value="multiple"' + (q.tipo !== 'vof' ? ' selected' : '') + '>Opción múltiple</option><option value="vof"' + (q.tipo === 'vof' ? ' selected' : '') + '>Verdadero o falso</option></select><button type="button" class="cue-mini del" onclick="cueQuitarQ(' + i + ',' + k + ')">✕</button></div>' +
      '<input class="form-input" placeholder="Pregunta" value="' + val(q.pregunta) + '" oninput="cueQSet(' + i + ',' + k + ',\'pregunta\',this.value)">' +
      (q.tipo === 'vof'
        ? '<div class="cue-opc"><label class="cue-check"><input type="radio" name="vf' + i + '_' + k + '"' + (q.correcta === 0 ? ' checked' : '') + ' onchange="cueQSet(' + i + ',' + k + ',\'correcta\',0)"> Verdadero</label><label class="cue-check"><input type="radio" name="vf' + i + '_' + k + '"' + (q.correcta === 1 ? ' checked' : '') + ' onchange="cueQSet(' + i + ',' + k + ',\'correcta\',1)"> Falso</label><span class="cue-nota" style="margin:0">(marca la respuesta correcta)</span></div>'
        : (q.opciones || []).map((op, n) => '<div class="cue-opc"><input type="radio" name="op' + i + '_' + k + '"' + (q.correcta === n ? ' checked' : '') + ' onchange="cueQSet(' + i + ',' + k + ',\'correcta\',' + n + ')" title="Respuesta correcta"><input type="text" class="form-input" placeholder="Opción ' + (n + 1) + '" value="' + val(op) + '" oninput="cueQOpc(' + i + ',' + k + ',' + n + ',this.value)">' + ((q.opciones || []).length > 2 ? '<button type="button" class="cue-mini del" onclick="cueQQuitarOpc(' + i + ',' + k + ',' + n + ')">✕</button>' : '') + '</div>').join('') +
          ((q.opciones || []).length < 5 ? '<button type="button" class="btn btn-o btn-sm" style="margin-top:8px" onclick="cueQAgregarOpc(' + i + ',' + k + ')">+ Opción</button>' : '')) + '</div>').join('') +
      '<button type="button" class="btn btn-o btn-sm" onclick="cueAgregarQ(' + i + ')">+ Agregar pregunta</button><p class="cue-nota">Se hacen al terminar la clase. Para continuar el alumno necesita acertar al menos el 60 % (puede reintentar).</p></div>';
  }
  window.cueAgregarQ = i => { D.lessons[i].preguntas.push({ tipo: 'multiple', pregunta: '', opciones: ['', ''], correcta: 0 }); pintarEditor(); };
  window.cueQuitarQ = (i, k) => { D.lessons[i].preguntas.splice(k, 1); pintarEditor(); };
  window.cueQTipo = (i, k, t) => { const q = D.lessons[i].preguntas[k]; q.tipo = t; q.correcta = 0; if (t === 'multiple' && !(q.opciones || []).length) q.opciones = ['', '']; pintarEditor(); };
  window.cueQSet = (i, k, c, v) => { D.lessons[i].preguntas[k][c] = v; };
  window.cueQOpc = (i, k, n, v) => { D.lessons[i].preguntas[k].opciones[n] = v; };
  window.cueQAgregarOpc = (i, k) => { D.lessons[i].preguntas[k].opciones.push(''); pintarEditor(); };
  window.cueQQuitarOpc = (i, k, n) => { const q = D.lessons[i].preguntas[k]; q.opciones.splice(n, 1); if (q.correcta >= q.opciones.length) q.correcta = 0; pintarEditor(); };

  // ---- Juegos ----
  function panelJuego(i) {
    const j = D.lessons[i].juego;
    const sel = '<select class="form-select" onchange="cueJuegoTipo(' + i + ',this.value)"><option value="">Sin juego</option>' + Object.keys(JUEGOS).map(t => '<option value="' + t + '"' + (j && j.tipo === t ? ' selected' : '') + '>' + JUEGOS[t] + '</option>').join('') + '</select>';
    let cuerpo = '';
    if (j && j.tipo === 'sopa_letras') {
      const pals = (j.datos.palabras && j.datos.palabras.length ? j.datos.palabras : ['', '', '']);
      cuerpo = '<label class="form-label" style="margin-top:12px">Palabras a encontrar (vocabulario clave de esta clase). De 3 a 12 letras, mínimo 3.</label>' + pals.map((w, n) => '<div class="cue-opc"><input class="form-input" style="text-transform:uppercase" placeholder="Palabra ' + (n + 1) + '" value="' + val(w) + '" oninput="cueJuegoPal(' + i + ',' + n + ',this.value)">' + (pals.length > 3 ? '<button type="button" class="cue-mini del" onclick="cueJuegoQuitar(' + i + ',' + n + ')">✕</button>' : '') + '</div>').join('') + (pals.length < 10 ? '<button type="button" class="btn btn-o btn-sm" style="margin-top:8px" onclick="cueJuegoAgregar(' + i + ')">+ Agregar palabra</button>' : '');
    } else if (j && j.tipo === 'memorama') {
      cuerpo = '<label class="form-label" style="margin-top:12px">Pares término / definición (mínimo 3, máximo 8)</label>' + (j.datos.pares || []).map((p, n) => '<div class="cue-opc"><input class="form-input" placeholder="Término" value="' + val(p.termino) + '" oninput="cueJuegoPar(' + i + ',' + n + ',\'termino\',this.value)"><input class="form-input" placeholder="Definición" value="' + val(p.definicion) + '" oninput="cueJuegoPar(' + i + ',' + n + ',\'definicion\',this.value)"><button type="button" class="cue-mini del" onclick="cueJuegoQuitar(' + i + ',' + n + ')">✕</button></div>').join('') + ((j.datos.pares || []).length < 8 ? '<button type="button" class="btn btn-o btn-sm" style="margin-top:8px" onclick="cueJuegoAgregar(' + i + ')">+ Par</button>' : '');
    } else if (j && j.tipo === 'rompecabezas') {
      cuerpo = '<div class="cue-grid" style="margin-top:12px"><div class="form-group"><label class="form-label">Dificultad</label><select class="form-select" onchange="cueJuegoDato(' + i + ',\'dificultad\',this.value)">' + ['3', '4', '5'].map(n => '<option value="' + n + '"' + (String(j.datos.dificultad) === n ? ' selected' : '') + '>' + n + ' × ' + n + '</option>').join('') + '</select></div><div class="form-group"><label class="form-label">Imagen (opcional)</label><input class="form-input" placeholder="Si lo dejas vacío usa la portada del curso" value="' + val(j.datos.imagenUrl) + '" oninput="cueJuegoDato(' + i + ',\'imagenUrl\',this.value)"></div></div>';
    } else if (j && j.tipo === 'ahorcado') {
      cuerpo = '<label class="form-label" style="margin-top:12px">Palabras y pistas (mínimo 1)</label>' + (j.datos.palabras || []).map((p, n) => '<div class="cue-opc"><input class="form-input" placeholder="Palabra" value="' + val(p.palabra) + '" oninput="cueJuegoPar(' + i + ',' + n + ',\'palabra\',this.value)"><input class="form-input" placeholder="Pista" value="' + val(p.pista) + '" oninput="cueJuegoPar(' + i + ',' + n + ',\'pista\',this.value)"><button type="button" class="cue-mini del" onclick="cueJuegoQuitar(' + i + ',' + n + ')">✕</button></div>').join('') + '<button type="button" class="btn btn-o btn-sm" style="margin-top:8px" onclick="cueJuegoAgregar(' + i + ')">+ Palabra</button>';
    }
    return '<div class="cue-panel"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><label class="form-label" style="margin:0">Juego dinámico al terminar la clase</label>' + (j ? '<button type="button" class="btn btn-o btn-sm" onclick="cueJuegoTipo(' + i + ',\'\')">✕ Quitar juego</button>' : '') + '</div>' + sel + cuerpo + '<p class="cue-nota">Aparece después de las preguntas y hay que completarlo para poder marcar la clase como vista. No afecta el certificado. Sus datos se guardan en el servidor y solo los recibe quien tiene acceso al curso.</p></div>';
  }
  const PLANTILLAS = { sopa_letras: () => ({ palabras: ['', '', ''] }), memorama: () => ({ pares: [{ termino: '', definicion: '' }, { termino: '', definicion: '' }, { termino: '', definicion: '' }] }), rompecabezas: () => ({ dificultad: '3', imagenUrl: '' }), ahorcado: () => ({ palabras: [{ palabra: '', pista: '' }] }) };
  window.cueJuegoTipo = (i, t) => { D.lessons[i].juego = t ? { tipo: t, datos: PLANTILLAS[t]() } : null; pintarEditor(); };
  window.cueJuegoPal = (i, n, v) => { const d = D.lessons[i].juego.datos; if (!d.palabras || !d.palabras.length) d.palabras = ['', '', '']; d.palabras[n] = v; };
  window.cueJuegoPar = (i, n, c, v) => { const d = D.lessons[i].juego.datos; (d.pares || d.palabras)[n][c] = v; };
  window.cueJuegoQuitar = (i, n) => { const d = D.lessons[i].juego.datos; (d.pares || d.palabras).splice(n, 1); pintarEditor(); };
  window.cueJuegoAgregar = i => { const j = D.lessons[i].juego; if (j.tipo === 'memorama') j.datos.pares.push({ termino: '', definicion: '' }); else if (j.tipo === 'sopa_letras') { if (!j.datos.palabras || !j.datos.palabras.length) j.datos.palabras = ['', '', '']; j.datos.palabras.push(''); } else j.datos.palabras.push({ palabra: '', pista: '' }); pintarEditor(); };
  window.cueJuegoDato = (i, c, v) => { D.lessons[i].juego.datos[c] = v; };

  // ---- Validar y guardar ----
  const soloLetras = p => String(p).toUpperCase().replace(/Ñ/g, '\u0001').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\u0001/g, 'Ñ').replace(/[^A-ZÑ]/g, '');
  function limpiarJuego(j, i) {
    if (!j) return { juego: null };
    const d = j.datos || {};
    if (j.tipo === 'sopa_letras') {
      const pal = [...new Set((d.palabras || []).map(soloLetras).filter(p => p.length >= 3 && p.length <= 12))];
      if (pal.length < 3) return { error: 'Clase ' + (i + 1) + ': la sopa de letras necesita al menos 3 palabras de 3 a 12 letras.' };
      if (pal.length > 10) return { error: 'Clase ' + (i + 1) + ': la sopa de letras acepta máximo 10 palabras (tienes ' + pal.length + '); quita algunas.' };
      return { juego: { tipo: j.tipo, datos: { palabras: pal } } };
    }
    if (j.tipo === 'memorama') {
      const pares = (d.pares || []).map(p => ({ termino: String(p.termino || '').trim(), definicion: String(p.definicion || '').trim() })).filter(p => p.termino && p.definicion);
      if (pares.length < 3) return { error: 'Clase ' + (i + 1) + ': el memorama necesita al menos 3 pares completos.' };
      if (pares.length > 10) return { error: 'Clase ' + (i + 1) + ': el memorama acepta máximo 10 pares (tienes ' + pares.length + '); quita algunos.' };
      return { juego: { tipo: j.tipo, datos: { pares } } };
    }
    if (j.tipo === 'rompecabezas') return { juego: { tipo: j.tipo, datos: { dificultad: ['3', '4', '5'].includes(String(d.dificultad)) ? String(d.dificultad) : '3', imagenUrl: String(d.imagenUrl || '').trim() } } };
    if (j.tipo === 'ahorcado') {
      const pal = (d.palabras || []).map(p => ({ palabra: soloLetras(p.palabra), pista: String(p.pista || '').trim() })).filter(p => p.palabra.length >= 3);
      if (!pal.length) return { error: 'Clase ' + (i + 1) + ': el ahorcado necesita al menos 1 palabra de 3 letras o más.' };
      return { juego: { tipo: j.tipo, datos: { palabras: pal } } };
    }
    return { juego: null };
  }
  function limpiarPreguntas(qs, i) {
    const out = [];
    for (const q of qs) {
      const texto = String(q.pregunta || '').trim();
      if (!texto) { if (!(q.opciones || []).some(Boolean)) continue; return { error: 'Clase ' + (i + 1) + ': hay una pregunta sin texto.' }; }
      if (q.tipo === 'vof') { out.push({ tipo: 'vof', pregunta: texto, correcta: q.correcta === 1 ? 1 : 0 }); continue; }
      const opciones = (q.opciones || []).map(o => String(o).trim());
      if (opciones.filter(Boolean).length < 2 || opciones.some(o => !o)) return { error: 'Clase ' + (i + 1) + ': cada pregunta de opción múltiple necesita al menos 2 opciones con texto.' };
      out.push({ tipo: 'multiple', pregunta: texto, opciones, correcta: Math.min(Math.max(0, q.correcta | 0), opciones.length - 1) });
    }
    return { preguntas: out };
  }
  window.cueGuardar = function () {
    const err = $('cueError'); err.style.display = 'none';
    const falla = m => { err.textContent = m; err.style.display = 'block'; err.scrollIntoView({ block: 'center', behavior: 'smooth' }); };
    if (!String(D.title).trim()) return falla('El título del curso es obligatorio.');
    const lessons = [];
    for (let i = 0; i < D.lessons.length; i++) {
      const l = D.lessons[i], ref = String(l.videoRef || '').trim();
      if (!String(l.title).trim()) return falla('La clase ' + (i + 1) + ' necesita título.');
      if (!ref) return falla('La clase ' + (i + 1) + ' necesita el ID de Bunny o un enlace de video.');
      if (!GUID.test(ref) && !/^https?:\/\//i.test(ref)) return falla('Clase ' + (i + 1) + ': escribe un ID de Bunny válido o un enlace que empiece con http.');
      const q = limpiarPreguntas(l.preguntas || [], i); if (q.error) return falla(q.error);
      const g = limpiarJuego(l.juego, i); if (g.error) return falla(g.error);
      const base = Object.assign({}, l); delete base.videoRef;
      const esBunny = GUID.test(ref);
      const nueva = Object.assign(base, { title: String(l.title).trim(), desc: String(l.desc || '').trim(), duration: String(l.duration || '').trim(), isPreview: !!l.isPreview, sessionNumbers: [i + 1], preguntas: q.preguntas, juego: g.juego });
      if (esBunny) { nueva.bunnyVideoId = ref; nueva.videoProvider = 'bunny'; delete nueva.videoUrl; if (D.bunnyCollectionId) nueva.bunnyCollectionId = D.bunnyCollectionId; }
      else { nueva.videoUrl = ref; nueva.videoProvider = 'url'; delete nueva.bunnyVideoId; }
      if (!nueva.preguntas.length) delete nueva.preguntas;
      if (!nueva.juego) delete nueva.juego;
      lessons.push(nueva);
    }
    // respuestas correctas: van al servidor; en el sitio solo viajan el texto y las opciones
    const clasesConPreguntas = {};
    lessons.forEach((l, i) => { if (l.preguntas && l.preguntas.length) { clasesConPreguntas[i] = l.preguntas; l.preguntas = l.preguntas.map(q => { const p = Object.assign({}, q); delete p.correcta; return p; }); } });
    const hayPreguntas = Object.keys(clasesConPreguntas).length > 0;
    if (D._pregEstado === 'cargando') return falla('Espera a que carguen las respuestas guardadas de las preguntas.');
    if (D._pregEstado === 'error' && hayPreguntas) return falla('No se pudieron cargar las respuestas guardadas de las preguntas (' + (D._pregMsg || 'servidor apagado') + '). Enciende el servidor y vuelve a abrir el curso para no perderlas.');
    const guardarPreg = D._pregEstado === 'listo';
    // los datos de cada juego van al servidor; en el sitio solo queda el tipo (así las palabras y los pares no son públicos)
    const clasesConJuego = {};
    lessons.forEach((l, i) => { if (l.juego && l.juego.tipo) { clasesConJuego[i] = l.juego; l.juego = { tipo: l.juego.tipo }; } });
    if (D._juegoEstado === 'cargando') return falla('Espera a que carguen los juegos guardados de las clases.');
    if (D._juegoEstado === 'error' && (Object.keys(clasesConJuego).length || D._teniaJuego)) return falla('No se pudieron cargar los juegos guardados (' + (D._juegoMsg || 'servidor apagado') + '). Enciende el servidor y vuelve a abrir el curso para no perderlos.');
    const guardarJuegos = D._juegoEstado === 'listo';
    const materiales = [];
    for (let i = 0; i < (D.materiales || []).length; i++) {
      const m = D.materiales[i], t = String(m.titulo || '').trim(), u = String(m.url || '').trim();
      if (!t && !u) continue;
      if (!t || !u) return falla('El material ' + (i + 1) + ' necesita título y enlace.');
      try { new URL(u); } catch (e) { return falla('El enlace del material ' + (i + 1) + ' no es válido.'); }
      const n = Number(m.desbloqueaEnClase) || 0;
      if (n > D.lessons.length) return falla('El material ' + (i + 1) + ' se desbloquea con una clase que ya no existe. Elige otra.');
      materiales.push({ titulo: t, url: u, desbloqueaEnClase: n });
    }
    if (D._matsEstado === 'cargando') return falla('Espera a que carguen los materiales guardados.');
    const guardarMats = D._matsEstado === 'listo';
    // en el sitio (content.json) solo viaja el título y la clase; el enlace va al servidor
    const publicos = guardarMats ? materiales.map(m => ({ titulo: m.titulo, desbloqueaEnClase: m.desbloqueaEnClase })) : null;
    const item = Object.assign({}, D, { materiales: publicos || [], title: String(D.title).trim(), desc: String(D.desc || '').trim(), lessons, type: 'video', activo: activo(D) });
    delete item._nuevo; delete item._matsEstado; delete item._matsMsg; delete item._pregEstado; delete item._pregMsg; delete item._juegoEstado; delete item._juegoMsg; delete item._teniaJuego;
    if (!item.materiales.length) delete item.materiales;
    if (!item.duration) item.duration = textoDuracion(lessons.reduce((t, l) => t + minutos(l.duration), 0));
    const idx = data.courses.findIndex(c => c.id === item.id);
    if (idx >= 0) data.courses[idx] = item; else data.courses.unshift(item);
    saveData(); renderCourses(); renderDashboard(); cerrarEditor();
    toast(idx >= 0 ? 'Curso guardado' : 'Curso creado');
    registrarEnServidor(item).then(() => Promise.all([guardarMats ? guardarMaterialesEnServidor(item.id, materiales) : null, guardarPreg ? guardarRespuestasEnServidor(item.id, clasesConPreguntas) : null, guardarJuegos ? guardarJuegosEnServidor(item.id, clasesConJuego) : null]));
  };
  async function guardarRespuestasEnServidor(id, clases) {
    try { await apiAdmin('/api/admin/preguntas-curso/' + encodeURIComponent(id), { method: 'PUT', body: JSON.stringify({ clases }) }); }
    catch (e) { toast('Curso guardado, pero las respuestas de las preguntas no se guardaron en el servidor: ' + e.message); }
  }
  async function guardarJuegosEnServidor(id, clases) {
    try { await apiAdmin('/api/admin/juegos-curso/' + encodeURIComponent(id), { method: 'PUT', body: JSON.stringify({ clases }) }); }
    catch (e) { toast('Curso guardado, pero los juegos de las clases no se guardaron en el servidor: ' + e.message); }
  }
  async function guardarMaterialesEnServidor(id, lista) {
    try { await apiAdmin('/api/admin/materiales-curso/' + encodeURIComponent(id), { method: 'PUT', body: JSON.stringify({ materiales: lista }) }); }
    catch (e) { toast('Curso guardado, pero los materiales no se guardaron en el servidor: ' + e.message); }
  }

  document.addEventListener('keydown', e => { if (e.key === 'Escape' && D && $('cueOverlay').classList.contains('on')) cerrarEditor(); });
})();
