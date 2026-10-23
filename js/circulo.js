// ============================================
// SAMAN · El círculo interactivo
// Cada 4,5 segundos pasa a la siguiente etapa.
// Si la persona toca una etapa, se queda quieto en esa.
// ============================================

// 1. Los textos de cada etapa (en el mismo orden que los botones)
const etapas = [
  {
    nombre: 'Entender',
    texto: 'Qué es, cómo se comporta y qué esperar, explicado con calma y en el orden correcto.',
    cita: '¿Qué me está pasando?'
  },
  {
    nombre: 'Sentir',
    texto: 'Lo que sientes también es parte del proceso. Te ayudamos a nombrarlo y a no cargarlo solo.',
    cita: '¿Es normal sentirme así?'
  },
  {
    nombre: 'Prepararte',
    texto: 'Exámenes, procedimientos y preguntas para tu próxima cita, organizados para que llegues tranquilo.',
    cita: '¿Qué le pregunto a mi médico?'
  },
  {
    nombre: 'Vivir',
    texto: 'El día a día: alimentación, trabajo, familia, los días buenos y los difíciles. Lo práctico.',
    cita: '¿Cómo sigo con mi vida?'
  },
  {
    nombre: 'Volver a empezar',
    texto: 'Cada control abre una nueva vuelta. SAMAN recuerda contigo lo que sigue y se adelanta a ello.',
    cita: '¿Qué viene ahora?'
  }
];

// 2. Buscamos en la página las piezas que vamos a cambiar
const botones = document.querySelectorAll('.etapa');
const indicador = document.querySelector('.indicador');
const vuelta = document.querySelector('#detalle-vuelta');
const nombre = document.querySelector('#detalle-nombre');
const texto = document.querySelector('#detalle-texto');
const cita = document.querySelector('#detalle-cita');

// 3. Cuántos pasos llevamos (sigue sumando para que el anillo gire siempre hacia adelante)
let pasos = 0;

// 4. Mostrar la etapa que toca
function mostrar() {
  const actual = pasos % etapas.length;   // % = el residuo: 0, 1, 2, 3, 4, 0, 1...

  botones.forEach(function (boton, i) {
    boton.setAttribute('aria-pressed', i === actual ? 'true' : 'false');
  });

  indicador.style.transform = 'rotate(' + (pasos * 72) + 'deg)';   // 360° / 5 etapas = 72°
  vuelta.textContent = 'Vuelta ' + (actual + 1) + ' de 5';
  nombre.textContent = etapas[actual].nombre;
  texto.textContent = etapas[actual].texto;
  cita.textContent = '«' + etapas[actual].cita + '»';
}

// 5. Avanzar solo, salvo que la persona prefiera menos movimiento
const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let reloj = null;

if (!menosMovimiento) {
  reloj = setInterval(function () {
    pasos = pasos + 1;
    mostrar();
  }, 4500);
}

// 6. Al tocar una etapa: ir hacia ella y detener el reloj
botones.forEach(function (boton, i) {
  boton.addEventListener('click', function () {
    clearInterval(reloj);
    const actual = pasos % etapas.length;
    pasos = pasos + ((i - actual + etapas.length) % etapas.length);
    mostrar();
  });
});

mostrar();
