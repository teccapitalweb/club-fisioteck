/* Club FisioTeck — Pacientes: seguimiento del dolor (EVA) y de la movilidad (ROM) de los pacientes del fisioterapeuta.
   Privacidad y costo:
   · Solo el dueño de la cuenta lee y escribe sus pacientes (firestore.rules: members/{uid}/pacientes). Se guardan nombre, fecha de nacimiento, peso y estatura, nunca teléfono, correo ni domicilio.
   · Cada paciente es UN documento (con sus mediciones dentro) y hay un documento índice con la lista: abrir la herramienta cuesta 1 lectura y abrir un paciente, otra.
   · Máximo 100 pacientes por cuenta, 300 registros de dolor y 600 de movilidad por paciente.
   Herramienta de apoyo: no sustituye el criterio profesional ni constituye un diagnóstico.
   Depende de index.html: auth, db, memberIsPaid, showPaywallOverlay, showToast, showPage, ROM_DATA (valores de referencia). */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const MAX_PAC = 100, MAX_EVA = 300, MAX_ROM = 600, MAX_ESC = 300, MAX_PLANES = 20;
  const ZONAS = ['Cervical', 'Hombro', 'Codo', 'Muñeca', 'Espalda', 'Cadera', 'Rodilla', 'Tobillo', 'Otro'];
  const TIPOS = ['Punzante', 'Ardor', 'Sordo', 'Eléctrico', 'Otro'];
  const LADOS = ['', 'Derecho', 'Izquierdo'];
  let idx = null, actual = null, forma = '', cargando = false, filtro = '';

  const col = () => db.collection('members').doc(auth.currentUser.uid).collection('pacientes');
  const fecha = (ms, corta) => new Date(ms).toLocaleDateString('es-MX', corta ? { day: 'numeric', month: 'short' } : { day: 'numeric', month: 'short', year: 'numeric' });
  const aviso = t => { try { showToast(t); } catch (_) { /* sin aviso */ } };
  const iniciales = nombre => { const p = String(nombre || '').trim().split(/\s+/).filter(Boolean); return p.length > 1 ? p.map(w => w.charAt(0).toUpperCase() + '.').join('').slice(0, 12) : (p[0] || 'P').slice(0, 3).toUpperCase() + '.'; };
  const rom = () => (typeof ROM_DATA !== 'undefined' ? ROM_DATA : {});
  const AVISO_V = 2; // versión del aviso de privacidad: al cambiar su contenido se vuelve a pedir la aceptación
  // Edad en años a partir de 'AAAA-MM-DD' (o solo 'AAAA' en pacientes anteriores)
  function edad(nac) {
    const m = /^(\d{4})(?:-(\d{2})-(\d{2}))?$/.exec(String(nac || '')); if (!m) return null;
    const hoy = new Date(); let a = hoy.getFullYear() - Number(m[1]);
    if (m[2] && (hoy.getMonth() + 1 < Number(m[2]) || (hoy.getMonth() + 1 === Number(m[2]) && hoy.getDate() < Number(m[3])))) a--;
    return a >= 0 && a < 130 ? a : null;
  }
  const nacDe = p => p.nacimiento || p.nac || p.anio || '';
  // Nombre con la edad: así se distinguen varios pacientes con el mismo nombre
  const etiqueta = p => { const e = edad(nacDe(p)); return p.clave + (e == null ? '' : ' (' + e + ' años)'); };
  const imc = (kg, cm) => (kg > 0 && cm > 0 ? Math.round(kg / Math.pow(cm / 100, 2) * 10) / 10 : null);
  const datosLinea = p => [edad(nacDe(p)) == null ? '' : edad(nacDe(p)) + ' años', p.sexo ? ({ F: 'Mujer', M: 'Hombre', O: 'Otro' }[p.sexo] || '') : '', p.pesoKg ? p.pesoKg + ' kg' : '', p.estaturaCm ? (p.estaturaCm / 100).toFixed(2) + ' m' : '', imc(p.pesoKg, p.estaturaCm) ? 'IMC ' + imc(p.pesoKg, p.estaturaCm) : ''].filter(Boolean).join(' · ');

  // ---------- Tarjeta de confirmación (en lugar de los cuadros del navegador) ----------
  function confirmar(titulo, texto, ok, peligro) {
    return new Promise(resolve => {
      const o = document.createElement('div'); o.className = 'fp-ov'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true');
      o.innerHTML = '<div class="fp-caja"><h3>' + esc(titulo) + '</h3><p>' + esc(texto) + '</p><div class="fp-bot"><button type="button" class="fp-sec" id="fpNo">Cancelar</button><button type="button" class="' + (peligro ? 'fp-peligro' : 'fp-cta') + '" id="fpSi">' + esc(ok) + '</button></div></div>';
      document.body.appendChild(o);
      const fin = v => { o.remove(); resolve(v); };
      o.querySelector('#fpNo').onclick = () => fin(false); o.querySelector('#fpSi').onclick = () => fin(true);
      o.addEventListener('mousedown', e => { if (e.target === o) fin(false); });
    });
  }

  // ---------- Datos ----------
  async function cargarIndice() {
    if (idx) return idx;
    const s = await col().doc('_indice').get();
    idx = s.exists ? Object.assign({ pacientes: [], aviso: 0 }, s.data()) : { pacientes: [], aviso: 0 };
    if (!Array.isArray(idx.pacientes)) idx.pacientes = [];
    return idx;
  }
  const guardarIndice = () => col().doc('_indice').set(idx);
  function actualizarEntrada(p) {
    const e = idx.pacientes.find(x => x.id === p.id), datos = { id: p.id, clave: p.clave, nac: nacDe(p), zona: p.zona || '', ultimaMs: Date.now(), sesiones: sesiones(p) };
    if (e) Object.assign(e, datos); else idx.pacientes.push(datos);
  }
  const sesiones = p => new Set([...(p.eva || []).map(x => new Date(x.f).toDateString()), ...(p.rom || []).map(x => new Date(x.f).toDateString()), ...(p.escalas || []).map(x => new Date(x.f).toDateString())]).size;
  async function guardarPaciente() {
    if (!actual) return;
    actual.eva = (actual.eva || []).slice(-MAX_EVA); actual.rom = (actual.rom || []).slice(-MAX_ROM); actual.escalas = (actual.escalas || []).slice(-MAX_ESC); actual.planes = (actual.planes || []).slice(-MAX_PLANES);
    await col().doc(actual.id).set(actual);
    actualizarEntrada(actual); await guardarIndice();
  }

  // ---------- Pantalla ----------
  function montar() {
    if ($('page-pacientes')) return;
    const ref = $('page-rehab-calc'), nav = document.querySelector('.nav-item[data-page="rehab-calc"]');
    if (!ref || !nav) return;
    ref.insertAdjacentHTML('beforebegin', '<section class="section" id="page-pacientes"><div class="page-header"><h1 class="page-title">Pacientes</h1><p class="page-subtitle">Seguimiento del dolor y la movilidad de tus pacientes, sesión por sesión</p></div><div id="fpRaiz"></div></section>');
    nav.insertAdjacentHTML('beforebegin', '<div class="nav-item" data-page="pacientes" onclick="showPage(\'pacientes\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> Pacientes</div>');
  }

  async function abrir() {
    const raiz = $('fpRaiz'); if (!raiz || !auth.currentUser) return;
    if (!memberIsPaid && !window.ftVistaAdmin) { raiz.innerHTML = '<div class="fp-vacio"><h3>Herramienta para miembros</h3><p>Guarda el dolor y la movilidad de tus pacientes y mira su evolución. Disponible con la membresía.</p><button type="button" class="fp-cta" onclick="showPaywallOverlay()">Ver membresía</button></div>'; return; }
    if (cargando) return; cargando = true;
    try { await cargarIndice(); pintar(); } catch (e) { raiz.innerHTML = '<div class="fp-vacio"><p>No se pudieron cargar tus pacientes. Intenta de nuevo en un momento.</p></div>'; } finally { cargando = false; }
    if (idx.avisoV !== AVISO_V) avisoPrivacidad();
  }

  function avisoPrivacidad() {
    const o = document.createElement('div'); o.className = 'fp-ov'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true');
    o.innerHTML = '<div class="fp-caja"><h3>Antes de empezar: datos de tus pacientes</h3>' +
      '<p>Aquí guardas datos personales y de salud de otras personas: su nombre, fecha de nacimiento, peso, estatura y sus mediciones. Se guardan en tu cuenta y solo tú puedes verlos; nadie del Club, ni el administrador, los lee.</p>' +
      '<ul class="fp-lista"><li>No escribas <b>teléfonos, correos ni domicilios</b>.</li><li>Tú eres responsable de contar con el <b>consentimiento</b> de cada paciente para guardar sus datos.</li><li>Puedes <b>exportar o borrar</b> todo cuando quieras.</li><li>Es una herramienta de apoyo: no sustituye tu criterio profesional ni diagnostica.</li></ul>' +
      '<div class="fp-bot"><button type="button" class="fp-cta" id="fpAcepto">Entiendo y acepto</button></div></div>';
    document.body.appendChild(o);
    o.querySelector('#fpAcepto').onclick = async () => { idx.aviso = Date.now(); idx.avisoV = AVISO_V; o.remove(); try { await guardarIndice(); } catch (_) { /* se vuelve a pedir */ } };
  }

  function pintar() {
    const raiz = $('fpRaiz'); if (!raiz) return;
    const lista = idx.pacientes.slice().sort((a, b) => (b.ultimaMs || 0) - (a.ultimaMs || 0)).filter(p => !filtro || (p.clave + ' ' + p.zona + ' ' + (p.nac || '')).toLowerCase().includes(filtro));
    raiz.innerHTML = '<div class="fp-grid"><aside class="fp-lado"><div class="fp-lado-cab"><span>Mis pacientes</span><small>' + idx.pacientes.length + ' de ' + MAX_PAC + '</small></div>' +
      '<input class="fp-buscar" id="fpBuscar" type="search" placeholder="Buscar paciente" value="' + esc(filtro) + '" aria-label="Buscar paciente">' +
      (lista.length ? lista.map(p => '<button type="button" class="fp-pac' + (actual && actual.id === p.id ? ' on' : '') + '" data-id="' + esc(p.id) + '"><b>' + esc(p.clave) + '</b><span>' + (edad(p.nac) == null ? '' : edad(p.nac) + ' años · ') + esc(p.zona || 'Sin zona') + ' · ' + (p.ultimaMs ? fecha(p.ultimaMs, true) : '') + '</span></button>').join('') : '<p class="fp-nada">' + (idx.pacientes.length ? 'Sin resultados.' : 'Aún no tienes pacientes.') + '</p>') +
      '<button type="button" class="fp-sec fp-ancho" id="fpNuevo">+ Nuevo paciente</button>' +
      '<div class="fp-mini"><button type="button" id="fpImportar">Importar registros de dolor anteriores</button><button type="button" id="fpExportar">Exportar mis datos</button><button type="button" id="fpBorrarTodo" class="fp-rojo">Borrar todos mis pacientes</button></div></aside>' +
      '<section class="fp-ficha" id="fpFicha">' + (actual ? ficha() : '<div class="fp-vacio"><h3>Elige o crea un paciente</h3><p>Aquí verás cómo cambian su dolor y su movilidad de una sesión a otra.</p></div><div class="fp-guia"><b>Cómo empezar</b><ol><li>Toca <b>+ Nuevo paciente</b> y escribe su nombre, fecha de nacimiento, peso y estatura.</li><li>Registra el dolor (EVA) y la movilidad en cada sesión.</li><li>Mira la evolución en gráficas y descarga el resumen en PDF.</li></ol></div>') + '</section></div>';
    ligar();
  }

  // ---------- Ficha ----------
  function claveRom(r) { return r.art + '|' + r.mov + '|' + (r.lado || ''); }
  function ultimosRom(p) { const m = new Map(); (p.rom || []).slice().sort((a, b) => a.f - b.f).forEach(r => { const k = claveRom(r), e = m.get(k) || { primero: r }; e.ultimo = r; m.set(k, e); }); return [...m.values()]; }
  const deficit = r => (r.ref > 0 ? Math.max(0, Math.round((r.ref - r.g) / r.ref * 100)) : 0);

  function grafica(eva) {
    const pts = eva.slice().sort((a, b) => a.f - b.f).slice(-12);
    if (pts.length < 2) return '<p class="fp-nada">' + (pts.length ? 'Con una medición más verás la evolución.' : 'Todavía no hay registros de dolor.') + '</p>';
    const W = 440, H = 150, x0 = 40, x1 = 420, y = v => 130 - v * 11.5, x = i => x0 + 30 + i * ((x1 - x0 - 60) / (pts.length - 1));
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" class="fp-svg" role="img" aria-label="Evolución del dolor EVA"><title>Evolución del dolor</title>' +
      [0, 4, 7, 10].map(v => '<line x1="' + x0 + '" x2="' + x1 + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="var(--border)" stroke-width=".6"/><text x="' + (x0 - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end" font-size="11" fill="var(--text-muted)">' + v + '</text>').join('') +
      '<polyline fill="none" stroke="var(--accent)" stroke-width="2" points="' + pts.map((p, i) => x(i) + ',' + y(p.v)).join(' ') + '"/>' +
      pts.map((p, i) => '<circle cx="' + x(i) + '" cy="' + y(p.v) + '" r="4" fill="var(--accent)"/><text x="' + x(i) + '" y="' + (y(p.v) - 9) + '" text-anchor="middle" font-size="12" fill="var(--text)">' + p.v + '</text><text x="' + x(i) + '" y="146" text-anchor="middle" font-size="10" fill="var(--text-muted)">' + fecha(p.f, true) + '</text>').join('') + '</svg>';
  }

  function ficha() {
    const p = actual, eva = (p.eva || []).slice().sort((a, b) => a.f - b.f), ult = ultimosRom(p);
    const inicial = eva.length ? eva[0].v : null, ultima = eva.length ? eva[eva.length - 1].v : null;
    const defProm = ult.length ? Math.round(ult.reduce((t, e) => t + deficit(e.ultimo), 0) / ult.length) : null;
    return '<div class="fp-cab"><div><h2>' + esc(p.clave) + '</h2><p class="fp-datos">' + (datosLinea(p) ? esc(datosLinea(p)) : 'Sin datos de edad, peso ni estatura') + '</p><p>' + esc(p.zona || 'Sin zona') + ' · ' + sesiones(p) + (sesiones(p) === 1 ? ' sesión' : ' sesiones') + '</p></div>' +
      '<div class="fp-acc"><button type="button" class="fp-sec" id="fpEditar">Editar datos</button><button type="button" class="fp-sec" id="fpPdf">Resumen PDF</button><button type="button" class="fp-sec fp-rojo" id="fpBorrar">Eliminar</button></div></div>' +
      '<div class="fp-metricas"><div><small>Dolor inicial</small><b>' + (inicial == null ? '—' : inicial + '/10') + '</b></div><div><small>Dolor última sesión</small><b>' + (ultima == null ? '—' : ultima + '/10') + '</b></div><div><small>Déficit de movilidad</small><b>' + (defProm == null ? '—' : defProm + ' %') + '</b></div></div>' +
      '<h4>Evolución del dolor (EVA 0 a 10)</h4>' + grafica(eva) +
      '<h4>Movilidad (grados)</h4>' + (ult.length ? '<div class="fp-rom">' + ult.map(e => { const r = e.ultimo, pct = Math.min(100, r.ref ? Math.round(r.g / r.ref * 100) : 0), mejora = e.primero !== r ? (r.g - e.primero.g) : null; return '<div class="fp-m"><div class="fp-m-top"><span>' + esc(r.movN) + (r.lado ? ' · ' + esc(r.lado) : '') + '<small>' + esc(r.artN) + '</small></span><span class="fp-der">' + r.g + ' de ' + r.ref + '°<small>déficit ' + deficit(r) + ' %' + (mejora == null ? '' : ' · ' + (mejora >= 0 ? '+' : '') + mejora + '° desde la primera') + '</small></span></div><div class="fp-barra"><i style="width:' + pct + '%"></i></div></div>'; }).join('') + '</div>' : '<p class="fp-nada">Todavía no hay mediciones de movilidad.</p>') +
      seccionEscalas(p) + seccionPlanes(p) + '<div class="fp-botones"><button type="button" class="fp-cta" data-forma="dolor">Registrar dolor</button><button type="button" class="fp-cta" data-forma="rom">Medir movilidad</button><button type="button" class="fp-cta" data-forma="escala">Aplicar escala</button></div>' +
      '<div id="fpForma">' + formulario() + '</div>' + historial(p) +
      '<p class="fp-aviso">Herramienta de apoyo. No sustituye el criterio profesional ni constituye un diagnóstico.</p>';
  }

  function formulario() {
    if (forma === 'dolor') {
      return '<div class="fp-form"><h4>Registrar dolor</h4><div class="fp-eva"><b id="fpEvaV">0</b><input type="range" id="fpEva" min="0" max="10" step="1" value="0" aria-label="Dolor de 0 a 10"><div class="fp-eje"><span>0 sin dolor</span><span>10 peor dolor</span></div></div>' +
        '<div class="fp-fila"><label>Zona<select id="fpZona">' + ZONAS.map(z => '<option' + (actual.zona === z ? ' selected' : '') + '>' + z + '</option>').join('') + '</select></label><label>Tipo<select id="fpTipo">' + TIPOS.map(t => '<option>' + t + '</option>').join('') + '</select></label></div>' +
        '<label>Observaciones<textarea id="fpNota" maxlength="300" rows="2" placeholder="Opcional"></textarea></label><div class="fp-bot"><button type="button" class="fp-sec" data-forma="">Cancelar</button><button type="button" class="fp-cta" id="fpGuardarEva">Guardar</button></div></div>';
    }
    if (forma === 'rom') {
      const arts = rom();
      return '<div class="fp-form"><h4>Medir movilidad</h4><div class="fp-fila"><label>Articulación<select id="fpArt">' + Object.keys(arts).map(k => '<option value="' + esc(k) + '">' + esc(arts[k].name) + '</option>').join('') + '</select></label><label>Movimiento<select id="fpMov"></select></label></div>' +
        '<div class="fp-fila"><label>Lado<select id="fpLado">' + LADOS.map(l => '<option value="' + l + '">' + (l || 'No aplica') + '</option>').join('') + '</select></label><label>Grados medidos<input type="number" id="fpGrados" min="0" max="360" step="1" inputmode="numeric" placeholder="0"></label></div>' +
        '<p class="fp-ref" id="fpRef"></p><div class="fp-bot"><button type="button" class="fp-sec" data-forma="">Cancelar</button><button type="button" class="fp-cta" id="fpGuardarRom">Guardar</button></div></div>';
    }
    if (forma === 'escala') {
      const lista = window.ftEscalas ? ftEscalas.lista() : [];
      return '<div class="fp-form"><h4>Aplicar escala</h4><label>Escala<select id="fpEsc"><option value="">Elige una escala…</option>' + lista.map(e => '<option value="' + esc(e.id) + '">' + esc(e.nombre) + '</option>').join('') + '</select></label><p class="fp-ref" id="fpEscDesc"></p><div id="fpEscCampos"></div><p class="fp-error" id="fpEscErr" hidden></p><div class="fp-bot"><button type="button" class="fp-sec" data-forma="">Cancelar</button><button type="button" class="fp-cta" id="fpGuardarEsc">Calcular y guardar</button></div></div>';
    }
    return '';
  }

  function historial(p) {
    const e = (p.eva || []).slice().sort((a, b) => b.f - a.f).slice(0, 8), r = (p.rom || []).slice().sort((a, b) => b.f - a.f).slice(0, 8), s = (p.escalas || []).slice().sort((a, b) => b.f - a.f).slice(0, 8);
    if (!e.length && !r.length && !s.length) return '';
    return '<details class="fp-hist"><summary>Historial reciente</summary>' +
      e.map(x => '<div class="fp-h"><span>' + fecha(x.f) + ' · Dolor <b>' + x.v + '/10</b> · ' + esc(x.zona || '') + (x.tipo ? ' · ' + esc(x.tipo) : '') + (x.nota ? '<small>' + esc(x.nota) + '</small>' : '') + '</span><button type="button" data-del="eva" data-f="' + x.f + '" aria-label="Eliminar registro">Eliminar</button></div>').join('') +
      r.map(x => '<div class="fp-h"><span>' + fecha(x.f) + ' · ' + esc(x.movN) + ' ' + esc(x.artN) + (x.lado ? ' ' + esc(x.lado) : '') + ' <b>' + x.g + '°</b> de ' + x.ref + '°</span><button type="button" data-del="rom" data-f="' + x.f + '" aria-label="Eliminar medición">Eliminar</button></div>').join('') +
      s.map(x => '<div class="fp-h"><span>' + fecha(x.f) + ' · ' + esc(x.nombre) + ' <b>' + esc(puntaje(x)) + '</b><small>' + esc(x.txt || '') + '</small></span><button type="button" data-del="escalas" data-f="' + x.f + '" aria-label="Eliminar escala">Eliminar</button></div>').join('') + '</details>';
  }

  // ---------- Planes de rehabilitación guardados desde la Calculadora ----------
  function seccionPlanes(p) {
    const l = (p.planes || []).slice().sort((a, b) => b.f - a.f); if (!l.length) return '';
    return '<h4>Planes de rehabilitación</h4><div class="fp-esc">' + l.map(x => '<div class="fp-h"><span>' + esc(x.nombre) + '<small>' + fecha(x.f) + ' · ' + esc(x.zonaN || '') + ' · ' + (x.ejercicios || []).length + ' ejercicios</small></span><span class="fp-acc"><button type="button" class="fp-sec" data-plan-pdf="' + x.f + '">PDF</button><button type="button" class="fp-sec fp-rojo" data-plan-del="' + x.f + '">Quitar</button></span></div>').join('') + '</div>';
  }
  async function listar() {
    if (!auth.currentUser) throw new Error('Inicia sesión.');
    await cargarIndice(); return { avisoOk: idx.avisoV === AVISO_V, pacientes: idx.pacientes.map(p => ({ id: p.id, clave: p.clave, etiqueta: etiqueta(p) })) };
  }
  async function guardarPlan(id, plan) {
    if (!memberIsPaid && !window.ftVistaAdmin) { showPaywallOverlay(); throw new Error('Herramienta para miembros.'); }
    await cargarIndice(); if (idx.avisoV !== AVISO_V) throw new Error('Abre Pacientes y acepta el aviso de privacidad primero.');
    const s = await col().doc(id).get(); if (!s.exists) throw new Error('Ese paciente ya no existe.');
    const doc = Object.assign({ id, eva: [], rom: [], escalas: [], planes: [] }, s.data());
    doc.planes = (doc.planes || []).concat([plan]).slice(-MAX_PLANES);
    await col().doc(id).set(doc); actualizarEntrada(doc); await guardarIndice(); if (actual && actual.id === id) actual = doc;
  }

  async function guardarMediciones(id, lista) {
    if (!memberIsPaid && !window.ftVistaAdmin) { showPaywallOverlay(); throw new Error('Herramienta para miembros.'); }
    await cargarIndice(); if (idx.avisoV !== AVISO_V) throw new Error('Abre Pacientes y acepta el aviso de privacidad primero.');
    const s = await col().doc(id).get(); if (!s.exists) throw new Error('Ese paciente ya no existe.');
    const doc = Object.assign({ id, eva: [], rom: [], escalas: [], planes: [] }, s.data());
    doc.rom = (doc.rom || []).concat(lista).slice(-MAX_ROM);
    await col().doc(id).set(doc); actualizarEntrada(doc); await guardarIndice(); if (actual && actual.id === id) actual = doc;
  }

  // ---------- Escalas clínicas ----------
  const puntaje = x => x.p + (x.max ? ' de ' + x.max : (x.id === 'tug' ? ' s' : ''));
  function seccionEscalas(p) {
    const grupos = new Map();
    (p.escalas || []).slice().sort((a, b) => a.f - b.f).forEach(x => { const g = grupos.get(x.id) || { primera: x }; g.ultima = x; grupos.set(x.id, g); });
    if (!grupos.size) return '';
    return '<h4>Escalas clínicas</h4><div class="fp-esc">' + [...grupos.values()].map(g => {
      const u = g.ultima, cambio = g.primera !== u ? redondear1(u.p - g.primera.p) : null;
      return '<div class="fp-m"><div class="fp-m-top"><span>' + esc(u.nombre) + '<small>' + esc(u.txt || '') + '</small></span><span class="fp-der">' + esc(puntaje(u)) + '<small>' + fecha(u.f, true) + (cambio == null ? '' : ' · cambio desde la primera: ' + (cambio >= 0 ? '+' : '') + cambio) + '</small></span></div></div>';
    }).join('') + '</div>';
  }
  const redondear1 = n => Math.round(n * 10) / 10;
  async function guardarEscala() {
    if (!memberIsPaid && !window.ftVistaAdmin) { showPaywallOverlay(); return; }
    const sel = $('fpEsc'), err = $('fpEscErr'); if (!sel.value) { err.textContent = 'Elige una escala.'; err.hidden = false; return; }
    const r = ftEscalas.leer(sel.value, $('fpEscCampos'));
    if (!r.ok) { err.textContent = r.error; err.hidden = false; return; }
    const b = $('fpGuardarEsc'); b.disabled = true;
    actual.escalas = (actual.escalas || []).concat([r.entrada]);
    try { await guardarPaciente(); forma = ''; pintar(); aviso(r.entrada.nombre + ': ' + puntaje(r.entrada)); } catch (_) { actual.escalas.pop(); b.disabled = false; aviso('No se pudo guardar. Intenta de nuevo.'); }
  }

  // ---------- Acciones ----------
  function movimientos() {
    const a = $('fpArt'), m = $('fpMov'); if (!a || !m) return;
    const d = rom()[a.value]; m.innerHTML = d ? d.movements.map((x, i) => '<option value="' + i + '">' + esc(x.m) + '</option>').join('') : '';
    refRom();
  }
  function refRom() {
    const a = $('fpArt'), m = $('fpMov'), r = $('fpRef'); if (!a || !m || !r) return;
    const mv = ((rom()[a.value] || {}).movements || [])[Number(m.value)]; r.textContent = mv ? 'Referencia: ' + mv.bar + '° (valor normal ' + mv.n + '). Ajusta según tu criterio clínico.' : '';
  }
  function ligar() {
    const raiz = $('fpRaiz'); if (!raiz) return;
    raiz.querySelectorAll('.fp-pac').forEach(b => b.onclick = async () => {
      try { const s = await col().doc(b.dataset.id).get(); if (!s.exists) { aviso('Ese paciente ya no existe.'); return; } actual = Object.assign({ id: b.dataset.id, eva: [], rom: [] }, s.data()); forma = ''; pintar(); const f = $('fpFicha'); if (f && window.innerWidth < 800) f.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      catch (_) { aviso('No se pudo abrir el paciente.'); }
    });
    const bus = $('fpBuscar'); if (bus) bus.oninput = () => { filtro = bus.value.trim().toLowerCase(); const pos = bus.selectionStart; pintar(); const n = $('fpBuscar'); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (_) { /* tipo search */ } } };
    $('fpNuevo').onclick = nuevoPaciente; $('fpImportar').onclick = importarEva; $('fpExportar').onclick = exportar; $('fpBorrarTodo').onclick = borrarTodo;
    raiz.querySelectorAll('[data-forma]').forEach(ligarBotonForma);
    ligarForma();
    const pdf = $('fpPdf'); if (pdf) pdf.onclick = resumenPdf;
    const ed = $('fpEditar'); if (ed) ed.onclick = () => formularioPaciente(actual);
    const del = $('fpBorrar'); if (del) del.onclick = async () => { if (await confirmar('Eliminar paciente', 'Se borrarán todas las mediciones de ' + actual.clave + '. No se puede deshacer.', 'Eliminar', true)) await eliminarPaciente(actual.id); };
    raiz.querySelectorAll('[data-plan-pdf]').forEach(b => b.onclick = () => { const x = (actual.planes || []).find(q => String(q.f) === b.dataset.planPdf); if (x && window.ftPlan) ftPlan.pdf(x, actual.clave); });
    raiz.querySelectorAll('[data-plan-del]').forEach(b => b.onclick = async () => { if (!await confirmar('Quitar plan', 'Se quitará este plan de la ficha del paciente.', 'Quitar', true)) return; actual.planes = (actual.planes || []).filter(q => String(q.f) !== b.dataset.planDel); try { await guardarPaciente(); pintar(); } catch (_) { aviso('No se pudo quitar el plan.'); } });
    raiz.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => { const tipo = b.dataset.del, f = Number(b.dataset.f); if (!await confirmar('Eliminar registro', 'Se quitará este registro del seguimiento.', 'Eliminar', true)) return; actual[tipo] = (actual[tipo] || []).filter(x => x.f !== f); try { await guardarPaciente(); pintar(); } catch (_) { aviso('No se pudo eliminar.'); } });
  }
  function ligarBotonForma(b) {
    b.onclick = () => {
      if (b.dataset.forma && !memberIsPaid && !window.ftVistaAdmin) { showPaywallOverlay(); return; }
      forma = b.dataset.forma; const f = $('fpForma'); if (!f) return;
      f.innerHTML = formulario(); f.querySelectorAll('[data-forma]').forEach(ligarBotonForma); ligarForma();
      if (forma) f.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
  }
  function ligarForma() {
    const s = $('fpEva'); if (s) { s.oninput = () => { $('fpEvaV').textContent = s.value; }; $('fpGuardarEva').onclick = guardarEva; }
    const a = $('fpArt'); if (a) { a.onchange = movimientos; $('fpMov').onchange = refRom; movimientos(); $('fpGuardarRom').onclick = guardarRom; }
    const es = $('fpEsc');
    if (es) {
      es.onchange = () => { const e = window.ftEscalas && ftEscalas.buscar(es.value); $('fpEscDesc').textContent = e ? e.desc + (e.nota ? ' ' + e.nota : '') + (e.fuente ? ' Fuente: ' + e.fuente : '') : ''; $('fpEscCampos').innerHTML = e ? ftEscalas.formulario(e.id) : ''; const ed = edad(nacDe(actual)), se = $('feSexo'), ee = $('feEdad'); if (ee && ed != null) ee.value = ed; if (se && actual.sexo) se.value = actual.sexo === 'F' ? 'mujer' : actual.sexo === 'M' ? 'hombre' : ''; $('fpEscErr').hidden = true; };
      $('fpGuardarEsc').onclick = guardarEscala;
    }
  }

  function nuevoPaciente() {
    if (!memberIsPaid && !window.ftVistaAdmin) { showPaywallOverlay(); return; }
    if (idx.pacientes.length >= MAX_PAC) { aviso('Llegaste al máximo de ' + MAX_PAC + ' pacientes. Elimina alguno para agregar otro.'); return; }
    formularioPaciente(null);
  }
  // Una sola tarjeta para crear (p = null) o editar los datos de un paciente
  function formularioPaciente(p) {
    const nuevo = !p, hoy = new Date().toISOString().slice(0, 10), nac0 = /^\d{4}-\d{2}-\d{2}$/.test(nacDe(p || {})) ? nacDe(p) : '';
    const o = document.createElement('div'); o.className = 'fp-ov'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true');
    o.innerHTML = '<div class="fp-caja"><h3>' + (nuevo ? 'Nuevo paciente' : 'Datos del paciente') + '</h3>' +
      '<label>Nombre completo<input id="fpClave" maxlength="60" placeholder="Nombre y apellidos" autocomplete="off" value="' + esc(p ? p.clave : '') + '"></label>' +
      '<div class="fp-fila"><label>Fecha de nacimiento<input id="fpNac" type="date" min="1900-01-01" max="' + hoy + '" value="' + esc(nac0) + '"></label>' +
      '<label>Sexo<select id="fpSexo"><option value="">Sin definir</option><option value="F"' + (p && p.sexo === 'F' ? ' selected' : '') + '>Mujer</option><option value="M"' + (p && p.sexo === 'M' ? ' selected' : '') + '>Hombre</option><option value="O"' + (p && p.sexo === 'O' ? ' selected' : '') + '>Otro</option></select></label></div>' +
      '<div class="fp-fila"><label>Peso (kg)<input id="fpPeso" type="number" min="1" max="400" step="0.1" inputmode="decimal" placeholder="72" value="' + esc(p && p.pesoKg ? p.pesoKg : '') + '"></label>' +
      '<label>Estatura (cm)<input id="fpEst" type="number" min="30" max="250" step="1" inputmode="numeric" placeholder="170" value="' + esc(p && p.estaturaCm ? p.estaturaCm : '') + '"></label></div>' +
      '<label>Zona principal (opcional)<select id="fpZ"><option value="">Sin definir</option>' + ZONAS.map(z => '<option' + (p && p.zona === z ? ' selected' : '') + '>' + z + '</option>').join('') + '</select></label>' +
      '<p class="fp-error" id="fpErr" hidden></p><p class="fp-ref">Con la fecha de nacimiento distingues a dos pacientes con el mismo nombre. No escribas teléfonos, correos ni domicilios.</p>' +
      '<div class="fp-bot"><button type="button" class="fp-sec" id="fpC">Cancelar</button><button type="button" class="fp-cta" id="fpOk">' + (nuevo ? 'Crear' : 'Guardar') + '</button></div></div>';
    document.body.appendChild(o); setTimeout(() => $('fpClave').focus(), 60);
    o.querySelector('#fpC').onclick = () => o.remove();
    o.querySelector('#fpOk').onclick = async () => {
      const err = $('fpErr'), falla = m => { err.textContent = m; err.hidden = false; };
      const clave = $('fpClave').value.trim().replace(/\s+/g, ' '), nac = $('fpNac').value, peso = $('fpPeso').value.trim(), est = $('fpEst').value.trim();
      if (!clave) return falla('Escribe el nombre del paciente.');
      if (/@|\d{7,}/.test(clave)) return falla('El nombre parece un correo o un teléfono. Escribe solo el nombre.');
      if (nac && (!/^\d{4}-\d{2}-\d{2}$/.test(nac) || nac > hoy || nac < '1900-01-01')) return falla('La fecha de nacimiento no es válida.');
      if (peso && !(Number(peso) >= 1 && Number(peso) <= 400)) return falla('El peso debe estar entre 1 y 400 kg.');
      if (est && !(Number(est) >= 30 && Number(est) <= 250)) return falla('La estatura debe estar entre 30 y 250 cm.');
      const repetido = idx.pacientes.some(x => (!p || x.id !== p.id) && x.clave.toLowerCase() === clave.toLowerCase() && String(x.nac || '') === String(nac || ''));
      if (repetido) return falla('Ya tienes un paciente con ese nombre' + (nac ? ' y esa fecha de nacimiento' : '. Agrega su fecha de nacimiento para distinguirlos') + '.');
      const datos = { clave, nacimiento: nac || '', anio: nac ? nac.slice(0, 4) : '', sexo: $('fpSexo').value, pesoKg: peso ? Math.round(Number(peso) * 10) / 10 : '', estaturaCm: est ? Math.round(Number(est)) : '', zona: $('fpZ').value, datosF: Date.now() };
      const previo = actual;
      try {
        if (nuevo) actual = Object.assign({ id: 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), creado: Date.now(), eva: [], rom: [] }, datos);
        else Object.assign(actual, datos);
        await guardarPaciente(); o.remove(); forma = ''; pintar(); aviso(nuevo ? 'Paciente creado' : 'Datos guardados');
      } catch (_) { actual = previo; falla('No se pudo guardar. Intenta de nuevo.'); }
    };
  }

  async function guardarEva() {
    if (!memberIsPaid && !window.ftVistaAdmin) { showPaywallOverlay(); return; }
    const b = $('fpGuardarEva'); b.disabled = true;
    actual.eva = (actual.eva || []).concat([{ f: Date.now(), v: Number($('fpEva').value), zona: $('fpZona').value, tipo: $('fpTipo').value, nota: $('fpNota').value.trim().slice(0, 300) }]);
    try { await guardarPaciente(); forma = ''; pintar(); aviso('Dolor registrado'); } catch (_) { actual.eva.pop(); b.disabled = false; aviso('No se pudo guardar. Intenta de nuevo.'); }
  }
  async function guardarRom() {
    if (!memberIsPaid && !window.ftVistaAdmin) { showPaywallOverlay(); return; }
    const a = $('fpArt').value, d = rom()[a], mv = d && d.movements[Number($('fpMov').value)], g = Number($('fpGrados').value);
    if (!mv || !Number.isFinite(g) || $('fpGrados').value === '' || g < 0 || g > 360) { aviso('Escribe los grados medidos (de 0 a 360).'); return; }
    const b = $('fpGuardarRom'); b.disabled = true;
    actual.rom = (actual.rom || []).concat([{ f: Date.now(), art: a, artN: d.name, mov: mv.m, movN: mv.m, g: Math.round(g), ref: mv.bar, lado: $('fpLado').value }]);
    try { await guardarPaciente(); forma = ''; pintar(); aviso('Medición guardada'); } catch (_) { actual.rom.pop(); b.disabled = false; aviso('No se pudo guardar. Intenta de nuevo.'); }
  }
  async function eliminarPaciente(id) {
    try { await col().doc(id).delete(); idx.pacientes = idx.pacientes.filter(p => p.id !== id); await guardarIndice(); actual = null; forma = ''; pintar(); aviso('Paciente eliminado'); } catch (_) { aviso('No se pudo eliminar.'); }
  }
  async function borrarTodo() {
    if (!idx.pacientes.length) { aviso('No tienes pacientes guardados.'); return; }
    if (!await confirmar('Borrar todos mis pacientes', 'Se borrarán ' + idx.pacientes.length + ' pacientes con todas sus mediciones. No se puede deshacer. Si quieres conservar una copia, exporta tus datos antes.', 'Borrar todo', true)) return;
    try { for (const p of idx.pacientes) await col().doc(p.id).delete(); idx.pacientes = []; await guardarIndice(); actual = null; forma = ''; pintar(); aviso('Se borraron todos tus pacientes'); } catch (_) { aviso('No se pudo borrar todo. Intenta de nuevo.'); }
  }
  async function exportar() {
    if (!idx.pacientes.length) { aviso('No tienes pacientes guardados.'); return; }
    try {
      const todos = []; for (const p of idx.pacientes) { const s = await col().doc(p.id).get(); if (s.exists) todos.push(s.data()); }
      const blob = new Blob([JSON.stringify({ exportado: new Date().toISOString(), pacientes: todos }, null, 2)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'pacientes-fisioteck.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    } catch (_) { aviso('No se pudo exportar. Intenta de nuevo.'); }
  }
  async function importarEva() {
    if (!memberIsPaid && !window.ftVistaAdmin) { showPaywallOverlay(); return; }
    if (!await confirmar('Importar registros de dolor anteriores', 'Se copiarán a tu lista de pacientes los registros de dolor que guardaste antes en la antigua herramienta Escala EVA, agrupados por nombre (se guardan solo las iniciales). Los originales no se borran.', 'Importar', false)) return;
    try {
      const sn = await db.collection('members').doc(auth.currentUser.uid).collection('eva_records').orderBy('createdAt', 'asc').limit(300).get();
      if (sn.empty) { aviso('No encontramos registros anteriores.'); return; }
      const grupos = {};
      sn.docs.forEach(d => { const r = d.data(), k = iniciales(r.patient); (grupos[k] = grupos[k] || []).push({ f: r.createdAt && r.createdAt.seconds ? r.createdAt.seconds * 1000 : Date.now(), v: Number(r.value) || 0, zona: r.zone || '', tipo: '', nota: String(r.note || '').slice(0, 300) }); });
      let nuevos = 0, agregados = 0;
      for (const [clave, regs] of Object.entries(grupos)) {
        let e = idx.pacientes.find(p => p.clave.toLowerCase() === clave.toLowerCase()), doc;
        if (e) { const s = await col().doc(e.id).get(); doc = Object.assign({ id: e.id, eva: [], rom: [] }, s.data()); }
        else { if (idx.pacientes.length >= MAX_PAC) continue; doc = { id: 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), clave, anio: '', zona: regs[0].zona ? regs[0].zona.charAt(0).toUpperCase() + regs[0].zona.slice(1) : '', creado: Date.now(), eva: [], rom: [] }; nuevos++; }
        const ya = new Set((doc.eva || []).map(x => x.f)); regs.forEach(r => { if (!ya.has(r.f)) { doc.eva.push(r); agregados++; } });
        doc.eva = doc.eva.slice(-MAX_EVA); await col().doc(doc.id).set(doc); actual = doc; actualizarEntrada(doc);
      }
      await guardarIndice(); actual = null; pintar(); aviso('Se importaron ' + agregados + ' registros en ' + (nuevos ? nuevos + ' paciente' + (nuevos === 1 ? '' : 's') + ' nuevo' + (nuevos === 1 ? '' : 's') : 'tus pacientes'));
    } catch (_) { aviso('No se pudo importar. Intenta de nuevo.'); }
  }

  // ---------- Resumen en PDF (ventana de impresión: se guarda como PDF) ----------
  function resumenPdf() {
    const p = actual, w = window.open('', '_blank'); if (!w) { aviso('Permite las ventanas emergentes para generar el resumen.'); return; }
    const eva = (p.eva || []).slice().sort((a, b) => a.f - b.f), ult = ultimosRom(p);
    w.document.write('<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Resumen ' + esc(p.clave) + '</title><style>body{font:14px Arial,sans-serif;color:#12202B;max-width:760px;margin:24px auto;padding:0 16px}h1{font-size:20px;margin:0}h2{font-size:15px;margin:22px 0 6px;color:#0A3E68}table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #D4DDD9;padding:6px 4px;text-align:left;font-size:13px}.m{color:#5B7186;font-size:12px}.cab{display:flex;align-items:center;gap:14px;border-bottom:3px solid #0A3E68;padding-bottom:10px}img{height:42px}svg{width:100%;height:auto}</style></head><body>' +
      '<div class="cab"><img src="' + location.origin + location.pathname.replace(/[^/]*$/, '') + 'pwa-logo.png" alt=""><div><h1>Resumen de seguimiento</h1><div class="m">Paciente ' + esc(p.clave) + (datosLinea(p) ? ' · ' + esc(datosLinea(p)) : '') + (/^\d{4}-\d{2}-\d{2}$/.test(nacDe(p)) ? ' · nacimiento ' + esc(nacDe(p).split('-').reverse().join('/')) : '') + ' · ' + esc(p.zona || '') + ' · generado el ' + fecha(Date.now()) + '</div></div></div>' +
      '<h2>Evolución del dolor (EVA 0 a 10)</h2>' + grafica(eva).replace(/var\(--accent\)/g, '#0D5FA0').replace(/var\(--border\)/g, '#C9D8E6').replace(/var\(--text-muted\)/g, '#5B7186').replace(/var\(--text\)/g, '#12202B') +
      (eva.length ? '<table><tr><th>Fecha</th><th>Dolor</th><th>Zona</th><th>Tipo</th><th>Observaciones</th></tr>' + eva.map(x => '<tr><td>' + fecha(x.f) + '</td><td>' + x.v + '/10</td><td>' + esc(x.zona || '') + '</td><td>' + esc(x.tipo || '') + '</td><td>' + esc(x.nota || '') + '</td></tr>').join('') + '</table>' : '') +
      '<h2>Movilidad</h2>' + (ult.length ? '<table><tr><th>Movimiento</th><th>Primera medición</th><th>Última medición</th><th>Referencia</th><th>Déficit</th></tr>' + ult.map(e => { const r = e.ultimo; return '<tr><td>' + esc(r.movN) + ' ' + esc(r.artN) + (r.lado ? ' ' + esc(r.lado) : '') + '</td><td>' + e.primero.g + '° (' + fecha(e.primero.f, true) + ')</td><td>' + r.g + '° (' + fecha(r.f, true) + ')</td><td>' + r.ref + '°</td><td>' + deficit(r) + ' %</td></tr>'; }).join('') + '</table>' : '<p class="m">Sin mediciones de movilidad.</p>') +
      ((p.escalas || []).length ? '<h2>Escalas clínicas</h2><table><tr><th>Fecha</th><th>Escala</th><th>Resultado</th><th>Interpretación</th></tr>' + (p.escalas || []).slice().sort((a, b) => a.f - b.f).map(x => '<tr><td>' + fecha(x.f) + '</td><td>' + esc(x.nombre) + '</td><td>' + esc(puntaje(x)) + '</td><td>' + esc(x.txt || '') + '</td></tr>').join('') + '</table>' : '') +
      '<p class="m" style="margin-top:24px">Herramienta de apoyo del Club FisioTeck. No sustituye el criterio profesional ni constituye un diagnóstico. Las referencias de movilidad son valores generales y deben interpretarse con criterio clínico.</p>' +
      '<script>window.onload=function(){setTimeout(function(){window.print()},400)}<\/script></body></html>');
    w.document.close();
  }

  // ---------- Integración ----------
  montar();
  const original = window.showPage;
  window.showPage = function (page) { const r = original.apply(this, arguments); if (page === 'pacientes') abrir(); return r; };
  auth.onAuthStateChanged(u => { if (!u) { idx = null; actual = null; forma = ''; filtro = ''; const r = $('fpRaiz'); if (r) r.innerHTML = ''; } });
  window.ftPacientes = { abrir, listar, guardarPlan, guardarMediciones };
})();
