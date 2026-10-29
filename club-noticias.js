/* Club FisioTeck — noticias estilo periódico (como "Alintec Actualidad"): cada noticia es una hoja con cabezal, portada de color según su plantilla,
   foto, titular en serif, resumen y número de nota. Tres plantillas prehechas (azul, turquesa y bicolor) que el administrador elige al publicar
   (campo `plantilla` de la noticia en el panel); las noticias automáticas se reparten las plantillas por turnos. Al abrir una hoja se muestra
   "Lo esencial" en una ventana con columnas. Reemplaza newsCardHTML() de index.html, así que sirve igual en Inicio y en Noticias.
   Depende de index.html: siteData, memberIsPaid, showPaywallOverlay, driveImageUrl, incrementarStatLogro. */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const PLANTILLAS = ['azul', 'turquesa', 'bicolor'];
  const NOMBRES = { azul: 'Portada azul', turquesa: 'Portada turquesa', bicolor: 'Portada bicolor' };

  const plantillaDe = (n, i) => (PLANTILLAS.includes(n.plantilla) ? n.plantilla : PLANTILLAS[i % PLANTILLAS.length]);
  const dominio = n => { try { return new URL(n.externalLink).hostname.replace(/^www\./, ''); } catch (_) { return 'fisioteck.com'; } };
  function cuando(n) {
    const d = new Date((n.date || '') + 'T12:00:00'); if (isNaN(d)) return '';
    const dias = Math.round((new Date().setHours(12, 0, 0, 0) - d.getTime()) / 86400000);
    if (dias <= 0) return 'Hoy'; if (dias === 1) return 'Ayer';
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
  }
  const imagen = n => { const u = n.thumbnail || ''; if (!u) return ''; return /^(https?:|assets\/|data\/)/.test(u) && !/drive\.google\.com/.test(u) ? u : (typeof driveImageUrl === 'function' ? driveImageUrl(u) : u); };
  const resumen = n => String(n.excerpt || n.summary || (n.content || '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
  const lineas = n => { const t = String(n.summary || n.content || n.excerpt || '').replace(/<[^>]+>/g, '\n'); return t.split(/\n+/).map(x => x.trim()).filter(Boolean); };
  const fechaLarga = n => { const d = new Date((n.date || '') + 'T12:00:00'); return isNaN(d) ? '' : d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }); };

  // Una hoja. grande = true para la ventana "Lo esencial".
  function hoja(n, i, grande) {
    const pl = plantillaDe(n, i), cat = n.category || 'Noticias', fuente = n.source || 'FisioTeck', img = imagen(n);
    const num = String((i % 99) + 1).padStart(2, '0');
    const fig = '<figure class="hj-fig"><div class="hj-img"' + (img ? ' style="background-image:url(\'' + esc(img) + '\')"' : '') + '></div><figcaption class="hj-cap"><span class="hj-tag">' + esc(cat) + '</span><strong>' + esc(n.title) + '</strong></figcaption></figure>';
    const cuerpo = grande
      ? '<div class="hj-body"><h4 class="hj-title">' + esc(n.title) + '</h4><div class="hj-deck">' + esc(fuente) + ' &middot; ' + esc(fechaLarga(n)) + '</div><div class="hj-txt">' + lineas(n).map(p => '<p>' + esc(p) + '</p>').join('') + '</div></div>'
      : '<div class="hj-body"><h4 class="hj-title">' + esc(n.title) + '</h4><div class="hj-deck">' + esc(fuente) + ' &middot; ' + esc(cuando(n)) + '</div><div class="hj-summary"><p>' + esc(resumen(n)) + '</p></div></div>';
    return '<article class="hoja hoja--' + pl + (grande ? ' hoja--grande' : ' hoja--tarjeta') + '" data-category="' + esc(n.category || 'all') + '" data-title="' + esc(String(n.title || '').toLowerCase()) + '"' + (grande ? '' : ' tabindex="0" role="button" aria-label="Abrir: ' + esc(n.title) + '" data-id="' + esc(n.id) + '"') + '><div class="hj-paper">' +
      '<div class="hj-top"><span>' + esc(dominio(n)) + '</span><span>' + esc(fechaLarga(n)) + '</span></div>' +
      '<header class="hj-mast"><h3 class="hj-brand"><span>FisioTeck</span> <span>Actualidad</span></h3><div class="hj-lema">' + esc(cat) + ' &mdash; <em>' + esc(fuente) + '</em></div></header>' +
      fig + cuerpo +
      '<footer class="hj-foot"><span class="hj-leer">' + (grande ? (n.externalLink ? '<a href="' + esc(n.externalLink) + '" target="_blank" rel="noopener">Leer la nota original</a>' : '') : 'Ver resumen ampliado') + '</span><span class="hj-page">' + num + '</span></footer></div></article>';
  }

  // Ventana "Lo esencial"
  function abrir(id) {
    if (typeof memberIsPaid !== 'undefined' && !memberIsPaid) { showPaywallOverlay(); return; }
    const lista = (typeof siteData !== 'undefined' && siteData.news) || [], i = lista.findIndex(n => String(n.id) === String(id)), n = lista[i];
    if (!n) return;
    try { incrementarStatLogro('newsRead', n.id); } catch (_) { /* sin logros */ }
    let ov = document.getElementById('hjOverlay');
    if (!ov) { ov = document.createElement('div'); ov.id = 'hjOverlay'; ov.className = 'hj-overlay'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Lo esencial de la noticia'); document.body.appendChild(ov); ov.addEventListener('mousedown', e => { if (e.target === ov) cerrar(); }); }
    ov.innerHTML = '<div class="hj-modal"><div class="hj-modal-top"><span class="ftd-eyebrow">Lo esencial</span><button type="button" class="hj-x" aria-label="Cerrar">&times;</button></div>' + hoja(n, i, true) + '</div>';
    ov.classList.add('on'); document.body.classList.add('modal-open');
    ov.querySelector('.hj-x').onclick = cerrar; ov.querySelector('.hj-x').focus();
  }
  function cerrar() { const ov = document.getElementById('hjOverlay'); if (ov) ov.classList.remove('on'); document.body.classList.remove('modal-open'); }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });
  document.addEventListener('click', e => { const h = e.target.closest && e.target.closest('.hoja--tarjeta[data-id]'); if (h && !e.target.closest('a')) abrir(h.dataset.id); });
  document.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('.hoja--tarjeta[data-id]')) { e.preventDefault(); abrir(e.target.dataset.id); } });

  // newsCardHTML(n) de index.html se reemplaza por la hoja; el número sale de su lugar en la lista
  window.newsCardHTML = n => hoja(n, Math.max(0, ((typeof siteData !== 'undefined' && siteData.news) || []).indexOf(n)), false);
  // Si la foto de una noticia no carga (enlace roto, sitio que la bloquea), se quita el recuadro vacío y la tarjeta queda solo con su texto
  function revisarFotos(raiz) {
    (raiz || document).querySelectorAll('.hj-img[style*="background-image"]:not([data-chk])').forEach(el => {
      el.dataset.chk = '1';
      const m = /url\(["']?(.*?)["']?\)/.exec(el.style.backgroundImage || ''); if (!m) return;
      const im = new Image();
      im.onerror = () => { const f = el.closest('.hj-fig'); if (f) f.classList.add('sin-foto'); };
      im.src = m[1];
    });
  }
  new MutationObserver(() => revisarFotos()).observe(document.body, { childList: true, subtree: true });
  revisarFotos();

  window.ftNoticias = { hoja, abrir, cerrar, PLANTILLAS, NOMBRES, plantillaDe };
})();
