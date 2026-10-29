/* Panel FisioTeck — Recordatorios de pago por correo (como Alintec y Zoorigen).
   Escribe a quien se registró y NUNCA ha pagado: serie de 7 correos por vuelta (hasta 3 vueltas), con cupones únicos de Stripe de $50 y $100
   para el primer mes del plan mensual. ARRANCA APAGADO; aquí se enciende, se ajustan los topes, se hace un ensayo y se manda un correo de prueba.
   Todo lo hace el servidor (/api/admin/recordatorios/*). Depende de index.html: apiAdmin, toast, esc, showSection, ZG (graficas.js). */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const e = v => (typeof esc === 'function' ? esc(v) : String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])));
  const fmtMs = ms => ms ? new Date(ms).toLocaleString('es-MX', { timeZone: 'America/Mexico_City', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) : '—';
  const pesos = n => '$' + Number(n || 0).toLocaleString('es-MX');
  let E = null, pagina = 1, filtro = 'todas', texto = '', temporizador = null;

  // ---------- Se agrega al panel: menú y sección ----------
  function montar() {
    if ($('sec-reminders')) return;
    const nav = document.querySelector('.admin-nav-item[data-section="credits"]');
    const sec = $('sec-credits');
    if (!nav || !sec) return;
    const item = document.createElement('div');
    item.className = 'admin-nav-item'; item.dataset.section = 'reminders'; item.setAttribute('onclick', "showSection('reminders')");
    item.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>Recordatorios de pago';
    nav.insertAdjacentElement('afterend', item);
    const s = document.createElement('section');
    s.className = 'admin-section'; s.id = 'sec-reminders';
    s.innerHTML =
      '<div class="admin-page-header"><div><div class="admin-page-title">Recordatorios de pago</div><div class="admin-page-sub">Correos con cupón para quien se registró y nunca ha pagado</div></div>' +
      '<div class="rc-acciones"><button type="button" class="btn btn-o btn-sm" onclick="rcCargar(true)">Actualizar</button></div></div>' +
      '<div id="rcEstado"></div>' +
      '<div class="rc-control admin-card" id="rcControl"></div>' +
      '<div class="ap-kpis" id="rcKpis"></div>' +
      '<div class="zg-fila-graficas"><div class="admin-card"><h3>Correos enviados por paso</h3><div id="rcPasos"></div></div><div class="admin-card"><h3>De los correos al pago</h3><div id="rcEmbudo"></div></div></div>' +
      '<div class="zg-fila-graficas"><div class="admin-card"><h3>Calendario de la serie</h3><div id="rcSerie" style="overflow-x:auto"></div></div>' +
      '<div class="admin-card"><h3>Probar antes de activar</h3><p class="rc-nota">Un <b>ensayo</b> muestra quién recibiría un correo ahora, sin enviar nada. El <b>correo de prueba</b> te llega solo a ti, con un cupón real marcado como prueba (no cuenta en las estadísticas).</p>' +
      '<div class="rc-fila"><button type="button" class="btn btn-o btn-sm" onclick="rcEnsayo()">Hacer un ensayo</button>' +
      '<select class="form-select" id="rcPaso" style="max-width:150px"></select><select class="form-select" id="rcCiclo" style="max-width:130px"><option value="1">Vuelta 1</option><option value="2">Vuelta 2</option><option value="3">Vuelta 3</option></select>' +
      '<button type="button" class="btn btn-p btn-sm" onclick="rcPrueba()">Enviarme prueba</button></div><div id="rcEnsayo" style="margin-top:12px"></div></div></div>' +
      '<div class="admin-card" style="overflow-x:auto"><h3>Próximos envíos</h3><table class="admin-table"><thead><tr><th>Persona</th><th>Correo</th><th>Vuelta</th><th>Paso</th><th>Cupón</th><th>Sale</th></tr></thead><tbody id="rcProximos"></tbody></table></div>' +
      '<div class="admin-card" style="overflow-x:auto"><h3>Últimos enviados</h3><table class="admin-table"><thead><tr><th>Persona</th><th>Correo</th><th>Vuelta</th><th>Paso</th><th>Cupón</th><th>Enviado</th></tr></thead><tbody id="rcRecientes"></tbody></table></div>' +
      '<div class="admin-card" style="overflow-x:auto"><h3>Personas</h3><div class="rc-fila" style="margin-bottom:12px"><input class="form-input" id="rcBuscar" placeholder="Buscar por nombre o correo" style="max-width:280px" oninput="rcBuscar()"><select class="form-select" id="rcEtapa" style="max-width:220px" onchange="rcFiltrar(this.value)"></select></div>' +
      '<table class="admin-table"><thead><tr><th>Persona</th><th>Correo</th><th>Estado</th><th>Vuelta</th><th>Paso</th><th>Siguiente</th></tr></thead><tbody id="rcLista"></tbody></table><div id="rcPaginas" class="rc-fila" style="margin-top:12px"></div></div>';
    sec.insertAdjacentElement('afterend', s);
  }

  const ETAPAS = [['todas', 'Todas'], ['listas-ahora', 'Listas ahora'], ['programadas', 'Programadas'], ['en-espera', 'En espera de su primer correo'], ['enviado', 'Esperando su siguiente correo'], ['cupon-vigente', 'Con cupón vigente'], ['descanso', 'En descanso'], ['convertida', 'Convertidas con cupón'], ['pago', 'Ya pagaron'], ['baja', 'Se dieron de baja'], ['cerrada', 'Terminaron las 3 vueltas'], ['sin-verificar', 'Correo sin verificar']];

  // ---------- Carga ----------
  window.rcCargar = async function (aviso) {
    const est = $('rcEstado'); if (!est) return;
    try {
      E = await apiAdmin('/api/admin/recordatorios');
      est.innerHTML = '';
      pintar();
      await rcLista();
      if (aviso) toast('Datos actualizados');
    } catch (err) {
      est.innerHTML = '<div class="admin-card" style="border-color:var(--danger);color:var(--danger)">No se pudo leer el estado de los recordatorios: ' + e(err.message) + '. Enciende el servidor (npm start) y vuelve a intentar.</div>';
    }
  };

  function pintar() {
    const c = $('rcControl'), on = E.modo === 'activo';
    c.innerHTML =
      '<div class="rc-estado"><span class="rc-punto ' + (on ? 'on' : '') + '"></span><div><b>' + (on ? 'Activos' : 'Apagados') + '</b><div class="rc-nota" style="margin:2px 0 0">' +
      (on ? 'Revisan cada 20 minutos y envían de 8:00 a 22:00 (hora de México).' : 'No se envía ningún correo mientras estén apagados.') + '</div></div></div>' +
      (E.configurado ? '' : '<p class="rc-aviso">Falta configurar el correo en el servidor (<code>RESEND_API_KEY</code>, <code>MAIL_FROM</code>) o la llave de firmas (<code>CERT_SIGNING_KEY</code>). Hasta entonces no se puede activar.</p>') +
      '<div class="rc-fila"><button type="button" class="btn ' + (on ? 'btn-o' : 'btn-p') + '" onclick="rcModo(\'' + (on ? 'apagado' : 'activo') + '\')">' + (on ? 'Apagar los recordatorios' : 'Activar los recordatorios') + '</button>' +
      '<label class="rc-lim">Tope por día <input class="form-input" id="rcTope" type="number" min="1" max="500" value="' + E.topeDiario + '"></label>' +
      '<label class="rc-lim">Máx. por revisión <input class="form-input" id="rcMax" type="number" min="1" max="50" value="' + E.maxPorCorrida + '"></label>' +
      '<button type="button" class="btn btn-o btn-sm" onclick="rcLimites()">Guardar topes</button></div>';
    const g = E.estadisticas || {}, conv = g.convertidas || 0, env = Object.values(g.enviadosPaso || {}).reduce((a, b) => a + b, 0);
    $('rcKpis').innerHTML =
      kpi('Enviados hoy', E.enviadosHoy + ' / ' + E.topeDiario, 'Quedan ' + E.faltanHoy + ' hoy', 'var(--accent)') +
      kpi('Calificarían', E.calificarian, 'Sin pago, con correo verificado', 'var(--blue)') +
      kpi('Listas ahora', E.listasAhora, E.dentroDeHorario ? 'Salen en la próxima revisión' : 'Salen al abrir el horario (8:00)', 'var(--warning)') +
      kpi('Convertidas', conv, env ? 'De ' + env + ' correos enviados' : 'Aún sin envíos', 'var(--success)');
    const p = (g.enviadosPaso || {});
    $('rcPasos').innerHTML = window.ZG ? ZG.barras({ etiquetas: E.serie.map(s => 'Paso ' + s.paso), series: [{ nombre: 'Enviados', valores: E.serie.map(s => p['p' + s.paso] || 0), color: 1 }, { nombre: 'Pagos con cupón', valores: E.serie.map(s => (g.pagosConCuponPaso || {})['p' + s.paso] || 0), color: 6 }], vacio: 'Aún no se envía ningún correo' }) : '';
    $('rcEmbudo').innerHTML = window.ZG ? ZG.embudo({ etapas: [{ nombre: 'Correos enviados', valor: env }, { nombre: 'Pagaron después de un correo', valor: Object.values(g.pagosTrasCorreoPaso || {}).reduce((a, b) => a + b, 0) }, { nombre: 'Pagaron con el cupón', valor: conv }], vacio: 'Aún no hay envíos' }) : '';
    $('rcSerie').innerHTML = '<table class="admin-table"><thead><tr><th>Correo</th><th>Cupón</th><th>Sale</th></tr></thead><tbody>' + E.serie.map(s =>
      '<tr><td>Paso ' + s.paso + '</td><td>' + (s.monto ? pesos(s.monto) + ' (' + E.vigenciaHoras + ' h)' : 'Sin cupón · beneficios') + '</td><td>' + (s.desde === 'registro' ? s.esperaHoras + ' h después de registrarse' : s.desde === 'envio' ? s.esperaHoras + ' h después del paso anterior' : s.esperaHoras + ' h después de que venció el cupón anterior') + '</td></tr>').join('') +
      '</tbody></table><p class="rc-nota">Hasta ' + E.maxCiclos + ' vueltas, con ' + E.descansoDias + ' días de descanso entre vueltas.</p>';
    const sel = $('rcPaso'); if (sel && !sel.options.length) sel.innerHTML = E.serie.map(s => '<option value="' + s.paso + '">Paso ' + s.paso + (s.monto ? ' · ' + pesos(s.monto) : '') + '</option>').join('') + '<option value="todos">Los 7 pasos</option>';
    const et = $('rcEtapa'); if (et && !et.options.length) et.innerHTML = ETAPAS.map(x => '<option value="' + x[0] + '">' + x[1] + '</option>').join('');
    const fila = (x, enviado) => '<tr><td>' + e(x.nombre || '—') + '</td><td>' + e(x.correo) + '</td><td>' + x.ciclo + '</td><td>' + x.paso + '</td><td>' + (x.monto ? pesos(x.monto) : '—') + '</td><td>' + fmtMs(enviado ? x.enviadoMs : x.saleMs) + '</td></tr>';
    $('rcProximos').innerHTML = E.proximos.length ? E.proximos.map(x => fila(x, false)).join('') : '<tr><td colspan="6" class="rc-vacio">Nadie tiene un envío pendiente.</td></tr>';
    $('rcRecientes').innerHTML = E.recientes.length ? E.recientes.map(x => fila(x, true)).join('') : '<tr><td colspan="6" class="rc-vacio">Todavía no se ha enviado ningún correo.</td></tr>';
  }
  const kpi = (l, v, n, c) => '<div class="ap-kpi" style="--k:' + c + '"><div class="lbl">' + l + '</div><div class="val">' + e(v) + '</div><div class="note">' + e(n) + '</div></div>';

  async function rcLista() {
    try {
      const r = await apiAdmin('/api/admin/recordatorios/lista?etapa=' + encodeURIComponent(filtro) + '&q=' + encodeURIComponent(texto) + '&pagina=' + pagina);
      $('rcLista').innerHTML = r.items.length ? r.items.map(x => '<tr><td>' + e(x.nombre || '—') + '</td><td>' + e(x.correo) + '</td><td><span class="badge ' + (x.etapa === 'convertida' || x.etapa === 'pago' ? 'badge-success' : x.etapa === 'baja' ? 'badge-danger' : 'badge-info') + '">' + e(x.estado) + '</span></td><td>' + (x.enviados ? x.ciclo : '—') + '</td><td>' + (x.enviados ? x.paso : '—') + '</td><td>' + (x.proximoMs ? (x.vencida ? 'Ya le toca (paso ' + x.proximoPaso + ')' : 'Paso ' + x.proximoPaso + ' · ' + fmtMs(x.proximoMs)) : '—') + '</td></tr>').join('') : '<tr><td colspan="6" class="rc-vacio">No hay personas con ese filtro.</td></tr>';
      $('rcPaginas').innerHTML = '<span class="rc-nota" style="margin:0">' + r.total + ' persona' + (r.total === 1 ? '' : 's') + '</span>' + (r.pagina > 1 ? '<button type="button" class="btn btn-o btn-sm" onclick="rcPagina(-1)">‹ Anterior</button>' : '') + (r.hayMas ? '<button type="button" class="btn btn-o btn-sm" onclick="rcPagina(1)">Siguiente ›</button>' : '');
    } catch (err) { $('rcLista').innerHTML = '<tr><td colspan="6" class="rc-vacio">' + e(err.message) + '</td></tr>'; }
  }
  window.rcPagina = d => { pagina = Math.max(1, pagina + d); rcLista(); };
  window.rcFiltrar = v => { filtro = v; pagina = 1; rcLista(); };
  window.rcBuscar = () => { clearTimeout(temporizador); temporizador = setTimeout(() => { texto = $('rcBuscar').value.trim(); pagina = 1; rcLista(); }, 350); };

  // ---------- Acciones ----------
  window.rcModo = async function (modo) {
    try {
      if (modo === 'activo') {
        const ens = await apiAdmin('/api/admin/recordatorios/ensayo', { method: 'POST', body: '{}' });
        const msg = 'Vas a ACTIVAR los recordatorios de pago.\n\n• Ahora saldrían ' + ens.recibirian.length + ' correo(s) en la primera revisión (' + ens.vencidas + ' personas ya les toca).\n• Tope: ' + ens.topeDiario + ' por día, de 8:00 a 22:00 (hora de México).\n• Cada correo lleva enlace de baja y aviso de privacidad.\n\n¿Confirmas?';
        if (!confirm(msg)) return;
      } else if (!confirm('¿Apagar los recordatorios? No saldrá ningún correo más hasta que los actives.')) return;
      await apiAdmin('/api/admin/recordatorios/modo', { method: 'POST', body: JSON.stringify({ modo, confirmo: true }) });
      toast(modo === 'activo' ? 'Recordatorios activados' : 'Recordatorios apagados');
      rcCargar();
    } catch (err) { toast(err.message); }
  };
  window.rcLimites = async function () {
    try { await apiAdmin('/api/admin/recordatorios/limites', { method: 'POST', body: JSON.stringify({ topeDiario: parseInt($('rcTope').value, 10), maxPorCorrida: parseInt($('rcMax').value, 10) }) }); toast('Topes guardados'); rcCargar(); }
    catch (err) { toast(err.message); }
  };
  window.rcEnsayo = async function () {
    const c = $('rcEnsayo'); c.textContent = 'Revisando…';
    try {
      const r = await apiAdmin('/api/admin/recordatorios/ensayo', { method: 'POST', body: '{}' });
      c.innerHTML = '<p class="rc-nota" style="margin:0 0 8px"><b>' + r.recibirian.length + '</b> persona(s) recibirían un correo ahora' + (r.restantes ? ' (y ' + r.restantes + ' más en las siguientes revisiones)' : '') + '. ' + (r.dentroDeHorario ? '' : 'Ahora estamos fuera de horario: saldrían a las 8:00. ') + 'No se envió nada.</p>' +
        (r.recibirian.length ? '<ul class="rc-lista">' + r.recibirian.slice(0, 15).map(x => '<li>' + e(x.nombre || x.correo) + ' — vuelta ' + x.ciclo + ', paso ' + x.paso + (x.monto ? ' (' + pesos(x.monto) + ')' : '') + '</li>').join('') + '</ul>' : '');
    } catch (err) { c.textContent = err.message; }
  };
  window.rcPrueba = async function () {
    try {
      const paso = $('rcPaso').value, r = await apiAdmin('/api/admin/recordatorios/prueba', { method: 'POST', body: JSON.stringify({ paso: paso === 'todos' ? 'todos' : Number(paso), ciclo: Number($('rcCiclo').value) }) });
      toast('Correo de prueba enviado a ' + r.para);
    } catch (err) { toast(err.message); }
  };

  // ---------- Enganche con el panel ----------
  const showOriginal = window.showSection;
  window.showSection = function (sec) {
    showOriginal.apply(this, arguments);
    if (sec === 'reminders') rcCargar();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
