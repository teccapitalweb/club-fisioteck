/* Club FisioTeck — avisos personales en la campana (como Zoorigen): créditos regalados, cupón activo, clases en vivo próximas y cursos nuevos.
   Se suman a las notificaciones generales del equipo. Lo leído se recuerda por cuenta en este dispositivo.
   Depende de index.html: siteData, auth, certFetch, showPage, openCourseDetail; de club-barra.js (ftBarra) y club-creditos.js (ftCreditos). */
(function () {
  'use strict';
  const DIA = 86400000;
  const claveLeidos = () => 'ft_avisos_leidos_' + ((auth.currentUser || {}).uid || 'x');
  const leidos = () => { try { return new Set(JSON.parse(localStorage.getItem(claveLeidos()) || '[]')); } catch (_) { return new Set(); } };
  const guardar = s => { try { localStorage.setItem(claveLeidos(), JSON.stringify([...s].slice(-200))); } catch (_) { /* modo privado */ } };
  // Avisos que la persona quitó de su lista (en este dispositivo)
  const claveOcultos = () => 'ft_avisos_ocultos_' + ((auth.currentUser || {}).uid || 'x');
  const ocultos = () => { try { return new Set(JSON.parse(localStorage.getItem(claveOcultos()) || '[]')); } catch (_) { return new Set(); } };
  const guardarOcultos = s => { try { localStorage.setItem(claveOcultos(), JSON.stringify([...s].slice(-300))); } catch (_) { /* modo privado */ } };
  const extra = { t: 0, creditos: null, cupon: null, foro: [], sistema: [], temas: [] };

  async function cargar() {
    if (Date.now() - extra.t < 60000 || typeof auth === 'undefined' || !auth.currentUser) return;
    extra.t = Date.now();
    try { const d = await certFetch('/api/creditos'); extra.creditos = d.aviso || null; } catch (_) { extra.creditos = null; }
    try { const c = await certFetch('/api/creditos/cupon-activo'); extra.cupon = c && c.hay ? c : null; } catch (_) { extra.cupon = null; }
    try { const a = await certFetch('/api/avisos'); extra.foro = (a.avisos || []).filter(x => x.tipo === 'foro' || x.tipo === 'foro-act'); extra.sistema = (a.avisos || []).filter(x => x.tipo !== 'foro' && x.tipo !== 'foro-act'); } catch (_) { extra.foro = []; extra.sistema = []; }
    // Temas nuevos que publicaron otros miembros en los últimos 7 días (el foro es de lectura para toda cuenta con sesión; no hace falta el servidor)
    try {
      if (typeof memberIsPaid !== 'undefined' && memberIsPaid && typeof db !== 'undefined') {
        const yo = auth.currentUser.uid, corte = Date.now() - 7 * DIA;
        const sn = await db.collection('forum_posts').orderBy('createdAt', 'desc').limit(15).get();
        extra.temas = sn.docs.map(d => Object.assign({ id: d.id }, d.data())).filter(p => p.authorId !== yo && p.createdAt && p.createdAt.seconds * 1000 >= corte).slice(0, 8);
      } else extra.temas = [];
    } catch (_) { extra.temas = []; }
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
    extra.foro.forEach(a => { const id = 'foro:' + a.id; const general = a.tipo === 'foro-act'; out.push({ id: 'av:' + id, title: general ? 'Hay nuevas respuestas en el foro' : a.quien + ' respondió tu tema', message: general ? '«' + a.titulo + '»' : '«' + a.titulo + '» · ' + a.fragmento, category: 'foro', read: a.leido === true || ya.has('av:' + id), sintetico: true, servidorId: a.id, accion: () => { try { showPage('forum'); setTimeout(() => { if (typeof openThread === 'function') openThread(a.postId); }, 350); } catch (_) { /* sin foro */ } } }); });
    extra.temas.forEach(p => {
      const id = 'foronuevo:' + p.id, texto = p.sinTitulo ? String(p.body || '').replace(/\s+/g, ' ').slice(0, 110) : String(p.title || '');
      out.push({ id: 'av:' + id, title: (p.authorName || 'Un miembro') + ' publicó en el foro', message: '«' + texto + '»', category: 'foro', read: ya.has('av:' + id), sintetico: true, accion: () => { try { showPage('forum'); setTimeout(() => { if (typeof openThread === 'function') openThread(p.id); }, 350); } catch (_) { /* si el foro no abre, el aviso se queda */ } } });
    });
    (sd.live || []).forEach(w => {
      // Hora de Ciudad de México y duración, igual que la pantalla de Clases en vivo
      const cv = window.ftClasesVivo, dt = cv ? cv.inicioMs(w) : new Date(w.date + 'T' + (w.time || '20:00') + ':00').getTime();
      if (!dt) return;
      const fin = dt + Math.max(15, Math.min(480, Number(w.duration) || 60)) * 60000, ir = () => showPage('courses-live');
      if (ahora >= dt && ahora < fin) add('live:' + w.id + ':vivo', 'En vivo ahora: ' + w.title, 'La clase ya comenzó. Entra desde Clases en vivo.', ir, 'live');
      else if (dt > ahora && dt - ahora <= 60 * 60000) add('live:' + w.id + ':1h', 'Tu clase empieza en menos de 1 hora', w.title, ir, 'live');
      else if (dt > ahora && dt - ahora < 2 * DIA) add('live:' + w.id, 'Clase en vivo: ' + w.title, new Date(dt).toLocaleString('es-MX', { timeZone: 'America/Mexico_City', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit' }), ir, 'live');
    });
    (sd.courses || []).forEach(c => {
      const t = c.date ? new Date(c.date + 'T00:00:00').getTime() : 0;
      if (t && ahora - t >= 0 && ahora - t < 14 * DIA) add('curso:' + c.id, 'Curso nuevo: ' + c.title, (c.lessons || []).length + ' clases ya disponibles.', () => { showPage('library'); setTimeout(() => openCourseDetail(c.id), 60); }, 'course');
    });
    const o = ocultos();
    return out.filter(x => !o.has(x.id));
  }
  function quitar(id) { const o = ocultos(); o.add(id); guardarOcultos(o); marcar(id); }
  function marcarTodas() { lista().forEach(x => { if (!x.read) marcar(x.id); }); }
  function quitarLeidas() { const o = ocultos(); lista().forEach(x => { if (x.read) o.add(x.id); }); guardarOcultos(o); }
  function marcar(id) {
    const s = leidos(); s.add(id); guardar(s);
    // Los avisos que vienen del servidor (foro y sistema) también se marcan como leídos allá
    const f = extra.foro.find(a => 'av:foro:' + a.id === id) || (extra.sistema || []).find(a => 'av:srv:' + a.id === id);
    if (f && !f.leido) { f.leido = true; try { certFetch('/api/avisos/' + encodeURIComponent(f.id) + '/leido', { method: 'POST', body: '{}' }).catch(() => {}); } catch (_) { /* se reintenta luego */ } }
  }

  window.ftAvisos = { lista, marcar, quitar, marcarTodas, quitarLeidas, cargar, recargar: () => { extra.t = 0; return cargar(); } };
  auth.onAuthStateChanged(u => { if (u) { extra.t = 0; cargar(); } else { extra.creditos = null; extra.cupon = null; } });
  setInterval(cargar, 60000);
})();
