/* Club FisioTeck — Perfil profesional (CV) del Directorio, como ICADEM.
   · Cada miembro tiene, además de su tarjeta, un currículum con secciones (sobre mí, experiencia, formación, idiomas,
     habilidades, certificados FisioTeck reales, certificaciones externas, proyectos y enlaces).
   · Cada sección tiene su visibilidad: pública (todos los miembros), solo conexiones, o privada.
   · El servidor decide qué se ve (GET /api/perfil/:uid); el dueño edita con POST /api/perfil.
   Depende de index.html: auth, db, certFetch, showPage, showToast; de club-directorio.js (ftRed, portadas vía meta). */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uidMio = () => (auth.currentUser || {}).uid || '';
  // Mismo set de íconos lineales que el resto del Club (sin emoji)
  const ic = d => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  const I = {
    usuario: ic('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
    maletin: ic('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>'),
    gorro: ic('<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>'),
    globo: ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'),
    rayo: ic('<path d="m13 2-9 12h8l-1 8 9-12h-8l1-8z"/>'),
    medalla: ic('<circle cx="12" cy="8" r="5"/><path d="m8.5 13 -1.5 8 5-3 5 3-1.5-8"/>'),
    carpeta: ic('<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>'),
    enlace: ic('<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/>'),
    check: ic('<path d="M5 12.5l4.5 4.5L19 7"/>'), lapiz: ic('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>'),
    candado: ic('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
    idcard: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M14 9h4M14 13h4M5 17c.6-2 2-3 4-3s3.4 1 4 3"/>'),
    camara: ic('<path d="M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/><circle cx="12" cy="13" r="4"/>'),
    paleta: ic('<path d="M12 2a10 10 0 1 0 0 20c1.5 0 2-.8 2-2a2 2 0 0 1 2-2h1a3 3 0 0 0 3-3c0-6-3.6-13-8-13z"/><circle cx="7.5" cy="10.5" r="1.3"/><circle cx="12" cy="6.5" r="1.3"/><circle cx="16.5" cy="10.5" r="1.3"/>'),
    mail: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>')
  };
  const SEC = [
    ['sobreMi', 'Sobre mí'], ['experiencia', 'Experiencia'], ['formacion', 'Formación'], ['idiomas', 'Idiomas'],
    ['habilidades', 'Habilidades'], ['certificaciones', 'Certificados FisioTeck'], ['certificacionesExternas', 'Otras certificaciones'],
    ['proyectos', 'Proyectos'], ['enlaces', 'Enlaces']
  ];
  const LISTAS = {
    experiencia: [['puesto', 'Puesto', 80], ['lugar', 'Clínica / empresa', 80], ['periodo', 'Periodo (ej. 2020 – 2024)', 40], ['descripcion', 'Qué hacías (opcional)', 300]],
    formacion: [['titulo', 'Título o grado', 100], ['escuela', 'Escuela / universidad', 90], ['periodo', 'Periodo', 40]],
    idiomas: [['idioma', 'Idioma', 40], ['nivel', 'Nivel (ej. Avanzado)', 40]],
    habilidades: [['nombre', 'Habilidad (ej. Punción seca)', 60]],
    certificacionesExternas: [['nombre', 'Certificación', 100], ['emisor', 'Quién la emite', 80], ['anio', 'Año', 10]],
    proyectos: [['nombre', 'Proyecto', 90], ['descripcion', 'De qué trata (opcional)', 240], ['enlace', 'Enlace (opcional)', 160]],
    enlaces: [['titulo', 'Título (ej. Mi consultorio)', 60], ['url', 'Enlace', 160]]
  };
  const VIS = [['publico', 'Pública · todos los miembros'], ['conexiones', 'Solo mis conexiones'], ['privado', 'Privada · solo yo']];
  const st = document.createElement('style');
  st.textContent = `
  #page-perfil-pro .fpp-volver { display:inline-flex; align-items:center; gap:7px; margin:0 0 14px; padding:9px 16px; border:1px solid var(--border); border-radius:11px; background:var(--surface); font-size:.8rem; font-weight:700; color:var(--text); cursor:pointer; }
  #page-perfil-pro .fpp-cab { border:1px solid var(--border); border-radius:18px; background:var(--surface); overflow:hidden; margin-bottom:16px; }
  #page-perfil-pro .fpp-cover { height:150px; }
  #page-perfil-pro .fpp-cuerpo { padding:0 22px 20px; }
  #page-perfil-pro .fpp-av { width:92px; height:92px; border-radius:24px; border:4px solid var(--surface); margin-top:-46px; overflow:hidden; background:var(--surface-2); }
  #page-perfil-pro .fpp-av img { width:100%; height:100%; object-fit:cover; } #page-perfil-pro .fpp-av i { display:flex; width:100%; height:100%; align-items:center; justify-content:center; color:#fff; font-style:normal; font-weight:800; font-size:1.6rem; }
  #page-perfil-pro .fpp-ey { font:700 .62rem 'JetBrains Mono',monospace; letter-spacing:.14em; color:var(--text-muted); margin-top:10px; }
  #page-perfil-pro h1 { margin:2px 0 4px; font-size:1.5rem; }
  #page-perfil-pro .fpp-sub { color:var(--text-muted); font-size:.84rem; }
  #page-perfil-pro .fpp-red { display:flex; align-items:center; gap:8px; margin:10px 0 0; font-size:.8rem; color:var(--text-muted); }
  #page-perfil-pro .fpp-acc { display:flex; gap:9px; margin-top:14px; flex-wrap:wrap; }
  #page-perfil-pro .fpp-btn { display:inline-flex; align-items:center; gap:6px; padding:10px 16px; border-radius:11px; border:1px solid var(--border); background:var(--surface); font-size:.8rem; font-weight:700; color:var(--text); cursor:pointer; }
  #page-perfil-pro .fpp-btn svg, #page-perfil-pro .dir-conectar svg { width:14px; height:14px; flex:0 0 auto; }
  #page-perfil-pro .fpp-btn.p { background:linear-gradient(135deg,#0B2A4A,#0D5FA0); border:0; color:#fff; }
  #page-perfil-pro .fpp-sec { border:1px solid var(--border); border-radius:16px; background:var(--surface); padding:16px 20px; margin-bottom:12px; }
  #page-perfil-pro .fpp-sec h3 { margin:0 0 10px; font-size:.95rem; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
  #page-perfil-pro .fpp-sec h3 svg { width:16px; height:16px; color:var(--accent); flex:0 0 auto; }
  #page-perfil-pro .fpp-vis { margin-left:auto; font:600 .64rem 'JetBrains Mono',monospace; letter-spacing:.05em; padding:3px 10px; border-radius:100px; background:var(--surface-2); color:var(--text-muted); }
  #page-perfil-pro .fpp-editic { display:inline-flex; color:var(--accent); flex:0 0 auto; }
  #page-perfil-pro .fpp-editic svg { width:13px; height:13px; }
  #page-perfil-pro .fpp-editable { cursor:pointer; transition:border-color .15s, box-shadow .15s; }
  #page-perfil-pro .fpp-editable:hover { border-color:var(--accent); box-shadow:0 0 0 1px var(--accent) inset; }
  #page-perfil-pro .fpp-mini-av { width:46px; height:46px; border-radius:14px; overflow:hidden; background:var(--surface-2); }
  #page-perfil-pro .fpp-mini-av img { width:100%; height:100%; object-fit:cover; } #page-perfil-pro .fpp-mini-av i { display:flex; width:100%; height:100%; align-items:center; justify-content:center; color:#fff; font-style:normal; font-weight:800; }
  #page-perfil-pro .fpp-mini-color { width:60px; height:28px; border-radius:9px; border:1px solid var(--border); }
  #page-perfil-pro .fpp-pista { margin:10px 0 0; font-size:.76rem; color:var(--text-muted); }
  #page-perfil-pro .fpp-ed-tarjeta { display:inline-flex; align-items:center; gap:6px; margin-top:12px; padding:8px 14px; border-radius:10px; border:1px solid var(--border); background:var(--surface); font-size:.78rem; font-weight:700; color:var(--text); cursor:pointer; }
  #page-perfil-pro .fpp-ed-tarjeta svg { width:13px; height:13px; }
  #page-perfil-pro .fpp-sec p { margin:0; font-size:.86rem; line-height:1.55; white-space:pre-line; }
  #page-perfil-pro .fpp-item { padding:9px 0; border-top:1px solid var(--border); } #page-perfil-pro .fpp-item:first-of-type { border-top:0; }
  #page-perfil-pro .fpp-item b { display:block; font-size:.86rem; } #page-perfil-pro .fpp-item small { color:var(--text-muted); font-size:.74rem; }
  #page-perfil-pro .fpp-item p { margin-top:4px; font-size:.8rem; color:var(--text-light); }
  #page-perfil-pro .fpp-chips { display:flex; gap:7px; flex-wrap:wrap; } #page-perfil-pro .fpp-chips span { padding:6px 12px; border-radius:100px; background:var(--accent-ghost); color:var(--accent); font-size:.76rem; font-weight:700; }
  #page-perfil-pro .fpp-cert { display:flex; align-items:center; gap:10px; padding:9px 0; border-top:1px solid var(--border); } #page-perfil-pro .fpp-cert:first-of-type { border-top:0; }
  #page-perfil-pro .fpp-cert i { display:flex; width:34px; height:34px; border-radius:10px; background:var(--accent-ghost); color:var(--accent); align-items:center; justify-content:center; font-style:normal; }
  #page-perfil-pro .fpp-cert i svg { width:16px; height:16px; }
  #page-perfil-pro .fpp-cert small { display:block; color:var(--text-muted); font-size:.72rem; }
  #page-perfil-pro .fpp-vacia { color:var(--text-muted); font-size:.8rem; }
  #page-perfil-pro .fpp-cerrada { display:flex; align-items:center; gap:8px; color:var(--text-muted); font-size:.8rem; }
  #page-perfil-pro .fpp-cerrada svg { width:15px; height:15px; flex:0 0 auto; }
  #page-perfil-pro .fpp-avance { display:flex; align-items:center; gap:10px; margin-top:12px; font-size:.72rem; color:var(--text-muted); }
  #page-perfil-pro .fpp-avance i { flex:1; height:5px; border-radius:5px; background:var(--surface-2); overflow:hidden; display:block; } #page-perfil-pro .fpp-avance b { display:block; height:100%; background:linear-gradient(90deg,#0D5FA0,#2fb8a8); }
  #page-perfil-pro .fpp-ed-lbl { display:block; margin:0 0 10px; font-size:.78rem; font-weight:700; }
  #page-perfil-pro .fpp-ed-lbl textarea, #page-perfil-pro .fpp-ed-lbl input { width:100%; margin-top:5px; padding:10px 12px; border:1px solid var(--border); border-radius:11px; background:var(--surface-2); color:var(--text); font:500 .84rem/1.5 inherit; font-family:inherit; }
  #page-perfil-pro .fpp-ed-fila { display:grid; gap:7px; padding:10px; border:1px dashed var(--border); border-radius:12px; margin-bottom:8px; }
  #page-perfil-pro .fpp-ed-fila input, #page-perfil-pro .fpp-ed-fila textarea { padding:8px 11px; border:1px solid var(--border); border-radius:9px; background:var(--surface-2); color:var(--text); font:500 .8rem/1.45 inherit; font-family:inherit; }
  #page-perfil-pro .fpp-quitar { justify-self:end; border:0; background:none; color:#C0392B; font-size:.72rem; font-weight:700; cursor:pointer; }
  #page-perfil-pro .fpp-agregar { border:1px dashed var(--accent); background:var(--accent-ghost); color:var(--accent); border-radius:11px; padding:8px 14px; font-size:.76rem; font-weight:700; cursor:pointer; }
  #page-perfil-pro .fpp-selvis { margin-left:auto; padding:6px 9px; border:1px solid var(--border); border-radius:9px; background:var(--surface-2); color:var(--text); font-size:.72rem; }`;
  document.head.appendChild(st);

  function montar() {
    if ($('page-perfil-pro') || !$('page-directorio')) return;
    $('page-directorio').insertAdjacentHTML('beforebegin', '<section class="section" id="page-perfil-pro"><div id="fppRaiz"></div></section>');
  }
  const E = { uid: '', datos: null, tarjeta: null, editando: false, foco: null, identEditando: null, fotoDraft: null, avatarDraft: null, colorDraft: null, portadaReset: null };
  const datosBase = () => { const meta = (window.ftDirMeta && ftDirMeta()) || { miContacto: {}, portadas: {} }; return { tarjeta: Object.assign({ portadaColor: 'azul', estado: '' }, E.tarjeta || {}), contacto: meta.miContacto || {}, portadas: meta.portadas || {} }; };
  const colorDe = id => { let h = 0; for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) % 360; return 'hsl(' + h + ',55%,42%)'; };

  async function abrir(quien) {
    montar();
    E.uid = quien || uidMio(); E.editando = false; E.foco = null; E.identEditando = null; E.fotoDraft = null; E.avatarDraft = null; E.colorDraft = null; E.portadaReset = null;
    showPage('perfil-pro');
    const raiz = $('fppRaiz'); if (!raiz) return;
    raiz.innerHTML = '<div class="dr-vacio">Cargando perfil…</div>';
    try {
      const mio = E.uid === uidMio();
      const [perfil, tarjeta] = await Promise.all([
        certFetch(mio ? '/api/perfil/mio' : '/api/perfil/' + encodeURIComponent(E.uid)),
        db.collection('directorio').doc(E.uid).get().then(s => (s.exists ? s.data() : null)).catch(() => null)
      ]);
      E.datos = perfil; E.tarjeta = tarjeta || {};
      pintar();
    } catch (e) {
      raiz.innerHTML = '<button type="button" class="fpp-volver" onclick="showPage(\'directorio\')">← Volver al directorio</button><div class="dr-vacio">' + esc(e.message || 'No se pudo abrir el perfil.') + '</div>';
    }
  }

  function cabecera(mio) {
    const c = E.tarjeta || {}, nombre = c.nombre || (mio ? (auth.currentUser || {}).displayName : 'Miembro') || 'Miembro';
    const av = String(c.foto || '').indexOf('data:image/jpeg;base64,') === 0 ? '<img src="' + esc(c.foto) + '" alt="">' : (c.avatar && window.ftAvatarUrl ? '<img src="' + esc(ftAvatarUrl(c.avatar)) + '" alt="">' : '<i style="background:' + colorDe(E.uid) + '">' + esc((String(nombre).trim()[0] || '?').toUpperCase()) + '</i>');
    const red = window.ftRed || { estados: {}, total: 0 };
    const conex = mio ? (red.total || 0) : null;
    const fondo = (window.ftDirPortada && ftDirPortada(c, E.uid)) || 'background:linear-gradient(135deg,#cfe3f7,#5aa6e0)';
    const estadoRed = red.estados[E.uid] || 'ninguna';
    // Para ti: un solo botón, para editar tu tarjeta (nombre, foto, portada, contacto); el currículum se edita tocando cada apartado de abajo.
    // Para otra persona: el botón de Conectar, con su estado.
    const accion = mio ? '' : (estadoRed === 'conectado' ? '<span class="dir-conectar ok" style="cursor:default">' + I.check + ' Conectados</span>' : estadoRed === 'enviada' ? '<span class="dir-conectar envia" style="cursor:default">Solicitud enviada</span>' : '<div class="fpp-acc"><button type="button" class="fpp-btn p" id="fppConectar">Conectar</button></div>');
    return '<button type="button" class="fpp-volver" onclick="showPage(\'directorio\')">← Volver al directorio</button>' +
      '<div class="fpp-cab"><div class="fpp-cover" style="' + fondo + '"></div><div class="fpp-cuerpo"><div class="fpp-av">' + av + '</div>' +
      '<div class="fpp-ey">PERFIL PROFESIONAL</div><h1>' + esc(nombre) + '</h1>' +
      '<div class="fpp-sub">' + esc([c.puesto, c.empresa, c.ciudad].filter(Boolean).join(' · ') || '') + '</div>' +
      (conex === null ? '' : '<div class="fpp-red">Red profesional · <b>' + conex + '</b> conexi' + (conex === 1 ? 'ón' : 'ones') + '</div>') +
      accion +
      (mio ? '<div class="fpp-avance"><span>Avance de tu currículum</span><i><b style="width:' + (E.datos.avance || 0) + '%"></b></i><span>' + (E.datos.avance || 0) + '%</span></div>' +
        '<p class="fpp-pista">Toca cualquier apartado de abajo para editarlo.</p>' : '') +
      '</div></div>';
  }

  // Tu nombre, tu foto/avatar, el color de tu tarjeta y tu contacto: cada apartado se abre y se guarda por su cuenta,
  // justo donde lo tocaste (sin mostrar los demás apartados ni volver a preguntar lo que ya contestaste en otro).
  function seccionesIdentidad() {
    const util = window.ftDirUtils || {};
    const PORTADAS = util.PORTADAS || {}, ESTADOS = util.ESTADOS || {};
    const CANALES = (util.CONTACTOS || []).filter(k => k !== 'cedula');
    const base = datosBase(), c = base.tarjeta, contacto = base.contacto;
    const av = String(c.foto || '').indexOf('data:image/jpeg;base64,') === 0 ? '<img src="' + esc(c.foto) + '" alt="">' : (c.avatar && window.ftAvatarUrl ? '<img src="' + esc(ftAvatarUrl(c.avatar)) + '" alt="">' : '<i style="background:' + colorDe(E.uid) + '">' + esc((String(c.nombre || '?').trim()[0] || '?').toUpperCase()) + '</i>');
    const fondoColor = (window.ftDirPortada && ftDirPortada(c, E.uid)) || 'background:linear-gradient(135deg,#cfe3f7,#5aa6e0)';
    const etqCanal = { whatsapp: ['WhatsApp', 'Ej. 52 238 123 4567'], email: ['Correo', 'tucorreo@ejemplo.com'], linkedin: ['LinkedIn', 'linkedin.com/in/tu-perfil'], web: ['Sitio web', 'tusitio.com'], instagram: ['Instagram profesional', '@tuusuario'] };
    const campo = (id, et, val, ph, max) => '<label class="dr-lbl">' + et + '<input id="' + id + '" maxlength="' + (max || 60) + '" placeholder="' + esc(ph || '') + '" value="' + esc(val || '') + '"></label>';
    const alcanceDe = ch => { const a = (contacto.alcances || {})[ch]; return ['miembros', 'conexiones', 'oculto'].includes(a) ? a : 'miembros'; };
    const botones = clave => '<div class="fpp-acc" style="margin-top:14px"><button type="button" class="fpp-btn p" data-guardarident="' + clave + '">Guardar</button><button type="button" class="fpp-btn" data-cancelarident>Cancelar</button></div>';
    const seccion = (clave, icono, titulo, resumen, formulario) => {
      const abierto = E.identEditando === clave;
      return '<section class="fpp-sec' + (abierto ? '' : ' fpp-editable') + '"' + (abierto ? '' : ' data-editident="' + clave + '" role="button" tabindex="0" aria-label="Editar ' + esc(titulo) + '"') + '>' +
        '<h3>' + icono + ' ' + titulo + (abierto ? '' : '<span class="fpp-editic">' + I.lapiz + '</span>') + '</h3>' +
        (abierto ? formulario() + botones(clave) : resumen) + '</section>';
    };
    return seccion('identidad', I.idcard, 'Nombre y datos de tu tarjeta',
      '<p>' + esc([c.nombre, c.puesto, c.empresa, c.ciudad, c.especialidad].filter(Boolean).join(' · ') || 'Agrega tu nombre, puesto, consultorio, ciudad y especialidad.') + '</p>',
      () => '<label class="dr-lbl">Estado profesional <small>(opcional)</small><select id="fppIdEstado"><option value="">Sin indicar</option>' + Object.keys(ESTADOS).map(k => '<option value="' + k + '"' + (c.estado === k ? ' selected' : '') + '>' + ESTADOS[k][0] + '</option>').join('') + '</select></label>' +
        campo('fppIdNombre', 'Nombre completo', c.nombre || (auth.currentUser || {}).displayName, '') +
        campo('fppIdPuesto', 'Puesto / cargo', c.puesto, 'Ej. Fisioterapeuta') +
        campo('fppIdEmpresa', 'Consultorio / empresa', c.empresa, 'Ej. Clínica Movimiento') +
        campo('fppIdCiudad', 'Ubicación profesional', c.ciudad, 'Ej. Puebla, Puebla') +
        '<label class="dr-lbl">Especialidad<select id="fppIdEsp"><option value="">Selecciona…</option>' + (window.ftDirEspecialidades || []).map(e => '<option' + (e === c.especialidad ? ' selected' : '') + '>' + esc(e) + '</option>').join('') + '</select></label>' +
        '<label class="dr-lbl">Bio breve <small>(se ve en tu tarjeta del directorio)</small><textarea id="fppIdBio" maxlength="200" rows="3" placeholder="Una línea sobre tu experiencia…">' + esc(c.bio || '') + '</textarea></label>') +
      seccion('foto', I.camara, 'Foto y avatar', '<div class="fpp-mini-av">' + av + '</div>',
        () => '<div class="dr-lbl">Tu foto <small>(opcional)</small><div class="dr-foto"><div class="dr-foto-vista" id="fppIdFotoVista"></div><div class="dr-foto-acc"><button type="button" class="dr-btn-foto" id="fppIdFotoBtn">Subir foto</button><button type="button" class="dr-btn-foto quitar" id="fppIdFotoQuitar">Quitar</button><input type="file" id="fppIdFotoArchivo" accept="image/*" hidden></div></div><small class="dr-foto-nota">Se recorta en círculo y se reduce sola. Si no subes foto se muestra tu avatar o tus iniciales.</small></div>' +
          '<div class="dr-lbl">Tu avatar <small>(se usa si no subes foto)</small><div class="dr-avatares" id="fppIdAvatares" role="radiogroup" aria-label="Avatares">' + (window.ftAvatar ? ftAvatar.IDS.map((id, i) => '<button type="button" role="radio" data-av="' + id + '" aria-label="Avatar ' + (i + 1) + '"><img src="' + esc(ftAvatar.url(id)) + '" alt="" loading="lazy"></button>').join('') : '') + '</div><button type="button" class="dr-btn-foto quitar" id="fppIdAvatarIni">Usar mis iniciales</button></div>') +
      seccion('color', I.paleta, 'Color de tu portada', '<div class="fpp-mini-color" style="' + fondoColor + '"></div>',
        () => { const portadaActual = base.portadas[uidMio()] || null, colorActual = PORTADAS[c.portadaColor] ? c.portadaColor : 'azul';
          return '<div class="dr-colores" id="fppIdColores">' + Object.keys(PORTADAS).map(k => '<button type="button" data-c="' + k + '" class="' + (k === colorActual && !(portadaActual && portadaActual.foto) ? 'on' : '') + '" style="background:' + PORTADAS[k][1] + '" aria-label="' + PORTADAS[k][0] + '" title="' + PORTADAS[k][0] + '"></button>').join('') + '</div>' +
            (portadaActual && portadaActual.foto ? '<button type="button" class="dr-quitar-link" id="fppIdPortadaReset">Quitar la foto de portada que tenías y usar este color</button>' : ''); }) +
      seccion('contacto', I.mail, 'Información de contacto', '<p class="fpp-vacia">WhatsApp, correo, LinkedIn, sitio web e Instagram. Tú decides quién ve cada dato.</p>',
        () => '<p class="fpp-vacia" style="margin-bottom:10px">Decide quién ve cada dato.</p>' +
          CANALES.map(ch => campo('fppIdC_' + ch, etqCanal[ch][0], contacto[ch], etqCanal[ch][1]) +
            '<div class="dr-alcance"><small>¿Quién lo ve?</small><select data-alcance="' + ch + '"><option value="miembros"' + (alcanceDe(ch) === 'miembros' ? ' selected' : '') + '>Todos los miembros VIP</option><option value="conexiones"' + (alcanceDe(ch) === 'conexiones' ? ' selected' : '') + '>Solo mis conexiones</option><option value="oculto"' + (alcanceDe(ch) === 'oculto' ? ' selected' : '') + '>Oculto (nadie)</option></select></div>').join('') +
          '<p class="dr-sub">Cédula profesional <small>(opcional)</small></p>' + campo('fppIdCed', 'Cédula profesional', contacto.cedula, '12345678') +
          '<label class="dr-check"><input type="checkbox" id="fppIdCedVis"' + (contacto.cedulaVisible ? ' checked' : '') + '> Mostrar cédula en el directorio</label>');
  }

  // Guarda SOLO el apartado de identidad abierto (el resto de la tarjeta queda tal cual estaba) y refresca el Directorio.
  async function guardarIdentidad(btn, clave) {
    const base = datosBase(), util = window.ftDirUtils || {};
    const tarj = Object.assign({}, base.tarjeta);
    let contactoVals = null;
    if (clave === 'identidad') {
      const nombre = ($('fppIdNombre').value || '').trim();
      if (nombre.length < 2) { showToast('Escribe tu nombre.'); $('fppIdNombre').focus(); return; }
      const ESTADOS = util.ESTADOS || {};
      tarj.nombre = nombre.slice(0, 60); tarj.puesto = ($('fppIdPuesto').value || '').trim().slice(0, 60); tarj.empresa = ($('fppIdEmpresa').value || '').trim().slice(0, 60);
      tarj.ciudad = ($('fppIdCiudad').value || '').trim().slice(0, 60); tarj.especialidad = $('fppIdEsp').value; tarj.bio = ($('fppIdBio').value || '').trim().slice(0, 200);
      tarj.estado = ESTADOS[$('fppIdEstado').value] ? $('fppIdEstado').value : '';
    } else if (clave === 'foto') {
      if (E.avatarDraft !== null) tarj.avatar = /^a(0[1-9]|1[0-6])$/.test(E.avatarDraft) ? E.avatarDraft : '';
      if (E.fotoDraft !== null) { if (E.fotoDraft) tarj.foto = E.fotoDraft; else delete tarj.foto; }
    } else if (clave === 'color') {
      const PORTADAS = util.PORTADAS || {}, elegido = E.colorDraft || tarj.portadaColor;
      tarj.portadaColor = PORTADAS[elegido] ? elegido : 'azul';
    } else if (clave === 'contacto') {
      const CANALES = (util.CONTACTOS || []).filter(k => k !== 'cedula');
      contactoVals = {}; CANALES.forEach(ch => { contactoVals[ch] = ($('fppIdC_' + ch).value || '').trim(); });
      const error = util.contactoLimpio ? util.contactoLimpio(contactoVals) : '';
      if (error) { showToast(error); return; }
      contactoVals.cedula = ($('fppIdCed').value || '').trim(); contactoVals.cedulaVisible = $('fppIdCedVis').checked;
      contactoVals.alcances = {}; document.querySelectorAll('[data-alcance]').forEach(s => { contactoVals.alcances[s.dataset.alcance] = s.value; });
    }
    btn.disabled = true; btn.textContent = 'Guardando…';
    tarj.publicado = E.tarjeta && E.tarjeta.publicado === true;
    tarj.actualizado = firebase.firestore.FieldValue.serverTimestamp();
    try {
      if (contactoVals) await certFetch('/api/directorio/contacto', { method: 'POST', body: JSON.stringify(contactoVals) });
      if (clave === 'color' && E.portadaReset) { try { await certFetch('/api/directorio/portada', { method: 'POST', body: JSON.stringify({ reset: true }) }); } catch (_) { /* no bloquea el resto */ } }
      await db.collection('directorio').doc(uidMio()).set(tarj);
      if (window.ftDirRecargar) try { ftDirRecargar(); } catch (_) { /* el Directorio se refresca solo al visitarlo */ }
      E.identEditando = null; E.fotoDraft = null; E.avatarDraft = null; E.colorDraft = null; E.portadaReset = null;
      showToast('Guardado.');
      await abrir(uidMio());
    } catch (e) { btn.disabled = false; btn.textContent = 'Guardar'; showToast(e.message || 'No se pudo guardar.'); }
  }

  function verSeccion(clave, titulo, visibilidad) {
    const p = E.datos.perfil || {}, mio = E.uid === uidMio();
    const etiqueta = mio && visibilidad ? '<span class="fpp-vis">' + (VIS.find(v => v[0] === visibilidad[clave]) || VIS[0])[1] + '</span><span class="fpp-editic">' + I.lapiz + '</span>' : '';
    // En tu propio perfil, toda la sección es un botón que te lleva a editarla (sin un botón global aparte)
    const abre = mio ? ' data-editsec="' + clave + '" role="button" tabindex="0" aria-label="Editar ' + esc(titulo) + '"' : '';
    const clase = 'fpp-sec' + (mio ? ' fpp-editable' : '');
    if (clave === 'certificaciones') {
      const certs = E.datos.certificados || [];
      if (!certs.length && !mio) return '';
      return '<section class="' + clase + '"' + abre + '><h3>' + I.medalla + ' ' + titulo + etiqueta + '</h3>' + (certs.length ? certs.map(x => '<div class="fpp-cert"><i>' + I.check + '</i><div><b>' + esc(x.curso) + '</b><small>Folio ' + esc(x.folio) + (x.fecha ? ' · ' + esc(x.fecha) : '') + ' · verificable con QR</small></div></div>').join('') : '<p class="fpp-vacia">Termina un curso del Club y tu certificado aparecerá aquí solo (con folio verificable).</p>') + '</section>';
    }
    const valor = p[clave];
    if (valor === undefined) return ''; // sección reservada: el servidor ya la filtró
    if (clave === 'sobreMi') {
      if (!valor && !mio) return '';
      return '<section class="' + clase + '"' + abre + '><h3>' + I.usuario + ' ' + titulo + etiqueta + '</h3>' + (valor ? '<p>' + esc(valor) + '</p>' : '<p class="fpp-vacia">Cuenta en unas líneas quién eres y qué te apasiona de la fisioterapia.</p>') + '</section>';
    }
    const lista = Array.isArray(valor) ? valor : [];
    if (!lista.length && !mio) return '';
    let cuerpo;
    if (clave === 'habilidades') cuerpo = lista.length ? '<div class="fpp-chips">' + lista.map(x => '<span>' + esc(x.nombre) + '</span>').join('') + '</div>' : '<p class="fpp-vacia">Agrega tus técnicas y herramientas.</p>';
    else if (clave === 'idiomas') cuerpo = lista.length ? '<div class="fpp-chips">' + lista.map(x => '<span>' + esc(x.idioma) + (x.nivel ? ' · ' + esc(x.nivel) : '') + '</span>').join('') + '</div>' : '<p class="fpp-vacia">¿Qué idiomas hablas?</p>';
    else if (clave === 'enlaces') cuerpo = lista.length ? lista.map(x => { const u = String(x.url || ''); const seguro = /^https?:\/\//i.test(u) ? u : 'https://' + u.replace(/^[a-z]+:\/\//i, ''); return '<div class="fpp-item"><b>' + esc(x.titulo || u) + '</b><small><a href="' + esc(seguro) + '" target="_blank" rel="noopener noreferrer">' + esc(u) + '</a></small></div>'; }).join('') : '<p class="fpp-vacia">Comparte tu sitio, agenda o redes profesionales.</p>';
    else cuerpo = lista.length ? lista.map(x => '<div class="fpp-item"><b>' + esc(x.puesto || x.titulo || x.nombre || '') + '</b><small>' + esc([x.lugar || x.escuela || x.emisor, x.periodo || x.anio].filter(Boolean).join(' · ')) + '</small>' + (x.descripcion ? '<p>' + esc(x.descripcion) + '</p>' : '') + '</div>').join('') : '<p class="fpp-vacia">Aún no hay nada en esta sección.</p>';
    const iconos = { experiencia: I.maletin, formacion: I.gorro, idiomas: I.globo, habilidades: I.rayo, certificacionesExternas: I.medalla, proyectos: I.carpeta, enlaces: I.enlace };
    return '<section class="' + clase + '"' + abre + '><h3>' + (iconos[clave] || '') + ' ' + titulo + etiqueta + '</h3>' + cuerpo + '</section>';
  }

  function pintar() {
    const raiz = $('fppRaiz'); if (!raiz) return;
    const mio = E.uid === uidMio();
    if (E.editando) return editor(raiz);
    const vis = (E.datos.perfil || {}).visibilidad || null;
    raiz.innerHTML = cabecera(mio) + (mio ? seccionesIdentidad() : '') + SEC.map(s => verSeccion(s[0], s[1], vis)).join('') +
      (!mio && E.datos.conectado === false ? '<div class="fpp-sec fpp-cerrada">' + I.candado + ' Algunas secciones de este perfil son solo para sus conexiones.</div>' : '');
    const bc = $('fppConectar'); if (bc) bc.onclick = async () => {
      bc.disabled = true;
      try { await certFetch('/api/red/solicitar', { method: 'POST', body: JSON.stringify({ uid: E.uid }) }); showToast('Solicitud enviada.'); if (window.ftRed) ftRed.estados[E.uid] = 'enviada'; pintar(); }
      catch (e) { bc.disabled = false; showToast(e.message || 'No se pudo enviar la solicitud.'); }
    };
    // Currículum: tocar cualquier apartado (menos un enlace que lleve a otro lado) abre el editor grande, ya en ese apartado
    if (mio) raiz.querySelectorAll('[data-editsec]').forEach(sec => {
      sec.onclick = e => { if (e.target.closest('a')) return; E.foco = sec.dataset.editsec; E.editando = true; pintar(); };
      sec.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sec.click(); } };
    });
    // Identidad: cada apartado (nombre, foto, color, contacto) se abre, se guarda y se cancela por su cuenta, en su propio lugar
    if (mio) {
      raiz.querySelectorAll('[data-editident]').forEach(sec => {
        sec.onclick = () => { E.identEditando = sec.dataset.editident; E.fotoDraft = null; E.avatarDraft = null; E.colorDraft = null; E.portadaReset = null; pintar(); };
        sec.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sec.click(); } };
      });
      raiz.querySelectorAll('[data-cancelarident]').forEach(b => b.onclick = () => { E.identEditando = null; E.fotoDraft = null; E.avatarDraft = null; E.colorDraft = null; E.portadaReset = null; pintar(); });
      raiz.querySelectorAll('[data-guardarident]').forEach(b => b.onclick = () => guardarIdentidad(b, b.dataset.guardarident));
      if (E.identEditando === 'foto') {
        const c = datosBase().tarjeta;
        const pintarFotoLocal = () => {
          const vista = $('fppIdFotoVista'); if (!vista) return;
          const valor = E.fotoDraft !== null ? E.fotoDraft : (c.foto || '');
          vista.style.backgroundImage = valor ? 'url(' + valor + ')' : ''; vista.classList.toggle('vacia', !valor);
          $('fppIdFotoBtn').textContent = valor ? 'Cambiar foto' : 'Subir foto'; $('fppIdFotoQuitar').hidden = !valor;
        };
        if ($('fppIdFotoBtn')) $('fppIdFotoBtn').onclick = () => $('fppIdFotoArchivo').click();
        if ($('fppIdFotoQuitar')) $('fppIdFotoQuitar').onclick = () => { E.fotoDraft = ''; pintarFotoLocal(); };
        if ($('fppIdFotoArchivo')) $('fppIdFotoArchivo').onchange = async ev => {
          const a = ev.target.files && ev.target.files[0]; ev.target.value = ''; if (!a) return;
          const util = window.ftDirUtils || {}; if (!util.reducirFoto) return;
          try { E.fotoDraft = await util.reducirFoto(a); pintarFotoLocal(); }
          catch (e) { showToast(e.message || 'No se pudo usar esa imagen.'); }
        };
        pintarFotoLocal();
        const pintarAvataresLocal = () => {
          const actual = E.avatarDraft !== null ? E.avatarDraft : (c.avatar || '');
          raiz.querySelectorAll('#fppIdAvatares [data-av]').forEach(b => { const on = b.dataset.av === actual; b.classList.toggle('on', on); b.setAttribute('aria-checked', String(on)); });
          const ini = $('fppIdAvatarIni'); if (ini) ini.hidden = !actual;
        };
        raiz.querySelectorAll('#fppIdAvatares [data-av]').forEach(b => b.onclick = () => { E.avatarDraft = b.dataset.av; pintarAvataresLocal(); });
        if ($('fppIdAvatarIni')) $('fppIdAvatarIni').onclick = () => { E.avatarDraft = ''; pintarAvataresLocal(); };
        pintarAvataresLocal();
      }
      if (E.identEditando === 'color') {
        raiz.querySelectorAll('#fppIdColores [data-c]').forEach(b => b.onclick = () => { E.colorDraft = b.dataset.c; raiz.querySelectorAll('#fppIdColores [data-c]').forEach(x => x.classList.toggle('on', x === b)); });
        if ($('fppIdPortadaReset')) $('fppIdPortadaReset').onclick = () => { E.portadaReset = true; $('fppIdPortadaReset').remove(); };
      }
    }
  }

  // ---------- Editor del currículum (solo el dueño) ----------
  function editor(raiz) {
    const p = E.datos.perfil || {}, vis = p.visibilidad || {};
    const selVis = clave => '<select class="fpp-selvis" data-vis="' + clave + '">' + VIS.map(v => '<option value="' + v[0] + '"' + ((vis[clave] || 'publico') === v[0] ? ' selected' : '') + '>' + v[1] + '</option>').join('') + '</select>';
    const filaEd = (clave, fila) => '<div class="fpp-ed-fila" data-fila="' + clave + '">' + LISTAS[clave].map(c => (c[0] === 'descripcion'
      ? '<textarea data-campo="' + c[0] + '" maxlength="' + c[2] + '" rows="2" placeholder="' + esc(c[1]) + '">' + esc((fila || {})[c[0]] || '') + '</textarea>'
      : '<input data-campo="' + c[0] + '" maxlength="' + c[2] + '" placeholder="' + esc(c[1]) + '" value="' + esc((fila || {})[c[0]] || '') + '">')).join('') +
      '<button type="button" class="fpp-quitar">Quitar</button></div>';
    const secLista = (clave, titulo) => '<section class="fpp-sec" data-seced="' + clave + '"><h3>' + titulo + selVis(clave) + '</h3><div data-lista="' + clave + '">' + (Array.isArray(p[clave]) ? p[clave] : []).map(f => filaEd(clave, f)).join('') + '</div><button type="button" class="fpp-agregar" data-agregar="' + clave + '">+ Agregar</button></section>';
    raiz.innerHTML = '<button type="button" class="fpp-volver" id="fppCancelar">← Cancelar (sin guardar)</button>' +
      '<div class="fpp-cab"><div class="fpp-cuerpo" style="padding-top:18px"><div class="fpp-ey">EDITAR CURRÍCULUM</div><h1>Tu currículum</h1><div class="fpp-sub">Cada sección tiene su propia visibilidad: pública, solo conexiones o privada. Los certificados FisioTeck se agregan solos al terminar un curso.</div></div></div>' +
      '<section class="fpp-sec" data-seced="sobreMi"><h3>Sobre mí' + selVis('sobreMi') + '</h3><label class="fpp-ed-lbl"><textarea id="fppSobre" maxlength="600" rows="4" placeholder="Quién eres, qué te apasiona y a quién ayudas…">' + esc(p.sobreMi || '') + '</textarea></label></section>' +
      '<section class="fpp-sec" data-seced="certificaciones"><h3>Certificados FisioTeck' + selVis('certificaciones') + '</h3><p class="fpp-vacia">Esta sección no se edita: muestra tus certificados reales del Club con folio verificable (' + (E.datos.certificados || []).length + ' hasta hoy). Aquí solo eliges quién la ve.</p></section>' +
      secLista('experiencia', I.maletin + ' Experiencia') + secLista('formacion', I.gorro + ' Formación') + secLista('idiomas', I.globo + ' Idiomas') + secLista('habilidades', I.rayo + ' Habilidades') +
      secLista('certificacionesExternas', I.medalla + ' Otras certificaciones') + secLista('proyectos', I.carpeta + ' Proyectos') + secLista('enlaces', I.enlace + ' Enlaces') +
      '<div class="fpp-acc" style="margin:4px 0 30px"><button type="button" class="fpp-btn p" id="fppGuardar">Guardar mi perfil</button><button type="button" class="fpp-btn" id="fppCancelar2">Cancelar</button></div>';
    const enlazarFilas = () => raiz.querySelectorAll('.fpp-quitar').forEach(b => b.onclick = () => b.closest('.fpp-ed-fila').remove());
    enlazarFilas();
    raiz.querySelectorAll('[data-agregar]').forEach(b => b.onclick = () => { raiz.querySelector('[data-lista="' + b.dataset.agregar + '"]').insertAdjacentHTML('beforeend', filaEd(b.dataset.agregar, {})); enlazarFilas(); });
    // Si llegaste tocando un apartado en particular, el editor se desplaza directo a él
    if (E.foco) {
      const destino = raiz.querySelector('[data-seced="' + E.foco + '"]'); E.foco = null;
      if (destino) setTimeout(() => { destino.scrollIntoView({ behavior: 'smooth', block: 'start' }); const t = destino.querySelector('textarea, input'); if (t) try { t.focus({ preventScroll: true }); } catch (_) { /* sigue */ } }, 60);
    }
    const salir = () => { E.editando = false; pintar(); };
    $('fppCancelar').onclick = salir; $('fppCancelar2').onclick = salir;
    $('fppGuardar').onclick = async () => {
      const b = $('fppGuardar'); b.disabled = true; b.textContent = 'Guardando…';
      const cuerpo = { sobreMi: $('fppSobre').value, visibilidad: {} };
      raiz.querySelectorAll('[data-vis]').forEach(s => { cuerpo.visibilidad[s.dataset.vis] = s.value; });
      Object.keys(LISTAS).forEach(clave => {
        cuerpo[clave] = [...raiz.querySelectorAll('[data-lista="' + clave + '"] .fpp-ed-fila')].map(f => { const o = {}; f.querySelectorAll('[data-campo]').forEach(i => { o[i.dataset.campo] = i.value; }); return o; });
      });
      try { const r = await certFetch('/api/perfil', { method: 'POST', body: JSON.stringify(cuerpo) }); showToast('Currículum guardado (' + (r.avance || 0) + '% completo).'); await abrir(uidMio()); }
      catch (e) { b.disabled = false; b.textContent = 'Guardar mi perfil'; showToast(e.message || 'No se pudo guardar.'); }
    };
  }

  window.ftPerfilPro = { abrir };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
