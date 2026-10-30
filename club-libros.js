/* Club FisioTeck — Libros de lectura (como Alintec Food): los publica el administrador y se desbloquean SOLO superando retos (no se canjean por créditos).
   Viven dentro de "PDF y material" (club-material.js los dibuja con ftLibros.bloque): "Tu siguiente libro", libro destacado y estante.
   El servidor decide qué libros están abiertos (GET /api/libros) y solo entrega el enlace de lectura a quien ya lo desbloqueó
   (POST /api/libros/:id/enlace); aquí solo se muestra. El libro se lee dentro del Club con el visor de materiales.
   Depende de index.html: auth, certFetch, showPage, showToast, showPaywallOverlay, memberIsPaid; de club-visor.js (ftVisor) y club-material.js (ftMaterial). */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const S = { datos: null };
  window.ftLibros = S;
  const ic = d => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  const LIBRO = ic('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>');
  const CANDADO = ic('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>');
  const RAYO = ic('<path d="M13 2L3 14h9l-1 8 10-12h-9z"/>');
  const PIN = ic('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>');
  const COLORES = [['#0A3E68', '#159E92'], ['#115E59', '#2DD4BF'], ['#5B21B6', '#A78BFA'], ['#9A3412', '#FB923C'], ['#1E3A8A', '#60A5FA'], ['#0D5FA0', '#4CA6DE']];
  const GUARDADOS = () => 'ft:libros:guardados:' + ((typeof auth !== 'undefined' && auth.currentUser && auth.currentUser.uid) || 'x'); // por cuenta
  const guardados = () => { try { return new Set(JSON.parse(localStorage.getItem(GUARDADOS()) || '[]')); } catch (_) { return new Set(); } };
  const alternarGuardado = id => { const s = guardados(); if (s.has(id)) s.delete(id); else s.add(id); try { localStorage.setItem(GUARDADOS(), JSON.stringify([...s])); } catch (_) { /* modo privado */ } return s.has(id); };

  // Los libros ya no tienen página propia: "Libros" lleva a PDF y material, donde viven
  const showPageOriginal = window.showPage;
  window.showPage = function (page) {
    if (page === 'libros') page = 'pdfs';
    const r = showPageOriginal.call(this, page);
    if (page === 'pdfs') cargar();
    return r;
  };
  function quitarMenu() { const item = document.querySelector('.sidebar-nav .nav-item[data-page="libros"]'); if (item) item.remove(); }

  async function cargar() {
    if (!auth.currentUser) return;
    try { S.datos = await certFetch('/api/libros'); } catch (_) { return; }
    if (window.ftMaterial) ftMaterial.pintar();
  }

  const colorDe = i => COLORES[i % COLORES.length];
  const portadaCss = (l, i) => (l.portada || (window.ftPortadaBase && ftPortadaBase('assets/portadas/libros/' + l.id + '.webp'))) ? 'url(\'' + esc(l.portada || ftPortadaBase('assets/portadas/libros/' + l.id + '.webp')) + '\')' : 'linear-gradient(135deg,' + colorDe(i)[0] + ',' + colorDe(i)[1] + ')';
  const etiquetaProgreso = l => !S.datos.membresia ? 'Solo para miembros · supera ' + l.requiere + ' retos' : 'Retos superados: ' + Math.min(S.datos.retosHechos, l.requiere) + ' de ' + l.requiere;
  const porcentaje = l => Math.min(100, Math.round((S.datos.retosHechos / l.requiere) * 100));

  function banner(libros) {
    const d = S.datos, sig = libros.find(l => !l.desbloqueado), abiertos = libros.filter(l => l.desbloqueado).length;
    if (!sig) return abiertos ? '<div class="bib-reto bib-reto--ok"><div class="bib-reto__txt"><strong>Desbloqueaste todos los libros</strong><span>Sigue practicando en la Zona de retos para subir de nivel.</span></div></div>' : '';
    if (!d.membresia) return '<div class="bib-reto"><span class="bib-reto__ic">' + CANDADO + '</span><div class="bib-reto__txt"><strong>Supera retos y desbloquea tu primer libro</strong><span>Con tu membresía, completa ' + sig.requiere + ' retos de la Zona de retos y abre «' + esc(sig.titulo) + '». Los demás libros se abren con más retos.</span></div><button type="button" class="ftd-btn" data-lb-paywall>Ver membresía</button></div>';
    const pct = porcentaje(sig);
    return '<div class="bib-reto"><span class="bib-reto__ic">' + RAYO + '</span><div class="bib-reto__txt"><strong>' + (abiertos ? 'Tu siguiente libro' : 'Supera retos y desbloquea tu primer libro') + '</strong><span>«' + esc(sig.titulo) + '» · llevas ' + Math.min(d.retosHechos, sig.requiere) + ' de ' + sig.requiere + ' retos</span><div class="bib-reto__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><i style="width:' + pct + '%"></i></div></div><button type="button" class="ftd-btn" data-lb-retos>Ir a los retos</button></div>';
  }

  function destacado(l) {
    const cerrado = !l.desbloqueado, g = guardados().has(l.id);
    return '<article class="libro-feature' + (cerrado ? ' is-locked' : '') + '" data-lb="' + esc(l.id) + '" role="button" tabindex="0" style="--book-cover:' + portadaCss(l, 0) + '">' +
      '<div class="libro-feature__cover">' + (cerrado ? '<span class="libro-lock" aria-hidden="true">' + CANDADO + '</span>' : '') + '<span class="libro-feature__edition">Biblioteca técnica</span>' +
      '<div class="libro-feature__cover-copy"><small>FisioTeck</small><strong>' + esc(l.titulo) + '</strong></div></div>' +
      '<div class="libro-feature__info"><span class="libro-feature__eyebrow">Libro destacado' + (l.fuente ? ' · ' + esc(l.fuente) : '') + '</span><h2>' + esc(l.titulo) + '</h2>' + (l.autor ? '<p class="libro-feature__author">' + esc(l.autor) + '</p>' : '') +
      (l.descripcion ? '<p class="libro-feature__summary">' + esc(l.descripcion) + '</p>' : '') +
      '<div class="libro-feature__actions"><span class="libro-feature__cta">' + (cerrado ? (S.datos.membresia ? 'Bloqueado · supera ' + l.requiere + ' retos' : 'Supera retos y desbloquéalo') : 'Leer ahora') + ' ' + (cerrado ? CANDADO : LIBRO) + '</span>' +
      '<button type="button" class="libro-feature__save' + (g ? ' is-on' : '') + '" data-guardar="' + esc(l.id) + '" aria-label="Guardar libro" title="Guardar">' + PIN + '</button>' +
      '<span class="libro-feature__pages">Libro' + (l.paginas ? ' · ' + l.paginas + ' páginas' : '') + (l.idioma ? ' · ' + esc(l.idioma) : '') + '</span></div>' +
      (cerrado ? '<div class="libro-feature__reading" aria-label="' + esc(etiquetaProgreso(l)) + '"><div class="libro-progress"><span style="width:' + porcentaje(l) + '%"></span></div><div class="libro-progress-label">' + esc(etiquetaProgreso(l)) + '</div></div>' : '') +
      '</div></article>';
  }

  function tarjeta(l, i) {
    const cerrado = !l.desbloqueado, g = guardados().has(l.id);
    return '<article class="libro-card' + (cerrado ? ' is-locked' : '') + '" data-lb="' + esc(l.id) + '" role="button" tabindex="0" style="--book-cover:' + portadaCss(l, i + 1) + '">' +
      '<button type="button" class="libro-card__save' + (g ? ' is-on' : '') + '" data-guardar="' + esc(l.id) + '" aria-label="Guardar" title="Guardar">' + PIN + '</button>' +
      '<div class="libro-card__top">' + (cerrado ? '<span class="libro-lock" aria-hidden="true">' + CANDADO + '</span>' : '') + '<span class="libro-card__edition">Edición de consulta</span>' +
      '<div class="libro-card__cover-copy"><small>FisioTeck</small><strong>' + esc(l.titulo) + '</strong></div></div>' +
      '<div class="libro-card__body"><div class="libro-card__title">' + esc(l.titulo) + '</div>' + (l.autor ? '<div class="libro-card__autor">' + esc(l.autor) + '</div>' : '') +
      '<div class="libro-card__reading"><div class="libro-progress"><span style="width:' + (cerrado ? porcentaje(l) : 100) + '%"></span></div><div class="libro-progress-label">' + (cerrado ? esc(etiquetaProgreso(l)) : (l.paginas ? l.paginas + ' páginas' : 'Desbloqueado')) + '</div></div></div></article>';
  }

  // Bloque que dibuja club-material.js dentro de "PDF y material": etiqueta, "Tu siguiente libro", libro destacado y estante
  S.bloque = function (materiales) {
    const d = S.datos; if (!d || !d.libros || !d.libros.length) return '';
    const resto = d.libros.slice(1);
    return '<div class="lb-seccion">' + LIBRO + 'Libros</div>' + banner(d.libros) + '<div id="ftLibrosBloque">' + destacado(d.libros[0]) +
      '<div class="bib-shelf-title"><span>Explora más libros y materiales</span><small>' + resto.length + ' título' + (resto.length === 1 ? '' : 's') + ' de consulta · ' + (materiales || 0) + ' materiales</small></div>' +
      (resto.length ? '<div class="bib-libros-grid">' + resto.map(tarjeta).join('') + '</div>' : '') + '</div>' +
      '<p class="lb-nota">Cada libro se abre al superar cierto número de retos (quiz, detective, ordena el proceso y modo historia). Los libros son para miembros con membresía vigente y no se canjean por créditos.</p>';
  };
  S.enlazar = function (raiz) {
    const abrir = id => { const l = ((S.datos || {}).libros || []).find(x => x.id === id); if (!l) return; if (l.desbloqueado) leer(id); else if (!S.datos.membresia) showPaywallOverlay(); else showToast('Supera ' + l.faltan + ' reto' + (l.faltan === 1 ? '' : 's') + ' más en la Zona de retos para abrir «' + l.titulo + '».'); };
    raiz.querySelectorAll('[data-lb]').forEach(el => {
      el.onclick = ev => { if (ev.target.closest('[data-guardar]')) return; abrir(el.dataset.lb); };
      el.onkeydown = ev => { if ((ev.key === 'Enter' || ev.key === ' ') && !ev.target.closest('[data-guardar]')) { ev.preventDefault(); abrir(el.dataset.lb); } };
    });
    raiz.querySelectorAll('[data-guardar]').forEach(b => b.onclick = ev => { ev.stopPropagation(); b.classList.toggle('is-on', alternarGuardado(b.dataset.guardar)); });
    raiz.querySelectorAll('[data-lb-paywall]').forEach(b => b.onclick = () => showPaywallOverlay());
    raiz.querySelectorAll('[data-lb-retos]').forEach(b => b.onclick = () => showPage('retos'));
  };
  async function leer(id) {
    try {
      const r = await certFetch('/api/libros/' + encodeURIComponent(id) + '/enlace', { method: 'POST', body: '{}' });
      const lib = ((S.datos || {}).libros || []).find(x => x.id === id) || {};
      // Libros propios (PDF del servidor): lector de libro abierto como Alintec. Los externos (por ejemplo OpenStax) se leen en su sitio.
      if (r.propio && window.ftLector) ftLector.abrir({ id, titulo: r.titulo, subtitulo: lib.autor || 'Libro de FisioTeck', url: r.url });
      else if (window.ftVisor) ftVisor.abrir({ titulo: r.titulo, url: r.url, formato: 'Libro', incrustar: true }); else window.open(r.url, '_blank', 'noopener');
    } catch (e) { if (e.status === 402) showPaywallOverlay(); else showToast(e.message); }
  }

  quitarMenu(); [800, 2500, 6000].forEach(t => setTimeout(quitarMenu, t));
  auth.onAuthStateChanged(u => { if (!u) S.datos = null; else cargar(); });
})();
