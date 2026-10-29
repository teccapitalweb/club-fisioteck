/* Club FisioTeck — Suscripción como en Alintec: «Elige tu plan» (mensual o anual) y el formulario de pago de Stripe se dibuja
   dentro de la misma página, debajo de los planes. Al cambiar de plan se vuelve a dibujar. Solo para cuentas sin suscripción activa
   (la página decide si muestra #subPlanesElegir). Depende de index.html: auth, WEBHOOK_URL, STRIPE_PK, showPage.
   Crea la sesión de pago con POST /api/create-checkout { plan, mode: 'embedded' } (el servidor toma el correo de la sesión). */
(function () {
  'use strict';
  const API = () => (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://localhost:3000' : WEBHOOK_URL;
  const CLAVE = 'ft_plan_intent';
  let plan = 'anual', embebido = null, montando = 0, iniciado = false;
  try { const g = localStorage.getItem(CLAVE); if (g === 'mensual' || g === 'anual') plan = g; } catch (_) { /* sin almacenamiento */ }

  const estilo = document.createElement('style');
  estilo.textContent = `
  .ftsp-tit { margin:6px 0 14px; text-align:center; font:800 15px var(--font-display,inherit); letter-spacing:-.2px; }
  .ftsp-picker { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:14px; max-width:760px; margin:0 auto; }
  .ftsp-card { display:flex; justify-content:space-between; align-items:center; gap:12px; text-align:left; padding:18px; border-radius:14px; cursor:pointer; background:var(--surface); color:var(--text); border:1px solid var(--border-2); font:inherit; transition:all .15s ease; }
  .ftsp-card:hover { transform:translateY(-1px); border-color:var(--accent); }
  .ftsp-card.is-active { border-color:var(--accent); box-shadow:0 0 0 1px var(--accent); background:linear-gradient(135deg,var(--accent-ghost),var(--surface)),var(--surface); }
  .ftsp-name { font-size:14px; font-weight:700; letter-spacing:-.2px; } .ftsp-sub { margin-top:3px; font-size:11px; color:var(--text-muted); }
  .ftsp-der { text-align:right; } .ftsp-precio { font:800 22px/1 var(--font-display,inherit); color:var(--accent); letter-spacing:-.5px; }
  .ftsp-uni { margin-top:3px; font:600 10.5px 'JetBrains Mono',monospace; letter-spacing:.4px; text-transform:uppercase; color:var(--text-muted); }
  .ftsp-montaje { max-width:760px; margin:18px auto 0; padding:8px; min-height:420px; border-radius:16px; background:var(--surface); border:1px solid var(--border); }
  .ftsp-cargando { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:300px; gap:14px; color:var(--text-muted); font-size:13px; text-align:center; padding:0 20px; }
  .ftsp-spin { width:32px; height:32px; border-radius:50%; border:2px solid var(--border); border-top-color:var(--accent); animation:ftspGira .8s linear infinite; }
  @keyframes ftspGira { to { transform:rotate(360deg); } }
  .ftsp-error { padding:24px 20px; text-align:center; color:var(--text-light); font-size:13px; line-height:1.6; } .ftsp-error b { display:block; color:var(--danger); margin-bottom:6px; }
  .ftsp-error button { margin-top:14px; }`;
  document.head.appendChild(estilo);

  const $ = id => document.getElementById(id);
  const visible = () => { const s = $('subPlanesElegir'); return !!(s && s.style.display !== 'none' && $('page-subscription') && $('page-subscription').classList.contains('active')); };
  const marcar = () => document.querySelectorAll('#ftspPicker .ftsp-card').forEach(c => c.classList.toggle('is-active', c.dataset.plan === plan));
  function destruir() { if (embebido) { try { embebido.destroy(); } catch (_) { /* ya destruido */ } embebido = null; } }

  async function montar() {
    const caja = $('ftspMontaje'); if (!caja || !auth.currentUser) return;
    const mio = ++montando;
    destruir(); marcar();
    caja.innerHTML = '<div class="ftsp-cargando"><div class="ftsp-spin"></div><div>Cargando plan ' + plan + '…</div></div>';
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch(API() + '/api/create-checkout', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify({ plan, mode: 'embedded' }) });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(res.status === 401 ? 'Tu sesión venció. Vuelve a iniciar sesión.' : res.status === 429 ? 'Demasiados intentos. Espera un momento y vuelve a probar.' : (d && d.error) || ('Error ' + res.status));
      if (!d.clientSecret) throw new Error('No recibimos el formulario de pago.');
      if (mio !== montando || !visible()) return;
      if (!window.Stripe) {
        await new Promise((ok, mal) => { const s = document.createElement('script'); s.src = 'https://js.stripe.com/v3/'; s.onload = ok; s.onerror = () => mal(new Error('No se pudo cargar Stripe. Revisa tu conexión.')); document.head.appendChild(s); });
      }
      if (!window.__ftStripe) window.__ftStripe = window.Stripe(STRIPE_PK);
      if (mio !== montando || !visible()) return;
      caja.innerHTML = '';
      embebido = await window.__ftStripe.initEmbeddedCheckout({ clientSecret: d.clientSecret });
      if (mio !== montando || !visible()) { destruir(); return; }
      embebido.mount('#ftspMontaje');
    } catch (err) {
      console.error('Checkout error:', err);
      if (mio !== montando) return;
      const c = $('ftspMontaje');
      if (c) { c.innerHTML = '<div class="ftsp-error"><b>No pudimos cargar el pago</b><div>' + String((err && err.message) || 'Intenta de nuevo').replace(/[<>&]/g, '') + '</div><button type="button" class="btn-outline" id="ftspReintentar">Reintentar</button></div>'; const r = $('ftspReintentar'); if (r) r.onclick = montar; }
    }
  }

  function revisar() {
    if (visible()) { if (!iniciado) { iniciado = true; montar(); } }
    else { iniciado = false; montando++; destruir(); const c = $('ftspMontaje'); if (c) c.innerHTML = '<div class="ftsp-cargando"><div class="ftsp-spin"></div><div>Preparando tu plan…</div></div>'; }
  }
  document.addEventListener('click', e => {
    const c = e.target.closest && e.target.closest('#ftspPicker .ftsp-card'); if (!c) return;
    if (c.dataset.plan === plan && iniciado && (embebido || $('ftspMontaje').querySelector('iframe'))) return;
    iniciado = true;
    plan = c.dataset.plan; try { localStorage.setItem(CLAVE, plan); } catch (_) { /* sin almacenamiento */ }
    montar();
  });
  const paginaOriginal = window.showPage;
  window.showPage = function (page) { const r = paginaOriginal.apply(this, arguments); setTimeout(revisar, 350); setTimeout(revisar, 1400); return r; };
  // El perfil decide más tarde si se muestran los planes: se revisa también cuando cambia ese bloque
  const s = $('subPlanesElegir'); if (s) new MutationObserver(revisar).observe(s, { attributes: true, attributeFilter: ['style'] });
  marcar();
})();
