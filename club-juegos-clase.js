/* Club FisioTeck — juegos dinámicos y preguntas de cada clase, con el mismo diseño y reglas que Alintec Food.
   Sustituye a ftActividad() de club-juegos.js (se carga después). Tipos de juego por clase (lesson.juego = { tipo, datos }):
     sopa_letras  { palabras: ['TEXTO', ...] }                        3 a 10 palabras; se marca arrastrando o tocando la primera y la última letra
     memorama     { pares: [{ termino, definicion }, ...] }            hasta 10 pares; se voltean tarjetas y se une cada término con su definición
     rompecabezas { dificultad: '3'|'4'|'5', imagenUrl: '' }           piezas tipo jigsaw que se arrastran o se tocan para intercambiar; imagen vacía = portada del curso
     ahorcado     { palabras: [{ palabra, pista }, ...] }              6 errores, letras de apoyo al inicio, se puede reintentar
   Las preguntas (lesson.preguntas) las califica el servidor (POST /api/cursos/:id/quiz); hace falta acertar al menos el 60 % para continuar.
   Regla de Alintec: la clase no se marca como vista hasta resolver sus preguntas y su juego (markLessonComplete llama a ftActividad).
   El juego sale del servidor, solo para quien tiene acceso al curso: GET /api/cursos/:id/clases/:indice/juego (si el sitio ya trae los datos, se usan).
   También agrega al visor de video de la clase la flecha (abrir aparte) y el botón "Marcar como vista".
   Depende de index.html: siteData, certFetch, getCourseProgress, markLessonComplete, closeVideo, showToast, showPaywallOverlay, driveImageUrl (opcional). */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const mezclar = a => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
  const reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const T = ms => (reduce ? Math.min(ms, 150) : ms);
  const aviso = m => { if (typeof showToast === 'function') showToast(m); };
  const sinTilde = t => String(t || '').toUpperCase().split('').map(ch => (ch === 'Ñ' ? 'Ñ' : ch.normalize('NFD').replace(/[̀-ͯ]/g, ''))).join('').replace(/[^A-ZÑ]/g, '');
  const X_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  // ---------- Ventana (una sola para preguntas y juego) ----------
  function ventana() {
    const ov = document.createElement('div');
    ov.className = 'ftj-ov jgc-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
    ov.innerHTML = '<div class="jgc-caja"><div class="jgc-cab"><div><h3></h3><small></small></div><button type="button" class="jgc-x" aria-label="Salir">' + X_SVG + '</button></div><div class="jgc-cuerpo"></div><div class="jgc-pie"></div></div>';
    document.body.appendChild(ov); document.body.classList.add('ftj-abierto');
    const w = { onSalir: null, cuerpo: ov.querySelector('.jgc-cuerpo'), pie: ov.querySelector('.jgc-pie'), h: ov.querySelector('h3'), sub: ov.querySelector('small') };
    w.titulo = (t, s) => { w.h.textContent = t; w.sub.textContent = s || ''; };
    w.botones = (...b) => { w.pie.textContent = ''; b.forEach(x => x && w.pie.appendChild(x)); };
    w.cerrar = () => { document.removeEventListener('keydown', tecla, true); ov.remove(); document.body.classList.remove('ftj-abierto'); };
    const salir = () => { if (w.onSalir) w.onSalir(); };
    function tecla(e) { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); salir(); } }
    ov.querySelector('.jgc-x').onclick = salir;
    document.addEventListener('keydown', tecla, true);
    return w;
  }
  const boton = (cls, txt) => { const b = document.createElement('button'); b.type = 'button'; b.className = cls; b.textContent = txt; return b; };

  // ---------- Preguntas (las califica el servidor) ----------
  function correrQuiz(w, preguntas, cursoId, indice, tituloClase) {
    return new Promise(resolve => {
      w.onSalir = () => resolve(false);
      const total = preguntas.length, LETRAS = ['A', 'B', 'C', 'D', 'E', 'F'];
      const btnCheck = boton('jg-continuar', 'Comprobar respuestas'), btnGo = boton('jg-continuar', 'Continuar'), btnRe = boton('jg-ghost', 'Intentar de nuevo');
      function pintar() {
        const respuestas = new Array(total).fill(null);
        w.titulo('Antes de seguir', tituloClase);
        w.cuerpo.innerHTML = '<div class="qz-progress-track"><div class="qz-progress-fill" id="qz-fill"></div></div>' + preguntas.map((p, i) => {
          const vof = p.tipo !== 'multiple', ops = vof ? ['Verdadero', 'Falso'] : (p.opciones || []);
          return '<div class="qz-card" data-card="' + i + '"><div class="qz-eyebrow"><span class="qz-eyebrow__num">' + (i + 1) + '</span> Pregunta ' + (i + 1) + ' de ' + total + '<span class="qz-veredicto" data-ver="' + i + '" style="display:none"></span></div>' +
            '<div class="qz-qtext">' + esc(p.pregunta) + '</div><div class="qz-opts">' + ops.map((o, n) => '<button type="button" class="qz-opt" data-q="' + i + '" data-o="' + n + '"><span class="qz-opt__badge">' + (vof ? (n === 0 ? 'V' : 'F') : LETRAS[n]) + '</span><span class="qz-opt__txt">' + esc(o) + '</span></button>').join('') + '</div></div>';
        }).join('') + '<div class="qz-footer-progreso" id="qz-prog">0 / ' + total + ' respondidas</div><div class="qz-resultado" id="qz-res"></div>';
        btnCheck.disabled = true; btnCheck.textContent = 'Comprobar respuestas';
        w.botones(btnCheck);
        w.cuerpo.querySelectorAll('.qz-opt').forEach(op => op.addEventListener('click', () => {
          const q = +op.dataset.q, o = +op.dataset.o; respuestas[q] = o;
          w.cuerpo.querySelectorAll('[data-q="' + q + '"]').forEach(x => x.classList.remove('is-selected')); op.classList.add('is-selected');
          w.cuerpo.querySelector('[data-card="' + q + '"]').classList.add('is-done');
          const n = respuestas.filter(r => r !== null).length;
          w.cuerpo.querySelector('#qz-prog').textContent = n + ' / ' + total + ' respondidas';
          w.cuerpo.querySelector('#qz-fill').style.width = Math.round(n / total * 100) + '%';
          btnCheck.disabled = n < total;
        }));
        btnCheck.onclick = async () => {
          btnCheck.disabled = true; btnCheck.textContent = 'Validando…';
          let res;
          try {
            // la respuesta correcta solo la conoce el servidor (como Alintec): califica cada pregunta y devuelve cuál era
            res = await Promise.all(preguntas.map((q, i) => certFetch('/api/cursos/' + encodeURIComponent(cursoId) + '/quiz', { method: 'POST', body: JSON.stringify({ sessionIndex: indice, pregunta: q._k, respuesta: respuestas[i] }) })));
          } catch (e) { btnCheck.disabled = false; btnCheck.textContent = 'Comprobar respuestas'; if (e && e.status === 402 && window.showPaywallOverlay) { resolve(false); showPaywallOverlay(); } else aviso((e && e.message) || 'No se pudo comprobar. Intenta de nuevo.'); return; }
          let ok = 0;
          preguntas.forEach((q, i) => {
            const r = res[i] || {}, bien = !!r.acertada; if (bien) ok++;
            const card = w.cuerpo.querySelector('[data-card="' + i + '"]'), sel = w.cuerpo.querySelector('[data-q="' + i + '"][data-o="' + respuestas[i] + '"]'), cor = w.cuerpo.querySelector('[data-q="' + i + '"][data-o="' + r.correcta + '"]'), ver = w.cuerpo.querySelector('[data-ver="' + i + '"]');
            card.classList.remove('is-done'); card.classList.add(bien ? 'is-right' : 'is-bad'); sel.classList.remove('is-selected');
            if (!bien) { sel.classList.add('is-incorrect'); sel.querySelector('.qz-opt__badge').textContent = 'X'; }
            if (cor) { cor.classList.add('is-correct'); cor.querySelector('.qz-opt__badge').textContent = 'OK'; }
            ver.style.display = ''; ver.textContent = bien ? 'CORRECTA' : 'INCORRECTA'; ver.className = 'qz-veredicto ' + (bien ? 'qz-veredicto--ok' : 'qz-veredicto--mal');
          });
          w.cuerpo.classList.add('qz-locked');
          const pasa = ok >= Math.ceil(total * 0.6);
          w.cuerpo.querySelector('#qz-prog').textContent = 'Acertaste ' + ok + ' de ' + total;
          w.cuerpo.querySelector('#qz-res').innerHTML = pasa ? '<span style="color:var(--success)">Puedes continuar.</span>' : '<span style="color:var(--danger)">Necesitas acertar al menos el 60 % para continuar. Repasa la clase e inténtalo otra vez.</span>';
          const primera = w.cuerpo.querySelector('.qz-card.is-bad'); if (primera && primera.scrollIntoView) primera.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
          w.botones(pasa ? btnGo : btnRe);
        };
        btnGo.onclick = () => resolve(true);
        btnRe.onclick = () => { w.cuerpo.classList.remove('qz-locked'); pintar(); };
      }
      pintar();
    });
  }

  // ---------- Sopa de letras ----------
  const DIRS = [[0, 1], [1, 0], [1, 1], [-1, 1]];
  const PALETA = ['#0D5FA0', '#159E92', '#C2760B', '#7C3AED', '#DC2D3F', '#0F9D58', '#0891B2', '#B45309', '#DB2777', '#4D7C0F'];
  function generarSopa(palabras) {
    const words = [...new Set(palabras.map(sinTilde).filter(p => p.length >= 3 && p.length <= 14))].slice(0, 10).sort((a, b) => b.length - a.length);
    if (words.length < 3) return null;
    const size = Math.max(10, Math.min(15, Math.max(8, ...words.map(p => p.length)) + 2));
    let mejor = null;
    for (let intento = 0; intento < 40; intento++) {
      const grid = Array.from({ length: size }, () => Array(size).fill(null)), placed = [];
      words.forEach(word => {
        for (let k = 0; k < 300; k++) {
          const d = DIRS[Math.floor(Math.random() * DIRS.length)], r0 = Math.floor(Math.random() * size), c0 = Math.floor(Math.random() * size);
          const rf = r0 + d[0] * (word.length - 1), cf = c0 + d[1] * (word.length - 1);
          if (rf < 0 || rf >= size || cf < 0 || cf >= size) continue;
          let cabe = true;
          for (let i = 0; i < word.length; i++) { const cur = grid[r0 + d[0] * i][c0 + d[1] * i]; if (cur && cur !== word[i]) { cabe = false; break; } }
          if (!cabe) continue;
          for (let i = 0; i < word.length; i++) grid[r0 + d[0] * i][c0 + d[1] * i] = word[i];
          placed.push({ word }); return;
        }
      });
      if (!mejor || placed.length > mejor.placed.length) mejor = { grid, size, placed };
      if (placed.length === words.length) break;
    }
    if (mejor.placed.length < 3) return null; // si casi no caben, no se bloquea al alumno
    const AB = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) if (!mejor.grid[r][c]) mejor.grid[r][c] = AB[Math.floor(Math.random() * AB.length)];
    return mejor;
  }
  function juegoSopa(w, datos, ctx) {
    return new Promise(resolve => {
      w.onSalir = () => resolve(false);
      const sopa = generarSopa(datos.palabras || []);
      if (!sopa) { resolve(true); return; }
      const { grid, size, placed } = sopa, encontradas = new Set();
      w.titulo('Sopa de letras', ctx.tituloClase);
      w.cuerpo.innerHTML = '<div class="jg-lead">Encuentra las <b>' + placed.length + ' palabras</b> escondidas en el tablero.</div>' +
        '<div class="jg-progress"><div class="jg-progress__track"><div class="jg-progress__fill" id="sp-fill"></div></div><div class="jg-progress__txt" id="sp-prog">0 / ' + placed.length + '</div></div>' +
        '<div class="sp-wrap"><div class="sp-board" id="sp-board" style="grid-template-columns:repeat(' + size + ',1fr)">' + grid.map((row, r) => row.map((ch, c) => '<div class="sp-cell" data-r="' + r + '" data-c="' + c + '">' + ch + '</div>').join('')).join('') + '</div>' +
        '<div class="sp-side"><div class="sp-side__title">Palabras a encontrar</div>' + placed.map(p => '<div class="sp-chip" data-word="' + p.word + '"><span class="sp-chip__dot"></span>' + p.word + '</div>').join('') +
        '<div class="sp-help"><b>Arrastra</b> el dedo o el mouse desde la primera hasta la última letra de la palabra, o <b>toca</b> la primera letra y luego la última.</div></div></div>';
      const btn = boton('jg-continuar', 'Continuar'); btn.disabled = true; btn.onclick = () => resolve(true); w.botones(btn);
      const board = w.cuerpo.querySelector('#sp-board'), celda = (r, c) => board.querySelector('[data-r="' + r + '"][data-c="' + c + '"]');
      let inicio = null, arrastrando = false, down = null, path = [];
      const linea = (a, b) => {
        const dr = b.r - a.r, dc = b.c - a.c, adr = Math.abs(dr), adc = Math.abs(dc); let sr = Math.sign(dr), sc = Math.sign(dc), len;
        if (!adr && !adc) return [{ r: a.r, c: a.c }];
        if (!adr) len = adc + 1; else if (!adc) len = adr + 1; else if (adr === adc) len = adr + 1; else if (adc > adr) { sr = 0; len = adc + 1; } else { sc = 0; len = adr + 1; }
        const out = []; for (let i = 0; i < len; i++) { const r = a.r + sr * i, c = a.c + sc * i; if (r < 0 || r >= size || c < 0 || c >= size) break; out.push({ r, c }); }
        return out;
      };
      const limpiar = () => { board.querySelectorAll('.is-path').forEach(e => e.classList.remove('is-path')); path = []; };
      const pintar = cs => { board.querySelectorAll('.is-path').forEach(e => e.classList.remove('is-path')); cs.forEach(({ r, c }) => { const e = celda(r, c); if (e && !e.dataset.found) e.classList.add('is-path'); }); path = cs; };
      function validar(cs) {
        if (!cs || cs.length < 2) { limpiar(); return; }
        const str = cs.map(({ r, c }) => grid[r][c]).join(''), rev = str.split('').reverse().join('');
        const m = placed.find(p => !encontradas.has(p.word) && (p.word === str || p.word === rev));
        if (m) {
          encontradas.add(m.word);
          const color = PALETA[(encontradas.size - 1) % PALETA.length];
          cs.forEach(({ r, c }) => { const e = celda(r, c); if (e) { e.classList.remove('is-path'); e.classList.add('is-found'); e.dataset.found = '1'; e.style.background = color; } });
          const chip = w.cuerpo.querySelector('[data-word="' + m.word + '"]');
          if (chip) { chip.classList.add('is-found'); chip.querySelector('.sp-chip__dot').style.background = color; chip.style.background = 'color-mix(in srgb, ' + color + ' 14%, var(--surface-2))'; }
          w.cuerpo.querySelector('#sp-prog').textContent = encontradas.size + ' / ' + placed.length;
          w.cuerpo.querySelector('#sp-fill').style.width = Math.round(encontradas.size / placed.length * 100) + '%';
          if (encontradas.size === placed.length) { btn.disabled = false; const win = document.createElement('div'); win.className = 'jg-win'; win.textContent = '¡Encontraste todas las palabras!'; w.cuerpo.appendChild(win); win.scrollIntoView({ block: 'nearest' }); }
        }
        limpiar();
      }
      const deEvento = ev => { const el = document.elementFromPoint(ev.clientX, ev.clientY); return el && el.classList && el.classList.contains('sp-cell') ? { r: +el.dataset.r, c: +el.dataset.c } : null; };
      board.addEventListener('pointerdown', ev => { const c = deEvento(ev); if (!c) return; ev.preventDefault(); arrastrando = false; try { board.setPointerCapture(ev.pointerId); } catch (_) { /* sin captura */ } down = c; pintar([c]); });
      board.addEventListener('pointermove', ev => { if (!down) return; const c = deEvento(ev); if (!c) return; if (c.r !== down.r || c.c !== down.c) arrastrando = true; if (arrastrando) pintar(linea(down, c)); });
      board.addEventListener('pointerup', ev => {
        if (!down) return; const a = down; down = null;
        const c = deEvento(ev) || (path.length ? path[path.length - 1] : null);
        if (arrastrando) { validar(c ? linea(a, c) : path); inicio = null; arrastrando = false; return; }
        if (!inicio) { inicio = a; pintar([a]); }
        else { if (inicio.r === a.r && inicio.c === a.c) { inicio = null; limpiar(); return; } validar(linea(inicio, a)); inicio = null; }
      });
      board.addEventListener('pointercancel', () => { down = null; arrastrando = false; inicio = null; limpiar(); });
    });
  }

  // ---------- Memorama ----------
  function juegoMemorama(w, datos, ctx) {
    return new Promise(resolve => {
      w.onSalir = () => resolve(false);
      const pares = (datos.pares || []).filter(p => p && p.termino && p.definicion).slice(0, 10);
      if (!pares.length) { resolve(true); return; }
      const cartas = mezclar(pares.flatMap((p, i) => [{ texto: p.termino, tipo: 'termino', par: i }, { texto: p.definicion, tipo: 'definicion', par: i }]));
      w.titulo('Memorama', ctx.tituloClase);
      w.cuerpo.innerHTML = '<div class="jg-lead">Voltea las tarjetas y empareja cada <b>término</b> con su <b>definición</b>.</div>' +
        '<div class="jg-progress"><div class="jg-progress__track"><div class="jg-progress__fill" id="mm-fill"></div></div><div class="jg-progress__txt" id="mm-prog">0 / ' + pares.length + '</div></div>' +
        '<div class="mm-grid">' + cartas.map((c, i) => '<div class="mm-card" data-idx="' + i + '" role="button" tabindex="0" aria-label="Tarjeta ' + (i + 1) + '"><div class="mm-inner"><div class="mm-face mm-front"></div><div class="mm-face mm-back"><span class="mm-back__tag ' + (c.tipo === 'termino' ? 'mm-back__tag--t' : 'mm-back__tag--d') + '">' + (c.tipo === 'termino' ? 'Término' : 'Definición') + '</span><span class="mm-back__txt">' + esc(c.texto) + '</span></div></div></div>').join('') + '</div>';
      const btn = boton('jg-continuar', 'Continuar'); btn.disabled = true; btn.onclick = () => resolve(true); w.botones(btn);
      let abiertas = [], bloqueado = false; const hechos = new Set();
      w.cuerpo.querySelectorAll('.mm-card').forEach(el => {
        const voltear = () => {
          if (bloqueado || el.classList.contains('is-up') || el.classList.contains('is-matched')) return;
          el.classList.add('is-up'); abiertas.push(+el.dataset.idx);
          if (abiertas.length < 2) return;
          bloqueado = true;
          const [i1, i2] = abiertas, c1 = cartas[i1], c2 = cartas[i2], e1 = w.cuerpo.querySelector('[data-idx="' + i1 + '"]'), e2 = w.cuerpo.querySelector('[data-idx="' + i2 + '"]');
          if (c1.par === c2.par && c1.tipo !== c2.tipo) {
            setTimeout(() => {
              e1.classList.add('is-matched'); e2.classList.add('is-matched'); hechos.add(c1.par);
              w.cuerpo.querySelector('#mm-prog').textContent = hechos.size + ' / ' + pares.length;
              w.cuerpo.querySelector('#mm-fill').style.width = Math.round(hechos.size / pares.length * 100) + '%';
              if (hechos.size === pares.length) { btn.disabled = false; const win = document.createElement('div'); win.className = 'jg-win'; win.textContent = '¡Completaste todos los pares!'; w.cuerpo.appendChild(win); win.scrollIntoView({ block: 'nearest' }); }
              abiertas = []; bloqueado = false;
            }, T(500));
          } else {
            setTimeout(() => { e1.classList.add('is-wrong'); e2.classList.add('is-wrong'); }, T(350));
            setTimeout(() => { e1.classList.remove('is-up', 'is-wrong'); e2.classList.remove('is-up', 'is-wrong'); abiertas = []; bloqueado = false; }, T(2000)); // se deja leer con calma
          }
        };
        el.addEventListener('click', voltear);
        el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); voltear(); } });
      });
    });
  }

  // ---------- Rompecabezas (piezas tipo jigsaw) ----------
  const urlSegura = u => /^(https?:\/\/|assets\/|data:image\/)/i.test(String(u || '').trim()) ? String(u).trim() : '';
  function juegoRompe(w, datos, ctx) {
    return new Promise(resolve => {
      w.onSalir = () => resolve(false);
      const n = [3, 4, 5].includes(parseInt(datos.dificultad, 10)) ? parseInt(datos.dificultad, 10) : 3;
      let img = String(datos.imagenUrl || '').trim() || (ctx.curso && ctx.curso.thumbnail) || '';
      if (typeof driveImageUrl === 'function' && /drive\.google/.test(img)) img = driveImageUrl(img);
      img = urlSegura(img) || 'icon-512.png';
      const disponible = Math.max(220, Math.min(400, (window.innerWidth || 400) - 96));
      const BOARD = Math.floor(disponible / n) * n, CS = BOARD / n, K = CS * 0.24, total = n * n;
      const TH = Array.from({ length: n + 1 }, () => Array.from({ length: n }, () => (Math.random() < 0.5 ? 1 : -1)));
      const TV = Array.from({ length: n }, () => Array.from({ length: n + 1 }, () => (Math.random() < 0.5 ? 1 : -1)));
      function lado(x0, y0, x1, y1, sign, horiz) {
        if (sign === 0) return 'L ' + x1 + ' ' + y1 + ' ';
        const t = CS * 0.19;
        if (horiz) {
          const dir = Math.sign(x1 - x0), mx = (x0 + x1) / 2;
          return 'L ' + (mx - dir * t) + ' ' + y0 + ' C ' + (mx - dir * t) + ' ' + (y0 + sign * t * 0.3) + ', ' + (mx - dir * t * 1.3) + ' ' + (y0 + sign * t * 1.7) + ', ' + mx + ' ' + (y0 + sign * t * 1.7) + ' C ' + (mx + dir * t * 1.3) + ' ' + (y0 + sign * t * 1.7) + ', ' + (mx + dir * t) + ' ' + (y0 + sign * t * 0.3) + ', ' + (mx + dir * t) + ' ' + y0 + ' L ' + x1 + ' ' + y1 + ' ';
        }
        const dir = Math.sign(y1 - y0), my = (y0 + y1) / 2;
        return 'L ' + x0 + ' ' + (my - dir * t) + ' C ' + (x0 + sign * t * 0.3) + ' ' + (my - dir * t) + ', ' + (x0 + sign * t * 1.7) + ' ' + (my - dir * t * 1.3) + ', ' + (x0 + sign * t * 1.7) + ' ' + my + ' C ' + (x0 + sign * t * 1.7) + ' ' + (my + dir * t * 1.3) + ', ' + (x0 + sign * t * 0.3) + ' ' + (my + dir * t) + ', ' + x0 + ' ' + (my + dir * t) + ' L ' + x1 + ' ' + y1 + ' ';
      }
      function pathPieza(r, c) {
        const x0 = K, y0 = K, x1 = K + CS, y1 = K + CS;
        return 'M ' + x0 + ' ' + y0 + ' ' + lado(x0, y0, x1, y0, r === 0 ? 0 : TH[r][c], true) + lado(x1, y0, x1, y1, c === n - 1 ? 0 : TV[r][c + 1], false) + lado(x1, y1, x0, y1, r === n - 1 ? 0 : TH[r + 1][c], true) + lado(x0, y1, x0, y0, c === 0 ? 0 : TV[r][c], false) + 'Z';
      }
      let slots = Array.from({ length: total }, (_, i) => i), intentos = 0;
      do { slots = mezclar(slots); intentos++; } while (slots.every((v, i) => v === i) && intentos < 20);
      const uid = Math.random().toString(36).slice(2, 8), svgSize = CS + 2 * K, eImg = esc(img);
      w.titulo('Rompecabezas', ctx.tituloClase);
      w.cuerpo.innerHTML = '<div class="jg-lead">Arma la imagen colocando cada pieza en su lugar.</div><div class="pz-shell"><div class="pz-toolbar"><div><div class="sp-side__title" style="margin-bottom:3px">Imagen de referencia</div><div style="font-size:.74rem;opacity:.75">Intercambia piezas hasta reconstruirla</div></div><img class="pz-reference" src="' + eImg + '" alt="Referencia del rompecabezas"><span class="pz-moves" id="pz-moves">0 movimientos</span></div>' +
        '<div class="pz-board" id="pz-board" style="width:' + BOARD + 'px;height:' + BOARD + 'px;background-size:' + CS + 'px ' + CS + 'px">' +
        slots.map((pid, slot) => {
          const pr = Math.floor(pid / n), pc = pid % n, sx = (slot % n) * CS - K, sy = Math.floor(slot / n) * CS - K, d = pathPieza(pr, pc);
          return '<svg class="pz-piece" data-slot="' + slot + '" data-piece="' + pid + '" width="' + svgSize + '" height="' + svgSize + '" viewBox="0 0 ' + svgSize + ' ' + svgSize + '" style="left:' + sx + 'px;top:' + sy + 'px"><defs><clipPath id="pzclip-' + uid + '-' + pid + '"><path d="' + d + '"/></clipPath></defs><g clip-path="url(#pzclip-' + uid + '-' + pid + ')"><image href="' + eImg + '" x="' + (K - pc * CS) + '" y="' + (K - pr * CS) + '" width="' + (n * CS) + '" height="' + (n * CS) + '" preserveAspectRatio="xMidYMid slice"/></g><path d="' + d + '" fill="none" stroke="rgba(255,255,255,.92)" stroke-width="1.8"/><path d="' + d + '" fill="none" stroke="rgba(10,40,70,.25)" stroke-width=".65" transform="translate(0 1.2)"/></svg>';
        }).join('') + '</div></div><div class="pz-help"><b>Arrastra</b> una pieza y suéltala sobre otra para intercambiarlas, o <b>toca</b> una pieza y luego toca con cuál quieres cambiarla.</div>';
      const btn = boton('jg-continuar', 'Continuar'); btn.disabled = true; btn.onclick = () => resolve(true); w.botones(btn);
      const boardEl = w.cuerpo.querySelector('#pz-board'); let terminado = false, mov = 0, sel = null, drag = null, movio = false, offX = 0, offY = 0;
      const pos = slot => ({ x: (slot % n) * CS - K, y: Math.floor(slot / n) * CS - K });
      function mover(p, slot) { p.dataset.slot = slot; const q = pos(slot); p.style.left = q.x + 'px'; p.style.top = q.y + 'px'; p.classList.toggle('is-correct', slot === +p.dataset.piece); }
      function resuelto() {
        const ps = [...boardEl.querySelectorAll('.pz-piece')];
        if (!ps.every(p => +p.dataset.slot === +p.dataset.piece)) return;
        terminado = true; ps.forEach(p => p.classList.add('is-locked')); btn.disabled = false;
        const win = document.createElement('div'); win.className = 'jg-win'; win.textContent = '¡Rompecabezas completado en ' + mov + ' movimientos!'; w.cuerpo.appendChild(win); win.scrollIntoView({ block: 'nearest' });
      }
      function intercambiar(a, b) {
        const sa = +a.dataset.slot, sb = +b.dataset.slot; mover(a, sb); mover(b, sa); mov++;
        w.cuerpo.querySelector('#pz-moves').textContent = mov + ' movimiento' + (mov === 1 ? '' : 's'); setTimeout(resuelto, T(380));
      }
      boardEl.addEventListener('pointerdown', ev => {
        if (terminado) return; const p = ev.target.closest && ev.target.closest('.pz-piece'); if (!p) return; ev.preventDefault();
        drag = p; movio = false; const r = p.getBoundingClientRect(); offX = ev.clientX - r.left; offY = ev.clientY - r.top; try { boardEl.setPointerCapture(ev.pointerId); } catch (_) { /* sin captura */ }
      });
      boardEl.addEventListener('pointermove', ev => {
        if (!drag || terminado) return; const br = boardEl.getBoundingClientRect(), nx = ev.clientX - br.left - offX, ny = ev.clientY - br.top - offY;
        if (!movio) { const p0 = pos(+drag.dataset.slot); if (Math.hypot(nx - p0.x, ny - p0.y) < 7) return; movio = true; drag.classList.add('is-drag'); }
        drag.style.left = nx + 'px'; drag.style.top = ny + 'px';
      });
      boardEl.addEventListener('pointerup', ev => {
        if (!drag || terminado) { drag = null; return; }
        const p = drag; drag = null;
        if (movio) {
          p.classList.remove('is-drag'); p.style.visibility = 'hidden'; const debajo = document.elementFromPoint(ev.clientX, ev.clientY); p.style.visibility = '';
          const dest = debajo && debajo.closest ? debajo.closest('.pz-piece') : null;
          if (dest && dest !== p && boardEl.contains(dest)) intercambiar(p, dest); else mover(p, +p.dataset.slot);
          if (sel) { sel.classList.remove('is-sel'); sel = null; } return;
        }
        if (!sel) { sel = p; p.classList.add('is-sel'); }
        else if (sel === p) { p.classList.remove('is-sel'); sel = null; }
        else { sel.classList.remove('is-sel'); intercambiar(sel, p); sel = null; }
      });
      boardEl.addEventListener('pointercancel', () => { if (drag) { drag.classList.remove('is-drag'); mover(drag, +drag.dataset.slot); drag = null; } });
      boardEl.querySelectorAll('.pz-piece').forEach(p => p.classList.toggle('is-correct', +p.dataset.slot === +p.dataset.piece));
    });
  }

  // ---------- Ahorcado ----------
  function svgAhorcado(errores) {
    const partes = [
      '<line x1="14" y1="150" x2="100" y2="150" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><line x1="34" y1="150" x2="34" y2="14" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><line x1="34" y1="14" x2="92" y2="14" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><line x1="92" y1="14" x2="92" y2="32" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',
      '<circle cx="92" cy="46" r="14" stroke="currentColor" stroke-width="3.5" fill="none"/>',
      '<line x1="92" y1="60" x2="92" y2="100" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>',
      '<line x1="92" y1="70" x2="74" y2="88" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>',
      '<line x1="92" y1="70" x2="110" y2="88" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>',
      '<line x1="92" y1="100" x2="76" y2="130" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>',
      '<line x1="92" y1="100" x2="108" y2="130" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>'];
    return '<svg viewBox="0 0 120 160" width="120" height="150" role="img" aria-label="Errores: ' + errores + ' de 6" style="color:' + (errores >= 6 ? 'var(--danger)' : 'inherit') + ';overflow:visible"><line x1="0" y1="150" x2="120" y2="150" stroke="rgba(120,145,168,.5)" stroke-width="2"/>' + partes.slice(0, 1 + Math.min(errores, 6)).join('') + '</svg>';
  }
  function juegoAhorcado(w, datos, ctx) {
    return new Promise(resolve => {
      w.onSalir = () => resolve(false);
      const lista = (datos.palabras || []).filter(p => p && sinTilde(p.palabra).length >= 3 && sinTilde(p.palabra).length <= 16);
      if (!lista.length) { resolve(true); return; }
      const MAX = 6, LETRAS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
      let elegido, palabra, errores, adivinadas, usadas, apoyo;
      function nueva() {
        const otras = lista.length > 1 ? lista.filter(p => p !== elegido) : lista;
        elegido = otras[Math.floor(Math.random() * otras.length)]; palabra = sinTilde(elegido.palabra);
        errores = 0; adivinadas = new Set(); usadas = new Set();
        const unicas = [...new Set(palabra.split(''))], n = Math.max(1, Math.min(2, Math.floor(unicas.length * 0.25)));
        apoyo = mezclar(unicas).slice(0, n); apoyo.forEach(l => { adivinadas.add(l); usadas.add(l); });
      }
      nueva();
      const btnRe = boton('jg-ghost', 'Intentar de nuevo'), btnGo = boton('jg-continuar', 'Continuar'); btnRe.style.display = 'none'; btnGo.disabled = true;
      w.botones(btnRe, btnGo); w.titulo('Ahorcado', ctx.tituloClase);
      function pintar() {
        w.cuerpo.innerHTML = '<div class="jg-lead">Adivina la palabra letra por letra antes de quedarte sin intentos. Las letras marcadas en verde son de apoyo.</div>' +
          (elegido.pista ? '<div class="jg-hint"><span>' + esc(elegido.pista) + '</span></div>' : '') +
          '<div class="ah-stage">' + svgAhorcado(errores) + '</div><div class="ah-word">' + palabra.split('').map(ch => (adivinadas.has(ch) ? ch : '_')).join(' ') + '</div>' +
          '<div class="ah-vidas">Intentos restantes: ' + (MAX - errores) + '</div><div class="ah-teclado">' +
          LETRAS.map(l => { const u = usadas.has(l); return '<button type="button" class="ah-key' + (u ? (apoyo.includes(l) ? ' is-hint' : (adivinadas.has(l) ? ' is-ok' : ' is-bad')) : '') + '" data-letra="' + l + '"' + (u ? ' disabled' : '') + '>' + l + '</button>'; }).join('') + '</div><div id="ah-res"></div>';
        w.cuerpo.querySelectorAll('[data-letra]').forEach(b => b.addEventListener('click', () => {
          const l = b.dataset.letra; usadas.add(l); if (palabra.includes(l)) adivinadas.add(l); else errores++;
          pintar();
          const gano = palabra.split('').every(ch => adivinadas.has(ch)), perdio = errores >= MAX;
          if (gano || perdio) {
            w.cuerpo.querySelector('#ah-res').innerHTML = '<div class="jg-win" style="color:' + (gano ? 'var(--success)' : 'var(--text-light)') + '">' + (gano ? '¡Bien hecho!' : 'La palabra era: ' + esc(palabra)) + '</div>';
            w.cuerpo.querySelectorAll('[data-letra]').forEach(x => { x.disabled = true; });
            btnGo.disabled = false; if (perdio) btnRe.style.display = '';
          }
        }));
      }
      pintar();
      btnRe.onclick = () => { nueva(); btnRe.style.display = 'none'; btnGo.disabled = true; pintar(); };
      btnGo.onclick = () => resolve(true);
    });
  }

  // ---------- Punto de entrada ----------
  const JUEGOS = { sopa_letras: juegoSopa, memorama: juegoMemorama, rompecabezas: juegoRompe, ahorcado: juegoAhorcado };
  // El juego de la clase: si el sitio ya trae los datos se usan; si no, los entrega el servidor (solo a quien tiene acceso). Devuelve { juego } | null si no se pudo.
  async function cargarJuego(courseId, indice, l) {
    if (l.juego && l.juego.tipo && l.juego.datos && typeof l.juego.datos === 'object') return { juego: l.juego };
    try { const r = await certFetch('/api/cursos/' + encodeURIComponent(courseId) + '/clases/' + indice + '/juego'); return { juego: r && r.juego && r.juego.tipo ? r.juego : null }; }
    catch (e) {
      if (e && e.status === 402 && window.showPaywallOverlay) showPaywallOverlay(); else aviso((e && e.message) || 'No se pudo cargar la actividad de la clase. Intenta de nuevo.');
      return null;
    }
  }
  // Devuelve true si el alumno resolvió las preguntas y el juego (o si la clase no tiene ninguno). Con false la clase NO se marca como vista.
  window.ftActividad = async function (courseId, lessonIndex) {
    const curso = (siteData.courses || []).find(c => c.id === courseId);
    const l = curso && curso.lessons && curso.lessons[lessonIndex];
    if (!l) return true;
    let preguntas = (l.preguntas || []).map((q, k) => q && q.pregunta ? Object.assign({}, q, { _k: k }) : null).filter(Boolean); // _k = lugar de la pregunta en la clase
    // Si el sitio público no trae las preguntas de esta clase, las entrega el servidor (el mismo que las califica y las exige para marcarla como vista)
    if (!preguntas.length) {
      try { const r = await certFetch('/api/cursos/' + encodeURIComponent(courseId) + '/clases/' + lessonIndex + '/preguntas'); preguntas = ((r && r.preguntas) || []).filter(q => q && q.pregunta); }
      catch (e) { if (e && e.status === 402 && window.showPaywallOverlay) { showPaywallOverlay(); return false; } /* sin preguntas en el servidor o sin conexión: se sigue sin ellas */ }
    }
    const cargado = await cargarJuego(courseId, lessonIndex, l);
    if (!cargado) return false;
    const juego = cargado.juego;
    if (!preguntas.length && !(juego && JUEGOS[juego.tipo])) return true;
    const w = ventana(), ctx = { curso, tituloClase: l.title || '' };
    try {
      if (preguntas.length && !(await correrQuiz(w, preguntas, courseId, lessonIndex, ctx.tituloClase))) return false;
      if (juego && JUEGOS[juego.tipo] && !(await JUEGOS[juego.tipo](w, juego.datos || {}, ctx))) return false;
      return true;
    } finally { w.cerrar(); }
  };

  // ---------- Visor de la clase: X, flecha (abrir aparte) y Marcar como vista ----------
  const ICO_ABRIR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>';
  const ICO_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
  function indiceClase(op) {
    const c = (siteData.courses || []).find(x => String(x.id) === String(op.courseId));
    const i = c && c.lessons ? c.lessons.findIndex(x => String(x.id) === String(op.lessonId)) : -1;
    return i >= 0 ? { curso: c, i } : null;
  }
  function ponerControles(op) {
    const modal = document.getElementById('videoModal'); if (!modal || !modal.classList.contains('active')) return;
    const cab = modal.querySelector('.video-modal-header'), cerrarBtn = cab && cab.querySelector('.video-close'); if (!cab || !cerrarBtn) return;
    const acc = document.createElement('div'); acc.className = 'jgc-vacc'; acc.id = 'jgcVisorAcc';
    const aparte = document.createElement('button'); aparte.type = 'button'; aparte.title = 'Abrir aparte'; aparte.setAttribute('aria-label', 'Abrir el video aparte');
    aparte.innerHTML = ICO_ABRIR + '<span class="jgc-txt">Abrir aparte</span>';
    aparte.onclick = () => {
      const f = document.querySelector('#videoContainer iframe'), src = f && f.src;
      if (!src) { aviso('El video se está preparando. Intenta en un momento.'); return; }
      window.open(src, '_blank', 'noopener'); if (typeof closeVideo === 'function') closeVideo();
    };
    acc.appendChild(aparte);
    const ref = op && op.courseId !== undefined && op.lessonId !== undefined ? indiceClase(op) : null;
    if (ref) {
      const hecha = ((getCourseProgress(ref.curso.id).completed) || []).includes(ref.i);
      const vista = document.createElement('button'); vista.type = 'button'; vista.className = 'jgc-vista';
      vista.innerHTML = ICO_CHECK + '<span class="jgc-txt">' + (hecha ? 'Ya vista' : 'Marcar como vista') + '</span>'; vista.disabled = hecha;
      vista.onclick = () => { if (typeof closeVideo === 'function') closeVideo(); markLessonComplete(ref.curso.id, ref.i); }; // las preguntas y el juego salen sobre el panel, no encima del reproductor
      acc.appendChild(vista);
    }
    cab.insertBefore(acc, cerrarBtn);
  }
  const abrirOriginal = window.openVideo;
  if (typeof abrirOriginal === 'function') {
    window.openVideo = function (title, url, options) {
      const previo = document.getElementById('jgcVisorAcc'); if (previo) previo.remove();
      const r = abrirOriginal.apply(this, arguments);
      try { ponerControles(options || {}); } catch (_) { /* el visor sigue funcionando sin los botones */ }
      return r;
    };
  }
})();
