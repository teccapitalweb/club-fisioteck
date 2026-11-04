/* Club FisioTeck — Atlas: 100 fichas de estructuras (50 huesos, 33 arterias y 17 venas). Cubren todos los huesos, arterias y venas que muestra el visor 3D (campo "nombres" = nombre en el visor).
   Cada ficha se resumió con palabras propias a partir de páginas de anatomía consultadas en línea (Wikipedia, Kenhub, TeachMeAnatomy, OrthoInfo, NHS y otras).
   Varios datos clínicos y de palpación son redacción de anatomía clínica habitual sin una fuente específica (ver FICHAS-ATLAS-DUDAS.md).
   Campos: id, nombre, tipo (hueso | arteria | vena | nervio | articulacion | ligamento), zona (head, shoulders, chest, arms, core, back, hip, thigh, knee, leg, foot), nombres, descripcion, referencias, relaciones, lesiones, fisio, fuentes, verificacion. */
(window.FT_ATLAS_ESTR = window.FT_ATLAS_ESTR || []).push(...[
 {
  "id": "hueso-occipital",
  "nombre": "Hueso occipital",
  "tipo": "hueso",
  "zona": "head",
  "nombres": [
   "Occipital"
  ],
  "descripcion": "Hueso impar que forma la parte posterior e inferior del cráneo y rodea el agujero magno, por donde pasa la médula. Sirve de unión entre el cráneo y la columna cervical.",
  "referencias": [
   "Protuberancia occipital externa: prominencia en la línea media de la nuca; su punto más alto es el inion.",
   "Línea nucal superior: cresta curva que sale de la protuberancia hacia cada lado; se palpa deslizando los dedos lateralmente desde el inion.",
   "Cresta occipital externa (línea nucal media): baja en la línea media hacia el agujero magno, por donde se inserta el ligamento nucal.",
   "Los cóndilos occipitales y el agujero magno no se palpan; son profundos."
  ],
  "relaciones": [
   "Se articula con el atlas (C1) por los cóndilos occipitales: articulación atlantooccipital, donde ocurre sobre todo el asentimiento.",
   "Suturas: lambdoidea con los parietales y occipitomastoidea con el temporal; por delante se une al esfenoides.",
   "En la línea nucal superior se insertan trapecio, esplenio de la cabeza y occipital; en la inferior, los rectos posteriores mayor y menor de la cabeza.",
   "En la parte basilar se insertan el largo de la cabeza y el recto anterior; el ligamento nucal se ancla en la línea media."
  ],
  "lesiones": [
   "Fractura de la base del cráneo tras un golpe en la región occipital.",
   "Lesiones de la unión craneocervical (disociación atlantooccipital) en traumatismos de alta energía.",
   "Cefalea cervicogénica u occipital por tensión de la musculatura suboccipital y nucal que se inserta en las líneas nucales.",
   "Infección del cuero cabelludo que puede extenderse al interior del cráneo por las venas emisarias."
  ],
  "fisio": [
   "Al palpar la inserción de los músculos suboccipitales, usar presión gradual: la zona es sensible y la cefalea occipital es frecuente.",
   "Tras un golpe en la nuca con mareo, vómito, sangrado por oído o nariz o cambios neurológicos, remitir antes de tratar.",
   "Evitar movilizaciones cervicales superiores forzadas si hay sospecha de lesión de la unión craneocervical."
  ],
  "fuentes": [
   "Wikipedia (inglés): Occipital bone — https://en.wikipedia.org/wiki/Occipital_bone",
   "TeachMeAnatomy: Occipital bone — https://teachmeanatomy.info/head/osteology/occipital-bone/",
   "Wikipedia (español): Hueso occipital — https://es.wikipedia.org/wiki/Hueso_occipital"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-frontal",
  "nombre": "Hueso frontal",
  "tipo": "hueso",
  "zona": "head",
  "nombres": [
   "Frontal"
  ],
  "descripcion": "Hueso impar que forma la frente y la parte superior de las órbitas. Contiene los senos frontales y protege la parte anterior del cerebro.",
  "referencias": [
   "Glabela: elevación lisa en la línea media entre las cejas.",
   "Arcos superciliares: relieves a cada lado de la glabela, bajo las cejas.",
   "Muesca o agujero supraorbitario en el reborde superior de la órbita: se siente como una pequeña depresión por donde salen vasos y nervios.",
   "Proceso cigomático (apófisis orbitaria externa): extremo lateral del reborde orbitario, donde empieza a continuar el pómulo."
  ],
  "relaciones": [
   "Se articula con los parietales por la sutura coronal, y con esfenoides, etmoides, nasales, maxilares, lagrimales y cigomáticos.",
   "Las láminas orbitarias se unen a las alas menores del esfenoides.",
   "Se insertan el músculo occipitofrontal y fascículos superiores del temporal en las caras laterales.",
   "Los senos frontales se desarrollan en la infancia y maduran después de la pubertad."
  ],
  "lesiones": [
   "Fracturas por golpe directo en la frente, a veces con afectación del seno frontal.",
   "Fracturas del reborde u órbita con posible lesión de nervios supraorbitarios y alteración de la sensibilidad de la frente.",
   "Hematoma y heridas del cuero cabelludo frontal por caídas o impactos deportivos."
  ],
  "fisio": [
   "Tras un golpe en la frente, vigilar vómito, somnolencia, confusión o secreción nasal clara y derivar.",
   "Palpar con suavidad el reborde supraorbitario; la presión fuerte sobre la muesca puede provocar dolor intenso.",
   "En cefaleas frontales, descartar primero señales de alarma antes de atribuirlas a tensión muscular."
  ],
  "fuentes": [
   "Wikipedia (inglés): Frontal bone — https://en.wikipedia.org/wiki/Frontal_bone",
   "Wikipedia (español): Hueso frontal — https://es.wikipedia.org/wiki/Hueso_frontal"
  ],
  "verificacion": "una fuente"
 },
 {
  "id": "hueso-esfenoides",
  "nombre": "Hueso esfenoides",
  "tipo": "hueso",
  "zona": "head",
  "nombres": [
   "Esfenoides"
  ],
  "descripcion": "Hueso impar en forma de mariposa situado en la base del cráneo, que une el cráneo con los huesos de la cara. Aloja la silla turca con la hipófisis y da origen a los músculos pterigoideos.",
  "referencias": [
   "Es profundo y casi no se palpa; solo el ala mayor aflora en la sien (región del pterion), entre frontal, parietal y temporal.",
   "En la fosa temporal, la zona del pterion se ubica aproximadamente dos dedos por encima del arco cigomático y un dedo por detrás del borde lateral de la órbita.",
   "Las apófisis pterigoides y la silla turca son profundas y no se palpan desde la superficie."
  ],
  "relaciones": [
   "Se articula con frontal, parietales, temporales, occipital, etmoides, cigomáticos, palatinos y vómer.",
   "Las alas mayores y menores forman parte de la órbita; por el cuerpo y las alas pasan los nervios craneales (fisura orbitaria superior, agujeros redondo y oval).",
   "El pterigoideo lateral se inserta en la lámina lateral de la apófisis pterigoides y el pterigoideo medial en la fosa pterigoidea.",
   "El gancho (hámulo) de la lámina medial recibe al buccinador y al constrictor superior de la faringe."
  ],
  "lesiones": [
   "Fracturas de la base del cráneo que pasan por el esfenoides, con riesgo de lesión de nervios craneales o fuga de líquido cefalorraquídeo.",
   "Traumatismo en el pterion: puede lesionar la arteria meníngea media y producir un hematoma epidural.",
   "Tumores o lesiones de la silla turca que afectan la hipófisis o el quiasma óptico."
  ],
  "fisio": [
   "Un golpe en la sien con pérdida de conciencia breve seguida de mejoría y luego somnolencia es una urgencia: derivar de inmediato.",
   "Las técnicas craneales o intraorales sobre esta zona solo deben hacerse con formación específica y sin fuerza.",
   "Si hay disfunción de la articulación temporomandibular, recordar que los pterigoideos nacen de este hueso."
  ],
  "fuentes": [
   "Wikipedia (inglés): Sphenoid bone — https://en.wikipedia.org/wiki/Sphenoid_bone",
   "Wikipedia (español): Hueso esfenoides — https://es.wikipedia.org/wiki/Hueso_esfenoides",
   "TeachMeAnatomy: Temporal bone (pterion) — https://teachmeanatomy.info/head/osteology/temporal-bone/"
  ],
  "verificacion": "una fuente"
 },
 {
  "id": "hueso-temporal",
  "nombre": "Hueso temporal",
  "tipo": "hueso",
  "zona": "head",
  "nombres": [
   "Temporal"
  ],
  "descripcion": "Hueso par de la parte lateral e inferior del cráneo que contiene el oído medio e interno. Forma, con la mandíbula, la articulación temporomandibular.",
  "referencias": [
   "Apófisis mastoides: prominencia ósea detrás de la oreja, fácil de palpar.",
   "Arco cigomático: se palpa en la mejilla, delante de la oreja, siguiendo la apófisis cigomática hasta el pómulo.",
   "Cóndilo de la mandíbula frente al conducto auditivo externo: al abrir y cerrar la boca se siente moverse justo delante del trago.",
   "Fosa temporal (sien): zona hundida sobre el arco cigomático donde se palpa el músculo temporal al apretar los dientes."
  ],
  "relaciones": [
   "Articulación temporomandibular con la mandíbula: fosa mandibular y tubérculo articular del temporal.",
   "Suturas con parietal (escamosa), occipital, esfenoides y cigomático.",
   "Temporal en la porción escamosa, masetero en la apófisis cigomática; esternocleidomastoideo, esplenio de la cabeza y vientre posterior del digástrico en la mastoides.",
   "La apófisis estiloides da origen a estilogloso, estilohioideo y estilofaríngeo."
  ],
  "lesiones": [
   "Fractura del hueso temporal por traumatismo contuso, con pérdida de audición, vértigo, parálisis facial o sangrado por el oído.",
   "Fractura en el pterion con lesión de la arteria meníngea media y hematoma epidural.",
   "Mastoiditis, complicación de una infección del oído medio.",
   "Trastornos de la articulación temporomandibular (desplazamiento del disco, dolor miofascial)."
  ],
  "fisio": [
   "Para evaluar la ATM, palpar delante del trago mientras el paciente abre y cierra: valorar simetría, chasquidos y límite de apertura.",
   "Dolor, hinchazón y enrojecimiento sobre la mastoides con fiebre o secreción del oído requieren derivación médica.",
   "Después de un golpe en la sien con cefalea progresiva o somnolencia, no tratar: urgencia."
  ],
  "fuentes": [
   "Wikipedia (inglés): Temporal bone — https://en.wikipedia.org/wiki/Temporal_bone",
   "TeachMeAnatomy: Temporal bone — https://teachmeanatomy.info/head/osteology/temporal-bone/",
   "Wikipedia (español): Hueso temporal — https://es.wikipedia.org/wiki/Hueso_temporal",
   "Wikipedia (inglés): Temporomandibular joint — https://en.wikipedia.org/wiki/Temporomandibular_joint"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-parietal",
  "nombre": "Hueso parietal",
  "tipo": "hueso",
  "zona": "head",
  "nombres": [
   "Parietal"
  ],
  "descripcion": "Hueso par, plano y cuadrilátero, que forma gran parte del techo y los lados de la bóveda craneal. Protege el cerebro y sirve de punto de unión para fascias y para el músculo temporal.",
  "referencias": [
   "Giba parietal: abultamiento redondeado en la parte lateral y superior de la cabeza.",
   "Líneas temporales superior e inferior: crestas curvas que se pueden sentir sobre el lado de la cabeza por encima de la sien.",
   "Bregma y lambda: puntos donde se cruzan las suturas coronal y sagital (bregma, adelante) y sagital y lambdoidea (lambda, atrás); se localizan como surcos leves en la línea media.",
   "Pterion: zona de la sien donde se encuentran parietal, frontal, temporal y esfenoides."
  ],
  "relaciones": [
   "Se articula con el parietal opuesto (sutura sagital), con el frontal (coronal), con el occipital (lambdoidea) y con el temporal (escamosa).",
   "El músculo temporal nace por debajo de la línea temporal inferior; la fascia temporal se une a la línea superior.",
   "La galea aponeurótica cubre el hueso por encima de las líneas temporales.",
   "Por su cara interna pasan los surcos de la arteria meníngea media."
  ],
  "lesiones": [
   "Fractura por golpe directo; en la sien puede romper la arteria meníngea media y causar hematoma epidural.",
   "Craneosinostosis o deformidades de la forma de la cabeza en lactantes.",
   "Hematomas y laceraciones del cuero cabelludo."
  ],
  "fisio": [
   "En bebés, las fontanelas (bregma y lambda) son blandas: no hacer presión en esa zona.",
   "Ante una caída o golpe en la cabeza con vómito, confusión o somnolencia, derivar sin tratar.",
   "Al palpar el temporal en bruxismo o cefalea tensional, buscar puntos dolorosos y asimetría sin presión excesiva."
  ],
  "fuentes": [
   "Wikipedia (inglés): Parietal bone — https://en.wikipedia.org/wiki/Parietal_bone",
   "Wikipedia (español): Hueso parietal — https://es.wikipedia.org/wiki/Hueso_parietal"
  ],
  "verificacion": "una fuente"
 },
 {
  "id": "hueso-mandibula",
  "nombre": "Mandíbula",
  "tipo": "hueso",
  "zona": "head",
  "nombres": [
   "Mandíbula"
  ],
  "descripcion": "Único hueso móvil del cráneo, en forma de herradura, que sostiene los dientes inferiores. Permite masticar, hablar y abrir la boca por su articulación con el temporal.",
  "referencias": [
   "Mentón (protuberancia mentoniana): saliente de la línea media del cuerpo.",
   "Borde inferior del cuerpo: se recorre con los dedos hasta el ángulo mandibular (gonion), esquina posterior e inferior.",
   "Cóndilo: se palpa delante del trago al abrir y cerrar la boca.",
   "Rama y apófisis coronoides: la rama se siente bajo el masetero; la coronoides se palpa con dificultad, por dentro de la mejilla o sobre el arco cigomático."
  ],
  "relaciones": [
   "Forma la articulación temporomandibular con el temporal (fosa mandibular y tubérculo articular), con un disco de fibrocartílago entre ambos.",
   "Temporal en la apófisis coronoides, masetero en la cara externa de la rama, pterigoideo medial en la cara interna y pterigoideo lateral en el cuello del cóndilo.",
   "Digástrico, milohioideo, geniohioideo y geniogloso se insertan en la cara interna y el borde inferior.",
   "Ligamentos accesorios de la ATM: temporomandibular, esfenomandibular y estilomandibular."
  ],
  "lesiones": [
   "Fracturas del cuello del cóndilo, ángulo, cuerpo y sínfisis; a menudo hay una segunda fractura en el lado opuesto.",
   "Luxación de la ATM, casi siempre hacia delante y abajo.",
   "Desplazamiento del disco articular y trastornos temporomandibulares con dolor miofascial.",
   "Maloclusión y desvío lateral tras una fractura mal consolidada."
  ],
  "fisio": [
   "Al examinar la ATM, observar desvío al abrir, apertura máxima, chasquidos y dolor en masetero y pterigoideos.",
   "Tras un golpe en el mentón, sospechar fractura del cóndilo aunque la mandíbula parezca normal; derivar si hay mala oclusión o dolor intenso.",
   "Evitar maniobras de tracción o movilización forzada si hay luxación reciente o fractura no descartada."
  ],
  "fuentes": [
   "TeachMeAnatomy: Mandible — https://teachmeanatomy.info/head/osteology/mandible/",
   "Wikipedia (inglés): Mandible — https://en.wikipedia.org/wiki/Mandible",
   "Wikipedia (español): Mandíbula — https://es.wikipedia.org/wiki/Mand%C3%ADbula",
   "Wikipedia (inglés): Temporomandibular joint — https://en.wikipedia.org/wiki/Temporomandibular_joint"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-maxilar",
  "nombre": "Maxilar",
  "tipo": "hueso",
  "zona": "head",
  "nombres": [
   "Maxilar"
  ],
  "descripcion": "Hueso par de la parte media de la cara. Forma la mandíbula superior, parte del paladar, del suelo de la órbita y de la pared lateral de la nariz, y contiene el seno maxilar.",
  "referencias": [
   "Reborde infraorbitario: se palpa como el borde óseo bajo el ojo.",
   "Agujero infraorbitario: depresión pequeña aproximadamente un centímetro bajo el reborde, donde sale el nervio infraorbitario.",
   "Proceso alveolar: se siente por encima de los dientes superiores, bajo el labio.",
   "Espina nasal anterior y escotadura nasal: se aprecian en la base de la nariz, sobre el labio superior."
  ],
  "relaciones": [
   "Se articula con el maxilar opuesto en la sutura intermaxilar y con frontal, nasal, lagrimal, cigomático, etmoides, palatino, vómer y cornete inferior.",
   "La apófisis cigomática se une al hueso del pómulo; la apófisis palatina forma gran parte del paladar duro.",
   "En el reborde infraorbitario se inserta el orbicular de los ojos; en la fosa canina nace el elevador del ángulo de la boca.",
   "El seno maxilar se abre a la cavidad nasal."
  ],
  "lesiones": [
   "Fracturas de Le Fort I (horizontal), II (piramidal) y III (disyunción craneofacial) por traumatismo facial.",
   "Lesión del nervio infraorbitario con pérdida de sensibilidad en mejilla y labio superior.",
   "Sinusitis maxilar con dolor facial que puede confundirse con dolor muscular o dental."
  ],
  "fisio": [
   "Dolor facial con congestión, fiebre y sensibilidad sobre el pómulo sugiere sinusitis, no un problema muscular.",
   "Tras un golpe facial con cambios en la mordida o visión doble, derivar sin tratar.",
   "Al palpar el agujero infraorbitario, aplicar poca presión por la sensibilidad del nervio."
  ],
  "fuentes": [
   "Wikipedia (inglés): Maxilla — https://en.wikipedia.org/wiki/Maxilla",
   "TeachMeAnatomy: Maxilla — https://teachmeanatomy.info/head/osteology/maxilla/",
   "Wikipedia (español): Hueso maxilar — https://es.wikipedia.org/wiki/Hueso_maxilar"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-cigomatico",
  "nombre": "Hueso cigomático (pómulo)",
  "tipo": "hueso",
  "zona": "head",
  "nombres": [
   "Cigomático"
  ],
  "descripcion": "Hueso par, corto y compacto, que forma el pómulo y parte de la pared lateral y el suelo de la órbita. Con el temporal forma el arco cigomático.",
  "referencias": [
   "Prominencia del pómulo: se palpa claramente en la mejilla bajo el ángulo lateral del ojo.",
   "Arco cigomático: se sigue hacia atrás con los dedos hasta la zona delante de la oreja.",
   "Reborde orbitario inferior y lateral: continuidad del borde óseo del ojo."
  ],
  "relaciones": [
   "Se articula con frontal, esfenoides (ala mayor), maxilar y temporal.",
   "En el borde posteroinferior se inserta el masetero; en la cara externa, los cigomáticos mayor y menor y el elevador del labio superior.",
   "La fascia temporal se une al borde posterosuperior y el ligamento palpebral lateral al tubérculo orbitario."
  ],
  "lesiones": [
   "Fractura del complejo cigomático (cigomaticomaxilar, o fractura en trípode) por golpe en la mejilla.",
   "Fractura aislada del arco cigomático, que puede limitar la apertura bucal al rozar la apófisis coronoides.",
   "Lesión del nervio infraorbitario con adormecimiento de la mejilla."
  ],
  "fisio": [
   "Tras un golpe en el pómulo con aplanamiento, visión doble o dificultad para abrir la boca, derivar.",
   "El masetero nace aquí; palpar su inserción al valorar dolor facial o disfunción de la ATM.",
   "Evitar presión directa sobre una zona con hematoma o dolor agudo hasta descartar fractura."
  ],
  "fuentes": [
   "Wikipedia (inglés): Zygomatic bone — https://en.wikipedia.org/wiki/Zygomatic_bone",
   "Wikipedia (español): Hueso cigomático — https://es.wikipedia.org/wiki/Hueso_cigom%C3%A1tico"
  ],
  "verificacion": "una fuente"
 },
 {
  "id": "vertebras-cervicales-tipicas",
  "nombre": "Vértebras cervicales típicas (C3 a C6)",
  "tipo": "hueso",
  "zona": "back",
  "nombres": [
   "Vértebra cervical C3",
   "Vértebra cervical C4",
   "Vértebra cervical C5",
   "Vértebra cervical C6"
  ],
  "descripcion": "Vértebras pequeñas del cuello, de cuerpo ancho y poco alto, con apófisis espinosa corta y bífida y un agujero en cada apófisis transversa. Dan al cuello su gran movilidad.",
  "referencias": [
   "Las apófisis espinosas de C3 a C5 son cortas y profundas, por lo que se palpan mal; los pilares articulares se sienten a 2 o 3 cm de la línea media.",
   "Nivel C3: hueso hioides; C4-C5: cartílago tiroides; C6: cartílago cricoides.",
   "C6 tiene un tubérculo anterior prominente (tubérculo carotídeo o de Chassaignac) contra el que se puede sentir el pulso carotídeo.",
   "Para contar niveles, partir de la apófisis espinosa prominente de C7 y subir."
  ],
  "relaciones": [
   "Los cuerpos se unen por discos intervertebrales y las carillas articulares planas forman articulaciones facetarias.",
   "Los agujeros transversos de C1 a C6 dan paso a la arteria y vena vertebrales.",
   "El ligamento nucal se une a las espinosas; trapecio y esplenio de la cabeza dependen de él.",
   "Diferencias: C6 tiene el tubérculo carotídeo más saliente y por su agujero transverso pasa la arteria vertebral; C4 y C5 son las más afectadas en traumatismos cervicales."
  ],
  "lesiones": [
   "Lesión por latigazo o esguince cervical.",
   "Fracturas y luxaciones facetarias, sobre todo en C4-C5 y C5-C6, tras accidentes o zambullidas.",
   "Espondilosis cervical (artrosis, osteofitos y disco más delgado) con compresión de raíces nerviosas.",
   "Lesión medular con riesgo de afectar el diafragma en los niveles cervicales altos."
  ],
  "fisio": [
   "Antes de manipular el cuello, descartar signos de inestabilidad o compromiso vascular: mareo intenso, visión doble, dificultad para hablar o tragar, náusea.",
   "Tras un traumatismo, aplicar criterios clínicos (como la regla canadiense de columna cervical) y derivar a imagen antes de movilizar.",
   "Evitar presionar con fuerza la zona anterolateral del cuello: allí pasa la arteria carótida.",
   "Dolor cervical con hormigueo, debilidad o pérdida de fuerza en la mano sugiere afectación radicular; valorar niveles."
  ],
  "fuentes": [
   "Wikipedia (inglés): Cervical vertebrae — https://en.wikipedia.org/wiki/Cervical_vertebrae",
   "Wikipedia (inglés): Vertebra prominens — https://en.wikipedia.org/wiki/Vertebra_prominens",
   "TeachMeAnatomy: Vertebral column — https://teachmeanatomy.info/back/bones/vertebral-column/",
   "Wikipedia (español): Vértebras cervicales — https://es.wikipedia.org/wiki/V%C3%A9rtebras_cervicales"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "vertebra-c7",
  "nombre": "Vértebra C7 (prominente)",
  "tipo": "hueso",
  "zona": "back",
  "nombres": [
   "Vértebra cervical C7"
  ],
  "descripcion": "Séptima vértebra cervical, de transición entre el cuello y el tórax. Su apófisis espinosa es larga, gruesa y no bifurcada, y es la más visible y palpable de la nuca.",
  "referencias": [
   "Apófisis espinosa de C7: es la saliente grande en la base del cuello; se palpa mejor con el cuello en flexión.",
   "Para distinguirla de T1: al extender el cuello C7 tiende a desaparecer bajo el dedo mientras T1 se mantiene fija.",
   "Sirve de punto de partida para contar el resto de las vértebras."
  ],
  "relaciones": [
   "Se articula con C6 arriba y T1 abajo, por discos y articulaciones facetarias.",
   "Su espinosa termina en un tubérculo donde se ancla el ligamento nucal; allí también se insertan músculos como el trapecio.",
   "Su agujero transverso puede ser pequeño, doble o faltar; la arteria vertebral normalmente no pasa por él.",
   "Puede portar una costilla cervical en algunas personas."
  ],
  "lesiones": [
   "Fractura por tracción de la espinosa (fractura del palero) por esfuerzos repetidos con flexión.",
   "Lesiones en la unión cervicotorácica por traumatismo, de difícil diagnóstico en radiografía simple.",
   "Costilla cervical que comprime plexo braquial o vasos y causa síndrome del desfiladero torácico.",
   "Hernia de disco C6-C7, causa común de radiculopatía."
  ],
  "fisio": [
   "Dolor local sobre C7 con hormigueo en el brazo o la mano, sobre todo en los dedos medios, sugiere afectación radicular y requiere valoración neurológica.",
   "Sensibilidad en esta zona es frecuente por postura de cabeza adelantada; valorar la postura global antes de aplicar presión.",
   "Si hay pulso débil, frialdad o cambios de color en el brazo, pensar en compresión vascular y derivar."
  ],
  "fuentes": [
   "Wikipedia (inglés): Vertebra prominens — https://en.wikipedia.org/wiki/Vertebra_prominens",
   "Wikipedia (inglés): Cervical vertebrae — https://en.wikipedia.org/wiki/Cervical_vertebrae",
   "Wikipedia (español): Vértebras cervicales — https://es.wikipedia.org/wiki/V%C3%A9rtebras_cervicales",
   "TeachMeAnatomy: Vertebral column — https://teachmeanatomy.info/back/bones/vertebral-column/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "vertebras-toracicas-superiores",
  "nombre": "Vértebras torácicas T1 a T4",
  "tipo": "hueso",
  "zona": "back",
  "nombres": [
   "Vértebra torácica T1",
   "Vértebra torácica T2",
   "Vértebra torácica T3",
   "Vértebra torácica T4"
  ],
  "descripcion": "Primeras cuatro vértebras del tórax, que se articulan con las costillas superiores y forman la transición desde el cuello. T1 se parece a una cervical por su cuerpo y su espinosa larga.",
  "referencias": [
   "La espinosa de T1 es larga y casi horizontal, justo debajo de C7.",
   "T3 queda aproximadamente a la altura de la espina de la escápula.",
   "T4 se ubica a la altura del ángulo esternal.",
   "Las espinosas se palpan en la línea media; las transversas se sienten a 2 o 3 cm hacia los lados, bajo los músculos erectores."
  ],
  "relaciones": [
   "T1 tiene una fosita completa para la cabeza de la 1.ª costilla y media fosita para la 2.ª; T2 a T4 llevan hemifacetas superior e inferior.",
   "Las carillas de las apófisis transversas se articulan con los tubérculos costales (costotransversas).",
   "Forman las articulaciones costovertebrales con las costillas 1 a 4 y facetarias con las vértebras vecinas.",
   "Tronco y cuello se unen aquí; trapecio, romboides y erectores espinales se insertan en las espinosas y transversas."
  ],
  "lesiones": [
   "Fracturas por compresión en personas con osteoporosis o por traumatismo.",
   "Disfunciones costovertebrales con dolor interescapular o punzante al respirar.",
   "Cifosis torácica aumentada con postura de espalda encorvada.",
   "Dolor referido de origen visceral (corazón, pulmón) confundido con dolor de espalda."
  ],
  "fisio": [
   "Dolor torácico con falta de aire, sudoración o dolor que se irradia al brazo o a la mandíbula no es de origen mecánico: derivar de inmediato.",
   "Valorar la expansión torácica y el dolor al respirar profundo para detectar disfunción costal.",
   "En adultos mayores, prudencia con la presión directa y los empujes sobre la columna por riesgo de fractura osteoporótica."
  ],
  "fuentes": [
   "Wikipedia (inglés): Thoracic vertebrae — https://en.wikipedia.org/wiki/Thoracic_vertebrae",
   "TeachMeAnatomy: Vertebral column — https://teachmeanatomy.info/back/bones/vertebral-column/",
   "Wikipedia (español): Vértebras torácicas — https://es.wikipedia.org/wiki/V%C3%A9rtebras_tor%C3%A1cicas"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "vertebras-toracicas-medias",
  "nombre": "Vértebras torácicas T5 a T8",
  "tipo": "hueso",
  "zona": "back",
  "nombres": [
   "Vértebra torácica T5",
   "Vértebra torácica T6",
   "Vértebra torácica T7",
   "Vértebra torácica T8"
  ],
  "descripcion": "Vértebras torácicas medias, típicas, con cuerpo en forma de corazón y espinosas largas que se inclinan hacia abajo y se superponen. Constituyen el centro de la cifosis torácica y casi no rotan por su unión con las costillas.",
  "referencias": [
   "T5 queda a la altura del ángulo esternal, donde suele dividirse la tráquea.",
   "T7 corresponde al ángulo inferior de la escápula con los brazos a los lados.",
   "T8 se sitúa a la altura de la apófisis xifoides, junto con T9.",
   "Las espinosas son oblicuas: la punta queda más abajo que el cuerpo, por lo que conviene contar la punta de la espinosa por debajo de su vértebra."
  ],
  "relaciones": [
   "Tienen hemifacetas superior e inferior en el cuerpo para las cabezas de las costillas y una carilla transversa para el tubérculo costal.",
   "Cada costilla se articula con su vértebra y la superior (costovertebral y costotransversa).",
   "Trapecio medio e inferior, romboides y erectores espinales se insertan o pasan por aquí.",
   "Discos más delgados que los lumbares, lo que limita la movilidad."
  ],
  "lesiones": [
   "Fractura por compresión del cuerpo vertebral.",
   "Cifosis aumentada y enfermedad de Scheuermann en adolescentes.",
   "Escoliosis, con rotación vertebral y giba costal.",
   "Dolor entre las escápulas por postura sostenida o disfunción costovertebral."
  ],
  "fisio": [
   "Para ubicar niveles, usar la escápula y el ángulo esternal solo como referencia aproximada; varían entre personas.",
   "Dolor torácico medio que no cambia con el movimiento y se acompaña de síntomas generales, digestivos o respiratorios requiere valoración médica.",
   "En las movilizaciones torácicas, respetar el límite de la caja torácica y evitar empujes bruscos en personas con osteoporosis."
  ],
  "fuentes": [
   "Wikipedia (inglés): Thoracic vertebrae — https://en.wikipedia.org/wiki/Thoracic_vertebrae",
   "TeachMeAnatomy: Vertebral column — https://teachmeanatomy.info/back/bones/vertebral-column/",
   "Wikipedia (español): Vértebras torácicas — https://es.wikipedia.org/wiki/V%C3%A9rtebras_tor%C3%A1cicas"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "vertebras-toracicas-inferiores",
  "nombre": "Vértebras torácicas T9 a T12",
  "tipo": "hueso",
  "zona": "back",
  "nombres": [
   "Vértebra torácica T9",
   "Vértebra torácica T10",
   "Vértebra torácica T11",
   "Vértebra torácica T12"
  ],
  "descripcion": "Últimas cuatro vértebras torácicas, cuyo aspecto se acerca al de las lumbares conforme se desciende. Permiten más movimiento y soportan más carga que las superiores.",
  "referencias": [
   "T9 queda aproximadamente a la altura de la apófisis xifoides.",
   "T12 marca la unión toracolumbar: es la vértebra a la altura de la inserción de la 12.ª costilla.",
   "Las espinosas de T11 y T12 son más cortas y casi horizontales, más fáciles de palpar y de confundir con las lumbares.",
   "La 12.ª costilla se palpa en el flanco y sirve para ubicar T12 de forma aproximada."
  ],
  "relaciones": [
   "T9 puede no tener hemifacetas inferiores; T10 solo una faceta completa y T11 y T12 también una faceta completa en el cuerpo.",
   "T11 y T12 carecen de facetas en las apófisis transversas, por lo que las costillas flotantes no tienen unión costotransversa.",
   "T12 tiene carillas articulares inferiores convexas y orientadas hacia fuera, como las lumbares.",
   "En esta zona nacen fibras del diafragma y se insertan erectores espinales y dorsal ancho."
  ],
  "lesiones": [
   "Fracturas por compresión o por estallido en la unión toracolumbar, el sitio más frecuente de lesión vertebral por traumatismo.",
   "Fractura osteoporótica por compresión con dolor agudo de espalda.",
   "Dolor toracolumbar por restricción de la movilidad de la unión T12-L1.",
   "Dolor referido desde riñón o estructuras abdominales."
  ],
  "fisio": [
   "Dolor en la zona toracolumbar con fiebre, hematuria o dolor que no cambia con el movimiento: derivar.",
   "En adultos mayores o con osteoporosis, evitar rotaciones forzadas y empujes porque la unión toracolumbar es vulnerable.",
   "Tras una caída o accidente con dolor puntual sobre la espinosa, no movilizar sin imagen previa."
  ],
  "fuentes": [
   "Wikipedia (inglés): Thoracic vertebrae — https://en.wikipedia.org/wiki/Thoracic_vertebrae",
   "TeachMeAnatomy: Vertebral column — https://teachmeanatomy.info/back/bones/vertebral-column/",
   "Wikipedia (español): Vértebras torácicas — https://es.wikipedia.org/wiki/V%C3%A9rtebras_tor%C3%A1cicas"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "vertebras-lumbares-l1-l4",
  "nombre": "Vértebras lumbares L1 a L4",
  "tipo": "hueso",
  "zona": "back",
  "nombres": [
   "Vértebra lumbar L1",
   "Vértebra lumbar L2",
   "Vértebra lumbar L3",
   "Vértebra lumbar L4"
  ],
  "descripcion": "Las vértebras más grandes y robustas de la columna móvil. Tienen cuerpo en forma de riñón, espinosa cuadrilátera casi horizontal y soportan la mayor carga, con buena flexión y extensión.",
  "referencias": [
   "La cresta ilíaca, en su punto más alto, se alinea con la espinosa de L4 (línea de Tuffier, aproximadamente entre L4 y L5).",
   "Las espinosas son anchas y horizontales, fáciles de palpar en la línea media; los espacios entre ellas se perciben al flexionar.",
   "L1 se sitúa en el plano transpilórico, cerca del extremo anterior de la 9.ª costilla.",
   "Se pueden palpar las masas de los erectores espinales a ambos lados de la línea media."
  ],
  "relaciones": [
   "Los cuerpos se unen por discos grandes; las carillas superiores son cóncavas y miran atrás y adentro, las inferiores son convexas y miran adelante y afuera.",
   "Psoas mayor, diafragma, multífido y erectores espinales se insertan o pasan aquí; la apófisis mamilar recibe al multífido.",
   "Las apófisis transversas son largas y delgadas, y sirven de inserción al cuadrado lumbar y al psoas.",
   "El canal vertebral es triangular; la médula termina hacia L1-L2 y debajo continúa la cola de caballo."
  ],
  "lesiones": [
   "Hernia discal, sobre todo posterolateral, con radiculopatía.",
   "Fractura por compresión o por estallido, especialmente en L1 por la unión toracolumbar.",
   "Estenosis del canal lumbar y espondilosis.",
   "Lumbalgia mecánica inespecífica, la causa de consulta más común."
  ],
  "fisio": [
   "Señales de alarma: pérdida de control de esfínteres, adormecimiento en la zona genital o en la parte interna de los muslos, debilidad progresiva en las piernas; remitir de inmediato (síndrome de cola de caballo).",
   "Dolor lumbar con antecedente de cáncer, fiebre, pérdida de peso inexplicada o traumatismo importante requiere descartar causas graves antes de tratar.",
   "Para ubicar niveles, la línea de las crestas ilíacas es una guía aproximada, no exacta."
  ],
  "fuentes": [
   "Wikipedia (inglés): Lumbar vertebrae — https://en.wikipedia.org/wiki/Lumbar_vertebrae",
   "Wikipedia (español): Vértebras lumbares — https://es.wikipedia.org/wiki/V%C3%A9rtebras_lumbares",
   "TeachMeAnatomy: Vertebral column — https://teachmeanatomy.info/back/bones/vertebral-column/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "vertebra-l5",
  "nombre": "Vértebra L5",
  "tipo": "hueso",
  "zona": "back",
  "nombres": [
   "Vértebra lumbar L5"
  ],
  "descripcion": "Quinta y última vértebra lumbar, que se articula con el sacro. Soporta la mayor carga de la columna y tiene forma de cuña.",
  "referencias": [
   "Su espinosa es más pequeña que la de L4 y queda a la altura de las espinas ilíacas posterosuperiores, cerca de los hoyuelos de la zona sacra.",
   "El espacio L4-L5 se palpa justo bajo la línea que une las crestas ilíacas.",
   "A los lados se palpan los músculos erectores; la apófisis transversa gruesa de L5 es profunda."
  ],
  "relaciones": [
   "Se articula con L4 arriba y con el promontorio del sacro abajo (articulación lumbosacra), con un ángulo más abierto.",
   "Su cuerpo es más alto adelante que atrás, y sus apófisis articulares inferiores están más separadas.",
   "Los ligamentos iliolumbares unen las transversas de L5 con la pelvis, y los ligamentos lumbosacros la unen con el sacro.",
   "Es punto de referencia para medir la inclinación pélvica."
  ],
  "lesiones": [
   "Espondilólisis (defecto en la pars interarticularis) y espondilolistesis ístmica, más frecuentes en L5-S1.",
   "Hernia discal L5-S1 con dolor ciático y afectación de la raíz S1.",
   "Espondilolistesis degenerativa por artrosis facetaria.",
   "Sacralización de L5 o lumbarización de S1, variantes que pueden alterar la carga y confundir el conteo."
  ],
  "fisio": [
   "En adolescentes deportistas con dolor lumbar que se agrava en extensión, pensar en espondilólisis.",
   "Señales de alarma: adormecimiento en silla de montar, disfunción de vejiga o intestino, debilidad que progresa: derivar de inmediato.",
   "Un escalón palpable entre espinosas con dolor y rigidez de isquiotibiales puede indicar espondilolistesis; no aplicar empujes directos."
  ],
  "fuentes": [
   "Wikipedia (inglés): Lumbar vertebrae — https://en.wikipedia.org/wiki/Lumbar_vertebrae",
   "Wikipedia (inglés): Spondylolisthesis — https://en.wikipedia.org/wiki/Spondylolisthesis",
   "Wikipedia (español): Vértebras lumbares — https://es.wikipedia.org/wiki/V%C3%A9rtebras_lumbares",
   "Wikipedia (inglés): Sacrum — https://en.wikipedia.org/wiki/Sacrum"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-sacro",
  "nombre": "Sacro",
  "tipo": "hueso",
  "zona": "back",
  "nombres": [
   "Sacro"
  ],
  "descripcion": "Hueso triangular formado por cinco vértebras fusionadas, que forma la pared posterior de la pelvis. Une la columna lumbar con los huesos coxales y transmite el peso del tronco hacia las piernas.",
  "referencias": [
   "Cresta sacra media: serie de pequeñas elevaciones a lo largo de la línea media, entre los glúteos.",
   "Espinas ilíacas posterosuperiores: marcan los hoyuelos a ambos lados; el sacro se encuentra entre ellas.",
   "Hiato sacro y cuernos sacros: en la parte baja, justo encima del pliegue interglúteo.",
   "El promontorio (borde anterior de S1) no se palpa desde fuera."
  ],
  "relaciones": [
   "Articulaciones sacroilíacas con los ilíacos (carilla auricular), sostenidas por ligamentos sacroilíacos posteriores muy fuertes.",
   "Articulación lumbosacra con L5 y sacrococcígea con el cóccix.",
   "Ligamentos sacrotuberoso y sacroespinoso, iliolumbares y lumbosacros se anclan en él.",
   "Se insertan piriforme (cara pélvica), glúteo mayor, multífido y erectores; el psoas pasa sobre las alas."
  ],
  "lesiones": [
   "Fracturas del sacro por traumatismo o por insuficiencia en osteoporosis, con riesgo de daño nervioso.",
   "Disfunción de la articulación sacroilíaca y dolor en la zona glútea baja.",
   "Espina bífida y agenesia sacra como malformaciones congénitas.",
   "Tumores como el cordoma."
  ],
  "fisio": [
   "Dolor sacro tras una caída sentado o un golpe, con adormecimiento perineal o problemas de vejiga: derivar.",
   "En el embarazo y posparto es común el dolor sacroilíaco; ajustar la técnica y evitar movimientos extremos.",
   "Mapear el dolor con maniobras de provocación sacroilíaca junto con la valoración lumbar y de cadera, ya que se solapan."
  ],
  "fuentes": [
   "Wikipedia (inglés): Sacrum — https://en.wikipedia.org/wiki/Sacrum",
   "Wikipedia (español): Hueso sacro — https://es.wikipedia.org/wiki/Hueso_sacro",
   "TeachMeAnatomy: Vertebral column — https://teachmeanatomy.info/back/bones/vertebral-column/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "manubrio-esternon",
  "nombre": "Manubrio del esternón",
  "tipo": "hueso",
  "zona": "chest",
  "nombres": [
   "Manubrio"
  ],
  "descripcion": "Parte superior del esternón, en forma de trapecio. Se articula con las clavículas y las primeras costillas y forma la parte alta de la pared torácica anterior.",
  "referencias": [
   "Escotadura yugular: hueco en el borde superior, entre las clavículas, a la base del cuello.",
   "Ángulo esternal (de Louis): cresta transversal donde el manubrio se une al cuerpo; en ese nivel se une la 2.ª costilla.",
   "Escotaduras claviculares: puntos de encuentro con las clavículas, que se sienten a cada lado de la escotadura yugular."
  ],
  "relaciones": [
   "Articulaciones esternoclaviculares con las clavículas.",
   "El cartílago de la 1.ª costilla se une al manubrio y el de la 2.ª se reparte entre manubrio y cuerpo.",
   "La articulación manubrioesternal es una sínfisis que puede osificarse con la edad.",
   "El esternocleidomastoideo se une en la parte superior; el pericardio se ancla por detrás."
  ],
  "lesiones": [
   "Fractura esternal por trauma contuso (cinturón de seguridad, volante), más frecuente en la unión manubrioesternal.",
   "Luxación manubrioesternal, rara, por trauma intenso.",
   "Dolor en la articulación esternoclavicular (artrosis, luxación) que se confunde con dolor cardiaco."
  ],
  "fisio": [
   "Dolor opresivo retroesternal, con sudor, náusea o falta de aire, puede ser cardiaco: derivar de inmediato.",
   "Tras un golpe fuerte en el pecho, sospechar lesiones cardiacas o pulmonares asociadas a fractura esternal.",
   "Palpar con suavidad la articulación esternoclavicular; es superficial y sensible."
  ],
  "fuentes": [
   "Wikipedia (inglés): Sternum — https://en.wikipedia.org/wiki/Sternum",
   "TeachMeAnatomy: Sternum — https://teachmeanatomy.info/thorax/bones/sternum/",
   "Wikipedia (español): Esternón — https://es.wikipedia.org/wiki/Estern%C3%B3n"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "cuerpo-esternon",
  "nombre": "Cuerpo del esternón",
  "tipo": "hueso",
  "zona": "chest",
  "nombres": [
   "Cuerpo del esternón"
  ],
  "descripcion": "Parte larga y plana del esternón, entre el manubrio y la apófisis xifoides. Recibe los cartílagos de las costillas 2 a 7 y protege el corazón.",
  "referencias": [
   "Se palpa en toda su longitud como una superficie ósea plana en el centro del pecho.",
   "El ángulo esternal marca su unión superior con el manubrio y sirve para contar costillas (2.ª).",
   "En el extremo inferior se palpa la unión xifoesternal, y por debajo la apófisis xifoides."
  ],
  "relaciones": [
   "Se articula arriba con el manubrio (manubrioesternal) y abajo con la apófisis xifoides.",
   "Los bordes laterales tienen carillas para los cartílagos costales: 3.ª a 6.ª completas y mitades para la 2.ª y la 7.ª.",
   "El pectoral mayor se inserta en su cara anterior; el transverso del tórax nace en la posterior inferior.",
   "Detrás se encuentran el pericardio y el corazón."
  ],
  "lesiones": [
   "Fractura esternal por impacto contuso; suelen ser conminutas y acompañarse de contusión pulmonar o cardiaca.",
   "Condritis costal (síndrome de Tietze) con dolor en las uniones esternocostales.",
   "Malformaciones como pectus excavatum o carinatum."
  ],
  "fisio": [
   "Dolor local al presionar las uniones costoesternales sugiere origen musculoesquelético, pero siempre descartar causa cardiaca si hay síntomas asociados.",
   "No hacer compresiones o presiones fuertes sobre el esternón en pacientes con fractura reciente o sospecha.",
   "En el posoperatorio de esternotomía, seguir las restricciones del equipo médico."
  ],
  "fuentes": [
   "Wikipedia (inglés): Sternum — https://en.wikipedia.org/wiki/Sternum",
   "TeachMeAnatomy: Sternum — https://teachmeanatomy.info/thorax/bones/sternum/",
   "Wikipedia (español): Esternón — https://es.wikipedia.org/wiki/Estern%C3%B3n"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "costilla-1",
  "nombre": "Primera costilla",
  "tipo": "hueso",
  "zona": "chest",
  "nombres": [
   "1.ª costilla"
  ],
  "descripcion": "La costilla más corta, ancha y curva, con caras superior e inferior en vez de interna y externa. Está bajo la clavícula, en la entrada del tórax, y es el paso de vasos y nervios hacia el brazo.",
  "referencias": [
   "Es profunda y casi toda queda por encima y detrás de la clavícula; solo se palpa de forma indirecta en la fosa supraclavicular, detrás del trapecio superior.",
   "Su articulación costocondral con el manubrio queda debajo de la clavícula, junto al esternón.",
   "Su tubérculo del escaleno (de Lisfranc) está en el borde interno, donde se inserta el escaleno anterior."
  ],
  "relaciones": [
   "Posteriormente se articula con T1 (cabeza, con una sola carilla) y con la apófisis transversa de T1.",
   "Anteriormente su cartílago se une al manubrio.",
   "Se insertan el escaleno anterior y el escaleno medio; el primero separa vena subclavia (delante) de arteria subclavia y plexo braquial (detrás).",
   "Se encuentra bajo la clavícula, en la ruta de entrada del tórax."
  ],
  "lesiones": [
   "Fractura por traumatismo de alta energía o por estrés (tos intensa, lanzamientos, carga repetida); se asocia con lesión pulmonar o cervical.",
   "Síndrome del desfiladero torácico por compresión de plexo braquial o vasos entre la costilla, la clavícula y los escalenos.",
   "Costilla cervical asociada, presente en 1 de cada 500 personas aproximadamente."
  ],
  "fisio": [
   "Hormigueo, debilidad, frialdad o cambio de color en el brazo con elevación del brazo o postura prolongada sugiere desfiladero torácico: valorar y derivar si hay cambios vasculares.",
   "Dolor en la base del cuello al toser o lanzar en deportistas puede ser fractura por estrés de la 1.ª costilla.",
   "Evitar presión profunda sobre la zona supraclavicular por la presencia de plexo y vasos."
  ],
  "fuentes": [
   "Wikipedia (inglés): Rib — https://en.wikipedia.org/wiki/Rib",
   "Wikipedia (español): Costilla — https://es.wikipedia.org/wiki/Costilla",
   "Wikipedia (inglés): Rib fracture — https://en.wikipedia.org/wiki/Rib_fracture"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "costillas-verdaderas",
  "nombre": "Costillas verdaderas (2.ª a 7.ª)",
  "tipo": "hueso",
  "zona": "chest",
  "nombres": [
   "2.ª costilla",
   "3.ª costilla",
   "4.ª costilla",
   "5.ª costilla",
   "6.ª costilla",
   "7.ª costilla"
  ],
  "descripcion": "Costillas que se unen directamente al esternón por su propio cartílago costal. Junto con la 1.ª forman las costillas verdaderas y dan la rigidez principal a la parte alta del tórax.",
  "referencias": [
   "La 2.ª costilla se localiza en el ángulo esternal, a partir del cual se cuentan las demás hacia abajo.",
   "Se palpan en los espacios intercostales a lo largo del tórax anterior y lateral, con mayor facilidad en personas delgadas.",
   "Los ángulos costales se sienten en la espalda, a unos 6 o 7 cm de la línea media."
  ],
  "relaciones": [
   "Posteriormente se articulan con las vértebras torácicas (costovertebral y costotransversa).",
   "Los cartílagos costales llegan directo al esternón (la 2.ª al ángulo, 3.ª a 6.ª al cuerpo, 7.ª en el borde inferior).",
   "Entre ellas están los músculos intercostales y por el surco costal corre el paquete neurovascular intercostal.",
   "Se insertan serrato anterior, pectorales y erectores espinales (iliocostal)."
  ],
  "lesiones": [
   "Fractura de costilla por golpe directo, caída o compresión; las costillas medias se rompen con más frecuencia.",
   "Neumotórax, contusión pulmonar o neumonía como complicaciones.",
   "Tórax inestable (volet costal) cuando varias costillas se fracturan en varios puntos.",
   "Fractura por tos intensa, deporte o enfermedades como osteoporosis o cáncer."
  ],
  "fisio": [
   "Dolor al inspirar, falta de aire creciente o esputo con sangre tras un golpe: derivar de inmediato.",
   "Ante dolor costal, evaluar con compresión torácica suave anteroposterior y lateral antes de aplicar técnicas.",
   "En niños y adultos mayores, una fractura costal puede indicar daño mayor; atención especial."
  ],
  "fuentes": [
   "Wikipedia (inglés): Rib — https://en.wikipedia.org/wiki/Rib",
   "Wikipedia (español): Costilla — https://es.wikipedia.org/wiki/Costilla",
   "Wikipedia (inglés): Rib fracture — https://en.wikipedia.org/wiki/Rib_fracture",
   "TeachMeAnatomy: Sternum — https://teachmeanatomy.info/thorax/bones/sternum/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "costillas-falsas",
  "nombre": "Costillas falsas (8.ª a 10.ª)",
  "tipo": "hueso",
  "zona": "chest",
  "nombres": [
   "8.ª costilla",
   "9.ª costilla",
   "10.ª costilla"
  ],
  "descripcion": "Costillas que no llegan directamente al esternón: sus cartílagos se unen al de la costilla superior y forman el arco costal. Dan flexibilidad al tórax inferior y protegen hígado, bazo y estómago.",
  "referencias": [
   "Forman el reborde costal, que se palpa como un arco bajo el pecho, desde la apófisis xifoides hacia los lados.",
   "Se palpan en el costado, bajo el borde inferior del pectoral y los dorsales.",
   "El borde del arco costal se puede seguir con los dedos al inspirar profundo."
  ],
  "relaciones": [
   "Posteriormente se articulan con las vértebras torácicas correspondientes.",
   "Sus cartílagos se unen al cartílago de la 7.ª costilla y forman el arco costal.",
   "El diafragma se une a las costillas inferiores y al arco costal; también hay inserciones de oblicuos y recto abdominal.",
   "Por debajo del arco están hígado (derecha) y bazo (izquierda)."
  ],
  "lesiones": [
   "Fractura de costillas inferiores, a menudo con lesión de hígado, bazo o riñón.",
   "Síndrome de la costilla deslizante (deslizamiento de los cartílagos con dolor agudo y chasquido).",
   "Contusiones y esguinces costocondrales por deporte.",
   "Dolor intercostal por neuralgia o herpes zóster."
  ],
  "fisio": [
   "Dolor intenso del costado bajo con hipotensión, mareo o dolor que se irradia al hombro tras un golpe: urgencia por posible lesión de órganos.",
   "Al palpar el arco costal, actuar con suavidad: es sensible y está cerca de órganos.",
   "Valorar la mecánica respiratoria y el diafragma cuando haya dolor costal bajo recurrente."
  ],
  "fuentes": [
   "Wikipedia (inglés): Rib — https://en.wikipedia.org/wiki/Rib",
   "Wikipedia (español): Costilla — https://es.wikipedia.org/wiki/Costilla",
   "Wikipedia (inglés): Rib fracture — https://en.wikipedia.org/wiki/Rib_fracture"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "costillas-flotantes",
  "nombre": "Costillas flotantes (11.ª y 12.ª)",
  "tipo": "hueso",
  "zona": "chest",
  "nombres": [
   "11.ª costilla",
   "12.ª costilla"
  ],
  "descripcion": "Las dos últimas costillas, cortas, que no se unen al esternón ni a otro cartílago; su extremo anterior queda libre en la pared abdominal. Protegen la parte posterior de los riñones.",
  "referencias": [
   "Las puntas se palpan en el flanco, justo por encima de la cresta ilíaca, a los lados del tronco.",
   "La 12.ª costilla se sigue desde la columna hacia afuera, bajo los músculos erectores.",
   "La 12.ª sirve para localizar aproximadamente T12 y la unión toracolumbar."
  ],
  "relaciones": [
   "Se articulan solo con su propia vértebra (T11 y T12), por la cabeza; no tienen articulación en el tubérculo.",
   "No se unen al esternón ni a un cartílago superior.",
   "El diafragma se une en sus bordes y también se insertan los músculos oblicuos y el cuadrado lumbar, cerca de la 12.ª.",
   "Por detrás están los riñones."
  ],
  "lesiones": [
   "Fractura por golpe directo en el flanco, con posible lesión de riñón.",
   "Fractura o dolor por esfuerzos repetidos de tos o rotación.",
   "Síndrome de la costilla deslizante con dolor agudo del costado."
  ],
  "fisio": [
   "Dolor del flanco con sangre en la orina, fiebre o golpe previo requiere valoración médica por posible lesión renal.",
   "Al palpar la punta de la 12.ª costilla, usar presión suave, pues es sensible y se confunde con dolor lumbar.",
   "Distinguir dolor lumbar mecánico de dolor renal: el renal no cambia con el movimiento."
  ],
  "fuentes": [
   "Wikipedia (inglés): Rib — https://en.wikipedia.org/wiki/Rib",
   "Wikipedia (español): Costilla — https://es.wikipedia.org/wiki/Costilla",
   "Wikipedia (inglés): Rib fracture — https://en.wikipedia.org/wiki/Rib_fracture"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-clavicula",
  "nombre": "Clavícula",
  "tipo": "hueso",
  "zona": "shoulders",
  "nombres": [
   "Clavícula"
  ],
  "descripcion": "Hueso largo en forma de S alargada que une el esternón con el hombro. Funciona como puntal que mantiene el hombro separado del tórax y transmite fuerzas del miembro superior al esqueleto axial.",
  "referencias": [
   "Se palpa en toda su longitud bajo la piel, desde la articulación esternoclavicular hasta el acromion; en personas delgadas se ve a simple vista.",
   "El extremo medial (esternal) es grueso y se localiza en la escotadura yugular; el extremo lateral (acromial) es plano y se continúa con el acromion.",
   "La curva medial es convexa hacia delante y la lateral cóncava hacia delante; el cambio entre ambas es la zona más débil del hueso.",
   "En la cara inferior del tercio lateral están la línea trapezoidea y el tubérculo conoideo (no palpables), que anclan el ligamento coracoclavicular."
  ],
  "relaciones": [
   "Articula con el manubrio esternal (articulación esternoclavicular, que también contacta el primer cartílago costal) y con el acromion de la escápula (acromioclavicular).",
   "Se insertan en ella deltoides y trapecio (tercio lateral), pectoral mayor y esternocleidomastoideo (tercio medial), subclavio (surco inferior) y esternohioideo.",
   "El ligamento coracoclavicular (conoideo y trapezoideo) es muy fuerte y prácticamente suspende la extremidad superior de la clavícula.",
   "Por debajo de ella pasan el plexo braquial y los vasos subclavios; los nervios supraclaviculares cruzan por delante."
  ],
  "lesiones": [
   "Fractura de clavícula: de las más frecuentes; suele ocurrir por caída sobre el hombro o la mano extendida. Cerca del 80% es en el tercio medio, 15% en el lateral y 5% en el medial.",
   "En fracturas del tercio medio el fragmento lateral cae por el peso del brazo y el medial puede subir por tracción del esternocleidomastoideo; rara vez perfora la piel.",
   "Luxación o separación acromioclavicular y luxación esternoclavicular.",
   "Consecuencias de la cirugía: adormecimiento en el pecho y hombro por daño de los nervios supraclaviculares."
  ],
  "fisio": [
   "Tras una fractura, vigilar consolidación, dolor y deformidad; el movimiento del hombro se progresa según indicación del médico tratante.",
   "Al palpar o movilizar, recordar que el plexo braquial y los vasos subclavios pasan por debajo; evitar presión profunda en el borde inferior.",
   "Señales de alarma: piel tensa o puntiaguda sobre el hueso, hormigueo o pérdida de pulso en el brazo, dificultad respiratoria tras trauma torácico."
  ],
  "fuentes": [
   "Wikipedia: Clavicle — https://en.wikipedia.org/wiki/Clavicle",
   "TeachMeAnatomy: The Clavicle — https://teachmeanatomy.info/upper-limb/bones/clavicle/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-escapula",
  "nombre": "Escápula",
  "tipo": "hueso",
  "zona": "shoulders",
  "nombres": [
   "Escápula"
  ],
  "descripcion": "Hueso plano triangular situado en la parte posterior del tórax. Aloja la cavidad glenoidea del hombro y sirve de base móvil para unos 17 músculos.",
  "referencias": [
   "El acromion es la cima del hombro; se palpa siguiendo la espina de la escápula hacia afuera.",
   "La espina de la escápula es una cresta horizontal palpable en la espalda alta que separa las fosas supraespinosa e infraespinosa.",
   "El ángulo inferior es el punto más bajo; es útil para observar el movimiento escapular. El ángulo superior queda aproximadamente a la altura de T2.",
   "El borde medial (vertebral) es el más largo y se palpa bajo la piel; la apófisis coracoides se palpa debajo de la clavícula, lateral a la parte media del hueco deltopectoral."
  ],
  "relaciones": [
   "Articula con el húmero (glenohumeral) y con la clavícula (acromioclavicular); se desliza sobre el tórax en la articulación escapulotorácica.",
   "Manguito rotador: supraespinoso, infraespinoso, redondo menor (borde lateral) y subescapular (fosa subescapular).",
   "Estabilizadores: serrato anterior, romboides y elevador de la escápula en el borde medial; trapecio en la espina y acromion.",
   "Coracoides: pectoral menor, coracobraquial y cabeza corta del bíceps; tubérculo supraglenoideo: cabeza larga del bíceps; infraglenoideo: cabeza larga del tríceps.",
   "El nervio supraescapular pasa por la escotadura escapular."
  ],
  "lesiones": [
   "Fracturas de escápula: poco frecuentes por su protección muscular; indican trauma de alta energía y suelen asociarse a lesiones torácicas.",
   "Escápula alada por debilidad del serrato anterior (nervio torácico largo): el borde medial y ángulo inferior se separan del tórax.",
   "Discinesia escapular, asociada a dolor de hombro y pinzamiento, con frecuente inhibición de serrato anterior y trapecio inferior.",
   "Os acromiale: el acromion no se fusiona y puede dar dolor."
  ],
  "fisio": [
   "Observar la posición y el movimiento de las escápulas en reposo y al elevar el brazo (ángulo inferior y borde medial).",
   "No asumir que toda asimetría escapular explica el dolor: la discinesia también aparece en personas sin síntomas.",
   "Tras trauma importante en la espalda o el tórax, descartar lesiones asociadas antes de tratar; derivar si hay dolor torácico o dificultad para respirar."
  ],
  "fuentes": [
   "Wikipedia: Scapula — https://en.wikipedia.org/wiki/Scapula",
   "TeachMeAnatomy: The Scapula — https://teachmeanatomy.info/upper-limb/bones/scapula/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-humero",
  "nombre": "Húmero",
  "tipo": "hueso",
  "zona": "arms",
  "nombres": [
   "Húmero"
  ],
  "descripcion": "Hueso largo del brazo que va del hombro al codo. Su cabeza forma el hombro con la escápula y su extremo distal forma parte del codo.",
  "referencias": [
   "El epicóndilo medial (epitróclea) es más grande y prominente; el epicóndilo lateral es más discreto. Ambos se palpan a cada lado del codo.",
   "El nervio ulnar se palpa en el surco justo detrás del epicóndilo medial.",
   "El tubérculo mayor es lateral y forma el contorno redondeado del hombro bajo el deltoides; el tubérculo menor es anterior y más pequeño, y entre ambos queda el surco bicipital.",
   "La tuberosidad deltoidea está en el tercio medio del eje lateral, bajo el deltoides; el eje en sí es poco palpable."
  ],
  "relaciones": [
   "Articula con la glenoides de la escápula (glenohumeral) y, en el codo, la tróclea con el cúbito y el cóndilo (capitulum) con la cabeza del radio.",
   "Tubérculo mayor: supraespinoso, infraespinoso y redondo menor; tubérculo menor: subescapular; labios del surco intertubercular: pectoral mayor, redondo mayor y dorsal ancho.",
   "Eje: deltoides, coracobraquial, braquial y tríceps; la cresta supracondílea lateral da origen a extensores del antebrazo y el epicóndilo medial a los flexores.",
   "El nervio radial discurre por el surco radial (espiral) del eje, y el nervio axilar rodea el cuello quirúrgico."
  ],
  "lesiones": [
   "Fractura proximal (cuello quirúrgico, tubérculos): frecuente por caída en adultos mayores con osteoporosis; riesgo para el nervio axilar y la arteria circunfleja humeral posterior.",
   "Fractura de la diáfisis: puede lesionar el nervio radial (mano caída, pérdida de sensibilidad en el dorso de la mano) y la arteria braquial profunda.",
   "Fractura supracondílea, típica en niños tras caída sobre la mano extendida: riesgo de lesión de la arteria braquial (contractura isquémica de Volkmann) y del nervio interóseo anterior, ulnar o radial.",
   "Luxaciones de hombro que pueden dañar el nervio axilar."
  ],
  "fisio": [
   "Tras una fractura, valorar sensibilidad y fuerza (deltoides, extensión de muñeca, signo de OK) antes y durante la rehabilitación.",
   "Precaución con el trayecto del nervio radial en el tercio medio y del nervio ulnar tras el epicóndilo medial al aplicar presión o masaje.",
   "Señales de alarma: dolor desproporcionado, palidez, frialdad o pérdida de pulso distal, sobre todo en niños con trauma de codo."
  ],
  "fuentes": [
   "Wikipedia: Humerus — https://en.wikipedia.org/wiki/Humerus",
   "TeachMeAnatomy: The Humerus — https://teachmeanatomy.info/upper-limb/bones/humerus/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-radio",
  "nombre": "Radio",
  "tipo": "hueso",
  "zona": "arms",
  "nombres": [
   "Radio"
  ],
  "descripcion": "Hueso lateral (del lado del pulgar) del antebrazo. Su extremo distal forma gran parte de la articulación de la muñeca y gira alrededor del cúbito en la pronosupinación.",
  "referencias": [
   "La cabeza del radio se palpa en la cara lateral del codo, unos centímetros distal al epicóndilo lateral, y rota al pronar y supinar.",
   "La apófisis estiloides del radio se palpa en el borde lateral de la muñeca, en la base del pulgar.",
   "El tubérculo de Lister es un relieve en el dorso del extremo distal, entre los tendones extensores del pulgar y los de los dedos.",
   "La tuberosidad del radio (inserción del bíceps) está en el lado medial bajo el cuello, no es fácil de palpar."
  ],
  "relaciones": [
   "Articula con el cóndilo del húmero (codo), con la escotadura radial del cúbito (radiocubital proximal), y distalmente con escafoides y semilunar (radiocarpiana) y con la cabeza del cúbito (radiocubital distal).",
   "La membrana interósea une los ejes de radio y cúbito (sindesmosis).",
   "Se insertan el bíceps (tuberosidad) y el pronador redondo (cara lateral del eje); el supinador y el pronador cuadrado también se relacionan con el hueso, y el braquiorradial se inserta cerca de la estiloides.",
   "Origen de flexor largo del pulgar, abductor largo y extensor corto del pulgar."
  ],
  "lesiones": [
   "Fractura de Colles: fractura distal con fragmento desplazado hacia atrás (deformidad en dorso de tenedor), por caída sobre la mano extendida; muy común en adultos mayores con osteoporosis.",
   "Fractura de Smith: desplazamiento hacia la palma, por caída sobre el dorso de la mano.",
   "Fractura de la cabeza del radio, por caída sobre la mano extendida; Galeazzi (eje del radio con luxación radiocubital distal) y Essex-Lopresti.",
   "Complicaciones tras fractura distal: rigidez, síndrome del túnel del carpo agudo, síndrome doloroso regional complejo y síndrome compartimental."
  ],
  "fisio": [
   "Tras inmovilización, la rigidez de muñeca y dedos es frecuente; vigilar edema, dolor desproporcionado y cambios de sensibilidad.",
   "Valorar pronosupinación, además de flexoextensión, porque el radio gira alrededor del cúbito.",
   "Una fractura por fragilidad sugiere hueso débil: considerar sugerir valoración de osteoporosis."
  ],
  "fuentes": [
   "Wikipedia: Radius (bone) — https://en.wikipedia.org/wiki/Radius_(bone)",
   "TeachMeAnatomy: The Radius — https://teachmeanatomy.info/upper-limb/bones/radius/",
   "OrthoInfo (AAOS): Distal Radius Fractures (Broken Wrist) — https://www.orthoinfo.org/en/diseases--conditions/distal-radius-fractures-broken-wrist/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-cubito",
  "nombre": "Cúbito (ulna)",
  "tipo": "hueso",
  "zona": "arms",
  "nombres": [
   "Cúbito"
  ],
  "descripcion": "Hueso medial del antebrazo, más grueso en el codo y más delgado en la muñeca. Forma la parte principal de la articulación del codo con el húmero.",
  "referencias": [
   "El olécranon es la punta del codo y se palpa fácilmente en la parte posterior; el tríceps se inserta en él.",
   "El borde posterior (subcutáneo) se palpa a lo largo de todo el antebrazo, desde el olécranon hasta la muñeca.",
   "La cabeza del cúbito es la prominencia redonda en el dorso de la muñeca, del lado del meñique, y la estiloides cubital sobresale justo detrás de ella.",
   "El nervio ulnar pasa entre el olécranon y el epicóndilo medial del húmero."
  ],
  "relaciones": [
   "Articula con la tróclea del húmero (escotadura troclear, formada por olécranon y apófisis coronoides), con la cabeza del radio (escotadura radial) y con la escotadura cubital del radio en la muñeca.",
   "La cabeza del cúbito está separada de los huesos del carpo por el disco articular triangular (fibrocartílago).",
   "Inserciones: tríceps y ancóneo (olécranon), braquial (tuberosidad cubital, bajo la coronoides).",
   "Orígenes de flexores y pronador cuadrado en la cara anterior, y del extensor cubital del carpo y músculos profundos del dorso del antebrazo; la membrana interósea la une al radio."
  ],
  "lesiones": [
   "Fractura del olécranon: por caída sobre el codo flexionado o golpe directo; el tríceps puede separar el fragmento.",
   "Fractura de Monteggia: fractura del tercio proximal del cúbito con luxación de la cabeza del radio.",
   "Fractura aislada del eje (por golpe directo, 'fractura del bastonazo').",
   "Fractura de la estiloides cubital, con frecuencia asociada a fractura distal del radio, y lesión del complejo fibrocartilaginoso triangular."
  ],
  "fisio": [
   "Tras trauma de codo, valorar siempre la cabeza del radio y la muñeca por lesiones asociadas.",
   "Precaución al masajear o presionar el surco cubital por el nervio ulnar (hormigueo en el meñique).",
   "El borde posterior es una referencia fácil para guiar la palpación y la medición del antebrazo."
  ],
  "fuentes": [
   "Wikipedia: Ulna — https://en.wikipedia.org/wiki/Ulna",
   "TeachMeAnatomy: The Ulna — https://teachmeanatomy.info/upper-limb/bones/ulna/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "carpo-escafoides",
  "nombre": "Escafoides (hueso del carpo)",
  "tipo": "hueso",
  "zona": "arms",
  "nombres": [
   "Escafoides"
  ],
  "descripcion": "Hueso del carpo en forma de barca, en el lado del pulgar de la hilera proximal. Une las dos hileras del carpo y es el hueso de la muñeca que se fractura con más frecuencia.",
  "referencias": [
   "Se palpa en el fondo de la tabaquera anatómica, entre los tendones del extensor largo del pulgar (medial) y del abductor largo y extensor corto (lateral), justo distal a la estiloides radial.",
   "Por la palma se palpa su tubérculo en la base de la eminencia tenar, cerca del pliegue de la muñeca.",
   "Al desviar la muñeca hacia el lado radial, el escafoides se desliza hacia delante, lo que facilita su palpación."
  ],
  "relaciones": [
   "Articula con el radio (proximal), el semilunar y el hueso grande (medial) y el trapecio y trapezoide (distal).",
   "Ligamento escafolunar con el semilunar: su lesión causa inestabilidad escafolunar; el ligamento colateral radial y el retináculo flexor se anclan en él.",
   "Forma el borde radial del túnel del carpo.",
   "Irrigación por ramas de la arteria radial que entran sobre todo por la parte distal; la parte proximal recibe flujo retrógrado."
  ],
  "lesiones": [
   "Fractura del escafoides: típica por caída sobre la mano extendida; dolor en la tabaquera anatómica. Puede no verse en la primera radiografía.",
   "Necrosis avascular del polo proximal y pseudoartrosis por la irrigación retrógrada, sobre todo en fracturas de la cintura o del polo proximal.",
   "Artrosis postraumática de la muñeca si no consolida.",
   "Inestabilidad escafolunar por lesión ligamentaria."
  ],
  "fisio": [
   "Dolor en la tabaquera tras una caída: sospechar fractura aunque la radiografía sea normal y derivar para imagen adicional o inmovilización.",
   "No iniciar movilización o carga hasta confirmar la consolidación con el médico; una fractura no detectada puede terminar en artrosis.",
   "Un chasquido o falta de deslizamiento del escafoides al desviar la muñeca puede sugerir inestabilidad escafolunar."
  ],
  "fuentes": [
   "Wikipedia: Scaphoid bone — https://en.wikipedia.org/wiki/Scaphoid_bone",
   "Wikipedia: Anatomical snuffbox — https://en.wikipedia.org/wiki/Anatomical_snuffbox",
   "Kenhub: Carpal bones — https://www.kenhub.com/en/library/anatomy/carpal-bones",
   "TeachMeAnatomy: Bones of the Hand — https://teachmeanatomy.info/upper-limb/bones/hand/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "carpo-semilunar",
  "nombre": "Semilunar",
  "tipo": "hueso",
  "zona": "arms",
  "nombres": [
   "Semilunar"
  ],
  "descripcion": "Hueso del carpo en forma de media luna, en el centro de la hilera proximal. Encaja en la fosa semilunar del radio y es la pieza central de la muñeca.",
  "referencias": [
   "Se encuentra en línea con el tercer metacarpiano, justo distal al radio, entre escafoides (lateral) y piramidal (medial).",
   "En el dorso de la muñeca se palpa como una depresión blanda o ligera prominencia distal al tubérculo de Lister, que se hace más evidente al flexionar la muñeca.",
   "Es difícil de palpar de forma aislada; se usa como referencia para valorar el eje central de la muñeca."
  ],
  "relaciones": [
   "Articula con el radio y el disco articular (proximal), con el hueso grande y a veces el ganchoso (distal), con el escafoides (lateral) y con el piramidal (medial).",
   "Unido al escafoides y al piramidal por ligamentos interóseos y estabilizado por ligamentos radiocarpianos.",
   "No tiene inserciones musculares; su irrigación llega por ramas dorsales y palmares, y en cerca del 20% de las personas solo por las palmares."
  ],
  "lesiones": [
   "Es el hueso del carpo que más se luxa; la luxación semilunar puede comprimir el nervio mediano.",
   "Enfermedad de Kienböck: necrosis avascular del semilunar con dolor, rigidez y colapso del hueso; se asocia a trauma, variantes vasculares y a una variante cubital negativa (cúbito más corto).",
   "Fracturas del semilunar y lesiones ligamentarias escafolunar y lunopiramidal."
  ],
  "fisio": [
   "Dolor central y rigidez de la muñeca que empeora con la carga, sobre todo en trabajadores manuales, es motivo de derivación para imagen (puede no verse en la radiografía inicial).",
   "Evitar movilizaciones fuertes o carga axial sobre la muñeca si hay sospecha de lesión del semilunar.",
   "Hormigueo en los dedos tras una caída puede indicar compresión del nervio mediano: derivar con urgencia."
  ],
  "fuentes": [
   "Wikipedia: Lunate bone — https://en.wikipedia.org/wiki/Lunate_bone",
   "Wikipedia: Kienböck's disease — https://en.wikipedia.org/wiki/Kienb%C3%B6ck%27s_disease",
   "Kenhub: Carpal bones — https://www.kenhub.com/en/library/anatomy/carpal-bones"
  ],
  "verificacion": "una fuente"
 },
 {
  "id": "carpo-piramidal",
  "nombre": "Piramidal",
  "tipo": "hueso",
  "zona": "arms",
  "nombres": [
   "Piramidal"
  ],
  "descripcion": "Hueso del carpo en forma de pirámide, en el lado cubital (medial) de la hilera proximal. Soporta al pisiforme en su cara palmar.",
  "referencias": [
   "Se localiza distal a la estiloides cubital; si la muñeca se desvía hacia el lado radial, el hueso sale de debajo de la estiloides y se palpa mejor.",
   "En la cara palmar, el pisiforme descansa sobre él y puede ocultarlo al palpar."
  ],
  "relaciones": [
   "Articula con el semilunar (lateral), el pisiforme (palmar) y el ganchoso (distal); no contacta directamente con el cúbito, pues el disco articular triangular los separa.",
   "Se une al cúbito por el complejo fibrocartilaginoso triangular y el ligamento colateral cubital de la muñeca se inserta en su vértice medial.",
   "Forma parte del arco del carpo que limita el túnel del carpo."
  ],
  "lesiones": [
   "Segundo hueso del carpo que más se fractura.",
   "Fractura por avulsión dorsal, por flexión forzada de la muñeca o caída sobre la mano extendida; el fragmento se ve en la proyección lateral.",
   "Lesiones ligamentarias lunopiramidales."
  ],
  "fisio": [
   "Dolor en el dorso del lado cubital de la muñeca tras una caída: pedir proyección lateral y descartar avulsión del piramidal.",
   "Distinguir el dolor del piramidal del que viene del complejo fibrocartilaginoso triangular, que se localiza en la misma región.",
   "Evitar cargas y torsiones dolorosas hasta tener diagnóstico."
  ],
  "fuentes": [
   "Wikipedia: Triquetral bone — https://en.wikipedia.org/wiki/Triquetral_bone",
   "Kenhub: Carpal bones — https://www.kenhub.com/en/library/anatomy/carpal-bones"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "carpo-pisiforme",
  "nombre": "Pisiforme",
  "tipo": "hueso",
  "zona": "arms",
  "nombres": [
   "Pisiforme"
  ],
  "descripcion": "Hueso pequeño, redondeado como un chícharo, que es un sesamoideo dentro del tendón del flexor cubital del carpo. Se apoya sobre la cara palmar del piramidal.",
  "referencias": [
   "Se palpa con facilidad en la base de la eminencia hipotenar, en el extremo cubital del pliegue de la muñeca.",
   "Se mueve un poco al relajar el flexor cubital del carpo (muñeca en ligera flexión).",
   "Sirve de referencia para ubicar el borde medial del túnel del carpo y el canal de Guyon."
  ],
  "relaciones": [
   "Articula solo con el piramidal, mediante una carilla oval.",
   "Se inserta en él el flexor cubital del carpo, y de él nacen el abductor del meñique y los ligamentos pisoganchoso y pisometacarpiano.",
   "Forma el borde medial del canal cubital (de Guyon), por donde pasan el nervio y la arteria ulnar hacia la mano; el gancho del ganchoso es el borde lateral."
  ],
  "lesiones": [
   "Fracturas por golpe directo o caída sobre la palma; poco frecuentes.",
   "Tendinopatía del flexor cubital del carpo con dolor en la zona.",
   "Neuropatía del nervio ulnar en el canal de Guyon (por presión repetida, como el manubrio de la bicicleta, o por un ganglión)."
  ],
  "fisio": [
   "Evitar presión sostenida sobre el pisiforme en maniobras de palma; puede comprimir el nervio ulnar y causar hormigueo en el meñique.",
   "En ciclistas o usuarios de herramientas vibratorias, preguntar por hormigueo o debilidad en el meñique y el anular.",
   "El dolor sobre el hueso al flexionar o desviar la muñeca hacia el lado cubital sugiere problema del flexor cubital del carpo."
  ],
  "fuentes": [
   "Wikipedia: Pisiform bone — https://en.wikipedia.org/wiki/Pisiform_bone",
   "Kenhub: Carpal bones — https://www.kenhub.com/en/library/anatomy/carpal-bones",
   "Wikipedia: Ulnar canal — https://en.wikipedia.org/wiki/Ulnar_canal"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "carpo-trapecio",
  "nombre": "Trapecio (hueso del carpo)",
  "tipo": "hueso",
  "zona": "arms",
  "nombres": [
   "Trapecio"
  ],
  "descripcion": "Hueso del carpo del lado radial de la hilera distal. Con su superficie en forma de silla de montar articula con el primer metacarpiano y permite la oposición del pulgar.",
  "referencias": [
   "Su tubérculo palmar se palpa en la base de la eminencia tenar, distal al tubérculo del escafoides.",
   "Por el dorso, forma parte del fondo de la tabaquera anatómica, distal al escafoides, en la base del pulgar.",
   "En la cara palmar tiene un surco por donde pasa el tendón del flexor radial del carpo."
  ],
  "relaciones": [
   "Articula con el escafoides (proximal), el trapezoide (medial), y los metacarpianos 1 (articulación trapeciometacarpiana) y 2.",
   "El abductor corto del pulgar y el retináculo flexor (ligamento transverso del carpo) se relacionan con su tubérculo.",
   "Forma el borde radial del túnel del carpo; la arteria radial pasa por su cara dorsal."
  ],
  "lesiones": [
   "Artrosis trapeciometacarpiana (rizartrosis) por uso repetido, común en adultos mayores y especialmente mujeres.",
   "Fracturas poco frecuentes, por caída o impacto en el pulgar, con frecuencia junto a fracturas de la base del primer metacarpiano.",
   "Tendinopatía del flexor radial del carpo en su surco."
  ],
  "fisio": [
   "Dolor en la base del pulgar al pellizcar o abrir frascos: sospechar rizartrosis y proteger la articulación (descarga, ortesis según indicación).",
   "Palpar con cuidado la base del pulgar; la prueba de molienda (compresión y rotación del metacarpiano) provoca dolor si hay artrosis.",
   "Evitar movilizaciones forzadas de la articulación trapeciometacarpiana si hay inflamación o inestabilidad."
  ],
  "fuentes": [
   "Wikipedia: Trapezium (bone) — https://en.wikipedia.org/wiki/Trapezium_(bone)",
   "Kenhub: Carpal bones — https://www.kenhub.com/en/library/anatomy/carpal-bones",
   "Wikipedia: Anatomical snuffbox — https://en.wikipedia.org/wiki/Anatomical_snuffbox"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "carpo-trapezoide",
  "nombre": "Trapezoide",
  "tipo": "hueso",
  "zona": "arms",
  "nombres": [
   "Trapezoide"
  ],
  "descripcion": "Hueso del carpo pequeño, en cuña, el más pequeño de la hilera distal. Se ubica entre el trapecio y el hueso grande, y sostiene la base del segundo metacarpiano.",
  "referencias": [
   "Es profundo y rodeado por huesos vecinos; no se palpa de forma individual con fiabilidad.",
   "Se ubica en línea con el segundo metacarpiano: desde la base de este hueso, hacia la muñeca, queda justo proximal.",
   "Es más ancho en la cara dorsal que en la palmar."
  ],
  "relaciones": [
   "Articula con el escafoides (proximal), el segundo metacarpiano (distal), el trapecio (lateral) y el hueso grande (medial).",
   "Sus caras dorsal y palmar son rugosas para ligamentos, y se une con firmeza a los huesos vecinos.",
   "No tiene inserciones musculares importantes."
  ],
  "lesiones": [
   "Fractura aislada muy rara (cerca de 0.4% de las fracturas del carpo), por fuerza axial sobre el segundo metacarpiano o golpe directo.",
   "Luxación o subluxación por golpe, poco frecuente.",
   "Dolor en la base del segundo metacarpiano por artrosis carpometacarpiana."
  ],
  "fisio": [
   "Tras trauma axial del dedo índice, sospechar lesión de la base del segundo metacarpiano o del trapezoide y pedir imagen.",
   "Por ser tan profundo, no intentar palparlo de forma aislada; localizar dolor referido a la base del segundo metacarpiano.",
   "Respetar la inmovilización indicada, ya que no hay un tratamiento estándar establecido."
  ],
  "fuentes": [
   "Wikipedia: Trapezoid bone — https://en.wikipedia.org/wiki/Trapezoid_bone",
   "Kenhub: Carpal bones — https://www.kenhub.com/en/library/anatomy/carpal-bones"
  ],
  "verificacion": "una fuente"
 },
 {
  "id": "carpo-grande",
  "nombre": "Hueso grande (capitato)",
  "tipo": "hueso",
  "zona": "arms",
  "nombres": [
   "Grande"
  ],
  "descripcion": "El hueso más grande del carpo, en el centro de la hilera distal. Su cabeza redondeada encaja entre el escafoides y el semilunar, y su base soporta al tercer metacarpiano.",
  "referencias": [
   "Se localiza en línea con el tercer metacarpiano; en el dorso de la muñeca, es la depresión justo proximal a la base de ese metacarpiano.",
   "Es central y profundo; se palpa solo de forma indirecta, siguiendo el tercer metacarpiano hacia la muñeca.",
   "Su cabeza redondeada queda cubierta por el semilunar y el escafoides."
  ],
  "relaciones": [
   "Articula con el tercer metacarpiano (su carilla mayor) y con los metacarpianos 2 y 4; proximalmente con el semilunar y el escafoides; lateralmente con el trapezoide y medialmente con el ganchoso.",
   "Estabilizado por ligamentos interóseos con los huesos vecinos.",
   "Tiene una irrigación pobre, lo que dificulta la consolidación."
  ],
  "lesiones": [
   "Fracturas aisladas poco frecuentes, a menudo sin desplazamiento por su posición protegida; suelen acompañar a las del escafoides.",
   "Mecanismo habitual: caída sobre la palma con muñeca en extensión forzada.",
   "Pseudoartrosis y necrosis avascular por su irrigación limitada.",
   "Luxaciones perilunares en traumas graves de la muñeca."
  ],
  "fisio": [
   "Tras una caída sobre la mano con dolor central del dorso de la muñeca, pensar en capitato además de escafoides.",
   "Respetar la inmovilización y la restricción de carga; la consolidación puede ser lenta.",
   "Tras la inmovilización, la rehabilitación recupera movilidad y fuerza; seguir las indicaciones del médico."
  ],
  "fuentes": [
   "Wikipedia: Capitate bone — https://en.wikipedia.org/wiki/Capitate_bone",
   "Kenhub: Carpal bones — https://www.kenhub.com/en/library/anatomy/carpal-bones"
  ],
  "verificacion": "una fuente"
 },
 {
  "id": "carpo-ganchoso",
  "nombre": "Ganchoso (hamato)",
  "tipo": "hueso",
  "zona": "arms",
  "nombres": [
   "Ganchoso"
  ],
  "descripcion": "Hueso del carpo en cuña, en el lado cubital de la hilera distal. Tiene un gancho (hamulus) en la cara palmar que forma parte del túnel del carpo y del canal de Guyon.",
  "referencias": [
   "El gancho del ganchoso se palpa en la palma, aproximadamente 1 a 2 cm distal y radial al pisiforme, en la base de la eminencia hipotenar; la presión suele ser dolorosa.",
   "Un método práctico: partir del pisiforme y desplazarse en dirección al segundo dedo hasta sentir el gancho como un pequeño relieve duro.",
   "El cuerpo del hueso está en línea con los metacarpianos 4 y 5 y es profundo."
  ],
  "relaciones": [
   "Articula con el semilunar y el piramidal (proximal), con el cuarto y quinto metacarpianos (distal) y con el hueso grande (lateral).",
   "El gancho es punto de anclaje del retináculo flexor (ligamento transverso del carpo), del flexor cubital del carpo (vía ligamento pisoganchoso) y de músculos hipotenares.",
   "Forma el borde lateral del canal cubital (Guyon): el nervio ulnar rodea el gancho al pasar a la palma."
  ],
  "lesiones": [
   "Fractura del gancho, común en deportes con bate, palo de golf o raqueta; dolor al agarrar y sensibilidad sobre el hueso, y a menudo no se ve en la radiografía simple.",
   "Pseudoartrosis del gancho por su limitada irrigación.",
   "Neuropatía del nervio ulnar (entumecimiento del meñique y la mitad del anular) o ruptura de tendones flexores del meñique por roce con un gancho fracturado."
  ],
  "fisio": [
   "Dolor palmar cubital al agarrar en deportistas de bate o palo: palpar el gancho con suavidad; si hay dolor intenso, derivar para TC o resonancia.",
   "Evitar presión fuerte en esta zona por el nervio ulnar, que pasa alrededor del gancho.",
   "Vigilar hormigueo o debilidad en meñique y anular, y limitación para flexionar el meñique."
  ],
  "fuentes": [
   "Wikipedia: Hamate bone — https://en.wikipedia.org/wiki/Hamate_bone",
   "Kenhub: Carpal bones — https://www.kenhub.com/en/library/anatomy/carpal-bones",
   "Wikipedia: Ulnar canal — https://en.wikipedia.org/wiki/Ulnar_canal"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "metacarpiano-1",
  "nombre": "Primer metacarpiano (pulgar)",
  "tipo": "hueso",
  "zona": "arms",
  "nombres": [
   "Metacarpiano 1"
  ],
  "descripcion": "Hueso del pulgar dentro de la palma. Es más corto y ancho que los otros metacarpianos y se mueve de forma independiente en una articulación en silla de montar con el trapecio.",
  "referencias": [
   "La base se palpa distal al trapecio, en la base del pulgar, justo distal a la tabaquera anatómica.",
   "El eje se palpa por el borde radial de la mano y la eminencia tenar; la cabeza forma el nudillo del pulgar en la articulación metacarpofalángica.",
   "Las referencias se encuentran más fácilmente con el pulgar en abducción."
  ],
  "relaciones": [
   "Articula con el trapecio (carpometacarpiana, en silla de montar) y con la falange proximal del pulgar.",
   "Se insertan el abductor largo del pulgar y el oponente del pulgar; se relacionan también los músculos de la eminencia tenar.",
   "A diferencia de los metacarpianos 2 a 5, no se une a un metacarpiano vecino por ligamento transverso profundo, lo que le da gran movilidad."
  ],
  "lesiones": [
   "Fractura de Bennett: fractura-luxación de la base que entra en la articulación trapeciometacarpiana; por abducción forzada del pulgar; inestable y suele requerir cirugía.",
   "Fractura de Rolando: fractura intraarticular conminuta de la base (en Y o T).",
   "Artrosis trapeciometacarpiana (rizartrosis).",
   "Lesión del ligamento colateral cubital de la articulación metacarpofalángica (pulgar del guardabosque o del esquiador)."
  ],
  "fisio": [
   "Dolor en la base del pulgar tras un golpe o caída: sospechar fractura de Bennett y derivar antes de movilizar.",
   "Tras inmovilización, trabajar movilidad y fuerza de pinza y oposición de forma gradual.",
   "En rizartrosis, enseñar protección articular y evitar posiciones forzadas de pinza."
  ],
  "fuentes": [
   "Wikipedia: Metacarpal bones — https://en.wikipedia.org/wiki/Metacarpal_bones",
   "TeachMeAnatomy: Bones of the Hand — https://teachmeanatomy.info/upper-limb/bones/hand/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "metacarpianos-2-5",
  "nombre": "Metacarpianos 2 a 5",
  "tipo": "hueso",
  "zona": "arms",
  "nombres": [
   "Metacarpiano 2",
   "Metacarpiano 3",
   "Metacarpiano 4",
   "Metacarpiano 5"
  ],
  "descripcion": "Cuatro huesos largos de la palma que sostienen los dedos índice a meñique. Cada uno tiene base (hacia la muñeca), cuerpo, cuello y cabeza (nudillo).",
  "referencias": [
   "Los cuerpos se palpan fácilmente en el dorso de la mano, bajo los tendones extensores.",
   "Las cabezas forman los nudillos al cerrar el puño; la del tercer metacarpiano suele ser la más prominente.",
   "La base del tercer metacarpiano tiene una apófisis estiloides palpable, hacia la muñeca, y la del quinto es palpable en el borde cubital de la mano.",
   "Los espacios entre los cuerpos alojan los músculos interóseos."
  ],
  "relaciones": [
   "Articulaciones carpometacarpianas: MC2 con trapecio, trapezoide, hueso grande y MC3; MC3 con el hueso grande; MC4 con hueso grande y ganchoso; MC5 con el ganchoso.",
   "Distalmente articulan con las falanges proximales (metacarpofalángicas); entre sí se unen por el ligamento metacarpiano transverso profundo.",
   "Inserciones: extensores radiales largo y corto del carpo en la base del MC2 (y MC3 el corto), extensor cubital del carpo en la base del MC5, oponente del meñique en el MC5; los interóseos se originan en los lados de los cuerpos.",
   "El segundo y tercero son los más fijos; el cuarto y especialmente el quinto son más móviles."
  ],
  "lesiones": [
   "Fractura del boxeador: cuello del quinto metacarpiano por golpe con el puño; el fragmento distal se angula hacia la palma.",
   "Fracturas del cuerpo y la base por aplastamiento o caídas; la rotación del dedo en el puño indica desalineación.",
   "Fractura-luxación de la base del quinto metacarpiano (similar a la de Bennett).",
   "Cerca del 2.5% de las personas sufre una fractura de metacarpiano en la vida."
  ],
  "fisio": [
   "Al cerrar el puño, ver que los dedos apunten hacia el escafoides sin cruzarse: la rotación de un dedo sugiere una desalineación.",
   "Descartar herida en los nudillos tras un golpe a un diente (riesgo de infección): derivar.",
   "Tras la inmovilización, recuperar flexión de la articulación metacarpofalángica y prevenir rigidez de los dedos."
  ],
  "fuentes": [
   "Wikipedia: Metacarpal bones — https://en.wikipedia.org/wiki/Metacarpal_bones",
   "TeachMeAnatomy: Bones of the Hand — https://teachmeanatomy.info/upper-limb/bones/hand/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "falanges-mano",
  "nombre": "Falanges de la mano",
  "tipo": "hueso",
  "zona": "arms",
  "nombres": [
   "Falange proximal",
   "Falange media",
   "Falange distal"
  ],
  "descripcion": "Los huesos de los dedos de la mano: 14 en total. Los dedos 2 a 5 tienen falange proximal, media y distal; el pulgar solo tiene proximal y distal.",
  "referencias": [
   "Los cuerpos y las articulaciones interfalángicas se palpan bajo la piel del dorso del dedo, ya que hay poco tejido blando.",
   "Las articulaciones interfalángicas proximales y distales se ubican en los pliegues de flexión de cada dedo.",
   "La falange distal termina en una expansión (tuberosidad ungueal) que sostiene la yema y la uña."
  ],
  "relaciones": [
   "Las falanges proximales articulan con las cabezas de los metacarpianos (metacarpofalángicas); las falanges articulan entre sí en las interfalángicas.",
   "Los lados del cuerpo tienen zonas rugosas para las vainas fibrosas de los tendones flexores; la aponeurosis extensora se inserta en la base de la distal.",
   "En el pulgar, el flexor largo del pulgar se inserta en la falange distal."
  ],
  "lesiones": [
   "Fracturas por aplastamiento, caídas o deporte, a menudo con tendones, nervios o ligamentos lesionados cerca.",
   "Fractura de la falange distal por aplastamiento (puerta de coche), a veces con lesión del lecho ungueal.",
   "Luxaciones interfalángicas, frecuentes en deportes de balón.",
   "Rigidez y contractura en flexión después de la inmovilización."
  ],
  "fisio": [
   "Tras trauma de dedo, revisar la alineación (rotación), la sensibilidad y la función de tendones flexores y extensores.",
   "La inmovilización prolongada de los dedos causa rigidez; mover las articulaciones libres y retomar la movilidad según la indicación del médico.",
   "Señales de alarma: dedo muy deformado, pérdida de sensibilidad, cambios de color o herida abierta."
  ],
  "fuentes": [
   "Wikipedia: Phalanx bone — https://en.wikipedia.org/wiki/Phalanx_bone",
   "TeachMeAnatomy: Bones of the Hand — https://teachmeanatomy.info/upper-limb/bones/hand/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-coxal",
  "nombre": "Hueso coxal (pelvis)",
  "tipo": "hueso",
  "zona": "hip",
  "nombres": [
   "Hueso coxal"
  ],
  "descripcion": "Hueso grande e irregular de la pelvis, formado por la fusión de ilion, isquion y pubis. Aloja el acetábulo, que recibe la cabeza del fémur, y se une al sacro y al otro coxal.",
  "referencias": [
   "La cresta ilíaca se palpa a lo largo del borde superior de la cadera, a la altura de los dedos al apoyar las manos en la cintura.",
   "La espina ilíaca anterosuperior (EIAS) es el extremo anterior de la cresta; la posterosuperior (EIPS) queda en los hoyuelos sobre las nalgas, a nivel de S2.",
   "La tuberosidad isquiática se palpa en el glúteo inferior con la cadera flexionada; es el hueso donde nos sentamos.",
   "El tubérculo del pubis se palpa en el borde superior del pubis, cerca de la sínfisis; entre EIAS y tubérculo del pubis se extiende el ligamento inguinal."
  ],
  "relaciones": [
   "Articula con el sacro (sacroilíaca), con el hueso coxal contralateral (sínfisis del pubis) y con la cabeza del fémur (coxofemoral, en el acetábulo).",
   "Ilion: glúteos (cara externa), ilíaco (fosa ilíaca); isquion: isquiotibiales (tuberosidad); pubis: aductores.",
   "Ligamentos sacroespinoso y sacrotuberoso forman los agujeros ciáticos mayor y menor; el ligamento inguinal une EIAS con el tubérculo del pubis.",
   "El punto medio inguinal (entre EIAS y sínfisis) es referencia para palpar el pulso femoral."
  ],
  "lesiones": [
   "Fracturas de las ramas del pubis en adultos mayores por caídas de baja energía: suelen ser estables y consolidan en 6 a 8 semanas.",
   "Fracturas pélvicas de alta energía: inestables, con riesgo de sangrado grave y lesión de vejiga y uretra; requieren atención urgente.",
   "Fracturas del acetábulo y lesiones de la articulación sacroilíaca.",
   "Avulsiones apofisarias (EIAS, EIAI, tuberosidad isquiática) en adolescentes deportistas, por tirón muscular."
  ],
  "fisio": [
   "Tras trauma importante, dolor al comprimir la pelvis o incapacidad para cargar peso: no manipular y derivar a urgencias.",
   "Las referencias óseas (EIAS, EIPS, cresta ilíaca) permiten valorar la simetría pélvica y localizar la articulación sacroilíaca; recordar que la asimetría leve es común.",
   "No confundir 'fractura de cadera' (fémur proximal) con fractura pélvica."
  ],
  "fuentes": [
   "Wikipedia: Hip bone — https://en.wikipedia.org/wiki/Hip_bone",
   "TeachMeAnatomy: The Hip Bone — https://teachmeanatomy.info/pelvis/bones/hip-bone/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-femur",
  "nombre": "Fémur",
  "tipo": "hueso",
  "zona": "thigh",
  "nombres": [
   "Fémur"
  ],
  "descripcion": "El hueso más largo y fuerte del cuerpo, en el muslo. Une la cadera con la rodilla y soporta el peso del cuerpo.",
  "referencias": [
   "El trocánter mayor es el relieve lateral más fácil de palpar, a unos 10 cm bajo la cresta ilíaca, en la cara lateral de la cadera.",
   "Los cóndilos y los epicóndilos medial y lateral se palpan a los lados de la rodilla; el tubérculo del aductor está sobre el epicóndilo medial.",
   "La cabeza del fémur y el cuello no se palpan por los músculos; el eje tampoco, porque está cubierto por el muslo.",
   "El trocánter menor es profundo y no se palpa."
  ],
  "relaciones": [
   "Articula con el acetábulo (coxofemoral) y, distalmente, con la tibia y la rótula (tibiofemoral y patelofemoral).",
   "Trocánter mayor: glúteo medio y menor, piriforme; trocánter menor: iliopsoas; tuberosidad glútea: glúteo mayor; línea áspera: aductores.",
   "El cuádriceps se origina en el eje; el gastrocnemio y el plantar en la zona distal; los ligamentos colaterales nacen en los epicóndilos y los cruzados en la escotadura intercondílea.",
   "El ángulo cervicodiafisario es de unos 125 a 130 grados en el adulto."
  ],
  "lesiones": [
   "Fractura del cuello del fémur y pertrocantéreas (fracturas de cadera): comunes en adultos mayores con osteoporosis tras una caída de baja energía; pierna acortada y rotada hacia afuera.",
   "Necrosis avascular de la cabeza femoral tras fracturas intracapsulares del cuello, por daño a la arteria circunfleja femoral medial.",
   "Fractura de la diáfisis: casi siempre de alta energía; puede sangrar entre 1000 y 1500 ml y dañar vasos y nervio femoral.",
   "Fracturas por estrés en deportistas de resistencia."
  ],
  "fisio": [
   "En el adulto mayor con dolor de ingle o cadera tras una caída, que no puede cargar peso, derivar de inmediato: no movilizar.",
   "Tras cirugía de cadera, la movilización temprana es clave; respetar las precauciones indicadas por el cirujano y vigilar trombosis venosa.",
   "Valorar longitud, rotación del miembro y posición del trocánter mayor al comparar ambos lados."
  ],
  "fuentes": [
   "Wikipedia: Femur — https://en.wikipedia.org/wiki/Femur",
   "TeachMeAnatomy: The Femur — https://teachmeanatomy.info/lower-limb/bones/femur/",
   "OrthoInfo (AAOS): Hip Fractures — https://www.orthoinfo.org/en/diseases--conditions/hip-fractures/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-rotula",
  "nombre": "Rótula (patela)",
  "tipo": "hueso",
  "zona": "knee",
  "nombres": [
   "Rótula"
  ],
  "descripcion": "Hueso sesamoideo triangular, el sesamoideo más grande del cuerpo, incluido en el tendón del cuádriceps al frente de la rodilla. Mejora la palanca del cuádriceps y protege la articulación.",
  "referencias": [
   "Se palpa y se ve en la cara anterior de la rodilla; con la pierna extendida y el cuádriceps relajado es móvil.",
   "La base es el borde superior, ancho, donde se inserta el tendón del cuádriceps; el vértice (ápex) apunta hacia abajo, donde nace el ligamento patelar.",
   "Los bordes medial y lateral son palpables; los facetas articulares quedan en la cara posterior, no palpable."
  ],
  "relaciones": [
   "Articula con la tróclea del fémur (articulación patelofemoral); su cara posterior tiene facetas medial y lateral cubiertas de cartílago grueso.",
   "El tendón del cuádriceps se inserta en la base, y el vasto medial y el lateral en los bordes; el ligamento patelar va del ápex a la tuberosidad tibial.",
   "El retináculo y el ligamento patelofemoral medial estabilizan la rótula; la grasa de Hoffa está detrás del ligamento patelar.",
   "La bolsa prepatelar queda delante del hueso."
  ],
  "lesiones": [
   "Fractura de rótula: por golpe directo (caída, tablero) o por contracción brusca del cuádriceps; hemartrosis, dolor e incapacidad para extender la rodilla o elevar la pierna recta.",
   "Luxación lateral de rótula, común en mujeres jóvenes deportistas; suele reducirse sola al extender la rodilla y puede dejar inestabilidad recurrente (lesión del ligamento patelofemoral medial).",
   "Dolor patelofemoral y alteraciones de altura: patela alta o baja.",
   "Bursitis prepatelar ('rodilla de sirvienta') y rótula bipartita (variante, sobre todo en hombres)."
  ],
  "fisio": [
   "Tras luxación, valorar el signo de aprensión y el equilibrio del vasto medial; el reposo prolongado favorece la debilidad de este músculo.",
   "Si no puede extender la rodilla activamente tras un trauma, sospechar fractura o ruptura del aparato extensor: derivar.",
   "La rótula bipartita es una variante: no confundir con fractura aguda sin valoración médica."
  ],
  "fuentes": [
   "Wikipedia: Patella — https://en.wikipedia.org/wiki/Patella",
   "Kenhub: Patella — https://www.kenhub.com/en/library/anatomy/patella",
   "OrthoInfo (AAOS): Patellar (Kneecap) Fractures — https://www.orthoinfo.org/en/diseases--conditions/patellar-kneecap-fractures/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-tibia",
  "nombre": "Tibia",
  "tipo": "hueso",
  "zona": "leg",
  "nombres": [
   "Tibia"
  ],
  "descripcion": "Hueso medial y principal de la pierna. Soporta casi todo el peso entre la rodilla y el tobillo.",
  "referencias": [
   "El borde anterior (cresta tibial) es subcutáneo y se palpa en toda la longitud de la espinilla.",
   "La tuberosidad tibial es un relieve debajo de la rótula, en la cara anterior proximal, donde se inserta el ligamento patelar.",
   "La meseta tibial se palpa a ambos lados del ligamento patelar (interlínea articular de la rodilla).",
   "El maléolo medial es la prominencia interna del tobillo.",
   "El tubérculo de Gerdy (inserción de la cintilla iliotibial) está en el cóndilo lateral."
  ],
  "relaciones": [
   "Articula con los cóndilos del fémur (tibiofemoral), con la fíbula (tibioperonea proximal y distal) y con el astrágalo (tobillo).",
   "El ligamento patelar se inserta en la tuberosidad; la pata de ganso (sartorio, grácil y semitendinoso) en la cara medial proximal; el semimembranoso en el cóndilo medial.",
   "La eminencia intercondílea ancla los ligamentos cruzados y los meniscos.",
   "Origen de tibial anterior, sóleo (línea del sóleo), flexor largo de los dedos y tibial posterior; la membrana interósea la une a la fíbula."
  ],
  "lesiones": [
   "Fractura de la meseta tibial (clasificación de Schatzker): puede dañar meniscos y ligamentos; las muy desplazadas suelen requerir cirugía.",
   "Fractura de la diáfisis: la más frecuente de los huesos largos de la pierna, a menudo con fractura de la fíbula; alta energía en jóvenes.",
   "Fractura del maléolo medial, por inversión o torsión forzada, a menudo con el maléolo lateral.",
   "Fracturas por estrés de tibia en deportistas; síndrome compartimental como complicación."
  ],
  "fisio": [
   "Vigilar síndrome compartimental tras fractura o cirugía: dolor desproporcionado, tensión, dolor al estirar pasivamente los dedos y pérdida de sensibilidad exigen derivación urgente.",
   "Tras una fractura de meseta o diáfisis, la carga se progresa solo según las indicaciones del médico.",
   "El borde anterior es una zona dolorosa al presionar; en deportistas con dolor localizado persistente sobre la tibia, considerar fractura por estrés."
  ],
  "fuentes": [
   "Wikipedia: Tibia — https://en.wikipedia.org/wiki/Tibia",
   "TeachMeAnatomy: The Tibia — https://teachmeanatomy.info/lower-limb/bones/tibia/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-fibula",
  "nombre": "Fíbula (peroné)",
  "tipo": "hueso",
  "zona": "leg",
  "nombres": [
   "Fíbula"
  ],
  "descripcion": "Hueso largo y delgado en la cara lateral de la pierna, junto a la tibia. Casi no soporta peso, pero da inserción a muchos músculos y forma la parte externa de la articulación del tobillo.",
  "referencias": [
   "La cabeza se palpa en la cara lateral de la rodilla, debajo y atrás de la meseta tibial; sobre ella pasa el tendón del bíceps femoral.",
   "El maléolo lateral es el relieve externo del tobillo, cubierto solo por piel; llega más abajo que el maléolo medial.",
   "Detrás del cuello de la fíbula rodea el nervio fibular común, por lo que ahí no se debe presionar con fuerza.",
   "El cuerpo es profundo entre los músculos; solo el tercio distal se nota bajo la piel arriba del maléolo."
  ],
  "relaciones": [
   "Articula arriba con la tibia (articulación tibiofibular superior, deslizante) y abajo en la sindesmosis tibiofibular distal.",
   "La membrana interósea la une a la tibia a lo largo del cuerpo.",
   "Forma la pared lateral de la mortaja del tobillo junto con el astrágalo.",
   "Se insertan el bíceps femoral y el ligamento colateral fibular en la cabeza; salen de ella los fibulares, el sóleo y los extensores largos de los dedos.",
   "Los ligamentos laterales del tobillo (talofibulares y calcaneofibular) parten del maléolo lateral."
  ],
  "lesiones": [
   "Fracturas del maléolo lateral (clasificación de Weber A, B y C), las más comunes y frecuentes en esguinces graves de tobillo.",
   "Fractura de Maisonneuve: fractura proximal asociada a lesión de la sindesmosis y del tobillo.",
   "Fractura proximal con daño del nervio fibular común: debilidad al levantar el pie y pérdida de sensibilidad en el dorso del pie.",
   "Fracturas por estrés en atletas y reclutas, sobre todo en el cuello o el tercio distal.",
   "Avulsión de la cabeza por contracción brusca del bíceps femoral, que puede afectar el ligamento colateral lateral de la rodilla."
  ],
  "fisio": [
   "Tras un esguince de tobillo con dolor alto en la pierna o dolor proximal a la fíbula, sospechar lesión de sindesmosis o Maisonneuve y derivar para imagen.",
   "Evitar presión sostenida detrás de la cabeza y del cuello de la fíbula (nervio fibular común).",
   "Valorar la dorsiflexión y la sensibilidad del dorso del pie tras cualquier golpe lateral de rodilla o fractura proximal.",
   "En dolor de pierna de aparición progresiva en deportistas, considerar fractura por estrés antes de cargar."
  ],
  "fuentes": [
   "Wikipedia: Fibula — https://en.wikipedia.org/wiki/Fibula",
   "Kenhub: Fibula — https://www.kenhub.com/en/library/anatomy/fibula"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-astragalo",
  "nombre": "Astrágalo",
  "tipo": "hueso",
  "zona": "foot",
  "nombres": [
   "Astrágalo"
  ],
  "descripcion": "Hueso del tarso entre la tibia, la fíbula, el calcáneo y el navicular. Transmite el peso de la pierna al pie y es el eje del movimiento del tobillo.",
  "referencias": [
   "Casi todo está oculto; su cabeza se nota en el dorso del pie, adelante del tobillo, al invertir el pie.",
   "El cuerpo con su tróclea queda dentro de la mortaja formada por ambos maléolos; no se palpa directamente.",
   "El seno del tarso (depresión justo adelante del maléolo lateral) es la referencia clínica hacia el cuello del astrágalo.",
   "Un tubérculo posterior queda junto al tendón del flexor largo del dedo gordo, detrás del tobillo."
  ],
  "relaciones": [
   "Forma la articulación talocrural (tobillo) con tibia y fíbula, la subtalar con el calcáneo y la talocalcaneonavicular por delante.",
   "No tiene inserciones musculares; muchos ligamentos lo sujetan (talofibulares, deltoideo, talocalcáneos).",
   "Cerca de 70 % de su superficie está cubierta de cartílago articular.",
   "Su irrigación llega por ramas de la tibial posterior, la dorsal del pie y la peronea, a través de una red en el seno del tarso."
  ],
  "lesiones": [
   "Fractura del cuello por caídas con dorsiflexión forzada o impactos fuertes; puede desplazarse.",
   "Necrosis avascular del cuerpo tras fracturas desplazadas del cuello o luxofracturas, por su irrigación frágil.",
   "Lesiones osteocondrales de la tróclea tras esguinces repetidos.",
   "Fractura del proceso lateral, a veces confundida con un esguince de tobillo."
  ],
  "fisio": [
   "Dolor persistente en el tobillo tras un esguince, con carga limitada, justifica pedir imagen; estas lesiones pueden pasar desapercibidas en radiografía simple.",
   "Después de una fractura de astrágalo, vigilar dolor, rigidez y señales de colapso del hueso por necrosis; la carga la define el médico.",
   "Movilizar el tobillo o la subtalar solo con autorización tras fractura reciente."
  ],
  "fuentes": [
   "Wikipedia: Talus bone — https://en.wikipedia.org/wiki/Talus_bone",
   "Kenhub: Talus — https://www.kenhub.com/en/library/anatomy/talus"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-calcaneo",
  "nombre": "Calcáneo",
  "tipo": "hueso",
  "zona": "foot",
  "nombres": [
   "Calcáneo"
  ],
  "descripcion": "Hueso más grande del pie, forma el talón. Soporta el peso corporal en el apoyo y es la palanca del tendón de Aquiles.",
  "referencias": [
   "La tuberosidad posterior es el talón; se palpa en toda su cara posterior y plantar.",
   "El sustentáculo del astrágalo se localiza unos 2 cm abajo del maléolo medial, como una repisa ósea.",
   "La tróclea peronea (tubérculo de los peroneos) se nota en la cara lateral, unos 2 cm abajo del maléolo lateral.",
   "El tubérculo medial plantar es el punto doloroso típico del talón."
  ],
  "relaciones": [
   "Articula arriba con el astrágalo (subtalar, tres carillas) y adelante con el cuboides.",
   "El tendón de Aquiles se inserta en su cara posterior; en la planta nacen la fascia plantar y varios músculos cortos (abductor del dedo gordo, abductor del quinto dedo, flexor corto de los dedos).",
   "El ligamento calcaneofibular y los tendones peroneos se relacionan con su cara lateral.",
   "En el sustentáculo se apoyan el ligamento en resorte (calcaneonavicular plantar) y parte del ligamento deltoideo."
  ],
  "lesiones": [
   "Es el hueso del tarso que más se fractura; la mayoría son intraarticulares, por caídas de altura con carga axial.",
   "Fracturas por avulsión de la tuberosidad (por tracción del Aquiles) y fracturas extraarticulares.",
   "Fascitis plantar en la inserción medial de la fascia, causa común de dolor de talón.",
   "Fracturas por estrés en corredores y reclutas."
  ],
  "fisio": [
   "Tras una caída de altura con dolor de talón, descartar fractura de calcáneo y revisar la columna lumbar, pues se asocian lesiones vertebrales.",
   "En fractura reciente hay inflamación marcada y riesgo de rigidez subtalar; la carga la indica el médico.",
   "En dolor de talón por carga, localizar el punto máximo (tubérculo medial frente a cara lateral o posterior) para distinguir causas."
  ],
  "fuentes": [
   "Wikipedia: Calcaneus — https://en.wikipedia.org/wiki/Calcaneus",
   "Kenhub: Calcaneus — https://www.kenhub.com/en/library/anatomy/calcaneus"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "hueso-cuboides",
  "nombre": "Cuboides",
  "tipo": "hueso",
  "zona": "foot",
  "nombres": [
   "Cuboides"
  ],
  "descripcion": "Hueso cúbico del borde lateral del pie, en la fila distal del tarso. Une el calcáneo con el cuarto y quinto metatarsianos y sostiene el arco lateral.",
  "referencias": [
   "Se localiza en el borde lateral del pie, entre la base del quinto metatarsiano (por delante) y el calcáneo (por detrás).",
   "Un punto práctico: la tuberosidad del quinto metatarsiano se palpa primero y el cuboides queda justo detrás.",
   "En la cara plantar tiene una tuberosidad y un surco por donde pasa el tendón del fibular largo; esta zona no se alcanza bien con la palpación."
  ],
  "relaciones": [
   "Articula con el calcáneo (posterior), el navicular y el cuneiforme lateral (medial) y con los metatarsianos 4 y 5 (anterior).",
   "El tendón del fibular largo corre por su surco plantar antes de cruzar la planta.",
   "Contribuye al arco longitudinal lateral del pie.",
   "Ligamentos plantares y dorsales lo sujetan al calcáneo y a las bases de los metatarsianos."
  ],
  "lesiones": [
   "Síndrome del cuboides: dolor en el borde lateral del pie atribuido a una subluxación o disfunción del hueso, sobre todo en deportistas.",
   "Fracturas aisladas poco frecuentes; suelen asociarse a otras lesiones del mediopié.",
   "Fractura por estrés en corredores y bailarines.",
   "Lesiones de los tendones fibulares cercanos que simulan dolor del cuboides."
  ],
  "fisio": [
   "Dolor lateral del mediopié que empeora con la carga o con la propulsión: valorar cuboides, fibular largo y base del quinto metatarsiano.",
   "Hay que descartar fractura o fractura por estrés antes de cualquier técnica de movilización del cuboides.",
   "Si hay hinchazón marcada o imposibilidad de apoyar tras un traumatismo, derivar para imagen."
  ],
  "fuentes": [
   "Wikipedia: Cuboid bone — https://en.wikipedia.org/wiki/Cuboid_bone",
   "Kenhub: Tarsal bones (cuboides) — https://www.kenhub.com/en/library/anatomy/tarsal-bones"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "huesos-cuneiformes",
  "nombre": "Cuneiformes (medial, intermedio y lateral)",
  "tipo": "hueso",
  "zona": "foot",
  "nombres": [
   "Cuneiforme medial",
   "Cuneiforme intermedio",
   "Cuneiforme lateral"
  ],
  "descripcion": "Tres huesos en forma de cuña de la fila distal del tarso, entre el navicular y las bases de los metatarsianos 1 a 3. Forman el arco transverso del pie.",
  "referencias": [
   "El cuneiforme medial es el mayor y se palpa en el borde medial del pie, entre el navicular y la base del primer metatarsiano.",
   "Los cuneiformes intermedio y lateral están bajo el dorso del pie, en un plano más profundo; el intermedio es el más corto y deja a la base del segundo metatarsiano como una especie de llave.",
   "El tubérculo del navicular es una referencia para encontrar el cuneiforme medial, justo adelante."
  ],
  "relaciones": [
   "Articulan atrás con el navicular y adelante con las bases de los metatarsianos 1 a 3 (el lateral también con el cuarto).",
   "El lateral se une al cuboides; los tres se unen entre sí.",
   "El tibial anterior y el fibular largo se insertan en el cuneiforme medial; el tibial posterior manda expansiones a sus caras plantares.",
   "El ligamento de Lisfranc va del cuneiforme medial a la base del segundo metatarsiano."
  ],
  "lesiones": [
   "Lesión de Lisfranc: esguince o luxofractura de las articulaciones tarsometatarsianas que puede incluir el cuneiforme medial.",
   "Fracturas aisladas de cuneiformes poco frecuentes por el soporte ligamentoso.",
   "Fracturas por estrés en corredores o reclutas.",
   "Artrosis del mediopié tras lesiones antiguas."
  ],
  "fisio": [
   "Dolor en el mediopié tras torcedura con carga, con hinchazón dorsal o hematoma plantar, sugiere lesión de Lisfranc: no cargar y derivar.",
   "Un esguince de mediopié no tratado puede terminar en pérdida del arco y dolor crónico.",
   "Evitar movilizaciones fuertes del mediopié mientras no se descarte inestabilidad."
  ],
  "fuentes": [
   "Wikipedia: Cuneiform bones — https://en.wikipedia.org/wiki/Cuneiform_bones",
   "Kenhub: Cuneiform bones — https://www.kenhub.com/en/library/anatomy/cuneiform-bones"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "metatarsiano-1",
  "nombre": "Primer metatarsiano",
  "tipo": "hueso",
  "zona": "foot",
  "nombres": [
   "Metatarsiano 1"
  ],
  "descripcion": "Hueso largo del borde medial del antepié, el más corto y grueso de los cinco. Soporta gran parte de la carga en la propulsión y se une al dedo gordo.",
  "referencias": [
   "La base se palpa en el borde medial del pie, un poco adelante del cuneiforme medial.",
   "El cuerpo es subcutáneo en el dorso y borde medial del pie.",
   "La cabeza forma la prominencia del juanete (\"bunio\") en la base del dedo gordo.",
   "En la cara plantar de la cabeza hay dos sesamoideos que se perciben bajo la piel."
  ],
  "relaciones": [
   "Articula con el cuneiforme medial (tarsometatarsiana) y con la falange proximal del dedo gordo.",
   "Se insertan en la base el tibial anterior y el fibular largo.",
   "Los dos sesamoideos plantares se relacionan con los tendones del flexor corto del dedo gordo.",
   "Es parte del arco longitudinal medial y del arco transverso anterior."
  ],
  "lesiones": [
   "Hallux valgus (juanete): desvío medial del primer metatarsiano y lateral del dedo gordo.",
   "Fracturas por estrés y por golpe directo.",
   "Hallux rigidus (artrosis) en la primera metatarsofalángica.",
   "Lesiones de sesamoideos (fractura, sesamoiditis) por impacto repetido."
  ],
  "fisio": [
   "Observar la carga: el primer radio debe apoyar bien; un colapso o un juanete cambia la marcha.",
   "Al palpar los sesamoideos, hacerlo con presión suave: son dolorosos con cargas altas.",
   "Cuidado al movilizar la primera metatarsofalángica si hay inflamación o dolor agudo; valorar calzado."
  ],
  "fuentes": [
   "Wikipedia: Metatarsal bones — https://en.wikipedia.org/wiki/Metatarsal_bones",
   "Kenhub: Metatarsal bones — https://www.kenhub.com/en/library/anatomy/metatarsal-bones"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "metatarsianos-2-4",
  "nombre": "Metatarsianos 2 a 4",
  "tipo": "hueso",
  "zona": "foot",
  "nombres": [
   "Metatarsiano 2",
   "Metatarsiano 3",
   "Metatarsiano 4"
  ],
  "descripcion": "Tres huesos largos centrales del antepié, más delgados que el primero. El segundo es el más largo y queda \"encajado\" entre los cuneiformes.",
  "referencias": [
   "Los cuerpos se palpan en el dorso del pie entre los tendones extensores, separados por los espacios interóseos.",
   "Las cabezas se sienten en la planta y en la base de los dedos 2 a 4, al flexionar los dedos.",
   "La base del segundo queda en el centro del dorso del pie; el dolor ahí puede indicar lesión de Lisfranc."
  ],
  "relaciones": [
   "El segundo articula con los tres cuneiformes; el tercero con el cuneiforme lateral; el cuarto con el cuneiforme lateral y el cuboides.",
   "Las cabezas forman las articulaciones metatarsofalángicas con las falanges proximales.",
   "Los músculos interóseos dorsales y plantares se insertan o nacen en sus cuerpos.",
   "Sus cabezas y los espacios entre ellas se relacionan con los nervios digitales plantares."
  ],
  "lesiones": [
   "Fracturas por estrés (\"fractura de marcha\"), muy comunes en el segundo y el tercero.",
   "Fracturas por impacto directo o por aplastamiento.",
   "Lesión de Lisfranc en las bases, que desplaza los metatarsianos.",
   "Metatarsalgia y neuroma de Morton en la zona de las cabezas."
  ],
  "fisio": [
   "Dolor en el antepié que aparece al aumentar el entrenamiento, con dolor puntual a la palpación del cuerpo: pensar en fractura por estrés y reducir carga.",
   "Dolor en la base del segundo con hinchazón dorsal tras torcedura: sospechar Lisfranc y derivar.",
   "Revisar calzado, tipo de apoyo y carga de las cabezas en metatarsalgia."
  ],
  "fuentes": [
   "Wikipedia: Metatarsal bones — https://en.wikipedia.org/wiki/Metatarsal_bones",
   "Kenhub: Metatarsal bones — https://www.kenhub.com/en/library/anatomy/metatarsal-bones"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "metatarsiano-5",
  "nombre": "Quinto metatarsiano",
  "tipo": "hueso",
  "zona": "foot",
  "nombres": [
   "Metatarsiano 5"
  ],
  "descripcion": "Hueso largo del borde lateral del antepié. Su base tiene una tuberosidad prominente donde se inserta el fibular corto.",
  "referencias": [
   "La tuberosidad (apófisis estiloides) se palpa como un abultamiento en el borde lateral del pie, a media distancia entre talón y dedo pequeño.",
   "El cuerpo es subcutáneo y se recorre hacia el dedo pequeño.",
   "La zona metafisaria justo adelante de la tuberosidad es donde ocurre la fractura de Jones.",
   "La cabeza se percibe en la base del quinto dedo, en la planta lateral."
  ],
  "relaciones": [
   "La base articula con el cuboides y con el cuarto metatarsiano; la cabeza con la falange proximal del quinto dedo.",
   "Se insertan el fibular corto (tuberosidad) y el fibular tercero (dorso de la base).",
   "Nace de la base el flexor corto del quinto dedo.",
   "Por el borde lateral de la base pasa también parte de la fascia plantar."
  ],
  "lesiones": [
   "Fractura por avulsión de la tuberosidad (zona I), frecuente tras torcedura en inversión; suele consolidar bien.",
   "Fractura de Jones (zona II): en la unión entre la base y el cuerpo; tiene irrigación limitada y riesgo de retraso o falla de consolidación.",
   "Fractura por estrés diafisaria proximal (zona III) en atletas.",
   "Mecanismo típico de la fractura de Jones: pie en puntas con inversión, al cambiar de dirección con el talón levantado (baile, tenis, básquetbol)."
  ],
  "fisio": [
   "Dolor y hematoma en el borde lateral del pie tras inversión: palpar la tuberosidad; si hay dolor óseo exquisito, derivar para radiografía antes de cargar.",
   "Una fractura de Jones requiere manejo médico estricto (a menudo sin carga o cirugía); no progresar la carga sin autorización.",
   "En deportistas con dolor lateral crónico del pie, considerar fractura por estrés y evitar impacto."
  ],
  "fuentes": [
   "Wikipedia: Metatarsal bones — https://en.wikipedia.org/wiki/Metatarsal_bones",
   "Wikipedia: Jones fracture — https://en.wikipedia.org/wiki/Jones_fracture",
   "Kenhub: Metatarsal bones — https://www.kenhub.com/en/library/anatomy/metatarsal-bones"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "aorta",
  "nombre": "Aorta (ascendente, arco y descendente)",
  "tipo": "arteria",
  "zona": "chest",
  "nombres": [
   "Aorta ascendente",
   "Arco aórtico",
   "Aorta descendente"
  ],
  "descripcion": "Arteria principal del cuerpo. Sale del ventrículo izquierdo, forma un arco en el tórax y desciende hasta el abdomen; reparte la sangre oxigenada a todo el organismo.",
  "referencias": [
   "La aorta ascendente, de unos 5 cm, va del ventrículo izquierdo hasta el nivel del ángulo esternal.",
   "El arco aórtico se curva hacia atrás y a la izquierda hasta aproximadamente T4.",
   "La aorta torácica descendente va de T4 al diafragma, junto a la columna.",
   "No se palpa en el tórax; su pulso sólo se percibe como latido en la parte alta del abdomen en personas delgadas."
  ],
  "relaciones": [
   "De la aorta ascendente salen las arterias coronarias.",
   "Del arco salen el tronco braquiocefálico (que da la subclavia y la carótida derechas), la carótida común izquierda y la subclavia izquierda.",
   "De la porción torácica salen las arterias intercostales posteriores y ramas bronquiales y esofágicas.",
   "Vecinos del arco: tráquea, esófago y conducto torácico atrás; nervios vago y frénico adelante."
  ],
  "lesiones": [
   "Aneurisma aórtico: dilatación de la pared; en el arco y la ascendente se asocia con síndromes del tejido conectivo (Marfan, Ehlers-Danlos), en el abdomen con aterosclerosis.",
   "Disección aórtica, emergencia con dolor súbito e intenso de pecho o espalda.",
   "Coartación aórtica: estrechamiento congénito, asociado a hipertensión en brazos.",
   "Rotura traumática, casi siempre en la aorta torácica distal a la subclavia izquierda, en accidentes de alta energía."
  ],
  "fisio": [
   "Dolor torácico o dorsal súbito, intenso, \"desgarrante\", con sudoración, mareo o diferencia de pulso entre brazos: emergencia, suspender y activar atención urgente.",
   "Antecedentes de aneurisma o síndrome de Marfan: evitar esfuerzos máximos o maniobras de Valsalva y avisar al médico tratante.",
   "Dolor dorsal sin origen mecánico claro que no cambia con el movimiento amerita descartar causa vascular."
  ],
  "fuentes": [
   "Wikipedia: Aorta — https://en.wikipedia.org/wiki/Aorta",
   "Kenhub: Aorta — https://www.kenhub.com/en/library/anatomy/aorta"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "carotida-comun",
  "nombre": "Arteria carótida común",
  "tipo": "arteria",
  "zona": "head",
  "nombres": [
   "Arteria carótida común"
  ],
  "descripcion": "Arteria del cuello que lleva sangre de la aorta a la cabeza. Se divide en carótida interna (cerebro y ojo) y externa (cara y cuello).",
  "referencias": [
   "Sube a cada lado del cuello desde detrás de la articulación esternoclavicular hasta el borde superior del cartílago tiroides.",
   "El pulso carotídeo se palpa junto a la tráquea, por dentro del borde anterior del esternocleidomastoideo, a nivel del cartílago tiroides.",
   "Se divide cerca de C4 (borde superior del tiroides); en esa zona está el seno carotídeo.",
   "Palpar con una mano y un lado a la vez, con presión suave."
  ],
  "relaciones": [
   "La derecha nace del tronco braquiocefálico; la izquierda, directo del arco aórtico.",
   "Va dentro de la vaina carotídea con la vena yugular interna (lateral) y el nervio vago (posterior).",
   "Casi no da ramas en el cuello; se bifurca en carótida interna y externa.",
   "Cerca de la bifurcación están el seno carotídeo (barorreceptores) y el cuerpo carotídeo (quimiorreceptor)."
  ],
  "lesiones": [
   "Estenosis carotídea por placa de ateroma, causa importante de isquemia transitoria e ictus.",
   "Disección carotídea (espontánea o por trauma cervical).",
   "Hipersensibilidad del seno carotídeo: la presión provoca bradicardia, hipotensión y mareo o desmayo.",
   "Carotidinia: dolor sensible cerca de la bifurcación."
  ],
  "fisio": [
   "Señales de ictus (NHS, FAST): cara caída de un lado, debilidad o entumecimiento de un brazo, habla arrastrada o confusa; llamar de inmediato a emergencias, incluso si se resuelven.",
   "Otras señales: pérdida de visión, mareo, caída, dolor de cabeza intenso, náusea.",
   "Si hay que tomar el pulso carotídeo (p. ej. en una emergencia), palpar de un solo lado y con suavidad; no masajear ni comprimir, sobre todo en personas con mareos o desmayos.",
   "Tras un golpe o torsión del cuello con dolor cervical nuevo, dolor de cabeza intenso o síntomas neurológicos, sospechar lesión vascular y derivar."
  ],
  "fuentes": [
   "Wikipedia: Common carotid artery — https://en.wikipedia.org/wiki/Common_carotid_artery",
   "Kenhub: Common carotid artery — https://www.kenhub.com/en/library/anatomy/common-carotid-artery",
   "NHS: Stroke, síntomas (FAST) — https://www.nhs.uk/conditions/stroke/symptoms/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "carotida-externa",
  "nombre": "Arteria carótida externa",
  "tipo": "arteria",
  "zona": "head",
  "nombres": [
   "Arteria carótida externa"
  ],
  "descripcion": "Rama de la carótida común que irriga cuello, cara, cuero cabelludo y estructuras profundas de la cabeza. Termina dentro de la parótida.",
  "referencias": [
   "Nace cerca del borde superior del cartílago tiroides, en el triángulo carotídeo, más superficial y medial que la interna.",
   "Sube hacia el cuello de la mandíbula; sus ramas distales (facial, temporal superficial) tienen pulso palpable.",
   "Va cubierta por piel, platisma y el borde anterior del esternocleidomastoideo."
  ],
  "relaciones": [
   "Da ocho ramas: tiroidea superior, faríngea ascendente, lingual, facial, occipital, auricular posterior y las terminales maxilar y temporal superficial.",
   "El nervio hipogloso la cruza cerca de su origen.",
   "Dentro de la parótida va profunda al nervio facial.",
   "Se une por anastomosis con la carótida interna (por ejemplo, a través de la oftálmica) y con la subclavia (por la occipital)."
  ],
  "lesiones": [
   "Estenosis aterosclerótica (se mide con Doppler).",
   "Heridas penetrantes del cuello o de la cara con sangrado abundante.",
   "Hemorragia nasal o bucal severa, con control por ramas del sistema externo.",
   "Lesión de la arteria meníngea media (rama de la maxilar) en fracturas del pterion, con hematoma epidural."
  ],
  "fisio": [
   "No comprimir de manera sostenida la región anterolateral del cuello.",
   "Después de un trauma craneal con cefalea creciente, somnolencia o vómito, sospechar hematoma epidural y pedir ayuda urgente.",
   "Si hay dolor de cabeza nuevo con sensibilidad en las sienes en adultos mayores, derivar."
  ],
  "fuentes": [
   "Wikipedia: External carotid artery — https://en.wikipedia.org/wiki/External_carotid_artery",
   "TeachMeAnatomy: Cuello, ramas de la carótida externa — https://teachmeanatomy.info/neck/vessels/arterial-supply/",
   "Kenhub: Common carotid artery — https://www.kenhub.com/en/library/anatomy/common-carotid-artery"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-facial",
  "nombre": "Arteria facial y sus ramas",
  "tipo": "arteria",
  "zona": "head",
  "nombres": [
   "Arteria facial",
   "Arteria labial superior",
   "Arteria labial inferior",
   "Arteria nasal dorsal",
   "Arteria nasal lateral",
   "Arteria right angular artery",
   "Arteria right supratrochlear artery"
  ],
  "descripcion": "Rama de la carótida externa que cruza la mandíbula y sube por la cara hasta el ángulo interno del ojo. Irriga labios, nariz y mejilla.",
  "referencias": [
   "Nace en el triángulo carotídeo, un poco arriba de la lingual.",
   "Pasa por debajo del vientre posterior del digástrico y por la glándula submandibular.",
   "Su pulso se palpa al cruzar el borde inferior de la mandíbula, justo delante del masetero (escotadura antegonial).",
   "Después sube sinuosa hacia la comisura de la boca, el lado de la nariz y el ángulo medial del ojo."
  ],
  "relaciones": [
   "Sus ramas incluyen la labial superior, la labial inferior, la nasal lateral (y dorsal) y la angular terminal.",
   "En el cuello da ramas palatina ascendente, tonsilar, submentoniana y glandulares.",
   "Va aproximadamente en paralelo a la vena facial, sin tocarla directamente.",
   "La angular se anastomosa con ramas de la oftálmica, comunicando carótida externa e interna."
  ],
  "lesiones": [
   "Sangrado abundante por herida o cirugía maxilofacial.",
   "Lesión en traumatismos de mandíbula o cara.",
   "Infección de la cara (zona del triángulo nasolabial) que puede extenderse por vasos hacia estructuras intracraneales.",
   "Oclusión o daño por inyecciones en relleno estético (la angular se comunica con el ojo)."
  ],
  "fisio": [
   "Se puede percibir el pulso de la facial en el borde de la mandíbula; no es una referencia de rutina, pero ayuda al localizar.",
   "Evitar presión intensa o masaje profundo sobre el borde de la mandíbula en caso de lesión reciente.",
   "Hinchazón, enrojecimiento y dolor en la cara con fiebre: derivar."
  ],
  "fuentes": [
   "Wikipedia: Facial artery — https://en.wikipedia.org/wiki/Facial_artery",
   "Kenhub: Facial artery — https://www.kenhub.com/en/library/anatomy/facial-artery"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-temporal-superficial",
  "nombre": "Arteria temporal superficial y auriculares",
  "tipo": "arteria",
  "zona": "head",
  "nombres": [
   "Arteria temporal superficial",
   "Arteria right deep auricular artery",
   "Arteria left deep auricular artery",
   "Arteria auricular posterior"
  ],
  "descripcion": "Rama terminal más pequeña de la carótida externa. Sube por delante de la oreja para irrigar la sien y el cuero cabelludo, junto con las arterias auriculares.",
  "referencias": [
   "Nace dentro de la parótida, detrás del cuello de la mandíbula.",
   "Su pulso se palpa delante del trago, justo arriba del arco cigomático.",
   "A unos 3 a 5 cm arriba del arco se divide en ramas frontal y parietal, que se ven o se sienten bajo la piel de la sien.",
   "La arteria auricular posterior sube detrás de la oreja, en el surco entre el pabellón y la apófisis mastoides."
  ],
  "relaciones": [
   "Va con el nervio auriculotemporal, que queda justo detrás.",
   "Cerca cruzan ramas temporal y cigomática del nervio facial.",
   "Da ramas transversa de la cara, temporal media y auriculares anteriores.",
   "Se anastomosa con la supraorbitaria (rama de la oftálmica) y con las arterias occipital y auricular posterior."
  ],
  "lesiones": [
   "Arteritis de células gigantes (temporal): cefalea, dolor al tocar la sien, alteración visual; puede provocar ceguera.",
   "Heridas del cuero cabelludo con sangrado importante.",
   "Aneurisma o pseudoaneurisma tras traumatismo.",
   "Se usa como injerto en cirugías de derivación cerebral."
  ],
  "fisio": [
   "Dolor de cabeza nuevo, sensibilidad en las sienes, dolor al masticar o cambios en la visión en una persona mayor: derivar con urgencia.",
   "Al tratar ATM o cabeza, evitar presión fuerte sobre el pulso temporal si hay dolor vascular.",
   "Observar el pulso temporal; un cordón duro, doloroso o sin pulso es motivo de aviso médico."
  ],
  "fuentes": [
   "Wikipedia: Superficial temporal artery — https://en.wikipedia.org/wiki/Superficial_temporal_artery",
   "Wikipedia: Posterior auricular artery — https://en.wikipedia.org/wiki/Posterior_auricular_artery",
   "Kenhub: Superficial temporal artery — https://www.kenhub.com/en/library/anatomy/superficial-temporal-artery"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-maxilar",
  "nombre": "Arteria maxilar",
  "tipo": "arteria",
  "zona": "head",
  "nombres": [
   "Arteria maxilar"
  ],
  "descripcion": "Rama terminal mayor de la carótida externa. Nace detrás del cuello de la mandíbula y reparte sangre a las estructuras profundas de la cara, los dientes, las meninges y la nariz.",
  "referencias": [
   "Nace en la parótida, detrás del cuello de la mandíbula; no se palpa por su profundidad.",
   "Pasa entre la rama de la mandíbula y el ligamento esfenomandibular.",
   "Cruza en relación con el pterigoideo lateral y llega a la fosa pterigopalatina.",
   "Se divide en tres partes (mandibular, pterigoidea y pterigopalatina) según su relación con el pterigoideo lateral."
  ],
  "relaciones": [
   "Parte mandibular: ramas auricular profunda, timpánica anterior, meníngea media, alveolar inferior y meníngea accesoria.",
   "Parte pterigoidea: ramas para músculos de la masticación (maseterina, pterigoideas, temporales profundas, bucal).",
   "Parte pterigopalatina: infraorbitaria, alveolar superior posterior, palatina descendente, esfenopalatina y otras.",
   "Cerca están el nervio auriculotemporal, el nervio alveolar inferior y la inserción del temporal."
  ],
  "lesiones": [
   "Rotura de la arteria meníngea media en fracturas del pterion, con hematoma epidural.",
   "Epistaxis por la esfenopalatina.",
   "Sangrado en cirugía oral o maxilofacial.",
   "Lesión por fracturas de la mandíbula o del macizo facial."
  ],
  "fisio": [
   "Tras trauma en la sien con cefalea creciente, vómito, somnolencia o debilidad: emergencia, no esperar.",
   "En pacientes con dolor de ATM, recordar que los tejidos profundos mandibulares están muy vascularizados; evitar presiones intensas tras trauma.",
   "Hemorragia nasal repetida y abundante: derivar."
  ],
  "fuentes": [
   "Wikipedia: Maxillary artery — https://en.wikipedia.org/wiki/Maxillary_artery",
   "Kenhub: Maxillary artery — https://www.kenhub.com/en/library/anatomy/maxillary-artery",
   "TeachMeAnatomy: Cuello, carótida externa — https://teachmeanatomy.info/neck/vessels/arterial-supply/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-oftalmica",
  "nombre": "Arteria oftálmica",
  "tipo": "arteria",
  "zona": "head",
  "nombres": [
   "Arteria oftálmica"
  ],
  "descripcion": "Rama de la carótida interna que entra a la órbita junto al nervio óptico. Irriga el ojo, la órbita, parte de la nariz y la frente.",
  "referencias": [
   "Nace de la carótida interna al salir del seno cavernoso, cerca de la apófisis clinoides anterior.",
   "Pasa por el canal óptico, por debajo y afuera del nervio óptico, y cruza hacia medial.",
   "Corre por la pared medial de la órbita; no se palpa.",
   "Sus ramas terminales (supratroclear y dorsal de la nariz) emergen en la frente y el dorso nasal."
  ],
  "relaciones": [
   "Rama más importante: la arteria central de la retina, que irriga la retina interna.",
   "Da arterias ciliares, lagrimal, supraorbitaria, etmoidales anterior y posterior y palpebrales mediales.",
   "Se anastomosa con ramas de la facial, la maxilar y la temporal superficial, uniendo carótida interna y externa.",
   "Está en estrecha relación con el nervio óptico dentro del canal óptico."
  ],
  "lesiones": [
   "Oclusión de la arteria central de la retina: pérdida súbita e indolora de la visión de un ojo (emergencia oftalmológica).",
   "Amaurosis fugax: pérdida transitoria de visión por embolia o descenso del flujo, a menudo desde una carótida enferma.",
   "Síndrome isquémico ocular por estenosis grave.",
   "Aneurismas cercanos al origen."
  ],
  "fisio": [
   "Pérdida repentina de visión en un ojo, aunque dure minutos: urgencia, descartar enfermedad de la carótida e ictus; no continuar la sesión.",
   "Ante visión borrosa con otros signos de ictus (cara, brazo, habla), activar emergencias.",
   "Evitar presión sobre los globos oculares al trabajar en cara."
  ],
  "fuentes": [
   "Wikipedia: Ophthalmic artery — https://en.wikipedia.org/wiki/Ophthalmic_artery",
   "Kenhub: Ophthalmic artery — https://www.kenhub.com/en/library/anatomy/ophthalmic-artery"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arterias-lingual-occipital",
  "nombre": "Arterias lingual, sublingual y occipital",
  "tipo": "arteria",
  "zona": "head",
  "nombres": [
   "Arteria lingual",
   "Arteria sublingual",
   "Arteria occipital"
  ],
  "descripcion": "Tres ramas de la carótida externa: la lingual irriga la lengua, la sublingual la glándula sublingual y el piso de la boca, y la occipital la parte posterior del cuero cabelludo y los músculos cervicales altos.",
  "referencias": [
   "La lingual nace cerca del asta mayor del hioides y pasa profunda al hiogloso hacia el piso de la boca.",
   "La sublingual sale en el borde anterior del hiogloso y va a la glándula sublingual y encía.",
   "La occipital nace en la parte posterior de la carótida externa, pasa bajo el vientre posterior del digástrico y sube al surco mastoideo.",
   "La occipital perfora entre el trapecio y el esternocleidomastoideo y sube por el cuero cabelludo junto al nervio occipital mayor; el pulso occipital se nota a veces en la base del cráneo."
  ],
  "relaciones": [
   "El nervio hipogloso cruza la lingual; ésta pasa debajo del hiogloso, mientras el nervio lingual pasa por arriba.",
   "La lingual da ramas suprahioidea, dorsales de la lengua, sublingual y la arteria profunda de la lengua terminal.",
   "La occipital da ramas esternocleidomastoidea, auricular, meníngea y una descendente que se anastomosa con la vertebral y la cervical profunda.",
   "La occipital reposa sobre músculos suboccipitales (oblicuo superior, semiespinoso de la cabeza, recto lateral)."
  ],
  "lesiones": [
   "Sangrado de la lengua o del piso de la boca por trauma o cirugía oral.",
   "Lesión de la lingual en cirugía de implantes con hematoma del piso de boca, que puede comprometer la vía aérea.",
   "Neuralgia o cefalea occipital con compresión de estructuras vasculares y nerviosas junto al nervio occipital mayor.",
   "Variaciones de origen (la occipital puede nacer de la carótida interna o la vertebral)."
  ],
  "fisio": [
   "Evitar presión profunda en la región submandibular, que contiene lingual y hipogloso.",
   "Cefalea occipital: valorar tensión suboccipital y trapecio superior, y descartar signos de alarma neurológica.",
   "Hinchazón rápida en la boca o debajo de la lengua tras procedimiento dental: emergencia por riesgo de vía aérea."
  ],
  "fuentes": [
   "Wikipedia: Lingual artery — https://en.wikipedia.org/wiki/Lingual_artery",
   "Wikipedia: Occipital artery — https://en.wikipedia.org/wiki/Occipital_artery",
   "Kenhub: Lingual artery — https://www.kenhub.com/en/library/anatomy/lingual-artery",
   "Kenhub: Occipital artery — https://www.kenhub.com/en/library/anatomy/occipital-artery"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-vertebral",
  "nombre": "Arteria vertebral y circulación vertebrobasilar",
  "tipo": "arteria",
  "zona": "head",
  "nombres": [],
  "descripcion": "Arteria que sube por los agujeros transversos de las vértebras cervicales y entra al cráneo; las dos se unen para formar la arteria basilar. Es la base de la circulación vertebrobasilar (posterior) que irriga tronco encefálico, cerebelo y parte posterior del cerebro.",
  "referencias": [
   "Nace de la primera porción de la subclavia, por arriba.",
   "Entra por el agujero transverso de C6 y sube por los de C6 a C1 (no se palpa).",
   "Rodea el arco posterior del atlas por su surco, atraviesa el triángulo suboccipital y entra por el agujero magno.",
   "Las dos se unen en el borde inferior del puente para formar la basilar."
  ],
  "relaciones": [
   "Tiene cuatro segmentos: preforaminal, foraminal, atlantoideo (extradural) e intradural.",
   "Da las arterias espinales anterior y posterior, la cerebelosa posteroinferior (PICA) y ramas meníngeas y musculares.",
   "La basilar termina en las dos arterias cerebrales posteriores, que forman parte del polígono de Willis y se conectan con la carótida interna por las comunicantes posteriores.",
   "La asimetría entre ambas es común; una puede ser hipoplásica (según la fuente, 2 a 25 % de las personas)."
  ],
  "lesiones": [
   "Disección de la arteria vertebral: desgarro de la pared que puede causar ictus del territorio posterior; puede relacionarse con movimientos cervicales extremos o manipulación.",
   "Insuficiencia vertebrobasilar: síntomas transitorios (vértigo, alteraciones visuales, dificultad para hablar) por flujo disminuido, sobre todo por aterosclerosis.",
   "Síndrome rotacional (Bow Hunter): compresión de la arteria al girar el cuello, rara.",
   "Ictus de la circulación posterior (por ejemplo síndrome de Wallenberg en el bulbo)."
  ],
  "fisio": [
   "La arteria vertebral recorre un trayecto estrecho y curvo con rotación y extensión cervicales altas que la estiran o comprimen; las fuentes señalan que la manipulación cervical puede asociarse a disección, por lo que se tamiza antes de movilizar o manipular el cuello.",
   "Preguntar por mareo, vértigo, visión doble, dificultad para hablar o tragar, adormecimiento facial, caídas, dolor cervical o cefalea nuevos e intensos; si aparecen, suspender y derivar con urgencia.",
   "Las pruebas posicionales no son concluyentes; no sustituyen el juicio clínico ni la historia. Evitar posiciones sostenidas de extremo de rotación y extensión.",
   "Con factores de riesgo (hipertensión, tabaquismo, antecedentes de ictus, trauma cervical reciente) preferir técnicas suaves y comentar con el médico."
  ],
  "fuentes": [
   "Wikipedia: Vertebral artery — https://en.wikipedia.org/wiki/Vertebral_artery",
   "Kenhub: Vertebral artery — https://www.kenhub.com/en/library/anatomy/vertebral-artery",
   "Wikipedia: Vertebrobasilar insufficiency — https://en.wikipedia.org/wiki/Vertebrobasilar_insufficiency"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-subclavia",
  "nombre": "Arteria subclavia",
  "tipo": "arteria",
  "zona": "shoulders",
  "nombres": [
   "Arteria subclavia",
   "Arteria tiroidea inferior",
   "Arteria cervical profunda"
  ],
  "descripcion": "Arteria que lleva sangre al brazo y manda ramas al cuello y al cerebro. Sale del arco aórtico (izquierda) o del tronco braquiocefálico (derecha) y pasa sobre la primera costilla.",
  "referencias": [
   "Se divide en tres partes según el escaleno anterior: antes, detrás y después de él.",
   "Pasa sobre la primera costilla, entre los escalenos anterior y medio, en el triángulo posterior del cuello.",
   "En la fosa supraclavicular puede sentirse latir en algunas personas delgadas; no es un pulso de rutina.",
   "Cambia de nombre a axilar en el borde lateral de la primera costilla."
  ],
  "relaciones": [
   "Ramas principales: vertebral, tronco tirocervical (tiroidea inferior, cervical ascendente, transversa del cuello, supraescapular), torácica interna, tronco costocervical (cervical profunda e intercostal suprema) y escapular dorsal.",
   "La arteria cervical profunda sube por la parte posterior del cuello hacia músculos profundos.",
   "Los troncos del plexo braquial pasan junto a la arteria entre los escalenos.",
   "La vena subclavia pasa por delante del escaleno anterior; la arteria va por detrás."
  ],
  "lesiones": [
   "Síndrome del desfiladero torácico (compresión vascular y nerviosa), con entumecimiento, frialdad y cambios de color del brazo.",
   "Síndrome de robo de la subclavia: una obstrucción proximal invierte el flujo en la vertebral.",
   "Aneurisma o trombosis.",
   "Lesiones por fractura de clavícula o primera costilla, o por catéteres."
  ],
  "fisio": [
   "Brazo frío, pálido, con cambios de color o fatiga en tareas por encima de la cabeza, con pulso débil: sospechar compromiso vascular y derivar.",
   "Diferencia de presión o pulso entre ambos brazos o mareo al usar el brazo: señal de alarma.",
   "Tener cuidado al presionar o estirar el desfiladero (escalenos, primera costilla, fosa supraclavicular)."
  ],
  "fuentes": [
   "Wikipedia: Subclavian artery — https://en.wikipedia.org/wiki/Subclavian_artery",
   "TeachMeAnatomy: Miembro superior, arterias — https://teachmeanatomy.info/upper-limb/vessels/arteries/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-axilar",
  "nombre": "Arteria axilar",
  "tipo": "arteria",
  "zona": "shoulders",
  "nombres": [
   "Arteria axilar"
  ],
  "descripcion": "Continuación de la subclavia en la axila, entre el borde lateral de la primera costilla y el borde inferior del redondo mayor. Irriga el hombro y la pared del tórax y sigue como braquial.",
  "referencias": [
   "Se divide en tres partes según el pectoral menor (antes, detrás y después).",
   "Su pulso se puede palpar en lo alto de la axila, contra la cabeza del húmero, con el brazo ligeramente abducido.",
   "Pasa profunda al pectoral menor y va dentro de la vaina axilar con el plexo braquial.",
   "La vena axilar va por su lado medial."
  ],
  "relaciones": [
   "Primera parte: arteria torácica superior.",
   "Segunda parte: toracoacromial y torácica lateral.",
   "Tercera parte: subescapular y circunflejas humerales anterior y posterior, que rodean el cuello quirúrgico del húmero.",
   "Los tres cordones del plexo braquial la rodean; el cordón posterior queda detrás de la segunda parte."
  ],
  "lesiones": [
   "Lesión por luxación del hombro o fractura del cuello quirúrgico del húmero (circunflejas).",
   "Aneurisma o trombosis, que puede comprimir el plexo braquial con hormigueo y debilidad.",
   "Oclusión por lesión repetitiva por encima de la cabeza (lanzadores).",
   "Heridas penetrantes de la axila."
  ],
  "fisio": [
   "Tras luxación o fractura proximal de húmero, comprobar pulso, color, temperatura y sensibilidad de la mano; si faltan, emergencia.",
   "Evitar presión prolongada en la axila (muletas mal ajustadas, tracciones fuertes).",
   "Palpar el pulso axilar con suavidad y comparar con el lado contrario."
  ],
  "fuentes": [
   "Wikipedia: Axillary artery — https://en.wikipedia.org/wiki/Axillary_artery",
   "TeachMeAnatomy: Miembro superior, arterias — https://teachmeanatomy.info/upper-limb/vessels/arteries/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-braquial",
  "nombre": "Arteria braquial",
  "tipo": "arteria",
  "zona": "arms",
  "nombres": [
   "Arteria braquial",
   "Arteria colateral ulnar superior",
   "Arteria colateral ulnar inferior"
  ],
  "descripcion": "Arteria principal del brazo; continúa a la axilar y baja por la cara medial del brazo hasta la fosa cubital, donde se divide en radial y cubital.",
  "referencias": [
   "Comienza en el borde inferior del redondo mayor y baja por el surco bicipital medial.",
   "El pulso se palpa en la cara medial del brazo, contra el húmero, y en el codo, justo medial al tendón del bíceps.",
   "Es superficial, cubierta solo por piel y fascia, y en la fosa cubital queda bajo la aponeurosis bicipital.",
   "Termina unos 1 cm distal al pliegue del codo, a nivel del cuello del radio."
  ],
  "relaciones": [
   "Ramas: braquial profunda, colateral ulnar superior y colateral ulnar inferior; terminales radial y cubital.",
   "El nervio mediano la acompaña: lateral al inicio y luego cruza a medial.",
   "Va con dos venas comitantes; cerca pasan el nervio cubital y los cutáneos del antebrazo.",
   "Está cubierta en el codo por la aponeurosis bicipital, con la vena basílica cerca."
  ],
  "lesiones": [
   "Fractura supracondílea de húmero, sobre todo en niños, con riesgo de lesión o compresión de la arteria.",
   "Síndrome compartimental y contractura isquémica de Volkmann tras oclusión o lesión.",
   "Heridas penetrantes, punciones o canalizaciones.",
   "Trombosis o embolia."
  ],
  "fisio": [
   "Se usa para la toma de presión arterial: manguito en el brazo y estetoscopio sobre la fosa cubital.",
   "Tras fractura de codo o húmero, revisar pulso radial, color, temperatura, llenado capilar y sensibilidad; dolor intenso desproporcionado, palidez o ausencia de pulso: emergencia.",
   "Evitar presión o masaje profundo en la cara medial del brazo y la fosa cubital sin conocer el estado vascular."
  ],
  "fuentes": [
   "Wikipedia: Brachial artery — https://en.wikipedia.org/wiki/Brachial_artery",
   "Kenhub: Brachial artery — https://www.kenhub.com/en/library/anatomy/brachial-artery",
   "TeachMeAnatomy: Miembro superior, arterias — https://teachmeanatomy.info/upper-limb/vessels/arteries/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-braquial-profunda",
  "nombre": "Arteria braquial profunda",
  "tipo": "arteria",
  "zona": "arms",
  "nombres": [
   "Arteria braquial profunda",
   "Rama colateral radial de arteria braquial profunda",
   "Rama colateral media de arteria braquial profunda"
  ],
  "descripcion": "Rama grande de la braquial, nace cerca del redondo mayor y rodea el húmero por detrás con el nervio radial. Irriga el tríceps y la cara posterior del brazo.",
  "referencias": [
   "Nace de la cara posterolateral de la braquial, justo debajo del redondo mayor.",
   "Pasa entre las cabezas larga y medial del tríceps y sigue el surco radial del húmero.",
   "No se palpa; queda profunda al tríceps.",
   "Atraviesa el tabique intermuscular lateral y baja entre el braquiorradial y el braquial hacia el epicóndilo lateral."
  ],
  "relaciones": [
   "Acompaña al nervio radial en el surco radial.",
   "Da una rama colateral media (por la cabeza media del tríceps, hacia la red del olécranon) y una colateral radial (hasta el epicóndilo lateral).",
   "Da ramas al deltoides, una rama nutricia del húmero y una rama ascendente que se une a la circunfleja humeral posterior.",
   "Termina anastomosándose con la recurrente radial y forma parte de la red del codo."
  ],
  "lesiones": [
   "Lesión en fracturas de la diáfisis del húmero junto con el nervio radial.",
   "Hematomas profundos en la cara posterior del brazo.",
   "Heridas penetrantes del brazo posterior."
  ],
  "fisio": [
   "Tras fractura del húmero, vigilar la mano en caída (extensión de muñeca y dedos) y la sensibilidad del dorso, por el nervio radial que va con la arteria.",
   "Hinchazón tensa o dolor creciente en el brazo tras una lesión: sospechar sangrado o síndrome compartimental y derivar.",
   "Evitar presión sostenida en el surco radial (lateral y posterior del brazo)."
  ],
  "fuentes": [
   "Wikipedia: Deep artery of the arm — https://en.wikipedia.org/wiki/Deep_artery_of_the_arm",
   "TeachMeAnatomy: Miembro superior, arterias — https://teachmeanatomy.info/upper-limb/vessels/arteries/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-radial",
  "nombre": "Arteria radial",
  "tipo": "arteria",
  "zona": "arms",
  "nombres": [
   "Arteria radial",
   "Arteria recurrente radial",
   "Rama carpiana dorsal de arteria radial",
   "Arteria radial del índice",
   "Arteria principal del pulgar"
  ],
  "descripcion": "Es la rama del brazo que lleva sangre a la cara lateral del antebrazo y a la mano. Es la arteria donde se toma con más frecuencia el pulso en la muñeca.",
  "referencias": [
   "Nace de la braquial en la fosa cubital y baja por el lado lateral de la cara anterior del antebrazo.",
   "El pulso se palpa en la muñeca, entre el tendón del braquiorradial y el del flexor radial del carpo, sobre el extremo distal del radio.",
   "Rodea el carpo por la tabaquera anatómica, donde el pulso es más difícil de sentir, y llega a la palma.",
   "Termina formando el arco palmar profundo."
  ],
  "relaciones": [
   "Ramas: recurrente radial, carpiana palmar y dorsal, palmar superficial, primera metacarpiana dorsal, principal del pulgar y radial del índice.",
   "Se anastomosa con la ulnar a través de los arcos palmares y las redes carpianas.",
   "Va acompañada por venas satélite y, en el tercio medio del antebrazo, por la rama superficial del nervio radial.",
   "En menos del 1 % de las personas corre superficial en la tabaquera y puede confundirse con la vena cefálica."
  ],
  "lesiones": [
   "Lesión por herida en muñeca o por punciones y cateterismos repetidos.",
   "Oclusión o trombosis tras canalización, con riesgo de isquemia de la mano si el arco palmar es incompleto.",
   "Pseudoaneurisma en el sitio de punción.",
   "Compromiso de flujo en fracturas distales de radio con gran desplazamiento o por yeso demasiado apretado."
  ],
  "fisio": [
   "Es el pulso de elección para frecuencia y ritmo: se palpa con dos o tres dedos, sin pulgar, y con presión suave.",
   "La prueba de Allen modificada valora si la ulnar irriga bien la mano; el retorno de color debe ocurrir en pocos segundos (5 a 15 s según la referencia usada). Su valor predictivo es discutido, úsala como orientación.",
   "Comparar el pulso de ambos brazos o con el femoral puede orientar a una alteración vascular mayor; derivar si hay diferencia marcada.",
   "Evita masaje profundo o presión sostenida sobre el surco del pulso en pacientes con punción arterial reciente."
  ],
  "fuentes": [
   "Wikipedia (en): Radial artery — https://en.wikipedia.org/wiki/Radial_artery",
   "Kenhub: Radial artery — https://www.kenhub.com/en/library/anatomy/radial-artery",
   "TeachMeAnatomy: Arterias del miembro superior (arteries of the upper limb) — https://teachmeanatomy.info/upper-limb/vessels/arteries/",
   "Wikipedia (en): Allen test — https://en.wikipedia.org/wiki/Allen_test"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-ulnar",
  "nombre": "Arteria ulnar (cubital)",
  "tipo": "arteria",
  "zona": "arms",
  "nombres": [
   "Arteria ulnar",
   "Arteria recurrente ulnar anterior",
   "Arteria recurrente ulnar posterior",
   "Rama carpiana dorsal de arteria ulnar"
  ],
  "descripcion": "Es la arteria principal de la cara medial del antebrazo y la mayor contribuyente del arco palmar superficial. Lleva sangre a los flexores del antebrazo, al lado cubital de la mano y a los dedos.",
  "referencias": [
   "Nace de la braquial en la fosa cubital, cruza oblicua hacia el lado cubital y sigue el borde medial del antebrazo.",
   "En la muñeca pasa junto al hueso pisiforme, sobre el retináculo flexor, por el canal de Guyon.",
   "Su pulso se siente en la cara anterior y medial de la muñeca, junto al tendón del flexor ulnar del carpo; es más profundo y menos nítido que el radial.",
   "Termina formando el arco palmar superficial."
  ],
  "relaciones": [
   "Da las recurrentes ulnares anterior y posterior, y la interósea común, de la que salen las interóseas.",
   "En la muñeca emite ramas carpianas palmar y dorsal, y una rama palmar profunda que se une al arco profundo.",
   "En el antebrazo corre junto al nervio ulnar; en la muñeca ambos entran juntos al canal de Guyon.",
   "Su origen varía (a veces alto, en la braquial o la axilar) y entonces suele ser más superficial."
  ],
  "lesiones": [
   "Síndrome del martillo hipotenar: golpes repetidos en la base de la palma dañan la arteria y causan trombosis o aneurisma.",
   "Heridas en la muñeca, que suelen lesionar también el nervio ulnar.",
   "Oclusión con isquemia de los dedos cubitales y fenómeno de Raynaud secundario.",
   "Compresión en el canal de Guyon junto con el nervio ulnar."
  ],
  "fisio": [
   "Palpa el pulso con suavidad junto al pisiforme; una presión fuerte lo borra.",
   "Con la prueba de Allen se comprueba qué tan bien la ulnar suple a la mano cuando se ocluye la radial.",
   "Atención a manos frías, pálidas o con dolor tras actividades con impacto palmar repetido (ciclismo, golpeo de herramientas): puede haber daño arterial; derivar.",
   "Evita compresión prolongada del talón de la mano en pacientes con síntomas vasculares."
  ],
  "fuentes": [
   "Wikipedia (en): Ulnar artery — https://en.wikipedia.org/wiki/Ulnar_artery",
   "TeachMeAnatomy: Arterias del miembro superior (arteries of the upper limb) — https://teachmeanatomy.info/upper-limb/vessels/arteries/",
   "Wikipedia (en): Superficial palmar arch — https://en.wikipedia.org/wiki/Superficial_palmar_arch",
   "Wikipedia (en): Allen test — https://en.wikipedia.org/wiki/Allen_test"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arcos-palmares-digitales",
  "nombre": "Arco palmar superficial y arterias de la mano",
  "tipo": "arteria",
  "zona": "arms",
  "nombres": [
   "Arco palmar superficial",
   "Arteria metacarpiana palmar",
   "Arteria digital palmar de la mano",
   "Arterias digitales dorsales de la mano",
   "Arterias metacarpianas dorsales"
  ],
  "descripcion": "Son las redes arteriales de la palma que reparten la sangre de la radial y la ulnar hacia los dedos. El arco superficial viene sobre todo de la ulnar y el profundo de la radial.",
  "referencias": [
   "El arco superficial cruza la palma por debajo de la aponeurosis palmar y por delante de los tendones flexores; su convexidad se proyecta en la línea de Boeckel.",
   "El arco profundo está más proximal, unos dedos por detrás del superficial, sobre las bases de los metacarpianos y los músculos interóseos.",
   "Los vasos de los dedos viajan a ambos lados de cada dedo, en la cara palmar y también en la dorsal.",
   "No se palpan pulsos en la palma; el llenado capilar de los dedos sirve como signo."
  ],
  "relaciones": [
   "Del arco superficial salen tres arterias digitales palmares comunes, que se dividen en dos propias para cada dedo cerca de las articulaciones metacarpofalángicas.",
   "Del arco profundo salen las metacarpianas palmares; las dorsales provienen de la red carpiana dorsal.",
   "La rama profunda del nervio ulnar acompaña al arco profundo.",
   "Ambos arcos se comunican entre sí y por eso la mano tolera la oclusión de una sola de sus arterias de entrada."
  ],
  "lesiones": [
   "Heridas profundas de la palma o de los dedos, con sangrado importante y riesgo de lesión de nervios.",
   "Trombosis o aneurisma ulnar que compromete el arco superficial.",
   "Isquemia digital por Raynaud, esclerodermia o enfermedad oclusiva.",
   "Síndrome compartimental o aplastamiento de la mano."
  ],
  "fisio": [
   "Observa color, temperatura y llenado capilar de los dedos; un dedo frío o pálido tras trauma requiere derivar.",
   "La prueba de Allen explora justamente la comunicación entre los arcos.",
   "Con anillos, vendajes o férulas, vigila que no estrangulen la circulación digital.",
   "Cuidado con técnicas de presión intensa en la palma en pacientes con alteraciones circulatorias."
  ],
  "fuentes": [
   "Wikipedia (en): Superficial palmar arch — https://en.wikipedia.org/wiki/Superficial_palmar_arch",
   "Wikipedia (en): Deep palmar arch — https://en.wikipedia.org/wiki/Deep_palmar_arch",
   "TeachMeAnatomy: Arterias del miembro superior (arteries of the upper limb) — https://teachmeanatomy.info/upper-limb/vessels/arteries/",
   "Wikipedia (en): Allen test — https://en.wikipedia.org/wiki/Allen_test"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arterias-interoseas",
  "nombre": "Arterias interóseas del antebrazo",
  "tipo": "arteria",
  "zona": "arms",
  "nombres": [
   "Arteria interósea común",
   "Arteria interósea anterior",
   "Arteria interósea recurrente"
  ],
  "descripcion": "Son las ramas profundas de la ulnar que irrigan los músculos profundos del antebrazo y los huesos radio y ulna. Salen de un tronco corto, la interósea común.",
  "referencias": [
   "La interósea común mide cerca de 1 cm y nace de la ulnar justo por debajo de la tuberosidad del radio.",
   "Se divide en anterior y posterior en el borde superior de la membrana interósea.",
   "La anterior baja por la cara anterior de la membrana, junto al nervio interóseo anterior, y la perfora arriba del pronador cuadrado.",
   "No se palpan; son profundas."
  ],
  "relaciones": [
   "La anterior irriga el flexor profundo de los dedos, el flexor largo del pulgar y el pronador cuadrado, y da las arterias nutricias de radio y ulna.",
   "La posterior pasa al dorso entre el supinador y el abductor largo del pulgar e irriga los extensores.",
   "La interósea recurrente sube hacia el codo y se une a la red de colaterales alrededor del epicóndilo y el olécranon.",
   "La anterior puede dar una arteria mediana delgada que acompaña al nervio mediano."
  ],
  "lesiones": [
   "Lesión en fracturas de antebrazo (radio y ulna) o por traumatismo penetrante.",
   "Síndrome compartimental de los flexores profundos tras fractura o aplastamiento.",
   "Contribución a la contractura isquémica de Volkmann cuando falla el flujo del antebrazo.",
   "Rara vez, pseudoaneurisma tras cirugía de antebrazo."
  ],
  "fisio": [
   "Tras fractura de antebrazo, dolor desproporcionado, dolor al estirar pasivamente los dedos o parestesias son señales de alarma de síndrome compartimental; derivar de inmediato.",
   "No hay pulso propio; evalúa pulso radial y ulnar, color y llenado de los dedos.",
   "Evita vendajes compresivos circulares apretados sobre un antebrazo lesionado."
  ],
  "fuentes": [
   "Wikipedia (en): Common interosseous artery — https://en.wikipedia.org/wiki/Common_interosseous_artery",
   "Wikipedia (en): Anterior interosseous artery — https://en.wikipedia.org/wiki/Anterior_interosseous_artery",
   "Wikipedia (en): Posterior interosseous artery — https://en.wikipedia.org/wiki/Posterior_interosseous_artery",
   "TeachMeAnatomy: Arterias del miembro superior (arteries of the upper limb) — https://teachmeanatomy.info/upper-limb/vessels/arteries/"
  ],
  "verificacion": "una fuente"
 },
 {
  "id": "arterias-circunflejas-humerales",
  "nombre": "Arterias circunflejas humerales",
  "tipo": "arteria",
  "zona": "shoulders",
  "nombres": [
   "Arteria circunfleja humeral anterior",
   "Arteria circunfleja humeral posterior"
  ],
  "descripcion": "Son dos ramas de la parte distal de la axilar que rodean el cuello quirúrgico del húmero. Irrigan el deltoides y la articulación del hombro.",
  "referencias": [
   "Ambas salen de la tercera porción de la axilar, junto al borde inferior del subescapular, y a veces comparten un tronco.",
   "La posterior, más grande, atraviesa el espacio cuadrilátero con el nervio axilar y rodea el cuello quirúrgico por detrás.",
   "La anterior, más pequeña, pasa por detrás del coracobraquial y del bíceps corto, rodea el cuello por delante y da una rama ascendente por el surco intertubercular.",
   "No se palpan."
  ],
  "relaciones": [
   "La posterior irriga deltoides, redondo mayor y menor, cabeza larga y lateral del tríceps y la articulación glenohumeral.",
   "La anterior da la rama ascendente que irriga la cabeza humeral y la articulación.",
   "Se unen entre sí por debajo del deltoides y se conectan con ramas de la profunda del brazo, la supraescapular y la toracoacromial.",
   "El nervio axilar acompaña a la posterior en el espacio cuadrilátero."
  ],
  "lesiones": [
   "Lesión en fracturas del cuello quirúrgico del húmero o luxaciones anteriores del hombro.",
   "Necrosis avascular de la cabeza humeral tras fracturas proximales con compromiso de su irrigación.",
   "Compresión en el síndrome del espacio cuadrilátero junto con el nervio axilar.",
   "Hematomas profundos del hombro tras trauma."
  ],
  "fisio": [
   "Tras una luxación o fractura proximal de húmero, revisa el pulso radial y la sensibilidad de la región del deltoides (nervio axilar).",
   "El dolor persistente y rigidez progresiva meses después de una fractura de hombro puede indicar problema de irrigación; sugerir valoración médica.",
   "Respeta las precauciones de movilización en fracturas recientes de cuello humeral."
  ],
  "fuentes": [
   "Wikipedia (en): Posterior circumflex humeral artery — https://en.wikipedia.org/wiki/Posterior_circumflex_humeral_artery",
   "Wikipedia (en): Anterior circumflex humeral artery — https://en.wikipedia.org/wiki/Anterior_circumflex_humeral_artery",
   "Wikipedia (en): Axillary artery — https://en.wikipedia.org/wiki/Axillary_artery"
  ],
  "verificacion": "una fuente"
 },
 {
  "id": "arterias-escapulares",
  "nombre": "Arterias de la escápula y la base del cuello",
  "tipo": "arteria",
  "zona": "shoulders",
  "nombres": [
   "Arteria supraescapular",
   "Arteria subescapular",
   "Arteria circunfleja escapular",
   "Arteria toracodorsal",
   "Arteria dorsal de la escápula",
   "Arteria cervical transversa",
   "Arteria cervical superficial"
  ],
  "descripcion": "Son las arterias que irrigan la escápula y los músculos de su alrededor y forman una red de anastomosis que conecta el cuello con la axila. Provienen del tronco tirocervical, la subclavia y la axilar.",
  "referencias": [
   "La supraescapular (del tronco tirocervical) cruza por detrás de la clavícula hacia el borde superior de la escápula, normalmente por encima del ligamento transverso superior, mientras el nervio pasa por debajo.",
   "La subescapular (de la axilar) baja por el subescapular y da la circunfleja escapular y la toracodorsal.",
   "La circunfleja escapular atraviesa el espacio triangular (redondo menor, redondo mayor y tríceps) hacia la fosa infraespinosa.",
   "La transversa del cuello cruza la región lateral del cuello y se divide en rama superficial y rama profunda, esta última la dorsal de la escápula, que baja por el borde medial bajo los romboides."
  ],
  "relaciones": [
   "La supraescapular irriga supraespinoso e infraespinoso y envía ramas al acromion y a las articulaciones acromioclavicular y glenohumeral.",
   "La toracodorsal irriga el dorsal ancho.",
   "La dorsal de la escápula irriga elevador de la escápula, romboides y trapecio.",
   "Juntas forman la anastomosis escapular, vía de circulación colateral si se ocluye la axilar."
  ],
  "lesiones": [
   "Atrapamiento del nervio supraescapular en la escotadura, a veces con compromiso vascular asociado.",
   "Lesión en fracturas de escápula o en trauma penetrante del hombro.",
   "Daño durante disecciones de cuello o axila.",
   "Compresión de la arteria circunfleja escapular en el espacio triangular."
  ],
  "fisio": [
   "En atrofia de supraespinoso o infraespinoso con debilidad de rotación externa, considera atrapamiento del nervio supraescapular y deriva.",
   "Son vasos profundos y sin pulso palpable; la valoración de la circulación del brazo se hace con pulso radial.",
   "Tras trauma de escápula, vigila hematoma, hinchazón o pérdida de pulso distal."
  ],
  "fuentes": [
   "Wikipedia (en): Suprascapular artery — https://en.wikipedia.org/wiki/Suprascapular_artery",
   "Wikipedia (en): Subscapular artery — https://en.wikipedia.org/wiki/Subscapular_artery",
   "Wikipedia (en): Circumflex scapular artery — https://en.wikipedia.org/wiki/Circumflex_scapular_artery",
   "Wikipedia (en): Transverse cervical artery — https://en.wikipedia.org/wiki/Transverse_cervical_artery"
  ],
  "verificacion": "una fuente"
 },
 {
  "id": "arteria-toracoacromial",
  "nombre": "Arteria toracoacromial y sus ramas",
  "tipo": "arteria",
  "zona": "shoulders",
  "nombres": [
   "Arteria toracoacromial",
   "Rama acromial de arteria toracoacromial",
   "Rama deltoidea de arteria toracoacromial",
   "Rama pectoral de arteria toracoacromial"
  ],
  "descripcion": "Es un tronco corto de la segunda porción de la axilar que se reparte en cuatro ramas hacia el pecho y el hombro. Irriga los músculos pectorales, el deltoides y la zona del acromion.",
  "referencias": [
   "Nace de la axilar, detrás del pectoral menor, y atraviesa la fascia clavipectoral.",
   "Se divide en ramas pectoral, acromial, deltoidea y clavicular.",
   "La rama deltoidea acompaña a la vena cefálica en el surco deltopectoral.",
   "No se palpa."
  ],
  "relaciones": [
   "La pectoral irriga los músculos pectorales y la mama y se une con ramas intercostales y la torácica lateral.",
   "La acromial forma una red sobre el acromion con la supraescapular y la circunfleja humeral posterior.",
   "La clavicular irriga la articulación esternoclavicular y el subclavio.",
   "Está cubierta en su origen por el borde superior del pectoral menor."
  ],
  "lesiones": [
   "Lesión durante cirugía de hombro por abordaje deltopectoral o de mama.",
   "Sangrado en fracturas de clavícula o traumas del hombro anterior.",
   "Pérdida de colateral en oclusiones de la axilar."
  ],
  "fisio": [
   "Sirve como referencia: el surco deltopectoral contiene la cefálica y la rama deltoidea; evita presión intensa sobre cicatrices recientes.",
   "Tras cirugía de hombro o mama, vigila hematoma, calor y edema.",
   "No hay pulso propio; usa el pulso radial como control de la circulación del miembro."
  ],
  "fuentes": [
   "Wikipedia (en): Thoracoacromial artery — https://en.wikipedia.org/wiki/Thoracoacromial_artery",
   "Wikipedia (en): Axillary artery — https://en.wikipedia.org/wiki/Axillary_artery"
  ],
  "verificacion": "una fuente"
 },
 {
  "id": "arteria-iliaca-comun",
  "nombre": "Arteria ilíaca común",
  "tipo": "arteria",
  "zona": "hip",
  "nombres": [
   "Arteria ilíaca común"
  ],
  "descripcion": "Es cada una de las dos ramas en que se divide la aorta abdominal a la altura de L4. Cada una se separa a su vez en ilíaca externa e interna.",
  "referencias": [
   "Mide unos 4 cm y baja oblicua por el borde medial del psoas hasta el borde de la pelvis, delante de la articulación sacroilíaca.",
   "Se proyecta en el abdomen bajo, aproximadamente a nivel de L4 a L5; no se palpa.",
   "Las venas ilíacas comunes quedan detrás y a la derecha de la arteria."
  ],
  "relaciones": [
   "Se divide en ilíaca externa (miembro inferior) e interna (pelvis).",
   "Los uréteres cruzan por delante de su bifurcación.",
   "Da pequeñas ramas al peritoneo, psoas, uréter y ganglios cercanos."
  ],
  "lesiones": [
   "Estenosis u oclusión aterosclerótica, que produce claudicación en glúteo, muslo y cadera.",
   "Síndrome de Leriche: oclusión aortoilíaca con claudicación, disfunción eréctil y pulsos femorales ausentes.",
   "Aneurisma ilíaco (mayor de 18 mm).",
   "Compresión de la vena ilíaca izquierda por la arteria (síndrome de May-Thurner), que puede dar edema y trombosis venosa."
  ],
  "fisio": [
   "Dolor al caminar en glúteos, caderas o muslos que cede con reposo, con pulso femoral débil, sugiere enfermedad arterial; derivar.",
   "Compara los pulsos femorales de ambos lados.",
   "Un dolor abdominal o lumbar súbito e intenso con masa pulsátil es urgencia."
  ],
  "fuentes": [
   "Wikipedia (en): Common iliac artery — https://en.wikipedia.org/wiki/Common_iliac_artery",
   "Kenhub: Common iliac artery — https://www.kenhub.com/en/library/anatomy/common-iliac-artery",
   "NHS: Peripheral arterial disease — https://www.nhs.uk/conditions/peripheral-arterial-disease-pad/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-iliaca-externa",
  "nombre": "Arteria ilíaca externa",
  "tipo": "arteria",
  "zona": "hip",
  "nombres": [
   "Arteria ilíaca externa"
  ],
  "descripcion": "Es la continuación principal de la ilíaca común hacia el miembro inferior. Al pasar bajo el ligamento inguinal se convierte en la arteria femoral.",
  "referencias": [
   "Nace frente a la articulación sacroilíaca y corre por el borde medial del psoas mayor.",
   "Pasa entre la espina ilíaca anterosuperior y la sínfisis del pubis, bajo el ligamento inguinal.",
   "Por debajo del ligamento se palpa como pulso femoral."
  ],
  "relaciones": [
   "Antes del ligamento inguinal da la epigástrica inferior y la circunfleja ilíaca profunda.",
   "La epigástrica inferior se anastomosa con la epigástrica superior en la vaina del recto.",
   "Va con la vena ilíaca externa y el psoas."
  ],
  "lesiones": [
   "Aterosclerosis con claudicación de muslo y pantorrilla.",
   "Endofibrosis de la arteria ilíaca externa en deportistas de resistencia (ciclistas, corredores, triatletas), con dolor y debilidad solo en esfuerzo máximo.",
   "Lesión durante cirugía o cateterismo.",
   "Embolia o trombosis aguda del miembro."
  ],
  "fisio": [
   "En un deportista de resistencia con dolor de muslo o pierna solo en el esfuerzo máximo que cede al bajar la intensidad, piensa en endofibrosis y deriva a valoración vascular.",
   "Toma el pulso femoral y compáralo con el contralateral.",
   "Pie frío, pálido y doloroso de inicio súbito requiere atención urgente."
  ],
  "fuentes": [
   "Wikipedia (en): External iliac artery — https://en.wikipedia.org/wiki/External_iliac_artery",
   "Kenhub: External iliac artery — https://www.kenhub.com/en/library/anatomy/external-iliac-artery",
   "NHS: Peripheral arterial disease — https://www.nhs.uk/conditions/peripheral-arterial-disease-pad/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-iliaca-interna",
  "nombre": "Arteria ilíaca interna",
  "tipo": "arteria",
  "zona": "hip",
  "nombres": [
   "Arteria ilíaca interna"
  ],
  "descripcion": "Es la rama corta que irriga la pelvis, sus órganos, la región glútea y parte del periné. Nace de la ilíaca común y se divide en troncos anterior y posterior.",
  "referencias": [
   "Mide unos 3 a 4 cm y baja hacia el borde superior de la escotadura ciática mayor.",
   "Queda por detrás del uréter y por delante de la vena ilíaca interna y de la articulación sacroilíaca.",
   "Es profunda, no se palpa."
  ],
  "relaciones": [
   "El tronco posterior da la iliolumbar, sacra lateral y glútea superior.",
   "El tronco anterior da las vesicales, rectal media, obturatriz, uterina o vaginal, pudenda interna y glútea inferior.",
   "Sus ramas glúteas irrigan los glúteos y los rotadores de cadera; hay variaciones frecuentes.",
   "Se anastomosa ampliamente con ramas de la femoral profunda y las lumbares."
  ],
  "lesiones": [
   "Sangrado pélvico en fracturas de pelvis, a menudo grave.",
   "Aneurisma, poco frecuente, que puede comprimir vejiga o recto.",
   "Isquemia glútea por oclusión (claudicación glútea).",
   "Lesión durante cirugía ginecológica o urológica."
  ],
  "fisio": [
   "Claudicación en glúteos o cadera, con disfunción eréctil en hombres, sugiere enfermedad ilíaca; derivar.",
   "Tras fractura de pelvis, evita movilizar con fuerza y vigila signos de sangrado (palidez, mareo, hinchazón).",
   "La buena colateralidad explica por qué la oclusión de un solo vaso suele ser bien tolerada."
  ],
  "fuentes": [
   "Wikipedia (en): Internal iliac artery — https://en.wikipedia.org/wiki/Internal_iliac_artery",
   "Kenhub: Internal iliac artery — https://www.kenhub.com/en/library/anatomy/internal-iliac-artery"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-femoral",
  "nombre": "Arteria femoral",
  "tipo": "arteria",
  "zona": "thigh",
  "nombres": [
   "Arteria femoral"
  ],
  "descripcion": "Es la arteria principal del muslo y continúa a la ilíaca externa al pasar bajo el ligamento inguinal. Termina en el hiato de los aductores, donde se vuelve poplítea.",
  "referencias": [
   "Pasa por el triángulo femoral y baja por el canal de los aductores en la cara anteromedial del muslo.",
   "El pulso se palpa justo bajo el ligamento inguinal, a medio camino entre la espina ilíaca anterosuperior y la sínfisis del pubis.",
   "Su tramo por encima del origen de la femoral profunda es la femoral común."
  ],
  "relaciones": [
   "En el triángulo femoral da ramas superficiales (epigástrica superficial, circunfleja ilíaca superficial, pudendas externas) y la femoral profunda.",
   "En el canal de los aductores da la genicular descendente.",
   "La vena femoral queda medial y el nervio femoral lateral a ella.",
   "Es relativamente superficial y se usa para acceso vascular."
  ],
  "lesiones": [
   "Aterosclerosis de la femoral superficial, causa clásica de claudicación de pantorrilla.",
   "Aneurisma de la femoral común.",
   "Lesión por heridas, fracturas de fémur o cateterismos, con pseudoaneurisma o hematoma.",
   "Embolia o trombosis aguda."
  ],
  "fisio": [
   "Es el pulso de referencia proximal del miembro inferior; compáralo con el contralateral y con el pulso radial.",
   "Un pulso femoral débil o ausente con dolor al caminar sugiere obstrucción arterial proximal; derivar.",
   "Cuidado con presión profunda y masaje en el triángulo femoral si hay enfermedad arterial o cateterismo reciente.",
   "Dolor, frialdad, palidez y ausencia de pulsos súbitos son urgencia vascular."
  ],
  "fuentes": [
   "Wikipedia (en): Femoral artery — https://en.wikipedia.org/wiki/Femoral_artery",
   "Kenhub: Femoral artery — https://www.kenhub.com/en/library/anatomy/femoral-artery",
   "NHS: Peripheral arterial disease — https://www.nhs.uk/conditions/peripheral-arterial-disease-pad/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-femoral-profunda",
  "nombre": "Arteria femoral profunda y perforantes",
  "tipo": "arteria",
  "zona": "thigh",
  "nombres": [
   "Arteria femoral profunda",
   "Arteria perforante distal"
  ],
  "descripcion": "Es la rama más grande de la femoral, que irriga la mayoría de los músculos del muslo. Nace unos 3 a 4 cm bajo el ligamento inguinal y se dirige profunda.",
  "referencias": [
   "Sale de la cara posterolateral de la femoral y baja detrás de la femoral, entre el pectíneo y el aductor largo.",
   "Atraviesa el aductor mayor por medio de las perforantes y termina en la cuarta perforante.",
   "No se palpa por ser profunda."
  ],
  "relaciones": [
   "Da las circunflejas femorales lateral y medial y tres o cuatro perforantes.",
   "Las perforantes irrigan los isquiotibiales y el compartimento posterior.",
   "Participa en la anastomosis cruzada alrededor del cuello del fémur.",
   "Conecta con ramas de la poplítea, por lo que sirve de colateral si se bloquea la femoral."
  ],
  "lesiones": [
   "Sangrado por fracturas de fémur o heridas profundas del muslo.",
   "Lesión de perforantes en cirugía de cadera o fémur.",
   "Pseudoaneurisma tras cateterismo.",
   "Es la vía principal de circulación colateral cuando la femoral superficial se ocluye."
  ],
  "fisio": [
   "Muslo muy hinchado y tenso tras trauma o inyección profunda hace pensar en hematoma o síndrome compartimental; derivar.",
   "La buena colateralidad explica por qué algunos pacientes con oclusión femoral solo tienen claudicación y no isquemia grave.",
   "Precaución con masaje profundo o electroterapia en hematomas recientes del muslo."
  ],
  "fuentes": [
   "Wikipedia (en): Deep femoral artery — https://en.wikipedia.org/wiki/Deep_femoral_artery",
   "Kenhub: Deep femoral artery — https://www.kenhub.com/en/library/anatomy/deep-femoral-artery"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-circunfleja-femoral-lateral",
  "nombre": "Arteria circunfleja femoral lateral",
  "tipo": "arteria",
  "zona": "hip",
  "nombres": [
   "Arteria circunfleja femoral lateral",
   "Rama descendente de arteria circunfleja femoral lateral"
  ],
  "descripcion": "Es una rama de la femoral profunda que rodea el fémur proximal por delante y lateral. Irriga principalmente el cuádriceps y el área de la cadera lateral.",
  "referencias": [
   "Suele nacer de la lado lateral de la femoral profunda, a veces directamente de la femoral.",
   "Pasa por delante del cuello del fémur, detrás del sartorio y del recto femoral, entre las ramas del nervio femoral.",
   "Se divide en ascendente, transversa y descendente."
  ],
  "relaciones": [
   "La ascendente sube bajo el tensor de la fascia lata y se une con la glútea superior y la circunfleja ilíaca profunda.",
   "La descendente baja por el vasto lateral y se une con la genicular superior lateral.",
   "La transversa rodea el fémur bajo el trocánter mayor y se conecta con la circunfleja medial y las perforantes.",
   "Irriga vasto lateral, vasto intermedio y recto femoral; aporta poco a la cabeza femoral."
  ],
  "lesiones": [
   "Lesión en abordajes anteriores de cadera.",
   "Hematoma del cuádriceps por contusión o desgarro.",
   "Su rama descendente se usa en colgajos quirúrgicos.",
   "Colateral útil en obstrucciones de la femoral."
  ],
  "fisio": [
   "En una contusión fuerte de muslo anterior, vigila hinchazón creciente y dolor desproporcionado; evita masaje y calor al inicio.",
   "Tener presente que la cabeza femoral depende sobre todo de la circunfleja medial, no de esta.",
   "No tiene pulso palpable propio."
  ],
  "fuentes": [
   "Wikipedia (en): Lateral circumflex femoral artery — https://en.wikipedia.org/wiki/Lateral_circumflex_femoral_artery",
   "Kenhub: Deep femoral artery — https://www.kenhub.com/en/library/anatomy/deep-femoral-artery"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-poplitea",
  "nombre": "Arteria poplítea",
  "tipo": "arteria",
  "zona": "knee",
  "nombres": [
   "Arteria poplítea"
  ],
  "descripcion": "Es la continuación de la femoral detrás de la rodilla. Irriga la rodilla y se divide en tibial anterior y tibial posterior.",
  "referencias": [
   "Comienza en el hiato de los aductores y cruza en diagonal la fosa poplítea, donde es la estructura más profunda.",
   "Termina en el borde inferior del poplíteo.",
   "El pulso es difícil: se palpa con el paciente en prono o supino y la rodilla flexionada y relajada, con ambas manos, en la parte baja de la fosa."
  ],
  "relaciones": [
   "Da cinco geniculares, arterias surales y ramas musculares a isquiotibiales, gastrocnemio, sóleo y plantar.",
   "La vena poplítea queda superficial a ella y el nervio tibial aún más superficial.",
   "Pasa entre las cabezas del gastrocnemio.",
   "Se separa en tibial anterior y tronco tibioperoneo."
  ],
  "lesiones": [
   "Aneurisma poplíteo, el más frecuente de los periféricos, con riesgo de trombosis o embolia distal.",
   "Lesión en luxación de rodilla o fractura de fémur distal, que puede amenazar la pierna.",
   "Síndrome de atrapamiento de la arteria poplítea en jóvenes deportistas, con claudicación de pantorrilla.",
   "Oclusión por aterosclerosis."
  ],
  "fisio": [
   "Tras luxación de rodilla, revisa de inmediato los pulsos pedio y tibial posterior; un pulso ausente es urgencia aunque haya mejoría de dolor.",
   "En un joven con calambres de pantorrilla al correr que ceden con el reposo y pulsos que cambian con la flexión plantar, piensa en atrapamiento.",
   "Una masa pulsátil en la fosa poplítea requiere derivación; no la masajees.",
   "Evita presión sostenida sobre la fosa poplítea."
  ],
  "fuentes": [
   "Wikipedia (en): Popliteal artery — https://en.wikipedia.org/wiki/Popliteal_artery",
   "Kenhub: Popliteal artery — https://www.kenhub.com/en/library/anatomy/popliteal-artery",
   "NHS: Peripheral arterial disease — https://www.nhs.uk/conditions/peripheral-arterial-disease-pad/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arterias-geniculares",
  "nombre": "Arterias geniculares (rodilla)",
  "tipo": "arteria",
  "zona": "knee",
  "nombres": [
   "Arteria genicular lateral inferior",
   "Arteria genicular medial inferior",
   "Arteria genicular lateral superior",
   "Arteria genicular medial superior",
   "Arteria genicular media",
   "Arteria descendente de la rodilla"
  ],
  "descripcion": "Son seis arterias pequeñas que forman una red alrededor de la rodilla. Irrigan la cápsula, ligamentos, cóndilos y rótula, y dan circulación colateral.",
  "referencias": [
   "Cinco nacen de la poplítea: superior medial, superior lateral, media e inferior medial e inferior lateral.",
   "La genicular descendente nace de la femoral en el canal de los aductores.",
   "Forman la red genicular alrededor de la rótula y de los cóndilos.",
   "No se palpan."
  ],
  "relaciones": [
   "Irrigan la cápsula articular, ligamentos, cóndilos femorales, rótula y ligamentos cruzados (la media).",
   "Se anastomosan con la descendente de la circunfleja femoral lateral y las recurrentes tibiales anteriores.",
   "Las superiores quedan sobre los cóndilos y las inferiores bajo la línea articular, cerca de los ligamentos colaterales.",
   "Aportan circulación colateral si se ocluye la femoral o la poplítea."
  ],
  "lesiones": [
   "Lesión en luxaciones, fracturas de rodilla o cirugía (artroplastia, reconstrucción ligamentaria).",
   "Hemartrosis tras lesión.",
   "Dolor de rodilla crónico, en el que se estudia la embolización genicular como tratamiento en casos seleccionados.",
   "Colateral inadecuado en parte de las personas si se ocluye la femoral de forma súbita."
  ],
  "fisio": [
   "Rodilla muy hinchada y caliente poco tiempo después de un trauma debe sugerir sangrado articular; derivar.",
   "No tienen pulso propio; evalúa pulsos distales ante trauma de rodilla.",
   "Después de cirugía, respeta las indicaciones sobre hielo y carga y vigila hematoma."
  ],
  "fuentes": [
   "Wikipedia (en): Genicular arteries — https://en.wikipedia.org/wiki/Genicular_arteries",
   "Kenhub: Popliteal artery — https://www.kenhub.com/en/library/anatomy/popliteal-artery",
   "Wikipedia (en): Popliteal artery — https://en.wikipedia.org/wiki/Popliteal_artery"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-tibial-anterior",
  "nombre": "Arteria tibial anterior",
  "tipo": "arteria",
  "zona": "leg",
  "nombres": [
   "Arteria tibial anterior"
  ],
  "descripcion": "Es una de las dos ramas terminales de la poplítea y lleva sangre al compartimento anterior de la pierna y al dorso del pie. Al llegar al tobillo se convierte en la arteria dorsal del pie.",
  "referencias": [
   "Nace bajo el poplíteo, pasa al compartimento anterior por la abertura de la membrana interósea.",
   "Baja entre el tibial anterior y el extensor largo de los dedos, sobre la membrana interósea.",
   "Termina frente a la articulación del tobillo; su pulso se toma como pulso pedio en el dorso del pie."
  ],
  "relaciones": [
   "Ramas: recurrentes tibiales posterior y anterior, musculares, perforantes y maleolares anterior medial y lateral.",
   "El nervio fibular profundo la acompaña.",
   "Pasa cerca del cuello de la fíbula y puede lesionarse en fracturas o cirugías proximales de tibia.",
   "Su calibre puede ser pequeño y suplirse con perforantes de la tibial posterior o de la fibular."
  ],
  "lesiones": [
   "Síndrome compartimental anterior de la pierna, con dolor y debilidad de dorsiflexores.",
   "Lesión en fracturas proximales de tibia o fíbula, o en osteotomías.",
   "Oclusión por aterosclerosis, con pie frío y claudicación.",
   "Embolia con isquemia aguda."
  ],
  "fisio": [
   "Dolor intenso en la cara anterior de la pierna tras esfuerzo o trauma, con tensión, debilidad de dorsiflexión y pérdida de sensibilidad entre el primer y segundo dedo, requiere derivar urgente.",
   "Revisa el pulso pedio como reflejo de esta arteria.",
   "Evita vendajes compresivos muy apretados en la pierna."
  ],
  "fuentes": [
   "Wikipedia (en): Anterior tibial artery — https://en.wikipedia.org/wiki/Anterior_tibial_artery",
   "Kenhub: Anterior tibial artery — https://www.kenhub.com/en/library/anatomy/anterior-tibial-artery"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-tibial-posterior",
  "nombre": "Arteria tibial posterior",
  "tipo": "arteria",
  "zona": "leg",
  "nombres": [
   "Arteria tibial posterior"
  ],
  "descripcion": "Es la otra rama terminal de la poplítea. Irriga el compartimento posterior de la pierna y la planta del pie.",
  "referencias": [
   "Nace en el borde inferior del poplíteo y baja por el compartimento posterior profundo.",
   "Pasa detrás del maléolo medial y entra al pie por el túnel del tarso.",
   "El pulso se palpa entre el maléolo medial y el tendón de Aquiles (punto de Pimenta), con tres dedos.",
   "Se divide en las arterias plantar medial y plantar lateral."
  ],
  "relaciones": [
   "Da la fibular, la nutricia de la tibia, ramas musculares, perforantes, maleolares mediales y calcáneas.",
   "El nervio tibial la acompaña hasta el pie.",
   "Queda bajo el sóleo y entre los flexores profundos; en el tobillo cruza bajo el retináculo flexor.",
   "Suele tener una vena satélite en cada lado."
  ],
  "lesiones": [
   "Aterosclerosis con claudicación de pantorrilla y úlceras en el pie.",
   "Compromiso en luxaciones de rodilla o fracturas de tibia.",
   "Compresión en el túnel del tarso junto con el nervio tibial.",
   "Ausencia del pulso en una minoría de personas sanas."
  ],
  "fisio": [
   "Es un pulso clave en la exploración vascular del pie: tómalo con suavidad y compara ambos lados.",
   "Un pulso ausente con pie frío, úlceras que no cierran o dolor en reposo requiere derivar.",
   "Si no se siente, prueba también el pulso pedio antes de concluir; en pocas personas sanas no se palpa.",
   "Con edema, el pulso puede ser difícil de sentir; no lo interpretes de forma aislada."
  ],
  "fuentes": [
   "Wikipedia (en): Posterior tibial artery — https://en.wikipedia.org/wiki/Posterior_tibial_artery",
   "Kenhub: Posterior tibial artery — https://www.kenhub.com/en/library/anatomy/posterior-tibial-artery",
   "NHS: Peripheral arterial disease — https://www.nhs.uk/conditions/peripheral-arterial-disease-pad/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arteria-fibular",
  "nombre": "Arteria fibular (peronea)",
  "tipo": "arteria",
  "zona": "leg",
  "nombres": [
   "Arteria fibular"
  ],
  "descripcion": "Es una rama profunda de la tibial posterior que irriga el compartimento lateral y la parte posterior profunda de la pierna. También abastece la fíbula y el talón lateral.",
  "referencias": [
   "Nace del tronco tibioperoneo, unos 2,5 cm bajo el borde del poplíteo, a veces de la tibial posterior.",
   "Baja pegada a la cara medial de la fíbula, entre el tibial posterior y el flexor largo del dedo gordo.",
   "No se palpa; es profunda."
  ],
  "relaciones": [
   "Da ramas perforante, comunicante con la tibial posterior, nutricia de la fíbula y calcáneas laterales.",
   "Está acompañada por venas fibulares.",
   "Su rama perforante puede reemplazar a la tibial anterior o a la dorsal del pie si estas faltan.",
   "Irriga sóleo, tibial posterior y fibulares."
  ],
  "lesiones": [
   "Lesión en fracturas de fíbula o tibia.",
   "Oclusión en enfermedad arterial periférica de las arterias distales, frecuente en diabéticos.",
   "Daño al tomar injertos de fíbula para reconstrucción.",
   "Síndrome compartimental posterior profundo."
  ],
  "fisio": [
   "En pacientes diabéticos, la afección de arterias distales puede dar pies fríos con pulsos presentes o dudosos; revisa piel y úlceras.",
   "No se puede palpar; los pulsos tibial posterior y pedio son los indicadores disponibles.",
   "Dolor profundo en la pantorrilla con tensión tras trauma o esfuerzo exige derivar."
  ],
  "fuentes": [
   "Wikipedia (en): Fibular artery — https://en.wikipedia.org/wiki/Fibular_artery",
   "Wikipedia (es): Arteria peronea — https://es.wikipedia.org/wiki/Arteria_peronea"
  ],
  "verificacion": "una fuente"
 },
 {
  "id": "arteria-dorsal-pie",
  "nombre": "Arteria dorsal del pie y sus ramas",
  "tipo": "arteria",
  "zona": "foot",
  "nombres": [
   "Arteria dorsal del pie",
   "Arteria arqueada",
   "Arteria digital dorsal del pie",
   "Arteria tarsiana lateral"
  ],
  "descripcion": "Es la continuación de la tibial anterior en el dorso del pie. Es superficial, por eso su pulso se toma con facilidad.",
  "referencias": [
   "Comienza frente al tobillo y recorre el dorso del pie hasta el primer espacio intermetatarsiano.",
   "El pulso se palpa lateral al tendón del extensor largo del dedo gordo, distal al hueso navicular, con el pie ligeramente en dorsiflexión.",
   "Falta o no se palpa en un 2 a 3 % de personas sanas."
  ],
  "relaciones": [
   "Ramas: tarsiana lateral, tarsianas mediales, arqueada y primera metatarsiana dorsal.",
   "La arqueada da las metatarsianas dorsales 2 a 4 y de ellas salen las digitales dorsales.",
   "Termina como arteria plantar profunda que se une a la plantar lateral y forma el arco plantar.",
   "El nervio fibular profundo (rama medial) la acompaña."
  ],
  "lesiones": [
   "Oclusión por enfermedad arterial periférica, con pulso ausente y pie frío.",
   "Lesión por inyecciones o anestesia en el dorso del pie.",
   "Compresión por calzado apretado o por edema.",
   "Aneurisma, poco frecuente."
  ],
  "fisio": [
   "Es el pulso periférico más accesible del pie: tómalo con dos o tres dedos y compáralo con el otro pie.",
   "Si no lo encuentras, busca el tibial posterior; la ausencia aislada puede ser variante normal.",
   "Pulso ausente con dolor en reposo, úlceras o cambios de color requiere derivar.",
   "Cuidado con vendajes y calzado que compriman el dorso del pie."
  ],
  "fuentes": [
   "Wikipedia (en): Dorsalis pedis artery — https://en.wikipedia.org/wiki/Dorsalis_pedis_artery",
   "Kenhub: Dorsalis pedis artery — https://www.kenhub.com/en/library/anatomy/dorsalis-pedis-artery",
   "Wikipedia (en): Arcuate artery of the foot — https://en.wikipedia.org/wiki/Arcuate_artery_of_the_foot",
   "NHS: Peripheral arterial disease — https://www.nhs.uk/conditions/peripheral-arterial-disease-pad/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "arterias-plantares",
  "nombre": "Arterias plantares del pie",
  "tipo": "arteria",
  "zona": "foot",
  "nombres": [
   "Arteria plantar profunda",
   "Arteria plantar lateral",
   "Arteria plantar medial",
   "Arterias digitales plantares del pie",
   "Arteria metatarsiana plantar"
  ],
  "descripcion": "Son las arterias de la planta del pie que provienen de la tibial posterior. Forman el arco plantar y dan ramas a los dedos.",
  "referencias": [
   "La plantar medial es más delgada y corre por el borde medial del pie, entre abductor del dedo gordo y flexor corto de los dedos.",
   "La plantar lateral es más grande, cruza hacia la base del quinto metatarsiano y gira medialmente para formar el arco plantar.",
   "El arco plantar se une con la arteria plantar profunda, rama de la dorsal del pie.",
   "No se palpan."
  ],
  "relaciones": [
   "Nacen de la división de la tibial posterior bajo el retináculo flexor.",
   "Del arco salen las metatarsianas plantares y las digitales plantares.",
   "Los nervios plantares medial y lateral las acompañan.",
   "Conectan la circulación dorsal y plantar del pie."
  ],
  "lesiones": [
   "Úlceras plantares isquémicas en diabetes y enfermedad arterial periférica.",
   "Lesión por heridas penetrantes (clavos, vidrio) con sangrado o pseudoaneurisma.",
   "Compresión en el túnel del tarso junto a los nervios plantares.",
   "Isquemia de dedos por embolia distal."
  ],
  "fisio": [
   "En el pie de riesgo (diabetes, tabaquismo, neuropatía) inspecciona la planta: callosidades, grietas, úlceras, coloración y temperatura.",
   "No hay pulso en la planta; usa tibial posterior y pedio y el llenado capilar de los dedos.",
   "Cualquier herida plantar que no sana debe derivarse.",
   "Cuida la presión de ortesis y plantillas sobre zonas isquémicas."
  ],
  "fuentes": [
   "Wikipedia (en): Medial plantar artery — https://en.wikipedia.org/wiki/Medial_plantar_artery",
   "Wikipedia (en): Lateral plantar artery — https://en.wikipedia.org/wiki/Lateral_plantar_artery",
   "Kenhub: Posterior tibial artery — https://www.kenhub.com/en/library/anatomy/posterior-tibial-artery"
  ],
  "verificacion": "una fuente"
 },
 {
  "id": "arterias-mesenterica-renal",
  "nombre": "Arterias mesentérica y renal",
  "tipo": "arteria",
  "zona": "core",
  "nombres": [
   "Arteria mesentérica",
   "Arteria renal"
  ],
  "descripcion": "Son dos ramas de la aorta abdominal: la mesentérica superior irriga el intestino delgado y parte del colon, y las renales irrigan los riñones. Las dos nacen en la región L1 a L2.",
  "referencias": [
   "La mesentérica superior nace de la cara anterior de la aorta, unos 1 cm bajo el tronco celíaco, y pasa detrás del páncreas y la vena esplénica.",
   "Las renales salen de los lados de la aorta justo debajo de la mesentérica y van al hilio renal.",
   "La derecha es más larga y pasa por detrás de la vena cava.",
   "Ninguna se palpa de forma útil; en una persona delgada se puede auscultar un soplo."
  ],
  "relaciones": [
   "La mesentérica da pancreatoduodenal inferior, yeyunales e ileales, ileocólica, cólica derecha y cólica media.",
   "Las renales dan la suprarrenal inferior y se dividen en ramas segmentarias antes del hilio.",
   "La vena renal izquierda pasa entre la mesentérica y la aorta.",
   "Son frecuentes las arterias renales accesorias."
  ],
  "lesiones": [
   "Isquemia mesentérica aguda (embolia) o crónica (angina intestinal con dolor tras comer y pérdida de peso).",
   "Estenosis de la arteria renal, causa de hipertensión secundaria.",
   "Síndrome de la arteria mesentérica superior y síndrome del cascanueces.",
   "Aneurismas y lesión renal por trauma abdominal."
  ],
  "fisio": [
   "Dolor abdominal intenso y súbito, o dolor tras comer con pérdida de peso, no es de origen musculoesquelético; derivar.",
   "Hipertensión difícil de controlar con claudicación o soplos puede reflejar enfermedad vascular generalizada; informar al médico.",
   "Dolor lumbar o de flanco con sangre en la orina requiere evaluación médica.",
   "Estas arterias no se tratan con técnicas manuales; reconoce señales de alarma en dolor lumbar o abdominal."
  ],
  "fuentes": [
   "Wikipedia (en): Superior mesenteric artery — https://en.wikipedia.org/wiki/Superior_mesenteric_artery",
   "Kenhub: Superior mesenteric artery — https://www.kenhub.com/en/library/anatomy/superior-mesenteric-artery",
   "Wikipedia (en): Renal artery — https://en.wikipedia.org/wiki/Renal_artery",
   "Kenhub: Renal artery — https://www.kenhub.com/en/library/anatomy/renal-artery"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "vena-cava-superior",
  "nombre": "Vena cava superior y braquiocefálica",
  "tipo": "vena",
  "zona": "chest",
  "nombres": [
   "Vena cava superior",
   "Vena braquiocefálica"
  ],
  "descripcion": "Las venas braquiocefálicas (derecha e izquierda) reúnen la sangre de cabeza, cuello y miembros superiores y se unen para formar la vena cava superior, un tronco corto y ancho del mediastino que desemboca en la aurícula derecha. Lleva la sangre de todo lo que queda por encima del diafragma.",
  "referencias": [
   "Cada braquiocefálica nace detrás de la articulación esternoclavicular, donde se juntan la yugular interna y la subclavia.",
   "La izquierda es mucho más larga (cerca de 6 cm) y cruza por detrás del manubrio; la derecha mide unos 2.5 cm y es casi vertical.",
   "Las dos se unen detrás del borde inferior del primer cartílago costal derecho y forman la cava superior, que baja unos 7 cm hasta la aurícula.",
   "Es una estructura profunda: no se palpa ni se ve; sus señales indirectas son las venas dilatadas del cuello y la cara cuando se obstruye."
  ],
  "relaciones": [
   "Recibe a la vena ácigos justo antes de entrar al pericardio fibroso.",
   "La braquiocefálica izquierda recibe venas vertebral, torácica interna, tiroidea inferior, intercostal superior y tímicas.",
   "Ocupa la parte anterior derecha del mediastino superior, junto a la aorta ascendente.",
   "No tiene válvula que la separe de la aurícula derecha, por eso la presión cardiaca derecha se refleja en las yugulares."
  ],
  "lesiones": [
   "Síndrome de vena cava superior: obstrucción (casi siempre por tumores, sobre todo de pulmón) con cara y brazos hinchados, venas del cuello y pared torácica dilatadas, disnea y tos.",
   "Trombosis asociada a catéteres venosos centrales.",
   "Variante frecuente: vena cava superior izquierda persistente.",
   "Compresión extrínseca por masas mediastinales."
  ],
  "fisio": [
   "Hinchazón de cara y cuello, venas dilatadas en el tórax o falta de aire que empeora al acostarse: es una urgencia; no iniciar tratamiento y derivar de inmediato.",
   "En pacientes con catéter central o PICC, evitar compresión o movilización brusca del brazo sin autorización médica.",
   "El pulso yugular alto o la ingurgitación yugular en reposo es motivo de derivar, no de tratar."
  ],
  "fuentes": [
   "Wikipedia: Superior vena cava — https://en.wikipedia.org/wiki/Superior_vena_cava",
   "Wikipedia: Brachiocephalic vein — https://en.wikipedia.org/wiki/Brachiocephalic_vein",
   "Kenhub: Superior vena cava — https://www.kenhub.com/en/library/anatomy/superior-vena-cava"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "vena-cava-inferior",
  "nombre": "Vena cava inferior y venas viscerales",
  "tipo": "vena",
  "zona": "core",
  "nombres": [
   "Vena cava inferior",
   "Vena esplénica",
   "Vena mesentérica",
   "Vena renal"
  ],
  "descripcion": "La vena cava inferior es el tronco venoso más grande del abdomen: recoge la sangre de las piernas, la pelvis, el abdomen y los riñones y la lleva a la aurícula derecha. Las venas esplénica y mesentéricas pertenecen al sistema porta (van al hígado) y la renal drena el riñón hacia la cava.",
  "referencias": [
   "Nace a la altura de L5 por la unión de las dos ilíacas comunes y sube por el lado derecho de la columna, a la derecha de la aorta.",
   "Cruza el diafragma por el orificio de la cava (cerca de T8) y entra en la aurícula derecha.",
   "La vena renal izquierda es unas tres veces más larga que la derecha y pasa entre la aorta y la arteria mesentérica superior.",
   "La esplénica corre sobre el borde superior del páncreas; se une a la mesentérica superior detrás del cuello del páncreas para formar la porta.",
   "Todas son profundas; no se palpan ni se ven."
  ],
  "relaciones": [
   "Afluentes directos: lumbares, gonadal derecha, renales, suprarrenal derecha, frénicas inferiores y hepáticas.",
   "Las venas gonadal y suprarrenal izquierdas desembocan primero en la renal izquierda.",
   "La mesentérica inferior desemboca en la esplénica, que se junta con la mesentérica superior para formar la porta.",
   "Se comunica con la ácigos y los plexos vertebrales, vías colaterales hacia la cava superior si hay obstrucción."
  ],
  "lesiones": [
   "Compresión de la cava por embarazo avanzado, tumores o aneurismas aórticos (mareo al estar boca arriba).",
   "Trombosis de cava, casi siempre por coágulos que vienen de las venas profundas de la pierna.",
   "Síndrome del cascanueces: compresión de la renal izquierda entre aorta y arteria mesentérica superior.",
   "Trombosis de la vena renal y variantes anatómicas (cava izquierda o doble, vena renal retroaórtica)."
  ],
  "fisio": [
   "En embarazadas avanzadas, evitar posiciones prolongadas boca arriba; preferir decúbito lateral izquierdo.",
   "Hinchazón de ambas piernas con dolor lumbar o abdominal, o hinchazón escrotal, requiere valoración médica urgente.",
   "No aplicar masaje abdominal profundo ni presoterapia sobre sospecha de trombosis."
  ],
  "fuentes": [
   "Wikipedia: Inferior vena cava — https://en.wikipedia.org/wiki/Inferior_vena_cava",
   "Kenhub: Inferior vena cava — https://www.kenhub.com/en/library/anatomy/inferior-vena-cava",
   "Wikipedia: Renal vein — https://en.wikipedia.org/wiki/Renal_vein",
   "Wikipedia: Splenic vein — https://en.wikipedia.org/wiki/Splenic_vein",
   "Wikipedia: Superior mesenteric vein — https://en.wikipedia.org/wiki/Superior_mesenteric_vein"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "venas-yugulares",
  "nombre": "Venas yugulares",
  "tipo": "vena",
  "zona": "head",
  "nombres": [
   "Vena yugular interna",
   "Vena yugular anterior",
   "Vena yugular externa"
  ],
  "descripcion": "Grupo de venas del cuello que drenan cerebro, cráneo, cara y cuello hacia la vena subclavia. La interna es profunda y grande; la externa y la anterior son superficiales.",
  "referencias": [
   "Yugular interna: nace en el agujero yugular y baja dentro de la vaina carotídea, lateral a la carótida, hasta unirse con la subclavia.",
   "Yugular externa: cruza oblicuamente el esternocleidomastoideo por encima; suele verse a través de la piel, sobre todo al toser o pujar.",
   "Yugular anterior: baja cerca de la línea media, cruza bajo el esternocleidomastoideo y desemboca en la externa; no tiene válvulas.",
   "El pulso yugular se ve (no se palpa) en el cuello con el paciente semiinclinado."
  ],
  "relaciones": [
   "La interna recibe senos petrosos, vena facial común, lingual y tiroideas superior y media.",
   "La externa se forma por la retromandibular posterior y la auricular posterior; termina en la subclavia.",
   "La interna acompaña a la carótida común y al nervio vago; los pares craneales IX a XII pasan cerca de su origen.",
   "Las anteriores se conectan por el arco venoso yugular sobre el esternón."
  ],
  "lesiones": [
   "Distensión yugular por insuficiencia cardiaca derecha, taponamiento o sobrecarga de líquidos.",
   "Trombosis yugular interna, relacionada con catéteres, infecciones o cáncer.",
   "Lesión por traumatismo o punción accidental, con sangrado importante.",
   "Variaciones de tamaño frecuentes entre ambos lados."
  ],
  "fisio": [
   "Evitar masaje o presión intensa en la cara lateral del cuello sobre el trayecto de las yugulares.",
   "Cuello hinchado, doloroso, con cordón duro o edema facial en alguien con catéter o infección reciente: derivar de inmediato.",
   "Una ingurgitación yugular en reposo no es una indicación para tratar; es un dato para avisar al médico."
  ],
  "fuentes": [
   "Wikipedia: Internal jugular vein — https://en.wikipedia.org/wiki/Internal_jugular_vein",
   "Wikipedia: External jugular vein — https://en.wikipedia.org/wiki/External_jugular_vein",
   "Wikipedia: Anterior jugular vein — https://en.wikipedia.org/wiki/Anterior_jugular_vein",
   "Kenhub: Internal jugular vein — https://www.kenhub.com/en/library/anatomy/internal-jugular-vein"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "venas-cabeza",
  "nombre": "Venas facial, temporal superficial y auricular posterior",
  "tipo": "vena",
  "zona": "head",
  "nombres": [
   "Vena facial",
   "Vena auricular posterior",
   "Vena temporal superficial"
  ],
  "descripcion": "Venas superficiales de la cara y el cuero cabelludo. La facial drena la cara, la temporal superficial drena sien y cuero cabelludo, y la auricular posterior drena la zona detrás de la oreja.",
  "referencias": [
   "Facial: continúa a la angular junto a la nariz, baja por detrás de la arteria facial, pasa sobre el masetero y la mandíbula y llega al cuello.",
   "Temporal superficial: nace de una red en el cuero cabelludo, acompaña a la arteria del mismo nombre y se dirige a la glándula parótida.",
   "Auricular posterior: baja detrás de la oreja y se une a la rama posterior de la retromandibular.",
   "Son superficiales y la facial/temporal pueden notarse a través de la piel en personas delgadas."
  ],
  "relaciones": [
   "La facial desemboca en la yugular interna, directamente o mediante la vena facial común (junto con la retromandibular).",
   "La temporal superficial se une a la maxilar y forma la vena retromandibular.",
   "La auricular posterior y la rama posterior de la retromandibular forman la yugular externa.",
   "La facial pasa superficial a la glándula submandibular y a los músculos digástrico y estilohioideo."
  ],
  "lesiones": [
   "Tromboflebitis facial con riesgo de propagación infecciosa a los senos venosos del cráneo (trombosis del seno cavernoso).",
   "Hematomas o laceraciones en cara o cuero cabelludo, con sangrado abundante.",
   "Infecciones cutáneas faciales (granos, heridas) como puerta de entrada a la infección."
  ],
  "fisio": [
   "No manipular ni exprimir lesiones, pústulas o heridas infectadas en la parte central de la cara.",
   "Enrojecimiento, dolor facial con fiebre, hinchazón alrededor del ojo o cefalea intensa: derivar de inmediato.",
   "Tener presente la zona de la sien al aplicar presión o frío en cuero cabelludo y área temporomandibular."
  ],
  "fuentes": [
   "Wikipedia: Facial vein — https://en.wikipedia.org/wiki/Facial_vein",
   "Wikipedia: Superficial temporal vein — https://en.wikipedia.org/wiki/Superficial_temporal_vein",
   "Wikipedia: Posterior auricular vein — https://en.wikipedia.org/wiki/Posterior_auricular_vein",
   "Wikipedia: External jugular vein — https://en.wikipedia.org/wiki/External_jugular_vein"
  ],
  "verificacion": "una fuente"
 },
 {
  "id": "vena-subclavia-axilar",
  "nombre": "Venas subclavia y axilar, con sus tributarias del hombro",
  "tipo": "vena",
  "zona": "shoulders",
  "nombres": [
   "Vena subclavia",
   "Vena axilar",
   "Vena torácica lateral",
   "Vena toracodorsal",
   "Vena subescapular",
   "Vena supraescapular",
   "Vena circunfleja escapular",
   "Vena circunfleja humeral anterior"
  ],
  "descripcion": "La vena axilar recoge la sangre del brazo, axila y pared lateral del tórax y, al llegar a la primera costilla, se convierte en la subclavia, que se une con la yugular interna para formar la braquiocefálica. Sus tributarias del hombro drenan escápula, dorsal ancho y región deltoidea.",
  "referencias": [
   "La axilar empieza en el borde inferior del redondo mayor (unión de la basílica con las venas braquiales) y termina en el borde lateral de la primera costilla.",
   "En la axila queda anteromedial a la arteria axilar y comparte espacio con cordones del plexo braquial.",
   "La subclavia va del borde lateral de la primera costilla al borde interno del escaleno anterior, por delante de este músculo; la arteria va por detrás.",
   "Es profunda: solo se evalúa por ecografía o por signos indirectos (hinchazón del brazo)."
  ],
  "relaciones": [
   "Tributarias de la axilar: cefálica, subescapular, circunfleja humeral, torácica lateral y toracoacromial.",
   "La subescapular, la toracodorsal y la circunfleja escapular drenan escápula y dorsal ancho; la supraescapular se une por la región del cuello.",
   "Los conductos linfáticos desembocan en el ángulo venoso: el torácico en la subclavia izquierda y el derecho en la derecha.",
   "Se relaciona con el escaleno anterior, la primera costilla, la clavícula y el músculo subclavio."
  ],
  "lesiones": [
   "Trombosis de esfuerzo (síndrome de Paget-Schroetter) en deportistas de brazo elevado y repetitivo.",
   "Síndrome del desfiladero torácico venoso con compresión entre clavícula y primera costilla.",
   "Trombosis por catéteres centrales o marcapasos.",
   "Compresión o lesión durante cirugía de mama o hombro."
  ],
  "fisio": [
   "Brazo hinchado, pesado, azulado o con venas visibles en el hombro tras esfuerzo: sospechar trombosis, suspender técnicas y derivar.",
   "En pacientes con catéter o linfedema post-cirugía, no hacer masaje profundo ni presión intensa en axila y base del cuello.",
   "Evitar maniobras de estiramiento forzado con elevación mantenida del brazo si hay síntomas del desfiladero torácico."
  ],
  "fuentes": [
   "Wikipedia: Subclavian vein — https://en.wikipedia.org/wiki/Subclavian_vein",
   "Wikipedia: Axillary vein — https://en.wikipedia.org/wiki/Axillary_vein",
   "Kenhub: Axillary vein — https://www.kenhub.com/en/library/anatomy/axillary-vein",
   "Kenhub: Veins of the upper limb — https://www.kenhub.com/en/library/anatomy/veins-of-the-upper-limb"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "vena-cefalica",
  "nombre": "Vena cefálica",
  "tipo": "vena",
  "zona": "arms",
  "nombres": [
   "Vena cefálica"
  ],
  "descripcion": "Vena superficial más larga del miembro superior; sube por el lado lateral del antebrazo y brazo y desemboca en la vena axilar.",
  "referencias": [
   "Nace en la red venosa dorsal de la mano, sobre la tabaquera anatómica.",
   "Sube por el lado radial del antebrazo y la cara anterolateral del bíceps.",
   "En el hombro corre por el surco deltopectoral y atraviesa el triángulo clavipectoral.",
   "Suele verse y palparse bajo la piel, sobre todo en el surco deltopectoral."
  ],
  "relaciones": [
   "Termina en la vena axilar.",
   "En el codo se comunica con la basílica por la vena mediana del codo.",
   "Va entre el deltoides y el pectoral mayor; la rama deltoidea de la arteria toracoacromial la acompaña.",
   "Tiene unas 13 parejas de válvulas, una de ellas en su unión con la axilar."
  ],
  "lesiones": [
   "Flebitis o tromboflebitis superficial tras canalización repetida.",
   "Lesión de ramas nerviosas sensitivas cercanas durante la punción.",
   "Se usa para vías de marcapasos y fístulas para hemodiálisis."
  ],
  "fisio": [
   "Un cordón rojo, caliente y doloroso en el trayecto sugiere tromboflebitis superficial: no masajear, avisar al médico.",
   "Evitar masaje con presión fuerte en el surco deltopectoral si hay marcapasos reciente o vía venosa.",
   "Brazo con fístula de diálisis: no comprimir ni tomar presión en ese brazo."
  ],
  "fuentes": [
   "Wikipedia: Cephalic vein — https://en.wikipedia.org/wiki/Cephalic_vein",
   "TeachMeAnatomy: Veins of the upper limb — https://teachmeanatomy.info/upper-limb/vessels/veins/",
   "Kenhub: Veins of the upper limb — https://www.kenhub.com/en/library/anatomy/veins-of-the-upper-limb"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "vena-basilica",
  "nombre": "Vena basílica",
  "tipo": "vena",
  "zona": "arms",
  "nombres": [
   "Vena basílica"
  ],
  "descripcion": "Vena superficial del lado medial del miembro superior; se hace profunda en el brazo y, junto con las venas braquiales, forma la vena axilar.",
  "referencias": [
   "Nace en el lado cubital de la red venosa dorsal de la mano.",
   "Sube por la cara medial del antebrazo y del bíceps, visible bajo la piel.",
   "Atraviesa la fascia braquial por el llamado hiato basílico a mitad del brazo y se hace profunda.",
   "Termina en el borde inferior del redondo mayor."
  ],
  "relaciones": [
   "Se une con las venas braquiales y forma la axilar.",
   "Se comunica con la cefálica en el codo por la vena mediana del codo.",
   "Va medial a la arteria braquial en el brazo; recibe las circunflejas humerales cerca de su final.",
   "Hay nervios cutáneos mediales del antebrazo cerca de su trayecto."
  ],
  "lesiones": [
   "Flebitis o trombosis asociada a catéteres PICC.",
   "Punción accidental de la arteria braquial o nervio vecino al canalizarla.",
   "Es sitio para crear fístulas de hemodiálisis."
  ],
  "fisio": [
   "Evitar presión o masaje fuerte en la cara medial del brazo si hay vía venosa o PICC.",
   "Dolor, enrojecimiento o hinchazón del brazo con vía central: sospechar trombosis y derivar.",
   "En brazo con fístula arteriovenosa no aplicar compresión externa."
  ],
  "fuentes": [
   "Wikipedia: Basilic vein — https://en.wikipedia.org/wiki/Basilic_vein",
   "TeachMeAnatomy: Veins of the upper limb — https://teachmeanatomy.info/upper-limb/vessels/veins/",
   "Kenhub: Veins of the upper limb — https://www.kenhub.com/en/library/anatomy/veins-of-the-upper-limb"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "venas-mediana-codo",
  "nombre": "Venas medianas del codo y del antebrazo",
  "tipo": "vena",
  "zona": "arms",
  "nombres": [
   "Vena mediana del codo",
   "Vena mediana del antebrazo"
  ],
  "descripcion": "Venas superficiales de la parte anterior del codo y antebrazo que conectan la cefálica con la basílica. La mediana del codo es la vena más usada para extraer sangre.",
  "referencias": [
   "La mediana del codo cruza oblicuamente la fosa cubital, de lateral a medial, por encima de la aponeurosis bicipital.",
   "Suele ser la vena más visible del codo, mejor si se aplica un torniquete.",
   "La mediana del antebrazo sube por la cara anterior del antebrazo y a veces desemboca en la mediana del codo.",
   "Patrón típico en H; en alrededor de 20% hay patrón en M, con la mediana del antebrazo dividida."
  ],
  "relaciones": [
   "Conecta la cefálica con la basílica.",
   "Una vena perforante la comunica con las venas braquiales profundas, lo que la ancla.",
   "Está superficial a la arteria braquial, separada por la aponeurosis bicipital.",
   "Su tamaño puede variar mucho entre personas."
  ],
  "lesiones": [
   "Flebitis por punciones o vías repetidas.",
   "Hematomas tras venopunción.",
   "Punción accidental de arteria braquial o nervios próximos."
  ],
  "fisio": [
   "Tras una toma de sangre reciente, evitar masaje intenso en el pliegue del codo por riesgo de hematoma.",
   "Dolor localizado con cordón duro en el trayecto: probable flebitis; no masajear y avisar al médico.",
   "No es técnica del fisioterapeuta puncionar; solo reconocer el sitio al manipular el codo."
  ],
  "fuentes": [
   "Wikipedia: Median cubital vein — https://en.wikipedia.org/wiki/Median_cubital_vein",
   "TeachMeAnatomy: Veins of the upper limb — https://teachmeanatomy.info/upper-limb/vessels/veins/",
   "Kenhub: Veins of the upper limb — https://www.kenhub.com/en/library/anatomy/veins-of-the-upper-limb"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "venas-profundas-brazo-mano",
  "nombre": "Venas profundas del brazo y venas de la mano",
  "tipo": "vena",
  "zona": "arms",
  "nombres": [
   "Vena braquial medial",
   "Vena radial",
   "Vena ulnar",
   "Vena metacarpiana dorsal",
   "Vena metacarpiana palmar",
   "Venas digitales dorsales",
   "Venas digitales palmares"
  ],
  "descripcion": "Venas pares que acompañan a las arterias profundas del antebrazo y brazo, más las venas finas de la mano y los dedos. La mano drena sobre todo por el dorso hacia la cefálica y la basílica.",
  "referencias": [
   "Las venas radiales y ulnares acompañan a sus arterias y se juntan en la fosa cubital para formar las braquiales.",
   "Las braquiales corren a ambos lados de la arteria braquial, profundas a los músculos del brazo.",
   "La red dorsal de la mano, visible a través de la piel, recibe las metacarpianas y digitales dorsales.",
   "El sistema palmar es débil: la palma drena sobre todo por el dorso a través de venas intercapitulares."
  ],
  "relaciones": [
   "Las braquiales se unen a la basílica en el borde inferior del redondo mayor para formar la axilar.",
   "Las venas radiales nacen del arco palmar profundo; las ulnares se asocian al arco superficial.",
   "La red dorsal drena a la cefálica (lado radial) y a la basílica (lado cubital).",
   "Las venas perforantes conectan el sistema profundo con el superficial."
  ],
  "lesiones": [
   "Trombosis venosa profunda del miembro superior, menos común que en la pierna.",
   "Edema de mano y dedos por insuficiencia linfática o venosa o tras inmovilización.",
   "Fragilidad y hematomas de las venas del dorso de la mano, en adultos mayores."
  ],
  "fisio": [
   "Edema de mano y brazo con dolor y coloración alterada: descartar trombosis antes de tratar.",
   "La elevación del brazo y los ejercicios activos de mano y muñeca ayudan al retorno venoso, siempre que no haya sospecha de trombosis.",
   "Cuidado con la presión del vendaje o guantes compresivos: vigilar color y sensibilidad de los dedos."
  ],
  "fuentes": [
   "Wikipedia: Radial vein — https://en.wikipedia.org/wiki/Radial_vein",
   "Wikipedia: Ulnar vein — https://en.wikipedia.org/wiki/Ulnar_vein",
   "Wikipedia: Brachial vein — https://en.wikipedia.org/wiki/Brachial_vein",
   "Wikipedia: Dorsal venous network of hand — https://en.wikipedia.org/wiki/Dorsal_venous_network_of_hand",
   "Kenhub: Veins of the upper limb — https://www.kenhub.com/en/library/anatomy/veins-of-the-upper-limb"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "venas-iliacas",
  "nombre": "Venas ilíacas (común, externa e interna)",
  "tipo": "vena",
  "zona": "hip",
  "nombres": [
   "Vena ilíaca común",
   "Vena ilíaca externa",
   "Vena ilíaca interna"
  ],
  "descripcion": "La ilíaca externa recoge el drenaje de la pierna; la interna, el de la pelvis. Ambas se unen delante de la articulación sacroilíaca para formar la ilíaca común, y las dos comunes forman la vena cava inferior.",
  "referencias": [
   "La ilíaca externa continúa la femoral desde el borde inferior del ligamento inguinal y sigue el borde de la pelvis menor.",
   "La interna nace cerca de la escotadura ciática mayor y sube por detrás de la arteria ilíaca interna.",
   "Se unen delante de la articulación sacroilíaca; las ilíacas comunes derecha e izquierda se juntan a la altura de L5.",
   "Son profundas; no se palpan."
  ],
  "relaciones": [
   "Ilíaca externa: recibe epigástrica inferior, circunfleja ilíaca profunda y venas púbicas.",
   "Ilíaca interna: recibe glúteas, pudenda interna, obturatriz, sacras laterales y plexos pélvicos (rectales, vesicales, uterinos).",
   "La ilíaca común izquierda es más larga y pasa por detrás de la arteria ilíaca común derecha.",
   "La ilíaca externa se relaciona con el psoas mayor, el uréter y, según el sexo, con el conducto deferente o el ligamento redondo."
  ],
  "lesiones": [
   "Síndrome de May-Thurner: la arteria ilíaca común derecha comprime la vena ilíaca común izquierda y favorece la trombosis y el edema de la pierna izquierda.",
   "Trombosis iliofemoral, con mayor riesgo de embolia pulmonar.",
   "Congestión venosa pélvica y varices pélvicas.",
   "Compresión por masas pélvicas o embarazo."
  ],
  "fisio": [
   "Hinchazón repentina y unilateral de toda la pierna, sobre todo la izquierda, es señal de alarma: derivar sin masajear.",
   "Dolor pélvico o abdominal bajo con edema de pierna puede ser trombosis pélvica; derivar.",
   "En embarazo, vigilar edema asimétrico y evitar compresión sobre la ingle."
  ],
  "fuentes": [
   "Wikipedia: Common iliac vein — https://en.wikipedia.org/wiki/Common_iliac_vein",
   "Wikipedia: External iliac vein — https://en.wikipedia.org/wiki/External_iliac_vein",
   "Wikipedia: Internal iliac vein — https://en.wikipedia.org/wiki/Internal_iliac_vein",
   "Wikipedia: Inferior vena cava — https://en.wikipedia.org/wiki/Inferior_vena_cava"
  ],
  "verificacion": "una fuente"
 },
 {
  "id": "vena-femoral",
  "nombre": "Vena femoral y sus tributarias",
  "tipo": "vena",
  "zona": "thigh",
  "nombres": [
   "Vena femoral",
   "Vena femoral profunda",
   "Vena circunfleja femoral lateral",
   "Vena circunfleja femoral medial",
   "Vena epigástrica superficial"
  ],
  "descripcion": "Vena profunda principal del muslo: continúa a la poplítea, acompaña a la arteria femoral y se convierte en la ilíaca externa al pasar bajo el ligamento inguinal. Drena la mayor parte de la pierna.",
  "referencias": [
   "Nace en el hiato de los aductores como continuación de la poplítea.",
   "Sube por el canal aductor y el triángulo femoral, dentro de la vaina femoral junto con la arteria.",
   "Su posición respecto a la arteria cambia: posterolateral abajo y medial en el triángulo femoral.",
   "En la ingle, el pulso femoral sirve de guía: la vena está justo medial a la arteria; se evalúa mejor por ecografía."
  ],
  "relaciones": [
   "Recibe a la femoral profunda unos 8 cm bajo el ligamento inguinal; arriba de esa unión se llama femoral común.",
   "Recibe la safena magna en la parte anterior, unos 3 cm lateral e inferior al tubérculo púbico.",
   "Recibe las circunflejas femorales medial y lateral; la epigástrica superficial llega a la safena cerca de la unión.",
   "Tiene unas 4 a 5 válvulas."
  ],
  "lesiones": [
   "Trombosis venosa profunda iliofemoral, con alto riesgo de embolia pulmonar.",
   "Síndrome postrombótico con pesadez, edema y úlceras.",
   "Complicaciones de cateterismo en la ingle (hematoma, infección).",
   "Antes se llamaba vena femoral superficial, nombre que llevaba a ignorar que es profunda."
  ],
  "fisio": [
   "Dolor, calor, enrojecimiento y edema unilateral del muslo o pierna: sospecha de TVP; no masajear ni aplicar presoterapia, derivar.",
   "Dificultad para respirar o dolor torácico súbito con pierna hinchada: urgencia (embolia pulmonar).",
   "Tras cirugía de cadera o rodilla, favorecer movilización temprana y bombeo de tobillo según indicación médica."
  ],
  "fuentes": [
   "Wikipedia: Femoral vein — https://en.wikipedia.org/wiki/Femoral_vein",
   "Kenhub: Femoral vein — https://www.kenhub.com/en/library/anatomy/femoral-vein",
   "Wikipedia: Deep femoral vein — https://en.wikipedia.org/wiki/Deep_femoral_vein",
   "NHS: Deep vein thrombosis — https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "vena-safena-magna",
  "nombre": "Vena safena magna",
  "tipo": "vena",
  "zona": "thigh",
  "nombres": [
   "Vena safena magna"
  ],
  "descripcion": "La vena más larga del cuerpo: es superficial, recorre toda la cara medial de la pierna y el muslo y desemboca en la femoral en la ingle. Muy usada como injerto en puentes coronarios.",
  "referencias": [
   "Nace donde la vena dorsal del dedo gordo se junta con el arco venoso dorsal del pie.",
   "Pasa por delante del maléolo medial, sube por la cara medial de la pierna y por detrás del cóndilo femoral medial.",
   "Sube por el muslo anteromedial y atraviesa el hiato safeno para llegar a la femoral.",
   "Es visible y palpable bajo la piel, sobre todo cuando está dilatada."
  ],
  "relaciones": [
   "Desemboca en la unión safenofemoral, unos 3 a 4 cm inferolateral al tubérculo púbico.",
   "Recibe epigástrica superficial, circunfleja ilíaca superficial, pudenda externa y safenas accesorias.",
   "Se comunica con las venas profundas por perforantes (Dodd, Boyd, Cockett).",
   "El nervio safeno la acompaña en la pierna y puede lesionarse en cirugía; tiene 10 a 20 válvulas."
  ],
  "lesiones": [
   "Várices por insuficiencia valvular, con pesadez, edema, cambios de la piel y úlceras venosas.",
   "Tromboflebitis superficial con cordón rojo y doloroso; si está cerca de la unión safenofemoral puede extenderse a la profunda.",
   "Insuficiencia venosa crónica.",
   "Se cosecha para puentes coronarios y vasculares."
  ],
  "fisio": [
   "Cordón rojo, caliente y duro en el trayecto: no masajear, derivar para descartar extensión profunda.",
   "En várices sin complicaciones, caminar, elevar piernas y fortalecer pantorrilla ayudan; las medias de compresión se indican por el médico.",
   "Tras la cirugía de safena o puente coronario, cuidar la herida de la pierna y evitar presión fuerte sobre ella.",
   "Úlcera de pierna que no cierra en 2 semanas: derivar."
  ],
  "fuentes": [
   "Wikipedia: Great saphenous vein — https://en.wikipedia.org/wiki/Great_saphenous_vein",
   "Kenhub: Great saphenous vein — https://www.kenhub.com/en/library/anatomy/great-saphenous-vein",
   "NHS: Varicose veins — https://www.nhs.uk/conditions/varicose-veins/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "vena-safena-menor",
  "nombre": "Vena safena menor",
  "tipo": "vena",
  "zona": "leg",
  "nombres": [
   "Vena safena menor"
  ],
  "descripcion": "Vena superficial de la cara posterior de la pierna que nace en el borde lateral del pie y suele desembocar en la vena poplítea detrás de la rodilla.",
  "referencias": [
   "Nace donde la vena dorsal del quinto dedo se une al arco venoso dorsal.",
   "Rodea el maléolo lateral por detrás y sube por la cara posterior de la pantorrilla.",
   "Se hunde entre las dos cabezas del gastrocnemio hacia la fosa poplítea.",
   "Es superficial y puede verse como un cordón en la pantorrilla cuando está dilatada."
  ],
  "relaciones": [
   "Acompaña al nervio sural.",
   "Desemboca habitualmente en la poplítea; hay variantes con drenaje a la safena magna.",
   "Puede dar la vena de Giacomini hacia el muslo, que la une con la magna.",
   "Tiene unas 7 a 13 válvulas."
  ],
  "lesiones": [
   "Várices en pantorrilla y cara posterior (cerca de 20% de la insuficiencia venosa).",
   "Tromboflebitis superficial.",
   "Lesión del nervio sural en cirugía o ablación.",
   "Úlceras venosas y cambios pigmentarios en el tobillo."
  ],
  "fisio": [
   "Dolor o cordón en la pantorrilla: descartar TVP antes de masajear; si hay duda, derivar.",
   "Ejercicios de tobillo y pantorrilla favorecen el retorno venoso en insuficiencia crónica.",
   "Después de ablación o cirugía, respetar indicaciones sobre medias y actividad."
  ],
  "fuentes": [
   "Wikipedia: Small saphenous vein — https://en.wikipedia.org/wiki/Small_saphenous_vein",
   "Kenhub: Small saphenous vein — https://www.kenhub.com/en/library/anatomy/small-saphenous-vein",
   "NHS: Varicose veins — https://www.nhs.uk/conditions/varicose-veins/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "vena-poplitea",
  "nombre": "Vena poplítea y geniculares",
  "tipo": "vena",
  "zona": "knee",
  "nombres": [
   "Vena poplítea",
   "Vena genicular"
  ],
  "descripcion": "Vena profunda detrás de la rodilla que se forma por la unión de las venas tibiales y continúa como femoral. Recibe a la safena menor y a las venas geniculares.",
  "referencias": [
   "Se forma en el borde inferior del músculo poplíteo por la unión de las venas tibiales anterior y posterior.",
   "Sube por la fosa poplítea, superficial a la arteria, y pasa por el hiato de los aductores para hacerse femoral.",
   "Se puede palpar con dificultad en la fosa poplítea; se ve bien en ecografía Doppler.",
   "En la fosa, de profundo a superficial, van la arteria, la vena y el nervio tibial."
  ],
  "relaciones": [
   "Afluentes: safena menor, venas geniculares y venas de los músculos gastrocnemios.",
   "Limitada por bíceps femoral, semimembranoso/semitendinoso y las cabezas del gastrocnemio.",
   "El nervio tibial es la estructura más superficial de la fosa.",
   "Puede estar doble en hasta 35% de las personas."
  ],
  "lesiones": [
   "Trombosis venosa profunda, muy frecuente en esta zona.",
   "Atrapamiento por el gastrocnemio con edema, dolor y úlceras.",
   "Quiste poplíteo (de Baker) que puede comprimir la vena y simular TVP.",
   "Aneurisma de la vena poplítea (raro)."
  ],
  "fisio": [
   "Dolor o tensión en la fosa poplítea con edema de pantorrilla: descartar TVP antes de estirar o masajear.",
   "Evitar presión profunda en la fosa poplítea en personas con riesgo de trombosis.",
   "Si un quiste de Baker se rompe, la pantorrilla se pone dolorosa e hinchada y puede parecer TVP: derivar para estudio."
  ],
  "fuentes": [
   "Wikipedia: Popliteal vein — https://en.wikipedia.org/wiki/Popliteal_vein",
   "Kenhub: Popliteal vein — https://www.kenhub.com/en/library/anatomy/popliteal-vein",
   "NHS: Deep vein thrombosis — https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "venas-profundas-pierna",
  "nombre": "Venas profundas de la pierna y perforantes",
  "tipo": "vena",
  "zona": "leg",
  "nombres": [
   "Vena tibial anterior",
   "Vena tibial posterior",
   "Vena fibular",
   "Vena perforante"
  ],
  "descripcion": "Venas pares que acompañan a las arterias tibiales y fibular y drenan los compartimentos de la pierna hacia la poplítea. Las perforantes comunican las venas superficiales con las profundas y, junto con las válvulas, hacen funcionar la bomba muscular de la pantorrilla.",
  "referencias": [
   "La tibial anterior nace en el dorso del pie, pasa por la membrana interósea y se une a la tibial posterior.",
   "La tibial posterior pasa por detrás del maléolo medial y recibe a las fibulares y a las plantares.",
   "Las venas del gastrocnemio y sóleo drenan hacia la tibial posterior y la fibular.",
   "Las perforantes atraviesan la fascia profunda; hay más bajo la rodilla. Algunas conocidas: Dodd (muslo), Boyd (rodilla) y Cockett (pierna)."
  ],
  "relaciones": [
   "Las tibiales anterior y posterior forman la poplítea.",
   "Las fibulares drenan el compartimento lateral y desembocan en la tibial posterior.",
   "Las perforantes tienen válvulas que dejan pasar la sangre solo de superficial a profundo.",
   "Las venas profundas están rodeadas por la vaina de la arteria, lo que ayuda al flujo, y por los músculos de la pantorrilla."
  ],
  "lesiones": [
   "Trombosis venosa profunda, a menudo comienza en las venas de la pantorrilla.",
   "Perforantes incompetentes con reflujo hacia superficial: varices, edema y úlceras venosas.",
   "Síndrome postrombótico con dolor crónico, pesadez y úlceras.",
   "Insuficiencia venosa crónica por debilidad de la bomba de la pantorrilla."
  ],
  "fisio": [
   "Pantorrilla dolorosa, caliente, hinchada y de un solo lado: sospechar TVP; no masajear ni comprimir, derivar.",
   "Con insuficiencia venosa crónica, los ejercicios de fuerza de pantorrilla y de movilidad de tobillo mejoran la bomba muscular.",
   "Las medias de compresión graduada o el vendaje se indican y ajustan por el médico; vigilar piel, pulsos y comodidad.",
   "Si hay disnea o dolor torácico súbito con pierna hinchada, es urgencia por posible embolia pulmonar."
  ],
  "fuentes": [
   "Wikipedia: Posterior tibial vein — https://en.wikipedia.org/wiki/Posterior_tibial_vein",
   "Wikipedia: Anterior tibial vein — https://en.wikipedia.org/wiki/Anterior_tibial_vein",
   "Wikipedia: Peroneal veins — https://en.wikipedia.org/wiki/Peroneal_veins",
   "Wikipedia: Perforator veins — https://en.wikipedia.org/wiki/Perforator_veins",
   "Wikipedia: Skeletal-muscle pump — https://en.wikipedia.org/wiki/Skeletal-muscle_pump",
   "Kenhub: Veins of the lower limb — https://www.kenhub.com/en/library/anatomy/veins-of-the-lower-limb",
   "Wikipedia: Deep vein thrombosis — https://en.wikipedia.org/wiki/Deep_vein_thrombosis"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "venas-pie",
  "nombre": "Venas del pie",
  "tipo": "vena",
  "zona": "foot",
  "nombres": [
   "Venas digitales plantares",
   "Vena metatarsiana plantar"
  ],
  "descripcion": "Red de venas del pie. Las del dorso forman el arco venoso dorsal, superficial, que origina las safenas; las de la planta (digitales y metatarsianas plantares) forman el arco plantar profundo y drenan hacia las tibiales posteriores.",
  "referencias": [
   "El arco venoso dorsal está sobre los metatarsianos, a medio camino entre el tobillo y los dedos, y es fácil de ver y palpar descalzo.",
   "Las cuatro venas metatarsianas plantares corren por los espacios intermetatarsianos y forman el arco plantar.",
   "De este arco salen las venas plantares medial y lateral, que van junto a las arterias.",
   "Las plantares se unen detrás del maléolo medial para formar las tibiales posteriores."
  ],
  "relaciones": [
   "El arco dorsal se conecta con la safena magna (lado del dedo gordo) y la safena menor (lado del quinto dedo).",
   "Venas perforantes comunican el sistema plantar con el dorsal.",
   "Las venas plantares acompañan a las arterias plantares.",
   "La planta del pie actúa como bomba venosa al pisar."
  ],
  "lesiones": [
   "Edema del dorso del pie y tobillo por insuficiencia venosa crónica.",
   "Trombosis venosa profunda que puede extenderse desde las venas plantares y de la pantorrilla.",
   "Cambios en la piel del tobillo (pigmentación, eccema) y úlceras maleolares.",
   "Venas dilatadas en el dorso del pie en várices avanzadas."
  ],
  "fisio": [
   "El apoyo plantar y los ejercicios de dedos y tobillo estimulan el retorno venoso; fomentar movilidad.",
   "Pie o tobillo con edema, color oscuro o heridas que no cierran: derivar valoración vascular.",
   "En compresión (medias, vendaje), revisar que no estrangule los dedos ni el dorso del pie, y vigilar color y sensibilidad."
  ],
  "fuentes": [
   "Wikipedia: Dorsal venous arch of the foot — https://en.wikipedia.org/wiki/Dorsal_venous_arch_of_the_foot",
   "Wikipedia: Plantar venous arch — https://en.wikipedia.org/wiki/Plantar_venous_arch",
   "Kenhub: Veins of the lower limb — https://www.kenhub.com/en/library/anatomy/veins-of-the-lower-limb"
  ],
  "verificacion": "dos fuentes"
 }
]);
