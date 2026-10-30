/* Panel · Noticias automáticas guardadas (como Alintec y Zoorigen): el servidor trae lo nuevo de NewsData cada 12 horas,
   lo guarda y avisa a los miembros en la campana. Aquí el administrador las ve, las oculta y puede traer lo nuevo ahora.
   Depende del panel: apiAdmin, toast, esc; se dibuja dentro de la sección Noticias (#sec-news). */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const h = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let lista = [];

  function caja() {
    let c = $('ntAuto');
    if (!c) {
      const sec = $('sec-news'); if (!sec) return null;
      c = document.createElement('div'); c.id = 'ntAuto'; c.className = 'admin-card'; c.style.marginTop = '18px';
      sec.appendChild(c);
    }
    return c;
  }

  function pintar() {
    const c = caja(); if (!c) return;
    const visibles = lista.filter(n => !n.oculta);
    c.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:12px;">' +
      '<div><h3 style="margin:0;font-size:1rem;">Noticias automáticas (NewsData)</h3>' +
      '<p style="margin:4px 0 0;font-size:.78rem;color:var(--text-muted);">El servidor trae lo nuevo cada 12 horas, lo guarda y avisa a los miembros en la campana. Ocultar una noticia la quita del Club sin borrarla.</p></div>' +
      '<button class="btn btn-p btn-sm" type="button" onclick="ntAutoSincronizar(this)">Traer lo nuevo ahora</button></div>' +
      (lista.length ? '<div style="display:flex;flex-direction:column;gap:8px;">' + lista.map(n =>
        '<div style="display:flex;gap:12px;align-items:center;padding:10px 12px;border:1px solid var(--border);border-radius:10px;' + (n.oculta ? 'opacity:.5;' : '') + '">' +
        '<div style="flex:1;min-width:0;"><b style="font-size:.86rem;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + h(n.titulo) + '</b>' +
        '<small style="color:var(--text-muted);">' + h(n.fuente || 'Noticias') + (n.fechaPub ? ' · ' + h(String(n.fechaPub).slice(0, 10)) : '') + (n.oculta ? ' · OCULTA' : '') + '</small></div>' +
        (n.enlace ? '<a class="btn btn-o btn-sm" href="' + h(n.enlace) + '" target="_blank" rel="noopener">Abrir</a>' : '') +
        (n.oculta ? '' : '<button class="btn btn-o btn-sm" type="button" onclick="ntAutoOcultar(\'' + h(n.id) + '\')">Ocultar</button>') +
        '</div>').join('') + '</div>' +
        '<p style="margin:10px 0 0;font-size:.74rem;color:var(--text-muted);">' + visibles.length + ' visibles en el Club · ' + (lista.length - visibles.length) + ' ocultas</p>'
        : '<p style="font-size:.84rem;color:var(--text-muted);">Todavía no hay noticias guardadas. Usa «Traer lo nuevo ahora» (necesita NEWSDATA_API_KEY en el servidor).</p>');
  }

  async function cargar() {
    try { const r = await apiAdmin('/api/admin/noticias'); lista = r.noticias || []; pintar(); }
    catch (e) { const c = caja(); if (c) c.innerHTML = '<p style="font-size:.84rem;color:var(--text-muted);">Noticias automáticas: sin conexión con el servidor (' + h(e.message) + ').</p>'; }
  }

  window.ntAutoSincronizar = async function (btn) {
    if (btn) { btn.disabled = true; btn.textContent = 'Trayendo…'; }
    try {
      const r = await apiAdmin('/api/admin/noticias/sincronizar', { method: 'POST', body: '{}' });
      toast(r.ok ? (r.nuevas ? r.nuevas + ' noticia(s) nueva(s) guardada(s). Se avisó a los miembros.' : 'No hay noticias nuevas por ahora.') : 'No se pudo: ' + (r.motivo || ''));
      await cargar();
    } catch (e) { toast('No se pudo sincronizar: ' + e.message); }
    if (btn) { btn.disabled = false; btn.textContent = 'Traer lo nuevo ahora'; }
  };
  window.ntAutoOcultar = async function (id) {
    if (!confirm('¿Ocultar esta noticia del Club? No se borra: solo deja de mostrarse.')) return;
    try { await apiAdmin('/api/admin/noticias/' + encodeURIComponent(id), { method: 'DELETE' }); toast('Noticia oculta'); await cargar(); }
    catch (e) { toast('No se pudo ocultar: ' + e.message); }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(cargar, 1200)); else setTimeout(cargar, 1200);
})();
