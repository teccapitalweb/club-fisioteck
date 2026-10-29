/* Panel FisioTeck — Tráfico del sitio (como las Métricas de Alintec Food):
   cuántas personas entran a la portada y al Club, desde qué dispositivo, desde qué país y de dónde llegan (Facebook, Instagram, Google…),
   a qué hora entran, qué miembros entraron y de qué red social salen las cuentas nuevas. Conteo anónimo y sin cookies (el servidor no guarda la IP).
   Datos: GET /api/admin/metricas?dias=N y GET /api/admin/visitas?periodo=hoy|ayer|7|30. Depende de index.html: apiAdmin, toast, esc, showSection, ZG. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const e = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = n => Number(n || 0).toLocaleString('es-MX');
  const NOMBRE_FUENTE = { directo: 'Directo', interno: 'Dentro del sitio', google: 'Google', bing: 'Bing', duckduckgo: 'DuckDuckGo', yahoo: 'Yahoo', facebook: 'Facebook', instagram: 'Instagram', meta: 'Meta (Facebook o Instagram)', whatsapp: 'WhatsApp', linkedin: 'LinkedIn', x: 'X (Twitter)', youtube: 'YouTube', tiktok: 'TikTok', correo: 'Correo', otros: 'Otros sitios', sin_dato: 'Sin dato' };
  const REDES = ['facebook', 'instagram', 'meta', 'whatsapp', 'tiktok', 'youtube', 'linkedin', 'x'];
  const NOMBRE_DISP = { movil: 'Celular', tablet: 'Tablet', computadora: 'Computadora' };
  const NOMBRE_PAGINA = { landing: 'Portada', acceso: 'Acceso al Club (login)', club: 'Dentro del Club', legal: 'Páginas legales', verificar: 'Verificar certificado' };
  const DIAS_SEM = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  let nombresPais = null;
  try { nombresPais = new Intl.DisplayNames(['es'], { type: 'region' }); } catch (_) { nombresPais = null; }
  const pais = c => c === 'ZZ' ? 'Sin identificar' : ((nombresPais && nombresPais.of(c)) || c);
  let rango = 7, desfase = 0, periodo = 'hoy', D = null;
  const RANGOS = [[7, 'Semana'], [30, '30 días'], [90, '90 días'], [365, '12 meses'], [0, 'Todo']];

  // ---------- Fechas (claves AAAA-MM-DD, sin zonas horarias) ----------
  const aFecha = k => { const [a, m, d] = k.split('-').map(Number); return new Date(Date.UTC(a, m - 1, d)); };
  const aClave = f => f.toISOString().slice(0, 10);
  const mas = (k, n) => { const f = aFecha(k); f.setUTCDate(f.getUTCDate() + n); return aClave(f); };
  const corta = k => { const f = aFecha(k); return f.getUTCDate() + ' ' + MESES[f.getUTCMonth()]; };
  const semDe = k => (aFecha(k).getUTCDay() + 6) % 7;

  // ---------- Se agrega al panel: dentro de Métricas (como Alintec) ----------
  function montar() {
    if ($('sec-traffic')) return;
    const sec = $('sec-metrics');
    if (!sec) return;
    const viejoCab = sec.querySelector(':scope > .admin-page-header'); if (viejoCab) viejoCab.remove();
    const s = document.createElement('div');
    s.id = 'sec-traffic';
    s.innerHTML =
      '<div class="admin-page-header"><div><div class="tr-eyebrow">Marketing</div><div class="admin-page-title">Métricas de visitas</div><p class="tr-desc">Cuánta gente visita FisioTeck, desde dónde llega y de qué red social salen tus miembros. Conteo anónimo y sin cookies; todo se guarda día a día para que consultes el historial.</p></div></div>' +
      '<div id="trEstado"></div>' +
      '<div class="admin-card tr-control"><div class="tr-seg" id="trRango"></div><div class="tr-nav"><div class="tr-flechas"><button type="button" id="trPrev" onclick="trMover(1)" aria-label="Periodo anterior">&#8249;</button><div class="tr-fecha"><b id="trFecha"></b><small id="trFechaN"></small></div><button type="button" id="trNext" onclick="trMover(-1)" aria-label="Periodo siguiente">&#8250;</button></div><button type="button" class="btn btn-o btn-sm" onclick="trCsv()">Descargar historial (CSV)</button></div></div>' +
      '<div class="ap-kpis" id="trKpis"></div>' +
      '<div class="admin-card"><div class="tr-cab"><div><h3 style="margin:0">Visitas por día de la semana</h3><p class="tr-nota" style="margin:2px 0 0">De lunes a domingo; los días que aún no pasan quedan vacíos.</p></div></div><div id="trSemanaAct"></div></div>' +
      '<div class="admin-card" style="overflow-x:auto"><div class="tr-cab"><div><h3 style="margin:0">Visitas por periodo</h3><p class="tr-nota" id="trLogResumen" style="margin:2px 0 0"></p></div><div class="tr-seg" id="trPeriodo"></div></div>' +
      '<table class="admin-table"><thead><tr><th>Hora</th><th>Página</th><th>Origen</th><th>País y dispositivo</th></tr></thead><tbody id="trLog"></tbody></table><p class="tr-nota">Cada visita se guarda sola al ocurrir, sin IP ni datos personales.</p></div>' +
      '<div class="admin-card"><h3>¿De dónde vienen tus miembros?</h3><p class="tr-nota" id="trNotaOrigen"></p><div id="trTopOrigen"></div><div id="trOrigen"></div></div>' +
      '<div class="admin-card"><h3>Redes sociales · ¿cuánta gente llega de cada una?</h3><p class="tr-nota" id="trNotaMeta"></p><div id="trRedes"></div></div>' +
      '<div class="admin-card"><h3>Redes sociales a lo largo del tiempo</h3><p class="tr-nota">Cuántas personas llegaron de cada red día a día.</p><div id="trRedesTiempo"></div></div>' +
      '<div class="admin-card"><h3>¿Qué día entra más gente?</h3><p class="tr-nota" id="trNotaSem"></p><div id="trSemana"></div></div>' +
      '<div class="admin-card"><h3>Mapa de calor · día y hora</h3><p class="tr-nota">Cuándo entra la gente (hora de México). Más oscuro = más visitas.</p><div id="trCalor"></div></div>' +
      '<div class="zg-fila-graficas"><div class="admin-card"><h3>Países</h3><div id="trPaises"></div></div><div class="admin-card"><h3>Dispositivos</h3><p class="tr-nota">Desde qué aparato entra la gente.</p><div id="trDisp"></div></div></div>' +
      '<div class="zg-fila-graficas"><div class="admin-card"><h3>Cómo llegan al sitio</h3><p class="tr-nota">Por dónde entró cada persona en su primera visita del día.</p><div id="trFuentes"></div></div><div class="admin-card"><h3>Páginas más vistas</h3><p class="tr-nota">Dónde entra la gente.</p><div id="trPaginas"></div></div></div>' +
      '<div class="admin-card"><h3>Quiénes entraron al panel</h3><p class="tr-nota" id="trMiembrosN"></p><div id="trMiembros"></div></div>' +
      '<h2 class="tr-sub">Crecimiento y conversión del Club</h2>';
    sec.insertBefore(s, sec.firstChild);
    $('trRango').innerHTML = RANGOS.map(r => '<button type="button" data-r="' + r[0] + '" onclick="trRango(' + r[0] + ')">' + r[1] + '</button>').join('');
    $('trPeriodo').innerHTML = [['hoy', 'Hoy'], ['ayer', 'Ayer'], ['7', '7 días'], ['30', '30 días']].map(r => '<button type="button" data-p="' + r[0] + '" onclick="trPeriodo(\'' + r[0] + '\')">' + r[1] + '</button>').join('');
    marcar();
  }
  const marcar = () => {
    document.querySelectorAll('#trRango button').forEach(b => b.classList.toggle('on', Number(b.dataset.r) === rango));
    document.querySelectorAll('#trPeriodo button').forEach(b => b.classList.toggle('on', b.dataset.p === periodo));
  };

  // ---------- Carga ----------
  window.trCargar = async function () {
    const est = $('trEstado'); if (!est) return;
    try {
      const largo = rango === 0 ? 730 : Math.min(730, (desfase + 2) * rango + 7);
      D = await apiAdmin('/api/admin/metricas?dias=' + largo);
      pintar();
      trLog();
    } catch (err) {
      est.innerHTML = '<div class="admin-card" style="border-color:var(--danger);color:var(--danger)">No se pudieron leer las métricas: ' + e(err.message) + '. Enciende el servidor (npm start) y vuelve a intentar.</div>';
    }
  };
  window.trRango = r => { rango = r; desfase = 0; marcar(); trCargar(); };
  window.trMover = n => { if (rango === 0) return; desfase = Math.max(0, desfase + n); trCargar(); };
  window.trPeriodo = p => { periodo = p; marcar(); trLog(); };

  const suma = (dias, campo) => { const t = {}; dias.forEach(d => Object.entries(d[campo] || {}).forEach(([k, v]) => { t[k] = (t[k] || 0) + v; })); return t; };
  const orden = obj => Object.entries(obj).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);

  // Ventana del periodo elegido y la anterior (para comparar)
  function ventana() {
    const todos = D.dias || [], hoy = D.hoy || (todos.length ? todos[todos.length - 1].dia : aClave(new Date()));
    const porClave = {}; todos.forEach(d => { porClave[d.dia] = d; });
    const vacio = k => porClave[k] || { dia: k, total: 0, unicos: 0, miembros: 0, horas: {}, fuentes: {}, paises: {}, dispositivos: {}, paginas: {} };
    if (rango === 0) { return { dias: todos, previo: null, desde: todos.length ? todos[0].dia : hoy, hasta: hoy, rotulo: 'Todo el historial', nota: todos.length + ' días' }; }
    let desde, hasta;
    if (rango === 7) { desde = mas(mas(hoy, -semDe(hoy)), -7 * desfase); hasta = mas(desde, 6); }
    else { hasta = mas(hoy, -desfase * rango); desde = mas(hasta, -(rango - 1)); }
    const rec = (a, z) => { const r = []; for (let k = a; k <= z; k = mas(k, 1)) r.push(vacio(k)); return r; };
    const dias = rec(desde, hasta), previo = rec(mas(desde, -rango), mas(desde, -1));
    const nota = rango === 7 ? (desfase === 0 ? 'Esta semana' : desfase === 1 ? 'Semana anterior' : 'Hace ' + desfase + ' semanas') : (desfase === 0 ? 'Últimos ' + (rango === 365 ? '12 meses' : rango + ' días') : 'Periodo anterior ×' + desfase);
    return { dias, previo, desde, hasta, rotulo: corta(desde) + ' – ' + corta(hasta), nota };
  }
  const delta = (a, b) => { if (!(b > 0)) return ''; const p = Math.round((a - b) / b * 100); if (p === 0) return '<span class="tr-delta">= igual que el periodo anterior</span>'; return '<span class="tr-delta ' + (p > 0 ? 'sube' : 'baja') + '">' + (p > 0 ? '▲ ' : '▼ ') + Math.abs(p) + '% vs periodo anterior</span>'; };

  function pintar() {
    marcar();
    const W = ventana(), dias = W.dias, previo = W.previo;
    $('trFecha').textContent = W.rotulo; $('trFechaN').textContent = W.nota;
    $('trPrev').disabled = rango === 0; $('trNext').disabled = rango === 0 || desfase === 0;
    const total = dias.reduce((t, d) => t + d.total, 0), unicos = dias.reduce((t, d) => t + d.unicos, 0);
    const prom = dias.length ? Math.round(total / dias.length) : 0;
    const horas = suma(dias, 'horas'), pico = orden(horas)[0];
    const origenesTodos = D.origenes || [];
    const enVentana = o => o.creada && String(o.creada).slice(0, 10) >= W.desde && String(o.creada).slice(0, 10) <= W.hasta;
    const origenes = origenesTodos.filter(enVentana);
    const origenesPrev = previo ? origenesTodos.filter(o => o.creada && String(o.creada).slice(0, 10) >= previo[0].dia && String(o.creada).slice(0, 10) <= previo[previo.length - 1].dia) : [];
    const on = D.encendido !== false, st = D.estado || {};
    $('trEstado').innerHTML = '<div class="tr-estado ' + (on ? 'ok' : 'off') + '"><i></i><span>' + (on ? (st.ultimoOk ? 'Contador activo · última visita ' + new Date(st.ultimoOk).toLocaleString('es-MX', { timeZone: D.zona, day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) : 'Contador activo · esperando la primera visita') : 'El contador está APAGADO: no se cuenta ninguna visita') + (st.errores ? ' · ' + st.errores + ' error(es) desde el último arranque' : '') + '</span>' +
      '<button type="button" class="btn btn-o btn-sm" onclick="trContador(' + (on ? 'false' : 'true') + ')">' + (on ? 'Apagar contador' : 'Encender contador') + '</button></div>';
    const kpi = (l, v, nota, dl, c, spark) => '<div class="ap-kpi" style="--k:' + c + '"><div class="lbl">' + l + '</div><div class="val">' + e(v) + '</div><div class="note">' + e(nota) + '</div>' + dl + (spark ? ZG.sparkline(spark, { color: 1 }) : '') + '</div>';
    const porDiaCuentas = dias.map(d => origenes.filter(o => String(o.creada).slice(0, 10) === d.dia).length);
    const tPrev = previo ? previo.reduce((t, d) => t + d.total, 0) : 0, uPrev = previo ? previo.reduce((t, d) => t + d.unicos, 0) : 0, pPrev = previo && previo.length ? Math.round(tPrev / previo.length) : 0;
    $('trKpis').innerHTML = kpi('Visitas', num(total), 'Páginas vistas', delta(total, tPrev), 'var(--success)', dias.map(d => d.total)) + kpi('Personas distintas', num(unicos), 'Visitantes únicos por día, sumados', delta(unicos, uPrev), 'var(--blue)', dias.map(d => d.unicos)) +
      kpi('Cuentas nuevas', num(origenes.length), 'Personas que crearon su cuenta', delta(origenes.length, origenesPrev.length), 'var(--warning)', porDiaCuentas) +
      kpi('Promedio por día', num(prom), pico ? 'Hora pico: ' + (Number(pico[0]) % 12 || 12) + (Number(pico[0]) < 12 ? ' a. m.' : ' p. m.') : 'Aún sin visitas', delta(prom, pPrev), 'var(--accent)', dias.map(d => d.total));

    // Visitas por día de la semana (lunes a domingo)
    const sem = { v: [0, 0, 0, 0, 0, 0, 0], u: [0, 0, 0, 0, 0, 0, 0], n: [0, 0, 0, 0, 0, 0, 0] };
    dias.forEach(d => { const i = semDe(d.dia); sem.v[i] += d.total; sem.u[i] += d.unicos; sem.n[i] += 1; });
    $('trSemanaAct').innerHTML = ZG.barras({ etiquetas: DIAS_SEM, series: [{ nombre: 'Visitas', valores: sem.v, color: 1 }, { nombre: 'Personas distintas', valores: sem.u, color: 2 }], vacio: on ? 'Todavía no hay visitas registradas.' : 'El contador está apagado.' });

    // De dónde vienen tus miembros
    const porOrigen = {};
    origenes.forEach(o => { const k = o.origen || 'directo'; porOrigen[k] = porOrigen[k] || { n: 0, vip: 0 }; porOrigen[k].n += 1; if (o.vip) porOrigen[k].vip += 1; });
    const ord = Object.entries(porOrigen).sort((a, b) => b[1].n - a[1].n);
    $('trNotaOrigen').textContent = 'Cuentas creadas en este periodo, según la red social o el enlace por el que llegaron' + (D.sinOrigen ? ' · ' + num(D.sinOrigen) + ' cuenta(s) anteriores al contador no tienen origen.' : '.');
    $('trTopOrigen').innerHTML = ord.length ? '<div class="tr-top"><span class="tr-ini">' + e((NOMBRE_FUENTE[ord[0][0]] || ord[0][0])[0]) + '</span><p><b>' + e(NOMBRE_FUENTE[ord[0][0]] || ord[0][0]) + '</b> es de donde más miembros llegaron: <b>' + ord[0][1].n + '</b> de ' + origenes.length + ' cuentas nuevas (' + Math.round(ord[0][1].n / origenes.length * 100) + '%).</p></div>' : '';
    $('trOrigen').innerHTML = ord.length ? ZG.barrasH({ items: ord.map(([k, v]) => ({ nombre: NOMBRE_FUENTE[k] || k, valor: v.n, color: 1 })), vacio: '' }) +
      '<table class="admin-table"><thead><tr><th>Origen</th><th style="text-align:right">Cuentas</th><th style="text-align:right">VIP</th><th style="text-align:right">Conversión</th></tr></thead><tbody>' + ord.map(([k, v]) => '<tr><td>' + e(NOMBRE_FUENTE[k] || k) + '</td><td style="text-align:right">' + v.n + '</td><td style="text-align:right">' + v.vip + '</td><td style="text-align:right">' + Math.round(v.vip / v.n * 100) + '%</td></tr>').join('') + '</tbody></table>' : ZG.vacio('Aún no hay cuentas con origen en este periodo');

    // Redes sociales
    const fuentes = orden(suma(dias, 'fuentes')), totF = fuentes.reduce((t, [, v]) => t + v, 0);
    const sociales = fuentes.filter(([k]) => REDES.includes(k)), totS = sociales.reduce((t, [, v]) => t + v, 0), meta = (suma(dias, 'fuentes').meta) || 0;
    $('trRedes').innerHTML = ZG.barrasH({ items: sociales.map(([k, v]) => ({ nombre: NOMBRE_FUENTE[k], valor: v, color: 4 })), vacio: 'Todavía nadie ha llegado desde una red social. Comparte tus enlaces con ?utm_source=facebook o ?utm_source=instagram para medirlo con exactitud.' });
    $('trNotaMeta').innerHTML = totF ? '<b>' + num(totS) + '</b> de ' + num(totF) + ' personas (' + Math.round(totS / Math.max(1, totF) * 100) + '%) llegaron desde una red social' + (sociales.length ? '. La más fuerte: <b>' + e(NOMBRE_FUENTE[sociales[0][0]]) + '</b>' : '') + '.' + (meta ? ' «Meta» son enlaces de Facebook o Instagram sin saber de cuál; para separarlos agrega <code>?utm_source=instagram</code> en tus anuncios.' : '') : '';
    const redesPresentes = REDES.filter(r => dias.some(d => (d.fuentes || {})[r] > 0));
    const largo = dias.length > 31, bloques = largo ? Array.from({ length: Math.ceil(dias.length / 7) }, (_, k) => dias.slice(k * 7, k * 7 + 7)) : dias.map(d => [d]);
    $('trRedesTiempo').innerHTML = ZG.barras({ etiquetas: bloques.map(b => largo ? corta(b[0].dia) : (dias.length <= 7 ? DIAS_SEM[semDe(b[0].dia)] : corta(b[0].dia))),
      series: redesPresentes.map((r, i) => ({ nombre: (NOMBRE_FUENTE[r] || r).replace('Meta (Facebook o Instagram)', 'Meta sin identificar'), valores: bloques.map(b => b.reduce((t, d) => t + ((d.fuentes || {})[r] || 0), 0)), color: [2, 4, 5, 3, 6, 7, 8, 1][i % 8] })), apilado: true, vacio: 'Aún no hay visitas desde redes sociales' });

    // Día de la semana (promedio) y mapa de calor
    const prof = sem.v.map((v, i) => Math.round(v / Math.max(1, sem.n[i]))), top = prof.indexOf(Math.max(...prof));
    $('trNotaSem').innerHTML = prof.some(Boolean) ? 'Promedio de visitas por día de la semana en el periodo. El más fuerte: <b>' + DIAS_SEM[top] + '</b>.' : '';
    $('trSemana').innerHTML = ZG.barras({ etiquetas: DIAS_SEM, series: [{ nombre: 'Visitas por día (promedio)', valores: prof, color: 1 }], vacio: 'Aún no hay visitas' });
    const calor = DIAS_SEM.map(() => Array(24).fill(0));
    dias.forEach(d => { const i = semDe(d.dia); for (let h = 0; h < 24; h++) calor[i][h] += (d.horas && d.horas[String(h).padStart(2, '0')]) || 0; });
    $('trCalor').innerHTML = ZG.mapaCalor({ filas: DIAS_SEM, columnas: Array.from({ length: 24 }, (_, h) => String(h)), valores: calor, vacio: 'Aún no hay visitas' });

    const paises = orden(suma(dias, 'paises')), totP = paises.reduce((t, [, v]) => t + v, 0), fuera = totP - ((suma(dias, 'paises').MX) || 0);
    $('trPaises').innerHTML = ZG.barrasH({ items: paises.slice(0, 10).map(([k, v]) => ({ nombre: pais(k), valor: v, color: 3 })), vacio: 'Aún no hay visitas' }) + (totP ? '<p class="tr-nota">Hubo <b>' + num(fuera) + '</b> persona(s) de fuera de México.</p>' : '');
    const disp = suma(dias, 'dispositivos');
    $('trDisp').innerHTML = ZG.anillo({ items: Object.keys(NOMBRE_DISP).map((k, i) => ({ nombre: NOMBRE_DISP[k], valor: disp[k] || 0, color: i + 1 })), etiquetaTotal: 'personas', vacio: 'Aún no hay visitas' });
    $('trFuentes').innerHTML = ZG.anillo({ items: fuentes.map(([k, v], i) => ({ nombre: NOMBRE_FUENTE[k] || k, valor: v, color: (i % 8) + 1 })), etiquetaTotal: 'personas', vacio: 'Aún no hay visitas' });
    $('trPaginas').innerHTML = ZG.barrasH({ items: orden(suma(dias, 'paginas')).map(([k, v]) => ({ nombre: NOMBRE_PAGINA[k] || k, valor: v, color: 6 })), vacio: 'Aún no hay visitas' });

    // Quiénes entraron al panel
    const mias = (D.miembros || []).filter(m => Object.keys(m.dias || {}).some(k => k >= W.desde && k <= W.hasta));
    const orig = {}; origenesTodos.forEach(o => { orig[o.uid] = o.origen; });
    const anon = Math.max(0, unicos - mias.length);
    $('trMiembrosN').textContent = 'Miembros con sesión iniciada en el periodo.' + (anon ? ' Además hubo ' + num(anon) + ' visitantes anónimos que no se identifican.' : '');
    $('trMiembros').innerHTML = mias.length ? '<div class="tr-lista">' + mias.slice(0, 50).map(m => '<div class="tr-miembro"><span class="tr-ini">' + e((m.nombre || m.email || '?').trim().slice(0, 2).toUpperCase()) + '</span><div><b>' + e(m.nombre || '—') + '</b><small>' + e(m.email) + '</small>' + (orig[m.uid] ? '<em>' + e(NOMBRE_FUENTE[orig[m.uid]] || orig[m.uid]) + '</em>' : '') + '</div><span class="tr-vis"><b>' + Object.keys(m.dias || {}).filter(k => k >= W.desde && k <= W.hasta).reduce((t, k) => t + (m.dias[k] || 0), 0) + ' visitas</b><small>' + new Date(m.ultima).toLocaleString('es-MX', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) + '</small></span></div>').join('') + '</div>' : '<div class="tr-vacio">Todavía no hay miembros con visitas registradas en este periodo.</div>';
  }

  async function trLog() {
    marcar();
    try {
      const r = await apiAdmin('/api/admin/visitas?periodo=' + periodo);
      $('trLogResumen').textContent = num(r.total) + ' visitas · ' + num((r.items || []).filter(x => x.nuevo).length) + ' personas en este periodo' + (r.truncado ? ' · se muestran las más recientes' : '');
      const ref = x => { const p = x.pistas || {}; return p.ref ? 'viene de ' + p.ref : p.utm ? 'campaña ' + p.utm : p.fbclid ? 'enlace con marca de Meta' : 'sin pistas del origen'; };
      $('trLog').innerHTML = r.items.length ? r.items.slice(0, 200).map(x => '<tr><td style="white-space:nowrap">' + new Date(x.t).toLocaleString('es-MX', { timeZone: D ? D.zona : 'America/Mexico_City', hour: 'numeric', minute: '2-digit', day: 'numeric', month: 'short' }) + '</td><td>' + e(NOMBRE_PAGINA[x.pagina] || x.pagina) + '</td><td><b>' + e(NOMBRE_FUENTE[x.fuente] || x.fuente) + '</b><br><small style="color:var(--text-muted)">' + e(ref(x)) + '</small></td><td><b>' + e(pais(x.pais)) + '</b> · ' + e(NOMBRE_DISP[x.dispositivo] || '') + (x.nuevo ? ' · primera del día' : '') + '</td></tr>').join('') : '<tr><td colspan="4" class="tr-vacio">No hay visitas en este periodo.</td></tr>';
    } catch (err) { $('trLog').innerHTML = '<tr><td colspan="4" class="tr-vacio">' + e(err.message) + '</td></tr>'; }
  }

  window.trContador = async function (activo) {
    try { await fbDb.collection('config').doc('club').set({ contadorVisitas: activo === true }, { merge: true }); toast(activo ? 'Contador encendido (tarda hasta un minuto)' : 'Contador apagado (tarda hasta un minuto)'); setTimeout(trCargar, 1500); }
    catch (err) { toast('No se pudo cambiar: ' + (err.code || err.message)); }
  };
  window.trCsv = function () {
    if (!D || !D.dias) { toast('Aún no hay datos'); return; }
    const filas = [['dia', 'visitas', 'personas_distintas', 'miembros', 'celular', 'tablet', 'computadora', 'mexico', 'otros_paises', ...REDES.map(r => r), 'google', 'directo']];
    D.dias.forEach(d => { const pm = (d.paises || {}).MX || 0, tp = Object.values(d.paises || {}).reduce((a, b) => a + b, 0); filas.push([d.dia, d.total, d.unicos, d.miembros, d.dispositivos.movil, d.dispositivos.tablet, d.dispositivos.computadora, pm, tp - pm, ...REDES.map(r => d.fuentes[r] || 0), d.fuentes.google || 0, d.fuentes.directo || 0]); });
    const blob = new Blob(['﻿' + filas.map(f => f.join(',')).join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'trafico-fisioteck.csv'; a.click(); URL.revokeObjectURL(a.href);
  };

  const showOriginal = window.showSection;
  window.showSection = function (sec) { showOriginal.apply(this, arguments); if (sec === 'metrics') trCargar(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
