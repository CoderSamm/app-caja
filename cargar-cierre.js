

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
    }
})

