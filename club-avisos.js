/* Club FisioTeck — avisos personales en la campana (como Zoorigen): créditos regalados, cupón activo, clases en vivo próximas y cursos nuevos.
   Se suman a las notificaciones generales del equipo. Lo leído se recuerda por cuenta en este dispositivo.
   Depende de index.html: siteData, auth, certFetch, showPage, openCourseDetail; de club-barra.js (ftBarra) y club-creditos.js (ftCreditos). */
(function () {
  'use strict';
  const DIA = 86400000;
  const claveLeidos = () => 'ft_avisos_leidos_' + ((auth.currentUser || {}).uid || 'x');
  const leidos = () => { try { return new Set(JSON.parse(localStorage.getItem(claveLeidos()) || '[]')); } catch (_) { return new Set(); } };
  const guardar = s => { try { localStorage.setItem(claveLeidos(), JSON.stringify([...s].slice(-200))); } catch (_) { /* modo privado */ } };
  const extra = { t: 0, creditos: null, cupon: null, foro: [], sistema: [] };

  async function cargar() {
    if (Date.now() - extra.t < 60000 || typeof auth === 'undefined' || !auth.currentUser) return;
    extra.t = Date.now();
    try { const d = await certFetch('/api/creditos'); extra.creditos = d.aviso || null; } catch (_) { extra.creditos = null; }
    try { const c = await certFetch('/api/creditos/cupon-activo'); extra.cupon = c && c.hay ? c : null; } catch (_) { extra.cupon = null; }
    try { const a = await certFetch('/api/avisos'); extra.foro = (a.avisos || []).filter(x => x.tipo === 'foro'); extra.sistema = (a.avisos || []).filter(x => x.tipo !== 'foro'); } catch (_) { extra.foro = []; extra.sistema = []; }
    if (window.ftBarra) ftBarra.refrescar();
  }

  function lista() {
    const ya = leidos(), out = [], ahora = Date.now(), sd = (typeof siteData !== 'undefined' && siteData) || {};
    const add = (id, title, message, accion, categoria) => out.push({ id: 'av:' + id, title, message, category: categoria || 'sistema', read: ya.has('av:' + id), sintetico: true, accion });
    if (extra.creditos) add('cred:' + (extra.creditos.ms || 0), '¡Recibiste ' + extra.creditos.cantidad + ' créditos!', extra.creditos.mensaje || 'Úsalos para abrir material descargable.', () => { try { if (window.ftCreditos && ftCreditos.visto) ftCreditos.visto(); } catch (_) { /* sigue */ } showPage('pdfs'); });
    if (extra.cupon) add('cup:' + (extra.cupon.venceMs || 0), 'Hay un cupón para ti', extra.cupon.creditos + ' créditos para canjear en Material PDF.', () => showPage('pdfs'), 'promo');
    // Avisos que crea el servidor: certificado emitido, insignia nueva, premio ganado (como Zoorigen)
    const PAGINAS = { certificates: 'certificates', achievements: 'achievements', pdfs: 'pdfs', library: 'library' };
    (extra.sistema || []).forEach(a => {
      const id = 'srv:' + a.id, destino = PAGINAS[a.pagina] || 'home';
      out.push({ id: 'av:' + id, title: a.titulo || 'Aviso', message: a.fragmento || '', category: a.tipo === 'certificado' ? 'course' : 'sistema', read: a.leido === true || ya.has('av:' + id), sintetico: true, servidorId: a.id, accion: () => showPage(destino) });
    });
    // Respuestas a tus temas del foro (las crea el servidor cuando alguien responde)
    extra.foro.forEach(a => { const id = 'foro:' + a.id; out.push({ id: 'av:' + id, title: a.quien + ' respondió tu tema', message: '«' + a.titulo + '» · ' + a.fragmento, category: 'foro', read: a.leido === true || ya.has('av:' + id), sintetico: true, servidorId: a.id, accion: () => { try { showPage('forum'); setTimeout(() => { if (typeof openThread === 'function') openThread(a.postId); }, 350); } catch (_) { /* sin foro */ } } }); });
    (sd.live || []).forEach(w => {
      const dt = new Date(w.date + 'T' + (w.time || '20:00') + ':00').getTime();
      if (dt > ahora && dt - ahora < 2 * DIA) add('live:' + w.id, 'Clase en vivo: ' + w.title, new Date(dt).toLocaleString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit' }), () => showPage('courses-live'), 'live');
    });
    (sd.courses || []).forEach(c => {
      const t = c.date ? new Date(c.date + 'T00:00:00').getTime() : 0;
      if (t && ahora - t >= 0 && ahora - t < 14 * DIA) add('curso:' + c.id, 'Curso nuevo: ' + c.title, (c.lessons || []).length + ' clases ya disponibles.', () => { showPage('library'); setTimeout(() => openCourseDetail(c.id), 60); }, 'course');
    });
    return out;
  }
  function marcar(id) {
    const s = leidos(); s.add(id); guardar(s);
    // Los avisos que vienen del servidor (foro y sistema) también se marcan como leídos allá
    const f = extra.foro.find(a => 'av:foro:' + a.id === id) || (extra.sistema || []).find(a => 'av:srv:' + a.id === id);
    if (f && !f.leido) { f.leido = true; try { certFetch('/api/avisos/' + encodeURIComponent(f.id) + '/leido', { method: 'POST', body: '{}' }).catch(() => {}); } catch (_) { /* se reintenta luego */ } }
  }

  window.ftAvisos = { lista, marcar, cargar, recargar: () => { extra.t = 0; return cargar(); } };
  auth.onAuthStateChanged(u => { if (u) { extra.t = 0; cargar(); } else { extra.creditos = null; extra.cupon = null; } });
  setInterval(cargar, 60000);
})();
