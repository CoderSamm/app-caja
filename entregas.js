import { actualizarResumen } from "./resumen.js";

export let entregasAcumuladas = 0;
export let entregas = [];



const tbodyEntregas = document.getElementById('tbody-entregas');
const tablaTotalEntregas = document.getElementById('tabla-total-entregas');

//resumen de totales
const totalEntrega = document.getElementById('resumen-total-entregas');


//boton agregar entrega -done
const botonAgregarEntregas = document.getElementById('btn-agregar-entrega');
botonAgregarEntregas.addEventListener('click', agregarEntrega);

function agregarEntrega(){
    const entregaNumero = document.getElementById('input-entrega-numero').value
    const detalleEntrega = document.getElementById('input-detalle-entrega').value
    const totalEntrega = Number(document.getElementById('input-total-entrega').value)
    const aprobador = document.getElementById('input-aprobador').value;
    const receptor = document.getElementById('input-receptor').value
    const horaEntrega = document.getElementById('input-hora-entrega').value

    const nuevaEntrega = {
        entregaNumero,
        detalleEntrega,
        totalEntrega,
        aprobador,
        receptor,
        horaEntrega
    }

    entregas.push(nuevaEntrega);
    console.log(entregas)

    //creamos las filas (tr) y celdas (td)

    const filaEntrega = document.createElement('tr');
    const celdaEntregaNumero = document.createElement('td');
    const celdaDetalleEntrega = document.createElement('td');
    const celdaTotalEntrega = document.createElement('td');
    const celdaAprobador = document.createElement('td');
    const celdaReceptor = document.createElement('td');
    const celdaHoraEntrega = document.createElement('td');
    const celdaAccionesEntrega = document.createElement('td');

    //boton editar entrega

    const botonEditarEntrega = document.createElement('button');
    botonEditarEntrega.textContent = 'Editar'

    botonEditarEntrega.addEventListener('click', editarEntrega)

    function editarEntrega() {

        if (botonEditarEntrega.textContent === 'Editar') {

            //Numero de la Entrega
            const celdaEntregaNumero = filaEntrega.children[0];
            const inputEntregaNumero = document.createElement('input');
            inputEntregaNumero.value = celdaEntregaNumero.textContent
            celdaEntregaNumero.textContent = ''
            celdaEntregaNumero.appendChild(inputEntregaNumero)
           
            //Detalle de la entrega
            const celdaDetalleEntrega = filaEntrega.children[1];
            const inputDetalleEntrega = document.createElement('input');
            inputDetalleEntrega.value = celdaDetalleEntrega.textContent
            celdaDetalleEntrega.textContent = '';
            celdaDetalleEntrega.appendChild(inputDetalleEntrega);

            //editar total entrega
            const valorAnteriorEntrega = Number(filaEntrega.children[2].textContent);
            filaEntrega.dataset.valorAnteriorEntrega = valorAnteriorEntrega;
            const celdaTotalEntrega = filaEntrega.children[2];
            const inputTotalEntrega = document.createElement('input');
            inputTotalEntrega.type = 'number';
            inputTotalEntrega.value = celdaTotalEntrega.textContent;
            celdaTotalEntrega.textContent = '';
            celdaTotalEntrega.appendChild(inputTotalEntrega);


            //Aprobador
            const celdaAprobador = filaEntrega.children[3];
            const inputAprobador = document.createElement('input');
            inputAprobador.value = celdaAprobador.textContent
            celdaAprobador.textContent = '';
            celdaAprobador.appendChild(inputAprobador);

            //Receptor
            const celdaReceptor = filaEntrega.children[4];
            const inputReceptor = document.createElement('input');
            inputReceptor.value = celdaReceptor.textContent
            celdaReceptor.textContent = '';
            celdaReceptor.appendChild(inputReceptor);

            //Hora de Entrega
            const celdaHoraEntrega = filaEntrega.children[5];
            const inputHoraEntrega = document.createElement('input');
            inputHoraEntrega.value = celdaHoraEntrega.textContent
            celdaHoraEntrega.textContent = '';
            celdaHoraEntrega.appendChild(inputHoraEntrega);

            botonEditarEntrega.textContent = 'Guardar'


        } else {

            //Consecutivo de entrega
            const inputEntregaNumero = filaEntrega.children[0].querySelector('input');
            filaEntrega.children[0].textContent = inputEntregaNumero.value;

            //Detalle de la entrega
            const inputDetalleEntrega = filaEntrega.children[1].querySelector('input');
            filaEntrega.children[1].textContent = inputDetalleEntrega.value;

            //Total entregado
            console.log(filaEntrega.dataset);
            console.log(filaEntrega.dataset.valorAnteriorEntrega);
            const valorAnteriorEntrega = Number(filaEntrega.dataset.valorAnteriorEntrega);
            const inputTotalEntrega = filaEntrega.children[2].querySelector('input');
            const nuevoValorEntrega = Number(inputTotalEntrega.value);
            filaEntrega.children[2].textContent = nuevoValorEntrega;
            entregasAcumuladas = entregasAcumuladas - valorAnteriorEntrega + nuevoValorEntrega;

            //Aprobador

            const inputAprobador = filaEntrega.children[3].querySelector('input');
            filaEntrega.children[3].textContent = inputAprobador.value;

            //Receptor
            const inputReceptor = filaEntrega.children[4].querySelector('input');
            filaEntrega.children[4].textContent = inputReceptor.value;
            
            //Hora
            const inputHoraEntrega = filaEntrega.children[5].querySelector('input');
            filaEntrega.children[5].textContent = inputHoraEntrega.value;

            actualizarResumen();
            botonEditarEntrega.textContent = 'Editar';
        }
        tablaTotalEntregas.textContent = `$${entregasAcumuladas}`;
        actualizarResumen();
    }

    //Boton Elimnar Entrega

    const botonEliminarEntrega = document.createElement('button');
    botonEliminarEntrega.addEventListener('click', eliminarEntrega);

    function eliminarEntrega(){
        const valorActualEntrega = Number(filaEntrega.children[2].textContent);


        entregasAcumuladas -= valorActualEntrega
        
        //añadimos el resultado del entrega actualizado a la tabla
        tablaTotalEntregas.textContent = `$${entregasAcumuladas}`;   
        actualizarResumen();
        filaEntrega.remove();
    }

    //insertamos el boton editar 
    celdaAccionesEntrega.appendChild(botonEditarEntrega);
    
    entregasAcumuladas += totalEntrega;
    tablaTotalEntregas.textContent = `$${entregasAcumuladas}`;

    actualizarResumen();

    celdaEntregaNumero.textContent = entregaNumero
    celdaDetalleEntrega.textContent = detalleEntrega
    celdaTotalEntrega.textContent = totalEntrega
    celdaAprobador.textContent = aprobador
    celdaReceptor.textContent = receptor
    celdaHoraEntrega.textContent = horaEntrega



    botonEditarEntrega.textContent = 'Editar';
    botonEliminarEntrega.textContent = 'Eliminar';

    //insertamos las filas creadas con sus elementos guardados
    filaEntrega.appendChild(celdaEntregaNumero)
    filaEntrega.appendChild(celdaDetalleEntrega)
    filaEntrega.appendChild(celdaTotalEntrega)
    filaEntrega.appendChild(celdaAprobador)
    filaEntrega.appendChild(celdaReceptor)
    filaEntrega.appendChild(celdaHoraEntrega)
    filaEntrega.appendChild(celdaAccionesEntrega)

    tbodyEntregas.appendChild(filaEntrega);

    //agregamos los botones de editar y eliminar con appendchild

    celdaAccionesEntrega.appendChild(botonEditarEntrega)
    celdaAccionesEntrega.appendChild(botonEliminarEntrega);



    //Limpiar campos
    document.getElementById('input-entrega-numero').value = '';
    document.getElementById('input-detalle-entrega').value = '';
    document.getElementById('input-total-entrega').value = '';
    document.getElementById('input-aprobador').value = '';
    document.getElementById('input-receptor').value = '';
    document.getElementById('input-hora-entrega').value = '';

    actualizarResumen()
}
