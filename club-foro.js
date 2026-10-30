/* Club FisioTeck — Foro VIP completo (como Alintec y Zoorigen): publicar con imagen opcional, hilo de respuestas, borrar lo propio,
   mínimos y máximos de texto, contadores y todo el texto de los usuarios escapado (antes el hilo insertaba el HTML tal cual).
   Los datos siguen en Firestore (forum_posts y forum_posts/{id}/replies); las reglas de firestore.rules deciden quién puede escribir.
   Reemplaza submitForumPost, openThread, submitReply y agrega borrarTema, borrarRespuesta y la imagen del tema.
   Depende de index.html: auth, db, firebase, forumPosts, loadForumPosts, memberIsPaid, showToast, showPaywallOverlay, getTimeAgo, toggleLikePost, closeThreadModal. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const L = { titulo: [8, 120], cuerpo: [15, 2000], respuesta: [5, 600], imagen: 280000 }; // imagen: caracteres máximos del texto base64
  const CAT = { general: 'General', dudas: 'Dudas', casos: 'Casos clínicos', tips: 'Tips', recursos: 'Recursos' };
  let imagenNueva = '';
  const yo = () => ((typeof auth !== 'undefined' ? auth.currentUser : null)) || null;
  const esAdmin = () => { const u = yo(); return !!(u && /^(teccapitalweb|fisiotec25)@gmail\.com$/i.test(u.email || '')); };

  // ---------- Imagen: se reduce a 900 px y JPEG para que quepa en el documento (sin Storage) ----------
  function reducir(archivo) {
    return new Promise((ok, mal) => {
      if (!/^image\/(jpeg|png|webp)$/.test(archivo.type)) { mal(new Error('Elige una imagen JPG, PNG o WebP.')); return; }
      const lector = new FileReader();
      lector.onerror = () => mal(new Error('No se pudo leer la imagen.'));
      lector.onload = () => {
        const img = new Image();
        img.onerror = () => mal(new Error('No se pudo abrir la imagen.'));
        img.onload = () => {
          const k = Math.min(1, 900 / Math.max(img.width, img.height)), c = document.createElement('canvas');
          c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          let q = 0.72, d = c.toDataURL('image/jpeg', q);
          while (d.length > L.imagen && q > 0.35) { q -= 0.1; d = c.toDataURL('image/jpeg', q); }
          d.length > L.imagen ? mal(new Error('La imagen es muy pesada. Elige una más pequeña.')) : ok(d);
        };
        img.src = lector.result;
      };
      lector.readAsDataURL(archivo);
    });
  }
  const abrirOriginal = window.openNewPostModal;
  window.openNewPostModal = function () {
    const r = abrirOriginal ? abrirOriginal.apply(this, arguments) : undefined;
    imagenNueva = '';
    const t = $('postTitle'), b = $('postBody'); if (t) t.maxLength = L.titulo[1]; if (b) b.maxLength = L.cuerpo[1];
    if (b && !$('fpImg')) {
      b.insertAdjacentHTML('afterend', '<div id="fpImg" class="fp-img"><label class="fp-adj"><input type="file" id="fpArchivo" accept="image/jpeg,image/png,image/webp" hidden>Agregar imagen</label><span id="fpInfo" class="fp-info"></span>' +
        '<small id="fpCont" class="fp-cont"></small></div><div id="fpPrev"></div>');
      $('fpArchivo').addEventListener('change', async e => {
        const f = e.target.files && e.target.files[0]; if (!f) return;
        try { imagenNueva = await reducir(f); $('fpPrev').innerHTML = '<div class="fp-prev"><img src="' + imagenNueva + '" alt="Vista previa"><button type="button" id="fpQuitar" aria-label="Quitar imagen">&times;</button></div>'; $('fpQuitar').onclick = () => { imagenNueva = ''; $('fpPrev').innerHTML = ''; $('fpArchivo').value = ''; }; $('fpInfo').textContent = ''; }
        catch (err) { imagenNueva = ''; $('fpPrev').innerHTML = ''; $('fpInfo').textContent = err.message; }
      });
      b.addEventListener('input', () => { $('fpCont').textContent = b.value.length + ' / ' + L.cuerpo[1]; });
    }
    if ($('fpPrev')) $('fpPrev').innerHTML = ''; if ($('fpInfo')) $('fpInfo').textContent = ''; if ($('fpCont')) $('fpCont').textContent = '0 / ' + L.cuerpo[1];
    return r;
  };

  // ---------- Publicar ----------
  window.submitForumPost = async function () {
    if (!memberIsPaid) { showPaywallOverlay(); return; }
    const u = yo(); if (!u) { showToast('Inicia sesión para publicar'); return; }
    const title = $('postTitle').value.trim().replace(/\s+/g, ' '), body = $('postBody').value.trim(), category = $('postCategory').value;
    if (title.length < L.titulo[0]) { showToast('El título debe tener al menos ' + L.titulo[0] + ' caracteres.'); return; }
    if (body.length < L.cuerpo[0]) { showToast('El mensaje debe tener al menos ' + L.cuerpo[0] + ' caracteres.'); return; }
    const datos = { title, body, category: CAT[category] ? category : 'general', authorId: u.uid, authorName: u.displayName || u.email || 'Socio', authorAvatar: (window.ftAvatarActual && ftAvatarActual()) || '', replyCount: 0, createdAt: firebase.firestore.FieldValue.serverTimestamp() };
    if (imagenNueva) datos.imagen = imagenNueva;
    try {
      await db.collection('forum_posts').add(datos);
      imagenNueva = ''; if (window.closeNewPostModal) closeNewPostModal();
      showToast('Tema publicado'); await loadForumPosts();
    } catch (e) { console.error('Post error:', e); showToast(e && e.code === 'permission-denied' ? 'No tienes permiso para publicar. Revisa tu membresía.' : 'No se pudo publicar. Intenta de nuevo.'); }
  };

  // ---------- Hilo ----------
  // Avatar ilustrado del autor (como Zoorigen): si eligió uno se guarda en el tema/respuesta; si no, su inicial de color
  const avatar = (n, c, av) => {
    const u = av && window.ftAvatarUrl ? ftAvatarUrl(av) : '';
    return u ? '<div class="fh-av" style="background:transparent;overflow:hidden"><img src="' + esc(u) + '" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></div>'
      : '<div class="fh-av" style="background:' + c + '">' + esc((n || 'S').charAt(0).toUpperCase()) + '</div>';
  };
  const COL = ['#0D5FA0', '#159E92', '#C2760B', '#7C3AED', '#DC2D3F', '#0F9D58'];
  const colorDe = t => COL[Math.abs(String(t || '').split('').reduce((a, ch) => a + ch.charCodeAt(0), 0)) % COL.length];
  const fechaDe = x => x && x.seconds ? new Date(x.seconds * 1000) : new Date();
  window.openThread = async function (postId) {
    if (!memberIsPaid) { showPaywallOverlay(); return; }
    window.currentThreadId = postId; try { currentThreadId = postId; } catch (_) { /* variable del panel */ }
    const post = forumPosts.find(p => p.id === postId); if (!post) return;
    const u = yo(), mio = u && post.authorId === u.uid, liked = u && (post.likes || []).includes(u.uid);
    $('threadCategory').textContent = CAT[post.category] || post.category || 'General';
    $('threadTitle').textContent = post.title || '';
    $('threadOriginal').innerHTML = '<div class="fh-cab">' + avatar(post.authorName, colorDe(post.authorId), post.authorAvatar) + '<div><strong>' + esc(post.authorName || 'Socio') + '</strong><small>' + esc(getTimeAgo(fechaDe(post.createdAt))) + '</small></div>' +
      (mio || esAdmin() ? '<button type="button" class="fh-borrar" onclick="ftForo.borrarTema(\'' + esc(post.id) + '\')">Eliminar</button>' : '') + '</div>' +
      '<div class="fh-cuerpo">' + esc(post.body || '') + '</div>' + (post.imagen && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(post.imagen) ? '<img class="fh-img" src="' + post.imagen + '" alt="Imagen del tema">' : '') +
      '<div class="fh-pie"><button type="button" class="fh-like' + (liked ? ' on' : '') + '" onclick="event.stopPropagation();toggleLikePost(\'' + esc(post.id) + '\')">Me gusta · ' + (post.likes || []).length + '</button></div>';
    const cont = $('threadReplies'); cont.innerHTML = '<div class="fh-vacio">Cargando respuestas...</div>';
    $('threadModal').style.display = 'flex'; $('replyBody').value = ''; $('replyBody').maxLength = L.respuesta[1];
    try {
      const snap = await db.collection('forum_posts').doc(postId).collection('replies').orderBy('createdAt', 'asc').get();
      const lista = snap.docs.map(d => Object.assign({ id: d.id }, d.data()));
      $('replyCount').textContent = lista.length + ' respuesta' + (lista.length === 1 ? '' : 's');
      cont.innerHTML = lista.length ? lista.map(r => {
        const likeR = u && (r.likes || []).includes(u.uid);
        return '<div class="fh-resp"><div class="fh-cab">' + avatar(r.authorName, colorDe(r.authorId), r.authorAvatar) + '<div><strong>' + esc(r.authorName || 'Socio') + '</strong><small>' + esc(getTimeAgo(fechaDe(r.createdAt))) + '</small></div>' +
          (u && (r.authorId === u.uid || esAdmin()) ? '<button type="button" class="fh-borrar" onclick="ftForo.borrarRespuesta(\'' + esc(postId) + '\',\'' + esc(r.id) + '\')">Eliminar</button>' : '') + '</div>' +
          '<div class="fh-cuerpo">' + esc(r.body || '') + '</div><div class="fh-pie"><button type="button" class="fh-like' + (likeR ? ' on' : '') + '" onclick="toggleLikeReply(\'' + esc(postId) + '\',\'' + esc(r.id) + '\')">Me gusta · ' + (r.likes || []).length + '</button></div></div>';
      }).join('') : '<div class="fh-vacio">Sin respuestas aún. Sé el primero.</div>';
    } catch (e) { console.warn('[foro] respuestas', e); cont.innerHTML = '<div class="fh-vacio">No se pudieron cargar las respuestas.</div>'; }
  };

  window.submitReply = async function () {
    if (!memberIsPaid) { showPaywallOverlay(); return; }
    const u = yo(); if (!u) { showToast('Inicia sesión para responder'); return; }
    const body = $('replyBody').value.trim(), id = window.currentThreadId; if (!id) return;
    if (body.length < L.respuesta[0]) { showToast('Escribe una respuesta de al menos ' + L.respuesta[0] + ' caracteres.'); return; }
    try {
      const nueva = await db.collection('forum_posts').doc(id).collection('replies').add({ body, authorId: u.uid, authorName: u.displayName || u.email || 'Socio', authorAvatar: (window.ftAvatarActual && ftAvatarActual()) || '', createdAt: firebase.firestore.FieldValue.serverTimestamp() });
      // Aviso en la campana del autor del tema (lo crea el servidor, que comprueba que la respuesta es tuya)
      try { certFetch('/api/avisos/foro', { method: 'POST', body: JSON.stringify({ postId: id, replyId: nueva.id }) }).catch(() => {}); } catch (_) { /* el aviso es un extra */ }
      await db.collection('forum_posts').doc(id).update({ replyCount: firebase.firestore.FieldValue.increment(1) });
      const local = forumPosts.find(p => p.id === id); if (local) local.replyCount = (local.replyCount || 0) + 1;
      showToast('Respuesta publicada'); openThread(id); if (window.renderForumPosts) renderForumPosts();
    } catch (e) { console.error('Reply error:', e); showToast('No se pudo responder. Intenta de nuevo.'); }
  };

  // ---------- Borrar lo propio ----------
  async function borrarTema(id) {
    if (!confirm('¿Eliminar este tema y sus respuestas? No se puede deshacer.')) return;
    try {
      const ref = db.collection('forum_posts').doc(id), snap = await ref.collection('replies').get();
      for (const d of snap.docs) await ref.collection('replies').doc(d.id).delete();
      await ref.delete();
      const i = forumPosts.findIndex(p => p.id === id); if (i >= 0) forumPosts.splice(i, 1);
      if (window.closeThreadModal) closeThreadModal(); if (window.renderForumPosts) renderForumPosts(); showToast('Tema eliminado');
    } catch (e) { console.warn('[foro] borrar tema', e); showToast('No se pudo eliminar el tema.'); }
  }
  async function borrarRespuesta(postId, replyId) {
    if (!confirm('¿Eliminar esta respuesta?')) return;
    try {
      await db.collection('forum_posts').doc(postId).collection('replies').doc(replyId).delete();
      await db.collection('forum_posts').doc(postId).update({ replyCount: firebase.firestore.FieldValue.increment(-1) });
      const local = forumPosts.find(p => p.id === postId); if (local) local.replyCount = Math.max(0, (local.replyCount || 1) - 1);
      showToast('Respuesta eliminada'); openThread(postId); if (window.renderForumPosts) renderForumPosts();
    } catch (e) { console.warn('[foro] borrar respuesta', e); showToast('No se pudo eliminar la respuesta.'); }
  }
  window.ftForo = { borrarTema, borrarRespuesta, LIMITES: L };

  const est = document.createElement('style');
  est.textContent = `
  .fp-img { display:flex; align-items:center; gap:12px; flex-wrap:wrap; margin:-4px 0 12px; } .fp-adj { padding:8px 14px; border-radius:999px; border:1.5px dashed var(--border-2); font-size:.8rem; font-weight:700; cursor:pointer; color:var(--accent); } .fp-info { color:#B42318; font-size:.78rem; } .fp-cont { margin-left:auto; color:var(--text-muted); font-size:.72rem; }
  .fp-prev { position:relative; margin-bottom:12px; } .fp-prev img { width:100%; max-height:200px; object-fit:cover; border-radius:12px; } .fp-prev button { position:absolute; right:8px; top:8px; width:28px; height:28px; border-radius:50%; border:0; background:rgba(0,0,0,.6); color:#fff; font-size:1rem; cursor:pointer; }
  .fh-cab { display:flex; align-items:center; gap:10px; margin-bottom:8px; } .fh-cab > div:nth-child(2) { flex:1; min-width:0; } .fh-av { flex:none; width:34px; height:34px; border-radius:50%; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:.85rem; }
  .fh-cab strong { display:block; font-size:.85rem; } .fh-cab small { font-size:.7rem; color:var(--text-muted); } .fh-borrar { border:0; background:none; color:#B42318; font:inherit; font-size:.74rem; font-weight:700; cursor:pointer; }
  .fh-cuerpo { font-size:.9rem; line-height:1.6; white-space:pre-wrap; overflow-wrap:anywhere; } .fh-img { display:block; max-width:100%; max-height:360px; margin-top:10px; border-radius:12px; }
  .fh-pie { margin-top:10px; padding-top:8px; border-top:1px solid var(--border); } .fh-like { border:0; background:none; font:inherit; font-size:.78rem; font-weight:700; color:var(--text-muted); cursor:pointer; padding:4px 10px; border-radius:999px; } .fh-like.on { color:#DC2D3F; background:rgba(220,45,63,.08); }
  .fh-resp { padding:12px; background:var(--bg); border-radius:12px; margin-bottom:8px; } .fh-vacio { text-align:center; padding:16px; color:var(--text-muted); font-size:.85rem; }
  .ftd-post .fotito { display:block; max-height:180px; margin-top:8px; border-radius:12px; object-fit:cover; }`;
  document.head.appendChild(est);
})();
