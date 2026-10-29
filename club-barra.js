/* Club FisioTeck — barra superior (como Alintec y Zoorigen): buscador global, ayuda, campana de avisos con contador, tema y avatar.
   El buscador usa una sola lista (secciones del menú + cursos y clases + PDF + noticias + clases en vivo), con teclado ("/" para abrirlo,
   flechas, Enter y Esc) y roles de accesibilidad (combobox / listbox). En el celular se abre desde el ícono de la lupa del encabezado.
   Depende de index.html: siteData, showPage, openCourseDetail, openArticle, memberNotifs, notifPrefs, markNotifRead, updateBellBadge,
   toggleTheme, memberIsPaid, achievementData, auth. */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const $ = id => document.getElementById(id);
  const WHATSAPP = 'https://wa.me/5212381478840';

  const estilo = document.createElement('style');
  estilo.textContent = `
  .ftb { position:sticky; top:0; z-index:90; display:flex; align-items:center; gap:14px; margin:-34px -34px 26px; padding:12px 34px; background:var(--surface); border-bottom:1px solid var(--border); backdrop-filter:saturate(180%) blur(12px); }
  .ftb-busca { position:relative; flex:1; max-width:520px; }
  .ftb-busca svg.lupa { position:absolute; left:13px; top:50%; transform:translateY(-50%); width:17px; height:17px; color:var(--text-muted); pointer-events:none; }
  .ftb-in { width:100%; padding:10px 40px 10px 40px; border-radius:12px; border:1px solid var(--border); background:var(--bg); color:var(--text); font:inherit; font-size:.88rem; }
  .ftb-in:focus { outline:2px solid var(--accent); outline-offset:1px; }
  .ftb-tecla { position:absolute; right:12px; top:50%; transform:translateY(-50%); font-size:.68rem; border:1px solid var(--border); border-radius:6px; padding:1px 7px; color:var(--text-muted); }
  .ftb-res { position:absolute; left:0; right:0; top:calc(100% + 8px); max-height:min(70vh,460px); overflow:auto; background:var(--surface); border:1px solid var(--border); border-radius:14px; box-shadow:var(--shadow-lg); padding:6px; display:none; z-index:95; }
  .ftb-res.on { display:block; }
  .ftb-g { padding:8px 10px 4px; font-size:.64rem; letter-spacing:.12em; text-transform:uppercase; color:var(--text-muted); font-weight:700; }
  .ftb-it { display:flex; flex-direction:column; gap:1px; width:100%; text-align:left; padding:9px 11px; border-radius:9px; background:none; border:0; color:var(--text); font:inherit; cursor:pointer; }
  .ftb-it small { color:var(--text-muted); font-size:.74rem; }
  .ftb-it:hover, .ftb-it[aria-selected="true"] { background:var(--accent-ghost); }
  .ftb-vacio { padding:18px 12px; text-align:center; color:var(--text-muted); font-size:.85rem; }
  .ftb-der { margin-left:auto; display:flex; align-items:center; gap:6px; }
  .ftb-btn { position:relative; display:flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:11px; background:none; border:0; color:var(--text-light); cursor:pointer; }
  .ftb-btn:hover { background:var(--accent-ghost); color:var(--text); }
  .ftb-btn svg { width:20px; height:20px; }
  .ftb-punto { position:absolute; top:4px; right:3px; min-width:17px; height:17px; padding:0 4px; border-radius:9px; background:var(--danger); color:#fff; font-size:.62rem; font-weight:700; line-height:17px; text-align:center; display:none; }
  .ftb-racha { display:flex; align-items:center; gap:6px; padding:7px 12px; border-radius:999px; background:var(--accent-ghost); color:var(--accent); font-size:.8rem; font-weight:700; border:0; cursor:pointer; }
  .ftb-user { display:flex; align-items:center; gap:10px; padding:4px 10px 4px 4px; border-radius:999px; border:1px solid var(--border); background:none; color:var(--text); cursor:pointer; font:inherit; }
  .ftb-av { width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,var(--accent),var(--blue)); color:#fff; font-weight:700; display:flex; align-items:center; justify-content:center; font-size:.85rem; }
  .ftb-user span.n { font-size:.82rem; font-weight:600; line-height:1.1; text-align:left; } .ftb-user small { display:block; font-weight:500; color:var(--text-muted); font-size:.68rem; }
  .ftb-pop { position:absolute; right:0; top:calc(100% + 8px); width:min(360px,92vw); background:var(--surface); border:1px solid var(--border); border-radius:14px; box-shadow:var(--shadow-lg); display:none; z-index:96; overflow:hidden; text-align:left; }
  .ftb-pop.on { display:block; }
  .ftb-pop h4 { margin:0; padding:14px 16px 8px; font-size:.9rem; }
  .ftb-aviso { display:block; width:100%; text-align:left; padding:11px 16px; border:0; border-top:1px solid var(--border); background:none; color:var(--text); font:inherit; cursor:pointer; }
  .ftb-aviso.nuevo { background:var(--accent-ghost); } .ftb-aviso b { display:block; font-size:.84rem; } .ftb-aviso span { font-size:.78rem; color:var(--text-light); display:block; margin-top:2px; }
  .ftb-aviso:hover { background:var(--accent-ghost); }
  .ftb-lista { max-height:340px; overflow:auto; }
  .ftb-movil-lupa { background:none; border:none; color:var(--text-light); padding:8px; cursor:pointer; display:flex; align-items:center; }
  .ftb-ov { position:fixed; inset:0; z-index:10050; background:var(--bg); display:none; flex-direction:column; padding:14px; gap:10px; }
  .ftb-ov.on { display:flex; } .ftb-ov .ftb-busca { max-width:none; } .ftb-ov .ftb-res { position:static; display:block; box-shadow:none; border:0; max-height:none; flex:1; }
  .ftb-ov .cerrar { align-self:flex-end; background:none; border:0; color:var(--text-light); font:inherit; padding:6px 10px; }
  @media(max-width:880px){ .ftb { display:none; } }
  @media(min-width:769px){ .ftb-movil-lupa { display:none; } }
  `;
  document.head.appendChild(estilo);

  // ---------- Búsqueda ----------
  function indice() {
    const items = [], sd = (typeof siteData !== 'undefined' && siteData) || {};
    document.querySelectorAll('.sidebar-nav .nav-item[data-page]').forEach(n => {
      const t = n.textContent.replace(/\s+/g, ' ').replace(/Nuevo|Pronto|\d+/g, '').trim();
      if (t) items.push({ g: 'Secciones', t, s: 'Ir a la sección', k: norm(t), a: () => showPage(n.getAttribute('data-page')) });
    });
    (sd.courses || []).forEach(c => {
      items.push({ g: 'Cursos', t: c.title, s: (c.lessons || []).length + ' clases', k: norm(c.title + ' ' + (c.desc || '') + ' ' + (c.category || '')), a: () => { showPage('library'); setTimeout(() => openCourseDetail(c.id), 60); } });
      (c.lessons || []).forEach((l, i) => items.push({ g: 'Clases', t: l.title, s: c.title + ' · clase ' + (i + 1), k: norm(l.title + ' ' + (l.desc || '')), a: () => { showPage('library'); setTimeout(() => openCourseDetail(c.id), 60); } }));
    });
    (sd.pdfs || []).forEach(p => items.push({ g: 'Material PDF', t: p.title, s: p.desc || 'PDF', k: norm(p.title + ' ' + (p.desc || '')), a: () => showPage('pdfs') }));
    (sd.news || []).forEach(n => items.push({ g: 'Noticias', t: n.title, s: n.excerpt || '', k: norm(n.title + ' ' + (n.excerpt || '')), a: () => { showPage('news'); setTimeout(() => { try { openArticle(n.id); } catch (_) { /* sin artículo */ } }, 60); } }));
    (sd.live || []).forEach(l => items.push({ g: 'Clases en vivo', t: l.title, s: l.date || '', k: norm(l.title + ' ' + (l.desc || '')), a: () => showPage('courses-live') }));
    return items;
  }
  const ORDEN = ['Secciones', 'Cursos', 'Clases', 'Material PDF', 'Noticias', 'Clases en vivo'];
  function buscar(q) {
    const palabras = norm(q).split(' ').filter(Boolean);
    if (!palabras.length) return [];
    return indice().filter(i => palabras.every(p => i.k.includes(p))).sort((a, b) => ORDEN.indexOf(a.g) - ORDEN.indexOf(b.g) || (norm(a.t).startsWith(palabras[0]) ? 0 : 1) - (norm(b.t).startsWith(palabras[0]) ? 0 : 1)).slice(0, 24);
  }
  function conectarBusqueda(entrada, caja, alElegir) {
    let lista = [], sel = -1;
    const pintar = () => {
      const q = entrada.value.trim();
      if (!q) { caja.classList.remove('on'); entrada.setAttribute('aria-expanded', 'false'); return; }
      lista = buscar(q); sel = lista.length ? 0 : -1;
      let g = '';
      caja.innerHTML = lista.length ? lista.map((i, n) => (i.g !== g ? (g = i.g, '<div class="ftb-g" role="presentation">' + esc(i.g) + '</div>') : '') + '<button type="button" class="ftb-it" role="option" id="ftbo' + n + '" data-n="' + n + '" aria-selected="' + (n === sel) + '"><span>' + esc(i.t) + '</span><small>' + esc(i.s) + '</small></button>').join('') : '<div class="ftb-vacio">No encontramos nada para «' + esc(q) + '». Prueba con otra palabra.</div>';
      caja.classList.add('on'); entrada.setAttribute('aria-expanded', 'true');
    };
    const marcar = n => { sel = n; caja.querySelectorAll('[role=option]').forEach(o => o.setAttribute('aria-selected', String(Number(o.dataset.n) === n))); const o = $('ftbo' + n); if (o) { o.scrollIntoView({ block: 'nearest' }); entrada.setAttribute('aria-activedescendant', o.id); } };
    const ir = n => { const i = lista[n]; if (!i) return; caja.classList.remove('on'); entrada.value = ''; entrada.blur(); if (alElegir) alElegir(); i.a(); };
    entrada.addEventListener('input', pintar);
    entrada.addEventListener('focus', pintar);
    entrada.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (lista.length) marcar(Math.min(lista.length - 1, sel + 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (lista.length) marcar(Math.max(0, sel - 1)); }
      else if (e.key === 'Enter') { e.preventDefault(); ir(sel); }
      else if (e.key === 'Escape') { caja.classList.remove('on'); entrada.value = ''; entrada.blur(); if (alElegir) alElegir(); }
    });
    caja.addEventListener('mousedown', e => { const b = e.target.closest('[role=option]'); if (b) { e.preventDefault(); ir(Number(b.dataset.n)); } });
    document.addEventListener('click', e => { if (!caja.contains(e.target) && e.target !== entrada) caja.classList.remove('on'); });
  }

  // ---------- Barra ----------
  const LUPA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>';
  function montar() {
    const main = document.querySelector('.main-content');
    if (!main || $('ftBarra')) return;
    const b = document.createElement('header');
    b.className = 'ftb'; b.id = 'ftBarra';
    b.innerHTML =
      '<div class="ftb-busca" role="search"><svg class="lupa" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
      '<input class="ftb-in" id="ftbEntrada" type="search" placeholder="Buscar cursos, clases, PDF o secciones…" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="ftbRes" aria-autocomplete="list" aria-label="Buscar en el Club"><span class="ftb-tecla" aria-hidden="true">/</span>' +
      '<div class="ftb-res" id="ftbRes" role="listbox" aria-label="Resultados"></div></div>' +
      '<div class="ftb-der">' +
      '<button type="button" class="ftb-racha" id="ftbRacha" onclick="showPage(\'achievements\')" title="Tu racha de días seguidos" style="display:none"><svg class="ic" style="width:16px;height:16px"><use href="#f-flame"/></svg><span id="ftbRachaN">0</span> días</button>' +
      '<div style="position:relative"><button type="button" class="ftb-btn" id="ftbAyudaB" aria-label="Ayuda" aria-haspopup="true" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/></svg></button>' +
      '<div class="ftb-pop" id="ftbAyuda" role="menu"><h4>¿Necesitas ayuda?</h4>' +
      '<button type="button" class="ftb-aviso" role="menuitem" onclick="ftBarra.cerrarPops();showPage(\'settings\')"><b>Escribir a soporte</b><span>Cuéntanos el problema desde Configuración</span></button>' +
      '<a class="ftb-aviso" role="menuitem" href="' + WHATSAPP + '" target="_blank" rel="noopener" style="text-decoration:none"><b>WhatsApp</b><span>Te respondemos por mensaje</span></a>' +
      '<button type="button" class="ftb-aviso" role="menuitem" onclick="ftBarra.cerrarPops();if(window.ftRecorrido){ftRecorrido.iniciar(true)}else{showPage(\'home\')}"><b>Ver el recorrido del panel</b><span>Un repaso rápido de lo que hay en el Club</span></button></div></div>' +
      '<div style="position:relative"><button type="button" class="ftb-btn" id="ftbCampanaB" aria-label="Notificaciones" aria-haspopup="true" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg><span class="ftb-punto" id="ftbPunto">0</span></button>' +
      '<div class="ftb-pop" id="ftbAvisos" role="dialog" aria-label="Notificaciones"><h4>Notificaciones</h4><div class="ftb-lista" id="ftbLista"></div><button type="button" class="ftb-aviso" onclick="ftBarra.cerrarPops();showPage(\'notifications\')" style="text-align:center;color:var(--accent);font-weight:600">Ver todas</button></div></div>' +
      '<button type="button" class="ftb-btn" onclick="toggleTheme()" aria-label="Cambiar entre modo claro y oscuro"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></button>' +
      '<button type="button" class="ftb-user" onclick="ftPerfil.abrir()" aria-label="Abrir mi perfil" aria-haspopup="dialog"><span class="ftb-av" id="ftbAv">S</span><span class="n"><span id="ftbNombre">Socio</span><small id="ftbPlan"></small></span></button></div>';
    main.insertBefore(b, main.firstChild);
    conectarBusqueda($('ftbEntrada'), $('ftbRes'));
    $('ftbAyudaB').onclick = e => { e.stopPropagation(); alternar('ftbAyuda', 'ftbAyudaB'); };
    $('ftbCampanaB').onclick = e => { e.stopPropagation(); pintarAvisos(); alternar('ftbAvisos', 'ftbCampanaB'); };
    document.addEventListener('click', e => { if (!e.target.closest('.ftb-pop')) cerrarPops(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') cerrarPops();
      if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '') && window.innerWidth > 880) { e.preventDefault(); $('ftbEntrada').focus(); }
    });
    // Móvil: lupa en el encabezado y búsqueda a pantalla completa
    const mh = document.querySelector('.mobile-header > div');
    if (mh && !$('ftbLupaMovil')) {
      const l = document.createElement('button'); l.className = 'ftb-movil-lupa'; l.id = 'ftbLupaMovil'; l.setAttribute('aria-label', 'Buscar'); l.innerHTML = LUPA.replace('<svg ', '<svg width="22" height="22" ');
      mh.insertBefore(l, mh.firstChild);
      const ov = document.createElement('div'); ov.className = 'ftb-ov'; ov.id = 'ftbOv'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Buscar');
      ov.innerHTML = '<button type="button" class="cerrar" id="ftbOvX">Cerrar</button><div class="ftb-busca"><svg class="lupa" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg><input class="ftb-in" id="ftbOvIn" type="search" placeholder="Buscar en el Club…" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="ftbOvRes" aria-label="Buscar en el Club"><div class="ftb-res" id="ftbOvRes" role="listbox"></div></div>';
      document.body.appendChild(ov);
      const cerrar = () => ov.classList.remove('on');
      conectarBusqueda($('ftbOvIn'), $('ftbOvRes'), cerrar);
      l.onclick = () => { ov.classList.add('on'); setTimeout(() => $('ftbOvIn').focus(), 50); };
      $('ftbOvX').onclick = cerrar;
    }
    refrescar();
  }
  const pops = ['ftbAyuda', 'ftbAvisos'];
  function cerrarPops() { pops.forEach(id => { const p = $(id); if (p) p.classList.remove('on'); }); ['ftbAyudaB', 'ftbCampanaB'].forEach(id => { const b = $(id); if (b) b.setAttribute('aria-expanded', 'false'); }); }
  function alternar(pop, boton) { const abierto = $(pop).classList.contains('on'); cerrarPops(); if (!abierto) { $(pop).classList.add('on'); $(boton).setAttribute('aria-expanded', 'true'); } }

  // ---------- Campana, racha y perfil ----------
  function visibles() {
    const lista = ((typeof memberNotifs !== 'undefined' && memberNotifs) || []).concat(window.ftAvisos ? ftAvisos.lista() : []), p = (typeof notifPrefs !== 'undefined' && notifPrefs) || {};
    return lista.filter(n => !((n.category === 'course' && p.courses === false) || (n.category === 'live' && p.live === false) || (n.category === 'pdf' && p.pdfs === false) || (n.category === 'promo' && p.promos === false)));
  }
  function pintarAvisos() {
    const l = visibles().slice(0, 6);
    $('ftbLista').innerHTML = l.length ? l.map(n => '<button type="button" class="ftb-aviso' + (n.read ? '' : ' nuevo') + '" data-id="' + esc(n.id) + '"><b>' + esc(n.title || 'Notificación') + '</b><span>' + esc(n.message || '') + '</span></button>').join('') : '<div class="ftb-vacio">No hay notificaciones por ahora.</div>';
    $('ftbLista').querySelectorAll('[data-id]').forEach(b => b.onclick = () => {
      const n = visibles().find(x => String(x.id) === b.dataset.id);
      cerrarPops();
      if (n && n.sintetico) { ftAvisos.marcar(n.id); refrescar(); if (n.accion) n.accion(); return; }
      try { if (n && !n.read && typeof markNotifRead === 'function') markNotifRead(n.id, null); } catch (_) { /* sin marcar */ }
      if (n && n.link) { if (/^https?:/i.test(n.link)) window.open(n.link, '_blank', 'noopener'); else showPage('home'); } else showPage('home');
    });
  }
  const fijar = (el, t) => { if (el && el.textContent !== t) el.textContent = t; };
  function refrescar() {
    const sinLeer = visibles().filter(n => !n.read).length, p = $('ftbPunto');
    if (p) { p.textContent = sinLeer > 9 ? '9+' : sinLeer; p.style.display = sinLeer ? 'block' : 'none'; }
    const nombre = ($('sidebarName') || {}).textContent || 'Socio', av = ($('sidebarAvatar') || {}).textContent || 'S';
    if ($('ftbNombre')) { fijar($('ftbNombre'), nombre); if (!$('ftbAv').querySelector('img') && av) fijar($('ftbAv'), av); $('ftbPlan').textContent = (typeof memberIsPaid !== 'undefined' && memberIsPaid) ? 'Miembro activo' : 'Cuenta gratuita'; }
    const r = (typeof achievementData !== 'undefined' && achievementData.streak) || 0;
    if ($('ftbRacha')) { $('ftbRacha').style.display = r > 0 ? 'flex' : 'none'; $('ftbRachaN').textContent = r; }
  }
  // La campana se mantiene al día cuando index.html actualiza el contador
  const original = window.updateBellBadge;
  if (typeof original === 'function') window.updateBellBadge = function () { const r = original.apply(this, arguments); refrescar(); return r; };
  setInterval(refrescar, 4000);

  window.ftBarra = { refrescar, cerrarPops, buscar };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
