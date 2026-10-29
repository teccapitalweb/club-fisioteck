/* Club FisioTeck — bienvenida a la membresía VIP (como Alintec Food y Zoorigen).
   Cuando alguien paga y se vuelve miembro aparece esta tarjeta con varias láminas: membresía activa, cursos que se abren cada pocos días
   (el primero se puede adelantar con retos, una sola vez), retos y XP, herramientas, comunidad, materiales y certificados.
   Reemplaza la ventana "¡Felicidades!" de index.html (showCelebration). Se puede volver a ver con ftVip.mostrar().
   Depende de index.html: auth, db, memberIsPaid, launchConfetti; de club-acceso.js (ftAcceso) para los días y los retos. */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const trazo = d => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  const ICONOS = {
    escudo: trazo('<path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5L15.5 9.5"/>'),
    libro: trazo('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>'),
    rayo: trazo('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'),
    herr: trazo('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/>'),
    gente: trazo('<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 5.2a3 3 0 0 1 0 5.6M18 14.4c1.8.8 3 2.6 3 5.6"/>'),
    archivo: trazo('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>'),
    diploma: trazo('<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21l4-3 4 3M8 9h8M8 12.5h5"/>')
  };
  const COLORES = ['#4CA6DE', '#F5B83D', '#159E92', '#7C3AED', '#DC2D3F'];
  let ov = null, idx = 0, lam = [];

  function laminas(nombre, plan) {
    const A = window.ftAcceso || {}, dias = A.diasEntreCursos || 8, retos = A.retosParaAdelantar || 12;
    return [
      { ic: 'escudo', eyebrow: '¡Membresía VIP activa!', t: 'Bienvenido al <em>club VIP ' + (plan === 'anual' ? 'Anual' : 'Mensual') + '</em>', d: esc(nombre) + ', ya eres parte de la comunidad de fisioterapia más activa de México. Esto es tuyo:' },
      { ic: 'libro', eyebrow: 'Tus cursos', t: 'Un curso nuevo <em>cada ' + dias + ' días</em>', d: 'Tu primer curso se abre a los ' + dias + ' días de tu membresía y después sigues con uno cada ' + dias + ' días. Todos incluyen certificado.' },
      { ic: 'rayo', eyebrow: 'Retos', t: 'Abre tu primer curso <em>antes</em>', d: 'Resuelve ' + retos + ' retos (quiz, detective, ordena el proceso y modo historia) y abres ese primer curso sin esperar. Solo aplica una vez.' },
      { ic: 'herr', eyebrow: 'Herramientas clínicas', t: 'Todo para tu <em>consulta</em>', d: 'Calculadora de rehabilitación, atlas muscular, glosario, rangos de movimiento, escala EVA y cronómetro de sesión.' },
      { ic: 'gente', eyebrow: 'Comunidad', t: 'Foro y <em>directorio VIP</em>', d: 'Comparte casos con colegas, responde dudas y aparece en el directorio para que otros profesionales te encuentren.' },
      { ic: 'archivo', eyebrow: 'Material y créditos', t: 'PDF, webinars y <em>créditos</em>', d: 'Material de apoyo en cada curso, clases en vivo y créditos para canjear los materiales gratuitos.' },
      { ic: 'diploma', eyebrow: 'Certificados', t: 'Listo, <em>empecemos</em>', d: 'Al terminar cada curso descargas tu certificado con folio verificable. Tu avance y tus logros nunca se pierden.' }
    ];
  }

  function cerrar() {
    if (ov) { ov.remove(); ov = null; }
    document.removeEventListener('keydown', tecla, true);
    document.body.classList.remove('modal-open');
    try { if (window.ftAcceso && ftAcceso.cargar) ftAcceso.cargar(); } catch (_) { /* sin servidor */ }
  }
  function tecla(e) {
    if (!ov) return;
    if (e.key === 'Escape') { e.preventDefault(); cerrar(); }
    else if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); sig(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); ir(idx - 1); }
  }
  function sig() { if (idx >= lam.length - 1) cerrar(); else ir(idx + 1); }
  function ir(n) {
    if (!ov) return;
    idx = Math.max(0, Math.min(lam.length - 1, n));
    const l = lam[idx], ultima = idx === lam.length - 1;
    ov.querySelector('.fvp-cont').innerHTML = '<div class="fvp-ic">' + ICONOS[l.ic] + '</div><small>' + esc(l.eyebrow) + '</small><h2>' + l.t + '</h2><p>' + l.d + '</p>';
    ov.querySelector('.fvp-puntos').innerHTML = lam.map((_, i) => '<i class="' + (i === idx ? 'on' : i < idx ? 'hecho' : '') + '"></i>').join('');
    ov.querySelector('.fvp-sig').innerHTML = ultima ? 'Empezar a explorar' : 'Siguiente <span aria-hidden="true">→</span>';
    ov.querySelector('.fvp-barra i').style.width = Math.round((idx + 1) / lam.length * 100) + '%';
  }

  async function mostrar(planForzado) {
    if (ov || !auth.currentUser) return;
    let plan = planForzado || 'mensual';
    if (!planForzado) { try { const d = await db.collection('members').doc(auth.currentUser.uid).get(); if (d.exists && d.data().plan) plan = d.data().plan; } catch (_) { /* queda mensual */ } }
    const nombre = (((auth.currentUser || {}).displayName || '').trim().split(/\s+/)[0]) || 'colega';
    lam = laminas(nombre, plan); idx = 0;
    ov = document.createElement('div'); ov.id = 'ftVipOv'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Bienvenida a la membresía VIP');
    ov.innerHTML = '<div class="fvp-confeti" aria-hidden="true">' + Array.from({ length: 30 }, (_, i) => '<i style="left:' + Math.round(Math.random() * 100) + '%;background:' + COLORES[i % COLORES.length] + ';animation-delay:' + (Math.random() * 3).toFixed(2) + 's;animation-duration:' + (3 + Math.random() * 3).toFixed(2) + 's"></i>').join('') + '</div>' +
      '<div class="fvp-caja"><div class="fvp-barra"><i></i></div><button type="button" class="fvp-x" aria-label="Cerrar">×</button><div class="fvp-cont"></div>' +
      '<div class="fvp-acc"><button type="button" class="fvp-saltar">Saltar e ir al panel</button><div class="fvp-puntos"></div><button type="button" class="fvp-sig"></button></div>' +
      '<p class="fvp-duda">Cualquier duda · <a href="https://wa.me/5212381478840" target="_blank" rel="noopener noreferrer">contáctanos</a></p></div>';
    document.body.appendChild(ov); document.body.classList.add('modal-open');
    ov.querySelector('.fvp-x').onclick = cerrar; ov.querySelector('.fvp-saltar').onclick = cerrar; ov.querySelector('.fvp-sig').onclick = sig;
    document.addEventListener('keydown', tecla, true);
    ir(0); ov.querySelector('.fvp-sig').focus({ preventScroll: true });
  }
  window.ftVip = { mostrar, cerrar };
  // La ventana de pago exitoso del Club ahora es esta tarjeta
  window.showCelebration = function () { mostrar(); };
  window.closeCelebration = cerrar;

  const estilo = document.createElement('style');
  estilo.textContent = `
  #ftVipOv { position:fixed; inset:0; z-index:10095; display:flex; align-items:center; justify-content:center; padding:20px; background:rgba(5,10,18,.9); backdrop-filter:blur(8px); overflow:hidden; }
  .fvp-confeti { position:absolute; inset:0; pointer-events:none; } .fvp-confeti i { position:absolute; top:-6%; width:8px; height:13px; border-radius:2px; opacity:.85; animation:fvpCae linear infinite; }
  @keyframes fvpCae { to { transform:translateY(115vh) rotate(540deg); } }
  .fvp-caja { position:relative; width:min(640px,100%); padding:42px 34px 22px; border-radius:26px; text-align:center; color:#fff; background:linear-gradient(160deg,#101a2e,#0a1220); border:1px solid rgba(245,184,61,.35); box-shadow:0 30px 80px rgba(0,0,0,.55); overflow:hidden; }
  .fvp-barra { position:absolute; left:0; right:0; top:0; height:3px; background:rgba(255,255,255,.12); } .fvp-barra i { display:block; height:100%; width:0; background:linear-gradient(90deg,#4CA6DE,#7CC3EE); transition:width .4s ease; }
  .fvp-x { position:absolute; top:16px; right:16px; width:36px; height:36px; border-radius:11px; border:1px solid rgba(255,255,255,.16); background:rgba(255,255,255,.06); color:#fff; font-size:1.3rem; line-height:1; cursor:pointer; }
  .fvp-cont { min-height:250px; display:grid; align-content:center; justify-items:center; gap:10px; animation:fvpIn .4s both; } @keyframes fvpIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
  .fvp-ic { width:76px; height:76px; color:#7CC3EE; filter:drop-shadow(0 0 18px rgba(76,166,222,.45)); } .fvp-ic svg { width:100%; height:100%; stroke-width:1.5; }
  .fvp-cont small { font-family:'JetBrains Mono',monospace; font-size:.68rem; letter-spacing:.2em; text-transform:uppercase; font-weight:700; color:#F5B83D; }
  .fvp-cont h2 { margin:0; font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:clamp(1.6rem,5.5vw,2.25rem); letter-spacing:-.03em; line-height:1.1; } .fvp-cont h2 em { font-style:italic; color:#7CC3EE; }
  .fvp-cont p { margin:0; max-width:470px; font-size:.97rem; line-height:1.6; color:rgba(255,255,255,.8); }
  .fvp-acc { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:22px; }
  .fvp-saltar { background:none; border:0; color:rgba(255,255,255,.6); font:inherit; font-size:.85rem; font-weight:600; cursor:pointer; text-align:left; } .fvp-saltar:hover { color:#fff; }
  .fvp-puntos { display:flex; gap:7px; } .fvp-puntos i { width:7px; height:7px; border-radius:50%; background:rgba(255,255,255,.25); } .fvp-puntos i.hecho { background:rgba(255,255,255,.6); } .fvp-puntos i.on { width:24px; border-radius:999px; background:#7CC3EE; }
  .fvp-sig { padding:14px 26px; border:0; border-radius:14px; background:linear-gradient(135deg,#7CC3EE,#4CA6DE); color:#06121F; font:inherit; font-size:.95rem; font-weight:800; cursor:pointer; box-shadow:0 10px 26px rgba(76,166,222,.35); white-space:nowrap; }
  .fvp-duda { margin:18px 0 0; font-size:.76rem; color:rgba(255,255,255,.5); } .fvp-duda a { color:#F5B83D; font-weight:700; text-decoration:none; }
  @media (max-width:560px) { .fvp-caja { padding:38px 20px 18px; } .fvp-acc { flex-wrap:wrap; justify-content:center; } .fvp-puntos { order:-1; width:100%; justify-content:center; } .fvp-sig { flex:1; } }
  @media (prefers-reduced-motion:reduce) { .fvp-confeti { display:none; } .fvp-cont { animation:none; } }`;
  document.head.appendChild(estilo);
})();
