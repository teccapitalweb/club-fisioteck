/* Club FisioTeck — Pantalla de inicio de las herramientas: sin nada elegido, la Calculadora, Rangos de movimiento y el Atlas muestran una guía
   con atajos (zona, patología, articulación) en lugar de un espacio vacío. Se oculta en cuanto la persona elige algo.
   Depende de index.html: REHAB_DATA, updateRehabPathologies, showRehabPlan, showROM, showMuscle (se envuelven; las funciones originales siguen igual). */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const chips = (l, attr) => '<div class="vi-chips">' + l.map(([v, t]) => '<button type="button" ' + attr + '="' + esc(v) + '">' + esc(t) + '</button>').join('') + '</div>';
  const panel = (titulo, texto, cuerpo) => '<div class="vi-panel"><h3>' + esc(titulo) + '</h3><p>' + esc(texto) + '</p>' + cuerpo + '</div>';

  // ---------- Calculadora de rehabilitación ----------
  function pintarCalc() {
    const sel = $('rehabZone'), res = $('rehabResult'); if (!sel || !res) return;
    let caja = $('viCalc'); if (!caja) { caja = document.createElement('div'); caja.id = 'viCalc'; res.insertAdjacentElement('beforebegin', caja); }
    const zona = sel.value, pat = ($('rehabPathology') || {}).value;
    if (pat) { caja.hidden = true; return; }
    caja.hidden = false;
    if (!zona) {
      const zonas = [...sel.options].filter(o => o.value).map(o => [o.value, o.textContent]);
      caja.innerHTML = panel('Empieza por la zona del cuerpo', 'Elige la zona y verás las patologías más frecuentes con su plan de fases, ejercicios y criterios para avanzar.', chips(zonas, 'data-z'));
      caja.querySelectorAll('[data-z]').forEach(b => b.onclick = () => { sel.value = b.dataset.z; window.updateRehabPathologies(); });
    } else {
      const nombres = Object.keys((typeof REHAB_DATA !== 'undefined' && REHAB_DATA[zona]) || {});
      caja.innerHTML = panel('Ahora elige la patología', 'Toca una para ver el plan sugerido. Puedes cambiar la severidad arriba y personalizar los ejercicios.', chips(nombres.map(n => [n, n]), 'data-p') + '<button type="button" class="vi-volver" id="viOtraZona">Elegir otra zona</button>');
      caja.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { $('rehabPathology').value = b.dataset.p; window.showRehabPlan(); });
      $('viOtraZona').onclick = () => { sel.value = ''; window.updateRehabPathologies(); };
    }
  }
  const origZona = window.updateRehabPathologies, origPlan = window.showRehabPlan;
  if (typeof origZona === 'function') window.updateRehabPathologies = function () { const r = origZona.apply(this, arguments); pintarCalc(); return r; };
  if (typeof origPlan === 'function') window.showRehabPlan = function () { const r = origPlan.apply(this, arguments); pintarCalc(); return r; };

  // ---------- Rangos de movimiento ----------
  function pintarRom() {
    const sel = $('romJoint'), res = $('romResult'); if (!sel || !res || sel.value) return;
    const art = [...sel.options].filter(o => o.value).map(o => [o.value, o.textContent]);
    res.innerHTML = panel('Elige una articulación', 'Verás los rangos de referencia de cada movimiento, un campo para anotar los grados medidos y la técnica goniométrica.', chips(art, 'data-a'));
    res.querySelectorAll('[data-a]').forEach(b => b.onclick = () => { sel.value = b.dataset.a; window.showROM(); });
  }
  const origRom = window.showROM;
  if (typeof origRom === 'function') window.showROM = function () { const r = origRom.apply(this, arguments); pintarRom(); return r; };

  // ---------- Atlas muscular ----------
  const ZONAS_ATLAS = [['head', 'Cabeza y cuello'], ['shoulders', 'Hombros'], ['chest', 'Pecho'], ['arms', 'Brazos'], ['core', 'Abdomen'], ['back', 'Espalda'], ['hip', 'Cadera'], ['thigh', 'Muslo'], ['knee', 'Rodilla'], ['leg', 'Pierna'], ['foot', 'Pie']];
  function pintarAtlas() {
    const info = $('atlasInfo'); if (!info || !/Selecciona una zona del cuerpo/.test(info.textContent) || info.querySelector('.vi-panel')) return;
    info.innerHTML = panel('Elige una zona del cuerpo', 'Toca el esquema o un atajo para ver los músculos de la zona. Cada músculo tiene su ficha con origen, inserción, acción, inervación y ejercicios. También puedes buscar por nombre arriba.', chips(ZONAS_ATLAS, 'data-m'));
    info.querySelectorAll('[data-m]').forEach(b => b.onclick = () => window.showMuscle(b.dataset.m));
  }

  function iniciar() { pintarCalc(); pintarRom(); pintarAtlas(); }
  iniciar();
  // las páginas pueden armarse después (carga diferida): se reintenta al cambiar de sección
  const origPage = window.showPage;
  if (typeof origPage === 'function') window.showPage = function () { const r = origPage.apply(this, arguments); setTimeout(iniciar, 0); return r; };
})();
