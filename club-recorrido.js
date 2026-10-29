/* Club FisioTeck — recorrido guiado del panel, premio de bienvenida y cola de ventanas (como Zoorigen y Alintec).
   · El recorrido se muestra una sola vez, cuando ya no hay otra ventana abierta (bienvenida, membresía, certificado, reseña…), y se puede
     repetir desde Ayuda (?) en la barra superior. Al terminarlo la primera vez se gana el premio de bienvenida: +100 XP (lo da el servidor).
   · ftCola.cuandoLibre(fn) deja pasar una ventana nueva solo si no hay otra encima, para que no se encimen.
   Depende de index.html: auth, achievementData, showToast, showPage; de club-logros.js (ftLogros) y club-barra.js (barra). */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---------- Cola: ¿hay otra ventana encima? ----------
  const BLOQUEOS = ['#paywallOverlay', '#certModal', '#videoModal.active', '.ftp-overlay.is-open', '.ftj-ov', '.rf-overlay.on', '.rf-overlay.is-open', '.ftr-overlay.is-open', '.ftr-overlay.on', '#pwaPop.on', '#ftbOv.on', '#stripeCheckoutModal.active', '#celebrationPopup.active', '.ft-nombre-ov', '.ft-avatar-ov', '#ftTourOv', '#ftBienvOv', '#ftVipOv', '.fcu-ov'];
  function visible(el) { const cs = getComputedStyle(el); return cs.display !== 'none' && cs.visibility !== 'hidden' && el.getBoundingClientRect().width > 0; }
  function hayVentana() {
    const splash = $('splash-screen');
    if (splash && !splash.classList.contains('hidden') && visible(splash)) return true;
    return BLOQUEOS.some(s => { try { return [...document.querySelectorAll(s)].some(visible); } catch (_) { return false; } });
  }
  const pendientes = [];
  let reloj = null;
  function vaciar() {
    if (!pendientes.length) { clearInterval(reloj); reloj = null; return; }
    if (hayVentana()) return;
    const sig = pendientes.shift();
    try { sig.fn(); } catch (e) { console.warn('Cola de ventanas:', e && e.message); }
  }
  window.ftCola = {
    hayVentana,
    cuandoLibre(fn, id) {
      if (id && pendientes.some(p => p.id === id)) return;
      pendientes.push({ fn, id });
      if (!reloj) reloj = setInterval(vaciar, 1500);
      vaciar();
    }
  };

  // ---------- Recorrido ----------
  const PASOS = [
    { t: 'Busca lo que necesites', d: 'Escribe el nombre de un curso, una clase o un PDF. En computadora también puedes pulsar la tecla «/».', sel: ['.ftb-busca', '#ftbLupaMovil'] },
    { t: 'Tu biblioteca de cursos', d: () => memberIsPaid ? 'Aquí están todos tus cursos con sus clases, el temario y el material descargable que se desbloquea conforme avanzas. Se abren con el tiempo y también con retos.' : 'Aquí empiezas: elige un curso como prueba gratuita y verás todas sus clases menos la última. Con la membresía se abre todo.', sel: ['.sidebar-nav .nav-item[data-page="library"]', '.mobile-bottom-item[data-page="library"]'] },
    { t: 'Retos para practicar', d: 'Quizzes, detective, modo historia y retos diarios. Ganas XP y, resolviendo los retos pedidos, abres tu siguiente curso antes de tiempo (solo una vez).', sel: ['.sidebar-nav .nav-item[data-page="retos"]', '.mobile-bottom-item[data-page="retos"]'] },
    { t: 'PDF y material de apoyo', d: 'Materiales gratuitos y los materiales de cada curso, que se desbloquean según la clase en la que vas.', sel: ['.sidebar-nav .nav-item[data-page="pdfs"]'] },
    { t: 'Clases en vivo', d: () => memberIsPaid ? 'Aquí verás las clases en vivo con especialistas y sus fechas.' : 'Las clases en vivo llegarán pronto y serán parte de la membresía.', sel: ['.sidebar-nav .nav-item[data-page="courses-live"]', '.mobile-bottom-item[data-page="courses-live"]'] },
    { t: 'Herramientas clínicas', d: 'Calculadora de rehabilitación, atlas muscular, glosario, rangos de movimiento, escala EVA y cronómetro de sesión.', sel: ['.sidebar-nav .nav-item[data-page="rehab-calc"]'] },
    { t: 'Tus logros y tu racha', d: 'Cada clase, reto y día que entras suma XP e insignias. Llegar a Profesional y Maestro no es fácil, y cada uno te regala abrir un curso antes.', sel: ['#ftbRacha', '.sidebar-nav .nav-item[data-page="achievements"]'] },
    { t: 'Tus certificados', d: 'Al terminar un curso descargas tu certificado con folio verificable y código QR.', sel: ['.sidebar-nav .nav-item[data-page="certificates"]'] },
    { t: 'Tus avisos', d: 'Aquí llegan los cursos nuevos, las clases en vivo y los créditos que te regalamos.', sel: ['#ftbCampanaB', '.mobile-header button[aria-label="Abrir notificaciones"]'] },
    { t: 'Tu perfil y tu ayuda', d: 'Cambia tu nombre y tu avatar, y si tienes dudas toca el signo «?» para escribirnos o repetir este recorrido.', sel: ['.ftb-user', '.mobile-bottom-item[data-page="account"]'] }
  ];
  let paso = 0, primeraVez = false, ov = null, resaltado = null;

  function objetivo(p) { for (const s of p.sel) { const el = document.querySelector(s); if (el && visible(el)) return el; } return null; }
  function cerrar(terminado) {
    if (ov) { ov.remove(); ov = null; }
    document.removeEventListener('keydown', tecla, true); window.removeEventListener('resize', pintar);
    try { localStorage.setItem('ft_tour_' + ((auth.currentUser || {}).uid || 'x'), '1'); } catch (_) { /* modo privado */ }
    if (terminado && primeraVez) premio();
  }
  async function premio() {
    try {
      const r = await ftLogros.pedir('/api/logros/bienvenida', {});
      ftLogros.aplicar(r); ftLogros.repintar();
      if (r.premioNuevo) showToast('¡Recorrido completo! Ganaste +' + (r.xpBienvenida || 100) + ' XP de bienvenida');
    } catch (_) { /* sin servidor: se reintenta la próxima vez */ try { localStorage.removeItem('ft_tour_' + ((auth.currentUser || {}).uid || 'x')); } catch (e) { /* nada */ } }
  }
  function tecla(e) {
    if (!ov) return;
    if (e.key === 'Escape') { e.preventDefault(); cerrar(false); }
    else if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); siguiente(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); if (paso > 0) { paso--; pintar(); } }
  }
  function siguiente() { if (paso >= PASOS.length - 1) { cerrar(true); return; } paso++; pintar(); }

  function pintar() {
    if (!ov) return;
    // salta los pasos cuyo elemento no está en pantalla (por ejemplo, la racha si todavía es 0)
    let guard = 0; while (!objetivo(PASOS[paso]) && paso < PASOS.length - 1 && guard++ < PASOS.length) paso++;
    const p = PASOS[paso], el = objetivo(p);
    const foco = ov.querySelector('.ftt-foco'), tarjeta = ov.querySelector('.ftt-card');
    if (el) {
      el.scrollIntoView({ block: 'nearest', behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
      const r = el.getBoundingClientRect(), m = 6;
      foco.style.cssText = 'left:' + (r.left - m) + 'px;top:' + (r.top - m) + 'px;width:' + (r.width + 2 * m) + 'px;height:' + (r.height + 2 * m) + 'px;';
      const ancho = Math.min(340, window.innerWidth - 24);
      tarjeta.style.width = ancho + 'px';
      let x = Math.min(Math.max(12, r.left + r.width / 2 - ancho / 2), window.innerWidth - ancho - 12);
      const abajo = r.bottom + 14 + 190 < window.innerHeight;
      tarjeta.style.left = x + 'px'; tarjeta.style.top = abajo ? (r.bottom + 14) + 'px' : 'auto'; tarjeta.style.bottom = abajo ? 'auto' : (window.innerHeight - r.top + 14) + 'px';
    } else { foco.style.cssText = 'display:none'; tarjeta.style.cssText = 'width:min(340px,calc(100vw - 24px));left:50%;top:50%;transform:translate(-50%,-50%)'; }
    ov.querySelector('.ftt-n').textContent = 'Paso ' + (paso + 1) + ' de ' + PASOS.length;
    ov.querySelector('.ftt-t').textContent = p.t; ov.querySelector('.ftt-d').textContent = typeof p.d === 'function' ? p.d() : p.d;
    ov.querySelector('.ftt-ant').style.visibility = paso === 0 ? 'hidden' : 'visible';
    ov.querySelector('.ftt-sig').textContent = paso === PASOS.length - 1 ? (primeraVez ? 'Terminar y ganar +100 XP' : 'Terminar') : 'Siguiente';
    ov.querySelector('.ftt-sig').focus({ preventScroll: true });
  }

  const estilo = document.createElement('style');
  estilo.textContent = `
  #ftTourOv { position:fixed; inset:0; z-index:10080; }
  #ftTourOv .ftt-foco { position:fixed; border-radius:14px; box-shadow:0 0 0 9999px rgba(6,11,18,.72); border:2px solid var(--accent); transition:all .25s ease; pointer-events:none; }
  #ftTourOv .ftt-card { position:fixed; background:var(--surface); color:var(--text); border-radius:16px; padding:18px; box-shadow:0 20px 60px rgba(0,0,0,.4); border:1px solid var(--border); }
  #ftTourOv .ftt-n { font-size:.66rem; letter-spacing:.14em; text-transform:uppercase; color:var(--accent); font-weight:700; }
  #ftTourOv .ftt-t { margin:4px 0 6px; font-size:1.05rem; font-weight:700; } #ftTourOv .ftt-d { margin:0 0 14px; font-size:.86rem; line-height:1.55; color:var(--text-light); }
  #ftTourOv .ftt-bt { display:flex; gap:8px; align-items:center; } #ftTourOv .ftt-bt .esp { flex:1; }
  #ftTourOv button { font:inherit; font-size:.84rem; border-radius:10px; padding:9px 14px; cursor:pointer; border:1px solid var(--border); background:none; color:var(--text-light); }
  #ftTourOv button.ftt-sig { background:var(--accent); border-color:var(--accent); color:var(--on-accent,#fff); font-weight:700; }
  @media(prefers-reduced-motion:reduce){ #ftTourOv .ftt-foco { transition:none; } }
  `;
  document.head.appendChild(estilo);

  function iniciar(repetir) {
    if (ov) return;
    primeraVez = !repetir; paso = 0;
    ov = document.createElement('div'); ov.id = 'ftTourOv'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Recorrido del panel');
    ov.innerHTML = '<div class="ftt-foco"></div><div class="ftt-card"><div class="ftt-n"></div><div class="ftt-t"></div><p class="ftt-d"></p><div class="ftt-bt"><button type="button" class="ftt-salir">Saltar</button><span class="esp"></span><button type="button" class="ftt-ant">Anterior</button><button type="button" class="ftt-sig"></button></div></div>';
    document.body.appendChild(ov);
    ov.querySelector('.ftt-salir').onclick = () => cerrar(false);
    ov.querySelector('.ftt-ant').onclick = () => { if (paso > 0) { paso--; pintar(); } };
    ov.querySelector('.ftt-sig').onclick = siguiente;
    document.addEventListener('keydown', tecla, true); window.addEventListener('resize', pintar);
    pintar();
  }
  window.ftRecorrido = { iniciar, PASOS };

  // ---------- Arranque automático: una sola vez, cuando ya no hay otra ventana ----------
  function yaVisto() { try { return localStorage.getItem('ft_tour_' + ((auth.currentUser || {}).uid || 'x')) === '1'; } catch (_) { return false; } }
  function intentar() {
    if (!auth.currentUser || yaVisto() || !achievementData.estadoServidor || achievementData.bienvenida) return;
    if (window.ftBienvenida && !ftBienvenida.vista()) return; // primero la bienvenida con confeti
    const barra = $('ftBarra');
    if (!barra && !document.querySelector('.mobile-header')) return;
    window.ftCola.cuandoLibre(() => { if (!yaVisto() && !achievementData.bienvenida) iniciar(false); }, 'recorrido');
  }
  setInterval(intentar, 5000);
})();
