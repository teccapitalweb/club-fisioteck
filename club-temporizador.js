/* Club FisioTeck — Cronómetro: rutinas por intervalos para la sesión (ejercicio, series, repeticiones, tiempo de trabajo y de descanso).
   Se suma a la cuenta regresiva de siempre (que no cambia): arriba hay dos pestañas, «Cuenta regresiva» y «Rutina por intervalos».
   · Cuenta con marcas de tiempo (no con un contador) para no atrasarse si la pantalla se apaga o la pestaña queda en segundo plano.
   · Aviso sonoro (3 pitidos al final de cada fase), vibración y pantalla activa (Wake Lock) si el dispositivo los permite.
   · Las plantillas propias se guardan en este dispositivo. Los ejemplos NO son una prescripción clínica.
   Depende de index.html: auth, memberIsPaid, showPaywallOverlay, showToast, showPage. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const MAX_EJ = 12, MAX_PLANTILLAS = 20;
  const EJEMPLOS = [
    { nombre: 'Movilidad articular', ej: [{ n: 'Movilidad activa', s: 3, r: 10, t: 30, d: 20 }] },
    { nombre: 'Fortalecimiento básico', ej: [{ n: 'Ejercicio 1', s: 3, r: 10, t: 40, d: 30 }, { n: 'Ejercicio 2', s: 3, r: 10, t: 40, d: 30 }, { n: 'Ejercicio 3', s: 3, r: 10, t: 40, d: 30 }] },
    { nombre: 'Estiramientos', ej: [{ n: 'Estiramiento 1', s: 2, r: 1, t: 30, d: 10 }, { n: 'Estiramiento 2', s: 2, r: 1, t: 30, d: 10 }, { n: 'Estiramiento 3', s: 2, r: 1, t: 30, d: 10 }, { n: 'Estiramiento 4', s: 2, r: 1, t: 30, d: 10 }] },
    { nombre: 'Respiración diafragmática', ej: [{ n: 'Respiración', s: 5, r: 8, t: 60, d: 30 }] },
    { nombre: 'Intervalos 20 / 10', ej: [{ n: 'Intervalo', s: 8, r: 1, t: 20, d: 10 }] }
  ];
  let rutina = EJEMPLOS[0].ej.map(x => Object.assign({}, x)), nombreRutina = EJEMPLOS[0].nombre;
  let fases = [], iFase = 0, fin = 0, restante = 0, pausado = false, corriendo = false, reloj = null, ultimoSeg = -1, ctx = null, wake = null;
  let opc = { sonido: true, vibracion: true, pantalla: true };
  const uid = () => (auth.currentUser || {}).uid || 'x';
  const claveP = () => 'ft_tm_plantillas_' + uid(), claveO = () => 'ft_tm_opciones_' + uid();
  const leer = (k, def) => { try { const v = JSON.parse(localStorage.getItem(k) || 'null'); return v == null ? def : v; } catch (_) { return def; } };
  const escribir = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) { /* modo privado */ } };
  const mmss = s => { s = Math.max(0, Math.ceil(s)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  const numero = (v, a, b, def) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.min(b, Math.max(a, n)) : def; };

  // ---------- Fases de la rutina ----------
  function construir() {
    const f = [{ tipo: 'prep', dur: 5, ej: -1 }];
    rutina.forEach((e, i) => {
      for (let s = 1; s <= e.s; s++) {
        f.push({ tipo: 'trabajo', dur: e.t, ej: i, serie: s });
        const ultimaSerie = s === e.s, ultimoEj = i === rutina.length - 1;
        if (!(ultimaSerie && ultimoEj) && e.d > 0) f.push({ tipo: 'descanso', dur: e.d, ej: i, serie: s, sig: ultimaSerie ? i + 1 : i });
      }
    });
    return f;
  }
  const totalSeg = f => f.reduce((t, x) => t + x.dur, 0);

  // ---------- Sonido, vibración y pantalla activa ----------
  function pitido(frec, ms, inicio, fuerte) {
    if (!opc.sonido) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === 'suspended') ctx.resume();
      const t0 = ctx.currentTime + (inicio || 0) / 1000, dur = ms / 1000;
      const o = ctx.createOscillator(), g = ctx.createGain(); o.type = fuerte ? 'square' : 'sine'; o.frequency.value = frec;
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(fuerte ? 0.55 : 0.35, t0 + 0.012); g.gain.setValueAtTime(fuerte ? 0.55 : 0.35, t0 + Math.max(0.02, dur - 0.05)); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(ctx.destination); o.start(t0); o.stop(t0 + dur + 0.02);
    } catch (_) { /* sin audio */ }
  }
  // Alarma de fin: dura 5 segundos (10 pitidos alternando dos tonos) y vibra el mismo tiempo. Devuelve si el dispositivo aceptó la vibración.
  function alarmaFinal(conSonido, conVibra) {
    let vibro = null;
    if (conSonido) { try { for (let i = 0; i < 10; i++) { const ini = i * 500; pitido(i % 2 ? 1175 : 880, 380, ini, true); } } catch (_) { /* sin audio */ } }
    if (conVibra && navigator.vibrate) { try { vibro = navigator.vibrate([400, 100, 400, 100, 400, 100, 400, 100, 400, 100, 400, 100, 400, 100, 400, 100, 400, 100, 400]); } catch (_) { vibro = false; } }
    return vibro;
  }
  // Para el cronómetro clásico de index.html (sin opciones: siempre suena y vibra)
  window.ftAlarmaFin = function () { const g = opc.sonido; opc.sonido = true; try { return alarmaFinal(true, true); } finally { opc.sonido = g; } };
  // Alarmas con varios tonos: cambio a trabajo (sube), cambio a descanso (baja) y fin de la rutina (melodía larga)
  function alarma(tipo) {
    const mel = { trabajo: [[784, 140, 0], [988, 140, 170], [1319, 320, 340]], descanso: [[1319, 140, 0], [988, 140, 170], [659, 320, 340]], fin: [[784, 180, 0], [988, 180, 220], [1319, 180, 440], [1568, 180, 660], [1319, 180, 900], [1568, 520, 1120]] }[tipo] || [];
    mel.forEach(([f, ms, ini]) => pitido(f, ms, ini, true));
  }
  const vibrar = p => { if (opc.vibracion && navigator.vibrate) { try { navigator.vibrate(p); } catch (_) { /* sin vibración */ } } };
  async function pedirPantalla() { if (!opc.pantalla || !navigator.wakeLock) return; try { wake = await navigator.wakeLock.request('screen'); } catch (_) { wake = null; } }
  function soltarPantalla() { try { if (wake) wake.release(); } catch (_) { /* ya liberada */ } wake = null; }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && corriendo && !pausado) pedirPantalla(); });

  // ---------- Motor ----------
  function iniciarFase(i) {
    iFase = i; const f = fases[i]; restante = f.dur * 1000; fin = Date.now() + restante; ultimoSeg = -1; pintarCorredor();
    if (i > 0) { alarma(f.tipo === 'trabajo' ? 'trabajo' : 'descanso'); vibrar(f.tipo === 'trabajo' ? [300, 100, 300, 100, 300] : [600, 150, 300]); }
  }
  function tic() {
    if (!corriendo || pausado) return;
    restante = fin - Date.now(); const seg = Math.ceil(restante / 1000);
    if (seg !== ultimoSeg) { ultimoSeg = seg; if (seg > 0 && seg <= 3) { pitido(880, 140, 0, true); vibrar(120); } pintarReloj(); }
    if (restante <= 0) { if (iFase + 1 < fases.length) iniciarFase(iFase + 1); else terminar(); }
  }
  function empezar() {
    if (!memberIsPaid && !window.ftVistaAdmin) { showPaywallOverlay(); return; }
    const v = leerEditor(); if (!v) return;
    rutina = v; fases = construir(); corriendo = true; pausado = false;
    try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === 'suspended') ctx.resume(); } catch (_) { /* sin audio */ }
    pedirPantalla(); $('tmEditor').hidden = true; $('tmCorredor').hidden = false; iniciarFase(0);
    clearInterval(reloj); reloj = setInterval(tic, 200);
  }
  function terminar() {
    corriendo = false; clearInterval(reloj); soltarPantalla(); alarmaFinal(opc.sonido, opc.vibracion);
    const c = $('tmCorredor'); if (c) c.innerHTML = '<div class="tm-fin"><b>Rutina terminada</b><p>' + esc(nombreRutina) + ' · ' + mmss(totalSeg(fases) - 5) + ' en total</p><div class="tm-bot"><button type="button" class="tm-cta" id="tmRepetir">Repetir</button><button type="button" class="tm-sec" id="tmSalir">Volver a la rutina</button></div></div>';
    if ($('tmRepetir')) { $('tmRepetir').onclick = () => { $('tmCorredor').innerHTML = estructuraCorredor(); ligarCorredor(); empezar(); }; $('tmSalir').onclick = salir; }
  }
  function salir() { corriendo = false; pausado = false; clearInterval(reloj); soltarPantalla(); $('tmCorredor').hidden = true; $('tmEditor').hidden = false; $('tmCorredor').innerHTML = estructuraCorredor(); ligarCorredor(); }
  function pausar() { if (!corriendo) return; if (!pausado) { pausado = true; restante = fin - Date.now(); soltarPantalla(); } else { pausado = false; fin = Date.now() + restante; pedirPantalla(); } pintarReloj(); }
  function saltar() { if (!corriendo) return; if (iFase + 1 < fases.length) iniciarFase(iFase + 1); else terminar(); }
  function reiniciar() { if (!corriendo) return; pausado = false; iniciarFase(0); pedirPantalla(); }

  // ---------- Pantalla del corredor ----------
  const estructuraCorredor = () => '<div class="tm-fase" id="tmFase"></div><div class="tm-reloj" id="tmReloj">00:00</div><div class="tm-ej" id="tmEj"></div><div class="tm-sub" id="tmSub"></div><div class="tm-barra"><i id="tmBarra"></i></div><div class="tm-sig" id="tmSig"></div><div class="tm-bot"><button type="button" class="tm-cta" id="tmPausa">Pausar</button><button type="button" class="tm-sec" id="tmSaltar">Saltar</button><button type="button" class="tm-sec" id="tmReiniciar">Reiniciar</button><button type="button" class="tm-sec" id="tmSalirYa">Salir</button></div>';
  function ligarCorredor() {
    if (!$('tmPausa')) return;
    $('tmPausa').onclick = pausar; $('tmSaltar').onclick = saltar; $('tmReiniciar').onclick = reiniciar; $('tmSalirYa').onclick = salir;
  }
  function pintarReloj() {
    const r = $('tmReloj'); if (!r || !fases[iFase]) return;
    const f = fases[iFase], rest = pausado ? restante : fin - Date.now(); r.textContent = mmss(rest / 1000);
    const hecho = fases.slice(0, iFase).reduce((t, x) => t + x.dur, 0) + (f.dur - Math.max(0, rest / 1000)), total = totalSeg(fases);
    $('tmBarra').style.width = Math.min(100, Math.round(hecho / total * 100)) + '%';
    $('tmPausa').textContent = pausado ? 'Reanudar' : 'Pausar';
    $('tmFase').textContent = pausado ? 'En pausa' : (f.tipo === 'prep' ? 'Prepárate' : f.tipo === 'trabajo' ? 'Trabajo' : 'Descanso');
  }
  function pintarCorredor() {
    const f = fases[iFase], c = $('tmCorredor'); if (!c || !f) return;
    c.className = 'tm-corredor ' + f.tipo;
    const e = f.ej >= 0 ? rutina[f.ej] : null, sig = fases[iFase + 1];
    $('tmEj').textContent = e ? e.n : nombreRutina;
    $('tmSub').textContent = e ? 'Serie ' + f.serie + ' de ' + e.s + (f.tipo === 'trabajo' && e.r > 1 ? ' · ' + e.r + ' repeticiones' : '') : 'La rutina empieza en unos segundos';
    $('tmSig').textContent = sig ? 'Sigue: ' + (sig.tipo === 'descanso' ? 'descanso de ' + sig.dur + ' s' : sig.tipo === 'trabajo' ? rutina[sig.ej].n + ' · serie ' + sig.serie + ' (' + sig.dur + ' s)' : '') : 'Último tramo de la rutina';
    pintarReloj();
  }

  // ---------- Editor ----------
  function filaEj(e, i) {
    return '<div class="tm-ej-fila" data-i="' + i + '"><input class="tm-n" maxlength="40" value="' + esc(e.n) + '" aria-label="Nombre del ejercicio" placeholder="Ejercicio">' +
      '<label>Series<input type="number" class="tm-s" min="1" max="10" value="' + e.s + '" inputmode="numeric"></label><label>Repeticiones<input type="number" class="tm-r" min="1" max="100" value="' + e.r + '" inputmode="numeric"></label>' +
      '<label>Trabajo (s)<input type="number" class="tm-t" min="5" max="600" value="' + e.t + '" inputmode="numeric"></label><label>Descanso (s)<input type="number" class="tm-d" min="0" max="300" value="' + e.d + '" inputmode="numeric"></label>' +
      '<button type="button" class="tm-x" data-quitar="' + i + '" aria-label="Quitar ejercicio">Quitar</button></div>';
  }
  function pintarEditor() {
    const prop = leer(claveP(), []);
    $('tmEditor').innerHTML = '<h4>Plantillas</h4><div class="tm-plantillas">' + EJEMPLOS.map((p, i) => '<button type="button" data-ej="' + i + '">' + esc(p.nombre) + '<small>Ejemplo</small></button>').join('') + prop.map((p, i) => '<button type="button" data-mia="' + i + '">' + esc(p.nombre) + '<small>Mía</small></button>').join('') + '</div>' +
      '<p class="tm-ref">Los ejemplos son solo una configuración de partida, no una prescripción clínica. Ajusta los tiempos según tu criterio.</p>' +
      '<h4>Tu rutina</h4><label class="tm-nombre">Nombre<input id="tmNombre" maxlength="40" value="' + esc(nombreRutina) + '"></label><div id="tmLista">' + rutina.map(filaEj).join('') + '</div>' +
      '<button type="button" class="tm-sec" id="tmMas">+ Agregar ejercicio</button>' +
      '<div class="tm-opc"><button type="button" class="tm-probar" onclick="ftProbarAlarma()">Probar alarma y vibración</button><label><input type="checkbox" id="tmSonido"' + (opc.sonido ? ' checked' : '') + '> Sonido</label><label><input type="checkbox" id="tmVibra"' + (opc.vibracion ? ' checked' : '') + '> Vibración' + (navigator.vibrate ? '' : ' (no disponible en este dispositivo)') + '</label><label><input type="checkbox" id="tmPantalla"' + (opc.pantalla ? ' checked' : '') + '> Mantener la pantalla activa</label></div>' +
      '<p class="tm-total" id="tmTotal"></p><div class="tm-bot"><button type="button" class="tm-cta" id="tmIniciar">Iniciar rutina</button><button type="button" class="tm-sec" id="tmGuardar">Guardar como plantilla</button></div>' + (prop.length ? '<button type="button" class="tm-borrar" id="tmBorrarMias">Borrar mis plantillas</button>' : '');
    ligarEditor(); total();
  }
  function leerEditor() {
    const filas = [...document.querySelectorAll('#tmLista .tm-ej-fila')];
    const r = filas.map((f, i) => ({ n: (f.querySelector('.tm-n').value.trim() || 'Ejercicio ' + (i + 1)).slice(0, 40), s: numero(f.querySelector('.tm-s').value, 1, 10, 3), r: numero(f.querySelector('.tm-r').value, 1, 100, 10), t: numero(f.querySelector('.tm-t').value, 5, 600, 30), d: numero(f.querySelector('.tm-d').value, 0, 300, 20) }));
    if (!r.length) { showToast('Agrega al menos un ejercicio.'); return null; }
    nombreRutina = ($('tmNombre').value.trim() || 'Mi rutina').slice(0, 40);
    opc = { sonido: $('tmSonido').checked, vibracion: $('tmVibra').checked, pantalla: $('tmPantalla').checked }; escribir(claveO(), opc);
    return r;
  }
  function total() {
    const t = $('tmTotal'); if (!t) return;
    const f = filasActuales(); if (!f.length) { t.textContent = ''; return; }
    const segs = f.reduce((a, e) => a + e.s * e.t + (e.s * e.d), 0) - (f[f.length - 1].d || 0);
    t.textContent = 'Duración aproximada: ' + mmss(Math.max(0, segs)) + ' · ' + f.reduce((a, e) => a + e.s, 0) + ' series en total';
  }
  const filasActuales = () => [...document.querySelectorAll('#tmLista .tm-ej-fila')].map(f => ({ s: numero(f.querySelector('.tm-s').value, 1, 10, 3), t: numero(f.querySelector('.tm-t').value, 5, 600, 30), d: numero(f.querySelector('.tm-d').value, 0, 300, 20) }));
  function ligarEditor() {
    const ed = $('tmEditor');
    ed.querySelectorAll('[data-ej]').forEach(b => b.onclick = () => { const p = EJEMPLOS[Number(b.dataset.ej)]; rutina = p.ej.map(x => Object.assign({}, x)); nombreRutina = p.nombre; pintarEditor(); });
    ed.querySelectorAll('[data-mia]').forEach(b => b.onclick = () => { const p = leer(claveP(), [])[Number(b.dataset.mia)]; if (p) { rutina = p.ej.map(x => Object.assign({}, x)); nombreRutina = p.nombre; pintarEditor(); } });
    ed.querySelectorAll('[data-quitar]').forEach(b => b.onclick = () => { const v = leerEditor(); if (!v) return; if (v.length === 1) { showToast('La rutina necesita al menos un ejercicio.'); return; } v.splice(Number(b.dataset.quitar), 1); rutina = v; pintarEditor(); });
    ed.querySelectorAll('#tmLista input').forEach(i => i.oninput = total);
    $('tmMas').onclick = () => { const v = leerEditor(); if (!v) return; if (v.length >= MAX_EJ) { showToast('Máximo ' + MAX_EJ + ' ejercicios por rutina.'); return; } v.push({ n: 'Ejercicio ' + (v.length + 1), s: 3, r: 10, t: 30, d: 20 }); rutina = v; pintarEditor(); };
    $('tmIniciar').onclick = empezar;
    $('tmGuardar').onclick = () => {
      const v = leerEditor(); if (!v) return; const lista = leer(claveP(), []);
      const i = lista.findIndex(p => p.nombre.toLowerCase() === nombreRutina.toLowerCase());
      if (i < 0 && lista.length >= MAX_PLANTILLAS) { showToast('Llegaste al máximo de ' + MAX_PLANTILLAS + ' plantillas. Borra alguna para guardar otra.'); return; }
      const p = { nombre: nombreRutina, ej: v }; if (i >= 0) lista[i] = p; else lista.push(p); escribir(claveP(), lista); rutina = v; pintarEditor(); showToast('Plantilla guardada en este dispositivo');
    };
    const bm = $('tmBorrarMias'); if (bm) bm.onclick = () => { escribir(claveP(), []); pintarEditor(); showToast('Se borraron tus plantillas'); };
  }

  // ---------- Montaje: pestañas sobre el cronómetro de siempre ----------
  function montar() {
    const pg = $('page-timer'); if (!pg || $('tmPestanas')) return;
    const simple = pg.querySelector('div[style*="max-width:500px"]'); if (!simple) return;
    simple.id = 'tmSimple';
    simple.insertAdjacentHTML('beforebegin', '<div class="tm-pestanas" id="tmPestanas" role="tablist"><button type="button" role="tab" class="on" data-m="simple">Cuenta regresiva</button><button type="button" role="tab" data-m="rutina">Rutina por intervalos</button></div>');
    simple.insertAdjacentHTML('afterend', '<div id="tmRutina" class="tm-rutina" hidden><div id="tmEditor"></div><div id="tmCorredor" class="tm-corredor" hidden></div></div>');
    $('tmCorredor').innerHTML = estructuraCorredor(); ligarCorredor();
    $('tmPestanas').querySelectorAll('button').forEach(b => b.onclick = () => {
      const r = b.dataset.m === 'rutina'; $('tmPestanas').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      simple.hidden = r; $('tmRutina').hidden = !r; if (r && !$('tmEditor').innerHTML) { opc = Object.assign(opc, leer(claveO(), {})); pintarEditor(); }
    });
  }
  montar();
  auth.onAuthStateChanged(u => { if (!u && corriendo) salir(); });

  // Botón de prueba: también sirve para que el navegador permita sonar y vibrar (necesita un toque del usuario)
  function probar() {
    ctx = ctx || null; const g = opc.sonido; opc.sonido = true;
    let v; try { v = alarmaFinal(true, true); } finally { opc.sonido = g; }
    const toast = window.showToast || (() => {});
    if (!navigator.vibrate) toast('Este dispositivo o navegador no permite vibrar desde la web. Suena la alarma de 5 segundos.');
    else if (v === false) toast('El navegador bloqueó la vibración. Revisa que el teléfono no esté en modo ahorro de energía o silencio.');
    else toast('Probando la alarma: 5 segundos de sonido y vibración.');
  }
  function botonProbar() {
    const caja = document.querySelector('.tm-clasico-bot'); if (!caja || document.getElementById('tmProbarClasico')) return;
    const b = document.createElement('button'); b.type = 'button'; b.id = 'tmProbarClasico'; b.className = 'tm-probar'; b.textContent = 'Probar alarma y vibración'; b.onclick = probar;
    caja.insertAdjacentElement('afterend', b);
  }
  window.ftProbarAlarma = probar;
  botonProbar();
})();
