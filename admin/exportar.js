/* Panel FisioTeck — descargar CSV de certificados, reseñas, encuesta (prospectos) y referidos (como Zoorigen).
   Toma los datos de la última vez que la sección se cargó desde el servidor; si todavía no se han cargado, avisa.
   Depende de index.html: apiAdmin, toast. El archivo lleva BOM para que Excel respete los acentos. */
(function () {
  'use strict';
  const ultimas = {};
  const orig = window.apiAdmin;
  window.apiAdmin = async function (ruta) { const d = await orig.apply(this, arguments); try { ultimas[String(ruta).split('?')[0]] = d; } catch (_) { /* sigue */ } return d; };

  const celda = v => { v = v == null ? '' : String(v); if (/^[=+\-@]/.test(v)) v = "'" + v; return /[",\n;]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
  const fecha = v => { if (!v) return ''; const d = new Date(v); return isNaN(d) ? '' : d.toISOString().slice(0, 16).replace('T', ' '); };
  function bajar(nombre, filas) {
    const blob = new Blob(['﻿' + filas.map(f => f.map(celda).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nombre + '-' + new Date().toISOString().slice(0, 10) + '.csv'; a.click(); URL.revokeObjectURL(a.href);
    toast('Descargado: ' + a.download);
  }
  const EXPORTA = {
    certificados: { ruta: '/api/admin/certificados', nombre: 'certificados-fisioteck', hacer: d => [['folio', 'nombre', 'correo', 'curso', 'clases', 'emitido', 'estado']].concat((d.certificados || []).map(c => [c.folio, c.nombre, c.email, c.curso || c.cursoTitulo, c.clases, fecha(c.emitidoEn), c.revocado ? 'revocado' : 'vigente'])) },
    resenas: { ruta: '/api/admin/resenas', nombre: 'resenas-fisioteck', hacer: d => [['nombre', 'correo', 'curso', 'estrellas', 'comentario', 'fecha']].concat((d.resenas || []).map(r => [r.nombre, r.email, r.curso, r.estrellas, r.comentario, fecha(r.actualizadaMs)])) },
    encuesta: { ruta: '/api/admin/encuesta', nombre: 'prospectos-fisioteck', hacer: d => [['whatsapp', 'perfil', 'area', 'urgencia', 'freno', 'quiere empezar ya', 'fecha']].concat((d.leads || []).map(l => [l.numero, l.perfil, l.area, l.urgencia, l.freno, l.caliente ? 'si' : 'no', fecha(l.fecha)])) },
    referidos: { ruta: '/api/admin/referidos', nombre: 'referidos-fisioteck', hacer: d => [['invitado', 'correo del invitado', 'anfitrion', 'correo del anfitrion', 'estado', 'motivo', 'pago', 'fecha']].concat((d.invitaciones || []).map(i => [(i.invitado || {}).nombre, (i.invitado || {}).email, (i.anfitrion || {}).nombre, (i.anfitrion || {}).email, i.estado, i.motivo || '', i.pago ? 'si' : 'no', fecha(i.creadoMs || i.fecha)])) }
  };
  window.exCsv = async function (clave) {
    const e = EXPORTA[clave]; if (!e) return;
    try { const d = ultimas[e.ruta] || await apiAdmin(e.ruta); bajar(e.nombre, e.hacer(d)); }
    catch (err) { toast('No se pudo descargar: ' + err.message); }
  };

  // Un botón "Descargar CSV" en el encabezado de cada sección
  const SECCIONES = { 'sec-certs': 'certificados', 'sec-reviews': 'resenas', 'sec-survey': 'encuesta', 'sec-referrals': 'referidos' };
  function botones() {
    Object.entries(SECCIONES).forEach(([id, clave]) => {
      const sec = document.getElementById(id); if (!sec || sec.querySelector('.ex-csv')) return;
      const cab = sec.querySelector('.admin-page-header'); if (!cab) return;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'btn btn-o btn-sm ex-csv'; b.textContent = 'Descargar CSV'; b.onclick = () => exCsv(clave);
      let acc = cab.querySelector('.ex-acciones');
      if (!acc) { acc = document.createElement('div'); acc.className = 'ex-acciones'; acc.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;align-items:center;'; cab.appendChild(acc); }
      acc.appendChild(b);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', botones); else botones();
  setTimeout(botones, 1500);
})();
