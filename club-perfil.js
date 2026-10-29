/* Club FisioTeck — cajón lateral del perfil (como "Tu espacio" de Alintec Food).
   Al tocar el avatar y el nombre de la barra superior se abre un panel por el lado derecho con tu resumen (XP, clases, cursos) y accesos rápidos
   (Mi perfil, Mis logros, Certificados, Membresía) y Cerrar sesión. En el celular el ícono de tres rayas del encabezado se quita y en su lugar
   queda tu avatar con tu nombre, que abre este mismo panel (el menú completo sigue en «Más», abajo).
   Depende de index.html: auth, showPage, showLogoutPopup, siteData, userProgress, memberIsPaid; de club-logros.js (getTotalXP, ftLogros) y club-avatar.js. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg = d => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  const I = {
    x: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    regalo: svg('<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8C9.5 8 8 7 8 5.5S9.5 3 12 8zM12 8c2.5 0 4-1 4-2.5S14.5 3 12 8z"/>'),
    perfil: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>'),
    logros: svg('<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM5 5H3v2a3 3 0 0 0 3 3M19 5h2v2a3 3 0 0 1-3 3"/>'),
    cert: svg('<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 9h10M7 13h6M9 21l3-3 3 3"/>'),
    plan: svg('<path d="M3 8l4 4 5-7 5 7 4-4v10H3z"/>'),
    salir: svg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>')
  };

  const nombreActual = () => (($('sidebarName') || {}).textContent || (auth.currentUser && auth.currentUser.displayName) || 'Socio').trim();
  const inicial = () => nombreActual().charAt(0).toUpperCase() || 'S';
  const planActual = () => {
    const t = (document.querySelector('.sidebar-user-plan') || {}).textContent;
    if (typeof memberIsPaid !== 'undefined' && !memberIsPaid) return 'Cuenta gratuita';
    return (t || 'Miembro activo').trim();
  };
  // Clases vistas y cursos terminados (del avance que ya tiene el Club cargado)
  function resumen() {
    let clases = 0, cursos = 0;
    try {
      const prog = (typeof userProgress !== 'undefined' && userProgress) || {}, lista = (typeof siteData !== 'undefined' && siteData.courses) || [];
      Object.keys(prog).forEach(k => clases += Array.isArray((prog[k] || {}).completed) ? prog[k].completed.length : 0);
      lista.forEach(c => { const hechas = ((prog[c.id] || {}).completed || []).length, total = (c.lessons || []).length; if (total && hechas >= total) cursos++; });
    } catch (_) { /* sin avance */ }
    return { clases, cursos };
  }
  const avatarHtml = () => {
    const id = window.ftAvatarActual ? ftAvatarActual() : '', u = id && window.ftAvatarUrl ? ftAvatarUrl(id) : '';
    return u ? '<img src="' + esc(u) + '" alt="">' : esc(inicial());
  };

  function abrir() {
    if (!auth.currentUser || $('ftpCajon')) return;
    const r = resumen(), xp = Number(window.getTotalXP ? getTotalXP() : 0) || 0;
    const vel = document.createElement('div'); vel.id = 'ftpVelo'; vel.className = 'ftp-velo';
    const caj = document.createElement('aside'); caj.id = 'ftpCajon'; caj.className = 'ftp-cajon';
    caj.setAttribute('role', 'dialog'); caj.setAttribute('aria-modal', 'true'); caj.setAttribute('aria-label', 'Tu perfil');
    caj.innerHTML = '<div class="ftp-cab"><button type="button" class="ftp-x" aria-label="Cerrar">' + I.x + '</button><div class="ftp-kick">Tu espacio FisioTeck</div>' +
      '<div class="ftp-id"><div class="ftp-foto">' + avatarHtml() + '</div><div class="ftp-datos"><h2>' + esc(nombreActual()) + '</h2><p>' + esc(auth.currentUser.email || '') + '</p><span class="ftp-plan">' + esc(planActual()) + '</span></div></div></div>' +
      '<div class="ftp-cuerpo"><div class="ftp-stats"><div><b id="ftpXp">' + xp.toLocaleString('es-MX') + '</b><span>XP</span></div><div><b>' + r.clases + '</b><span>Clases</span></div><div><b>' + r.cursos + '</b><span>Cursos</span></div></div>' +
      '<button type="button" class="ftp-recomp" data-ir="achievements"><span class="ftp-ic">' + I.regalo + '</span><span><small>Premios</small><strong>Explora tus beneficios</strong><span class="t">Niveles, premios por curso y retos.</span></span></button>' +
      '<div class="ftp-atajos">' +
      '<button type="button" class="ftp-atajo" data-ir="account"><span class="ftp-ic">' + I.perfil + '</span><span><b>Mi perfil</b><small>Datos y tarjeta</small></span></button>' +
      '<button type="button" class="ftp-atajo" data-ir="achievements"><span class="ftp-ic">' + I.logros + '</span><span><b>Mis logros</b><small>Nivel y medallas</small></span></button>' +
      '<button type="button" class="ftp-atajo" data-ir="certificates"><span class="ftp-ic">' + I.cert + '</span><span><b>Certificados</b><small>Descarga los tuyos</small></span></button>' +
      '<button type="button" class="ftp-atajo" data-ir="subscription"><span class="ftp-ic">' + I.plan + '</span><span><b>Membresía</b><small>Plan y renovación</small></span></button></div>' +
      '<div class="ftp-tip"><b>Tu siguiente avance empieza aquí.</b>Cada clase, reto o aporte a la comunidad suma a tu progreso.</div>' +
      '<div class="ftp-salir"><button type="button" data-salir>' + I.salir + 'Cerrar sesión</button></div></div>';
    document.body.appendChild(vel); document.body.appendChild(caj);
    document.body.classList.add('ftp-abierto');
    const previo = document.activeElement;
    const alTeclado = e => { if (e.key === 'Escape') cerrar(); };
    function cerrar(despues) {
      document.removeEventListener('keydown', alTeclado);
      vel.classList.remove('on'); caj.classList.remove('on'); document.body.classList.remove('ftp-abierto');
      setTimeout(() => { vel.remove(); caj.remove(); try { if (previo && previo.focus) previo.focus(); } catch (_) { /* sin foco */ } if (typeof despues === 'function') despues(); }, 240);
    }
    document.addEventListener('keydown', alTeclado);
    vel.onclick = () => cerrar();
    caj.querySelector('.ftp-x').onclick = () => cerrar();
    caj.querySelectorAll('[data-ir]').forEach(b => b.onclick = () => cerrar(() => showPage(b.dataset.ir)));
    caj.querySelector('[data-salir]').onclick = () => cerrar(() => { if (typeof showLogoutPopup === 'function') showLogoutPopup(); });
    requestAnimationFrame(() => requestAnimationFrame(() => { vel.classList.add('on'); caj.classList.add('on'); try { caj.querySelector('.ftp-x').focus(); } catch (_) { /* sin foco */ } }));
    // XP real del servidor, por si todavía no estaba cargado
    try { if (window.ftLogros && ftLogros.actualizar) Promise.resolve(ftLogros.actualizar('/api/logros')).then(() => { const e = $('ftpXp'); if (e) e.textContent = (Number(getTotalXP()) || 0).toLocaleString('es-MX'); }).catch(() => { /* sin servidor */ }); } catch (_) { /* sin logros */ }
  }

  // ---------- Encabezado del celular: avatar y nombre en lugar de las tres rayas ----------
  function montarMovil() {
    const mh = document.querySelector('.mobile-header'), der = mh && mh.lastElementChild; // el grupo de la derecha (tema y campana), no el del logo
    if (!der || der === mh.firstElementChild || $('ftpMovil')) return;
    const b = document.createElement('button');
    b.type = 'button'; b.id = 'ftpMovil'; b.className = 'ftp-chip'; b.setAttribute('aria-label', 'Abrir mi perfil');
    b.innerHTML = '<span class="ftp-chip-av" id="ftpMovilAv"></span><span class="ftp-chip-n" id="ftpMovilN">Socio</span>';
    b.onclick = abrir;
    der.appendChild(b);
    refrescar();
  }
  function refrescar() {
    const n = $('ftpMovilN'), a = $('ftpMovilAv');
    if (n) { const p = nombreActual().split(/\s+/)[0] || 'Socio'; if (n.textContent !== p) n.textContent = p; }
    if (a) { const h = avatarHtml(); if (a.innerHTML !== h) a.innerHTML = h; }
  }

  window.ftPerfil = { abrir, refrescar };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montarMovil); else montarMovil();
  setTimeout(montarMovil, 1200);
  setInterval(refrescar, 3000);
})();
