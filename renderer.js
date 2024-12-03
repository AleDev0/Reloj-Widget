document.addEventListener('DOMContentLoaded', () => {
    const { ipcRenderer } = require('electron');

    // Variables para el arrastre de la ventana
    let isMouseDown = false;
    let offsetX, offsetY;

    const body = document.querySelector('body');

    body.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        offsetX = e.clientX;
        offsetY = e.clientY;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (isMouseDown) {
            const deltaX = e.clientX - offsetX;
            const deltaY = e.clientY - offsetY;

            window.requestAnimationFrame(() => {
                ipcRenderer.send('move-window', deltaX, deltaY);
            });

            offsetX = e.clientX;
            offsetY = e.clientY;
        }
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    // Función para actualizar el reloj
    function updateClock() {
        const timeZone = 'America/Bogota';
        const now = new Date();

        const options = {
            timeZone: timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };

        const delayedTime = new Date(now.getTime() - 10000);
        const timeString = delayedTime.toLocaleTimeString('en-US', options);

        document.getElementById('clock').textContent = timeString;
    }

    setInterval(updateClock, 1000);
    updateClock();

    // Funcionalidad para cambiar el color del texto y fondo
    const toggleTextColorBtn = document.getElementById('toggle-text-color-btn');
    const toggleBgColorBtn = document.getElementById('toggle-bg-color-btn');
    const clock = document.getElementById('clock');
    let isBlackText = true;
    let isBlackBackground = false;

    toggleTextColorBtn.addEventListener('click', () => {
        isBlackText = !isBlackText;
        clock.style.color = isBlackText ? 'black' : 'white';
    });

    toggleBgColorBtn.addEventListener('click', () => {
        isBlackBackground = !isBlackBackground;
        body.style.backgroundColor = isBlackBackground ? 'black' : 'transparent';

        // Cambiar automáticamente el color del texto para evitar conflictos
        clock.style.color = isBlackBackground ? 'white' : 'black';
        isBlackText = !isBlackBackground; // Sincronizar el estado de texto
    });
});
