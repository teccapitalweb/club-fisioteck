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
    },
    {
      "id": "q-n01",
      "titulo": "Codo y muñeca",
      "desc": "Anatomía y lesiones frecuentes",
      "preguntas": [
        {
          "q": "¿Qué nervio se comprime en el síndrome del túnel carpiano?",
          "o": [
            "Nervio mediano",
            "Nervio cubital",
            "Nervio radial",
            "Nervio musculocutáneo"
          ],
          "c": 0,
          "e": "El nervio mediano pasa por el túnel carpiano junto con los tendones flexores de los dedos y se comprime a ese nivel."
        },
        {
          "q": "¿Qué estructura se ve afectada principalmente en la epicondilitis lateral?",
          "o": [
            "Tendón del bíceps braquial",
            "Tendón común extensor, sobre todo el extensor radial corto del carpo",
            "Ligamento colateral cubital",
            "Tendón del pronador redondo"
          ],
          "c": 1,
          "e": "La epicondilitis lateral es una tendinopatía del origen de los extensores de la muñeca en el epicóndilo lateral."
        },
        {
          "q": "¿Cuál es el hueso del carpo que se fractura con más frecuencia?",
          "o": [
            "Ganchoso",
            "Piramidal",
            "Escafoides",
            "Pisiforme"
          ],
          "c": 2,
          "e": "El escafoides es el hueso carpiano más fracturado, típicamente por caída sobre la mano extendida."
        },
        {
          "q": "¿En qué articulaciones ocurre la pronosupinación del antebrazo?",
          "o": [
            "Humerocubital y humerorradial",
            "Radiocarpiana y mediocarpiana",
            "Glenohumeral y acromioclavicular",
            "Radiocubital proximal y radiocubital distal"
          ],
          "c": 3,
          "e": "La pronosupinación se da por el movimiento del radio alrededor del cúbito en las articulaciones radiocubitales proximal y distal."
        },
        {
          "q": "¿Qué estructura es el principal estabilizador del codo frente al estrés en valgo?",
          "o": [
            "Ligamento colateral cubital (medial)",
            "Ligamento colateral radial",
            "Ligamento anular",
            "Cápsula posterior únicamente"
          ],
          "c": 0,
          "e": "El ligamento colateral cubital medial resiste el estrés en valgo y se lesiona con frecuencia en deportes de lanzamiento."
        },
        {
          "q": "¿Qué reproduce la prueba de Phalen cuando es positiva?",
          "o": [
            "Dolor en el epicóndilo lateral",
            "Parestesias en el territorio del nervio mediano",
            "Chasquido en la articulación radiocubital",
            "Debilidad del abductor del meñique"
          ],
          "c": 1,
          "e": "La flexión sostenida de ambas muñecas aumenta la presión en el túnel carpiano y reproduce los síntomas del mediano."
        }
      ]
    },
    {
      "id": "q-n02",
      "titulo": "Mano y férulas",
      "desc": "Función de la mano y ortesis",
      "preguntas": [
        {
          "q": "¿Qué nervio inerva la mayoría de los músculos intrínsecos de la mano?",
          "o": [
            "Nervio mediano",
            "Nervio radial",
            "Nervio cubital",
            "Nervio axilar"
          ],
          "c": 2,
          "e": "El nervio cubital inerva la mayor parte de los músculos intrínsecos; el mediano inerva la musculatura tenar lateral y los lumbricales radiales."
        },
        {
          "q": "¿Cuál describe la posición funcional de la mano?",
          "o": [
            "Muñeca en flexión y dedos extendidos",
            "Muñeca neutra y puño cerrado",
            "Muñeca en desviación cubital y dedos rectos",
            "Muñeca en ligera extensión y dedos en semiflexión"
          ],
          "c": 3,
          "e": "La posición funcional permite agarrar objetos: muñeca en ligera extensión, dedos semiflexionados y pulgar en oposición."
        },
        {
          "q": "¿Qué acción realizan los músculos lumbricales?",
          "o": [
            "Flexionan las articulaciones metacarpofalángicas y extienden las interfalángicas",
            "Extienden las metacarpofalángicas y flexionan las interfalángicas",
            "Abducen todos los dedos",
            "Flexionan solo la interfalángica distal"
          ],
          "c": 0,
          "e": "Los lumbricales unen flexores y extensores y producen flexión de la metacarpofalángica con extensión de las interfalángicas."
        },
        {
          "q": "¿Qué posición de seguridad se usa con frecuencia al inmovilizar la mano tras una lesión?",
          "o": [
            "Metacarpofalángicas en extensión e interfalángicas en flexión",
            "Metacarpofalángicas en flexión e interfalángicas en extensión",
            "Todas las articulaciones en flexión completa",
            "Todas las articulaciones en extensión completa"
          ],
          "c": 1,
          "e": "Con las metacarpofalángicas flexionadas se mantienen elongados los ligamentos colaterales, lo que previene su acortamiento."
        },
        {
          "q": "¿Qué músculo es protagonista de la oposición del pulgar?",
          "o": [
            "Abductor largo del pulgar",
            "Extensor corto del pulgar",
            "Oponente del pulgar",
            "Aductor del pulgar"
          ],
          "c": 2,
          "e": "El oponente del pulgar, inervado por el mediano, lleva el pulgar frente a los demás dedos."
        },
        {
          "q": "¿Cómo se caracteriza la deformidad en cuello de cisne?",
          "o": [
            "Desviación cubital fija de los dedos",
            "Flexión de la interfalángica proximal e hiperextensión de la distal",
            "Flexión de la metacarpofalángica con extensión de la proximal",
            "Hiperextensión de la interfalángica proximal y flexión de la distal"
          ],
          "c": 3,
          "e": "En el cuello de cisne la interfalángica proximal se hiperextiende y la distal queda flexionada; es frecuente en artritis reumatoide."
        }
      ]
    },
    {
      "id": "q-n03",
      "titulo": "Columna dorsal y caja torácica",
      "desc": "Costillas, esternón y movilidad",
      "preguntas": [
        {
          "q": "¿Cuántos pares de costillas tiene una persona típica?",
          "o": [
            "Doce pares",
            "Once pares",
            "Trece pares",
            "Diez pares"
          ],
          "c": 0,
          "e": "Hay doce pares de costillas, de los cuales los dos últimos son flotantes."
        },
        {
          "q": "¿Cuáles son las costillas verdaderas?",
          "o": [
            "Las pares del 2 al 12",
            "Las siete primeras, unidas directamente al esternón",
            "Solo las dos flotantes",
            "Las ocho inferiores"
          ],
          "c": 1,
          "e": "Las costillas 1 a 7 se articulan con el esternón mediante su propio cartílago costal."
        },
        {
          "q": "¿Qué diámetro del tórax aumenta con el movimiento en asa de balde de las costillas inferiores?",
          "o": [
            "El vertical exclusivamente",
            "El anteroposterior",
            "El transversal",
            "Ninguno de los tres"
          ],
          "c": 2,
          "e": "El movimiento en asa de balde eleva los bordes laterales de las costillas inferiores y amplía el diámetro transversal."
        },
        {
          "q": "¿Cómo es la curvatura fisiológica de la columna dorsal en el plano sagital?",
          "o": [
            "Lordosis, de concavidad posterior",
            "Recta, sin curvatura",
            "Escoliosis fisiológica",
            "Cifosis, de concavidad anterior"
          ],
          "c": 3,
          "e": "La columna dorsal presenta una cifosis fisiológica, con la concavidad hacia delante."
        },
        {
          "q": "¿Qué movimiento de la columna dorsal facilita la orientación de sus carillas articulares?",
          "o": [
            "Rotación",
            "Flexión lateral exclusiva",
            "Traslación anterior",
            "Extensión amplia"
          ],
          "c": 0,
          "e": "Las carillas dorsales permiten rotación y flexión lateral, aunque la caja torácica limita la movilidad global."
        },
        {
          "q": "¿Qué articulaciones unen la cabeza de la costilla con los cuerpos vertebrales?",
          "o": [
            "Esternocostales",
            "Costovertebrales",
            "Condroesternales",
            "Interapofisarias"
          ],
          "c": 1,
          "e": "Las articulaciones costovertebrales unen la cabeza costal con los cuerpos vertebrales adyacentes."
        }
      ]
    },
    {
      "id": "q-n04",
      "titulo": "Lumbar y estabilización",
      "desc": "Control motor del tronco",
      "preguntas": [
        {
          "q": "¿Qué función se atribuye principalmente a los multífidos lumbares?",
          "o": [
            "Flexionar el tronco con potencia",
            "Rotar el tronco a gran velocidad",
            "Estabilizar segmentariamente las vértebras",
            "Elevar la pelvis"
          ],
          "c": 2,
          "e": "Los multífidos son músculos profundos que aportan estabilidad segmentaria a la columna lumbar."
        },
        {
          "q": "¿Qué músculo se activa como un corsé al contraerse e incrementa la presión intraabdominal?",
          "o": [
            "Psoas mayor",
            "Recto abdominal",
            "Oblicuo externo",
            "Transverso del abdomen"
          ],
          "c": 3,
          "e": "El transverso del abdomen rodea el tronco y contribuye a la estabilidad lumbopélvica mediante la presión intraabdominal."
        },
        {
          "q": "¿Qué función motora suele evaluarse para la raíz L5?",
          "o": [
            "Extensión del dedo gordo del pie",
            "Extensión de la rodilla",
            "Flexión de la cadera",
            "Flexión plantar del tobillo"
          ],
          "c": 0,
          "e": "La extensión del hallux depende sobre todo de la raíz L5 y se explora como miotomo."
        },
        {
          "q": "¿Qué indica una elevación de pierna recta positiva?",
          "o": [
            "Rigidez de los isquiotibiales únicamente",
            "Mayor probabilidad de tensión neural con dolor radicular",
            "Lesión meniscal",
            "Inestabilidad sacroilíaca"
          ],
          "c": 1,
          "e": "Se considera positiva cuando reproduce el dolor radicular, lo que sugiere sensibilidad de las raíces lumbosacras."
        },
        {
          "q": "¿Qué hallazgo obliga a derivación urgente por sospecha de síndrome de cauda equina?",
          "o": [
            "Dolor lumbar con el esfuerzo",
            "Rigidez matutina breve",
            "Anestesia en silla de montar con alteración esfinteriana",
            "Dolor que mejora con el reposo"
          ],
          "c": 2,
          "e": "La pérdida de sensibilidad perineal con alteraciones de vejiga o intestino es una bandera roja que requiere atención médica urgente."
        },
        {
          "q": "¿Cuáles son los componentes principales del disco intervertebral?",
          "o": [
            "Menisco y cápsula articular",
            "Cartílago hialino y sinovial",
            "Hueso esponjoso y periostio",
            "Núcleo pulposo y anillo fibroso"
          ],
          "c": 3,
          "e": "El disco está formado por un núcleo pulposo central rodeado por un anillo fibroso."
        }
      ]
    },
    {
      "id": "q-n05",
      "titulo": "Sacroilíaca y pelvis",
      "desc": "Anatomía y valoración pélvica",
      "preguntas": [
        {
          "q": "¿Qué tipo de articulación es la sacroilíaca?",
          "o": [
            "Sinovial con movimiento pequeño",
            "Fibrosa sin movimiento",
            "Pivote",
            "Bicondílea de gran amplitud"
          ],
          "c": 0,
          "e": "La sacroilíaca es sinovial en parte y fibrosa en parte, con movimientos muy reducidos."
        },
        {
          "q": "¿Qué describe la nutación del sacro?",
          "o": [
            "Inclinación lateral del sacro",
            "Movimiento del promontorio hacia delante y abajo",
            "Rotación de la cadera",
            "Extensión de la columna lumbar"
          ],
          "c": 1,
          "e": "En la nutación el promontorio sacro se desplaza hacia delante y abajo respecto a los ilíacos."
        },
        {
          "q": "¿Cómo se recomienda usar las pruebas de provocación sacroilíaca?",
          "o": [
            "Evitándolas en todos los casos",
            "Usando una sola prueba como diagnóstico definitivo",
            "Combinando varias pruebas, porque aisladas tienen poca fiabilidad",
            "Solo con estudios de imagen"
          ],
          "c": 2,
          "e": "Agrupar varias pruebas de provocación mejora su utilidad frente a cualquier prueba aislada."
        },
        {
          "q": "¿Qué tipo de articulación es la sínfisis del pubis?",
          "o": [
            "Sinovial esférica",
            "Sinovial plana",
            "Sindesmosis tibioperonea",
            "Cartilaginosa"
          ],
          "c": 3,
          "e": "La sínfisis del pubis es una articulación cartilaginosa con un disco fibrocartilaginoso."
        },
        {
          "q": "¿Qué ligamentos aportan mayor estabilidad a la articulación sacroilíaca?",
          "o": [
            "Ligamentos anteriores finos",
            "Ligamentos sacroilíacos posteriores e interóseos",
            "Ligamento cruzado anterior",
            "Ligamento inguinal"
          ],
          "c": 1,
          "e": "Los ligamentos posteriores e interóseos son los más fuertes y limitan el movimiento sacroilíaco."
        },
        {
          "q": "¿Qué hormona del embarazo contribuye a la mayor laxitud ligamentaria pélvica?",
          "o": [
            "Insulina",
            "Relaxina",
            "Tiroxina",
            "Cortisol"
          ],
          "c": 1,
          "e": "La relaxina, junto con otros cambios hormonales, aumenta la laxitud ligamentaria durante el embarazo."
        }
      ]
    },
    {
      "id": "q-n06",
      "titulo": "ATM y región craneomandibular",
      "desc": "Mandíbula, masticación y dolor",
      "preguntas": [
        {
          "q": "¿Cómo se clasifica la articulación temporomandibular?",
          "o": [
            "Fibrosa inmóvil",
            "Sinovial plana sin disco",
            "Sinovial bicondílea con disco articular",
            "Cartilaginosa primaria"
          ],
          "c": 2,
          "e": "La ATM es sinovial y posee un disco articular que divide la cavidad en dos compartimentos."
        },
        {
          "q": "¿Cómo ocurre normalmente la apertura bucal?",
          "o": [
            "Deslizamiento lateral únicamente",
            "Traslación pura sin rotación",
            "Rotación pura en todo el rango",
            "Rotación inicial del cóndilo seguida de traslación"
          ],
          "c": 3,
          "e": "La apertura combina una rotación inicial en el compartimento inferior con traslación anterior del cóndilo."
        },
        {
          "q": "¿Cuál de estos músculos es elevador de la mandíbula?",
          "o": [
            "Masetero",
            "Milohioideo",
            "Genihioideo",
            "Digástrico"
          ],
          "c": 0,
          "e": "Masetero, temporal y pterigoideo medial elevan la mandíbula; los suprahioideos ayudan a descenderla."
        },
        {
          "q": "¿Qué nervio inerva los músculos masticadores?",
          "o": [
            "Rama oftálmica del trigémino",
            "Rama mandibular del trigémino",
            "Nervio facial",
            "Nervio hipogloso"
          ],
          "c": 1,
          "e": "Los músculos de la masticación son inervados por la rama mandibular del nervio trigémino."
        },
        {
          "q": "¿Qué es el bruxismo?",
          "o": [
            "Un tipo de fractura mandibular",
            "Una luxación aguda de la ATM",
            "Una actividad parafuncional de apretar o rechinar los dientes",
            "Una infección de glándulas salivales"
          ],
          "c": 2,
          "e": "El bruxismo es una actividad repetitiva de los músculos masticadores que puede asociarse a dolor craneomandibular."
        },
        {
          "q": "¿Qué suele sugerir un chasquido al abrir y otro al cerrar la boca?",
          "o": [
            "Fractura del cóndilo",
            "Anquilosis completa",
            "Parálisis del nervio facial",
            "Desplazamiento del disco con reducción"
          ],
          "c": 3,
          "e": "El chasquido recíproco suele relacionarse con un disco desplazado que se reduce al abrir y se desplaza de nuevo al cerrar."
        }
      ]
    },
    {
      "id": "q-n07",
      "titulo": "Fisiología del ejercicio",
      "desc": "Energía y adaptaciones",
      "preguntas": [
        {
          "q": "¿Qué sistema energético predomina en un esfuerzo máximo de pocos segundos?",
          "o": [
            "Fosfágeno (ATP-fosfocreatina)",
            "Oxidativo de grasas",
            "Oxidativo de proteínas",
            "Gluconeogénesis"
          ],
          "c": 0,
          "e": "El sistema ATP-fosfocreatina aporta energía muy rápida en esfuerzos máximos de corta duración."
        },
        {
          "q": "¿Qué representa el VO2 máx?",
          "o": [
            "La frecuencia cardiaca máxima",
            "El consumo máximo de oxígeno que el organismo puede utilizar",
            "El volumen pulmonar total",
            "La fuerza máxima de un músculo"
          ],
          "c": 1,
          "e": "El VO2 máx es el consumo máximo de oxígeno y refleja la capacidad aeróbica."
        },
        {
          "q": "¿Qué ocurre con la frecuencia cardiaca al iniciar el ejercicio?",
          "o": [
            "Se mantiene sin cambios",
            "Disminuye por activación vagal",
            "Aumenta por retiro vagal y activación simpática",
            "Aumenta solo por descenso de oxígeno"
          ],
          "c": 2,
          "e": "Al iniciar el ejercicio disminuye el tono vagal y aumenta la actividad simpática, lo que eleva la frecuencia cardiaca."
        },
        {
          "q": "¿Qué adaptación es típica del entrenamiento aeróbico sostenido?",
          "o": [
            "Aumento de la rigidez articular",
            "Disminución de la capilarización",
            "Reducción del volumen sistólico en reposo",
            "Mayor densidad mitocondrial y capilar muscular"
          ],
          "c": 3,
          "e": "El entrenamiento aeróbico mejora la capilarización y el número de mitocondrias del músculo."
        },
        {
          "q": "¿Qué establece el principio de sobrecarga progresiva?",
          "o": [
            "Aumentar gradualmente el estímulo para seguir generando adaptación",
            "Entrenar siempre con la misma carga",
            "Entrenar solo hasta la fatiga total",
            "Reducir el descanso cada sesión sin límite"
          ],
          "c": 0,
          "e": "Para mantener la adaptación, el estímulo debe incrementarse de forma gradual y controlada."
        },
        {
          "q": "¿A qué se deben principalmente las primeras ganancias de fuerza en un entrenamiento nuevo?",
          "o": [
            "Hipertrofia máxima desde la primera semana",
            "Adaptaciones neurales",
            "Cambios en la densidad ósea",
            "Aumento inmediato del tamaño de los tendones"
          ],
          "c": 1,
          "e": "Al inicio, la mejora de fuerza se debe sobre todo a una mejor activación y coordinación neural."
        }
      ]
    },
    {
      "id": "q-n08",
      "titulo": "Contracción y fisiología muscular",
      "desc": "Del sarcómero al movimiento",
      "preguntas": [
        {
          "q": "¿A qué proteína se une el calcio para iniciar la contracción del músculo esquelético?",
          "o": [
            "Miosina",
            "Actina",
            "Troponina C",
            "Titina"
          ],
          "c": 2,
          "e": "El calcio se une a la troponina C, lo que permite la interacción entre actina y miosina."
        },
        {
          "q": "¿Qué sucede en el sarcómero durante la contracción según la teoría del deslizamiento?",
          "o": [
            "Los filamentos de actina se enrollan",
            "La banda A se acorta y la I se alarga",
            "Los filamentos de miosina se acortan",
            "La banda A mantiene su longitud mientras la banda I se acorta"
          ],
          "c": 3,
          "e": "Los filamentos se deslizan sin cambiar de longitud: la banda A se mantiene y las bandas I y H disminuyen."
        },
        {
          "q": "¿Qué caracteriza a las fibras musculares tipo I?",
          "o": [
            "Metabolismo oxidativo y resistencia a la fatiga",
            "Fatiga rápida y alta fuerza",
            "Contracción muy veloz y glucolítica",
            "Ausencia de mitocondrias"
          ],
          "c": 0,
          "e": "Las fibras tipo I son de contracción lenta, oxidativas y resistentes a la fatiga."
        },
        {
          "q": "¿Qué es una contracción excéntrica?",
          "o": [
            "Contracción sin movimiento articular",
            "Tensión muscular mientras el músculo se alarga",
            "Relajación pasiva completa",
            "Contracción con acortamiento del músculo"
          ],
          "c": 1,
          "e": "En la contracción excéntrica el músculo genera tensión mientras se elonga, como al bajar un peso de forma controlada."
        },
        {
          "q": "¿Qué neurotransmisor se libera en la unión neuromuscular esquelética?",
          "o": [
            "Serotonina",
            "Dopamina",
            "Acetilcolina",
            "GABA"
          ],
          "c": 2,
          "e": "La acetilcolina es liberada por la motoneurona y activa los receptores de la placa motora."
        },
        {
          "q": "¿Para qué se necesita el ATP en el ciclo de los puentes cruzados?",
          "o": [
            "Para aumentar el calcio extracelular",
            "Para sintetizar colágeno",
            "Para mielinizar la motoneurona",
            "Para separar la cabeza de miosina de la actina"
          ],
          "c": 3,
          "e": "El ATP permite que la miosina se desprenda de la actina y reinicie el ciclo de contracción."
        }
      ]
    },
    {
      "id": "q-n09",
      "titulo": "Tejido conectivo y cicatrización",
      "desc": "Tendón, ligamento y reparación",
      "preguntas": [
        {
          "q": "¿Qué tipo de colágeno predomina en el tendón?",
          "o": [
            "Tipo I",
            "Tipo II",
            "Tipo IV",
            "Tipo X"
          ],
          "c": 0,
          "e": "El colágeno tipo I es el componente principal de tendones, ligamentos y hueso."
        },
        {
          "q": "¿Cuáles son las fases clásicas de la cicatrización de un tejido blando?",
          "o": [
            "Isquemia, necrosis y fibrosis",
            "Inflamatoria, proliferativa y remodelación",
            "Calcificación, osificación y remodelación",
            "Contracción, relajación y reposo"
          ],
          "c": 1,
          "e": "La reparación pasa por una fase inflamatoria, una proliferativa y una de remodelación."
        },
        {
          "q": "¿Qué células sintetizan principalmente el colágeno en la cicatrización?",
          "o": [
            "Osteoclastos",
            "Eritrocitos",
            "Fibroblastos",
            "Neuronas"
          ],
          "c": 2,
          "e": "Los fibroblastos producen colágeno y matriz extracelular durante la fase proliferativa."
        },
        {
          "q": "¿Qué diferencia a un tendón de un ligamento?",
          "o": [
            "El tendón une hueso con hueso",
            "El ligamento une músculo con hueso",
            "No existe diferencia anatómica",
            "El tendón une músculo con hueso y el ligamento une hueso con hueso"
          ],
          "c": 3,
          "e": "Los tendones transmiten la fuerza muscular al hueso; los ligamentos conectan huesos entre sí."
        },
        {
          "q": "¿Cómo es la fase de remodelación de la cicatriz?",
          "o": [
            "Puede prolongarse durante meses",
            "Dura solo unas horas",
            "Termina al cerrarse la herida",
            "Ocurre antes de la inflamación"
          ],
          "c": 0,
          "e": "La remodelación reorganiza el colágeno y puede continuar durante meses."
        },
        {
          "q": "¿Qué efecto tiene la carga mecánica progresiva y controlada sobre el tejido en reparación?",
          "o": [
            "Impide siempre la cicatrización",
            "Favorece la orientación de las fibras de colágeno",
            "No tiene efecto",
            "Provoca necrosis del tejido"
          ],
          "c": 1,
          "e": "La carga adecuada estimula la alineación del colágeno según las líneas de tensión del tejido."
        }
      ]
    },
    {
      "id": "q-n10",
      "titulo": "Fracturas y consolidación ósea",
      "desc": "Reparación del hueso",
      "preguntas": [
        {
          "q": "¿Cuál es el orden de las etapas de consolidación ósea?",
          "o": [
            "Callo duro, hematoma, remodelación y callo blando",
            "Remodelación, callo duro, hematoma y callo blando",
            "Hematoma, callo blando, callo duro y remodelación",
            "Callo blando, remodelación, hematoma y callo duro"
          ],
          "c": 2,
          "e": "Tras el hematoma inicial se forma un callo blando, luego un callo duro y finalmente se remodela el hueso."
        },
        {
          "q": "¿Cuál de estos factores puede retrasar la consolidación ósea?",
          "o": [
            "Buena nutrición",
            "Estabilidad adecuada del foco",
            "Carga controlada indicada por el médico",
            "Tabaquismo"
          ],
          "c": 3,
          "e": "El tabaquismo afecta la vascularización y se asocia a retraso en la consolidación."
        },
        {
          "q": "¿Qué define a una fractura abierta?",
          "o": [
            "Que existe comunicación del foco de fractura con el exterior",
            "Que el hueso está debilitado por osteoporosis",
            "Que el trazo es espiroideo",
            "Que hay más de un fragmento"
          ],
          "c": 0,
          "e": "En una fractura abierta el foco se comunica con el exterior a través de una herida, con riesgo de infección."
        },
        {
          "q": "¿Qué dato es una alerta de síndrome compartimental?",
          "o": [
            "Dolor leve que cede al reposo",
            "Dolor desproporcionado que aumenta con el estiramiento pasivo",
            "Mejoría de la movilidad",
            "Disminución del edema"
          ],
          "c": 1,
          "e": "El dolor intenso y desproporcionado, agravado por el estiramiento pasivo, exige valoración médica urgente."
        },
        {
          "q": "¿Qué enuncia la ley de Wolff?",
          "o": [
            "El hueso solo crece en la infancia",
            "El hueso no responde al ejercicio",
            "El hueso se remodela según las cargas a las que se somete",
            "El hueso se remodela siempre al azar"
          ],
          "c": 2,
          "e": "Según la ley de Wolff, el hueso adapta su estructura a las cargas mecánicas que recibe."
        },
        {
          "q": "¿Qué es una pseudoartrosis?",
          "o": [
            "Una fractura por estrés",
            "Una luxación recurrente",
            "Un callo óseo normal",
            "Falta de consolidación de una fractura"
          ],
          "c": 3,
          "e": "La pseudoartrosis es la ausencia de consolidación del hueso tras un tiempo suficiente."
        }
      ]
    },
    {
      "id": "q-n11",
      "titulo": "Marcha normal y patológica",
      "desc": "Análisis del ciclo de marcha",
      "preguntas": [
        {
          "q": "¿Cuáles son las dos grandes fases del ciclo de marcha?",
          "o": [
            "Apoyo y balanceo",
            "Despegue y aceleración",
            "Contacto y propulsión únicamente",
            "Flexión y extensión"
          ],
          "c": 0,
          "e": "El ciclo se divide en fase de apoyo, con el pie en el suelo, y fase de balanceo, con el miembro en el aire."
        },
        {
          "q": "¿Cuál fase del ciclo de marcha es más larga?",
          "o": [
            "Balanceo",
            "Apoyo",
            "Balanceo medio",
            "Despegue"
          ],
          "c": 1,
          "e": "La fase de apoyo ocupa la mayor parte del ciclo de marcha normal."
        },
        {
          "q": "¿Qué debilidad produce la marcha de Trendelenburg?",
          "o": [
            "Tibial anterior",
            "Cuádriceps",
            "Glúteo medio",
            "Gastrocnemio"
          ],
          "c": 2,
          "e": "La debilidad del glúteo medio hace que la pelvis caiga hacia el lado del miembro oscilante."
        },
        {
          "q": "¿Qué origina la marcha en estepaje o pie caído?",
          "o": [
            "Debilidad de los extensores de cadera",
            "Rigidez de los isquiotibiales",
            "Hipermovilidad del hombro",
            "Debilidad de los dorsiflexores del tobillo"
          ],
          "c": 3,
          "e": "La debilidad de los dorsiflexores, por ejemplo por lesión del nervio peroneo, obliga a elevar más la rodilla al avanzar."
        },
        {
          "q": "¿Cómo suele ser el contacto inicial en la marcha normal?",
          "o": [
            "Con el talón",
            "Con la punta del pie",
            "Con el borde lateral del antepié",
            "Con todo el pie a la vez"
          ],
          "c": 0,
          "e": "En la marcha normal el contacto inicial se realiza habitualmente con el talón."
        },
        {
          "q": "¿Qué patrón se asocia con la marcha con circunducción?",
          "o": [
            "Debilidad aislada del glúteo mayor",
            "Hemiparesia con espasticidad del miembro inferior",
            "Esguince de tobillo agudo",
            "Fractura de clavícula"
          ],
          "c": 1,
          "e": "En la hemiparesia el miembro afectado describe un arco hacia fuera para avanzar, llamado circunducción."
        }
      ]
    },
    {
      "id": "q-n12",
      "titulo": "Equilibrio y coordinación",
      "desc": "Evaluación funcional",
      "preguntas": [
        {
          "q": "¿Qué sistemas sensoriales contribuyen principalmente al equilibrio?",
          "o": [
            "Olfativo, gustativo y auditivo",
            "Visual, auditivo y táctil superficial",
            "Visual, vestibular y somatosensorial",
            "Endocrino, renal y digestivo"
          ],
          "c": 2,
          "e": "El control postural integra información visual, vestibular y somatosensorial."
        },
        {
          "q": "¿Qué valora la prueba de Romberg?",
          "o": [
            "La amplitud articular del hombro",
            "La fuerza del cuádriceps",
            "La fuerza de prensión",
            "El equilibrio estático con y sin visión"
          ],
          "c": 3,
          "e": "Compara la estabilidad de pie con ojos abiertos y cerrados; se desestabiliza si hay déficit propioceptivo o vestibular."
        },
        {
          "q": "¿Qué evalúa la escala de equilibrio de Berg?",
          "o": [
            "El equilibrio funcional mediante tareas",
            "Capacidad aeróbica máxima",
            "El dolor lumbar",
            "La fuerza de los esfínteres"
          ],
          "c": 0,
          "e": "La escala de Berg puntúa el desempeño del equilibrio en distintas tareas funcionales."
        },
        {
          "q": "¿Qué es la dismetría?",
          "o": [
            "Debilidad simétrica",
            "Error al medir la distancia o amplitud de un movimiento",
            "Ausencia de reflejos",
            "Rigidez en rueda dentada"
          ],
          "c": 1,
          "e": "La dismetría es la incapacidad de calcular la amplitud del movimiento y se asocia a lesión cerebelosa."
        },
        {
          "q": "¿Qué coordinación evalúa la prueba talón-rodilla?",
          "o": [
            "Del miembro superior",
            "De la musculatura facial",
            "Del miembro inferior",
            "De la deglución"
          ],
          "c": 2,
          "e": "Se desliza el talón por la espinilla contraria para observar la precisión del movimiento del miembro inferior."
        },
        {
          "q": "¿Qué es la adiadococinesia?",
          "o": [
            "Pérdida del olfato",
            "Exceso de fuerza muscular",
            "Pérdida del tono muscular normal",
            "Incapacidad de realizar movimientos alternos rápidos"
          ],
          "c": 3,
          "e": "Es la dificultad para realizar movimientos alternantes rápidos, típica de síndromes cerebelosos."
        }
      ]
    },
    {
      "id": "q-n13",
      "titulo": "ACV en rehabilitación",
      "desc": "Evento vascular cerebral",
      "preguntas": [
        {
          "q": "¿Cuáles son los dos tipos principales de ACV?",
          "o": [
            "Isquémico y hemorrágico",
            "Infeccioso y degenerativo",
            "Metabólico y tóxico",
            "Traumático y tumoral"
          ],
          "c": 0,
          "e": "El evento vascular cerebral puede ser isquémico, por obstrucción, o hemorrágico, por ruptura de un vaso."
        },
        {
          "q": "¿Qué cuadro se asocia a una lesión en el territorio de la arteria cerebral media?",
          "o": [
            "Hemiparesia ipsilateral de la pierna",
            "Hemiparesia contralateral con predominio en cara y miembro superior",
            "Pérdida bilateral de la visión",
            "Paraplejía"
          ],
          "c": 1,
          "e": "La arteria cerebral media irriga áreas motoras y sensitivas de cara y miembro superior del lado contrario."
        },
        {
          "q": "¿Qué precaución es importante para proteger el hombro hemipléjico?",
          "o": [
            "Traccionar el brazo para estirar",
            "Colgar el brazo sin soporte",
            "Evitar tirar del brazo afectado al movilizar",
            "Inmovilizarlo siempre en aducción"
          ],
          "c": 2,
          "e": "Jalar del brazo hemipléjico puede subluxar o dañar el hombro, por lo que se debe movilizar con soporte de la escápula."
        },
        {
          "q": "¿Cómo se caracteriza la afasia de Broca?",
          "o": [
            "Comprensión muy alterada y fluidez normal",
            "Mutismo por sordera",
            "Pérdida total de la audición",
            "Lenguaje expresivo no fluido con comprensión relativamente conservada"
          ],
          "c": 3,
          "e": "En la afasia de Broca el habla es costosa y poco fluida, mientras que la comprensión está relativamente conservada."
        },
        {
          "q": "¿Qué lesión se asocia con más frecuencia a la negligencia espacial unilateral?",
          "o": [
            "Hemisferio derecho",
            "Médula cervical",
            "Nervio periférico",
            "Cerebelo izquierdo"
          ],
          "c": 0,
          "e": "La negligencia del lado izquierdo es más frecuente tras lesiones del hemisferio derecho, sobre todo parietales."
        },
        {
          "q": "¿Qué se recomienda en la fase aguda cuando el paciente está médicamente estable?",
          "o": [
            "Reposo absoluto prolongado",
            "Movilización temprana",
            "Evitar cualquier cambio de posición",
            "Esperar semanas para empezar"
          ],
          "c": 1,
          "e": "La movilización temprana, indicada por el equipo médico, ayuda a prevenir complicaciones del reposo."
        }
      ]
    },
    {
      "id": "q-n14",
      "titulo": "Lesión medular",
      "desc": "Valoración y complicaciones",
      "preguntas": [
        {
          "q": "¿Qué escala se emplea para clasificar el nivel y la severidad de una lesión medular?",
          "o": [
            "Escala de Oswestry",
            "Escala de Borg",
            "ASIA (ISNCSCI)",
            "Escala de Tinetti"
          ],
          "c": 2,
          "e": "La clasificación ASIA, o ISNCSCI, determina el nivel neurológico y si la lesión es completa o incompleta."
        },
        {
          "q": "¿Qué segmentos se ven afectados en la tetraplejía?",
          "o": [
            "Torácicos bajos",
            "Lumbares",
            "Coccígeos únicamente",
            "Cervicales"
          ],
          "c": 3,
          "e": "La tetraplejía resulta de una lesión a nivel cervical, con afectación de los cuatro miembros."
        },
        {
          "q": "Ante una crisis de disreflexia autonómica, ¿qué debe hacerse de inmediato?",
          "o": [
            "Sentar a la persona, aflojar prendas y buscar el estímulo nocivo",
            "Acostar a la persona boca abajo",
            "Aumentar la actividad física",
            "Aplicar masaje abdominal intenso"
          ],
          "c": 0,
          "e": "Se incorpora a la persona, se retira el estímulo desencadenante, como una vejiga distendida, y se solicita atención médica."
        },
        {
          "q": "¿Por qué son necesarios los cambios de posición frecuentes en personas con lesión medular?",
          "o": [
            "Para aumentar la espasticidad",
            "Para prevenir úlceras por presión",
            "Para disminuir el apetito",
            "Para mejorar la fuerza de los esfínteres"
          ],
          "c": 1,
          "e": "La falta de sensibilidad y movilidad aumenta el riesgo de úlceras, que se previenen con alivio de presión."
        },
        {
          "q": "¿Qué caracteriza al choque medular?",
          "o": [
            "Hiperreflexia inmediata",
            "Aumento permanente del tono",
            "Arreflexia y flacidez temporal bajo el nivel de lesión",
            "Recuperación completa en minutos"
          ],
          "c": 2,
          "e": "En el choque medular se pierde temporalmente la actividad refleja por debajo de la lesión."
        },
        {
          "q": "¿Cómo se maneja la hipotensión ortostática al verticalizar a una persona con lesión medular?",
          "o": [
            "Verticalizando de golpe",
            "Evitando siempre la sedestación",
            "Restringiendo todo movimiento",
            "De forma progresiva, con apoyos como la faja abdominal"
          ],
          "c": 3,
          "e": "La verticalización gradual y las medidas de soporte ayudan a controlar los descensos de presión."
        }
      ]
    },
    {
      "id": "q-n15",
      "titulo": "Parkinson y esclerosis múltiple",
      "desc": "Enfermedades neurodegenerativas",
      "preguntas": [
        {
          "q": "¿Qué ocurre en la enfermedad de Parkinson?",
          "o": [
            "Pérdida de neuronas dopaminérgicas de la sustancia negra",
            "Daño de la unión neuromuscular",
            "Atrofia de los cuerpos vertebrales",
            "Pérdida de mielina periférica"
          ],
          "c": 0,
          "e": "Se pierden neuronas dopaminérgicas de la sustancia negra, lo que altera el control del movimiento."
        },
        {
          "q": "¿Cuáles son signos cardinales de la enfermedad de Parkinson?",
          "o": [
            "Dismetría, nistagmo y ataxia",
            "Temblor de reposo, rigidez, bradicinesia e inestabilidad postural",
            "Fasciculaciones y atrofia flácida",
            "Hiperreflexia y clonus únicamente"
          ],
          "c": 1,
          "e": "Los signos cardinales son temblor de reposo, rigidez, bradicinesia e inestabilidad postural."
        },
        {
          "q": "¿Qué estrategia ayuda a manejar el congelamiento de la marcha en Parkinson?",
          "o": [
            "Aumentar la velocidad de forma brusca",
            "Evitar caminar por completo",
            "Usar claves externas visuales o auditivas",
            "Caminar mirando hacia el techo"
          ],
          "c": 2,
          "e": "Las claves externas, como líneas en el suelo o un ritmo auditivo, ayudan a iniciar y mantener el paso."
        },
        {
          "q": "¿Qué sucede en la esclerosis múltiple?",
          "o": [
            "Degeneración de la sustancia negra",
            "Fractura de vértebras",
            "Infección bacteriana del nervio",
            "Desmielinización autoinmune del sistema nervioso central"
          ],
          "c": 3,
          "e": "En la esclerosis múltiple, el sistema inmune ataca la mielina del sistema nervioso central."
        },
        {
          "q": "¿Qué describe el fenómeno de Uhthoff?",
          "o": [
            "Empeoramiento transitorio de síntomas con el calor",
            "Mejoría de la fuerza con el frío extremo",
            "Pérdida súbita del habla",
            "Aparición de temblor al reposo"
          ],
          "c": 0,
          "e": "En la esclerosis múltiple, el aumento de la temperatura corporal puede agravar temporalmente los síntomas."
        },
        {
          "q": "¿Qué enfoque de ejercicio es adecuado en esclerosis múltiple con fatiga?",
          "o": [
            "Sesiones largas hasta el agotamiento",
            "Sesiones moderadas, con pausas y control de la fatiga",
            "Evitar toda actividad física",
            "Ejercicio siempre en ambientes muy calurosos"
          ],
          "c": 1,
          "e": "Se recomiendan cargas dosificadas con descansos, evitando el sobrecalentamiento y la fatiga excesiva."
        }
      ]
    },
    {
      "id": "q-n16",
      "titulo": "Hidroterapia y terapia acuática",
      "desc": "Principios del agua terapéutica",
      "preguntas": [
        {
          "q": "¿Qué principio físico explica que el cuerpo sumergido parezca pesar menos?",
          "o": [
            "La presión hidrostática",
            "La viscosidad del agua",
            "La flotabilidad (principio de Arquímedes)",
            "La tensión superficial"
          ],
          "c": 2,
          "e": "Según Arquímedes, el cuerpo sumergido recibe un empuje hacia arriba igual al peso del agua que desplaza, lo que reduce la carga sobre las articulaciones."
        },
        {
          "q": "La presión hidrostática sobre el cuerpo sumergido aumenta con:",
          "o": [
            "La temperatura del agua",
            "La velocidad de movimiento",
            "El tiempo de inmersión",
            "La profundidad"
          ],
          "c": 3,
          "e": "La presión hidrostática crece con la profundidad y favorece el retorno venoso y la reducción del edema, pero exige vigilancia en pacientes cardiovasculares."
        },
        {
          "q": "¿Qué propiedad del agua ofrece resistencia progresiva al movimiento, útil para fortalecer?",
          "o": [
            "Viscosidad y resistencia al avance",
            "Conductividad eléctrica",
            "Punto de ebullición",
            "Densidad del aire"
          ],
          "c": 0,
          "e": "La viscosidad y el arrastre hacen que la resistencia aumente al mover más rápido o con mayor superficie, lo que permite graduar el ejercicio."
        },
        {
          "q": "¿Cuál de las siguientes es una contraindicación de la terapia acuática?",
          "o": [
            "Artrosis de rodilla",
            "Herida abierta o infección activa de la piel",
            "Dolor lumbar crónico",
            "Rigidez posquirúrgica tardía"
          ],
          "c": 1,
          "e": "Las heridas abiertas y las infecciones cutáneas contraindican la inmersión por riesgo de contaminación y empeoramiento del cuadro."
        },
        {
          "q": "En una persona en inmersión hasta el cuello, el peso corporal soportado se reduce aproximadamente a:",
          "o": [
            "Un 90 % del peso",
            "Sin cambio alguno",
            "Un 10 % del peso aproximadamente",
            "Casi el 100 % del peso"
          ],
          "c": 2,
          "e": "En inmersión hasta el cuello la carga se reduce de forma muy marcada, por lo que se usa para iniciar la marcha con descarga en fases tempranas."
        },
        {
          "q": "¿Qué rango de temperatura se considera habitual en una piscina terapéutica para la mayoría de pacientes?",
          "o": [
            "Igual a la temperatura ambiente siempre",
            "Menos de 20 grados centígrados",
            "Más de 42 grados centígrados",
            "Cercana a 33 a 35 grados centígrados"
          ],
          "c": 3,
          "e": "Una temperatura neutra o templada, alrededor de 33 a 35 grados, permite ejercicio cómodo sin sobrecarga térmica."
        }
      ]
    },
    {
      "id": "q-n17",
      "titulo": "Ultrasonido terapéutico y láser",
      "desc": "Agentes físicos de uso común",
      "preguntas": [
        {
          "q": "¿Para qué sirve el gel de acoplamiento en el ultrasonido terapéutico?",
          "o": [
            "Evitar que el aire interrumpa la transmisión de la onda",
            "Enfriar el cabezal",
            "Aumentar la frecuencia",
            "Proteger al terapeuta"
          ],
          "c": 0,
          "e": "El aire refleja el ultrasonido, así que el gel garantiza un medio continuo para que la energía llegue al tejido."
        },
        {
          "q": "¿Qué significa el modo pulsado del ultrasonido frente al continuo?",
          "o": [
            "Mayor profundidad siempre",
            "Se emite energía de forma intermitente, con menor efecto térmico",
            "Se emite con mayor efecto térmico",
            "Se usa solo en agua"
          ],
          "c": 1,
          "e": "El modo pulsado reduce la energía promedio entregada y minimiza el calentamiento, favoreciendo efectos no térmicos."
        },
        {
          "q": "¿Cuál es una precaución clásica al aplicar ultrasonido?",
          "o": [
            "Aplicarlo sobre músculo sano",
            "Mantener el cabezal en movimiento",
            "Dejar el cabezal fijo en un punto",
            "Usarlo sobre tejido blando de la espalda"
          ],
          "c": 2,
          "e": "Mantener el cabezal quieto concentra la energía y puede provocar un sobrecalentamiento local; por eso se mueve de forma lenta y continua."
        },
        {
          "q": "El láser terapéutico de baja intensidad se asocia principalmente con:",
          "o": [
            "Corte de tejidos",
            "Calentamiento profundo muy intenso",
            "Destrucción de células sanas",
            "Fotobiomodulación, con efecto analgésico y de reparación tisular"
          ],
          "c": 3,
          "e": "La fotobiomodulación es el mecanismo por el cual la luz de baja intensidad influye en procesos celulares sin producir destrucción de tejido."
        },
        {
          "q": "¿Qué protección es indispensable al usar láser terapéutico?",
          "o": [
            "Guantes de plomo",
            "Gafas de protección adecuadas para la longitud de onda",
            "Mascarilla con filtro",
            "Ninguna protección"
          ],
          "c": 1,
          "e": "La luz láser puede dañar la retina, por lo que paciente y terapeuta deben usar gafas específicas para la longitud de onda del equipo."
        },
        {
          "q": "¿Qué zona se considera una contraindicación para aplicar ultrasonido o láser?",
          "o": [
            "Sobre el hombro",
            "Sobre un tumor maligno conocido",
            "Sobre el tendón rotuliano",
            "Sobre el tobillo"
          ],
          "c": 1,
          "e": "Se evita la aplicación sobre tumores malignos conocidos por la falta de certeza sobre su efecto en el crecimiento celular."
        }
      ]
    },
    {
      "id": "q-n18",
      "titulo": "Ondas de choque y magnetoterapia",
      "desc": "Terapias físicas de apoyo",
      "preguntas": [
        {
          "q": "Las ondas de choque extracorpóreas se utilizan con frecuencia en:",
          "o": [
            "Infecciones agudas de piel",
            "Fracturas recientes sin fijar",
            "Fascitis plantar crónica y tendinopatías",
            "Trombosis venosa"
          ],
          "c": 2,
          "e": "Se emplean en tendinopatías y fascitis plantar crónicas tras fallar el manejo conservador inicial."
        },
        {
          "q": "¿Cuál es una contraindicación habitual de las ondas de choque?",
          "o": [
            "Sobre el talón",
            "Sobre el codo",
            "Sobre el glúteo",
            "Sobre los pulmones o cerca de tejido pulmonar"
          ],
          "c": 3,
          "e": "Se evita la aplicación sobre tejido pulmonar, grandes vasos, nervios principales y cerca de cartílagos de crecimiento."
        },
        {
          "q": "¿Qué tipo de energía emplea la magnetoterapia?",
          "o": [
            "Campos magnéticos pulsados",
            "Ondas sonoras",
            "Radiación ionizante",
            "Corriente galvánica directa"
          ],
          "c": 0,
          "e": "La magnetoterapia usa campos magnéticos variables aplicados a la región tratada, sin contacto necesario con la piel."
        },
        {
          "q": "¿Qué dispositivo implantado obliga a evitar la magnetoterapia?",
          "o": [
            "Prótesis dental",
            "Marcapasos",
            "Clavos de titanio antiguos",
            "Medias de compresión"
          ],
          "c": 1,
          "e": "Los campos magnéticos pueden interferir con el funcionamiento de un marcapasos, por lo que es una contraindicación absoluta."
        },
        {
          "q": "Durante una sesión de ondas de choque, la molestia leve es esperable porque:",
          "o": [
            "Siempre indica lesión grave",
            "Es efecto de la anestesia",
            "Se aplica una energía mecánica de alta presión sobre el tejido",
            "No debería existir nunca"
          ],
          "c": 2,
          "e": "La energía mecánica puede generar molestia tolerable; el terapeuta ajusta la intensidad según la respuesta del paciente."
        },
        {
          "q": "¿Qué antecedente debe valorarse antes de aplicar ondas de choque?",
          "o": [
            "Alergia al polen",
            "Estatura del paciente",
            "Preferencia musical",
            "Uso de anticoagulantes o trastornos de coagulación"
          ],
          "c": 3,
          "e": "Los trastornos de coagulación o el uso de anticoagulantes elevan el riesgo de hematoma y requieren valoración previa."
        }
      ]
    },
    {
      "id": "q-n19",
      "titulo": "Masaje terapéutico y tejidos blandos",
      "desc": "Técnicas y efectos del masaje",
      "preguntas": [
        {
          "q": "¿Qué maniobra de masaje consiste en deslizar la mano de forma suave y continua?",
          "o": [
            "Effleurage",
            "Petrissage",
            "Fricción",
            "Tapotement"
          ],
          "c": 0,
          "e": "El effleurage o deslizamiento superficial se usa para iniciar y terminar la sesión y para extender el medio de contacto."
        },
        {
          "q": "El amasamiento (petrissage) consiste en:",
          "o": [
            "Percusión rápida",
            "Tomar, elevar y comprimir el tejido muscular",
            "Golpes con el borde cubital",
            "Deslizamiento ligero"
          ],
          "c": 1,
          "e": "El petrissage toma y comprime los tejidos blandos para favorecer la circulación local y la movilidad de las capas."
        },
        {
          "q": "¿Cuál es una contraindicación general del masaje?",
          "o": [
            "Contractura muscular simple",
            "Tensión cervical por estrés",
            "Trombosis venosa profunda sospechada o confirmada",
            "Fatiga muscular tras entrenar"
          ],
          "c": 2,
          "e": "Masajear sobre una trombosis puede desprender el coágulo; ante la sospecha se deriva y no se masajea."
        },
        {
          "q": "En el drenaje del edema por masaje, el sentido de las maniobras suele ser:",
          "o": [
            "De proximal a distal",
            "Aleatorio",
            "Siempre hacia la zona inflamada",
            "De distal a proximal, siguiendo el retorno venoso y linfático"
          ],
          "c": 3,
          "e": "Se trabaja en dirección al retorno venoso y linfático, comenzando de forma proximal para despejar el camino."
        },
        {
          "q": "La fricción transversa profunda se aplica sobre todo para:",
          "o": [
            "Influir en tejido tendinoso o ligamentario localizado",
            "Aumentar el edema",
            "Relajar todo el cuerpo",
            "Estimular la sudoración"
          ],
          "c": 0,
          "e": "Es una técnica localizada de presión perpendicular a las fibras, usada en estructuras tendinosas y ligamentosas."
        },
        {
          "q": "¿Qué efecto fisiológico se asocia al masaje en el sistema nervioso?",
          "o": [
            "Siempre aumenta el dolor",
            "Puede favorecer la relajación y modular la percepción del dolor",
            "Bloquea la circulación",
            "Elimina la sensibilidad"
          ],
          "c": 1,
          "e": "El masaje puede modular la percepción dolorosa y favorecer la relajación, aunque sus efectos son variables entre personas."
        }
      ]
    },
    {
      "id": "q-n20",
      "titulo": "Punción seca y puntos gatillo",
      "desc": "Dolor miofascial en la práctica",
      "preguntas": [
        {
          "q": "Un punto gatillo miofascial se describe clásicamente como:",
          "o": [
            "Un hueso desviado",
            "Una lesión del cartílago",
            "Un nódulo hipersensible dentro de una banda tensa de músculo",
            "Una inflamación de la piel"
          ],
          "c": 2,
          "e": "Se trata de una zona hipersensible en una banda tensa, que al presionarse puede reproducir el dolor del paciente o referirlo a otra zona."
        },
        {
          "q": "El dolor referido de un punto gatillo es el que:",
          "o": [
            "Aparece solo en el sitio presionado",
            "Es un dolor siempre articular",
            "Desaparece al moverse",
            "Se percibe en una zona distinta de donde se encuentra el punto"
          ],
          "c": 3,
          "e": "El dolor referido sigue patrones característicos de cada músculo y puede sentirse lejos del punto responsable."
        },
        {
          "q": "La punción seca se realiza con:",
          "o": [
            "Una aguja sin inyectar sustancia alguna",
            "Una aguja que inyecta anestésico",
            "Un bisturí",
            "Un láser"
          ],
          "c": 0,
          "e": "La punción seca emplea una aguja fina sin infiltrar sustancias, dirigida a puntos gatillo o tejido miofascial."
        },
        {
          "q": "¿Qué respuesta local se busca a veces durante la punción seca?",
          "o": [
            "Una pérdida de conciencia",
            "Una respuesta de espasmo local",
            "Una elevación de la fiebre",
            "Un bloqueo motor"
          ],
          "c": 1,
          "e": "La respuesta de espasmo local es una contracción breve de las fibras de la banda tensa y se considera un signo útil durante la técnica."
        },
        {
          "q": "Una precaución importante en la punción seca sobre la zona torácica es:",
          "o": [
            "El riesgo de neumotórax por cercanía al pulmón",
            "El riesgo de fractura de tibia",
            "El riesgo de calambre en el pie",
            "No existe ninguna"
          ],
          "c": 0,
          "e": "Al puncionar cerca de la caja torácica hay riesgo de neumotórax, por lo que se requiere formación, dirección segura y buena técnica."
        },
        {
          "q": "Antes de aplicar punción seca es indispensable:",
          "o": [
            "Evitar hablar con el paciente",
            "Utilizar siempre la misma aguja",
            "Ignorar los antecedentes",
            "Obtener el consentimiento informado y aplicar técnica estéril"
          ],
          "c": 3,
          "e": "Se debe informar riesgos y beneficios, obtener consentimiento y emplear material estéril de un solo uso, con medidas de bioseguridad."
        }
      ]
    },
    {
      "id": "q-n21",
      "titulo": "Estiramientos y flexibilidad",
      "desc": "Mejorar el rango de movimiento",
      "preguntas": [
        {
          "q": "El estiramiento estático consiste en:",
          "o": [
            "Mantener una posición de elongación durante un tiempo",
            "Rebotes rápidos",
            "Movimientos balísticos",
            "Contracciones máximas repetidas"
          ],
          "c": 0,
          "e": "Se alcanza una posición de elongación suave y se sostiene, sin rebotes, durante un tiempo determinado."
        },
        {
          "q": "La facilitación neuromuscular propioceptiva (FNP) en estiramientos usa:",
          "o": [
            "Solo calor local",
            "Contracción y relajación alternadas para ganar rango",
            "Reposo absoluto",
            "Ninguna contracción"
          ],
          "c": 1,
          "e": "Las técnicas de contracción-relajación aprovechan mecanismos neurofisiológicos para facilitar una mayor elongación."
        },
        {
          "q": "El estiramiento dinámico previo a la actividad se caracteriza por:",
          "o": [
            "Mantener mucho tiempo la postura",
            "Dolor intenso obligatorio",
            "Movimientos controlados que recorren el rango articular",
            "Inmovilidad total"
          ],
          "c": 2,
          "e": "Los movimientos controlados de amplitud progresiva preparan al cuerpo para la actividad."
        },
        {
          "q": "¿Qué sensación se considera apropiada durante un estiramiento?",
          "o": [
            "Dolor agudo y punzante",
            "Hormigueo intenso",
            "Entumecimiento total",
            "Tensión tolerable sin dolor agudo"
          ],
          "c": 3,
          "e": "Debe sentirse tensión tolerable; el dolor agudo, el hormigueo o la pérdida de sensibilidad indican detener la maniobra."
        },
        {
          "q": "¿Cuándo se debe tener especial cuidado al estirar?",
          "o": [
            "En un músculo recién desgarrado",
            "En un músculo sano",
            "En personas jóvenes siempre",
            "Después de caminar"
          ],
          "c": 0,
          "e": "Estirar con fuerza un músculo con desgarro reciente puede aumentar el daño; se respeta la fase de cicatrización."
        },
        {
          "q": "La hipermovilidad articular generalizada obliga a:",
          "o": [
            "Estirar al máximo cada articulación",
            "Priorizar estabilidad y control más que ganar más rango",
            "Ignorar el control motor",
            "Evitar todo ejercicio"
          ],
          "c": 1,
          "e": "En la hipermovilidad el objetivo suele ser estabilizar y fortalecer, no aumentar todavía más el rango."
        }
      ]
    },
    {
      "id": "q-n22",
      "titulo": "Entrenamiento de fuerza y progresión",
      "desc": "Cargas, series y adaptación",
      "preguntas": [
        {
          "q": "El principio de sobrecarga progresiva indica que:",
          "o": [
            "El descanso no es necesario",
            "La carga nunca debe cambiar",
            "La carga debe aumentar gradualmente para seguir adaptándose",
            "Solo importa la velocidad"
          ],
          "c": 2,
          "e": "Para continuar mejorando, el estímulo debe incrementarse de forma gradual conforme el cuerpo se adapta."
        },
        {
          "q": "Una contracción excéntrica es aquella en la que el músculo:",
          "o": [
            "No cambia su longitud",
            "Se acorta mientras genera fuerza",
            "Está relajado",
            "Se alarga mientras genera fuerza"
          ],
          "c": 3,
          "e": "En la fase excéntrica el músculo controla una carga mientras se alarga, como al bajar un peso de forma controlada."
        },
        {
          "q": "Una contracción isométrica se caracteriza porque:",
          "o": [
            "La longitud muscular se mantiene sin movimiento articular visible",
            "El músculo se acorta",
            "El músculo se alarga",
            "No hay tensión"
          ],
          "c": 0,
          "e": "Hay producción de fuerza sin cambio apreciable en la longitud del músculo ni movimiento articular."
        },
        {
          "q": "Las primeras mejoras de fuerza en un programa inicial se deben sobre todo a:",
          "o": [
            "Un aumento enorme de masa muscular",
            "Adaptaciones neurales",
            "Cambios óseos",
            "Incremento del peso corporal"
          ],
          "c": 1,
          "e": "Al inicio predominan las mejoras de reclutamiento y coordinación neural, antes de que la hipertrofia sea significativa."
        },
        {
          "q": "¿Qué función cumple el descanso entre sesiones de fuerza?",
          "o": [
            "Permitir la recuperación y adaptación",
            "Provocar pérdida de fuerza inmediata",
            "Evitar cualquier mejora",
            "Ninguna"
          ],
          "c": 0,
          "e": "La adaptación ocurre durante la recuperación; sin descanso adecuado aumenta el riesgo de fatiga y de lesión."
        },
        {
          "q": "La maniobra de Valsalva durante el esfuerzo debe vigilarse sobre todo en:",
          "o": [
            "Cualquier persona sin excepción",
            "Niños sanos al jugar",
            "Pacientes que solo caminan",
            "Personas con hipertensión o enfermedad cardiovascular"
          ],
          "c": 3,
          "e": "Contener la respiración con esfuerzo eleva de forma brusca la presión arterial, por lo que se desaconseja en personas con riesgo cardiovascular."
        }
      ]
    },
    {
      "id": "q-n23",
      "titulo": "Propiocepción y control motor",
      "desc": "Equilibrio y estabilidad articular",
      "preguntas": [
        {
          "q": "La propiocepción es la capacidad de:",
          "o": [
            "Percibir la posición y el movimiento del cuerpo",
            "Ver los colores",
            "Oír sonidos graves",
            "Sentir sabores"
          ],
          "c": 0,
          "e": "Es la percepción de la posición y el movimiento articular a través de receptores en músculos, tendones y articulaciones."
        },
        {
          "q": "¿Qué receptores musculares informan sobre la longitud y los cambios de longitud?",
          "o": [
            "Corpúsculos auditivos",
            "Husos neuromusculares",
            "Conos de la retina",
            "Células caliciformes"
          ],
          "c": 1,
          "e": "Los husos neuromusculares detectan la longitud del músculo y su velocidad de cambio."
        },
        {
          "q": "El órgano tendinoso de Golgi responde principalmente a:",
          "o": [
            "La temperatura",
            "El color de la piel",
            "La tensión generada en el tendón",
            "El sonido"
          ],
          "c": 2,
          "e": "Detecta la tensión del tendón y contribuye a regular la fuerza ejercida."
        },
        {
          "q": "Un ejercicio típico de propiocepción progresa desde:",
          "o": [
            "Sin carga a nada",
            "Superficie inestable a superficie estable",
            "Ojos cerrados siempre desde el inicio",
            "Superficie estable a superficie inestable"
          ],
          "c": 3,
          "e": "La progresión habitual va de condiciones estables y simples a otras más inestables o con tareas añadidas."
        },
        {
          "q": "Tras un esguince de tobillo, el entrenamiento propioceptivo ayuda a:",
          "o": [
            "Reducir el riesgo de nuevos esguinces",
            "Eliminar la necesidad de caminar",
            "Causar rigidez",
            "Aumentar el edema"
          ],
          "c": 0,
          "e": "Mejorar el control neuromuscular del tobillo disminuye el riesgo de recurrencias."
        },
        {
          "q": "El control motor se refiere a:",
          "o": [
            "La fuerza máxima únicamente",
            "La coordinación del movimiento por el sistema nervioso",
            "La densidad ósea",
            "La temperatura corporal"
          ],
          "c": 1,
          "e": "Es la capacidad del sistema nervioso de organizar músculos y articulaciones para producir movimientos coordinados y eficaces."
        }
      ]
    },
    {
      "id": "q-n24",
      "titulo": "Osteoartrosis y artritis",
      "desc": "Enfermedad articular y manejo",
      "preguntas": [
        {
          "q": "La osteoartrosis se caracteriza principalmente por:",
          "o": [
            "Fractura espontánea",
            "Infección bacteriana aguda",
            "Degeneración del cartílago articular y cambios en el hueso",
            "Parálisis flácida"
          ],
          "c": 2,
          "e": "Implica deterioro del cartílago, remodelación ósea y cambios en los tejidos de la articulación."
        },
        {
          "q": "La artritis reumatoide es una enfermedad:",
          "o": [
            "Sin dolor ni rigidez",
            "Siempre causada por trauma",
            "Exclusiva del cartílago",
            "Autoinmune que inflama las articulaciones"
          ],
          "c": 3,
          "e": "Es una enfermedad autoinmune inflamatoria y sistémica, que afecta con frecuencia articulaciones pequeñas de manos y pies."
        },
        {
          "q": "Una rigidez matutina prolongada, de más de 30 minutos, orienta más hacia:",
          "o": [
            "Un cuadro inflamatorio",
            "Una contractura simple",
            "Un esguince reciente",
            "Una fatiga muscular"
          ],
          "c": 0,
          "e": "La rigidez matutina larga es característica de procesos inflamatorios, mientras que en la artrosis suele ser breve."
        },
        {
          "q": "El ejercicio en la artrosis de rodilla:",
          "o": [
            "Está contraindicado siempre",
            "Se recomienda como parte central del tratamiento",
            "Solo sirve para niños",
            "Empeora el cartílago siempre"
          ],
          "c": 1,
          "e": "El ejercicio terapéutico es un pilar del manejo de la artrosis, ya que reduce el dolor y mejora la función."
        },
        {
          "q": "En una articulación inflamada en fase aguda se recomienda:",
          "o": [
            "Ejercicio de máxima carga",
            "Estiramiento máximo",
            "Respetar el dolor y adaptar la carga sin forzar",
            "Ignorar los síntomas"
          ],
          "c": 2,
          "e": "En los brotes se adapta la intensidad y se prioriza el control del dolor sin forzar la articulación."
        },
        {
          "q": "La protección articular en la artritis incluye:",
          "o": [
            "Forzar las articulaciones afectadas",
            "Evitar cualquier descanso",
            "Cargar con objetos siempre con los dedos",
            "Distribuir la carga y usar articulaciones más grandes"
          ],
          "c": 3,
          "e": "Se enseñan estrategias para repartir la carga, evitar posturas forzadas y ahorrar energía."
        }
      ]
    },
    {
      "id": "q-n25",
      "titulo": "Osteoporosis y salud ósea",
      "desc": "Prevenir fracturas por fragilidad",
      "preguntas": [
        {
          "q": "La osteoporosis se define por:",
          "o": [
            "Baja masa ósea y deterioro de su microarquitectura",
            "Exceso de calcio en la sangre",
            "Inflamación muscular",
            "Mayor densidad ósea"
          ],
          "c": 0,
          "e": "Hay disminución de la masa ósea y alteración de la microarquitectura, lo que aumenta la fragilidad."
        },
        {
          "q": "Las fracturas por fragilidad más frecuentes ocurren en:",
          "o": [
            "Dedos de los pies únicamente",
            "Vértebras, cadera y muñeca",
            "Cráneo",
            "Costillas flotantes únicamente"
          ],
          "c": 1,
          "e": "Vértebras, cadera y extremo distal del radio son las localizaciones clásicas."
        },
        {
          "q": "El ejercicio con carga (impacto y resistencia) favorece:",
          "o": [
            "Pérdida de hueso",
            "Fragilidad mayor",
            "Mantener o mejorar la densidad ósea",
            "Nada en el hueso"
          ],
          "c": 2,
          "e": "El hueso responde a la carga mecánica; el ejercicio con carga y de fuerza ayuda a conservar su densidad."
        },
        {
          "q": "En personas con osteoporosis se debe tener precaución con:",
          "o": [
            "Ejercicios de equilibrio",
            "Fortalecimiento de glúteos",
            "Caminar en terreno plano",
            "Flexiones forzadas de columna con carga"
          ],
          "c": 3,
          "e": "La flexión forzada y las torsiones bruscas con carga elevan el riesgo de fractura vertebral por compresión."
        },
        {
          "q": "Un objetivo clave del fisioterapeuta en osteoporosis es:",
          "o": [
            "Reducir el riesgo de caídas",
            "Aumentar el reposo absoluto",
            "Evitar toda actividad",
            "Sustituir al médico"
          ],
          "c": 0,
          "e": "Prevenir caídas mediante equilibrio, fuerza y entorno seguro es esencial para evitar fracturas."
        },
        {
          "q": "Una pérdida de estatura progresiva y cifosis dorsal pueden sugerir:",
          "o": [
            "Un esguince leve",
            "Fracturas vertebrales por compresión",
            "Un callo en el pie",
            "Una tendinitis de codo"
          ],
          "c": 1,
          "e": "Las fracturas vertebrales por compresión pueden provocar pérdida de altura y aumento de la cifosis; requiere derivación."
        }
      ]
    },
    {
      "id": "q-n26",
      "titulo": "Fibromialgia: abordaje terapéutico",
      "desc": "Dolor crónico generalizado",
      "preguntas": [
        {
          "q": "La fibromialgia se caracteriza por:",
          "o": [
            "Parálisis",
            "Fractura ósea",
            "Dolor generalizado crónico, fatiga y alteraciones del sueño",
            "Infección aguda"
          ],
          "c": 2,
          "e": "Cursa con dolor crónico extendido, fatiga, sueño no reparador y otros síntomas asociados."
        },
        {
          "q": "¿Cuál es una intervención con buena evidencia en fibromialgia?",
          "o": [
            "Evitar caminar",
            "Reposo absoluto",
            "Inmovilización",
            "Ejercicio aeróbico gradual"
          ],
          "c": 3,
          "e": "El ejercicio aeróbico de baja a moderada intensidad, con progresión gradual, es una recomendación sólida."
        },
        {
          "q": "La progresión del ejercicio en fibromialgia debe ser:",
          "o": [
            "Gradual y adaptada a la tolerancia",
            "Muy brusca desde el inicio",
            "Máxima desde la primera sesión",
            "Sin plan"
          ],
          "c": 0,
          "e": "Comenzar con poca carga y avanzar de forma lenta evita los aumentos transitorios de síntomas."
        },
        {
          "q": "La educación al paciente sobre el dolor:",
          "o": [
            "Carece de utilidad",
            "Ayuda a entender el cuadro y a participar activamente",
            "Provoca más dolor siempre",
            "Sustituye al ejercicio"
          ],
          "c": 1,
          "e": "Explicar el dolor crónico reduce el miedo y mejora la adherencia al tratamiento activo."
        },
        {
          "q": "La fibromialgia:",
          "o": [
            "Es una enfermedad sin tratamiento posible",
            "Produce daño articular destructivo típico",
            "Se maneja con un enfoque multidisciplinar",
            "Se cura con un solo masaje"
          ],
          "c": 2,
          "e": "El mejor abordaje combina ejercicio, educación, manejo del sueño y apoyo psicológico cuando se requiere."
        },
        {
          "q": "Una estrategia útil para administrar la energía es:",
          "o": [
            "Hacer todo el mismo día",
            "Aumentar la carga cada día",
            "Evitar descansar",
            "Alternar actividad y pausas planificadas"
          ],
          "c": 3,
          "e": "La dosificación de actividades y pausas ayuda a evitar los ciclos de exceso y agotamiento."
        }
      ]
    },
    {
      "id": "q-n27",
      "titulo": "EPOC y asma en rehabilitación",
      "desc": "Rehabilitación pulmonar básica",
      "preguntas": [
        {
          "q": "La EPOC se caracteriza por:",
          "o": [
            "Limitación del flujo de aire persistente y generalmente progresiva",
            "Mejoría total espontánea",
            "Fractura costal",
            "Hipertensión ocular"
          ],
          "c": 0,
          "e": "Es una enfermedad respiratoria con obstrucción persistente del flujo aéreo, con frecuencia asociada al tabaquismo."
        },
        {
          "q": "La respiración con labios fruncidos ayuda a:",
          "o": [
            "Cerrar las vías aéreas",
            "Aumentar la resistencia espiratoria y reducir el atrapamiento de aire",
            "Impedir el ejercicio",
            "Aumentar la tos"
          ],
          "c": 1,
          "e": "Genera una contrapresión que mantiene abiertas las vías aéreas durante la espiración, y disminuye la sensación de falta de aire."
        },
        {
          "q": "La rehabilitación pulmonar incluye típicamente:",
          "o": [
            "Solo reposo",
            "Únicamente cirugía",
            "Ejercicio, educación y apoyo psicosocial",
            "Ningún entrenamiento"
          ],
          "c": 2,
          "e": "Es un programa integral que combina entrenamiento físico, educación y estrategias de autocuidado."
        },
        {
          "q": "La escala de Borg modificada permite:",
          "o": [
            "Medir la densidad ósea",
            "Medir la temperatura",
            "Calcular el peso",
            "Cuantificar la disnea o el esfuerzo percibido"
          ],
          "c": 3,
          "e": "Es una escala de percepción subjetiva usada para dosificar el ejercicio según la disnea y la fatiga."
        },
        {
          "q": "En un paciente con asma, antes del ejercicio es importante:",
          "o": [
            "Verificar que cuente con su tratamiento de rescate indicado",
            "Olvidar su plan de acción",
            "Realizar esfuerzo máximo sin preparación",
            "Evitar la entrada en calor"
          ],
          "c": 0,
          "e": "El paciente debe tener a la mano su medicación de rescate indicada y conocer su plan de acción ante síntomas."
        },
        {
          "q": "La posición de inclinación hacia delante apoyando los brazos suele:",
          "o": [
            "Aumentar la disnea siempre",
            "Aliviar la disnea en algunos pacientes con EPOC",
            "Detener la respiración",
            "Causar fracturas"
          ],
          "c": 1,
          "e": "Esta postura puede mejorar la mecánica respiratoria y aliviar la sensación de falta de aire en algunas personas."
        }
      ]
    },
    {
      "id": "q-n28",
      "titulo": "Embarazo y posparto",
      "desc": "Fisioterapia en la maternidad",
      "preguntas": [
        {
          "q": "El ejercicio moderado durante un embarazo sin complicaciones:",
          "o": [
            "Está prohibido siempre",
            "Se debe evitar en todos los casos",
            "Suele recomendarse con la valoración del equipo de salud",
            "Solo se hace con esfuerzo máximo"
          ],
          "c": 2,
          "e": "En un embarazo sin complicaciones el ejercicio moderado es beneficioso, siempre con aval del equipo médico."
        },
        {
          "q": "La diástasis de los rectos abdominales es:",
          "o": [
            "Una inflamación de la rodilla",
            "Una fractura del sacro",
            "Un desgarro del pulmón",
            "La separación de los músculos rectos del abdomen a lo largo de la línea alba"
          ],
          "c": 3,
          "e": "Se trata de una separación entre ambos rectos abdominales que es frecuente durante el embarazo y el posparto."
        },
        {
          "q": "Después de la semana 20 de gestación se suele evitar prolongar la posición de:",
          "o": [
            "Decúbito supino prolongado",
            "Sentada",
            "De pie un momento",
            "Decúbito lateral"
          ],
          "c": 0,
          "e": "El útero puede comprimir la vena cava en decúbito supino prolongado y disminuir el retorno venoso."
        },
        {
          "q": "El dolor lumbopélvico gestacional se relaciona con:",
          "o": [
            "Falta de calcio únicamente",
            "Cambios posturales, hormonales y de carga",
            "Ausencia de movimiento",
            "Un esguince de tobillo"
          ],
          "c": 1,
          "e": "Intervienen el cambio del centro de gravedad, la laxitud ligamentaria hormonal y el aumento de carga."
        },
        {
          "q": "Un signo de alarma que obliga a suspender el ejercicio en el embarazo es:",
          "o": [
            "Sudoración leve",
            "Sed ligera",
            "Sangrado vaginal o dolor torácico",
            "Frecuencia cardíaca normal"
          ],
          "c": 2,
          "e": "El sangrado vaginal, el dolor en el pecho, el mareo intenso o la falta de aire súbita requieren detener la actividad y consultar."
        },
        {
          "q": "En el posparto, la recuperación del suelo pélvico se apoya en:",
          "o": [
            "Reposo absoluto",
            "Evitar siempre moverse",
            "Maniobras bruscas",
            "Ejercicio gradual y pautas individualizadas"
          ],
          "c": 3,
          "e": "El retorno al ejercicio es progresivo, con valoración del suelo pélvico y de la pared abdominal."
        }
      ]
    },
    {
      "id": "q-n29",
      "titulo": "Quemados y cicatrices",
      "desc": "Rehabilitación del paciente quemado",
      "preguntas": [
        {
          "q": "Una quemadura de espesor parcial profunda o total suele requerir:",
          "o": [
            "Atención médica especializada",
            "Solo reposo en casa",
            "Masaje intenso inmediato",
            "Ningún seguimiento"
          ],
          "c": 0,
          "e": "Las quemaduras profundas necesitan manejo médico especializado; la rehabilitación se integra al equipo."
        },
        {
          "q": "El posicionamiento antideformidad en el quemado busca:",
          "o": [
            "Favorecer contracturas",
            "Prevenir retracciones manteniendo la piel en elongación",
            "Inmovilizar en flexión siempre",
            "Evitar el movimiento total"
          ],
          "c": 1,
          "e": "Se colocan las zonas afectadas en posiciones que mantengan el tejido elongado y eviten contracturas."
        },
        {
          "q": "Una cicatriz hipertrófica se caracteriza por:",
          "o": [
            "Crecer fuera de la herida sin límite siempre",
            "Ser plana y blanca",
            "Ser elevada y enrojecida, dentro del límite de la herida",
            "No tener relieve"
          ],
          "c": 2,
          "e": "Es una cicatriz elevada y firme que se mantiene dentro de los límites de la lesión original."
        },
        {
          "q": "Las prendas de presión se utilizan para:",
          "o": [
            "Aumentar el volumen de la cicatriz",
            "Evitar la hidratación",
            "Aumentar el calor local",
            "Ayudar a controlar la cicatrización hipertrófica"
          ],
          "c": 3,
          "e": "La presión sostenida contribuye a aplanar y madurar la cicatriz, como parte del manejo del quemado."
        },
        {
          "q": "La movilización temprana en el quemado:",
          "o": [
            "Ayuda a conservar el rango y la función, según indicación médica",
            "Se evita siempre",
            "Debe ser dolorosa al máximo",
            "Es innecesaria"
          ],
          "c": 0,
          "e": "La movilización precoz y supervisada previene rigideces y mantiene la función."
        },
        {
          "q": "El masaje de la cicatriz madura ayuda a:",
          "o": [
            "Abrir la herida",
            "Mejorar flexibilidad y movilidad de la piel",
            "Incrementar la infección",
            "Evitar la hidratación"
          ],
          "c": 1,
          "e": "Sobre una cicatriz ya cerrada, el masaje puede mejorar su flexibilidad y la movilidad de la piel."
        }
      ]
    },
    {
      "id": "q-n30",
      "titulo": "Tendinopatías y carga progresiva",
      "desc": "Manejo de tendones dolorosos",
      "preguntas": [
        {
          "q": "El tratamiento con mejor respaldo en tendinopatías crónicas es:",
          "o": [
            "Reposo absoluto prolongado",
            "Inmovilización indefinida",
            "Ejercicio con carga progresiva",
            "Evitar cualquier carga"
          ],
          "c": 2,
          "e": "La carga progresiva adaptada al tendón es el eje del tratamiento en tendinopatías."
        },
        {
          "q": "El ejercicio isométrico en una tendinopatía se usa para:",
          "o": [
            "Provocar dolor máximo",
            "Aumentar la inflamación",
            "Evitar la fuerza",
            "Cargar el tendón con dolor modulado al inicio"
          ],
          "c": 3,
          "e": "Las contracciones isométricas permiten cargar el tendón de forma controlada, en especial en fases dolorosas."
        },
        {
          "q": "El ejercicio excéntrico lento se ha empleado en:",
          "o": [
            "Tendón de Aquiles y rotuliano",
            "Fracturas recientes",
            "Neuropatía",
            "Infecciones"
          ],
          "c": 0,
          "e": "Se utiliza en el tendón de Aquiles y rotuliano como parte de la carga progresiva."
        },
        {
          "q": "Una tendinopatía suele agravarse por:",
          "o": [
            "Descansar bien",
            "Aumentos bruscos de la carga de entrenamiento",
            "Dormir lo suficiente",
            "Calentar adecuadamente"
          ],
          "c": 1,
          "e": "Los incrementos repentinos del volumen o la intensidad superan la capacidad de adaptación del tendón."
        },
        {
          "q": "El dolor aceptable durante el ejercicio en tendinopatía, según muchos protocolos, es:",
          "o": [
            "Ninguno nunca",
            "Insoportable",
            "Moderado y que se calme en un tiempo razonable",
            "Con hormigueo intenso"
          ],
          "c": 2,
          "e": "Se tolera dolor leve a moderado que no empeore al día siguiente; es una guía para dosificar."
        },
        {
          "q": "La tendinopatía del manguito rotador suele provocar dolor al:",
          "o": [
            "Girar el cuello solamente",
            "Mover los dedos",
            "Caminar únicamente",
            "Elevar el brazo, sobre todo por encima de la cabeza"
          ],
          "c": 3,
          "e": "El dolor suele aparecer con la elevación del brazo y las actividades por encima de la cabeza."
        }
      ]
    },
    {
      "id": "q-n31",
      "titulo": "Imagen diagnóstica para el fisioterapeuta",
      "desc": "Radiografía, resonancia, ecografía y electromiografía",
      "preguntas": [
        {
          "q": "¿Qué estudio es el primero que se suele pedir ante la sospecha de una fractura?",
          "o": [
            "Radiografía simple",
            "Electromiografía",
            "Espirometría",
            "Electrocardiograma"
          ],
          "c": 0,
          "e": "La radiografía muestra bien el hueso, es rápida y accesible."
        },
        {
          "q": "¿Qué estudio muestra mejor ligamentos, meniscos y cartílago?",
          "o": [
            "Radiografía simple",
            "Resonancia magnética",
            "Espirometría",
            "Densitometría"
          ],
          "c": 1,
          "e": "La resonancia magnética tiene gran detalle de los tejidos blandos."
        },
        {
          "q": "¿Qué ventaja tiene la ecografía musculoesquelética?",
          "o": [
            "Usa radiación en dosis altas",
            "Solo sirve para ver el hueso",
            "Permite ver tendones y músculos en movimiento y sin radiación",
            "Necesita sedar al paciente"
          ],
          "c": 2,
          "e": "Es dinámica, no usa radiación y permite comparar con el lado sano."
        },
        {
          "q": "Una resonancia muestra una protrusión discal en una persona sin dolor. ¿Qué conviene hacer?",
          "o": [
            "Tratarla siempre con cirugía",
            "Interpretarla junto con la clínica, porque muchos hallazgos aparecen en personas sin dolor",
            "Suspender todo ejercicio",
            "Ignorar por completo la exploración"
          ],
          "c": 1,
          "e": "Los hallazgos de imagen deben correlacionarse con los síntomas y la exploración."
        },
        {
          "q": "¿Qué estudio mide la densidad mineral ósea?",
          "o": [
            "Resonancia magnética",
            "Ecografía",
            "Electromiografía",
            "Densitometría ósea (DXA)"
          ],
          "c": 3,
          "e": "La DXA se usa para diagnosticar osteopenia y osteoporosis."
        },
        {
          "q": "¿Qué estudio evalúa la actividad eléctrica del músculo y la conducción nerviosa?",
          "o": [
            "Electromiografía y velocidad de conducción",
            "Radiografía",
            "Tomografía",
            "Gammagrafía"
          ],
          "c": 0,
          "e": "Ayuda a distinguir problemas musculares, nerviosos o radiculares."
        }
      ]
    },
    {
      "id": "q-n32",
      "titulo": "Farmacología básica para el fisioterapeuta",
      "desc": "Fármacos frecuentes y su efecto en la sesión",
      "preguntas": [
        {
          "q": "¿Qué efecto tienen los betabloqueadores durante el ejercicio?",
          "o": [
            "Disparan la frecuencia cardíaca",
            "Limitan el aumento de la frecuencia cardíaca",
            "Elevan la glucosa",
            "No tienen ningún efecto"
          ],
          "c": 1,
          "e": "La frecuencia cardíaca deja de ser un buen indicador de intensidad; se usa también la percepción de esfuerzo."
        },
        {
          "q": "El uso prolongado de antiinflamatorios no esteroideos (AINE) puede causar:",
          "o": [
            "Hipoglucemia",
            "Molestias gástricas y riesgo renal o de sangrado",
            "Aumento de la talla",
            "Mayor flexibilidad"
          ],
          "c": 1,
          "e": "Por eso su uso prolongado requiere indicación y seguimiento médico."
        },
        {
          "q": "Un paciente con anticoagulantes requiere precaución especial con:",
          "o": [
            "Estiramientos suaves",
            "Caminata ligera",
            "Técnicas profundas o con impacto por el riesgo de hematomas",
            "Respiración diafragmática"
          ],
          "c": 2,
          "e": "El riesgo de sangrado aumenta con maniobras intensas o golpes."
        },
        {
          "q": "El uso prolongado de corticoides sistémicos puede provocar:",
          "o": [
            "Mayor densidad ósea",
            "Fortalecimiento del tendón",
            "Mejor cicatrización",
            "Debilidad muscular y pérdida de densidad ósea"
          ],
          "c": 3,
          "e": "Debilitan músculo, hueso y tendón; se adapta la carga y se vigila el riesgo de fractura."
        },
        {
          "q": "Un paciente que usa insulina y hace ejercicio debe vigilar:",
          "o": [
            "La hipoglucemia",
            "La talla",
            "El color del cabello",
            "La vista cansada"
          ],
          "c": 0,
          "e": "El ejercicio baja la glucosa y, combinado con insulina, puede causar hipoglucemia."
        },
        {
          "q": "Algunos relajantes musculares y analgésicos pueden causar:",
          "o": [
            "Excitación excesiva",
            "Somnolencia y mareo, con riesgo de caída",
            "Aumento de la fuerza",
            "Mejor equilibrio"
          ],
          "c": 1,
          "e": "Conviene preguntar por los medicamentos antes de ejercicios de equilibrio o marcha."
        }
      ]
    },
    {
      "id": "q-n33",
      "titulo": "Diabetes y ejercicio",
      "desc": "Glucosa, pie diabético y seguridad",
      "preguntas": [
        {
          "q": "Antes de ejercitar a una persona con diabetes, conviene revisar:",
          "o": [
            "Su glucosa y si tiene síntomas de hipoglucemia",
            "Solo su peso",
            "Solo su estatura",
            "Nada, si se siente bien"
          ],
          "c": 0,
          "e": "Se confirma que la glucosa sea segura y se tiene a la mano una fuente de azúcar."
        },
        {
          "q": "¿Cuál es una señal de hipoglucemia?",
          "o": [
            "Piel seca y sed intensa",
            "Temblor, sudor frío y confusión",
            "Tos con flemas",
            "Dolor en la espalda baja"
          ],
          "c": 1,
          "e": "Requiere suspender el ejercicio y dar carbohidrato de acción rápida si está consciente."
        },
        {
          "q": "¿Qué cuidado es clave en el pie diabético?",
          "o": [
            "Caminar siempre descalzo",
            "Usar el mismo calcetín varios días",
            "Revisar la piel y el calzado a diario por la pérdida de sensibilidad",
            "Evitar todo ejercicio"
          ],
          "c": 2,
          "e": "La neuropatía oculta heridas y roces; el calzado adecuado previene úlceras."
        },
        {
          "q": "El ejercicio regular en la diabetes tipo 2:",
          "o": [
            "Empeora la sensibilidad a la insulina",
            "No cambia nada",
            "Eleva siempre la glucosa",
            "Mejora la sensibilidad a la insulina"
          ],
          "c": 3,
          "e": "El ejercicio aeróbico y de fuerza mejoran el control glucémico."
        },
        {
          "q": "¿Qué complicación de la diabetes afecta sobre todo la sensibilidad de manos y pies?",
          "o": [
            "Neuropatía diabética",
            "Osteoporosis",
            "Escoliosis",
            "Bursitis"
          ],
          "c": 0,
          "e": "Aumenta el riesgo de lesiones sin dolor y de caídas."
        },
        {
          "q": "Si la glucosa está muy alta y hay síntomas como náuseas o aliento con olor a fruta, lo correcto es:",
          "o": [
            "Aumentar la intensidad del ejercicio",
            "Posponer el ejercicio y derivar a valoración médica",
            "Dar azúcar de inmediato",
            "Hacer solo estiramientos"
          ],
          "c": 1,
          "e": "Puede tratarse de una descompensación metabólica que exige atención médica."
        }
      ]
    },
    {
      "id": "q-n34",
      "titulo": "Hipertensión arterial y ejercicio",
      "desc": "Presión arterial y prescripción segura",
      "preguntas": [
        {
          "q": "¿Qué tipo de ejercicio es la base en la hipertensión controlada?",
          "o": [
            "Aeróbico regular de intensidad moderada",
            "Solo máxima fuerza",
            "Reposo absoluto",
            "Solo estiramientos"
          ],
          "c": 0,
          "e": "Caminata, bicicleta o natación de forma regular reducen la presión en reposo."
        },
        {
          "q": "¿Qué maniobra conviene evitar en los ejercicios de fuerza?",
          "o": [
            "Exhalar al esforzarse",
            "Respirar con calma",
            "Contener la respiración (Valsalva)",
            "Calentar antes"
          ],
          "c": 2,
          "e": "Valsalva eleva bruscamente la presión arterial; se exhala durante el esfuerzo."
        },
        {
          "q": "¿Cuál de estas cifras en reposo aconseja no iniciar el ejercicio y pedir valoración médica?",
          "o": [
            "120/80 mmHg",
            "130/85 mmHg",
            "135/88 mmHg",
            "Sistólica mayor de 200 o diastólica mayor de 110 mmHg"
          ],
          "c": 3,
          "e": "Con cifras tan altas el riesgo supera el beneficio de esa sesión."
        },
        {
          "q": "Un paciente hipertenso se marea al pasar rápido de acostado a de pie. ¿Qué puede ser?",
          "o": [
            "Hipotensión ortostática; los cambios de posición deben ser graduales",
            "Un buen signo de recuperación",
            "Siempre un infarto",
            "Hipoglucemia obligatoriamente"
          ],
          "c": 0,
          "e": "Algunos fármacos antihipertensivos la favorecen; se cambia de posición con calma."
        },
        {
          "q": "El ejercicio aeróbico regular puede reducir la presión arterial en reposo aproximadamente:",
          "o": [
            "50 mmHg",
            "Nada",
            "De 5 a 8 mmHg",
            "Más de 40 mmHg"
          ],
          "c": 2,
          "e": "Es una reducción pequeña pero clínicamente relevante."
        },
        {
          "q": "Durante el ejercicio aeróbico, la presión sistólica normalmente:",
          "o": [
            "Baja mucho",
            "Aumenta de forma progresiva",
            "Se mantiene en cero",
            "Es igual a la diastólica"
          ],
          "c": 1,
          "e": "La diastólica se mantiene o baja ligeramente; una caída de la sistólica es señal de alarma."
        }
      ]
    },
    {
      "id": "q-n35",
      "titulo": "Escoliosis",
      "desc": "Curvas de la columna, valoración y manejo",
      "preguntas": [
        {
          "q": "La escoliosis es:",
          "o": [
            "Una curva lateral y rotación de la columna mayor de 10° (ángulo de Cobb)",
            "Un aumento de la lordosis",
            "Un dolor cervical",
            "Una hernia de disco"
          ],
          "c": 0,
          "e": "Es una deformidad tridimensional de la columna."
        },
        {
          "q": "¿Qué prueba clínica se usa para detectarla?",
          "o": [
            "Prueba de Lasègue",
            "Prueba de Adams (flexión hacia adelante)",
            "Prueba de Thomas",
            "Prueba de Lachman"
          ],
          "c": 1,
          "e": "En flexión se observa la giba costal por la rotación vertebral."
        },
        {
          "q": "¿Con qué método se mide la curva en la radiografía?",
          "o": [
            "Goniometría con cinta",
            "Método de Daniels",
            "Ángulo de Cobb",
            "Escala de Borg"
          ],
          "c": 2,
          "e": "El ángulo de Cobb mide la inclinación entre las vértebras más inclinadas de la curva."
        },
        {
          "q": "¿Cuál es el tipo más frecuente en adolescentes?",
          "o": [
            "Congénita",
            "Neuromuscular",
            "Postraumática",
            "Idiopática"
          ],
          "c": 3,
          "e": "En la mayoría no se encuentra una causa identificable."
        },
        {
          "q": "¿Cuándo suele indicarse un corsé?",
          "o": [
            "En curvas moderadas durante el crecimiento",
            "En toda desviación postural leve",
            "Solo en adultos mayores",
            "Nunca se indica"
          ],
          "c": 0,
          "e": "El objetivo es detener la progresión de la curva mientras el hueso crece."
        },
        {
          "q": "Los ejercicios específicos para escoliosis (como el método Schroth):",
          "o": [
            "Sustituyen siempre al corsé y a la cirugía",
            "Se hacen sin supervisión desde el primer día",
            "Empeoran la curva",
            "Complementan el tratamiento y trabajan postura y respiración"
          ],
          "c": 3,
          "e": "Buscan autocorrección, control postural y mejor expansión torácica."
        }
      ]
    },
    {
      "id": "q-n36",
      "titulo": "Parálisis cerebral infantil",
      "desc": "Tipos, función motora y objetivos",
      "preguntas": [
        {
          "q": "La parálisis cerebral es consecuencia de:",
          "o": [
            "Una lesión no progresiva del cerebro en desarrollo",
            "Una lesión de la médula en la edad adulta",
            "Una enfermedad muscular",
            "Un problema de las articulaciones"
          ],
          "c": 0,
          "e": "La lesión es estable, pero sus manifestaciones cambian con el crecimiento."
        },
        {
          "q": "¿Cuál es el tipo más frecuente?",
          "o": [
            "Atáxica",
            "Espástica",
            "Discinética",
            "Hipotónica pura"
          ],
          "c": 1,
          "e": "La espástica se caracteriza por aumento del tono y reflejos exaltados."
        },
        {
          "q": "El sistema GMFCS clasifica:",
          "o": [
            "El tipo de dolor",
            "El peso al nacer",
            "La función motora gruesa en cinco niveles",
            "La capacidad pulmonar"
          ],
          "c": 2,
          "e": "Ayuda a prever la evolución y planificar los objetivos."
        },
        {
          "q": "Un objetivo central de la rehabilitación es:",
          "o": [
            "Que el niño se mueva exactamente como un niño sin lesión",
            "Evitar todo movimiento",
            "Solo corregir la forma de los pies",
            "Mejorar la función, la autonomía y la participación"
          ],
          "c": 3,
          "e": "Se prioriza lo que el niño y su familia necesitan hacer en su vida diaria."
        },
        {
          "q": "¿Qué complicación ortopédica se vigila con frecuencia?",
          "o": [
            "Luxación o subluxación de cadera",
            "Fractura de clavícula",
            "Hernia inguinal",
            "Escoliosis lumbar sola"
          ],
          "c": 0,
          "e": "Se controla con valoración clínica y radiografías periódicas."
        },
        {
          "q": "Ante la espasticidad, ¿qué estrategia es útil?",
          "o": [
            "Estiramientos bruscos",
            "Estiramientos suaves, posicionamiento y actividad funcional",
            "Inmovilizar siempre",
            "Evitar la carga de peso"
          ],
          "c": 1,
          "e": "Se combina con férulas, ejercicio y, cuando se indica, tratamiento médico."
        }
      ]
    },
    {
      "id": "q-n37",
      "titulo": "Atrapamientos nerviosos y túnel carpiano",
      "desc": "Nervio mediano y cubital",
      "preguntas": [
        {
          "q": "El síndrome del túnel carpiano comprime el nervio:",
          "o": [
            "Mediano",
            "Radial",
            "Ciático",
            "Axilar"
          ],
          "c": 0,
          "e": "Pasa por el túnel carpiano junto con los tendones flexores."
        },
        {
          "q": "Un síntoma típico es:",
          "o": [
            "Dolor en la rodilla",
            "Hormigueo en pulgar, índice y medio, sobre todo de noche",
            "Pérdida de olfato",
            "Calambres en los muslos"
          ],
          "c": 1,
          "e": "Muchos pacientes despiertan sacudiendo la mano."
        },
        {
          "q": "¿Qué pruebas se usan para orientar el diagnóstico?",
          "o": [
            "Lasègue y Lachman",
            "Thomas y Ober",
            "Phalen y Tinel",
            "Adams y Trendelenburg"
          ],
          "c": 2,
          "e": "Reproducen parestesias al flexionar la muñeca o al percutir sobre el nervio."
        },
        {
          "q": "El atrapamiento del nervio cubital en el codo causa hormigueo en:",
          "o": [
            "Pulgar e índice",
            "Todos los dedos",
            "Solo la palma",
            "Anular y meñique"
          ],
          "c": 3,
          "e": "Es el llamado síndrome del túnel cubital."
        },
        {
          "q": "Un manejo conservador inicial del túnel carpiano incluye:",
          "o": [
            "Férula en posición neutra, sobre todo de noche, y ajustar las actividades",
            "Reposo absoluto de todo el cuerpo",
            "Masaje muy intenso sobre la muñeca",
            "Colgarse de las manos"
          ],
          "c": 0,
          "e": "Se reduce la presión sobre el nervio y se educa sobre posturas de trabajo."
        },
        {
          "q": "¿Qué signo obliga a derivar con mayor prioridad?",
          "o": [
            "Hormigueo leve ocasional",
            "Dolor al terminar el día",
            "Atrofia del músculo de la base del pulgar y pérdida de fuerza",
            "Sudoración leve"
          ],
          "c": 2,
          "e": "Indica compromiso nervioso importante que puede requerir cirugía."
        }
      ]
    },
    {
      "id": "q-n38",
      "titulo": "Prótesis de cadera y de rodilla",
      "desc": "Precauciones y progresión tras la cirugía",
      "preguntas": [
        {
          "q": "Tras una prótesis total de cadera por vía posterior, ¿qué suele evitarse?",
          "o": [
            "Caminar con apoyo",
            "Flexión de cadera mayor de 90°, aducción y rotación interna",
            "Respirar profundo",
            "Mover los tobillos"
          ],
          "c": 1,
          "e": "Esas posiciones aumentan el riesgo de luxación de la prótesis."
        },
        {
          "q": "¿Cuándo suele comenzar la movilización tras la cirugía?",
          "o": [
            "A las 6 semanas",
            "Solo al mes",
            "En las primeras 24 horas, según indicación",
            "Después del alta definitiva"
          ],
          "c": 2,
          "e": "La movilización temprana reduce complicaciones y acorta la estancia."
        },
        {
          "q": "¿Qué ejercicio temprano ayuda a prevenir la trombosis?",
          "o": [
            "Reposo total",
            "Contener la respiración",
            "Evitar mover los pies",
            "Bombeo de tobillos y movilización precoz"
          ],
          "c": 3,
          "e": "Activa la circulación de retorno de las piernas."
        },
        {
          "q": "Una meta temprana tras la prótesis de rodilla es:",
          "o": [
            "Lograr extensión completa y aumentar la flexión de forma progresiva",
            "Flexión máxima el primer día",
            "Evitar la extensión",
            "No apoyar nunca el pie"
          ],
          "c": 0,
          "e": "La extensión completa es clave para una marcha eficiente."
        },
        {
          "q": "¿Qué signo puede indicar una infección de la herida?",
          "o": [
            "Rigidez leve matutina",
            "Cansancio al caminar",
            "Enrojecimiento, calor, secreción o fiebre",
            "Hormigueo leve en el pie"
          ],
          "c": 2,
          "e": "Debe comunicarse al equipo médico sin demora."
        },
        {
          "q": "Para caminar al inicio suele usarse:",
          "o": [
            "Andador o muletas, con la carga que indique el cirujano",
            "Ninguna ayuda",
            "Solo bastón desde el primer día",
            "Silla de ruedas permanente"
          ],
          "c": 0,
          "e": "La carga permitida depende del tipo de prótesis y de la indicación médica."
        }
      ]
    },
    {
      "id": "q-n39",
      "titulo": "Reconstrucción del ligamento cruzado anterior",
      "desc": "Del posoperatorio al retorno al deporte",
      "preguntas": [
        {
          "q": "¿Qué función principal tiene el LCA?",
          "o": [
            "Frenar la traslación anterior de la tibia y controlar la rotación",
            "Estabilizar el hombro",
            "Mover los dedos del pie",
            "Proteger el menisco lateral únicamente"
          ],
          "c": 0,
          "e": "Aporta estabilidad anterior y rotacional a la rodilla."
        },
        {
          "q": "¿Qué prueba clínica es la más sensible para una rotura del LCA?",
          "o": [
            "Prueba de Phalen",
            "Prueba de Lachman",
            "Prueba de Thomas",
            "Prueba de Adams"
          ],
          "c": 1,
          "e": "Se hace con la rodilla en leve flexión, desplazando la tibia hacia adelante."
        },
        {
          "q": "Un mecanismo típico de lesión es:",
          "o": [
            "Caída sobre la mano",
            "Levantar peso con la espalda",
            "Giro o cambio de dirección con el pie fijo",
            "Estirar el cuello"
          ],
          "c": 2,
          "e": "Suele ocurrir sin contacto, al desacelerar o girar."
        },
        {
          "q": "Una prioridad en las primeras semanas es:",
          "o": [
            "Flexión máxima inmediata",
            "Correr",
            "Saltar",
            "Recuperar la extensión completa y controlar el derrame"
          ],
          "c": 3,
          "e": "La falta de extensión y el edema retrasan toda la recuperación."
        },
        {
          "q": "El retorno al deporte debe basarse en:",
          "o": [
            "Solo el tiempo transcurrido",
            "Pruebas funcionales de fuerza, saltos y control, además del tiempo",
            "El deseo del paciente",
            "La edad del paciente"
          ],
          "c": 1,
          "e": "Cumplir criterios objetivos reduce el riesgo de relesión."
        },
        {
          "q": "¿Cuál es un injerto frecuente en la reconstrucción?",
          "o": [
            "Tendón del bíceps",
            "Tendón de Aquiles",
            "Tendón rotuliano o isquiotibiales",
            "Ligamento del codo"
          ],
          "c": 2,
          "e": "También se usa el tendón del cuádriceps o aloinjertos."
        }
      ]
    },
    {
      "id": "q-n40",
      "titulo": "Lesiones musculares",
      "desc": "Desgarros, grados y progresión",
      "preguntas": [
        {
          "q": "Un desgarro muscular de grado III significa:",
          "o": [
            "Rotura completa del músculo",
            "Dolor sin lesión de fibras",
            "Un calambre",
            "Una contractura leve"
          ],
          "c": 0,
          "e": "Suele haber defecto palpable, pérdida de función y equimosis."
        },
        {
          "q": "¿Qué músculos se lesionan con mayor frecuencia en la carrera de velocidad?",
          "o": [
            "Pectorales",
            "Isquiotibiales",
            "Deltoides",
            "Músculos del cuello"
          ],
          "c": 1,
          "e": "Trabajan de forma excéntrica al frenar la pierna en la fase final del vuelo."
        },
        {
          "q": "En la fase aguda de un desgarro, ¿qué se prioriza?",
          "o": [
            "Estiramientos intensos",
            "Masaje profundo inmediato",
            "Proteger, controlar el dolor y movilizar sin dolor de forma temprana",
            "Carga máxima"
          ],
          "c": 2,
          "e": "Una carga demasiado agresiva o demasiado tardía empeora el resultado."
        },
        {
          "q": "¿Qué ejercicio ayuda a prevenir lesiones de isquiotibiales?",
          "o": [
            "Solo reposo",
            "Solo estiramiento pasivo",
            "Solo ejercicios isométricos suaves",
            "Ejercicios excéntricos como el nórdico"
          ],
          "c": 3,
          "e": "Aumentan la resistencia del músculo a las fuerzas de elongación."
        },
        {
          "q": "Ante un hematoma intramuscular reciente conviene:",
          "o": [
            "Evitar el masaje profundo en los primeros días",
            "Masajear con fuerza",
            "Aplicar calor intenso",
            "Realizar saltos"
          ],
          "c": 0,
          "e": "El masaje agresivo puede aumentar el sangrado y favorecer la calcificación."
        },
        {
          "q": "¿Qué signo exige valoración médica por posible rotura completa?",
          "o": [
            "Rigidez leve",
            "Cansancio",
            "Defecto palpable en el músculo con equimosis extensa",
            "Dolor leve tras entrenar"
          ],
          "c": 2,
          "e": "Puede requerir estudio de imagen y valoración quirúrgica."
        }
      ]
    },
    {
      "id": "q-n41",
      "titulo": "Fascitis plantar y dolor de talón",
      "desc": "Carga, calzado y progresión",
      "preguntas": [
        {
          "q": "El dolor típico de la fascitis plantar aparece:",
          "o": [
            "Solo de noche en la espalda",
            "En el talón, sobre todo con los primeros pasos de la mañana",
            "En el hombro",
            "Solo al estar sentado"
          ],
          "c": 1,
          "e": "Mejora al calentar y vuelve tras reposo prolongado o mucha carga."
        },
        {
          "q": "La fascia plantar se origina en:",
          "o": [
            "El maléolo lateral",
            "La cabeza del peroné",
            "El tubérculo medial del calcáneo",
            "La rótula"
          ],
          "c": 2,
          "e": "Se inserta en la base de los dedos y sostiene el arco."
        },
        {
          "q": "¿Qué rigidez se asocia a este problema?",
          "o": [
            "Rigidez del hombro",
            "Rigidez cervical",
            "Rigidez de la mano",
            "Rigidez de gemelos y limitación de la dorsiflexión"
          ],
          "c": 3,
          "e": "El estiramiento de la pantorrilla y de la fascia suele formar parte del plan."
        },
        {
          "q": "¿Qué tratamiento tiene mejor respaldo?",
          "o": [
            "Educación, carga progresiva (elevaciones de talón), plantillas y calzado adecuado",
            "Reposo absoluto de meses",
            "Solo hielo",
            "Cirugía en todos los casos"
          ],
          "c": 0,
          "e": "La carga gradual adapta el tejido y reduce el dolor."
        },
        {
          "q": "Un espolón calcáneo visto en radiografía:",
          "o": [
            "Siempre explica el dolor",
            "Es una infección",
            "Puede estar presente sin dolor y no explica por sí solo los síntomas",
            "Solo aparece en niños"
          ],
          "c": 2,
          "e": "Muchas personas lo tienen sin molestias."
        },
        {
          "q": "Un factor de riesgo frecuente es:",
          "o": [
            "Caminar descalzo en la arena una vez",
            "Dormir con almohada alta",
            "Beber poca agua",
            "Aumento brusco de carga o calzado poco adecuado"
          ],
          "c": 3,
          "e": "También influyen el peso corporal y trabajos de pie prolongado."
        }
      ]
    },
    {
      "id": "q-n42",
      "titulo": "Rehabilitación vestibular",
      "desc": "Vértigo, maniobras y ejercicios",
      "preguntas": [
        {
          "q": "El vértigo posicional paroxístico benigno (VPPB) se caracteriza por:",
          "o": [
            "Vértigo breve con cambios de posición de la cabeza",
            "Vértigo continuo durante días sin cambios",
            "Pérdida de fuerza en un lado",
            "Dolor de rodilla"
          ],
          "c": 0,
          "e": "Se desencadena al acostarse, girarse en la cama o mirar hacia arriba."
        },
        {
          "q": "¿Qué maniobra diagnostica el VPPB del canal posterior?",
          "o": [
            "Prueba de Lachman",
            "Maniobra de Dix-Hallpike",
            "Prueba de Phalen",
            "Prueba de Adams"
          ],
          "c": 1,
          "e": "Se busca vértigo y nistagmo al colocar al paciente en decúbito con la cabeza girada."
        },
        {
          "q": "¿Qué maniobra terapéutica se usa en el VPPB posterior?",
          "o": [
            "Maniobra de Valsalva",
            "Maniobra de Heimlich",
            "Maniobra de Epley",
            "Maniobra de Spurling"
          ],
          "c": 2,
          "e": "Reposiciona los otolitos fuera del canal semicircular."
        },
        {
          "q": "Los ejercicios de habituación y estabilización de la mirada sirven para:",
          "o": [
            "Aumentar la fuerza de las manos",
            "Mejorar el equilibrio solo en niños",
            "Aliviar el dolor de espalda",
            "Favorecer la compensación vestibular central"
          ],
          "c": 3,
          "e": "Se hacen de forma gradual con movimientos que provocan síntomas leves."
        },
        {
          "q": "Un vértigo con dificultad para hablar, debilidad en un lado o visión doble requiere:",
          "o": [
            "Derivación urgente",
            "Ejercicios en casa",
            "Esperar una semana",
            "Solo reposo"
          ],
          "c": 0,
          "e": "Puede tratarse de un evento neurológico agudo."
        },
        {
          "q": "El nistagmo es:",
          "o": [
            "Un temblor de la mano",
            "Un movimiento ocular rítmico e involuntario",
            "Una contractura del cuello",
            "Un tipo de dolor"
          ],
          "c": 1,
          "e": "Su dirección y duración ayudan a identificar el origen del vértigo."
        }
      ]
    },
    {
      "id": "q-n43",
      "titulo": "Hernia discal y ciática",
      "desc": "Raíz nerviosa, banderas rojas y manejo",
      "preguntas": [
        {
          "q": "La ciática suele describirse como dolor:",
          "o": [
            "Que baja por la parte posterior de la pierna",
            "Solo en el cuello",
            "En el codo",
            "En la mandíbula"
          ],
          "c": 0,
          "e": "Se debe a la irritación de las raíces lumbosacras o del nervio ciático."
        },
        {
          "q": "¿Qué ocurre con la mayoría de las hernias discales sintomáticas?",
          "o": [
            "Siempre requieren cirugía",
            "Mejoran con manejo conservador en semanas o meses",
            "Empeoran con cualquier movimiento",
            "Nunca mejoran"
          ],
          "c": 1,
          "e": "Con educación, actividad progresiva y analgesia suelen resolverse."
        },
        {
          "q": "¿Cuál es una bandera roja que exige derivación urgente?",
          "o": [
            "Dolor al estar sentado",
            "Rigidez matutina",
            "Retención urinaria y anestesia en silla de montar",
            "Dolor leve al toser"
          ],
          "c": 2,
          "e": "Sugiere síndrome de cauda equina, una urgencia neuroquirúrgica."
        },
        {
          "q": "¿Qué posición o movimiento aumenta la presión sobre la parte posterior del disco?",
          "o": [
            "Caminar con calma",
            "Estar de pie con buena postura",
            "Nadar de espaldas",
            "Flexión lumbar mantenida con carga"
          ],
          "c": 3,
          "e": "Por eso se enseñan estrategias de carga y bisagra de cadera."
        },
        {
          "q": "Respecto al reposo en cama prolongado:",
          "o": [
            "No se recomienda; conviene mantener la actividad dentro de lo tolerable",
            "Se indica por varias semanas",
            "Es el tratamiento principal",
            "Es obligatorio"
          ],
          "c": 0,
          "e": "El reposo prolongado debilita y retrasa la recuperación."
        },
        {
          "q": "Una debilidad para elevar el pie y el dedo gordo sugiere afectación de la raíz:",
          "o": [
            "C5",
            "T4",
            "L5",
            "S4"
          ],
          "c": 2,
          "e": "L5 inerva los dorsiflexores del tobillo y el extensor largo del dedo gordo."
        }
      ]
    },
    {
      "id": "q-n44",
      "titulo": "Sarcopenia y fragilidad",
      "desc": "Fuerza, marcha y envejecimiento activo",
      "preguntas": [
        {
          "q": "La sarcopenia es:",
          "o": [
            "La pérdida de masa y fuerza muscular asociada al envejecimiento",
            "Un tipo de artritis",
            "Un trastorno del sueño",
            "Una enfermedad infecciosa"
          ],
          "c": 0,
          "e": "Aumenta el riesgo de caídas, discapacidad y hospitalización."
        },
        {
          "q": "¿Qué intervención tiene mejor evidencia?",
          "o": [
            "Reposo",
            "Entrenamiento de fuerza progresivo junto con una ingesta adecuada de proteína",
            "Solo caminar despacio",
            "Solo estiramientos"
          ],
          "c": 1,
          "e": "La fuerza es el estímulo más potente para ganar masa y función."
        },
        {
          "q": "¿Qué instrumento mide la fuerza de prensión de la mano?",
          "o": [
            "Goniómetro",
            "Espirómetro",
            "Dinamómetro",
            "Oxímetro"
          ],
          "c": 2,
          "e": "La fuerza de prensión se relaciona con la fuerza global y el pronóstico."
        },
        {
          "q": "Una velocidad de marcha baja (por ejemplo, menor de 0,8 m/s) sugiere:",
          "o": [
            "Mejor condición física",
            "Equilibrio normal",
            "Buena capacidad pulmonar",
            "Mayor riesgo de fragilidad y mala evolución"
          ],
          "c": 3,
          "e": "Es una medida sencilla y muy informativa."
        },
        {
          "q": "Un programa multicomponente para el adulto mayor incluye:",
          "o": [
            "Fuerza, equilibrio y ejercicio aeróbico",
            "Solo reposo",
            "Solo levantar mucho peso",
            "Solo ejercicios de cuello"
          ],
          "c": 0,
          "e": "Combinar componentes reduce caídas y mejora la autonomía."
        },
        {
          "q": "¿Cuál es un criterio de fragilidad de Fried?",
          "o": [
            "Buena memoria",
            "Peso estable",
            "Marcha lenta",
            "Alta actividad física"
          ],
          "c": 2,
          "e": "También incluye pérdida de peso, agotamiento, debilidad y baja actividad."
        }
      ]
    },
    {
      "id": "q-n45",
      "titulo": "Movilización temprana en cuidados intensivos",
      "desc": "Seguridad, criterios y progresión",
      "preguntas": [
        {
          "q": "¿Qué beneficio tiene la movilización temprana en la UCI?",
          "o": [
            "Aumenta la debilidad",
            "Reduce la debilidad adquirida y puede acortar la ventilación",
            "Prolonga la estancia",
            "No tiene efecto"
          ],
          "c": 1,
          "e": "Mejora la función física al alta."
        },
        {
          "q": "Antes de movilizar, ¿qué se verifica?",
          "o": [
            "La estabilidad hemodinámica y respiratoria, además de tubos, accesos y sedación",
            "Solo el peso",
            "Solo la hora",
            "Nada"
          ],
          "c": 0,
          "e": "La seguridad depende del estado del paciente y de los dispositivos conectados."
        },
        {
          "q": "¿Cuándo se debe suspender la sesión?",
          "o": [
            "Si hay aburrimiento",
            "Si el paciente pide agua",
            "Si hay caída de la saturación, arritmia, hipotensión o intolerancia marcada",
            "Nunca"
          ],
          "c": 2,
          "e": "Se retoma cuando el paciente se estabiliza."
        },
        {
          "q": "¿Qué escala valora la debilidad adquirida en la UCI?",
          "o": [
            "Escala de Borg",
            "Escala EVA",
            "Escala de Braden",
            "Escala MRC de suma"
          ],
          "c": 3,
          "e": "Suma la fuerza de varios grupos musculares clave."
        },
        {
          "q": "Un paciente que puede participar suele estar:",
          "o": [
            "Despierto y capaz de seguir órdenes sencillas",
            "Con sedación profunda",
            "En coma",
            "Con relajantes musculares"
          ],
          "c": 0,
          "e": "Las escalas de sedación, como RASS, ayudan a decidirlo."
        },
        {
          "q": "Un primer escalón de la progresión puede ser:",
          "o": [
            "Correr en cinta",
            "Posicionamiento y ejercicios pasivos o activos asistidos en cama",
            "Salir a caminar largas distancias",
            "Subir escaleras"
          ],
          "c": 1,
          "e": "Se avanza a sentarse, ponerse de pie y caminar según tolerancia."
        }
      ]
    },
    {
      "id": "q-n46",
      "titulo": "Fisioterapia en cuidados paliativos",
      "desc": "Confort, función y acompañamiento",
      "preguntas": [
        {
          "q": "¿Cuál es el objetivo central de la fisioterapia paliativa?",
          "o": [
            "Curar la enfermedad",
            "Mejorar la calidad de vida, el confort y la función posible",
            "Exigir máximo rendimiento",
            "Suspender toda actividad"
          ],
          "c": 1,
          "e": "Se adapta a lo que la persona quiere y puede hacer."
        },
        {
          "q": "¿Qué se prioriza al plantear metas?",
          "o": [
            "Las del terapeuta únicamente",
            "Las de los libros",
            "Las del paciente y su familia",
            "Las del equipo administrativo"
          ],
          "c": 2,
          "e": "La participación del paciente da sentido al tratamiento."
        },
        {
          "q": "Ante la disnea, ¿qué ayuda?",
          "o": [
            "Acostar plano",
            "Contener la respiración",
            "Hablar rápido",
            "Inclinarse hacia adelante, respirar con labios fruncidos y usar un ventilador"
          ],
          "c": 3,
          "e": "Disminuyen la sensación de falta de aire."
        },
        {
          "q": "¿Cuándo puede intervenir la fisioterapia paliativa?",
          "o": [
            "En cualquier etapa de la enfermedad avanzada",
            "Solo en los últimos minutos",
            "Solo antes del diagnóstico",
            "Nunca"
          ],
          "c": 0,
          "e": "No se reserva solo para el final de la vida."
        },
        {
          "q": "Para la fatiga se enseña:",
          "o": [
            "Hacer todo de una vez",
            "Evitar las pausas",
            "Conservar energía, priorizar actividades y descansar",
            "Dormir todo el día"
          ],
          "c": 2,
          "e": "Planificar y dosificar permite hacer lo más importante."
        },
        {
          "q": "En la comunicación con el paciente se debe:",
          "o": [
            "Imponer decisiones",
            "Escuchar, respetar su autonomía y explicar con claridad",
            "Evitar las preguntas",
            "Hablar solo con familiares"
          ],
          "c": 1,
          "e": "El respeto y la claridad generan confianza."
        }
      ]
    },
    {
      "id": "q-n47",
      "titulo": "Primeros auxilios y RCP en la consulta",
      "desc": "Reconocer y actuar ante una emergencia",
      "preguntas": [
        {
          "q": "Ante una persona inconsciente, lo primero es:",
          "o": [
            "Asegurar que la escena sea segura",
            "Moverla bruscamente",
            "Darle agua",
            "Sentarla"
          ],
          "c": 0,
          "e": "Se protege a quien auxilia antes de acercarse."
        },
        {
          "q": "¿Cuál es la frecuencia de las compresiones torácicas en un adulto?",
          "o": [
            "60 por minuto",
            "100 a 120 por minuto",
            "200 por minuto",
            "30 por minuto"
          ],
          "c": 1,
          "e": "Es un ritmo constante y sin pausas largas."
        },
        {
          "q": "¿Qué profundidad deben tener las compresiones en un adulto?",
          "o": [
            "1 a 2 cm",
            "2 a 3 cm",
            "Unos 5 a 6 cm",
            "10 cm"
          ],
          "c": 2,
          "e": "Permiten bombear sangre; se deja que el pecho vuelva a subir."
        },
        {
          "q": "El desfibrilador externo automático (DEA) debe:",
          "o": [
            "Guardarse sin usar",
            "Usarse solo por médicos",
            "Usarse solo con permiso por escrito",
            "Usarse lo antes posible siguiendo sus indicaciones de voz"
          ],
          "c": 3,
          "e": "Está diseñado para que lo use cualquier persona."
        },
        {
          "q": "Con un solo reanimador en un adulto, la relación entre compresiones y ventilaciones es:",
          "o": [
            "30 compresiones y 2 ventilaciones",
            "15 y 1",
            "5 y 5",
            "2 y 30"
          ],
          "c": 0,
          "e": "Si no se tiene capacitación en ventilaciones, se hacen compresiones continuas."
        },
        {
          "q": "Ante un atragantamiento con tos eficaz, ¿qué se hace?",
          "o": [
            "Golpear con fuerza de inmediato",
            "Animar a toser",
            "Dar agua",
            "Acostar a la persona"
          ],
          "c": 1,
          "e": "Si la obstrucción es completa y no puede toser ni hablar, se hacen compresiones abdominales."
        }
      ]
    },
    {
      "id": "q-n48",
      "titulo": "Lesiones del corredor",
      "desc": "Carga, técnica y diagnóstico en running",
      "preguntas": [
        {
          "q": "La lesión más frecuente en corredores es:",
          "o": [
            "El síndrome femoropatelar (dolor anterior de rodilla)",
            "La luxación de hombro",
            "La hernia inguinal",
            "La epicondilitis"
          ],
          "c": 0,
          "e": "Se relaciona con sobrecarga y control de cadera y rodilla."
        },
        {
          "q": "El síndrome de estrés tibial medial se conoce como:",
          "o": [
            "Codo de golfista",
            "Periostitis tibial o «shin splints»",
            "Dedo en gatillo",
            "Cuello rígido"
          ],
          "c": 1,
          "e": "Causa dolor a lo largo del borde medial de la tibia."
        },
        {
          "q": "El dolor en la cara lateral de la rodilla del corredor sugiere:",
          "o": [
            "Lesión del manguito",
            "Hernia discal",
            "Síndrome de la banda iliotibial",
            "Esguince de tobillo"
          ],
          "c": 2,
          "e": "Se agrava con kilómetros acumulados y cuestas."
        },
        {
          "q": "¿Cómo debe progresar la carga de entrenamiento?",
          "o": [
            "De golpe",
            "Duplicando cada semana",
            "Sin descanso",
            "De forma gradual, evitando aumentos bruscos de volumen o intensidad"
          ],
          "c": 3,
          "e": "Los cambios bruscos son una causa común de lesión."
        },
        {
          "q": "Aumentar ligeramente la cadencia (pasos por minuto) puede:",
          "o": [
            "Reducir la carga sobre algunas articulaciones",
            "Aumentar siempre el riesgo",
            "No cambiar nada",
            "Dañar los tendones"
          ],
          "c": 0,
          "e": "Un paso más corto y frecuente disminuye el impacto."
        },
        {
          "q": "Un dolor localizado que aumenta con la carga y también molesta en reposo o de noche puede ser:",
          "o": [
            "Una contractura",
            "Un calambre",
            "Una fractura por estrés",
            "Fatiga normal"
          ],
          "c": 2,
          "e": "Requiere descargar y valoración médica."
        }
      ]
    },
    {
      "id": "q-n49",
      "titulo": "Síndrome de dolor regional complejo",
      "desc": "Reconocimiento y rehabilitación",
      "preguntas": [
        {
          "q": "El SDRC se caracteriza por:",
          "o": [
            "Dolor desproporcionado con cambios de color, temperatura, edema o sudoración tras una lesión",
            "Dolor leve y pasajero",
            "Fuerza aumentada",
            "Solo rigidez matutina"
          ],
          "c": 0,
          "e": "El dolor excede lo esperado por la lesión inicial."
        },
        {
          "q": "¿Qué criterios se usan para el diagnóstico?",
          "o": [
            "Criterios de Wells",
            "Criterios de Budapest",
            "Criterios de Ottawa",
            "Criterios de Fried"
          ],
          "c": 1,
          "e": "Combinan síntomas y signos sensoriales, vasomotores, sudomotores y motores."
        },
        {
          "q": "¿Qué estrategias se emplean en la rehabilitación?",
          "o": [
            "Inmovilizar el miembro por meses",
            "Evitar tocar la zona siempre",
            "Movilización progresiva, desensibilización e imaginería motora graduada",
            "Solo reposo"
          ],
          "c": 2,
          "e": "Se busca recuperar el uso funcional de forma gradual."
        },
        {
          "q": "¿Qué conviene evitar?",
          "o": [
            "Educación",
            "Movimiento graduado",
            "Ejercicio suave",
            "La inmovilización prolongada"
          ],
          "c": 3,
          "e": "Favorece rigidez, atrofia y mayor sensibilización."
        },
        {
          "q": "La terapia de espejo se utiliza para:",
          "o": [
            "Reducir el dolor y reorganizar la representación cortical",
            "Aumentar la masa muscular",
            "Medir la presión",
            "Mejorar la visión"
          ],
          "c": 0,
          "e": "Se observa el movimiento del miembro sano reflejado."
        },
        {
          "q": "La educación sobre el dolor en este síndrome:",
          "o": [
            "Se omite",
            "Ayuda a entender el problema y a participar en el tratamiento",
            "Solo confunde",
            "Se deja para el final"
          ],
          "c": 1,
          "e": "Reduce el miedo al movimiento."
        }
      ]
    },
    {
      "id": "q-n50",
      "titulo": "Telerrehabilitación y educación al paciente",
      "desc": "Atención a distancia y adherencia",
      "preguntas": [
        {
          "q": "Una ventaja de la telerrehabilitación es:",
          "o": [
            "Sustituye siempre la atención presencial",
            "Aumenta el acceso para personas lejanas o con movilidad limitada",
            "No necesita conexión",
            "Evita la valoración"
          ],
          "c": 1,
          "e": "Reduce traslados y facilita el seguimiento."
        },
        {
          "q": "Antes de una sesión a distancia conviene comprobar:",
          "o": [
            "Solo el color de la ropa",
            "Nada",
            "Que el espacio sea seguro y que la conexión y la cámara funcionen",
            "Que haya música"
          ],
          "c": 2,
          "e": "Un entorno despejado previene accidentes."
        },
        {
          "q": "¿Qué ayuda a la adherencia al programa de ejercicio?",
          "o": [
            "Pautas largas y complejas",
            "Evitar el seguimiento",
            "No dar instrucciones escritas",
            "Programas sencillos, recordatorios y seguimiento"
          ],
          "c": 3,
          "e": "La adherencia depende de claridad y de apoyo continuo."
        },
        {
          "q": "Una limitación de la atención a distancia es:",
          "o": [
            "No permite la palpación ni ciertas pruebas manuales",
            "Es siempre más cara",
            "Nunca puede usarse",
            "No admite ejercicio"
          ],
          "c": 0,
          "e": "Se compensa con observación estructurada y pruebas funcionales."
        },
        {
          "q": "¿Qué técnica comprueba que el paciente entendió?",
          "o": [
            "Hablar más rápido",
            "Pedirle que explique con sus palabras lo que hará (teach-back)",
            "Repetir en voz alta",
            "Dar más folletos"
          ],
          "c": 1,
          "e": "Detecta dudas antes de que se conviertan en errores."
        },
        {
          "q": "¿Qué requisito de privacidad es importante?",
          "o": [
            "Grabar sin avisar",
            "Compartir las sesiones en redes",
            "Usar plataformas seguras y contar con el consentimiento",
            "Guardar datos en cualquier aplicación"
          ],
          "c": 2,
          "e": "Los datos de salud son sensibles y requieren protección."
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
    },
    {
      "id": "o-n01",
      "titulo": "Aplicación de compresa caliente",
      "desc": "Calor superficial seguro",
      "pasos": [
        "Revisar sensibilidad de la piel",
        "Colocar una toalla sobre la zona",
        "Aplicar la compresa caliente envuelta",
        "Vigilar la piel durante el tiempo indicado",
        "Retirar la compresa y revisar la piel"
      ]
    },
    {
      "id": "o-n02",
      "titulo": "Ultrasonido terapéutico",
      "desc": "Aplicación paso a paso",
      "pasos": [
        "Verificar indicación y contraindicaciones",
        "Colocar gel conductor sobre la zona",
        "Apoyar el cabezal sobre la piel",
        "Mover el cabezal en círculos lentos",
        "Retirar el gel y limpiar el cabezal"
      ]
    },
    {
      "id": "o-n03",
      "titulo": "Láser terapéutico",
      "desc": "Aplicación con protección ocular",
      "pasos": [
        "Explicar el procedimiento al paciente",
        "Colocar gafas de protección a todos",
        "Seleccionar los parámetros indicados",
        "Aplicar el láser sobre los puntos",
        "Registrar los parámetros aplicados"
      ]
    },
    {
      "id": "o-n04",
      "titulo": "Electroestimulación neuromuscular",
      "desc": "Colocación y progresión de intensidad",
      "pasos": [
        "Limpiar la piel donde irán los electrodos",
        "Colocar los electrodos sobre el músculo",
        "Conectar los cables y elegir parámetros",
        "Aumentar la intensidad gradualmente",
        "Retirar los electrodos y revisar la piel"
      ]
    },
    {
      "id": "o-n05",
      "titulo": "Desinfección de la camilla",
      "desc": "Limpieza entre pacientes",
      "pasos": [
        "Retirar la sábana y los desechos",
        "Limpiar la superficie con detergente",
        "Aplicar desinfectante sobre la superficie",
        "Respetar el tiempo de contacto",
        "Colocar una cubierta limpia"
      ]
    },
    {
      "id": "o-n06",
      "titulo": "Consentimiento informado",
      "desc": "Del proceso a la firma",
      "pasos": [
        "Explicar el procedimiento y su objetivo",
        "Informar riesgos y alternativas",
        "Resolver las dudas del paciente",
        "Obtener la firma del paciente",
        "Archivar el documento en el expediente"
      ]
    },
    {
      "id": "o-n07",
      "titulo": "Primera consulta",
      "desc": "De la bienvenida al plan",
      "pasos": [
        "Recibir al paciente y presentarse",
        "Realizar la entrevista clínica",
        "Explorar físicamente al paciente",
        "Establecer objetivos junto con el paciente",
        "Acordar plan y frecuencia de sesiones"
      ]
    },
    {
      "id": "o-n08",
      "titulo": "Signos vitales antes del ejercicio",
      "desc": "Chequeo previo de seguridad",
      "pasos": [
        "Pedir reposo sentado unos minutos",
        "Colocar el brazalete en el brazo",
        "Medir presión arterial y pulso",
        "Comparar con los límites de seguridad",
        "Autorizar o posponer el ejercicio"
      ]
    },
    {
      "id": "o-n09",
      "titulo": "Medición de fuerza con dinamómetro",
      "desc": "Prueba de fuerza estandarizada",
      "pasos": [
        "Explicar la prueba al paciente",
        "Posicionar al paciente según el protocolo",
        "Indicar una contracción máxima sostenida",
        "Leer el valor marcado",
        "Repetir y promediar los intentos"
      ]
    },
    {
      "id": "o-n10",
      "titulo": "Prueba de levantarse y caminar",
      "desc": "Aplicación del TUG",
      "pasos": [
        "Sentar al paciente con la espalda apoyada",
        "Dar la orden de inicio y cronometrar",
        "Observar cómo se levanta y camina tres metros",
        "Detener el cronómetro al sentarse de nuevo",
        "Registrar el tiempo y la calidad de marcha"
      ]
    },
    {
      "id": "o-n11",
      "titulo": "Transferencia de cama a silla de ruedas",
      "desc": "Movilización segura",
      "pasos": [
        "Colocar la silla junto a la cama",
        "Bloquear los frenos de la silla",
        "Sentar al paciente al borde de la cama",
        "Pivotar al paciente hacia la silla",
        "Acomodar al paciente y colocar reposapiés"
      ]
    },
    {
      "id": "o-n12",
      "titulo": "Colocación de ortesis de muñeca",
      "desc": "Ajuste correcto y seguro",
      "pasos": [
        "Revisar la piel de mano y muñeca",
        "Elegir la talla adecuada",
        "Colocar la muñeca en posición neutra",
        "Ajustar las correas sin comprimir",
        "Verificar comodidad y circulación"
      ]
    },
    {
      "id": "o-n13",
      "titulo": "Uso correcto del bastón",
      "desc": "Secuencia de marcha",
      "pasos": [
        "Ajustar la altura a nivel de la cadera",
        "Sostener el bastón del lado sano",
        "Adelantar el bastón primero",
        "Avanzar la pierna afectada",
        "Avanzar la pierna sana"
      ]
    },
    {
      "id": "o-n14",
      "titulo": "Ajuste de muletas",
      "desc": "Altura y empuñaduras",
      "pasos": [
        "Pedir al paciente pararse erguido con calzado",
        "Ajustar la altura de la muleta",
        "Ajustar la altura de las empuñaduras",
        "Verificar el codo flexionado unos treinta grados",
        "Probar la marcha y corregir"
      ]
    },
    {
      "id": "o-n15",
      "titulo": "Movilización pasiva de hombro",
      "desc": "Técnica suave y controlada",
      "pasos": [
        "Posicionar cómodamente al paciente",
        "Sostener el brazo con una mano",
        "Estabilizar la escápula con la otra mano",
        "Mover lentamente dentro del rango sin dolor",
        "Preguntar sensaciones y registrar el rango"
      ]
    },
    {
      "id": "o-n16",
      "titulo": "Ejercicio de puente de glúteos",
      "desc": "Ejecución correcta",
      "pasos": [
        "Acostar al paciente boca arriba",
        "Flexionar rodillas con pies apoyados",
        "Contraer abdomen y glúteos",
        "Elevar la pelvis lentamente",
        "Mantener unos segundos y descender"
      ]
    },
    {
      "id": "o-n17",
      "titulo": "Marcha en barras paralelas",
      "desc": "Entrenamiento inicial supervisado",
      "pasos": [
        "Ajustar la altura de las barras",
        "Colocar al paciente de pie entre ellas",
        "Indicar sujetar ambas barras",
        "Guiar pasos pequeños y controlados",
        "Permitir descanso y registrar la tolerancia"
      ]
    },
    {
      "id": "o-n18",
      "titulo": "Estiramiento de isquiotibiales",
      "desc": "Técnica pasiva en camilla",
      "pasos": [
        "Acostar al paciente boca arriba",
        "Flexionar cadera y rodilla",
        "Extender lentamente la rodilla",
        "Mantener el estiramiento sin dolor",
        "Regresar lentamente la pierna a la camilla"
      ]
    },
    {
      "id": "o-n19",
      "titulo": "Drenaje linfático básico",
      "desc": "Secuencia general de maniobras",
      "pasos": [
        "Posicionar cómodamente al paciente",
        "Estimular primero los ganglios proximales",
        "Trabajar el segmento proximal del miembro",
        "Trabajar el segmento distal hacia arriba",
        "Cerrar con los ganglios proximales"
      ]
    },
    {
      "id": "o-n20",
      "titulo": "Vendaje compresivo",
      "desc": "Aplicación distal a proximal",
      "pasos": [
        "Valorar la piel y la circulación",
        "Iniciar el vendaje en la zona distal",
        "Avanzar en espiral con traslape",
        "Terminar en la zona proximal",
        "Revisar color, calor y sensibilidad distal"
      ]
    },
    {
      "id": "o-n21",
      "titulo": "Aplicación de kinesiotape",
      "desc": "Preparación y colocación",
      "pasos": [
        "Limpiar y secar la piel",
        "Medir y cortar la tira",
        "Redondear las esquinas de la tira",
        "Pegar el ancla sin tensión",
        "Frotar para activar el adhesivo"
      ]
    },
    {
      "id": "o-n22",
      "titulo": "Marcha tras cirugía de cadera",
      "desc": "Primera deambulación supervisada",
      "pasos": [
        "Revisar las restricciones indicadas por el cirujano",
        "Sentar al paciente al borde de la cama",
        "Ponerlo de pie con apoyo",
        "Caminar pocos pasos con supervisión",
        "Registrar la tolerancia y los síntomas"
      ]
    },
    {
      "id": "o-n23",
      "titulo": "Programa de ejercicios en casa",
      "desc": "Entrega eficaz al paciente",
      "pasos": [
        "Definir los ejercicios según los objetivos",
        "Demostrar cada ejercicio",
        "Pedir al paciente que los repita",
        "Entregar instrucciones escritas",
        "Revisar la ejecución en la siguiente sesión"
      ]
    },
    {
      "id": "o-n24",
      "titulo": "Reevaluación de progreso",
      "desc": "Comparar contra la línea base",
      "pasos": [
        "Revisar los objetivos del plan inicial",
        "Repetir las mediciones iniciales",
        "Comparar los resultados con la línea base",
        "Comentar los avances con el paciente",
        "Ajustar el plan de tratamiento"
      ]
    },
    {
      "id": "o-n25",
      "titulo": "Derivación a otro profesional",
      "desc": "Referencia clínica ordenada",
      "pasos": [
        "Identificar signos fuera de nuestro alcance",
        "Explicar al paciente la necesidad",
        "Elaborar un resumen clínico",
        "Enviar la referencia al profesional",
        "Dar seguimiento a la respuesta"
      ]
    },
    {
      "id": "o-n26",
      "titulo": "Cierre de sesión y registro",
      "desc": "Terminar la consulta correctamente",
      "pasos": [
        "Retirar agentes físicos y equipo",
        "Revisar la piel y el estado del paciente",
        "Dar indicaciones para casa",
        "Registrar lo realizado y la respuesta",
        "Programar la siguiente cita"
      ]
    },
    {
      "id": "o-n27",
      "titulo": "Atención ante hipotensión",
      "desc": "Respuesta en consulta",
      "pasos": [
        "Detener el ejercicio",
        "Sentar o acostar al paciente",
        "Elevar las piernas si está acostado",
        "Medir presión arterial y pulso",
        "Avisar al médico si persiste"
      ]
    },
    {
      "id": "o-n28",
      "titulo": "Dolor torácico durante la sesión",
      "desc": "Activar protocolo de emergencia",
      "pasos": [
        "Suspender la actividad de inmediato",
        "Sentar al paciente en reposo",
        "Llamar a los servicios de emergencia",
        "Vigilar signos y acompañarlo",
        "Registrar el incidente"
      ]
    },
    {
      "id": "o-n29",
      "titulo": "Posicionamiento para prevenir úlceras",
      "desc": "Cuidado de la piel en cama",
      "pasos": [
        "Revisar la piel en zonas de presión",
        "Retirar arrugas de la sábana",
        "Girar al paciente en bloque",
        "Apoyar con almohadas",
        "Registrar el horario del cambio"
      ]
    },
    {
      "id": "o-n30",
      "titulo": "Ejercicios respiratorios posoperatorios",
      "desc": "Respiración profunda guiada",
      "pasos": [
        "Sentar al paciente semirreclinado",
        "Sostener la herida con una almohada",
        "Inspirar profundo por la nariz",
        "Mantener el aire unos segundos",
        "Exhalar lentamente por la boca"
      ]
    },
    {
      "id": "o-n31",
      "titulo": "Medición de la presión arterial",
      "desc": "Toma correcta en consulta",
      "pasos": [
        "Sentar al paciente en reposo unos 5 minutos",
        "Colocar el brazalete a la altura del corazón en el brazo descubierto",
        "Inflar hasta superar la presión estimada",
        "Desinflar despacio y registrar sistólica y diastólica",
        "Anotar el valor y el brazo usado en el expediente"
      ]
    },
    {
      "id": "o-n32",
      "titulo": "Uso del pulsioxímetro",
      "desc": "Saturación de oxígeno y pulso",
      "pasos": [
        "Limpiar el dedo y retirar el esmalte de uñas",
        "Colocar el sensor con la mano relajada",
        "Esperar a que la lectura se estabilice",
        "Registrar la saturación y el pulso",
        "Retirar el sensor y limpiarlo"
      ]
    },
    {
      "id": "o-n33",
      "titulo": "Giro del paciente en bloque",
      "desc": "Movilizar sin torcer la columna",
      "pasos": [
        "Explicar el procedimiento y pedir ayuda a otra persona",
        "Alinear cabeza, tronco y pelvis y cruzar los brazos sobre el pecho",
        "Girar a la vez, a una cuenta, manteniendo todo el cuerpo alineado",
        "Colocar almohadas entre las rodillas y en la espalda",
        "Comprobar la comodidad y registrar"
      ]
    },
    {
      "id": "o-n34",
      "titulo": "Sentar al paciente en la orilla de la cama",
      "desc": "Primer paso hacia la bipedestación",
      "pasos": [
        "Explicar y preguntar por mareo o síntomas",
        "Elevar el respaldo de la cama poco a poco",
        "Girar las piernas fuera de la cama mientras se incorpora el tronco",
        "Mantener sentado con los pies apoyados y vigilar el mareo",
        "Registrar cómo lo toleró"
      ]
    },
    {
      "id": "o-n35",
      "titulo": "Levantarse de una silla de forma segura",
      "desc": "Pasar de sentado a de pie",
      "pasos": [
        "Deslizarse al borde de la silla con los pies hacia atrás",
        "Inclinar el tronco hacia adelante",
        "Impulsarse con las piernas",
        "Extender cadera y rodillas hasta quedar erguido",
        "Estabilizar el equilibrio antes de caminar"
      ]
    },
    {
      "id": "o-n36",
      "titulo": "Subir un escalón con bastón",
      "desc": "Pierna sana primero al subir",
      "pasos": [
        "Colocarse de frente al escalón con el bastón del lado sano",
        "Subir primero la pierna sana",
        "Subir después el bastón y la pierna afectada",
        "Comprobar el equilibrio con los dos pies",
        "Repetir el patrón en el siguiente escalón"
      ]
    },
    {
      "id": "o-n37",
      "titulo": "Prueba de elevación de pierna recta",
      "desc": "Prueba de Lasègue",
      "pasos": [
        "Colocar al paciente acostado boca arriba y relajado",
        "Elevar la pierna con la rodilla extendida, despacio",
        "Detenerse cuando aparece el dolor y anotar el ángulo",
        "Bajar un poco y dorsiflexionar el pie para confirmar",
        "Registrar el ángulo y el sitio del dolor"
      ]
    },
    {
      "id": "o-n38",
      "titulo": "Medición de la longitud de las piernas",
      "desc": "Comparación entre ambos lados",
      "pasos": [
        "Acostar al paciente boca arriba con la pelvis nivelada",
        "Localizar la espina ilíaca anterosuperior",
        "Localizar el maléolo medial del tobillo",
        "Medir con la cinta de uno a otro punto",
        "Comparar ambos lados y registrar la diferencia"
      ]
    },
    {
      "id": "o-n39",
      "titulo": "Medición de perímetros para valorar edema",
      "desc": "Cinta métrica en el miembro",
      "pasos": [
        "Marcar puntos de referencia iguales en ambos miembros",
        "Colocar la cinta perpendicular al miembro, sin apretar",
        "Medir a la misma altura en cada lado",
        "Repetir en cada nivel marcado",
        "Comparar los valores y registrar la diferencia"
      ]
    },
    {
      "id": "o-n40",
      "titulo": "Colocación de una prótesis de miembro inferior",
      "desc": "Pasos para ponerse la prótesis",
      "pasos": [
        "Revisar la piel del muñón",
        "Colocar el liner o el calcetín de muñón sin arrugas",
        "Introducir el muñón en el encaje",
        "Asegurar el sistema de suspensión",
        "Ponerse de pie y comprobar el ajuste y la comodidad"
      ]
    },
    {
      "id": "o-n41",
      "titulo": "Vendaje del muñón",
      "desc": "Vendaje compresivo tras amputación",
      "pasos": [
        "Revisar la piel y retirar el vendaje anterior",
        "Iniciar en la parte distal con mayor tensión",
        "Subir en diagonal o en ocho disminuyendo la tensión",
        "Fijar sin arrugas ni anillos apretados",
        "Comprobar color, temperatura y sensibilidad"
      ]
    },
    {
      "id": "o-n42",
      "titulo": "Baños de contraste",
      "desc": "Alternar agua caliente y fría",
      "pasos": [
        "Verificar la sensibilidad y las contraindicaciones",
        "Preparar agua caliente y agua fría con termómetro",
        "Sumergir primero en agua caliente unos minutos",
        "Pasar al agua fría por menos tiempo",
        "Alternar el ciclo, secar y revisar la piel"
      ]
    },
    {
      "id": "o-n43",
      "titulo": "Preparación de la piel antes de electroterapia",
      "desc": "Contacto seguro de electrodos",
      "pasos": [
        "Revisar que la piel no tenga heridas ni irritación",
        "Retirar joyería y objetos metálicos",
        "Limpiar y secar la zona",
        "Recortar el vello si es necesario",
        "Colocar los electrodos con buen contacto"
      ]
    },
    {
      "id": "o-n44",
      "titulo": "Sesión de rehabilitación cardíaca",
      "desc": "Estructura de una sesión",
      "pasos": [
        "Registrar signos vitales y síntomas",
        "Calentamiento de baja intensidad",
        "Fase de ejercicio aeróbico a la intensidad prescrita",
        "Enfriamiento gradual",
        "Registrar signos vitales finales y la respuesta"
      ]
    },
    {
      "id": "o-n45",
      "titulo": "Prueba de caminata de 6 minutos",
      "desc": "Capacidad funcional",
      "pasos": [
        "Explicar la prueba y registrar signos vitales en reposo",
        "Pedir que camine lo más lejos posible a su ritmo durante 6 minutos",
        "Dar ánimo con frases estándar cada minuto",
        "Detener la prueba a los 6 minutos y medir la distancia",
        "Registrar signos vitales, disnea y fatiga finales"
      ]
    },
    {
      "id": "o-n46",
      "titulo": "Técnica de tos asistida",
      "desc": "Ayudar a eliminar secreciones",
      "pasos": [
        "Sentar al paciente erguido y explicar la técnica",
        "Pedir una inspiración profunda",
        "Colocar las manos sobre el abdomen o la parte baja del tórax",
        "Al toser, aplicar presión hacia adentro y arriba",
        "Dejar descansar y revisar las secreciones"
      ]
    },
    {
      "id": "o-n47",
      "titulo": "Drenaje postural",
      "desc": "Higiene bronquial",
      "pasos": [
        "Identificar el segmento afectado por auscultación",
        "Colocar la posición que favorece su drenaje",
        "Mantenerla con respiración tranquila",
        "Aplicar percusión o vibración si está indicado",
        "Pedir tos para eliminar secreciones y registrar"
      ]
    },
    {
      "id": "o-n48",
      "titulo": "Hipoglucemia durante la sesión",
      "desc": "Qué hacer si baja la glucosa",
      "pasos": [
        "Reconocer temblor, sudor frío o confusión",
        "Suspender el ejercicio y sentar al paciente",
        "Dar carbohidrato de acción rápida si está consciente",
        "Volver a medir la glucosa a los 15 minutos",
        "Registrar y avisar al médico"
      ]
    },
    {
      "id": "o-n49",
      "titulo": "Reanimación cardiopulmonar básica en adultos",
      "desc": "Secuencia inicial",
      "pasos": [
        "Verificar que la escena sea segura",
        "Comprobar la respuesta y la respiración",
        "Pedir ayuda, llamar a emergencias y traer el DEA",
        "Iniciar compresiones torácicas de 100 a 120 por minuto",
        "Usar el DEA en cuanto esté disponible"
      ]
    },
    {
      "id": "o-n50",
      "titulo": "Crisis convulsiva durante la sesión",
      "desc": "Actuar con calma",
      "pasos": [
        "Mantener la calma y anotar la hora de inicio",
        "Retirar objetos cercanos y proteger la cabeza",
        "No sujetar a la persona ni introducir nada en la boca",
        "Al terminar, colocar de lado en posición de seguridad",
        "Vigilar la respiración, avisar y registrar"
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
    ],
    [
      "Cadena cinética abierta",
      "Ejercicio en el que el segmento distal se mueve libremente en el espacio, como la extensión de rodilla sentado."
    ],
    [
      "Banderas amarillas",
      "Factores psicosociales, como miedo o catastrofización, que aumentan el riesgo de cronificación del dolor y de discapacidad."
    ],
    [
      "Prueba de Lasègue",
      "Elevación pasiva de la pierna extendida con el paciente en decúbito supino; reproduce dolor radicular si hay irritación neural."
    ],
    [
      "Diatermia",
      "Agente físico que genera calor en los tejidos profundos mediante corrientes de alta frecuencia."
    ],
    [
      "Sinergia muscular",
      "Patrón de activación conjunta de varios músculos que actúan de forma coordinada para realizar un movimiento."
    ],
    [
      "Capsulitis adhesiva",
      "Rigidez dolorosa del hombro por engrosamiento de la cápsula articular, con limitación marcada del movimiento activo y pasivo."
    ],
    [
      "Pliometría",
      "Ejercicio de saltos o rebotes que aprovecha el ciclo de estiramiento y acortamiento muscular para desarrollar potencia."
    ],
    [
      "Sensibilización central",
      "Aumento de la respuesta de las neuronas del sistema nervioso central a estímulos dolorosos o no dolorosos."
    ],
    [
      "Alodinia",
      "Dolor provocado por un estímulo que normalmente no produce dolor, como el roce ligero."
    ],
    [
      "Hiperalgesia",
      "Respuesta de dolor aumentada ante un estímulo que normalmente es doloroso."
    ],
    [
      "Disnea",
      "Sensación subjetiva de falta de aire o dificultad para respirar."
    ],
    [
      "Capacidad vital",
      "Volumen máximo de aire que se puede expulsar tras una inspiración máxima."
    ],
    [
      "Consentimiento informado",
      "Aceptación voluntaria del paciente a un procedimiento tras recibir información clara sobre sus beneficios y riesgos."
    ],
    [
      "Reflejo miotático",
      "Contracción muscular involuntaria en respuesta al estiramiento rápido del músculo, como el reflejo rotuliano."
    ],
    [
      "Contractura muscular",
      "Acortamiento o contracción sostenida e involuntaria de un músculo que limita su extensibilidad."
    ],
    [
      "Hipertonía",
      "Aumento del tono muscular en reposo, con mayor resistencia al movimiento pasivo."
    ],
    [
      "Hipotonía",
      "Disminución del tono muscular, con menor resistencia al movimiento pasivo y aspecto flácido."
    ],
    [
      "Clonus",
      "Serie rítmica de contracciones involuntarias que aparece al estirar bruscamente un músculo espástico."
    ],
    [
      "Disdiadococinesia",
      "Dificultad para realizar movimientos alternos rápidos, como pronar y supinar el antebrazo, típica de lesión cerebelosa."
    ],
    [
      "Dismetría",
      "Incapacidad para calcular la distancia o la fuerza de un movimiento, por lo que se sobrepasa o no se alcanza el objetivo."
    ],
    [
      "Bursitis",
      "Inflamación de una bolsa sinovial, estructura que reduce la fricción entre tendones, músculos y hueso."
    ],
    [
      "Síndrome del túnel carpiano",
      "Compresión del nervio mediano en la muñeca que produce hormigueo, dolor y debilidad en la mano."
    ],
    [
      "Valgo de rodilla",
      "Alineación en la que las rodillas se desplazan hacia la línea media del cuerpo."
    ],
    [
      "Escoliosis",
      "Desviación lateral de la columna vertebral acompañada de rotación de las vértebras."
    ],
    [
      "Fatiga muscular",
      "Disminución transitoria de la capacidad del músculo para generar fuerza tras una actividad sostenida."
    ],
    [
      "Umbral del dolor",
      "Intensidad mínima de un estímulo a partir de la cual la persona lo percibe como doloroso."
    ],
    [
      "Periodización",
      "Planificación del entrenamiento en fases con variaciones de volumen e intensidad para optimizar la adaptación."
    ],
    [
      "Frecuencia cardíaca de reserva",
      "Diferencia entre la frecuencia cardíaca máxima y la de reposo, usada para calcular zonas de intensidad."
    ],
    [
      "Úlcera por presión",
      "Daño en piel y tejidos causado por presión sostenida, frecuente sobre prominencias óseas en personas encamadas."
    ],
    [
      "Signo de Trendelenburg",
      "Caída de la pelvis del lado opuesto al apoyo durante la marcha, por debilidad del glúteo medio."
    ]
  ]
};
