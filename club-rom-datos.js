/* Club FisioTeck — Rangos de movimiento: valores de referencia y técnica goniométrica por movimiento (posición, eje, brazo fijo y brazo móvil).
   Redactados a partir de AAOS (1965) y Norkin y White; la columna cervical sigue AAOS, la lumbar Norkin y White / AMA, y la torácica y las rotaciones de rodilla Magee / Kapandji.
   La verificación en línea fue limitada: un profesional debe contrastar estos valores con los libros antes de publicarlos. Los valores de ref = 0 (extensión de codo y rodilla) no se muestran como fila. */
window.FT_ROM_TECNICA = {
 "hombro": [
  {
   "m": "Flexión",
   "ref": 180,
   "posicion": "Supino, rodillas flexionadas y columna lumbar apoyada; brazo al costado con la palma hacia el cuerpo.",
   "eje": "Centro de la cara lateral del acromion (cerca del tubérculo mayor).",
   "fijo": "Línea media lateral del tórax.",
   "movil": "Línea media lateral del húmero, hacia el epicóndilo lateral."
  },
  {
   "m": "Extensión",
   "ref": 60,
   "posicion": "Prono (o sentado), cabeza girada; brazo al costado con la palma hacia el cuerpo.",
   "eje": "Centro de la cara lateral del acromion.",
   "fijo": "Línea media lateral del tórax.",
   "movil": "Línea media lateral del húmero, hacia el epicóndilo lateral."
  },
  {
   "m": "Abducción",
   "ref": 180,
   "posicion": "Supino o sentado; brazo al costado con rotación externa (palma al frente) para que el tubérculo mayor no choque con el acromion.",
   "eje": "Cara anterior (o posterior) de la articulación acromioclavicular, en el acromion.",
   "fijo": "Paralelo al esternón (línea media anterior del tronco).",
   "movil": "Línea media anterior del húmero, hacia el punto medio del pliegue del codo."
  },
  {
   "m": "Aducción",
   "ref": 45,
   "posicion": "Sentado o de pie; brazo elevado en abducción o flexión y llevado por delante del cuerpo (no tiene técnica propia en Norkin y White ni valor AAOS).",
   "eje": "Acromion (cara anterior de la articulación acromioclavicular).",
   "fijo": "Paralelo al esternón (línea media anterior del tronco).",
   "movil": "Línea media anterior del húmero."
  },
  {
   "m": "Rotación externa",
   "ref": 90,
   "posicion": "Supino, hombro en abducción de 90°, codo flexionado 90°, antebrazo perpendicular a la camilla en pronación y toalla bajo el húmero.",
   "eje": "Olécranon.",
   "fijo": "Perpendicular al piso (vertical).",
   "movil": "Paralelo al borde cubital del antebrazo, hacia la apófisis estiloides cubital."
  },
  {
   "m": "Rotación interna",
   "ref": 70,
   "posicion": "Supino, hombro en abducción de 90°, codo flexionado 90°, antebrazo perpendicular a la camilla en pronación y toalla bajo el húmero.",
   "eje": "Olécranon.",
   "fijo": "Perpendicular al piso (vertical).",
   "movil": "Paralelo al borde cubital del antebrazo, hacia la apófisis estiloides cubital."
  },
  {
   "m": "Abducción horizontal",
   "ref": 45,
   "posicion": "Sentado; hombro en abducción de 90° con el codo flexionado y antebrazo en pronación; se lleva el brazo hacia atrás en el plano horizontal (técnica AAOS; Norkin y White no la desarrolla).",
   "eje": "Cara superior del acromion.",
   "fijo": "Perpendicular al tronco, a lo largo de la línea que une ambos acromion con el brazo en 90° de abducción (posición 0°).",
   "movil": "Línea media longitudinal del húmero, hacia el epicóndilo lateral."
  },
  {
   "m": "Aducción horizontal",
   "ref": 135,
   "posicion": "Sentado; hombro en abducción de 90° con el codo flexionado y antebrazo en pronación; se lleva el brazo hacia delante cruzando el pecho en el plano horizontal (técnica AAOS).",
   "eje": "Cara superior del acromion.",
   "fijo": "Perpendicular al tronco, a lo largo de la línea que une ambos acromion con el brazo en 90° de abducción (posición 0°).",
   "movil": "Línea media longitudinal del húmero, hacia el epicóndilo lateral."
  }
 ],
 "codo": [
  {
   "m": "Flexión",
   "ref": 150,
   "posicion": "Supino, brazo al costado con una toalla bajo el húmero distal, codo extendido y antebrazo en supinación.",
   "eje": "Epicóndilo lateral del húmero.",
   "fijo": "Línea media lateral del húmero, hacia el acromion.",
   "movil": "Línea media lateral del radio, hacia la apófisis estiloides radial."
  },
  {
   "m": "Extensión",
   "ref": 0,
   "posicion": "Igual que la flexión; es el retorno desde la flexión hasta 0° (algunas personas llegan a 5-10° de hiperextensión).",
   "eje": "Epicóndilo lateral del húmero.",
   "fijo": "Línea media lateral del húmero, hacia el acromion.",
   "movil": "Línea media lateral del radio, hacia la apófisis estiloides radial."
  },
  {
   "m": "Supinación",
   "ref": 80,
   "posicion": "Sentado, brazo pegado al tronco, codo flexionado 90° y antebrazo en posición neutra (pulgar hacia arriba).",
   "eje": "Lateral a la apófisis estiloides cubital (con la mano sosteniendo un lápiz como guía).",
   "fijo": "Paralelo a la línea media anterior del húmero.",
   "movil": "A lo largo de la cara palmar (ventral) del antebrazo distal, justo por encima de las estiloides."
  },
  {
   "m": "Pronación",
   "ref": 80,
   "posicion": "Sentado, brazo pegado al tronco, codo flexionado 90° y antebrazo en posición neutra (pulgar hacia arriba).",
   "eje": "Lateral a la apófisis estiloides cubital (con la mano sosteniendo un lápiz como guía).",
   "fijo": "Paralelo a la línea media anterior del húmero.",
   "movil": "A lo largo de la cara dorsal del antebrazo distal, justo por encima de las estiloides."
  }
 ],
 "muñeca": [
  {
   "m": "Flexión (palmar)",
   "ref": 80,
   "posicion": "Sentado, antebrazo apoyado en la mesa en pronación con la mano fuera del borde; muñeca en posición neutra.",
   "eje": "Cara lateral de la muñeca, sobre el hueso piramidal (triquetrum).",
   "fijo": "Línea media lateral del cúbito, entre olécranon y estiloides cubital.",
   "movil": "Línea media lateral del 5.º metacarpiano."
  },
  {
   "m": "Extensión (dorsal)",
   "ref": 70,
   "posicion": "Sentado, antebrazo apoyado en la mesa en pronación con la mano fuera del borde; muñeca en posición neutra.",
   "eje": "Cara lateral de la muñeca, sobre el hueso piramidal (triquetrum).",
   "fijo": "Línea media lateral del cúbito, entre olécranon y estiloides cubital.",
   "movil": "Línea media lateral del 5.º metacarpiano."
  },
  {
   "m": "Desviación radial",
   "ref": 20,
   "posicion": "Sentado, antebrazo en pronación con la palma apoyada sobre la mesa; muñeca en posición neutra.",
   "eje": "Cara dorsal de la muñeca, sobre el hueso grande (capitato).",
   "fijo": "Línea media dorsal del antebrazo, hacia el epicóndilo lateral.",
   "movil": "Línea media dorsal del 3.er metacarpiano."
  },
  {
   "m": "Desviación cubital",
   "ref": 30,
   "posicion": "Sentado, antebrazo en pronación con la palma apoyada sobre la mesa; muñeca en posición neutra.",
   "eje": "Cara dorsal de la muñeca, sobre el hueso grande (capitato).",
   "fijo": "Línea media dorsal del antebrazo, hacia el epicóndilo lateral.",
   "movil": "Línea media dorsal del 3.er metacarpiano."
  }
 ],
 "cadera": [
  {
   "m": "Flexión",
   "ref": 120,
   "posicion": "Supino, cadera y rodilla contraria en neutro; se flexiona la rodilla al subir el muslo y se evita la inclinación posterior de la pelvis.",
   "eje": "Trocánter mayor del fémur.",
   "fijo": "Línea media lateral de la pelvis.",
   "movil": "Línea media lateral del fémur, hacia el cóndilo lateral."
  },
  {
   "m": "Extensión",
   "ref": 30,
   "posicion": "Prono, rodilla en extensión, pelvis estable (se evita la inclinación anterior y la rotación).",
   "eje": "Trocánter mayor del fémur.",
   "fijo": "Línea media lateral de la pelvis.",
   "movil": "Línea media lateral del fémur, hacia el cóndilo lateral."
  },
  {
   "m": "Abducción",
   "ref": 45,
   "posicion": "Supino, pelvis nivelada, ambas piernas en extensión y rotación neutra.",
   "eje": "Espina ilíaca anterosuperior (EIAS) del lado evaluado.",
   "fijo": "Línea que une ambas EIAS.",
   "movil": "Línea media anterior del fémur, hacia el centro de la rótula."
  },
  {
   "m": "Aducción",
   "ref": 30,
   "posicion": "Supino, pelvis nivelada; la pierna contraria se coloca en abducción para dejar paso.",
   "eje": "Espina ilíaca anterosuperior (EIAS) del lado evaluado.",
   "fijo": "Línea que une ambas EIAS.",
   "movil": "Línea media anterior del fémur, hacia el centro de la rótula."
  },
  {
   "m": "Rotación externa",
   "ref": 45,
   "posicion": "Sentado al borde de la camilla con cadera y rodilla a 90° (o supino con cadera y rodilla en 90°); se evita la inclinación del tronco.",
   "eje": "Centro de la rótula (cara anterior).",
   "fijo": "Perpendicular al piso (o línea vertical del muslo).",
   "movil": "Línea media anterior de la tibia, hacia un punto entre los maléolos."
  },
  {
   "m": "Rotación interna",
   "ref": 45,
   "posicion": "Sentado al borde de la camilla con cadera y rodilla a 90° (o supino con cadera y rodilla en 90°); se evita la inclinación del tronco.",
   "eje": "Centro de la rótula (cara anterior).",
   "fijo": "Perpendicular al piso (o línea vertical del muslo).",
   "movil": "Línea media anterior de la tibia, hacia un punto entre los maléolos."
  }
 ],
 "rodilla": [
  {
   "m": "Flexión",
   "ref": 135,
   "posicion": "Supino, cadera en 0° y rodilla en extensión; se lleva el talón hacia el glúteo.",
   "eje": "Epicóndilo lateral del fémur.",
   "fijo": "Línea media lateral del fémur, hacia el trocánter mayor.",
   "movil": "Línea media lateral del peroné, hacia el maléolo lateral."
  },
  {
   "m": "Extensión",
   "ref": 0,
   "posicion": "Igual que la flexión; es el retorno desde la flexión hasta 0° (se admite hiperextensión de 5-10°).",
   "eje": "Epicóndilo lateral del fémur.",
   "fijo": "Línea media lateral del fémur, hacia el trocánter mayor.",
   "movil": "Línea media lateral del peroné, hacia el maléolo lateral."
  },
  {
   "m": "Rotación interna (con flexión 90°)",
   "ref": 30,
   "posicion": "Sentado al borde de la camilla, rodilla flexionada 90°, muslo fijo; método ángulo muslo-pie visto desde arriba (Magee; Norkin y White no da valores goniométricos).",
   "eje": "Centro del talón (calcáneo) visto desde arriba.",
   "fijo": "Línea paralela al eje longitudinal del muslo (posición 0° con el pie hacia delante).",
   "movil": "Línea paralela al eje longitudinal del pie (segundo metatarsiano)."
  },
  {
   "m": "Rotación externa (con flexión 90°)",
   "ref": 40,
   "posicion": "Sentado al borde de la camilla, rodilla flexionada 90°, muslo fijo; método ángulo muslo-pie visto desde arriba (Magee; Norkin y White no da valores goniométricos).",
   "eje": "Centro del talón (calcáneo) visto desde arriba.",
   "fijo": "Línea paralela al eje longitudinal del muslo (posición 0° con el pie hacia delante).",
   "movil": "Línea paralela al eje longitudinal del pie (segundo metatarsiano)."
  }
 ],
 "tobillo": [
  {
   "m": "Dorsiflexión",
   "ref": 20,
   "posicion": "Sentado o supino con la rodilla flexionada unos 30-45° (relaja el gastrocnemio); tobillo en posición neutra (pie a 90° con la pierna).",
   "eje": "Punta del maléolo lateral.",
   "fijo": "Línea media lateral del peroné, hacia la cabeza del peroné.",
   "movil": "Paralelo al borde lateral del 5.º metatarsiano."
  },
  {
   "m": "Flexión plantar",
   "ref": 50,
   "posicion": "Sentado o supino con la rodilla flexionada; tobillo en posición neutra.",
   "eje": "Punta del maléolo lateral.",
   "fijo": "Línea media lateral del peroné, hacia la cabeza del peroné.",
   "movil": "Paralelo al borde lateral del 5.º metatarsiano."
  },
  {
   "m": "Inversión",
   "ref": 35,
   "posicion": "Sentado o supino, rodilla flexionada, tobillo en neutro; el valor AAOS es del pie en conjunto (subtalar y mediotarsiana).",
   "eje": "Cara anterior del tobillo, en el punto medio entre ambos maléolos.",
   "fijo": "Línea media anterior de la pierna, hacia la tuberosidad tibial.",
   "movil": "Línea media anterior del 2.º metatarsiano."
  },
  {
   "m": "Eversión",
   "ref": 15,
   "posicion": "Sentado o supino, rodilla flexionada, tobillo en neutro; el valor AAOS es del pie en conjunto (subtalar y mediotarsiana).",
   "eje": "Cara anterior del tobillo, en el punto medio entre ambos maléolos.",
   "fijo": "Línea media anterior de la pierna, hacia la tuberosidad tibial.",
   "movil": "Línea media anterior del 2.º metatarsiano."
  }
 ],
 "cervical": [
  {
   "m": "Flexión",
   "ref": 45,
   "posicion": "Sentado, tronco apoyado y erguido, cabeza en posición neutra; se evita la flexión del tronco.",
   "eje": "Meato auditivo externo.",
   "fijo": "Perpendicular al piso (vertical).",
   "movil": "Paralelo a la base de las fosas nasales (o a una línea del meato a la comisura de la boca)."
  },
  {
   "m": "Extensión",
   "ref": 45,
   "posicion": "Sentado, tronco apoyado y erguido, cabeza en posición neutra; se evita la extensión del tronco.",
   "eje": "Meato auditivo externo.",
   "fijo": "Perpendicular al piso (vertical).",
   "movil": "Paralelo a la base de las fosas nasales (o a una línea del meato a la comisura de la boca)."
  },
  {
   "m": "Rotación derecha",
   "ref": 60,
   "posicion": "Sentado, hombros nivelados y tronco apoyado, cabeza en neutro, mirada al frente.",
   "eje": "Centro de la cara superior (vértex) de la cabeza.",
   "fijo": "Paralelo a la línea que une ambos acromion.",
   "movil": "Punta de la nariz (línea hacia la nariz)."
  },
  {
   "m": "Rotación izquierda",
   "ref": 60,
   "posicion": "Sentado, hombros nivelados y tronco apoyado, cabeza en neutro, mirada al frente.",
   "eje": "Centro de la cara superior (vértex) de la cabeza.",
   "fijo": "Paralelo a la línea que une ambos acromion.",
   "movil": "Punta de la nariz (línea hacia la nariz)."
  },
  {
   "m": "Inclinación lateral derecha",
   "ref": 45,
   "posicion": "Sentado, tronco apoyado y hombros nivelados, cabeza en neutro; se evita elevar el hombro.",
   "eje": "Apófisis espinosa de C7.",
   "fijo": "Sobre las apófisis espinosas de la columna torácica (vertical).",
   "movil": "Línea media dorsal de la cabeza, hacia la protuberancia occipital."
  },
  {
   "m": "Inclinación lateral izquierda",
   "ref": 45,
   "posicion": "Sentado, tronco apoyado y hombros nivelados, cabeza en neutro; se evita elevar el hombro.",
   "eje": "Apófisis espinosa de C7.",
   "fijo": "Sobre las apófisis espinosas de la columna torácica (vertical).",
   "movil": "Línea media dorsal de la cabeza, hacia la protuberancia occipital."
  }
 ],
 "lumbar": [
  {
   "m": "Flexión",
   "ref": 60,
   "posicion": "De pie, pies a la altura de los hombros y rodillas extendidas; se flexiona el tronco (columna toracolumbar). Alternativa: cinta o prueba de Schober modificada.",
   "eje": "Cara lateral del tronco a la altura de L5 (unión lumbosacra).",
   "fijo": "Perpendicular al piso (vertical).",
   "movil": "Línea media lateral del tronco, hacia la axila."
  },
  {
   "m": "Extensión",
   "ref": 25,
   "posicion": "De pie, pies a la altura de los hombros y rodillas extendidas; se extiende el tronco con las manos sobre la pelvis.",
   "eje": "Cara lateral del tronco a la altura de L5 (unión lumbosacra).",
   "fijo": "Perpendicular al piso (vertical).",
   "movil": "Línea media lateral del tronco, hacia la axila."
  },
  {
   "m": "Rotación derecha",
   "ref": 30,
   "posicion": "Sentado (la pelvis queda fija), brazos cruzados sobre el pecho; es la rotación toracolumbar del tronco.",
   "eje": "Centro de la cara superior de la cabeza.",
   "fijo": "Paralelo a la línea que une ambas crestas ilíacas.",
   "movil": "Paralelo a la línea que une ambos acromion."
  },
  {
   "m": "Rotación izquierda",
   "ref": 30,
   "posicion": "Sentado (la pelvis queda fija), brazos cruzados sobre el pecho; es la rotación toracolumbar del tronco.",
   "eje": "Centro de la cara superior de la cabeza.",
   "fijo": "Paralelo a la línea que une ambas crestas ilíacas.",
   "movil": "Paralelo a la línea que une ambos acromion."
  },
  {
   "m": "Inclinación lateral derecha",
   "ref": 25,
   "posicion": "De pie, pies separados a la altura de los hombros y rodillas extendidas; el tronco se inclina sin flexionar ni rotar.",
   "eje": "Apófisis espinosa de S1 (cara posterior).",
   "fijo": "Perpendicular al piso (vertical).",
   "movil": "Hacia la apófisis espinosa de C7."
  },
  {
   "m": "Inclinación lateral izquierda",
   "ref": 25,
   "posicion": "De pie, pies separados a la altura de los hombros y rodillas extendidas; el tronco se inclina sin flexionar ni rotar.",
   "eje": "Apófisis espinosa de S1 (cara posterior).",
   "fijo": "Perpendicular al piso (vertical).",
   "movil": "Hacia la apófisis espinosa de C7."
  }
 ],
 "torax": [
  {
   "m": "Flexión",
   "ref": 40,
   "posicion": "De pie o sentado, se flexiona el tórax. Medición con cinta (distancia C7-T12, aumenta cerca de 2.5-3 cm) o con dos inclinómetros; el goniómetro no es el método habitual.",
   "eje": "No hay eje de goniómetro; se usan dos inclinómetros.",
   "fijo": "Inclinómetro inferior sobre T12.",
   "movil": "Inclinómetro superior sobre T1."
  },
  {
   "m": "Extensión",
   "ref": 25,
   "posicion": "De pie o sentado, se extiende el tórax. Medición con cinta (distancia C7-T12, disminuye) o con dos inclinómetros.",
   "eje": "No hay eje de goniómetro; se usan dos inclinómetros.",
   "fijo": "Inclinómetro inferior sobre T12.",
   "movil": "Inclinómetro superior sobre T1."
  },
  {
   "m": "Rotación derecha",
   "ref": 35,
   "posicion": "Sentado con la pelvis fija, brazos cruzados sobre el pecho; se rota el tronco hacia la derecha (rotación toracolumbar).",
   "eje": "Centro de la cara superior de la cabeza.",
   "fijo": "Paralelo a la línea que une ambas crestas ilíacas.",
   "movil": "Paralelo a la línea que une ambos acromion."
  },
  {
   "m": "Rotación izquierda",
   "ref": 35,
   "posicion": "Sentado con la pelvis fija, brazos cruzados sobre el pecho; se rota el tronco hacia la izquierda (rotación toracolumbar).",
   "eje": "Centro de la cara superior de la cabeza.",
   "fijo": "Paralelo a la línea que une ambas crestas ilíacas.",
   "movil": "Paralelo a la línea que une ambos acromion."
  },
  {
   "m": "Inclinación lateral",
   "ref": 20,
   "posicion": "De pie, pies separados a la altura de los hombros; el tronco se inclina hacia un lado sin flexionar ni rotar (se mide cada lado).",
   "eje": "Apófisis espinosa de S1 (cara posterior).",
   "fijo": "Perpendicular al piso (vertical).",
   "movil": "Hacia la apófisis espinosa de C7."
  }
 ]
};
window.FT_ROM_REFERENCIAS = [
 {
  "texto": "American Academy of Orthopaedic Surgeons. Joint Motion: Method of Measuring and Recording. Chicago: AAOS; 1965."
 },
 {
  "texto": "Norkin CC, White DJ. Measurement of Joint Motion: A Guide to Goniometry. 4.ª ed. Philadelphia: F.A. Davis; 2009 (5.ª ed., 2016)."
 },
 {
  "texto": "Boone DC, Azen SP. Normal range of motion of joints in male subjects. J Bone Joint Surg Am. 1979;61(5):756-759."
 },
 {
  "texto": "American Medical Association. Guides to the Evaluation of Permanent Impairment. 5.ª ed. 2000 (columna)."
 },
 {
  "texto": "Magee DJ. Orthopedic Physical Assessment. 6.ª ed. Elsevier; 2014 (columna torácica y rotaciones de rodilla)."
 },
 {
  "texto": "Kapandji AI. The Physiology of the Joints, vol. 2. 6.ª ed. Churchill Livingstone; 2011 (rotaciones de rodilla)."
 }
];
