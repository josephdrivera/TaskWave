const { app, BrowserWindow } = require('electron');
const path = require('path');


function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }        
    });

    // Load the index.html of the app.
    mainWindow.loadFile('index.html');

    // Open the DevTools. Remove this line in production
    mainWindow.webContents.openDevTools();

    // Show the window when it is ready
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
