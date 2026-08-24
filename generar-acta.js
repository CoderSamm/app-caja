console.log("generar-acta cargado");


import {
    saldoInicial,
    ventasAcumuladas,
    ventasEfectivoAcumuladas,
    ventasTransferenciasAcumuladas,
    ventasCreditosAcumuladas,
    ventas
} from "./ventas.js";

import {
    gastosAcumulados,
    gastos
} from "./gastos.js";

import {
    entregasAcumuladas,
    entregas
} from "./entregas.js";


//Conectamos el Boton generar acta
const botonGenerarActa = document.getElementById('btn-generar-acta');
botonGenerarActa.addEventListener('click', generarActa);
console.log(botonGenerarActa);
console.log('CLICK FUNCIONA');

function generarActa() {


    //probando que aparezca el saldo inicial

    const saldoInicialFormulario = Number(
        document.getElementById('input-saldo-inicial').value
    );

    console.log(
        "SALDO FORMULARIO:",
        saldoInicialFormulario
    );

    console.log("PASO 1");

    // const consecutivo = document.getElementById('consecutivo').textContent;

    // console.log("PASO 2", consecutivo);

    const fecha = document.getElementById('fecha').value;
    console.log("PASO 3", fecha);
    const responsableApertura = document.getElementById('nombre-responsable').value;
    console.log("PASO 4", responsableApertura);
    const responsableCierre = document.getElementById('responsable-cierre').value;
    console.log("PASO 5", responsableCierre);
    const observaciones =  document.getElementById('observaciones').value;
    console.log("PASO 6", observaciones);


    const cierreCaja = {

        // consecutivo,
        fecha,

        responsableApertura,
        responsableCierre,
        observaciones,

        saldoInicial: saldoInicialFormulario, //la variable que importamos saldoInicial y la variable que creamos aqui dentro: saldoInicialFormulario

        ventasAcumuladas,
        ventasEfectivoAcumuladas,
        ventasTransferenciasAcumuladas,
        ventasCreditosAcumuladas,

        gastosAcumulados,
        entregasAcumuladas,

        ventas,
        gastos,
        entregas
    };

    localStorage.setItem(
        "CierreCaja",
        JSON.stringify(cierreCaja)
    );

    window.open(
        "./reportes/acta-cierre.html",
        "_blank"
    );
}
