import { actualizarResumen } from "./resumen.js";

//acumuladores
export let saldoInicial = 0;
export let ventasAcumuladas = 0;
export let ventasEfectivoAcumuladas = 0;
export let ventasTransferenciasAcumuladas = 0;
export let ventasCreditosAcumuladas = 0;

//registros completos de ventas
export let ventas = [];


//saldo inicial



const inputSaldoInicial = document.getElementById('input-saldo-inicial');

inputSaldoInicial.addEventListener('input', ()=> {
    saldoInicial = Number(inputSaldoInicial.value);
    actualizarResumen();
})

//identificar donde esta el consecutivo de la remision
const consecutivo = document.getElementById('consecutivo');

//identificar tabla para ventas

const tbodyVentas = document.getElementById('tbody-ventas');
const tablaTotalVentas = document.getElementById('tabla-total-ventas');

//totales
const totalVentas = document.getElementById('resumen-total-ventas');
const totalEfectivo = document.getElementById('resumen-total-efectivo');
const totalTransferencia = document.getElementById('resumen-total-transferencias');
const totalCreditos = document.getElementById('resumen-total-credito');

//boton-agregar-venta
const botonAgregarVenta = document.getElementById('btn-agregar-venta');
botonAgregarVenta.addEventListener('click', agregarVenta);

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

        const formaPagoAnterior = fila.children[3].textContent
        fila.dataset.formaPagoAnterior = formaPagoAnterior

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
        const selectPago = document.createElement('select')

        //Aquí estamos creando un arreglo que contiene todas las opciones que queremos mostrar en el selector.    
        const opciones = [
            'Efectivo',
            'Transferencia',
            'Credito'
        ]    

        //forEach recorre el arreglo una por una.

        opciones.forEach(opcion =>{
            //Creamos una etiqueta HTML todavía vacía
            const option = document.createElement('option') 
            option.value = opcion;
            option.textContent = opcion

            if(opcion === celdaPago.textContent){
                option.selected = true;
            }

            selectPago.appendChild(option);
        })

        //Esas dos líneas son las que reemplazan el texto por el selector.
        celdaPago.textContent = '';
        celdaPago.appendChild(selectPago);


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

           //Forma de pago

           
            const selectPago = fila.children[3].querySelector('select');
            fila.children[3].textContent = selectPago.value;
            const formaPagoAnterior = fila.dataset.formaPagoAnterior;
            const formaPagoNueva = selectPago.value;

            //efectivo / transferencias

            if(formaPagoAnterior === 'Efectivo' && formaPagoNueva === 'Efectivo'){
                ventasEfectivoAcumuladas = ventasEfectivoAcumuladas - valorAnterior + valorNuevo
                
            }else if(formaPagoAnterior === 'Transferencia' && formaPagoNueva === 'Transferencia'){
                ventasTransferenciasAcumuladas = ventasTransferenciasAcumuladas - valorAnterior + valorNuevo

            }else if(formaPagoAnterior ==='Efectivo' && formaPagoNueva === 'Transferencia'){
                ventasEfectivoAcumuladas -= valorAnterior;
                ventasTransferenciasAcumuladas += valorNuevo
            }else if(formaPagoAnterior === 'Transferencia' && formaPagoNueva == 'Efectivo'){
                ventasTransferenciasAcumuladas -= valorAnterior
                ventasEfectivoAcumuladas += valorNuevo
            }
            //ventas credito
            else if(formaPagoAnterior === 'Credito' && formaPagoNueva === 'Credito'){
                ventasCreditosAcumuladas = ventasCreditosAcumuladas - valorAnterior + valorNuevo
                
            }else if(formaPagoAnterior ==='Credito' && formaPagoNueva === 'Transferencia'){
                ventasCreditosAcumuladas -= valorAnterior;
                ventasTransferenciasAcumuladas += valorNuevo


               //ojo aca 
            }else if(formaPagoAnterior ==='Credito' && formaPagoNueva === 'Efectivo'){
                ventasCreditosAcumuladas -= valorAnterior;
                ventasEfectivoAcumuladas += valorNuevo;

            }else if(formaPagoAnterior ==='Efectivo' && formaPagoNueva === 'Credito'){
                ventasEfectivoAcumuladas -= valorAnterior;
                ventasCreditosAcumuladas += valorNuevo;



            }else if(formaPagoAnterior === 'Transferencia' && formaPagoNueva == 'Credito'){
                ventasTransferenciasAcumuladas -= valorAnterior
                ventasCreditosAcumuladas += valorNuevo
            }

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


        if (formaPago === 'Efectivo') {
            ventasEfectivoAcumuladas -= valorActual
        }
        else if (formaPago === 'Transferencia') {
           ventasTransferenciasAcumuladas -= valorActual
        }
        else if (formaPago === 'Credito') {
            ventasCreditosAcumuladas -= valorActual
        }

        ventasAcumuladas -= valorActual
        tablaTotalVentas.textContent = `$${ventasAcumuladas}` 

        actualizarResumen();
        fila.remove() //elimina toda la fila completa
    }

    //asignamos valores
    ventasAcumuladas += totalRemision;

    if (formaPago === 'Efectivo') {
    ventasEfectivoAcumuladas += totalRemision;
    } else if(formaPago === 'Transferencia'){
        ventasTransferenciasAcumuladas += totalRemision
    }else if(formaPago === 'Credito'){
        ventasCreditosAcumuladas += totalRemision
    }


    
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

    const nuevaVenta = {
        remision,
        detalle,
        totalRemision,
        formaPago,
        cliente
    };

    ventas.push(nuevaVenta);
    console.log(ventas)

    //Limpiar inputs
    document.getElementById('input-remision').value = '';
    document.getElementById('input-detalle').value = '';
    document.getElementById('input-total-remision').value = '';
    document.getElementById('forma-pago').value = 'Seleccione';
    document.getElementById('input-cliente').value = '';
}





