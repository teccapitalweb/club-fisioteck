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
  window.ftDirEspecialidades = ESPECIALIDADES;
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
    cedula: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M14 10h4M14 14h4M6 16c.5-1.5 1.5-2 3-2s2.5.5 3 2"/>'), ig: ic('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>'), x: ic('<path d="M6 6l12 12M18 6L6 18"/>'), lupa: ic('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),
    red: ic('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'),
    usuario: ic('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'), lapiz: ic('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>'), flecha: ic('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>')
  };
  const stRed = document.createElement('style');
  stRed.textContent = `
  .dir-banda { display:flex; align-items:center; gap:18px; flex-wrap:wrap; padding:18px 22px; border-radius:16px; background:#153650; color:#fff; margin:0 0 16px; }
  .dir-banda-ic { flex:0 0 auto; display:flex; width:46px; height:46px; border-radius:13px; border:1px solid rgba(255,255,255,.22); background:rgba(255,255,255,.06); align-items:center; justify-content:center; }
  .dir-banda-ic svg { width:22px; height:22px; }
  .dir-banda-txt { font-size:1rem; font-weight:700; max-width:220px; line-height:1.3; }
  .dir-banda-nums { display:flex; gap:28px; margin-left:auto; }
  .dir-banda-nums span { text-align:left; display:flex; flex-direction:column; }
  .dir-banda-nums b { font-size:1.4rem; line-height:1.15; color:#fff; }
  .dir-banda-nums small { display:flex; align-items:center; gap:4px; font-size:.68rem; color:rgba(255,255,255,.72); letter-spacing:.02em; margin-top:2px; }
  .dir-banda-nums small svg { width:11px; height:11px; }
  .dir-banda-acc { display:flex; gap:8px; }
  .dir-bbtn { display:inline-flex; align-items:center; gap:6px; border:1px solid rgba(255,255,255,.35); background:transparent; color:#fff; border-radius:11px; padding:9px 16px; font-size:.8rem; font-weight:700; cursor:pointer; white-space:nowrap; }
  .dir-bbtn svg { width:14px; height:14px; flex:0 0 auto; }
  .dir-bbtn:hover { border-color:#fff; background:rgba(255,255,255,.08); }
  .dir-bbtn.claro { background:#E8C078; border-color:#E8C078; color:#4a3505; }
  .dir-bbtn.claro:hover { filter:brightness(1.05); color:#4a3505; }
  @media (max-width:760px) { .dir-banda { align-items:flex-start; } .dir-banda-txt { max-width:none; } .dir-banda-nums { margin-left:0; width:100%; } .dir-banda-acc { width:100%; } .dir-bbtn { flex:1; justify-content:center; } }
  .dir-tabs { display:flex; gap:8px; margin:0 0 14px; flex-wrap:wrap; }
  .dir-tabs button { display:flex; align-items:center; gap:7px; padding:10px 18px; border:1px solid var(--border); border-radius:12px; background:var(--surface); color:var(--text-muted); font-weight:700; font-size:.84rem; cursor:pointer; }
  .dir-tabs button.on { background:var(--accent-ghost); border-color:var(--accent); color:var(--accent); }
  .dir-tabs button svg { width:16px; height:16px; }
  .dir-tab-badge { min-width:19px; height:19px; border-radius:10px; background:#E24A4A; color:#fff; font-size:.68rem; display:inline-flex; align-items:center; justify-content:center; padding:0 5px; }
  .dir-tab-num { color:var(--text-muted); font-weight:600; }
  .dir-filtro { display:flex; flex-direction:column; gap:3px; min-width:200px; } .dir-filtro small { font-size:.66rem; color:var(--text-muted); } .dir-filtro select { padding:10px 12px; border:1px solid var(--border); border-radius:11px; background:var(--surface); color:var(--text); font-size:.84rem; }
  .dir-vistas { display:flex; align-items:center; gap:8px; margin:10px 0 14px; flex-wrap:wrap; }
  .dir-vistas button { display:flex; align-items:center; gap:6px; padding:7px 14px; border:1.5px solid var(--border); border-radius:100px; background:var(--surface); font-size:.76rem; font-weight:700; color:var(--text-muted); cursor:pointer; }
  .dir-vistas button.on { border-color:var(--accent); color:var(--accent); background:var(--accent-ghost); }
  .dir-vistas button svg { width:13px; height:13px; }
  .dir-mia-nota { margin-left:auto; font-size:.72rem; color:var(--text-muted); } .dir-mia-nota.pub { color:#0F9D6C; }
  .dir-avance { margin:10px 0 2px; } .dir-avance small { font-size:.64rem; color:var(--text-muted); letter-spacing:.04em; }
  .dir-avance i { display:block; height:4px; border-radius:4px; background:var(--surface-2); margin-top:4px; overflow:hidden; } .dir-avance b { display:block; height:100%; border-radius:4px; background:linear-gradient(90deg,#0D5FA0,#2fb8a8); }
  .dir-acciones { display:flex; gap:8px; margin:10px 0 4px; flex-wrap:wrap; }
  .dir-verperfil { flex:1; display:flex; justify-content:space-between; align-items:center; gap:8px; padding:9px 13px; border:1px solid var(--border); border-radius:11px; background:var(--surface); font-size:.78rem; font-weight:700; color:var(--text); cursor:pointer; }
  .dir-conectar { display:inline-flex; align-items:center; gap:6px; padding:9px 14px; border:0; border-radius:11px; background:linear-gradient(135deg,#0B2A4A,#0D5FA0); color:#fff; font-size:.76rem; font-weight:700; cursor:pointer; }
  .dir-conectar svg { width:14px; height:14px; }
  .dir-conectar.ok { background:#0F9D6C; } .dir-conectar.envia { background:var(--surface-2); color:var(--text-muted); border:1px solid var(--border); }
  .dir-conectar.recibe { background:#B45309; } .dir-conectar.suave { background:var(--surface-2); color:var(--text); border:1px solid var(--border); }
  .dir-conectar.peligro { background:var(--surface-2); color:#C0392B; border:1px solid #C0392B44; }
  .dir-conectar:disabled { opacity:.55; cursor:default; }
  .dir-bloque { border:1px solid var(--border); border-radius:16px; background:var(--surface); padding:16px 18px; margin-bottom:14px; }
  .dir-bloque h3 { margin:0 0 12px; font-size:.95rem; } .dir-bloque h3 span { color:var(--text-muted); font-weight:600; font-size:.8rem; }
  .dir-fila { display:flex; align-items:center; gap:12px; padding:10px 0; border-top:1px solid var(--border); flex-wrap:wrap; }
  .dir-fila:first-of-type { border-top:0; }
  .dir-fila-av { width:42px; height:42px; border-radius:13px; overflow:hidden; flex:0 0 auto; cursor:pointer; } .dir-fila-av img { width:100%; height:100%; object-fit:cover; } .dir-fila-av i { display:flex; width:100%; height:100%; align-items:center; justify-content:center; color:#fff; font-style:normal; font-weight:800; }
  .dir-fila-txt { flex:1; min-width:140px; cursor:pointer; } .dir-fila-txt b { display:block; font-size:.88rem; } .dir-fila-txt small { color:var(--text-muted); font-size:.74rem; }
  .dir-fila-acc { display:flex; gap:8px; align-items:center; } .dir-fila-nota { font-size:.72rem; color:var(--text-muted); }
  .dr-alcance { display:flex; align-items:center; gap:8px; margin:-6px 0 10px; } .dr-alcance small { font-size:.68rem; color:var(--text-muted); white-space:nowrap; }
  .dr-alcance select { flex:1; padding:7px 10px; border:1px solid var(--border); border-radius:9px; background:var(--surface-2); color:var(--text); font-size:.76rem; }
  .dr-quitar-link { display:block; margin-top:7px; border:0; background:none; color:var(--accent); font-size:.76rem; font-weight:700; text-decoration:underline; cursor:pointer; padding:0; }`;
  document.head.appendChild(stRed);

  const S = { tarjetas: [], propia: null, meta: { cargado: false, viewerVip: false, vip: new Set(), certificados: {}, contactos: {}, miContacto: {}, ocultas: new Set(), portadas: {} }, texto: '', esp: '', vista: 'todos', tab: 'directorio',
    red: { cargado: false, conexiones: [], recibidas: [], enviadas: [], estados: {}, total: 0 } };
  const uid = () => (auth.currentUser || {}).uid || '';
  window.ftRed = S.red; // club-perfil-pro.js consulta el estado de conexión
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
      S.meta = { cargado: true, viewerVip: d.viewerVip === true, vip: new Set(d.vip || []), certificados: d.certificados || {}, contactos: d.contactos || {}, miContacto: d.miContacto || {}, ocultas: new Set(d.ocultas || []), portadas: d.portadas || {} };
    } catch (e) { S.meta = Object.assign(S.meta, { cargado: true, viewerVip: !!memberIsPaid }); }
  }
  async function cargarRed() {
    try {
      const d = await certFetch('/api/red');
      Object.assign(S.red, { cargado: true, conexiones: d.conexiones || [], recibidas: d.recibidas || [], enviadas: d.enviadas || [], estados: d.estados || {}, total: d.total || 0 });
    } catch (e) { Object.assign(S.red, { cargado: true }); }
  }
  async function cargar() {
    const caja = $('directorioContenido'); if (!caja || !auth.currentUser) return;
    caja.innerHTML = hero() + '<div class="dr-vacio">Cargando directorio…</div>';
    try {
      const [lista, propia] = await Promise.all([db.collection('directorio').where('publicado', '==', true).limit(300).get(), db.collection('directorio').doc(uid()).get(), cargarMeta(), cargarRed()]);
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
  // Avance del perfil para la barra «Perfil completo» (se calcula con la tarjeta y su contacto)
  function avanceTarjeta(c) {
    const partes = [c.nombre, c.puesto, c.empresa, c.ciudad, c.especialidad, c.bio, (c.foto || c.avatar), CONTACTOS.some(k => c[k] && k !== 'cedula')];
    return Math.round(partes.filter(Boolean).length / partes.length * 100);
  }
  function barraAvance(c) {
    const p = avanceTarjeta(c);
    return '<div class="dir-avance"><small>' + (p >= 100 ? 'Tarjeta completa' : 'Tarjeta por completar') + '</small><i><b style="width:' + p + '%"></b></i></div>';
  }
  // Botón Conectar según el estado de la relación con esa persona
  function botonRed(id) {
    if (!id || id === uid()) return '';
    const e = S.red.estados[id] || 'ninguna';
    if (e === 'conectado') return '<button type="button" class="dir-conectar ok" data-red="eliminar" data-reduid="' + esc(id) + '" title="Conectados · toca para deshacer">' + I.check + ' Conectados</button>';
    if (e === 'enviada') return '<button type="button" class="dir-conectar envia" data-red="cancelar" data-reduid="' + esc(id) + '" title="Solicitud enviada · toca para cancelarla">' + I.check + ' Enviada</button>';
    if (e === 'recibida') return '<button type="button" class="dir-conectar recibe" data-red="tab" data-reduid="' + esc(id) + '">Responder</button>';
    // Conectar es un beneficio VIP (igual que ver el contacto); el servidor también lo exige en /api/red/solicitar.
    // No se repite el aviso aquí: la tarjeta ya muestra su propia pastilla "Contactar · solo VIP" para lo mismo.
    if (!S.meta.viewerVip) return '';
    return '<button type="button" class="dir-conectar" data-red="solicitar" data-reduid="' + esc(id) + '">' + I.red + ' Conectar</button>';
  }
  // Portada de una tarjeta VIP: foto personalizada (del servidor, o una vista previa explícita mientras se edita), o el color elegido.
  // `override` solo se usa en la vista previa del editor: pasarlo (aunque sea {}) ignora la portada guardada y usa solo lo que se está editando.
  function fondoPortada(c, id, override) {
    const p = override !== undefined ? override : ((id && S.meta.portadas[id]) || null);
    if (p && p.foto) return 'background-image:url(' + p.foto + ');background-size:cover;background-position:center';
    return 'background:' + PORTADAS[portada(c.portadaColor)][1];
  }
  window.ftDirPortada = fondoPortada; // club-perfil-pro.js pinta la misma portada en el encabezado del CV
  window.ftDirMeta = () => S.meta; // club-perfil-pro.js lee tu contacto guardado (con sus alcances) para prellenar su formulario
  window.ftDirRecargar = cargar; // club-perfil-pro.js la llama tras guardar, para que el Directorio (tarjetas, avance) quede al día sin que lo visites
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
    // Fila de acciones: Ver perfil (el CV) + Conectar; en la vista previa del editor no va
    const acciones = o.pistas ? '' : '<div class="dir-acciones"><button type="button" class="dir-verperfil" data-verperfil="' + esc(o.id || c.id || '') + '">Ver perfil <span>→</span></button>' + (o.sinRed ? '' : botonRed(o.id)) + '</div>';
    const avance = o.pistas ? '' : barraAvance(c);
    if (o.vip === false) {
      return '<article class="dir-card' + (o.mia ? ' mia' : '') + '"' + idAttr + '>' + tu + '<div class="dir-top">' + foto + '</div><div class="dir-cuerpo"><div class="dir-nombre">' + nombre + '</div>' + puesto + empresa + ubic + cedula + esp + bio + avance + acciones + cta + '</div></article>';
    }
    const est = ESTADOS[c.estado], certs = Number(o.certs) > 0 ? '<span class="dir-certs">' + I.check + o.certs + ' certificado' + (o.certs === 1 ? '' : 's') + ' FisioTeck</span>' : '';
    return '<article class="dir-card vip' + (o.mia ? ' mia' : '') + '"' + idAttr + '><div class="dir-cover" style="' + fondoPortada(c, o.id || c.id, o.portadaPreview) + '"></div><span class="dir-vipbadge">' + I.corona + 'VIP</span>' + tu +
      '<div class="dir-top"><div class="dir-av">' + foto + '<span class="dir-sello" title="Miembro VIP verificado">' + I.check + '</span></div></div><div class="dir-cuerpo"><div class="dir-nombre">' + nombre + '</div>' + puesto + empresa + ubic + cedula +
      (est ? '<span class="dir-estado ' + est[1] + '"><i></i>' + est[0] + '</span>' : '') + esp + certs + bio + avance + acciones + cta + '</div></article>';
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
    // Si tu tarjeta aún no tiene avatar (o todavía no la creas), se usa el que elegiste en Mi perfil
    if (!/^a(0[1-9]|1[0-6])$/.test(p.avatar || '') && window.ftAvatarActual && /^a(0[1-9]|1[0-6])$/.test(ftAvatarActual() || '')) p.avatar = ftAvatarActual();
    const oculta = S.meta.ocultas.has(uid()), pub = !!(S.propia && S.propia.publicado === true && S.propia.visible !== false && !oculta);
    const pend = S.red.recibidas.length;
    caja.innerHTML = hero() +
      // Banda con contadores y accesos (como ICADEM): membresías VIP, miembros, tu perfil y tu tarjeta
      '<div class="dir-banda"><div class="dir-banda-ic">' + I.red + '</div><div class="dir-banda-txt">Tu próxima conexión puede empezar aquí.</div>' +
      '<div class="dir-banda-nums"><span><b>' + S.meta.vip.size + '</b><small>' + I.corona + 'Membresías VIP</small></span><span><b>' + S.tarjetas.length + '</b><small>Miembros</small></span></div>' +
      '<div class="dir-banda-acc"><button type="button" class="dir-bbtn claro" data-verperfil="' + esc(uid()) + '">' + I.usuario + ' Ver mi perfil ' + I.flecha + '</button></div></div>' +
      // Pestañas
      '<div class="dir-tabs" role="tablist"><button type="button" class="' + (S.tab === 'directorio' ? 'on' : '') + '" data-dirtab="directorio">' + I.red + ' Directorio</button>' +
      '<button type="button" class="' + (S.tab === 'solicitudes' ? 'on' : '') + '" data-dirtab="solicitudes">Solicitudes' + (pend ? '<span class="dir-tab-badge">' + pend + '</span>' : '') + '</button>' +
      '<button type="button" class="' + (S.tab === 'conexiones' ? 'on' : '') + '" data-dirtab="conexiones">Mis conexiones' + (S.red.total ? '<span class="dir-tab-num">' + S.red.total + '</span>' : '') + '</button></div>' +
      '<div id="drVista"></div>';
    caja.querySelectorAll('[data-dirtab]').forEach(b => b.onclick = () => { S.tab = b.dataset.dirtab; caja.querySelectorAll('[data-dirtab]').forEach(x => x.classList.toggle('on', x === b)); vista(); });
    caja.querySelectorAll('.dir-banda [data-verperfil]').forEach(b => b.onclick = () => window.ftPerfilPro && ftPerfilPro.abrir(b.dataset.verperfil));
    vista();
    // Estado de mi tarjeta (debajo de las pestañas en la vista Directorio)
    S.estadoMio = { oculta, pub };
  }
  function vista() {
    const v = $('drVista'); if (!v) return;
    if (S.tab === 'solicitudes') return solicitudes(v);
    if (S.tab === 'conexiones') return conexiones(v);
    const oculta = S.meta.ocultas.has(uid()), pub = !!(S.propia && S.propia.publicado === true && S.propia.visible !== false && !oculta);
    const estadoMio = oculta ? 'Oculta por el equipo del Club' : pub ? 'Tu tarjeta está publicada' : 'Tu tarjeta sigue privada: publícala para conectar';
    v.innerHTML =
      '<div class="dir-barra"><div class="dir-busca">' + I.lupa + '<input type="search" id="drBuscar" placeholder="Buscar por nombre, consultorio o puesto…" value="' + esc(S.texto) + '" aria-label="Buscar en el directorio"></div>' +
      '<label class="dir-filtro"><small>Especialidad</small><select id="drEspSel"><option value="">Todas las especialidades</option>' + ESPECIALIDADES.map(e => '<option' + (S.esp === e ? ' selected' : '') + '>' + esc(e) + '</option>').join('') + '</select></label></div>' +
      '<div class="dir-vistas"><button type="button" class="' + (S.vista === 'todos' ? 'on' : '') + '" data-dirvista="todos">Todos</button><button type="button" class="' + (S.vista === 'vip' ? 'on' : '') + '" data-dirvista="vip">' + I.corona + ' Solo VIP</button><span class="dir-mia-nota' + (pub ? ' pub' : '') + '">' + estadoMio + '</span></div>' +
      '<div class="dir-grid" id="drGrid"></div>';
    const b = $('drBuscar'); b.oninput = () => { S.texto = b.value.trim().toLowerCase(); lista(); };
    $('drEspSel').onchange = () => { S.esp = $('drEspSel').value; lista(); };
    v.querySelectorAll('[data-dirvista]').forEach(x => x.onclick = () => { S.vista = x.dataset.dirvista; v.querySelectorAll('[data-dirvista]').forEach(y => y.classList.toggle('on', y === x)); lista(); });
    lista();
  }
  function lista() {
    const g = $('drGrid'); if (!g) return;
    let cs = S.tarjetas.slice();
    const yo = uid();
    if (!cs.some(c => c.id === yo) && S.propia && S.propia.publicado === true && S.propia.visible !== false && !S.meta.ocultas.has(yo)) cs.unshift(Object.assign({ id: yo }, S.propia));
    if (S.vista === 'vip') cs = cs.filter(c => esVip(c.id));
    if (S.esp) cs = cs.filter(c => c.especialidad === S.esp);
    if (S.texto) cs = cs.filter(c => [c.nombre, c.empresa, c.puesto, c.especialidad, c.ciudad].join(' ').toLowerCase().includes(S.texto));
    if (!cs.length) { g.innerHTML = '<div class="dr-vacio" style="grid-column:1/-1">' + (S.texto || S.esp || S.vista === 'vip' ? 'No hay miembros que coincidan con tu búsqueda.' : 'Aún no hay tarjetas en el directorio. ¡Sé la primera persona en crear la tuya!') + '</div>'; return; }
    // Orden como ICADEM: VIP → tu tarjeta → perfiles completos → alfabético
    const orden = (a, b) => (b.id === yo) - (a.id === yo) || (avanceTarjeta(conContacto(b)) >= 100) - (avanceTarjeta(conContacto(a)) >= 100) || String(a.nombre || '').localeCompare(String(b.nombre || ''), 'es');
    const vips = cs.filter(c => esVip(c.id)).sort(orden), resto = cs.filter(c => !esVip(c.id)).sort(orden), bloq = !S.meta.viewerVip;
    const cab = (t, n, v) => '<div class="dir-grupo' + (v ? ' vip' : '') + '"><span>' + (v ? I.corona : '') + t + '</span><small>' + n + '</small></div>';
    const pinta = (c, v) => tarjeta(conContacto(c), { mia: c.id === yo, id: c.id, vip: v, bloqueado: bloq && c.id !== yo, certs: v ? (S.meta.certificados[c.id] || 0) : 0 });
    g.innerHTML = (vips.length ? cab('Profesionales VIP', vips.length, true) + vips.map(c => pinta(c, true)).join('') : '') +
      (resto.length ? cab('Comunidad FisioTeck', resto.length, false) + resto.map(c => pinta(c, false)).join('') : '');
    enlazar(g);
  }
  // Enlaza los botones de una zona con tarjetas (grid, solicitudes o conexiones)
  function enlazar(g) {
    g.querySelectorAll('[data-dirlock]').forEach(b => b.onclick = e => { e.stopPropagation(); showPaywallOverlay(); });
    g.querySelectorAll('[data-email]').forEach(b => b.onclick = e => { e.stopPropagation(); copiar(b.dataset.email); });
    g.querySelectorAll('[data-verperfil]').forEach(b => b.onclick = e => { e.stopPropagation(); if (window.ftPerfilPro) ftPerfilPro.abrir(b.dataset.verperfil); });
    g.querySelectorAll('[data-red]').forEach(b => b.onclick = e => { e.stopPropagation(); accionRed(b.dataset.red, b.dataset.reduid, b); });
    g.querySelectorAll('[data-dircard]').forEach(c => c.onclick = e => { if (!e.target.closest('.dir-cta,.dir-lock,.dir-conectar,.dir-verperfil,button,a')) detalle(c.dataset.dircard); });
  }
  // ---------- Solicitudes y conexiones ----------
  function fila(x, botones) {
    const av = x.foto ? '<img src="' + esc(x.foto) + '" alt="">' : (x.avatar && window.ftAvatarUrl ? '<img src="' + esc(ftAvatarUrl(x.avatar)) + '" alt="">' : '<i style="background:' + colorDe(x.uid) + '">' + esc((String(x.nombre || '?').trim()[0] || '?').toUpperCase()) + '</i>');
    return '<div class="dir-fila"><span class="dir-fila-av" data-verperfil="' + esc(x.uid) + '" role="button" tabindex="0">' + av + '</span><div class="dir-fila-txt" data-verperfil="' + esc(x.uid) + '" role="button"><b>' + esc(x.nombre) + '</b><small>' + esc([x.puesto, x.especialidad].filter(Boolean).join(' · ') || 'Miembro del directorio') + '</small></div><div class="dir-fila-acc">' + botones + '</div></div>';
  }
  function solicitudes(v) {
    const r = S.red.recibidas, e = S.red.enviadas;
    v.innerHTML = '<section class="dir-bloque"><h3>Solicitudes recibidas <span>' + r.length + '</span></h3>' +
      (r.length ? r.map(x => fila(x, '<button type="button" class="dir-conectar" data-red="aceptar" data-reduid="' + esc(x.uid) + '">' + I.check + ' Aceptar</button><button type="button" class="dir-conectar suave" data-red="rechazar" data-reduid="' + esc(x.uid) + '">Rechazar</button>')).join('') : '<p class="dir-sin">No tienes solicitudes nuevas. Cuando alguien quiera conectar contigo, aparecerá aquí.</p>') + '</section>' +
      '<section class="dir-bloque"><h3>Solicitudes enviadas <span>' + e.length + '</span></h3>' +
      (e.length ? e.map(x => fila(x, '<span class="dir-fila-nota">Esperando respuesta</span><button type="button" class="dir-conectar suave" data-red="cancelar" data-reduid="' + esc(x.uid) + '">Cancelar</button>')).join('') : '<p class="dir-sin">No has enviado solicitudes. Encuentra colegas en la pestaña Directorio y conecta.</p>') + '</section>';
    enlazar(v);
  }
  function conexiones(v) {
    const c = S.red.conexiones;
    v.innerHTML = '<section class="dir-bloque"><h3>Mis conexiones <span>' + c.length + '</span></h3>' +
      (c.length ? c.map(x => fila(x, '<button type="button" class="dir-conectar suave" data-verperfil="' + esc(x.uid) + '">Ver perfil</button><button type="button" class="dir-conectar peligro" data-red="eliminar" data-reduid="' + esc(x.uid) + '">Deshacer</button>')).join('') : '<p class="dir-sin">Aún no tienes conexiones. Envía una solicitud desde el Directorio: al conectar, ambos pueden ver el contacto y las secciones del perfil reservadas para conexiones.</p>') + '</section>';
    enlazar(v);
  }
  async function accionRed(accion, otro, btn) {
    if (!otro) return;
    if (accion === 'tab') { S.tab = 'solicitudes'; pintar(); return; }
    if (accion === 'eliminar' && !confirm('¿Deshacer la conexión con esta persona? Dejarán de ver lo que comparten solo con conexiones.')) return;
    if (accion === 'cancelar' && !confirm('¿Cancelar la solicitud enviada?')) return;
    if (btn) { btn.disabled = true; }
    try {
      if (accion === 'solicitar') {
        const r = await certFetch('/api/red/solicitar', { method: 'POST', body: JSON.stringify({ uid: otro }) });
        showToast(r.estado === 'enviada' ? 'Solicitud enviada. Te avisaremos cuando responda.' : 'Ya están conectados.');
      } else {
        await certFetch('/api/red/' + encodeURIComponent(otro) + '/' + accion, { method: 'POST', body: '{}' });
        showToast(accion === 'aceptar' ? '¡Nueva conexión! Ya pueden ver lo que comparten con conexiones.' : accion === 'rechazar' ? 'Solicitud rechazada.' : accion === 'cancelar' ? 'Solicitud cancelada.' : 'Conexión deshecha.');
      }
      await Promise.all([cargarRed(), cargarMeta()]);
      pintar();
    } catch (e) { if (btn) btn.disabled = false; showToast(e.message || 'No se pudo completar. Intenta de nuevo.'); }
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
    m.o.querySelectorAll('[data-dirlock]').forEach(l => l.onclick = () => { m.cerrar(); showPaywallOverlay(); });
    const vp = m.o.querySelector('[data-verperfil]'); if (vp) vp.onclick = () => { m.cerrar(); if (window.ftPerfilPro) ftPerfilPro.abrir(vp.dataset.verperfil); };
    const rd = m.o.querySelector('[data-red]'); if (rd) rd.onclick = () => { m.cerrar(); accionRed(rd.dataset.red, rd.dataset.reduid); };
  }

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
  // El perfil profesional (club-perfil-pro.js) reutiliza estas mismas piezas para que su edición en línea
  // (nombre, foto, color, contacto) sea idéntica a la de aquí, sin duplicar ni desalinear reglas.
  window.ftDirUtils = { reducirFoto, PORTADAS, ESTADOS, CONTACTOS, contactoLimpio: contactoClienteValido };
  // Validación mínima del lado del navegador (el servidor igual revalida todo): solo decide si deshabilitar "Guardar".
  function contactoClienteValido(v) {
    if (v.whatsapp && !/^[0-9+() -]{8,20}$/.test(v.whatsapp)) return 'Escribe tu WhatsApp con lada, solo números.';
    if (v.email && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(v.email)) return 'Escribe un correo válido.';
    if (v.cedula && !/^[A-Za-z0-9 -]{4,20}$/.test(v.cedula)) return 'Escribe tu cédula solo con letras y números.';
    return '';
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
