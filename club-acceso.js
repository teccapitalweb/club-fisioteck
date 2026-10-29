/* Club FisioTeck — cursos escalonados y retos que adelantan la apertura (como Alintec y Zoorigen).
   El servidor (club-fisioteck-webhooks: GET /api/acceso, POST /api/retos/completar) decide qué cursos están abiertos y
   califica los retos; aquí solo se muestra y se envía.
   Depende de index.html: auth, siteData, memberIsPaid, WEBHOOK_URL, showToast, showPage, renderLibrary, renderHome. */
(function () {
  'use strict';

  const API = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://localhost:3000' : WEBHOOK_URL;
  const A = { cargado: false, escalonado: false, cursos: {}, adelantos: 0, retosParaSiguiente: null, retosSuperados: 0, diasEntreCursos: 8, retosParaAdelantar: 12, adelanto: null, orden: [] };
  window.ftAcceso = A;

  // Las tarjetas cerradas por días siguen siendo tocables: llevan a Retos para abrirlas antes
  const estilo = document.createElement('style');
  estilo.textContent = '.course-card.locked[onclick]{pointer-events:auto;cursor:pointer}.course-card.locked[onclick]:hover{transform:translateY(-2px)}';
  document.head.appendChild(estilo);

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
    if (!r.ok) throw new Error(datos.error || 'No se pudo completar la acción.');
    return datos;
  }

  function aplicar(d) {
    A.cargado = true;
    A.escalonado = !!(d && d.escalonado);
    A.cursos = (d && d.cursos) || {};
    A.adelantos = (d && d.adelantos) || 0;
    A.retosSuperados = (d && d.retosSuperados) || 0;
    A.retosParaSiguiente = (d && d.retosParaSiguiente) || null;
    A.diasEntreCursos = (d && d.diasEntreCursos) || 8;
    A.retosParaAdelantar = (d && d.retosParaAdelantar) || 12;
    A.adelanto = (d && d.adelanto) || null;
    A.orden = (d && d.orden) || [];
  }

  function refrescarVistas() {
    try { if (document.getElementById('page-library') && document.getElementById('page-library').classList.contains('active') && typeof renderLibrary === 'function') renderLibrary(); } catch (e) { /* vista no lista */ }
    try { if (document.getElementById('page-home') && document.getElementById('page-home').classList.contains('active') && typeof renderHome === 'function') renderHome(); } catch (e) { /* vista no lista */ }
  }

  A.cargar = async function () {
    try { aplicar(await pedir('/api/acceso')); refrescarVistas(); }
    catch (e) { /* sin servidor: el Club sigue como antes (sin candados por días) */ }
  };

  // ¿Está cerrado por el escalonado? (solo aplica con membresía; la prueba gratuita y la vista previa no pasan por aquí)
  window.ftCursoCerrado = function (id) {
    const c = A.escalonado && A.cursos[String(id)];
    return !!(c && !c.abierto);
  };
  window.ftCursoDias = function (id) {
    const c = A.cursos[String(id)];
    return c && !c.abierto ? (c.dias || 1) : 0;
  };

  // El curso cerrado que sigue (el que se abre a los N días) con sus días y su fecha
  A.proximo = function () {
    const id = (A.orden || []).find(k => A.cursos[k] && !A.cursos[k].abierto);
    return id ? { id, dias: A.cursos[id].dias, abreEn: A.cursos[id].abreEn } : null;
  };

  // Desglose del adelanto como Alintec y Zoorigen: una fila por tipo (mínimo 2 de cada uno) y "Retos libres" de cualquier tipo.
  // La suma de las filas (cada una con tope) es lo que cuenta; coincide con la regla del servidor (total y variedad mínima).
  const FILAS = [['quiz', 'Quiz relámpago'], ['detective', 'Detective clínico'], ['orden', 'Ordena el proceso'], ['historia', 'Modo historia']];
  A.desglose = function () {
    const ad = A.adelanto; if (!ad) return null;
    const t = ad.porTipo || {}, min = ad.minPorTipo || 2, N = ad.necesarios || A.retosParaAdelantar, libresN = Math.max(0, N - FILAS.length * min);
    const filas = FILAS.map(f => ({ nombre: f[1], n: Math.min(t[f[0]] || 0, min), de: min }));
    const sobran = FILAS.reduce((a, f) => a + Math.max(0, (t[f[0]] || 0) - min), 0);
    filas.push({ nombre: 'Retos libres', sub: 'De cualquier tipo', n: Math.min(sobran, libresN), de: libresN });
    return { filas, total: filas.reduce((a, f) => a + f.n, 0), necesarios: N };
  };
  A.iconoRayo = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>';
  // Panel con una barra por tipo. o: { cabecera (HTML), boton (true/false) }
  A.panelRetos = function (o) {
    const d = A.desglose(); if (!d) return '';
    return '<section class="ftx-panel">' + (o && o.cabecera ? '<div class="ftx-cab">' + o.cabecera + '</div>' : '') +
      d.filas.filter(f => f.de > 0).map(f => '<div class="ftx-fila"><span class="ftx-n">' + f.nombre + (f.sub ? '<small>' + f.sub + '</small>' : '') + '</span><span class="ftx-barra"><i style="width:' + Math.round(f.n / f.de * 100) + '%"></i></span><b>' + f.n + '/' + f.de + '</b></div>').join('') +
      '<div class="ftx-pie"><span><b>' + d.total + '</b> de ' + d.necesarios + ' retos</span>' + (o && o.boton ? '<button type="button" class="ftx-btn" onclick="if(window.ftCerrarDetalle)ftCerrarDetalle();showPage(\'retos\')">Ir a los retos</button>' : '') + '</div></section>';
  };

  // Tarjeta de la pantalla de Retos: "Abre tu primer curso antes resolviendo N retos". El adelanto aplica UNA sola vez.
  A.bannerRetos = function () {
    const ad = A.adelanto;
    if (!A.escalonado || !ad) return '';
    if (ad.estado === 'usado') return '<div class="rt-aviso rz-adel usado" style="margin:0 0 14px;">Ya adelantaste tu curso con retos. Los demás cursos se abren cada ' + A.diasEntreCursos + ' días.</div>';
    if (ad.estado !== 'disponible') return '';
    return '<div style="margin:0 0 16px">' + A.panelRetos({ cabecera: A.iconoRayo + '<span><b>Abre tu primer curso antes resolviendo ' + ad.necesarios + ' retos</b></span>' }) + '</div>';
  };

  // Envía al servidor un reto terminado; avisa si abrió un curso nuevo.
  A.completarReto = async function (cuerpo) {
    try {
      const antes = A.adelantos;
      const r = await pedir('/api/retos/completar', cuerpo);
      if (r.nuevo && r.escalonado && r.adelantos > antes) {
        showToast('¡Lo lograste! Se abrió tu siguiente curso antes de tiempo.');
      } else if (r.nuevo && r.escalonado && r.retosParaSiguiente) {
        showToast('Llevas ' + (r.adelanto ? r.adelanto.total : '') + ' de ' + (r.adelanto ? r.adelanto.necesarios : '') + ' retos para abrir tu siguiente curso antes.');
      }
      await A.cargar();
      return r;
    } catch (e) { return null; /* sin servidor: no se gana XP; el reto se puede repetir */ }
  };

  auth.onAuthStateChanged(u => { if (u) A.cargar(); else aplicar(null); });
  const sp = window.showPage;
  window.showPage = function (page) {
    const r = sp.apply(this, arguments);
    if (['library', 'home', 'retos'].indexOf(page) !== -1 && auth.currentUser) A.cargar();
    return r;
  };
})();
