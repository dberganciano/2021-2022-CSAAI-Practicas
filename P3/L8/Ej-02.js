console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

// Definimos el tamaño del canvas
canvas.width = 400;
canvas.height = 700;

// Obtenemos el contexto del canvas
const ctx = canvas.getContext("2d");

// Definimos las posiciones iniciales
let xball = 200;
let yball = 650;

// Definimos las velocidades del objeto
let velx = 3;
let vely = 1;

// Definimos la pelota
function drawBall() {
  ctx.beginPath();
    ctx.arc(xball, yball, 10, 0, 2 * Math.PI);
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'white';

    ctx.stroke()
    ctx.fill()
  ctx.closePath();
}

// Función principal de animación
function update() 
{
   if (xball < 20 || xball >= (canvas.width - 20) ) {
    velx = -velx;
  }

  if (yball <= 20 || yball > (canvas.height - 20) ) {
    vely = -vely;
  }

  // Actualizar la posición
  xball = xball + velx;
  yball = yball + vely;

  // 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 3) Dibujar los elementos visibles
  drawBall();

  // 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
}
update();