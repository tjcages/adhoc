const { app, BrowserWindow, screen } = require('electron')

const windowStateKeeper = require('electron-window-state');
let win;

function createWindow () {
    // Load the previous state with fallback to defaults
    let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
    });

    // Create the window using the state information
    win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            webviewTag: true, // https://www.electronjs.org/docs/api/webview-tag
        },
    });

    // Let us register listeners on the window, so we can update the state
    // automatically (the listeners will be removed when the window is closed)
    // and restore the maximized or full screen state
    mainWindowState.manage(win);

    // Load web debugging tools
    win.webContents.openDevTools()

    win.load
    win.loadFile('./index.html')
}

try {
    require('electron-reloader')(module)
} catch (_) {}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})