const tbodyHistorial = document.getElementById('tbody-historial')
const escaparHtml = valor => String(valor ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

async function cargarHistorial() {
    try {
        const respuesta = await fetch('/api/cierres');
        if (!respuesta.ok) throw new Error('No se pudo cargar el historial.');

        const historialCierres = await respuesta.json();
        tbodyHistorial.innerHTML = historialCierres.map(cierre => `
            <tr>
                <td>${escaparHtml(cierre.fecha)}</td>
                <td>${escaparHtml(cierre.responsableApertura)}</td>
                <td>${escaparHtml(cierre.responsableCierre)}</td>
                <td>
                    <button class="btn-abrir" data-id="${escaparHtml(cierre.id)}">
                        Abrir
                    </button>
                </td>
            </tr>`).join('');

        document.querySelectorAll('.btn-abrir').forEach(boton => {
            boton.addEventListener('click', () => {
                const cierreSeleccionado = historialCierres.find(
                    cierre => cierre.id === boton.dataset.id
                );

                localStorage.setItem('CierreSeleccionado', JSON.stringify(cierreSeleccionado));
                localStorage.setItem('CierreSeleccionadoId', cierreSeleccionado.id);
                window.location.href = 'index.html';
            });
        });
    } catch (error) {
        console.error(error);
        tbodyHistorial.innerHTML = '<tr><td colspan="4">No se pudo cargar el historial.</td></tr>';
    }
}

cargarHistorial();

