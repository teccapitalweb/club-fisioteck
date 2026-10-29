/* Club FisioTeck — PDF y material (misma estructura que el panel de Alintec Food): cabecera "Biblioteca profesional" con mascota, tarjetas de resumen,
   saldo de créditos y cupón, y portadas de material en dos bloques independientes:
     1) Material PDF (la biblioteca libre): incluido con la membresía, o se canjea con créditos (cuentas sin membresía);
     2) Materiales de tus cursos: se van desbloqueando conforme terminas las clases (los enlaces los entrega el servidor).
   Filtros por tipo y por área, buscador y estados "Disponible" / "Desbloqueado" / "N créditos" / "Clase N".
   Depende de index.html: siteData, memberIsPaid, certFetch, downloadPdf, ftAbrirMaterial, ftCreditos y de club-diseno*.css, club-cursos.js (ftdHero). */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = id => document.getElementById(id);
  const PALETAS = [['#0A3E68', '#159E92'], ['#0D5FA0', '#4CA6DE'], ['#115E59', '#2DD4BF'], ['#5B21B6', '#A78BFA'], ['#9A3412', '#FB923C'], ['#1E3A8A', '#60A5FA']];
  const LUPA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>';
  let filtro = 'todo', area = 'todas', texto = '';
  const cursosMat = { t: 0, lista: [] };

  const hash = s => String(s).split('').reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const nombreArea = k => (window.ftNombreArea ? ftNombreArea(k) : String(k || 'General'));
  const imagen = u => { if (!u) return ''; return /^(https?:|assets\/|data\/)/.test(u) && !/drive\.google\.com/.test(u) ? u : (typeof driveImageUrl === 'function' ? driveImageUrl(u) : u); };

  // Portadas predeterminadas por área (assets/portadas/<área>.webp): se usan cuando el material no trae miniatura propia, por ejemplo los
  // materiales que el administrador agrega a un curso. Solo se usa la imagen si el archivo existe; si no, queda la portada generada.
  const existe = {}; let repinta = 0;
  window.ftPortadaBase = function (ruta) {
    if (!(ruta in existe)) {
      existe[ruta] = false;
      const im = new Image();
      im.onload = () => { existe[ruta] = true; clearTimeout(repinta); repinta = setTimeout(() => { try { pintar(); } catch (_) { /* sin vista */ } }, 150); };
      im.src = ruta;
    }
    return existe[ruta] ? ruta : '';
  };
  const portadaArea = cat => ftPortadaBase('assets/portadas/' + String(cat || 'general').toLowerCase().replace(/[^a-z0-9-]/g, '') + '.webp') || ftPortadaBase('assets/portadas/general.webp');

  // Portada generada: degradado de la gama de la marca con patrón de líneas, la marca y el título (o la imagen del material si la tiene)
  function portada(titulo, categoria, miniatura, formato) {
    const p = PALETAS[hash(titulo + categoria) % PALETAS.length], img = imagen(miniatura) || portadaArea(categoria);
    return '<div class="ftd-portada" style="--p1:' + p[0] + ';--p2:' + p[1] + '"' + (img ? ' data-img="1"' : '') + '>' + (img ? '<div class="img" style="background-image:url(\'' + esc(img) + '\')"></div>' : '') +
      '<span class="marca">FISIO<b>TECK</b></span><span class="tipo">' + esc(formato || 'PDF') + '</span><div class="txt"><small>' + esc(nombreArea(categoria)) + '</small><strong>' + esc(titulo) + '</strong><em>Guía profesional</em></div></div>';
  }

  async function cargarCursos() {
    if (Date.now() - cursosMat.t < 45000 || typeof auth === 'undefined' || !auth.currentUser) return;
    cursosMat.t = Date.now();
    const cursos = ((typeof siteData !== 'undefined' && siteData.courses) || []).filter(c => (c.materiales || []).length);
    const lista = [];
    await Promise.all(cursos.map(async c => {
      let estados = null;
      try { estados = (await certFetch('/api/cursos/' + encodeURIComponent(c.id) + '/materiales')).materiales; } catch (_) { estados = null; }
      (c.materiales || []).forEach((m, i) => { const e = estados && estados[i]; lista.push({ curso: c, i, titulo: m.titulo, clase: m.desbloqueaEnClase || 0, estado: e ? e.estado : 'sin-datos' }); });
    }));
    cursosMat.lista = lista;
    pintar();
  }

  function items() {
    const D = (window.ftCreditos && ftCreditos.datos) || null, out = [];
    ((typeof siteData !== 'undefined' && siteData.pdfs) || []).forEach(p => {
      const m = D && (D.materiales || []).find(x => x.id === 'pdf-' + p.id);
      const abierto = !!(m && (m.desbloqueado || m.abiertoPorRetos)), pedidos = m ? m.requiereRetos : 0, falta = m ? m.faltanRetos : 0;
      let etiqueta, accion, accion2 = '';
      if (abierto) { etiqueta = m.desbloqueado ? 'Desbloqueado con créditos' : 'Desbloqueado con tus retos'; accion = 'abrir'; }
      else if (!m) { etiqueta = 'Con membresía'; accion = 'paywall'; }
      else if (memberIsPaid) { etiqueta = 'Te faltan ' + falta + ' reto' + (falta === 1 ? '' : 's') + ' · ' + (pedidos - falta) + ' de ' + pedidos; accion = 'retos'; accion2 = 'canjear'; }
      else { etiqueta = m.costo + ' créditos · o ' + pedidos + ' retos con membresía'; accion = 'canjear'; }
      out.push({ grupo: 'pdf', id: p.id, formato: p.formato || '', titulo: p.title, desc: p.desc, cat: p.category || 'general', mini: p.thumbnail, abierto, costo: m ? m.costo : null, etiqueta, accion, accion2 });
    });
    cursosMat.lista.forEach(x => {
      const ab = x.estado === 'abierto';
      out.push({ grupo: 'curso', id: x.curso.id + ':' + x.i, titulo: x.titulo, desc: x.curso.title, cat: x.curso.category || 'general', mini: '', abierto: ab, curso: x.curso, i: x.i,
        etiqueta: ab ? 'Disponible' : x.estado === 'bloqueado-clase' ? 'Se abre al terminar la clase ' + x.clase : x.estado === 'curso-cerrado' ? 'Cuando se abra el curso' : 'Con membresía', accion: ab ? 'abrir-curso' : 'ninguna' });
    });
    return out;
  }

  function tarjeta(it) {
    const acc = it.accion === 'abrir' ? 'Abrir' : it.accion === 'abrir-curso' ? 'Abrir' : it.accion === 'canjear' ? 'Canjear por ' + it.costo + ' créditos' : it.accion === 'retos' ? 'Ir a los retos' : it.accion === 'paywall' ? 'Ver membresía' : 'Bloqueado';
    return '<article class="ftd-mat' + (it.abierto ? '' : ' cerrado') + '" data-g="' + it.grupo + '"><button type="button" class="ftd-mat-top" data-acc="' + it.accion + '" data-id="' + esc(it.id) + '" aria-label="' + esc(acc) + ': ' + esc(it.titulo) + '"' + (it.accion === 'ninguna' ? ' disabled' : '') + '>' + portada(it.titulo, it.cat, it.mini, it.formato) + '</button>' +
      '<div class="ftd-mat-cuerpo"><div class="fila"><span class="tipo">' + esc(it.formato || 'PDF') + '</span><span class="area">' + esc(nombreArea(it.cat)) + (it.grupo === 'curso' ? ' · ' + esc(it.desc) : '') + '</span></div>' +
      '<div class="fila"><span class="tag ' + (it.abierto ? 'ok' : '') + '">' + esc(it.etiqueta) + '</span>' + (it.accion !== 'ninguna' ? '<button type="button" class="ftd-btn suave pequeno" data-acc="' + it.accion + '" data-id="' + esc(it.id) + '">' + esc(acc) + '</button>' : '') + '</div>' + (it.accion2 === 'canjear' ? '<div class="fila"><button type="button" class="ftd-enlace" data-acc="canjear" data-id="' + esc(it.id) + '">o canjéalo por ' + it.costo + ' créditos</button></div>' : '') + '</div></article>';
  }

  function accion(acc, id) {
    if (acc === 'abrir') { const p = ((siteData.pdfs) || []).find(x => String(x.id) === String(id)); downloadPdf(id, p ? p.title : ''); }
    else if (acc === 'abrir-curso') { const [cid, i] = String(id).split(':'); const c = siteData.courses.find(x => String(x.id) === cid); ftAbrirMaterial(c ? c.id : cid, Number(i)); }
    else if (acc === 'canjear') { if (window.ftCreditos) ftCreditos.canjear('pdf-' + id); }
    else if (acc === 'retos') showPage('retos');
    else if (acc === 'paywall') showPaywallOverlay();
  }

  function pintar() {
    const pg = $('page-pdfs'); if (!pg) return;
    pg.classList.add('ftd');
    let cont = $('ftPdfs'); if (!cont) { cont = document.createElement('div'); cont.id = 'ftPdfs'; pg.appendChild(cont); }
    const todos = items(), cred = $('ftCreditos');
    const areas = [...new Set(todos.map(x => x.cat))];
    const q = texto.toLowerCase();
    const vis = todos.filter(x => (filtro === 'todo' || (filtro === 'pdf' && x.grupo === 'pdf') || (filtro === 'cursos' && x.grupo === 'curso') || (filtro === 'creditos' && x.accion === 'canjear')) && (area === 'todas' || x.cat === area) && (!q || (x.titulo + ' ' + x.desc).toLowerCase().includes(q)));
    const verLibros = !!window.ftLibros && (filtro === 'todo' || filtro === 'libros') && !q && area === 'todas';
    const pdfs = vis.filter(x => x.grupo === 'pdf'), cursos = vis.filter(x => x.grupo === 'curso');
    const kpi = (l, v, n, c) => '<div class="ftd-card ftd-cuenta" style="--c:' + c + '"><small>' + l + '</small><b>' + esc(v) + '</b><span>' + n + '</span></div>';
    const D = (window.ftCreditos && ftCreditos.datos) || null;
    cont.innerHTML = window.ftdHero('Biblioteca profesional', 'PDF y <em>material.</em>', 'Guías, protocolos y material de tus cursos, listos para estudiar y descargar.', 'pdfs',
      '<div class="ftd-tabs" role="tablist">' + [['todo', 'Todo'], ['libros', 'Libros'], ['pdf', 'PDF'], ['cursos', 'Mis cursos'], ['creditos', 'Créditos']].map(t => '<button type="button" role="tab" aria-selected="' + (filtro === t[0]) + '" class="' + (filtro === t[0] ? 'on' : '') + '" data-f="' + t[0] + '">' + t[1] + '</button>').join('') + '</div>') +
      '<div id="ftdCredSlot"></div>' +
      (verLibros ? ftLibros.bloque(todos.length) : '') +
      (filtro === 'libros' ? '' : '<div class="ftd-cuatro ftd-kpis">' + kpi('MATERIALES', todos.length, 'EN LA BIBLIOTECA', '#0D5FA0') + kpi('DISPONIBLES', todos.filter(x => x.abierto).length, 'PARA ABRIR YA', 'var(--ftd-teal)') + kpi('DE TUS CURSOS', todos.filter(x => x.grupo === 'curso').length, 'SE DESBLOQUEAN POR CLASE', 'var(--ftd-ambar)') + kpi('CRÉDITOS', D ? D.saldo : '—', 'TU SALDO', 'var(--ftd-violeta)') + '</div>' +
      '<div class="ftd-barra-herr"><div class="ftd-busca" role="search">' + LUPA + '<input id="ftmBusca" type="search" placeholder="Buscar material…" value="' + esc(texto) + '" aria-label="Buscar material"></div><div class="ftd-chips" role="group" aria-label="Filtrar por área"><button type="button" class="' + (area === 'todas' ? 'on' : '') + '" data-area="todas">Todas</button>' + areas.map(a => '<button type="button" class="' + (area === a ? 'on' : '') + '" data-area="' + esc(a) + '">' + esc(nombreArea(a)) + '</button>').join('') + '</div></div>') +
      (pdfs.length ? '<div class="ftd-seccion-cab"><h2>Material PDF</h2><span class="hoy">' + pdfs.length + '</span></div><div class="ftd-mats" aria-live="polite">' + pdfs.map(tarjeta).join('') + '</div>' : '') +
      (cursos.length ? '<div class="ftd-seccion-cab" style="margin-top:34px"><h2>Materiales de tus cursos</h2><span class="hoy">Se desbloquean por clase</span></div><div class="ftd-mats">' + cursos.map(tarjeta).join('') + '</div>' : '') +
      (!pdfs.length && !cursos.length && filtro !== 'libros' ? '<div class="ftd-card" style="padding:40px;text-align:center;color:var(--text-muted)">No encontramos material con ese filtro.</div>' : '');
    const slot = $('ftdCredSlot'); if (slot && cred) slot.appendChild(cred);
    if (verLibros) ftLibros.enlazar(cont);
    cont.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { filtro = b.dataset.f; pintar(); });
    cont.querySelectorAll('[data-area]').forEach(b => b.onclick = () => { area = b.dataset.area; pintar(); });
    cont.querySelectorAll('[data-acc]').forEach(b => b.onclick = () => accion(b.dataset.acc, b.dataset.id));
    const inp = $('ftmBusca'); inp.oninput = () => { texto = inp.value.trim(); const pos = inp.selectionStart; pintar(); const n = $('ftmBusca'); n.focus(); try { n.setSelectionRange(pos, pos); } catch (_) { /* sin cursor */ } };
  }

  const renderOriginal = window.renderPdfs;
  window.renderPdfs = function () { try { if (renderOriginal) renderOriginal.apply(this, arguments); } catch (_) { /* original */ } pintar(); };
  const pg = window.showPage;
  window.showPage = function (page) { const r = pg.apply(this, arguments); if (page === 'pdfs') { pintar(); cargarCursos(); } return r; };
  // cuando el saldo o el catálogo de créditos cambian, se vuelve a dibujar
  const cargar = () => { if (window.ftCreditos && !ftCreditos.__mat) { ftCreditos.__mat = true; const c = ftCreditos.cargar; ftCreditos.cargar = async function () { const r = await c.apply(this, arguments); try { pintar(); } catch (_) { /* sin vista */ } return r; }; } };
  cargar(); setTimeout(cargar, 1500);
  window.ftMaterial = { pintar };
})();
