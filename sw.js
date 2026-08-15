/* Club FisioTeck — Service Worker
   Estrategia: network-first SOLO para recursos del mismo origen (online = siempre fresco,
   offline = respaldo de caché). Firebase / gstatic / CDNs NO se interceptan. */
const CACHE = 'fisioteck-v22-auth-bootstrap';
const SHELL = [
  './',
  './index.html',
  './data/content.json',
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

  e.respondWith(
    fetch(req)
      .then((res) => {
        // Guardar únicamente respuestas válidas para no fijar errores en caché.
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(async () => {
        const hit = await caches.match(req);
        if (hit) return hit;
        if (req.mode === 'navigate') return caches.match('./index.html');
        return new Response('', { status: 503, statusText: 'Sin conexión' });
      })
  );
});
