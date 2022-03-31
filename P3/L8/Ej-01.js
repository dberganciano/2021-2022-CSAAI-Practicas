console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

// Definimos el tamaño del canvas
canvas.width = 400;
canvas.height = 700;

// Obtenemos el contexto del canvas
const ctx = canvas.getContext("2d");

// Definimos la pelota
ctx.beginPath();
    ctx.arc(200, 650, 10, 0, 2 * Math.PI);
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'white';

    ctx.stroke()
    ctx.fill()
    
ctx.closePath()

// Definimos la raqueta
ctx.beginPath();
  ctx.rect(160,670, 80, 20);
  ctx.fillStyle = 'white';

  ctx.fill();
  ctx.stroke();

ctx.closePath();

//Definimos los valores de los ladrillos
const LADRILLO = {
    F: 5,  // Filas
    C: 9,  // Columnas
    w: 40,
    h: 20,
    origen_x: 5,
    origen_y: 5,
    padding: 5,
    visible: true
};

// Estructura de los ladrillos
const ladrillos = [];

for (let i = 0; i < LADRILLO.F; i++) {
    ladrillos[i] = [];
    for (let j = 0; j < LADRILLO.C; j++) {
      ladrillos[i][j] = {
          x: (LADRILLO.w + LADRILLO.padding) * j,
          y: (LADRILLO.h + LADRILLO.padding) * i,
          w: LADRILLO.w,
          h: LADRILLO.h,
          padding: LADRILLO.padding,
          visible: LADRILLO.visible
        };
    }
}

// Dibujar ladrillos
for (let i = 0; i < LADRILLO.F; i++) {
    for (let j = 0; j < LADRILLO.C; j++) {
      if (ladrillos[i][j].visible) {
        ctx.beginPath();
        ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
      }
    }
}

// Vidas
ctx.font = "20px Arial";
ctx.fillStyle = 'yellow'
ctx.fillText("Vidas: 3", 10, 30);

// Puntos
ctx.font = "20px Arial";
ctx.fillStyle = 'yellow'
ctx.fillText("Puntos: 0", 300, 30);