/* Club FisioTeck — Detective: una fotografía con errores y tú señalas dónde están (como el Detective de Alintec Food).
   Las fotos van en assets/retos/detective/<id>.webp (ver PROMPTS-IMAGENES-RETOS.md). Las posiciones correctas NO están aquí: viven en el servidor
   (data/retos-claves.json, "detective") y el servidor califica las marcas con POST /api/retos/completar { tipo: 'detective', marcas: [{x,y}] } (x, y en % de la imagen).
   Para ajustar los círculos de una foto nueva: abre el caso con #calibrar en la dirección y toca cada error; la lista de % que aparece es la que se pasa al servidor.
   Depende de: club-retos.js (ftRetosInicio), club-acceso.js (ftAcceso.completarReto), club-logros.js (ftLogros). */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = id => document.getElementById(id);
  const MAX_MARCAS = 12;
  const CASOS = [
    { id: 'd-sala', titulo: 'Sala de rehabilitación', desc: 'Hay 4 riesgos de seguridad en esta sala. Encuéntralos.', errores: 4 },
    { id: 'd-higiene', titulo: 'Higiene en la camilla', desc: 'Detecta 4 fallas de higiene en el área de tratamiento.', errores: 4 },
    { id: 'd-traslado', titulo: 'Traslado del paciente', desc: 'Encuentra 4 errores al pasar al paciente de la silla a la camilla.', errores: 4 },
    { id: 'd-bandas', titulo: 'Ejercicio con bandas', desc: 'Hay 4 errores en la preparación y la técnica del ejercicio.', errores: 4 },
    {"id": "d-gimnasio", "titulo": "Gimnasio terapéutico", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-tens", "titulo": "Colocación de TENS", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-compresa", "titulo": "Compresa en el hombro", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-alberca", "titulo": "Hidroterapia en alberca", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-pediatria", "titulo": "Sala de pediatría", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-geriatria", "titulo": "Consulta de geriatría", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-muletas", "titulo": "Marcha con muletas", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-ergonomia", "titulo": "Ergonomía en oficina", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-plomada", "titulo": "Evaluación postural", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-balon", "titulo": "Ejercicio con balón", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-traccion", "titulo": "Camilla de tracción", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-vendaje", "titulo": "Vendaje de rodilla", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-recepcion", "titulo": "Sala de espera", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-estiramientos", "titulo": "Estiramientos en el suelo", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-vestidores", "titulo": "Vestidores y bioseguridad", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-escaleras", "titulo": "Ejercicio en escaleras", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-equilibrio", "titulo": "Equilibrio inestable", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-terapiamanual", "titulo": "Consulta de terapia manual", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-respiratorio", "titulo": "Ejercicio respiratorio", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4},
    {"id": "d-bicicleta", "titulo": "Bicicleta y caminadora", "desc": "Encuentra 4 errores visibles de preparación, técnica o seguridad.", "errores": 4}
  ];
  window.FT_DETECTIVE = CASOS;
  let juego = null;

  const imagen = id => 'assets/retos/detective/' + id + '.webp';

  function pintar(final) {
    const c = juego.caso, marcas = juego.marcas;
    const pines = marcas.map((m, i) => {
      const est = final ? (final.aciertos.includes(i) ? 'ok' : 'mal') : '';
      return '<span class="dt-pin ' + est + '" style="left:' + m.x + '%;top:' + m.y + '%">' + (final ? '' : (i + 1)) + '</span>';
    }).join('') + (final ? final.faltan.map(e => '<span class="dt-pin falto" style="left:' + e.x + '%;top:' + e.y + '%;width:' + (e.r * 2) + '%"></span>').join('') : '');
    const cal = location.hash.indexOf('calibrar') >= 0;
    const panel = $('retosContenido');
    panel.innerHTML = '<button type="button" class="rt-volver" onclick="ftRetosInicio()">← Volver a Retos</button>' +
      '<section class="dt"><header class="dt-cab"><div><span class="rz-eyebrow">Detective</span><h2>' + esc(c.titulo) + '</h2><p>' + esc(c.desc) + ' Toca la foto para marcar donde ves el error.</p></div>' + (window.ftMascota ? ftMascota.html('detective', { ancho: 84 }) : '') + '</header>' +
      '<div class="dt-foto" id="dtFoto"><img src="' + imagen(c.id) + '" alt="Fotografía del caso: ' + esc(c.titulo) + '" onerror="this.parentNode.classList.add(\'sin\')"><div class="dt-falta">La imagen de este caso aún no está cargada.</div>' + pines + '</div>' +
      (final ? '<div class="dt-res ' + (final.supera ? 'ok' : 'mal') + '"><strong>' + (final.supera ? '¡Caso resuelto!' : 'Casi lo logras') + '</strong><span>Encontraste ' + final.ok + ' de ' + final.total + ' errores' + (final.sobran ? ' y marcaste ' + final.sobran + ' de más' : '') + '.</span>' +
        (final.xp ? '<em>+' + final.xp + ' XP</em>' : '') + (final.faltan.length ? '<small>Los círculos punteados son los errores que faltaron.</small>' : '') + (final.nota ? '<small>' + esc(final.nota) + '</small>' : '') + '</div>' +
        '<div class="rt-acciones"><button type="button" class="rt-btn" onclick="ftDetective.abrir(\'' + c.id + '\')">Jugar otra vez</button><button type="button" class="rt-btn is-ghost" onclick="ftRetosInicio()">Más retos</button></div>'
        : '<div class="dt-barra"><span>Marcas: <b>' + marcas.length + '</b> de ' + MAX_MARCAS + ' · Errores por encontrar: <b>' + c.errores + '</b></span><div><button type="button" class="rt-btn is-ghost" id="dtDeshacer"' + (marcas.length ? '' : ' disabled') + '>Deshacer</button> <button type="button" class="rt-btn" id="dtRevisar"' + (marcas.length ? '' : ' disabled') + '>Revisar</button></div></div>') +
      (cal ? '<pre class="dt-cal">' + marcas.map(m => '{"x":' + m.x + ',"y":' + m.y + ',"r":9}').join(',\n') + '</pre>' : '') + '</section>';
    window.scrollTo(0, 0);
    if (final) return;
    $('dtFoto').onclick = e => {
      if (juego.marcas.length >= MAX_MARCAS) { if (window.showToast) showToast('Ya usaste todas tus marcas. Deshaz alguna o revisa.'); return; }
      const r = e.currentTarget.getBoundingClientRect();
      juego.marcas.push({ x: Math.round((e.clientX - r.left) / r.width * 1000) / 10, y: Math.round((e.clientY - r.top) / r.height * 1000) / 10 });
      pintar();
    };
    $('dtDeshacer').onclick = () => { juego.marcas.pop(); pintar(); };
    $('dtRevisar').onclick = revisar;
  }

  async function revisar() {
    const btn = $('dtRevisar'); if (btn) btn.disabled = true;
    const srv = window.ftAcceso ? await ftAcceso.completarReto({ retoId: juego.caso.id, tipo: 'detective', marcas: juego.marcas }) : null;
    if (!srv) { if (window.showToast) showToast('No se pudo revisar tu respuesta. Intenta de nuevo.'); if (btn) btn.disabled = false; return; }
    if (srv.nuevo) { if (window.ftLogros) ftLogros.actualizar('/api/logros'); if (window.showToast) showToast('+' + (srv.xp || 0) + ' XP por resolver el caso'); }
    pintar({ ok: srv.ok, total: srv.total, sobran: srv.sobran || 0, aciertos: srv.aciertos || [], faltan: srv.faltan || [], supera: srv.supera, xp: srv.nuevo ? srv.xp : 0, nota: srv.supera && !srv.nuevo ? 'Ya ganaste el XP de este caso. Repetirlo es solo práctica.' : '' });
  }

  function abrir(id) {
    const memb = typeof memberIsPaid !== 'undefined' && (memberIsPaid || (window.ftPrueba && ftPrueba.estado === 'elegida'));
    if (!memb) { if (window.showPaywallOverlay) showPaywallOverlay(); return; }
    const caso = CASOS.find(x => x.id === id); if (!caso) return;
    juego = { caso, marcas: [] }; pintar();
  }
  window.ftDetective = { abrir, casos: CASOS };
})();
