/* Club FisioTeck — sección Retos (quiz, ordena el proceso, flashcards, reto del día).
   El XP lo calcula y guarda el servidor (club-logros.js; reto superado: /api/retos/completar; reto del día: /api/retos/dia; flashcards: /api/retos/cartas).
   Depende de index.html: achievementData, saveAchievements, checkAchievements, updateXpWidget,
   getTotalXP, getLevel, getPlayerStats, LEVELS, BADGES, showPage, showToast, memberIsPaid,
   showPaywallOverlay, ftPrueba (club-prueba.js) y de FT_RETOS (club-retos-datos.js). */
(function () {
  'use strict';
  const D = window.FT_RETOS;
  if (!D) return;

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const hoy = () => new Date().toISOString().split('T')[0];
  const mezclar = a => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
  const $ = id => document.getElementById(id);

  // ---------- Estado y XP ----------
  function R() {
    if (!achievementData.retos) achievementData.retos = { xp: 0, hechos: {}, dia: {} };
    return achievementData.retos;
  }
  function puedeJugar() {
    return !!memberIsPaid;
  }
  // El XP ya viene sumado desde el servidor; aquí solo se refresca lo que se ve
  function sumar(xp) { if (xp > 0 && window.ftLogros) ftLogros.actualizar('/api/logros'); }
  // El XP de retos cuenta en el total de Logros y las insignias nuevas se evalúan con checkAchievements()
  const xpOriginal = window.getTotalXP;
  window.getTotalXP = function () { return xpOriginal.apply(this, arguments) + ((achievementData.retos && achievementData.retos.xp) || 0); };
  const statsOriginal = window.getPlayerStats;
  window.getPlayerStats = function () {
    const s = statsOriginal.apply(this, arguments);
    const h = (achievementData.retos && achievementData.retos.hechos) || {};
    s.retosHechos = Object.keys(h).length;
    s.retosPerfectos = Object.keys(h).filter(k => h[k].mejor === h[k].total && h[k].total > 0).length;
    return s;
  };
  const ic = '<svg class="ic" style="width:22px;height:22px;"><use href="#f-trophy"/></svg>';
  [
    { id: 'reto_1', name: 'Primer Reto', desc: 'Supera tu primer reto', xp: 50, check: s => s.retosHechos >= 1 },
    { id: 'reto_5', name: 'Retador', desc: 'Supera 5 retos distintos', xp: 150, check: s => s.retosHechos >= 5 },
    { id: 'reto_perfecto', name: 'Sin Errores', desc: 'Responde un quiz completo sin fallar', xp: 200, check: s => s.retosPerfectos >= 1 }
  ].forEach(b => { if (!BADGES.some(x => x.id === b.id)) BADGES.push(Object.assign({ icon: ic, cat: 'especial' }, b)); });

  // ---------- Página y menú ----------
  function montar() {
    if ($('page-retos')) return;
    const logros = document.getElementById('page-achievements');
    const nav = document.querySelector('.nav-item[data-page="achievements"]');
    if (!logros || !nav) return;
    logros.insertAdjacentHTML('beforebegin',
      '<section class="section" id="page-retos"><div class="page-header"><h1 class="page-title">Retos</h1>' +
      '<p class="page-subtitle">Pon a prueba lo que sabes, gana XP y sube de nivel</p></div><div id="retosContenido"></div></section>');
    nav.insertAdjacentHTML('beforebegin',
      '<div class="nav-item" data-page="retos" onclick="showPage(\'retos\')">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg> Retos ' +
      '<span class="rt-nuevo">Nuevo</span></div>');
  }
  const showPageOriginal = window.showPage;
  window.showPage = function (page) {
    const r = showPageOriginal.apply(this, arguments);
    if (page === 'retos') inicio();
    return r;
  };

  // Imagen opcional por reto: assets/retos/<id>.webp. Si el archivo no existe, la tarjeta queda sin imagen.
  const imagen = id => '<span class="rt-img"><img src="assets/retos/' + id + '.webp" alt="" loading="lazy" onerror="this.parentNode.remove()"></span>';

  // ---------- Pantalla principal ----------
  function inicio() {
    const xp = getTotalXP(), nivel = getLevel(xp), sig = LEVELS[LEVELS.indexOf(nivel) + 1];
    const pct = sig ? Math.min(100, Math.round(((xp - nivel.min) / (sig.min - nivel.min)) * 100)) : 100;
    const hechos = R().hechos, nHechos = Object.keys(hechos).length;
    const total = D.quiz.length + D.orden.length;
    const q = retoDelDia();
    const yaDia = R().dia && R().dia.fecha === hoy() && R().dia.hecho;

    const tarjeta = (tipo, r, etiqueta, accion) => {
      const h = hechos[r.id];
      return '<button type="button" class="rt-card" onclick="' + accion + '">' + imagen(r.id) +
        '<span class="rt-card-tipo">' + etiqueta + '</span><strong>' + esc(r.titulo) + '</strong><span class="rt-card-desc">' + esc(r.desc) + '</span>' +
        '<span class="rt-card-estado' + (h ? ' is-ok' : '') + '">' + (h ? '✓ Superado' + (h.total ? ' · mejor ' + h.mejor + '/' + h.total : '') : 'Sin jugar') + '</span></button>';
    };

    $('retosContenido').innerHTML =
      '<div class="rt-hero"><div><div class="rt-hero-nivel">' + esc(nivel.name) + '</div>' +
      '<div class="rt-hero-xp">' + xp + ' XP' + (sig ? ' · faltan ' + (sig.min - xp) + ' para ' + esc(sig.name) : ' · nivel máximo') + '</div></div>' +
      '<div class="rt-hero-cifra"><strong>' + nHechos + '/' + total + '</strong><span>retos superados</span></div>' +
      '<div class="rt-barra"><div style="width:' + pct + '%"></div></div></div>' +
      (puedeJugar() ? '' : '<div class="rt-aviso">Los retos son solo para miembros. <button type="button" onclick="showPaywallOverlay()">Ver membresía</button></div>') +
      '<button type="button" class="rt-dia" onclick="ftRetoDia()">' + imagen('dia') + '<span class="rt-card-tipo">Reto del día</span>' +
      '<strong>' + (yaDia ? 'Ya lo completaste hoy' : '5 preguntas · 6 XP, 10 si es perfecto') + '</strong>' +
      '<span class="rt-card-desc">' + (yaDia ? 'Vuelve mañana por uno nuevo.' : esc(q.cat)) + '</span></button>' +
      (window.ftAcceso ? ftAcceso.bannerRetos() : '') +
      '<h3 class="rt-h">Quiz por tema</h3><div class="rt-grid">' +
      D.quiz.map(r => tarjeta('quiz', r, 'Quiz · ' + r.preguntas.length + ' preguntas', "ftRetoQuiz('" + r.id + "')")).join('') + '</div>' +
      '<h3 class="rt-h">Ordena el proceso</h3><div class="rt-grid">' +
      D.orden.map(r => tarjeta('orden', r, 'Orden · ' + r.pasos.length + ' pasos', "ftRetoOrden('" + r.id + "')")).join('') + '</div>' +
      '<h3 class="rt-h">Repaso rápido</h3><div class="rt-grid">' +
      '<button type="button" class="rt-card" onclick="ftRetoCartas()">' + imagen('flashcards') + '<span class="rt-card-tipo">Flashcards · 10 tarjetas</span><strong>Conceptos clave</strong>' +
      '<span class="rt-card-desc">Voltea, repasa y marca lo que ya sabes.</span><span class="rt-card-estado">+15 XP una vez al día</span></button></div>';
  }
  window.ftRetosInicio = inicio;

  function jugar(html) {
    $('retosContenido').innerHTML = '<button type="button" class="rt-volver" onclick="ftRetosInicio()">← Volver a Retos</button>' + html;
    window.scrollTo(0, 0);
  }
  function guardia() {
    if (puedeJugar()) return true;
    showPaywallOverlay(); return false;
  }

  // ---------- Quiz ----------
  let quiz = null;
  window.ftRetoQuiz = function (id) {
    if (!guardia()) return;
    const r = D.quiz.find(x => x.id === id);
    quiz = { r, orden: mezclar(r.preguntas), i: 0, ok: 0, respondida: false };
    pregunta();
  };
  function pregunta() {
    const p = quiz.orden[quiz.i];
    jugar('<div class="rt-panel"><div class="rt-progreso">' + esc(quiz.r.titulo) + ' · pregunta ' + (quiz.i + 1) + ' de ' + quiz.orden.length + '</div>' +
      '<h2 class="rt-pregunta">' + esc(p.q) + '</h2><div class="rt-opciones">' +
      p.o.map((o, k) => '<button type="button" class="rt-op" data-k="' + k + '" onclick="ftRetoResponder(' + k + ')">' + esc(o) + '</button>').join('') +
      '</div><div id="rtFeed"></div></div>');
  }
  window.ftRetoResponder = function (k) {
    if (quiz.respondida) return;
    quiz.respondida = true; quiz.ultimaK = k;
    if (quiz.dia) quiz.listaK.push(k);
    const p = quiz.orden[quiz.i];
    const bien = k === p.c;
    if (bien) quiz.ok++;
    if (!quiz.resp) quiz.resp = {};
    quiz.resp[quiz.r.preguntas ? quiz.r.preguntas.indexOf(p) : 0] = k; // para que el servidor califique
    document.querySelectorAll('.rt-op').forEach(b => {
      const n = Number(b.dataset.k); b.disabled = true;
      if (n === p.c) b.classList.add('is-ok'); else if (n === k) b.classList.add('is-mal');
    });
    const ultima = quiz.i === quiz.orden.length - 1;
    $('rtFeed').innerHTML = '<p class="rt-explica ' + (bien ? 'is-ok' : 'is-mal') + '"><strong>' + (bien ? '¡Correcto!' : 'No exactamente.') + '</strong> ' + esc(p.e) + '</p>' +
      '<button type="button" class="rt-btn" onclick="' + (ultima ? 'ftRetoFin()' : 'ftRetoSiguiente()') + '">' + (ultima ? 'Ver resultado' : 'Siguiente') + '</button>';
  };
  window.ftRetoSiguiente = function () { quiz.i++; quiz.respondida = false; pregunta(); };
  window.ftRetoFin = async function () {
    if (quiz.dia) return finDia();
    const n = quiz.orden.length, h = R().hechos, previo = h[quiz.r.id];
    const supera = quiz.ok / n >= 0.6;
    // el servidor califica de nuevo con sus propias respuestas correctas y dice cuánto XP se ganó
    const srv = supera && window.ftAcceso ? await ftAcceso.completarReto({ retoId: quiz.r.id, tipo: 'quiz', respuestas: quiz.resp || {} }) : null;
    let ganado = 0, nota = '';
    if (srv && srv.nuevo) {
      ganado = srv.xp || 0; sumar(ganado);
    } else if (previo || (srv && srv.supera)) {
      nota = 'Ya ganaste el XP de este reto. Repetirlo es solo práctica.';
    } else if (supera && !srv) {
      nota = 'No se pudo guardar tu resultado (sin conexión con el servidor). Vuelve a intentarlo.';
    } else {
      nota = 'Necesitas al menos 60 % para superarlo. ¡Inténtalo de nuevo!';
    }
    jugar('<div class="rt-panel rt-fin"><div class="rt-fin-num">' + quiz.ok + '/' + n + '</div>' +
      '<h2>' + (supera ? '¡Reto superado!' : 'Casi lo logras') + '</h2>' +
      (ganado ? '<p class="rt-xp">+' + ganado + ' XP</p>' : '') + (nota ? '<p class="rt-nota">' + nota + '</p>' : '') +
      '<div class="rt-acciones"><button type="button" class="rt-btn" onclick="ftRetoQuiz(\'' + quiz.r.id + '\')">Jugar otra vez</button>' +
      '<button type="button" class="rt-btn is-ghost" onclick="ftRetosInicio()">Más retos</button></div></div>');
    if (ganado) showToast('+' + ganado + ' XP por superar el reto');
  };

  // ---------- Reto del día (como Alintec y Zoorigen: 5 preguntas, un intento al día, se supera con 60 %) ----------
  function retoDelDia() {
    // Solo para la tarjeta de la portada: la primera categoría de hoy (las preguntas reales las elige el servidor)
    const todas = [];
    D.quiz.forEach(t => t.preguntas.forEach(p => todas.push(Object.assign({ cat: t.titulo }, p))));
    const dia = Math.floor(new Date(hoy() + 'T00:00:00Z').getTime() / 86400000);
    return todas[(dia * 5) % todas.length];
  }
  window.ftRetoDia = async function () {
    if (!guardia()) return;
    if (R().dia && R().dia.fecha === hoy() && R().dia.hecho) { showToast('Ya hiciste el reto de hoy. ¡Vuelve mañana!'); return; }
    // las preguntas del día las elige el servidor
    let lista = [];
    try {
      const s = await ftLogros.pedir('/api/retos/dia');
      if (s.hecho) { R().dia = { fecha: s.fecha, hecho: true }; showToast('Ya hiciste el reto de hoy. ¡Vuelve mañana!'); return; }
      (s.preguntas || []).forEach(x => {
        const t = D.quiz.find(y => y.id === x.retoId);
        if (t && t.preguntas[x.indice]) lista.push(Object.assign({ cat: t.titulo }, t.preguntas[x.indice]));
      });
      if (lista.length !== (s.preguntas || []).length) lista = [];
    } catch (e) { showToast(e.message || 'No se pudo cargar el reto del día.'); return; }
    if (!lista.length) { showToast('No se pudo cargar el reto del día.'); return; }
    quiz = { r: { id: 'dia', titulo: 'Reto del día' }, orden: lista, i: 0, ok: 0, respondida: false, dia: true, listaK: [] };
    pregunta();
  };
  async function finDia() {
    let r = null, error = '';
    try {
      r = await ftLogros.pedir('/api/retos/dia', { respuestas: quiz.listaK });
      if (r.hecho) R().dia = { fecha: hoy(), hecho: true };
      if (r.estado) { ftLogros.aplicar(r.estado); ftLogros.repintar(); }
    } catch (e) { error = e.message || 'No se pudo guardar tu respuesta.'; }
    const supera = !!(r && r.supera), ganado = (r && r.xp) || 0;
    jugar('<div class="rt-panel rt-fin">' + (r ? '<div class="rt-fin-num">' + r.ok + '/' + r.total + '</div>' : '') +
      '<h2>' + (supera ? '¡Reto del día cumplido!' : r ? 'Hoy no fue' : 'Algo salió mal') + '</h2>' +
      (ganado ? '<p class="rt-xp">+' + ganado + ' XP</p>' : '<p class="rt-nota">' + esc(error || (r && r.repetido ? 'Ya habías hecho el reto de hoy.' : supera ? 'Ya habías ganado el XP de hoy.' : 'El intento de hoy ya quedó. ¡Mañana hay uno nuevo!')) + '</p>') +
      '<div class="rt-acciones"><button type="button" class="rt-btn" onclick="ftRetosInicio()">Más retos</button></div></div>');
  }

  // ---------- Ordena el proceso ----------
  let ord = null;
  window.ftRetoOrden = function (id) {
    if (!guardia()) return;
    const r = D.orden.find(x => x.id === id);
    ord = { r, pool: mezclar(r.pasos.map((t, i) => ({ t, i }))), puesto: [], intentos: 0 };
    pintarOrden();
  };
  function pintarOrden(msg) {
    jugar('<div class="rt-panel"><div class="rt-progreso">' + esc(ord.r.titulo) + '</div>' +
      '<h2 class="rt-pregunta">Toca los pasos en el orden correcto</h2>' +
      '<ol class="rt-secuencia">' + ord.puesto.map(p => '<li>' + esc(p.t) + '</li>').join('') + '</ol>' +
      '<div class="rt-opciones">' + ord.pool.map(p => '<button type="button" class="rt-op" onclick="ftRetoPaso(' + p.i + ')">' + esc(p.t) + '</button>').join('') + '</div>' +
      (msg ? '<p class="rt-explica is-mal">' + msg + '</p>' : '') +
      '<button type="button" class="rt-btn is-ghost" onclick="ftRetoOrden(\'' + ord.r.id + '\')">Reiniciar</button></div>');
  }
  window.ftRetoPaso = function (i) {
    const esperado = ord.puesto.length;
    if (i !== esperado) { ord.intentos++; pintarOrden('Ese paso no va ahora. Piensa qué se hace primero.'); return; }
    const k = ord.pool.findIndex(p => p.i === i);
    ord.puesto.push(ord.pool.splice(k, 1)[0]);
    if (ord.pool.length) { pintarOrden(); return; }
    ftOrdenFin();
  };
  async function ftOrdenFin() {
    const srv = window.ftAcceso ? await ftAcceso.completarReto({ retoId: ord.r.id, tipo: 'orden', orden: ord.puesto.map(p => p.i) }) : null;
    let ganado = 0;
    if (srv && srv.nuevo) { ganado = srv.xp || 0; sumar(ganado); }
    jugar('<div class="rt-panel rt-fin"><h2>¡Proceso ordenado!</h2><ol class="rt-secuencia">' + ord.puesto.map(p => '<li>' + esc(p.t) + '</li>').join('') + '</ol>' +
      (ganado ? '<p class="rt-xp">+' + ganado + ' XP</p>' : '<p class="rt-nota">Ya ganaste el XP de este reto.</p>') +
      '<div class="rt-acciones"><button type="button" class="rt-btn is-ghost" onclick="ftRetosInicio()">Más retos</button></div></div>');
    if (ganado) showToast('+' + ganado + ' XP por ordenar el proceso');
  }

  // ---------- Flashcards ----------
  let fc = null;
  window.ftRetoCartas = function () {
    if (!guardia()) return;
    fc = { mazo: mezclar(D.flashcards).slice(0, 10), i: 0, sabidas: 0, vuelta: false };
    pintarCarta();
  };
  function pintarCarta() {
    const c = fc.mazo[fc.i];
    jugar('<div class="rt-panel"><div class="rt-progreso">Tarjeta ' + (fc.i + 1) + ' de ' + fc.mazo.length + '</div>' +
      '<button type="button" class="rt-carta' + (fc.vuelta ? ' is-vuelta' : '') + '" onclick="ftRetoVoltear()">' +
      (fc.vuelta ? '<span>' + esc(c[1]) + '</span>' : '<strong>' + esc(c[0]) + '</strong><small>Toca para ver la definición</small>') + '</button>' +
      (fc.vuelta ? '<div class="rt-acciones"><button type="button" class="rt-btn is-ghost" onclick="ftRetoCarta(false)">Repasar</button>' +
        '<button type="button" class="rt-btn" onclick="ftRetoCarta(true)">Lo sabía</button></div>' : '') + '</div>');
  }
  window.ftRetoVoltear = function () { fc.vuelta = !fc.vuelta; pintarCarta(); };
  window.ftRetoCarta = function (sabia) {
    if (sabia) fc.sabidas++;
    fc.i++; fc.vuelta = false;
    if (fc.i < fc.mazo.length) { pintarCarta(); return; }
    terminarCartas();
  };
  async function terminarCartas() {
    let ganado = 0;
    try {
      const r = await ftLogros.pedir('/api/retos/cartas', {});
      ganado = r.xp || 0;
      if (r.estado) { ftLogros.aplicar(r.estado); ftLogros.repintar(); }
    } catch (e) { /* sin servidor: no se gana XP */ }
    jugar('<div class="rt-panel rt-fin"><div class="rt-fin-num">' + fc.sabidas + '/' + fc.mazo.length + '</div><h2>Repaso terminado</h2>' +
      (ganado ? '<p class="rt-xp">+15 XP</p>' : '<p class="rt-nota">Hoy ya ganaste el XP de las flashcards.</p>') +
      '<div class="rt-acciones"><button type="button" class="rt-btn" onclick="ftRetoCartas()">Otro mazo</button>' +
      '<button type="button" class="rt-btn is-ghost" onclick="ftRetosInicio()">Más retos</button></div></div>');
  }

  montar();
})();
