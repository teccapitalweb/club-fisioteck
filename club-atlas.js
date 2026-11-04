/* Club FisioTeck — Atlas muscular: de los grupos por zona a la ficha de cada músculo.
   Al tocar una zona del cuerpo (esquema, vista frontal o posterior) se muestran, además del resumen de la zona de siempre, los músculos concretos de esa zona;
   cada uno abre su ficha: origen, inserción, acción, inervación, palpación, función, condiciones frecuentes, ejercicios relacionados y fuentes.
   El buscador también encuentra músculos por nombre, acción, nervio o condición. Modo «Practicar inervación» para estudiar.
   Los datos viven en club-atlas-datos.js (FT_ATLAS), verificados con fuentes de anatomía y pensados para revisión de un profesional.
   Depende de index.html: showMuscle, searchAtlas, memberIsPaid; ATLAS_MUSCLES (resumen por zona). */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sinTilde = t => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const datos = () => window.FT_ATLAS || [];
  const REG = { 'cabeza-cuello': 'Cabeza y cuello', hombro: 'Hombro y escápula', brazo: 'Brazo y antebrazo', tronco: 'Tronco y core', cadera: 'Cadera y glúteos', muslo: 'Muslo', 'pierna-pie': 'Pierna y pie' };
  const dentro = (m, re) => re.test(m.id);
  const ZONAS = {
    head: m => m.region === 'cabeza-cuello',
    shoulders: m => m.region === 'hombro' && !dentro(m, /pectoral|serrato|dorsal-ancho|subclavio/),
    chest: m => dentro(m, /pectoral|serrato|intercostal|subclavio|subcostal|transverso-torax|elevadores-costillas/),
    arms: m => m.region === 'brazo',
    core: m => (m.region === 'tronco' && dentro(m, /abdomin|abdomen|oblicu|transverso-abdomen|diafrag|piso|cuadrado|psoas|perine|cremaster|isquiocavernoso|bulboesponjoso|esfinter|suelo-pelvico/)) || m.id === 'psoas-menor',
    back: m => dentro(m, /erector|espinal|multifid|dorsal-ancho|romboid|trapecio|elevador-de-la-escapula|cuadrado-lumbar|longisimo|iliocostal|semiespinoso|rotadores|interespinosos|intertransversos|serrato-posterior|espinoso/),
    hip: m => m.region === 'cadera',
    thigh: m => m.region === 'muslo',
    knee: m => m.region === 'muslo' && dentro(m, /cuadriceps|recto-femoral|vasto|isquio|femoral|semi|popl|sartorio|gracil|articular-rodilla/),
    leg: m => m.region === 'pierna-pie' && dentro(m, /gastroc|soleo|tibial|peron|plantar|popl|talon|flexor-largo-dedos|extensor-largo-dedos|extensor-corto/),
    foot: m => m.region === 'pierna-pie'
  };
  const deZona = z => { const f = ZONAS[z]; let l = f ? datos().filter(f) : []; if (!l.length && f) l = datos().filter(m => m.region === ({ head: 'cabeza-cuello', shoulders: 'hombro', arms: 'brazo', core: 'tronco', back: 'tronco', chest: 'tronco', hip: 'cadera', thigh: 'muslo', knee: 'muslo', leg: 'pierna-pie', foot: 'pierna-pie' }[z])); return l; };
  const mezclar = a => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };

  // ---------- Ficha de un músculo ----------
  function ficha(m) {
    const fila = (t, v) => v ? '<dt>' + t + '</dt><dd>' + esc(v) + '</dd>' : '';
    const lista = (t, l) => (l || []).length ? '<h5>' + t + '</h5><ul>' + l.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' : '';
    const rel = datos().filter(x => x.region === m.region && x.id !== m.id).slice(0, 5);
    return '<div class="at-ficha"><div class="at-cab"><h4>' + esc(m.nombre) + '</h4><span>' + esc(REG[m.region] || '') + '</span></div><dl>' + fila('Origen', m.origen) + fila('Inserción', m.insercion) + fila('Acción', m.accion) + fila('Inervación', m.inervacion) + fila('Palpación', m.palpacion) + fila('Función', m.funcion) + '</dl>' +
      lista('Condiciones frecuentes', m.condiciones) + lista('Ejercicios relacionados', m.ejercicios) +
      (rel.length ? '<h5>Otros músculos de la región</h5><div class="at-chips">' + rel.map(x => '<button type="button" data-m="' + esc(x.id) + '">' + esc(x.nombre) + '</button>').join('') + '</div>' : '') +
      ((m.fuentes || []).length ? '<details class="at-fuentes"><summary>Fuentes consultadas (' + esc(m.verificacion || 'sin verificar') + ')</summary><ul>' + m.fuentes.map(f => { const mt = /(https?:\/\/\S+)/.exec(f); return '<li>' + esc(String(f).replace(mt ? mt[1] : '', '').replace(/\s*[—-]\s*$/, '').trim()) + (mt ? ' <a href="' + esc(mt[1]) + '" target="_blank" rel="noopener">enlace</a>' : '') + '</li>'; }).join('') + '</ul></details>' : '') + '<p class="at-aviso">Herramienta de estudio y apoyo. Puede haber variaciones anatómicas; confirma con tus textos de referencia y tu criterio clínico.</p></div>';
  }
  function ver(id, sinScroll) {
    const m = datos().find(x => x.id === id), caja = $('atFicha'); if (!m || !caja) return;
    caja.innerHTML = ficha(m); caja.querySelectorAll('[data-m]').forEach(b => b.onclick = () => ver(b.dataset.m)); if (!sinScroll) caja.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  function chips(l) { return '<div class="at-chips">' + l.map(m => '<button type="button" data-m="' + esc(m.id) + '">' + esc(m.nombre) + '</button>').join('') + '</div>'; }

  // ---------- Estructuras: huesos, arterias, venas, nervios, articulaciones y ligamentos (club-atlas-estructuras.js, FT_ATLAS_ESTR) ----------
  const estr = () => window.FT_ATLAS_ESTR || [];
  const TIPO = { hueso: 'Hueso', arteria: 'Arteria', vena: 'Vena', nervio: 'Nervio', articulacion: 'Articulación', ligamento: 'Ligamento o tendón' };
  const TIPO_PL = { hueso: 'Huesos', arteria: 'Arterias', vena: 'Venas', nervio: 'Nervios', articulacion: 'Articulaciones', ligamento: 'Ligamentos y tendones' };
  const TIT = { hueso: ['Puntos de referencia', 'Articulaciones y relaciones'], arteria: ['Recorrido y pulso', 'Ramas y relaciones'], vena: ['Recorrido', 'Afluentes y relaciones'], nervio: ['Recorrido y exploración', 'Qué controla y relaciones'], articulacion: ['Puntos de referencia', 'Qué la forma y la estabiliza'], ligamento: ['Puntos de referencia', 'Relaciones'] };
  const CAPA = { bone: 'hueso', artery: 'arteria', vein: 'vena' };
  function fichaEstr(e) {
    const t = TIT[e.tipo] || ['Referencias', 'Relaciones'];
    const lista = (ti, l) => (l || []).length ? '<h5>' + ti + '</h5><ul>' + l.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' : '';
    const fuentes = (e.fuentes || []).length ? '<details class="at-fuentes"><summary>Fuentes consultadas (' + esc(e.verificacion || 'sin verificar') + ')</summary><ul>' + e.fuentes.map(f => { const mt = /(https?:\/\/\S+)/.exec(f); return '<li>' + esc(String(f).replace(mt ? mt[1] : '', '').replace(/\s*[—-]\s*$/, '').trim()) + (mt ? ' <a href="' + esc(mt[1]) + '" target="_blank" rel="noopener noreferrer">enlace</a>' : '') + '</li>'; }).join('') + '</ul></details>' : '';
    return '<div class="at-ficha"><div class="at-cab"><h4>' + esc(e.nombre) + '</h4><span>' + esc(TIPO[e.tipo] || '') + '</span></div>' + (e.descripcion ? '<p class="at-desc">' + esc(e.descripcion) + '</p>' : '') +
      lista(t[0], e.referencias) + lista(t[1], e.relaciones) + lista('Lesiones frecuentes', e.lesiones) + lista('Para el fisioterapeuta', e.fisio) + fuentes + '<p class="at-aviso">Herramienta de estudio y apoyo. Puede haber variaciones anatómicas; confirma con tus textos de referencia y tu criterio clínico.</p></div>';
  }
  function verEstr(id, sinScroll) {
    const e = estr().find(x => x.id === id), caja = $('atFicha'); if (!e || !caja) return;
    caja.innerHTML = fichaEstr(e); if (!sinScroll) caja.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  // Ficha de la estructura que muestra el visor 3D (por su nombre y su capa: hueso, arteria o vena)
  function porEstructura(nombre, capa) {
    const tipo = CAPA[capa]; if (!tipo) return null;
    const b = sinTilde(String(nombre || '').split(' · ')[0]).replace(/ (derecho|derecha|izquierdo|izquierda)$/, '').trim();
    return estr().find(e => e.tipo === tipo && (e.nombres || []).some(n => sinTilde(n) === b)) || null;
  }
  function chipsEstr(z) {
    const l = estr().filter(e => e.zona === z); if (!l.length) return '';
    const tipos = Object.keys(TIPO_PL).filter(t => l.some(e => e.tipo === t));
    return '<div class="at-esp-estr"><h4>Otras estructuras de esta zona (' + l.length + ')</h4>' + tipos.map(t => '<div class="at-tipo"><small>' + TIPO_PL[t] + '</small><div class="at-chips">' + l.filter(e => e.tipo === t).map(e => '<button type="button" data-e="' + esc(e.id) + '">' + esc(e.nombre) + '</button>').join('') + '</div></div>').join('') + '</div>';
  }

  // ---------- Guía clínica de la zona (club-atlas-guia.js) ----------
  function guia(z) {
    const g = (window.FT_ATLAS_GUIA || {})[z]; if (!g) return '';
    const punto = x => '<li>' + esc(x.t) + ((x.f || []).length ? ' <sup class="at-ref">[' + x.f.join(', ') + ']</sup>' : '') + '</li>';
    const sec = (k, t, abierta) => (g[k] || []).length ? '<details class="at-g' + (k === 'alerta' ? ' alerta' : '') + '"' + (abierta ? ' open' : '') + '><summary>' + t + '</summary><ul>' + g[k].map(punto).join('') + '</ul></details>' : '';
    const url = u => /^https:\/\//.test(u) ? u : '#';
    const fuentes = (g.fuentes || []).length ? '<details class="at-g at-fuentes-g"><summary>Fuentes consultadas (' + g.fuentes.length + ')</summary><ol class="at-fuentes-l">' + g.fuentes.map(f => '<li value="' + f.n + '"><a href="' + esc(url(f.url)) + '" target="_blank" rel="noopener noreferrer">' + esc(f.titulo || f.url) + '</a> <span>' + esc(f.org) + '</span></li>').join('') + '</ol></details>' : '';
    return '<div class="at-guia"><h4>Guía clínica de la zona</h4>' + sec('empezar', 'Cómo empezar a trabajar esta zona', true) + sec('tocar', 'Cómo tocar y explorar correctamente') + sec('fractura', 'Si hay una fractura') + sec('tratamientos', 'Posibles tratamientos') + sec('alerta', 'Señales de alerta: cuándo derivar') + fuentes + '<p class="at-nota">' + esc(window.FT_ATLAS_GUIA_AVISO || '') + '</p></div>';
  }
  // Busca la ficha de un músculo a partir del nombre que muestra el visor 3D (por ejemplo «Deltoides · clavicular · derecho»)
  function porNombre(n) {
    const b = sinTilde(String(n || '').split(' · ')[0]).replace(/\b(derecho|izquierdo)\b/g, '').trim(); if (b.length < 4) return null;
    const l = datos(), base = m => sinTilde(m.nombre).split(' (')[0];
    return l.find(m => base(m) === b) || l.find(m => sinTilde(m.nombre).includes(b)) || l.find(m => base(m).length >= 6 && (' ' + b + ' ').includes(' ' + base(m) + ' ')) || null;
  }

  // ---------- Zonas y buscador ----------
  const originalMostrar = window.showMuscle;
  if (typeof originalMostrar === 'function') {
    window.showMuscle = function (id) {
      const r = originalMostrar.apply(this, arguments);
      if (!memberIsPaid && !window.ftVistaAdmin) return r;
      const info = $('atlasInfo'), l = deZona(id); if (!info || (!l.length && !chipsEstr(id))) return r;
      info.insertAdjacentHTML('beforeend', guia(id) + '<div class="at-esp"><h4>Músculos de esta zona (' + l.length + ')</h4><p class="at-sub">Toca uno para ver su ficha.</p>' + (l.length ? chips(l) : '') + chipsEstr(id) + '<div id="atFicha"></div></div>');
      info.querySelectorAll('.at-esp [data-m]').forEach(b => b.onclick = () => ver(b.dataset.m));
      info.querySelectorAll('.at-esp [data-e]').forEach(b => b.onclick = () => verEstr(b.dataset.e));
      return r;
    };
  }
  const originalBuscar = window.searchAtlas;
  if (typeof originalBuscar === 'function') {
    window.searchAtlas = function () {
      const r = originalBuscar.apply(this, arguments);
      const q = sinTilde(($('atlasSearch') || {}).value || '').trim(), cont = $('atlasSearchResults');
      if (!cont || q.length < 2 || !datos().length) return r;
      const hallados = datos().filter(m => sinTilde([m.nombre, m.accion, m.inervacion, m.origen, m.insercion, (m.condiciones || []).join(' ')].join(' ')).includes(q)).slice(0, 12);
      const hEstr = estr().filter(e => sinTilde([e.nombre, e.descripcion, (e.lesiones || []).join(' ')].join(' ')).includes(q)).slice(0, 12);
      if (!hallados.length && !hEstr.length) return r;
      const hay = cont.querySelector('[onclick]') ? cont.innerHTML : '';
      cont.style.display = 'block';
      cont.innerHTML = '<div class="at-res">' + (hallados.length ? '<small>Músculos</small>' : '') + hallados.map(m => '<button type="button" data-m="' + esc(m.id) + '"><b>' + esc(m.nombre) + '</b><span>' + esc(REG[m.region] || '') + ' · ' + esc((m.inervacion || '').slice(0, 60)) + '</span></button>').join('') + (hEstr.length ? '<small>Estructuras</small>' + hEstr.map(e => '<button type="button" data-e="' + esc(e.id) + '"><b>' + esc(e.nombre) + '</b><span>' + esc(TIPO[e.tipo] || '') + '</span></button>').join('') : '') + '</div>' + hay;
      cont.querySelectorAll('.at-res [data-m]').forEach(b => b.onclick = () => abrirDesdeBusqueda(b.dataset.m));
      cont.querySelectorAll('.at-res [data-e]').forEach(b => b.onclick = () => abrirEstrDesdeBusqueda(b.dataset.e));
      return r;
    };
  }
  function abrirEstrDesdeBusqueda(id) {
    const e = estr().find(x => x.id === id); if (!e) return;
    const info = $('atlasInfo'); if (!info) return;
    $('atlasSearch').value = ''; $('atlasSearchResults').style.display = 'none';
    info.innerHTML = '<div class="at-esp"><h4>' + esc(TIPO_PL[e.tipo] || '') + '</h4><div id="atFicha"></div></div>'; verEstr(id);
  }
  function abrirDesdeBusqueda(id) {
    const m = datos().find(x => x.id === id); if (!m) return;
    const info = $('atlasInfo'); if (!info) return;
    $('atlasSearch').value = ''; $('atlasSearchResults').style.display = 'none';
    info.innerHTML = '<div class="at-esp"><h4>' + esc(REG[m.region] || '') + '</h4><div id="atFicha"></div></div>'; ver(id);
  }

  // ---------- Práctica de inervación ----------
  let pr = null;
  function iniciar() { const l = datos().filter(m => m.inervacion); if (l.length < 6) { pr = null; return; } pr = { preguntas: mezclar(l).slice(0, 10).map(m => { const otras = mezclar([...new Set(l.filter(x => x.inervacion !== m.inervacion).map(x => x.inervacion))]).slice(0, 3); return { m, opc: mezclar([m.inervacion, ...otras]) }; }), i: 0, ok: 0, resp: false }; }
  function pintarPractica() {
    const info = $('atlasInfo'); if (!info) return;
    if (!pr) { info.innerHTML = '<div class="at-sub">No hay suficientes datos para practicar.</div>'; return; }
    if (pr.i >= pr.preguntas.length) { info.innerHTML = '<div class="at-quiz"><small>Práctica terminada</small><h4>' + pr.ok + ' de ' + pr.preguntas.length + ' correctas</h4><button type="button" class="at-cta" id="atOtra">Practicar otra vez</button></div>'; $('atOtra').onclick = () => { iniciar(); pintarPractica(); }; return; }
    const q = pr.preguntas[pr.i];
    info.innerHTML = '<div class="at-quiz"><small>Pregunta ' + (pr.i + 1) + ' de ' + pr.preguntas.length + '</small><h4>¿Cuál es la inervación de «' + esc(q.m.nombre) + '»?</h4>' + q.opc.map((o, k) => '<button type="button" class="at-op" data-k="' + k + '">' + esc(o) + '</button>').join('') + '<div id="atRes"></div></div>';
    info.querySelectorAll('.at-op').forEach(b => b.onclick = () => {
      if (pr.resp) return; pr.resp = true; const ok = q.opc[Number(b.dataset.k)] === q.m.inervacion; if (ok) pr.ok++;
      info.querySelectorAll('.at-op').forEach(x => { if (q.opc[Number(x.dataset.k)] === q.m.inervacion) x.classList.add('bien'); else if (x === b) x.classList.add('mal'); x.disabled = true; });
      $('atRes').innerHTML = '<p class="' + (ok ? 'at-ok' : 'at-err') + '">' + (ok ? 'Correcto.' : 'Era: ' + esc(q.m.inervacion)) + '</p><button type="button" class="at-cta" id="atSig">' + (pr.i + 1 < pr.preguntas.length ? 'Siguiente' : 'Ver resultado') + '</button>';
      $('atSig').onclick = () => { pr.resp = false; pr.i++; pintarPractica(); };
    });
  }
  function montar() {
    const pg = $('page-atlas'); if (!pg || $('atPracticar')) return;
    const barra = pg.querySelector('.search-bar'); if (!barra) return;
    barra.insertAdjacentHTML('afterend', '<div class="at-barra"><button type="button" class="at-sec" id="atPracticar">Practicar inervación</button></div>');
    $('atPracticar').onclick = () => { if (!memberIsPaid && !window.ftVistaAdmin) { showPaywallOverlay(); return; } iniciar(); pintarPractica(); const g = $('atlasGrid'); if (g) g.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  }
  montar();
  window.ftAtlas = { ver, porNombre, verEstr, porEstructura };
})();
