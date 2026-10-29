/* Panel · Noticias con plantillas (como las de "Alintec Actualidad"): al crear o editar una noticia el administrador elige una de las
   plantillas prehechas del periódico del Club (azul, turquesa o bicolor, o "Automática" para que se reparta sola) y escribe la fuente
   ("FisioTeck", "Revista X"...). Se guardan en la noticia como `plantilla` y `source`, y el Club (club-noticias.js) las usa para dibujar la hoja.
   Incluye una vista previa en vivo de la hoja. Depende del panel: openModal, saveModalItem, saveData, data, toast, esc. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const PL = [
    { id: '', n: 'Automática', d: 'Se reparte sola', a: '#E8EEF5', b: '#CBD7E4' },
    { id: 'azul', n: 'Azul', d: 'Clásica', a: '#0D5FA0', b: '#0A3E68' },
    { id: 'turquesa', n: 'Turquesa', d: 'Fresca', a: '#159E92', b: '#0E7C73' },
    { id: 'bicolor', n: 'Bicolor', d: 'Destacada', a: '#0D5FA0', b: '#159E92' }
  ];
  const h = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const estilo = document.createElement('style');
  estilo.textContent = `
  .nt-bloque { margin-top:8px; padding-top:14px; border-top:1px solid var(--border,#E2E8F0); }
  .nt-plantillas { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:10px; }
  .nt-pl { display:grid; gap:6px; padding:8px; border:2px solid var(--border,#E2E8F0); border-radius:12px; background:transparent; cursor:pointer; font:inherit; text-align:center; color:inherit; }
  .nt-pl.on { border-color:#0D5FA0; box-shadow:0 0 0 3px rgba(13,95,160,.15); }
  .nt-pl i { display:block; height:44px; border-radius:8px; }
  .nt-pl b { font-size:.78rem; } .nt-pl small { font-size:.66rem; opacity:.7; }
  .nt-prev { margin-top:12px; border-radius:14px; overflow:hidden; border:1px solid var(--border,#E2E8F0); background:#fff; color:#10223A; }
  .nt-prev header { padding:8px 14px; color:#fff; font-size:.72rem; letter-spacing:.08em; text-transform:uppercase; display:flex; justify-content:space-between; gap:8px; }
  .nt-prev div { padding:12px 14px; } .nt-prev h4 { margin:0 0 4px; font:700 1.05rem Georgia,'Times New Roman',serif; } .nt-prev p { margin:0; font-size:.78rem; opacity:.75; }
  @media (max-width:560px) { .nt-plantillas { grid-template-columns:repeat(2,minmax(0,1fr)); } }`;
  document.head.appendChild(estilo);

  function pie(item) {
    const actual = item && PL.some(p => p.id === item.plantilla) ? item.plantilla : '';
    return '<div class="nt-bloque"><div class="form-group"><label class="form-label">Fuente (aparece en la hoja del periódico)</label>' +
      '<input class="form-input" id="mSource" maxlength="60" value="' + h(item && item.source || '') + '" placeholder="Ej: FisioTeck, Revista de Fisioterapia"></div>' +
      '<div class="form-group"><label class="form-label">Plantilla del periódico</label><input type="hidden" id="mPlantilla" value="' + h(actual) + '">' +
      '<div class="nt-plantillas">' + PL.map(p => '<button type="button" class="nt-pl' + (p.id === actual ? ' on' : '') + '" data-pl="' + p.id + '"><i style="background:linear-gradient(135deg,' + p.a + ' 50%,' + p.b + ' 50%)"></i><b>' + p.n + '</b><small>' + p.d + '</small></button>').join('') + '</div>' +
      '<div class="nt-prev" id="ntPrev"></div></div></div>';
  }
  function vista() {
    const pl = PL.find(p => p.id === ($('mPlantilla') || {}).value) || PL[1], t = ($('mTitle') || {}).value || 'Titular de la noticia', f = ($('mSource') || {}).value || 'FisioTeck', c = ($('mNewsCat') || {}).value || 'Noticias';
    const p = $('ntPrev'); if (!p) return;
    p.innerHTML = '<header style="background:linear-gradient(90deg,' + pl.a + ',' + pl.b + ')"><span>FisioTeck Actualidad</span><span>' + h(c) + ' &mdash; ' + h(f) + '</span></header><div><h4>' + h(t) + '</h4><p>' + h(($('mExcerpt') || {}).value || 'Así se verá la hoja en el Club.') + '</p></div>';
  }
  function inyectar(item) {
    const cuerpo = $('modalBody'); if (!cuerpo || !$('mNewsCat') || $('mPlantilla')) return;
    cuerpo.insertAdjacentHTML('beforeend', pie(item));
    cuerpo.querySelectorAll('.nt-pl').forEach(b => b.onclick = () => { $('mPlantilla').value = b.dataset.pl; cuerpo.querySelectorAll('.nt-pl').forEach(x => x.classList.toggle('on', x === b)); vista(); });
    ['mTitle', 'mExcerpt', 'mSource', 'mNewsCat'].forEach(id => { const e = $(id); if (e) e.addEventListener('input', vista), e.addEventListener('change', vista); });
    vista();
  }

  const abrir = window.openModal;
  window.openModal = function (tipo, item) { const r = abrir.apply(this, arguments); if (tipo === 'news') inyectar(item); return r; };

  // Después de guardar la noticia se agregan la plantilla y la fuente
  const guardar = window.saveModalItem;
  window.saveModalItem = function () {
    const esNoticia = !!$('mNewsCat') && !!$('mPlantilla');
    const pl = esNoticia ? $('mPlantilla').value : '', fuente = esNoticia ? $('mSource').value.trim() : '', titulo = esNoticia ? $('mTitle').value : '';
    const idEdicion = typeof editingId !== 'undefined' ? editingId : null, antes = (window.data && data.news ? data.news.length : 0);
    const r = guardar.apply(this, arguments);
    if (esNoticia && titulo && window.data && data.news) {
      const n = idEdicion ? data.news.find(x => x.id === idEdicion) : (data.news.length > antes ? data.news[0] : null);
      if (n && n.title === titulo) {
        if (pl) n.plantilla = pl; else delete n.plantilla;
        if (fuente) n.source = fuente; else delete n.source;
        try { saveData(); } catch (_) { /* se guardó la noticia; la plantilla se aplicará en el próximo guardado */ }
        if (typeof renderNewsList === 'function') renderNewsList();
      }
    }
    return r;
  };
  window.ftNoticiasPlantillas = { PL };
})();
