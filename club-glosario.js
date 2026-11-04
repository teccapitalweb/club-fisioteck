/* Club FisioTeck — Glosario: buscador, categorías, favoritos, términos relacionados, «término del día» y modo práctica.
   Sustituye el listado simple de index.html (renderGlossary / filterGlossary) conservando los mismos términos (GLOSSARY).
   Los favoritos se guardan en este dispositivo. Depende de index.html: GLOSSARY, auth, showToast. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sinTilde = t => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const lista = () => (typeof GLOSSARY !== 'undefined' ? GLOSSARY : []);
  const uid = () => (auth.currentUser || {}).uid || 'x';
  const claveF = () => 'ft_glosario_fav_' + uid();
  let favs = new Set(), cat = 'Todas', modo = 'explorar', abierto = '', practica = null;
  const cargarFavs = () => { try { favs = new Set(JSON.parse(localStorage.getItem(claveF()) || '[]')); } catch (_) { favs = new Set(); } };
  const guardarFavs = () => { try { localStorage.setItem(claveF(), JSON.stringify([...favs])); } catch (_) { /* modo privado */ } };
  const mezclar = a => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };

  function montar() {
    const pg = $('page-glossary'); if (!pg || $('glBarra')) return;
    const buscador = pg.querySelector('.search-bar');
    buscador.insertAdjacentHTML('beforebegin', '<div class="gl-modos" id="glBarra"><button type="button" data-m="explorar" class="on">Explorar</button><button type="button" data-m="practicar">Practicar</button></div><div id="glDia"></div>');
    buscador.insertAdjacentHTML('afterend', '<div class="gl-chips" id="glChips"></div>');
    $('glBarra').querySelectorAll('button').forEach(b => b.onclick = () => { modo = b.dataset.m; $('glBarra').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); if (modo === 'practicar') iniciarPractica(); renderGlossary(); });
  }

  function terminoDelDia() {
    const l = lista(); if (!l.length) return null; const d = new Date(), n = d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate();
    return l[n % l.length];
  }
  const PAC = () => window.FT_GLOSARIO_PACIENTE || {};
  const paciente = g => (PAC()[g.t] || [])[0] || '';
  const atlasDe = g => (PAC()[g.t] || [])[2] || '';
  // Primero los relacionados que eligió el contenido; si no hay, los de la misma categoría
  function relacionados(g) {
    const sel = ((PAC()[g.t] || [])[1] || []).map(t => lista().find(x => x.t === t)).filter(Boolean);
    return (sel.length ? sel : lista().filter(x => x.c === g.c && x.t !== g.t)).slice(0, 4);
  }
  const textoPaciente = g => g.t + ': ' + paciente(g);
  function copiar(txt) {
    const ok = () => showToast('Texto copiado');
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, () => showToast('No se pudo copiar'));
    else { const a = document.createElement('textarea'); a.value = txt; a.style.position = 'fixed'; a.style.opacity = '0'; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); ok(); } catch (_) { showToast('No se pudo copiar'); } a.remove(); }
  }

  function filtrar() {
    const q = sinTilde(($('glossarySearch') || {}).value || '').trim();
    return lista().filter(g => (cat === 'Todas' || (cat === 'Favoritos' ? favs.has(g.t) : g.c === cat)) && (!q || sinTilde(g.t).includes(q) || sinTilde(g.d).includes(q) || sinTilde(g.c).includes(q) || sinTilde(paciente(g)).includes(q)));
  }
  function chips() {
    const cats = ['Todas', 'Favoritos', ...[...new Set(lista().map(g => g.c))].sort((a, b) => a.localeCompare(b, 'es'))];
    $('glChips').innerHTML = cats.map(c => '<button type="button" class="' + (c === cat ? 'on' : '') + '" data-c="' + esc(c) + '">' + esc(c) + (c === 'Favoritos' ? ' (' + favs.size + ')' : '') + '</button>').join('');
    $('glChips').querySelectorAll('button').forEach(b => b.onclick = () => { cat = b.dataset.c; renderGlossary(); });
  }
  const estrella = on => '<svg viewBox="0 0 24 24" width="18" height="18" fill="' + (on ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z"/></svg>';

  function pintarExplorar() {
    const cont = $('glossaryList'), l = filtrar(), dia = terminoDelDia();
    $('glDia').innerHTML = dia && cat === 'Todas' && !(($('glossarySearch') || {}).value || '') ? '<div class="gl-dia"><small>Término del día</small><b>' + esc(dia.t) + '</b><p>' + esc(dia.d) + '</p></div>' : '';
    if (!l.length) { cont.innerHTML = '<div class="gl-nada">' + (cat === 'Favoritos' ? 'Aún no tienes favoritos. Toca la estrella de un término para guardarlo.' : 'No se encontraron términos') + '</div>'; return; }
    cont.innerHTML = '<p class="gl-cuenta">' + l.length + ' término' + (l.length === 1 ? '' : 's') + '</p>' + l.map(g => {
      const on = favs.has(g.t), ab = abierto === g.t;
      return '<article class="gl-card' + (ab ? ' ab' : '') + '"><div class="gl-top"><button type="button" class="gl-t" data-t="' + esc(g.t) + '" aria-expanded="' + ab + '"><b>' + esc(g.t) + '</b><span class="gl-c">' + esc(g.c) + '</span></button><button type="button" class="gl-fav' + (on ? ' on' : '') + '" data-f="' + esc(g.t) + '" aria-label="' + (on ? 'Quitar de favoritos' : 'Guardar en favoritos') + '" aria-pressed="' + on + '">' + estrella(on) + '</button></div><p>' + esc(g.d) + '</p>' +
        (ab && paciente(g) ? '<div class="gl-pac"><small>Dícelo al paciente</small><p>' + esc(paciente(g)) + '</p><div class="gl-pac-acc"><button type="button" data-cp="' + esc(g.t) + '">Copiar texto</button><button type="button" data-wa="' + esc(g.t) + '">Enviar por WhatsApp</button>' + (atlasDe(g) ? '<button type="button" data-at="' + esc(atlasDe(g)) + '">Ver en el Atlas</button>' : '') + '</div></div>' : '') +
        (ab ? '<div class="gl-rel"><small>Relacionados</small>' + (relacionados(g).map(r => '<button type="button" data-r="' + esc(r.t) + '">' + esc(r.t) + '</button>').join('') || '<em>Sin términos relacionados</em>') + '</div>' : '') + '</article>';
    }).join('');
    cont.querySelectorAll('.gl-t').forEach(b => b.onclick = () => { abierto = abierto === b.dataset.t ? '' : b.dataset.t; pintarExplorar(); });
    cont.querySelectorAll('.gl-fav').forEach(b => b.onclick = () => { const t = b.dataset.f; if (favs.has(t)) favs.delete(t); else favs.add(t); guardarFavs(); chips(); pintarExplorar(); });
    const porT = t => lista().find(x => x.t === t);
    cont.querySelectorAll('[data-cp]').forEach(b => b.onclick = () => { const g = porT(b.dataset.cp); if (g) copiar(textoPaciente(g)); });
    cont.querySelectorAll('[data-wa]').forEach(b => b.onclick = () => { const g = porT(b.dataset.wa); if (g) window.open('https://wa.me/?text=' + encodeURIComponent(textoPaciente(g)), '_blank', 'noopener'); });
    cont.querySelectorAll('[data-at]').forEach(b => b.onclick = () => { showPage('atlas'); setTimeout(() => { if (window.showMuscle) window.showMuscle(b.dataset.at); }, 150); });
    cont.querySelectorAll('[data-r]').forEach(b => b.onclick = () => { abierto = b.dataset.r; cat = 'Todas'; const s = $('glossarySearch'); if (s) s.value = b.dataset.r; chips(); pintarExplorar(); });
  }

  // ---------- Práctica: se lee la definición y se elige el término ----------
  function iniciarPractica() {
    const l = lista(); if (l.length < 4) { practica = null; return; }
    practica = { preguntas: mezclar(l).slice(0, 10).map(g => { const mismos = mezclar(l.filter(x => x.t !== g.t && x.c === g.c)), otros = mezclar(l.filter(x => x.t !== g.t && x.c !== g.c)); const opc = mezclar([g, ...mismos.concat(otros).slice(0, 3)]); return { g, opc }; }), i: 0, ok: 0, respondida: false, fin: false };
  }
  function pintarPractica() {
    const cont = $('glossaryList'); $('glDia').innerHTML = ''; $('glChips').innerHTML = '';
    if (!practica) { cont.innerHTML = '<div class="gl-nada">No hay suficientes términos para practicar.</div>'; return; }
    if (practica.fin) {
      cont.innerHTML = '<div class="gl-quiz"><small>Práctica terminada</small><h3>' + practica.ok + ' de ' + practica.preguntas.length + ' correctas</h3><p>' + (practica.ok >= 8 ? 'Dominas estos términos.' : practica.ok >= 5 ? 'Vas bien. Repasa los que fallaste.' : 'Repasa el glosario y vuelve a intentarlo.') + '</p><button type="button" class="gl-cta" id="glOtra">Practicar otra vez</button></div>';
      $('glOtra').onclick = () => { iniciarPractica(); pintarPractica(); }; return;
    }
    const q = practica.preguntas[practica.i];
    cont.innerHTML = '<div class="gl-quiz"><small>Pregunta ' + (practica.i + 1) + ' de ' + practica.preguntas.length + ' · ' + esc(q.g.c) + '</small><h3>¿Qué término corresponde a esta definición?</h3><p class="gl-def">' + esc(q.g.d) + '</p>' +
      q.opc.map((o, k) => '<button type="button" class="gl-op" data-k="' + k + '">' + esc(o.t) + '</button>').join('') + '<div id="glRes"></div></div>';
    cont.querySelectorAll('.gl-op').forEach(b => b.onclick = () => {
      if (practica.respondida) return; practica.respondida = true; const o = q.opc[Number(b.dataset.k)], ok = o.t === q.g.t; if (ok) practica.ok++;
      cont.querySelectorAll('.gl-op').forEach(x => { const t = q.opc[Number(x.dataset.k)].t; if (t === q.g.t) x.classList.add('bien'); else if (x === b) x.classList.add('mal'); x.disabled = true; });
      $('glRes').innerHTML = '<p class="' + (ok ? 'gl-ok' : 'gl-err') + '">' + (ok ? 'Correcto.' : 'La respuesta era «' + esc(q.g.t) + '».') + '</p><button type="button" class="gl-cta" id="glSig">' + (practica.i + 1 < practica.preguntas.length ? 'Siguiente' : 'Ver resultado') + '</button>';
      $('glSig').onclick = () => { practica.respondida = false; if (practica.i + 1 < practica.preguntas.length) practica.i++; else practica.fin = true; pintarPractica(); };
    });
  }

  window.renderGlossary = function () { montar(); if (!favs.size) cargarFavs(); if (modo === 'practicar') { if (!practica) iniciarPractica(); pintarPractica(); return; } chips(); pintarExplorar(); };
  window.filterGlossary = function () { if (modo === 'practicar') return; abierto = ''; chips(); pintarExplorar(); };
  auth.onAuthStateChanged(() => { favs = new Set(); cargarFavs(); });
  montar();
})();
