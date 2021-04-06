const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

const windowStateKeeper = require('electron-window-state');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Keep a reference for dev mode
let dev = false;
if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true;
}

app.post( '/scrapUrl/', function( req, res ) {
    var jsdom = require( 'jsdom' );
    var jsonRes = {};
    jsdom.env( {
        url: req.body.url,
        scripts: [ "http://code.jquery.com/jquery.js" ],
        done: function( error, window ) {
          var $ = window.$;

          $( 'meta' ).each( function() {
            var name = $( this ).attr( 'property' );
            var value = $( this ).attr( 'content' );
            if ( name ) {
              jsonRes[ name.slice( 3 ) ] = value;
              console.log( name + ": " + value );
            }
          } );
          res.send( jsonRes );
        }
    } );
} );

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
        titleBarStyle: 'hiddenInset',
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

    // win.loadFile('./index.html')
    // win.loadURL('http://localhost:3000/')

    // Load the index.html of the app.
    let indexPath;
    if (dev && process.argv.indexOf('--noDevServer') === -1) {
        indexPath = url.format({
        protocol: 'http:',
        host: 'localhost:3000',
        pathname: './index.html',
        slashes: true
        });
    } else {
        indexPath = url.format({
        protocol: 'file:',
        pathname: path.join(__dirname, 'dist', './index.html'),
        slashes: true
        });
    }
    win.loadURL(indexPath);
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