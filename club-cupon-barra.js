/* Club FisioTeck — barra de cupón en la parte de arriba (como la de Alintec Food).
   Si la cuenta aún no tiene membresía y le llegó un cupón personal por correo, se muestra arriba de todo:
   "Tienes un cupón de $50 para tu primer mes", el código con botón Copiar, la cuenta regresiva y "Usar mi cupón".
   El cupón lo decide el servidor (GET /api/recordatorios/mi-cupon: código, monto, precio final y vencimiento); aquí solo se muestra.
   Desaparece solo al vencer o cuando la persona ya tiene membresía. El cupón se aplica solo al elegir el plan mensual.
   Depende de index.html: auth, certFetch, memberIsPaid, showPage, showToast. Para ver cómo queda: ftCuponBarra.demo() en la consola. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const pesos = n => '$' + Number(n || 0).toLocaleString('es-MX');
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const REGALO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5"/></svg>';
  let cupon = null, reloj = null;

  const cuenta = ms => {
    const s = Math.max(0, Math.floor(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(x).padStart(2, '0');
  };
  function quitar() {
    if (reloj) { clearInterval(reloj); reloj = null; }
    const b = $('ftCuponBarra'); if (b) b.remove();
    document.body.classList.remove('ftd-cupon');
  }
  function pintar() {
    const c = cupon; if (!c) return quitar();
    let b = $('ftCuponBarra');
    if (!b) {
      b = document.createElement('div'); b.id = 'ftCuponBarra'; b.setAttribute('role', 'region'); b.setAttribute('aria-label', 'Cupón de descuento');
      document.body.insertBefore(b, document.body.firstChild);
    }
    b.innerHTML = '<span class="ico">' + REGALO + '</span><div class="txt"><strong>Tienes un cupón de ' + pesos(c.monto) + ' para tu primer mes</strong><small>Pagas solo ' + pesos(c.precioFinal) + ' en el plan mensual</small></div>' +
      '<span class="cod"><code>' + esc(c.codigo) + '</code><button type="button" id="ftCuponCopiar">Copiar</button></span>' +
      '<span class="resta" title="Tiempo que le queda al cupón">Vence en <b id="ftCuponResta">' + cuenta(c.venceMs - Date.now()) + '</b></span>' +
      '<button type="button" class="usar" id="ftCuponUsar">Usar mi cupón <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>';
    document.body.classList.add('ftd-cupon');
    $('ftCuponCopiar').onclick = async () => {
      try { await navigator.clipboard.writeText(c.codigo); if (window.showToast) showToast('Código copiado'); } catch (_) { if (window.showToast) showToast('Selecciona y copia el código'); }
    };
    $('ftCuponUsar').onclick = () => { if (window.showPage) showPage('subscription'); };
    if (reloj) clearInterval(reloj);
    reloj = setInterval(() => {
      const r = c.venceMs - Date.now();
      if (r <= 0) { cupon = null; return quitar(); }
      const t = $('ftCuponResta'); if (t) t.textContent = cuenta(r);
    }, 1000);
  }
  function mostrar(c) {
    if (!c || !c.venceMs || c.venceMs <= Date.now() || !c.codigo) { cupon = null; return quitar(); }
    cupon = { codigo: String(c.codigo), monto: Number(c.monto) || 0, precioFinal: Number(c.precioFinal) || 0, venceMs: Number(c.venceMs) };
    pintar();
  }
  async function cargar() {
    if (typeof auth === 'undefined' || !auth.currentUser || typeof certFetch !== 'function') return quitar();
    if (typeof memberIsPaid !== 'undefined' && memberIsPaid) return quitar();
    try { mostrar(((await certFetch('/api/recordatorios/mi-cupon')) || {}).cupon); } catch (_) { /* sin cupón o sin conexión: no se muestra nada */ }
  }
  auth.onAuthStateChanged(u => { quitar(); cupon = null; if (u) setTimeout(cargar, 3000); });
  window.ftCuponBarra = {
    cargar, mostrar, quitar,
    demo() { mostrar({ codigo: 'FT50-DEMO12', monto: 50, precioFinal: 149, venceMs: Date.now() + 13 * 3600e3 + 58 * 60e3 + 4e3 }); }
  };
})();
