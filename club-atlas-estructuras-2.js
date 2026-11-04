/* Club FisioTeck — Atlas: 100 fichas de estructuras que no muestra el visor 3D: 35 nervios periféricos, 25 articulaciones y 40 ligamentos, meniscos, tendones y fascias (tipo "ligamento").
   Mismo formato que club-atlas-estructuras.js; se suman a FT_ATLAS_ESTR. "verificación parcial": no se confirmó la descripción anatómica completa en dos fuentes independientes.
   Algunas fichas no traen lesiones específicas porque no se confirmaron. Observaciones en CHATGPT-ESTRUCTURAS-OBSERVACIONES.txt. */
(window.FT_ATLAS_ESTR = window.FT_ATLAS_ESTR || []).push(...[
 {
  "id": "plexo-braquial",
  "nombre": "Plexo braquial",
  "tipo": "nervio",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Red nerviosa de la base del cuello y la axila que distribuye fibras motoras y sensitivas hacia el miembro superior.",
  "referencias": [
   "Sus ramos de origen pasan entre los escalenos anterior y medio.",
   "Los fascículos se organizan alrededor de la arteria axilar; no se exploran mediante presión profunda."
  ],
  "relaciones": [
   "Se forma habitualmente con ramos anteriores de C5 a T1.",
   "Se organiza en troncos, divisiones y fascículos antes de sus ramas terminales.",
   "Origina los nervios musculocutáneo, axilar, radial, mediano y ulnar."
  ],
  "lesiones": [
   "Lesión superior de C5-C6, patrón de Erb",
   "Lesión inferior de C8-T1, patrón de Klumpke",
   "Lesión por tracción traumática"
  ],
  "fisio": [
   "Comparar fuerza, sensibilidad y reflejos en varios territorios para distinguir lesión plexual de mononeuropatía.",
   "Evitar tracción cervical o del brazo ante sospecha de lesión reciente.",
   "Derivar con urgencia ante parálisis o pérdida sensitiva extensa después de un traumatismo."
  ],
  "fuentes": [
   "Kenhub: Brachial plexus: Anatomy, branches and mnemonics — https://www.kenhub.com/en/library/anatomy/brachial-plexus",
   "TeachMeAnatomy: Brachial Plexus Anatomy — https://teachmeanatomy.info/upper-limb/nerves/brachial-plexus/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-axilar",
  "nombre": "Nervio axilar",
  "tipo": "nervio",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Nervio del hombro que activa principalmente deltoides y redondo menor y aporta sensibilidad a una zona lateral del brazo.",
  "referencias": [
   "Atraviesa el espacio cuadrangular junto a los vasos circunflejos humerales posteriores.",
   "Rodea el cuello quirúrgico del húmero; su evaluación se basa en función y sensibilidad."
  ],
  "relaciones": [
   "Procede del fascículo posterior del plexo braquial, C5-C6.",
   "Su rama cutánea cubre la región inferior del deltoides.",
   "Se relaciona estrechamente con la cápsula glenohumeral."
  ],
  "lesiones": [
   "Lesión asociada a luxación glenohumeral",
   "Lesión por fractura del cuello quirúrgico humeral",
   "Compresión en el espacio cuadrangular"
  ],
  "fisio": [
   "Explorar contracción del deltoides y sensibilidad lateral del hombro cuando la lesión permita hacerlo sin dolor.",
   "Documentar el estado neurológico antes y después del tratamiento médico de una luxación.",
   "Derivar urgentemente ante debilidad nueva o pérdida sensitiva tras luxación o fractura."
  ],
  "fuentes": [
   "Kenhub: Axillary nerve: Anatomy, course, function — https://www.kenhub.com/en/library/anatomy/axillary-nerve",
   "TeachMeAnatomy: The Axillary Nerve — https://teachmeanatomy.info/upper-limb/nerves/axillary-nerve/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-musculocutaneo",
  "nombre": "Nervio musculocutáneo",
  "tipo": "nervio",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Nervio que activa los principales flexores del codo y continúa como nervio sensitivo de la cara lateral del antebrazo.",
  "referencias": [
   "Habitualmente perfora el coracobraquial.",
   "Desciende entre bíceps y braquial y emerge cerca del borde lateral del tendón bicipital."
  ],
  "relaciones": [
   "Nace del fascículo lateral del plexo braquial, C5-C7.",
   "Inerva coracobraquial, bíceps y la mayor parte del braquial.",
   "Continúa como nervio cutáneo lateral del antebrazo."
  ],
  "lesiones": [
   "Lesión por traumatismo penetrante axilar",
   "Lesión iatrogénica durante cirugía del hombro"
  ],
  "fisio": [
   "Comparar flexión de codo, supinación y sensibilidad lateral del antebrazo.",
   "Integrar el reflejo bicipital con el resto de la exploración; no localiza por sí solo la lesión.",
   "Derivar ante pérdida de fuerza nueva tras herida o cirugía, o deterioro progresivo."
  ],
  "fuentes": [
   "Kenhub: Musculocutaneous nerve: Anatomy, course and function — https://www.kenhub.com/en/library/anatomy/the-musculocutaneous-nerve",
   "TeachMeAnatomy: The Musculocutaneous Nerve — https://teachmeanatomy.info/upper-limb/nerves/musculocutaneous-nerve/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-mediano",
  "nombre": "Nervio mediano",
  "tipo": "nervio",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Nervio mixto que participa en la pronación, la flexión de muñeca y dedos y la destreza del pulgar; lleva sensibilidad a gran parte de la mano radial.",
  "referencias": [
   "Pasa entre las cabezas del pronador redondo.",
   "Entra en la mano por el túnel carpiano, profundo al retináculo flexor."
  ],
  "relaciones": [
   "Se forma por aportes de los fascículos lateral y medial del plexo braquial.",
   "Inerva buena parte de los flexores del antebrazo y músculos tenares.",
   "Su rama cutánea palmar pasa fuera del túnel carpiano."
  ],
  "lesiones": [
   "Síndrome del túnel carpiano",
   "Síndrome del pronador",
   "Lesión por corte o traumatismo"
  ],
  "fisio": [
   "Explorar sensibilidad de pulgar, índice y medio, oposición y abducción del pulgar.",
   "Phalen y Tinel buscan reproducir parestesias compatibles con compresión; no confirman solos el diagnóstico.",
   "Derivar ante atrofia tenar, debilidad progresiva o pérdida sensitiva persistente."
  ],
  "fuentes": [
   "Kenhub: Median nerve: Anatomy, origin, branches, course — https://www.kenhub.com/en/library/anatomy/the-median-nerve",
   "TeachMeAnatomy: The Median Nerve — https://teachmeanatomy.info/upper-limb/nerves/median-nerve/",
   "AAOS / OrthoInfo: Carpal Tunnel Syndrome — https://www.orthoinfo.org/diseases--conditions/carpal-tunnel-syndrome/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-cubital-ulnar",
  "nombre": "Nervio cubital (ulnar)",
  "tipo": "nervio",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Nervio mixto que controla muchos músculos intrínsecos de la mano y aporta sensibilidad al meñique y parte del anular.",
  "referencias": [
   "Pasa detrás del epicóndilo medial del húmero y por el túnel cubital.",
   "Llega a la mano por el canal de Guyon, superficial al retináculo flexor."
  ],
  "relaciones": [
   "Procede del fascículo medial del plexo braquial, principalmente C8-T1.",
   "Inerva flexor ulnar del carpo y la mitad medial del flexor profundo de los dedos.",
   "Activa interóseos, aductor del pulgar y otros músculos intrínsecos."
  ],
  "lesiones": [
   "Síndrome del túnel cubital",
   "Compresión en el canal de Guyon",
   "Lesión por laceración"
  ],
  "fisio": [
   "Explorar separación y aproximación de los dedos y sensibilidad del meñique.",
   "Froment busca compensación con flexión del pulgar al sujetar papel por debilidad del aductor; interpretar junto con otras pruebas.",
   "Evitar apoyo prolongado sobre el codo si reproduce síntomas.",
   "Derivar ante atrofia, pérdida de fuerza progresiva o deterioro sensitivo persistente."
  ],
  "fuentes": [
   "TeachMeAnatomy: The Ulnar Nerve — https://teachmeanatomy.info/upper-limb/nerves/ulnar-nerve/",
   "StatPearls: Anatomy, Shoulder and Upper Limb, Ulnar Nerve — https://www.ncbi.nlm.nih.gov/sites/books/NBK499892/",
   "AAOS / OrthoInfo: Cubital Tunnel Syndrome — https://www.orthoinfo.org/diseases--conditions/ulnar-nerve-entrapment-at-the-elbow/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-radial",
  "nombre": "Nervio radial",
  "tipo": "nervio",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Nervio mixto que participa en la extensión del codo, la muñeca y los dedos y en la sensibilidad posterior del miembro superior.",
  "referencias": [
   "Recorre el surco radial del húmero con la arteria braquial profunda.",
   "Cerca del codo se divide en una rama superficial sensitiva y otra profunda."
  ],
  "relaciones": [
   "Nace del fascículo posterior del plexo braquial, C5-T1.",
   "Inerva tríceps, braquiorradial y, mediante sus ramas, músculos extensores del antebrazo.",
   "La sensibilidad del primer espacio interdigital dorsal ayuda a explorar su territorio distal."
  ],
  "lesiones": [
   "Lesión asociada a fractura diafisaria humeral",
   "Neuropatía por compresión prolongada del brazo",
   "Lesión por presión axilar de muletas"
  ],
  "fisio": [
   "Comparar extensión de muñeca, dedos y codo para orientar el nivel afectado.",
   "Relacionar los déficits motores con la sensibilidad dorsal; una lesión distal puede respetar el tríceps.",
   "Derivar con urgencia ante caída de muñeca nueva después de fractura o herida."
  ],
  "fuentes": [
   "Kenhub: Radial nerve: origin, course and function — https://www.kenhub.com/en/library/anatomy/radial-nerve",
   "TeachMeAnatomy: The Radial Nerve — https://teachmeanatomy.info/upper-limb/nerves/radial-nerve/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-interoseo-posterior",
  "nombre": "Nervio interóseo posterior",
  "tipo": "nervio",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Continuación de la rama profunda del radial en el antebrazo; su función es principalmente motora y también aporta fibras articulares.",
  "referencias": [
   "La rama profunda atraviesa el supinador y continúa como interóseo posterior.",
   "Desciende entre planos extensores hasta la región dorsal de la muñeca."
  ],
  "relaciones": [
   "Depende del nervio radial.",
   "Activa la mayoría de los extensores de dedos y pulgar.",
   "No tiene un territorio cutáneo propio; una lesión aislada puede respetar la extensión de muñeca."
  ],
  "lesiones": [
   "Síndrome de compresión del interóseo posterior",
   "Lesión asociada a fractura-luxación de Monteggia",
   "Compresión por masa o cambios inflamatorios"
  ],
  "fisio": [
   "Explorar extensión metacarpofalángica y del pulgar, comparándola con extensión de muñeca.",
   "Distinguir debilidad motora del síndrome del túnel radial predominantemente doloroso; valorar estudios electrodiagnósticos si procede.",
   "Derivar ante pérdida de extensión nueva o progresiva, especialmente tras traumatismo del codo."
  ],
  "fuentes": [
   "TeachMeAnatomy: Posterior Interosseous Nerve — https://teachmeanatomy.info/encyclopaedia/p/posterior-interosseous-nerve/",
   "StatPearls: Posterior Interosseous Nerve Syndrome — https://www.ncbi.nlm.nih.gov/sites/books/NBK541046/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-supraescapular",
  "nombre": "Nervio supraescapular",
  "tipo": "nervio",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Nervio que activa supraespinoso e infraespinoso y aporta sensibilidad articular al hombro.",
  "referencias": [
   "Pasa por la escotadura supraescapular, bajo el ligamento transverso superior.",
   "Continúa hacia el infraespinoso por la escotadura espinoglenoidea; no se palpa directamente."
  ],
  "relaciones": [
   "Nace habitualmente del tronco superior del plexo braquial, C5-C6.",
   "Inerva supraespinoso e infraespinoso.",
   "Aporta ramas articulares a las articulaciones glenohumeral y acromioclavicular."
  ],
  "lesiones": [
   "Atrapamiento en la escotadura supraescapular",
   "Compresión espinoglenoidea, por ejemplo por un quiste",
   "Lesión por tracción del nervio"
  ],
  "fisio": [
   "Comparar abducción y rotación externa y observar atrofia de las fosas escapulares.",
   "Diferenciar neuropatía, lesión del manguito y afectación cervical; ninguna prueba muscular aislada basta.",
   "Derivar ante atrofia evidente o debilidad progresiva de rotación externa."
  ],
  "fuentes": [
   "Kenhub: Suprascapular nerve: origin, course and function — https://www.kenhub.com/en/library/anatomy/suprascapular-nerve",
   "TeachMeAnatomy: Suprascapular Nerve — https://teachmeanatomy.info/encyclopaedia/s/suprascapular-nerve/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-toracico-largo",
  "nombre": "Nervio torácico largo",
  "tipo": "nervio",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Nervio motor del serrato anterior que ayuda a mantener la escápula contra el tórax y a moverla al elevar el brazo.",
  "referencias": [
   "Desciende por la pared torácica lateral sobre el serrato anterior.",
   "Su trayecto relativamente superficial lo hace vulnerable durante cirugía torácica o axilar."
  ],
  "relaciones": [
   "Se forma con aportes de C5-C7.",
   "Es el principal nervio motor del serrato anterior.",
   "Su lesión puede producir prominencia del borde medial escapular."
  ],
  "lesiones": [
   "Lesión por tracción o golpe",
   "Lesión iatrogénica torácica o axilar",
   "Parálisis del serrato anterior con escápula alada"
  ],
  "fisio": [
   "Observar el control escapular al elevar el brazo y, si es seguro, al empujar suavemente una pared.",
   "Distinguir otras causas de escápula alada; evitar presión directa intensa sobre el trayecto.",
   "Derivar ante escápula alada de aparición reciente tras cirugía o pérdida progresiva de función."
  ],
  "fuentes": [
   "Kenhub: Long thoracic nerve: Origin, course and function — https://www.kenhub.com/en/library/anatomy/long-thoracic-nerve",
   "TeachMeAnatomy: Long Thoracic Nerve — https://teachmeanatomy.info/encyclopaedia/l/long-thoracic-nerve/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-dorsal-escapula",
  "nombre": "Nervio dorsal de la escápula",
  "tipo": "nervio",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Nervio principalmente motor de los romboides y parte del elevador de la escápula, implicado en el control escapular.",
  "referencias": [
   "Habitualmente atraviesa el escaleno medio.",
   "Desciende profundo al elevador y a los romboides; no se identifica mediante palpación superficial."
  ],
  "relaciones": [
   "Se origina habitualmente del ramo anterior de C5.",
   "Inerva romboides mayor y menor.",
   "Comparte el control del elevador escapular con ramos cervicales."
  ],
  "lesiones": [
   "Atrapamiento en el escaleno medio",
   "Neuropatía con debilidad de los romboides"
  ],
  "fisio": [
   "Observar retracción escapular y comparar fuerza y volumen de los romboides.",
   "No atribuir dolor interescapular aislado a este nervio; descartar otros orígenes musculoesqueléticos.",
   "Derivar ante atrofia, alteración escapular marcada o déficit motor progresivo."
  ],
  "fuentes": [
   "Kenhub: Dorsal scapular nerve: Origin, course and function — https://www.kenhub.com/en/library/anatomy/dorsal-scapular-nerve",
   "TeachMeAnatomy: Dorsal Scapular Nerve — https://teachmeanatomy.info/encyclopaedia/d/dorsal-scapular-nerve/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-accesorio-xi",
  "nombre": "Nervio accesorio (XI)",
  "tipo": "nervio",
  "zona": "head",
  "nombres": [],
  "descripcion": "Su componente espinal es motor y participa en los movimientos de cabeza y cintura escapular mediante esternocleidomastoideo y trapecio.",
  "referencias": [
   "Sus fibras espinales entran al cráneo por el foramen magno y salen por el foramen yugular.",
   "Cruza de forma relativamente superficial el triángulo posterior del cuello."
  ],
  "relaciones": [
   "Se relaciona con segmentos cervicales superiores de la médula.",
   "Inerva esternocleidomastoideo y trapecio.",
   "Su trayecto cervical es vulnerable durante biopsias y otras cirugías del cuello."
  ],
  "lesiones": [
   "Lesión iatrogénica cervical",
   "Lesión traumática del cuello",
   "Paresia del trapecio con caída del hombro"
  ],
  "fisio": [
   "Comparar elevación de hombros y giro de cabeza contra resistencia suave.",
   "Observar atrofia del trapecio y posición escapular; interpretar según dolor y antecedentes quirúrgicos.",
   "Derivar pronto ante caída del hombro o debilidad nueva después de una intervención cervical."
  ],
  "fuentes": [
   "Kenhub: Accessory nerve: Anatomy, pathways and function — https://www.kenhub.com/en/library/anatomy/the-accessory-nerve",
   "TeachMeAnatomy: The Accessory Nerve — https://teachmeanatomy.info/head/cranial-nerves/accessory/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-frenico",
  "nombre": "Nervio frénico",
  "tipo": "nervio",
  "zona": "chest",
  "nombres": [],
  "descripcion": "Nervio mixto que proporciona la activación motora del hemidiafragma de su lado y sensibilidad de estructuras torácicas y diafragmáticas.",
  "referencias": [
   "Desciende por la cara anterior del escaleno anterior.",
   "En el tórax pasa por delante de la raíz pulmonar y junto al pericardio; no se palpa para evaluar su función."
  ],
  "relaciones": [
   "Recibe aportes de C3-C5, principalmente C4.",
   "Cada nervio activa su hemidiafragma.",
   "Transporta sensibilidad del pericardio y de regiones centrales del diafragma y sus cubiertas."
  ],
  "lesiones": [
   "Lesión traumática o quirúrgica",
   "Compresión por una masa torácica",
   "Paresia o parálisis diafragmática"
  ],
  "fisio": [
   "Explorar patrón respiratorio, tolerancia al esfuerzo y dificultad al acostarse.",
   "La valoración diafragmática puede requerir ecografía y pruebas médicas; no aplicar presión cervical para provocarlo.",
   "Derivar a urgencias ante dificultad respiratoria intensa o incapacidad para hablar por falta de aire."
  ],
  "fuentes": [
   "Kenhub: Phrenic nerve: origin, course and function — https://www.kenhub.com/en/library/anatomy/phrenic-nerve",
   "TeachMeAnatomy: The Phrenic Nerve — https://teachmeanatomy.info/neck/nerves/phrenic/",
   "NHS: Shortness of breath — https://www.nhs.uk/symptoms/shortness-of-breath/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-ciatico",
  "nombre": "Nervio ciático",
  "tipo": "nervio",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Nervio del plexo sacro que lleva fibras hacia el muslo posterior y, mediante sus ramas, hacia la mayor parte de la pierna y el pie.",
  "referencias": [
   "Habitualmente sale de la pelvis por debajo del piriforme.",
   "Recorre el muslo posterior y se divide en tibial y fibular común a un nivel variable."
  ],
  "relaciones": [
   "Procede de L4-S3.",
   "Inerva músculos posteriores del muslo y la porción isquiotibial del aductor mayor.",
   "La sensibilidad cutánea distal se distribuye mediante sus ramas; no corresponde al cutáneo femoral posterior."
  ],
  "lesiones": [
   "Neuropatía por traumatismo de cadera o pelvis",
   "Lesión iatrogénica glútea o de cadera",
   "Atrapamiento en la región glútea profunda"
  ],
  "fisio": [
   "Comparar fuerza y sensibilidad de territorios tibial y fibular para orientar el déficit.",
   "Distinguir lesión periférica de radiculopatía; el dolor llamado ciática no demuestra lesión del tronco nervioso.",
   "Derivar a urgencias ante anestesia perineal, retención o incontinencia nueva, o déficit grave bilateral."
  ],
  "fuentes": [
   "Kenhub: Sciatic nerve: Origin, course and branches — https://www.kenhub.com/en/library/anatomy/the-sciatic-nerve",
   "TeachMeAnatomy: The Sciatic Nerve — https://teachmeanatomy.info/lower-limb/nerves/sciatic-nerve/",
   "NHS: Sciatica — https://www.nhs.uk/conditions/Sciatica/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-tibial",
  "nombre": "Nervio tibial",
  "tipo": "nervio",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Rama del ciático que activa la musculatura posterior de la pierna y distribuye fibras hacia la planta del pie.",
  "referencias": [
   "Atraviesa la fosa poplítea y desciende hacia el compartimento posterior profundo.",
   "Pasa detrás del maléolo medial por el túnel tarsiano."
  ],
  "relaciones": [
   "Transporta fibras de L4-S3.",
   "Origina los nervios plantares medial y lateral.",
   "Participa en flexión plantar, flexión de dedos y sensibilidad plantar mediante sus ramas."
  ],
  "lesiones": [
   "Síndrome del túnel tarsiano",
   "Lesión traumática de pierna o tobillo"
  ],
  "fisio": [
   "Comparar flexión plantar, flexión de dedos y sensibilidad plantar.",
   "Integrar reflejo aquíleo y distribución del déficit para diferenciar lesión distal de afectación más proximal.",
   "Derivar ante debilidad progresiva, atrofia del pie o pérdida sensitiva persistente."
  ],
  "fuentes": [
   "Kenhub: Tibial nerve: Origin, course and function — https://www.kenhub.com/en/library/anatomy/tibial-nerve",
   "TeachMeAnatomy: The Tibial Nerve — https://teachmeanatomy.info/lower-limb/nerves/tibial-nerve/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-peroneo-comun",
  "nombre": "Nervio peroneo común",
  "tipo": "nervio",
  "zona": "leg",
  "nombres": [],
  "descripcion": "También llamado fibular común, es una rama del ciático que distribuye fibras hacia los compartimentos anterior y lateral de la pierna.",
  "referencias": [
   "Sigue el borde lateral de la fosa poplítea cerca del tendón del bíceps femoral.",
   "Rodea el cuello de la fíbula, donde es relativamente superficial."
  ],
  "relaciones": [
   "Contiene habitualmente fibras de L4-S2.",
   "Se divide en nervios fibulares superficial y profundo.",
   "Por sus ramas participa en dorsiflexión, eversión y sensibilidad dorsal del pie."
  ],
  "lesiones": [
   "Neuropatía por presión en el cuello fibular",
   "Lesión asociada a fractura proximal de fíbula",
   "Compresión por yeso o vendaje ajustado"
  ],
  "fisio": [
   "Explorar dorsiflexión, extensión de dedos y eversión, junto con sensibilidad dorsal.",
   "Comparar inversión para ayudar a distinguir lesión fibular de otras causas de pie caído.",
   "Derivar urgentemente ante pie caído nuevo tras traumatismo o inmovilización."
  ],
  "fuentes": [
   "Kenhub: Common fibular nerve: origin, course, function — https://www.kenhub.com/en/library/anatomy/common-fibular-nerve",
   "TeachMeAnatomy: The Common Fibular Nerve — https://teachmeanatomy.info/lower-limb/nerves/common-fibular-nerve/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-peroneo-superficial",
  "nombre": "Nervio peroneo superficial",
  "tipo": "nervio",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Rama mixta del fibular común que activa los peroneos largo y corto y lleva sensibilidad a gran parte del dorso del pie.",
  "referencias": [
   "Desciende en el compartimento lateral de la pierna.",
   "Se hace subcutáneo al atravesar la fascia crural distal y se divide en ramas dorsales."
  ],
  "relaciones": [
   "Procede del nervio fibular común.",
   "Inerva peroneos largo y corto, participantes de la eversión.",
   "Su territorio cutáneo suele respetar el primer espacio interdigital dorsal."
  ],
  "lesiones": [
   "Atrapamiento al atravesar la fascia",
   "Lesión por esguince o torsión de tobillo",
   "Lesión traumática o quirúrgica distal"
  ],
  "fisio": [
   "Comparar eversión y sensibilidad anterolateral distal y dorsal del pie.",
   "Relacionar síntomas con esguince, cicatriz o compresión; una lesión distal puede ser solo sensitiva.",
   "Derivar ante debilidad nueva o progresiva o pérdida sensitiva que persiste."
  ],
  "fuentes": [
   "TeachMeAnatomy: The Superficial Fibular Nerve — https://teachmeanatomy.info/lower-limb/nerves/superficial-fibular-nerve/",
   "Kenhub: Common fibular nerve: Superficial fibular nerve — https://www.kenhub.com/en/library/anatomy/common-fibular-nerve"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-peroneo-profundo",
  "nombre": "Nervio peroneo profundo",
  "tipo": "nervio",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Rama del fibular común que activa los dorsiflexores del tobillo y extensores de dedos y aporta sensibilidad al primer espacio interdigital dorsal.",
  "referencias": [
   "Desciende por el compartimento anterior junto a la arteria tibial anterior.",
   "Cruza el tobillo bajo los retináculos extensores hacia el dorso del pie."
  ],
  "relaciones": [
   "Procede del nervio fibular común.",
   "Inerva tibial anterior y extensores largos, además de extensores cortos dorsales.",
   "Su rama cutánea terminal cubre una zona entre primer y segundo dedos."
  ],
  "lesiones": [
   "Atrapamiento distal bajo el retináculo extensor",
   "Compresión por calzado ajustado",
   "Lesión en el compartimento anterior de la pierna"
  ],
  "fisio": [
   "Comparar dorsiflexión, extensión del hallux y sensibilidad del primer espacio interdigital.",
   "Diferenciar una lesión distal del nervio de afectación proximal del fibular común.",
   "Derivar a urgencias ante dolor intenso súbito con pierna tensa, alteración sensitiva o debilidad tras lesión o inmovilización."
  ],
  "fuentes": [
   "TeachMeAnatomy: The Deep Fibular Nerve — https://teachmeanatomy.info/lower-limb/nerves/deep-fibular/",
   "Kenhub: Common fibular nerve: Deep fibular nerve — https://www.kenhub.com/en/library/anatomy/common-fibular-nerve",
   "NHS: Compartment syndrome — https://www.nhs.uk/conditions/compartment-syndrome/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-femoral",
  "nombre": "Nervio femoral",
  "tipo": "nervio",
  "zona": "thigh",
  "nombres": [],
  "descripcion": "Nervio del plexo lumbar esencial para la extensión de rodilla, parte de la flexión de cadera y la sensibilidad anterior del muslo.",
  "referencias": [
   "Emerge lateral al psoas y pasa bajo el ligamento inguinal.",
   "En el triángulo femoral está lateral a la arteria; no se busca mediante presión profunda."
  ],
  "relaciones": [
   "Se forma con fibras de L2-L4.",
   "Inerva cuádriceps, sartorio e ilíaco, entre otros.",
   "Su rama safena lleva sensibilidad hacia la región medial de pierna y pie."
  ],
  "lesiones": [
   "Neuropatía por compresión o estiramiento",
   "Lesión traumática o quirúrgica pélvica",
   "Compresión por hemorragia pélvica o abdominal"
  ],
  "fisio": [
   "Comparar extensión de rodilla, sensibilidad anterior y medial y reflejo patelar.",
   "Valorar seguridad al caminar: la debilidad cuadricipital puede causar fallo de rodilla y caídas.",
   "Derivar urgentemente ante debilidad súbita con dolor pélvico o inguinal intenso, especialmente si existe riesgo de sangrado."
  ],
  "fuentes": [
   "Kenhub: Femoral nerve: Anatomy and clinical notes — https://www.kenhub.com/en/library/anatomy/femoral-nerve",
   "TeachMeAnatomy: The Femoral Nerve — https://teachmeanatomy.info/lower-limb/nerves/femoral-nerve/",
   "MedlinePlus: Femoral nerve dysfunction — https://medlineplus.gov/ency/article/000687.htm"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-safeno",
  "nombre": "Nervio safeno",
  "tipo": "nervio",
  "zona": "thigh",
  "nombres": [],
  "descripcion": "Rama sensitiva del femoral que recoge información de la región medial de rodilla y pierna, con extensión variable hacia el pie.",
  "referencias": [
   "Recorre el canal de los aductores bajo el sartorio.",
   "Distalmente se relaciona con la vena safena magna; sus ramas no se identifican de forma fiable al tacto."
  ],
  "relaciones": [
   "Procede del femoral, principalmente L3-L4.",
   "Emite una rama infrapatelar y ramas cutáneas mediales.",
   "No proporciona activación motora a los músculos de la pierna."
  ],
  "lesiones": [
   "Atrapamiento en el canal de los aductores",
   "Lesión de la rama infrapatelar tras cirugía de rodilla",
   "Lesión asociada a procedimientos sobre la safena magna"
  ],
  "fisio": [
   "Comparar sensibilidad medial y revisar antecedentes de cicatrices o cirugía.",
   "Una debilidad objetiva requiere buscar otra estructura afectada; no se explica por lesión safena aislada.",
   "Derivar ante dolor neuropático persistente; si aparece déficit motor, solicitar valoración por una lesión más extensa."
  ],
  "fuentes": [
   "Kenhub: Saphenous nerve: origin, course and function — https://www.kenhub.com/en/library/anatomy/saphenous-nerve",
   "StatPearls: Anatomy, Bony Pelvis and Lower Limb: Saphenous Nerve, Artery, and Vein — https://www.ncbi.nlm.nih.gov/sites/books/NBK541045/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-obturador",
  "nombre": "Nervio obturador",
  "tipo": "nervio",
  "zona": "thigh",
  "nombres": [],
  "descripcion": "Nervio del plexo lumbar que controla buena parte de los aductores de cadera y aporta sensibilidad variable al muslo medial.",
  "referencias": [
   "Emerge por el borde medial del psoas y cruza la pelvis.",
   "Llega al muslo por el conducto obturador; sus ramas se distribuyen alrededor del aductor corto."
  ],
  "relaciones": [
   "Se origina en L2-L4.",
   "Inerva aductores largo y corto, grácil, obturador externo y parte aductora del aductor mayor.",
   "La porción isquiotibial del aductor mayor depende de la división tibial del ciático."
  ],
  "lesiones": [
   "Lesión durante cirugía pélvica",
   "Neuropatía por traumatismo o hematoma pélvico",
   "Atrapamiento fascial del nervio"
  ],
  "fisio": [
   "Comparar fuerza de aducción y sensibilidad medial, considerando solapamiento de territorios.",
   "Distinguir neuropatía de lesión muscular o articular; la electromiografía puede ayudar a confirmar afectación.",
   "Derivar ante debilidad nueva tras cirugía o traumatismo, o dolor pélvico intenso acompañado de déficit neurológico."
  ],
  "fuentes": [
   "Kenhub: Obturator nerve: origin, course and function — https://www.kenhub.com/en/library/anatomy/obturator-nerve",
   "TeachMeAnatomy: The Obturator Nerve — https://teachmeanatomy.info/lower-limb/nerves/obturator-nerve/",
   "Current Reviews in Musculoskeletal Medicine / Tipton: Obturator neuropathy — https://pubmed.ncbi.nlm.nih.gov/19468309/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-gluteo-superior",
  "nombre": "Nervio glúteo superior",
  "tipo": "nervio",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Rama motora del plexo sacro que permite la abducción y el control lateral de la pelvis durante la marcha.",
  "referencias": [
   "Sale por el agujero ciático mayor, por arriba del piriforme.",
   "Discurre entre glúteo medio y menor."
  ],
  "relaciones": [
   "Recibe fibras de L4 a S1.",
   "Inerva glúteo medio, glúteo menor y tensor de la fascia lata."
  ],
  "lesiones": [
   "Lesión asociada con cirugía o traumatismo de cadera.",
   "Debilidad abductora con caída contralateral de la pelvis."
  ],
  "fisio": [
   "Valorar abducción y apoyo sobre una pierna; la caída pélvica orienta a insuficiencia abductora, sin identificar por sí sola su causa.",
   "Comparar fuerza y marcha con el lado opuesto.",
   "Derivar ante debilidad nueva después de cirugía o traumatismo."
  ],
  "fuentes": [
   "Kenhub: Gluteal nerves — https://www.kenhub.com/en/library/anatomy/gluteal-nerves",
   "StatPearls / NCBI Bookshelf: Anatomy, Abdomen and Pelvis: Superior Gluteal Nerve — https://www.ncbi.nlm.nih.gov/books/NBK535408/?report=classic"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-gluteo-inferior",
  "nombre": "Nervio glúteo inferior",
  "tipo": "nervio",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Nervio motor que activa al glúteo mayor y contribuye a la extensión potente de la cadera.",
  "referencias": [
   "Abandona la pelvis por debajo del piriforme.",
   "Alcanza la cara profunda del glúteo mayor."
  ],
  "relaciones": [
   "Procede del plexo sacro, con fibras L5 a S2.",
   "Acompaña a los vasos glúteos inferiores."
  ],
  "lesiones": [
   "Lesión por cirugía, traumatismo o inyección en la región glútea.",
   "Debilidad para levantarse o subir escalones por déficit del glúteo mayor."
  ],
  "fisio": [
   "Explorar extensión de cadera y observar cómo se levanta de una silla.",
   "Distinguir dolor inhibitorio de pérdida real de fuerza.",
   "Derivar ante pérdida motora reciente o progresiva."
  ],
  "fuentes": [
   "Kenhub: Gluteal nerves — https://www.kenhub.com/en/library/anatomy/gluteal-nerves",
   "StatPearls / NCBI Bookshelf: Inferior Gluteal Nerve Injury — https://www.ncbi.nlm.nih.gov/sites/books/NBK558966/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-cutaneo-femoral-lateral",
  "nombre": "Nervio cutáneo femoral lateral",
  "tipo": "nervio",
  "zona": "thigh",
  "nombres": [],
  "descripcion": "Nervio sensitivo del plexo lumbar que recoge sensibilidad de la cara anterolateral del muslo.",
  "referencias": [
   "Cruza sobre el iliaco hacia la espina ilíaca anterosuperior.",
   "Su relación con el ligamento inguinal presenta variaciones."
  ],
  "relaciones": [
   "Habitualmente procede de L2 y L3.",
   "No proporciona fuerza muscular al cuádriceps."
  ],
  "lesiones": [
   "Meralgia parestésica por compresión.",
   "Lesión relacionada con cirugía o presión externa en la región inguinal."
  ],
  "fisio": [
   "Delimitar hormigueo y sensibilidad; preguntar por cinturones o prendas compresivas.",
   "La debilidad o alteración de reflejos obliga a buscar otra causa además de este nervio.",
   "Derivar ante déficit motor o síntomas progresivos."
  ],
  "fuentes": [
   "Kenhub: Lateral femoral cutaneous nerve — https://www.kenhub.com/en/library/anatomy/lateral-femoral-cutaneous-nerve",
   "TeachMeAnatomy: Lateral Cutaneous Nerve of the Thigh — https://teachmeanatomy.info/encyclopaedia/l/lateral-cutaneous-nerve-of-the-thigh/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-pudendo",
  "nombre": "Nervio pudendo",
  "tipo": "nervio",
  "zona": "core",
  "nombres": [],
  "descripcion": "Nervio mixto del periné que participa en la sensibilidad genital y el control de esfínteres externos.",
  "referencias": [
   "Rodea la espina isquiática entre los agujeros ciáticos mayor y menor.",
   "Recorre el canal pudendo en la fascia del obturador interno."
  ],
  "relaciones": [
   "Nace del plexo sacro, S2 a S4.",
   "Da ramas rectales inferiores, perineales y dorsales del pene o clítoris."
  ],
  "lesiones": [
   "Neuralgia o atrapamiento pudendo.",
   "Lesión por traumatismo pélvico o procedimientos quirúrgicos."
  ],
  "fisio": [
   "Preguntar por dolor con la sedestación y función urinaria, intestinal y sexual.",
   "La exploración íntima requiere consentimiento y formación específica; evitar presión que reproduzca dolor intenso.",
   "Derivar de urgencia ante anestesia perineal nueva con retención o incontinencia."
  ],
  "fuentes": [
   "Kenhub: Pudendal nerve — https://www.kenhub.com/en/library/anatomy/pudendal-nerve",
   "TeachMeAnatomy: The Pudendal Nerve — https://teachmeanatomy.info/pelvis/other/pudendal-nerve/",
   "NHS: Sciatica — https://www.nhs.uk/conditions/sciatica/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-sural",
  "nombre": "Nervio sural",
  "tipo": "nervio",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Nervio predominantemente sensitivo que informa sobre la piel posterolateral de la pierna distal y el borde lateral del pie.",
  "referencias": [
   "Su formación a partir de ramas tibiales y fibulares es variable.",
   "Pasa por detrás del maléolo lateral."
  ],
  "relaciones": [
   "Se relaciona con la vena safena menor.",
   "Es vecino del borde lateral del tendón de Aquiles."
  ],
  "lesiones": [
   "Neuropatía por compresión o traumatismo.",
   "Lesión durante procedimientos en Aquiles o tobillo lateral."
  ],
  "fisio": [
   "Comparar sensibilidad en el borde lateral del pie.",
   "Revisar cicatrices y presión del calzado sin atribuir debilidad aislada a un nervio sensitivo.",
   "Derivar ante pérdida sensitiva persistente o progresiva después de traumatismo."
  ],
  "fuentes": [
   "Kenhub: Sural nerve — https://www.kenhub.com/en/library/anatomy/sural-nerve",
   "TeachMeAnatomy: Sural Nerve — https://teachmeanatomy.info/encyclopaedia/s/sural-nerve/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervios-plantares-medial-lateral",
  "nombre": "Nervios plantares medial y lateral",
  "tipo": "nervio",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Son las ramas terminales del nervio tibial que distribuyen sensibilidad y control motor en la planta del pie.",
  "referencias": [
   "Pasan profundos al abductor del dedo gordo.",
   "El plantar medial avanza hacia la planta medial y el lateral hacia el borde externo."
  ],
  "relaciones": [
   "El medial aporta sensibilidad a los tres dedos y medio mediales y activa varios músculos plantares.",
   "El lateral cubre el dedo y medio laterales e inerva buena parte de los músculos intrínsecos restantes."
  ],
  "lesiones": [
   "Atrapamiento plantar medial relacionado con actividad repetitiva.",
   "Compresión de ramas plantares asociada con el túnel tarsiano."
  ],
  "fisio": [
   "Explorar sensibilidad plantar y control de los dedos, comparando ambos pies.",
   "Distinguir dolor de apoyo de adormecimiento; evitar compresión sostenida sobre el trayecto.",
   "Derivar ante déficit progresivo, heridas con insensibilidad o debilidad nueva."
  ],
  "fuentes": [
   "Kenhub: Medial plantar nerve — https://www.kenhub.com/en/library/anatomy/medial-plantar-nerve",
   "TeachMeAnatomy: Medial Plantar Nerve — https://teachmeanatomy.info/encyclopaedia/m/medial-plantar-nerve/",
   "TeachMeAnatomy: Lateral Plantar Nerve — https://teachmeanatomy.info/encyclopaedia/l/lateral-plantar-nerve/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "nervio-facial-vii",
  "nombre": "Nervio facial (VII)",
  "tipo": "nervio",
  "zona": "head",
  "nombres": [],
  "descripcion": "Séptimo par craneal; activa los músculos de la expresión facial y conduce otras fibras gustativas y parasimpáticas.",
  "referencias": [
   "Atraviesa el hueso temporal y sale por el agujero estilomastoideo.",
   "Se ramifica dentro de la parótida para llegar a la cara."
  ],
  "relaciones": [
   "Sus ramas motoras controlan frente, párpados y labios.",
   "La cuerda del tímpano lleva gusto de la porción anterior de la lengua; atravesar la parótida no equivale a inervarla secretomotoramente."
  ],
  "lesiones": [
   "Parálisis de Bell.",
   "Lesión traumática o quirúrgica del nervio."
  ],
  "fisio": [
   "Observar simetría al levantar cejas, cerrar ojos y sonreír.",
   "La falta de cierre palpebral requiere atención para proteger la córnea.",
   "Derivar urgentemente ante debilidad facial súbita, especialmente con dificultad para hablar o mover un brazo."
  ],
  "fuentes": [
   "Kenhub: Facial nerve — https://www.kenhub.com/en/library/anatomy/facial-nerve",
   "TeachMeAnatomy: The Facial Nerve (CN VII) — https://teachmeanatomy.info/head/cranial-nerves/facial-nerve/",
   "NHS: Bell's palsy — https://www.nhs.uk/conditions/bells-palsy/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-trigemino-v-ramas",
  "nombre": "Nervio trigémino (V) y sus ramas",
  "tipo": "nervio",
  "zona": "head",
  "nombres": [],
  "descripcion": "Quinto par craneal que lleva la mayor parte de la sensibilidad facial; su división mandibular también mueve los músculos de la masticación.",
  "referencias": [
   "Se relaciona con el puente y el ganglio trigeminal.",
   "V1 atraviesa la fisura orbitaria superior, V2 el agujero redondo y V3 el oval."
  ],
  "relaciones": [
   "V1 es oftálmica, V2 maxilar y V3 mandibular.",
   "La sensibilidad general de la lengua anterior depende de V3; el gusto usa otra vía."
  ],
  "lesiones": [
   "Neuralgia del trigémino.",
   "Lesión de ramas sensitivas tras traumatismo o procedimientos dentales."
  ],
  "fisio": [
   "Comparar tacto facial por territorios y valorar contracción de maseteros.",
   "No provocar repetidamente dolor intenso para reproducir una neuralgia.",
   "Derivar ante pérdida sensitiva nueva, debilidad mandibular o dolor facial atípico persistente."
  ],
  "fuentes": [
   "Kenhub: Trigeminal nerve (CN V) — https://www.kenhub.com/en/library/anatomy/the-trigeminal-nerve",
   "TeachMeAnatomy: The Trigeminal Nerve (CN V) — https://teachmeanatomy.info/head/cranial-nerves/trigeminal-nerve/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-hipogloso-xii",
  "nombre": "Nervio hipogloso (XII)",
  "tipo": "nervio",
  "zona": "head",
  "nombres": [],
  "descripcion": "Par craneal motor que mueve casi todos los músculos de la lengua y contribuye al habla y la deglución.",
  "referencias": [
   "Se origina en la médula oblongada y atraviesa el conducto del hipogloso.",
   "Se dirige a la lengua en el cuello y suelo de la boca."
  ],
  "relaciones": [
   "Inerva músculos linguales intrínsecos y extrínsecos, excepto el palatogloso.",
   "Fibras de C1 pueden acompañarlo sin pertenecer propiamente al XII."
  ],
  "lesiones": [
   "Lesión tras cirugía o traumatismo cervical.",
   "Compromiso por enfermedades neurológicas o lesiones de la base del cráneo."
  ],
  "fisio": [
   "Observar protrusión, movilidad, atrofia y asimetría de la lengua.",
   "Preguntar por cambios de voz, articulación del habla y atragantamiento.",
   "Derivar con urgencia ante alteración súbita del habla o dificultad respiratoria o para deglutir."
  ],
  "fuentes": [
   "Kenhub: Hypoglossal nerve — https://www.kenhub.com/en/library/anatomy/the-hypoglossal-nerve",
   "TeachMeAnatomy: The Hypoglossal Nerve (CN XII) — https://teachmeanatomy.info/head/cranial-nerves/hypoglossal/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-vago-x",
  "nombre": "Nervio vago (X)",
  "tipo": "nervio",
  "zona": "head",
  "nombres": [],
  "descripcion": "Par craneal mixto que participa en la voz, la deglución y la regulación parasimpática de vísceras torácicas y abdominales.",
  "referencias": [
   "Sale del cráneo por el agujero yugular.",
   "Desciende por la vaina carotídea hacia tórax y abdomen."
  ],
  "relaciones": [
   "Da ramas faríngeas y laríngeas.",
   "Los nervios laríngeos recurrentes participan en la movilidad de las cuerdas vocales."
  ],
  "lesiones": [
   "Lesión laríngea recurrente asociada con cirugía cervical o torácica.",
   "Compromiso neurológico con disfonía o disfagia."
  ],
  "fisio": [
   "Preguntar por ronquera, tos al comer y dificultad para tragar.",
   "No realizar maniobras sobre la carótida ni provocar reflejo nauseoso como ejercicio.",
   "Derivar de urgencia ante estridor, dificultad respiratoria o incapacidad para deglutir."
  ],
  "fuentes": [
   "Kenhub: Vagus nerve — https://www.kenhub.com/en/library/anatomy/the-vagus-nerve",
   "TeachMeAnatomy: The Vagus Nerve (CN X) — https://teachmeanatomy.info/head/cranial-nerves/vagus-nerve-cn-x/",
   "NHS: Shortness of breath — https://www.nhs.uk/symptoms/shortness-of-breath/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-occipital-mayor",
  "nombre": "Nervio occipital mayor",
  "tipo": "nervio",
  "zona": "head",
  "nombres": [],
  "descripcion": "Rama cervical que aporta sensibilidad a gran parte del cuero cabelludo posterior.",
  "referencias": [
   "Procede del ramo posterior de C2.",
   "Asciende cerca del oblicuo inferior y atraviesa planos musculares hacia el occipucio."
  ],
  "relaciones": [
   "Se relaciona con el semiespinoso de la cabeza.",
   "En la región occipital se aproxima a la arteria occipital."
  ],
  "lesiones": [
   "Neuralgia occipital.",
   "Irritación o atrapamiento en su recorrido posterior."
  ],
  "fisio": [
   "Registrar distribución del dolor y sensibilidad del cuero cabelludo.",
   "La sensibilidad local no confirma por sí sola una neuralgia; evitar compresión fuerte.",
   "Derivar urgentemente ante cefalea súbita muy intensa o asociada con déficit neurológico o fiebre."
  ],
  "fuentes": [
   "Kenhub: Occipital nerves — https://www.kenhub.com/en/library/anatomy/occipital-nerves",
   "StatPearls / NCBI Bookshelf: Anatomy, Head and Neck, Occipital Nerves — https://www.ncbi.nlm.nih.gov/books/NBK542213/?report=reader",
   "NHS: Headaches — https://www.nhs.uk/symptoms/headaches/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "nervios-intercostales",
  "nombre": "Nervios intercostales",
  "tipo": "nervio",
  "zona": "chest",
  "nombres": [],
  "descripcion": "Ramos anteriores torácicos que dan sensibilidad a la pared del tronco y activan músculos de la pared torácica y abdominal.",
  "referencias": [
   "Los intercostales corresponden a T1 a T11; T12 se denomina subcostal.",
   "Discurren en el plano entre intercostales interno e íntimo."
  ],
  "relaciones": [
   "Se relacionan con los vasos intercostales junto al borde inferior de las costillas.",
   "Sus ramas cutáneas alcanzan la pared lateral y anterior del tronco."
  ],
  "lesiones": [
   "Neuralgia posherpética.",
   "Dolor neuropático después de traumatismo costal o cirugía torácica."
  ],
  "fisio": [
   "Explorar sensibilidad y relación del dolor con respiración y movimiento.",
   "No asumir que un dolor torácico reproducible es siempre musculoesquelético.",
   "Derivar de urgencia ante dolor torácico con dificultad respiratoria marcada o mal estado general."
  ],
  "fuentes": [
   "Kenhub: Intercostal nerves — https://www.kenhub.com/en/library/anatomy/intercostal-nerves",
   "StatPearls / NCBI Bookshelf: Anatomy, Thorax, Intercostal Nerves — https://www.ncbi.nlm.nih.gov/books/NBK538238/",
   "NHS: Shortness of breath — https://www.nhs.uk/symptoms/shortness-of-breath/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervios-ilioinguinal-iliohipogastrico",
  "nombre": "Nervios ilioinguinal e iliohipogástrico",
  "tipo": "nervio",
  "zona": "core",
  "nombres": [],
  "descripcion": "Ramas del plexo lumbar que participan en la sensibilidad inguinal y abdominal inferior y en el control de la pared abdominal.",
  "referencias": [
   "Viajan en planos de la pared abdominal cerca de la cresta ilíaca.",
   "El ilioinguinal recorre parte del conducto inguinal, sin entrar por el anillo profundo."
  ],
  "relaciones": [
   "Proceden principalmente de L1, con variaciones.",
   "Aportan ramas al oblicuo interno y transverso y territorios cutáneos parcialmente superpuestos."
  ],
  "lesiones": [
   "Neuralgia inguinal después de cirugía de hernia.",
   "Lesión por incisiones o traumatismos abdominales bajos."
  ],
  "fisio": [
   "Relacionar alteración sensitiva con cicatrices y distribución del dolor.",
   "La superposición con otros nervios impide identificar la causa solo por el mapa cutáneo.",
   "Derivar ante dolor inguinal persistente o síntomas abdominales agudos."
  ],
  "fuentes": [
   "Kenhub: Ilioinguinal nerve — https://www.kenhub.com/en/library/anatomy/ilioinguinal-nerve",
   "Kenhub: Iliohypogastric nerve — https://www.kenhub.com/en/library/anatomy/iliohypogastric-nerve",
   "Journal of Ultrasonography / PubMed: Sonoanatomy of the ilioinguinal, iliohypogastric, genitofemoral, obturator, and pudendal nerves: a practical guide for US-guided injections — https://pubmed.ncbi.nlm.nih.gov/35449704/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "nervio-genitofemoral",
  "nombre": "Nervio genitofemoral",
  "tipo": "nervio",
  "zona": "core",
  "nombres": [],
  "descripcion": "Rama lumbar que aporta sensibilidad inguinal y del muslo superior; su rama genital participa en el reflejo cremastérico masculino.",
  "referencias": [
   "Se forma en el psoas mayor y emerge por su cara anterior.",
   "Se divide en ramas genital y femoral."
  ],
  "relaciones": [
   "Suele recibir fibras L1 y L2.",
   "La rama genital se relaciona con el conducto inguinal y la femoral con el territorio proximal anterior del muslo."
  ],
  "lesiones": [
   "Neuralgia genitofemoral.",
   "Lesión relacionada con cirugía inguinal o retroperitoneal."
  ],
  "fisio": [
   "Registrar dolor, sensibilidad y antecedentes quirúrgicos.",
   "Valorar diagnósticos alternativos por solapamiento con ilioinguinal y cutáneo femoral lateral.",
   "Derivar ante dolor genital o inguinal agudo intenso o déficit progresivo."
  ],
  "fuentes": [
   "Kenhub: Genitofemoral nerve — https://www.kenhub.com/en/library/anatomy/genitofemoral-nerve",
   "TeachMeAnatomy: Genitofemoral Nerve — https://teachmeanatomy.info/encyclopaedia/g/genitofemoral-nerve/",
   "Journal of Ultrasonography / PubMed: Sonoanatomy of the ilioinguinal, iliohypogastric, genitofemoral, obturator, and pudendal nerves: a practical guide for US-guided injections — https://pubmed.ncbi.nlm.nih.gov/35449704/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "nervio-radial-superficial",
  "nombre": "Nervio radial superficial",
  "tipo": "nervio",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Rama sensitiva del radial destinada a parte del dorso radial de la mano.",
  "referencias": [
   "Desciende profunda al braquiorradial junto a la arteria radial.",
   "Se vuelve subcutánea en el antebrazo distal hacia la tabaquera anatómica."
  ],
  "relaciones": [
   "Es distinta de la rama profunda y del nervio interóseo posterior.",
   "Recoge sensibilidad del dorso radial de la mano, con variación en sus límites."
  ],
  "lesiones": [
   "Neuropatía compresiva superficial o síndrome de Wartenberg.",
   "Lesión por traumatismo o procedimientos en la muñeca radial."
  ],
  "fisio": [
   "Comparar sensibilidad dorsal radial y revisar presión de correas o férulas.",
   "La debilidad extensora no se explica por esta rama sensitiva aislada.",
   "Derivar ante pérdida sensitiva persistente o lesión reciente con déficit neurológico."
  ],
  "fuentes": [
   "Kenhub: Radial nerve — https://www.kenhub.com/en/library/anatomy/radial-nerve",
   "TeachMeAnatomy: Superficial Radial Nerve — https://teachmeanatomy.info/encyclopaedia/s/superficial-radial-nerve/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulacion-temporomandibular",
  "nombre": "Articulación temporomandibular",
  "tipo": "articulacion",
  "zona": "head",
  "nombres": [],
  "descripcion": "Unión sinovial entre mandíbula y temporal que combina rotación y deslizamiento para abrir, cerrar y desplazar la mandíbula.",
  "referencias": [
   "Se localiza por delante del trago.",
   "El disco articular divide la cavidad en compartimentos superior e inferior."
  ],
  "relaciones": [
   "Une el cóndilo mandibular con la fosa y eminencia del temporal.",
   "Trabaja junto a masetero, temporal y pterigoideos."
  ],
  "lesiones": [
   "Trastorno temporomandibular con dolor o limitación.",
   "Desplazamiento discal o luxación mandibular."
  ],
  "fisio": [
   "Observar apertura, desviación y relación entre ruido y dolor; un clic aislado no basta para diagnosticar.",
   "Evitar forzar una mandíbula bloqueada o intentar reducir una luxación.",
   "Derivar ante bloqueo persistente, traumatismo con cambio de mordida o imposibilidad para cerrar la boca."
  ],
  "fuentes": [
   "Kenhub: Temporomandibular joint — https://www.kenhub.com/en/library/anatomy/the-temporomandibular-joint",
   "TeachMeAnatomy: The Temporomandibular Joint — https://teachmeanatomy.info/head/joints/temporomandibular/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulaciones-atlantooccipital-atlantoaxial",
  "nombre": "Articulaciones atlantooccipital y atlantoaxial",
  "tipo": "articulacion",
  "zona": "head",
  "nombres": [],
  "descripcion": "Uniones del cráneo con C1 y de C1 con C2 que permiten asentir y gran parte de la rotación cervical alta.",
  "referencias": [
   "C0-C1 se sitúa entre cóndilos occipitales y atlas.",
   "C1-C2 incluye dos uniones laterales y una central relacionada con la apófisis odontoides."
  ],
  "relaciones": [
   "El ligamento transverso del atlas estabiliza la odontoides.",
   "Ligamentos alares y membrana tectoria contribuyen a la estabilidad."
  ],
  "lesiones": [
   "Inestabilidad por traumatismo o enfermedad inflamatoria.",
   "Artrosis o restricción dolorosa cervical alta."
  ],
  "fisio": [
   "Explorar movimiento activo cómodo y antecedentes de trauma o artritis.",
   "No hacer maniobras forzadas cuando se sospeche inestabilidad cervical.",
   "Derivar urgentemente ante trauma cervical con síntomas neurológicos."
  ],
  "fuentes": [
   "Kenhub: Atlantoaxial joint — https://www.kenhub.com/en/library/anatomy/atlantoaxial-joint",
   "TeachMeAnatomy: The Vertebral Column — https://teachmeanatomy.info/back/bones/vertebral-column/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "articulaciones-cigapofisarias",
  "nombre": "Articulaciones cigapofisarias (facetarias)",
  "tipo": "articulacion",
  "zona": "back",
  "nombres": [],
  "descripcion": "Uniones sinoviales entre apófisis articulares de vértebras vecinas que guían y limitan movimientos de la columna.",
  "referencias": [
   "Son pares, a ambos lados del arco vertebral.",
   "La orientación de las carillas cambia entre regiones cervical, torácica y lumbar."
  ],
  "relaciones": [
   "Cada unión posee cápsula y superficies cartilaginosas.",
   "Actúan junto a discos y ligamentos vertebrales."
  ],
  "lesiones": [
   "Artrosis facetaria.",
   "Dolor asociado con irritación o lesión capsular."
  ],
  "fisio": [
   "Valorar movimiento, función y exploración neurológica cuando haya irradiación.",
   "Ni palpación ni dolor con extensión identifican por sí solos una faceta como origen del dolor.",
   "Derivar ante déficit neurológico progresivo o dolor con fiebre."
  ],
  "fuentes": [
   "Kenhub: Zygapophyseal joints — https://www.kenhub.com/en/library/anatomy/zygapophyseal-joints",
   "TeachMeAnatomy: The Vertebral Column — https://teachmeanatomy.info/back/bones/vertebral-column/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulacion-intervertebral",
  "nombre": "Articulación intervertebral (disco y unión)",
  "tipo": "articulacion",
  "zona": "back",
  "nombres": [],
  "descripcion": "Unión cartilaginosa entre cuerpos vertebrales mediante un disco que distribuye cargas y permite movilidad segmentaria.",
  "referencias": [
   "Los discos móviles se extienden desde C2-C3 hasta L5-S1.",
   "El anillo fibroso rodea el núcleo pulposo."
  ],
  "relaciones": [
   "Las placas terminales conectan disco y cuerpos vertebrales.",
   "Ligamentos longitudinales refuerzan la unión."
  ],
  "lesiones": [
   "Degeneración discal.",
   "Hernia discal, con o sin compromiso de una raíz nerviosa."
  ],
  "fisio": [
   "Explorar movimiento y función; añadir fuerza, sensibilidad y reflejos si hay síntomas radiculares.",
   "Relacionar las imágenes con la clínica, pues un cambio discal no demuestra por sí solo la causa del dolor.",
   "Derivar de urgencia ante anestesia en silla de montar o alteración nueva del control de esfínteres."
  ],
  "fuentes": [
   "Kenhub: Intervertebral discs — https://www.kenhub.com/en/library/anatomy/the-intervertebral-discs",
   "TeachMeAnatomy: The Vertebral Column — https://teachmeanatomy.info/back/bones/vertebral-column/",
   "NHS: Sciatica — https://www.nhs.uk/conditions/sciatica/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulacion-sacroiliaca",
  "nombre": "Articulación sacroilíaca",
  "tipo": "articulacion",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Unión de movilidad reducida entre sacro e ilion que transmite cargas entre columna y pelvis.",
  "referencias": [
   "Sus superficies auriculares se sitúan a ambos lados del sacro.",
   "La porción posterior está reforzada por un potente conjunto ligamentoso."
  ],
  "relaciones": [
   "Se relaciona con ligamentos sacroilíacos e interóseos.",
   "Funciona dentro del anillo pélvico junto a la sínfisis del pubis."
  ],
  "lesiones": [
   "Dolor de origen sacroilíaco.",
   "Sacroileítis inflamatoria."
  ],
  "fisio": [
   "Revisar marcha, carga y posibles fuentes lumbares o de cadera.",
   "Las pruebas de provocación se interpretan en conjunto y no demuestran un supuesto desplazamiento pélvico.",
   "Derivar ante fiebre con dolor pélvico intenso o sospecha de lesión del anillo pélvico."
  ],
  "fuentes": [
   "Kenhub: Sacroiliac joint — https://www.kenhub.com/en/library/anatomy/sacroiliac-joint",
   "NHS: Sciatica — https://www.nhs.uk/conditions/sciatica/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "sinfisis-pubis",
  "nombre": "Sínfisis del pubis",
  "tipo": "articulacion",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Unión cartilaginosa de la pelvis anterior, con un disco fibrocartilaginoso que ayuda a distribuir cargas en el anillo pélvico.",
  "referencias": [
   "Está en la línea media, entre ambos pubis.",
   "Su movilidad normal es reducida."
  ],
  "relaciones": [
   "Cerca se insertan rectos abdominales y músculos aductores.",
   "Trabaja con las articulaciones sacroilíacas para cerrar el anillo pélvico."
  ],
  "lesiones": [
   "Osteítis del pubis no infecciosa.",
   "Separación o inestabilidad sintomática de la sínfisis."
  ],
  "fisio": [
   "Explorar marcha y tareas de carga, relacionando dolor púbico con abdomen y aductores.",
   "Evitar palpación íntima sin consentimiento o maniobras dolorosas tras trauma.",
   "Derivar ante traumatismo pélvico, incapacidad para caminar o dolor con fiebre."
  ],
  "fuentes": [
   "Kenhub: Pubis — https://www.kenhub.com/en/library/anatomy/pubis",
   "StatPearls / NCBI Bookshelf: Osteitis Pubis — https://www.ncbi.nlm.nih.gov/books/NBK556168/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "articulacion-esternoclavicular",
  "nombre": "Articulación esternoclavicular",
  "tipo": "articulacion",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Articulación sinovial entre clavícula y esternón que conecta la cintura escapular con el esqueleto del tronco.",
  "referencias": [
   "Se encuentra junto al borde superior del manubrio.",
   "Un disco articular divide su cavidad."
  ],
  "relaciones": [
   "Participan clavícula medial, manubrio y primer cartílago costal.",
   "Los ligamentos esternoclaviculares y costoclavicular refuerzan la unión."
  ],
  "lesiones": [
   "Esguince o luxación esternoclavicular.",
   "Cambios degenerativos dolorosos."
  ],
  "fisio": [
   "Observar dolor, asimetría y movimiento clavicular durante la elevación del brazo.",
   "No intentar reducir una prominencia o luxación.",
   "Derivar de urgencia ante trauma medial de clavícula con dificultad para respirar, tragar o alteración vascular."
  ],
  "fuentes": [
   "Kenhub: Sternoclavicular joint — https://www.kenhub.com/en/library/anatomy/sternoclavicular-joint",
   "TeachMeAnatomy: The Sternoclavicular Joint — https://teachmeanatomy.info/upper-limb/joints/sternoclavicular/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulacion-acromioclavicular",
  "nombre": "Articulación acromioclavicular",
  "tipo": "articulacion",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Unión sinovial plana entre el acromion y la clavícula lateral que adapta la escápula al movimiento del brazo.",
  "referencias": [
   "Se identifica en la parte superior del hombro.",
   "Permite pequeños ajustes entre clavícula y escápula."
  ],
  "relaciones": [
   "Su cápsula recibe refuerzo del ligamento acromioclavicular.",
   "Los ligamentos coracoclaviculares sostienen la relación entre escápula y clavícula."
  ],
  "lesiones": [
   "Esguince o separación acromioclavicular.",
   "Artrosis acromioclavicular."
  ],
  "fisio": [
   "Relacionar dolor localizado con elevación y aducción horizontal del brazo, sin tomar una maniobra aislada como diagnóstico.",
   "No cargar ni movilizar agresivamente una lesión reciente.",
   "Derivar ante deformidad traumática, dolor intenso o déficit neurovascular."
  ],
  "fuentes": [
   "Kenhub: Acromioclavicular joint — https://www.kenhub.com/en/library/anatomy/acromioclavicular-ac-joint",
   "TeachMeAnatomy: The Acromioclavicular Joint — https://teachmeanatomy.info/upper-limb/joints/acromioclavicular/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulacion-glenohumeral",
  "nombre": "Articulación glenohumeral",
  "tipo": "articulacion",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Articulación esférica sinovial entre cabeza humeral y glenoides; permite la amplia movilidad del hombro.",
  "referencias": [
   "El labrum profundiza la cavidad glenoidea.",
   "La cápsula es relativamente laxa para permitir movimiento."
  ],
  "relaciones": [
   "El manguito rotador aporta estabilidad dinámica.",
   "La estabilidad pasiva depende también de cápsula, ligamentos y labrum."
  ],
  "lesiones": [
   "Luxación e inestabilidad glenohumeral.",
   "Rigidez capsular o artrosis."
  ],
  "fisio": [
   "Comparar movilidad activa y pasiva y función del manguito.",
   "Evitar maniobras de inestabilidad tras una luxación reciente sin valoración previa.",
   "Derivar urgentemente ante hombro deformado después de trauma o pérdida de sensibilidad y pulso."
  ],
  "fuentes": [
   "Kenhub: Glenohumeral joint — https://www.kenhub.com/en/library/anatomy/the-shoulder-joint",
   "TeachMeAnatomy: The Shoulder Joint — https://teachmeanatomy.info/upper-limb/joints/shoulder/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulacion-escapulotoracica",
  "nombre": "Articulación escapulotorácica (funcional)",
  "tipo": "articulacion",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Plano funcional de deslizamiento entre escápula y tórax; no es una articulación sinovial verdadera.",
  "referencias": [
   "El movimiento se observa en la cara posterior del tórax.",
   "La elevación del brazo necesita coordinación escapular."
  ],
  "relaciones": [
   "Serrato anterior y subescapular se interponen en los planos de deslizamiento.",
   "Depende del movimiento combinado esternoclavicular y acromioclavicular."
  ],
  "lesiones": [
   "Discinesia escapular.",
   "Escápula alada por alteración muscular o nerviosa."
  ],
  "fisio": [
   "Observar escápulas al elevar y bajar brazos y durante tareas funcionales.",
   "Valorar fuerza del serrato y trapecio; una asimetría visual aislada no confirma lesión.",
   "Derivar ante alado nuevo, debilidad marcada o comienzo tras traumatismo o cirugía."
  ],
  "fuentes": [
   "Kenhub: Scapulothoracic joint — https://www.kenhub.com/en/library/anatomy/scapulothoracic-joint",
   "AAOS OrthoInfo: Scapular (Shoulder Blade) Disorders — https://www.orthoinfo.org/diseases--conditions/scapular-shoulder-blade-disorders/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulacion-codo",
  "nombre": "Articulación del codo (humerocubital, humerorradial y radiocubital proximal)",
  "tipo": "articulacion",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Complejo del codo que combina flexión y extensión con la rotación radiocubital proximal.",
  "referencias": [
   "La tróclea humeral articula con la escotadura troclear del cúbito.",
   "La cabeza radial contacta con el capítulo humeral y la escotadura radial cubital."
  ],
  "relaciones": [
   "Las tres uniones comparten la envoltura capsular del complejo.",
   "Los ligamentos colaterales y anular aportan estabilidad."
  ],
  "lesiones": [
   "Luxación del codo.",
   "Rigidez postraumática o lesión de ligamentos."
  ],
  "fisio": [
   "Explorar flexión, extensión y pronosupinación, además de sensibilidad y circulación de la mano tras trauma.",
   "Evitar movilización forzada si se sospecha fractura o luxación.",
   "Derivar de urgencia ante deformidad o mano fría, pálida o insensible."
  ],
  "fuentes": [
   "Kenhub: Elbow joint — https://www.kenhub.com/en/library/anatomy/elbow-joint",
   "TeachMeAnatomy: The Elbow Joint — https://teachmeanatomy.info/upper-limb/joints/elbow-joint/",
   "TeachMeAnatomy: The Radioulnar Joints — https://teachmeanatomy.info/upper-limb/joints/radioulnar-joints/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulacion-radiocubital-distal",
  "nombre": "Articulación radiocubital distal",
  "tipo": "articulacion",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Articulación de pivote entre radio distal y cabeza cubital que participa en la pronación y supinación.",
  "referencias": [
   "Se ubica junto al borde cubital de la muñeca.",
   "Su giro se coordina con la radiocubital proximal."
  ],
  "relaciones": [
   "El TFCC es un estabilizador importante.",
   "El disco articular separa el cúbito del carpo."
  ],
  "lesiones": [
   "Inestabilidad radiocubital distal.",
   "Artrosis o dolor asociado con lesión del TFCC."
  ],
  "fisio": [
   "Valorar pronosupinación y dolor al girar objetos.",
   "Comparar estabilidad con el lado contrario sin forzar una muñeca recién lesionada.",
   "Derivar ante bloqueo tras trauma, deformidad o inestabilidad evidente."
  ],
  "fuentes": [
   "Kenhub: Distal radioulnar joint — https://www.kenhub.com/en/library/anatomy/distal-radioulnar-joint",
   "TeachMeAnatomy: The Radioulnar Joints — https://teachmeanatomy.info/upper-limb/joints/radioulnar-joints/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulacion-radiocarpiana",
  "nombre": "Articulación radiocarpiana (muñeca)",
  "tipo": "articulacion",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Unión sinovial entre radio distal, disco articular y fila proximal del carpo que permite flexión, extensión y desviaciones de muñeca.",
  "referencias": [
   "Participan escafoides, semilunar y piramidal; el pisiforme queda fuera.",
   "El cúbito no contacta directamente con el carpo por la interposición del disco."
  ],
  "relaciones": [
   "Trabaja junto a la mediocarpiana.",
   "Ligamentos radiocarpianos y colaterales refuerzan su cápsula."
  ],
  "lesiones": [
   "Esguince de muñeca.",
   "Artrosis o rigidez posterior a traumatismo."
  ],
  "fisio": [
   "Explorar movilidad y capacidad de apoyo o agarre según tolerancia.",
   "Buscar dolor óseo focal tras caídas antes de iniciar carga.",
   "Derivar ante deformidad, pérdida sensitiva o dolor persistente en la tabaquera anatómica después de trauma."
  ],
  "fuentes": [
   "Kenhub: Radiocarpal joint — https://www.kenhub.com/en/library/anatomy/the-wrist-joint",
   "TeachMeAnatomy: The Wrist Joint — https://teachmeanatomy.info/upper-limb/joints/wrist-joint/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulacion-mediocarpiana",
  "nombre": "Articulación mediocarpiana",
  "tipo": "articulacion",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Conjunto de uniones entre las filas proximal y distal del carpo que contribuye a la movilidad total de la muñeca.",
  "referencias": [
   "Su línea articular tiene un contorno irregular entre ambas filas.",
   "Participa en flexión, extensión y desviaciones."
  ],
  "relaciones": [
   "Actúa de forma coordinada con la radiocarpiana.",
   "Su estabilidad depende de ligamentos intercarpianos y estructuras extrínsecas."
  ],
  "lesiones": [
   "Inestabilidad mediocarpiana.",
   "Dolor o rigidez relacionados con lesión ligamentosa del carpo."
  ],
  "fisio": [
   "Registrar movilidad, dolor y chasquidos durante tareas habituales.",
   "Un chasquido sin otros hallazgos no demuestra inestabilidad; evitar reproducirlo de manera forzada.",
   "Derivar ante bloqueo, pérdida de función o dolor persistente después de una caída."
  ],
  "fuentes": [
   "Kenhub: Midcarpal joint — https://www.kenhub.com/en/library/anatomy/midcarpal-joint",
   "StatPearls / NCBI Bookshelf: Carpal Ligament Instability — https://www.ncbi.nlm.nih.gov/books/NBK557729/?report=reader"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "articulacion-carpometacarpiana-pulgar",
  "nombre": "Articulación carpometacarpiana del pulgar",
  "tipo": "articulacion",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Articulación sinovial en silla de montar entre trapecio y primer metacarpiano; hace posible la oposición del pulgar.",
  "referencias": [
   "Se localiza en la base del pulgar, cerca de la muñeca.",
   "Combina movimientos para la pinza y el agarre."
  ],
  "relaciones": [
   "La cápsula y sus ligamentos limitan desplazamientos excesivos.",
   "Los músculos tenares controlan gran parte de su función."
  ],
  "lesiones": [
   "Artrosis de la base del pulgar o rizartrosis.",
   "Inestabilidad sintomática después de lesión."
  ],
  "fisio": [
   "Valorar oposición, pinza y dolor en actividades cotidianas.",
   "Ajustar cargas y evitar compresión repetida dolorosa como forma de prueba.",
   "Derivar ante deformidad traumática o pérdida importante de la función de pinza."
  ],
  "fuentes": [
   "Kenhub: Trapeziometacarpal joint — https://www.kenhub.com/en/library/anatomy/trapeziometacarpal-joint",
   "AAOS OrthoInfo: Arthritis of the Thumb — https://www.orthoinfo.org/diseases--conditions/arthritis-of-the-thumb/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulaciones-metacarpofalangicas-interfalangicas-mano",
  "nombre": "Articulaciones metacarpofalángicas e interfalángicas de la mano",
  "tipo": "articulacion",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Uniones sinoviales de los dedos que permiten acomodar la mano al agarre y a los movimientos finos.",
  "referencias": [
   "Las metacarpofalángicas unen metacarpianos y falanges proximales.",
   "Las interfalángicas funcionan principalmente como bisagras."
  ],
  "relaciones": [
   "Ligamentos colaterales y placas palmares aportan estabilidad.",
   "Tendones flexores y aparato extensor controlan el movimiento."
  ],
  "lesiones": [
   "Esguinces y luxaciones de los dedos.",
   "Artrosis o rigidez después de inmovilización."
  ],
  "fisio": [
   "Revisar movimiento activo y pasivo, alineación y cierre de la mano.",
   "No forzar articulaciones con sospecha de fractura o lesión tendinosa.",
   "Derivar ante dedo deformado, incapacidad súbita para flexionar o extender o compromiso circulatorio."
  ],
  "fuentes": [
   "Kenhub: Metacarpophalangeal joints — https://www.kenhub.com/en/library/anatomy/metacarpophalangeal-mcp-joints",
   "Kenhub: Interphalangeal joints of the hand — https://www.kenhub.com/en/library/anatomy/interphalangeal-joints-of-the-hand"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "articulacion-coxofemoral",
  "nombre": "Articulación coxofemoral (cadera)",
  "tipo": "articulacion",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Articulación esférica entre cabeza femoral y acetábulo que combina movilidad con soporte del peso corporal.",
  "referencias": [
   "El labrum rodea y profundiza el acetábulo.",
   "La cápsula y ligamentos se organizan alrededor del cuello femoral."
  ],
  "relaciones": [
   "La musculatura periarticular controla carga y movimiento.",
   "Se relaciona con la pelvis y la columna durante la marcha."
  ],
  "lesiones": [
   "Artrosis de cadera.",
   "Lesiones del labrum o inestabilidad tras luxación."
  ],
  "fisio": [
   "Explorar marcha y movilidad activa y pasiva, atendiendo al dolor inguinal.",
   "Respetar precauciones específicas después de cirugía o luxación.",
   "Derivar urgentemente ante incapacidad para apoyar tras una caída o deformidad de la extremidad."
  ],
  "fuentes": [
   "Kenhub: Hip joint — https://www.kenhub.com/en/library/anatomy/hip-joint",
   "TeachMeAnatomy: The Hip Joint — https://teachmeanatomy.info/lower-limb/joints/hip-joint/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulacion-tibiofemoral",
  "nombre": "Articulación tibiofemoral (rodilla)",
  "tipo": "articulacion",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Unión entre cóndilos femorales y mesetas tibiales que transmite carga y permite flexión, extensión y rotación limitada.",
  "referencias": [
   "Incluye compartimentos medial y lateral.",
   "Los meniscos mejoran el reparto de cargas."
  ],
  "relaciones": [
   "Los ligamentos cruzados y colaterales contribuyen a la estabilidad.",
   "Comparte el complejo de la rodilla con la articulación femororrotuliana."
  ],
  "lesiones": [
   "Artrosis tibiofemoral.",
   "Lesión meniscal o ligamentosa asociada con trauma."
  ],
  "fisio": [
   "Valorar derrame, movilidad y tolerancia a la marcha.",
   "Relacionar la exploración con mecanismo de lesión y función; no basarse en una sola prueba.",
   "Derivar ante rodilla caliente con fiebre, bloqueo importante o incapacidad para apoyar después de trauma."
  ],
  "fuentes": [
   "TeachMeAnatomy: The Knee Joint — https://teachmeanatomy.info/lower-limb/joints/knee-joint/",
   "AAOS OrthoInfo: Arthritis of the Knee — https://www.orthoinfo.org/diseases--conditions/arthritis-of-the-knee/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulacion-femororrotuliana",
  "nombre": "Articulación femororrotuliana",
  "tipo": "articulacion",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Contacto entre rótula y tróclea femoral que facilita la transmisión de fuerza del cuádriceps al extender la rodilla.",
  "referencias": [
   "La rótula se desliza por la tróclea durante flexión y extensión.",
   "El cartílago recubre las superficies de contacto."
  ],
  "relaciones": [
   "Tendones cuadricipital y rotuliano forman el aparato extensor.",
   "Los retináculos ayudan a controlar la posición rotuliana."
  ],
  "lesiones": [
   "Dolor femororrotuliano.",
   "Inestabilidad o luxación rotuliana."
  ],
  "fisio": [
   "Observar dolor al subir escalones, sentarse o agacharse y valorar control de la extremidad.",
   "No equiparar todo dolor anterior con desgaste del cartílago.",
   "Derivar ante luxación reciente, derrame grande o pérdida de extensión activa tras traumatismo."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Patellofemoral Pain Syndrome — https://www.orthoinfo.org/diseases--conditions/patellofemoral-pain-syndrome/",
   "TeachMeAnatomy: The Knee Joint — https://teachmeanatomy.info/lower-limb/joints/knee-joint/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulaciones-tibioperoneas",
  "nombre": "Articulaciones tibioperoneas",
  "tipo": "articulacion",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Uniones proximal y distal entre tibia y fíbula que permiten pequeños ajustes y estabilizan la pierna y el tobillo.",
  "referencias": [
   "La proximal es sinovial entre cabeza fibular y cóndilo tibial lateral.",
   "La distal es una sindesmosis fibrosa."
  ],
  "relaciones": [
   "La membrana interósea conecta las diáfisis.",
   "El nervio fibular común pasa cerca de la cabeza y cuello de la fíbula."
  ],
  "lesiones": [
   "Esguince de la sindesmosis distal.",
   "Luxación o inestabilidad tibioperonea proximal."
  ],
  "fisio": [
   "Explorar dolor proximal y distal tras mecanismos de torsión.",
   "Revisar sensibilidad y dorsiflexión si hay dolor junto a la cabeza fibular.",
   "Derivar ante incapacidad para apoyar, deformidad o pie caído nuevo."
  ],
  "fuentes": [
   "Kenhub: Tibiofibular joints — https://www.kenhub.com/en/library/anatomy/tibiofibular-joints",
   "TeachMeAnatomy: Tibiofibular Joints — https://teachmeanatomy.info/lower-limb/joints/tibiofibular-joints/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulacion-talocrural",
  "nombre": "Articulación del tobillo (talocrural)",
  "tipo": "articulacion",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Articulación de bisagra donde la mortaja de tibia y fíbula recibe al astrágalo para permitir dorsiflexión y flexión plantar.",
  "referencias": [
   "Los maléolos delimitan la mortaja.",
   "El calcáneo pertenece a las uniones del retropié, no a las superficies talocrurales."
  ],
  "relaciones": [
   "La sindesmosis mantiene la relación tibiofibular distal.",
   "Ligamentos mediales y laterales estabilizan el tobillo."
  ],
  "lesiones": [
   "Esguince de tobillo.",
   "Artrosis o rigidez postraumática."
  ],
  "fisio": [
   "Valorar apoyo, marcha y dorsiflexión según tolerancia.",
   "Tras trauma, descartar lesión ósea antes de maniobras intensas o carga.",
   "Derivar ante deformidad, incapacidad para caminar o pie frío o insensible."
  ],
  "fuentes": [
   "Kenhub: Ankle joint — https://www.kenhub.com/en/library/anatomy/the-ankle-joint",
   "TeachMeAnatomy: The Ankle Joint — https://teachmeanatomy.info/lower-limb/joints/ankle-joint/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "articulacion-subastragalina",
  "nombre": "Articulación subastragalina",
  "tipo": "articulacion",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Unión del retropié entre astrágalo y calcáneo que contribuye a la adaptación del pie al terreno.",
  "referencias": [
   "La unión anatómica posterior se encuentra bajo el astrágalo.",
   "Se relaciona con el seno del tarso."
  ],
  "relaciones": [
   "Los ligamentos talocalcáneos estabilizan el conjunto.",
   "Se coordina con la articulación transversa del tarso."
  ],
  "lesiones": [
   "Artrosis subastragalina postraumática.",
   "Síndrome del seno del tarso."
  ],
  "fisio": [
   "Observar alineación del retropié y movilidad de inversión y eversión sin forzar.",
   "Distinguir limitación del retropié de la flexión y extensión talocrural.",
   "Derivar ante dolor intenso persistente después de trauma o incapacidad para apoyar."
  ],
  "fuentes": [
   "Kenhub: Subtalar joint — https://www.kenhub.com/en/library/anatomy/subtalar-joint",
   "AAOS OrthoInfo: Arthritis of the Foot and Ankle — https://www.orthoinfo.org/diseases--conditions/arthritis-of-the-foot-and-ankle/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "articulacion-mediotarsiana-chopart",
  "nombre": "Articulación mediotarsiana (Chopart)",
  "tipo": "articulacion",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Complejo formado por las articulaciones talonavicular y calcaneocuboidea que ayuda a adaptar el mediopié durante la marcha.",
  "referencias": [
   "Se sitúa entre retropié y mediopié.",
   "Ambas uniones colaboran en los movimientos de inversión y eversión."
  ],
  "relaciones": [
   "Se coordina con la subastragalina.",
   "Ligamentos plantares y bifurcado aportan estabilidad."
  ],
  "lesiones": [
   "Esguince o luxación del complejo de Chopart.",
   "Artrosis del mediopié después de traumatismo."
  ],
  "fisio": [
   "Localizar dolor y revisar apoyo y contorno del pie.",
   "No atribuir automáticamente todo dolor tras torsión al ligamento lateral del tobillo.",
   "Derivar ante hinchazón marcada del mediopié o incapacidad para apoyar después de trauma."
  ],
  "fuentes": [
   "Kenhub: Transverse tarsal joint — https://www.kenhub.com/en/library/anatomy/transverse-tarsal-joint",
   "AAOS OrthoInfo: Arthritis of the Foot and Ankle — https://www.orthoinfo.org/diseases--conditions/arthritis-of-the-foot-and-ankle/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "articulacion-tarsometatarsiana-lisfranc",
  "nombre": "Articulación tarsometatarsiana (Lisfranc)",
  "tipo": "articulacion",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Conjunto de uniones entre tarso distal y bases metatarsianas que sostiene el mediopié y transmite fuerzas hacia el antepié.",
  "referencias": [
   "Las bases metatarsianas se articulan con cuneiformes y cuboides.",
   "Su movilidad es limitada y su estabilidad ligamentosa es esencial."
  ],
  "relaciones": [
   "El complejo de Lisfranc enlaza mediopié y antepié.",
   "La segunda base metatarsiana ocupa una posición encajada entre las cuñas."
  ],
  "lesiones": [
   "Lesión ligamentosa de Lisfranc.",
   "Fractura-luxación tarsometatarsiana con riesgo de inestabilidad."
  ],
  "fisio": [
   "Buscar dolor de mediopié e hinchazón después de torsión o aplastamiento.",
   "La equimosis plantar tras trauma aumenta la sospecha y requiere valoración; no indicar que camine para probar si se pasa.",
   "Derivar de forma prioritaria ante sospecha de Lisfranc o incapacidad para apoyar."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Lisfranc (Midfoot) Injury — https://www.orthoinfo.org/diseases--conditions/lisfranc-midfoot-injury/",
   "Kenhub: Joints and ligaments of the foot — https://www.kenhub.com/en/library/anatomy/joints-and-ligaments-of-the-foot"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "articulaciones-metatarsofalangicas-interfalangicas-pie",
  "nombre": "Articulaciones metatarsofalángicas e interfalángicas del pie",
  "tipo": "articulacion",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Uniones de los dedos del pie que permiten acomodación al apoyo y contribuyen al despegue durante la marcha.",
  "referencias": [
   "Las metatarsofalángicas unen cabezas metatarsianas y falanges proximales.",
   "El dedo gordo tiene una interfalángica y los otros dedos dos."
  ],
  "relaciones": [
   "Ligamentos colaterales y placas plantares estabilizan los dedos.",
   "Tendones flexores y extensores controlan sus movimientos."
  ],
  "lesiones": [
   "Artrosis de las articulaciones de los dedos.",
   "Esguinces o luxaciones por traumatismo."
  ],
  "fisio": [
   "Valorar movilidad del dedo gordo, apoyo y síntomas con el calzado.",
   "No forzar una articulación muy inflamada o recién traumatizada.",
   "Derivar ante deformidad traumática, herida con mala sensibilidad o articulación roja y caliente con fiebre."
  ],
  "fuentes": [
   "Kenhub: Metatarsophalangeal joints — https://www.kenhub.com/en/library/anatomy/metatarsophalangeal-mtp-joints",
   "Kenhub: Interphalangeal joints of the foot — https://www.kenhub.com/en/library/anatomy/interphalangeal-joints-of-the-foot",
   "AAOS OrthoInfo: Arthritis of the Foot and Ankle — https://www.orthoinfo.org/diseases--conditions/arthritis-of-the-foot-and-ankle/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "ligamento-cruzado-anterior",
  "nombre": "Ligamento cruzado anterior (LCA)",
  "tipo": "ligamento",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Ligamento intracapsular de la rodilla que frena el desplazamiento anterior de la tibia y contribuye al control rotacional.",
  "referencias": [
   "Conecta el área intercondílea anterior tibial con el cóndilo femoral lateral.",
   "Cruza por delante del ligamento cruzado posterior."
  ],
  "relaciones": [
   "Forma parte de los estabilizadores centrales de la rodilla.",
   "Se relaciona con meniscos y otros ligamentos en lesiones combinadas."
  ],
  "lesiones": [
   "Rotura parcial o completa en giros o aterrizajes.",
   "Inestabilidad persistente después de lesión."
  ],
  "fisio": [
   "Lachman valora traslación anterior y calidad del tope; debe interpretarse junto al mecanismo y otros hallazgos.",
   "Revisar derrame y función, sin pruebas forzadas en una rodilla muy dolorosa.",
   "Derivar ante inestabilidad traumática importante o pérdida de sensibilidad o circulación distal."
  ],
  "fuentes": [
   "Kenhub: Anterior cruciate ligament — https://www.kenhub.com/en/library/anatomy/anterior-cruciate-ligament",
   "AAOS OrthoInfo: Anterior Cruciate Ligament (ACL) Injuries — https://www.orthoinfo.org/diseases--conditions/anterior-cruciate-ligament-acl-injuries/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-cruzado-posterior",
  "nombre": "Ligamento cruzado posterior (LCP)",
  "tipo": "ligamento",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Estabilizador central que limita el desplazamiento posterior de la tibia con respecto al fémur.",
  "referencias": [
   "Va del área intercondílea posterior tibial al cóndilo femoral medial.",
   "Está dentro de la cápsula y fuera de la cavidad sinovial."
  ],
  "relaciones": [
   "Cruza con el LCA.",
   "Participa en el control de la rodilla flexionada durante tareas de carga."
  ],
  "lesiones": [
   "Lesión tras impacto sobre la tibia con rodilla flexionada.",
   "Inestabilidad posterior, aislada o con daño multiligamentoso."
  ],
  "fisio": [
   "El cajón posterior busca aumento de traslación posterior; observar también el hundimiento posterior tibial.",
   "Evaluar otras estructuras tras mecanismos de alta energía.",
   "Derivar urgentemente ante sospecha de luxación, déficit vascular o lesión multiligamentosa."
  ],
  "fuentes": [
   "Kenhub: Posterior cruciate ligament — https://www.kenhub.com/en/library/anatomy/posterior-cruciate-ligament",
   "AAOS OrthoInfo: Posterior Cruciate Ligament Injuries — https://www.orthoinfo.org/diseases--conditions/posterior-cruciate-ligament-injuries/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-colateral-medial-rodilla",
  "nombre": "Ligamento colateral medial de la rodilla",
  "tipo": "ligamento",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Complejo medial de la rodilla que une fémur y tibia y resiste fuerzas excesivas en valgo.",
  "referencias": [
   "Se extiende desde la región epicondílea medial a la tibia medial.",
   "Posee componentes superficiales y profundos."
  ],
  "relaciones": [
   "Su componente profundo se relaciona con cápsula y menisco medial.",
   "Ayuda al control medial junto a músculos y otros ligamentos."
  ],
  "lesiones": [
   "Esguince o rotura por valgo o traumatismo.",
   "Inestabilidad medial después de lesión."
  ],
  "fisio": [
   "La prueba de estrés en valgo explora dolor y laxitud medial, con comparación contralateral.",
   "No insistir en estrés ligamentoso si se sospecha fractura o lesión extensa.",
   "Derivar ante laxitud marcada, lesión combinada o compromiso neurovascular."
  ],
  "fuentes": [
   "Kenhub: Knee joint — https://www.kenhub.com/en/library/anatomy/the-knee-joint",
   "AAOS OrthoInfo: Collateral Ligament Injuries — https://www.orthoinfo.org/diseases--conditions/collateral-ligament-injuries/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-colateral-lateral-rodilla",
  "nombre": "Ligamento colateral lateral de la rodilla",
  "tipo": "ligamento",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Cordón ligamentoso lateral que conecta fémur y fíbula y limita fuerzas excesivas en varo.",
  "referencias": [
   "Se dirige del epicóndilo femoral lateral a la cabeza fibular.",
   "No se fija al menisco lateral."
  ],
  "relaciones": [
   "El tendón poplíteo lo separa del menisco lateral.",
   "Trabaja con el conjunto estabilizador posterolateral."
  ],
  "lesiones": [
   "Esguince o rotura del colateral lateral.",
   "Inestabilidad asociada con lesión posterolateral."
  ],
  "fisio": [
   "El estrés en varo busca dolor o laxitud lateral y se interpreta con el resto de la exploración.",
   "Revisar función del nervio fibular común en lesiones laterales importantes.",
   "Derivar ante pie caído, laxitud importante o alteración circulatoria."
  ],
  "fuentes": [
   "Kenhub: Knee joint — https://www.kenhub.com/en/library/anatomy/the-knee-joint",
   "AAOS OrthoInfo: Collateral Ligament Injuries — https://www.orthoinfo.org/diseases--conditions/collateral-ligament-injuries/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "menisco-medial",
  "nombre": "Menisco medial",
  "tipo": "ligamento",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Fibrocartílago entre fémur y tibia mediales que reparte carga y mejora la congruencia de la rodilla.",
  "referencias": [
   "Tiene forma aproximada de media luna.",
   "Sus cuernos se fijan al área intercondílea tibial."
  ],
  "relaciones": [
   "Se une firmemente a la cápsula y al componente profundo del colateral medial.",
   "Su movilidad es menor que la del menisco lateral."
  ],
  "lesiones": [
   "Rotura traumática del menisco medial.",
   "Rotura degenerativa."
  ],
  "fisio": [
   "Valorar dolor en la interlínea, derrame y episodios de bloqueo.",
   "McMurray busca síntomas compatibles con lesión meniscal; por sí solo no la confirma.",
   "Derivar ante bloqueo que impide extender la rodilla o derrame traumático importante."
  ],
  "fuentes": [
   "Kenhub: Medial meniscus — https://www.kenhub.com/en/library/anatomy/medial-meniscus",
   "AAOS OrthoInfo: Meniscus Tears — https://www.orthoinfo.org/diseases--conditions/meniscus-tears/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "menisco-lateral",
  "nombre": "Menisco lateral",
  "tipo": "ligamento",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Fibrocartílago del compartimento lateral que participa en la distribución de cargas y la estabilidad de la rodilla.",
  "referencias": [
   "Es de contorno más cerrado que el menisco medial.",
   "Se sitúa entre cóndilo femoral lateral y meseta tibial lateral."
  ],
  "relaciones": [
   "Los cuernos se anclan a la tibia.",
   "El paso del poplíteo interrumpe parte de su unión periférica."
  ],
  "lesiones": [
   "Rotura traumática del menisco lateral.",
   "Rotura degenerativa o lesión asociada con rotura del LCA."
  ],
  "fisio": [
   "Relacionar dolor lateral con mecanismo, derrame y función.",
   "Las pruebas meniscales se usan como parte de una evaluación, evitando giros intensos en fase aguda.",
   "Derivar ante bloqueo, incapacidad para apoyar o inflamación traumática importante."
  ],
  "fuentes": [
   "Kenhub: Lateral meniscus — https://www.kenhub.com/en/library/anatomy/lateral-meniscus",
   "AAOS OrthoInfo: Meniscus Tears — https://www.orthoinfo.org/diseases--conditions/meniscus-tears/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "tendon-rotuliano-retinaculos",
  "nombre": "Tendón rotuliano y retináculos de la rótula",
  "tipo": "ligamento",
  "zona": "knee",
  "nombres": [],
  "descripcion": "El tendón o ligamento rotuliano transmite la fuerza extensora desde la rótula a la tibia; los retináculos ayudan a estabilizar la rótula.",
  "referencias": [
   "El rotuliano se extiende del polo inferior rotuliano a la tuberosidad tibial.",
   "Los retináculos se disponen a ambos lados de la rótula."
  ],
  "relaciones": [
   "Se integra con cuádriceps, tendón cuadricipital y rótula en el aparato extensor.",
   "Los retináculos aportan expansiones fibrosas hacia la tibia y tejidos vecinos."
  ],
  "lesiones": [
   "Rotura parcial o completa del tendón rotuliano.",
   "Alteración retinacular asociada con inestabilidad rotuliana."
  ],
  "fisio": [
   "Explorar extensión activa y elevación de la pierna recta, según tolerancia.",
   "No indicar carga o estiramientos intensos si se sospecha interrupción del aparato extensor.",
   "Derivar de forma prioritaria ante incapacidad para extender activamente después de trauma."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Patellar Tendon Tear — https://www.orthoinfo.org/diseases--conditions/patellar-tendon-tear/",
   "AAOS OrthoInfo: Patellofemoral Pain Syndrome — https://www.orthoinfo.org/diseases--conditions/patellofemoral-pain-syndrome/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "banda-iliotibial",
  "nombre": "Banda iliotibial",
  "tipo": "ligamento",
  "zona": "thigh",
  "nombres": [],
  "descripcion": "Engrosamiento de la fascia lata en el muslo lateral que transmite fuerzas musculares y contribuye al control de cadera y rodilla.",
  "referencias": [
   "Desciende desde la región ilíaca al tubérculo de Gerdy en la tibia.",
   "Pasa superficial al cóndilo femoral lateral."
  ],
  "relaciones": [
   "Recibe inserciones del tensor de la fascia lata y glúteo mayor.",
   "Se continúa con la fascia profunda del muslo."
  ],
  "lesiones": [
   "Síndrome de la banda iliotibial con dolor lateral de rodilla.",
   "Dolor lateral de cadera relacionado con roce o resalte de la banda."
  ],
  "fisio": [
   "Revisar cambios de carga y observar marcha, carrera y control de cadera según la actividad.",
   "Evitar presiones agresivas sobre la zona dolorosa y no asumir que todo dolor lateral proviene de la banda.",
   "Derivar ante dolor persistente atípico, bloqueo o inflamación importante."
  ],
  "fuentes": [
   "Kenhub: Iliotibial tract — https://www.kenhub.com/en/library/anatomy/iliotibial-band",
   "AAOS OrthoInfo: Iliotibial Band (IT Band) Syndrome — https://www.orthoinfo.org/diseases--conditions/iliotibial-band-it-band-syndrome/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-talofibular-anterior",
  "nombre": "Ligamento talofibular anterior",
  "tipo": "ligamento",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Ligamento lateral del tobillo entre fíbula y astrágalo; ayuda a controlar la inversión y el desplazamiento del astrágalo.",
  "referencias": [
   "Se dirige desde el margen anterior del maléolo lateral al cuello astragalino.",
   "Se encuentra por delante del ligamento calcaneofibular."
  ],
  "relaciones": [
   "Forma parte del complejo ligamentoso lateral.",
   "Es vulnerable durante la inversión con flexión plantar."
  ],
  "lesiones": [
   "Esguince o rotura talofibular anterior.",
   "Inestabilidad lateral crónica después de esguinces."
  ],
  "fisio": [
   "El cajón anterior del tobillo explora laxitud anterior, tras descartar lesión ósea y según tolerancia.",
   "Valorar apoyo, edema y estabilidad funcional sin repetir maniobras dolorosas.",
   "Derivar ante deformidad, dolor óseo focal o incapacidad para caminar tras trauma."
  ],
  "fuentes": [
   "Kenhub: Anterior talofibular ligament — https://www.kenhub.com/en/library/anatomy/anterior-talofibular-ligament",
   "AAOS OrthoInfo: Sprained Ankle — https://www.orthoinfo.org/diseases--conditions/sprained-ankle/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-calcaneofibular",
  "nombre": "Ligamento calcaneofibular",
  "tipo": "ligamento",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Ligamento del complejo lateral que une fíbula y calcáneo y ayuda a estabilizar tobillo y retropié.",
  "referencias": [
   "Desciende desde el maléolo lateral hacia el calcáneo lateral.",
   "Pasa profundo a los tendones fibulares."
  ],
  "relaciones": [
   "Trabaja junto a los ligamentos talofibulares.",
   "Cruza el entorno talocrural y subastragalino."
  ],
  "lesiones": [
   "Esguince o rotura en lesiones por inversión.",
   "Inestabilidad lateral asociada con daño de otros ligamentos."
  ],
  "fisio": [
   "Relacionar dolor bajo el maléolo con apoyo y estabilidad; la inclinación astragalina puede explorar laxitud lateral en manos capacitadas.",
   "Evitar estrés forzado durante una lesión aguda dolorosa.",
   "Derivar ante sospecha de fractura, inestabilidad marcada o alteración neurovascular."
  ],
  "fuentes": [
   "Kenhub: Calcaneofibular ligament — https://www.kenhub.com/en/library/anatomy/calcaneofibular-ligament",
   "AAOS OrthoInfo: Sprained Ankle — https://www.orthoinfo.org/diseases--conditions/sprained-ankle/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-deltoideo-tobillo",
  "nombre": "Ligamento deltoideo del tobillo",
  "tipo": "ligamento",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Complejo medial del tobillo que une la tibia con huesos del retropié y mediopié y limita la eversión excesiva.",
  "referencias": [
   "Sus fascículos parten del maléolo medial.",
   "Se distribuyen hacia astrágalo, calcáneo y navicular."
  ],
  "relaciones": [
   "Tiene componentes superficiales y profundos.",
   "Contribuye a sostener la estabilidad medial junto a otros ligamentos y tendones."
  ],
  "lesiones": [
   "Esguince medial por eversión.",
   "Insuficiencia medial asociada con deformidad progresiva del pie."
  ],
  "fisio": [
   "Explorar dolor medial y estabilidad, buscando lesión ósea o de la sindesmosis si el mecanismo fue importante.",
   "No forzar eversión en fase aguda.",
   "Derivar ante incapacidad para apoyar, deformidad o deterioro progresivo de la alineación."
  ],
  "fuentes": [
   "TeachMeAnatomy: The Ankle Joint — https://teachmeanatomy.info/lower-limb/joints/ankle-joint/",
   "AAOS OrthoInfo: Sprained Ankle — https://www.orthoinfo.org/diseases--conditions/sprained-ankle/",
   "AAOS OrthoInfo: Progressive Collapsing Foot Deformity (Flatfoot) — https://www.orthoinfo.org/diseases--conditions/posterior-tibial-tendon-dysfunction"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "sindesmosis-tibioperonea-ligamentos",
  "nombre": "Sindesmosis tibioperonea y ligamentos asociados",
  "tipo": "ligamento",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Unión fibrosa tibiofibular distal cuyo conjunto ligamentoso conserva la mortaja del tobillo.",
  "referencias": [
   "Se localiza entre tibia distal y fíbula.",
   "Incluye ligamentos tibiofibulares anterior, posterior e interóseo."
  ],
  "relaciones": [
   "La membrana interósea se continúa proximalmente.",
   "La estabilidad de la mortaja condiciona la relación con el astrágalo."
  ],
  "lesiones": [
   "Esguince alto de tobillo.",
   "Diástasis o inestabilidad tibiofibular distal."
  ],
  "fisio": [
   "Preguntar por giro externo y dolor por encima del tobillo; las pruebas de compresión o rotación externa solo aportan sospecha clínica.",
   "Evitar carga o manipulación forzada si se sospecha inestabilidad.",
   "Derivar de forma prioritaria ante dolor sindesmótico con incapacidad para apoyar o sospecha de fractura."
  ],
  "fuentes": [
   "Kenhub: Tibiofibular joints — https://www.kenhub.com/en/library/anatomy/tibiofibular-joints",
   "TeachMeAnatomy: Tibiofibular Joints — https://teachmeanatomy.info/lower-limb/joints/tibiofibular-joints/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "tendon-aquiles",
  "nombre": "Tendón de Aquiles",
  "tipo": "ligamento",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Tendón que une principalmente gastrocnemio y sóleo al calcáneo y transmite fuerza para ponerse de puntas y propulsarse.",
  "referencias": [
   "Desciende por la cara posterior de la pierna.",
   "Se inserta en la región posterior del calcáneo."
  ],
  "relaciones": [
   "El nervio sural pasa cerca de su borde lateral.",
   "Puede relacionarse de manera variable con el tendón plantar."
  ],
  "lesiones": [
   "Tendinopatía aquílea insercional o de porción media.",
   "Rotura parcial o completa."
  ],
  "fisio": [
   "Valorar dolor de carga y capacidad de elevación del talón cuando no se sospecha rotura.",
   "La prueba de Thompson explora la respuesta de flexión plantar al comprimir la pantorrilla; no usarla como ejercicio.",
   "Derivar pronto ante chasquido súbito y pérdida de impulso o sospecha de rotura."
  ],
  "fuentes": [
   "Kenhub: Achilles tendon — https://www.kenhub.com/en/library/anatomy/achilles-tendon",
   "AAOS OrthoInfo: Achilles Tendinitis — https://www.orthoinfo.org/diseases--conditions/achilles-tendinitis/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "aponeurosis-plantar",
  "nombre": "Aponeurosis (fascia) plantar",
  "tipo": "ligamento",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Lámina de tejido conectivo plantar que ayuda a mantener el arco y a transmitir fuerzas durante el apoyo y despegue.",
  "referencias": [
   "Se extiende desde el calcáneo hacia el antepié.",
   "Se sitúa bajo la piel de la planta y superficial a músculos plantares."
  ],
  "relaciones": [
   "Colabora con ligamentos y tendones que sostienen los arcos.",
   "La extensión de los dedos modifica su tensión durante la marcha."
  ],
  "lesiones": [
   "Fasciopatía plantar con dolor de talón.",
   "Desgarro de la aponeurosis plantar."
  ],
  "fisio": [
   "Preguntar por dolor en los primeros pasos y explorar apoyo y movilidad del tobillo.",
   "Diferenciar dolor mecánico de parestesias y evitar estiramiento agresivo tras un desgarro.",
   "Derivar ante dolor súbito con hematoma, incapacidad para apoyar o pérdida de sensibilidad."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Plantar Fasciitis and Bone Spurs — https://www.orthoinfo.org/diseases--conditions/plantar-fasciitis-and-bone-spurs/",
   "TeachMeAnatomy: The Arches of the Foot — https://teachmeanatomy.info/lower-limb/misc/foot-arches/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-calcaneonavicular-plantar",
  "nombre": "Ligamento calcaneonavicular plantar (ligamento muelle)",
  "tipo": "ligamento",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Complejo ligamentoso plantar medial, llamado muelle, que sostiene la cabeza del astrágalo y contribuye al arco longitudinal medial.",
  "referencias": [
   "Conecta la región del sustentáculo del astrágalo del calcáneo con el navicular.",
   "Queda bajo la cabeza astragalina."
  ],
  "relaciones": [
   "Trabaja con el tendón tibial posterior.",
   "Su insuficiencia puede acompañar el colapso progresivo del arco."
  ],
  "lesiones": [
   "Lesión o insuficiencia del ligamento muelle.",
   "Participación en la deformidad progresiva del pie en colapso."
  ],
  "fisio": [
   "Observar arco y retropié en apoyo, además de la función del tibial posterior.",
   "No atribuir todo pie plano a una rotura del ligamento muelle.",
   "Derivar ante cambio progresivo doloroso de la forma del pie o pérdida importante de apoyo."
  ],
  "fuentes": [
   "Kenhub: Transverse tarsal joint — https://www.kenhub.com/en/library/anatomy/transverse-tarsal-joint",
   "AAOS OrthoInfo: Progressive Collapsing Foot Deformity (Flatfoot) — https://www.orthoinfo.org/diseases--conditions/posterior-tibial-tendon-dysfunction"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-plantar-largo",
  "nombre": "Ligamento plantar largo",
  "tipo": "ligamento",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Ligamento de la planta que conecta calcáneo, cuboides y bases metatarsianas y contribuye al sostén del arco lateral.",
  "referencias": [
   "Se dispone en la cara plantar del calcáneo y cuboides.",
   "Sus fibras superficiales alcanzan bases metatarsianas."
  ],
  "relaciones": [
   "Ayuda a formar el techo del canal del tendón fibular largo en el cuboides.",
   "Se relaciona con el ligamento plantar corto."
  ],
  "lesiones": [],
  "fisio": [
   "Explorar apoyo, dolor plantar lateral y movilidad del mediopié de manera gradual.",
   "No identificar una lesión aislada mediante dolor a la palpación solamente.",
   "Derivar ante trauma con dolor intenso de mediopié, equimosis plantar o incapacidad para apoyar."
  ],
  "fuentes": [
   "Kenhub: Transverse tarsal joint — https://www.kenhub.com/en/library/anatomy/transverse-tarsal-joint",
   "TeachMeAnatomy: The Arches of the Foot — https://teachmeanatomy.info/lower-limb/misc/foot-arches/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "ligamento-arco-coracoacromial",
  "nombre": "Ligamento coracoacromial y arco coracoacromial",
  "tipo": "ligamento",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Ligamento que une coracoides y acromion y completa un arco sobre la cabeza humeral.",
  "referencias": [
   "Su trayecto está por encima de la cabeza del húmero.",
   "El arco delimita el techo del espacio subacromial."
  ],
  "relaciones": [
   "Se relaciona con la bursa subacromial y los tendones del manguito.",
   "Contribuye a limitar el ascenso excesivo de la cabeza humeral."
  ],
  "lesiones": [
   "Dolor subacromial relacionado con tendones o bursa vecinos.",
   "Alteraciones del arco en cuadros de compromiso del manguito rotador."
  ],
  "fisio": [
   "Valorar dolor durante la elevación y fuerza del manguito.",
   "No asumir que el ligamento es la causa única del dolor por una prueba de pinzamiento positiva.",
   "Derivar ante pérdida súbita de fuerza tras trauma o imposibilidad para elevar el brazo."
  ],
  "fuentes": [
   "TeachMeAnatomy: The Shoulder Joint — https://teachmeanatomy.info/upper-limb/joints/shoulder/",
   "Kenhub: Joints and ligaments of the upper limb — https://www.kenhub.com/en/library/anatomy/ligaments-of-the-upper-limb",
   "AAOS OrthoInfo: Shoulder Impingement/Rotator Cuff Tendinitis — https://www.orthoinfo.org/diseases--conditions/shoulder-impingementrotator-cuff-tendinitis/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamentos-coracoclaviculares",
  "nombre": "Ligamentos coracoclaviculares",
  "tipo": "ligamento",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Ligamentos conoide y trapezoide que unen coracoides y clavícula y sostienen la relación de la cintura escapular.",
  "referencias": [
   "Se ubican entre la base coracoidea y la cara inferior de la clavícula.",
   "El conoide es más medial y el trapezoide más lateral."
  ],
  "relaciones": [
   "Complementan la estabilidad acromioclavicular.",
   "Limitan la separación excesiva entre escápula y clavícula."
  ],
  "lesiones": [
   "Esguince o rotura en separaciones acromioclaviculares.",
   "Inestabilidad residual después de lesión."
  ],
  "fisio": [
   "Valorar dolor y deformidad tras caída sobre el hombro.",
   "No reducir manualmente la prominencia ni iniciar carga intensa en una lesión reciente.",
   "Derivar ante deformidad traumática importante o síntomas neurológicos o vasculares."
  ],
  "fuentes": [
   "Kenhub: Acromioclavicular joint — https://www.kenhub.com/en/library/anatomy/acromioclavicular-ac-joint",
   "AAOS OrthoInfo: Shoulder Separation — https://www.orthoinfo.org/diseases--conditions/shoulder-separation/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamentos-glenohumerales-capsula",
  "nombre": "Ligamentos glenohumerales y cápsula del hombro",
  "tipo": "ligamento",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Engrosamientos de la cápsula del hombro que aportan estabilidad pasiva entre glenoides y húmero.",
  "referencias": [
   "Se describen componentes superior, medio e inferior.",
   "Su tensión cambia con la posición del brazo."
  ],
  "relaciones": [
   "Se integran con cápsula y labrum.",
   "Complementan la estabilidad dinámica del manguito rotador."
  ],
  "lesiones": [
   "Distensión o rotura capsuloligamentosa tras luxación.",
   "Inestabilidad glenohumeral recurrente."
  ],
  "fisio": [
   "Preguntar por episodios de salida y sensación de inseguridad al mover el brazo.",
   "Las pruebas de inestabilidad requieren criterio clínico; evitar provocarlas tras luxación reciente.",
   "Derivar ante nueva luxación, deformidad o déficit sensitivo o vascular."
  ],
  "fuentes": [
   "Kenhub: Glenohumeral joint — https://www.kenhub.com/en/library/anatomy/the-shoulder-joint",
   "TeachMeAnatomy: The Shoulder Joint — https://teachmeanatomy.info/upper-limb/joints/shoulder/",
   "AAOS OrthoInfo: Chronic Shoulder Instability — https://www.orthoinfo.org/diseases--conditions/chronic-shoulder-instability/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "rodete-glenoideo",
  "nombre": "Rodete (labrum) glenoideo",
  "tipo": "ligamento",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Reborde de tejido fibroso y fibrocartilaginoso alrededor de la glenoides que profundiza la cavidad y ayuda a estabilizar el hombro.",
  "referencias": [
   "Rodea el borde glenoideo.",
   "Su región superior se relaciona con el anclaje del bíceps largo."
  ],
  "relaciones": [
   "Da inserción a componentes capsuloligamentosos.",
   "Trabaja junto a cápsula y manguito para mantener centrada la cabeza humeral."
  ],
  "lesiones": [
   "Lesión SLAP del labrum superior.",
   "Lesión de Bankart relacionada con luxación anterior."
  ],
  "fisio": [
   "Relacionar dolor profundo, chasquidos e inestabilidad con historia y función.",
   "Ninguna prueba aislada permite atribuir todo dolor de hombro al labrum.",
   "Derivar ante luxación, bloqueo persistente o pérdida importante de función después de trauma."
  ],
  "fuentes": [
   "AAOS OrthoInfo: SLAP Tears — https://www.orthoinfo.org/diseases--conditions/slap-tears/",
   "AAOS OrthoInfo: Chronic Shoulder Instability — https://www.orthoinfo.org/diseases--conditions/chronic-shoulder-instability/",
   "Kenhub: Glenohumeral joint — https://www.kenhub.com/en/library/anatomy/the-shoulder-joint"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "tendon-cabeza-larga-biceps",
  "nombre": "Tendón de la cabeza larga del bíceps",
  "tipo": "ligamento",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Tendón proximal del bíceps que se ancla en la región superior de la glenoides y recorre el surco intertubercular del húmero.",
  "referencias": [
   "Su trayecto proximal se relaciona con la articulación glenohumeral.",
   "Se dirige hacia el brazo por el surco bicipital."
  ],
  "relaciones": [
   "Se conecta con la región del labrum superior.",
   "Se relaciona con estructuras del manguito rotador."
  ],
  "lesiones": [
   "Tendinopatía de la cabeza larga del bíceps.",
   "Rotura o alteración de la estabilidad del tendón."
  ],
  "fisio": [
   "Explorar dolor anterior y función del hombro y codo.",
   "Las pruebas resistidas para bíceps orientan, pero no distinguen por sí solas entre tendón, labrum y manguito.",
   "Derivar ante deformidad súbita del bíceps, pérdida de fuerza o lesión traumática importante."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Biceps Tendinitis — https://www.orthoinfo.org/diseases--conditions/biceps-tendinitis/",
   "AAOS OrthoInfo: SLAP Tears — https://www.orthoinfo.org/diseases--conditions/slap-tears/",
   "TeachMeAnatomy: The Shoulder Joint — https://teachmeanatomy.info/upper-limb/joints/shoulder/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "ligamento-colateral-radial-codo",
  "nombre": "Ligamento colateral radial del codo",
  "tipo": "ligamento",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Componente del complejo lateral del codo que conecta el epicóndilo lateral con el ligamento anular y contribuye a la estabilidad.",
  "referencias": [
   "Parte del epicóndilo humeral lateral.",
   "Sus fibras se mezclan con el ligamento anular alrededor de la cabeza radial."
  ],
  "relaciones": [
   "Actúa junto a otros componentes del complejo colateral lateral.",
   "No debe confundirse con el ligamento colateral cubital lateral."
  ],
  "lesiones": [
   "Lesión del complejo lateral tras luxación o traumatismo.",
   "Inestabilidad lateral o posterolateral cuando hay daño del complejo asociado."
  ],
  "fisio": [
   "Preguntar por sensación de salida al apoyarse y explorar movilidad y estabilidad con prudencia.",
   "No atribuir toda inestabilidad posterolateral al componente radial aislado.",
   "Derivar ante luxaciones recurrentes, bloqueo o déficit neurovascular tras trauma."
  ],
  "fuentes": [
   "TeachMeAnatomy: The Elbow Joint — https://teachmeanatomy.info/upper-limb/joints/elbow-joint/",
   "Kenhub: Elbow joint — https://www.kenhub.com/en/library/anatomy/elbow-joint",
   "AAOS OrthoInfo: Recurrent and Chronic Elbow Instability — https://www.orthoinfo.org/diseases--conditions/recurrent-and-chronic-elbow-instability"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-colateral-cubital-codo",
  "nombre": "Ligamento colateral cubital del codo",
  "tipo": "ligamento",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Complejo medial que une húmero y cúbito y resiste fuerzas en valgo, especialmente durante lanzamientos.",
  "referencias": [
   "Se relaciona con el epicóndilo medial, coronoides y olécranon.",
   "Se describen bandas anterior, posterior y transversa."
  ],
  "relaciones": [
   "La banda anterior es importante para la estabilidad en valgo.",
   "El nervio cubital pasa cerca y puede presentar síntomas asociados."
  ],
  "lesiones": [
   "Lesión por sobrecarga repetitiva de lanzamiento.",
   "Rotura aguda e inestabilidad medial."
  ],
  "fisio": [
   "Valorar dolor durante lanzamiento, rango de movimiento y síntomas cubitales.",
   "El estrés dinámico en valgo busca dolor o inestabilidad del complejo medial y requiere experiencia clínica.",
   "Derivar ante inestabilidad, chasquido traumático con pérdida funcional o parestesias progresivas."
  ],
  "fuentes": [
   "TeachMeAnatomy: The Elbow Joint — https://teachmeanatomy.info/upper-limb/joints/elbow-joint/",
   "AAOS OrthoInfo: Ulnar Collateral Ligament (UCL) Injury — https://www.orthoinfo.org/diseases--conditions/ulnar-collateral-ligament-ucl-injury/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "retinaculo-flexor-tunel-carpiano",
  "nombre": "Retináculo flexor (túnel carpiano)",
  "tipo": "ligamento",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Banda fibrosa palmar que cierra el arco del carpo y forma el techo del túnel carpiano.",
  "referencias": [
   "Se fija en la región de escafoides y trapecio radialmente.",
   "Se fija en pisiforme y gancho del ganchoso hacia el lado cubital."
  ],
  "relaciones": [
   "Por debajo pasan el nervio mediano y nueve tendones flexores digitales.",
   "El nervio cubital recorre otro paso y no es contenido del túnel carpiano."
  ],
  "lesiones": [
   "Síndrome del túnel carpiano por compresión del mediano.",
   "Déficit sensitivo o motor por compresión mantenida."
  ],
  "fisio": [
   "Phalen y Tinel pueden reproducir síntomas del mediano y se interpretan junto con sensibilidad y función tenar.",
   "Evitar estiramientos neurales que mantengan hormigueo o dolor.",
   "Derivar ante atrofia tenar, pérdida de fuerza o insensibilidad persistente."
  ],
  "fuentes": [
   "TeachMeAnatomy: The Carpal Tunnel — https://teachmeanatomy.info/upper-limb/areas/carpal-tunnel/",
   "AAOS OrthoInfo: Carpal Tunnel Syndrome — https://www.orthoinfo.org/diseases--conditions/carpal-tunnel-syndrome/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-escafolunar",
  "nombre": "Ligamento escafolunar",
  "tipo": "ligamento",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Ligamento intrínseco que enlaza escafoides y semilunar y coordina su movimiento en la fila proximal del carpo.",
  "referencias": [
   "Tiene componentes dorsal, palmar y membranoso.",
   "El dorsal aporta una parte importante de su estabilidad."
  ],
  "relaciones": [
   "Trabaja con estabilizadores secundarios del carpo.",
   "Su lesión puede alterar la relación entre escafoides y semilunar."
  ],
  "lesiones": [
   "Rotura escafolunar traumática.",
   "Inestabilidad disociativa y cambios degenerativos secundarios."
  ],
  "fisio": [
   "Relacionar dolor dorsal y pérdida de fuerza con antecedentes de caída.",
   "La evaluación específica de inestabilidad no debe hacerse con maniobras fuertes sobre una muñeca aguda.",
   "Derivar ante dolor persistente después de trauma, bloqueo o sospecha de inestabilidad."
  ],
  "fuentes": [
   "Kenhub: Joints and ligaments of the upper limb — https://www.kenhub.com/en/library/anatomy/ligaments-of-the-upper-limb",
   "StatPearls / NCBI Bookshelf: Carpal Ligament Instability — https://www.ncbi.nlm.nih.gov/books/NBK557729/?report=reader"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "complejo-fibrocartilago-triangular",
  "nombre": "Complejo del fibrocartílago triangular (TFCC)",
  "tipo": "ligamento",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Complejo fibrocartilaginoso y ligamentoso cubital de muñeca que transmite carga y estabiliza la radiocubital distal.",
  "referencias": [
   "Se sitúa entre radio distal, cúbito y carpo cubital.",
   "Incluye un disco articular y componentes ligamentosos periféricos."
  ],
  "relaciones": [
   "Incorpora ligamentos radiocubitales y elementos asociados a la vaina del extensor cubital del carpo.",
   "Se relaciona con la estabilidad durante pronosupinación."
  ],
  "lesiones": [
   "Lesión traumática del TFCC.",
   "Degeneración del complejo con dolor cubital de muñeca."
  ],
  "fisio": [
   "Explorar dolor al girar o cargar, movilidad del antebrazo y estabilidad distal.",
   "No atribuir todos los chasquidos cubitales al TFCC ni forzar carga en una lesión reciente.",
   "Derivar ante inestabilidad, bloqueo o dolor traumático persistente."
  ],
  "fuentes": [
   "StatPearls / NCBI Bookshelf: Anatomy, Shoulder and Upper Limb, Forearm Triangular Fibrocartilage Complex — https://www.ncbi.nlm.nih.gov/sites/books/NBK554564/",
   "Kenhub: Fibrocartilage — https://www.kenhub.com/en/library/anatomy/fibrocartilage"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "poleas-tendones-flexores-dedos",
  "nombre": "Poleas de los tendones flexores de los dedos",
  "tipo": "ligamento",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Engrosamientos de las vainas fibrosas digitales que mantienen los tendones flexores cerca de las falanges y favorecen una flexión eficaz.",
  "referencias": [
   "En dedos largos se describen poleas anulares A1 a A5 y cruciformes C1 a C3.",
   "Las A2 y A4 se fijan sobre falanges proximal y media."
  ],
  "relaciones": [
   "Guían los tendones flexor superficial y profundo.",
   "El pulgar tiene una organización de poleas diferente."
  ],
  "lesiones": [
   "Lesión de poleas por cargas altas, como en escalada.",
   "Dedo en gatillo relacionado con deslizamiento alterado en A1."
  ],
  "fisio": [
   "Valorar dolor localizado, deslizamiento y bloqueo sin forzar el dedo.",
   "Respetar indicaciones de protección después de reparación tendinosa; no proponer un protocolo universal.",
   "Derivar ante incapacidad súbita para flexionar, deformidad tendinosa o bloqueo persistente."
  ],
  "fuentes": [
   "StatPearls / NCBI Bookshelf: Flexor Tendon Lacerations — https://www.ncbi.nlm.nih.gov/books/NBK493223/",
   "Journal of Clinical Orthopaedics and Trauma / PMC: Flexor tendon injuries — https://pmc.ncbi.nlm.nih.gov/articles/PMC6739511/",
   "AAOS OrthoInfo: Trigger Finger — https://www.orthoinfo.org/diseases--conditions/trigger-finger/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-colateral-cubital-pulgar",
  "nombre": "Ligamento colateral cubital del pulgar",
  "tipo": "ligamento",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Ligamento de la cara cubital metacarpofalángica del pulgar que ayuda a estabilizar la pinza.",
  "referencias": [
   "Une la cabeza del primer metacarpiano con la base de la falange proximal.",
   "Se ubica en el lado del pulgar orientado hacia el índice."
  ],
  "relaciones": [
   "Trabaja con cápsula y placa palmar.",
   "Su integridad es importante para sujetar objetos con fuerza."
  ],
  "lesiones": [
   "Esguince o rotura del pulgar del esquiador.",
   "Lesión crónica por esfuerzos repetidos o inestabilidad residual."
  ],
  "fisio": [
   "Valorar dolor, inflamación y función de pinza después del mecanismo de apertura forzada.",
   "No forzar pruebas de laxitud antes de descartar fractura o lesión completa.",
   "Derivar pronto ante inestabilidad, bulto doloroso o pérdida de pinza después de trauma."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Sprained Thumb — https://www.orthoinfo.org/diseases--conditions/sprained-thumb/",
   "Kenhub: Metacarpophalangeal joints — https://www.kenhub.com/en/library/anatomy/metacarpophalangeal-mcp-joints"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-iliofemoral",
  "nombre": "Ligamento iliofemoral",
  "tipo": "ligamento",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Refuerzo capsular anterior de la cadera con forma de Y que limita la hiperextensión.",
  "referencias": [
   "Se fija cerca de la espina ilíaca anteroinferior y borde acetabular.",
   "Sus fascículos terminan en la línea intertrocantérica."
  ],
  "relaciones": [
   "Se integra en la cápsula coxofemoral.",
   "Se tensa con extensión y contribuye a la estabilidad al estar de pie."
  ],
  "lesiones": [],
  "fisio": [
   "Explorar extensión y función de cadera sin forzar el tope articular.",
   "La limitación de extensión no permite identificar por sí sola una lesión del iliofemoral.",
   "Derivar ante trauma con dolor intenso, incapacidad para apoyar o sospecha de luxación."
  ],
  "fuentes": [
   "Kenhub: Iliofemoral ligament — https://www.kenhub.com/en/library/anatomy/iliofemoral-ligament",
   "TeachMeAnatomy: The Hip Joint — https://teachmeanatomy.info/lower-limb/joints/hip-joint/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamentos-isquiofemoral-pubofemoral",
  "nombre": "Ligamentos isquiofemoral y pubofemoral",
  "tipo": "ligamento",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Refuerzos de la cápsula de la cadera que ayudan a limitar movimientos excesivos y mantener la cabeza femoral estable.",
  "referencias": [
   "El pubofemoral refuerza la cápsula anteroinferior desde el pubis.",
   "El isquiofemoral se dispone posteriormente desde el borde acetabular isquiático."
  ],
  "relaciones": [
   "Se continúan con la cápsula y con otros refuerzos capsulares.",
   "El pubofemoral limita especialmente abducción excesiva y el isquiofemoral contribuye al control de rotación interna y extensión."
  ],
  "lesiones": [],
  "fisio": [
   "Valorar movilidad global y sensación de inestabilidad de cadera.",
   "No asignar dolor profundo a un ligamento concreto solo por palpación o una dirección dolorosa.",
   "Derivar ante luxación sospechada, traumatismo importante o incapacidad para apoyar."
  ],
  "fuentes": [
   "Kenhub: Hip joint — https://www.kenhub.com/en/library/anatomy/hip-joint",
   "TeachMeAnatomy: The Hip Joint — https://teachmeanatomy.info/lower-limb/joints/hip-joint/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-redondo-labrum-acetabular",
  "nombre": "Ligamento redondo y rodete (labrum) acetabular",
  "tipo": "ligamento",
  "zona": "hip",
  "nombres": [],
  "descripcion": "El ligamento de la cabeza femoral y el labrum son estructuras distintas: el primero une fémur y acetábulo y el segundo bordea la cavidad.",
  "referencias": [
   "El ligamento redondo llega a la fóvea de la cabeza femoral.",
   "El labrum rodea el borde acetabular y profundiza la cavidad."
  ],
  "relaciones": [
   "El ligamento se relaciona con una pequeña rama vascular para la cabeza femoral.",
   "El labrum contribuye al sellado y estabilidad de la articulación."
  ],
  "lesiones": [
   "Lesión del labrum acetabular.",
   "Lesión del ligamento de la cabeza femoral en contextos traumáticos o de inestabilidad."
  ],
  "fisio": [
   "Explorar dolor inguinal, movilidad y síntomas mecánicos relacionándolos con toda la cadera.",
   "Los chasquidos o una maniobra dolorosa no confirman por sí solos una rotura del labrum.",
   "Derivar ante bloqueo, inestabilidad importante o incapacidad para apoyar después de trauma."
  ],
  "fuentes": [
   "Kenhub: Acetabular labrum — https://www.kenhub.com/en/library/anatomy/acetabular-labrum",
   "Kenhub: Hip joint — https://www.kenhub.com/en/library/anatomy/hip-joint",
   "TeachMeAnatomy: The Hip Joint — https://teachmeanatomy.info/lower-limb/joints/hip-joint/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-inguinal",
  "nombre": "Ligamento inguinal",
  "tipo": "ligamento",
  "zona": "core",
  "nombres": [],
  "descripcion": "Borde inferior engrosado de la aponeurosis del oblicuo externo que conecta la espina ilíaca anterosuperior con el tubérculo púbico.",
  "referencias": [
   "Se extiende oblicuamente por la ingle.",
   "Contribuye al piso del conducto inguinal y al límite superior del triángulo femoral."
  ],
  "relaciones": [
   "Vasos y nervio femorales pasan por debajo en sus respectivos compartimentos.",
   "Se relaciona con iliopsoas y estructuras del conducto inguinal."
  ],
  "lesiones": [
   "Hernia inguinal en la región del conducto.",
   "Compresión de estructuras nerviosas vecinas en la región inguinal."
  ],
  "fisio": [
   "Preguntar por bulto, dolor con esfuerzos y cambios sensitivos antes de atribuirlo a una distensión.",
   "No intentar reducir un bulto inguinal doloroso durante una sesión.",
   "Derivar urgentemente ante bulto muy doloroso con vómitos, fiebre o dolor abdominal."
  ],
  "fuentes": [
   "Kenhub: Inguinal ligament — https://www.kenhub.com/en/library/anatomy/inguinal-ligament",
   "TeachMeAnatomy: The Inguinal Canal — https://teachmeanatomy.info/abdomen/areas/inguinal-canal/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-longitudinal-anterior",
  "nombre": "Ligamento longitudinal anterior",
  "tipo": "ligamento",
  "zona": "back",
  "nombres": [],
  "descripcion": "Banda fibrosa sobre la cara anterior de cuerpos y discos vertebrales que limita la extensión excesiva de la columna.",
  "referencias": [
   "Recorre la superficie anterior y anterolateral vertebral.",
   "Se prolonga a lo largo de los segmentos cervicales, torácicos y lumbares hasta el sacro."
  ],
  "relaciones": [
   "Refuerza las uniones entre cuerpos vertebrales.",
   "Está por delante de los discos y del canal vertebral."
  ],
  "lesiones": [],
  "fisio": [
   "Valorar movimiento y función sin buscar tensión máxima del ligamento.",
   "No realizar hiperextensión forzada cuando haya trauma, osteoporosis o sospecha de lesión vertebral.",
   "Derivar ante trauma con dolor intenso o déficit neurológico."
  ],
  "fuentes": [
   "Kenhub: Anterior longitudinal ligament — https://www.kenhub.com/en/library/anatomy/anterior-longitudinal-ligament",
   "TeachMeAnatomy: The Vertebral Column — https://teachmeanatomy.info/back/bones/vertebral-column/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-longitudinal-posterior",
  "nombre": "Ligamento longitudinal posterior",
  "tipo": "ligamento",
  "zona": "back",
  "nombres": [],
  "descripcion": "Ligamento dentro del canal vertebral que recorre la cara posterior de cuerpos y discos y contribuye a limitar flexión excesiva.",
  "referencias": [
   "Se extiende desde C2 hacia el sacro.",
   "Cranealmente se continúa como membrana tectoria."
  ],
  "relaciones": [
   "Se fija especialmente a los discos intervertebrales.",
   "Está por delante de las estructuras neurales del canal."
  ],
  "lesiones": [
   "Osificación del ligamento longitudinal posterior.",
   "Compromiso neurológico si la osificación estrecha el canal."
  ],
  "fisio": [
   "Explorar fuerza, sensibilidad, marcha y destreza si hay sospecha de compresión cervical.",
   "Evitar maniobras forzadas ante síntomas compatibles con mielopatía.",
   "Derivar ante torpeza progresiva de manos, alteración del equilibrio o debilidad."
  ],
  "fuentes": [
   "Kenhub: Posterior longitudinal ligament — https://www.kenhub.com/en/library/anatomy/posterior-longitudinal-ligament",
   "TeachMeAnatomy: The Vertebral Column — https://teachmeanatomy.info/back/bones/vertebral-column/",
   "AAOS OrthoInfo: Cervical Spondylotic Myelopathy (Spinal Cord Compression) — https://www.orthoinfo.org/diseases--conditions/cervical-spondylotic-myelopathy-spinal-cord-compression/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-amarillo",
  "nombre": "Ligamento amarillo",
  "tipo": "ligamento",
  "zona": "back",
  "nombres": [],
  "descripcion": "Conjunto de ligamentos elásticos entre láminas vertebrales que contribuye a cerrar la pared posterior del canal y al retorno desde la flexión.",
  "referencias": [
   "Se dispone entre láminas de vértebras vecinas.",
   "Sus fibras elásticas le dan la tonalidad amarillenta."
  ],
  "relaciones": [
   "Forma parte de los elementos posteriores de la columna.",
   "Su engrosamiento puede reducir espacio disponible para estructuras neurales."
  ],
  "lesiones": [
   "Engrosamiento degenerativo del ligamento amarillo.",
   "Participación en estenosis del canal vertebral."
  ],
  "fisio": [
   "Relacionar dolor de piernas al caminar con exploración neurológica y causas vasculares posibles.",
   "No interpretar una imagen de engrosamiento como indicación automática de tratamiento manual.",
   "Derivar urgentemente ante cambios nuevos de esfínteres o debilidad progresiva."
  ],
  "fuentes": [
   "Kenhub: Joints and ligaments of the vertebral column — https://www.kenhub.com/en/library/anatomy/joints-and-ligaments-of-the-vertebral-column",
   "TeachMeAnatomy: The Lumbar Spine — https://teachmeanatomy.info/abdomen/bones/lumbar-spine/",
   "AAOS OrthoInfo: Lumbar Spinal Stenosis — https://www.orthoinfo.org/diseases--conditions/lumbar-spinal-stenosis/",
   "NHS: Sciatica — https://www.nhs.uk/conditions/sciatica/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamentos-interespinoso-supraespinoso",
  "nombre": "Ligamentos interespinoso y supraespinoso",
  "tipo": "ligamento",
  "zona": "back",
  "nombres": [],
  "descripcion": "Ligamentos posteriores que conectan apófisis espinosas vecinas y ayudan a limitar su separación durante la flexión.",
  "referencias": [
   "Los interespinosos ocupan el espacio entre apófisis.",
   "El supraespinoso enlaza sus puntas a lo largo de la región posterior."
  ],
  "relaciones": [
   "Se continúan con otros componentes ligamentosos posteriores.",
   "En el cuello se relacionan con el ligamento nucal."
  ],
  "lesiones": [],
  "fisio": [
   "Valorar dolor y movimiento después de conocer el mecanismo de lesión.",
   "No diagnosticar una rotura ligamentosa por dolor a la presión ni aplicar flexión forzada tras trauma.",
   "Derivar ante dolor vertebral intenso postraumático o signos neurológicos."
  ],
  "fuentes": [
   "Kenhub: Joints and ligaments of the vertebral column — https://www.kenhub.com/en/library/anatomy/joints-and-ligaments-of-the-vertebral-column",
   "TeachMeAnatomy: The Lumbar Spine — https://teachmeanatomy.info/abdomen/bones/lumbar-spine/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamento-nucal",
  "nombre": "Ligamento nucal",
  "tipo": "ligamento",
  "zona": "back",
  "nombres": [],
  "descripcion": "Lámina fibrosa posterior del cuello que contribuye a sostener la cabeza y limita la flexión excesiva.",
  "referencias": [
   "Se extiende desde el occipucio hasta la apófisis espinosa de C7.",
   "Se relaciona con tubérculo posterior del atlas y apófisis cervicales."
  ],
  "relaciones": [
   "Es continuación cervical del supraespinoso.",
   "Ofrece inserción a músculos como trapecio y esplenio de la cabeza."
  ],
  "lesiones": [],
  "fisio": [
   "Explorar control y movilidad cervical sin provocar dolor intenso.",
   "No atribuir cefalea o cervicalgia al ligamento solo por sensibilidad posterior.",
   "Derivar ante dolor después de trauma con debilidad, alteración de la marcha o síntomas neurológicos."
  ],
  "fuentes": [
   "Kenhub: Nuchal ligament — https://www.kenhub.com/en/library/anatomy/nuchal-ligament",
   "TeachMeAnatomy: The Lumbar Spine — https://teachmeanatomy.info/abdomen/bones/lumbar-spine/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "ligamento-iliolumbar",
  "nombre": "Ligamento iliolumbar",
  "tipo": "ligamento",
  "zona": "back",
  "nombres": [],
  "descripcion": "Conjunto fibroso que enlaza la región lumbar baja con el ilion y contribuye a la estabilidad lumbosacra.",
  "referencias": [
   "Sus fascículos se originan principalmente en la apófisis transversa de L5.",
   "Se expanden hacia la cresta ilíaca y tejidos pélvicos vecinos."
  ],
  "relaciones": [
   "Refuerza la transición L5-S1.",
   "Se relaciona con el cuadrado lumbar y la fascia regional."
  ],
  "lesiones": [],
  "fisio": [
   "Examinar región lumbar, cadera y tareas de carga en conjunto.",
   "No confirmar un síndrome iliolumbar únicamente por dolor localizado.",
   "Derivar ante déficit neurológico, síntomas de esfínteres o dolor intenso tras traumatismo."
  ],
  "fuentes": [
   "TeachMeAnatomy: The Lumbar Spine — https://teachmeanatomy.info/abdomen/bones/lumbar-spine/",
   "Journal of Anatomy / PubMed: The iliolumbar ligament. A study of its anatomy, development and clinical significance — https://pubmed.ncbi.nlm.nih.gov/3958002/",
   "NHS: Sciatica — https://www.nhs.uk/conditions/sciatica/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "ligamentos-sacroiliacos",
  "nombre": "Ligamentos sacroilíacos",
  "tipo": "ligamento",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Ligamentos anteriores, posteriores e interóseos que estabilizan sacro e ilion durante la transferencia de cargas.",
  "referencias": [
   "Los anteriores refuerzan la región ventral articular.",
   "Los interóseos y posteriores unen las tuberosidades y región dorsal sacroilíaca."
  ],
  "relaciones": [
   "Trabajan dentro del anillo pélvico.",
   "Se relacionan funcionalmente con ligamentos sacrotuberoso y sacroespinoso."
  ],
  "lesiones": [],
  "fisio": [
   "Valorar carga y función con revisión lumbar y de cadera.",
   "La palpación no demuestra una supuesta rotación pélvica ni identifica el ligamento causante del dolor.",
   "Derivar ante trauma pélvico, fiebre o déficit neurológico nuevo."
  ],
  "fuentes": [
   "Kenhub: Sacroiliac joint — https://www.kenhub.com/en/library/anatomy/sacroiliac-joint",
   "TeachMeAnatomy: The Pelvic Girdle — https://teachmeanatomy.info/pelvis/bones/pelvic-girdle/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "fascia-toracolumbar",
  "nombre": "Fascia toracolumbar",
  "tipo": "ligamento",
  "zona": "back",
  "nombres": [],
  "descripcion": "Conjunto de láminas fasciales y aponeuróticas de la espalda que envuelve músculos y transmite tensión entre tronco y extremidades.",
  "referencias": [
   "Se relaciona con apófisis vertebrales, sacro y crestas ilíacas.",
   "En la región lumbar se describen distintos planos alrededor de músculos paravertebrales y cuadrado lumbar."
  ],
  "relaciones": [
   "Recibe continuidad de aponeurosis como la del dorsal ancho.",
   "Se conecta con la pared abdominal y participa en la mecánica lumbopélvica."
  ],
  "lesiones": [],
  "fisio": [
   "Valorar función y tolerancia al movimiento en lugar de diagnosticar adherencias solo al tacto.",
   "No afirmar que la palpación identifica por sí sola una lesión fascial ni prometer corregirla con una técnica específica.",
   "Derivar ante déficit neurológico progresivo, fiebre o alteraciones nuevas de esfínteres."
  ],
  "fuentes": [
   "Kenhub: Thoracolumbar fascia — https://www.kenhub.com/en/library/anatomy/thoracolumbar-fascia",
   "Journal of Anatomy / PubMed: The thoracolumbar fascia: anatomy, function and clinical considerations — https://pubmed.ncbi.nlm.nih.gov/22630613/",
   "Spine / PubMed: The applied anatomy of the thoracolumbar fascia — https://pubmed.ncbi.nlm.nih.gov/6729580/",
   "NHS: Sciatica — https://www.nhs.uk/conditions/sciatica/"
  ],
  "verificacion": "dos fuentes"
 }
]);
