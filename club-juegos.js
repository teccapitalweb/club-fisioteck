/* Club FisioTeck — preguntas y juegos dinámicos al terminar una clase (como Alintec y Zoorigen).
   Lo configura el administrador por clase (lesson.preguntas y lesson.juego en content.json):
   sopa de letras, memorama, rompecabezas y ahorcado. Para continuar hay que acertar al menos el 60 % de las preguntas
   y completar el juego. No afecta el certificado: el avance y el certificado los valida el servidor.
   Depende de index.html: siteData, getCourseProgress, driveImageUrl (opcional), showToast. */
(function () {
  'use strict';
  const $ = (t, c, txt) => { const n = document.createElement(t); if (c) n.className = c; if (txt != null) n.textContent = txt; return n; };
  const mezclar = a => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
  const esperar = ms => new Promise(r => setTimeout(r, ms));
  const reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  // ---------- Ventana ----------
  let ov = null;
  function ventana(titulo) {
    if (ov) ov.remove();
    ov = $('div', 'ftj-ov'); ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true');
    const caja = $('div', 'ftj-caja'), cab = $('div', 'ftj-cab');
    const h = $('h3', null, titulo), x = $('button', 'ftj-x', '×'); x.type = 'button'; x.setAttribute('aria-label', 'Salir');
    cab.append(h, x); const cuerpo = $('div', 'ftj-cuerpo');
    caja.append(cab, cuerpo); ov.appendChild(caja); document.body.appendChild(ov);
    document.body.classList.add('ftj-abierto');
    return { cuerpo, titulo: h, salir: x, cerrar() { if (ov) { ov.remove(); ov = null; } document.body.classList.remove('ftj-abierto'); } };
  }

  // ---------- Preguntas ----------
  function correrQuiz(w, preguntas, courseId, lessonIndex) {
    return new Promise(resolve => {
      w.salir.onclick = () => { w.cerrar(); resolve(false); };
      let lista = preguntas.slice(), i = 0, ok = 0;
      function pregunta() {
        const q = lista[i]; w.cuerpo.textContent = '';
        w.titulo.textContent = 'Preguntas de la clase · ' + (i + 1) + ' de ' + lista.length;
        w.cuerpo.append($('p', 'ftj-q', q.pregunta));
        const opciones = q.tipo === 'vof' ? ['Verdadero', 'Falso'] : q.opciones;
        const caja = $('div', 'ftj-ops');
        opciones.forEach((o, n) => {
          const b = $('button', 'ftj-op', o); b.type = 'button';
          b.onclick = async () => {
            caja.querySelectorAll('button').forEach(x => { x.disabled = true; });
            // la respuesta correcta solo la conoce el servidor (como Alintec): se califica allá y devuelve cuál era
            let r;
            try { r = await certFetch('/api/cursos/' + encodeURIComponent(courseId) + '/quiz', { method: 'POST', body: JSON.stringify({ sessionIndex: lessonIndex, pregunta: q._k, respuesta: n }) }); }
            catch (e) { caja.querySelectorAll('button').forEach(x => { x.disabled = false; }); showToast(e.message); return; }
            const bien = !!r.acertada;
            if (bien) ok++;
            b.classList.add(bien ? 'bien' : 'mal');
            if (!bien && caja.children[r.correcta]) caja.children[r.correcta].classList.add('bien');
            await esperar(reduce ? 200 : 900);
            i++; if (i < lista.length) pregunta(); else fin();
          };
          caja.appendChild(b);
        });
        w.cuerpo.appendChild(caja);
      }
      function fin() {
        const pct = Math.round(ok / lista.length * 100), pasa = pct >= 60;
        w.titulo.textContent = pasa ? '¡Muy bien!' : 'Casi lo logras';
        w.cuerpo.textContent = '';
        w.cuerpo.append($('div', 'ftj-num', ok + ' / ' + lista.length), $('p', 'ftj-txt', pasa ? 'Acertaste el ' + pct + ' %. Puedes continuar.' : 'Acertaste el ' + pct + ' %. Necesitas al menos 60 % para continuar. Repasa la clase e inténtalo otra vez.'));
        const b = $('button', 'ftj-btn', pasa ? 'Continuar' : 'Reintentar'); b.type = 'button';
        b.onclick = () => { if (pasa) resolve(true); else { lista = mezclar(preguntas); i = 0; ok = 0; pregunta(); } };
        w.cuerpo.appendChild(b);
      }
      pregunta();
    });
  }

  // ---------- Sopa de letras ----------
  // Como Zoorigen y Alintec: de 3 a 10 palabras; si alguna no cabe se omite y se juega con las demás (el juego solo se salta si caben menos de 3);
  // se marca arrastrando o tocando la primera y la última letra; barra de progreso y un color por palabra encontrada.
  const DIRS = [[0, 1], [1, 0], [1, 1], [-1, 1]];
  const COLORES = ['#0D5FA0', '#159E92', '#C2760B', '#7C3AED', '#DC2D3F', '#0F9D58', '#0891B2', '#B45309', '#DB2777', '#4D7C0F'];
  const limpiar = t => String(t || '').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, m => m).replace(/[^A-ZÑ]/g, '');
  const sinTilde = t => String(t || '').toUpperCase().split('').map(ch => (ch === 'Ñ' ? 'Ñ' : ch.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))).join('').replace(/[^A-ZÑ]/g, '');
  function crearSopa(palabras) {
    const mayor = Math.max(...palabras.map(p => p.length)), n = Math.min(15, Math.max(10, mayor + 2));
    let mejor = null;
    for (let intento = 0; intento < 40; intento++) {
      const g = Array.from({ length: n }, () => Array(n).fill('')), puestas = [];
      for (const p of mezclar(palabras).sort((a, b) => b.length - a.length)) {
        for (let t = 0; t < 200; t++) {
          const d = DIRS[Math.floor(Math.random() * DIRS.length)], f = Math.floor(Math.random() * n), c = Math.floor(Math.random() * n);
          const ff = f + d[0] * (p.length - 1), cc = c + d[1] * (p.length - 1);
          if (ff < 0 || ff >= n || cc < 0 || cc >= n) continue;
          let cabe = true;
          for (let k = 0; k < p.length; k++) { const x = g[f + d[0] * k][c + d[1] * k]; if (x && x !== p[k]) { cabe = false; break; } }
          if (!cabe) continue;
          for (let k = 0; k < p.length; k++) g[f + d[0] * k][c + d[1] * k] = p[k];
          puestas.push({ p, f, c, d }); break;
        }
      }
      if (!mejor || puestas.length > mejor.puestas.length) mejor = { n, g, puestas };
      if (puestas.length === palabras.length) break;
    }
    if (!mejor || mejor.puestas.length < 3) return null; // menos de 3 palabras caben: no se bloquea al alumno
    const AB = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    for (let f = 0; f < mejor.n; f++) for (let c = 0; c < mejor.n; c++) if (!mejor.g[f][c]) mejor.g[f][c] = AB[Math.floor(Math.random() * AB.length)];
    return mejor;
  }
  function juegoSopa(w, datos) {
    return new Promise(resolve => {
      w.salir.onclick = () => { w.cerrar(); resolve(false); };
      const limpias = [...new Set((datos.palabras || []).map(sinTilde).filter(p => p.length >= 2 && p.length <= 14))].slice(0, 10);
      const sopa = limpias.length >= 3 ? crearSopa(limpias) : null;
      if (!sopa) { resolve(true); return; }
      const palabras = sopa.puestas.map(x => x.p);
      w.titulo.textContent = 'Sopa de letras';
      w.cuerpo.textContent = '';
      const prog = $('div', 'ftj-prog'), barra = $('i'); prog.appendChild(barra);
      const conteo = $('p', 'ftj-txt', 'Encontradas: 0 / ' + palabras.length);
      w.cuerpo.append($('p', 'ftj-txt', 'Arrastra sobre las letras, o toca la primera y la última letra de cada palabra (en línea recta; también al revés).'), prog, conteo);
      const tabla = $('div', 'ftj-sopa'); tabla.style.gridTemplateColumns = 'repeat(' + sopa.n + ', 1fr)';
      const celdas = [];
      for (let f = 0; f < sopa.n; f++) for (let c = 0; c < sopa.n; c++) { const e = $('div', 'ftj-cel', sopa.g[f][c]); e.dataset.f = f; e.dataset.c = c; celdas.push(e); tabla.appendChild(e); }
      const lista = $('div', 'ftj-pal'); const chips = {};
      palabras.forEach(p => { const sp = $('span', null, p); chips[p] = sp; lista.appendChild(sp); });
      w.cuerpo.append(tabla, lista);
      const hechas = new Set();
      let ini = null, camino = [], arrastro = false, primera = null;
      const celda = (f, c) => celdas[f * sopa.n + c];
      const deEvento = ev => { const el = document.elementFromPoint(ev.clientX, ev.clientY); return el && el.classList.contains('ftj-cel') ? { f: +el.dataset.f, c: +el.dataset.c } : null; };
      const linea = (a, b) => {
        let df = b.f - a.f, dc = b.c - a.c;
        if (!df && !dc) return [a];
        if (Math.abs(df) !== Math.abs(dc) && df && dc) { if (Math.abs(df) > Math.abs(dc)) dc = 0; else df = 0; }
        const pasos = Math.max(Math.abs(df), Math.abs(dc)), sf = Math.sign(df), sc = Math.sign(dc), r = [];
        for (let k = 0; k <= pasos; k++) r.push({ f: a.f + sf * k, c: a.c + sc * k });
        return r;
      };
      const pintar = () => celdas.forEach(e => e.classList.remove('sel'));
      const marcar = cam => { pintar(); cam.forEach(q => { const e = celda(q.f, q.c); if (e) e.classList.add('sel'); }); };
      function evaluar(cam) {
        const txt = cam.map(q => sopa.g[q.f][q.c]).join(''), rev = txt.split('').reverse().join('');
        const hit = palabras.find(p => !hechas.has(p) && (p === txt || p === rev));
        pintar();
        if (hit) {
          const color = COLORES[hechas.size % COLORES.length]; hechas.add(hit);
          cam.forEach(q => { const e = celda(q.f, q.c); e.classList.add('ok'); e.style.background = color; e.style.color = '#fff'; });
          chips[hit].classList.add('ok'); chips[hit].style.background = color;
          barra.style.width = Math.round(hechas.size / palabras.length * 100) + '%'; conteo.textContent = 'Encontradas: ' + hechas.size + ' / ' + palabras.length;
          if (hechas.size === palabras.length) setTimeout(() => resultado(w, '¡Encontraste todas las palabras!', resolve), reduce ? 100 : 500);
        }
        return !!hit;
      }
      tabla.addEventListener('pointerdown', ev => { const p = deEvento(ev); if (!p) return; ini = p; arrastro = false; marcar([p]); try { tabla.setPointerCapture(ev.pointerId); } catch (_) { /* sin captura */ } ev.preventDefault(); });
      tabla.addEventListener('pointermove', ev => { if (!ini) return; const p = deEvento(ev); if (!p) return; if (p.f !== ini.f || p.c !== ini.c) arrastro = true; camino = linea(ini, p); marcar(camino); });
      tabla.addEventListener('pointerup', ev => {
        if (!ini) return;
        if (arrastro) { evaluar(camino.length ? camino : [ini]); primera = null; }
        else if (!primera) { primera = ini; marcar([ini]); }           // toque: primera letra
        else { const cam = linea(primera, ini); if (!evaluar(cam)) marcar([]); primera = null; } // toque: última letra
        ini = null; camino = [];
      });
      tabla.addEventListener('pointercancel', () => { pintar(); ini = null; primera = null; });
    });
  }

  // ---------- Memorama ----------
  function juegoMemorama(w, datos) {
    return new Promise(resolve => {
      w.salir.onclick = () => { w.cerrar(); resolve(false); };
      const pares = (datos.pares || []).filter(p => p && p.termino && p.definicion).slice(0, 10);
      const cartas = mezclar(pares.flatMap((p, i) => [{ i, t: p.termino, k: 'T' }, { i, t: p.definicion, k: 'D' }]));
      w.titulo.textContent = 'Memorama'; w.cuerpo.textContent = '';
      const info = $('p', 'ftj-txt', 'Une cada término con su definición. Movimientos: 0');
      const tab = $('div', 'ftj-mem'); w.cuerpo.append(info, tab);
      let abiertas = [], bloqueo = false, mov = 0, aciertos = 0;
      cartas.forEach(c => {
        const b = $('button', 'ftj-carta'); b.type = 'button';
        b.append($('span', 'cara', '?'), $('span', 'dorso', c.t));
        b.onclick = async () => {
          if (bloqueo || b.classList.contains('abierta') || b.classList.contains('lista')) return;
          b.classList.add('abierta'); abiertas.push({ b, c });
          if (abiertas.length < 2) return;
          mov++; info.textContent = 'Une cada término con su definición. Movimientos: ' + mov;
          const [x, y] = abiertas; bloqueo = true;
          if (x.c.i === y.c.i && x.c.k !== y.c.k) { x.b.classList.add('lista'); y.b.classList.add('lista'); aciertos++; abiertas = []; bloqueo = false; if (aciertos === pares.length) setTimeout(() => resultado(w, '¡Todas las parejas! en ' + mov + ' movimientos', resolve), reduce ? 100 : 500); }
          else { await esperar(reduce ? 300 : 950); x.b.classList.remove('abierta'); y.b.classList.remove('abierta'); abiertas = []; bloqueo = false; }
        };
        tab.appendChild(b);
      });
    });
  }

  // ---------- Rompecabezas ----------
  // Como Zoorigen y Alintec: imagen de referencia, contador de movimientos y la dirección de la imagen se revisa (solo http(s), assets/ o data:image).
  const urlSegura = u => /^(https?:\/\/|assets\/|data:image\/)/i.test(String(u || '').trim()) ? String(u).trim() : '';
  function juegoRompe(w, datos, curso) {
    return new Promise(resolve => {
      w.salir.onclick = () => { w.cerrar(); resolve(false); };
      const n = [3, 4, 5].includes(+datos.dificultad) ? +datos.dificultad : 3;
      let url = (datos.imagenUrl || '').trim() || (curso && curso.thumbnail) || '';
      if (typeof driveImageUrl === 'function' && /drive\.google/.test(url)) url = driveImageUrl(url);
      url = urlSegura(url);
      w.titulo.textContent = 'Rompecabezas'; w.cuerpo.textContent = '';
      const info = $('p', 'ftj-txt', 'Toca dos piezas para intercambiarlas hasta armar la imagen. Movimientos: 0');
      const ref = $('div', 'ftj-ref'); if (url) { ref.style.backgroundImage = "url('" + url.replace(/'/g, '%27') + "')"; ref.title = 'Así debe quedar'; ref.setAttribute('aria-label', 'Imagen de referencia'); }
      const tab = $('div', 'ftj-rompe'); tab.style.gridTemplateColumns = 'repeat(' + n + ', 1fr)'; w.cuerpo.append(info, url ? ref : document.createTextNode(''), tab);
      let orden = mezclar([...Array(n * n).keys()]);
      while (orden.every((v, k) => v === k)) orden = mezclar(orden);
      let sel = null, mov = 0;
      const pintar = () => {
        tab.textContent = '';
        orden.forEach((pieza, pos) => {
          const b = $('button', 'ftj-pieza' + (pos === sel ? ' sel' : '') + (pieza === pos ? ' bien' : '')); b.type = 'button'; b.setAttribute('aria-label', 'Pieza ' + (pos + 1));
          if (url) { b.style.backgroundImage = "url('" + url.replace(/'/g, '%27') + "')"; b.style.backgroundSize = (n * 100) + '% ' + (n * 100) + '%'; b.style.backgroundPosition = (n > 1 ? (pieza % n) / (n - 1) * 100 : 0) + '% ' + (n > 1 ? Math.floor(pieza / n) / (n - 1) * 100 : 0) + '%'; }
          else b.textContent = pieza + 1;
          b.onclick = () => {
            if (sel === null) { sel = pos; pintar(); return; }
            if (sel !== pos) { [orden[sel], orden[pos]] = [orden[pos], orden[sel]]; mov++; info.textContent = 'Toca dos piezas para intercambiarlas hasta armar la imagen. Movimientos: ' + mov; }
            sel = null; pintar();
            if (orden.every((v, k) => v === k)) setTimeout(() => resultado(w, '¡Rompecabezas armado en ' + mov + ' movimientos!', resolve), reduce ? 100 : 600);
          };
          tab.appendChild(b);
        });
      };
      pintar();
    });
  }

  // ---------- Ahorcado ----------
  // Como Zoorigen y Alintec: muñeco que se dibuja con cada error (6 errores), una o dos letras de ayuda al inicio, palabras en orden al azar y,
  // al perder, se intenta con otra palabra (si hay). Los acentos no cuentan al adivinar (la Ñ sí).
  const SVG_NS = 'http://www.w3.org/2000/svg';
  function muneco(fallos) {
    const svg = document.createElementNS(SVG_NS, 'svg'); svg.setAttribute('viewBox', '0 0 120 140'); svg.setAttribute('class', 'ftj-muneco'); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'Errores: ' + fallos + ' de 6');
    const parte = (tag, attrs) => { const e = document.createElementNS(SVG_NS, tag); Object.keys(attrs).forEach(k => e.setAttribute(k, attrs[k])); svg.appendChild(e); };
    const f = { fill: 'none', stroke: 'currentColor', 'stroke-width': 4, 'stroke-linecap': 'round' };
    parte('path', Object.assign({ d: 'M10 132 H70 M25 132 V10 H85 V28' }, f));
    if (fallos > 0) parte('circle', Object.assign({ cx: 85, cy: 40, r: 12 }, f));
    if (fallos > 1) parte('path', Object.assign({ d: 'M85 52 V92' }, f));
    if (fallos > 2) parte('path', Object.assign({ d: 'M85 62 L68 80' }, f));
    if (fallos > 3) parte('path', Object.assign({ d: 'M85 62 L102 80' }, f));
    if (fallos > 4) parte('path', Object.assign({ d: 'M85 92 L70 116' }, f));
    if (fallos > 5) parte('path', Object.assign({ d: 'M85 92 L100 116' }, f));
    return svg;
  }
  function juegoAhorcado(w, datos) {
    return new Promise(resolve => {
      w.salir.onclick = () => { w.cerrar(); resolve(false); };
      const validas = (datos.palabras || []).filter(p => p && sinTilde(p.palabra).length >= 3 && sinTilde(p.palabra).length <= 16);
      if (!validas.length) { resolve(true); return; }
      const cola = mezclar(validas); let idx = 0, hechas = 0;
      const TECLAS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
      function ronda(repetir) {
        // si se perdió, se pasa a otra palabra cuando hay más de una
        if (repetir && cola.length > 1) { cola.push(cola.splice(idx, 1)[0]); }
        const p = cola[idx], objetivo = String(p.palabra).toUpperCase(), obj = objetivo.split('').map(ch => (ch === 'Ñ' ? 'Ñ' : ch.normalize('NFD').replace(/[\u0300-\u036f]/g, '')));
        const usadas = new Set(); let fallos = 0;
        w.titulo.textContent = 'Ahorcado · palabra ' + (hechas + 1) + ' de ' + cola.length; w.cuerpo.textContent = '';
        const pista = $('p', 'ftj-txt', p.pista ? 'Pista: ' + p.pista : 'Adivina la palabra'), vidas = $('div', 'ftj-vidas'), pal = $('div', 'ftj-letras'), tec = $('div', 'ftj-teclado');
        w.cuerpo.append(pista, vidas, pal, tec);
        const dibujar = () => { pal.textContent = obj.map(ch => (usadas.has(ch) ? ch : (/[A-ZÑ]/.test(ch) ? '_' : ch))).join(' '); vidas.textContent = ''; vidas.appendChild(muneco(fallos)); vidas.appendChild($('span', 'ftj-nerr', (6 - fallos) + ' intentos restantes')); };
        const botones = {};
        const poner = t => {
          const b = botones[t]; b.disabled = true; usadas.add(t);
          if (obj.includes(t)) b.classList.add('bien'); else { fallos++; b.classList.add('mal'); }
        };
        TECLAS.forEach(t => {
          const b = $('button', 'ftj-tecla', t); b.type = 'button'; botones[t] = b;
          b.onclick = () => {
            poner(t); dibujar();
            if (obj.every(ch => usadas.has(ch) || !/[A-ZÑ]/.test(ch))) { tec.querySelectorAll('button').forEach(x => { x.disabled = true; }); setTimeout(() => { hechas++; idx++; if (idx < cola.length) ronda(false); else resultado(w, '¡Completaste todas las palabras!', resolve); }, reduce ? 200 : 900); }
            else if (fallos >= 6) { tec.querySelectorAll('button').forEach(x => { x.disabled = true; }); pal.textContent = objetivo.split('').join(' '); const r = $('button', 'ftj-btn', cola.length > 1 ? 'Intentar con otra palabra' : 'Intentar otra vez'); r.type = 'button'; r.onclick = () => ronda(true); w.cuerpo.appendChild(r); }
          };
          tec.appendChild(b);
        });
        // letras de ayuda (hasta el 25 % de las letras distintas, mínimo 1)
        const unicas = [...new Set(obj.filter(ch => /[A-ZÑ]/.test(ch)))], ayuda = mezclar(unicas).slice(0, Math.max(1, Math.floor(unicas.length * 0.25)));
        ayuda.forEach(t => { botones[t].disabled = true; botones[t].classList.add('bien', 'ayuda'); usadas.add(t); });
        dibujar();
      }
      ronda(false);
    });
  }

  const TROFEO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4h8v6a4 4 0 0 1-8 0zM8 6H4v2a3 3 0 0 0 4 2.8M16 6h4v2a3 3 0 0 1-4 2.8M12 14v4M8 21h8"/></svg>';
  function resultado(w, mensaje, resolve) {
    w.titulo.textContent = '¡Listo!'; w.cuerpo.textContent = '';
    const ico = $('div', 'ftj-num'); ico.innerHTML = TROFEO; ico.style.cssText = 'color:#C2760B;width:64px;height:64px;margin:0 auto';
    w.cuerpo.append(ico, $('p', 'ftj-txt', mensaje));
    const b = $('button', 'ftj-btn', 'Continuar'); b.type = 'button'; b.onclick = () => resolve(true);
    w.cuerpo.appendChild(b);
  }

  // ---------- Punto de entrada ----------
  // Devuelve true si el alumno completó las preguntas y el juego (o si la clase no tiene ninguno).
  window.ftActividad = async function (courseId, lessonIndex) {
    const curso = (siteData.courses || []).find(c => c.id === courseId);
    const l = curso && curso.lessons && curso.lessons[lessonIndex];
    if (!l) return true;
    const preguntas = (l.preguntas || []).map((q, k) => q && q.pregunta ? Object.assign({}, q, { _k: k }) : null).filter(Boolean); // _k = lugar de la pregunta en la clase
    const juego = l.juego && l.juego.tipo ? l.juego : null;
    if (!preguntas.length && !juego) return true;
    const w = ventana('Antes de continuar');
    try {
      if (preguntas.length && !(await correrQuiz(w, mezclar(preguntas), courseId, lessonIndex))) return false;
      if (juego) {
        const f = { sopa_letras: juegoSopa, memorama: juegoMemorama, rompecabezas: (ww, d) => juegoRompe(ww, d, curso), ahorcado: juegoAhorcado }[juego.tipo];
        if (f && !(await f(w, juego.datos || {}))) return false;
      }
      return true;
    } finally { w.cerrar(); }
  };
})();
