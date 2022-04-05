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
let vely = -1;

// Definimos los estados
const ESTADO = {
  INIT: 0,
  PLAY: 1,
  END: 2,
  WIN: 3
}
let estado = ESTADO.INIT

// Definimos la pelota
function drawBall() {
  ctx.beginPath();
    ctx.arc(xball, yball, 10, 0, 2 * Math.PI);
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'white';
    ctx.setLineDash([]); //continua

    ctx.stroke()
    ctx.fill()
  ctx.closePath();
}

// Definimos la red
function drawNet(){
    ctx.beginPath();    
    ctx.moveTo(0, 670);
    ctx.lineTo(500, 670); 
    ctx.setLineDash([10, 10]); //discontinua
    ctx.strokeStyle = 'white';
    ctx.stroke();
  ctx.closePath();
}

// Función principal de animación
function update() {
  if (estado == ESTADO.PLAY) {
    if (xball < 20 || xball >= (canvas.width - 20) ) {
      velx = -velx;
    }

    if (yball <= 20 || yball > (canvas.height - 20) ) {
      vely = -vely;
    }

    // Actualizar la posición
    xball = xball + velx;
    yball = yball + vely;

    // Limite de la red
    if (yball > 670) {
      estado = ESTADO.INIT;
    }
}
  // 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 3) Dibujar los elementos visibles
  drawBall();
  drawNet();

  // 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
  if (estado == ESTADO.INIT) {
    xball = 200;
    yball = 650;
  }
}
button0.onclick = (ev) => {
  estado = ESTADO.PLAY;
}
update();