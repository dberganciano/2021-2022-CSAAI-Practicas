console.log("Ejecutando JS...");

//Elementos de la interfaz fuera de clases
display = document.getElementById("display")
clear = document.getElementById("clear")
igual = document.getElementById("igual")
clearlast = document.getElementById("clearlast")
coma = document.getElementById("coma")

//Elementos de la interfaz dentro de clases
digits = document.getElementsByClassName("digit")
operations = document.getElementsByClassName("operator")

//Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3
}

//Por defecto el estado inicial de la calculadora
let estado = ESTADO.INIT;

//Funcion retrollamada de estado de los digitos
function digito(ev) {
    if (estado == ESTADO.INIT) {
        display.innerHTML = boton;
        estado = ESTADO.OP1
    } else if (estado == ESTADO.OP1) {
        display.innerHTML += boton;
    } else if (estado == ESTADO.OPERATION) {
        display.innerHTML += boton;
        estado = ESTADO.OP2;
    } else if (estado == ESTADO.OP2) {
        display.innerHTML += boton;
    }
}

//Funcion retrollamada de estado de los operadores
function operador(ev) {
    if (estado != ESTADO.OPERATION) {
        display.innerHTML = operations;
        estado = ESTADO.OPERATION;
    }
}

//Funcion de retrollamada para los digitos
for (let boton of digits) {
    boton.onclick = (ev) => {
        display.innerHTML += ev.target.value;
        console.log("digit");
    }
}

//Funcion de retrollamada para las operaciones
for (let boton of operations) {
    boton.onclick = (ev) => {
        display.innerHTML += ev.target.value;
        console.log("operation");
    }
}

//Resto de funciones de retrollamada

//Poner a 0 la expresion
clear.onclick = () => {
    display.innerHTML = "0";
    estado = ESTADO.INIT;
}

//Evaluar la expresion
igual.onclick = () => {
    display.innerHTML = eval(display.innerHTML);
}

//Eliminar el ultimo elemento
clearlast.onclick = () => {
    display.innerHTML = display.innerHTML.slice(0,-1);
}

//Crear un digito con coma
coma.onclick = () => {
    if (estado == ESTADO.OP1 || estado == ESTADO.OP2 || estado == ESTADO.INIT) {
    display.innerHTML = coma.innerHTML;
    estado = ESTADO.OPERATION
    }
}