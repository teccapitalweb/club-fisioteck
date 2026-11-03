/* Club FisioTeck — contenido de apoyo de la Calculadora de rehabilitación: biblioteca de ejercicios por región, señales de alarma (banderas rojas),
   criterios de progresión e ideas por objetivo. Contrastado con guías (JOSPT, IFOMPT, NICE, ACSM) en la búsqueda del 3 de noviembre de 2026; muchas cifras de dosificación se apoyan en esas fuentes sin haber leído el texto completo, así que debe REVISARLO una fisioterapeuta antes de publicarlo. Los valores de dosificación son ejemplos de partida,
   no una prescripción. Campos de cada ejercicio: n nombre, d cómo se hace, s series, r repeticiones (0 si es por tiempo), t segundos de trabajo (0 si es por repeticiones), descanso en segundos. */
window.FT_PLAN_BIB = {
 "zonas": {
  "cuello": {
   "nombre": "Cuello (columna cervical)",
   "movilidad": [
    {
     "n": "Rotación cervical activa",
     "d": "Sentado, gira lentamente la cabeza a un lado y al otro sin forzar el final del rango.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Inclinación lateral activa",
     "d": "Lleva la oreja hacia el hombro sin elevarlo, alterna lados con movimiento lento y controlado.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Flexión y extensión cervical suave",
     "d": "Baja el mentón hacia el pecho y regresa a neutro, sin llevar la extensión al límite.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Deslizamiento de la barbilla (retracción)",
     "d": "Desliza la barbilla hacia atrás como formando doble mentón, manteniendo la mirada al frente.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    }
   ],
   "fortalecimiento": [
    {
     "n": "Isométrico de flexión cervical",
     "d": "Presiona la frente contra la mano sin mover la cabeza, con esfuerzo suave y respiración libre.",
     "s": 3,
     "r": 0,
     "t": 10,
     "descanso": 30
    },
    {
     "n": "Isométrico de rotación cervical",
     "d": "Empuja la sien contra la mano sin permitir movimiento, a intensidad leve y sostenida.",
     "s": 3,
     "r": 0,
     "t": 10,
     "descanso": 30
    },
    {
     "n": "Remo con banda elástica",
     "d": "Tira de la banda hacia el abdomen juntando las escápulas, con el cuello relajado.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Encogimiento de hombros controlado",
     "d": "Eleva los hombros hacia las orejas y desciende lento, con mancuerna ligera o sin peso.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    }
   ],
   "estabilidad": [
    {
     "n": "Flexión craneocervical en supino",
     "d": "Boca arriba, asiente suavemente con la cabeza como diciendo sí, sin despegar la nuca.",
     "s": 3,
     "r": 0,
     "t": 10,
     "descanso": 30
    },
    {
     "n": "Control de la posición cervical con láser",
     "d": "Con un puntero en la cabeza, sigue un trayecto en la pared moviendo solo el cuello.",
     "s": 2,
     "r": 0,
     "t": 30,
     "descanso": 30
    },
    {
     "n": "Retracción cervical contra la pared",
     "d": "De pie con la espalda apoyada, lleva la nuca hacia la pared y sostén.",
     "s": 3,
     "r": 0,
     "t": 10,
     "descanso": 30
    },
    {
     "n": "Estabilización escapular en cuadrupedia",
     "d": "Apoyado en manos y rodillas, empuja el suelo para mantener las escápulas estables y el cuello neutro.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 45
    }
   ],
   "banderas": [
    "Mareo, visión doble o dificultad para hablar o tragar tras movimientos del cuello",
    "Signos de mielopatía: torpeza de manos, marcha inestable o pérdida del equilibrio",
    "Trauma importante reciente de cuello o cabeza",
    "Fiebre con rigidez de cuello intensa o dolor nocturno persistente",
    "Antecedente de cáncer con dolor cervical nuevo, intenso o que no cede en reposo",
    "Dolor en cuello o brazo con dolor torácico, falta de aire o sudoración (posible origen cardíaco)",
    "Dolor de cuello o cefalea súbita e inusual, o caída súbita sin causa clara (descartar origen vascular y derivar)"
   ]
  },
  "hombro": {
   "nombre": "Hombro",
   "movilidad": [
    {
     "n": "Péndulo de Codman",
     "d": "Inclinado con el brazo colgando, haz círculos pequeños relajados con el peso del brazo.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Elevación asistida con bastón",
     "d": "Boca arriba, eleva ambos brazos sujetando un bastón y deja que el brazo sano ayude.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Rotación externa asistida con bastón",
     "d": "Codo pegado al cuerpo y flexionado, empuja con el bastón para girar el antebrazo hacia fuera.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Deslizamiento en pared (escalera de dedos)",
     "d": "Camina con los dedos por la pared hacia arriba hasta donde tolere sin dolor intenso.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    }
   ],
   "fortalecimiento": [
    {
     "n": "Rotación externa con banda",
     "d": "Codo flexionado a 90 grados junto al tronco, gira el antebrazo hacia fuera contra la banda.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Rotación interna con banda",
     "d": "Codo junto al tronco a 90 grados, lleva el antebrazo hacia el abdomen contra la banda.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Elevación en el plano de la escápula",
     "d": "Eleva el brazo con el pulgar arriba, unos 30 grados por delante del cuerpo, con peso ligero.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Remo con banda elástica",
     "d": "Tira de la banda hacia el abdomen llevando los codos atrás y juntando las escápulas.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    }
   ],
   "estabilidad": [
    {
     "n": "Flexión de brazos en pared con énfasis escapular",
     "d": "Apoyado en la pared, haz la flexión y empuja al final para separar las escápulas.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Estabilización rítmica en pared",
     "d": "Mano en la pared, mantén el brazo firme mientras otra persona aplica empujes suaves variables.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 30
    },
    {
     "n": "Apoyo en cuadrupedia con desplazamiento de peso",
     "d": "En manos y rodillas, balancea el peso hacia delante y atrás manteniendo hombros estables.",
     "s": 3,
     "r": 0,
     "t": 30,
     "descanso": 45
    },
    {
     "n": "Retracción y descenso escapular",
     "d": "De pie, lleva las escápulas atrás y abajo sin arquear la espalda, sostén y relaja.",
     "s": 3,
     "r": 0,
     "t": 10,
     "descanso": 30
    }
   ],
   "banderas": [
    "Dolor torácico, falta de aire, sudoración o dolor irradiado a brazo izquierdo y mandíbula (posible origen cardíaco)",
    "Trauma reciente con deformidad, sospecha de luxación o de fractura",
    "Incapacidad súbita para elevar el brazo tras un traumatismo (posible rotura masiva)",
    "Hombro caliente, enrojecido e hinchado con fiebre (posible infección articular)",
    "Dolor nocturno intenso y progresivo con antecedente de cáncer",
    "Pérdida de fuerza o sensibilidad en el brazo con síntomas de origen cervical"
   ]
  },
  "codo": {
   "nombre": "Codo",
   "movilidad": [
    {
     "n": "Flexión y extensión activa del codo",
     "d": "Dobla y estira el codo dentro del rango sin dolor, con movimiento lento y fluido.",
     "s": 2,
     "r": 12,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Pronación y supinación del antebrazo",
     "d": "Con el codo a 90 grados pegado al cuerpo, gira la palma hacia abajo y hacia arriba.",
     "s": 2,
     "r": 12,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Estiramiento suave de extensores de muñeca",
     "d": "Con el codo extendido y la palma abajo, flexiona la muñeca con la otra mano.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 20
    },
    {
     "n": "Estiramiento suave de flexores de muñeca",
     "d": "Con el codo extendido y la palma arriba, extiende la muñeca con ayuda de la otra mano.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 20
    }
   ],
   "fortalecimiento": [
    {
     "n": "Isométrico de extensores de muñeca",
     "d": "Antebrazo apoyado, empuja el dorso de la mano hacia arriba contra la otra mano sin moverla.",
     "s": 3,
     "r": 0,
     "t": 10,
     "descanso": 30
    },
    {
     "n": "Extensión de muñeca excéntrica con mancuerna",
     "d": "Sube la muñeca con la otra mano y desciende lento con peso ligero durante tres segundos.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Flexión de codo con mancuerna",
     "d": "Con palma arriba y peso ligero, dobla el codo sin balancear el tronco.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Extensión de codo con banda",
     "d": "Con la banda anclada arriba, estira el codo hacia abajo manteniendo el brazo pegado al cuerpo.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    }
   ],
   "estabilidad": [
    {
     "n": "Prensión isométrica con pelota blanda",
     "d": "Aprieta una pelota blanda con intensidad moderada y sostén, con el antebrazo apoyado.",
     "s": 3,
     "r": 0,
     "t": 10,
     "descanso": 30
    },
    {
     "n": "Apoyo en cuadrupedia con codos extendidos",
     "d": "Apoyado en manos y rodillas, mantén los codos firmes sin bloquearlos y respira con normalidad.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 45
    },
    {
     "n": "Giro de martillo controlado",
     "d": "Sostén un martillo o mancuerna ligera y gira el antebrazo lentamente sin mover el codo.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Flexión en pared con control del codo",
     "d": "Haz flexiones inclinado en la pared, manteniendo el codo alineado y descenso lento.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 45
    }
   ],
   "banderas": [
    "Trauma reciente con deformidad, hinchazón marcada o incapacidad de mover el codo",
    "Codo caliente, enrojecido e hinchado con fiebre (posible infección articular)",
    "Bloqueo mecánico del codo que impide la extensión completa de forma súbita",
    "Hormigueo, entumecimiento o pérdida de fuerza progresiva en la mano",
    "Dolor en el brazo con dolor torácico, falta de aire o sudoración (posible origen cardíaco)",
    "Imposibilidad de extender completamente el codo tras un trauma (posible fractura): descartar con imagen antes de tratar"
   ]
  },
  "muñeca": {
   "nombre": "Muñeca",
   "movilidad": [
    {
     "n": "Flexión y extensión activa de muñeca",
     "d": "Con el antebrazo apoyado, sube y baja la mano dentro del rango sin dolor.",
     "s": 2,
     "r": 12,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Desviación radial y cubital",
     "d": "Con la palma hacia abajo, mueve la mano hacia el pulgar y hacia el meñique.",
     "s": 2,
     "r": 12,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Círculos de muñeca",
     "d": "Dibuja círculos lentos y amplios con la mano en ambos sentidos.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Deslizamiento del nervio mediano suave",
     "d": "Con el brazo extendido a un lado, inclina la cabeza y mueve la muñeca con suavidad.",
     "s": 2,
     "r": 8,
     "t": 0,
     "descanso": 30
    }
   ],
   "fortalecimiento": [
    {
     "n": "Flexión de muñeca con mancuerna ligera",
     "d": "Antebrazo apoyado con la palma arriba, sube la mano con peso ligero y baja lento.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Extensión de muñeca con mancuerna ligera",
     "d": "Antebrazo apoyado con la palma abajo, eleva el dorso de la mano y baja con control.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Fortalecimiento de prensión con pelota",
     "d": "Aprieta una pelota blanda o masilla terapéutica y suelta lentamente.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Pronación y supinación con peso ligero",
     "d": "Sostén un martillo o mancuerna por un extremo y gira el antebrazo lentamente.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    }
   ],
   "estabilidad": [
    {
     "n": "Apoyo en pared con peso sobre la mano",
     "d": "Con la mano apoyada en la pared, carga peso gradualmente manteniendo la muñeca alineada.",
     "s": 3,
     "r": 0,
     "t": 15,
     "descanso": 30
    },
    {
     "n": "Apoyo en cuadrupedia con muñecas neutras",
     "d": "En manos y rodillas, reparte el peso en toda la palma sin colapsar la muñeca.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 45
    },
    {
     "n": "Equilibrio de un objeto sobre el dorso de la mano",
     "d": "Mantén un objeto ligero estable sobre la mano mientras mueves suavemente el antebrazo.",
     "s": 3,
     "r": 0,
     "t": 30,
     "descanso": 30
    },
    {
     "n": "Isométrico de muñeca en posición neutra",
     "d": "Empuja la mano contra la otra sin moverla, en flexión, extensión y lateral, a intensidad suave.",
     "s": 3,
     "r": 0,
     "t": 10,
     "descanso": 30
    }
   ],
   "banderas": [
    "Caída sobre la mano con dolor intenso en la base del pulgar (sospecha de fractura de escafoides)",
    "Deformidad evidente o hinchazón importante tras un traumatismo",
    "Pérdida progresiva de fuerza o atrofia en la base del pulgar con entumecimiento",
    "Muñeca caliente, enrojecida e hinchada con fiebre (posible infección articular)",
    "Cambios de color, frialdad o pérdida de pulso en la mano"
   ]
  },
  "dedos": {
   "nombre": "Dedos y mano",
   "movilidad": [
    {
     "n": "Flexión y extensión de dedos (puño y apertura)",
     "d": "Cierra el puño suavemente y abre la mano estirando bien los dedos.",
     "s": 2,
     "r": 12,
     "t": 0,
     "descanso": 20
    },
    {
     "n": "Oposición del pulgar",
     "d": "Toca con la punta del pulgar la punta de cada dedo, de forma lenta y precisa.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 20
    },
    {
     "n": "Deslizamiento de tendones flexores",
     "d": "Pasa por posiciones de mano recta, gancho, puño completo y puño parcial en secuencia.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Abducción y aducción de dedos",
     "d": "Con la mano apoyada sobre la mesa, separa y junta los dedos.",
     "s": 2,
     "r": 12,
     "t": 0,
     "descanso": 20
    }
   ],
   "fortalecimiento": [
    {
     "n": "Prensión con pelota o masilla terapéutica",
     "d": "Aprieta la masilla con toda la mano y suelta lentamente.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Pinza con masilla terapéutica",
     "d": "Pellizca la masilla entre el pulgar y cada dedo con presión moderada.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Extensión de dedos con banda elástica",
     "d": "Coloca una banda alrededor de los dedos y ábrelos contra la resistencia.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Aducción de dedos con papel",
     "d": "Sujeta una hoja entre los dedos contiguos y resiste que alguien la jale.",
     "s": 3,
     "r": 0,
     "t": 10,
     "descanso": 30
    }
   ],
   "estabilidad": [
    {
     "n": "Recoger objetos pequeños",
     "d": "Toma monedas o fichas con la pinza y colócalas en un recipiente, con control.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Sostener un objeto con pinza",
     "d": "Mantén un objeto ligero entre pulgar e índice evitando que resbale, sin apretar de más.",
     "s": 3,
     "r": 0,
     "t": 15,
     "descanso": 30
    },
    {
     "n": "Golpeteo digital sobre la mesa",
     "d": "Golpea con cada dedo de forma alterna y rítmica, como tocando un teclado.",
     "s": 2,
     "r": 0,
     "t": 30,
     "descanso": 30
    },
    {
     "n": "Escritura o trazo controlado",
     "d": "Dibuja líneas y círculos con lápiz grueso, cuidando una postura de agarre relajada.",
     "s": 2,
     "r": 0,
     "t": 60,
     "descanso": 30
    }
   ],
   "banderas": [
    "Herida con exposición de tendón, hueso o sospecha de lesión tendinosa por laceración",
    "Deformidad, dedo que no se puede flexionar o extender tras un traumatismo",
    "Dedo caliente, enrojecido e hinchado con fiebre o dolor pulsátil (posible infección)",
    "Dedo pálido, frío o morado con alteración de la circulación",
    "Pérdida de sensibilidad progresiva o debilidad marcada de la mano",
    "Dedo flexionado, inflamado y muy doloroso al estirarlo, con dolor a lo largo de la vaina del tendón y antecedente de herida (signos de Kanavel: posible infección): urgencia"
   ]
  },
  "toracica": {
   "nombre": "Columna torácica",
   "movilidad": [
    {
     "n": "Extensión torácica sobre rodillo de espuma",
     "d": "Apoya la espalda alta sobre el rodillo, manos tras la nuca, y extiéndete suavemente.",
     "s": 2,
     "r": 8,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Rotación torácica en cuadrupedia",
     "d": "Una mano tras la nuca, abre el codo hacia el techo girando el tronco superior.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Rotación torácica en decúbito lateral (libro abierto)",
     "d": "De lado con rodillas dobladas, abre el brazo superior hacia atrás siguiéndolo con la mirada.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Gato y camello",
     "d": "En cuadrupedia, redondea y arquea la espalda de forma alterna con movimiento suave.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    }
   ],
   "fortalecimiento": [
    {
     "n": "Remo con banda elástica",
     "d": "Tira de la banda hacia el abdomen juntando las escápulas, con el tronco erguido.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Extensión torácica en prono (superman suave)",
     "d": "Boca abajo, eleva ligeramente el pecho con los brazos a los lados, sin extender el cuello.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Jalón de brazos en Y-T-W",
     "d": "Boca abajo o inclinado, eleva los brazos formando las letras Y, T y W con control.",
     "s": 2,
     "r": 8,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Jalón de banda hacia abajo",
     "d": "Con la banda anclada arriba, baja los codos hacia las costillas manteniendo el pecho abierto.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    }
   ],
   "estabilidad": [
    {
     "n": "Bird-dog (perro de caza)",
     "d": "En cuadrupedia, extiende un brazo y la pierna contraria manteniendo el tronco quieto.",
     "s": 3,
     "r": 8,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Plancha sobre antebrazos",
     "d": "Apoyado en antebrazos y puntas de pies, mantén el cuerpo alineado y respira con normalidad.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 45
    },
    {
     "n": "Retracción escapular en pared",
     "d": "De pie con la espalda en la pared, lleva escápulas atrás y abajo y sostén.",
     "s": 3,
     "r": 0,
     "t": 10,
     "descanso": 30
    },
    {
     "n": "Respiración costal con control postural",
     "d": "Sentado erguido, inspira expandiendo las costillas laterales sin elevar los hombros.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 20
    }
   ],
   "banderas": [
    "Dolor torácico con falta de aire, sudoración o náuseas (posible origen cardíaco o pulmonar)",
    "Dolor torácico tras un traumatismo importante o sospecha de fractura vertebral o costal",
    "Dolor nocturno intenso y progresivo, con antecedente de cáncer o pérdida de peso inexplicada",
    "Fiebre con dolor de espalda intenso (posible infección)",
    "Debilidad o alteración de la marcha, o pérdida del control de esfínteres",
    "Dolor en cinturón o bilateral con alteración de la sensibilidad",
    "Dolor torácico súbito, intenso o desgarrante, con diferencia de pulsos o de presión entre los brazos (posible disección aórtica): urgencia"
   ]
  },
  "espalda": {
   "nombre": "Espalda baja (columna lumbar)",
   "movilidad": [
    {
     "n": "Rodillas al pecho",
     "d": "Boca arriba, lleva ambas rodillas hacia el pecho con suavidad y regresa lentamente.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Inclinación pélvica",
     "d": "Boca arriba con rodillas dobladas, aplana y arquea suavemente la zona lumbar con la pelvis.",
     "s": 2,
     "r": 12,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Gato y camello",
     "d": "En cuadrupedia, redondea y arquea la espalda de forma alterna con movimiento suave.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Rotación lumbar con rodillas dobladas",
     "d": "Boca arriba, deja caer las rodillas juntas a un lado y al otro dentro del rango cómodo.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    }
   ],
   "fortalecimiento": [
    {
     "n": "Puente de glúteos",
     "d": "Boca arriba con rodillas dobladas, eleva la cadera apretando glúteos y baja lento.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Almeja (rotación externa de cadera en decúbito lateral)",
     "d": "De lado con rodillas dobladas, abre la rodilla superior sin girar la pelvis.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Extensión lumbar en prono suave",
     "d": "Boca abajo, eleva ligeramente el pecho con los brazos a los lados sin forzar.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Sentadilla con apoyo",
     "d": "De pie, pies a la anchura de caderas, baja como para sentarte y sube con espalda neutra.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 60
    }
   ],
   "estabilidad": [
    {
     "n": "Bird-dog (perro de caza)",
     "d": "En cuadrupedia, extiende un brazo y la pierna contraria manteniendo la columna neutra.",
     "s": 3,
     "r": 8,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Plancha lateral desde rodillas",
     "d": "De lado, apoyado en antebrazo y rodillas, eleva la cadera y mantén la alineación.",
     "s": 3,
     "r": 0,
     "t": 15,
     "descanso": 45
    },
    {
     "n": "Dead bug (bicho muerto)",
     "d": "Boca arriba, baja alternando brazo y pierna contrarios sin que la zona lumbar se despegue.",
     "s": 3,
     "r": 8,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Plancha sobre antebrazos",
     "d": "Apoyado en antebrazos y rodillas o puntas de pies, mantén el cuerpo alineado.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 45
    }
   ],
   "banderas": [
    "Pérdida del control de esfínteres (vejiga o intestino)",
    "Anestesia en silla de montar (entumecimiento en genitales, glúteos o muslos internos)",
    "Debilidad progresiva en una o ambas piernas",
    "Fiebre o antecedente de cáncer con dolor nocturno intenso que no cede con el reposo",
    "Trauma importante reciente, o dolor tras caída con sospecha de fractura",
    "Pérdida de peso inexplicada con dolor lumbar persistente y no mecánico"
   ]
  },
  "cadera": {
   "nombre": "Cadera",
   "movilidad": [
    {
     "n": "Flexión de cadera en decúbito supino",
     "d": "Boca arriba, lleva una rodilla hacia el pecho con ayuda de las manos y alterna.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Rotación interna y externa de cadera",
     "d": "Boca arriba con piernas extendidas, gira las puntas de los pies hacia dentro y fuera.",
     "s": 2,
     "r": 12,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Estiramiento de flexores de cadera en zancada",
     "d": "En media rodilla, desplaza la pelvis hacia delante hasta sentir tensión al frente de la cadera.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 20
    },
    {
     "n": "Posición de mariposa asistida",
     "d": "Sentado con plantas de los pies juntas, deja caer suavemente las rodillas hacia los lados.",
     "s": 2,
     "r": 0,
     "t": 20,
     "descanso": 20
    }
   ],
   "fortalecimiento": [
    {
     "n": "Puente de glúteos",
     "d": "Boca arriba con rodillas dobladas, eleva la cadera apretando glúteos y baja lento.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Abducción de cadera en decúbito lateral",
     "d": "De lado, eleva la pierna superior extendida sin rotar la pelvis y baja con control.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Sentadilla a una silla",
     "d": "Siéntate y levántate de una silla controlando el descenso, con rodillas alineadas con los pies.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 60
    },
    {
     "n": "Caminata lateral con banda",
     "d": "Con banda elástica sobre las rodillas, da pasos laterales manteniendo las rodillas ligeramente flexionadas.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 45
    }
   ],
   "estabilidad": [
    {
     "n": "Equilibrio en una pierna",
     "d": "De pie, sostén el peso sobre una pierna con la pelvis nivelada, cerca de un apoyo.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 30
    },
    {
     "n": "Puente en una pierna",
     "d": "Desde el puente de glúteos, extiende una pierna y mantén la pelvis nivelada.",
     "s": 3,
     "r": 8,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Plancha lateral desde rodillas",
     "d": "De lado, apoyado en antebrazo y rodillas, eleva la cadera y mantén la alineación.",
     "s": 3,
     "r": 0,
     "t": 15,
     "descanso": 45
    },
    {
     "n": "Paso lateral sobre escalón",
     "d": "Sube y baja un escalón de lado controlando la alineación de rodilla y pelvis.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 45
    }
   ],
   "banderas": [
    "Incapacidad para apoyar la pierna tras una caída o traumatismo (sospecha de fractura)",
    "Dolor de cadera con fiebre, enrojecimiento o calor local (posible infección)",
    "Dolor nocturno intenso y progresivo con antecedente de cáncer",
    "Dolor inguinal con pérdida de control de esfínteres o anestesia en silla de montar",
    "Dolor en la ingle o muslo en niños y adolescentes con cojera",
    "Hinchazón, enrojecimiento y dolor en la pantorrilla (posible trombosis venosa profunda)",
    "Dolor inguinal que aparece con la carga y aumenta con el impacto, sobre todo en corredores o con baja densidad ósea (posible fractura por estrés): suspender la carga y derivar"
   ]
  },
  "rodilla": {
   "nombre": "Rodilla",
   "movilidad": [
    {
     "n": "Deslizamiento del talón",
     "d": "Boca arriba, desliza el talón hacia el glúteo doblando la rodilla y vuelve a estirar.",
     "s": 2,
     "r": 12,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Extensión pasiva con toalla bajo el talón",
     "d": "Sentado o boca arriba, deja que la rodilla se estire con el talón elevado sobre una toalla.",
     "s": 2,
     "r": 0,
     "t": 30,
     "descanso": 20
    },
    {
     "n": "Flexión de rodilla sentado",
     "d": "Sentado, desliza el pie hacia atrás doblando la rodilla y ayúdate con el otro pie.",
     "s": 2,
     "r": 12,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Estiramiento suave de isquiotibiales",
     "d": "Boca arriba, eleva la pierna con una toalla y estira la rodilla hasta sentir tensión leve.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 20
    }
   ],
   "fortalecimiento": [
    {
     "n": "Extensión de rodilla isométrica (cuádriceps)",
     "d": "Sentado con pierna extendida, aprieta el muslo y mantén sin mover la pierna.",
     "s": 3,
     "r": 0,
     "t": 10,
     "descanso": 30
    },
    {
     "n": "Elevación de pierna recta",
     "d": "Boca arriba, con una rodilla doblada, eleva la otra pierna extendida y baja lento.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Sentadilla parcial",
     "d": "Baja hasta un rango cómodo con rodillas alineadas con los pies y regresa con control.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 60
    },
    {
     "n": "Curl de isquiotibiales con banda",
     "d": "Boca abajo o de pie, flexiona la rodilla contra la banda y regresa lentamente.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    }
   ],
   "estabilidad": [
    {
     "n": "Equilibrio en una pierna",
     "d": "De pie sobre una pierna con la rodilla ligeramente flexionada, cerca de un apoyo.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 30
    },
    {
     "n": "Paso lateral sobre escalón",
     "d": "Sube y baja un escalón lateral cuidando que la rodilla no se desplace hacia dentro.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Sentadilla con banda sobre las rodillas",
     "d": "Haz una sentadilla parcial empujando las rodillas contra la banda para mantener la alineación.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 60
    },
    {
     "n": "Equilibrio sobre superficie inestable",
     "d": "De pie sobre un cojín, mantén la posición con ambas piernas y luego con una, con apoyo cercano.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 30
    }
   ],
   "banderas": [
    "Incapacidad para cargar peso o rodilla bloqueada tras un traumatismo",
    "Rodilla caliente, enrojecida e hinchada con fiebre (posible infección articular)",
    "Hinchazón inmediata (hemartrosis) tras una torsión o impacto",
    "Hinchazón, dolor y enrojecimiento en la pantorrilla (posible trombosis venosa profunda)",
    "Sensación de inestabilidad con falla repetida de la rodilla",
    "Dolor nocturno intenso y progresivo con antecedente de cáncer",
    "Imposibilidad de extender activamente la rodilla tras un golpe o caída, o defecto palpable sobre la rótula (posible rotura del aparato extensor): derivar"
   ]
  },
  "tobillo": {
   "nombre": "Tobillo y pie",
   "movilidad": [
    {
     "n": "Bombeo de tobillo",
     "d": "Sentado o boca arriba, lleva la punta del pie arriba y abajo con movimiento amplio.",
     "s": 2,
     "r": 15,
     "t": 0,
     "descanso": 20
    },
    {
     "n": "Abecedario con el pie",
     "d": "Con el pie en el aire, dibuja las letras del abecedario moviendo solo el tobillo.",
     "s": 2,
     "r": 1,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Inversión y eversión activa",
     "d": "Gira la planta del pie hacia dentro y hacia fuera dentro del rango sin dolor.",
     "s": 2,
     "r": 12,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Estiramiento de pantorrilla en pared",
     "d": "Apoyado en la pared, con el talón en el suelo, inclínate para estirar la pantorrilla.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 20
    }
   ],
   "fortalecimiento": [
    {
     "n": "Elevación de talones",
     "d": "De pie con apoyo, sube sobre las puntas de los pies y baja lentamente.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Dorsiflexión con banda elástica",
     "d": "Sentado con la banda anclada, lleva la punta del pie hacia ti contra la resistencia.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Eversión con banda elástica",
     "d": "Con la banda rodeando el pie, gira la planta hacia fuera contra la resistencia.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    },
    {
     "n": "Inversión con banda elástica",
     "d": "Con la banda rodeando el pie, gira la planta hacia dentro contra la resistencia.",
     "s": 3,
     "r": 12,
     "t": 0,
     "descanso": 45
    }
   ],
   "estabilidad": [
    {
     "n": "Equilibrio en una pierna",
     "d": "De pie sobre una pierna con la rodilla ligeramente flexionada, cerca de un apoyo.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 30
    },
    {
     "n": "Equilibrio en una pierna con ojos cerrados",
     "d": "Cuando domines el apoyo simple, cierra los ojos junto a una pared o mesa estable.",
     "s": 3,
     "r": 0,
     "t": 15,
     "descanso": 30
    },
    {
     "n": "Equilibrio sobre superficie inestable",
     "d": "De pie sobre un cojín o almohadilla, mantén la posición con apoyo cercano.",
     "s": 3,
     "r": 0,
     "t": 20,
     "descanso": 30
    },
    {
     "n": "Pie corto (doming)",
     "d": "Con el pie apoyado, acorta el pie levantando el arco sin encoger los dedos.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 30
    }
   ],
   "banderas": [
    "Incapacidad para dar cuatro pasos tras una lesión (criterios de Ottawa positivos)",
    "Dolor óseo a la palpación en maléolos, base del quinto metatarsiano o hueso navicular",
    "Hinchazón, dolor y enrojecimiento en la pantorrilla (posible trombosis venosa profunda)",
    "Sospecha de rotura del tendón de Aquiles: chasquido, debilidad para ponerse de puntas",
    "Pie o tobillo caliente, enrojecido y con fiebre (posible infección)",
    "Pie frío, pálido o sin pulso, o pérdida de sensibilidad progresiva",
    "Pie caliente, enrojecido e inflamado en una persona con diabetes o neuropatía, aunque duela poco (posible pie de Charcot): derivar"
   ]
  },
  "atm": {
   "nombre": "Articulación temporomandibular (ATM)",
   "movilidad": [
    {
     "n": "Apertura y cierre mandibular controlado",
     "d": "Frente al espejo, abre y cierra la boca en línea recta, sin desviación ni dolor.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Desplazamiento lateral de la mandíbula",
     "d": "Con los dientes ligeramente separados, desliza la mandíbula a un lado y al otro con suavidad.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Posición de reposo con lengua en el paladar",
     "d": "Coloca la lengua detrás de los dientes superiores y abre la boca sin que la lengua se despegue.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Protrusión y retrusión mandibular",
     "d": "Adelanta la mandíbula inferior y regrésala lentamente, evitando dolor o chasquidos.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    }
   ],
   "fortalecimiento": [
    {
     "n": "Apertura mandibular con resistencia leve",
     "d": "Abre la boca contra la presión suave de dos dedos bajo el mentón, sin dolor.",
     "s": 3,
     "r": 0,
     "t": 5,
     "descanso": 30
    },
    {
     "n": "Cierre mandibular con resistencia leve",
     "d": "Con el pulgar bajo el mentón, cierra la boca contra una resistencia mínima.",
     "s": 3,
     "r": 0,
     "t": 5,
     "descanso": 30
    },
    {
     "n": "Lateralización mandibular con resistencia leve",
     "d": "Empuja la mandíbula hacia un lado contra la mano con presión suave y sostenida.",
     "s": 3,
     "r": 0,
     "t": 5,
     "descanso": 30
    },
    {
     "n": "Fortalecimiento de flexores profundos del cuello",
     "d": "Boca arriba, asiente suavemente con la cabeza y sostén, sin tensar la mandíbula.",
     "s": 3,
     "r": 0,
     "t": 10,
     "descanso": 30
    }
   ],
   "estabilidad": [
    {
     "n": "Relajación mandibular consciente",
     "d": "Mantén labios juntos, dientes separados y lengua en el paladar durante el día.",
     "s": 3,
     "r": 0,
     "t": 30,
     "descanso": 20
    },
    {
     "n": "Respiración nasal diafragmática",
     "d": "Respira por la nariz llevando el aire al abdomen, con mandíbula y hombros relajados.",
     "s": 3,
     "r": 10,
     "t": 0,
     "descanso": 20
    },
    {
     "n": "Apertura controlada frente al espejo",
     "d": "Abre la boca despacio manteniendo la mandíbula centrada, hasta el punto previo a la desviación.",
     "s": 2,
     "r": 10,
     "t": 0,
     "descanso": 30
    },
    {
     "n": "Corrección postural de cabeza y cuello",
     "d": "Sentado, alinea las orejas sobre los hombros con retracción suave del mentón.",
     "s": 3,
     "r": 0,
     "t": 10,
     "descanso": 30
    }
   ],
   "banderas": [
    "Mandíbula bloqueada que no abre o no cierra de forma súbita",
    "Trauma reciente en mandíbula o cara con sospecha de fractura o luxación",
    "Dolor facial con fiebre, hinchazón o enrojecimiento local (posible infección)",
    "Dolor en mandíbula con dolor torácico, falta de aire o sudoración (posible origen cardíaco)",
    "Entumecimiento facial, debilidad de la cara o cambios neurológicos recientes",
    "Dolor de cabeza súbito e intenso o alteraciones visuales con dolor mandibular",
    "Dolor mandibular al masticar con cefalea temporal nueva, sensibilidad en la arteria temporal o alteraciones visuales en mayores de 50 años (posible arteritis de células gigantes): derivar de urgencia"
   ]
  }
 },
 "progresion": [
  "Dolor durante el ejercicio: de 0 a 3 sobre 10 puedes avanzar; de 4 a 5 es aceptable en tendinopatía o dolor patelofemoral si vuelve a lo habitual antes de la mañana siguiente; de 6 en adelante, reduce la carga. En fase aguda, postoperatorio o dolor que baja al brazo o a la pierna, mantente en 0 a 3.",
  "Sin aumento del dolor ni de la rigidez a las 24 horas, ni empeoramiento de una semana a otra, y sin alteración del sueño.",
  "Completa las series y repeticiones con buena calidad de movimiento y sin compensaciones",
  "Rango de movimiento sin dolor estable durante al menos dos sesiones consecutivas",
  "Fuerza o control suficiente para realizar el ejercicio actual con facilidad antes de aumentar la dificultad",
  "Aumentar solo una variable a la vez: repeticiones, resistencia, rango o complejidad",
  "Si el dolor aumenta o persiste, regresar a la fase anterior y reevaluar",
  "Ningún tope de dolor reemplaza al juicio clínico. Si aparecen síntomas neurológicos nuevos, mareo, dolor en reposo o por la noche, consulta o deriva.",
  "La irritabilidad define la dosis: con alta irritabilidad usa poca carga y pocas repeticiones, sin llegar al final del rango."
 ],
 "objetivos": {
  "dolor": [
   "Priorizar movimiento suave y alivio del dolor sin provocar aumento de los síntomas",
   "Educar sobre el dolor y la actividad gradual para reducir el miedo al movimiento",
   "Mantener la zona en movimiento dentro del rango tolerable, evitando el reposo prolongado"
  ],
  "movilidad": [
   "Recuperar rango de movimiento de forma gradual, primero activo y luego con asistencia",
   "Combinar movilidad con control del movimiento para consolidar el rango ganado",
   "Trabajar los rangos funcionales necesarios para las actividades diarias del paciente"
  ],
  "fuerza": [
   "Comenzar con trabajo isométrico y progresar a ejercicios con carga controlada",
   "Aumentar la resistencia de forma gradual cuidando la técnica y la tolerancia al dolor",
   "Fortalecer la zona afectada y las articulaciones vecinas que la soportan"
  ],
  "equilibrio": [
   "Progresar desde apoyo bipodal estable hacia apoyo unipodal y superficies variables",
   "Incorporar tareas con doble tarea y ojos cerrados cuando el control básico sea bueno",
   "Entrenar la propiocepción y las reacciones de equilibrio de manera segura y supervisada"
  ],
  "retorno": [
   "Reintroducir las actividades deportivas o laborales de forma gradual y por fases",
   "Verificar fuerza, control y tolerancia a la carga antes de volver a la actividad completa",
   "Planificar un seguimiento y una estrategia de prevención de recaídas con el paciente"
  ]
 },
 "referencias": {
  "general": [
   {
    "texto": "Thomeé R. A comprehensive treatment approach for patellofemoral pain syndrome in young women. Physical Therapy. 1997;77(12):1690-1703.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/9413448/"
   },
   {
    "texto": "Silbernagel KG, Thomeé R, Eriksson BI, Karlsson J. Continued sports activity, using a pain-monitoring model, during rehabilitation in patients with Achilles tendinopathy. American Journal of Sports Medicine. 2007;35(6):897-906.",
    "url": "https://doi.org/10.1177/0363546506298279"
   },
   {
    "texto": "Smith BE, Hendrick P, Smith TO, et al. Should exercises be painful in the management of chronic musculoskeletal pain? A systematic review and meta-analysis. British Journal of Sports Medicine. 2017;51(23):1679-1687.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Smith+Hendrick+Should+exercises+be+painful+chronic+musculoskeletal+pain+meta-analysis"
   },
   {
    "texto": "Garber CE, Blissmer B, Deschenes MR, et al. American College of Sports Medicine position stand: quantity and quality of exercise for developing and maintaining cardiorespiratory, musculoskeletal, and neuromotor fitness in apparently healthy adults. Medicine and Science in Sports and Exercise. 2011;43(7):1334-1359.",
    "url": "https://doi.org/10.1249/MSS.0b013e318213fefb"
   },
   {
    "texto": "Liguori G, ed. ACSM's Guidelines for Exercise Testing and Prescription. 11th ed. Wolters Kluwer. 2021.",
    "url": "https://www.acsm.org/education-resources/books/guidelines-exercise-testing-prescription"
   },
   {
    "texto": "Kisner C, Colby LA. Therapeutic Exercise: Foundations and Techniques. 7th ed. F.A. Davis. 2018.",
    "url": "https://www.fadavis.com/product/physical-therapy-therapeutic-exercise-kisner-colby-7"
   },
   {
    "texto": "Brukner P, Khan K. Brukner and Khan's Clinical Sports Medicine. 5th ed. McGraw-Hill. 2017.",
    "url": "https://www.mheducation.com.au/brukner-khan-s-clinical-sports-medicine-9781743768921-aus-group"
   },
   {
    "texto": "Finucane LM, Downie A, Mercer C, et al. International framework for red flags for potential serious spinal pathologies. Journal of Orthopaedic and Sports Physical Therapy. 2020;50(7):350-372.",
    "url": "https://doi.org/10.2519/jospt.2020.9971"
   },
   {
    "texto": "Gulati M, Levy PD, Mukherjee D, et al. 2021 AHA/ACC/ASE/CHEST/SAEM/SCCT/SCMR Guideline for the evaluation and diagnosis of chest pain. Circulation. 2021;144(22):e368-e454.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=2021+guideline+evaluation+and+diagnosis+of+chest+pain+Gulati"
   },
   {
    "texto": "Wells PS, Anderson DR, Rodger M, et al. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis. New England Journal of Medicine. 2003;349(13):1227-1235.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Wells+Evaluation+of+D-dimer+in+the+diagnosis+of+suspected+deep-vein+thrombosis"
   },
   {
    "texto": "Sherrington C, Fairhall NJ, Wallbank GK, et al. Exercise for preventing falls in older people living in the community. Cochrane Database of Systematic Reviews. 2019;1:CD012424.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Sherrington+Exercise+for+preventing+falls+in+older+people+living+in+the+community+Cochrane+2019"
   },
   {
    "texto": "Rio E, Kidgell D, Purdam C, et al. Isometric exercise induces analgesia and reduces inhibition in patellar tendinopathy. British Journal of Sports Medicine. 2015;49(19):1277-1283.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Rio+Isometric+exercise+induces+analgesia+and+reduces+inhibition+in+patellar+tendinopathy"
   },
   {
    "texto": "Thomeé R, Kaplan Y, Kvist J, et al. Muscle strength and hop performance criteria prior to return to sports after ACL reconstruction. Knee Surgery, Sports Traumatology, Arthroscopy. 2011;19(11):1798-1805.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Thomee+Muscle+strength+and+hop+performance+criteria+prior+to+return+to+sports+after+ACL+reconstruction"
   }
  ],
  "cuello": [
   {
    "texto": "Blanpied PR, Gross AR, Elliott JM, et al. Neck pain: revision 2017. Journal of Orthopaedic and Sports Physical Therapy. 2017;47(7):A1-A83.",
    "url": "https://doi.org/10.2519/jospt.2017.0302"
   },
   {
    "texto": "Rushton A, Carlesso LC, Flynn T, et al. International framework for examination of the cervical region for potential of vascular pathologies of the neck prior to musculoskeletal intervention: International IFOMPT Cervical Framework. Journal of Orthopaedic and Sports Physical Therapy. 2023;53(1):7-22.",
    "url": "https://doi.org/10.2519/jospt.2022.11147"
   },
   {
    "texto": "Finucane LM, Downie A, Mercer C, et al. International framework for red flags for potential serious spinal pathologies. Journal of Orthopaedic and Sports Physical Therapy. 2020;50(7):350-372.",
    "url": "https://doi.org/10.2519/jospt.2020.9971"
   },
   {
    "texto": "Stiell IG, Wells GA, Vandemheen KL, et al. The Canadian C-spine rule for radiography in alert and stable trauma patients. JAMA. 2001;286(15):1841-1848.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Stiell+Canadian+C-spine+rule+for+radiography+in+alert+and+stable+trauma+patients"
   },
   {
    "texto": "Davies BM, Mowforth OD, Smith EK, Kotter MRN. Degenerative cervical myelopathy. BMJ. 2018;360:k186.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Davies+Mowforth+Degenerative+cervical+myelopathy+BMJ+2018"
   },
   {
    "texto": "Jull G, Trott P, Potter H, et al. A randomized controlled trial of exercise and manipulative therapy for cervicogenic headache. Spine. 2002;27(17):1835-1843.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Jull+randomized+controlled+trial+of+exercise+and+manipulative+therapy+for+cervicogenic+headache"
   }
  ],
  "hombro": [
   {
    "texto": "Lafrance S, Charron M, Roy JS, et al. Diagnosing, managing, and supporting return to work of adults with rotator cuff disorders: a clinical practice guideline. Journal of Orthopaedic and Sports Physical Therapy. 2022;52(10):647-664.",
    "url": "https://pharesst.irsst.qc.ca/etudes-primaires/632"
   },
   {
    "texto": "Desmeules F, et al. Rotator cuff tendinopathy diagnosis, nonsurgical medical care, and rehabilitation: a clinical practice guideline. Journal of Orthopaedic and Sports Physical Therapy. 2025.",
    "url": "https://doi.org/10.2519/jospt.2025.13182"
   },
   {
    "texto": "Kelley MJ, Shaffer MA, Kuhn JE, et al. Shoulder pain and mobility deficits: adhesive capsulitis. Journal of Orthopaedic and Sports Physical Therapy. 2013;43(5):A1-A31.",
    "url": "https://www.orthopt.org/uploads/content_files/ICF/Updated_Guidelines/Shoulder_Guidelines_AdhesiveCapsulitis_JOSPT_May_2013.pdf"
   },
   {
    "texto": "Paterson WH, Throckmorton TW, Koester M, Azar FM, Kuhn JE. Position and duration of immobilization after primary anterior shoulder dislocation: a systematic review and meta-analysis of the literature. Journal of Bone and Joint Surgery American. 2010;92(18):2924-2933.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/21159993/"
   },
   {
    "texto": "Gaunt BW, Shaffer MA, Sauers EL, et al. The American Society of Shoulder and Elbow Therapists' consensus rehabilitation guideline for arthroscopic anterior capsulolabral repair of the shoulder. Journal of Orthopaedic and Sports Physical Therapy. 2010;40(3):155-168.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Gaunt+American+Society+of+Shoulder+and+Elbow+Therapists+consensus+rehabilitation+guideline+arthroscopic+anterior+capsulolabral+repair"
   },
   {
    "texto": "Kirkley A, Griffin S, Richards C, Miniaci A, Mohtadi N. Prospective randomized clinical trial comparing the effectiveness of immediate arthroscopic stabilization versus immobilization and rehabilitation in first traumatic anterior dislocations of the shoulder. Arthroscopy. 1999;15(5):507-514.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Kirkley+immediate+arthroscopic+stabilization+versus+immobilization+and+rehabilitation+first+traumatic+anterior+dislocations"
   },
   {
    "texto": "Liavaag S, Brox JI, Pripp AH, et al. Immobilization in external rotation after primary shoulder dislocation did not reduce the risk of recurrence: a randomized controlled trial. Journal of Bone and Joint Surgery American. 2011;93(10):897-904.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Liavaag+Immobilization+in+external+rotation+after+primary+shoulder+dislocation+randomized"
   },
   {
    "texto": "Johnson AJ, Godges JJ, Zimmerman GJ, Ounanian LL. The effect of anterior versus posterior glide joint mobilization on external rotation range of motion in patients with shoulder adhesive capsulitis. Journal of Orthopaedic and Sports Physical Therapy. 2007;37(3):88-99.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Johnson+Godges+anterior+versus+posterior+glide+joint+mobilization+shoulder+adhesive+capsulitis"
   }
  ],
  "codo": [
   {
    "texto": "Lucado AM, Day JM, Vincent JI, et al. Lateral elbow pain and muscle function impairments. Journal of Orthopaedic and Sports Physical Therapy. 2022;52(12):CPG1-CPG111.",
    "url": "https://doi.org/10.2519/jospt.2022.0302"
   },
   {
    "texto": "Appelboam A, Reuben AD, Benger JR, et al. Elbow extension test to rule out elbow fracture: multicentre, prospective validation and observational study of diagnostic accuracy in adults and children. BMJ. 2008;337:a2428.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Appelboam+Elbow+extension+test+to+rule+out+elbow+fracture"
   },
   {
    "texto": "Coombes BK, Bisset L, Brooks P, Khan A, Vicenzino B. Effect of corticosteroid injection, physiotherapy, or both on clinical outcomes in patients with unilateral lateral epicondylalgia: a randomized controlled trial. JAMA. 2013;309(5):461-469.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Coombes+Effect+of+corticosteroid+injection+physiotherapy+or+both+lateral+epicondylalgia+JAMA+2013"
   },
   {
    "texto": "Tyler TF, Thomas GC, Nicholas SJ, McHugh MP. Addition of isolated wrist extensor eccentric exercise to standard treatment for chronic lateral epicondylosis: a prospective randomized trial. Journal of Shoulder and Elbow Surgery. 2010;19(6):917-922.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Tyler+Addition+of+isolated+wrist+extensor+eccentric+exercise+to+standard+treatment+chronic+lateral+epicondylosis"
   },
   {
    "texto": "Brukner P, Khan K. Brukner and Khan's Clinical Sports Medicine. 5th ed. McGraw-Hill. 2017.",
    "url": "https://www.mheducation.com.au/brukner-khan-s-clinical-sports-medicine-9781743768921-aus-group"
   }
  ],
  "muñeca": [
   {
    "texto": "Erickson M, Lawrence M, Jansen CWS, et al. Hand pain and sensory deficits: carpal tunnel syndrome. Clinical Practice Guidelines revision 2019. Journal of Orthopaedic and Sports Physical Therapy. 2019;49(5):CPG1-CPG85. (Hay revisión 2026: JOSPT 2026;56(4).)",
    "url": "https://doi.org/10.2519/jospt.2019.0301"
   },
   {
    "texto": "Basson A, Olivier B, Ellis R, et al. The effectiveness of neural mobilization for neuromusculoskeletal conditions: a systematic review and meta-analysis. Journal of Orthopaedic and Sports Physical Therapy. 2017;47(9):593-615.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Basson+effectiveness+of+neural+mobilization+for+neuromusculoskeletal+conditions+systematic+review+meta-analysis"
   },
   {
    "texto": "Rempel D, Dahlin L, Lundborg G. Pathophysiology of nerve compression syndromes: response of peripheral nerves to loading. Journal of Bone and Joint Surgery American. 1999;81(11):1600-1610.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Rempel+Dahlin+Lundborg+Pathophysiology+of+nerve+compression+syndromes"
   },
   {
    "texto": "Totten PA, Hunter JM. Therapeutic techniques to enhance nerve gliding in thoracic outlet syndrome and carpal tunnel syndrome. Hand Clinics. 1991;7(3):505-520.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Totten+Hunter+Therapeutic+techniques+to+enhance+nerve+gliding"
   },
   {
    "texto": "Duckworth AD, Jenkins PJ, Aitken SA, et al. Scaphoid fracture epidemiology / predictors of fracture following suspected injury to the scaphoid. Journal of Bone and Joint Surgery British. 2012;94(7):961-968.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Duckworth+Predictors+of+fracture+following+suspected+injury+to+the+scaphoid"
   },
   {
    "texto": "Richie CA 3rd, Briner WW Jr. Corticosteroid injection for treatment of de Quervain's tenosynovitis: a pooled quantitative literature evaluation. Journal of the American Board of Family Practice. 2003;16(2):102-106.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Richie+Briner+Corticosteroid+injection+for+treatment+of+de+Quervain+tenosynovitis"
   }
  ],
  "dedos": [
   {
    "texto": "Kloppenburg M, Kroon FP, Blanco FJ, et al. 2018 update of the EULAR recommendations for the management of hand osteoarthritis. Annals of the Rheumatic Diseases. 2019;78(1):16-24.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Kloppenburg+2018+update+of+the+EULAR+recommendations+for+the+management+of+hand+osteoarthritis"
   },
   {
    "texto": "NICE. Osteoarthritis in over 16s: diagnosis and management (NG226). 2022.",
    "url": "https://www.nice.org.uk/guidance/ng226"
   },
   {
    "texto": "Hennig T, Hæhre L, Hornburg VT, et al. Effect of home-based hand exercises in women with hand osteoarthritis: a randomised controlled trial. Annals of the Rheumatic Diseases. 2015;74(8):1501-1508.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Hennig+Effect+of+home-based+hand+exercises+in+women+with+hand+osteoarthritis"
   },
   {
    "texto": "Cooney WP, Chao EY. Biomechanical analysis of static forces in the thumb during hand function. Journal of Bone and Joint Surgery American. 1977;59(1):27-36.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Cooney+Chao+Biomechanical+analysis+of+static+forces+in+the+thumb+during+hand+function"
   },
   {
    "texto": "Lunsford D, Valdes K, Hengy S. Conservative management of trigger finger: a systematic review. Journal of Hand Therapy. 2019;32(2):212-221.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Lunsford+Valdes+Hengy+Conservative+management+of+trigger+finger+systematic+review"
   },
   {
    "texto": "Handoll HHG, Vaghela MV. Interventions for treating mallet finger injuries. Cochrane Database of Systematic Reviews. 2004;(3):CD004574.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Handoll+Vaghela+Interventions+for+treating+mallet+finger+injuries"
   },
   {
    "texto": "Pang HN, Teoh LC, Yam AKT, et al. Factors affecting the prognosis of pyogenic flexor tenosynovitis. Journal of Bone and Joint Surgery American. 2007;89(8):1742-1748.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Pang+Factors+affecting+the+prognosis+of+pyogenic+flexor+tenosynovitis"
   },
   {
    "texto": "Wehbé MA. Tendon gliding exercises. American Journal of Occupational Therapy. 1987;41(3):164-167.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Wehbe+Tendon+gliding+exercises"
   }
  ],
  "toracica": [
   {
    "texto": "Finucane LM, Downie A, Mercer C, et al. International framework for red flags for potential serious spinal pathologies. Journal of Orthopaedic and Sports Physical Therapy. 2020;50(7):350-372.",
    "url": "https://doi.org/10.2519/jospt.2020.9971"
   },
   {
    "texto": "Downie A, Williams CM, Henschke N, et al. Red flags to screen for malignancy and fracture in patients with low back pain: systematic review. BMJ. 2013;347:f7095.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Downie+Red+flags+to+screen+for+malignancy+and+fracture+in+patients+with+low+back+pain"
   },
   {
    "texto": "Giangregorio LM, MacIntyre NJ, Thabane L, et al. Too Fit To Fracture: exercise recommendations for individuals with osteoporosis or osteoporotic vertebral fracture. Osteoporosis International. 2014;25(3):821-835.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Giangregorio+Too+Fit+To+Fracture+exercise+recommendations+osteoporosis"
   },
   {
    "texto": "Isselbacher EM, Preventza O, Hamilton Black J 3rd, et al. 2022 ACC/AHA Guideline for the diagnosis and management of aortic disease. Circulation. 2022;146(24):e334-e482.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=2022+ACC+AHA+guideline+for+the+diagnosis+and+management+of+aortic+disease"
   },
   {
    "texto": "Gulati M, Levy PD, Mukherjee D, et al. 2021 Guideline for the evaluation and diagnosis of chest pain. Circulation. 2021;144(22):e368-e454.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=2021+guideline+evaluation+and+diagnosis+of+chest+pain+Gulati"
   },
   {
    "texto": "DeFranca GG, Levine LJ. The T4 syndrome. Journal of Manipulative and Physiological Therapeutics. 1995;18(1):34-37.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=DeFranca+Levine+The+T4+syndrome"
   }
  ],
  "espalda": [
   {
    "texto": "George SZ, Fritz JM, Silfies SP, et al. Interventions for the management of acute and chronic low back pain: revision 2021. Journal of Orthopaedic and Sports Physical Therapy. 2021;51(11):CPG1-CPG60.",
    "url": "https://doi.org/10.2519/jospt.2021.0304"
   },
   {
    "texto": "NICE. Low back pain and sciatica in over 16s: assessment and management (NG59). 2016.",
    "url": "https://www.nice.org.uk/guidance/ng59"
   },
   {
    "texto": "Finucane LM, Downie A, Mercer C, et al. International framework for red flags for potential serious spinal pathologies. Journal of Orthopaedic and Sports Physical Therapy. 2020;50(7):350-372.",
    "url": "https://doi.org/10.2519/jospt.2020.9971"
   },
   {
    "texto": "Downie A, Williams CM, Henschke N, et al. Red flags to screen for malignancy and fracture in patients with low back pain: systematic review. BMJ. 2013;347:f7095.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Downie+Red+flags+to+screen+for+malignancy+and+fracture+in+patients+with+low+back+pain"
   },
   {
    "texto": "Wegner I, Widyahening IS, van Tulder MW, et al. Traction for low-back pain with or without sciatica. Cochrane Database of Systematic Reviews. 2013;(8):CD003010.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Wegner+Traction+for+low-back+pain+with+or+without+sciatica+Cochrane"
   },
   {
    "texto": "Long A, Donelson R, Fung T. Does it matter which exercise? A randomized control trial of exercise for low back pain. Spine. 2004;29(23):2593-2602.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Long+Donelson+Fung+Does+it+matter+which+exercise+randomized+control+trial+low+back+pain"
   },
   {
    "texto": "Saragiotto BT, Maher CG, Yamato TP, et al. Motor control exercise for chronic non-specific low-back pain. Cochrane Database of Systematic Reviews. 2016;(1):CD012004.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Saragiotto+Motor+control+exercise+for+chronic+non-specific+low-back+pain+Cochrane"
   },
   {
    "texto": "French SD, Cameron M, Walker BF, Reggars JW, Esterman AJ. Superficial heat or cold for low back pain. Cochrane Database of Systematic Reviews. 2006;(1):CD004750.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=French+Superficial+heat+or+cold+for+low+back+pain+Cochrane"
   },
   {
    "texto": "Kreiner DS, Hwang SW, Easa JE, et al. An evidence-based clinical guideline for the diagnosis and treatment of lumbar disc herniation with radiculopathy. Spine Journal. 2014;14(1):180-191.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Kreiner+evidence-based+clinical+guideline+diagnosis+and+treatment+of+lumbar+disc+herniation+with+radiculopathy"
   },
   {
    "texto": "McGill S. Low Back Disorders: Evidence-Based Prevention and Rehabilitation. 3rd ed. Human Kinetics. 2016.",
    "url": "https://us.humankinetics.com/products/low-back-disorders-3rd-edition"
   }
  ],
  "cadera": [
   {
    "texto": "Cibulka MT, Bloom NJ, Enseki KR, et al. Hip pain and mobility deficits - hip osteoarthritis: revision 2017. Journal of Orthopaedic and Sports Physical Therapy. 2017;47(6):A1-A37.",
    "url": "https://www.orthopt.org/uploads/content_files/files/Hip_Pain_and_Mobility_Deficits_Hip_Osteoarthritis_2017.pdf"
   },
   {
    "texto": "NICE. Osteoarthritis in over 16s: diagnosis and management (NG226). 2022.",
    "url": "https://www.nice.org.uk/guidance/ng226"
   },
   {
    "texto": "Fransen M, McConnell S, Hernandez-Molina G, Reichenbach S. Exercise for osteoarthritis of the hip. Cochrane Database of Systematic Reviews. 2014;(4):CD007912.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Fransen+Exercise+for+osteoarthritis+of+the+hip+Cochrane"
   },
   {
    "texto": "Grimaldi A, Fearon A. Gluteal tendinopathy: integrating pathomechanics and clinical features in its management. Journal of Orthopaedic and Sports Physical Therapy. 2015;45(11):910-922.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Grimaldi+Fearon+Gluteal+tendinopathy+integrating+pathomechanics+and+clinical+features"
   },
   {
    "texto": "Mellor R, Bennell K, Grimaldi A, et al. Education plus exercise versus corticosteroid injection use versus a wait and see approach on global outcome and pain from gluteal tendinopathy: prospective, single blinded, randomised clinical trial. BMJ. 2018;361:k1662.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Mellor+Education+plus+exercise+versus+corticosteroid+injection+gluteal+tendinopathy"
   },
   {
    "texto": "Griffin DR, Dickenson EJ, O'Donnell J, et al. The Warwick Agreement on femoroacetabular impingement syndrome (FAI syndrome): an international consensus statement. British Journal of Sports Medicine. 2016;50(19):1169-1176.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Griffin+Warwick+Agreement+on+femoroacetabular+impingement+syndrome"
   },
   {
    "texto": "Kocher MS, Zurakowski D, Kasser JR. Differentiating between septic arthritis and transient synovitis of the hip in children: an evidence-based clinical prediction algorithm. Journal of Bone and Joint Surgery American. 1999;81(12):1662-1670.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Kocher+Differentiating+between+septic+arthritis+and+transient+synovitis+of+the+hip+in+children"
   },
   {
    "texto": "Wells PS, Anderson DR, Rodger M, et al. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis. New England Journal of Medicine. 2003;349(13):1227-1235.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Wells+Evaluation+of+D-dimer+in+the+diagnosis+of+suspected+deep-vein+thrombosis"
   }
  ],
  "rodilla": [
   {
    "texto": "Willy RW, Hoglund LT, Barton CJ, et al. Patellofemoral pain: clinical practice guidelines linked to the International Classification of Functioning, Disability and Health. Journal of Orthopaedic and Sports Physical Therapy. 2019;49(9):CPG1-CPG95.",
    "url": "https://doi.org/10.2519/jospt.2019.0302"
   },
   {
    "texto": "Logerstedt DS, Scalzitti DA, Risberg MA, et al. Knee stability and movement coordination impairments: knee ligament sprain revision 2017. Journal of Orthopaedic and Sports Physical Therapy. 2017;47(11):A1-A47.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Logerstedt+Knee+Stability+and+Movement+Coordination+Impairments+Knee+Ligament+Sprain+Revision+2017"
   },
   {
    "texto": "Grindem H, Snyder-Mackler L, Moksnes H, Engebretsen L, Risberg MA. Simple decision rules can reduce reinjury risk by 84% after ACL reconstruction: the Delaware-Oslo ACL cohort study. British Journal of Sports Medicine. 2016;50(13):804-808.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Grindem+Simple+decision+rules+can+reduce+reinjury+risk+by+84%25+after+ACL+reconstruction"
   },
   {
    "texto": "Kyritsis P, Bahr R, Landreau P, Miladi R, Witvrouw E. Likelihood of ACL graft rupture: not meeting six clinical discharge criteria before return to sport is associated with a four times greater risk of rupture. British Journal of Sports Medicine. 2016;50(15):946-951.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Kyritsis+Likelihood+of+ACL+graft+rupture+six+clinical+discharge+criteria"
   },
   {
    "texto": "van Melick N, van Cingel REH, Brooijmans F, et al. Evidence-based clinical practice update: practice guidelines for anterior cruciate ligament rehabilitation based on a systematic review and multidisciplinary consensus. British Journal of Sports Medicine. 2016;50(24):1506-1515.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=van+Melick+Evidence-based+clinical+practice+update+practice+guidelines+for+anterior+cruciate+ligament+rehabilitation"
   },
   {
    "texto": "Frobell RB, Roos EM, Roos HP, et al. A randomized trial of treatment for acute anterior cruciate ligament tears. New England Journal of Medicine. 2010;363(4):331-342.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Frobell+randomized+trial+of+treatment+for+acute+anterior+cruciate+ligament+tears"
   },
   {
    "texto": "Beynnon BD, Fleming BC, Johnson RJ, et al. Anterior cruciate ligament strain behavior during rehabilitation exercises in vivo. American Journal of Sports Medicine. 1995;23(1):24-34.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Beynnon+Anterior+cruciate+ligament+strain+behavior+during+rehabilitation+exercises+in+vivo"
   },
   {
    "texto": "Kise NJ, Risberg MA, Stensrud S, et al. Exercise therapy versus arthroscopic partial meniscectomy for degenerative meniscal tear in middle aged patients: randomised controlled trial with two year follow-up. BMJ. 2016;354:i3740.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Kise+Exercise+therapy+versus+arthroscopic+partial+meniscectomy+degenerative+meniscal+tear"
   },
   {
    "texto": "Katz JN, Brophy RH, Chaisson CE, et al. Surgery versus physical therapy for a meniscal tear and osteoarthritis. New England Journal of Medicine. 2013;368(18):1675-1684.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Katz+Surgery+versus+physical+therapy+for+a+meniscal+tear+and+osteoarthritis"
   },
   {
    "texto": "Stiell IG, Greenberg GH, Wells GA, et al. Prospective validation of a decision rule for the use of radiography in acute knee injuries. JAMA. 1996;275(8):611-615.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Stiell+Prospective+validation+of+a+decision+rule+for+the+use+of+radiography+in+acute+knee+injuries"
   }
  ],
  "tobillo": [
   {
    "texto": "Martin RL, Davenport TE, Fraser JJ, et al. Ankle stability and movement coordination impairments: lateral ankle ligament sprains revision 2021. Journal of Orthopaedic and Sports Physical Therapy. 2021;51(4):CPG1-CPG80.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Martin+Ankle+Stability+and+Movement+Coordination+Impairments+Lateral+Ankle+Ligament+Sprains+Revision+2021"
   },
   {
    "texto": "Chimenti RL, et al. Achilles pain, stiffness, and muscle power deficits: midportion Achilles tendinopathy revision 2024. Journal of Orthopaedic and Sports Physical Therapy. 2024;54(12).",
    "url": "https://doi.org/10.2519/jospt.2024.0302"
   },
   {
    "texto": "Martin RL, Chimenti R, Cuddeford T, et al. Achilles pain, stiffness, and muscle power deficits: midportion Achilles tendinopathy revision 2018. Journal of Orthopaedic and Sports Physical Therapy. 2018;48(5):A1-A38.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Martin+Achilles+Pain+Stiffness+and+Muscle+Power+Deficits+Midportion+Achilles+Tendinopathy+Revision+2018"
   },
   {
    "texto": "Martin RL, Davenport TE, Reischl SF, et al. Heel pain - plantar fasciitis: revision 2014. Journal of Orthopaedic and Sports Physical Therapy. 2014;44(11):A1-A33.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Martin+Heel+Pain+Plantar+Fasciitis+Revision+2014"
   },
   {
    "texto": "Stiell IG, McKnight RD, Greenberg GH, et al. Implementation of the Ottawa ankle rules. JAMA. 1994;271(11):827-832.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Stiell+Implementation+of+the+Ottawa+ankle+rules"
   },
   {
    "texto": "Bachmann LM, Kolb E, Koller MT, Steurer J, ter Riet G. Accuracy of Ottawa ankle rules to exclude fractures of the ankle and mid-foot: systematic review. BMJ. 2003;326(7386):417.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Bachmann+Accuracy+of+Ottawa+ankle+rules+to+exclude+fractures+of+the+ankle+and+mid-foot"
   },
   {
    "texto": "Dubois B, Esculier JF. Soft-tissue injuries simply need PEACE and LOVE. British Journal of Sports Medicine. 2020;54(2):72-73.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Dubois+Esculier+Soft-tissue+injuries+simply+need+PEACE+and+LOVE"
   },
   {
    "texto": "Kerkhoffs GMMJ, Rowe BH, Assendelft WJJ, et al. Immobilisation and functional treatment for acute lateral ankle ligament injuries in adults. Cochrane Database of Systematic Reviews. 2002;(3):CD003762.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Kerkhoffs+Immobilisation+and+functional+treatment+for+acute+lateral+ankle+ligament+injuries+in+adults"
   },
   {
    "texto": "Hupperets MDW, Verhagen EALM, van Mechelen W. Effect of unsupervised home based proprioceptive training on recurrences of ankle sprain: randomised controlled trial. BMJ. 2009;339:b2684.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Hupperets+Effect+of+unsupervised+home+based+proprioceptive+training+on+recurrences+of+ankle+sprain"
   },
   {
    "texto": "Alfredson H, Pietilä T, Jonsson P, Lorentzon R. Heavy-load eccentric calf muscle training for the treatment of chronic Achilles tendinosis. American Journal of Sports Medicine. 1998;26(3):360-366.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Alfredson+Heavy-load+eccentric+calf+muscle+training+for+the+treatment+of+chronic+Achilles+tendinosis"
   },
   {
    "texto": "Beyer R, Kongsgaard M, Hougs Kjær B, et al. Heavy slow resistance versus eccentric training as treatment for Achilles tendinopathy: a randomized controlled trial. American Journal of Sports Medicine. 2015;43(7):1704-1711.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Beyer+Heavy+Slow+Resistance+Versus+Eccentric+Training+as+Treatment+for+Achilles+Tendinopathy"
   },
   {
    "texto": "Jonsson P, Alfredson H, Sunding K, Fahlström M, Cook J. New regimen for eccentric calf-muscle training in patients with chronic insertional Achilles tendinopathy: results of a pilot study. British Journal of Sports Medicine. 2008;42(9):746-749.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Jonsson+New+regimen+for+eccentric+calf-muscle+training+chronic+insertional+Achilles+tendinopathy"
   },
   {
    "texto": "Rathleff MS, Mølgaard CM, Fredberg U, et al. High-load strength training improves outcome in patients with plantar fasciitis: a randomized controlled trial with 12-month follow-up. Scandinavian Journal of Medicine and Science in Sports. 2015;25(3):e292-e300.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Rathleff+High-load+strength+training+improves+outcome+in+patients+with+plantar+fasciitis"
   },
   {
    "texto": "Rogers LC, Frykberg RG, Armstrong DG, et al. The Charcot foot in diabetes. Diabetes Care. 2011;34(9):2123-2129.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Rogers+The+Charcot+foot+in+diabetes+Diabetes+Care+2011"
   }
  ],
  "atm": [
   {
    "texto": "Schiffman E, Ohrbach R, Truelove E, et al. Diagnostic Criteria for Temporomandibular Disorders (DC/TMD) for clinical and research applications: recommendations of the International RDC/TMD Consortium Network and Orofacial Pain Special Interest Group. Journal of Oral and Facial Pain and Headache. 2014;28(1):6-27.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Schiffman+Diagnostic+Criteria+for+Temporomandibular+Disorders+DC%2FTMD+clinical+and+research+applications"
   },
   {
    "texto": "Armijo-Olivo S, Pitance L, Singh V, et al. Effectiveness of manual therapy and therapeutic exercise for temporomandibular disorders: systematic review and meta-analysis. Physical Therapy. 2016;96(1):9-25.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Armijo-Olivo+Effectiveness+of+manual+therapy+and+therapeutic+exercise+for+temporomandibular+disorders"
   },
   {
    "texto": "Medlicott MS, Harris SR. A systematic review of the effectiveness of exercise, manual therapy, electrotherapy, relaxation training, and biofeedback in the management of temporomandibular disorder. Physical Therapy. 2006;86(7):955-973.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Medlicott+Harris+systematic+review+effectiveness+of+exercise+manual+therapy+temporomandibular+disorder"
   },
   {
    "texto": "de Leeuw R, Klasser GD, eds. Orofacial Pain: Guidelines for Assessment, Diagnosis, and Management. 6th ed. American Academy of Orofacial Pain / Quintessence. 2018.",
    "url": "https://www.aaop.org/"
   },
   {
    "texto": "Lobbezoo F, Ahlberg J, Raphael KG, et al. International consensus on the assessment of bruxism: report of a work in progress. Journal of Oral Rehabilitation. 2018;45(11):837-844.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Lobbezoo+International+consensus+on+the+assessment+of+bruxism"
   },
   {
    "texto": "Buchbinder D, Currivan RB, Kaplan AJ, Urken ML. Mobilization regimens for the prevention of jaw hypomobility in the radiated patient: a comparison of three techniques. Journal of Oral and Maxillofacial Surgery. 1993;51(8):863-867.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Buchbinder+Mobilization+regimens+for+the+prevention+of+jaw+hypomobility+in+the+radiated+patient"
   },
   {
    "texto": "Hellmich B, Agueda A, Monti S, et al. 2018 update of the EULAR recommendations for the management of large vessel vasculitis. Annals of the Rheumatic Diseases. 2020;79(1):19-30.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Hellmich+2018+update+of+the+EULAR+recommendations+for+the+management+of+large+vessel+vasculitis"
   },
   {
    "texto": "Dasgupta B, Borg FA, Hassan N, et al. BSR and BHPR guidelines for the management of giant cell arteritis. Rheumatology. 2010;49(8):1594-1597.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=Dasgupta+BSR+and+BHPR+guidelines+for+the+management+of+giant+cell+arteritis"
   }
  ]
 }
};
