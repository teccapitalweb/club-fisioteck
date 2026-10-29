/* Club FisioTeck — Modo historia "Atiende al paciente" (como el Modo historia de Alintec Food): cuatro mundos con cuatro casos cada uno.
   Fisi te cuenta la situación y eliges la mejor decisión; al responder se explica por qué. Con 3 aciertos de 4 se supera el mundo y se abre el siguiente.
   El servidor califica (POST /api/retos/completar { tipo:'historia', retoId:'h-N', respuestas }), da el XP una sola vez por mundo y no deja abrir un mundo
   sin haber superado el anterior. Las respuestas que se mandan son los índices ORIGINALES de las opciones (las opciones se barajan solo en pantalla).
   Casos con fines de práctica educativa: no sustituyen el criterio clínico ni los protocolos de cada institución.
   Depende de: club-acceso.js (ftAcceso.completarReto), club-retos.js, club-mascota.js, club-logros.js. */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = id => document.getElementById(id);
  const mezclar = a => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };

  const MUNDOS = [
    {
      "id": "h-1",
      "n": 1,
      "titulo": "Valoración inicial",
      "sub": "Escuchar, explorar y decidir bien antes de tratar",
      "imagen": "assets/retos/q-valoracion.webp",
      "intro": "Llega un paciente nuevo. Lo que decidas en la primera consulta marca todo el tratamiento. Vamos con calma.",
      "casos": [
        {
          "escena": "Un paciente llega con dolor lumbar agudo después de caer de una escalera. Cuenta que sus piernas se sienten cada vez más débiles y que ya no controla bien la orina.",
          "a": [
            "Empezar con masaje y ejercicios de movilidad",
            "Derivarlo de inmediato a valoración médica urgente: son banderas rojas",
            "Indicarle reposo y calor en casa"
          ],
          "ok": 1,
          "why": "Debilidad que avanza y pérdida del control de esfínteres tras un golpe pueden indicar compresión de la cauda equina. No se trata en consulta: se deriva de inmediato."
        },
        {
          "escena": "Es el primer día con una paciente que llega con dolor de hombro. Tienes poco tiempo y una técnica que le funcionó muy bien al paciente anterior.",
          "a": [
            "Aplicar la misma técnica: seguro le funciona",
            "Hacer la anamnesis y la exploración para definir el problema y los objetivos",
            "Empezar con ultrasonido porque es rápido"
          ],
          "ok": 1,
          "why": "El tratamiento sale de la valoración. Sin historia clínica ni exploración no se sabe qué tratar ni cómo medir si funciona."
        },
        {
          "escena": "Vas a medir la flexión de rodilla con un goniómetro. Tu paciente está acostado boca arriba.",
          "a": [
            "Eje en el centro de la rótula y brazos hacia el suelo",
            "Eje en el cóndilo femoral lateral, brazo fijo hacia el trocánter mayor y brazo móvil hacia el maléolo lateral",
            "Eje en el maléolo y brazos hacia la cadera"
          ],
          "ok": 1,
          "why": "El eje del goniómetro va sobre el eje de la articulación (cóndilo femoral lateral) y los brazos siguen los segmentos: fijo al fémur y móvil a la pierna."
        },
        {
          "escena": "Hoy tu paciente marca 3/10 en la escala EVA de dolor; hace una semana marcó 7/10.",
          "a": [
            "Anotar solo \"mejoró\"",
            "Registrar la puntuación con fecha y la actividad que lo provoca para comparar la evolución",
            "No anotarlo para no sesgar la siguiente valoración"
          ],
          "ok": 1,
          "why": "Registrar el dato con fecha y contexto permite comparar y justificar los cambios del tratamiento."
        }
      ]
    },
    {
      "id": "h-2",
      "n": 2,
      "titulo": "Lesiones y ortopedia",
      "sub": "Del esguince al regreso al deporte",
      "imagen": "assets/retos/q-ortopedia.webp",
      "intro": "Hoy toca la sala de ortopedia. Lesiones recientes, cirugías y deportistas con prisa por volver. Tú pones el ritmo.",
      "casos": [
        {
          "escena": "Un corredor llega a las 24 horas de un esguince de tobillo grado II: hinchado, doloroso, pero tolera apoyar poco.",
          "a": [
            "Calor profundo y masaje intenso para que se deshinche",
            "Proteger, aplicar frío, compresión y elevación, con carga progresiva según tolerancia",
            "Inmovilizarlo sin apoyo durante seis semanas"
          ],
          "ok": 1,
          "why": "En la fase aguda se protege y se controla la inflamación; la carga progresiva temprana favorece la recuperación. El calor y el masaje intenso aumentan la inflamación."
        },
        {
          "escena": "Primera semana después de una cirugía de ligamento cruzado anterior. La rodilla está inflamada y el paciente quiere \"avanzar rápido\".",
          "a": [
            "Empezar a correr para recuperar fuerza",
            "Controlar derrame y dolor, trabajar la extensión completa y activar el cuádriceps",
            "Doblar la rodilla al máximo con fuerza para ganar movilidad"
          ],
          "ok": 1,
          "why": "Al inicio los objetivos son controlar la inflamación, recuperar la extensión y activar el cuádriceps. La carga alta y los movimientos forzados ponen en riesgo la cirugía."
        },
        {
          "escena": "Una deportista tiene dolor al frente de la rodilla al bajar escaleras. En la exploración, la rodilla se le va hacia adentro.",
          "a": [
            "Trabajar fuerza de cadera y cuádriceps y corregir la alineación al bajar",
            "Prohibirle toda actividad durante meses",
            "Solo hielo y esperar a que pase"
          ],
          "ok": 0,
          "why": "El control de la cadera y el fortalecimiento del cuádriceps mejoran la alineación y reducen la carga sobre la articulación femoropatelar."
        },
        {
          "escena": "Tu paciente completa sus tres series de quince repeticiones sin dolor y con buena técnica.",
          "a": [
            "Mantener siempre la misma carga",
            "Aumentar la carga o la dificultad de forma gradual",
            "Duplicar la carga de un día para otro"
          ],
          "ok": 1,
          "why": "La progresión gradual de carga estimula la adaptación sin disparar el dolor. Los saltos grandes de carga son la causa más común de recaídas."
        }
      ]
    },
    {
      "id": "h-3",
      "n": 3,
      "titulo": "Neurorrehabilitación",
      "sub": "Paciencia, seguridad y función",
      "imagen": "assets/retos/q-neuro.webp",
      "intro": "En neurorrehabilitación el progreso es lento y cada sesión importa. La seguridad primero, la función después.",
      "casos": [
        {
          "escena": "Un paciente con hemiparesia izquierda ignora ese lado al vestirse y solo usa el derecho.",
          "a": [
            "Dejar que use solo el lado sano para que no se frustre",
            "Estimular la atención al lado afectado e incluirlo en tareas funcionales",
            "Evitar tocar el lado afectado"
          ],
          "ok": 1,
          "why": "Estimular el lado afectado en tareas con sentido favorece la reorganización neuronal. Evitarlo refuerza el desuso."
        },
        {
          "escena": "Un adulto mayor después de un ictus quiere caminar solo por el pasillo, aunque aún pierde el equilibrio.",
          "a": [
            "Dejarlo: así se obliga a mejorar",
            "Entorno seguro, ayuda técnica adecuada y supervisión cercana mientras camina",
            "Mantenerlo en cama todo el día"
          ],
          "ok": 1,
          "why": "Caminar es parte de la recuperación, pero con el riesgo de caída controlado: apoyo adecuado, entorno despejado y vigilancia."
        },
        {
          "escena": "Tu paciente tiene espasticidad en los flexores del codo y el brazo se le queda doblado.",
          "a": [
            "Estiramientos lentos y sostenidos con buen posicionamiento, sin movimientos bruscos",
            "Estiramientos rápidos y fuertes para romper la rigidez",
            "Inmovilizar el brazo permanentemente"
          ],
          "ok": 0,
          "why": "Los movimientos bruscos aumentan la espasticidad. Los estiramientos lentos y el posicionamiento ayudan a mantener el rango."
        },
        {
          "escena": "A la mitad de la sesión, tu paciente se pone pálido y dice que se siente mareado.",
          "a": [
            "Pedirle que termine la serie para no perder el avance",
            "Detener la sesión, sentarlo, tomar signos y registrar lo ocurrido",
            "Cambiar de ejercicio sin pausa"
          ],
          "ok": 1,
          "why": "Ante mareo o palidez se detiene todo, se coloca al paciente en posición segura, se vigilan signos y se documenta la incidencia."
        }
      ]
    },
    {
      "id": "h-4",
      "n": 4,
      "titulo": "Fisioterapia respiratoria",
      "sub": "Respirar mejor, con seguridad",
      "imagen": "assets/retos/q-respiratoria.webp",
      "intro": "Último mundo: respiración, tos y esfuerzo. Aquí un error de ritmo puede cansar al paciente más de lo que ayuda.",
      "casos": [
        {
          "escena": "Un paciente después de una cirugía abdominal evita respirar profundo porque le duele la herida.",
          "a": [
            "Dejar que respire superficial para no lastimarse",
            "Enseñar respiración diafragmática con apoyo de una almohada sobre la herida y coordinar el control del dolor",
            "Obligarlo a toser fuerte sin apoyo"
          ],
          "ok": 1,
          "why": "La respiración profunda previene complicaciones. Se logra apoyando la herida y controlando el dolor, no evitando respirar."
        },
        {
          "escena": "Vas a enseñar el uso del espirómetro incentivador a un paciente encamado.",
          "a": [
            "Inspirar lenta y profundamente, sostener unos segundos y repetir en series",
            "Soplar fuerte hacia afuera lo más rápido posible",
            "Respirar rápido y superficial varias veces seguidas"
          ],
          "ok": 0,
          "why": "El espirómetro incentivador se usa con una inspiración lenta y profunda sostenida, para expandir los pulmones."
        },
        {
          "escena": "Durante el ejercicio, un paciente con EPOC se agita mucho y su saturación baja por debajo del límite acordado.",
          "a": [
            "Seguir hasta completar la serie",
            "Detener, reposo en posición cómoda, respiración con labios fruncidos, vigilar la saturación y avisar si no mejora",
            "Aumentar el ritmo para que se acostumbre"
          ],
          "ok": 1,
          "why": "Si hay desaturación o disnea intensa se detiene el esfuerzo, se favorece la recuperación y se escala si no mejora."
        },
        {
          "escena": "Un paciente tiene secreciones espesas que le cuesta sacar.",
          "a": [
            "Hidratación, posicionamiento y técnicas de higiene bronquial indicadas",
            "Reducir los líquidos para que no se acumule más",
            "Dejarlo inmóvil para que no se canse"
          ],
          "ok": 0,
          "why": "La hidratación y el drenaje con técnicas adecuadas ayudan a movilizar las secreciones; la restricción de líquidos las espesa."
        }
      ]
    },
    {
      "id": "h-5",
      "n": 5,
      "titulo": "Geriatría y caídas",
      "sub": "Prevenir antes de lamentar",
      "imagen": "assets/retos/o-evaluacion.webp",
      "intro": "Hoy atenderemos a personas mayores. Una caída puede cambiarlo todo, así que prevenir es nuestra mejor técnica. Vamos paso a paso.",
      "casos": [
        {
          "escena": "Una señora de 78 años refiere que se cayó dos veces el último mes al levantarse de la silla.",
          "a": [
            "Valorar equilibrio, fuerza de piernas, marcha, fármacos y riesgos del hogar",
            "Iniciar ejercicios de fuerza de piernas y registrar cómo evoluciona",
            "Recomendarle un bastón y enseñarle a usarlo para sentirse más segura"
          ],
          "ok": 0,
          "why": "Fortalecer y dar un bastón pueden ser parte del plan, pero las caídas repetidas se explican por varios factores. Primero se valora de forma completa para decidir qué intervenciones priorizar."
        },
        {
          "escena": "Un señor de 82 años se cayó en casa; tiene dolor en la ingle y no puede apoyar la pierna.",
          "a": [
            "Probar un apoyo parcial asistido para ver si tolera el dolor",
            "Evitar la carga y derivar a valoración médica con estudios de imagen",
            "Aplicar frío en la ingle y citarlo en unos días para reevaluar"
          ],
          "ok": 1,
          "why": "Dolor en la ingle con imposibilidad de apoyar tras una caída sugiere fractura de cadera hasta demostrar lo contrario. Probar la carga o esperar retrasa el diagnóstico y puede agravar la lesión."
        },
        {
          "escena": "Un paciente mayor tiene miedo a caerse y ya casi no sale de casa.",
          "a": [
            "Pedirle que salga a caminar solo para recuperar la confianza cuanto antes",
            "Sugerirle limitar sus salidas mientras avanza el tratamiento de fuerza",
            "Explicar el plan y reintroducir actividad segura con equilibrio y fuerza"
          ],
          "ok": 2,
          "why": "El miedo a caer reduce la actividad y aumenta el riesgo real. Lo mejor es reintroducir la actividad de forma segura y acompañada; exponerlo sin apoyo es arriesgado y limitar salidas refuerza el desuso."
        },
        {
          "escena": "Vas a indicar ejercicios de equilibrio de pie a una paciente mayor.",
          "a": [
            "Elegir superficie firme y apoyo estable a su alcance, con supervisión cercana",
            "Retarla con una superficie inestable porque ya camina bien en la clínica",
            "Dejar que los haga sola con las barras cerca mientras registras la sesión"
          ],
          "ok": 0,
          "why": "El equilibrio se reta de forma progresiva. Aunque camine bien, la prioridad es evitar una caída durante la sesión con un entorno seguro y vigilancia directa."
        }
      ]
    },
    {
      "id": "h-6",
      "n": 6,
      "titulo": "Fisioterapia pediátrica",
      "sub": "Jugar también es tratar",
      "imagen": "assets/retos/o-sesion.webp",
      "intro": "Los niños no son adultos pequeños. Hoy la clave es observar, jugar y hablar con la familia. Te acompaño.",
      "casos": [
        {
          "escena": "Una mamá llega preocupada porque su bebé de ocho meses aún no se sienta sin apoyo.",
          "a": [
            "Explicar que hay variaciones normales y citarlo de nuevo en unos meses",
            "Valorar el desarrollo motor completo y orientar, derivando si hay señales de alarma",
            "Enseñar a la familia posturas de sedestación asistida para practicar a diario"
          ],
          "ok": 1,
          "why": "Es cierto que hay variaciones normales, pero sin explorar no se pueden descartar alteraciones. Se valora primero y se orienta o deriva según los hallazgos."
        },
        {
          "escena": "Un niño de seis años con una alteración motora se aburre en la sesión y deja de cooperar.",
          "a": [
            "Acortar la sesión y mantener los mismos ejercicios para que no se canse",
            "Ofrecerle una recompensa si termina todas las repeticiones indicadas",
            "Convertir los ejercicios en juegos con objetivos funcionales que le interesen"
          ],
          "ok": 2,
          "why": "Acortar o premiar pueden ayudar un rato, pero la mejor decisión es mantener el objetivo terapéutico dentro de una actividad que le motive de verdad."
        },
        {
          "escena": "La familia de un niño en tratamiento pregunta qué pueden hacer en casa.",
          "a": [
            "Entregar el programa completo por escrito para que lo sigan al pie de la letra",
            "Enseñar pocas actividades sencillas, explicar su razón y revisarlas en la siguiente cita",
            "Pedirles que esperen a la siguiente sesión para evitar hacer algo incorrecto"
          ],
          "ok": 1,
          "why": "La familia es parte del tratamiento. Pocas indicaciones claras, entendidas y revisadas favorecen la constancia; un programa largo se abandona y esperar desaprovecha su apoyo."
        },
        {
          "escena": "Un niño que estaba bien al inicio de la sesión está decaído, con fiebre, y rechaza moverse.",
          "a": [
            "Hacer solo movilización pasiva suave y vigilar cómo responde",
            "Posponer la parte de fuerza y continuar con juego tranquilo",
            "Suspender la sesión, avisar a los padres y sugerir valoración médica"
          ],
          "ok": 2,
          "why": "La fiebre con decaimiento indica un posible proceso agudo. Por seguridad se suspende y se avisa a la familia, aunque la actividad suave parezca inofensiva."
        }
      ]
    },
    {
      "id": "h-7",
      "n": 7,
      "titulo": "Salud de la mujer y suelo pélvico",
      "sub": "Conversar con respeto y sin prisa",
      "imagen": "assets/retos/o-evaluacion.webp",
      "intro": "Este mundo exige tacto y confidencialidad. Valoramos, explicamos y pedimos permiso en cada paso.",
      "casos": [
        {
          "escena": "Una mujer refiere pérdida de orina al toser y quiere empezar ejercicios de suelo pélvico.",
          "a": [
            "Explicar el procedimiento, pedir su consentimiento y valorar antes de indicar ejercicios",
            "Enseñarle de inmediato contracciones del suelo pélvico para aprovechar la consulta",
            "Entregarle un folleto de ejercicios y revisar su evolución en un mes"
          ],
          "ok": 0,
          "why": "Los ejercicios pueden ser parte del plan, pero primero se explica, se obtiene el consentimiento y se valora para saber si debe contraer, relajar o ambas cosas."
        },
        {
          "escena": "Una paciente embarazada de 30 semanas llega con dolor lumbar.",
          "a": [
            "Indicar fortalecimiento abdominal acostada boca arriba para aliviar la lumbar",
            "Valorar, descartar banderas rojas y adaptar ejercicio y posturas al embarazo",
            "Recomendar reposo relativo y una faja lumbar hasta después del parto"
          ],
          "ok": 1,
          "why": "El dolor lumbar es frecuente en el embarazo y se maneja con ejercicio adaptado. El decúbito supino prolongado puede comprometer la circulación y el reposo con faja prolongado debilita."
        },
        {
          "escena": "En plena sesión, una paciente embarazada refiere dolor de cabeza intenso, visión borrosa y se ve hinchada.",
          "a": [
            "Pausar, darle agua y reiniciar con ejercicios de baja intensidad si mejora",
            "Indicarle reposo en casa y que consulte a su médico en la próxima cita",
            "Suspender la sesión y derivarla de inmediato a atención obstétrica urgente"
          ],
          "ok": 2,
          "why": "Esos síntomas pueden indicar un trastorno hipertensivo del embarazo, una urgencia. Esperar a ver si mejora o diferir la consulta pone en riesgo a la madre y al bebé."
        },
        {
          "escena": "Una paciente posparto con separación de rectos abdominales quiere volver a hacer abdominales clásicos.",
          "a": [
            "Valorar y empezar con activación profunda y progresión gradual antes de alta carga",
            "Permitir abdominales clásicos con vigilancia porque no refiere dolor",
            "Posponer todo trabajo abdominal hasta que cierre por completo la separación"
          ],
          "ok": 0,
          "why": "No sentir dolor no basta para cargar de golpe, y esperar sin trabajar tampoco ayuda. Se valora y se progresa desde la activación profunda."
        }
      ]
    },
    {
      "id": "h-8",
      "n": 8,
      "titulo": "Rehabilitación cardíaca",
      "sub": "Cuidar el corazón en movimiento",
      "imagen": "assets/retos/o-ejercicio.webp",
      "intro": "Aquí el corazón marca el ritmo. Vigilar los signos y escuchar al paciente es parte de cada ejercicio.",
      "casos": [
        {
          "escena": "Un paciente que sufrió un infarto hace un mes llega a su primera sesión de ejercicio.",
          "a": [
            "Iniciar con intensidad moderada porque su evolución clínica ha sido buena",
            "Revisar la autorización médica, tomar signos y empezar con actividad ligera vigilada",
            "Empezar el ejercicio y tomar los signos solo si refiere algún síntoma"
          ],
          "ok": 1,
          "why": "El ejercicio posinfarto exige autorización, monitoreo y progresión gradual. Una buena evolución no justifica saltarse el nivel inicial ni la vigilancia desde el primer minuto."
        },
        {
          "escena": "Durante el ejercicio, un paciente cardiópata refiere presión en el pecho que se irradia al brazo.",
          "a": [
            "Detener el ejercicio, sentarlo, vigilar signos y activar atención médica de urgencia",
            "Reducir la intensidad y observar si la molestia desaparece en pocos minutos",
            "Detenerlo, dejarlo descansar y reanudar cuando el dolor ceda por completo"
          ],
          "ok": 0,
          "why": "Detenerse es correcto, pero un dolor opresivo irradiado en un cardiópata debe valorarse como urgencia. No se reanuda ni se espera a que ceda sin atención médica."
        },
        {
          "escena": "Un paciente de rehabilitación cardíaca dice que hoy durmió mal y se siente muy cansado.",
          "a": [
            "Hacer la sesión completa con vigilancia para no romper la constancia",
            "Tomar signos, preguntar síntomas y ajustar la intensidad o posponer según hallazgos",
            "Suspender la sesión sin más porque el cansancio contraindica el ejercicio"
          ],
          "ok": 1,
          "why": "El estado del día cambia la respuesta al esfuerzo. Se valora y se decide con datos; ni forzar la rutina ni suspender sin revisar son decisiones fundamentadas."
        },
        {
          "escena": "Al terminar la sesión, un paciente cardiópata quiere irse de inmediato.",
          "a": [
            "Dejarlo ir tras estirar un par de minutos si dice sentirse bien",
            "Pedirle que se siente un momento y se vaya cuando se sienta listo",
            "Hacer vuelta a la calma gradual y confirmar que sus signos se estabilizan"
          ],
          "ok": 2,
          "why": "Sentirse bien no garantiza que los signos hayan vuelto a su nivel. La vuelta a la calma y la comprobación de signos evitan descensos bruscos de la presión."
        }
      ]
    },
    {
      "id": "h-9",
      "n": 9,
      "titulo": "Dolor cervical",
      "sub": "Cuello con cabeza",
      "imagen": "assets/retos/q-anatomia.webp",
      "intro": "El cuello es pequeño pero guarda mucho. Valorar bien antes de movilizar nos ahorra sustos.",
      "casos": [
        {
          "escena": "Una paciente joven llega con dolor cervical intenso después de un accidente de tránsito.",
          "a": [
            "Pedir valoración médica y estudios para descartar lesión grave antes de movilizar",
            "Hacer movilización suave de cuello dentro del rango sin dolor y reevaluar",
            "Aplicar calor local y masaje relajante para reducir el espasmo muscular"
          ],
          "ok": 0,
          "why": "Tras un trauma importante primero se descarta fractura o inestabilidad. Incluso una movilización suave o el masaje pueden ser riesgosos antes de tener ese descarte."
        },
        {
          "escena": "Un oficinista tiene dolor de cuello leve que empeora al final del día, sin otros síntomas.",
          "a": [
            "Aplicar terapia manual y calor en cada sesión hasta que desaparezca el dolor",
            "Valorar postura y hábitos de trabajo y programar ejercicio con pausas activas",
            "Recomendar un collarín blando durante la jornada para descansar el cuello"
          ],
          "ok": 1,
          "why": "La terapia pasiva puede aliviar, pero en el dolor mecánico leve lo mejor es abordar causas y fortalecer. El collarín prolongado debilita los músculos."
        },
        {
          "escena": "Un paciente de 60 años presenta dolor de cabeza repentino muy intenso, mareo y dificultad para hablar tras una sesión de cuello.",
          "a": [
            "Suspender, hacerlo recostar y observarlo unos minutos antes de decidir",
            "Pedir a un familiar que lo lleve a su médico de cabecera al día siguiente",
            "Suspender y activar atención médica de urgencia de inmediato"
          ],
          "ok": 2,
          "why": "Estos síntomas pueden indicar un evento vascular, y cada minuto cuenta. Observar o diferir la atención retrasa un tratamiento urgente."
        },
        {
          "escena": "Una paciente refiere hormigueo en el brazo al girar el cuello hacia un lado.",
          "a": [
            "Explorar de forma neurológica básica y documentar hallazgos antes de decidir",
            "Aplicar tracción cervical suave para descomprimir y valorar la respuesta",
            "Indicar ejercicios de movilidad del cuello y reevaluar en la siguiente sesión"
          ],
          "ok": 0,
          "why": "El hormigueo puede reflejar irritación de una raíz nerviosa. Antes de tratar se explora y se documenta; la tracción o la movilidad sin esa información pueden irritar más."
        }
      ]
    },
    {
      "id": "h-10",
      "n": 10,
      "titulo": "Hombro doloroso",
      "sub": "Del dolor a la función",
      "imagen": "assets/retos/q-ortopedia.webp",
      "intro": "El hombro es la articulación más móvil y la más caprichosa. Aquí el orden y la paciencia ganan.",
      "casos": [
        {
          "escena": "Un paciente con dolor de hombro al elevar el brazo pide que le hagas un masaje fuerte.",
          "a": [
            "Combinar masaje moderado con ejercicios de movilidad y ver cómo responde",
            "Indicar reposo del brazo con cabestrillo unos días para calmar el dolor",
            "Valorar movilidad, fuerza y pruebas del manguito antes de decidir el tratamiento"
          ],
          "ok": 2,
          "why": "Sin saber qué estructura duele, cualquier tratamiento es una apuesta. Se valora primero; el reposo con cabestrillo, además, favorece la rigidez."
        },
        {
          "escena": "Un paciente de 55 años con hombro doloroso refiere también dolor en el pecho al esfuerzo.",
          "a": [
            "Detener la valoración del hombro y derivar a médico por posible origen cardíaco",
            "Valorar el cuello para ver si el dolor al esfuerzo es referido desde ahí",
            "Bajar la intensidad de los ejercicios de hombro y vigilar si el dolor persiste"
          ],
          "ok": 0,
          "why": "Valorar el cuello es razonable, pero el dolor torácico al esfuerzo obliga a priorizar el descarte de una causa cardíaca por seguridad del paciente."
        },
        {
          "escena": "Una paciente tiene hombro congelado: muy rígido y doloroso al mover.",
          "a": [
            "Movilizar hasta el límite del rango en cada sesión para ganar amplitud",
            "Movilidad suave dentro del dolor tolerable con educación sobre su evolución lenta",
            "Mantener el brazo en reposo hasta que el dolor ceda y luego movilizar"
          ],
          "ok": 1,
          "why": "Forzar el rango aumenta el dolor y la irritabilidad, y el reposo prolongado aumenta la rigidez. Se trabaja dentro de lo tolerable y se explica el curso lento."
        },
        {
          "escena": "Un paciente con tendinopatía del manguito mejora, pero su trabajo implica cargar brazos sobre la cabeza.",
          "a": [
            "Plan de fuerza progresivo y retomar su ritmo laboral completo desde ya",
            "Reposo laboral completo hasta que desaparezca el dolor y luego retomar",
            "Plan de fuerza progresivo y adaptación temporal de las cargas laborales"
          ],
          "ok": 2,
          "why": "Los tres puntos parecen razonables, pero volver a la carga completa antes de tiempo reaviva el tendón y el reposo total pierde capacidad. Se combina fuerza con ajuste temporal."
        }
      ]
    },
    {
      "id": "h-11",
      "n": 11,
      "titulo": "Cadera y prótesis",
      "sub": "Recuperar el paso con seguridad",
      "imagen": "assets/retos/o-ejercicio.webp",
      "intro": "Una prótesis de cadera cambia la vida, siempre que se cuiden las indicaciones. Aprenderás a proteger y a progresar.",
      "casos": [
        {
          "escena": "Un paciente operado de prótesis de cadera el día anterior quiere cruzar las piernas en la cama.",
          "a": [
            "Recordar las precauciones del cirujano y ayudarle a colocarse de forma segura",
            "Permitirlo si no refiere dolor, ya que la cadera no se está forzando",
            "Indicarle que evite todo movimiento de la cadera hasta la primera revisión"
          ],
          "ok": 0,
          "why": "La ausencia de dolor no protege de una luxación. Se siguen las precauciones indicadas, pero sin inmovilizar por completo, que retrasa la recuperación."
        },
        {
          "escena": "Una paciente con prótesis reciente refiere dolor intenso nuevo, acortamiento y rotación de la pierna tras un movimiento brusco.",
          "a": [
            "Inmovilizar con vendaje y citarla para valoración en pocos días",
            "Evitar mover la pierna y derivar de forma urgente por posible luxación",
            "Intentar una movilización suave para ver si la cadera recupera su posición"
          ],
          "ok": 1,
          "why": "Dolor súbito con deformidad es urgencia. No se intenta reducir y tampoco se difiere la atención con un vendaje."
        },
        {
          "escena": "Un paciente con prótesis camina bien con andador y pide pasar a bastón.",
          "a": [
            "Probar el bastón en el pasillo con vigilancia y decidir según se vea",
            "Mantener el andador hasta que el cirujano retire todas las restricciones",
            "Valorar fuerza, equilibrio y marcha antes de progresar la ayuda técnica"
          ],
          "ok": 2,
          "why": "Probar sin valoración previa expone a una caída, y mantener la ayuda sin límite retrasa la autonomía. La decisión se basa en una valoración objetiva."
        },
        {
          "escena": "Un paciente con prótesis cuenta que tiene una pantorrilla caliente, roja e hinchada de un solo lado.",
          "a": [
            "Elevar la pierna, aplicar frío y reevaluar la pantorrilla en la siguiente sesión",
            "Suspender el ejercicio y derivar de inmediato por sospecha de trombosis venosa",
            "Reducir el ejercicio a movimientos de tobillo para favorecer la circulación"
          ],
          "ok": 1,
          "why": "Los signos sugieren trombosis venosa profunda. El movimiento puede desprender un coágulo, y esperar a reevaluar retrasa un diagnóstico urgente."
        }
      ]
    },
    {
      "id": "h-12",
      "n": 12,
      "titulo": "Rodilla y menisco",
      "sub": "Moverse sin forzar",
      "imagen": "assets/retos/q-ortopedia.webp",
      "intro": "La rodilla soporta mucho y perdona poco. Escucha el bloqueo, el dolor y la historia.",
      "casos": [
        {
          "escena": "Un paciente joven se torció la rodilla jugando y siente que se le bloquea y no la extiende.",
          "a": [
            "Probar movimientos suaves de flexión y extensión para ver si el bloqueo cede",
            "Aplicar frío y reevaluar en 48 horas antes de decidir si derivar",
            "Derivar a valoración médica porque puede haber un fragmento meniscal atrapado"
          ],
          "ok": 2,
          "why": "Un bloqueo mecánico sugiere un menisco desgarrado. Insistir en moverla o esperar puede agravar el daño; lo prudente es derivar."
        },
        {
          "escena": "Una persona de 60 años con dolor de rodilla por desgaste quiere dejar de moverse para no empeorar.",
          "a": [
            "Educar y recomendar fuerza y actividad aeróbica adaptada al dolor",
            "Sugerir actividad de bajo impacto y evitar ejercicios de fuerza por la articulación",
            "Aconsejar reducir la actividad y reservar la rodilla hasta que duela menos"
          ],
          "ok": 0,
          "why": "El ejercicio de fuerza y aeróbico reduce el dolor y mejora la función en la artrosis. Evitar la fuerza o reservar la rodilla es una recomendación común, pero contraproducente."
        },
        {
          "escena": "Tras una meniscectomía, el paciente quiere correr a la segunda semana porque se siente bien.",
          "a": [
            "Permitir trotar suave si tolera caminar largos tramos sin molestias",
            "Basar el retorno a correr en criterios funcionales y no en el tiempo ni el dolor",
            "Esperar el plazo habitual de cirugía y autorizar el retorno al cumplirse"
          ],
          "ok": 1,
          "why": "Ni el dolor ni el calendario deciden por sí solos. Se evalúan fuerza, control y tolerancia a la carga antes de progresar."
        },
        {
          "escena": "Un paciente tiene una rodilla muy inflamada y caliente sin golpe previo, con fiebre.",
          "a": [
            "Suspender el tratamiento y reevaluar en unos días si continúa la fiebre",
            "Aplicar frío y ejercicios isométricos suaves mientras baja la inflamación",
            "Derivar a valoración médica por sospecha de infección articular"
          ],
          "ok": 2,
          "why": "Articulación caliente, inflamada y con fiebre sin trauma puede ser una infección, que es urgencia médica. Reevaluar después o ejercitar la rodilla retrasa la atención."
        }
      ]
    },
    {
      "id": "h-13",
      "n": 13,
      "titulo": "Pie y tobillo",
      "sub": "La base de todo movimiento",
      "imagen": "assets/retos/q-anatomia.webp",
      "intro": "Si la base falla, todo lo demás lo paga. Vamos a revisar pies, tobillos y apoyos.",
      "casos": [
        {
          "escena": "Un paciente con esguince de tobillo ya apoya sin dolor, pero se siente inseguro.",
          "a": [
            "Trabajar equilibrio y propiocepción con progresión gradual de dificultad",
            "Continuar fortaleciendo el tobillo con banda y dar el alta al no tener dolor",
            "Recomendar vendaje funcional en las actividades y reevaluar en el futuro"
          ],
          "ok": 0,
          "why": "Fuerza y vendaje ayudan, pero la inseguridad indica déficit de control. Entrenar equilibrio y propiocepción reduce el riesgo de recaída."
        },
        {
          "escena": "Una paciente tiene dolor en el talón al dar los primeros pasos de la mañana.",
          "a": [
            "Indicar estiramientos de la pantorrilla y la fascia y reevaluar si no mejora",
            "Valorar carga, calzado y flexibilidad y proponer estiramientos y fuerza progresivos",
            "Recomendar plantillas y reposo de las actividades que provocan el dolor"
          ],
          "ok": 1,
          "why": "Estirar o usar plantillas puede ser útil, pero la valoración de los factores de carga permite un plan completo; el reposo de actividades por sí solo no resuelve."
        },
        {
          "escena": "Un paciente con diabetes tiene una herida en la planta del pie que no cicatriza.",
          "a": [
            "Derivar a valoración médica y evitar cargar sobre la lesión",
            "Limpiar la zona, cubrirla y seguir con ejercicios sin apoyar sobre ella",
            "Mantener ejercicios de pie con un vendaje de protección en la planta"
          ],
          "ok": 0,
          "why": "En el pie diabético una herida que no cicatriza requiere atención médica pronta. Curarla y seguir ejercitando retrasa el tratamiento y arriesga una infección."
        },
        {
          "escena": "Una persona refiere que su pie se pone frío y pálido y le duele al caminar distancias cortas.",
          "a": [
            "Proponer caminata progresiva y vigilar la distancia que tolera",
            "Derivar a valoración médica por posible alteración circulatoria",
            "Aplicar masaje en el pie y la pierna para favorecer la circulación"
          ],
          "ok": 1,
          "why": "El ejercicio forma parte del manejo de ciertos problemas arteriales, pero solo con diagnóstico. Primero se descarta una alteración circulatoria, no se masajea ni se prueba."
        }
      ]
    },
    {
      "id": "h-14",
      "n": 14,
      "titulo": "Ergonomía laboral",
      "sub": "Trabajar sin dolerse",
      "imagen": "assets/retos/o-evaluacion.webp",
      "intro": "Muchas lesiones nacen en el escritorio o en la línea de producción. Prevenir también es fisioterapia.",
      "casos": [
        {
          "escena": "Una empleada de oficina tiene dolor de espalda al final de la jornada.",
          "a": [
            "Enseñar ejercicios de espalda para hacer en casa y reevaluar en un mes",
            "Recomendar una silla ergonómica nueva sin revisar cómo trabaja ahora",
            "Valorar su puesto y rutina y sugerir ajustes y pausas activas"
          ],
          "ok": 2,
          "why": "Los ejercicios y el mobiliario ayudan, pero sin analizar su puesto no se sabe qué cambiar. La valoración del puesto orienta las pausas y los ajustes."
        },
        {
          "escena": "Un trabajador de almacén levanta cajas pesadas y refiere dolor lumbar.",
          "a": [
            "Enseñar técnicas de levantamiento, revisar la carga y fortalecer progresivamente",
            "Recomendar faja lumbar durante la jornada y pausas frecuentes",
            "Indicar reposo de varios días y retomar el trabajo cuando ya no duela"
          ],
          "ok": 0,
          "why": "La faja y el reposo alivian a corto plazo pero no corrigen la causa. Técnica, carga y fortalecimiento previenen la recurrencia."
        },
        {
          "escena": "Una trabajadora tiene hormigueo en las manos al teclear, sobre todo por las noches.",
          "a": [
            "Aconsejar férula nocturna y reevaluar sin explorar fuerza ni sensibilidad",
            "Valorar por posible túnel del carpo, ajustar la tarea y derivar si hay compresión importante",
            "Enseñar estiramientos de muñeca y mantener la misma carga de teclado"
          ],
          "ok": 1,
          "why": "La férula y los estiramientos son medidas comunes, pero sin explorar no se sabe la gravedad, y mantener la carga perpetúa la compresión."
        },
        {
          "escena": "La empresa te pide recomendaciones generales para su personal de oficina.",
          "a": [
            "Entregar una guía con la postura ideal para sentarse toda la jornada",
            "Ofrecer una charla general y valorar solo a quien tenga dolor",
            "Proponer pausas, variar posturas y ajustar el mobiliario, explicado de forma sencilla"
          ],
          "ok": 2,
          "why": "La mejor postura es la siguiente: no hay una sola. Cambiar de posición y hacer pausas funciona mejor que una postura única."
        }
      ]
    },
    {
      "id": "h-15",
      "n": 15,
      "titulo": "Dolor crónico",
      "sub": "Entender el dolor para tratarlo mejor",
      "imagen": "assets/retos/q-neuro.webp",
      "intro": "El dolor que dura meses no es solo una lesión que no cierra. Escuchar es la mitad del tratamiento.",
      "casos": [
        {
          "escena": "Una paciente con dolor crónico dice que ya nadie le cree que le duela.",
          "a": [
            "Escucharla, validar su experiencia y explicar cómo funciona el dolor persistente",
            "Asegurarle que su dolor es real y enfocar la sesión en el plan de ejercicios",
            "Explicarle que el dolor sin lesión visible suele ser de origen emocional"
          ],
          "ok": 0,
          "why": "Pasar rápido al ejercicio sin escuchar pierde la alianza, y atribuirlo a lo emocional invalida su vivencia. Validar y educar mejora la confianza."
        },
        {
          "escena": "Un paciente con dolor crónico de espalda evita moverse por miedo a hacerse daño.",
          "a": [
            "Empezar con relajación y posponer el movimiento hasta que confíe más",
            "Indicar ejercicios de fortalecimiento de alta exigencia para vencer el miedo",
            "Exponerlo de forma gradual a la actividad con objetivos funcionales acordados"
          ],
          "ok": 2,
          "why": "La relajación puede ayudar, pero posponer el movimiento mantiene el miedo. La exposición gradual con metas acordadas es lo que mejora la función."
        },
        {
          "escena": "Un paciente con dolor crónico refiere pérdida de peso sin explicación y dolor nocturno que no cede con el reposo.",
          "a": [
            "Derivar a valoración médica por señales de alarma",
            "Reducir el ejercicio y vigilar si el dolor nocturno cede en dos semanas",
            "Revisar sus hábitos de sueño y estrés antes de plantear otras causas"
          ],
          "ok": 0,
          "why": "Pérdida de peso inexplicable y dolor nocturno son banderas rojas. Esperar o buscar causas benignas primero retrasa el descarte de algo grave."
        },
        {
          "escena": "Tras tres sesiones, tu paciente con dolor crónico dice que no ha mejorado nada.",
          "a": [
            "Mantener el plan unas sesiones más porque el dolor crónico mejora lento",
            "Revisar con él los objetivos, medir con escalas funcionales y ajustar el plan",
            "Cambiar de técnica en la siguiente sesión para probar otra opción"
          ],
          "ok": 1,
          "why": "Esperar o cambiar al azar no es evaluar. Se revisa con datos qué ha cambiado y qué metas importan al paciente para ajustar el plan."
        }
      ]
    },
    {
      "id": "h-16",
      "n": 16,
      "titulo": "Oncología y linfedema",
      "sub": "Acompañar con precaución",
      "imagen": "assets/retos/o-sesion.webp",
      "intro": "Aquí la prudencia es clave. Acompañamos a personas que han pasado por mucho, siempre con el equipo médico.",
      "casos": [
        {
          "escena": "Una paciente tras cirugía de mama nota que su brazo se hincha poco a poco.",
          "a": [
            "Elevar el brazo y enseñar ejercicios suaves de movilidad mientras observa",
            "Aplicar masaje de drenaje en el brazo sin esperar indicación del equipo",
            "Valorar, medir ambos brazos, cuidar la piel y coordinar con su equipo médico"
          ],
          "ok": 2,
          "why": "Elevar y mover suavemente puede ayudar, pero el aumento de volumen requiere valoración y manejo coordinado. El masaje sin indicación puede ser perjudicial."
        },
        {
          "escena": "Un paciente en quimioterapia llega muy cansado y con análisis de sangre con valores bajos.",
          "a": [
            "Revisar con el equipo médico y adaptar con ejercicio suave y vigilancia de síntomas",
            "Hacer la sesión habitual con descansos largos y vigilar su cansancio",
            "Posponer el ejercicio hasta que terminen los ciclos de tratamiento"
          ],
          "ok": 0,
          "why": "Con valores bajos se coordina con el equipo y se adapta. Mantener la sesión habitual es arriesgado, y suspender del todo pierde los beneficios del ejercicio."
        },
        {
          "escena": "Una paciente con metástasis óseas refiere dolor nuevo y localizado en la cadera al caminar.",
          "a": [
            "Continuar la marcha asistida con andador y reevaluar el dolor mañana",
            "Limitar la carga y avisar de inmediato al equipo médico por riesgo de fractura",
            "Cambiar a ejercicios sentada y documentar el dolor para la siguiente consulta"
          ],
          "ok": 1,
          "why": "Dolor nuevo en un hueso con metástasis puede anunciar una fractura. Documentar es necesario, pero la prioridad es proteger el hueso y avisar ahora."
        },
        {
          "escena": "Un paciente oncológico pregunta si puede hacer ejercicio.",
          "a": [
            "Indicar ejercicio suave de forma general sin esperar respuesta del médico",
            "Sugerir esperar al fin de los tratamientos para evitar complicaciones",
            "Explicar que suele ser beneficioso adaptado y coordinarlo con su médico"
          ],
          "ok": 2,
          "why": "El ejercicio adaptado suele mejorar fatiga y calidad de vida, pero cada caso es distinto. Se personaliza con el equipo médico en lugar de generalizar o postergar."
        }
      ]
    },
    {
      "id": "h-17",
      "n": 17,
      "titulo": "Amputados y prótesis",
      "sub": "Equilibrio entre cuidado y autonomía",
      "imagen": "assets/retos/o-ejercicio.webp",
      "intro": "Cada persona con amputación tiene su propio camino. Cuidar el muñón y entrenar el equilibrio van de la mano.",
      "casos": [
        {
          "escena": "Un paciente recién amputado de la pierna refiere dolor en el pie que ya no tiene.",
          "a": [
            "Explicarle que es una sensación frecuente y que desaparecerá con el tiempo",
            "Explicar el dolor de miembro fantasma, validarlo y coordinar el manejo con el médico",
            "Aplicar masaje en el muñón y observar si la sensación disminuye"
          ],
          "ok": 1,
          "why": "Tranquilizar sin plan deja al paciente solo con el dolor, y el masaje sin valoración puede no ayudar. Se valida y se maneja en equipo."
        },
        {
          "escena": "Un paciente con amputación tiene una zona enrojecida y con herida en el muñón después de usar la prótesis.",
          "a": [
            "Acolchar la zona con un forro extra y seguir con la marcha corta",
            "Continuar el entrenamiento y revisar la piel al final de la sesión",
            "Retirar la prótesis, revisar la piel y comunicar el hallazgo antes de continuar"
          ],
          "ok": 2,
          "why": "Acolchar o diferir la revisión mantiene la fricción sobre una herida. Las lesiones de piel en el muñón se atienden antes de seguir cargando."
        },
        {
          "escena": "Tu paciente amputado de rodilla hacia abajo empieza a entrenar la marcha con prótesis.",
          "a": [
            "Entrenar en barras paralelas con progresión de carga y supervisión cercana",
            "Empezar con andador y avanzar al pasillo en la misma sesión si lo tolera",
            "Posponer la marcha hasta lograr gran fuerza de cuádriceps en camilla"
          ],
          "ok": 0,
          "why": "El entorno más seguro y controlado son las barras. Pasar al pasillo el mismo día es demasiado rápido y esperar fuerza máxima retrasa el aprendizaje de la marcha."
        },
        {
          "escena": "Con las semanas, el muñón cambia de volumen y la prótesis ya no ajusta bien.",
          "a": [
            "Añadir calcetines de ajuste y revisar la piel en cada sesión",
            "Informar al equipo protésico para valorar el ajuste y evitar roces",
            "Reducir las horas de uso y esperar a que se estabilice el volumen"
          ],
          "ok": 1,
          "why": "Los calcetines o reducir el uso pueden aliviar de forma temporal, pero un mal ajuste debe corregirlo el equipo protésico para evitar lesiones."
        }
      ]
    },
    {
      "id": "h-18",
      "n": 18,
      "titulo": "Deporte y retorno al juego",
      "sub": "Volver bien, no volver rápido",
      "imagen": "assets/retos/o-ejercicio.webp",
      "intro": "Todo deportista quiere volver ya. Nuestro trabajo es que vuelva y se quede.",
      "casos": [
        {
          "escena": "Un futbolista lesionado dice que ya no le duele y quiere jugar el fin de semana.",
          "a": [
            "Autorizar un retorno parcial en entrenamientos si completa un trote sin dolor",
            "Esperar a la fecha prevista en el plan antes de volver a competir",
            "Evaluar fuerza, control y tolerancia a la carga con pruebas funcionales antes de autorizar"
          ],
          "ok": 2,
          "why": "Un trote sin dolor no prueba que soporte la demanda del juego, y el calendario por sí solo tampoco. El retorno se decide con criterios objetivos."
        },
        {
          "escena": "Una corredora aumentó mucho los kilómetros de golpe y ahora tiene dolor en la espinilla.",
          "a": [
            "Reducir la carga, valorar el cuadro y reintroducir el entrenamiento de manera progresiva",
            "Mantener los kilómetros y añadir fortalecimiento para que el cuerpo se adapte",
            "Cambiar a superficies blandas y seguir con el mismo volumen semanal"
          ],
          "ok": 0,
          "why": "El aumento brusco de carga es la causa frecuente. Fortalecer o cambiar de superficie ayuda, pero mantener el volumen perpetúa la sobrecarga."
        },
        {
          "escena": "Un atleta tras una conmoción cerebral dice sentirse bien y quiere regresar al entrenamiento.",
          "a": [
            "Dejarlo volver al entrenamiento sin contacto y vigilar si hay síntomas",
            "Seguir un retorno gradual por etapas con autorización médica",
            "Permitirlo si pasa una prueba de esfuerzo sin síntomas en la clínica"
          ],
          "ok": 1,
          "why": "Sentirse bien no basta. El retorno tras una conmoción es escalonado y requiere autorización médica; una sola prueba no es suficiente."
        },
        {
          "escena": "Un adolescente deportista tiene dolor persistente en la rodilla y no quiere decírselo al entrenador.",
          "a": [
            "Hablar con él, valorar y, con su permiso, coordinar los ajustes con entrenador y familia",
            "Explicar la situación al entrenador para ajustar las cargas de inmediato",
            "Valorar la rodilla y aconsejarle que lo comente cuando se sienta listo"
          ],
          "ok": 0,
          "why": "Avisar sin su permiso rompe la confidencialidad y dejarlo solo con el problema no resuelve la carga. Se trabaja la confianza y se coordina con su consentimiento."
        }
      ]
    },
    {
      "id": "h-19",
      "n": 19,
      "titulo": "Electroterapia y agentes físicos",
      "sub": "Aplicar con criterio y seguridad",
      "imagen": "assets/retos/o-sesion.webp",
      "intro": "Los equipos ayudan cuando se usan con indicación y revisión. Sin criterio solo hacen ruido, o algo peor.",
      "casos": [
        {
          "escena": "Vas a aplicar un agente físico a un paciente con marcapasos.",
          "a": [
            "Aplicarla lejos del tórax y en el nivel más bajo, vigilando al paciente",
            "Verificar contraindicaciones y consultar al médico antes de aplicar electroterapia",
            "Usar otro agente físico sin revisar si también tiene contraindicaciones"
          ],
          "ok": 1,
          "why": "Alejarse del tórax o bajar la intensidad no elimina el riesgo. Por seguridad se consulta antes, y cada agente se revisa por separado."
        },
        {
          "escena": "Antes de colocar electrodos revisas la piel del paciente.",
          "a": [
            "Colocarlos y explicar la sensación una vez comenzada la aplicación",
            "Limpiar la piel con alcohol y colocarlos junto al borde de la lesión",
            "Comprobar que la piel esté íntegra y sensible y explicar lo que sentirá"
          ],
          "ok": 2,
          "why": "Se verifica la piel y se informa antes de empezar. Explicar después o colocar cerca de una lesión añade riesgo y quita confianza."
        },
        {
          "escena": "Una paciente con pérdida de sensibilidad en el pie pide calor local.",
          "a": [
            "Valorar la sensibilidad y evitar el calor o usarlo con extrema precaución",
            "Aplicar calor suave por poco tiempo y revisar la piel al terminar",
            "Usar calor y pedirle que avise de cualquier molestia durante la aplicación"
          ],
          "ok": 0,
          "why": "Con sensibilidad disminuida no puede avisar si se está quemando, así que depender de su aviso o revisar después no previene la lesión."
        },
        {
          "escena": "Durante la aplicación, el paciente refiere molestia o dolor en la zona.",
          "a": [
            "Reposicionar los electrodos y continuar si la molestia disminuye",
            "Detener el equipo, revisar la aplicación y documentar lo ocurrido",
            "Reducir la intensidad y terminar el tiempo previsto de la sesión"
          ],
          "ok": 1,
          "why": "Reposicionar o bajar la intensidad puede ser útil, pero ante dolor lo primero es parar, revisar qué pasó y dejarlo registrado."
        }
      ]
    },
    {
      "id": "h-20",
      "n": 20,
      "titulo": "Terapia manual",
      "sub": "Manos con criterio",
      "imagen": "assets/retos/o-sesion.webp",
      "intro": "Las manos son una herramienta valiosa, pero siempre al servicio de una valoración y del consentimiento.",
      "casos": [
        {
          "escena": "Vas a aplicar una técnica manual a un paciente que no la conoce.",
          "a": [
            "Confirmar que firmó el consentimiento general de ingreso y aplicarla",
            "Demostrar la técnica en tu propio brazo y aplicarla sin preguntar más",
            "Explicar lo que harás y por qué, y pedir su consentimiento"
          ],
          "ok": 2,
          "why": "El consentimiento de ingreso no cubre cada técnica, y demostrar no es pedir permiso. Se explica y se obtiene su aceptación antes de tocar."
        },
        {
          "escena": "Un paciente presenta dolor de espalda y fiebre, y tiene antecedente de cáncer.",
          "a": [
            "Derivar a valoración médica en lugar de aplicar manipulación",
            "Aplicar movilización suave y vigilar si la fiebre aumenta",
            "Tratar la zona con técnicas de tejidos blandos y anotar la fiebre"
          ],
          "ok": 0,
          "why": "Dolor de espalda con fiebre y antecedente oncológico es una combinación de alarma. Aunque la técnica sea suave, la prioridad es la valoración médica."
        },
        {
          "escena": "En plena técnica, el paciente dice que le duele más de lo esperado.",
          "a": [
            "Reducir la presión y continuar con la misma técnica hasta terminar",
            "Cambiar de región y volver a la zona al final de la sesión",
            "Suspender la técnica, preguntar y reconsiderar la valoración o la forma de aplicarla"
          ],
          "ok": 2,
          "why": "Bajar la presión puede bastar, pero un dolor mayor al esperado es señal de detenerse y revisar si la técnica es la adecuada."
        },
        {
          "escena": "Una paciente con osteoporosis severa necesita movilización de columna.",
          "a": [
            "Adaptar las técnicas con suavidad y evitar maniobras de alta velocidad o fuerza",
            "Aplicar la técnica habitual con menor presión y vigilar su respuesta",
            "Evitar la movilización de columna y limitarse a tratar tejidos blandos"
          ],
          "ok": 0,
          "why": "Solo bajar la presión no cambia el tipo de maniobra, y evitar toda movilización limita el tratamiento. Se eligen técnicas suaves y adaptadas."
        }
      ]
    },
    {
      "id": "h-21",
      "n": 21,
      "titulo": "Hidroterapia",
      "sub": "Con el agua a favor",
      "imagen": "assets/retos/o-ejercicio.webp",
      "intro": "El agua alivia peso y ofrece resistencia, pero también tiene sus riesgos. Revisemos antes de meternos.",
      "casos": [
        {
          "escena": "Una paciente con una herida abierta quiere iniciar el programa en alberca.",
          "a": [
            "Cubrir con apósito impermeable y permitir ejercicio suave en la alberca",
            "Esperar el cierre o la autorización médica y proteger la piel",
            "Permitir solo ejercicio en la zona poco profunda con el apósito"
          ],
          "ok": 1,
          "why": "El apósito no garantiza protección y la herida expone a infección. Se espera el cierre o la autorización médica."
        },
        {
          "escena": "Un paciente con fiebre y diarrea quiere asistir a la sesión de hidroterapia.",
          "a": [
            "Permitir la sesión en el área menos concurrida de la alberca",
            "Hacer una sesión corta y pedirle que no entre al agua más de lo necesario",
            "Posponer la sesión por seguridad suya y de los demás usuarios"
          ],
          "ok": 2,
          "why": "Una infección activa contraindica la alberca por el riesgo para él y para otros. Acortar o aislar la sesión no elimina ese riesgo."
        },
        {
          "escena": "Vas a empezar una sesión con adultos mayores en la alberca.",
          "a": [
            "Revisar su estado, explicar las reglas de seguridad y supervisar de cerca",
            "Pedir a los más autónomos que guíen a los demás mientras tú observas",
            "Dar las indicaciones desde la orilla y revisar su estado al terminar"
          ],
          "ok": 0,
          "why": "La seguridad en el agua exige revisar antes y supervisar de cerca. Delegar en otros pacientes o revisar al final deja huecos importantes."
        },
        {
          "escena": "Un paciente cardiópata se agita más de lo habitual dentro del agua.",
          "a": [
            "Pedirle que descanse dentro del agua y reanudar cuando se calme",
            "Detener, sacarlo del agua con cuidado, vigilar signos y avisar al equipo médico",
            "Reducir el ritmo de los ejercicios y continuar con vigilancia constante"
          ],
          "ok": 1,
          "why": "La inmersión modifica la carga cardíaca. Ante agitación inusual lo seguro es salir del agua, vigilar signos y avisar; descansar adentro o seguir mantiene el riesgo."
        }
      ]
    },
    {
      "id": "h-22",
      "n": 22,
      "titulo": "Comunicación y ética",
      "sub": "Hablar claro, actuar con ética",
      "imagen": "assets/retos/dia.webp",
      "intro": "Lo que dices y cómo lo dices también cura. Y lo que callas también cuenta.",
      "casos": [
        {
          "escena": "Un paciente te pide que le des un diagnóstico médico definitivo.",
          "a": [
            "Darle una impresión clínica general y recomendar que la confirme con su médico",
            "Decirle que no es tu competencia y que consulte en otro lugar",
            "Explicar el alcance de tu valoración y derivar a un médico para el diagnóstico"
          ],
          "ok": 2,
          "why": "Una impresión informal puede confundir, y negarse sin explicar lo deja desamparado. Se aclara lo que corresponde a la fisioterapia y se deriva lo demás."
        },
        {
          "escena": "Un familiar te pide los resultados de otro paciente al que vio en la sala de espera.",
          "a": [
            "Compartir solo datos generales sin nombre para tranquilizar al familiar",
            "Mantener la confidencialidad y no compartir información de otros pacientes",
            "Compartir la información si el familiar parece de confianza del paciente"
          ],
          "ok": 1,
          "why": "Incluso datos generales o la apariencia de confianza pueden revelar información. Sin consentimiento del paciente no se comparte."
        },
        {
          "escena": "Notas que un colega aplica una técnica que podría ser riesgosa para un paciente.",
          "a": [
            "Anotar lo observado y comentarlo en la próxima reunión de equipo",
            "Intervenir de inmediato frente al paciente para corregir la técnica",
            "Hablar con tu colega con respeto y, si persiste el riesgo, informar al responsable"
          ],
          "ok": 2,
          "why": "Esperar a la reunión mantiene el riesgo y corregir frente al paciente daña la confianza. La seguridad se aborda de forma directa, respetuosa y por el canal correcto."
        },
        {
          "escena": "Un paciente no entiende su plan de tratamiento pero asiente por vergüenza.",
          "a": [
            "Reexplicar con palabras sencillas, comprobar que entendió y registrar su acuerdo",
            "Entregarle por escrito el plan completo y pedirle que lo lea en casa",
            "Resumir el plan en dos frases y avanzar si no hace más preguntas"
          ],
          "ok": 0,
          "why": "El consentimiento solo vale si se entiende. Un texto largo o un resumen sin verificar no aseguran la comprensión."
        }
      ]
    },
    {
      "id": "h-23",
      "n": 23,
      "titulo": "Bioseguridad en la clínica",
      "sub": "Cuidar al otro y a ti",
      "imagen": "assets/retos/o-sesion.webp",
      "intro": "La bioseguridad no es opcional. Cada hábito protege al paciente, a tu equipo y a ti.",
      "casos": [
        {
          "escena": "Terminas con un paciente y vas a atender al siguiente.",
          "a": [
            "Usar gel desinfectante en las manos y cambiar solo la sábana de la camilla",
            "Lavarte las manos o usar el desinfectante indicado y limpiar las superficies de contacto",
            "Limpiar las superficies al final del día, cuando termine la agenda"
          ],
          "ok": 1,
          "why": "Cambiar solo la sábana o limpiar al final del día deja superficies de contacto contaminadas entre pacientes. La higiene se hace entre cada atención."
        },
        {
          "escena": "Se te cae al piso una toalla usada durante la sesión.",
          "a": [
            "Levantarla, sacudirla y usarla solo en una zona que no toque la piel",
            "Reservarla para el mismo paciente en la siguiente sesión sin lavar",
            "Retirarla como ropa usada y no reutilizarla sin lavarla"
          ],
          "ok": 2,
          "why": "Sacudir no descontamina y reservarla sin lavar conserva el riesgo. El material contaminado se procesa antes de volver a usarlo."
        },
        {
          "escena": "Un paciente con tos y fiebre llega a la clínica.",
          "a": [
            "Aplicar las medidas de protección de la clínica y valorar si se pospone o se deriva",
            "Atenderlo al final de la agenda con cubrebocas solo para ti",
            "Atenderlo con normalidad y ventilar el consultorio al terminar"
          ],
          "ok": 0,
          "why": "Atenderlo con medidas parciales expone a los demás. Se protege a pacientes y personal y se valora posponer o derivar."
        },
        {
          "escena": "Te lastimas con un objeto punzante contaminado.",
          "a": [
            "Lavar la zona, curarla y avisar solo si presenta síntomas",
            "Lavar la zona, reportar el incidente y seguir el protocolo de exposición",
            "Reportarlo al terminar la jornada para no interrumpir la atención"
          ],
          "ok": 1,
          "why": "Muchas infecciones no dan síntomas al inicio y el tiempo importa para la profilaxis. Se reporta de inmediato y se sigue el protocolo."
        }
      ]
    },
    {
      "id": "h-24",
      "n": 24,
      "titulo": "Diabetes e hipertensión",
      "sub": "Ejercicio seguro con enfermedad crónica",
      "imagen": "assets/retos/o-ejercicio.webp",
      "intro": "El ejercicio es medicina para estas condiciones, pero hay que mirar los números antes de empezar.",
      "casos": [
        {
          "escena": "Un paciente con diabetes llega mareado, sudoroso y tembloroso al empezar la sesión.",
          "a": [
            "Suspender el ejercicio y aplicar el protocolo con carbohidrato rápido si está consciente",
            "Hacerlo sentar, darle agua y reanudar con ejercicio suave en unos minutos",
            "Reducir la intensidad de la sesión y revisar sus síntomas de forma periódica"
          ],
          "ok": 0,
          "why": "Los síntomas sugieren hipoglucemia. El agua o el ejercicio suave no la corrigen; se suspende y se atiende según el protocolo."
        },
        {
          "escena": "Un paciente hipertenso llega con la presión muy elevada y dolor de cabeza intenso.",
          "a": [
            "Hacerlo reposar un rato, repetir la toma y empezar si baja un poco",
            "No iniciar el ejercicio, repetir la toma y derivar para valoración médica",
            "Empezar con calentamiento muy suave y vigilar la presión durante la sesión"
          ],
          "ok": 1,
          "why": "Repetir la toma tras reposo es razonable, pero con síntomas el ejercicio no se inicia. La presión muy alta con cefalea requiere valoración médica."
        },
        {
          "escena": "Un paciente con diabetes controlada quiere iniciar un programa de caminata.",
          "a": [
            "Recomendar caminatas diarias moderadas y que aumente según se sienta",
            "Indicar que primero consulte con su endocrinólogo antes de cualquier ejercicio",
            "Explicar la progresión gradual, revisar calzado y cuidado de los pies y vigilar glucosa"
          ],
          "ok": 2,
          "why": "Pedir permiso para todo retrasa un hábito beneficioso, y aumentar según se sienta ignora los riesgos de pies y glucosa. Se progresa con precauciones."
        },
        {
          "escena": "Un paciente hipertenso en tratamiento hace ejercicios de fuerza y contiene el aire en cada repetición.",
          "a": [
            "Enseñarle a respirar durante el esfuerzo y evitar contener la respiración",
            "Reducir el peso y las repeticiones y dejar que mantenga su patrón respiratorio",
            "Cambiar a ejercicios isométricos para evitar el patrón de contener el aire"
          ],
          "ok": 0,
          "why": "Contener el aire eleva la presión. Bajar la carga o cambiar a isométricos no corrige el hábito; se enseña la respiración adecuada."
        }
      ]
    }
  ];
  window.FT_HISTORIA = MUNDOS;

  const ESTRELLA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>';
  const CANDADO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
  // Portada propia del mundo (assets/retos/historia/<id>.webp) si existe; si no, la imagen genérica. Las dos capas se apilan: la propia queda encima.
  const fondo = m => (m.n > 4 ? "url('assets/retos/historia/" + m.id + ".webp')," : '') + "url('" + m.imagen + "')";
  const hechos = () => (window.achievementData && achievementData.retos && achievementData.retos.hechos) || {};
  const estrellas = ok => ok >= 4 ? 3 : ok >= 3 ? 2 : 0;
  const estrellasHTML = ok => '<span class="hs-stars" aria-label="' + estrellas(ok) + ' de 3 estrellas">' + [0, 1, 2].map(i => '<i class="' + (i < estrellas(ok) ? 'on' : '') + '">' + ESTRELLA + '</i>').join('') + '</span>';
  const abierto = (m, h) => m.n === 1 || !!h['h-' + (m.n - 1)];
  const puede = () => typeof memberIsPaid !== 'undefined' && (memberIsPaid || (window.ftPrueba && ftPrueba.estado === 'elegida'));
  const cont = () => $('retosContenido');
  const volver = '<button type="button" class="rt-volver" onclick="ftRetosInicio()">← Volver a Retos</button>';

  function mapa() {
    const h = hechos(), hechosN = MUNDOS.filter(m => h[m.id]).length;
    cont().innerHTML = volver + '<section class="hs"><header class="hs-cab"><div><small>Modo historia</small><h2>Atiende al <em>paciente.</em></h2>' +
      '<p>Acompaña a Fisi por cuatro mundos. Elige la mejor decisión en cada caso; con 3 aciertos de 4 superas el mundo y abres el siguiente. Cada mundo da XP una sola vez.</p>' +
      '<div class="hs-prog"><i style="width:' + Math.round(hechosN / MUNDOS.length * 100) + '%"></i></div><span class="hs-prog-txt">' + hechosN + ' de ' + MUNDOS.length + ' mundos superados</span></div>' +
      (window.ftMascota ? ftMascota.html('detective', { ancho: 96, burbuja: false, pose: 'lupa' }) : '') + '</header>' +
      '<div class="hs-mundos">' + MUNDOS.map(m => {
        const ab = abierto(m, h), ok = h[m.id] ? h[m.id].mejor : 0;
        return '<article class="hs-mundo' + (ab ? '' : ' cerrado') + '"><div class="img" style="background-image:' + fondo(m) + '"><span>Mundo ' + m.n + '</span></div><div class="txt"><h3>' + esc(m.titulo) + '</h3><p>' + esc(m.sub) + '</p>' +
          '<div class="pie">' + estrellasHTML(ok) + (ab ? '<button type="button" class="ftd-btn pequeno" data-m="' + m.id + '">' + (h[m.id] ? 'Jugar otra vez' : 'Jugar') + '</button>' : '<span class="cand">' + CANDADO + 'Supera el mundo ' + (m.n - 1) + '</span>') + '</div></div></article>';
      }).join('') + '</div></section>';
    cont().querySelectorAll('[data-m]').forEach(b => b.onclick = () => jugar(MUNDOS.find(m => m.id === b.dataset.m)));
    window.scrollTo(0, 0);
  }

  function jugar(m) {
    if (!puede()) { if (window.showPaywallOverlay) showPaywallOverlay(); return; }
    const casos = m.casos.map((c, k) => ({ k, escena: c.escena, why: c.why, opciones: mezclar(c.a.map((t, n) => ({ t, orig: n, ok: n === c.ok }))) }));
    const respuestas = {}; let i = 0, aciertos = 0, bloqueado = false;
    const pintar = () => {
      const c = casos[i];
      cont().innerHTML = volver + '<section class="hs"><header class="hs-caso-cab"><div><small>Mundo ' + m.n + ' · Caso ' + (i + 1) + ' de ' + casos.length + '</small><h2>' + esc(m.titulo) + '</h2></div><span class="hs-pts">' + aciertos + ' acierto' + (aciertos === 1 ? '' : 's') + '</span></header>' +
        '<div class="hs-escena" style="background-image:' + fondo(m) + '"><div class="hs-guia">' + (window.ftMascota ? ftMascota.html('detective', { ancho: 84, burbuja: false, pose: i % 2 ? 'piensa' : 'lupa' }) : '') +
        '<div class="hs-burbuja"><strong>Fisi</strong><p>' + (i === 0 ? esc(m.intro) + ' ' : '') + esc(c.escena) + '</p></div></div></div>' +
        '<div class="hs-ops">' + c.opciones.map((o, n) => '<button type="button" data-o="' + n + '"><span>' + String.fromCharCode(65 + n) + '</span>' + esc(o.t) + '</button>').join('') + '</div><div class="hs-fb" hidden></div></section>';
      cont().querySelectorAll('[data-o]').forEach(b => b.onclick = () => {
        if (bloqueado) return; bloqueado = true;
        const n = Number(b.dataset.o), ok = c.opciones[n].ok; if (ok) aciertos++;
        respuestas[c.k] = c.opciones[n].orig;
        cont().querySelectorAll('[data-o]').forEach((el, q) => { el.disabled = true; el.classList.toggle('bien', c.opciones[q].ok); el.classList.toggle('mal', q === n && !ok); });
        const f = cont().querySelector('.hs-fb'); f.hidden = false;
        f.innerHTML = '<strong>' + (ok ? '¡Buena decisión!' : 'Piénsalo de nuevo') + '</strong><span>' + esc(c.why) + '</span><button type="button" class="ftd-btn">' + (i === casos.length - 1 ? 'Ver resultado' : 'Siguiente caso') + '</button>';
        f.querySelector('button').onclick = () => { i++; bloqueado = false; i < casos.length ? pintar() : terminar(); };
        f.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
      window.scrollTo(0, 0);
    };
    const terminar = async () => {
      const srv = window.ftAcceso ? await ftAcceso.completarReto({ retoId: m.id, tipo: 'historia', respuestas }) : null;
      const supera = srv ? srv.supera : aciertos >= 3, sig = MUNDOS.find(x => x.n === m.n + 1);
      if (srv && srv.nuevo) { if (window.ftLogros) ftLogros.actualizar('/api/logros'); if (window.showToast) showToast('+' + (srv.xp || 0) + ' XP por superar el mundo ' + m.n); }
      const nota = !srv ? 'No se pudo guardar tu resultado (sin conexión con el servidor). Vuelve a intentarlo.' : srv.supera && !srv.nuevo ? 'Ya ganaste el XP de este mundo. Repetirlo es solo práctica.' : '';
      cont().innerHTML = volver + '<section class="hs"><div class="hs-res"><small>Mundo ' + m.n + (supera ? ' superado' : ' terminado') + '</small><h2>' + esc(m.titulo) + '</h2>' +
        '<p>Acertaste <strong>' + (srv ? srv.ok : aciertos) + ' de ' + casos.length + '</strong>. ' + (supera ? (sig ? 'Ya puedes entrar al mundo ' + sig.n + '.' : '¡Terminaste la historia!') : 'Necesitas 3 aciertos para superarlo. Repasa las explicaciones y vuelve a intentarlo.') + '</p>' +
        estrellasHTML(srv ? srv.ok : aciertos) + (srv && srv.nuevo ? '<p class="hs-xp">+' + srv.xp + ' XP</p>' : '') + (nota ? '<p class="hs-nota">' + esc(nota) + '</p>' : '') +
        '<div class="hs-acc"><button type="button" class="ftd-btn" id="hsMapa">Ver el mapa</button>' + (supera && sig ? '<button type="button" class="ftd-btn suave" id="hsSig">Ir al mundo ' + sig.n + '</button>' : '') + '<button type="button" class="ftd-btn suave" id="hsRep">Repetir este mundo</button></div></div></section>';
      $('hsMapa').onclick = mapa; $('hsRep').onclick = () => jugar(m); if ($('hsSig')) $('hsSig').onclick = () => jugar(sig);
      window.scrollTo(0, 0);
    };
    pintar();
  }

  window.ftHistoria = { mapa, jugar, MUNDOS };
})();
