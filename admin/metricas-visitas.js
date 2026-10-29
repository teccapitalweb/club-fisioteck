/* Panel FisioTeck — Métricas de visitas. Misma estructura y gráficas que las Métricas de Alintec Food (Chart.js), con los colores de FisioTeck.
   Datos: GET /api/admin/metricas?dias=N y GET /api/admin/visitas?periodo=hoy|ayer|7|30. Depende de index.html: firebase, ADMIN_API y de Chart.js. */
(function () {
  'use strict';
  const Pages = {
    _mxCharts: [],
    _getAuthToken: async () => firebase.auth().currentUser.getIdToken(),
    _webhookUrl: (typeof ADMIN_API !== 'undefined' ? ADMIN_API : '')
  };
  function metricas(p) {
    const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
    const num = n => (Number(n) || 0).toLocaleString('es-MX');
    const DIAS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const NOMBRE_PAGINA = { landing: 'Portada', acceso: 'Acceso al Club (login)', club: 'Dentro del Club', legal: 'Páginas legales', verificar: 'Verificar certificado' };
    const NOMBRE_FUENTE = { directo: 'Directo', interno: 'Dentro del sitio', google: 'Google', bing: 'Bing', duckduckgo: 'DuckDuckGo', yahoo: 'Yahoo', facebook: 'Facebook', instagram: 'Instagram', meta: 'Meta sin identificar', whatsapp: 'WhatsApp', linkedin: 'LinkedIn', x: 'X (Twitter)', youtube: 'YouTube', tiktok: 'TikTok', correo: 'Correo electrónico', otros: 'Otros sitios' };
    const COLOR_FUENTE = { directo: '#94A3B8', interno: '#CBD5E1', google: '#4285F4', bing: '#00809D', duckduckgo: '#DE5833', yahoo: '#7E1FFF', facebook: '#1877F2', instagram: '#E1306C', meta: '#C4B5FD', whatsapp: '#25D366', linkedin: '#0A66C2', x: '#64748B', youtube: '#FF0000', tiktok: '#14B8A6', correo: '#F59E0B', otros: '#A8A29E' };
    const NOMBRE_DISP = { movil: 'Teléfono', tablet: 'Tableta', computadora: 'Computadora' };
    const COLOR_DISP = { movil: '#0D5FA0', tablet: '#F7941D', computadora: '#159E92' };
    const VERDE = '#0D5FA0', VERDE_OSC = '#0A4A80', AZUL = '#159E92';
    const RANGOS = [['semana', 'Semana'], ['30', '30 días'], ['90', '90 días'], ['365', '12 meses'], ['todo', 'Todo']];
    const nombresPaises = (() => { try { return new Intl.DisplayNames(['es'], { type: 'region' }); } catch (e) { return { of: c => c }; } })();
    const nombrePais = c => (c === 'ZZ' ? 'No identificado' : (nombresPaises.of(c) || c));

    // Gráficas anteriores de esta pantalla (si se vuelve a entrar) se destruyen para no acumularlas
    (Pages._mxCharts || []).forEach(c => { try { c.destroy(); } catch (e) {} });
    Pages._mxCharts = [];

    if (!document.getElementById('mx2-estilos')) {
      const st = document.createElement('style');
      st.id = 'mx2-estilos';
      st.textContent = `
.mx2{--mx-g:#0D5FA0;--mx-line:var(--border);max-width:1240px}
.mx2 *{box-sizing:border-box}
.mx2-hero{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:20px}
.mx2-hero h1{margin:0;font:800 30px/1.1 'Plus Jakarta Sans','Inter',sans-serif;letter-spacing:-.8px}
.mx2-hero p{margin:8px 0 0;max-width:640px;font-size:13.5px;line-height:1.6;color:var(--text-2)}
.mx2-eyebrow{display:block;margin-bottom:8px;font:700 10.5px 'JetBrains Mono',monospace;letter-spacing:1.6px;text-transform:uppercase;color:var(--primary)}
.mx2-estado{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border:1px solid var(--border);border-radius:999px;background:var(--surface);font:600 12px Inter,sans-serif;color:var(--text-2)}
.mx2-estado i{width:9px;height:9px;border-radius:50%;background:#94A3B8}
.mx2-estado.ok i{background:#22C55E;box-shadow:0 0 0 4px rgba(34,197,94,.18)}
.mx2-estado.error i{background:#EF4444;box-shadow:0 0 0 4px rgba(239,68,68,.16)}
.mx2-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:18px;padding:10px;border:1px solid var(--border);border-radius:18px;background:var(--surface)}
.mx2-seg{display:flex;gap:4px;padding:4px;border-radius:13px;background:var(--surface-2);flex-wrap:wrap}
.mx2-seg button{border:0;background:transparent;color:var(--text-2);padding:8px 15px;border-radius:10px;font:700 12.5px Inter,sans-serif;cursor:pointer;transition:.18s}
.mx2-seg button:hover{color:var(--text)}
.mx2-seg button.on{background:var(--surface);color:var(--primary);box-shadow:0 2px 8px rgba(0,0,0,.09)}
.mx2-semnav{display:flex;align-items:center;gap:8px}
.mx2-semnav button{width:34px;height:34px;border:1px solid var(--border);border-radius:10px;background:var(--surface);color:var(--text);font-size:17px;font-weight:700;cursor:pointer}
.mx2-semnav button:hover:not(:disabled){border-color:var(--primary);color:var(--primary)}
.mx2-semnav button:disabled{opacity:.35;cursor:default}
.mx2-semnav span{min-width:150px;text-align:center;font:700 13px 'Plus Jakarta Sans',Inter,sans-serif}
.mx2-semnav small{display:block;font:600 10px 'JetBrains Mono',monospace;color:var(--text-3);letter-spacing:.6px}
.mx2-btn{display:inline-flex;align-items:center;gap:7px;border:1px solid var(--border);background:var(--surface);color:var(--text);padding:9px 14px;border-radius:11px;font:700 12.5px Inter,sans-serif;cursor:pointer}
.mx2-btn:hover{border-color:var(--primary);color:var(--primary)}
.mx2-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:14px;margin-bottom:16px}
.mx2-kpi{position:relative;overflow:hidden;padding:18px 20px 14px;border:1px solid var(--border);border-radius:20px;background:var(--surface)}
.mx2-kpi::before{content:'';position:absolute;inset:0 auto 0 0;width:4px;background:var(--c)}
.mx2-kpi__l{font:700 10.5px 'JetBrains Mono',monospace;letter-spacing:1.2px;text-transform:uppercase;color:var(--text-3)}
.mx2-kpi__v{margin-top:8px;font:800 34px/1 'Plus Jakarta Sans',sans-serif;letter-spacing:-1px}
.mx2-kpi__s{margin-top:6px;font-size:12px;color:var(--text-3)}
.mx2-kpi svg{display:block;width:100%;height:34px;margin-top:10px}
.mx2-d{display:inline-flex;align-items:center;gap:4px;margin-top:8px;padding:2px 9px;border-radius:999px;font:700 11px 'JetBrains Mono',monospace}
.mx2-d.up{background:rgba(16,185,129,.14);color:#0E9F6E}.mx2-d.down{background:rgba(239,68,68,.13);color:#DC2626}.mx2-d.eq{background:var(--surface-2);color:var(--text-3)}
.mx2-grid{display:grid;gap:16px;margin-bottom:16px}
.mx2-g2{grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))}
.mx2-g3{grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))}
.mx2-card{min-width:0;padding:20px 22px;border:1px solid var(--border);border-radius:22px;background:var(--surface)}
.mx2-card h3{margin:0;font:700 16px 'Plus Jakarta Sans',Inter,sans-serif;letter-spacing:-.3px}
.mx2-sub{margin:5px 0 14px;font-size:12.5px;line-height:1.55;color:var(--text-3)}
.mx2-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap}
.mx2-leg{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--text-2)}
.mx2-leg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:-1px}
.mx2-cv{position:relative;width:100%}
.mx2-hero-card{border-color:color-mix(in srgb,var(--primary) 35%,var(--border));background:linear-gradient(150deg,color-mix(in srgb,var(--primary) 7%,var(--surface)),var(--surface) 60%)}
.mx2-top{display:flex;align-items:center;gap:14px;margin:4px 0 16px;padding:14px 16px;border-radius:16px;background:var(--surface);border:1px solid var(--border)}
.mx2-top b{display:grid;place-items:center;width:46px;height:46px;border-radius:14px;flex:none;color:#fff;font:800 18px Inter,sans-serif}
.mx2-top div{font-size:13px;line-height:1.5;color:var(--text-2)}
.mx2-top strong{color:var(--text);font-size:15px}
.mx2-tbl{width:100%;border-collapse:collapse;font-size:13px;margin-top:14px}
.mx2-tbl th{padding:6px 8px;text-align:right;font:700 10px 'JetBrains Mono',monospace;letter-spacing:1px;text-transform:uppercase;color:var(--text-3);border-bottom:1px solid var(--border)}
.mx2-tbl th:first-child,.mx2-tbl td:first-child{text-align:left}
.mx2-tbl td{padding:9px 8px;text-align:right;border-bottom:1px solid var(--border);font-variant-numeric:tabular-nums}
.mx2-tbl tr:last-child td{border-bottom:0}
.mx2-dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:9px;vertical-align:-1px}
.mx2-pill{display:inline-block;padding:2px 8px;border-radius:999px;background:color-mix(in srgb,var(--primary) 14%,transparent);color:var(--primary);font:700 11px 'JetBrains Mono',monospace}
.mx2-heat{display:grid;grid-template-columns:36px repeat(24,minmax(0,1fr));gap:3px;align-items:center}
.mx2-heat span{font:600 10px 'JetBrains Mono',monospace;color:var(--text-3)}
.mx2-heat i{display:block;aspect-ratio:1/1;border-radius:4px;background:var(--surface-2)}
.mx2-hl{display:grid;grid-template-columns:36px repeat(24,minmax(0,1fr));gap:3px;margin-top:8px;font:600 10px 'JetBrains Mono',monospace;color:var(--text-3)}
.mx2-hl span{white-space:nowrap;overflow:visible}
.mx2-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:5px 12px;align-items:center;margin-bottom:12px}
.mx2-row__t{font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mx2-row__n{font:700 12px 'JetBrains Mono',monospace;color:var(--text-2)}
.mx2-row__b{grid-column:1/-1;height:8px;border-radius:999px;background:var(--surface-2);overflow:hidden}
.mx2-row__b i{display:block;height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,#0D5FA0,#4CA6DE);transition:width .8s cubic-bezier(.2,.8,.25,1)}
.mx2-q{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--border)}
.mx2-q:last-child{border-bottom:0}
.mx2-q__av{width:40px;height:40px;border-radius:12px;flex:none;display:grid;place-items:center;color:#fff;font:800 13px Inter,sans-serif;background:linear-gradient(135deg,#0D5FA0,#0A4A80)}
.mx2-q__m{flex:1;min-width:0}
.mx2-q__n{font-weight:700;font-size:13.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mx2-q__e{font-size:11.5px;color:var(--text-3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mx2-q__tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
.mx2-q__tag{padding:1px 8px;border-radius:999px;font:700 10px 'JetBrains Mono',monospace;background:var(--surface-2);color:var(--text-2)}
.mx2-q__tag.vip{background:rgba(247,148,29,.16);color:#C26A00}
.mx2-q__u{text-align:right;font:600 11px 'JetBrains Mono',monospace;color:var(--text-3);min-width:96px}
.mx2-rec{display:grid;grid-template-columns:70px minmax(0,1.2fr) minmax(0,1fr) minmax(0,1fr) minmax(0,.9fr);gap:6px 12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);font-size:13px}
.mx2-rec:last-child{border-bottom:0}
.mx2-rec__t{font:600 11px 'JetBrains Mono',monospace;color:var(--text-3)}
.mx2-rec__o{display:inline-flex;align-items:center;gap:7px;font-weight:700;min-width:0}
.mx2-rec__o i{width:9px;height:9px;border-radius:50%;flex:none}
.mx2-rec small{color:var(--text-3);font-size:11px;font-weight:600}
.mx2-nuevo{display:inline-block;padding:1px 7px;border-radius:999px;background:color-mix(in srgb,var(--primary) 14%,transparent);color:var(--primary);font:700 10px 'JetBrains Mono',monospace}
@media(max-width:700px){.mx2-rec{grid-template-columns:62px minmax(0,1fr) minmax(0,1fr)}.mx2-rec>:nth-child(n+4){grid-column:2/-1}}
.mx2-seg2{display:flex;gap:4px;padding:4px;border-radius:13px;background:var(--surface-2);flex-wrap:wrap}
.mx2-seg2 button{border:0;background:transparent;color:var(--text-2);padding:7px 13px;border-radius:10px;font:700 12.5px Inter,sans-serif;cursor:pointer;transition:.18s}
.mx2-seg2 button:hover{color:var(--text)}
.mx2-seg2 button.on{background:var(--surface);color:var(--primary);box-shadow:0 2px 8px rgba(0,0,0,.09)}
.mx2-per__k{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:14px}
.mx2-per__k div{padding:12px 14px;border-radius:14px;background:var(--surface-2);min-width:0}
.mx2-per__k b{display:block;font:800 22px/1.1 'Plus Jakarta Sans',sans-serif;letter-spacing:-.5px;overflow-wrap:anywhere}
.mx2-per__k span{display:block;margin-top:3px;font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:.6px;text-transform:uppercase;color:var(--text-3)}
.mx2-mb{display:flex;align-items:flex-end;gap:4px;height:92px;margin-bottom:12px}
.mx2-mb div{flex:1 1 0;min-width:0;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:stretch;gap:4px}
.mx2-mb i{display:block;width:100%;border-radius:5px 5px 2px 2px;background:linear-gradient(180deg,#4CA6DE,#0A4A80)}
.mx2-mb span{font:600 9.5px 'JetBrains Mono',monospace;color:var(--text-3);text-align:center;height:11px;white-space:nowrap;overflow:visible}
.mx2-chips{display:flex;flex-wrap:wrap;gap:8px}
.mx2-chip{display:inline-flex;align-items:center;gap:7px;padding:5px 11px;border-radius:999px;background:var(--surface-2);font-size:12.5px;font-weight:600}
.mx2-chip i{width:9px;height:9px;border-radius:50%;flex:none}
.mx2-chip b{font:800 12px 'JetBrains Mono',monospace;color:var(--text-2)}
.mx2-det{margin-top:16px;border-top:1px solid var(--border);padding-top:12px}
.mx2-det summary{display:flex;align-items:center;gap:10px;cursor:pointer;font:700 13px Inter,sans-serif;color:var(--text-2);list-style:none}
.mx2-det summary::-webkit-details-marker{display:none}
.mx2-det summary::before{content:'▸';font-size:12px;transition:transform .2s}
.mx2-det[open] summary::before{transform:rotate(90deg)}
.mx2-det__top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:10px}
.mx2-det__top .mx2-sub{margin:0;flex:1 1 260px}
.mx2-det__lista{max-height:300px;overflow-y:auto;margin-top:8px;padding-right:4px}
.mx2-r2{display:grid;grid-template-columns:130px minmax(0,1fr) minmax(0,1.3fr);gap:2px 12px;align-items:center;padding:9px 0;border-bottom:1px solid var(--border);font-size:12.5px}
.mx2-r2:last-child{border-bottom:0}
.mx2-r2__m{color:var(--text-2)}
.mx2-r2__p{grid-column:2/-1;font-size:11px;color:var(--text-3);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@media(max-width:700px){.mx2-per__k{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}.mx2-per__k b{font-size:17px}.mx2-r2{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.mx2-r2__m,.mx2-r2__p{grid-column:1/-1}}
.mx2-trio{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr));gap:18px;margin-bottom:6px}
.mx2-mini h4{margin:0 0 8px;font:700 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;text-transform:uppercase;color:var(--text-3)}
.mx2-mr{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:3px 8px;align-items:center;margin-bottom:9px;font-size:13px}
.mx2-mr__t{display:flex;align-items:center;gap:8px;min-width:0;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mx2-mr__t i{width:9px;height:9px;border-radius:50%;flex:none}
.mx2-mr b{font:700 12px 'JetBrains Mono',monospace;color:var(--text-2)}
.mx2-mr__b{grid-column:1/-1;height:5px;border-radius:99px;background:var(--surface-2);overflow:hidden}
.mx2-mr__b u{display:block;height:100%;border-radius:99px;text-decoration:none}
.mx2-mr__v{font-size:12.5px;color:var(--text-3)}
.mx2-det__top h4{margin:0;font:700 14px 'Plus Jakarta Sans',Inter,sans-serif}
.mx2-det__top{display:flex;align-items:center;gap:10px}
.mx2-det__lista .mx2-r2:nth-child(n+6){display:none}
.mx2-det__lista{max-height:none;overflow:visible;margin-top:8px;padding-right:0}
.mx2-det__lista.abierta{max-height:340px;overflow-y:auto;padding-right:4px}
.mx2-det__lista.abierta .mx2-r2:nth-child(n+6){display:grid}
.mx2-mas{margin-top:10px;width:100%;border:1px dashed var(--border);background:transparent;color:var(--primary);border-radius:12px;padding:9px;font:700 12.5px Inter,sans-serif;cursor:pointer}
.mx2-mas:hover{background:color-mix(in srgb,var(--primary) 8%,transparent)}
.mx2-r2__m strong{color:var(--text)}
.mx2-log{max-height:430px;overflow-y:auto;padding-right:4px}
.mx2-log .mx2-r2:first-child{padding-top:2px}
.mx2-log__pie{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:12px;padding-top:12px;border-top:1px solid var(--border);font-size:11.5px;color:var(--text-3)}
@media(max-width:700px){.mx2-trio{gap:12px;margin-bottom:0}.mx2-mr{margin-bottom:6px}.mx2-mr__b{display:none}.mx2-mini .mx2-mr:nth-child(n+5){display:none}.mx2-mini h4{margin-bottom:5px}}
.mx2-empty{padding:34px 16px;text-align:center;color:var(--text-3);font-size:13px;line-height:1.6}
.mx2-empty b{display:block;margin-bottom:4px;font:700 15px 'Plus Jakarta Sans',sans-serif;color:var(--text)}
.mx2-big{padding:56px 20px}
@media(max-width:480px){.mx2-tbl th,.mx2-tbl td{padding:8px 3px;font-size:12px}.mx2-tbl th{font-size:9px;letter-spacing:.4px}.mx2-heat{grid-template-columns:30px repeat(24,minmax(0,1fr));gap:2px}.mx2-hl{grid-template-columns:30px repeat(24,minmax(0,1fr));gap:2px}}
@media(max-width:700px){.mx2-hero h1{font-size:25px}.mx2-q{flex-wrap:wrap}.mx2-q__u{min-width:0;width:100%;text-align:left;padding-left:52px}.mx2-card{padding:18px 16px}.mx2-bar{padding:8px}.mx2-seg button{padding:7px 11px}}
`;
      document.head.appendChild(st);
    }

    p.innerHTML = `<div class="mx2 fade-up"><div id="mx2-raiz"><div class="mx2-empty"><b>Cargando métricas…</b>Un momento.</div></div></div>`;
    const raiz = p.querySelector('#mx2-raiz');

    // ── Utilidades de fechas (claves AAAA-MM-DD en hora de México) ──
    const sumarDias = (clave, n) => { const [a, m, d] = clave.split('-').map(Number); return new Date(Date.UTC(a, m - 1, d + n)).toISOString().slice(0, 10); };
    const dow = clave => { const [a, m, d] = clave.split('-').map(Number); return (new Date(Date.UTC(a, m - 1, d)).getUTCDay() + 6) % 7; };
    const lunesDe = clave => sumarDias(clave, -dow(clave));
    const corta = clave => { const [, m, d] = clave.split('-').map(Number); return d + ' ' + MESES[m - 1]; };
    const mesDe = clave => { const [a, m] = clave.split('-').map(Number); return MESES[m - 1] + ' ' + String(a).slice(2); };
    const lista = (desde, hasta) => { const r = []; for (let c = desde; c <= hasta; c = sumarDias(c, 1)) r.push(c); return r; };

    // Al recargar la página directamente en esta sección, Firebase tarda un instante en confirmar la sesión
    const esperarSesion = async () => {
      for (let i = 0; i < 60; i++) {
        if (firebase.auth().currentUser) return;
        await new Promise(r => setTimeout(r, 250));
      }
    };
    const cargar = async dias => {
      await esperarSesion();
      const token = await Pages._getAuthToken();
      const r = await fetch(Pages._webhookUrl + '/api/admin/metricas?dias=' + dias, { headers: { 'Authorization': 'Bearer ' + token } });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || 'No se pudieron cargar las métricas');
      return d;
    };

    const pintar = datos => {
      const estado = { rango: 'semana', semana: 0 };
      let diasCargados = datos.dias.length;
      const hoy = datos.hoy;
      const cero = clave => ({ dia: clave, total: 0, unicos: 0, miembros: 0, dispositivos: {}, paginas: {}, fuentes: {}, paises: {}, horas: {} });
      let porDia = {};
      const indexar = () => { porDia = {}; datos.dias.forEach(d => { porDia[d.dia] = d; }); };
      indexar();
      const dato = clave => porDia[clave] || cero(clave);
      const origenes = () => (datos.origenes || []).map(o => ({ ...o, dia: o.creada ? String(o.creada).slice(0, 10) : null }));
      // 'creada' viene en UTC; el día que importa es el de México
      const diaMx = iso => { try { return new Intl.DateTimeFormat('en-CA', { timeZone: datos.zona, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(iso)); } catch (e) { return String(iso).slice(0, 10); } };
      const cuentas = () => (datos.origenes || []).map(o => ({ ...o, dia: o.creada ? diaMx(o.creada) : null })).filter(o => o.dia);

      // ── Rango activo: periodo actual y el anterior (para comparar) ──
      const rangoActual = () => {
        const primerDia = datos.dias[0].dia;
        if (estado.rango === 'semana') {
          const lunes = sumarDias(lunesDe(hoy), -7 * estado.semana);
          const hasta = sumarDias(lunes, 6);
          const parcial = hasta > hoy;
          const finVisto = parcial ? hoy : hasta;
          const largo = lista(lunes, finVisto).length;
          const pLunes = sumarDias(lunes, -7);
          return { desde: lunes, hasta: finVisto, completo: hasta, prev: lista(pLunes, sumarDias(pLunes, largo - 1)), parcial, titulo: corta(lunes) + ' – ' + corta(hasta) };
        }
        if (estado.rango === 'todo') {
          const con = datos.dias.find(d => d.total > 0);
          const desde = con ? con.dia : sumarDias(hoy, -29);
          return { desde, hasta: hoy, prev: [], titulo: 'Todo el historial' };
        }
        const n = Number(estado.rango);
        const desde = sumarDias(hoy, -(n - 1));
        const pDesde = sumarDias(desde, -n);
        return { desde: desde < primerDia && n > diasCargados ? primerDia : desde, hasta: hoy, prev: lista(pDesde, sumarDias(desde, -1)), titulo: 'Últimos ' + (n === 365 ? '12 meses' : n + ' días') };
      };

      const suma = (claves, campo) => claves.reduce((t, c) => t + (dato(c)[campo] || 0), 0);
      const sumaMapa = (claves, campo) => { const o = {}; claves.forEach(c => Object.entries(dato(c)[campo] || {}).forEach(([k, v]) => { o[k] = (o[k] || 0) + v; })); return o; };
      const delta = (ahora, antes, hayPrev) => {
        if (!hayPrev) return '';
        if (!antes && !ahora) return '<span class="mx2-d eq">— sin cambio</span>';
        if (!antes) return '<span class="mx2-d up">▲ nuevo</span>';
        const pct = Math.round((ahora - antes) / antes * 100);
        if (pct === 0) return '<span class="mx2-d eq">= igual que antes</span>';
        return '<span class="mx2-d ' + (pct > 0 ? 'up">▲ +' : 'down">▼ ') + Math.abs(pct) + '% vs periodo anterior</span>';
      };
      const spark = (vals, color) => {
        const max = Math.max(1, ...vals), w = 200, h = 34;
        if (vals.length < 2) return '';
        const pts = vals.map((v, i) => [i / (vals.length - 1) * w, h - 3 - v / max * (h - 8)]);
        const d = pts.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' ');
        const id = 'sp' + Math.random().toString(36).slice(2, 7);
        return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".35"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs><path d="${d} L${w} ${h} L0 ${h} Z" fill="url(#${id})"/><path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>`;
      };
      const filas = (obj, nombres, color) => {
        const orden = Object.entries(obj).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
        const max = Math.max(1, ...orden.map(o => o[1]));
        return orden.length ? orden.map(([k, v]) => `<div class="mx2-row"><span class="mx2-row__t">${esc(nombres[k] || k)}</span><span class="mx2-row__n">${num(v)}</span><div class="mx2-row__b"><i data-w="${Math.round(v / max * 100)}"${color ? ' style="background:' + color(k) + '"' : ''}></i></div></div>`).join('')
          : '<div class="mx2-empty">Sin datos en este periodo</div>';
      };

      // ── Estilo común de Chart.js ──
      const colorTexto = () => (getComputedStyle(document.body).getPropertyValue('--text-muted').trim() || '#6b7280');
      const colorLinea = () => (getComputedStyle(document.body).getPropertyValue('--border').trim() || 'rgba(0,0,0,.08)');
      const crear = (canvas, config) => {
        if (!canvas || typeof Chart === 'undefined') return null;
        Chart.defaults.font.family = "Inter, system-ui, sans-serif";
        Chart.defaults.font.size = 12;
        const c = new Chart(canvas, config);
        Pages._mxCharts.push(c);
        return c;
      };
      const tooltip = { backgroundColor: '#0B1F33', titleColor: '#fff', bodyColor: '#E3F0FB', padding: 12, cornerRadius: 12, boxPadding: 5, titleFont: { weight: '700', size: 13 }, bodyFont: { size: 12 } };
      const degradado = (color, alto) => ctx => {
        const area = ctx.chart.chartArea; if (!area) return color + '33';
        const g = ctx.chart.ctx.createLinearGradient(0, area.top, 0, area.bottom);
        g.addColorStop(0, color + '59'); g.addColorStop(1, color + '00'); return g;
      };
      const ejes = (extra) => ({
        x: { grid: { display: false }, border: { display: false }, ticks: { color: colorTexto(), maxRotation: 0, autoSkipPadding: 14 } },
        y: { beginAtZero: true, grid: { color: colorLinea(), drawTicks: false }, border: { display: false }, ticks: { color: colorTexto(), precision: 0, padding: 8 }, ...(extra || {}) }
      });

      const dibujar = () => {
        (Pages._mxCharts || []).forEach(c => { try { c.destroy(); } catch (e) {} });
        Pages._mxCharts = [];
        const R = rangoActual();
        const claves = lista(R.desde, R.hasta);
        const hayPrev = R.prev.length > 0 && suma(R.prev, 'total') + suma(R.prev, 'unicos') > 0;
        const total = suma(claves, 'total'), unicos = suma(claves, 'unicos');
        const totalPrev = suma(R.prev, 'total'), unicosPrev = suma(R.prev, 'unicos');
        const todasCuentas = cuentas();
        const enRango = lista0 => todasCuentas.filter(o => lista0.includes(o.dia));
        const nuevas = enRango(claves), nuevasPrev = enRango(R.prev);
        const vipNuevos = nuevas.filter(o => o.vip).length;
        const promedio = Math.round(total / Math.max(1, claves.length));
        const hayAlgo = datos.dias.some(d => d.total > 0) || (datos.miembros || []).length || todasCuentas.length;
        const est = datos.estado || null;
        const estadoHtml = est ? (est.errores > 0 && !est.ultimoOk ? `<span class="mx2-estado error" title="${esc((est.ultimoError && est.ultimoError.mensaje) || '')}"><i></i>El contador tuvo errores</span>`
          : est.ultimoOk ? `<span class="mx2-estado ok"><i></i>Contador activo · última visita ${esc(new Date(est.ultimoOk).toLocaleString('es-MX', { timeZone: datos.zona, day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }))}</span>`
          : '<span class="mx2-estado"><i></i>Contador activo · esperando la primera visita</span>') : '';

        const barra = `
          <div class="mx2-bar">
            <div class="mx2-seg" role="tablist">${RANGOS.map(([k, t]) => `<button type="button" role="tab" data-r="${k}" class="${estado.rango === k ? 'on' : ''}">${t}</button>`).join('')}</div>
            ${estado.rango === 'semana' ? `<div class="mx2-semnav"><button type="button" id="mx2-ant" aria-label="Semana anterior" ${estado.semana >= 51 ? 'disabled' : ''}>‹</button><span>${esc(R.titulo)}<small>${estado.semana === 0 ? 'ESTA SEMANA' : 'HACE ' + estado.semana + (estado.semana === 1 ? ' SEMANA' : ' SEMANAS')}</small></span><button type="button" id="mx2-sig" aria-label="Semana siguiente" ${estado.semana === 0 ? 'disabled' : ''}>›</button></div>` : `<span style="font:700 13px 'Plus Jakarta Sans',Inter,sans-serif">${esc(R.titulo)}</span>`}
            <button type="button" class="mx2-btn" id="mx2-csv"><svg class="ic" width="15" height="15"><use href="#i-download"/></svg>Descargar historial (CSV)</button>
          </div>`;

        const cab = `
          <div class="mx2-hero">
            <div><span class="mx2-eyebrow">Marketing</span><h1>Métricas de visitas</h1>
            <p>Cuánta gente visita FisioTeck, desde dónde llega y de qué red social salen tus miembros. Conteo anónimo y sin cookies; todo se guarda día a día para que consultes el historial.</p></div>
            ${estadoHtml}
          </div>`;

        if (!hayAlgo) {
          raiz.innerHTML = cab + `<div class="mx2-card"><div class="mx2-empty mx2-big"><b>Todavía no hay visitas registradas</b>El contador ya está encendido. En cuanto entre la primera persona al sitio verás aquí las gráficas, y el historial se irá guardando solo, día tras día.</div></div>`;
          return;
        }

        // ── Serie del gráfico principal ──
        let serie;
        if (estado.rango === 'semana') {
          const lunes = R.desde;
          serie = { tipo: 'barras', etiquetas: DIAS, visitas: DIAS.map((_, i) => { const c = sumarDias(lunes, i); return c > hoy ? null : dato(c).total; }), unicos: DIAS.map((_, i) => { const c = sumarDias(lunes, i); return c > hoy ? null : dato(c).unicos; }) };
        } else if (estado.rango === '30' || estado.rango === '90') {
          serie = { tipo: 'linea', etiquetas: claves.map(corta), visitas: claves.map(c => dato(c).total), unicos: claves.map(c => dato(c).unicos), previa: R.prev.map(c => dato(c).total) };
        } else {
          const meses = {};
          claves.forEach(c => { const k = c.slice(0, 7); meses[k] = meses[k] || { v: 0, u: 0 }; meses[k].v += dato(c).total; meses[k].u += dato(c).unicos; });
          const ks = Object.keys(meses).sort();
          serie = { tipo: 'barras', etiquetas: ks.map(k => mesDe(k + '-01')), visitas: ks.map(k => meses[k].v), unicos: ks.map(k => meses[k].u) };
        }

        // Los mismos grupos de la gráfica principal (días o meses), para repartir las redes sociales en el tiempo
        let grupos;
        if (estado.rango === 'semana') grupos = DIAS.map((_, i) => { const c = sumarDias(R.desde, i); return c > hoy ? [] : [c]; });
        else if (estado.rango === '30' || estado.rango === '90') grupos = claves.map(c => [c]);
        else { const m = {}; claves.forEach(c => { (m[c.slice(0, 7)] = m[c.slice(0, 7)] || []).push(c); }); grupos = Object.keys(m).sort().map(k => m[k]); }

        // ── Origen de los miembros ──
        const porOrigen = {};
        nuevas.forEach(o => { const k = o.origen || 'directo'; porOrigen[k] = porOrigen[k] || { n: 0, vip: 0 }; porOrigen[k].n += 1; if (o.vip) porOrigen[k].vip += 1; });
        const ordenOrigen = Object.entries(porOrigen).sort((a, b) => b[1].n - a[1].n);
        const ganador = ordenOrigen[0];
        const sinDato = Number(datos.sinOrigen) || 0;

        // ── Datos de apoyo ──
        const disp = sumaMapa(claves, 'dispositivos');
        const totDisp = Object.values(disp).reduce((a, b) => a + b, 0);
        const paises = sumaMapa(claves, 'paises');
        const totPaises = Object.values(paises).reduce((a, b) => a + b, 0);
        const topPaises = Object.entries(paises).sort((a, b) => b[1] - a[1]).slice(0, 8);
        const fueraMx = totPaises - (paises.MX || 0) - (paises.ZZ || 0);
        const fuentes = sumaMapa(claves, 'fuentes');
        const ordenFuentes = Object.entries(fuentes).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
        const totFuentes = ordenFuentes.reduce((a, [, v]) => a + v, 0);
        const REDES = ['facebook', 'instagram', 'meta', 'whatsapp', 'tiktok', 'youtube', 'linkedin', 'x'];
        // "Meta sin identificar" = llegaron desde un enlace de Facebook o Instagram pero el navegador no dice de cuál: va al final y no cuenta como "la más fuerte"
        const sociales = REDES.map(k => ({ k, total: fuentes[k] || 0 })).filter(x => x.total > 0)
          .sort((a, b) => (a.k === 'meta') - (b.k === 'meta') || b.total - a.total);
        const identificadas = sociales.filter(x => x.k !== 'meta');
        const metaSinIdentificar = fuentes.meta || 0;
        const totSociales = sociales.reduce((a, x) => a + x.total, 0);
        const serieRedes = sociales.slice(0, 5).map(x => ({ k: x.k, datos: grupos.map(g => g.reduce((t, c) => t + (((dato(c).fuentes || {})[x.k]) || 0), 0)) }));
        const redesVacio = '<div class="mx2-empty"><b>Todavía nadie ha llegado desde una red social</b>Aquí verás cuántas personas llegan desde cada una. Comparte tus enlaces con <code>?utm_source=facebook</code> o <code>?utm_source=instagram</code> para medirlo con exactitud.<div class="mx2-leg" style="justify-content:center;margin-top:14px">' + REDES.map(k => `<span><i style="background:${COLOR_FUENTE[k]};border-radius:50%"></i>${NOMBRE_FUENTE[k]} <b>0</b></span>`).join('') + '</div></div>';
        const pags = sumaMapa(claves, 'paginas');
        const porSemDia = DIAS.map((_, i) => { const l = claves.filter(c => dow(c) === i); return l.length ? l.reduce((s, c) => s + dato(c).total, 0) / l.length : 0; });
        const diaFuerte = porSemDia.indexOf(Math.max(...porSemDia));
        const mapa = DIAS.map(() => Array(24).fill(0));
        claves.forEach(c => { const h = dato(c).horas || {}; for (let i = 0; i < 24; i++) mapa[dow(c)][i] += Number(h[String(i).padStart(2, '0')]) || 0; });
        const maxMapa = Math.max(1, ...mapa.flat());
        const horaPico = (() => { const t = Array(24).fill(0); mapa.forEach(f => f.forEach((v, i) => { t[i] += v; })); const m = Math.max(...t); return m ? t.indexOf(m) : -1; })();
        const recientes = (datos.recientes || []).map(r => {
          const d = new Date(r.t);
          const ok = !Number.isNaN(d.getTime());
          const p = r.pistas || {};
          const pistas = [p.ref ? 'viene de ' + p.ref : '', p.utm ? 'etiqueta ' + p.utm : '', p.app ? 'app de ' + (NOMBRE_FUENTE[p.app] || p.app) : '', p.fbclid ? 'enlace con marca de Meta' : '', p.igshid ? 'enlace compartido desde Instagram' : ''].filter(Boolean);
          return { ...r,
            pistaTxt: pistas.length ? pistas.join(' · ') : 'sin pistas del origen',
            hora: ok ? d.toLocaleTimeString('es-MX', { timeZone: datos.zona, hour: 'numeric', minute: '2-digit' }) : '',
            fecha: ok ? d.toLocaleDateString('es-MX', { timeZone: datos.zona, day: 'numeric', month: 'short' }) : '' };
        });
        const quienes = (datos.miembros || []).map(m => ({ ...m, enRango: claves.reduce((s, c) => s + ((m.dias || {})[c] || 0), 0), act: claves.map(c => (m.dias || {})[c] || 0) })).filter(m => m.enRango > 0).sort((a, b) => b.enRango - a.enRango).slice(0, 15);
        const origenDe = new Map((datos.origenes || []).map(o => [o.uid, o]));
        const anonimos = Math.max(0, unicos - (datos.miembros || []).filter(m => claves.some(c => (m.dias || {})[c])).length);

        // ── Tarjeta "Visitas por periodo": el registro de visitas (guardado en el servidor) por Hoy, Ayer, 7 y 30 días ──
        const PERIODOS = [['hoy', 'Hoy'], ['ayer', 'Ayer'], ['7', '7 días'], ['30', '30 días']];
        if (!estado.periodo) estado.periodo = 'hoy';
        if (!estado.visibles) estado.visibles = 10;
        const clavesPeriodo = k => k === 'hoy' ? [hoy] : k === 'ayer' ? [sumarDias(hoy, -1)] : lista(sumarDias(hoy, -(Number(k) - 1)), hoy);
        const enriquecerVisita = r => {
          const d = new Date(r.t);
          const ok = !Number.isNaN(d.getTime());
          const p = r.pistas || {};
          const pistas = [p.ref ? 'viene de ' + p.ref : '', p.utm ? 'etiqueta ' + p.utm : '', p.app ? 'app de ' + (NOMBRE_FUENTE[p.app] || p.app) : '', p.fbclid ? 'enlace con marca de Meta' : '', p.igshid ? 'enlace compartido desde Instagram' : ''].filter(Boolean);
          return { ...r, pistaTxt: pistas.length ? pistas.join(' · ') : 'sin pistas del origen',
            hora: ok ? d.toLocaleTimeString('es-MX', { timeZone: datos.zona, hour: 'numeric', minute: '2-digit' }) : '',
            fecha: ok ? d.toLocaleDateString('es-MX', { timeZone: datos.zona, day: 'numeric', month: 'short' }) : '' };
        };
        const filaVisita = r => '<div class="mx2-r2"><span class="mx2-rec__t">' + esc(r.hora) + ' · ' + esc(r.fecha) + '</span>'
          + '<span class="mx2-rec__o"><i style="background:' + (COLOR_FUENTE[r.fuente] || '#64748B') + '"></i>' + esc(NOMBRE_FUENTE[r.fuente] || r.fuente) + '</span>'
          + '<span class="mx2-r2__m"><strong>' + esc(nombrePais(r.pais)) + '</strong> · ' + esc(NOMBRE_DISP[r.dispositivo] || '') + (r.nuevo ? ' · primera del día' : '') + '</span>'
          + '<span class="mx2-r2__p" title="' + esc(r.pistaTxt) + '">' + esc(r.pistaTxt) + '</span></div>';
        const tarjetaVisitas = '<div class="mx2-card" style="margin-bottom:16px" id="mx2-per">'
          + '<div class="mx2-head"><div><h3>Visitas por periodo</h3><p class="mx2-sub" style="margin-bottom:6px" id="mx2-per-resumen">&nbsp;</p></div>'
          + '<div class="mx2-seg2" role="tablist">' + PERIODOS.map(([k, t]) => '<button type="button" role="tab" data-per="' + k + '" class="' + (estado.periodo === k ? 'on' : '') + '">' + t + '</button>').join('') + '</div></div>'
          + '<div class="mx2-log" id="mx2-log"><div class="mx2-empty" style="padding:22px 10px">Cargando visitas…</div></div>'
          + '<button type="button" class="mx2-mas" id="mx2-log-mas" style="display:none"></button>'
          + '<div class="mx2-log__pie"><span id="mx2-log-hora">Cada visita se guarda sola al ocurrir, sin datos personales.</span><button type="button" class="mx2-btn" id="mx2-rec-actualizar">Actualizar</button></div></div>';

        raiz.innerHTML = cab + barra + `
          <div class="mx2-kpis">
            <div class="mx2-kpi" style="--c:${VERDE}"><div class="mx2-kpi__l">Visitas</div><div class="mx2-kpi__v">${num(total)}</div><div class="mx2-kpi__s">Páginas vistas</div>${delta(total, totalPrev, hayPrev)}${spark(claves.map(c => dato(c).total), VERDE)}</div>
            <div class="mx2-kpi" style="--c:${AZUL}"><div class="mx2-kpi__l">Personas distintas</div><div class="mx2-kpi__v">${num(unicos)}</div><div class="mx2-kpi__s">Visitantes únicos por día, sumados</div>${delta(unicos, unicosPrev, hayPrev)}${spark(claves.map(c => dato(c).unicos), AZUL)}</div>
            <div class="mx2-kpi" style="--c:#F7941D"><div class="mx2-kpi__l">Cuentas nuevas</div><div class="mx2-kpi__v">${num(nuevas.length)}</div><div class="mx2-kpi__s">${vipNuevos ? num(vipNuevos) + ' ya son VIP' : 'Personas que crearon su cuenta'}</div>${delta(nuevas.length, nuevasPrev.length, hayPrev && nuevasPrev.length > 0)}${spark(claves.map(c => todasCuentas.filter(o => o.dia === c).length), '#F7941D')}</div>
            <div class="mx2-kpi" style="--c:#8B5CF6"><div class="mx2-kpi__l">Promedio por día</div><div class="mx2-kpi__v">${num(promedio)}</div><div class="mx2-kpi__s">${horaPico >= 0 ? 'Hora pico: ' + (horaPico % 12 || 12) + (horaPico < 12 ? ' a. m.' : ' p. m.') : 'Aún sin visitas'}</div>${spark(claves.map(c => dato(c).total), '#8B5CF6')}</div>
          </div>

          <div class="mx2-card" style="margin-bottom:16px">
            <div class="mx2-head"><div><h3>${estado.rango === 'semana' ? 'Visitas por día de la semana' : estado.rango === '365' || estado.rango === 'todo' ? 'Visitas por mes' : 'Visitas día a día'}</h3><p class="mx2-sub" style="margin-bottom:6px">${estado.rango === 'semana' ? 'De lunes a domingo; los días que aún no pasan quedan vacíos.' : serie.previa && hayPrev ? 'La línea punteada es el periodo anterior, para comparar.' : 'Evolución del periodo seleccionado.'}</p></div>
              <div class="mx2-leg"><span><i style="background:${VERDE}"></i>Visitas</span><span><i style="background:${AZUL}"></i>Personas distintas</span>${serie.previa && hayPrev ? '<span><i style="background:#94A3B8"></i>Periodo anterior</span>' : ''}</div></div>
            <div class="mx2-cv" style="height:300px"><canvas id="mx2-principal"></canvas></div>
          </div>

          ${tarjetaVisitas}

          <div class="mx2-card mx2-hero-card" style="margin-bottom:16px">
            <h3>¿De dónde vienen tus miembros?</h3>
            <p class="mx2-sub">Cuentas creadas en este periodo, según la red social o el enlace por el que llegaron${sinDato ? ' · ' + num(sinDato) + ' cuentas anteriores al contador no tienen origen' : ''}.</p>
            ${ordenOrigen.length ? `
              <div class="mx2-top"><b style="background:${COLOR_FUENTE[ganador[0]] || '#64748B'}">${esc((NOMBRE_FUENTE[ganador[0]] || ganador[0]).slice(0, 1))}</b><div><strong>${esc(NOMBRE_FUENTE[ganador[0]] || ganador[0])}</strong> es de donde más miembros llegaron: <strong>${num(ganador[1].n)}</strong> de ${num(nuevas.length)} cuentas nuevas (${Math.round(ganador[1].n / nuevas.length * 100)}%)${ganador[1].vip ? ', y <strong>' + num(ganador[1].vip) + '</strong> ya son VIP' : ''}.</div></div>
              <div class="mx2-g2" style="display:grid;gap:18px;align-items:start">
                <div class="mx2-cv" style="height:${Math.max(180, ordenOrigen.length * 46 + 40)}px"><canvas id="mx2-origen"></canvas></div>
                <table class="mx2-tbl"><thead><tr><th>Origen</th><th>Cuentas</th><th>VIP</th><th>Conversión</th></tr></thead><tbody>
                  ${ordenOrigen.map(([k, v]) => `<tr><td><span class="mx2-dot" style="background:${COLOR_FUENTE[k] || '#64748B'}"></span>${esc(NOMBRE_FUENTE[k] || k)}</td><td>${num(v.n)}</td><td>${num(v.vip)}</td><td><span class="mx2-pill">${Math.round(v.vip / v.n * 100)}%</span></td></tr>`).join('')}
                </tbody></table>
              </div>` : `<div class="mx2-empty"><b>Aún no hay cuentas con origen en este periodo</b>Desde que se publicó el contador, cada cuenta nueva guarda por dónde llegó (Facebook, Instagram, Google, WhatsApp…). Cuando alguien se registre lo verás aquí.</div>`}
          </div>

          <div class="mx2-grid mx2-g2">
            <div class="mx2-card"><h3>Redes sociales · ¿cuánta gente llega de cada una?</h3>
              <p class="mx2-sub">${totSociales ? '<strong>' + num(totSociales) + '</strong> de ' + num(totFuentes) + ' personas (' + Math.round(totSociales / Math.max(1, totFuentes) * 100) + '%) llegaron desde una red social.' + (identificadas.length ? ' La más fuerte: <strong>' + esc(NOMBRE_FUENTE[identificadas[0].k]) + '</strong>.' : '') : 'Personas que llegaron desde Facebook, Instagram, WhatsApp, TikTok y más.'}</p>
              ${sociales.length ? `<div class="mx2-cv" style="height:${Math.max(170, sociales.length * 44 + 30)}px"><canvas id="mx2-redes"></canvas></div>` : redesVacio}
              ${metaSinIdentificar ? '<p class="mx2-sub" style="margin-top:10px"><strong>Meta sin identificar (' + num(metaSinIdentificar) + '):</strong> llegaron desde un enlace de Facebook o de Instagram, pero el navegador no dice de cuál, así que no se pueden repartir. Para que cada una cuente por separado, agrega a tus anuncios de Meta: <code>?utm_source={{site_source_name}}</code>.</p>' : ''}</div>
            <div class="mx2-card"><h3>Redes sociales a lo largo del tiempo</h3>
              <p class="mx2-sub">Cuántas personas llegaron de cada red ${estado.rango === '365' || estado.rango === 'todo' ? 'mes a mes' : 'día a día'}.</p>
              ${sociales.length ? `<div class="mx2-cv" style="height:${Math.max(220, sociales.length * 44 + 30)}px"><canvas id="mx2-redes-tiempo"></canvas></div>` : redesVacio}</div>
          </div>

          <div class="mx2-grid mx2-g2">
            <div class="mx2-card"><h3>¿Qué día entra más gente?</h3><p class="mx2-sub">Promedio de visitas por día de la semana en el periodo.${porSemDia[diaFuerte] > 0 ? ' El más fuerte: <strong>' + DIAS[diaFuerte] + '</strong>.' : ''}</p><div class="mx2-cv" style="height:250px"><canvas id="mx2-semana"></canvas></div></div>
            <div class="mx2-card"><h3>Mapa de calor · día y hora</h3><p class="mx2-sub">Cuándo entra la gente (hora de México). Más oscuro = más visitas.</p>
              <div class="mx2-heat">${DIAS.map((n, d) => `<span>${n}</span>` + mapa[d].map((v, h) => `<i title="${n} ${h}:00 · ${v} visitas" style="background:${v ? 'color-mix(in srgb,#0D5FA0 ' + Math.max(15, Math.round(v / maxMapa * 100)) + '%,var(--surface-2))' : 'var(--surface-2)'}"></i>`).join('')).join('')}</div>
              <div class="mx2-hl"><span></span>${Array.from({ length: 24 }, (_, h) => `<span>${h % 6 === 0 ? (h % 12 || 12) + (h < 12 ? 'a' : 'p') : ''}</span>`).join('')}</div></div>
          </div>

          <div class="mx2-grid mx2-g3">
            <div class="mx2-card"><h3>Países</h3><p class="mx2-sub">${totPaises ? (fueraMx > 0 ? 'Hubo <strong>' + num(fueraMx) + '</strong> persona' + (fueraMx === 1 ? '' : 's') + ' de fuera de México.' : 'Por ahora todas las visitas identificadas son de México.') : 'Aún sin visitas.'}</p><div class="mx2-cv" style="height:${Math.max(160, topPaises.length * 36 + 30)}px"><canvas id="mx2-paises"></canvas></div></div>
            <div class="mx2-card"><h3>Dispositivos</h3><p class="mx2-sub">Desde qué aparato entra la gente.</p><div class="mx2-cv" style="height:210px"><canvas id="mx2-disp"></canvas></div>
              <div class="mx2-leg" style="justify-content:center;margin-top:12px">${Object.keys(NOMBRE_DISP).map(k => `<span><i style="background:${COLOR_DISP[k]};border-radius:50%"></i>${NOMBRE_DISP[k]} <b>${totDisp ? Math.round((disp[k] || 0) / totDisp * 100) : 0}%</b></span>`).join('')}</div></div>
            <div class="mx2-card"><h3>Cómo llegan al sitio</h3><p class="mx2-sub">Por dónde entró cada persona en su primera visita del día.</p>${ordenFuentes.length ? `<div class="mx2-cv" style="height:210px"><canvas id="mx2-fuentes"></canvas></div>
              <div class="mx2-leg" style="margin-top:12px">${ordenFuentes.slice(0, 6).map(([k, v]) => `<span><i style="background:${COLOR_FUENTE[k] || '#64748B'};border-radius:50%"></i>${esc(NOMBRE_FUENTE[k] || k)} <b>${Math.round(v / totFuentes * 100)}%</b></span>`).join('')}</div>` : '<div class="mx2-empty">Sin datos en este periodo</div>'}</div>
          </div>

          <div class="mx2-grid mx2-g2">
            <div class="mx2-card"><h3>Páginas más vistas</h3><p class="mx2-sub">Dónde entra la gente.</p>${filas(pags, NOMBRE_PAGINA)}</div>
            <div class="mx2-card"><h3>Quiénes entraron al panel</h3><p class="mx2-sub">Miembros con sesión iniciada en el periodo${anonimos ? '. Además hubo <strong>' + num(anonimos) + '</strong> visitantes anónimos que no se identifican' : ''}.</p>
              ${quienes.length ? quienes.map(m => {
                const ini = (m.nombre || m.email || '?').trim().slice(0, 2).toUpperCase();
                const o = origenDe.get(m.uid);
                const ult = m.ultima ? new Date(m.ultima).toLocaleString('es-MX', { timeZone: datos.zona, day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) : '';
                return `<div class="mx2-q"><div class="mx2-q__av">${esc(ini)}</div><div class="mx2-q__m"><div class="mx2-q__n">${esc(m.nombre || 'Sin nombre')}</div><div class="mx2-q__e">${esc(m.email)}</div><div class="mx2-q__tags">${o ? '<span class="mx2-q__tag">' + esc(NOMBRE_FUENTE[o.origen] || o.origen) + '</span>' : ''}${o && o.vip ? '<span class="mx2-q__tag vip">VIP</span>' : ''}</div></div><div class="mx2-q__u">${num(m.enRango)} visita${m.enRango === 1 ? '' : 's'}<br>${esc(ult)}</div></div>`;
              }).join('') : '<div class="mx2-empty">Ningún miembro entró al panel en este periodo.</div>'}
            </div>
          </div>`;

        // ── Gráficas ──
        const ej = ejes();
        if (serie.tipo === 'linea') {
          crear(raiz.querySelector('#mx2-principal'), { type: 'line', data: { labels: serie.etiquetas, datasets: [
            { label: 'Visitas', data: serie.visitas, borderColor: VERDE, backgroundColor: degradado(VERDE), fill: true, tension: .38, borderWidth: 2.5, pointRadius: 0, pointHoverRadius: 6, pointHoverBackgroundColor: '#fff', pointHoverBorderColor: VERDE, pointHoverBorderWidth: 3 },
            { label: 'Personas distintas', data: serie.unicos, borderColor: AZUL, backgroundColor: degradado(AZUL), fill: true, tension: .38, borderWidth: 2.5, pointRadius: 0, pointHoverRadius: 6, pointHoverBackgroundColor: '#fff', pointHoverBorderColor: AZUL, pointHoverBorderWidth: 3 },
            ...(hayPrev ? [{ label: 'Periodo anterior', data: serie.previa, borderColor: '#94A3B8', borderDash: [6, 6], borderWidth: 1.8, pointRadius: 0, pointHoverRadius: 0, fill: false, tension: .38 }] : [])
          ] }, options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, plugins: { legend: { display: false }, tooltip }, scales: ej } });
        } else {
          crear(raiz.querySelector('#mx2-principal'), { type: 'bar', data: { labels: serie.etiquetas, datasets: [
            { label: 'Visitas', data: serie.visitas, backgroundColor: ctx => { const a = ctx.chart.chartArea; if (!a) return VERDE; const g = ctx.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom); g.addColorStop(0, '#4CA6DE'); g.addColorStop(1, VERDE_OSC); return g; }, borderRadius: 10, borderSkipped: false, maxBarThickness: 38 },
            { label: 'Personas distintas', data: serie.unicos, backgroundColor: ctx => { const a = ctx.chart.chartArea; if (!a) return AZUL; const g = ctx.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom); g.addColorStop(0, '#5CD1C5'); g.addColorStop(1, '#0F7A70'); return g; }, borderRadius: 10, borderSkipped: false, maxBarThickness: 38 }
          ] }, options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, plugins: { legend: { display: false }, tooltip }, scales: ej } });
        }
        if (ordenOrigen.length) {
          crear(raiz.querySelector('#mx2-origen'), { type: 'bar', data: { labels: ordenOrigen.map(([k]) => NOMBRE_FUENTE[k] || k), datasets: [
            { label: 'Cuentas creadas', data: ordenOrigen.map(([, v]) => v.n), backgroundColor: ordenOrigen.map(([k]) => COLOR_FUENTE[k] || '#64748B'), borderRadius: 8, borderSkipped: false, barThickness: 20 },
            { label: 'Ya son VIP', data: ordenOrigen.map(([, v]) => v.vip), backgroundColor: ordenOrigen.map(([k]) => (COLOR_FUENTE[k] || '#64748B') + '55'), borderColor: ordenOrigen.map(([k]) => COLOR_FUENTE[k] || '#64748B'), borderWidth: 1.5, borderRadius: 8, borderSkipped: false, barThickness: 12 }
          ] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, color: colorTexto() } }, tooltip }, scales: { x: { beginAtZero: true, grid: { color: colorLinea() }, border: { display: false }, ticks: { precision: 0, color: colorTexto() } }, y: { grid: { display: false }, border: { display: false }, ticks: { color: colorTexto(), font: { weight: '600' } } } } } });
        }
        if (sociales.length) {
          crear(raiz.querySelector('#mx2-redes'), { type: 'bar', data: { labels: sociales.map(x => NOMBRE_FUENTE[x.k]), datasets: [{ label: 'Personas', data: sociales.map(x => x.total), backgroundColor: sociales.map(x => COLOR_FUENTE[x.k]), borderRadius: 10, borderSkipped: false, barThickness: 22 }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { ...tooltip, callbacks: { label: c => ' ' + num(c.parsed.x) + ' personas (' + Math.round(c.parsed.x / Math.max(1, totSociales) * 100) + '% de las redes)' } } }, scales: { x: { beginAtZero: true, grid: { color: colorLinea() }, border: { display: false }, ticks: { precision: 0, color: colorTexto() } }, y: { grid: { display: false }, border: { display: false }, ticks: { color: colorTexto(), font: { weight: '600' } } } } } });
          crear(raiz.querySelector('#mx2-redes-tiempo'), { type: 'bar', data: { labels: serie.etiquetas, datasets: serieRedes.map(s => ({ label: NOMBRE_FUENTE[s.k], data: s.datos, backgroundColor: COLOR_FUENTE[s.k], borderRadius: 4, borderSkipped: false, maxBarThickness: 30 })) }, options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, plugins: { legend: { display: true, position: 'bottom', labels: { usePointStyle: true, boxWidth: 8, color: colorTexto() } }, tooltip }, scales: { x: { stacked: true, grid: { display: false }, border: { display: false }, ticks: { color: colorTexto(), maxRotation: 0, autoSkipPadding: 14 } }, y: { stacked: true, beginAtZero: true, grid: { color: colorLinea(), drawTicks: false }, border: { display: false }, ticks: { color: colorTexto(), precision: 0, padding: 8 } } } } });
        }
        crear(raiz.querySelector('#mx2-semana'), { type: 'bar', data: { labels: DIAS, datasets: [{ label: 'Visitas por día (promedio)', data: porSemDia.map(v => Math.round(v * 10) / 10), backgroundColor: porSemDia.map((v, i) => (i === diaFuerte && v > 0 ? VERDE : VERDE + '66')), borderRadius: 10, borderSkipped: false, maxBarThickness: 34 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip }, scales: ej } });
        if (topPaises.length) {
          crear(raiz.querySelector('#mx2-paises'), { type: 'bar', data: { labels: topPaises.map(([k]) => nombrePais(k)), datasets: [{ label: 'Personas', data: topPaises.map(([, v]) => v), backgroundColor: topPaises.map(([k], i) => (k === 'MX' ? VERDE : AZUL + (i % 2 ? 'AA' : 'CC'))), borderRadius: 8, borderSkipped: false, barThickness: 18 }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip }, scales: { x: { beginAtZero: true, grid: { color: colorLinea() }, border: { display: false }, ticks: { precision: 0, color: colorTexto() } }, y: { grid: { display: false }, border: { display: false }, ticks: { color: colorTexto(), font: { weight: '600' } } } } } });
        }
        const centro = texto => ({ id: 'centro', afterDraw(c) { const { ctx, chartArea: a } = c; ctx.save(); ctx.textAlign = 'center'; ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text').trim() || '#111'; ctx.font = "800 28px 'Plus Jakarta Sans',Inter,sans-serif"; ctx.fillText(texto, (a.left + a.right) / 2, (a.top + a.bottom) / 2 + 4); ctx.fillStyle = colorTexto(); ctx.font = "600 10px 'JetBrains Mono',monospace"; ctx.fillText('PERSONAS', (a.left + a.right) / 2, (a.top + a.bottom) / 2 + 22); ctx.restore(); } });
        crear(raiz.querySelector('#mx2-disp'), { type: 'doughnut', data: { labels: Object.values(NOMBRE_DISP), datasets: [{ data: Object.keys(NOMBRE_DISP).map(k => disp[k] || 0), backgroundColor: Object.keys(NOMBRE_DISP).map(k => COLOR_DISP[k]), borderWidth: 0, hoverOffset: 6, borderRadius: 6, spacing: 3 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '72%', plugins: { legend: { display: false }, tooltip } }, plugins: [centro(num(totDisp))] });
        if (ordenFuentes.length) {
          crear(raiz.querySelector('#mx2-fuentes'), { type: 'doughnut', data: { labels: ordenFuentes.map(([k]) => NOMBRE_FUENTE[k] || k), datasets: [{ data: ordenFuentes.map(([, v]) => v), backgroundColor: ordenFuentes.map(([k]) => COLOR_FUENTE[k] || '#64748B'), borderWidth: 0, hoverOffset: 6, borderRadius: 6, spacing: 3 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '72%', plugins: { legend: { display: false }, tooltip } }, plugins: [centro(num(totFuentes))] });
        }
        requestAnimationFrame(() => requestAnimationFrame(() => raiz.querySelectorAll('[data-w]').forEach(el => { el.style.width = el.dataset.w + '%'; })));

        // ── Interacciones ──
        raiz.querySelectorAll('.mx2-seg button').forEach(b => b.addEventListener('click', async () => {
          const r = b.dataset.r;
          estado.rango = r; estado.semana = 0;
          if ((r === 'todo' || r === '365') && diasCargados < 730 && !pintar._pidio) {
            pintar._pidio = true;
            raiz.querySelectorAll('.mx2-seg button').forEach(x => { x.disabled = true; });
            try { const mas = await cargar(730); datos.dias = mas.dias; datos.miembros = mas.miembros; datos.origenes = mas.origenes; datos.sinOrigen = mas.sinOrigen; diasCargados = mas.dias.length; indexar(); } catch (e) { /* se queda con lo cargado */ }
          }
          dibujar();
        }));
        // Registro de visitas por periodo: se pide al servidor, se guarda en memoria un momento y se actualiza solo cada minuto
        const cacheLog = estado.cacheLog || (estado.cacheLog = {});
        const pintarLog = () => {
          const cuerpoLog = raiz.querySelector('#mx2-log');
          if (!cuerpoLog) return;
          const cl = clavesPeriodo(estado.periodo);
          const resumen = raiz.querySelector('#mx2-per-resumen');
          if (resumen) resumen.innerHTML = '<strong>' + num(suma(cl, 'total')) + '</strong> visitas · <strong>' + num(suma(cl, 'unicos')) + '</strong> personas en este periodo';
          const c = cacheLog[estado.periodo];
          const mas = raiz.querySelector('#mx2-log-mas');
          if (!c) { cuerpoLog.innerHTML = '<div class="mx2-empty" style="padding:22px 10px">Cargando visitas…</div>'; if (mas) mas.style.display = 'none'; return; }
          const visibles = estado.visibles;
          cuerpoLog.innerHTML = c.items.length ? c.items.slice(0, visibles).map(filaVisita).join('') : '<div class="mx2-empty" style="padding:22px 10px">Sin visitas registradas en este periodo.</div>';
          const faltan = c.items.length - visibles;
          if (mas) { mas.style.display = faltan > 0 ? '' : 'none'; mas.textContent = 'Ver más (' + faltan + ' restantes)'; }
          const pie = raiz.querySelector('#mx2-log-hora');
          if (pie) pie.textContent = 'Se guarda cada visita sola, sin datos personales · actualizado ' + new Date(c.t).toLocaleTimeString('es-MX', { timeZone: datos.zona, hour: 'numeric', minute: '2-digit' });
        };
        const cargarLog = async (k, silencioso) => {
          try {
            await esperarSesion();
            const token = await Pages._getAuthToken();
            const r = await fetch(Pages._webhookUrl + '/api/admin/visitas?periodo=' + k, { headers: { 'Authorization': 'Bearer ' + token } });
            const d = await r.json().catch(() => ({}));
            if (!r.ok) throw new Error(d.error || 'No se pudo cargar');
            cacheLog[k] = { items: (d.items || []).map(enriquecerVisita), t: Date.now() };
            if (estado.periodo === k) pintarLog();
          } catch (e) {
            if (!silencioso) { const c = raiz.querySelector('#mx2-log'); if (c) c.innerHTML = '<div class="mx2-empty" style="padding:22px 10px">No se pudo cargar el registro: ' + esc(e.message) + '</div>'; }
          }
        };
        pintarLog();
        if (!cacheLog[estado.periodo] || Date.now() - cacheLog[estado.periodo].t > 20000) cargarLog(estado.periodo);
        if (Pages._mxTimer) clearInterval(Pages._mxTimer);
        Pages._mxTimer = setInterval(() => {
          if (!document.getElementById('mx2-log')) { clearInterval(Pages._mxTimer); return; }
          if (document.hidden) return;
          cargarLog(estado.periodo, true);
        }, 60000);
        raiz.querySelector('#mx2-log-mas')?.addEventListener('click', () => { estado.visibles += 20; pintarLog(); });
        raiz.querySelectorAll('.mx2-seg2 button').forEach(b => b.addEventListener('click', () => {
          estado.periodo = b.dataset.per;
          estado.visibles = 10;
          raiz.querySelectorAll('.mx2-seg2 button').forEach(x => x.classList.toggle('on', x === b));
          pintarLog();
          if (!cacheLog[estado.periodo] || Date.now() - cacheLog[estado.periodo].t > 20000) cargarLog(estado.periodo);
        }));
        raiz.querySelector('#mx2-rec-actualizar')?.addEventListener('click', async (ev) => {
          const b = ev.currentTarget; b.disabled = true; b.textContent = 'Actualizando…';
          await cargarLog(estado.periodo);
          b.disabled = false; b.textContent = 'Actualizar';
        });
        raiz.querySelector('#mx2-ant')?.addEventListener('click', () => { estado.semana += 1; dibujar(); });
        raiz.querySelector('#mx2-sig')?.addEventListener('click', () => { if (estado.semana > 0) { estado.semana -= 1; dibujar(); } });
        raiz.querySelector('#mx2-csv')?.addEventListener('click', () => {
          const fuentesCols = Object.keys(NOMBRE_FUENTE);
          const filasCsv = [['fecha', 'visitas', 'personas_distintas', 'miembros_que_entraron', 'telefono', 'tableta', 'computadora', ...fuentesCols.map(k => 'origen_' + k), 'paises', 'cuentas_nuevas']];
          const todos = lista(datos.dias[0].dia, hoy);
          todos.forEach(c => { const d = dato(c); filasCsv.push([c, d.total, d.unicos, d.miembros, d.dispositivos.movil || 0, d.dispositivos.tablet || 0, d.dispositivos.computadora || 0, ...fuentesCols.map(k => (d.fuentes || {})[k] || 0), Object.entries(d.paises || {}).map(([k, v]) => k + ':' + v).join('|'), todasCuentas.filter(o => o.dia === c).length]); });
          const csv = '﻿' + filasCsv.map(f => f.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\r\n');
          const a = document.createElement('a');
          a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
          a.download = 'historial-visitas-fisioteck-' + hoy + '.csv';
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(() => URL.revokeObjectURL(a.href), 2000);
        });
      };
      dibujar();
    };

    cargar(400).then(pintar).catch(err => {
      raiz.innerHTML = `<div class="mx2-card"><div class="mx2-empty"><b>No se pudieron cargar las métricas</b>${esc(err.message)}<br><button type="button" class="mx2-btn" id="mx2-reintentar" style="margin-top:14px">Reintentar</button></div></div>`;
      raiz.querySelector('#mx2-reintentar')?.addEventListener('click', () => Pages.metricas(p));
    });
  }
  Pages.metricas = metricas;
  window.ftMetricasVisitas = metricas;
})();
