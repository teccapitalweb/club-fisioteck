/* Club FisioTeck — Calculadora de rehabilitación: del plan sugerido a un plan personalizado y editable.
   Parte del plan general que ya muestra la calculadora (REHAB_DATA) y agrega: objetivo, nivel funcional, ejercicios con series, repeticiones,
   tiempo y descanso, biblioteca de ejercicios por región, criterios de progresión, banderas rojas, PDF y guardado en la ficha de un paciente.
   NO prescribe: es un punto de partida que el profesional edita según su evaluación individual.
   Contenido de apoyo (ejercicios, banderas, criterios) en club-plan-datos.js (window.FT_PLAN_BIB) para revisarlo sin tocar el código.
   Depende de index.html: REHAB_DATA, memberIsPaid, showPaywallOverlay, showToast; opcional: club-pacientes.js (ftPacientes). */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const BIB = () => window.FT_PLAN_BIB || { zonas: {}, progresion: [], objetivos: {} };
  const OBJETIVOS = { dolor: 'Reducir el dolor', movilidad: 'Recuperar movilidad', fuerza: 'Ganar fuerza', equilibrio: 'Mejorar equilibrio y control', retorno: 'Retorno a la actividad o al deporte' };
  const NIVELES = { sedentario: 'Sedentario', activo: 'Activo', deportista: 'Deportista', mayor: 'Adulto mayor' };
  const AJUSTE = { sedentario: { f: 0.8, d: 10 }, activo: { f: 1, d: 0 }, deportista: { f: 1.2, d: 0 }, mayor: { f: 0.8, d: 15 } }; // ajuste de ejemplo sobre repeticiones y descanso
  const MAX_EJ = 20;
  let plan = null;

  const rehab = () => (typeof REHAB_DATA !== 'undefined' ? REHAB_DATA : {});
  const zonaClave = () => ($('rehabZone') || {}).value || '';
  const entero = (v, a, b, def) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.min(b, Math.max(a, n)) : def; };
  const dosis = (e, nivel) => { const a = AJUSTE[nivel] || AJUSTE.activo; return { s: e.s, r: e.r ? Math.max(1, Math.round(e.r * a.f)) : 0, t: e.t ? Math.max(5, Math.round(e.t * a.f)) : 0, d: Math.min(300, (e.descanso || 0) + a.d) }; };
  const buscarBib = (zona, nombre) => { const z = BIB().zonas[zona]; if (!z) return null; for (const c of ['movilidad', 'fortalecimiento', 'estabilidad']) { const x = (z[c] || []).find(e => e.n.toLowerCase() === String(nombre).toLowerCase()); if (x) return x; } return null; };
  const mismaLinea = s => String(s || '').replace(/\s+/g, ' ').trim();

  // Sesiones y duración según la severidad (misma regla que la calculadora original)
  function sesionesPlan(base, sev) {
    const mult = sev === 'leve' ? 0.7 : sev === 'severo' ? 1.4 : 1, p = String(base.sessions).split('-');
    const min = Math.round(parseInt(p[0]) * mult), max = Math.round(parseInt(p[1] || p[0]) * mult), dur = parseInt(base.duration);
    return { sesiones: min + '-' + max, duracion: (sev === 'severo' ? dur + 10 : sev === 'leve' ? dur - 5 : dur) + ' min', semanas: Math.round(max / 2.5) };
  }

  function nuevoPlan() {
    const zona = zonaClave(), path = ($('rehabPathology') || {}).value || '', sev = ($('rehabSeverity') || {}).value || 'moderado', base = (rehab()[zona] || {})[path];
    if (!zona || !path || !base) return null;
    const nivel = 'activo';
    return Object.assign({ zona, zonaN: (BIB().zonas[zona] || {}).nombre || ($('rehabZone').selectedOptions[0] || {}).textContent || zona, patologia: path, severidad: sev, objetivo: 'dolor', nivel, fases: base.phases.slice(), contra: base.contra || '', base },
      sesionesPlan(base, sev),
      { ejercicios: base.exercises.map(n => { const b = buscarBib(zona, n); return Object.assign({ n, nota: '' }, b ? dosis(b, nivel) : { s: 3, r: 10, t: 0, d: 30 }); }), progresion: (BIB().progresion || []).join('\n'), notas: '' });
  }

  // ---------- Panel debajo del plan sugerido ----------
  function panel() {
    const host = $('rehabResult'); if (!host || host.style.display === 'none') return;
    let p = $('rpPanel'); if (!p) { p = document.createElement('div'); p.id = 'rpPanel'; host.appendChild(p); }
    if (!plan) { p.innerHTML = ''; return; }
    const z = BIB().zonas[plan.zona] || {};
    p.innerHTML = '<div class="rp"><h3>Personaliza el plan</h3><p class="rp-nota">Este plan es un punto de partida. Edítalo según la evaluación individual de tu paciente.</p>' +
      '<div class="rp-fila"><label>Objetivo terapéutico<select id="rpObj">' + Object.keys(OBJETIVOS).map(k => '<option value="' + k + '"' + (plan.objetivo === k ? ' selected' : '') + '>' + OBJETIVOS[k] + '</option>').join('') + '</select></label>' +
      '<label>Nivel funcional del paciente<select id="rpNivel">' + Object.keys(NIVELES).map(k => '<option value="' + k + '"' + (plan.nivel === k ? ' selected' : '') + '>' + NIVELES[k] + '</option>').join('') + '</select></label></div>' +
      '<ul class="rp-ideas" id="rpIdeas">' + ((BIB().objetivos || {})[plan.objetivo] || []).map(i => '<li>' + esc(i) + '</li>').join('') + '</ul>' +
      '<h4>Ejercicios (series × repeticiones o tiempo)</h4><div id="rpLista">' + plan.ejercicios.map(filaEj).join('') + '</div>' +
      '<div class="rp-bot"><button type="button" class="rp-sec" id="rpAgregar">+ Agregar ejercicio</button><button type="button" class="rp-sec" id="rpBib">Biblioteca de ejercicios</button><button type="button" class="rp-sec" id="rpAjustar">Reaplicar nivel funcional</button></div><div id="rpBibCaja"></div>' +
      '<h4>Criterios para progresar de fase</h4><textarea id="rpProg" rows="5" maxlength="900">' + esc(plan.progresion) + '</textarea>' +
      '<h4>Notas del plan</h4><textarea id="rpNotas" rows="2" maxlength="500" placeholder="Opcional: indicaciones para el paciente, precauciones...">' + esc(plan.notas) + '</textarea>' +
      ((z.banderas || []).length ? '<div class="rp-ban"><b>Banderas rojas: deriva o no trates si aparece</b><ul>' + z.banderas.map(b => '<li>' + esc(b) + '</li>').join('') + '</ul></div>' : '') +
      '<label class="rp-pro">Tu nombre en el PDF (opcional)<input id="rpPro" maxlength="60" value="' + esc((() => { try { return localStorage.getItem('ft_plan_profesional') || ''; } catch (_) { return ''; } })()) + '" autocomplete="name"></label>' +
      '<div class="rp-bot rp-fin"><button type="button" class="rp-cta" id="rpPdf">Descargar PDF</button><button type="button" class="rp-sec" id="rpPaciente">Guardar en un paciente</button></div><div id="rpPacCaja"></div>' +
      '<p class="rp-nota">Las sesiones y la duración son una estimación orientativa: la progresión real depende de criterios (dolor, fuerza, rango, irritabilidad) y no del calendario. Herramienta de apoyo; no sustituye el criterio profesional ni constituye un diagnóstico. Valores de ejemplo, no una prescripción.</p>' + referenciasHtml() + '</div>';
    ligar();
  }
  function referenciasHtml() {
    const r = BIB().referencias || {}, zona = (r[plan.zona] || []), gen = r.general || [];
    const lista = zona.concat(gen); if (!lista.length) return '';
    return '<details class="rp-ref-d"><summary>Fuentes consultadas</summary><ul>' + lista.map(x => '<li>' + esc(x.texto) + (x.url ? ' <a href="' + esc(x.url) + '" target="_blank" rel="noopener">enlace</a>' : '') + '</li>').join('') + '</ul></details>';
  }
  function filaEj(e, i) {
    return '<div class="rp-ej" data-i="' + i + '"><input class="rp-n" maxlength="60" value="' + esc(e.n) + '" aria-label="Ejercicio"><label>Series<input type="number" class="rp-s" min="1" max="10" value="' + e.s + '" inputmode="numeric"></label><label>Repeticiones<input type="number" class="rp-r" min="0" max="100" value="' + e.r + '" inputmode="numeric"></label><label>Segundos<input type="number" class="rp-t" min="0" max="600" value="' + e.t + '" inputmode="numeric"></label><label>Descanso (s)<input type="number" class="rp-d" min="0" max="300" value="' + e.d + '" inputmode="numeric"></label><input class="rp-no" maxlength="120" value="' + esc(e.nota || '') + '" placeholder="Nota del ejercicio (opcional)" aria-label="Nota"><button type="button" class="rp-x" data-q="' + i + '">Quitar</button></div>';
  }
  function leerEditor() {
    if (!plan || !$('rpLista')) return;
    plan.ejercicios = [...document.querySelectorAll('#rpLista .rp-ej')].map(f => ({ n: f.querySelector('.rp-n').value.trim().slice(0, 60) || 'Ejercicio', s: entero(f.querySelector('.rp-s').value, 1, 10, 3), r: entero(f.querySelector('.rp-r').value, 0, 100, 10), t: entero(f.querySelector('.rp-t').value, 0, 600, 0), d: entero(f.querySelector('.rp-d').value, 0, 300, 30), nota: f.querySelector('.rp-no').value.trim().slice(0, 120) }));
    plan.progresion = $('rpProg').value.slice(0, 900); plan.notas = $('rpNotas').value.slice(0, 500);
    plan.objetivo = $('rpObj').value; plan.nivel = $('rpNivel').value;
    const pro = $('rpPro'); if (pro) { try { localStorage.setItem('ft_plan_profesional', pro.value.trim().slice(0, 60)); } catch (_) { /* modo privado */ } }
  }
  function ligar() {
    $('rpObj').onchange = () => { leerEditor(); panel(); };
    $('rpNivel').onchange = () => { leerEditor(); panel(); };
    $('rpAjustar').onclick = () => { leerEditor(); plan.ejercicios = plan.ejercicios.map(e => { const b = buscarBib(plan.zona, e.n); return b ? Object.assign({}, e, dosis(b, plan.nivel)) : e; }); panel(); showToast('Dosificación de ejemplo ajustada al nivel: ' + NIVELES[plan.nivel]); };
    $('rpAgregar').onclick = () => { leerEditor(); if (plan.ejercicios.length >= MAX_EJ) { showToast('Máximo ' + MAX_EJ + ' ejercicios por plan.'); return; } plan.ejercicios.push({ n: 'Nuevo ejercicio', s: 3, r: 10, t: 0, d: 30, nota: '' }); panel(); };
    document.querySelectorAll('#rpLista [data-q]').forEach(b => b.onclick = () => { leerEditor(); plan.ejercicios.splice(Number(b.dataset.q), 1); panel(); });
    $('rpBib').onclick = bibliotecaCaja;
    $('rpPdf').onclick = () => { leerEditor(); pdf(plan); };
    $('rpPaciente').onclick = guardarEnPaciente;
  }
  function bibliotecaCaja() {
    leerEditor(); const caja = $('rpBibCaja'), z = BIB().zonas[plan.zona];
    if (caja.innerHTML) { caja.innerHTML = ''; return; }
    if (!z) { caja.innerHTML = '<p class="rp-nota">No hay biblioteca para esta región.</p>'; return; }
    const cats = [['movilidad', 'Movilidad'], ['fortalecimiento', 'Fortalecimiento'], ['estabilidad', 'Estabilidad y control']];
    caja.innerHTML = '<div class="rp-bib">' + cats.map(([k, t]) => '<h5>' + t + ' · ' + esc(z.nombre || plan.zonaN) + '</h5>' + (z[k] || []).map((e, i) => '<div class="rp-b"><span><b>' + esc(e.n) + '</b><small>' + esc(e.d) + '</small></span><button type="button" data-k="' + k + '" data-i="' + i + '">Agregar</button></div>').join('')).join('') + '</div>';
    caja.querySelectorAll('button').forEach(b => b.onclick = () => {
      leerEditor(); if (plan.ejercicios.length >= MAX_EJ) { showToast('Máximo ' + MAX_EJ + ' ejercicios por plan.'); return; }
      const e = z[b.dataset.k][Number(b.dataset.i)]; plan.ejercicios.push(Object.assign({ n: e.n, nota: '' }, dosis(e, plan.nivel))); panel(); showToast('Agregado: ' + e.n);
    });
  }

  // ---------- PDF (ventana de impresión: se guarda como PDF) ----------
  const textoDosis = e => e.s + ' × ' + (e.t ? e.t + ' s' : e.r + ' rep.') + (e.d ? ' · descanso ' + e.d + ' s' : '');
  function pdf(p, paciente) {
    const w = window.open('', '_blank'); if (!w) { showToast('Permite las ventanas emergentes para generar el PDF.'); return; }
    const z = BIB().zonas[p.zona] || {}, fecha = new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
    const pro = (() => { try { return localStorage.getItem('ft_plan_profesional') || ''; } catch (_) { return ''; } })();
    w.document.write('<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Plan de rehabilitación</title><style>body{font:14px Arial,sans-serif;color:#12202B;max-width:780px;margin:24px auto;padding:0 16px}h1{font-size:20px;margin:0}h2{font-size:15px;margin:20px 0 6px;color:#0A3E68}table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #D4DDD9;padding:7px 5px;text-align:left;font-size:13px}.m{color:#5B7186;font-size:12px}.cab{display:flex;align-items:center;gap:14px;border-bottom:3px solid #0A3E68;padding-bottom:10px}img{height:42px}.datos{display:grid;grid-template-columns:1fr 1fr;gap:4px 18px;margin:12px 0;font-size:13px}.ban{border:1px solid #E4A5A0;background:#FDF1F0;border-radius:8px;padding:8px 12px;font-size:12.5px}ul{margin:4px 0;padding-left:18px}pre{white-space:pre-wrap;font:13px Arial,sans-serif;margin:0}</style></head><body>' +
      '<div class="cab"><img src="' + location.origin + location.pathname.replace(/[^/]*$/, '') + 'pwa-logo.png" alt=""><div><h1>Plan de rehabilitación</h1><div class="m">Generado el ' + fecha + '</div></div></div>' +
      '<div class="datos"><div><b>Paciente:</b> ' + esc(paciente || '______________________') + '</div><div><b>Fisioterapeuta:</b> ' + esc(pro || '______________________') + '</div><div><b>Región:</b> ' + esc(p.zonaN) + '</div><div><b>Diagnóstico de referencia:</b> ' + esc(p.patologia) + '</div><div><b>Objetivo:</b> ' + esc(OBJETIVOS[p.objetivo] || '') + '</div><div><b>Nivel funcional:</b> ' + esc(NIVELES[p.nivel] || '') + '</div><div><b>Severidad:</b> ' + esc(p.severidad) + '</div><div><b>Sesiones sugeridas:</b> ' + esc(p.sesiones) + ' de ' + esc(p.duracion) + ' (estimación orientativa)</div></div>' +
      '<h2>Fases del tratamiento</h2><ul>' + p.fases.map(f => '<li>' + esc(f) + '</li>').join('') + '</ul>' +
      '<h2>Ejercicios</h2><table><tr><th>Ejercicio</th><th>Dosificación</th><th>Nota</th></tr>' + p.ejercicios.map(e => '<tr><td>' + esc(e.n) + '</td><td>' + esc(textoDosis(e)) + '</td><td>' + esc(e.nota || '') + '</td></tr>').join('') + '</table>' +
      (p.progresion ? '<h2>Criterios para progresar</h2><pre>' + esc(p.progresion) + '</pre>' : '') + (p.notas ? '<h2>Notas</h2><pre>' + esc(p.notas) + '</pre>' : '') +
      (p.contra ? '<h2>Contraindicaciones</h2><div class="ban">' + esc(p.contra) + '</div>' : '') +
      ((z.banderas || []).length ? '<h2>Señales de alarma: suspender y derivar</h2><div class="ban"><ul>' + z.banderas.map(b => '<li>' + esc(b) + '</li>').join('') + '</ul></div>' : '') +
      '<p class="m" style="margin-top:22px">Plan de apoyo del Club FisioTeck. No sustituye el criterio profesional ni constituye un diagnóstico; los valores son de ejemplo y deben ajustarse a la evaluación individual de cada paciente.</p>' +
      '<script>window.onload=function(){setTimeout(function(){window.print()},400)}<\/script></body></html>');
    w.document.close();
  }

  // ---------- Guardar en la ficha de un paciente ----------
  async function guardarEnPaciente() {
    const caja = $('rpPacCaja'); if (caja.innerHTML) { caja.innerHTML = ''; return; }
    if (!window.ftPacientes || !ftPacientes.listar) { showToast('Pacientes no está disponible.'); return; }
    leerEditor();
    try {
      const l = await ftPacientes.listar();
      if (!l.avisoOk) { caja.innerHTML = '<p class="rp-nota">Antes abre <b>Pacientes</b> y acepta el aviso de privacidad.</p>'; return; }
      if (!l.pacientes.length) { caja.innerHTML = '<p class="rp-nota">Aún no tienes pacientes. Crea uno en <b>Pacientes</b>.</p>'; return; }
      caja.innerHTML = '<div class="rp-pac"><label>Paciente<select id="rpPacSel">' + l.pacientes.map(x => '<option value="' + esc(x.id) + '">' + esc(x.clave) + '</option>').join('') + '</select></label><button type="button" class="rp-cta" id="rpPacOk">Guardar plan</button></div>';
      $('rpPacOk').onclick = async () => {
        $('rpPacOk').disabled = true;
        try { await ftPacientes.guardarPlan($('rpPacSel').value, { f: Date.now(), nombre: plan.patologia.slice(0, 80), zona: plan.zona, zonaN: plan.zonaN, patologia: plan.patologia, severidad: plan.severidad, objetivo: plan.objetivo, nivel: plan.nivel, sesiones: plan.sesiones, duracion: plan.duracion, semanas: plan.semanas, fases: plan.fases, ejercicios: plan.ejercicios, progresion: plan.progresion, notas: plan.notas, contra: plan.contra }); caja.innerHTML = ''; showToast('Plan guardado en la ficha del paciente'); }
        catch (e) { $('rpPacOk').disabled = false; showToast(e && e.message ? e.message : 'No se pudo guardar el plan.'); }
      };
    } catch (_) { showToast('No se pudo cargar tu lista de pacientes.'); }
  }

  // ---------- Enganche con la calculadora ----------
  const original = window.showRehabPlan;
  if (typeof original === 'function') {
    window.showRehabPlan = function () {
      const r = original.apply(this, arguments);
      const nuevo = nuevoPlan(), clave = nuevo ? nuevo.zona + '|' + nuevo.patologia + '|' + nuevo.severidad : '';
      if (!plan || !nuevo || plan._clave !== clave) { plan = nuevo; if (plan) plan._clave = clave; }
      panel(); return r;
    };
  }
  window.ftPlan = { pdf };
})();
