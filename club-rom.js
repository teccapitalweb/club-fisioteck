/* Club FisioTeck — Rangos de movimiento: de la tabla de valores normales a una herramienta de evaluación.
   Por cada movimiento: valor de referencia, campo para escribir los grados medidos, déficit en porcentaje y la técnica goniométrica (posición,
   eje, brazo fijo y brazo móvil). Las mediciones se pueden guardar en la ficha de un paciente (Pacientes).
   Los valores y la técnica viven en club-rom-datos.js (FT_ROM_TECNICA) con sus referencias; se aplican sobre ROM_DATA para que todo el Club use los mismos valores.
   Herramienta de apoyo: las referencias son valores generales y deben interpretarse con criterio clínico.
   Depende de index.html: ROM_DATA, showROM, memberIsPaid, showToast; opcional: club-pacientes.js (ftPacientes). */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const TEC = () => window.FT_ROM_TECNICA || {};
  const REFS = () => window.FT_ROM_REFERENCIAS || [];
  let abierta = '';

  // Aplica los valores verificados sobre ROM_DATA (una sola fuente de verdad para Rangos y Pacientes)
  function aplicarValores() {
    if (typeof ROM_DATA === 'undefined') return;
    Object.keys(TEC()).forEach(a => {
      const d = ROM_DATA[a]; if (!d) return;
      TEC()[a].forEach(t => { const mv = d.movements.find(x => x.m === t.m); if (mv && Number(t.ref) > 0) { mv.bar = Number(t.ref); mv.n = '0-' + Number(t.ref) + '°'; if (mv.max < mv.bar) mv.max = mv.bar; } });
      // La extensión completa de codo y rodilla es 0°: no tiene barra que medir (el déficit de extensión se anota aparte)
      d.movements = d.movements.filter(mv => !(TEC()[a].find(t => t.m === mv.m && Number(t.ref) === 0)));
    });
  }
  aplicarValores();

  const tecnica = (a, nombre) => (TEC()[a] || []).find(t => t.m === nombre) || null;
  const EXT0 = { codo: 'La extensión completa del codo es 0°. Si no llega a 0°, anota el déficit de extensión en las observaciones.', rodilla: 'La extensión completa de la rodilla es 0°. Si no llega a 0°, anota el déficit de extensión en las observaciones.' };
  const METODO = { cervical: 'Valores de AAOS. Mide con goniómetro o inclinómetro cervical.', lumbar: 'Valores de Norkin y White / AMA. La rotación es toracolumbar. Mide con inclinómetro doble o cinta (prueba de Schober), no solo con goniómetro.', torax: 'La columna torácica no tiene valores propios en AAOS ni en Norkin y White; estos son rangos de Magee. Mide con cinta o inclinómetros.' };

  function pintar() {
    const cont = $('romResult'), a = ($('romJoint') || {}).value; if (!cont || !a || typeof ROM_DATA === 'undefined' || !ROM_DATA[a]) return;
    const d = ROM_DATA[a], lados = ['', 'Derecho', 'Izquierdo'];
    cont.innerHTML = '<div class="rm"><div class="rm-cab"><div><b>' + esc(d.name) + '</b><small>Valores de referencia y medición del paciente</small></div><label>Lado<select id="rmLado">' + lados.map(l => '<option value="' + l + '">' + (l || 'No aplica') + '</option>').join('') + '</select></label></div>' +
      '<div class="rm-lista">' + d.movements.map((mv, i) => {
        const t = tecnica(a, mv.m), ref = mv.bar;
        return '<div class="rm-fila" data-i="' + i + '"><div class="rm-top"><span class="rm-n">' + esc(mv.m) + '</span><span class="rm-ref">Referencia ' + ref + '°</span></div>' +
          '<div class="rm-med"><label>Grados medidos<input type="number" class="rm-g" min="0" max="360" step="1" inputmode="numeric" placeholder="0" aria-label="Grados medidos de ' + esc(mv.m) + '"></label><div class="rm-barra"><i></i></div><span class="rm-def"></span></div>' +
          (t ? '<details class="rm-tec"><summary>Técnica goniométrica</summary><dl><dt>Posición</dt><dd>' + esc(t.posicion) + '</dd><dt>Eje</dt><dd>' + esc(t.eje) + '</dd><dt>Brazo fijo</dt><dd>' + esc(t.fijo) + '</dd><dt>Brazo móvil</dt><dd>' + esc(t.movil) + '</dd></dl></details>' : '') + '</div>';
      }).join('') + '</div>' +
      ((EXT0[a] || METODO[a]) ? '<p class="rm-nota rm-met">' + esc(EXT0[a] || METODO[a]) + '</p>' : '') + '<div class="rm-guardar"><button type="button" class="rm-cta" id="rmGuardar">Guardar mediciones en un paciente</button><div id="rmPac"></div></div>' +
      '<p class="rm-nota">Las referencias son valores generales y pueden variar con la edad, el sexo y la constitución; compara siempre con el lado contrario y con tu criterio clínico.</p>' +
      (REFS().length ? '<details class="rm-fuentes"><summary>Fuentes</summary><ul>' + REFS().map(r => '<li>' + esc(r.texto || r) + (r.url ? ' <a href="' + esc(r.url) + '" target="_blank" rel="noopener">enlace</a>' : '') + '</li>').join('') + '</ul></details>' : '<p class="rm-nota">Valores basados en la American Academy of Orthopaedic Surgeons (AAOS).</p>') + '</div>';
    cont.querySelectorAll('.rm-g').forEach(inp => inp.oninput = () => {
      const fila = inp.closest('.rm-fila'), mv = d.movements[Number(fila.dataset.i)], g = Number(inp.value), barra = fila.querySelector('.rm-barra i'), def = fila.querySelector('.rm-def');
      if (inp.value === '' || !Number.isFinite(g)) { barra.style.width = '0'; def.textContent = ''; def.className = 'rm-def'; return; }
      const pct = Math.min(100, Math.round(g / mv.bar * 100)), deficit = Math.max(0, Math.round((mv.bar - g) / mv.bar * 100));
      barra.style.width = pct + '%'; def.className = 'rm-def ' + (deficit === 0 ? 'ok' : deficit <= 20 ? 'leve' : 'alto');
      def.textContent = deficit === 0 ? 'Dentro o por encima de la referencia (' + g + '°)' : 'Déficit ' + deficit + ' % (' + g + '° de ' + mv.bar + '°)';
    });
    $('rmGuardar').onclick = guardar;
  }

  async function guardar() {
    const caja = $('rmPac'); if (caja.innerHTML) { caja.innerHTML = ''; return; }
    const a = $('romJoint').value, d = ROM_DATA[a];
    const llenas = [...document.querySelectorAll('.rm-fila')].map(f => ({ i: Number(f.dataset.i), v: f.querySelector('.rm-g').value })).filter(x => x.v !== '' && Number.isFinite(Number(x.v)) && Number(x.v) >= 0 && Number(x.v) <= 360);
    if (!llenas.length) { showToast('Escribe los grados de al menos un movimiento.'); return; }
    if (!window.ftPacientes || !ftPacientes.listar) { showToast('Pacientes no está disponible.'); return; }
    try {
      const l = await ftPacientes.listar();
      if (!l.avisoOk) { caja.innerHTML = '<p class="rm-nota">Antes abre <b>Pacientes</b> y acepta el aviso de privacidad.</p>'; return; }
      if (!l.pacientes.length) { caja.innerHTML = '<p class="rm-nota">Aún no tienes pacientes. Crea uno en <b>Pacientes</b>.</p>'; return; }
      caja.innerHTML = '<div class="rm-pac"><label>Paciente<select id="rmSel">' + l.pacientes.map(x => '<option value="' + esc(x.id) + '">' + esc(x.etiqueta || x.clave) + '</option>').join('') + '</select></label><button type="button" class="rm-cta" id="rmOk">Guardar ' + llenas.length + ' medición' + (llenas.length === 1 ? '' : 'es') + '</button></div>';
      $('rmOk').onclick = async () => {
        $('rmOk').disabled = true; const lado = $('rmLado').value, ahora = Date.now();
        try { await ftPacientes.guardarMediciones($('rmSel').value, llenas.map((x, k) => { const mv = d.movements[x.i]; return { f: ahora + k, art: a, artN: d.name, mov: mv.m, movN: mv.m, g: Math.round(Number(x.v)), ref: mv.bar, lado }; })); caja.innerHTML = ''; showToast('Mediciones guardadas en la ficha del paciente'); }
        catch (e) { $('rmOk').disabled = false; showToast(e && e.message ? e.message : 'No se pudo guardar.'); }
      };
    } catch (_) { showToast('No se pudo cargar tu lista de pacientes.'); }
  }

  const original = window.showROM;
  if (typeof original === 'function') window.showROM = function () { const r = original.apply(this, arguments); if (memberIsPaid || window.ftVistaAdmin) pintar(); return r; };
})();
