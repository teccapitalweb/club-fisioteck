/* Club FisioTeck — Soporte y «¿Olvidaste tu contraseña?» dentro del panel.
   · Soporte: el miembro cuenta su queja, sugerencia o problema; el reporte llega al panel del administrador (POST /api/soporte) y la respuesta
     aparece en «Mis reportes» y en la campana. Ya no se manda a un número de WhatsApp.
   · Mi perfil: botón para que le llegue por correo el enlace de restablecer contraseña (POST /api/auth/reset-password).
   Depende de index.html: auth, certFetch, CERT_API, showPage, showToast. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const TIPO_DE = m => /sugerencia/i.test(m) ? 'sugerencia' : /queja/i.test(m) ? 'queja' : /dudas/i.test(m) ? 'pregunta' : /error|problema|no puedo/i.test(m) ? 'problema' : 'otro';
  const NOMBRE_TIPO = { queja: 'Queja', sugerencia: 'Sugerencia', problema: 'Problema', pregunta: 'Pregunta', otro: 'Otro' };
  const NOMBRE_ESTADO = { nuevo: ['Recibido', '#0D5FA0'], revision: ['En revisión', '#B45309'], resuelto: ['Resuelto', '#0F9D6C'] };

  const st = document.createElement('style');
  st.textContent = `
  .ftsop-tit { margin:0 0 10px; font:700 .72rem 'JetBrains Mono',monospace; letter-spacing:.14em; text-transform:uppercase; color:var(--text-muted); }
  .ftsop-item { padding:14px 16px; border-radius:14px; border:1px solid var(--border); background:var(--surface-2); margin-bottom:10px; }
  .ftsop-cab { display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:.78rem; color:var(--text-muted); }
  .ftsop-badge { padding:2px 9px; border-radius:100px; font:700 .62rem 'JetBrains Mono',monospace; letter-spacing:.06em; text-transform:uppercase; color:#fff; }
  .ftsop-item b { display:block; margin:6px 0 4px; font-size:.92rem; } .ftsop-item p { margin:0; font-size:.84rem; line-height:1.5; color:var(--text-light); white-space:pre-line; }
  .ftsop-resp { margin-top:10px; padding:10px 12px; border-radius:10px; background:var(--accent-ghost); border-left:3px solid var(--accent); font-size:.84rem; line-height:1.5; } .ftsop-resp small { display:block; margin-bottom:3px; font-weight:700; color:var(--accent); }`;
  document.head.appendChild(st);

  // El motivo «Queja» no estaba en la lista de siempre
  function opciones() {
    const sel = $('supportReason'); if (!sel || sel.querySelector('option[value="Queja o inconformidad"]')) return;
    const otro = sel.querySelector('option[value="Otro"]'), o = document.createElement('option'); o.value = 'Queja o inconformidad'; o.textContent = 'Queja o inconformidad';
    sel.insertBefore(o, otro);
  }

  window.sendSupport = async function () {
    const reason = ($('supportReason') || {}).value, otro = (($('supportOtherText') || {}).value || '').trim(), detalle = (($('supportDetail') || {}).value || '').trim();
    const urgencia = (document.querySelector('input[name="urgency"]:checked') || {}).value || 'Media';
    if (!reason) { showToast('Selecciona un motivo de contacto'); return; }
    if (reason === 'Otro' && !otro) { showToast('Especifica el motivo'); return; }
    if (detalle.length < 10) { showToast('Cuéntanos con un poco más de detalle lo que pasó o lo que necesitas'); return; }
    const btn = $('supportSend'); if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }
    try {
      const asunto = reason === 'Otro' ? otro : reason;
      await certFetch('/api/soporte', { method: 'POST', body: JSON.stringify({ tipo: TIPO_DE(asunto), asunto, mensaje: detalle + '\n\nUrgencia: ' + urgencia, pagina: (document.querySelector('.section.active') || {}).id ? document.querySelector('.section.active').id.replace(/^page-/, '') : '' }) });
      showToast('Recibimos tu reporte. Te responderemos aquí mismo.');
      if ($('supportDetail')) $('supportDetail').value = ''; if ($('supportReason')) $('supportReason').value = ''; if ($('supportOtherText')) $('supportOtherText').value = '';
      const g = $('supportOtherGroup'); if (g) g.style.display = 'none';
      mios();
    } catch (e) { showToast((e && e.message) || 'No se pudo enviar el reporte. Intenta de nuevo.'); }
    if (btn) { btn.disabled = false; btn.textContent = 'Enviar reporte'; }
  };

  async function mios() {
    const caja = $('ftSoporteMios'); if (!caja || !auth.currentUser) return;
    try {
      const r = await certFetch('/api/soporte/mios');
      const l = r.reportes || [];
      caja.innerHTML = l.length ? '<h4 class="ftsop-tit">Mis reportes</h4>' + l.map(x => {
        const e = NOMBRE_ESTADO[x.estado] || NOMBRE_ESTADO.nuevo, f = new Date(x.creadoMs).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
        return '<div class="ftsop-item"><div class="ftsop-cab"><span class="ftsop-badge" style="background:' + e[1] + '">' + e[0] + '</span><span>' + esc(NOMBRE_TIPO[x.tipo] || 'Otro') + ' · ' + esc(f) + '</span></div><b>' + esc(x.asunto) + '</b><p>' + esc(x.mensaje) + '</p>' +
          (x.respuesta ? '<div class="ftsop-resp"><small>Respuesta del equipo</small>' + esc(x.respuesta) + '</div>' : '') + '</div>';
      }).join('') : '';
    } catch (_) { /* sin servidor: no se muestra la lista */ }
  }

  function abrir() {
    showPage('settings');
    setTimeout(() => { const s = $('ftSoporte'); if (s) { s.scrollIntoView({ behavior: 'smooth', block: 'start' }); const d = $('supportReason'); if (d) d.focus({ preventScroll: true }); } }, 250);
  }

  // ---------- ¿Olvidaste tu contraseña? en Mi perfil ----------
  function correoCuenta() {
    const u = auth.currentUser, c = $('ftOlvideCorreo'), b = $('ftOlvideBtn'); if (!u || !c || !b) return;
    const conClave = (u.providerData || []).some(p => p.providerId === 'password');
    c.textContent = u.email || 'tu correo';
    if (!conClave) { b.disabled = true; b.textContent = 'Tu cuenta entra con Google (no usa contraseña)'; }
    b.onclick = async () => {
      if (!conClave) return;
      b.disabled = true; b.textContent = 'Enviando…';
      try {
        const r = await fetch(CERT_API + '/api/auth/reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: u.email }) });
        if (r.status === 503) await auth.sendPasswordResetEmail(u.email);
        else if (!r.ok) { const d = await r.json().catch(() => ({})); throw new Error(d.error || 'No se pudo enviar el correo.'); }
        showToast('Listo. Revisa tu correo (y la carpeta de spam): te enviamos el enlace para restablecer tu contraseña.');
        b.textContent = 'Correo enviado'; setTimeout(() => { b.disabled = false; b.textContent = 'Enviarme el correo para restablecerla'; }, 30000);
      } catch (e) { showToast(e.message || 'No se pudo enviar el correo.'); b.disabled = false; b.textContent = 'Enviarme el correo para restablecerla'; }
    };
  }

  const pg = window.showPage;
  window.showPage = function (page) {
    const r = pg.apply(this, arguments);
    if (page === 'settings') { opciones(); mios(); }
    if (page === 'account') correoCuenta();
    return r;
  };
  auth.onAuthStateChanged(u => { if (u) { opciones(); correoCuenta(); } });
  window.ftSoporte = { abrir, mios };
})();
