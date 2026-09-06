import { actualizarResumen } from "./resumen.js";


//acumuladores
export let gastosAcumulados = 0;
export let gastos = [];


const tbodyGastos = document.getElementById('tbody-gastos');
const tablaTotalGastos = document.getElementById('tabla-total-gastos');

//resumen de totales
const totalGastos = document.getElementById('resumen-total-gastos');

//boton agregar gastos
const botonAgregarGasto = document.getElementById('btn-agregar-gasto');
botonAgregarGasto.addEventListener('click', agregarGasto)

export function agregarGasto(){
    const gastoNumero = document.getElementById('input-gasto-numero').value
    const detalleGasto = document.getElementById('input-detalle-gasto').value
    const totalGasto = Number(document.getElementById('input-total-gasto').value)
    const formaPagoGasto = document.getElementById('forma-pago-gasto').value
    const proveedor = document.getElementById('input-proveedor').value;
    const nombreReceptor = document.getElementById('input-nombre-receptor').value

    const nuevoGasto = {
        gastoNumero,
        detalleGasto,
        totalGasto,
        formaPagoGasto,
        proveedor,
        nombreReceptor
    }

    gastos.push(nuevoGasto);
    console.log(gastos)

    //creamos las filas (tr) y celdas (td)

    const filaGasto = document.createElement('tr');
    const celdaGastoNumero = document.createElement('td');
    const celdaDetalleGasto = document.createElement('td');
    const celdaTotalGasto = document.createElement('td');
    const celdaFormaPagoGasto = document.createElement('td');
    const celdaProveedor = document.createElement('td');
    const celdaNombreReceptor = document.createElement('td');
    const celdaAccionesGasto = document.createElement('td');

    //boton editar gasto

    const botonEditarGasto = document.createElement('button');
    botonEditarGasto.textContent = 'Editar'

    botonEditarGasto.addEventListener('click', editarGasto)

    function editarGasto() {

        if (botonEditarGasto.textContent === 'Editar') {

            //GastoNumero - numero del gasto o consecutivo
            const celdaGastoNumero = filaGasto.children[0];
            const inputGastoNumero = document.createElement('input');
            inputGastoNumero.value = celdaGastoNumero.textContent
            celdaGastoNumero.textContent = ''
            celdaGastoNumero.appendChild(inputGastoNumero)
           
            //Detalle del gasto
            const celdaDetalleGasto = filaGasto.children[1];
            const inputDetalleGasto = document.createElement('input');
            inputDetalleGasto.value = celdaDetalleGasto.textContent
            celdaDetalleGasto.textContent = '';
            celdaDetalleGasto.appendChild(inputDetalleGasto);

            //editar total gasto
            const valorAnteriorGasto = Number(filaGasto.children[2].textContent);
            filaGasto.dataset.valorAnteriorGasto = valorAnteriorGasto;
            const celdaTotal = filaGasto.children[2];
            const inputTotalGasto = document.createElement('input');
            inputTotalGasto.type = 'number';
            inputTotalGasto.value = celdaTotal.textContent;
            celdaTotal.textContent = '';
            celdaTotal.appendChild(inputTotalGasto);



            //Forma de pago del gasto
            const celdaFormaPagoGasto = filaGasto.children[3];
            const inputFormaPagoGasto = document.createElement('input');
            inputFormaPagoGasto.value = celdaFormaPagoGasto.textContent
            celdaFormaPagoGasto.textContent = '';
            celdaFormaPagoGasto.appendChild(inputFormaPagoGasto);

            //Proveedor
            const celdaProveedor = filaGasto.children[4];
            const inputProveedor = document.createElement('input');
            inputProveedor.value = celdaProveedor.textContent
            celdaProveedor.textContent = '';
            celdaProveedor.appendChild(inputProveedor);

            //Receptor
            const celdaReceptor = filaGasto.children[5];
            const inputReceptor = document.createElement('input');
            inputReceptor.value = celdaReceptor.textContent
            celdaReceptor.textContent = '';
            celdaReceptor.appendChild(inputReceptor);

            botonEditarGasto.textContent = 'Guardar'


        } else {

            const inputGastoNumero = filaGasto.children[0].querySelector('input');
            filaGasto.children[0].textContent = inputGastoNumero.value;

            const inputDetalleGasto = filaGasto.children[1].querySelector('input');
            filaGasto.children[1].textContent = inputDetalleGasto.value;

            //editar total gasto
            const valorAnteriorGasto = Number(filaGasto.dataset.valorAnteriorGasto);
            const inputTotalGasto = filaGasto.children[2].querySelector('input');
            const nuevoValor = Number(inputTotalGasto.value);
            filaGasto.children[2].textContent = nuevoValor;
            gastosAcumulados = gastosAcumulados - valorAnteriorGasto + nuevoValor;

            //Forma de pago del Gasto
            const inputFormaPagoGasto = filaGasto.children[3].querySelector('input');
            filaGasto.children[3].textContent = inputFormaPagoGasto.value;

            //proveedor

            const inputProveedor = filaGasto.children[4].querySelector('input');
            filaGasto.children[4].textContent = inputProveedor.value;

            //Receptor
            const inputReceptor = filaGasto.children[5].querySelector('input');
            filaGasto.children[5].textContent = inputReceptor.value;

            actualizarResumen();
            botonEditarGasto.textContent = 'Editar';
        }

        actualizarResumen();
    }

    //Boton Elimnar Gastos

    const botonEliminarGasto = document.createElement('button');
    botonEliminarGasto.addEventListener('click', eliminarGasto)

    function eliminarGasto(){
        const valorActualGasto = Number(filaGasto.children[2].textContent);
        const formaPagoGasto = filaGasto.children[3].textContent

        //como en este caso no existen gastos por transferencias en la caja menor

        gastosAcumulados -= valorActualGasto
        
        //añadimos el resultado del gasto actualizado a la tabla
        tablaTotalGastos.textContent = `$${gastosAcumulados}`;
        actualizarResumen();
        filaGasto.remove();
    }

    //insertamos el boton editar 
    celdaAccionesGasto.appendChild(botonEditarGasto);
    
    gastosAcumulados += totalGasto;


    actualizarResumen();

    celdaGastoNumero.textContent = gastoNumero
    celdaDetalleGasto.textContent = detalleGasto
    celdaTotalGasto.textContent = totalGasto
    celdaFormaPagoGasto.textContent = formaPagoGasto
    celdaProveedor.textContent = proveedor
    celdaNombreReceptor.textContent = nombreReceptor



    botonEditarGasto.textContent = 'Editar';
    botonEliminarGasto.textContent = 'Eliminar';
    //insertamos las filas creadas con sus elementos guardados
    filaGasto.appendChild(celdaGastoNumero)
    filaGasto.appendChild(celdaDetalleGasto)
    filaGasto.appendChild(celdaTotalGasto)
    filaGasto.appendChild(celdaFormaPagoGasto)
    filaGasto.appendChild(celdaProveedor)
    filaGasto.appendChild(celdaNombreReceptor)
    filaGasto.appendChild(celdaAccionesGasto)

    tbodyGastos.appendChild(filaGasto);

    //agregamos los botones de editar y eliminar con appendchild
    tablaTotalGastos.textContent = `$${gastosAcumulados}`

    celdaAccionesGasto.appendChild(botonEditarGasto)
    celdaAccionesGasto.appendChild(botonEliminarGasto);



    //Limpiar campos
    document.getElementById('input-gasto-numero').value = '';
    document.getElementById('input-detalle-gasto').value = '';
    document.getElementById('input-total-gasto').value = '';
    document.getElementById('forma-pago-gasto').value = 'Seleccione';
    document.getElementById('input-proveedor').value = '';
    document.getElementById('input-nombre-receptor').value = '';

   actualizarResumen();

}
