//consecutivo remision

const consecutivo = document.getElementById('consecutivo')

//tablas

//tabla para ventas
const tbodyVentas = document.getElementById('tbody-ventas');

//tabla total ventas
const tablaTotalVentas = document.getElementById('tabla-total-ventas');

//tabla para gastos
const tbodyGastos = document.getElementById('tbody-gastos');
const tablaTotalGastos = document.getElementById('tabla-total-gastos');

// const tbodyEntregas = document.getElementById('tbody-entregas');
// const tablaTotalEntregas = document.getElementById('tabla-total-entregas');

//Resumen

//totales
const totalVentas = document.getElementById('resumen-total-ventas');
const totalEfectivo = document.getElementById('resumen-total-efectivo');
const totalTransferencia = document.getElementById('resumen-total-transferencias');
const totalGastos = document.getElementById('resumen-total-gastos');
const totalEntregas = document.getElementById('resumen-total-entregas');
const saldoFinal = document.getElementById('resumen-saldo-final');

//boton agregar ventas
const botonAgregarVenta = document.getElementById('btn-agregar-venta')
botonAgregarVenta.addEventListener('click', agregarVenta)

//boton agregar gastos
const botonAgregarGasto = document.getElementById('btn-agregar-gasto');
botonAgregarGasto.addEventListener('click', agregarGasto);

//acumuladores


let saldoInicial = 0;
let ventasAcumuladas = 0;
let ventasEfectivoAcumuladas = 0;
let ventasTransferenciasAcumuladas = 0;



let gastosAcumulados = 0;
let entregasAcumuladas = 0;
let saldoFinalCalculado = 0;





//funcion para agregar venta

