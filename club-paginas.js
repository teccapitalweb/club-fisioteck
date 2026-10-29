/* Club FisioTeck — contenido interno de Logros, Certificados, Perfil y Foro con la estructura de Alintec Food (colores de FisioTeck).
   Logros: nivel con pasos y círculo de avance, tarjetas de cifras, insignias por categoría con conteo.
   Certificados: tarjetas con medalla, cifras y folio. Perfil: tarjeta de cuenta y "Tu actividad". Foro: caja para publicar, pestañas y tarjetas.
   No cambia datos ni reglas: el XP, las insignias y los certificados siguen saliendo del servidor (club-logros.js, club-certificado.js).
   Depende de index.html: LEVELS, BADGES, achievementData, getTotalXP, getLevel, getPlayerStats, forumPosts, auth, openThread, openNewPostModal, getTimeAgo. */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = id => document.getElementById(id);
  const CAT = { cursos: ['Cursos', '#0D5FA0'], constancia: ['Constancia', '#C2760B'], especial: ['Especiales', '#7C3AED'], retos: ['Retos', '#159E92'] };

  // ───────── Premios por nivel y por invitar (cada uno abre UN curso antes de su fecha) ─────────
  const COPA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4h8v6a4 4 0 0 1-8 0zM8 6H4v2a3 3 0 0 0 4 2.8M16 6h4v2a3 3 0 0 1-4 2.8M12 14v4M8 21h8"/></svg>';
  const GENTE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>';
  const nombreCurso = id => { const c = ((typeof siteData !== 'undefined' && siteData.courses) || []).find(x => String(x.id) === String(id)); return c ? c.title : 'Curso'; };
  const PREMIOS_BASE = [
    { clave: 'nivel-profesional', titulo: 'Profesional', minXp: 2500, tipo: 'nivel' },
    { clave: 'nivel-maestro', titulo: 'Maestro', minXp: 6000, tipo: 'nivel' },
    { clave: 'referidos-1', titulo: 'Invitar a 4 amigos', tipo: 'invitar' }
  ];
  function premiosDe(xp) {
    const R = window.ftReferidos && ftReferidos.datos, srv = R && R.premios ? R.premios : [];
    return PREMIOS_BASE.map(b => {
      const p = srv.find(x => x.clave === b.clave) || {};
      const ganado = p.ganado === true || (b.minXp !== undefined && xp >= b.minXp);
      return { ...b, ganado, usado: p.usado || null, faltan: b.minXp !== undefined ? Math.max(0, b.minXp - xp) : (R ? R.premio.faltan : 4), validos: R ? R.validos : 0 };
    });
  }
  function bloquePremios(xp) {
    const paga = typeof memberIsPaid !== 'undefined' && memberIsPaid;
    const lista = premiosDe(xp), libres = lista.filter(p => p.ganado && !p.usado).length;
    const tarjeta = p => {
      let pie;
      if (p.usado) pie = '<span class="ok">Usado: ' + esc(nombreCurso(p.usado.cursoId)) + '</span>';
      else if (p.ganado && paga) pie = '<button type="button" class="ftd-btn pequeno" onclick="ftReferidos.elegirCurso(\'' + p.clave + '\')">Elegir mi curso</button>';
      else if (p.ganado) pie = '<span class="no">Activa tu membresía para usarlo</span>';
      else pie = '<span class="no">' + (p.tipo === 'nivel' ? 'Te faltan ' + p.faltan + ' XP' : 'Te faltan ' + p.faltan + ' amigo' + (p.faltan === 1 ? '' : 's') + ' válido' + (p.faltan === 1 ? '' : 's')) + '</span>';
      return '<div class="ftl-meta' + (p.ganado ? ' ganada' : '') + '"><div class="ico">' + (p.tipo === 'nivel' ? COPA : GENTE) + '</div><div class="cuerpo"><small>' + (p.tipo === 'nivel' ? 'Meta de trayectoria' : 'Meta de la comunidad') + '</small><h4>' + esc(p.titulo) + '</h4>' +
        '<p>1 curso antes de tiempo' + (p.minXp ? ' · ' + p.minXp + ' XP' : '') + '</p><div class="pie">' + pie + '</div></div></div>';
    };
    return '<section class="ftl-premios"><header><div class="ico">' + COPA + '</div><div><small>Premios · recompensas de trayectoria</small><h3>Tu progreso también <em>abre puertas.</em></h3>' +
      '<p>Cada meta te permite abrir un curso bloqueado antes de su fecha, el que tú elijas. Se usa una sola vez por premio.</p></div><div class="cuenta"><b>' + libres + '</b><span>premio' + (libres === 1 ? '' : 's') + ' disponible' + (libres === 1 ? '' : 's') + '</span></div></header>' +
      '<div class="ftl-metas">' + lista.map(tarjeta).join('') + '</div></section>';
  }
  function bloqueReferidos() {
    const R = window.ftReferidos && ftReferidos.datos, paga = typeof memberIsPaid !== 'undefined' && memberIsPaid;
    if (!paga) return '<section class="ftl-ref"><div><small>Invitar amigos</small><h3>Invita y gana un curso</h3><p>Invitar amigos es para miembros. Con 4 invitados válidos abres un curso antes de su fecha.</p></div><button type="button" class="ftd-btn" onclick="showPaywallOverlay()">Ver membresía</button></section>';
    const v = R ? Math.min(R.validos, 4) : 0, pct = Math.round(v / 4 * 100);
    return '<section class="ftl-ref"><div class="txt"><small>Invitar amigos</small><h3>Invita a 4 colegas, abre un curso</h3><p>' + (R ? 'Llevas <b>' + R.validos + '</b> invitado' + (R.validos === 1 ? '' : 's') + ' válido' + (R.validos === 1 ? '' : 's') + (R.pendientes ? ' y ' + R.pendientes + ' por confirmar' : '') + '. Cada invitado confirmado también suma XP a tu nivel.' : (window.ftReferidos && ftReferidos.error ? 'No pudimos cargar tu avance ahora. Intenta de nuevo en un momento.' : 'Cargando tu avance…')) + '</p>' +
      '<div class="ftl-barra"><i style="width:' + pct + '%"></i></div><small class="num">' + v + ' de 4 invitados válidos</small></div>' +
      '<div class="acc"><button type="button" class="ftd-btn" onclick="ftReferidos.copiar()">Copiar mi enlace</button><button type="button" class="ftd-btn suave" onclick="showPage(\'referidos\')">Ver mis invitados</button></div></section>';
  }

  // ───────── Logros ─────────
  function logros() {
    const cont = $('achievementsContent'); if (!cont) return;
    const xp = getTotalXP(), nivel = getLevel(xp), i = LEVELS.indexOf(nivel), sig = LEVELS[i + 1];
    const pct = sig ? Math.min(100, Math.round((xp - nivel.min) / (sig.min - nivel.min) * 100)) : 100;
    const ganadas = new Set(achievementData.unlocked || []), st = getPlayerStats(), racha = achievementData.streak || 0;
    const pasos = LEVELS.map((l, k) => '<div class="ftl-paso ' + (k < i ? 'hecho' : k === i ? 'actual' : '') + '"><span>' + (k < i ? '&#10003;' : k + 1) + '</span><small>' + esc(l.name.replace(' FisioTeck', '')) + '</small></div>').join('<i></i>');
    const cats = Object.keys(CAT).filter(c => BADGES.some(b => b.cat === c));
    const xpInsignias = BADGES.filter(b => ganadas.has(b.id)).reduce((a, b) => a + (b.xp || 0), 0);
    cont.innerHTML =
      '<section class="ftl-nivel"><div class="ftl-nivel-cab"><div class="ftl-nivel-ico">' + nivel.icon + '</div><div><small>Nivel ' + (i + 1) + ' de ' + LEVELS.length + '</small><h2>' + esc(nivel.name) + '</h2></div>' +
      '<div class="ftl-racha" title="Días seguidos">' + racha + ' <small>día' + (racha === 1 ? '' : 's') + '</small></div></div>' +
      '<div class="ftl-pasos">' + pasos + '</div>' +
      '<div class="ftl-sig"><div class="ftl-aro" style="--p:' + pct + '"><b>' + pct + '%</b><small>avance</small></div><div><small>' + (sig ? 'Siguiente rango' : 'Rango máximo') + '</small><h3>' + (sig ? esc(sig.name) : esc(nivel.name)) + '</h3>' +
      '<p>' + (sig ? 'Te faltan <b>' + (sig.min - xp) + ' XP</b> para llegar a ' + sig.min + ' XP. Cada insignia y reto completado acerca tu perfil al siguiente rango.' : 'Llegaste al nivel más alto del Club.') + '</p>' +
      '<div class="ftl-chips"><span>' + xp + ' XP actuales</span>' + (sig ? '<span>' + sig.min + ' XP objetivo</span>' : '') + '</div></div></div></section>' +
      bloquePremios(xp) + bloqueReferidos() +
      '<div class="ftl-kpis"><div style="--k:#0F9D58"><small>Logros ganados</small><b>' + ganadas.size + '<em> /' + BADGES.length + '</em></b></div><div style="--k:#0D5FA0"><small>XP de logros</small><b>' + xpInsignias + '</b></div>' +
      '<div style="--k:#C2760B"><small>Clases vistas</small><b>' + st.totalLessons + '</b></div><div style="--k:#7C3AED"><small>Cursos completos</small><b>' + st.completedCourses + '</b></div></div>' +
      cats.map(c => {
        const lista = BADGES.filter(b => b.cat === c), ok = lista.filter(b => ganadas.has(b.id)).length;
        return '<section class="ftl-cat" style="--c:' + CAT[c][1] + '"><header><h3>' + CAT[c][0] + '</h3><span>' + ok + '/' + lista.length + '</span></header><div class="ftl-ins">' +
          lista.map(b => { const u = ganadas.has(b.id); return '<div class="ftl-badge' + (u ? ' on' : '') + '" title="' + esc(b.desc) + '"><div class="rombo"><span>' + b.icon + '</span></div><strong>' + esc(b.name) + '</strong><small>' + esc(b.desc) + '</small><em>' + (u ? 'Desbloqueada' : '+' + b.xp + ' XP') + '</em></div>'; }).join('') + '</div></section>';
      }).join('');
  }
  window.renderAchievements = logros;

  // ───────── Certificados ─────────
  const MEDALLA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.5 14.5L7 22l5-3 5 3-1.5-7.5"/></svg>';
  function certificados() {
    const caja = $('certList'); if (!caja) return;
    const pdfs = caja.querySelectorAll('a[href*="/pdf"]');
    pdfs.forEach(a => {
      const tarjeta = a.closest('div[style*="border-radius"]');
      if (!tarjeta || tarjeta.classList.contains('ftd-cert')) return;
      tarjeta.classList.add('ftd-cert');
      const m = document.createElement('div'); m.className = 'ftd-cert-medalla'; m.innerHTML = MEDALLA; tarjeta.insertBefore(m, tarjeta.firstChild);
      a.textContent = 'Ver certificado'; a.classList.add('ftd-cert-ver');
    });
    const grid = caja.querySelector('div[style*="grid-template-columns"]');
    if (grid) grid.classList.add('ftd-cert-grid');
    if (pdfs.length && !caja.querySelector('.ftd-cert-kpis')) {
      const st = typeof getPlayerStats === 'function' ? getPlayerStats() : { completedCourses: pdfs.length };
      caja.insertAdjacentHTML('afterbegin', '<div class="ftl-kpis ftd-cert-kpis"><div style="--k:#0D5FA0"><small>Certificados</small><b>' + pdfs.length + '</b></div><div style="--k:#159E92"><small>Cursos completos</small><b>' + st.completedCourses + '</b></div><div style="--k:#C2760B"><small>Con folio y QR</small><b>' + pdfs.length + '</b></div><div style="--k:#0F9D58"><small>Verificables</small><b>100<em> %</em></b></div></div>');
    }
  }
  const lc = window.loadCertificates;
  if (typeof lc === 'function') window.loadCertificates = async function () { const r = await lc.apply(this, arguments); certificados(); return r; };

  // ───────── Canal: WhatsApp, Facebook e Instagram y reglas de la comunidad (como Alintec) ─────────
  const REDES = {
    facebook: 'https://www.facebook.com/profile.php?id=61578034067438',
    instagram: 'https://www.instagram.com/fisioteccc/'
  };
  const IC_FB = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.6V13h2.8v8z"/></svg>';
  const IC_IG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';
  const REGLAS = [['Respeto siempre.', 'Tratamos a todos los colegas con profesionalismo. Sin política, sin religión y sin ataques personales.'],
    ['Comparte casos con cuidado.', 'Si compartes un caso clínico, protege al paciente: nunca pongas su nombre, rostro ni datos que lo identifiquen.'],
    ['Nada de spam.', 'No promociones tus servicios ni vendas cursos externos. La comunidad es para aprender.'],
    ['Confidencialidad.', 'Lo que se comparte aquí queda aquí. No hagas capturas para publicarlas fuera del Club sin permiso.']];
  function canal() {
    const pg = $('page-community'), cont = pg && pg.querySelector(':scope > div[style*="max-width"]');
    if (!pg || !cont || $('ftdRedes')) return;
    pg.classList.add('ftd-canal');
    cont.insertAdjacentHTML('beforeend',
      '<section class="ftd-redes" id="ftdRedes"><h3>Síguenos también en redes</h3><p>Noticias, tips de fisioterapia y avisos de nuevos cursos.</p><div class="botones">' +
      '<a class="fb" href="' + REDES.facebook + '" target="_blank" rel="noopener noreferrer">' + IC_FB + ' Facebook</a>' +
      '<a class="ig" href="' + REDES.instagram + '" target="_blank" rel="noopener noreferrer">' + IC_IG + ' Instagram</a></div><button type="button" class="ftd-btn suave ftd-compartir" onclick="ftCompartirCanal()">Compartir invitación al canal</button></section>' +
      '<section class="ftd-reglas"><small>Reglas de la comunidad</small><ul>' + REGLAS.map(x => '<li><i></i><div><b>' + esc(x[0]) + '</b> ' + esc(x[1]) + '</div></li>').join('') + '</ul></section>');
  }
  canal();
  window.ftCompartirCanal = async function () {
    const url = 'https://whatsapp.com/channel/0029VbCICRYDp2Q2iNyLe92e', texto = 'Sigue el canal del Club FisioTeck: avisos de cursos, tips y contenido de fisioterapia.';
    try { if (navigator.share) { await navigator.share({ title: 'Canal Club FisioTeck', text: texto, url }); return; } await navigator.clipboard.writeText(texto + ' ' + url); showToast('Invitación copiada'); }
    catch (_) { window.open('https://wa.me/?text=' + encodeURIComponent(texto + ' ' + url), '_blank', 'noopener'); }
  };

  // ───────── Perfil: editar nombre y datos ─────────
  // Guarda con set(merge) (no falla si el documento aún no existe), valida el nombre, muestra el motivo real si algo falla
  // y refresca al instante el nombre en el menú, la barra de arriba y la tarjeta del perfil.
  const LAPIZ = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';
  window.saveProfile = async function (origen) {
    const user = (typeof auth !== 'undefined' ? auth.currentUser : null); if (!user) return;
    const modal = origen === 'modal', val = id => ((document.getElementById(id) || {}).value || '').trim();
    const nombre = val(modal ? 'pfNombre' : 'accName').replace(/\s+/g, ' '), tel = val(modal ? 'pfTel' : 'accPhone'), esp = val(modal ? 'pfEsp' : 'accSpecialty');
    const err = document.getElementById('pfError'), fallo = m => { if (err) { err.textContent = m; err.style.display = 'block'; } showToast(m); };
    if (nombre.length < 2) return fallo('Escribe tu nombre completo (al menos 2 letras).');
    if (nombre.length > 80) return fallo('El nombre es demasiado largo (máximo 80 caracteres).');
    if (tel.length > 30 || esp.length > 80) return fallo('Revisa el teléfono o la especialidad: son demasiado largos.');
    const btn = document.getElementById('pfGuardar'); if (btn) { btn.disabled = true; btn.textContent = 'Guardando…'; }
    try {
      await db.collection('members').doc(user.uid).set({ name: nombre, phone: tel, specialty: esp }, { merge: true });
      try { await user.updateProfile({ displayName: nombre }); } catch (_) { /* el nombre del miembro ya quedó guardado */ }
      await loadUserProfile();
      ['accName', 'accPhone', 'accSpecialty'].forEach(id => { const e = document.getElementById(id); if (e && id === 'accName') e.value = nombre; });
      const m = document.getElementById('pfModal'); if (m) m.classList.remove('abierto');
      showToast('Perfil actualizado correctamente');
    } catch (e) {
      fallo(e && e.code === 'permission-denied' ? 'No tienes permiso para guardar este dato. Cierra sesión, vuelve a entrar e intenta de nuevo.' : 'No se pudo guardar. Revisa tu conexión e intenta de nuevo.');
      console.warn('[perfil] guardar', e);
    }
    if (btn) { btn.disabled = false; btn.textContent = 'Guardar cambios'; }
  };
  function abrirEditar() {
    let o = document.getElementById('pfModal');
    if (!o) { o = document.createElement('div'); o.id = 'pfModal'; o.className = 'pf-overlay'; o.addEventListener('mousedown', e => { if (e.target === o) o.classList.remove('abierto'); }); document.body.appendChild(o); }
    const g = id => ((document.getElementById(id) || {}).value || '');
    o.innerHTML = '<div class="pf-caja" role="dialog" aria-modal="true" aria-label="Editar perfil"><h3>Editar perfil</h3><p>Tu nombre aparece en el menú, en el foro y en tus certificados nuevos.</p>' +
      '<label>Nombre completo<input id="pfNombre" maxlength="80" autocomplete="name" value="' + esc(g('accName')) + '"></label>' +
      '<label>Teléfono (opcional)<input id="pfTel" maxlength="30" autocomplete="tel" value="' + esc(g('accPhone')) + '"></label>' +
      '<label>Especialidad<input id="pfEsp" maxlength="80" placeholder="Ej: Fisioterapia deportiva" value="' + esc(g('accSpecialty')) + '"></label>' +
      '<div id="pfError" class="pf-error" role="alert" style="display:none"></div>' +
      '<div class="pf-acc"><button type="button" class="ftd-btn suave" id="pfCancelar">Cancelar</button><button type="button" class="ftd-btn" id="pfGuardar">Guardar cambios</button></div></div>';
    o.classList.add('abierto');
    document.getElementById('pfCancelar').onclick = () => o.classList.remove('abierto');
    document.getElementById('pfGuardar').onclick = () => window.saveProfile('modal');
    o.querySelectorAll('input').forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') window.saveProfile('modal'); if (e.key === 'Escape') o.classList.remove('abierto'); }));
    setTimeout(() => { const n = document.getElementById('pfNombre'); if (n) { n.focus(); n.select(); } }, 50);
  }
  window.ftEditarPerfil = abrirEditar;

  // ───────── Perfil ─────────
  function perfil() {
    const pg = $('page-account'), grid = pg && pg.querySelector('.account-grid'); if (!grid) return;
    pg.classList.add('ftd-perfil');
    const cab = pg.querySelector('.account-avatar-section');
    if (cab && !cab.querySelector('.pf-editar')) { const b = document.createElement('button'); b.type = 'button'; b.className = 'ftd-btn suave pf-editar'; b.innerHTML = LAPIZ + ' Editar perfil'; b.onclick = abrirEditar; cab.appendChild(b); }
    const gb = grid.querySelector('.btn-primary'); if (gb) gb.setAttribute('onclick', "saveProfile('form')");
    let c = $('ftdActividad');
    if (!c) { c = document.createElement('div'); c.id = 'ftdActividad'; c.className = 'card'; grid.appendChild(c); }
    const st = typeof getPlayerStats === 'function' ? getPlayerStats() : { completedCourses: 0, totalLessons: 0 };
    const u = (typeof auth !== 'undefined' ? auth.currentUser : null), ult = u && u.metadata && u.metadata.lastSignInTime ? new Date(u.metadata.lastSignInTime).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
    const nivel = typeof getLevel === 'function' ? getLevel(getTotalXP()).name : '';
    c.innerHTML = '<h3 style="font-size:1rem;font-weight:600;margin-bottom:16px;">Tu actividad</h3><dl class="ftd-dl">' +
      '<div><dt>Nivel</dt><dd>' + esc(nivel) + '</dd></div><div><dt>Cursos completos</dt><dd>' + st.completedCourses + '</dd></div><div><dt>Clases vistas</dt><dd>' + st.totalLessons + '</dd></div>' +
      '<div><dt>Racha</dt><dd>' + ((window.achievementData && achievementData.streak) || 0) + ' días</dd></div><div><dt>Último inicio de sesión</dt><dd>' + esc(ult) + '</dd></div></dl>';
  }

  // ───────── Foro ─────────
  let pestana = 'recientes', filtroCat = '';
  const COLORES = ['#0D5FA0', '#159E92', '#C2760B', '#7C3AED', '#DC2D3F', '#0F9D58'];
  const CATEG = { general: 'General', dudas: 'Dudas', casos: 'Casos clínicos', tips: 'Tips', recursos: 'Recursos' };
  const CORAZON = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-4.6-9.3-9.2C1.1 8.6 3 5 6.4 5c2 0 3.6 1.2 4.4 2.6h.4C12 6.2 13.6 5 15.6 5 19 5 20.9 8.6 19.3 11.8 17 16.4 12 21 12 21z" fill="none"/></svg>';
  const GLOBO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>';
  function foro() {
    const pg = $('page-forum'), lista = $('forumPosts'); if (!pg || !lista) return;
    pg.classList.add('ftd-foro');
    const u = (typeof auth !== 'undefined' ? auth.currentUser : null), yo = u ? u.uid : '', nombre = (u && (u.displayName || u.email)) || 'Socio';
    let c = $('ftdForoCaja');
    if (!c) { c = document.createElement('div'); c.id = 'ftdForoCaja'; lista.parentNode.insertBefore(c, lista); }
    c.innerHTML = '<button type="button" class="ftd-foro-caja" onclick="openNewPostModal()"><span class="av" style="background:' + COLORES[0] + '">' + esc(nombre.charAt(0).toUpperCase()) + '</span><span class="txt">¿Qué pasa en tu consulta? Comparte un caso o haz una pregunta…</span><b>Publicar</b></button>' +
      '<div class="ftd-tabs ftd-foro-tabs" role="tablist">' + [['recientes', 'Recientes'], ['reacciones', 'Más reacciones'], ['mias', 'Mis publicaciones']].map(t => '<button type="button" role="tab" aria-selected="' + (pestana === t[0]) + '" class="' + (pestana === t[0] ? 'on' : '') + '" data-ft="' + t[0] + '">' + t[1] + '</button>').join('') + '</div>' +
      '<div class="ftd-chips ftd-foro-cats" role="group" aria-label="Categoría"><button type="button" class="' + (!filtroCat ? 'on' : '') + '" data-cat="">Todas</button>' + Object.keys(CATEG).map(k => '<button type="button" class="' + (filtroCat === k ? 'on' : '') + '" data-cat="' + k + '">' + CATEG[k] + '</button>').join('') + '</div>';
    c.querySelectorAll('[data-cat]').forEach(b => b.onclick = () => { filtroCat = b.dataset.cat; foro(); pintarForo(); });
    c.querySelectorAll('[data-ft]').forEach(b => b.onclick = () => { pestana = b.dataset.ft; foro(); pintarForo(); });
  }
  // Publicaciones de ejemplo (personas y casos inventados) para que el foro se vea vivo antes de que haya conversaciones reales
  const EJEMPLOS = [
    { autor: 'Valeria M.', cat: 'casos', hace: 'hace 2 h', titulo: 'Dolor de hombro en nadadora: ¿por dónde empiezan?', texto: 'Paciente de 24 años, nada seis días a la semana. Dolor anterior al elevar el brazo desde hace un mes. Estoy dudando entre empezar con control escapular o con movilidad de la cápsula posterior. ¿Cómo lo abordan?', likes: 12, resp: 4 },
    { autor: 'Daniel R.', cat: 'dudas', hace: 'hace 5 h', titulo: 'Progresión de carga tras reconstrucción de LCA', texto: 'En la semana 8 mi paciente ya extiende completo y no tiene derrame. Quiero empezar con prensa y sentadilla con apoyo. ¿Qué criterios usan antes de subir la carga?', likes: 8, resp: 3 },
    { autor: 'Fernanda L.', cat: 'tips', hace: 'ayer', titulo: 'Un truco para explicar la escala EVA a adultos mayores', texto: 'Con una regla impresa grande y caritas me ha funcionado mucho mejor que pedir un número. Les cuesta menos señalar que decir un valor. Les comparto por si les sirve.', likes: 21, resp: 6 },
    { autor: 'Iván S.', cat: 'recursos', hace: 'hace 2 días', titulo: 'Rangos de movimiento: ¿qué referencia usan en consulta?', texto: 'Estoy armando una hoja de registro para goniometría. Si tienen una plantilla que les funcione, me encantaría ver cómo la organizan.', likes: 15, resp: 5 },
    { autor: 'Camila P.', cat: 'casos', hace: 'hace 3 días', titulo: 'Paciente post-ictus con poco control de tronco', texto: 'Llegó hace dos semanas y se cansa muy rápido sentado. Estoy trabajando alcances con apoyo y transferencias. ¿Qué ejercicios les han dado resultado en esta etapa?', likes: 9, resp: 7 },
    { autor: 'Andrés T.', cat: 'general', hace: 'hace 4 días', titulo: 'Bienvenidos al foro del Club', texto: 'Este es un espacio para compartir casos, dudas y recursos entre colegas. Cuéntanos qué te gustaría aprender este mes.', likes: 30, resp: 2 }
  ];
  function ejemplosHTML() {
    return EJEMPLOS.map(p => {
      const color = COLORES[Math.abs(p.autor.split('').reduce((a, ch) => a + ch.charCodeAt(0), 0)) % COLORES.length];
      return '<article class="ftd-post ejemplo"><span class="av" style="background:' + color + '">' + esc(p.autor.charAt(0)) + '</span><div class="cuerpo"><header><strong>' + esc(p.autor) + '</strong><span class="tag">' + esc(CATEG[p.cat] || p.cat) + '</span><span class="ej">Ejemplo</span><time>' + esc(p.hace) + '</time></header>' +
        '<h4>' + esc(p.titulo) + '</h4><p>' + esc(p.texto) + '</p><footer><span>' + CORAZON + p.likes + '</span><span>' + GLOBO + p.resp + ' respuestas</span></footer></div></article>';
    }).join('');
  }
  function pintarForo() {
    const cont = $('forumPosts'); if (!cont || typeof forumPosts === 'undefined') return;
    const yo = (typeof auth !== 'undefined' && auth.currentUser) ? auth.currentUser.uid : '';
    const paga = typeof memberIsPaid !== 'undefined' && memberIsPaid;
    if (!paga) {
      cont.innerHTML = '<div class="ftd-foro-aviso"><b>Vista previa</b> con publicaciones de ejemplo. Las conversaciones reales son solo para miembros.</div>' +
        '<div class="ftd-foro-unete"><div><strong>Únete al Club para participar</strong><span>Así se ve el foro. Para publicar, comentar y reaccionar necesitas tu membresía activa.</span></div><button type="button" class="ftd-btn" onclick="showPaywallOverlay()">Ver membresía</button></div>' + ejemplosHTML();
      return;
    }
    let l = forumPosts.slice();
    if (pestana === 'reacciones') l.sort((a, b) => (b.likes || []).length - (a.likes || []).length);
    if (pestana === 'mias') l = l.filter(p => p.authorId === yo);
    if (filtroCat) l = l.filter(p => (p.category || 'general') === filtroCat);
    if (!l.length) {
      cont.innerHTML = pestana === 'mias' ? '<div class="ftd-foro-vacio">Aún no has publicado nada.</div>'
        : '<div class="ftd-foro-aviso"><b>Aún no hay temas reales.</b> Mientras tanto, así se verán las publicaciones. Sé el primero en publicar.</div>' + ejemplosHTML();
      return;
    }
    cont.innerHTML = l.map(p => {
      const fecha = p.createdAt && p.createdAt.seconds ? new Date(p.createdAt.seconds * 1000) : new Date(), n = p.authorName || 'Socio', cat = p.category || 'general', r = p.replyCount || 0;
      const color = COLORES[Math.abs(String(p.authorId || n).split('').reduce((a, ch) => a + ch.charCodeAt(0), 0)) % COLORES.length], like = (p.likes || []).includes(yo);
      return '<article class="ftd-post" onclick="openThread(\'' + esc(p.id) + '\')"><span class="av" style="background:' + color + '">' + esc(n.charAt(0).toUpperCase()) + '</span><div class="cuerpo">' +
        '<header><strong>' + esc(n) + '</strong><span class="tag">' + esc(CATEG[cat] || cat) + '</span><time>' + esc(getTimeAgo(fecha)) + '</time></header>' +
        '<h4>' + esc(p.title || 'Sin título') + '</h4><p>' + esc((p.body || '').substring(0, 220)) + ((p.body || '').length > 220 ? '…' : '') + '</p>' + (p.imagen && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(p.imagen) ? '<img class="fotito" src="' + p.imagen + '" alt="" loading="lazy">' : '') +
        '<footer><span class="' + (like ? 'like' : '') + '">' + CORAZON + (p.likes || []).length + '</span><span>' + GLOBO + r + ' respuesta' + (r === 1 ? '' : 's') + '</span></footer></div></article>';
    }).join('');
  }
  window.renderForumPosts = function () { foro(); pintarForo(); };

  // Reaplicar al entrar a cada sección (los datos llegan después de abrirla)
  const pg0 = window.showPage;
  window.showPage = function (page) {
    const r = pg0.apply(this, arguments);
    if (page === 'achievements') { logros(); if (window.ftReferidos && typeof memberIsPaid !== 'undefined' && memberIsPaid) ftReferidos.cargar(true).then(() => { const pa = document.getElementById('page-achievements'); if (pa && pa.classList.contains('active')) logros(); }); }
    if (page === 'forum') { foro(); pintarForo(); }
    if (page === 'account') perfil();
    if (page === 'community') canal();
    if (page === 'certificates') setTimeout(certificados, 600);
    return r;
  };
  window.ftPaginas = { logros, certificados, perfil, foro: () => { foro(); pintarForo(); } };
})();
