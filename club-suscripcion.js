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

  // ───────── Diseño de la página como la de Alintec: encabezado, tarjeta del plan, método de pago, cancelar e historial ─────────
  const estiloPagina = document.createElement('style');
  estiloPagina.textContent = `
  #page-subscription.ftsub-on > :not(#ftsubRaiz):not(#subPlanesElegir) { display:none !important; }
  .ftsub-icono { width:64px; height:64px; border-radius:50%; margin:0 auto 18px; display:grid; place-items:center; background:var(--accent-ghost); color:var(--accent); } .ftsub-icono svg { width:28px; height:28px; }
  .ftsub-vacio { background:var(--surface); border:1px solid var(--border-2); border-radius:18px; padding:34px 28px; text-align:center; margin-bottom:6px; }
  .ftsub-vacio h3 { margin:0 0 8px; font:800 20px var(--font-display,inherit); letter-spacing:-.4px; } .ftsub-vacio p { margin:0 auto; max-width:440px; font-size:13.5px; line-height:1.6; color:var(--text-light); }
  .ftsub-plan { position:relative; overflow:hidden; margin-bottom:14px; padding:26px 28px; border-radius:20px; color:#fff; background:linear-gradient(135deg,#0D5FA0 0%,#0A3F73 100%); box-shadow:0 14px 40px rgba(13,95,160,.28); }
  .ftsub-plan::before { content:""; position:absolute; inset:0; pointer-events:none; background-image:linear-gradient(to right,rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.08) 1px,transparent 1px); background-size:36px 36px; -webkit-mask-image:radial-gradient(ellipse at top right,#000 0%,transparent 75%); mask-image:radial-gradient(ellipse at top right,#000 0%,transparent 75%); }
  .ftsub-plan-cab { position:relative; z-index:1; display:flex; justify-content:space-between; align-items:flex-start; gap:14px; }
  .ftsub-plan-lbl { font:600 10.5px 'JetBrains Mono',monospace; letter-spacing:1.5px; text-transform:uppercase; opacity:.9; }
  .ftsub-plan-nombre { margin:8px 0 0; font-size:30px; font-weight:600; letter-spacing:-.8px; line-height:1.1; }
  .ftsub-plan-precio { text-align:right; } .ftsub-plan-precio b { display:block; font:700 34px/1 'JetBrains Mono',monospace; letter-spacing:-1px; } .ftsub-plan-precio span { display:block; margin-top:4px; font:500 11px 'JetBrains Mono',monospace; letter-spacing:1px; text-transform:uppercase; opacity:.85; }
  .ftsub-feats { position:relative; z-index:1; display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:8px; margin-top:18px; }
  .ftsub-feat { display:flex; gap:7px; align-items:center; font-size:12px; font-weight:500; } .ftsub-feat svg { width:13px; height:13px; flex:none; opacity:.9; }
  .ftsub-pie { position:relative; z-index:1; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:18px; padding-top:14px; border-top:1px solid rgba(255,255,255,.18); font:11.5px 'JetBrains Mono',monospace; } .ftsub-pie strong { font-weight:600; }
  .ftsub-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:14px; }
  .ftsub-caja { padding:22px; border-radius:22px; background:var(--surface); border:1px solid var(--border); }
  .ftsub-caja-tit { padding-bottom:14px; margin-bottom:12px; border-bottom:1px solid var(--border); font:700 9.5px 'JetBrains Mono',monospace; letter-spacing:1.45px; text-transform:uppercase; color:var(--text-muted); }
  .ftsub-caja p { margin:0 0 14px; font-size:13px; line-height:1.55; color:var(--text-light); } .ftsub-caja p strong { color:var(--text); }
  .ftsub-btn { width:100%; display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:12px 14px; border-radius:12px; cursor:pointer; font:700 13px inherit; background:var(--surface); color:var(--text); border:1px solid var(--border-2); } .ftsub-btn:hover { border-color:var(--accent); color:var(--accent); } .ftsub-btn svg { width:16px; height:16px; }
  .ftsub-btn.peligro { color:#EF4444; border-color:rgba(239,68,68,.3); } .ftsub-btn.peligro:hover { background:rgba(239,68,68,.06); color:#EF4444; border-color:#EF4444; }
  .ftsub-historial { margin-top:18px; } .ftsub-historial-tit { display:flex; align-items:center; gap:10px; margin:0 0 12px; font:800 20px var(--font-display,inherit); letter-spacing:-.55px; } .ftsub-historial-tit span { padding:4px 9px; border-radius:100px; background:var(--surface-2); border:1px solid var(--border); font:700 9px 'JetBrains Mono',monospace; letter-spacing:.8px; text-transform:uppercase; color:var(--text-muted); }
  .ftsub-pagos { display:flex; flex-direction:column; gap:6px; }
  .ftsub-pago { display:flex; align-items:center; gap:14px; padding:12px 14px; border-radius:14px; background:var(--surface-2); border:1px solid var(--border); }
  .ftsub-pago-ic { width:36px; height:36px; border-radius:10px; display:grid; place-items:center; flex:none; background:rgba(15,157,108,.12); color:var(--success); } .ftsub-pago-ic svg { width:16px; height:16px; }
  .ftsub-pago-cuerpo { flex:1; min-width:0; } .ftsub-pago-cuerpo b { display:block; font-size:13px; font-weight:600; } .ftsub-pago-cuerpo small { display:block; margin-top:2px; font:500 10.5px 'JetBrains Mono',monospace; color:var(--text-muted); }
  .ftsub-pago-monto { font:700 14px 'JetBrains Mono',monospace; flex:none; }
  .ftsub-pago-estado { flex:none; padding:3px 9px; border-radius:100px; font:700 9.5px 'JetBrains Mono',monospace; letter-spacing:1.2px; text-transform:uppercase; background:rgba(15,157,108,.14); color:var(--success); border:1px solid rgba(15,157,108,.3); }
  .ftsub-modal { position:fixed; inset:0; z-index:10095; display:flex; align-items:center; justify-content:center; padding:20px; background:rgba(8,14,24,.6); backdrop-filter:blur(6px); }
  .ftsub-modal-caja { position:relative; width:min(440px,100%); padding:30px 26px 24px; border-radius:24px; text-align:center; background:var(--surface); color:var(--text); border:1px solid var(--border-2); box-shadow:var(--shadow-lg); }
  .ftsub-modal-caja h2 { margin:14px 0 8px; font-size:1.25rem; font-weight:800; } .ftsub-modal-caja p { margin:0 0 14px; font-size:.9rem; line-height:1.6; color:var(--text-light); } .ftsub-modal-caja p strong { color:var(--text); }
  .ftsub-modal-avisos { display:grid; gap:8px; margin:0 0 18px; text-align:left; font-size:.82rem; color:var(--text-light); } .ftsub-modal-avisos div { padding:9px 12px; border-radius:10px; background:var(--surface-2); }
  .ftsub-modal-bot { display:grid; gap:10px; }
  @media(max-width:640px){ .ftsub-plan { padding:22px 20px; } .ftsub-plan-cab { flex-direction:column; } .ftsub-plan-precio { text-align:left; } .ftsub-pago { flex-wrap:wrap; } }`;
  document.head.appendChild(estiloPagina);

  const SVG = {
    candado: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
    tarjeta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    estrella: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l3 7h7l-5.5 5 3 7-7.5-4-7.5 4 3-7L2 9h7z"/></svg>'
  };
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fechaLarga = d => d ? d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }) : '—';
  const hero = (ey, sub) => (window.ftdHero ? ftdHero(ey, 'Tu <em>suscripción.</em>', sub, 'suscripcion') : '<h1>Tu suscripción</h1><p>' + esc(sub) + '</p>');
  const pesos = n => '$' + Number(n).toLocaleString('es-MX');

  async function pintar() {
    const pag = $('page-subscription'), u = auth.currentUser; if (!pag || !u) return;
    let raiz = $('ftsubRaiz');
    if (!raiz) { raiz = document.createElement('div'); raiz.id = 'ftsubRaiz'; pag.insertBefore(raiz, pag.firstChild); }
    pag.classList.add('ftsub-on');
    if (window.ftVistaAdmin) {
      raiz.innerHTML = hero('Cuenta administrativa', 'Tu cuenta tiene acceso administrativo a FisioTeck. No requiere suscripción de pago.') +
        '<div class="ftsub-vacio"><div class="ftsub-icono" style="background:rgba(15,157,108,.14);color:var(--success)">' + SVG.estrella + '</div><h3>Cuenta de administrador</h3><p>Accedes a todo el contenido sin necesidad de pagar. Puedes ver el panel desde la perspectiva de un miembro normal.</p></div>';
      return;
    }
    let m = {};
    try { const s = await db.collection('members').doc(u.uid).get(); m = s.exists ? (s.data() || {}) : {}; } catch (_) { /* sin datos */ }
    const venc = typeof calcularFechaVencimiento === 'function' ? calcularFechaVencimiento(m) : null, st = m.status || '';
    const vencido = !!(venc && new Date() > venc), cancelada = st === 'cancelled';
    const activa = !vencido && (st === 'active' || st === 'paid' || cancelada);
    const pagoPendiente = m.pagoPendiente === true;
    if (!activa) {
      // «Pago no confirmado» es distinto de «venció»: la tarjeta falló (como en Zoorigen)
      raiz.innerHTML = hero('Activa tu acceso', 'Estás a un click de acceder a todo el contenido de FisioTeck. Elige tu plan y completa tu suscripción.') +
        '<div class="ftsub-vacio"><div class="ftsub-icono">' + SVG.candado + '</div><h3>' + (pagoPendiente ? 'Tu pago no se pudo confirmar' : vencido ? 'Tu suscripción venció' : 'Tu suscripción no está activa') + '</h3><p>' +
        (pagoPendiente ? 'El último cobro de tu membresía fue rechazado. Actualiza tu tarjeta en «Gestionar en Stripe» o vuelve a suscribirte abajo; tu progreso, tus logros y tus certificados siguen guardados. '
          : vencido ? 'Renueva para recuperar tu acceso: tu progreso, tus logros y tus certificados siguen guardados. ' : '') + 'Selecciona tu plan preferido a continuación. El pago se procesa de forma segura por Stripe y la activación es inmediata.</p>' +
        (pagoPendiente && m.stripeCustomerId ? '<button type="button" class="ftsub-btn" id="ftsubPortal" style="max-width:300px;margin:16px auto 0">' + SVG.tarjeta + '<span>Gestionar en Stripe</span></button>' : '') + '</div>';
      const p0 = $('ftsubPortal'); if (p0) p0.onclick = abrirPortal;
      return;
    }
    const anual = (m.plan || 'mensual') === 'anual';
    let monto = null; (Array.isArray(m.payments) ? m.payments : []).forEach(p => { if (p && typeof p.amount === 'number' && p.amount > 0) monto = p.amount; });
    if (!monto) monto = anual ? (window.__PRECIO_ANO || 1999) : (window.__PRECIO_MES || 199);
    const dias = venc ? Math.max(0, Math.ceil((venc - Date.now()) / 864e5)) : '—';
    const feats = ['Todos los cursos con certificado', 'Clases en vivo y grabaciones', 'Certificados con folio y QR', 'Retos, XP y libros', 'Foro y Directorio VIP', 'PDF y material descargable'];
    const pagos = (Array.isArray(m.payments) ? m.payments.slice() : []).filter(Boolean).reverse();
    raiz.innerHTML = hero('Tu plan', 'Detalles de tu membresía, historial de pagos y próxima renovación.') +
      (pagoPendiente ? '<div class="ftsub-vacio" style="border-color:rgba(239,68,68,.4);margin-bottom:14px;padding:18px 20px;text-align:left;"><strong style="color:#EF4444;">Pago no confirmado.</strong> <span style="font-size:13px;color:var(--text-light);">Tu último cobro fue rechazado y Stripe lo volverá a intentar. Para no perder tu acceso, actualiza tu tarjeta en «Gestionar en Stripe». No vuelvas a suscribirte: se te cobraría dos veces.</span></div>' : '') +
      '<section class="ftsub-plan"><div class="ftsub-plan-cab"><div><div class="ftsub-plan-lbl">' + (pagoPendiente ? 'Pago no confirmado · acceso temporal' : cancelada ? 'Plan cancelado · con acceso' : 'Plan activo · pagado') + '</div><h2 class="ftsub-plan-nombre">' + (anual ? 'VIP Anual' : 'VIP Mensual') + '</h2></div>' +
      '<div class="ftsub-plan-precio"><b>' + pesos(monto) + '</b><span>MXN / ' + (anual ? 'año' : 'mes') + '</span></div></div>' +
      '<div class="ftsub-feats">' + feats.map(f => '<div class="ftsub-feat">' + SVG.check + esc(f) + '</div>').join('') + '</div>' +
      '<div class="ftsub-pie"><span><strong>' + (cancelada ? 'Acceso hasta:' : 'Próxima renovación:') + '</strong> ' + fechaLarga(venc) + '</span><span><strong>Días restantes:</strong> ' + dias + '</span></div></section>' +
      '<div class="ftsub-grid"><div class="ftsub-caja"><div class="ftsub-caja-tit">Método de pago</div><p>Gestiona tu tarjeta, descarga tus facturas y revisa tu historial de cobros desde el portal seguro de Stripe.</p><button type="button" class="ftsub-btn" id="ftsubPortal">' + SVG.tarjeta + '<span>Gestionar en Stripe</span></button></div>' +
      '<div class="ftsub-caja"><div class="ftsub-caja-tit">' + (cancelada ? 'Cancelación programada' : 'Cancelar suscripción') + '</div>' +
      (cancelada ? '<p>Tu membresía se cancelará el <strong>' + fechaLarga(venc) + '</strong>. Hasta esa fecha mantienes acceso completo.</p>' +
          (m.stripeSubscriptionId && !m.suscripcionTerminada ? '<button type="button" class="ftsub-btn" id="ftsubReactivar">' + SVG.check + '<span>Reactivar mi suscripción</span></button>' : '<p>Después de esa fecha podrás volver a suscribirte desde aquí.</p>')
        : '<p>Mantendrás acceso hasta el final del periodo pagado. Después se cancela automáticamente y no se te cobra más.</p><button type="button" class="ftsub-btn peligro" id="ftsubCancelar">' + SVG.x + '<span>Cancelar suscripción</span></button>') + '</div></div>' +
      (pagos.length ? '<div class="ftsub-historial"><h2 class="ftsub-historial-tit">Historial de pagos<span>' + pagos.length + ' cobro' + (pagos.length === 1 ? '' : 's') + '</span></h2><div class="ftsub-pagos">' +
        pagos.map(p => { const f = p.date || p.fecha || ''; const fecha = f ? (typeof formatDate === 'function' ? formatDate(f) : f) : '—'; return '<div class="ftsub-pago"><div class="ftsub-pago-ic">' + SVG.check + '</div><div class="ftsub-pago-cuerpo"><b>' + esc(p.concept || p.concepto || ('Pago de membresía ' + (p.plan === 'anual' || anual ? 'anual' : 'mensual'))) + '</b><small>' + esc(fecha) + '</small></div><span class="ftsub-pago-monto">' + (typeof p.amount === 'number' ? pesos(p.amount) : '—') + '</span><span class="ftsub-pago-estado">' + esc(p.status === 'failed' ? 'Fallido' : 'Pagado') + '</span></div>'; }).join('') + '</div></div>' : '');
    const portal = $('ftsubPortal'); if (portal) portal.onclick = abrirPortal;
    const canc = $('ftsubCancelar'); if (canc) canc.onclick = () => modalCancelar(venc);
    const rea = $('ftsubReactivar'); if (rea) rea.onclick = reactivar;
  }

  // Reanudar una membresía cancelada que todavía no vence (como Alintec y Zoorigen)
  async function reactivar() {
    const b = $('ftsubReactivar'); if (!b) return; const txt = b.querySelector('span'), antes = txt.textContent; b.disabled = true; txt.textContent = 'Reactivando…';
    try {
      const token = await auth.currentUser.getIdToken();
      const r = await fetch(API() + '/api/reactivate-subscription', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: '{}' });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.success) throw new Error(d.error || 'No se pudo reactivar tu suscripción.');
      showToast('¡Listo! Tu suscripción sigue activa y se renovará como siempre.');
      if (typeof loadUserProfile === 'function') await loadUserProfile();
      pintar();
    } catch (e) { showToast(e.message); b.disabled = false; txt.textContent = antes; }
  }

  async function abrirPortal() {
    const b = $('ftsubPortal'); if (!b) return; const txt = b.querySelector('span'), antes = txt.textContent; b.disabled = true; txt.textContent = 'Abriendo…';
    try {
      const token = await auth.currentUser.getIdToken();
      const r = await fetch(API() + '/api/billing-portal', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: '{}' });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.url) throw new Error(d.error || 'No se pudo abrir el portal.');
      window.location.href = d.url;
    } catch (e) { showToast(e.message); b.disabled = false; txt.textContent = antes; }
  }

  function modalCancelar(venc) {
    document.querySelectorAll('.ftsub-modal').forEach(o => o.remove());
    const o = document.createElement('div'); o.className = 'ftsub-modal';
    o.innerHTML = '<div class="ftsub-modal-caja" role="dialog" aria-modal="true"><div class="ftsub-icono" style="background:rgba(239,68,68,.12);color:#EF4444">' + SVG.x + '</div><h2>¿Seguro(a) que deseas cancelar?</h2>' +
      '<p>Tu membresía se cancelará al final del periodo pagado. <strong>Seguirás teniendo acceso completo</strong> hasta el <strong>' + fechaLarga(venc) + '</strong>, pero ya no se te realizará ningún cobro.</p>' +
      '<div class="ftsub-modal-avisos"><div>Perderás acceso a los cursos y al contenido de miembros después de esa fecha.</div><div>Tus certificados ya emitidos siguen siendo válidos y tu avance se conserva.</div></div>' +
      '<div class="ftsub-modal-bot"><button type="button" class="ftsub-btn" id="ftsubNo">Mejor no, sigo siendo miembro</button><button type="button" class="ftsub-btn peligro" id="ftsubSi">Sí, cancelar mi suscripción</button></div></div>';
    document.body.appendChild(o);
    const cerrar = () => o.remove();
    o.onclick = e => { if (e.target === o) cerrar(); }; $('ftsubNo').onclick = cerrar;
    $('ftsubSi').onclick = async () => {
      const b = $('ftsubSi'); b.disabled = true; b.textContent = 'Cancelando…';
      try {
        const token = await auth.currentUser.getIdToken();
        const r = await fetch(API() + '/api/cancel-subscription', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: '{}' });
        const d = await r.json().catch(() => ({}));
        if (!d.success) throw new Error(d.error || 'No se pudo cancelar. Intenta de nuevo.');
        cerrar(); showToast('Suscripción cancelada. Mantienes el acceso hasta el final del periodo pagado.');
        if (typeof loadUserProfile === 'function') await loadUserProfile();
        pintar();
      } catch (e) { b.disabled = false; b.textContent = 'Sí, cancelar mi suscripción'; showToast(e.message); }
    };
  }

  // La página se vuelve a dibujar al entrar y cuando el perfil termina de cargar los datos de la cuenta
  const perfilOriginal = window.loadUserProfile;
  if (typeof perfilOriginal === 'function') window.loadUserProfile = async function () { const r = await perfilOriginal.apply(this, arguments); try { if ($('page-subscription') && $('page-subscription').classList.contains('active')) pintar(); } catch (_) { /* sin página */ } return r; };
  // El administrador viendo el panel como usuario es solo para revisar contenido: no tiene suscripción, así que ese apartado no existe para él
  const ocultarParaAdmin = () => {
    if (!window.ftVistaAdmin) return;
    document.querySelectorAll('[data-page="subscription"], [data-ir="subscription"], [onclick*="subscription"]').forEach(e => { e.style.display = 'none'; });
  };
  setInterval(ocultarParaAdmin, 1500);
  const paginaPintar = window.showPage;
  window.showPage = function (page) {
    if (page === 'subscription' && window.ftVistaAdmin) page = 'home';
    const r = paginaPintar.call(this, page); if (page === 'subscription') pintar(); ocultarParaAdmin(); return r;
  };
  // Lo que es solo para miembros ya no abre una tarjeta de aviso: lleva directo a Suscripción, donde se elige el plan y se paga (como Alintec)
  window.showPaywallOverlay = function () {
    if (window.ftVistaAdmin) return;
    try { if (typeof closePaywallOverlay === 'function') closePaywallOverlay(); } catch (_) { /* sin tarjeta */ }
    try { if (document.body.classList.contains('nav-open') && typeof toggleSidebar === 'function') toggleSidebar(false); } catch (_) { /* sin menú */ }
    const ya = $('page-subscription') && $('page-subscription').classList.contains('active');
    showPage('subscription');
    if (!ya) setTimeout(() => { try { showToast('Eso es para miembros: elige tu plan para activarlo.'); } catch (_) { /* sin aviso */ } }, 400);
  };
  // Red de seguridad: si por algún motivo la pantalla «Preparando tu espacio…» sigue ahí a los 9 s, se quita y se deja usar el Club
  setTimeout(() => { try { if (typeof authBootComplete !== 'undefined' && !authBootComplete && typeof finishAuthBoot === 'function') finishAuthBoot(!auth.currentUser); } catch (_) { /* sin pantalla */ } }, 9000);
  marcar();
})();
