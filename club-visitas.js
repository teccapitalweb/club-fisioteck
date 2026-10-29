/* Contador anónimo de visitas · Club FisioTeck (igual que Alintec Food)
   - Sin cookies y sin guardar la IP: el servidor cuenta visitas, personas distintas del día, dispositivo, país y origen.
   - Sin sesión cuenta como «acceso» (login y registro). Con sesión cuenta como «club» y se asocia a la cuenta, para ver qué
     miembros entran y de dónde llegó cada cuenta nueva (Facebook, Instagram, Google…). Quien administra no cuenta.
   - Una visita por página cada 30 minutos; respeta «No rastrear»; solo cuenta en club.fisioteck.com.
   Depende de index.html: auth (Firebase). */
(function () {
  'use strict';
  if (location.hostname !== 'club.fisioteck.com') return;
  try { if (navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.globalPrivacyControl === true) return; } catch (e) { /* sigue */ }
  if (typeof auth === 'undefined') return;

  var URL_API = 'https://web-production-cd020.up.railway.app/api/visita';
  var VENTANA_MS = 30 * 60 * 1000;
  var CLAVE_ORIGEN = 'ft_origen_v1';
  var params = new URLSearchParams(location.search);

  function yaContada(p) { try { var t = Number(sessionStorage.getItem('ft_vis_' + p) || 0); return t && Date.now() - t < VENTANA_MS; } catch (e) { return false; } }
  function marcar(p) { try { sessionStorage.setItem('ft_vis_' + p, String(Date.now())); } catch (e) { /* modo privado */ } }
  function leerOrigen() { try { var o = JSON.parse(sessionStorage.getItem(CLAVE_ORIGEN) || 'null'); return o && typeof o === 'object' ? o : null; } catch (e) { return null; } }
  // Origen del primer contacto: ?utm_source (la portada lo agrega a sus enlaces al Club), página que enlazó o app de red social
  (function capturar() {
    if (leerOrigen()) return;
    var ref = document.referrer || '', utm = (params.get('utm_source') || '').slice(0, 40);
    var interno = false;
    try { interno = !!ref && /(^|\.)fisioteck\.com$/i.test(new URL(ref).hostname); } catch (e) { interno = false; }
    if (interno && !utm) return;
    try { sessionStorage.setItem(CLAVE_ORIGEN, JSON.stringify({ ref: ref.slice(0, 300), utm: utm, ua: (navigator.userAgent || '').slice(0, 300), t: Date.now(), fb: params.has('fbclid'), ig: params.has('igshid') || params.has('igsh') })); } catch (e) { /* modo privado */ }
  })();

  function enviar(pagina, token) {
    if (yaContada(pagina)) return;
    marcar(pagina);
    var cab = { 'Content-Type': 'application/json' };
    if (token) cab.Authorization = 'Bearer ' + token;
    var cuerpo = { pagina: pagina, ref: document.referrer || '', utm: params.get('utm_source') || '' };
    if (params.has('fbclid')) cuerpo.fbclid = true;
    if (params.has('igshid') || params.has('igsh')) cuerpo.igshid = true;
    if (token) { var o = leerOrigen(); if (o) cuerpo.origen = o; }
    try { fetch(URL_API, { method: 'POST', headers: cab, body: JSON.stringify(cuerpo), keepalive: true }).catch(function () {}); } catch (e) { /* las métricas nunca estorban */ }
  }

  var primera = true;
  auth.onAuthStateChanged(function (u) {
    if (u && typeof u.getIdToken === 'function') { u.getIdToken().then(function (t) { enviar('club', t); }, function () { enviar('club', null); }); }
    else if (primera) enviar('acceso', null);
    primera = false;
  });
})();
