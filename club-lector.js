/* Club FisioTeck — Lector de libros (mismo diseño que el lector de Alintec Food): libro abierto, una página, giro de hoja,
   «Continuar desde la página N», ir a una página, barra de avance y teclado. Las páginas del PDF se dibujan con pdf.js.
   Uso: ftLector.abrir({ id, titulo, subtitulo, url })  ·  url = enlace firmado que entrega el servidor (POST /api/libros/:id/enlace). */
(function () {
  'use strict';
  const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
  const WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const IC = {
    flecha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    libro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>'
  };

  let cargaPdf = null;
  function cargarPdfJs() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if (cargaPdf) return cargaPdf;
    cargaPdf = new Promise((ok, mal) => {
      const s = document.createElement('script'); s.src = PDFJS; s.async = true;
      s.onload = () => { try { window.pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER; ok(window.pdfjsLib); } catch (e) { mal(e); } };
      s.onerror = () => { cargaPdf = null; mal(new Error('No se pudo cargar el lector. Revisa tu conexión e intenta de nuevo.')); };
      document.head.appendChild(s);
    });
    return cargaPdf;
  }

  function estilo() {
    if (document.getElementById('ftLectorEstilo')) return;
    const st = document.createElement('style'); st.id = 'ftLectorEstilo';
    st.textContent = `
.rdr-overlay{position:fixed;inset:0;z-index:10080;display:flex;flex-direction:column;background:linear-gradient(135deg,#A9BECE,#C7D5DF);animation:rdrIn .2s ease both;font-family:inherit}
@keyframes rdrIn{from{opacity:0}}
.rdr-head{display:flex;align-items:center;gap:14px;padding:10px 16px;background:#64788D;border-bottom:1px solid rgba(255,255,255,.16);flex-shrink:0}
.rdr-back{display:inline-flex;align-items:center;gap:8px;color:rgba(255,255,255,.88);font:700 12.5px inherit;cursor:pointer;background:none;border:0}
.rdr-back:hover{color:#fff}.rdr-back svg{width:15px;height:15px;transform:scaleX(-1)}
.rdr-head-c{flex:1;min-width:0;text-align:center;display:grid;gap:2px}
.rdr-titulo{color:#fff;font-size:12.5px;font-weight:700;letter-spacing:.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rdr-head-c small{color:rgba(255,255,255,.58);font-size:9px;letter-spacing:.7px;text-transform:uppercase}
.rdr-view{display:inline-flex;align-items:center;gap:7px;padding:8px 11px;border-radius:9px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.17);color:#fff;font-size:10.5px;font-weight:750;cursor:pointer;font-family:inherit}
.rdr-view svg{width:14px;height:14px}
.rdr-close{width:34px;height:34px;border-radius:9px;display:grid;place-items:center;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);color:#fff;cursor:pointer;flex-shrink:0}
.rdr-close svg{width:15px;height:15px}
.rdr-resume{margin:0 14px;padding:10px 15px;border-radius:0 0 14px 14px;background:#6D6F68;color:#fff;font-size:11px;font-weight:750;border-bottom:1px solid rgba(214,166,83,.7);flex-shrink:0}
.rdr-resume svg{width:12px;height:12px;margin-right:7px;color:#F0CC79;vertical-align:-1px}
.rdr-escenario{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;gap:20px;padding:24px}
.rdr-flecha{width:44px;height:44px;border-radius:50%;flex-shrink:0;display:grid;place-items:center;background:#5F758A;border:1.5px solid rgba(255,255,255,.28);color:rgba(255,255,255,.92);cursor:pointer;transition:.15s ease}
.rdr-flecha:hover:not(:disabled){background:#6E869C;transform:scale(1.05)}.rdr-flecha:disabled{opacity:.15;pointer-events:none}
.rdr-flecha svg{width:18px;height:18px}.rdr-flecha--izq svg{transform:scaleX(-1)}
.rdr-libro{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);width:min(940px,82vw);height:min(68vh,650px);background:#F8F5EE;border-radius:7px;box-shadow:0 30px 65px rgba(25,43,56,.34);perspective:1800px;transition:width .25s ease}
.rdr-hoja{position:relative;height:100%;overflow:hidden;background-color:#FBFAF6;display:grid;place-items:center;cursor:zoom-in;background-image:repeating-linear-gradient(transparent,transparent 28px,rgba(18,44,63,.023) 28px 29px)}
.rdr-hoja--left{border-radius:7px 0 0 7px;background-image:linear-gradient(90deg,transparent 92%,rgba(36,39,36,.08)),repeating-linear-gradient(transparent,transparent 28px,rgba(18,44,63,.023) 28px 29px)}
.rdr-hoja--right{border-radius:0 7px 7px 0;background-image:linear-gradient(90deg,rgba(36,39,36,.08),transparent 8%),repeating-linear-gradient(transparent,transparent 28px,rgba(18,44,63,.023) 28px 29px)}
.rdr-hoja canvas{display:block;max-width:100%;max-height:100%;width:auto;height:auto}
.rdr-pagina-vacia{display:grid;place-items:center;height:100%;color:#71808A;font:700 11px 'JetBrains Mono',monospace;letter-spacing:.6px;text-transform:uppercase}
.rdr-cargando{color:#71808A;font:600 12px inherit}
.rdr-lomo{position:absolute;z-index:6;left:50%;top:0;bottom:0;width:10px;transform:translateX(-50%);background:linear-gradient(90deg,rgba(41,43,39,.14),rgba(255,255,255,.65) 48%,rgba(41,43,39,.16));box-shadow:0 0 14px rgba(30,33,31,.16);pointer-events:none}
.rdr-libro.is-single{grid-template-columns:minmax(0,1fr);width:min(610px,78vw)}
.rdr-libro.is-single .rdr-hoja--right,.rdr-libro.is-single .rdr-lomo{display:none}
.rdr-libro.is-single .rdr-hoja--left{border-radius:7px;cursor:default}
.rdr-turn-sheet{display:none;position:absolute;z-index:8;top:0;bottom:0;width:50%;background:#FBFAF6;box-shadow:0 0 32px rgba(19,28,32,.26);backface-visibility:hidden}
.rdr-libro.is-turn-next .rdr-turn-sheet{display:block;right:0;transform-origin:left center;animation:rdrLeafNext .78s cubic-bezier(.55,.05,.25,1) both}
.rdr-libro.is-turn-prev .rdr-turn-sheet{display:block;left:0;transform-origin:right center;animation:rdrLeafPrev .78s cubic-bezier(.55,.05,.25,1) both}
.rdr-libro.is-single .rdr-turn-sheet{width:100%}
@keyframes rdrLeafNext{0%{transform:rotateY(0);background:#FBFAF6}50%{box-shadow:-18px 5px 32px rgba(19,28,32,.28)}100%{transform:rotateY(-180deg);background:#E9E5DB}}
@keyframes rdrLeafPrev{0%{transform:rotateY(0);background:#FBFAF6}50%{box-shadow:18px 5px 32px rgba(19,28,32,.28)}100%{transform:rotateY(180deg);background:#E9E5DB}}
.rdr-pie{display:flex;align-items:center;gap:16px;padding:12px 22px;background:#526B82;border-top:1px solid rgba(255,255,255,.1);flex-shrink:0}
.rdr-ir{color:rgba(255,255,255,.88);font:700 11.5px inherit;white-space:nowrap;cursor:pointer;padding:6px 10px;border-radius:8px;background:none;border:0}.rdr-ir:hover{background:rgba(255,255,255,.08)}
.rdr-hint{color:rgba(255,255,255,.62);font-size:10.5px;white-space:nowrap}
.rdr-progreso{flex:1;height:6px;border-radius:3px;background:rgba(255,255,255,.14);cursor:pointer;position:relative}
.rdr-progreso-fill{height:100%;border-radius:3px;background:#E1B45F;transition:width .25s ease}
.rdr-paginador{color:rgba(255,255,255,.85);font:700 11.5px inherit;white-space:nowrap}.rdr-paginador strong{color:#fff}
@media(max-width:760px){.rdr-libro{width:94vw;height:74vh}.rdr-flecha{width:38px;height:38px;position:absolute;bottom:74px;z-index:3}.rdr-flecha--izq{left:14px}.rdr-flecha--der{right:14px}.rdr-escenario{padding:12px;gap:10px}.rdr-hint{display:none}.rdr-pie{gap:10px;padding:10px 14px}.rdr-view span{display:none}}
@media(prefers-reduced-motion:reduce){.rdr-turn-sheet{animation:none!important}.rdr-libro{transition:none}}`;
    document.head.appendChild(st);
  }

  async function abrir(op) {
    estilo();
    const id = String(op.id || op.titulo || 'libro');
    const clave = 'ft:lector:' + ((typeof auth !== 'undefined' && auth.currentUser && auth.currentUser.uid) || 'x') + ':' + id + ':pagina'; // por cuenta: en un equipo compartido no se mezclan
    document.querySelectorAll('.rdr-overlay').forEach(o => o.remove());
    const overlay = document.createElement('div'); overlay.className = 'rdr-overlay';
    overlay.innerHTML = '<div class="rdr-escenario"><span class="rdr-cargando">Abriendo el libro…</span></div>';
    document.body.appendChild(overlay);
    const antesOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
    let cerrado = false, teclado = null;
    const cerrar = () => { if (cerrado) return; cerrado = true; document.body.style.overflow = antesOverflow; overlay.remove(); if (teclado) document.removeEventListener('keydown', teclado); };
    try {
      const lib = await cargarPdfJs();
      const doc = await lib.getDocument({ url: op.url, withCredentials: false }).promise;
      if (cerrado) return;
      const total = doc.numPages;
      let guardada = 1; try { guardada = Math.max(1, Math.min(total, parseInt(localStorage.getItem(clave) || '1', 10) || 1)); } catch (_) { /* sin almacenamiento */ }
      let i = guardada - 1, vista = window.matchMedia('(max-width:760px)').matches ? 'single' : 'spread', animando = false;
      if (vista === 'spread') i = Math.floor(i / 2) * 2;

      overlay.innerHTML =
        '<header class="rdr-head"><button type="button" class="rdr-back" id="rdrBack">' + IC.flecha + 'Biblioteca</button>' +
        '<div class="rdr-head-c"><span class="rdr-titulo">' + esc(op.titulo) + '</span>' + (op.subtitulo ? '<small>' + esc(op.subtitulo) + '</small>' : '') + '</div>' +
        '<button type="button" class="rdr-view" id="rdrVista" aria-label="Cambiar vista">' + IC.libro + '<span>Una página</span></button>' +
        '<button type="button" class="rdr-close" id="rdrCerrar" aria-label="Cerrar">' + IC.x + '</button></header>' +
        (guardada > 1 ? '<div class="rdr-resume">' + IC.pin + 'Continuar desde la página ' + guardada + '</div>' : '') +
        '<div class="rdr-escenario"><button type="button" class="rdr-flecha rdr-flecha--izq" id="rdrPrev" aria-label="Página anterior">' + IC.flecha + '</button>' +
        '<div class="rdr-libro" id="rdrLibro" aria-label="Libro abierto; presiona una hoja para verla sola"><article class="rdr-hoja rdr-hoja--left"></article><span class="rdr-lomo" aria-hidden="true"></span><article class="rdr-hoja rdr-hoja--right"></article><span class="rdr-turn-sheet" aria-hidden="true"></span></div>' +
        '<button type="button" class="rdr-flecha rdr-flecha--der" id="rdrNext" aria-label="Página siguiente">' + IC.flecha + '</button></div>' +
        '<footer class="rdr-pie"><button type="button" class="rdr-ir" id="rdrIr">Ir a página</button><span class="rdr-hint">Presiona una hoja para verla sola</span>' +
        '<div class="rdr-progreso" id="rdrProg" title="Presiona para ir a una página"><div class="rdr-progreso-fill" id="rdrFill"></div></div><div class="rdr-paginador"><strong id="rdrActual"></strong> de ' + total + '</div></footer>';

      const libro = overlay.querySelector('#rdrLibro'), hojas = [...overlay.querySelectorAll('.rdr-hoja')];
      const btnPrev = overlay.querySelector('#rdrPrev'), btnNext = overlay.querySelector('#rdrNext'), btnVista = overlay.querySelector('#rdrVista');
      const cache = new Map(); // número de página -> canvas ya dibujado (se guardan unas cuantas para no repetir trabajo)

      async function dibujar(n, hoja) {
        hoja.dataset.page = '';
        if (n < 0 || n >= total) { hoja.innerHTML = n >= total && n === total ? '<div class="rdr-pagina-vacia"><span>Fin del libro</span></div>' : ''; return; }
        hoja.dataset.page = String(n);
        if (cache.has(n)) { hoja.innerHTML = ''; hoja.appendChild(cache.get(n)); return; }
        hoja.innerHTML = '<span class="rdr-cargando">Cargando página…</span>';
        try {
          const pag = await doc.getPage(n + 1), base = pag.getViewport({ scale: 1 });
          const cajaH = hoja.clientHeight || 600, cajaW = hoja.clientWidth || 400, k = Math.min(cajaH / base.height, cajaW / base.width), ratio = Math.min(2, window.devicePixelRatio || 1);
          const vp = pag.getViewport({ scale: k * ratio }), c = document.createElement('canvas');
          c.width = Math.floor(vp.width); c.height = Math.floor(vp.height); c.style.width = Math.floor(vp.width / ratio) + 'px'; c.style.height = Math.floor(vp.height / ratio) + 'px';
          await pag.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
          cache.set(n, c); if (cache.size > 8) cache.delete(cache.keys().next().value);
          if (hoja.dataset.page === String(n) && !cerrado) { hoja.innerHTML = ''; hoja.appendChild(c); }
        } catch (_) { if (hoja.dataset.page === String(n)) hoja.innerHTML = '<div class="rdr-pagina-vacia"><span>No se pudo mostrar esta página</span></div>'; }
      }
      function persistir() { try { localStorage.setItem(clave, String(i + 1)); } catch (_) { /* sin almacenamiento */ } }
      function pintar() {
        libro.classList.toggle('is-single', vista === 'single');
        const der = vista === 'spread' ? i + 1 : -1;
        dibujar(i, hojas[0]); if (vista === 'spread') dibujar(der, hojas[1]); else hojas[1].innerHTML = '';
        const fin = vista === 'spread' ? Math.min(i + 2, total) : i + 1;
        overlay.querySelector('#rdrActual').textContent = vista === 'spread' && fin > i + 1 ? (i + 1) + '–' + fin : String(i + 1);
        overlay.querySelector('#rdrFill').style.width = (fin / total * 100) + '%';
        btnPrev.disabled = i === 0; btnNext.disabled = fin >= total;
        btnVista.querySelector('span').textContent = vista === 'spread' ? 'Una página' : 'Libro abierto';
        persistir();
        // adelanta la siguiente página para que el giro se sienta inmediato
        const sig = i + (vista === 'spread' ? 2 : 1); if (sig < total && !cache.has(sig)) setTimeout(() => { if (!cerrado) doc.getPage(sig + 1).catch(() => {}); }, 400);
      }
      function ir(nuevo, sentido) {
        if (vista === 'spread') nuevo = Math.floor(nuevo / 2) * 2;
        nuevo = Math.max(0, Math.min(nuevo, total - 1));
        if (animando || nuevo === i) return;
        animando = true; libro.classList.add(sentido > 0 ? 'is-turn-next' : 'is-turn-prev');
        setTimeout(() => { i = nuevo; pintar(); libro.classList.remove('is-turn-next', 'is-turn-prev'); setTimeout(() => { animando = false; }, 210); }, 390);
      }
      const paso = () => vista === 'spread' ? 2 : 1;
      btnPrev.onclick = () => ir(i - paso(), -1); btnNext.onclick = () => ir(i + paso(), 1);
      hojas.forEach(h => { h.onclick = () => { const p = parseInt(h.dataset.page, 10); if (Number.isInteger(p) && vista === 'spread') { vista = 'single'; i = p; cache.clear(); pintar(); } }; });
      btnVista.onclick = () => { vista = vista === 'spread' ? 'single' : 'spread'; if (vista === 'spread') i = Math.floor(i / 2) * 2; cache.clear(); pintar(); };
      teclado = e => { if (e.key === 'Escape') cerrar(); else if (e.key === 'ArrowRight') ir(i + paso(), 1); else if (e.key === 'ArrowLeft') ir(i - paso(), -1); };
      document.addEventListener('keydown', teclado);
      overlay.querySelector('#rdrBack').onclick = cerrar; overlay.querySelector('#rdrCerrar').onclick = cerrar;
      overlay.querySelector('#rdrProg').onclick = e => { const r = e.currentTarget.getBoundingClientRect(), d = Math.round(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * (total - 1)); ir(d, d > i ? 1 : -1); };
      overlay.querySelector('#rdrIr').onclick = () => { const v = parseInt(prompt('Ir a la página (1-' + total + '):', String(i + 1)), 10); if (Number.isInteger(v) && v >= 1 && v <= total) ir(v - 1, v - 1 > i ? 1 : -1); };
      let ancho = window.innerWidth; window.addEventListener('resize', function r() { if (cerrado) { window.removeEventListener('resize', r); return; } if (Math.abs(window.innerWidth - ancho) > 40) { ancho = window.innerWidth; cache.clear(); pintar(); } });
      pintar();
    } catch (e) {
      if (cerrado) return;
      overlay.innerHTML = '<div class="rdr-escenario"><div style="text-align:center;color:#1E2528;max-width:420px"><p style="font-weight:800;margin:0 0 8px">No se pudo abrir el libro</p><p style="margin:0 0 16px;font-size:.9rem">' + esc((e && e.message) || 'Intenta de nuevo en un momento.') + '</p><button type="button" class="rdr-view" id="rdrCerrar2" style="background:#64788D">Cerrar</button></div></div>';
      overlay.querySelector('#rdrCerrar2').onclick = cerrar;
    }
  }
  window.ftLector = { abrir };
})();
