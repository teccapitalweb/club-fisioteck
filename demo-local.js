/* SOLO PARA VER EL CLUB EN TU COMPUTADORA (no hace nada en internet): simula una sesión sin pedir Google ni tocar Firebase.
   Funciona únicamente en localhost/127.0.0.1 y solo si la dirección lleva ?demo=...:
     http://localhost:8080/?demo=vip      miembro VIP con varios días de antigüedad (sin bienvenida)
     http://localhost:8080/?demo=nuevo    miembro VIP recién registrado (se ve la bienvenida con confeti y el recorrido)
     http://localhost:8080/?demo=free     cuenta gratuita sin membresía (vista previa, curso de prueba y barra de cupón con ftCuponBarra.demo())
     http://localhost:8080/?demo=off      vuelve al modo normal
   Necesita el servidor de demostración (node scripts/demo-local.js en club-fisioteck-webhooks, puerto 3000). Los datos viven en memoria.
   Se carga ANTES de los scripts de Firebase (por eso va en el <head>). En producción (otro dominio) termina sin hacer nada. */
(function () {
  'use strict';
  var h = location.hostname;
  if (h !== 'localhost' && h !== '127.0.0.1') return;
  var modo = new URLSearchParams(location.search).get('demo');
  try { if (modo === 'off') sessionStorage.removeItem('ft_demo'); else if (modo) sessionStorage.setItem('ft_demo', modo); else modo = sessionStorage.getItem('ft_demo'); } catch (e) { /* sin almacenamiento */ }
  if (!modo || modo === 'off' || ['vip', 'nuevo', 'free'].indexOf(modo) < 0) return;

  var uid = modo === 'free' ? 'free-demo' : modo === 'nuevo' ? 'vip-nuevo-demo' : 'vip-demo';
  var email = uid + '@demo.local', nombre = modo === 'free' ? 'Cuenta Gratis' : 'Ana Torres';
  var b64 = function (o) { return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_'); };
  var token = b64({ alg: 'none' }) + '.' + b64({ user_id: uid, email: email, email_verified: true, name: nombre }) + '.x';
  var dias = function (n) { return new Date(Date.now() + n * 864e5); };
  var iso = function (d) { return d.toISOString().split('T')[0]; };
  var creada = modo === 'vip' ? dias(-60) : new Date();
  var usuario = { uid: uid, displayName: nombre, email: email, emailVerified: true, metadata: { creationTime: creada.toUTCString(), lastSignInTime: new Date().toUTCString() }, getIdToken: function () { return Promise.resolve(token); }, updateProfile: function () { return Promise.resolve(); } };
  var miembro = modo === 'free'
    ? { name: nombre, email: email, status: 'registered', startDate: iso(new Date()) }
    : { name: nombre, email: email, status: 'active', startDate: iso(modo === 'vip' ? dias(-3) : new Date()), plan: 'mensual', payments: [{ date: iso(modo === 'vip' ? dias(-3) : new Date()), amount: 199 }], nextPaymentDate: iso(dias(27)) };
  try { localStorage.setItem('fisioteck_theme', 'light'); } catch (e) { /* sin almacenamiento */ }

  // Aviso visible para que no se confunda con una sesión real
  document.addEventListener('DOMContentLoaded', function () {
    var b = document.createElement('div');
    b.textContent = 'MODO DEMO LOCAL (' + modo + ') · datos de prueba';
    b.style.cssText = 'position:fixed;left:50%;top:0;transform:translateX(-50%);z-index:2147483647;padding:0 10px;border-radius:0 0 8px 8px;background:#7C3AED;color:#fff;font:700 9px/14px system-ui,sans-serif;letter-spacing:.04em;white-space:nowrap;pointer-events:none;opacity:.9';
    document.body.appendChild(b);
  });

  // ---- Firestore en memoria: lo que escribas en el modo demo (foro, respuestas, tarjetas del directorio...) se queda mientras no recargues ----
  var ahoraTs = function () { var ms = Date.now(); return { seconds: Math.floor(ms / 1000), nanoseconds: 0, toDate: function () { return new Date(ms); }, toMillis: function () { return ms; } }; };
  var FV = {
    serverTimestamp: function () { return { __op: 'ts' }; }, increment: function (n) { return { __op: 'inc', n: n }; },
    arrayUnion: function () { return { __op: 'union', items: [].slice.call(arguments) }; }, arrayRemove: function () { return { __op: 'remove', items: [].slice.call(arguments) }; }, delete: function () { return { __op: 'del' }; }
  };
  var almacen = {}, oyentes = [], contador = 1;
  var clon = function (v) { return v === undefined ? v : JSON.parse(JSON.stringify(v)); };
  var aplicarOp = function (previo, v) {
    if (v && v.__op === 'ts') return ahoraTs();
    if (v && v.__op === 'inc') return (typeof previo === 'number' ? previo : 0) + v.n;
    if (v && v.__op === 'union') { var u = Array.isArray(previo) ? previo.slice() : []; v.items.forEach(function (i) { if (u.indexOf(i) < 0) u.push(i); }); return u; }
    if (v && v.__op === 'remove') return (Array.isArray(previo) ? previo : []).filter(function (i) { return v.items.indexOf(i) < 0; });
    return v;
  };
  var fijar = function (ruta, datos, mezclar) {
    var base = mezclar && almacen[ruta] ? almacen[ruta] : {};
    Object.keys(datos).forEach(function (k) {
      var v = datos[k];
      if (v && v.__op === 'del') { delete base[k]; return; }
      if (k.indexOf('.') > 0) { var p = k.split('.'); var o = base; for (var i = 0; i < p.length - 1; i++) { o[p[i]] = o[p[i]] || {}; o = o[p[i]]; } o[p[p.length - 1]] = aplicarOp(o[p[p.length - 1]], v); return; }
      base[k] = aplicarOp(base[k], v);
    });
    almacen[ruta] = base; avisar(ruta);
  };
  var avisar = function () { oyentes.slice().forEach(function (o) { try { o(); } catch (e) { /* oyente roto */ } }); };
  var hijos = function (ruta) {
    var n = ruta.split('/').length + 1;
    return Object.keys(almacen).filter(function (k) { return k.indexOf(ruta + '/') === 0 && k.split('/').length === n; });
  };
  var valorDe = function (d, campo) { return String(campo).split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, d); };
  var ordenable = function (v) { return v && typeof v.seconds === 'number' ? v.seconds : v; };
  var snapDoc = function (ruta) {
    var d = almacen[ruta];
    return { exists: d !== undefined, id: ruta.split('/').pop(), ref: documento(ruta), data: function () { return d === undefined ? undefined : d; }, get: function (k) { return d === undefined ? undefined : valorDe(d, k); } };
  };
  var consulta = function (ruta, filtros, orden, tope) {
    var q = {
      doc: function (id) { return documento(ruta + '/' + id); },
      where: function (c, op, v) { return consulta(ruta, filtros.concat([[c, op, v]]), orden, tope); },
      orderBy: function (c, dir) { return consulta(ruta, filtros, [c, dir || 'asc'], tope); },
      limit: function (n) { return consulta(ruta, filtros, orden, n); },
      add: function (datos) { var id = 'demo' + (contador++); fijar(ruta + '/' + id, datos, false); return Promise.resolve(documento(ruta + '/' + id)); },
      get: function () { return Promise.resolve(calcular()); },
      onSnapshot: function (cb) { var f = function () { cb(calcular()); }; oyentes.push(f); setTimeout(f, 0); return function () { oyentes = oyentes.filter(function (x) { return x !== f; }); }; }
    };
    function calcular() {
      var docs = hijos(ruta).map(snapDoc).filter(function (sd) {
        return filtros.every(function (f) { var x = valorDe(sd.data(), f[0]); return f[1] === '==' ? x === f[2] : f[1] === 'in' ? f[2].indexOf(x) >= 0 : f[1] === 'array-contains' ? Array.isArray(x) && x.indexOf(f[2]) >= 0 : f[1] === '!=' ? x !== f[2] : true; });
      });
      if (orden) docs.sort(function (a, b) { var x = ordenable(valorDe(a.data(), orden[0])), y = ordenable(valorDe(b.data(), orden[0])); return (x > y ? 1 : x < y ? -1 : 0) * (orden[1] === 'desc' ? -1 : 1); });
      if (tope) docs = docs.slice(0, tope);
      return { docs: docs, empty: docs.length === 0, size: docs.length, forEach: function (fn) { docs.forEach(fn); } };
    }
    return q;
  };
  var coleccion = function (ruta) { return consulta(ruta, [], null, 0); };
  var documento = function (ruta) {
    return {
      id: ruta.split('/').pop(), path: ruta,
      get: function () { return Promise.resolve(snapDoc(ruta)); },
      set: function (d, o) { fijar(ruta, d, !!(o && o.merge)); return Promise.resolve(); },
      update: function (d) { if (almacen[ruta] === undefined) return Promise.reject(Object.assign(new Error('not-found'), { code: 'not-found' })); fijar(ruta, d, true); return Promise.resolve(); },
      delete: function () { Object.keys(almacen).forEach(function (k) { if (k === ruta || k.indexOf(ruta + '/') === 0) delete almacen[k]; }); avisar(); return Promise.resolve(); },
      collection: function (n) { return coleccion(ruta + '/' + n); },
      onSnapshot: function (cb) { var f = function () { cb(snapDoc(ruta)); }; oyentes.push(f); setTimeout(f, 0); return function () { oyentes = oyentes.filter(function (x) { return x !== f; }); }; }
    };
  };
  almacen['members/' + uid] = miembro;
  // Datos de ejemplo para ver el foro y el directorio con contenido (solo en este modo demo)
  var hace = function (h) { var ms = Date.now() - h * 3600e3; return { seconds: Math.floor(ms / 1000), nanoseconds: 0, toDate: function () { return new Date(ms); }, toMillis: function () { return ms; } }; };
  [['p1', 'Valeria M.', 'casos', 'Dolor de hombro en nadadora: ¿por dónde empiezan?', 'Paciente de 24 años, nada seis días a la semana. Dolor anterior al elevar el brazo desde hace un mes. ¿Empiezo por control escapular o por movilidad de la cápsula posterior?', 3, ['u2', 'u3', 'u4']],
    ['p2', 'Daniel R.', 'dudas', 'Progresión de carga tras reconstrucción de LCA', 'En la semana 8 mi paciente ya extiende completo y no tiene derrame. ¿Qué criterios usan antes de subir la carga?', 2, ['u2']],
    ['p3', 'Fernanda L.', 'tips', 'Explicar la escala EVA a adultos mayores', 'Una regla impresa grande con caritas me ha funcionado mejor que pedir un número.', 1, []]].forEach(function (p, i) {
    almacen['forum_posts/' + p[0]] = { title: p[3], body: p[4], category: p[2], authorId: 'otro' + i, authorName: p[1], replyCount: p[5], likes: p[6], createdAt: hace(3 + i * 20) };
  });
  almacen['forum_posts/p1/replies/r1'] = { body: 'Yo empezaría con control escapular y educación; la cápsula posterior después si hay déficit de rotación interna.', authorId: 'otro9', authorName: 'Iván S.', createdAt: hace(2), likes: [] };
  almacen['forum_posts/p1/replies/r2'] = { body: 'Revisa también la carga de entrenamiento de las últimas semanas, suele explicar mucho.', authorId: 'otro8', authorName: 'Camila P.', createdAt: hace(1), likes: ['u1'] };
  almacen['forum_posts/p1/replies/r3'] = { body: 'Gracias, voy a empezar por ahí y les cuento cómo evoluciona.', authorId: 'otro0', authorName: 'Valeria M.', createdAt: hace(0.5), likes: [] };
  [['dir1', 'Laura Méndez', 'Fisioterapia deportiva', 'Puebla, Puebla', 'Readaptación deportiva y prevención de lesiones en corredores.', 'Fisioterapeuta', 'Clínica Movimiento', '2221234567'],
    ['dir2', 'Carlos Rojas', 'Neurorrehabilitación', 'Ciudad de México', 'Rehabilitación de pacientes con secuelas de evento vascular cerebral.', 'Coordinador de rehabilitación', 'Centro Neuro', ''],
    ['dir3', 'Andrea Paz', 'Cardiopulmonar y respiratoria', 'Monterrey, Nuevo León', '', '', '', '']].forEach(function (t) {
    almacen['directorio/' + t[0]] = { nombre: t[1], especialidad: t[2], ciudad: t[3], bio: t[4], puesto: t[5], empresa: t[6], publicado: true, estado: t[0] === 'dir1' ? 'proyectos' : t[0] === 'dir2' ? 'empleo' : '', portadaColor: t[0] === 'dir1' ? 'azul' : t[0] === 'dir2' ? 'turquesa' : 'dorado', avatar: t[0] === 'dir1' ? 'a03' : t[0] === 'dir2' ? 'a07' : '' };
  });
  var fsInst = { collection: coleccion, doc: function (p) { return documento(p); },
    runTransaction: function (f) { return Promise.resolve(f({ get: function (r) { return r.get(); }, set: function (r, d, o) { return r.set(d, o); }, update: function (r, d) { return r.update(d); } })); },
    batch: function () { var ops = []; return { set: function (r, d, o) { ops.push(function () { return r.set(d, o); }); }, update: function (r, d) { ops.push(function () { return r.update(d); }); }, delete: function (r) { ops.push(function () { return r.delete(); }); }, commit: function () { return Promise.all(ops.map(function (f) { return f(); })); } }; },
    enablePersistence: function () { return Promise.resolve(); }, settings: function () {} };

  var fb;
  Object.defineProperty(window, 'firebase', { configurable: true, get: function () { return fb; }, set: function (v) {
    fb = v; var envuelto, original, fsOrig, fsEnv;
    Object.defineProperty(v, 'firestore', { configurable: true, get: function () { return fsEnv || fsOrig; }, set: function (f) {
      fsOrig = f; fsEnv = function () { return fsInst; };
      Object.keys(f).forEach(function (k) { try { fsEnv[k] = f[k]; } catch (e) { /* sigue */ } });
      try { fsEnv.FieldValue = FV; fsEnv.Timestamp = f.Timestamp; } catch (e) { /* sigue */ }
    } });
    Object.defineProperty(v, 'auth', { configurable: true, get: function () { return envuelto || original; }, set: function (a) {
      original = a;
      envuelto = function () {
        var inst = a.apply(this, arguments);
        if (!inst.__demo) {
          inst.__demo = true;
          try { Object.defineProperty(inst, 'currentUser', { configurable: true, get: function () { return usuario; } }); } catch (e) { /* sigue */ }
          inst.onAuthStateChanged = function (cb) { setTimeout(function () { cb(usuario); }, 300); return function () {}; };
          inst.signOut = function () { try { sessionStorage.removeItem('ft_demo'); } catch (e) { /* nada */ } location.href = location.pathname + '?demo=off'; return Promise.resolve(); };
        }
        return inst;
      };
      Object.keys(a).forEach(function (k) { try { envuelto[k] = a[k]; } catch (e) { /* sigue */ } });
      try { envuelto.GoogleAuthProvider = a.GoogleAuthProvider; } catch (e) { /* sigue */ }
    } });
  } });
})();
