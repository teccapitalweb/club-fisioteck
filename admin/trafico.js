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
  let nombresPais = null;
  try { nombresPais = new Intl.DisplayNames(['es'], { type: 'region' }); } catch (_) { nombresPais = null; }
  const pais = c => c === 'ZZ' ? 'Sin identificar' : ((nombresPais && nombresPais.of(c)) || c);
  let rango = 30, periodo = 'hoy', D = null;

  // ---------- Se agrega al panel: menú y sección ----------
  function montar() {
    if ($('sec-traffic')) return;
    const nav = document.querySelector('.admin-nav-item[data-section="metrics"]'), sec = $('sec-metrics');
    if (!nav || !sec) return;
    const item = document.createElement('div');
    item.className = 'admin-nav-item'; item.dataset.section = 'traffic'; item.setAttribute('onclick', "showSection('traffic')");
    item.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></svg>Tráfico del sitio';
    nav.insertAdjacentElement('beforebegin', item);
    const s = document.createElement('section');
    s.className = 'admin-section'; s.id = 'sec-traffic';
    s.innerHTML =
      '<div class="admin-page-header"><div><div class="admin-page-title">Tráfico del sitio</div><div class="admin-page-sub">Cuánta gente entra, desde dónde y por qué red social llega</div></div>' +
      '<div class="tr-acciones"><div class="tr-seg" id="trRango"></div><button type="button" class="btn btn-o btn-sm" onclick="trCsv()">Descargar CSV</button></div></div>' +
      '<div id="trEstado"></div><div class="ap-kpis" id="trKpis"></div>' +
      '<div class="admin-card"><h3>Visitas día a día</h3><div id="trSerie"></div></div>' +
      '<div class="zg-fila-graficas"><div class="admin-card"><h3>¿De dónde llega la gente?</h3><div id="trFuentes"></div></div><div class="admin-card"><h3>Redes sociales</h3><div id="trRedes"></div><p class="tr-nota" id="trNotaMeta"></p></div></div>' +
      '<div class="zg-fila-graficas"><div class="admin-card"><h3>Dispositivos</h3><div id="trDisp"></div></div><div class="admin-card"><h3>Países</h3><div id="trPaises"></div></div></div>' +
      '<div class="zg-fila-graficas"><div class="admin-card"><h3>¿Qué día entra más gente?</h3><div id="trSemana"></div></div><div class="admin-card"><h3>Mapa de calor · día y hora</h3><p class="tr-nota">Hora de México. Más oscuro = más visitas.</p><div id="trCalor"></div></div></div>' +
      '<div class="zg-fila-graficas"><div class="admin-card"><h3>Páginas más vistas</h3><div id="trPaginas"></div></div><div class="admin-card"><h3>¿De dónde salen las cuentas nuevas?</h3><p class="tr-nota" id="trNotaOrigen"></p><div id="trOrigen"></div></div></div>' +
      '<div class="admin-card" style="overflow-x:auto"><h3>Miembros que entraron al Club</h3><table class="admin-table"><thead><tr><th>Miembro</th><th>Correo</th><th>Última visita</th><th>Visitas</th><th>Días activos</th></tr></thead><tbody id="trMiembros"></tbody></table></div>' +
      '<div class="admin-card" style="overflow-x:auto"><div class="tr-cab"><h3 style="margin:0">Visitas por periodo</h3><div class="tr-seg" id="trPeriodo"></div></div><p class="tr-nota" id="trLogResumen"></p>' +
      '<table class="admin-table"><thead><tr><th>Hora</th><th>Página</th><th>Origen</th><th>País</th><th>Dispositivo</th><th>Persona</th></tr></thead><tbody id="trLog"></tbody></table><p class="tr-nota">Cada visita se guarda sola al ocurrir, sin IP ni datos personales.</p></div>';
    sec.insertAdjacentElement('afterend', s);
    $('trRango').innerHTML = [[7, '7 días'], [30, '30 días'], [84, '12 semanas'], [365, '1 año']].map(r => '<button type="button" data-r="' + r[0] + '" onclick="trRango(' + r[0] + ')">' + r[1] + '</button>').join('');
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
      D = await apiAdmin('/api/admin/metricas?dias=' + rango);
      est.innerHTML = '';
      pintar();
      trLog();
    } catch (err) {
      est.innerHTML = '<div class="admin-card" style="border-color:var(--danger);color:var(--danger)">No se pudieron leer las métricas: ' + e(err.message) + '. Enciende el servidor (npm start) y vuelve a intentar.</div>';
    }
  };
  window.trRango = r => { rango = r; marcar(); trCargar(); };
  window.trPeriodo = p => { periodo = p; marcar(); trLog(); };

  const suma = (dias, campo) => { const t = {}; dias.forEach(d => Object.entries(d[campo] || {}).forEach(([k, v]) => { t[k] = (t[k] || 0) + v; })); return t; };
  const orden = obj => Object.entries(obj).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);

  function pintar() {
    marcar();
    const dias = D.dias || [], total = dias.reduce((t, d) => t + d.total, 0), unicos = dias.reduce((t, d) => t + d.unicos, 0);
    const conDatos = dias.filter(d => d.total > 0).length, prom = dias.length ? Math.round(total / dias.length) : 0;
    const horas = suma(dias, 'horas'), pico = orden(horas)[0];
    const miembrosEntraron = (D.miembros || []).length;
    const origenes = (D.origenes || []).filter(o => o.creada && dias.length && o.creada.slice(0, 10) >= dias[0].dia);
    const on = D.encendido !== false, st = D.estado || {};
    $('trEstado').innerHTML = '<div class="tr-estado ' + (on ? 'ok' : 'off') + '"><i></i><span>' + (on ? (st.ultimoOk ? 'Contador activo · última visita ' + new Date(st.ultimoOk).toLocaleString('es-MX', { timeZone: D.zona, day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) : 'Contador activo · esperando la primera visita') : 'El contador está APAGADO: no se cuenta ninguna visita') + (st.errores ? ' · ' + st.errores + ' error(es) desde el último arranque' : '') + '</span>' +
      '<button type="button" class="btn btn-o btn-sm" onclick="trContador(' + (on ? 'false' : 'true') + ')">' + (on ? 'Apagar contador' : 'Encender contador') + '</button></div>';
    const kpi = (l, v, n, c) => '<div class="ap-kpi" style="--k:' + c + '"><div class="lbl">' + l + '</div><div class="val">' + e(v) + '</div><div class="note">' + e(n) + '</div></div>';
    $('trKpis').innerHTML = kpi('Visitas', num(total), 'Páginas vistas en el periodo', 'var(--accent)') + kpi('Personas distintas', num(unicos), 'Únicas por día, sumadas', 'var(--blue)') +
      kpi('Promedio por día', num(prom), pico ? 'Hora pico: ' + (Number(pico[0]) % 12 || 12) + (Number(pico[0]) < 12 ? ' a. m.' : ' p. m.') : 'Aún sin visitas', 'var(--warning)') +
      kpi('Cuentas nuevas', num(origenes.length), miembrosEntraron + ' miembros entraron al Club', 'var(--success)');
    const etq = dias.map(d => d.dia.slice(5));
    $('trSerie').innerHTML = ZG.serie({ etiquetas: etq, series: [{ nombre: 'Visitas', valores: dias.map(d => d.total), color: 1 }, { nombre: 'Personas distintas', valores: dias.map(d => d.unicos), color: 2 }], vacio: on ? 'Todavía no hay visitas registradas. En cuanto entre la primera persona al sitio, aparecerá aquí.' : 'El contador está apagado.' });

    const fuentes = orden(suma(dias, 'fuentes')), totF = fuentes.reduce((t, [, v]) => t + v, 0);
    $('trFuentes').innerHTML = ZG.barrasH({ items: fuentes.map(([k, v]) => ({ nombre: NOMBRE_FUENTE[k] || k, valor: v })), vacio: 'Aún no hay visitas' });
    const sociales = fuentes.filter(([k]) => REDES.includes(k)), totS = sociales.reduce((t, [, v]) => t + v, 0);
    $('trRedes').innerHTML = ZG.barrasH({ items: sociales.map(([k, v]) => ({ nombre: NOMBRE_FUENTE[k], valor: v, color: 4 })), vacio: 'Todavía nadie ha llegado desde una red social. Comparte tus enlaces con ?utm_source=facebook o ?utm_source=instagram para medirlo con exactitud.' });
    const meta = (suma(dias, 'fuentes').meta) || 0;
    $('trNotaMeta').innerHTML = totF ? '<b>' + num(totS) + '</b> de ' + num(totF) + ' personas (' + Math.round(totS / Math.max(1, totF) * 100) + '%) llegaron desde una red social.' + (meta ? ' «Meta» son enlaces de Facebook o Instagram sin saber de cuál; para separarlos agrega <code>?utm_source=instagram</code> en tus anuncios.' : '') : '';

    const disp = suma(dias, 'dispositivos');
    $('trDisp').innerHTML = ZG.anillo({ items: Object.keys(NOMBRE_DISP).map((k, i) => ({ nombre: NOMBRE_DISP[k], valor: disp[k] || 0, color: i + 1 })), etiquetaTotal: 'personas', vacio: 'Aún no hay visitas' });
    const paises = orden(suma(dias, 'paises')), totP = paises.reduce((t, [, v]) => t + v, 0);
    $('trPaises').innerHTML = ZG.barrasH({ items: paises.slice(0, 10).map(([k, v]) => ({ nombre: pais(k), valor: v, color: 3 })), vacio: 'Aún no hay visitas' }) +
      (totP ? '<p class="tr-nota">' + Math.round(((suma(dias, 'paises').MX) || 0) / totP * 100) + '% desde México' + (suma(dias, 'paises').ZZ ? ' · ' + num(suma(dias, 'paises').ZZ) + ' sin identificar' : '') + '.</p>' : '');

    // día de la semana y mapa de calor (lunes = 0)
    const porDia = [0, 0, 0, 0, 0, 0, 0], cuentaDia = [0, 0, 0, 0, 0, 0, 0], calor = DIAS_SEM.map(() => Array(24).fill(0));
    dias.forEach(d => {
      const [a, m, dd] = d.dia.split('-').map(Number), sem = (new Date(Date.UTC(a, m - 1, dd)).getUTCDay() + 6) % 7;
      porDia[sem] += d.total; cuentaDia[sem] += 1;
      for (let h = 0; h < 24; h++) calor[sem][h] += (d.horas && d.horas[String(h).padStart(2, '0')]) || 0;
    });
    $('trSemana').innerHTML = ZG.barras({ etiquetas: DIAS_SEM, series: [{ nombre: 'Visitas por día (promedio)', valores: porDia.map((v, i) => Math.round(v / Math.max(1, cuentaDia[i]))), color: 1 }], vacio: 'Aún no hay visitas' });
    $('trCalor').innerHTML = ZG.mapaCalor({ filas: DIAS_SEM, columnas: Array.from({ length: 24 }, (_, h) => String(h)), valores: calor, vacio: 'Aún no hay visitas' });

    const pag = suma(dias, 'paginas');
    $('trPaginas').innerHTML = ZG.barrasH({ items: orden(pag).map(([k, v]) => ({ nombre: NOMBRE_PAGINA[k] || k, valor: v, color: 6 })), vacio: 'Aún no hay visitas' });

    const porOrigen = {};
    origenes.forEach(o => { const k = o.origen || 'directo'; porOrigen[k] = porOrigen[k] || { n: 0, vip: 0 }; porOrigen[k].n += 1; if (o.vip) porOrigen[k].vip += 1; });
    const ord = Object.entries(porOrigen).sort((a, b) => b[1].n - a[1].n);
    $('trNotaOrigen').textContent = D.sinOrigen ? num(D.sinOrigen) + ' cuenta(s) anteriores al contador no tienen origen.' : 'Cada cuenta nueva guarda por dónde llegó.';
    $('trOrigen').innerHTML = ord.length ? '<table class="admin-table"><thead><tr><th>Origen</th><th>Cuentas</th><th>Miembros</th><th>Conversión</th></tr></thead><tbody>' + ord.map(([k, v]) => '<tr><td>' + e(NOMBRE_FUENTE[k] || k) + '</td><td>' + v.n + '</td><td>' + v.vip + '</td><td>' + Math.round(v.vip / v.n * 100) + '%</td></tr>').join('') + '</tbody></table>' : ZG.vacio('Aún no hay cuentas con origen en este periodo');

    $('trMiembros').innerHTML = (D.miembros || []).length ? D.miembros.slice(0, 50).map(m => '<tr><td>' + e(m.nombre || '—') + '</td><td>' + e(m.email) + '</td><td>' + new Date(m.ultima).toLocaleString('es-MX', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) + '</td><td>' + m.visitas + '</td><td>' + Object.keys(m.dias || {}).length + '</td></tr>').join('') : '<tr><td colspan="5" class="tr-vacio">Todavía no hay miembros con visitas registradas.</td></tr>';
  }

  async function trLog() {
    marcar();
    try {
      const r = await apiAdmin('/api/admin/visitas?periodo=' + periodo);
      $('trLogResumen').textContent = num(r.total) + ' visita(s) del ' + r.desde + (r.desde === r.hasta ? '' : ' al ' + r.hasta) + (r.truncado ? ' · se muestran las más recientes' : '') + '.';
      $('trLog').innerHTML = r.items.length ? r.items.slice(0, 200).map(x => '<tr><td>' + new Date(x.t).toLocaleString('es-MX', { timeZone: D ? D.zona : 'America/Mexico_City', hour: 'numeric', minute: '2-digit', day: 'numeric', month: 'short' }) + '</td><td>' + e(NOMBRE_PAGINA[x.pagina] || x.pagina) + '</td><td>' + e(NOMBRE_FUENTE[x.fuente] || x.fuente) + '</td><td>' + e(pais(x.pais)) + '</td><td>' + e(NOMBRE_DISP[x.dispositivo] || '') + '</td><td>' + (x.nuevo ? 'Primera del día' : 'Ya había entrado') + '</td></tr>').join('') : '<tr><td colspan="6" class="tr-vacio">No hay visitas en este periodo.</td></tr>';
    } catch (err) { $('trLog').innerHTML = '<tr><td colspan="6" class="tr-vacio">' + e(err.message) + '</td></tr>'; }
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
  window.showSection = function (sec) { showOriginal.apply(this, arguments); if (sec === 'traffic') trCargar(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
