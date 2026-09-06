import { agregarVenta } from './ventas.js';
import { agregarGasto } from './gastos.js';
import { agregarEntrega } from './entregas.js';

document.addEventListener('DOMContentLoaded', () => {
    const cierreSeleccionado = JSON.parse(
        localStorage.getItem('CierreSeleccionado')
    );

    if (!cierreSeleccionado) return;

    document.getElementById('fecha').value = cierreSeleccionado.fecha || '';
    document.getElementById('nombre-responsable').value = cierreSeleccionado.responsableApertura || '';
    document.getElementById('responsable-cierre').value = cierreSeleccionado.responsableCierre || '';
    document.getElementById('observaciones').value = cierreSeleccionado.observaciones || '';

    const inputSaldoInicial = document.getElementById('input-saldo-inicial');
    inputSaldoInicial.value = cierreSeleccionado.saldoInicial || 0;
    inputSaldoInicial.dispatchEvent(new Event('input', { bubbles: true }));

    (cierreSeleccionado.ventas || []).forEach(venta => {
        document.getElementById('input-remision').value = venta.remision || '';
        document.getElementById('input-detalle').value = venta.detalle || '';
        document.getElementById('input-total-remision').value = venta.totalRemision || 0;
        document.getElementById('forma-pago').value = venta.formaPago || '';
        document.getElementById('input-cliente').value = venta.cliente || '';
        agregarVenta();
    });

    (cierreSeleccionado.gastos || []).forEach(gasto => {
        document.getElementById('input-gasto-numero').value = gasto.gastoNumero || '';
        document.getElementById('input-detalle-gasto').value = gasto.detalleGasto || '';
        document.getElementById('input-total-gasto').value = gasto.totalGasto || 0;
        document.getElementById('forma-pago-gasto').value = gasto.formaPagoGasto || '';
        document.getElementById('input-proveedor').value = gasto.proveedor || '';
        document.getElementById('input-nombre-receptor').value = gasto.nombreReceptor || '';
        agregarGasto();
    });

    (cierreSeleccionado.entregas || []).forEach(entrega => {
        document.getElementById('input-entrega-numero').value = entrega.entregaNumero || '';
        document.getElementById('input-detalle-entrega').value = entrega.detalleEntrega || '';
        document.getElementById('input-total-entrega').value = entrega.totalEntrega || 0;
        document.getElementById('input-aprobador').value = entrega.aprobador || '';
        document.getElementById('input-receptor').value = entrega.receptor || '';
        document.getElementById('input-hora-entrega').value = entrega.horaEntrega || '';
        agregarEntrega();
    });
});
