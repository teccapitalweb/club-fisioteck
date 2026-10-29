/* Club FisioTeck — XP, nivel, racha e insignias calculados por el SERVIDOR (como Alintec y Zoorigen).
   El navegador ya no suma ni guarda nada de esto: pide el estado al servidor (GET /api/logros, POST /api/logros/visita) y lo muestra.
   Reemplaza las funciones de Logros de index.html (loadAchievements, saveAchievements, checkAchievements, getTotalXP, incrementarStatLogro)
   y avisa al servidor de las secciones visitadas, noticias leídas y clases en vivo. Los PDF se cuentan solos en el servidor.
   Depende de index.html: auth, achievementData, BADGES, showToast, showPage, updateXpWidget, renderAchievements, renderHome. */
(function () {
  'use strict';
  // achievementData se declara con let en index.html, así que NO es propiedad de window. La zona de retos, el Modo historia y el perfil lo leen como
  // window.achievementData: sin esto veían un objeto vacío y mostraban «0 de 25 superados», los mundos sin avance y la racha en 0 aunque el servidor ya los tenía.
  try { Object.defineProperty(window, 'achievementData', { get: () => achievementData, set: v => { achievementData = v; }, configurable: true }); } catch (_) { /* ya definido */ }
  const API = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://localhost:3000' : WEBHOOK_URL;

  async function pedir(ruta, cuerpo) {
    const user = auth.currentUser;
    if (!user) throw new Error('Inicia sesión para continuar.');
    const token = await user.getIdToken();
    const r = await fetch(API + ruta, {
      method: cuerpo ? 'POST' : 'GET',
      headers: Object.assign({ Authorization: 'Bearer ' + token }, cuerpo ? { 'Content-Type': 'application/json' } : {}),
      body: cuerpo ? JSON.stringify(cuerpo) : undefined
    });
    const datos = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(datos.error || 'No se pudo completar la acción.'); e.status = r.status; throw e; }
    return datos;
  }

  // Lo que dice el servidor es la verdad: se copia tal cual a achievementData
  function aplicar(d) {
    if (!d || !d.insignias) return;
    achievementData.unlocked = d.insignias.filter(i => i.desbloqueada).map(i => i.id);
    achievementData.streak = d.racha || 0;
    achievementData.xp = d.xp || 0;
    achievementData.nivelServidor = d.nivel || null;
    const previo = achievementData.retos || {};
    achievementData.retos = Object.assign({}, previo, { hechos: d.hechos || {}, xp: d.xpRetos || 0 });
    achievementData.bienvenida = d.bienvenida === true;
    achievementData.estadoServidor = true;
  }
  function anunciar(nuevas) {
    (nuevas || []).forEach(id => { const b = (typeof BADGES !== 'undefined' ? BADGES : []).find(x => x.id === id); if (b) showToast('¡Insignia desbloqueada! ' + b.name + ' (+' + b.xp + ' XP)'); });
  }
  function repintar() {
    try { updateXpWidget(); } catch (_) { /* widget no listo */ }
    try { if (document.getElementById('page-achievements').classList.contains('active')) renderAchievements(); } catch (_) { /* sin vista */ }
    try { if (document.getElementById('page-home').classList.contains('active') && typeof renderHome === 'function') renderHome(); } catch (_) { /* sin vista */ }
  }
  async function actualizar(ruta, cuerpo) {
    try { const d = await pedir(ruta, cuerpo); aplicar(d); anunciar(d.nuevas); repintar(); return d; }
    catch (e) { return null; /* sin servidor: se queda lo último que se vio */ }
  }

  window.getTotalXP = function () { return Number(achievementData.xp) || 0; };
  window.saveAchievements = async function () { /* el servidor guarda todo; el navegador ya no escribe */ };
  window.loadAchievements = async function () { await actualizar('/api/logros/visita', {}); };
  window.checkAchievements = function () { return actualizar('/api/logros'); };
  window.incrementarStatLogro = function (clave, id) {
    // los PDF se cuentan solos al abrir el enlace en el servidor
    if (clave === 'newsRead' && id != null) enviarEvento('noticia', id);
    if (clave === 'webinarsAttended' && id) enviarEvento('webinar', String(id).slice(-40).replace(/[^\w.-]/g, '') || 'clase');
  };
  function enviarEvento(tipo, id) { return actualizar('/api/logros/evento', { tipo, id: String(id) }); }

  // Secciones visitadas (Explorador): una vez por sección en la sesión
  const vistas = new Set();
  const paginaOriginal = window.showPage;
  window.showPage = function (page) {
    const r = paginaOriginal.apply(this, arguments);
    if (page && !vistas.has(page) && auth.currentUser) { vistas.add(page); enviarEvento('seccion', page); }
    return r;
  };

  window.ftLogros = { pedir, aplicar, actualizar, repintar };
  auth.onAuthStateChanged(u => { if (!u) { achievementData.unlocked = []; achievementData.xp = 0; achievementData.streak = 0; vistas.clear(); } });
})();
