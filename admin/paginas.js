/* Panel · Notificaciones y Configuración (rediseño según Alintec Food).
   Notificaciones: avisos a los miembros (aparecen en la campana del Club) y alertas del sistema (pagos, cancelaciones).
   Configuración: precios, contacto, cursos escalonados, estado de servicios, estadísticas y GitHub.
   Depende del panel: fbDb, esc, toast, apiAdmin, notifications, loadNotifications, saveConfig, saveData. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const SVG = {
    curso: '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/></svg>',
    vivo: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4"/></svg>',
    pdf: '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    promo: '<svg viewBox="0 0 24 24"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
    campana: '<svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
    borrar: '<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>'
  };
  // Mismas categorías que entiende el Club (course, live, pdf, promo) más "general"
  const TIPOS = {
    course: { n: 'Nuevo curso', c: '#159E92', i: SVG.curso },
    live: { n: 'Clase en vivo', c: '#DC2D3F', i: SVG.vivo },
    pdf: { n: 'Material', c: '#2563AB', i: SVG.pdf },
    promo: { n: 'Promoción', c: '#B45309', i: SVG.promo },
    general: { n: 'General', c: '#7C3AED', i: SVG.campana }
  };
  const F = { tipo: 'course', avisos: [], pestana: 'avisos' };

  // ═════════ NOTIFICACIONES ═════════
  function relativo(ms) {
    if (!ms) return '';
    const d = Date.now() - ms, min = Math.round(d / 6e4);
    if (min < 1) return 'Ahora'; if (min < 60) return 'Hace ' + min + ' min';
    const h = Math.round(min / 60); if (h < 24) return 'Hace ' + h + ' h';
    const dias = Math.round(h / 24); if (dias === 1) return 'Ayer'; if (dias < 7) return 'Hace ' + dias + ' días';
    return new Date(ms).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  const msDe = n => (n.createdAt && n.createdAt.seconds ? n.createdAt.seconds * 1000 : 0);

  window.pgPestana = p => {
    F.pestana = p;
    $('pgPaneAvisos').style.display = p === 'avisos' ? '' : 'none';
    $('pgPaneAlertas').style.display = p === 'alertas' ? '' : 'none';
    document.querySelectorAll('#pgTabsNotif button').forEach(b => b.classList.toggle('on', b.dataset.p === p));
  };
  function tiposHTML() {
    $('pgTipos').innerHTML = Object.entries(TIPOS).map(([k, t]) => '<button type="button" class="pg-tipo' + (F.tipo === k ? ' on' : '') + '" style="--c:' + t.c + '" onclick="pgTipo(\'' + k + '\')"><i>' + t.i + '</i>' + t.n + '</button>').join('');
  }
  window.pgTipo = k => { F.tipo = k; tiposHTML(); pgVista(); };
  window.pgVista = () => {
    const t = TIPOS[F.tipo], tit = $('notifTitle').value.trim(), msg = $('notifMessage').value.trim();
    $('pgCuentaT').textContent = $('notifTitle').value.length + '/80'; $('pgCuentaM').textContent = $('notifMessage').value.length + '/180';
    $('pgVista').innerHTML = '<small>Así lo verán</small><div class="pg-item" style="--c:' + t.c + '"><div class="ic-box">' + t.i + '</div><div class="cuerpo"><div class="tit"><strong>' + esc(tit || 'Título de la notificación') + '</strong><span class="tag">' + t.n + '</span></div><p>' + esc(msg || 'Aquí aparecerá el mensaje.') + '</p><div class="pie"><span>Ahora</span></div></div></div>';
  };
  window.sendMemberNotification = async function () {
    const title = $('notifTitle').value.trim(), message = $('notifMessage').value.trim();
    let link = $('notifLink').value.trim();
    if (!title || !message) { toast('Completa el título y el mensaje'); return; }
    if (link && !/^https?:\/\//i.test(link)) { toast('El enlace debe empezar con http:// o https://'); return; }
    const btn = $('pgEnviar'); btn.disabled = true;
    try {
      await fbDb.collection('member_notifications').add({ category: F.tipo, title, message, link, createdAt: firebase.firestore.FieldValue.serverTimestamp(), createdBy: (firebase.auth().currentUser || {}).email || '' });
      toast('Notificación enviada a todos los miembros');
      $('notifTitle').value = ''; $('notifMessage').value = ''; $('notifLink').value = ''; pgVista(); cargarAvisos();
    } catch (e) { toast('No se pudo enviar: ' + (e.code || e.message)); }
    btn.disabled = false;
  };
  window.pgBorrarAviso = async id => {
    if (!confirm('¿Eliminar esta notificación? Dejará de verse en la campana de los miembros.')) return;
    try { await fbDb.collection('member_notifications').doc(id).delete(); toast('Notificación eliminada'); cargarAvisos(); }
    catch (e) { toast('No se pudo eliminar: ' + (e.code || e.message)); }
  };
  async function cargarAvisos() {
    try {
      const sn = await fbDb.collection('member_notifications').orderBy('createdAt', 'desc').limit(50).get();
      F.avisos = sn.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) { F.avisos = []; $('pgHistorial').innerHTML = '<div class="pg-vacio">No se pudo leer el historial (' + esc(e.code || e.message) + ')</div>'; return; }
    pintarAvisos(); if (window.pgAvisosCargados) pgAvisosCargados();
  }
  function pintarAvisos() {
    const ahora = Date.now(), set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
    const ms = F.avisos.map(msDe);
    set('pnTotal', F.avisos.length); set('pnHoy', ms.filter(m => ahora - m < 864e5).length); set('pnSemana', ms.filter(m => ahora - m < 7 * 864e5).length);
    $('pgHistorial').innerHTML = F.avisos.map(n => {
      const t = TIPOS[n.category] || TIPOS.general;
      return '<div class="pg-item" style="--c:' + t.c + '"><div class="ic-box">' + t.i + '</div><div class="cuerpo"><div class="tit"><strong>' + esc(n.title) + '</strong><span class="tag">' + t.n + '</span></div><p>' + esc(n.message) + '</p><div class="pie"><span>' + relativo(msDe(n)) + '</span>' + (n.createdBy ? '<span>Por ' + esc(n.createdBy.split('@')[0]) + '</span>' : '') + (n.link ? '<a href="' + esc(n.link) + '" target="_blank" rel="noopener noreferrer">Ver enlace</a>' : '') + '</div></div><button type="button" class="pg-del" title="Eliminar" onclick="pgBorrarAviso(\'' + esc(n.id) + '\')">' + SVG.borrar + '</button></div>';
    }).join('') || '<div class="pg-vacio">' + SVG.campana.replace('<svg', '<svg style="width:34px;height:34px;stroke:currentColor;fill:none;stroke-width:1.6;display:block;margin:0 auto 10px"') + 'Aún no has enviado notificaciones.</div>';
  }
  window.pgAvisosCargados = () => { if (window.ZGhook) ZGhook('avisos', F.avisos); };
  function badgeAlertas() {
    const sinLeer = (typeof notifications !== 'undefined' ? notifications : []).filter(n => !n.read).length;
    set2('pnAlertas', sinLeer); const b = $('pgTabAlertas'); if (b) b.innerHTML = 'Alertas del sistema' + (sinLeer ? ' <span class="n">' + sinLeer + '</span>' : '');
  }
  const set2 = (id, v) => { const el = $(id); if (el) el.textContent = v; };
  const loadOriginal = window.loadNotifications;
  window.loadNotifications = async function () { await loadOriginal.apply(this, arguments); badgeAlertas(); };

  // ═════════ CONFIGURACIÓN ═════════
  const COLOR = { ok: '#16A34A', aviso: '#F59E0B', error: '#EF4444' }, ROTULO = { ok: 'OK', aviso: 'AVISO', error: 'ERROR' };
  const RESUMEN = { ok: 'Todo en orden', aviso: 'Revisa los avisos', error: 'Hay algo que corregir' };
  let ultimoReporte = '';
  window.pgRevisarServicios = async function () {
    const caja = $('pgServicios'), btn = $('pgRevisarBtn'), pill = $('pgResumen');
    caja.innerHTML = '<div class="pg-vacio">Revisando servicios…</div>'; if (btn) btn.disabled = true;
    try {
      const r = await apiAdmin('/api/admin/estado');
      ultimoReporte = 'Estado de servicios · Club FisioTeck · ' + new Date(r.generado).toLocaleString('es-MX') + '\n' + r.servicios.map(s => '[' + ROTULO[s.estado] + '] ' + s.nombre + ': ' + s.detalle).join('\n');
      pill.style.display = ''; pill.style.setProperty('--c', COLOR[r.resumen]); pill.textContent = RESUMEN[r.resumen];
      caja.innerHTML = r.servicios.map(s => '<div class="pg-serv" style="--c:' + COLOR[s.estado] + '"><span class="pt"></span><div class="tx"><strong>' + esc(s.nombre) + '</strong><span>' + esc(s.detalle) + '</span></div><span class="et">' + ROTULO[s.estado] + '</span></div>').join('');
    } catch (e) { pill.style.display = 'none'; ultimoReporte = ''; caja.innerHTML = '<div class="pg-vacio" style="color:var(--danger)">No se pudo revisar: ' + esc(e.message) + '<br><button class="btn btn-o btn-sm" style="margin-top:10px" onclick="pgRevisarServicios()">Reintentar</button></div>'; }
    if (btn) btn.disabled = false;
  };
  window.pgCopiarReporte = async function () {
    if (!ultimoReporte) { toast('Primero revisa los servicios'); return; }
    try { await navigator.clipboard.writeText(ultimoReporte); toast('Reporte copiado'); } catch (e) { prompt('Copia el reporte:', ultimoReporte); }
  };
  async function cargarContacto() {
    try {
      const s = await fbDb.collection('config').doc('club').get(), c = (s.exists ? s.data() : {}).contacto || {};
      $('cfgWhatsapp').value = c.whatsapp || ''; $('cfgInstagram').value = c.instagram || ''; $('cfgCorreo').value = c.correo || '';
    } catch (e) { /* sin permisos o sin conexión */ }
  }
  window.guardarContacto = async function () {
    const wa = $('cfgWhatsapp').value.replace(/\D/g, ''), ig = $('cfgInstagram').value.trim().replace(/^@/, ''), correo = $('cfgCorreo').value.trim();
    if (wa && (wa.length < 10 || wa.length > 15)) { toast('El WhatsApp debe llevar código de país (10 a 15 dígitos)'); return; }
    if (correo && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) { toast('Escribe un correo válido'); return; }
    try { await fbDb.collection('config').doc('club').set({ contacto: { whatsapp: wa, instagram: ig, correo }, actualizadoEn: new Date().toISOString() }, { merge: true }); toast('Contacto guardado'); }
    catch (e) { toast('No se pudo guardar: ' + (e.code || e.message)); }
  };
  window.saveWhatsApp = window.guardarContacto;

  // ═════════ Enganche con el panel ═════════
  const showOriginal = window.showSection;
  window.showSection = function (sec) {
    showOriginal.apply(this, arguments);
    if (sec === 'notifications') { tiposHTML(); pgVista(); cargarAvisos(); badgeAlertas(); }
    if (sec === 'config') { cargarContacto(); pgRevisarServicios(); }
  };
})();
