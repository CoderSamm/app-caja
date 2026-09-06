const historialCierres = JSON.parse(
    localStorage.getItem('historialCierres') //Busca en el navegador lo que guardamos. Convierte ese texto nuevamente en un arreglo de JavaScript.
) || [];

const tbodyHistorial = document.getElementById('tbody-historial')
console.log(historialCierres);



historialCierres.forEach((cierre, indice)=>{
    console.log(cierre.fecha)
    //pintamos la tabla en nuestro html

    tbodyHistorial.innerHTML += `
    
    <tr>
        <td>${cierre.fecha}</td>
        <td>${cierre.responsableApertura}</td>
        <td>${cierre.responsableCierre}</td>
        <td>
            <button class="btn-abrir" data-indice="${indice}">
                Abrir
            </button>
        </td>
    </tr>`

    
});

const botonesAbrir = document.querySelectorAll('.btn-abrir');
botonesAbrir.forEach(boton => {
    boton.addEventListener('click', ()=>{
            
            const indice = Number(boton.dataset.indice);
            const cierreSeleccionado = historialCierres[indice];

            console.log(cierreSeleccionado);

            localStorage.setItem(
                "CierreSeleccionado",
                JSON.stringify(cierreSeleccionado)
            )
            localStorage.setItem('CierreSeleccionadoIndice', String(indice));

            console.log(
                localStorage.getItem('CierreSeleccionado')
            )

            window.location.href = 'index.html';
        });
});

