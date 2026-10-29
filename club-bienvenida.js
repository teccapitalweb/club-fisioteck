/* Club FisioTeck — pantalla de bienvenida para cuentas nuevas (como el splash de Alintec Food y Zoorigen): ventana a pantalla completa con confeti
   y varias láminas que avanzan solas (cuenta creada, prueba gratuita o aprendizaje a tu ritmo, cursos, herramientas, retos y logros, certificados y
   "todo listo"). Al cerrarla sigue el orden de siempre: premio de bienvenida +100 XP al terminar el recorrido guiado, nombre y avatar, y elegir el curso
   de prueba. Se muestra una sola vez por cuenta (se recuerda en este navegador y en members/{uid}.onboarding) y se puede volver a ver con
   ftBienvenida.mostrar(). Depende de index.html: auth, db, memberIsPaid, achievementData; de club-recorrido.js (ftCola, ftRecorrido) y club-mascota.js. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clave = () => 'ft_splash_' + ((auth.currentUser || {}).uid || 'x');
  const AUTO_MS = 3200;
  let ov = null, idx = 0, reloj = null, lam = [], variante = 'nuevo', datosVip = null;

  function vista() { try { return localStorage.getItem(clave()) === '1'; } catch (_) { return false; } }
  function marcar() {
    try { localStorage.setItem(clave(), '1'); } catch (_) { /* modo privado */ }
    try { if (auth.currentUser && window.db) db.collection('members').doc(auth.currentUser.uid).set({ onboarding: { bienvenidaVista: true } }, { merge: true }); } catch (_) { /* sin conexión: queda la marca local */ }
  }
  function laminas() {
    if (variante === 'vip') return laminasVip();
    const nombre = (((auth.currentUser || {}).displayName || '').trim().split(/\s+/)[0]) || 'colega', paga = typeof memberIsPaid !== 'undefined' && memberIsPaid;
    return [
      { pose: 'celebra', eyebrow: '¡Cuenta creada!', t: 'Bienvenido al Club FisioTeck', d: nombre + ', ya eres parte de la comunidad de fisioterapia y rehabilitación.' },
      paga ? { pose: 'libro', eyebrow: 'Tu membresía', t: 'Aprende a tu ritmo', d: 'Tus cursos se abren con el tiempo y también puedes abrir el siguiente antes resolviendo retos.' }
        : { pose: 'lupa', eyebrow: 'Tu prueba gratuita', t: 'Elige un curso para probar', d: 'Verás todas sus clases menos la última. Después decides si activas tu membresía.' },
      { pose: 'libro', eyebrow: 'Cursos', t: 'Cursos de especialistas', d: 'Clases grabadas con material descargable que se desbloquea conforme avanzas.' },
      { pose: 'senala', eyebrow: 'Herramientas', t: 'Herramientas clínicas', d: 'Calculadora de rehabilitación, atlas muscular, escala EVA, rangos de movimiento y cronómetro de sesión.' },
      { pose: 'trofeo', eyebrow: 'Retos y logros', t: 'Practica, gana XP y sube de nivel', d: 'Quizzes, detective, modo historia y retos diarios. Cada logro te acerca a premios que abren cursos.' },
      { pose: 'diploma', eyebrow: 'Certificados', t: 'Certificados con folio verificable', d: 'Al terminar un curso descargas tu certificado con código QR que cualquiera puede verificar.' },
      { pose: 'saluda', eyebrow: 'Todo listo', t: 'Tu aprendizaje empieza ahora', d: 'Te mostraremos dónde está cada cosa y después podrás elegir tu curso.' }
    ];
  }
  const COLORES = ['#0D5FA0', '#159E92', '#F5B83D', '#DC2D3F', '#7C3AED', '#4CA6DE'];
  function confeti() {
    return '<div class="fbv-confeti" aria-hidden="true">' + Array.from({ length: 38 }, (_, i) => {
      const x = Math.round(Math.random() * 100), d = (Math.random() * 3).toFixed(2), t = (3 + Math.random() * 3).toFixed(2), w = 6 + Math.round(Math.random() * 6);
      return '<i style="left:' + x + '%;width:' + w + 'px;height:' + Math.round(w * 1.6) + 'px;background:' + COLORES[i % COLORES.length] + ';animation-delay:' + d + 's;animation-duration:' + t + 's"></i>';
    }).join('') + '</div>';
  }
  function cerrar() {
    if (reloj) { clearTimeout(reloj); reloj = null; }
    if (ov) { ov.remove(); ov = null; }
    document.removeEventListener('keydown', tecla, true);
    if (variante === 'vip') marcarVip();
    else { marcar(); if (typeof memberIsPaid !== 'undefined' && memberIsPaid) marcarVip(); } // quien paga desde el inicio ya vio su bienvenida
  }
  function tecla(e) {
    if (!ov) return;
    if (e.key === 'Escape') { e.preventDefault(); cerrar(); }
    else if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); sig(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); ir(idx - 1); }
  }
  function sig() { if (idx >= lam.length - 1) { const vip = variante === 'vip'; cerrar(); if (vip) { try { showPage('library'); } catch (_) { /* sin panel */ } } } else ir(idx + 1); }
  function ir(n) {
    if (!ov) return; idx = Math.max(0, Math.min(lam.length - 1, n));
    const l = lam[idx], ultima = idx === lam.length - 1;
    ov.querySelector('.fbv-cont').innerHTML = '<div class="fbv-mascota">' + (window.ftMascota ? ftMascota.html('home', { pose: l.pose, burbuja: false, ancho: 150 }) : '') + '</div><small>' + esc(l.eyebrow) + '</small><h2>' + esc(l.t) + '</h2><p>' + esc(l.d) + '</p>';
    ov.querySelector('.fbv-puntos').innerHTML = lam.map((_, i) => '<i class="' + (i === idx ? 'on' : i < idx ? 'hecho' : '') + '"></i>').join('');
    const b = ov.querySelector('.fbv-sig'); b.textContent = ultima ? (variante === 'vip' ? 'Ver mis cursos' : 'Comenzar recorrido') : 'Siguiente';
    const barra = ov.querySelector('.fbv-barra i'); barra.style.transition = 'none'; barra.style.width = '0'; void barra.offsetWidth;
    if (reloj) clearTimeout(reloj);
    if (!ultima) { barra.style.transition = 'width ' + AUTO_MS + 'ms linear'; barra.style.width = '100%'; reloj = setTimeout(sig, AUTO_MS); }
    else barra.style.width = '100%';
  }
  function mostrar(v) {
    if (ov || !auth.currentUser) return;
    variante = v === 'vip' ? 'vip' : 'nuevo';
    lam = laminas(); idx = 0;
    ov = document.createElement('div'); ov.id = 'ftBienvOv'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Bienvenida al Club FisioTeck');
    ov.innerHTML = '<div class="fbv-caja">' + confeti() + '<div class="fbv-barra"><i></i></div><div class="fbv-cont"></div><div class="fbv-puntos"></div>' +
      '<div class="fbv-acc"><button type="button" class="fbv-saltar">Saltar e ir al panel</button><button type="button" class="fbv-sig">Siguiente</button></div></div>';
    document.body.appendChild(ov);
    ov.querySelector('.fbv-saltar').onclick = cerrar; ov.querySelector('.fbv-sig').onclick = sig;
    document.addEventListener('keydown', tecla, true);
    ir(0); ov.querySelector('.fbv-sig').focus({ preventScroll: true });
  }

  const estilo = document.createElement('style');
  estilo.textContent = `
  #ftBienvOv { position:fixed; inset:0; z-index:10090; display:flex; align-items:center; justify-content:center; padding:20px; background:rgba(6,14,26,.66); backdrop-filter:blur(5px); -webkit-backdrop-filter:blur(5px); overflow:auto; }
  .fbv-confeti { position:absolute; inset:0; pointer-events:none; overflow:hidden; border-radius:inherit; } .fbv-confeti i { position:absolute; top:-6%; border-radius:2px; opacity:.9; animation:fbvCae linear infinite; }
  @keyframes fbvCae { 0% { transform:translateY(0) rotate(0); } 100% { transform:translateY(640px) rotate(540deg); } }
  .fbv-caja { position:relative; width:min(480px,100%); max-height:calc(100vh - 40px); max-height:calc(100dvh - 40px); overflow:hidden auto; display:grid; gap:16px; justify-items:center; text-align:center; color:#fff; padding:28px 26px 26px; border-radius:28px; background:radial-gradient(circle at 30% 15%,#0F5C95,#082A4A 72%); box-shadow:0 30px 80px rgba(0,0,0,.45); }
  .fbv-caja > :not(.fbv-confeti) { position:relative; z-index:1; }
  .fbv-barra { width:100%; height:4px; border-radius:999px; background:rgba(255,255,255,.2); overflow:hidden; } .fbv-barra i { display:block; height:100%; width:0; background:#F5C75B; }
  .fbv-cont { min-height:290px; display:grid; align-content:center; justify-items:center; gap:8px; animation:fbvEntra .45s both; } @keyframes fbvEntra { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
  .fbv-cont small { font-family:'JetBrains Mono',monospace; font-size:.66rem; letter-spacing:.18em; text-transform:uppercase; color:#F5C75B; font-weight:700; }
  .fbv-cont h2 { margin:0; font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:clamp(1.7rem,6vw,2.4rem); letter-spacing:-.03em; line-height:1.08; } .fbv-cont p { margin:0; max-width:420px; font-size:.98rem; line-height:1.55; opacity:.9; }
  .fbv-puntos { display:flex; gap:8px; } .fbv-puntos i { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,.3); } .fbv-puntos i.hecho { background:rgba(255,255,255,.7); } .fbv-puntos i.on { width:24px; border-radius:999px; background:#F5C75B; }
  .fbv-acc { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; }
  .fbv-acc button { font:inherit; font-weight:700; font-size:.9rem; border-radius:999px; padding:12px 26px; cursor:pointer; border:1.5px solid rgba(255,255,255,.4); background:none; color:#fff; } .fbv-acc .fbv-sig { background:#fff; border-color:#fff; color:#0A3E68; }
  @media (prefers-reduced-motion:reduce) { .fbv-confeti { display:none; } .fbv-cont { animation:none; } }`;
  document.head.appendChild(estilo);

  // Arranque automático: cuenta nueva (creada hace menos de 3 días) que aún no ha reclamado el premio de bienvenida, una sola vez
  function intentar() {
    const u = auth.currentUser; if (!u || vista() || !achievementData.estadoServidor || achievementData.bienvenida) return;
    const creada = u.metadata && u.metadata.creationTime ? new Date(u.metadata.creationTime).getTime() : 0;
    if (!creada || Date.now() - creada > 3 * 864e5) { marcar(); return; } // cuenta antigua: no se muestra
    if (window.ftCola) ftCola.cuandoLibre(() => { if (!vista()) mostrar(); }, 'bienvenida');
  }
  setInterval(intentar, 2500);
  // ---------- Bienvenida VIP (como Alintec): al volverse miembro, por pago o por activación del administrador ----------
  const claveVip = () => 'ft_vip_bienvenida_' + ((auth.currentUser || {}).uid || 'x');
  const vipVista = () => { try { return localStorage.getItem(claveVip()) === '1'; } catch (_) { return false; } };
  function marcarVip() {
    try { localStorage.setItem(claveVip(), '1'); } catch (_) { /* modo privado */ }
    try { if (auth.currentUser && window.db) db.collection('members').doc(auth.currentUser.uid).set({ onboarding: { vipBienvenidaVista: true } }, { merge: true }); } catch (_) { /* sin conexión */ }
  }
  const aMs = v => { if (!v) return 0; if (typeof v.toMillis === 'function') return v.toMillis(); if (typeof v.seconds === 'number') return v.seconds * 1000; const t = new Date(String(v).length === 10 ? v + 'T12:00:00' : v).getTime(); return isNaN(t) ? 0 : t; };
  // La membresía es NUEVA si su primer pago, o su activación o regalo, fue en los últimos 7 días (así a los miembros de siempre no se les muestra)
  function esReciente(m) {
    const pagos = (Array.isArray(m.payments) ? m.payments : []).map(p => aMs(p && (p.date || p.fecha || p.createdAt))).filter(Boolean);
    const inicio = pagos.length ? Math.min.apply(null, pagos) : Math.max(aMs(m.activadoEn), aMs(m.giftedAt));
    return !!inicio && Date.now() - inicio <= 7 * 864e5;
  }
  function laminasVip() {
    const d = datosVip || {}, plan = String(d.plan || 'mensual').toLowerCase(), regalo = plan === 'regalo' || d.regalo === true;
    const nombre = (((auth.currentUser || {}).displayName || '').trim().split(/\s+/)[0]) || 'colega';
    const A = window.ftAcceso || {}, esc8 = A.escalonado === true, dias = A.diasEntreCursos || 8;
    const portada = regalo ? { eyebrow: 'Acceso de cortesía', t: 'FisioTeck te regaló acceso VIP', d: nombre + ', disfruta el Club completo durante tu periodo de cortesía. Esto es lo que tienes desbloqueado:' }
      : plan === 'anual' ? { eyebrow: '¡Bienvenido al Club VIP!', t: 'Bienvenido al Club VIP Anual', d: nombre + ', te uniste por todo un año a la comunidad de fisioterapia. Esto es tuyo:' }
      : { eyebrow: '¡Membresía VIP activa!', t: 'Bienvenido al Club VIP Mensual', d: nombre + ', ya eres parte de la comunidad de fisioterapia y rehabilitación. Esto es tuyo:' };
    return [
      Object.assign({ pose: 'celebra' }, portada),
      { pose: 'libro', eyebrow: 'Cursos con certificado', t: 'Cursos premium', d: esc8 ? 'Tu primer curso ya está abierto y cada ' + dias + ' días se abre el siguiente. También puedes abrir el que sigue antes superando retos.' : 'Catálogo completo con clases grabadas, material descargable y certificado al terminar.' },
      { pose: 'senala', eyebrow: 'En vivo', t: 'Clases en vivo', d: 'Webinars con especialistas y acceso a las grabaciones cuando quieras.' },
      { pose: 'lupa', eyebrow: 'Biblioteca', t: 'PDF, material y libros', d: 'Guías y plantillas descargables, y libros de lectura que se abren al superar retos.' },
      { pose: 'trofeo', eyebrow: 'Herramientas y retos', t: 'Herramientas clínicas y retos', d: 'Calculadora, atlas muscular, escala EVA y más. Gana XP, sube de nivel y presume tu tarjeta en el Directorio VIP.' },
      { pose: 'diploma', eyebrow: 'Certificados', t: 'Certificados con folio verificable', d: 'Con código QR que cualquiera puede verificar, para respaldar lo que aprendes.' },
      { pose: 'saluda', eyebrow: 'Todo listo', t: regalo ? 'Aprovecha tu acceso de cortesía' : 'Todo esto ya es tuyo', d: regalo ? 'Cuando termine tu cortesía podrás volverte miembro VIP para no perder el acceso.' : 'Explora a tu ritmo. Tu panel completo te está esperando.' }
    ];
  }
  async function mostrarVip(o) {
    if (ov || !auth.currentUser) return;
    if (!(o && o.datos)) { try { const s = await db.collection('members').doc(auth.currentUser.uid).get(); datosVip = s.exists ? (s.data() || {}) : {}; } catch (_) { datosVip = {}; } } else datosVip = o.datos;
    if (ov) return;
    mostrar('vip');
  }
  // Arranque automático: miembro con membresía vigente y RECIENTE que todavía no ha visto su bienvenida VIP, una sola vez
  let revisandoVip = false;
  async function intentarVip() {
    const u = auth.currentUser;
    if (revisandoVip || ov || !u || typeof memberIsPaid === 'undefined' || !memberIsPaid || vipVista()) return;
    if (window.ftBienvenida && !vista() && nueva()) return; // cuenta nueva: primero su bienvenida normal (ya incluye la variante de miembro)
    revisandoVip = true;
    try {
      const s = await db.collection('members').doc(u.uid).get(), m = s.exists ? (s.data() || {}) : {};
      if ((m.onboarding && m.onboarding.vipBienvenidaVista) || !esReciente(m)) { try { localStorage.setItem(claveVip(), '1'); } catch (_) { /* modo privado */ } return; }
      datosVip = m;
      if (window.ftCola) ftCola.cuandoLibre(() => { if (!vipVista() && !ov) mostrar('vip'); }, 'bienvenida-vip');
    } catch (_) { /* sin conexión: se intenta de nuevo */ } finally { revisandoVip = false; }
  }
  const nueva = () => { const u = auth.currentUser, c = u && u.metadata && u.metadata.creationTime ? new Date(u.metadata.creationTime).getTime() : 0; return !!c && Date.now() - c <= 3 * 864e5; };
  setInterval(intentarVip, 4000);
  // Al volver del pago (?checkout=success) el aviso viejo de pantalla completa se cambia por esta tarjeta
  const celebracionVieja = window.showCelebration;
  window.showCelebration = function () { if (auth.currentUser) mostrarVip({}); else if (celebracionVieja) celebracionVieja(); };
  window.ftBienvenida = { mostrar, vista, mostrarVip, vipVista };
})();
