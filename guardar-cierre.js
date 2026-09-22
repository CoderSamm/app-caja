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

async function guardarCierre(){

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

    const id = localStorage.getItem('CierreSeleccionadoId');
    const respuesta = await fetch(id ? `/api/cierres?id=${encodeURIComponent(id)}` : '/api/cierres', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cierreCaja)
    });

    if (!respuesta.ok) {
        const detalle = await respuesta.json().catch(() => ({}));
        throw new Error(detalle.error || 'No se pudo guardar el cierre.');
    }

    localStorage.removeItem('CierreSeleccionado');
    localStorage.removeItem('CierreSeleccionadoId');
    mostrarNotificacion('Cierre guardado correctamente');
}

botonGuardarCierre.addEventListener('click', async () => {
    try {
        await guardarCierre();
    } catch (error) {
        console.error(error);
        mostrarNotificacion(error.message, 'error');
    }
});

const botonEliminarCierre = document.getElementById('btn-eliminar-cierre');
const idSeleccionado = localStorage.getItem('CierreSeleccionadoId');
if (botonEliminarCierre && idSeleccionado) {
    botonEliminarCierre.disabled = false;
    botonEliminarCierre.addEventListener('click', async () => {
        if (!confirm('¿Eliminar este cierre del historial?')) return;

        try {
            const respuesta = await fetch(`/api/cierres?id=${encodeURIComponent(idSeleccionado)}`, {
                method: 'DELETE'
            });
            if (!respuesta.ok) throw new Error('No se pudo eliminar el cierre.');

            localStorage.removeItem('CierreSeleccionado');
            localStorage.removeItem('CierreSeleccionadoId');
            window.location.href = 'historial.html';
        } catch (error) {
            console.error(error);
            mostrarNotificacion(error.message, 'error');
        }
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
    localStorage.removeItem('CierreSeleccionadoId');
    botonEliminarCierre.disabled = true;
    mostrarNotificacion('Formulario limpiado correctamente');
});


