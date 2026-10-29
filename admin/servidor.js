/* Panel FisioTeck — Servidor y bitácora (como Alintec y Zoorigen):
   1) Acciones sobre miembros (activar, regalar, cancelar) hechas por el SERVIDOR, que anota quién las hizo y cuándo.
      Nada se borra: solo cambia el acceso; el avance, los certificados y los pagos del miembro se conservan.
   2) Historial del servidor: reinicios, caídas y errores agrupados, para enterarte de que algo falló sin entrar a Railway.
   3) Acciones del equipo: la bitácora de quién hizo qué desde el panel.
   Depende de index.html: apiAdmin, toast, esc, firebaseMembers, loadFirebaseMembers, showSection. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const e = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = n => Number(n || 0).toLocaleString('es-MX');
  const fecha = iso => iso ? new Date(iso).toLocaleString('es-MX', { timeZone: 'America/Mexico_City', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : '—';
  const miembro = uid => (typeof firebaseMembers !== 'undefined' ? firebaseMembers : []).find(x => x.uid === uid);
  const nombre = m => (m && (m.name || m.email)) || 'este miembro';
  const recargar = () => { try { if (typeof loadFirebaseMembers === 'function') loadFirebaseMembers(); } catch (_) { /* sigue */ } const o = $('mbOverlay'); if (o) o.classList.remove('on'); };
  const post = (uid, accion, cuerpo) => apiAdmin('/api/admin/miembros/' + encodeURIComponent(uid) + '/' + accion, { method: 'POST', body: JSON.stringify(cuerpo || {}) });

  // ---------- 1) Acciones de miembros por servidor ----------
  window.mbActivar = async function (uid, plan) {
    const m = miembro(uid); if (!m) return;
    const dias = plan === 'anual' ? 365 : 30;
    if (!confirm('¿Activar el plan ' + plan + ' de ' + nombre(m) + ' sin cobro? Se le dará acceso por ' + dias + ' días y quedará anotado en la bitácora.')) return;
    const mensaje = prompt('Motivo o nota (opcional, queda en la bitácora):', '') || '';
    try { const r = await post(uid, 'activar', { plan, mensaje }); toast('Plan ' + plan + ' activado hasta el ' + r.hasta); recargar(); }
    catch (err) { toast('No se pudo activar: ' + err.message); }
  };
  window.regalarTiempo = async function (uid) {
    const m = miembro(uid); if (!m) return;
    const txt = prompt('¿Cuántos días de acceso regalas a ' + nombre(m) + '? (1 a 365)', '30'); if (txt === null) return;
    const dias = parseInt(txt, 10);
    if (!Number.isInteger(dias) || dias < 1 || dias > 365) { toast('Escribe un número de días entre 1 y 365'); return; }
    const mensaje = prompt('Mensaje o motivo del regalo (opcional, queda en la bitácora):', '') || '';
    try { const r = await post(uid, 'regalar', { dias, mensaje }); toast('Se regalaron ' + dias + ' días (hasta el ' + r.hasta + ')'); recargar(); }
    catch (err) { toast('No se pudo regalar: ' + err.message); }
  };
  window.mbQuitar = async function (uid) {
    const m = miembro(uid); if (!m) return;
    if (!confirm('¿Quitar el acceso de ' + nombre(m) + '? Podrá volver a suscribirse y todo su historial y avance se conservan.')) return;
    const mensaje = prompt('Motivo (opcional, queda en la bitácora):', '') || '';
    try { await post(uid, 'cancelar', { mensaje }); toast('Acceso retirado'); recargar(); }
    catch (err) { toast('No se pudo actualizar: ' + err.message); }
  };
  window.toggleMemberStatus = function (uid, estado) { return estado === 'active' ? window.mbQuitar(uid) : window.mbActivar(uid, 'mensual'); };

  // ---------- Se agrega al panel: menú y sección ----------
  function montar() {
    if ($('sec-server')) return;
    const nav = document.querySelector('.admin-nav-item[data-section="config"]'), sec = $('sec-config');
    if (!nav || !sec) return;
    const item = document.createElement('div');
    item.className = 'admin-nav-item'; item.dataset.section = 'server'; item.setAttribute('onclick', "showSection('server')");
    item.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="6" rx="1"/><rect x="3" y="14" width="18" height="6" rx="1"/><path d="M7 7h.01M7 17h.01"/></svg>Servidor y bitácora';
    nav.insertAdjacentElement('beforebegin', item);
    const s = document.createElement('section');
    s.className = 'admin-section'; s.id = 'sec-server';
    s.innerHTML =
      '<div class="admin-page-header"><div><div class="admin-page-title">Servidor y bitácora</div><div class="admin-page-sub">Si el servidor falló y quién hizo qué desde el panel</div></div>' +
      '<div class="sv-acciones"><div class="sv-seg"><button type="button" id="svT1" class="on" onclick="svTab(1)">Historial del servidor</button><button type="button" id="svT2" onclick="svTab(2)">Acciones del equipo</button></div></div></div>' +
      '<div id="svP1"><div id="svEstado"></div><div class="ap-kpis" id="svKpis"></div>' +
      '<div class="sv-barra"><label>Periodo <select class="form-select" id="svDias" onchange="svCargar()"><option value="7">7 días</option><option value="30" selected>30 días</option><option value="90">90 días</option><option value="365">1 año</option></select></label>' +
      '<button type="button" class="btn btn-o btn-sm" onclick="svReconocer()">Marcar reinicios como normales</button></div>' +
      '<div class="admin-card" style="overflow-x:auto"><h3>Reinicios y caídas</h3><table class="admin-table"><thead><tr><th>Cuándo</th><th>Qué pasó</th><th>Versión</th></tr></thead><tbody id="svEventos"></tbody></table></div>' +
      '<div class="admin-card" style="overflow-x:auto"><h3>Errores que se repiten</h3><p class="sv-nota">Los errores parecidos se cuentan juntos. Se quitan correos, claves e identificadores.</p><table class="admin-table"><thead><tr><th>Error</th><th>Veces</th><th>Primera vez</th><th>Última vez</th></tr></thead><tbody id="svErrores"></tbody></table></div>' +
      '<div class="admin-card"><h3>Avisos de Stripe</h3><div id="svStripe"></div></div></div>' +
      '<div id="svP2" style="display:none"><div class="admin-card" style="overflow-x:auto"><h3>Acciones del equipo</h3><p class="sv-nota">Cada activación, regalo o cancelación hecha desde el panel queda aquí con quién la hizo y cuándo. Nada de esto se borra.</p>' +
      '<table class="admin-table"><thead><tr><th>Cuándo</th><th>Quién</th><th>Acción</th><th>Miembro</th><th>Detalle</th></tr></thead><tbody id="svAcciones"></tbody></table></div></div>';
    sec.insertAdjacentElement('beforebegin', s);
  }

  let tab = 1;
  window.svTab = function (n) {
    tab = n; $('svP1').style.display = n === 1 ? '' : 'none'; $('svP2').style.display = n === 2 ? '' : 'none';
    $('svT1').classList.toggle('on', n === 1); $('svT2').classList.toggle('on', n === 2);
    svCargar();
  };
  const NOMBRE_ACCION = { activar: 'Activó plan', regalar: 'Regaló días', cancelar: 'Quitó el acceso', 'reconocer-reinicios': 'Revisó reinicios' };
  const MOTIVO = { 'primer-arranque': 'Primer arranque', publicacion: 'Publicación o mantenimiento', inesperado: 'Reinicio inesperado' };

  window.svCargar = async function () {
    if (!$('svEstado')) return;
    try {
      if (tab === 2) {
        const r = await apiAdmin('/api/admin/acciones?limite=200');
        $('svAcciones').innerHTML = r.acciones.length ? r.acciones.map(a => '<tr><td>' + fecha(a.en) + '</td><td>' + e(a.quien) + '</td><td>' + e(NOMBRE_ACCION[a.accion] || a.accion) + '</td><td>' + e(a.miembro || '—') + '</td><td>' + e(a.texto) + '</td></tr>').join('') : '<tr><td colspan="5" class="sv-vacio">Todavía no se ha hecho ninguna acción desde el panel.</td></tr>';
        return;
      }
      const h = await apiAdmin('/api/admin/servidor/historial?dias=' + ($('svDias').value || 30));
      $('svEstado').innerHTML = '';
      if (!h.disponible) { $('svEstado').innerHTML = '<div class="admin-card">La bitácora del servidor no está disponible.</div>'; return; }
      const r = h.resumen, horas = Math.floor(h.segundosActivo / 3600), min = Math.floor(h.segundosActivo % 3600 / 60);
      const k = (l, v, n, c) => '<div class="ap-kpi" style="--k:' + c + '"><div class="lbl">' + l + '</div><div class="val">' + e(v) + '</div><div class="note">' + e(n) + '</div></div>';
      $('svKpis').innerHTML = k('Caídas', r.caidas, 'Más de 10 min sin servidor', r.caidas ? 'var(--danger)' : 'var(--success)') + k('Reinicios inesperados', r.reiniciosInesperados, 'De ' + r.reinicios + ' arranques en el periodo', r.reiniciosInesperados ? 'var(--warning)' : 'var(--success)') +
        k('Errores internos', num(r.erroresInternos), r.erroresDistintos + ' tipo(s) distinto(s)', r.erroresInternos ? 'var(--warning)' : 'var(--success)') + k('Encendido', horas >= 24 ? Math.floor(horas / 24) + ' d ' + (horas % 24) + ' h' : horas + ' h ' + min + ' min', 'Sin cortes desde ' + fecha(h.arranque), 'var(--blue)');
      $('svEventos').innerHTML = h.eventos.length ? h.eventos.map(x => '<tr><td>' + fecha(x.en) + '</td><td>' + (x.normal ? '<span class="badge badge-success">' : '<span class="badge badge-danger">') + e(x.normal ? (MOTIVO[x.motivo] || 'Reinicio normal') : (x.caida ? 'Caída' : 'Reinicio inesperado')) + '</span>' + (x.duracionSeg ? ' · sin servidor ' + Math.round(x.duracionSeg / 60) + ' min' : '') + '</td><td>' + e(x.version || '—') + '</td></tr>').join('') : '<tr><td colspan="3" class="sv-vacio">No hay reinicios en este periodo.</td></tr>';
      $('svErrores').innerHTML = h.errores.length ? h.errores.map(x => '<tr><td>' + e(x.ejemplo) + (x.nivel === 'alta' ? ' <span class="badge badge-danger">Alta prioridad</span>' : '') + '</td><td>' + num(x.cuenta) + '</td><td>' + fecha(x.primeraVez) + '</td><td>' + fecha(x.ultimaVez) + '</td></tr>').join('') : '<tr><td colspan="4" class="sv-vacio">Sin errores en este periodo.</td></tr>';
      $('svStripe').innerHTML = '<p class="sv-nota" style="margin:0">Último aviso de Stripe recibido: <b>' + (h.stripe.ultimoEn ? fecha(h.stripe.ultimoEn) + ' · ' + e(h.stripe.ultimoTipo || '') : 'ninguno todavía') + '</b>.' + (r.stripeIgnorados ? ' Se ignoraron <b>' + num(r.stripeIgnorados) + '</b> aviso(s) de otros proyectos que comparten la cuenta de Stripe.' : '') + '</p>';
    } catch (err) {
      $('svEstado').innerHTML = '<div class="admin-card" style="border-color:var(--danger);color:var(--danger)">No se pudo leer: ' + e(err.message) + '. Enciende el servidor (npm start) y vuelve a intentar.</div>';
    }
  };
  window.svReconocer = async function () {
    if (!confirm('Los reinicios inesperados que ya revisaste dejarán de contar como problema. ¿Continuar?')) return;
    try { const r = await apiAdmin('/api/admin/servidor/reconocer-reinicios', { method: 'POST', body: '{}' }); toast(r.reconocidos + ' reinicio(s) marcados como normales'); svCargar(); }
    catch (err) { toast(err.message); }
  };

  const showOriginal = window.showSection;
  window.showSection = function (sec) { showOriginal.apply(this, arguments); if (sec === 'server') svCargar(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
