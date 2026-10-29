/* Club FisioTeck — tarjeta "Completa tu perfil profesional" para cuentas nuevas (como Alintec Food).
   Se muestra una sola vez, después de la bienvenida y del recorrido guiado y antes de elegir el curso de prueba. Pide avatar, nombre completo
   (el que saldrá en los certificados y en el perfil), WhatsApp, consultorio o empresa, ubicación y especialidad; y, en "Ver más", puesto,
   LinkedIn, sitio web e Instagram. Se guarda en la cuenta (members), en el avatar y como tarjeta PRIVADA del Directorio (nadie la ve hasta que
   la persona decide publicarla); el contacto lo guarda el servidor. Se puede omitir y completar luego en Mi perfil o en Directorio.
   Depende de index.html: auth, db, certFetch, showToast, loadUserProfile; de club-avatar.js (ftAvatarUrl, ftAvatarElegir), club-directorio.js
   (ftDirEspecialidades), club-bienvenida.js y club-recorrido.js (ftCola). */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => (auth.currentUser || {}).uid || 'x';
  const clave = () => 'ft_perfil_' + uid();
  const AVATARES = Array.from({ length: 16 }, (_, i) => 'a' + String(i + 1).padStart(2, '0'));
  let ov = null;

  const nueva = () => { const u = auth.currentUser, c = u && u.metadata && u.metadata.creationTime ? new Date(u.metadata.creationTime).getTime() : 0; return !!c && Date.now() - c <= 3 * 864e5; };
  const marcado = () => { try { return localStorage.getItem(clave()) === '1'; } catch (_) { return false; } };
  function marcar() {
    try { localStorage.setItem(clave(), '1'); } catch (_) { /* modo privado */ }
    try { if (auth.currentUser && window.db) db.collection('members').doc(uid()).set({ onboarding: { perfilVisto: true } }, { merge: true }); } catch (_) { /* sin conexión */ }
  }
  // Solo las cuentas nuevas que todavía no la han visto
  const pendiente = () => !!auth.currentUser && nueva() && !marcado();

  function tourListo() {
    try { if (localStorage.getItem('ft_tour_' + uid()) === '1') return true; } catch (_) { /* sin almacenamiento */ }
    return typeof achievementData !== 'undefined' && !!achievementData.bienvenida;
  }

  const ICON = {
    nombre: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
    whatsapp: '<path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z"/>',
    empresa: '<rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V4h6v3M4 13h16"/>',
    ciudad: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    especialidad: '<path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2 8 12.7 4 8.8l5.5-.8z"/>',
    puesto: '<path d="M4 7h16v12H4zM9 7V4h6v3"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v6M8 7.5v.01M12 16v-3.5a2 2 0 0 1 4 0V16M12 10v6"/>',
    web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>'
  };
  const campo = (id, et, ph, max, tipo, ayuda) => '<div class="fpi-campo' + (id === 'nombre' ? ' fpi-full' : '') + '"><label for="fpi-' + id + '"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICON[id] || '') + '</svg>' + et + '</label>' +
    '<input id="fpi-' + id + '" data-c="' + id + '" maxlength="' + max + '" placeholder="' + esc(ph) + '"' + (tipo ? ' type="' + tipo + '"' : '') + ' autocomplete="' + (id === 'nombre' ? 'name' : 'off') + '">' + (ayuda ? '<small class="fpi-ayuda">' + ayuda + '</small>' : '') + '</div>';

  async function datosActuales() {
    const u = auth.currentUser, r = { nombre: (u && u.displayName) || '', whatsapp: '', especialidad: '', avatar: '' };
    try { const s = await db.collection('members').doc(uid()).get(); if (s.exists) { const m = s.data() || {}; r.nombre = m.name || r.nombre; r.whatsapp = m.phone || ''; r.especialidad = m.specialty || ''; r.avatar = m.avatar || ''; } } catch (_) { /* sin datos previos */ }
    return r;
  }

  async function mostrar() {
    if (ov || !auth.currentUser) return;
    const ini = await datosActuales();
    if (ov) return;
    let avatar = AVATARES.includes(ini.avatar) ? ini.avatar : '';
    const esp = (window.ftDirEspecialidades || ['Fisioterapia deportiva', 'Ortopedia y traumatología', 'Neurorrehabilitación', 'Geriatría', 'Pediatría', 'Otra']);
    ov = document.createElement('div');
    ov.id = 'ftPerfilIni'; ov.className = 'fpi-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-labelledby', 'fpiTitulo');
    ov.innerHTML = '<div class="fpi-caja"><div class="fpi-scroll">' +
      '<div class="fpi-portada"><span class="fpi-kick">Bienvenido a FisioTeck</span><h2 id="fpiTitulo">Completa tu perfil profesional</h2><p>Para que otros profesionales te conozcan y puedan contactarte.</p></div>' +
      '<div class="fpi-fila"><div class="fpi-foto" id="fpiFoto"></div><div class="fpi-avatares" role="radiogroup" aria-label="Elige tu avatar">' +
      AVATARES.map((id, i) => '<button type="button" role="radio" aria-checked="false" aria-label="Avatar ' + (i + 1) + '" data-av="' + id + '"><img src="' + esc(window.ftAvatarUrl ? ftAvatarUrl(id) : 'assets/avatares/' + id + '.svg') + '" alt=""></button>').join('') + '</div></div>' +
      '<div class="fpi-avance"><div class="fpi-avance-f"><span>Tu perfil</span><b id="fpiPct"></b></div><div class="fpi-barra"><i id="fpiBarra"></i></div></div>' +
      '<div class="fpi-form">' + campo('nombre', 'Nombre completo', 'Nombre y apellidos', 60, '', 'Este es el nombre que aparecerá en tu perfil y en tus certificados.') + campo('whatsapp', 'WhatsApp', 'Ej. 52 238 123 4567', 20, 'tel') + campo('empresa', 'Consultorio o empresa', 'Ej. Clínica Movimiento', 60) + campo('ciudad', 'Ubicación', 'Ej. Puebla, Puebla', 60) +
      '<div class="fpi-campo"><label for="fpi-especialidad"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON.especialidad + '</svg>Especialidad</label><select id="fpi-especialidad" data-c="especialidad"><option value="">Selecciona…</option>' + esp.map(e => '<option>' + esc(e) + '</option>').join('') + '</select></div></div>' +
      '<details class="fpi-mas"><summary><span class="si">Ver más</span><span class="no">Ver menos</span> <em>puesto, redes sociales y sitio web (opcional)</em></summary><div class="fpi-form">' +
      campo('puesto', 'Puesto o cargo', 'Ej. Fisioterapeuta', 60) + campo('linkedin', 'LinkedIn', 'linkedin.com/in/tu-perfil', 120) + campo('web', 'Sitio web', 'tusitio.com', 120) + campo('instagram', 'Instagram profesional', '@tuusuario', 60) + '</div></details></div>' +
      '<div class="fpi-pie"><p class="fpi-hint" id="fpiHint" role="alert"></p><button type="button" class="fpi-ok" id="fpiGuardar">Guardar mi perfil</button><button type="button" class="fpi-luego" id="fpiLuego">Completar más tarde</button>' +
      '<p class="fpi-nota"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg><span>Nadie ve tus datos hasta que tú decidas publicarlos en el Directorio.</span></p></div></div>';
    document.body.appendChild(ov); document.body.classList.add('modal-open');
    const val = id => String((ov.querySelector('[data-c="' + id + '"]') || {}).value || '').trim().replace(/\s+/g, ' ');
    const poner = (id, v) => { const e = ov.querySelector('[data-c="' + id + '"]'); if (e) e.value = v || ''; };
    poner('nombre', ini.nombre); poner('whatsapp', ini.whatsapp); poner('especialidad', ini.especialidad);
    const pintarFoto = () => {
      const f = $('fpiFoto');
      if (avatar) f.innerHTML = '<img src="' + esc(window.ftAvatarUrl ? ftAvatarUrl(avatar) : 'assets/avatares/' + avatar + '.svg') + '" alt="">';
      else f.textContent = ((val('nombre').split(' ').filter(Boolean).slice(0, 2).map(x => x.charAt(0)).join('')) || '?').toUpperCase();
      ov.querySelectorAll('[data-av]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.av === avatar)));
    };
    const BASE = ['nombre', 'whatsapp', 'empresa', 'ciudad', 'especialidad'];
    const refrescar = () => {
      const llenos = BASE.filter(c => val(c)).length + (avatar ? 1 : 0), pct = Math.round(llenos / (BASE.length + 1) * 100);
      $('fpiBarra').style.width = pct + '%'; $('fpiPct').textContent = pct === 100 ? '¡Perfil completo!' : pct + '% completo';
      ov.querySelectorAll('.fpi-campo input, .fpi-campo select').forEach(i => i.classList.toggle('ok', !!i.value.trim()));
      if (!avatar) pintarFoto();
    };
    ov.querySelectorAll('[data-av]').forEach(b => b.onclick = () => { avatar = b.dataset.av; pintarFoto(); refrescar(); });
    ov.addEventListener('input', refrescar); ov.addEventListener('change', refrescar);
    pintarFoto(); refrescar();

    let guardando = false;
    const cerrar = () => { document.removeEventListener('keydown', tecla, true); if (ov) ov.remove(); ov = null; document.body.classList.remove('modal-open'); marcar(); };
    function tecla(e) { if (e.key === 'Escape' && !guardando) { e.stopPropagation(); cerrar(); } }
    document.addEventListener('keydown', tecla, true);
    $('fpiLuego').onclick = () => { if (!guardando) { if (window.showToast) showToast('Puedes completarlo luego en Mi perfil o Directorio.'); cerrar(); } };
    $('fpiGuardar').onclick = async () => {
      const hint = $('fpiHint'), btn = $('fpiGuardar'); hint.textContent = '';
      const nombre = val('nombre');
      if (nombre.length < 3) { hint.textContent = 'Escribe tu nombre completo (nombre y apellidos).'; $('fpi-nombre').focus(); return; }
      guardando = true; btn.disabled = true; btn.textContent = 'Guardando…';
      try {
        await db.collection('members').doc(uid()).update({ name: nombre.slice(0, 80), phone: val('whatsapp').slice(0, 20), specialty: val('especialidad') });
        try { await auth.currentUser.updateProfile({ displayName: nombre.slice(0, 80) }); } catch (_) { /* queda el nombre de la ficha */ }
        if (avatar && avatar !== ini.avatar && window.ftAvatarElegir) { try { await ftAvatarElegir(avatar); } catch (_) { /* se puede cambiar en Mi perfil */ } }
        // Contacto (lo guarda el servidor) y tarjeta PRIVADA del Directorio, solo si todavía no tiene una
        try { await certFetch('/api/directorio/contacto', { method: 'POST', body: JSON.stringify({ whatsapp: val('whatsapp'), linkedin: val('linkedin'), web: val('web'), instagram: val('instagram') }) }); } catch (_) { /* se puede completar en Directorio */ }
        try {
          const ref = db.collection('directorio').doc(uid()), s = await ref.get();
          if (!s.exists) await ref.set({ nombre: nombre.slice(0, 60), puesto: val('puesto').slice(0, 60), empresa: val('empresa').slice(0, 60), ciudad: val('ciudad').slice(0, 60), especialidad: val('especialidad'), bio: '', estado: '', portadaColor: 'azul', avatar: avatar || '', publicado: false, actualizado: firebase.firestore.FieldValue.serverTimestamp() });
        } catch (_) { /* sin tarjeta: se crea desde Directorio */ }
        try { if (typeof loadUserProfile === 'function') loadUserProfile(); if (window.ftBarra) ftBarra.refrescar(); if (window.ftPerfil) ftPerfil.refrescar(); } catch (_) { /* se actualiza al recargar */ }
        guardando = false; cerrar();
        if (window.showToast) showToast('¡Listo! Tu perfil quedó guardado. Sigue privado hasta que lo publiques en el Directorio.');
      } catch (e) { guardando = false; btn.disabled = false; btn.textContent = 'Guardar mi perfil'; hint.textContent = 'No se pudo guardar. Intenta de nuevo.'; }
    };
    setTimeout(() => { const n = $('fpi-nombre'); if (n && !n.value) n.focus({ preventScroll: true }); }, 80);
  }

  // Arranque: después de la bienvenida y del recorrido, una sola vez y cuando no haya otra ventana encima
  function intentar() {
    if (!pendiente() || ov || !window.ftCola) return;
    if (window.ftBienvenida && !ftBienvenida.vista()) return;
    if (!tourListo()) return;
    ftCola.cuandoLibre(() => { if (pendiente() && !ov) mostrar(); }, 'perfil');
  }
  setInterval(intentar, 3000);
  window.ftPerfilInicial = { mostrar, pendiente };
})();
