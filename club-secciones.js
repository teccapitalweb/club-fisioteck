/* Club FisioTeck — encabezado común (estructura de Alintec Food) para las secciones que aún tenían el título simple:
   cabecera con etiqueta, título con palabra resaltada, descripción y a la derecha la mascota Fisi con su pose y su frase.
   Oculta el .page-header original y no toca el contenido de cada sección. Depende de: club-cursos.js (ftdHero), club-mascota.js. */
(function () {
  'use strict';
  const S = {
    'courses-live': ['Aprende en vivo', 'Webinar y <em>clases.</em>', 'Sesiones en vivo con instructores especializados.', 'live'],
    news: ['Actualidad', 'Noticias y <em>blog.</em>', 'Artículos, tips y novedades del mundo de la fisioterapia.', 'news'],
    account: ['Tu cuenta', 'Mi <em>perfil.</em>', 'Administra tu información personal.', 'account'],
    subscription: ['Tu membresía', 'Mi <em>suscripción.</em>', 'Monitorea tu membresía y tus datos de pago.', 'subscription'],
    achievements: ['Tu trayectoria', 'Mis <em>logros.</em>', 'Completa retos, gana insignias y sube de nivel.', 'achievements'],
    certificates: ['Tu trayectoria', 'Mis <em>certificados.</em>', 'Al terminar un curso descargas tu certificado con folio verificable.', 'certificates'],
    forum: ['Comunidad activa', 'Foro <em>FisioTeck.</em>', 'Comparte, pregunta y aprende con la comunidad.', 'forum'],
    community: ['Comunidad', 'Nuestro <em>canal.</em>', 'Recibe actualizaciones, noticias y contenido exclusivo.', 'canal'],
    discount: ['Beneficio de socio', 'Descuento <em>exclusivo.</em>', 'Un beneficio especial por ser socio del Club.', 'subscription'],
    'rehab-calc': ['Herramientas', 'Calculadora de <em>rehabilitación.</em>', 'Planes sugeridos según la patología y la severidad.', 'tools'],
    atlas: ['Herramientas', 'Atlas <em>muscular.</em>', 'Explora los grupos musculares del cuerpo humano.', 'tools'],
    glossary: ['Herramientas', 'Glosario <em>FisioTeck.</em>', 'Diccionario de términos de fisioterapia.', 'pensar'],
    rom: ['Herramientas', 'Rangos de <em>movimiento.</em>', 'Valores normales de goniometría por articulación.', 'tools'],
    eva: ['Herramientas', 'Escala <em>EVA</em> de dolor.', 'Registro y seguimiento del nivel de dolor.', 'tools'],
    timer: ['Herramientas', 'Cronómetro de <em>sesión.</em>', 'Temporizador para técnicas de fisioterapia.', 'tools']
  };
  function poner(page) {
    const d = S[page], sec = document.getElementById('page-' + page);
    if (!d || !sec || !window.ftdHero || sec.querySelector(':scope > .ftd-sec-hero, :scope > .ftd-slot-hero')) return;
    const slot = document.createElement('div'); slot.className = 'ftd-slot-hero';
    slot.innerHTML = window.ftdHero(d[0], d[1], d[2], d[3]);
    sec.insertBefore(slot, sec.firstChild);
    sec.classList.add('ftd-con-hero');
  }
  Object.keys(S).forEach(poner);
  const pg = window.showPage;
  window.showPage = function (page) { const r = pg.apply(this, arguments); poner(page); return r; };
})();

// Noticias y Blog, Descuento y Notificaciones ya no son apartados del menú (las noticias están en Inicio y los avisos en la campana).
(function () {
  'use strict';
  const FUERA = ['news', 'discount', 'notifications'];
  FUERA.forEach(p => { const n = document.querySelector('.nav-item[data-page="' + p + '"]'); if (n) n.style.display = 'none'; });
  document.querySelectorAll('[onclick*="showPage(\'notifications\')"]').forEach(b => { if (!b.classList.contains('nav-item')) b.style.display = 'none'; });
  const pg = window.showPage;
  window.showPage = function (page) { return pg.apply(this, FUERA.indexOf(page) >= 0 ? ['home'].concat([].slice.call(arguments, 1)) : arguments); };
})();
