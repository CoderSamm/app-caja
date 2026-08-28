

document.addEventListener('DOMContentLoaded', ()=>{
    
    const cierreSeleccionado = JSON.parse(
        localStorage.getItem('CierreSeleccionado')
    );

   
    if(cierreSeleccionado){
        document.getElementById('fecha').value = cierreSeleccionado.fecha;
        document.getElementById('nombre-responsable').value = cierreSeleccionado.responsableApertura;
        document.getElementById('responsable-cierre').value = cierreSeleccionado.responsableCierre;
        document.getElementById('observaciones').value = cierreSeleccionado.observaciones;
        document.getElementById('input-saldo-inicial').value = cierreSeleccionado.saldoInicial;

        //agregamos las ventas

        const tbodyVentas = document.getElementById('tbody-ventas')
         
         cierreSeleccionado.ventas.forEach(venta => {
            tbodyVentas.innerHTML += `
                <tr>
                    <td>${venta.remision}</td>
                    <td>${venta.detalle}</td>
                    <td>${venta.totalRemision}</td>
                    <td>${venta.formaPago}</td>
                    <td>${venta.cliente}</td>
                </tr>
            `
        })


        const tbodyGastos = document.getElementById('tbody-gastos')

        cierreSeleccionado.gastos.forEach(gasto => {
            tbodyGastos.innerHTML += `
            
              <tr>
                    <td>${gasto.gastoNumero}</td>
                    <td>${gasto.detalleGasto}</td>
                    <td>${gasto.totalGasto}</td>
                    <td>${gasto.formaPagoGasto}</td>
                    <td>${gasto.proveedor}</td>
                    <td>${gasto.nombreReceptor}</td>
                </tr>
            
            `
        })

        const tbodyEntregas = document.getElementById('tbody-entregas')

        cierreSeleccionado.entregas.forEach(entrega => {
            tbodyEntregas.innerHTML += `
            
              <tr>
                    <td>${entrega.entregaNumero}</td>
                    <td>${entrega.detalleEntrega}</td>
                    <td>${entrega.totalEntrega}</td>
                    <td>${entrega.aprobador}</td>
                    <td>${entrega.receptor}</td>
                    <td>${entrega.horaEntrega}</td>
                </tr>
            
            `
        })

        //TOTALIZACIONES

        const totalVentas = cierreSeleccionado.ventas.reduce(
            (acumulado, venta) => acumulado + venta.totalRemision, 0
        );

        const totalGastos = cierreSeleccionado.gastos.reduce(
            (acumulado, gasto) => acumulado + gasto.totalGasto, 0
        );

        const totalEntregas = cierreSeleccionado.entregas.reduce(
            (acumulado, entrega) => acumulado + entrega.totalEntrega, 0
        );

        console.log(totalVentas);
        console.log(totalGastos);
        console.log(totalEntregas);

        //TOTALIZACIONES DE VENTAS EN EFECTIVO,VENTAS POR TRANSFERENCIAS Y VENTAS A CRÉDITO

        const totalVentasEfectivo = cierreSeleccionado.ventas.filter(
            venta => venta.formaPago === 'Efectivo'
        ).reduce(
            (acumulado, venta) => acumulado + venta.totalRemision,
            0
        );

        const totalVentasTransferencias = cierreSeleccionado.ventas.filter(
            venta => venta.formaPago === 'Transferencias'
        ).reduce(
            (acumulado, venta) => acumulado + venta.totalRemision,
            0
        );

        const totalVentasCredito = cierreSeleccionado.ventas.filter(
            venta => venta.formaPago === 'Credito'
        ).reduce(
            (acumulado, venta) => acumulado + venta.totalRemision,
            0
        );

        //SALDO FINAL

        const saldoFinal = cierreSeleccionado.saldoInicial + 
        totalVentasEfectivo - 
        totalGastos - 
        totalEntregas

        //Mostrar los resultados
        document.getElementById('resumen-saldo-inicial').textContent = `$${cierreSeleccionado.saldoInicial.toLocaleString('es-CO')}`
        document.getElementById('resumen-total-ventas').textContent = `$${totalVentas.toLocaleString('es-CO')}`
        document.getElementById('resumen-total-efectivo').textContent = `$${totalVentasEfectivo.toLocaleString('es-CO')}`
        document.getElementById('resumen-total-transferencias').textContent = `$${totalVentasTransferencias.toLocaleString('es-CO')}`
        document.getElementById('resumen-total-creditos').textContent = `$${totalVentasCredito.toLocaleString('es-CO')}`

        document.getElementById('resumen-total-gastos').textContent = `$${totalGastos.toLocaleString('es-CO')}`
        document.getElementById('resumen-total-entregas').textContent = `$${totalEntregas.toLocaleString('es-CO')}`

        document.getElementById('resumen-saldo-final').textContent = `$${saldoFinal.toLocaleString('es-CO')}`

    }

 
})

