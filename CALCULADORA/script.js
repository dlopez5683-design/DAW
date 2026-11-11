//Pantalla de reusltados
const pantalla = document.getElementById("resultado");

//botones numericos
const botonesNumericos = document.querySelectorAll("[data-numero]");

//Almacenar el numero ingresado 
let numeroActual = "0";

//Variables para operaciones
let numeroAnterior = null;
let operadorActual = null;
let iniciarNuevoNumero = false;

//Mostrar numeros en pantalla
function agregarNumero(numero) {
    if (iniciarNuevoNumero) {

        numeroActual = numero;
        iniciarNuevoNumero = false;

    } else if (numeroActual === "0") {

        numeroActual = numero;

    } else {

        numeroActual += numero;
    }

    pantalla.textContent = numeroActual;
}

//Detectar los botones numericos
botonesNumericos.forEach(function(boton) {
    boton.addEventListener("click", function() {
        const numero =boton.dataset.numero;
        agregarNumero(numero);
    });
});

//Boton AC - Limpiar todo
const botonLimpiar = document.querySelector("[data-accion='limpiar']");

function limpiarPantalla() {
    numeroActual = "0";
    numeroAnterior = null;
    operadorActual = null;
    iniciarNuevoNumero = false;

    pantalla.textContent = "0";

    document.getElementById("operacion").innerHTML = "&nbsp;";
}

botonLimpiar.addEventListener("click", limpiarPantalla);

//Borrar el ultimo digito
const botonBorrar =document.querySelector("[data-accion='borrar']");

function borrarUltimo() {
    if (iniciarNuevoNumero) {
        return;
    }

    if (numeroActual.length > 1) {
        numeroActual = numeroActual.slice(0, -1);
    } else {
        numeroActual = "0";
    }

    if (numeroActual === "-") {
        numeroActual = "0";
    }

    pantalla.textContent = numeroActual;
}

botonBorrar.addEventListener("click", borrarUltimo);

//Agregar punto decimal
const botonDecimal = document.querySelector("[data-accion='decimal']");

function agregarDecimal() {
    if (iniciarNuevoNumero) {
        numeroActual = "0";
        iniciarNuevoNumero = false;
    }

    if (!numeroActual.includes(".")) {
        numeroActual += ".";
    }

    pantalla.textContent = numeroActual;
}

botonDecimal.addEventListener("click", agregarDecimal);

//Identificar operadores
const botonesOperadores = document.querySelectorAll(
    '[data-operador="sumar"], ' +
    '[data-operador="restar"], ' +
    '[data-operador="multiplicar"], ' +
    '[data-operador="dividir"], ' +
    '[data-operador="potencia"]'
);

//Seleccionar operacion
function seleccionarOperador(operador) {

    numeroAnterior = Number(numeroActual);

    operadorActual = operador;

    iniciarNuevoNumero = true;

    document.getElementById("operacion").textContent =
        numeroAnterior + " " + obtenerSimbolo(operador);
}

//Simbolos matematicos

function obtenerSimbolo(operador) {

    switch (operador) {

        case "sumar":
            return "+";

        case "restar":
            return "−";

        case "multiplicar":
            return "×";

        case "dividir":
            return "÷";
        
        case "potencia":
            return "^";

        default:
            return "";
    }
}

//Eventos de operaciones
botonesOperadores.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const operador = boton.dataset.operador;

        seleccionarOperador(operador);

    });

});

//Realizar operaciones
function realizarOperacion(a, b, operador) {

    switch (operador) {

        case "sumar":
            return a + b;

        case "restar":
            return a - b;

        case "multiplicar":
            return a * b;

        case "dividir":

            if (b === 0) {
                return "Error";
            }

            return a / b;

        case "potencia":
            return Math.pow(a, b);

        default:
            return "Error";
    }
}

//Boton igual

const botonIgual = document.querySelector(
    '[data-accion="calcular"]'
);

function calcularResultado() {

    if (operadorActual === null ||
        numeroAnterior === null) {
        return;
    }

    const segundoNumero = Number(numeroActual);

    const resultado = realizarOperacion(
        numeroAnterior,
        segundoNumero,
        operadorActual
    );

    if (resultado === "Error" ||
        !Number.isFinite(resultado)) {

        pantalla.textContent = "Error";
        numeroActual = "0";

    } else {

        numeroActual = String(resultado);
        pantalla.textContent = numeroActual;
    }

    document.getElementById("operacion").textContent = "";

    numeroAnterior = null;
    operadorActual = null;
    iniciarNuevoNumero = true;
}

botonIgual.addEventListener("click", calcularResultado);

//Identificar el boton porcentaje */

const botonPorcentaje = document.querySelector(
    '[data-operador="porcentaje"]'
);
function calcularPorcentaje() {

    const porcentaje = Number(numeroActual) / 100;
if (
        numeroAnterior !== null &&
        (operadorActual === "sumar" ||
         operadorActual === "restar")
    ) {

        numeroActual = String(
            numeroAnterior * porcentaje
        );

    } else {

        numeroActual = String(porcentaje);

    }

    pantalla.textContent = numeroActual;

    iniciarNuevoNumero = false;
}

//Evento del boton porcentaje

botonPorcentaje.addEventListener(
    "click",
    calcularPorcentaje
);