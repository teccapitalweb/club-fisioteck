/* Panel · gráficas por apartado (usa la biblioteca ZG de graficas.js).
   Mejora las gráficas existentes y agrega nuevas en cada apartado, siguiendo Zoorigen y Alintec:
   líneas de tendencia, ingresos por mes, embudos, anillos, mapa de calor y barras apiladas.
   Se engancha a las funciones del panel: cada vez que un apartado pinta sus datos, aquí se pintan sus gráficas. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const DIAS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const ultimas = {}; // última respuesta de cada ruta de administrador

  // ---------- Utilidades ----------
  const hoy0 = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  const lunesDe = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };
  function semanas(n) { const l = lunesDe(hoy0()), r = []; for (let k = n - 1; k >= 0; k--) { const d = new Date(l); d.setDate(d.getDate() - k * 7); r.push(d); } return r; }
  function meses(n) { const h = hoy0(), r = []; for (let k = n - 1; k >= 0; k--) r.push(new Date(h.getFullYear(), h.getMonth() - k, 1)); return r; }
  const etSem = d => d.getDate() + '/' + (d.getMonth() + 1);
  const etMes = d => MESES[d.getMonth()] + (d.getMonth() === 0 || d.getMonth() === 11 ? " '" + String(d.getFullYear()).slice(2) : '');
  function porSemana(fechas, n, pesos) { const ss = semanas(n), v = new Array(n).fill(0); fechas.forEach((f, i) => { if (!f) return; const k = Math.floor((lunesDe(f) - ss[0]) / (7 * 864e5)); if (k >= 0 && k < n) v[k] += pesos ? pesos[i] : 1; }); return { et: ss.map(etSem), v }; }
  function porMes(fechas, n, pesos) { const ms = meses(n), v = new Array(n).fill(0); fechas.forEach((f, i) => { if (!f) return; const k = (f.getFullYear() - ms[0].getFullYear()) * 12 + f.getMonth() - ms[0].getMonth(); if (k >= 0 && k < n) v[k] += pesos ? pesos[i] : 1; }); return { et: ms.map(etMes), v }; }
  const fechaMiembro = m => fechaDe(m.createdAt || m.startDate);
  const planDe = m => (m.plan === 'anual' ? 'Anual' : m.plan === 'mensual' ? 'Mensual' : m.plan === 'regalo' ? 'Regalo' : '');

  // Inserta (una vez) un grupo de tarjetas de gráfica justo después de un elemento de la sección
  function tarjetas(secId, anclaSel, grupo, defs) {
    const sec = $(secId); if (!sec) return false;
    if ($(defs[0].id)) return true;
    const ancla = typeof anclaSel === 'function' ? anclaSel(sec) : sec.querySelector(anclaSel); if (!ancla) return false;
    const html = '<div class="' + (defs.length > 1 ? 'zg-fila-graficas' : '') + '" data-zg="' + grupo + '">' + defs.map(d => '<div class="admin-card"><h3>' + d.titulo + '</h3>' + (d.sub ? '<p class="cue-nota" style="margin:-8px 0 10px">' + d.sub + '</p>' : '') + '<div id="' + d.id + '"></div></div>').join('') + '</div>';
    ancla.insertAdjacentHTML('afterend', html); return true;
  }
  const poner = (id, html) => { const el = $(id); if (el) el.innerHTML = html; };
  function sparkEnKpi(idValor, valores, color) {
    const el = $(idValor); if (!el) return; const k = el.closest('.ap-kpi'); if (!k) return;
    let s = k.querySelector('.zg-spark-caja'); if (!s) { s = document.createElement('div'); s.className = 'zg-spark-caja'; k.appendChild(s); }
    s.innerHTML = ZG.sparkline(valores, { color });
  }
  const envolver = (nombre, fn) => { const o = window[nombre]; if (typeof o !== 'function') return; window[nombre] = function () { const r = o.apply(this, arguments); const sigue = () => { try { fn(); } catch (e) { console.warn('[gráficas ' + nombre + ']', e); } }; if (r && typeof r.then === 'function') return r.then(v => { sigue(); return v; }); sigue(); return r; }; };

  // Guarda la última respuesta de cada ruta de administrador (para graficar sin pedirla otra vez)
  const apiOriginal = window.apiAdmin;
  window.apiAdmin = async function (ruta) { const d = await apiOriginal.apply(this, arguments); ultimas[String(ruta).split('?')[0]] = d; return d; };
  window.ZGhook = (nombre, datos) => { ultimas[nombre] = datos; if (nombre === 'avisos') avisos(); };

  // ═════════ RESUMEN (Dashboard) ═════════
  function resumen() {
    const ms = firebaseMembers, pagos = listaPagos().filter(x => x.estado !== 'failed');
    const reg = porSemana(ms.map(fechaMiembro), 12), pag = porSemana(pagos.map(x => x.d), 12);
    sparkEnKpi('kNuevos', reg.v, 2);
    sparkEnKpi('kIngMes', porMes(pagos.map(x => x.d), 6, pagos.map(x => x.monto)).v, 6);
    if (!tarjetas('sec-dashboard', sec => sec.querySelectorAll('.ap-cols')[1], 'dash-extra', [{ id: 'zgDashTend', titulo: 'Registros y pagos por semana', sub: 'Últimas 12 semanas' }, { id: 'zgDashPlan', titulo: 'Ingresos por plan', sub: 'Todo el historial de pagos' }])) return;
    poner('zgDashTend', ZG.serie({ etiquetas: reg.et, series: [{ nombre: 'Registros', valores: reg.v, color: 1 }, { nombre: 'Pagos', valores: pag.v, color: 6 }], titulo: 'Registros y pagos por semana', vacio: 'Aún no hay registros' }));
    const mix = {}; pagos.forEach(x => { const p = planDe(x.m) || 'Otro'; mix[p] = (mix[p] || 0) + x.monto; });
    poner('zgDashPlan', ZG.anillo({ items: Object.entries(mix).map(([n, v], k) => ({ nombre: n, valor: v, color: [1, 2, 4, 3][k % 4] })), formato: 'mxn', centro: { valor: ZG.fmt(Object.values(mix).reduce((a, b) => a + b, 0), 'mxn'), texto: 'cobrado' }, vacio: 'Aún no hay pagos registrados' }));
  }
  envolver('renderDashboard', resumen);

  // ═════════ MÉTRICAS ═════════
  function metricas() {
    const ms = firebaseMembers, pagos = listaPagos().filter(x => x.estado !== 'failed');
    const reg = porMes(ms.map(fechaMiembro), 12), pag = porMes(pagos.filter(x => !x.m._contado).map(x => x.d), 12);
    poner('meAltas', ZG.serie({ etiquetas: reg.et, series: [{ nombre: 'Registros', valores: reg.v, color: 1 }, { nombre: 'Pagos', valores: pag.v, color: 6 }], titulo: 'Registros y pagos por mes', vacio: 'Aún no hay registros' }));
    const pagaron = new Set(pagos.map(x => x.m.uid)), activos = ms.filter(m => estadoSocio(m) === 'activo').length;
    poner('meEmbudo', ZG.embudo({ etapas: [{ nombre: 'Registrados', valor: ms.length }, { nombre: 'Con algún pago', valor: pagaron.size }, { nombre: 'Activos hoy', valor: activos }], vacio: 'Aún no hay registros' }));
    if (!tarjetas('sec-metrics', sec => { const l = sec.querySelectorAll('.ap-cols'); return l[l.length - 1]; }, 'met-extra', [{ id: 'zgMetCalor', titulo: 'Cuándo se registran', sub: 'Día de la semana y hora (hora de tu navegador)' }, { id: 'zgMetCohorte', titulo: 'Conversión por mes de registro', sub: '% de cada mes que ya pagó' }])) return;
    const m = DIAS.map(() => new Array(24).fill(0)); ms.forEach(x => { const f = fechaMiembro(x); if (f && x.createdAt && (x.createdAt.seconds || typeof x.createdAt.toDate === 'function' || x.createdAt instanceof Date)) m[(f.getDay() + 6) % 7][f.getHours()]++; });
    poner('zgMetCalor', ZG.mapaCalor({ filas: DIAS, columnas: [...Array(24).keys()], valores: m, etiquetaCol: h => (h % 6 === 0 ? h : ''), unidad: 'Registros', vacio: 'Se llena cuando los registros tienen hora' }));
    const meses12 = meses(12), tot = new Array(12).fill(0), pg = new Array(12).fill(0);
    ms.forEach(x => { const f = fechaMiembro(x); if (!f) return; const k = (f.getFullYear() - meses12[0].getFullYear()) * 12 + f.getMonth() - meses12[0].getMonth(); if (k >= 0 && k < 12) { tot[k]++; if (pagaron.has(x.uid)) pg[k]++; } });
    poner('zgMetCohorte', ZG.barras({ etiquetas: meses12.map(etMes), series: [{ nombre: '% que pagó', valores: tot.map((t, i) => t ? Math.round(pg[i] / t * 100) : 0), color: 6 }], formato: 'pct', titulo: 'Conversión por mes de registro', vacio: 'Sin registros' }));
  }
  envolver('renderMetricas', metricas);

  // ═════════ SUSCRIPCIONES Y PAGOS ═════════
  function pagos() {
    const lista = listaPagos().filter(x => x.estado !== 'failed');
    sparkEnKpi('pgTotal', porMes(lista.map(x => x.d), 6, lista.map(x => x.monto)).v, 6);
    if (!tarjetas('sec-payments', '.ap-kpis', 'pay-graf', [{ id: 'zgPagMes', titulo: 'Ingresos por mes', sub: 'Últimos 12 meses' }, { id: 'zgPagPlan', titulo: 'Miembros por plan' }])) return;
    const mm = porMes(lista.map(x => x.d), 12, lista.map(x => x.monto));
    poner('zgPagMes', ZG.barras({ etiquetas: mm.et, series: [{ nombre: 'Ingresos', valores: mm.v, color: 6 }], formato: 'mxn', titulo: 'Ingresos por mes', vacio: 'Aún no hay pagos registrados' }));
    const c = {}; firebaseMembers.filter(m => estadoSocio(m) === 'activo').forEach(m => { const p = planDe(m) || 'Sin plan'; c[p] = (c[p] || 0) + 1; });
    poner('zgPagPlan', ZG.anillo({ items: Object.entries(c).map(([n, v], k) => ({ nombre: n, valor: v, color: [1, 2, 4, 3][k % 4] })), etiquetaTotal: 'miembros activos', vacio: 'Aún no hay miembros activos' }));
    // Renovaciones de las próximas 8 semanas
    if (!$('zgPagRenov')) { const ref = $('zgPagMes').closest('.zg-fila-graficas'); ref.insertAdjacentHTML('afterend', '<div class="admin-card"><h3>Renovaciones de las próximas semanas</h3><p class="cue-nota" style="margin:-8px 0 10px">Membresías activas por semana de vencimiento</p><div id="zgPagRenov"></div></div>'); }
    const ss = semanas(8).map((d, k, a) => d), ahora0 = lunesDe(hoy0()), v = new Array(8).fill(0);
    firebaseMembers.filter(m => estadoSocio(m) === 'activo').forEach(m => { const f = fechaDe(m.accessUntil || m.nextPaymentDate); if (!f) return; const k = Math.floor((lunesDe(f) - ahora0) / (7 * 864e5)); if (k >= 0 && k < 8) v[k]++; });
    const et = []; for (let k = 0; k < 8; k++) { const d = new Date(ahora0); d.setDate(d.getDate() + k * 7); et.push(etSem(d)); }
    poner('zgPagRenov', ZG.barras({ etiquetas: et, series: [{ nombre: 'Vencen', valores: v, color: 3 }], titulo: 'Renovaciones por semana', vacio: 'Ninguna membresía vence en las próximas 8 semanas' }));
  }
  envolver('renderPagos', pagos);

  // ═════════ CERTIFICADOS ═════════
  function certs() {
    const l = (typeof certLista !== 'undefined' ? certLista : []).filter(c => !c.revocado);
    if (!tarjetas('sec-certs', '.ap-kpis', 'cert-graf', [{ id: 'zgCertMes', titulo: 'Certificados por mes', sub: 'Últimos 6 meses' }, { id: 'zgCertCurso', titulo: 'Certificados por curso' }])) return;
    const mm = porMes(l.map(c => new Date(c.emitidoEn)), 6);
    poner('zgCertMes', ZG.serie({ etiquetas: mm.et, series: [{ nombre: 'Emitidos', valores: mm.v, color: 1 }], titulo: 'Certificados por mes', vacio: 'Aún no hay certificados emitidos' }));
    const c = {}; l.forEach(x => { c[x.curso] = (c[x.curso] || 0) + 1; });
    poner('zgCertCurso', ZG.barrasH({ items: Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([n, v]) => ({ nombre: n, valor: v })), vacio: 'Aún no hay certificados emitidos' }));
  }
  envolver('renderCertificados', certs);

  // ═════════ RESEÑAS ═════════
  function resenas() {
    const d = ultimas['/api/admin/resenas']; if (!d) return;
    poner('reHisto', ZG.barras({ etiquetas: ['1★', '2★', '3★', '4★', '5★'], series: [{ nombre: 'Reseñas', valores: [1, 2, 3, 4, 5].map(n => (d.histograma || {})[n] || 0), color: 3 }], titulo: 'Calificaciones', vacio: 'Aún no hay reseñas' }));
    if (!tarjetas('sec-reviews', '.ap-cols', 'rev-graf', [{ id: 'zgResTend', titulo: 'Calificación promedio por mes', sub: 'Con las reseñas de cada mes' }])) return;
    const ms = meses(6), s = new Array(6).fill(0), n = new Array(6).fill(0);
    (d.resenas || []).forEach(r => { if (!r.actualizadaMs) return; const f = new Date(r.actualizadaMs), k = (f.getFullYear() - ms[0].getFullYear()) * 12 + f.getMonth() - ms[0].getMonth(); if (k >= 0 && k < 6) { s[k] += r.estrellas; n[k]++; } });
    poner('zgResTend', ZG.serie({ etiquetas: ms.map(etMes), series: [{ nombre: 'Promedio', valores: s.map((t, i) => n[i] ? t / n[i] : 0), color: 3 }], formato: 'dec', entero: false, titulo: 'Promedio por mes', vacio: 'Aún no hay reseñas' }));
  }
  envolver('cargarResenas', resenas);

  // ═════════ PRUEBAS GRATUITAS ═════════
  function pruebas() {
    const ms = firebaseMembers, con = ms.filter(m => m.trialCourseId !== undefined && m.trialCourseId !== null), conv = con.filter(m => estadoSocio(m) === 'activo');
    const sinElegir = ms.filter(m => (m.trialCourseId === undefined || m.trialCourseId === null) && estadoSocio(m) === 'sin');
    if (!tarjetas('sec-trials', '.ap-kpis', 'tri-graf', [{ id: 'zgTriEmb', titulo: 'De la prueba a la membresía' }, { id: 'zgTriSem', titulo: 'Pruebas iniciadas por semana', sub: 'Últimas 12 semanas' }])) return;
    poner('zgTriEmb', ZG.embudo({ etapas: [{ nombre: 'Cuentas sin membresía', valor: sinElegir.length + con.length }, { nombre: 'Eligieron curso', valor: con.length }, { nombre: 'Se suscribieron', valor: conv.length }], vacio: 'Aún no hay cuentas' }));
    const s = porSemana(con.map(m => fechaDe(m.trialStartedAt)), 12);
    poner('zgTriSem', ZG.barras({ etiquetas: s.et, series: [{ nombre: 'Pruebas', valores: s.v, color: 2 }], titulo: 'Pruebas por semana', vacio: 'Aún nadie ha elegido curso de prueba' }));
  }
  envolver('renderPruebas', pruebas);

  // ═════════ REFERIDOS ═════════
  function referidos() {
    const d = ultimas['/api/admin/referidos']; if (!d) return;
    if (!tarjetas('sec-referrals', '.ap-kpis', 'ref-graf', [{ id: 'zgRefEmb', titulo: 'De la invitación al pago' }, { id: 'zgRefEst', titulo: 'Estado de las invitaciones' }, ])) return;
    poner('zgRefEmb', ZG.embudo({ etapas: [{ nombre: 'Invitaciones', valor: d.total }, { nombre: 'Válidas', valor: d.validos }, { nombre: 'Pagaron', valor: d.pagaron }], vacio: 'Aún no hay invitaciones' }));
    poner('zgRefEst', ZG.anillo({ items: [{ nombre: 'Válidas', valor: d.validos, color: 6 }, { nombre: 'Por confirmar', valor: d.pendientes, color: 3 }, { nombre: 'No cuentan', valor: d.rechazados, color: 5 }], etiquetaTotal: 'invitaciones', vacio: 'Aún no hay invitaciones' }));
  }
  envolver('cargarReferidos', referidos);

  // ═════════ CRÉDITOS Y CUPONES ═════════
  function creditos() {
    const d = ultimas['/api/admin/creditos']; if (!d) return;
    if (!tarjetas('sec-credits', '.ap-kpis', 'cre-graf', [{ id: 'zgCreSem', titulo: 'Movimientos de créditos por semana', sub: 'Regalos, cupones y canjes (últimas 10 semanas)' }])) return;
    const mov = d.movimientos || [], tipo = t => mov.filter(m => m.tipo === t), f = t => porSemana(tipo(t).map(m => new Date(m.ms)), 10, tipo(t).map(m => Math.abs(m.cantidad)));
    const a = f('regalo'), b = f('cupon'), c = f('canje');
    poner('zgCreSem', ZG.barras({ etiquetas: a.et, apilado: true, series: [{ nombre: 'Regalos', valores: a.v, color: 1 }, { nombre: 'Cupones', valores: b.v, color: 4 }, { nombre: 'Canjes', valores: c.v, color: 3 }], titulo: 'Movimientos de créditos', vacio: 'Aún no hay movimientos' }));
  }
  envolver('cargarCreditos', creditos);

  // ═════════ ENCUESTA Y VISITAS ═════════
  function encuesta() {
    const e = ultimas['/api/admin/encuesta'], v = ultimas['/api/admin/metricas'];
    if (v) { const dias = v.dias || []; poner('enVisGrafica', v.encendido || dias.length ? ZG.serie({ etiquetas: dias.map(x => x.dia.slice(5)), series: [{ nombre: 'Visitas', valores: dias.map(x => x.total), color: 1 }], titulo: 'Visitas por día', vacio: 'Aún no hay visitas registradas' }) : ZG.vacio('Enciende el contador para empezar a contar')); sparkEnKpi('enVis', dias.map(x => x.total), 1); }
    if (!e) return;
    const an = (lista, id, k) => poner(id, ZG.anillo({ items: lista.map((x, i) => ({ nombre: x.valor, valor: x.n, color: i + 1 })), etiquetaTotal: 'respuestas', vacio: 'Aún no hay respuestas' }));
    an(e.perfiles, 'enPerfiles'); an(e.urgencia, 'enUrg'); an(e.frenos, 'enFrenos');
    poner('enAband', ZG.barrasH({ items: e.abandono.map(a => ({ nombre: PREGUNTAS_ENC[a.clave] || a.clave, valor: a.n, color: 5 })), vacio: 'Nadie ha abandonado todavía' }));
  }
  envolver('cargarEncuesta', encuesta);

  // ═════════ FORO ═════════
  function foro() {
    if (typeof foroPosts === 'undefined') return;
    if (!tarjetas('sec-forum', '.ap-kpis', 'foro-graf', [{ id: 'zgForoSem', titulo: 'Temas por semana', sub: 'Últimas 12 semanas' }, { id: 'zgForoCat', titulo: 'Temas por categoría' }])) return;
    const s = porSemana(foroPosts.map(p => fechaDe(p.createdAt)), 12);
    poner('zgForoSem', ZG.barras({ etiquetas: s.et, series: [{ nombre: 'Temas', valores: s.v, color: 4 }], titulo: 'Temas por semana', vacio: 'Aún no hay temas' }));
    const c = {}; foroPosts.forEach(p => { const n = (typeof FORO_CATS !== 'undefined' && FORO_CATS[p.category]) || p.category || 'General'; c[n] = (c[n] || 0) + 1; });
    poner('zgForoCat', ZG.anillo({ items: Object.entries(c).map(([n, v], i) => ({ nombre: n, valor: v, color: i + 1 })), etiquetaTotal: 'temas', vacio: 'Aún no hay temas' }));
  }
  envolver('renderForo', foro);

  // ═════════ CURSOS ═════════
  function cursos() {
    if (!tarjetas('sec-courses', '.cu-kpis', 'cur-graf', [{ id: 'zgCurArea', titulo: 'Horas de contenido por área' }, { id: 'zgCurTop', titulo: 'Cursos con más clases' }])) return;
    const a = {}; data.courses.forEach(c => { const n = (typeof nombreAreaCurso === 'function' ? nombreAreaCurso(c.category) : c.category || 'General'); a[n] = (a[n] || 0) + (typeof horasCursoNum === 'function' ? horasCursoNum(c) : 0); });
    poner('zgCurArea', ZG.anillo({ items: Object.entries(a).filter(x => x[1] > 0).map(([n, v], i) => ({ nombre: n, valor: Math.round(v * 10) / 10, color: i + 1 })), formato: 'dec', etiquetaTotal: 'horas', vacio: 'Aún no hay cursos' }));
    poner('zgCurTop', ZG.barrasH({ items: data.courses.slice().sort((x, y) => (y.lessons || []).length - (x.lessons || []).length).slice(0, 8).map(c => ({ nombre: c.title, valor: (c.lessons || []).length })), vacio: 'Aún no hay cursos' }));
  }
  envolver('renderCourses', cursos);

  // ═════════ DIRECTORIO ═════════
  function directorio() {
    if (typeof dirLista === 'undefined') return;
    if (!tarjetas('sec-directory', '.ap-kpis', 'dir-graf', [{ id: 'zgDirEsp', titulo: 'Especialidades' }, { id: 'zgDirCiu', titulo: 'Ciudades' }])) return;
    const cuenta = campo => { const c = {}; dirLista.forEach(t => { if (t[campo]) c[t[campo]] = (c[t[campo]] || 0) + 1; }); return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([nombre, valor]) => ({ nombre, valor })); };
    poner('zgDirEsp', ZG.barrasH({ items: cuenta('especialidad'), vacio: 'Aún no hay tarjetas' })); poner('zgDirCiu', ZG.barrasH({ items: cuenta('ciudad'), color: 2, vacio: 'Aún no hay tarjetas' }));
  }
  envolver('renderDirectorio', directorio);

  // ═════════ NOTIFICACIONES ═════════
  function avisos() {
    const l = ultimas.avisos || [];
    if (!tarjetas('sec-notifications', '.cu-kpis', 'not-graf', [{ id: 'zgNotSem', titulo: 'Avisos enviados por semana', sub: 'Últimas 10 semanas' }, { id: 'zgNotTipo', titulo: 'Avisos por tipo' }])) return;
    const s = porSemana(l.map(n => n.createdAt && n.createdAt.seconds ? new Date(n.createdAt.seconds * 1000) : null), 10);
    poner('zgNotSem', ZG.barras({ etiquetas: s.et, series: [{ nombre: 'Avisos', valores: s.v, color: 1 }], titulo: 'Avisos por semana', vacio: 'Aún no has enviado notificaciones' }));
    const N = { course: 'Nuevo curso', live: 'Clase en vivo', pdf: 'Material', promo: 'Promoción', general: 'General' }, c = {}; l.forEach(n => { const t = N[n.category] || 'General'; c[t] = (c[t] || 0) + 1; });
    poner('zgNotTipo', ZG.anillo({ items: Object.entries(c).map(([n, v], i) => ({ nombre: n, valor: v, color: i + 1 })), etiquetaTotal: 'avisos', vacio: 'Aún no has enviado notificaciones' }));
  }
})();
