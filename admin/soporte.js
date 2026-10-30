/* Panel FisioTeck — Soporte: aquí llegan las quejas, sugerencias, problemas y preguntas que los miembros envían desde su perfil.
   Se puede filtrar por estado y tipo, buscar, responder (el miembro ve la respuesta y recibe un aviso) y cambiar el estado.
   Datos: GET /api/admin/soporte · POST /api/admin/soporte/:id { estado, respuesta } · DELETE /api/admin/soporte/:id. Depende de index.html: apiAdmin, toast, showSection. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const e = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const TIPOS = { queja: 'Queja', sugerencia: 'Sugerencia', problema: 'Problema', pregunta: 'Pregunta', otro: 'Otro' };
  const ESTADOS = { nuevo: ['Nuevo', 'badge-danger'], revision: ['En revisión', 'badge-warning'], resuelto: ['Resuelto', 'badge-success'] };
  let D = { conteo: { total: 0, nuevo: 0, revision: 0, resuelto: 0 }, reportes: [] }, fEstado = 'todos', fTipo = 'todos', busca = '';

  function montar() {
    if ($('sec-soporte')) return;
    const ref = document.querySelector('.admin-nav-item[data-section="notifications"]'), sec = $('sec-notifications');
    if (!ref || !sec) return;
    const nav = document.createElement('div');
    nav.className = 'admin-nav-item'; nav.dataset.section = 'soporte'; nav.setAttribute('onclick', "showSection('soporte')");
    nav.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M9 9h6M9 13h4"/></svg>Soporte <span id="spBadge" style="background:var(--danger);color:#fff;font-size:.65rem;padding:2px 7px;border-radius:10px;margin-left:auto;display:none;">0</span>';
    ref.insertAdjacentElement('afterend', nav);
    const s = document.createElement('section');
    s.className = 'admin-section'; s.id = 'sec-soporte';
    s.innerHTML = '<div class="admin-page-header"><div><div class="admin-page-title">Soporte</div><div class="admin-page-sub">Quejas, sugerencias, problemas y preguntas de los miembros</div></div><button class="btn btn-o" onclick="spCargar()">Actualizar</button></div>' +
      '<div class="ap-kpis" id="spKpis"></div>' +
      '<div class="admin-card"><div class="ap-chips" id="spChips"></div>' +
      '<div class="ap-toolbar" style="display:flex;gap:10px;flex-wrap:wrap;"><input class="form-input" type="search" placeholder="Buscar por nombre, correo o texto" oninput="spBuscar(this.value)" style="flex:1;min-width:200px;"><select class="form-select" id="spTipo" onchange="spTipo(this.value)" style="max-width:200px;"><option value="todos">Todos los tipos</option>' + Object.entries(TIPOS).map(([k, n]) => '<option value="' + k + '">' + n + '</option>').join('') + '</select></div></div>' +
      '<div id="spLista"></div>';
    sec.insertAdjacentElement('afterend', s);
  }

  window.spCargar = async function () {
    if (!$('spLista')) return;
    try { D = await apiAdmin('/api/admin/soporte'); pintar(); }
    catch (err) { $('spLista').innerHTML = '<div class="admin-card" style="border-color:var(--danger);color:var(--danger)">No se pudieron leer los reportes: ' + e(err.message) + '. Enciende el servidor y vuelve a intentar.</div>'; }
  };
  window.spBuscar = v => { busca = (v || '').toLowerCase(); pintar(); };
  window.spTipo = v => { fTipo = v; pintar(); };
  window.spEstado = v => { fEstado = v; pintar(); };

  function pintar() {
    const c = D.conteo || {}, kpi = (l, v, n, col) => '<div class="ap-kpi" style="--k:' + col + '"><div class="lbl">' + l + '</div><div class="val">' + v + '</div><div class="note">' + n + '</div></div>';
    $('spKpis').innerHTML = kpi('Nuevos', c.nuevo || 0, 'Sin atender', 'var(--danger)') + kpi('En revisión', c.revision || 0, 'Ya los viste o respondiste', 'var(--warning)') + kpi('Resueltos', c.resuelto || 0, 'Atendidos', 'var(--success)') + kpi('Total', c.total || 0, 'Últimos 300 reportes', 'var(--blue)');
    $('spChips').innerHTML = [['todos', 'Todos', c.total || 0], ['nuevo', 'Nuevos', c.nuevo || 0], ['revision', 'En revisión', c.revision || 0], ['resuelto', 'Resueltos', c.resuelto || 0]].map(([k, n, q]) => '<button class="ap-chip' + (fEstado === k ? ' on' : '') + '" onclick="spEstado(\'' + k + '\')">' + n + ' (' + q + ')</button>').join('');
    const b = $('spBadge'); if (b) { b.textContent = c.nuevo || 0; b.style.display = c.nuevo ? '' : 'none'; }
    const l = (D.reportes || []).filter(x => (fEstado === 'todos' || x.estado === fEstado) && (fTipo === 'todos' || x.tipo === fTipo) && (!busca || [x.nombre, x.email, x.asunto, x.mensaje].join(' ').toLowerCase().includes(busca)));
    $('spLista').innerHTML = l.map(x => {
      const est = ESTADOS[x.estado] || ESTADOS.nuevo, f = new Date(x.creadoMs).toLocaleString('es-MX', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
      return '<div class="admin-card" id="sp-' + e(x.id) + '"><div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:6px;"><span class="badge ' + est[1] + '">' + est[0] + '</span><span class="badge badge-info">' + e(TIPOS[x.tipo] || 'Otro') + '</span><span style="font-size:.8rem;color:var(--text-muted);">' + e(f) + '</span></div>' +
        '<h3 style="margin:0 0 4px;font-size:1rem;">' + e(x.asunto) + '</h3><div style="font-size:.8rem;color:var(--text-muted);margin-bottom:10px;"><strong style="color:var(--text);">' + e(x.nombre || 'Miembro') + '</strong> · ' + e(x.email) + '</div>' +
        '<p style="margin:0 0 14px;font-size:.9rem;line-height:1.55;white-space:pre-line;">' + e(x.mensaje) + '</p>' +
        '<label class="form-label">Respuesta para el miembro (la verá en su perfil y recibe un aviso)</label><textarea class="form-textarea" rows="3" id="spR-' + e(x.id) + '" maxlength="1500" placeholder="Escribe tu respuesta…">' + e(x.respuesta || '') + '</textarea>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;align-items:center;"><button class="btn btn-p btn-sm" onclick="spGuardar(\'' + e(x.id) + '\')">Guardar respuesta</button>' +
        '<select class="form-select" style="max-width:170px;" onchange="spCambiar(\'' + e(x.id) + '\',this.value)"><option value="nuevo"' + (x.estado === 'nuevo' ? ' selected' : '') + '>Nuevo</option><option value="revision"' + (x.estado === 'revision' ? ' selected' : '') + '>En revisión</option><option value="resuelto"' + (x.estado === 'resuelto' ? ' selected' : '') + '>Resuelto</option></select>' +
        '<button class="btn btn-d btn-sm" style="margin-left:auto;" onclick="spBorrar(\'' + e(x.id) + '\')">Eliminar</button></div></div>';
    }).join('') || '<div class="admin-card" style="text-align:center;color:var(--text-muted);padding:30px;">No hay reportes en este grupo</div>';
  }
  window.spGuardar = async id => {
    const t = ($('spR-' + id) || {}).value || '';
    if (!t.trim()) { toast('Escribe la respuesta'); return; }
    try { await apiAdmin('/api/admin/soporte/' + encodeURIComponent(id), { method: 'POST', body: JSON.stringify({ respuesta: t }) }); toast('Respuesta enviada al miembro'); spCargar(); } catch (err) { toast(err.message); }
  };
  window.spCambiar = async (id, estado) => { try { await apiAdmin('/api/admin/soporte/' + encodeURIComponent(id), { method: 'POST', body: JSON.stringify({ estado }) }); toast('Estado actualizado'); spCargar(); } catch (err) { toast(err.message); } };
  window.spBorrar = async id => { if (!confirm('¿Eliminar este reporte? No se puede deshacer.')) return; try { await apiAdmin('/api/admin/soporte/' + encodeURIComponent(id), { method: 'DELETE' }); toast('Reporte eliminado'); spCargar(); } catch (err) { toast(err.message); } };

  const showOriginal = window.showSection;
  window.showSection = function (sec) { showOriginal.apply(this, arguments); if (sec === 'soporte') spCargar(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
  // El globo de «Nuevos» se actualiza al entrar al panel
  setTimeout(() => { montar(); if ($('spLista') && window.firebase && firebase.auth().currentUser) spCargar(); }, 4000);
})();
