/* Club FisioTeck — correos de cuenta con la plantilla de FisioTeck (como Alintec y Zoorigen):
   · confirmar el correo al registrarse (el servidor manda el correo; si no está configurado, se usa el de Firebase),
   · "¿Olvidaste tu contraseña?" en el inicio de sesión,
   · y las dos páginas a las que llegan los enlaces del correo (?modo=verifyEmail / ?modo=resetPassword).
   Depende de index.html: auth, CERT_API, certFetch, showToast. */
(function () {
  'use strict';
  const q = new URLSearchParams(location.search);

  // ---------- Ventana sencilla ----------
  function ventana(titulo, cuerpoHTML) {
    const ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;z-index:10100;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(6,11,18,.72);';
    ov.innerHTML = '<div role="dialog" aria-modal="true" style="width:100%;max-width:420px;background:var(--surface,#fff);color:var(--text,#0B1A30);border-radius:16px;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,.35);">' +
      '<h3 style="margin:0 0 10px;font-size:1.15rem;">' + titulo + '</h3><div id="ftCorreoCuerpo">' + cuerpoHTML + '</div></div>';
    document.body.appendChild(ov);
    return { cuerpo: ov.querySelector('#ftCorreoCuerpo'), cerrar() { ov.remove(); } };
  }
  const campo = 'width:100%;padding:12px 14px;border-radius:10px;border:1px solid var(--border,#D8E3EE);background:var(--bg,#fff);color:inherit;font:inherit;margin:8px 0;';
  const boton = 'padding:12px 18px;border-radius:10px;border:0;background:var(--accent,#0D5FA0);color:#fff;font:inherit;font-weight:600;cursor:pointer;';
  const secundario = 'padding:12px 18px;border-radius:10px;border:1px solid var(--border,#D8E3EE);background:transparent;color:inherit;font:inherit;cursor:pointer;';
  const aviso = (t, mal) => '<p style="margin:8px 0;font-size:.88rem;color:' + (mal ? '#DC2D3F' : 'var(--text-light,#33475B)') + ';">' + t + '</p>';
  const toast = m => (typeof showToast === 'function' ? showToast(m) : alert(m));

  // ---------- Confirmar el correo ----------
  // Pide al servidor que mande el correo con la plantilla de FisioTeck. Si no se puede, cae al correo estándar de Firebase.
  window.ftEnviarVerificacion = async function (user) {
    try {
      const token = await user.getIdToken();
      const r = await fetch(CERT_API + '/api/auth/send-verification', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: '{}' });
      if (r.ok) return 'servidor';
      if (r.status === 429) return 'limite';
    } catch (_) { /* sin servidor: respaldo */ }
    try { await user.sendEmailVerification(); return 'firebase'; } catch (_) { return 'error'; }
  };

  // ---------- Verifica tu correo: tarjeta que bloquea el panel hasta que se confirme el correo ----------
  // Aplica a cuentas de correo y contraseña que todavía no son miembros; con Google el correo ya viene verificado.
  // Se actualiza sola cada 4 segundos y al volver a la pestaña; cuando el correo queda confirmado se recarga el Club.
  window.ftMostrarVerificacion = function (user, recienCreada) {
    if (document.getElementById('ftGateCorreo')) return;
    window.__ftGateActivo = true;
    const ov = document.createElement('div');
    ov.id = 'ftGateCorreo'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-labelledby', 'ftGateTitulo');
    ov.style.cssText = 'position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(6,14,26,.78);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);overflow:auto;';
    const btn = 'width:100%;border:0;border-radius:12px;padding:13px 16px;font:inherit;font-size:.92rem;font-weight:700;cursor:pointer;';
    ov.innerHTML = '<div style="width:100%;max-width:420px;background:var(--surface,#fff);color:var(--text,#0B1A30);border-radius:24px;padding:30px 26px;text-align:center;box-shadow:0 24px 70px rgba(0,0,0,.45);border:1px solid var(--border,#D8E3EE);">' +
      '<div aria-hidden="true" style="width:58px;height:58px;margin:0 auto 14px;border-radius:18px;display:grid;place-items:center;background:var(--accent-ghost,#E6F0FA);color:var(--accent,#0D5FA0);"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></div>' +
      '<h2 id="ftGateTitulo" style="margin:0 0 10px;font-size:1.4rem;font-weight:800;letter-spacing:-.02em;">Verifica tu correo</h2>' +
      '<p style="margin:0 0 8px;font-size:.95rem;line-height:1.55;color:var(--text-light,#33475B);">Te enviamos un enlace a <strong id="ftGateCorreo2"></strong>. Ábrelo para activar tu cuenta y entrar al Club.</p>' +
      '<p style="margin:0 0 20px;font-size:.82rem;line-height:1.5;color:var(--text-muted,#6C8299);">Si no lo ves, revisa Spam o Promociones. Esta tarjeta se actualiza sola cuando lo verifiques.</p>' +
      '<button type="button" id="ftGateListo" style="' + btn + 'background:var(--accent,#0D5FA0);color:#fff;margin-bottom:10px;">Ya verifiqué</button>' +
      '<button type="button" id="ftGateReenviar" style="' + btn + 'background:var(--surface-2,#EEF4FB);color:var(--text,#0B1A30);margin-bottom:10px;">Reenviar correo</button>' +
      '<button type="button" id="ftGateSalir" style="' + btn + 'background:transparent;color:var(--text-muted,#6C8299);font-weight:600;font-size:.82rem;padding:8px;">Cerrar sesión / usar otra cuenta</button>' +
      '<div id="ftGateAviso" role="status" style="min-height:18px;margin-top:8px;font-size:.82rem;color:var(--text-light,#33475B);"></div></div>';
    document.body.appendChild(ov);
    ov.querySelector('#ftGateCorreo2').textContent = user.email || 'tu correo';
    const listo = ov.querySelector('#ftGateListo'), reenviar = ov.querySelector('#ftGateReenviar'), salir = ov.querySelector('#ftGateSalir'), msg = ov.querySelector('#ftGateAviso');
    let terminado = false, espera = 0;
    const revisar = async manual => {
      if (terminado) return;
      try {
        await user.reload();
        if (user.emailVerified) { terminado = true; await user.getIdToken(true); location.reload(); return; }
        if (manual) msg.textContent = 'Aún no aparece verificado. Abre el enlace del correo y vuelve a intentar.';
      } catch (_) { if (manual) msg.textContent = 'No pudimos comprobarlo. Intenta de nuevo.'; }
    };
    listo.onclick = async () => { listo.disabled = true; await revisar(true); listo.disabled = false; };
    const reloj = setInterval(() => revisar(false), 4000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) revisar(false); });
    const enfriar = () => { if (espera <= 0) { reenviar.disabled = false; reenviar.textContent = 'Reenviar correo'; return; } reenviar.textContent = 'Reenviar correo (' + espera + ' s)'; espera -= 1; setTimeout(enfriar, 1000); };
    reenviar.onclick = async () => {
      reenviar.disabled = true; msg.textContent = 'Enviando…';
      const r = await window.ftEnviarVerificacion(user);
      msg.textContent = r === 'limite' ? 'Espera un momento antes de pedir otro correo.' : r === 'error' ? 'No pudimos enviarlo ahora. Intenta más tarde.' : 'Correo enviado. Revisa tu bandeja y spam.';
      espera = 60; enfriar();
    };
    salir.onclick = async () => { clearInterval(reloj); try { await auth.signOut(); } catch (_) { /* sin sesión */ } location.reload(); };
    if (recienCreada) { msg.textContent = 'Cuenta creada. Te enviamos el correo de confirmación.'; espera = 60; enfriar(); }
    setTimeout(() => listo.focus({ preventScroll: true }), 50);
  };

  // ---------- Olvidé mi contraseña ----------
  window.ftOlvideContrasena = function () {
    const previo = (document.getElementById('login-email') || {}).value || '';
    const w = ventana('Restablecer contraseña',
      aviso('Escribe el correo de tu cuenta y te enviamos un enlace para crear una nueva contraseña.') +
      '<input id="ftRstCorreo" type="email" autocomplete="email" placeholder="tu@correo.com" style="' + campo + '" value="' + previo.replace(/"/g, '&quot;') + '">' +
      '<div id="ftRstMsg"></div><div style="display:flex;gap:10px;justify-content:flex-end;margin-top:10px;"><button type="button" id="ftRstNo" style="' + secundario + '">Cancelar</button><button type="button" id="ftRstSi" style="' + boton + '">Enviar enlace</button></div>');
    w.cuerpo.querySelector('#ftRstNo').onclick = w.cerrar;
    const msg = w.cuerpo.querySelector('#ftRstMsg'), si = w.cuerpo.querySelector('#ftRstSi');
    si.onclick = async () => {
      const email = w.cuerpo.querySelector('#ftRstCorreo').value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.innerHTML = aviso('Escribe un correo válido.', true); return; }
      si.disabled = true; si.textContent = 'Enviando…';
      try {
        const r = await fetch(CERT_API + '/api/auth/reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
        if (r.status === 503) { await auth.sendPasswordResetEmail(email); } // sin Resend: correo estándar de Firebase
        else if (!r.ok) { const d = await r.json().catch(() => ({})); throw new Error(d.error || 'No se pudo enviar el correo.'); }
        w.cuerpo.innerHTML = aviso('Si ese correo tiene una cuenta, te enviamos el enlace. Revisa también tu carpeta de spam. Es válido por 1 hora.') +
          '<div style="text-align:right;margin-top:10px;"><button type="button" id="ftRstOk" style="' + boton + '">Entendido</button></div>';
        w.cuerpo.querySelector('#ftRstOk').onclick = w.cerrar;
      } catch (e) { msg.innerHTML = aviso(e.message || 'No se pudo enviar el correo.', true); si.disabled = false; si.textContent = 'Enviar enlace'; }
    };
  };
  function enlaceOlvide() {
    const pass = document.getElementById('login-pass');
    if (!pass || document.getElementById('ftOlvide')) return;
    const a = document.createElement('button');
    a.type = 'button'; a.id = 'ftOlvide'; a.textContent = '¿Olvidaste tu contraseña?';
    a.style.cssText = 'display:block;margin:2px 0 12px auto;background:none;border:0;padding:4px 0;color:var(--accent,#0D5FA0);font:inherit;font-size:.86rem;cursor:pointer;text-decoration:underline;';
    a.onclick = window.ftOlvideContrasena;
    const etiqueta = pass.closest('label') || pass;
    etiqueta.insertAdjacentElement('afterend', a);
  }

  // ---------- Páginas de los enlaces del correo ----------
  async function procesarEnlace() {
    const modo = q.get('modo'), codigo = q.get('oobCode');
    if (!codigo || (modo !== 'verifyEmail' && modo !== 'resetPassword')) return;
    history.replaceState(null, '', location.pathname); // el código no se queda en la barra
    if (modo === 'verifyEmail') {
      try {
        await auth.applyActionCode(codigo);
        if (auth.currentUser) { await auth.currentUser.reload(); await auth.currentUser.getIdToken(true); }
        toast('¡Correo confirmado! Gracias.');
      } catch (_) { toast('El enlace de confirmación ya se usó o venció. Pide otro desde tu cuenta.'); }
      return;
    }
    let correo = '';
    try { correo = await auth.verifyPasswordResetCode(codigo); }
    catch (_) { toast('El enlace para cambiar la contraseña ya se usó o venció. Pide uno nuevo.'); return; }
    const w = ventana('Crea tu nueva contraseña',
      aviso('Cuenta: <b>' + correo.replace(/</g, '&lt;') + '</b>') +
      '<input id="ftNp1" type="password" autocomplete="new-password" placeholder="Nueva contraseña (mínimo 6 caracteres)" style="' + campo + '">' +
      '<input id="ftNp2" type="password" autocomplete="new-password" placeholder="Repite la contraseña" style="' + campo + '">' +
      '<div id="ftNpMsg"></div><div style="text-align:right;margin-top:10px;"><button type="button" id="ftNpSi" style="' + boton + '">Guardar contraseña</button></div>');
    const msg = w.cuerpo.querySelector('#ftNpMsg'), si = w.cuerpo.querySelector('#ftNpSi');
    si.onclick = async () => {
      const a = w.cuerpo.querySelector('#ftNp1').value, b = w.cuerpo.querySelector('#ftNp2').value;
      if (a.length < 6) { msg.innerHTML = aviso('La contraseña debe tener al menos 6 caracteres.', true); return; }
      if (a !== b) { msg.innerHTML = aviso('Las contraseñas no coinciden.', true); return; }
      si.disabled = true;
      try { await auth.confirmPasswordReset(codigo, a); w.cerrar(); toast('Contraseña actualizada. Ya puedes iniciar sesión.'); }
      catch (e) { msg.innerHTML = aviso('No se pudo guardar. El enlace pudo vencer; pide uno nuevo.', true); si.disabled = false; }
    };
  }

  function montar() { enlaceOlvide(); procesarEnlace(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
