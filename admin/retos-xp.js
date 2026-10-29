/* Panel FisioTeck — Retos y XP (como Alintec y Zoorigen): quién practica, cuánta XP tiene, en qué nivel va y cuántos retos de cada tipo ha superado.
   Los datos los arma el servidor (GET /api/admin/retos-xp) con la misma XP que ve el miembro; aquí solo se muestran.
   Depende de index.html: apiAdmin, toast, esc, iniciales, descargarCSV, showSection. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const e = v => (typeof esc === 'function' ? esc(v) : String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])));
  const num = n => Number(n || 0).toLocaleString('es-MX');
  const NIVELES = ['Estudiante', 'Profesional', 'Especialista', 'Experto', 'Maestro FisioTeck'];
  let D = null, texto = '', nivel = 'todos', solo = 'todos';

  function montar() {
    if ($('sec-retosxp')) return;
    const nav = document.querySelector('.admin-nav-item[data-section="referrals"]') || document.querySelector('.admin-nav-item[data-section="credits"]');
    const ref = $('sec-referrals') || $('sec-credits');
    if (!nav || !ref) return;
    const item = document.createElement('div');
    item.className = 'admin-nav-item'; item.dataset.section = 'retosxp'; item.setAttribute('onclick', "showSection('retosxp')");
    item.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>Retos y XP';
    nav.insertAdjacentElement('afterend', item);
    const s = document.createElement('section');
    s.className = 'admin-section'; s.id = 'sec-retosxp';
    s.innerHTML = '<div class="admin-page-header"><div><div class="admin-page-title">Retos y XP</div><div class="admin-page-sub">Quién practica, su nivel y los retos que ha superado</div></div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><button type="button" class="btn btn-o" onclick="rxCargar(true)">Actualizar</button><button type="button" class="btn btn-o" onclick="rxCSV()">Descargar CSV</button></div></div>' +
      '<div id="rxEstado"></div><div class="ap-kpis" id="rxKpis"></div>' +
      '<div class="ap-cols"><div class="admin-card"><h3>Miembros por nivel</h3><div id="rxNiveles"></div></div><div class="admin-card"><h3>Retos superados por tipo</h3><div id="rxTipos"></div></div></div>' +
      '<div class="admin-card" style="overflow-x:auto"><h3>Miembros</h3><div class="ap-chips" id="rxChips"></div><div class="ap-toolbar"><input class="form-input" type="search" id="rxBuscar" placeholder="Buscar por nombre o correo" oninput="rxBuscar(this.value)"></div>' +
      '<table class="admin-table"><thead><tr><th>Miembro</th><th>Nivel</th><th>XP</th><th>Retos</th><th>Quiz · Orden · Detective · Historia</th><th>Racha</th><th>Adelanto</th><th>Última visita</th></tr></thead><tbody id="rxTabla"></tbody></table></div>';
    ref.insertAdjacentElement('afterend', s);
  }

  window.rxCargar = async function (aviso) {
    const est = $('rxEstado'); if (!est) return;
    est.innerHTML = '<div class="admin-card">Cargando…</div>';
    try { D = await apiAdmin('/api/admin/retos-xp'); est.innerHTML = ''; pintar(); if (aviso) toast('Datos actualizados'); }
    catch (err) { est.innerHTML = '<div class="admin-card" style="border-color:var(--danger);color:var(--danger)">No se pudieron leer los retos y la XP: ' + e(err.message) + '</div>'; }
  };
  window.rxBuscar = v => { texto = (v || '').toLowerCase().trim(); tabla(); };
  window.rxFiltro = (k, v) => { if (k === 'nivel') nivel = v; else solo = v; chips(); tabla(); };

  const kpi = (lbl, v, nota, c) => '<div class="ap-kpi" style="--k:' + c + '"><div class="lbl">' + lbl + '</div><div class="val">' + v + '</div><div class="note">' + nota + '</div></div>';
  const barras = (filas, total) => filas.map(f => '<div style="display:grid;grid-template-columns:130px 1fr 44px;gap:10px;align-items:center;margin:7px 0;font-size:.84rem"><span>' + e(f[0]) + '</span><span style="height:10px;border-radius:999px;background:var(--border-2);overflow:hidden"><i style="display:block;height:100%;width:' + (total ? Math.round(f[1] / total * 100) : 0) + '%;background:var(--accent);border-radius:999px"></i></span><b style="text-align:right">' + num(f[1]) + '</b></div>').join('');

  function pintar() {
    const r = D.resumen;
    $('rxKpis').innerHTML = kpi('Con XP', num(r.conXp), 'de ' + num(r.miembros) + ' cuentas', 'var(--accent)') + kpi('XP total', num(r.xpTotal), 'Promedio ' + num(r.xpPromedio) + ' por miembro con XP', 'var(--success)') +
      kpi('Retos superados', num(r.retosSuperados), 'Suma de todos los miembros', 'var(--blue)') + kpi('Cursos adelantados con retos', num(r.adelantosUsados), 'Premio usado una sola vez', 'var(--warning)');
    $('rxNiveles').innerHTML = barras(NIVELES.map(n => [n, r.porNivel[n] || 0]), r.miembros);
    const t = r.porTipo; $('rxTipos').innerHTML = barras([['Quiz relámpago', t.quiz], ['Detective clínico', t.detective], ['Ordena el proceso', t.orden], ['Modo historia', t.historia]], Math.max(1, t.quiz + t.detective + t.orden + t.historia));
    chips(); tabla();
  }
  function chips() {
    const ms = D ? D.miembros : [], c = k => ms.filter(m => m.nivel === k).length;
    $('rxChips').innerHTML = [['nivel', 'todos', 'Todos los niveles', ms.length]].concat(NIVELES.map(n => ['nivel', n, n, c(n)])).map(x => '<button type="button" class="ap-chip' + (nivel === x[1] ? ' on' : '') + '" onclick="rxFiltro(\'nivel\',\'' + e(x[1]) + '\')">' + e(x[2]) + ' (' + x[3] + ')</button>').join('') +
      [['solo', 'activos', 'Solo con retos'], ['solo', 'adelanto', 'Usaron el adelanto']].map(x => '<button type="button" class="ap-chip' + (solo === x[1] ? ' on' : '') + '" onclick="rxFiltro(\'solo\',\'' + (solo === x[1] ? 'todos' : x[1]) + '\')">' + x[2] + '</button>').join('');
  }
  function filas() {
    return (D ? D.miembros : []).filter(m => (nivel === 'todos' || m.nivel === nivel) && (solo === 'todos' || (solo === 'activos' ? m.retos > 0 : !!m.adelanto)) && (!texto || ((m.name || '') + ' ' + (m.email || '')).toLowerCase().includes(texto)));
  }
  function tabla() {
    const l = filas().slice(0, 300);
    $('rxTabla').innerHTML = l.map(m => '<tr><td><strong>' + e(m.name || '—') + '</strong><br><span style="font-size:.78rem;color:var(--text-muted)">' + e(m.email || '') + '</span></td><td><span class="badge badge-success">' + e(m.nivel) + '</span></td><td><strong>' + num(m.xp) + '</strong></td><td>' + num(m.retos) + '</td>' +
      '<td>' + [m.porTipo.quiz, m.porTipo.orden, m.porTipo.detective, m.porTipo.historia].join(' · ') + '</td><td>' + (m.racha ? m.racha + ' d' : '—') + '</td><td>' + (m.adelanto ? 'Curso ' + e(m.adelanto) : '—') + '</td><td>' + e(m.ultimaVisita || '—') + '</td></tr>').join('') ||
      '<tr><td colspan="8" style="text-align:center;padding:26px;color:var(--text-muted)">Nadie coincide con esos filtros</td></tr>';
  }
  window.rxCSV = function () {
    if (!D) { toast('Primero carga los datos'); return; }
    descargarCSV('retos-xp-fisioteck.csv', [['Nombre', 'Correo', 'Nivel', 'XP', 'Retos', 'Quiz', 'Orden', 'Detective', 'Historia', 'Racha', 'Curso adelantado', 'Última visita']].concat(filas().map(m => [m.name, m.email, m.nivel, m.xp, m.retos, m.porTipo.quiz, m.porTipo.orden, m.porTipo.detective, m.porTipo.historia, m.racha, m.adelanto, m.ultimaVisita])));
  };

  const showOriginal = window.showSection;
  window.showSection = function (sec) { showOriginal.apply(this, arguments); if (sec === 'retosxp') rxCargar(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();
})();
