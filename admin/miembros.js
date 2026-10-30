/* Panel · Miembros — lista con tarjetas, filtros y menú de acciones (estructura tomada de Alintec Food)
   + etiquetas automáticas para que TODAS las tablas del panel se vean bien en el celular.
   Depende del panel: firebaseMembers, estadoSocio, fechaDe, esc, iniciales, dinero, fbDb, toast, descargarCSV,
   loadFirebaseMembers, editFirebaseMember, regalarTiempo, verProgresoSocio, exportarSociosCSV. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const S = { q: '', plan: 'todos', estado: 'todos', precios: { mes: 199, ano: 1999 } };
  const COL_PLAN = { mensual: '#3B82F6', anual: '#16A34A', regalo: '#A855F7', 'sin-plan': '#94A3B8' };
  const ROT_PLAN = { mensual: 'Mensual', anual: 'Anual', regalo: 'Regalo', 'sin-plan': 'Registrado' };
  const ICO = {
    mas: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>',
    prog: '<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
    edit: '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    tarjeta: '<svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
    estrella: '<svg viewBox="0 0 24 24"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>',
    regalo: '<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="4"/><path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 1 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 1 1 0 5"/></svg>',
    papelera: '<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>',
    pausa: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><line x1="10" y1="9" x2="10" y2="15"/><line x1="14" y1="9" x2="14" y2="15"/></svg>'
  };
  const fmt = d => d ? d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

  function planTipo(m) {
    if (m.plan === 'regalo' || (m.giftedAt && !(m.payments || []).length)) return 'regalo';
    return m.plan === 'anual' ? 'anual' : m.plan === 'mensual' ? 'mensual' : 'sin-plan';
  }
  const expiraDe = m => fechaDe(m.accessUntil || m.nextPaymentDate);

  // ---------- KPIs ----------
  function kpis() {
    const ms = firebaseMembers, act = ms.filter(m => estadoSocio(m) === 'activo');
    const sinPagar = ms.filter(m => estadoSocio(m) === 'sin').length;
    const men = act.filter(m => planTipo(m) === 'mensual').length, anu = act.filter(m => planTipo(m) === 'anual').length, reg = act.filter(m => planTipo(m) === 'regalo').length;
    const mrr = men * S.precios.mes + Math.round(anu * S.precios.ano / 12), conv = ms.length ? Math.round(act.length / ms.length * 100) : 0;
    const k = (lbl, v, sub, c1, c2) => '<div class="cu-kpi" style="--c1:' + c1 + ';--c2:' + c2 + '"><div class="lbl">' + lbl + '</div><div class="val">' + v + '</div><div class="sub">' + sub + '</div></div>';
    $('mbKpis').innerHTML = k('Miembros activos', act.length, 'de ' + ms.length + ' con cuenta · ' + conv + '% conversión', '#34D399', '#22C55E') +
      k('Registrados sin pagar', sinPagar, sinPagar ? 'Oportunidad de venta' : 'Aún no hay', '#94A3B8', '#CBD5E1') +
      k('Plan mensual', men, dinero(men * S.precios.mes) + ' MXN/mes', '#3B82F6', '#60A5FA') +
      k('Plan anual', anu, anu ? dinero(anu * S.precios.ano) + ' MXN al año' : 'Sin anuales', '#16A34A', '#86EFAC') +
      k('MRR estimado', dinero(mrr), reg + ' con acceso de regalo', '#A855F7', '#C084FC');
  }

  // ---------- Filtros ----------
  function pills() {
    const ms = firebaseMembers, cuenta = { todos: ms.length, mensual: 0, anual: 0, regalo: 0, 'sin-plan': 0 };
    ms.forEach(m => cuenta[planTipo(m)]++);
    const p = (clave, txt, n, on, fn) => '<button type="button" class="cu-pill' + (on ? ' on' : '') + '" onclick="' + fn + '">' + txt + ' <span class="n">' + n + '</span></button>';
    $('mbPlanes').innerHTML = [['todos', 'Todos los planes'], ['mensual', 'Mensual'], ['anual', 'Anual'], ['regalo', 'Regalo'], ['sin-plan', 'Sin pagar']].map(([k, t]) => p(k, t, cuenta[k], S.plan === k, "mbFiltro('plan','" + k + "')")).join('');
    const ce = { todos: ms.length, activo: 0, sin: 0, vencido: 0 }; ms.forEach(m => ce[estadoSocio(m)]++);
    $('mbEstados').innerHTML = [['todos', 'Todos los estados'], ['activo', 'Activos'], ['sin', 'Sin membresía'], ['vencido', 'Vencidos']].map(([k, t]) => p(k, t, ce[k], S.estado === k, "mbFiltro('estado','" + k + "')")).join('');
  }
  window.mbFiltro = (k, v) => { S[k] = v; pills(); lista(); };
  window.mbBuscar = v => { S.q = (v || '').toLowerCase().trim(); $('mbLimpiar').style.display = v ? '' : 'none'; lista(); };
  window.mbLimpiarBusqueda = () => { $('mbBuscador').value = ''; mbBuscar(''); };

  // ---------- Lista ----------
  function fila(m) {
    const tipo = planTipo(m), e = estadoSocio(m), color = COL_PLAN[tipo];
    const nombre = m.name || (m.email || '').split('@')[0] || 'Sin nombre', exp = expiraDe(m), reg = fechaDe(m.createdAt || m.startDate);
    const estado = e === 'activo' ? [exp ? (Math.ceil((exp - Date.now()) / 864e5) <= 7 ? 'Expira en ' + Math.max(0, Math.ceil((exp - Date.now()) / 864e5)) + ' d' : 'Hasta ' + fmt(exp)) : 'Activo', '#34D399']
      : e === 'vencido' ? ['Venció ' + fmt(exp), '#EF4444'] : ['Sin pagar', '#94A3B8'];
    const pagos = (m.payments || []).slice().sort((a, b) => String(b.date).localeCompare(String(a.date)))[0];
    const ult = pagos ? fechaDe(pagos.date) : null;
    return '<div class="mb-row" style="--pc:' + color + '"><div class="mb-av">' + esc(iniciales(nombre)) + '</div><div class="mb-body"><div class="mb-nombre">' + esc(nombre) + '</div><div class="mb-meta"><span class="mail">' + esc(m.email || '—') + '</span>' +
      '<span class="sub">' + (e === 'activo' && ult ? 'Miembro desde ' + fmt(fechaDe((m.payments || [])[0] && m.payments[0].date) || ult) : e === 'vencido' ? 'Era miembro' : 'Registrado ' + fmt(reg)) + '</span>' +
      (ult ? '<span class="pago">Último pago: ' + fmt(ult) + ' · ' + dinero(Number(pagos.amount) || 0) + '</span>' : '') + '</div></div>' +
      '<div class="mb-pills"><span class="mb-pill" style="--c:' + color + '">' + ROT_PLAN[tipo] + '</span><span class="mb-pill" style="--c:' + estado[1] + '">' + esc(estado[0]) + '</span></div>' +
      '<button type="button" class="mb-mas" title="Acciones" onclick="mbAcciones(\'' + esc(m.uid) + '\')">' + ICO.mas + '</button></div>';
  }
  function lista() {
    const q = S.q;
    const ms = firebaseMembers.filter(m => (S.plan === 'todos' || planTipo(m) === S.plan) && (S.estado === 'todos' || estadoSocio(m) === S.estado) &&
      (!q || ((m.name || '') + ' ' + (m.email || '') + ' ' + (m.uid || '')).toLowerCase().includes(q)));
    ms.sort((a, b) => ((estadoSocio(b) === 'activo') - (estadoSocio(a) === 'activo')) || ((fechaDe(b.createdAt || b.startDate) || 0) - (fechaDe(a.createdAt || a.startDate) || 0)));
    $('mbContenedor').innerHTML = ms.length ? '<div class="mb-lista">' + ms.map(fila).join('') + '</div>'
      : '<div class="cu-vacio">' + (firebaseMembers.length ? 'Sin resultados. Prueba con otros filtros.' : 'Aún no hay registros. Cuando alguien cree su cuenta en el Club aparecerá aquí como “Sin pagar”.') + '</div>';
  }
  window.renderMembers = function () { if (!$('mbKpis')) return; kpis(); pills(); lista(); };

  // ---------- Menú de acciones ----------
  function overlay() { let o = $('mbOverlay'); if (!o) { o = document.createElement('div'); o.id = 'mbOverlay'; o.className = 'cue-overlay'; o.addEventListener('mousedown', e => { if (e.target === o) o.classList.remove('on'); }); document.body.appendChild(o); } return o; }
  const cerrar = () => overlay().classList.remove('on');
  const accion = (c, icono, titulo, sub, fn) => '<button type="button" class="mb-accion" style="--c:' + c + '" onclick="' + fn + '"><i>' + icono + '</i><div style="flex:1"><strong>' + titulo + '</strong><span>' + sub + '</span></div></button>';
  window.mbAcciones = function (uid) {
    const m = firebaseMembers.find(x => x.uid === uid); if (!m) return;
    const e = estadoSocio(m), nombre = m.name || (m.email || '').split('@')[0], tipo = planTipo(m), color = COL_PLAN[tipo];
    const o = overlay();
    o.innerHTML = '<div class="cue-box" style="max-width:480px"><div class="cue-head"><h3>Acciones del miembro</h3><button class="modal-close" type="button" onclick="document.getElementById(\'mbOverlay\').classList.remove(\'on\')">×</button></div><div class="cue-body">' +
      '<div class="mb-ficha" style="--pc:' + color + '"><div class="mb-av" style="--pc:' + color + '">' + esc(iniciales(nombre)) + '</div><div style="min-width:0"><strong style="display:block">' + esc(nombre) + '</strong><span style="font-size:.78rem;color:var(--text-muted)">' + esc(m.email || '') + '</span><div style="margin-top:4px;font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:' + (e === 'activo' ? '#34D399' : '#94A3B8') + '">' + (e === 'activo' ? '● Miembro activo' : '○ Sin membresía') + ' · ' + ROT_PLAN[tipo] + '</div></div></div>' +
      '<div class="mb-acciones">' +
      accion('#2563AB', ICO.prog, 'Ver progreso', 'Avance por curso', "mbCerrarYa();verProgresoSocio('" + uid + "')") +
      accion('#159E92', ICO.edit, 'Editar datos', 'Nombre, teléfono y especialidad', "mbCerrarYa();editFirebaseMember('" + uid + "')") +
      (e !== 'activo'
        ? accion('#3B82F6', ICO.tarjeta, 'Activar plan mensual', dinero(S.precios.mes) + ' MXN · 30 días de acceso', "mbActivar('" + uid + "','mensual')") + accion('#16A34A', ICO.estrella, 'Activar plan anual', dinero(S.precios.ano) + ' MXN · 365 días de acceso', "mbActivar('" + uid + "','anual')")
        : accion('#A855F7', ICO.regalo, 'Regalar 30 días', 'Suma 30 días al acceso actual', "mbCerrarYa();regalarTiempo('" + uid + "')") + accion('#EF4444', ICO.pausa, 'Quitar acceso', 'Pasa la cuenta a sin membresía', "mbQuitar('" + uid + "')")) +
      accion('#DC2D3F', ICO.papelera, 'Eliminar miembro', 'Va a la papelera: se puede restaurar. Su avance se conserva', "mbEliminar('" + uid + "')") + '</div><p class="cue-nota">Las activaciones manuales no registran un cobro: sirven para accesos de cortesía o ajustes. Los pagos reales los registra Stripe solo.</p></div></div>';
    o.classList.add('on');
  };
  window.mbCerrarYa = cerrar;
  // mbActivar y mbQuitar viven en servidor.js: pasan por el servidor, cancelan Stripe al quitar el acceso y quedan en la
  // bitácora. Aquí ya no hay versión que escriba directo en Firestore, para que ningún orden de <script> la reviva.
  window.mbEliminar = async function (uid) {
    const m = firebaseMembers.find(x => x.uid === uid); if (!m) return;
    const motivo = prompt('¿Eliminar a ' + (m.name || m.email) + '?\nVa a la papelera y no podrá entrar al Club hasta que lo restaures. Su avance, certificados y pagos se conservan.\n\nMotivo (opcional):');
    if (motivo === null) return;
    try { await apiAdmin('/api/admin/miembros/' + encodeURIComponent(uid) + '/eliminar', { method: 'POST', body: JSON.stringify({ mensaje: motivo }) }); toast('Miembro enviado a la papelera'); cerrar(); loadFirebaseMembers(); }
    catch (e) { toast('No se pudo eliminar: ' + e.message); }
  };
  window.mbPapelera = async function () {
    const o = overlay(); o.innerHTML = '<div class="cue-box" style="max-width:640px"><div class="cue-head"><h3>Papelera de miembros</h3><button class="modal-close" type="button" onclick="document.getElementById(\'mbOverlay\').classList.remove(\'on\')">×</button></div><div class="cue-body" id="mbPapBody">Cargando…</div></div>'; o.classList.add('on');
    const cuerpo = document.getElementById('mbPapBody');
    try {
      const r = await apiAdmin('/api/admin/papelera'), ms = r.miembros || [];
      cuerpo.innerHTML = (ms.length ? '<div class="mb-lista">' + ms.map(x => '<div class="mb-row" style="--pc:#94A3B8"><div class="mb-av">' + esc(iniciales(x.name || x.email)) + '</div><div class="mb-body"><div class="mb-nombre">' + esc(x.name || x.email || x.uid) + '</div><div class="mb-meta"><span class="mail">' + esc(x.email || '—') + '</span><span class="sub">Eliminado ' + fmt(new Date(x.eliminadoEn)) + (x.eliminadoPor ? ' por ' + esc(x.eliminadoPor) : '') + '</span>' + (x.mensaje ? '<span class="pago">' + esc(x.mensaje) + '</span>' : '') + '</div></div>' +
        '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="btn btn-o btn-sm" onclick="mbRestaurar(\'' + esc(x.uid) + '\')">Restaurar</button><button class="btn btn-o btn-sm" style="color:var(--danger)" onclick="mbBorrarDefinitivo(\'' + esc(x.uid) + '\')">Borrar acceso</button></div></div>').join('') + '</div>' : '<div class="cu-vacio">La papelera está vacía.</div>') +
        '<p class="cue-nota">Restaurar devuelve la cuenta tal como estaba. «Borrar acceso» elimina su cuenta de inicio de sesión para que ese correo pueda crear una cuenta nueva; su avance y certificados se conservan siempre.</p>';
    } catch (e) { cuerpo.innerHTML = '<div class="cu-vacio">No se pudo leer la papelera: ' + esc(e.message) + '</div>'; }
  };
  window.mbRestaurar = async function (uid) {
    try { await apiAdmin('/api/admin/papelera/' + encodeURIComponent(uid) + '/restaurar', { method: 'POST', body: '{}' }); toast('Miembro restaurado'); loadFirebaseMembers(); mbPapelera(); }
    catch (e) { toast('No se pudo restaurar: ' + e.message); }
  };
  window.mbBorrarDefinitivo = async function (uid) {
    if (!confirm('¿Borrar su acceso para siempre? Su correo podrá registrarse de nuevo con una cuenta nueva. Su avance y certificados se conservan.')) return;
    try { await apiAdmin('/api/admin/papelera/' + encodeURIComponent(uid) + '/eliminar-definitivo', { method: 'POST', body: '{}' }); toast('Acceso eliminado'); mbPapelera(); }
    catch (e) { toast('No se pudo borrar: ' + e.message); }
  };
  window.mbAccesoManual = function () {
    const e = prompt('Correo de la cuenta a la que quieres dar acceso manual:'); if (!e) return;
    const m = firebaseMembers.find(x => (x.email || '').toLowerCase() === e.trim().toLowerCase());
    if (!m) { toast('No hay una cuenta con ese correo. La persona debe crear su cuenta primero.'); return; }
    mbAcciones(m.uid);
  };

  // Precios en vivo para los indicadores
  const initOriginal = window.initAdmin;
  window.initAdmin = function () {
    initOriginal();
    fbDb.collection('config').doc('club').get().then(s => { const c = s.exists ? s.data() : {}; S.precios = { mes: Number(c.precioMes) > 0 ? Number(c.precioMes) : 199, ano: Number(c.precioAno) > 0 ? Number(c.precioAno) : 1999 }; renderMembers(); }).catch(() => {});
  };

  // ═════════ Tablas responsivas: etiqueta cada celda con el título de su columna ═════════
  function etiquetar(tabla) {
    const cab = [...tabla.querySelectorAll('thead th')].map(th => th.textContent.trim());
    tabla.querySelectorAll('tbody tr').forEach(tr => {
      [...tr.children].forEach((td, i) => {
        if (td.colSpan > 1) return;
        const t = cab[i] || '';
        if (td.getAttribute('data-label') !== t) td.setAttribute('data-label', t);
        if (!t && td.querySelector('button,a.btn')) td.setAttribute('data-acciones', '');
        else if (/acci/i.test(t)) td.setAttribute('data-acciones', '');
      });
    });
  }
  const observador = new MutationObserver(muts => { const vistas = new Set(); muts.forEach(m => { const t = (m.target.closest && m.target.closest('table.admin-table')); if (t && !vistas.has(t)) { vistas.add(t); etiquetar(t); } }); });
  function vigilar() { document.querySelectorAll('table.admin-table').forEach(t => { etiquetar(t); observador.observe(t, { childList: true, subtree: true }); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', vigilar); else vigilar();
})();
