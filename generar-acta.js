console.log("generar-acta cargado");


import { mostrarNotificacion } from './notificaciones.js';


//Conectamos el Boton generar acta
const botonGenerarActa = document.getElementById('btn-generar-acta');
botonGenerarActa.addEventListener('click', generarActa);
console.log(botonGenerarActa);
console.log('CLICK FUNCIONA');

function generarActa() {
    const saldoInicialFormulario = Number(
        document.getElementById('input-saldo-inicial').value
    );

    const fecha = document.getElementById('fecha').value;
    const responsableApertura = document.getElementById('nombre-responsable').value;
    const responsableCierre = document.getElementById('responsable-cierre').value;
    const observaciones =  document.getElementById('observaciones').value;

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
        saldoInicial: saldoInicialFormulario,
        ventas: leerTabla('#tbody-ventas', ['remision', 'detalle', 'totalRemision', 'formaPago', 'cliente'], ['totalRemision']),
        gastos: leerTabla('#tbody-gastos', ['gastoNumero', 'detalleGasto', 'totalGasto', 'formaPagoGasto', 'proveedor', 'nombreReceptor'], ['totalGasto']),
        entregas: leerTabla('#tbody-entregas', ['entregaNumero', 'detalleEntrega', 'totalEntrega', 'aprobador', 'receptor', 'horaEntrega'], ['totalEntrega'])
    };

    localStorage.setItem(
        "CierreCaja",
        JSON.stringify(cierreCaja)
    );

    mostrarNotificacion('Acta generada correctamente');

    window.open(
        "./reportes/acta-cierre.html",
        "_blank"
    );
}
