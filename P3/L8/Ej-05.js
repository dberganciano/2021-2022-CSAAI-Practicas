console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

// Definimos el tamaño del canvas
canvas.width = 400;
canvas.height = 700;

// Obtenemos el contexto del canvas
const ctx = canvas.getContext("2d");

// Definimos las posiciones iniciales
let xball = 200;
let yball = 620;
let xtable = 160;
let ytable = 640;

// Definimos los puntos y las vidas
var lifes = 3;

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

// Definimos la raqueta
function drawRacket() {
  ctx.beginPath();
    ctx.rect(xtable, ytable, 80, 20);
    ctx.fillStyle = 'white';
    ctx.setLineDash([]); //continua

    ctx.fill();
    ctx.stroke();
  ctx.closePath();
}

// Definimos la red
function drawNet() {
  ctx.beginPath();    
    ctx.moveTo(0, 670);
    ctx.lineTo(500, 670); 
    ctx.setLineDash([10, 10]); //discontinua
    ctx.strokeStyle = 'white';
    ctx.stroke();
  ctx.closePath();
}

// Definimos las vidas
function drawLife() {
    ctx.font = "20px Times New Roman";
    ctx.fillStyle = 'white'
    ctx.fillText("Vidas: ", 315, 30);
    ctx.fillText(lifes, 370, 30);
}

// Definimos el gameover
function gameover() {
  if (estado == ESTADO.END) {
    estado = ESTADO.INIT;
    lifes = 3;
  }
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

    // Rebote de la raqueta
    if (xball >= xtable - 10 && xball <= (xtable + 90) && yball >= (ytable - 10) && yball <= (ytable + 30 - 10)) {
        vely = vely * -1
    }

    // Limite de la red
    if (yball > 670) {
      estado = ESTADO.INIT;
      lifes = lifes - 1;
    }

    // Gameover
    if (lifes == 0) {
      estado = ESTADO.END;
    }
}

  // Limites de la raqueta
  if (xtable < 0) {
    xtable = 0;
  }
  if (xtable > 320){
    xtable = 320;
  }
  
  // 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 3) Dibujar los elementos visibles
  drawBall();
  drawRacket();
  drawNet();
  drawLife();
  gameover();

  // 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
  if (estado == ESTADO.INIT) {
    xball = 200;
    yball = 620;
  }
}
button0.onclick = (ev) => {
  estado = ESTADO.PLAY;
}
button1.onclick = (ev) => {
    xtable = xtable - 20;
}
button2.onclick = (ev) => {
    xtable = xtable + 20;
}
update();