function agregarVenta(){

    const remision = document.getElementById('input-remision').value;
    const detalle = document.getElementById('input-detalle').value
    const totalRemision = Number(document.getElementById('input-total-remision').value)
    const formaPago = document.getElementById('forma-pago').value
    const cliente = document.getElementById('input-cliente').value

    //creamos las filas (tr) y celdas (td)

    const fila = document.createElement('tr')

    const celdaRemision = document.createElement('td');
    const celdaDetalle = document.createElement('td');
    const celdaTotal = document.createElement('td');
    const celdaFormaPago = document.createElement('td');
    const celdaCliente = document.createElement('td');

    const celdaAcciones = document.createElement('td');

    //Boton editar
    const botonEditar = document.createElement('button');
    botonEditar.addEventListener('click', editar);



    function editar(){


        
       let valorAnterior = Number(celdaTotal.textContent);          
 
        if(botonEditar.textContent === 'Editar'){

        valorAnterior = Number(fila.children[2].textContent);
        fila.dataset.valorAnterior = valorAnterior

        //toma la primera celda
        const celdaConsecutivo = fila.children[0]
        //creamos un input
        const inputConsecutivo = document.createElement('input');
        inputConsecutivo.value = celdaConsecutivo.textContent
        //vaciamos el valor actual
        celdaConsecutivo.textContent = '';
        celdaConsecutivo.appendChild(inputConsecutivo)

        //hacemos lo mismo con el resto de celdas

        //Detalle
        const celdaDetalle = fila.children[1];
        const inputDetalle = document.createElement('input')
        inputDetalle.value = celdaDetalle.textContent;
        celdaDetalle.textContent = '';
        celdaDetalle.appendChild(inputDetalle);

        //Valor Total
        const celdaTotal = fila.children[2];
        const inputTotal = document.createElement('input')
        inputTotal.value = celdaTotal.textContent;
        celdaTotal.textContent = '';
        celdaTotal.appendChild(inputTotal);

        

        //Forma de Pago
        const celdaPago = fila.children[3];
        const inputPago = document.createElement('input')
        inputPago.value = celdaPago.textContent;
        celdaPago.textContent = '';
        celdaPago.appendChild(inputPago);

        //Cliente
        const celdaCliente = fila.children[4];
        const inputCliente = document.createElement('input')
        inputCliente.value = celdaCliente.textContent;
        celdaCliente.textContent = '';
        celdaCliente.appendChild(inputCliente);

        //Cambiamos el texto boton editar a guardar

        botonEditar.textContent = 'Guardar'

        }else{
            const inputConsecutivo = fila.children[0].querySelector('input');
            fila.children[0].textContent = inputConsecutivo.value;

            const inputDetalle = fila.children[1].querySelector('input');
            fila.children[1].textContent = inputDetalle.value;

            //edicion del valor total
            const valorAnterior = Number(fila.dataset.valorAnterior)
            const inputTotal = fila.children[2].querySelector('input');
            const valorNuevo = Number(inputTotal.value);
            fila.children[2].textContent = valorNuevo;
            ventasAcumuladas = ventasAcumuladas - valorAnterior + valorNuevo;
            tablaTotalVentas.textContent = `$${ventasAcumuladas}`

           

            const inputPago = fila.children[3].querySelector('input');
            fila.children[3].textContent = inputPago.value;

            const inputCliente = fila.children[4].querySelector('input');
            fila.children[4].textContent = inputCliente.value;

            actualizarResumen()
            botonEditar.textContent = 'Editar'
        }
    }


    //Boton eliminar
    const botonEliminar = document.createElement('button');
    botonEliminar.addEventListener('click', eliminar);

    
    function eliminar(){
        
        const valorActual = Number(fila.children[2].textContent);
        const formaPago = fila.children[3].textContent;
        console.log("Valor original:", totalRemision);
        console.log("Valor en tabla:", fila.children[2].textContent);

        if(formaPago === 'Efectivo'){
            ventasEfectivoAcumuladas -= valorActual
        }else if(formaPago === 'Transferencia'){
            ventasTransferenciasAcumuladas -= valorActual
        }

        ventasAcumuladas -= valorActual
        tablaTotalVentas.textContent = `$${ventasAcumuladas}` 

        actualizarResumen();
        fila.remove() //elimina toda la fila completa
    }

    //asignamos valores
    ventasAcumuladas += totalRemision;
    actualizarResumen();

    tablaTotalVentas.textContent = `$${ventasAcumuladas}`;
    celdaRemision.textContent = remision
    celdaDetalle.textContent = detalle
    celdaTotal.textContent = totalRemision
    celdaFormaPago.textContent = formaPago
    celdaCliente.textContent = cliente

    botonEditar.textContent = 'Editar'
    botonEliminar.textContent = 'Eliminar';

    //agregar las celdas a la fila

    fila.appendChild(celdaRemision)
    fila.appendChild(celdaDetalle)
    fila.appendChild(celdaTotal)
    fila.appendChild(celdaFormaPago)
    fila.appendChild(celdaCliente)

    //agregamos el boton etirar y eliminar en acciones 
    celdaAcciones.appendChild(botonEditar);
    celdaAcciones.appendChild(botonEliminar);

  
    fila.appendChild(celdaAcciones)

    //finalmente tomamos el tbodyVentas appendchild para agregar todos los valores

    tbodyVentas.appendChild(fila);


    actualizarResumen();

    //Limpiar campos
    document.getElementById('input-remision').value = '';
    document.getElementById('input-detalle').value = '';
    document.getElementById('input-total-remision').value = '';
    document.getElementById('forma-pago').value = 'Seleccione';
    document.getElementById('input-cliente').value = '';
}

