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
var points = 0;

// Definimos las velocidades del objeto
let velx = 5;
let vely = -3;

// Definimos las posiciones y tamaño de los ladrillos
let xinit = 0;
let yinit = 40;
let xincrement = 45;
let yincrement = 40 ;
let rows = 5;
let columns = 9;
var arraybricks = new Array(rows*columns);
let b = 0;
let heightBrick = 20;
let widthBrick = 40;

for (i = 0; i < rows; i++){
    for(j = 0; j < columns; j++){
        var bricks = {
            x : xinit + j * xincrement,
            y : yinit + i * yincrement,
            estado : 1,
        };
        arraybricks[b] = bricks; 
        b = b + 1;
    }
}

// Definimos los colores de las filas de los ladrillos
for (b = 36; b < 45; b++){   
    arraybricks[b].color = "rgb(218, 247, 166)"; 
  }
  for (b = 27; b < 36; b++){   
    arraybricks[b].color = "rgb(255, 195, 0)"; 
  }
  for (b = 18; b < 27; b++){   
    arraybricks[b].color = "rgb(255, 87, 51)"; 
  }
  for (b = 9; b < 18; b++){   
    arraybricks[b].color = "rgb(144, 12, 63)"; 
  }
  for (b = 0; b < 9; b++){   
    arraybricks[b].color = "rgb(88, 24, 69)"; 
}

// Definimos los sonidos
const rebound_raquet = new Audio('P3_L9_pong-raqueta.mp3');
const rebound_wall = new Audio('P3_L9_pong-rebote.mp3');
const win_audio = new Audio('P3_L9_pong-tanto.mp3');

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

// Definimos los ladrillos
function drawBricks(){
    for (b = 0; b < rows*columns; b++){
        if (arraybricks[b].estado == 1){
            ctx.beginPath();
                ctx.rect(arraybricks[b].x,arraybricks[b].y,widthBrick,heightBrick);
                ctx.fillStyle = arraybricks[b].color;
                ctx.strokeStyle = 'white';
                ctx.setLineDash([]); //continua
                ctx.fill();
                ctx.stroke()
            ctx.closePath();
        }
    }
}

// Definimos las vidas
function drawLife() {
    ctx.font = "20px Times New Roman";
    ctx.fillStyle = 'white'
    ctx.fillText("Vidas: ", 315, 30);
    ctx.fillText(lifes, 370, 30);
}

// Definimos los puntos
function drawPoints() {
    ctx.font = "20px Times New Roman";
    ctx.fillStyle = 'white'
    ctx.fillText("Puntos: ", 10, 30);
    ctx.fillText(points, 75, 30);
}

// Definimos el gameover
function gameover() {
  if (estado == ESTADO.END) {
    estado = ESTADO.INIT;
    lifes = 3;
    points = 0;
    for (b = 0; b < 9; b++){
      arraybricks[b].estado = 1;
      arraybricks[b].color = "rgb(88, 24, 69)"; 
    }
    for (b = 9; b < 18; b++){
      arraybricks[b].estado = 1;
      arraybricks[b].color = "rgb(144, 12, 63)";
       
    }
    for (b = 18; b < 27; b++){
      arraybricks[b].estado = 1;
      arraybricks[b].color = "rgb(255, 87, 51)"; 
    }
    for (b = 27; b < 36; b++){
      arraybricks[b].estado = 1;
      arraybricks[b].color = "rgb(255, 195, 0)";
    }
    for (b = 36; b < 45; b++){
      arraybricks[b].estado = 1;
      arraybricks[b].color = "rgb(218, 247, 166)";
    }
  }
}

// Definimos la victoria
function win(){
  found = false;
  b = 0;
  while (found == false && b < rows*columns){
    if(arraybricks[b].estado == 1) {
      found = true;
    }
    b = b + 1;
  }
  if (found == false){
    for (b = 0; b < columns*rows; b++){
      arraybricks[b].estado = 1
    }
  estado = ESTADO.WIN;
  win_audio.play();
  }
}

// Función principal de animación
function update() {
  if (estado == ESTADO.PLAY) {
    if (xball < 20 || xball >= (canvas.width - 20) ) {
      velx = -velx;
      rebound_wall.play();
    }

    if (yball <= 20 || yball > (canvas.height - 20) ) {
      vely = -vely;
      rebound_wall.play();
    }

    // Actualizar la posición
    xball = xball + velx;
    yball = yball + vely;

    // Rebote de la raqueta
    if (xball >= xtable - 10 && xball <= (xtable + 90) && yball >= (ytable - 10) && yball <= (ytable + 30 - 10)) {
        vely = vely * -1;
        rebound_raquet.play();
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

    // Rebote en los lalilios
    for (var b in arraybricks){
        bricks = arraybricks[b];
        if (xball >= bricks.x && xball <=(bricks.x + widthBrick + 10) 
            && yball >= (bricks.y) && yball <=(bricks.y + heightBrick + 10) 
            && bricks.estado == 1){
            bricks.estado = 0;
            vely = vely * -1;
            //ladrillo.play();
            if (bricks.color == "rgb(218, 247, 166)"){
              points = points + 1;
            }
            if (bricks.color == "rgb(255, 195, 0)"){
              points = points + 2;
            }
            if (bricks.color == "rgb(255, 87, 51)"){
              points = points + 3;
            }
            if (bricks.color == "rgb(144, 12, 63)"){
              points = points + 4;
            }
            if (bricks.color == "rgb(88, 24, 69)"){
              points = points + 5;
            }
        }
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
  drawBricks();
  drawLife();
  drawPoints();
  gameover();
  win();
  

  // 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
  if (estado == ESTADO.INIT) {
    xball = 200;
    yball = 620;
    if(vely > 0) {
      vely = -vely
    }
  }
  if(estado == ESTADO.WIN){
    estado = ESTADO.INIT;
  }
}

window.onkeydown = (e) => {
  switch(e.key) {
    case "a":
      xtable = xtable - 20;
      break;
    case "d":
      xtable = xtable + 20;
      break;
    case " ":
      estado = ESTADO.PLAY;
      break;
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