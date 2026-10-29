/* Panel FisioTeck — moderación:
   · Reseñas: ocultar o volver a mostrar un comentario (no cuenta en el promedio mientras está oculto; no se borra nada). Lo hace el servidor.
   · Directorio: eliminar una tarjeta (el miembro puede volver a crearla desde el Club).
   Depende de index.html: apiAdmin, cargarResenas, renderDirectorio, cargarDirectorio, dirLista, fbDb, toast, esc. */
(function () {
  'use strict';
  const e = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let ultimaResenas = null;
  const orig = window.apiAdmin;
  window.apiAdmin = async function (ruta) { const d = await orig.apply(this, arguments); if (String(ruta).split('?')[0] === '/api/admin/resenas') ultimaResenas = d; return d; };

  // ---------- Reseñas ----------
  window.reOcultar = async function (id, oculta) {
    if (oculta && !confirm('¿Ocultar esta reseña? Dejará de contar en el promedio y en las gráficas. Podrás mostrarla otra vez.')) return;
    try { await apiAdmin('/api/admin/resenas/' + encodeURIComponent(id) + '/ocultar', { method: 'POST', body: JSON.stringify({ oculta }) }); toast(oculta ? 'Reseña oculta' : 'Reseña visible otra vez'); cargarResenas(); }
    catch (err) { toast('No se pudo cambiar: ' + err.message); }
  };
  function marcarResenas() {
    const lista = document.getElementById('reLista'), d = ultimaResenas; if (!lista || !d) return;
    const conComentario = (d.resenas || []).filter(r => r.comentario).slice(0, 40);
    [...lista.querySelectorAll('.ap-row')].forEach((fila, i) => {
      const r = conComentario[i]; if (!r || fila.querySelector('.mo-btn')) return;
      if (r.oculta) fila.style.opacity = '.55';
      const b = document.createElement('button'); b.type = 'button'; b.className = 'btn btn-o btn-sm mo-btn'; b.style.marginLeft = 'auto';
      b.textContent = r.oculta ? 'Mostrar' : 'Ocultar'; b.onclick = () => reOcultar(r.id, !r.oculta);
      if (r.oculta) fila.insertAdjacentHTML('afterbegin', '<span class="badge badge-warning" style="align-self:center;margin-right:8px">Oculta</span>');
      fila.appendChild(b);
    });
  }
  const cargarOriginal = window.cargarResenas;
  if (typeof cargarOriginal === 'function') window.cargarResenas = async function () { const r = await cargarOriginal.apply(this, arguments); try { marcarResenas(); } catch (_) { /* sin botones */ } return r; };

  // ---------- Directorio ----------
  window.diEliminar = async function (uid) {
    const t = (typeof dirLista !== 'undefined' ? dirLista : []).find(x => x.uid === uid); if (!t) return;
    if (!confirm('¿Eliminar la tarjeta de ' + (t.nombre || 'este miembro') + ' del directorio? Podrá volver a crearla desde el Club.')) return;
    try {
      await fbDb.collection('directorio').doc(uid).delete();
      toast('Tarjeta eliminada'); cargarDirectorio();
    } catch (err) { toast('No se pudo eliminar: ' + (err.code || err.message)); }
  };
  function marcarDirectorio() {
    const tabla = document.getElementById('diTabla'); if (!tabla) return;
    const lista = (typeof dirLista !== 'undefined' ? dirLista : []);
    const filtro = (typeof dirBusqueda !== 'undefined' ? dirBusqueda : '');
    const visibles = lista.filter(t => !filtro || [t.nombre, t.ciudad, t.especialidad].join(' ').toLowerCase().includes(filtro));
    [...tabla.querySelectorAll('tr')].forEach((tr, i) => {
      const t = visibles[i]; const celda = tr.lastElementChild; if (!t || !celda || celda.querySelector('.mo-del')) return;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'btn btn-o btn-sm mo-del'; b.style.marginLeft = '6px'; b.textContent = 'Eliminar';
      b.onclick = () => diEliminar(t.uid); celda.appendChild(b);
    });
  }
  const renderOriginal = window.renderDirectorio;
  if (typeof renderOriginal === 'function') window.renderDirectorio = function () { const r = renderOriginal.apply(this, arguments); try { marcarDirectorio(); } catch (_) { /* sin botones */ } return r; };
  void e;
})();
