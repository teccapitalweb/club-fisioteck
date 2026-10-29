/* Club FisioTeck — "Zona de retos" (misma estructura que Alintec Food): cabecera con nivel y XP del servidor, banner de Modo historia,
   Reto del día, misiones (Quiz, Ordena el proceso, Flashcards, Caso clínico) y Clasificación del club (GET /api/retos/clasificacion).
   Jugar sigue usando las funciones de club-retos.js (ftRetoQuiz, ftRetoOrden, ftRetoCartas, ftRetoDia), que califica el servidor.
   Depende de: club-retos.js, club-retos-datos.js (FT_RETOS), club-logros.js (ftLogros), club-avatar.js (ftAvatarUrl), club-cursos.js (ftdHero). */
(function () {
  'use strict';
  const D = window.FT_RETOS;
  if (!D) return;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = id => document.getElementById(id);
  const hoy = () => new Date().toISOString().split('T')[0];
  let clas = null, clasError = false;

  const ICONOS = {
    quiz: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01"/></svg>',
    orden: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h12M8 12h12M8 18h12M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></svg>',
    cartas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 6V4h14v14h-2"/></svg>',
    caso: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M21 21l-5.2-5.2"/></svg>',
    historia: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M9 8h6"/></svg>',
    sol: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5"/></svg>'
  };

  const datos = () => {
    const A = window.achievementData || {}, hechos = (A.retos && A.retos.hechos) || {};
    const xp = A.xp || (typeof getTotalXP === 'function' ? getTotalXP() : 0);
    const niveles = typeof LEVELS !== 'undefined' ? LEVELS : [];
    const nivel = (typeof getLevel === 'function' && getLevel(xp)) || { name: 'Estudiante', min: 0 };
    const sig = niveles[niveles.indexOf(nivel) + 1];
    return { xp, hechos, nivel, sig, pct: sig ? Math.min(100, Math.round((xp - nivel.min) / (sig.min - nivel.min) * 100)) : 100, A };
  };

  const IMG = { quiz: 'assets/retos/q-valoracion.webp', detective: 'assets/retos/detective/d-sala.webp', orden: 'assets/retos/o-sesion.webp', cartas: 'assets/retos/flashcards.webp' };
  const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
  const FLECHA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  let abierta = '';
  function misiones(h) {
    const q = D.quiz, o = D.orden, det = window.FT_DETECTIVE || [], n = l => l.filter(r => h[r.id]).length;
    return [
      { id: 'quiz', titulo: 'Quiz por tema', desc: 'Preguntas de opción múltiple sobre cada área. Elige el tema que quieras.', tiempo: 'Un minuto por reto', hechos: n(q), total: q.length,
        items: q.map(r => ({ id: r.id, t: r.titulo, n: r.preguntas.length + ' preguntas', ok: !!h[r.id], a: "ftRetoQuiz('" + r.id + "')" })) },
      { id: 'detective', titulo: 'Detective de consulta', desc: 'Observa la fotografía y toca directamente los errores que encuentres.', tiempo: 'Tres minutos por escena', hechos: n(det), total: det.length,
        items: det.map(r => ({ id: r.id, t: r.titulo, n: r.errores + ' errores por encontrar', ok: !!h[r.id], a: "ftDetective.abrir('" + r.id + "')", img: 'assets/retos/detective/' + r.id + '.webp' })) },
      { id: 'orden', titulo: 'Ordena el procedimiento', desc: 'Coloca cada paso en el orden correcto y refuerza los protocolos clínicos.', tiempo: 'Dos minutos por reto', hechos: n(o), total: o.length,
        items: o.map(r => ({ id: r.id, t: r.titulo, n: r.pasos.length + ' pasos', ok: !!h[r.id], a: "ftRetoOrden('" + r.id + "')" })) },
      { id: 'cartas', titulo: 'Flashcards', desc: 'Repasa conceptos clave con diez tarjetas al azar. Da +15 XP una vez al día.', tiempo: 'Tres minutos', accion: 'ftRetoCartas()' }
    ];
  }
  function panel(m, puede) {
    if (!m) return '';
    const cab = '<div class="rz-pan-cab"><div><small>' + esc(m.titulo) + '</small><h3>' + (m.id === 'detective' ? 'Elige una escena' : m.id === 'cartas' ? 'Repaso rápido' : 'Tu camino') + '</h3><p>' + (m.items ? 'Elige el reto que quieras, en el orden que prefieras. Cada uno da XP la primera vez que lo superas y puedes repasar los que ya resolviste, sin XP.' : 'Voltea, repasa y marca lo que ya sabes.') + '</p></div><button type="button" class="rz-cerrar" aria-label="Cerrar" onclick="ftRetosZona.abrir(\'\')">&times;</button></div>';
    if (!m.items) return '<section class="rz-pan" id="rzPanel">' + cab + '<button type="button" class="ftd-btn" onclick="' + m.accion + '">Empezar flashcards</button></section>';
    const pct = m.total ? Math.round(m.hechos / m.total * 100) : 0, rec = m.items.find(x => !x.ok);
    const barra = '<div class="rz-pan-barra" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100"><i style="width:' + pct + '%"></i></div>';
    if (m.id === 'detective') return '<section class="rz-pan" id="rzPanel">' + cab + barra + '<div class="rz-escenas">' + m.items.map(x =>
      '<button type="button" class="rz-escena' + (x.ok ? ' ok' : '') + '" onclick="' + x.a + '"><span class="foto" style="background-image:url(\'' + x.img + '\')"></span><span class="txt"><strong>' + esc(x.t) + '</strong><small>' + esc(x.n) + '</small></span><b>' + (x.ok ? 'Resuelto' : x === rec ? 'Recomendado' : 'Por resolver') + '</b></button>').join('') + '</div></section>';
    return '<section class="rz-pan" id="rzPanel">' + cab + barra + '<ol class="rz-camino">' + m.items.map((x, k) =>
      '<li><span class="nodo' + (x.ok ? ' ok' : x === rec ? ' act' : '') + '">' + (x.ok ? CHECK : k + 1) + '</span><button type="button" class="paso' + (x === rec ? ' rec' : '') + '" onclick="' + x.a + '"><span><strong>' + esc(x.t) + '</strong><small>' + esc(x.n) + '</small></span><b class="' + (x.ok ? 'ok' : x === rec ? 'rec' : '') + '">' + (x.ok ? 'Resuelto' : x === rec ? 'Recomendado' : 'Por resolver') + '</b></button></li>').join('') + '</ol></section>';
  }
  function abrirMision(id) {
    abierta = abierta === id ? '' : id;
    pintar();
    if (abierta) { const p = $('rzPanel'); if (p && p.scrollIntoView) p.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }

  function podio(f) {
    const orden = [f[1], f[0], f[2]].filter(Boolean);
    return '<div class="rz-podio">' + orden.map(r => {
      const av = r.avatar && window.ftAvatarUrl ? ftAvatarUrl(r.avatar) : '';
      return '<div class="rz-pod p' + r.posicion + (r.esTu ? ' tu' : '') + '"><div class="rz-pod-av">' + (av ? '<img src="' + esc(av) + '" alt="">' : '<span>' + esc(r.nombre.charAt(0)) + '</span>') + '<b>' + r.posicion + '</b></div>' +
        '<strong>' + esc(r.nombre) + (r.esTu ? ' <em>Tú</em>' : '') + '</strong><span>' + r.xp + ' XP</span></div>';
    }).join('') + '</div>';
  }
  function fila(r) {
    const av = r.avatar && window.ftAvatarUrl ? ftAvatarUrl(r.avatar) : '';
    return '<li class="rz-fila' + (r.esTu ? ' tu' : '') + '"><span class="pos">' + r.posicion + '</span><span class="av">' + (av ? '<img src="' + esc(av) + '" alt="">' : esc(r.nombre.charAt(0))) + '</span>' +
      '<span class="nom">' + esc(r.nombre) + (r.esTu ? ' <em>Tú</em>' : '') + '<small>' + r.retos + ' reto' + (r.retos === 1 ? '' : 's') + '</small></span><b>' + r.xp + ' XP</b></li>';
  }
  function bloqueClasificacion() {
    let cuerpo;
    if (clasError) cuerpo = '<p class="rz-vacio">No pudimos cargar la clasificación. Intenta de nuevo en un momento.</p>';
    else if (!clas) cuerpo = '<p class="rz-vacio">Cargando clasificación…</p>';
    else if (!clas.filas.length) cuerpo = '<p class="rz-vacio">Aún no hay posiciones. Supera un reto y abre la clasificación.</p>';
    else cuerpo = podio(clas.filas) + '<ol class="rz-lista">' + clas.filas.slice(3).map(fila).join('') + '</ol>' +
      (clas.tuPosicion && clas.tuPosicion > 20 ? '<p class="rz-vacio">Tu posición actual: ' + clas.tuPosicion + ' de ' + clas.total + '.</p>' : '');
    return '<section class="rz-clas"><div class="rz-clas-cab"><h3>Clasificación del club</h3>' + (clas && clas.total ? '<span>' + clas.total + ' participante' + (clas.total === 1 ? '' : 's') + '</span>' : '') + '</div>' + cuerpo +
      '<p class="rz-nota">Solo se muestra tu nombre y la inicial de tu apellido, tu avatar y tu XP.</p></section>';
  }

  // Modo historia: tarjeta grande de entrada (como Alintec Food y Zoorigen) para que se entienda qué es
  const CALENDARIO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>';
  function bloqueHistoria(h) {
    const mundos = window.FT_HISTORIA || [], hechos = mundos.filter(m => h[m.id]).length, completa = mundos.length && hechos === mundos.length;
    const boton = completa ? 'Repasar la historia' : hechos ? 'Continuar la historia' : 'Comenzar historia';
    const CAND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
    const OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
    const vista = mundos.slice(0, 3).map((m, i) => {
      const hecho = !!h[m.id], abierto = i === 0 || !!h[mundos[i - 1].id];
      return '<div class="rz-hist-mundo m' + i + (hecho ? ' hecho' : '') + '"><b>' + (i + 1) + '</b><span><strong>' + esc(m.titulo || ('Mundo ' + (i + 1))) + '</strong><em>' + (hecho ? 'Superado' : abierto ? '4 casos clínicos' : 'Se abre al superar el anterior') + '</em></span><i>' + (hecho ? OK : abierto ? '' : CAND) + '</i></div>';
    }).join('');
    return '<section class="rz-hist"><div class="rz-hist-tx"><small><i></i>Nueva experiencia · Modo historia</small><h2>Aprende a <em>atender</em> al paciente.</h2>' +
      '<p>Avanza por mundos, toma decisiones clínicas con cada paciente y domina cada técnica desde lo básico.</p>' +
      '<div class="rz-hist-pie"><button type="button" onclick="ftHistoria.mapa()">' + boton + ' ' + FLECHA + '</button><span>' + hechos + ' de ' + mundos.length + ' misiones superadas</span></div></div>' +
      '<div class="rz-hist-vis" aria-hidden="true"><div class="rz-hist-mundos">' + vista + '</div><div class="rz-hist-fisi">' + (window.ftMascota ? ftMascota.html('retos', { pose: 'senala', burbuja: false, ancho: 132 }) : '') + '</div></div></section>';
  }
  function filaDia(yaDia) {
    return '<button type="button" class="rz-dia' + (yaDia ? ' hecho' : '') + '" onclick="ftRetoDia()"><span class="ico">' + CALENDARIO + '</span><span class="tx"><strong>Reto del día</strong><em>' + (yaDia ? 'Ya lo completaste hoy. Vuelve mañana por uno nuevo.' : 'Una pregunta nueva cada día · +25 XP') + '</em></span><i>' + FLECHA + '</i></button>';
  }

  function pintar() {
    const pg = $('page-retos'), cont = $('retosContenido'); if (!pg || !cont) return;
    pg.classList.add('ftd', 'rz');
    const d = datos(), h = d.hechos, total = D.quiz.length + D.orden.length + (window.FT_DETECTIVE || []).length + (window.FT_HISTORIA || []).length, hechosN = Object.keys(h).length;
    const yaDia = d.A.retos && d.A.retos.dia && d.A.retos.dia.fecha === hoy() && d.A.retos.dia.hecho;
    const mis = misiones(h), siguiente = D.quiz.find(r => !h[r.id]) || D.orden.find(r => !h[r.id]);
    const puede = typeof memberIsPaid !== 'undefined' && (memberIsPaid || (window.ftPrueba && ftPrueba.estado === 'elegida'));
    cont.innerHTML =
      window.ftdHero('Zona de retos', 'Pon a prueba lo <em>que sabes.</em>', 'Gana XP, sube de nivel y escala en la clasificación del club.', 'retos',
        '<div class="rz-nivel"><div class="rz-nivel-cab"><strong>' + esc(d.nivel.name) + '</strong><span>' + d.xp + ' XP' + (d.sig ? ' · faltan ' + (d.sig.min - d.xp) + ' para ' + esc(d.sig.name) : ' · nivel máximo') + '</span></div>' +
        '<div class="rz-barra" role="progressbar" aria-valuenow="' + d.pct + '" aria-valuemin="0" aria-valuemax="100"><i style="width:' + d.pct + '%"></i></div></div>') +
      (puede ? '' : '<div class="rt-aviso">Los retos son para miembros y para quien ya eligió su curso de prueba. <button type="button" onclick="showPaywallOverlay()">Ver membresía</button></div>') +
      bloqueHistoria(h) + filaDia(yaDia) +
      (window.ftAcceso && ftAcceso.bannerRetos ? ftAcceso.bannerRetos() : '') +
      '<h3 class="rz-h">Elige tu reto</h3><div class="rz-mis">' + mis.map((m, k) =>
        '<button type="button" class="rz-mision' + (abierta === m.id ? ' abierta' : '') + '" onclick="ftRetosZona.abrir(\'' + m.id + '\')" aria-expanded="' + (abierta === m.id) + '"><span class="foto" style="background-image:url(\'' + IMG[m.id] + '\')"><b>Misión 0' + (k + 1) + '</b></span>' +
        '<span class="cuerpo"><strong>' + esc(m.titulo) + '</strong><span class="desc">' + esc(m.desc) + '</span><span class="pie ' + (['', 'azul', 'verde', 'ambar'][k] || '') + '">' + (puede ? (m.items ? m.hechos + ' de ' + m.total + ' superados' : m.tiempo) : 'Solo miembros · ' + esc(m.tiempo)) + '<i>' + FLECHA + '</i></span></span></button>').join('') + '</div>' +
      panel(mis.find(m => m.id === abierta), puede) +
      '<div id="rzClas">' + bloqueClasificacion() + '</div>';
    cargarClasificacion();
  }

  async function cargarClasificacion() {
    if (!window.ftLogros) return;
    try { clas = await ftLogros.pedir('/api/retos/clasificacion'); clasError = false; } catch (_) { clasError = !clas; }
    const c = $('rzClas'); if (c) c.innerHTML = bloqueClasificacion();
  }

  window.ftRetosInicio = pintar;
  const pg = window.showPage;
  window.showPage = function (page) {
    const r = pg.apply(this, arguments);
    if (page === 'retos') pintar();
    return r;
  };
  window.ftRetosZona = { pintar, abrir: abrirMision };
})();
