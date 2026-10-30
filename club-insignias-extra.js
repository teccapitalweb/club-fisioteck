/* Club FisioTeck — insignias adicionales (clases, cursos, certificados, constancia, retos y comunidad). Las mismas que el servidor concede en
   services/logros.js; aquí solo se muestran. Depende de index.html: BADGES (y de los datos de club-retos.js, club-resenas.js y club-referidos.js). */
(function () {
  'use strict';
  const ic = id => '<svg class="ic" style="width:22px;height:22px;"><use href="#' + id + '"/></svg>';
  [
    { id: 'curso_2', name: 'Doble Curso', desc: 'Termina 2 cursos', xp: 200, cat: 'cursos', icon: ic('f-medal'), check: s => s.completedCourses >= 2 },
    { id: 'clases_10', name: 'Constante', desc: 'Completa 10 clases', xp: 100, cat: 'cursos', icon: ic('f-book'), check: s => s.totalLessons >= 10 },
    { id: 'clases_25', name: 'Aplicado', desc: 'Completa 25 clases', xp: 200, cat: 'cursos', icon: ic('f-clipboard'), check: s => s.totalLessons >= 25 },
    { id: 'clases_50', name: 'Estudioso', desc: 'Completa 50 clases', xp: 350, cat: 'cursos', icon: ic('f-cap'), check: s => s.totalLessons >= 50 },
    { id: 'clases_100', name: 'Maratonista', desc: 'Completa 100 clases', xp: 600, cat: 'cursos', icon: ic('f-rocket'), check: s => s.totalLessons >= 100 },
    { id: 'cert_5', name: 'Archivo Profesional', desc: 'Obtén 5 certificados', xp: 600, cat: 'cursos', icon: ic('f-scroll'), check: s => s.certificados >= 5 },
    { id: 'resena_3', name: 'Crítico Constructivo', desc: 'Califica 3 cursos que terminaste', xp: 150, cat: 'cursos', icon: ic('f-chat'), check: s => s.resenasHechas >= 3 },
    { id: 'streak14', name: 'Racha de 14', desc: 'Entra 14 días seguidos', xp: 400, cat: 'constancia', icon: ic('f-flame'), check: s => s.streak >= 14 },
    { id: 'streak60', name: 'Racha de 60', desc: 'Entra 60 días seguidos', xp: 1000, cat: 'constancia', icon: ic('f-bolt'), check: s => s.streak >= 60 },
    { id: 'reto_10', name: 'Retador Avanzado', desc: 'Supera 10 retos distintos', xp: 250, cat: 'especial', icon: ic('f-target'), check: s => s.retosHechos >= 10 },
    { id: 'reto_25', name: 'Veterano de Retos', desc: 'Supera 25 retos distintos', xp: 500, cat: 'especial', icon: ic('f-trophy'), check: s => s.retosHechos >= 25 },
    { id: 'reto_50', name: 'Maestro de Retos', desc: 'Supera 50 retos distintos', xp: 900, cat: 'especial', icon: ic('f-crown'), check: s => s.retosHechos >= 50 },
    { id: 'perfectos_5', name: 'Precisión Clínica', desc: 'Logra 5 retos sin ningún error', xp: 400, cat: 'especial', icon: ic('f-check-circle'), check: s => s.retosPerfectos >= 5 },
    { id: 'news_20', name: 'Siempre al Día', desc: 'Lee 20 noticias', xp: 200, cat: 'especial', icon: ic('f-news'), check: s => s.newsRead >= 20 },
    { id: 'embajador_10', name: 'Gran Embajador', desc: 'Invita a 10 personas que confirmen su cuenta', xp: 400, cat: 'especial', icon: ic('f-gift'), check: s => s.invitadosValidos >= 10 }
  ].forEach(b => { if (typeof BADGES !== 'undefined' && !BADGES.some(x => x.id === b.id)) BADGES.push(b); });
})();
