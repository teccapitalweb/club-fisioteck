/* Club FisioTeck — visor de materiales (como Alintec Food): el archivo se abre dentro del Club, en una ventana oscura con el título,
   el botón de DESCARGAR arriba junto a la X, y la vista previa (PDF). Los formatos que el navegador no puede mostrar (Word, Excel, PowerPoint)
   enseñan una tarjeta con el botón de descargar; si el enlace es de Google Drive se muestra su vista previa.
   Reemplaza la apertura en pestaña nueva de: downloadPdf (Material PDF), ftCreditos.abrir (canje) y ftAbrirMaterial (material de cada curso).
   Los enlaces siguen saliendo del servidor y solo cuando corresponde. Depende de index.html: certFetch, getDriveFileId, showToast, showPaywallOverlay, siteData. */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = id => document.getElementById(id);
  const DESCARGA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></svg>';
  const CERRAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  const ARCHIVO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>';

  const extension = url => { try { return (new URL(url, location.href).pathname.split('.').pop() || '').toLowerCase(); } catch (_) { return ''; } };
  const driveId = url => (typeof getDriveFileId === 'function' ? getDriveFileId(url) : null);
  const FORMATOS = { pdf: 'PDF', docx: 'Word', doc: 'Word', xlsx: 'Excel', xls: 'Excel', pptx: 'PowerPoint', ppt: 'PowerPoint' };

  function cerrar() { const o = $('ftVisorOv'); if (o) o.remove(); document.removeEventListener('keydown', tecla, true); }
  function tecla(e) { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); cerrar(); } }

  function abrir({ titulo, url, formato, incrustar }) {
    if (!url) { showToast('El archivo todavía no está disponible.'); return; }
    cerrar();
    const id = driveId(url), ext = extension(url), fmt = formato || FORMATOS[ext] || 'Archivo';
    const vista = incrustar ? url : id ? 'https://drive.google.com/file/d/' + id + '/preview' : (ext === 'pdf' ? url + '#view=FitH' : '');
    const bajar = id ? 'https://drive.google.com/uc?export=download&id=' + id : url;
    const nombre = decodeURIComponent((url.split('?')[0].split('/').pop()) || (titulo || 'material'));
    const o = document.createElement('div'); o.id = 'ftVisorOv'; o.className = 'fv-ov'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true'); o.setAttribute('aria-label', titulo || 'Material');
    o.innerHTML = '<div class="fv-caja"><header><strong>' + esc(titulo || 'Material') + '</strong><span class="fv-fmt">' + esc(fmt) + '</span>' +
      '<a class="fv-bajar" id="fvBajar" href="' + esc(bajar) + '" ' + (id || incrustar ? 'target="_blank" rel="noopener noreferrer"' : 'download="' + esc(nombre) + '"') + ' title="' + (incrustar ? 'Abrir en otra pestaña' : 'Descargar') + '">' + DESCARGA + '<span>' + (incrustar ? 'Abrir aparte' : 'Descargar') + '</span></a>' +
      '<button type="button" class="fv-x" id="fvX" aria-label="Cerrar">' + CERRAR + '</button></header>' +
      '<div class="fv-cuerpo">' + (vista ? '<iframe src="' + esc(vista) + '" title="' + esc(titulo || 'Material') + '" loading="eager"></iframe>'
        : '<div class="fv-sin"><i>' + ARCHIVO + '</i><h3>' + esc(titulo || 'Material') + '</h3><p>Este archivo es de tipo <b>' + esc(fmt) + '</b> y se abre en tu programa. Descárgalo para usarlo y editarlo.</p><a class="fv-grande" href="' + esc(bajar) + '" ' + (id ? 'target="_blank" rel="noopener noreferrer"' : 'download="' + esc(nombre) + '"') + '>' + DESCARGA + ' Descargar ' + esc(fmt) + '</a></div>') + '</div></div>';
    document.body.appendChild(o);
    $('fvX').onclick = cerrar; o.addEventListener('mousedown', e => { if (e.target === o) cerrar(); });
    document.addEventListener('keydown', tecla, true);
  }
  window.ftVisor = { abrir, cerrar };

  // ---- Material PDF (biblioteca): downloadPdf(id, título) ----
  window.downloadPdf = async function (id, title) {
    if (!id) { showToast('El material "' + title + '" se descargará cuando el administrador lo suba'); return; }
    try {
      const r = await certFetch('/api/materiales/pdf-' + encodeURIComponent(id) + '/enlace');
      try { if (typeof incrementarStatLogro === 'function') incrementarStatLogro('pdfsDownloaded'); } catch (_) { /* sin logros */ }
      const p = ((siteData && siteData.pdfs) || []).find(x => String(x.id) === String(id));
      abrir({ titulo: title || (p && p.title) || r.titulo, url: r.url, formato: p && p.formato });
    } catch (e) { if (e.status === 402) { if (window.showPaywallOverlay) showPaywallOverlay(); } else showToast(e.message); }
  };

  // ---- Canje con créditos: ftCreditos.abrir(id) ----
  if (window.ftCreditos) ftCreditos.abrir = async function (id) {
    try {
      const r = await certFetch('/api/materiales/' + encodeURIComponent(id) + '/enlace');
      const p = ((siteData && siteData.pdfs) || []).find(x => 'pdf-' + x.id === id);
      abrir({ titulo: (p && p.title) || r.titulo, url: r.url, formato: p && p.formato });
    } catch (e) { showToast(e.message); }
  };

  // ---- Material de cada curso: ftAbrirMaterial(cursoId, i) ----
  const leyenda = m => m.estado === 'bloqueado-clase' ? 'Se desbloquea al terminar la clase ' + m.desbloqueaEnClase : m.estado === 'curso-cerrado' ? 'Se abre cuando se abra el curso' : m.estado === 'sin-acceso' ? 'Activa tu membresía para abrirlo' : '';
  window.ftAbrirMaterial = async function (cursoId, i) {
    const est = window.ftMaterialesCurso, m = est && est.cursoId === cursoId && est.materiales[i];
    if (m && m.estado === 'sin-acceso') { showPaywallOverlay(); return; }
    if (m && m.estado !== 'abierto') { showToast(leyenda(m)); return; }
    try {
      const r = await certFetch('/api/cursos/' + encodeURIComponent(cursoId) + '/materiales/' + i + '/enlace', { method: 'POST', body: '{}' });
      abrir({ titulo: (m && m.titulo) || r.titulo || 'Material del curso', url: r.url });
    } catch (e) { if (e.status === 402) showPaywallOverlay(); else showToast(e.message); }
  };
})();
