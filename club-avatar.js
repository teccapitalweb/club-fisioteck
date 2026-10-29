/* Club FisioTeck — avatar elegible (como Alintec): cada persona escoge una ilustración para su perfil.
   Son 16 ilustraciones gratuitas (estilo "Notionists" de Zoish vía DiceBear, licencia CC0, en assets/avatares/) guardadas como archivos SVG
   dentro del sitio: no dependen de ningún servicio externo. La elección se guarda en la ficha (members/{uid}.avatar = "a01"…"a16") y se ve en el
   menú lateral, la barra superior, Mi perfil y los rankings. Sin elección se muestra la inicial.
   Depende de index.html: auth, db, showToast, showPage. */
(function () {
  'use strict';
  const IDS = Array.from({ length: 16 }, (_, i) => 'a' + String(i + 1).padStart(2, '0'));
  const NOMBRES = ['Barba y playera', 'Sonrisa serena', 'Lentes y camisa', 'Cabello ondulado', 'Gorra', 'Corbata', 'Casual', 'Cabello corto', 'Chaleco', 'Moño', 'Camisa estampada', 'Cabello claro', 'Perfil clásico', 'Bigote', 'Peinado en moños', 'Saludo'];
  const $ = id => document.getElementById(id);
  const url = id => 'assets/avatares/' + id + '.svg';
  let actual = '';
  window.ftAvatarUrl = id => (IDS.includes(id) ? url(id) : '');
  window.ftAvatarActual = () => actual;

  // Pone la imagen (o la inicial) en un elemento solo si cambió, para no reescribir en bucle
  function pintar(el) {
    if (!el) return;
    const quiere = IDS.includes(actual) ? actual : '';
    const img = el.querySelector('img'), tiene = img ? img.dataset.av : '';
    if (quiere) {
      if (tiene === quiere) return;
      el.textContent = '';
      const nueva = document.createElement('img');
      nueva.src = url(quiere); nueva.alt = ''; nueva.dataset.av = quiere; nueva.style.cssText = 'width:100%;height:100%;border-radius:50%;object-fit:cover;display:block;';
      el.appendChild(nueva); el.style.background = 'transparent'; el.style.overflow = 'hidden';
    } else if (img) {
      el.textContent = (((auth.currentUser && auth.currentUser.displayName) || ($('sidebarName') || {}).textContent || 'S').trim().charAt(0).toUpperCase()) || 'S';
      el.style.background = ''; el.style.overflow = '';
    }
  }
  function aplicar() { ['sidebarAvatar', 'ftbAv', 'accountAvatar', 'ftAvatarGrande'].forEach(id => pintar($(id))); }

  async function cargar() {
    const u = auth.currentUser; if (!u) return;
    try { const s = await db.collection('members').doc(u.uid).get(); actual = s.exists && s.data().avatar ? String(s.data().avatar) : ''; } catch (_) { actual = ''; }
    aplicar();
  }
  async function elegir(id) {
    const u = auth.currentUser; if (!u) return;
    try {
      await db.collection('members').doc(u.uid).update({ avatar: id });
      actual = id; aplicar(); pintarTarjeta(); showToast(id ? 'Avatar actualizado' : 'Ahora se muestran tus iniciales');
    } catch (e) { showToast('No se pudo guardar tu avatar'); }
  }

  function pintarTarjeta() {
    const pagina = $('page-account'); if (!pagina) return;
    let t = $('ftAvatarCard');
    if (!t) { t = document.createElement('div'); t.className = 'card'; t.id = 'ftAvatarCard'; t.style.cssText = 'margin-bottom:24px;'; const primero = pagina.querySelector('.card'); if (primero) primero.insertAdjacentElement('afterend', t); else pagina.appendChild(t); }
    t.innerHTML = '<h3 style="font-size:1rem;font-weight:600;margin-bottom:6px;">Tu avatar</h3><p style="font-size:.84rem;color:var(--text-light);margin:0 0 14px;">Elige la ilustración con la que quieres verte en el Club.</p>' +
      '<div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;"><div id="ftAvatarGrande" style="width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.8rem;color:#fff;font-weight:700;background:var(--accent);flex-shrink:0;"></div>' +
      '<button type="button" class="btn-outline" id="ftAvatarIniciales">Usar mis iniciales</button></div>' +
      '<div role="radiogroup" aria-label="Avatares" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(62px,1fr));gap:12px;">' +
      IDS.map((id, i) => '<button type="button" role="radio" aria-checked="' + (id === actual) + '" aria-label="Avatar ' + (i + 1) + ': ' + NOMBRES[i] + '" title="' + NOMBRES[i] + '" data-id="' + id + '" style="width:62px;height:62px;padding:0;border-radius:50%;border:3px solid ' + (id === actual ? 'var(--accent)' : 'transparent') + ';background:none;cursor:pointer;overflow:hidden;box-shadow:' + (id === actual ? '0 0 0 3px var(--accent-ghost)' : 'none') + ';"><img src="' + url(id) + '" alt="" loading="lazy" style="width:100%;height:100%;display:block;"></button>').join('') + '</div>' +
      '<p style="font-size:.72rem;color:var(--text-muted);margin:14px 0 0;">Ilustraciones gratuitas (estilo Notionists, licencia CC0).</p>';
    t.querySelectorAll('[data-id]').forEach(b => b.onclick = () => elegir(b.dataset.id));
    $('ftAvatarIniciales').onclick = () => elegir('');
    const g = $('ftAvatarGrande'); if (g) { g.textContent = (($('sidebarName') || {}).textContent || 'S').trim().charAt(0).toUpperCase(); }
    aplicar();
  }

  const paginaOriginal = window.showPage;
  window.showPage = function (page) { const r = paginaOriginal.apply(this, arguments); if (page === 'account') pintarTarjeta(); return r; };
  // loadUserProfile y la barra reescriben la inicial de vez en cuando: se revisa de forma ligera y solo se toca lo que cambió
  setInterval(() => { if (actual) aplicar(); }, 2000);
  auth.onAuthStateChanged(u => { if (u) cargar(); else { actual = ''; aplicar(); } });
  window.ftAvatar = { IDS, elegir, aplicar, url };
})();
