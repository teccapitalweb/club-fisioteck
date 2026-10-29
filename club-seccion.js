/* Club FisioTeck — título unificado por sección, menú agrupado y barra móvil.
   Solo reordena y decora lo que ya existe: no cambia funciones ni datos.
   Debe cargarse al final (después de club-retos.js y club-directorio.js, que agregan sus propios items). */
(function () {
  'use strict';
  const I = {
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/>',
    live: '<circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    news: '<path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
    gift: '<rect x="3" y="8" width="18" height="4"/><path d="M12 8v13M19 12v9H5v-9"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    cert: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'
  };
  const svg = k => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + I[k] + '</svg>';

  // Grupos del menú, en orden. Cada item se MUEVE (conserva sus eventos).
  const GRUPOS = [
    ['Principal', ['home', 'library', 'courses-live', 'pdfs', 'retos']],
    ['Mi progreso', ['achievements', 'certificates']],
    ['Herramientas', ['rehab-calc', 'atlas', 'glossary', 'rom', 'eva', 'timer']],
    ['Comunidad', ['news', 'forum', 'directorio', 'referidos', 'community']],
    ['Mi cuenta', ['account', 'subscription', 'notifications', 'discount', 'settings', '#navAdminPanel']]
  ];
  // Píldora por sección: [grupo, icono]
  const PILDORA = {
    library: ['Principal', 'book'], 'courses-live': ['Principal', 'live'], pdfs: ['Principal', 'file'], retos: ['Principal', 'target'],
    achievements: ['Mi progreso', 'trophy'], certificates: ['Mi progreso', 'cert'],
    'rehab-calc': ['Herramientas', 'tool'], atlas: ['Herramientas', 'tool'], glossary: ['Herramientas', 'book'], rom: ['Herramientas', 'tool'], eva: ['Herramientas', 'tool'], timer: ['Herramientas', 'tool'],
    news: ['Comunidad', 'news'], forum: ['Comunidad', 'chat'], directorio: ['Comunidad', 'users'], community: ['Comunidad', 'chat'],
    account: ['Mi cuenta', 'user'], subscription: ['Mi cuenta', 'card'], notifications: ['Mi cuenta', 'bell'], discount: ['Mi cuenta', 'gift'], settings: ['Mi cuenta', 'gear']
  };

  function menu() {
    const nav = document.querySelector('#sidebar .sidebar-nav');
    if (!nav) return;
    const items = {};
    nav.querySelectorAll('.nav-item').forEach(n => { items[n.dataset.page || ('#' + n.id)] = n; });
    const usados = new Set();
    const frag = document.createDocumentFragment();
    GRUPOS.forEach(([titulo, claves]) => {
      const nodos = claves.map(k => items[k]).filter(Boolean);
      if (!nodos.length) return;
      const t = document.createElement('div');
      t.className = 'nav-section'; t.textContent = titulo;
      frag.appendChild(t);
      nodos.forEach(n => { frag.appendChild(n); usados.add(n); });
    });
    // Cualquier item que alguien agregue después y no esté en la lista, al final y sin perderse
    Object.values(items).forEach(n => { if (!usados.has(n)) frag.appendChild(n); });
    nav.innerHTML = '';
    nav.appendChild(frag);
  }

  function barraMovil() {
    const pdf = document.querySelector('.mobile-bottom-item[data-page="pdfs"]');
    if (!pdf || document.querySelector('.mobile-bottom-item[data-page="retos"]')) return;
    pdf.dataset.page = 'retos';
    pdf.setAttribute('onclick', "showPage('retos')");
    pdf.setAttribute('aria-label', 'Retos');
    pdf.innerHTML = svg('target') + '<span>Retos</span>';
  }

  function cifras(page) {
    const d = (typeof siteData !== 'undefined' && siteData) || {};
    const cursos = d.courses || [];
    if (page === 'library' && cursos.length) {
      const clases = cursos.reduce((n, c) => n + ((c.lessons || []).length), 0);
      return [[cursos.length, 'cursos'], [clases, 'clases']];
    }
    if (page === 'pdfs' && (d.pdfs || []).length) return [[d.pdfs.length, 'materiales']];
    if (page === 'retos' && window.FT_RETOS) return [[window.FT_RETOS.quiz.length + window.FT_RETOS.orden.length, 'retos'], [window.FT_RETOS.flashcards.length, 'flashcards']];
    return null;
  }

  function titulos() {
    document.querySelectorAll('.section').forEach(sec => {
      const page = sec.id.replace(/^page-/, '');
      const cab = sec.querySelector(':scope > .page-header');
      const def = PILDORA[page];
      if (!cab || !def || cab.querySelector('.cs-pill')) return;
      cab.insertAdjacentHTML('afterbegin', '<span class="cs-pill">' + svg(def[1]) + def[0] + '</span>');
      if (['library', 'pdfs', 'retos'].includes(page)) cab.insertAdjacentHTML('beforeend', '<div class="cs-cifras" data-cs="' + page + '"></div>');
    });
  }
  function refrescarCifras(page) {
    const c = cifras(page), caja = document.querySelector('.cs-cifras[data-cs="' + page + '"]');
    if (caja && c) caja.innerHTML = c.map(([n, t]) => '<span><b>' + n + '</b>' + t + '</span>').join('');
  }
  const showPageOriginal = window.showPage;
  window.showPage = function (page) {
    const r = showPageOriginal.apply(this, arguments);
    refrescarCifras(page);
    return r;
  };

  menu(); barraMovil(); titulos();
  // siteData llega de forma asíncrona: al volver a la biblioteca o a Retos se rellenan las cifras
  setTimeout(() => ['library', 'pdfs', 'retos'].forEach(refrescarCifras), 1500);
})();
