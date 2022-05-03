console.log("Ejecutando JS....")

// Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

// Constante deslizadores colores
const desRed = document.getElementById('red');
const desGreen = document.getElementById('green');
const desBlue = document.getElementById('blue');

// Botones
const bColores = document.getElementById('colores');
const bGris = document.getElementById('grises');

// Valor del deslizador
const range_value_red = document.getElementById('range_red');
const range_value_green = document.getElementById('range_green');
const range_value_blue = document.getElementById('range_blue');

// Ocultar los deslizadores inicialmente
document.getElementById('sliders').style.display = 'none';

img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0,0);
  colores();
};

  function filtroColores(data) { 
    umbralRed = desRed.value
    umbralGreen = desGreen.value
    umbralBlue = desBlue.value

    for (var i = 0; i < data.length; i+=4) {
      if (data[i] > umbralRed) {
        data[i] = umbralRed;
      }
      if (data[i+1] > umbralGreen) {
        data[i+1] = umbralGreen;
      }
      if (data[i+2] > umbralBlue) {
        data[i+2] = umbralBlue;
      }
    }
  }

function colores() {
  ctx.drawImage(img, 0,0);

  desRed.oninput = () => {
    range_value_red.innerHTML = desRed.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    filtroColores(data);
    ctx.putImageData(imgData, 0, 0);
  }

  desGreen.oninput = () => {
    range_value_green.innerHTML = desGreen.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data
    filtroColores(data);
    ctx.putImageData(imgData, 0, 0);
  }

  desBlue.oninput = () => {
    range_value_blue.innerHTML = desBlue.value;
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    filtroColores(data);
    ctx.putImageData(imgData, 0, 0);
  }
}

bColores.onclick = () => {
    ctx.drawImage(img, 0,0);
    document.getElementById('sliders').style.display = 'block';
}

function grises(){
    var grises = 0;
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    for (var i = 0; i < data.length; i+=4) {
      grises = (3 * data[i] + 4 * data[i+1] + data[i+2])/8;
      data[i] = grises;
      data[i+1] = grises;
      data[i+2] = grises;
    }
    ctx.putImageData(imgData, 0, 0);
}

bGris.onclick = () => {
    document.getElementById('sliders').style.display = 'none';
    grises();
}

console.log("Fin...");