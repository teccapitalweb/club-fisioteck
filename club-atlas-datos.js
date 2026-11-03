/* Club FisioTeck — base de datos del Atlas muscular (60 músculos). Cada ficha se contrastó con al menos dos páginas de anatomía consultadas en línea (Wikipedia en inglés y en español, Kenhub,
   TeachMeAnatomy); las discrepancias entre fuentes quedan en el campo "nota". NO sustituye un tratado: antes de usarlo como referencia clínica, un profesional debe contrastarlo con Gray's Anatomy,
   Moore, Netter o Kendall. Campos: id, nombre, region, vistas, origen, insercion, accion, inervacion, palpacion, funcion, condiciones, ejercicios, fuentes, verificacion, nota. */
window.FT_ATLAS = [
 {
  "id": "esternocleidomastoideo",
  "nombre": "Esternocleidomastoideo",
  "region": "cabeza-cuello",
  "vistas": [
   "lateral",
   "anterior"
  ],
  "origen": "Manubrio del esternón (cabeza esternal) y tercio medial de la clavícula (cabeza clavicular).",
  "insercion": "Apófisis mastoides y línea nucal superior del occipital.",
  "accion": "Unilateral: inclinación ipsilateral y rotación contralateral de la cabeza. Bilateral: flexión cervical inferior y extensión de la cabeza (atlantooccipital).",
  "inervacion": "Nervio accesorio (XI) y ramas ventrales de C2-C3.",
  "palpacion": "Girar la cabeza al lado contrario contra resistencia leve; se palpa como cordón desde la mastoides al esternón.",
  "funcion": "Orienta la cabeza y es accesorio de la inspiración forzada; suele acortarse en postura de cabeza adelantada.",
  "condiciones": [
   "Tortícolis muscular congénita",
   "Síndrome de latigazo cervical",
   "Puntos gatillo miofasciales",
   "Cefalea cervicogénica"
  ],
  "ejercicios": [
   "Estiramiento en inclinación contralateral con rotación ipsilateral",
   "Flexión craneocervical (chin tuck) en supino",
   "Isométricos de rotación"
  ],
  "fuentes": [
   "Wikipedia (EN): Sternocleidomastoid muscle — https://en.wikipedia.org/wiki/Sternocleidomastoid_muscle",
   "Kenhub: Sternocleidomastoid muscle: Anatomy and functions — https://www.kenhub.com/en/library/anatomy/sternocleidomastoid-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Origen, inserción e inervación coinciden. Se precisó la acción bilateral según Kenhub (flexiona la columna cervical inferior y extiende la cabeza)."
 },
 {
  "id": "escalenos",
  "nombre": "Escalenos (anterior, medio y posterior)",
  "region": "cabeza-cuello",
  "vistas": [
   "lateral",
   "anterior"
  ],
  "origen": "Anterior: tubérculos anteriores de C3-C6; medio: tubérculos posteriores de C2-C7; posterior: tubérculos posteriores de C4-C6.",
  "insercion": "Primera costilla (anterior y medio) y segunda costilla (posterior).",
  "accion": "Flexión e inclinación lateral cervical; elevan las dos primeras costillas en inspiración.",
  "inervacion": "Ramas ventrales cervicales: anterior C4-C6, medio C3-C8, posterior C6-C8.",
  "palpacion": "En el triángulo posterior del cuello, detrás del ECM, durante una inspiración profunda.",
  "funcion": "Estabilizan el cuello y son músculos accesorios de la respiración, sobrecargados en respiración apical.",
  "condiciones": [
   "Síndrome del desfiladero torácico",
   "Puntos gatillo miofasciales",
   "Disfunción respiratoria con uso excesivo de accesorios",
   "Cervicalgia"
  ],
  "ejercicios": [
   "Estiramiento lateral del cuello con depresión de hombro",
   "Respiración diafragmática",
   "Isométricos de inclinación lateral"
  ],
  "fuentes": [
   "Wikipedia (EN): Scalene muscles — https://en.wikipedia.org/wiki/Scalene_muscles",
   "Kenhub: Scalene muscles: Innervation, function, action, location — https://www.kenhub.com/en/library/anatomy/scalene-muscles"
  ],
  "verificacion": "dos fuentes",
  "nota": "Los niveles exactos varían entre fuentes (p. ej. escaleno posterior C4-C6 o C5-C7; inervación anterior C5-C6 en Wikipedia y C4-C6 en Kenhub; el medio también nace desde C1-C2 según Kenhub). Se desglosó por músculo."
 },
 {
  "id": "masetero",
  "nombre": "Masetero",
  "region": "cabeza-cuello",
  "vistas": [
   "lateral"
  ],
  "origen": "Arco cigomático (borde inferior y cara medial) y proceso maxilar del hueso cigomático.",
  "insercion": "Ángulo y cara lateral de la rama de la mandíbula.",
  "accion": "Elevación de la mandíbula (cierre bucal); fibras superficiales ayudan a la protrusión y profundas a la retrusión.",
  "inervacion": "Nervio masetérico, rama de V3 (mandibular, trigémino).",
  "palpacion": "Apretar los dientes y palpar sobre la rama mandibular, por delante de la ATM.",
  "funcion": "Principal músculo de la fuerza masticatoria; frecuente en bruxismo y dolor orofacial.",
  "condiciones": [
   "Trastorno temporomandibular miógeno",
   "Bruxismo",
   "Hipertrofia maseterina",
   "Puntos gatillo miofasciales"
  ],
  "ejercicios": [
   "Relajación y masaje intraoral/extraoral",
   "Apertura bucal controlada con espejo",
   "Estiramiento pasivo de apertura"
  ],
  "fuentes": [
   "Wikipedia (EN): Masseter muscle — https://en.wikipedia.org/wiki/Masseter_muscle",
   "Kenhub: Masseter muscle: Anatomy, origin, insertion, function — https://www.kenhub.com/en/library/anatomy/masseter-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Wikipedia y Kenhub listan elevación y protrusión; la retrusión de fibras profundas es descripción clásica no confirmada en estas páginas."
 },
 {
  "id": "temporal",
  "nombre": "Temporal",
  "region": "cabeza-cuello",
  "vistas": [
   "lateral"
  ],
  "origen": "Fosa temporal y fascia temporal.",
  "insercion": "Apófisis coronoides y borde anterior de la rama mandibular.",
  "accion": "Elevación de la mandíbula; fibras posteriores la retruyen.",
  "inervacion": "Nervios temporales profundos, rama de V3 (trigémino).",
  "palpacion": "Apretar los dientes y palpar sobre la sien, encima y por detrás del ojo.",
  "funcion": "Cierra y estabiliza la mandíbula; su sobrecarga contribuye a cefaleas tensionales.",
  "condiciones": [
   "Cefalea tensional",
   "Trastorno temporomandibular",
   "Bruxismo",
   "Puntos gatillo miofasciales"
  ],
  "ejercicios": [
   "Autoliberación miofascial temporal",
   "Apertura bucal controlada",
   "Ejercicios de postura mandibular en reposo"
  ],
  "fuentes": [
   "Wikipedia (EN): Temporalis muscle — https://en.wikipedia.org/wiki/Temporalis_muscle",
   "Kenhub: Temporalis: Origin, insertion, innervation, function — https://www.kenhub.com/en/library/anatomy/temporalis-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": ""
 },
 {
  "id": "pterigoideo-lateral",
  "nombre": "Pterigoideo lateral",
  "region": "cabeza-cuello",
  "vistas": [
   "lateral"
  ],
  "origen": "Ala mayor del esfenoides (cabeza superior) y cara lateral de la lámina pterigoidea lateral (cabeza inferior).",
  "insercion": "Cuello del cóndilo mandibular (fóvea pterigoidea), cápsula y disco articular de la ATM.",
  "accion": "Protrusión y apertura de la mandíbula; movimiento lateral contralateral.",
  "inervacion": "Nervio pterigoideo lateral, rama de V3 (trigémino).",
  "palpacion": "Poco accesible; intraoral detrás del último molar superior, con técnica cuidadosa.",
  "funcion": "Guía el disco articular de la ATM; su disfunción se asocia a chasquidos.",
  "condiciones": [
   "Desplazamiento discal de la ATM",
   "Trastorno temporomandibular",
   "Dolor orofacial miofascial"
  ],
  "ejercicios": [
   "Apertura y cierre bucal con guía en línea media",
   "Desviaciones laterales controladas",
   "Estiramiento suave de apertura"
  ],
  "fuentes": [
   "Wikipedia (EN): Lateral pterygoid muscle — https://en.wikipedia.org/wiki/Lateral_pterygoid_muscle",
   "Kenhub: Lateral pterygoid: Origin, insertion and function — https://www.kenhub.com/en/library/anatomy/lateral-pterygoid-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "La palpación intraoral del pterigoideo lateral es de fiabilidad discutida en la literatura clínica."
 },
 {
  "id": "esplenio-cabeza",
  "nombre": "Esplenio de la cabeza",
  "region": "cabeza-cuello",
  "vistas": [
   "posterior"
  ],
  "origen": "Mitad inferior del ligamento nucal y apófisis espinosas de C7-T3.",
  "insercion": "Apófisis mastoides y línea nucal superior lateral.",
  "accion": "Extensión de cabeza y cuello; inclinación y rotación ipsilateral.",
  "inervacion": "Ramas dorsales de nervios cervicales medios (C2-C4; según la fuente C2-C3 o C3-C4).",
  "palpacion": "Bajo el trapecio superior, lateral a la musculatura paravertebral cervical en extensión resistida.",
  "funcion": "Mantiene la cabeza erguida; se sobrecarga con postura prolongada de cabeza adelantada.",
  "condiciones": [
   "Cervicalgia mecánica",
   "Cefalea cervicogénica",
   "Puntos gatillo miofasciales"
  ],
  "ejercicios": [
   "Extensión craneocervical isométrica",
   "Estiramiento en flexión con rotación contralateral",
   "Retracción cervical"
  ],
  "fuentes": [
   "Wikipedia (EN): Splenius capitis muscle — https://en.wikipedia.org/wiki/Splenius_capitis_muscle",
   "Kenhub: Splenius capitis: Origin, insertion, actions, innervation — https://www.kenhub.com/en/library/anatomy/splenius-capitis-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Discrepancia en inervación: Wikipedia indica C3-C4, Kenhub C2-C3. Origen corregido de T3/T4 a T3 (ambas fuentes)."
 },
 {
  "id": "suboccipitales",
  "nombre": "Suboccipitales (recto posterior mayor y menor, oblicuos)",
  "region": "cabeza-cuello",
  "vistas": [
   "posterior"
  ],
  "origen": "Apófisis espinosa de C2, arco posterior del atlas (recto menor) y apófisis transversa de C1 (oblicuo superior).",
  "insercion": "Occipital (línea nucal inferior y entre líneas nucales) y apófisis transversa del atlas (oblicuo inferior).",
  "accion": "Extensión de la cabeza y rotación ipsilateral; oblicuo superior: extensión e inclinación lateral; oblicuo inferior: rotación de C1.",
  "inervacion": "Nervio suboccipital (rama dorsal de C1).",
  "palpacion": "Profundos bajo el occipucio; se palpan a través del trapecio y semiespinoso con presión sostenida.",
  "funcion": "Control fino de la posición de la cabeza, rico en husos musculares; sobrecarga en cefaleas.",
  "condiciones": [
   "Cefalea cervicogénica",
   "Cefalea tensional",
   "Disfunción suboccipital"
  ],
  "ejercicios": [
   "Liberación suboccipital con pelotas",
   "Flexión craneocervical (chin tuck)",
   "Estiramiento en flexión cervical suave"
  ],
  "fuentes": [
   "Wikipedia (EN): Suboccipital muscles — https://en.wikipedia.org/wiki/Suboccipital_muscles",
   "Kenhub: Suboccipital muscles: Anatomy — https://www.kenhub.com/en/library/anatomy/suboccipital-muscles"
  ],
  "verificacion": "dos fuentes",
  "nota": "Wikipedia no describe acciones; las acciones provienen de Kenhub (una sola fuente para ese campo)."
 },
 {
  "id": "largo-cuello",
  "nombre": "Largo del cuello",
  "region": "cabeza-cuello",
  "vistas": [
   "anterior"
  ],
  "origen": "Cuerpos y apófisis transversas de C3-C5 y T1-T3 (porciones vertical y oblicuas).",
  "insercion": "Tubérculo anterior del atlas, cuerpos de C2-C4 y apófisis transversas de C5-C6.",
  "accion": "Flexión cervical bilateral; unilateral: inclinación ipsilateral y rotación contralateral; estabiliza la columna cervical anterior.",
  "inervacion": "Ramas ventrales de C2-C6.",
  "palpacion": "No palpable de forma directa; se evalúa mediante la prueba de flexión craneocervical.",
  "funcion": "Estabilizador profundo del cuello, a menudo debilitado en dolor cervical crónico.",
  "condiciones": [
   "Cervicalgia crónica",
   "Latigazo cervical",
   "Cefalea cervicogénica"
  ],
  "ejercicios": [
   "Flexión craneocervical con biofeedback de presión",
   "Chin tuck en supino",
   "Control motor cervical profundo"
  ],
  "fuentes": [
   "Wikipedia (EN): Longus colli muscle — https://en.wikipedia.org/wiki/Longus_colli_muscle",
   "Kenhub: Longus colli muscle: Origin, insertion, actions — https://www.kenhub.com/en/library/anatomy/longus-colli-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Las fuentes describen los puntos de unión por porciones con pequeñas diferencias de nivel (el origen inferior es T1-T3 en Kenhub, T1-T3 en Wikipedia)."
 },
 {
  "id": "trapecio",
  "nombre": "Trapecio",
  "region": "hombro",
  "vistas": [
   "posterior",
   "lateral"
  ],
  "origen": "Línea nucal superior (tercio medial), protuberancia occipital externa, ligamento nucal, apófisis espinosas de C7-T12.",
  "insercion": "Tercio lateral de la clavícula, acromion y espina de la escápula.",
  "accion": "Superior: elevación y rotación superior; medio: retracción; inferior: depresión y rotación superior escapular.",
  "inervacion": "Nervio accesorio (XI) motor; ramas de C3-C4 (plexo cervical) con aporte propioceptivo y sensitivo.",
  "palpacion": "Elevar los hombros (superior), retraer la escápula (medio), extender el brazo en prono (inferior).",
  "funcion": "Estabiliza y posiciona la escápula; el trapecio inferior suele estar débil y el superior hiperactivo.",
  "condiciones": [
   "Puntos gatillo miofasciales",
   "Discinesia escapular",
   "Parálisis del accesorio (escápula caída)",
   "Cervicalgia"
  ],
  "ejercicios": [
   "Elevación en Y/T/W en prono",
   "Encogimientos de hombros con carga",
   "Estiramiento del trapecio superior"
  ],
  "fuentes": [
   "Wikipedia (EN): Trapezius — https://en.wikipedia.org/wiki/Trapezius",
   "Kenhub: Trapezius muscle: Anatomy, origins, insertions, actions — https://www.kenhub.com/en/library/anatomy/trapezius-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Discrepancia: Kenhub da a C3-C4 función motora y sensitiva, Wikipedia en el texto solo sensitiva; se redactó como aporte propioceptivo/sensitivo. Origen de fibras medias: T1-T4 (Kenhub) o C7-T3 en otros textos."
 },
 {
  "id": "elevador-escapula",
  "nombre": "Elevador de la escápula",
  "region": "hombro",
  "vistas": [
   "posterior",
   "lateral"
  ],
  "origen": "Tubérculos posteriores de las apófisis transversas de C1-C4.",
  "insercion": "Ángulo superior y borde medial superior de la escápula.",
  "accion": "Elevación de la escápula y rotación inferior; inclinación cervical ipsilateral.",
  "inervacion": "Nervio dorsal de la escápula (C5) y ramas de C3-C4.",
  "palpacion": "Sobre el ángulo superior de la escápula, profundo al trapecio superior, al elevar el hombro.",
  "funcion": "Eleva la escápula; frecuente origen de dolor en la unión cervicoescapular.",
  "condiciones": [
   "Síndrome del elevador de la escápula",
   "Cervicalgia miofascial",
   "Escápula de resorte (snapping scapula)"
  ],
  "ejercicios": [
   "Estiramiento en flexión y rotación contralateral del cuello",
   "Retracción escapular con remo",
   "Liberación miofascial del ángulo superior"
  ],
  "fuentes": [
   "Wikipedia (EN): Levator scapulae muscle — https://en.wikipedia.org/wiki/Levator_scapulae_muscle",
   "Kenhub: Levator scapulae: Origin, insertion, innervation, action — https://www.kenhub.com/en/library/anatomy/levator-scapulae-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "La contribución del nervio dorsal de la escápula es frecuente pero variable."
 },
 {
  "id": "romboides",
  "nombre": "Romboides (mayor y menor)",
  "region": "hombro",
  "vistas": [
   "posterior"
  ],
  "origen": "Apófisis espinosas de C7-T1 (menor) y T2-T5 (mayor).",
  "insercion": "Borde medial de la escápula, desde la espina hasta el ángulo inferior.",
  "accion": "Retracción, elevación y rotación inferior de la escápula.",
  "inervacion": "Nervio dorsal de la escápula (C4-C5).",
  "palpacion": "Colocar la mano en la cadera y empujar atrás contra resistencia; se palpa entre escápula y columna.",
  "funcion": "Fija la escápula contra la pared torácica; débil en postura cifótica.",
  "condiciones": [
   "Dolor interescapular",
   "Escápula alada por debilidad",
   "Discinesia escapular",
   "Atrapamiento del nervio dorsal de la escápula"
  ],
  "ejercicios": [
   "Remo con banda elástica",
   "Retracción escapular en prono",
   "Estiramiento de protracción cruzada"
  ],
  "fuentes": [
   "Wikipedia (EN): Rhomboid muscles — https://en.wikipedia.org/wiki/Rhomboid_muscles",
   "Kenhub: Rhomboids: Origin, insertion, innervation and function — https://www.kenhub.com/en/library/anatomy/rhomboid-muscles"
  ],
  "verificacion": "dos fuentes",
  "nota": "Wikipedia no indica las raíces; Kenhub da C4-C5 (otros textos C5). El menor se inserta en la raíz de la espina de la escápula."
 },
 {
  "id": "serrato-anterior",
  "nombre": "Serrato anterior",
  "region": "hombro",
  "vistas": [
   "lateral"
  ],
  "origen": "Caras externas de las costillas 1-8/9.",
  "insercion": "Borde medial de la escápula (cara costal).",
  "accion": "Protracción, rotación superior y fijación de la escápula al tórax.",
  "inervacion": "Nervio torácico largo (C5-C7).",
  "palpacion": "En la pared costal lateral, bajo la axila, durante un empuje o flexión de brazos.",
  "funcion": "Mantiene la escápula pegada al tórax; esencial en la elevación del brazo sobre la cabeza.",
  "condiciones": [
   "Escápula alada (lesión del torácico largo)",
   "Síndrome subacromial por discinesia",
   "Atrapamiento neural"
  ],
  "ejercicios": [
   "Push-up plus",
   "Pull-over con banda / wall slide",
   "Press diagonal en supino con protracción"
  ],
  "fuentes": [
   "Wikipedia (EN): Serratus anterior muscle — https://en.wikipedia.org/wiki/Serratus_anterior_muscle",
   "Kenhub: Serratus anterior muscle: Origin, insertion and action — https://www.kenhub.com/en/library/anatomy/serratus-anterior-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": ""
 },
 {
  "id": "pectoral-mayor",
  "nombre": "Pectoral mayor",
  "region": "hombro",
  "vistas": [
   "anterior"
  ],
  "origen": "Mitad medial de la clavícula, esternón, cartílagos costales 1-6 y aponeurosis del oblicuo externo.",
  "insercion": "Labio lateral del surco intertubercular del húmero.",
  "accion": "Aducción, rotación interna y flexión (clavicular) / extensión desde flexión (esternal) del brazo.",
  "inervacion": "Nervios pectorales lateral (C5-C7) y medial (C8-T1).",
  "palpacion": "Aducción horizontal contra resistencia; se palpa en la pared torácica anterior y el pliegue axilar anterior.",
  "funcion": "Potente aductor y rotador interno; su acortamiento contribuye a hombros protruidos.",
  "condiciones": [
   "Rotura del pectoral mayor",
   "Acortamiento por postura",
   "Síndrome de Poland (agenesia)",
   "Dolor miofascial"
  ],
  "ejercicios": [
   "Estiramiento en marco de puerta",
   "Press de banca/flexiones",
   "Aperturas con mancuernas"
  ],
  "fuentes": [
   "Wikipedia (EN): Pectoralis major — https://en.wikipedia.org/wiki/Pectoralis_major",
   "Wikipedia (ES): Músculo pectoral mayor — https://es.wikipedia.org/wiki/M%C3%BAsculo_pectoral_mayor",
   "TeachMeAnatomy: Muscles of the Pectoral Region — https://teachmeanatomy.info/upper-limb/muscles/pectoral-region/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Raíces de los nervios pectorales difieren entre fuentes: Wikipedia EN da C5-C6 (clavicular) y C7-T1 (esternocostal); Wikipedia ES da lateral C5-C7 y medial C8-T1. Se usó la formulación clásica."
 },
 {
  "id": "deltoides",
  "nombre": "Deltoides",
  "region": "hombro",
  "vistas": [
   "lateral",
   "anterior",
   "posterior"
  ],
  "origen": "Tercio lateral de la clavícula, acromion y espina de la escápula.",
  "insercion": "Tuberosidad deltoidea del húmero.",
  "accion": "Abducción (fibras medias), flexión (anteriores) y extensión (posteriores) del hombro.",
  "inervacion": "Nervio axilar (C5-C6).",
  "palpacion": "Abducir el brazo contra resistencia; tres porciones visibles sobre el hombro.",
  "funcion": "Principal abductor; ofrece el contorno redondeado del hombro y estabiliza la cabeza humeral.",
  "condiciones": [
   "Lesión del nervio axilar (luxación)",
   "Contusión deltoidea",
   "Atrofia por inactividad",
   "Tendinopatía del manguito asociada"
  ],
  "ejercicios": [
   "Elevaciones laterales",
   "Press militar",
   "Elevaciones frontales/posteriores"
  ],
  "fuentes": [
   "Wikipedia (EN): Deltoid muscle — https://en.wikipedia.org/wiki/Deltoid_muscle",
   "Wikipedia (ES): Músculo deltoides — https://es.wikipedia.org/wiki/M%C3%BAsculo_deltoides"
  ],
  "verificacion": "dos fuentes",
  "nota": "No se pudo abrir Kenhub (404) ni StatPearls (verificación reCAPTCHA); se usaron las versiones EN y ES de Wikipedia, que son independientes en redacción pero similares."
 },
 {
  "id": "supraespinoso",
  "nombre": "Supraespinoso",
  "region": "hombro",
  "vistas": [
   "posterior"
  ],
  "origen": "Fosa supraespinosa de la escápula.",
  "insercion": "Faceta superior del troquíter (tubérculo mayor) del húmero.",
  "accion": "Inicio de la abducción y compresión de la cabeza humeral en la glenoides.",
  "inervacion": "Nervio supraescapular (C5-C6).",
  "palpacion": "Profundo al trapecio, sobre la fosa supraespinosa; tendón distal bajo el acromion con el brazo en extensión y rotación interna.",
  "funcion": "Estabiliza la articulación glenohumeral; es el tendón del manguito más lesionado.",
  "condiciones": [
   "Tendinopatía del supraespinoso",
   "Rotura del manguito rotador",
   "Síndrome de pinzamiento subacromial",
   "Atrapamiento del nervio supraescapular"
  ],
  "ejercicios": [
   "Elevación en plano escapular (lata vacía/lata llena)",
   "Abducción isométrica",
   "Fortalecimiento con banda"
  ],
  "fuentes": [
   "Wikipedia (EN): Supraspinatus muscle — https://en.wikipedia.org/wiki/Supraspinatus_muscle",
   "Kenhub: Supraspinatus: Origin, insertion, innervation, action — https://www.kenhub.com/en/library/anatomy/supraspinatus-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": ""
 },
 {
  "id": "infraespinoso",
  "nombre": "Infraespinoso",
  "region": "hombro",
  "vistas": [
   "posterior"
  ],
  "origen": "Fosa infraespinosa de la escápula.",
  "insercion": "Faceta media del troquíter (tubérculo mayor) del húmero.",
  "accion": "Rotación externa del hombro; estabiliza la cabeza humeral.",
  "inervacion": "Nervio supraescapular (C5-C6).",
  "palpacion": "Bajo la espina de la escápula, en rotación externa resistida con el codo flexionado.",
  "funcion": "Principal rotador externo; esencial en lanzamientos y en el control de la cabeza humeral.",
  "condiciones": [
   "Tendinopatía del infraespinoso",
   "Rotura del manguito rotador",
   "Atrofia por compresión del supraescapular",
   "Pinzamiento interno posterosuperior"
  ],
  "ejercicios": [
   "Rotación externa con banda",
   "Rotación externa en decúbito lateral",
   "Estiramiento de la cápsula posterior"
  ],
  "fuentes": [
   "Wikipedia (EN): Infraspinatus muscle — https://en.wikipedia.org/wiki/Infraspinatus_muscle",
   "Kenhub: Infraspinatus: Origin, insertion, innervation, function — https://www.kenhub.com/en/library/anatomy/infraspinatus-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Wikipedia no da las raíces; Kenhub indica C5-C6."
 },
 {
  "id": "redondo-menor",
  "nombre": "Redondo menor",
  "region": "hombro",
  "vistas": [
   "posterior"
  ],
  "origen": "Dos tercios superiores del borde lateral de la escápula.",
  "insercion": "Faceta inferior del troquíter (tubérculo mayor) del húmero.",
  "accion": "Rotación externa y aducción débil del hombro.",
  "inervacion": "Nervio axilar (C5-C6).",
  "palpacion": "Entre infraespinoso y redondo mayor, en el borde lateral de la escápula en rotación externa resistida.",
  "funcion": "Rotador externo y depresor de la cabeza humeral; sinergista del infraespinoso.",
  "condiciones": [
   "Rotura del manguito rotador",
   "Síndrome del espacio cuadrilátero",
   "Lesión del nervio axilar"
  ],
  "ejercicios": [
   "Rotación externa con banda a 90° de abducción",
   "Remo con rotación externa",
   "Estiramiento posterior del hombro"
  ],
  "fuentes": [
   "Wikipedia (EN): Teres minor muscle — https://en.wikipedia.org/wiki/Teres_minor_muscle",
   "Kenhub: Teres minor: Origin, insertion, action and innervation — https://www.kenhub.com/en/library/anatomy/teres-minor-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Las fuentes leídas dicen solo borde lateral de la escápula; la fracción de dos tercios superiores viene de textos clásicos."
 },
 {
  "id": "subescapular",
  "nombre": "Subescapular",
  "region": "hombro",
  "vistas": [
   "anterior"
  ],
  "origen": "Fosa subescapular de la escápula.",
  "insercion": "Troquín (tubérculo menor) del húmero y parte anterior de la cápsula.",
  "accion": "Rotación interna del hombro; estabilidad anterior de la articulación.",
  "inervacion": "Nervios subescapulares superior e inferior (C5-C6).",
  "palpacion": "Poco accesible: con la mano del paciente en la espalda baja, se palpa en la axila sobre la cara costal de la escápula.",
  "funcion": "Principal estabilizador anterior glenohumeral; clave en la inestabilidad anterior.",
  "condiciones": [
   "Rotura del subescapular",
   "Inestabilidad anterior del hombro",
   "Tendinopatía del bíceps asociada",
   "Capsulitis adhesiva"
  ],
  "ejercicios": [
   "Rotación interna con banda",
   "Press de oso (lift-off)",
   "Estiramiento en rotación externa"
  ],
  "fuentes": [
   "Wikipedia (EN): Subscapularis muscle — https://en.wikipedia.org/wiki/Subscapularis_muscle",
   "Kenhub: Subscapularis: Origin, insertion, action, innervation — https://www.kenhub.com/en/library/anatomy/subscapularis-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": ""
 },
 {
  "id": "biceps-braquial",
  "nombre": "Bíceps braquial",
  "region": "brazo",
  "vistas": [
   "anterior"
  ],
  "origen": "Cabeza corta: apófisis coracoides; cabeza larga: tubérculo supraglenoideo.",
  "insercion": "Tuberosidad del radio y aponeurosis bicipital.",
  "accion": "Flexión del codo, supinación del antebrazo y flexión del hombro.",
  "inervacion": "Nervio musculocutáneo (C5-C6; algunas fuentes C5-C7).",
  "palpacion": "Flexionar el codo con antebrazo en supinación; vientre en cara anterior del brazo y tendón en la fosa cubital.",
  "funcion": "Potente supinador y flexor, sobre todo con el antebrazo supinado.",
  "condiciones": [
   "Tendinopatía de la cabeza larga",
   "Rotura del tendón proximal (signo de Popeye)",
   "Rotura distal del bíceps",
   "Lesión SLAP"
  ],
  "ejercicios": [
   "Curl de bíceps",
   "Curl en martillo",
   "Estiramiento en extensión de codo"
  ],
  "fuentes": [
   "Wikipedia (EN): Biceps — https://en.wikipedia.org/wiki/Biceps",
   "Kenhub: Biceps brachii muscle: Origin, insertion, action — https://www.kenhub.com/en/library/anatomy/biceps-brachii-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Raíces: Wikipedia C5-C7, Kenhub C5-C6."
 },
 {
  "id": "triceps-braquial",
  "nombre": "Tríceps braquial",
  "region": "brazo",
  "vistas": [
   "posterior"
  ],
  "origen": "Cabeza larga: tubérculo infraglenoideo; lateral y medial: cara posterior del húmero.",
  "insercion": "Olécranon del cúbito.",
  "accion": "Extensión del codo; la cabeza larga extiende y aduce el hombro.",
  "inervacion": "Nervio radial (C6-C8).",
  "palpacion": "Extender el codo contra resistencia; vientre en la cara posterior del brazo y tendón sobre el olécranon.",
  "funcion": "Principal extensor del codo, fundamental en empujes y apoyos.",
  "condiciones": [
   "Tendinopatía del tríceps",
   "Rotura del tendón distal",
   "Bursitis olecraneana",
   "Compresión del nervio radial"
  ],
  "ejercicios": [
   "Fondos / press francés",
   "Extensión con polea",
   "Estiramiento sobre la cabeza"
  ],
  "fuentes": [
   "Wikipedia (EN): Triceps — https://en.wikipedia.org/wiki/Triceps",
   "Kenhub: Triceps brachii muscle: Attachments, supply and functions — https://www.kenhub.com/en/library/anatomy/triceps-brachii-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Wikipedia: en cerca del 14 % la cabeza larga recibe el nervio axilar. Raíces C6-C8 según Kenhub (lateral C6, larga C7, medial C8)."
 },
 {
  "id": "braquial",
  "nombre": "Braquial",
  "region": "brazo",
  "vistas": [
   "anterior"
  ],
  "origen": "Mitad distal de la cara anterior del húmero.",
  "insercion": "Tuberosidad del cúbito y apófisis coronoides.",
  "accion": "Flexión del codo en cualquier posición del antebrazo.",
  "inervacion": "Nervio musculocutáneo (C5-C6); la porción lateral recibe un aporte menor del radial (C7).",
  "palpacion": "Profundo al bíceps, a cada lado del tendón bicipital en el tercio distal del brazo.",
  "funcion": "Principal flexor del codo, el músculo de carga de esta articulación.",
  "condiciones": [
   "Miositis osificante tras trauma de codo",
   "Contusión",
   "Atrapamiento del musculocutáneo"
  ],
  "ejercicios": [
   "Curl con agarre prono",
   "Curl predicador",
   "Estiramiento en extensión completa"
  ],
  "fuentes": [
   "Wikipedia (en): Brachialis muscle — https://en.wikipedia.org/wiki/Brachialis_muscle",
   "Kenhub: Brachialis muscle — https://www.kenhub.com/en/library/anatomy/brachialis-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Wikipedia da el aporte del radial en 70-80 % de las personas y raíces del musculocutáneo C5-C7; Kenhub C5-C6. Se usó C5-C6 (formulación más aceptada)."
 },
 {
  "id": "braquiorradial",
  "nombre": "Braquiorradial",
  "region": "brazo",
  "vistas": [
   "lateral",
   "anterior"
  ],
  "origen": "Cresta supracondílea lateral del húmero.",
  "insercion": "Apófisis estiloides del radio.",
  "accion": "Flexión del codo, más eficaz con antebrazo en posición neutra.",
  "inervacion": "Nervio radial (C5-C6).",
  "palpacion": "Flexión de codo contra resistencia con antebrazo neutro; borde lateral del antebrazo proximal.",
  "funcion": "Flexor del codo en velocidad y carga rápida; marcador del nervio radial.",
  "condiciones": [
   "Síndrome del túnel radial",
   "Lesión del nervio radial",
   "Atrapamiento del nervio radial superficial (Wartenberg)"
  ],
  "ejercicios": [
   "Curl en martillo",
   "Flexión isométrica con antebrazo neutro",
   "Estiramiento en extensión de codo y pronación"
  ],
  "fuentes": [
   "Wikipedia (en): Brachioradialis — https://en.wikipedia.org/wiki/Brachioradialis",
   "TeachMeAnatomy: Muscles of the Posterior Forearm — https://teachmeanatomy.info/upper-limb/muscles/posterior-forearm/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Origen, inserción y acción coinciden. Wikipedia lista raíces C5-C8/T1 y TeachMeAnatomy no da raíces; se mantiene C5-C6 (texto clásico). Además lleva el antebrazo a posición neutra desde pronación o supinación."
 },
 {
  "id": "pronador-redondo",
  "nombre": "Pronador redondo",
  "region": "brazo",
  "vistas": [
   "anterior"
  ],
  "origen": "Epicóndilo medial del húmero y apófisis coronoides del cúbito.",
  "insercion": "Cara lateral media del radio.",
  "accion": "Pronación del antebrazo y flexión débil del codo.",
  "inervacion": "Nervio mediano (C6-C7).",
  "palpacion": "Pronar el antebrazo contra resistencia; oblicuo desde el epicóndilo medial hacia el radio.",
  "funcion": "Pronador principal; puede comprimir el nervio mediano.",
  "condiciones": [
   "Síndrome del pronador redondo",
   "Epicondilalgia medial (codo de golfista)",
   "Compresión del nervio mediano"
  ],
  "ejercicios": [
   "Pronación con mancuerna",
   "Estiramiento en supinación y extensión de codo",
   "Isométricos de pronación"
  ],
  "fuentes": [
   "Wikipedia (en): Pronator teres muscle — https://en.wikipedia.org/wiki/Pronator_teres_muscle",
   "TeachMeAnatomy: Muscles of the Anterior Forearm — https://teachmeanatomy.info/upper-limb/muscles/anterior-forearm/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Sin discrepancias. TeachMeAnatomy no indica raíces; C6-C7 confirmado por Wikipedia."
 },
 {
  "id": "supinador",
  "nombre": "Supinador",
  "region": "brazo",
  "vistas": [
   "lateral",
   "posterior"
  ],
  "origen": "Epicóndilo lateral, ligamento colateral radial y cresta del supinador del cúbito.",
  "insercion": "Tercio proximal de las caras posterior, lateral y anterior del radio.",
  "accion": "Supinación del antebrazo, en cualquier grado de flexión del codo.",
  "inervacion": "Nervio interóseo posterior (rama profunda del radial), raíces C6 (C5-C7 según la fuente).",
  "palpacion": "Profundo; se palpa distal al epicóndilo lateral, en supinación resistida con codo extendido.",
  "funcion": "Supinador, atravesado por el interóseo posterior (arcada de Frohse).",
  "condiciones": [
   "Síndrome del supinador / túnel radial",
   "Epicondilalgia lateral",
   "Neuropatía del interóseo posterior"
  ],
  "ejercicios": [
   "Supinación con mancuerna",
   "Estiramiento en pronación",
   "Deslizamiento neural del radial"
  ],
  "fuentes": [
   "Wikipedia (en): Supinator muscle — https://en.wikipedia.org/wiki/Supinator_muscle",
   "Kenhub: Supinator muscle — https://www.kenhub.com/en/library/anatomy/supinator-muscle",
   "TeachMeAnatomy: Muscles of the Posterior Forearm — https://teachmeanatomy.info/upper-limb/muscles/posterior-forearm/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Las raíces discrepan: Wikipedia C6 (algo de C5, posible C7); Kenhub C7-C8. Se corrigió el C5-C6 original a C6 con variación C5-C7. Nervio y estructuras coinciden en las tres fuentes."
 },
 {
  "id": "extensor-radial-corto-carpo",
  "nombre": "Extensor radial corto del carpo",
  "region": "brazo",
  "vistas": [
   "posterior",
   "lateral"
  ],
  "origen": "Epicóndilo lateral del húmero (tendón extensor común).",
  "insercion": "Base del tercer metacarpiano.",
  "accion": "Extensión y leve desviación radial de la muñeca.",
  "inervacion": "Nervio interóseo posterior / radial profundo (C7-C8).",
  "palpacion": "Extender la muñeca con puño cerrado; tendón en la cara dorsal del carpo, junto al tercer metacarpiano.",
  "funcion": "Estabiliza la muñeca durante el agarre; origen habitual de la epicondilalgia lateral.",
  "condiciones": [
   "Epicondilalgia lateral (codo de tenista)",
   "Tendinopatía extensora",
   "Síndrome de intersección"
  ],
  "ejercicios": [
   "Extensión de muñeca excéntrica",
   "Estiramiento de extensores",
   "Barra flexible (Tyler Twist)"
  ],
  "fuentes": [
   "Wikipedia (en): Extensor carpi radialis brevis muscle — https://en.wikipedia.org/wiki/Extensor_carpi_radialis_brevis_muscle",
   "Kenhub: Extensor carpi radialis brevis muscle — https://www.kenhub.com/en/library/anatomy/extensor-carpi-radialis-brevis-muscle",
   "TeachMeAnatomy: Muscles of the Posterior Forearm — https://teachmeanatomy.info/upper-limb/muscles/posterior-forearm/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Origen, inserción, acción y nervio coinciden. Raíces discrepantes: Kenhub C5-C6 (cuadro) y C5-C8 (texto); Wikipedia y TeachMeAnatomy no las dan. Se mantiene C7-C8 (uso clínico habitual). 'Síndrome de intersección' es por vecindad con el ERLC/ERCC."
 },
 {
  "id": "flexor-radial-carpo",
  "nombre": "Flexor radial del carpo",
  "region": "brazo",
  "vistas": [
   "anterior"
  ],
  "origen": "Epicóndilo medial del húmero (tendón flexor común).",
  "insercion": "Bases del segundo y tercer metacarpianos.",
  "accion": "Flexión y desviación radial de la muñeca.",
  "inervacion": "Nervio mediano (C6-C7).",
  "palpacion": "Flexionar la muñeca con desviación radial; tendón prominente en la cara anterior de la muñeca, lateral al palmar largo.",
  "funcion": "Flexor de muñeca; referencia del túnel carpiano y de la arteria radial.",
  "condiciones": [
   "Tendinopatía del flexor radial del carpo",
   "Epicondilalgia medial",
   "Síndrome del túnel carpiano (referencia)"
  ],
  "ejercicios": [
   "Flexión de muñeca con mancuerna",
   "Estiramiento de flexores con muñeca en extensión",
   "Deslizamiento neural del mediano"
  ],
  "fuentes": [
   "Wikipedia (en): Flexor carpi radialis muscle — https://en.wikipedia.org/wiki/Flexor_carpi_radialis_muscle",
   "TeachMeAnatomy: Muscles of the Anterior Forearm — https://teachmeanatomy.info/upper-limb/muscles/anterior-forearm/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Sin discrepancias. Wikipedia añade pequeñas expansiones al trapecio. Raíces C6-C7 solo explícitas en Wikipedia."
 },
 {
  "id": "recto-abdominal",
  "nombre": "Recto abdominal",
  "region": "tronco",
  "vistas": [
   "anterior"
  ],
  "origen": "Cresta y sínfisis del pubis.",
  "insercion": "Cartílagos costales 5-7 y apófisis xifoides.",
  "accion": "Flexión del tronco e inclinación posterior de la pelvis.",
  "inervacion": "Nervios intercostales T7-T11 y subcostal T12.",
  "palpacion": "Elevar la cabeza y los hombros en supino; vientres musculares a cada lado de la línea alba.",
  "funcion": "Flexor del tronco y estabilizador anterior de la pelvis.",
  "condiciones": [
   "Diástasis de rectos abdominales",
   "Distensión muscular",
   "Hernia de pared abdominal",
   "Dolor lumbar por déficit de control"
  ],
  "ejercicios": [
   "Plancha frontal",
   "Elevación pélvica (crunch inverso)",
   "Abdominal con control pélvico"
  ],
  "fuentes": [
   "Wikipedia (en): Rectus abdominis muscle — https://en.wikipedia.org/wiki/Rectus_abdominis_muscle",
   "Kenhub: Rectus abdominis muscle — https://www.kenhub.com/en/library/anatomy/rectus-abdominis-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Coincide. Kenhub indica que algunas fibras laterales pueden llegar a costillas 3-4; T12 se incluye según la fuente."
 },
 {
  "id": "oblicuo-externo",
  "nombre": "Oblicuo externo del abdomen",
  "region": "tronco",
  "vistas": [
   "lateral",
   "anterior"
  ],
  "origen": "Caras externas de las costillas 5-12.",
  "insercion": "Línea alba, tubérculo del pubis y cresta ilíaca anterior.",
  "accion": "Flexión y rotación contralateral del tronco; inclinación ipsilateral.",
  "inervacion": "Nervios intercostales T7-T11 y nervio subcostal T12.",
  "palpacion": "Rotación del tronco contra resistencia; dirección de fibras como bolsillo oblicuo en el flanco.",
  "funcion": "Rotador del tronco, compresor abdominal y estabilizador oblicuo de la pelvis.",
  "condiciones": [
   "Distensión del oblicuo (lanzadores)",
   "Hernia inguinal",
   "Dolor lumbar",
   "Dolor miofascial costal"
  ],
  "ejercicios": [
   "Plancha lateral",
   "Rotación con banda (Pallof press)",
   "Crunch rotacional"
  ],
  "fuentes": [
   "Wikipedia (en): Abdominal external oblique muscle — https://en.wikipedia.org/wiki/Abdominal_external_oblique_muscle",
   "Kenhub: External abdominal oblique muscle — https://www.kenhub.com/en/library/anatomy/external-abdominal-oblique-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Se quitó el iliohipogástrico/ilioinguinal (L1) de la inervación: ambas fuentes dan solo T7-T12 (Kenhub lo cita como sensitivo). Wikipedia añade inserción en el ligamento inguinal y la EIAS."
 },
 {
  "id": "oblicuo-interno",
  "nombre": "Oblicuo interno del abdomen",
  "region": "tronco",
  "vistas": [
   "lateral",
   "anterior"
  ],
  "origen": "Fascia toracolumbar, cresta ilíaca y tercio lateral del ligamento inguinal.",
  "insercion": "Costillas 10-12, línea alba y cresta del pubis (tendón conjunto).",
  "accion": "Flexión y rotación ipsilateral del tronco; inclinación ipsilateral.",
  "inervacion": "Nervios intercostales T7-T11, subcostal T12; iliohipogástrico e ilioinguinal (L1).",
  "palpacion": "Rotación ipsilateral resistida; profundo al oblicuo externo, sobre el flanco, medial a la espina ilíaca anterosuperior.",
  "funcion": "Rotador sinérgico con el oblicuo externo contralateral; aumenta la presión intraabdominal.",
  "condiciones": [
   "Distensión muscular",
   "Hernia inguinal",
   "Dolor lumbar",
   "Atrapamiento del nervio ilioinguinal"
  ],
  "ejercicios": [
   "Plancha lateral",
   "Leñador con banda",
   "Dead bug con rotación"
  ],
  "fuentes": [
   "Wikipedia (en): Abdominal internal oblique muscle — https://en.wikipedia.org/wiki/Abdominal_internal_oblique_muscle",
   "Kenhub: Internal abdominal oblique muscle — https://www.kenhub.com/en/library/anatomy/internal-abdominal-oblique-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Coincide. Kenhub: origen anterior en el arco iliopectíneo (antes descrito como ligamento inguinal); costillas 10-12 o las 3-4 inferiores. Aportes L1 menores."
 },
 {
  "id": "transverso-abdomen",
  "nombre": "Transverso del abdomen",
  "region": "tronco",
  "vistas": [
   "anterior",
   "lateral"
  ],
  "origen": "Cartílagos costales 7-12, fascia toracolumbar, cresta ilíaca y ligamento inguinal.",
  "insercion": "Línea alba mediante aponeurosis, cresta del pubis (tendón conjunto).",
  "accion": "Compresión abdominal y aumento de la presión intraabdominal.",
  "inervacion": "Nervios intercostales T7-T11, subcostal T12; iliohipogástrico e ilioinguinal (L1).",
  "palpacion": "Hundir el abdomen (drawing-in); se palpa medial a las espinas ilíacas anterosuperiores.",
  "funcion": "Estabilizador profundo del tronco, activación anticipatoria antes del movimiento de los miembros.",
  "condiciones": [
   "Dolor lumbar con déficit de control motor",
   "Diástasis abdominal",
   "Disfunción del suelo pélvico",
   "Hernia inguinal"
  ],
  "ejercicios": [
   "Drawing-in en cuadrupedia",
   "Dead bug",
   "Plancha con activación transversa"
  ],
  "fuentes": [
   "Wikipedia (en): Transversus abdominis muscle — https://en.wikipedia.org/wiki/Transversus_abdominis_muscle",
   "Kenhub: Transversus abdominis muscle — https://www.kenhub.com/en/library/anatomy/transversus-abdominis-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Wikipedia menciona T6-T11 en un apartado y T7-T11 en otro; se mantiene T7-T11 + T12 + L1. Inserción también en pecten del pubis."
 },
 {
  "id": "erector-columna",
  "nombre": "Erector de la columna",
  "region": "tronco",
  "vistas": [
   "posterior"
  ],
  "origen": "Sacro, crestas ilíacas, apófisis espinosas lumbares y fascia toracolumbar (tendón común).",
  "insercion": "Costillas, apófisis transversas y espinosas vertebrales y mastoides (iliocostal, longísimo, espinoso).",
  "accion": "Extensión e inclinación lateral de la columna.",
  "inervacion": "Ramas dorsales de los nervios espinales (segmentarios).",
  "palpacion": "Extender el tronco en prono; masas longitudinales a ambos lados de la columna.",
  "funcion": "Mantiene la postura erguida y controla la flexión; sobrecarga frecuente en lumbalgia.",
  "condiciones": [
   "Lumbalgia mecánica",
   "Contractura paravertebral",
   "Distensión muscular lumbar",
   "Dolor miofascial"
  ],
  "ejercicios": [
   "Superman / extensión en prono",
   "Buenos días con carga ligera",
   "Estiramiento rodilla al pecho"
  ],
  "fuentes": [
   "Wikipedia (en): Erector spinae muscles — https://en.wikipedia.org/wiki/Erector_spinae_muscles",
   "TeachMeAnatomy: Intrinsic Muscles of the Back — https://teachmeanatomy.info/back/muscles/intrinsic/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Ambas fuentes coinciden en nervio (ramos posteriores) y acción; ninguna da segmentos. La descripción de origen/inserción varía por componente (espinoso llega a occipital en TeachMeAnatomy)."
 },
 {
  "id": "multifidos",
  "nombre": "Multífidos",
  "region": "tronco",
  "vistas": [
   "posterior"
  ],
  "origen": "Sacro, ilion, apófisis mamilares lumbares y transversas torácicas, articulares cervicales.",
  "insercion": "Apófisis espinosas de 2-4 vértebras por encima de su origen.",
  "accion": "Extensión y rotación contralateral; estabilización segmentaria.",
  "inervacion": "Ramas dorsales de los nervios espinales (segmentarios).",
  "palpacion": "Junto a las apófisis espinosas lumbares, profundo, al contraer la zona (ej. levantar un brazo en prono).",
  "funcion": "Estabilizador segmentario lumbar; atrofia ipsilateral frecuente tras lumbalgia.",
  "condiciones": [
   "Lumbalgia crónica con atrofia",
   "Inestabilidad lumbar",
   "Radiculopatía lumbar",
   "Disfunción sacroilíaca"
  ],
  "ejercicios": [
   "Bird-dog",
   "Puente con activación lumbopélvica",
   "Elevación de brazo contralateral en prono"
  ],
  "fuentes": [
   "Wikipedia (en): Multifidus muscle — https://en.wikipedia.org/wiki/Multifidus_muscle",
   "TeachMeAnatomy: Intrinsic Muscles of the Back — https://teachmeanatomy.info/back/muscles/intrinsic/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Coincide en nervio y orígenes. Wikipedia: fascículos que abarcan 1-4 niveles; TeachMeAnatomy 2-4. La rotación contralateral y la flexión lateral ipsilateral figuran en Wikipedia; TeachMeAnatomy solo 'estabiliza'."
 },
 {
  "id": "cuadrado-lumbar",
  "nombre": "Cuadrado lumbar",
  "region": "tronco",
  "vistas": [
   "posterior"
  ],
  "origen": "Cresta ilíaca posterior y ligamento iliolumbar.",
  "insercion": "Costilla 12 y apófisis transversas de L1-L4.",
  "accion": "Inclinación lateral del tronco, elevación pélvica y fijación de la costilla 12; bilateral: extensión lumbar.",
  "inervacion": "Nervio subcostal (T12) y ramas ventrales de L1-L4.",
  "palpacion": "Lateral al erector, entre la costilla 12 y la cresta ilíaca, al elevar la cadera en decúbito lateral.",
  "funcion": "Estabiliza la pelvis y el tronco en la marcha y apoyo unipodal.",
  "condiciones": [
   "Lumbalgia por dolor miofascial",
   "Contractura unilateral",
   "Desequilibrio pélvico",
   "Distensión muscular"
  ],
  "ejercicios": [
   "Plancha lateral",
   "Elevación pélvica en bipedestación",
   "Estiramiento en inclinación lateral"
  ],
  "fuentes": [
   "Wikipedia (en): Quadratus lumborum muscle — https://en.wikipedia.org/wiki/Quadratus_lumborum_muscle",
   "Kenhub: Quadratus lumborum muscle — https://www.kenhub.com/en/library/anatomy/quadratus-lumborum-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Ambas fuentes dan T12-L4; se reemplazó la nota 'fuentes difieren' y se añadió la acción bilateral. Otros textos citan solo L1-L3."
 },
 {
  "id": "dorsal-ancho",
  "nombre": "Dorsal ancho",
  "region": "tronco",
  "vistas": [
   "posterior",
   "lateral"
  ],
  "origen": "Apófisis espinosas de T7-T12 (más lumbares y sacras por fascia toracolumbar), cresta ilíaca posterior, costillas 9-12 y ángulo inferior de la escápula (inconstante).",
  "insercion": "Fondo del surco intertubercular del húmero.",
  "accion": "Extensión, aducción y rotación interna del hombro.",
  "inervacion": "Nervio toracodorsal (C6-C8).",
  "palpacion": "Aducción del brazo contra resistencia; borde lateral que forma el pliegue axilar posterior.",
  "funcion": "Potente extensor en trepar y tirar; conecta brazo y pelvis por la fascia toracolumbar.",
  "condiciones": [
   "Distensión del dorsal ancho",
   "Limitación de flexión del hombro por acortamiento",
   "Dolor lumbar por tensión de fascia"
  ],
  "ejercicios": [
   "Dominadas / jalón al pecho",
   "Remo con banda",
   "Estiramiento sobre la cabeza (niño)"
  ],
  "fuentes": [
   "Wikipedia (en): Latissimus dorsi muscle — https://en.wikipedia.org/wiki/Latissimus_dorsi_muscle",
   "Kenhub: Latissimus dorsi muscle — https://www.kenhub.com/en/library/anatomy/latissimus-dorsi-muscle",
   "TeachMeAnatomy: Superficial Back Muscles — https://teachmeanatomy.info/back/muscles/superficial/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Origen torácico varía: T6-T12 (TeachMeAnatomy), T7-T12 (Kenhub), T7-S5 (Wikipedia, incluyendo fascia). Se ajustó 'T7-L5' a T7-T12 vía vertebral directa; costillas 9-12 (inferiores 3-4). Ángulo escapular inferior inconstante."
 },
 {
  "id": "diafragma",
  "nombre": "Diafragma",
  "region": "tronco",
  "vistas": [
   "anterior"
  ],
  "origen": "Apófisis xifoides, costillas inferiores (6-12) y vértebras lumbares superiores (pilares).",
  "insercion": "Centro tendinoso del diafragma.",
  "accion": "Inspiración principal; aumenta la presión intraabdominal.",
  "inervacion": "Nervio frénico (C3-C5); sensibilidad periférica por intercostales inferiores.",
  "palpacion": "Palpación subcostal durante la inspiración profunda; expansión costal inferior.",
  "funcion": "Principal músculo respiratorio y componente del core junto con transverso y suelo pélvico.",
  "condiciones": [
   "Hernia de hiato",
   "Parálisis diafragmática",
   "Disfunción respiratoria",
   "Dolor lumbar con patrón respiratorio alterado"
  ],
  "ejercicios": [
   "Respiración diafragmática",
   "Respiración costal lateral",
   "Respiración en 90-90"
  ],
  "fuentes": [
   "Wikipedia (en): Thoracic diaphragm — https://en.wikipedia.org/wiki/Thoracic_diaphragm",
   "Kenhub: Diaphragm — https://www.kenhub.com/en/library/anatomy/diaphragm"
  ],
  "verificacion": "dos fuentes",
  "nota": "Costillas de origen: 6-12 (Wikipedia, infobox) o 7-12 (Kenhub). Pilares: derecho L1-L3, izquierdo L1-L2. Sensitivo periférico por intercostales T5-T11 y subcostal T12."
 },
 {
  "id": "psoas-iliaco",
  "nombre": "Psoas ilíaco",
  "region": "cadera",
  "vistas": [
   "anterior"
  ],
  "origen": "Psoas: cuerpos de T12-L4 con discos y apófisis transversas lumbares; ilíaco: fosa ilíaca.",
  "insercion": "Trocánter menor del fémur.",
  "accion": "Flexión de la cadera; flexión del tronco en cadena cerrada.",
  "inervacion": "Nervio femoral (L2-L4) y ramas directas del plexo lumbar (L1-L3).",
  "palpacion": "Palpación profunda en el abdomen inferior lateral al recto, con flexión de cadera resistida.",
  "funcion": "Principal flexor de cadera; estabilizador lumbopélvico, con acortamiento frecuente en el sedentarismo.",
  "condiciones": [
   "Tendinopatía del iliopsoas / cadera en resorte interna",
   "Bursitis iliopectínea",
   "Acortamiento con hiperlordosis lumbar",
   "Absceso del psoas"
  ],
  "ejercicios": [
   "Estiramiento en zancada (hip flexor stretch)",
   "Elevación de rodilla en bipedestación",
   "Marcha de rodillas altas"
  ],
  "fuentes": [
   "Wikipedia (en): Iliopsoas — https://en.wikipedia.org/wiki/Iliopsoas",
   "Kenhub: Iliopsoas muscle — https://www.kenhub.com/en/library/anatomy/iliopsoas-muscle"
  ],
  "verificacion": "dos fuentes",
  "nota": "Cuerpos vertebrales: T12-L3 (Wikipedia) o T12-L4 (Kenhub). Raíces: psoas L1-L3 o L1-L4; ilíaco L2-L3 o L2-L4 según la fuente. Se corrigió el origen del psoas (T12-L5) a T12-L4 con transversas lumbares."
 },
 {
  "id": "gluteo-mayor",
  "nombre": "Glúteo mayor",
  "region": "cadera",
  "vistas": [
   "posterior",
   "lateral"
  ],
  "origen": "Cara glútea del ilion, sacro, cóccix y ligamento sacrotuberoso.",
  "insercion": "Tracto iliotibial (la mayor parte, ≈ ¾ superficiales) y tuberosidad glútea del fémur (fibras profundas).",
  "accion": "Extensión y rotación externa de la cadera; fibras superiores abducen.",
  "inervacion": "Nervio glúteo inferior (L5-S2).",
  "palpacion": "Extender la cadera en prono con rodilla flexionada; masa voluminosa posterior de la nalga.",
  "funcion": "Principal extensor de cadera en subir escaleras, levantarse y correr.",
  "condiciones": [
   "Inhibición / amnesia glútea",
   "Bursitis trocantérea",
   "Lumbalgia asociada a debilidad glútea",
   "Contusión"
  ],
  "ejercicios": [
   "Puente de glúteos",
   "Hip thrust",
   "Sentadilla"
  ],
  "fuentes": [
   "Wikipedia (en): Gluteus maximus — https://en.wikipedia.org/wiki/Gluteus_maximus",
   "Kenhub: Gluteus maximus muscle — https://www.kenhub.com/en/library/anatomy/gluteus-maximus-muscle",
   "TeachMeAnatomy: Gluteal Region — https://teachmeanatomy.info/lower-limb/muscles/gluteal-region/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Se precisó la inserción (la mayoría de las fibras, incluidas inferiores superficiales, va al tracto iliotibial) y la acción de fibras superiores/inferiores. Fascia toracolumbar y aponeurosis glútea también dan origen (Kenhub)."
 },
 {
  "id": "gluteo-medio",
  "nombre": "Glúteo medio",
  "region": "cadera",
  "vistas": [
   "lateral",
   "posterior"
  ],
  "origen": "Cara glútea del ilion, entre las líneas glúteas anterior y posterior.",
  "insercion": "Cara lateral del trocánter mayor.",
  "accion": "Abducción de la cadera; fibras anteriores rotan internamente y posteriores externamente.",
  "inervacion": "Nervio glúteo superior (L4-S1).",
  "palpacion": "Abducción en decúbito lateral; sobre el ala ilíaca, bajo la cresta, proximal al trocánter mayor.",
  "funcion": "Estabiliza la pelvis en apoyo unipodal; su debilidad causa signo de Trendelenburg.",
  "condiciones": [
   "Síndrome doloroso del trocánter mayor",
   "Tendinopatía glútea",
   "Marcha de Trendelenburg",
   "Síndrome femoropatelar asociado"
  ],
  "ejercicios": [
   "Abducción en decúbito lateral",
   "Almeja (clamshell)",
   "Marcha lateral con banda"
  ],
  "fuentes": [
   "Wikipedia (en): Gluteus medius — https://en.wikipedia.org/wiki/Gluteus_medius",
   "TeachMeAnatomy: Gluteal Region — https://teachmeanatomy.info/lower-limb/muscles/gluteal-region/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Kenhub no abrió (404). Raíces L4-S1 solo en Wikipedia; TeachMeAnatomy solo da el nervio. Wikipedia: fibras anteriores también flexionan, posteriores extienden."
 },
 {
  "id": "gluteo-menor",
  "nombre": "Glúteo menor",
  "region": "cadera",
  "vistas": [
   "lateral"
  ],
  "origen": "Cara glútea del ilion, entre las líneas glúteas anterior e inferior.",
  "insercion": "Cara anterior del trocánter mayor.",
  "accion": "Abducción y rotación interna de la cadera.",
  "inervacion": "Nervio glúteo superior (L4-S1).",
  "palpacion": "Profundo al glúteo medio; palpable con dificultad sobre el ilion anterior en abducción resistida.",
  "funcion": "Estabiliza la cabeza femoral y la pelvis, sinérgico del glúteo medio.",
  "condiciones": [
   "Tendinopatía glútea",
   "Síndrome doloroso del trocánter mayor",
   "Dolor referido tipo ciática (puntos gatillo)"
  ],
  "ejercicios": [
   "Abducción en decúbito lateral con rotación interna",
   "Elevación pélvica unipodal",
   "Marcha lateral con banda"
  ],
  "fuentes": [
   "Wikipedia (en): Gluteus minimus — https://en.wikipedia.org/wiki/Gluteus_minimus",
   "Kenhub: Gluteus minimus muscle — https://www.kenhub.com/en/library/anatomy/gluteus-minimus-muscle",
   "TeachMeAnatomy: Gluteal Region — https://teachmeanatomy.info/lower-limb/muscles/gluteal-region/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Coincide. Wikipedia añade que con cadera extendida puede rotar externamente y que expande hacia la cápsula articular."
 },
 {
  "id": "piriforme",
  "nombre": "Piriforme",
  "region": "cadera",
  "vistas": [
   "posterior"
  ],
  "origen": "Cara pélvica del sacro (S2-S4) y ligamento sacrotuberoso.",
  "insercion": "Borde superior del trocánter mayor.",
  "accion": "Rotación externa de la cadera extendida; abducción con cadera flexionada.",
  "inervacion": "Nervio del piriforme (S1-S2; algunas fuentes L5-S2).",
  "palpacion": "Profundo al glúteo mayor, entre el sacro y el trocánter mayor, con rotación externa resistida.",
  "funcion": "Rotador externo y estabilizador de la cabeza femoral; relación íntima con el nervio ciático.",
  "condiciones": [
   "Síndrome del piriforme",
   "Atrapamiento del ciático",
   "Dolor glúteo profundo",
   "Disfunción sacroilíaca"
  ],
  "ejercicios": [
   "Estiramiento figura 4",
   "Estiramiento en rotación externa y aducción",
   "Almeja (clamshell)"
  ],
  "fuentes": [
   "Wikipedia (en): Piriformis muscle — https://en.wikipedia.org/wiki/Piriformis_muscle",
   "Kenhub: Piriformis muscle — https://www.kenhub.com/en/library/anatomy/piriformis-muscle",
   "TeachMeAnatomy: Gluteal Region — https://teachmeanatomy.info/lower-limb/muscles/gluteal-region/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Raíces: S1-S2 (Kenhub) o L5-S1-S2 (Wikipedia). Con cadera flexionada ≥90° pasa a rotador interno (Wikipedia). Inserción: ápice/borde superior del trocánter mayor, con tendón unido a gemelos y obturador interno."
 },
 {
  "id": "tensor-fascia-lata",
  "nombre": "Tensor de la fascia lata",
  "region": "cadera",
  "vistas": [
   "lateral",
   "anterior"
  ],
  "origen": "Espina ilíaca anterosuperior y parte anterior de la cresta ilíaca.",
  "insercion": "Tracto iliotibial, hasta el tubérculo de Gerdy de la tibia.",
  "accion": "Flexión, abducción y rotación interna de la cadera; tensa el tracto iliotibial.",
  "inervacion": "Nervio glúteo superior (L4-S1).",
  "palpacion": "Distal y lateral a la espina ilíaca anterosuperior, con flexión-abducción de cadera.",
  "funcion": "Estabiliza cadera y rodilla en la marcha; compensa la debilidad del glúteo medio.",
  "condiciones": [
   "Síndrome de la banda iliotibial",
   "Cadera en resorte externa",
   "Tensión miofascial",
   "Dolor lateral de rodilla"
  ],
  "ejercicios": [
   "Estiramiento en aducción cruzada",
   "Liberación con rodillo (foam roller)",
   "Fortalecimiento de glúteo medio"
  ],
  "fuentes": [
   "Wikipedia (en): Tensor fasciae latae muscle — https://en.wikipedia.org/wiki/Tensor_fasciae_latae_muscle",
   "Wikipedia (es): Músculo tensor de la fascia lata — https://es.wikipedia.org/wiki/Músculo_tensor_de_la_fascia_lata",
   "TeachMeAnatomy: Muscles of the Gluteal Region — https://teachmeanatomy.info/lower-limb/muscles/gluteal-region/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Raíces: Wikipedia en indica L4-S1 en la ficha (L5-S1 en el texto) y Wikipedia es L5-S1; se conserva L4-S1."
 },
 {
  "id": "obturador-interno",
  "nombre": "Obturador interno",
  "region": "cadera",
  "vistas": [
   "posterior"
  ],
  "origen": "Cara interna de la membrana obturatriz y márgenes del agujero obturado.",
  "insercion": "Cara medial del trocánter mayor.",
  "accion": "Rotación externa de la cadera extendida; abducción con flexión.",
  "inervacion": "Nervio del obturador interno (L5-S2).",
  "palpacion": "Muy profundo; se evalúa con rotación externa resistida y palpación rectal/vaginal en suelo pélvico.",
  "funcion": "Estabiliza la cabeza femoral; forma parte de la pared lateral de la pelvis menor.",
  "condiciones": [
   "Síndrome del glúteo profundo",
   "Atrapamiento del ciático",
   "Dolor pélvico miofascial"
  ],
  "ejercicios": [
   "Almeja con banda",
   "Rotación externa en sedestación",
   "Estiramiento figura 4"
  ],
  "fuentes": [
   "Wikipedia (en): Obturator internus muscle — https://en.wikipedia.org/wiki/Obturator_internus_muscle",
   "Wikipedia (es): Músculo obturador interno — https://es.wikipedia.org/wiki/Músculo_obturador_interno",
   "TeachMeAnatomy: Muscles of the Gluteal Region — https://teachmeanatomy.info/lower-limb/muscles/gluteal-region/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Corregida la raíz: las dos Wikipedias indican L5, S1 y S2 (la base decía L5-S1)."
 },
 {
  "id": "cuadrado-femoral",
  "nombre": "Cuadrado femoral",
  "region": "cadera",
  "vistas": [
   "posterior"
  ],
  "origen": "Borde lateral de la tuberosidad isquiática.",
  "insercion": "Tubérculo cuadrado en la cresta intertrocantérica del fémur.",
  "accion": "Rotación externa y aducción débil de la cadera.",
  "inervacion": "Nervio del cuadrado femoral (L4-S1).",
  "palpacion": "Muy profundo entre el isquion y el trocánter mayor; palpable con dificultad bajo el glúteo mayor.",
  "funcion": "Estabilizador posterior de la cadera.",
  "condiciones": [
   "Síndrome del espacio isquiofemoral",
   "Dolor glúteo profundo",
   "Distensión por rotación forzada"
  ],
  "ejercicios": [
   "Rotación externa isométrica en sedestación",
   "Almeja con banda",
   "Estiramiento figura 4"
  ],
  "fuentes": [
   "Wikipedia (en): Quadratus femoris muscle — https://en.wikipedia.org/wiki/Quadratus_femoris_muscle",
   "Wikipedia (es): Músculo cuadrado femoral — https://es.wikipedia.org/wiki/Músculo_cuadrado_femoral",
   "TeachMeAnatomy: Muscles of the Gluteal Region — https://teachmeanatomy.info/lower-limb/muscles/gluteal-region/"
  ],
  "verificacion": "dos fuentes",
  "nota": "Las raíces L4-S1 solo constan en Wikipedia en; las demás fuentes no las especifican. Inserción precisada (tubérculo cuadrado)."
 },
 {
  "id": "recto-femoral",
  "nombre": "Recto femoral",
  "region": "muslo",
  "vistas": [
   "anterior"
  ],
  "origen": "Espina ilíaca anteroinferior y surco supraacetabular.",
  "insercion": "Base de la rótula y tuberosidad tibial mediante tendón rotuliano.",
  "accion": "Extensión de la rodilla y flexión de la cadera.",
  "inervacion": "Nervio femoral (L2-L4).",
  "palpacion": "Extensión de rodilla con cadera flexionada; vientre central en cara anterior del muslo.",
  "funcion": "Único cuádriceps biarticular; clave en patada, sprint y ascenso de escaleras.",
  "condiciones": [
   "Distensión del recto femoral",
   "Tendinopatía rotuliana",
   "Avulsión de la espina ilíaca anteroinferior",
   "Síndrome femoropatelar"
  ],
  "ejercicios": [
   "Sentadilla",
   "Extensión de rodilla en máquina",
   "Estiramiento de cuádriceps en bipedestación"
  ],
  "fuentes": [
   "Wikipedia (en): Rectus femoris muscle — https://en.wikipedia.org/wiki/Rectus_femoris_muscle",
   "Wikipedia (es): Músculo recto femoral — https://es.wikipedia.org/wiki/Músculo_recto_femoral"
  ],
  "verificacion": "dos fuentes",
  "nota": "Wikipedia en menciona solo L4 para el nervio femoral y Wikipedia es no da raíces; se conserva L2-L4 (convención estándar, confirmada para los vastos)."
 },
 {
  "id": "vasto-lateral",
  "nombre": "Vasto lateral",
  "region": "muslo",
  "vistas": [
   "lateral",
   "anterior"
  ],
  "origen": "Línea intertrocantérica, borde anteroinferior del trocánter mayor, tuberosidad glútea, labio lateral de la línea áspera y tabique intermuscular lateral.",
  "insercion": "Borde lateral de la rótula y tendón del cuádriceps.",
  "accion": "Extensión de la rodilla.",
  "inervacion": "Nervio femoral (L2-L4).",
  "palpacion": "Extensión de rodilla contra resistencia; masa lateral del muslo.",
  "funcion": "Mayor volumen del cuádriceps; su desequilibrio con el medial afecta el seguimiento rotuliano.",
  "condiciones": [
   "Síndrome femoropatelar",
   "Tendinopatía cuadricipital",
   "Contusión (charley horse)",
   "Síndrome de la banda iliotibial asociado"
  ],
  "ejercicios": [
   "Sentadilla",
   "Prensa de piernas",
   "Estiramiento de cuádriceps"
  ],
  "fuentes": [
   "Wikipedia (en): Vastus lateralis muscle — https://en.wikipedia.org/wiki/Vastus_lateralis_muscle",
   "Wikipedia (es): Músculo vasto externo (vasto lateral) — https://es.wikipedia.org/wiki/Músculo_vasto_externo"
  ],
  "verificacion": "dos fuentes",
  "nota": "Origen ampliado según ambas fuentes (línea intertrocantérica, tuberosidad glútea). Wikipedia en añade inserción por el ligamento rotuliano a la tuberosidad tibial."
 },
 {
  "id": "vasto-medial",
  "nombre": "Vasto medial",
  "region": "muslo",
  "vistas": [
   "anterior"
  ],
  "origen": "Línea intertrocantérica, labio medial de la línea áspera y tabique intermuscular medial.",
  "insercion": "Borde medial de la rótula y tendón del cuádriceps.",
  "accion": "Extensión de la rodilla; estabiliza medialmente la rótula.",
  "inervacion": "Nervio femoral (L2-L4).",
  "palpacion": "Extensión terminal de rodilla; abultamiento medial en la porción distal del muslo.",
  "funcion": "Estabiliza la rótula; su inhibición es frecuente tras lesión de rodilla.",
  "condiciones": [
   "Síndrome femoropatelar",
   "Inestabilidad rotuliana",
   "Inhibición tras cirugía de LCA",
   "Atrofia por derrame"
  ],
  "ejercicios": [
   "Extensión terminal de rodilla con banda",
   "Sentadilla con aducción isométrica",
   "Step-up"
  ],
  "fuentes": [
   "Wikipedia (en): Vastus medialis — https://en.wikipedia.org/wiki/Vastus_medialis",
   "Wikipedia (es): Músculo vasto interno (vasto medial) — https://es.wikipedia.org/wiki/Músculo_vasto_interno"
  ],
  "verificacion": "dos fuentes",
  "nota": "Wikipedia en no da raíces; Wikipedia es indica L2-L4. Origen también incluye línea supracondílea medial y tendones de los aductores."
 },
 {
  "id": "biceps-femoral",
  "nombre": "Bíceps femoral",
  "region": "muslo",
  "vistas": [
   "posterior",
   "lateral"
  ],
  "origen": "Cabeza larga: tuberosidad isquiática; cabeza corta: labio lateral de la línea áspera.",
  "insercion": "Cabeza del peroné, con expansión a cóndilo lateral de la tibia.",
  "accion": "Flexión de rodilla, rotación externa de la pierna y extensión de cadera (cabeza larga).",
  "inervacion": "Cabeza larga: tibial (L5-S2); cabeza corta: peroneo común (L5-S2).",
  "palpacion": "Flexión de rodilla resistida en prono; tendón lateral en la cara posterior de la rodilla.",
  "funcion": "Flexor de rodilla y desacelerador en la carrera; muy propenso a distensiones.",
  "condiciones": [
   "Distensión de isquiotibiales",
   "Tendinopatía proximal",
   "Avulsión isquiática",
   "Dolor posterior de rodilla"
  ],
  "ejercicios": [
   "Curl nórdico",
   "Peso muerto rumano",
   "Estiramiento de isquiotibiales"
  ],
  "fuentes": [
   "Wikipedia (en): Biceps femoris muscle — https://en.wikipedia.org/wiki/Biceps_femoris_muscle",
   "Wikipedia (es): Músculo bíceps femoral — https://es.wikipedia.org/wiki/Músculo_bíceps_femoral"
  ],
  "verificacion": "dos fuentes",
  "nota": "Wikipedia en indica L5-S1; se conserva L5-S2 (fórmula habitual de los isquiotibiales). Wikipedia es no da raíces."
 },
 {
  "id": "semitendinoso",
  "nombre": "Semitendinoso",
  "region": "muslo",
  "vistas": [
   "posterior"
  ],
  "origen": "Tuberosidad isquiática (tendón común con cabeza larga del bíceps).",
  "insercion": "Cara medial proximal de la tibia (pata de ganso).",
  "accion": "Flexión de rodilla, rotación interna de la pierna y extensión de cadera.",
  "inervacion": "Nervio tibial (rama ciática, L5-S2).",
  "palpacion": "Flexión de rodilla resistida con rotación interna; tendón cordonal medial en la cara posterior de la rodilla.",
  "funcion": "Flexor y rotador interno; su tendón se usa como injerto de LCA.",
  "condiciones": [
   "Distensión de isquiotibiales",
   "Síndrome de la pata de ganso",
   "Tendinopatía proximal",
   "Injerto de LCA"
  ],
  "ejercicios": [
   "Curl de isquiotibiales",
   "Puente en una pierna",
   "Estiramiento de isquiotibiales"
  ],
  "fuentes": [
   "Wikipedia (en): Semitendinosus muscle — https://en.wikipedia.org/wiki/Semitendinosus_muscle",
   "Wikipedia (es): Músculo semitendinoso — https://es.wikipedia.org/wiki/Músculo_semitendinoso"
  ],
  "verificacion": "dos fuentes",
  "nota": "Wikipedia es no especifica raíces; Wikipedia en indica L5-S2."
 },
 {
  "id": "semimembranoso",
  "nombre": "Semimembranoso",
  "region": "muslo",
  "vistas": [
   "posterior"
  ],
  "origen": "Tuberosidad isquiática (parte superolateral).",
  "insercion": "Cóndilo medial de la tibia (cara posterior) y ligamento poplíteo oblicuo.",
  "accion": "Flexión de rodilla, rotación interna de la pierna y extensión de cadera.",
  "inervacion": "Nervio tibial (rama ciática, L5-S2).",
  "palpacion": "Flexión resistida con rotación interna; masa profunda medial al semitendinoso en la zona posteromedial de la rodilla.",
  "funcion": "Estabilizador posteromedial de la rodilla; participa en retracción del menisco medial.",
  "condiciones": [
   "Distensión de isquiotibiales",
   "Tendinopatía / bursitis semimembranosa",
   "Quiste de Baker (relación)",
   "Dolor posteromedial de rodilla"
  ],
  "ejercicios": [
   "Curl de isquiotibiales con deslizador",
   "Peso muerto con una pierna",
   "Estiramiento de isquiotibiales"
  ],
  "fuentes": [
   "Wikipedia (en): Semimembranosus muscle — https://en.wikipedia.org/wiki/Semimembranosus_muscle",
   "Wikipedia (es): Músculo semimembranoso — https://es.wikipedia.org/wiki/Músculo_semimembranoso"
  ],
  "verificacion": "dos fuentes",
  "nota": "Raíces: Wikipedia en L5-S2 en la ficha (L4-S3 en el texto) y Wikipedia es L5-S3; se conserva L5-S2."
 },
 {
  "id": "sartorio",
  "nombre": "Sartorio",
  "region": "muslo",
  "vistas": [
   "anterior"
  ],
  "origen": "Espina ilíaca anterosuperior.",
  "insercion": "Cara medial proximal de la tibia (pata de ganso).",
  "accion": "Flexión, abducción y rotación externa de la cadera; flexión de rodilla.",
  "inervacion": "Nervio femoral (L2-L3).",
  "palpacion": "Cruzar la pierna (posición de sastre); banda oblicua desde la espina ilíaca hasta la rodilla medial.",
  "funcion": "Músculo más largo del cuerpo; participa en la pata de ganso y en la estabilidad medial de la rodilla.",
  "condiciones": [
   "Síndrome de la pata de ganso",
   "Meralgia parestésica (vecindad)",
   "Avulsión de la espina ilíaca anterosuperior"
  ],
  "ejercicios": [
   "Elevación de pierna con rotación externa",
   "Estiramiento en extensión de cadera y rotación interna",
   "Sentadilla sumo"
  ],
  "fuentes": [
   "Wikipedia (en): Sartorius muscle — https://en.wikipedia.org/wiki/Sartorius_muscle",
   "Wikipedia (es): Músculo sartorio — https://es.wikipedia.org/wiki/Músculo_sartorio"
  ],
  "verificacion": "dos fuentes",
  "nota": "Ambas fuentes confirman el nervio femoral pero ninguna da raíces; L2-L3 proviene de textos clásicos (Gray). Las acciones son débiles según las fuentes."
 },
 {
  "id": "aductor-mayor",
  "nombre": "Aductor mayor",
  "region": "muslo",
  "vistas": [
   "anterior"
  ],
  "origen": "Rama isquiopúbica y tuberosidad isquiática.",
  "insercion": "Línea áspera, línea supracondílea y tubérculo aductor del fémur.",
  "accion": "Aducción de la cadera; porción posterior extiende la cadera.",
  "inervacion": "Nervio obturador (L2-L4) y nervio ciático/tibial (L4-S1).",
  "palpacion": "Aducción resistida en decúbito lateral; masa en cara medial del muslo, proximal.",
  "funcion": "Aductor más potente; su porción isquiática trabaja como extensor junto con isquiotibiales.",
  "condiciones": [
   "Distensión de aductores (ingle)",
   "Pubalgia / dolor inguinal atlético",
   "Osteítis del pubis",
   "Tendinopatía de aductores"
  ],
  "ejercicios": [
   "Aducción con banda o polea",
   "Copenhagen plank",
   "Estiramiento en mariposa"
  ],
  "fuentes": [
   "Wikipedia (en): Adductor magnus muscle — https://en.wikipedia.org/wiki/Adductor_magnus_muscle",
   "Wikipedia (es): Músculo aductor mayor — https://es.wikipedia.org/wiki/Músculo_aductor_mayor"
  ],
  "verificacion": "dos fuentes",
  "nota": "Inervación dual confirmada (obturador posterior + ciático). Wikipedia es da L3-L4 para el obturador; rangos de raíces varían según el texto."
 },
 {
  "id": "gastrocnemio",
  "nombre": "Gastrocnemio",
  "region": "pierna-pie",
  "vistas": [
   "posterior"
  ],
  "origen": "Cóndilos femorales medial y lateral (cabezas medial y lateral).",
  "insercion": "Calcáneo, mediante el tendón calcáneo (de Aquiles).",
  "accion": "Flexión plantar del tobillo y flexión de la rodilla.",
  "inervacion": "Nervio tibial (S1-S2).",
  "palpacion": "Elevar el talón en puntillas; vientres medial y lateral en la pantorrilla.",
  "funcion": "Flexor plantar potente en marcha rápida, salto y carrera; biarticular.",
  "condiciones": [
   "Rotura del gastrocnemio (tennis leg)",
   "Tendinopatía de Aquiles",
   "Calambres",
   "Trombosis venosa profunda (diferencial)"
  ],
  "ejercicios": [
   "Elevación de talones con rodilla extendida",
   "Estiramiento de pantorrilla con rodilla extendida",
   "Saltos de cuerda"
  ],
  "fuentes": [
   "Wikipedia (en): Gastrocnemius muscle — https://en.wikipedia.org/wiki/Gastrocnemius_muscle",
   "Wikipedia (es): Músculo gastrocnemio — https://es.wikipedia.org/wiki/Músculo_gastrocnemio"
  ],
  "verificacion": "dos fuentes",
  "nota": ""
 },
 {
  "id": "soleo",
  "nombre": "Sóleo",
  "region": "pierna-pie",
  "vistas": [
   "posterior",
   "lateral"
  ],
  "origen": "Cabeza y cuarto proximal del peroné y línea del sóleo de la tibia.",
  "insercion": "Calcáneo, mediante el tendón calcáneo.",
  "accion": "Flexión plantar del tobillo, independiente de la posición de la rodilla.",
  "inervacion": "Nervio tibial (S1-S2).",
  "palpacion": "Elevar el talón con la rodilla flexionada; vientre profundo, lateral y medial al gastrocnemio.",
  "funcion": "Músculo postural antigravitatorio; sostiene la bipedestación y propulsa en carrera.",
  "condiciones": [
   "Distensión del sóleo",
   "Tendinopatía de Aquiles",
   "Síndrome compartimental",
   "Trombosis venosa profunda"
  ],
  "ejercicios": [
   "Elevación de talones con rodilla flexionada",
   "Estiramiento de pantorrilla con rodilla flexionada",
   "Elevación sentada"
  ],
  "fuentes": [
   "Wikipedia (en): Soleus muscle — https://en.wikipedia.org/wiki/Soleus_muscle",
   "Wikipedia (es): Músculo sóleo — https://es.wikipedia.org/wiki/Músculo_sóleo"
  ],
  "verificacion": "dos fuentes",
  "nota": "Wikipedia en da raíces inconsistentes (L5-S2 / L4-S2); Wikipedia es indica S1-S2, que se conserva."
 },
 {
  "id": "tibial-anterior",
  "nombre": "Tibial anterior",
  "region": "pierna-pie",
  "vistas": [
   "anterior",
   "lateral"
  ],
  "origen": "Cóndilo lateral y dos tercios superiores de la cara lateral de la tibia; membrana interósea.",
  "insercion": "Cara medial de la cuña medial y base del primer metatarsiano.",
  "accion": "Dorsiflexión del tobillo e inversión del pie.",
  "inervacion": "Nervio peroneo profundo (L4-L5).",
  "palpacion": "Dorsiflexión con inversión; tendón prominente en la cara anteromedial del tobillo.",
  "funcion": "Controla la caída del pie en el contacto del talón y sostiene el arco longitudinal medial.",
  "condiciones": [
   "Pie caído",
   "Síndrome compartimental anterior",
   "Periostitis tibial (shin splints)",
   "Tendinopatía tibial anterior"
  ],
  "ejercicios": [
   "Dorsiflexión con banda elástica",
   "Caminar sobre los talones",
   "Estiramiento en flexión plantar"
  ],
  "fuentes": [
   "Wikipedia (en): Tibialis anterior muscle — https://en.wikipedia.org/wiki/Tibialis_anterior_muscle",
   "Wikipedia (es): Músculo tibial anterior — https://es.wikipedia.org/wiki/Músculo_tibial_anterior"
  ],
  "verificacion": "dos fuentes",
  "nota": "Corregido el origen a los dos tercios superiores (ambas fuentes). Wikipedia en indica L5 en la ficha; Wikipedia es no da raíces; se conserva L4-L5."
 },
 {
  "id": "tibial-posterior",
  "nombre": "Tibial posterior",
  "region": "pierna-pie",
  "vistas": [
   "posterior"
  ],
  "origen": "Membrana interósea, tibia y peroné posteriores.",
  "insercion": "Tuberosidad del navicular, cuñas, cuboides y bases de metatarsianos 2-4.",
  "accion": "Inversión del pie y flexión plantar; sostén del arco longitudinal medial.",
  "inervacion": "Nervio tibial (L4-L5).",
  "palpacion": "Inversión resistida con pie en flexión plantar; tendón detrás del maléolo medial.",
  "funcion": "Principal estabilizador dinámico del arco medial.",
  "condiciones": [
   "Disfunción del tendón tibial posterior (pie plano adquirido)",
   "Tendinopatía",
   "Síndrome de estrés tibial medial",
   "Síndrome del túnel tarsiano"
  ],
  "ejercicios": [
   "Inversión con banda",
   "Elevación de talón en doble apoyo con inversión",
   "Short foot (pie corto)"
  ],
  "fuentes": [
   "Wikipedia (en): Tibialis posterior muscle — https://en.wikipedia.org/wiki/Tibialis_posterior_muscle",
   "Wikipedia (es): Músculo tibial posterior — https://es.wikipedia.org/wiki/Músculo_tibial_posterior"
  ],
  "verificacion": "dos fuentes",
  "nota": "Wikipedia es indica L4-L5 (algunas fuentes L4-S1); Wikipedia en no da raíces. Inserción incluye además el sustentáculo del talus."
 },
 {
  "id": "peroneo-largo",
  "nombre": "Peroneo largo",
  "region": "pierna-pie",
  "vistas": [
   "lateral"
  ],
  "origen": "Cabeza y dos tercios proximales de la cara lateral del peroné.",
  "insercion": "Base del primer metatarsiano y cuña medial.",
  "accion": "Eversión del pie y flexión plantar; sostiene los arcos transverso y longitudinal.",
  "inervacion": "Nervio peroneo superficial (L5-S1).",
  "palpacion": "Eversión resistida; tendón detrás del maléolo lateral, en la pierna lateral.",
  "funcion": "Estabilizador lateral del tobillo y estabilizador del primer radio.",
  "condiciones": [
   "Esguince lateral de tobillo (debilidad residual)",
   "Tendinopatía peronea",
   "Subluxación del tendón peroneo",
   "Síndrome de peroneo largo"
  ],
  "ejercicios": [
   "Eversión con banda",
   "Equilibrio unipodal",
   "Elevación de talón en eversión"
  ],
  "fuentes": [
   "Wikipedia (en): Fibularis longus — https://en.wikipedia.org/wiki/Fibularis_longus",
   "Wikipedia (es): Músculo peroneo lateral largo — https://es.wikipedia.org/wiki/Músculo_peroneo_lateral_largo"
  ],
  "verificacion": "dos fuentes",
  "nota": "Raíces L5-S1 confirmadas por Wikipedia en; Wikipedia es no las da."
 },
 {
  "id": "peroneo-corto",
  "nombre": "Peroneo corto",
  "region": "pierna-pie",
  "vistas": [
   "lateral"
  ],
  "origen": "Dos tercios distales de la cara lateral del peroné.",
  "insercion": "Tuberosidad de la base del quinto metatarsiano.",
  "accion": "Eversión del pie y flexión plantar débil.",
  "inervacion": "Nervio peroneo superficial (L5-S1).",
  "palpacion": "Eversión resistida; tendón hacia la base del quinto metatarsiano, anterior al peroneo largo.",
  "funcion": "Principal evertor; protege frente a la inversión excesiva.",
  "condiciones": [
   "Esguince lateral de tobillo",
   "Rotura longitudinal del peroneo corto",
   "Fractura por avulsión de la base del quinto metatarsiano (pseudo-Jones)",
   "Tendinopatía peronea"
  ],
  "ejercicios": [
   "Eversión con banda",
   "Propiocepción en plano inestable",
   "Equilibrio unipodal"
  ],
  "fuentes": [
   "Wikipedia (en): Fibularis brevis — https://en.wikipedia.org/wiki/Fibularis_brevis",
   "Wikipedia (es): Músculo peroneo lateral corto — https://es.wikipedia.org/wiki/Músculo_peroneo_lateral_corto"
  ],
  "verificacion": "dos fuentes",
  "nota": "Ninguna fuente leída da las raíces; L5-S1 es el valor clásico (Gray). La avulsión de la tuberosidad es la fractura pseudo-Jones; la Jones verdadera es más distal."
 },
 {
  "id": "popliteo",
  "nombre": "Poplíteo",
  "region": "pierna-pie",
  "vistas": [
   "posterior"
  ],
  "origen": "Cóndilo lateral del fémur (surco poplíteo) y menisco lateral.",
  "insercion": "Cara posterior de la tibia, sobre la línea del sóleo.",
  "accion": "Flexiona la rodilla y la desbloquea: rotación externa del fémur (cadena cerrada) o interna de la tibia (cadena abierta).",
  "inervacion": "Nervio tibial (L5-S1).",
  "palpacion": "Profundo en la fosa poplítea; se palpa en la zona posterolateral con rotación interna tibial resistida.",
  "funcion": "\"Llave\" de la rodilla: inicia la flexión desde extensión completa; estabilizador posterolateral.",
  "condiciones": [
   "Tendinopatía poplítea",
   "Lesión posterolateral de rodilla",
   "Dolor posterolateral de rodilla en corredores"
  ],
  "ejercicios": [
   "Rotación interna activa de la tibia",
   "Sentadilla parcial con control",
   "Estiramiento suave de pantorrilla"
  ],
  "fuentes": [
   "Wikipedia (en): Popliteus muscle — https://en.wikipedia.org/wiki/Popliteus_muscle",
   "Wikipedia (es): Músculo poplíteo — https://es.wikipedia.org/wiki/Músculo_poplíteo"
  ],
  "verificacion": "dos fuentes",
  "nota": "Ambas fuentes dan L5-S1 (la base decía L4-S1, valor de algunos textos clásicos). Acción y condiciones ajustadas según las fuentes."
 },
 {
  "id": "flexor-largo-hallux",
  "nombre": "Flexor largo del hallux",
  "region": "pierna-pie",
  "vistas": [
   "posterior"
  ],
  "origen": "Dos tercios distales de la cara posterior del peroné y membrana interósea.",
  "insercion": "Base de la falange distal del hallux (dedo gordo).",
  "accion": "Flexión del hallux y flexión plantar del tobillo; sostiene el arco medial.",
  "inervacion": "Nervio tibial (S2-S3; algunas fuentes L5-S2).",
  "palpacion": "Flexionar el hallux; tendón bajo el sustentaculum tali y en la planta del pie, profundo.",
  "funcion": "Impulso final de la marcha y la danza; muy activo en el despegue del pie.",
  "condiciones": [
   "Tendinopatía del flexor largo del hallux (bailarines)",
   "Síndrome del túnel tarsiano",
   "Hallux rigidus asociado"
  ],
  "ejercicios": [
   "Flexión activa del hallux con resistencia",
   "Elevación de talón en puntillas",
   "Short foot (pie corto)"
  ],
  "fuentes": [
   "Wikipedia (en): Flexor hallucis longus muscle — https://en.wikipedia.org/wiki/Flexor_hallucis_longus_muscle",
   "Wikipedia (es): Músculo flexor largo del dedo gordo — https://es.wikipedia.org/wiki/Músculo_flexor_largo_del_dedo_gordo"
  ],
  "verificacion": "dos fuentes",
  "nota": "Wikipedia en indica S2-S3; Wikipedia es no da raíces. Algunos textos citan L5-S2."
 },
 {
  "id": "extensor-largo-hallux",
  "nombre": "Extensor largo del hallux",
  "region": "pierna-pie",
  "vistas": [
   "anterior"
  ],
  "origen": "Parte media de la cara anterior del peroné y membrana interósea adyacente.",
  "insercion": "Base de la falange distal del hallux (dedo gordo).",
  "accion": "Extensión del hallux y dorsiflexión del tobillo.",
  "inervacion": "Nervio peroneo profundo (L5, con rango L4-S1).",
  "palpacion": "Extender el hallux contra resistencia; tendón en el dorso del pie, lateral al tibial anterior.",
  "funcion": "Mantiene el hallux libre del suelo durante la fase de balanceo; valioso en pruebas de L5.",
  "condiciones": [
   "Lesión de la raíz L5",
   "Tendinopatía",
   "Síndrome compartimental anterior",
   "Pie caído"
  ],
  "ejercicios": [
   "Extensión del hallux contra banda",
   "Dorsiflexión con banda",
   "Caminar sobre talones"
  ],
  "fuentes": [
   "Wikipedia (en): Extensor hallucis longus muscle — https://en.wikipedia.org/wiki/Extensor_hallucis_longus_muscle",
   "Wikipedia (es): Músculo extensor largo del dedo gordo — https://es.wikipedia.org/wiki/Músculo_extensor_largo_del_dedo_gordo"
  ],
  "verificacion": "dos fuentes",
  "nota": "Corregido el origen (cara anterior, no medial, del peroné). Wikipedia en: raíz L5 (ficha L4-S1); Wikipedia es no da raíces."
 }
];
