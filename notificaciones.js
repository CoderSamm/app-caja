let temporizadorNotificacion;

export function mostrarNotificacion(mensaje, tipo = 'success') {
    let notificacion = document.getElementById('notificacion-app');

    if (!notificacion) {
        notificacion = document.createElement('div');
        notificacion.id = 'notificacion-app';
        notificacion.setAttribute('role', 'status');
        notificacion.setAttribute('aria-live', 'polite');
        document.body.appendChild(notificacion);
    }

    clearTimeout(temporizadorNotificacion);
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.innerHTML = `
        <span class="notificacion-icono">${tipo === 'success' ? '✓' : '!'}</span>
        <span class="notificacion-mensaje">${mensaje}</span>
        <span class="notificacion-progreso"></span>
    `;

    requestAnimationFrame(() => notificacion.classList.add('notificacion-visible'));

    temporizadorNotificacion = setTimeout(() => {
        notificacion.classList.remove('notificacion-visible');
    }, 3600);
}
