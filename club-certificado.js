/* Club FisioTeck — certificados: confirmar el nombre antes de emitir y compartir el certificado (como Alintec y Zoorigen).
   · Antes de emitir se pide confirmar el nombre tal como aparecerá (el servidor lo guarda firmado y ya no cambia).
   · Cada certificado tiene botones para compartir en LinkedIn (agregar a "Licencias y certificaciones"), WhatsApp y Facebook, y copiar el enlace
     de verificación pública. Depende de index.html: abrirCertModal, emitirCertificado, loadCertificates, escCert, showToast. */
(function () {
  'use strict';
  const CLUB = 'https://club.fisioteck.com';
  const $ = id => document.getElementById(id);

  // ---------- Confirmar el nombre ----------
  function caja() {
    if ($('certConfirma')) return;
    const err = $('certModalError'); if (!err) return;
    const d = document.createElement('label');
    d.id = 'certConfirma'; d.style.cssText = 'display:flex;gap:10px;align-items:flex-start;margin:12px 0 4px;font-size:.84rem;line-height:1.5;color:var(--text-light);cursor:pointer;';
    d.innerHTML = '<input type="checkbox" id="certConfirmaChk" style="margin-top:3px;width:17px;height:17px;flex-shrink:0;"><span>Confirmo que mi nombre está escrito <b>tal como quiero que aparezca</b> en el certificado. Una vez emitido ya no se puede cambiar.</span>';
    err.parentNode.insertBefore(d, err);
  }
  const abrirOriginal = window.abrirCertModal;
  if (typeof abrirOriginal === 'function') window.abrirCertModal = function () { caja(); const r = abrirOriginal.apply(this, arguments); const c = $('certConfirmaChk'); if (c) c.checked = false; return r; };
  const emitirOriginal = window.emitirCertificado;
  if (typeof emitirOriginal === 'function') window.emitirCertificado = function () {
    const c = $('certConfirmaChk'), err = $('certModalError');
    if (c && !c.checked) { err.textContent = 'Marca la casilla para confirmar que tu nombre está bien escrito.'; err.style.display = 'block'; return Promise.resolve(); }
    return emitirOriginal.apply(this, arguments);
  };

  // ---------- Compartir ----------
  const urlVerificar = folio => CLUB + '/verificar/?folio=' + encodeURIComponent(folio);
  function enlaces(c) {
    const url = urlVerificar(c.folio), f = new Date(c.fecha || Date.now());
    const texto = 'Terminé el curso «' + c.curso + '» en el Club FisioTeck. Puedes verificar mi certificado aquí: ' + url;
    return {
      linkedin: 'https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=' + encodeURIComponent(c.curso) + '&organizationName=' + encodeURIComponent('FisioTeck') + '&issueYear=' + f.getFullYear() + '&issueMonth=' + (f.getMonth() + 1) + '&certUrl=' + encodeURIComponent(url) + '&certId=' + encodeURIComponent(c.folio),
      whatsapp: 'https://wa.me/?text=' + encodeURIComponent(texto),
      facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url),
      url, texto
    };
  }
  const BTN = 'padding:8px 13px;border-radius:var(--radius-sm);border:1px solid var(--border-2);background:none;color:var(--text);font:inherit;font-size:.78rem;cursor:pointer;text-decoration:none;display:inline-block;';
  window.ftCompartirCert = async function (folio, curso, fecha, donde) {
    const e = enlaces({ folio, curso, fecha });
    if (donde === 'copiar') { try { await navigator.clipboard.writeText(e.url); showToast('Enlace de verificación copiado'); } catch (_) { prompt('Copia este enlace:', e.url); } return; }
    window.open(e[donde], '_blank', 'noopener');
  };
  function agregarCompartir() {
    document.querySelectorAll('#certList a[href*="verificar/?folio="]').forEach(a => {
      const tarjeta = a.closest('div[style*="border-radius"]'), fila = a.parentNode;
      if (!tarjeta || tarjeta.querySelector('.ft-compartir')) return;
      const folio = decodeURIComponent((a.getAttribute('href').split('folio=')[1] || '')), curso = ((tarjeta.querySelector('strong') || {}).textContent || '').trim();
      const fechaTxt = ((tarjeta.querySelector('div[style*="text-muted"]') || {}).innerText || '');
      const c = document.createElement('div'); c.className = 'ft-compartir'; c.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-top:10px;align-items:center;';
      const q = d => 'ftCompartirCert(' + JSON.stringify(folio) + ',' + JSON.stringify(curso) + ',null,\'' + d + '\')';
      c.innerHTML = '<span style="font-size:.72rem;color:var(--text-muted);margin-right:2px;">Compartir:</span>' +
        '<button type="button" style="' + BTN + '" onclick="' + q('linkedin').replace(/"/g, '&quot;') + '">LinkedIn</button>' +
        '<button type="button" style="' + BTN + '" onclick="' + q('whatsapp').replace(/"/g, '&quot;') + '">WhatsApp</button>' +
        '<button type="button" style="' + BTN + '" onclick="' + q('facebook').replace(/"/g, '&quot;') + '">Facebook</button>' +
        '<button type="button" style="' + BTN + '" onclick="' + q('copiar').replace(/"/g, '&quot;') + '">Copiar enlace</button>';
      void fechaTxt; fila.insertAdjacentElement('afterend', c);
    });
  }
  const cargarOriginal = window.loadCertificates;
  if (typeof cargarOriginal === 'function') window.loadCertificates = async function () { const r = await cargarOriginal.apply(this, arguments); try { agregarCompartir(); } catch (_) { /* sin botones */ } return r; };
  window.ftCertEnlaces = enlaces;
})();
