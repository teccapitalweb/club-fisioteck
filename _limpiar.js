// Un solo uso (se borra): quita emojis y símbolos decorativos de lo que se agregó.
const fs = require('fs');
function edit(f, pares) {
  let s = fs.readFileSync(f, 'utf8'); const crlf = s.includes('\r\n'); s = s.replace(/\r\n/g, '\n');
  for (const [a, b] of pares) { if (!s.includes(a)) throw new Error(f + ' no: ' + a.slice(0, 70)); s = s.split(a).join(b); }
  fs.writeFileSync(f, crlf ? s.replace(/\n/g, '\r\n') : s);
}
// Avatares: círculos de color con la inicial (sin emojis ni íconos)
const av = fs.readFileSync('club-avatar.js', 'utf8');
const i0 = av.indexOf('  const AVATARES = ['), i1 = av.indexOf('];', i0) + 2;
let nuevo = av.slice(0, i0) + `  // Círculos de color con la inicial de la persona (sin emojis ni íconos). [id, nombre, degradado]
  const AVATARES = [
    ['azul', 'Azul', '#0D5FA0,#4CA6DE'], ['violeta', 'Violeta', '#7C3AED,#A78BFA'], ['rojo', 'Rojo', '#DC2D3F,#F87171'], ['granate', 'Granate', '#BE123C,#FB7185'],
    ['verde', 'Verde', '#0F9D58,#34D399'], ['turquesa', 'Turquesa', '#159E92,#2FD1C6'], ['cian', 'Cian', '#0891B2,#22D3EE'], ['ambar', 'Ámbar', '#C2760B,#FBBF24'],
    ['naranja', 'Naranja', '#B45309,#FB923C'], ['pizarra', 'Pizarra', '#334155,#64748B'], ['rosa', 'Rosa', '#DB2777,#F472B6'], ['indigo', 'Índigo', '#1D4ED8,#60A5FA']
  ];` + av.slice(i1);
fs.writeFileSync('club-avatar.js', nuevo);
edit('club-avatar.js', [
  ["if (a) { el.textContent = a[1]; el.style.background = fondo(a); el.style.fontSize = el === $('ftbAv') ? '1.05rem' : ''; }", "if (a) { el.textContent = inicial(); el.style.background = fondo(a); }"],
  ["if (g) { g.textContent = a ? a[1] : ((($('sidebarName') || {}).textContent || 'S').charAt(0)); g.style.background = a ? fondo(a) : ''; }", "if (g) { g.textContent = inicial(); g.style.background = a ? fondo(a) : ''; }"],
  ["  let aplicando = false;", "  const inicial = () => ((auth.currentUser && auth.currentUser.displayName) || (($('sidebarName') || {}).textContent) || 'S').trim().charAt(0).toUpperCase() || 'S';\n  let aplicando = false;"],
  ["aria-label=\"Avatar ' + a[0] + '\"", "aria-label=\"Avatar ' + a[1] + '\" title=\"' + a[1] + '\""],
  ["font-size:1.5rem;cursor:pointer;\">' + a[1] + '</button>'", "cursor:pointer;\"></button>'"],
  ["font-size:1.9rem;color:#fff;font-weight:700;", "font-size:1.6rem;color:#fff;font-weight:700;"],
  ["Se guarda en su ficha", "Se guarda en su ficha"],
  ["en lugar de la inicial, cada persona puede escoger un avatar.", "cada persona puede escoger el color de su avatar (círculo con su inicial)."]
]);
// Inicio: sin símbolos decorativos (la marca de hecho se dibuja con CSS)
edit('club-inicio.js', [
  ["(p.hecho ? '✓' : i + 1)", "(p.hecho ? '' : i + 1)"],
  [".fti-pasos li.hecho i { background:var(--success,#0F9D58); border-color:var(--success,#0F9D58); color:#fff; }", ".fti-pasos li.hecho i { background:var(--success,#0F9D58); border-color:var(--success,#0F9D58); position:relative; }\n  .fti-pasos li.hecho i::after { content:''; position:absolute; left:6px; top:3px; width:5px; height:9px; border:solid #fff; border-width:0 2px 2px 0; transform:rotate(45deg); }"],
  ["esc(m.boton) + ' →</button>'", "esc(m.boton) + '</button>'"]
]);
edit('admin/servidor.js', [["Sin errores en este periodo. 🎉", "Sin errores en este periodo."]]);
console.log('ok');
