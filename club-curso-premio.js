/* Club FisioTeck — Tarjeta de regalo al terminar un curso (como Alintec): «+N XP por tu curso número X», la ruta de premios de 10 casillas
   (la última vale 180 XP), cuánto vale el siguiente curso y la barra de tu nivel. El XP lo calcula el servidor (services/logros.js);
   aquí solo se muestra. Uso: ftCursoPremio.mostrar({ xp, ordinal }, curso). Depende de index.html: getLevel, LEVELS, achievementData, showPage; de club-logros.js (ftLogros). */
(function () {
  'use strict';
  const RECOMPENSA = [20, 30, 40, 50, 60, 70, 80, 90, 100, 180];
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const REGALO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8C9.5 8 8 7 8 5.5S9.5 3 12 8zM12 8c2.5 0 4-1 4-2.5S14.5 3 12 8z"/></svg>';
  const ESTRELLA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z"/></svg>';

  const st = document.createElement('style');
  st.textContent = `
  #ftCursoPremioOv .fxp-caja { max-width:430px; }
  #ftCursoPremioOv .fcp-curso { margin:0; font-size:.82rem; color:var(--text-muted); }
  #ftCursoPremioOv .fcp-sig { margin:0; font-size:.8rem; color:var(--text-muted); }
  #ftCursoPremioOv .fcp-bot { display:grid; gap:10px; width:100%; margin-top:6px; }
  #ftCursoPremioOv .fcp-sec { padding:12px 16px; border-radius:14px; border:1.5px solid var(--border-2); background:var(--surface); color:var(--text); font:inherit; font-weight:700; font-size:.9rem; cursor:pointer; }
  #ftCursoPremioOv .fxp-ruta i.hecha { background:var(--accent); opacity:.55; }`;
  document.head.appendChild(st);

  function mostrar(bono, curso) {
    return new Promise(resolve => {
      document.querySelectorAll('#ftCursoPremioOv').forEach(o => o.remove());
      const xpGan = Number(bono && bono.xp) || 0, n = Number(bono && bono.ordinal) || 1, pos = (n - 1) % 10, sig = RECOMPENSA[n % 10];
      const o = document.createElement('div'); o.id = 'ftCursoPremioOv'; o.className = 'fxp-ov'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true'); o.setAttribute('aria-label', 'Premio por tu curso');
      const casillas = Array.from({ length: 10 }, (_, i) => '<i class="' + (i < pos ? 'hecha' : i === pos ? 'on' : i === 9 ? 'premio' : '') + '" title="Curso ' + (i + 1) + ': +' + RECOMPENSA[i] + ' XP">' + (i === 9 ? ESTRELLA : '') + '</i>').join('');
      o.innerHTML = '<div class="fxp-caja"><div class="fxp-regalo">' + REGALO + '</div><small>Premio por terminar un curso</small><div class="fxp-num">+' + xpGan + ' XP</div>' +
        '<p>¡Terminaste tu curso número ' + n + '!' + (curso && curso.title ? ' <b>' + esc(curso.title) + '</b>' : '') + '</p>' +
        '<div class="fxp-ruta" aria-hidden="true">' + casillas + '</div><span class="fxp-ruta-t">Tu ruta de premios · la casilla 10 vale ' + RECOMPENSA[9] + ' XP</span>' +
        '<div class="fxp-nivel"><div class="fxp-nivel-f"><b id="fcpNivel">Tu nivel</b><span id="fcpXp"></span></div><div class="fxp-barra"><i style="width:0"></i></div></div>' +
        '<p class="fcp-sig">El siguiente curso que termines te regala <b>+' + sig + ' XP</b>.</p>' +
        '<div class="fcp-bot"><button type="button" class="fxp-ok" id="fcpCert">Ver mi certificado</button><button type="button" class="fcp-sec" id="fcpSeguir">Seguir aprendiendo</button></div></div>';
      document.body.appendChild(o);
      const cerrar = ir => { document.removeEventListener('keydown', tecla, true); o.remove(); if (ir) { try { showPage('certificates'); } catch (_) { /* sin página */ } } resolve(); };
      const tecla = e => { if (e.key === 'Escape') { e.preventDefault(); cerrar(false); } };
      document.addEventListener('keydown', tecla, true);
      o.querySelector('#fcpCert').onclick = () => cerrar(true); o.querySelector('#fcpSeguir').onclick = () => cerrar(false);
      // El nivel se pinta con el XP real que acaba de calcular el servidor
      (async () => {
        try { if (window.ftLogros) await ftLogros.actualizar('/api/logros'); } catch (_) { /* se queda con lo último */ }
        const xp = Number((window.achievementData || {}).xp) || 0;
        const niveles = typeof LEVELS !== 'undefined' ? LEVELS : [], nivel = typeof getLevel === 'function' ? getLevel(xp) : null, siguiente = nivel ? niveles[niveles.indexOf(nivel) + 1] : null;
        const pct = nivel && siguiente ? Math.min(100, Math.round((xp - nivel.min) / (siguiente.min - nivel.min) * 100)) : 100;
        const a = o.querySelector('#fcpNivel'), b = o.querySelector('#fcpXp'), barra = o.querySelector('.fxp-barra i');
        if (a) a.textContent = nivel ? nivel.name : 'Tu nivel'; if (b) b.textContent = xp + ' XP' + (siguiente ? ' · faltan ' + (siguiente.min - xp) + ' para ' + siguiente.name : ' · nivel máximo');
        setTimeout(() => { if (barra) barra.style.width = pct + '%'; }, 250);
      })();
    });
  }
  window.ftCursoPremio = { mostrar };
})();
