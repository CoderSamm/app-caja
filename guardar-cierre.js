import {
    ventas,
    saldoInicial,
    ventasAcumuladas,
    ventasEfectivoAcumuladas,
    ventasTransferenciasAcumuladas,
    ventasCreditosAcumuladas
} from "./ventas.js"

import {
    gastos,
    gastosAcumulados
} from "./gastos.js"

import{
    entregas,
    entregasAcumuladas
} from "./entregas.js"



//conectamos el boton

const botonGuardarCierre = document.getElementById('btn-guardar-cierre')
botonGuardarCierre.addEventListener('click',
    guardarCierre
)

function guardarCierre(){

    console.log('Guardando cierre')

    const fecha = document.getElementById('fecha').value;
    const responsableApertura = document.getElementById('nombre-responsable').value;
    const responsableCierre = document.getElementById('responsable-cierre').value;
    const observaciones = document.getElementById('observaciones').value;

    const cierreCaja = {

        fecha,
        responsableApertura,
        responsableCierre,
        observaciones,

        saldoInicial,
        ventas,
        gastos,
        entregas
    }

    const historialCierres = JSON.parse( 
        localStorage.getItem('historialCierres')
    ) || [];

    historialCierres.push(cierreCaja);
   

    localStorage.setItem('historialCierres',
        JSON.stringify(historialCierres)
    );

    console.log(historialCierres);
}


