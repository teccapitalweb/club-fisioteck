/* Club FisioTeck — Eliminar mi cuenta (Mi perfil). La persona puede borrar su cuenta cuando quiera y se borra TODO lo suyo:
   el servidor (POST /api/cuenta/eliminar) cancela su suscripción de inmediato, borra su historial, certificados, reseñas, directorio, referidos,
   créditos y foro, y por último su acceso. Aquí solo se pide la confirmación escribiendo ELIMINAR.
   Depende de index.html: auth, certFetch, showToast, showPage. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function pintarTarjeta() {
    const pagina = $('page-account'); if (!pagina || $('ftEliminarCuenta')) return;
    const t = document.createElement('div');
    t.className = 'card ftc-peligro'; t.id = 'ftEliminarCuenta';
    t.innerHTML = '<h3>Eliminar mi cuenta</h3><p>Puedes borrar tu cuenta cuando quieras. Se elimina <b>todo</b> lo tuyo: tu historial, avance, certificados, reseñas, tarjeta del directorio, créditos y publicaciones del foro. Esta acción no se puede deshacer.</p>' +
      '<button type="button" class="ftc-btn" id="ftcAbrir">Eliminar mi cuenta</button>';
    pagina.appendChild(t);
    $('ftcAbrir').onclick = abrir;
  }

  function abrir() {
    if (!auth.currentUser) return;
    const previo = $('ftcOverlay'); if (previo) previo.remove();
    const o = document.createElement('div');
    o.id = 'ftcOverlay'; o.className = 'ftc-overlay'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true'); o.setAttribute('aria-labelledby', 'ftcTitulo');
    o.innerHTML = '<div class="ftc-caja"><h3 id="ftcTitulo">¿Eliminar tu cuenta para siempre?</h3>' +
      '<p>Se borrará de inmediato y <b>no podremos recuperarla</b>:</p>' +
      '<ul><li>Tu historial, avance en cursos, logros y créditos.</li><li>Tus certificados (dejarán de poder verificarse) y reseñas.</li><li>Tu tarjeta del directorio y tus publicaciones del foro.</li><li>Tu suscripción se cancela ya y no se te vuelve a cobrar. El procesador de pagos conserva sus propios registros de cobros.</li></ul>' +
      '<label for="ftcConfirmar">Para confirmar, escribe <b>ELIMINAR</b></label><input id="ftcConfirmar" autocomplete="off" autocapitalize="characters" spellcheck="false">' +
      '<p class="ftc-error" id="ftcError" hidden></p>' +
      '<div class="ftc-acciones"><button type="button" class="ftc-sec" id="ftcCancelar">Cancelar</button><button type="button" class="ftc-btn" id="ftcOk" disabled>Eliminar para siempre</button></div></div>';
    document.body.appendChild(o);
    const inp = $('ftcConfirmar'), ok = $('ftcOk'), err = $('ftcError');
    setTimeout(() => inp.focus(), 60);
    const cerrar = () => o.remove();
    $('ftcCancelar').onclick = cerrar;
    o.addEventListener('click', e => { if (e.target === o && !ok.dataset.ocupado) cerrar(); });
    o.addEventListener('keydown', e => { if (e.key === 'Escape' && !ok.dataset.ocupado) cerrar(); });
    inp.oninput = () => { ok.disabled = inp.value.trim().toUpperCase() !== 'ELIMINAR'; };
    ok.onclick = async () => {
      ok.disabled = true; ok.dataset.ocupado = '1'; ok.textContent = 'Eliminando…'; err.hidden = true;
      try {
        const uid = auth.currentUser.uid;
        await certFetch('/api/cuenta/eliminar', { method: 'POST', body: JSON.stringify({ confirmar: inp.value.trim() }) });
        try { Object.keys(localStorage).filter(k => k.indexOf(uid) !== -1 || k.indexOf('ft_') === 0 || k.indexOf('ft:') === 0).forEach(k => localStorage.removeItem(k)); } catch (_) { /* modo privado */ }
        cerrar();
        try { await auth.signOut(); } catch (_) { /* la sesión ya no existe */ }
        showToast('Tu cuenta fue eliminada.');
        setTimeout(() => location.reload(), 1200);
      } catch (e) {
        delete ok.dataset.ocupado; ok.textContent = 'Eliminar para siempre'; ok.disabled = false;
        err.textContent = esc(e.message || 'No se pudo eliminar la cuenta. Inténtalo de nuevo.').replace(/&#39;/g, "'"); err.hidden = false;
      }
    };
  }

  const original = window.showPage;
  window.showPage = function (page) { const r = original.apply(this, arguments); if (page === 'account') pintarTarjeta(); return r; };
  pintarTarjeta();
})();
