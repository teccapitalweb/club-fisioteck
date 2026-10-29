/* Panel FisioTeck — Datos curiosos (como Alintec y Zoorigen): banco de datos de fisioterapia y rehabilitación que llega a todos los miembros en la campana,
   2 por semana (martes y viernes, 7:00 a.m. hora de México). El administrador agrega, edita, pausa, borra o manda uno ahora.
   Todo lo hace el servidor (/api/admin/datos-curiosos). Depende de index.html: apiAdmin, toast, esc, showSection. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const e = v => (typeof esc === 'function' ? esc(v) : String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])));
  let D = [], temas = [], tema = 'todos', texto = '', editando = null;

  function montar() {
    if ($('sec-curiosos')) return;
    const nav = document.querySelector('.admin-nav-item[data-section="libros"]') || document.querySelector('.admin-nav-item[data-section="retosxp"]') || document.querySelector('.admin-nav-item[data-section="referrals"]');
    const ref = $('sec-libros') || $('sec-retosxp') || $('sec-referrals');
    if (!nav || !ref) return;
    const item = document.createElement('div');
    item.className = 'admin-nav-item'; item.dataset.section = 'curiosos'; item.setAttribute('onclick', "showSection('curiosos')");
    item.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>Datos curiosos';
    nav.insertAdjacentElement('afterend', item);
    const s = document.createElement('section');
    s.className = 'admin-section'; s.id = 'sec-curiosos';
    s.innerHTML = '<div class="admin-page-header"><div><div class="admin-page-title">Datos curiosos</div><div class="admin-page-sub">Un dato nuevo en la campana de todos los miembros, martes y viernes</div></div></div>' +
      '<div class="ap-kpis"><div class="ap-kpi" style="--k:var(--accent)"><div class="lbl">En el banco</div><div class="val" id="dcTotal">0</div><div class="note">Datos en total</div></div>' +
      '<div class="ap-kpi" style="--k:var(--success)"><div class="lbl">Activos</div><div class="val" id="dcActivos">0</div><div class="note">Entran al turno de envío</div></div>' +
      '<div class="ap-kpi" style="--k:var(--warning)"><div class="lbl">Último envío</div><div class="val" id="dcUltimo" style="font-size:1.1rem">—</div><div class="note">Martes y viernes desde las 7:00 a.m.</div></div></div>' +
      '<div class="admin-card"><h3 id="dcFormT">Agregar un dato curioso</h3><label style="display:block">Dato <small id="dcCuenta" style="color:var(--text-muted)">0/400</small><textarea class="form-input" id="dcTexto" maxlength="400" rows="3" placeholder="Un dato breve, verificable y útil para fisioterapeutas…" oninput="dcContar()"></textarea></label>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:12px"><select class="form-select" id="dcTema" style="max-width:200px"></select><label style="display:flex;gap:6px;align-items:center;font-size:.86rem"><input type="checkbox" id="dcAhora"> Enviarlo ahora a todos</label>' +
      '<button type="button" class="btn btn-p" id="dcGuardar" onclick="dcGuardar()">Agregar al banco</button><button type="button" class="btn btn-o" id="dcCancelar" style="display:none" onclick="dcCancelar()">Cancelar edición</button></div></div>' +
      '<div class="admin-card" style="overflow-x:auto"><h3>Banco de datos</h3><div class="ap-chips" id="dcChips"></div><div class="ap-toolbar"><input class="form-input" type="search" placeholder="Buscar en los datos" oninput="dcBuscar(this.value)"></div>' +
      '<table class="admin-table"><thead><tr><th>Dato</th><th>Tema</th><th>Enviado</th><th>Estado</th><th>Acciones</th></tr></thead><tbody id="dcTabla"></tbody></table></div>';
    ref.insertAdjacentElement('afterend', s);
  }

  window.dcCargar = async function () {
    try {
      const d = await apiAdmin('/api/admin/datos-curiosos'); D = d.datos || []; temas = d.temas || [];
      $('dcTotal').textContent = d.total; $('dcActivos').textContent = d.activos; $('dcUltimo').textContent = d.ultimoEnvio || 'Aún ninguno';
      $('dcTema').innerHTML = temas.map(t => '<option' + (t === 'General' ? ' selected' : '') + '>' + e(t) + '</option>').join(''); pintar();
    } catch (err) { const t = $('dcTabla'); if (t) t.innerHTML = '<tr><td colspan="5" style="color:var(--danger)">No se pudo leer el banco: ' + e(err.message) + '</td></tr>'; }
  };
  window.dcBuscar = v => { texto = (v || '').toLowerCase().trim(); tabla(); };
  window.dcTema = t => { tema = t; pintar(); };
  window.dcContar = () => { $('dcCuenta').textContent = $('dcTexto').value.length + '/400'; };
  function pintar() {
    $('dcChips').innerHTML = [['todos', 'Todos', D.length]].concat(temas.map(t => [t, t, D.filter(x => x.tema === t).length])).filter(c => c[2] || c[0] === 'todos').map(c => '<button class="ap-chip' + (tema === c[0] ? ' on' : '') + '" onclick="dcTema(\'' + e(c[0]) + '\')">' + e(c[1]) + ' (' + c[2] + ')</button>').join('');
    tabla();
  }
  function tabla() {
    const l = D.filter(x => (tema === 'todos' || x.tema === tema) && (!texto || String(x.texto).toLowerCase().includes(texto)));
    $('dcTabla').innerHTML = l.map(x => '<tr><td style="max-width:460px;white-space:normal">' + e(x.texto) + '</td><td>' + e(x.tema || 'General') + '</td><td>' + (x.veces || 0) + (x.ultimoEnvio ? ' · ' + e(x.ultimoEnvio) : '') + '</td>' +
      '<td><span class="badge ' + (x.activo === false ? 'badge-danger' : 'badge-success') + '">' + (x.activo === false ? 'Pausado' : 'Activo') + '</span></td>' +
      '<td style="white-space:nowrap"><button class="btn btn-o btn-sm" onclick="dcEnviar(\'' + e(x.id) + '\')">Enviar ahora</button> <button class="btn btn-o btn-sm" onclick="dcEditar(\'' + e(x.id) + '\')">Editar</button> <button class="btn btn-o btn-sm" onclick="dcPausar(\'' + e(x.id) + '\',' + (x.activo === false ? 'true' : 'false') + ')">' + (x.activo === false ? 'Activar' : 'Pausar') + '</button> <button class="btn btn-o btn-sm" style="color:var(--danger)" onclick="dcEliminar(\'' + e(x.id) + '\')">Eliminar</button></td></tr>').join('') ||
      '<tr><td colspan="5" style="text-align:center;padding:26px;color:var(--text-muted)">Sin datos con ese filtro</td></tr>';
  }
  const ruta = id => '/api/admin/datos-curiosos/' + encodeURIComponent(id);
  function limpiar() { editando = null; $('dcTexto').value = ''; dcContar(); $('dcAhora').checked = false; $('dcAhora').parentNode.style.display = ''; $('dcFormT').textContent = 'Agregar un dato curioso'; $('dcGuardar').textContent = 'Agregar al banco'; $('dcCancelar').style.display = 'none'; }
  window.dcCancelar = limpiar;
  window.dcGuardar = async function () {
    try {
      if (editando) await apiAdmin(ruta(editando) + '/actualizar', { method: 'POST', body: JSON.stringify({ texto: $('dcTexto').value, tema: $('dcTema').value }) });
      else await apiAdmin('/api/admin/datos-curiosos', { method: 'POST', body: JSON.stringify({ texto: $('dcTexto').value, tema: $('dcTema').value, enviarAhora: $('dcAhora').checked }) });
      toast(editando ? 'Dato actualizado' : $('dcAhora').checked ? 'Dato agregado y enviado' : 'Dato agregado al banco'); limpiar(); dcCargar();
    } catch (err) { toast(err.message); }
  };
  window.dcEditar = function (id) { const x = D.find(d => d.id === id); if (!x) return; editando = id; $('dcTexto').value = x.texto; $('dcTema').value = x.tema || 'General'; dcContar(); $('dcAhora').parentNode.style.display = 'none'; $('dcFormT').textContent = 'Editar dato'; $('dcGuardar').textContent = 'Guardar cambios'; $('dcCancelar').style.display = ''; $('dcTexto').scrollIntoView({ block: 'center' }); };
  window.dcPausar = async function (id, activo) { try { await apiAdmin(ruta(id) + '/actualizar', { method: 'POST', body: JSON.stringify({ activo }) }); toast(activo ? 'Dato activado' : 'Dato pausado'); dcCargar(); } catch (err) { toast(err.message); } };
  window.dcEnviar = async function (id) { if (!confirm('¿Enviar este dato curioso ahora a todos los miembros?')) return; try { await apiAdmin(ruta(id) + '/enviar', { method: 'POST', body: '{}' }); toast('Dato enviado a la campana de todos'); dcCargar(); } catch (err) { toast(err.message); } };
  window.dcEliminar = async function (id) { if (!confirm('¿Eliminar este dato curioso del banco?')) return; try { await apiAdmin(ruta(id) + '/eliminar', { method: 'POST', body: '{}' }); toast('Dato eliminado'); dcCargar(); } catch (err) { toast(err.message); } };

  const showOriginal = window.showSection;
  window.showSection = function (sec) { showOriginal.apply(this, arguments); if (sec === 'curiosos') dcCargar(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
