const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 300,
        height: 200,
        frame: false,  // Sin marco de ventana
        transparent: true,  // Fondo transparente
        alwaysOnTop: true,  // Mantener siempre en la parte superior
        webPreferences: {
            nodeIntegration: true,  // Habilitar nodeIntegration
            contextIsolation: false,  // Deshabilitar contextIsolation para usar require
        }
    });

    win.loadFile('index.html');

    // Escuchar el evento "move-window" enviado desde renderer.js
    ipcMain.on('move-window', (event, deltaX, deltaY) => {
        const bounds = win.getBounds();  // Obtener las coordenadas actuales
        win.setBounds({
            x: bounds.x + deltaX,
            y: bounds.y + deltaY,
            width: bounds.width,
            height: bounds.height
        });
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
