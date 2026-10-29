/* Acceso del Club FisioTeck — presentación (diseño guiado por Alintec).
   Solo reordena y rotula lo que ya existe en la pantalla de acceso; no toca la lógica de login/registro.
   Los elementos de venta originales (precios, reseñas, etc.) se conservan ocultos para que su código siga funcionando. */
(function () {
  'use strict';
  var OJO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
  var OJO_X = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.9 17.9A10.1 10.1 0 0 1 12 19c-6.4 0-10-7-10-7a18.3 18.3 0 0 1 5.1-5.9M9.9 4.2A9.7 9.7 0 0 1 12 4c6.4 0 10 7 10 7a18.5 18.5 0 0 1-2.2 3.2M1 1l22 22"/><path d="M14.1 14.1a3 3 0 1 1-4.2-4.2"/></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  var FLECHA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';

  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }

  function ojos() {
    document.querySelectorAll('#login-pass, #reg-pass, #reg-pass-confirm').forEach(function (inp) {
      var label = inp.closest('.auth-field');
      if (!label || label.querySelector('.auth-eye')) return;
      var b = el('button', 'auth-eye', OJO);
      b.type = 'button'; b.setAttribute('aria-label', 'Mostrar contraseña'); b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        var ver = inp.type === 'password';
        inp.type = ver ? 'text' : 'password';
        b.innerHTML = ver ? OJO_X : OJO;
        b.setAttribute('aria-label', ver ? 'Ocultar contraseña' : 'Mostrar contraseña');
        b.setAttribute('aria-pressed', ver ? 'true' : 'false');
      });
      label.appendChild(b);
    });
  }

  function panelIzquierdo() {
    var sell = document.querySelector('.splash-sell');
    if (!sell || sell.querySelector('.au-brand')) return;
    sell.classList.add('au-sell');
    var marca = el('div', 'au-brand',
      '<span class="au-brand__logo"><img src="pwa-logo.png" alt="" width="52" height="52"></span>' +
      '<span class="au-brand__txt"><b>Club Fisio<span>Teck</span></b><small>Fisioterapia · Rehabilitación · Educación continua</small></span>');
    sell.insertBefore(marca, sell.firstChild);
    var h1 = sell.querySelector('h1');
    if (h1) h1.innerHTML = 'Tu formación clínica <span>empieza aquí.</span>';
    var sub = sell.querySelector('.sell-sub');
    if (sub) sub.textContent = 'Aprende a tu ritmo con especialistas, casos reales y herramientas para aplicar desde el primer día.';
    var items = [
      ['Biblioteca completa de cursos', ' de fisioterapia y rehabilitación: neurológica, deportiva, ortopédica y más'],
      ['Clases en línea', ' con especialistas, en vivo y grabadas para repasar cuando quieras'],
      ['Material descargable y herramientas clínicas', ' listas para usar en tu consulta'],
      ['Certificados de reconocimiento', ' por cada curso que completes']
    ];
    var ul = el('ul', 'au-benef');
    items.forEach(function (it) { ul.appendChild(el('li', null, '<span class="au-ck">' + CHECK + '</span><span><b>' + it[0] + '</b>' + it[1] + '</span>')); });
    if (sub && sub.nextSibling) sell.insertBefore(ul, sub.nextSibling); else sell.appendChild(ul);
  }

  function panelDerecho() {
    var card = document.querySelector('.auth-card');
    if (!card || card.querySelector('.au-head')) return;
    var tabs = card.querySelector('.auth-tabs');
    var tL = document.getElementById('tabLogin'), tR = document.getElementById('tabRegister');
    if (tL) tL.textContent = 'Iniciar sesión';
    if (tR) tR.textContent = 'Crear cuenta';
    if (tabs) card.insertBefore(tabs, card.firstChild);
    var head = el('div', 'au-head', '<h2 id="auHeadT"></h2><p id="auHeadS"></p>');
    if (tabs && tabs.nextSibling) card.insertBefore(head, tabs.nextSibling); else card.appendChild(head);

    var btnReg = document.getElementById('btnRegister');
    if (btnReg) {
      btnReg.innerHTML = 'Crear cuenta <span class="au-arrow">' + FLECHA + '</span>';
      btnReg.insertAdjacentElement('afterend', el('p', 'au-note', 'Al crear tu cuenta podrás explorar el Club y elegir tu prueba gratuita.'));
    }
    var btnLog = document.querySelector('#formLogin .btn-splash');
    if (btnLog) btnLog.innerHTML = 'Iniciar sesión <span class="au-arrow">' + FLECHA + '</span>';
    var passReg = document.getElementById('reg-pass');
    if (passReg && passReg.closest('.auth-field')) passReg.closest('.auth-field').insertAdjacentElement('afterend', el('p', 'au-hint', 'Usa al menos <b>6 caracteres</b>.'));

    card.appendChild(el('p', 'au-switch', '<span id="auSwitchT"></span> <button type="button" id="auSwitchB"></button>'));
    card.appendChild(el('p', 'au-legal', 'FisioTeck · Formación constante, resultados excelentes<br>© ' + new Date().getFullYear() + ' · Todos los derechos reservados'));
    document.getElementById('auSwitchB').addEventListener('click', function () {
      if (typeof window.switchAuthTab === 'function') window.switchAuthTab(esRegistro() ? 'login' : 'register');
    });
    if (tR) new MutationObserver(rotular).observe(tR, { attributes: true, attributeFilter: ['class'] });
    rotular();
  }

  function esRegistro() { var t = document.getElementById('tabRegister'); return !!(t && t.classList.contains('active')); }
  function rotular() {
    var reg = esRegistro();
    var t = document.getElementById('auHeadT'), s = document.getElementById('auHeadS'), a = document.getElementById('auSwitchT'), b = document.getElementById('auSwitchB');
    if (!t) return;
    t.textContent = reg ? 'Crea tu cuenta' : 'Bienvenido de vuelta';
    s.textContent = reg ? 'Únete al Club FisioTeck en 30 segundos.' : 'Ingresa a tu cuenta profesional.';
    a.textContent = reg ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?';
    b.textContent = reg ? 'Inicia sesión' : 'Crea una gratis';
    document.querySelectorAll('.btn-google').forEach(function (g) {
      var txt = Array.prototype.find.call(g.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); });
      if (txt) txt.textContent = reg ? ' Registrarte con Google ' : ' Continuar con Google ';
    });
    document.querySelectorAll('.auth-divider').forEach(function (d) { d.textContent = 'o'; });
  }

  function montar() { ojos(); panelIzquierdo(); panelDerecho(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar); else montar();

  /* Términos y Aviso de privacidad: se abren las páginas oficiales del sitio (versión vigente y única). */
  var BASE = 'https://www.fisioteck.com/';
  window.openLegalModal = function (tipo) {
    window.open(BASE + (tipo === 'terms' ? 'terminos-y-condiciones.html' : 'aviso-de-privacidad.html'), '_blank', 'noopener');
  };
})();
