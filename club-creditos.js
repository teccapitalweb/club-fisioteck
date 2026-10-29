/* Club FisioTeck — créditos y cupones (como Alintec y Zoorigen).
   Los créditos son para TODAS las cuentas (con o sin membresía): llegan por regalo del administrador o por un cupón con clave,
   y 100 créditos canjean un material descargable. Son independientes de los referidos y del XP.
   El servidor (/api/creditos/*, /api/materiales/:id/enlace) guarda el saldo y entrega el archivo.
   Depende de index.html: auth, certFetch, escCert, showToast, memberIsPaid, drivePdfUrl. */
(function () {
  'use strict';
  const C = { datos: null };
  window.ftCreditos = C;
  const $ = id => document.getElementById(id);

  function montar() {
    if ($('ftCreditos')) return;
    const pagina = $('page-pdfs'); if (!pagina) return;
    const barra = pagina.querySelector('.search-bar');
    const caja = document.createElement('div'); caja.id = 'ftCreditos';
    pagina.insertBefore(caja, barra || pagina.lastElementChild);
  }
  const showPageOriginal = window.showPage;
  window.showPage = function (page) {
    const r = showPageOriginal.apply(this, arguments);
    if (page === 'pdfs') C.cargar();
    return r;
  };

  C.cargar = async function () {
    montar();
    const caja = $('ftCreditos'); if (!caja || !auth.currentUser) return;
    try {
      C.datos = await certFetch('/api/creditos'); pintar();
    } catch (e) { caja.innerHTML = ''; /* sin servidor: el Material PDF funciona como antes */ }
  };

  function pintar() {
    const d = C.datos, caja = $('ftCreditos'); if (!d || !caja) return;
    caja.innerHTML =
      (d.aviso ? '<div class="cr-regalo"><div><strong>¡Recibiste ' + d.aviso.cantidad + ' créditos!</strong>' + (d.aviso.mensaje ? '<div style="font-size:.84rem;opacity:.9;margin-top:2px;">' + escCert(d.aviso.mensaje) + '</div>' : '') + '</div><button type="button" onclick="ftCreditos.visto()">Entendido</button></div>' : '') +
      '<div class="cr-panel"><div class="cr-fila"><div class="cr-saldo"><strong>' + d.saldo + '</strong><span>créditos</span></div>' +
      '<div class="cr-cupon"><div style="flex:1;min-width:0"><label for="crClave" style="display:block;font-weight:800;font-size:.9rem;margin-bottom:6px;">¿Tienes un código?</label><div style="display:flex;gap:8px"><input id="crClave" placeholder="Escribe tu código" maxlength="40" autocomplete="off" autocapitalize="characters" spellcheck="false"><button type="button" class="cr-btn" id="crBtnCupon" onclick="ftCreditos.cupon()">Canjear</button></div><small style="display:block;margin-top:6px;color:var(--text-muted)">Los códigos se comparten en nuestro canal de WhatsApp.</small></div></div></div>' +
      '<p class="cr-nota">Cada ' + d.costo + ' créditos abren un material descargable.' + (d.membresia ? ' Como miembro ya puedes abrir los materiales sin gastar créditos.' : ' Los créditos también sirven sin membresía.') + '</p>' +
      '</div>'; // los materiales se muestran una sola vez, en las tarjetas de club-material.js (aquí solo el saldo y el cupón)
    const inp = $('crClave'); if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') C.cupon(); });
  }

  C.visto = async function () { try { await certFetch('/api/creditos/aviso-visto', { method: 'POST', body: '{}' }); } catch (e) { /* se reintenta luego */ } if (C.datos) C.datos.aviso = null; pintar(); };

  C.cupon = async function () {
    const inp = $('crClave'), btn = $('crBtnCupon'); const clave = inp ? inp.value.trim() : '';
    if (!clave) { showToast('Escribe la clave del cupón.'); return; }
    btn.disabled = true;
    try {
      const r = await certFetch('/api/creditos/cupon', { method: 'POST', body: JSON.stringify({ clave }) });
      showToast('¡Cupón canjeado! +' + r.creditos + ' créditos');
      await C.cargar();
    } catch (e) { if (!(window.ftCupones && ftCupones.interpretar(e))) showToast(e.message); btn.disabled = false; }
  };

  C.canjear = async function (id) {
    const m = C.datos && C.datos.materiales.find(x => x.id === id); if (!m) return;
    if (C.datos.saldo < m.costo) { showToast('Te faltan ' + (m.costo - C.datos.saldo) + ' créditos. Canjea un cupón o pídelos en nuestro canal.'); return; }
    if (!confirm('¿Canjear ' + m.costo + ' créditos por "' + m.titulo + '"?')) return;
    try {
      await certFetch('/api/creditos/canjear', { method: 'POST', body: JSON.stringify({ materialId: id }) });
      showToast('¡Material desbloqueado!');
      await C.cargar(); C.abrir(id);
    } catch (e) { showToast(e.message); }
  };

  C.abrir = async function (id) {
    try {
      const r = await certFetch('/api/materiales/' + encodeURIComponent(id) + '/enlace');
      window.open(typeof drivePdfUrl === 'function' ? drivePdfUrl(r.url) : r.url, '_blank', 'noopener');
    } catch (e) { showToast(e.message); }
  };

  montar();
  auth.onAuthStateChanged(u => { if (!u) { C.datos = null; const c = $('ftCreditos'); if (c) c.innerHTML = ''; } });
})();
