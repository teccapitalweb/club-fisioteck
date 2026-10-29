/* Club FisioTeck — detalles de navegación y accesibilidad (como Alintec y Zoorigen):
   · barra inferior del celular distinta según el plan (miembro: Inicio, Cursos, En vivo, Retos, Más · cuenta gratuita: Inicio, Cursos, Retos, Logros, Más),
   · "Instalar app" fijo en el menú lateral,
   · aria-current en el menú, regiones aria-live en las listas que cargan y estados vacíos con un botón que lleva a la acción.
   Depende de index.html: showPage, toggleSidebar, memberIsPaid, showToast. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const CASA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
  const ic = id => id === 'home' ? CASA : '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><use href="#' + id + '"/></svg>';

  // ---------- Barra inferior por plan ----------
  const MIEMBRO = [['home', 'Inicio', 'home'], ['library', 'Cursos', 'f-book'], ['courses-live', 'En vivo', 'f-live'], ['retos', 'Retos', 'f-target']];
  const GRATIS = [['home', 'Inicio', 'home'], ['library', 'Cursos', 'f-book'], ['retos', 'Retos', 'f-target'], ['achievements', 'Logros', 'f-trophy']];
  let ultimo = '';
  function barraInferior() {
    const nav = document.querySelector('.mobile-bottom'); const mas = $('mobileMoreBtn');
    if (!mas) return;
    const cont = mas.parentNode, plan = (typeof memberIsPaid !== 'undefined' && memberIsPaid) ? 'm' : 'g';
    if (plan === ultimo) return;
    ultimo = plan;
    cont.querySelectorAll('.mobile-bottom-item[data-page]').forEach(b => b.remove());
    (plan === 'm' ? MIEMBRO : GRATIS).forEach(([pagina, texto, icono]) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'mobile-bottom-item'; b.dataset.page = pagina; b.setAttribute('aria-label', texto);
      b.setAttribute('onclick', "showPage('" + pagina + "')");
      b.innerHTML = ic(icono) + '<span>' + texto + '</span>';
      cont.insertBefore(b, mas);
    });
    marcarActual();
    void nav;
  }

  // ---------- aria-current ----------
  function marcarActual() {
    const activa = document.querySelector('.section.active'); if (!activa) return;
    const pagina = activa.id.replace(/^page-/, '');
    document.querySelectorAll('.nav-item[data-page], .mobile-bottom-item[data-page]').forEach(n => {
      const es = n.getAttribute('data-page') === pagina;
      if (es) n.setAttribute('aria-current', 'page'); else n.removeAttribute('aria-current');
      if (n.classList.contains('mobile-bottom-item')) n.classList.toggle('active', es);
    });
  }

  // ---------- Instalar app en el menú ----------
  let instalacion = null;
  window.addEventListener('beforeinstallprompt', e => { instalacion = e; mostrarInstalar(); });
  const instalada = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  function mostrarInstalar() {
    if (instalada()) { const x = $('navInstalar'); if (x) x.remove(); return; }
    if ($('navInstalar')) return;
    const ref = document.querySelector('.sidebar-nav .nav-item[data-page="settings"]') || document.querySelector('.sidebar-nav .nav-item[data-page="account"]');
    if (!ref) return;
    const a = document.createElement('div');
    a.className = 'nav-item'; a.id = 'navInstalar'; a.setAttribute('role', 'button'); a.tabIndex = 0;
    a.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12"/><path d="M7 11l5 5 5-5"/><path d="M5 21h14"/></svg> Instalar app';
    const accion = async () => {
      if (instalacion) { instalacion.prompt(); try { await instalacion.userChoice; } catch (_) { /* sigue */ } instalacion = null; return; }
      const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
      showToast(ios ? 'En Safari toca Compartir y luego «Agregar a pantalla de inicio».' : 'Abre el menú del navegador y elige «Instalar aplicación».');
    };
    a.onclick = accion; a.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); accion(); } };
    ref.insertAdjacentElement('afterend', a);
  }

  // ---------- Regiones aria-live y estados vacíos con acción ----------
  function vivas() { ['certList', 'memberNotifList', 'retosContenido', 'ftInicio', 'achievementsContent', 'forumList'].forEach(id => { const el = $(id); if (el && !el.hasAttribute('aria-live')) el.setAttribute('aria-live', 'polite'); }); }
  const BTN = 'margin-top:14px;padding:10px 20px;border-radius:var(--radius-sm);border:0;background:var(--accent);color:var(--on-accent,#fff);font:inherit;font-weight:700;cursor:pointer;';
  function vacios() {
    const cert = $('certList');
    if (cert && /Aún no tienes certificados/.test(cert.textContent) && !cert.querySelector('.ft-vacio-cta')) {
      const d = document.createElement('div'); d.className = 'ft-vacio-cta'; d.style.textAlign = 'center';
      d.innerHTML = '<button type="button" style="' + BTN + '" onclick="showPage(\'library\')">Ir a mis cursos</button>';
      cert.appendChild(d);
    }
    const nt = $('memberNotifList');
    if (nt && /No hay notificaciones por ahora/.test(nt.textContent) && !nt.querySelector('.ft-vacio-cta')) {
      const d = document.createElement('div'); d.className = 'ft-vacio-cta'; d.style.textAlign = 'center';
      d.innerHTML = '<button type="button" style="' + BTN + '" onclick="showPage(\'library\')">Explorar los cursos</button>';
      nt.appendChild(d);
    }
  }

  const original = window.showPage;
  window.showPage = function (page) { const r = original.apply(this, arguments); setTimeout(() => { marcarActual(); vivas(); vacios(); }, 80); return r; };
  setInterval(() => { barraInferior(); mostrarInstalar(); vivas(); vacios(); marcarActual(); }, 2500);
  barraInferior(); mostrarInstalar(); vivas();
})();
