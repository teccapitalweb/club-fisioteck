/* Club FisioTeck — Atlas: 150 fichas de pruebas clínicas (100) y patologías frecuentes (50). Mismo formato que club-atlas-estructuras.js; se suman a FT_ATLAS_ESTR.
   Pruebas (tipo "prueba"): referencias = cómo se realiza; relaciones = qué evalúa y cómo se interpreta; lesiones = qué puede sugerir un resultado positivo; fisio = precauciones y límites.
   Patologías (tipo "patologia"): referencias = cómo se presenta; relaciones = estructuras y causas implicadas; lesiones = complicaciones y diagnósticos diferenciales; fisio = abordaje y cuándo derivar.
   Redactadas con palabras propias a partir de OrthoInfo, NHS, artículos en PubMed/PMC y otras fuentes; no incluyen cifras de sensibilidad ni especificidad. "verificación parcial": no se confirmó lo esencial en dos publicaciones independientes.
   Un resultado aislado de una prueba no establece un diagnóstico. Observaciones en CHATGPT-PRUEBAS-PATOLOGIAS-OBSERVACIONES.txt. */
(window.FT_ATLAS_ESTR = window.FT_ATLAS_ESTR || []).push(...[
 {
  "id": "prueba-spurling",
  "nombre": "Prueba de Spurling (compresión foraminal)",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Maniobra provocativa para explorar síntomas compatibles con irritación de una raíz nerviosa cervical.",
  "referencias": [
   "Paciente sentado; el evaluador se coloca detrás y sostiene la cabeza.",
   "Llevar suavemente el cuello hacia extensión y rotación del lado sintomático, según tolerancia.",
   "Aplicar compresión axial ligera y detener al aparecer síntomas."
  ],
  "relaciones": [
   "El hallazgo relevante es reproducir el dolor habitual irradiado hacia el brazo.",
   "El dolor localizado solo en el cuello no basta para considerarla positiva."
  ],
  "lesiones": [
   "Radiculopatía relacionada con hernia discal cervical.",
   "Compromiso foraminal por cambios degenerativos."
  ],
  "fisio": [
   "Evitar ante trauma reciente, sospecha de inestabilidad, mielopatía u otra patología grave.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. Un resultado negativo no descarta radiculopatía; combinar con exploración neurológica.",
   "Derivar ante debilidad progresiva, alteración de la marcha o síntomas neurológicos nuevos tras trauma."
  ],
  "fuentes": [
   "Cleveland Clinic: Spurling Test — https://my.clevelandclinic.org/health/diagnostics/spurling-test",
   "European Spine Journal / PMC: A systematic review of the diagnostic accuracy of provocative tests of the neck for diagnosing cervical radiculopathy — https://pmc.ncbi.nlm.nih.gov/articles/PMC2200707/",
   "American Family Physician: Nonoperative Management of Cervical Radiculopathy — https://www.aafp.org/afp/2016/0501/p746",
   "AAOS OrthoInfo: Cervical Radiculopathy (Pinched Nerve) — https://www.orthoinfo.org/diseases--conditions/cervical-radiculopathy-pinched-nerve/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-distraccion-cervical",
  "nombre": "Prueba de distracción cervical",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Explora si la descarga manual del cuello reduce los síntomas irradiados del brazo.",
  "referencias": [
   "Paciente acostado boca arriba; el evaluador se sitúa a la cabecera.",
   "Sostener occipucio y mandíbula sin comprimir garganta ni tejidos anteriores.",
   "Aplicar tracción longitudinal suave y registrar el cambio en los síntomas habituales."
  ],
  "relaciones": [
   "La reducción del dolor irradiado se considera el hallazgo de interés.",
   "El alivio de tensión muscular por sí solo no identifica una raíz afectada."
  ],
  "lesiones": [
   "Radiculopatía cervical en un contexto clínico concordante.",
   "Irritación radicular asociada con estrechamiento foraminal."
  ],
  "fisio": [
   "Evitar ante sospecha de fractura, inestabilidad o compromiso medular; suspender si empeora.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. La ausencia de alivio no excluye radiculopatía. La prueba no equivale a una prescripción de tracción terapéutica.",
   "Derivar ante déficit neurológico progresivo o dolor cervical intenso después de traumatismo."
  ],
  "fuentes": [
   "Spine, Wainner et al., copia del artículo: Reliability and Diagnostic Accuracy of the Clinical Examination and Patient Self-Report Measures for Cervical Radiculopathy — https://upload.orthobullets.com/journalclub/free_pdf/12544957_wainnerreliability.pdf",
   "European Spine Journal / PMC: A systematic review of the diagnostic accuracy of provocative tests of the neck for diagnosing cervical radiculopathy — https://pmc.ncbi.nlm.nih.gov/articles/PMC2200707/",
   "AAOS OrthoInfo: Cervical Radiculopathy (Pinched Nerve) — https://www.orthoinfo.org/diseases--conditions/cervical-radiculopathy-pinched-nerve/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-lhermitte",
  "nombre": "Signo de Lhermitte",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Descarga eléctrica breve que desciende por columna o extremidades, a menudo al flexionar el cuello; orienta a investigar su causa neurológica.",
  "referencias": [
   "Preguntar por descargas con flexión cervical, tos o movimientos cotidianos.",
   "Registrar recorrido, desencadenante y síntomas acompañantes; no es necesario provocarla repetidamente."
  ],
  "relaciones": [
   "Puede reflejar alteración de las vías sensitivas de la médula cervical.",
   "Es un fenómeno clínico, no una prueba específica de esclerosis múltiple."
  ],
  "lesiones": [
   "Enfermedad desmielinizante, incluida esclerosis múltiple.",
   "Compresión cervical u otras mielopatías."
  ],
  "fisio": [
   "Evitar flexión pasiva forzada, especialmente tras trauma o con sospecha de inestabilidad.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. Se prioriza el relato clínico y la valoración neurológica; una descarga no determina su etiología.",
   "Derivar ante aparición nueva; hacerlo de urgencia si se acompaña de debilidad, problemas de marcha o alteración de esfínteres."
  ],
  "fuentes": [
   "Cleveland Clinic: Lhermitte’s Sign — https://my.clevelandclinic.org/health/symptoms/lhermittes-sign",
   "StatPearls / NCBI Bookshelf: Lhermitte Sign — https://www.ncbi.nlm.nih.gov/sites/books/NBK493237/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-ulnt1-mediano",
  "nombre": "Prueba de tensión neural del miembro superior 1 (ULNT1, nervio mediano)",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Prueba neurodinámica para valorar la respuesta mecánica del sistema nervioso del miembro superior con sesgo hacia el mediano.",
  "referencias": [
   "Paciente en decúbito supino; el evaluador sostiene el brazo y controla la cintura escapular.",
   "Combinar progresivamente abducción de hombro, supinación y extensión de muñeca y dedos.",
   "Añadir rotación externa y extensión de codo hasta el límite tolerado.",
   "Modificar un componente distante y comparar síntomas y respuesta con el lado contrario."
  ],
  "relaciones": [
   "Importa reproducir síntomas habituales que cambien al modificar la carga neural.",
   "La sensación de tirantez o una diferencia de rango aislada no establece positividad patológica."
  ],
  "lesiones": [
   "Mecanosensibilidad neural en un cuadro de radiculopatía cervical.",
   "Síntomas de origen neural periférico que requieren diferenciarse de una radiculopatía."
  ],
  "fisio": [
   "Aplicar gradualmente, sin mantener dolor o parestesias ni usar la prueba como estiramiento intenso.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. No aísla exclusivamente al mediano ni localiza por sí sola la lesión; combinar con fuerza, sensibilidad y reflejos.",
   "Derivar ante pérdida motora progresiva o síntomas neurológicos persistentes que aumenten tras la exploración."
  ],
  "fuentes": [
   "American Family Physician: Nonoperative Management of Cervical Radiculopathy — https://www.aafp.org/afp/2016/0501/p746",
   "European Spine Journal / PMC: A systematic review of the diagnostic accuracy of provocative tests of the neck for diagnosing cervical radiculopathy — https://pmc.ncbi.nlm.nih.gov/articles/PMC2200707/",
   "Spine, Wainner et al., copia del artículo: Reliability and Diagnostic Accuracy of the Clinical Examination and Patient Self-Report Measures for Cervical Radiculopathy — https://upload.orthobullets.com/journalclub/free_pdf/12544957_wainnerreliability.pdf"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-flexion-craneocervical",
  "nombre": "Prueba de flexión craneocervical",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Valora el control y la resistencia de los flexores cervicales profundos mediante un movimiento suave de asentimiento y retroalimentación de presión.",
  "referencias": [
   "Paciente boca arriba, rodillas flexionadas y cuello neutro; el evaluador coloca el sensor de presión bajo el cuello y ajusta la referencia a 20 mmHg.",
   "Enseñar un asentimiento pequeño sin levantar la cabeza ni retraerla.",
   "Para la versión de activación, probar progresivamente objetivos de 22, 24, 26, 28 y 30 mmHg sin compensaciones.",
   "Registrar el objetivo más alto sostenido de forma estable durante 10 segundos, sin dolor ni compensaciones; detener si pierde la técnica."
  ],
  "relaciones": [
   "Es una medida indirecta de desempeño neuromotor, no de fuerza máxima aislada.",
   "Compensaciones o dificultad para sostener objetivos muestran menor desempeño en esa tarea."
  ],
  "lesiones": [],
  "fisio": [
   "Usar equipo y protocolo estandarizados; evitar movimiento doloroso y detener ante síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. No distingue una enfermedad concreta; sus propiedades para discriminar grupos y medir cambios son variables.",
   "Derivar ante síntomas neurológicos nuevos o sospecha de patología cervical grave antes de continuar."
  ],
  "fuentes": [
   "Physical Therapy: Measurement Properties of the Craniocervical Flexion Test: A Systematic Review — https://academic.oup.com/ptj/article/100/7/1094/5822584",
   "Journal of Manipulative and Physiological Therapeutics / PubMed: Clinical assessment of the deep cervical flexor muscles: the craniocervical flexion test — https://pubmed.ncbi.nlm.nih.gov/18804003/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-sharp-purser",
  "nombre": "Prueba de Sharp-Purser (estabilidad del atlas)",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Maniobra descrita para explorar inestabilidad atlantoaxial; su validez y seguridad tienen limitaciones que impiden usarla como autorización para manipular el cuello.",
  "referencias": [
   "Descripción clásica educativa: paciente sentado con ligera flexión cervical y profesional capacitado a su lado.",
   "El examinador estabiliza C2 y valora el desplazamiento posterior de la cabeza sobre el atlas; no se debe buscar un chasquido ni provocar síntomas neurológicos."
  ],
  "relaciones": [
   "El deslizamiento anormal o cambio de síntomas se han descrito como hallazgos positivos.",
   "Un resultado negativo no demuestra estabilidad ni seguridad para una intervención."
  ],
  "lesiones": [
   "Posible inestabilidad atlantoaxial.",
   "Alteración del ligamento transverso en enfermedades como artritis reumatoide."
  ],
  "fisio": [
   "Ante sospecha de inestabilidad o signos medulares, priorizar derivación y valoración médica; no usar como autoprueba ni tamizaje rutinario.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. La precisión y la fiabilidad son inconsistentes; no se ha establecido de forma suficiente su seguridad en todas las poblaciones.",
   "Derivar urgentemente ante parestesias de varias extremidades, debilidad o alteración de la marcha con dolor cervical."
  ],
  "fuentes": [
   "Journal of Manual & Manipulative Therapy / PMC: Systematic review of the diagnostic accuracy, reliability, and safety of the sharp-purser test — https://pmc.ncbi.nlm.nih.gov/articles/PMC7170372/",
   "JOSPT / manuscrito en repositorio universitario: International Framework for Examination of the Cervical Region for Potential of Vascular Pathologies of the Neck Prior to Musculoskeletal Intervention: International IFOMPT Cervical Framework — https://hsu.repository.guildhe.ac.uk/id/eprint/188/1/International%20Framework%20for%20Examination%20of%20the%20Cervical%20Region%20for%20Potential.pdf"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-hoffmann",
  "nombre": "Signo de Hoffmann",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Respuesta refleja de la mano utilizada como parte de la exploración de las vías motoras centrales.",
  "referencias": [
   "Paciente con mano relajada; el evaluador sostiene el dedo medio.",
   "Desplazar brevemente su falange distal hacia flexión y soltar, observando pulgar e índice.",
   "Comparar ambos lados y registrar la respuesta."
  ],
  "relaciones": [
   "La flexión involuntaria del pulgar o índice constituye la respuesta positiva descrita.",
   "Puede aparecer sin enfermedad medular; su ausencia tampoco la excluye."
  ],
  "lesiones": [
   "Posible disfunción de la vía corticoespinal.",
   "Mielopatía cervical cuando concuerda con otros signos y síntomas."
  ],
  "fisio": [
   "Realizar sin fuerza excesiva y considerar el resto de la exploración neurológica.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. Combinar con reflejos, fuerza, marcha y destreza; tiene utilidad limitada como predictor único.",
   "Derivar ante torpeza progresiva de manos, pérdida de equilibrio, debilidad o cambios de esfínteres."
  ],
  "fuentes": [
   "StatPearls / NCBI Bookshelf: Hoffmann Sign — https://www.ncbi.nlm.nih.gov/sites/books/NBK545156/",
   "Spine / PubMed: A Systematic Review of the Utility of the Hoffmann Sign for the Diagnosis of Degenerative Cervical Myelopathy — https://pubmed.ncbi.nlm.nih.gov/29668564/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-adson",
  "nombre": "Prueba de Adson",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Maniobra provocativa de la salida torácica que observa síntomas y cambios del pulso radial durante una posición del cuello.",
  "referencias": [
   "Paciente sentado con brazos relajados; el evaluador localiza el pulso radial.",
   "Pedir extensión y giro cervical suaves hacia el lado explorado, sin forzar.",
   "Registrar síntomas habituales y cambio del pulso y volver a posición neutra."
  ],
  "relaciones": [
   "Se han descrito como positivos la reproducción de síntomas y la disminución del pulso.",
   "La pérdida de pulso aislada tiene falsos positivos y no confirma compresión clínicamente relevante."
  ],
  "lesiones": [],
  "fisio": [
   "Omitir posiciones cervicales provocativas si hay sospecha vascular del cuello; detener ante síntomas intensos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. La evidencia diagnóstica es variable y no confirma por sí sola síndrome de salida torácica.",
   "Derivar urgentemente ante brazo frío o pálido, dolor isquémico o hinchazón y coloración azulada de inicio súbito."
  ],
  "fuentes": [
   "Journal of Athletic Training / PMC: Current Clinical Concepts: Rehabilitation of Thoracic Outlet Syndrome — https://pmc.ncbi.nlm.nih.gov/articles/PMC11277273/",
   "Electromyography and Clinical Neurophysiology / PubMed: False positive rate of thoracic outlet syndrome diagnostic maneuvers — https://pubmed.ncbi.nlm.nih.gov/18435210/",
   "AAOS OrthoInfo: Thoracic Outlet Syndrome — https://www.orthoinfo.org/diseases--conditions/thoracic-outlet-syndrome/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-roos-east",
  "nombre": "Prueba de Roos (EAST)",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Explora la reproducción de síntomas del miembro superior durante una tarea sostenida con brazos elevados.",
  "referencias": [
   "Paciente sentado; el evaluador coloca hombros en abducción y rotación externa a 90 grados y codos flexionados.",
   "Pedir abrir y cerrar las manos hasta tres minutos si lo tolera, con vigilancia.",
   "Detener si aparecen síntomas importantes; registrar respuesta y alivio al bajar los brazos."
  ],
  "relaciones": [
   "Interesan dolor y parestesias habituales, además de la tolerancia a la tarea.",
   "La fatiga por mantener la postura y los falsos positivos limitan su especificidad."
  ],
  "lesiones": [],
  "fisio": [
   "No insistir hasta completar el tiempo si existe dolor importante, cambio de color o parestesias crecientes.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. Combinar con historia y exploración neurológica y vascular; no confirma una compresión concreta.",
   "Derivar urgentemente ante hinchazón súbita, cianosis o signos de isquemia de la extremidad."
  ],
  "fuentes": [
   "Journal of Athletic Training / PMC: Current Clinical Concepts: Rehabilitation of Thoracic Outlet Syndrome — https://pmc.ncbi.nlm.nih.gov/articles/PMC11277273/",
   "Electromyography and Clinical Neurophysiology / PubMed: False positive rate of thoracic outlet syndrome diagnostic maneuvers — https://pubmed.ncbi.nlm.nih.gov/18435210/",
   "AAOS OrthoInfo: Thoracic Outlet Syndrome — https://www.orthoinfo.org/diseases--conditions/thoracic-outlet-syndrome/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-wainner-radiculopatia-cervical",
  "nombre": "Agrupación de Wainner para radiculopatía cervical",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Agrupa hallazgos de la exploración cervical para aumentar o reducir la sospecha de radiculopatía en un contexto compatible.",
  "referencias": [
   "Registrar síntomas y explorar fuerza, sensibilidad y reflejos antes de las maniobras.",
   "Valorar ULNT1, Spurling y distracción cervical con sus precauciones.",
   "Medir rotación cervical hacia el lado sintomático; el conjunto original incluye limitación inferior a 60 grados.",
   "Interpretar el patrón completo, sin forzar maniobras contraindicadas."
  ],
  "relaciones": [
   "La agrupación original reúne ULNT1 positivo, Spurling positivo, alivio con distracción y rotación limitada.",
   "La concordancia aumenta la sospecha, pero la precisión depende de población y procedimiento."
  ],
  "lesiones": [
   "Radiculopatía cervical por causas discales.",
   "Compromiso radicular por estenosis foraminal degenerativa."
  ],
  "fisio": [
   "No aplicar compresión o tracción ante trauma, inestabilidad o sospecha de mielopatía.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. No extrapolar probabilidades del estudio original a todos los pacientes; no sustituye el diagnóstico diferencial.",
   "Derivar ante déficit motor progresivo, alteración de la marcha o datos de enfermedad grave."
  ],
  "fuentes": [
   "Spine / PubMed: Reliability and diagnostic accuracy of the clinical examination and patient self-report measures for cervical radiculopathy — https://pubmed.ncbi.nlm.nih.gov/12544957/",
   "Spine, Wainner et al., copia del artículo: Reliability and Diagnostic Accuracy of the Clinical Examination and Patient Self-Report Measures for Cervical Radiculopathy — https://upload.orthobullets.com/journalclub/free_pdf/12544957_wainnerreliability.pdf",
   "European Spine Journal / PMC: A systematic review of the diagnostic accuracy of provocative tests of the neck for diagnosing cervical radiculopathy — https://pmc.ncbi.nlm.nih.gov/articles/PMC2200707/",
   "AAOS OrthoInfo: Cervical Radiculopathy (Pinched Nerve) — https://www.orthoinfo.org/diseases--conditions/cervical-radiculopathy-pinched-nerve/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-tamizaje-vascular-cervical",
  "nombre": "Tamizaje vertebrobasilar antes de movilizar el cuello (lo que respaldan las fuentes)",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Proceso de razonamiento clínico para detectar sospecha de patología vascular cervical antes de una intervención; no es una prueba posicional de autorización.",
  "referencias": [
   "Preguntar por inicio y evolución de dolor cervical o cefalea, traumatismos y síntomas neurológicos o vasculares.",
   "Si está indicado y se tiene formación, valorar presión arterial, pares craneales, marcha y coordinación.",
   "Decidir derivación o adaptación de la exploración según el conjunto de hallazgos; no provocar isquemia con extensión y rotación sostenidas."
  ],
  "relaciones": [
   "Un examen aparentemente normal no elimina el riesgo vascular.",
   "Los marcos clínicos ayudan a organizar la valoración, pero su capacidad para descartar enfermedad es limitada."
  ],
  "lesiones": [
   "Posible disección u otra patología arterial cervical que requiere valoración médica.",
   "Evento isquémico cerebral cuando hay signos neurológicos agudos."
  ],
  "fisio": [
   "No usar pruebas posicionales negativas como garantía de seguridad para movilización o manipulación.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. Ningún hallazgo aislado ni el marco clínico completo ofrecen certeza; se requiere reevaluación y juicio clínico.",
   "Derivar a urgencias ante cefalea súbita inusual con déficit neurológico, diplopía, dificultad para hablar o ataxia nueva."
  ],
  "fuentes": [
   "JOSPT / manuscrito en repositorio universitario: International Framework for Examination of the Cervical Region for Potential of Vascular Pathologies of the Neck Prior to Musculoskeletal Intervention: International IFOMPT Cervical Framework — https://hsu.repository.guildhe.ac.uk/id/eprint/188/1/International%20Framework%20for%20Examination%20of%20the%20Cervical%20Region%20for%20Potential.pdf",
   "Journal of Physiotherapy / Universidad de Groningen: Risk assessment of vascular complications following manual therapy and exercise for the cervical region: diagnostic accuracy of the International Federation of Orthopaedic Manipulative Physical Therapists framework (The Go4Safe project) — https://pure.rug.nl/ws/portalfiles/portal/886208658/1-s2.0-S183695532300084X.pdf"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-neer",
  "nombre": "Prueba de Neer",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Signo de provocación del dolor durante elevación pasiva del hombro, utilizado en la evaluación del dolor subacromial.",
  "referencias": [
   "Paciente sentado o de pie; el evaluador controla la escápula con una mano.",
   "Elevar pasivamente el brazo hacia delante hasta el límite tolerado.",
   "Registrar si aparece el dolor habitual, sin forzar el final del recorrido."
  ],
  "relaciones": [
   "La reproducción de dolor se describe como respuesta positiva.",
   "No identifica por sí sola qué tendón, bursa u otra estructura origina el dolor."
  ],
  "lesiones": [
   "Dolor relacionado con tendinopatía del manguito rotador.",
   "Dolor asociado con la bursa subacromial."
  ],
  "fisio": [
   "Evitar ante sospecha de fractura, luxación o dolor agudo que impida movilización pasiva.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. Su precisión es variable; combinar con movilidad y fuerza. Aquí se describe el signo mecánico, sin inyección anestésica.",
   "Derivar ante deformidad traumática o pérdida súbita importante de fuerza y elevación del brazo."
  ],
  "fuentes": [
   "Sports Health / PMC: Comprehensive Examination of the Athlete’s Shoulder — https://pmc.ncbi.nlm.nih.gov/articles/PMC6044121/",
   "StatPearls / NCBI Bookshelf: Comprehensive Shoulder Evaluation Strategies — https://www.ncbi.nlm.nih.gov/sites/books/NBK538309/",
   "BMC Musculoskeletal Disorders / PMC: Physical examination tests of the shoulder: a systematic review and meta-analysis of diagnostic test performance — https://pmc.ncbi.nlm.nih.gov/articles/PMC5267375/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-hawkins-kennedy",
  "nombre": "Prueba de Hawkins-Kennedy",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Maniobra de provocación del hombro que registra dolor al añadir rotación interna con el brazo flexionado.",
  "referencias": [
   "Paciente sentado; el evaluador sostiene el codo y antebrazo.",
   "Colocar hombro y codo aproximadamente a 90 grados de flexión.",
   "Añadir rotación interna pasiva suave y registrar la reproducción del dolor habitual."
  ],
  "relaciones": [
   "El dolor concordante es el hallazgo positivo descrito.",
   "No demuestra por sí solo pinzamiento anatómico ni una rotura del manguito."
  ],
  "lesiones": [
   "Dolor relacionado con el manguito rotador.",
   "Dolor subacromial con participación bursal."
  ],
  "fisio": [
   "No forzar una articulación rígida ni hacerla ante sospecha de luxación o fractura.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. Su capacidad diagnóstica aislada es limitada; combinar con historia, movilidad y otras pruebas.",
   "Derivar ante trauma con deformidad, pérdida marcada de función o déficit neurovascular."
  ],
  "fuentes": [
   "StatPearls / NCBI Bookshelf: Comprehensive Shoulder Evaluation Strategies — https://www.ncbi.nlm.nih.gov/sites/books/NBK538309/",
   "BMC Musculoskeletal Disorders / PMC: Physical examination tests of the shoulder: a systematic review and meta-analysis of diagnostic test performance — https://pmc.ncbi.nlm.nih.gov/articles/PMC5267375/",
   "Sports Health / PMC: Comprehensive Examination of the Athlete’s Shoulder — https://pmc.ncbi.nlm.nih.gov/articles/PMC6044121/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-jobe-lata-vacia",
  "nombre": "Prueba de Jobe (lata vacía)",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Prueba resistida de elevación en plano escapular para valorar dolor y debilidad asociados con el supraespinoso.",
  "referencias": [
   "Paciente sentado o de pie; el evaluador se coloca delante.",
   "Elevar el brazo a 90 grados en plano escapular, con codo extendido y pulgar hacia abajo.",
   "Aplicar resistencia descendente suave mientras intenta mantener la posición; comparar lados."
  ],
  "relaciones": [
   "Registrar por separado dolor y debilidad, porque no significan lo mismo.",
   "No aísla completamente al supraespinoso; el dolor puede inhibir la fuerza."
  ],
  "lesiones": [
   "Disfunción dolorosa del supraespinoso.",
   "Posible desgarro del supraespinoso según la historia y exploración global."
  ],
  "fisio": [
   "Evitar resistencia intensa tras trauma o si existe sospecha de rotura aguda importante.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. La definición de positividad cambia entre estudios; combinar con otras pruebas del manguito.",
   "Derivar ante pérdida súbita de elevación o fuerza después de traumatismo."
  ],
  "fuentes": [
   "American Journal of Physical Medicine & Rehabilitation, Jain et al., copia del manuscrito: The Diagnostic Accuracy of Special Tests for Rotator Cuff Tear: The ROW Cohort Study — https://upload.orthobullets.com/journalclub/pubmed_central/27386812.pdf",
   "Sports Health / PMC: Comprehensive Examination of the Athlete’s Shoulder — https://pmc.ncbi.nlm.nih.gov/articles/PMC6044121/",
   "International Journal of Sports Physical Therapy: Survey on Knowledge, Use, and Diagnostic Applicability of Special Tests for Rotator Cuff Involvement in Clinical Practice — https://ijspt.org/wp-content/uploads/2023/01/19-Forbush.pdf"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-patte",
  "nombre": "Prueba de Patte",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Valora la rotación externa resistida con el brazo elevado; explora función del manguito posterior.",
  "referencias": [
   "Paciente sentado o de pie; el evaluador sostiene el codo.",
   "Colocar hombro a 90 grados de abducción en plano escapular y codo flexionado a 90 grados.",
   "Pedir rotación externa contra resistencia gradual y comparar dolor y fuerza."
  ],
  "relaciones": [
   "La debilidad o el dolor durante la resistencia orientan a alteración del manguito posterior.",
   "La participación de infraespinoso y redondo menor impide atribuir el resultado a un único músculo."
  ],
  "lesiones": [
   "Posible alteración del infraespinoso o su tendón.",
   "Disfunción del redondo menor, especialmente en lesiones extensas del manguito."
  ],
  "fisio": [
   "No forzar la posición en pacientes con inestabilidad o dolor intenso; distinguir dolor de déficit motor.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. Las denominaciones y criterios cambian entre fuentes; no equivale automáticamente a una rotura confirmada.",
   "Derivar ante pérdida brusca de rotación externa o elevación tras un traumatismo."
  ],
  "fuentes": [
   "Clinical Orthopaedics and Related Research / PMC: What is the Best Clinical Test for Assessment of the Teres Minor in Massive Rotator Cuff Tears? — https://pmc.ncbi.nlm.nih.gov/articles/PMC4523548/",
   "International Journal of Sports Physical Therapy: Survey on Knowledge, Use, and Diagnostic Applicability of Special Tests for Rotator Cuff Involvement in Clinical Practice — https://ijspt.org/wp-content/uploads/2023/01/19-Forbush.pdf"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-gerber-lift-off",
  "nombre": "Prueba de Gerber (lift-off)",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Valora la capacidad de separar la mano de la espalda mediante rotación interna, orientando a función del subescapular.",
  "referencias": [
   "Paciente de pie; el evaluador se coloca detrás o al lado.",
   "Colocar el dorso de la mano sobre la región lumbar solo si la movilidad lo permite.",
   "Pedir separar la mano de la espalda sin compensar y comparar con el otro lado."
  ],
  "relaciones": [
   "La incapacidad para despegar la mano constituye un hallazgo positivo descrito.",
   "Una limitación pasiva o dolor importante puede impedir interpretar la prueba."
  ],
  "lesiones": [
   "Posible lesión del tendón subescapular.",
   "Disfunción de rotación interna que requiere diferenciar dolor, rigidez y déficit motor."
  ],
  "fisio": [
   "No forzar la mano detrás de la espalda; considerar belly press cuando esa posición no sea posible.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. Una respuesta negativa no excluye una lesión parcial del subescapular.",
   "Derivar ante debilidad traumática marcada o pérdida reciente importante de la función del hombro."
  ],
  "fuentes": [
   "Hawaii Journal of Health & Social Welfare / PMC: Literature Review of Subscapularis Tear, Associated injuries, and the Available Treatment Options — https://pmc.ncbi.nlm.nih.gov/articles/PMC8941617/",
   "American Journal of Physical Medicine & Rehabilitation, Jain et al., copia del manuscrito: The Diagnostic Accuracy of Special Tests for Rotator Cuff Tear: The ROW Cohort Study — https://upload.orthobullets.com/journalclub/pubmed_central/27386812.pdf"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-presion-abdominal-belly-press",
  "nombre": "Prueba de presión abdominal (belly press)",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Explora la función del subescapular al presionar el abdomen, útil cuando no se tolera llevar la mano detrás de la espalda.",
  "referencias": [
   "Paciente sentado o de pie; el evaluador observa de frente.",
   "Apoyar la palma en el abdomen y mantener el codo por delante del tronco.",
   "Pedir presión suave sobre el abdomen con muñeca alineada; comparar fuerza y compensaciones."
  ],
  "relaciones": [
   "El retroceso del codo o la flexión compensatoria de muñeca sugieren dificultad para mantener la rotación interna.",
   "Registrar dolor y debilidad sin asumir que equivalen a rotura."
  ],
  "lesiones": [
   "Posible lesión del subescapular.",
   "Disfunción dolorosa de la rotación interna."
  ],
  "fisio": [
   "Evitar presión dolorosa o resistencia alta en una lesión reciente.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. No descarta lesiones pequeñas; combinar con otras pruebas del subescapular y movilidad pasiva.",
   "Derivar ante pérdida súbita de fuerza después de trauma o sospecha de lesión importante del manguito."
  ],
  "fuentes": [
   "Hawaii Journal of Health & Social Welfare / PMC: Literature Review of Subscapularis Tear, Associated injuries, and the Available Treatment Options — https://pmc.ncbi.nlm.nih.gov/articles/PMC8941617/",
   "StatPearls / NCBI Bookshelf: Comprehensive Shoulder Evaluation Strategies — https://www.ncbi.nlm.nih.gov/sites/books/NBK538309/",
   "American Journal of Physical Medicine & Rehabilitation, Jain et al., copia del manuscrito: The Diagnostic Accuracy of Special Tests for Rotator Cuff Tear: The ROW Cohort Study — https://upload.orthobullets.com/journalclub/pubmed_central/27386812.pdf"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-brazo-caido-drop-arm",
  "nombre": "Prueba del brazo caído (drop arm)",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Valora si el paciente controla el descenso del brazo desde abducción; se usa al investigar insuficiencia del manguito rotador.",
  "referencias": [
   "Paciente sentado o de pie; el evaluador sostiene el brazo.",
   "Colocar el hombro cerca de 90 grados de abducción si es tolerado.",
   "Pedir bajar lentamente el brazo y permanecer preparado para sostenerlo si cae."
  ],
  "relaciones": [
   "La caída brusca o incapacidad para controlar el descenso es un hallazgo positivo.",
   "Dolor, debilidad neurológica o rigidez también pueden alterar la tarea."
  ],
  "lesiones": [
   "Posible desgarro importante del manguito rotador.",
   "Insuficiencia funcional del supraespinoso."
  ],
  "fisio": [
   "No dejar caer el brazo sin protección ni insistir si existe dolor intenso o trauma sin valorar.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. Una prueba negativa no excluye rotura; integrar fuerza y movilidad activa y pasiva.",
   "Derivar ante incapacidad nueva para elevar o descender el brazo tras una lesión."
  ],
  "fuentes": [
   "American Journal of Physical Medicine & Rehabilitation, Jain et al., copia del manuscrito: The Diagnostic Accuracy of Special Tests for Rotator Cuff Tear: The ROW Cohort Study — https://upload.orthobullets.com/journalclub/pubmed_central/27386812.pdf",
   "StatPearls / NCBI Bookshelf: Comprehensive Shoulder Evaluation Strategies — https://www.ncbi.nlm.nih.gov/sites/books/NBK538309/",
   "International Journal of Sports Physical Therapy: Survey on Knowledge, Use, and Diagnostic Applicability of Special Tests for Rotator Cuff Involvement in Clinical Practice — https://ijspt.org/wp-content/uploads/2023/01/19-Forbush.pdf"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-arco-doloroso",
  "nombre": "Arco doloroso",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Observación del tramo de elevación del brazo que reproduce dolor durante el movimiento del hombro.",
  "referencias": [
   "Paciente de pie o sentado; el evaluador observa desde delante o un lado.",
   "Pedir elevar y bajar activamente el brazo según tolerancia.",
   "Registrar inicio y final del dolor, recorrido y compensaciones; comparar lados."
  ],
  "relaciones": [
   "El dolor en el tramo medio se ha asociado con cuadros del manguito y dolor subacromial.",
   "El patrón por sí solo no identifica tejido ni gravedad de la lesión."
  ],
  "lesiones": [
   "Dolor relacionado con el manguito rotador.",
   "Participación de tejidos subacromiales, incluida la bursa."
  ],
  "fisio": [
   "Evitar elevaciones repetidas dolorosas o movimientos forzados después de trauma.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. El recorrido y criterio de positividad varían; combinar con pruebas resistidas y movilidad pasiva.",
   "Derivar ante pérdida súbita de movilidad activa, deformidad o déficit neurológico tras lesión."
  ],
  "fuentes": [
   "Sports Health / PMC: Comprehensive Examination of the Athlete’s Shoulder — https://pmc.ncbi.nlm.nih.gov/articles/PMC6044121/",
   "BMC Musculoskeletal Disorders / PMC: Physical examination tests of the shoulder: a systematic review and meta-analysis of diagnostic test performance — https://pmc.ncbi.nlm.nih.gov/articles/PMC5267375/",
   "StatPearls / NCBI Bookshelf: Comprehensive Shoulder Evaluation Strategies — https://www.ncbi.nlm.nih.gov/sites/books/NBK538309/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-speed",
  "nombre": "Prueba de Speed",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Prueba resistida de flexión del hombro que busca dolor concordante en la región del tendón largo del bíceps.",
  "referencias": [
   "Paciente sentado o de pie; el evaluador se coloca delante.",
   "Mantener antebrazo supinado y brazo elevado hacia delante con codo extendido, si se tolera.",
   "Aplicar resistencia descendente gradual mientras mantiene la posición y localizar el dolor."
  ],
  "relaciones": [
   "El dolor en el surco bicipital es el hallazgo habitual de interés.",
   "Su especificidad es limitada; no distingue de forma fiable entre distintas lesiones del hombro."
  ],
  "lesiones": [
   "Posible tendinopatía de la cabeza larga del bíceps.",
   "Lesión del complejo bíceps-labrum en un contexto concordante."
  ],
  "fisio": [
   "No usar resistencia intensa tras una lesión aguda o con sospecha de rotura.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas. Las variantes de posición y los criterios influyen en el resultado; combinar con evaluación del manguito y labrum.",
   "Derivar ante deformidad súbita del bíceps, pérdida importante de fuerza o traumatismo con incapacidad funcional."
  ],
  "fuentes": [
   "StatPearls / NCBI Bookshelf: Comprehensive Shoulder Evaluation Strategies — https://www.ncbi.nlm.nih.gov/sites/books/NBK538309/",
   "BMC Musculoskeletal Disorders / PMC: Physical examination tests of the shoulder: a systematic review and meta-analysis of diagnostic test performance — https://pmc.ncbi.nlm.nih.gov/articles/PMC5267375/",
   "American Journal of Physical Medicine & Rehabilitation, Jain et al., copia del manuscrito: The Diagnostic Accuracy of Special Tests for Rotator Cuff Tear: The ROW Cohort Study — https://upload.orthobullets.com/journalclub/pubmed_central/27386812.pdf"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-yergason",
  "nombre": "Prueba de Yergason",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Explora dolor relacionado con el tendón proximal del bíceps.",
  "referencias": [
   "Paciente sentado, codo flexionado a 90°; evaluador junto al brazo.",
   "Resistir suavemente la supinación mientras se palpa la corredera bicipital."
  ],
  "relaciones": [
   "Dolor habitual en la corredera es el hallazgo de interés.",
   "El dolor inespecífico del hombro tiene menor valor localizador."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No confirma por sí sola lesión tendinosa ni del labrum; complementar con movilidad y fuerza."
  ],
  "fuentes": [
   "American Family Physician: The Painful Shoulder: Part I. Clinical Evaluation — https://www.aafp.org/afp/2000/0515/p3079",
   "The Open Orthopaedics Journal: Clinical Assessment of the Shoulder — https://pmc.ncbi.nlm.nih.gov/articles/PMC3785041/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-o-brien",
  "nombre": "Prueba de O'Brien",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Compresión activa que compara dolor con dos posiciones del brazo.",
  "referencias": [
   "Paciente sentado; elevar brazo al frente, codo extendido y ligera aducción.",
   "Evaluador aplica resistencia descendente primero con pulgar abajo y luego con palma arriba."
  ],
  "relaciones": [
   "Dolor profundo que disminuye con supinación puede orientar al complejo labral.",
   "Dolor superior localizado puede orientar a la articulación acromioclavicular."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "La capacidad para identificar una lesión SLAP es limitada; registrar localización, no solo dolor."
  ],
  "fuentes": [
   "The Open Orthopaedics Journal: Clinical Assessment of the Shoulder — https://pmc.ncbi.nlm.nih.gov/articles/PMC3785041/",
   "AAOS OrthoInfo: SLAP Tears in the Shoulder — https://www.orthoinfo.org/diseases--conditions/slap-tears/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-aprension-del-hombro",
  "nombre": "Prueba de aprensión del hombro",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Explora sensación de inestabilidad anterior.",
  "referencias": [
   "Paciente supino; evaluador sostiene codo y muñeca.",
   "Con hombro y codo a 90°, aumentar lentamente rotación externa sin forzar."
  ],
  "relaciones": [
   "Aprensión o sensación de salida es relevante.",
   "Dolor sin aprensión no equivale a inestabilidad."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No realizar ante luxación no reducida o fractura sospechada; no intentar provocar una luxación."
  ],
  "fuentes": [
   "Current Reviews in Musculoskeletal Medicine / PubMed: Clinical Evaluation and Physical Exam Findings in Patients with Anterior Shoulder Instability — https://pubmed.ncbi.nlm.nih.gov/29043566/",
   "The Open Orthopaedics Journal: An Overview of Shoulder Instability and its Management — https://pmc.ncbi.nlm.nih.gov/articles/PMC3785059/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-relocalizacion",
  "nombre": "Prueba de relocalización",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Valora si el soporte posterior reduce la aprensión anterior.",
  "referencias": [
   "En supino, sostener brazo en posición tolerada de aprensión.",
   "Aplicar presión posterior suave sobre cabeza humeral y preguntar por el cambio."
  ],
  "relaciones": [
   "Disminuir la sensación de salida apoya una interpretación de inestabilidad anterior.",
   "Aliviar dolor solamente es menos específico."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No retirar el soporte bruscamente; evitar en trauma agudo sin valoración médica."
  ],
  "fuentes": [
   "Current Reviews in Musculoskeletal Medicine / PubMed: Clinical Evaluation and Physical Exam Findings in Patients with Anterior Shoulder Instability — https://pubmed.ncbi.nlm.nih.gov/29043566/",
   "The Open Orthopaedics Journal: An Overview of Shoulder Instability and its Management — https://pmc.ncbi.nlm.nih.gov/articles/PMC3785059/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-signo-del-surco-sulcus",
  "nombre": "Signo del surco (sulcus)",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Observa laxitud inferior glenohumeral.",
  "referencias": [
   "Paciente sentado, brazo relajado al costado; evaluador estabiliza la escápula.",
   "Aplicar tracción inferior suave al brazo y observar bajo el acromion."
  ],
  "relaciones": [
   "Un surco visible representa traslación inferior.",
   "La laxitud puede existir sin síntomas ni enfermedad."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Comparar lados e historia de episodios; no equiparar laxitud con inestabilidad sintomática."
  ],
  "fuentes": [
   "Current Reviews in Musculoskeletal Medicine / PubMed: Clinical Evaluation and Physical Exam Findings in Patients with Anterior Shoulder Instability — https://pubmed.ncbi.nlm.nih.gov/29043566/",
   "The Open Orthopaedics Journal: An Overview of Shoulder Instability and its Management — https://pmc.ncbi.nlm.nih.gov/articles/PMC3785059/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-aduccion-horizontal-cross-body",
  "nombre": "Prueba de aducción horizontal (cross-body)",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Provoca carga sobre la región acromioclavicular.",
  "referencias": [
   "Paciente sentado; evaluador eleva el hombro al frente.",
   "Llevar suavemente el brazo hacia el hombro contrario."
  ],
  "relaciones": [
   "Dolor superior localizado sobre articulación acromioclavicular es relevante.",
   "Dolor difuso no identifica una estructura con certeza."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Evitar después de trauma importante hasta descartar fractura o lesión acromioclavicular aguda."
  ],
  "fuentes": [
   "American Family Physician: The Painful Shoulder: Part I. Clinical Evaluation — https://www.aafp.org/afp/2000/0515/p3079",
   "The Open Orthopaedics Journal: Clinical Assessment of the Shoulder — https://pmc.ncbi.nlm.nih.gov/articles/PMC3785041/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-rascado-de-apley",
  "nombre": "Rascado de Apley",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Observación funcional de movilidad combinada del hombro.",
  "referencias": [
   "Paciente lleva una mano por encima de la cabeza hacia la escápula contraria.",
   "Después lleva la mano detrás de la espalda hacia la escápula; evaluador compara lados."
  ],
  "relaciones": [
   "Explora combinaciones de rotación, elevación y aducción.",
   "Registrar alcance, dolor y compensación del tronco."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No identifica por sí solo una rotura; no forzar el alcance si existe rigidez dolorosa."
  ],
  "fuentes": [
   "American Family Physician: The Painful Shoulder: Part I. Clinical Evaluation — https://www.aafp.org/afp/2000/0515/p3079",
   "The Open Orthopaedics Journal: Clinical Assessment of the Shoulder — https://pmc.ncbi.nlm.nih.gov/articles/PMC3785041/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-signo-de-hornblower",
  "nombre": "Signo de Hornblower",
  "tipo": "prueba",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Explora la capacidad de mantener rotación externa con el brazo elevado.",
  "referencias": [
   "Paciente sentado; evaluador sostiene hombro elevado en plano escapular y codo a 90°.",
   "Colocar en rotación externa tolerada y pedir mantenerla al retirar gradualmente el apoyo de muñeca."
  ],
  "relaciones": [
   "La caída hacia rotación interna evidencia debilidad.",
   "Orienta al manguito posterior, especialmente redondo menor, sin aislarlo por completo."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "El dolor o la rigidez pueden impedir la posición; no interpretar entonces como rotura confirmada."
  ],
  "fuentes": [
   "Clinical Orthopaedics and Related Research: What is the Best Clinical Test for Assessment of the Teres Minor in Massive Rotator Cuff Tears? — https://pmc.ncbi.nlm.nih.gov/articles/PMC4523548/",
   "IJSPT: Survey on Knowledge, Use, and Diagnostic Applicability of Special Tests for Rotator Cuff Involvement in Clinical Practice — https://ijspt.org/wp-content/uploads/2023/01/19-Forbush.pdf"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-cozen",
  "nombre": "Prueba de Cozen",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Carga resistida de los extensores de muñeca para explorar dolor lateral del codo.",
  "referencias": [
   "Paciente sentado, antebrazo pronado; evaluador estabiliza codo.",
   "Pedir extensión de muñeca contra resistencia gradual."
  ],
  "relaciones": [
   "Reproducción de dolor epicondíleo lateral es relevante.",
   "Valora tolerancia a carga del origen extensor."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No diferencia por sí sola todas las causas de dolor lateral; explorar nervio radial y articulación."
  ],
  "fuentes": [
   "Journal of Clinical Orthopaedics and Trauma: Common tendinopathies around the elbow; what does current evidence say? — https://pmc.ncbi.nlm.nih.gov/articles/PMC8190485/",
   "AAPM&R: Acute Elbow Injuries and Overuse Disorders — https://now.aapmr.org/acute-elbow-injuries-and-overuse-disorders/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-mill",
  "nombre": "Prueba de Mill",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Estiramiento provocativo de la región extensora del antebrazo.",
  "referencias": [
   "Paciente sentado; evaluador sostiene antebrazo y estabiliza húmero.",
   "Con pronación y flexión de muñeca, extender lentamente el codo según tolerancia."
  ],
  "relaciones": [
   "El dolor lateral habitual puede apoyar epicondilalgia.",
   "Una sensación de estiramiento aislada no es positiva."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Evitar extensión forzada; combinar con palpación y pruebas resistidas."
  ],
  "fuentes": [
   "Journal of Clinical Orthopaedics and Trauma: Common tendinopathies around the elbow; what does current evidence say? — https://pmc.ncbi.nlm.nih.gov/articles/PMC8190485/",
   "AAPM&R: Acute Elbow Injuries and Overuse Disorders — https://now.aapmr.org/acute-elbow-injuries-and-overuse-disorders/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-estres-en-valgo-del-codo",
  "nombre": "Estrés en valgo del codo",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Explora estabilidad medial del codo.",
  "referencias": [
   "Paciente relajado; evaluador sostiene húmero y antebrazo con codo ligeramente flexionado.",
   "Aplicar valgo suave y comparar apertura y tope con lado contrario."
  ],
  "relaciones": [
   "Dolor medial o apertura excesiva son hallazgos relevantes.",
   "El complejo colateral cubital proporciona resistencia a esta carga."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No realizar ante fractura o luxación sospechada; la laxitud adaptativa del lanzador requiere contexto."
  ],
  "fuentes": [
   "American Family Physician: Evaluation of Elbow Pain in Adults — https://www.aafp.org/afp/2014/0415/p649",
   "AAPM&R: Acute Elbow Injuries and Overuse Disorders — https://now.aapmr.org/acute-elbow-injuries-and-overuse-disorders/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-estres-en-varo-del-codo",
  "nombre": "Estrés en varo del codo",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Explora resistencia lateral ante una carga en varo.",
  "referencias": [
   "Paciente relajado; evaluador estabiliza húmero y sostiene antebrazo con ligera flexión del codo.",
   "Aplicar varo progresivo sin giro brusco y comparar lados."
  ],
  "relaciones": [
   "Apertura lateral o tope alterado sugieren laxitud.",
   "El dolor sin apertura es inespecífico."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No equivale a una prueba completa de inestabilidad rotatoria posterolateral; evitar trauma agudo no estudiado."
  ],
  "fuentes": [
   "AAPM&R: Acute Elbow Injuries and Overuse Disorders — https://now.aapmr.org/acute-elbow-injuries-and-overuse-disorders/",
   "American Family Physician: Evaluation of Elbow Pain in Adults — https://www.aafp.org/afp/2014/0415/p649"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-signo-de-tinel-cubital",
  "nombre": "Signo de Tinel cubital",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Percusión suave del nervio cubital en el codo.",
  "referencias": [
   "Paciente sentado, codo accesible y relajado.",
   "Evaluador percute suavemente detrás del epicóndilo medial y pregunta por irradiación."
  ],
  "relaciones": [
   "Hormigueo hacia meñique y mitad cubital del anular es concordante.",
   "Dolor local aislado no demuestra neuropatía."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No golpear repetidamente; déficit motor progresivo o atrofia requieren valoración especializada."
  ],
  "fuentes": [
   "Current Reviews in Musculoskeletal Medicine: Ulnar neuropathy: evaluation and management — https://pmc.ncbi.nlm.nih.gov/articles/PMC4896870/",
   "American Family Physician: Evaluation of Elbow Pain in Adults — https://www.aafp.org/afp/2014/0415/p649"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-flexion-del-codo-nervio-cubital",
  "nombre": "Prueba de flexión del codo (nervio cubital)",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Explora síntomas cubitales con flexión mantenida.",
  "referencias": [
   "Paciente sentado; evaluador sostiene el brazo.",
   "Flexionar el codo sin fuerza y registrar aparición de síntomas; liberar al reproducirlos."
  ],
  "relaciones": [
   "Parestesias habituales en dedos cubitales son relevantes.",
   "No permite localizar toda lesión del nervio sin examen motor y sensitivo."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Distinguir esta versión de la flexión con compresión; no mantener si aumenta el déficit."
  ],
  "fuentes": [
   "Current Reviews in Musculoskeletal Medicine: Ulnar neuropathy: evaluation and management — https://pmc.ncbi.nlm.nih.gov/articles/PMC4896870/",
   "AAPM&R: Acute Elbow Injuries and Overuse Disorders — https://now.aapmr.org/acute-elbow-injuries-and-overuse-disorders/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-phalen",
  "nombre": "Prueba de Phalen",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Provocación posicional de síntomas del nervio mediano en la muñeca.",
  "referencias": [
   "Paciente sentado; evaluador observa ambas manos.",
   "Juntar dorsos de manos con muñecas flexionadas, hasta un minuto según tolerancia."
  ],
  "relaciones": [
   "Hormigueo habitual en territorio mediano es concordante.",
   "Dolor de muñeca aislado es inespecífico."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Resultado negativo no excluye túnel carpiano; combinar con sensibilidad y fuerza tenar."
  ],
  "fuentes": [
   "Stanford Medicine 25: Carpal Tunnel Exam — https://stanfordmedicine25.stanford.edu/the25/carpaltunnel.html",
   "American Family Physician: Carpal Tunnel Syndrome — https://www.aafp.org/afp/2024/0600/pocg-carpal-tunnel-syndrome"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-signo-de-tinel-carpiano",
  "nombre": "Signo de Tinel carpiano",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Percusión del mediano sobre el túnel carpiano.",
  "referencias": [
   "Paciente con antebrazo apoyado y palma arriba.",
   "Evaluador da pequeños golpes suaves sobre cara palmar del carpo."
  ],
  "relaciones": [
   "Parestesias hacia pulgar, índice o medio son relevantes.",
   "La molestia solamente donde se percute no confirma compresión."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Suspender al reproducir síntomas; integrar historia nocturna y examen neurológico."
  ],
  "fuentes": [
   "Stanford Medicine 25: Carpal Tunnel Exam — https://stanfordmedicine25.stanford.edu/the25/carpaltunnel.html",
   "American Family Physician: Carpal Tunnel Syndrome — https://www.aafp.org/afp/2024/0600/pocg-carpal-tunnel-syndrome"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-compresion-carpiana-de-durkan",
  "nombre": "Prueba de compresión carpiana de Durkan",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Provocación mediante presión sobre el túnel carpiano.",
  "referencias": [
   "Paciente sentado, muñeca apoyada y relajada.",
   "Evaluador comprime suavemente sobre el mediano en el carpo, hasta 30 segundos según tolerancia."
  ],
  "relaciones": [
   "Reproducción de parestesias medianas es concordante.",
   "No informa por sí sola la gravedad del daño nervioso."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No prolongar la compresión; pérdida de fuerza o atrofia tenar requieren derivación."
  ],
  "fuentes": [
   "Stanford Medicine 25: Carpal Tunnel Exam — https://stanfordmedicine25.stanford.edu/the25/carpaltunnel.html",
   "American Family Physician: Carpal Tunnel Syndrome — https://www.aafp.org/afp/2024/0600/pocg-carpal-tunnel-syndrome"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-finkelstein",
  "nombre": "Prueba de Finkelstein",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Explora dolor en el primer compartimento extensor de la muñeca.",
  "referencias": [
   "Paciente con antebrazo apoyado; evaluador sostiene pulgar sin encerrarlo en el puño.",
   "Desviar suavemente la muñeca hacia el lado cubital sin tirón."
  ],
  "relaciones": [
   "Dolor localizado cerca de estiloides radial orienta a De Quervain.",
   "Participan tendones abductor largo y extensor corto del pulgar."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No confundir con Eichhoff, que coloca el pulgar dentro del puño; descartar fractura tras caída."
  ],
  "fuentes": [
   "StatPearls: Finkelstein Sign — https://www.ncbi.nlm.nih.gov/sites/books/NBK539768/",
   "Canadian Family Physician: Approach to chronic wrist pain in adults: Review of common pathologies for primary care practitioners — https://pmc.ncbi.nlm.nih.gov/articles/PMC11126282/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-allen",
  "nombre": "Prueba de Allen",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Se describe la variante modificada para observar circulación colateral de la mano.",
  "referencias": [
   "Paciente sentado; evaluador comprime arterias radial y cubital mientras abre y cierra la mano.",
   "Con mano abierta y relajada, liberar cubital manteniendo radial y observar reperfusión.",
   "Repetir para la otra arteria si está indicado."
  ],
  "relaciones": [
   "Recuperación del color sugiere perfusión por la arteria liberada.",
   "Reperfusión ausente o dudosa requiere comprobación objetiva."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Su fiabilidad es limitada; no autoriza sola una punción. Mano fría, pálida o dolorosa exige valoración urgente."
  ],
  "fuentes": [
   "StatPearls: Allen Test — https://www.ncbi.nlm.nih.gov/sites/books/NBK507816/",
   "Respiratory Care Education Annual: The Allen Test: A Historical Literature Review and Recommendation — https://www.aarc.org/wp-content/uploads/2015/05/rcea12.pdf"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-watson-inestabilidad-escafolunar",
  "nombre": "Prueba de Watson (inestabilidad escafolunar)",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Explora desplazamiento sintomático del escafoides.",
  "referencias": [
   "Paciente sentado, antebrazo apoyado; evaluador palpa tubérculo del escafoides por palma.",
   "Manteniendo presión controlada, mover de desviación cubital con extensión a radial con ligera flexión."
  ],
  "relaciones": [
   "Resalte doloroso concordante aumenta sospecha de inestabilidad escafolunar.",
   "Un resalte indoloro también puede existir en muñecas sanas."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Comparar ambos lados; evitar maniobra ante fractura sospechada. Dolor persistente tras caída requiere estudio."
  ],
  "fuentes": [
   "Canadian Family Physician: Approach to chronic wrist pain in adults: Review of common pathologies for primary care practitioners — https://pmc.ncbi.nlm.nih.gov/articles/PMC11126282/",
   "American Family Physician: A Clinical Approach to Diagnosing Wrist Pain — https://www.aafp.org/afp/2005/1101/p1753"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-signo-de-froment",
  "nombre": "Signo de Froment",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Observa compensación durante la pinza lateral del pulgar.",
  "referencias": [
   "Paciente sujeta papel entre pulgar e índice.",
   "Evaluador tira suavemente del papel mientras observa articulación interfalángica del pulgar."
  ],
  "relaciones": [
   "Flexionar la punta del pulgar compensa debilidad del aductor.",
   "Orienta a disfunción motora cubital sin localizarla por sí sola."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Dolor y lesión tendinosa modifican la pinza; completar fuerza y sensibilidad y derivar si progresa."
  ],
  "fuentes": [
   "Current Reviews in Musculoskeletal Medicine: Ulnar neuropathy: evaluation and management — https://pmc.ncbi.nlm.nih.gov/articles/PMC4896870/",
   "American Family Physician: Evaluation of Elbow Pain in Adults — https://www.aafp.org/afp/2014/0415/p649"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-molienda-grind-de-la-articulacion-carpometacarpiana-del-pulgar",
  "nombre": "Prueba de molienda (grind) de la articulación carpometacarpiana del pulgar",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Carga rotatoria suave de la base del primer metacarpiano.",
  "referencias": [
   "Paciente con mano apoyada; evaluador estabiliza trapecio.",
   "Sujetar primer metacarpiano, comprimir axialmente y rotar suavemente."
  ],
  "relaciones": [
   "Dolor habitual en la base del pulgar es relevante.",
   "Crepitación sin síntomas no basta para atribuir el dolor a artrosis."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Evitar en trauma reciente; un resultado negativo no excluye artrosis carpometacarpiana."
  ],
  "fuentes": [
   "Canadian Family Physician: Approach to chronic wrist pain in adults: Review of common pathologies for primary care practitioners — https://pmc.ncbi.nlm.nih.gov/articles/PMC11126282/",
   "American Family Physician: A Clinical Approach to Diagnosing Wrist Pain — https://www.aafp.org/afp/2005/1101/p1753"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-signo-de-wartenberg",
  "nombre": "Signo de Wartenberg",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Observa dificultad para acercar el meñique a los otros dedos.",
  "referencias": [
   "Paciente apoya mano con dedos extendidos.",
   "Evaluador pide juntar los dedos y compara posición del meñique."
  ],
  "relaciones": [
   "Abducción persistente puede reflejar debilidad de interóseos cubitales.",
   "Es distinto del síndrome sensitivo de Wartenberg del nervio radial."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Integrar con Froment y sensibilidad; descartar restricción articular antes de atribuirlo al nervio."
  ],
  "fuentes": [
   "Current Reviews in Musculoskeletal Medicine: Ulnar neuropathy: evaluation and management — https://pmc.ncbi.nlm.nih.gov/articles/PMC4896870/",
   "American Family Physician: Evaluation of Elbow Pain in Adults — https://www.aafp.org/afp/2014/0415/p649"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-palpacion-de-la-tabaquera-anatomica-escafoides",
  "nombre": "Palpación de la tabaquera anatómica (escafoides)",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Busca dolor radial tras traumatismo de muñeca.",
  "referencias": [
   "Paciente con antebrazo apoyado y pulgar extendido; evaluador identifica tabaquera.",
   "Palpar suavemente su fondo y comparar con mano contraria."
  ],
  "relaciones": [
   "Dolor después de una caída aumenta sospecha de fractura del escafoides.",
   "No distingue con certeza fractura de otras lesiones locales."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Radiografía inicial normal no descarta fractura oculta; proteger la muñeca y derivar si hay sospecha."
  ],
  "fuentes": [
   "Canadian Family Physician: Approach to chronic wrist pain in adults: Review of common pathologies for primary care practitioners — https://pmc.ncbi.nlm.nih.gov/articles/PMC11126282/",
   "American Family Physician: A Clinical Approach to Diagnosing Wrist Pain — https://www.aafp.org/afp/2005/1101/p1753"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-elevacion-de-la-pierna-recta-lasegue",
  "nombre": "Elevación de la pierna recta (Lasègue)",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Explora reproducción de dolor radicular con elevación pasiva.",
  "referencias": [
   "Paciente supino; evaluador sostiene talón y mantiene rodilla extendida.",
   "Elevar lentamente la pierna y registrar dolor habitual y recorrido."
  ],
  "relaciones": [
   "Dolor irradiado concordante importa más que tensión posterior del muslo.",
   "Se exploran principalmente raíces lumbosacras inferiores."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No forzar; debilidad progresiva o alteración esfinteriana requieren evaluación urgente."
  ],
  "fuentes": [
   "World Neurosurgery X: Lumbar disc herniation: Epidemiology, clinical and radiologic diagnosis WFNS spine committee recommendations — https://pmc.ncbi.nlm.nih.gov/articles/PMC10911853/",
   "Journal of Clinical Medicine: Recommendations for Diagnosis and Treatment of Lumbosacral Radicular Pain: A Systematic Review of Clinical Practice Guidelines — https://pmc.ncbi.nlm.nih.gov/articles/PMC8200038/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-elevacion-de-la-pierna-recta-cruzada",
  "nombre": "Elevación de la pierna recta cruzada",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Busca síntomas en la pierna afectada al elevar la contraria.",
  "referencias": [
   "Paciente supino, ambas rodillas extendidas.",
   "Evaluador eleva pasivamente la pierna menos sintomática y pregunta por la otra."
  ],
  "relaciones": [
   "Reproducción de dolor en la pierna contraria elevada es el hallazgo cruzado.",
   "Tensión del muslo elevado no constituye un resultado cruzado positivo."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Combinar con fuerza, sensibilidad y reflejos; no repetir si aumenta el déficit."
  ],
  "fuentes": [
   "World Neurosurgery X: Lumbar disc herniation: Epidemiology, clinical and radiologic diagnosis WFNS spine committee recommendations — https://pmc.ncbi.nlm.nih.gov/articles/PMC10911853/",
   "Journal of Clinical Medicine: Recommendations for Diagnosis and Treatment of Lumbosacral Radicular Pain: A Systematic Review of Clinical Practice Guidelines — https://pmc.ncbi.nlm.nih.gov/articles/PMC8200038/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-slump",
  "nombre": "Prueba de slump",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Explora mecanosensibilidad neural con movimientos secuenciales.",
  "referencias": [
   "Paciente sentado al borde de camilla; evaluador acompaña flexión de tronco y cuello sin empujar.",
   "Añadir extensión de rodilla y dorsiflexión toleradas.",
   "Liberar flexión cervical y observar cambio del síntoma."
  ],
  "relaciones": [
   "Dolor habitual que cambia al modificar tensión neural puede ser concordante.",
   "Tirantez aislada es común y no prueba radiculopatía."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No estirar agresivamente; combinar con examen neurológico y otros hallazgos."
  ],
  "fuentes": [
   "AAPM&R: Lumbar Radiculopathy — https://now.aapmr.org/lumbar-radiculopathy/",
   "Journal of Clinical Medicine: Recommendations for Diagnosis and Treatment of Lumbosacral Radicular Pain: A Systematic Review of Clinical Practice Guidelines — https://pmc.ncbi.nlm.nih.gov/articles/PMC8200038/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-signo-de-bragard",
  "nombre": "Signo de Bragard",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Modificación de la elevación de pierna recta mediante dorsiflexión.",
  "referencias": [
   "Paciente supino; evaluador eleva pierna extendida hasta síntomas tolerables.",
   "Bajar ligeramente hasta alivio y añadir dorsiflexión suave del tobillo."
  ],
  "relaciones": [
   "Reaparición de dolor irradiado habitual apoya mecanosensibilidad.",
   "El estiramiento aislado de pantorrilla tiene otra interpretación."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Evidencia diagnóstica limitada; no identifica por sí solo una hernia."
  ],
  "fuentes": [
   "World Neurosurgery X: Lumbar disc herniation: Epidemiology, clinical and radiologic diagnosis WFNS spine committee recommendations — https://pmc.ncbi.nlm.nih.gov/articles/PMC10911853/",
   "AAPM&R: Lumbar Radiculopathy — https://now.aapmr.org/lumbar-radiculopathy/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-kemp",
  "nombre": "Prueba de Kemp",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Provocación lumbar combinando extensión e inclinación/rotación.",
  "referencias": [
   "Paciente de pie con apoyo; evaluador se sitúa al lado para seguridad.",
   "Guiar un movimiento pequeño hacia extensión e inclinación/rotación del lado explorado."
  ],
  "relaciones": [
   "Registrar localización y reproducción del dolor.",
   "El dolor provocado no identifica de forma fiable una articulación facetaria."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No usar para confirmar dolor facetario; evitar si hay trauma, osteoporosis con sospecha de fractura o síntomas neurológicos crecientes."
  ],
  "fuentes": [
   "JCCA: The diagnostic accuracy of the Kemp’s test: a systematic review — https://chiropractic.ca/wp-content/uploads/2014/08/86926-1_Chiro_58_3g_Stuber.pdf",
   "AAPM&R: Lumbar Radiculopathy — https://now.aapmr.org/lumbar-radiculopathy/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-schober-modificada",
  "nombre": "Prueba de Schober modificada",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Medición indirecta de excursión cutánea durante flexión lumbar.",
  "referencias": [
   "Paciente de pie; evaluador marca referencia lumbosacra, 10 cm arriba y 5 cm abajo.",
   "Pedir flexión anterior tolerada sin flexionar rodillas y medir cambio entre marcas."
  ],
  "relaciones": [
   "Se registra aumento de distancia respecto a los 15 cm iniciales.",
   "Mide una aproximación de movilidad, no la causa de restricción."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Registrar variante y puntos anatómicos: no confundir con Schober modificado-modificado ni diagnosticar espondiloartritis solo con esta medida."
  ],
  "fuentes": [
   "Journal of Chiropractic Medicine: Interrater Reliability of Spine Range of Motion Measurement Using a Tape Measure and Goniometer — https://pmc.ncbi.nlm.nih.gov/articles/PMC9023132/",
   "AAPM&R: Lumbar Radiculopathy — https://now.aapmr.org/lumbar-radiculopathy/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-patrick-faber",
  "nombre": "Prueba de Patrick (FABER)",
  "tipo": "prueba",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Explora dolor y movilidad con cadera en figura de cuatro.",
  "referencias": [
   "Paciente supino; evaluador coloca tobillo sobre muslo contrario.",
   "Estabilizar pelvis opuesta y descender suavemente la rodilla flexionada."
  ],
  "relaciones": [
   "Dolor inguinal orienta a explorar cadera.",
   "Dolor posterior orienta a completar evaluación sacroilíaca."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No distingue una lesión concreta; evitar presión forzada o restricciones posoperatorias."
  ],
  "fuentes": [
   "Sports Health: Physical Examination of the Hip — https://pmc.ncbi.nlm.nih.gov/articles/PMC8167346/",
   "American Family Physician: Sacroiliac Joint Dysfunction: Diagnosis and Treatment — https://www.aafp.org/afp/2022/0300/p239"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-gaenslen",
  "nombre": "Prueba de Gaenslen",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Provoca carga asimétrica sobre la pelvis.",
  "referencias": [
   "Paciente supino cerca del borde, una cadera flexionada hacia tronco.",
   "Evaluador sostiene pierna contraria en extensión tolerada fuera de la camilla y estabiliza ambas."
  ],
  "relaciones": [
   "Dolor posterior habitual puede apoyar origen sacroilíaco.",
   "No demuestra desplazamiento ni una pelvis fuera de lugar."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Combinar con otras provocaciones; evitar dolor púbico, trauma o condiciones que impidan la posición."
  ],
  "fuentes": [
   "American Family Physician: Sacroiliac Joint Dysfunction: Diagnosis and Treatment — https://www.aafp.org/afp/2022/0300/p239",
   "Video Journal of Sports Medicine: Comprehensive Physical Examination of the Hip — https://pmc.ncbi.nlm.nih.gov/articles/PMC11959467/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-empuje-del-muslo-thigh-thrust",
  "nombre": "Prueba de empuje del muslo (thigh thrust)",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Provocación controlada de dolor posterior pélvico.",
  "referencias": [
   "Paciente supino, cadera flexionada aproximadamente a 90°.",
   "Evaluador estabiliza sacro y transmite presión posterior gradual por el eje del fémur."
  ],
  "relaciones": [
   "Reproducción de dolor posterior concordante es relevante.",
   "Dolor anterior de cadera requiere interpretación diferente."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Es presión diagnóstica controlada, sin impulso manipulativo; combinar con otras pruebas y descartar fractura."
  ],
  "fuentes": [
   "American Family Physician: Sacroiliac Joint Dysfunction: Diagnosis and Treatment — https://www.aafp.org/afp/2022/0300/p239",
   "Current Reviews in Musculoskeletal Medicine: Physical Examination of the Hip: Assessment of Femoroacetabular Impingement, Labral Pathology, and Microinstability — https://pmc.ncbi.nlm.nih.gov/articles/PMC9076795/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-trendelenburg",
  "nombre": "Prueba de Trendelenburg",
  "tipo": "prueba",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Observa control pélvico en apoyo de una pierna.",
  "referencias": [
   "Paciente de pie junto a apoyo estable; evaluador vigila pelvis desde atrás.",
   "Elevar un pie y observar pelvis e inclinación de tronco; comparar lados."
  ],
  "relaciones": [
   "Caída de pelvis del lado elevado puede reflejar insuficiencia abductora del lado de apoyo.",
   "El dolor y las compensaciones también afectan el resultado."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Prevenir caídas; no identifica por sí sola lesión del glúteo ni del nervio."
  ],
  "fuentes": [
   "Video Journal of Sports Medicine: Comprehensive Physical Examination of the Hip — https://pmc.ncbi.nlm.nih.gov/articles/PMC11959467/",
   "Sports Health: Physical Examination of the Hip — https://pmc.ncbi.nlm.nih.gov/articles/PMC8167346/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-extension-de-rodilla-en-prono-nervio-femoral",
  "nombre": "Prueba de extensión de rodilla en prono (nervio femoral)",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "El nombre solicitado requiere corrección: el estiramiento femoral en prono utiliza flexión de rodilla, no extensión.",
  "referencias": [
   "Paciente boca abajo; evaluador estabiliza pelvis.",
   "Flexionar pasivamente la rodilla con suavidad y registrar síntomas anteriores del muslo."
  ],
  "relaciones": [
   "Dolor irradiado habitual puede orientar a raíces lumbares altas o nervio femoral.",
   "La tirantez del cuádriceps no confirma compromiso neural."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No forzar flexión ni extensión de cadera; completar examen neurológico y descartar enfermedad de cadera."
  ],
  "fuentes": [
   "AAPM&R: Lumbar Radiculopathy — https://now.aapmr.org/lumbar-radiculopathy/",
   "World Neurosurgery X: Lumbar disc herniation: Epidemiology, clinical and radiologic diagnosis WFNS spine committee recommendations — https://pmc.ncbi.nlm.nih.gov/articles/PMC10911853/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-valoracion-de-la-diastasis-abdominal",
  "nombre": "Valoración de la diástasis abdominal",
  "tipo": "prueba",
  "zona": "core",
  "nombres": [],
  "descripcion": "Valora separación de rectos y comportamiento de la pared abdominal.",
  "referencias": [
   "Con consentimiento, paciente supino con rodillas flexionadas; evaluador observa línea media.",
   "Palpar separación en reposo y al elevar levemente cabeza, registrando sitio y método."
  ],
  "relaciones": [
   "Una separación palpable es una observación que debe contextualizarse.",
   "Anchura y síntomas no son equivalentes; explorar función y posible hernia."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "La palpación es aproximada; confirmar con ecografía si se requiere precisión. Bulto doloroso no reducible o vómito exigen valoración urgente."
  ],
  "fuentes": [
   "StatPearls: Diastasis Recti Rehabilitation — https://www.ncbi.nlm.nih.gov/sites/books/NBK573063/",
   "Cleveland Clinic: Diastasis Recti (Abdominal Separation) — https://my.clevelandclinic.org/health/diseases/22346-diastasis-recti"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-thomas",
  "nombre": "Prueba de Thomas",
  "tipo": "prueba",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Explora limitación de extensión de cadera.",
  "referencias": [
   "Paciente supino; evaluador controla pelvis y posición lumbar.",
   "Flexionar una cadera hacia pecho y observar si el muslo opuesto se eleva."
  ],
  "relaciones": [
   "La elevación opuesta sugiere limitación de extensión.",
   "La inclinación pélvica puede alterar la observación."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No atribuir el hallazgo exclusivamente al psoas; comparar movilidad y tolerancia."
  ],
  "fuentes": [
   "Video Journal of Sports Medicine: Comprehensive Physical Examination of the Hip — https://pmc.ncbi.nlm.nih.gov/articles/PMC11959467/",
   "HSS Journal: The Telemedicine-Based Pediatric Examination of the Back and Lower Limbs: A Narrative Review — https://pmc.ncbi.nlm.nih.gov/articles/PMC8464344/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-ober",
  "nombre": "Prueba de Ober",
  "tipo": "prueba",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Observa aducción pasiva con control de pelvis.",
  "referencias": [
   "Paciente de lado, pierna evaluada arriba; evaluador estabiliza pelvis.",
   "Llevar cadera superior a abducción y ligera extensión, luego permitir aducción suave."
  ],
  "relaciones": [
   "Aducción limitada describe una restricción de movilidad.",
   "No mide de forma aislada longitud de la banda iliotibial."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Registrar si se usó rodilla flexionada o extendida; no concluir síndrome de banda iliotibial solo por el resultado."
  ],
  "fuentes": [
   "Video Journal of Sports Medicine: Comprehensive Physical Examination of the Hip — https://pmc.ncbi.nlm.nih.gov/articles/PMC11959467/",
   "HSS Journal: The Telemedicine-Based Pediatric Examination of the Back and Lower Limbs: A Narrative Review — https://pmc.ncbi.nlm.nih.gov/articles/PMC8464344/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-fadir-pinzamiento-femoroacetabular",
  "nombre": "Prueba de FADIR (pinzamiento femoroacetabular)",
  "tipo": "prueba",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Provocación anterior mediante flexión, aducción y rotación interna.",
  "referencias": [
   "Paciente supino; evaluador sostiene rodilla y tobillo.",
   "Flexionar cadera y añadir aducción y rotación interna sin presión excesiva."
  ],
  "relaciones": [
   "Dolor inguinal habitual puede indicar origen intraarticular.",
   "No distingue por sí sola lesión labral de síndrome femoroacetabular."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Requiere síntomas, otros signos y estudios cuando corresponda; evitar cadera traumática no evaluada."
  ],
  "fuentes": [
   "Current Reviews in Musculoskeletal Medicine: Physical Examination of the Hip: Assessment of Femoroacetabular Impingement, Labral Pathology, and Microinstability — https://pmc.ncbi.nlm.nih.gov/articles/PMC9076795/",
   "HSS Journal: The Telemedicine-Based Pediatric Examination of the Back and Lower Limbs: A Narrative Review — https://pmc.ncbi.nlm.nih.gov/articles/PMC8464344/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-log-roll",
  "nombre": "Prueba de log roll",
  "tipo": "prueba",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Rotación pasiva de la cadera con pierna relajada.",
  "referencias": [
   "Paciente supino, pierna extendida; evaluador sostiene muslo y pierna.",
   "Rodar suavemente toda la extremidad hacia dentro y fuera."
  ],
  "relaciones": [
   "Dolor inguinal orienta a explorar una causa intraarticular.",
   "Registrar amplitud y comparación bilateral; no identifica por sí sola una lesión específica."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No realizar ante sospecha de fractura de cadera; el dolor aislado no identifica la estructura dañada."
  ],
  "fuentes": [
   "Sports Health: Physical Examination of the Hip — https://pmc.ncbi.nlm.nih.gov/articles/PMC8167346/",
   "Current Reviews in Musculoskeletal Medicine: Physical Examination of the Hip: Assessment of Femoroacetabular Impingement, Labral Pathology, and Microinstability — https://pmc.ncbi.nlm.nih.gov/articles/PMC9076795/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-scour",
  "nombre": "Prueba de scour",
  "tipo": "prueba",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Provocación intraarticular con arco de movimiento y compresión suave.",
  "referencias": [
   "Paciente supino; evaluador sostiene rodilla flexionada y pelvis.",
   "Mover cadera en arco desde flexión hacia abducción con carga axial controlada."
  ],
  "relaciones": [
   "Dolor inguinal o síntomas mecánicos concordantes justifican ampliar estudio.",
   "El chasquido indoloro no demuestra rotura labral."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Evitar fractura, irritabilidad intensa y restricciones posoperatorias; no forzar el arco."
  ],
  "fuentes": [
   "Current Reviews in Musculoskeletal Medicine: Physical Examination of the Hip: Assessment of Femoroacetabular Impingement, Labral Pathology, and Microinstability — https://pmc.ncbi.nlm.nih.gov/articles/PMC9076795/",
   "Video Journal of Sports Medicine: Comprehensive Physical Examination of the Hip — https://pmc.ncbi.nlm.nih.gov/articles/PMC11959467/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-ely",
  "nombre": "Prueba de Ely",
  "tipo": "prueba",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Observa flexibilidad anterior del muslo durante flexión de rodilla.",
  "referencias": [
   "Paciente prono; evaluador estabiliza pelvis.",
   "Flexionar lentamente rodilla y observar elevación de pelvis o flexión de cadera."
  ],
  "relaciones": [
   "Movimiento compensatorio puede sugerir restricción del recto femoral.",
   "Dolor anterior irradiado obliga a considerar componente neural."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No equiparar con prueba femoral positiva; evitar flexión forzada o rodilla aguda dolorosa."
  ],
  "fuentes": [
   "HSS Journal: The Telemedicine-Based Pediatric Examination of the Back and Lower Limbs: A Narrative Review — https://pmc.ncbi.nlm.nih.gov/articles/PMC8464344/",
   "Current Reviews in Musculoskeletal Medicine: Physical Examination of the Hip: Assessment of Femoroacetabular Impingement, Labral Pathology, and Microinstability — https://pmc.ncbi.nlm.nih.gov/articles/PMC9076795/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-lachman",
  "nombre": "Prueba de Lachman",
  "tipo": "prueba",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Explora traslación anterior tibial con poca flexión.",
  "referencias": [
   "Paciente supino, rodilla flexionada 20–30°; evaluador estabiliza fémur.",
   "Desplazar tibia proximal hacia delante y comparar tope y recorrido."
  ],
  "relaciones": [
   "Mayor traslación con tope blando apoya lesión del cruzado anterior.",
   "Comprobar posición inicial de tibia para evitar confusión por lesión posterior."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Dolor y defensa muscular reducen fiabilidad; descartar fractura y compromiso neurovascular en trauma."
  ],
  "fuentes": [
   "StatPearls: Lachman Test — https://www.ncbi.nlm.nih.gov/sites/books/NBK554415/",
   "American Family Physician: Evaluating Acutely Injured Patients for Internal Derangement of the Knee — https://www.aafp.org/afp/2012/0201/p247"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-del-cajon-anterior",
  "nombre": "Prueba del cajón anterior",
  "tipo": "prueba",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Explora estabilidad anterior tibiofemoral a 90° de flexión.",
  "referencias": [
   "Paciente supino, rodilla a 90° y pie apoyado; evaluador verifica relajación.",
   "Sujetar tibia proximal y traccionar hacia delante, comparando ambos lados."
  ],
  "relaciones": [
   "Traslación aumentada o tope alterado orientan al cruzado anterior.",
   "Hundimiento posterior inicial puede producir falsa apariencia de cajón anterior."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No forzar rodilla inflamada; combinar con Lachman y evaluación de otras estructuras."
  ],
  "fuentes": [
   "StatPearls: Lachman Test — https://www.ncbi.nlm.nih.gov/sites/books/NBK554415/",
   "North American Journal of Sports Physical Therapy: Physical Examination and Imaging of the Acute Multiple Ligament Knee Injury — https://pmc.ncbi.nlm.nih.gov/articles/PMC2953340/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-pivot-shift",
  "nombre": "Prueba de pivot shift",
  "tipo": "prueba",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Explora inestabilidad rotatoria asociada al cruzado anterior.",
  "referencias": [
   "Paciente supino y relajado; evaluador entrenado sostiene pierna.",
   "Desde extensión tolerada, combinar rotación interna tibial, valgo suave y flexión progresiva."
  ],
  "relaciones": [
   "Resalte de reducción del compartimento lateral es relevante.",
   "Defensa muscular puede ocultar el hallazgo."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Maniobra profesional; evitar provocación intensa en fase aguda o lesión multiligamentaria sospechada."
  ],
  "fuentes": [
   "StatPearls: Lachman Test — https://www.ncbi.nlm.nih.gov/sites/books/NBK554415/",
   "American Family Physician: Evaluating Acutely Injured Patients for Internal Derangement of the Knee — https://www.aafp.org/afp/2012/0201/p247"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-del-cajon-posterior",
  "nombre": "Prueba del cajón posterior",
  "tipo": "prueba",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Explora resistencia al desplazamiento posterior tibial.",
  "referencias": [
   "Paciente supino, rodilla a 90° y pie estabilizado.",
   "Evaluador observa posición tibial inicial y aplica presión posterior sobre tibia proximal."
  ],
  "relaciones": [
   "Traslación excesiva o tope blando orienta al cruzado posterior.",
   "Comparar con lado opuesto y otras pruebas de estabilidad."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Tras trauma importante revisar pulsos y sensibilidad; una luxación puede haberse reducido espontáneamente."
  ],
  "fuentes": [
   "North American Journal of Sports Physical Therapy: Physical Examination and Imaging of the Acute Multiple Ligament Knee Injury — https://pmc.ncbi.nlm.nih.gov/articles/PMC2953340/",
   "Kansas Journal of Medicine: The Rules of Four: A Systematic Approach to Diagnosing Common Musculoskeletal Conditions of the Knee — https://pmc.ncbi.nlm.nih.gov/articles/PMC7746119/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-signo-del-hundimiento-sag-sign",
  "nombre": "Signo del hundimiento (sag sign)",
  "tipo": "prueba",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Observa descenso posterior de la tibia por gravedad.",
  "referencias": [
   "Paciente supino con caderas y rodillas flexionadas; evaluador sostiene talones.",
   "Comparar perfil anterior de ambas tibias sin empujar."
  ],
  "relaciones": [
   "Pérdida del escalón tibial anterior puede sugerir lesión del cruzado posterior.",
   "La comparación bilateral ayuda a reconocer asimetría."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Confirmar posición y complementar con cajón posterior; trauma con pie frío o déficit requiere urgencias."
  ],
  "fuentes": [
   "North American Journal of Sports Physical Therapy: Physical Examination and Imaging of the Acute Multiple Ligament Knee Injury — https://pmc.ncbi.nlm.nih.gov/articles/PMC2953340/",
   "Kansas Journal of Medicine: The Rules of Four: A Systematic Approach to Diagnosing Common Musculoskeletal Conditions of the Knee — https://pmc.ncbi.nlm.nih.gov/articles/PMC7746119/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-estres-en-valgo-de-la-rodilla",
  "nombre": "Estrés en valgo de la rodilla",
  "tipo": "prueba",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Explora estabilidad medial tibiofemoral.",
  "referencias": [
   "Paciente supino; evaluador estabiliza muslo y sujeta tobillo.",
   "Aplicar valgo suave con rodilla algo flexionada y, si procede, en extensión."
  ],
  "relaciones": [
   "Apertura medial aumentada orienta a complejo colateral medial.",
   "Apertura también en extensión hace considerar lesión más extensa."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No graduar una rotura solo por dolor; evitar carga si se sospecha fractura."
  ],
  "fuentes": [
   "North American Journal of Sports Physical Therapy: Physical Examination and Imaging of the Acute Multiple Ligament Knee Injury — https://pmc.ncbi.nlm.nih.gov/articles/PMC2953340/",
   "Kansas Journal of Medicine: The Rules of Four: A Systematic Approach to Diagnosing Common Musculoskeletal Conditions of the Knee — https://pmc.ncbi.nlm.nih.gov/articles/PMC7746119/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-estres-en-varo-de-la-rodilla",
  "nombre": "Estrés en varo de la rodilla",
  "tipo": "prueba",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Explora estabilidad lateral tibiofemoral.",
  "referencias": [
   "Paciente supino; evaluador sostiene muslo y tobillo.",
   "Aplicar varo suave con ligera flexión y comparar con extensión si es seguro."
  ],
  "relaciones": [
   "Apertura lateral excesiva orienta al complejo colateral lateral.",
   "Laxitud en extensión sugiere valorar estructuras adicionales."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Completar evaluación posterolateral y neurovascular; no forzar en trauma agudo."
  ],
  "fuentes": [
   "North American Journal of Sports Physical Therapy: Physical Examination and Imaging of the Acute Multiple Ligament Knee Injury — https://pmc.ncbi.nlm.nih.gov/articles/PMC2953340/",
   "Kansas Journal of Medicine: The Rules of Four: A Systematic Approach to Diagnosing Common Musculoskeletal Conditions of the Knee — https://pmc.ncbi.nlm.nih.gov/articles/PMC7746119/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-mcmurray",
  "nombre": "Prueba de McMurray",
  "tipo": "prueba",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Provocación meniscal con flexión, rotación y extensión.",
  "referencias": [
   "Paciente supino; evaluador palpa interlínea y sostiene talón con rodilla flexionada.",
   "Rotar tibia y extender progresivamente, explorando ambos compartimentos sin fuerza."
  ],
  "relaciones": [
   "Dolor de interlínea con resalte concordante aumenta sospecha meniscal.",
   "Chasquidos indoloros no confirman rotura."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Rodilla bloqueada o muy inflamada requiere valoración; un resultado negativo no excluye lesión."
  ],
  "fuentes": [
   "Joints: Clinical examination of the knee: know your tools for diagnosis of knee injuries — https://pmc.ncbi.nlm.nih.gov/articles/PMC3213012/",
   "American Family Physician: Evaluating Acutely Injured Patients for Internal Derangement of the Knee — https://www.aafp.org/afp/2012/0201/p247"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-apley-compresion-y-distraccion",
  "nombre": "Prueba de Apley (compresión y distracción)",
  "tipo": "prueba",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Compara síntomas con carga y descarga rotatoria de rodilla.",
  "referencias": [
   "Paciente prono con rodilla a 90°; evaluador estabiliza muslo.",
   "Aplicar compresión axial suave y rotación tibial.",
   "Comparar con tracción longitudinal suave y rotación."
  ],
  "relaciones": [
   "Dolor con compresión puede orientar a menisco.",
   "Dolor con distracción puede implicar estructuras capsuloligamentosas, sin aislarlas."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No usar esta comparación para confirmar una lesión específica; evitar fase aguda muy irritable."
  ],
  "fuentes": [
   "Joints: Clinical examination of the knee: know your tools for diagnosis of knee injuries — https://pmc.ncbi.nlm.nih.gov/articles/PMC3213012/",
   "Orthopaedic Journal of Sports Medicine: The Trapped Medial Meniscus Tear: An Examination Maneuver Helps Predict Arthroscopic Findings — https://journals.sagepub.com/doi/pdf/10.1177/2325967115583954"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-thessaly",
  "nombre": "Prueba de Thessaly",
  "tipo": "prueba",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Provocación meniscal en apoyo con giro controlado.",
  "referencias": [
   "Paciente de pie con evaluador ofreciendo apoyo firme.",
   "Flexionar ligeramente rodilla de apoyo y girar tronco/pelvis de forma pequeña a ambos lados."
  ],
  "relaciones": [
   "Dolor habitual de interlínea o bloqueo es relevante.",
   "Dolor general de rodilla es inespecífico."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Omitir si no tolera carga, tiene inestabilidad o riesgo de caída; no insistir en flexión dolorosa."
  ],
  "fuentes": [
   "American Family Physician: Evaluating Acutely Injured Patients for Internal Derangement of the Knee — https://www.aafp.org/afp/2012/0201/p247",
   "Orthopaedic Journal of Sports Medicine: The Trapped Medial Meniscus Tear: An Examination Maneuver Helps Predict Arthroscopic Findings — https://journals.sagepub.com/doi/pdf/10.1177/2325967115583954"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-ege",
  "nombre": "Prueba de Ege",
  "tipo": "prueba",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Sentadilla con variantes de rotación para explorar síntomas meniscales.",
  "referencias": [
   "Paciente de pie con apoyo de seguridad; evaluador observa.",
   "Realizar sentadilla tolerada con pies hacia fuera y, si es seguro, otra con pies hacia dentro."
  ],
  "relaciones": [
   "Dolor o resalte de interlínea se registra por lado y variante.",
   "Otras estructuras también pueden doler en sentadilla."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No exigir sentadilla profunda ni realizar ante bloqueo, dolor agudo o mala tolerancia a carga."
  ],
  "fuentes": [
   "Orthopaedic Journal of Sports Medicine: The Trapped Medial Meniscus Tear: An Examination Maneuver Helps Predict Arthroscopic Findings — https://journals.sagepub.com/doi/pdf/10.1177/2325967115583954",
   "Joints: Clinical examination of the knee: know your tools for diagnosis of knee injuries — https://pmc.ncbi.nlm.nih.gov/articles/PMC3213012/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-clarke-compresion-patelar",
  "nombre": "Prueba de Clarke (compresión patelar)",
  "tipo": "prueba",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Maniobra histórica de provocación femoropatelar con utilidad diagnóstica limitada.",
  "referencias": [
   "Paciente supino, rodilla extendida y cuádriceps relajado.",
   "Evaluador aplica restricción suave sobre polo superior de rótula y pide una contracción leve; detener si duele."
  ],
  "relaciones": [
   "El dolor provocado no confirma condromalacia.",
   "Personas sin patología también pueden tener dolor con la maniobra."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No se recomienda como confirmación aislada ni repetirla para provocar dolor; preferir evaluación funcional y clínica completa."
  ],
  "fuentes": [
   "Journal of Athletic Training: The Diagnostic Value of the Clarke Sign in Assessing Chondromalacia Patella — https://pmc.ncbi.nlm.nih.gov/articles/PMC2267328/",
   "American Family Physician: Patellofemoral Pain Syndrome — https://www.aafp.org/afp/2019/0115/p88"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-aprension-patelar",
  "nombre": "Prueba de aprensión patelar",
  "tipo": "prueba",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Explora temor a luxación lateral de la rótula.",
  "referencias": [
   "Paciente supino, rodilla ligeramente flexionada; evaluador sostiene rótula.",
   "Desplazarla lateralmente de forma suave observando respuesta."
  ],
  "relaciones": [
   "Aprensión, contracción defensiva o sensación de salida son relevantes.",
   "Dolor anterior aislado no demuestra inestabilidad."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No intentar luxar; evitar después de luxación aguda sin estudio de lesiones asociadas."
  ],
  "fuentes": [
   "Joints: Clinical examination of the knee: know your tools for diagnosis of knee injuries — https://pmc.ncbi.nlm.nih.gov/articles/PMC3213012/",
   "Kansas Journal of Medicine: The Rules of Four: A Systematic Approach to Diagnosing Common Musculoskeletal Conditions of the Knee — https://pmc.ncbi.nlm.nih.gov/articles/PMC7746119/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-peloteo-patelar-y-signo-de-la-oleada-derrame",
  "nombre": "Peloteo patelar y signo de la oleada (derrame)",
  "tipo": "prueba",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Exploran líquido intraarticular con dos maniobras complementarias.",
  "referencias": [
   "Paciente supino con cuádriceps relajado.",
   "Para peloteo, evaluador desplaza líquido suprapatelar y presiona suavemente rótula.",
   "Para oleada, barrer líquido de un lado y observar abombamiento al movilizarlo del otro."
  ],
  "relaciones": [
   "Peloteo puede aparecer en derrames mayores.",
   "Oleada puede hacer visibles cantidades pequeñas de líquido."
  ],
  "lesiones": [
   "Derrame traumático o por lesión interna.",
   "Derrame inflamatorio o infeccioso, según contexto."
  ],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Rodilla caliente, muy dolorosa y con fiebre necesita valoración urgente; no identifica la causa del líquido."
  ],
  "fuentes": [
   "StatPearls: Knee Effusion — https://www.ncbi.nlm.nih.gov/sites/books/NBK532279/",
   "Joints: Clinical examination of the knee: know your tools for diagnosis of knee injuries — https://pmc.ncbi.nlm.nih.gov/articles/PMC3213012/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-del-cajon-anterior-del-tobillo",
  "nombre": "Prueba del cajón anterior del tobillo",
  "tipo": "prueba",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Explora laxitud anterior del astrágalo.",
  "referencias": [
   "Paciente sentado o supino, rodilla relajada y tobillo en ligera flexión plantar.",
   "Evaluador estabiliza tibia y desplaza retropié hacia delante."
  ],
  "relaciones": [
   "Mayor traslación o tope alterado orienta a lesión ligamentaria lateral.",
   "Comparar lados y registrar dolor por separado."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Descartar fractura; la defensa muscular aguda limita interpretación."
  ],
  "fuentes": [
   "Journal of Chiropractic Medicine: Physical Examination of the Ankle: A Review of the Original Orthopedic Special Test Description and Scientific Validity of Common Tests for Ankle Examination — https://pmc.ncbi.nlm.nih.gov/articles/PMC7853358/",
   "HSS Journal: The Telemedicine-Based Pediatric Examination of the Back and Lower Limbs: A Narrative Review — https://pmc.ncbi.nlm.nih.gov/articles/PMC8464344/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-inclinacion-talar",
  "nombre": "Prueba de inclinación talar",
  "tipo": "prueba",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Explora laxitud lateral mediante inclinación del retropié.",
  "referencias": [
   "Paciente sentado o supino; evaluador estabiliza tibia distal.",
   "Sujetar calcáneo y aplicar inversión suave con tobillo controlado."
  ],
  "relaciones": [
   "Inclinación aumentada puede orientar al complejo lateral, incluido calcaneofibular.",
   "El dolor aislado no cuantifica laxitud."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Comparar lados; no invertir con fuerza una lesión aguda sin descartar fractura."
  ],
  "fuentes": [
   "Journal of Chiropractic Medicine: Physical Examination of the Ankle: A Review of the Original Orthopedic Special Test Description and Scientific Validity of Common Tests for Ankle Examination — https://pmc.ncbi.nlm.nih.gov/articles/PMC7853358/",
   "HSS Journal: The Telemedicine-Based Pediatric Examination of the Back and Lower Limbs: A Narrative Review — https://pmc.ncbi.nlm.nih.gov/articles/PMC8464344/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-compresion-de-la-pierna-squeeze",
  "nombre": "Prueba de compresión de la pierna (squeeze)",
  "tipo": "prueba",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Explora síntomas distales de sindesmosis al comprimir la pierna.",
  "referencias": [
   "Paciente sentado; evaluador sostiene pierna relajada.",
   "Comprimir suavemente tibia y fíbula a nivel proximal/medio, lejos de lesión local."
  ],
  "relaciones": [
   "Dolor referido a sindesmosis distal es concordante.",
   "Dolor solo donde se comprime no equivale a prueba positiva."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No comprimir si se sospecha fractura; un resultado negativo no descarta lesión sindesmótica."
  ],
  "fuentes": [
   "Journal of Chiropractic Medicine: Physical Examination of the Ankle: A Review of the Original Orthopedic Special Test Description and Scientific Validity of Common Tests for Ankle Examination — https://pmc.ncbi.nlm.nih.gov/articles/PMC7853358/",
   "HSS Journal: The Telemedicine-Based Pediatric Examination of the Back and Lower Limbs: A Narrative Review — https://pmc.ncbi.nlm.nih.gov/articles/PMC8464344/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-rotacion-externa-kleiger",
  "nombre": "Prueba de rotación externa (Kleiger)",
  "tipo": "prueba",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Provocación controlada del tobillo mediante rotación externa.",
  "referencias": [
   "Paciente sentado, rodilla flexionada; evaluador estabiliza tibia distal.",
   "Sostener pie y aplicar rotación externa suave con tobillo en posición documentada."
  ],
  "relaciones": [
   "Dolor sindesmótico distal orienta a explorar sindesmosis.",
   "Dolor medial puede implicar complejo deltoideo; no es equivalente."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Existen variantes bajo el mismo epónimo; registrar posición y dolor. Evitar si se sospecha fractura."
  ],
  "fuentes": [
   "Journal of Chiropractic Medicine: Physical Examination of the Ankle: A Review of the Original Orthopedic Special Test Description and Scientific Validity of Common Tests for Ankle Examination — https://pmc.ncbi.nlm.nih.gov/articles/PMC7853358/",
   "HSS Journal: The Telemedicine-Based Pediatric Examination of the Back and Lower Limbs: A Narrative Review — https://pmc.ncbi.nlm.nih.gov/articles/PMC8464344/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-thompson",
  "nombre": "Prueba de Thompson",
  "tipo": "prueba",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Observa respuesta del pie al comprimir pantorrilla para explorar continuidad del Aquiles.",
  "referencias": [
   "Paciente prono, pies fuera del borde; evaluador observa ambos tobillos.",
   "Comprimir suavemente pantorrilla y comparar flexión plantar."
  ],
  "relaciones": [
   "Ausencia o reducción clara de flexión plantar sugiere rotura.",
   "Conservar movimiento activo del pie no excluye lesión del tendón."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Sospecha de rotura requiere protección y valoración pronta; no probar saltos ni estirar el tendón."
  ],
  "fuentes": [
   "StatPearls: Achilles Tendon Rupture — https://www.ncbi.nlm.nih.gov/sites/books/NBK430844/",
   "Journal of Chiropractic Medicine: Physical Examination of the Ankle: A Review of the Original Orthopedic Special Test Description and Scientific Validity of Common Tests for Ankle Examination — https://pmc.ncbi.nlm.nih.gov/articles/PMC7853358/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-del-cabrestante-windlass",
  "nombre": "Prueba del cabrestante (windlass)",
  "tipo": "prueba",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Provoca tensión de la fascia plantar al extender el dedo gordo.",
  "referencias": [
   "Paciente sentado, pie relajado; evaluador estabiliza retropié.",
   "Extender pasivamente primera articulación metatarsofalángica y preguntar por dolor plantar."
  ],
  "relaciones": [
   "Dolor habitual cerca del talón medial es concordante.",
   "El mecanismo de cabrestante tensa fascia y eleva arco."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Un resultado negativo no excluye fasciopatía; distinguir de la nueva variante Windlass Shield, no descrita aquí."
  ],
  "fuentes": [
   "Muscles, Ligaments and Tendons Journal: Plantar fasciitis in athletes: diagnostic and treatment strategies. A systematic review — https://pmc.ncbi.nlm.nih.gov/articles/PMC5505577/",
   "Foot & Ankle Orthopaedics: Windlass Shield Test, A Novel Test for Detection of Plantar Fasciitis: A Proof of Concept Study on 45 Patients — https://journals.sagepub.com/doi/full/10.1177/24730114261486025"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-silfverskiold",
  "nombre": "Prueba de Silfverskiöld",
  "tipo": "prueba",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Compara dorsiflexión con rodilla extendida y flexionada.",
  "referencias": [
   "Paciente supino; evaluador estabiliza retropié y mediopié para evitar compensación.",
   "Medir dorsiflexión con rodilla extendida y repetir flexionada."
  ],
  "relaciones": [
   "Mejoría al flexionar orienta a contribución del gastrocnemio.",
   "Restricción en ambas posiciones puede involucrar otras estructuras."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No forzar el mediopié ni interpretar un único límite angular como universal."
  ],
  "fuentes": [
   "Journal of the Foot & Ankle: Wrinkle sign for the Silfverskiöld test — https://jfootankle.com/JournalFootAnkle/article/view/1552",
   "Journal of Chiropractic Medicine: Physical Examination of the Ankle: A Review of the Original Orthopedic Special Test Description and Scientific Validity of Common Tests for Ankle Examination — https://pmc.ncbi.nlm.nih.gov/articles/PMC7853358/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-signo-de-tinel-del-tunel-tarsiano",
  "nombre": "Signo de Tinel del túnel tarsiano",
  "tipo": "prueba",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Explora irritabilidad del tibial en el tobillo medial.",
  "referencias": [
   "Paciente sentado, pie apoyado; evaluador identifica trayecto detrás del maléolo medial.",
   "Percutir suavemente y preguntar por irradiación plantar."
  ],
  "relaciones": [
   "Parestesia hacia planta es el hallazgo concordante.",
   "Dolor exclusivamente local tiene menor especificidad."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Resultado negativo no excluye atrapamiento; completar sensibilidad y considerar causas lumbares o sistémicas."
  ],
  "fuentes": [
   "StatPearls: Posterior Tarsal Tunnel Syndrome — https://www.ncbi.nlm.nih.gov/sites/books/NBK513273/",
   "AAPM&R: Lumbar Radiculopathy — https://now.aapmr.org/lumbar-radiculopathy/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-compresion-de-mulder-neuroma-de-morton",
  "nombre": "Prueba de compresión de Mulder (neuroma de Morton)",
  "tipo": "prueba",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Provoca síntomas interdigitales al comprimir antepié.",
  "referencias": [
   "Paciente sentado; evaluador sostiene cabezas metatarsales.",
   "Comprimir transversalmente y palpar con suavidad el espacio interdigital sintomático."
  ],
  "relaciones": [
   "Dolor eléctrico hacia dedos con resalte concordante orienta a neuroma interdigital.",
   "Un clic indoloro no confirma la lesión."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Diferenciar bursitis y lesión de placa plantar; no comprimir ante sospecha de fractura."
  ],
  "fuentes": [
   "StatPearls: Morton Neuroma — https://www.ncbi.nlm.nih.gov/sites/books/NBK470249/",
   "StatPearls: Posterior Tarsal Tunnel Syndrome — https://www.ncbi.nlm.nih.gov/sites/books/NBK513273/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-reglas-de-ottawa-para-tobillo-y-pie",
  "nombre": "Reglas de Ottawa para tobillo y pie",
  "tipo": "prueba",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Regla para orientar radiografías después de lesión aguda; no es una maniobra aislada.",
  "referencias": [
   "Evaluador identifica dolor en zona maleolar o mediopié.",
   "Palpar borde posterior y punta de ambos maléolos, navicular y base del quinto metatarsiano.",
   "Preguntar y observar capacidad de dar cuatro pasos inmediatamente tras lesión y en valoración, sin obligar."
  ],
  "relaciones": [
   "Dolor maleolar más sensibilidad ósea maleolar específica o incapacidad de cuatro pasos en ambos momentos orienta a radiografía de tobillo.",
   "Dolor de mediopié más sensibilidad navicular/base del quinto o incapacidad de cuatro pasos en ambos momentos orienta a radiografía de pie."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No aplicar fuera de su población/contexto validado o con sensibilidad/examen no fiables; deformidad o compromiso vascular requieren atención inmediata."
  ],
  "fuentes": [
   "American College Health Association: Application of Ottawa Ankle and Foot Rules for Acute Ankle Injury — https://portal.acha.org/documents/resources/survey_data/benchmarking/Ottawa_Ankle_Rules_background_instructions_worksheet.pdf",
   "Journal of Chiropractic Medicine: Physical Examination of the Ankle: A Review of the Original Orthopedic Special Test Description and Scientific Validity of Common Tests for Ankle Examination — https://pmc.ncbi.nlm.nih.gov/articles/PMC7853358/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-caida-del-navicular-navicular-drop",
  "nombre": "Prueba de caída del navicular (navicular drop)",
  "tipo": "prueba",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Mide cambio de altura del navicular al pasar a carga.",
  "referencias": [
   "Paciente sentado descalzo; evaluador identifica y marca tuberosidad navicular y registra altura.",
   "Pasar a bipedestación relajada segura y volver a medir con el mismo método."
  ],
  "relaciones": [
   "Diferencia de altura describe excursión del arco medial.",
   "No diagnostica por sí sola lesión ni predice inevitablemente una lesión futura."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Documentar posición inicial, carga y método; evitar un umbral universal y no exigir apoyo doloroso."
  ],
  "fuentes": [
   "Revista Andaluza de Medicina del Deporte: Test de descenso del navicular: Trabajo de revisión — https://ws154.juntadeandalucia.es/ojs/index.php/ramd/article/view/953",
   "Journal of Korean Physical Therapy Science: Inter- and Intra- Rater Reliability of Navicular Drop Tests Position — https://jkpts.co.kr/_PR/view/?aidx=21445&bidx=1734"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-romberg",
  "nombre": "Prueba de Romberg",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Compara estabilidad al retirar la información visual.",
  "referencias": [
   "Paciente de pie con pies juntos; evaluador se coloca muy cerca para impedir caída.",
   "Observar primero ojos abiertos y cerrar solo si la posición inicial es segura."
  ],
  "relaciones": [
   "Inestabilidad marcada al cerrar ojos tras estar estable abiertos es relevante.",
   "Inestabilidad ya con ojos abiertos requiere otra interpretación."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No es una prueba exclusiva del cerebelo ni elimina el sistema vestibular; desequilibrio súbito con otros signos requiere urgencias."
  ],
  "fuentes": [
   "StatPearls: Romberg Test — https://www.ncbi.nlm.nih.gov/sites/books/NBK563187/",
   "Open RN / NCBI Bookshelf: Chapter 6 Neurological Assessment — https://www.ncbi.nlm.nih.gov/sites/books/NBK596731/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-signo-de-babinski",
  "nombre": "Signo de Babinski",
  "tipo": "prueba",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Observa respuesta plantar para explorar vía corticoespinal.",
  "referencias": [
   "Paciente relajado con planta accesible.",
   "Evaluador usa objeto romo por borde lateral desde talón hacia antepié y curva medial, sin lastimar."
  ],
  "relaciones": [
   "Extensión del dedo gordo, a veces con apertura de otros dedos, es anormal en adulto.",
   "En lactantes la respuesta extensora puede ser fisiológica."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Distinguir retirada por cosquillas de respuesta extensora; hallazgo nuevo con debilidad súbita requiere urgencias."
  ],
  "fuentes": [
   "StatPearls: Babinski Reflex — https://www.ncbi.nlm.nih.gov/sites/books/NBK519009/",
   "StatPearls: Neuroanatomy, Upper Motor Neuron Signs — https://www.ncbi.nlm.nih.gov/sites/books/NBK541082/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-clonus-del-tobillo",
  "nombre": "Clonus del tobillo",
  "tipo": "prueba",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Busca oscilaciones rítmicas tras estiramiento breve.",
  "referencias": [
   "Paciente relajado; evaluador sostiene pierna y pie.",
   "Llevar tobillo rápidamente pero sin fuerza excesiva a dorsiflexión y sostener, observando oscilaciones."
  ],
  "relaciones": [
   "Registrar presencia, duración y simetría.",
   "Clonus sostenido en adulto orienta a investigar compromiso de vías motoras centrales."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No forzar tobillo lesionado; interpretar con tono y reflejos, y derivar ante hallazgo nuevo progresivo."
  ],
  "fuentes": [
   "StatPearls: Clonus — https://www.ncbi.nlm.nih.gov/sites/books/NBK534862/",
   "StatPearls: Neuroanatomy, Upper Motor Neuron Signs — https://www.ncbi.nlm.nih.gov/sites/books/NBK541082/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-reflejos-osteotendinosos-graduacion",
  "nombre": "Reflejos osteotendinosos (graduación)",
  "tipo": "prueba",
  "zona": "back",
  "nombres": [],
  "descripcion": "Explora respuesta muscular al golpe tendinoso.",
  "referencias": [
   "Paciente relajado; evaluador sostiene segmento y percute tendón con martillo.",
   "Comparar reflejos homólogos y registrar respuesta y asimetrías."
  ],
  "relaciones": [
   "Graduación habitual: 0 ausente, 1 reducido, 2 promedio, 3 vivo, 4 muy exaltado con posible clonus.",
   "Un reflejo vivo simétrico no implica necesariamente enfermedad."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Registrar sistema de graduación; integrar fuerza, sensibilidad y tono. Cambios nuevos con déficit requieren valoración."
  ],
  "fuentes": [
   "StatPearls: Physiology, Deep Tendon Reflexes — https://www.ncbi.nlm.nih.gov/sites/books/NBK562238/",
   "Open RN / NCBI Bookshelf: Chapter 6 Neurological Assessment — https://www.ncbi.nlm.nih.gov/sites/books/NBK596731/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-dedo-nariz",
  "nombre": "Prueba dedo-nariz",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Observa precisión de coordinación de la extremidad superior.",
  "referencias": [
   "Paciente sentado; evaluador coloca su dedo como objetivo al alcance.",
   "Pedir alternar entre nariz y dedo del evaluador, comparando ambos brazos."
  ],
  "relaciones": [
   "Sobrepasar objetivo o temblor de intención son hallazgos a registrar.",
   "Debilidad y alteración sensitiva también afectan ejecución."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Considerar visión y movilidad; ataxia súbita con síntomas neurológicos exige urgencias."
  ],
  "fuentes": [
   "Stanford Medicine 25: Cerebellar Exam — https://stanfordmedicine25.stanford.edu/the25/cerebellar.html",
   "University of Utah: NeuroLogic Examination for Adults, Coordination, Normal — https://neurologicexam.med.utah.edu/adult/html/coordination_normal.html"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-talon-rodilla",
  "nombre": "Prueba talón-rodilla",
  "tipo": "prueba",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Explora coordinación de la extremidad inferior.",
  "referencias": [
   "Paciente supino; evaluador explica y observa sin guiar el movimiento.",
   "Colocar talón sobre rodilla contraria y deslizarlo por espinilla; repetir al otro lado."
  ],
  "relaciones": [
   "Registrar desviaciones, discontinuidad y asimetría.",
   "Dolor, debilidad o pérdida sensitiva también pueden alterar la tarea."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No atribuir toda dificultad al cerebelo; no realizar sobre una extremidad lesionada dolorosa."
  ],
  "fuentes": [
   "Stanford Medicine 25: Cerebellar Exam — https://stanfordmedicine25.stanford.edu/the25/cerebellar.html",
   "University of Utah: NeuroLogic Examination for Adults, Coordination, Normal — https://neurologicexam.med.utah.edu/adult/html/coordination_normal.html"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-prueba-de-diadococinesia",
  "nombre": "Prueba de diadococinesia",
  "tipo": "prueba",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Explora capacidad de alternar movimientos rápidos.",
  "referencias": [
   "Paciente sentado; evaluador demuestra pronación y supinación alternadas.",
   "Pedir repetir de forma rápida y regular; comparar manos."
  ],
  "relaciones": [
   "Irregularidad o dificultad para alternar se denomina disdiadococinesia.",
   "La lentitud por sí sola no identifica una lesión cerebelosa."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Valorar dolor, debilidad y comprensión; alteración súbita requiere valoración neurológica urgente."
  ],
  "fuentes": [
   "Stanford Medicine 25: Cerebellar Exam — https://stanfordmedicine25.stanford.edu/the25/cerebellar.html",
   "OpenStax: Anatomy and Physiology 2e, The Coordination and Gait Exams — https://openstax.org/books/anatomy-and-physiology-2e/pages/16-5-the-coordination-and-gait-exams"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-marcha-en-tandem",
  "nombre": "Marcha en tándem",
  "tipo": "prueba",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Observa equilibrio al caminar con base estrecha.",
  "referencias": [
   "Paciente en espacio despejado, evaluador al lado para seguridad.",
   "Caminar colocando talón de un pie delante de punta del otro, sin cerrar los ojos."
  ],
  "relaciones": [
   "Registrar pasos laterales, necesidad de ayuda y oscilación.",
   "Puede alterarse por problemas sensitivos, vestibulares, motores o cerebelosos."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No pedirla sin apoyo si existe alto riesgo de caída; no localiza por sí sola la causa."
  ],
  "fuentes": [
   "Stanford Medicine 25: Cerebellar Exam — https://stanfordmedicine25.stanford.edu/the25/cerebellar.html",
   "OpenStax: Anatomy and Physiology 2e, The Coordination and Gait Exams — https://openstax.org/books/anatomy-and-physiology-2e/pages/16-5-the-coordination-and-gait-exams"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-timed-up-and-go-tug",
  "nombre": "Timed Up and Go (TUG)",
  "tipo": "prueba",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Cronometra una secuencia de movilidad cotidiana.",
  "referencias": [
   "Paciente sentado en silla estable con apoyabrazos; evaluador marca recorrido de 3 metros.",
   "A la señal, levantarse, caminar a ritmo habitual, girar, volver y sentarse.",
   "Cronometrar desde señal hasta volver a sentarse y registrar ayuda habitual."
  ],
  "relaciones": [
   "Tiempo y calidad del movimiento informan movilidad funcional.",
   "Un tiempo prolongado justifica ampliar evaluación, sin diagnóstico específico."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Acompañar para prevenir caídas; registrar calzado, ayuda y condiciones, sin aplicar un corte universal."
  ],
  "fuentes": [
   "Shirley Ryan AbilityLab: Timed Up and Go — https://www.sralab.org/rehabilitation-measures/timed-and-go",
   "CDC STEADI: Timed Up & Go — https://www.cdc.gov/steadi/media/pdfs/STEADI-Assessment-TUG-508.pdf"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "prueba-apoyo-monopodal",
  "nombre": "Apoyo monopodal",
  "tipo": "prueba",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Observa control postural estático en una pierna.",
  "referencias": [
   "Paciente junto a soporte estable; evaluador permanece al lado.",
   "Elevar un pie con ojos abiertos y cronometrar hasta apoyo, pérdida de posición o límite documentado."
  ],
  "relaciones": [
   "Registrar duración, lado y compensaciones.",
   "Resultado depende de edad, visión, dolor y condiciones del protocolo."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "No retirar apoyo si es inseguro; no equiparar un tiempo aislado con riesgo inevitable de caída."
  ],
  "fuentes": [
   "Shirley Ryan AbilityLab: Single leg stance or One-legged stance test — https://www.sralab.org/rehabilitation-measures/single-leg-stance-or-one-legged-stance-test",
   "StatPearls: Romberg Test — https://www.ncbi.nlm.nih.gov/sites/books/NBK563187/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-alcance-funcional-functional-reach",
  "nombre": "Alcance funcional (functional reach)",
  "tipo": "prueba",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Mide cuánto puede adelantarse la mano sin desplazar los pies.",
  "referencias": [
   "Paciente de pie junto a pared, brazo a 90°; evaluador registra posición inicial del tercer metacarpiano.",
   "Alcanzar al frente sin paso ni apoyo en pared y medir diferencia."
  ],
  "relaciones": [
   "Distancia representa un componente del control de equilibrio.",
   "La estrategia del tronco y la movilidad del hombro influyen."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Proteger contra caídas; no comparar versión sentada con versión de pie ni usar un corte universal."
  ],
  "fuentes": [
   "Shirley Ryan AbilityLab: Functional Reach Test / Modified Functional Reach Test — https://www.sralab.org/rehabilitation-measures/functional-reach-test-modified-functional-reach-test",
   "StatPearls: Romberg Test — https://www.ncbi.nlm.nih.gov/sites/books/NBK563187/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-cinco-repeticiones-de-sentarse-y-levantarse",
  "nombre": "Prueba de cinco repeticiones de sentarse y levantarse",
  "tipo": "prueba",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Cronometra cinco transiciones repetidas desde una silla.",
  "referencias": [
   "Paciente sentado en silla firme sin ruedas, brazos cruzados si es seguro.",
   "Evaluador cronometra cinco ciclos completos lo más rápido que pueda con seguridad, hasta sentarse tras el quinto.",
   "Registrar altura de silla, asistencia y cualquier modificación."
  ],
  "relaciones": [
   "Refleja fuerza funcional, equilibrio y estrategia de transferencia.",
   "Dolor y comprensión pueden prolongar el tiempo."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Si requiere brazos, registrar adaptación y no comparar directamente con protocolo sin brazos; detener por mareo o dolor torácico."
  ],
  "fuentes": [
   "Shirley Ryan AbilityLab: Five Times Sit to Stand Test — https://www.sralab.org/rehabilitation-measures/five-times-sit-stand-test",
   "Shirley Ryan AbilityLab: Timed Up and Go — https://www.sralab.org/rehabilitation-measures/timed-and-go"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "prueba-prueba-de-velocidad-de-marcha-de-10-metros",
  "nombre": "Prueba de velocidad de marcha de 10 metros",
  "tipo": "prueba",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Cuantifica velocidad al recorrer un tramo definido.",
  "referencias": [
   "Paciente camina por pasillo marcado; evaluador vigila sin marcar el ritmo.",
   "Elegir y documentar tramo cronometrado y espacios de aceleración/frenado.",
   "Dividir metros realmente cronometrados entre segundos y registrar ayuda y velocidad solicitada."
  ],
  "relaciones": [
   "La velocidad se expresa en metros por segundo.",
   "Las variantes con seis o diez metros cronometrados no deben confundirse."
  ],
  "lesiones": [],
  "fisio": [
   "Realización por personal capacitado, con consentimiento; detener ante dolor intenso o síntomas nuevos.",
   "Un resultado aislado no establece un diagnóstico: se interpreta con la historia clínica y otras pruebas.",
   "Mantener protocolo en seguimiento; detener ante síntomas cardiopulmonares, mareo o riesgo de caída."
  ],
  "fuentes": [
   "Shirley Ryan AbilityLab: 10 Meter Walk Test — https://www.sralab.org/rehabilitation-measures/10-meter-walk-test",
   "Shirley Ryan AbilityLab: Timed Up and Go — https://www.sralab.org/rehabilitation-measures/timed-and-go"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "patologia-lumbalgia-inespecifica",
  "nombre": "Lumbalgia inespecífica",
  "tipo": "patologia",
  "zona": "back",
  "nombres": [],
  "descripcion": "Dolor lumbar sin una causa específica grave identificada tras valoración clínica. Puede persistir por interacción de factores físicos, psicológicos y sociales.",
  "referencias": [
   "Dolor localizado lumbar con intensidad variable.",
   "Limitación para moverse o mantener actividades."
  ],
  "relaciones": [
   "No implica necesariamente daño visible en una estructura.",
   "Sueño, carga y temor al movimiento pueden influir."
  ],
  "lesiones": [
   "Descartar fractura, infección o enfermedad inflamatoria según historia.",
   "Diferenciar dolor radicular cuando hay irradiación y déficit neurológico."
  ],
  "fisio": [
   "Educar y mantener actividad tolerada; evitar reposo prolongado.",
   "Progresar ejercicio según capacidad y objetivos; en dolor crónico considerar apoyo biopsicosocial.",
   "Urgencias ante anestesia perineal, pérdida de control esfinteriano o debilidad progresiva."
  ],
  "fuentes": [
   "NHS: Back pain — https://www.nhs.uk/conditions/back-pain/",
   "WHO: WHO releases guidelines on chronic low back pain — https://www.who.int/news/item/07-12-2023-who-releases-guidelines-on-chronic-low-back-pain"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-hernia-discal-lumbar-con-radiculopatia",
  "nombre": "Hernia discal lumbar con radiculopatía",
  "tipo": "patologia",
  "zona": "back",
  "nombres": [],
  "descripcion": "Material discal puede irritar o comprimir una raíz lumbar y causar síntomas neurológicos concordantes; una hernia en imagen puede ser asintomática.",
  "referencias": [
   "Dolor irradiado a pierna.",
   "Hormigueo, pérdida sensitiva o debilidad de distribución compatible."
  ],
  "relaciones": [
   "Disco intervertebral y raíz nerviosa relacionada.",
   "Cambios degenerativos y carga mecánica pueden contribuir."
  ],
  "lesiones": [
   "Déficit motor persistente.",
   "Síndrome de cauda equina como complicación urgente."
  ],
  "fisio": [
   "Actividad y ejercicio graduados según tolerancia, con seguimiento neurológico.",
   "Derivar si aparece debilidad progresiva o no mejora con manejo conservador.",
   "Urgencias ante anestesia perineal o disfunción vesical/intestinal nueva."
  ],
  "fuentes": [
   "NHS: Slipped disc — https://www.nhs.uk/conditions/slipped-disc/",
   "Journal of Clinical Medicine: Recommendations for Diagnosis and Treatment of Lumbosacral Radicular Pain: A Systematic Review of Clinical Practice Guidelines — https://pmc.ncbi.nlm.nih.gov/articles/PMC8200038/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-estenosis-del-canal-lumbar",
  "nombre": "Estenosis del canal lumbar",
  "tipo": "patologia",
  "zona": "back",
  "nombres": [],
  "descripcion": "Estrechamiento lumbar que puede comprometer estructuras nerviosas; es frecuente en adultos mayores. La imagen debe concordar con síntomas.",
  "referencias": [
   "Dolor, pesadez o parestesias al caminar o permanecer de pie.",
   "Alivio al sentarse o flexionarse en algunos pacientes."
  ],
  "relaciones": [
   "Cambios de discos, facetas y ligamentos.",
   "Puede coexistir espondilolistesis degenerativa."
  ],
  "lesiones": [
   "Diferenciar claudicación vascular.",
   "Déficit neurológico y, excepcionalmente, cauda equina."
  ],
  "fisio": [
   "Ejercicio individualizado, acondicionamiento y adaptación de actividad.",
   "Derivar si limita mucho la marcha pese a tratamiento o progresa déficit.",
   "Disfunción esfinteriana o pérdida sensitiva perineal requiere urgencias."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Lumbar Spinal Stenosis — https://www.orthoinfo.org/diseases--conditions/lumbar-spinal-stenosis/",
   "WFNS Spine Committee: Lumbar Spinal Stenosis Recommendations 2019 — https://wfns-spine.org/pdf/Recom-LumbarSpinalStenosis.pdf"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-espondilolisis-y-espondilolistesis",
  "nombre": "Espondilólisis y espondilolistesis",
  "tipo": "patologia",
  "zona": "back",
  "nombres": [],
  "descripcion": "La espondilólisis es un defecto de la pars vertebral; espondilolistesis significa desplazamiento de una vértebra respecto a otra y tiene distintas causas.",
  "referencias": [
   "Dolor lumbar que puede aumentar con extensión y actividad.",
   "Puede ser asintomática o acompañarse de dolor hacia piernas."
  ],
  "relaciones": [
   "Carga repetida en extensión puede contribuir a lesión por estrés de pars.",
   "La degeneración también puede causar deslizamiento sin defecto de pars."
  ],
  "lesiones": [
   "Radiculopatía o estenosis asociadas.",
   "Diferenciar hernia discal y otras causas de dolor lumbar."
  ],
  "fisio": [
   "Modificar temporalmente actividades provocativas y progresar fuerza/control del tronco con supervisión.",
   "En jóvenes con sospecha de lesión por estrés solicitar valoración antes de retorno deportivo.",
   "Derivar por debilidad progresiva; síntomas esfinterianos nuevos requieren urgencias."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Spondylolysis and Spondylolisthesis — https://www.orthoinfo.org/diseases--conditions/spondylolysis-and-spondylolisthesis/",
   "NHS: Spondylolisthesis — https://www.nhs.uk/conditions/spondylolisthesis/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-cervicalgia-mecanica",
  "nombre": "Cervicalgia mecánica",
  "tipo": "patologia",
  "zona": "back",
  "nombres": [],
  "descripcion": "Dolor cervical relacionado con movimiento o carga, una vez excluidas causas específicas que requieren otro manejo.",
  "referencias": [
   "Dolor y rigidez cervical.",
   "Movilidad limitada o molestias hacia hombros."
  ],
  "relaciones": [
   "Puede implicar músculos y articulaciones sin identificar una sola estructura.",
   "Posturas sostenidas y carga pueden modular síntomas."
  ],
  "lesiones": [
   "Diferenciar radiculopatía y mielopatía.",
   "Descartar fractura, infección o causa vascular cuando la historia lo sugiera."
  ],
  "fisio": [
   "Educación y movilidad tolerada; progresar fuerza y resistencia cervical/escapular.",
   "Ajustar actividades sin imponer una postura única como tratamiento.",
   "Déficit neurológico nuevo, trauma importante o cefalea brusca requieren valoración."
  ],
  "fuentes": [
   "NHS: Neck pain — https://www.nhs.uk/symptoms/neck-pain-and-stiff-neck/",
   "American Family Physician: Neck Pain: Initial Evaluation and Management — https://www.aafp.org/afp/2020/0801/p150"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-radiculopatia-cervical",
  "nombre": "Radiculopatía cervical",
  "tipo": "patologia",
  "zona": "back",
  "nombres": [],
  "descripcion": "Alteración de una raíz cervical, a menudo relacionada con estrechamiento foraminal o disco, que produce síntomas en el brazo.",
  "referencias": [
   "Dolor cervical con irradiación a brazo.",
   "Parestesias, debilidad o reflejos alterados concordantes."
  ],
  "relaciones": [
   "Raíces nerviosas cervicales.",
   "Cambios degenerativos o hernia discal."
  ],
  "lesiones": [
   "Diferenciar neuropatía periférica y enfermedad del hombro.",
   "Mielopatía coexistente si hay marcha alterada u otros signos centrales."
  ],
  "fisio": [
   "Movilidad y fortalecimiento progresivos según irritabilidad y examen neurológico.",
   "Seguimiento de fuerza y sensibilidad; derivar si hay empeoramiento o déficit persistente.",
   "Alteración de marcha, torpeza bilateral o debilidad progresiva requieren valoración pronta."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Cervical Radiculopathy (Pinched Nerve) — https://www.orthoinfo.org/diseases--conditions/cervical-radiculopathy-pinched-nerve/",
   "American Family Physician: Neck Pain: Initial Evaluation and Management — https://www.aafp.org/afp/2020/0801/p150"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-latigazo-cervical",
  "nombre": "Latigazo cervical",
  "tipo": "patologia",
  "zona": "back",
  "nombres": [],
  "descripcion": "Cuadro tras aceleración y desaceleración del cuello, frecuentemente en accidentes; primero debe descartarse lesión grave.",
  "referencias": [
   "Dolor y rigidez cervical, a veces de inicio diferido.",
   "Puede acompañarse de cefalea y molestias de hombros."
  ],
  "relaciones": [
   "Mecanismo traumático de aceleración/desaceleración.",
   "Pueden participar tejidos blandos y otros factores que influyen en recuperación."
  ],
  "lesiones": [
   "Diferenciar fractura o lesión ligamentaria inestable.",
   "Descartar compromiso medular o vascular tras trauma."
  ],
  "fisio": [
   "Tras valoración, fomentar retorno gradual a actividad y movilidad tolerada.",
   "Evitar inmovilización prolongada sin indicación médica; progresar ejercicio según evolución.",
   "Debilidad, dificultad para caminar o síntomas neurológicos nuevos tras accidente requieren urgencias."
  ],
  "fuentes": [
   "NHS: Whiplash — https://www.nhs.uk/conditions/whiplash/",
   "StatPearls: Cervical Sprain — https://www.ncbi.nlm.nih.gov/sites/books/NBK541016/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-cefalea-cervicogenica",
  "nombre": "Cefalea cervicogénica",
  "tipo": "patologia",
  "zona": "head",
  "nombres": [],
  "descripcion": "Cefalea secundaria atribuida a un trastorno cervical; debe demostrarse una relación clínica y excluir otras causas.",
  "referencias": [
   "Dolor que puede iniciar en cuello y extenderse a cabeza.",
   "Movilidad reducida o reproducción con movimiento cervical."
  ],
  "relaciones": [
   "Estructuras cervicales superiores y sus conexiones sensitivas.",
   "Los hallazgos en imagen por sí solos no demuestran causalidad."
  ],
  "lesiones": [
   "Diferenciar migraña y cefalea tensional.",
   "Descartar causas vasculares u otras cefaleas secundarias graves."
  ],
  "fisio": [
   "Ejercicio cervical y escapular graduado según valoración.",
   "Terapia manual solo cuando esté indicada y se hayan descartado contraindicaciones.",
   "Cefalea explosiva, fiebre con rigidez o déficit neurológico requiere urgencias."
  ],
  "fuentes": [
   "StatPearls: Cervicogenic Headache — https://www.ncbi.nlm.nih.gov/sites/books/NBK507862/",
   "International Headache Society: ICHD-3, 11.2.1 Cervicogenic headache — https://ichd-3.org/11-headache-or-facial-pain-attributed-to-disorder-of-the-cranium-neck-eyes-ears-nose-sinuses-teeth-mouth-or-other-facial-or-cervical-structure/11-2-headache-attributed-to-disorder-of-the-neck/11-2-1-cervicogenic-headache/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-escoliosis-idiopatica-del-adolescente",
  "nombre": "Escoliosis idiopática del adolescente",
  "tipo": "patologia",
  "zona": "back",
  "nombres": [],
  "descripcion": "Deformidad tridimensional de la columna de causa no identificada que aparece durante el crecimiento.",
  "referencias": [
   "Asimetría de hombros o cintura.",
   "Prominencia costal al inclinarse hacia delante."
  ],
  "relaciones": [
   "Crecimiento y madurez esquelética influyen en riesgo de progresión.",
   "Antecedentes familiares pueden aumentar riesgo."
  ],
  "lesiones": [
   "Progresión de la curva durante crecimiento.",
   "Dolor intenso o déficit neurológico exige investigar otra causa."
  ],
  "fisio": [
   "Mantener actividad y valorar ejercicio supervisado según objetivos.",
   "El seguimiento y posible corsé dependen de curva y crecimiento; ejercicio no sustituye vigilancia especializada.",
   "Derivar ante progresión visible o signos neurológicos."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Idiopathic Scoliosis — https://www.orthoinfo.org/diseases--conditions/idiopathic-scoliosis-in-children-and-adolescents/",
   "NHS: Scoliosis — https://www.nhs.uk/conditions/scoliosis/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-sindrome-de-dolor-subacromial",
  "nombre": "Síndrome de dolor subacromial",
  "tipo": "patologia",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Término clínico para dolor relacionado con elevación del brazo y estructuras del manguito/bursa; no demuestra un único mecanismo de roce.",
  "referencias": [
   "Dolor lateral o superior al elevar brazo.",
   "Puede interferir con sueño y tareas por encima de cabeza."
  ],
  "relaciones": [
   "Manguito rotador y bursa subacromial pueden participar.",
   "Cargas repetidas o cambios de actividad pueden influir."
  ],
  "lesiones": [
   "Diferenciar capsulitis y dolor referido cervical.",
   "Considerar rotura traumática ante pérdida súbita de fuerza."
  ],
  "fisio": [
   "Ajustar carga y progresar movilidad y fortalecimiento del hombro.",
   "Adaptar ejercicio a irritabilidad y objetivos; reevaluar si no mejora.",
   "Trauma con incapacidad para elevar brazo o deformidad requiere valoración."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Shoulder Impingement / Rotator Cuff Tendinitis — https://www.orthoinfo.org/diseases--conditions/shoulder-impingementrotator-cuff-tendinitis/",
   "NHS: Shoulder impingement — https://www.nhs.uk/conditions/shoulder-impingement-syndrome/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-tendinopatia-y-desgarro-del-manguito-rotador",
  "nombre": "Tendinopatía y desgarro del manguito rotador",
  "tipo": "patologia",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Las alteraciones tendinosas pueden ser degenerativas o traumáticas y no equivalen siempre a rotura completa ni a dolor.",
  "referencias": [
   "Dolor con elevación o carga del brazo.",
   "Debilidad y dificultad para tareas habituales."
  ],
  "relaciones": [
   "Tendones del manguito rotador.",
   "Edad, exposición a carga y traumatismo influyen."
  ],
  "lesiones": [
   "Rigidez y pérdida funcional persistentes.",
   "Diferenciar capsulitis, radiculopatía y otras causas de debilidad."
  ],
  "fisio": [
   "Progresar movilidad y carga de manguito/escápula según capacidad.",
   "Tras reparación respetar restricciones y tiempos del equipo quirúrgico.",
   "Pérdida marcada de fuerza tras trauma requiere valoración pronta."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Rotator Cuff Tears — https://www.orthoinfo.org/diseases--conditions/rotator-cuff-tears/",
   "AAOS OrthoInfo: Shoulder Impingement / Rotator Cuff Tendinitis — https://www.orthoinfo.org/diseases--conditions/shoulder-impingementrotator-cuff-tendinitis/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-capsulitis-adhesiva-hombro-congelado",
  "nombre": "Capsulitis adhesiva (hombro congelado)",
  "tipo": "patologia",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "Cuadro de dolor y restricción progresiva tanto activa como pasiva del hombro, asociado a cambios capsulares.",
  "referencias": [
   "Dolor nocturno o en reposo en fases irritables.",
   "Pérdida de movilidad, especialmente rotación externa."
  ],
  "relaciones": [
   "Cápsula glenohumeral.",
   "Diabetes e inmovilización se asocian con mayor riesgo."
  ],
  "lesiones": [
   "Limitación prolongada de actividades.",
   "Diferenciar artrosis glenohumeral y lesión del manguito."
  ],
  "fisio": [
   "Educar sobre evolución variable; movilidad suave y progresión según irritabilidad.",
   "Evitar estiramiento agresivo en fase dolorosa; coordinar analgesia con equipo médico.",
   "Fiebre, enrojecimiento marcado o trauma requieren reevaluación."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Frozen Shoulder — https://www.orthoinfo.org/diseases--conditions/frozen-shoulder/",
   "NHS: Frozen shoulder — https://www.nhs.uk/conditions/frozen-shoulder/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-inestabilidad-y-luxacion-glenohumeral",
  "nombre": "Inestabilidad y luxación glenohumeral",
  "tipo": "patologia",
  "zona": "shoulders",
  "nombres": [],
  "descripcion": "La inestabilidad implica episodios sintomáticos de traslación; la luxación es pérdida completa de contacto articular y requiere atención médica.",
  "referencias": [
   "Sensación de salida o episodios repetidos.",
   "Luxación aguda: deformidad, dolor e incapacidad para mover brazo."
  ],
  "relaciones": [
   "Complejo capsulolabral y estabilizadores musculares.",
   "Puede ser traumática o asociarse con laxitud."
  ],
  "lesiones": [
   "Lesión ósea o nerviosa asociada.",
   "Recurrencia de luxaciones y pérdida funcional."
  ],
  "fisio": [
   "Luxación sospechada: sostener brazo y acudir a urgencias; no intentar reducirla.",
   "Después de valoración, progresar control escapular y fuerza del manguito según restricciones.",
   "Vigilar mano fría, pulso alterado o pérdida sensitiva: requieren atención urgente."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Chronic Shoulder Instability and Dislocation — https://www.orthoinfo.org/diseases--conditions/chronic-shoulder-instability/",
   "NHS: Dislocated shoulder — https://www.nhs.uk/conditions/dislocated-shoulder/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-epicondilalgia-lateral-codo-de-tenista",
  "nombre": "Epicondilalgia lateral (codo de tenista)",
  "tipo": "patologia",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Dolor relacionado con carga del origen extensor del antebrazo, sin necesidad de practicar tenis.",
  "referencias": [
   "Dolor lateral con agarre o extensión de muñeca.",
   "Sensibilidad cerca del epicóndilo lateral."
  ],
  "relaciones": [
   "Tendón extensor común, especialmente extensor radial corto del carpo.",
   "Carga repetida puede superar tolerancia del tejido."
  ],
  "lesiones": [
   "Diferenciar dolor radial neural o articular.",
   "Persistencia de dolor y limitación de agarre."
  ],
  "fisio": [
   "Ajustar tareas provocativas y progresar carga de extensores y agarre.",
   "Reevaluar respuesta y función; no prometer curación mediante una modalidad aislada.",
   "Derivar por trauma importante, bloqueo, debilidad neurológica o evolución atípica."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Tennis Elbow (Lateral Epicondylitis) — https://www.orthoinfo.org/diseases--conditions/tennis-elbow-lateral-epicondylitis/",
   "NHS: Tennis elbow — https://www.nhs.uk/conditions/tennis-elbow/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-epicondilalgia-medial-codo-de-golfista",
  "nombre": "Epicondilalgia medial (codo de golfista)",
  "tipo": "patologia",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Dolor de la región flexopronadora del codo asociado a carga repetida; puede coexistir irritación cubital.",
  "referencias": [
   "Dolor medial con agarre o flexión/pronación resistidas.",
   "Sensibilidad en origen flexopronador."
  ],
  "relaciones": [
   "Tendón flexor común y pronador redondo.",
   "Carga laboral o deportiva repetida."
  ],
  "lesiones": [
   "Diferenciar lesión colateral cubital.",
   "Diferenciar neuropatía cubital si hay parestesias en dedos."
  ],
  "fisio": [
   "Modificar carga y progresar fuerza flexopronadora según respuesta.",
   "Valorar técnica y tareas; combinar evaluación nerviosa y ligamentaria.",
   "Derivar ante déficit progresivo o sospecha de rotura traumática."
  ],
  "fuentes": [
   "StatPearls: Medial Epicondylitis (Golfer’s Elbow) — https://www.ncbi.nlm.nih.gov/sites/books/NBK519000/",
   "AAOS OrthoInfo: Medial Epicondylitis (Golfer’s Elbow) — https://www.orthoinfo.org/diseases--conditions/medial-epicondylitis-golfers-elbow"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-sindrome-del-tunel-carpiano",
  "nombre": "Síndrome del túnel carpiano",
  "tipo": "patologia",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Compresión del nervio mediano al atravesar el túnel carpiano.",
  "referencias": [
   "Hormigueo o adormecimiento de dedos medianos, a menudo nocturno.",
   "Puede aparecer debilidad tenar y pérdida de destreza."
  ],
  "relaciones": [
   "Nervio mediano y retináculo flexor.",
   "Embarazo, diabetes y otros factores pueden favorecerlo."
  ],
  "lesiones": [
   "Pérdida sensitiva o motora persistente.",
   "Diferenciar radiculopatía y otras neuropatías."
  ],
  "fisio": [
   "Educar sobre actividades y posiciones; férula nocturna neutra cuando esté indicada.",
   "Ejercicio y deslizamientos pueden ser complementarios, sin provocar síntomas persistentes.",
   "Derivar por atrofia tenar, pérdida progresiva de fuerza o falta de respuesta."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Carpal Tunnel Syndrome — https://www.orthoinfo.org/diseases--conditions/carpal-tunnel-syndrome/",
   "NHS: Carpal tunnel syndrome — https://www.nhs.uk/conditions/carpal-tunnel-syndrome/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-tenosinovitis-de-de-quervain",
  "nombre": "Tenosinovitis de De Quervain",
  "tipo": "patologia",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Trastorno doloroso del primer compartimento tendinoso dorsal de la muñeca.",
  "referencias": [
   "Dolor radial al mover pulgar o cargar objetos.",
   "Puede haber inflamación junto a estiloides radial."
  ],
  "relaciones": [
   "Abductor largo y extensor corto del pulgar y sus vainas.",
   "Actividad repetida y periodo periparto pueden asociarse."
  ],
  "lesiones": [
   "Diferenciar artrosis de base del pulgar.",
   "Descartar fractura de escafoides después de trauma."
  ],
  "fisio": [
   "Modificar agarres y carga; valorar soporte del pulgar según indicación.",
   "Recuperar movilidad y tolerancia a carga progresivamente, sin estiramiento doloroso forzado.",
   "Derivar si persiste o tras trauma con sensibilidad ósea."
  ],
  "fuentes": [
   "AAOS OrthoInfo: De Quervain’s Tenosynovitis — https://www.orthoinfo.org/diseases--conditions/de-quervains-tendinosis/",
   "StatPearls: Finkelstein Sign — https://www.ncbi.nlm.nih.gov/sites/books/NBK539768/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-dedo-en-gatillo",
  "nombre": "Dedo en gatillo",
  "tipo": "patologia",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Dificultad de deslizamiento del tendón flexor, frecuentemente en la polea A1, que produce enganche.",
  "referencias": [
   "Chasquido o bloqueo al flexionar y extender.",
   "Dolor palmar y rigidez del dedo."
  ],
  "relaciones": [
   "Tendón flexor y polea A1.",
   "Diabetes y otras condiciones se asocian con mayor riesgo."
  ],
  "lesiones": [
   "Bloqueo persistente o contractura.",
   "Diferenciar retracción por Dupuytren y lesión tendinosa."
  ],
  "fisio": [
   "Reducir temporalmente agarre repetido intenso y mantener movilidad tolerada.",
   "Valorar férula y derivación de mano si hay bloqueo persistente.",
   "No enderezar con fuerza; calor, enrojecimiento intenso o fiebre requieren evaluación."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Trigger Finger — https://www.orthoinfo.org/diseases--conditions/trigger-finger/",
   "NHS: Trigger finger — https://www.nhs.uk/conditions/trigger-finger/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-enfermedad-de-dupuytren",
  "nombre": "Enfermedad de Dupuytren",
  "tipo": "patologia",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Engrosamiento progresivo de la fascia palmar que puede formar cordones y retraer dedos.",
  "referencias": [
   "Nódulos o cordones en palma.",
   "Dificultad progresiva para extender dedos, especialmente anular y meñique."
  ],
  "relaciones": [
   "Aponeurosis palmar, no una simple contractura muscular.",
   "Predisposición familiar y otros factores personales."
  ],
  "lesiones": [
   "Contractura y limitación funcional de mano.",
   "Diferenciar dedo en gatillo."
  ],
  "fisio": [
   "Vigilar progresión y función; derivar si la contractura interfiere con actividades.",
   "Tras procedimientos, rehabilitación de mano según indicaciones de cicatrización.",
   "No prometer que masaje o estiramiento reviertan los cordones ni forzar dedos."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Dupuytren’s Disease — https://www.orthoinfo.org/diseases--conditions/dupuytrens-disease/",
   "NHS: Dupuytren’s contracture — https://www.nhs.uk/conditions/dupuytrens-contracture/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-fractura-distal-del-radio",
  "nombre": "Fractura distal del radio",
  "tipo": "patologia",
  "zona": "arms",
  "nombres": [],
  "descripcion": "Rotura del radio cerca de muñeca, a menudo tras caída sobre mano extendida.",
  "referencias": [
   "Dolor e inflamación después de trauma.",
   "Deformidad o dificultad para mover muñeca."
  ],
  "relaciones": [
   "Radio distal; puede implicar superficie articular y estructuras vecinas.",
   "Caídas y fragilidad ósea aumentan riesgo."
  ],
  "lesiones": [
   "Rigidez y pérdida funcional.",
   "Compromiso del mediano o alteración vascular requieren atención pronta."
  ],
  "fisio": [
   "Sospecha aguda: proteger y acudir a valoración; no movilizar para recolocar.",
   "Tras estabilización, progresar movilidad, edema y fuerza según consolidación y restricciones.",
   "Dolor creciente bajo yeso, dedos fríos o pérdida sensitiva requieren atención urgente."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Distal Radius Fractures (Broken Wrist) — https://www.orthoinfo.org/diseases--conditions/distal-radius-fractures-broken-wrist/",
   "NHS: Broken arm or wrist — https://www.nhs.uk/conditions/broken-arm-or-wrist/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-fractura-de-cadera",
  "nombre": "Fractura de cadera",
  "tipo": "patologia",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Rotura del fémur proximal, frecuentemente tras caída en personas mayores; requiere valoración hospitalaria inmediata.",
  "referencias": [
   "Dolor inguinal o de cadera después de caída.",
   "Dificultad para apoyar; puede haber pierna acortada y rotada hacia fuera."
  ],
  "relaciones": [
   "Cuello femoral o región trocantérica.",
   "Fragilidad ósea y riesgo de caídas."
  ],
  "lesiones": [
   "Complicaciones por inmovilidad como trombosis y pérdida funcional.",
   "Posibles problemas de consolidación o del aporte sanguíneo según fractura."
  ],
  "fisio": [
   "Sospecha aguda: no probar marcha ni movilidad forzada y solicitar atención urgente.",
   "Después de estabilización, movilización y marcha tempranas según indicación de carga.",
   "Trabajar fuerza, transferencias y prevención de nuevas caídas con equipo multidisciplinario."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Hip Fractures — https://www.orthoinfo.org/diseases--conditions/hip-fractures/",
   "NHS: Broken hip — https://www.nhs.uk/conditions/broken-hip/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-pinzamiento-femoroacetabular",
  "nombre": "Pinzamiento femoroacetabular",
  "tipo": "patologia",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Síndrome doloroso relacionado con interacción entre fémur y acetábulo; las formas cam o pincer sin síntomas no bastan para diagnosticarlo.",
  "referencias": [
   "Dolor inguinal con flexión o giro.",
   "Restricción de movilidad y molestias al sentarse o hacer deporte."
  ],
  "relaciones": [
   "Morfología femoral/acetabular y mecánica articular.",
   "Pueden participar labrum y cartílago."
  ],
  "lesiones": [
   "Diferenciar dolor de aductores o región inguinal.",
   "Puede coexistir lesión labral o cambios degenerativos."
  ],
  "fisio": [
   "Modificar movimientos provocativos y progresar fuerza y control de cadera/tronco.",
   "Evitar forzar repetidamente flexión profunda dolorosa.",
   "Derivar si persiste limitación importante o se sospecha otra causa."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Femoroacetabular Impingement — https://www.orthoinfo.org/diseases--conditions/femoroacetabular-impingement/",
   "Current Reviews in Musculoskeletal Medicine: Physical Examination of the Hip: Assessment of Femoroacetabular Impingement, Labral Pathology, and Microinstability — https://pmc.ncbi.nlm.nih.gov/articles/PMC9076795/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-dolor-lateral-de-cadera-bursitis-trocanterica-y-tendinopatia-glutea",
  "nombre": "Dolor lateral de cadera (bursitis trocantérica y tendinopatía glútea)",
  "tipo": "patologia",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Dolor peritrocantérico que puede involucrar tendones glúteos y bursas; no todo dolor lateral es bursitis aislada.",
  "referencias": [
   "Dolor sobre trocánter al acostarse de ese lado.",
   "Molestia al subir escaleras o cargar una pierna."
  ],
  "relaciones": [
   "Tendones de glúteo medio/menor y bursas vecinas.",
   "Carga y compresión local pueden agravar síntomas."
  ],
  "lesiones": [
   "Diferenciar dolor lumbar referido o artrosis de cadera.",
   "Persistencia de dolor y reducción de actividad."
  ],
  "fisio": [
   "Educar sobre control de carga y compresión; ajustar posturas dolorosas.",
   "Progresar fortalecimiento glúteo según tolerancia y función.",
   "Trauma con incapacidad de apoyo o fiebre exige valoración."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Hip Bursitis — https://www.orthoinfo.org/diseases--conditions/hip-bursitis/",
   "BMJ / PubMed: Education plus exercise versus corticosteroid injection use versus a wait and see approach on global outcome and pain from gluteal tendinopathy — https://pubmed.ncbi.nlm.nih.gov/29720374/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-artrosis-de-cadera",
  "nombre": "Artrosis de cadera",
  "tipo": "patologia",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Enfermedad articular que afecta cartílago, hueso y otros tejidos; puede causar dolor y limitación progresiva.",
  "referencias": [
   "Dolor inguinal o de muslo con carga.",
   "Rigidez y dificultad para calzarse o caminar."
  ],
  "relaciones": [
   "Articulación coxofemoral.",
   "Edad, lesión previa y otros factores individuales contribuyen."
  ],
  "lesiones": [
   "Pérdida de movilidad y autonomía.",
   "Diferenciar fractura, dolor referido lumbar y necrosis avascular."
  ],
  "fisio": [
   "Ejercicio de fuerza, movilidad y acondicionamiento individualizado.",
   "Apoyar manejo de peso cuando corresponda y valorar ayuda para marcha.",
   "Derivar por deterioro importante o dolor persistente pese a manejo; dolor agudo tras caída requiere urgencias."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Hip Osteoarthritis — https://www.orthoinfo.org/diseases--conditions/osteoarthritis-of-the-hip/",
   "NHS: Osteoarthritis, Treatment and support — https://www.nhs.uk/conditions/osteoarthritis/treatment/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-artrosis-de-rodilla",
  "nombre": "Artrosis de rodilla",
  "tipo": "patologia",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Trastorno de toda la articulación que puede producir dolor, rigidez y dificultad para actividades con carga.",
  "referencias": [
   "Dolor al caminar, subir escaleras o levantarse.",
   "Rigidez y posible inflamación variable."
  ],
  "relaciones": [
   "Cartílago, hueso subcondral y tejidos periarticulares.",
   "Edad, antecedentes de lesión y exceso de peso pueden contribuir."
  ],
  "lesiones": [
   "Pérdida de fuerza y función.",
   "Diferenciar artritis inflamatoria o infección si hay calor intenso y síntomas generales."
  ],
  "fisio": [
   "Educación y ejercicio progresivo de fuerza y capacidad aeróbica.",
   "Ajustar carga, valorar ayudas y apoyar manejo de peso cuando sea apropiado.",
   "Rodilla muy caliente con fiebre o incapacidad súbita de apoyo requiere valoración urgente."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Arthritis of the Knee — https://www.orthoinfo.org/diseases--conditions/arthritis-of-the-knee/",
   "NHS: Osteoarthritis, Treatment and support — https://www.nhs.uk/conditions/osteoarthritis/treatment/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-rotura-del-ligamento-cruzado-anterior",
  "nombre": "Rotura del ligamento cruzado anterior",
  "tipo": "patologia",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Lesión del estabilizador de traslación anterior y rotación de rodilla, frecuentemente durante giro o aterrizaje.",
  "referencias": [
   "Chasquido traumático y derrame temprano.",
   "Sensación de falla o inseguridad al girar."
  ],
  "relaciones": [
   "Ligamento cruzado anterior.",
   "Pueden coexistir lesiones meniscales y de otros ligamentos."
  ],
  "lesiones": [
   "Inestabilidad persistente y lesiones asociadas.",
   "Riesgo de cambios degenerativos a largo plazo."
  ],
  "fisio": [
   "Recuperar extensión, control de derrame y fuerza progresiva según valoración.",
   "Rehabilitación y retorno deportivo basados en capacidad y criterios del equipo, con o sin cirugía.",
   "Tras trauma importante comprobar estado neurovascular y descartar fractura/luxación."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Anterior Cruciate Ligament (ACL) Injuries — https://www.orthoinfo.org/diseases--conditions/anterior-cruciate-ligament-acl-injuries/",
   "StatPearls: Lachman Test — https://www.ncbi.nlm.nih.gov/sites/books/NBK554415/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "patologia-lesion-meniscal",
  "nombre": "Lesión meniscal",
  "tipo": "patologia",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Rotura o alteración de uno de los meniscos, por trauma o cambios degenerativos; un hallazgo en imagen puede no explicar todos los síntomas.",
  "referencias": [
   "Dolor de interlínea y posible derrame.",
   "Enganche o bloqueo en algunas lesiones."
  ],
  "relaciones": [
   "Meniscos medial y lateral.",
   "Giro con carga o degeneración; puede coexistir lesión ligamentaria."
  ],
  "lesiones": [
   "Bloqueo mecánico y limitación funcional.",
   "Diferenciar artrosis y lesión osteocondral."
  ],
  "fisio": [
   "En casos apropiados, recuperar movilidad y progresar fuerza y actividad.",
   "Después de reparación respetar restricciones de flexión y carga del cirujano.",
   "Bloqueo real que impide extender o derrame agudo importante requiere valoración."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Meniscus Tears — https://www.orthoinfo.org/diseases--conditions/meniscus-tears/",
   "American Family Physician: Evaluating Acutely Injured Patients for Internal Derangement of the Knee — https://www.aafp.org/afp/2012/0201/p247"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-dolor-femoropatelar",
  "nombre": "Dolor femoropatelar",
  "tipo": "patologia",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Dolor alrededor o detrás de rótula relacionado con actividades que cargan la rodilla flexionada.",
  "referencias": [
   "Molestia al subir escaleras o hacer sentadillas.",
   "Dolor después de permanecer sentado con rodillas flexionadas."
  ],
  "relaciones": [
   "Articulación femoropatelar y tolerancia a carga.",
   "Capacidad muscular y cambios de entrenamiento pueden influir."
  ],
  "lesiones": [
   "Diferenciar tendinopatía rotuliana e inestabilidad patelar.",
   "No equivale automáticamente a daño de cartílago."
  ],
  "fisio": [
   "Educar sobre carga y progresar ejercicio de cadera y rodilla.",
   "Adaptar tareas y valorar apoyos complementarios según evaluación.",
   "Derrame importante, bloqueo o trauma con deformidad ameritan reevaluación."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Patellofemoral Pain Syndrome — https://www.orthoinfo.org/diseases--conditions/patellofemoral-pain-syndrome/",
   "American Family Physician: Patellofemoral Pain Syndrome — https://www.aafp.org/afp/2019/0115/p88"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-tendinopatia-rotuliana",
  "nombre": "Tendinopatía rotuliana",
  "tipo": "patologia",
  "zona": "knee",
  "nombres": [],
  "descripcion": "Dolor tendinoso relacionado con demanda del mecanismo extensor, común en deportes de salto.",
  "referencias": [
   "Dolor localizado cerca del polo inferior de rótula.",
   "Aumento con saltos, aterrizajes o carga del cuádriceps."
  ],
  "relaciones": [
   "Tendón rotuliano.",
   "Carga repetida y recuperación insuficiente pueden contribuir."
  ],
  "lesiones": [
   "Limitación deportiva persistente.",
   "Diferenciar dolor femoropatelar y otras causas de dolor anterior."
  ],
  "fisio": [
   "Ajustar carga e introducir fortalecimiento progresivo del mecanismo extensor.",
   "Progresar hacia tareas rápidas y deportivas según síntomas y capacidad, sin dosis universales.",
   "Pérdida súbita de extensión activa tras trauma requiere descartar rotura."
  ],
  "fuentes": [
   "Journal of Athletic Training: Clinical Management of Patellar Tendinopathy — https://pmc.ncbi.nlm.nih.gov/articles/PMC9528703/",
   "Journal of Clinical Medicine: Clinical Management of Patellar Tendinopathy in Athletes: A Narrative Review of Diagnosis, Treatment, and Return to Sport — https://pmc.ncbi.nlm.nih.gov/articles/PMC13664801/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-sindrome-de-la-banda-iliotibial",
  "nombre": "Síndrome de la banda iliotibial",
  "tipo": "patologia",
  "zona": "thigh",
  "nombres": [],
  "descripcion": "Dolor lateral de rodilla relacionado con carga repetida, frecuente al correr; no se explica necesariamente por una banda que roza de un lado a otro.",
  "referencias": [
   "Dolor lateral durante carrera o flexoextensión repetida.",
   "Sensibilidad cerca del epicóndilo femoral lateral."
  ],
  "relaciones": [
   "Banda iliotibial y tejidos profundos laterales.",
   "Cambios de carga y control de cadera pueden influir."
  ],
  "lesiones": [
   "Diferenciar lesión meniscal lateral.",
   "Diferenciar lesión por estrés u otro dolor lateral persistente."
  ],
  "fisio": [
   "Ajustar carga y progresar fuerza/resistencia de cadera y control funcional.",
   "Retorno gradual a carrera según tolerancia; evitar masaje profundo doloroso como eje del tratamiento.",
   "Dolor óseo focal, trauma o empeoramiento sostenido requieren reevaluación."
  ],
  "fuentes": [
   "Journal of Athletic Training: Current Clinical Concepts: Synthesizing the Available Evidence for Improved Clinical Outcomes in Iliotibial Band Impingement Syndrome — https://pmc.ncbi.nlm.nih.gov/articles/PMC8359713/",
   "Joints: Clinical examination of the knee: know your tools for diagnosis of knee injuries — https://pmc.ncbi.nlm.nih.gov/articles/PMC3213012/"
  ],
  "verificacion": "verificación parcial"
 },
 {
  "id": "patologia-desgarro-de-isquiotibiales",
  "nombre": "Desgarro de isquiotibiales",
  "tipo": "patologia",
  "zona": "thigh",
  "nombres": [],
  "descripcion": "Lesión de músculos o tendones posteriores del muslo, a menudo durante carrera rápida o alargamiento brusco.",
  "referencias": [
   "Dolor posterior repentino del muslo.",
   "Puede haber hematoma y debilidad."
  ],
  "relaciones": [
   "Bíceps femoral, semitendinoso y semimembranoso.",
   "Lesión previa y demandas deportivas influyen en riesgo."
  ],
  "lesiones": [
   "Recurrencia y déficit de fuerza.",
   "Avulsión tendinosa o ósea en lesiones importantes."
  ],
  "fisio": [
   "Protección inicial relativa y recuperación progresiva de movilidad y fuerza.",
   "Avanzar hacia carga en posiciones alargadas y carrera según tolerancia y valoración.",
   "Hematoma amplio, dolor proximal intenso o gran pérdida de función requieren estudio."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Hamstring Muscle Injuries — https://www.orthoinfo.org/diseases--conditions/hamstring-muscle-injuries/",
   "NHS: Hamstring injury — https://www.nhs.uk/conditions/hamstring-injury/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-dolor-inguinal-del-deportista-pubalgia",
  "nombre": "Dolor inguinal del deportista (pubalgia)",
  "tipo": "patologia",
  "zona": "hip",
  "nombres": [],
  "descripcion": "Término amplio que requiere clasificar el origen del dolor; no identifica una sola lesión ni significa siempre hernia.",
  "referencias": [
   "Dolor inguinal con carrera, cambios de dirección o golpeo.",
   "Puede reproducirse con carga de aductores o abdominales según origen."
  ],
  "relaciones": [
   "Pueden participar aductores, iliopsoas, región inguinal, pubis o cadera.",
   "Las exigencias deportivas y la carga modulan síntomas."
  ],
  "lesiones": [
   "Diferenciar fractura por estrés y patología de cadera.",
   "Descartar causas abdominales, urológicas o testiculares."
  ],
  "fisio": [
   "Determinar origen antes de progresar ejercicio de aductores, cadera y tronco.",
   "Ajustar carga y recuperar tareas específicas de deporte gradualmente.",
   "Dolor testicular súbito, bulto inguinal doloroso o dolor óseo con apoyo requieren valoración urgente."
  ],
  "fuentes": [
   "British Journal of Sports Medicine: Doha agreement meeting on terminology and definitions in groin pain in athletes (copia del artículo) — https://pcrmm.org.uk/wp-content/uploads/2021/01/600c68cf66087.pdf",
   "AAOS OrthoInfo: Sports Hernia (Athletic Pubalgia) — https://www.orthoinfo.org/diseases--conditions/sports-hernia-athletic-pubalgia/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-tendinopatia-de-aquiles",
  "nombre": "Tendinopatía de Aquiles",
  "tipo": "patologia",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Dolor del tendón de Aquiles relacionado con carga, que puede presentarse en inserción o porción media.",
  "referencias": [
   "Dolor localizado con caminar, correr o elevar talón.",
   "Rigidez, especialmente al iniciar actividad."
  ],
  "relaciones": [
   "Tendón de Aquiles y, en inserción, relación con calcáneo.",
   "Cambios de carga y capacidad del tríceps sural influyen."
  ],
  "lesiones": [
   "Diferenciar rotura aguda.",
   "Diferenciar bursitis y otras causas de dolor posterior del talón."
  ],
  "fisio": [
   "Gestionar carga y progresar fortalecimiento de pantorrilla.",
   "Adaptar rango en tendinopatía insercional para evitar compresión dolorosa excesiva.",
   "Chasquido súbito con pérdida de impulso requiere valoración por posible rotura."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Achilles Tendinitis — https://www.orthoinfo.org/diseases--conditions/achilles-tendinitis/",
   "Journal of Athletic Training: Current Clinical Concepts: Conservative Management of Achilles Tendinopathy — https://pmc.ncbi.nlm.nih.gov/articles/PMC7249277/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-esguince-lateral-de-tobillo",
  "nombre": "Esguince lateral de tobillo",
  "tipo": "patologia",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Lesión del complejo ligamentario lateral, común tras inversión del pie.",
  "referencias": [
   "Dolor lateral con inflamación o hematoma.",
   "Dificultad para apoyar y sensación de inestabilidad."
  ],
  "relaciones": [
   "Ligamento talofibular anterior y, según gravedad, otros ligamentos laterales.",
   "Esguinces previos aumentan riesgo de recurrencia."
  ],
  "lesiones": [
   "Inestabilidad crónica y nuevos esguinces.",
   "Descartar fractura, lesión sindesmótica u osteocondral."
  ],
  "fisio": [
   "Tras descartar lesión grave, protección y carga progresiva según tolerancia.",
   "Recuperar movilidad, fuerza y equilibrio; retorno funcional gradual.",
   "Deformidad, alteración vascular o sospecha de fractura requieren atención médica."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Sprained Ankle — https://www.orthoinfo.org/diseases--conditions/sprained-ankle/",
   "NHS: Sprains and strains — https://www.nhs.uk/conditions/sprains-and-strains/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-fascitis-plantar",
  "nombre": "Fascitis plantar",
  "tipo": "patologia",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Dolor plantar del talón relacionado con fascia y tolerancia a carga; también se denomina fasciopatía plantar.",
  "referencias": [
   "Dolor en primeros pasos después de reposo.",
   "Sensibilidad plantar medial del talón."
  ],
  "relaciones": [
   "Fascia plantar en su relación con calcáneo.",
   "Carga prolongada y factores individuales del pie/pantorrilla."
  ],
  "lesiones": [
   "Diferenciar fractura por estrés del calcáneo.",
   "Diferenciar atrapamiento nervioso o dolor de almohadilla grasa."
  ],
  "fisio": [
   "Ajustar carga y calzado; progresar ejercicio y estiramiento tolerado de fascia/pantorrilla.",
   "Valorar apoyos complementarios según evolución y actividad.",
   "Dolor tras trauma, incapacidad de apoyar o parestesias persistentes requieren reevaluación."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Plantar Fasciitis and Bone Spurs — https://www.orthoinfo.org/diseases--conditions/plantar-fasciitis-and-bone-spurs/",
   "NHS: Plantar fasciitis — https://www.nhs.uk/conditions/plantar-fasciitis/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-neuropatia-periferica-diabetica",
  "nombre": "Neuropatía periférica diabética",
  "tipo": "patologia",
  "zona": "foot",
  "nombres": [],
  "descripcion": "Daño nervioso periférico asociado con diabetes, habitualmente de predominio distal y simétrico.",
  "referencias": [
   "Ardor, hormigueo o pérdida de sensibilidad en pies.",
   "Puede haber debilidad y alteración del equilibrio."
  ],
  "relaciones": [
   "Nervios periféricos y sus fibras sensitivas/motoras.",
   "Exposición prolongada a hiperglucemia y otros factores metabólicos/vasculares."
  ],
  "lesiones": [
   "Úlceras y lesiones inadvertidas del pie.",
   "Caídas y posible neuroartropatía de Charcot."
  ],
  "fisio": [
   "Educar sobre inspección de pies, calzado y protección frente a calor/trauma.",
   "Progresar fuerza y equilibrio adaptados a sensibilidad, piel y control médico.",
   "Pie nuevo caliente e hinchado, úlcera o infección exige valoración pronta; no continuar carga sin evaluar."
  ],
  "fuentes": [
   "NIDDK: Peripheral Neuropathy — https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/nerve-damage-diabetic-neuropathies/peripheral-neuropathy",
   "NHS: Peripheral neuropathy — https://www.nhs.uk/conditions/peripheral-neuropathy/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-sindrome-compartimental-agudo-y-por-esfuerzo",
  "nombre": "Síndrome compartimental (agudo y por esfuerzo)",
  "tipo": "patologia",
  "zona": "leg",
  "nombres": [],
  "descripcion": "La presión dentro de un compartimento puede comprometer perfusión; la forma aguda es una emergencia, distinta del cuadro crónico por esfuerzo.",
  "referencias": [
   "Agudo: dolor intenso creciente y dolor con estiramiento pasivo.",
   "Por esfuerzo: dolor o tensión repetible con ejercicio que suele ceder al parar."
  ],
  "relaciones": [
   "Compartimentos musculares limitados por fascia.",
   "Trauma, sangrado o compresión externa pueden desencadenar la forma aguda."
  ],
  "lesiones": [
   "Isquemia y daño muscular/nervioso irreversible en forma aguda.",
   "Diferenciar trombosis y lesión por estrés en dolor de pierna."
  ],
  "fisio": [
   "Sospecha aguda: suspender actividad y activar atención de urgencias; no masajear ni esperar pérdida de pulso.",
   "La presencia de pulso no descarta síndrome compartimental.",
   "En forma por esfuerzo confirmada, adaptar carga y coordinar manejo especializado antes del retorno."
  ],
  "fuentes": [
   "AAOS OrthoInfo: Compartment Syndrome — https://www.orthoinfo.org/diseases--conditions/compartment-syndrome/",
   "NHS: Compartment syndrome — https://www.nhs.uk/conditions/compartment-syndrome/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-trombosis-venosa-profunda",
  "nombre": "Trombosis venosa profunda",
  "tipo": "patologia",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Coágulo en una vena profunda, habitualmente de pierna; requiere diagnóstico y tratamiento médicos.",
  "referencias": [
   "Hinchazón unilateral con dolor o sensibilidad.",
   "Calor y cambio de color; también puede ser poco sintomática."
  ],
  "relaciones": [
   "Sistema venoso profundo.",
   "Inmovilidad, cirugía, cáncer y antecedente trombótico aumentan riesgo."
  ],
  "lesiones": [
   "Embolia pulmonar.",
   "Síndrome postrombótico; diferenciar celulitis y otras causas de edema."
  ],
  "fisio": [
   "Sospecha de trombosis: detener sesión y gestionar valoración urgente; no masajear la pierna.",
   "Tras tratamiento y autorización médica, adaptar movilización al estado y pauta del equipo.",
   "Disnea súbita, dolor torácico o desmayo requieren atención de emergencia."
  ],
  "fuentes": [
   "NHS: DVT (deep vein thrombosis) — https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/",
   "AAOS OrthoInfo: Deep Vein Thrombosis — https://www.orthoinfo.org/diseases--conditions/deep-vein-thrombosis/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-linfedema",
  "nombre": "Linfedema",
  "tipo": "patologia",
  "zona": "leg",
  "nombres": [],
  "descripcion": "Acumulación persistente de líquido por alteración del transporte linfático; puede ser primario o secundario.",
  "referencias": [
   "Aumento de volumen, pesadez y tirantez.",
   "Cambios progresivos de piel y tejido."
  ],
  "relaciones": [
   "Vasos y ganglios linfáticos.",
   "Cirugía, radioterapia u otras lesiones del sistema pueden contribuir."
  ],
  "lesiones": [
   "Celulitis y cambios fibróticos.",
   "Diferenciar trombosis, insuficiencia venosa y edema sistémico."
  ],
  "fisio": [
   "Abordaje especializado con cuidado de piel, ejercicio y compresión indicada individualmente.",
   "Evaluar perfusión y comorbilidades antes de compresión; drenaje manual según indicación, sin prometer cura.",
   "Enrojecimiento doloroso con fiebre o edema súbito unilateral requiere valoración urgente."
  ],
  "fuentes": [
   "NHS: Lymphoedema, Treatment — https://www.nhs.uk/conditions/lymphoedema/treatment/",
   "National Cancer Institute: Lymphedema and Cancer — https://www.cancer.gov/about-cancer/treatment/side-effects/lymphedema"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-osteoporosis",
  "nombre": "Osteoporosis",
  "tipo": "patologia",
  "zona": "back",
  "nombres": [],
  "descripcion": "Fragilidad del esqueleto que aumenta riesgo de fractura, con frecuencia sin síntomas hasta que ocurre una.",
  "referencias": [
   "Puede ser asintomática.",
   "Fractura vertebral puede causar dolor, pérdida de talla o cambio postural."
  ],
  "relaciones": [
   "Resistencia ósea disminuida.",
   "Edad, menopausia, corticoides y otros factores contribuyen."
  ],
  "lesiones": [
   "Fracturas por fragilidad de cadera, vértebras o muñeca.",
   "Limitación funcional y nuevas fracturas."
  ],
  "fisio": [
   "Entrenar fuerza, equilibrio y actividad con carga adaptada al riesgo de fractura.",
   "Educar en prevención de caídas y técnica de movimiento; coordinar tratamiento óseo médico.",
   "Dolor súbito de espalda o cadera tras trauma mínimo requiere descartar fractura antes de ejercitar."
  ],
  "fuentes": [
   "NHS: Osteoporosis — https://www.nhs.uk/conditions/osteoporosis/",
   "AAOS OrthoInfo: Osteoporosis — https://www.orthoinfo.org/diseases--conditions/osteoporosis/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-fibromialgia",
  "nombre": "Fibromialgia",
  "tipo": "patologia",
  "zona": "core",
  "nombres": [],
  "descripcion": "Síndrome de dolor generalizado persistente asociado a alteraciones del procesamiento del dolor, sueño y fatiga; no equivale a lesión muscular generalizada.",
  "referencias": [
   "Dolor en distintas regiones del cuerpo.",
   "Fatiga, sueño no reparador y dificultad de concentración."
  ],
  "relaciones": [
   "Mecanismos de modulación del dolor.",
   "Sueño, estrés y comorbilidades influyen en síntomas."
  ],
  "lesiones": [
   "Limitación de actividad y participación.",
   "Diferenciar enfermedades inflamatorias u otras causas cuando haya signos objetivos."
  ],
  "fisio": [
   "Educación y ejercicio aeróbico/de fuerza graduados desde nivel tolerable.",
   "Acordar progresión flexible y estrategias de sueño y autocuidado con equipo multidisciplinario.",
   "Fiebre, pérdida de peso no explicada o déficit focal nuevo requieren investigar otra causa."
  ],
  "fuentes": [
   "NHS: Fibromyalgia — https://www.nhs.uk/conditions/fibromyalgia/",
   "NIAMS: Fibromyalgia: Diagnosis, Treatment, and Steps to Take — https://www.niams.nih.gov/health-topics/fibromyalgia/diagnosis-treatment-and-steps-to-take"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-accidente-cerebrovascular-hemiparesia",
  "nombre": "Accidente cerebrovascular (hemiparesia)",
  "tipo": "patologia",
  "zona": "head",
  "nombres": [],
  "descripcion": "Lesión cerebral por interrupción del flujo sanguíneo o hemorragia que puede dejar debilidad de un lado y otras alteraciones.",
  "referencias": [
   "Debilidad súbita de cara, brazo o pierna.",
   "Alteración de habla, visión o equilibrio."
  ],
  "relaciones": [
   "Sistema nervioso central y circulación cerebral.",
   "La localización de la lesión determina los déficits."
  ],
  "lesiones": [
   "Discapacidad, caídas y limitación de uso del brazo.",
   "Pueden coexistir alteraciones sensitivas, cognitivas y de comunicación."
  ],
  "fisio": [
   "Síntomas nuevos súbitos requieren activar emergencias, aunque desaparezcan.",
   "Una vez estable, rehabilitación multidisciplinaria con práctica de tareas, marcha y equilibrio.",
   "Progresar fuerza y capacidad aeróbica con vigilancia y objetivos individuales."
  ],
  "fuentes": [
   "NHS: Symptoms of a stroke — https://www.nhs.uk/conditions/stroke/symptoms/",
   "AHA/ASA: Adult Stroke Rehabilitation and Recovery Guideline, Sensorimotor Impairments and Activities — https://www.stroke.org/en/-/media/Stroke-Files/Stroke-Resource-Center/Recovery/Provider-Focused/Sensorimotor-Impairments-and-Activities.pdf"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-enfermedad-de-parkinson",
  "nombre": "Enfermedad de Parkinson",
  "tipo": "patologia",
  "zona": "head",
  "nombres": [],
  "descripcion": "Enfermedad neurodegenerativa progresiva que afecta movimiento y también funciones no motoras.",
  "referencias": [
   "Lentitud de movimiento y rigidez.",
   "Puede haber temblor de reposo, bloqueo de marcha y problemas de equilibrio."
  ],
  "relaciones": [
   "Pérdida de función dopaminérgica en circuitos motores.",
   "Intervienen factores genéticos y ambientales; la causa individual suele ser compleja."
  ],
  "lesiones": [
   "Caídas y pérdida de independencia.",
   "Diferenciar otros parkinsonismos y efectos de medicamentos."
  ],
  "fisio": [
   "Ejercicio de fuerza, capacidad aeróbica y movilidad adaptado a función.",
   "Entrenar marcha, giros y equilibrio con estrategias individualizadas; coordinar horarios y respuesta a medicación.",
   "Caídas repetidas, desmayos o deterioro repentino requieren revisión médica."
  ],
  "fuentes": [
   "StatPearls: Parkinson Disease — https://www.ncbi.nlm.nih.gov/sites/books/NBK470193/",
   "NHS: Parkinson’s disease, Treatment — https://www.nhs.uk/conditions/parkinsons-disease/treatment/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-esclerosis-multiple",
  "nombre": "Esclerosis múltiple",
  "tipo": "patologia",
  "zona": "head",
  "nombres": [],
  "descripcion": "Enfermedad inmunomediada del sistema nervioso central con inflamación, desmielinización y posible daño axonal; su evolución es variable.",
  "referencias": [
   "Fatiga y debilidad o alteraciones sensitivas.",
   "Puede afectar visión, coordinación, marcha y función vesical."
  ],
  "relaciones": [
   "Encéfalo, médula y vías ópticas.",
   "La distribución de lesiones determina presentación clínica."
  ],
  "lesiones": [
   "Discapacidad, espasticidad y caídas.",
   "Distinguir brote de empeoramiento temporal por infección o calor."
  ],
  "fisio": [
   "Individualizar ejercicio de fuerza, equilibrio y capacidad aeróbica, considerando fatiga y temperatura.",
   "Planear descansos y apoyos para actividad y participación.",
   "Síntomas neurológicos nuevos persistentes o deterioro con infección requieren contacto médico."
  ],
  "fuentes": [
   "StatPearls: Multiple Sclerosis — https://www.ncbi.nlm.nih.gov/sites/books/NBK499849/",
   "NHS: Multiple sclerosis — https://www.nhs.uk/conditions/multiple-sclerosis/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-paralisis-facial-de-bell",
  "nombre": "Parálisis facial de Bell",
  "tipo": "patologia",
  "zona": "head",
  "nombres": [],
  "descripcion": "Parálisis periférica facial de inicio agudo y causa no identificada tras excluir otras; requiere valoración médica temprana.",
  "referencias": [
   "Debilidad unilateral de cara que puede incluir frente.",
   "Dificultad para cerrar ojo, sonreír o contener líquidos."
  ],
  "relaciones": [
   "Nervio facial periférico.",
   "Se propone inflamación nerviosa; no toda parálisis facial es Bell."
  ],
  "lesiones": [
   "Daño corneal por cierre incompleto.",
   "Sincinesias; diferenciar ictus, Ramsay Hunt y otras causas."
  ],
  "fisio": [
   "Priorizar protección ocular indicada por equipo médico y valoración temprana.",
   "Si persiste debilidad, valorar reeducación facial especializada con movimientos controlados.",
   "No usar respuesta de frente como único descarte de ictus: debilidad de brazo o habla alterada requiere emergencias."
  ],
  "fuentes": [
   "StatPearls: Bell Palsy — https://www.ncbi.nlm.nih.gov/sites/books/NBK482290/",
   "NHS: Bell’s palsy — https://www.nhs.uk/conditions/bells-palsy/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-sindrome-de-guillain-barre",
  "nombre": "Síndrome de Guillain-Barré",
  "tipo": "patologia",
  "zona": "core",
  "nombres": [],
  "descripcion": "Polirradiculoneuropatía inmunomediada aguda que puede progresar rápidamente y comprometer respiración; requiere atención hospitalaria.",
  "referencias": [
   "Debilidad progresiva, a menudo bilateral desde piernas.",
   "Parestesias y reflejos reducidos en presentación típica."
  ],
  "relaciones": [
   "Nervios periféricos y raíces.",
   "Frecuentemente aparece después de infección."
  ],
  "lesiones": [
   "Insuficiencia respiratoria.",
   "Disfunción autonómica y debilidad residual."
  ],
  "fisio": [
   "Debilidad rápidamente progresiva, disfagia o falta de aire requieren urgencias.",
   "Rehabilitación tras estabilización, con movilidad y carga graduada sin agotamiento.",
   "Vigilar fatiga, dolor, tolerancia respiratoria y respuesta autonómica en coordinación médica."
  ],
  "fuentes": [
   "StatPearls: Guillain-Barre Syndrome — https://www.ncbi.nlm.nih.gov/sites/books/NBK532254/",
   "NHS: Guillain-Barré syndrome — https://www.nhs.uk/conditions/guillain-barre-syndrome/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-lesion-de-la-medula-espinal",
  "nombre": "Lesión de la médula espinal",
  "tipo": "patologia",
  "zona": "back",
  "nombres": [],
  "descripcion": "Daño traumático o no traumático de médula que altera funciones motoras, sensitivas y autonómicas según nivel y extensión.",
  "referencias": [
   "Debilidad o parálisis bajo nivel afectado.",
   "Alteraciones sensitivas, vesicales o intestinales."
  ],
  "relaciones": [
   "Médula espinal y vías ascendentes/descendentes.",
   "Trauma, compresión y otras enfermedades pueden causarla."
  ],
  "lesiones": [
   "Lesiones por presión y complicaciones respiratorias.",
   "Disreflexia autonómica en lesiones susceptibles."
  ],
  "fisio": [
   "Trauma con déficit: protección y atención urgente antes de movilizar columna.",
   "Tras estabilidad, rehabilitación especializada de transferencias, movilidad, fuerza preservada y cuidados de piel.",
   "Cefalea intensa con sudoración y elevación tensional en persona susceptible puede ser disreflexia: activar manejo urgente."
  ],
  "fuentes": [
   "StatPearls: Spinal Cord Injuries — https://www.ncbi.nlm.nih.gov/sites/books/NBK560721/",
   "NSW Agency for Clinical Innovation: Treatment of autonomic dysreflexia for adults and adolescents with spinal cord injuries — https://aci.health.nsw.gov.au/networks/spinal-cord-injury/resources/autonomic-dysreflexia"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-paralisis-cerebral-infantil",
  "nombre": "Parálisis cerebral infantil",
  "tipo": "patologia",
  "zona": "core",
  "nombres": [],
  "descripcion": "Grupo de trastornos del movimiento y postura por alteración no progresiva del cerebro en desarrollo; las necesidades cambian con el crecimiento.",
  "referencias": [
   "Retraso o dificultad de habilidades motoras.",
   "Alteraciones de tono, coordinación y postura de grado variable."
  ],
  "relaciones": [
   "Cerebro en desarrollo.",
   "Pueden coexistir dificultades de visión, comunicación, alimentación o epilepsia."
  ],
  "lesiones": [
   "Contracturas y deformidad musculoesquelética secundarias.",
   "Dolor y limitación de participación; los cambios requieren reevaluación."
  ],
  "fisio": [
   "Practicar tareas significativas y actividad adaptada con familia y equipo.",
   "Trabajar fuerza, movilidad y ayudas según metas; mantener vigilancia musculoesquelética.",
   "Pérdida nueva de habilidades, dolor importante o problemas respiratorios/deglutorios requieren valoración."
  ],
  "fuentes": [
   "StatPearls: Cerebral Palsy — https://www.ncbi.nlm.nih.gov/sites/books/NBK538147/",
   "NHS: Cerebral palsy, Treatment — https://www.nhs.uk/conditions/cerebral-palsy/treatment/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-enfermedad-pulmonar-obstructiva-cronica-epoc",
  "nombre": "Enfermedad pulmonar obstructiva crónica (EPOC)",
  "tipo": "patologia",
  "zona": "chest",
  "nombres": [],
  "descripcion": "Enfermedad respiratoria con obstrucción persistente al flujo aéreo, asociada con frecuencia a exposición a humo y otras partículas.",
  "referencias": [
   "Disnea de esfuerzo.",
   "Tos y expectoración crónicas en algunos pacientes."
  ],
  "relaciones": [
   "Vías aéreas y parénquima pulmonar.",
   "Tabaquismo y exposiciones ambientales/laborales pueden contribuir."
  ],
  "lesiones": [
   "Exacerbaciones y descondicionamiento.",
   "Insuficiencia respiratoria en enfermedad avanzada."
  ],
  "fisio": [
   "Rehabilitación pulmonar con ejercicio y educación adaptados a valoración clínica.",
   "Apoyar abandono del tabaco, estrategias de actividad y uso correcto del tratamiento prescrito.",
   "Disnea intensa nueva, confusión, dolor torácico o coloración azulada requieren urgencias; no ajustar oxígeno sin indicación."
  ],
  "fuentes": [
   "NHLBI: COPD, Treatment — https://www.nhlbi.nih.gov/health/copd/treatment",
   "NHS: Chronic obstructive pulmonary disease (COPD), Treatment — https://www.nhs.uk/conditions/chronic-obstructive-pulmonary-disease-copd/treatment/"
  ],
  "verificacion": "dos fuentes"
 },
 {
  "id": "patologia-incontinencia-urinaria-de-esfuerzo-y-disfuncion-del-suelo-pelvico",
  "nombre": "Incontinencia urinaria de esfuerzo y disfunción del suelo pélvico",
  "tipo": "patologia",
  "zona": "core",
  "nombres": [],
  "descripcion": "La incontinencia de esfuerzo es pérdida de orina con aumento de presión abdominal; otras disfunciones pélvicas pueden tener mecanismos diferentes.",
  "referencias": [
   "Escape al toser, saltar o hacer esfuerzo.",
   "Puede coexistir sensación de debilidad o alteración del control pélvico."
  ],
  "relaciones": [
   "Soporte uretral y función del suelo pélvico.",
   "Embarazo/parto, cirugía y otros factores pueden contribuir."
  ],
  "lesiones": [
   "Impacto en actividad y calidad de vida.",
   "Diferenciar urgencia, infección, retención y causas neurológicas."
  ],
  "fisio": [
   "Valoración por personal capacitado, con consentimiento; entrenamiento supervisado según capacidad de contraer y relajar.",
   "No indicar fortalecimiento indiscriminado si hay dolor o exceso de tono; adaptar actividades y hábitos.",
   "Sangre en orina, fiebre, retención o síntomas neurológicos nuevos requieren valoración médica."
  ],
  "fuentes": [
   "NHS: Urinary incontinence — https://www.nhs.uk/conditions/urinary-incontinence/",
   "NIDDK: Treatments for Bladder Control Problems (Urinary Incontinence) — https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-control-problems/treatment"
  ],
  "verificacion": "dos fuentes"
 }
]);