function agregarGasto(){
    const gastoNumero = document.getElementById('input-gasto-numero').value;
    const detalleGasto = document.getElementById('input-detalle-gasto').value
    const totalGasto = Number(document.getElementById('input-total-gasto').value)
    const formaPagoGasto = document.getElementById('forma-pago-gasto').value
    const proveedor = document.getElementById('input-proveedor').value
    const nombreReceptor = document.getElementById('input-nombre-receptor').value

    //creamos las filas (tr) y celdas (td)
    const filaGasto = document.createElement('tr');

    const celdaGastoNumero = document.createElement('td')
    const celdaDetalleGasto = document.createElement('td')
    const celdaTotalGasto = document.createElement('td')
    const celdaFormaPagoGasto = document.createElement('td')
    const celdaProveedor= document.createElement('td')
    const celdaNombreReceptor = document.createElement('td')
    const celdaAccionesGasto = document.createElement('td')

    //Boton editar gasto
    const botonEditarGasto = document.createElement('button');
    botonEditarGasto.textContent = 'Editar';
    botonEditarGasto.addEventListener('click', editarGasto);
    
    function editarGasto(){

        let valorAnteriorGasto = Number(celdaTotalGasto.textContent)

        if(botonEditarGasto.textContent === 'Editar'){

            valorAnteriorGasto = Number(filaGasto.children[2].textContent);
            filaGasto.dataset.valorAnteriorGasto = valorAnteriorGasto

            //Valor Total
            const celdaTotalGasto = filaGasto.children[2];
            const inputTotalGasto = document.createElement('input')
            inputTotalGasto.value = celdaTotalGasto.textContent;
            celdaTotalGasto.textContent = '';
            celdaTotalGasto.appendChild(inputTotalGasto);

            botonEditarGasto.textContent = 'Guardar';

        }else{

            //edicion del valor total
            const valorAnteriorGasto = Number(filaGasto.dataset.valorAnteriorGasto)

            const inputTotalGasto = filaGasto.children[2].querySelector('input');
            const valorNuevoGasto = Number(inputTotalGasto.value);
            filaGasto.children[2].textContent = valorNuevoGasto;

            //resultado del total de gastos editados
            gastosAcumulados = gastosAcumulados - valorAnteriorGasto + valorNuevoGasto;

            tablaTotalGastos.textContent = `$${gastosAcumulados}`

        }

    }

    celdaAccionesGasto.appendChild(botonEditarGasto);

    gastosAcumulados += totalGasto
    actualizarResumen()


    tablaTotalGastos.textContent = `$${gastosAcumulados}`; 

    celdaGastoNumero.textContent = gastoNumero
    celdaDetalleGasto.textContent = detalleGasto
    celdaTotalGasto.textContent = totalGasto
    celdaFormaPagoGasto.textContent = formaPagoGasto
    celdaProveedor.textContent = proveedor
    celdaNombreReceptor.textContent = nombreReceptor

    botonEditarGasto.textContent = 'Editar'




    filaGasto.appendChild(celdaGastoNumero)
    filaGasto.appendChild(celdaDetalleGasto)
    filaGasto.appendChild(celdaTotalGasto)
    filaGasto.appendChild(celdaFormaPagoGasto)
    filaGasto.appendChild(celdaProveedor)
    filaGasto.appendChild(celdaNombreReceptor)
    filaGasto.appendChild(celdaAccionesGasto)

    tbodyGastos.appendChild(filaGasto);

    //Limpiar campos
    document.getElementById('input-gasto-numero').value = '';
    document.getElementById('input-detalle-gasto').value = '';
    document.getElementById('input-total-gasto').value = '';
    document.getElementById('forma-pago-gasto').value = 'Seleccione';
    document.getElementById('input-proveedor').value = '';
    document.getElementById('input-nombre-receptor').value = '';
}
//funcion para actualizar resumen

function actualizarResumen(){
    saldoInicial = Number(document.getElementById('input-saldo-inicial').value) || 0
    totalVentas.textContent = `$${ventasAcumuladas}`
    totalEfectivo.textContent = `$${ventasEfectivoAcumuladas}`
    totalTransferencia.textContent = `$${ventasTransferenciasAcumuladas}`
    totalGastos.textContent = `$${gastosAcumulados}`
    totalEntregas.textContent = `$${entregasAcumuladas}`
   
    saldoFinalCalculado = saldoInicial + ventasEfectivoAcumuladas - gastosAcumulados - entregasAcumuladas
    saldoFinal.textContent = `$${saldoFinalCalculado}`
}


