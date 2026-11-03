/* Club FisioTeck — contenido de las escalas clínicas (Pacientes). Revisado contra los formularios oficiales (APTA, Shirley Ryan AbilityLab, CDC STEADI) el 3 de noviembre de 2026.
   DERECHOS DE USO: ninguna de estas escalas tiene una declaración explícita que permita su uso comercial dentro de una membresía de pago.
   · TUG y silla de 30 s: materiales del CDC (agencia federal de EE. UU.), riesgo bajo: HABILITADAS.
   · Berg, LEFS, SPADI y PSFS: tienen titular de derechos o permisos caso por caso. Están DESHABILITADAS (habilitada: false) hasta contar con el permiso escrito de sus autores.
     Para habilitar una escala, cambia habilitada a true cuando exista ese permiso. Una traducción propia del texto es una obra derivada: conviene usar la versión en español publicada.
   Cada escala: id, nombre, tipo ('tiempo' | 'items' | 'spadi' | 'psfs' | 'silla'), descripción, interpretación (rangos), fuente (referencia) y derechos.
   Interpretaciones y criterios: son de apoyo y no sustituyen el criterio clínico. */
window.FT_ESCALAS = [
  {
    id: 'tug', nombre: 'Prueba de levantarse y caminar (TUG)', corto: 'TUG', tipo: 'tiempo', unidad: 's', mejor: 'bajo',
    desc: 'Mide cuánto tarda la persona en levantarse de una silla con brazos, caminar 3 metros a su paso normal, girar, volver y sentarse. Úsala con su calzado habitual y su ayuda para caminar, si la usa.',
    interp: [
      { max: 9.99, txt: 'Movilidad normal' },
      { max: 19.99, txt: 'Movilidad independiente en transferencias y marcha básicas (orientativo)' },
      { max: 29.99, txt: 'Movilidad variable: valorar apoyos y riesgo de caídas (orientativo)' },
      { max: 9999, txt: 'Movilidad reducida: suele requerir ayuda para desplazarse (orientativo; interpretar según la población)' }
    ],
    nota: 'En adultos mayores, un tiempo de 12 segundos o más indica riesgo de caídas (CDC STEADI). Las bandas de 10, 20 y 30 segundos son orientativas y varían según la población.',
    fuente: 'Podsiadlo D, Richardson S. J Am Geriatr Soc 1991;39:142-148. Procedimiento y corte de 12 s: CDC STEADI, 2017.',
    derechos: 'Procedimiento del CDC (agencia federal de EE. UU.).', habilitada: true
  },
  {
    id: 'berg', nombre: 'Escala de equilibrio de Berg', corto: 'Berg', tipo: 'items', max: 56, mejor: 'alto',
    desc: 'Valora el equilibrio con 14 tareas. Cada una se califica de 0 (no puede) a 4 (la realiza sin dificultad). Puntaje total de 0 a 56.',
    interp: [
      { min: 0, max: 20, txt: 'Equilibrio muy deficiente (en el original: dependiente de silla de ruedas)' },
      { min: 21, max: 40, txt: 'Equilibrio deficiente (en el original: camina con asistencia)' },
      { min: 41, max: 56, txt: 'Equilibrio aceptable o bueno (en el original: independiente)' }
    ],
    corte: { menorQue: 45, txt: 'Menor de 45: mayor riesgo de caídas en adultos mayores' },
    fuente: 'Berg K et al. Can J Public Health 1992;83(Supl 2):S7-S11; Arch Phys Med Rehabil 1992;73:1073-1083.',
    derechos: 'Derechos de K. Berg: confirmar permiso antes de uso comercial.', habilitada: false,
    nota: 'Registra la categoría MÁS BAJA que corresponda en cada punto. Si la persona logra 2 minutos de pie sin apoyo (punto 2), el punto 3 puntúa 4. Un puntaje menor de 45 se asocia con mayor riesgo de caídas en adultos mayores (Berg et al., 1992); los cortes cambian según la población.',
    items: [
      { t: '1. De sentado a de pie', o: ['Necesita ayuda moderada o máxima para levantarse', 'Necesita ayuda mínima para levantarse o estabilizarse', 'Se levanta con las manos después de varios intentos', 'Se levanta solo, usando las manos', 'Se levanta sin usar las manos y se estabiliza solo'] },
      { t: '2. De pie sin apoyo', o: ['No puede estar 30 segundos sin apoyo', 'Necesita varios intentos para estar 30 segundos', 'Está 30 segundos sin apoyo', 'Está 2 minutos con supervisión', 'Está 2 minutos de forma segura'] },
      { t: '3. Sentado sin apoyo de la espalda (pies en el suelo)', o: ['No puede estar 10 segundos sin apoyo', 'Está 10 segundos', 'Está 30 segundos', 'Está 2 minutos con supervisión', 'Está 2 minutos de forma segura'] },
      { t: '4. De pie a sentado', o: ['Necesita ayuda para sentarse', 'Se sienta solo pero con descenso sin control', 'Usa la parte posterior de las piernas contra la silla para controlar el descenso', 'Controla el descenso con las manos', 'Se sienta con seguridad usando poco las manos'] },
      { t: '5. Transferencias (de una silla a otra)', o: ['Necesita dos personas para ayudar o supervisar', 'Necesita una persona que ayude', 'Se transfiere con indicaciones verbales o supervisión', 'Se transfiere con seguridad pero necesita las manos', 'Se transfiere con seguridad usando poco las manos'] },
      { t: '6. De pie sin apoyo con los ojos cerrados', o: ['Necesita ayuda para no caerse', 'No mantiene los ojos cerrados 3 segundos pero se mantiene estable', 'Se mantiene 3 segundos', 'Se mantiene 10 segundos con supervisión', 'Se mantiene 10 segundos de forma segura'] },
      { t: '7. De pie sin apoyo con los pies juntos', o: ['Necesita ayuda y no aguanta 15 segundos', 'Necesita ayuda para colocarse pero aguanta 15 segundos', 'Junta los pies solo y aguanta 30 segundos', 'Los junta solo y aguanta 1 minuto con supervisión', 'Los junta solo y aguanta 1 minuto de forma segura'] },
      { t: '8. Alcanzar hacia delante con el brazo extendido (de pie)', o: ['Pierde el equilibrio o necesita apoyo externo', 'Alcanza, pero necesita supervisión', 'Alcanza más de 5 cm con seguridad', 'Alcanza más de 12.5 cm con seguridad (5 pulgadas)', 'Alcanza con confianza más de 25 cm'] },
      { t: '9. Recoger un objeto del suelo (de pie)', o: ['No puede intentarlo o necesita ayuda para no caerse', 'No puede recogerlo y necesita supervisión al intentarlo', 'No puede recogerlo pero llega a 2 a 5 cm y se mantiene en equilibrio', 'Lo recoge pero con supervisión', 'Lo recoge de forma fácil y segura'] },
      { t: '10. Girar para mirar hacia atrás por encima de cada hombro (de pie)', o: ['Necesita ayuda para no perder el equilibrio', 'Necesita supervisión al girar', 'Gira solo de lado pero mantiene el equilibrio', 'Mira hacia atrás por un solo lado; el otro lado muestra menos desplazamiento del peso', 'Mira hacia atrás por ambos lados con buen desplazamiento del peso'] },
      { t: '11. Girar 360 grados', o: ['Necesita ayuda al girar', 'Necesita supervisión cercana o indicaciones verbales', 'Gira 360 grados con seguridad pero lento', 'Gira 360 grados con seguridad solo hacia un lado en 4 segundos o menos', 'Gira 360 grados con seguridad hacia ambos lados en 4 segundos o menos cada uno'] },
      { t: '12. Colocar alternadamente los pies sobre un escalón (de pie sin apoyo)', o: ['Necesita ayuda para no caerse o no puede hacerlo', 'Completa más de 2 veces con ayuda mínima', 'Completa 4 veces sin ayuda pero con supervisión', 'Completa 8 veces en más de 20 segundos', 'Completa 8 veces con seguridad en 20 segundos'] },
      { t: '13. De pie sin apoyo con un pie delante del otro (en línea)', o: ['Pierde el equilibrio al dar el paso o al estar de pie', 'Necesita ayuda para dar el paso pero aguanta 15 segundos', 'Da un paso pequeño solo y aguanta 30 segundos', 'Coloca un pie delante del otro (sin alinear) y aguanta 30 segundos', 'Coloca un pie justo delante del otro y aguanta 30 segundos'] },
      { t: '14. De pie sobre una pierna', o: ['No puede intentarlo o necesita ayuda para no caerse', 'Intenta levantar la pierna, no aguanta 3 segundos pero se mantiene de pie', 'Levanta la pierna solo y aguanta 3 segundos o más', 'Levanta la pierna solo y aguanta de 5 a 10 segundos', 'Levanta la pierna solo y aguanta más de 10 segundos'] }
    ]
  },
  {
    id: 'lefs', nombre: 'Escala funcional de miembro inferior (LEFS)', corto: 'LEFS', tipo: 'items', max: 80, mejor: 'alto',
    desc: 'El paciente indica cuánta dificultad tiene HOY para 20 actividades por su problema en el miembro inferior. Puntaje de 0 (limitación máxima) a 80 (sin limitación).',
    opciones: ['Extrema dificultad o incapaz', 'Bastante dificultad', 'Dificultad moderada', 'Poca dificultad', 'Ninguna dificultad'],
    items: [
      'Cualquiera de su trabajo habitual, tareas del hogar o escuela', 'Sus pasatiempos, recreación o deporte habituales', 'Entrar o salir de la bañera', 'Caminar entre habitaciones', 'Ponerse los zapatos o los calcetines', 'Ponerse en cuclillas', 'Levantar un objeto del suelo, como una bolsa del mandado', 'Hacer actividades ligeras en casa', 'Hacer actividades pesadas en casa', 'Subir o bajar de un automóvil', 'Caminar 2 cuadras', 'Caminar 1 milla (1.6 km)', 'Subir o bajar 10 escalones (un piso)', 'Estar de pie 1 hora', 'Estar sentado 1 hora', 'Correr en terreno plano', 'Correr en terreno irregular', 'Hacer giros bruscos corriendo rápido', 'Brincar', 'Darse la vuelta en la cama'
    ].map(t => ({ t })),
    interp: [],
    nota: 'Un cambio de 9 puntos o más suele considerarse clínicamente relevante (Binkley 1999). Pide al paciente que indique si HOY tiene, o tendría, dificultad con cada actividad por su problema.',
    fuente: 'Binkley JM et al. Phys Ther 1999;79:371-383. Versión en español: Cruz-Díaz D et al. Disabil Rehabil 2014;36(23):2005-2011.',
    derechos: 'Derechos de Binkley / APTA: pedir permiso antes de reproducir los 20 puntos en un producto de pago.', habilitada: false
  },
  {
    id: 'spadi', nombre: 'Índice de dolor y discapacidad del hombro (SPADI)', corto: 'SPADI', tipo: 'spadi', max: 100, mejor: 'bajo',
    desc: 'Valora el dolor (5 preguntas) y la dificultad en actividades (8 preguntas) del hombro. Cada respuesta va de 0 a 10. El resultado se expresa en porcentaje: menos es mejor.',
    dolor: ['Dolor en su peor momento', 'Dolor al acostarse sobre el lado afectado', 'Dolor al alcanzar algo en un estante alto', 'Dolor al tocarse la parte posterior del cuello', 'Dolor al empujar con el brazo afectado'],
    disc: ['Lavarse el pelo', 'Lavarse la espalda', 'Ponerse una playera o suéter por la cabeza', 'Ponerse una camisa que se abotona al frente', 'Ponerse el pantalón', 'Colocar un objeto en un estante alto', 'Cargar un objeto pesado (unos 4.5 kg, 10 libras)', 'Sacar algo del bolsillo trasero'],
    interp: [],
    nota: 'Dolor: 0 es sin dolor y 10 el peor dolor imaginable. Dificultad: 0 es sin dificultad y 10 tan difícil que necesita ayuda. Total = promedio de los dos porcentajes. Un cambio de unos 8 a 13 puntos suele considerarse clínicamente importante, y se necesitan unos 18 para descartar error de medición (varía según la población).',
    fuente: 'Roach KE et al. Arthritis Care Res 1991;4:143-149. Versión en español: Membrilla-Mesa MD et al. Health Qual Life Outcomes 2015;13:200.',
    derechos: 'Gratuito para uso clínico según las fuentes, pero la desarrolladora retiene la propiedad: confirmar permiso para una membresía de pago.', habilitada: false
  },
  {
    id: 'psfs', nombre: 'Escala funcional específica del paciente (PSFS)', corto: 'PSFS', tipo: 'psfs', max: 10, mejor: 'alto',
    desc: 'El paciente elige hasta 3 actividades importantes que no puede hacer o le cuestan por su problema y las califica de 0 (incapaz de hacerla) a 10 (capaz de hacerla al mismo nivel que antes de la lesión o del problema). El resultado es el promedio.',
    interp: [],
    nota: 'Un cambio de 2 puntos o más en el promedio (3 o más en una sola actividad) supera el error de medición (cambio mínimo detectable). La diferencia clínicamente importante publicada va de 1.2 a 2.2 puntos según la población. En la reevaluación usa las mismas actividades del inicio.',
    fuente: 'Stratford P et al. Physiother Can 1995;47:258-263. Adaptación al español: Depine JM et al. Argentinian J Respir Phys Ther 2020.',
    derechos: 'Derechos de P. Stratford (McMaster): requiere permiso escrito para uso comercial.', habilitada: false
  },
  {
    id: 'silla30', nombre: 'Sentarse y pararse en 30 segundos', corto: 'Silla 30 s', tipo: 'silla', mejor: 'alto',
    desc: 'Cuenta cuántas veces se levanta completamente de una silla (sin usar los brazos) en 30 segundos. Compara con el valor esperado para su edad y sexo.',
    interp: [],
    // Puntaje por debajo del cual el resultado se considera inferior al promedio (CDC STEADI), por edad y sexo
    refs: {
      hombre: [[60, 64, 14], [65, 69, 12], [70, 74, 12], [75, 79, 11], [80, 84, 10], [85, 89, 8], [90, 94, 7]],
      mujer: [[60, 64, 12], [65, 69, 11], [70, 74, 10], [75, 79, 10], [80, 84, 9], [85, 89, 8], [90, 94, 4]]
    },
    nota: 'Silla recta sin brazos con el asiento a unos 43 cm; manos cruzadas sobre el pecho y pies planos. Se cuentan las levantadas completas en 30 segundos (si ya pasó de la mitad al terminar, cuenta). Si necesita usar los brazos, se detiene la prueba y se registra 0. Válida para personas de 60 a 94 años. Un resultado por debajo del valor esperado indica riesgo de caídas (CDC STEADI).',
    fuente: 'CDC STEADI, 2017 (30-Second Chair Stand). Valores de referencia: Rikli RE, Jones CJ. J Aging Phys Act 1999;7:162-181.',
    derechos: 'Procedimiento y tabla del CDC (agencia federal de EE. UU.).', habilitada: true
  },
  {
    id: 'cuatro', nombre: 'Prueba de equilibrio en 4 posiciones (CDC)', corto: '4 posiciones', tipo: 'cuatro', max: 4, mejor: 'alto',
    desc: 'Mide si la persona mantiene 10 segundos cada una de 4 posiciones de pie, de más fácil a más difícil: 1) pies juntos, uno al lado del otro; 2) semitándem (el talón de un pie toca el costado del dedo gordo del otro); 3) tándem (un pie justo delante del otro, talón con dedos); 4) un solo pie. Sin bastón ni andador y con los ojos abiertos. Se permite mover los brazos para mantener el equilibrio, pero no mover los pies ni apoyarse. Si no logra 10 segundos en una posición, se detiene la prueba.',
    interp: [],
    nota: 'Si no mantiene la posición en tándem (la 3) durante 10 segundos, tiene mayor riesgo de caídas (CDC STEADI, pensada para personas mayores). Si lo tiene, considera derivar a fisioterapia de marcha y equilibrio o a un programa de prevención de caídas. Registra los segundos logrados en cada posición, de 0 a 10.',
    fuente: 'CDC STEADI, 2017 (4-Stage Balance Test).',
    derechos: 'Procedimiento y formulario del CDC (agencia federal de EE. UU.).', habilitada: true
  },
  {
    id: 'actividades', nombre: 'Seguimiento de actividades (herramienta propia del Club)', corto: 'Actividades', tipo: 'actividades', max: 10, mejor: 'alto',
    desc: 'El paciente elige hasta 5 actividades que le cuestan por su problema y las califica de 0 (no puede hacerla) a 10 (la hace sin ninguna dificultad). El resultado es el promedio. Usa las mismas actividades en cada medición para ver su evolución.',
    interp: [],
    nota: 'Herramienta propia del Club: NO es una escala validada, no tiene puntos de corte ni diferencia mínima importante. Sirve para ver cómo cambia la función de cada paciente a lo largo del tratamiento.',
    fuente: 'Herramienta propia del Club FisioTeck (no validada).',
    derechos: 'Contenido propio del Club.', habilitada: true
  }
];
