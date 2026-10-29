/* Panel · biblioteca de gráficas (SVG y HTML propios, sin librerías), inspirada en Zoorigen y Alintec.
   Línea con relleno, barras (agrupadas o apiladas), anillo con leyenda, barras horizontales, sparkline,
   mapa de calor y embudo. Todas se adaptan al ancho (viewBox), tienen tooltip al pasar o tocar y estado vacío.
   Los constructores devuelven HTML; el tooltip se activa solo con delegación de eventos. */
(function () {
  'use strict';
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = v => { const n = Number(v); return isFinite(n) && n > 0 ? n : 0; };
  const col = n => 'var(--zg-' + (((Math.round(n) || 1) - 1) % 8 + 1) + ')';
  const R = (n, d) => { const k = Math.pow(10, d || 0); return Math.round(n * k) / k; };

  function fmt(v, f) {
    v = Number(v); if (!isFinite(v)) return '—';
    if (f === 'mxn') return '$' + Math.round(v).toLocaleString('es-MX');
    if (f === 'pct') return Math.round(v) + ' %';
    if (f === 'dec') return (Math.round(v * 10) / 10).toLocaleString('es-MX');
    return Math.round(v).toLocaleString('es-MX');
  }
  function corto(v, f) {
    v = Number(v); const pre = f === 'mxn' ? '$' : '';
    if (f === 'pct') return Math.round(v) + '%';
    if (Math.abs(v) >= 1e6) return pre + R(v / 1e6, 1) + ' M';
    if (Math.abs(v) >= 1e4) return pre + Math.round(v / 1e3) + ' mil';
    return pre + (f === 'dec' ? R(v, 1) : Math.round(v)).toLocaleString('es-MX');
  }
  // Tope «redondo» y marcas del eje vertical
  function escala(max, entero) {
    let m = num(max) || 1, inter = 4, crudo = m / inter, pot = Math.pow(10, Math.floor(Math.log10(crudo))), paso = pot;
    for (const c of (entero !== false && pot < 10 ? [1, 2, 5, 10] : [1, 2, 2.5, 5, 10])) { paso = c * pot; if (paso * inter >= m) break; }
    if (entero !== false && paso < 1) paso = 1;
    const n = Math.max(1, Math.ceil(m / paso - 1e-9)), ticks = [];
    for (let k = 0; k <= n; k++) ticks.push(R(k * paso, 6));
    return { max: ticks[ticks.length - 1], ticks };
  }
  const vacio = msg => '<div class="zg-vacio">' + esc(msg || 'Aún no hay datos') + '</div>';
  const etiquetasVisibles = n => { if (n <= 8) return [...Array(n).keys()]; const paso = Math.ceil((n - 1) / 5), l = []; for (let i = 0; i < n; i += paso) l.push(i); if (l[l.length - 1] !== n - 1) { if (n - 1 - l[l.length - 1] < paso * 0.6) l.pop(); l.push(n - 1); } return l; };
  const tip = (titulo, filas) => esc(JSON.stringify({ t: titulo, f: filas }));
  const resumen = (titulo, etiquetas, series, f) => '<div class="zg-solo-lector">' + esc(titulo) + ': ' + etiquetas.map((e, i) => e + ' ' + series.map(s => fmt(s.valores[i], f)).join(' / ')).join('; ') + '</div>';

  const VB = { w: 360, h: 176, l: 38, r: 10, t: 12, b: 24 };
  function ejes(etiquetas, esc_, f) {
    const { w, h, l, r, t, b } = VB, ih = h - t - b;
    let g = '';
    esc_.ticks.forEach(tk => { const y = t + ih - tk / esc_.max * ih; g += '<line class="zg-grid" x1="' + l + '" x2="' + (w - r) + '" y1="' + y.toFixed(1) + '" y2="' + y.toFixed(1) + '"/><text x="' + (l - 6) + '" y="' + (y + 3).toFixed(1) + '" text-anchor="end">' + corto(tk, f) + '</text>'; });
    return g;
  }

  // ---------- Línea con relleno ----------
  function serie(o) {
    const et = o.etiquetas || [], ss = (o.series || []).filter(s => s.valores && s.valores.length);
    if (!et.length || !ss.length || !ss.some(s => s.valores.some(v => num(v)))) return vacio(o.vacio);
    const { w, h, l, r, t, b } = VB, iw = w - l - r, ih = h - t - b, e = escala(Math.max(...ss.map(s => Math.max(...s.valores.map(num)))), o.entero);
    const x = i => l + (et.length === 1 ? iw / 2 : i / (et.length - 1) * iw), y = v => t + ih - num(v) / e.max * ih;
    let g = ejes(et, e, o.formato), capas = '', hit = '';
    ss.forEach((s, k) => {
      const c = col(s.color || k + 1), pts = s.valores.map((v, i) => x(i).toFixed(1) + ',' + y(v).toFixed(1));
      if (o.area !== false) capas += '<path class="zg-area" fill="' + c + '" d="M' + x(0).toFixed(1) + ',' + (t + ih) + ' L' + pts.join(' L') + ' L' + x(et.length - 1).toFixed(1) + ',' + (t + ih) + ' Z"/>';
      capas += '<polyline class="zg-linea" stroke="' + c + '" points="' + pts.join(' ') + '"/>';
      if (et.length <= 40) s.valores.forEach((v, i) => { capas += '<circle class="zg-punto" r="3" fill="' + c + '" cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) + '"/>'; });
    });
    et.forEach((lab, i) => { const ancho = et.length === 1 ? iw : iw / (et.length - 1); hit += '<rect class="zg-hit" x="' + (x(i) - ancho / 2).toFixed(1) + '" y="' + t + '" width="' + ancho.toFixed(1) + '" height="' + ih + '" data-tip="' + tip(lab, ss.map((s, k) => [col(s.color || k + 1), s.nombre || '', fmt(s.valores[i], o.formato)])) + '"/>'; });
    const xl = etiquetasVisibles(et.length).map(i => '<text x="' + x(i).toFixed(1) + '" y="' + (h - 7) + '" text-anchor="middle">' + esc(et[i]) + '</text>').join('');
    return '<figure class="zg"><svg class="zg-svg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(o.titulo || 'Gráfica de líneas') + '">' + g + capas + xl + hit + '</svg>' + leyenda(ss) + resumen(o.titulo || 'Gráfica', et, ss, o.formato) + '</figure>';
  }
  const leyenda = ss => ss.length > 1 ? '<div class="zg-leyenda">' + ss.map((s, k) => '<span><i style="background:' + col(s.color || k + 1) + '"></i>' + esc(s.nombre) + '</span>').join('') + '</div>' : '';

  // ---------- Barras (agrupadas o apiladas) ----------
  function barras(o) {
    const et = o.etiquetas || [], ss = (o.series || []).filter(s => s.valores);
    if (!et.length || !ss.length || !ss.some(s => s.valores.some(v => num(v)))) return vacio(o.vacio);
    const { w, h, l, r, t, b } = VB, iw = w - l - r, ih = h - t - b, n = et.length, apil = !!o.apilado;
    const tot = i => ss.reduce((a, s) => a + num(s.valores[i]), 0);
    const e = escala(apil ? Math.max(...et.map((_, i) => tot(i))) : Math.max(...ss.map(s => Math.max(...s.valores.map(num)))), o.entero);
    const banda = iw / n, gap = Math.min(10, banda * 0.28), ancho = banda - gap, sub = apil ? ancho : ancho / ss.length;
    let g = ejes(et, e, o.formato), cuerpo = '';
    et.forEach((lab, i) => {
      let acc = 0;
      ss.forEach((s, k) => {
        const v = num(s.valores[i]), hh = v / e.max * ih, c = col(s.color || k + 1);
        const bx = l + i * banda + gap / 2 + (apil ? 0 : k * sub), by = apil ? t + ih - (acc + v) / e.max * ih : t + ih - hh;
        if (v > 0) cuerpo += '<rect class="zg-barra" x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + Math.max(1, sub - (apil ? 0 : 1)).toFixed(1) + '" height="' + Math.max(1, hh).toFixed(1) + '" rx="' + (apil ? 2 : 3) + '" fill="' + c + '"/>';
        acc += v;
      });
      if (!apil && ss.length === 1 && n <= 12 && num(ss[0].valores[i])) cuerpo += '<text class="zg-v" x="' + (l + i * banda + banda / 2).toFixed(1) + '" y="' + (t + ih - num(ss[0].valores[i]) / e.max * ih - 4).toFixed(1) + '" text-anchor="middle">' + corto(ss[0].valores[i], o.formato) + '</text>';
      cuerpo += '<rect class="zg-hit" x="' + (l + i * banda).toFixed(1) + '" y="' + t + '" width="' + banda.toFixed(1) + '" height="' + ih + '" data-tip="' + tip(lab, ss.map((s, k) => [col(s.color || k + 1), s.nombre || '', fmt(s.valores[i], o.formato)])) + '"/>';
    });
    const xl = etiquetasVisibles(n).map(i => '<text x="' + (l + i * banda + banda / 2).toFixed(1) + '" y="' + (h - 7) + '" text-anchor="middle">' + esc(et[i]) + '</text>').join('');
    return '<figure class="zg"><svg class="zg-svg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(o.titulo || 'Gráfica de barras') + '">' + g + cuerpo + xl + '</svg>' + leyenda(ss) + resumen(o.titulo || 'Gráfica', et, ss, o.formato) + '</figure>';
  }

  // ---------- Anillo ----------
  function anillo(o) {
    const items = (o.items || []).map((it, k) => ({ nombre: it.nombre, valor: num(it.valor), color: col(it.color || k + 1) })), total = items.reduce((a, i) => a + i.valor, 0);
    if (!total) return vacio(o.vacio);
    const Rd = 48, C = 2 * Math.PI * Rd; let off = 0, arcos = '';
    items.forEach(it => { if (!it.valor) return; const len = it.valor / total * C; arcos += '<circle class="zg-arco" cx="70" cy="70" r="' + Rd + '" fill="none" stroke="' + it.color + '" stroke-width="18" stroke-dasharray="' + len.toFixed(2) + ' ' + (C - len).toFixed(2) + '" stroke-dashoffset="' + (-off).toFixed(2) + '" transform="rotate(-90 70 70)" data-tip="' + tip(it.nombre, [[it.color, 'Total', fmt(it.valor, o.formato) + ' · ' + Math.round(it.valor / total * 100) + ' %']]) + '"/>'; off += len; });
    const centro = o.centro || { valor: fmt(total, o.formato), texto: o.etiquetaTotal || 'total' };
    return '<figure class="zg zg-anillo"><svg viewBox="0 0 140 140" role="img" aria-label="' + esc(o.titulo || 'Gráfica de anillo') + '"><circle cx="70" cy="70" r="' + Rd + '" fill="none" stroke="var(--border)" stroke-width="18"/>' + arcos +
      '<text x="70" y="69" text-anchor="middle" style="font-size:20px;font-weight:800;fill:var(--text);font-family:var(--font-display)">' + esc(centro.valor) + '</text><text x="70" y="84" text-anchor="middle" style="font-size:9px">' + esc(centro.texto) + '</text></svg>' +
      '<div class="zg-lista">' + items.map(i => '<div class="zg-fila"><i style="background:' + i.color + '"></i>' + esc(i.nombre) + '<b>' + fmt(i.valor, o.formato) + '</b><em>' + Math.round(i.valor / total * 100) + '%</em></div>').join('') + '</div></figure>';
  }

  // ---------- Barras horizontales ----------
  function barrasH(o) {
    const items = (o.items || []).filter(i => i && i.nombre != null);
    if (!items.length) return vacio(o.vacio);
    const max = Math.max(1, ...items.map(i => num(i.valor)));
    return '<figure class="zg">' + items.map((i, k) => '<div class="zg-h" data-tip="' + tip(i.nombre, [[col(i.color || o.color || 1), 'Total', fmt(i.valor, o.formato)]]) + '"><span class="t" title="' + esc(i.nombre) + '">' + esc(i.nombre) + '</span><span class="b"><i style="width:' + Math.max(num(i.valor) ? 2 : 0, num(i.valor) / max * 100) + '%;background:' + col(i.color || o.color || 1) + '"></i></span><span class="n">' + fmt(i.valor, o.formato) + '</span></div>').join('') + '</figure>';
  }

  // ---------- Sparkline ----------
  function sparkline(valores, o) {
    const v = (valores || []).map(num); if (v.length < 2 || !v.some(Boolean)) return '';
    const max = Math.max(...v), W = 120, H = 34, p = v.map((n, i) => (i / (v.length - 1) * W).toFixed(1) + ',' + (H - 3 - n / max * (H - 8)).toFixed(1));
    const c = col((o && o.color) || 1);
    return '<svg class="zg-spark" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" aria-hidden="true"><polygon points="0,' + H + ' ' + p.join(' ') + ' ' + W + ',' + H + '" fill="' + c + '" opacity=".14"/><polyline stroke="' + c + '" points="' + p.join(' ') + '"/></svg>';
  }

  // ---------- Mapa de calor ----------
  function mapaCalor(o) {
    const filas = o.filas || [], cols = o.columnas || [], m = o.valores || [];
    const max = Math.max(0, ...m.map(f => Math.max(0, ...f.map(num))));
    if (!max) return vacio(o.vacio);
    let h = '<figure class="zg"><div class="zg-calor" style="grid-template-columns:34px repeat(' + cols.length + ',minmax(0,1fr))"><span></span>' + cols.map((c, i) => '<span class="col">' + (o.etiquetaCol ? o.etiquetaCol(c, i) : esc(c)) + '</span>').join('');
    filas.forEach((f, i) => { h += '<span class="fila">' + esc(f) + '</span>'; cols.forEach((c, j) => { const v = num(m[i] && m[i][j]); h += '<span class="c" style="--zg-c:' + (v ? 'color-mix(in srgb, var(--zg-1) ' + Math.round(18 + v / max * 82) + '%, transparent)' : 'var(--surface-2)') + '" data-tip="' + tip(f + ' · ' + c, [['var(--zg-1)', o.unidad || 'Total', fmt(v)]]) + '"></span>'; }); });
    return h + '</div></figure>';
  }

  // ---------- Embudo ----------
  function embudo(o) {
    const et = (o.etapas || []).map((e, k) => ({ nombre: e.nombre, valor: num(e.valor), color: col(e.color || k + 1) }));
    if (!et.length || !et[0].valor) return vacio(o.vacio);
    return '<figure class="zg zg-embudo">' + et.map((e, i) => {
      const ancho = Math.max(24, e.valor / et[0].valor * 100), previo = i ? et[i - 1].valor : null;
      return '<div class="zg-paso" data-tip="' + tip(e.nombre, [[e.color, 'Personas', fmt(e.valor)]]) + '"><div class="barra" style="width:' + ancho.toFixed(1) + '%;background:' + e.color + '"><span>' + esc(e.nombre) + '</span><b>' + fmt(e.valor) + '</b></div>' + (previo ? '<div class="conv">' + (previo ? Math.round(e.valor / previo * 100) : 0) + ' % de la etapa anterior · ' + Math.round(e.valor / et[0].valor * 100) + ' % del total</div>' : '') + '</div>';
    }).join('') + '</figure>';
  }

  // ---------- Tooltip (delegación de eventos) ----------
  let caja = null;
  function mostrar(el, ev) {
    let d; try { d = JSON.parse(el.getAttribute('data-tip')); } catch (e) { return; }
    if (!caja) { caja = document.createElement('div'); caja.className = 'zg-tip'; caja.setAttribute('role', 'tooltip'); document.body.appendChild(caja); }
    caja.innerHTML = '<b>' + esc(d.t) + '</b>' + (d.f || []).map(f => '<span><i style="background:' + f[0] + '"></i>' + (f[1] ? esc(f[1]) + ': ' : '') + '<strong>' + esc(f[2]) + '</strong></span>').join('');
    const p = ev.touches && ev.touches[0] ? ev.touches[0] : ev, bw = caja.offsetWidth, bh = caja.offsetHeight;
    caja.style.left = Math.min(Math.max(8, p.clientX + 14), window.innerWidth - bw - 8) + 'px';
    caja.style.top = Math.max(8, p.clientY - bh - 12 < 8 ? p.clientY + 18 : p.clientY - bh - 12) + 'px';
    caja.classList.add('on');
  }
  const ocultar = () => { if (caja) caja.classList.remove('on'); };
  document.addEventListener('mousemove', ev => { const el = ev.target.closest && ev.target.closest('[data-tip]'); if (el) mostrar(el, ev); else ocultar(); });
  document.addEventListener('touchstart', ev => { const el = ev.target.closest && ev.target.closest('[data-tip]'); if (el) mostrar(el, ev); else ocultar(); }, { passive: true });
  document.addEventListener('scroll', ocultar, true);

  window.ZG = { serie, barras, anillo, barrasH, sparkline, mapaCalor, embudo, vacio, fmt };

  // ---------- Compatibilidad: las funciones antiguas del panel usan la biblioteca nueva ----------
  window.barChart = (vals, labels, alt, f) => barras({ etiquetas: labels, series: [{ nombre: 'Total', valores: vals, color: alt ? 2 : 1 }], formato: /\$/.test(String(f && f(1234))) ? 'mxn' : 'num' });
  window.donut = items => anillo({ items: (items || []).map((i, k) => ({ nombre: i.t, valor: i.v, color: k + 1 })), etiquetaTotal: 'total' });
  window.hbars = (items, texto) => barrasH({ items: (items || []).map(i => ({ nombre: i.t, valor: i.v })), vacio: texto });
})();
