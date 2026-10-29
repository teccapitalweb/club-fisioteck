/* Club FisioTeck — mascota "Fisi" (como el personaje de Zoorigen y los de Alintec): un hueso simpático dibujado en SVG propio (sin emojis ni imágenes
   externas). Cada sección tiene su pose, gesto y accesorio (saluda, lee, celebra con el trofeo, investiga con la lupa, habla por micrófono...),
   con animaciones suaves (flota, parpadea y mueve el brazo) y una frase distinta por sección. Respeta prefers-reduced-motion.
   Uso: ftMascota.html(seccion, { ancho, burbuja, frase, pose }). Poses: ftMascota.POSES. Vista previa de todas: ftMascota.galeria().
   Depende de index.html: nada (solo CSS propio). */
(function () {
  'use strict';
  const FRASES = {
    home: ['Tu siguiente clase te espera. ¡Vamos!', 'Cada clase cuenta. ¡Sigue así!', 'Hoy es buen día para avanzar un poco más.'],
    library: ['Elige un curso y empezamos.', 'Hay mucho por aprender. ¿Por dónde empiezas?'],
    pdfs: ['Aquí está todo el material para repasar.', 'Descarga, estudia y vuelve por más.'],
    retos: ['¿Listo para un reto? Yo te animo.', 'Practicar es la mejor manera de aprender.'],
    detective: ['Mira bien la foto. Algo no está en su lugar.', 'Un buen detective se fija en los detalles.'],
    achievements: ['¡Mira cuántas insignias llevas!', 'Cada día que entras suma a tu racha.'],
    certificates: ['Tus certificados cuentan lo que lograste.'],
    news: ['Lo más nuevo de la fisioterapia, aquí.'],
    live: ['Pronto habrá clases en vivo con especialistas.'],
    forum: ['Pregunta, comparte y aprende con el club.'],
    directory: ['Conoce a otros colegas del club.'],
    canal: ['Únete y platica con la comunidad.'],
    account: ['Aquí cuidas tus datos y tu perfil.'],
    subscription: ['Elige tu plan y abre todo el Club.'],
    tools: ['Tus herramientas clínicas, a un toque.'],
    referidos: ['Invita a tus amigos y gana cursos antes.', 'Cada amigo válido te acerca al premio.'],
    pensar: ['Mmm… déjame pensarlo.']
  };

  // sección -> pose
  const POSE_DE = { home: 'saluda', library: 'libro', pdfs: 'documento', retos: 'animo', detective: 'lupa', achievements: 'trofeo', certificates: 'diploma', news: 'periodico', live: 'microfono', forum: 'charla', directory: 'tarjeta', canal: 'megafono', account: 'saluda', subscription: 'celebra', tools: 'senala', referidos: 'celebra', pensar: 'piensa' };

  const estilo = document.createElement('style');
  estilo.textContent = `
  .fm { display:inline-flex; flex-direction:column; align-items:center; gap:6px; position:relative; }
  .fm svg { width:var(--fm-w,120px); height:auto; overflow:visible; animation:fmFlota 4.2s ease-in-out infinite; transform-origin:50% 90%; }
  .fm .fm-ojos { transform-box:fill-box; transform-origin:center; animation:fmParpadeo 5s infinite; }
  .fm .fm-brazo { transform-box:fill-box; transform-origin:0% 100%; animation:fmSaluda 2.6s ease-in-out infinite; }
  .fm .fm-brazo-r { transform-box:fill-box; transform-origin:100% 100%; animation:fmSaludaR 2.2s ease-in-out infinite; }
  .fm .fm-bota { transform-box:fill-box; transform-origin:center; animation:fmBota 1.1s ease-in-out infinite; }
  .fm .fm-gira { transform-box:fill-box; transform-origin:center; animation:fmGira 3.4s ease-in-out infinite; }
  .fm .fm-pulso { transform-box:fill-box; transform-origin:center; animation:fmPulso 1.6s ease-in-out infinite; }
  .fm-burbuja { position:relative; max-width:210px; padding:9px 13px; border-radius:14px; background:var(--surface,#fff); color:var(--text,#0B1A30); font-size:.78rem; line-height:1.4; box-shadow:0 8px 24px rgba(11,58,102,.18); border:1px solid var(--border,#D8E3EE); text-align:center; }
  .fm-burbuja::after { content:''; position:absolute; left:50%; bottom:-7px; width:12px; height:12px; background:inherit; border-right:1px solid var(--border,#D8E3EE); border-bottom:1px solid var(--border,#D8E3EE); transform:translateX(-50%) rotate(45deg); }
  @keyframes fmFlota { 0%,100% { transform:translateY(0) rotate(-1deg); } 50% { transform:translateY(-7px) rotate(1.5deg); } }
  @keyframes fmParpadeo { 0%,92%,100% { transform:scaleY(1); } 95% { transform:scaleY(.08); } }
  @keyframes fmSaluda { 0%,100% { transform:rotate(0deg); } 25% { transform:rotate(-18deg); } 50% { transform:rotate(8deg); } 75% { transform:rotate(-14deg); } }
  @keyframes fmSaludaR { 0%,100% { transform:rotate(0deg); } 50% { transform:rotate(14deg); } }
  @keyframes fmBota { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-6px); } }
  @keyframes fmGira { 0%,100% { transform:rotate(-8deg); } 50% { transform:rotate(8deg); } }
  @keyframes fmPulso { 0%,100% { transform:scale(1); opacity:1; } 50% { transform:scale(1.18); opacity:.75; } }
  @media (prefers-reduced-motion: reduce) { .fm svg, .fm .fm-ojos, .fm .fm-brazo, .fm .fm-brazo-r, .fm .fm-bota, .fm .fm-gira, .fm .fm-pulso { animation:none; } }
  @media (max-width:640px) { .fm-burbuja { display:none; } }
  `;
  document.head.appendChild(estilo);

  const T = '#0B1A30', AZ = '#0D5FA0', TQ = '#159E92', OS = '#F2F8FD';
  const brazo = (d, mano, cls) => '<g class="' + (cls || '') + '" stroke="' + AZ + '" stroke-width="5" stroke-linecap="round" fill="' + OS + '"><path d="' + d + '" fill="none"/><circle cx="' + mano[0] + '" cy="' + mano[1] + '" r="' + (mano[2] || 10) + '"/></g>';

  // Gestos de cara
  const OJOS = {
    normal: '<g class="fm-ojos"><ellipse cx="82" cy="118" rx="8" ry="10" fill="' + T + '"/><ellipse cx="118" cy="118" rx="8" ry="10" fill="' + T + '"/><circle cx="85" cy="114" r="3" fill="#fff"/><circle cx="121" cy="114" r="3" fill="#fff"/></g>',
    feliz: '<path d="M72 122 Q82 108 92 122 M108 122 Q118 108 128 122" fill="none" stroke="' + T + '" stroke-width="4" stroke-linecap="round"/>',
    guino: '<g class="fm-ojos"><ellipse cx="82" cy="118" rx="8" ry="10" fill="' + T + '"/><circle cx="85" cy="114" r="3" fill="#fff"/></g><path d="M108 120 Q118 110 128 120" fill="none" stroke="' + T + '" stroke-width="4" stroke-linecap="round"/>',
    asombro: '<g class="fm-ojos"><circle cx="82" cy="117" r="11" fill="#fff" stroke="' + T + '" stroke-width="3"/><circle cx="118" cy="117" r="11" fill="#fff" stroke="' + T + '" stroke-width="3"/><circle cx="84" cy="117" r="5" fill="' + T + '"/><circle cx="120" cy="117" r="5" fill="' + T + '"/></g>',
    atento: '<g class="fm-ojos"><ellipse cx="82" cy="118" rx="8" ry="9" fill="' + T + '"/><ellipse cx="118" cy="118" rx="8" ry="9" fill="' + T + '"/><circle cx="86" cy="115" r="3" fill="#fff"/><circle cx="122" cy="115" r="3" fill="#fff"/></g><path d="M72 106 L92 110 M128 106 L108 110" stroke="' + T + '" stroke-width="3.5" stroke-linecap="round"/>'
  };
  const BOCA = {
    sonrisa: '<path d="M90 136 Q100 148 110 136" fill="none" stroke="' + T + '" stroke-width="3.5" stroke-linecap="round"/>',
    abierta: '<path d="M90 136 Q100 156 110 136 Z" fill="' + T + '"/><path d="M95 144 Q100 150 105 144" fill="#F37C74"/>',
    o: '<ellipse cx="100" cy="143" rx="6" ry="8" fill="' + T + '"/>',
    neutra: '<path d="M92 142 H108" stroke="' + T + '" stroke-width="3.5" stroke-linecap="round"/>',
    lado: '<path d="M90 140 Q102 150 112 134" fill="none" stroke="' + T + '" stroke-width="3.5" stroke-linecap="round"/>'
  };
  const BRAZO_IZQ_ABAJO = brazo('M60 158 Q38 168 34 186', [33, 190]);
  const BRAZO_IZQ_ARRIBA = brazo('M60 152 Q34 130 30 98', [29, 90], 'fm-brazo-r');
  const BRAZO_DER_SALUDA = brazo('M140 152 Q168 142 176 112', [178, 104], 'fm-brazo');
  const BRAZO_DER_ARRIBA = brazo('M140 152 Q166 130 170 98', [171, 90], 'fm-brazo');
  const AMBOS_FRENTE = brazo('M60 160 Q56 190 86 194', [90, 194]) + brazo('M140 156 Q144 190 114 194', [110, 194]);

  // Cada pose: cara, brazos y accesorio (el accesorio se dibuja encima)
  const POSES = {
    saluda: { ojos: 'normal', boca: 'sonrisa', izq: BRAZO_IZQ_ABAJO, der: BRAZO_DER_SALUDA },
    animo: { ojos: 'atento', boca: 'abierta', izq: brazo('M60 158 Q40 150 44 128', [45, 120]), der: brazo('M140 156 Q160 148 156 126', [155, 118], 'fm-brazo') },
    celebra: { ojos: 'feliz', boca: 'abierta', izq: BRAZO_IZQ_ARRIBA, der: BRAZO_DER_ARRIBA, bota: true,
      extra: '<g class="fm-pulso"><path d="M40 50 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z M160 40 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill="#F5B83D"/><circle cx="28" cy="70" r="4" fill="' + TQ + '"/><circle cx="176" cy="66" r="4" fill="#DC2D3F"/><rect x="170" y="20" width="8" height="8" rx="2" fill="' + AZ + '" transform="rotate(20 174 24)"/></g>' },
    libro: { ojos: 'atento', boca: 'sonrisa', izq: AMBOS_FRENTE, der: '',
      extra: '<g transform="translate(100 186)"><path d="M-30 -12 Q-15 -20 0 -10 Q15 -20 30 -12 V18 Q15 10 0 20 Q-15 10 -30 18Z" fill="#fff" stroke="' + AZ + '" stroke-width="3.5" stroke-linejoin="round"/><path d="M0 -10 V20" stroke="' + AZ + '" stroke-width="3"/><path d="M-22 -2 H-8 M-22 6 H-8 M8 -2 H22 M8 6 H22" stroke="' + TQ + '" stroke-width="3" stroke-linecap="round"/></g>' },
    documento: { ojos: 'normal', boca: 'sonrisa', izq: AMBOS_FRENTE, der: '',
      extra: '<g transform="translate(100 182)"><rect x="-22" y="-26" width="44" height="52" rx="5" fill="#fff" stroke="' + AZ + '" stroke-width="3.5"/><path d="M-12 -12 H12 M-12 -3 H12 M-12 6 H4" stroke="' + TQ + '" stroke-width="3.5" stroke-linecap="round"/><path d="M8 14 l6 6 10 -12" fill="none" stroke="#0F9D58" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></g>' },
    trofeo: { ojos: 'feliz', boca: 'abierta', izq: BRAZO_IZQ_ABAJO, der: brazo('M140 152 Q166 138 168 116', [168, 108], 'fm-brazo'),
      extra: '<g transform="translate(168 78)" class="fm-gira"><path d="M-14 -14 H14 V0 Q14 12 0 14 Q-14 12 -14 0Z" fill="#F5B83D" stroke="#C2760B" stroke-width="3"/><path d="M-14 -8 H-22 Q-22 4 -12 4 M14 -8 H22 Q22 4 12 4" fill="none" stroke="#C2760B" stroke-width="3"/><path d="M0 14 V22 M-9 24 H9" stroke="#C2760B" stroke-width="4" stroke-linecap="round"/></g><g class="fm-pulso"><path d="M30 60 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill="#F5B83D"/></g>' },
    diploma: { ojos: 'feliz', boca: 'sonrisa', izq: AMBOS_FRENTE, der: '',
      extra: '<g transform="translate(100 184)"><rect x="-34" y="-16" width="68" height="34" rx="4" fill="#fff" stroke="' + AZ + '" stroke-width="3.5"/><path d="M-22 -4 H22 M-22 4 H8" stroke="' + TQ + '" stroke-width="3" stroke-linecap="round"/><circle cx="22" cy="10" r="8" fill="#F5B83D" stroke="#C2760B" stroke-width="2.5"/><path d="M18 17 l-3 10 7 -4 7 4 -3 -10" fill="#DC2D3F"/></g>' },
    periodico: { ojos: 'atento', boca: 'neutra', izq: AMBOS_FRENTE, der: '',
      extra: '<g transform="translate(100 184) rotate(-4)"><rect x="-34" y="-22" width="68" height="44" rx="3" fill="#fff" stroke="' + AZ + '" stroke-width="3.5"/><rect x="-26" y="-14" width="22" height="14" fill="' + TQ + '"/><path d="M2 -12 H26 M2 -4 H26 M-26 6 H26 M-26 13 H14" stroke="' + AZ + '" stroke-width="3" stroke-linecap="round"/></g>' },
    microfono: { ojos: 'normal', boca: 'abierta', izq: BRAZO_IZQ_ABAJO, der: brazo('M140 152 Q158 150 150 130', [148, 124]),
      extra: '<g transform="translate(144 96)"><rect x="-7" y="-14" width="14" height="22" rx="7" fill="#fff" stroke="' + AZ + '" stroke-width="3.5"/><path d="M0 8 V16" stroke="' + AZ + '" stroke-width="3.5"/></g><g class="fm-pulso" fill="none" stroke="' + TQ + '" stroke-width="3" stroke-linecap="round"><path d="M164 84 Q172 96 164 108"/><path d="M174 76 Q186 96 174 116"/></g>' },
    charla: { ojos: 'guino', boca: 'sonrisa', izq: BRAZO_IZQ_ABAJO, der: BRAZO_DER_SALUDA,
      extra: '<g class="fm-pulso"><g transform="translate(36 52)"><rect x="-18" y="-13" width="36" height="24" rx="8" fill="#fff" stroke="' + TQ + '" stroke-width="3.5"/><path d="M-6 11 L-12 20 L2 11" fill="#fff" stroke="' + TQ + '" stroke-width="3.5" stroke-linejoin="round"/><path d="M-9 -4 H9 M-9 3 H3" stroke="' + AZ + '" stroke-width="3" stroke-linecap="round"/></g></g>' },
    tarjeta: { ojos: 'normal', boca: 'sonrisa', izq: AMBOS_FRENTE, der: '',
      extra: '<g transform="translate(100 186)"><rect x="-30" y="-18" width="60" height="38" rx="6" fill="#fff" stroke="' + AZ + '" stroke-width="3.5"/><circle cx="-14" cy="-3" r="7" fill="' + TQ + '"/><path d="M-22 14 Q-14 4 -6 14" fill="' + TQ + '"/><path d="M0 -6 H22 M0 2 H22 M0 10 H14" stroke="' + AZ + '" stroke-width="3" stroke-linecap="round"/></g>' },
    megafono: { ojos: 'atento', boca: 'abierta', izq: BRAZO_IZQ_ABAJO, der: brazo('M140 152 Q160 150 156 132', [154, 126]),
      extra: '<g transform="translate(160 104) rotate(-20)"><path d="M-14 -8 L10 -18 V18 L-14 8Z" fill="' + TQ + '" stroke="' + AZ + '" stroke-width="3" stroke-linejoin="round"/><rect x="-24" y="-8" width="10" height="16" rx="3" fill="#fff" stroke="' + AZ + '" stroke-width="3"/></g><g class="fm-pulso" fill="none" stroke="' + AZ + '" stroke-width="3" stroke-linecap="round"><path d="M182 84 L192 80 M184 104 H196 M182 124 L192 128"/></g>' },
    lupa: { ojos: 'atento', boca: 'lado', izq: BRAZO_IZQ_ABAJO, der: brazo('M140 152 Q162 144 168 124', [168, 118], 'fm-brazo-r'),
      extra: '<g transform="translate(166 92)" class="fm-gira"><circle r="19" fill="rgba(76,166,222,.25)" stroke="' + AZ + '" stroke-width="5"/><path d="M14 14 L30 32" stroke="' + AZ + '" stroke-width="7" stroke-linecap="round"/><path d="M-8 -8 Q-2 -12 4 -10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>' },
    senala: { ojos: 'normal', boca: 'sonrisa', izq: BRAZO_IZQ_ABAJO, der: brazo('M140 156 Q168 154 186 148', [190, 146], 'fm-brazo-r'),
      extra: '<g class="fm-pulso"><path d="M168 118 l5 -12 M180 124 l10 -8" stroke="' + TQ + '" stroke-width="3" stroke-linecap="round"/></g>' },
    piensa: { ojos: 'asombro', boca: 'o', izq: BRAZO_IZQ_ABAJO, der: brazo('M140 156 Q150 142 128 142', [124, 142]),
      extra: '<g class="fm-pulso" transform="translate(150 60)"><circle r="18" fill="#fff" stroke="' + AZ + '" stroke-width="3.5"/><path d="M-5 -6 Q-5 -12 1 -12 Q8 -12 8 -5 Q8 0 1 2 V6 M1 11 V13" fill="none" stroke="' + AZ + '" stroke-width="3.5" stroke-linecap="round"/></g>' }
  };
  

  function svg(seccion, pose) {
    const p = POSES[pose] || POSES[POSE_DE[seccion]] || POSES.saluda;
    const cuerpo =
      '<g stroke="' + AZ + '" stroke-width="5" stroke-linejoin="round" fill="' + OS + '">' +
      '<rect x="58" y="40" width="84" height="164" rx="22"/><circle cx="66" cy="44" r="27"/><circle cx="134" cy="44" r="27"/><circle cx="66" cy="200" r="27"/><circle cx="134" cy="200" r="27"/></g>' +
      '<g fill="' + OS + '"><rect x="61" y="43" width="78" height="158" rx="20"/><circle cx="66" cy="44" r="24"/><circle cx="134" cy="44" r="24"/><circle cx="66" cy="200" r="24"/><circle cx="134" cy="200" r="24"/></g>' +
      '<path d="M60 78 H140 V96 H60 Z" fill="' + AZ + '"/><path d="M60 87 H140" stroke="#4CA6DE" stroke-width="3" stroke-dasharray="6 6"/>';
    return '<svg viewBox="0 0 200 240" role="img" aria-label="Fisi, la mascota del Club FisioTeck">' +
      '<ellipse cx="100" cy="228" rx="46" ry="7" fill="rgba(11,58,102,.16)"/>' +
      '<g' + (p.bota ? ' class="fm-bota"' : '') + '>' + cuerpo + (OJOS[p.ojos] || OJOS.normal) + (BOCA[p.boca] || BOCA.sonrisa) +
      '<circle cx="68" cy="136" r="7" fill="#F9B4AE" opacity=".75"/><circle cx="132" cy="136" r="7" fill="#F9B4AE" opacity=".75"/>' +
      (p.izq || '') + (p.der || '') + (p.extra || '') + '</g></svg>';
  }
  function frase(seccion) { const l = FRASES[seccion] || FRASES.home; return l[Math.floor(Date.now() / 86400000) % l.length]; }
  window.ftMascota = {
    FRASES, POSES: Object.keys(POSES),
    // opciones: { ancho: 120, burbuja: true|false, frase: 'texto', pose: 'celebra' }
    html(seccion, o) {
      o = o || {};
      const t = o.frase || frase(seccion);
      return '<div class="fm" style="--fm-w:' + (o.ancho || 120) + 'px">' + (o.burbuja === false ? '' : '<div class="fm-burbuja" role="note">' + String(t).replace(/[<>&]/g, '') + '</div>') + svg(seccion, o.pose) + '</div>';
    },
    // Muestra todas las poses (para revisar): ftMascota.galeria() en la consola del navegador
    galeria() {
      const d = document.createElement('div'); d.style.cssText = 'position:fixed;inset:0;z-index:99999;overflow:auto;background:#fff;padding:24px;display:flex;flex-wrap:wrap;gap:18px';
      d.innerHTML = Object.keys(POSES).map(k => '<div style="text-align:center;font:12px monospace">' + this.html('home', { pose: k, burbuja: false, ancho: 130 }) + '<div>' + k + '</div></div>').join('');
      d.onclick = () => d.remove(); document.body.appendChild(d);
    }
  };
})();
