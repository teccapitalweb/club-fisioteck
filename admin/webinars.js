/* Panel FisioTeck — Webinar: tarjetas con el total, próximas y pasadas, y pestañas para filtrar la tabla (como Alintec).
   Se agrega sobre renderLive() sin cambiar cómo se guardan las sesiones. Depende de index.html: data.live, renderLive. */
(function () {
  'use strict';
  let filtro = 'todas';
  const e = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const cuando = s => { const t = new Date((s.date || '') + 'T' + (s.time || '23:59') + ':00').getTime(); return Number.isFinite(t) ? t : 0; };

  function pintar() {
    const sec = document.getElementById('sec-live'), tabla = document.getElementById('liveTable');
    if (!sec || !tabla) return;
    const lista = (typeof data !== 'undefined' && data.live) || [], ahora = Date.now();
    const prox = lista.filter(s => cuando(s) > ahora), pas = lista.filter(s => cuando(s) <= ahora);
    const con = lista.filter(s => s.recordingUrl).length;
    let k = document.getElementById('lvResumen');
    if (!k) {
      k = document.createElement('div'); k.id = 'lvResumen';
      sec.querySelector('.admin-card').insertAdjacentElement('beforebegin', k);
    }
    const kpi = (l, v, n, c) => '<div class="ap-kpi" style="--k:' + c + '"><div class="lbl">' + l + '</div><div class="val">' + v + '</div><div class="note">' + n + '</div></div>';
    const prim = prox.sort((a, b) => cuando(a) - cuando(b))[0];
    k.innerHTML = '<div class="ap-kpis">' + kpi('Programadas', lista.length, 'Total de sesiones', 'var(--accent)') + kpi('Próximas', prox.length, prim ? 'La siguiente: ' + e(prim.title).slice(0, 38) : 'Ninguna por ahora', 'var(--success)') + kpi('Pasadas', pas.length, 'Ya se realizaron', 'var(--blue)') + kpi('Con grabación', con, 'Con enlace de grabación', 'var(--warning)') + '</div>' +
      '<div class="lv-tabs" style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">' + [['todas', 'Todas'], ['proximas', 'Próximas'], ['pasadas', 'Pasadas']].map(t => '<button type="button" class="btn ' + (filtro === t[0] ? 'btn-p' : 'btn-o') + ' btn-sm" onclick="lvFiltro(\'' + t[0] + '\')">' + t[1] + '</button>').join('') + '</div>';
    [...tabla.querySelectorAll('tr')].forEach((tr, i) => {
      const s = lista[i]; if (!s) return;
      const futura = cuando(s) > ahora;
      tr.style.display = filtro === 'todas' || (filtro === 'proximas' && futura) || (filtro === 'pasadas' && !futura) ? '' : 'none';
      const celda = tr.children[2];
      if (celda && !celda.querySelector('.lv-badge')) celda.insertAdjacentHTML('beforeend', ' <span class="badge ' + (futura ? 'badge-success' : 'badge-info') + ' lv-badge">' + (futura ? 'Próxima' : 'Pasada') + '</span>');
    });
  }
  window.lvFiltro = f => { filtro = f; pintar(); };
  const original = window.renderLive;
  if (typeof original === 'function') window.renderLive = function () { const r = original.apply(this, arguments); try { pintar(); } catch (_) { /* sin tarjetas */ } return r; };
  setTimeout(() => { try { pintar(); } catch (_) { /* sin datos todavía */ } }, 1500);
})();
