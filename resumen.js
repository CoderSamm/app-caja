import {
    saldoInicial,
    ventasAcumuladas,
    ventasEfectivoAcumuladas,
    ventasTransferenciasAcumuladas,
    ventasCreditosAcumuladas
} from "./ventas.js";


import { gastosAcumulados } from "./gastos.js";
import { entregasAcumuladas } from "./entregas.js";



export function actualizarResumen(){

    console.log("saldoInicial:", saldoInicial);
    const saldoFinal =
    saldoInicial +
    ventasEfectivoAcumuladas -
    gastosAcumulados -
    entregasAcumuladas;

    document.getElementById('resumen-saldo-inicial').textContent = `$${saldoInicial}`;
    document.getElementById('resumen-total-ventas').textContent = `$${ventasAcumuladas}`;
    document.getElementById('resumen-total-efectivo').textContent = `$${ventasEfectivoAcumuladas}`;
    document.getElementById('resumen-total-transferencias').textContent = `$${ventasTransferenciasAcumuladas}`;
    document.getElementById('resumen-total-credito').textContent = `$${ventasCreditosAcumuladas}`;
    document.getElementById('resumen-total-gastos').textContent =`$${gastosAcumulados}`;
    document.getElementById('resumen-total-entregas').textContent = `$${entregasAcumuladas}`;
    document.getElementById('resumen-saldo-final').textContent = `$${saldoFinal.toLocaleString('es-CO')}`
}

//creamos y exportamos la función para calcular el saldo final

