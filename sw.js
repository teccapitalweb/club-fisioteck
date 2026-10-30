/* Club FisioTeck — Service Worker
   Estrategia: network-first SOLO para recursos del mismo origen (online = siempre fresco,
   offline = respaldo de caché). Firebase / gstatic / CDNs NO se interceptan. */
const CACHE = 'fisioteck-v68-soporte';
const SHELL = [
  './',
  './index.html',
  './data/content.json',
  './club-prueba.css',
  './club-prueba.js',
  './club-vip.js',
  './club-libros.js',
  './club-libros.css',
  './club-cuenta.css',
  './club-perfil.css',
  './club-perfil-inicial.css',
  './club-perfil-inicial.js',
  './club-perfil.js',
  './club-cuenta.js',
  './club-cupones.js',
  './club-retos.css',
  './club-retos.js',
  './club-detective.js',
  './club-historia.js',
  './club-retos-zona.js',
  './club-secciones.js',
  './club-cupon-barra.js',
  './club-paginas.js',
  './club-diseno-4.css',
  './club-diseno-5.css',
  './club-diseno-6.css',
  './club-retos-datos.js',
  './club-directorio.css',
  './club-directorio.js',
  './club-seccion.css',
  './club-seccion.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './pwa-logo.png',
  './assets/course-thumbnails/estimulacion-neuroplastica.webp',
  './assets/course-thumbnails/fisiopatologia-lesiones-deportivas.webp',
  './assets/course-thumbnails/fisioterapia-pulmonar-hipoxemia.webp',
  './assets/course-thumbnails/fisioterapia-respiratoria-geriatrica.webp',
  './assets/course-thumbnails/liberacion-miofascial-estetica.webp',
  './assets/course-thumbnails/manejo-dolor-terapia-fisica.webp',
  './assets/course-thumbnails/dolor-lumbar-cronico.webp',
  './assets/course-thumbnails/movilidad-motora-geriatrica.webp',
  './assets/course-thumbnails/neuroplasticidad-rehabilitacion-funcional.webp',
  './assets/course-thumbnails/rehabilitacion-deportiva.webp',
  './assets/course-thumbnails/rehabilitacion-hipertension-pulmonar.webp',
  './assets/course-thumbnails/terapia-manual-ortopedica.webp',
  './assets/course-thumbnails/paralisis-cerebral-infantil.webp',
  './assets/course-thumbnails/vendaje-neuromuscular-ortopedia.webp'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {}))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  // Solo GET y mismo origen; lo demás (Firebase, gstatic, jsdelivr, POST) pasa directo a la red.
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Red primero, pero sin esperar de más: si la red tarda más de 3.5 s y hay copia guardada, se usa la copia (antes una conexión lenta dejaba el Club cargando mucho tiempo)
  e.respondWith((async () => {
    const copia = await caches.match(req);
    try {
      const res = await Promise.race([fetch(req), new Promise((_, no) => setTimeout(() => no(new Error('lento')), copia ? 3500 : 20000))]);
      if (res.ok) { const guardar = res.clone(); caches.open(CACHE).then((c) => c.put(req, guardar)).catch(() => {}); }
      return res;
    } catch (_) {
      if (copia) return copia;
      if (req.mode === 'navigate') { const inicio = await caches.match('./index.html'); if (inicio) return inicio; }
      return new Response('', { status: 503, statusText: 'Sin conexión' });
    }
  })());
});
