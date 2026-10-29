/* Club FisioTeck — contenido de Retos (quiz, ordena el proceso, flashcards).
   Contenido educativo general de fisioterapia; no sustituye criterio clínico.
   Cada quiz: { id, titulo, desc, preguntas: [{ q, o: [4 opciones], c: índice correcto, e: explicación }] } */
window.FT_RETOS = {
  "quiz": [
    {
      "id": "q-valoracion",
      "titulo": "Valoración y dolor",
      "desc": "Escalas, pruebas y banderas rojas",
      "preguntas": [
        {
          "q": "¿Qué mide la Escala Visual Análoga (EVA)?",
          "o": [
            "La intensidad del dolor que percibe el paciente",
            "El rango de movimiento articular",
            "La fuerza muscular",
            "El equilibrio"
          ],
          "c": 0,
          "e": "La EVA es una escala subjetiva de 0 a 10 para la intensidad del dolor."
        },
        {
          "q": "¿Qué instrumento se usa para medir el rango de movimiento articular?",
          "o": [
            "Dinamómetro",
            "Goniómetro",
            "Oxímetro",
            "Espirómetro"
          ],
          "c": 1,
          "e": "El goniómetro mide los ángulos articulares en grados."
        },
        {
          "q": "En la escala de fuerza muscular (Daniels / MRC), el grado 3 significa:",
          "o": [
            "Sin contracción visible",
            "Movimiento completo sin gravedad",
            "Movimiento completo contra gravedad, sin resistencia",
            "Fuerza normal"
          ],
          "c": 2,
          "e": "Grado 3: el músculo vence la gravedad en todo el arco, pero no tolera resistencia añadida."
        },
        {
          "q": "En un dolor lumbar, ¿cuál es una bandera roja que exige derivación urgente?",
          "o": [
            "Dolor que mejora con el reposo",
            "Pérdida del control de esfínteres con anestesia en silla de montar",
            "Rigidez matutina de 10 minutos",
            "Dolor tras cargar peso"
          ],
          "c": 1,
          "e": "Sugiere síndrome de cauda equina, una urgencia neuroquirúrgica."
        },
        {
          "q": "¿Cómo suele describir el paciente el dolor neuropático?",
          "o": [
            "Como sensación de ardor, descarga eléctrica u hormigueo",
            "Como molestia que solo aparece al estirar",
            "Como dolor sordo que cede con el calor",
            "Como pesadez que empeora al final del día"
          ],
          "c": 0,
          "e": "Ardor, descargas y parestesias son típicos del dolor neuropático."
        },
        {
          "q": "La elevación de pierna recta (prueba de Lasègue) busca evidenciar:",
          "o": [
            "Inestabilidad de rodilla",
            "Irritación de raíces lumbosacras / nervio ciático",
            "Acortamiento del psoas",
            "Lesión de menisco"
          ],
          "c": 1,
          "e": "Reproduce dolor irradiado cuando hay irritación radicular o del nervio ciático."
        }
      ]
    },
    {
      "id": "q-anatomia",
      "titulo": "Anatomía y biomecánica",
      "desc": "Músculos, nervios y articulaciones",
      "preguntas": [
        {
          "q": "¿Cuál de estos músculos NO forma parte del manguito rotador?",
          "o": [
            "Supraespinoso",
            "Infraespinoso",
            "Deltoides",
            "Subescapular"
          ],
          "c": 2,
          "e": "El manguito lo forman supraespinoso, infraespinoso, redondo menor y subescapular."
        },
        {
          "q": "¿Qué músculo inicia la abducción del hombro (primeros grados)?",
          "o": [
            "Trapecio superior",
            "Supraespinoso",
            "Pectoral mayor",
            "Dorsal ancho"
          ],
          "c": 1,
          "e": "El supraespinoso inicia la abducción y estabiliza la cabeza humeral."
        },
        {
          "q": "El cuádriceps está inervado por el nervio:",
          "o": [
            "Ciático",
            "Tibial",
            "Femoral",
            "Obturador"
          ],
          "c": 2,
          "e": "El nervio femoral (L2-L4) inerva el cuádriceps."
        },
        {
          "q": "¿Qué músculos producen principalmente la flexión plantar del tobillo?",
          "o": [
            "Tibial anterior",
            "Tríceps sural (gastrocnemio y sóleo)",
            "Peroneo anterior",
            "Extensor largo de los dedos"
          ],
          "c": 1,
          "e": "Gastrocnemio y sóleo, por el tendón calcáneo, producen la flexión plantar."
        },
        {
          "q": "El ligamento cruzado anterior (LCA) limita sobre todo:",
          "o": [
            "La traslación anterior de la tibia respecto al fémur",
            "La rotación externa de cadera",
            "La hiperextensión del codo",
            "La inversión del tobillo"
          ],
          "c": 0,
          "e": "El LCA evita que la tibia se desplace hacia delante bajo el fémur."
        },
        {
          "q": "¿Cuál es la función principal del glúteo medio al caminar?",
          "o": [
            "Extender la rodilla",
            "Estabilizar la pelvis en el apoyo de una pierna",
            "Flexionar el tronco",
            "Rotar el pie"
          ],
          "c": 1,
          "e": "Evita que la pelvis caiga hacia el lado de la pierna que no apoya (signo de Trendelenburg si falla)."
        }
      ]
    },
    {
      "id": "q-neuro",
      "titulo": "Neurorrehabilitación",
      "desc": "Neuroplasticidad, tono y escalas",
      "preguntas": [
        {
          "q": "¿Qué es la neuroplasticidad?",
          "o": [
            "La pérdida progresiva de neuronas",
            "La capacidad del sistema nervioso de reorganizar sus conexiones con la experiencia",
            "Un tipo de parálisis",
            "Un reflejo medular"
          ],
          "c": 1,
          "e": "Es la base de la recuperación funcional tras una lesión neurológica."
        },
        {
          "q": "La escala de Ashworth modificada valora:",
          "o": [
            "El dolor",
            "La espasticidad",
            "La marcha",
            "La memoria"
          ],
          "c": 1,
          "e": "Mide la resistencia al estiramiento pasivo (tono muscular)."
        },
        {
          "q": "¿Qué característica favorece más el aprendizaje motor en rehabilitación neurológica?",
          "o": [
            "Práctica repetitiva, intensiva y orientada a tareas",
            "Reposo prolongado",
            "Evitar el esfuerzo del paciente",
            "Ejercicios sin objetivo funcional"
          ],
          "c": 0,
          "e": "La práctica específica, repetida y con significado funcional impulsa la plasticidad."
        },
        {
          "q": "Un signo de Babinski positivo en un adulto sugiere lesión de:",
          "o": [
            "Motoneurona inferior",
            "Motoneurona superior (vía piramidal)",
            "Nervio periférico distal",
            "Músculo"
          ],
          "c": 1,
          "e": "La extensión del dedo gordo con apertura de los demás indica afectación piramidal."
        },
        {
          "q": "¿Qué significa hemiparesia?",
          "o": [
            "Pérdida total de sensibilidad",
            "Debilidad de un lado del cuerpo",
            "Temblor en reposo",
            "Debilidad de las dos piernas"
          ],
          "c": 1,
          "e": "Hemi = mitad; paresia = debilidad (no parálisis completa)."
        },
        {
          "q": "La escala de coma de Glasgow evalúa:",
          "o": [
            "Fuerza muscular",
            "Nivel de conciencia (respuesta ocular, verbal y motora)",
            "Equilibrio",
            "Dolor"
          ],
          "c": 1,
          "e": "Va de 3 a 15 puntos."
        }
      ]
    },
    {
      "id": "q-respiratoria",
      "titulo": "Fisioterapia respiratoria",
      "desc": "Ventilación, secreciones y oxígeno",
      "preguntas": [
        {
          "q": "¿Cuál es el principal músculo de la inspiración tranquila?",
          "o": [
            "Esternocleidomastoideo",
            "Diafragma",
            "Recto abdominal",
            "Pectoral menor"
          ],
          "c": 1,
          "e": "Al contraerse desciende y aumenta el volumen torácico."
        },
        {
          "q": "Una saturación de oxígeno normal en reposo, en una persona sana, ronda:",
          "o": [
            "70–80 %",
            "80–85 %",
            "95–100 %",
            "100–110 %"
          ],
          "c": 2,
          "e": "Valores sostenidos por debajo de 90 % suelen indicar hipoxemia."
        },
        {
          "q": "La respiración con labios fruncidos en la EPOC sirve para:",
          "o": [
            "Aumentar la frecuencia respiratoria",
            "Prolongar la espiración y reducir el atrapamiento de aire",
            "Evitar toser",
            "Disminuir la ingesta de oxígeno"
          ],
          "c": 1,
          "e": "Genera una presión positiva leve que mantiene abiertas las vías aéreas al exhalar."
        },
        {
          "q": "El drenaje postural se basa en:",
          "o": [
            "Usar la gravedad para facilitar la movilización de secreciones",
            "Calentar el tórax",
            "Inmovilizar al paciente",
            "Comprimir el abdomen"
          ],
          "c": 0,
          "e": "Se posiciona el segmento pulmonar afectado de modo que drene hacia las vías centrales."
        },
        {
          "q": "La espirometría incentivada busca principalmente:",
          "o": [
            "Medir la presión arterial",
            "Fomentar inspiraciones profundas sostenidas y prevenir atelectasias",
            "Aumentar la fuerza de las piernas",
            "Reducir la tos"
          ],
          "c": 1,
          "e": "Se usa mucho después de cirugías o reposo prolongado."
        },
        {
          "q": "La frecuencia respiratoria normal de un adulto en reposo es de aproximadamente:",
          "o": [
            "4–8 respiraciones/min",
            "12–20 respiraciones/min",
            "30–40 respiraciones/min",
            "50–60 respiraciones/min"
          ],
          "c": 1,
          "e": "Por encima de 20–24 en reposo se considera taquipnea."
        }
      ]
    },
    {
      "id": "q-ortopedia",
      "titulo": "Ortopedia y deporte",
      "desc": "Lesiones, carga y pruebas especiales",
      "preguntas": [
        {
          "q": "¿Qué objetivo es prioritario en la fase aguda de un esguince?",
          "o": [
            "Cargar el máximo peso posible",
            "Controlar dolor e inflamación protegiendo la articulación",
            "Estirar con fuerza el ligamento",
            "Inmovilizar durante meses"
          ],
          "c": 1,
          "e": "Después se progresa de forma gradual en movilidad, fuerza y control."
        },
        {
          "q": "En una contracción excéntrica, el músculo:",
          "o": [
            "Se acorta generando fuerza",
            "Se mantiene igual de largo",
            "Genera fuerza mientras se alarga",
            "Se relaja por completo"
          ],
          "c": 2,
          "e": "Por ejemplo, al bajar lentamente una pesa."
        },
        {
          "q": "¿Qué intervención tiene mejor respaldo en la tendinopatía?",
          "o": [
            "Reposo absoluto",
            "Carga progresiva con ejercicio terapéutico",
            "Inmovilización con yeso",
            "Solo hielo"
          ],
          "c": 1,
          "e": "La carga gradual (isométrica, excéntrica, de fuerza lenta) mejora la capacidad del tendón."
        },
        {
          "q": "La prueba de Lachman explora principalmente:",
          "o": [
            "El ligamento cruzado anterior",
            "El menisco medial",
            "El manguito rotador",
            "El túnel carpiano"
          ],
          "c": 0,
          "e": "Con la rodilla a unos 20-30° se valora la traslación anterior de la tibia."
        },
        {
          "q": "Una característica del vendaje neuromuscular es que:",
          "o": [
            "Inmoviliza por completo la articulación",
            "Es elástico y permite el movimiento",
            "Solo se usa en niños",
            "Sustituye al ejercicio"
          ],
          "c": 1,
          "e": "Se usa como apoyo; no reemplaza la rehabilitación activa."
        },
        {
          "q": "El dolor típico de la fascitis plantar aparece sobre todo:",
          "o": [
            "En el talón, con los primeros pasos de la mañana",
            "En la rodilla al subir escaleras",
            "En el hombro por la noche",
            "En la muñeca al teclear"
          ],
          "c": 0,
          "e": "Suele mejorar al caminar un rato y reaparecer tras reposo."
        }
      ]
    },
    {
      "id": "q-ejercicio",
      "titulo": "Ejercicio terapéutico",
      "desc": "Progresión de carga y razonamiento",
      "preguntas": [
        {
          "q": "Un paciente con tendinopatía rotuliana refiere dolor leve durante la sentadilla que cede en minutos al terminar. ¿Cómo se interpreta?",
          "o": [
            "Es compatible con una carga tolerable, por lo que se mantiene y se progresa poco a poco",
            "Indica un daño estructural nuevo, por lo que se suspende la carga varias semanas",
            "Muestra que el ejercicio no funciona, por lo que se pasa a reposo relativo prolongado",
            "Exige que el dolor sea nulo antes de continuar con cualquier tipo de carga"
          ],
          "c": 0,
          "e": "Un dolor leve y transitorio puede ser aceptable en el manejo de tendinopatías. Exigir dolor nulo o suspender la carga priva al tendón del estímulo que necesita."
        },
        {
          "q": "¿Qué ventaja clínica se atribuye a los ejercicios isométricos cuando el dolor es alto?",
          "o": [
            "Producen más hipertrofia que cualquier otro tipo de contracción muscular",
            "Cargan el tejido sin movimiento articular y suelen tolerarse mejor",
            "Entrenan la potencia porque aprovechan la energía elástica del tendón",
            "Ganan rango articular porque alargan el músculo mientras se contrae"
          ],
          "c": 1,
          "e": "La carga estática evita el arco doloroso. La ganancia de rango y la potencia dependen de contracciones dinámicas, y la hipertrofia no es su ventaja principal."
        },
        {
          "q": "Seis semanas después de una cirugía, una paciente completa sus series con buena técnica y sin dolor. ¿Qué paso es más razonable?",
          "o": [
            "Subir la resistencia un poco y mantener estables las otras variables",
            "Duplicar resistencia y repeticiones a la vez para acelerar la adaptación",
            "Mantener la misma carga hasta cumplir el tiempo total del protocolo escrito",
            "Cambiar a ejercicios más complejos sin comprobar antes la tolerancia"
          ],
          "c": 0,
          "e": "Se progresa según tolerancia y criterios funcionales, no solo por el calendario. Cambiar varias variables a la vez impide saber qué causa una reacción adversa."
        },
        {
          "q": "¿Cuál es la diferencia entre fuerza y resistencia muscular?",
          "o": [
            "La fuerza es la tensión máxima que se genera; la resistencia es sostener esfuerzos repetidos",
            "La fuerza es sostener esfuerzos repetidos; la resistencia es la tensión máxima que se genera",
            "La fuerza depende solo de la hipertrofia y la resistencia solo del sistema cardiovascular",
            "Son lo mismo y se entrenan con el mismo esquema de series y repeticiones"
          ],
          "c": 0,
          "e": "Ambas capacidades se entrenan con esquemas distintos. Invertir las definiciones es el error más común."
        },
        {
          "q": "Una persona mayor quiere mejorar su capacidad de levantarse de una silla. ¿Qué ejercicio es más específico?",
          "o": [
            "Extensiones de rodilla en camilla con tobillera, aumentando el peso poco a poco",
            "Sentarse y levantarse de una silla con progresión de altura o carga",
            "Estiramiento sostenido de isquiotibiales en posición sentada",
            "Pedaleo sin resistencia durante un tiempo prolongado"
          ],
          "c": 1,
          "e": "Por especificidad, la tarea entrenada debe parecerse a la meta. La extensión de rodilla fortalece el cuádriceps pero transfiere menos al gesto completo."
        },
        {
          "q": "¿Qué enuncia el principio de reversibilidad?",
          "o": [
            "Una carga mal tolerada se revierte aumentando todavía más la exigencia",
            "Los ejercicios deben poder deshacerse en cuanto el paciente refiera algún dolor",
            "Las adaptaciones se pierden poco a poco al reducir o suspender el estímulo",
            "La fuerza ya ganada permanece sin necesidad de mantenimiento posterior"
          ],
          "c": 2,
          "e": "Es la base de los programas de mantenimiento. La idea de que la ganancia es permanente es una confusión frecuente."
        }
      ]
    },
    {
      "id": "q-electro",
      "titulo": "Electroterapia y agentes físicos",
      "desc": "TENS, ultrasonido y seguridad",
      "preguntas": [
        {
          "q": "¿Qué mecanismo se propone para el efecto analgésico del TENS convencional?",
          "o": [
            "Destruir las fibras nociceptivas mediante un calentamiento local controlado",
            "Reponer los neurotransmisores agotados en la sinapsis de la vía dolorosa",
            "Activar fibras sensitivas gruesas para modular la transmisión del dolor",
            "Producir una contracción tetánica que fatiga el músculo doloroso"
          ],
          "c": 2,
          "e": "Se basa en la teoría de la compuerta. La contracción fatigante corresponde a otras formas de estimulación y no es el objetivo del TENS sensitivo."
        },
        {
          "q": "Un paciente con marcapasos y lumbalgia solicita TENS lumbar. ¿Qué es lo adecuado?",
          "o": [
            "Aplicarlo con menor intensidad, pues el riesgo depende solo de la dosis del equipo",
            "Colocarlo en la zona lumbar, porque está lejos del corazón y no interfiere",
            "Evitarlo y consultar al médico, pues la zona lumbar no descarta interferencia",
            "Permitirlo si el marcapasos es reciente y su programación es correcta"
          ],
          "c": 2,
          "e": "Las corrientes pueden interferir con dispositivos implantados y la distancia o la intensidad no eliminan ese riesgo. Se decide junto con el médico tratante."
        },
        {
          "q": "¿Qué riesgo se asocia a concentrar energía de ultrasonido sobre una prominencia ósea?",
          "o": [
            "Pérdida de la sensibilidad por un bloqueo nervioso transitorio",
            "Desmineralización del hueso por efecto directo del sonido",
            "Dolor y sobrecalentamiento del periostio por absorción local",
            "Reducción del flujo sanguíneo por una vasoconstricción refleja"
          ],
          "c": 2,
          "e": "La interfase hueso y tejido blando absorbe mucha energía y se calienta. El ultrasonido no desmineraliza hueso en uso terapéutico."
        },
        {
          "q": "Una paciente con hipoestesia en la pierna va a recibir un agente físico. ¿Qué implica?",
          "o": [
            "Permite usar intensidades mayores al tolerar más estímulo",
            "Mayor riesgo de lesión, porque puede no notar una intensidad excesiva",
            "No cambia la seguridad si el equipo está bien calibrado",
            "Solo importa cuando la pérdida de sensibilidad es de origen diabético"
          ],
          "c": 1,
          "e": "La sensibilidad es la principal alarma del paciente. Un equipo calibrado no sustituye esa retroalimentación."
        },
        {
          "q": "¿Cuál es la diferencia de objetivo entre la estimulación neuromuscular (NMES) y el TENS?",
          "o": [
            "La NMES busca contracción muscular; el TENS modula el dolor con estímulo sensitivo",
            "La NMES busca analgesia sensitiva y el TENS busca una contracción muscular visible",
            "Se distinguen únicamente por el tipo de electrodo, no por la finalidad",
            "La NMES se aplica sobre nervios sanos y el TENS sobre músculo denervado"
          ],
          "c": 0,
          "e": "Ambos usan corrientes, pero con fines distintos. Confundir las finalidades es un error de concepto frecuente."
        },
        {
          "q": "Una paciente con una neoplasia conocida en la zona pide ultrasonido por dolor local. ¿Qué corresponde?",
          "o": [
            "Aplicarlo por su efecto antitumoral demostrado en tejido blando",
            "Usar modo pulsado, ya que al no generar calor es seguro en la zona",
            "Aplicarlo si la paciente ya completó su tratamiento de quimioterapia",
            "Evitar la aplicación en la zona y coordinar con el equipo oncológico"
          ],
          "c": 3,
          "e": "Existe preocupación por estimular el crecimiento tisular. Reducir el calor no elimina los efectos no térmicos."
        }
      ]
    },
    {
      "id": "q-termo",
      "titulo": "Termoterapia y crioterapia",
      "desc": "Calor y frío con criterio",
      "preguntas": [
        {
          "q": "Un paciente con rigidez crónica de rodilla sin inflamación va a hacer ejercicios de movilidad. ¿Qué agente es razonable antes?",
          "o": [
            "Hielo prolongado para aumentar la extensibilidad del colágeno",
            "Calor superficial para favorecer la extensibilidad y tolerar el movimiento",
            "Crioterapia con compresión para controlar una inflamación inexistente",
            "Evitar agentes térmicos, pues el calor retrasa la recuperación del tejido"
          ],
          "c": 1,
          "e": "El calor disminuye la rigidez y facilita el movimiento. El frío reduce la extensibilidad del colágeno."
        },
        {
          "q": "¿Cómo afecta el frío a la velocidad de conducción nerviosa?",
          "o": [
            "La aumenta, lo que explica la hiperalgesia posterior a la aplicación",
            "La disminuye, lo que contribuye al efecto analgésico",
            "No la modifica; el efecto analgésico es únicamente psicológico",
            "La cambia solo en nervios motores y no en los sensitivos"
          ],
          "c": 1,
          "e": "El enfriamiento de los nervios reduce la conducción de las fibras sensitivas. No es solo un efecto placebo."
        },
        {
          "q": "Un esguince de tobillo de dos días tiene edema marcado y calor local. El paciente pide compresas calientes. ¿Qué se responde?",
          "o": [
            "Es adecuado, ya que el calor acelera la reabsorción del hematoma",
            "Es indiferente, pues calor y frío producen el mismo resultado en esa fase",
            "Se desaconseja, porque el calor puede aumentar el edema en la fase aguda",
            "Es preferible al frío porque reduce el metabolismo del tejido lesionado"
          ],
          "c": 2,
          "e": "El calor produce vasodilatación y aumenta la extravasación. Reducir el metabolismo local es efecto del frío."
        },
        {
          "q": "¿Qué condición vuelve peligrosa la aplicación de calor superficial?",
          "o": [
            "Una alteración de la sensibilidad térmica en la zona",
            "Una contractura muscular de varios días de evolución",
            "Una rigidez matutina por artrosis de manos",
            "Un dolor lumbar mecánico subagudo sin banderas rojas"
          ],
          "c": 0,
          "e": "Sin percepción térmica no se detecta una quemadura inminente. Las otras tres opciones son indicaciones habituales."
        },
        {
          "q": "¿Por qué mecanismo transfiere calor una compresa caliente colocada sobre la piel?",
          "o": [
            "Por radiación, mediante la emisión de ondas infrarrojas a distancia",
            "Por convección, mediante el movimiento de un fluido alrededor del cuerpo",
            "Por conducción, mediante el contacto directo entre superficies",
            "Por conversión, mediante la transformación de energía mecánica en calor"
          ],
          "c": 2,
          "e": "La conducción requiere contacto. La convección y la radiación son mecanismos distintos que se confunden por tener nombres parecidos."
        },
        {
          "q": "Una paciente con fenómeno de Raynaud tiene dolor en la mano y se propone crioterapia. ¿Qué corresponde?",
          "o": [
            "Aplicarla, ya que reduce la inflamación vascular propia del cuadro",
            "Evitarla: el frío puede desencadenar vasoespasmo y empeorar la isquemia",
            "Aplicarla por un tiempo breve, pues el riesgo depende solo de la duración",
            "Considerarla equivalente al calor, porque ambos producen vasodilatación"
          ],
          "c": 1,
          "e": "El Raynaud se desencadena con el frío. El frío produce vasoconstricción, no vasodilatación."
        }
      ]
    },
    {
      "id": "q-manual",
      "titulo": "Terapia manual y movilización",
      "desc": "Razonamiento y seguridad",
      "preguntas": [
        {
          "q": "Al movilizar pasivamente una articulación, el paciente presenta una sensación terminal firme y elástica. ¿Qué sugiere?",
          "o": [
            "Un bloqueo mecánico por un cuerpo libre dentro de la articulación",
            "Un espasmo muscular protector por dolor agudo, con final abrupto",
            "Una ausencia de resistencia por dolor intenso o inestabilidad grave",
            "Limitación por tensión de la cápsula o tejidos blandos cercanos"
          ],
          "c": 3,
          "e": "Cada sensación terminal se asocia a un tipo de estructura limitante. El bloqueo duro y el espasmo tienen una sensación distinta."
        },
        {
          "q": "Una paciente con dolor cervical refiere mareo, visión borrosa y dificultad para hablar tras mover el cuello. ¿Qué corresponde?",
          "o": [
            "Continuar con movilización suave, porque los síntomas suelen ser benignos",
            "Suspender técnicas cervicales y derivar por posible compromiso vascular",
            "Aplicar una manipulación de alta velocidad para liberar la tensión",
            "Atribuirlo a ansiedad y proseguir con calor cervical"
          ],
          "c": 1,
          "e": "Son síntomas de posible insuficiencia vertebrobasilar o disección. No deben atribuirse a ansiedad ni manejarse con más técnica."
        },
        {
          "q": "¿Qué distingue la manipulación de la movilización articular?",
          "o": [
            "La manipulación es una oscilación lenta y controlada; la movilización es un impulso rápido",
            "La manipulación la realiza el propio paciente; la movilización el terapeuta",
            "Se diferencian únicamente por la región del cuerpo donde se aplican",
            "La manipulación es un impulso rápido de poca amplitud; la movilización es graduada"
          ],
          "c": 3,
          "e": "En la movilización el paciente puede detener o modificar la técnica. Invertir los términos es un error habitual."
        },
        {
          "q": "Un paciente con dolor muy irritable presenta reacciones intensas ante el mínimo movimiento. ¿Qué elección es mejor?",
          "o": [
            "Técnicas intensas al final del rango para vencer la irritabilidad",
            "Técnicas suaves sin llegar al límite del dolor y con reevaluación",
            "Estiramiento sostenido al máximo para reducir el dolor por inhibición",
            "Manipulación inmediata, porque el dolor indica una restricción articular"
          ],
          "c": 1,
          "e": "La irritabilidad alta indica prudencia con la dosis. La intensidad al límite suele empeorar el cuadro."
        },
        {
          "q": "¿Para qué se reevalúa después de aplicar una técnica manual?",
          "o": [
            "Para registrar la satisfacción del paciente como único criterio de éxito",
            "Para comparar los mismos signos y decidir si la técnica sirvió o debe cambiar",
            "Porque el efecto solo puede valorarse correctamente a las 24 horas siguientes",
            "Para confirmar el diagnóstico estructural de la región tratada"
          ],
          "c": 1,
          "e": "La reevaluación con signos comparables orienta la toma de decisiones. La satisfacción es útil pero no suficiente."
        },
        {
          "q": "Una paciente con osteoporosis avanzada y dolor dorsal será tratada con terapia manual. ¿Qué es adecuado?",
          "o": [
            "Evitar técnicas de alta velocidad y fuerza por el riesgo de fractura",
            "Preferir la manipulación por su mayor eficacia en hueso poroso",
            "Considerar indiferente la técnica, pues la osteoporosis afecta solo huesos largos",
            "Aplicar presión máxima para estimular la formación ósea"
          ],
          "c": 0,
          "e": "La fragilidad ósea eleva el riesgo de fracturas por compresión. La carga mecánica excesiva no es un tratamiento."
        }
      ]
    },
    {
      "id": "q-geriatria",
      "titulo": "Geriatría y prevención de caídas",
      "desc": "Valoración y manejo funcional",
      "preguntas": [
        {
          "q": "En la prueba Timed Up and Go, ¿qué indica un tiempo prolongado?",
          "o": [
            "Mayor capacidad aeróbica por marcha más pausada",
            "Menor movilidad funcional y mayor riesgo de caídas",
            "Mayor sensibilidad propioceptiva compensatoria",
            "Un trastorno visual como causa única del resultado"
          ],
          "c": 1,
          "e": "El TUG integra fuerza, equilibrio y marcha. Atribuir el resultado a una sola causa ignora su naturaleza multifactorial."
        },
        {
          "q": "Una mujer de 78 años tuvo una caída hace tres meses y ahora evita salir por miedo a caer. ¿Qué enfoque es mejor?",
          "o": [
            "Indicarle reposo en casa para eliminar la exposición al riesgo de nuevas caídas",
            "Centrar el programa en estiramientos que reduzcan la rigidez asociada",
            "Abordar el miedo junto con equilibrio y fuerza, porque evitar descondiciona",
            "Restringir la marcha hasta que no sienta ningún miedo"
          ],
          "c": 2,
          "e": "El miedo a caer reduce la actividad y aumenta el riesgo. Restringir el movimiento agrava el problema."
        },
        {
          "q": "Un paciente de 80 años se marea al pasar de sentado a de pie. ¿Qué es lo adecuado?",
          "o": [
            "Cambios posturales graduales y aviso al médico para estudiar la causa",
            "Pedirle que se levante de golpe para que el cuerpo se adapte",
            "Suspender toda actividad al considerarlo un problema irreversible del envejecimiento",
            "Aumentar la intensidad del ejercicio para mejorar el tono vascular"
          ],
          "c": 0,
          "e": "Puede ser hipotensión ortostática, a menudo relacionada con fármacos o deshidratación. El fisioterapeuta lo comunica al médico."
        },
        {
          "q": "¿Qué programa de ejercicio tiene mejor respaldo para prevenir caídas?",
          "o": [
            "Caminata lenta y diaria de larga duración sin retos de equilibrio",
            "Estiramientos globales de baja intensidad y larga duración",
            "Ejercicio de brazos sentado con resistencia ligera",
            "Entrenamiento de equilibrio progresivo combinado con fuerza"
          ],
          "c": 3,
          "e": "Caminar sin desafíos al equilibrio tiene poco efecto sobre el riesgo. La combinación de equilibrio y fuerza es la más eficaz."
        },
        {
          "q": "Un paciente con dolor en la cadera derecha usará bastón. ¿En qué mano debe llevarlo?",
          "o": [
            "En la mano izquierda, contraria a la cadera afectada",
            "En la mano derecha, del mismo lado, para apoyarse sobre el dolor",
            "En cualquiera, pues la descarga no depende del lado",
            "En ambas manos, alternando el apoyo en cada paso"
          ],
          "c": 0,
          "e": "El bastón contralateral reduce la demanda de los abductores de la cadera afectada."
        },
        {
          "q": "¿Qué intervención tiene mejor sustento ante la sarcopenia?",
          "o": [
            "Ejercicio aeróbico ligero y prolongado como única estrategia",
            "Reposo relativo para preservar la masa muscular que aún queda",
            "Entrenamiento de fuerza progresivo, con atención a la proteína",
            "Estiramiento pasivo de los grandes grupos musculares"
          ],
          "c": 2,
          "e": "La sarcopenia responde al estímulo de fuerza. El reposo acelera la pérdida muscular."
        }
      ]
    },
    {
      "id": "q-pediatria",
      "titulo": "Pediatría y desarrollo motor",
      "desc": "Hitos, tono y detección",
      "preguntas": [
        {
          "q": "¿Qué significa que el desarrollo motor sigue una dirección céfalo-caudal?",
          "o": [
            "El control se adquiere de los pies hacia la cabeza",
            "El control se adquiere de la cabeza hacia los pies",
            "El control se adquiere de las manos hacia el tronco",
            "El control se adquiere del lado derecho al izquierdo"
          ],
          "c": 1,
          "e": "Primero aparece el control cefálico, después el del tronco y por último el de las piernas."
        },
        {
          "q": "Un lactante de nueve meses no se mantiene sentado sin apoyo ni rota el tronco. ¿Qué conducta es adecuada?",
          "o": [
            "Esperar al año de edad, porque la variabilidad normal es muy amplia",
            "Iniciar bipedestación asistida para acelerar la marcha",
            "Indicar un andador para estimular el desplazamiento",
            "Valorar su desarrollo y coordinar el seguimiento con pediatría"
          ],
          "c": 3,
          "e": "A esa edad la sedestación suele estar establecida. Adelantar la bipedestación o usar andador no corrige el retraso y puede ser riesgoso."
        },
        {
          "q": "La persistencia del reflejo de Moro más allá de la edad esperada sugiere:",
          "o": [
            "Un desarrollo madurativo adelantado respecto de lo habitual",
            "Una lesión ósea de la clavícula tras el parto",
            "Una variante normal que puede persistir a cualquier edad",
            "Una posible alteración de la maduración neurológica a valorar"
          ],
          "c": 3,
          "e": "Los reflejos primitivos deben integrarse con el tiempo. Su persistencia es una señal de alerta, no una variante."
        },
        {
          "q": "Un niño de cinco años camina en puntillas de forma persistente. ¿Qué es lo correcto?",
          "o": [
            "Considerarlo normal, ya que los niños suelen corregirlo sin intervención",
            "Indicar calzado rígido sin realizar una valoración previa",
            "Descartar causas neuromusculares o acortamiento antes de llamarlo variante",
            "Atribuirlo a mala postura y corregirlo con ejercicios de cuello"
          ],
          "c": 2,
          "e": "La marcha idiopática en puntillas es un diagnóstico de exclusión. Debe descartarse patología neurológica o muscular."
        },
        {
          "q": "¿Qué caracteriza a la espasticidad?",
          "o": [
            "Un aumento de resistencia igual en todo el recorrido y a cualquier velocidad",
            "Una debilidad marcada sin cambios en el tono muscular",
            "Una resistencia que desaparece por completo al repetir el movimiento",
            "Más resistencia al estiramiento pasivo rápido que al lento"
          ],
          "c": 3,
          "e": "La resistencia igual a cualquier velocidad corresponde a la rigidez."
        },
        {
          "q": "Una lactante tiene asimetría de pliegues en el muslo y limitación de la abducción de una cadera. ¿Qué corresponde?",
          "o": [
            "Realizar estiramientos de aductores para corregir la asimetría",
            "Esperar a que inicie la marcha para confirmar la sospecha",
            "Referir a valoración médica con imagen para confirmar la sospecha",
            "Indicar que mantenga las piernas juntas y extendidas, envueltas con firmeza"
          ],
          "c": 2,
          "e": "Puede tratarse de displasia del desarrollo de la cadera. Mantener piernas juntas y extendidas empeora la posición de la cadera."
        }
      ]
    },
    {
      "id": "q-suelopelvico",
      "titulo": "Suelo pélvico y salud de la mujer",
      "desc": "Función, embarazo y posparto",
      "preguntas": [
        {
          "q": "Al enseñar la contracción del suelo pélvico, ¿cuál es un error frecuente?",
          "o": [
            "Mantener una respiración fluida y sin apnea durante la contracción",
            "Relajar por completo entre una contracción y la siguiente",
            "Imaginar una elevación del periné hacia el interior",
            "Sustituirla por glúteos y aductores, con apnea y empuje abdominal"
          ],
          "c": 3,
          "e": "Una contracción adecuada es selectiva. El empuje hacia abajo aumenta la presión sobre el suelo pélvico."
        },
        {
          "q": "Una mujer a los tres meses del parto refiere pérdidas de orina al correr. ¿Qué enfoque es razonable?",
          "o": [
            "Valorar la función del suelo pélvico y progresar el impacto según control",
            "Prohibir cualquier ejercicio hasta que cesen las pérdidas",
            "Indicar abdominales clásicos intensos para fortalecer el centro rápido",
            "Atribuirlas al envejecimiento y a la maternidad sin intervenir"
          ],
          "c": 0,
          "e": "Es una disfunción tratable con entrenamiento específico. Los abdominales clásicos aumentan la presión intraabdominal."
        },
        {
          "q": "¿Cómo se distingue la incontinencia de urgencia de la de esfuerzo?",
          "o": [
            "En la urgencia la pérdida ocurre al toser; en el esfuerzo tras un deseo súbito",
            "La urgencia ocurre solo de noche y la de esfuerzo solo de día",
            "Son la misma condición y solo cambia el momento del día",
            "En la urgencia hay un deseo súbito previo; en el esfuerzo, aumento de presión abdominal"
          ],
          "c": 3,
          "e": "El factor desencadenante orienta el tratamiento. Intercambiar los términos es un error frecuente."
        },
        {
          "q": "Una embarazada de 30 semanas con dolor en la cintura pélvica pregunta qué hacer. ¿Qué es adecuado?",
          "o": [
            "Reposo absoluto en cama hasta el momento del parto para proteger la pelvis",
            "Ejercicio adaptado, educación postural y, si procede, cinturón pélvico",
            "Estiramientos intensos de aductores hasta el máximo rango",
            "Abdominales en decúbito supino prolongado para fortalecer la pared"
          ],
          "c": 1,
          "e": "El reposo absoluto produce descondicionamiento. El decúbito supino prolongado puede reducir el retorno venoso en el embarazo avanzado."
        },
        {
          "q": "En una mujer con dolor pélvico e hipertonía del suelo pélvico, ¿qué se prioriza?",
          "o": [
            "Relajación y respiración diafragmática antes de fortalecer",
            "Fortalecimiento intenso con series repetidas de contracciones",
            "Maniobras de Valsalva para aumentar la presión intraabdominal",
            "Inmovilización para reducir la actividad muscular"
          ],
          "c": 0,
          "e": "Fortalecer un músculo ya hipertónico puede agravar el dolor."
        },
        {
          "q": "Una mujer con diástasis de rectos quiere volver al ejercicio. ¿Qué criterio es más útil?",
          "o": [
            "Decidir según la medida de la separación en centímetros y un valor límite",
            "Hacer abdominales clásicos diarios hasta que la separación desaparezca",
            "Evitar el ejercicio hasta cumplir un año posparto",
            "Observar si el abdomen se abomba al esfuerzo y priorizar el control de presión"
          ],
          "c": 3,
          "e": "La capacidad de transferir carga importa más que la separación medida. Los abdominales clásicos pueden aumentar el abombamiento."
        }
      ]
    },
    {
      "id": "q-cardiaca",
      "titulo": "Rehabilitación cardíaca",
      "desc": "Ejercicio seguro y monitorización",
      "preguntas": [
        {
          "q": "¿Por qué la escala de Borg es útil en pacientes que toman betabloqueantes?",
          "o": [
            "Porque estos fármacos elevan la frecuencia cardiaca durante el ejercicio",
            "Porque la frecuencia cardiaca puede no reflejar la intensidad real",
            "Porque permite prescindir de la vigilancia de la presión arterial",
            "Porque mide directamente el gasto cardiaco del paciente"
          ],
          "c": 1,
          "e": "Los betabloqueantes limitan la frecuencia cardiaca, por lo que la percepción de esfuerzo es un complemento."
        },
        {
          "q": "Durante el ejercicio, un paciente cardiaco presenta mareo y una caída de la presión sistólica. ¿Qué se hace?",
          "o": [
            "Reducir la velocidad y continuar si el mareo cede en uno o dos minutos",
            "Detener el ejercicio, colocarlo en reposo y avisar al médico",
            "Pedirle respiración con labios fruncidos y seguir con el programa",
            "Aumentar la carga para estabilizar la presión"
          ],
          "c": 1,
          "e": "La caída de la presión con síntomas es una señal de alarma. Continuar el ejercicio es un riesgo."
        },
        {
          "q": "¿Cuál es el objetivo de la fase de mantenimiento en rehabilitación cardiaca?",
          "o": [
            "Vigilar al paciente con monitorización continua en el hospital",
            "Sostener un estilo de vida activo y controlar los factores de riesgo",
            "Iniciar la movilización temprana tras la cirugía, aún hospitalizado",
            "Realizar pruebas diagnósticas invasivas de seguimiento"
          ],
          "c": 1,
          "e": "Las fases tempranas son hospitalarias; la de mantenimiento es a largo plazo y comunitaria."
        },
        {
          "q": "Un paciente con esternotomía reciente comienza rehabilitación. ¿Qué precaución es importante?",
          "o": [
            "Evitar cargas que tensen el esternón según la indicación quirúrgica",
            "Hacer empujes con los brazos a carga máxima para recuperar fuerza",
            "Dormir apoyando el peso sobre los brazos para ayudar a la cicatrización",
            "Toser sin protección para limpiar rápido la vía aérea"
          ],
          "c": 0,
          "e": "La estabilidad del esternón es prioritaria. Al toser se protege la incisión con una almohada."
        },
        {
          "q": "¿Qué hallazgo sugiere descompensación en un paciente con insuficiencia cardiaca?",
          "o": [
            "Pérdida de peso con mejor tolerancia al esfuerzo",
            "Sudoración leve tras un ejercicio moderado",
            "Un aumento esperado de la frecuencia cardiaca al esforzarse",
            "Aumento rápido de peso con edema y disnea ante esfuerzos menores"
          ],
          "c": 3,
          "e": "El aumento de peso en pocos días indica retención de líquido y debe comunicarse al equipo médico."
        },
        {
          "q": "Una paciente con angina estable usa nitroglicerina. ¿Qué conviene antes de la sesión?",
          "o": [
            "Evitar preguntar por la medicación para no causarle ansiedad",
            "Confirmar que trae su medicación y parar ante síntomas",
            "Indicarle que supere el dolor torácico porque es parte de la adaptación",
            "Retirar su medicación durante la sesión para evitar interferencias"
          ],
          "c": 1,
          "e": "La angina durante el esfuerzo obliga a detenerse. Pasar por alto el dolor torácico es un riesgo grave."
        }
      ]
    },
    {
      "id": "q-cervical",
      "titulo": "Columna cervical",
      "desc": "Valoración y banderas rojas",
      "preguntas": [
        {
          "q": "¿Qué cuadro es típico de una radiculopatía C6?",
          "o": [
            "Parestesias en el meñique con debilidad de la abducción de los dedos",
            "Pérdida de sensibilidad en la cara medial del brazo y antebrazo",
            "Debilidad aislada de la abducción del hombro sin cambios sensitivos",
            "Parestesias en pulgar e índice con debilidad al extender la muñeca"
          ],
          "c": 3,
          "e": "Cada raíz tiene su dermatoma y miotoma. El meñique corresponde a C8 y la cara medial del brazo a T1."
        },
        {
          "q": "Un paciente con dolor cervical nocturno intenso, antecedente de cáncer y pérdida de peso sin causa. ¿Qué corresponde?",
          "o": [
            "Tratarlo como tensión muscular con calor y movilización",
            "Iniciar un programa de fuerza progresivo",
            "Esperar un mes por si mejora con el tiempo",
            "Considerarlo bandera roja y derivar a valoración médica"
          ],
          "c": 3,
          "e": "La combinación de dolor nocturno, antecedente oncológico y pérdida de peso sugiere patología grave."
        },
        {
          "q": "La prueba de Spurling se considera positiva cuando:",
          "o": [
            "Reproduce solo dolor local del cuello sin irradiación hacia el brazo",
            "Reproduce el dolor irradiado al brazo al comprimir y extender",
            "Aparece mareo con la rotación cervical sostenida durante varios segundos",
            "El dolor disminuye al traccionar la cabeza"
          ],
          "c": 1,
          "e": "Sugiere irritación de una raíz cervical. El dolor local sin irradiación no la confirma."
        },
        {
          "q": "Un oficinista tiene dolor cervical asociado a posturas prolongadas. ¿Qué abordaje es más sólido?",
          "o": [
            "Indicar un collarín rígido durante toda la jornada laboral",
            "Combinar ejercicio activo, educación y variar las posturas",
            "Mantener una postura erguida fija sin pausas",
            "Recurrir al masaje semanal sin añadir ejercicio activo"
          ],
          "c": 1,
          "e": "El collarín prolongado debilita la musculatura. La inmovilidad sostenida es parte del problema."
        },
        {
          "q": "Tras un latigazo cervical sin banderas rojas, ¿qué se recomienda en general?",
          "o": [
            "Inmovilizar con un collarín blando durante varias semanas seguidas",
            "Mantener reposo estricto hasta que desaparezca el dolor",
            "Retomar la actividad temprano y de forma gradual, sin inmovilizar",
            "Evitar el movimiento cervical para no lesionar más"
          ],
          "c": 2,
          "e": "La evidencia favorece la movilización temprana. La inmovilización prolongada retrasa la recuperación."
        },
        {
          "q": "¿Qué cuadro sugiere mielopatía cervical?",
          "o": [
            "Dolor localizado en el cuello sin déficit neurológico asociado",
            "Debilidad aislada del cuello con reflejos disminuidos",
            "Hormigueo que mejora al cambiar de posición",
            "Torpeza de manos con alteración de la marcha e hiperreflexia"
          ],
          "c": 3,
          "e": "Indica compresión de la médula y requiere derivación. Los reflejos aumentados distinguen la lesión de motoneurona superior."
        }
      ]
    },
    {
      "id": "q-hombro",
      "titulo": "Hombro",
      "desc": "Manguito, escápula y estabilidad",
      "preguntas": [
        {
          "q": "¿Qué consecuencia tiene una rotación superior insuficiente de la escápula al elevar el brazo?",
          "o": [
            "Aumenta el espacio subacromial y protege el manguito",
            "Disminuye la carga sobre el supraespinoso",
            "Reduce el espacio subacromial y favorece el pinzamiento",
            "Limita solo la rotación interna del hombro"
          ],
          "c": 2,
          "e": "La escápula debe orientar el acromion para dejar espacio al manguito."
        },
        {
          "q": "Un paciente tiene dolor al elevar el brazo entre rangos intermedios y una prueba de Neer positiva. ¿Qué es compatible?",
          "o": [
            "Una luxación anterior que requiere inmovilización",
            "Una capsulitis adhesiva en fase congelada",
            "Dolor subacromial, con control escapular y del manguito",
            "Una radiculopatía C5 que exige tracción cervical"
          ],
          "c": 2,
          "e": "El arco doloroso y la prueba de Neer apuntan a estructuras subacromiales. La capsulitis limita también el movimiento pasivo."
        },
        {
          "q": "Un paciente de 55 años, diabético, tiene rigidez progresiva y pérdida de la rotación externa pasiva. ¿Qué se sospecha?",
          "o": [
            "Capsulitis adhesiva, que limita el movimiento activo y pasivo",
            "Rotura del manguito, que limita solo el movimiento activo",
            "Artrosis acromioclavicular con limitación aislada en aducción horizontal",
            "Tendinopatía bicipital sin restricción capsular"
          ],
          "c": 0,
          "e": "La limitación pasiva marcada orienta a una causa capsular. En la rotura del manguito el movimiento pasivo suele conservarse."
        },
        {
          "q": "¿Qué sugiere una prueba de aprensión positiva?",
          "o": [
            "Rotura del tendón del subescapular",
            "Inestabilidad glenohumeral anterior",
            "Patología de la articulación acromioclavicular",
            "Compresión del plexo braquial"
          ],
          "c": 1,
          "e": "El paciente siente que el hombro se va a salir. No evalúa el manguito."
        },
        {
          "q": "¿Qué músculo se evalúa con la prueba de Gerber (lift-off)?",
          "o": [
            "El supraespinoso",
            "El infraespinoso",
            "El subescapular",
            "El redondo mayor"
          ],
          "c": 2,
          "e": "La prueba exige rotación interna con la mano en la espalda. El supraespinoso se explora con la abducción."
        },
        {
          "q": "Una paciente con tendinopatía del manguito inicia rehabilitación. ¿Qué enfoque es adecuado?",
          "o": [
            "Ejercicio progresivo de manguito y escápula con dolor tolerable",
            "Reposo completo hasta que desaparezca todo dolor en reposo y movimiento",
            "Estiramientos agresivos hasta el límite doloroso",
            "Hielo antes de cada sesión como tratamiento principal"
          ],
          "c": 0,
          "e": "El tendón se adapta a la carga progresiva. El reposo total reduce la capacidad del tejido."
        }
      ]
    },
    {
      "id": "q-rodilla",
      "titulo": "Rodilla",
      "desc": "Lesiones y rehabilitación",
      "preguntas": [
        {
          "q": "¿Cuál es el mecanismo típico de una lesión de LCA sin contacto?",
          "o": [
            "Hiperflexión forzada con carga máxima sobre el pie",
            "Golpe directo sobre la tibia proximal con la rodilla flexionada",
            "Rotación externa aislada del pie sin carga",
            "Desaceleración o cambio de dirección con valgo y rotación"
          ],
          "c": 3,
          "e": "El golpe en la tibia proximal con rodilla flexionada es el mecanismo típico del ligamento cruzado posterior."
        },
        {
          "q": "Un paciente no logra extender la rodilla tras un giro y la siente bloqueada. ¿Qué se sospecha?",
          "o": [
            "Rigidez del cuádriceps que se resuelve estirando con fuerza",
            "Una lesión del ligamento colateral medial tratable con fuerza",
            "Lesión meniscal con fragmento desplazado, que requiere valoración",
            "Una bursitis prerrotuliana que mejora con calor local"
          ],
          "c": 2,
          "e": "El bloqueo mecánico indica un obstáculo intraarticular, no una rigidez muscular."
        },
        {
          "q": "¿Qué abordaje es razonable en el dolor patelofemoral?",
          "o": [
            "Ejercicio de cadera y rodilla con carga progresiva",
            "Reposo relativo prolongado hasta que desaparezca el dolor",
            "Vendaje rotuliano permanente como única medida",
            "Cirugía de liberación lateral como primera opción"
          ],
          "c": 0,
          "e": "El ejercicio es la base del manejo conservador. El reposo prolongado debilita la musculatura."
        },
        {
          "q": "Tres días después de una meniscectomía parcial, ¿qué metas son prioritarias?",
          "o": [
            "Forzar la flexión máxima para evitar adherencias tempranas",
            "Controlar el derrame y recuperar la extensión completa",
            "Evitar el apoyo completo durante varias semanas por rutina",
            "Iniciar impacto progresivo y saltos desde la primera semana"
          ],
          "c": 1,
          "e": "La extensión y el control del derrame son metas tempranas. El impacto precoz no está indicado."
        },
        {
          "q": "El signo de hundimiento posterior (sag sign) sugiere lesión de:",
          "o": [
            "El ligamento cruzado anterior",
            "El ligamento cruzado posterior",
            "El ligamento colateral lateral de la rodilla",
            "El menisco medial"
          ],
          "c": 1,
          "e": "La tibia cae hacia atrás por la gravedad cuando falta el ligamento cruzado posterior."
        },
        {
          "q": "Un jugador de baloncesto tiene tendinopatía rotuliana. ¿Qué manejo es más sólido?",
          "o": [
            "Carga progresiva del tendón, de isométrica a fuerza lenta",
            "Reposo total hasta que desaparezca la sensibilidad a la palpación",
            "Estiramiento del cuádriceps como tratamiento único",
            "Masaje transverso profundo diario como tratamiento principal"
          ],
          "c": 0,
          "e": "El tendón requiere carga graduada. La sensibilidad a la palpación puede persistir aunque la función mejore."
        }
      ]
    },
    {
      "id": "q-cadera",
      "titulo": "Cadera",
      "desc": "Estructura, dolor y función",
      "preguntas": [
        {
          "q": "¿Qué sugiere una prueba FADIR positiva?",
          "o": [
            "Pinzamiento femoroacetabular intraarticular",
            "Una radiculopatía lumbar baja con dolor irradiado",
            "Un síndrome del músculo piramidal",
            "Una bursitis isquiática por sedestación"
          ],
          "c": 0,
          "e": "La flexión, aducción y rotación interna comprimen la zona anterior de la articulación."
        },
        {
          "q": "Una corredora tiene dolor lateral de cadera que empeora al acostarse de lado y al apoyarse en una pierna. ¿Qué es compatible?",
          "o": [
            "Pinzamiento anterior, para lo que se evita por completo la flexión",
            "Hernia discal L4 que requiere tracción",
            "Tendinopatía glútea, con fortalecimiento de abductores",
            "Pubalgia que se trata con reposo de los aductores"
          ],
          "c": 2,
          "e": "El dolor lateral con compresión y apoyo unipodal orienta al tendón glúteo."
        },
        {
          "q": "Tras una artroplastia con abordaje posterior, ¿qué movimientos se limitan típicamente?",
          "o": [
            "Extensión y rotación externa combinadas con carga elevada",
            "Abducción y rotación externa combinadas con el tronco erguido",
            "Flexión excesiva, aducción y rotación interna combinadas",
            "Cualquier movimiento sin descarga parcial del miembro"
          ],
          "c": 2,
          "e": "Esas posiciones favorecen la luxación posterior. Las precauciones dependen del cirujano."
        },
        {
          "q": "Una persona mayor tiene dolor inguinal tras una caída, con el miembro acortado y rotado hacia fuera. ¿Qué corresponde?",
          "o": [
            "Sospechar fractura de cuello femoral, no cargar y derivar",
            "Pensar en contractura del psoas y estirar con suavidad",
            "Pensar en bursitis y aplicar calor local",
            "Pensar en esguince de aductores y reposo relativo"
          ],
          "c": 0,
          "e": "El acortamiento y la rotación externa son signos clásicos de fractura de cadera."
        },
        {
          "q": "¿Qué hallazgo precoz sugiere artrosis de cadera?",
          "o": [
            "Dolor en la cara posterior del muslo al sentarse",
            "Chasquido lateral sin limitación del movimiento",
            "Dolor en la cara anterior de la rodilla al bajar escaleras",
            "Pérdida de la rotación interna con dolor inguinal"
          ],
          "c": 3,
          "e": "La rotación interna es el primer movimiento que se pierde en la coxartrosis."
        },
        {
          "q": "Un paciente con coxartrosis pregunta si debe evitar ejercicio para no desgastar la articulación. ¿Qué se responde?",
          "o": [
            "El ejercicio terapéutico y la educación son la base conservadora",
            "Que conviene evitar el ejercicio para proteger el cartílago",
            "Que lo mejor es reposar hasta la indicación de prótesis",
            "Que bastan los estiramientos pasivos como única intervención"
          ],
          "c": 0,
          "e": "El ejercicio mejora dolor y función. Evitarlo por miedo al desgaste es un mito."
        }
      ]
    },
    {
      "id": "q-tobillo",
      "titulo": "Tobillo y pie",
      "desc": "Esguinces, tendón y arco",
      "preguntas": [
        {
          "q": "Tras un esguince, hay dolor a la palpación de la base del quinto metatarsiano. ¿Qué sugiere?",
          "o": [
            "Una lesión aislada del ligamento deltoideo sin fractura",
            "Una tendinopatía del tendón de Aquiles",
            "Una posible fractura que justifica radiografía",
            "Una fascitis plantar secundaria"
          ],
          "c": 2,
          "e": "Las reglas de Ottawa incluyen la palpación de esa base ósea."
        },
        {
          "q": "Cinco días después de un esguince lateral, un paciente tolera caminar. ¿Qué conviene?",
          "o": [
            "Inmovilizar con férula rígida durante tres semanas completas",
            "Iniciar movilidad y carga progresiva, con trabajo propioceptivo",
            "Realizar estiramientos máximos y sostenidos en inversión",
            "Volver al deporte de inmediato solo con un vendaje"
          ],
          "c": 1,
          "e": "La movilización funcional temprana da mejores resultados que la inmovilización prolongada."
        },
        {
          "q": "El test de Thompson positivo sugiere:",
          "o": [
            "Esguince de la sindesmosis tibioperonea",
            "Fractura del maléolo",
            "Rotura del tendón de Aquiles",
            "Neuroma de Morton del antepié"
          ],
          "c": 2,
          "e": "Al apretar la pantorrilla, el pie no se flexiona plantarmente si el tendón está roto."
        },
        {
          "q": "Un paciente tiene dolor de talón en los primeros pasos de la mañana que mejora al caminar. ¿Qué es compatible?",
          "o": [
            "Rotura del Aquiles, que se maneja con inmovilización",
            "Síndrome del túnel tarsiano, que se maneja con reposo",
            "Fascitis plantar, con carga progresiva del arco",
            "Fractura de estrés, que exige descarga total y bota"
          ],
          "c": 2,
          "e": "El dolor inicial que cede es típico de la fascitis. La fractura de estrés empeora con el uso."
        },
        {
          "q": "¿Qué mecanismo suele producir un esguince de sindesmosis?",
          "o": [
            "Inversión forzada con flexión plantar del pie",
            "Eversión forzada con el pie relajado",
            "Rotación externa del pie con dorsiflexión",
            "Impacto vertical sin rotación"
          ],
          "c": 2,
          "e": "La inversión produce el esguince lateral; la sindesmosis (esguince alto) requiere rotación."
        },
        {
          "q": "Una persona con inestabilidad crónica de tobillo quiere evitar recaídas. ¿Qué ejercicio es más específico?",
          "o": [
            "Sentadilla bipodal sobre superficie firme con carga alta",
            "Estiramiento pasivo del sóleo en descarga",
            "Apoyo unipodal en superficie inestable, con progresión",
            "Pedaleo suave sin resistencia"
          ],
          "c": 2,
          "e": "El déficit es de control neuromuscular, que se entrena con retos de equilibrio."
        }
      ]
    },
    {
      "id": "q-prevencion",
      "titulo": "Prevención de lesiones deportivas",
      "desc": "Carga, recuperación y riesgo",
      "preguntas": [
        {
          "q": "Una relación elevada entre carga aguda y carga crónica sugiere:",
          "o": [
            "Un atleta subentrenado y protegido frente a lesiones",
            "Una reducción de la carga tras una lesión",
            "Una mayor capacidad para tolerar picos de carga",
            "Un aumento reciente y brusco, con mayor riesgo de lesión"
          ],
          "c": 3,
          "e": "Los cambios bruscos superan la capacidad de adaptación del tejido."
        },
        {
          "q": "Un corredor aumentó mucho su volumen semanal y presenta dolor tibial. ¿Cuál es la interpretación más probable?",
          "o": [
            "Debilidad de los brazos y el tronco como causa principal",
            "Calzado defectuoso como causa única, por lo que basta cambiarlo",
            "Falta de flexibilidad, por lo que basta estirar antes de correr",
            "Sobrecarga por progresión excesiva, por lo que se ajusta el volumen"
          ],
          "c": 3,
          "e": "El aumento rápido del volumen es el desencadenante clásico del dolor tibial por sobrecarga."
        },
        {
          "q": "Un programa para evitar la reincidencia de una lesión ya ocurrida es de prevención:",
          "o": [
            "Secundaria",
            "Primaria",
            "Primordial",
            "Cuaternaria"
          ],
          "c": 0,
          "e": "La primaria evita que aparezca la lesión; la secundaria evita su recaída tras haberla sufrido."
        },
        {
          "q": "Una futbolista quiere reducir su riesgo de lesión de LCA. ¿Qué programa es más sólido?",
          "o": [
            "Aumentar solo el volumen de carrera continua semanal",
            "Programa neuromuscular con aterrizajes, fuerza y control de cadera",
            "Estiramientos estáticos largos antes de cada partido o entrenamiento",
            "Usar una rodillera rígida en todos los entrenamientos"
          ],
          "c": 1,
          "e": "Los programas neuromusculares reducen la incidencia. La rodillera no sustituye el control motor."
        },
        {
          "q": "¿Qué efecto puede tener el estiramiento estático largo justo antes de un esfuerzo máximo?",
          "o": [
            "Aumentar la potencia máxima de forma sostenida",
            "Prevenir por sí solo todas las lesiones musculares",
            "No tiene ningún efecto fisiológico",
            "Reducir fuerza y potencia de forma transitoria"
          ],
          "c": 3,
          "e": "Se recomienda un calentamiento dinámico previo a eventos de potencia."
        },
        {
          "q": "Un atleta presenta fatiga, bajo rendimiento, sueño alterado y múltiples molestias. ¿Qué sospecha es razonable?",
          "o": [
            "Falta de estímulo, por lo que se intensifica el entrenamiento",
            "Ausencia de calentamiento como causa única del cuadro",
            "Déficit de suplementos como única explicación",
            "Recuperación insuficiente o sobreentrenamiento, con ajuste de carga"
          ],
          "c": 3,
          "e": "El patrón sugiere un desbalance entre carga y recuperación."
        }
      ]
    },
    {
      "id": "q-ergonomia",
      "titulo": "Ergonomía y postura",
      "desc": "Trabajo, tareas y entorno",
      "preguntas": [
        {
          "q": "¿Por qué es problemática la carga estática sostenida?",
          "o": [
            "Porque aumenta el flujo sanguíneo muscular y evita la fatiga",
            "Porque solo es nociva si el peso supera un valor fijo",
            "Porque la contracción mantenida reduce el flujo muscular y fatiga",
            "Porque disminuye la carga sobre las articulaciones de la columna"
          ],
          "c": 2,
          "e": "La contracción sostenida comprime los vasos y limita el aporte de oxígeno."
        },
        {
          "q": "Una trabajadora usa una laptop sobre el escritorio y tiene dolor cervical. ¿Qué cambio es más útil?",
          "o": [
            "Bajar más la pantalla para relajar el cuello",
            "Colocar una almohadilla lumbar como única modificación",
            "Colocar la pantalla lateral al lado dominante",
            "Elevar la pantalla y usar teclado y ratón externos"
          ],
          "c": 3,
          "e": "La pantalla baja obliga a flexionar el cuello. Separar pantalla y teclado permite una postura neutra."
        },
        {
          "q": "¿Cómo conviene organizar los objetos de uso frecuente en un puesto de trabajo?",
          "o": [
            "Lejos del cuerpo, para promover el estiramiento",
            "Cerca del cuerpo, para evitar alcances sostenidos",
            "Por encima de los hombros, para dejar espacio libre",
            "En posiciones cambiantes al azar cada día"
          ],
          "c": 1,
          "e": "Los alcances lejanos o elevados aumentan la carga sobre hombro y columna."
        },
        {
          "q": "Un trabajador de almacén levanta cajas muchas veces al día y tiene dolor lumbar. ¿Qué abordaje es más sólido?",
          "o": [
            "Indicar una faja rígida como solución principal del problema",
            "Rediseñar la tarea: menos peso, altura y repetición, y capacitar la técnica",
            "Recomendar reposo hasta que ceda por completo el dolor lumbar",
            "Pedirle que levante más rápido para reducir el tiempo de exposición"
          ],
          "c": 1,
          "e": "La ergonomía actúa primero sobre la tarea. La faja no corrige la exposición."
        },
        {
          "q": "¿Qué valoran métodos como RULA o REBA?",
          "o": [
            "La capacidad aeróbica del trabajador",
            "El riesgo postural asociado a una tarea",
            "La fuerza máxima de agarre",
            "El nivel de ruido del puesto"
          ],
          "c": 1,
          "e": "Son herramientas de observación de posturas y esfuerzos."
        },
        {
          "q": "¿Qué ajuste de la silla es razonable?",
          "o": [
            "Rodillas muy por encima de las caderas con los pies colgando",
            "Asiento muy alto, con los antebrazos sin apoyo y los pies colgando",
            "Pies apoyados, rodillas a unos 90 grados y antebrazos apoyados",
            "Respaldo inclinado hacia delante"
          ],
          "c": 2,
          "e": "Un buen ajuste distribuye el peso y evita la tensión en cuello y hombros."
        }
      ]
    },
    {
      "id": "q-dolorcronico",
      "titulo": "Neurociencia del dolor",
      "desc": "Dolor persistente y manejo",
      "preguntas": [
        {
          "q": "¿Qué es la alodinia?",
          "o": [
            "Dolor ante un estímulo que normalmente no es doloroso",
            "Mayor dolor ante un estímulo que ya es doloroso",
            "Ausencia de dolor ante un estímulo doloroso",
            "Dolor espontáneo sin estímulo aparente"
          ],
          "c": 0,
          "e": "La hiperalgesia es la respuesta aumentada a un estímulo doloroso. Son conceptos cercanos que se confunden."
        },
        {
          "q": "Un paciente con lumbalgia de ocho meses piensa que su espalda está destruida por una resonancia con protrusiones y evita moverse. ¿Qué es lo adecuado?",
          "o": [
            "Confirmar que la lesión estructural explica todo el dolor",
            "Explicar que esos hallazgos son comunes sin dolor y reducir la amenaza",
            "Indicar reposo prolongado para proteger la zona afectada",
            "Evitar hablar de la resonancia para no generar más ansiedad"
          ],
          "c": 1,
          "e": "Los hallazgos de imagen se correlacionan débilmente con el dolor. Evitar el tema deja intactas las creencias dañinas."
        },
        {
          "q": "¿Qué diferencia hay entre nocicepción y dolor?",
          "o": [
            "La nocicepción es procesamiento neural; el dolor es una experiencia del cerebro",
            "La nocicepción es una experiencia consciente; el dolor es un reflejo medular",
            "Son equivalentes y se usan indistintamente en la práctica clínica",
            "El dolor existe solo cuando hay una lesión tisular demostrable"
          ],
          "c": 0,
          "e": "Puede haber dolor sin lesión y lesión sin dolor."
        },
        {
          "q": "Una paciente con fibromialgia aumenta su dolor durante un día tras ejercitarse. ¿Qué se hace?",
          "o": [
            "Ajustar y progresar con dosis muy graduales, explicando la variabilidad",
            "Suspender el ejercicio hasta que el dolor desaparezca por completo",
            "Aumentar bruscamente la carga para desensibilizar el sistema",
            "Indicar reposo prolongado hasta que el dolor se estabilice"
          ],
          "c": 0,
          "e": "La actividad graduada es una base del tratamiento. Un aumento transitorio no implica daño."
        },
        {
          "q": "¿Qué son las banderas amarillas?",
          "o": [
            "Signos de patología grave que exigen derivación",
            "Factores psicosociales que predicen cronicidad",
            "Barreras del entorno laboral únicamente",
            "Hallazgos de imagen de mal pronóstico"
          ],
          "c": 1,
          "e": "Las banderas rojas indican patología grave; las amarillas, factores psicosociales."
        },
        {
          "q": "Un paciente cree que el movimiento daña su espalda. ¿Qué estrategia es más razonable?",
          "o": [
            "Evitar la actividad hasta que cese el dolor",
            "Exposición gradual con experiencias seguras y metas funcionales",
            "Tranquilizarlo verbalmente sin movimiento",
            "Cargar fuerte desde el inicio para demostrar que no pasa nada"
          ],
          "c": 1,
          "e": "La exposición gradual modifica la creencia mediante la experiencia."
        }
      ]
    },
    {
      "id": "q-linfedema",
      "titulo": "Linfedema y oncología",
      "desc": "Sistema linfático y seguridad",
      "preguntas": [
        {
          "q": "¿Qué indica un signo de Stemmer positivo?",
          "o": [
            "No poder pellizcar la piel del segundo dedo, sugestivo de linfedema",
            "Dolor en la pantorrilla al dorsiflexionar el pie, sugestivo de trombosis",
            "Fóvea profunda que no revierte, sugestiva de insuficiencia cardiaca",
            "Dolor en la corva al extender la rodilla, sugestivo de ciática"
          ],
          "c": 0,
          "e": "El signo de Homans corresponde a la sospecha de trombosis, no al linfedema."
        },
        {
          "q": "Una persona presenta edema de una pierna de inicio súbito, con dolor y calor. ¿Qué corresponde?",
          "o": [
            "Descartar trombosis venosa profunda antes de masajear o comprimir",
            "Iniciar drenaje linfático manual intenso desde la primera sesión",
            "Aplicar un vendaje compresivo máximo y elevar la pierna",
            "Atribuirlo a linfedema y comenzar ejercicio de resistencia"
          ],
          "c": 0,
          "e": "Manipular un trombo puede ser peligroso."
        },
        {
          "q": "¿Cuál es una contraindicación del drenaje linfático manual?",
          "o": [
            "Edema crónico estable sin signos de infección ni trombosis",
            "Cicatriz posquirúrgica cerrada y sin signos de inflamación",
            "Fibrosis leve posterior a radioterapia, sin dolor agudo",
            "Infección aguda, trombosis o insuficiencia cardiaca grave"
          ],
          "c": 3,
          "e": "Aumentar el retorno de líquido puede descompensar a un paciente con insuficiencia cardiaca."
        },
        {
          "q": "Una mujer con mastectomía y linfedema leve pregunta por el ejercicio. ¿Qué se responde?",
          "o": [
            "Ejercicio supervisado y progresivo, con compresión",
            "Debe evitarlo, porque el esfuerzo empeora el edema",
            "Debe hacer ejercicios con carga máxima para forzar el drenaje",
            "Debe mantener el brazo inmóvil y elevado"
          ],
          "c": 0,
          "e": "El ejercicio progresivo no aumenta el riesgo y mejora la función."
        },
        {
          "q": "Un linfedema con fóvea que disminuye al elevar el miembro corresponde a:",
          "o": [
            "Una etapa latente sin signos visibles",
            "Una etapa irreversible con fibrosis marcada",
            "Una elefantiasis linfostática establecida",
            "Una etapa temprana potencialmente reversible"
          ],
          "c": 3,
          "e": "Con el tiempo aparece fibrosis y la fóvea se pierde."
        },
        {
          "q": "Un paciente oncológico presenta plaquetas bajas. ¿Qué precaución es adecuada?",
          "o": [
            "Hacer ejercicio de resistencia máxima con supervisión",
            "Aplicar masaje profundo para estimular la circulación",
            "No modificar nada del programa habitual",
            "Ajustar la intensidad y evitar resistencias altas o golpes"
          ],
          "c": 3,
          "e": "Con trombocitopenia aumenta el riesgo de sangrado."
        }
      ]
    },
    {
      "id": "q-amputacion",
      "titulo": "Amputación y prótesis",
      "desc": "Rehabilitación y cuidado del muñón",
      "preguntas": [
        {
          "q": "¿Cómo se diferencia el dolor del muñón del dolor fantasma?",
          "o": [
            "El del muñón se percibe en el segmento ausente; el fantasma es local",
            "Son lo mismo y tienen el mismo origen y tratamiento",
            "El del muñón es local; el fantasma se percibe en el segmento ausente",
            "El dolor del muñón aparece solo al usar la prótesis"
          ],
          "c": 2,
          "e": "Distinguirlos orienta el tratamiento."
        },
        {
          "q": "¿Cómo debe aplicarse un vendaje compresivo en un muñón transtibial?",
          "o": [
            "Con una vuelta circular apretada sobre el borde proximal",
            "Sin vendaje, para dejar respirar la piel y evitar maceración",
            "Con mayor presión proximal para impedir el retorno",
            "Con presión decreciente hacia proximal, sin efecto de torniquete"
          ],
          "c": 3,
          "e": "Busca modelar y controlar el edema sin comprometer la circulación."
        },
        {
          "q": "¿Qué contractura es típica en un amputado transtibial?",
          "o": [
            "Flexión de la rodilla",
            "Extensión de la rodilla",
            "Rotación externa de cadera",
            "Abducción de cadera"
          ],
          "c": 0,
          "e": "Colocar almohadas bajo la rodilla favorece este acortamiento."
        },
        {
          "q": "Un amputado presenta una zona enrojecida y con úlcera en el muñón tras usar la prótesis. ¿Qué corresponde?",
          "o": [
            "Continuar usando la prótesis para que la piel se endurezca",
            "Aplicar un vendaje apretado directamente sobre la úlcera",
            "Añadir más calcetines al muñón sin revisar el encaje",
            "Suspender el uso, proteger la piel y avisar al protesista"
          ],
          "c": 3,
          "e": "La presión repetida sobre una lesión la agrava."
        },
        {
          "q": "¿Para qué se utiliza la terapia de espejo?",
          "o": [
            "Para entrenar el equilibrio en la marcha",
            "Para reducir el edema del muñón",
            "Para fortalecer la musculatura del muñón",
            "Para manejar el dolor del miembro fantasma"
          ],
          "c": 3,
          "e": "Proporciona una retroalimentación visual del miembro ausente."
        },
        {
          "q": "En un amputado transfemoral, ¿qué grupo conviene fortalecer para estabilizar la marcha?",
          "o": [
            "Principalmente los flexores de la cadera",
            "Ninguno del muñón, para evitar dolor",
            "Exclusivamente el miembro sano",
            "Extensores y abductores de la cadera"
          ],
          "c": 3,
          "e": "Los abductores controlan la pelvis durante el apoyo con prótesis."
        }
      ]
    },
    {
      "id": "q-vendajes",
      "titulo": "Vendajes y kinesiotape",
      "desc": "Tipos, aplicación y precauciones",
      "preguntas": [
        {
          "q": "¿Qué diferencia hay entre un vendaje funcional rígido y uno elástico?",
          "o": [
            "El rígido permite todo el movimiento; el elástico lo restringe",
            "No existe diferencia, solo cambia la marca del material",
            "El rígido restringe el movimiento; el elástico lo permite",
            "El elástico se reserva para pacientes pediátricos"
          ],
          "c": 2,
          "e": "La elección depende del objetivo de estabilización."
        },
        {
          "q": "Tras vendar una pantorrilla, el paciente refiere hormigueo y los dedos están fríos y pálidos. ¿Qué se hace?",
          "o": [
            "Mantenerlo unas horas para que el tejido se acostumbre",
            "Retirarlo y recolocarlo con menos tensión",
            "Apretar más para mejorar el retorno venoso",
            "Esperar 24 horas antes de volver a revisarlo"
          ],
          "c": 1,
          "e": "Es una señal de compromiso vascular o nervioso por exceso de presión."
        },
        {
          "q": "¿En qué sentido se aplica un vendaje compresivo en un miembro?",
          "o": [
            "De proximal a distal, con presión creciente",
            "De distal a proximal, con presión decreciente",
            "De distal a proximal, con presión creciente",
            "Con presión uniforme y máxima en todo el trayecto"
          ],
          "c": 1,
          "e": "La presión decreciente favorece el retorno."
        },
        {
          "q": "Un paciente es alérgico a adhesivos. ¿Qué conviene?",
          "o": [
            "Aplicar sin prueba previa, porque la alergia suele ser leve",
            "Probar en una zona pequeña o usar una opción hipoalergénica",
            "Aplicar sobre una crema para prevenir la reacción",
            "Aumentar la tensión para que adhiera mejor"
          ],
          "c": 1,
          "e": "Una prueba previa evita reacciones cutáneas mayores."
        },
        {
          "q": "¿Cuál es el mecanismo propuesto para el efecto del kinesiotape?",
          "o": [
            "Inmovilización mecánica de la articulación afectada",
            "Corrección estructural del ligamento lesionado",
            "Estimulación cutánea que modula la percepción y la propiocepción",
            "Liberación de adherencias fasciales profundas del músculo"
          ],
          "c": 2,
          "e": "No inmoviliza, por eso no sustituye un vendaje rígido."
        },
        {
          "q": "Un atleta con un esguince estable vuelve a practicar. ¿Cómo se usa el vendaje funcional?",
          "o": [
            "Como sustituto del trabajo de control neuromuscular",
            "Sin ejercicio de acompañamiento",
            "De manera indefinida durante toda la temporada",
            "Como apoyo temporal junto con la rehabilitación"
          ],
          "c": 3,
          "e": "El vendaje complementa el control activo; no lo reemplaza."
        }
      ]
    },
    {
      "id": "q-etica",
      "titulo": "Bioseguridad, ética y comunicación",
      "desc": "Práctica profesional segura",
      "preguntas": [
        {
          "q": "¿En qué momento corresponde la higiene de manos?",
          "o": [
            "Solo al iniciar el turno y al terminar la jornada",
            "Solo después de atender a cada paciente, no antes",
            "Antes de tocar al paciente y tras tocar su entorno",
            "Únicamente cuando las manos se ven sucias"
          ],
          "c": 2,
          "e": "Los momentos de la OMS incluyen antes y después del contacto."
        },
        {
          "q": "Un familiar de otro paciente pide detalles del diagnóstico de la persona que acaba de salir. ¿Qué corresponde?",
          "o": [
            "Dar detalles si no menciona el nombre",
            "Negarse por confidencialidad",
            "Informar si el familiar parece conocerlo",
            "Compartir si es pariente del paciente"
          ],
          "c": 1,
          "e": "El secreto profesional exige autorización del paciente."
        },
        {
          "q": "¿A qué principio bioético corresponde respetar el derecho a decidir sobre su atención?",
          "o": [
            "Beneficencia",
            "Autonomía",
            "No maleficencia",
            "Justicia"
          ],
          "c": 1,
          "e": "La autonomía respalda el consentimiento informado."
        },
        {
          "q": "Un paciente rechaza una técnica tras recibir la explicación. ¿Qué corresponde?",
          "o": [
            "Respetar la decisión, ofrecer alternativas y registrarlo",
            "Aplicarla con insistencia, explicando de nuevo sus beneficios",
            "Darlo de alta por falta de adherencia al tratamiento",
            "No registrarlo en la nota para evitar conflictos"
          ],
          "c": 0,
          "e": "El rechazo informado es un derecho del paciente."
        },
        {
          "q": "¿A quién se aplican las precauciones estándar?",
          "o": [
            "Solo a pacientes con infecciones confirmadas",
            "Solo durante procedimientos invasivos o con fluidos visibles",
            "Solo en pacientes hospitalizados con aislamiento",
            "A todos los pacientes, sin importar el diagnóstico"
          ],
          "c": 3,
          "e": "Se asume que cualquier fluido puede ser infeccioso."
        },
        {
          "q": "Ocurre un incidente durante una sesión sin daño aparente. ¿Qué corresponde?",
          "o": [
            "Corregir el problema sin avisar a nadie más",
            "Ocultarlo si no hubo daño aparente al paciente",
            "Reportar y documentar con transparencia",
            "Atribuirlo a la falta de cooperación del paciente"
          ],
          "c": 2,
          "e": "La cultura de seguridad se apoya en el reporte."
        }
      ]
    }
  ],
  "orden": [
    {
      "id": "o-ejercicio",
      "titulo": "Progresión de ejercicio tras una lesión",
      "desc": "De la fase aguda al retorno",
      "pasos": [
        "Control del dolor y del edema",
        "Recuperar el rango de movimiento",
        "Fortalecimiento progresivo",
        "Entrenamiento funcional y propioceptivo",
        "Retorno gradual a la actividad o deporte"
      ]
    },
    {
      "id": "o-evaluacion",
      "titulo": "Evaluación fisioterapéutica",
      "desc": "Del primer contacto al plan",
      "pasos": [
        "Entrevista e historia clínica",
        "Inspección y observación postural",
        "Pruebas de movimiento y de fuerza",
        "Pruebas especiales",
        "Diagnóstico fisioterapéutico y metas del tratamiento"
      ]
    },
    {
      "id": "o-sesion",
      "titulo": "Una sesión de fisioterapia",
      "desc": "Orden recomendado de la sesión",
      "pasos": [
        "Revisar síntomas y respuesta desde la última sesión",
        "Reevaluar con una medida objetiva",
        "Aplicar la intervención principal",
        "Ejercicio y educación al paciente",
        "Registrar y dejar plan para casa"
      ]
    },
    {
      "id": "o-respiratoria",
      "titulo": "Rehabilitación respiratoria",
      "desc": "Componentes de un programa",
      "pasos": [
        "Educación y respiración diafragmática",
        "Higiene bronquial",
        "Ejercicio aeróbico de baja intensidad",
        "Fortalecimiento muscular",
        "Mantenimiento y autocuidado en casa"
      ]
    },
    {
      "id": "o-transferencia",
      "titulo": "Transferencia segura de silla a camilla",
      "desc": "Cambio de superficie con seguridad",
      "pasos": [
        "Explicar al paciente lo que se hará",
        "Acercar la silla y poner frenos",
        "Ajustar la camilla a altura adecuada",
        "Guiar el movimiento con apoyo estable",
        "Acomodar al paciente y verificar comodidad"
      ]
    },
    {
      "id": "o-lavado",
      "titulo": "Lavado de manos clínico",
      "desc": "Higiene antes de tocar al paciente",
      "pasos": [
        "Retirar joyas y subir las mangas",
        "Mojar manos y aplicar jabón",
        "Frotar palmas, dedos, uñas y muñecas",
        "Enjuagar con abundante agua",
        "Secar con toalla desechable y cerrar la llave"
      ]
    },
    {
      "id": "o-tens",
      "titulo": "Colocación de TENS",
      "desc": "Preparación y seguridad del equipo",
      "pasos": [
        "Revisar indicaciones y contraindicaciones",
        "Explicar al paciente la sensación esperada",
        "Limpiar la piel y colocar los electrodos",
        "Aumentar la intensidad de forma gradual",
        "Vigilar al paciente y retirar con el equipo apagado"
      ]
    },
    {
      "id": "o-compresa-fria",
      "titulo": "Aplicación de compresa fría",
      "desc": "Crioterapia con protección de la piel",
      "pasos": [
        "Revisar la sensibilidad y la piel",
        "Envolver la compresa en una toalla",
        "Colocar la compresa sobre la zona",
        "Vigilar la piel y la tolerancia",
        "Retirar, revisar la piel y registrar"
      ]
    },
    {
      "id": "o-goniometro",
      "titulo": "Uso del goniómetro",
      "desc": "Medición del rango articular",
      "pasos": [
        "Posicionar al paciente y la articulación",
        "Localizar los puntos de referencia óseos",
        "Alinear el eje y los brazos del goniómetro",
        "Mover la articulación y leer el ángulo",
        "Registrar la medición con la posición usada"
      ]
    },
    {
      "id": "o-prep-sesion",
      "titulo": "Preparar una sesión de ejercicio",
      "desc": "Antes de iniciar el ejercicio terapéutico",
      "pasos": [
        "Revisar el plan y las notas previas",
        "Preparar espacio y material necesarios",
        "Preguntar al paciente cómo se siente",
        "Realizar calentamiento y explicar los ejercicios",
        "Iniciar el ejercicio con vigilancia de síntomas"
      ]
    },
    {
      "id": "o-andador",
      "titulo": "Marcha con andador",
      "desc": "Secuencia básica de pasos",
      "pasos": [
        "Colocar al paciente de pie dentro del andador",
        "Avanzar el andador a una distancia corta",
        "Adelantar la pierna más débil",
        "Adelantar la otra pierna",
        "Repetir la secuencia con supervisión cercana"
      ]
    },
    {
      "id": "o-muletas-escaleras",
      "titulo": "Subir escaleras con muletas",
      "desc": "Orden de apoyo al subir",
      "pasos": [
        "Acercarse al escalón con las muletas",
        "Subir primero la pierna sana",
        "Subir después las muletas y la pierna lesionada",
        "Mantener el equilibrio antes del siguiente escalón",
        "Repetir con el terapeuta atrás y a un lado"
      ]
    },
    {
      "id": "o-vendaje-tobillo",
      "titulo": "Vendaje funcional de tobillo",
      "desc": "Pasos generales de colocación",
      "pasos": [
        "Revisar la piel y descartar contraindicaciones",
        "Colocar protección de la piel",
        "Posicionar el tobillo en posición neutra",
        "Aplicar las tiras con tensión moderada",
        "Verificar circulación, movilidad y comodidad"
      ]
    },
    {
      "id": "o-mareo",
      "titulo": "Mareo durante la sesión",
      "desc": "Respuesta ante un síntoma inesperado",
      "pasos": [
        "Detener la actividad de inmediato",
        "Sentar o recostar al paciente con seguridad",
        "Preguntar síntomas y vigilar su estado",
        "Esperar a que mejore antes de continuar",
        "Registrar el evento y avisar si persiste"
      ]
    },
    {
      "id": "o-postural",
      "titulo": "Valoración postural",
      "desc": "Observación ordenada del paciente",
      "pasos": [
        "Pedir ropa que permita ver el cuerpo",
        "Colocar al paciente en posición relajada",
        "Observar desde vista anterior y posterior",
        "Observar desde vista lateral",
        "Registrar hallazgos y relacionarlos con los síntomas"
      ]
    },
    {
      "id": "o-hombro",
      "titulo": "Progresión de ejercicio de hombro",
      "desc": "De la movilidad al control funcional",
      "pasos": [
        "Controlar el dolor y proteger el hombro",
        "Movilidad pasiva y asistida",
        "Movilidad activa sin resistencia",
        "Fortalecimiento con resistencia progresiva",
        "Ejercicios funcionales por encima de la cabeza"
      ]
    },
    {
      "id": "o-muneca",
      "titulo": "Rehabilitación tras fractura de muñeca",
      "desc": "Fases desde la inmovilización",
      "pasos": [
        "Controlar el edema y mover dedos y hombro",
        "Retirar la inmovilización con autorización médica",
        "Recuperar el rango de movimiento de la muñeca",
        "Fortalecer la mano y el antebrazo",
        "Retomar actividades de la vida diaria y trabajo"
      ]
    },
    {
      "id": "o-equilibrio",
      "titulo": "Reeducación del equilibrio",
      "desc": "Progresión de menor a mayor dificultad",
      "pasos": [
        "Valorar el equilibrio y el riesgo de caída",
        "Equilibrio de pie con base amplia y apoyo",
        "Reducir la base de apoyo",
        "Añadir movimiento o superficies inestables",
        "Integrar tareas funcionales y marcha"
      ]
    },
    {
      "id": "o-diafragmatica",
      "titulo": "Enseñar respiración diafragmática",
      "desc": "Instrucción paso a paso al paciente",
      "pasos": [
        "Colocar al paciente cómodo y relajado",
        "Una mano en el pecho y otra en el abdomen",
        "Inhalar por la nariz inflando el abdomen",
        "Exhalar lentamente sin mover mucho el pecho",
        "Practicar con retroalimentación y descansos"
      ]
    },
    {
      "id": "o-dolor-lumbar",
      "titulo": "Evaluación de dolor lumbar",
      "desc": "Secuencia de valoración",
      "pasos": [
        "Entrevista y búsqueda de signos de alarma",
        "Inspección de la postura y la movilidad",
        "Pruebas de movimiento y de fuerza",
        "Pruebas neurológicas y especiales",
        "Conclusión clínica y plan de tratamiento"
      ]
    },
    {
      "id": "o-alta",
      "titulo": "Educación al paciente al alta",
      "desc": "Cierre del proceso de tratamiento",
      "pasos": [
        "Revisar los logros frente a las metas",
        "Explicar la condición actual del paciente",
        "Enseñar el programa de ejercicios para casa",
        "Indicar signos de alarma y cuándo consultar",
        "Confirmar dudas y dar seguimiento"
      ]
    },
    {
      "id": "o-soap",
      "titulo": "Registro de notas SOAP",
      "desc": "Estructura de la nota clínica",
      "pasos": [
        "Subjetivo: lo que refiere el paciente",
        "Objetivo: mediciones y hallazgos observados",
        "Análisis: interpretación clínica de la evolución",
        "Plan: tratamiento y metas siguientes",
        "Revisar, fechar y firmar la nota"
      ]
    },
    {
      "id": "o-rodilla-deporte",
      "titulo": "Retorno al deporte tras lesión de rodilla",
      "desc": "Criterios por etapas",
      "pasos": [
        "Control del dolor y del derrame",
        "Recuperar movilidad completa",
        "Recuperar fuerza y control de la pierna",
        "Correr y realizar ejercicios de agilidad",
        "Reintegrarse al deporte de forma gradual"
      ]
    },
    {
      "id": "o-caida",
      "titulo": "Manejo de una caída en la sala",
      "desc": "Respuesta inmediata del terapeuta",
      "pasos": [
        "Acudir al paciente y pedir ayuda",
        "No moverlo hasta valorar su estado",
        "Revisar conciencia, dolor y posibles lesiones",
        "Actuar según hallazgos y avisar al médico",
        "Registrar el incidente y revisar causas"
      ]
    }
  ],
  "flashcards": [
    [
      "EVA",
      "Escala Visual Análoga: mide la intensidad del dolor de 0 a 10."
    ],
    [
      "ROM",
      "Rango de movimiento articular, medido en grados."
    ],
    [
      "Propiocepción",
      "Percepción de la posición y el movimiento del propio cuerpo."
    ],
    [
      "Contracción isométrica",
      "El músculo genera tensión sin cambiar de longitud."
    ],
    [
      "Contracción concéntrica",
      "El músculo genera fuerza mientras se acorta."
    ],
    [
      "Contracción excéntrica",
      "El músculo genera fuerza mientras se alarga."
    ],
    [
      "Neuroplasticidad",
      "Capacidad del sistema nervioso de reorganizarse con la experiencia."
    ],
    [
      "Espasticidad",
      "Aumento del tono muscular que depende de la velocidad del estiramiento."
    ],
    [
      "Edema",
      "Acumulación de líquido en los tejidos."
    ],
    [
      "Crioterapia",
      "Uso del frío con fines terapéuticos, por ejemplo para el dolor y la inflamación aguda."
    ],
    [
      "Termoterapia",
      "Uso del calor terapéutico para relajar tejidos y aliviar el dolor."
    ],
    [
      "TENS",
      "Estimulación eléctrica nerviosa transcutánea, usada para modular el dolor."
    ],
    [
      "Goniometría",
      "Técnica para medir los ángulos de las articulaciones."
    ],
    [
      "Hipoxemia",
      "Nivel bajo de oxígeno en la sangre arterial."
    ],
    [
      "Atelectasia",
      "Colapso parcial o total de una zona del pulmón."
    ],
    [
      "Fascia",
      "Tejido conectivo que envuelve y conecta músculos y órganos."
    ],
    [
      "Punto gatillo",
      "Nódulo hipersensible en una banda tensa del músculo que puede doler a distancia."
    ],
    [
      "Cinesiología",
      "Estudio del movimiento humano."
    ],
    [
      "Tendinopatía",
      "Dolor y pérdida de capacidad de carga del tendón."
    ],
    [
      "Cadena cinética cerrada",
      "Ejercicio con el extremo distal fijo, como una sentadilla."
    ],
    [
      "Anamnesis",
      "Interrogatorio clínico que recoge antecedentes, motivo de consulta e historia del padecimiento del paciente."
    ],
    [
      "Inspección",
      "Observación sistemática de postura, piel, simetría y movimiento antes de tocar al paciente."
    ],
    [
      "Palpación",
      "Exploración con las manos para evaluar temperatura, textura, tono muscular y sensibilidad de los tejidos."
    ],
    [
      "Prueba muscular manual",
      "Evaluación de la fuerza de un músculo con una escala graduada de 0 a 5."
    ],
    [
      "Banderas rojas",
      "Datos clínicos que sugieren una condición grave y requieren referir al paciente a otro profesional."
    ],
    [
      "Test de Romberg",
      "Prueba de equilibrio de pie con ojos cerrados para detectar alteraciones sensoriales."
    ],
    [
      "Sobrecarga progresiva",
      "Principio de aumentar de manera gradual la exigencia del ejercicio para generar adaptación."
    ],
    [
      "Ejercicio aeróbico",
      "Actividad rítmica y sostenida que depende principalmente del oxígeno para producir energía."
    ],
    [
      "Estiramiento estático",
      "Mantener un músculo en posición alargada durante un tiempo sin rebotes."
    ],
    [
      "Estabilidad del core",
      "Capacidad de la musculatura del tronco para controlar la columna durante el movimiento."
    ],
    [
      "Ultrasonido terapéutico",
      "Agente físico que usa ondas sonoras de alta frecuencia para generar efectos térmicos o mecánicos en tejidos."
    ],
    [
      "Electroestimulación",
      "Aplicación de corriente eléctrica para provocar contracción muscular o modular el dolor."
    ],
    [
      "Hidroterapia",
      "Uso terapéutico del agua aprovechando flotación, temperatura y presión hidrostática."
    ],
    [
      "Contraindicación",
      "Condición del paciente que hace inadecuado o riesgoso aplicar determinado tratamiento."
    ],
    [
      "Movilización articular",
      "Técnica manual que desplaza una articulación de forma controlada para mejorar su movimiento."
    ],
    [
      "Masoterapia",
      "Manipulación manual de tejidos blandos para relajar, mejorar circulación y aliviar tensión."
    ],
    [
      "Drenaje linfático manual",
      "Técnica suave que favorece el flujo de la linfa para reducir el edema."
    ],
    [
      "Liberación miofascial",
      "Técnica manual que aplica presión sostenida sobre la fascia para disminuir restricciones y tensión."
    ],
    [
      "Hemiparesia",
      "Debilidad muscular que afecta un lado del cuerpo."
    ],
    [
      "Método Bobath",
      "Enfoque de neurorrehabilitación que busca facilitar el movimiento normal y modular el tono."
    ],
    [
      "Marcha hemipléjica",
      "Patrón de caminar con el miembro afectado rígido que realiza un arco hacia afuera."
    ],
    [
      "Ataxia",
      "Falta de coordinación del movimiento voluntario, con torpeza y poca precisión."
    ],
    [
      "Reeducación postural",
      "Conjunto de ejercicios y estrategias para corregir hábitos posturales y mejorar la alineación."
    ],
    [
      "Espirometría",
      "Prueba que mide el volumen y la velocidad del aire que una persona puede respirar."
    ],
    [
      "Respiración diafragmática",
      "Patrón respiratorio en el que el diafragma es el principal músculo que impulsa la inspiración."
    ],
    [
      "Drenaje postural",
      "Posiciones que usan la gravedad para ayudar a movilizar secreciones bronquiales."
    ],
    [
      "Sarcopenia",
      "Pérdida progresiva de masa y fuerza muscular, frecuente con el envejecimiento."
    ],
    [
      "Fragilidad",
      "Estado de vulnerabilidad del adulto mayor ante estresores, con menor reserva funcional."
    ],
    [
      "Riesgo de caídas",
      "Probabilidad de que una persona pierda el equilibrio y caiga, que se evalúa y se previene."
    ],
    [
      "Osteoporosis",
      "Disminución de la densidad ósea que vuelve al hueso más frágil y propenso a fracturas."
    ],
    [
      "Hitos del desarrollo",
      "Habilidades motoras esperadas en cada etapa de la infancia, como sentarse o caminar."
    ],
    [
      "Estimulación temprana",
      "Actividades guiadas que favorecen el desarrollo motor y sensorial del bebé."
    ],
    [
      "Tortícolis congénita",
      "Acortamiento del esternocleidomastoideo que inclina y rota la cabeza del bebé hacia un lado."
    ],
    [
      "Esguince",
      "Lesión de los ligamentos de una articulación por estiramiento excesivo o desgarro."
    ],
    [
      "Distensión muscular",
      "Lesión por estiramiento excesivo de las fibras de un músculo."
    ],
    [
      "Prevención de lesiones",
      "Estrategias de calentamiento, fuerza y técnica para reducir el riesgo de lesión deportiva."
    ],
    [
      "Vendaje funcional",
      "Aplicación de cinta o venda para dar soporte a una articulación sin impedir del todo el movimiento."
    ],
    [
      "Higiene postural",
      "Hábitos para mantener posiciones y movimientos que reducen la carga sobre el cuerpo."
    ],
    [
      "Ergonomía",
      "Disciplina que adapta el puesto de trabajo y las tareas a las capacidades de la persona."
    ],
    [
      "Precauciones estándar",
      "Medidas básicas de bioseguridad aplicadas a todos los pacientes, como higiene de manos y barreras."
    ]
  ]
};
