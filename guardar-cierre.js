import {
    ventas,
    saldoInicial,
    ventasAcumuladas,
    ventasEfectivoAcumuladas,
    ventasTransferenciasAcumuladas,
    ventasCreditosAcumuladas,
    limpiarVentas
} from "./ventas.js"

import {
    gastos,
    gastosAcumulados,
    limpiarGastos
} from "./gastos.js"

import{
    entregas,
    entregasAcumuladas,
    limpiarEntregas
} from "./entregas.js"

import { mostrarNotificacion } from './notificaciones.js';



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

    const leerTabla = (selector, nombres, tiposNumericos = []) => {
        return [...document.querySelectorAll(`${selector} tr`)].map(fila => {
            const valores = [...fila.querySelectorAll('td')]
                .slice(0, nombres.length)
                .map(celda => celda.textContent.trim());

            return nombres.reduce((registro, nombre, indice) => {
                registro[nombre] = tiposNumericos.includes(nombre)
                    ? Number(valores[indice])
                    : valores[indice];
                return registro;
            }, {});
        });
    };

    const cierreCaja = {

        fecha,
        responsableApertura,
        responsableCierre,
        observaciones,

        saldoInicial: Number(document.getElementById('input-saldo-inicial').value),
        ventas: leerTabla('#tbody-ventas', ['remision', 'detalle', 'totalRemision', 'formaPago', 'cliente'], ['totalRemision']),
        gastos: leerTabla('#tbody-gastos', ['gastoNumero', 'detalleGasto', 'totalGasto', 'formaPagoGasto', 'proveedor', 'nombreReceptor'], ['totalGasto']),
        entregas: leerTabla('#tbody-entregas', ['entregaNumero', 'detalleEntrega', 'totalEntrega', 'aprobador', 'receptor', 'horaEntrega'], ['totalEntrega'])
    }

    const historialCierres = JSON.parse( 
        localStorage.getItem('historialCierres')
    ) || [];

    const indiceSeleccionado = Number(localStorage.getItem('CierreSeleccionadoIndice'));
    if (Number.isInteger(indiceSeleccionado) && indiceSeleccionado >= 0 && indiceSeleccionado < historialCierres.length) {
        historialCierres[indiceSeleccionado] = cierreCaja;
    } else {
        historialCierres.push(cierreCaja);
    }
   

    localStorage.setItem('historialCierres',
        JSON.stringify(historialCierres)
    );

    console.log(historialCierres);
    localStorage.removeItem('CierreSeleccionado');
    localStorage.removeItem('CierreSeleccionadoIndice');
    mostrarNotificacion('Cierre guardado correctamente');
}

const botonEliminarCierre = document.getElementById('btn-eliminar-cierre');
const indiceSeleccionado = Number(localStorage.getItem('CierreSeleccionadoIndice'));
if (botonEliminarCierre && Number.isInteger(indiceSeleccionado) && indiceSeleccionado >= 0) {
    botonEliminarCierre.disabled = false;
    botonEliminarCierre.addEventListener('click', () => {
        if (!confirm('¿Eliminar este cierre del historial?')) return;

        const historialCierres = JSON.parse(localStorage.getItem('historialCierres')) || [];
        historialCierres.splice(indiceSeleccionado, 1);
        localStorage.setItem('historialCierres', JSON.stringify(historialCierres));
        localStorage.removeItem('CierreSeleccionado');
        localStorage.removeItem('CierreSeleccionadoIndice');
        window.location.href = 'historial.html';
    });
}

const botonLimpiarCierre = document.getElementById('btn-limpiar-cierre');
botonLimpiarCierre.addEventListener('click', () => {
    limpiarVentas();
    limpiarGastos();
    limpiarEntregas();

    document.querySelectorAll('input').forEach(input => {
        input.value = '';
    });
    document.getElementById('input-saldo-inicial').dispatchEvent(
        new Event('input', { bubbles: true })
    );
    document.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });

    localStorage.removeItem('CierreSeleccionado');
    localStorage.removeItem('CierreSeleccionadoIndice');
    botonEliminarCierre.disabled = true;
    mostrarNotificacion('Formulario limpiado correctamente');
});


