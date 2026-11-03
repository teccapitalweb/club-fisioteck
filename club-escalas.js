/* Club FisioTeck — escalas clínicas para Pacientes: dibuja el formulario de cada escala, valida las respuestas y calcula el puntaje.
   El contenido (preguntas, opciones, rangos) vive en club-escalas-datos.js para poder revisarlo sin tocar este código.
   Uso: ftEscalas.lista() · ftEscalas.formulario(id) → HTML · ftEscalas.leer(id, raiz) → { ok, entrada } | { ok:false, error }.
   Herramienta de apoyo: no sustituye el criterio profesional ni constituye un diagnóstico. */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const D = () => window.FT_ESCALAS || [];
  const buscar = id => D().find(e => e.id === id);
  const redondear = (n, d) => Math.round(n * Math.pow(10, d || 0)) / Math.pow(10, d || 0);
  const opciones = (desde, hasta) => '<option value="">Elige…</option>' + Array.from({ length: hasta - desde + 1 }, (_, k) => '<option value="' + (desde + k) + '">' + (desde + k) + '</option>').join('');

  function formulario(id) {
    const e = buscar(id); if (!e) return '';
    if (e.tipo === 'tiempo') return '<label>Tiempo en segundos<input type="number" id="feSeg" min="1" max="300" step="0.1" inputmode="decimal" placeholder="Por ejemplo, 11.5"></label>';
    if (e.tipo === 'items') {
      const comunes = e.opciones;
      return e.items.map((it, i) => {
        const ops = comunes || it.o;
        return '<label class="fe-item"><span>' + esc(it.t) + '</span><select data-i="' + i + '"><option value="">Elige…</option>' + ops.map((t, v) => '<option value="' + v + '">' + v + ' · ' + esc(t) + '</option>').join('') + '</select></label>';
      }).join('');
    }
    if (e.tipo === 'spadi') {
      const bloque = (tit, lista, pref) => '<h5>' + tit + '</h5>' + lista.map((t, i) => '<label class="fe-item"><span>' + esc(t) + '</span><select data-' + pref + '="' + i + '">' + opciones(0, 10) + '</select></label>').join('');
      return bloque('Dolor (0 sin dolor, 10 el peor)', e.dolor, 'd') + bloque('Dificultad (0 ninguna, 10 necesita ayuda)', e.disc, 'c');
    }
    if (e.tipo === 'psfs') return [0, 1, 2].map(i => '<div class="fe-psfs"><input type="text" maxlength="80" data-pa="' + i + '" placeholder="Actividad ' + (i + 1) + (i ? ' (opcional)' : '') + '" aria-label="Actividad ' + (i + 1) + '"><select data-pv="' + i + '" aria-label="Calificación de la actividad ' + (i + 1) + '">' + opciones(0, 10) + '</select></div>').join('') + '<p class="fp-ref">0 es incapaz de hacerla y 10 la hace como antes de lesionarse.</p>';
    if (e.tipo === 'cuatro') {
      const pos = ['1. Pies juntos (uno al lado del otro)', '2. Semitándem (talón de un pie tocando el costado del dedo gordo del otro)', '3. Tándem (un pie justo delante del otro)', '4. Sobre un solo pie'];
      return pos.map((t, i) => '<label class="fe-item"><span>' + t + '</span><select data-q="' + i + '">' + opciones(0, 10) + '</select></label>').join('') + '<p class="fp-ref">Segundos que mantuvo la posición (de 0 a 10). Si en una posición no llegó a 10 s, deja las siguientes en 0.</p>';
    }
    if (e.tipo === 'actividades') return [0, 1, 2, 3, 4].map(i => '<div class="fe-psfs"><input type="text" maxlength="80" data-aa="' + i + '" placeholder="Actividad ' + (i + 1) + (i ? ' (opcional)' : '') + '" aria-label="Actividad ' + (i + 1) + '"><select data-av="' + i + '" aria-label="Calificación de la actividad ' + (i + 1) + '">' + opciones(0, 10) + '</select></div>').join('') + '<p class="fp-ref">0 es no poder hacerla y 10 es hacerla sin ninguna dificultad.</p>';
    if (e.tipo === 'silla') return '<div class="fp-fila"><label>Sexo<select id="feSexo"><option value="">Elige…</option><option value="hombre">Hombre</option><option value="mujer">Mujer</option></select></label><label>Edad (60 a 94)<input type="number" id="feEdad" min="60" max="94" inputmode="numeric"></label></div><label>Repeticiones en 30 segundos<input type="number" id="feRep" min="0" max="60" inputmode="numeric"></label>';
    return '';
  }

  const rango = (lista, v) => (lista.find(r => (r.min == null || v >= r.min) && (r.max == null || v <= r.max)) || {}).txt || '';
  function leer(id, raiz) {
    const e = buscar(id); if (!e || !raiz) return { ok: false, error: 'Elige una escala.' };
    const base = { f: Date.now(), id: e.id, nombre: e.corto };
    if (e.tipo === 'tiempo') {
      const s = Number((raiz.querySelector('#feSeg') || {}).value);
      if (!(s > 0 && s <= 300)) return { ok: false, error: 'Escribe el tiempo en segundos (entre 1 y 300).' };
      const txt = e.interp.find(r => s <= r.max).txt + (s >= 12 ? ' · 12 s o más: posible riesgo de caídas en adultos mayores' : '');
      return { ok: true, entrada: Object.assign(base, { p: redondear(s, 1), max: null, txt }) };
    }
    if (e.tipo === 'items') {
      const sel = [...raiz.querySelectorAll('select[data-i]')];
      if (sel.some(s => s.value === '')) return { ok: false, error: 'Faltan respuestas: contesta todos los puntos de la escala.' };
      const p = sel.reduce((t, s) => t + Number(s.value), 0);
      let txt = e.interp.length ? rango(e.interp, p) : p + ' de ' + e.max + ' · ' + redondear(p / e.max * 100) + ' % de la función';
      if (e.corte && p < e.corte.menorQue) txt += ' · ' + e.corte.txt;
      return { ok: true, entrada: Object.assign(base, { p, max: e.max, txt, det: { r: sel.map(s => Number(s.value)) } }) };
    }
    if (e.tipo === 'spadi') {
      const d = [...raiz.querySelectorAll('select[data-d]')], c = [...raiz.querySelectorAll('select[data-c]')];
      if ([...d, ...c].some(s => s.value === '')) return { ok: false, error: 'Faltan respuestas: contesta las 13 preguntas.' };
      const sd = d.reduce((t, s) => t + Number(s.value), 0), sc = c.reduce((t, s) => t + Number(s.value), 0);
      const dolor = redondear(sd / (d.length * 10) * 100, 1), disc = redondear(sc / (c.length * 10) * 100, 1), total = redondear((sd + sc) / ((d.length + c.length) * 10) * 100, 1);
      return { ok: true, entrada: Object.assign(base, { p: total, max: 100, txt: 'Dolor ' + dolor + ' % · Dificultad ' + disc + ' % (menos es mejor)', det: { dolor, disc } }) };
    }
    if (e.tipo === 'psfs') {
      const act = [0, 1, 2].map(i => ({ t: (raiz.querySelector('[data-pa="' + i + '"]') || {}).value.trim(), v: (raiz.querySelector('[data-pv="' + i + '"]') || {}).value })).filter(a => a.t || a.v !== '');
      if (!act.length) return { ok: false, error: 'Escribe al menos una actividad y su calificación.' };
      if (act.some(a => !a.t || a.v === '')) return { ok: false, error: 'Cada actividad necesita su nombre y su calificación de 0 a 10.' };
      const p = redondear(act.reduce((t, a) => t + Number(a.v), 0) / act.length, 1);
      return { ok: true, entrada: Object.assign(base, { p, max: 10, txt: act.length + (act.length === 1 ? ' actividad' : ' actividades') + ' · promedio ' + p + ' de 10', det: { act: act.map(a => ({ t: a.t.slice(0, 80), v: Number(a.v) })) } }) };
    }
    if (e.tipo === 'cuatro') {
      const q = [...raiz.querySelectorAll('select[data-q]')];
      if (q.some(s => s.value === '')) return { ok: false, error: 'Escribe los segundos de las 4 posiciones (0 si no logró mantenerla).' };
      const seg = q.map(s => Number(s.value));
      let logradas = 0; for (const s of seg) { if (s >= 10) logradas++; else break; }
      const tandem = seg[2], txt = 'Mantuvo 10 s las primeras ' + logradas + ' de 4 posiciones' + (tandem < 10 ? ' · No mantuvo el tándem 10 s: mayor riesgo de caídas (CDC STEADI)' : ' · Mantuvo el tándem 10 s');
      return { ok: true, entrada: Object.assign(base, { p: logradas, max: 4, txt, det: { seg } }) };
    }
    if (e.tipo === 'actividades') {
      const act = [0, 1, 2, 3, 4].map(i => ({ t: (raiz.querySelector('[data-aa="' + i + '"]') || {}).value.trim(), v: (raiz.querySelector('[data-av="' + i + '"]') || {}).value })).filter(a => a.t || a.v !== '');
      if (!act.length) return { ok: false, error: 'Escribe al menos una actividad y su calificación.' };
      if (act.some(a => !a.t || a.v === '')) return { ok: false, error: 'Cada actividad necesita su nombre y su calificación de 0 a 10.' };
      const p = redondear(act.reduce((t, a) => t + Number(a.v), 0) / act.length, 1);
      return { ok: true, entrada: Object.assign(base, { p, max: 10, txt: act.length + (act.length === 1 ? ' actividad' : ' actividades') + ' · promedio ' + p + ' de 10 (no validada)', det: { act: act.map(a => ({ t: a.t.slice(0, 80), v: Number(a.v) })) } }) };
    }
    if (e.tipo === 'silla') {
      const sexo = (raiz.querySelector('#feSexo') || {}).value, edad = Number((raiz.querySelector('#feEdad') || {}).value), rep = Number((raiz.querySelector('#feRep') || {}).value);
      if (!sexo) return { ok: false, error: 'Elige el sexo para comparar con el valor esperado.' };
      if (!(edad >= 60 && edad <= 94)) return { ok: false, error: 'La edad debe estar entre 60 y 94 años.' };
      if (!(rep >= 0 && rep <= 60) || (raiz.querySelector('#feRep') || {}).value === '') return { ok: false, error: 'Escribe cuántas repeticiones hizo en 30 segundos.' };
      const fila = e.refs[sexo].find(r => edad >= r[0] && edad <= r[1]), umbral = fila ? fila[2] : null;
      const txt = umbral == null ? '' : (rep < umbral ? 'Por debajo del valor esperado (menos de ' + umbral + ')' : 'Dentro o por encima del valor esperado (' + umbral + ' o más)');
      return { ok: true, entrada: Object.assign(base, { p: rep, max: null, txt, det: { sexo, edad } }) };
    }
    return { ok: false, error: 'Escala no disponible.' };
  }

  window.ftEscalas = { lista: () => D().filter(e => e.habilitada !== false).map(e => ({ id: e.id, nombre: e.nombre, corto: e.corto })), buscar, formulario, leer };
})();
