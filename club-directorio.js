/* Club FisioTeck — Directorio VIP (misma estructura que Alintec Food y Zoorigen, con los colores de FisioTeck) y resumen en Certificados.
   · La tarjeta de cada persona vive en Firestore (directorio/{uid}) y la ven todas las cuentas con sesión; sin "publicado" una tarjeta es privada.
   · El contacto (WhatsApp, correo, LinkedIn, sitio web, Instagram) vive en el servidor (GET /api/directorio/meta, POST /api/directorio/contacto)
     y solo se entrega a quien tiene membresía vigente. El servidor también dice quién es VIP verificado y cuántos certificados reales tiene cada quien.
   · Grupos: "Miembros VIP verificados" (portada de color, sello y estado profesional) y "Comunidad FisioTeck" (tarjeta básica, contacto bloqueado).
   Depende de index.html: auth, db, memberIsPaid, certFetch, showPage, showToast, showPaywallOverlay, loadCertificates; de club-cursos.js (ftdHero) y club-avatar.js. */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = id => document.getElementById(id);
  const ESPECIALIDADES = ['Fisioterapia deportiva', 'Ortopedia y traumatología', 'Neurorrehabilitación', 'Cardiopulmonar y respiratoria',
    'Geriatría', 'Pediatría', 'Dolor y terapia manual', 'Estética y liberación miofascial', 'Suelo pélvico', 'Otra'];
  const PORTADAS = {
    azul: ['Azul', 'linear-gradient(135deg,#cfe3f7,#5aa6e0)'], marino: ['Marino', 'linear-gradient(135deg,#0A3E68,#2f7fbf)'], turquesa: ['Turquesa', 'linear-gradient(135deg,#c9f0ea,#2fb8a8)'],
    dorado: ['Dorado', 'linear-gradient(135deg,#f6e2b3,#e8b64d)'], violeta: ['Violeta', 'linear-gradient(135deg,#ddd0f7,#8b6fe0)'], coral: ['Coral', 'linear-gradient(135deg,#f9d3cf,#e8705f)'],
    vino: ['Vino', 'linear-gradient(135deg,#6b1d33,#a8324f)'], grafito: ['Grafito', 'linear-gradient(135deg,#3a4452,#1d242e)']
  };
  const ESTADOS = { proyectos: ['Disponible para proyectos', 'ok'], empleo: ['Busco empleo', 'info'] };
  const CONTACTOS = ['whatsapp', 'email', 'linkedin', 'web', 'instagram', 'cedula'];
  const portada = id => (PORTADAS[id] ? id : 'azul');
  const ic = d => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  const I = {
    corona: ic('<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/>'), check: ic('<path d="M5 12.5l4.5 4.5L19 7"/>'), maletin: ic('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>'),
    pin: ic('<path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>'), lock: ic('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
    wa: ic('<path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z"/>'), mail: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
    li: ic('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>'), web: ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
    cedula: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M14 10h4M14 14h4M6 16c.5-1.5 1.5-2 3-2s2.5.5 3 2"/>'), ig: ic('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>'), x: ic('<path d="M6 6l12 12M18 6L6 18"/>'), lupa: ic('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>')
  };
  const S = { tarjetas: [], propia: null, meta: { cargado: false, viewerVip: false, vip: new Set(), certificados: {}, contactos: {}, miContacto: {}, ocultas: new Set() }, texto: '', esp: '' };
  const uid = () => (auth.currentUser || {}).uid || '';
  const colorDe = id => { let h = 0; for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) % 360; return 'hsl(' + h + ',55%,42%)'; };

  // ---------- Página y menú ----------
  function montar() {
    if ($('page-directorio')) return;
    const logros = $('page-achievements'), nav = document.querySelector('.nav-item[data-page="notifications"]');
    if (!logros || !nav) return;
    logros.insertAdjacentHTML('beforebegin', '<section class="section" id="page-directorio"><div id="directorioContenido"></div></section>');
    nav.insertAdjacentHTML('beforebegin',
      '<div class="nav-item" data-page="directorio" onclick="showPage(\'directorio\')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> Directorio</div>');
  }
  const showPageOriginal = window.showPage;
  window.showPage = function (page) {
    const r = showPageOriginal.apply(this, arguments);
    if (page === 'directorio') cargar();
    return r;
  };

  // ---------- Datos ----------
  async function cargarMeta() {
    try {
      const d = await certFetch('/api/directorio/meta');
      S.meta = { cargado: true, viewerVip: d.viewerVip === true, vip: new Set(d.vip || []), certificados: d.certificados || {}, contactos: d.contactos || {}, miContacto: d.miContacto || {}, ocultas: new Set(d.ocultas || []) };
    } catch (e) { S.meta = Object.assign(S.meta, { cargado: true, viewerVip: !!memberIsPaid }); }
  }
  async function cargar() {
    const caja = $('directorioContenido'); if (!caja || !auth.currentUser) return;
    caja.innerHTML = hero() + '<div class="dr-vacio">Cargando directorio…</div>';
    try {
      const [lista, propia] = await Promise.all([db.collection('directorio').where('publicado', '==', true).limit(300).get(), db.collection('directorio').doc(uid()).get(), cargarMeta()]);
      const ms = v => (v && v.toMillis ? v.toMillis() : 0);
      S.tarjetas = lista.docs.map(d => Object.assign({ id: d.id }, d.data())).filter(c => c.visible !== false && !S.meta.ocultas.has(c.id)).sort((a, b) => ms(b.actualizado) - ms(a.actualizado));
      S.propia = propia.exists ? Object.assign({ id: uid() }, propia.data()) : null;
      pintar();
    } catch (e) {
      console.warn('[directorio]', e);
      caja.innerHTML = hero() + '<div class="dr-vacio">No se pudo cargar el directorio. Intenta de nuevo en unos minutos.</div>';
    }
  }
  const hero = () => window.ftdHero('Networking profesional', 'Directorio <em>VIP.</em>', 'Conecta con la comunidad del Club FisioTeck. Crea tu tarjeta profesional y descubre a otros colegas de fisioterapia y rehabilitación.', 'directorio');
  const esVip = id => S.meta.vip.has(id) || (id === uid() && S.meta.viewerVip);

  // ---------- Tarjeta ----------
  function ctas(c, bloqueado) {
    if (bloqueado) return '<button type="button" class="dir-lock" data-dirlock>' + I.lock + ' Contactar · solo VIP</button>';
    const o = [], wa = String(c.whatsapp || '').replace(/\D/g, '');
    const url = v => { const t = String(v || '').trim(); return /^https?:\/\//i.test(t) ? t : 'https://' + t.replace(/^[a-z]+:\/\//i, ''); };
    if (wa.length >= 8) o.push('<a class="dir-cta wa" href="https://wa.me/' + wa + '" target="_blank" rel="noopener noreferrer" title="WhatsApp">' + I.wa + '</a>');
    if (c.email) o.push('<button type="button" class="dir-cta" data-email="' + esc(c.email) + '" title="Copiar correo: ' + esc(c.email) + '">' + I.mail + '</button>');
    if (c.linkedin) o.push('<a class="dir-cta" href="' + esc(url(c.linkedin)) + '" target="_blank" rel="noopener noreferrer" title="LinkedIn">' + I.li + '</a>');
    if (c.web) o.push('<a class="dir-cta" href="' + esc(url(c.web)) + '" target="_blank" rel="noopener noreferrer" title="Sitio web">' + I.web + '</a>');
    if (c.instagram) o.push('<a class="dir-cta" href="https://instagram.com/' + encodeURIComponent(String(c.instagram).replace(/^@+/, '')) + '" target="_blank" rel="noopener noreferrer" title="Instagram">' + I.ig + '</a>');
    return o.length ? '<div class="dir-ctas">' + o.join('') + '</div>' : '<div class="dir-sin">Sin datos de contacto</div>';
  }
  // o: { mia, pistas, vip, bloqueado, certs, id }
  function tarjeta(c, o) {
    o = o || {};
    const pal = String(c.nombre || '?').trim().split(/\s+/).filter(Boolean), ini = esc((pal.slice(0, 2).map(p => p[0]).join('') || '?').toUpperCase());
    const av = String(c.foto || '').indexOf('data:image/jpeg;base64,') === 0 ? c.foto : (c.avatar && window.ftAvatarUrl ? ftAvatarUrl(c.avatar) : '');
    const foto = av ? '<img class="dir-foto" src="' + esc(av) + '" alt="">' : '<div class="dir-foto ini" style="background:linear-gradient(135deg,' + colorDe(c.id || c.nombre) + ',' + colorDe((c.id || c.nombre) + 'x') + ')">' + ini + '</div>';
    const vacio = t => o.pistas ? '<div class="dir-linea vacio">' + t + '</div>' : '';
    const puesto = c.puesto ? '<div class="dir-puesto">' + esc(c.puesto) + '</div>' : vacio('Tu puesto o cargo');
    const empresa = c.empresa ? '<div class="dir-linea">' + I.maletin + esc(c.empresa) + '</div>' : (o.pistas ? '<div class="dir-linea vacio">' + I.maletin + 'Tu consultorio o empresa</div>' : '');
    const ubic = c.ciudad ? '<div class="dir-linea">' + I.pin + esc(c.ciudad) + '</div>' : (o.pistas ? '<div class="dir-linea vacio">' + I.pin + 'Tu ciudad</div>' : '');
    const cedula = c.cedula ? '<div class="dir-linea">' + I.cedula + 'Cédula prof. ' + esc(c.cedula) + '</div>' : '';
    const hay = CONTACTOS.some(k => c[k] && k !== 'cedula');
    const cta = o.bloqueado ? ctas(c, true) : hay ? ctas(c) : (o.pistas ? '<div class="dir-sin vacio">Aquí irán tus datos de contacto</div>' : ctas(c));
    const nombre = esc(c.nombre || (o.pistas ? 'Tu nombre' : 'Miembro')), esp = c.especialidad ? '<span class="dir-esp">' + esc(c.especialidad) + '</span>' : '';
    const bio = c.bio ? '<p class="dir-bio">' + esc(c.bio) + '</p>' : '';
    const tu = o.mia ? '<span class="dir-tu">Tú</span>' : '', idAttr = o.id ? ' data-dircard="' + esc(o.id) + '"' : '';
    if (o.vip === false) {
      return '<article class="dir-card' + (o.mia ? ' mia' : '') + '"' + idAttr + '>' + tu + '<div class="dir-top">' + foto + '</div><div class="dir-cuerpo"><div class="dir-nombre">' + nombre + '</div>' + puesto + empresa + ubic + cedula + esp + bio + cta + '</div></article>';
    }
    const est = ESTADOS[c.estado], certs = Number(o.certs) > 0 ? '<span class="dir-certs">' + I.check + o.certs + ' certificado' + (o.certs === 1 ? '' : 's') + ' FisioTeck</span>' : '';
    return '<article class="dir-card vip' + (o.mia ? ' mia' : '') + '"' + idAttr + '><div class="dir-cover" style="background:' + PORTADAS[portada(c.portadaColor)][1] + '"></div><span class="dir-vipbadge">' + I.corona + 'VIP</span>' + tu +
      '<div class="dir-top"><div class="dir-av">' + foto + '<span class="dir-sello" title="Miembro VIP verificado">' + I.check + '</span></div></div><div class="dir-cuerpo"><div class="dir-nombre">' + nombre + '</div>' + puesto + empresa + ubic + cedula +
      (est ? '<span class="dir-estado ' + est[1] + '"><i></i>' + est[0] + '</span>' : '') + esp + certs + bio + cta + '</div></article>';
  }
  function conContacto(c) {
    const copia = Object.assign({}, c); CONTACTOS.forEach(k => { copia[k] = ''; });
    const f = c.id === uid() ? S.meta.miContacto : (S.meta.viewerVip ? (S.meta.contactos[c.id] || {}) : {});
    CONTACTOS.forEach(k => { if (f && f[k]) copia[k] = f[k]; });
    return copia;
  }

  // ---------- Página ----------
  function pintar() {
    const caja = $('directorioContenido'); if (!caja) return;
    const p = S.propia ? conContacto(S.propia) : { id: uid(), nombre: (auth.currentUser || {}).displayName || '', portadaColor: 'azul' };
    if (!S.propia) Object.assign(p, S.meta.miContacto || {});
    const oculta = S.meta.ocultas.has(uid()), pub = !!(S.propia && S.propia.publicado === true && S.propia.visible !== false && !oculta);
    caja.innerHTML = hero() +
      '<div class="dir-mia-bloque"><div class="dir-mia-tarjeta">' + tarjeta(Object.assign({}, p, { id: uid() }), { pistas: !pub, vip: S.meta.viewerVip, mia: false }) + '</div><div class="dir-mia-info">' +
      '<span class="dir-mia-estado' + (pub ? ' pub' : '') + '">' + (oculta ? 'Oculta por el equipo del Club' : pub ? 'Publicada · visible para los miembros' : 'Privada · solo tú la ves') + '</span>' +
      '<p>' + (oculta ? 'El equipo del Club ocultó tu tarjeta porque no cumple con las reglas de la comunidad. Si crees que es un error, escríbenos por WhatsApp y la revisamos.' : pub ? 'Los miembros del club ya pueden ver tu tarjeta y contactarte. Al editarla puedes cambiar tus datos o dejar de publicarla.' : 'Esta es tu tarjeta profesional. Nadie la ve hasta que tú decidas publicarla. Al editarla eliges tus datos, el color de tu portada y si quieres publicarla.') + '</p>' +
      '<button type="button" class="dr-btn" onclick="ftDirEditar()">' + (S.propia ? 'Editar mi tarjeta' : 'Crear mi tarjeta') + '</button></div></div>' +
      '<h2 class="dir-seccion">Miembros del directorio</h2>' +
      '<div class="dir-barra"><div class="dir-busca">' + I.lupa + '<input type="search" id="drBuscar" placeholder="Buscar por nombre, consultorio o especialidad…" value="' + esc(S.texto) + '" aria-label="Buscar en el directorio"></div></div>' +
      '<div class="dir-chips" id="drChips"><button type="button" class="' + (S.esp ? '' : 'on') + '" data-esp="">Todos</button>' + ESPECIALIDADES.map(e => '<button type="button" class="' + (S.esp === e ? 'on' : '') + '" data-esp="' + esc(e) + '">' + esc(e) + '</button>').join('') + '</div>' +
      '<div class="dir-grid" id="drGrid"></div>';
    const b = $('drBuscar'); b.oninput = () => { S.texto = b.value.trim().toLowerCase(); lista(); };
    caja.querySelectorAll('[data-esp]').forEach(x => x.onclick = () => { S.esp = x.dataset.esp; caja.querySelectorAll('[data-esp]').forEach(y => y.classList.toggle('on', y === x)); lista(); });
    lista();
  }
  function lista() {
    const g = $('drGrid'); if (!g) return;
    let cs = S.tarjetas.slice();
    if (S.esp) cs = cs.filter(c => c.especialidad === S.esp);
    if (S.texto) cs = cs.filter(c => [c.nombre, c.empresa, c.puesto, c.especialidad, c.ciudad].join(' ').toLowerCase().includes(S.texto));
    if (!cs.length) { g.innerHTML = '<div class="dr-vacio" style="grid-column:1/-1">' + (S.texto || S.esp ? 'No hay miembros que coincidan con tu búsqueda.' : 'Aún no hay tarjetas en el directorio. ¡Sé la primera persona en crear la tuya!') + '</div>'; return; }
    const yo = uid(), primero = (a, b) => (b.id === yo) - (a.id === yo);
    const vips = cs.filter(c => esVip(c.id)).sort(primero), resto = cs.filter(c => !esVip(c.id)).sort(primero), bloq = !S.meta.viewerVip;
    const cab = (t, n, v) => '<div class="dir-grupo' + (v ? ' vip' : '') + '"><span>' + (v ? I.corona : '') + t + '</span><small>' + n + '</small></div>';
    const pinta = (c, v) => tarjeta(conContacto(c), { mia: c.id === yo, id: c.id, vip: v, bloqueado: bloq && c.id !== yo, certs: v ? (S.meta.certificados[c.id] || 0) : 0 });
    g.innerHTML = (vips.length ? (resto.length ? cab('Miembros VIP verificados', vips.length, true) : '') + vips.map(c => pinta(c, true)).join('') : '') +
      (resto.length ? (vips.length ? cab('Comunidad FisioTeck', resto.length, false) : '') + resto.map(c => pinta(c, false)).join('') : '');
    g.querySelectorAll('[data-dirlock]').forEach(b => b.onclick = e => { e.stopPropagation(); showPaywallOverlay(); });
    g.querySelectorAll('[data-email]').forEach(b => b.onclick = e => { e.stopPropagation(); copiar(b.dataset.email); });
    g.querySelectorAll('[data-dircard]').forEach(c => c.onclick = e => { if (!e.target.closest('.dir-cta,.dir-lock')) detalle(c.dataset.dircard); });
  }
  function copiar(t) { try { navigator.clipboard.writeText(t).then(() => showToast('Correo copiado: ' + t)); } catch (_) { showToast(t); } }

  // ---------- Ventanas ----------
  function ventana(id, titulo, sub, cuerpo, pie) {
    const old = $(id); if (old) old.remove();
    const o = document.createElement('div'); o.id = id; o.className = 'ftp-overlay is-open'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true');
    o.innerHTML = '<div class="ftm-card dir-modal"><header class="ftm-cab"><span class="ftm-ic">' + I.corona + '</span><div class="ftm-tit"><h2>' + esc(titulo) + '</h2>' + (sub ? '<small>' + esc(sub) + '</small>' : '') + '</div><button type="button" class="ftm-x" aria-label="Cerrar">' + I.x + '</button></header><div class="ftm-cuerpo">' + cuerpo + '</div>' + (pie ? '<footer class="ftm-pie"></footer>' : '') + '</div>';
    const cerrar = () => { o.remove(); if (!document.querySelector('.ftp-overlay.is-open')) document.body.classList.remove('modal-open'); };
    o.querySelector('.ftm-x').onclick = cerrar; o.addEventListener('mousedown', e => { if (e.target === o) cerrar(); });
    document.body.appendChild(o); document.body.classList.add('modal-open');
    (pie || []).forEach(b => { const bt = document.createElement('button'); bt.type = 'button'; bt.className = 'ftm-btn' + (b.suave ? ' suave' : '') + (b.peligro ? ' peligro' : ''); bt.textContent = b.texto; bt.onclick = () => b.clic(bt, cerrar); o.querySelector('.ftm-pie').appendChild(bt); });
    return { o, cerrar };
  }
  function detalle(id) {
    const c = id === uid() && S.propia ? S.propia : S.tarjetas.find(x => x.id === id); if (!c) return;
    const v = esVip(id), bloq = !S.meta.viewerVip && id !== uid(), x = conContacto(c);
    const filas = [['wa', 'WhatsApp', x.whatsapp], ['mail', 'Correo', x.email], ['li', 'LinkedIn', x.linkedin], ['web', 'Sitio web', x.web], ['ig', 'Instagram', x.instagram]].filter(f => f[2]);
    const cuerpo = '<div class="dir-det">' + tarjeta(x, { vip: v, bloqueado: false, mia: id === uid(), certs: v ? (S.meta.certificados[id] || 0) : 0 }).replace(/<div class="dir-ctas">[\s\S]*?<\/div>|<div class="dir-sin">[^<]*<\/div>/, '') + '</div>' +
      (bloq ? '<button type="button" class="dir-lock grande" data-dirlock>' + I.lock + ' Contactar · solo VIP</button>' :
        filas.length ? '<ul class="dir-det-lista">' + filas.map(f => '<li><i>' + I[f[0]] + '</i><span><small>' + f[1] + '</small><b>' + esc(f[2]) + '</b></span></li>').join('') + '</ul>' : '<p class="dir-sin">Sin datos de contacto</p>');
    const m = ventana('drDetalle', 'Tarjeta profesional', id === uid() ? 'Tu tarjeta en el directorio' : 'Directorio VIP', cuerpo, [{ texto: 'Cerrar', suave: true, clic: (b, cer) => cer() }]);
    const l = m.o.querySelector('[data-dirlock]'); if (l) l.onclick = () => { m.cerrar(); showPaywallOverlay(); };
  }

  // ---------- Mi tarjeta ----------
  window.ftDirEditar = function () {
    const m = Object.assign({ portadaColor: 'azul', estado: '' }, S.propia || {}, S.meta.miContacto || {});
    const u = auth.currentUser, existe = !!S.propia, publicada = !!(S.propia && S.propia.publicado === true);
    const campo = (id, et, val, ph, max, tipo, op) => '<label class="dr-lbl">' + et + (op ? ' <small>(opcional)</small>' : '') + '<input id="' + id + '" ' + (tipo ? 'type="' + tipo + '" ' : '') + 'maxlength="' + (max || 60) + '" placeholder="' + esc(ph || '') + '" value="' + esc(val || '') + '"></label>';
    let color = portada(m.portadaColor);
    S.fotoEdit = typeof m.foto === 'string' ? m.foto : '';
    const cuerpo = '<div class="dr-form"><div class="dr-prev" id="drPrev"></div>' +
      '<div class="dr-lbl">Color de tu portada<div class="dr-colores" id="drColores">' + Object.keys(PORTADAS).map(k => '<button type="button" data-c="' + k + '" class="' + (k === color ? 'on' : '') + '" style="background:' + PORTADAS[k][1] + '" aria-label="' + PORTADAS[k][0] + '" title="' + PORTADAS[k][0] + '"></button>').join('') + '</div></div>' +
      '<div class="dr-lbl">Tu foto <small>(opcional)</small><div class="dr-foto"><div class="dr-foto-vista" id="drFotoVista"></div><div class="dr-foto-acc"><button type="button" class="dr-btn-foto" id="drFotoBtn">Subir foto</button><button type="button" class="dr-btn-foto quitar" id="drFotoQuitar">Quitar</button><input type="file" id="drFotoArchivo" accept="image/*" hidden></div></div><small class="dr-foto-nota">Se recorta en círculo y se reduce sola. Si no subes foto se muestra tu avatar o tus iniciales.</small></div>' +
      '<label class="dr-lbl">Estado profesional <small>(opcional)</small><select id="drEstado"><option value="">Sin indicar</option>' + Object.keys(ESTADOS).map(k => '<option value="' + k + '"' + (m.estado === k ? ' selected' : '') + '>' + ESTADOS[k][0] + '</option>').join('') + '</select></label>' +
      campo('drNombre', 'Nombre completo', m.nombre || u.displayName, '', 60) + campo('drPuesto', 'Puesto / cargo', m.puesto, 'Ej. Fisioterapeuta') + campo('drEmpresa', 'Consultorio / empresa', m.empresa, 'Ej. Clínica Movimiento') +
      campo('drCiudad', 'Ubicación profesional', m.ciudad, 'Ej. Puebla, Puebla', 60, '', true) +
      '<label class="dr-lbl">Especialidad<select id="drEsp"><option value="">Selecciona…</option>' + ESPECIALIDADES.map(e => '<option' + (e === m.especialidad ? ' selected' : '') + '>' + esc(e) + '</option>').join('') + '</select></label>' +
      '<label class="dr-lbl">Bio breve <small>(opcional)</small><textarea id="drBio" maxlength="200" rows="3" placeholder="Una línea sobre tu experiencia…">' + esc(m.bio || '') + '</textarea></label>' +
      '<p class="dr-sub">Contacto <small>(opcional · solo lo ven los miembros VIP)</small></p>' +
      campo('drWa', 'WhatsApp', m.whatsapp, 'Ej. 52 238 123 4567', 20, 'tel') + campo('drMail', 'Correo', m.email, 'tucorreo@ejemplo.com', 80, 'email') + campo('drLi', 'LinkedIn', m.linkedin, 'linkedin.com/in/tu-perfil', 120) +
      campo('drWeb', 'Sitio web', m.web, 'tusitio.com', 120) + campo('drIg', 'Instagram profesional', m.instagram, '@tuusuario', 60) +
      '<p class="dr-sub">Cédula profesional <small>(opcional)</small></p>' + campo('drCed', 'Cédula profesional', m.cedula, '12345678', 20) +
      '<label class="dr-check"><input type="checkbox" id="drCedVis"' + (m.cedulaVisible ? ' checked' : '') + '> Mostrar cédula en el directorio</label>' +
      '<p class="dr-nota">Revisa tus datos antes de publicar: los miembros del club verán lo que aparece en la tarjeta. Mientras no la publiques, solo tú la ves.</p><p class="ftp-error" id="drError" role="alert"></p></div>';
    const pie = [];
    if (existe) pie.push({ texto: 'Eliminar tarjeta', suave: true, peligro: true, clic: async (b, cer) => { if (!confirm('¿Eliminar tu tarjeta del directorio? Podrás crearla de nuevo cuando quieras.')) return; try { await db.collection('directorio').doc(uid()).delete(); cer(); showToast('Tarjeta eliminada.'); cargar(); } catch (e) { showToast('No se pudo eliminar la tarjeta.'); } } });
    if (publicada) { pie.push({ texto: 'Dejar de publicar', suave: true, clic: (b, cer) => guardar(b, cer, () => color, false) }); pie.push({ texto: 'Guardar cambios', clic: (b, cer) => guardar(b, cer, () => color, true) }); }
    else { pie.push({ texto: 'Guardar como privada', suave: true, clic: (b, cer) => guardar(b, cer, () => color, false) }); pie.push({ texto: 'Guardar y publicar', clic: (b, cer) => guardar(b, cer, () => color, true) }); }
    const w = ventana('drEditor', 'Mi tarjeta profesional', publicada ? 'Publicada en el Directorio VIP' : 'Privada · solo tú la ves', cuerpo, pie);
    const leer = () => { const v = id => (($(id) || {}).value || '').trim(); return { id: uid(), foto: S.fotoEdit, nombre: v('drNombre'), puesto: v('drPuesto'), empresa: v('drEmpresa'), ciudad: v('drCiudad'), especialidad: v('drEsp'), bio: v('drBio'), estado: v('drEstado'), portadaColor: color, avatar: m.avatar,
      whatsapp: v('drWa'), email: v('drMail'), linkedin: v('drLi'), web: v('drWeb'), instagram: v('drIg'), cedula: $('drCedVis') && $('drCedVis').checked ? v('drCed') : '' }; };
    const prev = () => { const p = $('drPrev'); if (p) p.innerHTML = tarjeta(leer(), { vip: S.meta.viewerVip, pistas: true }); };
    w.o.querySelectorAll('#drColores [data-c]').forEach(b => b.onclick = () => { color = b.dataset.c; w.o.querySelectorAll('#drColores [data-c]').forEach(x => x.classList.toggle('on', x === b)); prev(); });
    w.o.querySelector('.dr-form').addEventListener('input', prev); w.o.querySelector('.dr-form').addEventListener('change', prev); prev();
    const pintarFoto = () => { const vista = $('drFotoVista'); if (!vista) return; vista.style.backgroundImage = S.fotoEdit ? 'url(' + S.fotoEdit + ')' : ''; vista.classList.toggle('vacia', !S.fotoEdit); $('drFotoBtn').textContent = S.fotoEdit ? 'Cambiar foto' : 'Subir foto'; $('drFotoQuitar').hidden = !S.fotoEdit; prev(); };
    $('drFotoBtn').onclick = () => $('drFotoArchivo').click();
    $('drFotoQuitar').onclick = () => { S.fotoEdit = ''; pintarFoto(); };
    $('drFotoArchivo').onchange = async ev => { const a = ev.target.files && ev.target.files[0]; ev.target.value = ''; if (!a) return; $('drError').textContent = ''; try { S.fotoEdit = await reducirFoto(a); pintarFoto(); } catch (e) { $('drError').textContent = e.message; } };
    pintarFoto();
  };
  // La foto se recorta cuadrada, se reduce a 320 px y se guarda dentro de la tarjeta como JPEG (unos 20 a 40 KB); no se sube a ningún otro servicio
  const FOTO_MAX = 60000;
  function reducirFoto(archivo) {
    return new Promise((ok, mal) => {
      if (!archivo.type || archivo.type.indexOf('image/') !== 0) return mal(new Error('Elige una imagen (JPG, PNG o WebP).'));
      if (archivo.size > 12 * 1024 * 1024) return mal(new Error('La imagen es demasiado pesada. Elige una de menos de 12 MB.'));
      const url = URL.createObjectURL(archivo), img = new Image();
      img.onerror = () => { URL.revokeObjectURL(url); mal(new Error('No pudimos leer esa imagen. Prueba con otra.')); };
      img.onload = () => {
        URL.revokeObjectURL(url);
        const lado = Math.min(img.width, img.height), c = document.createElement('canvas'); c.width = c.height = 320;
        const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, 320, 320);
        g.drawImage(img, (img.width - lado) / 2, (img.height - lado) / 2, lado, lado, 0, 0, 320, 320);
        for (let q = 0.86; q >= 0.4; q -= 0.12) { const d = c.toDataURL('image/jpeg', q); if (d.length <= FOTO_MAX) return ok(d); }
        mal(new Error('No pudimos reducir esa imagen lo suficiente. Prueba con otra.'));
      };
      img.src = url;
    });
  }
  async function guardar(btn, cer, color, publicar) {
    const v = id => ($(id).value || '').trim(), err = $('drError'); err.textContent = '';
    if (v('drNombre').length < 2) { err.textContent = 'Escribe tu nombre.'; return; }
    const botones = btn.parentNode.querySelectorAll('.ftm-btn'), texto = btn.textContent;
    botones.forEach(x => { x.disabled = true; }); btn.textContent = 'Guardando…';
    let avatar = ''; try { const mm = await db.collection('members').doc(uid()).get(); avatar = (mm.exists && mm.data().avatar) || ''; } catch (_) { /* sin avatar */ }
    const tarj = { nombre: v('drNombre').slice(0, 60), puesto: v('drPuesto').slice(0, 60), empresa: v('drEmpresa').slice(0, 60), ciudad: v('drCiudad').slice(0, 60), especialidad: $('drEsp').value, bio: v('drBio').slice(0, 200),
      estado: ESTADOS[$('drEstado').value] ? $('drEstado').value : '', portadaColor: portada(color()), avatar: /^a(0[1-9]|1[0-6])$/.test(avatar) ? avatar : '', ...(S.fotoEdit ? { foto: S.fotoEdit } : {}), publicado: publicar, actualizado: firebase.firestore.FieldValue.serverTimestamp() };
    try {
      await certFetch('/api/directorio/contacto', { method: 'POST', body: JSON.stringify({ whatsapp: v('drWa'), email: v('drMail'), linkedin: v('drLi'), web: v('drWeb'), instagram: v('drIg'), cedula: v('drCed'), cedulaVisible: $('drCedVis').checked }) });
      await db.collection('directorio').doc(uid()).set(tarj);
      cer(); showToast(publicar ? 'Tu tarjeta ya está en el directorio.' : 'Tarjeta guardada. Sigue privada: solo tú la ves.'); cargar();
    } catch (e) { err.textContent = e.message && e.status ? e.message : 'No se pudo guardar. Intenta de nuevo.'; botones.forEach(x => { x.disabled = false; }); btn.textContent = texto; }
  }

  // ---------- Certificados: resumen y vacío con acciones ----------
  const certOriginal = window.loadCertificates;
  if (typeof certOriginal === 'function') {
    window.loadCertificates = async function () {
      const r = await certOriginal.apply(this, arguments);
      const caja = $('certList');
      if (!caja) return r;
      const n = caja.querySelectorAll('a[href*="/pdf"]').length;
      if (n) {
        caja.insertAdjacentHTML('afterbegin', '<div class="dr-resumen"><strong>' + n + '</strong> certificado' + (n === 1 ? '' : 's') + ' · cada uno tiene folio verificable con QR</div>');
      } else if (/Aún no tienes/.test(caja.textContent)) {
        caja.innerHTML = '<div class="dr-vacio"><strong>Aún no tienes certificados</strong><br>Termina todas las clases de un curso y aparecerá aquí.<div style="margin-top:14px"><button type="button" class="dr-btn" onclick="showPage(\'library\')">Ver los cursos</button></div></div>';
      }
      return r;
    };
  }

  montar();
})();
