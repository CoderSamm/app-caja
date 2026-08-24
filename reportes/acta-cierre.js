//UTILIDADES

function formatoMoneda(valor){
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(valor)
}

//OBTENEMOS EL CIERRE

const cierre = JSON.parse(
    localStorage.getItem('CierreCaja')
);

console.log(cierre);

//LLENAR ENCABEZADO
document.getElementById('acta-consecutivo').textContent = cierre.consecutivo
document.getElementById('acta-fecha').textContent = cierre.fecha
document.getElementById('acta-responsable-apertura').textContent = cierre.responsableApertura;
document.getElementById('acta-saldo-inicial').textContent = cierre.saldoInicial

//LLENAR PIE DE PAGINA
document.getElementById('acta-responsable-cierre').textContent = cierre.responsableCierre;
document.getElementById('acta-observaciones').textContent = cierre.observaciones || "Sin observaciones"

//CARGAR VENTAS
const tbodyVentas = document.getElementById('acta-ventas');

cierre.ventas.forEach(venta => {
    tbodyVentas.innerHTML += 
 ` <tr>
        <td>${venta.remision}</td>
        <td>${venta.detalle}</td>
        <td class="moneda">${formatoMoneda(venta.totalRemision)}</td>
        <td>${venta.formaPago}</td>
        <td>${venta.cliente}</td>
    </tr>`;

})

//CARGAR GASTOS
const tbodyGastos = document.getElementById('acta-gastos');

cierre.gastos.forEach(gasto=> {
    tbodyGastos.innerHTML += 
    `<tr>
        <td>${gasto.gastoNumero}</td>
        <td>${gasto.detalleGasto}</td>
        <td class="moneda">${formatoMoneda(gasto.totalGasto)}</td>
        <td>${gasto.formaPagoGasto}</td>
        <td>${gasto.proveedor}</td>
        <td>${gasto.nombreReceptor}</td>
    </tr>`;
})

//CARGAR ENTREGAS

const tbodyEntregas = document.getElementById('acta-entregas');

cierre.entregas.forEach(entrega =>{
    tbodyEntregas.innerHTML += 
    `<tr>
        <td>${entrega.entregaNumero}</td>
        <td>${entrega.detalleEntrega}</td>
        <td class="moneda">${formatoMoneda(entrega.totalEntrega)}</td>
        <td>${entrega.aprobador}</td>
        <td>${entrega.receptor}</td>
        <td>${entrega.horaEntrega}</td>
    </tr>`
})

//CALCULAR RESUMEN


//totalizar
const totalVentas = cierre.ventas.reduce(
    (totalAcumuladoVentas, ventaActual) => totalAcumuladoVentas + ventaActual.totalRemision,
    0
);


//filtrar

const totalVentasEnEfectivo = cierre.ventas
    .filter(
        ventaActual => ventaActual.formaPago === "Efectivo"
    )
    .reduce(
        (totalAcumuladoEfectivo, ventaActual) =>
            totalAcumuladoEfectivo + ventaActual.totalRemision,
        0
    );

const totalVentasEnTransferencias = cierre.ventas
    .filter(
       ventaActual => ventaActual.formaPago === "Transferencia"
    )

    .reduce(
        (totalAcumuladoTransferencia, ventaActual) => totalAcumuladoTransferencia + ventaActual.totalRemision,
        0
    )
const totalVentasACredito = cierre.ventas
    .filter(
       ventaActual => ventaActual.formaPago === "Credito"
    )

    .reduce(
        (totalAcumuladoCredito, ventaActual) => totalAcumuladoCredito + ventaActual.totalRemision,
        0
    )


//totalizamos sin filtrar puesto que los gastos y las entregas se realizan en efectivo

const totalGastos = cierre.gastos.reduce(
    (totalAcumuladoGastos, gastoActual) => totalAcumuladoGastos + gastoActual.totalGasto,
    0
);
const totalEntregas = cierre.entregas.reduce(
    (totalAcumuladoEntregas, entregaActual) => totalAcumuladoEntregas + entregaActual.totalEntrega,
    0
);

const saldoFinal = cierre.saldoInicial + totalVentasEnEfectivo - totalGastos - totalEntregas;

//PINTAR EL RESUMEN O IMRIMIR RESUMEN EN HTML
document.getElementById("acta-total-ventas").textContent = formatoMoneda(totalVentas);
document.getElementById("acta-total-efectivo").textContent = formatoMoneda(totalVentasEnEfectivo);
document.getElementById("acta-total-transferencias").textContent = formatoMoneda(totalVentasEnTransferencias);
document.getElementById("acta-total-credito").textContent = formatoMoneda(totalVentasACredito);    
document.getElementById("acta-total-gastos").textContent =   formatoMoneda(totalGastos);
document.getElementById("acta-total-entregas").textContent = formatoMoneda(totalEntregas);
document.getElementById("acta-saldo-final").textContent =  formatoMoneda(saldoFinal);

//BOTONES GUARDAR E IMPRIMIR

const botonImprimir = document.getElementById('btn-imprimir');
const botonGuardar = document.getElementById('btn-guardar-pdf');

botonImprimir.addEventListener('click', ()=> {
    window.print();
});

botonGuardar.addEventListener('click', ()=> {
    window.print();
})