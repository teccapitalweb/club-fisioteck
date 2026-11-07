/* Club FisioTeck — Biblioteca de ejercicios (contenido en club-ejercicios-datos.js).
   Buscador, filtros por zona y objetivo, ficha con pasos, progresión, errores y precauciones, favoritos (solo en este dispositivo) y PDF para el paciente.
   Contenido de apoyo redactado con palabras propias: no sustituye la valoración ni la prescripción del fisioterapeuta. Conviene que un fisioterapeuta lo revise. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const EJ = (window.FT_EJERCICIOS || []).slice();
  const IMG = id => 'assets/ejercicios/' + id + '.webp';
  // Si la imagen aún no existe, se oculta y la tarjeta queda solo con texto
  const imgTag = (id, cls) => '<img class="' + cls + '" src="' + IMG(id) + '" alt=""' + (cls === 'ej-hero' ? '' : ' loading="lazy"') + ' onerror="this.remove()">';
  const ZONAS = ['Todas'].concat(Array.from(new Set(EJ.map(e => e.zona))));
  const OBJ = ['Todos'].concat(Array.from(new Set(EJ.map(e => e.objetivo))));
  let fz = 'Todas', fo = 'Todos', q = '', solo = false, abierto = '';

  const CLAVE = 'ft_ejercicios_fav';
  const favs = () => { try { return new Set(JSON.parse(localStorage.getItem(CLAVE) || '[]')); } catch (_) { return new Set(); } };
  const guardarFavs = s => { try { localStorage.setItem(CLAVE, JSON.stringify([...s])); } catch (_) { /* modo privado */ } };
  const sin = t => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  function chips(lista, act, tipo) { return lista.map(x => '<button type="button" class="ej-chip' + (x === act ? ' on' : '') + '" data-t="' + tipo + '" data-v="' + esc(x) + '">' + esc(x) + '</button>').join(''); }

  function lista() {
    const raiz = $('ejerciciosCont'); if (!raiz) return;
    abierto = '';
    const F = favs(), n = sin(q);
    const res = EJ.filter(e => (fz === 'Todas' || e.zona === fz) && (fo === 'Todos' || e.objetivo === fo) && (!solo || F.has(e.id)) && (!n || sin(e.nombre + ' ' + e.zona + ' ' + e.musculos.join(' ')).includes(n)));
    raiz.innerHTML = '<div class="ej-barra"><input type="search" id="ejQ" placeholder="Buscar ejercicio, músculo o zona..." value="' + esc(q) + '" aria-label="Buscar ejercicio"><button type="button" class="ej-fav-f' + (solo ? ' on' : '') + '" id="ejSolo">Mis favoritos (' + F.size + ')</button></div>' +
      '<div class="ej-filtros"><span class="ej-fl">Zona</span><div class="ej-chips">' + chips(ZONAS, fz, 'z') + '</div></div>' +
      '<div class="ej-filtros"><span class="ej-fl">Objetivo</span><div class="ej-chips">' + chips(OBJ, fo, 'o') + '</div></div>' +
      '<p class="ej-aviso">Material de apoyo para el fisioterapeuta: no sustituye la valoración ni la prescripción. Adapta la dosis a cada paciente.</p><p class="ej-cuenta">' + res.length + ' ejercicio' + (res.length === 1 ? '' : 's') + '</p>' +
      (res.length ? '<div class="ej-grid">' + res.map(e => '<button type="button" class="ej-card" data-id="' + e.id + '">' + imgTag(e.id, 'ej-img') + '<span class="ej-zona">' + esc(e.zona) + '</span><b>' + esc(e.nombre) + '</b><span class="ej-par">' + esc(e.para) + '</span><span class="ej-meta"><span>' + esc(e.objetivo) + '</span><span>' + esc(e.nivel) + '</span><span>' + esc(e.equipo) + '</span></span>' + (F.has(e.id) ? '<span class="ej-marca">Favorito</span>' : '') + '</button>').join('') + '</div>' : '<p class="ej-vacio">No hay ejercicios con esos filtros.</p>');
    $('ejQ').addEventListener('input', ev => { q = ev.target.value; const p = ev.target.selectionStart; lista(); const i = $('ejQ'); i.focus(); i.setSelectionRange(p, p); });
    $('ejSolo').addEventListener('click', () => { solo = !solo; lista(); });
    raiz.querySelectorAll('.ej-chip').forEach(b => b.addEventListener('click', () => { if (b.dataset.t === 'z') fz = b.dataset.v; else fo = b.dataset.v; lista(); }));
    raiz.querySelectorAll('.ej-card').forEach(b => b.addEventListener('click', () => ficha(b.dataset.id)));
  }

  function ul(a) { return '<ul>' + a.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>'; }
  function ficha(id) {
    const e = EJ.find(x => x.id === id), raiz = $('ejerciciosCont'); if (!e) return;
    abierto = id; const F = favs();
    raiz.innerHTML = '<button type="button" class="ej-volver" id="ejVolver">Volver a la biblioteca</button>' +
      '<article class="ej-ficha">' + imgTag(e.id, 'ej-hero') + '<header class="ej-cab"><div><span class="ej-zona">' + esc(e.zona) + '</span><h2>' + esc(e.nombre) + '</h2><div class="ej-meta"><span>' + esc(e.objetivo) + '</span><span>Nivel ' + esc(e.nivel.toLowerCase()) + '</span><span>' + esc(e.equipo) + '</span></div></div>' +
      '<div class="ej-acc"><button type="button" class="ej-btn' + (F.has(id) ? ' on' : '') + '" id="ejFav">' + (F.has(id) ? 'Quitar de favoritos' : 'Guardar en favoritos') + '</button><button type="button" class="ej-btn pri" id="ejPdf">PDF para el paciente</button></div></header>' +
      '<section class="ej-bl"><h3>Para qué sirve</h3><p>' + esc(e.para) + '</p></section>' +
      '<section class="ej-bl"><h3>Músculos que trabaja</h3><div class="ej-tags">' + e.musculos.map(m => '<span>' + esc(m) + '</span>').join('') + '</div>' + (e.atlas ? '<button type="button" class="ej-link" id="ejAtlas">Ver la zona en el Atlas</button>' : '') + '</section>' +
      '<section class="ej-bl"><h3>Cómo se hace</h3><ol class="ej-pasos">' + e.pasos.map(p => '<li>' + esc(p) + '</li>').join('') + '</ol></section>' +
      '<section class="ej-bl"><h3>Dosis de referencia</h3><p>' + esc(e.dosis) + '</p></section>' +
      '<div class="ej-dos"><section class="ej-bl"><h3>Cómo progresarlo</h3>' + ul(e.progresion) + '</section><section class="ej-bl"><h3>Errores comunes</h3>' + ul(e.errores) + '</section></div>' +
      '<section class="ej-bl ej-prec"><h3>Precauciones</h3>' + ul(e.precauciones) + '</section>' +
      (e.fuentes && e.fuentes.length ? '<section class="ej-bl"><h3>Fuentes</h3>' + ul(e.fuentes) + '</section>' : '') + '<p class="ej-nota">Contenido de apoyo: no sustituye la valoración ni la prescripción del fisioterapeuta. Adapta la dosis a cada paciente.</p></article>';
    $('ejVolver').addEventListener('click', lista);
    $('ejFav').addEventListener('click', () => { const s = favs(); s.has(id) ? s.delete(id) : s.add(id); guardarFavs(s); ficha(id); });
    $('ejPdf').addEventListener('click', () => pdf(e));
    const a = $('ejAtlas'); if (a) a.addEventListener('click', () => { if (window.showPage) showPage('atlas'); });
    window.scrollTo(0, 0);
  }

  function pdf(e) {
    const w = window.open('', '_blank'); if (!w) { if (window.showToast) showToast('Permite las ventanas emergentes para generar el PDF'); return; }
    const li = a => a.map(x => '<li>' + esc(x) + '</li>').join('');
    w.document.write('<!doctype html><html lang="es"><head><meta charset="utf-8"><title>' + esc(e.nombre) + '</title><style>body{font-family:Arial,sans-serif;max-width:700px;margin:30px auto;color:#12202B;line-height:1.5}h1{font-size:22px;margin:0 0 4px}h2{font-size:14px;text-transform:uppercase;letter-spacing:.06em;color:#0F6E8C;margin:20px 0 6px}small{color:#5b6b78}li{margin:3px 0}.n{margin-top:26px;font-size:11px;color:#5b6b78;border-top:1px solid #ccd;padding-top:8px}</style></head><body><h1>' + esc(e.nombre) + '</h1><small>' + esc(e.zona) + ' · ' + esc(e.objetivo) + ' · ' + esc(e.equipo) + '</small>' +
      '<h2>Para qué sirve</h2><p>' + esc(e.para) + '</p><h2>Cómo se hace</h2><ol>' + li(e.pasos) + '</ol><h2>Cuántas veces</h2><p>__________________________________</p><h2>Errores que debes evitar</h2><ul>' + li(e.errores) + '</ul><h2>Detente y avisa a tu fisioterapeuta si</h2><ul>' + li(e.precauciones) + '</ul><p class="n">Material de apoyo del Club FisioTeck. No sustituye las indicaciones de tu fisioterapeuta.</p><script>window.onload=function(){window.print()}<\/script></body></html>');
    w.document.close();
  }

  const original = window.showPage;
  window.showPage = function (page) {
    const r = original.apply(this, arguments);
    if (page === 'ejercicios') lista();
    return r;
  };
  // Se puede ver sin plan, pero al tocar cualquier cosa (un ejercicio, un filtro, favoritos o el buscador) se manda a Suscripción
  const conPlan = () => (typeof memberIsPaid !== 'undefined' && memberIsPaid) || window.ftVistaAdmin === true;
  const pg = $('page-ejercicios');
  if (pg && !pg.dataset.ftGuardia) {
    pg.dataset.ftGuardia = '1';
    pg.addEventListener('click', e => {
      if (conPlan()) return;
      if (!e.target.closest('button, input, a, summary, [role="button"]')) return;
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      if (typeof showToast === 'function') showToast('La biblioteca de ejercicios es para miembros. Elige tu plan para usarla.');
      if (typeof window.showPage === 'function') window.showPage('subscription');
    }, true);
    pg.addEventListener('focusin', e => {
      if (conPlan() || !e.target.matches('input')) return;
      e.target.blur();
      if (typeof showToast === 'function') showToast('La biblioteca de ejercicios es para miembros. Elige tu plan para usarla.');
      if (typeof window.showPage === 'function') window.showPage('subscription');
    }, true);
  }
  window.ftEjercicios = { lista };
})();
