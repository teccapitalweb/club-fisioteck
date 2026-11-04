/* Panel FisioTeck — Recordatorios de pago por correo (misma estructura que Alintec).
   Escribe a quien se registró y NUNCA ha pagado: serie de 7 correos por vuelta (hasta 3 vueltas), con cupones únicos de Stripe de $50 y $100
   para el primer mes del plan mensual. ARRANCA APAGADO; aquí se enciende, se apaga y se manda un correo de prueba.
   Todo en una sola página: estado, cómo funciona, números, resultados de los cupones con su gráfica, seguimiento de cuentas (progreso de 7 puntos),
   últimos correos enviados y prueba. Todo lo hace el servidor (/api/admin/recordatorios/*). Depende de index.html: apiAdmin, toast, esc, showSection, ZG (graficas.js). */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const e = v => (typeof esc === 'function' ? esc(v) : String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])));
  const ZONA = 'America/Mexico_City', MAX_VUELTAS = 3;
  const cuando = ms => ms ? new Date(ms).toLocaleString('es-MX', { timeZone: ZONA, weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true }) : '—';
  const hora = ms => new Date(ms).toLocaleTimeString('es-MX', { timeZone: ZONA, hour: 'numeric', minute: '2-digit', hour12: true });
  const claveDia = ms => new Date(ms).toLocaleDateString('en-CA', { timeZone: ZONA });
  // «Hoy · 3:20 p. m.», «Mañana · 8:00 a. m.» o «sáb 18 de oct · 8:00 a. m.»
  const diaHora = (ms, ahoraMs) => {
    const dif = Math.round((Date.parse(claveDia(ms)) - Date.parse(claveDia(ahoraMs))) / 86400000);
    const dia = dif === 0 ? 'Hoy' : dif === 1 ? 'Mañana' : new Date(ms).toLocaleDateString('es-MX', { timeZone: ZONA, weekday: 'short', day: 'numeric', month: 'short' });
    return dia + ' · ' + hora(ms);
  };
  const hace = (ms, ahoraMs) => { const m = Math.max(0, Math.round((ahoraMs - ms) / 60000)); return m < 1 ? 'hace un momento' : m < 60 ? 'hace ' + m + ' min' : m < 1440 ? 'hace ' + Math.round(m / 60) + ' h' : 'hace ' + Math.round(m / 1440) + ' d'; };
  const COLORES_AV = ['#2E7D32', '#1565C0', '#6A1B9A', '#C2410C', '#00838F', '#AD1457', '#4E342E', '#455A64'];
  let E = null, verTodas = false, filtro = 'todas';

  // Cada correo: nombre y color claros (1 = sin cupón, $50 = verde, $100 = naranja). El precio con descuento sale del precio mensual real.
  const correo = (paso, precio) => {
    const s = (E && E.serie || []).find(x => x.paso === paso) || {}, m = s.monto || 0;
    return m ? { n: 'Cupón $' + m, sub: precio ? 'Primer mes $' + (precio - m) : 'Descuento en el primer mes', c: m === 50 ? '#16A34A' : '#EA580C' } : { n: 'Hazte VIP', sub: 'Sin cupón', c: '#64748B' };
  };

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
    s.innerHTML = '<div class="admin-page-header"><div><div class="admin-page-title">Recordatorios de pago</div><div class="admin-page-sub">Correos con cupón para quien se registró y todavía no paga</div></div></div><div id="rcEstado"></div><div class="admin-card rp-caja" id="rcCaja"><div class="rp-sub">Cargando…</div></div>';
    sec.insertAdjacentElement('afterend', s);
  }

  // ---------- Carga ----------
  window.rcCargar = async function (aviso) {
    const caja = $('rcCaja'); if (!caja) return;
    try {
      E = await apiAdmin('/api/admin/recordatorios');
      pintar();
      if (aviso === true) toast('Datos actualizados');
    } catch (err) {
      caja.innerHTML = '<div class="rp-error"><b>No se pudieron leer los recordatorios de pago</b>' + e(err.message) + '<br><button type="button" class="btn btn-o btn-sm" onclick="rcCargar()">Reintentar</button></div>';
    }
  };

  const persona = p => {
    const nombre = p.nombre || String(p.correo || '').split('@')[0] || 'Miembro';
    const ini = (nombre.trim().split(/\s+/).slice(0, 2).map(s => s[0] || '').join('') || '?').toUpperCase();
    const color = COLORES_AV[((p.correo || '').length + ((p.correo || '').charCodeAt(0) || 0)) % COLORES_AV.length];
    return '<div class="rp-persona"><span class="rp-av" style="background:' + color + '">' + e(ini) + '</span><div style="min-width:0"><div class="rp-nombre">' + e(nombre) + '</div><div class="rp-sub">' + e(p.correo) + '</div>' +
      (p.registroMs ? '<div class="rp-sub">Se registró ' + e(cuando(p.registroMs)) + '</div>' : '') + '</div></div>';
  };
  const pildora = (paso, precio) => { const c = correo(paso, precio); return '<span class="rp-pill" style="background:' + c.c + '">Correo ' + paso + ' · ' + e(c.n) + '</span>'; };
  const puntos = (paso, precio) => '<div class="rp-puntos" aria-hidden="true">' + [1, 2, 3, 4, 5, 6, 7].map(n => '<span class="rp-pt ' + (n < paso ? 'hecho' : n === paso ? 'sig' : '') + '" title="Correo ' + n + ' · ' + e(correo(n, precio).n) + '"></span>').join('') + '</div>';
  const dato = (n, t) => '<div class="rp-dato"><b>' + e(n) + '</b><span>' + t + '</span></div>';

  function pintar() {
    const d = E, caja = $('rcCaja'), activo = d.modo === 'activo', precio = Number(d.precioMes) || 0;
    const g = d.estadisticas || {}, ep = g.enviadosPaso || {}, pp = g.pagosConCuponPaso || {};
    const suma = (obj, monto) => (d.serie || []).filter(s => s.monto === monto).reduce((a, s) => a + (obj['p' + s.paso] || 0), 0);
    const env50 = suma(ep, 50), env100 = suma(ep, 100), uso50 = suma(pp, 50), uso100 = suma(pp, 100);
    const totalEnv = Object.values(ep).reduce((a, b) => a + b, 0);
    const pct = (u, n) => (n > 0 ? (Math.round(u / n * 1000) / 10) + '%' : '0%');
    const c = d.conteo || {};
    const yaPagaron = (c.pago || 0) + (c.convertida || 0);

    const estado = !d.configurado && !activo
      ? '<div class="rp-estado rp-e-aviso"><span class="rp-d"></span><span><b>Falta configurar el correo en el servidor</b> (<code>RESEND_API_KEY</code>, <code>MAIL_FROM</code>) o la llave de firmas (<code>CERT_SIGNING_KEY</code>). Hasta entonces no se puede activar.</span></div>'
      : !activo ? '<div class="rp-estado rp-e-off"><span class="rp-d"></span><span><b>Apagado.</b> No se está enviando ningún correo. Pulsa «Activar» cuando quieras empezar.</span></div>'
      : d.dentroDeHorario ? '<div class="rp-estado rp-e-on"><span class="rp-d"></span><span><b>Activo y enviando.</b> Estamos dentro del horario permitido (8:00 a. m. a 10:00 p. m.). Cada 20 minutos se revisa a quién le toca.</span></div>'
      : '<div class="rp-estado rp-e-aviso"><span class="rp-d"></span><span><b>Activo, en pausa por el horario.</b> No se envía entre 10:00 p. m. y 8:00 a. m.; se reanuda solo a las 8:00 a. m.</span></div>';

    const camino = '<details class="rp-camino"><summary>¿Cómo funciona cada vuelta?</summary><div class="rp-cadena">' + [1, 2, 3, 4, 5, 6, 7].map(n => pildora(n, precio)).join('<span class="rp-sep">›</span>') + '</div>' +
      '<p class="rp-sub rp-largo">' + (d.serie || []).map(s => {
        const tiempo = s.desde === 'registro' ? s.esperaHoras + ' horas después de registrarse' : s.desde === 'envio' ? s.esperaHoras + ' horas después del correo anterior' : s.esperaHoras + ' horas después de que vence el cupón anterior';
        return '• El <b>Correo ' + s.paso + '</b> sale ' + tiempo + (s.monto ? ' (cupón de $' + s.monto + ')' : ' (sin cupón)') + '.';
      }).join('<br>') + '<br>• Cada cupón vale <b>' + d.vigenciaHoras + ' horas</b>, es de un solo uso y solo para el plan mensual.<br>• Al terminar los 7 correos hay <b>' + d.descansoDias + ' días de descanso</b> y empieza otra vuelta (máximo ' + d.maxCiclos + ' vueltas).<br>• Solo se envía de <b>8:00 a. m. a 10:00 p. m.</b> (hora de México). Quien paga o pide la baja deja de recibirlos.</p></details>';

    const listo = p => p.debeSalirMs <= d.ahoraMs && d.dentroDeHorario;
    const prox = d.proximos || [];
    const cuenta = { todas: prox.length, listas: prox.filter(listo).length }; cuenta.prog = cuenta.todas - cuenta.listas;
    const filtradas = prox.filter(p => filtro === 'todas' || (filtro === 'listas' ? listo(p) : !listo(p)));
    const visibles = verTodas ? filtradas : filtradas.slice(0, 10);
    const fila = p => {
      const sale = p.saleMs || p.debeSalirMs, porHorario = !listo(p) && p.debeSalirMs < sale - 60000, k = correo(p.paso, precio);
      const celda = listo(p)
        ? '<span class="rp-chip rp-listo"><i></i>Listo para enviar</span><div class="rp-sub rp-mt">Sale en la próxima revisión (cada 20 min)</div>'
        : '<span class="rp-chip rp-prog"><i></i>' + e(diaHora(sale, d.ahoraMs)) + '</span><div class="rp-sub rp-mt rp-ajusta">' + (porHorario ? 'Le tocaba a las ' + e(hora(p.debeSalirMs)) + ' (fuera de horario)' : 'Faltan ' + (sale - d.ahoraMs >= 3600000 ? Math.round((sale - d.ahoraMs) / 3600000) + ' h' : Math.max(1, Math.round((sale - d.ahoraMs) / 60000)) + ' min')) + '</div>';
      return '<div class="rp-tr"><div>' + persona(p) + '</div><div><div class="rp-lbl">Progreso</div>' + puntos(p.paso, precio) + '<div class="rp-sub">Vuelta ' + p.ciclo + ' de ' + MAX_VUELTAS + ' · ' + (p.paso === 1 ? (p.ciclo === 1 ? 'todavía sin correos' : 'empieza otra vuelta') : (p.paso - 1) + ' de 7 enviados') + '</div></div>' +
        '<div><div class="rp-lbl">Siguiente correo</div>' + pildora(p.paso, precio) + '<div class="rp-sub rp-mt">' + e(k.sub) + '</div></div><div><div class="rp-lbl">Cuándo sale</div>' + celda + '</div></div>';
    };
    const tabla = prox.length
      ? '<div class="rp-tabs" role="tablist">' + [['todas', 'Todas'], ['listas', 'Listas ahora'], ['prog', 'Programadas']].map(([k, t]) => '<button type="button" role="tab" data-rp-filtro="' + k + '" class="' + (filtro === k ? 'on' : '') + '">' + t + ' (' + cuenta[k] + ')</button>').join('') + '</div>' +
        '<div class="rp-tabla"><div class="rp-th"><span>Persona</span><span>Progreso</span><span>Siguiente correo</span><span>Cuándo sale</span></div>' + (visibles.length ? visibles.map(fila).join('') : '<div class="rp-tr rp-vacio">No hay cuentas en esta lista.</div>') + '</div>' +
        (filtradas.length > 10 ? '<div class="rp-centro"><button class="btn btn-o btn-sm" id="rp-ver-todas" type="button">' + (verTodas ? 'Ver menos' : 'Ver las ' + filtradas.length + ' cuentas') + '</button></div>' : '') +
        '<p class="rp-sub rp-nota">Los puntos son los 7 correos de cada vuelta: <b class="rp-verde">verde = ya enviado</b>, con aro = el siguiente, gris = pendiente.</p>'
      : '<div class="rp-vacio">No hay envíos pendientes.</div>';
    const ult = d.recientes || [];
    const ultimos = ult.length
      ? '<div class="rp-tabla rp-3"><div class="rp-th"><span>Persona</span><span>Correo enviado</span><span>Cuándo</span></div>' + ult.map(p => '<div class="rp-tr"><div>' + persona(p) + '</div><div><div class="rp-lbl">Correo enviado</div>' + pildora(p.paso, precio) + '<div class="rp-sub rp-mt">Vuelta ' + p.ciclo + ' de ' + MAX_VUELTAS + '</div></div>' +
        '<div><div class="rp-lbl">Cuándo</div><span class="rp-chip rp-hecho"><i></i>' + e(hace(p.enviadoMs, d.ahoraMs)) + '</span><div class="rp-sub rp-mt">' + e(cuando(p.enviadoMs)) + '</div></div></div>').join('') + '</div>'
      : '<div class="rp-vacio">Todavía no se ha enviado ningún recordatorio.</div>';

    caja.innerHTML = '<div class="rp-cab"><h3>Recordatorios de pago<span class="rp-badge ' + (activo ? 'on' : '') + '">' + (activo ? 'ACTIVO' : 'APAGADO') + '</span></h3>' +
      '<div class="rp-acc"><button class="btn btn-o btn-sm" id="rp-actualizar" type="button">Actualizar</button><button class="btn ' + (activo ? 'btn-o' : 'btn-p') + ' btn-sm" id="rp-modo" type="button">' + (activo ? 'Apagar' : 'Activar') + '</button></div></div>' +
      estado + '<p class="rp-sub rp-intro">Correos con cupón de descuento para quienes se registraron y <b>nunca han pagado</b>. Los cupones valen ' + d.vigenciaHoras + ' horas, son de un solo uso y solo para el plan mensual.</p>' + camino +
      '<div class="rp-datos">' + dato(c.elegibles != null ? c.elegibles : d.calificarian, 'Cuentas en seguimiento') + dato(d.enviadosHoy + ' / ' + d.topeDiario, 'Correos enviados hoy / tope') + dato(yaPagaron, 'Ya pagaron (no reciben)') + dato(c.baja || 0, 'Pidieron la baja') + dato(c.cerrada || 0, 'Terminaron sus ' + d.maxCiclos + ' vueltas') + '</div>' +
      '<h4>Resultados de los cupones</h4><div class="rp-datos rp-3c">' + dato(uso50, 'Pagaron con el cupón de $50 (de ' + env50 + ' enviados · ' + pct(uso50, env50) + ')') + dato(uso100, 'Pagaron con el cupón de $100 (de ' + env100 + ' enviados · ' + pct(uso100, env100) + ')') + dato(totalEnv, 'Correos enviados en total') + '</div>' +
      '<div id="rp-grafica" class="rp-grafica"></div>' +
      '<p class="rp-sub rp-nota">«Pagaron» cuenta las veces que Stripe registró el cupón al crearse la suscripción (no incluye tus pruebas si no completaste el pago). ' + (g.desdeMs ? 'Datos desde el ' + e(cuando(g.desdeMs)) + '.' : 'Aún no se ha enviado ningún recordatorio real.') + '</p>' +
      '<h4>Seguimiento de cuentas</h4>' + tabla + '<h4>Últimos correos enviados</h4>' + ultimos +
      '<h4>Probar los correos</h4><div class="rp-fila"><select id="rp-paso" class="form-select" style="max-width:280px">' + [1, 2, 3, 4, 5, 6, 7].map(n => '<option value="' + n + '">Correo ' + n + ' · ' + e(correo(n, precio).n) + '</option>').join('') + '</select><button class="btn btn-o btn-sm" id="rp-probar" type="button">Enviarme una prueba</button></div>' +
      '<p class="rp-sub rp-nota">La prueba llega solo a tu correo de administrador, con un cupón real (' + d.vigenciaHoras + ' horas) para que puedas comprobar el descuento al pagar. No cambia nada de ninguna cuenta.</p>' +
      '<h4>Límites de envío</h4><div class="rp-fila"><label class="rp-lim">Correos por día (máximo) <input class="form-input" id="rcTope" type="number" min="1" max="500" value="' + d.topeDiario + '"></label><label class="rp-lim">Por revisión, cada 20 min (máximo) <input class="form-input" id="rcMax" type="number" min="1" max="50" value="' + d.maxPorCorrida + '"></label><button type="button" class="btn btn-o btn-sm" onclick="rcLimites()">Guardar límites</button></div>' +
      '<p class="rp-sub rp-nota">Protegen tu cuenta de correo: si hay muchas personas por escribir, salen poco a poco.</p>';

    // Gráfica: cupones enviados contra cupones que se usaron al pagar, para cada descuento
    const gr = $('rp-grafica');
    if (gr) gr.innerHTML = window.ZG ? ZG.barras({ etiquetas: ['Cupón de $50', 'Cupón de $100'], series: [{ nombre: 'Cupones enviados', valores: [env50, env100], color: 1 }, { nombre: 'Pagaron con el cupón', valores: [uso50, uso100], color: 6 }], vacio: 'Aún no se envía ningún cupón' }) : '';
    caja.querySelectorAll('[data-rp-filtro]').forEach(b => { b.onclick = () => { filtro = b.dataset.rpFiltro; verTodas = false; pintar(); }; });
    const verMas = $('rp-ver-todas'); if (verMas) verMas.onclick = () => { verTodas = !verTodas; pintar(); };
    $('rp-actualizar').onclick = () => rcCargar(true);
    $('rp-modo').onclick = () => rcModo(activo ? 'apagado' : 'activo');
    $('rp-probar').onclick = rcPrueba;
  }

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
    try { await apiAdmin('/api/admin/recordatorios/limites', { method: 'POST', body: JSON.stringify({ topeDiario: parseInt($('rcTope').value, 10), maxPorCorrida: parseInt($('rcMax').value, 10) }) }); toast('Límites guardados'); rcCargar(); }
    catch (err) { toast(err.message); }
  };
  window.rcPrueba = async function () {
    const b = $('rp-probar'); if (b) { b.disabled = true; b.textContent = 'Enviando…'; }
    try {
      const r = await apiAdmin('/api/admin/recordatorios/prueba', { method: 'POST', body: JSON.stringify({ paso: Number($('rp-paso').value), ciclo: 1 }) });
      toast('Correo de prueba enviado a ' + r.para);
    } catch (err) { toast(err.message); }
    finally { if (b) { b.disabled = false; b.textContent = 'Enviarme una prueba'; } }
  };

  // ---------- Enganche con el panel ----------
  const showOriginal = window.showSection;
  window.showSection = function (sec) {
    showOriginal.apply(this, arguments);
    if (sec === 'reminders') rcCargar();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
