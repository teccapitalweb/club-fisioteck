/* Panel FisioTeck — Libros de lectura (como Alintec): el administrador publica libros con su portada y enlace de lectura, y elige cuántos retos
   pide cada uno para desbloquearse. Todo lo hace el servidor (/api/admin/libros). El enlace nunca llega al Club antes de que el miembro lo desbloquee.
   Depende de index.html: apiAdmin, toast, esc, showSection. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const e = v => (typeof esc === 'function' ? esc(v) : String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])));
  let L = [], editando = null;

  function montar() {
    if ($('sec-libros')) return;
    const nav = document.querySelector('.admin-nav-item[data-section="retosxp"]') || document.querySelector('.admin-nav-item[data-section="referrals"]');
    const ref = $('sec-retosxp') || $('sec-referrals');
    if (!nav || !ref) return;
    const item = document.createElement('div');
    item.className = 'admin-nav-item'; item.dataset.section = 'libros'; item.setAttribute('onclick', "showSection('libros')");
    item.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/></svg>Libros';
    nav.insertAdjacentElement('afterend', item);
    const s = document.createElement('section');
    s.className = 'admin-section'; s.id = 'sec-libros';
    s.innerHTML = '<div class="admin-page-header"><div><div class="admin-page-title">Libros</div><div class="admin-page-sub">Libros de lectura que los miembros desbloquean superando retos</div></div></div>' +
      '<div class="ap-kpis"><div class="ap-kpi" style="--k:var(--accent)"><div class="lbl">Libros</div><div class="val" id="lbTotal">0</div><div class="note">En la biblioteca</div></div>' +
      '<div class="ap-kpi" style="--k:var(--success)"><div class="lbl">Publicados</div><div class="val" id="lbActivos">0</div><div class="note">Visibles para los miembros</div></div></div>' +
      '<div class="admin-card"><h3 id="lbFormT">Agregar un libro</h3>' +
      '<div class="ap-toolbar" style="display:grid;grid-template-columns:1fr 1fr;gap:12px"><label>Título<input class="form-input" id="lbTitulo" maxlength="120" placeholder="Ej. Anatomía funcional del hombro"></label><label>Autor<input class="form-input" id="lbAutor" maxlength="100" placeholder="Ej. Equipo FisioTeck"></label>' +
      '<label>Enlace de lectura (https)<input class="form-input" id="lbUrl" placeholder="https://drive.google.com/file/d/…/view"></label><label>Portada (enlace de imagen, opcional)<input class="form-input" id="lbPortada" placeholder="https://…/portada.jpg"></label>' +
      '<label>Fuente (quién lo publica)<input class="form-input" id="lbFuente" maxlength="80" placeholder="Ej. OpenStax"></label><label>Licencia<input class="form-input" id="lbLicencia" maxlength="60" placeholder="Ej. CC BY 4.0 o Dominio público"></label>' +
      '<label>Enlace de la fuente (opcional)<input class="form-input" id="lbFuenteUrl" placeholder="https://openstax.org"></label><label>Enlace de la licencia (opcional)<input class="form-input" id="lbLicenciaUrl" placeholder="https://creativecommons.org/licenses/by/4.0/"></label><label>Idioma<input class="form-input" id="lbIdioma" maxlength="20" placeholder="Español"></label>' +
      '<label>Retos que pide<input class="form-input" id="lbRetos" type="number" min="1" max="200" value="10"></label><label>Orden en la biblioteca<input class="form-input" id="lbOrden" type="number" min="0" max="999" value="0"></label></div>' +
      '<label style="display:block;margin-top:12px">Descripción corta<textarea class="form-input" id="lbDesc" maxlength="400" rows="3" placeholder="Qué aprenderán al leerlo"></textarea></label>' +
      '<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap"><button type="button" class="btn btn-p" id="lbGuardar" onclick="lbGuardar()">Publicar libro</button><button type="button" class="btn btn-o" id="lbCancelar" style="display:none" onclick="lbCancelar()">Cancelar edición</button></div>' +
      '<p style="font-size:.78rem;color:var(--text-muted);margin:10px 0 0">El enlace se guarda en el servidor: el miembro solo lo recibe cuando ya superó los retos que pide. Usa solo libros con licencia abierta (CC BY o dominio público) o que sean tuyos, y anota su fuente y licencia: se muestran como crédito en la tarjeta.</p></div>' +
      '<div class="admin-card" style="overflow-x:auto"><h3>Biblioteca</h3><table class="admin-table"><thead><tr><th>Libro</th><th>Retos</th><th>Orden</th><th>Estado</th><th>Acciones</th></tr></thead><tbody id="lbTabla"></tbody></table></div>';
    ref.insertAdjacentElement('afterend', s);
  }

  window.lbCargar = async function () {
    try { const d = await apiAdmin('/api/admin/libros'); L = d.libros || []; $('lbTotal').textContent = d.total; $('lbActivos').textContent = d.activos; tabla(); }
    catch (err) { const t = $('lbTabla'); if (t) t.innerHTML = '<tr><td colspan="5" style="color:var(--danger)">No se pudieron leer los libros: ' + e(err.message) + '</td></tr>'; }
  };
  function tabla() {
    $('lbTabla').innerHTML = L.map(l => '<tr><td><strong>' + e(l.titulo) + '</strong><br><span style="font-size:.78rem;color:var(--text-muted)">' + e(l.autor || '') + '</span></td><td>' + e(l.requiereRetos) + '</td><td>' + e(l.orden || 0) + '</td>' +
      '<td><span class="badge ' + (l.activo === false ? 'badge-danger' : 'badge-success') + '">' + (l.activo === false ? 'Pausado' : 'Publicado') + '</span></td>' +
      '<td style="white-space:nowrap"><button class="btn btn-o btn-sm" onclick="lbEditar(\'' + e(l.id) + '\')">Editar</button> <button class="btn btn-o btn-sm" onclick="lbPausar(\'' + e(l.id) + '\',' + (l.activo === false ? 'true' : 'false') + ')">' + (l.activo === false ? 'Publicar' : 'Pausar') + '</button> <button class="btn btn-o btn-sm" style="color:var(--danger)" onclick="lbEliminar(\'' + e(l.id) + '\')">Eliminar</button></td></tr>').join('') ||
      '<tr><td colspan="5" style="text-align:center;padding:26px;color:var(--text-muted)">Aún no hay libros. Agrega el primero arriba.</td></tr>';
  }
  const valores = () => ({ fuente: $('lbFuente').value, licencia: $('lbLicencia').value, fuenteUrl: $('lbFuenteUrl').value, licenciaUrl: $('lbLicenciaUrl').value, idioma: $('lbIdioma').value, titulo: $('lbTitulo').value, autor: $('lbAutor').value, descripcion: $('lbDesc').value, url: $('lbUrl').value, portada: $('lbPortada').value, requiereRetos: Number($('lbRetos').value), orden: Number($('lbOrden').value) || 0 });
  function limpiar() { editando = null; ['lbTitulo', 'lbAutor', 'lbDesc', 'lbUrl', 'lbPortada', 'lbFuente', 'lbLicencia', 'lbFuenteUrl', 'lbLicenciaUrl', 'lbIdioma'].forEach(i => { $(i).value = ''; }); $('lbRetos').value = 10; $('lbOrden').value = 0; $('lbFormT').textContent = 'Agregar un libro'; $('lbGuardar').textContent = 'Publicar libro'; $('lbCancelar').style.display = 'none'; }
  window.lbCancelar = limpiar;
  window.lbGuardar = async function () {
    try {
      if (editando) await apiAdmin('/api/admin/libros/' + encodeURIComponent(editando) + '/actualizar', { method: 'POST', body: JSON.stringify(valores()) });
      else await apiAdmin('/api/admin/libros', { method: 'POST', body: JSON.stringify(valores()) });
      toast(editando ? 'Libro actualizado' : 'Libro publicado'); limpiar(); lbCargar();
    } catch (err) { toast(err.message); }
  };
  window.lbEditar = function (id) {
    const l = L.find(x => x.id === id); if (!l) return;
    editando = id; $('lbTitulo').value = l.titulo || ''; $('lbAutor').value = l.autor || ''; $('lbDesc').value = l.descripcion || ''; $('lbUrl').value = l.url || ''; $('lbPortada').value = l.portada || ''; $('lbFuente').value = l.fuente || ''; $('lbLicencia').value = l.licencia || ''; $('lbFuenteUrl').value = l.fuenteUrl || ''; $('lbLicenciaUrl').value = l.licenciaUrl || ''; $('lbIdioma').value = l.idioma || ''; $('lbRetos').value = l.requiereRetos; $('lbOrden').value = l.orden || 0;
    $('lbFormT').textContent = 'Editar libro'; $('lbGuardar').textContent = 'Guardar cambios'; $('lbCancelar').style.display = ''; $('lbTitulo').scrollIntoView({ block: 'center' });
  };
  window.lbPausar = async function (id, activo) { try { await apiAdmin('/api/admin/libros/' + encodeURIComponent(id) + '/actualizar', { method: 'POST', body: JSON.stringify({ activo }) }); toast(activo ? 'Libro publicado' : 'Libro pausado'); lbCargar(); } catch (err) { toast(err.message); } };
  window.lbEliminar = async function (id) {
    const l = L.find(x => x.id === id); if (!l || !confirm('¿Eliminar «' + l.titulo + '» de la biblioteca?')) return;
    try { await apiAdmin('/api/admin/libros/' + encodeURIComponent(id) + '/eliminar', { method: 'POST', body: '{}' }); toast('Libro eliminado'); lbCargar(); } catch (err) { toast(err.message); }
  };

  const showOriginal = window.showSection;
  window.showSection = function (sec) { showOriginal.apply(this, arguments); if (sec === 'libros') lbCargar(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
