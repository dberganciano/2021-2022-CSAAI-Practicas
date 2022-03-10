console.log("Ejecutando JS...");

//Elementos fuera de clases
display = document.getElementById("display")
clear = document.getElementById("clear")
clearlast = document.getElementById("clearlast")
igual = document.getElementById("igual")

//Elementos dentro de clases
let digitos = document.getElementsByClassName("digit")
let operacion = document.getElementsByClassName("operation")

//Estados de la calculadora
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2_INIT: 3,
    OP2: 4
};

//Inicializamos el valor inical del estado
let estado = ESTADO.INIT;

//Bucle que lee las operaciones que le vamos metiendo
for(i=0; i<operacion.length; i++) {
    operation[i].onclick = (ev) =>{
        operaciones(ev.target.value);
        console.log(estado, "operacion");
    }
}

//Bucle que lee los digitos que le vamos metiendo
for(i=0; i<digitos.length; i++) {
    digitos[i].onclick = (ev) =>{
        digitos(ev.target.value);
        console.log(estado, "digito");
    }
}

//Tecla clearlast
clearlast.onclick = (ev) => {
    if (currentvalue == "On") {
        if(estado = ESTADO.OPERATION);
        display.innerHTML = display.innerHTML.slice(0,-1);
        console.log(estado,"clear last digit");
    }
}

//Tecla coma
coma.onclick = (ev) => {
    if(currentvalue == "On") {
        if(estado = ESTADO.OP1 || estado == ESTADO.OP2_INIT || estado == ESTADO.INIT); {
            display.innerHTML = display.innerHTML.slice(0,-1);
            console.log(estado,"coma")
        }
    }
}

//Tecla igual
igual.onclick = (ev) => {
    if(currentvalue == "On") {
        display.innerHTML == eval(display.innerHTML);
        console.log(estado, "igual");
    }
}

//Tecla clear
clear.onclick = (ev) => {
    if(currentvalue == "On") {
        display.innerHTML == "0";
        estado = ESTADO.INIT;
        console.log(estado, "set to 0")
    }
}

//Funcion de retrollamada de los digitos
function digito(boton) {
    if(currentvalue == "On") {
        if(estado == ESTADO.INIT) {
            display.innerHTML = boton;
            estado = ESTADO.OP1;
        } else if (estado == ESTADO.OP1) {
            display.innerHTML += boton;
        } else if (estado == ESTADO.OPERATION) {
            display.innerHTML += boton;
            estado = ESTADO.OP2_INIT;
        } else if (estado == ESTADO.OP2_INIT) {
            display.innerHTML += boton;
            estado = ESTADO.OP2;
        } else if (estado == ESTADO.OP2) {
            display.innerHTML += boton;
        }
    }
}

//Comprobacion de estado de las operaciones
function operaciones(operacion) {
    if(currentvalue == "On") {
        if (estado != ESTADO.OPERATION) {
            display.innerHTML += operacion;
            estado = ESTADO.OPERATION;
        }
    }
}