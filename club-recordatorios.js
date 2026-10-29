/* Club FisioTeck — recordatorios de pago por correo, lado de la persona (como Alintec y Zoorigen):
   · en las opciones de membresía muestra el código personal que le llegó por correo (se aplica solo al elegir el plan mensual),
   · en Mi perfil, el interruptor "Recibir recordatorios y promociones por correo" (solo para cuentas sin membresía).
   El servidor decide todo (/api/recordatorios/*). Depende de index.html: auth, certFetch, memberIsPaid, showToast, showPaywallOverlay, showPage. */
(function () {
  'use strict';
  const pesos = n => '$' + Number(n || 0).toLocaleString('es-MX');
  const $ = id => document.getElementById(id);

  // ---------- Código personal en las opciones de membresía ----------
  async function pintarCupon() {
    const prev = $('ftCuponPaywall'); if (prev) prev.remove();
    if (typeof auth === 'undefined' || !auth.currentUser || memberIsPaid) return;
    let c = null;
    try { c = (await certFetch('/api/recordatorios/mi-cupon')).cupon; } catch (_) { return; }
    if (!c || c.restanteMs <= 0) return;
    const sub = $('paywallOverlay') && $('paywallOverlay').querySelector('p');
    if (!sub) return;
    const vence = new Date(c.venceMs).toLocaleString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit', hour12: true });
    const caja = document.createElement('div');
    caja.id = 'ftCuponPaywall';
    caja.style.cssText = 'margin:0 auto 22px;max-width:440px;padding:16px 18px;border-radius:14px;border:2px dashed #4CA6DE;background:rgba(76,166,222,.12);text-align:center;color:#fff;';
    caja.innerHTML = '<div style="font-size:.7rem;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#4CA6DE;">Tu código personal</div>' +
      '<div style="font-size:1.5rem;font-weight:800;letter-spacing:2px;margin:6px 0;font-family:Consolas,monospace;"></div>' +
      '<div style="font-size:.9rem;">Tu primer mes del plan mensual: <b>' + pesos(c.precioFinal) + '</b> (en lugar de ' + pesos(c.precioMes) + ')</div>' +
      '<div style="font-size:.78rem;color:rgba(255,255,255,.65);margin-top:6px;">Se aplica solo al elegir <b>Mensual</b>. Vence el ' + vence + '.</div>';
    caja.children[1].textContent = c.codigo;
    sub.insertAdjacentElement('afterend', caja);
  }
  const mostrarOriginal = window.showPaywallOverlay;
  window.showPaywallOverlay = function () { const r = mostrarOriginal.apply(this, arguments); pintarCupon(); return r; };

  // ---------- Interruptor en Mi perfil ----------
  async function pintarPreferencia() {
    const prev = $('ftPrefPromos'); if (prev) prev.remove();
    const pagina = $('page-account');
    if (!pagina || typeof auth === 'undefined' || !auth.currentUser || memberIsPaid) return;
    let p;
    try { p = await certFetch('/api/recordatorios/preferencia'); } catch (_) { return; }
    const tarjeta = document.createElement('div');
    tarjeta.className = 'card'; tarjeta.id = 'ftPrefPromos'; tarjeta.style.marginTop = '24px';
    tarjeta.innerHTML = '<h3 style="font-size:1rem;font-weight:600;margin-bottom:10px;">Promociones por correo</h3>' +
      '<label style="display:flex;gap:12px;align-items:flex-start;cursor:pointer;"><input type="checkbox" id="ftPrefChk" style="margin-top:4px;width:18px;height:18px;"' + (p.recibe ? ' checked' : '') + (p.baja ? ' disabled' : '') + '>' +
      '<span style="font-size:.9rem;line-height:1.55;">Recibir recordatorios y promociones sobre la membresía (códigos de descuento para tu primer mes).' +
      (p.baja ? '<br><small style="color:var(--text-muted);">Te diste de baja desde un correo; no volverás a recibirlos.</small>' : '<br><small style="color:var(--text-muted);">Puedes cambiarlo cuando quieras. Tu cuenta y el Club no cambian.</small>') + '</span></label>';
    pagina.appendChild(tarjeta);
    const chk = $('ftPrefChk');
    chk.onchange = async () => {
      chk.disabled = true;
      try {
        const r = await certFetch('/api/recordatorios/preferencia', { method: 'POST', body: JSON.stringify({ recibe: chk.checked, origen: 'perfil' }) });
        chk.checked = r.recibe; showToast(r.recibe ? 'Recibirás recordatorios y promociones por correo' : 'Ya no recibirás promociones por correo');
      } catch (e) { chk.checked = !chk.checked; showToast(e.message); }
      chk.disabled = false;
    };
  }
  const paginaOriginal = window.showPage;
  window.showPage = function (page) {
    const r = paginaOriginal.apply(this, arguments);
    if (page === 'account') pintarPreferencia();
    return r;
  };
})();
