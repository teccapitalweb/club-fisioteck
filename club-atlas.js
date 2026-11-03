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
    shoulders: m => m.region === 'hombro' && !dentro(m, /pectoral|serrato|dorsal-ancho/),
    chest: m => dentro(m, /pectoral|serrato|intercostal|subclavio/),
    arms: m => m.region === 'brazo',
    core: m => m.region === 'tronco' && dentro(m, /abdomin|oblicu|transvers|diafrag|piso|cuadrado|psoas/),
    back: m => dentro(m, /erector|espinal|multifid|dorsal-ancho|romboid|trapecio|elevador-de-la-escapula|cuadrado-lumbar|longisimo|iliocostal|semiespinoso/),
    hip: m => m.region === 'cadera',
    thigh: m => m.region === 'muslo',
    knee: m => m.region === 'muslo' && dentro(m, /cuadriceps|recto-femoral|vasto|isquio|femoral|semi|popl|sartorio|gracil/),
    leg: m => m.region === 'pierna-pie' && dentro(m, /gastroc|soleo|tibial|peron|plantar|popl|talon/),
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
      (m.nota ? '<p class="at-nota"><b>Nota:</b> ' + esc(m.nota) + '</p>' : '') +
      ((m.fuentes || []).length ? '<details class="at-fuentes"><summary>Fuentes consultadas (' + esc(m.verificacion || 'sin verificar') + ')</summary><ul>' + m.fuentes.map(f => { const mt = /(https?:\/\/\S+)/.exec(f); return '<li>' + esc(String(f).replace(mt ? mt[1] : '', '').replace(/\s*[—-]\s*$/, '').trim()) + (mt ? ' <a href="' + esc(mt[1]) + '" target="_blank" rel="noopener">enlace</a>' : '') + '</li>'; }).join('') + '</ul></details>' : '') + '<p class="at-aviso">Herramienta de estudio y apoyo. Puede haber variaciones anatómicas; confirma con tus textos de referencia y tu criterio clínico.</p></div>';
  }
  function ver(id) {
    const m = datos().find(x => x.id === id), caja = $('atFicha'); if (!m || !caja) return;
    caja.innerHTML = ficha(m); caja.querySelectorAll('[data-m]').forEach(b => b.onclick = () => ver(b.dataset.m)); caja.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  function chips(l) { return '<div class="at-chips">' + l.map(m => '<button type="button" data-m="' + esc(m.id) + '">' + esc(m.nombre) + '</button>').join('') + '</div>'; }

  // ---------- Zonas y buscador ----------
  const originalMostrar = window.showMuscle;
  if (typeof originalMostrar === 'function') {
    window.showMuscle = function (id) {
      const r = originalMostrar.apply(this, arguments);
      if (!memberIsPaid && !window.ftVistaAdmin) return r;
      const info = $('atlasInfo'), l = deZona(id); if (!info || !l.length) return r;
      info.insertAdjacentHTML('beforeend', '<div class="at-esp"><h4>Músculos de esta zona (' + l.length + ')</h4><p class="at-sub">Toca uno para ver su ficha.</p>' + chips(l) + '<div id="atFicha"></div></div>');
      info.querySelectorAll('.at-esp [data-m]').forEach(b => b.onclick = () => ver(b.dataset.m));
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
      if (!hallados.length) return r;
      const hay = cont.querySelector('[onclick]') ? cont.innerHTML : '';
      cont.style.display = 'block';
      cont.innerHTML = '<div class="at-res"><small>Músculos</small>' + hallados.map(m => '<button type="button" data-m="' + esc(m.id) + '"><b>' + esc(m.nombre) + '</b><span>' + esc(REG[m.region] || '') + ' · ' + esc((m.inervacion || '').slice(0, 60)) + '</span></button>').join('') + '</div>' + hay;
      cont.querySelectorAll('.at-res [data-m]').forEach(b => b.onclick = () => abrirDesdeBusqueda(b.dataset.m));
      return r;
    };
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
  window.ftAtlas = { ver };
})();
