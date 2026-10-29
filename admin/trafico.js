/* Panel FisioTeck — Métricas: monta las «Métricas de visitas» (admin/metricas-visitas.js, copia de las de Alintec Food) dentro de la sección Métricas.
   Debajo quedan las cifras de crecimiento y conversión del Club. Depende de index.html: showSection. */
(function () {
  'use strict';
  function montar() {
    const sec = document.getElementById('sec-metrics');
    if (!sec || document.getElementById('mx2-host')) return;
    const cab = sec.querySelector(':scope > .admin-page-header'); if (cab) cab.remove();
    const host = document.createElement('div'); host.id = 'mx2-host';
    sec.insertBefore(host, sec.firstChild);
    const sub = document.createElement('h2'); sub.className = 'tr-sub'; sub.textContent = 'Crecimiento y conversión del Club';
    host.insertAdjacentElement('afterend', sub);
  }
  const showOriginal = window.showSection;
  window.showSection = function (sec) {
    showOriginal.apply(this, arguments);
    if (sec === 'metrics') { montar(); if (window.ftMetricasVisitas) ftMetricasVisitas(document.getElementById('mx2-host')); }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
