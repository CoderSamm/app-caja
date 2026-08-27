const historialCierres = JSON.parse(
    localStorage.getItem('historialCierres') //Busca en el navegador lo que guardamos. Convierte ese texto nuevamente en un arreglo de JavaScript.
) || [];

const tbodyHistorial = document.getElementById('tbody-historial')
console.log(historialCierres);



historialCierres.forEach(cierre=>{
    console.log(cierre.fecha)
    //pintamos la tabla en nuestro html

    tbodyHistorial.innerHTML += `
    
    <tr>
        <td>${cierre.fecha}</td>
        <td>${cierre.responsableApertura}</td>
        <td>${cierre.responsableCierre}</td>
        <td>
            <button class="btn-abrir" data-fecha="${cierre.fecha}">
                Abrir
            </button>
        </td>
    </tr>`

    
    const botonesAbrir = document.querySelectorAll('.btn-abrir');
    console.log("BOTONES:", botonesAbrir.length);

    botonesAbrir.forEach(boton =>{

        boton.addEventListener('click', ()=>{
            
            const cierreSeleccionado =

            historialCierres.find(
                
                cierre => cierre.fecha === boton.dataset.fecha
            )

            console.log(cierreSeleccionado);

            localStorage.setItem(
                "CierreSeleccionado",
                JSON.stringify(cierreSeleccionado)
            )

            console.log(
                localStorage.getItem('CierreSeleccionado')
            )

            window.location.href = 'index.html';
        });
    })

});

